/* ONEDRIVE_SAFE */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function writeSafe(p, d) {
  for (let i = 0; i < 15; i++) {
    try { fs.writeFileSync(p, d, 'utf8'); return; }
    catch (e) {
      if (i === 14) throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80);
    }
  }
}

const dossierSite = path.join(__dirname, 'site');
const versetJsPath = path.join(dossierSite, 'assets', 'verset.js');
const versetCssPath = path.join(dossierSite, 'assets', 'verset.css');

// 1. Corriger boutonEstActif() et estModeMotAMotActif() dans site/assets/verset.js
let vjs = fs.readFileSync(versetJsPath, 'utf8');

const reBtnActif = /function boutonEstActif\(btn\) \{[\s\S]*?return false;\s*\}/;
if (!reBtnActif.test(vjs)) {
  console.error('Fonction boutonEstActif introuvable dans site/assets/verset.js');
  process.exit(1);
}
vjs = vjs.replace(reBtnActif, `function boutonEstActif(btn) {
    if (!btn) return false;
    if (btn.classList.contains('active') || btn.classList.contains('on') || btn.classList.contains('is-active') || btn.getAttribute('aria-pressed') === 'true') return true;
    // Uniquement le style inline posé par JS (ex: bouton Suivi), jamais getComputedStyle/:hover
    if (btn.style && btn.style.background && btn.style.background.indexOf('gradient') !== -1) return true;
    return false;
  }`);

const reEstWbw = /function estModeMotAMotActif\(\) \{[\s\S]*?\}/;
if (!reEstWbw.test(vjs)) {
  console.error('Fonction estModeMotAMotActif introuvable dans site/assets/verset.js');
  process.exit(1);
}
vjs = vjs.replace(reEstWbw, `function estModeMotAMotActif() {
    if (typeof modeMotAMotActif === 'boolean') {
      return modeMotAMotActif && obtenirLanguePage() !== 'ar';
    }
    var btnWbw = document.getElementById('btnToggleWbw') || trouverBoutonMotAMot();
    return btnWbw ? btnWbw.classList.contains('active') : document.body.classList.contains('wbw-mode-on');
  }`);

// Mettre à jour .active immédiatement au clic sur Mot à mot + synchroniser V110 après chargement
const reBasculerWbw = /function basculerMotAMot\(\) \{\s*modeMotAMotActif = !modeMotAMotActif;[\s\S]*?chargerDonneesMotAMotEtTajweed\(\);\s*\}/;
if (reBasculerWbw.test(vjs)) {
  vjs = vjs.replace(reBasculerWbw, `function basculerMotAMot() {
      modeMotAMotActif = !modeMotAMotActif;
      try { localStorage.setItem('coran_wbw_mode', modeMotAMotActif ? '1' : '0'); } catch(e){}
      const bW = document.getElementById('btnToggleWbw');
      if (bW) bW.classList.toggle('active', modeMotAMotActif);
      Promise.resolve(chargerDonneesMotAMotEtTajweed()).then(() => {
        if (typeof window.__verifierV110 === 'function') window.__verifierV110();
      });
    }`);
}

try {
  new vm.Script(vjs, { filename: 'site/assets/verset.js' });
  console.log('✓ site/assets/verset.js corrigé et validé (0 erreur).');
} catch (err) {
  console.error('ERREUR DE SYNTAXE dans verset.js (non écrit) :\n', err.message);
  process.exit(1);
}
writeSafe(versetJsPath, vjs);

// 2. Séparer visuellement :hover et .active dans site/assets/verset.css
let vcss = fs.readFileSync(versetCssPath, 'utf8');
const reCssHover = /\.btn-wbw-toggle:hover,\s*\.btn-wbw-toggle\.active\s*\{[^}]*\}/;
if (reCssHover.test(vcss)) {
  vcss = vcss.replace(
    reCssHover,
    `.btn-wbw-toggle:hover:not(.active) { background:rgba(56,189,248,0.28); border-color:var(--sky-bright); color:#ffffff; }
    .btn-wbw-toggle.active, .btn-wbw-toggle.active:hover { background:var(--sky-bright); color:#021019; box-shadow:0 0 16px rgba(56,189,248,0.48); }`
  );
  writeSafe(versetCssPath, vcss);
  console.log('✓ site/assets/verset.css : distinction visuelle :hover vs .active appliquée.');
}

// 3. Cache-busting CSS & JS sur les 6 236 pages HTML
const ts = Date.now();
const htmlFiles = fs.readdirSync(dossierSite).filter(f => /^sourate-\d+-verset-\d+\.html$/i.test(f));
let nbHtml = 0;
for (const f of htmlFiles) {
  const fp = path.join(dossierSite, f);
  const h = fs.readFileSync(fp, 'utf8');
  const h2 = h
    .replace(/assets\/verset\.css(?:\?v=\d+)?/g, 'assets/verset.css?v=' + ts)
    .replace(/assets\/verset\.js(?:\?v=\d+)?/g, 'assets/verset.js?v=' + ts);
  if (h2 !== h) {
    writeSafe(fp, h2);
    nbHtml++;
  }
}
console.log(`✅ Terminé : ${nbHtml} pages HTML mises à jour (v=${ts}).`);
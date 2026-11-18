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
const indexPath = path.join(dossierSite, 'index.html');

function remplacerBouclesDansJs(code, label) {
  let out = code;
  let nbSuppr = 0;

  // 1. Remplacer setInterval(..., 400) du module WBW/Tajwid par des événements + observer sur #badgeNumEl
  const re400 = /setInterval\(\(\) => \{\s*const lg =[\s\S]*?if \(besoinMaj\) chargerDonneesMotAMotEtTajweed\(\);\s*\}, 400\);/;
  if (re400.test(out)) {
    out = out.replace(re400, `const verifierMajWbw = () => {
        const lg = (typeof currentLang !== 'undefined' && ['fr','en','es','ar'].includes(currentLang)) ? currentLang : 'fr';
        const signatureActuelle = numSourateActuelle + ':' + numVersetActuel + '_' + lg + '_' + (modeMotAMotActif ? '1' : '0') + '_' + (modeTajweedActif ? '1' : '0');
        const arEl = document.getElementById('arabicVerseEl');
        const besoinMaj = (signatureActuelle !== dernierVersetCharge) || (!modeMotAMotActif && arEl && arEl.children.length === 0 && motsActuelsDuVerset.length > 0);
        if (besoinMaj) chargerDonneesMotAMotEtTajweed();
      };
      document.addEventListener('click', () => setTimeout(verifierMajWbw, 25));
      document.addEventListener('change', () => setTimeout(verifierMajWbw, 25));
      window.addEventListener('popstate', () => setTimeout(verifierMajWbw, 25));
      const badgeObsEl = document.getElementById('badgeNumEl');
      if (badgeObsEl && typeof MutationObserver !== 'undefined') {
        new MutationObserver(() => setTimeout(verifierMajWbw, 20)).observe(badgeObsEl, { childList: true, characterData: true, subtree: true });
      }`);
    nbSuppr++;
  }

  // 2. Remplacer setInterval(..., 300) de script-master-v77 par événements (change, input debouncé, popstate, audio, observer)
  const re300 = /setInterval\(function \(\) \{\s*synchroniserTout\(\);\s*var aud = trouverAudioActif\(\);\s*if \(aud && !aud\.paused && !rafId\) \{\s*lancerBoucleSuivi\(\);\s*\}\s*\}, 300\);/;
  if (re300.test(out)) {
    out = out.replace(re300, `(function attacherDeclencheursV77() {
    var timerInputV77 = null;
    document.addEventListener("change", function () {
      setTimeout(synchroniserTout, 20);
    });
    document.addEventListener("input", function () {
      clearTimeout(timerInputV77);
      timerInputV77 = setTimeout(synchroniserTout, 120);
    });
    window.addEventListener("popstate", function () {
      setTimeout(synchroniserTout, 20);
    });
    window.addEventListener("load", function () {
      synchroniserTout();
    });
    var badgeEl = document.getElementById("badgeNumEl");
    if (badgeEl && typeof MutationObserver !== "undefined") {
      new MutationObserver(function () {
        setTimeout(synchroniserTout, 25);
      }).observe(badgeEl, { childList: true, characterData: true, subtree: true });
    }
    var audInit = document.getElementById("ayahAudio");
    if (audInit) {
      audInit.addEventListener("play", function () { if (!rafId) lancerBoucleSuivi(); });
      audInit.addEventListener("playing", function () { if (!rafId) lancerBoucleSuivi(); });
    }
    setTimeout(synchroniserTout, 250);
  })();`);
    nbSuppr++;
  }

  // 3. Supprimer setInterval(synchroniserFooterEtBoutonsLangue, 900)
  const re900 = /setInterval\(synchroniserFooterEtBoutonsLangue,\s*900\);/g;
  const m900 = out.match(re900);
  if (m900) {
    out = out.replace(re900, "document.addEventListener('DOMContentLoaded', synchroniserFooterEtBoutonsLangue);");
    nbSuppr += m900.length;
  }

  // 4. Remplacer setInterval(verifierChangementVersetEtPause, 180) de wbw-colle-v110 par événements audio + observer
  const re180 = /setInterval\(verifierChangementVersetEtPause,\s*180\);/;
  if (re180.test(out)) {
    out = out.replace(re180, `(function attacherDeclencheursV110() {
    window.addEventListener('popstate', function() { setTimeout(verifierChangementVersetEtPause, 20); });
    window.addEventListener('load', function() { verifierChangementVersetEtPause(); });
    var aud110 = document.getElementById('ayahAudio');
    if (aud110) {
      ['play', 'pause', 'ended', 'seeked'].forEach(function(ev) {
        aud110.addEventListener(ev, function() { verifierChangementVersetEtPause(); });
      });
    }
    var badge110 = document.getElementById('badgeNumEl');
    if (badge110 && typeof MutationObserver !== 'undefined') {
      new MutationObserver(function() {
        setTimeout(verifierChangementVersetEtPause, 25);
      }).observe(badge110, { childList: true, characterData: true, subtree: true });
    }
    setTimeout(verifierChangementVersetEtPause, 220);
  })();`);
    nbSuppr++;
  }

  const restants = (out.match(/\bsetInterval\s*\(/g) || []).length;
  console.log(`✓ ${label} : ${nbSuppr} boucle(s) setInterval remplacée(s) (restant : ${restants}).`);
  return out;
}

// 1. Optimiser site/assets/verset.js
if (!fs.existsSync(versetJsPath)) {
  console.error('Introuvable :', versetJsPath);
  process.exit(1);
}
const origVjs = fs.readFileSync(versetJsPath, 'utf8');
writeSafe(versetJsPath + '.perf.bak', origVjs);
const nvVjs = remplacerBouclesDansJs(origVjs, 'site/assets/verset.js');

try {
  new vm.Script(nvVjs, { filename: 'site/assets/verset.js' });
  console.log('✓ Syntaxe de site/assets/verset.js validée : 0 erreur.');
} catch (err) {
  console.error('ERREUR DE SYNTAXE dans verset.js (non écrit) :\n', err.message);
  process.exit(1);
}
writeSafe(versetJsPath, nvVjs);

// 2. Nettoyer site/index.html (supprimer le script V122 dupliqué + les setInterval)
if (fs.existsSync(indexPath)) {
  const origIdx = fs.readFileSync(indexPath, 'utf8');
  writeSafe(indexPath + '.perf.bak', origIdx);
  let nvIdx = origIdx;

  // Retirer le script V122 dupliqué (il est déjà inclus dans WBW_COLLE_V110 juste dessous)
  if (nvIdx.includes('id="wbwInstitutionnelAccueilV122"') && nvIdx.includes('WBW_COLLE_V110_START')) {
    nvIdx = nvIdx.replace(/<script id="wbwInstitutionnelAccueilV122">[\s\S]*?<\/script>\s*/i, '');
    console.log('✓ site/index.html : script dupliqué wbwInstitutionnelAccueilV122 supprimé.');
  }

  nvIdx = remplacerBouclesDansJs(nvIdx, 'site/index.html');
  writeSafe(indexPath, nvIdx);
}

// 3. Cache-busting verset.js?v=... + retrait de l'option Maher du HTML sur les 6 236 pages
const ts = Date.now();
const htmlFiles = fs.readdirSync(dossierSite).filter(f => /^sourate-\d+-verset-\d+\.html$/i.test(f));
let nbHtml = 0;
for (const f of htmlFiles) {
  const fp = path.join(dossierSite, f);
  const h = fs.readFileSync(fp, 'utf8');
  const h2 = h
    .replace(/assets\/verset\.js(?:\?v=\d+)?/g, 'assets/verset.js?v=' + ts)
    .replace(/\s*<option value="MaherAlMuaiqly128kbps">[^<]*<\/option>/gi, '');
  if (h2 !== h) {
    writeSafe(fp, h2);
    nbHtml++;
  }
}

console.log(`✅ Terminé : ${nbHtml} pages HTML mises à jour (verset.js?v=${ts}, 0 option Maher, 0 setInterval actif).`);
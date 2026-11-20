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

const siteDir = path.join(__dirname, 'site');
const versetJsPath = path.join(siteDir, 'assets', 'verset.js');
const versetCssPath = path.join(siteDir, 'assets', 'verset.css');
const swPath = path.join(siteDir, 'sw.js');

// 1. Masquer soleil et lune dès le CSS sur les pages de sourates (0 flash)
let css = fs.readFileSync(versetCssPath, 'utf8');
const marqueurCss = '/* NO_SUN_MOON_ON_SURAH_V1 */';
if (!css.includes(marqueurCss)) {
  css += `\n${marqueurCss}\n#flatEarthSun, #flatEarthMoon, .flat-earth-sun, .flat-earth-moon, .astre-soleil-pur-v77, .astre-lune-pure-v77 {\n  display: none !important;\n  visibility: hidden !important;\n  animation: none !important;\n  box-shadow: none !important;\n}\n`;
  writeSafe(versetCssPath, css);
  console.log('✓ site/assets/verset.css : soleil et lune masqués sur les pages de sourates.');
} else {
  console.log('ℹ️ site/assets/verset.css déjà patché.');
}

// 2. Couper l'animation soleil/lune + occultation canvas + scan DOM dans site/assets/verset.js
let js = fs.readFileSync(versetJsPath, 'utf8');
let modifs = 0;

if (js.includes("const sunEl = document.getElementById('flatEarthSun');")) {
  js = js.replace(
    "const sunEl = document.getElementById('flatEarthSun');",
    "const sunEl = null; { const _s = document.getElementById('flatEarthSun'); if (_s) _s.remove(); }"
  );
  modifs++;
}
if (js.includes("const moonEl = document.getElementById('flatEarthMoon');")) {
  js = js.replace(
    "const moonEl = document.getElementById('flatEarthMoon');",
    "const moonEl = null; { const _m = document.getElementById('flatEarthMoon'); if (_m) _m.remove(); }"
  );
  modifs++;
}
if (js.includes('activerOccultationSoleilLune();')) {
  js = js.replace(
    'activerOccultationSoleilLune();',
    '/* activerOccultationSoleilLune désactivée sur les sourates pour la fluidité */'
  );
  modifs++;
}
if (/function\s+reparerSoleilEtLuneEnOrbite\s*\(\s*\)\s*\{/.test(js) && !js.includes('/* NO_ASTRE_SCAN */')) {
  js = js.replace(
    /function\s+reparerSoleilEtLuneEnOrbite\s*\(\s*\)\s*\{/,
    'function reparerSoleilEtLuneEnOrbite() { /* NO_ASTRE_SCAN */ return;'
  );
  modifs++;
}

if (modifs === 0) {
  console.log('ℹ️ Aucune nouvelle modification nécessaire dans site/assets/verset.js.');
} else {
  new vm.Script(js, { filename: 'site/assets/verset.js' });
  writeSafe(versetJsPath, js);
  console.log(`✓ site/assets/verset.js optimisé (${modifs} blocs soleil/lune neutralisés, syntaxe 100% valide).`);
}

// 3. Incrémenter la version du Service Worker
let sw = fs.readFileSync(swPath, 'utf8');
sw = sw.replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
new vm.Script(sw, { filename: 'site/sw.js' });
writeSafe(swPath, sw);
console.log('✓ site/sw.js version incrémentée.');
/* ONEDRIVE_SAFE */
const fs = require('fs');
const path = require('path');

function writeSafe(p, d) {
  for (let i = 0; i < 15; i++) {
    try { fs.writeFileSync(p, d, 'utf8'); return; }
    catch (e) {
      if (i === 14) throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80);
    }
  }
}

function readNorm(p) {
  const raw = fs.readFileSync(p, 'utf8');
  return { text: raw.replace(/\r\n/g, '\n'), eol: raw.includes('\r\n') ? '\r\n' : '\n' };
}

function writeNorm(p, text, eol) {
  writeSafe(p, eol === '\r\n' ? text.replace(/\n/g, '\r\n') : text);
}

const cssPath = path.join(__dirname, 'site', 'assets', 'verset.css');
const cssFile = readNorm(cssPath);
let css = cssFile.text;
const MARKER = '/* === WBW_VOWEL_SPACING_FIX_V1 === */';

if (!css.includes(MARKER)) {
  const block = `

${MARKER}
/* Aération entre les voyelles basses arabes (Uthmani) et la traduction dessous */
html body .wbw-word-box .wbw-ar,
html body .wbw-card-v110 .wbw-ar,
html body .wbw-card-v110 .wbw-ar-v110,
html body .wbw-card-unit > *:first-child {
  line-height: 1.72 !important;
  padding-top: 2px !important;
  padding-bottom: 6px !important;
  overflow: visible !important;
}

html body .wbw-word-box .wbw-tr,
html body .wbw-card-v110 .wbw-tr,
html body .wbw-card-v110 .wbw-tr-v110,
html body .wbw-card-unit > *:last-child {
  margin-top: 6px !important;
  padding-top: 2px !important;
  line-height: 1.35 !important;
}

body.wbw-fullscreen-mode .verse-stage .wbw-ar,
body.wbw-fullscreen-mode .verse-stage .wbw-arabic {
  line-height: 1.75 !important;
  padding-bottom: 8px !important;
  overflow: visible !important;
}

body.wbw-fullscreen-mode .verse-stage .wbw-tr,
body.wbw-fullscreen-mode .verse-stage .wbw-trans {
  margin-top: 8px !important;
  line-height: 1.35 !important;
}
`;
  writeNorm(cssPath, css + block, cssFile.eol);
  console.log('✓ site/assets/verset.css : espacement anti-chevauchement des voyelles arabes appliqué.');
} else {
  console.log('ℹ site/assets/verset.css contient déjà WBW_VOWEL_SPACING_FIX_V1.');
}

// Bump cache (_worker.js + sw.js)
const workerPath = path.join(__dirname, 'site', '_worker.js');
const wFile = readNorm(workerPath);
const tag = String(Date.now());
const wNew = wFile.text
  .replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`)
  .replace(/htmlPropre\.replace\(\/v=1795050050086\/g,\s*"v=\d+"\)/, `htmlPropre.replace(/v=1795050050086/g, "v=${tag}")`);
writeNorm(workerPath, wNew, wFile.eol);

const swPath = path.join(__dirname, 'site', 'sw.js');
const swFile = readNorm(swPath);
const swNew = swFile.text.replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
writeNorm(swPath, swNew, swFile.eol);
console.log(`✓ _worker.js (?v=${tag}) et sw.js incrémentés.`);
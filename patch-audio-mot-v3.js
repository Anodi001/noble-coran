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

// 1. Patch site/assets/verset.js
const jsPath = path.join(__dirname, 'site', 'assets', 'verset.js');
const jsFile = readNorm(jsPath);
let js = jsFile.text;

// 1a. Empêcher la mini-barre .wbw-scrub-wrap de relancer le récitateur au pointerdown
const oldScrubPtr =
`      wrap.addEventListener('pointerdown', function(ev) {
        ev.stopPropagation(); ev.stopImmediatePropagation(); ev.preventDefault();
        allerAuDebutDuMot(parseInt(wrap.dataset.wbwIdx, 10) || 0);
      }, false);`;

const newScrubPtr =
`      wrap.addEventListener('pointerdown', function(ev) {
        ev.stopPropagation(); ev.stopImmediatePropagation(); ev.preventDefault();
        var idxScrub = parseInt(wrap.dataset.wbwIdx, 10) || 0;
        var carteScrub = wrap.closest ? wrap.closest('.wbw-card-v110, .wbw-word-box, .wbw-card-unit') : wrap.parentElement;
        if (window.__wbwAudioClickPro && carteScrub) window.__wbwAudioClickPro.jouer(carteScrub, idxScrub);
      }, false);`;

if (js.includes(oldScrubPtr)) {
  js = js.replace(oldScrubPtr, newScrubPtr);
} else if (!js.includes('var idxScrub = parseInt(wrap.dataset.wbwIdx, 10) || 0;')) {
  throw new Error('Ancre creerBarreScrubPourCarte introuvable dans verset.js');
}

// 1b. Corriger construireUrlMot : toujours utiliser l'index séquentiel 1..N (wbwOrd), jamais audio_url buggé après signes de pause
const oldUrlFn =
`  function construireUrlMot(el, idx0) {
    var raw = (el && el.dataset && el.dataset.wbwAudioUrl) ? el.dataset.wbwAudioUrl.trim() : '';
    if (raw) {
      if (/^https?:\\/\\//i.test(raw)) return raw;
      return 'https://audio.qurancdn.com/' + raw.replace(/^\\/+/, '');
    }
    var sv = trouverSV();
    if (!sv) return '';
    var pos = (el && el.dataset && el.dataset.wbwPos)
      ? parseInt(el.dataset.wbwPos, 10)
      : ((el && el.dataset && el.dataset.wbwOrd) ? parseInt(el.dataset.wbwOrd, 10) : (idx0 + 1));
    if (!pos || pos < 1) pos = idx0 + 1;
    return 'https://audio.qurancdn.com/wbw/' + pad3(sv.s) + '_' + pad3(sv.v) + '_' + pad3(pos) + '.mp3';
  }`;

const newUrlFn =
`  function construireUrlMot(el, idx0) {
    var sv = trouverSV();
    if (!sv) return '';
    var ord = (el && el.dataset && el.dataset.wbwOrd)
      ? parseInt(el.dataset.wbwOrd, 10)
      : (idx0 + 1);
    if (!ord || ord < 1) ord = idx0 + 1;
    return 'https://audio.qurancdn.com/wbw/' + pad3(sv.s) + '_' + pad3(sv.v) + '_' + pad3(ord) + '.mp3';
  }`;

if (js.includes(oldUrlFn)) {
  js = js.replace(oldUrlFn, newUrlFn);
} else if (!js.includes('return \'https://audio.qurancdn.com/wbw/\' + pad3(sv.s) + \'_\' + pad3(sv.v) + \'_\' + pad3(ord) + \'.mp3\';')) {
  throw new Error('Ancre construireUrlMot introuvable dans verset.js');
}

writeNorm(jsPath, js, jsFile.eol);
console.log('✓ site/assets/verset.js : numérotation séquentielle 1..N (fix signes de pause) + blocage reprise scrub appliqués.');

// 2. Patch site/assets/verset.css (désactiver sélection bleue au clic rapide + rendre .wbw-scrub-wrap transparent aux clics)
const cssPath = path.join(__dirname, 'site', 'assets', 'verset.css');
const cssFile = readNorm(cssPath);
let css = cssFile.text;
const CSS_V3 = '/* WBW_WORD_AUDIO_UX_V3 */';

if (!css.includes(CSS_V3)) {
  const blockCssV3 = `

${CSS_V3}
.wbw-word-box,
.wbw-word-box *,
.wbw-card-v110,
.wbw-card-v110 *,
.wbw-card-unit,
.wbw-card-unit *,
.inline-clickable-word,
.inline-clickable-word * {
  user-select: none !important;
  -webkit-user-select: none !important;
  -webkit-touch-callout: none !important;
}

.wbw-scrub-wrap,
.wbw-scrub-wrap * {
  pointer-events: none !important;
}
`;
  writeNorm(cssPath, css + blockCssV3, cssFile.eol);
  console.log('✓ site/assets/verset.css : anti-sélection bleue + pointer-events:none sur scrub-wrap ajoutés.');
} else {
  console.log('ℹ site/assets/verset.css contient déjà WBW_WORD_AUDIO_UX_V3.');
}

// 3. Bump cache (_worker.js + sw.js)
const workerPath = path.join(__dirname, 'site', '_worker.js');
const wFile = readNorm(workerPath);
const tag = String(Date.now());
let w = wFile.text
  .replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`)
  .replace(/htmlPropre\.replace\(\/v=1795050050086\/g,\s*"v=\d+"\)/, `htmlPropre.replace(/v=1795050050086/g, "v=${tag}")`);
writeNorm(workerPath, w, wFile.eol);

const swPath = path.join(__dirname, 'site', 'sw.js');
const swFile = readNorm(swPath);
let sw = swFile.text.replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
writeNorm(swPath, sw, swFile.eol);
console.log(`✓ _worker.js (?v=${tag}) et sw.js incrémentés.`);
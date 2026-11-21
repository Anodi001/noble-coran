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

// 1a. Arrêt propre du mot isolé lors de allerAuVerset
const anchorNav = '    if (!audio.paused) audio.pause(); arreterVisuel();';
if (!js.includes(anchorNav)) throw new Error('Ancre allerAuVerset introuvable dans verset.js');
if (!js.includes('if (window.__wbwAudioClickPro) window.__wbwAudioClickPro.stopper(); if (!audio.paused)')) {
  js = js.replace(
    anchorNav,
    '    if (window.__wbwAudioClickPro) window.__wbwAudioClickPro.stopper(); if (!audio.paused) audio.pause(); arreterVisuel();'
  );
}

// 1b. Remplacer les handlers hybrides par le clic mot isolé direct (avec pause propre du verset)
const oldClickBlock =
`      var carteCliquee = e.target && e.target.closest ? e.target.closest('.wbw-card-v110, .wbw-word-box, .wbw-card-unit') : null;
      if (carteCliquee) {
        e.stopPropagation(); e.stopImmediatePropagation(); e.preventDefault();
        var idxCarte = (parseInt(carteCliquee.dataset.wbwOrd, 10) || 0) - 1;
        if (idxCarte < 0 && carteCliquee.parentElement) {
          idxCarte = Array.prototype.slice.call(carteCliquee.parentElement.querySelectorAll('.wbw-card-v110, .wbw-word-box, .wbw-card-unit')).indexOf(carteCliquee);
        }
        if (idxCarte < 0) idxCarte = 0;
        if (window.__wbwAudioClickPro && !window.__wbwAudioClickPro.estVersetEnLecture()) {
          window.__wbwAudioClickPro.jouer(carteCliquee, idxCarte);
        } else {
          if (window.__wbwAudioClickPro) window.__wbwAudioClickPro.stopper();
          allerAuDebutDuMot(idxCarte);
        }
        return false;
      }
      var motNormalClique = e.target && e.target.closest ? e.target.closest('.inline-clickable-word, .ar-word-follow') : null;
      if (motNormalClique) {
        e.stopPropagation(); e.stopImmediatePropagation(); e.preventDefault();
        var pCont = motNormalClique.parentElement;
        var tousM = pCont ? Array.prototype.slice.call(pCont.querySelectorAll('.inline-clickable-word, .ar-word-follow')) : [];
        var idxM = tousM.indexOf(motNormalClique);
        if (idxM >= 0) {
          if (window.__wbwAudioClickPro && !window.__wbwAudioClickPro.estVersetEnLecture()) {
            window.__wbwAudioClickPro.jouer(motNormalClique, idxM);
          } else {
            if (window.__wbwAudioClickPro) window.__wbwAudioClickPro.stopper();
            var audM = document.getElementById('ayahAudio');
            if (audM && audM.duration) {
              audM.currentTime = (idxM / Math.max(1, tousM.length)) * audM.duration * 0.94;
              if (audM.paused) { var pB = document.getElementById('playSyncBtn'); if (pB) pB.click(); else audM.play().catch(function(){}); }
            }
          }
        }
        return false;
      }`;

const newClickBlock =
`      var carteCliquee = e.target && e.target.closest ? e.target.closest('.wbw-card-v110, .wbw-word-box, .wbw-card-unit') : null;
      if (carteCliquee) {
        e.stopPropagation(); e.stopImmediatePropagation(); e.preventDefault();
        var idxCarte = (parseInt(carteCliquee.dataset.wbwOrd, 10) || 0) - 1;
        if (idxCarte < 0 && carteCliquee.parentElement) {
          idxCarte = Array.prototype.slice.call(carteCliquee.parentElement.querySelectorAll('.wbw-card-v110, .wbw-word-box, .wbw-card-unit')).indexOf(carteCliquee);
        }
        if (idxCarte < 0) idxCarte = 0;
        if (window.__wbwAudioClickPro) window.__wbwAudioClickPro.jouer(carteCliquee, idxCarte);
        return false;
      }
      var motNormalClique = e.target && e.target.closest ? e.target.closest('.inline-clickable-word, .ar-word-follow') : null;
      if (motNormalClique) {
        e.stopPropagation(); e.stopImmediatePropagation(); e.preventDefault();
        var pCont = motNormalClique.parentElement;
        var tousM = pCont ? Array.prototype.slice.call(pCont.querySelectorAll('.inline-clickable-word, .ar-word-follow')) : [];
        var idxM = tousM.indexOf(motNormalClique);
        if (idxM >= 0 && window.__wbwAudioClickPro) {
          window.__wbwAudioClickPro.jouer(motNormalClique, idxM);
        }
        return false;
      }`;

if (js.includes(oldClickBlock)) {
  js = js.replace(oldClickBlock, newClickBlock);
} else if (!js.includes('if (window.__wbwAudioClickPro) window.__wbwAudioClickPro.jouer(carteCliquee, idxCarte);')) {
  throw new Error('Bloc clic V1 introuvable dans verset.js');
}

// 1c. Remplacer le module V1 en fin de fichier par la V2
const v1Start = js.indexOf('/* === MODULE AUDIO MOT-A-MOT HYBRIDE PRO V1 === */');
const v2Start = js.indexOf('/* === MODULE AUDIO MOT-A-MOT PRO V2 === */');
const cutPos = v2Start !== -1 ? v2Start : v1Start;
if (cutPos === -1) throw new Error('Module V1 introuvable en fin de verset.js');

const moduleV2 = `/* === MODULE AUDIO MOT-A-MOT PRO V2 === */
(function() {
  if (window.__MODULE_WBW_AUDIO_CLICK_V2__) return;
  window.__MODULE_WBW_AUDIO_CLICK_V2__ = true;

  var player = null;
  var activeEl = null;
  var playToken = 0;
  var safetyTimer = null;
  var loadTimer = null;

  function getPlayer() {
    if (!player) {
      player = document.getElementById('wbwSingleWordAudio');
      if (!player) {
        player = document.createElement('audio');
        player.id = 'wbwSingleWordAudio';
        player.style.display = 'none';
        document.body.appendChild(player);
      }
      player.setAttribute('playsinline', '');
      player.preload = 'auto';

      player.addEventListener('playing', function() {
        clearTimeout(loadTimer);
        if (activeEl) activeEl.classList.remove('wbw-word-loading');
      });
      player.addEventListener('ended', nettoyerVisuel);
      player.addEventListener('error', nettoyerVisuel);
    }
    return player;
  }

  function nettoyerVisuel() {
    clearTimeout(safetyTimer);
    clearTimeout(loadTimer);
    if (activeEl) {
      activeEl.classList.remove('wbw-word-speaking', 'wbw-word-loading');
      activeEl = null;
    }
    var restes = document.querySelectorAll('.wbw-word-speaking, .wbw-word-loading');
    for (var i = 0; i < restes.length; i++) {
      restes[i].classList.remove('wbw-word-speaking', 'wbw-word-loading');
    }
  }

  function stopperMotIsole() {
    playToken++;
    nettoyerVisuel();
    if (player) {
      try {
        player.pause();
        player.currentTime = 0;
      } catch (e) {}
    }
  }

  function pauserVersetProprement() {
    var aud = document.getElementById('ayahAudio');
    if (aud && !aud.paused && !aud.ended) {
      if (typeof window.toggleAudioSync === 'function') {
        try { window.toggleAudioSync(); } catch (e) { aud.pause(); }
      } else {
        aud.pause();
      }
      if (!aud.paused) {
        try { aud.pause(); } catch (e) {}
      }
    }
  }

  function pad3(n) {
    return String(Math.max(1, parseInt(n, 10) || 1)).padStart(3, '0');
  }

  function trouverSV() {
    if (window.__wbwCleVersetActuelle && /^\\d+:\\d+$/.test(window.__wbwCleVersetActuelle)) {
      var parts = window.__wbwCleVersetActuelle.split(':');
      return { s: parseInt(parts[0], 10), v: parseInt(parts[1], 10) };
    }
    var mUrl = (location.pathname || '').match(/sourate-(\\d+)-verset-(\\d+)/i);
    if (mUrl) return { s: parseInt(mUrl[1], 10), v: parseInt(mUrl[2], 10) };
    return null;
  }

  function construireUrlMot(el, idx0) {
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
  }

  function jouerMotIsole(el, idx0) {
    var url = construireUrlMot(el, idx0);
    if (!url) return false;

    // Mettre le verset en pause proprement (zéro superposition ni bégaiement)
    pauserVersetProprement();

    var p = getPlayer();
    var myToken = ++playToken;

    nettoyerVisuel();
    activeEl = el;
    if (el) {
      el.classList.add('wbw-word-speaking');
      loadTimer = setTimeout(function() {
        if (myToken === playToken && activeEl === el && p.readyState < 3) {
          el.classList.add('wbw-word-loading');
        }
      }, 160);
    }

    safetyTimer = setTimeout(function() {
      if (myToken === playToken) nettoyerVisuel();
    }, 6500);

    try {
      if (p.src === url && p.readyState >= 2) {
        p.currentTime = 0;
      } else {
        p.pause();
        p.src = url;
      }
      var prom = p.play();
      if (prom && typeof prom.catch === 'function') {
        prom.catch(function() {
          if (myToken === playToken) nettoyerVisuel();
        });
      }
    } catch (e) {
      if (myToken === playToken) nettoyerVisuel();
    }
    return true;
  }

  function attacherArretAuto() {
    var aud = document.getElementById('ayahAudio');
    if (aud && !aud.__wbwStopHookedV2) {
      aud.__wbwStopHookedV2 = true;
      aud.addEventListener('play', stopperMotIsole);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attacherArretAuto);
  } else {
    attacherArretAuto();
  }
  window.addEventListener('popstate', stopperMotIsole);
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) stopperMotIsole();
  });

  window.__wbwAudioClickPro = {
    jouer: jouerMotIsole,
    stopper: stopperMotIsole,
    attacherArretAuto: attacherArretAuto
  };
})();
`;

js = js.slice(0, cutPos) + moduleV2;
writeNorm(jsPath, js, jsFile.eol);
console.log('✓ site/assets/verset.js : audio mot-à-mot V2 (pause auto du verset + zéro bégaiement) appliqué.');

// 2. Patch site/assets/verset.css (halo ::after + filter qui résiste aux inline !important)
const cssPath = path.join(__dirname, 'site', 'assets', 'verset.css');
const cssFile = readNorm(cssPath);
let css = cssFile.text;

const cssV1 = css.indexOf('/* WBW_WORD_AUDIO_SPEAKING_V1 */');
const cssV2 = css.indexOf('/* WBW_WORD_AUDIO_SPEAKING_V2 */');
const cssCut = cssV2 !== -1 ? cssV2 : cssV1;
if (cssCut !== -1) css = css.slice(0, cssCut).trimEnd();

const cssBlockV2 = `

/* WBW_WORD_AUDIO_SPEAKING_V2 */
@keyframes wbwSpeakHaloV2 {
  0%, 100% {
    box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.52), 0 0 20px rgba(14, 165, 233, 0.34);
    border-color: rgba(56, 189, 248, 0.78);
  }
  50% {
    box-shadow: 0 0 0 2px rgba(125, 211, 252, 0.85), 0 0 28px rgba(56, 189, 248, 0.58);
    border-color: rgba(186, 230, 253, 0.95);
  }
}

.wbw-word-box,
.wbw-card-v110,
.inline-clickable-word {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.wbw-word-box.wbw-word-speaking,
.wbw-card-v110.wbw-word-speaking,
.wbw-card-unit.wbw-word-speaking {
  position: relative !important;
  z-index: 4 !important;
  isolation: isolate !important;
  opacity: 1 !important;
}

.wbw-word-box.wbw-word-speaking::after,
.wbw-card-v110.wbw-word-speaking::after,
.wbw-card-unit.wbw-word-speaking::after {
  content: "" !important;
  position: absolute !important;
  inset: -4px -6px !important;
  border-radius: 16px !important;
  background: radial-gradient(circle at 50% 45%, rgba(56, 189, 248, 0.24), rgba(14, 165, 233, 0.10)) !important;
  border: 1.5px solid rgba(56, 189, 248, 0.82) !important;
  animation: wbwSpeakHaloV2 1.05s ease-in-out infinite !important;
  pointer-events: none !important;
  z-index: -1 !important;
}

.wbw-word-box.wbw-word-speaking .wbw-ar,
.wbw-word-box.wbw-word-speaking .wbw-ar-v110,
.wbw-card-v110.wbw-word-speaking .wbw-ar-v110 {
  filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.95)) !important;
  opacity: 1 !important;
}

.wbw-word-box.wbw-word-speaking .wbw-tr,
.wbw-word-box.wbw-word-speaking .wbw-tr-v110,
.wbw-card-v110.wbw-word-speaking .wbw-tr-v110 {
  color: #bae6fd !important;
  opacity: 1 !important;
}

.inline-clickable-word.wbw-word-speaking {
  position: relative !important;
  background: rgba(14, 165, 233, 0.20) !important;
  outline: 1.5px solid rgba(56, 189, 248, 0.8) !important;
  border-radius: 12px !important;
  filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.92)) !important;
}

.wbw-word-loading {
  opacity: 0.78 !important;
}
`;

writeNorm(cssPath, css + cssBlockV2, cssFile.eol);
console.log('✓ site/assets/verset.css : halo cyan V2 (::after + drop-shadow) appliqué.');

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
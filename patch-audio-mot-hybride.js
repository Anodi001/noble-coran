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

const JS_MARKER = '__MODULE_WBW_AUDIO_CLICK_V1__';
if (js.includes(JS_MARKER)) {
  console.log('ℹ site/assets/verset.js contient déjà le module audio mot-à-mot hybride.');
} else {
  // Ancre A : mémoriser la clé du verset + couper le mot isolé au changement de verset
  const anchorA = '      motsActuelsDuVerset = vraisMots;';
  if (!js.includes(anchorA)) throw new Error('Ancre A introuvable dans verset.js');
  js = js.replace(
    anchorA,
    anchorA + '\n      window.__wbwCleVersetActuelle = cleVerset;\n      if (window.__wbwAudioClickPro) { window.__wbwAudioClickPro.stopper(); window.__wbwAudioClickPro.attacherArretAuto(); }'
  );

  // Ancre B : stocker audio_url et position exacte sur les mots Classique (.inline-clickable-word)
  const anchorB =
`        vraisMots.forEach(w => {
          const span = document.createElement('span');
          span.className = 'inline-clickable-word';
          span.innerHTML = modeTajweedActif ? w.htmlTajweedMot : w.text_uthmani;`;
  if (!js.includes(anchorB)) throw new Error('Ancre B introuvable dans verset.js');
  js = js.replace(
    anchorB,
`        vraisMots.forEach((w, idxW) => {
          const span = document.createElement('span');
          span.className = 'inline-clickable-word';
          span.dataset.wbwOrd = String(w.indexMotReel || (idxW + 1));
          span.dataset.wbwPos = String(w.position || w.indexMotReel || (idxW + 1));
          if (w.audio_url) span.dataset.wbwAudioUrl = w.audio_url;
          span.innerHTML = modeTajweedActif ? w.htmlTajweedMot : w.text_uthmani;`
  );

  // Ancre C : stocker audio_url et position exacte sur les cartes Mot à mot (.wbw-word-box)
  const anchorC =
`        vraisMots.forEach(w => {
          const item = document.createElement('div');
          item.className = 'wbw-word-box';`;
  if (!js.includes(anchorC)) throw new Error('Ancre C introuvable dans verset.js');
  js = js.replace(
    anchorC,
`        vraisMots.forEach((w, idxW) => {
          const item = document.createElement('div');
          item.className = 'wbw-word-box';
          item.dataset.wbwOrd = String(w.indexMotReel || (idxW + 1));
          item.dataset.wbwPos = String(w.position || w.indexMotReel || (idxW + 1));
          if (w.audio_url) item.dataset.wbwAudioUrl = w.audio_url;`
  );

  // Ancre D : brancher la logique Hybride dans l'intercepteur de clic global
  const anchorD =
`      var carteCliquee = e.target && e.target.closest ? e.target.closest('.wbw-card-v110, .wbw-word-box, .wbw-card-unit') : null;
      if (carteCliquee) {
        e.stopPropagation(); e.stopImmediatePropagation(); e.preventDefault();
        var idxCarte = (parseInt(carteCliquee.dataset.wbwOrd, 10) || 1) - 1;
        allerAuDebutDuMot(idxCarte);
        return false;
      }
      var motNormalClique = e.target && e.target.closest ? e.target.closest('.inline-clickable-word, .ar-word-follow') : null; if (motNormalClique) { e.stopPropagation(); e.stopImmediatePropagation(); e.preventDefault(); var pCont = motNormalClique.parentElement; var tousM = pCont ? Array.prototype.slice.call(pCont.querySelectorAll('.inline-clickable-word, .ar-word-follow')) : []; var idxM = tousM.indexOf(motNormalClique); if (idxM >= 0) { var audM = document.getElementById('ayahAudio'); if (audM && audM.duration) { audM.currentTime = (idxM / Math.max(1, tousM.length)) * audM.duration * 0.94; if (audM.paused) { var pB = document.getElementById('playSyncBtn'); if (pB) pB.click(); else audM.play().catch(function(){}); } } } return false; }`;

  if (!js.includes(anchorD)) throw new Error('Ancre D introuvable dans verset.js');
  js = js.replace(
    anchorD,
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
      }`
  );

  // Module autonome en fin de fichier
  const moduleCode = `
/* === MODULE AUDIO MOT-A-MOT HYBRIDE PRO V1 === */
(function() {
  if (window.${JS_MARKER}) return;
  window.${JS_MARKER} = true;

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
      }, 150);
    }

    safetyTimer = setTimeout(function() {
      if (myToken === playToken) nettoyerVisuel();
    }, 7000);

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

  function estVersetEnLecture() {
    var aud = document.getElementById('ayahAudio');
    return !!(aud && !aud.paused && !aud.ended);
  }

  function attacherArretAuto() {
    var aud = document.getElementById('ayahAudio');
    if (aud && !aud.__wbwStopHookedV1) {
      aud.__wbwStopHookedV1 = true;
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
    estVersetEnLecture: estVersetEnLecture,
    attacherArretAuto: attacherArretAuto
  };
})();
`;

  js = js + '\n' + moduleCode;
  writeNorm(jsPath, js, jsFile.eol);
  console.log('✓ site/assets/verset.js : audio mot-à-mot hybride injecté.');
}

// 2. Patch site/assets/verset.css
const cssPath = path.join(__dirname, 'site', 'assets', 'verset.css');
const cssFile = readNorm(cssPath);
let css = cssFile.text;
const CSS_MARKER = '/* WBW_WORD_AUDIO_SPEAKING_V1 */';

if (css.includes(CSS_MARKER)) {
  console.log('ℹ site/assets/verset.css contient déjà le style audio mot-à-mot.');
} else {
  const cssBlock = `
${CSS_MARKER}
@keyframes wbwSpeakPulseV1 {
  0%, 100% { box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.42), 0 8px 24px rgba(14, 165, 233, 0.28); }
  50% { box-shadow: 0 0 0 2px rgba(125, 211, 252, 0.72), 0 10px 30px rgba(56, 189, 248, 0.46); }
}

.wbw-word-box,
.inline-clickable-word {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.wbw-word-box.wbw-word-speaking,
.wbw-card-v110.wbw-word-speaking,
.wbw-card-unit.wbw-word-speaking {
  background: rgba(14, 165, 233, 0.16) !important;
  border-color: rgba(56, 189, 248, 0.75) !important;
  border-radius: 16px !important;
  transform: translateY(-2px) scale(1.03) !important;
  opacity: 1 !important;
  animation: wbwSpeakPulseV1 1.1s ease-in-out infinite !important;
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease !important;
}

.wbw-word-box.wbw-word-speaking .wbw-ar,
.wbw-word-box.wbw-word-speaking .wbw-ar-v110,
.wbw-card-v110.wbw-word-speaking .wbw-ar-v110 {
  text-shadow: 0 0 14px rgba(56, 189, 248, 0.92), 0 0 28px rgba(14, 165, 233, 0.55) !important;
  opacity: 1 !important;
}

.wbw-word-box.wbw-word-speaking .wbw-tr,
.wbw-word-box.wbw-word-speaking .wbw-tr-v110,
.wbw-card-v110.wbw-word-speaking .wbw-tr-v110 {
  color: #bae6fd !important;
  opacity: 1 !important;
}

.inline-clickable-word.wbw-word-speaking {
  background: rgba(14, 165, 233, 0.18) !important;
  border-color: rgba(56, 189, 248, 0.7) !important;
  box-shadow: 0 0 18px rgba(56, 189, 248, 0.34) !important;
  text-shadow: 0 0 14px rgba(56, 189, 248, 0.92) !important;
  border-radius: 12px !important;
}

.wbw-word-loading {
  opacity: 0.78 !important;
}
`;
  writeNorm(cssPath, css + '\n' + cssBlock, cssFile.eol);
  console.log('✓ site/assets/verset.css : halo cyan mot prononcé ajouté.');
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
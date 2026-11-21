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

// 1a. Corriger l'ID QDC de Yasser Al-Dussary (97 au lieu de 174/168 qui pointait vers Minshawi Kids)
const oldDosariMap = '    dosari: [174, 168], dossari: [174, 168], yasser: [174, 168],';
const newDosariMap = '    dosari: [97], dossari: [97], yasser: [97],';
if (js.includes(oldDosariMap)) {
  js = js.replace(oldDosariMap, newDosariMap);
} else if (!js.includes(newDosariMap)) {
  throw new Error('Ancre MAP_NOMS_VERS_QDC (dosari) introuvable dans verset.js');
}

// 1b. Exposer un helper global pour lire les vrais timestamps QDC d'un mot (accessible partout)
const oldQdcEnd = '      .catch(function () {}).finally(function () { delete requetesEnCours[cleChap]; }); }';
const newQdcEnd =
`      .catch(function () {}).finally(function () { delete requetesEnCours[cleChap]; }); }
  window.__wbwGetQdcSegmentStart = function(idxMot, vk) {
    try {
      var cleRec = obtenirCleRecitateurSelectionne();
      if (!cleRec || !vk) return null;
      var cle = cleRec + "_" + vk;
      var liste = cacheTimingVerset[cle];
      if (!liste || !liste.length) {
        chargerTimestampsQdc(cleRec, vk);
        return null;
      }
      for (var i = 0; i < liste.length; i++) {
        if (liste[i] && liste[i].wordIndex === idxMot && typeof liste[i].rStart === "number") {
          return liste[i].rStart;
        }
      }
      return null;
    } catch (e) { return null; }
  };`;

if (js.includes(oldQdcEnd) && !js.includes('window.__wbwGetQdcSegmentStart')) {
  js = js.replace(oldQdcEnd, newQdcEnd);
} else if (!js.includes('window.__wbwGetQdcSegmentStart')) {
  throw new Error('Ancre chargerTimestampsQdc introuvable dans verset.js');
}

// 1c. Rendre allerAuDebutDuMot précis (timestamps QDC prioritaires + lead-in -0.04s)
const oldSeekCalc =
`      if (idxMot > 0 && dur && isFinite(dur) && dur > 0) {
        var fen = calculerFenetresMots(dur);
        if (fen[idxMot] && typeof fen[idxMot].t0 === 'number') {
          tCible = Math.max(0, Math.min(dur - 0.08, fen[idxMot].t0));
        } else if (typeof tempsDebutReelObserve[idxMot] === 'number') {
          tCible = Math.max(0, Math.min(dur - 0.08, tempsDebutReelObserve[idxMot]));
        } else {
          tCible = (idxMot / cacheMetaCartes.length) * dur;
        }
      }`;

const newSeekCalc =
`      if (idxMot > 0 && dur && isFinite(dur) && dur > 0) {
        var vkSeek = (typeof obtenirCleVersetActuelDom === 'function') ? obtenirCleVersetActuelDom() : (window.__wbwCleVersetActuelle || '');
        var rQdc = (typeof window.__wbwGetQdcSegmentStart === 'function' && vkSeek) ? window.__wbwGetQdcSegmentStart(idxMot, vkSeek) : null;
        if (typeof rQdc === 'number' && isFinite(rQdc) && rQdc >= 0 && rQdc <= 0.99) {
          tCible = Math.max(0, Math.min(dur - 0.08, rQdc * dur - 0.04));
        } else if (typeof tempsDebutReelObserve[idxMot] === 'number' && tempsDebutReelObserve[idxMot] > 0) {
          tCible = Math.max(0, Math.min(dur - 0.08, tempsDebutReelObserve[idxMot] - 0.03));
        } else {
          var fen = calculerFenetresMots(dur);
          if (fen[idxMot] && typeof fen[idxMot].t0 === 'number') {
            tCible = Math.max(0, Math.min(dur - 0.08, fen[idxMot].t0));
          } else {
            tCible = (idxMot / cacheMetaCartes.length) * dur;
          }
        }
      }`;

if (js.includes(oldSeekCalc)) {
  js = js.replace(oldSeekCalc, newSeekCalc);
} else if (!js.includes('var rQdc = (typeof window.__wbwGetQdcSegmentStart')) {
  throw new Error('Ancre allerAuDebutDuMot introuvable dans verset.js');
}

// 1d. Exposer les ratios pondérés des mots courants pour le mode Classique
const anchorMots = '      window.__wbwCleVersetActuelle = cleVerset;';
if (js.includes(anchorMots) && !js.includes('window.__wbwMotsCourants = vraisMots;')) {
  js = js.replace(anchorMots, anchorMots + '\n      window.__wbwMotsCourants = vraisMots;');
}

// 1e. Ne plus laisser les cartes sombres/grisées quand le verset est en pause
const oldPauseDim = '    var dirLecture = detecterSensLectureGrille(), audioActif = Boolean(suiviBoutonOn && (audioJoue || maxIdxAtteintVerset >= 0));';
const newPauseDim = '    var dirLecture = detecterSensLectureGrille(), audioActif = Boolean(suiviBoutonOn && (audioJoue || maintenant < expIdxMotForce));';
if (js.includes(oldPauseDim)) {
  js = js.replace(oldPauseDim, newPauseDim);
} else if (!js.includes(newPauseDim)) {
  throw new Error('Ancre audioActif (contraste en pause) introuvable dans verset.js');
}

// 1f. Rétablir le mode Hybride propre : lecture active => saute à ce mot et continue ; en pause => mot isolé
const oldClickV2 =
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

const newClickV4 =
`      var carteCliquee = e.target && e.target.closest ? e.target.closest('.wbw-card-v110, .wbw-word-box, .wbw-card-unit') : null;
      if (carteCliquee) {
        e.stopPropagation(); e.stopImmediatePropagation(); e.preventDefault();
        var idxCarte = (parseInt(carteCliquee.dataset.wbwOrd, 10) || 0) - 1;
        if (idxCarte < 0 && carteCliquee.parentElement) {
          idxCarte = Array.prototype.slice.call(carteCliquee.parentElement.querySelectorAll('.wbw-card-v110, .wbw-word-box, .wbw-card-unit')).indexOf(carteCliquee);
        }
        if (idxCarte < 0) idxCarte = 0;
        if (window.__wbwAudioClickPro && window.__wbwAudioClickPro.estVersetEnLecture()) {
          window.__wbwAudioClickPro.stopper();
          window.__wbwAudioClickPro.flasherSaut(carteCliquee);
          allerAuDebutDuMot(idxCarte);
        } else if (window.__wbwAudioClickPro) {
          window.__wbwAudioClickPro.jouer(carteCliquee, idxCarte);
        }
        return false;
      }
      var motNormalClique = e.target && e.target.closest ? e.target.closest('.inline-clickable-word, .ar-word-follow') : null;
      if (motNormalClique) {
        e.stopPropagation(); e.stopImmediatePropagation(); e.preventDefault();
        var pCont = motNormalClique.parentElement;
        var tousM = pCont ? Array.prototype.slice.call(pCont.querySelectorAll('.inline-clickable-word, .ar-word-follow')) : [];
        var idxM = tousM.indexOf(motNormalClique);
        if (idxM >= 0 && window.__wbwAudioClickPro) {
          if (window.__wbwAudioClickPro.estVersetEnLecture()) {
            window.__wbwAudioClickPro.stopper();
            window.__wbwAudioClickPro.flasherSaut(motNormalClique);
            window.__wbwAudioClickPro.sauterMotClassique(idxM, tousM.length);
          } else {
            window.__wbwAudioClickPro.jouer(motNormalClique, idxM);
          }
        }
        return false;
      }`;

if (js.includes(oldClickV2)) {
  js = js.replace(oldClickV2, newClickV4);
} else if (!js.includes('window.__wbwAudioClickPro.sauterMotClassique(idxM, tousM.length);')) {
  throw new Error('Ancre clic V2 introuvable dans verset.js');
}

// 1g. Remplacer le module fin de fichier par la V4 (sync Play/Pause garanti + saut précis Classique + flash cyan)
const mStart = js.indexOf('/* === MODULE AUDIO MOT-A-MOT PRO V4 === */') !== -1
  ? js.indexOf('/* === MODULE AUDIO MOT-A-MOT PRO V4 === */')
  : js.indexOf('/* === MODULE AUDIO MOT-A-MOT PRO V2 === */');
if (mStart === -1) throw new Error('Module audio fin de fichier introuvable dans verset.js');

const moduleV4 = `/* === MODULE AUDIO MOT-A-MOT PRO V4 === */
(function() {
  if (window.__MODULE_WBW_AUDIO_CLICK_V4__) return;
  window.__MODULE_WBW_AUDIO_CLICK_V4__ = true;

  var player = null;
  var activeEl = null;
  var playToken = 0;
  var safetyTimer = null;
  var loadTimer = null;
  var jumpTimer = null;

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

  function flasherSaut(el) {
    clearTimeout(jumpTimer);
    var anciens = document.querySelectorAll('.wbw-word-jumped');
    for (var i = 0; i < anciens.length; i++) anciens[i].classList.remove('wbw-word-jumped');
    if (!el) return;
    el.classList.add('wbw-word-jumped');
    jumpTimer = setTimeout(function() {
      el.classList.remove('wbw-word-jumped');
    }, 460);
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
    var sv = trouverSV();
    if (!sv) return '';
    var ord = (el && el.dataset && el.dataset.wbwOrd)
      ? parseInt(el.dataset.wbwOrd, 10)
      : (idx0 + 1);
    if (!ord || ord < 1) ord = idx0 + 1;
    return 'https://audio.qurancdn.com/wbw/' + pad3(sv.s) + '_' + pad3(sv.v) + '_' + pad3(ord) + '.mp3';
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

  function sauterMotClassique(idxM, totalM) {
    var aud = document.getElementById('ayahAudio');
    if (!aud || !aud.duration || !isFinite(aud.duration)) return;
    var dur = aud.duration;
    var tCible = 0;
    if (idxM > 0) {
      var sv = trouverSV();
      var vk = sv ? (sv.s + ':' + sv.v) : '';
      var rQdc = (typeof window.__wbwGetQdcSegmentStart === 'function' && vk)
        ? window.__wbwGetQdcSegmentStart(idxM, vk)
        : null;
      if (typeof rQdc === 'number' && isFinite(rQdc) && rQdc >= 0 && rQdc <= 0.99) {
        tCible = Math.max(0, Math.min(dur - 0.08, rQdc * dur - 0.04));
      } else if (Array.isArray(window.__wbwMotsCourants) && window.__wbwMotsCourants[idxM] && typeof window.__wbwMotsCourants[idxM].ratioDebut === 'number') {
        tCible = Math.max(0, Math.min(dur - 0.08, window.__wbwMotsCourants[idxM].ratioDebut * dur * 0.96));
      } else {
        tCible = Math.max(0, Math.min(dur - 0.08, (idxM / Math.max(1, totalM)) * dur * 0.95));
      }
    }
    try { aud.currentTime = tCible; } catch (e) {}
    if (aud.paused) aud.play().catch(function() {});
  }

  function estVersetEnLecture() {
    var aud = document.getElementById('ayahAudio');
    return !!(aud && !aud.paused && !aud.ended);
  }

  function synchroniserEtatBoutonPlay() {
    var aud = document.getElementById('ayahAudio');
    var playBtn = document.getElementById('playSyncBtn');
    var st = document.querySelector('.verse-stage');
    if (!aud || !playBtn) return;
    var lang = (document.documentElement.lang || 'fr').slice(0, 2).toLowerCase();
    var playing = !aud.paused && !aud.ended;
    if (playing) {
      if (st) st.classList.add('playing');
      playBtn.classList.add('active');
      playBtn.textContent = (lang === 'ar') ? '⏸ إيقاف مؤقت' : '⏸ Pause';
    } else {
      if (st) st.classList.remove('playing');
      playBtn.classList.remove('active');
      if (typeof window.txtPlay === 'function') {
        playBtn.textContent = window.txtPlay();
      } else {
        playBtn.textContent = (lang === 'ar') ? '▶ استمع للآية' : (lang === 'en' ? '▶ Listen to verse' : (lang === 'es' ? '▶ Escuchar aleya' : '▶ Écouter le verset'));
      }
    }
  }

  function attacherArretAuto() {
    var aud = document.getElementById('ayahAudio');
    if (aud && !aud.__wbwStopHookedV4) {
      aud.__wbwStopHookedV4 = true;
      aud.addEventListener('play', function() {
        stopperMotIsole();
        synchroniserEtatBoutonPlay();
        var sv = trouverSV();
        if (sv && typeof window.__wbwGetQdcSegmentStart === 'function') {
          window.__wbwGetQdcSegmentStart(0, sv.s + ':' + sv.v);
        }
      });
      aud.addEventListener('playing', synchroniserEtatBoutonPlay);
      aud.addEventListener('pause', synchroniserEtatBoutonPlay);
      aud.addEventListener('ended', synchroniserEtatBoutonPlay);
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
    flasherSaut: flasherSaut,
    sauterMotClassique: sauterMotClassique,
    attacherArretAuto: attacherArretAuto
  };
})();
`;

js = js.slice(0, mStart) + moduleV4;
writeNorm(jsPath, js, jsFile.eol);
console.log('✓ site/assets/verset.js : mode Hybride V4 (QDC 97 Dosari + reprise fluide + fin cartes sombres en pause + sync Play/Pause) appliqué.');

// 2. Patch site/assets/verset.css (halo sur Classique .ar-word-follow + flash saut + espacement scrub)
const cssPath = path.join(__dirname, 'site', 'assets', 'verset.css');
const cssFile = readNorm(cssPath);
let css = cssFile.text;
const CSS_V4 = '/* WBW_WORD_AUDIO_UX_V4 */';

if (!css.includes(CSS_V4)) {
  const blockCssV4 = `

${CSS_V4}
.ar-word-follow,
.ar-word-follow * {
  cursor: pointer;
  user-select: none !important;
  -webkit-user-select: none !important;
  -webkit-touch-callout: none !important;
  -webkit-tap-highlight-color: transparent;
}

.inline-clickable-word.wbw-word-speaking,
.ar-word-follow.wbw-word-speaking {
  display: inline-block;
  padding: 0 6px;
  border-radius: 12px !important;
  background: rgba(14, 165, 233, 0.22) !important;
  outline: 1.5px solid rgba(56, 189, 248, 0.85) !important;
  filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.95)) !important;
}

.wbw-word-box.wbw-word-jumped::after,
.wbw-card-v110.wbw-word-jumped::after,
.wbw-card-unit.wbw-word-jumped::after {
  content: "" !important;
  position: absolute !important;
  inset: -4px -6px !important;
  border-radius: 16px !important;
  background: rgba(56, 189, 248, 0.18) !important;
  border: 1.5px solid rgba(56, 189, 248, 0.72) !important;
  box-shadow: 0 0 18px rgba(56, 189, 248, 0.35) !important;
  pointer-events: none !important;
  z-index: -1 !important;
}

.wbw-word-box.wbw-word-jumped,
.wbw-card-v110.wbw-word-jumped,
.wbw-card-unit.wbw-word-jumped {
  position: relative !important;
  isolation: isolate !important;
}

.inline-clickable-word.wbw-word-jumped,
.ar-word-follow.wbw-word-jumped {
  border-radius: 10px !important;
  background: rgba(56, 189, 248, 0.22) !important;
  filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.88)) !important;
}

.wbw-scrub-wrap {
  margin-bottom: 6px !important;
}
`;
  writeNorm(cssPath, css + blockCssV4, cssFile.eol);
  console.log('✓ site/assets/verset.css : halo Classique (.ar-word-follow) + flash saut + marge scrub ajoutés.');
} else {
  console.log('ℹ site/assets/verset.css contient déjà WBW_WORD_AUDIO_UX_V4.');
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
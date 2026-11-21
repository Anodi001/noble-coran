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
const indexHtmlPath = path.join(siteDir, 'index.html');
const workerPath = path.join(siteDir, '_worker.js');
const swPath = path.join(siteDir, 'sw.js');

// ============================================================================
// 1. PLEIN ÉCRAN V3 + AUTO-UPDATE SERVICE WORKER DANS SITE/ASSETS/VERSET.JS
// ============================================================================
const rawJs = fs.readFileSync(versetJsPath, 'utf8');
const eolJs = rawJs.includes('\r\n') ? '\r\n' : '\n';
let js = rawJs.replace(/\r\n/g, '\n');

const debutFs = '/* __MODULE_FULLSCREEN_FOCUS_V1__ */';
const iFs = js.indexOf(debutFs);
if (iFs === -1) throw new Error('Module __MODULE_FULLSCREEN_FOCUS_V1__ introuvable dans site/assets/verset.js');

const moduleFsV3 = `/* __MODULE_FULLSCREEN_FOCUS_V1__ */
/* __MODULE_FULLSCREEN_FOCUS_V3__ */
(function moduleFullscreenFocusV3() {
  var LABELS_FS = {
    fr: { btn: '⛶ Plein écran', exit: '✕ Quitter', wbw: '📖 Mot à mot', suivi: '✨ Suivi', tajwid: '🎨 Tajwid', auto: '🔁 Auto', hint: 'Espace : Lecture  •  ← → : Versets  •  W : Mot à mot  •  S : Suivi  •  Échap : Quitter' },
    en: { btn: '⛶ Fullscreen', exit: '✕ Exit', wbw: '📖 Word by Word', suivi: '✨ Follow', tajwid: '🎨 Tajwid', auto: '🔁 Auto', hint: 'Space: Play  •  ← →: Verses  •  W: Word by Word  •  S: Follow  •  Esc: Exit' },
    es: { btn: '⛶ Pantalla completa', exit: '✕ Salir', wbw: '📖 Palabra', suivi: '✨ Seguimiento', tajwid: '🎨 Tajwid', auto: '🔁 Auto', hint: 'Espacio: Reproducir  •  ← →: Versículos  •  Esc: Salir' },
    ar: { btn: '⛶ ملء الشاشة', exit: '✕ خروج', wbw: '📖 كلمة بكلمة', suivi: '✨ تتبع', tajwid: '🎨 تجويد', auto: '🔁 تلقائي', hint: 'مسافة: تشغيل  •  ← →: الآيات  •  Esc: خروج' },
    de: { btn: '⛶ Vollbild', exit: '✕ Beenden', wbw: '📖 Wort für Wort', suivi: '✨ Verfolgung', tajwid: '🎨 Tajwid', auto: '🔁 Auto', hint: 'Leertaste: Abspielen  •  ← →: Verse  •  Esc: Beenden' },
    it: { btn: '⛶ Schermo intero', exit: '✕ Esci', wbw: '📖 Parola', suivi: '✨ Seguito', tajwid: '🎨 Tajwid', auto: '🔁 Auto', hint: 'Spazio: Riproduci  •  ← →: Versetti  •  Esc: Esci' },
    id: { btn: '⛶ Layar penuh', exit: '✕ Keluar', wbw: '📖 Kata demi Kata', suivi: '✨ Ikuti', tajwid: '🎨 Tajwid', auto: '🔁 Auto', hint: 'Spasi: Putar  •  ← →: Ayat  •  Esc: Keluar' },
    ru: { btn: '⛶ На весь экран', exit: '✕ Выход', wbw: '📖 Пословно', suivi: '✨ Слежение', tajwid: '🎨 Таджвид', auto: '🔁 Авто', hint: 'Пробел: Воспроизвести  •  ← →: Аяты  •  Esc: Выход' }
  };

  var wakeLockRef = null;

  function demanderWakeLock(actif) {
    try {
      if (!navigator.wakeLock) return;
      if (actif && !wakeLockRef) {
        navigator.wakeLock.request('screen').then(function(l) {
          wakeLockRef = l;
          l.addEventListener('release', function() { wakeLockRef = null; });
        }).catch(function() {});
      } else if (!actif && wakeLockRef) {
        wakeLockRef.release().catch(function() {});
        wakeLockRef = null;
      }
    } catch (e) {}
  }

  function getLangFs() {
    var p = new URLSearchParams(window.location.search).get('lang');
    var l = p ? p.slice(0, 2).toLowerCase() : ((document.documentElement.lang || 'fr').slice(0, 2).toLowerCase());
    return LABELS_FS[l] ? l : 'fr';
  }

  function findBtnByTxt(mots) {
    var btns = document.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
      if (btns[i].closest('#wbwFsTopBarV1')) continue;
      var t = (btns[i].textContent || '').trim();
      for (var k = 0; k < mots.length; k++) if (t.indexOf(mots[k]) !== -1) return btns[i];
    }
    return null;
  }

  function estActif(btn) {
    return Boolean(btn && (btn.classList.contains('active') || btn.getAttribute('aria-pressed') === 'true'));
  }

  function getOrigWbw() {
    return document.getElementById('btnToggleWbw') || document.getElementById('wbwToggleBtn') || findBtnByTxt(['Mot à mot', 'Word by Word', 'Palabra', 'Wort für', 'Parola', 'Kata demi', 'Пословн', 'كلمة بكلمة']);
  }
  function getOrigSuivi() {
    return findBtnByTxt(['Suivi', 'Follow', 'Seguimiento', 'Verfolgung', 'Seguito', 'Ikuti', 'Слежение', 'تتبع']);
  }
  function getOrigTajwid() {
    return findBtnByTxt(['Tajw', 'Таджвид', 'تجويد']);
  }
  function getAutoCheckbox() {
    return document.getElementById('autoPlayToggle') || document.getElementById('autoCheck') || document.querySelector('input[type="checkbox"]');
  }

  function syncFsBar() {
    var bar = document.getElementById('wbwFsTopBarV1');
    var mainBtn = document.getElementById('wbwFullscreenBtnV1');
    var hintEl = document.getElementById('wbwFsHintV3');
    var lang = getLangFs();
    var t = LABELS_FS[lang] || LABELS_FS.fr;
    if (mainBtn) mainBtn.textContent = t.btn;
    if (hintEl) hintEl.textContent = t.hint;
    if (!bar) return;

    var badgeOrig = document.getElementById('badgeNumEl');
    var fsBadge = document.getElementById('wbwFsBadgeV1');
    if (fsBadge && badgeOrig) fsBadge.textContent = (badgeOrig.textContent || '').trim();

    var fsWbw = document.getElementById('wbwFsWbwV1');
    var fsSuivi = document.getElementById('wbwFsSuiviV1');
    var fsTaj = document.getElementById('wbwFsTajwidV1');
    var fsAuto = document.getElementById('wbwFsAutoV1');
    var fsExit = document.getElementById('wbwFsExitV1');

    var origWbw = getOrigWbw();
    var origSuivi = getOrigSuivi();
    var origTaj = getOrigTajwid();
    var autoCb = getAutoCheckbox();

    if (fsWbw) { fsWbw.textContent = t.wbw; fsWbw.classList.toggle('active', estActif(origWbw)); }
    if (fsSuivi) {
      var suiviOn = origSuivi ? estActif(origSuivi) : Boolean(window.__wbwSuiviBoutonActif);
      fsSuivi.textContent = t.suivi;
      fsSuivi.classList.toggle('active', suiviOn);
    }
    if (fsTaj) { fsTaj.textContent = t.tajwid; fsTaj.classList.toggle('active', estActif(origTaj)); }
    if (fsAuto) {
      fsAuto.style.display = autoCb ? '' : 'none';
      fsAuto.textContent = t.auto;
      fsAuto.classList.toggle('active', Boolean(autoCb && autoCb.checked));
    }
    if (fsExit) fsExit.textContent = t.exit;
  }

  function marquerDOMFullscreen(actif) {
    var stage = document.querySelector('.verse-stage');
    if (!stage) return;
    document.documentElement.classList.toggle('wbw-fullscreen-html', actif);
    document.body.classList.toggle('wbw-fullscreen-mode', actif);

    var anciensAnc = document.querySelectorAll('.wbw-fs-ancestor');
    for (var a = 0; a < anciensAnc.length; a++) anciensAnc[a].classList.remove('wbw-fs-ancestor');
    var anciensHid = document.querySelectorAll('.wbw-fs-hidden');
    for (var h = 0; h < anciensHid.length; h++) anciensHid[h].classList.remove('wbw-fs-hidden');

    if (actif) {
      var cur = stage;
      while (cur && cur.parentElement && cur.parentElement !== document.body) {
        var par = cur.parentElement;
        par.classList.add('wbw-fs-ancestor');
        for (var i = 0; i < par.children.length; i++) {
          var sib = par.children[i];
          if (sib !== cur && sib.id !== 'wbwFsTopBarV1' && sib.id !== 'wbwFsHintV3') sib.classList.add('wbw-fs-hidden');
        }
        cur = par;
      }
      for (var b = 0; b < document.body.children.length; b++) {
        var child = document.body.children[b];
        if (child !== cur && child.id !== 'wbwFsTopBarV1' && child.id !== 'wbwFsHintV3' && child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE') {
          child.classList.add('wbw-fs-hidden');
        }
      }
      stage.scrollTop = 0;
    }
    demanderWakeLock(actif);
    syncFsBar();
  }

  function entrerPleinEcran() {
    marquerDOMFullscreen(true);
    try {
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(function() {});
      }
    } catch (e) {}
  }

  function quitterPleinEcran() {
    marquerDOMFullscreen(false);
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(function() {});
      }
    } catch (e) {}
  }

  function installerFullscreen() {
    var stage = document.querySelector('.verse-stage');
    if (!stage) return;

    if (!document.getElementById('wbwFsTopBarV1')) {
      var bar = document.createElement('div');
      bar.id = 'wbwFsTopBarV1';
      bar.className = 'notranslate';
      bar.setAttribute('translate', 'no');
      bar.innerHTML =
        '<div class="wbw-fs-group wbw-fs-scroll">' +
          '<span id="wbwFsBadgeV1" class="wbw-fs-badge"></span>' +
          '<button type="button" id="wbwFsWbwV1" class="wbw-fs-pill">📖 Mot à mot</button>' +
          '<button type="button" id="wbwFsSuiviV1" class="wbw-fs-pill">✨ Suivi</button>' +
          '<button type="button" id="wbwFsTajwidV1" class="wbw-fs-pill">🎨 Tajwid</button>' +
          '<button type="button" id="wbwFsAutoV1" class="wbw-fs-pill">🔁 Auto</button>' +
          '<button type="button" id="wbwFsZoomOutV1" class="wbw-fs-pill" aria-label="Réduire le texte">A−</button>' +
          '<button type="button" id="wbwFsZoomInV1" class="wbw-fs-pill" aria-label="Agrandir le texte">A+</button>' +
        '</div>' +
        '<button type="button" id="wbwFsExitV1" class="wbw-fs-exit">✕ Quitter</button>';
      document.body.appendChild(bar);

      var hint = document.createElement('div');
      hint.id = 'wbwFsHintV3';
      hint.className = 'notranslate';
      hint.setAttribute('translate', 'no');
      document.body.appendChild(hint);

      document.getElementById('wbwFsExitV1').addEventListener('click', function(e) { e.stopPropagation(); quitterPleinEcran(); });
      document.getElementById('wbwFsWbwV1').addEventListener('click', function(e) { e.stopPropagation(); var b = getOrigWbw(); if (b) b.click(); setTimeout(syncFsBar, 60); });
      document.getElementById('wbwFsSuiviV1').addEventListener('click', function(e) { e.stopPropagation(); var b = getOrigSuivi(); if (b) b.click(); setTimeout(syncFsBar, 60); });
      document.getElementById('wbwFsTajwidV1').addEventListener('click', function(e) { e.stopPropagation(); var b = getOrigTajwid(); if (b) b.click(); setTimeout(syncFsBar, 60); });
      document.getElementById('wbwFsAutoV1').addEventListener('click', function(e) {
        e.stopPropagation();
        var cb = getAutoCheckbox();
        if (cb) { cb.checked = !cb.checked; cb.dispatchEvent(new Event('change', { bubbles: true })); }
        setTimeout(syncFsBar, 40);
      });
      document.getElementById('wbwFsZoomOutV1').addEventListener('click', function(e) { e.stopPropagation(); var b = findBtnByTxt(['A-', 'A−', 'A–']); if (b) b.click(); });
      document.getElementById('wbwFsZoomInV1').addEventListener('click', function(e) { e.stopPropagation(); var b = findBtnByTxt(['A+', 'A＋']); if (b) b.click(); });
    }

    if (!document.getElementById('wbwFullscreenBtnV1')) {
      var cible = document.getElementById('wbwAudioRangeBtnV110') || findBtnByTxt(['Bruit', 'Brown', 'Suivi', 'Follow', 'Tajw']);
      if (cible && cible.parentElement) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'wbwFullscreenBtnV1';
        btn.className = 'notranslate';
        btn.addEventListener('click', function() {
          if (document.body.classList.contains('wbw-fullscreen-mode')) quitterPleinEcran();
          else entrerPleinEcran();
        });
        cible.parentElement.insertBefore(btn, cible.nextSibling);
      }
    }
    syncFsBar();
  }

  // Swipe gauche/droite fluide sur iPhone / mobile en mode Plein écran
  var touchStartX = 0, touchStartY = 0, touchStartT = 0, touchIgnore = false;
  document.addEventListener('touchstart', function(e) {
    if (!document.body.classList.contains('wbw-fullscreen-mode')) return;
    if (!e.touches || e.touches.length !== 1) { touchIgnore = true; return; }
    var tgt = e.target;
    touchIgnore = Boolean(tgt && (tgt.closest('#wbwFsTopBarV1') || tgt.closest('.stage-blue-nav') || /^(BUTTON|A|INPUT|SELECT)$/i.test(tgt.tagName)));
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartT = Date.now();
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    if (touchIgnore || !document.body.classList.contains('wbw-fullscreen-mode')) return;
    if (!e.changedTouches || !e.changedTouches.length) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;
    var dt = Date.now() - touchStartT;
    if (dt < 550 && Math.abs(dx) > 72 && Math.abs(dx) > Math.abs(dy) * 1.75) {
      var lien = dx < 0 ? document.getElementById('nextVerseLink') : document.getElementById('prevVerseLink');
      if (lien) lien.click();
    }
  }, { passive: true });

  // Raccourcis clavier sur PC en mode Plein écran
  document.addEventListener('keydown', function(e) {
    if (!document.body.classList.contains('wbw-fullscreen-mode')) return;
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/i.test(e.target.tagName)) return;
    if (e.key === 'Escape') {
      quitterPleinEcran();
    } else if (e.code === 'Space') {
      e.preventDefault();
      var playBtn = document.querySelector('.verse-stage .stage-blue-nav button[onclick*="toggleAudio"], .verse-stage #playBtn, .verse-stage .play-btn') || findBtnByTxt(['Écouter', 'Pause', 'Listen', 'Escuchar', 'Hören', 'Ascolta', 'Dengar', 'Слушать', 'استمع']);
      if (playBtn) playBtn.click();
    } else if (e.key === 'ArrowRight') {
      var nxt = document.getElementById('nextVerseLink');
      if (nxt) nxt.click();
    } else if (e.key === 'ArrowLeft') {
      var prv = document.getElementById('prevVerseLink');
      if (prv) prv.click();
    } else if (e.key === 'r' || e.key === 'R') {
      var rep = findBtnByTxt(['Rejouer', 'Replay', 'Repetir', 'Wiederholen', 'Riascolta', 'Ulangi', 'Повторить']);
      if (rep) rep.click();
    } else if (e.key === 'w' || e.key === 'W') {
      var wbwB = getOrigWbw();
      if (wbwB) wbwB.click();
      setTimeout(syncFsBar, 60);
    } else if (e.key === 's' || e.key === 'S') {
      var suivB = getOrigSuivi();
      if (suivB) suivB.click();
      setTimeout(syncFsBar, 60);
    } else if (e.key === '+' || e.key === '=') {
      var zi = findBtnByTxt(['A+', 'A＋']);
      if (zi) zi.click();
    } else if (e.key === '-') {
      var zo = findBtnByTxt(['A-', 'A−', 'A–']);
      if (zo) zo.click();
    }
  });

  document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement && document.body.classList.contains('wbw-fullscreen-mode')) {
      marquerDOMFullscreen(false);
    }
  });
  document.addEventListener('click', function() { setTimeout(installerFullscreen, 50); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installerFullscreen);
  else installerFullscreen();
  setTimeout(installerFullscreen, 300);

  if (typeof MutationObserver !== 'undefined') {
    var _bObs = document.getElementById('badgeNumEl');
    if (_bObs) {
      new MutationObserver(function() { syncFsBar(); })
        .observe(_bObs, { childList: true, characterData: true, subtree: true });
    }
  }
  setInterval(function() {
    if (document.body && document.body.classList.contains('wbw-fullscreen-mode')) syncFsBar();
  }, 500);
})();

/* __SW_AUTO_UPDATE_V1__ */
(function swAutoUpdateV1() {
  if (!('serviceWorker' in navigator)) return;
  var avaitControleur = Boolean(navigator.serviceWorker.controller);
  var reloadFait = false;
  navigator.serviceWorker.addEventListener('controllerchange', function() {
    if (!avaitControleur || reloadFait) return;
    try {
      var last = Number(sessionStorage.getItem('__swReloadTs') || 0);
      if (Date.now() - last < 15000) return;
      sessionStorage.setItem('__swReloadTs', String(Date.now()));
    } catch (e) {}
    reloadFait = true;
    window.location.reload();
  });
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).then(function(reg) {
      try { reg.update(); } catch (e) {}
      document.addEventListener('visibilitychange', function() {
        if (!document.hidden) { try { reg.update(); } catch (e) {} }
      });
    }).catch(function() {});
  });
})();
`;

js = js.slice(0, iFs) + moduleFsV3;
new vm.Script(js, { filename: 'site/assets/verset.js' });
writeSafe(versetJsPath, eolJs === '\r\n' ? js.replace(/\n/g, '\r\n') : js);
console.log('✓ site/assets/verset.js : Plein écran V3 (PC + iPhone swipe) + auto-update SW injectés.');

// ============================================================================
// 2. PLEIN ÉCRAN V3 CSS DANS SITE/ASSETS/VERSET.CSS
// ============================================================================
const rawCss = fs.readFileSync(versetCssPath, 'utf8');
const eolCss = rawCss.includes('\r\n') ? '\r\n' : '\n';
let css = rawCss.replace(/\r\n/g, '\n');

const marqueurCssV2 = '/* UNIFIED_GLOW_AND_FULLSCREEN_V2 */';
const idxV2 = css.indexOf(marqueurCssV2);
if (idxV2 !== -1) css = css.slice(0, idxV2).trimEnd();

const blocCssV3 = `

${marqueurCssV2}
/* FULLSCREEN_V3_PRO_PC_IPHONE */

/* 1) Barre supérieure translucide, épurée et scrollable sur 1 ligne sur mobile */
#wbwFsTopBarV1 {
  background: rgba(3, 10, 22, 0.84) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border-bottom: 1px solid rgba(56, 189, 248, 0.22) !important;
  flex-wrap: nowrap !important;
  gap: 10px !important;
  padding: max(10px, env(safe-area-inset-top)) 18px 10px 18px !important;
}
.wbw-fs-scroll {
  flex-wrap: nowrap !important;
  overflow-x: auto !important;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
  max-width: calc(100vw - 130px) !important;
  gap: 8px !important;
}
.wbw-fs-scroll::-webkit-scrollbar { display: none !important; }
.wbw-fs-pill, .wbw-fs-badge, .wbw-fs-exit {
  white-space: nowrap !important;
  flex-shrink: 0 !important;
}

/* 2) Scène Plein écran : centrage vertical 100% fiable en Classique ET en Mot à mot (avec scroll propre sur longs versets) */
body.wbw-fullscreen-mode .verse-stage {
  position: fixed !important;
  inset: 0 !important;
  z-index: 100010 !important;
  width: 100vw !important;
  height: 100dvh !important;
  max-width: none !important;
  margin: 0 !important;
  padding: calc(74px + env(safe-area-inset-top)) clamp(16px, 5vw, 72px) calc(116px + env(safe-area-inset-bottom)) clamp(16px, 5vw, 72px) !important;
  border: none !important;
  border-radius: 0 !important;
  background: radial-gradient(ellipse at 50% 42%, #0a1d38 0%, #030914 58%, #010409 100%) !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  align-items: center !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
  box-shadow: none !important;
  transform: none !important;
}
/* Annule l'ancien hack :first-child/:last-child qui cassait le centrage quand un bloc est masqué */
body.wbw-fullscreen-mode .verse-stage > :first-child { margin-top: 0 !important; }
body.wbw-fullscreen-mode .verse-stage > :last-child { margin-bottom: 0 !important; }

/* Espaceurs flex invisibles : centrent parfaitement tout contenu visible (1 mot ou 20 mots) sans couper les longs versets */
body.wbw-fullscreen-mode .verse-stage::before,
body.wbw-fullscreen-mode .verse-stage::after {
  content: "" !important;
  display: block !important;
  position: static !important;
  flex: 1 0 12px !important;
  width: 0 !important;
  height: 0 !important;
  background: none !important;
  border: none !important;
  box-shadow: none !important;
  pointer-events: none !important;
}
body.wbw-fullscreen-mode .verse-stage hr {
  display: none !important;
}
body.wbw-fullscreen-mode .verse-stage > * {
  width: 100%;
  max-width: min(1240px, 94vw);
}

/* 3) Proportions cinéma sur PC (sans !important sur font-size pour laisser A+ / A- fonctionner librement) */
@media (min-width: 821px) {
  #wbwFsTopBarV1 .wbw-fs-pill,
  #wbwFsTopBarV1 .wbw-fs-exit {
    padding: 7px 14px !important;
    font-size: 0.84rem !important;
  }
  #wbwFsTopBarV1 .wbw-fs-badge {
    padding: 5px 12px !important;
    font-size: 0.86rem !important;
  }
  body.wbw-fullscreen-mode .verse-stage .arabic-text,
  body.wbw-fullscreen-mode .verse-stage #arabicTextEl {
    font-size: clamp(2.8rem, 4.3vw, 4.5rem);
    line-height: 2.05 !important;
  }
  body.wbw-fullscreen-mode .verse-stage .translation-text,
  body.wbw-fullscreen-mode .verse-stage #translationTextEl {
    font-size: clamp(1.18rem, 1.5vw, 1.48rem);
    line-height: 1.75 !important;
    max-width: 960px !important;
    margin: 22px auto 0 auto !important;
  }
  /* Agrandissement et aération du mode Mot à mot en plein écran PC */
  body.wbw-fullscreen-mode .verse-stage .wbw-grid,
  body.wbw-fullscreen-mode .verse-stage #wbwGrid,
  body.wbw-fullscreen-mode .verse-stage [id*="wbw"][class*="grid"] {
    max-width: min(1240px, 92vw) !important;
    gap: 24px 28px !important;
    justify-content: center !important;
  }
  body.wbw-fullscreen-mode .verse-stage .wbw-word-card,
  body.wbw-fullscreen-mode .verse-stage .wbw-card {
    padding: 10px 14px !important;
  }
  body.wbw-fullscreen-mode .verse-stage .wbw-ar,
  body.wbw-fullscreen-mode .verse-stage .wbw-arabic {
    font-size: clamp(2.3rem, 3.3vw, 3.4rem);
  }
  body.wbw-fullscreen-mode .verse-stage .wbw-tr,
  body.wbw-fullscreen-mode .verse-stage .wbw-trans {
    font-size: clamp(0.95rem, 1.15vw, 1.15rem);
    margin-top: 8px !important;
  }
}

/* 4) Dock audio flottant ancré proprement en bas de l'écran (PC + iPhone) */
body.wbw-fullscreen-mode .verse-stage .stage-blue-nav {
  position: fixed !important;
  bottom: max(22px, env(safe-area-inset-bottom)) !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  z-index: 100025 !important;
  margin: 0 !important;
  padding: 10px 18px !important;
  border-radius: 999px !important;
  background: rgba(4, 12, 26, 0.90) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(56, 189, 248, 0.34) !important;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.62), 0 0 24px rgba(14, 165, 233, 0.16) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  width: auto !important;
  max-width: calc(100vw - 24px) !important;
}

/* Rappel clavier discret en bas sur PC */
#wbwFsHintV3 {
  display: none;
  position: fixed;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100022;
  font-size: 0.72rem;
  color: rgba(148, 163, 184, 0.58);
  white-space: nowrap;
  pointer-events: none;
  letter-spacing: 0.02em;
}
@media (min-width: 900px) {
  body.wbw-fullscreen-mode #wbwFsHintV3 { display: block !important; }
  body.wbw-fullscreen-mode .verse-stage .stage-blue-nav { bottom: 28px !important; }
}

/* 5) Confort tactile iPhone / mobile */
@media (max-width: 640px) {
  #wbwFsTopBarV1 {
    padding: max(8px, env(safe-area-inset-top)) 10px 8px 10px !important;
    gap: 6px !important;
  }
  .wbw-fs-scroll {
    max-width: calc(100vw - 104px) !important;
    gap: 6px !important;
  }
  #wbwFsTopBarV1 .wbw-fs-pill,
  #wbwFsTopBarV1 .wbw-fs-exit {
    min-height: 36px !important;
    padding: 6px 11px !important;
    font-size: 0.76rem !important;
  }
  body.wbw-fullscreen-mode .verse-stage {
    padding: calc(64px + env(safe-area-inset-top)) 14px calc(98px + env(safe-area-inset-bottom)) 14px !important;
  }
  body.wbw-fullscreen-mode .verse-stage .stage-blue-nav {
    bottom: max(10px, env(safe-area-inset-bottom)) !important;
    width: calc(100vw - 16px) !important;
    max-width: 440px !important;
    border-radius: 20px !important;
    padding: 8px 8px !important;
    gap: 6px !important;
    justify-content: space-between !important;
    flex-wrap: nowrap !important;
  }
  body.wbw-fullscreen-mode .verse-stage .stage-blue-nav a,
  body.wbw-fullscreen-mode .verse-stage .stage-blue-nav button {
    padding: 9px 10px !important;
    font-size: 0.78rem !important;
    min-height: 40px !important;
    white-space: nowrap !important;
  }
}
`;

css = css + blocCssV3;
writeSafe(versetCssPath, eolCss === '\r\n' ? css.replace(/\n/g, '\r\n') : css);
console.log('✓ site/assets/verset.css : Plein écran V3 (centrage flex parfait + dock bas + mobile iPhone) appliqué.');

// ============================================================================
// 3. AUTO-UPDATE SERVICE WORKER DANS SITE/INDEX.HTML (UPDATEVIACACHE: NONE)
// ============================================================================
const rawIdx = fs.readFileSync(indexHtmlPath, 'utf8');
const eolIdx = rawIdx.includes('\r\n') ? '\r\n' : '\n';
let idxHtml = rawIdx.replace(/\r\n/g, '\n');

if (!idxHtml.includes('__SW_AUTO_UPDATE_IDX_V1__')) {
  idxHtml = idxHtml.replace(
    /navigator\.serviceWorker\.register\(\s*['"]\/?sw\.js['"]\s*\)/g,
    "navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })"
  );
  const swSnippet = `
<script>/* __SW_AUTO_UPDATE_IDX_V1__ */
(function(){if(!('serviceWorker' in navigator))return;var had=Boolean(navigator.serviceWorker.controller),done=false;navigator.serviceWorker.addEventListener('controllerchange',function(){if(!had||done)return;try{var t=Number(sessionStorage.getItem('__swReloadTs')||0);if(Date.now()-t<15000)return;sessionStorage.setItem('__swReloadTs',String(Date.now()));}catch(e){}done=true;window.location.reload();});window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}).then(function(r){try{r.update();}catch(e){}}).catch(function(){});});})();
</script>
</body>`;
  if (idxHtml.includes('</body>')) {
    idxHtml = idxHtml.replace('</body>', swSnippet);
    writeSafe(indexHtmlPath, eolIdx === '\r\n' ? idxHtml.replace(/\n/g, '\r\n') : idxHtml);
    console.log('✓ site/index.html : enregistrement SW updateViaCache:none + auto-reload ajoutés.');
  }
} else {
  console.log('ℹ️ site/index.html : auto-update SW déjà présent.');
}

// ============================================================================
// 4. BUMP CACHE (_WORKER.JS + SW.JS)
// ============================================================================
const rawW = fs.readFileSync(workerPath, 'utf8');
const eolW = rawW.includes('\r\n') ? '\r\n' : '\n';
let w = rawW.replace(/\r\n/g, '\n');
const tag = String(Date.now());
w = w.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
w = w.replace(/htmlPropre\.replace\(\/v=1795050050086\/g,\s*"v=\d+"\)/, `htmlPropre.replace(/v=1795050050086/g, "v=${tag}")`);
writeSafe(workerPath, eolW === '\r\n' ? w.replace(/\n/g, '\r\n') : w);

let sw = fs.readFileSync(swPath, 'utf8');
sw = sw.replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
writeSafe(swPath, sw);
console.log(`✓ site/_worker.js (?v=${tag}) et site/sw.js incrémentés.`);
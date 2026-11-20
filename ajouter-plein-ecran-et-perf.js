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
const cssPath = path.join(siteDir, 'assets', 'verset.css');
const jsPath = path.join(siteDir, 'assets', 'verset.js');
const lexPath = path.join(siteDir, 'lexique-wbw-fr.json');
const swPath = path.join(siteDir, 'sw.js');

// ============================================================================
// 1. CSS : MODE PLEIN ECRAN (FOCUS MOBILE/PC) + PERF MOBILE (0 BLUR LOURD)
// ============================================================================
let css = fs.readFileSync(cssPath, 'utf8');
const marqueurCss = '/* FULLSCREEN_AND_PERF_V1 */';

if (!css.includes(marqueurCss)) {
  css += `
${marqueurCss}
/* Optimisation GPU mobile : supprimer backdrop-filter lourd sur les cartes sourates */
@media (max-width: 820px) {
  .verse-stage, .tafsir-card, .controls-card, .surah-header-card, .panneau-opaque-v77 {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    background-color: rgba(5, 12, 24, 0.94) !important;
  }
}

/* Bouton Plein écran dans la barre de contrôles */
#wbwFullscreenBtnV1 {
  background: rgba(14, 165, 233, 0.16) !important;
  color: #e0f2fe !important;
  border: 1px solid rgba(56, 189, 248, 0.45) !important;
  padding: 6px 13px !important;
  border-radius: 11px !important;
  font-family: inherit !important;
  font-size: 0.81rem !important;
  font-weight: 800 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
}
#wbwFullscreenBtnV1:hover,
body.wbw-fullscreen-mode #wbwFullscreenBtnV1 {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9) !important;
  color: #021019 !important;
  border-color: #7dd3fc !important;
  box-shadow: 0 0 16px rgba(56, 189, 248, 0.48) !important;
}

/* Barre flottante en mode Plein écran */
#wbwFsTopBarV1 {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100020;
  padding: max(10px, env(safe-area-inset-top)) 14px 10px 14px;
  background: rgba(3, 8, 16, 0.92);
  border-bottom: 1px solid rgba(56, 189, 248, 0.28);
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}
body.wbw-fullscreen-mode #wbwFsTopBarV1 {
  display: flex !important;
}
.wbw-fs-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.wbw-fs-pill {
  background: rgba(15, 23, 42, 0.9);
  color: #e2e8f0;
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 999px;
  padding: 6px 12px;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
}
.wbw-fs-pill.active {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  color: #021019;
  border-color: #7dd3fc;
}
.wbw-fs-exit {
  background: rgba(239, 68, 68, 0.18);
  color: #fecaca;
  border: 1px solid rgba(248, 113, 113, 0.45);
  border-radius: 999px;
  padding: 6px 13px;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
}
.wbw-fs-badge {
  color: #7dd3fc;
  font-size: 0.82rem;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  border: 1px solid rgba(56, 189, 248, 0.35);
}

/* Mode Plein écran actif : la scène de verset prend 100% du viewport */
html.wbw-fullscreen-html,
body.wbw-fullscreen-mode {
  overflow: hidden !important;
  height: 100dvh !important;
  background: #02050a !important;
}
body.wbw-fullscreen-mode .cosmos-exterior-wrapper {
  display: none !important;
}
body.wbw-fullscreen-mode .wbw-fs-ancestor {
  position: static !important;
  transform: none !important;
  filter: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  max-width: none !important;
  width: auto !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  overflow: visible !important;
}
body.wbw-fullscreen-mode .wbw-fs-hidden {
  display: none !important;
}
body.wbw-fullscreen-mode .verse-stage {
  position: fixed !important;
  inset: 0 !important;
  z-index: 100010 !important;
  width: 100vw !important;
  height: 100dvh !important;
  max-width: none !important;
  margin: 0 !important;
  padding: 74px 16px max(24px, env(safe-area-inset-bottom)) 16px !important;
  border: none !important;
  border-radius: 0 !important;
  background: radial-gradient(ellipse at 50% 35%, #071324 0%, #02050a 75%) !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
  box-shadow: none !important;
}
body.wbw-fullscreen-mode .verse-stage .stage-blue-nav {
  margin-top: 22px !important;
}
`;
  writeSafe(cssPath, css);
  console.log('✓ site/assets/verset.css : styles Plein écran + optimisation GPU mobile ajoutés.');
} else {
  console.log('ℹ️ site/assets/verset.css déjà patché.');
}

// ============================================================================
// 2. JS : BRIDAGE CANVAS 24 FPS + MODULE PLEIN ECRAN FOCUS (8 LANGUES)
// ============================================================================
let js = fs.readFileSync(jsPath, 'utf8');

// 2a. Limiter renderFullSky à ~24 FPS (42ms) et couper en mode Plein écran
const reSky = /function\s+renderFullSky\s*\(\s*now\s*\)\s*\{\s*requestAnimationFrame\s*\(\s*renderFullSky\s*\)\s*;/;
if (reSky.test(js) && !js.includes('/* SKY_THROTTLE_24FPS */')) {
  js = js.replace(
    reSky,
    `function renderFullSky(now) {\n  requestAnimationFrame(renderFullSky);\n  /* SKY_THROTTLE_24FPS */\n  if (document.hidden || (document.body && document.body.classList.contains('wbw-fullscreen-mode'))) return;\n  if (now && renderFullSky._t && (now - renderFullSky._t) < 42) return;\n  renderFullSky._t = now || performance.now();`
  );
  console.log('✓ renderFullSky optimisé (~24 FPS + pause en Plein écran).');
}

// 2b. Ajouter le module Plein écran en fin de verset.js
const marqueurJs = '/* __MODULE_FULLSCREEN_FOCUS_V1__ */';
if (!js.includes(marqueurJs)) {
  const moduleFs = `
${marqueurJs}
(function moduleFullscreenFocusV1() {
  var LABELS_FS = {
    fr: { btn: '⛶ Plein écran', exit: '✕ Quitter', wbw: '📖 Mot à mot', tajwid: 'Tajwid' },
    en: { btn: '⛶ Fullscreen', exit: '✕ Exit', wbw: '📖 Word by Word', tajwid: 'Tajwid' },
    es: { btn: '⛶ Pantalla completa', exit: '✕ Salir', wbw: '📖 Palabra', tajwid: 'Tajwid' },
    ar: { btn: '⛶ ملء الشاشة', exit: '✕ خروج', wbw: '📖 كلمة بكلمة', tajwid: 'تجويد' },
    de: { btn: '⛶ Vollbild', exit: '✕ Beenden', wbw: '📖 Wort für Wort', tajwid: 'Tajwid' },
    it: { btn: '⛶ Schermo intero', exit: '✕ Esci', wbw: '📖 Parola', tajwid: 'Tajwid' },
    id: { btn: '⛶ Layar penuh', exit: '✕ Keluar', wbw: '📖 Kata demi Kata', tajwid: 'Tajwid' },
    ru: { btn: '⛶ На весь экран', exit: '✕ Выход', wbw: '📖 Пословно', tajwid: 'Таджвид' }
  };

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

  function syncFsBar() {
    var bar = document.getElementById('wbwFsTopBarV1');
    var mainBtn = document.getElementById('wbwFullscreenBtnV1');
    var lang = getLangFs();
    var t = LABELS_FS[lang] || LABELS_FS.fr;
    if (mainBtn) mainBtn.textContent = t.btn;
    if (!bar) return;
    var badgeOrig = document.getElementById('badgeNumEl');
    var fsBadge = document.getElementById('wbwFsBadgeV1');
    if (fsBadge && badgeOrig) fsBadge.textContent = (badgeOrig.textContent || '').trim();
    var fsWbw = document.getElementById('wbwFsWbwV1');
    var fsTaj = document.getElementById('wbwFsTajwidV1');
    var fsExit = document.getElementById('wbwFsExitV1');
    var origWbw = document.getElementById('btnToggleWbw') || document.getElementById('wbwToggleBtn') || findBtnByTxt(['Mot à mot', 'Word by Word', 'Palabra', 'Wort für', 'Parola', 'Kata demi', 'Пословн', 'كلمة بكلمة']);
    var origTaj = findBtnByTxt(['Tajw', 'Таджвид', 'تجويد']);
    if (fsWbw) { fsWbw.textContent = t.wbw; fsWbw.classList.toggle('active', estActif(origWbw)); }
    if (fsTaj) { fsTaj.textContent = t.tajwid; fsTaj.classList.toggle('active', estActif(origTaj)); }
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
          if (sib !== cur && sib.id !== 'wbwFsTopBarV1') sib.classList.add('wbw-fs-hidden');
        }
        cur = par;
      }
      for (var b = 0; b < document.body.children.length; b++) {
        var child = document.body.children[b];
        if (child !== cur && child.id !== 'wbwFsTopBarV1' && child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE') {
          child.classList.add('wbw-fs-hidden');
        }
      }
    }
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
        '<div class="wbw-fs-group">' +
          '<span id="wbwFsBadgeV1" class="wbw-fs-badge"></span>' +
          '<button type="button" id="wbwFsWbwV1" class="wbw-fs-pill">📖 Mot à mot</button>' +
          '<button type="button" id="wbwFsTajwidV1" class="wbw-fs-pill">Tajwid</button>' +
          '<button type="button" id="wbwFsZoomOutV1" class="wbw-fs-pill">A−</button>' +
          '<button type="button" id="wbwFsZoomInV1" class="wbw-fs-pill">A+</button>' +
        '</div>' +
        '<button type="button" id="wbwFsExitV1" class="wbw-fs-exit">✕ Quitter</button>';
      document.body.appendChild(bar);

      document.getElementById('wbwFsExitV1').addEventListener('click', quitterPleinEcran);
      document.getElementById('wbwFsWbwV1').addEventListener('click', function() {
        var b = document.getElementById('btnToggleWbw') || document.getElementById('wbwToggleBtn') || findBtnByTxt(['Mot à mot', 'Word by Word', 'Palabra', 'Wort für', 'Parola', 'Kata demi', 'Пословн', 'كلمة بكلمة']);
        if (b) b.click();
        setTimeout(syncFsBar, 60);
      });
      document.getElementById('wbwFsTajwidV1').addEventListener('click', function() {
        var b = findBtnByTxt(['Tajw', 'Таджвид', 'تجويد']);
        if (b) b.click();
        setTimeout(syncFsBar, 60);
      });
      document.getElementById('wbwFsZoomOutV1').addEventListener('click', function() {
        var b = findBtnByTxt(['A-', 'A−', 'A–']);
        if (b) b.click();
      });
      document.getElementById('wbwFsZoomInV1').addEventListener('click', function() {
        var b = findBtnByTxt(['A+', 'A＋']);
        if (b) b.click();
      });
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

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.body.classList.contains('wbw-fullscreen-mode')) {
      quitterPleinEcran();
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
})();
`;
  js += moduleFs;
  new vm.Script(js, { filename: 'site/assets/verset.js' });
  writeSafe(jsPath, js);
  console.log('✓ site/assets/verset.js : mode Plein écran Focus (8 langues) ajouté et validé.');
} else {
  console.log('ℹ️ Module Plein écran déjà présent dans site/assets/verset.js.');
}

// ============================================================================
// 3. LEXIQUE WBW : COMPLETER 96:19 ET QUELQUES GLOSES FREQUENTES
// ============================================================================
const lex = JSON.parse(fs.readFileSync(lexPath, 'utf8'));
lex.versets['96:19'] = ['Mais non !', 'ne', 'lui obéis pas', 'mais prosterne-toi', 'et rapproche-toi'];
Object.assign(lex.en, {
  'do not': 'ne ... pas',
  'obey him': 'lui obéis pas',
  'but prostrate': 'mais prosterne-toi',
  'and prostrate': 'et prosterne-toi',
  'prostrate': 'prosterne-toi',
  'and draw near': 'et rapproche-toi',
  'draw near': 'rapproche-toi',
  'surely transgresses': 'transgresse certes'
});
writeSafe(lexPath, JSON.stringify(lex, null, 2));
console.log('✓ site/lexique-wbw-fr.json mis à jour (96:19 + gloses ajoutées).');

// ============================================================================
// 4. INCREMENTER sw.js
// ============================================================================
let sw = fs.readFileSync(swPath, 'utf8');
sw = sw.replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
new vm.Script(sw, { filename: 'site/sw.js' });
writeSafe(swPath, sw);
console.log('✓ site/sw.js version incrémentée.');
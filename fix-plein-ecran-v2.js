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

// 1. CSS : éviter que les versets longs soient coupés en haut en mode Plein écran
let css = fs.readFileSync(cssPath, 'utf8');
const marqueurCss = '/* FULLSCREEN_SCROLL_FIX_V2 */';
if (!css.includes(marqueurCss)) {
  css += `
${marqueurCss}
body.wbw-fullscreen-mode .verse-stage {
  justify-content: flex-start !important;
}
body.wbw-fullscreen-mode .verse-stage > :first-child {
  margin-top: auto !important;
}
body.wbw-fullscreen-mode .verse-stage > :last-child {
  margin-bottom: auto !important;
}
`;
  writeSafe(cssPath, css);
  console.log('✓ site/assets/verset.css : centrage sûr sans coupure en haut.');
}

// 2. JS : synchroniser automatiquement le badge (ex: 68:1 -> 68:2 -> 68:7) quand le verset change
let js = fs.readFileSync(jsPath, 'utf8');
const marqueurJs = '/* FS_BADGE_OBSERVER_V2 */';
const cibleJs = 'setTimeout(installerFullscreen, 300);';
if (!js.includes(marqueurJs) && js.includes(cibleJs)) {
  js = js.replace(
    cibleJs,
    `${cibleJs}
  /* FS_BADGE_OBSERVER_V2 */
  if (typeof MutationObserver !== 'undefined') {
    var _bObs = document.getElementById('badgeNumEl');
    if (_bObs) {
      new MutationObserver(function() { syncFsBar(); })
        .observe(_bObs, { childList: true, characterData: true, subtree: true });
    }
  }
  setInterval(function() {
    if (document.body && document.body.classList.contains('wbw-fullscreen-mode')) syncFsBar();
  }, 500);`
  );
  new vm.Script(js, { filename: 'site/assets/verset.js' });
  writeSafe(jsPath, js);
  console.log('✓ site/assets/verset.js : badge Plein écran synchronisé en temps réel.');
} else {
  console.log('ℹ️ Observateur badge déjà présent dans site/assets/verset.js.');
}
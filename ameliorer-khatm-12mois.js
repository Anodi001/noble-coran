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
const indexPath = path.join(siteDir, 'index.html');
const versetJsPath = path.join(siteDir, 'assets', 'verset.js');
const versetCssPath = path.join(siteDir, 'assets', 'verset.css');
const workerPath = path.join(siteDir, '_worker.js');

const CSS_KHATM_V2 = `
/* KHATM_UI_PRO_12M_V2 */
#khatmPlannerWidgetV77 {
  margin: 14px auto 0 auto !important;
  padding: 14px 12px 6px 12px !important;
  border-top: 1px solid rgba(56, 189, 248, 0.18) !important;
}
.khatm-compact-row {
  gap: 8px !important;
}
.khatm-reciter-select {
  height: 34px !important;
  background-color: rgba(7, 19, 38, 0.92) !important;
  border: 1px solid rgba(56, 189, 248, 0.34) !important;
  color: #f1f5f9 !important;
  padding: 0 30px 0 13px !important;
  font-size: 0.78rem !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
}
.khatm-reciter-select:hover,
.khatm-reciter-select:focus {
  border-color: #38bdf8 !important;
  background-color: rgba(12, 32, 60, 0.96) !important;
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.18) !important;
}
.khatm-btn-green-compact,
.khatm-btn-cyan-compact,
.khatm-btn-reset-mini {
  height: 34px !important;
  box-sizing: border-box !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: transform 0.16s ease, background-color 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease !important;
}
.khatm-btn-green-compact {
  background: linear-gradient(135deg, rgba(6, 78, 59, 0.82), rgba(4, 47, 46, 0.88)) !important;
  border: 1px solid rgba(52, 211, 153, 0.55) !important;
  color: #6ee7b7 !important;
  padding: 0 15px !important;
}
.khatm-btn-green-compact:hover {
  transform: translateY(-1px) !important;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.34), rgba(20, 184, 166, 0.28)) !important;
  border-color: #6ee7b7 !important;
  color: #ffffff !important;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.22) !important;
}
.khatm-btn-cyan-compact {
  background: linear-gradient(135deg, rgba(8, 30, 58, 0.88), rgba(6, 20, 42, 0.92)) !important;
  border: 1px solid rgba(56, 189, 248, 0.45) !important;
  color: #7dd3fc !important;
  padding: 0 14px !important;
}
.khatm-btn-cyan-compact:hover {
  transform: translateY(-1px) !important;
  background: rgba(14, 165, 233, 0.28) !important;
  border-color: #7dd3fc !important;
  color: #ffffff !important;
  box-shadow: 0 4px 14px rgba(56, 189, 248, 0.22) !important;
}
.khatm-btn-reset-mini {
  width: 34px !important;
  padding: 0 !important;
  background: rgba(30, 14, 24, 0.72) !important;
  border: 1px solid rgba(248, 113, 113, 0.32) !important;
  color: #fca5a5 !important;
}
.khatm-btn-reset-mini:hover {
  transform: translateY(-1px) !important;
  background: rgba(239, 68, 68, 0.28) !important;
  border-color: #f87171 !important;
  color: #ffffff !important;
}
.khatm-mini-footer {
  display: inline-flex !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px 12px !important;
  margin-top: 10px !important;
  padding: 8px 14px !important;
  border-radius: 14px !important;
  background: rgba(5, 15, 32, 0.74) !important;
  border: 1px solid rgba(56, 189, 248, 0.2) !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
  font-size: 0.75rem !important;
  color: #94a3b8 !important;
}
.khatm-stat-pill {
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  padding: 2px 9px !important;
  border-radius: 999px !important;
  background: rgba(15, 31, 56, 0.8) !important;
  border: 1px solid rgba(56, 189, 248, 0.2) !important;
  color: #cbd5e1 !important;
}
.khatm-stat-pos {
  color: #7dd3fc !important;
  font-weight: 700 !important;
}
.khatm-stat-goal {
  color: #5eead4 !important;
  font-weight: 700 !important;
}
.khatm-mini-bar-wrap {
  width: 150px !important;
  height: 7px !important;
  background: rgba(15, 23, 42, 0.96) !important;
  border-radius: 999px !important;
  overflow: hidden !important;
  border: 1px solid rgba(56, 189, 248, 0.28) !important;
}
.khatm-mini-bar-fill {
  height: 100% !important;
  background: linear-gradient(90deg, #0ea5e9, #38bdf8, #34d399) !important;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.45) !important;
  border-radius: 999px !important;
  transition: width 0.35s ease !important;
}
.khatm-stat-pct {
  color: #e2e8f0 !important;
  font-weight: 700 !important;
  letter-spacing: 0.01em !important;
}
`;

const HELPER_12_MOIS = `
  function construireOptionsMoisKhatmV2(lang, mActuel) {
    var html = '';
    var mSel = Math.max(1, Math.min(12, Number(mActuel) || 1));
    for (var mm = 1; mm <= 12; mm++) {
      var vpj = Math.ceil(6236 / (mm * 30));
      var lbl = '';
      if (lang === 'en') lbl = mm + (mm === 1 ? ' Month' : ' Months') + ' (' + vpj + ' v./d)';
      else if (lang === 'es') lbl = mm + (mm === 1 ? ' Mes' : ' Meses') + ' (' + vpj + ' a./d)';
      else if (lang === 'ar') {
        var mAr = mm === 1 ? 'شهر واحد' : (mm === 2 ? 'شهران' : (mm <= 10 ? (mm + ' أشهر') : (mm + ' شهراً')));
        lbl = mAr + ' (' + vpj + ' آية/ي)';
      }
      else if (lang === 'de') lbl = mm + (mm === 1 ? ' Monat' : ' Monate') + ' (' + vpj + ' V./T)';
      else if (lang === 'it') lbl = mm + (mm === 1 ? ' Mese' : ' Mesi') + ' (' + vpj + ' v./g)';
      else if (lang === 'id') lbl = mm + ' Bulan (' + vpj + ' a./h)';
      else if (lang === 'ru') lbl = mm + ' мес. (' + vpj + ' а./д)';
      else lbl = mm + ' Mois (' + vpj + ' v./j)';
      html += '<option value="' + mm + '"' + (mSel === mm ? ' selected="selected"' : '') + '>🗓️ ' + lbl + '</option>';
    }
    return html;
  }
`;

function patcherCodeKhatmJs(code, nomFichier) {
  let out = code;
  let modifs = 0;

  // 1. Calcul dynamique des versets/jour pour tous les mois 1 à 12
  const reVpj = /function\s+obtenirVersetsParJour\s*\(([^)]*)\)\s*\{[\s\S]*?\n\s*\}/;
  if (reVpj.test(out)) {
    out = out.replace(
      reVpj,
      'function obtenirVersetsParJour(m) {\n    var mm = Math.max(1, Math.min(12, Number(m) || 1));\n    return Math.ceil(TOTAL_VERSETS_CORAN / (mm * 30));\n  }'
    );
    modifs++;
  }

  // 2. Autoriser tous les mois 1..12 si une liste [1, 4, 6, 12] restreignait la sauvegarde
  const avantWL = out;
  out = out.replace(/\[\s*1\s*,\s*4\s*,\s*6\s*,\s*12\s*\]/g, '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]');
  if (out !== avantWL) modifs++;

  // 3. Injecter le générateur des 12 mois (8 langues)
  if (!out.includes('function construireOptionsMoisKhatmV2')) {
    out = out.replace(
      'function afficherOuMettreAJourPlanificateurKhatm()',
      HELPER_12_MOIS + '\n  function afficherOuMettreAJourPlanificateurKhatm()'
    );
    modifs++;
  }

  // 4. Remplacer les 4 options fixes par la boucle 1..12 mois
  const reSelMois = /'<select class="khatm-reciter-select" data-khatm-sel="months">'[\s\S]*?'<\/select>' \+/;
  if (reSelMois.test(out)) {
    out = out.replace(
      reSelMois,
      `'<select class="khatm-reciter-select" data-khatm-sel="months">' + construireOptionsMoisKhatmV2(lang, m) + '</select>' +`
    );
    modifs++;
  }

  // 5. Refondre le footer sans doré (#fde047 -> turquoise #5eead4 + badges propres)
  const reFooter = /'<div class="khatm-mini-footer">'[\s\S]*?'<\/div>';/;
  if (reFooter.test(out)) {
    out = out.replace(
      reFooter,
      `'<div class="khatm-mini-footer">' +
        '<span class="khatm-stat-pill">' + t.posActuelle + ' <strong class="khatm-stat-pos">' + nomSourateAct + ' (' + posInfo.s + ':' + posInfo.v + ')</strong></span>' +
        '<span class="khatm-stat-pill">' + t.objJour + ' <strong class="khatm-stat-goal">' + nomSourateCible + ' (' + cibleInfo.s + ':' + cibleInfo.v + ')</strong></span>' +
        '<div class="khatm-mini-bar-wrap"><div class="khatm-mini-bar-fill" style="width:' + Math.max(2, Number(pct)) + '%;"></div></div>' +
        '<span dir="ltr" class="khatm-stat-pct" style="display:inline-block;">' + texteStatutFin + '</span>' +
      '</div>';`
    );
    modifs++;
  }

  // 6. Retirer le doré résiduel dans le gradient CSS si présent dans le même fichier
  const avantGrad = out;
  out = out.replace(
    /linear-gradient\(90deg,\s*#38bdf8,\s*#2dd4bf,\s*#fde047\)/gi,
    'linear-gradient(90deg, #0ea5e9, #38bdf8, #34d399)'
  );
  if (out !== avantGrad) modifs++;

  // 7. Liens propres sans .html dans le planificateur Khatm (bonus SEO)
  out = out.replace(
    /var urlReprise = "sourate-" \+ posInfo\.s \+ "-verset-" \+ posInfo\.v \+ "\.html\?khatm_verse="/g,
    'var urlReprise = "/sourate-" + posInfo.s + "-verset-" + posInfo.v + "?khatm_verse="'
  );
  out = out.replace(
    /var urlSuiv = "sourate-" \+ sSuiv \+ "-verset-1\.html\?khatm_verse=1"/g,
    'var urlSuiv = "/sourate-" + sSuiv + "-verset-1?khatm_verse=1"'
  );

  console.log(`✓ ${nomFichier} : ${modifs} améliorations Khatm appliquées.`);
  return out;
}

// 1. Patcher site/index.html (JS + CSS)
let idxHtml = fs.readFileSync(indexPath, 'utf8');
idxHtml = patcherCodeKhatmJs(idxHtml, 'site/index.html');
if (!idxHtml.includes('/* KHATM_UI_PRO_12M_V2 */')) {
  const posK = idxHtml.indexOf('#khatmPlannerWidgetV77');
  const posEndStyle = idxHtml.indexOf('</style>', posK);
  if (posK !== -1 && posEndStyle !== -1) {
    idxHtml = idxHtml.slice(0, posEndStyle) + CSS_KHATM_V2 + '\n' + idxHtml.slice(posEndStyle);
    console.log('✓ site/index.html : nouveau design CSS sans doré injecté.');
  }
}
writeSafe(indexPath, idxHtml);

// 2. Patcher site/assets/verset.js (JS) + validation syntaxe
let vJs = fs.readFileSync(versetJsPath, 'utf8');
vJs = patcherCodeKhatmJs(vJs, 'site/assets/verset.js');
new vm.Script(vJs, { filename: 'site/assets/verset.js' });
writeSafe(versetJsPath, vJs);

// 3. Patcher site/assets/verset.css (CSS)
let vCss = fs.readFileSync(versetCssPath, 'utf8');
vCss = vCss.replace(
  /linear-gradient\(90deg,\s*#38bdf8,\s*#2dd4bf,\s*#fde047\)/gi,
  'linear-gradient(90deg, #0ea5e9, #38bdf8, #34d399)'
);
if (!vCss.includes('/* KHATM_UI_PRO_12M_V2 */')) {
  vCss += '\n' + CSS_KHATM_V2;
  console.log('✓ site/assets/verset.css : nouveau design CSS sans doré ajouté.');
}
writeSafe(versetCssPath, vCss);

// 4. Incrémenter SSR_VERSION dans site/_worker.js (pour actualiser les 7 autres langues aussi)
let w = fs.readFileSync(workerPath, 'utf8');
w = w.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
writeSafe(workerPath, w);
console.log('✓ site/_worker.js : SSR_VERSION incrémenté.');
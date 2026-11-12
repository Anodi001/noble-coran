const fs = require('fs');
const path = require('path');

const pGen = path.join(__dirname, 'generateur.js');
if (!fs.existsSync(pGen)) {
  console.error('❌ generateur.js introuvable !');
  process.exit(1);
}

const preconnectTags = `<link rel="preconnect" href="https://api.quran.com" crossorigin>
<link rel="preconnect" href="https://api.qurancdn.com" crossorigin>
<link rel="preconnect" href="https://everyayah.com" crossorigin>
<link rel="preconnect" href="https://translate.googleapis.com" crossorigin>`;

const cssV70 = `<style id="patch-master-v70">
:root {
  --wbw-ar-size: 2.15rem;
  --wbw-tr-size: 0.92rem;
  --wbw-pad-v: 14px;
  --wbw-pad-h: 18px;
  --wbw-min-w: 92px;
}

/* 1. SOLEIL DORÉ PUR 150px (ACCÉLÉRATION GPU) */
html body #flatEarthSun,
html body .flat-earth-sun,
html body [id*="sun" i]:not([id*="sound" i]),
html body [class*="sun" i]:not([class*="sound" i]),
html body [data-astre-role="sun"],
html body .astre-soleil-pur-v70 {
  width: 150px !important;
  height: 150px !important;
  min-width: 150px !important;
  min-height: 150px !important;
  max-width: 150px !important;
  max-height: 150px !important;
  border-radius: 50% !important;
  border: none !important;
  outline: none !important;
  background: radial-gradient(circle at 50% 50%, #ffffff 0%, #fffef0 26%, #fef08a 52%, #facc15 76%, #f59e0b 94%, rgba(245, 158, 11, 0) 100%) !important;
  background-image: radial-gradient(circle at 50% 50%, #ffffff 0%, #fffef0 26%, #fef08a 52%, #facc15 76%, #f59e0b 94%, rgba(245, 158, 11, 0) 100%) !important;
  background-color: #fde047 !important;
  box-shadow: 0 0 50px 16px rgba(253, 224, 71, 0.72), 0 0 110px 38px rgba(245, 158, 11, 0.42) !important;
  filter: none !important;
  backdrop-filter: none !important;
  mix-blend-mode: normal !important;
  will-change: transform !important;
}
html body #flatEarthSun::before, html body #flatEarthSun::after,
html body .flat-earth-sun::before, html body .flat-earth-sun::after,
html body .astre-soleil-pur-v70::before, html body .astre-soleil-pur-v70::after,
html body #flatEarthSun *, html body .flat-earth-sun *, html body .astre-soleil-pur-v70 * {
  display: none !important; content: none !important; background: none !important; box-shadow: none !important; opacity: 0 !important;
}

/* 2. LUNE BLANCHE PURE 150px (ACCÉLÉRATION GPU) */
html body #flatEarthMoon,
html body .flat-earth-moon,
html body [id*="moon" i],
html body [class*="moon" i],
html body [data-astre-role="moon"],
html body .astre-lune-pure-v70 {
  width: 150px !important;
  height: 150px !important;
  min-width: 150px !important;
  min-height: 150px !important;
  max-width: 150px !important;
  max-height: 150px !important;
  border-radius: 50% !important;
  border: none !important;
  outline: none !important;
  background: radial-gradient(circle at 50% 50%, #ffffff 0%, #f8fafc 38%, #e2e8f0 70%, rgba(186, 230, 253, 0) 100%) !important;
  background-image: radial-gradient(circle at 50% 50%, #ffffff 0%, #f8fafc 38%, #e2e8f0 70%, rgba(186, 230, 253, 0) 100%) !important;
  background-color: #ffffff !important;
  box-shadow: 0 0 45px 15px rgba(255, 255, 255, 0.65), 0 0 95px 35px rgba(148, 163, 184, 0.35) !important;
  filter: none !important;
  backdrop-filter: none !important;
  mix-blend-mode: normal !important;
  will-change: transform !important;
}
html body #flatEarthMoon::before, html body #flatEarthMoon::after,
html body .flat-earth-moon::before, html body .flat-earth-moon::after,
html body .astre-lune-pure-v70::before, html body .astre-lune-pure-v70::after,
html body #flatEarthMoon *, html body .flat-earth-moon *, html body .astre-lune-pure-v70 * {
  display: none !important; content: none !important; background: none !important; box-shadow: none !important; opacity: 0 !important;
}

/* 3. MASQUAGE DE MAHER AL-MUAIQLY, BOUTON REPRENDRE DOUBLON & TRADUCTION DU BAS EN MOT-À-MOT */
html body img[src*="maher" i],
html body [data-reciter*="maher" i],
html body .maher-supprime-v70,
html body .wbw-masquer-traduction-bas,
html body .khatm-doublon-reprendre-masque {
  display: none !important; visibility: hidden !important; height: 0 !important; max-height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; overflow: hidden !important; opacity: 0 !important; pointer-events: none !important;
}

/* 4. BANDEAU & CARTES MOT-À-MOT */
html body #wbwSensLectureBanner {
  width: 100% !important; text-align: center !important; font-size: 0.78rem !important; letter-spacing: 0.04em !important; color: #38bdf8 !important; margin-bottom: 10px !important; opacity: 0.92 !important; font-weight: 500 !important; direction: ltr !important; cursor: pointer !important; user-select: none !important;
}
html body .wbw-card-unit {
  position: relative !important; padding: var(--wbw-pad-v) var(--wbw-pad-h) !important; min-width: var(--wbw-min-w) !important; border-radius: 18px !important; transform-origin: 50% 80% !important; will-change: transform, opacity, box-shadow, border-color !important; backface-visibility: hidden !important;
}
html body .wbw-card-unit::before {
  content: attr(data-word-num); position: absolute !important; top: 5px !important; right: 8px !important; font-size: 0.65rem !important; font-weight: 700 !important; color: rgba(56, 189, 248, 0.75) !important; line-height: 1 !important; pointer-events: none !important;
}
html body .wbw-card-unit > *:first-child {
  font-size: var(--wbw-ar-size) !important; line-height: 1.45 !important; direction: rtl !important; text-align: center !important;
}
html body .wbw-card-unit > *:first-child::before { content: none !important; display: none !important; }
html body .wbw-card-unit > *:last-child {
  font-size: var(--wbw-tr-size) !important; direction: ltr !important; text-align: center !important;
}

/* 5. MODE SUIVI VERSET : BLANC TAMISÉ (78%) AU REPOS -> 100% LUMINEUX + BLEU NÉON À LA LECTURE */
html body #arabicVerse, html body .arabic-glow-verse {
  direction: rtl !important;
  color: rgba(255, 255, 255, 0.78) !important;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.14) !important;
}
html body .verse-stage .arabic-glow-verse span,
html body .verse-stage #arabicVerse span,
html body .ar-word-follow,
html body .follow-word {
  position: relative !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: rgba(255, 255, 255, 0.78) !important;
  opacity: 0.78 !important;
  padding: 0 7px !important;
  display: inline-block !important;
  transform-origin: 50% 85% !important;
  will-change: transform, opacity, filter, text-shadow, color !important;
  backface-visibility: hidden !important;
  -webkit-font-smoothing: antialiased !important;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.14) !important;
}

/* 6. BOUTONS DE LANGUE ÉTENDUS (DE, IT, ID, RU) AVEC DRAPEAUX IPHONE EXACTS */
html body #btnLangDeV70,
html body #btnLangItV70,
html body #btnLangIdV70,
html body #btnLangRuV70 {
  cursor: pointer !important; transition: all 0.2s ease !important; display: inline-flex !important; align-items: center !important; justify-content: center !important;
}
html body #btnLangDeV70.active-ext-v70,
html body #btnLangItV70.active-ext-v70,
html body #btnLangIdV70.active-ext-v70,
html body #btnLangRuV70.active-ext-v70 {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.28), rgba(56, 189, 248, 0.18)) !important;
  border: 1px solid #38bdf8 !important; color: #ffffff !important; border-radius: 999px !important;
}

/* 7. PLANIFICATEUR KHATM ULTRA-COMPACT (STYLE SÉLECTEUR RÉCITATEUR) */
#khatmPlannerWidgetV70 {
  width: 100% !important;
  box-sizing: border-box !important;
  margin: 12px auto 0 auto !important;
  padding: 12px 10px 4px 10px !important;
  border-top: 1px solid rgba(56, 189, 248, 0.16) !important;
  background: transparent !important;
  color: #f8fafc !important;
  font-family: system-ui, -apple-system, sans-serif !important;
  position: relative !important;
  z-index: 10 !important;
  text-align: center !important;
}
.khatm-compact-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
/* Menus déroulants stylisés exactement comme le sélecteur de Récitateur */
.khatm-reciter-select {
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  background-color: rgba(8, 22, 42, 0.85) !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%2338bdf8' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E") !important;
  background-repeat: no-repeat !important;
  background-position: right 11px center !important;
  background-size: 9px 6px !important;
  border: 1px solid rgba(56, 189, 248, 0.38) !important;
  color: #f1f5f9 !important;
  padding: 6px 28px 6px 13px !important;
  border-radius: 999px !important;
  font-size: 0.77rem !important;
  font-weight: 600 !important;
  outline: none !important;
  cursor: pointer !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35), inset 0 0 8px rgba(56, 189, 248, 0.06) !important;
  transition: all 0.18s ease !important;
}
.khatm-reciter-select:hover {
  border-color: #38bdf8 !important;
  background-color: rgba(14, 34, 64, 0.92) !important;
  color: #ffffff !important;
}
[dir="rtl"] .khatm-reciter-select, #khatmPlannerWidgetV70[style*="rtl"] .khatm-reciter-select { background-position: left 11px center !important; padding: 6px 13px 6px 28px !important; }
.khatm-reciter-select option {
  background-color: #06101e !important;
  color: #f8fafc !important;
}
.khatm-btn-green-compact {
  background: rgba(6, 46, 36, 0.62) !important;
  border: 1px solid rgba(16, 185, 129, 0.55) !important;
  color: #34d399 !important;
  padding: 6px 14px !important;
  border-radius: 999px !important;
  font-size: 0.77rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  text-decoration: none !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.12) !important;
  transition: all 0.18s ease !important;
}
.khatm-btn-green-compact:hover {
  background: rgba(16, 185, 129, 0.24) !important;
  color: #ffffff !important;
  border-color: #6ee7b7 !important;
}
.khatm-btn-cyan-compact {
  background: rgba(8, 25, 48, 0.72) !important;
  border: 1px solid rgba(56, 189, 248, 0.48) !important;
  color: #38bdf8 !important;
  padding: 6px 13px !important;
  border-radius: 999px !important;
  font-size: 0.76rem !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  text-decoration: none !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  transition: all 0.18s ease !important;
}
.khatm-btn-cyan-compact:hover {
  background: rgba(14, 165, 233, 0.22) !important;
  color: #ffffff !important;
  border-color: #7dd3fc !important;
}
.khatm-btn-reset-mini {
  background: rgba(30, 10, 18, 0.55) !important;
  border: 1px solid rgba(248, 113, 113, 0.35) !important;
  color: #fca5a5 !important;
  padding: 5px 10px !important;
  border-radius: 999px !important;
  font-size: 0.74rem !important;
  font-weight: 600 !important;
  cursor: pointer !important;
}
.khatm-btn-reset-mini:hover {
  background: rgba(239, 68, 68, 0.25) !important;
  color: #ffffff !important;
}
.khatm-mini-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 7px;
  font-size: 0.73rem;
  color: #94a3b8;
}
.khatm-mini-bar-wrap {
  width: 140px;
  height: 4px;
  background: rgba(15, 23, 42, 0.95);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid rgba(56, 189, 248, 0.2);
}
.khatm-mini-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #38bdf8, #2dd4bf, #fde047);
  border-radius: 999px;
  transition: width 0.3s ease;
}
</style>`;

function codeClientV70() {
  var LANGUES_EXT_SUPPORTEES = { de: 27, it: 153, id: 33, ru: 45 };
  var langExtActive = "";
  var IgnoreClicInterneFr = false;

  try {
    var oldIds = ["khatmPlannerWidgetV66", "khatmPlannerWidgetV67", "khatmPlannerWidgetV68", "khatmPlannerWidgetV69"];
    for (var w = 0; w < oldIds.length; w++) {
      var elOld = document.getElementById(oldIds[w]);
      if (elOld && elOld.parentNode) elOld.parentNode.removeChild(elOld);
    }

    var urlParams = new URLSearchParams(window.location.search);
    var pLang = urlParams.get("lang");
    if (pLang && LANGUES_EXT_SUPPORTEES[pLang]) {
      langExtActive = pLang;
      localStorage.setItem("corantafsir_lang_ext_v70", pLang);
    } else {
      var savedExt = localStorage.getItem("corantafsir_lang_ext_v70") || localStorage.getItem("corantafsir_lang_ext_v69") || localStorage.getItem("corantafsir_lang_ext_v68");
      if (savedExt && LANGUES_EXT_SUPPORTEES[savedExt]) {
        langExtActive = savedExt;
      }
    }
  } catch (e) {}

  // ==========================================================================
  // 0. MOTEUR DU PLANIFICATEUR KHATM COMPACT (SÉLECTEURS STYLE RÉCITATEUR)
  // ==========================================================================
  var NB_VERSETS_PAR_SOURATE = [
    0,
    7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,
    112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,
    54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,
    14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,
    29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,
    11,8,3,9,5,4,7,3,6,3,5,4,5,6
  ];

  var ORDRE_REVELATION_114 = [
    96,68,73,74,1,111,81,87,92,89,93,94,103,100,108,102,107,109,105,113,
    114,112,53,80,97,91,85,95,106,101,75,104,77,50,90,86,54,38,7,72,
    36,25,35,19,20,56,26,27,28,17,10,11,12,15,6,37,31,34,39,40,
    41,42,43,44,45,46,51,88,18,16,71,14,21,23,32,52,67,69,70,78,
    79,82,84,30,29,83,2,8,3,33,60,4,99,57,47,13,55,76,65,98,
    59,24,22,63,58,49,66,64,61,62,48,5,9,110
  ];

  var NOMS_SOURATES_COURT = [
    "",
    "Al-Fātihah","Al-Baqarah","Āl 'Imrān","An-Nisā'","Al-Mā'idah","Al-An'ām","Al-A'rāf","Al-Anfāl","At-Tawbah","Yūnus",
    "Hūd","Yūsuf","Ar-Ra'd","Ibrāhīm","Al-Hijr","An-Nahl","Al-Isrā'","Al-Kahf","Maryam","Tā-Hā",
    "Al-Anbiyā'","Al-Hajj","Al-Mu'minūn","An-Nūr","Al-Furqān","Ash-Shu'arā'","An-Naml","Al-Qasas","Al-'Ankabūt","Ar-Rūm",
    "Luqmān","As-Sajdah","Al-Ahzāb","Saba'","Fātir","Yā-Sīn","As-Sāffāt","Sād","Az-Zumar","Ghāfir",
    "Fussilat","Ash-Shūrā","Az-Zukhruf","Ad-Dukhān","Al-Jāthiyah","Al-Ahqāf","Muhammad","Al-Fath","Al-Hujurāt","Qāf",
    "Adh-Dhāriyāt","At-Tūr","An-Najm","Al-Qamar","Ar-Rahmān","Al-Wāqi'ah","Al-Hadīd","Al-Mujādilah","Al-Hashr","Al-Mumtahanah",
    "As-Saff","Al-Jumu'ah","Al-Munāfiqūn","At-Taghābun","At-Talāq","At-Tahrīm","Al-Mulk","Al-Qalam","Al-Hāqqah","Al-Ma'ārij",
    "Nūh","Al-Jinn","Al-Muzzammil","Al-Muddaththir","Al-Qiyāmah","Al-Insān","Al-Mursalāt","An-Naba'","An-Nāzi'āt","'Abasa",
    "At-Takwīr","Al-Infitār","Al-Mutaffifīn","Al-Inshiqāq","Al-Burūj","At-Tāriq","Al-A'lā","Al-Ghāshiyah","Al-Fajr","Al-Balad",
    "Ash-Shams","Al-Layl","Ad-Duhā","Ash-Sharh","At-Tīn","Al-'Alaq","Al-Qadr","Al-Bayyinah","Az-Zalzalah","Al-'Ādiyāt",
    "Al-Qāri'ah","At-Takāthur","Al-'Asr","Al-Humazah","Al-Fīl","Quraysh","Al-Mā'ūn","Al-Kawthar","Al-Kāfirūn","An-Nasr",
    "Al-Masad","Al-Ikhlās","Al-Falaq","An-Nās"
  ];

  var TOTAL_VERSETS_CORAN = 6236;
  var etatKhatm = {
    months: 1,
    order: "revelation",
    idxByOrder: {
      revelation: 0,
      croissant: 0,
      decroissant: 0
    }
  };

  try {
    var sauvKhatm = localStorage.getItem("corantafsir_khatm_v70") || localStorage.getItem("corantafsir_khatm_v69") || localStorage.getItem("corantafsir_khatm_v68");
    if (sauvKhatm) {
      var parsedK = JSON.parse(sauvKhatm);
      if (parsedK && parsedK.idxByOrder) {
        etatKhatm.months = Number(parsedK.months) || 1;
        etatKhatm.order = parsedK.order || "revelation";
        etatKhatm.idxByOrder = parsedK.idxByOrder;
      }
    }
  } catch (e) {}

  function sauvegarderEtatKhatm() {
    try {
      localStorage.setItem("corantafsir_khatm_v70", JSON.stringify(etatKhatm));
    } catch (e) {}
  }

  function obtenirListeSouratesSelonOrdre(ord) {
    if (ord === "revelation") return ORDRE_REVELATION_114;
    var arr = [];
    if (ord === "decroissant") {
      for (var d = 114; d >= 1; d--) arr.push(d);
    } else {
      for (var c = 1; c <= 114; c++) arr.push(c);
    }
    return arr;
  }

  function obtenirSourateSuivanteSelonOrdre(ord, numSActuel) {
    var liste = obtenirListeSouratesSelonOrdre(ord);
    var idx = liste.indexOf(Number(numSActuel));
    if (idx !== -1 && idx + 1 < liste.length) {
      return liste[idx + 1];
    }
    return null;
  }

  function convertirIndexGlobalVersSourateVerset(ord, globalIdx) {
    var idx = Math.max(0, Math.min(TOTAL_VERSETS_CORAN - 1, Math.floor(globalIdx || 0)));
    var listeS = obtenirListeSouratesSelonOrdre(ord);
    var reste = idx;
    for (var i = 0; i < listeS.length; i++) {
      var numS = listeS[i];
      var nbV = NB_VERSETS_PAR_SOURATE[numS];
      if (reste < nbV) {
        return { s: numS, v: reste + 1, rangSourate: i + 1 };
      }
      reste -= nbV;
    }
    var dernS = listeS[listeS.length - 1];
    return { s: dernS, v: NB_VERSETS_PAR_SOURATE[dernS], rangSourate: 114 };
  }

  function convertirSourateVersetVersIndexGlobal(ord, numS, numV) {
    var listeS = obtenirListeSouratesSelonOrdre(ord);
    var cumul = 0;
    for (var i = 0; i < listeS.length; i++) {
      var s = listeS[i];
      if (s === Number(numS)) {
        var vClamp = Math.max(1, Math.min(NB_VERSETS_PAR_SOURATE[s] || 1, Number(numV) || 1));
        return cumul + (vClamp - 1);
      }
      cumul += NB_VERSETS_PAR_SOURATE[s];
    }
    return 0;
  }

  function obtenirVersetsParJour(months) {
    var joursMap = { 1: 30, 4: 120, 6: 180, 12: 365 };
    var j = joursMap[months] || 30;
    return Math.ceil(TOTAL_VERSETS_CORAN / j);
  }

  function obtenirCleVerset() {
    var urlFull = window.location.pathname.match(/sourate-(\d+)-verset-(\d+)/i);
    var aVersetArabe = Boolean(document.querySelector("#arabicVerse, .arabic-glow-verse"));
    if (!urlFull && !aVersetArabe) {
      return "";
    }
    var numS = urlFull ? urlFull[1] : "";
    var selects = document.querySelectorAll("select");
    for (var i = 0; i < selects.length; i++) {
      var s = selects[i];
      if (s.classList.contains("khatm-reciter-select")) continue;
      if (s.options && s.selectedIndex >= 0) {
        var optTxt = s.options[s.selectedIndex].textContent || "";
        var vm = optTxt.match(/(?:Verset|Verse|Aleya|Vers|Versetto|Ayat|Аят|آية)\s*(\d+)/i);
        if (vm && numS) return numS + ":" + vm[1];
      }
    }
    var badges = document.querySelectorAll("span, div");
    for (var b = 0; b < badges.length; b++) {
      var el = badges[b];
      if (el.children.length > 0 || el.closest("#khatmPlannerWidgetV70")) continue;
      var txt = (el.textContent || "").trim();
      var bm = txt.match(/^(\d{1,3})\s*:\s*(\d{1,3})$/);
      if (bm) return bm[1] + ":" + bm[2];
    }
    if (urlFull) return urlFull[1] + ":" + urlFull[2];
    return "";
  }

  function allerAuVersetSurMemePage(numV) {
    var selects = document.querySelectorAll("select");
    for (var i = 0; i < selects.length; i++) {
      var sel = selects[i];
      if (sel.classList.contains("khatm-reciter-select")) continue;
      if (sel.options && sel.options.length >= numV) {
        var opt0 = (sel.options[0].textContent || "").toLowerCase();
        if (opt0.indexOf("vers") !== -1 || opt0.indexOf("aleya") !== -1 || opt0.indexOf("ayat") !== -1 || opt0.indexOf("аят") !== -1 || opt0.indexOf("آية") !== -1 || /\d+\s*\/\s*\d+/.test(opt0)) {
          if (sel.selectedIndex !== numV - 1) {
            sel.selectedIndex = numV - 1;
            sel.dispatchEvent(new Event("change", { bubbles: true }));
          }
          return true;
        }
      }
    }
    return false;
  }

  var tentativesKhatmVerse = 0;
  function verifierSautDirectVersetKhatm() {
    if (tentativesKhatmVerse > 8) return;
    try {
      var up = new URLSearchParams(window.location.search);
      var kv = Number(up.get("khatm_verse"));
      if (kv && kv >= 1 && obtenirCleVerset()) {
        tentativesKhatmVerse++;
        allerAuVersetSurMemePage(kv);
      }
    } catch (e) {}
  }

  var dernierVersetAutoSyncKhatm = "";
  function synchroniserPositionKhatmAutomatique() {
    var vk = obtenirCleVerset();
    if (!vk || vk === dernierVersetAutoSyncKhatm) return;
    dernierVersetAutoSyncKhatm = vk;
    var p = vk.split(":");
    var sAct = Number(p[0]);
    var vAct = Number(p[1]);
    if (!sAct || !vAct) return;

    var ord = etatKhatm.order;
    var idxActuel = etatKhatm.idxByOrder[ord] || 0;
    var idxPage = convertirSourateVersetVersIndexGlobal(ord, sAct, vAct);
    if (idxPage > idxActuel && idxPage - idxActuel <= 220) {
      etatKhatm.idxByOrder[ord] = idxPage;
      sauvegarderEtatKhatm();
    }
  }

  var TEXTES_KHATM_I18N = {
    fr: {
      m1: "🗓️ 1 Mois (208 v./j)", m4: "🗓️ 4 Mois (52 v./j)", m6: "🗓️ 6 Mois (35 v./j)", m12: "🗓️ 12 Mois (18 v./j)",
      ordRev: "📜 Ordre : Révélation (96➔110)",
      ordAsc: "⬆️ Ordre : Croissant (1➔114)",
      ordDesc: "⬇️ Ordre : Décroissant (114➔1)",
      jours: "j. restants",
      posActuelle: "Position :",
      objJour: "Objectif du jour :",
      reprendre: "📖 Reprendre :",
      validerEtape: "✅ Valider étape",
      memoriserIci: "📍 Mémoriser",
      sourateSuiv: "⏭️ Suiv. :",
      reset: "↺"
    },
    en: {
      m1: "🗓️ 1 Month (208 v./d)", m4: "🗓️ 4 Months (52 v./d)", m6: "🗓️ 6 Months (35 v./d)", m12: "🗓️ 12 Months (18 v./d)",
      ordRev: "📜 Order: Revelation (96➔110)",
      ordAsc: "⬆️ Order: Ascending (1➔114)",
      ordDesc: "⬇️ Order: Descending (114➔1)",
      jours: "d. left",
      posActuelle: "Position:",
      objJour: "Today's goal:",
      reprendre: "📖 Resume:",
      validerEtape: "✅ Complete step",
      memoriserIci: "📍 Save here",
      sourateSuiv: "⏭️ Next:",
      reset: "↺"
    },
    es: {
      m1: "🗓️ 1 Mes (208 a./d)", m4: "🗓️ 4 Meses (52 a./d)", m6: "🗓️ 6 Meses (35 a./d)", m12: "🗓️ 12 Meses (18 a./d)",
      ordRev: "📜 Orden: Revelación (96➔110)",
      ordAsc: "⬆️ Orden: Creciente (1➔114)",
      ordDesc: "⬇️ Orden: Decreciente (114➔1)",
      jours: "d. restantes",
      posActuelle: "Posición:",
      objJour: "Meta de hoy:",
      reprendre: "📖 Continuar:",
      validerEtape: "✅ Validar meta",
      memoriserIci: "📍 Guardar",
      sourateSuiv: "⏭️ Sig.:",
      reset: "↺"
    },
    ar: {
      m1: "🗓️ شهر واحد (208 آية/ي)", m4: "🗓️ 4 أشهر (52 آية/ي)", m6: "🗓️ 6 أشهر (35 آية/ي)", m12: "🗓️ 12 شهراً (18 آية/ي)",
      ordRev: "📜 الترتيب: النزول (96⬅110)",
      ordAsc: "⬆️ الترتيب: تصاعدي (1⬅114)",
      ordDesc: "⬇️ الترتيب: تنازلي (114⬅1)",
      jours: "يوم متبقي",
      posActuelle: "الموضع:",
      objJour: "ورد اليوم:",
      reprendre: "📖 متابعة:",
      validerEtape: "✅ إتمام الورد",
      memoriserIci: "📍 حفظ هنا",
      sourateSuiv: "⏭️ التالية:",
      reset: "↺"
    },
    de: {
      m1: "🗓️ 1 Monat (208 V./T)", m4: "🗓️ 4 Monate (52 V./T)", m6: "🗓️ 6 Monate (35 V./T)", m12: "🗓️ 12 Monate (18 V./T)",
      ordRev: "📜 Reihenfolge: Offenbarung (96➔110)",
      ordAsc: "⬆️ Reihenfolge: Aufsteigend (1➔114)",
      ordDesc: "⬇️ Reihenfolge: Absteigend (114➔1)",
      jours: "T. übrig",
      posActuelle: "Position:",
      objJour: "Tagesziel:",
      reprendre: "📖 Weiterlesen:",
      validerEtape: "✅ Tagesziel",
      memoriserIci: "📍 Speichern",
      sourateSuiv: "⏭️ Nächste:",
      reset: "↺"
    },
    it: {
      m1: "🗓️ 1 Mese (208 v./g)", m4: "🗓️ 4 Mesi (52 v./g)", m6: "🗓️ 6 Mesi (35 v./g)", m12: "🗓️ 12 Mesi (18 v./g)",
      ordRev: "📜 Ordine: Rivelazione (96➔110)",
      ordAsc: "⬆️ Ordine: Crescente (1➔114)",
      ordDesc: "⬇️ Ordine: Decrescente (114➔1)",
      jours: "g. rimasti",
      posActuelle: "Posizione:",
      objJour: "Obiettivo:",
      reprendre: "📖 Riprendi:",
      validerEtape: "✅ Convalida",
      memoriserIci: "📍 Salva qui",
      sourateSuiv: "⏭️ Succ.:",
      reset: "↺"
    },
    id: {
      m1: "🗓️ 1 Bulan (208 a./h)", m4: "🗓️ 4 Bulan (52 a./h)", m6: "🗓️ 6 Bulan (35 a./h)", m12: "🗓️ 12 Bulan (18 a./h)",
      ordRev: "📜 Urutan: Wahyu (96➔110)",
      ordAsc: "⬆️ Urutan: Menaik (1➔114)",
      ordDesc: "⬇️ Urutan: Menurun (114➔1)",
      jours: "h. tersisa",
      posActuelle: "Posisi:",
      objJour: "Target hari ini:",
      reprendre: "📖 Lanjutkan:",
      validerEtape: "✅ Selesai",
      memoriserIci: "📍 Simpan",
      sourateSuiv: "⏭️ Berikut:",
      reset: "↺"
    },
    ru: {
      m1: "🗓️ 1 мес. (208 а./д)", m4: "🗓️ 4 мес. (52 а./д)", m6: "🗓️ 6 мес. (35 а./д)", m12: "🗓️ 12 мес. (18 а./д)",
      ordRev: "📜 Порядок: Ниспослание (96➔110)",
      ordAsc: "⬆️ Порядок: Возрастание (1➔114)",
      ordDesc: "⬇️ Порядок: Убывание (114➔1)",
      jours: "дн. ост.",
      posActuelle: "Позиция:",
      objJour: "Цель дня:",
      reprendre: "📖 Продолжить:",
      validerEtape: "✅ Завершить",
      memoriserIci: "📍 Сохранить",
      sourateSuiv: "⏭️ След.:",
      reset: "↺"
    }
  };

  function trouverBoiteHeroPourInsertionInterne() {
    var h1 = document.querySelector("h1, h2");
    if (h1) {
      var curr = h1.parentElement;
      while (curr && curr !== document.body) {
        var st = window.getComputedStyle(curr);
        var r = curr.getBoundingClientRect();
        if (st.borderRadius && parseFloat(st.borderRadius) >= 12 && r.width >= 500) {
          return curr;
        }
        curr = curr.parentElement;
      }
      if (h1.parentElement) return h1.parentElement;
    }
    return null;
  }

  function afficherOuMettreAJourPlanificateurKhatm() {
    if (!document.body) return;
    var lang = obtenirLangueActive();
    var t = TEXTES_KHATM_I18N[lang] || TEXTES_KHATM_I18N.fr;
    var vkPage = obtenirCleVerset();
    var estSurPageVerset = Boolean(vkPage);

    var boiteHero = trouverBoiteHeroPourInsertionInterne();
    if (!boiteHero) return;

    // Masquer le bouton vert natif en doublon dans la bannière Hero
    var liensInternes = boiteHero.querySelectorAll("a, button");
    for (var l = 0; l < liensInternes.length; l++) {
      var elL = liensInternes[l];
      if (elL.closest("#khatmPlannerWidgetV70")) continue;
      var txtL = (elL.textContent || "").trim();
      if (
        txtL.indexOf("Reprendre :") !== -1 ||
        txtL.indexOf("Resume:") !== -1 ||
        txtL.indexOf("Continuar:") !== -1 ||
        txtL.indexOf("Weiterlesen:") !== -1 ||
        txtL.indexOf("Riprendi") !== -1 ||
        txtL.indexOf("Lanjutkan") !== -1 ||
        txtL.indexOf("Продолжить") !== -1 ||
        txtL.indexOf("متابعة") !== -1
      ) {
        elL.classList.add("khatm-doublon-reprendre-masque");
      }
    }

    var widget = document.getElementById("khatmPlannerWidgetV70");
    if (!widget) {
      widget = document.createElement("div");
      widget.id = "khatmPlannerWidgetV70";
      widget.setAttribute("translate", "no");
      widget.className = "notranslate";
      boiteHero.appendChild(widget);
    } else if (widget.parentElement !== boiteHero) {
      boiteHero.appendChild(widget);
    }

    var ord = etatKhatm.order;
    var m = etatKhatm.months;
    var idxActuel = etatKhatm.idxByOrder[ord] || 0;
    var vParJour = obtenirVersetsParJour(m);
    var idxCibleJour = Math.min(TOTAL_VERSETS_CORAN - 1, idxActuel + vParJour);

    var posInfo = convertirIndexGlobalVersSourateVerset(ord, idxActuel);
    var cibleInfo = convertirIndexGlobalVersSourateVerset(ord, idxCibleJour);
    var pct = ((idxActuel / TOTAL_VERSETS_CORAN) * 100).toFixed(1);
    var joursRestants = Math.max(0, Math.ceil((TOTAL_VERSETS_CORAN - idxActuel) / vParJour));

    var nomSourateAct = NOMS_SOURATES_COURT[posInfo.s] || ("Sourate " + posInfo.s);
    var nomSourateCible = NOMS_SOURATES_COURT[cibleInfo.s] || ("Sourate " + cibleInfo.s);
    var urlReprise = "sourate-" + posInfo.s + "-verset-1.html?khatm_verse=" + posInfo.v + (langExtActive ? "&lang=" + langExtActive : "");

    var cleSignatureRendu = [lang, m, ord, idxActuel, vkPage].join("|");
    if (widget.getAttribute("data-render-sig") === cleSignatureRendu) return;
    widget.setAttribute("data-render-sig", cleSignatureRendu);
    widget.style.direction = lang === "ar" ? "rtl" : "ltr";

    // Sélecteur déroulant de Sourate (ou bouton Mémoriser sur une page verset)
    var controlePositionHtml = "";
    if (estSurPageVerset) {
      var partsVk = vkPage.split(":");
      var sPage = Number(partsVk[0]);
      var sSuiv = obtenirSourateSuivanteSelonOrdre(ord, sPage);
      var btnSuivHtml = "";
      if (sSuiv) {
        var urlSuiv = "sourate-" + sSuiv + "-verset-1.html?khatm_verse=1" + (langExtActive ? "&lang=" + langExtActive : "");
        btnSuivHtml = '<a href="' + urlSuiv + '" class="khatm-btn-cyan-compact">' + t.sourateSuiv + ' ' + NOMS_SOURATES_COURT[sSuiv] + ' (' + sSuiv + ':1)</a>';
      }
      controlePositionHtml =
        '<button type="button" class="khatm-btn-cyan-compact" data-khatm-act="save-here">' + t.memoriserIci + " (" + vkPage + ")</button>" +
        btnSuivHtml;
    } else {
      var listeSOrd = obtenirListeSouratesSelonOrdre(ord);
      var optsHtml = "";
      for (var idxS = 0; idxS < listeSOrd.length; idxS++) {
        var numSOpt = listeSOrd[idxS];
        var selAttr = numSOpt === posInfo.s ? ' selected="selected"' : "";
        var vAffiche = numSOpt === posInfo.s ? posInfo.v : 1;
        optsHtml += '<option value="' + numSOpt + '"' + selAttr + '>📍 ' + (idxS + 1) + '. ' + NOMS_SOURATES_COURT[numSOpt] + ' (' + numSOpt + ':' + vAffiche + ')</option>';
      }
      controlePositionHtml = '<select class="khatm-reciter-select" data-khatm-sel="pos">' + optsHtml + '</select>';
    }

    widget.innerHTML =
      '<div class="khatm-compact-row">' +
        '<select class="khatm-reciter-select" data-khatm-sel="months">' +
          '<option value="1"' + (m === 1 ? ' selected="selected"' : '') + '>' + t.m1 + '</option>' +
          '<option value="4"' + (m === 4 ? ' selected="selected"' : '') + '>' + t.m4 + '</option>' +
          '<option value="6"' + (m === 6 ? ' selected="selected"' : '') + '>' + t.m6 + '</option>' +
          '<option value="12"' + (m === 12 ? ' selected="selected"' : '') + '>' + t.m12 + '</option>' +
        '</select>' +
        '<select class="khatm-reciter-select" data-khatm-sel="order">' +
          '<option value="revelation"' + (ord === "revelation" ? ' selected="selected"' : '') + '>' + t.ordRev + '</option>' +
          '<option value="croissant"' + (ord === "croissant" ? ' selected="selected"' : '') + '>' + t.ordAsc + '</option>' +
          '<option value="decroissant"' + (ord === "decroissant" ? ' selected="selected"' : '') + '>' + t.ordDesc + '</option>' +
        '</select>' +
        controlePositionHtml +
        '<a href="' + urlReprise + '" class="khatm-btn-green-compact" data-khatm-act="resume" data-target-s="' + posInfo.s + '" data-target-v="' + posInfo.v + '">' +
          t.reprendre + ' ' + nomSourateAct + ' (v.' + posInfo.v + ')' +
        '</a>' +
        '<button type="button" class="khatm-btn-cyan-compact" data-khatm-act="step-day">' +
          t.validerEtape + ' (+' + vParJour + ')' +
        '</button>' +
        '<button type="button" class="khatm-btn-reset-mini" data-khatm-act="reset" title="Reset">' + t.reset + '</button>' +
      '</div>' +
      '<div class="khatm-mini-footer">' +
        '<span>' + t.posActuelle + ' <strong style="color:#38bdf8;">' + nomSourateAct + ' (' + posInfo.s + ':' + posInfo.v + ')</strong></span>' +
        '<span>•</span>' +
        '<span>' + t.objJour + ' <strong style="color:#fde047;">' + nomSourateCible + ' (' + cibleInfo.s + ':' + cibleInfo.v + ')</strong></span>' +
        '<span>•</span>' +
        '<div class="khatm-mini-bar-wrap"><div class="khatm-mini-bar-fill" style="width:' + Math.max(2, Number(pct)) + '%;"></div></div>' +
        '<span style="color:#6ee7b7;font-weight:600;">' + idxActuel + ' / 6236 (' + pct + '%) • ~' + joursRestants + ' ' + t.jours + '</span>' +
      '</div>';

    var selMonths = widget.querySelector("select[data-khatm-sel='months']");
    if (selMonths) {
      selMonths.addEventListener("change", function () {
        etatKhatm.months = Number(this.value) || 1;
        sauvegarderEtatKhatm();
        afficherOuMettreAJourPlanificateurKhatm();
      });
    }

    var selOrder = widget.querySelector("select[data-khatm-sel='order']");
    if (selOrder) {
      selOrder.addEventListener("change", function () {
        etatKhatm.order = this.value || "revelation";
        sauvegarderEtatKhatm();
        afficherOuMettreAJourPlanificateurKhatm();
      });
    }

    var selPos = widget.querySelector("select[data-khatm-sel='pos']");
    if (selPos) {
      selPos.addEventListener("change", function () {
        var sChoisi = Number(this.value) || 1;
        etatKhatm.idxByOrder[etatKhatm.order] = convertirSourateVersetVersIndexGlobal(etatKhatm.order, sChoisi, 1);
        sauvegarderEtatKhatm();
        afficherOuMettreAJourPlanificateurKhatm();
      });
    }
  }

  var NOMS_114_ACCUEIL = {
    de: {
      1: "Al-Fātihah (Die Eröffnende)", 2: "Al-Baqarah (Die Kuh)", 3: "Āl 'Imrān (Die Sippe 'Imrāns)", 4: "An-Nisā' (Die Frauen)",
      5: "Al-Mā'idah (Der Tisch)", 18: "Al-Kahf (Die Höhle)", 36: "Yā-Sīn", 55: "Ar-Rahmān (Der Allerbarmer)",
      56: "Al-Wāqi'ah (Das Ereignis)", 67: "Al-Mulk (Die Herrschaft)", 68: "Al-Qalam (Das Schreibrohr)",
      73: "Al-Muzzammil (Der Eingehüllte)", 74: "Al-Muddaththir (Der Bedeckte)", 81: "At-Takwīr (Das Umschlingen)",
      87: "Al-A'lā (Der Höchste)", 89: "Al-Fajr (Die Morgenröte)", 92: "Al-Layl (Die Nacht)", 93: "Ad-Duhā (Der Vormittag)",
      94: "Ash-Sharh (Das Weiten)", 96: "Al-'Alaq (Das Anhängsel)", 100: "Al-'Ādiyāt (Die Rennenden)",
      102: "At-Takāthur (Die Vermehrung)", 103: "Al-'Asr (Die Zeit)", 107: "Al-Mā'ūn (Die Hilfeleistung)",
      108: "Al-Kawthar (Die Fülle)", 109: "Al-Kāfirūn (Die Ungläubigen)", 111: "Al-Masad (Die Palmfasern)",
      112: "Al-Ikhlās (Die Reinheit)", 113: "Al-Falaq (Das Morgenrot)", 114: "An-Nās (Die Menschen)"
    },
    it: {
      1: "Al-Fātihah (L'Aprente)", 2: "Al-Baqarah (La Giovenca)", 3: "Āl 'Imrān (La Famiglia di 'Imrān)", 4: "An-Nisā' (Le Donne)",
      5: "Al-Mā'idah (La Mensa)", 18: "Al-Kahf (La Caverna)", 36: "Yā-Sīn", 55: "Ar-Rahmān (Il Compassionevole)",
      56: "Al-Wāqi'ah (L'Evento)", 67: "Al-Mulk (La Sovranità)", 68: "Al-Qalam (Il Calamo)",
      73: "Al-Muzzammil (L'Avvolto)", 74: "Al-Muddaththir (Il Rivestito)", 81: "At-Takwīr (L'Oscuramento)",
      87: "Al-A'lā (L'Altissimo)", 89: "Al-Fajr (L'Alba)", 92: "Al-Layl (La Notte)", 93: "Ad-Duhā (La Luce del Mattino)",
      94: "Ash-Sharh (L'Apertura del Petto)", 96: "Al-'Alaq (L'Aderenza)", 100: "Al-'Ādiyāt (Le Galoppanti)",
      102: "At-Takāthur (La Rivalità)", 103: "Al-'Asr (Il Tempo)", 107: "Al-Mā'ūn (L'Utensile)",
      108: "Al-Kawthar (L'Abbondanza)", 109: "Al-Kāfirūn (I Miscredenti)", 111: "Al-Masad (Le Fibre di Palma)",
      112: "Al-Ikhlās (Il Puro Monoteismo)", 113: "Al-Falaq (L'Alba Nascente)", 114: "An-Nās (Gli Uomini)"
    },
    id: {
      1: "Al-Fātihah (Pembukaan)", 2: "Al-Baqarah (Sapi Betina)", 68: "Al-Qalam (Pena)", 73: "Al-Muzzammil (Orang yang Berselimut)",
      74: "Al-Muddaththir (Orang yang Berkemul)", 81: "At-Takwīr (Menggulung)", 87: "Al-A'lā (Yang Paling Tinggi)", 89: "Al-Fajr (Fajar)",
      92: "Al-Layl (Malam)", 93: "Ad-Duhā (Waktu Duha)", 94: "Ash-Sharh (Melapangkan)", 96: "Al-'Alaq (Segumpal Darah)",
      100: "Al-'Ādiyāt (Kuda Perang)", 102: "At-Takāthur (Bermegah-megahan)", 103: "Al-'Asr (Masa)", 107: "Al-Mā'ūn (Barang yang Berguna)",
      108: "Al-Kawthar (Nikmat yang Banyak)", 109: "Al-Kāfirūn (Orang-Orang Kafir)", 111: "Al-Masad (Gejolak Api)",
      112: "Al-Ikhlās (Kemurnian Keesaan Allah)", 113: "Al-Falaq (Waktu Subuh)", 114: "An-Nās (Manusia)"
    },
    ru: {
      1: "Аль-Фатиха (Открывающая Коран)", 2: "Аль-Бакара (Корова)", 68: "Аль-Калам (Письменная трость)", 73: "Аль-Муззаммиль (Закутавшийся)",
      74: "Аль-Муддассир (Завернувшийся)", 81: "Ат-Таквир (Скручивание)", 87: "Аль-Аля (Всевышний)", 89: "Аль-Фаджр (Заря)",
      92: "Аль-Лейл (Ночь)", 93: "Ад-Духа (Утро)", 94: "Аш-Шарх (Раскрытие)", 96: "Аль-Аляк (Сгусток крови)",
      100: "Аль-Адият (Скачущие)", 102: "Ат-Такасур (Страсть к приумножению)", 103: "Аль-Аср (Предвечернее время)", 107: "Аль-Маун (Мелочь)",
      108: "Аль-Каусар (Изобилие)", 109: "Аль-Кафирун (Неверующие)", 111: "Аль-Масад (Пальмовые волокна)",
      112: "Аль-Ихляс (Очищение веры)", 113: "Аль-Фаляк (Рассвет)", 114: "Ан-Нас (Люди)"
    }
  };

  var cacheChapitresExt = {};
  var requetesChapExtEnCours = {};
  var cacheTexteUnitaireExt = {};
  var requeteTexteExtEnCours = {};
  var noeudsTextesModifies = [];

  try {
    var sauvChapExt = localStorage.getItem("cache_ext_chap_v64");
    if (sauvChapExt) cacheChapitresExt = JSON.parse(sauvChapExt);
    var sauvTxtExt = localStorage.getItem("cache_txt_unit_ext_v64");
    if (sauvTxtExt) cacheTexteUnitaireExt = JSON.parse(sauvTxtExt);
  } catch (e) {}

  function restaurerTextesOriginauxDepuisExt() {
    for (var i = 0; i < noeudsTextesModifies.length; i++) {
      var item = noeudsTextesModifies[i];
      if (item.node && item.orig !== undefined) {
        item.node.nodeValue = item.orig;
      }
    }
    noeudsTextesModifies = [];
  }

  function modifierNoeudTexteSeul(textNode, nouveauTexte) {
    if (!textNode || textNode.nodeType !== 3) return;
    if (textNode.__origExtV70 === undefined) {
      textNode.__origExtV70 = textNode.nodeValue;
      noeudsTextesModifies.push({ node: textNode, orig: textNode.__origExtV70 });
    }
    if (textNode.nodeValue !== nouveauTexte) {
      textNode.nodeValue = nouveauTexte;
    }
  }

  function nettoyerVersetBrutApi(rawHtml) {
    if (!rawHtml) return "";
    return rawHtml
      .replace(/<sup[^>]*>[\s\S]*?<\/sup>/gi, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\[\d+\]|\(\d+\)/g, "")
      .replace(/\s+(\d+)\s*([\.!\?;:])/g, "$2")
      .replace(/\s+([\.!\?,;:])/g, "$1")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  function affinerTraductionTheologique(str, codeLang) {
    if (!str) return "";
    var out = str.trim();
    if (codeLang === "it") {
      out = out.replace(/soddisfatto di lui/gi, "soddisfatto di lei").replace(/Il suo personaggio era il Corano/gi, "Il suo carattere era il Corano").replace(/r[eé]pondit\s*:/gi, "rispose:");
    } else if (codeLang === "de") {
      out = out.replace(/mit ihm zufrieden/gi, "mit ihr zufrieden").replace(/Sein Charakter war der Koran/gi, "Sein Wesen (Charakter) war der Koran").replace(/r[eé]pondit\s*:/gi, "antwortete:");
    } else if (codeLang === "id") {
      out = out.replace(/r[eé]pondit\s*:/gi, "menjawab:").replace(/karakternya adalah Al-Qur'an/gi, "akhlaknya adalah Al-Qur'an");
    } else if (codeLang === "ru") {
      out = out.replace(/доволен им Аллах/gi, "доволен ею Аллах").replace(/Его персонажем был Коран/gi, "Его нравом был Коран").replace(/r[eé]pondit\s*:/gi, "ответила:");
    }
    return out;
  }

  function basculerDepuisArabeSurClicUtilisateur(conteneurLang, btnActif) {
    if (!conteneurLang) return;
    var btnSaAr = null;
    var btnFr = null;
    for (var i = 0; i < conteneurLang.children.length; i++) {
      var c = conteneurLang.children[i];
      var t = (c.textContent || "").replace(/\s+/g, "").toUpperCase();
      if (t.indexOf("FR") !== -1) btnFr = c;
      if (t === "SAAR" || /AR$/.test(t)) btnSaAr = c;
    }

    var arEstActif = btnSaAr && btnSaAr.classList.contains("active");
    if (arEstActif && btnFr) {
      IgnoreClicInterneFr = true;
      btnFr.click();
      IgnoreClicInterneFr = false;
    }

    for (var f = 0; f < conteneurLang.children.length; f++) {
      if (conteneurLang.children[f] !== btnActif) {
        conteneurLang.children[f].classList.remove("active");
        conteneurLang.children[f].classList.remove("active-ext-v70");
      }
    }
    if (btnActif) btnActif.classList.add("active-ext-v70");
  }

  function assurerBoutonsLanguesEtendues() {
    var oldBtns = document.querySelectorAll("[id^='btnLangTrV'], [id^='btnLangDeV']:not(#btnLangDeV70), [id^='btnLangItV']:not(#btnLangItV70), [id^='btnLangIdV']:not(#btnLangIdV70), [id^='btnLangRuV']:not(#btnLangRuV70)");
    for (var b = 0; b < oldBtns.length; b++) {
      if (oldBtns[b].parentNode) oldBtns[b].parentNode.removeChild(oldBtns[b]);
    }

    var mapIds = { de: "btnLangDeV70", it: "btnLangItV70", id: "btnLangIdV70", ru: "btnLangRuV70" };
    if (document.getElementById("btnLangDeV70") && document.getElementById("btnLangIdV70") && document.getElementById("btnLangRuV70")) {
      var parentBar = document.getElementById("btnLangDeV70").parentElement;
      if (parentBar) {
        parentBar.setAttribute("translate", "no");
        parentBar.classList.add("notranslate");
      }
      for (var code in mapIds) {
        var bEl = document.getElementById(mapIds[code]);
        if (!bEl) continue;
        if (langExtActive === code) {
          bEl.classList.add("active-ext-v70");
          if (parentBar) {
            for (var k = 0; k < parentBar.children.length; k++) {
              if (parentBar.children[k] !== bEl) parentBar.children[k].classList.remove("active");
            }
          }
        } else {
          bEl.classList.remove("active-ext-v70");
        }
      }
      return;
    }

    var tous = document.querySelectorAll("button, a, span, div, li");
    var btnFrFr = null;
    var btnSaAr = null;
    for (var i = 0; i < tous.length; i++) {
      var el = tous[i];
      var rect = el.getBoundingClientRect();
      if (rect.width < 18 || rect.width > 110 || rect.height < 14 || rect.height > 60) continue;
      var tSansEspace = (el.textContent || "").replace(/\s+/g, "").toUpperCase();
      if (tSansEspace === "SAAR" || tSansEspace === "\uD83C\uDDF8\uD83C\uDDE6AR" || /AR$/.test(tSansEspace)) {
        var parent = el.parentElement;
        if (parent) {
          var pTxt = (parent.textContent || "").toUpperCase();
          if (pTxt.indexOf("FR") !== -1 && pTxt.indexOf("EN") !== -1 && pTxt.indexOf("ES") !== -1) {
            btnSaAr = el;
            for (var c = 0; c < parent.children.length; c++) {
              if ((parent.children[c].textContent || "").toUpperCase().indexOf("FR") !== -1) {
                btnFrFr = parent.children[c];
                break;
              }
            }
            break;
          }
        }
      }
    }

    if (btnSaAr && btnSaAr.parentElement) {
      var conteneurLang = btnSaAr.parentElement;
      conteneurLang.setAttribute("translate", "no");
      conteneurLang.classList.add("notranslate");
      conteneurLang.style.setProperty("overflow", "visible", "important");
      conteneurLang.style.setProperty("flex-wrap", "wrap", "important");
      var modeleBtn = btnFrFr || btnSaAr;

      var freresInit = Array.prototype.slice.call(conteneurLang.children);
      var mapDrapeauxNatifs = {
        FR: { flag: "\uD83C\uDDEB\uD83C\uDDF7", code: "FR" },
        EN: { flag: "\uD83C\uDDEC\uD83C\uDDE7", code: "EN" },
        ES: { flag: "\uD83C\uDDEA\uD83C\uDDF8", code: "ES" },
        AR: { flag: "\uD83C\uDDF8\uD83C\uDDE6", code: "AR" }
      };
      for (var nIdx = 0; nIdx < freresInit.length; nIdx++) {
        var btnNat = freresInit[nIdx];
        var txtNat = (btnNat.textContent || "").toUpperCase();
        for (var cleNat in mapDrapeauxNatifs) {
          if (txtNat.indexOf(cleNat) !== -1) {
            var infoNat = mapDrapeauxNatifs[cleNat];
            if (btnNat.children && btnNat.children.length >= 2) {
              btnNat.children[0].textContent = infoNat.flag;
              btnNat.children[btnNat.children.length - 1].textContent = infoNat.code;
            } else {
              btnNat.innerHTML = '<span style="margin-right:3px;">' + infoNat.flag + '</span><span>' + infoNat.code + '</span>';
            }
            break;
          }
        }
      }

      function creerBoutonLangExt(idBtn, codeIso, emojiDrapeau, labelCourt) {
        var nvBtn = modeleBtn.cloneNode(true);
        nvBtn.id = idBtn;
        nvBtn.setAttribute("translate", "no");
        nvBtn.classList.add("notranslate");
        nvBtn.classList.remove("active");
        nvBtn.removeAttribute("onclick");
        nvBtn.removeAttribute("data-lang");
        if (nvBtn.children && nvBtn.children.length >= 2) {
          nvBtn.children[0].textContent = emojiDrapeau;
          nvBtn.children[nvBtn.children.length - 1].textContent = labelCourt;
        } else {
          nvBtn.innerHTML = '<span style="margin-right:3px;">' + emojiDrapeau + "</span><span>" + labelCourt + "</span>";
        }
        if (langExtActive === codeIso) nvBtn.classList.add("active-ext-v70");

        nvBtn.addEventListener("click", function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          restaurerTextesOriginauxDepuisExt();
          langExtActive = codeIso;
          try { localStorage.setItem("corantafsir_lang_ext_v70", codeIso); } catch (e) {}
          basculerDepuisArabeSurClicUtilisateur(conteneurLang, nvBtn);
          dernierVersetSeo = "";
          setTimeout(synchroniserTout, 15);
        });
        return nvBtn;
      }

      var btnDe = creerBoutonLangExt("btnLangDeV70", "de", "\uD83C\uDDE9\uD83C\uDDEA", "DE");
      var btnIt = creerBoutonLangExt("btnLangItV70", "it", "\uD83C\uDDEE\uD83C\uDDF9", "IT");
      var btnId = creerBoutonLangExt("btnLangIdV70", "id", "\uD83C\uDDEE\uD83C\uDDE9", "ID");
      var btnRu = creerBoutonLangExt("btnLangRuV70", "ru", "\uD83C\uDDF7\uD83C\uDDFA", "RU");

      for (var a = 0; a < freresInit.length; a++) {
        (function (autre) {
          autre.setAttribute("translate", "no");
          autre.classList.add("notranslate");
          autre.addEventListener("click", function () {
            if (IgnoreClicInterneFr) return;
            var etaitEnWbw = obtenirCartesMotAMotVisibles().length >= 2;
            langExtActive = "";
            try { localStorage.setItem("corantafsir_lang_ext_v70", "native"); } catch (e) {}
            btnDe.classList.remove("active-ext-v70");
            btnIt.classList.remove("active-ext-v70");
            btnId.classList.remove("active-ext-v70");
            btnRu.classList.remove("active-ext-v70");
            restaurerTextesOriginauxDepuisExt();
            dernierVersetSeo = "";

            setTimeout(function () {
              if (etaitEnWbw && obtenirCartesMotAMotVisibles().length === 0) {
                var btns = document.querySelectorAll("button, .btn");
                for (var bIdx = 0; bIdx < btns.length; bIdx++) {
                  var bt = (btns[bIdx].textContent || "").trim();
                  if (bt.indexOf("Mot à mot") !== -1 || bt.indexOf("Word by Word") !== -1 || bt.indexOf("كلمة بكلمة") !== -1 || bt.indexOf("Palabra por palabra") !== -1) {
                    btns[bIdx].click();
                    break;
                  }
                }
              }
              synchroniserTout();
            }, 25);
          });
        })(freresInit[a]);
      }

      conteneurLang.appendChild(btnDe);
      conteneurLang.appendChild(btnIt);
      conteneurLang.appendChild(btnId);
      conteneurLang.appendChild(btnRu);

      if (langExtActive && mapIds[langExtActive]) {
        basculerDepuisArabeSurClicUtilisateur(conteneurLang, document.getElementById(mapIds[langExtActive]));
      }
    }
  }

  function chargerChapitreOfficielExt(codeLang, chap) {
    var translationId = LANGUES_EXT_SUPPORTEES[codeLang];
    if (!chap || !translationId) return;
    var cle = codeLang + "_chap_" + chap;
    if (cacheChapitresExt[cle] || requetesChapExtEnCours[cle]) return;
    requetesChapExtEnCours[cle] = true;
    cacheChapitresExt[cle] = {};

    var urlApi = "https://api.quran.com/api/v4/quran/translations/" + translationId + "?chapter_number=" + chap;
    fetch(urlApi)
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.translations && d.translations.length > 0) {
          for (var j = 0; j < d.translations.length; j++) {
            var vk = chap + ":" + (j + 1);
            cacheChapitresExt[cle][vk] = nettoyerVersetBrutApi(d.translations[j].text || "");
          }
          try { localStorage.setItem("cache_ext_chap_v64", JSON.stringify(cacheChapitresExt)); } catch (e) {}
          if (langExtActive === codeLang) appliquerInterfaceEtContenuExt();
        }
      })
      .catch(function () {})
      .finally(function () {
        requetesChapExtEnCours[cle] = false;
      });
  }

  function traduireNoeudVersExtAsync(textNode, origTxt, codeLang) {
    if (!origTxt || origTxt.length < 3 || !LANGUES_EXT_SUPPORTEES[codeLang]) return;
    var cle = codeLang + "_" + origTxt.slice(0, 140) + "_" + origTxt.length;
    var esp1 = (textNode.__origExtV70 || textNode.nodeValue).match(/^\s*/)[0];
    var esp2 = (textNode.__origExtV70 || textNode.nodeValue).match(/\s*$/)[0];

    if (cacheTexteUnitaireExt[cle]) {
      modifierNoeudTexteSeul(textNode, esp1 + cacheTexteUnitaireExt[cle] + esp2);
      return;
    }

    if (requeteTexteExtEnCours[cle]) return;
    requeteTexteExtEnCours[cle] = true;

    var urlGtx = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" + codeLang + "&dt=t&q=" + encodeURIComponent(origTxt);
    fetch(urlGtx)
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res && res[0]) {
          var tr = "";
          for (var s = 0; s < res[0].length; s++) {
            if (res[0][s][0]) tr += res[0][s][0];
          }
          tr = affinerTraductionTheologique(tr, codeLang);
          if (tr) {
            cacheTexteUnitaireExt[cle] = tr;
            try { localStorage.setItem("cache_txt_unit_ext_v64", JSON.stringify(cacheTexteUnitaireExt)); } catch (e) {}
            if (langExtActive === codeLang) {
              modifierNoeudTexteSeul(textNode, esp1 + tr + esp2);
            }
          }
        }
      })
      .catch(function () {})
      .finally(function () {
        requeteTexteExtEnCours[cle] = false;
      });
  }

  var DICO_UI_PAR_LANG = {
    de: {
      "le noble coran & tafsīr": "DER EDLE KORAN & TAFSĪR",
      "le noble coran & tafsir": "DER EDLE KORAN & TAFSĪR",
      "the noble quran & tafsīr": "DER EDLE KORAN & TAFSĪR",
      "el noble corán y tafsīr": "DER EDLE KORAN & TAFSĪR",
      "le noble coran & tafsīr al-mukhtasar": "Der Edle Koran & Tafsīr Al-Mukhtasar",
      "the noble quran & tafsīr al-mukhtasar": "Der Edle Koran & Tafsīr Al-Mukhtasar",
      "‹ retour aux 114 sourates": "‹ Zurück zu den 114 Suren",
      "‹ back to 114 surahs": "‹ Zurück zu den 114 Suren",
      "‹ volver a las 114 suras": "‹ Zurück zu den 114 Suren",
      "sourate médinoise": "MEDINENSISCHE SURE",
      "medinan surah": "MEDINENSISCHE SURE",
      "sura medinense": "MEDINENSISCHE SURE",
      "sourate mecquoise": "MEKKANISCHE SURE",
      "makkan surah": "MEKKANISCHE SURE",
      "sura mequí": "MEKKANISCHE SURE",
      "📖 mot à mot": "📖 Wort für Wort",
      "mot à mot": "Wort für Wort",
      "📖 word by word": "📖 Wort für Wort",
      "word by word": "Wort für Wort",
      "🌊 bruit brun": "🌊 Braunes Rauschen",
      "bruit brun": "Braunes Rauschen",
      "🌊 brown noise": "🌊 Braunes Rauschen",
      "brown noise": "Braunes Rauschen",
      "✨ suivi": "✨ Verfolgung",
      "suivi": "Verfolgung",
      "✨ follow": "✨ Verfolgung",
      "follow": "Verfolgung",
      "enchaîner automatiquement": "Automatisch weiter",
      "auto-advance": "Automatisch weiter",
      "‹ précédent": "‹ Zurück",
      "‹ previous": "‹ Zurück",
      "suivant ›": "Weiter ›",
      "next ›": "Weiter ›",
      "▶ écouter le verset": "▶ Vers anhören",
      "▶ listen to verse": "▶ Vers anhören",
      "⏸ pause": "⏸ Pause",
      "↺ rejouer": "↺ Wiederholen",
      "↺ replay": "↺ Wiederholen",
      "tafsīr & explication du verset": "TAFSĪR & ERKLÄRUNG DES VERSES",
      "tafsīr & verse explanation": "TAFSĪR & ERKLÄRUNG DES VERSES",
      "tafsīr y explicación de la aleya": "TAFSĪR & ERKLÄRUNG DES VERSES",
      "madd (prolongation)": "Madd (Dehnung)",
      "lettre muette": "Stummer Buchstabe",
      "silent letter": "Stummer Buchstabe",
      "qu'est-ce qu'une sourate mecquoise ?": "Was ist eine mekkanische Sure?",
      "what is a meccan surah?": "Was ist eine mekkanische Sure?",
      "¿qué es una sura mequí?": "Was ist eine mekkanische Sure?",
      "qu'est-ce qu'une sourate médinoise ?": "Was ist eine medinensische Sure?",
      "what is a medinan surah?": "Was ist eine medinensische Sure?",
      "¿qué es una sura medinense?": "Was ist eine medinensische Sure?",
      "mecquoise • 86 sourates": "MEKKANISCH • 86 SUREN",
      "meccan • 86 surahs": "MEKKANISCH • 86 SUREN",
      "mequí • 86 suras": "MEKKANISCH • 86 SUREN",
      "médinoise • 28 sourates": "MEDINENSISCH • 28 SUREN",
      "medinan • 28 surahs": "MEDINENSISCH • 28 SUREN",
      "medinense • 28 suras": "MEDINENSISCH • 28 SUREN",
      "1. ordre de révélation (1 à 114)": "1. Offenbarungsreihenfolge (1–114)",
      "1. revelation order (1 to 114)": "1. Offenbarungsreihenfolge (1–114)",
      "1. orden de revelación (1 a 114)": "1. Offenbarungsreihenfolge (1–114)",
      "2. ordre du mushaf (1 à 114)": "2. Klassische Reihenfolge (1–114)",
      "2. ordre classique (1 à 114)": "2. Klassische Reihenfolge (1–114)",
      "2. traditional order (1 to 114)": "2. Klassische Reihenfolge (1–114)",
      "2. orden tradicional (1 a 114)": "2. Klassische Reihenfolge (1–114)",
      "⭐ 3. versets des miracles scientifiques": "3. ⭐ Wunder des Korans",
      "3. ⭐ miracles du coran": "3. ⭐ Wunder des Korans",
      "3. ⭐ les miracles du coran": "3. ⭐ Wunder des Korans",
      "3. ⭐ miracles of the quran": "3. ⭐ Wunder des Korans",
      "3. ⭐ milagros del corán": "3. ⭐ Wunder des Korans",
      "mecquoise": "MEKKANISCH",
      "meccan": "MEKKANISCH",
      "mequí": "MEKKANISCH",
      "médinoise": "MEDINENSISCH",
      "medinan": "MEDINENSISCH",
      "medinense": "MEDINENSISCH"
    },
    it: {
      "le noble coran & tafsīr": "IL NOBILE CORANO E TAFSĪR",
      "le noble coran & tafsir": "IL NOBILE CORANO E TAFSĪR",
      "the noble quran & tafsīr": "IL NOBILE CORANO E TAFSĪR",
      "el noble corán y tafsīr": "IL NOBILE CORANO E TAFSĪR",
      "le noble coran & tafsīr al-mukhtasar": "Il Nobile Corano e Tafsīr Al-Mukhtasar",
      "the noble quran & tafsīr al-mukhtasar": "Il Nobile Corano e Tafsīr Al-Mukhtasar",
      "‹ retour aux 114 sourates": "‹ Torna alle 114 Sure",
      "‹ back to 114 surahs": "‹ Torna alle 114 Sure",
      "‹ volver a las 114 suras": "‹ Torna alle 114 Sure",
      "sourate médinoise": "SURA MEDINESE",
      "medinan surah": "SURA MEDINESE",
      "sura medinense": "SURA MEDINESE",
      "sourate mecquoise": "SURA MECCANA",
      "makkan surah": "SURA MECCANA",
      "sura mequí": "SURA MECCANA",
      "📖 mot à mot": "📖 Parola per parola",
      "mot à mot": "Parola per parola",
      "📖 word by word": "📖 Parola per parola",
      "word by word": "Parola per parola",
      "🌊 bruit brun": "🌊 Rumore Marrone",
      "bruit brun": "Rumore Marrone",
      "🌊 brown noise": "🌊 Rumore Marrone",
      "brown noise": "Rumore Marrone",
      "✨ suivi": "✨ Seguito",
      "suivi": "Seguito",
      "✨ follow": "✨ Seguito",
      "follow": "Seguito",
      "enchaîner automatiquement": "Riproduzione automatica",
      "auto-advance": "Riproduzione automatica",
      "‹ précédent": "‹ Precedente",
      "‹ previous": "‹ Precedente",
      "suivant ›": "Successivo ›",
      "next ›": "Successivo ›",
      "▶ écouter le verset": "▶ Ascolta il versetto",
      "▶ listen to verse": "▶ Ascolta il versetto",
      "⏸ pause": "⏸ Pausa",
      "↺ rejouer": "↺ Riascolta",
      "↺ replay": "↺ Riascolta",
      "tafsīr & explication du verset": "TAFSĪR E SPIEGAZIONE DEL VERSETTO",
      "tafsīr & verse explanation": "TAFSĪR E SPIEGAZIONE DEL VERSETTO",
      "tafsīr y explicación de la aleya": "TAFSĪR E SPIEGAZIONE DEL VERSETTO",
      "madd (prolongation)": "Madd (Prolungamento)",
      "lettre muette": "Lettera muta",
      "silent letter": "Lettera muta",
      "qu'est-ce qu'une sourate mecquoise ?": "Cos'è una Sura Meccana?",
      "what is a meccan surah?": "Cos'è una Sura Meccana?",
      "¿qué es una sura mequí?": "Cos'è una Sura Meccana?",
      "qu'est-ce qu'une sourate médinoise ?": "Cos'è una Sura Medinese?",
      "what is a medinan surah?": "Cos'è una Sura Medinese?",
      "¿qué es una sura medinense?": "Cos'è una Sura Medinese?",
      "mecquoise • 86 sourates": "MECCANA • 86 SURE",
      "meccan • 86 surahs": "MECCANA • 86 SURE",
      "mequí • 86 suras": "MECCANA • 86 SURE",
      "médinoise • 28 sourates": "MEDINESE • 28 SURE",
      "medinan • 28 surahs": "MEDINESE • 28 SURE",
      "medinense • 28 suras": "MEDINESE • 28 SURE",
      "1. ordre de révélation (1 à 114)": "1. Ordine di Rivelazione (1–114)",
      "1. revelation order (1 to 114)": "1. Ordine di Rivelazione (1–114)",
      "1. orden de revelación (1 a 114)": "1. Ordine di Rivelazione (1–114)",
      "2. ordre du mushaf (1 à 114)": "2. Ordine Classico (1–114)",
      "2. ordre classique (1 à 114)": "2. Ordine Classico (1–114)",
      "2. traditional order (1 to 114)": "2. Ordine Classico (1–114)",
      "2. orden tradicional (1 a 114)": "2. Ordine Classico (1–114)",
      "⭐ 3. versets des miracles scientifiques": "3. ⭐ I Miracoli del Corano",
      "3. ⭐ miracles du coran": "3. ⭐ I Miracoli del Corano",
      "3. ⭐ les miracles du coran": "3. ⭐ I Miracoli del Corano",
      "3. ⭐ miracles of the quran": "3. ⭐ I Miracoli del Corano",
      "3. ⭐ milagros del corán": "3. ⭐ I Miracoli del Corano",
      "mecquoise": "MECCANA",
      "meccan": "MECCANA",
      "mequí": "MECCANA",
      "médinoise": "MEDINESE",
      "medinan": "MEDINESE",
      "medinense": "MEDINESE"
    },
    id: {
      "le noble coran & tafsīr": "AL-QUR'AN MULIA & TAFSĪR",
      "le noble coran & tafsir": "AL-QUR'AN MULIA & TAFSĪR",
      "the noble quran & tafsīr": "AL-QUR'AN MULIA & TAFSĪR",
      "el noble corán y tafsīr": "AL-QUR'AN MULIA & TAFSĪR",
      "le noble coran & tafsīr al-mukhtasar": "Al-Qur'an Mulia & Tafsīr Al-Mukhtasar",
      "the noble quran & tafsīr al-mukhtasar": "Al-Qur'an Mulia & Tafsīr Al-Mukhtasar",
      "‹ retour aux 114 sourates": "‹ Kembali ke 114 Surah",
      "‹ back to 114 surahs": "‹ Kembali ke 114 Surah",
      "‹ volver a las 114 suras": "‹ Kembali ke 114 Surah",
      "sourate médinoise": "SURAH MADANIYAH",
      "medinan surah": "SURAH MADANIYAH",
      "sura medinense": "SURAH MADANIYAH",
      "sourate mecquoise": "SURAH MAKKIYAH",
      "makkan surah": "SURAH MAKKIYAH",
      "sura mequí": "SURAH MAKKIYAH",
      "📖 mot à mot": "📖 Kata demi Kata",
      "mot à mot": "Kata demi Kata",
      "📖 word by word": "📖 Kata demi Kata",
      "word by word": "Kata demi Kata",
      "🌊 bruit brun": "🌊 Derau Cokelat",
      "bruit brun": "Derau Cokelat",
      "🌊 brown noise": "🌊 Derau Cokelat",
      "brown noise": "Derau Cokelat",
      "✨ suivi": "✨ Ikuti Bacaan",
      "suivi": "Ikuti Bacaan",
      "✨ follow": "✨ Ikuti Bacaan",
      "follow": "Ikuti Bacaan",
      "enchaîner automatiquement": "Putar otomatis",
      "auto-advance": "Putar otomatis",
      "‹ précédent": "‹ Sebelumnya",
      "‹ previous": "‹ Sebelumnya",
      "suivant ›": "Berikutnya ›",
      "next ›": "Berikutnya ›",
      "▶ écouter le verset": "▶ Dengarkan Ayat",
      "▶ listen to verse": "▶ Dengarkan Ayat",
      "⏸ pause": "⏸ Jeda",
      "↺ rejouer": "↺ Ulangi",
      "↺ replay": "↺ Ulangi",
      "tafsīr & explication du verset": "TAFSĪR & PENJELASAN AYAT",
      "tafsīr & verse explanation": "TAFSĪR & PENJELASAN AYAT",
      "tafsīr y explicación de la aleya": "TAFSĪR & PENJELASAN AYAT",
      "madd (prolongation)": "Mad (Bacaan Panjang)",
      "lettre muette": "Huruf Bisu",
      "silent letter": "Huruf Bisu",
      "qu'est-ce qu'une sourate mecquoise ?": "Apa itu Surah Makkiyah?",
      "what is a meccan surah?": "Apa itu Surah Makkiyah?",
      "¿qué es una sura mequí?": "Apa itu Surah Makkiyah?",
      "qu'est-ce qu'une sourate médinoise ?": "Apa itu Surah Madaniyah?",
      "what is a medinan surah?": "Apa itu Surah Madaniyah?",
      "¿qué es una sura medinense?": "Apa itu Surah Madaniyah?",
      "mecquoise • 86 sourates": "MAKKIYAH • 86 SURAH",
      "meccan • 86 surahs": "MAKKIYAH • 86 SURAH",
      "mequí • 86 suras": "MAKKIYAH • 86 SURAH",
      "médinoise • 28 sourates": "MADANIYAH • 28 SURAH",
      "medinan • 28 surahs": "MADANIYAH • 28 SURAH",
      "medinense • 28 suras": "MADANIYAH • 28 SURAH",
      "1. ordre de révélation (1 à 114)": "1. Urutan Turunnya Wahyu (1–114)",
      "1. revelation order (1 to 114)": "1. Urutan Turunnya Wahyu (1–114)",
      "1. orden de revelación (1 a 114)": "1. Urutan Turunnya Wahyu (1–114)",
      "2. ordre du mushaf (1 à 114)": "2. Urutan Mushaf (1–114)",
      "2. ordre classique (1 à 114)": "2. Urutan Mushaf (1–114)",
      "2. traditional order (1 to 114)": "2. Urutan Mushaf (1–114)",
      "2. orden tradicional (1 a 114)": "2. Urutan Mushaf (1–114)",
      "⭐ 3. versets des miracles scientifiques": "3. ⭐ Mukjizat Al-Qur'an",
      "3. ⭐ miracles du coran": "3. ⭐ Mukjizat Al-Qur'an",
      "3. ⭐ les miracles du coran": "3. ⭐ Mukjizat Al-Qur'an",
      "3. ⭐ miracles of the quran": "3. ⭐ Mukjizat Al-Qur'an",
      "3. ⭐ milagros del corán": "3. ⭐ Mukjizat Al-Qur'an",
      "mecquoise": "MAKKIYAH",
      "meccan": "MAKKIYAH",
      "mequí": "MAKKIYAH",
      "médinoise": "MADANIYAH",
      "medinan": "MADANIYAH",
      "medinense": "MADANIYAH"
    },
    ru: {
      "le noble coran & tafsīr": "СВЯЩЕННЫЙ КОРАН И ТАФСИР",
      "le noble coran & tafsir": "СВЯЩЕННЫЙ КОРАН И ТАФСИР",
      "the noble quran & tafsīr": "СВЯЩЕННЫЙ КОРАН И ТАФСИР",
      "el noble corán y tafsīr": "СВЯЩЕННЫЙ КОРАН И ТАФСИР",
      "le noble coran & tafsīr al-mukhtasar": "Священный Коран и Тафсир аль-Мухтасар",
      "the noble quran & tafsīr al-mukhtasar": "Священный Коран и Тафсир аль-Мухтасар",
      "‹ retour aux 114 sourates": "‹ Назад к 114 сурам",
      "‹ back to 114 surahs": "‹ Назад к 114 сурам",
      "‹ volver a las 114 suras": "‹ Назад к 114 сурам",
      "sourate médinoise": "МЕДИНСКАЯ СУРА",
      "medinan surah": "МЕДИНСКАЯ СУРА",
      "sura medinense": "МЕДИНСКАЯ СУРА",
      "sourate mecquoise": "МЕККАНСКАЯ СУРА",
      "makkan surah": "МЕККАНСКАЯ СУРА",
      "sura mequí": "МЕККАНСКАЯ СУРА",
      "📖 mot à mot": "📖 Пословный перевод",
      "mot à mot": "Пословный перевод",
      "📖 word by word": "📖 Пословный перевод",
      "word by word": "Пословный перевод",
      "🌊 bruit brun": "🌊 Коричневый шум",
      "bruit brun": "Коричневый шум",
      "🌊 brown noise": "🌊 Коричневый шум",
      "brown noise": "Коричневый шум",
      "✨ suivi": "✨ Слежение",
      "suivi": "Слежение",
      "✨ follow": "✨ Слежение",
      "follow": "Слежение",
      "enchaîner automatiquement": "Автопереход",
      "auto-advance": "Автопереход",
      "‹ précédent": "‹ Назад",
      "‹ previous": "‹ Назад",
      "suivant ›": "Далее ›",
      "next ›": "Далее ›",
      "▶ écouter le verset": "▶ Слушать аят",
      "▶ listen to verse": "▶ Слушать аят",
      "⏸ pause": "⏸ Пауза",
      "↺ rejouer": "↺ Повторить",
      "↺ replay": "↺ Повторить",
      "tafsīr & explication du verset": "ТАФСИР И ТОЛКОВАНИЕ АЯТА",
      "tafsīr & verse explanation": "ТАФСИР И ТОЛКОВАНИЕ АЯТА",
      "tafsīr y explicación de la aleya": "ТАФСИР И ТОЛКОВАНИЕ АЯТА",
      "madd (prolongation)": "Мадд (Удлинение)",
      "lettre muette": "Немая буква",
      "silent letter": "Немая буква",
      "qu'est-ce qu'une sourate mecquoise ?": "Что такое мекканская сура?",
      "what is a meccan surah?": "Что такое мекканская сура?",
      "¿qué es una sura mequí?": "Что такое мекканская сура?",
      "qu'est-ce qu'une sourate médinoise ?": "Что такое мединская сура?",
      "what is a medinan surah?": "Что такое мединская сура?",
      "¿qué es una sura medinense?": "Что такое мединская сура?",
      "mecquoise • 86 sourates": "МЕККАНСКАЯ • 86 СУР",
      "meccan • 86 surahs": "МЕККАНСКАЯ • 86 СУР",
      "mequí • 86 suras": "МЕККАНСКАЯ • 86 СУР",
      "médinoise • 28 sourates": "МЕДИНСКАЯ • 28 СУР",
      "medinan • 28 surahs": "МЕДИНСКАЯ • 28 СУР",
      "medinense • 28 suras": "МЕДИНСКАЯ • 28 СУР",
      "1. ordre de révélation (1 à 114)": "1. По порядку ниспослания (1–114)",
      "1. revelation order (1 to 114)": "1. По порядку ниспослания (1–114)",
      "1. orden de revelación (1 a 114)": "1. По порядку ниспослания (1–114)",
      "2. ordre du mushaf (1 à 114)": "2. По порядку Мусхафа (1–114)",
      "2. ordre classique (1 à 114)": "2. По порядку Мусхафа (1–114)",
      "2. traditional order (1 to 114)": "2. По порядку Мусхафа (1–114)",
      "2. orden tradicional (1 a 114)": "2. По порядку Мусхафа (1–114)",
      "⭐ 3. versets des miracles scientifiques": "3. ⭐ Чудеса Корана",
      "3. ⭐ miracles du coran": "3. ⭐ Чудеса Корана",
      "3. ⭐ les miracles du coran": "3. ⭐ Чудеса Корана",
      "3. ⭐ miracles of the quran": "3. ⭐ Чудеса Корана",
      "3. ⭐ milagros del corán": "3. ⭐ Чудеса Корана",
      "mecquoise": "МЕККАНСКАЯ",
      "meccan": "МЕККАНСКАЯ",
      "mequí": "МЕККАНСКАЯ",
      "médinoise": "МЕДИНСКАЯ",
      "medinan": "МЕДИНСКАЯ",
      "medinense": "МЕДИНСКАЯ"
    }
  };

  function trouverBoiteTafsirBas() {
    var els = document.querySelectorAll("div, p, span, h3, h4");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.children.length > 0) continue;
      var t = (el.textContent || "").trim().toUpperCase();
      if (t.indexOf("TAFSĪR") !== -1 || t.indexOf("ТАФСИР") !== -1 || t.indexOf("تفسير") !== -1) {
        return el.parentElement;
      }
    }
    return null;
  }

  function appliquerInterfaceEtContenuExt() {
    var codeL = langExtActive;
    if (!LANGUES_EXT_SUPPORTEES[codeL] || !document.body) return;

    var vk = obtenirCleVerset();
    var parts = vk ? vk.split(":") : [];
    var numS = parts.length === 2 ? Number(parts[0]) : 0;
    var numV = parts.length === 2 ? Number(parts[1]) : 0;

    var cleChap = codeL + "_chap_" + numS;
    if (numS && !cacheChapitresExt[cleChap]) {
      chargerChapitreOfficielExt(codeL, numS);
    }
    var texteOfficielVerset = (numS && cacheChapitresExt[cleChap]) ? cacheChapitresExt[cleChap][vk] : null;
    var dicoUi = DICO_UI_PAR_LANG[codeL];
    var noms114 = NOMS_114_ACCUEIL[codeL] || {};

    var placeholders = {
      de: "Suche nach einer Sure oder einem Vers (z.B. 2:255, 30:1, Al-Kahf...)",
      it: "Cerca una Sura o un versetto (es. 2:255, 30:1, Al-Kahf...)",
      id: "Cari Surah atau ayat (misal: 2:255, 30:1, Al-Kahf...)",
      ru: "Поиск суры или аята (например: 2:255, 30:1, Аль-Кахф...)"
    };
    var inputs = document.querySelectorAll("input[type='text'], input[type='search'], input:not([type])");
    for (var inp = 0; inp < inputs.length; inp++) {
      inputs[inp].setAttribute("placeholder", placeholders[codeL]);
    }

    var cartesAccueil = document.querySelectorAll("a[href*='sourate-']");
    for (var ca = 0; ca < cartesAccueil.length; ca++) {
      var lienCarte = cartesAccueil[ca];
      if (lienCarte.closest("#khatmPlannerWidgetV70")) continue;
      var mHref = (lienCarte.getAttribute("href") || "").match(/sourate-(\d+)/i);
      if (mHref) {
        var sId = Number(mHref[1]);
        if (noms114[sId]) {
          var titresEl = lienCarte.querySelectorAll("h2, h3, h4, div, span");
          for (var te = 0; te < titresEl.length; te++) {
            var candT = titresEl[te];
            if (candT.children.length === 0) {
              var origT = (candT.__origTitreV70 || candT.textContent || "").trim();
              if (origT.indexOf("(") !== -1 && origT.indexOf(")") !== -1 && origT.indexOf("Miracle") === -1 && origT.indexOf("Wunder") === -1 && origT.indexOf("Milagro") === -1) {
                if (!candT.__origTitreV70) candT.__origTitreV70 = origT;
                if (candT.firstChild && candT.firstChild.nodeType === 3) {
                  modifierNoeudTexteSeul(candT.firstChild, noms114[sId]);
                }
                break;
              }
            }
          }
        }
      }
    }

    var conteneurArabe = document.querySelector("#arabicVerse, .arabic-glow-verse");
    var rectArabe = conteneurArabe ? conteneurArabe.getBoundingClientRect() : null;
    var boiteTafsir = trouverBoiteTafsirBas();
    var versetHautDejaRemplace = false;

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var pEl = node.parentElement;
      if (!pEl) continue;
      var tag = pEl.tagName;
      if (tag === "SCRIPT" || tag === "STYLE") continue;
      if (pEl.closest(".wbw-card-unit") || pEl.id === "wbwSensLectureBanner" || pEl.closest(".notranslate") || pEl.closest("#khatmPlannerWidgetV70")) continue;

      var val = (node.__origExtV70 !== undefined ? node.__origExtV70 : node.nodeValue || "").replace(/\u00A0/g, " ").trim();
      if (!val || /[\u0600-\u06FF]/.test(val)) continue;
      var valLower = val.toLowerCase();

      if (dicoUi[valLower]) {
        modifierNoeudTexteSeul(node, dicoUi[valLower]);
        continue;
      }

      var matchVersetsCourt = val.match(/^(\d+)\s*(?:v\.|a\.|versets|verses|aleyas)$/i);
      if (matchVersetsCourt) {
        var nbV = matchVersetsCourt[1];
        var unitV = { de: nbV + " Verse", it: nbV + " versetti", id: nbV + " ayat", ru: nbV + " аятов" }[codeL];
        modifierNoeudTexteSeul(node, unitV);
        continue;
      }

      if (valLower.indexOf("safari") !== -1 || valLower.indexOf("android") !== -1 || valLower.indexOf("iphone") !== -1) {
        var txtPwa = {
          de: "📲 App auf Ihrem Telefon installieren (iPhone / Android)",
          it: "📲 Installa l'App sul tuo telefono (iPhone / Android)",
          id: "📲 Pasang Aplikasi di ponsel Anda (iPhone / Android)",
          ru: "📲 Установить приложение на телефон (iPhone / Android)"
        }[codeL];
        modifierNoeudTexteSeul(node, txtPwa);
        continue;
      }

      if (/(?:Verset|Verse|Aleya)\s+\d+\s*\/\s*\d+/i.test(val)) {
        var mapMotVers = { de: "Vers", it: "Versetto", id: "Ayat", ru: "Аят" };
        var mapMotMir = { de: "Wunder", it: "Miracolo", id: "Mukjizat", ru: "Чудо" };
        modifierNoeudTexteSeul(node, val.replace(/Verset|Verse|Aleya/gi, mapMotVers[codeL]).replace(/Miracle/gi, mapMotMir[codeL]));
        continue;
      }

      var mMirBadge = val.match(/(?:Miracle|Milagro)\s*[:\(]\s*(?:V\.?|A\.?|Verset|Verse)\s*(\d+)\)?/i);
      if (mMirBadge) {
        var vNumMir = mMirBadge[1];
        var txtMir = {
          de: "⭐ WUNDER (VERS " + vNumMir + ")",
          it: "⭐ MIRACOLO (V. " + vNumMir + ")",
          id: "⭐ MUKJIZAT (AYAT " + vNumMir + ")",
          ru: "⭐ ЧУДО (АЯТ " + vNumMir + ")"
        }[codeL];
        modifierNoeudTexteSeul(node, txtMir);
        continue;
      }

      if ((val.indexOf("Sourate ") === 0 || val.indexOf("Surah ") === 0 || val.indexOf("Sure ") === 0 || val.indexOf("Sura ") === 0) && (val.indexOf(" — Verset ") !== -1 || val.indexOf(" — Verse ") !== -1 || val.indexOf(" — Aleya ") !== -1)) {
        var prefS = { de: "Sure ", it: "Sura ", id: "Surah ", ru: "Сура " }[codeL];
        var prefV = { de: " — Vers ", it: " — Versetto ", id: " — Ayat ", ru: " — Аят " }[codeL];
        if (numS && noms114[numS]) {
          modifierNoeudTexteSeul(node, prefS + noms114[numS] + prefV + numV);
        } else {
          modifierNoeudTexteSeul(node, val.replace(/^Sourate |^Surah |^Sura /, prefS).replace(/ — Verset | — Verse | — Aleya /, prefV));
        }
        continue;
      }

      var rectP = pEl.getBoundingClientRect();
      var estDansTafsir = boiteTafsir && boiteTafsir.contains(pEl);
      if (
        !estDansTafsir &&
        !versetHautDejaRemplace &&
        numV &&
        rectArabe &&
        rectP.top >= rectArabe.top &&
        rectP.top <= rectArabe.bottom + 180 &&
        new RegExp("^" + numV + "\\s*[\\.-]\\s+").test(val)
      ) {
        versetHautDejaRemplace = true;
        if (texteOfficielVerset) {
          modifierNoeudTexteSeul(node, numV + ". " + texteOfficielVerset);
        } else {
          traduireNoeudVersExtAsync(node, val, codeL);
        }
        continue;
      }

      var estSurAccueil = !rectArabe && val.length >= 25;
      var estSousVerset = (estDansTafsir || (rectArabe && rectP.top > rectArabe.bottom + 75)) && val.length >= 3;
      if (estSurAccueil || estSousVerset) {
        if (
          val.indexOf("Traduction originale") === -1 &&
          val.indexOf("Deutsche Übersetzung") === -1 &&
          val.indexOf("Traduzione italiana") === -1 &&
          val.indexOf("Terjemahan Kementerian") === -1 &&
          val.indexOf("Смысловой перевод") === -1 &&
          val.indexOf("Translation by Saheeh") === -1 &&
          val.indexOf("Traducción de Sheikh Isa García") === -1 &&
          val.indexOf("TAFSĪR") === -1
        ) {
          traduireNoeudVersExtAsync(node, val, codeL);
        }
      }
    }
  }

  function corrigerCoquillesNativesEtTafsir() {
    var lang = obtenirLangueActive();
    var pEls = document.querySelectorAll("p, button, strong, b, span");
    for (var i = 0; i < pEls.length; i++) {
      var el = pEls[i];
      if (el.children.length > 0 || el.closest("#khatmPlannerWidgetV70")) continue;
      var t = el.textContent || "";
      if (t.indexOf("y e temen") !== -1) {
        el.textContent = t.replace("y e temen", "y le temen");
      }
      if ((lang === "es" || lang === "it") && t.trim() === "⏸ Pause") {
        el.textContent = "⏸ Pausa";
      }
      if (/^\d+\s*\.\s+(?:Le Livre par excellence|This is the Qur'ān|El Libro por excelencia|Das Buch schlechthin|Il Libro per eccellenza|Kitab yang paling|Лучшей книгой)/i.test(t.trim())) {
        el.textContent = t.trim().replace(/^\d+\s*\.\s+/, "");
      }
    }
  }

  // 2. BOUTON "✨ SUIVI" MULTILINGUE
  var suiviEstActif = true;

  function assurerBoutonSuiviVisible() {
    if (!obtenirCleVerset()) return;
    var tousBtns = document.querySelectorAll("button, .btn, span[role='button']");
    var btnSuivi = null;
    var btnTajwid = null;
    for (var i = 0; i < tousBtns.length; i++) {
      var b = tousBtns[i];
      var t = (b.textContent || "").trim();
      if (t.indexOf("Suivi") !== -1 || t.indexOf("Follow") !== -1 || t.indexOf("Seguimiento") !== -1 || t.indexOf("Verfolgung") !== -1 || t.indexOf("Seguito") !== -1 || t.indexOf("Ikuti") !== -1 || t.indexOf("Слежение") !== -1 || t.indexOf("تتبع") !== -1) {
        btnSuivi = b;
      } else if (t.indexOf("Tajw") !== -1 || t.indexOf("تجويد") !== -1) {
        btnTajwid = b;
      }
    }

    var mapLabelsSuivi = { de: "✨ Verfolgung", it: "✨ Seguito", id: "✨ Ikuti Bacaan", ru: "✨ Слежение" };
    var labelSuivi = mapLabelsSuivi[langExtActive] || "✨ Suivi";

    if (btnSuivi) {
      btnSuivi.style.setProperty("display", "inline-flex", "important");
      btnSuivi.style.setProperty("visibility", "visible", "important");
      btnSuivi.style.setProperty("opacity", "1", "important");
      if (btnSuivi.id === "btnSuiviUniverselV70" && btnSuivi.textContent !== labelSuivi) {
        btnSuivi.textContent = labelSuivi;
      }
      if (suiviEstActif) {
        btnSuivi.style.setProperty("background", "linear-gradient(135deg, #0ea5e9, #38bdf8)", "important");
        btnSuivi.style.setProperty("color", "#ffffff", "important");
      } else {
        btnSuivi.style.removeProperty("background");
      }
    } else if (btnTajwid && btnTajwid.parentElement && !document.getElementById("btnSuiviUniverselV70")) {
      var nv = document.createElement("button");
      nv.id = "btnSuiviUniverselV70";
      nv.type = "button";
      nv.className = btnTajwid.className;
      nv.textContent = labelSuivi;
      nv.style.setProperty("background", "linear-gradient(135deg, #0ea5e9, #38bdf8)", "important");
      nv.style.setProperty("color", "#ffffff", "important");
      nv.style.setProperty("margin-left", "6px", "important");
      btnTajwid.parentElement.insertBefore(nv, btnTajwid.nextSibling);
    }
  }

  // 3. SOLEIL ET LUNE EN ORBITE (AVEC CACHE ULTRA-RAPIDE)
  var astresDejaVerrouilles = false;
  function reparerSoleilEtLuneEnOrbite() {
    if (astresDejaVerrouilles && document.querySelector(".astre-soleil-pur-v70") && document.querySelector(".astre-lune-pure-v70")) {
      return;
    }

    var tousDivs = document.querySelectorAll("div, span, canvas");
    var spheresTrouvees = [];

    for (var i = 0; i < tousDivs.length; i++) {
      var el = tousDivs[i];
      var idCls = ((el.id || "") + " " + (el.className && typeof el.className === "string" ? el.className : "")).toLowerCase();

      var estNommeSun = idCls.indexOf("sun") !== -1 || idCls.indexOf("soleil") !== -1 || el.getAttribute("data-astre-role") === "sun";
      var estNommeMoon = idCls.indexOf("moon") !== -1 || idCls.indexOf("lune") !== -1 || el.getAttribute("data-astre-role") === "moon";

      var r = el.getBoundingClientRect();
      var estRondVide =
        r.width >= 55 &&
        r.width <= 320 &&
        Math.abs(r.width - r.height) <= 10 &&
        (el.textContent || "").trim() === "" &&
        !el.querySelector("button, input, select, p, a, img");

      if (estNommeSun || estNommeMoon || estRondVide) {
        var st = window.getComputedStyle(el);
        var br = st.borderRadius || "";
        if (estNommeSun || estNommeMoon || br.indexOf("50%") !== -1 || parseFloat(br) >= r.width * 0.4) {
          var styleStr = ((el.getAttribute("style") || "") + " " + (st.boxShadow || "") + " " + (st.backgroundImage || "") + " " + (st.backgroundColor || "")).toLowerCase();
          var aCouleurSoleil =
            styleStr.indexOf("250, 204, 21") !== -1 || styleStr.indexOf("245, 158, 11") !== -1 ||
            styleStr.indexOf("253, 224, 71") !== -1 || styleStr.indexOf("234, 88, 12") !== -1 ||
            styleStr.indexOf("255, 215") !== -1 || styleStr.indexOf("255, 180") !== -1 ||
            styleStr.indexOf("facc15") !== -1 || styleStr.indexOf("fde047") !== -1 ||
            styleStr.indexOf("f59e0b") !== -1 || styleStr.indexOf("0, 210, 255") !== -1 ||
            styleStr.indexOf("56, 189, 248") !== -1;

          spheresTrouvees.push({
            el: el, cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: r.width,
            isSun: estNommeSun || (!estNommeMoon && aCouleurSoleil), isMoon: estNommeMoon
          });
        }
      }
    }

    var astresPrincipaux = [];
    for (var j = 0; j < spheresTrouvees.length; j++) {
      var s = spheresTrouvees[j];
      var doublonSuperpose = false;
      for (var k = 0; k < astresPrincipaux.length; k++) {
        var p = astresPrincipaux[k];
        if (Math.hypot(s.cx - p.cx, s.cy - p.cy) < 48) {
          doublonSuperpose = true;
          s.el.style.setProperty("display", "none", "important");
          break;
        }
      }
      if (!doublonSuperpose) astresPrincipaux.push(s);
    }

    var soleilDejaTrouve = false;
    for (var m = 0; m < astresPrincipaux.length; m++) {
      if (astresPrincipaux[m].isSun) soleilDejaTrouve = true;
    }

    for (var n = 0; n < astresPrincipaux.length; n++) {
      var astre = astresPrincipaux[n];
      var node = astre.el;
      if (node.children && node.children.length > 0) node.innerHTML = "";

      var role = node.getAttribute("data-astre-role");
      if (!role) {
        if (astre.isSun || (!soleilDejaTrouve && !astre.isMoon && n === 0)) {
          role = "sun";
          soleilDejaTrouve = true;
        } else {
          role = "moon";
        }
        node.setAttribute("data-astre-role", role);
      }

      if (role === "sun") {
        node.classList.remove("astre-lune-pure-v70");
        node.classList.add("astre-soleil-pur-v70");
        node.style.setProperty("width", "150px", "important");
        node.style.setProperty("height", "150px", "important");
        node.style.setProperty("border-radius", "50%", "important");
        node.style.setProperty("background", "radial-gradient(circle at 50% 50%, #ffffff 0%, #fffef0 26%, #fef08a 52%, #facc15 76%, #f59e0b 94%, rgba(245, 158, 11, 0) 100%)", "important");
        node.style.setProperty("background-color", "#fde047", "important");
        node.style.setProperty("box-shadow", "0 0 50px 16px rgba(253, 224, 71, 0.72), 0 0 110px 38px rgba(245, 158, 11, 0.42)", "important");
        node.style.setProperty("filter", "none", "important");
      } else {
        node.classList.remove("astre-soleil-pur-v70");
        node.classList.add("astre-lune-pure-v70");
        node.style.setProperty("width", "150px", "important");
        node.style.setProperty("height", "150px", "important");
        node.style.setProperty("border-radius", "50%", "important");
        node.style.setProperty("background", "radial-gradient(circle at 50% 50%, #ffffff 0%, #f8fafc 38%, #e2e8f0 70%, rgba(186, 230, 253, 0) 100%)", "important");
        node.style.setProperty("background-color", "#ffffff", "important");
        node.style.setProperty("box-shadow", "0 0 45px 15px rgba(255, 255, 255, 0.65), 0 0 95px 35px rgba(148, 163, 184, 0.35)", "important");
        node.style.setProperty("filter", "none", "important");
      }
    }
    if (astresPrincipaux.length >= 2) {
      astresDejaVerrouilles = true;
    }
  }

  function retirerRecitateurMaher() {
    var imgs = document.querySelectorAll("img");
    for (var im = 0; im < imgs.length; im++) {
      var src = (imgs[im].getAttribute("src") || "").toLowerCase();
      imgs[im].setAttribute("loading", "lazy");
      if (src.indexOf("maher") !== -1 || src.indexOf("muaiqly") !== -1) {
        var row = imgs[im].parentElement;
        if (row && row.getBoundingClientRect().height < 110) {
          row.classList.add("maher-supprime-v70");
          if (row.parentNode) row.parentNode.removeChild(row);
        }
      }
    }
  }

  // DÉTECTION EXACTE DE LA LANGUE ACTIVE SUR L'ACCUEIL COMME SUR LES PAGES VERSETS !
  function obtenirLangueActive() {
    if (langExtActive && LANGUES_EXT_SUPPORTEES[langExtActive]) return langExtActive;

    // 1. Lire directement le bouton .active dans la barre de langues
    var btnDeRef = document.getElementById("btnLangDeV70");
    if (btnDeRef && btnDeRef.parentElement) {
      var ch = btnDeRef.parentElement.children;
      for (var i = 0; i < ch.length; i++) {
        if (ch[i].classList.contains("active")) {
          var t = (ch[i].textContent || "").toUpperCase();
          if (t.indexOf("EN") !== -1) return "en";
          if (t.indexOf("ES") !== -1) return "es";
          if (t.indexOf("AR") !== -1) return "ar";
          if (t.indexOf("FR") !== -1) return "fr";
        }
      }
    }

    // 2. Fallback sur le texte de la page (Accueil + Pages Versets)
    var bodyTxt = document.body ? document.body.innerText : "";
    if (bodyTxt.indexOf("Escuchar aleya") !== -1 || bodyTxt.indexOf("EXPLICACIÓN DE LA ALEYA") !== -1 || bodyTxt.indexOf("EL NOBLE CORÁN") !== -1 || bodyTxt.indexOf("¿Qué es una Sura") !== -1) return "es";
    if (bodyTxt.indexOf("Listen to verse") !== -1 || bodyTxt.indexOf("VERSE EXPLANATION") !== -1 || bodyTxt.indexOf("THE NOBLE QURAN") !== -1 || bodyTxt.indexOf("What is a Meccan") !== -1) return "en";
    if (bodyTxt.indexOf("استمع للآية") !== -1 || bodyTxt.indexOf("تفسير الآية") !== -1 || bodyTxt.indexOf("ترتيب النزول") !== -1 || bodyTxt.indexOf("ما هي السورة المكية") !== -1) return "ar";
    return "fr";
  }

  function mettreAJourMentionsTraducteurEtExegese() {
    var lang = obtenirLangueActive();
    var textesBas = {
      fr: "Traduction originale de Muhammad Hamidullah (1977) • Exégèse (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      en: "Translation by Saheeh International • Exegesis (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      es: "Traducción de Sheikh Isa García • Exégesis (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      de: "Deutsche Übersetzung von Frank Bubenheim & Nadeem Elyas • Exegese (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      it: "Traduzione italiana di Hamza Roberto Piccardo • Esegesi (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      id: "Terjemahan Kementerian Agama RI (Kemenag) • Tafsir Al-Mukhtasar & Ibnu Katsir",
      ru: "Смысловой перевод Эльмира Кулиева • Тафсир аль-Мухтасар и Ибн Касир",
      ar: "النص القرآني بالرسم العثماني • التفسير المختصر وتفسير ابن كثير وأسباب النزول"
    };
    var textesHaut = {
      fr: "Traduction Muhammad Hamidullah (1977) & Exégèse",
      en: "Saheeh International & Exegesis",
      es: "Traducción Sheikh Isa García y Exégesis",
      de: "Übersetzung Bubenheim & Elyas & Exegese (Tafsīr)",
      it: "Traduzione Hamza Roberto Piccardo & Esegesi (Tafsīr)",
      id: "Terjemahan Kemenag RI & Tafsir Al-Mukhtasar",
      ru: "Перевод Э. Кулиева и Тафсир аль-Мухтасар",
      ar: "التفسير المختصر وتفسير ابن كثير وأسباب النزول"
    };

    var tous = document.querySelectorAll("p, div, span, small, footer");
    for (var i = 0; i < tous.length; i++) {
      var el = tous[i];
      if (el.children.length > 0) continue;
      var txt = (el.textContent || "").trim();
      if (!txt) continue;

      if (
        txt.indexOf("Traduction originale de Muhammad Hamidullah") !== -1 ||
        txt.indexOf("Translation by Saheeh International") !== -1 ||
        txt.indexOf("Traducción de Abdel Ghani Melara") !== -1 ||
        txt.indexOf("Traducción de Sheikh Isa García") !== -1 ||
        txt.indexOf("Deutsche Übersetzung von Frank Bubenheim") !== -1 ||
        txt.indexOf("Traduzione italiana di Hamza Roberto Piccardo") !== -1 ||
        txt.indexOf("Terjemahan Kementerian Agama RI") !== -1 ||
        txt.indexOf("Смысловой перевод Эльмира Кулиева") !== -1 ||
        txt.indexOf("النص القرآني بالرسم العثماني") !== -1
      ) {
        if (el.textContent !== textesBas[lang]) {
          el.textContent = textesBas[lang];
          el.style.setProperty("direction", lang === "ar" ? "rtl" : "ltr", "important");
        }
      }

      if (
        txt.indexOf("Traduction Muhammad Hamidullah") !== -1 ||
        txt.indexOf("Saheeh International & Exegesis") !== -1 ||
        txt.indexOf("Traducción Abdel Ghani Melara") !== -1 ||
        txt.indexOf("Traducción Sheikh Isa García") !== -1 ||
        txt.indexOf("Übersetzung Bubenheim & Elyas") !== -1 ||
        txt.indexOf("Traduzione Hamza Roberto Piccardo") !== -1 ||
        txt.indexOf("Terjemahan Kemenag RI") !== -1 ||
        txt.indexOf("Перевод Э. Кулиева") !== -1 ||
        txt.indexOf("التفسير المختصر وتفسير ابن كثير") !== -1
      ) {
        var parts = txt.split("•");
        if (parts.length >= 2) {
          var lieu = parts[0].trim();
          var nv = lieu + " • " + textesHaut[lang];
          if (el.textContent !== nv) el.textContent = nv;
        }
      }
    }
  }

  // 4. MOT-À-MOT EN ORDRE AUDIO STRICT + 8 LANGUES
  var DICO_MULTILINGUE = {
    fr: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn", "طه": "Tā-Hā",
      "ذلك": "Ce (C'est)", "الكتاب": "le Livre", "لا": "ne...pas / point de", "ريب": "doute", "فيه": "en lui", "هدى": "un guide", "للمتقين": "pour les pieux",
      "ختم": "a scellé", "الله": "Allāh", "على": "sur", "قلوبهم": "leurs cœurs", "وعلى": "et sur", "سمعهم": "leur ouïe", "وأبصارهم": "et sur leurs regards", "أبصارهم": "leurs regards", "غشاوة": "un voile", "غشوة": "un voile", "ولهم": "et pour eux", "عذاب": "un châtiment", "عظيم": "immense",
      "والقلم": "Par la plume", "يسطرون": "ils écrivent !", "ما": "Tu n'es pas", "أنت": "toi", "بنعمة": "par la grâce de", "ربك": "ton Seigneur", "بمجنون": "un possédé"
    },
    de: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn", "طه": "Tā-Hā",
      "ذلك": "Dieses (Das ist)", "الكتاب": "das Buch", "لا": "kein", "ريب": "Zweifel", "فيه": "darin", "هدى": "eine Rechtleitung", "للمتقين": "für die Gottesfürchtigen",
      "ختم": "Versiegelt hat", "الله": "Allāh", "على": "auf", "قلوبهم": "ihre Herzen", "وعلى": "und auf", "سمعهم": "ihr Gehör", "أبصارهم": "ihre Blicke", "غشاوة": "eine Hülle", "غشوة": "eine Hülle", "ولهم": "und für sie", "عذاب": "eine Strafe", "عظيم": "gewaltige",
      "والقلم": "Beim Schreibrohr", "يسطرون": "sie niederschreiben!"
    },
    it: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn", "طه": "Tā-Hā",
      "ذلك": "Questo (è)", "الكتاب": "il Libro", "لا": "non c'è", "ريب": "dubbio", "فيه": "in esso", "هدى": "una guida", "للمتقين": "per i timorati",
      "ختم": "Ha suggellato", "الله": "Allāh", "على": "sui", "قلوبهم": "loro cuori", "وعلى": "e sul", "سمعهم": "loro udito", "أبصارهم": "loro sguardi", "غشاوة": "un velo", "غشوة": "un velo", "ولهم": "e per loro", "عذاب": "un castigo", "عظيم": "immenso",
      "والقلم": "Per il calamo", "يسطرون": "scrivono!"
    },
    id: {
      "الم": "Alif Lām Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn", "طه": "Tā-Hā",
      "ذلك": "Kitab (ini)", "الكتاب": "Al-Kitab", "لا": "tidak ada", "ريب": "keraguan", "فيه": "padanya", "هدى": "petunjuk", "للمتقين": "bagi orang-orang bertakwa",
      "ختم": "telah mengunci", "الله": "Allah", "على": "atas", "قلوبهم": "hati mereka", "وعلى": "dan atas", "سمعهم": "pendengaran mereka", "أبصارهم": "penglihatan mereka", "غشاوة": "penutup", "غشوة": "penutup", "ولهم": "dan bagi mereka", "عذاب": "azab", "عظيم": "yang besar",
      "والقلم": "Demi pena", "وما": "dan apa yang", "يسطرون": "mereka tuliskan"
    },
    ru: {
      "الم": "Алиф, Лам, Мим", "ن": "Нун", "ق": "Каф", "ص": "Сад", "يس": "Йа Син", "طه": "Та Ха",
      "ذلك": "Это", "الكتاب": "Писание (Книга)", "لا": "нет", "ريب": "сомнения", "فيه": "в нём", "هدى": "верное руководство", "للمتقين": "для богобоязненных",
      "ختم": "Запечатал", "الله": "Аллах", "على": "на", "قلوبهم": "их сердца", "وعلى": "и на", "سمعهم": "их слух", "أبصارهم": "их взорах", "غشاوة": "пелена (завеса)", "غشوة": "пелена (завеса)", "ولهم": "и для них", "عذاب": "наказание", "عظيم": "великое",
      "والقلم": "Клянусь письменной тростью", "وما": "и тем, что", "يسطرون": "они пишут!"
    },
    es: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn",
      "ذلك": "Ese (Este es)", "الكتاب": "el Libro", "لا": "no hay", "ريب": "duda", "فيه": "en él", "هدى": "una guía", "للمتقين": "para los piadosos",
      "ختم": "ha sellado", "الله": "Allāh (Dios)", "على": "sobre", "قلوبهم": "sus corazones", "وعلى": "y sobre", "سمعهم": "su oído", "وأبصارهم": "y sus miradas", "أبصارهم": "sus miradas (ojos)", "غشاوة": "un velo", "غشوة": "un velo", "ولهم": "y para ellos", "عذاب": "un castigo", "عظيم": "inmenso"
    }
  };

  var cacheVersetMotsExact = {};
  var requetesVersetEnCours = {};
  var sensGrilleRtl = true;

  try {
    var sauv = localStorage.getItem("cache_wbw_exact_v65") || localStorage.getItem("cache_wbw_exact_v64");
    if (sauv) cacheVersetMotsExact = JSON.parse(sauv);
  } catch (e) {}

  function normaliserArabeCle(str) {
    if (!str) return "";
    return str
      .replace(/[\u06D6-\u06ED\u064B-\u065F\u0670\u0640\u0653\u0654\u0655]/g, "")
      .replace(/[إأآٱ]/g, "ا")
      .replace(/ؤ/g, "و")
      .replace(/ئ/g, "ي")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .replace(/\s+/g, "")
      .trim();
  }

  function chercherDansDicoCertifie(motAr, lang) {
    var cle = normaliserArabeCle(motAr);
    if (!cle) return "";

    if (cle === "من") {
      var aKasra = motAr.indexOf("\u0650") !== -1;
      if (lang === "fr") return aKasra ? "de / avant" : "qui (quiconque)";
      if (lang === "de") return aKasra ? "von / vor" : "wer (jemand)";
      if (lang === "it") return aKasra ? "da / prima" : "chi (colui che)";
      if (lang === "id") return aKasra ? "dari / sebelum" : "siapa (orang yang)";
      if (lang === "ru") return aKasra ? "из / от" : "кто (тот, кто)";
      if (lang === "es") return aKasra ? "de / antes" : "quien";
    }

    var dico = DICO_MULTILINGUE[lang];
    if (!dico) return "";
    for (var k in dico) {
      if (normaliserArabeCle(k) === cle) return dico[k];
    }
    return "";
  }

  function chargerVraiMotAMotVerset(vk, lang) {
    if (!vk) return;
    var cleCache = vk + "_" + lang;
    if (cacheVersetMotsExact[cleCache] || requetesVersetEnCours[cleCache]) return;
    requetesVersetEnCours[cleCache] = true;

    var urlQdc = "https://api.quran.com/api/v4/verses/by_key/" + vk + "?language=en&words=true&word_fields=text_uthmani,translation";
    fetch(urlQdc)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || !data.verse || !data.verse.words) return;
        var motsQdc = [];
        for (var i = 0; i < data.verse.words.length; i++) {
          var w = data.verse.words[i];
          if (w.char_type_name === "word") {
            var arTxt = w.text_uthmani || "";
            var trTxt = w.translation && w.translation.text ? w.translation.text : "";
            motsQdc.push({ ar: arTxt, en: trTxt, tr: trTxt });
          }
        }

        if (lang === "en" || lang === "ar") {
          cacheVersetMotsExact[cleCache] = motsQdc;
          try { localStorage.setItem("cache_wbw_exact_v65", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
          appliquerVraiMotAMotSurDOM();
          return;
        }

        var aTraduireIdx = [];
        var aTraduireTextes = [];
        for (var j = 0; j < motsQdc.length; j++) {
          var cert2 = chercherDansDicoCertifie(motsQdc[j].ar, lang);
          if (cert2) {
            motsQdc[j].tr = cert2;
          } else {
            var propreEn = motsQdc[j].en.replace(/[\(\)\[\]]/g, "").trim();
            aTraduireIdx.push(j);
            aTraduireTextes.push(propreEn || motsQdc[j].ar);
          }
        }

        if (aTraduireTextes.length === 0) {
          cacheVersetMotsExact[cleCache] = motsQdc;
          try { localStorage.setItem("cache_wbw_exact_v65", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
          appliquerVraiMotAMotSurDOM();
          return;
        }

        var sep = String.fromCharCode(10);
        var blocTexte = aTraduireTextes.join(" " + sep + " ");
        var gtxUrl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" + lang + "&dt=t&q=" + encodeURIComponent(blocTexte);
        fetch(gtxUrl)
          .then(function (r2) { return r2.json(); })
          .then(function (resGtx) {
            if (resGtx && resGtx[0]) {
              var texteCompletTraduit = "";
              for (var s = 0; s < resGtx[0].length; s++) {
                if (resGtx[0][s][0]) texteCompletTraduit += resGtx[0][s][0];
              }
              var lignes = texteCompletTraduit.split(sep);
              for (var k = 0; k < aTraduireIdx.length; k++) {
                var idxMot = aTraduireIdx[k];
                var trMot = lignes[k] ? lignes[k].trim() : "";
                if (trMot) motsQdc[idxMot].tr = trMot;
              }
            }
          })
          .catch(function () {})
          .finally(function () {
            cacheVersetMotsExact[cleCache] = motsQdc;
            try { localStorage.setItem("cache_wbw_exact_v65", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
            appliquerVraiMotAMotSurDOM();
          });
      })
      .catch(function () {})
      .finally(function () {
        requetesVersetEnCours[cleCache] = false;
      });
  }

  function obtenirCartesMotAMotVisibles() {
    var cartes = [];
    var c1 = document.querySelectorAll(".wbw-card, .wbw-word, .wbw-item");
    for (var i = 0; i < c1.length; i++) {
      var r1 = c1[i].getBoundingClientRect();
      if (r1.width > 25 && r1.height > 25) {
        c1[i].classList.add("wbw-card-unit");
        cartes.push(c1[i]);
      }
    }
    if (cartes.length > 0) return cartes;

    var tousDivs = document.querySelectorAll("div");
    var candidats = [];
    for (var d = 0; d < tousDivs.length; d++) {
      var el = tousDivs[d];
      if (
        el.children && el.children.length >= 2 && el.children.length <= 3 &&
        el.children[0].tagName === "DIV" && el.children[el.children.length - 1].tagName === "DIV" &&
        !el.querySelector("button")
      ) {
        var r = el.getBoundingClientRect();
        if (r.width >= 48 && r.width <= 280 && r.height >= 48 && r.height <= 220) {
          var txt0 = (el.children[0].textContent || "").trim();
          if (/[\u0600-\u06FF]/.test(txt0) && txt0.length < 40) candidats.push(el);
        }
      }
    }

    for (var c = 0; c < candidats.length; c++) {
      var cand = candidats[c];
      var estEnfant = false;
      for (var p = 0; p < candidats.length; p++) {
        if (c !== p && candidats[p].contains(cand)) { estEnfant = true; break; }
      }
      if (!estEnfant) {
        cand.classList.add("wbw-card-unit");
        cartes.push(cand);
      } else {
        cand.classList.remove("wbw-card-unit");
        cand.removeAttribute("data-word-num");
      }
    }
    return cartes;
  }

  function appliquerVraiMotAMotSurDOM() {
    var cartes = obtenirCartesMotAMotVisibles();
    var oldBanner = document.getElementById("wbwSensLectureBanner");
    if (cartes.length === 0) {
      if (oldBanner) oldBanner.style.display = "none";
      return;
    }

    var lang = obtenirLangueActive();
    var vk = obtenirCleVerset();
    var cleCache = vk + "_" + lang;

    if (!cacheVersetMotsExact[cleCache]) chargerVraiMotAMotVerset(vk, lang);
    var listeExacte = cacheVersetMotsExact[cleCache];

    for (var i = 0; i < cartes.length; i++) {
      var c = cartes[i];
      c.setAttribute("data-word-num", String(i + 1));
      if (!c.children || c.children.length < 2) continue;
      var elAr = c.children[0];
      var elTr = c.children[c.children.length - 1];
      elAr.classList.remove("wbw-card-unit");
      elAr.removeAttribute("data-word-num");

      var txtAr = (elAr.textContent || "").trim();
      var cleCarteAr = normaliserArabeCle(txtAr);
      var tradFinale = chercherDansDicoCertifie(txtAr, lang);

      if (cleCarteAr === "وما" && (lang === "fr" || lang === "de" || lang === "it" || lang === "id" || lang === "ru")) {
        var estNeg = false;
        if (i + 1 < cartes.length && cartes[i + 1].children.length) {
          var suivAr = normaliserArabeCle(cartes[i + 1].children[0].textContent || "");
          if (suivAr === "هم" || suivAr === "يخدعون" || suivAr === "يشعرون" || suivAr === "يعلمون" || suivAr === "كانوا") {
            estNeg = true;
          }
        }
        if (lang === "de") tradFinale = estNeg ? "und sie (sind) nicht" : "und was";
        else if (lang === "it") tradFinale = estNeg ? "ed essi non (sono)" : "e ciò che";
        else if (lang === "id") tradFinale = estNeg ? "padahal mereka bukanlah" : "dan apa yang";
        else if (lang === "ru") tradFinale = estNeg ? "но они не" : "и тем, что";
        else tradFinale = estNeg ? "et ils ne" : "et ce qu'";
      }

      if (!tradFinale && listeExacte && listeExacte.length > 0) {
        if (listeExacte[i] && normaliserArabeCle(listeExacte[i].ar) === cleCarteAr) {
          tradFinale = listeExacte[i].tr;
        } else {
          for (var m = 0; m < listeExacte.length; m++) {
            if (normaliserArabeCle(listeExacte[m].ar) === cleCarteAr) {
              tradFinale = listeExacte[m].tr;
              break;
            }
          }
          if (!tradFinale && listeExacte[i]) tradFinale = listeExacte[i].tr;
        }
      }

      if (tradFinale && elTr.textContent !== tradFinale) elTr.textContent = tradFinale;
    }

    var grilleParente = cartes[0].parentElement;
    if (grilleParente) {
      grilleParente.style.setProperty("direction", sensGrilleRtl ? "rtl" : "ltr", "important");
      var totalW = cartes.length;
      var textesRtl = {
        fr: "⬅️ Sens de lecture : de droite à gauche (1 ➔ " + totalW + ") • Cliquer pour inverser",
        en: "⬅️ Reading order: Right to Left (1 ➔ " + totalW + ") • Click to reverse",
        es: "⬅️ Orden de lectura: de derecha a izquierda (1 ➔ " + totalW + ") • Clic para invertir",
        de: "⬅️ Leserichtung: von rechts nach links (1 ➔ " + totalW + ") • Klicken zum Umkehren",
        it: "⬅️ Ordine di lettura: da destra a sinistra (1 ➔ " + totalW + ") • Clicca per invertire",
        id: "⬅️ Arah baca: dari kanan ke kiri (1 ➔ " + totalW + ") • Klik untuk membalik",
        ru: "⬅️ Порядок чтения: справа налево (1 ➔ " + totalW + ") • Нажмите, чтобы изменить",
        ar: "⬅️ ترتيب القراءة: من اليمين إلى اليسار (1 ➔ " + totalW + ")"
      };
      var textesLtr = {
        fr: "➡️ Sens de lecture : de gauche à droite (1 ➔ " + totalW + ") • Cliquer pour inverser",
        en: "➡️ Reading order: Left to Right (1 ➔ " + totalW + ") • Click to reverse",
        es: "➡️ Orden de lectura: de izquierda a derecha (1 ➔ " + totalW + ") • Clic para invertir",
        de: "➡️ Leserichtung: von links nach rechts (1 ➔ " + totalW + ") • Klicken zum Umkehren",
        it: "➡️ Ordine di lettura: da sinistra a destra (1 ➔ " + totalW + ") • Clicca per invertire",
        id: "➡️ Arah baca: dari kiri ke kanan (1 ➔ " + totalW + ") • Klik untuk membalik",
        ru: "➡️ Порядок чтения: слева направо (1 ➔ " + totalW + ") • Нажмите, чтобы изменить",
        ar: "➡️ ترتيب القراءة: من اليسار إلى اليمين (1 ➔ " + totalW + ")"
      };
      var fleche = sensGrilleRtl ? (textesRtl[lang] || textesRtl.fr) : (textesLtr[lang] || textesLtr.fr);
      if (!oldBanner) {
        oldBanner = document.createElement("div");
        oldBanner.id = "wbwSensLectureBanner";
        oldBanner.addEventListener("click", function () {
          sensGrilleRtl = !sensGrilleRtl;
          appliquerVraiMotAMotSurDOM();
        });
        grilleParente.parentElement.insertBefore(oldBanner, grilleParente);
      }
      oldBanner.style.display = "block";
      if (oldBanner.textContent !== fleche) oldBanner.textContent = fleche;
    }
  }

  function masquerTraductionBasSiMotAMot() {
    var cartes = obtenirCartesMotAMotVisibles();
    if (cartes.length < 2) {
      var caches = document.querySelectorAll(".wbw-masquer-traduction-bas");
      for (var c = 0; c < caches.length; c++) caches[c].classList.remove("wbw-masquer-traduction-bas");
      return;
    }
    var premiereCarte = cartes[0];
    var grilleParente = premiereCarte.parentElement;
    var boiteVerset = grilleParente ? grilleParente.parentElement : null;
    if (!boiteVerset) return;

    var rectDerniereCarte = cartes[cartes.length - 1].getBoundingClientRect();
    var candidats = boiteVerset.querySelectorAll("p, div, h1, h2, h3, h4, span");
    for (var i = 0; i < candidats.length; i++) {
      var el = candidats[i];
      if (el.id === "wbwSensLectureBanner" || el === grilleParente || el.contains(premiereCarte) || grilleParente.contains(el)) continue;
      if (el.querySelector("button") || el.tagName === "BUTTON") continue;
      var txt = (el.textContent || "").trim();
      if (!txt || /[\u0600-\u06FF]/.test(txt)) continue;
      var r = el.getBoundingClientRect();
      if (r.top >= rectDerniereCarte.top + 10 || /^\d+\s*[\.-]/.test(txt)) {
        if (txt.indexOf("TAFSĪR") === -1 && txt.indexOf("ТАФСИР") === -1 && txt.indexOf("ERKLÄRUNG") === -1 && txt.indexOf("SPIEGAZIONE") === -1 && txt.indexOf("PENJELASAN") === -1 && txt.indexOf("EXPLICATION") === -1 && txt.indexOf("Ghunnah") === -1) {
          el.classList.add("wbw-masquer-traduction-bas");
        }
      }
    }
  }

  var dernierVersetSeo = "";
  function injecterPackSeoComplet() {
    var vk = obtenirCleVerset();
    var lang = obtenirLangueActive();
    var cleSeo = (vk || "home") + "_" + lang;
    if (cleSeo === dernierVersetSeo) return;
    dernierVersetSeo = cleSeo;

    var urlCanonique = vk
      ? "https://corantafsir.com/sourate-" + vk.split(":")[0] + "-verset-" + vk.split(":")[1] + ".html"
      : "https://corantafsir.com/";

    var languesSeo = ["fr", "en", "es", "ar", "de", "it", "id", "ru"];
    for (var l = 0; l < languesSeo.length; l++) {
      var codeL = languesSeo[l];
      var linkAlt = document.querySelector("link[hreflang='" + codeL + "']");
      if (!linkAlt) {
        linkAlt = document.createElement("link");
        linkAlt.setAttribute("rel", "alternate");
        linkAlt.setAttribute("hreflang", codeL);
        document.head.appendChild(linkAlt);
      }
      linkAlt.setAttribute("href", codeL === "fr" ? urlCanonique : urlCanonique + "?lang=" + codeL);
    }
  }

  var wbwScale = 1.0;
  function appliquerZoomMotAMot() {
    var root = document.documentElement;
    var arRem = (2.15 * wbwScale).toFixed(2) + "rem";
    var trRem = (0.92 * Math.pow(wbwScale, 0.82)).toFixed(2) + "rem";
    var padV = Math.round(14 * Math.pow(wbwScale, 0.75)) + "px";
    var padH = Math.round(18 * Math.pow(wbwScale, 0.78)) + "px";
    var minW = Math.round(92 * wbwScale) + "px";
    root.style.setProperty("--wbw-ar-size", arRem);
    root.style.setProperty("--wbw-tr-size", trRem);
    root.style.setProperty("--wbw-pad-v", padV);
    root.style.setProperty("--wbw-pad-h", padH);
    root.style.setProperty("--wbw-min-w", minW);
  }

  // 6. ANIMATION MODE SUIVI : BLANC TAMISÉ (78%) -> 100% LUMINEUX + BLEU NÉON
  var MAP_NOMS_VERS_QDC = {
    dosari: [174, 168], dossari: [174, 168], yasser: [174, 168],
    afasy: [7], alafasy: [7], mishary: [7],
    sudais: [3], soudais: [3],
    shuraim: [10, 4], shuraym: [10, 4],
    hussary: [6], husary: [6],
    abdulbaset: [2, 1], abdulbasit: [2, 1],
    minshawi: [9]
  };

  var cacheTimingVerset = {};
  var requetesEnCours = {};
  window.__lecteurAudioActuel = null;
  var rafId = null;
  var energiesMots = [];
  var bleusMots = [];
  var dernierVersetSuivi = "";

  function obtenirCleRecitateurSelectionne() {
    var selects = document.querySelectorAll("select");
    for (var i = 0; i < selects.length; i++) {
      var s = selects[i];
      if (s.classList.contains("khatm-reciter-select")) continue;
      if (s.options && s.selectedIndex >= 0) {
        var txt = ((s.value || "") + " " + (s.options[s.selectedIndex].textContent || "")).toLowerCase();
        if (txt.indexOf("verset") === -1 && txt.indexOf("verse") === -1 && txt.indexOf("aleya") === -1 && txt.indexOf("vers ") === -1 && txt.indexOf("ayat") === -1 && txt.indexOf("аят") === -1) {
          for (var k in MAP_NOMS_VERS_QDC) {
            if (txt.indexOf(k) !== -1) return k;
          }
        }
      }
    }
    return "dosari";
  }

  function chargerTimestampsQdc(cleRec, vk) {
    if (!cleRec || !vk) return;
    var chap = vk.split(":")[0];
    var cleChap = cleRec + "_chap_" + chap;
    if (requetesEnCours[cleChap]) return;
    requetesEnCours[cleChap] = true;

    var idPrincipal = (MAP_NOMS_VERS_QDC[cleRec] || [174])[0];
    fetch("https://api.qurancdn.com/api/qdc/audio/reciters/" + idPrincipal + "/audio_files?chapter=" + chap + "&segments=true")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.audio_files && data.audio_files[0] && data.audio_files[0].verse_timings) {
          var vts = data.audio_files[0].verse_timings;
          for (var i = 0; i < vts.length; i++) {
            var vt = vts[i];
            if (vt.verse_key && vt.segments && vt.segments.length > 0) {
              var valides = [], minMs = Infinity, maxMs = -Infinity;
              for (var j = 0; j < vt.segments.length; j++) {
                var s = vt.segments[j];
                if (s && s.length >= 3 && s[0] != null && s[1] != null && s[2] != null) {
                  var wIdx = Number(s[0]) - 1, t1 = Number(s[1]), t2 = Number(s[2]);
                  if (!isNaN(wIdx) && !isNaN(t1) && !isNaN(t2) && t2 >= t1) {
                    if (t1 < minMs) minMs = t1;
                    if (t2 > maxMs) maxMs = t2;
                    valides.push({ wordIndex: wIdx, t1: t1, t2: t2 });
                  }
                }
              }
              if (valides.length > 0 && maxMs > minMs) {
                var span = maxMs - minMs;
                cacheTimingVerset[cleRec + "_" + vt.verse_key] = valides.map(function (v) {
                  return { wordIndex: v.wordIndex, rStart: (v.t1 - minMs) / span, rEnd: (v.t2 - minMs) / span };
                });
              }
            }
          }
        }
      })
      .catch(function () {});
  }

  function obtenirElementsMotsAAnimer() {
    var cartes = obtenirCartesMotAMotVisibles();
    if (cartes.length >= 2) return { type: "cartes", items: cartes };

    var conteneur = document.querySelector("#arabicVerse, .arabic-glow-verse");
    if (!conteneur) return { type: "spans", items: [] };
    conteneur.setAttribute("dir", "rtl");

    var spansExistants = conteneur.querySelectorAll("span");
    var aSigneIsole = false;
    for (var s = 0; s < spansExistants.length; s++) {
      var stxt = (spansExistants[s].textContent || "").replace(/[\u06D6-\u06ED\u064B-\u065F\u0670\u06DD\u06DE\u06E9\s]/g, "");
      if (stxt.length === 0) {
        aSigneIsole = true;
        break;
      }
    }
    if (spansExistants.length > 1 && !aSigneIsole) {
      return { type: "spans", items: spansExistants };
    }

    var texte = (conteneur.textContent || "").trim();
    if (!texte) return { type: "spans", items: [] };
    var bruts = texte.split(/\s+/).filter(Boolean);
    var motsPropres = [];
    for (var i = 0; i < bruts.length; i++) {
      var w = bruts[i];
      var sansMarques = w.replace(/[\u06D6-\u06ED\u064B-\u065F\u0670\u06DD\u06DE\u06E9]/g, "");
      if (sansMarques.length === 0 && motsPropres.length > 0) {
        motsPropres[motsPropres.length - 1] += " " + w;
      } else {
        motsPropres.push(w);
      }
    }
    if (motsPropres.length <= 1) return { type: "spans", items: spansExistants };
    conteneur.innerHTML = motsPropres.map(function (m, idx) {
      return '<span class="ar-word-follow" data-widx="' + idx + '">' + m + "</span>";
    }).join(" ");
    return { type: "spans", items: conteneur.querySelectorAll("span") };
  }

  function reinitialiserMotsEnBlancTamise() {
    energiesMots = [];
    bleusMots = [];
    var cibleObj = obtenirElementsMotsAAnimer();
    var items = cibleObj.items;
    var estCartes = cibleObj.type === "cartes";
    for (var i = 0; i < items.length; i++) {
      var el = items[i];
      el.style.setProperty("transform", "translate3d(0, 0px, 0) scale(1)", "important");
      el.style.setProperty("filter", "none", "important");
      if (estCartes) {
        el.style.setProperty("opacity", "0.82", "important");
        el.style.setProperty("border-color", "rgba(255, 255, 255, 0.15)", "important");
        el.style.setProperty("box-shadow", "none", "important");
      } else {
        el.style.setProperty("opacity", "0.78", "important");
        el.style.setProperty("color", "rgba(255, 255, 255, 0.78)", "important");
        el.style.setProperty("text-shadow", "0 0 8px rgba(255, 255, 255, 0.14)", "important");
      }
    }
  }

  function lancerBoucleSuivi() {
    if (!rafId) {
      rafId = requestAnimationFrame(etapeSuiviAudioAfterEffects);
    }
  }

  if (typeof HTMLMediaElement !== "undefined" && HTMLMediaElement.prototype && !HTMLMediaElement.prototype.__hookedV70) {
    var origPlay = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      var self = this;
      window.__lecteurAudioActuel = self;
      if (self.currentTime < 0.25) {
        reinitialiserMotsEnBlancTamise();
      }
      if (!self.__listenersV70) {
        self.__listenersV70 = true;
        self.addEventListener("playing", lancerBoucleSuivi);
        self.addEventListener("timeupdate", lancerBoucleSuivi);
      }
      var cleRec = obtenirCleRecitateurSelectionne();
      var vk = obtenirCleVerset();
      if (cleRec && vk) chargerTimestampsQdc(cleRec, vk);
      lancerBoucleSuivi();
      return origPlay.apply(self, arguments);
    };
    HTMLMediaElement.prototype.__hookedV70 = true;
  }

  function trouverAudioActif() {
    if (window.__lecteurAudioActuel && !window.__lecteurAudioActuel.paused && !window.__lecteurAudioActuel.ended) {
      return window.__lecteurAudioActuel;
    }
    var audios = document.querySelectorAll("audio");
    for (var i = 0; i < audios.length; i++) {
      if (!audios[i].paused && !audios[i].ended) return audios[i];
    }
    return null;
  }

  function courbeAfterEffects(x) {
    var t = Math.max(0, Math.min(1, x));
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function etapeSuiviAudioAfterEffects() {
    var vkActuel = obtenirCleVerset();
    if (vkActuel && vkActuel !== dernierVersetSuivi) {
      dernierVersetSuivi = vkActuel;
      energiesMots = [];
      bleusMots = [];
    }

    var cibleObj = obtenirElementsMotsAAnimer();
    var items = cibleObj.items;
    var estCartes = cibleObj.type === "cartes";
    var aud = trouverAudioActif();
    var activeIndexFloat = -1;

    if (items && items.length && suiviEstActif) {
      if (energiesMots.length !== items.length) {
        energiesMots = new Array(items.length).fill(0);
        bleusMots = new Array(items.length).fill(0);
      }

      for (var i = 0; i < items.length; i++) {
        if (items[i].classList.contains("active") || items[i].classList.contains("speaking") || items[i].classList.contains("current")) {
          activeIndexFloat = i;
          break;
        }
      }

      if (activeIndexFloat === -1 && aud && aud.duration > 0.2 && aud.currentTime > 0.02) {
        var cleRec = obtenirCleRecitateurSelectionne();
        var vk = obtenirCleVerset();
        var t = aud.currentTime;
        var d = aud.duration;
        var debutVoix = Math.min(0.18, d * 0.04);
        var finVoix = Math.max(debutVoix + 0.25, d - Math.min(0.35, d * 0.07));
        var ratioVoix = Math.max(0, Math.min(0.999, (t - debutVoix) / (finVoix - debutVoix)));

        var segsNorm = cacheTimingVerset[cleRec + "_" + vk];
        if (segsNorm && segsNorm.length > 0) {
          for (var s = 0; s < segsNorm.length; s++) {
            var sg = segsNorm[s];
            if (ratioVoix >= sg.rStart && ratioVoix <= sg.rEnd) {
              var progInterne = sg.rEnd > sg.rStart ? (ratioVoix - sg.rStart) / (sg.rEnd - sg.rStart) : 0.5;
              activeIndexFloat = sg.wordIndex + progInterne * 0.35;
              break;
            }
          }
        }
        if (activeIndexFloat === -1) {
          activeIndexFloat = ratioVoix * items.length;
        }
      } else if (aud && aud.ended) {
        activeIndexFloat = items.length;
      }

      var idxEntier = Math.floor(activeIndexFloat);
      var lectureEnCours = activeIndexFloat >= 0;

      for (var m = 0; m < items.length; m++) {
        var el = items[m];

        var cibleElevation = lectureEnCours && m === idxEntier ? 1.0 : 0.0;
        energiesMots[m] += (cibleElevation - energiesMots[m]) * 0.22;
        if (energiesMots[m] < 0.002) energiesMots[m] = 0;
        if (energiesMots[m] > 0.998) energiesMots[m] = 1;

        var cibleBleu = lectureEnCours && m <= idxEntier ? 1.0 : bleusMots[m];
        bleusMots[m] += (cibleBleu - bleusMots[m]) * 0.18;
        if (bleusMots[m] < 0.002) bleusMots[m] = 0;
        if (bleusMots[m] > 0.998) bleusMots[m] = 1;

        var e = courbeAfterEffects(energiesMots[m]);
        var b = courbeAfterEffects(bleusMots[m]);

        var yPx = (-7.5 * e).toFixed(2);
        var sc = (1.0 + 0.12 * e).toFixed(3);

        if (estCartes) {
          var opCarte = (0.82 + 0.18 * b).toFixed(2);
          el.style.setProperty("opacity", opCarte, "important");
          el.style.setProperty("transform", "translate3d(0, " + yPx + "px, 0) scale(" + (1.0 + 0.08 * e).toFixed(3) + ")", "important");
          if (b > 0.02) {
            el.style.setProperty("border-color", "rgba(56, 189, 248, " + (0.45 * b + 0.55 * e).toFixed(2) + ")", "important");
            el.style.setProperty("box-shadow", "0 " + (6 * b + 6 * e).toFixed(1) + "px " + (18 * b + 14 * e).toFixed(1) + "px rgba(56, 189, 248, " + (0.35 * b + 0.35 * e).toFixed(2) + "), inset 0 0 " + (12 * b).toFixed(1) + "px rgba(56, 189, 248, " + (0.18 * b).toFixed(2) + ")", "important");
          } else {
            el.style.setProperty("border-color", "rgba(255, 255, 255, 0.15)", "important");
            el.style.setProperty("box-shadow", "none", "important");
          }
        } else {
          el.style.setProperty("background", "transparent", "important");
          el.style.setProperty("border", "none", "important");
          el.style.setProperty("filter", "none", "important");
          el.style.setProperty("transform", "translate3d(0, " + yPx + "px, 0) scale(" + sc + ")", "important");

          if (b < 0.03) {
            el.style.setProperty("opacity", "0.78", "important");
            el.style.setProperty("color", "rgba(255, 255, 255, 0.78)", "important");
            el.style.setProperty("text-shadow", "0 0 8px rgba(255, 255, 255, 0.14)", "important");
          } else {
            var opMot = (0.78 + 0.22 * b).toFixed(2);
            el.style.setProperty("opacity", opMot, "important");
            el.style.setProperty("color", "#ffffff", "important");
            var alphaBleu1 = (0.88 * b + 0.12 * e).toFixed(2);
            var alphaBleu2 = (0.68 * b + 0.32 * e).toFixed(2);
            var rayon1 = (15 + 9 * e).toFixed(1);
            var rayon2 = (30 + 18 * e).toFixed(1);
            el.style.setProperty(
              "text-shadow",
              "0 0 10px rgba(255, 255, 255, 0.98), 0 0 " + rayon1 + "px rgba(56, 189, 248, " + alphaBleu1 + "), 0 0 " + rayon2 + "px rgba(14, 165, 233, " + alphaBleu2 + ")",
              "important"
            );
          }
        }
      }
    }

    var animEnCours = false;
    for (var z = 0; z < energiesMots.length; z++) {
      if (energiesMots[z] > 0.005 || (bleusMots[z] > 0.005 && bleusMots[z] < 0.995)) {
        animEnCours = true;
        break;
      }
    }

    if ((aud && !aud.paused) || animEnCours) {
      rafId = requestAnimationFrame(etapeSuiviAudioAfterEffects);
    } else {
      rafId = null;
    }
  }

  var enCoursDeSync = false;
  function synchroniserTout() {
    if (enCoursDeSync) return;
    enCoursDeSync = true;
    try {
      verifierSautDirectVersetKhatm();
      synchroniserPositionKhatmAutomatique();
      assurerBoutonsLanguesEtendues();
      assurerBoutonSuiviVisible();
      reparerSoleilEtLuneEnOrbite();
      retirerRecitateurMaher();
      if (langExtActive && LANGUES_EXT_SUPPORTEES[langExtActive]) appliquerInterfaceEtContenuExt();
      corrigerCoquillesNativesEtTafsir();
      mettreAJourMentionsTraducteurEtExegese();
      afficherOuMettreAJourPlanificateurKhatm();
      masquerTraductionBasSiMotAMot();
      appliquerVraiMotAMotSurDOM();
      appliquerZoomMotAMot();
      injecterPackSeoComplet();
      var cleRec = obtenirCleRecitateurSelectionne();
      var vk = obtenirCleVerset();
      if (cleRec && vk) chargerTimestampsQdc(cleRec, vk);
      if (vk) chargerVraiMotAMotVerset(vk, obtenirLangueActive());
    } finally {
      enCoursDeSync = false;
    }
  }

  window.addEventListener("DOMContentLoaded", function () {
    synchroniserTout();
    reinitialiserMotsEnBlancTamise();
  });

  document.addEventListener("click", function (e) {
    var btnKhatmAct = e.target.closest("[data-khatm-act]");
    if (btnKhatmAct) {
      var act = btnKhatmAct.getAttribute("data-khatm-act");
      var ord = etatKhatm.order;
      if (act === "resume") {
        var vkCurr = obtenirCleVerset();
        var tS = Number(btnKhatmAct.getAttribute("data-target-s"));
        var tV = Number(btnKhatmAct.getAttribute("data-target-v"));
        if (vkCurr && Number(vkCurr.split(":")[0]) === tS && tV) {
          e.preventDefault();
          allerAuVersetSurMemePage(tV);
          return;
        }
      } else if (act === "step-day") {
        var vJour = obtenirVersetsParJour(etatKhatm.months);
        etatKhatm.idxByOrder[ord] = Math.min(TOTAL_VERSETS_CORAN - 1, (etatKhatm.idxByOrder[ord] || 0) + vJour);
        sauvegarderEtatKhatm();
        afficherOuMettreAJourPlanificateurKhatm();
        return;
      } else if (act === "save-here") {
        var vkHere = obtenirCleVerset();
        if (vkHere) {
          var ph = vkHere.split(":");
          etatKhatm.idxByOrder[ord] = convertirSourateVersetVersIndexGlobal(ord, Number(ph[0]), Number(ph[1]));
          sauvegarderEtatKhatm();
          afficherOuMettreAJourPlanificateurKhatm();
        }
        return;
      } else if (act === "reset") {
        etatKhatm.idxByOrder[ord] = 0;
        sauvegarderEtatKhatm();
        afficherOuMettreAJourPlanificateurKhatm();
        return;
      }
    }

    var btn = e.target.closest("button, .btn, span, a, div");
    if (btn) {
      var t = (btn.textContent || "").trim();
      if (t === "A+" || t === "A +") {
        wbwScale = Math.min(2.5, +(wbwScale + 0.16).toFixed(2));
      } else if (t === "A-" || t === "A -" || t === "A−") {
        wbwScale = Math.max(0.68, +(wbwScale - 0.16).toFixed(2));
      } else if (t.indexOf("Rejouer") !== -1 || t.indexOf("Replay") !== -1 || t.indexOf("Repetir") !== -1 || t.indexOf("Wiederholen") !== -1 || t.indexOf("Riascolta") !== -1 || t.indexOf("Ulangi") !== -1 || t.indexOf("Повторить") !== -1) {
        reinitialiserMotsEnBlancTamise();
      } else if (t.indexOf("Suivi") !== -1 || t.indexOf("Follow") !== -1 || t.indexOf("Seguimiento") !== -1 || t.indexOf("Verfolgung") !== -1 || t.indexOf("Seguito") !== -1 || t.indexOf("Ikuti") !== -1 || t.indexOf("Слежение") !== -1 || t.indexOf("تتبع") !== -1) {
        suiviEstActif = !suiviEstActif;
        lancerBoucleSuivi();
      } else if (t.indexOf("Suivant") !== -1 || t.indexOf("Next") !== -1 || t.indexOf("Siguiente") !== -1 || t.indexOf("Weiter") !== -1 || t.indexOf("Successivo") !== -1 || t.indexOf("Berikutnya") !== -1 || t.indexOf("Далее") !== -1) {
        var vkNow = obtenirCleVerset();
        if (vkNow) {
          var pNow = vkNow.split(":");
          var sNow = Number(pNow[0]);
          var vNow = Number(pNow[1]);
          if (sNow && vNow && vNow >= NB_VERSETS_PAR_SOURATE[sNow]) {
            var sNext = obtenirSourateSuivanteSelonOrdre(etatKhatm.order, sNow);
            if (sNext) {
              etatKhatm.idxByOrder[etatKhatm.order] = convertirSourateVersetVersIndexGlobal(etatKhatm.order, sNext, 1);
              sauvegarderEtatKhatm();
              window.location.href = "sourate-" + sNext + "-verset-1.html?khatm_verse=1" + (langExtActive ? "&lang=" + langExtActive : "");
              return;
            }
          }
        }
      }
    }
    setTimeout(synchroniserTout, 15);
    setTimeout(synchroniserTout, 80);
  });

  setInterval(function () {
    synchroniserTout();
    var aud = trouverAudioActif();
    if (aud && !aud.paused && !rafId) {
      lancerBoucleSuivi();
    }
  }, 300);

  synchroniserTout();
}

const blocCompletV70 = preconnectTags + '\n' + cssV70 + '\n<script id="script-master-v70">(' + codeClientV70.toString() + ')();</script>';
const blocEchappePourGenerateur = blocCompletV70.replace(/\\/g, '\\\\');

// 1. Patcher generateur.js
let g = fs.readFileSync(pGen, 'utf8');
g = g.replace(/<style id="patch-master-v\d+">[\s\S]*?<\/script>/g, '');
g = g.replace(/<style id="patch-hide-tr-wbw-v\d+">[\s\S]*?<\/script>/g, '');
g = g.replace(/<link rel="preconnect" href="https:\/\/api\.quran\.com"[^>]*>\s*/g, '');
g = g.replace(/<link rel="preconnect" href="https:\/\/api\.qurancdn\.com"[^>]*>\s*/g, '');
g = g.replace(/<link rel="preconnect" href="https:\/\/everyayah\.com"[^>]*>\s*/g, '');
g = g.replace(/<link rel="preconnect" href="https:\/\/quranenc\.com"[^>]*>\s*/g, '');
g = g.replace(/<link rel="preconnect" href="https:\/\/translate\.googleapis\.com"[^>]*>\s*/g, '');
g = g.replace(/<\/head>/g, () => blocEchappePourGenerateur + '\n</head>');
fs.writeFileSync(pGen, g, 'utf8');

// 2. Patcher aussi les fichiers index.html
const fichiersIndex = [
  path.join(__dirname, 'site', 'index.html'),
  path.join(__dirname, 'index.html'),
  'C:\\Users\\anoua\\OneDrive\\Documents\\GitHub\\noble-coran\\site\\index.html'
];
for (const fIdx of fichiersIndex) {
  if (fs.existsSync(fIdx)) {
    let htmlIdx = fs.readFileSync(fIdx, 'utf8');
    htmlIdx = htmlIdx.replace(/<style id="patch-master-v\d+">[\s\S]*?<\/script>/g, '');
    htmlIdx = htmlIdx.replace(/<link rel="preconnect" href="https:\/\/api\.quran\.com"[^>]*>\s*/g, '');
    htmlIdx = htmlIdx.replace(/<link rel="preconnect" href="https:\/\/api\.qurancdn\.com"[^>]*>\s*/g, '');
    htmlIdx = htmlIdx.replace(/<link rel="preconnect" href="https:\/\/everyayah\.com"[^>]*>\s*/g, '');
    htmlIdx = htmlIdx.replace(/<link rel="preconnect" href="https:\/\/quranenc\.com"[^>]*>\s*/g, '');
    htmlIdx = htmlIdx.replace(/<link rel="preconnect" href="https:\/\/translate\.googleapis\.com"[^>]*>\s*/g, '');
    htmlIdx = htmlIdx.replace(/<\/head>/i, () => blocCompletV70 + '\n</head>');
    fs.writeFileSync(fIdx, htmlIdx, 'utf8');
  }
}

console.log('✅ Correctif V70 activé : Planificateur Khatm Ultra-Compact (Menus déroulants style Récitateur) + Traduction 8 langues !');
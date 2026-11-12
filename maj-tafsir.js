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

const cssV59 = `<style id="patch-master-v59">
:root {
  --wbw-ar-size: 2.15rem;
  --wbw-tr-size: 0.92rem;
  --wbw-pad-v: 14px;
  --wbw-pad-h: 18px;
  --wbw-min-w: 92px;
}

/* 0. ANTI-FLASH FRANÇAIS -> ALLEMAND */
html.lang-de-pending-v59 h1,
html.lang-de-pending-v59 h2,
html.lang-de-pending-v59 p,
html.lang-de-pending-v59 .tafsir-content {
  opacity: 0 !important;
  transition: opacity 0.12s ease !important;
}

/* 1. SOLEIL DORÉ PUR 150px */
html body #flatEarthSun,
html body .flat-earth-sun,
html body [id*="sun" i]:not([id*="sound" i]),
html body [class*="sun" i]:not([class*="sound" i]),
html body [data-astre-role="sun"],
html body .astre-soleil-pur-v59 {
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
}
html body #flatEarthSun::before, html body #flatEarthSun::after,
html body .flat-earth-sun::before, html body .flat-earth-sun::after,
html body .astre-soleil-pur-v59::before, html body .astre-soleil-pur-v59::after,
html body #flatEarthSun *, html body .flat-earth-sun *, html body .astre-soleil-pur-v59 * {
  display: none !important; content: none !important; background: none !important; box-shadow: none !important; opacity: 0 !important;
}

/* 2. LUNE BLANCHE PURE 150px */
html body #flatEarthMoon,
html body .flat-earth-moon,
html body [id*="moon" i],
html body [class*="moon" i],
html body [data-astre-role="moon"],
html body .astre-lune-pure-v59 {
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
}
html body #flatEarthMoon::before, html body #flatEarthMoon::after,
html body .flat-earth-moon::before, html body .flat-earth-moon::after,
html body .astre-lune-pure-v59::before, html body .astre-lune-pure-v59::after,
html body #flatEarthMoon *, html body .flat-earth-moon *, html body .astre-lune-pure-v59 * {
  display: none !important; content: none !important; background: none !important; box-shadow: none !important; opacity: 0 !important;
}

/* 3. MASQUAGE DE MAHER AL-MUAIQLY & TRADUCTION DU BAS EN MOT-À-MOT */
html body img[src*="maher" i], html body [data-reciter*="maher" i], html body .maher-supprime-v59,
html body .wbw-masquer-traduction-bas {
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

/* 5. MODE SUIVI VERSET : BLANC PUR -> BLEU NÉON */
html body #arabicVerse, html body .arabic-glow-verse {
  direction: rtl !important; color: #ffffff !important; text-shadow: 0 0 14px rgba(255, 255, 255, 0.45), 0 0 28px rgba(255, 255, 255, 0.18) !important;
}
html body .verse-stage .arabic-glow-verse span, html body .verse-stage #arabicVerse span, html body .ar-word-follow, html body .follow-word {
  position: relative !important; background: transparent !important; border: none !important; box-shadow: none !important; color: #ffffff !important; padding: 0 7px !important; display: inline-block !important; transform-origin: 50% 85% !important; will-change: transform, opacity, filter, text-shadow, color !important; backface-visibility: hidden !important; -webkit-font-smoothing: antialiased !important; text-shadow: 0 0 14px rgba(255, 255, 255, 0.48), 0 0 28px rgba(255, 255, 255, 0.20) !important;
}

/* 6. BOUTON DE LANGUE ALLEMAND (DE DE) */
html body #btnLangDeV59 {
  cursor: pointer !important; transition: all 0.2s ease !important; display: inline-flex !important; align-items: center !important; justify-content: center !important;
}
html body #btnLangDeV59.active-de-v59 {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.28), rgba(56, 189, 248, 0.18)) !important;
  border: 1px solid #38bdf8 !important; color: #ffffff !important; border-radius: 999px !important;
}
</style>`;

function codeClientV59() {
  var modeAllemandActif = false;
  var IgnoreClicInterneFr = false;
  try {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("lang") === "de") {
      modeAllemandActif = true;
      localStorage.setItem("corantafsir_lang_de_v59", "de");
    } else if (
      localStorage.getItem("corantafsir_lang_de_v59") === "de" ||
      localStorage.getItem("corantafsir_lang_de_v58") === "de"
    ) {
      modeAllemandActif = true;
      localStorage.setItem("corantafsir_lang_de_v59", "de");
    }
  } catch (e) {}

  if (modeAllemandActif && document.documentElement) {
    document.documentElement.classList.add("lang-de-pending-v59");
    setTimeout(function () {
      document.documentElement.classList.remove("lang-de-pending-v59");
    }, 320);
  }

  var NOMS_SOURATES_COMPLETS_DE = {
    1: "Sure Al-Fātihah (Die Eröffnende)", 2: "Sure Al-Baqarah (Die Kuh)", 3: "Sure Āl 'Imrān (Die Sippe 'Imrāns)",
    4: "Sure An-Nisā' (Die Frauen)", 5: "Sure Al-Mā'idah (Der Tisch)", 6: "Sure Al-An'ām (Das Vieh)",
    7: "Sure Al-A'rāf (Die Höhen)", 8: "Sure Al-Anfāl (Die Beute)", 9: "Sure At-Tawbah (Die Reue)",
    10: "Sure Yūnus (Jonas)", 11: "Sure Hūd", 12: "Sure Yūsuf (Josef)", 13: "Sure Ar-Ra'd (Der Donner)",
    14: "Sure Ibrāhīm (Abraham)", 15: "Sure Al-Hijr", 16: "Sure An-Nahl (Die Biene)", 17: "Sure Al-Isrā' (Die Nachtreise)",
    18: "Sure Al-Kahf (Die Höhle)", 19: "Sure Maryam (Maria)", 20: "Sure Tā-Hā", 21: "Sure Al-Anbiyā' (Die Propheten)",
    22: "Sure Al-Hajj (Die Pilgerfahrt)", 23: "Sure Al-Mu'minūn (Die Gläubigen)", 24: "Sure An-Nūr (Das Licht)",
    25: "Sure Al-Furqān (Die Unterscheidung)", 26: "Sure Ash-Shu'arā' (Die Dichter)", 27: "Sure An-Naml (Die Ameisen)",
    28: "Sure Al-Qasas (Die Geschichten)", 29: "Sure Al-'Ankabūt (Die Spinne)", 30: "Sure Ar-Rūm (Die Römer)",
    31: "Sure Luqmān", 32: "Sure As-Sajdah (Die Niederwerfung)", 33: "Sure Al-Ahzāb (Die Gruppierungen)",
    34: "Sure Saba' (Saba)", 35: "Sure Fātir (Der Schöpfer)", 36: "Sure Yā-Sīn", 37: "Sure As-Sāffāt (Die Gereihten)",
    38: "Sure Sād", 39: "Sure Az-Zumar (Die Scharen)", 40: "Sure Ghāfir (Der Vergebende)", 41: "Sure Fussilat (Ausführlich dargelegt)",
    42: "Sure Ash-Shūrā (Die Beratung)", 43: "Sure Az-Zukhruf (Der Prunk)", 44: "Sure Ad-Dukhān (Der Rauch)",
    45: "Sure Al-Jāthiyah (Das Knien)", 46: "Sure Al-Ahqāf (Die Dünen)", 47: "Sure Muhammad", 48: "Sure Al-Fath (Der Sieg)",
    49: "Sure Al-Hujurāt (Die Gemächer)", 50: "Sure Qāf", 51: "Sure Adh-Dhāriyāt (Die Aufwirbelnden)",
    52: "Sure At-Tūr (Der Berg)", 53: "Sure An-Najm (Der Stern)", 54: "Sure Al-Qamar (Der Mond)",
    55: "Sure Ar-Rahmān (Der Allerbarmer)", 56: "Sure Al-Wāqi'ah (Das Ereignis)", 57: "Sure Al-Hadīd (Das Eisen)",
    58: "Sure Al-Mujādilah (Die Streitende)", 59: "Sure Al-Hashr (Die Versammlung)", 60: "Sure Al-Mumtahanah (Die Geprüfte)",
    61: "Sure As-Saff (Die Reihe)", 62: "Sure Al-Jumu'ah (Der Freitag)", 63: "Sure Al-Munāfiqūn (Die Heuchler)",
    64: "Sure At-Taghābun (Die Übervorteilung)", 65: "Sure At-Talāq (Die Scheidung)", 66: "Sure At-Tahrīm (Das Verbot)",
    67: "Sure Al-Mulk (Die Herrschaft)", 68: "Sure Al-Qalam (Das Schreibrohr)", 69: "Sure Al-Hāqqah (Die Fällige)",
    70: "Sure Al-Ma'ārij (Die Aufstiegswege)", 71: "Sure Nūh (Noah)", 72: "Sure Al-Jinn (Die Dschinn)",
    73: "Sure Al-Muzzammil (Der Eingehüllte)", 74: "Sure Al-Muddaththir (Der Bedeckte)", 75: "Sure Al-Qiyāmah (Die Auferstehung)",
    76: "Sure Al-Insān (Der Mensch)", 77: "Sure Al-Mursalāt (Die Gesandten)", 78: "Sure An-Naba' (Die Kunde)",
    79: "Sure An-Nāzi'āt (Die Entreißenden)", 80: "Sure 'Abasa (Er runzelte die Stirn)", 81: "Sure At-Takwīr (Das Umschlingen)",
    82: "Sure Al-Infitār (Das Zerbrechen)", 83: "Sure Al-Mutaffifīn (Die Betrüger)", 84: "Sure Al-Inshiqāq (Das Zerreißen)",
    85: "Sure Al-Burūj (Die Türme)", 86: "Sure At-Tāriq (Der Nachtstern)", 87: "Sure Al-A'lā (Der Höchste)",
    88: "Sure Al-Ghāshiyah (Die Überdeckende)", 89: "Sure Al-Fajr (Die Morgenröte)", 90: "Sure Al-Balad (Die Stadt)",
    91: "Sure Ash-Shams (Die Sonne)", 92: "Sure Al-Layl (Die Nacht)", 93: "Sure Ad-Duhā (Der Vormittag)",
    94: "Sure Ash-Sharh (Das Weiten)", 95: "Sure At-Tīn (Die Feige)", 96: "Sure Al-'Alaq (Das Anhängsel)",
    97: "Sure Al-Qadr (Die Bestimmung)", 98: "Sure Al-Bayyinah (Der klare Beweis)", 99: "Sure Az-Zalzalah (Das Beben)",
    100: "Sure Al-'Ādiyāt (Die Rennenden)", 101: "Sure Al-Qāri'ah (Die Pochende)", 102: "Sure At-Takāthur (Die Vermehrung)",
    103: "Sure Al-'Asr (Die Zeit)", 104: "Sure Al-Humazah (Der Stichler)", 105: "Sure Al-Fīl (Der Elefant)",
    106: "Sure Quraysh (Quraisch)", 107: "Sure Al-Mā'ūn (Die Hilfeleistung)", 108: "Sure Al-Kawthar (Die Fülle)",
    109: "Sure Al-Kāfirūn (Die Ungläubigen)", 110: "Sure An-Nasr (Die Hilfe)", 111: "Sure Al-Masad (Die Palmfasern)",
    112: "Sure Al-Ikhlās (Die Reinheit)", 113: "Sure Al-Falaq (Das Morgenrot)", 114: "Sure An-Nās (Die Menschen)"
  };

  var cacheAllemandChapitres = {};
  var requetesAllemandEnCours = {};
  var cacheTexteUnitaireDe = {};
  var requeteTexteDeEnCours = {};
  var noeudsTextesModifies = [];

  try {
    var sauvChapDe = localStorage.getItem("cache_bubenheim_chap_v58");
    if (sauvChapDe) cacheAllemandChapitres = JSON.parse(sauvChapDe);
    var sauvTxtDe = localStorage.getItem("cache_txt_unit_de_v56");
    if (sauvTxtDe) cacheTexteUnitaireDe = JSON.parse(sauvTxtDe);
  } catch (e) {}

  function restaurerTextesOriginauxDepuisAllemand() {
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
    if (textNode.__origDeV59 === undefined) {
      textNode.__origDeV59 = textNode.nodeValue;
      noeudsTextesModifies.push({ node: textNode, orig: textNode.__origDeV59 });
    }
    if (textNode.nodeValue !== nouveauTexte) {
      textNode.nodeValue = nouveauTexte;
    }
  }

  function assurerBaseLatinePourAllemand(conteneurLang, btnDe) {
    if (!conteneurLang) return;
    var bodyTxt = document.body ? document.body.innerText : "";
    var estEnArabe =
      bodyTxt.indexOf("استمع للآية") !== -1 ||
      bodyTxt.indexOf("تفسير الآية") !== -1 ||
      bodyTxt.indexOf("ما هي السورة المكية") !== -1 ||
      bodyTxt.indexOf("ترتيب النزول") !== -1;

    var btnFr = null;
    for (var i = 0; i < conteneurLang.children.length; i++) {
      var c = conteneurLang.children[i];
      var t = (c.textContent || "").replace(/\s+/g, "").toUpperCase();
      if (t.indexOf("FR") !== -1) {
        btnFr = c;
        break;
      }
    }
    if (estEnArabe && btnFr) {
      IgnoreClicInterneFr = true;
      btnFr.click();
      IgnoreClicInterneFr = false;
    }
    for (var f = 0; f < conteneurLang.children.length; f++) {
      if (conteneurLang.children[f] !== btnDe) {
        conteneurLang.children[f].classList.remove("active");
      }
    }
    btnDe.classList.add("active-de-v59");
  }

  function assurerBoutonAllemandDansBarre() {
    var oldBtns = document.querySelectorAll("[id^='btnLangTrV'], #btnLangDeV54, #btnLangDeV55, #btnLangDeV56, #btnLangDeV57, #btnLangDeV58");
    for (var b = 0; b < oldBtns.length; b++) {
      if (oldBtns[b].parentNode) oldBtns[b].parentNode.removeChild(oldBtns[b]);
    }

    var existant = document.getElementById("btnLangDeV59");
    if (existant) {
      if (modeAllemandActif) {
        existant.classList.add("active-de-v59");
        if (existant.parentElement) {
          for (var k = 0; k < existant.parentElement.children.length; k++) {
            if (existant.parentElement.children[k] !== existant) {
              existant.parentElement.children[k].classList.remove("active");
            }
          }
        }
      } else {
        existant.classList.remove("active-de-v59");
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
      conteneurLang.style.setProperty("overflow", "visible", "important");
      var modeleBtn = btnFrFr || btnSaAr;
      var btnDe = modeleBtn.cloneNode(true);
      btnDe.id = "btnLangDeV59";
      btnDe.classList.remove("active");
      btnDe.removeAttribute("onclick");
      btnDe.removeAttribute("data-lang");

      if (btnDe.children && btnDe.children.length >= 2) {
        btnDe.children[0].textContent = "DE";
        btnDe.children[btnDe.children.length - 1].textContent = "DE";
      } else {
        btnDe.innerHTML = '<span style="font-size:0.72em;opacity:0.75;margin-right:2px;">DE</span><span>DE</span>';
      }

      if (modeAllemandActif) btnDe.classList.add("active-de-v59");

      btnDe.addEventListener("click", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        modeAllemandActif = true;
        try { localStorage.setItem("corantafsir_lang_de_v59", "de"); } catch (e) {}
        assurerBaseLatinePourAllemand(conteneurLang, btnDe);
        dernierVersetSeo = "";
        synchroniserTout();
      });

      var freresInit = conteneurLang.children;
      for (var a = 0; a < freresInit.length; a++) {
        (function (autre) {
          if (autre === btnDe) return;
          autre.addEventListener("click", function () {
            if (IgnoreClicInterneFr) return;
            modeAllemandActif = false;
            try { localStorage.setItem("corantafsir_lang_de_v59", "other"); } catch (e) {}
            btnDe.classList.remove("active-de-v59");
            restaurerTextesOriginauxDepuisAllemand();
            dernierVersetSeo = "";
            setTimeout(synchroniserTout, 20);
          });
        })(freresInit[a]);
      }

      conteneurLang.appendChild(btnDe);
      if (modeAllemandActif) {
        assurerBaseLatinePourAllemand(conteneurLang, btnDe);
      }
    }
  }

  function chargerChapitreAllemandBubenheim(chap) {
    if (!chap) return;
    var cle = "chap_" + chap;
    if (cacheAllemandChapitres[cle] || requetesAllemandEnCours[cle]) return;
    requetesAllemandEnCours[cle] = true;
    cacheAllemandChapitres[cle] = {};

    var urlBubenheim = "https://api.quran.com/api/v4/quran/translations/27?chapter_number=" + chap;
    fetch(urlBubenheim)
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.translations && d.translations.length > 0) {
          for (var j = 0; j < d.translations.length; j++) {
            var vk = chap + ":" + (j + 1);
            var cleanDe = (d.translations[j].text || "").replace(/<[^>]+>/g, "").trim();
            cacheAllemandChapitres[cle][vk] = cleanDe;
          }
          try { localStorage.setItem("cache_bubenheim_chap_v58", JSON.stringify(cacheAllemandChapitres)); } catch (e) {}
          if (modeAllemandActif) appliquerInterfaceEtContenuAllemand();
        }
      })
      .catch(function () {})
      .finally(function () {
        requetesAllemandEnCours[cle] = false;
      });
  }

  function traduireNoeudVersAllemandAsync(textNode, origTxt) {
    if (!origTxt || origTxt.length < 4) return;
    var cle = origTxt.slice(0, 140) + "_" + origTxt.length;
    var esp1 = (textNode.__origDeV59 || textNode.nodeValue).match(/^\s*/)[0];
    var esp2 = (textNode.__origDeV59 || textNode.nodeValue).match(/\s*$/)[0];

    if (cacheTexteUnitaireDe[cle]) {
      modifierNoeudTexteSeul(textNode, esp1 + cacheTexteUnitaireDe[cle] + esp2);
      return;
    }

    var pEl = textNode.parentElement;
    if (pEl && !requeteTexteDeEnCours[cle]) {
      pEl.style.transition = "opacity 0.12s ease";
      pEl.style.opacity = "0.02";
    }

    if (requeteTexteDeEnCours[cle]) return;
    requeteTexteDeEnCours[cle] = true;

    var urlGtx = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=de&dt=t&q=" + encodeURIComponent(origTxt);
    fetch(urlGtx)
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res && res[0]) {
          var tr = "";
          for (var s = 0; s < res[0].length; s++) {
            if (res[0][s][0]) tr += res[0][s][0];
          }
          tr = tr.trim();
          if (tr) {
            cacheTexteUnitaireDe[cle] = tr;
            try { localStorage.setItem("cache_txt_unit_de_v56", JSON.stringify(cacheTexteUnitaireDe)); } catch (e) {}
            if (modeAllemandActif) {
              modifierNoeudTexteSeul(textNode, esp1 + tr + esp2);
            }
          }
        }
      })
      .catch(function () {})
      .finally(function () {
        requeteTexteDeEnCours[cle] = false;
        if (pEl) pEl.style.opacity = "1";
      });
  }

  function appliquerInterfaceEtContenuAllemand() {
    if (!modeAllemandActif || !document.body) return;

    var btnDe = document.getElementById("btnLangDeV59");
    if (btnDe && btnDe.parentElement) {
      assurerBaseLatinePourAllemand(btnDe.parentElement, btnDe);
    }

    var vk = obtenirCleVerset();
    var parts = vk ? vk.split(":") : [];
    var numS = parts.length === 2 ? Number(parts[0]) : 0;
    var numV = parts.length === 2 ? Number(parts[1]) : 0;

    if (numS && !cacheAllemandChapitres["chap_" + numS]) {
      chargerChapitreAllemandBubenheim(numS);
    }
    var texteBubenheim = (numS && cacheAllemandChapitres["chap_" + numS]) ? cacheAllemandChapitres["chap_" + numS][vk] : null;

    var DICO_UI_EXACT_INSENSIBLE = {
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
      "↺ rejouer": "↺ Wiederholen",
      "↺ replay": "↺ Wiederholen",
      "tafsīr & explication du verset": "TAFSĪR & ERKLÄRUNG DES VERSES",
      "tafsīr & verse explanation": "TAFSĪR & ERKLÄRUNG DES VERSES",
      "tafsīr y explicación de la aleya": "TAFSĪR & ERKLÄRUNG DES VERSES",
      "madd (prolongation)": "Madd (Dehnung)",
      "lettre muette": "Stummer Buchstabe",
      "silent letter": "Stummer Buchstabe",
      "⭐ développer l'explication complète, le hadīth & les preuves historiques": "⭐ Vollständige Erklärung, Hadīth & historische Beweise ausklappen",
      "le noble coran & tafsīr al-mukhtasar": "Der Edle Koran & Tafsīr Al-Mukhtasar",
      "the noble quran & tafsīr al-mukhtasar": "Der Edle Koran & Tafsīr Al-Mukhtasar",
      "el noble corán y tafsīr al-mukhtasar": "Der Edle Koran & Tafsīr Al-Mukhtasar",
      "القرآن الكريم والتفسير المختصر": "Der Edle Koran & Tafsīr Al-Mukhtasar",
      "📲 installer le site en app sur votre téléphone (iphone / android)": "📲 Website als App auf Ihrem Telefon installieren (iPhone / Android)",
      "📲 install the site as an app on your phone (iphone / android)": "📲 Website als App auf Ihrem Telefon installieren (iPhone / Android)",
      "qu'est-ce qu'une sourate mecquoise ?": "Was ist eine mekkanische Sure?",
      "what is a makkan surah?": "Was ist eine mekkanische Sure?",
      "qu'est-ce qu'une sourate médinoise ?": "Was ist eine medinensische Sure?",
      "what is a madinan surah?": "Was ist eine medinensische Sure?",
      "mecquoise • 86 sourates": "Mekkanisch • 86 Suren",
      "makkan • 86 surahs": "Mekkanisch • 86 Suren",
      "médinoise • 28 sourates": "Medinensisch • 28 Suren",
      "madinan • 28 surahs": "Medinensisch • 28 Suren",
      "1. ordre de révélation (1 à 114)": "1. Offenbarungsreihenfolge (1 bis 114)",
      "1. revelation order (1 to 114)": "1. Offenbarungsreihenfolge (1 bis 114)",
      "2. ordre du mushaf (1 à 114)": "2. Mushaf-Reihenfolge (1 bis 114)",
      "2. mushaf order (1 to 114)": "2. Mushaf-Reihenfolge (1 bis 114)",
      "⭐ 3. versets des miracles scientifiques": "⭐ 3. Verse der wissenschaftlichen Wunder",
      "⭐ 3. scientific miracles verses": "⭐ 3. Verse der wissenschaftlichen Wunder",
      "mecquoise": "Mekkanisch",
      "makkan": "Mekkanisch",
      "médinoise": "Medinensisch",
      "madinan": "Medinensisch"
    };

    var inputs = document.querySelectorAll("input[type='text'], input[type='search'], input:not([type])");
    for (var inp = 0; inp < inputs.length; inp++) {
      inputs[inp].setAttribute("placeholder", "Suche nach einer Sure oder einem Vers (z.B. 2:255, 30:1, Al-Kahf...)");
    }

    var conteneurArabe = document.querySelector("#arabicVerse, .arabic-glow-verse");
    var rectArabe = conteneurArabe ? conteneurArabe.getBoundingClientRect() : null;
    var versetHautDejaRemplace = false;

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var pEl = node.parentElement;
      if (!pEl) continue;
      var tag = pEl.tagName;
      if (tag === "SCRIPT" || tag === "STYLE") continue;
      if (pEl.closest(".wbw-card-unit") || pEl.id === "wbwSensLectureBanner") continue;

      var val = (node.__origDeV59 !== undefined ? node.__origDeV59 : node.nodeValue || "").replace(/\u00A0/g, " ").trim();
      if (!val || /[\u0600-\u06FF]/.test(val)) continue;
      var valLower = val.toLowerCase();

      if (DICO_UI_EXACT_INSENSIBLE[valLower]) {
        modifierNoeudTexteSeul(node, DICO_UI_EXACT_INSENSIBLE[valLower]);
        continue;
      }

      if (/(?:Verset|Verse|Aleya)\s+\d+\s*\/\s*\d+/i.test(val)) {
        modifierNoeudTexteSeul(node, val.replace(/Verset|Verse|Aleya/gi, "Vers").replace(/Miracle/gi, "Wunder"));
        continue;
      }

      if (/Miracle\s*[:\(]\s*V\.?\s*\d+/i.test(val)) {
        modifierNoeudTexteSeul(node, val.replace(/Miracle/gi, "Wunder").replace(/V\./i, "Vers "));
        continue;
      }

      if (/^\d+\s+(?:versets|verses|aleyas)$/i.test(val)) {
        modifierNoeudTexteSeul(node, val.replace(/versets|verses|aleyas/i, "Verse"));
        continue;
      }
      if (val.indexOf("Reprendre") !== -1 || val.indexOf("Resume") !== -1) {
        modifierNoeudTexteSeul(node, val.replace(/Reprendre\s*:|Resume\s*:/i, "Fortsetzen:").replace(/Verset|Verse/i, "Vers"));
        continue;
      }

      if ((val.indexOf("Sourate ") === 0 || val.indexOf("Surah ") === 0 || val.indexOf("Sure ") === 0) && (val.indexOf(" — Verset ") !== -1 || val.indexOf(" — Verse ") !== -1 || val.indexOf(" — Vers ") !== -1)) {
        if (numS && NOMS_SOURATES_COMPLETS_DE[numS]) {
          modifierNoeudTexteSeul(node, NOMS_SOURATES_COMPLETS_DE[numS] + " — Vers " + numV);
        } else {
          modifierNoeudTexteSeul(node, val.replace(/^Sourate |^Surah /, "Sure ").replace(/ — Verset | — Verse /, " — Vers "));
        }
        continue;
      }

      if (/^\d+e\s+Sourate\s+r[eé]v[eé]l[eé]e\s+\(n°\d+\)$/i.test(val)) {
        modifierNoeudTexteSeul(node, val.replace(/e\s+Sourate\s+r[eé]v[eé]l[eé]e/i, ". offenbarte Sure").replace("n°", "Nr. "));
        continue;
      }

      var rectP = pEl.getBoundingClientRect();
      if (
        !versetHautDejaRemplace &&
        numV &&
        rectArabe &&
        rectP.top >= rectArabe.top &&
        rectP.top <= rectArabe.bottom + 180 &&
        new RegExp("^" + numV + "\\s*[\\.-]\\s+").test(val)
      ) {
        versetHautDejaRemplace = true;
        if (texteBubenheim) {
          modifierNoeudTexteSeul(node, numV + ". " + texteBubenheim);
          pEl.style.opacity = "1";
        } else {
          traduireNoeudVersAllemandAsync(node, val);
        }
        continue;
      }

      var estSurAccueil = !rectArabe;
      var estSousVerset = rectArabe && rectP.top > rectArabe.bottom + 80;
      if ((estSurAccueil || estSousVerset) && val.length >= 18) {
        if (
          val.indexOf("Traduction originale") === -1 &&
          val.indexOf("Deutsche Übersetzung") === -1 &&
          val.indexOf("Translation by Saheeh") === -1 &&
          val.indexOf("TAFSĪR") === -1
        ) {
          traduireNoeudVersAllemandAsync(node, val);
        }
      }
    }

    if (document.documentElement) {
      document.documentElement.classList.remove("lang-de-pending-v59");
    }
  }

  // ==========================================================================
  // 2. BOUTON "✨ SUIVI" (✨ VERFOLGUNG)
  // ==========================================================================
  var suiviEstActif = true;

  function assurerBoutonSuiviVisible() {
    if (!obtenirCleVerset()) return;
    var tousBtns = document.querySelectorAll("button, .btn, span[role='button']");
    var btnSuivi = null;
    var btnTajwid = null;
    for (var i = 0; i < tousBtns.length; i++) {
      var b = tousBtns[i];
      var t = (b.textContent || "").trim();
      if (t.indexOf("Suivi") !== -1 || t.indexOf("Follow") !== -1 || t.indexOf("Seguimiento") !== -1 || t.indexOf("Verfolgung") !== -1 || t.indexOf("تتبع") !== -1) {
        btnSuivi = b;
      } else if (t.indexOf("Tajw") !== -1 || t.indexOf("تجويد") !== -1) {
        btnTajwid = b;
      }
    }

    var labelSuivi = modeAllemandActif ? "✨ Verfolgung" : "✨ Suivi";

    if (btnSuivi) {
      btnSuivi.style.setProperty("display", "inline-flex", "important");
      btnSuivi.style.setProperty("visibility", "visible", "important");
      btnSuivi.style.setProperty("opacity", "1", "important");
      if (btnSuivi.id === "btnSuiviUniverselV59" && btnSuivi.textContent !== labelSuivi) {
        btnSuivi.textContent = labelSuivi;
      }
      if (suiviEstActif) {
        btnSuivi.style.setProperty("background", "linear-gradient(135deg, #0ea5e9, #38bdf8)", "important");
        btnSuivi.style.setProperty("color", "#ffffff", "important");
      } else {
        btnSuivi.style.removeProperty("background");
      }
    } else if (btnTajwid && btnTajwid.parentElement && !document.getElementById("btnSuiviUniverselV59")) {
      var nv = document.createElement("button");
      nv.id = "btnSuiviUniverselV59";
      nv.type = "button";
      nv.className = btnTajwid.className;
      nv.textContent = labelSuivi;
      nv.style.setProperty("background", "linear-gradient(135deg, #0ea5e9, #38bdf8)", "important");
      nv.style.setProperty("color", "#ffffff", "important");
      nv.style.setProperty("margin-left", "6px", "important");
      btnTajwid.parentElement.insertBefore(nv, btnTajwid.nextSibling);
    }
  }

  // 3. SOLEIL ET LUNE EN ORBITE
  function reparerSoleilEtLuneEnOrbite() {
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
        node.classList.remove("astre-lune-pure-v59");
        node.classList.add("astre-soleil-pur-v59");
        node.style.setProperty("width", "150px", "important");
        node.style.setProperty("height", "150px", "important");
        node.style.setProperty("border-radius", "50%", "important");
        node.style.setProperty("background", "radial-gradient(circle at 50% 50%, #ffffff 0%, #fffef0 26%, #fef08a 52%, #facc15 76%, #f59e0b 94%, rgba(245, 158, 11, 0) 100%)", "important");
        node.style.setProperty("background-color", "#fde047", "important");
        node.style.setProperty("box-shadow", "0 0 50px 16px rgba(253, 224, 71, 0.72), 0 0 110px 38px rgba(245, 158, 11, 0.42)", "important");
        node.style.setProperty("filter", "none", "important");
      } else {
        node.classList.remove("astre-soleil-pur-v59");
        node.classList.add("astre-lune-pure-v59");
        node.style.setProperty("width", "150px", "important");
        node.style.setProperty("height", "150px", "important");
        node.style.setProperty("border-radius", "50%", "important");
        node.style.setProperty("background", "radial-gradient(circle at 50% 50%, #ffffff 0%, #f8fafc 38%, #e2e8f0 70%, rgba(186, 230, 253, 0) 100%)", "important");
        node.style.setProperty("background-color", "#ffffff", "important");
        node.style.setProperty("box-shadow", "0 0 45px 15px rgba(255, 255, 255, 0.65), 0 0 95px 35px rgba(148, 163, 184, 0.35)", "important");
        node.style.setProperty("filter", "none", "important");
      }
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
          row.classList.add("maher-supprime-v59");
          if (row.parentNode) row.parentNode.removeChild(row);
        }
      }
    }
  }

  function obtenirLangueActive() {
    if (modeAllemandActif) return "de";
    var bodyTxt = document.body ? document.body.innerText : "";
    if (bodyTxt.indexOf("Escuchar aleya") !== -1 || bodyTxt.indexOf("EXPLICACIÓN DE LA ALEYA") !== -1) return "es";
    if (bodyTxt.indexOf("Listen to verse") !== -1 || bodyTxt.indexOf("VERSE EXPLANATION") !== -1) return "en";
    if (bodyTxt.indexOf("استمع للآية") !== -1 || bodyTxt.indexOf("تفسير الآية") !== -1) return "ar";
    return "fr";
  }

  function mettreAJourMentionsTraducteurEtExegese() {
    var lang = obtenirLangueActive();
    var textesBas = {
      fr: "Traduction originale de Muhammad Hamidullah (1977) • Exégèse (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      en: "Translation by Saheeh International • Exegesis (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      es: "Traducción de Abdel Ghani Melara Navio • Exégesis (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      de: "Deutsche Übersetzung von Frank Bubenheim & Nadeem Elyas • Exegese (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      ar: "النص القرآني بالرسم العثماني • التفسير المختصر وتفسير ابن كثير وأسباب النزول"
    };
    var textesHaut = {
      fr: "Traduction Muhammad Hamidullah (1977) & Exégèse",
      en: "Saheeh International & Exegesis",
      es: "Traducción Abdel Ghani Melara Navio & Exégesis",
      de: "Übersetzung Bubenheim & Elyas & Exegese (Tafsīr)",
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
        txt.indexOf("Deutsche Übersetzung von Frank Bubenheim") !== -1 ||
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
        txt.indexOf("Übersetzung Bubenheim & Elyas") !== -1 ||
        txt.indexOf("التفسير المختصر وتفسير ابن كثير") !== -1
      ) {
        var parts = txt.split("•");
        if (parts.length >= 2) {
          var lieu = parts[0].trim();
          if (lang === "de") {
            lieu = lieu.replace(/Sourate Médinoise \(Médine\)|Madinan Surah \(Madinah\)/i, "Medinensische Sure (Medina)")
                       .replace(/Sourate Mecquoise \(La Mecque\)|Makkan Surah \(Makkah\)/i, "Mekkanische Sure (Mekka)");
          }
          var nv = lieu + " • " + textesHaut[lang];
          if (el.textContent !== nv) el.textContent = nv;
        }
      }
    }
  }

  // 4. MOT-À-MOT EN ORDRE AUDIO STRICT + COMPATIBILITÉ TAJWID + ALLEMAND (DE)
  var DICO_MULTILINGUE = {
    fr: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn", "طه": "Tā-Hā", "طسم": "Tā-Sīn-Mīm", "حم": "Hā-Mīm", "كهيعص": "Kāf-Hā-Yā-‘Ayn-Sād",
      "ذلك": "Ce (C'est)", "الكتاب": "le Livre", "لا": "ne...pas / point de", "ريب": "doute", "فيه": "en lui", "هدى": "un guide", "للمتقين": "pour les pieux",
      "الذين": "ceux qui", "يؤمنون": "croient", "بالغيب": "à l'Inconnaissable", "ويقيمون": "et accomplissent", "الصلاة": "la Salāt (prière)", "الصلوة": "la Salāt (prière)", "ومما": "et de ce que", "رزقناهم": "Nous leur avons attribué", "ينفقون": "dépensent",
      "والذين": "et ceux qui", "بما": "à ce qui", "أنزل": "a été descendu", "إليك": "vers toi", "وما": "et ce qu'", "قبلك": "avant toi", "وبالآخرة": "et en l'Au-delà", "وبالأخرة": "et en l'Au-delà", "هم": "ils / eux", "يوقنون": "ont la certitude",
      "أولئك": "Ceux-là", "على": "sur", "ربهم": "leur Seigneur", "وأولئك": "et ceux-là", "المفلحون": "les gagnants",
      "إن": "Certes", "كفروا": "ont mécru", "سواء": "il est égal", "عليهم": "pour eux", "أأنذرتهم": "que tu les avertisses", "ءأنذرتهم": "que tu les avertisses", "أم": "ou que", "لم": "ne...pas", "تنذرهم": "tu les avertisses",
      "ختم": "a scellé", "الله": "Allāh", "قلوبهم": "leurs cœurs", "وعلى": "et sur", "سمعهم": "leur ouïe", "وأبصارهم": "et sur leurs regards", "أبصارهم": "leurs regards", "غشاوة": "un voile", "غشوة": "un voile", "ولهم": "et pour eux", "عذاب": "un châtiment", "عظيم": "immense",
      "ومن": "Et parmi", "الناس": "les gens", "يقول": "dit (disent)", "آمنا": "Nous croyons", "ءامنا": "Nous croyons", "بالله": "en Allāh", "وباليوم": "et au Jour", "الآخر": "dernier", "بمؤمنين": "croyants",
      "في": "Dans / sur", "مرض": "une maladie", "فزادهم": "alors leur a accru", "مرضا": "en maladie", "أليم": "douloureux", "كانوا": "ils étaient", "يكذبون": "à mentir",
      "والقلم": "Par la plume", "يسطرون": "ils écrivent !", "ما": "Tu n'es pas", "أنت": "toi", "بنعمة": "par la grâce de", "ربك": "ton Seigneur", "بمجنون": "un possédé",
      "بأيكم": "lequel d'entre vous", "المفتون": "a perdu la raison (l'insensé)",
      "تبت": "Que périssent", "يدا": "les deux mains", "أبي": "d'Abū", "لهب": "Lahab", "وتب": "et qu'il périsse !"
    },
    de: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn", "طه": "Tā-Hā",
      "ذلك": "Dieses (Das ist)", "الكتاب": "das Buch", "لا": "kein / nicht", "ريب": "Zweifel", "فيه": "darin", "هدى": "eine Rechtleitung", "للمتقين": "für die Gottesfürchtigen",
      "الذين": "diejenigen, die", "يؤمنون": "glauben", "بالغيب": "an das Verborgene", "ويقيمون": "und verrichten", "الصلاة": "das Gebet", "الصلوة": "das Gebet", "ومما": "und von dem, was", "رزقناهم": "Wir sie versorgt haben", "ينفقون": "ausgeben",
      "ختم": "Versiegelt hat", "الله": "Allāh", "على": "auf", "قلوبهم": "ihre Herzen", "وعلى": "und auf", "سمعهم": "ihr Gehör", "وأبصارهم": "und ihre Blicke", "أبصارهم": "ihre Blicke (Augen)", "غشاوة": "eine Hülle (Schleier)", "غشوة": "eine Hülle (Schleier)", "ولهم": "und für sie gibt es", "عذاب": "eine Strafe", "عظيم": "gewaltige",
      "ومن": "Und unter", "الناس": "den Menschen", "يقول": "sagt", "آمنا": "Wir glauben", "ءامنا": "Wir glauben", "بالله": "an Allāh", "وباليوم": "und an den Tag", "الآخر": "Jüngsten", "وما": "und was / aber nicht", "هم": "sie (sind)", "بمؤمنين": "Gläubige",
      "والقلم": "Beim Schreibrohr", "يسطرون": "sie niederschreiben!", "ما": "Nicht (bist)", "أنت": "du", "بنعمة": "durch die Gunst", "ربك": "deines Herrn", "بمجنون": "ein Besessener",
      "بأيكم": "wer von euch", "المفتون": "der Verrückte (Verführte) ist",
      "تبت": "Zugrunde gehen sollen", "يدا": "die beiden Hände", "أبي": "Abū", "لهب": "Lahabs", "وتب": "und zugrunde ging er!"
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
    var sauv = localStorage.getItem("cache_wbw_exact_v58");
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
      if (lang === "de") return aKasra ? "von / vor" : "wer (jemand, der)";
      if (lang === "es") return aKasra ? "de / antes" : "quien";
    }

    var dico = DICO_MULTILINGUE[lang];
    if (!dico) return "";
    for (var k in dico) {
      if (normaliserArabeCle(k) === cle) return dico[k];
    }
    return "";
  }

  function obtenirCleVerset() {
    var m = document.body ? document.body.innerText.match(/\b(\d{1,3})\s*:\s*(\d{1,3})\b/) : null;
    if (m) return m[1] + ":" + m[2];
    var urlFull = window.location.pathname.match(/sourate-(\d+)-verset-(\d+)/i);
    if (urlFull) return urlFull[1] + ":" + urlFull[2];
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
            var enTxt = w.translation && w.translation.text ? w.translation.text : "";
            motsQdc.push({ ar: arTxt, en: enTxt, tr: enTxt });
          }
        }

        if (lang === "en" || lang === "ar") {
          cacheVersetMotsExact[cleCache] = motsQdc;
          appliquerVraiMotAMotSurDOM();
          return;
        }

        var aTraduireIdx = [];
        var aTraduireTextes = [];
        for (var j = 0; j < motsQdc.length; j++) {
          var cert = chercherDansDicoCertifie(motsQdc[j].ar, lang);
          if (cert) {
            motsQdc[j].tr = cert;
          } else {
            var propreEn = motsQdc[j].en.replace(/[\(\)\[\]]/g, "").trim();
            aTraduireIdx.push(j);
            aTraduireTextes.push(propreEn || motsQdc[j].ar);
          }
        }

        if (aTraduireTextes.length === 0) {
          cacheVersetMotsExact[cleCache] = motsQdc;
          try { localStorage.setItem("cache_wbw_exact_v58", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
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
            try { localStorage.setItem("cache_wbw_exact_v58", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
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

      if ((lang === "fr" || lang === "de") && cleCarteAr === "وما") {
        if (i + 1 < cartes.length && cartes[i + 1].children.length) {
          var suivAr = normaliserArabeCle(cartes[i + 1].children[0].textContent || "");
          if (suivAr === "هم" || suivAr === "يخدعون" || suivAr === "يشعرون" || suivAr === "يعلمون" || suivAr === "كانوا") {
            tradFinale = lang === "de" ? "und sie (sind) nicht" : "et ils ne";
          } else {
            tradFinale = lang === "de" ? "und was" : "et ce qu'";
          }
        } else {
          tradFinale = lang === "de" ? "und was" : "et ce qu'";
        }
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
        ar: "⬅️ ترتيب القراءة: من اليمين إلى اليسار (1 ➔ " + totalW + ")"
      };
      var textesLtr = {
        fr: "➡️ Sens de lecture : de gauche à droite (1 ➔ " + totalW + ") • Cliquer pour inverser",
        en: "➡️ Reading order: Left to Right (1 ➔ " + totalW + ") • Click to reverse",
        es: "➡️ Orden de lectura: de izquierda a derecha (1 ➔ " + totalW + ") • Clic para invertir",
        de: "➡️ Leserichtung: von links nach rechts (1 ➔ " + totalW + ") • Klicken zum Umkehren",
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
        if (txt.indexOf("TAFSĪR") === -1 && txt.indexOf("ERKLÄRUNG") === -1 && txt.indexOf("EXPLICATION") === -1 && txt.indexOf("Ghunnah") === -1) {
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

    var languesSeo = ["fr", "en", "es", "ar", "de"];
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

  // ==========================================================================
  // 6. ANIMATION MODE SUIVI 100% INFAILLIBLE (BLANC PUR -> BLEU NÉON)
  // ==========================================================================
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
      if (s.options && s.selectedIndex >= 0) {
        var txt = ((s.value || "") + " " + (s.options[s.selectedIndex].textContent || "")).toLowerCase();
        if (txt.indexOf("verset") === -1 && txt.indexOf("verse") === -1 && txt.indexOf("aleya") === -1 && txt.indexOf("vers ") === -1) {
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
    var spans = conteneur.querySelectorAll("span");
    if (spans.length > 1) return { type: "spans", items: spans };

    var texte = (conteneur.textContent || "").trim();
    if (!texte) return { type: "spans", items: [] };
    var bruts = texte.split(/\s+/).filter(Boolean);
    var motsPropres = [];
    for (var i = 0; i < bruts.length; i++) {
      var w = bruts[i];
      if (w.replace(/[\u06D6-\u06ED\u064B-\u065F\u0670]/g, "").length === 0 && motsPropres.length > 0) {
        motsPropres[motsPropres.length - 1] += " " + w;
      } else {
        motsPropres.push(w);
      }
    }
    if (motsPropres.length <= 1) return { type: "spans", items: spans };
    conteneur.innerHTML = motsPropres.map(function (m, idx) {
      return '<span class="ar-word-follow" data-widx="' + idx + '">' + m + "</span>";
    }).join(" ");
    return { type: "spans", items: conteneur.querySelectorAll("span") };
  }

  function reinitialiserMotsEnBlancPur() {
    energiesMots = [];
    bleusMots = [];
    var cibleObj = obtenirElementsMotsAAnimer();
    var items = cibleObj.items;
    var estCartes = cibleObj.type === "cartes";
    for (var i = 0; i < items.length; i++) {
      var el = items[i];
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("transform", "translate3d(0, 0px, 0) scale(1)", "important");
      el.style.setProperty("filter", "none", "important");
      if (estCartes) {
        el.style.setProperty("border-color", "rgba(255, 255, 255, 0.18)", "important");
        el.style.setProperty("box-shadow", "none", "important");
      } else {
        el.style.setProperty("color", "#ffffff", "important");
        el.style.setProperty("text-shadow", "0 0 14px rgba(255, 255, 255, 0.48), 0 0 28px rgba(255, 255, 255, 0.20)", "important");
      }
    }
  }

  function lancerBoucleSuivi() {
    if (!rafId) {
      rafId = requestAnimationFrame(etapeSuiviAudioAfterEffects);
    }
  }

  if (typeof HTMLMediaElement !== "undefined" && HTMLMediaElement.prototype && !HTMLMediaElement.prototype.__hookedV59) {
    var origPlay = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      var self = this;
      window.__lecteurAudioActuel = self;
      if (self.currentTime < 0.25) {
        reinitialiserMotsEnBlancPur();
      }
      if (!self.__listenersV59) {
        self.__listenersV59 = true;
        self.addEventListener("playing", lancerBoucleSuivi);
        self.addEventListener("timeupdate", lancerBoucleSuivi);
      }
      var cleRec = obtenirCleRecitateurSelectionne();
      var vk = obtenirCleVerset();
      if (cleRec && vk) chargerTimestampsQdc(cleRec, vk);
      lancerBoucleSuivi();
      return origPlay.apply(self, arguments);
    };
    HTMLMediaElement.prototype.__hookedV59 = true;
  }

  // NE PLUS EXIGER currentTime > 0 POUR ÉVITER DE COUPER LA BOUCLE AU LANCEMENT !
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
          el.style.setProperty("opacity", "1", "important");
          el.style.setProperty("transform", "translate3d(0, " + yPx + "px, 0) scale(" + (1.0 + 0.08 * e).toFixed(3) + ")", "important");
          if (b > 0.02) {
            el.style.setProperty("border-color", "rgba(56, 189, 248, " + (0.45 * b + 0.55 * e).toFixed(2) + ")", "important");
            el.style.setProperty("box-shadow", "0 " + (6 * b + 6 * e).toFixed(1) + "px " + (18 * b + 14 * e).toFixed(1) + "px rgba(56, 189, 248, " + (0.35 * b + 0.35 * e).toFixed(2) + "), inset 0 0 " + (12 * b).toFixed(1) + "px rgba(56, 189, 248, " + (0.18 * b).toFixed(2) + ")", "important");
          } else {
            el.style.setProperty("border-color", "rgba(255, 255, 255, 0.18)", "important");
            el.style.setProperty("box-shadow", "none", "important");
          }
        } else {
          el.style.setProperty("background", "transparent", "important");
          el.style.setProperty("border", "none", "important");
          el.style.setProperty("opacity", "1", "important");
          el.style.setProperty("filter", "none", "important");
          el.style.setProperty("transform", "translate3d(0, " + yPx + "px, 0) scale(" + sc + ")", "important");

          if (b < 0.03) {
            el.style.setProperty("color", "#ffffff", "important");
            el.style.setProperty("text-shadow", "0 0 14px rgba(255, 255, 255, 0.48), 0 0 28px rgba(255, 255, 255, 0.20)", "important");
          } else {
            el.style.setProperty("color", "#f0f9ff", "important");
            var alphaBleu1 = (0.85 * b + 0.15 * e).toFixed(2);
            var alphaBleu2 = (0.65 * b + 0.30 * e).toFixed(2);
            var rayon1 = (14 + 8 * e).toFixed(1);
            var rayon2 = (28 + 16 * e).toFixed(1);
            el.style.setProperty(
              "text-shadow",
              "0 0 8px rgba(255, 255, 255, 0.90), 0 0 " + rayon1 + "px rgba(56, 189, 248, " + alphaBleu1 + "), 0 0 " + rayon2 + "px rgba(14, 165, 233, " + alphaBleu2 + ")",
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
      assurerBoutonAllemandDansBarre();
      assurerBoutonSuiviVisible();
      reparerSoleilEtLuneEnOrbite();
      retirerRecitateurMaher();
      if (modeAllemandActif) appliquerInterfaceEtContenuAllemand();
      mettreAJourMentionsTraducteurEtExegese();
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

  var obs = new MutationObserver(function () {
    if (modeAllemandActif && !enCoursDeSync) {
      synchroniserTout();
    }
  });

  window.addEventListener("DOMContentLoaded", function () {
    synchroniserTout();
    reinitialiserMotsEnBlancPur();
    if (document.body) {
      obs.observe(document.body, { childList: true, subtree: true });
    }
  });

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("button, .btn, span, a, div");
    if (btn) {
      var t = (btn.textContent || "").trim();
      if (t === "A+" || t === "A +") {
        wbwScale = Math.min(2.5, +(wbwScale + 0.16).toFixed(2));
      } else if (t === "A-" || t === "A -" || t === "A−") {
        wbwScale = Math.max(0.68, +(wbwScale - 0.16).toFixed(2));
      } else if (t.indexOf("Rejouer") !== -1 || t.indexOf("Replay") !== -1 || t.indexOf("Repetir") !== -1 || t.indexOf("Wiederholen") !== -1) {
        reinitialiserMotsEnBlancPur();
      } else if (t.indexOf("Suivi") !== -1 || t.indexOf("Follow") !== -1 || t.indexOf("Seguimiento") !== -1 || t.indexOf("Verfolgung") !== -1 || t.indexOf("تتبع") !== -1) {
        suiviEstActif = !suiviEstActif;
        lancerBoucleSuivi();
      }
    }
    setTimeout(synchroniserTout, 15);
    setTimeout(synchroniserTout, 80);
  });

  // RELANCEUR PERMANENT DU SUIVI AUDIO TOUTES LES 200ms
  setInterval(function () {
    synchroniserTout();
    var aud = trouverAudioActif();
    if (aud && !aud.paused && !rafId) {
      lancerBoucleSuivi();
    }
  }, 200);

  synchroniserTout();
}

const blocCompletV59 = preconnectTags + '\n' + cssV59 + '\n<script id="script-master-v59">(' + codeClientV59.toString() + ')();</script>';
const blocEchappePourGenerateur = blocCompletV59.replace(/\\/g, '\\\\');

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
    htmlIdx = htmlIdx.replace(/<\/head>/i, () => blocCompletV59 + '\n</head>');
    fs.writeFileSync(fIdx, htmlIdx, 'utf8');
  }
}

console.log('✅ Correctif V59 activé : Mode ✨ Suivi 100% réparé (Blanc -> Bleu néon sur tous les versets) + Allemand DE !');
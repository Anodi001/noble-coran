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
<link rel="preconnect" href="https://quranenc.com" crossorigin>`;

const cssV53 = `<style id="patch-master-v53">
:root {
  --wbw-ar-size: 2.15rem;
  --wbw-tr-size: 0.92rem;
  --wbw-pad-v: 14px;
  --wbw-pad-h: 18px;
  --wbw-min-w: 92px;
}

/* 1. SOLEIL DORÉ PUR 150px */
html body #flatEarthSun,
html body .flat-earth-sun,
html body [data-astre-role="sun"],
html body .astre-soleil-pur-v53 {
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
  -webkit-backdrop-filter: none !important;
  mix-blend-mode: normal !important;
}

html body #flatEarthSun::before,
html body #flatEarthSun::after,
html body .flat-earth-sun::before,
html body .flat-earth-sun::after,
html body .astre-soleil-pur-v53::before,
html body .astre-soleil-pur-v53::after,
html body #flatEarthSun *,
html body .flat-earth-sun *,
html body .astre-soleil-pur-v53 * {
  display: none !important;
  content: none !important;
  background: none !important;
  box-shadow: none !important;
  opacity: 0 !important;
}

/* 2. LUNE BLANCHE PURE 150px */
html body #flatEarthMoon,
html body .flat-earth-moon,
html body [data-astre-role="moon"],
html body .astre-lune-pure-v53 {
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
  -webkit-backdrop-filter: none !important;
  mix-blend-mode: normal !important;
}

html body #flatEarthMoon::before,
html body #flatEarthMoon::after,
html body .flat-earth-moon::before,
html body .flat-earth-moon::after,
html body .astre-lune-pure-v53::before,
html body .astre-lune-pure-v53::after,
html body #flatEarthMoon *,
html body .flat-earth-moon *,
html body .astre-lune-pure-v53 * {
  display: none !important;
  content: none !important;
  background: none !important;
  box-shadow: none !important;
  opacity: 0 !important;
}

/* 3. MASQUAGE ABSOLU DE MAHER AL-MUAIQLY */
html body img[src*="maher" i],
html body [data-reciter*="maher" i],
html body [data-value*="maher" i],
html body .maher-supprime-v53 {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  overflow: hidden !important;
}

/* 4. MASQUAGE DE LA TRADUCTION DU BAS EN MODE MOT-À-MOT */
html body .wbw-masquer-traduction-bas {
  display: none !important; visibility: hidden !important; height: 0 !important; max-height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; overflow: hidden !important; opacity: 0 !important; pointer-events: none !important;
}

/* 5. BANDEAU INTERACTIF DU SENS DE LECTURE */
html body #wbwSensLectureBanner {
  width: 100% !important;
  text-align: center !important;
  font-size: 0.78rem !important;
  letter-spacing: 0.04em !important;
  color: #38bdf8 !important;
  margin-bottom: 10px !important;
  opacity: 0.92 !important;
  font-weight: 500 !important;
  direction: ltr !important;
  cursor: pointer !important;
  user-select: none !important;
}

/* 6. CARTES MOT-À-MOT AVEC BADGE NUMÉROTÉ */
html body .wbw-card-unit {
  position: relative !important;
  padding: var(--wbw-pad-v) var(--wbw-pad-h) !important;
  min-width: var(--wbw-min-w) !important;
  border-radius: 18px !important;
  transform-origin: 50% 80% !important;
  will-change: transform, opacity, box-shadow, border-color !important;
  backface-visibility: hidden !important;
}

html body .wbw-card-unit::before {
  content: attr(data-word-num);
  position: absolute !important;
  top: 5px !important;
  right: 8px !important;
  font-size: 0.65rem !important;
  font-weight: 700 !important;
  color: rgba(56, 189, 248, 0.75) !important;
  line-height: 1 !important;
  pointer-events: none !important;
}

html body .wbw-card-unit > *:first-child {
  font-size: var(--wbw-ar-size) !important;
  line-height: 1.45 !important;
  direction: rtl !important;
  text-align: center !important;
}

html body .wbw-card-unit > *:first-child::before {
  content: none !important;
  display: none !important;
}

html body .wbw-card-unit > *:last-child {
  font-size: var(--wbw-tr-size) !important;
  direction: ltr !important;
  text-align: center !important;
}

/* 7. MODE SUIVI VERSET : BLANC PUR AU DÉBUT -> HALO BLEU APRÈS */
html body #arabicVerse,
html body .arabic-glow-verse {
  direction: rtl !important;
  color: #ffffff !important;
  text-shadow: 0 0 14px rgba(255, 255, 255, 0.45), 0 0 28px rgba(255, 255, 255, 0.18) !important;
}

html body .verse-stage .arabic-glow-verse span,
html body .verse-stage #arabicVerse span,
html body .ar-word-follow,
html body .follow-word {
  position: relative !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: #ffffff !important;
  padding: 0 7px !important;
  display: inline-block !important;
  transform-origin: 50% 85% !important;
  will-change: transform, opacity, filter, text-shadow, color !important;
  backface-visibility: hidden !important;
  -webkit-font-smoothing: antialiased !important;
  text-shadow: 0 0 14px rgba(255, 255, 255, 0.48), 0 0 28px rgba(255, 255, 255, 0.20) !important;
}

/* 8. BOUTON DE LANGUE TURC (TR TR) */
html body #btnLangTrV53 {
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
}
html body #btnLangTrV53.active-tr-v53 {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.28), rgba(56, 189, 248, 0.18)) !important;
  border: 1px solid #38bdf8 !important;
  color: #ffffff !important;
  border-radius: 999px !important;
}
</style>`;

function codeClientV53() {
  try {
    for (var p = 38; p <= 52; p++) {
      localStorage.removeItem("cache_wbw_exact_v" + p);
    }
  } catch (e) {}

  var modeTurcActif = false;
  try {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("lang") === "tr") {
      modeTurcActif = true;
      localStorage.setItem("corantafsir_lang_v53", "tr");
    } else if (localStorage.getItem("corantafsir_lang_v53") === "tr") {
      modeTurcActif = true;
    }
  } catch (e) {}

  var NOMS_SOURATES_TR = {
    1: "Fâtiha Suresi", 2: "Bakara Suresi", 3: "Âl-i İmrân Suresi", 4: "Nisâ Suresi", 5: "Mâide Suresi",
    6: "En'âm Suresi", 7: "A'râf Suresi", 8: "Enfâl Suresi", 9: "Tevbe Suresi", 10: "Yûnus Suresi",
    11: "Hûd Suresi", 12: "Yûsuf Suresi", 13: "Ra'd Suresi", 14: "İbrâhîm Suresi", 15: "Hicr Suresi",
    16: "Nahl Suresi", 17: "İsrâ Suresi", 18: "Kehf Suresi", 19: "Meryem Suresi", 20: "Tâhâ Suresi",
    21: "Enbiyâ Suresi", 22: "Hac Suresi", 23: "Mü'minûn Suresi", 24: "Nûr Suresi", 25: "Furkan Suresi",
    26: "Şuarâ Suresi", 27: "Neml Suresi", 28: "Kasas Suresi", 29: "Ankebût Suresi", 30: "Rûm Suresi",
    31: "Lokmân Suresi", 32: "Secde Suresi", 33: "Ahzâb Suresi", 34: "Sebe' Suresi", 35: "Fâtır Suresi",
    36: "Yâsîn Suresi", 37: "Sâffât Suresi", 38: "Sâd Suresi", 39: "Zümer Suresi", 40: "Mü'min (Gâfir) Suresi",
    41: "Fussilet Suresi", 42: "Şûrâ Suresi", 43: "Zuhruf Suresi", 44: "Duhân Suresi", 45: "Câsiye Suresi",
    46: "Ahkâf Suresi", 47: "Muhammed Suresi", 48: "Fetih Suresi", 49: "Hucurât Suresi", 50: "Kâf Suresi",
    51: "Zâriyât Suresi", 52: "Tûr Suresi", 53: "Necm Suresi", 54: "Kamer Suresi", 55: "Rahmân Suresi",
    56: "Vâkıa Suresi", 57: "Hadîd Suresi", 58: "Mücâdele Suresi", 59: "Haşr Suresi", 60: "Mümtehine Suresi",
    61: "Saf Suresi", 62: "Cuma Suresi", 63: "Münâfikûn Suresi", 64: "Tegâbün Suresi", 65: "Talâk Suresi",
    66: "Tahrîm Suresi", 67: "Mülk Suresi", 68: "Kalem Suresi", 69: "Hâkka Suresi", 70: "Meâric Suresi",
    71: "Nûh Suresi", 72: "Cin Suresi", 73: "Müzzemmil Suresi", 74: "Müddessir Suresi", 75: "Kıyâmet Suresi",
    76: "İnsân Suresi", 77: "Mürselât Suresi", 78: "Nebe' Suresi", 79: "Nâziât Suresi", 80: "Abese Suresi",
    81: "Tekvîr Suresi", 82: "İnfitâr Suresi", 83: "Mutaffifîn Suresi", 84: "İnşikâk Suresi", 85: "Burûc Suresi",
    86: "Târık Suresi", 87: "A'lâ Suresi", 88: "Gâşiye Suresi", 89: "Fecr Suresi", 90: "Beled Suresi",
    91: "Şems Suresi", 92: "Leyl Suresi", 93: "Duhâ Suresi", 94: "İnşirâh Suresi", 95: "Tîn Suresi",
    96: "Alak Suresi", 97: "Kadir Suresi", 98: "Beyyine Suresi", 99: "Zilzâl Suresi", 100: "Âdiyât Suresi",
    101: "Kâria Suresi", 102: "Tekâsür Suresi", 103: "Asr Suresi", 104: "Hümeze Suresi", 105: "Fîl Suresi",
    106: "Kureyş Suresi", 107: "Mâûn Suresi", 108: "Kevser Suresi", 109: "Kâfirûn Suresi", 110: "Nasr Suresi",
    111: "Tebbet (Mesed) Suresi", 112: "İhlâs Suresi", 113: "Felak Suresi", 114: "Nâs Suresi"
  };

  var cacheTurcChapitres = {};
  var requetesTurcEnCours = {};

  function restaurerTextesOriginauxDepuisTurc() {
    var modifs = document.querySelectorAll("[data-orig-tr-v53]");
    for (var i = 0; i < modifs.length; i++) {
      var el = modifs[i];
      var orig = el.getAttribute("data-orig-tr-v53");
      if (orig !== null) {
        el.textContent = orig;
      }
      el.removeAttribute("data-orig-tr-v53");
    }
  }

  function assurerBoutonTurcDansBarre() {
    var existant = document.getElementById("btnLangTrV53");
    if (existant) {
      if (modeTurcActif) existant.classList.add("active-tr-v53");
      else existant.classList.remove("active-tr-v53");
      return;
    }

    var tous = document.querySelectorAll("button, a, span, div, li");
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
            break;
          }
        }
      }
    }

    if (btnSaAr && btnSaAr.parentElement) {
      var conteneurLang = btnSaAr.parentElement;
      conteneurLang.style.setProperty("overflow", "visible", "important");
      var btnTr = btnSaAr.cloneNode(true);
      btnTr.id = "btnLangTrV53";
      btnTr.classList.remove("active");
      btnTr.removeAttribute("onclick");

      if (btnTr.children && btnTr.children.length >= 2) {
        btnTr.children[0].textContent = "TR";
        btnTr.children[btnTr.children.length - 1].textContent = "TR";
      } else {
        btnTr.innerHTML = '<span style="font-size:0.72em;opacity:0.75;margin-right:2px;">TR</span><span>TR</span>';
      }

      if (modeTurcActif) btnTr.classList.add("active-tr-v53");

      btnTr.addEventListener("click", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        modeTurcActif = true;
        try { localStorage.setItem("corantafsir_lang_v53", "tr"); } catch (e) {}
        var freres = conteneurLang.children;
        for (var f = 0; f < freres.length; f++) {
          if (freres[f] !== btnTr) freres[f].classList.remove("active");
        }
        btnTr.classList.add("active-tr-v53");
        dernierVersetSeo = "";
        synchroniserTout();
      });

      var freresInit = conteneurLang.children;
      for (var a = 0; a < freresInit.length; a++) {
        (function (autre) {
          if (autre === btnTr) return;
          autre.addEventListener("click", function () {
            modeTurcActif = false;
            try { localStorage.setItem("corantafsir_lang_v53", "other"); } catch (e) {}
            btnTr.classList.remove("active-tr-v53");
            restaurerTextesOriginauxDepuisTurc();
            dernierVersetSeo = "";
            setTimeout(synchroniserTout, 30);
          });
        })(freresInit[a]);
      }

      conteneurLang.appendChild(btnTr);
    }
  }

  function chargerChapitreTurcComplet(chap) {
    if (!chap) return;
    var cle = "chap_" + chap;
    if (cacheTurcChapitres[cle] || requetesTurcEnCours[cle]) return;
    requetesTurcEnCours[cle] = true;
    cacheTurcChapitres[cle] = {};

    var urlMukhtasarTr = "https://quranenc.com/api/v1/translation/sura/turkish_mokhtasar/" + chap;
    fetch(urlMukhtasarTr)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.result && data.result.length > 0) {
          for (var i = 0; i < data.result.length; i++) {
            var item = data.result[i];
            var vk = item.sura + ":" + item.aya;
            cacheTurcChapitres[cle][vk] = {
              tr: item.translation || "",
              tafsir: item.footnotes || item.translation || ""
            };
          }
          if (modeTurcActif) appliquerInterfaceEtContenuTurc();
        }
      })
      .catch(function () {});

    var urlDiyanet = "https://api.quran.com/api/v4/quran/translations/77?chapter_number=" + chap;
    fetch(urlDiyanet)
      .then(function (r2) { return r2.json(); })
      .then(function (d2) {
        if (d2 && d2.translations && d2.translations.length > 0) {
          for (var j = 0; j < d2.translations.length; j++) {
            var vk = chap + ":" + (j + 1);
            var cleanTr = (d2.translations[j].text || "").replace(/<[^>]+>/g, "").trim();
            if (!cacheTurcChapitres[cle][vk]) cacheTurcChapitres[cle][vk] = { tr: "", tafsir: "" };
            if (cleanTr) cacheTurcChapitres[cle][vk].tr = cleanTr;
          }
          if (modeTurcActif) appliquerInterfaceEtContenuTurc();
        }
      })
      .catch(function () {})
      .finally(function () {
        requetesTurcEnCours[cle] = false;
      });
  }

  function remplacerTexteFeuilleTurc(el, nouveauTxt) {
    if (!el || el.children.length > 0) return;
    if (!el.hasAttribute("data-orig-tr-v53")) {
      el.setAttribute("data-orig-tr-v53", el.textContent || "");
    }
    if (el.textContent !== nouveauTxt) {
      el.textContent = nouveauTxt;
    }
  }

  // FONCTION 100% SÉCURISÉE : NE TOUCHE QU'AUX ÉLÉMENTS FEUILLES (children.length === 0) !
  function appliquerInterfaceEtContenuTurc() {
    if (!modeTurcActif) return;

    var feuilles = document.querySelectorAll("h1, h2, h3, h4, button, a, span, p, div");
    for (var i = 0; i < feuilles.length; i++) {
      var b = feuilles[i];
      // SÉCURITÉ ABSOLUE : Si l'élément contient le moindre sous-élément HTML, on ne le touche JAMAIS !
      if (b.children.length > 0) continue;
      var txt = (b.textContent || "").trim();
      if (!txt || txt.length > 75) continue;

      if (txt === "القرآن الكريم والتفسير المختصر" || txt === "Le Noble Coran & Tafsīr Al-Mukhtasar" || txt === "The Noble Quran & Tafsīr Al-Mukhtasar") {
        remplacerTexteFeuilleTurc(b, "Kur'an-ı Kerim ve Muhtasar Tefsiri");
      } else if (txt.indexOf("ترتيب النزول") !== -1 || txt.indexOf("Ordre de Révélation") !== -1 || txt.indexOf("Revelation Order") !== -1) {
        remplacerTexteFeuilleTurc(b, "1. İniş Sırasına Göre (1 - 114)");
      } else if (txt.indexOf("ترتيب المصحف") !== -1 || txt.indexOf("Ordre du Mushaf") !== -1 || txt.indexOf("Mushaf Order") !== -1) {
        remplacerTexteFeuilleTurc(b, "2. Mushaf Sırasına Göre (1 - 114)");
      } else if (txt.indexOf("آيات الإعجاز") !== -1 || txt.indexOf("Miracles Scientifiques") !== -1 || txt.indexOf("Scientific Miracles") !== -1) {
        remplacerTexteFeuilleTurc(b, "⭐ 3. Kur'an Mucizeleri Ayetleri");
      } else if (txt === "ما هي السورة المكية؟" || txt === "Qu'est-ce qu'une Sourate Mecquoise ?") {
        remplacerTexteFeuilleTurc(b, "Mekkî Sure Nedir?");
      } else if (txt === "ما هي السورة المدنية؟" || txt === "Qu'est-ce qu'une Sourate Médinoise ?") {
        remplacerTexteFeuilleTurc(b, "Medenî Sure Nedir?");
      } else if (txt === "‹ Retour aux 114 Sourates" || txt === "‹ Back to 114 Surahs" || txt === "‹ Volver a las 114 Suras") {
        remplacerTexteFeuilleTurc(b, "‹ 114 Sureye Dön");
      } else if (txt === "SOURATE MÉDINOISE" || txt === "MEDINAN SURAH" || txt === "SURA MEDINENSE") {
        remplacerTexteFeuilleTurc(b, "MEDENÎ SURE");
      } else if (txt === "SOURATE MECQUOISE" || txt === "MAKKAN SURAH" || txt === "SURA MEQUÍ") {
        remplacerTexteFeuilleTurc(b, "MEKKÎ SURE");
      } else if (txt === "📖 Mot à mot" || txt === "Mot à mot" || txt === "📖 Word by Word" || txt === "Word by Word" || txt === "📖 Palabra por palabra") {
        remplacerTexteFeuilleTurc(b, "📖 Kelime Meali");
      } else if (txt === "🎨 Tajwīd" || txt === "🎨 Tajweed") {
        remplacerTexteFeuilleTurc(b, "🎨 Tecvid");
      } else if (txt === "🌊 Bruit Brun" || txt === "Bruit Brun" || txt === "🌊 Brown Noise" || txt === "🌊 Ruido Marrón") {
        remplacerTexteFeuilleTurc(b, "🌊 Kahverengi Gürültü");
      } else if (txt === "✨ Suivi" || txt === "Suivi" || txt === "✨ Follow" || txt === "✨ Seguimiento") {
        remplacerTexteFeuilleTurc(b, "✨ Takip");
      } else if (txt === "Enchaîner automatiquement" || txt === "Auto-advance" || txt === "Avance automático") {
        remplacerTexteFeuilleTurc(b, "Otomatik geçiş");
      } else if (txt === "‹ Précédent" || txt === "‹ Previous" || txt === "‹ Anterior") {
        remplacerTexteFeuilleTurc(b, "‹ Önceki");
      } else if (txt === "Suivant ›" || txt === "Next ›" || txt === "Siguiente ›") {
        remplacerTexteFeuilleTurc(b, "Sonraki ›");
      } else if (txt === "▶ Écouter le verset" || txt === "▶ Listen to verse" || txt === "▶ Escuchar aleya") {
        remplacerTexteFeuilleTurc(b, "▶ Ayeti Dinle");
      } else if (txt === "↺ Rejouer" || txt === "↺ Replay" || txt === "↺ Repetir") {
        remplacerTexteFeuilleTurc(b, "↺ Tekrar");
      } else if (txt === "TAFSĪR & EXPLICATION DU VERSET" || txt === "TAFSĪR & VERSE EXPLANATION" || txt === "TAFSĪR Y EXPLICACIÓN DE LA ALEYA") {
        remplacerTexteFeuilleTurc(b, "TEFSİR VE AYETİN AÇIKLAMASI (EL-MUHTASAR)");
      }
    }

    var inputs = document.querySelectorAll("input[type='text'], input[type='search'], input:not([type])");
    for (var inp = 0; inp < inputs.length; inp++) {
      inputs[inp].setAttribute("placeholder", "Bir sure veya ayet arayın (Örn: 2:255, 30:1, Kehf, Yasin...)");
    }

    var vk = obtenirCleVerset();
    if (!vk) return;
    var parts = vk.split(":");
    var numS = Number(parts[0]);
    var numV = Number(parts[1]);
    var cleChap = "chap_" + numS;

    if (!cacheTurcChapitres[cleChap]) {
      chargerChapitreTurcComplet(numS);
    }

    var h1 = document.querySelector("h1, h2");
    if (h1 && h1.children.length === 0 && NOMS_SOURATES_TR[numS]) {
      remplacerTexteFeuilleTurc(h1, NOMS_SOURATES_TR[numS] + " — " + numV + ". Ayet");
    }

    var donneesVersetTr = cacheTurcChapitres[cleChap] ? cacheTurcChapitres[cleChap][vk] : null;
    if (donneesVersetTr && donneesVersetTr.tr) {
      var pEls = document.querySelectorAll("p, div");
      for (var p = 0; p < pEls.length; p++) {
        var el = pEls[p];
        if (el.children.length > 0) continue;
        var tP = (el.getAttribute("data-orig-tr-v53") || el.textContent || "").trim();
        if (new RegExp("^" + numV + "\\s*[\\.-]\\s+").test(tP) && tP.length < 1400) {
          remplacerTexteFeuilleTurc(el, numV + ". " + donneesVersetTr.tr);
          break;
        }
      }
    }

    if (donneesVersetTr && donneesVersetTr.tafsir) {
      var headersTafsir = document.querySelectorAll("div, p, span, h3, h4");
      for (var h = 0; h < headersTafsir.length; h++) {
        var th = (headersTafsir[h].textContent || "").trim();
        if (th === "TEFSİR VE AYETİN AÇIKLAMASI (EL-MUHTASAR)" || th === "TAFSĪR & EXPLICATION DU VERSET") {
          var parentBox = headersTafsir[h].parentElement;
          if (parentBox) {
            var enfants = parentBox.children;
            for (var e = 0; e < enfants.length; e++) {
              var enf = enfants[e];
              var te = (enf.textContent || "").trim();
              if (enf !== headersTafsir[h] && te.length > 35 && te.indexOf("Diyanet İşleri") === -1 && te.indexOf("Hamidullah") === -1) {
                if (!enf.hasAttribute("data-orig-tr-v53")) {
                  enf.setAttribute("data-orig-tr-v53", enf.textContent || "");
                }
                var nvTafsir = numV + ". " + donneesVersetTr.tafsir;
                if (enf.textContent !== nvTafsir) {
                  enf.textContent = nvTafsir;
                }
                break;
              }
            }
          }
          break;
        }
      }
    }
  }

  // 1. RÉPARATION DU SOLEIL ET DE LA LUNE EN ORBITE (SANS JAMAIS CACHER D'ÉLÉMENT)
  function reparerSoleilEtLuneEnOrbite() {
    var tousDivs = document.querySelectorAll("div, span, canvas");
    var candidats = [];

    for (var i = 0; i < tousDivs.length; i++) {
      var el = tousDivs[i];
      var idCls = ((el.id || "") + " " + (el.className && typeof el.className === "string" ? el.className : "")).toLowerCase();

      var estNommeSun = idCls.indexOf("sun") !== -1 || idCls.indexOf("soleil") !== -1 || el.getAttribute("data-astre-role") === "sun";
      var estNommeMoon = idCls.indexOf("moon") !== -1 || idCls.indexOf("lune") !== -1 || el.getAttribute("data-astre-role") === "moon";

      var r = el.getBoundingClientRect();
      var estRondVide =
        r.width >= 55 &&
        r.width <= 320 &&
        Math.abs(r.width - r.height) <= 12 &&
        (el.textContent || "").trim() === "" &&
        !el.querySelector("button, input, select, p, a, img, h1, h2");

      if (estNommeSun || estNommeMoon || estRondVide) {
        var st = window.getComputedStyle(el);
        var br = st.borderRadius || "";
        if (estNommeSun || estNommeMoon || br.indexOf("50%") !== -1 || parseFloat(br) >= r.width * 0.4) {
          var styleStr = (
            (el.getAttribute("style") || "") +
            " " +
            (st.boxShadow || "") +
            " " +
            (st.backgroundImage || "") +
            " " +
            (st.backgroundColor || "") +
            " " +
            (st.borderColor || "")
          ).toLowerCase();

          var aCouleurSoleil =
            styleStr.indexOf("250, 204, 21") !== -1 ||
            styleStr.indexOf("245, 158, 11") !== -1 ||
            styleStr.indexOf("253, 224, 71") !== -1 ||
            styleStr.indexOf("234, 88, 12") !== -1 ||
            styleStr.indexOf("255, 215") !== -1 ||
            styleStr.indexOf("255, 180") !== -1 ||
            styleStr.indexOf("255, 200") !== -1 ||
            styleStr.indexOf("facc15") !== -1 ||
            styleStr.indexOf("fde047") !== -1 ||
            styleStr.indexOf("f59e0b") !== -1 ||
            styleStr.indexOf("eab308") !== -1 ||
            styleStr.indexOf("0, 210, 255") !== -1 ||
            styleStr.indexOf("56, 189, 248") !== -1;

          candidats.push({
            el: el,
            isSun: estNommeSun || (!estNommeMoon && aCouleurSoleil),
            isMoon: estNommeMoon
          });
        }
      }
    }

    var soleilDejaTrouve = false;
    for (var m = 0; m < candidats.length; m++) {
      if (candidats[m].isSun) soleilDejaTrouve = true;
    }

    for (var n = 0; n < candidats.length; n++) {
      var astre = candidats[n];
      var node = astre.el;

      if (node.children && node.children.length > 0) {
        node.innerHTML = "";
      }

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
        node.classList.remove("astre-lune-pure-v53");
        node.classList.add("astre-soleil-pur-v53");
        node.style.setProperty("width", "150px", "important");
        node.style.setProperty("height", "150px", "important");
        node.style.setProperty("border-radius", "50%", "important");
        node.style.setProperty("border", "none", "important");
        node.style.setProperty(
          "background",
          "radial-gradient(circle at 50% 50%, #ffffff 0%, #fffef0 26%, #fef08a 52%, #facc15 76%, #f59e0b 94%, rgba(245, 158, 11, 0) 100%)",
          "important"
        );
        node.style.setProperty("background-color", "#fde047", "important");
        node.style.setProperty(
          "box-shadow",
          "0 0 50px 16px rgba(253, 224, 71, 0.72), 0 0 110px 38px rgba(245, 158, 11, 0.42)",
          "important"
        );
        node.style.setProperty("filter", "none", "important");
      } else {
        node.classList.remove("astre-soleil-pur-v53");
        node.classList.add("astre-lune-pure-v53");
        node.style.setProperty("width", "150px", "important");
        node.style.setProperty("height", "150px", "important");
        node.style.setProperty("border-radius", "50%", "important");
        node.style.setProperty("border", "none", "important");
        node.style.setProperty(
          "background",
          "radial-gradient(circle at 50% 50%, #ffffff 0%, #f8fafc 38%, #e2e8f0 70%, rgba(186, 230, 253, 0) 100%)",
          "important"
        );
        node.style.setProperty("background-color", "#ffffff", "important");
        node.style.setProperty(
          "box-shadow",
          "0 0 45px 15px rgba(255, 255, 255, 0.65), 0 0 95px 35px rgba(148, 163, 184, 0.35)",
          "important"
        );
        node.style.setProperty("filter", "none", "important");
      }
    }
  }

  // 2. SUPPRESSION TOTALE DE MAHER AL-MUAIQLY
  function retirerRecitateurMaher() {
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        var val = localStorage.getItem(k) || "";
        if (/maher|muaiqly|muaqli/i.test(val)) {
          localStorage.setItem(k, "Yasser_Ad-Dussary_128kbps");
        }
      }
    } catch (e) {}

    var selects = document.querySelectorAll("select");
    for (var s = 0; s < selects.length; s++) {
      var sel = selects[s];
      for (var o = sel.options.length - 1; o >= 0; o--) {
        var opt = sel.options[o];
        var txt = ((opt.value || "") + " " + (opt.textContent || "")).toLowerCase();
        if (txt.indexOf("maher") !== -1 || txt.indexOf("muaiqly") !== -1 || txt.indexOf("muaqli") !== -1) {
          var etaitSelectionne = opt.selected;
          sel.remove(o);
          if (etaitSelectionne && sel.options.length > 0) {
            sel.selectedIndex = 0;
            sel.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }
      }
    }

    var candidats = document.querySelectorAll("div, button, li, a, span");
    for (var c = 0; c < candidats.length; c++) {
      var el = candidats[c];
      var t = (el.textContent || "").trim().toLowerCase();
      if (
        (t === "maher al-muaiqly" || t.indexOf("maher al-muaiqly") !== -1 || t.indexOf("maher al muaiqly") !== -1) &&
        t.indexOf("yasser") === -1 &&
        t.indexOf("hussary") === -1 &&
        t.indexOf("sudais") === -1 &&
        t.indexOf("afasy") === -1
      ) {
        var cible = el;
        if (el.parentElement) {
          var pTxt = (el.parentElement.textContent || "").trim().toLowerCase();
          if (pTxt.indexOf("yasser") === -1 && pTxt.indexOf("hussary") === -1 && el.parentElement.getBoundingClientRect().height < 110) {
            cible = el.parentElement;
          }
        }
        cible.classList.add("maher-supprime-v53");
        if (cible.parentNode) cible.parentNode.removeChild(cible);
      }
    }

    var imgs = document.querySelectorAll("img");
    for (var im = 0; im < imgs.length; im++) {
      var src = (imgs[im].getAttribute("src") || "").toLowerCase();
      imgs[im].setAttribute("loading", "lazy");
      imgs[im].setAttribute("decoding", "async");
      if (src.indexOf("maher") !== -1 || src.indexOf("muaiqly") !== -1) {
        var row = imgs[im].parentElement;
        if (row && row.getBoundingClientRect().height < 110) {
          row.classList.add("maher-supprime-v53");
          if (row.parentNode) row.parentNode.removeChild(row);
        }
      }
    }
  }

  // 3. DÉTECTION DE LA LANGUE ACTIVE & MENTIONS MULTILINGUES
  function obtenirLangueActive() {
    if (modeTurcActif) return "tr";
    var bodyTxt = document.body ? document.body.innerText : "";
    if (bodyTxt.indexOf("Escuchar aleya") !== -1 || bodyTxt.indexOf("EXPLICACIÓN DE LA ALEYA") !== -1 || bodyTxt.indexOf("Ruido Marrón") !== -1) {
      return "es";
    }
    if (bodyTxt.indexOf("Listen to verse") !== -1 || bodyTxt.indexOf("VERSE EXPLANATION") !== -1 || bodyTxt.indexOf("Brown Noise") !== -1) {
      return "en";
    }
    if (bodyTxt.indexOf("استمع للآية") !== -1 || bodyTxt.indexOf("تفسير الآية") !== -1 || bodyTxt.indexOf("ضوضاء بنية") !== -1) {
      return "ar";
    }
    return "fr";
  }

  function mettreAJourMentionsTraducteurEtExegese() {
    var lang = obtenirLangueActive();
    var textesBas = {
      fr: "Traduction originale de Muhammad Hamidullah (1977) • Exégèse (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      en: "Translation by Saheeh International • Exegesis (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      es: "Traducción de Abdel Ghani Melara Navio • Exégesis (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      ar: "النص القرآني بالرسم العثماني • التفسير المختصر وتفسير ابن كثير وأسباب النزول",
      tr: "Diyanet İşleri Başkanlığı Meali • Tefsir: El-Muhtasar, İbn Kesîr ve Nüzul Sebepleri"
    };
    var textesHaut = {
      fr: "Traduction Muhammad Hamidullah (1977) & Exégèse",
      en: "Saheeh International & Exegesis",
      es: "Traducción Abdel Ghani Melara Navio & Exégesis",
      ar: "التفسير المختصر وتفسير ابن كثير وأسباب النزول",
      tr: "Diyanet İşleri Meali & El-Muhtasar Tefsiri"
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
        txt.indexOf("النص القرآني بالرسم العثماني") !== -1 ||
        txt.indexOf("Diyanet İşleri Başkanlığı Meali") !== -1
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
        txt.indexOf("التفسير المختصر وتفسير ابن كثير") !== -1 ||
        txt.indexOf("Diyanet İşleri Meali & El-Muhtasar") !== -1
      ) {
        var parts = txt.split("•");
        if (parts.length >= 2) {
          var lieu = parts[0].trim();
          if (lang === "tr") {
            lieu = lieu.replace(/Sourate Médinoise \(Médine\)|Madinan Surah \(Madinah\)|Sura Medinense \(Medina\)/i, "Medenî Sure (Medine)")
                       .replace(/Sourate Mecquoise \(La Mecque\)|Makkan Surah \(Makkah\)|Sura Mequí \(La Meca\)/i, "Mekkî Sure (Mekke)");
          }
          var nv = lieu + " • " + textesHaut[lang];
          if (el.textContent !== nv) el.textContent = nv;
        }
      }
    }
  }

  // 4. MOT-À-MOT EN ORDRE AUDIO STRICT + COMPATIBILITÉ 100% TAJWID
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
      "يخادعون": "Ils cherchent à tromper", "يخدعون": "ils trompent", "آمنوا": "ont cru", "ءامنوا": "ont cru", "إلا": "que", "أنفسهم": "eux-mêmes", "يشعرون": "s'en rendent compte",
      "في": "Dans / sur", "مرض": "une maladie", "فزادهم": "alors leur a accru", "مرضا": "en maladie", "أليم": "douloureux", "كانوا": "ils étaient", "يكذبون": "à mentir",
      "وإذا": "Et quand", "قيل": "on dit", "لهم": "à eux (leur)", "تفسدوا": "semez la corruption", "الأرض": "la terre", "قالوا": "ils disent", "إنما": "Certes, ne...que", "نحن": "nous (sommes)", "مصلحون": "des réformateurs",
      "ألا": "En vérité !", "إنهم": "ce sont eux", "المفسدون": "les corrupteurs", "ولكن": "mais", "يعلمون": "savent",
      "والقلم": "Par la plume", "يسطرون": "ils écrivent !", "ما": "Tu n'es pas", "أنت": "toi", "بنعمة": "par la grâce de", "ربك": "ton Seigneur", "بمجنون": "un possédé",
      "بأيكم": "lequel d'entre vous", "المفتون": "a perdu la raison (l'insensé)"
    },
    es: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn",
      "ذلك": "Ese (Este es)", "الكتاب": "el Libro", "لا": "no hay", "ريب": "duda", "فيه": "en él", "هدى": "una guía", "للمتقين": "para los piadosos",
      "ختم": "ha sellado", "الله": "Allāh (Dios)", "على": "sobre", "قلوبهم": "sus corazones", "وعلى": "y sobre", "سمعهم": "su oído", "وأبصارهم": "y sus miradas", "أبصارهم": "sus miradas (ojos)", "غشاوة": "un velo", "غشوة": "un velo", "ولهم": "y para ellos", "عذاب": "un castigo", "عظيم": "inmenso",
      "والقلم": "Por el cálamo (la pluma)", "وما": "y lo que", "يسطرون": "escriben"
    },
    tr: {
      "الم": "Elif, Lâm, Mîm", "ن": "Nûn", "ق": "Kâf", "ص": "Sâd", "يس": "Yâ-Sîn", "طه": "Tâ-Hâ", "طسم": "Tâ-Sîn-Mîm", "حم": "Hâ-Mîm",
      "ذلك": "Bu (İşte o)", "الكتاب": "Kitap", "لا": "yoktur / değil", "ريب": "şüphe", "فيه": "onda", "هدى": "bir hidayettir (rehberdir)", "للمتقين": "muttakiler (takva sahipleri) için",
      "الذين": "Onlar ki", "يؤمنون": "iman ederler", "بالغيب": "gayba", "ويقيمون": "ve kılarlar", "الصلاة": "namazı", "الصلوة": "namazı", "ومما": "ve şeylerden", "رزقناهم": "onlara rızık olarak verdiğimiz", "ينفقون": "infak ederler (harcarlar)",
      "والذين": "Ve onlar ki", "بما": "indirilene", "أنزل": "indirilen", "إليك": "sana", "وما": "ve yazdıklarına / değildirler", "قبلك": "senden önce", "وبالآخرة": "ve ahirete", "وبالأخرة": "ve ahirete", "هم": "onlar", "يوقنون": "kesin olarak inanırlar",
      "أولئك": "İşte onlar", "على": "üzerindedir", "ربهم": "Rablerinden", "وأولئك": "ve işte onlar", "المفلحون": "kurtuluşa erenlerdir",
      "إن": "Şüphesiz", "كفروا": "inkâr edenler", "سواء": "birdir (fark etmez)", "عليهم": "onlar için", "أأنذرتهم": "onları uyarsan da", "ءأنذرتهم": "onları uyarsan da", "أم": "veya", "لم": "-medi / değil", "تنذرهم": "onları uyarmasan da",
      "ختم": "mühürlemiştir", "الله": "Allâh", "قلوبهم": "kalplerini", "وعلى": "ve üzerine", "سمعهم": "kulaklarını (işitmelerini)", "وأبصارهم": "ve gözlerini", "أبصارهم": "gözlerinin (bakışlarının)", "غشاوة": "bir perde vardır", "غشوة": "bir perde vardır", "ولهم": "ve onlar için vardır", "عذاب": "bir azap", "عظيم": "büyük",
      "ومن": "Ve insanlardan", "الناس": "insanlar", "يقول": "diyenler vardır", "آمنا": "İman ettik", "ءامنا": "İman ettik", "بالله": "Allâh'a", "وباليوم": "ve güne", "الآخر": "ahiret (son)", "بمؤمنين": "müminler",
      "في": "İçinde / vardır", "مرض": "bir hastalık", "فزادهم": "artırmıştır", "مرضا": "hastalıklarını", "أليم": "elem verici", "كانوا": "oldular", "يكذبون": "yalan söylüyorlar",
      "وإذا": "Ve ne zaman", "قيل": "denilse", "لهم": "onlara", "تفسدوا": "bozgunculuk yapmayın", "الأرض": "yeryüzünde", "قالوا": "derler ki:", "إنما": "Ancak / sadece", "نحن": "biz", "مصلحون": "ıslah edicileriz (düzeltenleriz)",
      "والقلم": "Kaleme andolsun", "يسطرون": "satır satır yazdıklarına!", "ما": "Sen değilsin", "أنت": "sen", "بنعمة": "nimetiyle", "ربك": "Rabbinin", "بمجنون": "bir mecnun (deli)",
      "بأيكم": "hanginizin", "المفتون": "fitneye tutulmuş (delirmiş) olduğunu"
    }
  };

  var cacheVersetMotsExact = {};
  var requetesVersetEnCours = {};
  var sensGrilleRtl = true;

  try {
    var sauv = localStorage.getItem("cache_wbw_exact_v53");
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
      if (lang === "tr") return aKasra ? "-den / önce" : "kim / kimseler";
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

    var numSourate = "";
    var urlM = window.location.pathname.match(/sourate-(\d+)/i);
    if (urlM) numSourate = urlM[1];
    if (!numSourate) return "";

    var selects = document.querySelectorAll("select");
    for (var i = 0; i < selects.length; i++) {
      var s = selects[i];
      if (s.options && s.selectedIndex >= 0) {
        var optTxt = s.options[s.selectedIndex].textContent || "";
        var vm = optTxt.match(/(?:Verset|Verse|Aleya|Ayet|آية)\s*(\d+)/i);
        if (vm) return numSourate + ":" + vm[1];
      }
    }
    var urlFull = window.location.pathname.match(/sourate-(\d+)-verset-(\d+)/i);
    if (urlFull) return urlFull[1] + ":" + urlFull[2];
    return "";
  }

  function chargerVraiMotAMotVerset(vk, lang) {
    if (!vk) return;
    var cleCache = vk + "_" + lang;
    if (cacheVersetMotsExact[cleCache] || requetesVersetEnCours[cleCache]) return;
    requetesVersetEnCours[cleCache] = true;

    var apiLang = (lang === "tr" || lang === "en") ? lang : "en";
    var urlQdc = "https://api.quran.com/api/v4/verses/by_key/" + vk + "?language=" + apiLang + "&words=true&word_fields=text_uthmani,translation";
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

        if (lang === "en" || lang === "ar" || lang === "tr") {
          for (var t = 0; t < motsQdc.length; t++) {
            var certTr = chercherDansDicoCertifie(motsQdc[t].ar, lang);
            if (certTr) motsQdc[t].tr = certTr;
          }
          cacheVersetMotsExact[cleCache] = motsQdc;
          try { localStorage.setItem("cache_wbw_exact_v53", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
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
          try { localStorage.setItem("cache_wbw_exact_v53", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
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
            try { localStorage.setItem("cache_wbw_exact_v53", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
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
        el.children &&
        el.children.length >= 2 &&
        el.children.length <= 3 &&
        el.children[0].tagName === "DIV" &&
        el.children[el.children.length - 1].tagName === "DIV" &&
        !el.querySelector("button")
      ) {
        var r = el.getBoundingClientRect();
        if (r.width >= 48 && r.width <= 280 && r.height >= 48 && r.height <= 220) {
          var txt0 = (el.children[0].textContent || "").trim();
          if (/[\u0600-\u06FF]/.test(txt0) && txt0.length < 40) {
            candidats.push(el);
          }
        }
      }
    }

    for (var c = 0; c < candidats.length; c++) {
      var cand = candidats[c];
      var estEnfant = false;
      for (var p = 0; p < candidats.length; p++) {
        if (c !== p && candidats[p].contains(cand)) {
          estEnfant = true;
          break;
        }
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

    if (!cacheVersetMotsExact[cleCache]) {
      chargerVraiMotAMotVerset(vk, lang);
    }

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

      if (lang === "fr" && cleCarteAr === "وما") {
        if (i + 1 < cartes.length && cartes[i + 1].children.length) {
          var suivAr = normaliserArabeCle(cartes[i + 1].children[0].textContent || "");
          if (suivAr === "هم" || suivAr === "يخدعون" || suivAr === "يشعرون" || suivAr === "يعلمون" || suivAr === "كانوا") {
            tradFinale = "et ils ne";
          } else {
            tradFinale = "et ce qu'";
          }
        } else {
          tradFinale = "et ce qu'";
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
          if (!tradFinale && listeExacte[i]) {
            tradFinale = listeExacte[i].tr;
          }
        }
      }

      if (tradFinale && elTr.textContent !== tradFinale) {
        elTr.textContent = tradFinale;
      }
    }

    var grilleParente = cartes[0].parentElement;
    if (grilleParente) {
      grilleParente.style.setProperty("direction", sensGrilleRtl ? "rtl" : "ltr", "important");
      var totalW = cartes.length;
      var textesRtl = {
        fr: "⬅️ Sens de lecture : de droite à gauche (1 ➔ " + totalW + ") • Cliquer pour inverser",
        en: "⬅️ Reading order: Right to Left (1 ➔ " + totalW + ") • Click to reverse",
        es: "⬅️ Orden de lectura: de derecha a izquierda (1 ➔ " + totalW + ") • Clic para invertir",
        tr: "⬅️ Okuma yönü: Sağdan Sola (1 ➔ " + totalW + ") • Ters çevirmek için tıklayın",
        ar: "⬅️ ترتيب القراءة: من اليمين إلى اليسار (1 ➔ " + totalW + ")"
      };
      var textesLtr = {
        fr: "➡️ Sens de lecture : de gauche à droite (1 ➔ " + totalW + ") • Cliquer pour inverser",
        en: "➡️ Reading order: Left to Right (1 ➔ " + totalW + ") • Click to reverse",
        es: "➡️ Orden de lectura: de izquierda a derecha (1 ➔ " + totalW + ") • Clic para invertir",
        tr: "➡️ Okuma yönü: Soldan Sağa (1 ➔ " + totalW + ") • Ters çevirmek için tıklayın",
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
      if (oldBanner.textContent !== fleche) {
        oldBanner.textContent = fleche;
      }
    }
  }

  function masquerTraductionBasSiMotAMot() {
    var cartes = obtenirCartesMotAMotVisibles();
    var wbwActif = cartes.length >= 2;

    if (!wbwActif) {
      var caches = document.querySelectorAll(".wbw-masquer-traduction-bas");
      for (var c = 0; c < caches.length; c++) {
        caches[c].classList.remove("wbw-masquer-traduction-bas");
      }
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
      if (el.id === "wbwSensLectureBanner") continue;
      if (el === grilleParente || el.contains(premiereCarte) || grilleParente.contains(el)) continue;
      if (el.querySelector("button") || el.tagName === "BUTTON") continue;

      var txt = (el.textContent || "").trim();
      if (!txt || /[\u0600-\u06FF]/.test(txt)) continue;

      var r = el.getBoundingClientRect();
      if (r.top >= rectDerniereCarte.top + 10 || /^\d+\s*[\.-]/.test(txt)) {
        if (txt.indexOf("TAFSĪR") === -1 && txt.indexOf("TEFSİR") === -1 && txt.indexOf("EXPLICATION") === -1 && txt.indexOf("EXPLICACIÓN") === -1 && txt.indexOf("Ghunnah") === -1) {
          el.classList.add("wbw-masquer-traduction-bas");
        }
      }
    }
  }

  // 5. PACK SEO COMPLET + BALISES HREFLANG
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

    var languesSeo = ["fr", "en", "es", "ar", "tr"];
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

    if (!vk) return;
    var parts = vk.split(":");
    var numS = parts[0];
    var numV = parts[1];

    var h1 = document.querySelector("h1, h2");
    var titreVerset = h1 ? (h1.textContent || "").trim() : "Sourate " + numS + " Verset " + numV;

    var tousBlocs = document.querySelectorAll("div, p");
    var texteTafsirPropre = "";
    for (var i = 0; i < tousBlocs.length; i++) {
      var t = (tousBlocs[i].textContent || "").trim();
      if ((t.indexOf("TAFSĪR") !== -1 || t.indexOf("TEFSİR") !== -1 || t.indexOf("EXPLICATION") !== -1) && t.length > 80 && t.length < 4000) {
        texteTafsirPropre = t.replace(/TAFSĪR\s*&\s*EXPLICATION DU VERSET|TEFSİR VE AYETİN AÇIKLAMASI \(EL-MUHTASAR\)/i, "").trim();
        break;
      }
    }
    if (!texteTafsirPropre) texteTafsirPropre = titreVerset + " — Diyanet Meali, Kelime Meali, Tefsir (El-Muhtasar & İbn Kesîr) ve Nüzul Sebebi.";

    var metaDescCourte = (titreVerset + " (" + vk + ") : " + texteTafsirPropre).replace(/\s+/g, " ").slice(0, 158);
    var nouveauTitle = lang === "tr"
      ? (NOMS_SOURATES_TR[Number(numS)] || "Sure " + numS) + " " + numV + ". Ayet Tefsiri, Diyanet Meali, Kelime Meali ve Nüzul Sebebi | CoranTafsir"
      : titreVerset + " (" + vk + ") — Tafsīr, Cause de révélation & Mot à mot | CoranTafsir";

    if (document.title !== nouveauTitle) {
      document.title = nouveauTitle;
    }

    var elJson = document.getElementById("seo-jsonld-v53");
    if (!elJson) {
      elJson = document.createElement("script");
      elJson.id = "seo-jsonld-v53";
      elJson.type = "application/ld+json";
      document.head.appendChild(elJson);
    }

    var questionSeo = lang === "tr"
      ? (NOMS_SOURATES_TR[Number(numS)] || "Sure " + numS) + " " + numV + ". Ayet Tefsiri, Meali ve Nüzul Sebebi nedir?"
      : "Quelle est l'explication (Tafsīr) et la cause de révélation de " + titreVerset + " (" + vk + ") ?";

    var schemaGraph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Kur'an-ı Kerim (114 Sure)", "item": "https://corantafsir.com/" },
            { "@type": "ListItem", "position": 2, "name": NOMS_SOURATES_TR[Number(numS)] || "Sourate " + numS, "item": "https://corantafsir.com/sourate-" + numS + "-verset-1.html" },
            { "@type": "ListItem", "position": 3, "name": titreVerset + " (" + vk + ")", "item": urlCanonique }
          ]
        },
        {
          "@type": "Article",
          "headline": nouveauTitle,
          "description": metaDescCourte,
          "mainEntityOfPage": urlCanonique,
          "inLanguage": ["fr", "en", "es", "ar", "tr"],
          "author": { "@type": "Organization", "name": "CoranTafsir" },
          "publisher": { "@type": "Organization", "name": "CoranTafsir", "url": "https://corantafsir.com/" }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": questionSeo,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": texteTafsirPropre.slice(0, 800)
              }
            }
          ]
        }
      ]
    };
    elJson.textContent = JSON.stringify(schemaGraph);
  }

  var wbwScale = 1.0;
  try {
    var saved = localStorage.getItem("wbw_zoom_scale_v10");
    if (saved && !isNaN(Number(saved))) wbwScale = Math.max(0.68, Math.min(2.5, Number(saved)));
  } catch (e) {}

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

    var cartes = obtenirCartesMotAMotVisibles();
    for (var i = 0; i < cartes.length; i++) {
      var box = cartes[i];
      box.style.setProperty("padding", padV + " " + padH, "important");
      box.style.setProperty("min-width", minW, "important");
      if (box.children && box.children.length >= 2) {
        box.children[0].style.setProperty("font-size", arRem, "important");
        box.children[box.children.length - 1].style.setProperty("font-size", trRem, "important");
      }
    }
  }

  var suiviEstActif = true;

  function assurerBoutonSuiviVisible() {
    var tousBtns = document.querySelectorAll("button, .btn, span[role='button']");
    var btnSuivi = null;
    var btnTajwid = null;
    for (var i = 0; i < tousBtns.length; i++) {
      var b = tousBtns[i];
      var t = (b.textContent || "").trim();
      if (t.indexOf("Suivi") !== -1 || t.indexOf("Follow") !== -1 || t.indexOf("Seguimiento") !== -1 || t.indexOf("Takip") !== -1 || t.indexOf("تتبع") !== -1) {
        btnSuivi = b;
      } else if (t.indexOf("Tajw") !== -1 || t.indexOf("Tecvid") !== -1 || t.indexOf("تجويد") !== -1) {
        btnTajwid = b;
      }
    }
    if (btnSuivi) {
      btnSuivi.style.setProperty("display", "inline-flex", "important");
      btnSuivi.style.setProperty("visibility", "visible", "important");
      btnSuivi.style.setProperty("opacity", "1", "important");
      if (suiviEstActif) {
        btnSuivi.style.setProperty("background", "linear-gradient(135deg, #0ea5e9, #38bdf8)", "important");
        btnSuivi.style.setProperty("color", "#ffffff", "important");
      } else {
        btnSuivi.style.removeProperty("background");
      }
    } else if (btnTajwid && btnTajwid.parentElement && !document.getElementById("btnSuiviUniverselV53")) {
      var nv = document.createElement("button");
      nv.id = "btnSuiviUniverselV53";
      nv.type = "button";
      nv.className = btnTajwid.className;
      nv.innerHTML = "✨ Suivi";
      nv.style.setProperty("background", "linear-gradient(135deg, #0ea5e9, #38bdf8)", "important");
      nv.style.setProperty("color", "#ffffff", "important");
      btnTajwid.parentElement.insertBefore(nv, btnTajwid.nextSibling);
    }
  }

  // 6. ANIMATION MODE SUIVI : BLANC PUR -> BLEU NÉON
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
        if (txt.indexOf("verset") === -1 && txt.indexOf("verse") === -1 && txt.indexOf("aleya") === -1) {
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

    var idPrincipal = (MAP_NOMS_VERS_QDC[cleRec] || [7])[0];
    var urlQdc = "https://api.qurancdn.com/api/qdc/audio/reciters/" + idPrincipal + "/audio_files?chapter=" + chap + "&segments=true";
    fetch(urlQdc)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.audio_files && data.audio_files[0] && data.audio_files[0].verse_timings) {
          var vts = data.audio_files[0].verse_timings;
          for (var i = 0; i < vts.length; i++) {
            var vt = vts[i];
            if (vt.verse_key && vt.segments && vt.segments.length > 0) {
              enregistrerSegmentsNormalises(cleRec, vt.verse_key, vt.segments);
            }
          }
        }
      })
      .catch(function () {});
  }

  function enregistrerSegmentsNormalises(cleRec, verseKey, segmentsBruts) {
    var valides = [];
    var minMs = Infinity;
    var maxMs = -Infinity;
    for (var i = 0; i < segmentsBruts.length; i++) {
      var s = segmentsBruts[i];
      if (s && s.length >= 3 && s[0] != null && s[1] != null && s[2] != null) {
        var wIdx = Number(s[0]) - 1;
        var t1 = Number(s[1]);
        var t2 = Number(s[2]);
        if (!isNaN(wIdx) && !isNaN(t1) && !isNaN(t2) && t2 >= t1) {
          if (t1 < minMs) minMs = t1;
          if (t2 > maxMs) maxMs = t2;
          valides.push({ wordIndex: wIdx, t1: t1, t2: t2 });
        }
      }
    }
    if (valides.length > 0 && maxMs > minMs) {
      var spanTotal = maxMs - minMs;
      var norm = [];
      for (var k = 0; k < valides.length; k++) {
        norm.push({
          wordIndex: valides[k].wordIndex,
          rStart: (valides[k].t1 - minMs) / spanTotal,
          rEnd: (valides[k].t2 - minMs) / spanTotal
        });
      }
      cacheTimingVerset[cleRec + "_" + verseKey] = norm;
    }
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

  if (typeof HTMLMediaElement !== "undefined" && HTMLMediaElement.prototype && !HTMLMediaElement.prototype.__hookedV53) {
    var origPlay = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      window.__lecteurAudioActuel = this;
      if (this.currentTime < 0.25) {
        reinitialiserMotsEnBlancPur();
      }
      var cleRec = obtenirCleRecitateurSelectionne();
      var vk = obtenirCleVerset();
      if (cleRec && vk) chargerTimestampsQdc(cleRec, vk);
      lancerBoucleSuivi();
      return origPlay.apply(this, arguments);
    };
    HTMLMediaElement.prototype.__hookedV53 = true;
  }

  function trouverAudioActif() {
    if (window.__lecteurAudioActuel && !window.__lecteurAudioActuel.paused && window.__lecteurAudioActuel.currentTime > 0) {
      return window.__lecteurAudioActuel;
    }
    var audios = document.querySelectorAll("audio");
    for (var i = 0; i < audios.length; i++) {
      if (!audios[i].paused && audios[i].currentTime > 0) return audios[i];
    }
    return null;
  }

  function courbeAfterEffects(x) {
    var t = Math.max(0, Math.min(1, x));
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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
      var sansMarques = w.replace(/[\u06D6-\u06ED\u064B-\u065F\u0670]/g, "");
      if (sansMarques.length === 0 && motsPropres.length > 0) {
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

      if (activeIndexFloat === -1 && aud && aud.duration > 0.2) {
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

  function lancerBoucleSuivi() {
    if (!rafId) rafId = requestAnimationFrame(etapeSuiviAudioAfterEffects);
  }

  function synchroniserTout() {
    assurerBoutonTurcDansBarre();
    reparerSoleilEtLuneEnOrbite();
    retirerRecitateurMaher();
    if (modeTurcActif) {
      appliquerInterfaceEtContenuTurc();
    }
    mettreAJourMentionsTraducteurEtExegese();
    masquerTraductionBasSiMotAMot();
    appliquerVraiMotAMotSurDOM();
    assurerBoutonSuiviVisible();
    appliquerZoomMotAMot();
    injecterPackSeoComplet();
    var cleRec = obtenirCleRecitateurSelectionne();
    var vk = obtenirCleVerset();
    if (cleRec && vk) chargerTimestampsQdc(cleRec, vk);
    if (vk) chargerVraiMotAMotVerset(vk, obtenirLangueActive());
  }

  var obs = new MutationObserver(function () {
    assurerBoutonTurcDansBarre();
    reparerSoleilEtLuneEnOrbite();
    retirerRecitateurMaher();
    if (modeTurcActif) {
      appliquerInterfaceEtContenuTurc();
    }
    mettreAJourMentionsTraducteurEtExegese();
    masquerTraductionBasSiMotAMot();
    appliquerVraiMotAMotSurDOM();
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
        try { localStorage.setItem("wbw_zoom_scale_v10", String(wbwScale)); } catch (err) {}
      } else if (t === "A-" || t === "A -" || t === "A−") {
        wbwScale = Math.max(0.68, +(wbwScale - 0.16).toFixed(2));
        try { localStorage.setItem("wbw_zoom_scale_v10", String(wbwScale)); } catch (err) {}
      } else if (t.indexOf("Rejouer") !== -1 || t.indexOf("Replay") !== -1 || t.indexOf("Repetir") !== -1 || t.indexOf("Tekrar") !== -1) {
        reinitialiserMotsEnBlancPur();
      } else if (t.indexOf("Suivi") !== -1 || t.indexOf("Follow") !== -1 || t.indexOf("Seguimiento") !== -1 || t.indexOf("Takip") !== -1 || t.indexOf("تتبع") !== -1) {
        suiviEstActif = !suiviEstActif;
        lancerBoucleSuivi();
      }
    }
    setTimeout(synchroniserTout, 15);
    setTimeout(synchroniserTout, 80);
  });

  setInterval(function () {
    synchroniserTout();
    var aud = trouverAudioActif();
    if (aud && !aud.paused && !rafId) lancerBoucleSuivi();
  }, 250);
  synchroniserTout();
}

const blocCompletV53 = preconnectTags + '\n' + cssV53 + '\n<script id="script-master-v53">(' + codeClientV53.toString() + ')();</script>';
const blocEchappePourGenerateur = blocCompletV53.replace(/\\/g, '\\\\');

// 1. Patcher generateur.js
let g = fs.readFileSync(pGen, 'utf8');
g = g.replace(/<style id="patch-master-v\d+">[\s\S]*?<\/script>/g, '');
g = g.replace(/<style id="patch-hide-tr-wbw-v\d+">[\s\S]*?<\/script>/g, '');
g = g.replace(/<link rel="preconnect" href="https:\/\/api\.quran\.com"[^>]*>\s*/g, '');
g = g.replace(/<link rel="preconnect" href="https:\/\/api\.qurancdn\.com"[^>]*>\s*/g, '');
g = g.replace(/<link rel="preconnect" href="https:\/\/everyayah\.com"[^>]*>\s*/g, '');
g = g.replace(/<link rel="preconnect" href="https:\/\/quranenc\.com"[^>]*>\s*/g, '');
g = g.replace(/<\/head>/g, () => blocEchappePourGenerateur + '\n</head>');
fs.writeFileSync(pGen, g, 'utf8');

// 2. Patcher aussi site/index.html et index.html
const fichiersIndex = [
  path.join(__dirname, 'site', 'index.html'),
  path.join(__dirname, 'index.html')
];
for (const fIdx of fichiersIndex) {
  if (fs.existsSync(fIdx)) {
    let htmlIdx = fs.readFileSync(fIdx, 'utf8');
    htmlIdx = htmlIdx.replace(/<style id="patch-master-v\d+">[\s\S]*?<\/script>/g, '');
    htmlIdx = htmlIdx.replace(/<link rel="preconnect" href="https:\/\/api\.quran\.com"[^>]*>\s*/g, '');
    htmlIdx = htmlIdx.replace(/<link rel="preconnect" href="https:\/\/api\.qurancdn\.com"[^>]*>\s*/g, '');
    htmlIdx = htmlIdx.replace(/<link rel="preconnect" href="https:\/\/everyayah\.com"[^>]*>\s*/g, '');
    htmlIdx = htmlIdx.replace(/<link rel="preconnect" href="https:\/\/quranenc\.com"[^>]*>\s*/g, '');
    htmlIdx = htmlIdx.replace(/<\/head>/i, () => blocCompletV53 + '\n</head>');
    fs.writeFileSync(fIdx, htmlIdx, 'utf8');
  }
}

console.log('✅ Correctif V53 activé : Page Turque TR 100% complète (sans écraser le conteneur) + Soleil/Lune 150px !');
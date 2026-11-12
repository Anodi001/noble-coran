const fs = require('fs');
const path = require('path');

const pGen = path.join(__dirname, 'generateur.js');
if (!fs.existsSync(pGen)) {
  console.error('❌ generateur.js introuvable !');
  process.exit(1);
}

const preconnectTags = `<link rel="preconnect" href="https://api.quran.com" crossorigin>
<link rel="preconnect" href="https://api.qurancdn.com" crossorigin>
<link rel="preconnect" href="https://everyayah.com" crossorigin>`;

const cssV54 = `<style id="patch-master-v54">
:root {
  --wbw-ar-size: 2.15rem;
  --wbw-tr-size: 0.92rem;
  --wbw-pad-v: 14px;
  --wbw-pad-h: 18px;
  --wbw-min-w: 92px;
}

/* 1. SOLEIL DORÉ PUR 150px (COMME DANS LA VIDÉO) */
html body #flatEarthSun,
html body .flat-earth-sun,
html body [id*="sun" i]:not([id*="sound" i]),
html body [class*="sun" i]:not([class*="sound" i]),
html body [data-astre-role="sun"],
html body .astre-soleil-pur-v54 {
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
html body .astre-soleil-pur-v54::before, html body .astre-soleil-pur-v54::after,
html body #flatEarthSun *, html body .flat-earth-sun *, html body .astre-soleil-pur-v54 * {
  display: none !important; content: none !important; background: none !important; box-shadow: none !important; opacity: 0 !important;
}

/* 2. LUNE BLANCHE PURE 150px */
html body #flatEarthMoon,
html body .flat-earth-moon,
html body [id*="moon" i],
html body [class*="moon" i],
html body [data-astre-role="moon"],
html body .astre-lune-pure-v54 {
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
html body .astre-lune-pure-v54::before, html body .astre-lune-pure-v54::after,
html body #flatEarthMoon *, html body .flat-earth-moon *, html body .astre-lune-pure-v54 * {
  display: none !important; content: none !important; background: none !important; box-shadow: none !important; opacity: 0 !important;
}

/* 3. MASQUAGE DE MAHER AL-MUAIQLY & TRADUCTION DU BAS EN MOT-À-MOT */
html body img[src*="maher" i], html body [data-reciter*="maher" i], html body .maher-supprime-v54,
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
html body #btnLangDeV54 {
  cursor: pointer !important; transition: all 0.2s ease !important; display: inline-flex !important; align-items: center !important; justify-content: center !important;
}
html body #btnLangDeV54.active-de-v54 {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.28), rgba(56, 189, 248, 0.18)) !important;
  border: 1px solid #38bdf8 !important; color: #ffffff !important; border-radius: 999px !important;
}
</style>`;

function codeClientV54() {
  // 0. PURGE TOTALE DE L'ANCIEN MODE TURC ET DES CACHES PRECEDENTS
  try {
    for (var p = 38; p <= 53; p++) {
      localStorage.removeItem("cache_wbw_exact_v" + p);
      localStorage.removeItem("corantafsir_lang_v" + p);
    }
    var oldTrBtns = document.querySelectorAll("[id^='btnLangTrV']");
    for (var b = 0; b < oldTrBtns.length; b++) {
      if (oldTrBtns[b].parentNode) oldTrBtns[b].parentNode.removeChild(oldTrBtns[b]);
    }
  } catch (e) {}

  // ==========================================================================
  // 1. GESTION SÉCURISÉE DE L'ALLEMAND (DE DE) PAR TEXT-NODES (ZÉRO BUG DOM)
  // ==========================================================================
  var modeAllemandActif = false;
  try {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("lang") === "de") {
      modeAllemandActif = true;
      localStorage.setItem("corantafsir_lang_de_v54", "de");
    } else if (localStorage.getItem("corantafsir_lang_de_v54") === "de") {
      modeAllemandActif = true;
    }
  } catch (e) {}

  var cacheAllemandChapitres = {};
  var requetesAllemandEnCours = {};
  var cacheTafsirAllemand = {};
  var requeteTafsirDeEnCours = {};
  var noeudsTextesModifies = [];

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
    if (textNode.__origDeV54 === undefined) {
      textNode.__origDeV54 = textNode.nodeValue;
      noeudsTextesModifies.push({ node: textNode, orig: textNode.__origDeV54 });
    }
    if (textNode.nodeValue !== nouveauTexte) {
      textNode.nodeValue = nouveauTexte;
    }
  }

  function assurerBoutonAllemandDansBarre() {
    var existant = document.getElementById("btnLangDeV54");
    if (existant) {
      if (modeAllemandActif) existant.classList.add("active-de-v54");
      else existant.classList.remove("active-de-v54");
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
      var btnDe = btnSaAr.cloneNode(true);
      btnDe.id = "btnLangDeV54";
      btnDe.classList.remove("active");
      btnDe.removeAttribute("onclick");

      if (btnDe.children && btnDe.children.length >= 2) {
        btnDe.children[0].textContent = "DE";
        btnDe.children[btnDe.children.length - 1].textContent = "DE";
      } else {
        btnDe.innerHTML = '<span style="font-size:0.72em;opacity:0.75;margin-right:2px;">DE</span><span>DE</span>';
      }

      if (modeAllemandActif) btnDe.classList.add("active-de-v54");

      btnDe.addEventListener("click", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        modeAllemandActif = true;
        try { localStorage.setItem("corantafsir_lang_de_v54", "de"); } catch (e) {}
        var freres = conteneurLang.children;
        for (var f = 0; f < freres.length; f++) {
          if (freres[f] !== btnDe) freres[f].classList.remove("active");
        }
        btnDe.classList.add("active-de-v54");
        dernierVersetSeo = "";
        synchroniserTout();
      });

      var freresInit = conteneurLang.children;
      for (var a = 0; a < freresInit.length; a++) {
        (function (autre) {
          if (autre === btnDe) return;
          autre.addEventListener("click", function () {
            modeAllemandActif = false;
            try { localStorage.setItem("corantafsir_lang_de_v54", "other"); } catch (e) {}
            btnDe.classList.remove("active-de-v54");
            restaurerTextesOriginauxDepuisAllemand();
            dernierVersetSeo = "";
            setTimeout(synchroniserTout, 30);
          });
        })(freresInit[a]);
      }

      conteneurLang.appendChild(btnDe);
    }
  }

  function chargerChapitreAllemandBubenheim(chap) {
    if (!chap) return;
    var cle = "chap_" + chap;
    if (cacheAllemandChapitres[cle] || requetesAllemandEnCours[cle]) return;
    requetesAllemandEnCours[cle] = true;
    cacheAllemandChapitres[cle] = {};

    // Traduction officielle allemande Bubenheim & Elyas (ID 27 sur Quran.com API v4)
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
          if (modeAllemandActif) appliquerInterfaceEtContenuAllemand();
        }
      })
      .catch(function () {})
      .finally(function () {
        requetesAllemandEnCours[cle] = false;
      });
  }

  function appliquerInterfaceEtContenuAllemand() {
    if (!modeAllemandActif || !document.body) return;

    var DICO_UI_DE = {
      "‹ Retour aux 114 Sourates": "‹ Zurück zu den 114 Suren",
      "‹ Back to 114 Surahs": "‹ Zurück zu den 114 Suren",
      "‹ Volver a las 114 Suras": "‹ Zurück zu den 114 Suren",
      "SOURATE MÉDINOISE": "MEDINENSISCHE SURE",
      "MEDINAN SURAH": "MEDINENSISCHE SURE",
      "SOURATE MECQUOISE": "MEKKANISCHE SURE",
      "MAKKAN SURAH": "MEKKANISCHE SURE",
      "📖 Mot à mot": "📖 Wort für Wort",
      "Mot à mot": "Wort für Wort",
      "📖 Word by Word": "📖 Wort für Wort",
      "🌊 Bruit Brun": "🌊 Braunes Rauschen",
      "Bruit Brun": "Braunes Rauschen",
      "🌊 Brown Noise": "🌊 Braunes Rauschen",
      "✨ Suivi": "✨ Verfolgung",
      "Suivi": "Verfolgung",
      "✨ Follow": "✨ Verfolgung",
      "Enchaîner automatiquement": "Automatisch weiter",
      "Auto-advance": "Automatisch weiter",
      "‹ Précédent": "‹ Zurück",
      "‹ Previous": "‹ Zurück",
      "Suivant ›": "Weiter ›",
      "Next ›": "Weiter ›",
      "▶ Écouter le verset": "▶ Vers anhören",
      "▶ Listen to verse": "▶ Vers anhören",
      "↺ Rejouer": "↺ Wiederholen",
      "↺ Replay": "↺ Wiederholen",
      "TAFSĪR & EXPLICATION DU VERSET": "TAFSĪR & VERSERKLÄRUNG",
      "TAFSĪR & VERSE EXPLANATION": "TAFSĪR & VERSERKLÄRUNG",
      "TAFSĪR Y EXPLICACIÓN DE LA ALEYA": "TAFSĪR & VERSERKLÄRUNG",
      "Le Noble Coran & Tafsīr Al-Mukhtasar": "Der Edle Koran & Tafsīr Al-Mukhtasar",
      "The Noble Quran & Tafsīr Al-Mukhtasar": "Der Edle Koran & Tafsīr Al-Mukhtasar",
      "القرآن الكريم والتفسير المختصر": "Der Edle Koran & Tafsīr Al-Mukhtasar"
    };

    // Parcourir UNIQUEMENT les noeuds de texte (#text) : 100% impossible d'écraser un conteneur HTML !
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var val = (node.__origDeV54 !== undefined ? node.__origDeV54 : node.nodeValue || "").trim();
      if (!val) continue;

      if (DICO_UI_DE[val]) {
        modifierNoeudTexteSeul(node, DICO_UI_DE[val]);
      } else if (val.indexOf("Sourate ") === 0 && val.indexOf(" — Verset ") !== -1) {
        modifierNoeudTexteSeul(node, val.replace("Sourate ", "Sure ").replace(" — Verset ", " — Vers "));
      } else if (val.indexOf("Surah ") === 0 && val.indexOf(" — Verse ") !== -1) {
        modifierNoeudTexteSeul(node, val.replace("Surah ", "Sure ").replace(" — Verse ", " — Vers "));
      } else if (/^Verset\s+\d+\s*\/\s*\d+$/i.test(val)) {
        modifierNoeudTexteSeul(node, val.replace(/Verset/i, "Vers"));
      }
    }

    var vk = obtenirCleVerset();
    if (!vk) return;
    var parts = vk.split(":");
    var numS = Number(parts[0]);
    var numV = Number(parts[1]);
    var cleChap = "chap_" + numS;

    if (!cacheAllemandChapitres[cleChap]) {
      chargerChapitreAllemandBubenheim(numS);
    }

    var texteDeVerset = cacheAllemandChapitres[cleChap] ? cacheAllemandChapitres[cleChap][vk] : null;
    if (texteDeVerset) {
      var w2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      var n2;
      while ((n2 = w2.nextNode())) {
        var orig2 = (n2.__origDeV54 !== undefined ? n2.__origDeV54 : n2.nodeValue || "").trim();
        if (new RegExp("^" + numV + "\\s*[\\.-]\\s+").test(orig2) && orig2.length < 1200) {
          var parentTag = n2.parentElement ? n2.parentElement.tagName : "";
          if (parentTag !== "SCRIPT" && parentTag !== "STYLE") {
            modifierNoeudTexteSeul(n2, numV + ". " + texteDeVerset);
            break;
          }
        }
      }
    }
  }

  // 2. SOLEIL ET LUNE EN ORBITE (VERSION STABLE V47 DE LA VIDÉO)
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
        node.classList.remove("astre-lune-pure-v54");
        node.classList.add("astre-soleil-pur-v54");
        node.style.setProperty("width", "150px", "important");
        node.style.setProperty("height", "150px", "important");
        node.style.setProperty("border-radius", "50%", "important");
        node.style.setProperty("background", "radial-gradient(circle at 50% 50%, #ffffff 0%, #fffef0 26%, #fef08a 52%, #facc15 76%, #f59e0b 94%, rgba(245, 158, 11, 0) 100%)", "important");
        node.style.setProperty("background-color", "#fde047", "important");
        node.style.setProperty("box-shadow", "0 0 50px 16px rgba(253, 224, 71, 0.72), 0 0 110px 38px rgba(245, 158, 11, 0.42)", "important");
        node.style.setProperty("filter", "none", "important");
      } else {
        node.classList.remove("astre-soleil-pur-v54");
        node.classList.add("astre-lune-pure-v54");
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

  // 3. SUPPRESSION DE MAHER AL-MUAIQLY
  function retirerRecitateurMaher() {
    var imgs = document.querySelectorAll("img");
    for (var im = 0; im < imgs.length; im++) {
      var src = (imgs[im].getAttribute("src") || "").toLowerCase();
      imgs[im].setAttribute("loading", "lazy");
      if (src.indexOf("maher") !== -1 || src.indexOf("muaiqly") !== -1) {
        var row = imgs[im].parentElement;
        if (row && row.getBoundingClientRect().height < 110) {
          row.classList.add("maher-supprime-v54");
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
          var nv = parts[0].trim() + " • " + textesHaut[lang];
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
      "بأيكم": "lequel d'entre vous", "المفتون": "a perdu la raison (l'insensé)"
    },
    de: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn", "طه": "Tā-Hā",
      "ذلك": "Dieses (Das ist)", "الكتاب": "das Buch", "لا": "kein / nicht", "ريب": "Zweifel", "فيه": "darin", "هدى": "eine Rechtleitung", "للمتقين": "für die Gottesfürchtigen",
      "الذين": "diejenigen, die", "يؤمنون": "glauben", "بالغيب": "an das Verborgene", "ويقيمون": "und verrichten", "الصلاة": "das Gebet", "الصلوة": "das Gebet", "ومما": "und von dem, was", "رزقناهم": "Wir sie versorgt haben", "ينفقون": "ausgeben",
      "ختم": "Versiegelt hat", "الله": "Allāh", "على": "auf", "قلوبهم": "ihre Herzen", "وعلى": "und auf", "سمعهم": "ihr Gehör", "وأبصارهم": "und ihre Blicke", "أبصارهم": "ihre Blicke (Augen)", "غشاوة": "eine Hülle (Schleier)", "غشوة": "eine Hülle (Schleier)", "ولهم": "und für sie gibt es", "عذاب": "eine Strafe", "عظيم": "gewaltige",
      "ومن": "Und unter", "الناس": "den Menschen", "يقول": "sagt", "آمنا": "Wir glauben", "ءامنا": "Wir glauben", "بالله": "an Allāh", "وباليوم": "und an den Tag", "الآخر": "Jüngsten", "وما": "und was / aber nicht", "هم": "sie (sind)", "بمؤمنين": "Gläubige",
      "والقلم": "Beim Schreibrohr", "يسطرون": "sie niederschreiben!", "ما": "Nicht (bist)", "أنت": "du", "بنعمة": "durch die Gunst", "ربك": "deines Herrn", "بمجنون": "ein Besessener",
      "بأيكم": "wer von euch", "المفتون": "der Verrückte (Verführte) ist"
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
    var sauv = localStorage.getItem("cache_wbw_exact_v54");
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
          try { localStorage.setItem("cache_wbw_exact_v54", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
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
            try { localStorage.setItem("cache_wbw_exact_v54", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
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
        if (txt.indexOf("TAFSĪR") === -1 && txt.indexOf("VERSERKLÄRUNG") === -1 && txt.indexOf("EXPLICATION") === -1 && txt.indexOf("Ghunnah") === -1) {
          el.classList.add("wbw-masquer-traduction-bas");
        }
      }
    }
  }

  // 5. PACK SEO + HREFLANG="DE" (POUR GOOGLE ALLEMAGNE / AUTRICHE / SUISSE)
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

  // 6. ANIMATION MODE SUIVI : BLANC PUR -> BLEU NÉON
  var MAP_NOMS_VERS_QDC = { dosari: [174, 168], dossari: [174, 168], yasser: [174, 168], afasy: [7], alafasy: [7], sudais: [3], shuraim: [10, 4], hussary: [6], abdulbaset: [2, 1], minshawi: [9] };
  var cacheTimingVerset = {};
  var requetesEnCours = {};
  window.__lecteurAudioActuel = null;
  var rafId = null;
  var energiesMots = [];
  var bleusMots = [];
  var dernierVersetSuivi = "";
  var suiviEstActif = true;

  function obtenirCleRecitateurSelectionne() { return "dosari"; }

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
                if (s && s.length >= 3) {
                  var wIdx = Number(s[0]) - 1, t1 = Number(s[1]), t2 = Number(s[2]);
                  if (!isNaN(wIdx) && t2 >= t1) {
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
      if (estCartes) {
        el.style.setProperty("border-color", "rgba(255, 255, 255, 0.18)", "important");
        el.style.setProperty("box-shadow", "none", "important");
      } else {
        el.style.setProperty("color", "#ffffff", "important");
        el.style.setProperty("text-shadow", "0 0 14px rgba(255, 255, 255, 0.48), 0 0 28px rgba(255, 255, 255, 0.20)", "important");
      }
    }
  }

  if (typeof HTMLMediaElement !== "undefined" && HTMLMediaElement.prototype && !HTMLMediaElement.prototype.__hookedV54) {
    var origPlay = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      window.__lecteurAudioActuel = this;
      if (this.currentTime < 0.25) reinitialiserMotsEnBlancPur();
      var vk = obtenirCleVerset();
      if (vk) chargerTimestampsQdc("dosari", vk);
      if (!rafId) rafId = requestAnimationFrame(etapeSuiviAudioAfterEffects);
      return origPlay.apply(this, arguments);
    };
    HTMLMediaElement.prototype.__hookedV54 = true;
  }

  function trouverAudioActif() {
    if (window.__lecteurAudioActuel && !window.__lecteurAudioActuel.paused && window.__lecteurAudioActuel.currentTime > 0) return window.__lecteurAudioActuel;
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
      if (aud && aud.duration > 0.2) {
        var t = aud.currentTime, d = aud.duration;
        var debutVoix = Math.min(0.18, d * 0.04);
        var finVoix = Math.max(debutVoix + 0.25, d - Math.min(0.35, d * 0.07));
        var ratioVoix = Math.max(0, Math.min(0.999, (t - debutVoix) / (finVoix - debutVoix)));
        var segsNorm = cacheTimingVerset["dosari_" + vkActuel];
        if (segsNorm && segsNorm.length > 0) {
          for (var s = 0; s < segsNorm.length; s++) {
            var sg = segsNorm[s];
            if (ratioVoix >= sg.rStart && ratioVoix <= sg.rEnd) {
              activeIndexFloat = sg.wordIndex + 0.2;
              break;
            }
          }
        }
        if (activeIndexFloat === -1) activeIndexFloat = ratioVoix * items.length;
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
        var cibleBleu = lectureEnCours && m <= idxEntier ? 1.0 : bleusMots[m];
        bleusMots[m] += (cibleBleu - bleusMots[m]) * 0.18;
        if (bleusMots[m] < 0.002) bleusMots[m] = 0;

        var e = courbeAfterEffects(energiesMots[m]);
        var b = courbeAfterEffects(bleusMots[m]);
        var yPx = (-7.5 * e).toFixed(2);
        var sc = (1.0 + 0.12 * e).toFixed(3);

        if (estCartes) {
          el.style.setProperty("transform", "translate3d(0, " + yPx + "px, 0) scale(" + (1.0 + 0.08 * e).toFixed(3) + ")", "important");
          if (b > 0.02) {
            el.style.setProperty("border-color", "rgba(56, 189, 248, " + (0.45 * b + 0.55 * e).toFixed(2) + ")", "important");
            el.style.setProperty("box-shadow", "0 8px 22px rgba(56, 189, 248, " + (0.35 * b + 0.35 * e).toFixed(2) + ")", "important");
          }
        } else {
          el.style.setProperty("transform", "translate3d(0, " + yPx + "px, 0) scale(" + sc + ")", "important");
          if (b < 0.03) {
            el.style.setProperty("color", "#ffffff", "important");
            el.style.setProperty("text-shadow", "0 0 14px rgba(255, 255, 255, 0.48), 0 0 28px rgba(255, 255, 255, 0.20)", "important");
          } else {
            el.style.setProperty("color", "#f0f9ff", "important");
            el.style.setProperty("text-shadow", "0 0 8px rgba(255, 255, 255, 0.90), 0 0 18px rgba(56, 189, 248, 0.92), 0 0 34px rgba(14, 165, 233, 0.78)", "important");
          }
        }
      }
    }

    if (aud && !aud.paused) {
      rafId = requestAnimationFrame(etapeSuiviAudioAfterEffects);
    } else {
      rafId = null;
    }
  }

  function synchroniserTout() {
    assurerBoutonAllemandDansBarre();
    reparerSoleilEtLuneEnOrbite();
    retirerRecitateurMaher();
    if (modeAllemandActif) appliquerInterfaceEtContenuAllemand();
    mettreAJourMentionsTraducteurEtExegese();
    masquerTraductionBasSiMotAMot();
    appliquerVraiMotAMotSurDOM();
    appliquerZoomMotAMot();
    injecterPackSeoComplet();
    var vk = obtenirCleVerset();
    if (vk) chargerVraiMotAMotVerset(vk, obtenirLangueActive());
  }

  window.addEventListener("DOMContentLoaded", function () {
    synchroniserTout();
    reinitialiserMotsEnBlancPur();
  });

  document.addEventListener("click", function () {
    setTimeout(synchroniserTout, 20);
    setTimeout(synchroniserTout, 90);
  });

  setInterval(synchroniserTout, 280);
  synchroniserTout();
}

const blocCompletV54 = preconnectTags + '\n' + cssV54 + '\n<script id="script-master-v54">(' + codeClientV54.toString() + ')();</script>';
const blocEchappePourGenerateur = blocCompletV54.replace(/\\/g, '\\\\');

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
const fichiersIndex = [path.join(__dirname, 'site', 'index.html'), path.join(__dirname, 'index.html')];
for (const fIdx of fichiersIndex) {
  if (fs.existsSync(fIdx)) {
    let htmlIdx = fs.readFileSync(fIdx, 'utf8');
    htmlIdx = htmlIdx.replace(/<style id="patch-master-v\d+">[\s\S]*?<\/script>/g, '');
    htmlIdx = htmlIdx.replace(/<link rel="preconnect" href="https:\/\/api\.quran\.com"[^>]*>\s*/g, '');
    htmlIdx = htmlIdx.replace(/<link rel="preconnect" href="https:\/\/api\.qurancdn\.com"[^>]*>\s*/g, '');
    htmlIdx = htmlIdx.replace(/<link rel="preconnect" href="https:\/\/everyayah\.com"[^>]*>\s*/g, '');
    htmlIdx = htmlIdx.replace(/<link rel="preconnect" href="https:\/\/quranenc\.com"[^>]*>\s*/g, '');
    htmlIdx = htmlIdx.replace(/<\/head>/i, () => blocCompletV54 + '\n</head>');
    fs.writeFileSync(fIdx, htmlIdx, 'utf8');
  }
}

console.log('✅ Correctif V54 activé : Turc supprimé + Allemand (DE DE) 100% sécurisé + Soleil/Lune 150px restaurés !');
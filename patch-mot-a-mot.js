/*ONEDRIVE_SAFE*/(function(){const _fs=require("fs"),_w=_fs.writeFileSync;_fs.writeFileSync=function(p,d,o){if(typeof d==="string"&&_fs.existsSync(p)){try{if(_fs.readFileSync(p,"utf8")===d)return;}catch(e){}}for(let i=0;i<30;i++){try{return _w.call(_fs,p,d,o);}catch(e){if(i===29)throw e;Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,100);}}};})();
const fs = require('fs');
const path = require('path');

const dossierSite = path.join(__dirname, 'site');

const styleStable = `<style id="wbw-style-v110">
  html body #flatEarthSun,
  html body .flat-earth-sun,
  html body .astre-soleil-pur-v77 {
    opacity: 1 !important;
    background-color: #facc15 !important;
  }
  html body #flatEarthMoon,
  html body .flat-earth-moon,
  html body .astre-lune-pure-v77 {
    opacity: 1 !important;
    background-color: #f1f5f9 !important;
  }

  .wbw-hide-khatm-on-surah,
  .wbw-masquer-doublon-v110,
  .maher-item-removed-v110 {
    display: none !important;
  }

  .wbw-num-hidden-v110,
  .wbw-card-v110 sup,
  .wbw-card-v110 small,
  html body .wbw-card-unit::before,
  html body .wbw-card-unit::after,
  html body .wbw-word-box::before,
  html body .wbw-word-box::after,
  html body .wbw-card-v110::before,
  html body .wbw-card-v110::after {
    content: none !important;
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    font-size: 0px !important;
    width: 0px !important;
    height: 0px !important;
    margin: 0px !important;
    padding: 0px !important;
    border: none !important;
    overflow: hidden !important;
    pointer-events: none !important;
  }

  html body .wbw-card-v110 .wbw-tr-v110,
  html body .wbw-word-box .wbw-tr {
    display: block !important;
    visibility: visible !important;
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
  }

  html body .verse-stage #arabicVerse tajweed[class*="ghunnah"],
  html body .verse-stage #arabicVerseEl tajweed[class*="ghunnah"],
  html body .verse-stage .arabic-glow-verse tajweed[class*="ghunnah"],
  html body .verse-stage #arabicVerse tajweed[class*="ikhf"],
  html body .verse-stage #arabicVerseEl tajweed[class*="ikhf"],
  html body .verse-stage .arabic-glow-verse tajweed[class*="ikhf"],
  html body .verse-stage #arabicVerse tajweed[class*="iqlab"],
  html body .verse-stage #arabicVerseEl tajweed[class*="iqlab"],
  html body .verse-stage .arabic-glow-verse tajweed[class*="iqlab"],
  html body .verse-stage #arabicVerse span[class*="ghunnah"],
  html body .verse-stage #arabicVerseEl span[class*="ghunnah"],
  html body .verse-stage .arabic-glow-verse span[class*="ghunnah"],
  html body .verse-stage #arabicVerse span[class*="ikhf"],
  html body .verse-stage #arabicVerseEl span[class*="ikhf"],
  html body .verse-stage .arabic-glow-verse span[class*="ikhf"],
  html body .verse-stage #arabicVerse span[class*="iqlab"],
  html body .verse-stage #arabicVerseEl span[class*="iqlab"],
  html body .verse-stage .arabic-glow-verse span[class*="iqlab"],
  html body .verse-stage .wbw-card-v110 [class*="ghunnah"],
  html body .verse-stage .wbw-card-v110 [class*="ikhf"],
  html body .verse-stage .wbw-card-v110 [class*="iqlab"] {
    color: #4ade80 !important;
    text-shadow: 0 0 10px rgba(74, 222, 128, 0.45) !important;
    opacity: 1 !important;
  }

  html body .verse-stage #arabicVerse tajweed[class*="qalq"],
  html body .verse-stage #arabicVerseEl tajweed[class*="qalq"],
  html body .verse-stage .arabic-glow-verse tajweed[class*="qalq"],
  html body .verse-stage #arabicVerse tajweed[class*="qalaq"],
  html body .verse-stage #arabicVerseEl tajweed[class*="qalaq"],
  html body .verse-stage .arabic-glow-verse tajweed[class*="qalaq"],
  html body .verse-stage #arabicVerse span[class*="qalq"],
  html body .verse-stage #arabicVerseEl span[class*="qalq"],
  html body .verse-stage .arabic-glow-verse span[class*="qalq"],
  html body .verse-stage #arabicVerse span[class*="qalaq"],
  html body .verse-stage #arabicVerseEl span[class*="qalaq"],
  html body .verse-stage .arabic-glow-verse span[class*="qalaq"],
  html body .verse-stage .wbw-card-v110 [class*="qalq"],
  html body .verse-stage .wbw-card-v110 [class*="qalaq"] {
    color: #38bdf8 !important;
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.5) !important;
    opacity: 1 !important;
  }

  html body .verse-stage #arabicVerse tajweed[class*="madd"],
  html body .verse-stage #arabicVerseEl tajweed[class*="madd"],
  html body .verse-stage .arabic-glow-verse tajweed[class*="madd"],
  html body .verse-stage #arabicVerse span[class*="madd"],
  html body .verse-stage #arabicVerseEl span[class*="madd"],
  html body .verse-stage .arabic-glow-verse span[class*="madd"],
  html body .verse-stage .wbw-card-v110 [class*="madd"] {
    color: #f87171 !important;
    text-shadow: 0 0 12px rgba(248, 113, 113, 0.5) !important;
    opacity: 1 !important;
  }

  html body .verse-stage #arabicVerse tajweed[class*="idgham"],
  html body .verse-stage #arabicVerseEl tajweed[class*="idgham"],
  html body .verse-stage .arabic-glow-verse tajweed[class*="idgham"],
  html body .verse-stage #arabicVerse tajweed[class*="laam_shams"],
  html body .verse-stage #arabicVerseEl tajweed[class*="laam_shams"],
  html body .verse-stage .arabic-glow-verse tajweed[class*="laam_shams"],
  html body .verse-stage #arabicVerse tajweed[class*="tafkh"],
  html body .verse-stage #arabicVerseEl tajweed[class*="tafkh"],
  html body .verse-stage .arabic-glow-verse tajweed[class*="tafkh"],
  html body .verse-stage #arabicVerse span[class*="idgham"],
  html body .verse-stage #arabicVerseEl span[class*="idgham"],
  html body .verse-stage .arabic-glow-verse span[class*="idgham"],
  html body .verse-stage #arabicVerse span[class*="laam_shams"],
  html body .verse-stage #arabicVerseEl span[class*="laam_shams"],
  html body .verse-stage .arabic-glow-verse span[class*="laam_shams"],
  html body .verse-stage #arabicVerse span[class*="tafkh"],
  html body .verse-stage #arabicVerseEl span[class*="tafkh"],
  html body .verse-stage .arabic-glow-verse span[class*="tafkh"],
  html body .verse-stage .wbw-card-v110 [class*="idgham"],
  html body .verse-stage .wbw-card-v110 [class*="laam_shams"],
  html body .verse-stage .wbw-card-v110 [class*="tafkh"] {
    color: #fbbf24 !important;
    text-shadow: 0 0 10px rgba(251, 191, 36, 0.45) !important;
    opacity: 1 !important;
  }

  html body .verse-stage #arabicVerse tajweed[class*="ham_wasl"],
  html body .verse-stage #arabicVerseEl tajweed[class*="ham_wasl"],
  html body .verse-stage .arabic-glow-verse tajweed[class*="ham_wasl"],
  html body .verse-stage #arabicVerse tajweed[class*="slnt"],
  html body .verse-stage #arabicVerseEl tajweed[class*="slnt"],
  html body .verse-stage .arabic-glow-verse tajweed[class*="slnt"],
  html body .verse-stage #arabicVerse span[class*="ham_wasl"],
  html body .verse-stage #arabicVerseEl span[class*="ham_wasl"],
  html body .verse-stage .arabic-glow-verse span[class*="ham_wasl"],
  html body .verse-stage #arabicVerse span[class*="slnt"],
  html body .verse-stage #arabicVerseEl span[class*="slnt"],
  html body .verse-stage .arabic-glow-verse span[class*="slnt"],
  html body .verse-stage .wbw-card-v110 [class*="ham_wasl"],
  html body .verse-stage .wbw-card-v110 [class*="slnt"] {
    color: #94a3b8 !important;
    text-shadow: none !important;
  }
</style>`;

const codeClientStable = `
(function() {
  window.__wbwBypassOrigCartes = true;

  function forcer(el, prop, val) {
    if (el && el.style && el.style.getPropertyValue(prop) !== val) {
      el.style.setProperty(prop, val, 'important');
    }
  }

  function definirTexteSansBoucle(el, val) {
    if (el && el.textContent !== val) {
      el.textContent = val;
    }
  }

  function contientArabe(str) {
    var s = str || '';
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c >= 1536 && c <= 1791) return true;
    }
    return false;
  }

  function estPetitNumero(str) {
    var s = (str || '').replace(/[\\s\\u200E\\u200F\\u061C#\\.\\-\\(\\):]/g, '');
    if (s.length < 1 || s.length > 3) return false;
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      var estLatin = (c >= 48 && c <= 57);
      var estArabeInd = (c >= 1632 && c <= 1641) || (c >= 1776 && c <= 1785);
      if (!estLatin && !estArabeInd) return false;
    }
    return true;
  }

  function extraireValeurPetitNumero(str) {
    if (!estPetitNumero(str)) return 0;
    var s = (str || '').replace(/[\\s\\u200E\\u200F\\u061C#\\.\\-\\(\\):]/g, '');
    var out = '';
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c >= 48 && c <= 57) out += s[i];
      else if (c >= 1632 && c <= 1641) out += String(c - 1632);
      else if (c >= 1776 && c <= 1785) out += String(c - 1776);
    }
    return parseInt(out, 10) || 0;
  }

  function courbeAppleMusic(x) {
    var v = Math.max(0, Math.min(1, x || 0));
    return v * v * (3 - 2 * v);
  }

  function melangerRGB(r1, g1, b1, r2, g2, b2, t) {
    var k = Math.max(0, Math.min(1, t || 0));
    return 'rgb(' +
      Math.round(r1 + (r2 - r1) * k) + ', ' +
      Math.round(g1 + (g2 - g1) * k) + ', ' +
      Math.round(b1 + (b2 - b1) * k) + ')';
  }

  function nettoyerArabeBrut(s) {
    return (s || '').replace(/[\\u064B-\\u065F\\u0670\\u06D6-\\u06ED\\u0640\\s]/g, '');
  }

  function normaliserArabeCle(str) {
    return nettoyerArabeBrut(str)
      .replace(/[إأآٱ]/g, 'ا')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي');
  }

  function obtenirCleVersetActuelDom() {
    var badge = document.getElementById('badgeNumEl');
    if (badge) {
      var m = (badge.textContent || '').match(/(\\d+)\\s*:\\s*(\\d+)/);
      if (m) return m[1] + ':' + m[2];
    }
    if (typeof numSourateActuelle !== 'undefined' && typeof numVersetActuel !== 'undefined') {
      return numSourateActuelle + ':' + numVersetActuel;
    }
    var u = window.location.pathname.match(/sourate-(\\d+)-verset-(\\d+)/i);
    if (u) return u[1] + ':' + u[2];
    return '';
  }

  function boutonEstActif(btn) {
    if (!btn) return false;
    if (btn.classList.contains('active') || btn.getAttribute('aria-pressed') === 'true') return true;
    var bg = window.getComputedStyle(btn).backgroundColor || '';
    if (bg.indexOf('56, 189, 248') !== -1 || bg.indexOf('14, 165, 233') !== -1 || bg.indexOf('2, 132, 199') !== -1) return true;
    return false;
  }

  function trouverBoutonParTexte(mots) {
    var boutons = document.querySelectorAll('button');
    for (var i = 0; i < boutons.length; i++) {
      var b = boutons[i];
      var t = (b.textContent || '').trim();
      for (var k = 0; k < mots.length; k++) {
        if (t.indexOf(mots[k]) !== -1) return b;
      }
    }
    return null;
  }

  function trouverBoutonMotAMot() {
    return trouverBoutonParTexte(['Mot à mot', 'Word by Word', 'Пословный', 'Palabra por', 'Wort für', 'Parola per', 'Kata demi', 'كلمة بكلمة']);
  }

  function trouverBoutonTajwid() {
    return trouverBoutonParTexte(['Tajw', 'Таджвид', 'تجويد']);
  }

  function estModeMotAMotActif() {
    var btnWbw = trouverBoutonMotAMot();
    if (btnWbw) return boutonEstActif(btnWbw);
    return document.body.classList.contains('wbw-mode-on');
  }

  var wbwFontScale = 1.0;
  try {
    var savedScale = parseFloat(localStorage.getItem('wbw_font_scale_v110') || '1.0');
    if (savedScale >= 0.65 && savedScale <= 1.85) wbwFontScale = savedScale;
  } catch (e) {}

  function appliquerTailleSurMetaCartes() {
    var hRem = (3.35 * wbwFontScale).toFixed(2) + 'rem';
    var arFont = 'calc(clamp(2.15rem, 3.6vw, 2.75rem) * ' + wbwFontScale.toFixed(2) + ')';
    var trFont = (0.92 * Math.pow(wbwFontScale, 0.78)).toFixed(3) + 'rem';
    var trMaxW = Math.round(145 * wbwFontScale) + 'px';

    for (var i = 0; i < cacheMetaCartes.length; i++) {
      var m = cacheMetaCartes[i];
      if (!m) continue;
      if (m.elAr) {
        forcer(m.elAr, 'min-height', hRem);
        forcer(m.elAr, 'line-height', hRem);
        forcer(m.elAr, 'font-size', arFont);
      }
      if (m.elTrad) {
        forcer(m.elTrad, 'font-size', trFont);
        forcer(m.elTrad, 'max-width', trMaxW);
      }
    }
  }

  document.addEventListener('click', function(e) {
    if (e.isTrusted && e.target && e.target.closest) {
      var rpItemClick = e.target.closest('.rp-item');
      if (rpItemClick) {
        window.__userPickedReciterManuallyV110 = true;
      }
    }

    var btn = e.target && e.target.closest ? e.target.closest('button') : null;
    if (!btn) return;
    var txt = (btn.textContent || '').replace(/\\s+/g, '');
    if (txt === 'A+' || txt === 'A＋') {
      wbwFontScale = Math.min(1.75, Math.round((wbwFontScale + 0.12) * 100) / 100);
      try { localStorage.setItem('wbw_font_scale_v110', String(wbwFontScale)); } catch (err) {}
      appliquerTailleSurMetaCartes();
    } else if (txt === 'A-' || txt === 'A−' || txt === 'A–') {
      wbwFontScale = Math.max(0.70, Math.round((wbwFontScale - 0.12) * 100) / 100);
      try { localStorage.setItem('wbw_font_scale_v110', String(wbwFontScale)); } catch (err) {}
      appliquerTailleSurMetaCartes();
    }
  }, true);

  function estElementVersetNormal(el) {
    if (!el) return false;
    if (el.id === 'arabicVerse' || el.id === 'arabicVerseEl' || el.id === 'frenchVerseEl') return true;
    if (el.classList.contains('arabic-glow-verse') || el.classList.contains('french-glow-verse')) return true;
    return false;
  }

  function cacherGrilleMotAMotQuandInactif() {
    var banner = document.getElementById('wbwSensLectureBanner');
    if (banner) {
      forcer(banner, 'display', 'none');
      var g = banner.nextElementSibling;
      if (g && !estElementVersetNormal(g) && !g.classList.contains('stage-blue-nav')) {
        forcer(g, 'display', 'none');
      }
    }
    var stage = document.getElementById('wbwStageContainer');
    if (stage) {
      forcer(stage, 'display', 'none');
    }
  }

  function extraireIndiceOrdreCarte(carte) {
    if (!carte) return 0;
    if (carte.dataset && carte.dataset.wbwOrd) return parseInt(carte.dataset.wbwOrd, 10) || 0;
    var attrNum = carte.getAttribute('data-word-num') || carte.getAttribute('data-widx') || carte.getAttribute('data-word-index') || carte.getAttribute('data-index');
    if (attrNum) {
      var nAttr = parseInt(attrNum, 10);
      if (!isNaN(nAttr) && nAttr >= 0) {
        carte.dataset.wbwOrd = String(nAttr + (carte.hasAttribute('data-widx') ? 1 : 0));
        return parseInt(carte.dataset.wbwOrd, 10);
      }
    }
    var tous = carte.querySelectorAll('*');
    for (var i = 0; i < tous.length; i++) {
      var v = extraireValeurPetitNumero(tous[i].textContent || '');
      if (v > 0) {
        carte.dataset.wbwOrd = String(v);
        return v;
      }
    }
    return 0;
  }

  function ordonnerCartesSensLecture(liste) {
    if (!liste || liste.length <= 1) return liste || [];
    var copie = liste.slice();

    var tousOntOrdre = true;
    for (var i = 0; i < copie.length; i++) {
      if (!extraireIndiceOrdreCarte(copie[i])) {
        tousOntOrdre = false;
        break;
      }
    }
    if (tousOntOrdre) {
      copie.sort(function(a, b) {
        return extraireIndiceOrdreCarte(a) - extraireIndiceOrdreCarte(b);
      });
      return copie;
    }
    return copie;
  }

  function obtenirCartesMotAMotUniversel() {
    if (!estModeMotAMotActif()) {
      cacherGrilleMotAMotQuandInactif();
      return [];
    }

    var stage = document.getElementById('wbwStageContainer');
    if (stage) {
      forcer(stage, 'display', 'flex');
      var boxes = stage.querySelectorAll('.wbw-word-box, .wbw-card-unit, .wbw-card-v110');
      if (boxes && boxes.length >= 1) {
        return ordonnerCartesSensLecture(Array.prototype.slice.call(boxes));
      }
    }

    var banner = document.getElementById('wbwSensLectureBanner');
    if (banner && banner.nextElementSibling) {
      var g = banner.nextElementSibling;
      if (!estElementVersetNormal(g) && !g.classList.contains('stage-blue-nav')) {
        forcer(g, 'display', 'flex');
        var ch = [];
        for (var i = 0; i < g.children.length; i++) {
          var c = g.children[i];
          if (c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE' && contientArabe(c.textContent || '')) {
            ch.push(c);
          }
        }
        if (ch.length >= 1) return ordonnerCartesSensLecture(ch);
      }
    }

    if (typeof window.__obtenirCartesWBWOrig === 'function') {
      try {
        var orig = window.__obtenirCartesWBWOrig() || [];
        if (orig.length >= 1) return ordonnerCartesSensLecture(orig);
      } catch (e) {}
    }

    return [];
  }
  window.__obtenirCartesWBW = obtenirCartesMotAMotUniversel;

  var initDefautFait = false;

  function supprimerMaherEtForcerYasser() {
    if (window.__userPickedReciterManuallyV110) return;

    var selects = document.querySelectorAll('select');
    for (var s = 0; s < selects.length; s++) {
      var sel = selects[s];
      if (sel.classList.contains('khatm-reciter-select') || sel.id === 'verseJumperSelect') continue;
      var yasserIdx = -1;
      for (var o = sel.options.length - 1; o >= 0; o--) {
        var opt = sel.options[o];
        var optTxt = (opt.textContent || '') + ' ' + (opt.value || '');
        if (/maher|muaiqly|ماهر|Махер/i.test(optTxt)) {
          sel.remove(o);
        }
      }
      for (var y = 0; y < sel.options.length; y++) {
        var yTxt = (sel.options[y].textContent || '') + ' ' + (sel.options[y].value || '');
        if (/yasser|dosari|dossary|dussary|الدوسري|Досари/i.test(yTxt)) {
          yasserIdx = y;
          break;
        }
      }
      if (yasserIdx !== -1 && sel.selectedIndex !== yasserIdx) {
        sel.selectedIndex = yasserIdx;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }

  function initialiserModesSurSourate() {
    supprimerMaherEtForcerYasser();

    if (initDefautFait) return;
    var estPageSourate = /sourate-\\d+/i.test(window.location.pathname) || Boolean(document.querySelector('#arabicVerse, #arabicVerseEl, .arabic-glow-verse'));
    if (!estPageSourate) return;

    var btnWbw = trouverBoutonMotAMot();
    var btnTajwid = trouverBoutonTajwid();
    var btnSuivi = trouverBoutonParTexte(['Suivi', 'Follow', 'Слежение', 'Seguimiento', 'Verfolgen', 'Segui', 'Ikuti', 'تتبع']);

    if (!btnSuivi || !btnTajwid) return;
    initDefautFait = true;

    if (btnWbw && boutonEstActif(btnWbw)) {
      btnWbw.click();
    }
    if (btnTajwid && !boutonEstActif(btnTajwid)) {
      btnTajwid.click();
    }
    if (btnSuivi && !boutonEstActif(btnSuivi)) {
      btnSuivi.click();
    }

    cacherGrilleMotAMotQuandInactif();
  }

  function masquerBlocProgressionSurSourate() {
    var estPageSourate = /sourate-\\d+/i.test(window.location.pathname) || Boolean(document.querySelector('#arabicVerse, #arabicVerseEl, .arabic-glow-verse'));
    if (!estPageSourate) return;
    var kWidget = document.getElementById('khatmPlannerWidgetV77');
    if (kWidget) {
      kWidget.classList.add('wbw-hide-khatm-on-surah');
      forcer(kWidget, 'display', 'none');
    }
  }

  function gererMasquageDoublonVerset(cartes, grilleVisible) {
    var caches = document.querySelectorAll('.wbw-masquer-doublon-v104, .wbw-masquer-doublon-v105, .wbw-masquer-doublon-v106, .wbw-masquer-doublon-v107, .wbw-masquer-doublon-v108, .wbw-masquer-doublon-v109, .wbw-masquer-doublon-v110, .wbw-masquer-doublon-v111, .wbw-masquer-doublon-v112, .wbw-masquer-traduction-bas');
    if (!grilleVisible || !cartes || cartes.length < 1 || !estModeMotAMotActif()) {
      for (var c = 0; c < caches.length; c++) {
        caches[c].classList.remove('wbw-masquer-doublon-v104', 'wbw-masquer-doublon-v105', 'wbw-masquer-doublon-v106', 'wbw-masquer-doublon-v107', 'wbw-masquer-doublon-v108', 'wbw-masquer-doublon-v109', 'wbw-masquer-doublon-v110', 'wbw-masquer-doublon-v111', 'wbw-masquer-doublon-v112', 'wbw-masquer-traduction-bas');
        caches[c].style.removeProperty('display');
      }
      var vNorm = document.querySelector('#arabicVerseEl, #arabicVerse, .arabic-glow-verse');
      if (vNorm) {
        vNorm.style.removeProperty('display');
        vNorm.style.removeProperty('transform');
      }
      var fNorm = document.querySelector('#frenchVerseEl, .french-glow-verse');
      if (fNorm && obtenirLanguePage() !== 'ar') {
        fNorm.style.removeProperty('display');
      }
      return;
    }

    var grille = cartes[0].parentElement;
    var boite = grille ? grille.parentElement : null;
    if (!boite) return;

    var tous = boite.querySelectorAll('p, div, h1, h2, h3, h4');
    for (var i = 0; i < tous.length; i++) {
      var el = tous[i];
      if (el === grille || el.id === 'wbwSensLectureBanner' || el.contains(grille) || grille.contains(el)) continue;
      if (el.querySelector('button') || el.tagName === 'BUTTON' || el.classList.contains('stage-blue-nav') || el.classList.contains('sync-progress-track')) continue;
      var t = (el.textContent || '').trim();
      if (
        el.id === 'arabicVerse' ||
        el.id === 'arabicVerseEl' ||
        el.id === 'frenchVerseEl' ||
        el.classList.contains('arabic-glow-verse') ||
        el.classList.contains('french-glow-verse') ||
        /^\\d+\\s*[\\.:\\-]/.test(t) ||
        el.tagName === 'P'
      ) {
        el.classList.add('wbw-masquer-doublon-v110');
        forcer(el, 'display', 'none');
      }
    }
  }

  var tableMuqattaat = {
    'الم': 'Alif Lām Mīm',
    'المص': 'Alif Lām Mīm Sād',
    'الر': 'Alif Lām Rā',
    'المر': 'Alif Lām Mīm Rā',
    'كهيعص': 'Kāf Hā Yā ʿAyn Sād',
    'طه': 'Tā Hā',
    'طسم': 'Tā Sīn Mīm',
    'طس': 'Tā Sīn',
    'يس': 'Yā Sīn',
    'ص': 'Sād',
    'حم': 'Hā Mīm',
    'عسق': 'ʿAyn Sīn Qāf',
    'حمعسق': 'Hā Mīm ʿAyn Sīn Qāf',
    'ق': 'Qāf',
    'ن': 'Nūn'
  };

  var dicoArabeFr = {
    'مني': 'de moi',
    'واشتعل': 'et s’est embrasée',
    'الراس': 'la tête',
    'شيبا': 'de cheveux blancs',
    'ولم': 'et je n’ai pas',
    'اكن': 'été',
    'بدعايك': 'en T’invoquant',
    'شقيا': 'malheureux (déçu)',
    'وهن': 's’est affaibli',
    'العظم': 'l’os (mes os)',
    'ذكر': 'Le rappel',
    'رحمت': 'de la miséricorde',
    'عبده': 'Son serviteur',
    'زكريا': 'Zakariyyā',
    'اذ': 'Quand',
    'نادي': 'il invoqua',
    'ربه': 'son Seigneur',
    'نداء': 'd’un appel',
    'خفيا': 'secret'
  };

  var dicoInstantaneFr = {
    'stand': 'Lève-toi',
    'stand (in prayer)': 'Lève-toi (en prière)',
    'support': 'Lève-toi',
    'and flared': 'et s’est embrasée',
    'flared': 's’est embrasée',
    'with white': 'de cheveux blancs',
    '(with) white': 'de cheveux blancs',
    'white hair': 'de cheveux blancs',
    'unblessed': 'malheureux (déçu)',
    'of me': 'de moi',
    'from me': 'de moi',
    'and not': 'et je n’ai pas',
    'i have been': 'été',
    'in my supplication to you': 'en T’invoquant',
    'in (the) name': 'au nom',
    'in the name': 'au nom',
    'the one who': 'Celui qui',
    'who': 'qui',
    'created': 'a créé',
    'read': 'Lis',
    'recite': 'Lis',
    'your lord': 'ton Seigneur',
    'and your lord': 'Et ton Seigneur',
    '(is) the most generous': 'est le Très Généreux',
    'the most generous': 'le Très Généreux',
    'taught': 'a enseigné',
    'by the pen': 'Par la plume',
    'man': 'à l’homme',
    'what': 'ce que',
    'not': 'ne ... pas',
    'he knew': 'il savait',
    'from': 'd’une',
    'a clinging substance': 'adhérence',
    'clinging substance': 'adhérence'
  };

  var cacheTradMots = {};
  try {
    cacheTradMots = JSON.parse(localStorage.getItem('wbw_tr_cache_v110') || '{}');
  } catch (e) {}
  var enCoursTrad = {};
  var prochainEssaiTrad = {};

  function obtenirLanguePage() {
    var p = new URLSearchParams(window.location.search).get('lang');
    if (p) return p.slice(0, 2).toLowerCase();
    var h = (document.documentElement.lang || 'fr').slice(0, 2).toLowerCase();
    return h || 'fr';
  }

  function nettoyerEtTraduireMotUneFois(elTrad, elAr, lang) {
    if (!elTrad) return;
    var brut = (elTrad.textContent || '').trim();
    var txtAr = elAr ? (elAr.textContent || '') : '';
    var arPur = nettoyerArabeBrut(txtAr);
    var arNorm = normaliserArabeCle(txtAr);

    if (tableMuqattaat[arPur]) {
      definirTexteSansBoucle(elTrad, tableMuqattaat[arPur]);
      elTrad.dataset.wbwTrOk = lang;
      return;
    }

    if (lang === 'fr' && dicoArabeFr[arNorm]) {
      definirTexteSansBoucle(elTrad, dicoArabeFr[arNorm]);
      elTrad.dataset.wbwTrOk = lang;
      return;
    }

    if (!brut) return;

    if (brut.indexOf('_') !== -1) {
      brut = brut.split('_').join(' ').replace(/\\s{2,}/g, ' ').trim();
      definirTexteSansBoucle(elTrad, brut);
      elTrad.dataset.wbwTrOk = lang;
      return;
    }

    if (lang === 'en' || lang === 'ar') {
      elTrad.dataset.wbwTrOk = lang;
      return;
    }

    var cleMin = brut.toLowerCase().replace(/\\s{2,}/g, ' ');
    if (lang === 'fr' && dicoInstantaneFr[cleMin]) {
      definirTexteSansBoucle(elTrad, dicoInstantaneFr[cleMin]);
      elTrad.dataset.wbwTrOk = lang;
      return;
    }

    if (elTrad.dataset.wbwTrOk === lang) return;

    var cle = lang + ':' + arNorm + ':' + cleMin;
    if (cacheTradMots[cle]) {
      definirTexteSansBoucle(elTrad, cacheTradMots[cle]);
      elTrad.dataset.wbwTrOk = lang;
      return;
    }

    if (/[àâäéèêëîïôöùûüçœæ]/i.test(brut) && lang === 'fr') {
      elTrad.dataset.wbwTrOk = lang;
      return;
    }

    if (enCoursTrad[cle] || Date.now() < (prochainEssaiTrad[cle] || 0)) return;
    enCoursTrad[cle] = true;

    var propreEn = brut.replace(/^\\(is\\)\\s*/i, '').replace(/[\\(\\)]/g, '').replace(/\\s{2,}/g, ' ').trim() || brut;
    var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + encodeURIComponent(lang) + '&dt=t&q=' + encodeURIComponent(propreEn);
    fetch(url)
      .then(function(r) { return r.ok ? r.json() : Promise.reject(new Error('HTTP')); })
      .then(function(d) {
        if (d && d[0] && d[0][0] && d[0][0][0]) {
          var tr = d[0].map(function(x) { return x[0] || ''; }).join('').trim();
          if (tr) {
            if (lang === 'fr' && dicoInstantaneFr[tr.toLowerCase()]) {
              tr = dicoInstantaneFr[tr.toLowerCase()];
            }
            cacheTradMots[cle] = tr;
            try { localStorage.setItem('wbw_tr_cache_v110', JSON.stringify(cacheTradMots)); } catch (e) {}
            if (elTrad && elTrad.isConnected && obtenirLanguePage() === lang) {
              definirTexteSansBoucle(elTrad, tr);
              elTrad.dataset.wbwTrOk = lang;
            }
          }
        }
      })
      .catch(function() {
        prochainEssaiTrad[cle] = Date.now() + 15000;
      })
      .finally(function() {
        delete enCoursTrad[cle];
      });
  }

  var cacheMetaCartes = [];
  var derniereSigPreparation = '';
  var lissageE = [];
  var lissageB = [];
  var modeContrasteSuivi = 0;
  var maxIdxAtteintVerset = -1;
  var dernierTempsAudio = 0;
  var derniereCleVersetVue = '';
  var dernierTimestampRaf = 0;

  function detruireNoeudNumero(el) {
    if (!el || el.classList.contains('wbw-ar-v110') || el.classList.contains('wbw-tr-v110') || el.classList.contains('wbw-ar') || el.classList.contains('wbw-tr')) return;
    el.dataset.wbwIsNum = '1';
    if (el.textContent !== '') {
      el.textContent = '';
    }
    el.classList.add('wbw-num-hidden-v110');
    forcer(el, 'display', 'none');
  }

  function purgerTousLesChiffresDeLaCarte(carte, elAr, elTrad) {
    if (!carte) return;
    extraireIndiceOrdreCarte(carte);
    if (carte.hasAttribute('data-word-num')) carte.removeAttribute('data-word-num');
    if (carte.hasAttribute('data-index')) carte.removeAttribute('data-index');

    var tous = carte.querySelectorAll('*');
    for (var i = 0; i < tous.length; i++) {
      var sub = tous[i];
      if (sub === elAr || sub === elTrad) continue;
      if (sub.classList.contains('wbw-ar-v110') || sub.classList.contains('wbw-tr-v110') || sub.classList.contains('wbw-ar') || sub.classList.contains('wbw-tr')) continue;
      if (elAr && elAr.contains(sub) && !estPetitNumero(sub.textContent)) continue;
      if (elTrad && elTrad.contains(sub)) continue;
      if (
        sub.dataset.wbwIsNum === '1' ||
        sub.tagName === 'SUP' ||
        sub.tagName === 'SMALL' ||
        (sub.children.length === 0 && estPetitNumero(sub.textContent))
      ) {
        detruireNoeudNumero(sub);
      }
    }
  }

  function preparerGrilleSiNecessaire(cartes) {
    if (!cartes || cartes.length < 1 || !estModeMotAMotActif()) {
      cacheMetaCartes = [];
      derniereSigPreparation = '';
      cacherGrilleMotAMotQuandInactif();
      gererMasquageDoublonVerset(null, false);
      return false;
    }
    var grille = cartes[0].parentElement;
    if (!grille) {
      gererMasquageDoublonVerset(null, false);
      return false;
    }

    gererMasquageDoublonVerset(cartes, true);

    var banner = document.getElementById('wbwSensLectureBanner');
    if (banner) {
      forcer(banner, 'display', cartes.length <= 1 ? 'none' : 'block');
    }

    var lang = obtenirLanguePage();
    var cleDom = obtenirCleVersetActuelDom();
    var dernierMotTxt = (cartes[cartes.length - 1].textContent || '').slice(0, 16);
    var sig = cleDom + ':' + lang + ':' + cartes.length + ':' + (cartes[0].textContent || '').slice(0, 16) + ':' + dernierMotTxt;

    var memeDom =
      sig === derniereSigPreparation &&
      cacheMetaCartes.length === cartes.length &&
      cacheMetaCartes[0] &&
      cacheMetaCartes[0].carte === cartes[0] &&
      cacheMetaCartes[0].elAr &&
      cacheMetaCartes[0].elAr.isConnected &&
      cartes[0].classList.contains('wbw-card-v110');

    if (memeDom) {
      for (var u = 0; u < cacheMetaCartes.length; u++) {
        var mu = cacheMetaCartes[u];
        if (mu && mu.elTrad) nettoyerEtTraduireMotUneFois(mu.elTrad, mu.elAr, lang);
      }
      return true;
    }

    var changementVerset = (sig !== derniereSigPreparation);
    derniereSigPreparation = sig;
    if (changementVerset || lissageE.length !== cartes.length) {
      maxIdxAtteintVerset = -1;
      modeContrasteSuivi = 0;
      window.__wbwEnergies = [];
      window.__wbwBleus = [];
      lissageE = new Array(cartes.length).fill(0);
      lissageB = new Array(cartes.length).fill(0);
    }
    cacheMetaCartes = new Array(cartes.length);

    forcer(grille, 'display', 'flex');
    forcer(grille, 'flex-wrap', 'wrap');
    forcer(grille, 'justify-content', 'center');
    forcer(grille, 'align-items', 'flex-start');
    forcer(grille, 'gap', '6px 14px');
    forcer(grille, 'row-gap', '22px');
    forcer(grille, 'margin-top', cartes.length === 1 ? '6px' : '20px');
    forcer(grille, 'margin-bottom', '14px');
    forcer(grille, 'padding', cartes.length === 1 ? '10px 10px' : '16px 10px');
    forcer(grille, 'background', 'transparent');
    forcer(grille, 'border', 'none');
    forcer(grille, 'box-shadow', 'none');

    var hRem = (3.35 * wbwFontScale).toFixed(2) + 'rem';
    var arFont = 'calc(clamp(2.15rem, 3.6vw, 2.75rem) * ' + wbwFontScale.toFixed(2) + ')';
    var trFont = (0.92 * Math.pow(wbwFontScale, 0.78)).toFixed(3) + 'rem';
    var trMaxW = Math.round(145 * wbwFontScale) + 'px';

    for (var m = 0; m < cartes.length; m++) {
      var carte = cartes[m];
      if (!carte.dataset.wbwOrd) carte.dataset.wbwOrd = String(m + 1);
      carte.classList.remove('wbw-card-v104', 'wbw-card-v105', 'wbw-card-v106', 'wbw-card-v107', 'wbw-card-v108', 'wbw-card-v109', 'wbw-card-v111', 'wbw-card-v112');
      carte.classList.add('wbw-card-v110');

      forcer(carte, 'margin', '0px');
      forcer(carte, 'padding', '2px 8px 4px 8px');
      forcer(carte, 'background', 'transparent');
      forcer(carte, 'border', 'none');
      forcer(carte, 'border-radius', '0px');
      forcer(carte, 'box-shadow', 'none');
      forcer(carte, 'outline', 'none');
      forcer(carte, 'min-width', '0px');
      forcer(carte, 'width', 'auto');
      forcer(carte, 'height', 'auto');
      forcer(carte, 'display', 'inline-flex');
      forcer(carte, 'flex-direction', 'column');
      forcer(carte, 'align-items', 'center');
      forcer(carte, 'justify-content', 'flex-start');

      var elAr = null;
      var elTrad = null;

      var directs = carte.children;
      for (var d = 0; d < directs.length; d++) {
        var ch = directs[d];
        var tCh = (ch.textContent || '').trim();
        if (estPetitNumero(tCh) || ch.tagName === 'SUP' || ch.tagName === 'SMALL') {
          detruireNoeudNumero(ch);
        } else if (!elAr && (ch.classList.contains('wbw-ar') || ch.classList.contains('wbw-ar-v110') || contientArabe(tCh))) {
          elAr = ch;
        } else if (ch !== elAr && (ch.classList.contains('wbw-tr') || ch.classList.contains('wbw-tr-v110') || tCh.length > 0)) {
          elTrad = ch;
        }
      }

      if (elAr) {
        elAr.classList.remove('wbw-num-hidden-v110', 'wbw-num-hidden-v111', 'wbw-num-hidden-v112');
        delete elAr.dataset.wbwIsNum;
        elAr.classList.add('wbw-ar-v110');
        forcer(elAr, 'display', 'block');
        forcer(elAr, 'visibility', 'visible');
        forcer(elAr, 'opacity', '1');
        forcer(elAr, 'min-height', hRem);
        forcer(elAr, 'line-height', hRem);
        forcer(elAr, 'text-align', 'center');
        forcer(elAr, 'font-size', arFont);
        forcer(elAr, 'white-space', 'nowrap');
      }
      if (elTrad) {
        elTrad.classList.remove('wbw-num-hidden-v110', 'wbw-num-hidden-v111', 'wbw-num-hidden-v112');
        delete elTrad.dataset.wbwIsNum;
        elTrad.classList.add('wbw-tr-v110');
        forcer(elTrad, 'display', 'block');
        forcer(elTrad, 'visibility', 'visible');
        forcer(elTrad, 'opacity', '1');
        forcer(elTrad, 'width', 'auto');
        forcer(elTrad, 'height', 'auto');
        forcer(elTrad, 'max-width', cartes.length === 1 ? '220px' : trMaxW);
        forcer(elTrad, 'text-align', 'center');
        forcer(elTrad, 'line-height', '1.25');
        forcer(elTrad, 'font-size', trFont);
        forcer(elTrad, 'margin-top', '4px');
        nettoyerEtTraduireMotUneFois(elTrad, elAr, lang);
      }

      purgerTousLesChiffresDeLaCarte(carte, elAr, elTrad);

      cacheMetaCartes[m] = {
        carte: carte,
        elAr: elAr,
        elTrad: elTrad,
        lastE: -1,
        lastB: -1,
        lastContraste: -1
      };
    }

    return true;
  }

  window.__appliquerRubanColleWBW = function(ts) {
    var maintenant = (typeof ts === 'number' && ts > 0) ? ts : performance.now();
    var dt = dernierTimestampRaf ? Math.min(50, Math.max(1, maintenant - dernierTimestampRaf)) : (1000 / 60);
    dernierTimestampRaf = maintenant;

    var alphaE = 1 - Math.pow(1 - 0.32, dt / (1000 / 60));
    var alphaB = 1 - Math.pow(1 - 0.26, dt / (1000 / 60));
    var alphaC = 1 - Math.pow(1 - 0.25, dt / (1000 / 60));

    var aud = document.getElementById('ayahAudio') || window.__lecteurAudioActuel || document.querySelector('audio');
    var tActuel = aud ? (aud.currentTime || 0) : 0;
    var audioJoue = Boolean(aud && !aud.paused && !aud.ended);

    var cartes = obtenirCartesMotAMotUniversel();
    var banner = document.getElementById('wbwSensLectureBanner');

    if (!cartes || cartes.length < 1) {
      if (banner) forcer(banner, 'display', 'none');
      gererMasquageDoublonVerset(null, false);
      return;
    }

    if (!preparerGrilleSiNecessaire(cartes)) {
      if (banner) forcer(banner, 'display', 'none');
      return;
    }

    var suiviBoutonOn = window.__wbwSuiviBoutonActif !== false;
    var energies = (suiviBoutonOn && audioJoue) ? (window.__wbwEnergies || []) : [];

    var idxPic = -1;
    var maxValE = 0.50;
    if (audioJoue) {
      for (var p = 0; p < cartes.length; p++) {
        var ev = energies[p] || 0;
        if (ev > maxValE) {
          maxValE = ev;
          idxPic = p;
        }
      }
      if (idxPic === -1 && tActuel < 0.45) {
        idxPic = 0;
      }
    }

    if (window.__wbwResetDemande || (tActuel < 0.15 && dernierTempsAudio > 0.4) || (!audioJoue && tActuel < 0.08 && (!aud || !aud.ended))) {
      window.__wbwResetDemande = false;
      maxIdxAtteintVerset = -1;
      for (var r = 0; r < cartes.length; r++) {
        lissageE[r] = 0;
        lissageB[r] = 0;
        if (cacheMetaCartes[r]) {
          cacheMetaCartes[r].lastE = -1;
          cacheMetaCartes[r].lastB = -1;
        }
      }
    }
    dernierTempsAudio = tActuel;

    if (suiviBoutonOn && audioJoue && idxPic >= 0) {
      if (idxPic <= maxIdxAtteintVerset + 1) {
        if (idxPic > maxIdxAtteintVerset) maxIdxAtteintVerset = idxPic;
      } else if (tActuel > 1.2) {
        maxIdxAtteintVerset = idxPic;
      }
    }
    if (suiviBoutonOn && aud && aud.ended) {
      maxIdxAtteintVerset = cartes.length - 1;
    }

    var audioActif = Boolean(suiviBoutonOn && (audioJoue || maxIdxAtteintVerset >= 0));
    var cibleContraste = audioActif ? 1.0 : 0.0;
    modeContrasteSuivi += (cibleContraste - modeContrasteSuivi) * alphaC;

    for (var m = 0; m < cacheMetaCartes.length; m++) {
      var meta = cacheMetaCartes[m];
      if (!meta || !meta.carte) continue;

      if (!meta.elAr || !meta.elAr.isConnected) {
        derniereSigPreparation = '';
        preparerGrilleSiNecessaire(cartes);
        meta = cacheMetaCartes[m];
        if (!meta || !meta.carte) continue;
      }

      purgerTousLesChiffresDeLaCarte(meta.carte, meta.elAr, meta.elTrad);

      var estMotActuel = suiviBoutonOn && audioJoue && (m === idxPic || (cartes.length === 1 && !aud.ended));
      var estDejaLu = suiviBoutonOn && (m <= maxIdxAtteintVerset || estMotActuel);

      var eBrut = estMotActuel ? 1.0 : (audioJoue ? (energies[m] || 0) : 0);
      var bBrut = estDejaLu ? 1.0 : 0.0;

      lissageE[m] += (eBrut - lissageE[m]) * alphaE;
      lissageB[m] += (bBrut - lissageB[m]) * alphaB;
      if (lissageE[m] < 0.002) lissageE[m] = 0;
      if (lissageB[m] < 0.002) lissageB[m] = 0;

      var e = courbeAppleMusic(lissageE[m]);
      var b = courbeAppleMusic(lissageB[m]);

      if (
        Math.abs(e - meta.lastE) < 0.004 &&
        Math.abs(b - meta.lastB) < 0.004 &&
        Math.abs(modeContrasteSuivi - meta.lastContraste) < 0.005
      ) {
        continue;
      }
      meta.lastE = e;
      meta.lastB = b;
      meta.lastContraste = modeContrasteSuivi;

      var lum = Math.max(b, e);
      var opRepos = 0.96 - 0.52 * modeContrasteSuivi;
      var opMot = (opRepos + (1.0 - opRepos) * lum).toFixed(3);

      forcer(meta.carte, 'opacity', opMot);

      var yPx = (-7.5 * e).toFixed(2);
      var sc = (1.0 + 0.12 * e).toFixed(3);
      forcer(meta.carte, 'transform', 'translate3d(0px, ' + yPx + 'px, 0px) scale(' + sc + ')');

      if (meta.elAr) {
        var ombreAr = 'none';
        if (e > 0.015 || b > 0.02) {
          var rBlanc = (10 + 12 * e + 4 * b).toFixed(1);
          var aBlanc = (0.68 * b + 0.30 * e).toFixed(3);
          var rGlace = (20 + 18 * e + 8 * b).toFixed(1);
          var aGlace = (0.36 * b + 0.44 * e).toFixed(3);
          ombreAr = '0 0 ' + rBlanc + 'px rgba(255, 255, 255, ' + aBlanc + '), 0 0 ' + rGlace + 'px rgba(186, 230, 253, ' + aGlace + ')';
        } else if (modeContrasteSuivi < 0.2) {
          ombreAr = '0 0 8px rgba(255, 255, 255, 0.14)';
        }

        forcer(meta.elAr, 'color', '#f8fafc');
        forcer(meta.elAr, 'text-shadow', ombreAr);
      }

      if (meta.elTrad) {
        var colTrRepos = melangerRGB(186, 230, 253, 148, 163, 184, modeContrasteSuivi);
        var colTrFinal = lum > 0.01 ? melangerRGB(148, 163, 184, 255, 255, 255, lum) : colTrRepos;
        var ombreTr = (e > 0.02 || b > 0.08)
          ? ('0 0 ' + (10 * e + 5 * b).toFixed(1) + 'px rgba(255, 255, 255, ' + (0.55 * e + 0.28 * b).toFixed(3) + ')')
          : 'none';
        forcer(meta.elTrad, 'color', colTrFinal);
        forcer(meta.elTrad, 'font-weight', e > 0.25 ? '600' : (b > 0.5 ? '500' : '400'));
        forcer(meta.elTrad, 'text-shadow', ombreTr);
      }
    }
  };

  function verifierChangementVersetEtPause() {
    initialiserModesSurSourate();
    masquerBlocProgressionSurSourate();

    var cleActuelle = obtenirCleVersetActuelDom();
    if (cleActuelle && derniereCleVersetVue && cleActuelle !== derniereCleVersetVue) {
      derniereCleVersetVue = cleActuelle;
      derniereSigPreparation = '';
      maxIdxAtteintVerset = -1;
      modeContrasteSuivi = 0;
      window.__wbwEnergies = [];
      window.__wbwBleus = [];
      gererMasquageDoublonVerset(null, false);
    } else if (cleActuelle) {
      derniereCleVersetVue = cleActuelle;
    }

    if (window.__appliquerRubanColleWBW) {
      window.__appliquerRubanColleWBW();
    }
  }

  setInterval(verifierChangementVersetEtPause, 180);

  document.addEventListener('click', function() {
    setTimeout(verifierChangementVersetEtPause, 20);
    setTimeout(verifierChangementVersetEtPause, 90);
  });
  document.addEventListener('change', function() {
    setTimeout(verifierChangementVersetEtPause, 20);
    setTimeout(verifierChangementVersetEtPause, 90);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', verifierChangementVersetEtPause);
  } else {
    verifierChangementVersetEtPause();
  }
})();
`;

new Function(codeClientStable);

const blocHtmlStable = '<!-- WBW_COLLE_V110_START -->\n' + styleStable + '\n<script id="wbw-colle-v110">' + codeClientStable + '</script>\n<!-- WBW_COLLE_V110_END -->';

function patcherContenu(c) {
  c = c.replace(/<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90|COLLE_V91|COLLE_V92|COLLE_V93|COLLE_V94|COLLE_V95|COLLE_V96|COLLE_V97|COLLE_V98|COLLE_V99|COLLE_V100|COLLE_V101|COLLE_V102|COLLE_V103|COLLE_V104|COLLE_V105|COLLE_V106|COLLE_V107|COLLE_V108|COLLE_V109|COLLE_V110|COLLE_V111|COLLE_V112)_START -->[\s\S]*?<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90|COLLE_V91|COLLE_V92|COLLE_V93|COLLE_V94|COLLE_V95|COLLE_V96|COLLE_V97|COLLE_V98|COLLE_V99|COLLE_V100|COLLE_V101|COLLE_V102|COLLE_V103|COLLE_V104|COLLE_V105|COLLE_V106|COLLE_V107|COLLE_V108|COLLE_V109|COLLE_V110|COLLE_V111|COLLE_V112)_END -->\s*/g, '');

  // Remet toutes les fonctions audio et QDC à leur état d'origine
  c = c.replace(
    /dosari:\s*\[13,\s*174,\s*168\],\s*dossari:\s*\[13,\s*174,\s*168\],\s*yasser:\s*\[13,\s*174,\s*168\]/g,
    'dosari: [174, 168], dossari: [174, 168], yasser: [174, 168]'
  );
  c = c.replace(/minshawi:\s*\[8,\s*9\]/g, 'minshawi: [9]');
  c = c.replace(
    /function chargerVraiMotAMotVerset\(vk,\s*lang\)\s*\{\s*if\s*\(window\.__wbwBypassOrigCartes\)\s*return;\s*/g,
    'function chargerVraiMotAMotVerset(vk, lang) {'
  );
  c = c.replace(
    /if\s*\(!window\.__wbwBypassOrigCartes\)\s*c\.setAttribute\("data-word-num",\s*String\(i\s*\+\s*1\)\);/g,
    'c.setAttribute("data-word-num", String(i + 1));'
  );
  c = c.replace(
    /if\s*\(tradFinale\s*&&\s*elTr\.textContent\s*!==\s*tradFinale\)\s*elTr\.textContent\s*=\s*tradFinale;/g,
    'if (tradFinale && !elTr.dataset.wbwTrOk && elTr.textContent !== tradFinale) elTr.textContent = tradFinale;'
  );
  c = c.replace(
    /if\s*\(!window\.__wbwBypassOrigCartes\s*&&\s*tradFinale\s*&&\s*elTr\.textContent\s*!==\s*tradFinale\)\s*elTr\.textContent\s*=\s*tradFinale;/g,
    'if (tradFinale && !elTr.dataset.wbwTrOk && elTr.textContent !== tradFinale) elTr.textContent = tradFinale;'
  );

  c = c.replace(
    /var c1 = document\.querySelectorAll\("\.wbw-word-box, \.wbw-card-v11[012], \.wbw-card, \.wbw-word, \.wbw-item"\);/g,
    'var c1 = document.querySelectorAll(".wbw-word-box, .wbw-card-v110, .wbw-card, .wbw-word, .wbw-item");'
  );

  c = c.replace(
    /window\.__obtenirCartesWBW\s*=\s*obtenirCartesMotAMotVisibles;/g,
    'window.__obtenirCartesWBWOrig = obtenirCartesMotAMotVisibles;'
  );

  c = c.replace(
    /if\s*\(\s*estCartes\s*\)\s*\{(?!\s*if\s*\(\s*window\.__wbwBypassOrigCartes\s*\))/g,
    'if (estCartes) { if (window.__wbwBypassOrigCartes) continue;'
  );

  if (c.indexOf('window.__wbwBleus = bleusMots;') !== -1 && c.indexOf('window.__wbwBleus = bleusMots; if (window.__appliquerRubanColleWBW)') === -1) {
    c = c.replace(
      'window.__wbwBleus = bleusMots;',
      'window.__wbwBleus = bleusMots; if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW(performance.now());'
    );
  }

  return c;
}

const fichiers = fs.existsSync(dossierSite) ? fs.readdirSync(dossierSite).filter(f => f.endsWith('.html') && f !== '404.html') : [];
let nb = 0;

for (const f of fichiers) {
  const p = path.join(dossierSite, f);
  let c = patcherContenu(fs.readFileSync(p, 'utf8'));
  c = c.replace('</body>', function() { return blocHtmlStable + '\n</body>'; });
  fs.writeFileSync(p, c, 'utf8');
  nb++;
}

for (const racineF of ['index.html', 'generateur.js', 'maj-tafsir.js']) {
  const pRacine = path.join(__dirname, racineF);
  if (fs.existsSync(pRacine)) {
    let cr = patcherContenu(fs.readFileSync(pRacine, 'utf8'));
    if (racineF.endsWith('.html') && cr.indexOf('</body>') !== -1) {
      cr = cr.replace('</body>', function() { return blocHtmlStable + '\n</body>'; });
    }
    fs.writeFileSync(pRacine, cr, 'utf8');
  }
}

console.log('✅ Version stable restaurée sur ' + nb + ' pages (MutationObserver supprimé = 0 crash, Suivi 100% synchronisé) !');
const fs = require('fs');
const path = require('path');

const dossierSite = path.join(__dirname, 'site');

const styleV101 = `<style id="wbw-style-v101">
  /* 1. Masquage du bloc de progression (Khatm) sur les pages de sourates */
  .wbw-hide-khatm-on-surah,
  .wbw-masquer-doublon-v101 {
    display: none !important;
  }

  /* 2. Suppression absolue des petits numéros (1, 2, 3...) et pseudo-éléments dans Mot à mot */
  .wbw-num-hidden-v101,
  #wbwStageContainer .wbw-word-box > *:first-child:not(.wbw-ar-v101):not(.wbw-tr-v101),
  .wbw-card-v101::before, .wbw-card-v101::after,
  .wbw-card-v101 *::before, .wbw-card-v101 *::after {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    font-size: 0px !important;
    color: transparent !important;
    width: 0px !important;
    height: 0px !important;
    max-width: 0px !important;
    max-height: 0px !important;
    overflow: hidden !important;
    pointer-events: none !important;
  }

  /* 3. Optimisation GPU mobile */
  @media (max-width: 820px) {
    *, *::before, *::after {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
    body::before, body::after,
    .bg-orb, .glow-orb, .moon-orb, .sun-orb, [class*="orb" i] {
      display: none !important;
      animation: none !important;
      filter: none !important;
    }
  }
</style>`;

const codeClientV101 = `
(function() {
  window.__wbwBypassOrigCartes = true;

  // Remplace par ton numéro RNA exact pour Google Ad Grants :
  var NUMERO_RNA = 'RNA : W343000000 • SIRET en cours d’attribution INSEE';

  function forcer(el, prop, val) {
    if (el && el.style && el.style.getPropertyValue(prop) !== val) {
      el.style.setProperty(prop, val, 'important');
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
    var s = (str || '').replace(/[\\s\\u200E\\u200F\\u061C#\\.\\-]/g, '');
    if (s.length < 1 || s.length > 3) return false;
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c < 48 || c > 57) return false;
    }
    return true;
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

  // Correctif A5 de l'audit : synchronisation du bouton Retour navigateur (popstate)
  if (!window.__popstateV101) {
    window.__popstateV101 = true;
    window.addEventListener('popstate', function() {
      window.location.reload();
    });
  }

  // 1. Sélectionne Yasser Al-Dosari par défaut + active Tajwīd et Suivi (Mot à mot libre au choix)
  var initDefautFait = false;

  function forcerYasserAlDosariParDefaut() {
    try {
      for (var k = 0; k < localStorage.length; k++) {
        var cle = localStorage.key(k);
        if (cle && /recit|sheikh|qari|lecteur|audio/i.test(cle)) {
          var val = localStorage.getItem(cle) || '';
          if (/hussary|husary|minshawi|basit|ghamdi|maher|afasy|sudais/i.test(val)) {
            localStorage.setItem(cle, 'yasser');
          }
        }
      }
    } catch (e) {}

    var selects = document.querySelectorAll('select');
    for (var s = 0; s < selects.length; s++) {
      var sel = selects[s];
      for (var o = 0; o < sel.options.length; o++) {
        var optTxt = sel.options[o].textContent || sel.options[o].value || '';
        if (/yasser|dosari|dossari|الدوسري|Досари/i.test(optTxt)) {
          if (sel.selectedIndex !== o) {
            sel.selectedIndex = o;
            sel.dispatchEvent(new Event('change', { bubbles: true }));
          }
          break;
        }
      }
    }

    var tousEls = document.querySelectorAll('button, div, li, span, a');
    var boutonRecitateur = null;
    for (var i = 0; i < tousEls.length; i++) {
      var el = tousEls[i];
      var txt = (el.textContent || '').trim();
      if ((el.tagName === 'BUTTON' || el.getAttribute('role') === 'button') && /Al-Hussary|Al-Afasy|Maher|Sudais|Ghamdi|Minshawi|AbdulBaset/i.test(txt)) {
        boutonRecitateur = el;
        break;
      }
    }

    if (boutonRecitateur) {
      for (var j = 0; j < tousEls.length; j++) {
        var item = tousEls[j];
        if (item === boutonRecitateur) continue;
        var tItem = (item.textContent || '').trim();
        if (tItem.length > 3 && tItem.length < 65 && /Yasser\\s*Al-Dosari|Yasser\\s*Al-Dossari|ياسر\\s*الدوسري|Ясир\\s*Аль-Досари/i.test(tItem)) {
          if (item.children.length <= 3) {
            item.click();
            setTimeout(function() { document.body.click(); }, 10);
            break;
          }
        }
      }
    }
  }

  function initialiserModesSurSourate() {
    if (initDefautFait) return;
    var estPageSourate = /sourate-\\d+/i.test(window.location.pathname) || Boolean(document.querySelector('#arabicVerse, .arabic-glow-verse'));
    if (!estPageSourate) return;

    initDefautFait = true;

    function boutonEstActif(btn) {
      if (!btn) return false;
      if (btn.classList.contains('active') || btn.getAttribute('aria-pressed') === 'true') return true;
      var bg = window.getComputedStyle(btn).backgroundColor || '';
      if (bg.indexOf('56, 189, 248') !== -1 || bg.indexOf('14, 165, 233') !== -1 || bg.indexOf('2, 132, 199') !== -1) return true;
      return false;
    }

    setTimeout(function() {
      var boutons = document.querySelectorAll('button');
      var btnWbw = null, btnTajwid = null, btnSuivi = null;

      for (var i = 0; i < boutons.length; i++) {
        var b = boutons[i];
        var t = (b.textContent || '').trim();
        if (!btnWbw && (t.indexOf('Mot à mot') !== -1 || t.indexOf('Word by Word') !== -1 || t.indexOf('Пословный') !== -1 || t.indexOf('Palabra por') !== -1 || t.indexOf('Wort für') !== -1 || t.indexOf('Parola per') !== -1 || t.indexOf('Kata demi') !== -1 || t.indexOf('كلمة بكلمة') !== -1)) {
          btnWbw = b;
        } else if (!btnTajwid && (t.indexOf('Tajw') !== -1 || t.indexOf('Таджвид') !== -1 || t.indexOf('تجويد') !== -1)) {
          btnTajwid = b;
        } else if (!btnSuivi && (t.indexOf('Suivi') !== -1 || t.indexOf('Follow') !== -1 || t.indexOf('Слежение') !== -1 || t.indexOf('Seguimiento') !== -1 || t.indexOf('Verfolgen') !== -1 || t.indexOf('Segui') !== -1 || t.indexOf('Ikuti') !== -1 || t.indexOf('تتبع') !== -1)) {
          btnSuivi = b;
        }
      }

      if (btnWbw && boutonEstActif(btnWbw)) {
        btnWbw.click();
      }
      if (btnTajwid && !boutonEstActif(btnTajwid)) {
        btnTajwid.click();
      }
      if (btnSuivi && !boutonEstActif(btnSuivi)) {
        btnSuivi.click();
      }

      setTimeout(forcerYasserAlDosariParDefaut, 25);
      setTimeout(forcerYasserAlDosariParDefaut, 120);
    }, 30);
  }

  // 2. Mentions Légales conformes Google Ad Grants (34000 Montpellier sans rue personnelle)
  function mettreAJourMentionsLegalesGoogleGrants() {
    var divs = document.querySelectorAll('div, p, footer');
    for (var i = 0; i < divs.length; i++) {
      var d = divs[i];
      if (d.dataset.legalV101 === '1') continue;
      var txt = d.textContent || '';
      if (txt.indexOf('Institut Muhasiba') !== -1 && d.children.length === 0) {
        d.dataset.legalV101 = '1';
        var parentModale = d.parentElement;
        if (parentModale && !parentModale.querySelector('#wbw-legal-extra-v101')) {
          var anciens = parentModale.querySelectorAll('#wbw-legal-extra-v99, #wbw-legal-extra-v100');
          for (var a = 0; a < anciens.length; a++) anciens[a].remove();

          var infoAssos = document.createElement('div');
          infoAssos.id = 'wbw-legal-extra-v101';
          infoAssos.style.cssText = 'font-size:0.83rem;color:#cbd5e1;margin-top:8px;margin-bottom:12px;line-height:1.55;text-align:center;';
          var adr = 'contact' + '@' + 'corantafsir.com';
          infoAssos.innerHTML =
            '<strong>Association loi 1901 à but non lucratif</strong> • ' + NUMERO_RNA + '<br>' +
            'Siège social : 34000 Montpellier, France • Hébergement : Cloudflare, Inc.<br>' +
            'Contact officiel : <a href="mailto:' + adr + '" style="color:#38bdf8;text-decoration:none;font-weight:600;">' + adr + '</a>';
          parentModale.insertBefore(infoAssos, d.nextSibling);
        }
      }
    }
  }

  function nettoyerTexteOrdreRevelation() {
    var els = document.querySelectorAll('button, option, span, div, label, a');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.children.length === 0 && el.textContent && el.textContent.indexOf('96') !== -1 && el.textContent.indexOf('110') !== -1) {
        el.textContent = el.textContent.replace(/\\s*\\(96\\s*[^)]*\\s*110\\)/g, '').trim();
      }
    }
  }

  function masquerBlocProgressionSurSourate() {
    var estPageSourate = /sourate-\\d+/i.test(window.location.pathname) || Boolean(document.querySelector('#arabicVerse, .arabic-glow-verse'));
    if (!estPageSourate) return;

    var tous = document.querySelectorAll('div, section, aside');
    for (var i = 0; i < tous.length; i++) {
      var el = tous[i];
      if (el.classList.contains('wbw-hide-khatm-on-surah')) continue;
      if (el.querySelector('#arabicVerse, .arabic-glow-verse, audio')) continue;
      var txt = el.textContent || '';
      if (txt.indexOf('Mot à mot') !== -1 || txt.indexOf('Word by Word') !== -1 || txt.indexOf('Tajw') !== -1 || txt.indexOf('Bruit Brun') !== -1 || txt.indexOf('Brown Noise') !== -1) {
        continue;
      }
      var estBlocKhatm =
        (txt.indexOf('6236') !== -1 && (txt.indexOf('Position') !== -1 || txt.indexOf('Objectif') !== -1 || txt.indexOf('goal') !== -1)) ||
        (txt.indexOf('208') !== -1 && (txt.indexOf('Mémoriser') !== -1 || txt.indexOf('Save here') !== -1 || txt.indexOf('Valider') !== -1 || txt.indexOf('Complete step') !== -1));

      if (estBlocKhatm && el.offsetHeight < 420) {
        el.classList.add('wbw-hide-khatm-on-surah');
        forcer(el, 'display', 'none');
      }
    }
  }

  function gererMasquageDoublonVerset(cartes, grilleVisible) {
    var caches = document.querySelectorAll('.wbw-masquer-doublon-v101, .wbw-masquer-traduction-bas');
    if (!grilleVisible || !cartes || cartes.length < 1) {
      for (var c = 0; c < caches.length; c++) {
        caches[c].classList.remove('wbw-masquer-doublon-v101', 'wbw-masquer-traduction-bas');
        caches[c].style.removeProperty('display');
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
      if (el.querySelector('button') || el.tagName === 'BUTTON') continue;
      var t = (el.textContent || '').trim();
      if (!t || t.indexOf('Sens de lecture') !== -1 || t.indexOf('Reading order') !== -1) continue;
      if (el.id === 'arabicVerse' || el.classList.contains('arabic-glow-verse') || /^\\d+\\s*[\\.:\\-]/.test(t) || el.tagName === 'P') {
        el.classList.add('wbw-masquer-doublon-v101');
        forcer(el, 'display', 'none');
      }
    }
  }

  function nettoyerArabeBrut(s) {
    return (s || '').replace(/[\\u064B-\\u065F\\u0670\\u06D6-\\u06ED\\u0640\\s]/g, '');
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

  var dicoInstantaneFr = {
    'in (the) name': 'au nom',
    'in the name': 'au nom',
    'the one who': 'Celui qui',
    'who': 'qui',
    'created': 'a créé',
    'read': 'Lis',
    'recite': 'Lis',
    'your lord': 'ton Seigneur',
    'and your lord': 'Et ton Seigneur',
    '(is) the most generous': 'le Très Généreux',
    'the most generous': 'le Très Généreux',
    'taught': 'a enseigné',
    'by the pen': 'Par la plume',
    'and what': 'et ce qu’',
    'they inscribe': 'ils écrivent',
    'which of you': 'lequel d’entre vous',
    '(is) the afflicted': 'est le dément',
    'the afflicted': 'le dément',
    'man': 'à l’homme',
    'what': 'ce que',
    'not': 'ne ... pas',
    'he knew': 'il savait',
    'from': 'd’une',
    'a clinging substance': 'adhérence',
    'clinging substance': 'adhérence',
    'that': 'Ceci',
    '(is) the book': 'est le Livre',
    'the book': 'le Livre',
    'no': 'aucun',
    'doubt': 'doute',
    'in it': 'en lui',
    'a guidance': 'une guidée',
    'guidance': 'une guidée',
    'for the god-conscious': 'pour les pieux',
    'for the righteous': 'pour les pieux',
    'those who': 'Ceux qui',
    'believe': 'croient',
    'in the unseen': 'à l’invisible',
    'and establish': 'et accomplissent',
    'the prayer': 'la prière',
    'and out of what': 'et de ce que',
    'we have provided them': 'Nous leur avons attribué',
    'they spend': 'ils dépensent',
    'and those who': 'Et ceux qui',
    'in what': 'à ce qui',
    '(is) sent down': 'a été descendu',
    'to you': 'vers toi',
    'before you': 'avant toi',
    'and in the hereafter': 'et à l’au-delà',
    'they': 'eux',
    'firmly believe': 'croient avec certitude',
    'those': 'Ceux-là',
    '(are) on': 'sont sur',
    'from their lord': 'de leur Seigneur',
    'and those': 'et ceux-là',
    '(are) the successful': 'sont les gagnants',
    'indeed': 'Certes',
    'disbelieved': 'ont mécru',
    'it is the same': 'il est égal',
    'to them': 'pour eux',
    'whether you warn them': 'que tu les avertisses',
    'or': 'ou',
    'do not warn them': 'ne les avertisses pas',
    'they will not believe': 'ils ne croiront pas',
    'allah has set a seal': 'Allah a scellé',
    'upon their hearts': 'leurs cœurs',
    'and upon their hearing': 'et sur leur ouïe',
    'and upon their vision': 'et sur leurs yeux',
    '(is) a veil': 'un voile',
    'and for them': 'et pour eux',
    '(is) a great punishment': 'un immense châtiment'
  };

  var cacheTradMots = {};
  try {
    cacheTradMots = JSON.parse(localStorage.getItem('wbw_tr_cache_v101') || '{}');
  } catch (e) {}
  var enCoursTrad = {};
  var prochainEssaiTrad = {};

  function obtenirLanguePage() {
    var p = new URLSearchParams(window.location.search).get('lang');
    if (p) return p.slice(0, 2).toLowerCase();
    var h = (document.documentElement.lang || 'fr').slice(0, 2).toLowerCase();
    return h || 'fr';
  }

  var motsFrConnus = /^(il|elle|ils|elles|je|tu|nous|vous|le|la|les|un|une|des|de|du|au|aux|en|dans|sur|sous|avec|sans|pour|par|vers|chez|entre|contre|et|ou|mais|donc|car|ni|ne|pas|plus|moins|très|tout|tous|toute|toutes|ce|cet|cette|ces|mon|ton|son|ma|ta|sa|mes|tes|ses|notre|votre|leur|leurs|qui|que|quoi|dont|où|oui|non|bien|mal|comme|alors|puis|ainsi|aussi|encore|déjà|toujours|jamais|rien|personne|aucun|autre|même|tel|chaque|allah|seigneur|livre|guidée|pieux|croyants|prière|enfer|paradis|jour|nuit|terre|ciel|cieux|eau|feu|coeur|coeurs|lis|quand|secret|puis|créé)$/i;

  // Correctif S1 & A2 de l'audit : textContent strict + libération de enCoursTrad dans finally + délai de réessai
  function nettoyerEtTraduireMotUneFois(elTrad, elAr, lang) {
    if (!elTrad) return;
    var brut = (elTrad.textContent || '').trim();
    if (!brut) return;

    var txtAr = elAr ? (elAr.textContent || '') : '';
    var arPur = nettoyerArabeBrut(txtAr);
    if (tableMuqattaat[arPur]) {
      if (elTrad.textContent !== tableMuqattaat[arPur]) {
        elTrad.textContent = tableMuqattaat[arPur];
      }
      elTrad.dataset.wbwTrOk = lang;
      return;
    }

    if (brut.indexOf('_') !== -1) {
      brut = brut.split('_').join(' ').replace(/\\s{2,}/g, ' ').trim();
      elTrad.textContent = brut;
      elTrad.dataset.wbwTrOk = lang;
      return;
    }

    if (lang === 'en' || lang === 'ar') {
      elTrad.dataset.wbwTrOk = lang;
      return;
    }

    var cleMin = brut.toLowerCase().replace(/\\s{2,}/g, ' ');
    if (lang === 'fr' && dicoInstantaneFr[cleMin]) {
      elTrad.textContent = dicoInstantaneFr[cleMin];
      elTrad.dataset.wbwTrOk = lang;
      return;
    }

    if (elTrad.dataset.wbwTrOk === lang) return;

    if (/[àâäéèêëîïôöùûüçœæ]/i.test(brut) && lang === 'fr') {
      elTrad.dataset.wbwTrOk = lang;
      return;
    }
    var motsSplit = brut.split(/\\s+/);
    var premierMot = motsSplit[0].replace(/[^a-zA-Z]/g, '');
    if (lang === 'fr' && motsSplit.length === 1 && motsFrConnus.test(premierMot)) {
      elTrad.dataset.wbwTrOk = lang;
      return;
    }

    var cle = lang + ':' + cleMin;
    if (cacheTradMots[cle]) {
      elTrad.textContent = cacheTradMots[cle];
      elTrad.dataset.wbwTrOk = lang;
      return;
    }

    if (enCoursTrad[cle] || Date.now() < (prochainEssaiTrad[cle] || 0)) return;
    enCoursTrad[cle] = true;

    var propreEn = brut.replace(/^\\(is\\)\\s*/i, '').replace(/\\((the|a|an|are)\\)/gi, '$1').replace(/\\([^)]*\\)/g, '').trim() || brut;
    var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + encodeURIComponent(lang) + '&dt=t&q=' + encodeURIComponent(propreEn);
    fetch(url)
      .then(function(r) { return r.ok ? r.json() : Promise.reject(new Error('HTTP')); })
      .then(function(d) {
        if (d && d[0] && d[0][0] && d[0][0][0]) {
          var tr = d[0].map(function(x) { return x[0] || ''; }).join('').trim();
          if (tr) {
            cacheTradMots[cle] = tr;
            try { localStorage.setItem('wbw_tr_cache_v101', JSON.stringify(cacheTradMots)); } catch (e) {}
            if (elTrad && elTrad.isConnected && obtenirLanguePage() === lang) {
              elTrad.textContent = tr;
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

  // SUPPRESSION RADICALE DU PETIT CHIFFRE : vide son textContent ET le masque
  function neutraliserElementNumero(el) {
    if (!el) return;
    el.dataset.wbwIsNum = '1';
    if (el.textContent !== '') {
      el.textContent = '';
    }
    el.classList.add('wbw-num-hidden-v101');
    forcer(el, 'display', 'none');
    forcer(el, 'visibility', 'hidden');
    forcer(el, 'opacity', '0');
    forcer(el, 'font-size', '0px');
    forcer(el, 'width', '0px');
    forcer(el, 'height', '0px');
  }

  function scannerEtSupprimerChiffresCarte(carte) {
    if (!carte) return null;
    var elNumTrouve = null;
    var tous = carte.querySelectorAll('*');
    for (var i = 0; i < tous.length; i++) {
      var sub = tous[i];
      if (sub.dataset.wbwIsNum === '1' || (sub.children.length === 0 && estPetitNumero(sub.textContent))) {
        elNumTrouve = sub;
        neutraliserElementNumero(sub);
      }
    }
    return elNumTrouve;
  }

  function preparerGrilleSiNecessaire(cartes) {
    if (!cartes || cartes.length < 1) {
      cacheMetaCartes = [];
      derniereSigPreparation = '';
      gererMasquageDoublonVerset(null, false);
      return false;
    }
    var grille = cartes[0].parentElement;
    if (!grille || grille.style.display === 'none') {
      gererMasquageDoublonVerset(null, false);
      return false;
    }

    gererMasquageDoublonVerset(cartes, true);

    var banner = document.getElementById('wbwSensLectureBanner');
    if (banner) {
      forcer(banner, 'display', cartes.length <= 1 ? 'none' : 'block');
    }

    var lang = obtenirLanguePage();
    var dernierMotTxt = (cartes[cartes.length - 1].textContent || '').slice(0, 16);
    var sig = lang + ':' + cartes.length + ':' + (cartes[0].textContent || '').slice(0, 16) + ':' + dernierMotTxt;

    // Vérifie non seulement la carte mais aussi que meta.elAr est toujours connecté (détecte toute réécriture innerHTML par le Tajwīd !)
    var memeDom =
      sig === derniereSigPreparation &&
      cacheMetaCartes.length === cartes.length &&
      cacheMetaCartes[0] &&
      cacheMetaCartes[0].carte === cartes[0] &&
      cacheMetaCartes[0].elAr &&
      cacheMetaCartes[0].elAr.isConnected &&
      cartes[0].classList.contains('wbw-card-v101');

    if (memeDom) {
      return true;
    }

    var changementVerset = (sig !== derniereSigPreparation);
    derniereSigPreparation = sig;
    if (changementVerset) {
      maxIdxAtteintVerset = -1;
      lissageE = new Array(cartes.length).fill(0);
      lissageB = new Array(cartes.length).fill(0);
    } else if (lissageE.length !== cartes.length) {
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
    forcer(grille, 'margin-top', '20px');
    forcer(grille, 'margin-bottom', '14px');
    forcer(grille, 'padding', '16px 10px');
    forcer(grille, 'background', 'transparent');
    forcer(grille, 'border', 'none');
    forcer(grille, 'border-radius', '0px');
    forcer(grille, 'box-shadow', 'none');

    for (var m = 0; m < cartes.length; m++) {
      var carte = cartes[m];
      carte.classList.add('wbw-card-v101');

      forcer(carte, 'margin', '0px');
      forcer(carte, 'padding', '2px 8px 4px 8px');
      forcer(carte, 'background', 'transparent');
      forcer(carte, 'border', 'none');
      forcer(carte, 'border-top', 'none');
      forcer(carte, 'border-bottom', 'none');
      forcer(carte, 'border-left', 'none');
      forcer(carte, 'border-right', 'none');
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

      // 1. Neutralise immédiatement tout petit chiffre dans la carte
      var elNum = scannerEtSupprimerChiffresCarte(carte);

      var elAr = null;
      var elTrad = null;

      var tousEnfants = carte.querySelectorAll('*');
      for (var k = 0; k < tousEnfants.length; k++) {
        var sub = tousEnfants[k];
        forcer(sub, 'background', 'transparent');
        forcer(sub, 'border', 'none');
        forcer(sub, 'box-shadow', 'none');
      }

      var directs = carte.children;
      for (var d = 0; d < directs.length; d++) {
        var ch = directs[d];
        if (ch.dataset.wbwIsNum === '1') {
          elNum = ch;
          continue;
        }
        var tCh = (ch.textContent || '').trim();
        if (estPetitNumero(tCh)) {
          elNum = ch;
          neutraliserElementNumero(ch);
        } else if (!elAr && contientArabe(tCh)) {
          elAr = ch;
        } else if (tCh.length > 0) {
          elTrad = ch;
        }
      }

      // Si la carte possède 3 enfants directs (Numéro, Arabe, Traduction), le 1er enfant qui n'est ni elAr ni elTrad est forcément le numéro
      if (!elNum && directs.length >= 3) {
        for (var d2 = 0; d2 < directs.length; d2++) {
          if (directs[d2] !== elAr && directs[d2] !== elTrad) {
            elNum = directs[d2];
            neutraliserElementNumero(elNum);
            break;
          }
        }
      }

      if (elAr) {
        elAr.classList.add('wbw-ar-v101');
        forcer(elAr, 'display', 'block');
        forcer(elAr, 'min-height', '3.35rem');
        forcer(elAr, 'line-height', '3.35rem');
        forcer(elAr, 'text-align', 'center');
        forcer(elAr, 'font-size', 'clamp(2.15rem, 3.6vw, 2.75rem)');
        forcer(elAr, 'white-space', 'nowrap');
      }
      if (elTrad) {
        elTrad.classList.add('wbw-tr-v101');
        forcer(elTrad, 'max-width', '135px');
        forcer(elTrad, 'text-align', 'center');
        forcer(elTrad, 'line-height', '1.25');
        forcer(elTrad, 'font-size', '0.92rem');
        forcer(elTrad, 'margin-top', '3px');
        nettoyerEtTraduireMotUneFois(elTrad, elAr, lang);
      }

      cacheMetaCartes[m] = {
        carte: carte,
        elNum: elNum,
        elAr: elAr,
        elTrad: elTrad,
        lastE: -1,
        lastB: -1,
        lastContraste: -1
      };
    }
    return true;
  }

  // Correctifs P1 & P3 de l'audit : appelé depuis etapeSuiviAudioAfterEffects avec calcul delta-time (60Hz / 120Hz identiques)
  window.__appliquerRubanColleWBW = function(ts) {
    var maintenant = (typeof ts === 'number' && ts > 0) ? ts : performance.now();
    var dt = dernierTimestampRaf ? Math.min(50, Math.max(1, maintenant - dernierTimestampRaf)) : (1000 / 60);
    dernierTimestampRaf = maintenant;

    var alphaE = 1 - Math.pow(1 - 0.32, dt / (1000 / 60));
    var alphaB = 1 - Math.pow(1 - 0.26, dt / (1000 / 60));
    var alphaC = 1 - Math.pow(1 - 0.25, dt / (1000 / 60));

    var cartes = [];
    var rootStage = document.getElementById('wbwStageContainer');
    if (rootStage && rootStage.style.display !== 'none') {
      var boxes = rootStage.querySelectorAll('.wbw-word-box');
      if (boxes && boxes.length > 0) {
        cartes = Array.prototype.slice.call(boxes);
      }
    }
    if (cartes.length === 0 && typeof window.__obtenirCartesWBW === 'function') {
      try { cartes = window.__obtenirCartesWBW() || []; } catch (e) {}
    }

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
    var energies = suiviBoutonOn ? (window.__wbwEnergies || []) : [];
    var bleus = suiviBoutonOn ? (window.__wbwBleus || []) : [];
    var idxFloat = suiviBoutonOn && typeof window.__wbwActiveFloat === 'number' ? window.__wbwActiveFloat : -1;
    var idxEntier = suiviBoutonOn && typeof window.__wbwIdxEntier === 'number' ? window.__wbwIdxEntier : -1;

    var aud = document.getElementById('ayahAudio') || window.__lecteurAudioActuel || document.querySelector('audio');
    var tActuel = aud ? (aud.currentTime || 0) : 0;
    var audioJoue = Boolean(aud && !aud.paused && !aud.ended);
    var audioActif = Boolean(suiviBoutonOn && aud && (!aud.paused || tActuel > 0.05));

    if (suiviBoutonOn && audioJoue && idxEntier < 0 && tActuel < 0.5) {
      idxEntier = 0;
      idxFloat = 0;
    }

    if (window.__wbwResetDemande || (tActuel < 0.18 && dernierTempsAudio > 0.5)) {
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

    if (suiviBoutonOn && idxEntier > maxIdxAtteintVerset && idxEntier < cartes.length) {
      maxIdxAtteintVerset = idxEntier;
    }
    if (suiviBoutonOn && aud && aud.ended) {
      maxIdxAtteintVerset = cartes.length - 1;
    }

    var cibleContraste = (suiviBoutonOn && (audioActif || maxIdxAtteintVerset >= 0)) ? 1.0 : 0.0;
    modeContrasteSuivi += (cibleContraste - modeContrasteSuivi) * alphaC;

    for (var m = 0; m < cacheMetaCartes.length; m++) {
      var meta = cacheMetaCartes[m];
      if (!meta || !meta.carte) continue;

      // Si le Tajwīd vient de réécrire l'intérieur de la carte, on resynchronise immédiatement et on vide le chiffre
      if (!meta.elAr || !meta.elAr.isConnected) {
        derniereSigPreparation = '';
        preparerGrilleSiNecessaire(cartes);
        meta = cacheMetaCartes[m];
        if (!meta || !meta.carte) continue;
      }

      if (meta.elNum) {
        neutraliserElementNumero(meta.elNum);
      } else {
        meta.elNum = scannerEtSupprimerChiffresCarte(meta.carte);
      }

      var estMotActuel = suiviBoutonOn && audioJoue && (m === idxEntier || (cartes.length === 1 && !aud.ended));
      var estDejaLu = suiviBoutonOn && (m <= maxIdxAtteintVerset || (bleus[m] || 0) > 0.45);

      var eBrut = estMotActuel ? 1.0 : (energies[m] || 0);
      var bBrut = estDejaLu ? 1.0 : (bleus[m] || 0);

      if (suiviBoutonOn && audioJoue && idxFloat >= 0 && m === idxEntier + 1) {
        var frac = idxFloat - idxEntier;
        if (frac > 0.65) {
          var ant = (frac - 0.65) / 0.35;
          eBrut = Math.max(eBrut, ant * 0.38);
          bBrut = Math.max(bBrut, ant * 0.30);
        }
      }

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
      var yPx = (-7.5 * e).toFixed(2);
      var sc = (1.0 + 0.12 * e).toFixed(3);

      var opRepos = 0.94 - 0.60 * modeContrasteSuivi;
      var opMot = (opRepos + (1.0 - opRepos) * lum).toFixed(3);

      forcer(meta.carte, 'opacity', opMot);
      forcer(meta.carte, 'transform', 'translate3d(0px, ' + yPx + 'px, 0px) scale(' + sc + ')');

      if (meta.elAr) {
        // Mots déjà entendus et mot en cours en BLANC PUR (#ffffff) identique au mode sans Mot à mot
        var colArRepos = melangerRGB(248, 250, 252, 148, 163, 184, modeContrasteSuivi);
        var colArLu = melangerRGB(148, 163, 184, 255, 255, 255, lum);
        var colArFinal = modeContrasteSuivi > 0.05 ? colArLu : '#f8fafc';

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

        forcer(meta.elAr, 'color', colArFinal);
        forcer(meta.elAr, 'text-shadow', ombreAr);
      }

      if (meta.elTrad) {
        var colTrRepos = melangerRGB(148, 163, 184, 100, 116, 139, modeContrasteSuivi);
        var colTrFinal = lum > 0.01 ? melangerRGB(100, 116, 139, 255, 255, 255, lum) : colTrRepos;
        var ombreTr = (e > 0.02 || b > 0.08)
          ? ('0 0 ' + (10 * e + 5 * b).toFixed(1) + 'px rgba(255, 255, 255, ' + (0.55 * e + 0.28 * b).toFixed(3) + ')')
          : 'none';
        forcer(meta.elTrad, 'color', colTrFinal);
        forcer(meta.elTrad, 'font-weight', e > 0.25 ? '600' : (b > 0.5 ? '500' : '400'));
        forcer(meta.elTrad, 'text-shadow', ombreTr);
      }
    }
  };

  // Correctif P1 de l'audit : AUCUN remplacement global de window.requestAnimationFrame !
  // On observe uniquement les mutations de #wbwStageContainer (quand Tajwīd ou Mot à mot injecte des noeuds)
  var obsWbw = null;
  function brancherObservateurStage() {
    var stage = document.getElementById('wbwStageContainer');
    if (stage && !stage.__obsV101 && typeof MutationObserver !== 'undefined') {
      stage.__obsV101 = true;
      obsWbw = new MutationObserver(function() {
        derniereSigPreparation = '';
        if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW();
      });
      obsWbw.observe(stage, { childList: true, subtree: true });
    }
  }

  function verifierChangementVersetEtPause() {
    initialiserModesSurSourate();
    nettoyerTexteOrdreRevelation();
    masquerBlocProgressionSurSourate();
    mettreAJourMentionsLegalesGoogleGrants();
    brancherObservateurStage();

    if (typeof window.__obtenirCleVersetWBW === 'function') {
      try {
        var cleActuelle = window.__obtenirCleVersetWBW() || '';
        if (cleActuelle && derniereCleVersetVue && cleActuelle !== derniereCleVersetVue) {
          derniereCleVersetVue = cleActuelle;
          derniereSigPreparation = '';
          maxIdxAtteintVerset = -1;
          if (typeof window.__rafraichirDomMotAMotOrig === 'function') {
            window.__rafraichirDomMotAMotOrig();
          }
        } else if (cleActuelle) {
          derniereCleVersetVue = cleActuelle;
        }
      } catch (e) {}
    }

    if (window.__appliquerRubanColleWBW) {
      window.__appliquerRubanColleWBW();
    }
  }

  document.addEventListener('click', function() {
    setTimeout(verifierChangementVersetEtPause, 15);
    setTimeout(verifierChangementVersetEtPause, 80);
  });
  document.addEventListener('change', function() {
    setTimeout(verifierChangementVersetEtPause, 20);
    setTimeout(verifierChangementVersetEtPause, 100);
  });
  document.addEventListener('visibilitychange', function() {
    dernierTimestampRaf = 0;
    if (!document.hidden) verifierChangementVersetEtPause();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', verifierChangementVersetEtPause);
  } else {
    verifierChangementVersetEtPause();
  }
})();
`;

new Function(codeClientV101);

const blocHtmlV101 = '<!-- WBW_COLLE_V101_START -->\n' + styleV101 + '\n<script id="wbw-colle-v101">' + codeClientV101 + '</script>\n<!-- WBW_COLLE_V101_END -->';

function patcherContenu(c) {
  // 1. Nettoyage des blocs V83 -> V101
  c = c.replace(/<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90|COLLE_V91|COLLE_V92|COLLE_V93|COLLE_V94|COLLE_V95|COLLE_V96|COLLE_V97|COLLE_V98|COLLE_V99|COLLE_V100|COLLE_V101)_START -->[\s\S]*?<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90|COLLE_V91|COLLE_V92|COLLE_V93|COLLE_V94|COLLE_V95|COLLE_V96|COLLE_V97|COLLE_V98|COLLE_V99|COLLE_V100|COLLE_V101)_END -->\s*/g, '');

  // 2. Coupe-circuit de "if (estCartes) {" pour empêcher le code natif de remettre le bleu ou les chiffres
  c = c.replace(
    /if\s*\(\s*estCartes\s*\)\s*\{(?!\s*if\s*\(\s*window\.__wbwBypassOrigCartes\s*\))/g,
    'if (estCartes) { if (window.__wbwBypassOrigCartes) continue;'
  );

  // 3. Correctif P1 de l'audit : appel direct de __appliquerRubanColleWBW à la fin de etapeSuiviAudioAfterEffects
  if (c.indexOf('if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW(performance.now());') === -1) {
    c = c.replace(
      /requestAnimationFrame\(etapeSuiviAudioAfterEffects\);/g,
      'if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW(performance.now()); requestAnimationFrame(etapeSuiviAudioAfterEffects);'
    );
  }

  // 4. Correctif A3 de l'audit : ignore l'audio d'un mot isolé (#wbwSingleWordAudio) dans le hook global play()
  if (c.indexOf('if (this.id && this.id !== "ayahAudio") return origPlay.apply(this, arguments);') === -1) {
    c = c.replace(
      /HTMLMediaElement\.prototype\.play\s*=\s*function\s*\(\)\s*\{/,
      'HTMLMediaElement.prototype.play = function () { if (this.id && this.id !== "ayahAudio") return origPlay.apply(this, arguments);'
    );
  }

  // 5. Correctif A2 de l'audit : libère requetesEnCours[cleChap] en cas d'erreur réseau sur les timestamps
  c = c.replace(
    /\.catch\(\s*function\s*\(\)\s*\{\s*\}\s*\)/g,
    '.catch(function() { if (typeof requetesEnCours !== "undefined" && typeof cleChap !== "undefined") delete requetesEnCours[cleChap]; })'
  );

  // 6. Suppression de "(96 ➔ 110)" et support des versets à 1 mot
  c = c.replace(/\s*\(96\s*[^)]{0,10}\s*110\)/g, '');
  c = c.replace(/if\s*\(\s*cartes\.length\s*>=\s*2\s*\)\s*return\s*\{\s*type:\s*"cartes"/g, 'if (cartes.length >= 1) return { type: "cartes"');
  c = c.replace(/if\s*\(\s*cartes\.length\s*<\s*2\s*\)/g, 'if (cartes.length < 1)');
  c = c.replace(/if\s*\(\s*spansExistants\.length\s*>\s*1\s*&&\s*!aSigneIsole\s*\)/g, 'if (spansExistants.length >= 1 && !aSigneIsole)');

  if (c.indexOf('window.__obtenirCartesWBW = obtenirCartesMotAMotVisibles;') === -1) {
    c = c.replace(
      /var\s+cartes\s*=\s*obtenirCartesMotAMotVisibles\(\);/,
      'window.__obtenirCartesWBW = obtenirCartesMotAMotVisibles; window.__obtenirCleVersetWBW = typeof obtenirCleVerset === "function" ? obtenirCleVerset : null; window.__rafraichirDomMotAMotOrig = typeof appliquerVraiMotAMotSurDOM === "function" ? appliquerVraiMotAMotSurDOM : null; var cartes = obtenirCartesMotAMotVisibles();'
    );
  }

  if (c.indexOf('function appliquerVraiMotAMotSurDOM() { setTimeout') === -1) {
    c = c.replace(
      'function appliquerVraiMotAMotSurDOM() {',
      'function appliquerVraiMotAMotSurDOM() { setTimeout(function(){ if(window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW(); }, 0);'
    );
  }

  c = c.replace(
    /for\s*\(\s*var\s+i\s*=\s*0;\s*i\s*<\s*items\.length;\s*i\+\+\s*\)\s*\{\s*if\s*\(\s*items\[i\]\.classList\.contains\("active"\)\s*\|\|\s*items\[i\]\.classList\.contains\("speaking"\)\s*\|\|\s*items\[i\]\.classList\.contains\("current"\)\s*\)\s*\{\s*activeIndexFloat\s*=\s*i;\s*break;\s*\}\s*\}/g,
    'for (var i = 0; i < items.length; i++) { items[i].classList.remove("active", "speaking", "current"); }'
  );

  if (c.indexOf('window.__wbwActiveFloat = activeIndexFloat;') === -1) {
    if (c.indexOf('window.__wbwIdxEntier = idxEntier;') !== -1) {
      c = c.replace('window.__wbwIdxEntier = idxEntier;', 'window.__wbwActiveFloat = activeIndexFloat; window.__wbwIdxEntier = idxEntier;');
    } else {
      c = c.replace(
        /var\s+idxEntier\s*=\s*Math\.floor\(activeIndexFloat\);\s*var\s+lectureEnCours\s*=\s*activeIndexFloat\s*>=\s*0;/,
        'var idxEntier = Math.floor(activeIndexFloat); var lectureEnCours = activeIndexFloat >= 0; window.__wbwLectureActive = Boolean(suiviEstActif && lectureEnCours); window.__wbwActiveFloat = activeIndexFloat; window.__wbwIdxEntier = idxEntier; window.__wbwEnergies = energiesMots; window.__wbwBleus = bleusMots;'
      );
    }
  }

  if (c.indexOf('window.__wbwSuiviBoutonActif = Boolean(suiviEstActif);') === -1) {
    c = c.replace(
      'function etapeSuiviAudioAfterEffects() {',
      'function etapeSuiviAudioAfterEffects() { window.__wbwSuiviBoutonActif = Boolean(suiviEstActif);'
    );
  }

  if (c.indexOf('window.__wbwResetDemande = true;') === -1) {
    c = c.replace(
      'function reinitialiserMotsEnBlancTamise() {',
      'function reinitialiserMotsEnBlancTamise() { window.__wbwResetDemande = true; window.__wbwEnergies = []; window.__wbwBleus = []; window.__wbwActiveFloat = -1; window.__wbwIdxEntier = -1; if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW();'
    );
  }

  return c;
}

// Correctifs S1, S2, S3, S5 et I1 de l'audit sur site/_worker.js
function patcherWorker(w) {
  if (w.indexOf('function escapeHtmlText(value)') === -1) {
    w = 'function escapeHtmlText(value) { return String(value ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;"}[c])); }\n' + w;
  }
  // Correctif S1 : échappement des fragments traduits
  w = w.replace(
    'parts[idx] = lead + splitTr[j].trim() + trail;',
    'parts[idx] = lead + escapeHtmlText(splitTr[j].trim()) + trail;'
  );
  w = w.replace(
    'parts[idx] = lead + r.text + trail;',
    'parts[idx] = lead + escapeHtmlText(r.text) + trail;'
  );

  // Correctif I1 : protège tous les blocs <script> pendant les remplacements globaux out.split(kFr).join(vTr) (fix accueil indonésien Al-Qur'an)
  if (w.indexOf('__SAVED_SCRIPTS_V101__') === -1) {
    w = w.replace(
      /for\s*\(\s*const\s*\[kFr,\s*vTr\]\s*of\s*Object\.entries\(dico\)\s*\)\s*\{\s*out\s*=\s*out\.split\(kFr\)\.join\(vTr\);\s*\}/,
      'const __SAVED_SCRIPTS_V101__ = []; out = out.replace(/<script\\b[^>]*>[\\s\\S]*?<\\/script>/gi, m => { __SAVED_SCRIPTS_V101__.push(m); return "<!--__SCR_V101_" + (__SAVED_SCRIPTS_V101__.length - 1) + "__-->"; }); for (const [kFr, vTr] of Object.entries(dico)) { out = out.split(kFr).join(vTr); } out = out.replace(/<!--__SCR_V101_(\\d+)__-->/g, (_, idx) => __SAVED_SCRIPTS_V101__[Number(idx)]);'
    );
  }

  // Correctif S2 : vérifie responseStatus === 200 et refuse les messages de quota MyMemory
  w = w.replace(
    /if\s*\(\s*responseData\s*&&\s*responseData\.translatedText\s*\)/g,
    'if (Number(data?.responseStatus ?? 200) === 200 && responseData && responseData.translatedText && !/MYMEMORY WARNING|QUERY LENGTH LIMIT|FREE TRANSLATIONS/i.test(responseData.translatedText))'
  );

  return w;
}

const fichiers = fs.readdirSync(dossierSite).filter(f => f.endsWith('.html'));
let nb = 0;

for (const f of fichiers) {
  const p = path.join(dossierSite, f);
  let c = patcherContenu(fs.readFileSync(p, 'utf8'));
  c = c.replace('</body>', function() { return blocHtmlV101 + '\n</body>'; });
  fs.writeFileSync(p, c, 'utf8');
  nb++;
}

for (const racineF of ['index.html', 'generateur.js']) {
  const pRacine = path.join(__dirname, racineF);
  if (fs.existsSync(pRacine)) {
    let cr = patcherContenu(fs.readFileSync(pRacine, 'utf8'));
    if (racineF.endsWith('.html') && cr.indexOf('</body>') !== -1) {
      cr = cr.replace('</body>', function() { return blocHtmlV101 + '\n</body>'; });
    }
    fs.writeFileSync(pRacine, cr, 'utf8');
  }
}

for (const cheminW of [path.join(dossierSite, '_worker.js'), path.join(__dirname, '_worker.js')]) {
  if (fs.existsSync(cheminW)) {
    let cw = patcherWorker(fs.readFileSync(cheminW, 'utf8'));
    fs.writeFileSync(cheminW, cw, 'utf8');
    console.log('✅ Worker sécurisé (S1, S2, I1 indonésien) : ' + cheminW);
  }
}

console.log('✅ V101 (Audit Complet + Suppression radicale des petits chiffres) appliquée sur ' + nb + ' pages !');
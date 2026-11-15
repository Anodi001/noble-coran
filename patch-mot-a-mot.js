const fs = require('fs');
const path = require('path');

const dossierSite = path.join(__dirname, 'site');

const styleV100 = `<style id="wbw-style-v100">
  /* 1. Masquage du bloc de progression (Khatm) sur les pages de sourates */
  .wbw-hide-khatm-on-surah,
  .wbw-masquer-doublon-v100 {
    display: none !important;
  }

  /* 2. Suppression totale et définitive des petits chiffres (1, 2, 3...) sur le Mot à mot */
  .wbw-num-hidden-v100 {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    font-size: 0px !important;
    color: transparent !important;
    width: 0px !important;
    height: 0px !important;
    overflow: hidden !important;
    pointer-events: none !important;
  }

  /* 3. Allègement GPU mobile (120Hz fluide sur iPhone) */
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

const codeClientV100 = `
(function() {
  window.__wbwBypassOrigCartes = true;

  // Remplace par ton numéro RNA exact pour la validation Google Ad Grants (10 000 $/mois) :
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
    var s = (str || '').trim();
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

  // 1. Force Yasser Al-Dosari comme récitateur par défaut + active Tajwīd et Suivi (en laissant Mot à mot au libre choix)
  var initDefautFait = false;

  function forcerYasserAlDosariParDefaut() {
    try {
      // Force Yasser Al-Dosari dans localStorage si un autre récitateur (ex: Al-Hussary) s'est mis automatiquement
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

    // Vérifie si un élément <select> ou une option du menu récitateur contient "Yasser" / "Dosari"
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

    // Si c'est un menu personnalisé (div/button/li), clique sur l'élément Yasser Al-Dosari s'il n'est pas déjà affiché
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
        if (tItem.length > 3 && tItem.length < 65 && /Yasser\s*Al-Dosari|Yasser\s*Al-Dossari|ياسر\s*الدوسري|Ясир\s*Аль-Досари/i.test(tItem)) {
          if (item.children.length <= 3) {
            item.click();
            // Referme le menu déroulant s'il s'est ouvert
            setTimeout(function() {
              document.body.click();
            }, 10);
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

      // 1. On laisse Mot à mot DÉSACTIVÉ au démarrage (libre choix à l'utilisateur de cliquer dessus après)
      if (btnWbw && boutonEstActif(btnWbw)) {
        btnWbw.click();
      }

      // 2. On active automatiquement Tajwīd et Suivi
      if (btnTajwid && !boutonEstActif(btnTajwid)) {
        btnTajwid.click();
      }
      if (btnSuivi && !boutonEstActif(btnSuivi)) {
        btnSuivi.click();
      }

      // 3. Comme le clic sur Tajwīd basculait parfois sur Al-Hussary, on re-force Yasser Al-Dosari juste après !
      setTimeout(forcerYasserAlDosariParDefaut, 25);
      setTimeout(forcerYasserAlDosariParDefaut, 120);
    }, 30);
  }

  // 2. Mentions Légales conformes Google Ad Grants (10 000 $/mois) : Nom Assos + RNA + Siège Ville + Contact
  function mettreAJourMentionsLegalesGoogleGrants() {
    var divs = document.querySelectorAll('div, p, footer');
    for (var i = 0; i < divs.length; i++) {
      var d = divs[i];
      if (d.dataset.legalV100 === '1') continue;
      var txt = d.textContent || '';
      if (txt.indexOf('Institut Muhasiba') !== -1 && d.children.length === 0) {
        d.dataset.legalV100 = '1';
        var parentModale = d.parentElement;
        if (parentModale && !parentModale.querySelector('#wbw-legal-extra-v100')) {
          var ancien = parentModale.querySelector('#wbw-legal-extra-v99');
          if (ancien) ancien.remove();

          var infoAssos = document.createElement('div');
          infoAssos.id = 'wbw-legal-extra-v100';
          infoAssos.style.cssText = 'font-size:0.83rem;color:#cbd5e1;margin-top:8px;margin-bottom:12px;line-height:1.55;text-align:center;';
          var adr = 'contact' + '@' + 'corantafsir.com';
          infoAssos.innerHTML =
            '<strong>Association loi 1901 à but non lucratif</strong> • ' + NUMERO_RNA + '<br>' +
            'Siège social : Montpellier (34000), France • Hébergement : Cloudflare, Inc.<br>' +
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

  // Masque proprement la traduction globale du bas quand Mot à mot est activé, et la réaffiche dès qu'on le désactive
  function gererMasquageDoublonVerset(cartes, grilleVisible) {
    var caches = document.querySelectorAll('.wbw-masquer-doublon-v100, .wbw-masquer-traduction-bas');
    if (!grilleVisible || !cartes || cartes.length < 1) {
      for (var c = 0; c < caches.length; c++) {
        caches[c].classList.remove('wbw-masquer-doublon-v100', 'wbw-masquer-traduction-bas');
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
      // Cible le verset arabe normal ou le paragraphe de traduction numéroté en bas de la boîte du verset
      if (el.id === 'arabicVerse' || el.classList.contains('arabic-glow-verse') || /^\\d+\\s*[\\.:\\-]/.test(t) || el.tagName === 'P') {
        el.classList.add('wbw-masquer-doublon-v100');
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
    cacheTradMots = JSON.parse(localStorage.getItem('wbw_tr_cache_v98') || '{}');
  } catch (e) {}
  var enCoursTrad = {};

  function obtenirLanguePage() {
    var p = new URLSearchParams(window.location.search).get('lang');
    if (p) return p.slice(0, 2).toLowerCase();
    var h = (document.documentElement.lang || 'fr').slice(0, 2).toLowerCase();
    return h || 'fr';
  }

  var motsFrConnus = /^(il|elle|ils|elles|je|tu|nous|vous|le|la|les|un|une|des|de|du|au|aux|en|dans|sur|sous|avec|sans|pour|par|vers|chez|entre|contre|et|ou|mais|donc|car|ni|ne|pas|plus|moins|très|tout|tous|toute|toutes|ce|cet|cette|ces|mon|ton|son|ma|ta|sa|mes|tes|ses|notre|votre|leur|leurs|qui|que|quoi|dont|où|oui|non|bien|mal|comme|alors|puis|ainsi|aussi|encore|déjà|toujours|jamais|rien|personne|aucun|autre|même|tel|chaque|allah|seigneur|livre|guidée|pieux|croyants|prière|enfer|paradis|jour|nuit|terre|ciel|cieux|eau|feu|coeur|coeurs|lis|quand|secret|puis|créé)$/i;

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

    if (enCoursTrad[cle]) return;
    enCoursTrad[cle] = true;

    var propreEn = brut.replace(/^\\(is\\)\\s*/i, '').replace(/\\((the|a|an|are)\\)/gi, '$1').replace(/\\([^)]*\\)/g, '').trim() || brut;
    var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + encodeURIComponent(lang) + '&dt=t&q=' + encodeURIComponent(propreEn);
    fetch(url)
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (d && d[0] && d[0][0] && d[0][0][0]) {
          var tr = d[0].map(function(x) { return x[0] || ''; }).join('').trim();
          if (tr) {
            cacheTradMots[cle] = tr;
            try { localStorage.setItem('wbw_tr_cache_v98', JSON.stringify(cacheTradMots)); } catch (e) {}
            if (elTrad) {
              elTrad.textContent = tr;
              elTrad.dataset.wbwTrOk = lang;
            }
          }
        }
      })
      .catch(function() {});
  }

  var cacheMetaCartes = [];
  var derniereSigPreparation = '';
  var lissageE = [];
  var lissageB = [];
  var modeContrasteSuivi = 0;
  var maxIdxAtteintVerset = -1;
  var dernierTempsAudio = 0;
  var derniereCleVersetVue = '';

  function masquerElementNumero(el) {
    if (!el) return;
    el.classList.add('wbw-num-hidden-v100');
    forcer(el, 'display', 'none');
    forcer(el, 'visibility', 'hidden');
    forcer(el, 'opacity', '0');
    forcer(el, 'font-size', '0px');
    forcer(el, 'color', 'transparent');
    forcer(el, 'height', '0px');
    forcer(el, 'width', '0px');
  }

  function preparerGrilleSiNecessaire(cartes) {
    if (!cartes || cartes.length < 1) {
      cacheMetaCartes = [];
      derniereSigPreparation = '';
      gererMasquageDoublonVerset(null, false);
      return false;
    }
    var grille = cartes[0].parentElement;
    if (!grille || grille.style.display === 'none' || window.getComputedStyle(grille).display === 'none') {
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

    var memeDom =
      sig === derniereSigPreparation &&
      cacheMetaCartes.length === cartes.length &&
      cacheMetaCartes[0] &&
      cacheMetaCartes[0].carte === cartes[0] &&
      cartes[0].classList.contains('wbw-card-v100');

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
      carte.classList.add('wbw-card-v100');

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
      forcer(carte, 'will-change', 'transform, opacity');

      var elNum = null;
      var elAr = null;
      var elTrad = null;

      var tousEnfants = carte.querySelectorAll('*');
      for (var k = 0; k < tousEnfants.length; k++) {
        var sub = tousEnfants[k];
        forcer(sub, 'background', 'transparent');
        forcer(sub, 'border', 'none');
        forcer(sub, 'box-shadow', 'none');
        if (sub.children.length === 0 && estPetitNumero(sub.textContent)) {
          elNum = sub;
          masquerElementNumero(sub);
        }
      }

      var directs = carte.children;
      for (var d = 0; d < directs.length; d++) {
        var ch = directs[d];
        var tCh = (ch.textContent || '').trim();
        if (estPetitNumero(tCh)) {
          elNum = ch;
          masquerElementNumero(ch);
        } else if (!elAr && contientArabe(tCh)) {
          elAr = ch;
        } else if (tCh.length > 0) {
          elTrad = ch;
        }
      }

      if (elAr) {
        elAr.classList.add('wbw-ar-v100');
        forcer(elAr, 'display', 'block');
        forcer(elAr, 'min-height', '3.35rem');
        forcer(elAr, 'line-height', '3.35rem');
        forcer(elAr, 'text-align', 'center');
        forcer(elAr, 'font-size', 'clamp(2.15rem, 3.6vw, 2.75rem)');
        forcer(elAr, 'white-space', 'nowrap');
      }
      if (elTrad) {
        elTrad.classList.add('wbw-tr-v100');
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

  window.__appliquerRubanColleWBW = function() {
    var cartes = [];
    if (typeof window.__obtenirCartesWBW === 'function') {
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

    var aud = window.__lecteurAudioActuel || document.querySelector('audio');
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
    modeContrasteSuivi += (cibleContraste - modeContrasteSuivi) * 0.25;

    for (var m = 0; m < cacheMetaCartes.length; m++) {
      var meta = cacheMetaCartes[m];
      if (!meta || !meta.carte) continue;

      if (meta.elNum) {
        masquerElementNumero(meta.elNum);
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

      lissageE[m] += (eBrut - lissageE[m]) * 0.32;
      lissageB[m] += (bBrut - lissageB[m]) * 0.26;
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

      // Mots à venir tamisés (0.34), mots déjà entendus (b=1) et mot actuel (e=1) à 100% d'opacité (1.00)
      var opRepos = 0.94 - 0.60 * modeContrasteSuivi;
      var opMot = (opRepos + (1.0 - opRepos) * lum).toFixed(3);

      forcer(meta.carte, 'opacity', opMot);
      forcer(meta.carte, 'transform', 'translate3d(0px, ' + yPx + 'px, 0px) scale(' + sc + ')');

      if (meta.elAr) {
        // RENDU BLANC IDENTIQUE AU MODE SANS MOT À MOT :
        // - Non lu (b=0, e=0) : Blanc tamisé (#94a3b8) sans halo
        // - Déjà entendu (b=1) : Blanc pur lumineux (#ffffff) avec halo blanc/glacé doux (tout en gardant les couleurs Tajwīd !)
        // - En cours (e=1)     : Blanc éclatant (#ffffff) avec halo blanc intense
        var colArRepos = melangerRGB(248, 250, 252, 148, 163, 184, modeContrasteSuivi);
        var colArLu = melangerRGB(colArRepos ? 148 : 248, colArRepos ? 163 : 250, colArRepos ? 184 : 252, 255, 255, 255, lum);
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
        // Traduction française : Gris tamisé (#64748b) -> Blanc pur (#ffffff) quand le mot est entendu
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

  var origRaf = window.requestAnimationFrame;
  if (origRaf && !window.__rafHookedV100) {
    window.__rafHookedV100 = true;
    window.requestAnimationFrame = function(cb) {
      return origRaf.call(window, function(ts) {
        var r = cb(ts);
        if (window.__appliquerRubanColleWBW) {
          window.__appliquerRubanColleWBW();
        }
        return r;
      });
    };
  }

  function verifierChangementVersetEtPause() {
    initialiserModesSurSourate();
    nettoyerTexteOrdreRevelation();
    masquerBlocProgressionSurSourate();
    mettreAJourMentionsLegalesGoogleGrants();

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

  setInterval(verifierChangementVersetEtPause, 150);

  document.addEventListener('click', function() {
    setTimeout(verifierChangementVersetEtPause, 15);
    setTimeout(verifierChangementVersetEtPause, 70);
    setTimeout(verifierChangementVersetEtPause, 160);
  });
  document.addEventListener('change', function() {
    setTimeout(verifierChangementVersetEtPause, 20);
    setTimeout(verifierChangementVersetEtPause, 100);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', verifierChangementVersetEtPause);
  } else {
    verifierChangementVersetEtPause();
  }
})();
`;

new Function(codeClientV100);

const blocHtmlV100 = '<!-- WBW_COLLE_V100_START -->\n' + styleV100 + '\n<script id="wbw-colle-v100">' + codeClientV100 + '</script>\n<!-- WBW_COLLE_V100_END -->';

function patcherContenu(c) {
  // 1. Nettoyage des anciens blocs V83 -> V100
  c = c.replace(/<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90|COLLE_V91|COLLE_V92|COLLE_V93|COLLE_V94|COLLE_V95|COLLE_V96|COLLE_V97|COLLE_V98|COLLE_V99|COLLE_V100)_START -->[\s\S]*?<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90|COLLE_V91|COLLE_V92|COLLE_V93|COLLE_V94|COLLE_V95|COLLE_V96|COLLE_V97|COLLE_V98|COLLE_V99|COLLE_V100)_END -->\s*/g, '');

  // 2. Coupe directement le bloc "if (estCartes) {" qui recoloriait les mots en bleu et réaffichait les petits chiffres !
  c = c.replace(
    /if\s*\(\s*estCartes\s*\)\s*\{(?!\s*if\s*\(\s*window\.__wbwBypassOrigCartes\s*\))/g,
    'if (estCartes) { if (window.__wbwBypassOrigCartes) continue;'
  );

  // 3. Suppression de "(96 ➔ 110)" et support des versets à 1 mot
  c = c.replace(/\s*\(96\s*[^)]{0,10}\s*110\)/g, '');
  c = c.replace(/if\s*\(\s*cartes\.length\s*>=\s*2\s*\)\s*return\s*\{\s*type:\s*"cartes"/g, 'if (cartes.length >= 1) return { type: "cartes"');
  c = c.replace(/if\s*\(\s*cartes\.length\s*<\s*2\s*\)/g, 'if (cartes.length < 1)');
  c = c.replace(/if\s*\(\s*spansExistants\.length\s*>\s*1\s*&&\s*!aSigneIsole\s*\)/g, 'if (spansExistants.length >= 1 && !aSigneIsole)');

  if (c.indexOf('window.__obtenirCartesWBW = obtenirCartesMotAMotVisibles;') === -1) {
    c = c.replace(
      /var\s+cartes\s*=\s*obtenirCartesMotAMotVisibles\(\);/,
      'window.__obtenirCartesWBW = obtenirCartesMotAMotVisibles; window.__obtenirCleVersetWBW = typeof obtenirCleVerset === "function" ? obtenirCleVerset : null; window.__rafraichirDomMotAMotOrig = typeof appliquerVraiMotAMotSurDOM === "function" ? appliquerVraiMotAMotSurDOM : null; var cartes = obtenirCartesMotAMotVisibles();'
    );
  } else if (c.indexOf('window.__obtenirCleVersetWBW') === -1) {
    c = c.replace(
      'window.__obtenirCartesWBW = obtenirCartesMotAMotVisibles;',
      'window.__obtenirCartesWBW = obtenirCartesMotAMotVisibles; window.__obtenirCleVersetWBW = typeof obtenirCleVerset === "function" ? obtenirCleVerset : null; window.__rafraichirDomMotAMotOrig = typeof appliquerVraiMotAMotSurDOM === "function" ? appliquerVraiMotAMotSurDOM : null;'
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
      'function reinitialiserMotsEnBlancTamise() { window.__wbwResetDemande = true; window.__wbwEnergies = []; window.__wbwBleus = []; window.__wbwActiveFloat = -1; window.__wbwIdxEntier = -1;'
    );
  }

  return c;
}

const fichiers = fs.readdirSync(dossierSite).filter(f => f.endsWith('.html'));
let nb = 0;
let bypassOk = 0;

for (const f of fichiers) {
  const p = path.join(dossierSite, f);
  let c = patcherContenu(fs.readFileSync(p, 'utf8'));
  if (c.indexOf('if (estCartes) { if (window.__wbwBypassOrigCartes) continue;') !== -1) {
    bypassOk++;
  }
  c = c.replace('</body>', function() { return blocHtmlV100 + '\n</body>'; });
  fs.writeFileSync(p, c, 'utf8');
  nb++;
}

for (const racineF of ['index.html', 'generateur.js']) {
  const pRacine = path.join(__dirname, racineF);
  if (fs.existsSync(pRacine)) {
    let cr = patcherContenu(fs.readFileSync(pRacine, 'utf8'));
    if (racineF.endsWith('.html') && cr.indexOf('</body>') !== -1) {
      cr = cr.replace('</body>', function() { return blocHtmlV100 + '\n</body>'; });
    }
    fs.writeFileSync(pRacine, cr, 'utf8');
  }
}

console.log('✅ V100 appliquée sur ' + nb + ' pages (' + bypassOk + ' pages avec coupe-circuit estCartes : Mots lus en BLANC pur + 0 chiffre + Yasser Al-Dosari + Tajwid & Suivi par défaut) !');
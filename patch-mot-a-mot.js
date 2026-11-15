const fs = require('fs');
const path = require('path');

const dossierSite = path.join(__dirname, 'site');

const styleV96 = `<style id="wbw-style-v96">
  /* 1. Masquage complet du bloc "où on en est" (Khatm / Progression) sur l'interface des sourates */
  .wbw-hide-khatm-on-surah,
  #khatmTrackerBar,
  #khatmWidget,
  .khatm-widget,
  .khatm-bar,
  .khatm-container {
    display: none !important;
  }

  /* 2. Optimisation GPU mobile : adoucit les gros halos flous d'arrière-plan qui ralentissent iOS Safari */
  @media (max-width: 768px) {
    body::before, body::after,
    .bg-orb, .glow-orb, .moon-orb, .sun-orb, [class*="orb" i] {
      opacity: 0.12 !important;
      filter: blur(24px) !important;
      animation: none !important;
    }
  }

  /* 3. Style statique ultra-léger de la grille Mot à mot (zéro recalcul CSS par frame) */
  #wbwSensLectureBanner {
    margin-bottom: 6px !important;
  }
  .wbw-grid-v96 {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    align-items: flex-start !important;
    gap: 6px 14px !important;
    row-gap: 22px !important;
    margin-top: 20px !important;
    margin-bottom: 14px !important;
    padding: 16px 10px !important;
    background: transparent !important;
    border: none !important;
    border-radius: 0px !important;
    box-shadow: none !important;
  }
  .wbw-card-v96 {
    margin: 0px !important;
    padding: 2px 8px 4px 8px !important;
    background: transparent !important;
    border: none !important;
    border-radius: 0px !important;
    box-shadow: none !important;
    outline: none !important;
    min-width: 0px !important;
    width: auto !important;
    height: auto !important;
    display: inline-flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    backface-visibility: hidden !important;
    -webkit-backface-visibility: hidden !important;
  }
  .wbw-num-v96 {
    display: none !important;
  }
  .wbw-ar-v96 {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    display: block !important;
    min-height: 3.35rem !important;
    line-height: 3.35rem !important;
    text-align: center !important;
    font-size: clamp(2.15rem, 3.6vw, 2.75rem) !important;
    white-space: nowrap !important;
  }
  .wbw-tr-v96 {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    max-width: 135px !important;
    text-align: center !important;
    line-height: 1.25 !important;
    font-size: 0.92rem !important;
    margin-top: 3px !important;
  }
  @media (max-width: 640px) {
    .wbw-grid-v96 {
      gap: 4px 10px !important;
      row-gap: 18px !important;
      margin-top: 16px !important;
      padding: 12px 6px !important;
    }
    .wbw-ar-v96 {
      min-height: 2.95rem !important;
      line-height: 2.95rem !important;
      font-size: clamp(1.9rem, 6.2vw, 2.35rem) !important;
    }
    .wbw-tr-v96 {
      font-size: 0.86rem !important;
      max-width: 118px !important;
    }
  }
</style>`;

const codeClientV96 = `
(function() {
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

  // 1. Masque le bloc "où on en est" (Khatm / Progression) sur toutes les pages de sourates/versets
  function masquerBlocProgressionSurSourate() {
    var estPageSourate = /sourate-\\d+/i.test(window.location.pathname) || Boolean(document.querySelector('#arabicVerse, .arabic-glow-verse'));
    if (!estPageSourate) return;

    var tous = document.querySelectorAll('div, section, aside');
    for (var i = 0; i < tous.length; i++) {
      var el = tous[i];
      if (el.classList.contains('wbw-hide-khatm-on-surah')) continue;
      // Ne jamais masquer un conteneur principal qui englobe le verset ou les boutons audio/Mot à mot
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
        el.style.setProperty('display', 'none', 'important');
      }
    }
  }

  // 2. Dictionnaire hors-ligne instantané + cache pour 0 ms de latence sur mobile
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
    'by the pen': 'par la plume',
    'man': 'à l’homme',
    'what': 'ce que',
    'not': 'ne ... pas',
    'he knew': 'il savait',
    'from': 'd’une',
    'a clinging substance': 'adhérence',
    'clinging substance': 'adhérence',
    'that': 'Cela',
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
    cacheTradMots = JSON.parse(localStorage.getItem('wbw_tr_cache_v96') || '{}');
  } catch (e) {}
  var enCoursTrad = {};

  function obtenirLanguePage() {
    var p = new URLSearchParams(window.location.search).get('lang');
    if (p) return p.slice(0, 2).toLowerCase();
    var h = (document.documentElement.lang || 'fr').slice(0, 2).toLowerCase();
    return h || 'fr';
  }

  var motsFrConnus = /^(il|elle|ils|elles|je|tu|nous|vous|le|la|les|un|une|des|de|du|au|aux|en|dans|sur|sous|avec|sans|pour|par|vers|chez|entre|contre|et|ou|mais|donc|car|ni|ne|pas|plus|moins|très|tout|tous|toute|toutes|ce|cet|cette|ces|mon|ton|son|ma|ta|sa|mes|tes|ses|notre|votre|leur|leurs|qui|que|quoi|dont|où|oui|non|bien|mal|comme|alors|puis|ainsi|aussi|encore|déjà|toujours|jamais|rien|personne|aucun|autre|même|tel|chaque|allah|seigneur|livre|guidée|pieux|croyants|prière|enfer|paradis|jour|nuit|terre|ciel|cieux|eau|feu|coeur|coeurs|lis)$/i;

  function nettoyerEtTraduireMotUneFois(elTrad, elAr, lang) {
    if (!elTrad || elTrad.dataset.wbwTrOk === lang) return;
    var brut = (elTrad.textContent || '').trim();
    if (!brut) return;

    var txtAr = elAr ? (elAr.textContent || '') : '';
    var arPur = nettoyerArabeBrut(txtAr);
    if (tableMuqattaat[arPur]) {
      elTrad.textContent = tableMuqattaat[arPur];
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

    var propreEn = brut.replace(/^\\(is\\)\\s*/i, '').replace(/\\((the|a|an)\\)/gi, '$1').replace(/\\([^)]*\\)/g, '').trim() || brut;
    var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + encodeURIComponent(lang) + '&dt=t&q=' + encodeURIComponent(propreEn);
    fetch(url)
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (d && d[0] && d[0][0] && d[0][0][0]) {
          var tr = d[0].map(function(x) { return x[0] || ''; }).join('').trim();
          if (tr) {
            cacheTradMots[cle] = tr;
            try { localStorage.setItem('wbw_tr_cache_v96', JSON.stringify(cacheTradMots)); } catch (e) {}
            if (elTrad) {
              elTrad.textContent = tr;
              elTrad.dataset.wbwTrOk = lang;
            }
          }
        }
      })
      .catch(function() {});
  }

  // 3. Préparation en cache des cartes Mot à mot (exécutée UNIQUEMENT au changement de verset/mode, pas 60x/s !)
  var cacheMetaCartes = [];
  var derniereSigPreparation = '';
  var lissageE = [];
  var lissageB = [];
  var modeContrasteSuivi = 0;
  var maxIdxAtteintVerset = -1;
  var dernierTempsAudio = 0;

  function preparerGrilleSiNecessaire(cartes) {
    if (!cartes || cartes.length < 1) {
      cacheMetaCartes = [];
      derniereSigPreparation = '';
      return false;
    }
    var grille = cartes[0].parentElement;
    if (!grille) return false;
    if (grille.style.display === 'none') return false;

    var lang = obtenirLanguePage();
    var sig = lang + ':' + cartes.length + ':' + (cartes[0].textContent || '').slice(0, 16);
    if (sig === derniereSigPreparation && cacheMetaCartes.length === cartes.length) {
      return true;
    }

    derniereSigPreparation = sig;
    maxIdxAtteintVerset = -1;
    lissageE = new Array(cartes.length).fill(0);
    lissageB = new Array(cartes.length).fill(0);
    cacheMetaCartes = new Array(cartes.length);

    grille.classList.add('wbw-grid-v96');
    var banner = document.getElementById('wbwSensLectureBanner');
    if (banner) {
      banner.style.display = cartes.length <= 1 ? 'none' : 'block';
    }

    for (var m = 0; m < cartes.length; m++) {
      var carte = cartes[m];
      carte.classList.add('wbw-card-v96');

      var elNum = null;
      var elAr = null;
      var elTrad = null;

      // Recherche directe + sous-éléments pour ne jamais rater le petit numéro (1, 2, 3...)
      var tousEnfants = carte.querySelectorAll('*');
      for (var k = 0; k < tousEnfants.length; k++) {
        var sub = tousEnfants[k];
        if (sub.children.length === 0) {
          var tSub = (sub.textContent || '').trim();
          if (estPetitNumero(tSub)) {
            sub.classList.add('wbw-num-v96');
            sub.style.setProperty('display', 'none', 'important');
            elNum = sub;
          }
        }
      }

      var directs = carte.children;
      for (var d = 0; d < directs.length; d++) {
        var ch = directs[d];
        var tCh = (ch.textContent || '').trim();
        if (estPetitNumero(tCh)) {
          ch.classList.add('wbw-num-v96');
          ch.style.setProperty('display', 'none', 'important');
          elNum = ch;
        } else if (!elAr && contientArabe(tCh)) {
          elAr = ch;
        } else if (tCh.length > 0) {
          elTrad = ch;
        }
      }

      if (elAr) elAr.classList.add('wbw-ar-v96');
      if (elTrad) {
        elTrad.classList.add('wbw-tr-v96');
        nettoyerEtTraduireMotUneFois(elTrad, elAr, lang);
      }

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

  // 4. Boucle d'animation ultra-légère 60/120Hz (zéro querySelectorAll par frame, zéro mot sauté)
  window.__appliquerRubanColleWBW = function() {
    var cartes = [];
    if (typeof window.__obtenirCartesWBW === 'function') {
      try { cartes = window.__obtenirCartesWBW() || []; } catch (e) {}
    }

    var banner = document.getElementById('wbwSensLectureBanner');
    if (!cartes || cartes.length < 1) {
      if (banner) banner.style.display = 'none';
      return;
    }

    if (!preparerGrilleSiNecessaire(cartes)) {
      if (banner) banner.style.display = 'none';
      return;
    }

    var suiviBoutonOn = window.__wbwSuiviBoutonActif !== false;
    var energies = suiviBoutonOn ? (window.__wbwEnergies || []) : [];
    var bleus = suiviBoutonOn ? (window.__wbwBleus || []) : [];
    var idxFloat = suiviBoutonOn && typeof window.__wbwActiveFloat === 'number' ? window.__wbwActiveFloat : -1;
    var idxEntier = suiviBoutonOn && typeof window.__wbwIdxEntier === 'number' ? window.__wbwIdxEntier : -1;

    var aud = window.__lecteurAudioActuel || document.querySelector('audio');
    var tActuel = aud ? (aud.currentTime || 0) : 0;
    var audioActif = Boolean(suiviBoutonOn && aud && (!aud.paused || tActuel > 0.05));

    // Si l'utilisateur clique sur Rejouer ou si l'audio revient au début, on remet à zéro la progression monotone
    if (window.__wbwResetDemande || (tActuel < 0.2 && dernierTempsAudio > 0.5)) {
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

    // Progression monotone : aucun mot précédent (0..maxIdxAtteintVerset) ne peut être sauté ni rester éteint !
    if (suiviBoutonOn && idxEntier > maxIdxAtteintVerset && idxEntier < cartes.length) {
      maxIdxAtteintVerset = idxEntier;
    }
    if (suiviBoutonOn && aud && aud.ended) {
      maxIdxAtteintVerset = cartes.length - 1;
    }

    var maxBleu = 0;
    for (var z = 0; z < cartes.length; z++) {
      if ((bleus[z] || 0) > maxBleu) maxBleu = bleus[z];
      if ((energies[z] || 0) > maxBleu) maxBleu = energies[z];
    }

    var cibleContraste = (suiviBoutonOn && (audioActif || maxBleu > 0.02 || maxIdxAtteintVerset >= 0)) ? 1.0 : 0.0;
    modeContrasteSuivi += (cibleContraste - modeContrasteSuivi) * 0.25;

    for (var m = 0; m < cacheMetaCartes.length; m++) {
      var meta = cacheMetaCartes[m];
      if (!meta || !meta.carte) continue;

      var estDejaLuMonotone = (suiviBoutonOn && m <= maxIdxAtteintVerset);
      var eBrut = energies[m] || 0;
      var bBrut = estDejaLuMonotone ? 1.0 : (bleus[m] || 0);

      if (cartes.length === 1 && audioActif && aud && !aud.ended) {
        eBrut = 1.0;
        bBrut = 1.0;
      } else if (suiviBoutonOn && idxFloat >= 0 && m === idxEntier + 1) {
        var frac = idxFloat - idxEntier;
        if (frac > 0.65) {
          var ant = (frac - 0.65) / 0.35;
          eBrut = Math.max(eBrut, ant * 0.38);
          bBrut = Math.max(bBrut, ant * 0.30);
        }
      }

      lissageE[m] += (eBrut - lissageE[m]) * 0.32;
      lissageB[m] += (bBrut - lissageB[m]) * 0.26;
      if (lissageE[m] < 0.001) lissageE[m] = 0;
      if (lissageB[m] < 0.001) lissageB[m] = 0;

      var e = courbeAppleMusic(lissageE[m]);
      var b = courbeAppleMusic(lissageB[m]);

      // Évite toute écriture DOM inutile si les valeurs du mot n'ont pas bougé sur cette frame (gain 90% CPU mobile)
      if (
        Math.abs(e - meta.lastE) < 0.003 &&
        Math.abs(b - meta.lastB) < 0.003 &&
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
      var opRepos = 0.92 - 0.56 * modeContrasteSuivi;
      var opMot = (opRepos + (1.0 - opRepos) * lum).toFixed(3);

      var cStyle = meta.carte.style;
      cStyle.setProperty('opacity', opMot, 'important');
      cStyle.setProperty('transform', 'translate3d(0px, ' + yPx + 'px, 0px) scale(' + sc + ')', 'important');

      if (meta.elAr) {
        var colArRepos = melangerRGB(248, 250, 252, 185, 200, 220, modeContrasteSuivi);
        var colArLu = melangerRGB(248, 250, 252, 135, 218, 255, b);
        var colArBase = lum > 0.01 ? colArLu : colArRepos;
        var colArFinal = e > 0.01 ? melangerRGB(135, 218, 255, 255, 255, 255, e) : colArBase;

        var ombreAr = 'none';
        if (e > 0.015 || b > 0.02) {
          var r1 = (10 + 14 * e + 5 * b).toFixed(1);
          var a1 = (0.55 * b + 0.45 * e).toFixed(3);
          ombreAr = '0 0 ' + r1 + 'px rgba(56, 189, 248, ' + a1 + ')';
        }
        meta.elAr.style.setProperty('color', colArFinal, 'important');
        meta.elAr.style.setProperty('text-shadow', ombreAr, 'important');
      }

      if (meta.elTrad) {
        var colTrLu = melangerRGB(148, 163, 184, 125, 211, 252, b);
        var colTrFinal = e > 0.01 ? melangerRGB(125, 211, 252, 240, 249, 255, e) : colTrLu;
        var ombreTr = (e > 0.02 || b > 0.08)
          ? ('0 0 ' + (10 * e + 4 * b).toFixed(1) + 'px rgba(56, 189, 248, ' + (0.65 * e + 0.25 * b).toFixed(3) + ')')
          : 'none';
        meta.elTrad.style.setProperty('color', colTrFinal, 'important');
        meta.elTrad.style.setProperty('font-weight', e > 0.25 ? '600' : (b > 0.5 ? '500' : '400'), 'important');
        meta.elTrad.style.setProperty('text-shadow', ombreTr, 'important');
      }
    }
  };

  var origRaf = window.requestAnimationFrame;
  if (origRaf && !window.__rafHookedV96) {
    window.__rafHookedV96 = true;
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

  function rafraichirInterface() {
    masquerBlocProgressionSurSourate();
    derniereSigPreparation = '';
    if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW();
  }

  document.addEventListener('click', function() {
    setTimeout(rafraichirInterface, 15);
    setTimeout(rafraichirInterface, 80);
  });
  document.addEventListener('change', function() {
    setTimeout(rafraichirInterface, 20);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rafraichirInterface);
  } else {
    rafraichirInterface();
  }
})();
`;

// Validation syntaxique stricte avant écriture
new Function(codeClientV96);

const blocHtmlV96 = '<!-- WBW_COLLE_V96_START -->\n' + styleV96 + '\n<script id="wbw-colle-v96">' + codeClientV96 + '</script>\n<!-- WBW_COLLE_V96_END -->';

function patcherContenu(c) {
  // 1. Nettoyage de tous les anciens blocs V83 à V96
  c = c.replace(/<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90|COLLE_V91|COLLE_V92|COLLE_V93|COLLE_V94|COLLE_V95|COLLE_V96)_START -->[\s\S]*?<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90|COLLE_V91|COLLE_V92|COLLE_V93|COLLE_V94|COLLE_V95|COLLE_V96)_END -->\s*/g, '');

  // 2. Suppression des anciens appels Promise.resolve().then(...) de la V89 qui causaient une double exécution par frame
  c = c.replace(/Promise\.resolve\(\)\.then\(function\(\)\{\s*if\(window\.__appliquerRubanColleWBW\)\s*window\.__appliquerRubanColleWBW\(\);\s*\}\);/g, '');

  // 3. Correction majeure du bug mobile où ".active" court-circuitait aud.currentTime et faisait sauter les mots 1, 3, 5, 7 !
  c = c.replace(
    /for\s*\(\s*var\s+i\s*=\s*0;\s*i\s*<\s*items\.length;\s*i\+\+\s*\)\s*\{\s*if\s*\(\s*items\[i\]\.classList\.contains\("active"\)\s*\|\|\s*items\[i\]\.classList\.contains\("speaking"\)\s*\|\|\s*items\[i\]\.classList\.contains\("current"\)\s*\)\s*\{\s*activeIndexFloat\s*=\s*i;\s*break;\s*\}\s*\}/g,
    'for (var i = 0; i < items.length; i++) { items[i].classList.remove("active", "speaking", "current"); }'
  );

  // 4. Suppression de "(96➔110)" dans toutes les langues
  c = c.replace(/\s*\(96\s*(?:➔|→|->|\\u2794|\\u2192|&rarr;)\s*110\)/g, '');

  // 5. Support des versets d'un seul mot (Lettres mystérieuses)
  c = c.replace(/if\s*\(\s*cartes\.length\s*>=\s*2\s*\)\s*return\s*\{\s*type:\s*"cartes"/g, 'if (cartes.length >= 1) return { type: "cartes"');
  c = c.replace(/if\s*\(\s*cartes\.length\s*<\s*2\s*\)/g, 'if (cartes.length < 1)');
  c = c.replace(/if\s*\(\s*spansExistants\.length\s*>\s*1\s*&&\s*!aSigneIsole\s*\)/g, 'if (spansExistants.length >= 1 && !aSigneIsole)');

  // 6. Branchements internes propres
  if (c.indexOf('window.__obtenirCartesWBW = obtenirCartesMotAMotVisibles;') === -1) {
    c = c.replace(
      /var\s+cartes\s*=\s*obtenirCartesMotAMotVisibles\(\);/,
      'window.__obtenirCartesWBW = obtenirCartesMotAMotVisibles; var cartes = obtenirCartesMotAMotVisibles();'
    );
  }

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
let fixActiveHijack = 0;

for (const f of fichiers) {
  const p = path.join(dossierSite, f);
  let c = patcherContenu(fs.readFileSync(p, 'utf8'));
  if (c.indexOf('items[i].classList.remove("active", "speaking", "current")') !== -1) {
    fixActiveHijack++;
  }
  // Fonction de remplacement pour ne jamais altérer les caractères "$"
  c = c.replace('</body>', function() { return blocHtmlV96 + '\n</body>'; });
  fs.writeFileSync(p, c, 'utf8');
  nb++;
}

const cheminGen = path.join(__dirname, 'generateur.js');
if (fs.existsSync(cheminGen)) {
  let gen = patcherContenu(fs.readFileSync(cheminGen, 'utf8'));
  fs.writeFileSync(cheminGen, gen, 'utf8');
}

console.log('✅ V96 Mobile 60/120Hz appliquée sur ' + nb + ' pages (' + fixActiveHijack + ' pages débloquées du bug timeupdate .active + Bloc progression masqué sur les sourates) !');
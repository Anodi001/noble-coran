const fs = require('fs');
const path = require('path');

const dossierSite = path.join(__dirname, 'site');

const codeClientV90 = `
(function() {
  function forcer(el, prop, val) {
    if (el && el.style) {
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

  // Dictionnaire et cache de traduction automatique pour éviter les mots en anglais sous l'arabe
  var cacheTradMots = {};
  try {
    cacheTradMots = JSON.parse(localStorage.getItem('wbw_tr_cache_v90') || '{}');
  } catch (e) {}
  var enCoursTrad = {};

  function obtenirLanguePage() {
    var p = new URLSearchParams(window.location.search).get('lang');
    if (p) return p.slice(0, 2).toLowerCase();
    var h = (document.documentElement.lang || 'fr').slice(0, 2).toLowerCase();
    return h || 'fr';
  }

  function nettoyerEtTraduireMot(elTrad, lang) {
    if (!elTrad) return;
    var brut = (elTrad.textContent || '').trim();
    if (!brut) return;

    // 1. Supprime immédiatement tous les underscores "_" (ex: "Ceux_qui" -> "Ceux qui", "la_prière" -> "la prière")
    if (brut.indexOf('_') !== -1) {
      brut = brut.split('_').join(' ').replace(/\\s{2,}/g, ' ').trim();
      elTrad.textContent = brut;
    }

    if (lang === 'en' || lang === 'ar') return;

    var cle = lang + ':' + brut.toLowerCase();
    if (cacheTradMots[cle]) {
      if (elTrad.textContent !== cacheTradMots[cle]) {
        elTrad.textContent = cacheTradMots[cle];
      }
      return;
    }

    // 2. Détecte les mots restés en anglais (ex: "(is) the book", "who believe", "in the unseen", "in it")
    var motsAnglaisFrequents = /\\b(the|and|in|of|to|for|who|what|with|from|upon|is|was|are|were|they|them|their|you|your|he|him|his|we|our|us|not|no|it|that|this|those|believe|unseen|book|guidance|conscious|provided|spend|sent|down|before|hereafter|firmly|lord|all|have|has|had|will|shall|may|can)\\b/i;
    if (!motsAnglaisFrequents.test(brut) && brut.indexOf('(is)') === -1) return;

    if (enCoursTrad[cle]) return;
    enCoursTrad[cle] = true;

    var propreEn = brut.replace(/^\\(is\\)\\s*/i, '').trim();
    var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + encodeURIComponent(lang) + '&dt=t&q=' + encodeURIComponent(propreEn);
    fetch(url)
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (d && d[0] && d[0][0] && d[0][0][0]) {
          var tr = d[0].map(function(x) { return x[0] || ''; }).join('').trim();
          if (tr) {
            cacheTradMots[cle] = tr;
            try { localStorage.setItem('wbw_tr_cache_v90', JSON.stringify(cacheTradMots)); } catch (e) {}
            if (elTrad) elTrad.textContent = tr;
          }
        }
      })
      .catch(function() {});
  }

  window.__appliquerRubanColleWBW = function() {
    var cartes = [];
    if (typeof window.__obtenirCartesWBW === 'function') {
      try { cartes = window.__obtenirCartesWBW() || []; } catch (e) {}
    }

    var banner = document.getElementById('wbwSensLectureBanner');

    // Si le mode Mot à mot est DÉSACTIVÉ, on ne force jamais l'affichage de la grille !
    if (!cartes || cartes.length < 2) {
      if (banner) banner.style.display = 'none';
      return;
    }

    var grille = cartes[0].parentElement;
    if (!grille) return;

    // Si la grille est masquée par le bouton Mot à mot, on respecte son masquage
    if (grille.style.display === 'none' || window.getComputedStyle(grille).display === 'none') {
      if (banner) banner.style.display = 'none';
      return;
    }

    // Style du conteneur unique (sans jamais forcer display:flex avec !important pour laisser le bouton Mot à mot fermer la grille)
    forcer(grille, 'flex-wrap', 'wrap');
    forcer(grille, 'justify-content', 'center');
    forcer(grille, 'align-items', 'baseline');
    forcer(grille, 'gap', '0px');
    forcer(grille, 'column-gap', '0px');
    forcer(grille, 'row-gap', '14px');
    forcer(grille, 'padding', '18px 14px');
    forcer(grille, 'background', 'rgba(8, 19, 36, 0.58)');
    forcer(grille, 'border', '1px solid rgba(56, 189, 248, 0.18)');
    forcer(grille, 'border-radius', '18px');
    forcer(grille, 'box-shadow', 'none');

    var aud = window.__lecteurAudioActuel || document.querySelector('audio');
    var audioJoue = Boolean(aud && !aud.paused && !aud.ended);
    var lectureActive = Boolean(window.__wbwLectureActive || audioJoue);
    var idxEntier = typeof window.__wbwIdxEntier === 'number' ? window.__wbwIdxEntier : -1;

    // Correction du 1er mot sauté : dès que l'audio démarre (< 0.45s), on verrouille l'illumination sur le Mot 1 (index 0)
    if (audioJoue && idxEntier < 0 && aud.currentTime < 0.45) {
      idxEntier = 0;
      lectureActive = true;
    }

    var energies = window.__wbwEnergies || [];
    var bleus = window.__wbwBleus || [];
    var lang = obtenirLanguePage();

    for (var m = 0; m < cartes.length; m++) {
      var carte = cartes[m];
      if (!carte) continue;

      // Lecture de l'échelle calculée par etapeSuiviAudioAfterEffects avant de l'effacer
      var trAvant = carte.style.transform || '';
      var mScale = trAvant.match(/scale\\(([0-9.]+)\\)/);
      var scVal = mScale ? parseFloat(mScale[1]) : 1.0;

      var e = energies[m] || 0;
      var b = bleus[m] || 0;
      var estMotActuel = lectureActive && (m === idxEntier || e > 0.22 || scVal > 1.022);
      var estMotDejaLu = lectureActive && !estMotActuel && (m < idxEntier || b > 0.55);

      // Suppression totale du rectangle bleu, de la bordure, de l'ombre et du rebond sur chaque mot
      forcer(carte, 'margin', '0px');
      forcer(carte, 'padding', '4px 9px 6px 9px');
      forcer(carte, 'border', 'none');
      forcer(carte, 'border-top', 'none');
      forcer(carte, 'border-left', 'none');
      forcer(carte, 'border-right', 'none');
      forcer(carte, 'border-radius', '0px');
      forcer(carte, 'box-shadow', 'none');
      forcer(carte, 'outline', 'none');
      forcer(carte, 'transform', 'none');
      forcer(carte, 'min-width', '0px');
      forcer(carte, 'width', 'auto');
      forcer(carte, 'height', 'auto');
      forcer(carte, 'opacity', '1');

      if (estMotActuel) {
        forcer(carte, 'background', 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.24) 0%, rgba(56, 189, 248, 0) 75%)');
        forcer(carte, 'border-bottom', '2.5px solid #38bdf8');
      } else {
        forcer(carte, 'background', 'transparent');
        forcer(carte, 'border-bottom', 'none');
      }

      var sousEls = carte.querySelectorAll('*');
      for (var k = 0; k < sousEls.length; k++) {
        var sub = sousEls[k];
        forcer(sub, 'background', 'transparent');
        forcer(sub, 'border', 'none');
        forcer(sub, 'box-shadow', 'none');

        if (sub.children.length === 0) {
          var txt = (sub.textContent || '').trim();
          if (estPetitNumero(txt)) {
            forcer(sub, 'font-size', '0.56rem');
            forcer(sub, 'opacity', estMotActuel ? '0.85' : '0.20');
            forcer(sub, 'color', estMotActuel ? '#38bdf8' : '#64748b');
          } else if (contientArabe(txt)) {
            if (estMotActuel) {
              forcer(sub, 'color', '#38bdf8');
              forcer(sub, 'text-shadow', '0 0 16px rgba(56, 189, 248, 0.95)');
            } else if (estMotDejaLu) {
              forcer(sub, 'color', '#bae6fd');
              forcer(sub, 'text-shadow', '0 0 8px rgba(56, 189, 248, 0.35)');
            } else {
              forcer(sub, 'color', '#f8fafc');
              forcer(sub, 'text-shadow', 'none');
            }
          } else if (txt.length > 0) {
            nettoyerEtTraduireMot(sub, lang);
            forcer(sub, 'max-width', '115px');
            forcer(sub, 'text-align', 'center');
            forcer(sub, 'line-height', '1.22');
            if (estMotActuel) {
              forcer(sub, 'color', '#38bdf8');
              forcer(sub, 'font-weight', '600');
              forcer(sub, 'text-shadow', '0 0 10px rgba(56, 189, 248, 0.8)');
            } else if (estMotDejaLu) {
              forcer(sub, 'color', '#7dd3fc');
              forcer(sub, 'font-weight', '500');
              forcer(sub, 'text-shadow', 'none');
            } else {
              forcer(sub, 'color', '#94a3b8');
              forcer(sub, 'font-weight', '400');
              forcer(sub, 'text-shadow', 'none');
            }
          }
        }
      }
    }
  };

  // Exécution synchrone à la fin exacte de chaque requestAnimationFrame (avant que l'écran ne dessine le rectangle bleu !)
  var origRaf = window.requestAnimationFrame;
  if (origRaf && !window.__rafHookedV90) {
    window.__rafHookedV90 = true;
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

  setInterval(window.__appliquerRubanColleWBW, 45);
  document.addEventListener('click', function() {
    setTimeout(window.__appliquerRubanColleWBW, 10);
    setTimeout(window.__appliquerRubanColleWBW, 60);
  });
})();
`;

const blocHtmlV90 = '<!-- WBW_COLLE_V90_START -->\n<script id="wbw-colle-v90">' + codeClientV90 + '</script>\n<!-- WBW_COLLE_V90_END -->';

const fichiers = fs.readdirSync(dossierSite).filter(f => f.endsWith('.html'));
let nb = 0;
let hooksSuivi = 0;

for (const f of fichiers) {
  const p = path.join(dossierSite, f);
  let c = fs.readFileSync(p, 'utf8');

  // Nettoyage des versions précédentes
  c = c.replace(/<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90)_START -->[\s\S]*?<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90)_END -->\s*/g, '');

  // 1. Exposition de obtenirCartesMotAMotVisibles
  if (c.indexOf('window.__obtenirCartesWBW = obtenirCartesMotAMotVisibles;') === -1) {
    c = c.replace(
      /var\s+cartes\s*=\s*obtenirCartesMotAMotVisibles\(\);/,
      'window.__obtenirCartesWBW = obtenirCartesMotAMotVisibles; var cartes = obtenirCartesMotAMotVisibles();'
    );
  }

  // 2. Correction du 1er mot sauté et des micro-pauses entre segments dans etapeSuiviAudioAfterEffects
  c = c.replace(
    /if\s*\(\s*activeIndexFloat\s*===\s*-1\s*\)\s*\{\s*activeIndexFloat\s*=\s*ratioVoix\s*\*\s*items\.length;\s*\}/,
    'if (activeIndexFloat === -1) { if (segsNorm && segsNorm.length > 0) { if (ratioVoix <= segsNorm[0].rStart) { activeIndexFloat = 0; } else { for (var sGap = segsNorm.length - 1; sGap >= 0; sGap--) { if (ratioVoix >= segsNorm[sGap].rStart) { activeIndexFloat = segsNorm[sGap].wordIndex; break; } } if (activeIndexFloat === -1) activeIndexFloat = 0; } } else { activeIndexFloat = ratioVoix * items.length; } }'
  );

  // 3. Branchement multi-lignes sur idxEntier et lectureEnCours
  if (c.indexOf('window.__wbwIdxEntier = idxEntier;') === -1) {
    c = c.replace(
      /var\s+idxEntier\s*=\s*Math\.floor\(activeIndexFloat\);\s*var\s+lectureEnCours\s*=\s*activeIndexFloat\s*>=\s*0;/,
      'var idxEntier = Math.floor(activeIndexFloat); var lectureEnCours = activeIndexFloat >= 0; window.__wbwLectureActive = Boolean(suiviEstActif && lectureEnCours); window.__wbwIdxEntier = idxEntier; window.__wbwEnergies = energiesMots; window.__wbwBleus = bleusMots;'
    );
  }

  if (c.indexOf('window.__wbwIdxEntier = idxEntier;') !== -1) hooksSuivi++;

  c = c.replace('</body>', blocHtmlV90 + '\n</body>');
  fs.writeFileSync(p, c, 'utf8');
  nb++;
}

console.log('✅ V90 appliquée sur ' + nb + ' pages (' + hooksSuivi + ' pages branchées avec suivi 240Hz sans rectangle + Mot 1 immédiat + traductions FR propres) !');
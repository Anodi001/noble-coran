const fs = require('fs');
const path = require('path');

const dossierSite = path.join(__dirname, 'site');

const codeClientV91 = `
(function() {
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

  // Courbe douce identique à courbeAfterEffects du mode sans Mot à mot
  function courbeFluide(x) {
    var v = Math.max(0, Math.min(1, x || 0));
    return v * v * (3 - 2 * v);
  }

  function melangerCouleur(r1, g1, b1, r2, g2, b2, t) {
    var k = Math.max(0, Math.min(1, t || 0));
    var r = Math.round(r1 + (r2 - r1) * k);
    var g = Math.round(g1 + (g2 - g1) * k);
    var b = Math.round(b1 + (b2 - b1) * k);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

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

    var motsAnglais = /\\b(the|and|in|of|to|for|who|what|with|from|upon|is|was|are|were|they|them|their|you|your|he|him|his|we|our|us|not|no|it|that|this|those|believe|unseen|book|guidance|conscious|provided|spend|sent|down|before|hereafter|firmly|lord|all|have|has|had|will|shall|may|can)\\b/i;
    if (!motsAnglais.test(brut) && brut.indexOf('(is)') === -1) return;

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
    if (!cartes || cartes.length < 2) {
      if (banner) banner.style.display = 'none';
      return;
    }

    var grille = cartes[0].parentElement;
    if (!grille) return;

    if (grille.style.display === 'none' || window.getComputedStyle(grille).display === 'none') {
      if (banner) banner.style.display = 'none';
      return;
    }

    // Fond 100% transparent sans cadre supplémentaire (identique au mode sans Mot à mot)
    forcer(grille, 'flex-wrap', 'wrap');
    forcer(grille, 'justify-content', 'center');
    forcer(grille, 'align-items', 'baseline');
    forcer(grille, 'gap', '2px 8px');
    forcer(grille, 'row-gap', '16px');
    forcer(grille, 'padding', '8px 4px');
    forcer(grille, 'background', 'transparent');
    forcer(grille, 'border', 'none');
    forcer(grille, 'border-radius', '0px');
    forcer(grille, 'box-shadow', 'none');

    var energies = window.__wbwEnergies || [];
    var bleus = window.__wbwBleus || [];
    var lang = obtenirLanguePage();

    for (var m = 0; m < cartes.length; m++) {
      var carte = cartes[m];
      if (!carte) continue;

      // Valeurs continues AfterEffects (0.000 -> 1.000) identiques au mode sans Mot à mot
      var e = courbeFluide(energies[m] || 0);
      var b = courbeFluide(bleus[m] || 0);
      var mixBleu = Math.max(b, e * 0.85);

      // Même élévation fluide et zoom doux que le mode sans Mot à mot
      var yPx = (-5.5 * e).toFixed(2);
      var sc = (1.0 + 0.08 * e).toFixed(3);

      forcer(carte, 'margin', '0px');
      forcer(carte, 'padding', '2px 6px 4px 6px');
      forcer(carte, 'background', 'transparent');
      forcer(carte, 'border', 'none');
      forcer(carte, 'border-bottom', 'none');
      forcer(carte, 'border-radius', '0px');
      forcer(carte, 'box-shadow', 'none');
      forcer(carte, 'outline', 'none');
      forcer(carte, 'min-width', '0px');
      forcer(carte, 'width', 'auto');
      forcer(carte, 'height', 'auto');
      forcer(carte, 'opacity', (0.86 + 0.14 * Math.max(b, e)).toFixed(3));
      forcer(carte, 'will-change', 'transform');
      forcer(carte, 'transform', 'translate3d(0px, ' + yPx + 'px, 0px) scale(' + sc + ')');

      var sousEls = carte.querySelectorAll('*');
      for (var k = 0; k < sousEls.length; k++) {
        var sub = sousEls[k];
        forcer(sub, 'background', 'transparent');
        forcer(sub, 'border', 'none');
        forcer(sub, 'box-shadow', 'none');

        if (sub.children.length === 0) {
          var txt = (sub.textContent || '').trim();
          if (estPetitNumero(txt)) {
            // Masque les petits numéros pour un rendu pur identique au mode sans Mot à mot
            forcer(sub, 'display', 'none');
          } else if (contientArabe(txt)) {
            // Interpolation continue blanc -> bleu ciel -> cyan lumineux + halo progressif
            var colBaseAr = melangerCouleur(248, 250, 252, 135, 218, 255, mixBleu);
            var colFinaleAr = e > 0.01 ? melangerCouleur(135, 218, 255, 230, 249, 255, e) : colBaseAr;
            var rayon1 = (8 + 16 * e + 8 * b).toFixed(1);
            var alpha1 = (0.14 + 0.65 * e + 0.38 * b).toFixed(3);
            var ombreAr = '0 0 ' + rayon1 + 'px rgba(56, 189, 248, ' + alpha1 + ')';
            if (e > 0.02) {
              ombreAr += ', 0 0 ' + (26 * e).toFixed(1) + 'px rgba(0, 210, 255, ' + (0.55 * e).toFixed(3) + ')';
            } else if (b < 0.05) {
              ombreAr = '0 0 8px rgba(255, 255, 255, 0.14)';
            }
            forcer(sub, 'font-size', 'clamp(1.85rem, 3vw, 2.35rem)');
            forcer(sub, 'line-height', '1.45');
            forcer(sub, 'color', colFinaleAr);
            forcer(sub, 'text-shadow', ombreAr);
          } else if (txt.length > 0) {
            nettoyerEtTraduireMot(sub, lang);
            var colBaseTr = melangerCouleur(148, 163, 184, 125, 211, 252, mixBleu);
            var colFinaleTr = e > 0.01 ? melangerCouleur(125, 211, 252, 224, 242, 254, e) : colBaseTr;
            var ombreTr = (e > 0.02 || b > 0.1)
              ? ('0 0 ' + (12 * e + 5 * b).toFixed(1) + 'px rgba(56, 189, 248, ' + (0.65 * e + 0.22 * b).toFixed(3) + ')')
              : 'none';
            forcer(sub, 'max-width', '115px');
            forcer(sub, 'text-align', 'center');
            forcer(sub, 'line-height', '1.2');
            forcer(sub, 'font-size', '0.84rem');
            forcer(sub, 'color', colFinaleTr);
            forcer(sub, 'text-shadow', ombreTr);
          }
        }
      }
    }
  };

  // Synchronisation pure sur requestAnimationFrame (zéro setInterval = zéro saccade)
  var origRaf = window.requestAnimationFrame;
  if (origRaf && !window.__rafHookedV91) {
    window.__rafHookedV91 = true;
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

  document.addEventListener('click', function() {
    requestAnimationFrame(function() {
      if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW();
    });
    setTimeout(function() {
      if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW();
    }, 40);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW();
    });
  } else {
    if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW();
  }
})();
`;

const blocHtmlV91 = '<!-- WBW_COLLE_V91_START -->\n<script id="wbw-colle-v91">' + codeClientV91 + '</script>\n<!-- WBW_COLLE_V91_END -->';

const fichiers = fs.readdirSync(dossierSite).filter(f => f.endsWith('.html'));
let nb = 0;

for (const f of fichiers) {
  const p = path.join(dossierSite, f);
  let c = fs.readFileSync(p, 'utf8');

  c = c.replace(/<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90|COLLE_V91)_START -->[\s\S]*?<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90|COLLE_V91)_END -->\s*/g, '');

  c = c.replace('</body>', blocHtmlV91 + '\n</body>');
  fs.writeFileSync(p, c, 'utf8');
  nb++;
}

console.log('✅ V91 appliquée sur ' + nb + ' pages : fluidité AfterEffects 240Hz et visuel identique au mode sans Mot à mot !');
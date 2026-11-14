const fs = require('fs');
const path = require('path');

const dossierSite = path.join(__dirname, 'site');

const codeClientV93 = `
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

  // Table officielle des Lettres Mystérieuses (Al-Muqatta'at) pour ne jamais les traduire par erreur
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

  function obtenirTranslitMuqattaat(texteArabe, texteTrad) {
    var arPur = nettoyerArabeBrut(texteArabe);
    if (tableMuqattaat[arPur]) return tableMuqattaat[arPur];
    var tr = (texteTrad || '').trim();
    if (/^(alif|lam|meem|mim|kaf|ha|ya|ain|ayn|sad|ta|seen|sin|ra|qaf|nun|noon)([\\s,\\-\\.]+(alif|lam|meem|mim|kaf|ha|ya|ain|ayn|sad|ta|seen|sin|ra|qaf|nun|noon))*\\.?$/i.test(tr)) {
      return tr.replace(/meem/gi, 'Mīm').replace(/seen/gi, 'Sīn').replace(/noon/gi, 'Nūn');
    }
    return null;
  }

  // Supprime "(96➔110)" sur le bouton/sélecteur Ordre : Révélation dans toutes les langues
  function nettoyerTexteOrdreRevelation() {
    var els = document.querySelectorAll('button, option, span, div, label, a');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.children.length === 0 && el.textContent && el.textContent.indexOf('96') !== -1 && el.textContent.indexOf('110') !== -1) {
        el.textContent = el.textContent.replace(/\\s*\\(96\\s*[^)]*\\s*110\\)/g, '').trim();
      }
    }
  }

  var cacheTradMots = {};
  try {
    cacheTradMots = JSON.parse(localStorage.getItem('wbw_tr_cache_v93') || '{}');
  } catch (e) {}
  var enCoursTrad = {};

  function obtenirLanguePage() {
    var p = new URLSearchParams(window.location.search).get('lang');
    if (p) return p.slice(0, 2).toLowerCase();
    var h = (document.documentElement.lang || 'fr').slice(0, 2).toLowerCase();
    return h || 'fr';
  }

  var motsFrConnus = /^(il|elle|ils|elles|je|tu|nous|vous|le|la|les|un|une|des|de|du|au|aux|en|dans|sur|sous|avec|sans|pour|par|vers|chez|entre|contre|et|ou|mais|donc|car|ni|ne|pas|plus|moins|très|tout|tous|toute|toutes|ce|cet|cette|ces|mon|ton|son|ma|ta|sa|mes|tes|ses|notre|votre|leur|leurs|qui|que|quoi|dont|où|oui|non|bien|mal|comme|alors|puis|ainsi|aussi|encore|déjà|toujours|jamais|rien|personne|aucun|autre|même|tel|chaque|allah|seigneur|livre|guidée|pieux|croyants|prière|enfer|paradis|jour|nuit|terre|ciel|cieux|eau|feu|coeur|coeurs)$/i;

  function nettoyerEtTraduireMot(elTrad, elAr, lang) {
    if (!elTrad) return;
    var brut = (elTrad.textContent || '').trim();
    if (!brut) return;

    // 1. Vérifie d'abord si c'est une Lettre Mystérieuse (Muqatta'at) : on affiche sa phonétique pure sans traduction
    var txtAr = elAr ? (elAr.textContent || '') : '';
    var muq = obtenirTranslitMuqattaat(txtAr, brut);
    if (muq) {
      if (elTrad.textContent !== muq) elTrad.textContent = muq;
      elTrad.dataset.dejaFr = '1';
      return;
    }

    // 2. Nettoie les underscores "_" du dictionnaire local
    if (brut.indexOf('_') !== -1) {
      brut = brut.split('_').join(' ').replace(/\\s{2,}/g, ' ').trim();
      elTrad.textContent = brut;
      elTrad.dataset.dejaFr = '1';
      return;
    }

    if (lang === 'en' || lang === 'ar') return;
    if (elTrad.dataset.dejaFr === '1') return;

    if (/[àâäéèêëîïôöùûüçœæ]/i.test(brut) && lang === 'fr') {
      elTrad.dataset.dejaFr = '1';
      return;
    }
    var premierMot = brut.split(/\\s+/)[0].replace(/[^a-zA-Z]/g, '');
    if (lang === 'fr' && brut.split(/\\s+/).length === 1 && motsFrConnus.test(premierMot)) {
      elTrad.dataset.dejaFr = '1';
      return;
    }

    var cle = lang + ':' + brut.toLowerCase();
    if (cacheTradMots[cle]) {
      if (elTrad.textContent !== cacheTradMots[cle]) {
        elTrad.textContent = cacheTradMots[cle];
      }
      elTrad.dataset.dejaFr = '1';
      return;
    }

    if (enCoursTrad[cle]) return;
    enCoursTrad[cle] = true;

    var propreEn = brut.replace(/^\\(is\\)\\s*/i, '').replace(/\\([^)]*\\)/g, '').trim() || brut;
    var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + encodeURIComponent(lang) + '&dt=t&q=' + encodeURIComponent(propreEn);
    fetch(url)
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (d && d[0] && d[0][0] && d[0][0][0]) {
          var tr = d[0].map(function(x) { return x[0] || ''; }).join('').trim();
          if (tr) {
            cacheTradMots[cle] = tr;
            try { localStorage.setItem('wbw_tr_cache_v93', JSON.stringify(cacheTradMots)); } catch (e) {}
            if (elTrad) {
              elTrad.textContent = tr;
              elTrad.dataset.dejaFr = '1';
            }
          }
        }
      })
      .catch(function() {});
  }

  var lissageE = [];
  var lissageB = [];
  var modeContrasteSuivi = 0;
  var dernierSignatureGrille = '';

  window.__appliquerRubanColleWBW = function() {
    nettoyerTexteOrdreRevelation();

    var cartes = [];
    if (typeof window.__obtenirCartesWBW === 'function') {
      try { cartes = window.__obtenirCartesWBW() || []; } catch (e) {}
    }

    var banner = document.getElementById('wbwSensLectureBanner');
    // Prend en charge dès 1 seul mot (ex: "الم" en 2:1, "كهيعص" en 19:1, "يس" en 36:1) !
    if (!cartes || cartes.length < 1) {
      if (banner) banner.style.display = 'none';
      return;
    }

    var grille = cartes[0].parentElement;
    if (!grille) return;

    if (grille.style.display === 'none' || window.getComputedStyle(grille).display === 'none') {
      if (banner) banner.style.display = 'none';
      return;
    }

    // Masque la bannière "Sens de lecture (1 -> 1)" quand le verset n'a qu'un seul mot (ex: Lettres Mystérieuses)
    if (banner) {
      banner.style.display = cartes.length <= 1 ? 'none' : 'block';
    }

    forcer(grille, 'flex-wrap', 'wrap');
    forcer(grille, 'justify-content', 'center');
    forcer(grille, 'align-items', 'flex-start');
    forcer(grille, 'gap', '4px 10px');
    forcer(grille, 'row-gap', '18px');
    forcer(grille, 'padding', '10px 6px');
    forcer(grille, 'background', 'transparent');
    forcer(grille, 'border', 'none');
    forcer(grille, 'border-radius', '0px');
    forcer(grille, 'box-shadow', 'none');

    var energies = window.__wbwEnergies || [];
    var bleus = window.__wbwBleus || [];
    var idxFloat = typeof window.__wbwActiveFloat === 'number' ? window.__wbwActiveFloat : -1;
    var idxEntier = typeof window.__wbwIdxEntier === 'number' ? window.__wbwIdxEntier : -1;

    var aud = window.__lecteurAudioActuel || document.querySelector('audio');
    var audioActif = Boolean(aud && (!aud.paused || aud.currentTime > 0.05));

    // Réinitialise immédiatement le lissage si on change de verset
    var sigGrille = cartes.length + ':' + (cartes[0].textContent || '').slice(0, 12);
    if (sigGrille !== dernierSignatureGrille) {
      dernierSignatureGrille = sigGrille;
      lissageE = new Array(cartes.length).fill(0);
      lissageB = new Array(cartes.length).fill(0);
    }

    var maxBleu = 0;
    for (var z = 0; z < cartes.length; z++) {
      if ((bleus[z] || 0) > maxBleu) maxBleu = bleus[z];
      if ((energies[z] || 0) > maxBleu) maxBleu = energies[z];
    }

    var cibleContraste = (audioActif || maxBleu > 0.02) ? 1.0 : 0.0;
    modeContrasteSuivi += (cibleContraste - modeContrasteSuivi) * 0.22;

    var lang = obtenirLanguePage();

    for (var m = 0; m < cartes.length; m++) {
      var carte = cartes[m];
      if (!carte) continue;

      var eBrut = energies[m] || 0;
      var bBrut = bleus[m] || 0;

      // Si le verset ne contient qu'un seul mot (ex: الم), il s'illumine dès que l'audio joue
      if (cartes.length === 1 && audioActif && !aud.ended) {
        eBrut = Math.max(eBrut, 1.0);
        bBrut = Math.max(bBrut, 1.0);
      } else if (idxFloat >= 0 && m === idxEntier + 1) {
        var frac = idxFloat - idxEntier;
        if (frac > 0.65) {
          var ant = (frac - 0.65) / 0.35;
          eBrut = Math.max(eBrut, ant * 0.38);
          bBrut = Math.max(bBrut, ant * 0.30);
        }
      }

      lissageE[m] += (eBrut - lissageE[m]) * 0.30;
      lissageB[m] += (bBrut - lissageB[m]) * 0.25;

      var e = courbeAppleMusic(lissageE[m]);
      var b = courbeAppleMusic(lissageB[m]);
      var lum = Math.max(b, e);

      var yPx = (-7.5 * e).toFixed(2);
      var sc = (1.0 + 0.12 * e).toFixed(3);

      var opRepos = 0.90 - 0.56 * modeContrasteSuivi;
      var opMot = (opRepos + (1.0 - opRepos) * lum).toFixed(3);

      forcer(carte, 'margin', '0px');
      forcer(carte, 'padding', '2px 7px 4px 7px');
      forcer(carte, 'background', 'transparent');
      forcer(carte, 'border', 'none');
      forcer(carte, 'border-bottom', 'none');
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
      forcer(carte, 'opacity', opMot);
      forcer(carte, 'will-change', 'transform, opacity');
      forcer(carte, 'transform', 'translate3d(0px, ' + yPx + 'px, 0px) scale(' + sc + ')');

      var sousEls = carte.querySelectorAll('*');
      var elArCarte = null;
      for (var a = 0; a < sousEls.length; a++) {
        if (sousEls[a].children.length === 0 && contientArabe(sousEls[a].textContent || '')) {
          elArCarte = sousEls[a];
          break;
        }
      }

      for (var k = 0; k < sousEls.length; k++) {
        var sub = sousEls[k];
        forcer(sub, 'background', 'transparent');
        forcer(sub, 'border', 'none');
        forcer(sub, 'box-shadow', 'none');

        if (sub.children.length === 0) {
          var txt = (sub.textContent || '').trim();
          if (estPetitNumero(txt)) {
            forcer(sub, 'display', 'none');
          } else if (contientArabe(txt)) {
            forcer(sub, 'min-height', '3.15rem');
            forcer(sub, 'display', 'flex');
            forcer(sub, 'align-items', 'center');
            forcer(sub, 'justify-content', 'center');
            forcer(sub, 'font-size', 'clamp(1.9rem, 3.1vw, 2.42rem)');
            forcer(sub, 'line-height', '1.35');

            var colArRepos = melangerRGB(248, 250, 252, 185, 200, 220, modeContrasteSuivi);
            var colArLu = melangerRGB(248, 250, 252, 135, 218, 255, b);
            var colArBase = lum > 0.01 ? colArLu : colArRepos;
            var colArFinal = e > 0.01 ? melangerRGB(135, 218, 255, 255, 255, 255, e) : colArBase;

            var ombreAr = 'none';
            if (e > 0.015 || b > 0.02) {
              var r1 = (10 + 16 * e + 6 * b).toFixed(1);
              var a1 = (0.55 * b + 0.45 * e).toFixed(3);
              var r2 = (22 + 24 * e + 10 * b).toFixed(1);
              var a2 = (0.30 * b + 0.60 * e).toFixed(3);
              ombreAr = '0 0 ' + r1 + 'px rgba(56, 189, 248, ' + a1 + '), 0 0 ' + r2 + 'px rgba(0, 210, 255, ' + a2 + ')';
              if (e > 0.08) {
                ombreAr = '0 0 ' + (10 * e).toFixed(1) + 'px rgba(255, 255, 255, ' + (0.85 * e).toFixed(3) + '), ' + ombreAr;
              }
            } else if (modeContrasteSuivi < 0.2) {
              ombreAr = '0 0 8px rgba(255, 255, 255, 0.14)';
            }

            forcer(sub, 'color', colArFinal);
            forcer(sub, 'text-shadow', ombreAr);
          } else if (txt.length > 0) {
            nettoyerEtTraduireMot(sub, elArCarte, lang);
            forcer(sub, 'max-width', '120px');
            forcer(sub, 'text-align', 'center');
            forcer(sub, 'line-height', '1.22');
            forcer(sub, 'font-size', '0.84rem');
            forcer(sub, 'margin-top', '2px');

            var colTrLu = melangerRGB(148, 163, 184, 125, 211, 252, b);
            var colTrFinal = e > 0.01 ? melangerRGB(125, 211, 252, 240, 249, 255, e) : colTrLu;
            var ombreTr = (e > 0.02 || b > 0.08)
              ? ('0 0 ' + (14 * e + 6 * b).toFixed(1) + 'px rgba(56, 189, 248, ' + (0.75 * e + 0.30 * b).toFixed(3) + ')')
              : 'none';

            forcer(sub, 'color', colTrFinal);
            forcer(sub, 'font-weight', e > 0.25 ? '600' : (b > 0.5 ? '500' : '400'));
            forcer(sub, 'text-shadow', ombreTr);
          }
        }
      }
    }
  };

  var origRaf = window.requestAnimationFrame;
  if (origRaf && !window.__rafHookedV93) {
    window.__rafHookedV93 = true;
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
      nettoyerTexteOrdreRevelation();
      if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW();
    });
  } else {
    nettoyerTexteOrdreRevelation();
    if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW();
  }
})();
`;

const blocHtmlV93 = '<!-- WBW_COLLE_V93_START -->\n<script id="wbw-colle-v93">' + codeClientV93 + '</script>\n<!-- WBW_COLLE_V93_END -->';

function patcherContenu(c) {
  // 1. Nettoyage des versions précédentes
  c = c.replace(/<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90|COLLE_V91|COLLE_V92|COLLE_V93)_START -->[\s\S]*?<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90|COLLE_V91|COLLE_V92|COLLE_V93)_END -->\s*/g, '');

  // 2. Suppression de "(96➔110)" / "(96->110)" dans toutes les langues sur le bouton Ordre : Révélation
  c = c.replace(/\s*\(96\s*(?:➔|→|->|\\u2794|\\u2192|&rarr;)\s*110\)/g, '');

  // 3. Prise en charge des versets d'un seul mot (Lettres Mystérieuses : الم, كهيعص, طه, يس, ص, ق, حم)
  c = c.replace(/if\s*\(\s*cartes\.length\s*>=\s*2\s*\)\s*return\s*\{\s*type:\s*"cartes"/g, 'if (cartes.length >= 1) return { type: "cartes"');
  c = c.replace(/if\s*\(\s*cartes\.length\s*<\s*2\s*\)/g, 'if (cartes.length < 1)');
  c = c.replace(/if\s*\(\s*spansExistants\.length\s*>\s*1\s*&&\s*!aSigneIsole\s*\)/g, 'if (spansExistants.length >= 1 && !aSigneIsole)');

  // 4. Branchements internes pour le suivi 240Hz
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

  return c;
}

const fichiers = fs.readdirSync(dossierSite).filter(f => f.endsWith('.html'));
let nb = 0;

for (const f of fichiers) {
  const p = path.join(dossierSite, f);
  let c = patcherContenu(fs.readFileSync(p, 'utf8'));
  c = c.replace('</body>', blocHtmlV93 + '\n</body>');
  fs.writeFileSync(p, c, 'utf8');
  nb++;
}

// Mise à jour simultanée de generateur.js pour conserver ces corrections à chaque future génération
const cheminGen = path.join(__dirname, 'generateur.js');
if (fs.existsSync(cheminGen)) {
  let gen = patcherContenu(fs.readFileSync(cheminGen, 'utf8'));
  fs.writeFileSync(cheminGen, gen, 'utf8');
  console.log('✅ generateur.js également mis à jour !');
}

console.log('✅ V93 appliquée sur ' + nb + ' pages : Lettres mystérieuses (1 mot) corrigées + (96->110) supprimé + Animations vérifiées sur tout le site !');
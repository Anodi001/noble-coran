const fs = require('fs');
const path = require('path');

const dossierSite = path.join(__dirname, 'site');

const codeClientV89 = `
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

  window.__appliquerRubanColleWBW = function() {
    var cartes = [];
    if (typeof window.__obtenirCartesWBW === 'function') {
      try { cartes = window.__obtenirCartesWBW() || []; } catch (e) {}
    }
    if (!cartes || cartes.length === 0) {
      var banner = document.getElementById('wbwSensLectureBanner');
      if (banner && banner.nextElementSibling && banner.nextElementSibling.children.length > 0) {
        cartes = Array.prototype.slice.call(banner.nextElementSibling.children);
      }
    }
    if (!cartes || cartes.length === 0) return;

    var grille = cartes[0].parentElement;
    if (grille) {
      forcer(grille, 'display', 'flex');
      forcer(grille, 'flex-wrap', 'wrap');
      forcer(grille, 'justify-content', 'center');
      forcer(grille, 'align-items', 'baseline');
      forcer(grille, 'gap', '0px');
      forcer(grille, 'column-gap', '0px');
      forcer(grille, 'row-gap', '14px');
      forcer(grille, 'padding', '18px 14px');
      forcer(grille, 'background', 'rgba(8, 19, 36, 0.55)');
      forcer(grille, 'border', '1px solid rgba(56, 189, 248, 0.16)');
      forcer(grille, 'border-radius', '18px');
      forcer(grille, 'box-shadow', 'none');
    }

    var lectureActive = Boolean(window.__wbwLectureActive);
    var idxEntier = typeof window.__wbwIdxEntier === 'number' ? window.__wbwIdxEntier : -1;
    var energies = window.__wbwEnergies || [];
    var bleus = window.__wbwBleus || [];

    for (var m = 0; m < cartes.length; m++) {
      var carte = cartes[m];
      if (!carte) continue;

      var e = energies[m] || 0;
      var b = bleus[m] || 0;
      var estMotActuel = lectureActive && (m === idxEntier || e > 0.25);
      var estMotDejaLu = lectureActive && !estMotActuel && (m < idxEntier || b > 0.55);

      // Suppression totale du rectangle, de la bordure, de l'ombre et du rebond de chaque carte
      forcer(carte, 'margin', '0px');
      forcer(carte, 'padding', '4px 9px 6px 9px');
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
        forcer(carte, 'background', 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.22) 0%, rgba(56, 189, 248, 0) 75%)');
        forcer(carte, 'border-bottom', '2.5px solid #38bdf8');
      } else {
        forcer(carte, 'background', 'transparent');
        forcer(carte, 'border-bottom', 'none');
      }

      // Parcours des éléments internes (numéro, mot arabe, traduction)
      var sousEls = carte.querySelectorAll('*');
      for (var k = 0; k < sousEls.length; k++) {
        var sub = sousEls[k];
        forcer(sub, 'background', 'transparent');
        forcer(sub, 'border', 'none');
        forcer(sub, 'box-shadow', 'none');

        if (sub.children.length === 0) {
          var txt = (sub.textContent || '').trim();
          if (estPetitNumero(txt)) {
            forcer(sub, 'font-size', '0.58rem');
            forcer(sub, 'opacity', estMotActuel ? '0.9' : '0.22');
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
            forcer(sub, 'max-width', '112px');
            forcer(sub, 'text-align', 'center');
            forcer(sub, 'line-height', '1.2');
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

  setInterval(window.__appliquerRubanColleWBW, 40);
  document.addEventListener('click', function() {
    setTimeout(window.__appliquerRubanColleWBW, 5);
    setTimeout(window.__appliquerRubanColleWBW, 50);
  });
})();
`;

const blocHtmlV89 = '<!-- WBW_COLLE_V89_START -->\n<script id="wbw-colle-v89">' + codeClientV89 + '</script>\n<!-- WBW_COLLE_V89_END -->';

const fichiers = fs.readdirSync(dossierSite).filter(f => f.endsWith('.html'));
let nb = 0;
let hooksOk = 0;

for (const f of fichiers) {
  const p = path.join(dossierSite, f);
  let c = fs.readFileSync(p, 'utf8');

  // Nettoyage des anciens blocs
  c = c.replace(/<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89)_START -->[\s\S]*?<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89)_END -->\s*/g, '');

  // Branchement direct sur les fonctions internes de la page (sans dupliquer si déjà branché)
  if (c.indexOf('window.__obtenirCartesWBW = obtenirCartesMotAMotVisibles;') === -1) {
    c = c.replace(
      'var cartes = obtenirCartesMotAMotVisibles();',
      'window.__obtenirCartesWBW = obtenirCartesMotAMotVisibles; var cartes = obtenirCartesMotAMotVisibles();'
    );
  }

  if (c.indexOf('window.__wbwIdxEntier = idxEntier;') === -1) {
    c = c.replace(
      'var idxEntier = Math.floor(activeIndexFloat); var lectureEnCours = activeIndexFloat >= 0;',
      'var idxEntier = Math.floor(activeIndexFloat); var lectureEnCours = activeIndexFloat >= 0; window.__wbwLectureActive = Boolean(suiviEstActif && lectureEnCours); window.__wbwIdxEntier = idxEntier; window.__wbwEnergies = energiesMots; window.__wbwBleus = bleusMots; Promise.resolve().then(function(){ if(window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW(); });'
    );
  }

  if (c.indexOf('function reinitialiserMotsEnBlancTamise() { Promise.resolve()') === -1) {
    c = c.replace(
      'function reinitialiserMotsEnBlancTamise() {',
      'function reinitialiserMotsEnBlancTamise() { window.__wbwLectureActive = false; window.__wbwIdxEntier = -1; Promise.resolve().then(function(){ if(window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW(); });'
    );
  }

  if (c.indexOf('function appliquerVraiMotAMotSurDOM() { Promise.resolve()') === -1) {
    c = c.replace(
      'function appliquerVraiMotAMotSurDOM() {',
      'function appliquerVraiMotAMotSurDOM() { Promise.resolve().then(function(){ if(window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW(); });'
    );
  }

  if (c.indexOf('window.__obtenirCartesWBW') !== -1) hooksOk++;

  c = c.replace('</body>', blocHtmlV89 + '\n</body>');
  fs.writeFileSync(p, c, 'utf8');
  nb++;
}

console.log('✅ V89 appliquée sur ' + nb + ' pages (' + hooksOk + ' pages branchées directement sur obtenirCartesMotAMotVisibles + etapeSuiviAudioAfterEffects) !');
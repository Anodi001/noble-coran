const fs = require('fs');
const path = require('path');

const dossierSite = path.join(__dirname, 'site');

const codeClientV87 = `
(function() {
  function imp(el, prop, val) {
    if (el && el.style && el.style.getPropertyValue(prop) !== val) {
      el.style.setProperty(prop, val, 'important');
    }
  }

  function appliquerRubanSansRectangles() {
    var tous = document.querySelectorAll('div, p, span');
    var barreSens = null;

    for (var i = 0; i < tous.length; i++) {
      var el = tous[i];
      var txt = el.textContent || '';
      if (el.children.length <= 2 && txt.indexOf('Sens de lecture') !== -1 && txt.indexOf('Cliquer pour inverser') !== -1) {
        barreSens = el;
        break;
      }
    }

    var grille = barreSens ? barreSens.nextElementSibling : null;
    if (!grille || grille.children.length === 0) return;

    // 1. Conteneur unique rassemblant tous les mots côte à côte sans aucun espace
    imp(grille, 'display', 'flex');
    imp(grille, 'flex-wrap', 'wrap');
    imp(grille, 'justify-content', 'center');
    imp(grille, 'align-items', 'stretch');
    imp(grille, 'gap', '0px');
    imp(grille, 'row-gap', '14px');
    imp(grille, 'padding', '16px 14px');
    imp(grille, 'background', 'rgba(8, 19, 36, 0.65)');
    imp(grille, 'border', '1px solid rgba(56, 189, 248, 0.18)');
    imp(grille, 'border-radius', '16px');

    // 2. Suppression totale des rectangles/carrés autour de chaque mot
    var cartes = grille.children;
    for (var j = 0; j < cartes.length; j++) {
      var c = cartes[j];
      imp(c, 'margin', '0px');
      imp(c, 'border-top', 'none');
      imp(c, 'border-left', 'none');
      imp(c, 'border-right', 'none');
      imp(c, 'border-radius', '0px');
      imp(c, 'box-shadow', 'none');
      imp(c, 'outline', 'none');
      imp(c, 'padding', '6px 10px 8px 10px');
      imp(c, 'min-width', '0px');
      imp(c, 'width', 'auto');
      imp(c, 'transform', 'none');

      var enfants = c.children;
      if (enfants.length >= 2) {
        var elNum = enfants.length >= 3 ? enfants[0] : null;
        var elAr = enfants.length >= 3 ? enfants[1] : enfants[0];
        var elFr = enfants[enfants.length - 1];

        var stAr = window.getComputedStyle(elAr);
        var shadowAr = (stAr.textShadow || '') + ' ' + (stAr.color || '');
        var estEnLecture =
          shadowAr.indexOf('56, 189, 248') !== -1 ||
          shadowAr.indexOf('0, 210, 255') !== -1 ||
          shadowAr.indexOf('38bdf8') !== -1 ||
          /active|playing|current/i.test(c.className || '');

        if (estEnLecture) {
          imp(c, 'background', 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.22) 0%, rgba(56, 189, 248, 0) 75%)');
          imp(c, 'border-bottom', '2.5px solid #38bdf8');
          imp(elFr, 'color', '#38bdf8');
          imp(elFr, 'font-weight', '600');
          imp(elFr, 'text-shadow', '0 0 10px rgba(56, 189, 248, 0.7)');
        } else {
          imp(c, 'background', 'transparent');
          imp(c, 'border-bottom', '1px solid rgba(56, 189, 248, 0.12)');
          imp(elFr, 'color', '#94a3b8');
          imp(elFr, 'font-weight', '400');
          imp(elFr, 'text-shadow', 'none');
        }

        if (elNum) {
          imp(elNum, 'font-size', '0.6rem');
          imp(elNum, 'opacity', estEnLecture ? '0.9' : '0.25');
        }
        imp(elFr, 'max-width', '115px');
        imp(elFr, 'text-align', 'center');
        imp(elFr, 'line-height', '1.22');
      }
    }
  }

  setInterval(appliquerRubanSansRectangles, 50);
  document.addEventListener('click', function() {
    setTimeout(appliquerRubanSansRectangles, 10);
  });
})();
`;

const blocHtml = '<!-- WBW_COLLE_V87_START -->\n<script id="wbw-colle-v87">' + codeClientV87 + '</script>\n<!-- WBW_COLLE_V87_END -->';

const fichiers = fs.readdirSync(dossierSite).filter(f => f.endsWith('.html'));
let nb = 0;
for (const f of fichiers) {
  const p = path.join(dossierSite, f);
  let contenu = fs.readFileSync(p, 'utf8');
  contenu = contenu.replace(/<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87)_START -->[\s\S]*?<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87)_END -->\s*/g, '');
  contenu = contenu.replace('</body>', blocHtml + '\n</body>');
  fs.writeFileSync(p, contenu, 'utf8');
  nb++;
}
console.log('✅ V87 appliquée avec succès sur ' + nb + ' pages !');
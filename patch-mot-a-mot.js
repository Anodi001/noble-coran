const fs = require('fs');
const path = require('path');

const dossierSite = path.join(__dirname, 'site');

const blocColleV86 = `<!-- WBW_COLLE_V86_START -->
<script id="wbw-colle-script-v86">
(function() {
  function appliquerStyleImportant(el, prop, val) {
    if (el && el.style && el.style.getPropertyValue(prop) !== val) {
      el.style.setProperty(prop, val, 'important');
    }
  }

  function estDansModale(el) {
    let cur = el;
    while (cur && cur !== document.body) {
      const txt = cur.textContent || '';
      const pos = window.getComputedStyle(cur).position;
      if (pos === 'fixed' && (txt.indexOf('Mot coranique') !== -1 || txt.indexOf('Racine') !== -1)) {
        return true;
      }
      cur = cur.parentElement;
    }
    return false;
  }

  function collerMotsEtSuivi() {
    // 1. Trouve la phrase "Sens de lecture" ou son équivalent au-dessus des mots
    const tous = document.querySelectorAll('div, p, span');
    let conteneurMots = null;

    for (let i = 0; i < tous.length; i++) {
      const el = tous[i];
      if (el.children.length >= 2 && el.children.length <= 200 && !estDansModale(el)) {
        // Vérifie si au moins 2 enfants directs contiennent un numéro + un mot arabe
        let nbCartesMots = 0;
        for (let j = 0; j < Math.min(el.children.length, 6); j++) {
          const enf = el.children[j];
          const t = (enf.textContent || '').trim();
          if (enf.children.length >= 2 && enf.children.length <= 5 && /\\d/.test(t) && /[\\u0600-\\u06FF]/.test(t)) {
            nbCartesMots++;
          }
        }
        if (nbCartesMots >= 1) {
          conteneurMots = el;
          break;
        }
      }
    }

    if (!conteneurMots) return;

    // 2. Transforme le conteneur en un seul bloc continu où tous les mots sont collés
    appliquerStyleImportant(conteneurMots, 'display', 'flex');
    appliquerStyleImportant(conteneurMots, 'flex-wrap', 'wrap');
    appliquerStyleImportant(conteneurMots, 'justify-content', 'center');
    appliquerStyleImportant(conteneurMots, 'align-items', 'stretch');
    appliquerStyleImportant(conteneurMots, 'gap', '0px');
    appliquerStyleImportant(conteneurMots, 'row-gap', '12px');
    appliquerStyleImportant(conteneurMots, 'padding', '14px 10px');
    appliquerStyleImportant(conteneurMots, 'background', 'rgba(9, 20, 38, 0.65)');
    appliquerStyleImportant(conteneurMots, 'border', '1px solid rgba(56, 189, 248, 0.18)');
    appliquerStyleImportant(conteneurMots, 'border-radius', '16px');

    // 3. Parcourt chaque mot pour supprimer son rectangle/carré et les coller côte à côte
    const cartes = conteneurMots.children;
    for (let i = 0; i < cartes.length; i++) {
      const carte = cartes[i];
      if (carte.children.length < 2) continue;

      let elNum = null, elAr = null, elFr = null;
      for (let k = 0; k < carte.children.length; k++) {
        const ch = carte.children[k];
        const txt = (ch.textContent || '').trim();
        if (/^\\d{1,3}$/.test(txt)) elNum = ch;
        else if (/[\\u0600-\\u06FF]/.test(txt)) elAr = ch;
        else if (txt.length > 0) elFr = ch;
      }
      if (!elAr) continue;

      // Détecte si ce mot est actuellement récité par le mode Suivi (via la couleur ou l'ombre du mot arabe)
      const styleAr = window.getComputedStyle(elAr);
      const shadowAr = styleAr.textShadow || '';
      const colorAr = styleAr.color || '';
      const carteClass = carte.className || '';
      const estActif =
        shadowAr.indexOf('56, 189, 248') !== -1 ||
        shadowAr.indexOf('0, 210, 255') !== -1 ||
        shadowAr.indexOf('38bdf8') !== -1 ||
        colorAr.indexOf('56, 189, 248') !== -1 ||
        /active|playing|current/i.test(carteClass) ||
        (shadowAr !== 'none' && shadowAr.indexOf('255, 255, 255, 0.14') === -1 && shadowAr.indexOf('rgba(255, 255, 255') === -1);

      // Supprime le rectangle autour du mot et colle la case à ses voisines
      appliquerStyleImportant(carte, 'margin', '0px');
      appliquerStyleImportant(carte, 'border-radius', '0px');
      appliquerStyleImportant(carte, 'border-top', 'none');
      appliquerStyleImportant(carte, 'border-left', 'none');
      appliquerStyleImportant(carte, 'border-right', 'none');
      appliquerStyleImportant(carte, 'box-shadow', 'none');
      appliquerStyleImportant(carte, 'transform', 'none');
      appliquerStyleImportant(carte, 'padding', '6px 9px 8px 9px');
      appliquerStyleImportant(carte, 'min-width', 'auto');
      appliquerStyleImportant(carte, 'width', 'auto');

      if (estActif) {
        appliquerStyleImportant(carte, 'background', 'linear-gradient(180deg, rgba(56,189,248,0.20) 0%, rgba(56,189,248,0.04) 100%)');
        appliquerStyleImportant(carte, 'border-bottom', '2.5px solid #38bdf8');
        if (elFr) {
          appliquerStyleImportant(elFr, 'color', '#38bdf8');
          appliquerStyleImportant(elFr, 'font-weight', '600');
          appliquerStyleImportant(elFr, 'text-shadow', '0 0 10px rgba(56,189,248,0.65)');
        }
      } else {
        appliquerStyleImportant(carte, 'background', 'transparent');
        appliquerStyleImportant(carte, 'border-bottom', '2px solid rgba(56,189,248,0.10)');
        if (elFr) {
          appliquerStyleImportant(elFr, 'color', '#94a3b8');
          appliquerStyleImportant(elFr, 'font-weight', '400');
          appliquerStyleImportant(elFr, 'text-shadow', 'none');
        }
      }

      if (elNum) {
        appliquerStyleImportant(elNum, 'font-size', '0.62rem');
        appliquerStyleImportant(elNum, 'opacity', estActif ? '0.9' : '0.28');
      }
      if (elFr) {
        appliquerStyleImportant(elFr, 'max-width', '115px');
        appliquerStyleImportant(elFr, 'text-align', 'center');
        appliquerStyleImportant(elFr, 'line-height', '1.2');
      }
    }
  }

  setInterval(collerMotsEtSuivi, 60);
  document.addEventListener('click', function() {
    setTimeout(collerMotsEtSuivi, 15);
  });
})();
</script>
<!-- WBW_COLLE_V86_END -->`;

function patcher(html) {
  let propre = html
    .replace(/<!-- WBW_RIBBON_V83_START -->[\s\S]*?<!-- WBW_RIBBON_V83_END -->\s*/g, '')
    .replace(/<!-- WBW_UNIFIED_V84_START -->[\s\S]*?<!-- WBW_UNIFIED_V84_END -->\s*/g, '')
    .replace(/<!-- WBW_CLEAN_V85_START -->[\s\S]*?<!-- WBW_CLEAN_V85_END -->\s*/g, '')
    .replace(/<!-- WBW_COLLE_V86_START -->[\s\S]*?<!-- WBW_COLLE_V86_END -->\s*/g, '');
  return propre.replace('</body>', blocColleV86 + '\n</body>');
}

const fichiers = fs.readdirSync(dossierSite).filter(f => f.endsWith('.html'));
let nb = 0;
for (const f of fichiers) {
  const p = path.join(dossierSite, f);
  for (let essai = 0; essai < 12; essai++) {
    try {
      const c = fs.readFileSync(p, 'utf8');
      fs.writeFileSync(p, patcher(c), 'utf8');
      nb++;
      break;
    } catch (e) {
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80);
    }
  }
}
console.log('✅ Terminé : ' + nb + ' pages mises à jour avec les mots collés sans rectangles (V86) !');
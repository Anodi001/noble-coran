const fs = require('fs');
const path = require('path');

const dossierSite = path.join(__dirname, 'site');

const blocUnifieV84 = `<!-- WBW_UNIFIED_V84_START -->
<style id="wbw-unified-style-v84">
  /* Conteneur unique rassemblant tout le verset Mot à mot sans boîtes séparées */
  .wbw-unified-grid {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    align-items: baseline !important;
    gap: 4px 2px !important;
    row-gap: 18px !important;
    padding: 20px 18px !important;
    margin-top: 8px !important;
    background: rgba(8, 19, 36, 0.55) !important;
    border: 1px solid rgba(56, 189, 248, 0.16) !important;
    border-radius: 18px !important;
  }

  /* Suppression totale des rectangles/carrés autour de chaque mot */
  .wbw-unified-grid > .wbw-unified-item {
    background: transparent !important;
    background-color: transparent !important;
    background-image: none !important;
    border: none !important;
    border-bottom: 2px solid transparent !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    outline: none !important;
    margin: 0 !important;
    padding: 4px 10px 7px 10px !important;
    min-width: auto !important;
    width: auto !important;
    height: auto !important;
    display: inline-flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    position: relative !important;
    transform: none !important;
    transition: border-color 0.12s ease, background 0.12s ease !important;
  }

  /* Numéro du mot ultra-discret pour ne pas gêner la lecture */
  .wbw-unified-grid > .wbw-unified-item .wbw-part-num {
    position: static !important;
    font-size: 0.62rem !important;
    opacity: 0.32 !important;
    color: #94a3b8 !important;
    line-height: 1 !important;
    margin-bottom: 2px !important;
  }

  /* Mot arabe rassemblé sur la même ligne visuelle */
  .wbw-unified-grid > .wbw-unified-item .wbw-part-ar {
    font-size: clamp(1.65rem, 2.5vw, 2.05rem) !important;
    line-height: 1.45 !important;
    color: #f8fafc !important;
    margin: 2px 0 4px 0 !important;
    padding: 0 2px !important;
    white-space: nowrap !important;
    transition: color 0.12s ease, text-shadow 0.12s ease !important;
  }

  /* Traduction française directement rattachée sous le mot arabe */
  .wbw-unified-grid > .wbw-unified-item .wbw-part-fr {
    font-size: 0.84rem !important;
    line-height: 1.25 !important;
    color: #94a3b8 !important;
    text-align: center !important;
    max-width: 118px !important;
    word-break: break-word !important;
    transition: color 0.12s ease, text-shadow 0.12s ease !important;
  }

  /* Mode Suivi + Mot à mot : le mot arabe ET son français s'illuminent ensemble sans rectangle */
  .wbw-unified-grid > .wbw-unified-item.wbw-word-now {
    background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.18) 0%, rgba(56, 189, 248, 0) 75%) !important;
    border-bottom: 2.5px solid #38bdf8 !important;
  }

  .wbw-unified-grid > .wbw-unified-item.wbw-word-now .wbw-part-ar {
    color: #38bdf8 !important;
    text-shadow: 0 0 16px rgba(56, 189, 248, 0.9) !important;
  }

  .wbw-unified-grid > .wbw-unified-item.wbw-word-now .wbw-part-fr {
    color: #e0f2fe !important;
    font-weight: 600 !important;
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.75) !important;
  }

  .wbw-unified-grid > .wbw-unified-item.wbw-word-now .wbw-part-num {
    opacity: 0.9 !important;
    color: #38bdf8 !important;
  }
</style>
<script id="wbw-unified-script-v84">
(function() {
  function signatureOrigine(card) {
    const cls = (card.className || '').replace(/\\b(wbw-unified-item|wbw-word-now)\\b/g, '').trim();
    const st = card.getAttribute('style') || '';
    return cls + '||' + st;
  }

  function actualiserMotAMotUnifie() {
    // Repère la barre "Sens de lecture" juste au-dessus des mots
    const candidats = document.querySelectorAll('div, p, span');
    let toggleEl = null;
    for (let i = 0; i < candidats.length; i++) {
      const el = candidats[i];
      if (el.children.length <= 2 && el.textContent && el.textContent.indexOf('Sens de lecture') !== -1) {
        toggleEl = el;
        break;
      }
    }
    if (!toggleEl) return;

    let grid = toggleEl.nextElementSibling;
    if (!grid || grid.children.length === 0) {
      const parent = toggleEl.parentElement;
      if (!parent) return;
      for (let j = 0; j < parent.children.length; j++) {
        const c = parent.children[j];
        if (c !== toggleEl && c.children.length > 0 && /[\\u0600-\\u06FF]/.test(c.textContent || '')) {
          grid = c;
          break;
        }
      }
    }
    if (!grid || grid.children.length === 0) return;

    if (!grid.classList.contains('wbw-unified-grid')) {
      grid.classList.add('wbw-unified-grid');
    }

    const cards = grid.children;
    const n = cards.length;
    const freq = {};
    const sigs = new Array(n);

    for (let i = 0; i < n; i++) {
      const card = cards[i];
      if (!card.classList.contains('wbw-unified-item')) {
        card.classList.add('wbw-unified-item');
      }
      if (card.dataset.wbwTagged !== '1') {
        for (let k = 0; k < card.children.length; k++) {
          const ch = card.children[k];
          const txt = (ch.textContent || '').trim();
          if (/^\\d+$/.test(txt)) {
            ch.classList.add('wbw-part-num');
          } else if (/[\\u0600-\\u06FF]/.test(txt)) {
            ch.classList.add('wbw-part-ar');
          } else if (txt.length > 0) {
            ch.classList.add('wbw-part-fr');
          }
        }
        card.dataset.wbwTagged = '1';
      }

      const s = signatureOrigine(card);
      sigs[i] = s;
      freq[s] = (freq[s] || 0) + 1;
    }

    // Détecte la signature normale (inactive) majoritaire parmi les mots du verset
    let sigInactive = null;
    let maxCount = 0;
    for (const k in freq) {
      if (freq[k] > maxCount) {
        maxCount = freq[k];
        sigInactive = k;
      }
    }

    // Si tous les mots ont la même signature (aucun mot récité à cet instant), on mémorise cette signature de repos
    if (maxCount === n && sigInactive) {
      grid.dataset.reposSig = sigInactive;
    }
    const refRepos = grid.dataset.reposSig || sigInactive;

    // Applique l'illumination Arabe + Français uniquement sur le mot en cours de récitation
    for (let i = 0; i < n; i++) {
      const card = cards[i];
      const estActif = (maxCount < n && sigs[i] !== refRepos) || /active|playing|current|highlight/i.test(sigs[i]);
      if (estActif) {
        if (!card.classList.contains('wbw-word-now')) card.classList.add('wbw-word-now');
      } else {
        if (card.classList.contains('wbw-word-now')) card.classList.remove('wbw-word-now');
      }
    }
  }

  setInterval(actualiserMotAMotUnifie, 80);
  document.addEventListener('click', function() {
    setTimeout(actualiserMotAMotUnifie, 20);
  });
})();
</script>
<!-- WBW_UNIFIED_V84_END -->`;

function patcherHtml(html) {
  let propre = html
    .replace(/<!-- WBW_RIBBON_V83_START -->[\s\S]*?<!-- WBW_RIBBON_V83_END -->\s*/g, '')
    .replace(/<!-- WBW_UNIFIED_V84_START -->[\s\S]*?<!-- WBW_UNIFIED_V84_END -->\s*/g, '');
  return propre.replace('</body>', blocUnifieV84 + '\n</body>');
}

const fichiers = fs.readdirSync(dossierSite).filter(f => f.endsWith('.html'));
let nb = 0;
for (const f of fichiers) {
  const p = path.join(dossierSite, f);
  for (let essai = 0; essai < 12; essai++) {
    try {
      const c = fs.readFileSync(p, 'utf8');
      fs.writeFileSync(p, patcherHtml(c), 'utf8');
      nb++;
      break;
    } catch (e) {
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80);
    }
  }
}
console.log('✅ ' + nb + ' pages mises à jour avec le Mot à mot Assemblé (sans rectangles) + Suivi Arabe/Français V84 !');
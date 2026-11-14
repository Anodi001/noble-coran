const fs = require('fs');
const path = require('path');

const dossierSite = path.join(__dirname, 'site');

const blocPropreV85 = `<!-- WBW_CLEAN_V85_START -->
<style id="wbw-clean-style-v85">
  /* 1. Correction du menu déroulant des récitateurs coupé à droite en mode Arabe (RTL) ou petit écran */
  [dir="rtl"] [id*="reciter" i][id*="menu" i],
  [dir="rtl"] [id*="reciter" i][id*="list" i],
  [dir="rtl"] [class*="reciter" i][class*="menu" i],
  [dir="rtl"] [class*="reciter" i][class*="dropdown" i],
  .reciter-dropdown-fixed-rtl {
    right: 0 !important;
    left: auto !important;
    direction: ltr !important;
    text-align: left !important;
    max-width: calc(100vw - 24px) !important;
  }

  /* 2. Mode Mot à mot assemblé sans aucun rectangle ni carré autour des mots */
  .wbw-assembled-container {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    align-items: baseline !important;
    gap: 2px 0px !important;
    row-gap: 16px !important;
    padding: 18px 14px !important;
    background: rgba(8, 19, 36, 0.5) !important;
    border: 1px solid rgba(56, 189, 248, 0.15) !important;
    border-radius: 16px !important;
  }

  .wbw-assembled-container > .wbw-assembled-word {
    background: transparent !important;
    background-color: transparent !important;
    background-image: none !important;
    border: none !important;
    border-bottom: 2px solid transparent !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    margin: 0 !important;
    padding: 4px 9px 6px 9px !important;
    min-width: 0 !important;
    width: auto !important;
    height: auto !important;
    display: inline-flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    transform: none !important;
    transition: border-color 0.12s ease, background 0.12s ease !important;
  }

  .wbw-assembled-container > .wbw-assembled-word .wbw-sub-num {
    position: static !important;
    font-size: 0.6rem !important;
    opacity: 0.28 !important;
    color: #94a3b8 !important;
    line-height: 1 !important;
    margin-bottom: 1px !important;
  }

  .wbw-assembled-container > .wbw-assembled-word .wbw-sub-ar {
    font-size: clamp(1.65rem, 2.5vw, 2.05rem) !important;
    line-height: 1.4 !important;
    color: #f8fafc !important;
    margin: 1px 0 3px 0 !important;
    white-space: nowrap !important;
    transition: color 0.12s ease, text-shadow 0.12s ease !important;
  }

  .wbw-assembled-container > .wbw-assembled-word .wbw-sub-tr {
    font-size: 0.82rem !important;
    line-height: 1.2 !important;
    color: #94a3b8 !important;
    text-align: center !important;
    max-width: 115px !important;
    word-break: break-word !important;
    transition: color 0.12s ease, text-shadow 0.12s ease !important;
  }

  /* 3. Illumination simultanée du mot arabe + français en mode Suivi */
  .wbw-assembled-container > .wbw-assembled-word.wbw-follow-on {
    background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.18) 0%, rgba(56, 189, 248, 0) 75%) !important;
    border-bottom: 2.5px solid #38bdf8 !important;
  }

  .wbw-assembled-container > .wbw-assembled-word.wbw-follow-on .wbw-sub-ar {
    color: #38bdf8 !important;
    text-shadow: 0 0 15px rgba(56, 189, 248, 0.9) !important;
  }

  .wbw-assembled-container > .wbw-assembled-word.wbw-follow-on .wbw-sub-tr {
    color: #e0f2fe !important;
    font-weight: 600 !important;
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.75) !important;
  }

  .wbw-assembled-container > .wbw-assembled-word.wbw-follow-on .wbw-sub-num {
    opacity: 0.85 !important;
    color: #38bdf8 !important;
  }
</style>
<script id="wbw-clean-script-v85">
(function() {
  function estCarteMotValide(el) {
    if (!el || el.children.length < 2 || el.children.length > 4) return false;
    const txtGlobal = el.textContent || '';
    if (txtGlobal.indexOf('Mot coranique') !== -1 || txtGlobal.indexOf('Racine') !== -1 || txtGlobal.indexOf('Fermer') !== -1) {
      return false;
    }
    let aNumero = false;
    let aArabe = false;
    for (let i = 0; i < el.children.length; i++) {
      const t = (el.children[i].textContent || '').trim();
      if (/^\\d{1,3}$/.test(t)) aNumero = true;
      else if (/[\\u0600-\\u06FF]/.test(t)) aArabe = true;
    }
    return aNumero && aArabe;
  }

  function signatureEtat(card) {
    const cls = (card.className || '').replace(/\\b(wbw-assembled-word|wbw-follow-on)\\b/g, '').trim();
    const st = card.getAttribute('style') || '';
    return cls + '||' + st;
  }

  function verifierMenuRecitateurRtl() {
    const divs = document.querySelectorAll('div, ul');
    for (let i = 0; i < divs.length; i++) {
      const d = divs[i];
      const txt = d.textContent || '';
      if (txt.indexOf('Yasser Al-Dosari') !== -1 && txt.indexOf('Mishary Rashid') !== -1 && d.children.length >= 4 && d.offsetWidth < 500) {
        const rect = d.getBoundingClientRect();
        if (document.documentElement.dir === 'rtl' || rect.right > window.innerWidth - 8) {
          d.classList.add('reciter-dropdown-fixed-rtl');
        }
      }
    }
  }

  function appliquerMotAMotAssemble() {
    verifierMenuRecitateurRtl();

    // Trouve uniquement le vrai conteneur dont les enfants directs sont les cartes numérotées (1, 2, 3...)
    const tous = document.querySelectorAll('div');
    let vraiConteneur = null;
    for (let i = 0; i < tous.length; i++) {
      const d = tous[i];
      if (d.children.length >= 1 && d.children.length <= 200 && estCarteMotValide(d.children[0])) {
        vraiConteneur = d;
        break;
      }
    }
    if (!vraiConteneur) return;

    if (!vraiConteneur.classList.contains('wbw-assembled-container')) {
      vraiConteneur.classList.add('wbw-assembled-container');
    }

    const cards = vraiConteneur.children;
    const n = cards.length;
    const freq = {};
    const sigs = new Array(n);

    for (let i = 0; i < n; i++) {
      const card = cards[i];
      if (!card.classList.contains('wbw-assembled-word')) {
        card.classList.add('wbw-assembled-word');
      }
      for (let k = 0; k < card.children.length; k++) {
        const ch = card.children[k];
        const t = (ch.textContent || '').trim();
        if (/^\\d{1,3}$/.test(t)) ch.classList.add('wbw-sub-num');
        else if (/[\\u0600-\\u06FF]/.test(t)) ch.classList.add('wbw-sub-ar');
        else if (t.length > 0) ch.classList.add('wbw-sub-tr');
      }

      const s = signatureEtat(card);
      sigs[i] = s;
      freq[s] = (freq[s] || 0) + 1;
    }

    let sigRepos = null;
    let maxCount = 0;
    for (const k in freq) {
      if (freq[k] > maxCount) {
        maxCount = freq[k];
        sigRepos = k;
      }
    }
    if (maxCount === n && sigRepos) {
      vraiConteneur.dataset.reposSig = sigRepos;
    }
    const refRepos = vraiConteneur.dataset.reposSig || sigRepos;

    for (let i = 0; i < n; i++) {
      const card = cards[i];
      const actif = (maxCount < n && sigs[i] !== refRepos) || /active|playing|current|highlight/i.test(sigs[i]);
      if (actif) {
        if (!card.classList.contains('wbw-follow-on')) card.classList.add('wbw-follow-on');
      } else {
        if (card.classList.contains('wbw-follow-on')) card.classList.remove('wbw-follow-on');
      }
    }
  }

  setInterval(appliquerMotAMotAssemble, 80);
  document.addEventListener('click', function() {
    setTimeout(appliquerMotAMotAssemble, 15);
  });
})();
</script>
<!-- WBW_CLEAN_V85_END -->`;

function nettoyerEtPatcher(html) {
  let propre = html
    .replace(/<!-- WBW_RIBBON_V83_START -->[\s\S]*?<!-- WBW_RIBBON_V83_END -->\s*/g, '')
    .replace(/<!-- WBW_UNIFIED_V84_START -->[\s\S]*?<!-- WBW_UNIFIED_V84_END -->\s*/g, '')
    .replace(/<!-- WBW_CLEAN_V85_START -->[\s\S]*?<!-- WBW_CLEAN_V85_END -->\s*/g, '');
  return propre.replace('</body>', blocPropreV85 + '\n</body>');
}

const fichiers = fs.readdirSync(dossierSite).filter(f => f.endsWith('.html'));
let nb = 0;
for (const f of fichiers) {
  const p = path.join(dossierSite, f);
  for (let essai = 0; essai < 12; essai++) {
    try {
      const c = fs.readFileSync(p, 'utf8');
      fs.writeFileSync(p, nettoyerEtPatcher(c), 'utf8');
      nb++;
      break;
    } catch (e) {
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80);
    }
  }
}
console.log('✅ V85 appliquée sur ' + nb + ' pages : Pop-up corrigée + Menu récitateur RTL corrigé + Mot à mot assemblé sans rectangles !');
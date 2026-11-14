const fs = require('fs');
const path = require('path');

const dossierSite = path.join(__dirname, 'site');

const blocAmeliorationWbw = `<!-- WBW_RIBBON_V83_START -->
<style id="wbw-ribbon-style-v83">
  /* Ruban continu collé pour le mode Mot à mot + Suivi */
  .wbw-ribbon-row {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    align-items: stretch !important;
    gap: 0px !important;
    row-gap: 10px !important;
    padding: 6px 4px !important;
  }
  .wbw-ribbon-row > .wbw-ribbon-unit {
    margin: 0 !important;
    border-radius: 0 !important;
    border: none !important;
    border-top: 1px solid rgba(56, 189, 248, 0.14) !important;
    border-bottom: 2px solid rgba(56, 189, 248, 0.18) !important;
    border-right: 1px solid rgba(56, 189, 248, 0.07) !important;
    background: rgba(11, 24, 43, 0.72) !important;
    box-shadow: none !important;
    padding: 10px 11px 9px 11px !important;
    min-width: 64px !important;
    display: inline-flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: space-between !important;
    position: relative !important;
    transition: background 0.14s ease, border-color 0.14s ease !important;
    transform: none !important;
  }
  /* Arrondis doux uniquement aux extrémités du ruban */
  .wbw-ribbon-row > .wbw-ribbon-unit:first-child {
    border-top-right-radius: 12px !important;
    border-bottom-right-radius: 12px !important;
    border-right: 1px solid rgba(56, 189, 248, 0.18) !important;
  }
  .wbw-ribbon-row > .wbw-ribbon-unit:last-child {
    border-top-left-radius: 12px !important;
    border-bottom-left-radius: 12px !important;
    border-left: 1px solid rgba(56, 189, 248, 0.18) !important;
  }
  /* Illumination fluide et collée en mode Suivi (Follow) */
  .wbw-ribbon-row > .wbw-ribbon-unit.active,
  .wbw-ribbon-row > .wbw-ribbon-unit.playing,
  .wbw-ribbon-row > .wbw-ribbon-unit.follow-active,
  .wbw-ribbon-row > .wbw-ribbon-unit.wbw-active,
  .wbw-ribbon-row > .wbw-ribbon-unit[ data-active="true" ] {
    background: linear-gradient(180deg, rgba(56, 189, 248, 0.26) 0%, rgba(14, 116, 144, 0.18) 100%) !important;
    border-bottom: 3px solid #38bdf8 !important;
    border-top-color: rgba(56, 189, 248, 0.55) !important;
    box-shadow: 0 4px 16px rgba(56, 189, 248, 0.22) !important;
    transform: none !important;
    z-index: 2 !important;
  }
  .wbw-ribbon-row > .wbw-ribbon-unit.active *,
  .wbw-ribbon-row > .wbw-ribbon-unit.playing *,
  .wbw-ribbon-row > .wbw-ribbon-unit.follow-active *,
  .wbw-ribbon-row > .wbw-ribbon-unit.wbw-active * {
    text-shadow: 0 0 12px rgba(56, 189, 248, 0.75) !important;
  }
</style>
<script id="wbw-ribbon-script-v83">
(function(){
  function appliquerRubanColle() {
    // Détecte le conteneur Mot à mot via ses cartes enfants (mot arabe + traduction + numéro)
    const candidats = document.querySelectorAll('div, section');
    for (let i = 0; i < candidats.length; i++) {
      const el = candidats[i];
      if (el.children.length >= 1 && el.children.length <= 150) {
        const c0 = el.children[0];
        const style = window.getComputedStyle(el);
        if ((style.display === 'flex' || style.display === 'grid') && c0 && /[\\u0600-\\u06FF]/.test(c0.textContent || '')) {
          // Vérifie que ce sont bien des boîtes de mots individuels
          if (c0.children.length >= 2 && c0.offsetWidth < 320 && c0.offsetHeight < 220) {
            el.classList.add('wbw-ribbon-row');
            for (let j = 0; j < el.children.length; j++) {
              const card = el.children[j];
              card.classList.add('wbw-ribbon-unit');
              card.style.margin = '0px';
              card.style.borderRadius = '0px';
              card.style.boxShadow = 'none';
              // Harmonise la largeur des traductions longues pour éviter les grands rectangles
              const sousTextes = card.querySelectorAll('div, span, p');
              for (let k = 0; k < sousTextes.length; k++) {
                const st = sousTextes[k];
                if (!/[\\u0600-\\u06FF]/.test(st.textContent || '') && (st.textContent || '').trim().length > 2) {
                  st.style.maxWidth = '125px';
                  st.style.lineHeight = '1.2';
                  st.style.textAlign = 'center';
                  st.style.wordBreak = 'break-word';
                }
              }
            }
          }
        }
      }
    }
  }

  // Correction des bugs de suivi audio (Mot 1 sauté + Fin de verset figée)
  function synchroniserPremierEtDernierMot() {
    const audios = document.querySelectorAll('audio');
    audios.forEach(function(audio) {
      if (audio._wbwSyncV83) return;
      audio._wbwSyncV83 = true;

      audio.addEventListener('play', function() {
        appliquerRubanColle();
        if (audio.currentTime < 0.25) {
          const row = document.querySelector('.wbw-ribbon-row');
          if (row && row.children.length > 0) {
            row.children[0].classList.add('wbw-active');
          }
        }
      });

      audio.addEventListener('timeupdate', function() {
        const row = document.querySelector('.wbw-ribbon-row');
        if (row && row.children.length > 1 && audio.currentTime > 0.35) {
          row.children[0].classList.remove('wbw-active');
        }
      });

      audio.addEventListener('ended', function() {
        document.querySelectorAll('.wbw-ribbon-unit').forEach(function(u) {
          u.classList.remove('active', 'playing', 'follow-active', 'wbw-active');
        });
      });
    });
  }

  const obs = new MutationObserver(function() {
    appliquerRubanColle();
    synchroniserPremierEtDernierMot();
  });

  function initWbwV83() {
    appliquerRubanColle();
    synchroniserPremierEtDernierMot();
    if (document.body) {
      obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWbwV83);
  } else {
    initWbwV83();
  }
})();
</script>
<!-- WBW_RIBBON_V83_END -->`;

function patcherContenuHtml(html) {
  let propre = html.replace(/<!-- WBW_RIBBON_V83_START -->[\s\S]*?<!-- WBW_RIBBON_V83_END -->\s*/g, '');
  return propre.replace('</body>', blocAmeliorationWbw + '\n</body>');
}

// 1. Patcher toutes les pages HTML générées dans site/
const fichiers = fs.readdirSync(dossierSite).filter(f => f.endsWith('.html'));
let nb = 0;
for (const f of fichiers) {
  const p = path.join(dossierSite, f);
  for (let essai = 0; essai < 10; essai++) {
    try {
      const c = fs.readFileSync(p, 'utf8');
      fs.writeFileSync(p, patcherContenuHtml(c), 'utf8');
      nb++;
      break;
    } catch (e) {
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80);
    }
  }
}
console.log('✅ ' + nb + ' pages HTML mises à jour avec le Ruban Continu Collé (sans carrés ni espaces) + Correctif Suivi V83 !');
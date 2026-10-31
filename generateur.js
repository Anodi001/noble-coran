const fs = require('fs');
const path = require('path');

// Ton nom de domaine officiel
const URL_SITE = 'https://corantafsir.com';

const dossierSite = path.join(__dirname, 'site');
const fichiers = fs.readdirSync(dossierSite);

// Fonction audio allégée : uniquement Yasser Al-Dosari
const NOUVEAU_CODE_AUDIO = `
  function majSourceAudio() {
    audio.src = "https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/" + codeAudio + ".mp3";
  }
`;

// Fonction utilitaire pour trouver la fin d'une balise HTML (<div>...</div>, <p>...</p>, <a>...</a>)
function trouverFinBalise(html, indexDebut) {
  const matchOuverture = html.slice(indexDebut).match(/^<([a-zA-Z0-9]+)/);
  if (!matchOuverture) return -1;
  const nomBalise = matchOuverture[1].toLowerCase();
  const regexBalises = new RegExp(`<(\\/?)${nomBalise}\\b[^>]*>`, 'gi');
  regexBalises.lastIndex = indexDebut;

  let profondeur = 0;
  let match;
  while ((match = regexBalises.exec(html)) !== null) {
    if (match[1] === '/') {
      profondeur--;
    } else if (!match[0].endsWith('/>')) {
      profondeur++;
    }
    if (profondeur === 0) {
      return regexBalises.lastIndex;
    }
  }
  return -1;
}

function nettoyerPageHtml(contenu) {
  // 1. Supprimer les 2 encadrés verts secondaires (entre le Tafsîr principal et la signature Hamidullah)
  const matchHeaderTafsir = contenu.match(/TAFS[ĪI]R\s*(?:&|&amp;)\s*EXPLICATION DU VERSET[\s\S]*?<\/(?:div|h[1-6]|p|span)>/i);
  if (matchHeaderTafsir) {
    const finHeader = matchHeaderTafsir.index + matchHeaderTafsir[0].length;
    const apresHeader = contenu.slice(finHeader);
    const matchPremierBloc = apresHeader.match(/^\s*<(?:div|p)\b/i);
    if (matchPremierBloc) {
      const debutPremierBloc = finHeader + matchPremierBloc.index + matchPremierBloc[0].indexOf('<');
      const finPremierBloc = trouverFinBalise(contenu, debutPremierBloc);
      const idxSignature = contenu.indexOf('Traduction originale de Muhammad Hamidullah', finPremierBloc);
      if (finPremierBloc !== -1 && idxSignature !== -1 && idxSignature > finPremierBloc) {
        const debutBaliseSignature = contenu.lastIndexOf('<', idxSignature);
        if (debutBaliseSignature >= finPremierBloc && (debutBaliseSignature - finPremierBloc) < 4500) {
          contenu = contenu.slice(0, finPremierBloc) + '\n' + contenu.slice(debutBaliseSignature);
        }
      }
    }
  }

  // 2. Supprimer le bloc entouré en rouge (Ouverture de Sourate / Verset précédent / Verset suivant)
  const idxSig = contenu.indexOf('Traduction originale de Muhammad Hamidullah');
  if (idxSig !== -1) {
    let curseur = contenu.indexOf('>', idxSig);
    // Avancer jusqu'à la sortie de la carte du Tafsîr
    const reste = contenu.slice(curseur);
    const matchSortieCarte = reste.match(/^(?:[^<]*<\/(?:p|div|span|section|article)>\s*)+/i);
    if (matchSortieCarte) {
      curseur += matchSortieCarte[0].length;
      // Vérifier et supprimer les blocs de prévisualisation de versets qui suivent immédiatement
      for (let i = 0; i < 2; i++) {
        const suite = contenu.slice(curseur);
        const matchProchaineBalise = suite.match(/^\s*<(?:div|a|section|nav)\b/i);
        if (!matchProchaineBalise) break;
        const debutBloc = curseur + matchProchaineBalise.index + matchProchaineBalise[0].indexOf('<');
        const finBloc = trouverFinBalise(contenu, debutBloc);
        if (finBloc !== -1 && (finBloc - debutBloc) < 2500) {
          const blocTexte = contenu.slice(debutBloc, finBloc);
          if (/Ouverture de Sourate|Verset suivant\s*\(|Verset pr[ée]c[ée]dent\s*\(|inaugure la sourate|cl[ôo]ture la sourate|Fin de Sourate/i.test(blocTexte)) {
            contenu = contenu.slice(0, debutBloc) + contenu.slice(finBloc);
            curseur = debutBloc;
            continue;
          }
        }
        break;
      }
    }
  }

  // 3. Mettre à jour la signature avec uniquement Hamidullah + Al-Mukhtasar
  contenu = contenu.replace(
    /Traduction originale de Muhammad Hamidullah \(1977\)\s*(?:•|&bull;)\s*Synthèse conforme à l'unanimité des exégètes[^<]*/g,
    'Traduction originale de Muhammad Hamidullah (1977) • Exégèse (Tafsīr) Al-Mukhtasar.'
  );

  // 4. Garder uniquement Yasser Al-Dosari dans la liste déroulante
  contenu = contenu.replace(
    /(<select[^>]*>)([\s\S]*?(?:kbps|Maher_Haramain_HD|Yasser)[\s\S]*?)(<\/select>)/,
    '$1<option value="Yasser_Ad-Dussary_128kbps" selected>Yasser Al-Dosari</option>$3'
  );

  // 5. Alléger le script audio
  contenu = contenu.replace(
    /(?:const VERSETS_PAR_SOURATE[\s\S]*?)?function majSourceAudio\(\)\s*\{[\s\S]*?everyayah\.com\/data\/"\s*\+\s*select\.value\s*\+\s*"\/"\s*\+\s*codeAudio\s*\+\s*"\.mp3";\s*\}\s*\}?/,
    NOUVEAU_CODE_AUDIO.trim()
  );

  // 6. Optimiser la vitesse (ne télécharge pas l'audio avant le clic)
  contenu = contenu.replace(/<audio(?![^>]*preload)/g, '<audio preload="none"');

  // 7. Remplacer l'ancien domaine par https://corantafsir.com
  contenu = contenu.replace(/https:\/\/lenoblecoran\.pages\.dev/g, URL_SITE);

  return contenu;
}

let compteurPages = 0;
let urlsSitemap = [
  `  <url><loc>${URL_SITE}/index.html</loc><priority>1.0</priority></url>`
];

console.log('⚡ Nettoyage des 6 236 pages (Suppression des blocs + Al-Mukhtasar + Yasser Al-Dosari)...');

for (const fichier of fichiers) {
  if (fichier.startsWith('sourate-') && fichier.endsWith('.html')) {
    const chemin = path.join(dossierSite, fichier);
    let contenu = fs.readFileSync(chemin, 'utf8');

    contenu = nettoyerPageHtml(contenu);

    if (!contenu.includes('rel="manifest"')) {
      contenu = contenu.replace(
        '</head>',
        `  <link rel="canonical" href="${URL_SITE}/${fichier}">\n  <link rel="manifest" href="manifest.json">\n  <meta name="theme-color" content="#020406">\n</head>`
      );
    }

    fs.writeFileSync(chemin, contenu, 'utf8');
    urlsSitemap.push(`  <url><loc>${URL_SITE}/${fichier}</loc><priority>0.8</priority></url>`);
    compteurPages++;
  }
}

// Nettoyer aussi index.html
const cheminIndex = path.join(dossierSite, 'index.html');
if (fs.existsSync(cheminIndex)) {
  let indexContenu = fs.readFileSync(cheminIndex, 'utf8');
  indexContenu = indexContenu.replace(/https:\/\/lenoblecoran\.pages\.dev/g, URL_SITE);
  indexContenu = indexContenu.replace(
    /Traduction originale de Muhammad Hamidullah \(1977\)\s*(?:•|&bull;)\s*Synthèse conforme à l'unanimité des exégètes[^<]*/g,
    'Traduction originale de Muhammad Hamidullah (1977) • Exégèse (Tafsīr) Al-Mukhtasar.'
  );
  fs.writeFileSync(cheminIndex, indexContenu, 'utf8');
}

// Générer sitemap.xml propre sur https://corantafsir.com
const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsSitemap.join('\n')}\n</urlset>`;
fs.writeFileSync(path.join(dossierSite, 'sitemap.xml'), sitemapXML, 'utf8');

// Générer robots.txt
const robotsTxt = `User-agent: *\nAllow: /\nSitemap: ${URL_SITE}/sitemap.xml\n`;
fs.writeFileSync(path.join(dossierSite, 'robots.txt'), robotsTxt, 'utf8');

// Générer manifest.json
const manifestJSON = {
  name: "Le Noble Coran & Tafsīr Al-Mukhtasar",
  short_name: "Coran Tafsīr",
  description: "Le Noble Coran, traduction originale de Muhammad Hamidullah (1977) et Tafsīr Al-Mukhtasar.",
  start_url: "/index.html",
  display: "standalone",
  background_color: "#020406",
  theme_color: "#020406",
  orientation: "portrait-primary"
};
fs.writeFileSync(path.join(dossierSite, 'manifest.json'), JSON.stringify(manifestJSON, null, 2), 'utf8');

console.log(`✅ TERMINÉ ! ${compteurPages} pages nettoyées et optimisées + sitemap.xml prêt pour ${URL_SITE} !`);
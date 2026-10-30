const fs = require('fs');
const path = require('path');

// CHANGE ICI TON FUTUR NOM DE DOMAINE QUAND TU L'AURAS (ex: https://lenoblecoran.fr)
const URL_SITE = 'https://lenoblecoran.pages.dev';

const dossierSite = path.join(__dirname, 'site');
const fichiers = fs.readdirSync(dossierSite);

// Fonction JS injectée dans chaque page pour charger Maher Al-Muaiqly (Haramain HD 128kbps pur)
const NOUVEAU_CODE_AUDIO = `
  const VERSETS_PAR_SOURATE = [7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];

  function calculerNumeroGlobalVerset(code6Chiffres) {
    const s = parseInt(code6Chiffres.slice(0, 3), 10);
    const v = parseInt(code6Chiffres.slice(3, 6), 10);
    let total = 0;
    for (let i = 0; i < s - 1; i++) total += VERSETS_PAR_SOURATE[i];
    return total + v;
  }

  function majSourceAudio() {
    if (select.value === 'Maher_Haramain_HD') {
      const numGlobal = calculerNumeroGlobalVerset(codeAudio);
      audio.src = "https://cdn.islamic.network/quran/audio/128/ar.mahermuaiqly/" + numGlobal + ".mp3";
    } else {
      audio.src = "https://everyayah.com/data/" + select.value + "/" + codeAudio + ".mp3";
    }
  }
`;

let compteurPages = 0;
let urlsSitemap = [
  `  <url><loc>${URL_SITE}/index.html</loc><priority>1.0</priority></url>`
];

console.log('⚡ Correction audio Maher Al-Muaiqly (Haramain HD) + Préparation SEO & App...');

for (const fichier of fichiers) {
  if (fichier.startsWith('sourate-') && fichier.endsWith('.html')) {
    const chemin = path.join(dossierSite, fichier);
    let contenu = fs.readFileSync(chemin, 'utf8');

    // 1. Remplacer MaherAlMuaiqly128kbps par Maher_Haramain_HD (et ajouter As-Sudais Haramain)
    contenu = contenu.replace(
      /<option value="MaherAlMuaiqly128kbps">Maher Al-Muaiqly[^<]*<\/option>/g,
      '<option value="Maher_Haramain_HD">Maher Al-Muaiqly (Haramain HD)</option>\n                <option value="Abdurrahmaan_As-Sudais_192kbps">Abdurrahman As-Sudais (Haramain)</option>'
    );

    // 2. Remplacer l'ancienne fonction majSourceAudio() par le flux Haramain HD pur
    contenu = contenu.replace(
      /function majSourceAudio\(\)\s*\{[\s\S]*?everyayah\.com\/data\/"\s*\+\s*select\.value\s*\+\s*"\/"\s*\+\s*codeAudio\s*\+\s*"\.mp3";\s*\}/,
      NOUVEAU_CODE_AUDIO.trim()
    );

    // 3. Ajouter la balise Canonical SEO et le lien manifest.json (Application Mobile)
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

// 4. Générer le fichier sitemap.xml (avec les 6 236 URLs pour Google Search Console !)
const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsSitemap.join('\n')}\n</urlset>`;
fs.writeFileSync(path.join(dossierSite, 'sitemap.xml'), sitemapXML, 'utf8');

// 5. Générer robots.txt pour inviter Google à indexer les 6 236 versets
const robotsTxt = `User-agent: *\nAllow: /\nSitemap: ${URL_SITE}/sitemap.xml\n`;
fs.writeFileSync(path.join(dossierSite, 'robots.txt'), robotsTxt, 'utf8');

// 6. Générer manifest.json pour transformer le site en Application iOS & Android
const manifestJSON = {
  name: "Le Noble Coran & Tafsīr",
  short_name: "Noble Coran",
  description: "Le Noble Coran, traduction originale de Muhammad Hamidullah (1977) et Tafsīr des savants.",
  start_url: "/index.html",
  display: "standalone",
  background_color: "#020406",
  theme_color: "#020406",
  orientation: "portrait-primary"
};
fs.writeFileSync(path.join(dossierSite, 'manifest.json'), JSON.stringify(manifestJSON, null, 2), 'utf8');

console.log(`✅ TERMINÉ ! ${compteurPages} pages mises à jour avec Maher Al-Muaiqly (Haramain HD) + sitemap.xml généré !`);
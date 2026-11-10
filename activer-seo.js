const fs = require('fs');
const path = require('path');

const fichier = path.join(__dirname, 'generateur.js');
let code = fs.readFileSync(fichier, 'utf8');

// 1. Détection automatique de la langue du navigateur (EN / ES / AR / FR) sur les pages Versets
code = code.replace(
  `else if (['fr','en','es','ar'].includes(sl)) currentLang = sl;`,
  `else if (['fr','en','es','ar'].includes(sl)) currentLang = sl;
    else {
      const navL = (navigator.language || navigator.userLanguage || 'fr').toLowerCase().slice(0, 2);
      if (['fr','en','es','ar'].includes(navL)) currentLang = navL;
    }`
);

// 2. Détection automatique de la langue du navigateur sur la page d'Accueil
code = code.replace(
  `const sl = localStorage.getItem('site_lang_v32');\n      if (['fr','en','es','ar'].includes(sl)) currentLang = sl;`,
  `const sl = localStorage.getItem('site_lang_v32');
      if (['fr','en','es','ar'].includes(sl)) currentLang = sl;
      else {
        const navL = (navigator.language || navigator.userLanguage || 'fr').toLowerCase().slice(0, 2);
        if (['fr','en','es','ar'].includes(navL)) currentLang = navL;
      }`
);

// 3. Remplacement du <title> des versets par le bloc SEO complet 4 langues (FR, EN, ES, AR + JSON-LD)
const ancienTitreVerset = `<link rel="canonical" href="https://corantafsir.com/\${nomFichier}">
  <title>Sourate \${numS} verset \${numV} (\${nomS}) - Coran & Tafsir</title>`;

const nouveauSEOVerset = `<link rel="canonical" href="https://corantafsir.com/\${nomFichier}">
  <link rel="alternate" hreflang="fr" href="https://corantafsir.com/\${nomFichier}?lang=fr">
  <link rel="alternate" hreflang="en" href="https://corantafsir.com/\${nomFichier}?lang=en">
  <link rel="alternate" hreflang="es" href="https://corantafsir.com/\${nomFichier}?lang=es">
  <link rel="alternate" hreflang="ar" href="https://corantafsir.com/\${nomFichier}?lang=ar">
  <link rel="alternate" hreflang="x-default" href="https://corantafsir.com/\${nomFichier}">
  <title>Sourate \${numS}:\${numV} \${nomS} (\${nomFr}) | Surah \${nomS} (\${nomEn}) Verse \${numV} | Sura \${nomEs} Aleya \${numV} | سورة \${nomAr} آية \${numV} - Quran &amp; Tafsir</title>
  <meta name="description" content="[\${numS}:\${numV}] FR: \${vObj.tradPropre.slice(0, 110)} | EN (Surah \${nomS} \${numV}): \${(vObj.tradEn || '').slice(0, 110)} | ES (Sura \${nomEs} \${numV}): \${(vObj.tradEs || '').slice(0, 100)} | تفسير سورة \${nomAr} آية \${numV}">
  <meta name="keywords" content="Sourate \${numS} verset \${numV}, Surah \${numS} verse \${numV}, Surah \${nomS} ayah \${numV} tafsir, Sura \${numS} aleya \${numV} tafsir, \${nomS}, \${nomFr}, \${nomEn}, \${nomEs}, سورة \${nomAr} آية \${numV}, تفسير سورة \${nomAr}, Quran Tafsir, Coran Tafsir">
  <meta property="og:title" content="Sourate \${nomS} (\${numS}:\${numV}) • Surah \${nomEn} • Sura \${nomEs} • سورة \${nomAr}">
  <meta property="og:description" content="\${vObj.tradPropre.slice(0, 140)} | \${(vObj.tradEn || '').slice(0, 140)}">
  <meta property="og:url" content="https://corantafsir.com/\${nomFichier}">
  <meta property="og:type" content="article">
  <script type="application/ld+json">
  \${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": \`Sourate \${nomS} (\${numS}:\${numV}) | Surah \${nomEn} Verse \${numV} | Sura \${nomEs} Aleya \${numV} | سورة \${nomAr} آية \${numV}\`,
    "inLanguage": ["fr", "en", "es", "ar"],
    "articleBody": \`\${vObj.texteArabe} — FR: \${vObj.tradPropre} — EN: \${vObj.tradEn} — ES: \${vObj.tradEs}\`
  })}
  </script>`;

code = code.replace(ancienTitreVerset, nouveauSEOVerset);

// 4. Remplacement du <title> de la page d'accueil par le bloc SEO international 4 langues
const ancienTitreAccueil = `<title>Le Noble Coran & Tafsīr — Français • English • Español • العربية</title>`;
const nouveauSEOAccueil = `<link rel="canonical" href="https://corantafsir.com/">
  <link rel="alternate" hreflang="fr" href="https://corantafsir.com/?lang=fr">
  <link rel="alternate" hreflang="en" href="https://corantafsir.com/?lang=en">
  <link rel="alternate" hreflang="es" href="https://corantafsir.com/?lang=es">
  <link rel="alternate" hreflang="ar" href="https://corantafsir.com/?lang=ar">
  <link rel="alternate" hreflang="x-default" href="https://corantafsir.com/">
  <title>Coran &amp; Tafsīr | Noble Quran Tafsir in English | Corán y Tafsir en Español | القرآن الكريم والتفسير</title>
  <meta name="description" content="Read, listen and understand the 114 Surahs of the Noble Quran with authentic Tafsir and historical &amp; scientific miracles in 4 languages: Français, English, Español, العربية.">
  <meta name="keywords" content="Quran Tafsir, Coran Tafsir, Tafsir en español, تفسير القرآن الكريم, Miracles of the Quran, Miracles du Coran, Milagros del Corán, Al-Mukhtasar, Saheeh International, Hamidullah">`;

code = code.replace(ancienTitreAccueil, nouveauSEOAccueil);

// 5. Génération automatique de sitemap.xml et robots.txt à la fin du script
const cibleFin = `fs.writeFileSync(path.join(dossierSite, 'index.html'), htmlAccueil, 'utf8');`;
const ajoutSitemap = `fs.writeFileSync(path.join(dossierSite, 'index.html'), htmlAccueil, 'utf8');

  const xmlSitemap = '<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n' +
    urlsSitemap.map(u => '  <url><loc>' + u + '</loc><changefreq>monthly</changefreq><priority>' + (u.endsWith('.com/') ? '1.0' : '0.8') + '</priority></url>').join('\\n') +
    '\\n</urlset>';
  fs.writeFileSync(path.join(dossierSite, 'sitemap.xml'), xmlSitemap, 'utf8');
  fs.writeFileSync(path.join(dossierSite, 'robots.txt'), 'User-agent: *\\nAllow: /\\nSitemap: https://corantafsir.com/sitemap.xml\\n', 'utf8');
  console.log('✅ SEO INTERNATIONAL 4 LANGUES + SITEMAP.XML (6237 URLs) + ROBOTS.TXT GÉNÉRÉS !');`;

code = code.replace(cibleFin, ajoutSitemap);

fs.writeFileSync(fichier, code, 'utf8');
console.log('✅ Ton fichier generateur.js a été mis à jour avec le SEO International 4 langues !');
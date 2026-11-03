const fs = require('fs');
const path = require('path');

const NOUVEAUX_MODALS_HTML = `<div class="app-modal-overlay" id="appInstallModal" onclick="if(event.target===this)this.classList.remove('open')">
    <div class="app-modal-card" id="appInstallModalCard">
      <h3 id="appModalTitleEl">📲 Installer CoranTafsir sur votre téléphone</h3>
      <p id="appModalIosEl"><strong>Sur iPhone (Safari) :</strong> Appuyez sur l'icône <strong>Partager</strong> (le carré avec une flèche vers le haut en bas de l'écran), puis choisissez <strong>« Sur l'écran d'accueil »</strong>.</p>
      <p id="appModalAndroidEl"><strong>Sur Android (Chrome) :</strong> Appuyez sur les <strong>3 petits points</strong> en haut à droite, puis sélectionnez <strong>« Ajouter à l'écran d'accueil »</strong>.</p>
      <button type="button" class="app-modal-close" id="appModalCloseEl" onclick="document.getElementById('appInstallModal').classList.remove('open')">Fermer</button>
    </div>
  </div>

  <div class="app-modal-overlay" id="legalModal" onclick="if(event.target===this)this.classList.remove('open')">
    <div class="app-modal-card" id="legalModalCard" style="text-align:center;">
      <h3 id="legalModalTitleEl">⚖️ Mentions légales</h3>
      <p id="legalModalDescEl">Portail éducatif, linguistique et culturel gratuit (sans publicité commerciale) édité par l'Association Loi 1901 à but non lucratif :</p>
      <p style="color:#7dd3fc; font-weight:800; font-size:0.98rem;">« Institut Numérique Coran, Langues &amp; Tafsīr »</p>
      <button type="button" class="app-modal-close" id="legalModalCloseEl" onclick="document.getElementById('legalModal').classList.remove('open')">Fermer</button>
    </div>
  </div>

  `;

const BLOC_JS_TRADUCTION_MODALS = `// Traduction complète de la fenêtre "Installer l'application" (FR / EN / ES / AR)
      const appCard = document.getElementById('appInstallModalCard');
      if (appCard) {
        appCard.setAttribute('dir', isAr ? 'rtl' : 'ltr');
        appCard.style.textAlign = isAr ? 'right' : 'left';
      }
      const appTitle = document.getElementById('appModalTitleEl');
      if (appTitle) appTitle.textContent = isAr ? "📲 تثبيت الموقع كتطبيق على هاتفك" : (isEn ? "📲 Install CoranTafsir on your phone" : (isEs ? "📲 Instalar CoranTafsir en tu teléfono" : "📲 Installer CoranTafsir sur votre téléphone"));
      const appIos = document.getElementById('appModalIosEl');
      if (appIos) appIos.innerHTML = isAr
        ? "<strong>على آيفون (Safari) :</strong> اضغط على أيقونة <strong>المشاركة</strong> (المربع الذي يخرج منه سهم للأعلى في أسفل الشاشة)، ثم اختر <strong>«إضافة إلى الشاشة الرئيسية»</strong>."
        : (isEn
            ? "<strong>On iPhone (Safari):</strong> Tap the <strong>Share</strong> icon (the square with an upward arrow at the bottom of the screen), then select <strong>«Add to Home Screen»</strong>."
            : (isEs
                ? "<strong>En iPhone (Safari):</strong> Pulsa el icono <strong>Compartir</strong> (el cuadrado con una flecha hacia arriba en la parte inferior) y elige <strong>«Añadir a la pantalla de inicio»</strong>."
                : "<strong>Sur iPhone (Safari) :</strong> Appuyez sur l'icône <strong>Partager</strong> (le carré avec une flèche vers le haut en bas de l'écran), puis choisissez <strong>« Sur l'écran d'accueil »</strong>."));
      const appAndroid = document.getElementById('appModalAndroidEl');
      if (appAndroid) appAndroid.innerHTML = isAr
        ? "<strong>على أندرويد (Chrome) :</strong> اضغط على <strong>النقاط الثلاث</strong> في أعلى اليمين، ثم اختر <strong>«الإضافة إلى الشاشة الرئيسية»</strong>."
        : (isEn
            ? "<strong>On Android (Chrome):</strong> Tap the <strong>3 dots</strong> in the top right corner, then select <strong>«Add to Home screen»</strong>."
            : (isEs
                ? "<strong>En Android (Chrome):</strong> Pulsa los <strong>3 puntos</strong> arriba a la derecha y selecciona <strong>«Añadir a pantalla de inicio»</strong>."
                : "<strong>Sur Android (Chrome) :</strong> Appuyez sur les <strong>3 petits points</strong> en haut à droite, puis sélectionnez <strong>« Ajouter à l'écran d'accueil »</strong>."));
      const appClose = document.getElementById('appModalCloseEl');
      if (appClose) appClose.textContent = isAr ? "إغلاق" : (isEn ? "Close" : (isEs ? "Cerrar" : "Fermer"));

      // Traduction complète du bouton et de la fenêtre "Mentions légales" (FR / EN / ES / AR)
      const legCard = document.getElementById('legalModalCard');
      if (legCard) legCard.setAttribute('dir', isAr ? 'rtl' : 'ltr');
      const legBtn = document.getElementById('legalBtnEl');
      if (legBtn) legBtn.textContent = isAr ? "الإشعار القانوني" : (isEn ? "Legal Notice" : (isEs ? "Aviso legal" : "Mentions légales"));
      const legTitle = document.getElementById('legalModalTitleEl');
      if (legTitle) legTitle.textContent = isAr ? "⚖️ الإشعار القانوني" : (isEn ? "⚖️ Legal Notice" : (isEs ? "⚖️ Aviso legal" : "⚖️ Mentions légales"));
      const legDesc = document.getElementById('legalModalDescEl');
      if (legDesc) legDesc.textContent = isAr
        ? "بوابة تعليمية ولغوية وثقافية مجانية (بدون إعلانات تجارية) تصدر عن الجمعية غير الربحية :"
        : (isEn
            ? "Free educational, linguistic and cultural portal (ad-free) published by the non-profit organization:"
            : (isEs
                ? "Portal educativo, lingüístico y cultural gratuito (sin publicidad comercial) editado por la asociación sin ánimo de lucro:"
                : "Portail éducatif, linguistique et culturel gratuit (sans publicité commerciale) édité par l'Association Loi 1901 à but non lucratif :"));
      const legClose = document.getElementById('legalModalCloseEl');
      if (legClose) legClose.textContent = isAr ? "إغلاق" : (isEn ? "Close" : (isEs ? "Cerrar" : "Fermer"));

      document.getElementById('searchInput').placeholder = isAr
        ? "ابحث عن سورة أو آية مباشرة (مثال: 30:1، 54:1، 2:255...)"
        : (isEn ? "Search a surah or direct verse (e.g., 30:1, 54:1, 2:255...)" : (isEs ? "Buscar una sura o aleya directa (ej: 30:1, 54:1, 2:255...)" : "Rechercher une sourate ou un verset direct (ex: 30:1, 54:1, 2:255...)"));

      afficher();
    }
    function afficher()`;

function patcherContenuHTMLouJS(texte) {
  // 1. Remplace les deux fenêtres modales (ignore les retours à la ligne Windows \r\n)
  texte = texte.replace(
    /<div class="app-modal-overlay" id="appInstallModal"[\s\S]*?(?=<script>\s*const sourates =)/,
    NOUVEAUX_MODALS_HTML
  );
  // 2. Injecte la traduction des deux fenêtres dans appliquerLangueAccueil()
  texte = texte.replace(
    /(?:\/\/ Traduction complète[\s\S]*?|const legBtn = document\.getElementById\('legalBtnEl'\);[\s\S]*?)?document\.getElementById\('searchInput'\)\.placeholder[\s\S]*?afficher\(\);\s*\}\s*function afficher\(\)/,
    BLOC_JS_TRADUCTION_MODALS
  );
  return texte;
}

// A. Réparation complète de generateur.js (Modals + correction du bug xmlSitemap à la fin)
const cheminGen = path.join(__dirname, 'generateur.js');
if (fs.existsSync(cheminGen)) {
  let codeGen = fs.readFileSync(cheminGen, 'utf8');
  codeGen = patcherContenuHTMLouJS(codeGen);

  const finPropre = `fs.writeFileSync(path.join(dossierSite, 'index.html'), htmlAccueil, 'utf8');

  const xmlSitemap = '<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n' +
    urlsSitemap.map(u => '  <url><loc>' + u + '</loc><changefreq>monthly</changefreq><priority>' + (u.endsWith('.com/') ? '1.0' : '0.8') + '</priority></url>').join('\\n') +
    '\\n</urlset>';
  fs.writeFileSync(path.join(dossierSite, 'sitemap.xml'), xmlSitemap, 'utf8');
  fs.writeFileSync(path.join(dossierSite, 'robots.txt'), 'User-agent: *\\nAllow: /\\nSitemap: https://corantafsir.com/sitemap.xml\\n', 'utf8');
  console.log('\\n================================================================================');
  console.log('✅ SITE + SEO 4 LANGUES + SITEMAP.XML + MENTIONS LÉGALES & APP TRADUITS GÉNÉRÉS !');
  console.log('================================================================================');
}

lancerGeneration();
`;
  codeGen = codeGen.replace(
    /fs\.writeFileSync\(path\.join\(dossierSite,\s*'index\.html'\),\s*htmlAccueil,\s*'utf8'\);[\s\S]*$/,
    finPropre
  );
  fs.writeFileSync(cheminGen, codeGen, 'utf8');
  console.log('✅ 1/3 : generateur.js réparé (bug xmlSitemap supprimé + 2 fenêtres traduites) !');
}

// B. Mise à jour directe et instantanée de site/index.html, site/sitemap.xml et site/robots.txt
const dossierSite = path.join(__dirname, 'site');
const cheminIndex = path.join(dossierSite, 'index.html');
if (fs.existsSync(cheminIndex)) {
  let htmlIndex = fs.readFileSync(cheminIndex, 'utf8');
  htmlIndex = patcherContenuHTMLouJS(htmlIndex);
  fs.writeFileSync(cheminIndex, htmlIndex, 'utf8');
  console.log('✅ 2/3 : site/index.html mis à jour instantanément avec les traductions FR/EN/ES/AR !');

  const fichiersHtml = fs.readdirSync(dossierSite).filter(f => /^sourate-\d+-verset-\d+\.html$/.test(f));
  const urls = ['https://corantafsir.com/', ...fichiersHtml.map(f => 'https://corantafsir.com/' + f)];
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(u => '  <url><loc>' + u + '</loc><changefreq>monthly</changefreq><priority>' + (u.endsWith('.com/') ? '1.0' : '0.8') + '</priority></url>').join('\n') +
    '\n</urlset>';
  fs.writeFileSync(path.join(dossierSite, 'sitemap.xml'), xml, 'utf8');
  fs.writeFileSync(path.join(dossierSite, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://corantafsir.com/sitemap.xml\n', 'utf8');
  console.log(`✅ 3/3 : site/sitemap.xml (${urls.length} URLs) et site/robots.txt créés instantanément !`);
}	
const fs = require('fs');
const path = require('path');

const fichier = path.join(__dirname, 'generateur.js');
let code = fs.readFileSync(fichier, 'utf8');

// Correction de la fonction appliquerLangueAccueil pour forcer la mise à jour des Mentions légales et des boutons de suggestions
const ancienBlocLangueAccueil = `document.getElementById('searchInput').placeholder = isAr
        ? "ابحث عن سورة أو آية مباشرة (مثال: 30:1، 54:1، 2:255...)"
        : (isEn ? "Search a surah or direct verse (e.g., 30:1, 54:1, 2:255...)" : (isEs ? "Buscar una sura o aleya directa (ej: 30:1, 54:1, 2:255...)" : "Rechercher une sourate ou un verset direct (ex: 30:1, 54:1, 2:255...)"));

      afficher();`;

const nouveauBlocLangueAccueil = `const legBtn = document.getElementById('legalBtnEl');
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

      afficher();`;

if (code.includes('legalBtnEl')) {
  // Remplacement propre si déjà présent
  code = code.replace(/const legBtn = document.getElementById\('legalBtnEl'\);[\s\S]*?afficher\(\);\n/g, nouveauBlocLangueAccueil);
} else {
  code = code.replace(ancienBlocLangueAccueil, nouveauBlocLangueAccueil);
}

fs.writeFileSync(fichier, code, 'utf8');
console.log('✅ Correction des traductions dynamiques appliquée avec succès !');
console.log('👉 Lance maintenant : node generateur.js');
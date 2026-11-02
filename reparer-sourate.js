const fs = require('fs');
let code = fs.readFileSync('generateur.js', 'utf8');

// Cible la zone cassée avec les multiples "else"
const regexZoneCasse = /try\s*\{\s*const sr = localStorage\.getItem\('reciter'\);[\s\S]*?catch\(e\)\{\}/;

const versionPropre = `try {
    const sr = localStorage.getItem('reciter');
    if (sr) select.value = sr;
    const savedZoom = parseFloat(localStorage.getItem('coran_zoom_v39'));
    if (!isNaN(savedZoom) && savedZoom >= 0.75 && savedZoom <= 1.45) zoomScale = savedZoom;
    const up = new URLSearchParams(window.location.search).get('lang');
    const sl = localStorage.getItem('site_lang_v32');
    if (['fr','en','es','ar'].includes(up)) { currentLang = up; localStorage.setItem('site_lang_v32', up); }
    else if (['fr','en','es','ar'].includes(sl)) currentLang = sl;
    else {
      const navL = (navigator.language || navigator.userLanguage || 'fr').toLowerCase().slice(0, 2);
      if (['fr','en','es','ar'].includes(navL)) currentLang = navL;
    }
  } catch(e){}`;

if (regexZoneCasse.test(code)) {
  code = code.replace(regexZoneCasse, versionPropre);
  fs.writeFileSync('generateur.js', code, 'utf8');
  console.log('✅ GÉNÉRATEUR RÉPARÉ : Le doublon a été supprimé !');
}
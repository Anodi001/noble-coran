const fs = require('fs');
const path = require('path');

console.log('================ AUDIT COMPLET DU SITE LOCAL ================');

// 1. Analyse de memoire-site.json
const pMem = path.join(__dirname, 'memoire-site.json');
if (fs.existsSync(pMem)) {
  const tailleMem = (fs.statSync(pMem).size / (1024 * 1024)).toFixed(2);
  const mem = JSON.parse(fs.readFileSync(pMem, 'utf8'));
  console.log(`📦 memoire-site.json : ${tailleMem} MB`);
  console.log(`   - Tafsir FR : ${Object.keys(mem.tafsirFr || {}).length} clés`);
  console.log(`   - Tafsir EN : ${Object.keys(mem.tafsirEn || {}).length} clés`);
  console.log(`   - Tafsir ES : ${Object.keys(mem.tafsirEs || {}).length} clés`);
  console.log(`   - Tafsir AR : ${Object.keys(mem.tafsirAr || {}).length} clés`);
}

// 2. Analyse de generateur.js et des patchs présents
const pGen = path.join(__dirname, 'generateur.js');
if (fs.existsSync(pGen)) {
  const g = fs.readFileSync(pGen, 'utf8');
  const tailleGen = (fs.statSync(pGen).size / 1024).toFixed(1);
  const patchsStyle = (g.match(/<style id="[^"]+"/g) || []).map(s => s.replace('<style id="', '').replace('"', ''));
  const patchsScript = (g.match(/<script id="[^"]+"/g) || []).map(s => s.replace('<script id="', '').replace('"', ''));
  console.log(`⚙️ generateur.js : ${tailleGen} kB`);
  console.log(`   - Patchs CSS actifs (${patchsStyle.length}) : ${patchsStyle.join(', ') || 'Aucun'}`);
  console.log(`   - Patchs JS actifs (${patchsScript.length}) : ${patchsScript.join(', ') || 'Aucun'}`);
}

// 3. Analyse du dossier généré (site/ ou racine)
const dirSite = fs.existsSync(path.join(__dirname, 'site')) ? path.join(__dirname, 'site') : __dirname;
const fichiers = fs.readdirSync(dirSite);
const htmls = fichiers.filter(f => f.endsWith('.html'));
let tailleTotaleHtml = 0;
let plusGrosFichier = { nom: '', taille: 0 };

for (const f of htmls) {
  const st = fs.statSync(path.join(dirSite, f));
  tailleTotaleHtml += st.size;
  if (st.size > plusGrosFichier.taille) {
    plusGrosFichier = { nom: f, taille: st.size };
  }
}

const pIndex = path.join(dirSite, 'index.html');
const tailleIndex = fs.existsSync(pIndex) ? (fs.statSync(pIndex).size / 1024).toFixed(1) : 'Introuvable';

console.log(`🌐 Dossier généré (${path.basename(dirSite)}) :`);
console.log(`   - Nombre de pages HTML : ${htmls.length}`);
console.log(`   - Poids de index.html : ${tailleIndex} kB`);
console.log(`   - Plus grosse page HTML : ${plusGrosFichier.nom} (${(plusGrosFichier.taille / 1024).toFixed(1)} kB)`);
console.log(`   - Poids total de toutes les pages : ${(tailleTotaleHtml / (1024 * 1024)).toFixed(2)} MB`);
console.log(`   - sitemap.xml présent : ${fs.existsSync(path.join(dirSite, 'sitemap.xml')) ? 'OUI' : 'NON'}`);
console.log(`   - robots.txt présent : ${fs.existsSync(path.join(dirSite, 'robots.txt')) ? 'OUI' : 'NON'}`);
console.log('=============================================================');
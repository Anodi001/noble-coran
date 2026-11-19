/* ONEDRIVE_SAFE */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function writeSafe(p, d) {
  for (let i = 0; i < 15; i++) {
    try { fs.writeFileSync(p, d, 'utf8'); return; }
    catch (e) {
      if (i === 14) throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80);
    }
  }
}

const memoirePath = path.join(__dirname, 'memoire-site.json');
const dossierSite = path.join(__dirname, 'site');
const workerPath = path.join(dossierSite, '_worker.js');

const CORRECTIONS_FR = {
  "27:15": "<strong style='color:#ffffff;'>La science accordée à Dāwūd (David) et Sulaymān (Salomon) (v.15–19).</strong><br><br>Allāh rappelle le bienfait immense de la science et de la sagesse accordées aux Prophètes Dāwūd et Sulaymān, ainsi que leur gratitude immédiate envers Lui. Ce passage introduit le récit de Sulaymān, à qui Allāh fit comprendre le langage des oiseaux et des fourmis dans la vallée, illustrant que le véritable pouvoir s'accompagne toujours d'humilité et de reconnaissance envers Allāh.",
  "36:65": "<strong style='color:#ffffff;'>Le Jour où les mains parleront et où les pieds témoigneront.</strong><br><br>Au Jour du Jugement, lorsque les coupables tenteront de nier leurs fautes, Allāh scellera leurs bouches et fera parler leurs propres membres : leurs mains et leurs pieds témoigneront avec une exactitude absolue de tout ce qu'ils auront commis ici-bas (confirmé par le Hadith authentique d'Anas ibn Mālik dans <em>Sahīh Muslim n°2969</em>).",
  "54:17": "<strong style='color:#ffffff;'>« En effet, Nous avons rendu le Coran facile pour le rappel » (répété 4 fois).</strong><br><br>Allāh affirme avoir facilité les mots du Coran pour sa récitation et sa mémorisation, ainsi que ses sens pour la méditation et l'exhortation. La répétition de ce verset à quatre reprises dans Sourate Al-Qamar (v.17, 22, 32, 40) constitue un appel pressant à tirer leçon des récits des peuples anciens.",
  "81:26": "<strong style='color:#ffffff;'>« Où allez-vous donc ? » (Fa-ayna tadhhabūn).</strong><br><br>Une interpellation saisissante adressée à ceux qui se détournent du Coran après l'éclat de ses preuves : quelle autre voie pourrait bien les guider s'ils délaissent la Parole véridique d'Allāh ?",
  "81:27": "<strong style='color:#ffffff;'>Un rappel universel pour tous les mondes.</strong><br><br>Le Noble Coran n'est ni réservé à une époque ni à un seul peuple : c'est un rappel, une exhortation et une guidance adressés à l'ensemble des humains et des djinns.",
  "81:28": "<strong style='color:#ffffff;'>Pour quiconque parmi vous veut suivre la voie droite.</strong><br><br>Ce verset affirme clairement le choix et la responsabilité morale de chaque être humain qui désire emprunter le chemin de la vérité et de la droiture, tout en rappelant au verset suivant que toute volonté s'inscrit dans la souveraineté d'Allāh.",
  "101:2": "<strong style='color:#ffffff;'>« Qu'est-ce que le Fracas (Al-Qāri‘ah) ? » (v.2–3).</strong><br><br>Cette interrogation solennelle souligne l'immense gravité d'<em>Al-Qāri‘ah</em> — l'un des noms du Jour de la Résurrection, ainsi nommé parce que sa terreur frappe violemment les cœurs et bouleverse la création.",
  "101:7": "<strong style='color:#ffffff;'>Il jouira d'une vie pleinement agréable (Rādiyah, v.6–7).</strong><br><br>Celui dont la balance des bonnes actions sera lourde au Jour du Jugement goûtera au Paradis une vie de béatitude, de paix et de satisfaction éternelle auprès de son Seigneur.",
  "101:9": "<strong style='color:#ffffff;'>Sa demeure sera l'Abîme (Hāwiyah, v.8–11).</strong><br><br>Celui dont la balance des bonnes actions sera légère aura pour refuge <em>Hāwiyah</em> — un abîme profond de l'Enfer dans lequel il chutera, décrit au verset 11 comme un feu d'une ardeur extrême."
};

// 1. Mise à jour de memoire-site.json
const memoire = JSON.parse(fs.readFileSync(memoirePath, 'utf8'));
if (!memoire.tafsirFr) memoire.tafsirFr = {};
for (const [cle, val] of Object.entries(CORRECTIONS_FR)) {
  memoire.tafsirFr[cle] = val;
}
writeSafe(memoirePath, JSON.stringify(memoire, null, 2));
console.log('✓ memoire-site.json : 9 entrées tafsirFr corrigées en français.');

// 2. Mise à jour des fichiers site/data-sourate-*.js concernés
const parSourate = {};
for (const [cle, val] of Object.entries(CORRECTIONS_FR)) {
  const [s, v] = cle.split(':').map(Number);
  if (!parSourate[s]) parSourate[s] = [];
  parSourate[s].push({ v, val });
}

let nbDataMaj = 0;
for (const [sStr, items] of Object.entries(parSourate)) {
  const dataPath = path.join(dossierSite, `data-sourate-${sStr}.js`);
  if (!fs.existsSync(dataPath)) {
    console.warn('⚠ Introuvable :', dataPath);
    continue;
  }
  const orig = fs.readFileSync(dataPath, 'utf8');
  const sb = { window: {} };
  vm.runInNewContext(orig, sb);
  if (!sb.window.SOURATE_DATA || !Array.isArray(sb.window.SOURATE_DATA.versets)) {
    throw new Error(`Structure SOURATE_DATA invalide dans ${dataPath}`);
  }
  for (const { v, val } of items) {
    const obj = sb.window.SOURATE_DATA.versets[v - 1];
    if (!obj) throw new Error(`Verset ${sStr}:${v} introuvable dans ${dataPath}`);
    obj.explicationUnanime = val;
  }
  const nvJs = `window.SOURATE_DATA = ${JSON.stringify(sb.window.SOURATE_DATA, null, 2)};\n`;
  new vm.Script(nvJs, { filename: dataPath }); // validation syntaxique stricte
  writeSafe(dataPath, nvJs);
  nbDataMaj++;
}
console.log(`✓ ${nbDataMaj} fichiers site/data-sourate-*.js mis à jour et validés.`);

// 3. Mise à jour des 9 pages HTML statiques correspondantes
let nbHtmlMaj = 0;
for (const [cle, val] of Object.entries(CORRECTIONS_FR)) {
  const [s, v] = cle.split(':').map(Number);
  const htmlPath = path.join(dossierSite, `sourate-${s}-verset-${v}.html`);
  if (!fs.existsSync(htmlPath)) continue;
  const h = fs.readFileSync(htmlPath, 'utf8');
  const reExpl = /(<([a-z0-9]+)\b[^>]*\bid=["']mainExplanationEl["'][^>]*>)([\s\S]*?)(<\/\2>)/i;
  if (reExpl.test(h)) {
    const h2 = h.replace(reExpl, (_, ouv, _tag, _old, ferm) => ouv + val + ferm);
    if (h2 !== h) {
      writeSafe(htmlPath, h2);
      nbHtmlMaj++;
    }
  } else {
    console.warn(`⚠ #mainExplanationEl non trouvé dans sourate-${s}-verset-${v}.html`);
  }
}
console.log(`✓ ${nbHtmlMaj} pages HTML synchronisées.`);

// 4. Incrémenter SSR_VERSION dans site/_worker.js
if (fs.existsSync(workerPath)) {
  let w = fs.readFileSync(workerPath, 'utf8');
  w = w.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
  writeSafe(workerPath, w);
}

// ============================================================================
// 5. DIAGNOSTIC EN LECTURE SEULE POUR LA SUITE (ANGLAIS RESTANT, INDEX, PWA/SEO)
// ============================================================================
console.log('\n=== DIAGNOSTIC POUR LES PROCHAINES ÉTAPES ===');

// 5a. Vérifier s'il reste d'autres textes anglais cachés dans memoire-site.json (tafsirFr)
const suspectsEn = [];
for (const [k, v] of Object.entries(memoire.tafsirFr || {})) {
  const txt = String(v).replace(/<[^>]+>/g, ' ');
  const motsEn = (txt.match(/\b(the|and|with|that|from|their|will|those|whose|which|shall|upon|for whoever|believers|righteous)\b/gi) || []).length;
  const motsFr = (txt.match(/\b(les|des|dans|pour|avec|sont|qui|que|une|est|aux|cette|tous|leurs)\b/gi) || []).length;
  if (motsEn >= 4 && motsEn > motsFr) {
    suspectsEn.push(`${k} -> ${txt.trim().slice(0, 80)}`);
  }
}
console.log(`1) Autres textes anglais détectés dans tafsirFr : ${suspectsEn.length}`);
suspectsEn.slice(0, 20).forEach(s => console.log('   -', s));

// 5b. Vérifier les fichiers PWA & SEO présents dans site/
const fichiersPwaSeo = ['manifest.json', 'sw.js', 'robots.txt', 'sitemap.xml', 'sitemap-index.xml'];
console.log('2) Fichiers PWA/SEO dans site/ :');
for (const f of fichiersPwaSeo) {
  const fp = path.join(dossierSite, f);
  console.log(`   - ${f} : ${fs.existsSync(fp) ? 'PRÉSENT (' + fs.statSync(fp).size + ' octets)' : 'ABSENT'}`);
}

// 5c. Repérer où sont stockés les noms de sourates dans site/index.html
const idxPath = path.join(dossierSite, 'index.html');
if (fs.existsSync(idxPath)) {
  const idx = fs.readFileSync(idxPath, 'utf8');
  const lignes = idx.split(/\r?\n/);
  const hits = [];
  lignes.forEach((l, i) => {
    if (/Al-Fatihah|Al-Baqarah|SOURATES|NOMS_SOURATES|DICO_EXT|TRAD_EXT|manifest\.json/i.test(l) && l.length < 300) {
      hits.push(`L${i + 1}: ${l.trim().slice(0, 120)}`);
    }
  });
  console.log(`3) Repères dans site/index.html (${hits.length} lignes trouvées, aperçu des 15 premières) :`);
  hits.slice(0, 15).forEach(h => console.log('   ', h));
}
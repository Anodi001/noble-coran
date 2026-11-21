/* ONEDRIVE_SAFE */
const fs = require('fs');
const path = require('path');

function writeSafe(p, d) {
  for (let i = 0; i < 15; i++) {
    try { fs.writeFileSync(p, d, 'utf8'); return; }
    catch (e) {
      if (i === 14) throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80);
    }
  }
}

function readNorm(p) {
  const raw = fs.readFileSync(p, 'utf8');
  return { text: raw.replace(/\r\n/g, '\n'), eol: raw.includes('\r\n') ? '\r\n' : '\n' };
}

function writeNorm(p, text, eol) {
  writeSafe(p, eol === '\r\n' ? text.replace(/\n/g, '\r\n') : text);
}

// Traductions mot-à-mot certifiées — Sourates 100 à 107 (58 versets)
const LOT_CERTIFIE = {
  // Sourate 100 — Al-Adiyat (11 versets)
  '100:1':  ['Par les coursiers', 'qui galopent haletants'],
  '100:2':  ['et qui font jaillir des étincelles', 'en frappant'],
  '100:3':  ['et qui lancent l’assaut', 'à l’aube'],
  '100:4':  ['faisant soulever', 'ainsi', 'la poussière'],
  '100:5':  ['et pénétrant au centre', 'ainsi', 'de la troupe'],
  '100:6':  ['Certes', 'l’homme', 'envers son Seigneur', 'est bien ingrat'],
  '100:7':  ['Et certes, il', 'de', 'cela', 'est bien témoin'],
  '100:8':  ['Et certes, il', 'dans l’amour', 'des biens', 'est très ardent'],
  '100:9':  ['Ne', 'sait-il donc pas', 'quand', 'sera bouleversé', 'ce qui est', 'dans', 'les tombes'],
  '100:10': ['et que sera dévoilé', 'ce qui est', 'dans', 'les poitrines'],
  '100:11': ['Certes', 'leur Seigneur', 'à leur sujet', 'ce Jour-là', 'est Parfaitement Connaisseur'],

  // Sourate 101 — Al-Qari'ah (11 versets)
  '101:1':  ['Le Fracas'],
  '101:2':  ['Qu’est-ce que', 'le Fracas ?'],
  '101:3':  ['Et qui', 'te dira', 'ce qu’est', 'le Fracas ?'],
  '101:4':  ['Le Jour où', 'seront', 'les gens', 'comme des papillons', 'éparpillés'],
  '101:5':  ['et seront', 'les montagnes', 'comme de la laine', 'cardée'],
  '101:6':  ['Quant à', 'celui dont', 'seront lourdes', 'les balances'],
  '101:7':  ['il sera', 'dans', 'une vie', 'agréable'],
  '101:8':  ['Et quant à', 'celui dont', 'seront légères', 'les balances'],
  '101:9':  ['sa demeure sera', 'l’Abîme (Hawiyah)'],
  '101:10': ['Et qui', 'te dira', 'ce qu’', 'elle est ?'],
  '101:11': ['Un Feu', 'ardent'],

  // Sourate 102 — At-Takathur (8 versets)
  '102:1':  ['Vous a distraits', 'la course aux richesses'],
  '102:2':  ['jusqu’à ce que', 'vous visitiez', 'les tombes'],
  '102:3':  ['Mais non !', 'Bientôt', 'vous saurez'],
  '102:4':  ['Puis', 'mais non !', 'Bientôt', 'vous saurez'],
  '102:5':  ['Mais non !', 'Si seulement', 'vous saviez', 'd’une science', 'certaine'],
  '102:6':  ['Vous verrez certes', 'la Fournaise'],
  '102:7':  ['Puis', 'vous la verrez certes', 'de l’œil', 'de la certitude'],
  '102:8':  ['Puis', 'vous serez certes interrogés', 'ce Jour-là', 'au sujet', 'des délices'],

  // Sourate 103 — Al-Asr (3 versets)
  '103:1':  ['Par le Temps'],
  '103:2':  ['Certes', 'l’homme', 'est bien en', 'perdition'],
  '103:3':  ['sauf', 'ceux qui', 'ont cru', 'et accompli', 'les bonnes œuvres', 'et se sont enjoint', 'la vérité', 'et se sont enjoint', 'la patience'],

  // Sourate 104 — Al-Humazah (9 versets)
  '104:1':  ['Malheur', 'à tout', 'calomniateur', 'diffamateur'],
  '104:2':  ['celui qui', 'amasse', 'une fortune', 'et la recompte'],
  '104:3':  ['Il pense', 'que', 'sa fortune', 'le rendra immortel'],
  '104:4':  ['Mais non !', 'Il sera certes jeté', 'dans', 'la Broyeuse (Al-Hutama)'],
  '104:5':  ['Et qui', 'te dira', 'ce qu’est', 'la Broyeuse ?'],
  '104:6':  ['Le Feu', 'd’Allah', 'embrasé'],
  '104:7':  ['qui', 'monte', 'jusqu’aux', 'cœurs'],
  '104:8':  ['Certes, il', 'sur eux', 'sera refermé'],
  '104:9':  ['en', 'colonnes', 'étirées'],

  // Sourate 105 — Al-Fil (5 versets)
  '105:1':  ['N’as-tu pas', 'vu', 'comment', 'a agi', 'ton Seigneur', 'envers les gens', 'de l’Éléphant ?'],
  '105:2':  ['N’a-t-Il pas', 'rendu', 'leur ruse', 'en', 'égarement (vain) ?'],
  '105:3':  ['Et Il a envoyé', 'contre eux', 'des oiseaux', 'par volées'],
  '105:4':  ['qui leur lançaient', 'des pierres', 'd’', 'argile cuite'],
  '105:5':  ['puis Il les a rendus', 'comme une paille', 'mâchée'],

  // Sourate 106 — Quraysh (4 versets)
  '106:1':  ['À cause du pacte', 'de Qouraych'],
  '106:2':  ['leur pacte concernant', 'le voyage', 'd’hiver', 'et d’été'],
  '106:3':  ['Qu’ils adorent donc', 'le Seigneur', 'de cette', 'Maison'],
  '106:4':  ['Celui qui', 'les a nourris', 'contre', 'la faim', 'et les a rassurés', 'contre', 'la peur'],

  // Sourate 107 — Al-Ma'un (7 versets)
  '107:1':  ['Vois-tu', 'celui qui', 'traite de mensonge', 'la Rétribution ?'],
  '107:2':  ['C’est bien lui', 'qui', 'repousse', 'l’orphelin'],
  '107:3':  ['et n’', 'encourage pas', 'à', 'nourrir', 'le pauvre'],
  '107:4':  ['Malheur donc', 'à ceux qui prient'],
  '107:5':  ['ceux qui', 'sont', 'à l’égard de', 'leur prière', 'négligents'],
  '107:6':  ['ceux qui', 'font preuve', 'd’ostentation'],
  '107:7':  ['et refusent', 'l’ustensile (l’entraide)']
};

(async () => {
  // 1. Vérification anti-décalage en direct contre l'API Quran.com
  const sourates = [...new Set(Object.keys(LOT_CERTIFIE).map(k => k.split(':')[0]))];
  const compteOfficiel = {};

  for (const s of sourates) {
    const url = `https://api.quran.com/api/v4/verses/by_chapter/${s}?language=en&words=true&word_fields=text_uthmani&per_page=300`;
    const r = await fetch(url);
    if (!r.ok) throw new Error(`Échec API Quran.com pour sourate ${s}: HTTP ${r.status}`);
    const data = await r.json();
    for (const v of (data.verses || [])) {
      compteOfficiel[v.verse_key] = (v.words || []).filter(w => w.char_type_name === 'word').length;
    }
  }

  let erreurs = 0;
  for (const [vk, mots] of Object.entries(LOT_CERTIFIE)) {
    const attendu = compteOfficiel[vk];
    if (attendu === undefined) {
      console.error(`✗ Clé verset introuvable sur Quran.com : ${vk}`);
      erreurs++;
    } else if (mots.length !== attendu) {
      console.error(`✗ Décalage sur ${vk} : ${mots.length} traductions fournies vs ${attendu} mots officiels`);
      erreurs++;
    } else if (mots.some(m => !m || !m.trim())) {
      console.error(`✗ Traduction vide détectée dans ${vk}`);
      erreurs++;
    }
  }
  if (erreurs > 0) throw new Error(`Abandon : ${erreurs} erreur(s) d'alignement détectée(s).`);
  console.log(`✓ Vérification anti-décalage 100 % OK (${Object.keys(LOT_CERTIFIE).length} versets sur ${sourates.length} sourates).`);

  // 2. Mise à jour + re-minification de site/lexique-wbw-fr.json
  const lexPath = path.join(__dirname, 'site', 'lexique-wbw-fr.json');
  const lex = JSON.parse(fs.readFileSync(lexPath, 'utf8'));
  if (!lex.versets) lex.versets = {};

  let ajoutes = 0, maj = 0;
  for (const [vk, mots] of Object.entries(LOT_CERTIFIE)) {
    if (lex.versets[vk]) maj++; else ajoutes++;
    lex.versets[vk] = mots;
  }
  lex.version = (Number(lex.version) || 33) + 1;
  const minified = JSON.stringify(lex);
  writeSafe(lexPath, minified);
  console.log(`✓ site/lexique-wbw-fr.json -> v${lex.version} minifié (${Math.round(minified.length / 1024)} Ko | +${ajoutes} ajoutés, ${maj} maj, total: ${Object.keys(lex.versets).length} versets certifiés).`);

  // 3. Versionner l'URL du lexique dans site/assets/verset.js
  const jsPath = path.join(__dirname, 'site', 'assets', 'verset.js');
  const jsFile = readNorm(jsPath);
  const reLexUrl = /fetch\(['"]\/lexique-wbw-fr\.json(?:\?v=\d+)?['"]\)/;
  if (!reLexUrl.test(jsFile.text)) throw new Error('fetch("/lexique-wbw-fr.json") introuvable dans verset.js');
  const jsNew = jsFile.text.replace(reLexUrl, `fetch('/lexique-wbw-fr.json?v=${lex.version}')`);
  writeNorm(jsPath, jsNew, jsFile.eol);
  console.log(`✓ site/assets/verset.js : /lexique-wbw-fr.json?v=${lex.version}`);

  // 4. Bump cache (_worker.js + sw.js)
  const workerPath = path.join(__dirname, 'site', '_worker.js');
  const wFile = readNorm(workerPath);
  const tag = String(Date.now());
  const wNew = wFile.text
    .replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`)
    .replace(/htmlPropre\.replace\(\/v=1795050050086\/g,\s*"v=\d+"\)/, `htmlPropre.replace(/v=1795050050086/g, "v=${tag}")`);
  writeNorm(workerPath, wNew, wFile.eol);

  const swPath = path.join(__dirname, 'site', 'sw.js');
  const swFile = readNorm(swPath);
  const swNew = swFile.text.replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
  writeNorm(swPath, swNew, swFile.eol);
  console.log(`✓ _worker.js (?v=${tag}) et sw.js incrémentés.`);
})();
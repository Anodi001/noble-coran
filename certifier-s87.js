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

// Traductions mot-à-mot certifiées — Sourate 87 (Al-A'la, 19 versets)
const LOT_CERTIFIE = {
  '87:1':  ['Glorifie', 'le nom', 'de ton Seigneur', 'le Très-Haut'],
  '87:2':  ['Celui qui', 'a créé', 'puis a harmonisé'],
  '87:3':  ['Et Celui qui', 'a déterminé', 'puis a guidé'],
  '87:4':  ['Et Celui qui', 'a fait sortir', 'le pâturage'],
  '87:5':  ['puis l’a rendu', 'fourrage desséché', 'noirâtre'],
  '87:6':  ['Nous te ferons réciter', 'et tu n’', 'oublieras pas'],
  '87:7':  ['sauf', 'ce que', 'veut', 'Allah', 'Certes, Il', 'connaît', 'ce qui est apparent', 'et ce qui', 'est caché'],
  '87:8':  ['Et Nous te faciliterons', 'la voie de la facilité'],
  '87:9':  ['Rappelle donc', 'si', 'profite', 'le rappel'],
  '87:10': ['Se rappellera', 'celui qui', 'craint (Allah)'],
  '87:11': ['Et s’en écartera', 'le plus malheureux'],
  '87:12': ['celui qui', 'brûlera dans', 'le Feu', 'le plus grand'],
  '87:13': ['Puis', 'il ne', 'mourra pas', 'dedans', 'et ne', 'vivra pas'],
  '87:14': ['Certes', 'a réussi', 'celui qui', 'se purifie'],
  '87:15': ['et évoque', 'le nom', 'de son Seigneur', 'puis prie'],
  '87:16': ['Mais plutôt', 'vous préférez', 'la vie', 'd’ici-bas'],
  '87:17': ['alors que l’au-delà', 'est meilleur', 'et plus durable'],
  '87:18': ['Certes', 'ceci', 'est bien dans', 'les Feuillets', 'anciens'],
  '87:19': ['les Feuillets', 'd’Ibrahim', 'et de Moussa']
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
  console.log(`✓ Vérification anti-décalage 100 % OK (${Object.keys(LOT_CERTIFIE).length} versets alignés mot pour mot).`);

  // 2. Mise à jour de site/lexique-wbw-fr.json
  const lexPath = path.join(__dirname, 'site', 'lexique-wbw-fr.json');
  const lex = JSON.parse(fs.readFileSync(lexPath, 'utf8'));
  if (!lex.versets) lex.versets = {};

  let ajoutes = 0, maj = 0;
  for (const [vk, mots] of Object.entries(LOT_CERTIFIE)) {
    if (lex.versets[vk]) maj++; else ajoutes++;
    lex.versets[vk] = mots;
  }
  lex.version = (Number(lex.version) || 32) + 1;
  writeSafe(lexPath, JSON.stringify(lex, null, 2) + '\n');
  console.log(`✓ site/lexique-wbw-fr.json -> v${lex.version} (+${ajoutes} ajoutés, ${maj} mis à jour, total: ${Object.keys(lex.versets).length} versets certifiés).`);

  // 3. Versionner l'URL du lexique dans site/assets/verset.js pour casser tout cache navigateur/CDN
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
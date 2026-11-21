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

// Traductions mot-à-mot certifiées — Sourates 93 à 99 (67 versets)
const LOT_CERTIFIE = {
  // Sourate 93 — Ad-Duha (11 versets)
  '93:1':  ['Par le Jour montant'],
  '93:2':  ['Et par la nuit', 'quand', 'elle couvre tout'],
  '93:3':  ['Ne', 't’a pas abandonné', 'ton Seigneur', 'et ne', 't’a pas haï'],
  '93:4':  ['Et certes l’au-delà', 'est meilleur', 'pour toi', 'que', 'la vie présente'],
  '93:5':  ['Et certes bientôt', 'te donnera', 'ton Seigneur', 'et tu seras satisfait'],
  '93:6':  ['Ne', 't’a-t-Il pas trouvé', 'orphelin', 'puis recueilli ?'],
  '93:7':  ['Et Il t’a trouvé', 'égaré (sans guide)', 'puis t’a guidé'],
  '93:8':  ['Et Il t’a trouvé', 'pauvre', 'puis t’a enrichi'],
  '93:9':  ['Quant à', 'l’orphelin', 'ne le', 'brime donc pas'],
  '93:10': ['Et quant au', 'demandeur', 'ne le', 'repousse donc pas'],
  '93:11': ['Et quant aux', 'bienfaits', 'de ton Seigneur', 'proclame-les'],

  // Sourate 94 — Ash-Sharh (8 versets)
  '94:1':  ['N’avons-Nous pas', 'ouvert', 'pour toi', 'ta poitrine ?'],
  '94:2':  ['Et Nous avons ôté', 'de toi', 'ton fardeau'],
  '94:3':  ['qui', 'écrasait', 'ton dos'],
  '94:4':  ['Et Nous avons élevé', 'pour toi', 'ta renommée'],
  '94:5':  ['Certes donc', 'avec', 'la difficulté', 'il y a une facilité'],
  '94:6':  ['Certes', 'avec', 'la difficulté', 'il y a une facilité'],
  '94:7':  ['Quand donc', 'tu as terminé', 'efforce-toi (dans l’adoration)'],
  '94:8':  ['Et vers', 'ton Seigneur', 'tourne ton désir'],

  // Sourate 95 — At-Tin (8 versets)
  '95:1':  ['Par le figuier', 'et l’olivier'],
  '95:2':  ['Et par le Mont', 'Sinaï'],
  '95:3':  ['Et par cette', 'Cité', 'sûre'],
  '95:4':  ['Certes', 'Nous avons créé', 'l’homme', 'dans', 'la meilleure', 'forme'],
  '95:5':  ['Puis', 'Nous l’avons ramené', 'au plus bas', 'des plus bas'],
  '95:6':  ['sauf', 'ceux qui', 'ont cru', 'et accompli', 'les bonnes œuvres', 'pour eux alors', 'une récompense', 'jamais', 'interrompue'],
  '95:7':  ['Qu’est-ce qui donc', 'te fait démentir', 'après cela', 'la Rétribution ?'],
  '95:8':  ['N’est-ce pas', 'Allah', 'le plus juste', 'des juges ?'],

  // Sourate 96 — Al-Alaq (19 versets)
  '96:1':  ['Lis', 'au nom', 'de ton Seigneur', 'qui', 'a créé'],
  '96:2':  ['Il a créé', 'l’homme', 'd’', 'une adhérence'],
  '96:3':  ['Lis !', 'Et ton Seigneur', 'est le Très Noble'],
  '96:4':  ['Celui qui', 'a enseigné', 'par la plume (le calame)'],
  '96:5':  ['Il a enseigné', 'à l’homme', 'ce qu’', 'il ne', 'savait pas'],
  '96:6':  ['Mais non !', 'Certes', 'l’homme', 'transgresse vraiment'],
  '96:7':  ['dès qu’', 'il se voit', 'se suffire à lui-même'],
  '96:8':  ['Certes', 'vers', 'ton Seigneur', 'est le retour'],
  '96:9':  ['As-tu vu', 'celui qui', 'interdit'],
  '96:10': ['à un serviteur', 'quand', 'il prie ?'],
  '96:11': ['Vois-tu', 's’', 'il est', 'sur', 'la bonne voie'],
  '96:12': ['ou', 's’il ordonne', 'la piété ?'],
  '96:13': ['Vois-tu', 's’', 'il dément', 'et tourne le dos ?'],
  '96:14': ['Ne', 'sait-il pas', 'qu’', 'Allah', 'voit ?'],
  '96:15': ['Mais non !', 'S’il', 'ne', 'cesse pas', 'Nous le saisirons certes', 'par le toupet'],
  '96:16': ['un toupet', 'menteur', 'pécheur'],
  '96:17': ['Qu’il appelle donc', 'son assemblée'],
  '96:18': ['Nous appellerons', 'les gardiens (de l’Enfer)'],
  '96:19': ['Mais non !', 'Ne', 'lui obéis pas', 'mais prosterne-toi', 'et rapproche-toi'],

  // Sourate 97 — Al-Qadr (5 versets)
  '97:1':  ['Certes, Nous', 'l’avons fait descendre', 'pendant', 'la Nuit', 'du Destin'],
  '97:2':  ['Et qui', 'te dira', 'ce qu’est', 'la Nuit', 'du Destin ?'],
  '97:3':  ['La Nuit', 'du Destin', 'est meilleure', 'que', 'mille', 'mois'],
  '97:4':  ['Descendent', 'les Anges', 'ainsi que l’Esprit (Jibril)', 'durant elle', 'avec la permission', 'de leur Seigneur', 'pour', 'tout', 'ordre'],
  '97:5':  ['Paix', 'elle est', 'jusqu’au', 'lever', 'de l’aube'],

  // Sourate 98 — Al-Bayyinah (8 versets)
  '98:1':  ['Ne', 'devaient pas', 'ceux qui', 'ont mécru', 'parmi', 'les gens', 'du Livre', 'et les associateurs', 'se détacher (de leur voie)', 'jusqu’à ce que', 'leur vienne', 'la Preuve évidente'],
  '98:2':  ['un Messager', 'de la part', 'd’Allah', 'qui récite', 'des feuilles', 'purifiées'],
  '98:3':  ['dans lesquelles se trouvent', 'des prescriptions', 'd’une rectitude parfaite'],
  '98:4':  ['Et ne', 'se sont divisés', 'ceux qui', 'ont reçu', 'le Livre', 'si ce n’est', 'dès', 'après', 'que', 'leur fut venue', 'la Preuve évidente'],
  '98:5':  ['Et il ne', 'leur a été ordonné', 'que', 'd’adorer', 'Allah', 'en vouant exclusivement', 'à Lui', 'le culte', 'en purs monothéistes', 'et d’accomplir', 'la prière', 'et d’acquitter', 'la Zakat', 'Et telle est', 'la religion', 'de droiture'],
  '98:6':  ['Certes', 'ceux qui', 'ont mécru', 'parmi', 'les gens', 'du Livre', 'et les associateurs', 'seront dans', 'le feu', 'de la Géhenne', 'pour y demeurer éternellement', 'dedans', 'Ceux-là', 'sont', 'le pire', 'de toute la création'],
  '98:7':  ['Certes', 'ceux qui', 'ont cru', 'et accompli', 'les bonnes œuvres', 'ceux-là', 'sont', 'le meilleur', 'de toute la création'],
  '98:8':  ['Leur récompense', 'auprès de', 'leur Seigneur', 'sera les Jardins', 'd’Éden', 'coulent', 'de', 'sous lesquels', 'les ruisseaux', 'pour y demeurer', 'dedans', 'éternellement', 'Est satisfait', 'Allah', 'd’eux', 'et ils sont satisfaits', 'de Lui', 'Cela', 'est pour celui qui', 'craint', 'son Seigneur'],

  // Sourate 99 — Az-Zalzalah (8 versets)
  '99:1':  ['Quand', 'sera secouée', 'la terre', 'de son violent tremblement'],
  '99:2':  ['et que fera sortir', 'la terre', 'ses fardeaux'],
  '99:3':  ['et que dira', 'l’homme', 'Qu’', 'a-t-elle ?'],
  '99:4':  ['Ce Jour-là', 'elle racontera', 'ses nouvelles'],
  '99:5':  ['car', 'ton Seigneur', 'aura inspiré', 'à elle'],
  '99:6':  ['Ce Jour-là', 'sortiront', 'les gens', 'en groupes séparés', 'pour qu’on leur montre', 'leurs œuvres'],
  '99:7':  ['Quiconque donc', 'fait', 'le poids', 'd’un atome', 'de bien', 'le verra'],
  '99:8':  ['Et quiconque', 'fait', 'le poids', 'd’un atome', 'de mal', 'le verra']
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

  // 2. Mise à jour + minification de site/lexique-wbw-fr.json
  const lexPath = path.join(__dirname, 'site', 'lexique-wbw-fr.json');
  const lex = JSON.parse(fs.readFileSync(lexPath, 'utf8'));
  if (!lex.versets) lex.versets = {};

  let ajoutes = 0, maj = 0;
  for (const [vk, mots] of Object.entries(LOT_CERTIFIE)) {
    if (lex.versets[vk]) maj++; else ajoutes++;
    lex.versets[vk] = mots;
  }
  lex.version = (Number(lex.version) || 34) + 1;
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
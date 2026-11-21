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

// Traductions mot-à-mot certifiées — Sourates 78 à 79 (86 versets)
const LOT_CERTIFIE = {
  // Sourate 78 — An-Naba (40 versets)
  '78:1':  ['Sur quoi', 's’interrogent-ils ?'],
  '78:2':  ['Sur', 'la Nouvelle', 'immense'],
  '78:3':  ['au sujet de laquelle', 'ils', 'en elle', 'divergent'],
  '78:4':  ['Mais non !', 'Bientôt ils sauront'],
  '78:5':  ['Puis', 'mais non !', 'Bientôt ils sauront'],
  '78:6':  ['N’avons-Nous pas', 'fait de', 'la terre', 'un berceau ?'],
  '78:7':  ['Et des montagnes', 'des piquets ?'],
  '78:8':  ['Et Nous vous avons créés', 'en couples'],
  '78:9':  ['Et Nous avons fait de', 'votre sommeil', 'un repos'],
  '78:10': ['Et Nous avons fait de', 'la nuit', 'un vêtement'],
  '78:11': ['Et Nous avons fait du', 'jour', 'un moyen de subsistance'],
  '78:12': ['Et Nous avons bâti', 'au-dessus de vous', 'sept (cieux)', 'renforcés'],
  '78:13': ['Et Nous avons placé', 'une lampe', 'très ardente'],
  '78:14': ['Et Nous avons fait descendre', 'des', 'nuées', 'une eau', 'abondante'],
  '78:15': ['pour faire pousser', 'par elle', 'des grains', 'et des plantes'],
  '78:16': ['et des jardins', 'luxuriants'],
  '78:17': ['Certes', 'le Jour', 'du Jugement', 'est', 'un rendez-vous fixé'],
  '78:18': ['Le Jour où', 'il sera soufflé', 'dans', 'la Trompe', 'et vous viendrez', 'par foules'],
  '78:19': ['Et sera ouvert', 'le ciel', 'et il deviendra', 'des portes'],
  '78:20': ['Et seront mises en marche', 'les montagnes', 'et elles deviendront', 'un mirage'],
  '78:21': ['Certes', 'la Géhenne', 'est', 'un lieu d’embuscade'],
  '78:22': ['pour les transgresseurs', 'un lieu de retour'],
  '78:23': ['ils y demeureront', 'dedans', 'durant des siècles'],
  '78:24': ['Ils ne', 'goûteront', 'dedans', 'aucune fraîcheur', 'et aucune', 'boisson'],
  '78:25': ['hormis', 'une eau bouillante', 'et un pus glacial'],
  '78:26': ['comme rétribution', 'équitable'],
  '78:27': ['Certes, eux', 'n’étaient', 'pas', 'en attente d’', 'un jugement'],
  '78:28': ['et ils traitaient de mensonge', 'Nos versets', 'résolument'],
  '78:29': ['Alors que toute', 'chose', 'Nous l’avons dénombrée', 'par écrit'],
  '78:30': ['Goûtez donc !', 'Nous ne', 'vous augmenterons', 'qu’', 'en châtiment'],
  '78:31': ['Certes', 'pour les pieux', 'un lieu de réussite'],
  '78:32': ['des vergers', 'et des vignes'],
  '78:33': ['et des compagnes', 'd’un même âge'],
  '78:34': ['et une coupe', 'débordante'],
  '78:35': ['Ils n’', 'entendront', 'dedans', 'ni futilité', 'ni', 'mensonge'],
  '78:36': ['en récompense', 'de la part de', 'ton Seigneur', 'un don', 'amplement suffisant'],
  '78:37': ['Seigneur', 'des cieux', 'et de la terre', 'et de ce qui est', 'entre eux deux', 'le Tout Miséricordieux', 'ils ne', 'possèdent', 'de Lui', 'aucun droit à la parole'],
  '78:38': ['Le Jour où', 'se tiendront', 'l’Esprit (Jibril)', 'et les Anges', 'en rangs', 'ils ne', 'parleront pas', 'sauf', 'celui à qui', 'aura permis', 'à lui', 'le Tout Miséricordieux', 'et qui dira', 'ce qui est juste'],
  '78:39': ['Tel est', 'le Jour', 'vrai', 'Quiconque donc', 'veut', 'qu’il prenne', 'vers', 'son Seigneur', 'un refuge'],
  '78:40': ['Certes, Nous', 'vous avons avertis', 'd’un châtiment', 'proche', 'le Jour où', 'verra', 'l’homme', 'ce qu’', 'ont avancé', 'ses deux mains', 'et où dira', 'le mécréant', 'Hélas, si seulement', 'j’étais', 'poussière !'],

  // Sourate 79 — An-Nazi'at (46 versets)
  '79:1':  ['Par ceux qui arrachent', 'violemment'],
  '79:2':  ['Et par ceux qui recueillent', 'avec douceur'],
  '79:3':  ['Et par ceux qui voguent', 'aisément'],
  '79:4':  ['Et ceux qui devancent', 'rapidement'],
  '79:5':  ['Et ceux qui règlent', 'l’ordre (divin)'],
  '79:6':  ['Le Jour où', 'tremblera', 'la première secousse'],
  '79:7':  ['la suivra', 'la seconde secousse'],
  '79:8':  ['Des cœurs', 'ce Jour-là', 'seront palpitants'],
  '79:9':  ['leurs regards', 'abaissés'],
  '79:10': ['Ils disent', 'Est-ce que nous', 'serons vraiment ramenés', 'à', 'notre état antérieur ?'],
  '79:11': ['Quoi ! Quand', 'nous serons', 'des ossements', 'pourris ?'],
  '79:12': ['Ils dirent', 'Ce serait', 'alors', 'un retour', 'perdant'],
  '79:13': ['Ce ne sera pourtant', 'cela', 'qu’un cri', 'unique'],
  '79:14': ['et voilà qu’', 'ils seront', 'à la surface de la terre'],
  '79:15': ['Est-ce que', 't’est parvenu', 'le récit', 'de Moussa ?'],
  '79:16': ['Quand', 'l’appela', 'son Seigneur', 'dans la vallée', 'sanctifiée', 'de Touwa'],
  '79:17': ['Va', 'vers', 'Pharaon', 'certes, il', 'a transgressé'],
  '79:18': ['Puis dis-lui', 'Voudrais-', 'tu', 'aller', 'vers', 'te purifier ?'],
  '79:19': ['Et que je te guide', 'vers', 'ton Seigneur', 'afin que tu Le craignes ?'],
  '79:20': ['Puis il lui montra', 'le signe', 'immense'],
  '79:21': ['Mais il démentit', 'et désobéit'],
  '79:22': ['Puis', 'il tourna le dos', 'en s’efforçant (de nuire)'],
  '79:23': ['Alors il rassembla', 'et proclama'],
  '79:24': ['Puis il dit', 'Je suis', 'votre seigneur', 'le très-haut'],
  '79:25': ['Alors le saisit', 'Allah', 'du châtiment exemplaire', 'de l’au-delà', 'et de la vie présente'],
  '79:26': ['Certes', 'dans', 'cela', 'il y a une leçon', 'pour celui qui', 'craint (Allah)'],
  '79:27': ['Êtes-vous', 'plus difficiles', 'à créer', 'ou', 'le ciel ?', 'Il l’a bâti'],
  '79:28': ['Il a élevé', 'sa voûte', 'et l’a harmonisé'],
  '79:29': ['Et Il a assombri', 'sa nuit', 'et fait sortir', 'sa clarté (du jour)'],
  '79:30': ['Et la terre', 'après', 'cela', 'Il l’a étendue'],
  '79:31': ['Il a fait sortir', 'd’elle', 'son eau', 'et son pâturage'],
  '79:32': ['Et les montagnes', 'Il les a ancrées'],
  '79:33': ['pour jouissance', 'pour vous', 'et pour vos troupeaux'],
  '79:34': ['Puis quand', 'viendra', 'le grand Cataclysme', 'majeur'],
  '79:35': ['le Jour où', 'se rappellera', 'l’homme', 'ce pour quoi', 'il s’est efforcé'],
  '79:36': ['Et sera exposée', 'la Fournaise', 'à celui qui', 'regarde'],
  '79:37': ['Quant à', 'celui qui', 'a transgressé'],
  '79:38': ['et a préféré', 'la vie', 'd’ici-bas'],
  '79:39': ['alors certes', 'la Fournaise', 'sera', 'son refuge'],
  '79:40': ['Et quant à', 'celui qui', 'a craint', 'de comparaître devant', 'son Seigneur', 'et a préservé', 'son âme', 'de', 'la passion'],
  '79:41': ['alors certes', 'le Paradis', 'sera', 'son refuge'],
  '79:42': ['Ils t’interrogent', 'au sujet de', 'l’Heure', 'Quand', 'arrivera-t-elle ?'],
  '79:43': ['En quoi', 'peux-tu', 'la', 'mentionner ?'],
  '79:44': ['Vers', 'ton Seigneur', 'est son terme'],
  '79:45': ['Certes', 'tu n’es qu’', 'un avertisseur', 'pour celui qui', 'la redoute'],
  '79:46': ['Comme s’ils', 'le Jour où', 'ils la verront', 'n’', 'avaient demeuré', 'qu’', 'un soir', 'ou', 'une matinée']
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
  lex.version = (Number(lex.version) || 39) + 1;
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
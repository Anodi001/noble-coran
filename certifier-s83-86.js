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

// Traductions mot-à-mot certifiées — Sourates 83 à 86 (100 versets)
const LOT_CERTIFIE = {
  // Sourate 83 — Al-Mutaffifin (36 versets)
  '83:1':  ['Malheur', 'aux fraudeurs'],
  '83:2':  ['ceux qui', 'quand', 'ils font mesurer', 'aux', 'gens', 'exigent la pleine mesure'],
  '83:3':  ['Mais quand', 'ils mesurent pour eux', 'ou', 'pèsent pour eux', 'ils leur causent perte'],
  '83:4':  ['Ne', 'pensent-ils pas', 'ceux-là', 'qu’ils', 'seront ressuscités'],
  '83:5':  ['pour un Jour', 'terrible'],
  '83:6':  ['le Jour où', 'se tiendront', 'les gens', 'devant le Seigneur', 'des mondes'],
  '83:7':  ['Mais non !', 'Certes', 'le registre', 'des pervers', 'est bien dans', 'Sijjin'],
  '83:8':  ['Et qui', 'te dira', 'ce qu’est', 'Sijjin ?'],
  '83:9':  ['Un livre', 'déjà écrit'],
  '83:10': ['Malheur', 'ce Jour-là', 'à ceux qui démentent'],
  '83:11': ['ceux qui', 'traitent de mensonge', 'le Jour', 'de la Rétribution'],
  '83:12': ['Et ne', 'dément', 'cela', 'que', 'tout', 'transgresseur', 'pécheur'],
  '83:13': ['Quand', 'sont récités', 'devant lui', 'Nos versets', 'il dit', 'Des légendes', 'des anciens'],
  '83:14': ['Mais non !', 'Plutôt', 'a couvert de rouille', 'sur', 'leurs cœurs', 'ce qu’', 'ils ne cessaient', 'd’acquérir'],
  '83:15': ['Mais non !', 'Certes, eux', 'de', 'leur Seigneur', 'ce Jour-là', 'seront voilés'],
  '83:16': ['Puis', 'certes, eux', 'brûleront dans', 'la Fournaise'],
  '83:17': ['Puis', 'il sera dit', 'Voici', 'ce que', 'vous', 'à son sujet', 'traitiez de mensonge'],
  '83:18': ['Mais non !', 'Certes', 'le registre', 'des pieux', 'est bien dans', 'Illiyyin'],
  '83:19': ['Et qui', 'te dira', 'ce qu’est', 'Illiyyoun ?'],
  '83:20': ['Un livre', 'déjà écrit'],
  '83:21': ['dont témoignent', 'les rapprochés (d’Allah)'],
  '83:22': ['Certes', 'les pieux', 'seront bien dans', 'un délice'],
  '83:23': ['sur', 'des divans', 'ils regarderont'],
  '83:24': ['Tu reconnaîtras', 'sur', 'leurs visages', 'l’éclat', 'du bonheur'],
  '83:25': ['On leur donnera à boire', 'd’', 'un nectar pur', 'cacheté'],
  '83:26': ['dont le sceau', 'sera de musc', 'Et pour', 'cela', 'que rivalisent', 'ceux qui rivalisent'],
  '83:27': ['Et son mélange', 'provient de', 'Tasnim'],
  '83:28': ['une source', 'boivent', 'à laquelle', 'les rapprochés'],
  '83:29': ['Certes', 'ceux qui', 'ont commis des crimes', 'étaient', 'de', 'ceux qui', 'ont cru', 'en train de rire'],
  '83:30': ['Et quand', 'ils passaient', 'près d’eux', 'ils se faisaient des clins d’œil'],
  '83:31': ['Et quand', 'ils retournaient', 'vers', 'les leurs', 'ils retournaient', 'en plaisantant'],
  '83:32': ['Et quand', 'ils les voyaient', 'ils disaient', 'Certes', 'ceux-là', 'sont vraiment égarés'],
  '83:33': ['Or ils n’', 'avaient pas été envoyés', 'sur eux', 'comme gardiens'],
  '83:34': ['Aujourd’hui donc', 'ceux qui', 'ont cru', 'des', 'mécréants', 'vont rire'],
  '83:35': ['sur', 'les divans', 'ils regarderont'],
  '83:36': ['Est-ce que', 'ont été rétribués', 'les mécréants', 'pour ce qu’', 'ils', 'faisaient ?'],

  // Sourate 84 — Al-Inshiqaq (25 versets)
  '84:1':  ['Quand', 'le ciel', 'se déchirera'],
  '84:2':  ['et obéira', 'à son Seigneur', 'et tel est son devoir'],
  '84:3':  ['Et quand', 'la terre', 'sera nivelée'],
  '84:4':  ['et rejettera', 'ce qui est', 'en elle', 'et se videra'],
  '84:5':  ['et obéira', 'à son Seigneur', 'et tel est son devoir'],
  '84:6':  ['Ô', 'homme !', 'Certes, tu', 't’efforces', 'vers', 'ton Seigneur', 'd’un effort continu', 'et tu Le rencontreras'],
  '84:7':  ['Quant à', 'celui qui', 'recevra', 'son livre', 'en sa main droite'],
  '84:8':  ['bientôt alors', 'il sera jugé', 'd’un jugement', 'facile'],
  '84:9':  ['et il retournera', 'vers', 'les siens', 'tout réjoui'],
  '84:10': ['Et quant à', 'celui qui', 'recevra', 'son livre', 'derrière', 'son dos'],
  '84:11': ['bientôt alors', 'il implorera', 'la destruction'],
  '84:12': ['et il brûlera dans', 'un Feu ardent'],
  '84:13': ['Certes, il', 'était', 'parmi', 'les siens', 'tout joyeux'],
  '84:14': ['Certes, il', 'pensait', 'que', 'jamais', 'il ne retournerait (à Allah)'],
  '84:15': ['Mais si !', 'Certes', 'son Seigneur', 'était', 'sur lui', 'Parfaitement Clairvoyant'],
  '84:16': ['Non !', 'Je jure', 'par le crépuscule'],
  '84:17': ['et par la nuit', 'et ce qu’', 'elle rassemble'],
  '84:18': ['et par la lune', 'quand', 'elle devient pleine'],
  '84:19': ['Vous passerez certes', 'd’un état', 'à', 'un autre'],
  '84:20': ['Qu’', 'ont-ils donc', 'à ne pas', 'croire ?'],
  '84:21': ['Et quand', 'est récité', 'devant eux', 'le Coran', 'ils ne', 'se prosternent pas'],
  '84:22': ['Mais plutôt', 'ceux qui', 'ont mécru', 'démentent'],
  '84:23': ['Et Allah', 'sait mieux', 'ce qu’', 'ils dissimulent en eux'],
  '84:24': ['Annonce-leur donc', 'un châtiment', 'douloureux'],
  '84:25': ['sauf', 'ceux qui', 'ont cru', 'et accompli', 'les bonnes œuvres', 'pour eux', 'une récompense', 'jamais', 'interrompue'],

  // Sourate 85 — Al-Buruj (22 versets)
  '85:1':  ['Par le ciel', 'doté de', 'constellations'],
  '85:2':  ['Et par le Jour', 'promis'],
  '85:3':  ['Et par le témoin', 'et ce dont on témoigne'],
  '85:4':  ['Périssent', 'les gens', 'du Fossé'],
  '85:5':  ['du feu', 'plein', 'de combustible'],
  '85:6':  ['quand', 'ils', 'autour de lui', 'étaient assis'],
  '85:7':  ['et eux', 'de', 'ce qu’', 'ils faisaient', 'aux croyants', 'étaient témoins'],
  '85:8':  ['Et ils ne', 'leur reprochaient', '(d’eux)', 'que', 'de', 'croire', 'en Allah', 'le Tout-Puissant', 'le Digne de louange'],
  '85:9':  ['Celui qui', 'à Lui appartient', 'la royauté', 'des cieux', 'et de la terre', 'Et Allah', 'de', 'toute', 'chose', 'est Témoin'],
  '85:10': ['Certes', 'ceux qui', 'ont persécuté', 'les croyants', 'et les croyantes', 'puis', 'ne se sont pas', 'repentis', 'auront alors', 'le châtiment', 'de la Géhenne', 'et auront', 'le châtiment', 'de la Fournaise'],
  '85:11': ['Certes', 'ceux qui', 'ont cru', 'et accompli', 'les bonnes œuvres', 'auront', 'des Jardins', 'coulent', 'de', 'sous lesquels', 'les ruisseaux', 'Tel est', 'le succès', 'immense'],
  '85:12': ['Certes', 'la saisie', 'de ton Seigneur', 'est redoutable'],
  '85:13': ['Certes, Lui', 'c’est Lui qui', 'crée la première fois', 'et recommence'],
  '85:14': ['Et Il est', 'le Pardonneur', 'le Tout Affectueux'],
  '85:15': ['le Maître', 'du Trône', 'le Glorieux'],
  '85:16': ['Il réalise parfaitement', 'ce qu’', 'Il veut'],
  '85:17': ['Est-ce que', 't’est parvenu', 'le récit', 'des armées'],
  '85:18': ['de Pharaon', 'et des Thamoud ?'],
  '85:19': ['Mais plutôt', 'ceux qui', 'ont mécru', 'persistent dans', 'le démenti'],
  '85:20': ['alors qu’Allah', 'par', 'derrière eux', 'les cerne de toute part'],
  '85:21': ['Mais plutôt', 'c’est', 'un Coran', 'glorieux'],
  '85:22': ['sur', 'une Table', 'préservée'],

  // Sourate 86 — At-Tariq (17 versets)
  '86:1':  ['Par le ciel', 'et par l’astre nocturne'],
  '86:2':  ['Et qui', 'te dira', 'ce qu’est', 'l’astre nocturne ?'],
  '86:3':  ['C’est l’étoile', 'perçante'],
  '86:4':  ['Il n’est', 'aucune', 'âme', 'sans que', 'sur elle', 'ne veille un gardien'],
  '86:5':  ['Que regarde donc', 'l’homme', 'de quoi', 'il a été créé'],
  '86:6':  ['Il a été créé', 'd’', 'une eau', 'jaillissante'],
  '86:7':  ['qui sort', 'd’', 'entre', 'les lombes', 'et les côtes'],
  '86:8':  ['Certes, Il', 'à', 'le faire revenir', 'est bien Capable'],
  '86:9':  ['Le Jour où', 'seront dévoilés', 'les secrets'],
  '86:10': ['alors il n’aura', 'pour lui', 'aucune', 'force', 'et aucun', 'secoureur'],
  '86:11': ['Par le ciel', 'doué de', 'retour (pluie)'],
  '86:12': ['Et par la terre', 'qui se', 'fend (pour la végétation)'],
  '86:13': ['Certes, ceci', 'est une parole', 'décisive'],
  '86:14': ['et ce n’est pas', 'elle', 'une plaisanterie'],
  '86:15': ['Certes, eux', 'trament', 'une ruse'],
  '86:16': ['Et Moi Je trame', 'une ruse'],
  '86:17': ['Accorde donc un délai', 'aux mécréants', 'laisse-les', 'un peu de temps']
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
  lex.version = (Number(lex.version) || 36) + 1;
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
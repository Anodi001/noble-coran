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

// Traductions mot-à-mot certifiées — Sourates 80 à 82 (90 versets)
const LOT_CERTIFIE = {
  // Sourate 80 — Abasa (42 versets)
  '80:1':  ['Il s’est renfrogné', 'et s’est détourné'],
  '80:2':  ['parce que', 'est venu à lui', 'l’aveugle'],
  '80:3':  ['Et qui', 'te dira', 'peut-être', 'se purifiera-t-il ?'],
  '80:4':  ['ou', 'se rappellera-t-il', 'et lui profitera', 'le rappel ?'],
  '80:5':  ['Quant à', 'celui qui', 'se croit autosuffisant'],
  '80:6':  ['alors toi', 'vers lui', 'tu t’empresses'],
  '80:7':  ['alors qu’il ne', 't’incombe pas', 'qu’il ne', 'se purifie pas'],
  '80:8':  ['Et quant à', 'celui qui', 'vient à toi', 'avec empressement'],
  '80:9':  ['tout en', 'craignant (Allah)'],
  '80:10': ['alors toi', 'de lui', 'tu te détournes'],
  '80:11': ['Mais non !', 'Certes, ceci', 'est un rappel'],
  '80:12': ['Quiconque donc', 'veut', 's’en souvient'],
  '80:13': ['dans', 'des feuillets', 'honorés'],
  '80:14': ['élevés', 'purifiés'],
  '80:15': ['entre les mains', 'de scribes'],
  '80:16': ['nobles', 'obéissants'],
  '80:17': ['Périsse', 'l’homme !', 'Qu’il est', 'ingrat !'],
  '80:18': ['De', 'quelle', 'chose', 'l’a-t-Il créé ?'],
  '80:19': ['D’', 'une goutte de sperme', 'Il l’a créé', 'puis l’a déterminé'],
  '80:20': ['Puis', 'le chemin', 'Il lui a facilité'],
  '80:21': ['Puis', 'Il l’a fait mourir', 'et l’a mis au tombeau'],
  '80:22': ['Puis', 'quand', 'Il voudra', 'Il le ressuscitera'],
  '80:23': ['Mais non !', 'Il n’a pas encore', 'accompli', 'ce qu’', 'Il lui a ordonné'],
  '80:24': ['Que regarde donc', 'l’homme', 'vers', 'sa nourriture'],
  '80:25': ['Certes, Nous', 'avons versé', 'l’eau', 'en abondance'],
  '80:26': ['Puis', 'Nous avons fendu', 'la terre', 'profondément'],
  '80:27': ['et y avons fait pousser', 'dedans', 'des grains'],
  '80:28': ['et des vignes', 'et des légumes'],
  '80:29': ['et des oliviers', 'et des palmiers'],
  '80:30': ['et des jardins', 'touffus'],
  '80:31': ['et des fruits', 'et de l’herbage'],
  '80:32': ['pour jouissance', 'pour vous', 'et pour vos troupeaux'],
  '80:33': ['Puis quand', 'viendra', 'le Fracas assourdissant'],
  '80:34': ['le Jour où', 'fuira', 'l’homme', 'de', 'son frère'],
  '80:35': ['et de sa mère', 'et de son père'],
  '80:36': ['et de sa compagne', 'et de ses enfants'],
  '80:37': ['Pour chaque', 'homme', 'd’entre eux', 'ce Jour-là', 'une affaire', 'qui le préoccupera'],
  '80:38': ['Des visages', 'ce Jour-là', 'seront rayonnants'],
  '80:39': ['riants', 'réjouis'],
  '80:40': ['Et des visages', 'ce Jour-là', 'sur eux', 'de la poussière'],
  '80:41': ['les recouvrira', 'une noirceur'],
  '80:42': ['Ceux-là', 'sont', 'les mécréants', 'les pervers'],

  // Sourate 81 — At-Takwir (29 versets)
  '81:1':  ['Quand', 'le soleil', 'sera obscurci'],
  '81:2':  ['et quand', 'les étoiles', 'deviendront ternes'],
  '81:3':  ['et quand', 'les montagnes', 'seront mises en marche'],
  '81:4':  ['et quand', 'les chamelles pleines', 'seront délaissées'],
  '81:5':  ['et quand', 'les bêtes sauvages', 'seront rassemblées'],
  '81:6':  ['et quand', 'les mers', 'seront allumées'],
  '81:7':  ['et quand', 'les âmes', 'seront accouplées'],
  '81:8':  ['et quand', 'la fillette enterrée vivante', 'sera interrogée'],
  '81:9':  ['pour quel', 'péché', 'elle a été tuée'],
  '81:10': ['et quand', 'les feuillets', 'seront déployés'],
  '81:11': ['et quand', 'le ciel', 'sera écorché'],
  '81:12': ['et quand', 'la Fournaise', 'sera attisée'],
  '81:13': ['et quand', 'le Paradis', 'sera rapproché'],
  '81:14': ['saura alors', 'chaque âme', 'ce qu’', 'elle a présenté'],
  '81:15': ['Non !', 'Je jure', 'par les planètes qui gravitent'],
  '81:16': ['qui courent', 'et disparaissent'],
  '81:17': ['Et par la nuit', 'quand', 'elle survient'],
  '81:18': ['Et par l’aube', 'quand', 'elle exhale son souffle'],
  '81:19': ['Certes, ceci', 'est la parole', 'd’un Messager', 'noble'],
  '81:20': ['doué de', 'puissance', 'auprès du', 'Maître', 'du Trône', 'solidement établi'],
  '81:21': ['obéi', 'là-bas', 'et digne de confiance'],
  '81:22': ['Et n’est pas', 'votre compagnon', 'un fou'],
  '81:23': ['Et certes', 'il l’a vu', 'à l’horizon', 'clair'],
  '81:24': ['Et il n’est pas', 'lui', 'sur', 'l’Invisible', 'avare (réticent)'],
  '81:25': ['Et ce n’est pas', 'ceci', 'la parole', 'd’un diable', 'banni'],
  '81:26': ['Où donc', 'allez-vous ?'],
  '81:27': ['Ce n’est', 'ceci', 'qu’', 'un rappel', 'pour les mondes'],
  '81:28': ['pour quiconque', 'veut', 'parmi vous', 'suivre', 'le droit chemin'],
  '81:29': ['Mais vous ne', 'voulez', 'que', 'ce que', 'veut', 'Allah', 'Seigneur', 'des mondes'],

  // Sourate 82 — Al-Infitar (19 versets)
  '82:1':  ['Quand', 'le ciel', 'se rompra'],
  '82:2':  ['et quand', 'les étoiles', 'se disperseront'],
  '82:3':  ['et quand', 'les mers', 'déborderont'],
  '82:4':  ['et quand', 'les tombes', 'seront bouleversées'],
  '82:5':  ['saura alors', 'chaque âme', 'ce qu’', 'elle a avancé', 'et laissé derrière elle'],
  '82:6':  ['Ô', 'homme !', 'Qu’est-ce qui', 't’a trompé', 'au sujet de ton Seigneur', 'le Noble ?'],
  '82:7':  ['Celui qui', 't’a créé', 'puis modelé', 'et constitué harmonieusement'],
  '82:8':  ['Dans', 'quelle que soit', 'la forme', 'qu’', 'Il a voulue', 'Il t’a assemblé'],
  '82:9':  ['Mais non !', 'Plutôt', 'vous traitez de mensonge', 'la Rétribution'],
  '82:10': ['Alors que certes', 'sur vous', 'veillent des gardiens'],
  '82:11': ['nobles', 'scribes'],
  '82:12': ['qui savent', 'ce que', 'vous faites'],
  '82:13': ['Certes', 'les pieux', 'seront bien dans', 'un délice'],
  '82:14': ['et certes', 'les pervers', 'seront bien dans', 'une Fournaise'],
  '82:15': ['où ils brûleront', 'le Jour', 'de la Rétribution'],
  '82:16': ['et ils ne', 'pourront', 's’en', 'absenter'],
  '82:17': ['Et qui', 'te dira', 'ce qu’est', 'le Jour', 'de la Rétribution ?'],
  '82:18': ['Encore une fois', 'qui', 'te dira', 'ce qu’est', 'le Jour', 'de la Rétribution ?'],
  '82:19': ['Le Jour où', 'ne', 'pourra', 'aucune âme', 'pour une autre âme', 'rien faire', 'et le commandement', 'ce Jour-là', 'appartiendra à Allah']
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
  lex.version = (Number(lex.version) || 37) + 1;
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
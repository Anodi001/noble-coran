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

// Traductions mot-à-mot certifiées — Sourates 88 à 92 (112 versets)
const LOT_CERTIFIE = {
  // Sourate 88 — Al-Ghashiyah (26 versets)
  '88:1':  ['Est-ce que', 't’est parvenu', 'le récit', 'de l’Enveloppante ?'],
  '88:2':  ['Des visages', 'ce Jour-là', 'seront humiliés'],
  '88:3':  ['peinant', 'épuisés'],
  '88:4':  ['ils brûleront dans', 'un Feu', 'ardent'],
  '88:5':  ['ils seront abreuvés', 'd’', 'une source', 'bouillante'],
  '88:6':  ['Il n’y a pas', 'pour eux', 'de nourriture', 'sauf', 'd’', 'une plante épineuse amère'],
  '88:7':  ['qui ne', 'nourrit pas', 'et ne', 'suffit pas', 'contre', 'la faim'],
  '88:8':  ['Des visages', 'ce Jour-là', 'seront épanouis'],
  '88:9':  ['de leurs efforts', 'satisfaits'],
  '88:10': ['dans', 'un Jardin', 'élevé'],
  '88:11': ['on n’', 'entendra pas', 'dedans', 'de parole futile'],
  '88:12': ['Dedans', 'une source', 'jaillissante'],
  '88:13': ['Dedans', 'des lits', 'surélevés'],
  '88:14': ['et des coupes', 'disposées'],
  '88:15': ['et des coussins', 'rangés'],
  '88:16': ['et des tapis', 'déployés'],
  '88:17': ['Ne', 'regardent-ils donc pas', 'vers', 'les chameaux', 'comment', 'ils ont été créés ?'],
  '88:18': ['Et vers', 'le ciel', 'comment', 'il a été élevé ?'],
  '88:19': ['Et vers', 'les montagnes', 'comment', 'elles ont été dressées ?'],
  '88:20': ['Et vers', 'la terre', 'comment', 'elle a été aplanie ?'],
  '88:21': ['Rappelle donc', 'certes', 'tu n’es qu’', 'un rappeleur'],
  '88:22': ['Tu n’es pas', 'sur eux', 'un dominateur'],
  '88:23': ['Mais', 'celui qui', 'se détourne', 'et mécroit'],
  '88:24': ['alors le châtiera', 'Allah', 'du châtiment', 'le plus grand'],
  '88:25': ['Certes', 'vers Nous', 'est leur retour'],
  '88:26': ['Puis', 'certes', 'à Nous incombe', 'leur jugement'],

  // Sourate 89 — Al-Fajr (30 versets)
  '89:1':  ['Par l’Aube'],
  '89:2':  ['Et par les nuits', 'dix'],
  '89:3':  ['Et par le pair', 'et l’impair'],
  '89:4':  ['Et par la nuit', 'quand', 'elle s’écoule'],
  '89:5':  ['N’y a-t-il pas', 'dans', 'cela', 'un serment', 'pour celui doué', 'de raison ?'],
  '89:6':  ['N’as-tu pas', 'vu', 'comment', 'a agi', 'ton Seigneur', 'envers les Ad ?'],
  '89:7':  ['Iram', 'dotée de', 'hautes colonnes'],
  '89:8':  ['dont', 'il n’a pas', 'été créé', 'de semblable', 'dans', 'les contrées'],
  '89:9':  ['Et les Thamoud', 'qui', 'taillaient', 'le rocher', 'dans la vallée'],
  '89:10': ['Et Pharaon', 'détenteur', 'des pieux'],
  '89:11': ['qui', 'ont transgressé', 'dans', 'les pays'],
  '89:12': ['et ont multiplié', 'dedans', 'la corruption'],
  '89:13': ['Alors a déversé', 'sur eux', 'ton Seigneur', 'le fouet', 'du châtiment'],
  '89:14': ['Certes', 'ton Seigneur', 'est bien aux aguets'],
  '89:15': ['Quant à', 'l’homme', 'chaque fois', 'que', 'l’éprouve', 'son Seigneur', 'en l’honorant', 'et le comblant de bienfaits', 'il dit alors', 'Mon Seigneur', 'm’a honoré'],
  '89:16': ['Mais', 'chaque fois', 'que', 'Il l’éprouve', 'en restreignant', 'pour lui', 'sa subsistance', 'il dit alors', 'Mon Seigneur', 'm’a humilié'],
  '89:17': ['Mais non !', 'Plutôt', 'vous n’', 'honorez pas', 'l’orphelin'],
  '89:18': ['et vous ne', 'vous incitez pas', 'à', 'nourrir', 'le pauvre'],
  '89:19': ['et vous dévorez', 'l’héritage', 'd’une dévoration', 'avide'],
  '89:20': ['et vous aimez', 'les richesses', 'd’un amour', 'immense'],
  '89:21': ['Mais non !', 'Quand', 'sera broyée', 'la terre', 'coup', 'sur coup'],
  '89:22': ['et viendra', 'ton Seigneur', 'ainsi que les Anges', 'rang', 'par rang'],
  '89:23': ['Et on amènera', 'ce Jour-là', 'la Géhenne', 'Ce Jour-là', 'se rappellera', 'l’homme', 'mais à quoi bon', 'pour lui', 'le rappel ?'],
  '89:24': ['Il dira', 'Hélas, si seulement', 'j’avais avancé (des œuvres)', 'pour ma vie !'],
  '89:25': ['Ce Jour-là donc', 'ne', 'châtiera', 'comme Son châtiment', 'personne'],
  '89:26': ['et ne', 'liera', 'comme Son lien', 'personne'],
  '89:27': ['Ô toi', 'âme', 'apaisée'],
  '89:28': ['retourne', 'vers', 'ton Seigneur', 'satisfaite', 'et agréée'],
  '89:29': ['Entre donc', 'parmi', 'Mes serviteurs'],
  '89:30': ['et entre dans', 'Mon Paradis'],

  // Sourate 90 — Al-Balad (20 versets)
  '90:1':  ['Non !', 'Je jure', 'par cette', 'Cité'],
  '90:2':  ['alors que toi', 'tu résides', 'dans cette', 'Cité'],
  '90:3':  ['Et par le père', 'et ce qu’', 'il engendre'],
  '90:4':  ['Certes', 'Nous avons créé', 'l’homme', 'dans', 'l’épreuve'],
  '90:5':  ['Pense-t-il', 'que', 'ne', 'pourra rien', 'contre lui', 'personne ?'],
  '90:6':  ['Il dit', 'J’ai dépensé', 'des biens', 'en abondance'],
  '90:7':  ['Pense-t-il', 'que', 'ne', 'l’a vu', 'personne ?'],
  '90:8':  ['N’avons-Nous pas', 'fait', 'pour lui', 'deux yeux ?'],
  '90:9':  ['et une langue', 'et deux lèvres ?'],
  '90:10': ['Et Nous l’avons guidé vers', 'les deux voies'],
  '90:11': ['Mais il n’a pas', 'franchi', 'la voie difficile'],
  '90:12': ['Et qui', 'te dira', 'ce qu’est', 'la voie difficile ?'],
  '90:13': ['C’est affranchir', 'un captif'],
  '90:14': ['ou', 'nourrir', 'en', 'un jour', 'de', 'famine'],
  '90:15': ['un orphelin', 'proche', 'par la parenté'],
  '90:16': ['ou', 'un pauvre', 'dans', 'le dénuement'],
  '90:17': ['Puis', 'être', 'parmi', 'ceux qui', 'ont cru', 'et se sont enjoint', 'la patience', 'et se sont enjoint', 'la miséricorde'],
  '90:18': ['Ceux-là', 'sont les gens', 'de la droite'],
  '90:19': ['Et ceux qui', 'ont mécru', 'en Nos versets', 'eux', 'sont les gens', 'de la gauche'],
  '90:20': ['Sur eux', 'un Feu', 'refermé'],

  // Sourate 91 — Ash-Shams (15 versets)
  '91:1':  ['Par le soleil', 'et sa clarté'],
  '91:2':  ['Et par la lune', 'quand', 'elle le suit'],
  '91:3':  ['Et par le jour', 'quand', 'il le dévoile'],
  '91:4':  ['Et par la nuit', 'quand', 'elle l’enveloppe'],
  '91:5':  ['Et par le ciel', 'et Celui qui', 'l’a édifié'],
  '91:6':  ['Et par la terre', 'et Celui qui', 'l’a étendue'],
  '91:7':  ['Et par l’âme', 'et Celui qui', 'l’a harmonisée'],
  '91:8':  ['puis lui a inspiré', 'son immoralité', 'et sa piété'],
  '91:9':  ['Certes', 'a réussi', 'celui qui', 'la purifie'],
  '91:10': ['Et certes', 'a échoué', 'celui qui', 'la corrompt'],
  '91:11': ['Ont démenti', 'les Thamoud', 'par leur transgression'],
  '91:12': ['lorsque', 'se leva', 'le plus misérable d’entre eux'],
  '91:13': ['Alors dit', 'à eux', 'le Messager', 'd’Allah', 'La chamelle', 'd’Allah', 'et son tour d’abreuvement !'],
  '91:14': ['Mais ils le démentirent', 'et la tuèrent', 'Alors fit fondre le châtiment', 'sur eux', 'leur Seigneur', 'pour leur péché', 'et les anéantit tous'],
  '91:15': ['Et Il ne', 'craint pas', 'les conséquences'],

  // Sourate 92 — Al-Layl (21 versets)
  '92:1':  ['Par la nuit', 'quand', 'elle enveloppe tout'],
  '92:2':  ['Et par le jour', 'quand', 'il éclaire'],
  '92:3':  ['Et par Celui qui', 'a créé', 'le mâle', 'et la femelle'],
  '92:4':  ['Certes', 'vos efforts', 'sont bien divergents'],
  '92:5':  ['Quant à', 'celui qui', 'donne', 'et craint (Allah)'],
  '92:6':  ['et déclare véridique', 'la plus belle récompense'],
  '92:7':  ['Nous lui faciliterons alors', 'la voie de la facilité'],
  '92:8':  ['Et quant à', 'celui qui', 'se montre avare', 'et cherche à se passer (d’Allah)'],
  '92:9':  ['et traite de mensonge', 'la plus belle récompense'],
  '92:10': ['Nous lui faciliterons alors', 'la voie de la difficulté'],
  '92:11': ['Et ne', 'servira à rien', 'pour lui', 'sa fortune', 'quand', 'il tombera (en Enfer)'],
  '92:12': ['Certes', 'à Nous incombe', 'la guidée'],
  '92:13': ['Et certes', 'à Nous appartiennent', 'l’au-delà', 'et la vie présente'],
  '92:14': ['Je vous ai donc avertis', 'd’un Feu', 'flambant'],
  '92:15': ['N’', 'y brûlera', 'que', 'le plus misérable'],
  '92:16': ['celui qui', 'a démenti', 'et s’est détourné'],
  '92:17': ['Et en sera écarté', 'le plus pieux'],
  '92:18': ['celui qui', 'donne', 'ses biens', 'pour se purifier'],
  '92:19': ['et sans que', 'personne', 'chez lui', 'n’ait de', 'bienfait', 'à récompenser'],
  '92:20': ['sinon', 'la recherche', 'de la Face', 'de son Seigneur', 'le Très-Haut'],
  '92:21': ['Et certes bientôt', 'il sera satisfait']
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
  lex.version = (Number(lex.version) || 35) + 1;
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
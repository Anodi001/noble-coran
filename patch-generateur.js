/* ONEDRIVE_SAFE */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const cheminGen = path.join(__dirname, 'generateur.js');
if (!fs.existsSync(cheminGen)) {
  console.error('generateur.js introuvable dans :', __dirname);
  process.exit(1);
}

const orig = fs.readFileSync(cheminGen, 'utf8');
fs.writeFileSync(path.join(__dirname, 'generateur.js.bak'), orig, 'utf8');

let out = orig;
let modifs = [];

// 1. Corriger nettoyerArabe : ne plus supprimer les signes de pause/prolongation du Rasm Uthmani
const reArabe = /function nettoyerArabe\(cle, tBrut\) \{[\s\S]*?\n\}/;
if (!reArabe.test(out)) {
  console.error('Bloc nettoyerArabe introuvable.');
  process.exit(1);
}
out = out.replace(reArabe, `function nettoyerArabe(cle, tBrut) {
  if (LETTRES_MYSTERIEUSES_EXACTES[cle]) return LETTRES_MYSTERIEUSES_EXACTES[cle];
  return String(tBrut || '').replace(/\\s+/g, ' ').trim();
}`);
modifs.push('1. nettoyerArabe : conservation intégrale des signes du Rasm Uthmani');

// 2. Désactiver la découpe brutale des tafsirs groupés dans separerDoublonsConsecutifs
const reDoublons = /function separerDoublonsConsecutifs\(listeTafsirBrut\) \{[\s\S]*?return copie;\s*\}/;
if (!reDoublons.test(out)) {
  console.error('Bloc separerDoublonsConsecutifs introuvable.');
  process.exit(1);
}
out = out.replace(reDoublons, `function separerDoublonsConsecutifs(listeTafsirBrut) {
  // Ne plus couper mécaniquement les tafsirs groupés au milieu des phrases
  return (listeTafsirBrut || []).map(item => Object.assign({}, item));
}`);
modifs.push('2. separerDoublonsConsecutifs : découpe brutale supprimée');

// 3. Corriger la regex des parenthèses dans nettoyerEtSimplifierGrandTafsirFr
const reParen = /for \(let p = 0; p < 6; p\+\+\) \{[\s\S]*?t = t\.replace\(\/\\s\*\\\(\\s\*\\\)\/g, ''\);\s*\}/;
if (!reParen.test(out)) {
  console.error('Bloc regex parenthèses introuvable dans nettoyerEtSimplifierGrandTafsirFr.');
  process.exit(1);
}
out = out.replace(reParen, `for (let p = 0; p < 3; p++) {
    // Cible uniquement la translittération académique arabe, jamais les parenthèses françaises (', ’, -, â, î, û)
    t = t.replace(/\\s*\\([^()]*[ṣḍṭḥḏẓāīūĥĵšğʿʾ][^()]*\\)/gi, '');
    t = t.replace(/\\s*\\(\\s*\\)/g, '');
  }`);
modifs.push('3. nettoyerEtSimplifierGrandTafsirFr : parenthèses françaises préservées');

// 4. Donner la priorité à memoire-site.json sur les valeurs en dur de generateur.js
let nbPrio = 0;
const replacementsPrio = [
  [
    /Object\.assign\(memoireGlobale\.miracles,\s*MIRACLES_DE_BASE\);/g,
    'memoireGlobale.miracles = Object.assign({}, MIRACLES_DE_BASE, memoireGlobale.miracles);'
  ],
  [
    /Object\.assign\(memoireGlobale\.tafsirFr,\s*TAFSIR_INTEGRAL_DE_BASE_FR,\s*TAFSIR_SOURATE_96_FR,\s*TAFSIR_SOURATES_68_73_FR\);/g,
    'memoireGlobale.tafsirFr = Object.assign({}, TAFSIR_INTEGRAL_DE_BASE_FR, TAFSIR_SOURATE_96_FR, TAFSIR_SOURATES_68_73_FR, memoireGlobale.tafsirFr);'
  ],
  [
    /Object\.assign\(memoireGlobale\.tafsirEn,\s*TAFSIR_SOURATE_96_EN,\s*TAFSIR_SOURATES_68_73_EN\);/g,
    'memoireGlobale.tafsirEn = Object.assign({}, TAFSIR_SOURATE_96_EN, TAFSIR_SOURATES_68_73_EN, memoireGlobale.tafsirEn);'
  ],
  [
    /Object\.assign\(memoireGlobale\.tafsirEs,\s*TAFSIR_SOURATE_96_ES,\s*TAFSIR_SOURATES_68_73_ES\);/g,
    'memoireGlobale.tafsirEs = Object.assign({}, TAFSIR_SOURATE_96_ES, TAFSIR_SOURATES_68_73_ES, memoireGlobale.tafsirEs);'
  ],
  [
    /Object\.assign\(memoireGlobale\.tafsirAr,\s*TAFSIR_SOURATE_96_AR,\s*TAFSIR_SOURATES_68_73_AR\);/g,
    'memoireGlobale.tafsirAr = Object.assign({}, TAFSIR_SOURATE_96_AR, TAFSIR_SOURATES_68_73_AR, memoireGlobale.tafsirAr);'
  ]
];

for (const [re, rep] of replacementsPrio) {
  if (re.test(out)) {
    out = out.replace(re, rep);
    nbPrio++;
  }
}
modifs.push(`4. Priorité memoire-site.json sécurisée (${nbPrio} blocs corrigés)`);

// Vérification syntaxique complète avant écriture
try {
  new vm.Script(out, { filename: 'generateur.js' });
} catch (err) {
  console.error('ERREUR DE SYNTAXE après patch (generateur.js non modifié) :\n', err.message);
  process.exit(1);
}

fs.writeFileSync(cheminGen, out, 'utf8');
console.log('✅ generateur.js réparé et vérifié (sauvegarde dans generateur.js.bak) :');
modifs.forEach(m => console.log('  - ' + m));
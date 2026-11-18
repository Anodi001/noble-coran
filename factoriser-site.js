/* ONEDRIVE_SAFE */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function writeSafe(filePath, content) {
  for (let i = 0; i < 15; i++) {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      return;
    } catch (e) {
      if (i === 14) throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80);
    }
  }
}

const dossierSite = fs.existsSync(path.join(__dirname, 'site', 'sourate-1-verset-1.html'))
  ? path.join(__dirname, 'site')
  : __dirname;

const fichiers = fs.readdirSync(dossierSite).filter(f => /^sourate-\d+-verset-\d+\.html$/i.test(f));
if (fichiers.length === 0) {
  console.error('Aucun fichier sourate-X-verset-Y.html trouvé dans :', dossierSite);
  process.exit(1);
}

// Trouver une page de référence intacte contenant V77 + V110 (style Al-Alaq sans rectangles)
let fichierRef = null;
for (const f of fichiers) {
  const html = fs.readFileSync(path.join(dossierSite, f), 'utf8');
  if (html.includes('WBW_COLLE_V110_START') && html.includes('script-master-v77') && html.includes('modeMotAMotActif')) {
    fichierRef = f;
    break;
  }
}

if (!fichierRef) {
  console.error('Aucune page intacte avec V110 trouvée. Lance d\'abord : git checkout -- "site/sourate-*.html"');
  process.exit(1);
}

console.log(`Modèle Al-Alaq (fluide sans rectangles) extrait depuis : ${fichierRef}`);
const refHtml = fs.readFileSync(path.join(dossierSite, fichierRef), 'utf8');

const pick = (re, label) => {
  const m = refHtml.match(re);
  if (!m) throw new Error(`Bloc introuvable dans ${fichierRef} : ${label}`);
  return m[1];
};

// 1. CSS unique (inclut V110 -> zéro rectangle)
const finalCss = [
  pick(/<style>([\s\S]*?)<\/style>/i, 'CSS principal'),
  pick(/<style id="style-refs-cliquables">([\s\S]*?)<\/style>/i, 'CSS refs cliquables'),
  pick(/<style id="patch-master-v77">([\s\S]*?)<\/style>/i, 'CSS patch V77'),
  pick(/<style id="wbw-style-v110">([\s\S]*?)<\/style>/i, 'CSS V110 sans rectangles')
].join('\n\n/* --- */\n\n');

// 2. JS unique + correctifs du mode Suivi (68:1, 38:1, 50:1 et toutes les sourates)
const initJumperJs = `
(function initVerseJumperDynamique() {
  var j = document.getElementById('verseJumperSelect');
  if (!j || j.options.length > 1 || !window.SOURATE_DATA) return;
  var S = window.SOURATE_DATA, html = '';
  for (var i = 1; i <= S.nbVersets; i++) {
    var estM = Boolean(S.versets[i - 1] && S.versets[i - 1].miracle);
    html += '<option value="sourate-' + S.numSourate + '-verset-' + i + '.html"' +
      (estM ? ' class="opt-miracle-gold"' : '') +
      (i === numVersetActuel ? ' selected' : '') + '>' +
      (estM ? '★ ' : '') + 'Verset ' + i + ' / ' + S.nbVersets +
      (estM ? ' (Miracle)' : '') + '</option>';
  }
  j.innerHTML = html;
})();
`;

const coreScriptMatch = refHtml.match(
  /<script>\s*(?:const|let|var)\s+numSourateActuelle\s*=\s*\d+;\s*(?:const|let|var)\s+numVersetActuel\s*=\s*\d+;\s*(?:const|let|var)\s+codeAudio\s*=\s*"\d+";([\s\S]*?)<\/script>/i
);
if (!coreScriptMatch) throw new Error('Bloc script principal introuvable.');

let jsV77 = pick(/<script id="script-master-v77">([\s\S]*?)<\/script>/i, 'JS master V77');
let jsV110 = pick(/<script id="wbw-colle-v110">([\s\S]*?)<\/script>/i, 'JS V110');

// Correctif A : Valider que les segments QDC couvrent bien tous les mots du verset (évite le blocage sur le mot 1)
jsV77 = jsV77.replace(
  /var segsNorm = cacheTimingVerset\[cleRec \+ "_" \+ vk\];/,
  `var segsRaw = cacheTimingVerset[cleRec + "_" + vk];
        var segsNorm = null;
        if (segsRaw && segsRaw.length > 0) {
          var maxWIdx = -1;
          for (var si = 0; si < segsRaw.length; si++) {
            if (segsRaw[si].wordIndex > maxWIdx) maxWIdx = segsRaw[si].wordIndex;
          }
          if (items.length <= 1 || (segsRaw.length >= items.length && maxWIdx >= items.length - 1)) {
            segsNorm = segsRaw;
          }
        }`
);

// Correctif B : Si QDC est absent/incomplet, pondérer le Madd (ٓ) et la Shadda (ّ) pour 68:1, 38:1, 50:1, etc.
jsV77 = jsV77.replace(
  /activeIndexFloat = ratioVoix \* items\.length;/,
  `var wArr = [], wTot = 0;
          for (var wi = 0; wi < items.length; wi++) {
            var rawW = (items[wi].textContent || "");
            var cleanW = rawW.replace(/[\\u064B-\\u065F\\u0670\\u06D6-\\u06ED\\u0640\\s]/g, "");
            var nMadd = (rawW.match(/\\u0653/g) || []).length;
            var nShad = (rawW.match(/\\u0651/g) || []).length;
            var pw = Math.max(2.2, cleanW.length * 1.15 + nMadd * 7.5 + nShad * 1.0);
            wArr.push(pw); wTot += pw;
          }
          var cumW = 0; activeIndexFloat = items.length - 1;
          for (var wj = 0; wj < wArr.length; wj++) {
            var nextW = cumW + wArr[wj] / (wTot || 1);
            if (ratioVoix <= nextW) { activeIndexFloat = wj; break; }
            cumW = nextW;
          }`
);

// Correctif C : Même pondération Madd (ٓ) dans calculerFenetresMots de V110 (pour le clic direct sur un mot)
jsV110 = jsV110.replace(
  /var poids = new Array\(n\), totalPoids = 0;[\s\S]*?poids\[i\] = Math\.max\(2\.2, arTxt\.length \* 1\.15\); totalPoids \+= poids\[i\];\s*\}/,
  `var poids = new Array(n), totalPoids = 0;
    for (var i = 0; i < n; i++) {
      var m = cacheMetaCartes[i];
      var brutAr = m && m.elAr ? (m.elAr.textContent || '') : '';
      var arTxt = nettoyerArabeBrut(brutAr);
      var nMadd = (brutAr.match(/\\u0653/g) || []).length;
      var nShad = (brutAr.match(/\\u0651/g) || []).length;
      poids[i] = Math.max(2.2, arTxt.length * 1.15 + nMadd * 7.5 + nShad * 1.0);
      totalPoids += poids[i];
    }`
);

// Correctif D : Supprimer la zone morte maxValE = 0.50 (utiliser directement l'index synchronisé)
jsV110 = jsV110.replace(
  /else if \(audioJoue\) \{\s*for \(var p = 0; p < cartes\.length; p\+\+\) \{/,
  `else if (audioJoue) {
      if (window.__wbwLectureActive && typeof window.__wbwIdxEntier === 'number' && window.__wbwIdxEntier >= 0 && window.__wbwIdxEntier < cartes.length) {
        idxPic = window.__wbwIdxEntier;
      } else for (var p = 0; p < cartes.length; p++) {`
);

const finalJs = [
  initJumperJs,
  pick(/<script id="script-refs-cliquables">([\s\S]*?)<\/script>/i, 'JS refs cliquables'),
  coreScriptMatch[1],
  pick(/<script>\s*(let modeMotAMotActif[\s\S]*?)<\/script>/i, 'JS WBW/Tajwid/Bruit Brun'),
  jsV77,
  jsV110
].join('\n;\n');

// Vérification syntaxique stricte avant écriture
try {
  new vm.Script(finalJs, { filename: 'assets/verset.js' });
  console.log('✓ Syntaxe de assets/verset.js vérifiée : 0 erreur.');
} catch (err) {
  console.error('ERREUR DE SYNTAXE dans verset.js (aucun fichier modifié) :\n', err.message);
  process.exit(1);
}

const dossierAssets = path.join(dossierSite, 'assets');
if (!fs.existsSync(dossierAssets)) fs.mkdirSync(dossierAssets, { recursive: true });

const versionTag = Date.now();
writeSafe(path.join(dossierAssets, 'verset.css'), finalCss);
writeSafe(path.join(dossierAssets, 'verset.js'), finalJs);
console.log(`✓ Créés : site/assets/verset.css (${(finalCss.length / 1024).toFixed(1)} Ko) et site/assets/verset.js (${(finalJs.length / 1024).toFixed(1)} Ko)`);

// 3. Uniformiser et alléger les 6 236 pages HTML
let nbModifies = 0, tailleAvant = 0, tailleApres = 0;
for (const f of fichiers) {
  const fp = path.join(dossierSite, f);
  const orig = fs.readFileSync(fp, 'utf8');
  tailleAvant += Buffer.byteLength(orig, 'utf8');

  const mNom = f.match(/^sourate-(\d+)-verset-(\d+)\.html$/i);
  const sNum = Number(mNom[1]), vNum = Number(mNom[2]);
  const codeAud = String(sNum).padStart(3, '0') + String(vNum).padStart(3, '0');

  let out = orig;
  out = out.replace(/<!--\s*WBW_COLLE_V110_START\s*-->[\s\S]*?<!--\s*WBW_COLLE_V110_END\s*-->/gi, '');
  out = out.replace(/<style id="style-refs-cliquables">[\s\S]*?<\/style>/gi, '');
  out = out.replace(/<script id="script-refs-cliquables">[\s\S]*?<\/script>/gi, '');
  out = out.replace(/<style id="patch-master-v77">[\s\S]*?<\/style>/gi, '');
  out = out.replace(/<script id="script-master-v77">[\s\S]*?<\/script>/gi, '');
  out = out.replace(/<style>[\s\S]*?<\/style>/i, '');
  out = out.replace(/<link rel="stylesheet" href="assets\/verset\.css[^"]*">\s*/gi, '');
  out = out.replace(/<script>\s*(?:const|let|var)\s+numSourateActuelle[\s\S]*?<\/script>/gi, '');
  out = out.replace(/<script>\s*let modeMotAMotActif[\s\S]*?<\/script>/gi, '');
  out = out.replace(/<script src="assets\/verset\.js[^"]*"><\/script>\s*/gi, '');

  out = out.replace(/<select id="verseJumperSelect"([^>]*)>[\s\S]*?<\/select>/i, '<select id="verseJumperSelect"$1></select>');
  out = out.replace(/<\/head>/i, `  <link rel="stylesheet" href="assets/verset.css?v=${versionTag}">\n</head>`);
  out = out.replace(/<\/body>/i, `<script>var numSourateActuelle = ${sNum}; var numVersetActuel = ${vNum}; var codeAudio = "${codeAud}";</script>\n<script src="assets/verset.js?v=${versionTag}"></script>\n</body>`);

  if (!out.includes('arabicVerseEl') || !out.includes('mainExplanationEl')) continue;
  writeSafe(fp, out);
  tailleApres += Buffer.byteLength(out, 'utf8');
  nbModifies++;
}

console.log(`\n✅ TERMINE : ${nbModifies} pages passées en style Al-Alaq (fluide sans rectangles) + suivi corrigé.`);
console.log(`📉 Poids total HTML : ${(tailleAvant / 1048576).toFixed(1)} Mo  -->  ${(tailleApres / 1048576).toFixed(1)} Mo`);
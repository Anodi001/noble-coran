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

function readNorm(p) {
  const raw = fs.readFileSync(p, 'utf8');
  return { text: raw.replace(/\r\n/g, '\n'), eol: raw.includes('\r\n') ? '\r\n' : '\n' };
}

function writeNorm(p, text, eol) {
  writeSafe(p, eol === '\r\n' ? text.replace(/\n/g, '\r\n') : text);
}

const idxPath = path.join(__dirname, 'site', 'index.html');
const idxFile = readNorm(idxPath);
let idx = idxFile.text;

// Logos SVG propres (barres croissantes + flèche ↑ / barres décroissantes + flèche ↓)
const SVG_ASC = '<svg class="sort-order-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20v-4"/><path d="M9 20v-8"/><path d="M14 20v-12"/><path d="M19 20V5"/><path d="M16 8l3-3 3 3"/></svg>';
const SVG_DESC = '<svg class="sort-order-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20v-12"/><path d="M9 20v-8"/><path d="M14 20v-4"/><path d="M19 5v15"/><path d="M16 17l3 3 3-3"/></svg>';

// 1. Remplacer le CSS de l'ancien sous-bouton par l'alignement propre des logos SVG sur .sort-btn
const reOldStyle = /<style id="sortDirStyleV1">[\s\S]*?<\/style>/;
const newStyle = `<style id="sortDirStyleV1">
  .sort-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
  }
  .sort-order-ico {
    flex-shrink: 0;
    vertical-align: middle;
  }
  </style>`;
if (reOldStyle.test(idx)) {
  idx = idx.replace(reOldStyle, newStyle);
} else {
  idx = idx.replace('</head>', newStyle + '\n</head>');
}

// 2. Remplacer la barre .controls + supprimer #sortDirWrap
const oldControls =
`    <div class="controls">
      <button class="sort-btn" id="sortBtn2" onclick="trier('chrono', this)">1. Ordre de Révélation (1 à 114)</button>
      <button class="sort-btn active" id="sortBtn1" onclick="trier('classique', this)">2. Ordre classique (1 à 114)</button>
      <button class="sort-btn miracle-tab-btn" id="sortBtn3" onclick="trier('miracles', this)">3. <span class="gold-star-icon">★</span> Les Miracles du Coran</button>
    </div>
    <div class="sort-dir-wrap" id="sortDirWrap">
      <button type="button" class="sort-dir-btn" id="sortDirBtn" onclick="basculerSensTri()">↑ Ordre croissant (1 → 114)</button>
    </div>`;

const newControls =
`    <div class="controls">
      <button class="sort-btn" id="sortBtn2" onclick="trier('chrono', this)">1. Ordre de Révélation (1 à 114)</button>
      <button class="sort-btn active" id="sortBtn1" onclick="trier('croissant', this)">${SVG_ASC}<span>2. Ordre croissant (1 → 114)</span></button>
      <button class="sort-btn" id="sortBtnDesc" onclick="trier('decroissant', this)">${SVG_DESC}<span>3. Ordre décroissant (114 → 1)</span></button>
      <button class="sort-btn miracle-tab-btn" id="sortBtn3" onclick="trier('miracles', this)">4. <span class="gold-star-icon">★</span> Les Miracles du Coran</button>
    </div>`;

if (!idx.includes(oldControls)) {
  throw new Error('Bloc .controls / #sortDirWrap introuvable dans site/index.html');
}
idx = idx.replace(oldControls, newControls);

// 3. Initialisation modeTri = 'croissant' (suppression de sensTri)
const oldInit = "    let modeTri = 'classique', sensTri = 'asc', currentLang = 'fr', lastReadData = null;";
const newInit = "    let modeTri = 'croissant', currentLang = 'fr', lastReadData = null;";
if (!idx.includes(oldInit)) {
  throw new Error('Ligne modeTri / sensTri introuvable dans site/index.html');
}
idx = idx.replace(oldInit, newInit);

// 4. Simplifier trier() (plus besoin de majBoutonSensTri / basculerSensTri)
const reOldTrierBlock = /    function majBoutonSensTri\(\) \{[\s\S]*?function trier\(m, btn\) \{[^\n]*\}/;
const newTrierBlock = "    function trier(m, btn) { modeTri = m; document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); afficher(); }";
if (!reOldTrierBlock.test(idx)) {
  throw new Error('Bloc majBoutonSensTri / trier introuvable dans site/index.html');
}
idx = idx.replace(reOldTrierBlock, newTrierBlock);

// 5. Mettre à jour appliquerLangueAccueil() pour sortBtn1, sortBtnDesc et sortBtn3 (4.)
const reSortBtn1 = /document\.getElementById\('sortBtn1'\)\.textContent\s*=\s*[^;]+;/;
if (!reSortBtn1.test(idx)) {
  throw new Error("Ligne sortBtn1 dans appliquerLangueAccueil introuvable");
}
const replacementBtnsI18n =
`const _svgAsc = '${SVG_ASC}';
      const _svgDesc = '${SVG_DESC}';
      document.getElementById('sortBtn1').innerHTML = _svgAsc + '<span>' + (isAr ? "2. ترتيب تصاعدي (1 ← 114)" : (isEn ? "2. Ascending Order (1 → 114)" : (isEs ? "2. Orden ascendente (1 → 114)" : "2. Ordre croissant (1 → 114)"))) + '</span>';
      const _bDesc = document.getElementById('sortBtnDesc');
      if (_bDesc) _bDesc.innerHTML = _svgDesc + '<span>' + (isAr ? "3. ترتيب تنازلي (114 ← 1)" : (isEn ? "3. Descending Order (114 → 1)" : (isEs ? "3. Orden descendente (114 → 1)" : "3. Ordre décroissant (114 → 1)"))) + '</span>';`;
idx = idx.replace(reSortBtn1, replacementBtnsI18n);

// Passer "3." à "4." sur sortBtn3 dans appliquerLangueAccueil()
const reSortBtn3 = /document\.getElementById\('sortBtn3'\)\.innerHTML\s*=\s*[\s\S]*?;/;
if (reSortBtn3.test(idx)) {
  idx = idx.replace(reSortBtn3, m => m.replace(/3\.\s*/g, '4. '));
}

// 6. Mettre à jour les dictionnaires DE / IT / ID / RU (remplacer "ordre classique" par croissant + décroissant)
idx = idx
  .replace(/"2\. ordre classique \(1 à 114\)":\s*"2\. Klassische Reihenfolge \(1–114\)",/,
    '"2. ordre croissant (1 → 114)": "2. Aufsteigend (1 → 114)",\n      "3. ordre décroissant (114 → 1)": "3. Absteigend (114 → 1)",')
  .replace(/"2\. ordre classique \(1 à 114\)":\s*"2\. Ordine Classico \(1–114\)",/,
    '"2. ordre croissant (1 → 114)": "2. Ordine crescente (1 → 114)",\n      "3. ordre décroissant (114 → 1)": "3. Ordine decrescente (114 → 1)",')
  .replace(/"2\. ordre classique \(1 à 114\)":\s*"2\. Urutan Mushaf \(1–114\)",/,
    '"2. ordre croissant (1 → 114)": "2. Urutan naik (1 → 114)",\n      "3. ordre décroissant (114 → 1)": "3. Urutan turun (114 → 1)",')
  .replace(/"2\. ordre classique \(1 à 114\)":\s*"2\. По порядку Мусхафа \(1–114\)",/,
    '"2. ordre croissant (1 → 114)": "2. По возрастанию (1 → 114)",\n      "3. ordre décroissant (114 → 1)": "3. По убыванию (114 → 1)",');

// 7. Compatibilité du bouton Mentions légales (remplace modeTri === 'classique')
idx = idx.replace(/modeTri\s*===\s*'classique'/g, "(modeTri === 'croissant' || modeTri === 'decroissant')");

// 8. Logique de tri dans afficher()
const oldSortLogic =
`      } else if (modeTri === 'chrono') {
        liste.sort((a, b) => sensTri === 'desc' ? (b.ordreRev - a.ordreRev) : (a.ordreRev - b.ordreRev));
      } else {
        liste.sort((a, b) => sensTri === 'desc' ? (b.id - a.id) : (a.id - b.id));
      }
      if (typeof majBoutonSensTri === 'function') majBoutonSensTri();`;

const newSortLogic =
`      } else if (modeTri === 'chrono') {
        liste.sort((a, b) => a.ordreRev - b.ordreRev);
      } else if (modeTri === 'decroissant') {
        liste.sort((a, b) => b.id - a.id);
      } else {
        liste.sort((a, b) => a.id - b.id);
      }`;

if (!idx.includes(oldSortLogic)) {
  throw new Error('Bloc liste.sort introuvable dans site/index.html');
}
idx = idx.replace(oldSortLogic, newSortLogic);

// 9. Vérification syntaxique JS de tous les blocs <script> de index.html avant écriture
const scripts = [...idx.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
scripts.forEach((m, i) => {
  const code = (m[1] || '').trim();
  if (!code || /type\s*=\s*["']application\/ld\+json["']/i.test(m[0])) return;
  try { new vm.Script(code); }
  catch (e) { throw new Error(`Erreur de syntaxe JS dans <script> #${i + 1} de index.html : ${e.message}`); }
});

writeNorm(idxPath, idx, idxFile.eol);
console.log(`✓ site/index.html mis à jour et vérifié (${scripts.length} blocs <script> valides).`);

// 10. Bump cache (_worker.js + sw.js)
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
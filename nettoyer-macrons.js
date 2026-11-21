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

const MAP = {
  // Macrons (barres au-dessus des voyelles)
  'ā': 'a', 'Ā': 'A',
  'ī': 'i', 'Ī': 'I',
  'ū': 'u', 'Ū': 'U',
  'ē': 'e', 'Ē': 'E',
  'ō': 'o', 'Ō': 'O',
  // Points souscrits de translittération savante (si présents)
  'ḥ': 'h', 'Ḥ': 'H',
  'ṣ': 's', 'Ṣ': 'S',
  'ḍ': 'd', 'Ḍ': 'D',
  'ṭ': 't', 'Ṭ': 'T',
  'ẓ': 'z', 'Ẓ': 'Z',
  // Formes combinantes Unicode (macron combinant / point souscrit combinant)
  '\u0304': '',
  '\u0323': ''
};

const RE_DIACRIT = /[āĀīĪūŪēĒōŌḥḤṣṢḍḌṭṬẓẒ\u0304\u0323]/g;
const EXTS = new Set(['.html', '.js', '.json', '.css', '.txt']);
const siteDir = path.join(__dirname, 'site');

let fichiersModifies = [];
let totalRemplacements = 0;
const exemples = new Set();

function parcourir(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === '.git') continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      parcourir(full);
      continue;
    }
    const ext = path.extname(ent.name).toLowerCase();
    if (!EXTS.has(ext)) continue;

    const orig = fs.readFileSync(full, 'utf8');
    if (!RE_DIACRIT.test(orig)) continue;
    RE_DIACRIT.lastIndex = 0;

    // Collecter quelques exemples avant/après
    if (exemples.size < 12) {
      const mots = orig.match(/[A-Za-zÀ-ÿāĀīĪūŪēĒōŌḥḤṣṢḍḌṭṬẓẒ'‘-]+/g) || [];
      for (const m of mots) {
        if (RE_DIACRIT.test(m)) {
          RE_DIACRIT.lastIndex = 0;
          exemples.add(`${m} -> ${m.replace(RE_DIACRIT, c => MAP[c] ?? c)}`);
          if (exemples.size >= 12) break;
        }
      }
    }

    let count = 0;
    const clean = orig.replace(RE_DIACRIT, c => {
      count++;
      return MAP[c] ?? c;
    });

    if (clean === orig) continue;

    // Validation syntaxique avant écriture
    if (ext === '.json') {
      const obj = JSON.parse(clean);
      if (ent.name === 'lexique-wbw-fr.json' && typeof obj.version === 'number') {
        obj.version += 1;
        writeSafe(full, JSON.stringify(obj));
      } else {
        writeSafe(full, clean);
      }
    } else if (ext === '.js') {
      if (!/export /.test(clean)) new vm.Script(clean, { filename: full });
      writeSafe(full, clean);
    } else {
      writeSafe(full, clean);
    }

    totalRemplacements += count;
    fichiersModifies.push({ rel: path.relative(__dirname, full), count });
  }
}

parcourir(siteDir);

// Bump cache (_worker.js + sw.js) si au moins un fichier a changé
if (fichiersModifies.length > 0) {
  const workerPath = path.join(siteDir, '_worker.js');
  const swPath = path.join(siteDir, 'sw.js');

  const rawW = fs.readFileSync(workerPath, 'utf8');
  const eolW = rawW.includes('\r\n') ? '\r\n' : '\n';
  let w = rawW.replace(/\r\n/g, '\n');
  const tag = String(Date.now());
  w = w.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
  w = w.replace(/htmlPropre\.replace\(\/v=1795050050086\/g,\s*"v=\d+"\)/, `htmlPropre.replace(/v=1795050050086/g, "v=${tag}")`);
  writeSafe(workerPath, eolW === '\r\n' ? w.replace(/\n/g, '\r\n') : w);

  let sw = fs.readFileSync(swPath, 'utf8');
  sw = sw.replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
  writeSafe(swPath, sw);
}

console.log(`✓ ${totalRemplacements} barres/diacritiques supprimés dans ${fichiersModifies.length} fichier(s).`);
fichiersModifies.slice(0, 25).forEach(f => console.log(`  - ${f.rel} (${f.count})`));
if (fichiersModifies.length > 25) console.log(`  ... et ${fichiersModifies.length - 25} autres fichiers.`);
if (exemples.size) {
  console.log('Exemples :');
  exemples.forEach(e => console.log('  ' + e));
}
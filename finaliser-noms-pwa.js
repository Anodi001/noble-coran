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

const dossierSite = path.join(__dirname, 'site');
const indexPath = path.join(dossierSite, 'index.html');
const manifestPath = path.join(dossierSite, 'manifest.json');
const swPath = path.join(dossierSite, 'sw.js');
const sitemapPath = path.join(dossierSite, 'sitemap.xml');

async function recuperer114Noms(lang) {
  const url = `https://api.quran.com/api/v4/chapters?language=${lang}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erreur API Quran.com (${lang}) : HTTP ${res.status}`);
  const data = await res.json();
  const chapters = data.chapters || [];
  if (chapters.length !== 114) throw new Error(`Nombre de sourates inattendu (${lang}) : ${chapters.length}`);
  const map = {};
  for (const ch of chapters) {
    const simple = String(ch.name_simple || '').trim();
    const trad = String((ch.translated_name && ch.translated_name.name) || '').trim();
    map[ch.id] = trad && trad.toLowerCase() !== simple.toLowerCase()
      ? `${simple} (${trad})`
      : simple;
  }
  return map;
}

function extraireBlocObjet(code, declRegex) {
  const m = declRegex.exec(code);
  if (!m) return null;
  const startDecl = m.index;
  const startBrace = code.indexOf('{', startDecl);
  if (startBrace === -1) return null;
  let depth = 0, inStr = null, esc = false;
  for (let i = startBrace; i < code.length; i++) {
    const c = code[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        let end = i + 1;
        if (code[end] === ';') end++;
        return { startDecl, startBrace, end, objText: code.slice(startBrace, i + 1) };
      }
    }
  }
  return null;
}

(async () => {
  // 1. Récupérer les 114 noms officiels IT, ID, RU depuis Quran.com
  console.log('Téléchargement des 114 noms de sourates (IT, ID, RU) depuis api.quran.com...');
  const [nomsIt, nomsId, nomsRu] = await Promise.all([
    recuperer114Noms('it'),
    recuperer114Noms('id'),
    recuperer114Noms('ru')
  ]);
  console.log('✓ 114 sourates récupérées pour IT, ID et RU.');

  // 2. Mettre à jour NOMS_114_ACCUEIL dans site/index.html
  let idx = fs.readFileSync(indexPath, 'utf8');
  const bloc = extraireBlocObjet(idx, /var\s+NOMS_114_ACCUEIL\s*=\s*\{/);
  if (!bloc) {
    throw new Error('Objet NOMS_114_ACCUEIL introuvable dans site/index.html');
  }

  const sb = {};
  vm.runInNewContext(`res = ${bloc.objText}`, sb);
  const nomsActuels = sb.res || {};

  // Conserver DE tel quel (déjà complet), remplacer IT / ID / RU par les 114 complets
  nomsActuels.it = Object.assign({}, nomsIt, nomsActuels.it && Object.keys(nomsActuels.it).length === 114 ? nomsActuels.it : nomsIt);
  nomsActuels.id = nomsId;
  nomsActuels.ru = nomsRu;

  const nvDecl = `var NOMS_114_ACCUEIL = ${JSON.stringify(nomsActuels, null, 2)};`;
  new vm.Script(nvDecl, { filename: 'NOMS_114_ACCUEIL' }); // validation syntaxique
  idx = idx.slice(0, bloc.startDecl) + nvDecl + idx.slice(bloc.end);
  console.log(`✓ NOMS_114_ACCUEIL mis à jour -> DE:${Object.keys(nomsActuels.de || {}).length} | IT:${Object.keys(nomsActuels.it).length} | ID:${Object.keys(nomsActuels.id).length} | RU:${Object.keys(nomsActuels.ru).length}`);

  // 3. Enregistrer le Service Worker /sw.js dans site/index.html
  if (!idx.includes("serviceWorker.register('/sw.js')")) {
    const swRegScript = `\n<script>if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){});});}</script>\n</body>`;
    idx = idx.replace(/<\/body>/i, swRegScript);
    console.log('✓ Enregistrement de /sw.js ajouté dans site/index.html.');
  }
  writeSafe(indexPath, idx);

  // 4. Créer site/sw.js (PWA Network-First léger, compatible Cloudflare SSR)
  const swCode = `/* Service Worker Coran Tafsir — PWA Network-First */
const CACHE_NAME = 'coran-tafsir-pwa-v1';
const SHELL_URLS = [
  '/',
  '/manifest.json',
  '/assets/verset.css',
  '/assets/verset.js',
  '/asbab-nuzul.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_URLS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;

  event.respondWith(
    fetch(event.request)
      .then((resp) => {
        if (resp && resp.status === 200 && resp.type === 'basic') {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => {});
        }
        return resp;
      })
      .catch(() => caches.match(event.request))
  );
});
`;
  new vm.Script(swCode, { filename: 'site/sw.js' });
  writeSafe(swPath, swCode);
  console.log('✓ site/sw.js créé et validé (0 erreur).');

  // 5. Mettre à jour site/manifest.json (8 langues)
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.description = 'Le Noble Coran & Tafsīr Al-Mukhtasar (FR / EN / ES / AR / DE / IT / ID / RU)';
  writeSafe(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log('✓ site/manifest.json mis à jour (8 langues).');

  // 6. Mettre à jour lastmod dans site/sitemap.xml
  if (fs.existsSync(sitemapPath)) {
    const sm = fs.readFileSync(sitemapPath, 'utf8').replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, '<lastmod>2026-11-19</lastmod>');
    writeSafe(sitemapPath, sm);
    console.log('✓ site/sitemap.xml : lastmod mis à jour (2026-11-19).');
  }

  console.log('\n🎉 Terminé : 114 noms de sourates (IT/ID/RU), PWA (sw.js + manifest.json) et sitemap.xml prêts !');
})().catch((err) => {
  console.error('❌ ERREUR :', err.message);
  process.exit(1);
});
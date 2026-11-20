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

const siteDir = path.join(__dirname, 'site');
const workerPath = path.join(siteDir, '_worker.js');
const headersPath = path.join(siteDir, '_headers');
const swPath = path.join(siteDir, 'sw.js');

// Nouveau tag unique basé sur la date/heure actuelle (pour casser l'ancien cache 1 mois)
const ASSET_VER = String(Date.now());

// ============================================================================
// 1. site/_worker.js : Cache 0 délai + réécriture auto de ?v= sur tout le HTML
// ============================================================================
let w = fs.readFileSync(workerPath, 'utf8');

// Incrémenter SSR_VERSION pour purger automatiquement le cache SSR des 7 autres langues
w = w.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);

// Remplacer securiserReponse (compatible que tu aies déjà lancé le script précédent ou non)
const reSecu = /(?:async\s+)?function securiserReponse\([^)]*\)\s*\{[\s\S]*?\n\}/;
const nouvelleSecu = `async function securiserReponse(response, pathname) {
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", CSP_COMPATIBLE);
  headers.set("Strict-Transport-Security", "max-age=31536000");
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), autoplay=(self)");

  const p = String(pathname || "").toLowerCase();
  const ct = (headers.get("content-type") || "").toLowerCase();
  const estRessourceDynamique =
    ct.includes("text/html") ||
    p === "/sw.js" ||
    p.endsWith(".js") ||
    p.endsWith(".css") ||
    p.endsWith(".json") ||
    p === "/manifest.json";

  if (estRessourceDynamique && !p.startsWith("/api/")) {
    headers.set("Cache-Control", "no-cache, must-revalidate");
    headers.set("Cloudflare-CDN-Cache-Control", "no-store");
    headers.set("CDN-Cache-Control", "no-store");
  }

  // Cache-busting automatique sur le HTML pour casser l'ancien cache 1 mois des anciens visiteurs
  if (ct.includes("text/html") && response.status === 200) {
    const html = await response.text();
    const htmlFrais = html.replace(/v=1795050050086/g, "v=${ASSET_VER}");
    headers.delete("content-length");
    return new Response(htmlFrais, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}`;

if (!reSecu.test(w)) {
  console.error('❌ Bloc securiserReponse introuvable dans site/_worker.js');
  process.exit(1);
}
w = w.replace(reSecu, nouvelleSecu);

w = w.replace(
  /return\s+(?:await\s+)?securiserReponse\(await application\.fetch\(request, env, ctx\)[^;]*;/,
  'return await securiserReponse(await application.fetch(request, env, ctx), new URL(request.url).pathname);'
);

writeSafe(workerPath, w);
console.log(`✓ site/_worker.js : cache 0 délai + nouveau tag assets ?v=${ASSET_VER}.`);

// ============================================================================
// 2. site/_headers : Zéro cache figé sur HTML / JS / CSS / JSON / sw.js
// ============================================================================
const contenuHeaders = `/*
  Cache-Control: no-cache, must-revalidate
  Cloudflare-CDN-Cache-Control: no-store
  CDN-Cache-Control: no-store

/assets/*
  Cache-Control: no-cache, must-revalidate
  Cloudflare-CDN-Cache-Control: no-store
  CDN-Cache-Control: no-store

/sw.js
  Cache-Control: no-cache, no-store, must-revalidate
  Cloudflare-CDN-Cache-Control: no-store
`;
writeSafe(headersPath, contenuHeaders);
console.log('✓ site/_headers mis à jour.');

// ============================================================================
// 3. site/sw.js : Force le téléchargement frais (cache: 'reload') + purge auto
// ============================================================================
const swNouveau = `/* Service Worker Coran Tafsir — Revalidation immédiate à chaque visite */
const CACHE_NAME = 'coran-tafsir-pwa-v${ASSET_VER.slice(-6)}';

self.addEventListener('install', (event) => {
  self.skipWaiting();
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

  // Toujours contourner l'ancien cache disque HTTP du navigateur pour avoir la dernière version
  event.respondWith(
    fetch(new Request(event.request.url, { cache: 'reload', credentials: 'same-origin' }))
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
new vm.Script(swNouveau, { filename: 'site/sw.js' });
writeSafe(swPath, swNouveau);
console.log('✓ site/sw.js : revalidation forcée (cache: reload) + purge automatique des anciens caches.');
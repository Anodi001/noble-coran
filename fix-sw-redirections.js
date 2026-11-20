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

const swPath = path.join(__dirname, 'site', 'sw.js');
const ver = String(Date.now()).slice(-6);

const swPropre = `/* Service Worker Coran Tafsir — Navigations & redirections natives + assets toujours frais */
const CACHE_NAME = 'coran-tafsir-pwa-v${ver}';

self.addEventListener('install', () => {
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

  // Ne jamais intercepter les navigations HTML pour laisser les redirections 301/308 (.html -> URL propre) fonctionner nativement
  if (event.request.mode === 'navigate' || event.request.destination === 'document') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;

  event.respondWith(
    fetch(new Request(event.request.url, { cache: 'reload', credentials: 'same-origin' }))
      .then((resp) => {
        if (resp && resp.status === 200 && resp.type === 'basic' && !resp.redirected) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => {});
        }
        return resp;
      })
      .catch(() => caches.match(event.request))
  );
});
`;

new vm.Script(swPropre, { filename: 'site/sw.js' });
writeSafe(swPath, swPropre);
console.log(`✓ site/sw.js corrigé (v${ver}) : navigations & redirections .html laissées au navigateur.`);
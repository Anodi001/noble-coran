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

const siteDir = path.join(__dirname, 'site');
const workerPath = path.join(siteDir, '_worker.js');
const headersPath = path.join(siteDir, '_headers');

// 1. Mettre à jour site/_worker.js :
//    - Auto-invalidation du cache SSR (SSR_VERSION incrémenté)
//    - Revalidation immédiate navigateur + pas de vieux cache CDN Cloudflare sur HTML/JS/CSS/JSON
let w = fs.readFileSync(workerPath, 'utf8');

// Incrémenter SSR_VERSION (v128 -> v129) pour purger le cache SSR des 7 autres langues
w = w.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);

// Remplacer securiserReponse pour forcer la fraîcheur immédiate sur HTML, JS, CSS, JSON et sw.js
const reSecu = /function securiserReponse\(response\)\s*\{[\s\S]*?\n\}/;
const nouvelleSecu = `function securiserReponse(response, pathname) {
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
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    headers.set("Cloudflare-CDN-Cache-Control", "no-store");
    headers.set("CDN-Cache-Control", "no-store");
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
  'return securiserReponse(await application.fetch(request, env, ctx));',
  'return securiserReponse(await application.fetch(request, env, ctx), new URL(request.url).pathname);'
);

writeSafe(workerPath, w);
console.log('✓ site/_worker.js mis à jour (SSR_VERSION incrémenté + revalidation immédiate 0 délai).');

// 2. Harmoniser site/_headers pour éviter qu'un vieux max-age ne bloque les assets/HTML
const contenuHeaders = `/*
  Cache-Control: public, max-age=0, must-revalidate
  Cloudflare-CDN-Cache-Control: no-store
  CDN-Cache-Control: no-store

/assets/*
  Cache-Control: public, max-age=0, must-revalidate
  Cloudflare-CDN-Cache-Control: no-store
  CDN-Cache-Control: no-store

/sw.js
  Cache-Control: no-cache, no-store, must-revalidate
  Cloudflare-CDN-Cache-Control: no-store
`;
writeSafe(headersPath, contenuHeaders);
console.log('✓ site/_headers harmonisé pour mises à jour instantanées.');
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
const workerPath = path.join(dossierSite, '_worker.js');
const versetJsPath = path.join(dossierSite, 'assets', 'verset.js');

if (!fs.existsSync(workerPath)) { console.error('Introuvable :', workerPath); process.exit(1); }
if (!fs.existsSync(versetJsPath)) { console.error('Introuvable :', versetJsPath); process.exit(1); }

// ============================================================================
// 1. PATCH DE site/_worker.js (QuranEnc officiel + endpoint /api/tafsir + v112)
// ============================================================================
let worker = fs.readFileSync(workerPath, 'utf8');
writeSafe(workerPath + '.bak', worker);

if (!worker.includes('QURANENC_TAFSIR_KEYS')) {
  worker = worker.replace(
    /const QURAN_API_IDS = \{[^}]+\};/,
    `$&\n\nconst QURANENC_TAFSIR_KEYS = {\n  en: "english_mokhtasar",\n  es: "spanish_mokhtasar",\n  ar: "arabic_mokhtasar",\n  it: "italian_mokhtasar",\n  id: "indonesian_mokhtasar",\n  ru: "russian_mokhtasar"\n};\n\nfunction nettoyerTafsirQuranEnc(raw) {\n  if (!raw) return "";\n  return escapeHtmlText(\n    String(raw)\n      .replace(/^\\s*\\d+\\s*[\\)\\.\\-]\\s*/, "")\n      .replace(/\\[\\d+\\]/g, "")\n      .replace(/\\x60/g, "’")\n      .replace(/\\s{2,}/g, " ")\n      .trim()\n  );\n}\n\nasync function obtenirTafsirOfficielQuranEnc(sNum, vNum, lang) {\n  const key = QURANENC_TAFSIR_KEYS[lang];\n  if (!key || !sNum || !vNum) return { ok: false, html: null };\n  const url = "https://quranenc.com/api/v1/translation/aya/" + key + "/" + sNum + "/" + vNum;\n  try {\n    const r = await fetch(url, { headers: BROWSER_HEADERS, signal: AbortSignal.timeout(3000), cf: { cacheTtl: 2592000, cacheEverything: true } });\n    if (!r.ok) return { ok: false, html: null };\n    const d = await r.json();\n    const raw = d && d.result && d.result.translation ? d.result.translation : "";\n    const clean = nettoyerTafsirQuranEnc(raw);\n    if (clean) return { ok: true, html: clean };\n  } catch (e) {}\n  return { ok: false, html: null };\n}`
  );
}

const reObtenirTafsir = /async function obtenirTafsirDepuisCachesDurablesOuTraduire\(innerHtml, sNum, vNum, lang, env, ctx\) \{[\s\S]*?return liveRes;\r?\n\}/;
if (!reObtenirTafsir.test(worker)) {
  console.error('Fonction obtenirTafsirDepuisCachesDurablesOuTraduire introuvable dans _worker.js');
  process.exit(1);
}

worker = worker.replace(reObtenirTafsir, `async function obtenirTafsirDepuisCachesDurablesOuTraduire(innerHtml, sNum, vNum, lang, env, ctx) {
  const vk = sNum + ":" + vNum;
  const cache = typeof caches !== "undefined" && caches.default ? caches.default : null;
  const edgeCacheReq = new Request("https://corantafsir.com/_tafsir_edge_v112/" + sNum + "-" + vNum + "-" + lang);

  if (cache) {
    try {
      const cachedTaf = await cache.match(edgeCacheReq);
      if (cachedTaf) {
        const txt = await cachedTaf.text();
        if (txt && txt.length > 10) return { ok: true, html: txt, diag: "edge-cache-v112" };
      }
    } catch (e) {}
  }

  // 1. Source officielle relue (QuranEnc Al-Mukhtasar : EN, ES, AR, IT, ID, RU)
  if (QURANENC_TAFSIR_KEYS[lang]) {
    const qencRes = await obtenirTafsirOfficielQuranEnc(sNum, vNum, lang);
    if (qencRes.ok && qencRes.html) {
      if (cache) {
        try {
          const respToStore = new Response(qencRes.html, {
            headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=31536000, immutable" }
          });
          if (ctx && ctx.waitUntil) ctx.waitUntil(cache.put(edgeCacheReq, respToStore));
          else await cache.put(edgeCacheReq, respToStore);
        } catch (e) {}
      }
      return { ok: true, html: qencRes.html, diag: "quranenc-official" };
    }
  }

  // 2. Fallback cache statique puis traduction auto (uniquement DE ou panne QuranEnc)
  try {
    if (!MEM_STATIC_TAFSIR_CACHE && env && env.ASSETS && typeof env.ASSETS.fetch === "function") {
      const rStatic = await env.ASSETS.fetch(new Request("https://corantafsir.com/tafsir-cache.json"));
      if (rStatic.ok) MEM_STATIC_TAFSIR_CACHE = await rStatic.json();
    }
    if (MEM_STATIC_TAFSIR_CACHE && MEM_STATIC_TAFSIR_CACHE[vk] && MEM_STATIC_TAFSIR_CACHE[vk][lang]) {
      return { ok: true, html: MEM_STATIC_TAFSIR_CACHE[vk][lang], diag: "static-cache" };
    }
  } catch (e) {}

  const liveRes = await traduireHtmlEnPreservantBalises(innerHtml, lang);
  if (liveRes.ok && liveRes.html && cache) {
    try {
      const respToStore = new Response(liveRes.html, {
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=31536000, immutable" }
      });
      if (ctx && ctx.waitUntil) ctx.waitUntil(cache.put(edgeCacheReq, respToStore));
      else await cache.put(edgeCacheReq, respToStore);
    } catch (e) {}
  }
  return liveRes;
}`);

// Bump SSR_VERSION pour invalider l'ancien cache SSR Google Translate
worker = worker.replace(/const SSR_VERSION = "v\d+";/, 'const SSR_VERSION = "v112";');

// Autoriser quranenc.com dans la CSP
if (!worker.includes('https://quranenc.com')) {
  worker = worker.replace(
    /(connect-src[^"]+https:\/\/api\.quran\.com)/,
    '$1 https://quranenc.com'
  );
}

// Ajouter la route proxy /api/tafsir?lang=xx&s=yy (0 souci CORS, mis en cache 30 jours)
if (!worker.includes('url.pathname === "/api/tafsir"')) {
  worker = worker.replace(
    /const url = new URL\(request\.url\);/,
    `const url = new URL(request.url);
    if (url.pathname === "/api/tafsir") {
      const l = (url.searchParams.get("lang") || "").slice(0, 2).toLowerCase();
      const s = Number(url.searchParams.get("s") || 0);
      const qKey = QURANENC_TAFSIR_KEYS[l];
      if (!qKey || !Number.isInteger(s) || s < 1 || s > 114) {
        return new Response(JSON.stringify({ error: "invalid_params" }), { status: 400, headers: { "content-type": "application/json; charset=utf-8" } });
      }
      try {
        const rQ = await fetch("https://quranenc.com/api/v1/translation/sura/" + qKey + "/" + s, {
          headers: BROWSER_HEADERS,
          signal: AbortSignal.timeout(4500),
          cf: { cacheTtl: 2592000, cacheEverything: true }
        });
        if (!rQ.ok) return new Response(JSON.stringify({ error: "upstream" }), { status: 502, headers: { "content-type": "application/json; charset=utf-8" } });
        const dQ = await rQ.json();
        const map = {};
        if (dQ && Array.isArray(dQ.result)) {
          for (let i = 0; i < dQ.result.length; i++) {
            const it = dQ.result[i];
            if (it && it.aya && it.translation) map[String(it.aya)] = nettoyerTafsirQuranEnc(it.translation);
          }
        }
        return new Response(JSON.stringify(map), {
          headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=2592000" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: "timeout" }), { status: 504, headers: { "content-type": "application/json; charset=utf-8" } });
      }
    }`
  );
}

writeSafe(workerPath, worker);
console.log('✓ site/_worker.js mis à jour (QuranEnc officiel SSR + route /api/tafsir + v112).');

// ============================================================================
// 2. PATCH DE site/assets/verset.js (Tafsir officiel QuranEnc côté client IT/ID/RU)
// ============================================================================
let vjs = fs.readFileSync(versetJsPath, 'utf8');
writeSafe(versetJsPath + '.bak', vjs);

if (!vjs.includes('QURANENC_EXT_KEYS')) {
  const reExtDecl = /var LANGUES_EXT_SUPPORTEES = \{ de: 27, it: 153, id: 33, ru: 45 \};/;
  if (!reExtDecl.test(vjs)) {
    console.error('Anchor LANGUES_EXT_SUPPORTEES introuvable dans site/assets/verset.js');
    process.exit(1);
  }
  vjs = vjs.replace(reExtDecl, `$&
  var QURANENC_EXT_KEYS = { it: "italian_mokhtasar", id: "indonesian_mokhtasar", ru: "russian_mokhtasar" };
  var cacheTafsirQenc = {};
  var reqTafsirQenc = {};
  try {
    var sauvQenc = localStorage.getItem("cache_tafsir_qenc_v112");
    if (sauvQenc) cacheTafsirQenc = JSON.parse(sauvQenc);
  } catch (e) {}

  function nettoyerTafsirQencClient(raw) {
    if (!raw) return "";
    return String(raw)
      .replace(/^\\s*\\d+\\s*[\\)\\.\\-]\\s*/, "")
      .replace(/\\[\\d+\\]/g, "")
      .replace(/\\x60/g, "’")
      .replace(/\\s{2,}/g, " ")
      .trim();
  }

  function chargerTafsirOfficielExt(codeLang, chap) {
    var qKey = QURANENC_EXT_KEYS[codeLang];
    if (!qKey || !chap) return;
    var cle = codeLang + "_" + chap;
    if (cacheTafsirQenc[cle] || reqTafsirQenc[cle]) return;
    reqTafsirQenc[cle] = true;

    var estHttp = (window.location.protocol === "http:" || window.location.protocol === "https:");
    var url = estHttp
      ? ("/api/tafsir?lang=" + encodeURIComponent(codeLang) + "&s=" + encodeURIComponent(chap))
      : ("https://quranenc.com/api/v1/translation/sura/" + qKey + "/" + chap);

    fetch(url)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d) return;
        var map = {};
        if (Array.isArray(d.result)) {
          for (var i = 0; i < d.result.length; i++) {
            var it = d.result[i];
            if (it && it.aya && it.translation) map[String(it.aya)] = nettoyerTafsirQencClient(it.translation);
          }
        } else if (typeof d === "object" && !d.error) {
          map = d;
        }
        if (Object.keys(map).length > 0) {
          cacheTafsirQenc[cle] = map;
          try { localStorage.setItem("cache_tafsir_qenc_v112", JSON.stringify(cacheTafsirQenc)); } catch (e) {}
          if (langExtActive === codeLang) appliquerInterfaceEtContenuExt();
        }
      })
      .catch(function () {})
      .finally(function () { reqTafsirQenc[cle] = false; });
  }`);

  // Restaurer #mainExplanationEl proprement quand on quitte IT/ID/RU vers une autre langue
  const reRestore = /function restaurerTextesOriginauxDepuisExt\(\) \{\r?\n/;
  if (!reRestore.test(vjs)) {
    console.error('Anchor restaurerTextesOriginauxDepuisExt introuvable dans site/assets/verset.js');
    process.exit(1);
  }
  vjs = vjs.replace(reRestore, `$&    var mExplRest = document.getElementById("mainExplanationEl");
    if (mExplRest && mExplRest.hasAttribute("data-qenc-official")) {
      mExplRest.removeAttribute("data-qenc-official");
      if (typeof appliquerLangueVerset === "function") appliquerLangueVerset();
    }
`);

  // Injecter le tafsir officiel QuranEnc dans #mainExplanationEl pour IT / ID / RU
  const reChapCall = /if \(numS && !cacheChapitresExt\[cleChap\]\) \{\r?\n\s*chargerChapitreOfficielExt\(codeL, numS\);\r?\n\s*\}/;
  if (!reChapCall.test(vjs)) {
    console.error('Anchor chargerChapitreOfficielExt introuvable dans site/assets/verset.js');
    process.exit(1);
  }
  vjs = vjs.replace(reChapCall, `$&
    if (numS && numV && QURANENC_EXT_KEYS[codeL]) {
      var cleTafQ = codeL + "_" + numS;
      if (!cacheTafsirQenc[cleTafQ]) {
        chargerTafsirOfficielExt(codeL, numS);
      } else {
        var tafOff = cacheTafsirQenc[cleTafQ][String(numV)];
        var mExplQ = document.getElementById("mainExplanationEl");
        if (tafOff && mExplQ) {
          mExplQ.setAttribute("data-qenc-official", codeL);
          if (mExplQ.textContent !== tafOff) mExplQ.textContent = tafOff;
        }
      }
    }`);

  // Empêcher le TreeWalker (Google Translate) de toucher #mainExplanationEl pour IT/ID/RU
  const reSkip = /if \(pEl\.closest\("\.wbw-card-unit"\) \|\| pEl\.id === "wbwSensLectureBanner" \|\| pEl\.closest\("\.notranslate"\) \|\| pEl\.closest\("#khatmPlannerWidgetV77"\)\) continue;/;
  if (!reSkip.test(vjs)) {
    console.error('Anchor TreeWalker skip introuvable dans site/assets/verset.js');
    process.exit(1);
  }
  vjs = vjs.replace(
    reSkip,
    'if (pEl.closest(".wbw-card-unit") || pEl.id === "wbwSensLectureBanner" || pEl.closest(".notranslate") || pEl.closest("#khatmPlannerWidgetV77") || (QURANENC_EXT_KEYS[codeL] && pEl.closest("#mainExplanationEl"))) continue;'
  );
}

// Vérification syntaxique stricte de site/assets/verset.js
try {
  new vm.Script(vjs, { filename: 'site/assets/verset.js' });
} catch (err) {
  console.error('ERREUR DE SYNTAXE dans site/assets/verset.js (non écrit) :\n', err.message);
  process.exit(1);
}

writeSafe(versetJsPath, vjs);
console.log('✓ site/assets/verset.js mis à jour et validé (0 erreur).');

// ============================================================================
// 3. CACHE-BUSTING ?v=... DANS LES 6 236 PAGES HTML
// ============================================================================
const ts = Date.now();
const htmlFiles = fs.readdirSync(dossierSite).filter(f => /^sourate-\d+-verset-\d+\.html$/i.test(f));
let nbHtml = 0;
for (const f of htmlFiles) {
  const fp = path.join(dossierSite, f);
  const h = fs.readFileSync(fp, 'utf8');
  const h2 = h.replace(/assets\/verset\.js(?:\?v=\d+)?/g, 'assets/verset.js?v=' + ts);
  if (h2 !== h) {
    writeSafe(fp, h2);
    nbHtml++;
  }
}
console.log(`✅ Cache-busting verset.js?v=${ts} appliqué sur ${nbHtml} pages HTML.`);
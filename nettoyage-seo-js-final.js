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
const indexPath = path.join(siteDir, 'index.html');
const versetJsPath = path.join(siteDir, 'assets', 'verset.js');
const workerPath = path.join(siteDir, '_worker.js');
const swPath = path.join(siteDir, 'sw.js');

// ============================================================================
// 1. SITE/INDEX.HTML : URLs propres sur les 114 cartes, recherche, reprendre, footer
// ============================================================================
const rawIdx = fs.readFileSync(indexPath, 'utf8');
const eolIdx = rawIdx.includes('\r\n') ? '\r\n' : '\n';
let idx = rawIdx.replace(/\r\n/g, '\n');

const rempIndex = [
  [
    'btnR.href = "sourate-" + lastReadData.s + "-verset-" + lastReadData.v + ".html?v=" + V_STAMP;',
    'btnR.href = "/sourate-" + lastReadData.s + "-verset-" + lastReadData.v;'
  ],
  [
    'directHTML = \'<a href="sourate-\' + ns + \'-verset-\' + nv + \'.html?v=\' + V_STAMP + \'" class="card miracle-card-glow">',
    'directHTML = \'<a href="/sourate-\' + ns + \'-verset-\' + nv + \'" class="card miracle-card-glow">'
  ],
  [
    'return \'<a href="sourate-\' + s.id + \'-verset-\' + vCible + \'.html?v=\' + V_STAMP + \'" class="\'',
    'return \'<a href="/sourate-\' + s.id + \'-verset-\' + vCible + \'" class="\''
  ],
  [
    'href="a-propos.html?lang=',
    'href="/a-propos?lang='
  ],
  [
    'href="contact.html?lang=',
    'href="/contact?lang='
  ]
];

let nbIdx = 0;
for (const [avant, apres] of rempIndex) {
  if (idx.includes(avant)) {
    idx = idx.split(avant).join(apres);
    nbIdx++;
  }
}
writeSafe(indexPath, eolIdx === '\r\n' ? idx.replace(/\n/g, '\r\n') : idx);
console.log(`✓ site/index.html : ${nbIdx}/${rempIndex.length} blocs JS nettoyés (0 .html, 0 ?v= sur les cartes).`);

// ============================================================================
// 2. SITE/ASSETS/VERSET.JS : Sélecteur, history.pushState, prev/next & SPA instantanée
// ============================================================================
const rawV = fs.readFileSync(versetJsPath, 'utf8');
const eolV = rawV.includes('\r\n') ? '\r\n' : '\n';
let v = rawV.replace(/\r\n/g, '\n');

const rempVerset = [
  [
    'html += \'<option value="sourate-\' + S.numSourate + \'-verset-\' + i + \'.html"\' +',
    'html += \'<option value="/sourate-\' + S.numSourate + \'-verset-\' + i + \'"\' +'
  ],
  [
    'if (!window.SOURATE_DATA || !window.SOURATE_DATA.versets[n - 1]) { window.location.href = "sourate-" + numSourateActuelle + "-verset-" + n + ".html"; return; }',
    'const _mLp = (window.location.pathname || "").match(/^\\/(en|es|ar|de|it|id|ru)\\//i); const _prefU = _mLp ? ("/" + _mLp[1].toLowerCase() + "/") : "/";\n    if (!window.SOURATE_DATA || !window.SOURATE_DATA.versets[n - 1]) { window.location.href = _prefU + "sourate-" + numSourateActuelle + "-verset-" + n; return; }'
  ],
  [
    'if (jEl) jEl.value = "sourate-" + numSourateActuelle + "-verset-" + n + ".html";',
    'if (jEl) jEl.value = "/sourate-" + numSourateActuelle + "-verset-" + n;'
  ],
  [
    "document.getElementById('prevVerseLink').setAttribute('href', vD.lienPrecedent);\n    document.getElementById('nextVerseLink').setAttribute('href', vD.lienSuivant);",
    "const _cleanU = u => String(u || '').replace(/^\\/?(sourate-\\d+-verset-\\d+)\\.html/i, _prefU + '$1').replace(/^\\/?index\\.html/i, _prefU);\n    document.getElementById('prevVerseLink').setAttribute('href', _cleanU(vD.lienPrecedent));\n    document.getElementById('nextVerseLink').setAttribute('href', _cleanU(vD.lienSuivant));"
  ],
  [
    'try { history.pushState({ verset: n }, \'\', "sourate-" + numSourateActuelle + "-verset-" + n + ".html"); } catch(e){}',
    'try { history.pushState({ verset: n }, \'\', _prefU + "sourate-" + numSourateActuelle + "-verset-" + n + (window.location.search || "")); } catch(e){}'
  ],
  [
    "const m = String(lien).split('?')[0].match(/^sourate-(\\d+)-verset-(\\d+)\\.html$/);",
    "const m = String(lien).split('?')[0].match(/^(?:\\/(?:en|es|ar|de|it|id|ru))?\\/?sourate-(\\d+)-verset-(\\d+)(?:\\.html)?$/i);"
  ],
  [
    'if (auto) { window.location.href = String(lien).split(\'?\')[0] + "?autoplay=1"; return false; }',
    'if (auto) { window.location.href = String(lien).split(\'?\')[0].replace(/\\.html$/i, "") + "?autoplay=1"; return false; }'
  ],
  [
    'href="a-propos.html?lang=',
    'href="/a-propos?lang='
  ],
  [
    'href="contact.html?lang=',
    'href="/contact?lang='
  ]
];

let nbV = 0;
for (const [avant, apres] of rempVerset) {
  if (v.includes(avant)) {
    v = v.split(avant).join(apres);
    nbV++;
  }
}

new vm.Script(v, { filename: 'site/assets/verset.js' });
writeSafe(versetJsPath, eolV === '\r\n' ? v.replace(/\n/g, '\r\n') : v);
console.log(`✓ site/assets/verset.js : ${nbV}/${rempVerset.length} blocs JS nettoyés et validés.`);

// ============================================================================
// 3. SITE/_WORKER.JS & SITE/SW.JS : Cache-busting auto + nettoyage a-propos/contact
// ============================================================================
const rawW = fs.readFileSync(workerPath, 'utf8');
const eolW = rawW.includes('\r\n') ? '\r\n' : '\n';
let w = rawW.replace(/\r\n/g, '\n');

const nouveauTag = String(Date.now());
w = w.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
w = w.replace(/htmlPropre\.replace\(\/v=1795050050086\/g,\s*"v=\d+"\)/, `htmlPropre.replace(/v=1795050050086/g, "v=${nouveauTag}")`);
if (!w.includes('a-propos|contact')) {
  w = w.replace(
    ".replace(/href=([\"'])\\/?index\\.html(\\?[^\"']*)?\\1/gi, (_, q, qs) => 'href=' + q + '/' + (qs || '') + q)",
    ".replace(/href=([\"'])\\/?index\\.html(\\?[^\"']*)?\\1/gi, (_, q, qs) => 'href=' + q + '/' + (qs || '') + q)\n        .replace(/href=([\"'])\\/?(a-propos|contact)\\.html(\\?[^\"']*)?\\1/gi, (_, q, pg, qs) => 'href=' + q + '/' + pg + (qs || '') + q)"
  );
}
writeSafe(workerPath, eolW === '\r\n' ? w.replace(/\n/g, '\r\n') : w);

let sw = fs.readFileSync(swPath, 'utf8');
sw = sw.replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
writeSafe(swPath, sw);
console.log(`✓ site/_worker.js (?v=${nouveauTag}) et site/sw.js mis à jour.`);

// Vérification finale 0 .html résiduel
const restIdx = (idx.match(/\.html\b/gi) || []).length;
const restV = (v.match(/\.html\b/gi) || []).length;
console.log(`→ Contrôle final : mentions .html restantes -> index.html: ${restIdx} | verset.js: ${restV}`);
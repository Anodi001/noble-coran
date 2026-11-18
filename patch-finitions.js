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
const indexPath = path.join(dossierSite, 'index.html');

// 1. Corriger le double échappement &#39; dans site/_worker.js (/api/tafsir)
let worker = fs.readFileSync(workerPath, 'utf8');
const reNettoyer = /function nettoyerTafsirQuranEnc\(raw\) \{[\s\S]*?\n\}/;
if (reNettoyer.test(worker) && !worker.includes('nettoyerTafsirQuranEncTexte')) {
  worker = worker.replace(reNettoyer, `function nettoyerTafsirQuranEncTexte(raw) {
  if (!raw) return "";
  return String(raw)
    .replace(/^\\s*\\d+\\s*[\\)\\.\\-]\\s*/, "")
    .replace(/\\[\\d+\\]/g, "")
    .replace(/\\x60/g, "’")
    .replace(/\\s{2,}/g, " ")
    .trim();
}

function nettoyerTafsirQuranEnc(raw) {
  return escapeHtmlText(nettoyerTafsirQuranEncTexte(raw));
}`);
  worker = worker.replace(
    /map\[String\(it\.aya\)\] = nettoyerTafsirQuranEnc\(it\.translation\);/,
    'map[String(it.aya)] = nettoyerTafsirQuranEncTexte(it.translation);'
  );
  writeSafe(workerPath, worker);
  console.log('✓ site/_worker.js : double échappement &#39; corrigé dans /api/tafsir.');
}

// 2. Corriger site/assets/verset.js (cache v113, bouton Rentang & Ulangi, libellés FR)
let vjs = fs.readFileSync(versetJsPath, 'utf8');

// 2a. Bypasser l'ancien cache /api/tafsir + décoder défensivement les entités HTML
vjs = vjs.replace(/cache_tafsir_qenc_v112/g, 'cache_tafsir_qenc_v113');
vjs = vjs.replace(
  /\/api\/tafsir\?lang=" \+ encodeURIComponent\(codeLang\) \+ "&s=" \+ encodeURIComponent\(chap\)/,
  '/api/tafsir?lang=" + encodeURIComponent(codeLang) + "&s=" + encodeURIComponent(chap) + "&v=2"'
);
vjs = vjs.replace(
  /if \(tafOff && mExplQ\) \{\s*mExplQ\.setAttribute\("data-qenc-official", codeL\);\s*if \(mExplQ\.textContent !== tafOff\) mExplQ\.textContent = tafOff;\s*\}/,
  `if (tafOff && mExplQ) {
          var tafPropre = String(tafOff).replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
          mExplQ.setAttribute("data-qenc-official", codeL);
          if (mExplQ.textContent !== tafPropre) mExplQ.textContent = tafPropre;
        }`
);

// 2b. Relier synchroniserTout() -> verifierChangementVersetEtPause() pour mettre à jour le bouton Plage & Répétition
if (!vjs.includes('window.__verifierV110 = verifierChangementVersetEtPause;')) {
  vjs = vjs.replace(
    /function verifierChangementVersetEtPause\(\) \{/,
    'function verifierChangementVersetEtPause() {'
  );
  vjs = vjs.replace(
    /if \(document\.readyState === 'loading'\) document\.addEventListener\('DOMContentLoaded', verifierChangementVersetEtPause\);/,
    "window.__verifierV110 = verifierChangementVersetEtPause;\n  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', verifierChangementVersetEtPause);"
  );
  vjs = vjs.replace(
    /synchroniserUrlEtSeoAvecLangueEtVerset\(\);/,
    'synchroniserUrlEtSeoAvecLangueEtVerset();\n      if (typeof window.__verifierV110 === "function") window.__verifierV110();'
  );
}

// 2c. Traduire "5e Sourate révélée (n°1)" et "Sourate Mecquoise (La Mecque)" dans DE/IT/ID/RU
if (!vjs.includes('traduireLieuEtOrdreExt')) {
  vjs = vjs.replace(
    /var parts = txt\.split\("•"\);\s*if \(parts\.length >= 2\) \{\s*var lieu = parts\[0\]\.trim\(\);\s*var nv = lieu \+ " • " \+ textesHaut\[lang\];\s*if \(el\.textContent !== nv\) el\.textContent = nv;\s*\}/,
    `var parts = txt.split("•");
        if (parts.length >= 2) {
          var lieu = parts[0].trim();
          var estMecLieu = /mecqu|mecc|makk|мекк|مكية/i.test(lieu);
          var mapLieu = {
            fr: estMecLieu ? "Sourate Mecquoise (La Mecque)" : "Sourate Médinoise (Médine)",
            en: estMecLieu ? "Meccan Surah (Makkah)" : "Medinan Surah (Madinah)",
            es: estMecLieu ? "Sura Mequí (La Meca)" : "Sura Medinense (Medina)",
            ar: estMecLieu ? "سورة مكية (مكة المكرمة)" : "سورة مدنية (المدينة المنورة)",
            de: estMecLieu ? "Mekkanische Sure (Mekka)" : "Medinensische Sure (Medina)",
            it: estMecLieu ? "Sura Meccana (La Mecca)" : "Sura Medinese (Medina)",
            id: estMecLieu ? "Surah Makkiyah (Mekkah)" : "Surah Madaniyah (Madinah)",
            ru: estMecLieu ? "Мекканская сура (Мекка)" : "Мединская сура (Медина)"
          };
          var traduireLieuEtOrdreExt = mapLieu[lang] || lieu;
          var nv = traduireLieuEtOrdreExt + " • " + textesHaut[lang];
          if (el.textContent !== nv) el.textContent = nv;
        }`
  );

  vjs = vjs.replace(
    /var mMirBadge = val\.match\(/,
    `var mRev = val.match(/^(\\d+)e\\s+Sourate\\s+révélée\\s+\\(n°(\\d+)\\)$/i);
      if (mRev) {
        var fmtRev = {
          de: "Offenbarung Nr. " + mRev[1] + " (Sure Nr. " + mRev[2] + ")",
          it: mRev[1] + "ª Sura rivelata (n°" + mRev[2] + ")",
          id: "Wahyu ke-" + mRev[1] + " (Surah ke-" + mRev[2] + ")",
          ru: mRev[1] + "-я по ниспосланию (Сура №" + mRev[2] + ")"
        }[codeL];
        if (fmtRev) { modifierNoeudTexteSeul(node, fmtRev); continue; }
      }
      var mMirBadge = val.match(`
  );
}

try {
  new vm.Script(vjs, { filename: 'site/assets/verset.js' });
  console.log('✓ site/assets/verset.js mis à jour et validé (0 erreur).');
} catch (err) {
  console.error('ERREUR DE SYNTAXE dans verset.js :\n', err.message);
  process.exit(1);
}
writeSafe(versetJsPath, vjs);

// 3. Supprimer le footer doublon FR tout en bas de site/index.html
if (fs.existsSync(indexPath)) {
  let idxHtml = fs.readFileSync(indexPath, 'utf8');
  const reDupFooter = /<div style="text-align:center;margin:25px 0 15px 0;[^"]*"><a href="\/a-propos\.html"[^>]*>À propos<\/a>\s*•\s*<a href="\/contact\.html"[^>]*>Contact<\/a><\/div>\s*/i;
  if (reDupFooter.test(idxHtml)) {
    idxHtml = idxHtml.replace(reDupFooter, '');
    writeSafe(indexPath, idxHtml);
    console.log('✓ site/index.html : footer doublon français supprimé.');
  }
}

// 4. Cache-busting verset.js?v=... sur les 6 236 pages HTML
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
console.log(`✅ Terminé : ${nbHtml} pages HTML mises à jour (verset.js?v=${ts}).`);
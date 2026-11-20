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
const rapportPath = path.join(__dirname, 'rapport-hadiths-restants.json');
const asbabPath = path.join(siteDir, 'asbab-nuzul.json');
const versetJsPath = path.join(siteDir, 'assets', 'verset.js');
const swPath = path.join(siteDir, 'sw.js');

if (!fs.existsSync(rapportPath)) {
  console.error('❌ rapport-hadiths-restants.json introuvable. Lance d’abord : node audit-hadiths-restants.js');
  process.exit(1);
}

const SAHIH_SUNAN = [
  '3:135', '6:121', '7:172', '11:1', '13:12', '17:59', '22:1', '22:39',
  '32:16', '33:35', '34:15', '36:77', '38:1', '40:60', '53:3', '53:4',
  '56:1', '61:1', '65:4', '67:15', '68:44', '70:1', '74:11', '74:19',
  '81:2', '82:1', '103:1'
];

const HASAN_SUNAN = [
  '8:17', '12:1', '16:106', '19:1', '24:61', '43:57', '49:6', '55:1',
  '65:2', '85:2', '85:3'
];

const sleep = ms => new Promise(r => setTimeout(r, ms));
const cacheSourates = {};

function chargerSourate(s) {
  if (!cacheSourates[s]) {
    const sb = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(siteDir, `data-sourate-${s}.js`), 'utf8'), sb);
    cacheSourates[s] = sb.window.SOURATE_DATA;
  }
  return cacheSourates[s];
}

function nettoyerHtml(html) {
  return String(html || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extraireBlocParchemin(html) {
  if (!html || !html.includes('📜')) return '';
  return nettoyerHtml(html.split('📜').slice(1).join(' '));
}

const reCollection = /(Bukh[aā]r[iī]|Muslim|Tirmidh[iī]|D[aā]w[uū]d|Nas[aā]'?[iī]|M[aā]jah|Ahmad|H[aā]kim|Bayhaq[iī]|Muwatta|Muwwatta|Hibb[aā]n|Muttafaq)/i;

function extraireSourceEtTexte(blocFr) {
  const propre = blocFr.replace(/n°4988/g, 'n°3988').replace(/Al-Muwwatta'/g, "Al-Muwatta'");
  let source = '';
  const idxDeuxPoints = propre.indexOf(':');
  const entete = (idxDeuxPoints > 0 && idxDeuxPoints < 230) ? propre.slice(0, idxDeuxPoints) : propre.slice(0, 230);

  const parsEntete = entete.match(/\(([^)]+)\)/g) || [];
  for (const p of parsEntete) {
    if (reCollection.test(p)) {
      source = p.slice(1, -1).replace(/^[—–\-\s]+/, '').trim();
      break;
    }
  }
  if (!source) {
    const parsTout = propre.match(/\(([^)]+)\)/g) || [];
    for (const p of parsTout) {
      if (reCollection.test(p)) {
        source = p.slice(1, -1).replace(/^[—–\-\s]+/, '').trim();
        break;
      }
    }
  }
  if (!source) source = 'Recueils authentiques de la Sunnah';

  let texte = propre;
  if (source && texte.includes(`(${source})`)) {
    texte = texte.replace(`(${source})`, '').replace(/\s+:/g, ' :').replace(/\s{2,}/g, ' ').trim();
  }
  return { source, texte };
}

function detecterType(htmlFr, blocFr) {
  const tout = `${nettoyerHtml(htmlFr).slice(0, 240)} ${blocFr.slice(0, 180)}`;
  return /(cause de révélation|contexte de révélation|sabab|pourquoi|quand et pourquoi|révélé[es]?|descendit|descente)/i.test(tout)
    ? 'sabab'
    : 'hadith';
}

async function traduireGtx(texte, sl, tl) {
  if (!texte) return '';
  for (let essai = 0; essai < 2; essai++) {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(texte)}`;
      const r = await fetch(url);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const j = await r.json();
      if (Array.isArray(j) && Array.isArray(j[0])) {
        const out = j[0].map(seg => (seg && seg[0]) ? seg[0] : '').join('').trim();
        if (out) return out;
      }
    } catch (e) {
      await sleep(500);
    }
  }
  return texte;
}

(async () => {
  // 0. Corriger la coquille Abu Dawud n°4988 -> n°3988 dans data-sourate-34.js
  const s34Path = path.join(siteDir, 'data-sourate-34.js');
  const s34Raw = fs.readFileSync(s34Path, 'utf8');
  if (s34Raw.includes('n°4988')) {
    writeSafe(s34Path, s34Raw.replace(/n°4988/g, 'n°3988'));
    console.log('✓ site/data-sourate-34.js : référence Abū Dāwūd corrigée (n°4988 -> n°3988).');
  }

  // 1. Rassembler la liste exacte des versets à migrer
  const rapport = JSON.parse(fs.readFileSync(rapportPath, 'utf8'));
  const asbab = JSON.parse(fs.readFileSync(asbabPath, 'utf8'));
  if (!asbab.recits) asbab.recits = {};

  const dejaCouverts = new Set();
  for (const [k, r] of Object.entries(asbab.recits)) {
    dejaCouverts.add(k);
    if (r && Array.isArray(r.versets)) r.versets.forEach(v => dejaCouverts.add(v));
  }

  const aMigrer = [];
  const vus = new Set();
  const ajouter = (cle, degre) => {
    if (vus.has(cle) || dejaCouverts.has(cle)) return;
    vus.add(cle);
    aMigrer.push({ cle, degre });
  };

  for (const item of (rapport.listes && rapport.listes.sahihBukhariMuslim) || []) {
    ajouter(item.cle, 'Sahīh');
  }
  for (const cle of SAHIH_SUNAN) ajouter(cle, 'Sahīh');
  for (const cle of HASAN_SUNAN) ajouter(cle, 'Hasan');

  console.log(`→ ${aMigrer.length} versets authentiques à migrer vers site/asbab-nuzul.json...`);

  let ajoutes = 0;
  for (let i = 0; i < aMigrer.length; i++) {
    const { cle, degre } = aMigrer[i];
    const [s, vNum] = cle.split(':').map(Number);
    const dataS = chargerSourate(s);
    const verset = dataS.versets.find(x => x.numVerset === vNum);
    if (!verset) continue;

    const blocFr = extraireBlocParchemin(verset.explicationUnanime);
    if (!blocFr) continue;

    const { source, texte: fr } = extraireSourceEtTexte(blocFr);
    let en = extraireBlocParchemin(verset.explicationEn);
    let es = extraireBlocParchemin(verset.explicationEs);
    let ar = extraireBlocParchemin(verset.explicationAr);

    // Si une langue parmi EN/ES/AR n'avait pas le bloc 📜, on la complète depuis FR
    if (!en) en = await traduireGtx(fr, 'fr', 'en');
    if (!es) es = await traduireGtx(fr, 'fr', 'es');
    if (!ar) ar = await traduireGtx(fr, 'fr', 'ar');

    // Traductions DE / IT / ID / RU en parallèle depuis EN (haute fiabilité)
    const baseSrc = en || fr;
    const baseLang = en ? 'en' : 'fr';
    const [de, it, id, ru] = await Promise.all([
      traduireGtx(baseSrc, baseLang, 'de'),
      traduireGtx(baseSrc, baseLang, 'it'),
      traduireGtx(baseSrc, baseLang, 'id'),
      traduireGtx(baseSrc, baseLang, 'ru')
    ]);

    asbab.recits[cle] = {
      type: detecterType(verset.explicationUnanime, blocFr),
      versets: [cle],
      plage: cle,
      source,
      degre,
      texte: { fr, en, es, ar, de, it, id, ru }
    };
    ajoutes++;

    if ((i + 1) % 10 === 0 || i + 1 === aMigrer.length) {
      console.log(`  [${i + 1}/${aMigrer.length}] ${cle} (${degre}) — ${source.slice(0, 55)}`);
    }
    await sleep(140);
  }

  asbab.version = (Number(asbab.version) || 13) + 1;
  const jsonFinal = JSON.stringify(asbab, null, 2);
  JSON.parse(jsonFinal); // Validation stricte
  writeSafe(asbabPath, jsonFinal);
  console.log(`✓ site/asbab-nuzul.json mis à jour (v${asbab.version}) : +${ajoutes} récits (total = ${Object.keys(asbab.recits).length}).`);

  // 2. Renforcer l'anti-doublon 📜 dans site/assets/verset.js
  let vjs = fs.readFileSync(versetJsPath, 'utf8');
  const ancienAntiDoublon = `if (mExpl && mExpl.innerHTML.indexOf("<br><br>📜") !== -1) {\n      mExpl.innerHTML = mExpl.innerHTML.split("<br><br>📜")[0];\n    }`;
  const nouveauAntiDoublon = `if (mExpl && mExpl.innerHTML.indexOf("📜") !== -1) {\n      mExpl.innerHTML = mExpl.innerHTML.replace(/(?:<br\\s*\\/?>|\\s|<p[^>]*>)*📜[\\s\\S]*$/i, "");\n    }`;
  if (vjs.includes(ancienAntiDoublon)) {
    vjs = vjs.replace(ancienAntiDoublon, nouveauAntiDoublon);
    new vm.Script(vjs, { filename: 'site/assets/verset.js' });
    writeSafe(versetJsPath, vjs);
    console.log('✓ site/assets/verset.js : anti-doublon 📜 renforcé.');
  } else {
    console.log('ℹ️ Anti-doublon 📜 déjà renforcé ou format différent dans site/assets/verset.js.');
  }

  // 3. Corriger site/sw.js (cache: 'no-cache' pour forcer l'actualisation sur iPhone Safari)
  let sw = fs.readFileSync(swPath, 'utf8');
  sw = sw.replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
  if (sw.includes('fetch(event.request)')) {
    sw = sw.replace(
      'fetch(event.request)',
      "fetch(event.request.url, { cache: 'no-cache', credentials: 'same-origin' })"
    );
  }
  new vm.Script(sw, { filename: 'site/sw.js' });
  writeSafe(swPath, sw);
  console.log('✓ site/sw.js : revalidation no-cache activée + version incrémentée.');
})().catch(err => {
  console.error('❌ ERREUR :', err);
  process.exit(1);
});
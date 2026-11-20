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

const sleep = ms => new Promise(r => setTimeout(r, ms));
const siteDir = path.join(__dirname, 'site');
const lexPath = path.join(siteDir, 'lexique-wbw-fr.json');
const swPath = path.join(siteDir, 'sw.js');
const cacheEnPath = path.join(__dirname, 'cache-glosses-en-114.json');

// Même normalisation exacte que dans site/assets/verset.js (l. 4577)
function normaliserCleEnLexique(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/^\(is\)\s*/i, '')
    .replace(/^\(are\)\s*/i, '')
    .replace(/^\(the\)\s+/i, 'the ')
    .replace(/[\[\]\(\)]/g, '')
    .replace(/[.,;:!?"]+$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// Prépare la phrase envoyée au traducteur sans modifier la clé stockée dans lex.en
function preparerPourTraduction(cleEn) {
  return cleEn
    .replace(/\bthou art\b/gi, 'you are')
    .replace(/\bthou hast\b/gi, 'you have')
    .replace(/\bthou\b/gi, 'you')
    .replace(/\bthee\b/gi, 'you')
    .replace(/\bthy\b/gi, 'your')
    .replace(/\bthine\b/gi, 'yours')
    .replace(/\bye\b/gi, 'you')
    .replace(/\bhath\b/gi, 'has')
    .replace(/\bhast\b/gi, 'have')
    .replace(/\bunto\b/gi, 'to')
    .replace(/\bverily\b/gi, 'indeed')
    .replace(/\bour\s+verses\b/gi, 'Our Quranic verses')
    .replace(/\bverses\b/gi, 'Quranic verses')
    .replace(/\bour\s+slave\b/gi, 'Our servant')
    .replace(/\bhis\s+slave\b/gi, 'His servant')
    .replace(/\bslaves\b/gi, 'servants')
    .replace(/\bslave\b/gi, 'servant')
    .replace(/\ba\s+chapter\b/gi, 'a Surah');
}

// Nettoie les formulations trop littérales en français coranique
function nettoyerFrancaisCoranique(fr, cleEn) {
  let s = String(fr || '').replace(/\s+/g, ' ').trim();
  if (!s) return '';
  if (/\ballah\b/i.test(cleEn)) {
    s = s.replace(/\bDieu\b/g, 'Allah').replace(/\bdieu\b/g, 'Allah');
  }
  s = s
    .replace(/\bversets coraniques\b/gi, 'versets')
    .replace(/\bverset coranique\b/gi, 'verset')
    .replace(/\bune sourate\b/gi, 'une sourate')
    .replace(/\bSurah\b/g, 'sourate')
    .replace(/\bprosterné\b/gi, /\bprostrate\b/i.test(cleEn) ? 'prosterne-toi' : 'prosterné')
    .replace(/[.;]+$/g, '')
    .trim();
  return s;
}

async function fetchJsonRetry(url, essais = 4) {
  for (let i = 0; i < essais; i++) {
    try {
      const r = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
        signal: AbortSignal.timeout(12000)
      });
      if (r.status === 429) {
        await sleep(3000 * (i + 1));
        continue;
      }
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return await r.json();
    } catch (e) {
      if (i === essais - 1) throw e;
      await sleep(1000 * (i + 1));
    }
  }
}

async function collecterToutesLesGlosesEn() {
  if (fs.existsSync(cacheEnPath)) {
    const cached = JSON.parse(fs.readFileSync(cacheEnPath, 'utf8'));
    if (Array.isArray(cached) && cached.length > 5000) {
      console.log(`✓ Cache local réutilisé : ${cached.length} gloses anglaises uniques (114 sourates).`);
      return cached;
    }
  }

  console.log('→ Étape 1/2 : Collecte des mots des 114 sourates sur api.quran.com...');
  const setGloses = new Set();

  for (let ch = 1; ch <= 114; ch++) {
    let page = 1;
    while (true) {
      const url = `https://api.quran.com/api/v4/verses/by_chapter/${ch}?language=en&words=true&word_fields=text_uthmani&per_page=50&page=${page}`;
      const data = await fetchJsonRetry(url);
      for (const v of (data.verses || [])) {
        for (const w of (v.words || [])) {
          if (w.char_type_name === 'end') continue;
          const raw = w.translation && w.translation.text ? w.translation.text : '';
          const cle = normaliserCleEnLexique(raw);
          if (cle && /[a-z]/i.test(cle)) setGloses.add(cle);
        }
      }
      if (!data.pagination || !data.pagination.next_page) break;
      page = data.pagination.next_page;
      await sleep(60);
    }
    if (ch % 15 === 0 || ch === 114) {
      console.log(`  Sourate ${ch}/114 scannée (${setGloses.size} gloses uniques trouvées)`);
    }
    await sleep(70);
  }

  const liste = Array.from(setGloses).sort();
  writeSafe(cacheEnPath, JSON.stringify(liste));
  console.log(`✓ Collecte terminée : ${liste.length} gloses uniques sauvegardées dans cache-glosses-en-114.json.`);
  return liste;
}

async function traduireLotExact(clesEn) {
  const sources = clesEn.map(preparerPourTraduction);
  const query = sources.join('\n');
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fr&dt=t&q=${encodeURIComponent(query)}`;

  const data = await fetchJsonRetry(url, 4);
  const texteComplet = Array.isArray(data && data[0])
    ? data[0].map(seg => (seg && seg[0]) ? seg[0] : '').join('')
    : '';

  const lignes = texteComplet.split(/\r?\n/).map(x => x.trim());

  // Si Google a exactement conservé le nombre de lignes, alignement 100% garanti
  if (lignes.length === clesEn.length && lignes.every(Boolean)) {
    return lignes.map((fr, idx) => nettoyerFrancaisCoranique(fr, clesEn[idx]));
  }

  // Sinon découpage récursif en deux pour éviter tout décalage
  if (clesEn.length === 1) {
    return [nettoyerFrancaisCoranique(texteComplet.replace(/\s+/g, ' ').trim(), clesEn[0])];
  }
  const mid = Math.ceil(clesEn.length / 2);
  await sleep(220);
  const g = await traduireLotExact(clesEn.slice(0, mid));
  await sleep(220);
  const d = await traduireLotExact(clesEn.slice(mid));
  return g.concat(d);
}

function sauvegarderLexique(lex) {
  const brut = JSON.stringify(lex);
  JSON.parse(brut); // Validation stricte
  writeSafe(lexPath, brut);
}

(async () => {
  const lex = JSON.parse(fs.readFileSync(lexPath, 'utf8'));
  if (!lex.en) lex.en = {};

  const toutesGloses = await collecterToutesLesGlosesEn();
  const manquantes = toutesGloses.filter(k => !lex.en[k]);

  console.log(`→ Étape 2/2 : ${Object.keys(lex.en).length} déjà dans lexique-wbw-fr.json, ${manquantes.length} à traduire.`);

  if (manquantes.length === 0) {
    console.log('✓ Le lexique couvre déjà 100% des 114 sourates !');
    return;
  }

  // Découper en lots de max 35 entrées et max 1200 caractères encodés
  const lots = [];
  let lotActuel = [];
  let tailleActuelle = 0;
  for (const k of manquantes) {
    const t = k.length + 4;
    if (lotActuel.length >= 35 || (tailleActuelle + t > 1100 && lotActuel.length > 0)) {
      lots.push(lotActuel);
      lotActuel = [];
      tailleActuelle = 0;
    }
    lotActuel.push(k);
    tailleActuelle += t;
  }
  if (lotActuel.length > 0) lots.push(lotActuel);

  let ajoutes = 0;
  for (let i = 0; i < lots.length; i++) {
    const lot = lots[i];
    const trs = await traduireLotExact(lot);
    for (let j = 0; j < lot.length; j++) {
      if (trs[j]) {
        lex.en[lot[j]] = trs[j];
        ajoutes++;
      }
    }

    if ((i + 1) % 20 === 0 || i + 1 === lots.length) {
      lex.version = (Number(lex.version) || 1) + 1;
      sauvegarderLexique(lex);
      const pct = Math.round(((i + 1) / lots.length) * 100);
      console.log(`  [${pct}%] Lot ${i + 1}/${lots.length} — Total lexique : ${Object.keys(lex.en).length} entrées`);
    }
    await sleep(320);
  }

  // Incrémenter sw.js
  let sw = fs.readFileSync(swPath, 'utf8');
  sw = sw.replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
  writeSafe(swPath, sw);

  const tailleKo = (fs.statSync(lexPath).size / 1024).toFixed(1);
  console.log(`\n✅ TERMINÉ : +${ajoutes} gloses ajoutées !`);
  console.log(`   Total site/lexique-wbw-fr.json : ${Object.keys(lex.en).length} entrées EN, ${Object.keys(lex.ar || {}).length} AR, ${Object.keys(lex.versets || {}).length} versets (${tailleKo} Ko brut).`);
})().catch(err => {
  console.error('❌ Interrompu (ta progression est sauvegardée, tu peux relancer node remplir-lexique-wbw-114.js) :', err.message);
  process.exit(1);
});
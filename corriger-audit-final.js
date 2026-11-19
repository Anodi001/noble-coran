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

const dossierSite = path.join(__dirname, 'site');
const indexPath = path.join(dossierSite, 'index.html');
const lexiquePath = path.join(dossierSite, 'lexique-wbw-fr.json');

(async () => {
  // 1. Corriger site/index.html (lien manifest PWA + noms IT et ID)
  let h = fs.readFileSync(indexPath, 'utf8');
  if (!h.includes('rel="manifest"')) {
    h = h.replace('<meta name="viewport"', '<link rel="manifest" href="/manifest.json">\n  <meta name="viewport"');
  }
  const fixIt = {
    'Al-A‘rтf': 'Al-A‘rāf',
    'Hћd': 'Hūd',
    'Tт-Hт': 'Tā-Hā',
    'Luqmрn': 'Luqmān',
    'Sabт’': 'Sabā’',
    'Colui Che dр origine': 'Colui Che dà origine',
    'Yт Sюn': 'Yā Sīn',
    'Sтd': 'Sād',
    'Al-’Ahqрf': 'Al-’Ahqāf',
    'Qтf': 'Qāf',
    'Il Venerdь': 'Il Venerdì',
    'La Sovranitр': 'La Sovranità',
    'Noш': 'Noè',
    'I Dшmoni': 'I Dèmoni',
    'Si Accigliђ': 'Si Accigliò'
  };
  for (const [a, b] of Object.entries(fixIt)) {
    h = h.split(a).join(b);
  }
  h = h
    .split("Saba\\'").join("Saba'")
    .split("Jum\\'at").join("Jum'at")
    .replace('Bukit-bukir', 'Bukit-bukit')
    .replace('Malaikat-malaikan', 'Malaikat-malaikat');
  writeSafe(indexPath, h);
  console.log('✓ site/index.html corrigé (manifest PWA + noms IT/ID).');

  // 2. Corriger site/lexique-wbw-fr.json (2:255 sur 50 mots, 111:2 sur 6 mots, "mécroient")
  const lex = JSON.parse(fs.readFileSync(lexiquePath, 'utf8'));
  lex.versets['2:255'] = [
    'Allah', 'nulle', 'divinité', 'sauf', 'Lui', 'le Vivant', "l'Absolu",
    'ne', 'Le saisit', 'somnolence', 'ni', 'sommeil', 'à Lui', 'ce qui est', 'dans', 'les cieux',
    'et ce qui est', 'sur', 'la terre', 'qui', 'est celui', 'qui', 'intercède', 'auprès de Lui',
    'sauf', 'avec Sa permission', 'Il sait', 'ce qui est', 'devant', 'eux',
    'et ce qui est', 'derrière eux', 'et ne ... pas', 'ils embrassent', 'quoi que ce soit', 'de',
    'Sa science', 'sauf', "ce qu'", 'Il veut', "s'étend sur", 'Son Trône (Kursī)',
    'les cieux', 'et la terre', 'et ne', 'Lui pèse', 'leur préservation',
    'et Il est', 'le Très-Haut', "l'Immense"
  ];
  lex.versets['111:2'] = [
    'Ne', 'a pas profité', 'à lui', 'sa richesse', "ni ce qu'", 'il a acquis'
  ];
  if (lex.en && lex.en.disbelieve === 'mécroyent') {
    lex.en.disbelieve = 'mécroient';
  }
  writeSafe(lexiquePath, JSON.stringify(lex, null, 2));
  console.log('✓ site/lexique-wbw-fr.json corrigé (2:255 = 50 mots, 111:2 = 6 mots, "mécroient").');

  // 3. Vérifier l'alignement exact du nombre de mots de TOUS les versets certifiés contre api.quran.com
  let decalages = 0;
  for (const [vk, tab] of Object.entries(lex.versets)) {
    const d = await fetch(`https://api.quran.com/api/v4/verses/by_key/${vk}?language=en&words=true&word_fields=text_uthmani`).then(r => r.json());
    const nbApi = (d.verse.words || []).filter(w => w.char_type_name === 'word').length;
    if (nbApi !== tab.length) {
      console.log(`⚠️ DÉCALAGE sur ${vk} : API=${nbApi} mots | JSON=${tab.length} entrées`);
      decalages++;
    }
  }
  console.log(`✓ Alignement des ${Object.keys(lex.versets).length} versets certifiés : ${decalages} décalage(s).`);

  // 4. Test réel de couverture du lexique statique sur 4 versets variés
  const normAr = s => (s || '').replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640\s]/g, '')
    .replace(/[إأآٱ]/g, 'ا').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
  const normEn = s => String(s || '').toLowerCase()
    .replace(/^\((is|are)\)\s*/i, '').replace(/^\(the\)\s+/i, 'the ')
    .replace(/[\[\]\(\)]/g, '').replace(/[.,;:!?'"]+$/g, '').replace(/\s{2,}/g, ' ').trim();

  for (const vk of ['2:3', '2:255', '13:2', '18:10']) {
    const d = await fetch(`https://api.quran.com/api/v4/verses/by_key/${vk}?language=en&words=true&word_fields=text_uthmani,translation`).then(r => r.json());
    const words = (d.verse.words || []).filter(w => w.char_type_name === 'word');
    let ok = 0;
    console.log(`\n=== TEST ${vk} (${words.length} mots) ===`);
    words.forEach((w, i) => {
      const a = normAr(w.text_uthmani);
      const e = normEn(w.translation && w.translation.text);
      const tr = (lex.versets[vk] && lex.versets[vk][i]) || lex.ar[a] || lex.en[e] || (`[FALLBACK_GTX: ${e}]`);
      if (!tr.startsWith('[FALLBACK_GTX')) ok++;
      if (vk === '2:3' || vk === '18:10') console.log(`${i + 1}. ${w.text_uthmani} -> ${tr}`);
    });
    console.log(`Couverture lexique statique : ${ok}/${words.length} (${Math.round(ok * 100 / words.length)}%)`);
  }
})().catch(err => {
  console.error('❌ ERREUR :', err.message);
  process.exit(1);
});
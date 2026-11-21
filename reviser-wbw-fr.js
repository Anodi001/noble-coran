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

const lexPath = path.join(__dirname, 'site', 'lexique-wbw-fr.json');
const versetJsPath = path.join(__dirname, 'site', 'assets', 'verset.js');

const lex = JSON.parse(fs.readFileSync(lexPath, 'utf8'));
lex.versets = lex.versets || {};
lex.ar = lex.ar || {};
lex.en = lex.en || {};

// ============================================================================
// 1. NETTOYAGE DES CLÉS AR AMBIGUËS & MAJUSCULES PARASITES
// ============================================================================
const clesArAmbigues = ['بكم', 'المنفقين', 'منا'];
let nbArSuppr = 0;
for (const c of clesArAmbigues) {
  if (Object.prototype.hasOwnProperty.call(lex.ar, c)) {
    delete lex.ar[c];
    nbArSuppr++;
  }
}

const majArFix = {
  'الذين': 'ceux qui',
  'الذي': 'celui qui',
  'اوليك': 'ceux-là',
  'اولئك': 'ceux-là',
  'الحمد': 'louange'
};
for (const [k, v] of Object.entries(majArFix)) {
  if (lex.ar[k]) lex.ar[k] = v;
}

// ============================================================================
// 2. CERTIFICATION MOT-À-MOT D'AL-BAQARAH 2:6 À 2:20 (DONT 2:8, 2:14, 2:18)
// ============================================================================
const versetsCertifies = {
  '2:6': ['Certes', 'ceux qui', 'ont mécru', 'il est égal', 'pour eux', 'que tu les avertisses', 'ou', 'que tu ne', 'les avertisses pas', 'ils ne', 'croiront pas'],
  '2:7': ['a scellé', 'Allah', 'sur', 'leurs cœurs', 'et sur', 'leur ouïe', 'et sur', 'leurs regards', 'est un voile', 'et pour eux', 'un châtiment', 'immense'],
  '2:8': ['et parmi', 'les gens', 'il en est qui', 'dit', 'nous avons cru', 'en Allah', 'et au Jour', 'dernier', 'mais ils ne sont', 'eux', 'point croyants'],
  '2:9': ['ils cherchent à tromper', 'Allah', 'et ceux qui', 'ont cru', 'mais ils ne', 'trompent', 'que', 'eux-mêmes', 'et ils ne', 'le ressentent pas'],
  '2:10': ['dans', 'leurs cœurs', 'est une maladie', 'alors les a augmentés', 'Allah', 'en maladie', 'et pour eux', 'un châtiment', 'douloureux', 'pour ce que', 'ils étaient', 'menteurs'],
  '2:11': ['et quand', 'on dit', 'à eux', 'ne', 'semez pas la corruption', 'sur', 'la terre', 'ils disent', 'certes', 'nous sommes', 'des réformateurs'],
  '2:12': ['en vérité', 'certes eux', 'ce sont eux', 'les corrupteurs', 'mais', 'ils ne', 'le ressentent pas'],
  '2:13': ['et quand', 'on dit', 'à eux', 'croyez', 'comme', 'ont cru', 'les gens', 'ils disent', 'croirons-nous', 'comme', 'ont cru', 'les sots', 'en vérité', 'certes eux', 'ce sont eux', 'les sots', 'mais', 'ils ne', 'savent pas'],
  '2:14': ['et lorsqu’', 'ils rencontrent', 'ceux qui', 'ont cru', 'ils disent', 'nous avons cru', 'mais quand', 'ils se retrouvent seuls', 'avec', 'leurs diables', 'ils disent', 'certes, nous sommes', 'avec vous', 'seulement', 'nous', 'nous moquons'],
  '2:15': ['Allah', 'se moque', 'd’eux', 'et les prolonge', 'dans', 'leur égarement', 'errant aveuglément'],
  '2:16': ['ceux-là', 'sont ceux qui', 'ont troqué', 'l’égarement', 'contre la guidée', 'mais n’a pas', 'profité', 'leur commerce', 'et ils ne sont pas', 'bien guidés'],
  '2:17': ['leur exemple', 'est tel l’exemple', 'de celui qui', 'a allumé', 'un feu', 'puis lorsqu’', 'il a illuminé', 'ce qui', 'l’entourait', 'a emporté', 'Allah', 'leur lumière', 'et les a laissés', 'dans', 'des ténèbres', 'où ils ne', 'voient pas'],
  '2:18': ['sourds', 'muets', 'aveugles', 'ainsi ils', 'ne', 'reviendront pas'],
  '2:19': ['ou', 'comme une nuée', 'du', 'ciel', 'où il y a', 'des ténèbres', 'un tonnerre', 'et des éclairs', 'ils mettent', 'leurs doigts', 'dans', 'leurs oreilles', 'contre', 'les foudres', 'par crainte', 'de la mort', 'et Allah', 'cerne', 'les mécréants'],
  '2:20': ['peu s’en faut', 'que l’éclair', 'n’emporte', 'leurs regards', 'chaque fois qu’', 'il les éclaire', 'ils marchent', 'dedans', 'et quand', 'il fait obscur', 'sur eux', 'ils s’arrêtent', 'et si', 'avait voulu', 'Allah', 'Il aurait emporté', 'leur ouïe', 'et leurs regards', 'certes', 'Allah', 'sur', 'toute', 'chose', 'est Omnipotent']
};
Object.assign(lex.versets, versetsCertifies);

// ============================================================================
// 3. CORRECTIONS DIRECTES & NETTOYAGE SYSTÉMATIQUE DES 20 029 GLOSES EN -> FR
// ============================================================================
const surchargesEn = {
  'are some who': 'il en est qui',
  'believers at all': 'point croyants',
  'and in the day': 'et au Jour',
  'in the day': 'au Jour',
  'on the day': 'le Jour',
  'and on the day': 'et le Jour',
  'the day': 'le Jour',
  'that day': 'ce Jour-là',
  'on that day': 'ce Jour-là',
  'the last': 'dernier',
  'their evil ones': 'leurs diables',
  'evil ones': 'les diables',
  'the evil ones': 'les diables',
  'they meet': 'ils rencontrent',
  'and they meet': 'et ils rencontrent',
  'meet': 'rencontrent',
  'deaf': 'sourds',
  'and deaf': 'et sourds',
  'dumb': 'muets',
  'and dumb': 'et muets',
  'blind': 'aveugles',
  'and blind': 'et aveugles',
  'we': 'nous',
  'indeed we': 'certes, nous',
  'indeed, we': 'certes, nous',
  'indeed': 'certes',
  'verily': 'certes',
  'those who': 'ceux qui',
  'who': 'qui',
  'not': 'ne... pas',
  'mockers': 'des moqueurs',
  'they are alone': 'ils se retrouvent seuls',
  'when they are alone': 'quand ils sont seuls',
  'say': 'disent',
  'says': 'dit',
  'he says': 'il dit',
  'they say': 'ils disent',
  'and they say': 'et ils disent',
  'you say': 'vous dites',
  'we say': 'nous disons',
  'i say': 'je dis',
  'said': 'dit',
  'he said': 'il dit',
  'they said': 'ils dirent',
  'and they said': 'et ils dirent'
};
Object.assign(lex.en, surchargesEn);

// Mots qui doivent conserver une majuscule en début de glose
const garderMajRe = /^(Allah|Seigneur|Coran|Paradis|Enfer|Géhenne|Jour|Heure|Livre|Messager|Prophète|Anges|Satan|Iblîs|Iblis|Pharaon|Israël|Moïse|Mūsā|Jésus|‘Īsā|Abraham|Ibrāhīm|Noé|Nūh|Adam|Ādam|David|Dāwūd|Salomon|Sulaymān|Joseph|Yūsuf|Marie|Maryam|Gabriel|Jibrîl|Zakariyyā|Yahyā|Ismā‘īl|Ya‘qūb|Lūt|Hārūn|Ishāq|Muhammad|Salât|Zakât|Invisible|Au-delà|Résurrection|Ô\b|Il\b|Son\b|Sa\b|Ses\b|Lui\b|Alif|Hā|Tā|Yā|Sād|Qāf|Nūn|Kāf)/;

let nbEnModif = 0;
const exemples = [];

for (const [enKey, valOrig] of Object.entries(lex.en)) {
  if (typeof valOrig !== 'string') continue;
  let v = valOrig.trim();
  const avant = v;

  // 1) Ponctuation et espaces propres
  v = v.replace(/\bne\s+\.\.\.\s+pas\b/gi, 'ne... pas');
  v = v.replace(/\s+\./g, '.').replace(/\s+,/g, ',').replace(/\s{2,}/g, ' ').trim();

  // 2) Contresens fréquents issus de la traduction automatique EN->FR
  if (/\bday\b/i.test(enKey)) {
    v = v.replace(/\bdans la journée\b/gi, 'au Jour')
         .replace(/\bla journée\b/gi, 'le Jour')
         .replace(/\bune journée\b/gi, 'un Jour')
         .replace(/\bcette journée\b/gi, 'ce Jour');
  }
  if (/\bevil ones?\b/i.test(enKey)) {
    v = v.replace(/\bméchants\b/gi, 'diables').replace(/\bméchant\b/gi, 'diable');
  }
  if (/\bmeet\b/i.test(enKey)) {
    v = v.replace(/\bils se rencontrent\b/gi, 'ils rencontrent');
  }
  if (/\bslaves?\b/i.test(enKey) && !/\bbondage|free a slave\b/i.test(enKey)) {
    v = v.replace(/\besclaves\b/gi, 'serviteurs').replace(/\besclave\b/gi, 'serviteur');
  }
  if (/\bverses?\b/i.test(enKey)) {
    v = v.replace(/\bmes vers\b/gi, 'Mes versets')
         .replace(/\bnos vers\b/gi, 'Nos versets')
         .replace(/\bses vers\b/gi, 'Ses versets')
         .replace(/\bles vers\b/gi, 'les versets');
  }
  v = v.replace(/\by en a qui\b/gi, 'il en est qui')
       .replace(/\bcroyants du tout\b/gi, 'point croyants')
       .replace(/\ben effet,\s*nous\b/gi, 'certes, nous')
       .replace(/\ben effet,\s*ils\b/gi, 'certes, ils')
       .replace(/\ben effet,\s*vous\b/gi, 'certes, vous');

  // 3) Supprimer la majuscule initiale parasite sur les mots courants (pronoms, conjonctions, verbes)
  if (/^[A-ZÉÈÊÀÂÎÔÙ]/.test(v) && !garderMajRe.test(v)) {
    // Ne pas toucher si c'est un nom propre court inconnu en anglais (ex. "Madyan", "Thamud")
    const motEn1 = enKey.split(/\s+/)[0] || '';
    const estMotCommunEn = /^(and|or|but|then|so|for|in|on|at|to|from|of|by|with|without|we|you|they|he|she|it|i|us|them|him|her|my|your|our|their|his|this|that|these|those|who|whom|which|what|when|where|why|how|if|not|no|nor|never|only|indeed|verily|surely|truly|certainly|all|every|some|any|many|few|much|more|most|say|said|believe|disbelieve|do|does|did|are|is|was|were|be|have|has|had|will|shall|may|can|could|would|should|let|make|give|take|see|hear|know|come|go|return|enter|fear|worship|obey|follow|remember|seek|ask|call|bring|send|create|guide|forgive|punish|reward|deaf|dumb|blind|mockers|believers|disbelievers|people|mankind|man|men|woman|women|earth|heaven|heavens|fire|water|light|darkness|truth|falsehood|good|evil|life|death|heart|hearts|hand|hands|eye|eyes|ear|ears|way|path|right|wrong|first|last|before|after|between|above|below|under|over|into|upon|unto|toward|towards|among|except|until|while|since|because|although|though|even|also|too|very|still|yet|now|here|there|thus|therefore|hence|about|around|against|through|during|within|throughout)$/.test(motEn1);
    if (estMotCommunEn) {
      v = v.charAt(0).toLowerCase() + v.slice(1);
    }
  }

  if (v !== avant) {
    lex.en[enKey] = v;
    nbEnModif++;
    if (exemples.length < 18) exemples.push(`  [${enKey}] "${avant}" -> "${v}"`);
  }
}

lex.version = Number(lex.version || 29) + 1;
writeSafe(lexPath, JSON.stringify(lex));
console.log(`✓ site/lexique-wbw-fr.json (v${lex.version}) :`);
console.log(`  - ${nbArSuppr} collisions arabes supprimées (dont بكم / المنفقين / منا)`);
console.log(`  - ${Object.keys(versetsCertifies).length} versets Al-Baqarah (2:6–2:20) certifiés mot-à-mot`);
console.log(`  - ${nbEnModif} gloses EN->FR nettoyées / corrigées`);
if (exemples.length) {
  console.log('  Exemples corrigés :');
  exemples.forEach(e => console.log(e));
}

// ============================================================================
// 4. MORPHOLOGIE ARABE INTELLIGENTE DANS SITE/ASSETS/VERSET.JS
// ============================================================================
const rawJs = fs.readFileSync(versetJsPath, 'utf8');
const eol = rawJs.includes('\r\n') ? '\r\n' : '\n';
let js = rawJs.replace(/\r\n/g, '\n');

const marqueurMorph = '/* WBW_MORPH_DISAMBIG_V1 */';
if (!js.includes(marqueurMorph)) {
  const cible = "    var enCle = normaliserCleEnLexique(sourceEn);\n    if (enCle && lexiqueStatiqueFr.en) {";
  if (!js.includes(cible)) {
    console.error('❌ Bloc chercherDansLexiqueStatiqueFr introuvable dans site/assets/verset.js');
    process.exit(1);
  }
  const blocMorph = `    var enCle = normaliserCleEnLexique(sourceEn);
    if (enCle && lexiqueStatiqueFr.en) {
      ${marqueurMorph}
      if (arNorm) {
        // Collision بكم (بُكْمٌ muets vs بِكُمْ par vous) + pluriels brisés صم / عمي
        if (arNorm === 'بكم') return /\\b(dumb|mute)\\b/i.test(enCle) ? 'muets' : 'par vous';
        if (arNorm === 'وبكم' && /\\b(dumb|mute)\\b/i.test(enCle)) return 'et muets';
        if (arNorm === 'صم' && /\\bdeaf\\b/i.test(enCle)) return 'sourds';
        if (arNorm === 'عمي' && /\\bblind\\b/i.test(enCle)) return 'aveugles';
        if ((arNorm === 'اعمي' || arNorm === 'الاعمي') && /\\bblind\\b/i.test(enCle)) return arNorm === 'الاعمي' ? "l'aveugle" : 'aveugle';

        // Désambiguïsation du verbe dire (قُلْ Dis vs يَقُولُ dit vs يَقُولُونَ disent)
        if (/^(and |but |then |so )?say(s)?$/i.test(enCle)) {
          var prefFr = /^and /i.test(enCle) ? 'et ' : (/^but /i.test(enCle) ? 'mais ' : (/^then /i.test(enCle) ? 'puis ' : (/^so /i.test(enCle) ? 'alors ' : '')));
          if (/^(و|ف)?قل$/.test(arNorm)) return prefFr ? (prefFr + 'dis') : 'Dis';
          if (/^(و|ف)?يقول$/.test(arNorm)) return prefFr + 'dit';
          if (/^(و|ف)?يقول(ون|وا)$/.test(arNorm)) return prefFr + 'ils disent';
          if (/^(و|ف)?تقول$/.test(arNorm)) return prefFr + 'tu dis';
          if (/^(و|ف)?تقول(ون|وا)$/.test(arNorm)) return prefFr + 'vous dites';
          if (/^(و|ف)?نقول$/.test(arNorm)) return prefFr + 'nous disons';
          if (/^(و|ف)?اقول$/.test(arNorm)) return prefFr + 'je dis';
          if (/^(و|ف)?قالوا$/.test(arNorm)) return prefFr + 'ils dirent';
          if (/^(و|ف)?قال$/.test(arNorm)) return prefFr + 'il dit';
        }
      }`;
  js = js.replace(cible, blocMorph);
  new vm.Script(js, { filename: 'site/assets/verset.js' });
  writeSafe(versetJsPath, eol === '\r\n' ? js.replace(/\n/g, '\r\n') : js);
  console.log('✓ site/assets/verset.js : désambiguïsation morphologique (بكم / صم / عمي / قُل vs يَقُولُ) injectée et validée.');
} else {
  console.log('ℹ️ Morphologie WBW déjà présente dans site/assets/verset.js.');
}
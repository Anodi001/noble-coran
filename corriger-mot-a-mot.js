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

function replaceStrict(src, pattern, replacement, label) {
  const out = src.replace(pattern, replacement);
  if (out === src) {
    throw new Error(`Ancre introuvable pour : ${label}`);
  }
  return out;
}

const dossierSite = path.join(__dirname, 'site');
const versetJsPath = path.join(dossierSite, 'assets', 'verset.js');
const workerPath = path.join(dossierSite, '_worker.js');
const swPath = path.join(dossierSite, 'sw.js');

let code = fs.readFileSync(versetJsPath, 'utf8');

// 1. Affiner 2:3 dans GLOSE_HAMIDULLAH_FR ("Ceux qui" au lieu de "qui" pour الَّذِينَ)
code = replaceStrict(
  code,
  `"2:3": ["qui", "croient", "à l'inconnaissable", "et accomplissent", "la Salât", "et de ce que", "Nous leur avons attribué", "dépensent"],`,
  `"2:3": ["Ceux qui", "croient", "à l'inconnaissable", "et accomplissent", "la Salât", "et de ce que", "Nous leur avons attribué", "dépensent"],`,
  'GLOSE_HAMIDULLAH_FR 2:3'
);

// 2. Marquer les gloses manuelles certifiées pour qu'aucun autre moteur ne les écrase
code = replaceStrict(
  code,
  `mots.forEach((w, i) => { w.tradLocalisee = manuel[i]; });`,
  `mots.forEach((w, i) => { w.tradLocalisee = manuel[i]; w.estManuelFr = true; });`,
  'marquage estManuelFr'
);

code = replaceStrict(
  code,
  /traduction\.className\s*=\s*'wbw-tr';\r?\n[ \t]*traduction\.textContent\s*=\s*w\.tradLocalisee\s*\|\|\s*'';/,
  (m) => {
    const eol = m.includes('\r\n') ? '\r\n' : '\n';
    return [
      `traduction.className = 'wbw-tr';`,
      `          traduction.dataset.wbwEn = (w.translation && w.translation.text) ? w.translation.text : '';`,
      `          traduction.textContent = w.tradLocalisee || '';`,
      `          if (w.estManuelFr) {`,
      `            traduction.dataset.wbwManual = '1';`,
      `            traduction.dataset.wbwTrOk = langSite;`,
      `            traduction.dataset.wbwTrLock = '1';`,
      `            traduction.dataset.wbwTrFinal = w.tradLocalisee || '';`,
      `          }`
    ].join(eol);
  },
  'attributs data-wbw sur .wbw-tr'
);

// 3. Purger l'ancien cache batch corrompu (v65 -> v120) et améliorer la pré-désambiguïsation avant batch
code = code.split('cache_wbw_exact_v65').join('cache_wbw_exact_v120');

code = replaceStrict(
  code,
  `var propreEn = motsQdc[j].en.replace(/[\\(\\)\\[\\]]/g, "").trim();`,
  `var propreEn = motsQdc[j].en.replace(/[\\(\\)\\[\\]]/g, "").trim();
            if (lang === "fr" && propreEn) {
              var arNBatch = normaliserArabeCle(motsQdc[j].ar);
              propreEn = propreEn
                .replace(/\\band\\s+out\\s+of\\s+what\\b/gi, "and from that which")
                .replace(/\\bout\\s+of\\s+what\\b/gi, "from that which")
                .replace(/\\band\\s+from\\s+what\\b/gi, "and from that which")
                .replace(/\\bfrom\\s+what\\b/gi, "from that which");
              if (/^(و|ف|ل)?ي.+ون$/.test(arNBatch) && !/^(they|those|who|he|we|you|i|in|on|of|for|the|a|an|to|with)\\b/i.test(propreEn)) {
                propreEn = /^and\\s+/i.test(propreEn)
                  ? propreEn.replace(/^and\\s+/i, "and they ")
                  : ("they " + propreEn);
              } else if (/^(و|ف|ل)?ت.+ون$/.test(arNBatch) && !/^(you|they|we|he|i|in|on|of|for|the|a|an|to|with)\\b/i.test(propreEn)) {
                propreEn = /^and\\s+/i.test(propreEn)
                  ? propreEn.replace(/^and\\s+/i, "and you all ")
                  : ("you all " + propreEn);
              }
            }`,
  'desambiguiser batch chargerVraiMotAMotVerset'
);

// 4. Empêcher appliquerVraiMotAMotSurDOM d'écraser une glose manuelle et marquer le passage batch
code = replaceStrict(
  code,
  `if (tradFinale && !elTr.dataset.wbwTrOk && elTr.textContent !== tradFinale) elTr.textContent = tradFinale;`,
  `if (elTr.dataset.wbwManual === "1") continue;
      if (tradFinale && !elTr.dataset.wbwTrOk && elTr.textContent !== tradFinale) {
        elTr.textContent = tradFinale;
        elTr.dataset.wbwBatchOk = lang;
      }`,
  'protection appliquerVraiMotAMotSurDOM'
);

// 5. Remplacer proprement le bloc dicoArabeFr -> fin de nettoyerEtTraduireMotUneFois
const debutAncre = '  var dicoArabeFr = {';
const finAncre = '  var cacheMetaCartes = []';
const iDebut = code.indexOf(debutAncre);
const iFin = code.indexOf(finAncre);
if (iDebut === -1 || iFin === -1 || iFin <= iDebut) {
  throw new Error(`Bloc dicoArabeFr .. cacheMetaCartes introuvable (${iDebut}, ${iFin})`);
}

const nouveauBloc = `  // Purge automatique des anciens caches corrompus (v65 / v117)
  try {
    localStorage.removeItem('cache_wbw_exact_v65');
    localStorage.removeItem('wbw_tr_cache_v117');
  } catch (e) {}

  // Dictionnaire arabe -> FR strictement univoque (sans faux-amis contextuels)
  var dicoArabeFr = {
    'الذين': 'Ceux qui', 'والذين': 'et ceux qui', 'الذي': 'Celui qui', 'والذي': 'et celui qui',
    'التي': 'celle qui', 'اللاتي': 'celles qui', 'اوليك': 'Ceux-là', 'اولئك': 'Ceux-là',
    'واوليك': 'et ceux-là', 'واولئك': 'et ceux-là',
    'مما': 'de ce que', 'ومما': 'et de ce que',
    'يومنون': 'croient', 'يؤمنون': 'croient', 'تومنون': 'vous croyez', 'تؤمنون': 'vous croyez',
    'امنوا': 'ont cru', 'ءامنوا': 'ont cru', 'بالغيب': "en l'Invisible", 'الغيب': "l'Invisible",
    'ويقيمون': 'et accomplissent', 'يقيمون': 'accomplissent', 'الصلوه': 'la Salât', 'الصلاه': 'la Salât',
    'الزكوه': 'la Zakât', 'الزكاه': 'la Zakât', 'ينفقون': 'dépensent', 'وينفقون': 'et dépensent',
    'رزقنهم': 'Nous leur avons attribué', 'رزقناهم': 'Nous leur avons attribué',
    'يوقنون': 'ont la certitude', 'المفلحون': 'ceux qui réussissent',
    'للمتقين': 'pour les pieux', 'المتقين': 'les pieux', 'العالمين': 'des mondes',
    'الرحمن': 'le Tout Miséricordieux', 'الرحيم': 'le Très Miséricordieux',
    'المومنين': 'les croyants', 'المؤمنين': 'les croyants', 'للمومنين': 'pour les croyants', 'للمؤمنين': 'pour les croyants',
    'الكافرين': 'les mécréants', 'للكافرين': 'pour les mécréants', 'الكفرين': 'les mécréants',
    'الظالمين': 'les injustes', 'الظلمين': 'les injustes', 'المنافقين': 'les hypocrites', 'المنفقين': 'les hypocrites',
    'الصادقين': 'les véridiques', 'الصدقين': 'les véridiques', 'صادقين': 'véridiques',
    'السماوات': 'les cieux', 'السموات': 'les cieux', 'السموت': 'les cieux',
    'الارض': 'la terre', 'والارض': 'et la terre', 'الاخره': "l'Au-delà", 'بالاخره': "en l'Au-delà",
    'الدنيا': 'la vie présente', 'الكتاب': 'le Livre', 'الكتب': 'le Livre',
    'باياتنا': 'en Nos versets', 'بايتنا': 'en Nos versets', 'اياتنا': 'Nos versets', 'ايتنا': 'Nos versets',
    'بسوره': 'une sourate', 'سوره': 'une sourate', 'عبدنا': 'Notre serviteur', 'عبده': 'Son serviteur',
    'شهداءكم': 'vos témoins', 'شهدايكم': 'vos témoins',
    'عنه': 'de lui', 'عنهم': "d'eux", 'دونهم': "en dehors d'eux", 'دون': 'en dehors de',
    'اليها': 'vers elle', 'اليه': 'vers lui', 'اليهم': 'vers eux',
    'عليهم': 'sur eux', 'عليكم': 'sur vous', 'علينا': 'sur nous',
    'لهم': 'pour eux', 'لكم': 'pour vous', 'لنا': 'pour nous',
    'انفسهم': 'eux-mêmes', 'قلوبهم': 'leurs cœurs', 'ابصارهم': 'leurs regards', 'سمعهم': 'leur ouïe',
    'فاتخذت': 'Puis elle prit', 'حجابا': 'un voile', 'فارسلنا': 'Nous envoyâmes alors', 'روحنا': 'Notre Esprit',
    'فتمثل': 'et il se présenta', 'بشرا': "sous la forme d'un homme", 'سويا': 'parfait',
    'افرايت': 'As-tu vu', 'والقلم': 'Par la plume', 'يسطرون': 'ils écrivent',
    'واشتعل': "et s'est embrasée", 'الراس': 'la tête', 'شيبا': 'de cheveux blancs',
    'بدعايك': "en T'invoquant", 'شقيا': 'malheureux', 'وهن': "s'est affaibli",
    'زكريا': 'Zakariyya', 'بمجنون': 'un possédé'
  };

  var dicoInstantaneFr = {
    'those who': 'Ceux qui', 'and those who': 'et ceux qui', 'the one who': 'Celui qui',
    'and out of what': 'et de ce que', 'out of what': 'de ce que',
    'and from what': 'et de ce que', 'from what': 'de ce que',
    'and from that which': 'et de ce que', 'from that which': 'de ce que',
    'in the unseen': "en l'Invisible", 'the unseen': "l'Invisible",
    'and establish': 'et accomplissent', 'and they establish': 'et accomplissent',
    'the prayer': 'la Salât', 'we have provided them': 'Nous leur avons attribué',
    'we provided them': 'Nous leur avons attribué', 'they spend': 'dépensent',
    'they believe': 'croient', 'you all believe': 'vous croyez',
    'they disbelieve': 'mécroient', 'those who disbelieve': 'ceux qui mécroient',
    'and of the hereafter': "et quant à l'Au-delà", 'they are certain': 'ils ont la certitude',
    'are upon': 'sont sur', 'from their lord': 'de leur Seigneur',
    'are the successful': 'sont ceux qui réussissent',
    'was revealed': 'a été révélé', 'has been revealed': 'a été révélé',
    'to you': 'à toi', 'before you': 'avant toi', 'indeed': 'Certes', 'verily': 'Certes',
    'like it': 'semblable à ceci', '(the) like of it': 'semblable à ceci', 'the like of it': 'semblable à ceci',
    'in our verses': 'en Nos versets', 'our verses': 'Nos versets', 'his verses': 'Ses versets', 'verses': 'versets',
    'dans nos vers': 'en Nos versets', 'nos vers': 'Nos versets',
    'our slave': 'Notre serviteur', 'his slave': 'Son serviteur', 'my slave': 'Mon serviteur', 'notre esclave': 'Notre serviteur',
    'a chapter': 'une sourate', 'un chapitre': 'une sourate',
    'then produce': 'apportez donc', 'puis produire': 'apportez donc',
    'and call': 'et appelez', 'other than': 'en dehors de', 'autre que': 'en dehors de',
    'truthful': 'véridiques', 'when': 'Quand', 'nun': 'Nun', 'by the pen': 'Par la plume',
    'and what': 'et ce que', 'they inscribe': 'ils écrivent', 'stand': 'Lève-toi', 'stand (in prayer)': 'Lève-toi (en prière)',
    'support': 'Lève-toi', 'and flared': "et s'est embrasée", 'flared': "s'est embrasée",
    'with white': 'de cheveux blancs', '(with) white': 'de cheveux blancs', 'white hair': 'de cheveux blancs',
    'unblessed': 'malheureux', 'of me': 'de moi', 'from me': 'de moi', 'and not': "et ne ... pas",
    'i have been': 'j’ai été', 'in my supplication to you': "en T'invoquant",
    'in (the) name': 'au nom', 'in the name': 'au nom', 'who': 'qui', 'created': 'a créé',
    'read': 'Lis', 'recite': 'Lis', 'your lord': 'ton Seigneur', 'and your lord': 'Et ton Seigneur',
    '(is) the most generous': 'est le Très Généreux', 'the most generous': 'le Très Généreux',
    'taught': 'a enseigné', 'man': "à l'homme", 'what': 'ce que', 'not': 'ne ... pas',
    'he knew': 'il savait', 'from': 'de', 'a clinging substance': 'une adhérence', 'clinging substance': 'une adhérence'
  };

  function estMotArabePluriel(arNorm) {
    return /(تم|كم|وا|ون|ين|هم|هن|تن|نا)$/.test(arNorm);
  }

  function estDejaFrancaisSansAccent(str) {
    var s = (str || '').toLowerCase().trim();
    if (!s) return false;
    if (/[àâäéèêëîïôöùûüçœæ]/i.test(s)) return true;
    return /^(ceux qui|celui qui|celle qui|ceux-la|qui|que|et de ce que|de ce que|et ce que|ce que|croient|disent|font|sont|savent|voient|entendent|accomplissent|et accomplissent|et|ou|ni|mais|car|dans|sur|sous|pour|par|avec|sans|vers|chez|de|du|des|le|la|les|un|une|au|aux|mon|ton|son|ma|ta|sa|mes|tes|ses|notre|votre|leur|leurs|nous|vous|ils|elles|lui|eux|seigneur|livre|doute|pieux|guide|jour|nuit|terre|cieux|ciel|allah|dieu|salat|zakat|chemin|droit|louange|monde|mondes|certes|point|aucun|avant|apres|toi|moi|soi|ici-bas)(\\s+[a-z'-]+){0,3}$/i.test(s);
  }

  function desambiguiserAnglaisCoranique(enBrut, arNorm) {
    var s = (enBrut || '').replace(/^\\(is\\)\\s*/i, '').replace(/[\\[\\]\\(\\)]/g, '').replace(/\\s{2,}/g, ' ').trim();
    if (/^(the\\s+)?like(\\s+of)?\\s+(it|him|them|this|that)$/i.test(s)) return 'similar to it';
    s = s.replace(/\\band\\s+out\\s+of\\s+what\\b/gi, 'and from that which')
         .replace(/\\bout\\s+of\\s+what\\b/gi, 'from that which')
         .replace(/\\band\\s+from\\s+what\\b/gi, 'and from that which')
         .replace(/\\bfrom\\s+what\\b/gi, 'from that which');
    s = s.replace(/\\bour\\s+verses\\b/gi, 'Our Quranic verses').replace(/\\bverses\\b/gi, 'Quranic verses');
    s = s.replace(/\\bour\\s+slave\\b/gi, 'Our servant').replace(/\\bhis\\s+slave\\b/gi, 'His servant').replace(/\\bslaves\\b/gi, 'servants').replace(/\\bslave\\b/gi, 'servant');
    s = s.replace(/\\ba\\s+chapter\\b/gi, 'a Surah');
    if (estMotArabePluriel(arNorm)) {
      s = s.replace(/\\byou\\s+are\\b/gi, 'you all are').replace(/\\byou\\s+were\\b/gi, 'you all were');
    }
    // Éviter que Google Translate traduise les verbes anglais nus à l'impératif (ex: "believe" -> "crois")
    if (/^(و|ف|ل)?ي.+ون$/.test(arNorm) && !/^(they|those|who|he|she|we|you|i|in|on|of|for|the|a|an|to|with|not|no)\\b/i.test(s)) {
      s = /^and\\s+/i.test(s) ? s.replace(/^and\\s+/i, 'and they ') : ('they ' + s);
    } else if (/^(و|ف|ل)?ت.+ون$/.test(arNorm) && !/^(you|they|we|he|she|i|in|on|of|for|the|a|an|to|with|not|no)\\b/i.test(s)) {
      s = /^and\\s+/i.test(s) ? s.replace(/^and\\s+/i, 'and you all ') : ('you all ' + s);
    }
    return s;
  }

  function corrigerFrancaisSelonMorphologieArabe(tr, arNorm) {
    var out = (tr || '').trim();
    if (/^j.aime\\s+ça$/i.test(out)) return 'semblable à ceci';
    if (/^ici$/i.test(out) && (arNorm === 'الذين' || arNorm === 'الذي')) return arNorm === 'الذين' ? 'Ceux qui' : 'Celui qui';
    out = out.replace(/^et\\s+de\\s+quoi$/i, 'et de ce que').replace(/^de\\s+quoi$/i, 'de ce que');
    out = out.replace(/\\bdans\\s+nos\\s+vers\\b/gi, 'en Nos versets').replace(/\\bnos\\s+vers\\b/gi, 'Nos versets');
    out = out.replace(/\\bnotre\\s+esclave\\b/gi, 'Notre serviteur').replace(/\\bson\\s+esclave\\b/gi, 'Son serviteur');
    out = out.replace(/\\bun\\s+chapitre\\b/gi, 'une sourate');
    if (estMotArabePluriel(arNorm)) {
      if (/^crois$/i.test(out)) return 'croient';
      if (/^et\\s+crois$/i.test(out)) return 'et croient';
      if (/^établis$/i.test(out)) return 'accomplissent';
      if (/^et\\s+établis$/i.test(out)) return 'et accomplissent';
      if (/^tu\\s+es$/i.test(out)) return 'vous êtes';
      if (/^tu\\s+étais$/i.test(out)) return 'vous étiez';
      if (/^et\\s+appelle$/i.test(out)) return 'et appelez';
      if (/^véridique$/i.test(out)) return 'véridiques';
      out = out.replace(/^tu\\s+/i, 'vous ');
    }
    return out;
  }

  var cacheTradMots = {};
  try { cacheTradMots = JSON.parse(localStorage.getItem('wbw_tr_cache_v120') || '{}'); } catch (e) {}
  var enCoursTrad = {}, prochainEssaiTrad = {};

  function obtenirLanguePage() {
    var p = new URLSearchParams(window.location.search).get('lang');
    return p ? p.slice(0, 2).toLowerCase() : ((document.documentElement.lang || 'fr').slice(0, 2).toLowerCase() || 'fr');
  }

  function nettoyerEtTraduireMotUneFois(elTrad, elAr, lang, forcerRetraduction) {
    if (!elTrad) return;
    // Ne JAMAIS écraser une glose certifiée manuellement (GLOSE_HAMIDULLAH_FR)
    if (elTrad.dataset.wbwManual === '1') {
      if (elTrad.dataset.wbwTrFinal && elTrad.textContent !== elTrad.dataset.wbwTrFinal) {
        definirTexteSansBoucle(elTrad, elTrad.dataset.wbwTrFinal);
      }
      return;
    }
    if (!forcerRetraduction && elTrad.dataset.wbwTrOk === lang && elTrad.dataset.wbwTrLock === '1') {
      if (elTrad.dataset.wbwTrFinal && elTrad.textContent !== elTrad.dataset.wbwTrFinal) {
        definirTexteSansBoucle(elTrad, elTrad.dataset.wbwTrFinal);
      }
      return;
    }

    var brutDom = (elTrad.textContent || '').trim();
    var sourceEn = (elTrad.dataset.wbwEn || '').trim();
    var brut = sourceEn || brutDom;
    var txtAr = elAr ? (elAr.textContent || '') : '';
    var arPur = nettoyerArabeBrut(txtAr), arNorm = normaliserArabeCle(txtAr);

    function figerTraduction(valFinale) {
      definirTexteSansBoucle(elTrad, valFinale);
      elTrad.dataset.wbwTrFinal = valFinale;
      elTrad.dataset.wbwTrOk = lang;
      elTrad.dataset.wbwTrLock = '1';
    }

    if (tableMuqattaat[arPur]) { figerTraduction(tableMuqattaat[arPur]); return; }
    if (lang === 'fr' && dicoArabeFr[arNorm]) { figerTraduction(dicoArabeFr[arNorm]); return; }
    if (!brut) return;

    if (brut.indexOf('_') !== -1) {
      brut = brut.split('_').join(' ').replace(/\\s{2,}/g, ' ').trim();
      if (!sourceEn) definirTexteSansBoucle(elTrad, brut);
    }
    if (lang === 'en' || lang === 'ar') { figerTraduction(brut); return; }

    // Si déjà traduit proprement par le moteur batch et pas d'anglais brut à améliorer, figer sans retraduire
    if (!sourceEn && elTrad.dataset.wbwBatchOk === lang && brutDom) {
      figerTraduction(lang === 'fr' ? corrigerFrancaisSelonMorphologieArabe(brutDom, arNorm) : brutDom);
      return;
    }

    var cleMin = brut.toLowerCase().replace(/\\s{2,}/g, ' ');
    if (lang === 'fr' && dicoInstantaneFr[cleMin]) {
      figerTraduction(corrigerFrancaisSelonMorphologieArabe(dicoInstantaneFr[cleMin], arNorm));
      return;
    }

    // Ne jamais renvoyer un texte déjà en français (même sans accent !) à sl=en
    if (lang === 'fr' && !sourceEn && estDejaFrancaisSansAccent(brutDom)) {
      figerTraduction(corrigerFrancaisSelonMorphologieArabe(brutDom, arNorm));
      return;
    }

    var cle = lang + ':' + arNorm + ':' + cleMin;
    if (cacheTradMots[cle]) {
      var valCache = lang === 'fr' ? corrigerFrancaisSelonMorphologieArabe(cacheTradMots[cle], arNorm) : cacheTradMots[cle];
      figerTraduction(valCache);
      return;
    }

    if (enCoursTrad[cle] || Date.now() < (prochainEssaiTrad[cle] || 0)) return;
    enCoursTrad[cle] = true;

    var propreEn = desambiguiserAnglaisCoranique(brut, arNorm)
      .replace(/\\bthou art\\b/gi, 'you are')
      .replace(/\\bthou hast\\b/gi, 'you have')
      .replace(/\\bthou\\b/gi, 'you')
      .replace(/\\bthee\\b/gi, 'you')
      .replace(/\\bthy\\b/gi, 'your')
      .replace(/\\bthine\\b/gi, 'yours')
      .replace(/\\bye\\b/gi, 'you')
      .replace(/\\bhath\\b/gi, 'has')
      .replace(/\\bhast\\b/gi, 'have')
      .replace(/\\bunto\\b/gi, 'to')
      .replace(/\\bverily\\b/gi, 'truly');
    var glossaireTheologiqueFr = {
      'the most gracious': 'le Tout Miséricordieux',
      'the most merciful': 'le Très Miséricordieux',
      'the entirely merciful': 'le Tout Miséricordieux',
      'the especially merciful': 'le Très Miséricordieux',
      'lord of the worlds': 'Seigneur des mondes',
      'day of judgment': 'Jour du Jugement',
      'day of judgement': 'Jour du Jugement',
      'day of resurrection': 'Jour de la Résurrection',
      'the hereafter': "l'Au-delà",
      'hereafter': 'Au-delà',
      'the unseen': "l'Invisible",
      'unseen': 'Invisible',
      'the disbelievers': 'les mécréants',
      'disbelievers': 'mécréants',
      'the believers': 'les croyants',
      'believers': 'croyants',
      'the righteous': 'les pieux',
      'the hypocrites': 'les hypocrites',
      'the polytheists': 'les polythéistes',
      'the wrongdoers': 'les injustes',
      'wrongdoers': 'injustes',
      'hellfire': "le Feu de l'Enfer",
      'paradise': 'le Paradis',
      'gardens': 'Jardins',
      'prayer': 'la Salât',
      'almstax': 'la Zakât',
      'zakah': 'la Zakât',
      'charity': "l'aumône",
      'covenant': 'le pacte',
      'forgiveness': 'le pardon',
      'repentance': 'le repentir',
      'guidance': 'la guidée',
      'revelation': 'la Révélation',
      'messenger': 'Messager',
      'messengers': 'Messagers',
      'prophet': 'Prophète',
      'angels': 'les Anges',
      'almighty': 'le Tout-Puissant',
      'all-wise': 'le Très-Sage',
      'all-knowing': "l'Omniscient",
      'omniscient': "l'Omniscient"
    };
    if (lang === 'fr' && glossaireTheologiqueFr[propreEn.toLowerCase()]) {
      var trGl = corrigerFrancaisSelonMorphologieArabe(glossaireTheologiqueFr[propreEn.toLowerCase()], arNorm);
      cacheTradMots[cle] = trGl;
      figerTraduction(trGl);
      delete enCoursTrad[cle];
      return;
    }

    function lancerFallbackGtx() {
      fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + encodeURIComponent(lang) + '&dt=t&q=' + encodeURIComponent(propreEn))
        .then(function(r) { return r.ok ? r.json() : Promise.reject(new Error('HTTP')); })
        .then(function(d) {
          if (d && d[0] && d[0][0] && d[0][0][0]) {
            var tr = d[0].map(function(x) { return x[0] || ''; }).join('').trim();
            if (tr) {
              if (lang === 'fr') {
                if (dicoInstantaneFr[tr.toLowerCase()]) tr = dicoInstantaneFr[tr.toLowerCase()];
                tr = corrigerFrancaisSelonMorphologieArabe(tr, arNorm);
              }
              cacheTradMots[cle] = tr;
              try { localStorage.setItem('wbw_tr_cache_v120', JSON.stringify(cacheTradMots)); } catch (e) {}
              if (elTrad && elTrad.isConnected && obtenirLanguePage() === lang) {
                figerTraduction(tr);
              }
            }
          }
        })
        .catch(function() { prochainEssaiTrad[cle] = Date.now() + 15000; })
        .finally(function() { delete enCoursTrad[cle]; });
    }

    if ((lang === 'ru' || lang === 'de' || lang === 'id') && typeof numSourateActuelle !== 'undefined' && typeof numVersetActuel !== 'undefined') {
      window.__qdcNativeWbw = window.__qdcNativeWbw || {};
      var vkNat = numSourateActuelle + ':' + numVersetActuel + ':' + lang;
      if (window.__qdcNativeWbw[vkNat] && window.__qdcNativeWbw[vkNat][arNorm]) {
        var trNat = window.__qdcNativeWbw[vkNat][arNorm];
        cacheTradMots[cle] = trNat;
        figerTraduction(trNat);
        delete enCoursTrad[cle];
        return;
      }
      if (!window.__qdcNativeWbw['req_' + vkNat]) {
        window.__qdcNativeWbw['req_' + vkNat] = fetch('https://api.quran.com/api/v4/verses/by_key/' + numSourateActuelle + ':' + numVersetActuel + '?language=' + lang + '&words=true&word_fields=text_uthmani,translation')
          .then(function(r) { return r.ok ? r.json() : null; })
          .then(function(dNat) {
            var mapNat = {};
            if (dNat && dNat.verse && Array.isArray(dNat.verse.words)) {
              dNat.verse.words.forEach(function(wNat) {
                if (wNat && wNat.text_uthmani && wNat.translation && wNat.translation.text) {
                  mapNat[normaliserArabeCle(wNat.text_uthmani)] = wNat.translation.text.trim();
                }
              });
            }
            window.__qdcNativeWbw[vkNat] = mapNat;
            return mapNat;
          }).catch(function() { return {}; });
      }
      window.__qdcNativeWbw['req_' + vkNat].then(function(mapNat) {
        if (mapNat && mapNat[arNorm]) {
          var trOfficiel = mapNat[arNorm];
          cacheTradMots[cle] = trOfficiel;
          try { localStorage.setItem('wbw_tr_cache_v120', JSON.stringify(cacheTradMots)); } catch (e) {}
          if (elTrad && elTrad.isConnected && obtenirLanguePage() === lang) figerTraduction(trOfficiel);
          delete enCoursTrad[cle];
        } else {
          lancerFallbackGtx();
        }
      });
      return;
    }

    lancerFallbackGtx();
  }

`;

code = code.slice(0, iDebut) + nouveauBloc + code.slice(iFin);

// Validation syntaxique stricte avant écriture
new vm.Script(code, { filename: 'site/assets/verset.js' });
writeSafe(versetJsPath, code);
console.log('✓ site/assets/verset.js corrigé et validé (0 erreur de syntaxe).');

// Incrémenter le cache PWA (sw.js) et SSR_VERSION (_worker.js) pour forcer le rafraîchissement immédiat
if (fs.existsSync(swPath)) {
  const sw = fs.readFileSync(swPath, 'utf8').replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
  writeSafe(swPath, sw);
  console.log('✓ site/sw.js : version du cache PWA incrémentée.');
}
if (fs.existsSync(workerPath)) {
  const w = fs.readFileSync(workerPath, 'utf8').replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
  writeSafe(workerPath, w);
  console.log('✓ site/_worker.js : SSR_VERSION incrémentée.');
}
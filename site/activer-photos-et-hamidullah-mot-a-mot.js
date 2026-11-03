const fs = require('fs');
const path = require('path');
const vm = require('vm');

const fichierGen = path.join(__dirname, 'generateur.js');
if (!fs.existsSync(fichierGen)) {
  console.error('❌ generateur.js introuvable dans ce dossier.');
  process.exit(1);
}

// ============================================================================
// 1. TÉLÉCHARGEMENT DES PHOTOS DES RÉCITATEURS DANS site/recitateurs/
// ============================================================================
const dossierSite = path.join(__dirname, 'site');
const dossierRecitateurs = path.join(dossierSite, 'recitateurs');
if (!fs.existsSync(dossierSite)) fs.mkdirSync(dossierSite);
if (!fs.existsSync(dossierRecitateurs)) fs.mkdirSync(dossierRecitateurs);

const SOURCES_PHOTOS = {
  'yasser': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Yasser_Al-Dosari.jpg/250px-Yasser_Al-Dosari.jpg',
    'https://static.qurancdn.com/images/reciters/10/yasser-ad-dussary-profile.jpeg'
  ],
  'maher': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Maher_Al_Mueaqly.png/250px-Maher_Al_Mueaqly.png',
    'https://static.qurancdn.com/images/reciters/9/maher-al-muaiqly-profile.jpeg'
  ],
  'ali-jaber': [
    'https://upload.wikimedia.org/wikipedia/en/2/2f/Ali_Jaber_Imam.jpg'
  ],
  'ayyub': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Muhammad_Ayyub.jpg/250px-Muhammad_Ayyub.jpg'
  ],
  'husary': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Mahmoud_Khalil_Al-Hussary.jpg/250px-Mahmoud_Khalil_Al-Hussary.jpg',
    'https://static.qurancdn.com/images/reciters/5/mahmoud-khalil-al-husary-profile.png'
  ],
  'alafasy': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Mishary_Rashid_Alafasy.jpg/250px-Mishary_Rashid_Alafasy.jpg',
    'https://static.qurancdn.com/images/reciters/6/mishary-rashid-alafasy-profile.jpeg'
  ],
  'sudais': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Abdul_Rahman_Al-Sudais.jpg/250px-Abdul_Rahman_Al-Sudais.jpg',
    'https://static.qurancdn.com/images/reciters/2/abdul-rahman-al-sudais-profile.jpeg'
  ],
  'shuraim': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Saud_Al-Shuraim.jpg/250px-Saud_Al-Shuraim.jpg',
    'https://static.qurancdn.com/images/reciters/3/saud-ash-shuraym-profile.jpeg'
  ],
  'qatami': [
    'https://i1.sndcdn.com/artworks-000165388318-72v8b5-t500x500.jpg'
  ],
  'minshawi': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Mohamed_Siddiq_El-Minshawi.jpg/250px-Mohamed_Siddiq_El-Minshawi.jpg',
    'https://static.qurancdn.com/images/reciters/7/mohamed-siddiq-al-minshawi-profile.jpeg'
  ]
};

// Génère un médaillon SVG élégant (style Haramain) si une photo externe est bloquée ou hors-ligne
function creerPortraitSvgElegante(initiales, c1, c2) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="60" fill="#071320"/>
    <circle cx="60" cy="60" r="56" fill="none" stroke="url(#g)" stroke-width="4" opacity="0.85"/>
    <circle cx="60" cy="44" r="19" fill="url(#g)" opacity="0.9"/>
    <path d="M24 104 C28 76, 92 76, 96 104" fill="url(#g)" opacity="0.9"/>
    <text x="60" y="112" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#ffffff">${initiales}</text>
  </svg>`;
}

async function telechargerPhotosRecitateurs() {
  console.log('📸 Téléchargement des portraits des récitateurs dans site/recitateurs/...');
  for (const [slug, urls] of Object.entries(SOURCES_PHOTOS)) {
    const destJpg = path.join(dossierRecitateurs, `${slug}.jpg`);
    if (fs.existsSync(destJpg) && fs.statSync(destJpg).size > 1500) {
      console.log(`  ✓ ${slug}.jpg déjà présent`);
      continue;
    }
    let ok = false;
    for (const u of urls) {
      try {
        const res = await fetch(u, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) CoranTafsir/1.0' }
        });
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          if (buf.length > 1000) {
            fs.writeFileSync(destJpg, buf);
            console.log(`  ✅ ${slug}.jpg téléchargé (${Math.round(buf.length / 1024)} Ko)`);
            ok = true;
            break;
          }
        }
      } catch (e) {}
    }
    if (!ok) {
      // Sauvegarde un portrait SVG haute définition en secours
      const destSvg = path.join(dossierRecitateurs, `${slug}.svg`);
      fs.writeFileSync(destSvg, creerPortraitSvgElegante(slug.slice(0, 2).toUpperCase(), '#38bdf8', '#eab308'), 'utf8');
      console.log(`  ℹ️ Portrait vectoriel créé pour ${slug}.svg (tu pourras aussi glisser ta propre photo ${slug}.jpg dans site/recitateurs/)`);
    }
  }
}

// ============================================================================
// 2. MISE À JOUR DE GENERATEUR.JS : CHEMINS RELATIFS DES PHOTOS + ALIGNEMENT HAMIDULLAH
// ============================================================================
function mettreAJourGenerateur() {
  let code = fs.readFileSync(fichierGen, 'utf8');

  // A. Corriger le chemin `/recitateurs/` en `recitateurs/` (chemin relatif pour fonctionner en local et en ligne) + ajouter 'svg' aux extensions
  code = code.replace(
    `var exts = ['jpg', 'jpeg', 'png', 'webp'];`,
    `var exts = ['jpg', 'jpeg', 'png', 'webp', 'svg'];`
  );
  code = code.replace(/src="\/recitateurs\//g, 'src="recitateurs/');
  code = code.replace(/img\.src = '\/recitateurs\/'/g, "img.src = 'recitateurs/'");

  // B. Remplacer la fonction traduireGlossaireVerset par le moteur d'alignement direct sur la phrase de Muhammad Hamidullah
  const debutAncienGlossaire = `    // Mot à mot calé sur la traduction de Hamidullah : une entrée par verset, un texte par mot arabe (même nombre de mots).`;
  const finAncienGlossaire = `      mots.forEach((w, index) => { w.tradLocalisee = traductions[index]; });\n    }`;

  const idxDebut = code.indexOf(debutAncienGlossaire);
  const idxFin = code.indexOf(finAncienGlossaire);

  if (idxDebut === -1 || idxFin === -1) {
    console.error('❌ Impossible de localiser traduireGlossaireVerset dans generateur.js.');
    process.exit(1);
  }

  const nouveauMoteurHamidullah = `    // ============================================================================
    // MOTEUR D'ALIGNEMENT LEXICAL DIRECT SUR LA TRADUCTION DE MUHAMMAD HAMIDULLAH
    // Décortique la phrase exacte de Hamidullah du verset et aligne chaque segment sur le mot arabe correspondant
    // ============================================================================
    const GLOSE_HAMIDULLAH_EXACTE = {
      "1:1": ["Au nom", "d'Allah", "le Tout Miséricordieux", "le Très Miséricordieux"],
      "1:2": ["Louange", "à Allah", "Seigneur", "des mondes"],
      "1:3": ["Le Tout Miséricordieux", "le Très Miséricordieux"],
      "1:4": ["Maître", "du Jour", "de la rétribution"],
      "1:5": ["C'est Toi [Seul]", "que nous adorons", "et c'est Toi [Seul]", "dont nous implorons secours"],
      "1:6": ["Guide-nous", "dans le droit", "chemin"],
      "1:7": ["le chemin", "de ceux que", "Tu as comblés de faveurs", "sur eux", "non pas de ceux", "qui ont encouru Ta colère", "sur eux", "ni", "des égarés"],
      "2:1": ["Alif, Lām, Mīm"],
      "2:2": ["C'est", "le Livre", "au sujet duquel il n'y a aucun", "doute", "en lui", "c'est un guide", "pour les pieux"],
      "2:3": ["qui", "croient", "à l'inconnaissable", "et accomplissent", "la Salât", "et de ce que", "Nous leur avons attribué", "dépensent"],
      "2:4": ["et qui", "croient", "à ce qui", "a été descendu (révélé)", "vers toi", "et à ce qui", "a été descendu", "avant", "toi", "et quant à l'au-delà", "ils", "ont la certitude"],
      "2:5": ["Ceux-là", "sont sur", "le bon chemin", "de", "leur Seigneur", "et ceux-là", "ce sont eux", "qui réussissent"],
      "10:92": ["Nous allons aujourd'hui", "épargner", "ton corps", "afin que tu deviennes", "pour ceux qui", "sont tes successeurs", "un signe", "Cependant", "beaucoup", "de", "gens", "à", "Nos signes (d'avertissement)", "ne prêtent aucune attention"]
    };

    // Stop-words et outils grammaticaux français qui restent rattachés au mot porteur de sens suivant dans la phrase de Hamidullah
    const OUTILS_PROCLITIQUES_FR = new Set([
      "le","la","les","l","un","une","des","du","de","d","au","aux","a","à","en","dans","sur","sous","par","pour","vers","chez","sans","avec","entre","contre",
      "ce","cet","cette","ces","mon","ton","son","ma","ta","sa","mes","tes","ses","notre","votre","leur","nos","vos","leurs",
      "je","tu","il","elle","on","nous","vous","ils","elles","me","te","se","lui","y","leur","qui","que","qu","dont","ou","où",
      "et","ou","ni","mais","car","donc","or","ne","n","pas","point","plus","jamais","aucun","aucune","rien",
      "c","est","sont","etait","étaient","fut","soit","sois","soyons","soyez","avoir","a","ont","avait","avaient","as","avez","avons","ai",
      "tout","toute","tous","toutes","tres","très","plus","moins","si","meme","même","comme","quand","lorsque","afin","puis"
    ]);

    // Racines et synonymes entre le glossaire mot-à-mot anglais de Quran.com et le vocabulaire français de Muhammad Hamidullah
    const PONT_ANGLAIS_HAMIDULLAH_FR = {
      "allah": ["allah", "dieu"],
      "lord": ["seigneur", "maitre"],
      "world": ["monde", "univers"],
      "gracious": ["misericordieux", "tout"],
      "merciful": ["misericordieux", "tres"],
      "praise": ["louange"],
      "master": ["maitre", "souverain", "roi"],
      "day": ["jour"],
      "judgment": ["retribution", "jugement", "religion"],
      "worship": ["adorons", "adorer", "adore", "adorent"],
      "help": ["secours", "implorons", "aide"],
      "guide": ["guide", "chemin", "droite"],
      "path": ["chemin", "voie", "sentier"],
      "straight": ["droit", "droite"],
      "favor": ["faveur", "comble", "bienfait"],
      "anger": ["colere", "encouru"],
      "astray": ["egare", "egares"],
      "book": ["livre", "ecriture"],
      "doubt": ["doute"],
      "righteous": ["pieux", "craignent"],
      "godconscious": ["pieux", "craignent"],
      "believe": ["croient", "croire", "foi", "croyants"],
      "unseen": ["inconnaissable", "invisible", "secret"],
      "establish": ["accomplissent", "accomplir", "observent"],
      "prayer": ["salat", "priere"],
      "provided": ["attribue", "donne", "accorde"],
      "spend": ["depensent", "depenser"],
      "sent": ["descendu", "revele", "envoye"],
      "revealed": ["descendu", "revele"],
      "before": ["avant"],
      "hereafter": ["audela", "future", "dernier"],
      "certain": ["certitude", "fermement", "convaincus"],
      "firmly": ["certitude"],
      "successful": ["reussissent", "succes", "bienheureux"],
      "today": ["aujourdhui"],
      "save": ["epargner", "sauver", "delivrer"],
      "body": ["corps"],
      "succeed": ["successeurs", "apres", "viendront"],
      "sign": ["signe", "verset", "preuve"],
      "signs": ["signes", "versets"],
      "many": ["beaucoup", "nombreux"],
      "people": ["gens", "hommes", "humanite"],
      "mankind": ["gens", "hommes", "humanite"],
      "heedless": ["inattentifs", "attention", "negligents", "insouciants"]
    };

    function normaliserTexteComparaison(str) {
      return String(str || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    function decoderEntitesHtml(str) {
      const txt = document.createElement('textarea');
      txt.innerHTML = String(str || '');
      return txt.value;
    }

    // Découpe la phrase de Muhammad Hamidullah en groupes grammaticaux naturels (ex: ["C'est", "le Livre", "au sujet duquel", ...])
    function segmenterPhraseHamidullah(phraseBrute, nbCible) {
      let propre = decoderEntitesHtml(phraseBrute)
        .replace(/^\s*\d+\s*[\.\-]\s*/, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (!propre) return [];

      // Sépare les mots tout en gardant la ponctuation attachée
      const tokensMots = propre.split(' ').filter(Boolean);
      if (tokensMots.length <= nbCible) return tokensMots;

      // 1re passe : regroupe les petits mots outils proclitiques (articles, prépositions, pronoms, négations) avec le mot fort qui les suit
      const groupes = [];
      let tampon = [];

      for (let i = 0; i < tokensMots.length; i++) {
        const tok = tokensMots[i];
        const sousMots = tok.split(/['’]/).map(s => normaliserTexteComparaison(s)).filter(Boolean);
        const dernierSousMot = sousMots[sousMots.length - 1] || '';
        const tousOutils = sousMots.length > 0 && sousMots.every(sm => OUTILS_PROCLITIQUES_FR.has(sm));
        const finitParPonctuationForte = /[,.;:!?\]\)]$/.test(tok);

        tampon.push(tok);

        // On ferme le groupe dès qu'on atteint un mot porteur de sens (nom, verbe, adjectif) ou une ponctuation, sauf s'il reste juste le bon nombre de tokens
        const tokensRestants = tokensMots.length - 1 - i;
        const groupesManquants = nbCible - (groupes.length + 1);

        if (tokensRestants <= groupesManquants) {
          groupes.push(tampon.join(' '));
          tampon = [];
        } else if ((!tousOutils && !OUTILS_PROCLITIQUES_FR.has(dernierSousMot)) || finitParPonctuationForte || tampon.length >= 4) {
          groupes.push(tampon.join(' '));
          tampon = [];
        }
      }
      if (tampon.length > 0) {
        if (groupes.length > 0) groupes[groupes.length - 1] += ' ' + tampon.join(' ');
        else groupes.push(tampon.join(' '));
      }

      // 2e passe : ajuste exactement au nombre de mots arabes du verset (fusionne les groupes les plus courts si groupes.length > nbCible)
      while (groupes.length > nbCible && groupes.length > 1) {
        let minIdx = 0;
        let minLongueur = Infinity;
        for (let i = 0; i < groupes.length - 1; i++) {
          const score = groupes[i].length + groupes[i + 1].length;
          if (score < minLongueur) {
            minLongueur = score;
            minIdx = i;
          }
        }
        groupes.splice(minIdx, 2, groupes[minIdx] + ' ' + groupes[minIdx + 1]);
      }

      return groupes;
    }

    // Calcule un score de correspondance sémantique entre un mot arabe (et son sens de référence) et un segment de la phrase de Hamidullah
    function scoreCorrespondanceHamidullah(motObj, segmentHamidullah, posNormMot, posNormSeg) {
      const segNorm = normaliserTexteComparaison(segmentHamidullah);
      const motsSeg = segNorm.split(' ').filter(Boolean);
      let score = 0;

      // 1. Vérifie avec le dictionnaire coranique exact si présent
      const u = motObj.text_uthmani || '';
      const sq = squeletteSansVoyelles(u);
      const refDirecte = (DICO_CORAN_EXACT[u] && DICO_CORAN_EXACT[u].fr) || (DICO_CORAN_EXACT[sq] && DICO_CORAN_EXACT[sq].fr) || '';
      if (refDirecte) {
        const refMots = normaliserTexteComparaison(refDirecte).split(' ').filter(x => x.length >= 3);
        refMots.forEach(rm => {
          if (segNorm.includes(rm)) score += 6;
        });
      }

      // 2. Vérifie via le pont lexical Anglais -> Vocabulaire de Hamidullah
      const glossEn = (motObj.translation && motObj.translation.text) ? normaliserTexteComparaison(motObj.translation.text) : '';
      const enTokens = glossEn.split(' ').filter(Boolean);
      enTokens.forEach(et => {
        const ciblesFr = PONT_ANGLAIS_HAMIDULLAH_FR[et] || [];
        ciblesFr.forEach(cf => {
          if (motsSeg.some(ms => ms.startsWith(cf) || cf.startsWith(ms))) {
            score += 5;
          }
        });
        // Racines transparentes franco-anglaises (ex: "religion", "sign", "corps", "guide", "pardon", "misericorde", "livre", "doute")
        if (et.length >= 4) {
          const debut4 = et.slice(0, 4);
          if (motsSeg.some(ms => ms.length >= 4 && ms.slice(0, 4) === debut4)) {
            score += 4;
          }
        }
      });

      // 3. Proximité de position dans le verset (préserve l'ordre naturel de la phrase de Hamidullah)
      const distPos = Math.abs(posNormMot - posNormSeg);
      score += Math.max(0, 2.5 * (1 - distPos));

      return score;
    }

    async function traduireGlossaireVerset(mots, langCible, cleVerset) {
      if (langCible === 'ar') {
        mots.forEach(w => { w.tradLocalisee = ''; });
        return;
      }

      // 1. Si le verset est dans la table d'alignement certifié Hamidullah
      if (langCible === 'fr' && GLOSE_HAMIDULLAH_EXACTE[cleVerset] && GLOSE_HAMIDULLAH_EXACTE[cleVerset].length === mots.length) {
        mots.forEach((w, i) => { w.tradLocalisee = GLOSE_HAMIDULLAH_EXACTE[cleVerset][i]; });
        return;
      }

      // 2. Récupère la traduction officielle affichée sur le site (Hamidullah en FR, Saheeh Intl en EN, Isa García en ES)
      const S = window.SOURATE_DATA;
      const vData = (S && S.versets) ? S.versets[numVersetActuel - 1] : null;
      const phraseOfficielle = vData
        ? (langCible === 'en' ? (vData.tradEn || '') : (langCible === 'es' ? (vData.tradEs || '') : (vData.tradPropre || '')))
        : '';

      // 3. En Français (et Espagnol), on découpe directement la traduction de Muhammad Hamidullah (ou Isa García) pour utiliser 100% son lexique !
      if ((langCible === 'fr' || langCible === 'es') && phraseOfficielle && mots.length > 0) {
        if (mots.length === 1) {
          mots[0].tradLocalisee = decoderEntitesHtml(phraseOfficielle).replace(/^\s*\d+\s*[\.\-]\s*/, '').trim();
          return;
        }

        const segments = segmenterPhraseHamidullah(phraseOfficielle, mots.length);
        if (segments.length > 0) {
          const nbMots = mots.length;
          const nbSegs = segments.length;
          const segDejaPris = new Array(nbSegs).fill(false);

          mots.forEach((w, idxMot) => {
            const u = w.text_uthmani || '';
            const sq = squeletteSansVoyelles(u);
            const posNormMot = nbMots > 1 ? idxMot / (nbMots - 1) : 0;

            // Cherche dans les segments de la phrase de Hamidullah celui qui correspond au mot arabe (dans une fenêtre locale autour de sa position)
            let meilleurIdx = -1;
            let meilleurScore = -1;
            const centreSeg = Math.round(posNormMot * (nbSegs - 1));
            const rayon = Math.max(2, Math.ceil(nbSegs * 0.35));
            const debutFenetre = Math.max(0, centreSeg - rayon);
            const finFenetre = Math.min(nbSegs - 1, centreSeg + rayon);

            for (let j = debutFenetre; j <= finFenetre; j++) {
              if (segDejaPris[j]) continue;
              const posNormSeg = nbSegs > 1 ? j / (nbSegs - 1) : 0;
              const sc = scoreCorrespondanceHamidullah(w, segments[j], posNormMot, posNormSeg);
              if (sc > meilleurScore) {
                meilleurScore = sc;
                meilleurIdx = j;
              }
            }

            // Si tous les segments de la fenêtre étaient pris, on prend le segment libre le plus proche
            if (meilleurIdx === -1) {
              for (let j = 0; j < nbSegs; j++) {
                if (!segDejaPris[j]) { meilleurIdx = j; break; }
              }
            }

            if (meilleurIdx !== -1) {
              segDejaPris[meilleurIdx] = true;
              w.tradLocalisee = segments[meilleurIdx];
            } else {
              w.tradLocalisee = (DICO_CORAN_EXACT[u] && DICO_CORAN_EXACT[u][langCible])
                || (DICO_CORAN_EXACT[sq] && DICO_CORAN_EXACT[sq][langCible])
                || segments[Math.min(idxMot, nbSegs - 1)]
                || '';
            }
          });
          return;
        }
      }

      // 4. Mode Anglais : utilise le glossaire anglais direct
      mots.forEach(w => {
        w.tradLocalisee = (w.translation && w.translation.text) ? w.translation.text : '';
      });
    }`;

  code = code.slice(0, idxDebut) + nouveauMoteurHamidullah + code.slice(idxFin + finAncienGlossaire.length);

  // Vérification syntaxique de generateur.js avant sauvegarde
  try {
    new vm.Script(code);
    console.log('✅ Vérification syntaxique de generateur.js : 100% valide !');
  } catch (err) {
    console.error('❌ Erreur de syntaxe détectée :', err);
    process.exit(1);
  }

  fs.writeFileSync(fichierGen, code, 'utf8');
  console.log('✅ generateur.js mis à jour avec les photos des récitateurs et l\'alignement lexical Muhammad Hamidullah !');
}

(async () => {
  await telechargerPhotosRecitateurs();
  mettreAJourGenerateur();
  console.log('\n👉 Lance maintenant : node generateur.js');
})();
const fs = require('fs');
const path = require('path');

// 1. GENERATION DES PAGES A-PROPOS.HTML ET CONTACT.HTML
const pageAPropos = `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>À propos — INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { background: #050914; color: #f8fafc; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; margin: 0; padding: 24px; line-height: 1.75; }
    .card { max-width: 820px; margin: 40px auto; padding: 40px; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.7); }
    .badge { display: inline-block; background: rgba(56, 189, 248, 0.14); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35); padding: 6px 16px; border-radius: 999px; font-size: 0.82rem; font-weight: 800; }
    h1 { color: #38bdf8; font-size: 1.75rem; font-weight: 800; margin: 18px 0 12px 0; }
    h2 { color: #e2e8f0; font-size: 1.2rem; margin-top: 28px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; }
    p, li { color: #cbd5e1; font-size: 0.96rem; }
    .legal-box { background: rgba(2, 6, 23, 0.65); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 16px; padding: 18px 20px; margin-top: 24px; font-size: 0.88rem; color: #94a3b8; }
    .btn-back { display: inline-block; margin-top: 28px; background: linear-gradient(135deg, #38bdf8, #0ea5e9); color: #021019; text-decoration: none; font-weight: 800; padding: 11px 24px; border-radius: 999px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">⚖️ Association Loi 1901 à but non lucratif</span>
    <h1>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</h1>
    <p>Portail éducatif, linguistique et culturel gratuit et sans publicité commerciale, édité par l'association déclarée <strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong> (RNA : <strong>W343035331</strong> • SIRET : <strong>13288669800019</strong>), dont le siège est situé à Montpellier, France.</p>
    <h2>Notre Mission Éducative & Culturelle</h2>
    <ul>
      <li><strong>Accès universel et multilingue :</strong> Diffuser gratuitement l'étude des textes fondamentaux et des langues (français, arabe, anglais, espagnol, allemand, italien, indonésien, russe).</li>
      <li><strong>Technologie pédagogique :</strong> Proposer un suivi audio mot à mot synchronisé, la visualisation des règles phonétiques de Tajwīd et l'étude chronologique de la Révélation.</li>
      <li><strong>Exégèse et sources vérifiées :</strong> Présenter pour chaque verset le contexte historique de révélation (lieu, époque, circonstances) appuyé sur les sources classiques (<em>Tafsīr Al-Mukhtasar</em>, <em>Ibn Kathīr</em>, <em>Asbāb an-Nuzūl</em>).</li>
    </ul>
    <div class="legal-box">
      <strong>Identifiants officiels :</strong> Association Loi 1901 • RNA : W343035331 • SIREN : 132 886 698 • SIRET : 13288669800019<br>
      <strong>Siège social :</strong> Montpellier, France • <strong>Contact :</strong> <a href="mailto:contact@corantafsir.com" style="color:#38bdf8;">contact@corantafsir.com</a>
    </div>
    <a href="/" class="btn-back">← Retour à l'accueil corantafsir.com</a>
  </div>
</body>
</html>`;

const pageContact = `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact — INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { background: #050914; color: #f8fafc; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; margin: 0; padding: 24px; line-height: 1.75; }
    .card { max-width: 680px; margin: 50px auto; padding: 40px; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 24px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.7); }
    h1 { color: #38bdf8; font-size: 1.7rem; font-weight: 800; margin-bottom: 12px; }
    p { color: #cbd5e1; font-size: 0.96rem; }
    .mail-box { background: rgba(2, 6, 23, 0.75); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 18px; padding: 24px; margin: 26px 0; }
    .mail-link { color: #38bdf8; font-size: 1.25rem; font-weight: 800; text-decoration: none; }
    .btn-back { display: inline-block; margin-top: 18px; background: linear-gradient(135deg, #38bdf8, #0ea5e9); color: #021019; text-decoration: none; font-weight: 800; padding: 11px 24px; border-radius: 999px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Contactez notre Institut</h1>
    <p>Pour toute question pédagogique, linguistique, technique ou institutionnelle concernant le portail <strong>corantafsir.com</strong> :</p>
    <div class="mail-box">
      <div style="font-size:0.85rem;color:#94a3b8;margin-bottom:8px;">Courriel officiel de l'association :</div>
      <a href="mailto:contact@corantafsir.com" class="mail-link">contact@corantafsir.com</a>
    </div>
    <p style="font-size:0.84rem;color:#94a3b8;">
      <strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong><br>
      Association Loi 1901 à but non lucratif • RNA : W343035331 • SIRET : 13288669800019<br>
      Siège : Montpellier, France
    </p>
    <a href="/" class="btn-back">← Retour à l'accueil</a>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'a-propos.html'), pageAPropos, 'utf8');
fs.writeFileSync(path.join(__dirname, 'contact.html'), pageContact, 'utf8');
if (fs.existsSync(path.join(__dirname, 'site'))) {
  fs.writeFileSync(path.join(__dirname, 'site', 'a-propos.html'), pageAPropos, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'site', 'contact.html'), pageContact, 'utf8');
}

// 2. CODE DU STUDIO TIKTOK 9:16 PRO MOTION (EASY-EASE + LIMITEUR + TAFSIR OU/QUAND/POURQUOI/SOURCE)
const codeStudioTikTokPro = `
  /* === LIENS A PROPOS & CONTACT + STUDIO TIKTOK 9:16 PRO MOTION (V120) === */
  var ORDRE_REVELATION_SOURATES = {
    96:{rang:1,lieu:'La Mecque (Grotte de Ḥirāʾ)',quand:'~610 ap. J.-C. (1re révélation)',pourquoi:'Premiers versets révélés au Prophète ﷺ ordonnant la lecture et la connaissance au nom du Créateur.'},
    68:{rang:2,lieu:'La Mecque',quand:'Début de la période mecquoise (~610)',pourquoi:'Défense du Prophète ﷺ face aux accusations de folie et rappel de la noblesse de son caractère.'},
    73:{rang:3,lieu:'La Mecque',quand:'Début de la mission à La Mecque',pourquoi:'Préparation spirituelle par la prière nocturne (Qiyām al-Layl) et la récitation posée du Coran.'},
    74:{rang:4,lieu:'La Mecque',quand:'Début de la prédication publique',pourquoi:'Ordre de se lever pour avertir les hommes et purifier son cœur.'},
    1:{rang:5,lieu:'La Mecque',quand:'Début de l’Islam à La Mecque',pourquoi:'Sourate d’ouverture et pilier de la prière résumant la louange, l’unicité (Tawḥīd) et la demande de guidée.'},
    111:{rang:6,lieu:'La Mecque',quand:'Début de l’appel sur le mont As-Safā',pourquoi:'Réponse à l’hostilité d’Abū Lahab contre l’appel du Prophète ﷺ.'},
    81:{rang:7,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Description saisissante du Jour de la Résurrection et réveil des consciences.'},
    87:{rang:8,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Glorification du Très-Haut et rappel de la purification de l’âme.'},
    92:{rang:9,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Contraste entre la générosité pieuse (inspirée par Abū Bakr) et l’avarice orgueilleuse.'},
    89:{rang:10,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Leçon historique sur la fin des peuples tyrans (ʿĀd, Thamūd, Pharaon) et l’apaisement de l’âme croyante.'},
    93:{rang:11,lieu:'La Mecque',quand:'Après une courte interruption de la Révélation',pourquoi:'Consolation divine au Prophète ﷺ confirmant qu’Allāh ne l’a ni abandonné ni détesté.'},
    94:{rang:12,lieu:'La Mecque',quand:'Juste après Ad-Duḥā',pourquoi:'Apaisement du cœur du Prophète ﷺ et promesse qu’à chaque difficulté succède une facilité.'},
    103:{rang:13,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Synthèse de la réussite humaine : la foi, les œuvres justes, le conseil mutuel de la vérité et de la patience.'},
    100:{rang:14,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Mise en garde contre l’ingratitude de l’homme et son amour excessif des biens terrestres.'},
    108:{rang:15,lieu:'La Mecque',quand:'Suite aux moqueries d’Al-ʿĀṣ ibn Wāʾil',pourquoi:'Annonce du don de l’abondance (Al-Kawthar) au Prophète ﷺ face à ceux qui le disaient sans postérité.'},
    102:{rang:16,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Avertissement contre la course aux richesses qui distrait l’homme jusqu’à la tombe.'},
    107:{rang:17,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Condamnation de ceux qui repoussent l’orphelin, négligent le pauvre et prient par ostentation.'},
    109:{rang:18,lieu:'La Mecque',quand:'Face aux compromis proposés par Quraysh',pourquoi:'Affirmation pacifique mais absolue de l’unicité du culte sans syncrétisme.'},
    105:{rang:19,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Rappel de la protection miraculeuse de la Kaʿbah contre l’armée d’Abraha (l’Année de l’Éléphant, 570).'},
    113:{rang:20,lieu:'La Mecque / Médine',quand:'Protection quotidienne',pourquoi:'Demande de refuge auprès du Seigneur de l’aube contre tous les maux extérieurs et l’envie.'},
    114:{rang:21,lieu:'La Mecque / Médine',quand:'Protection spirituelle',pourquoi:'Demande de protection auprès du Seigneur des hommes contre les insufflations du tentateur.'},
    112:{rang:22,lieu:'La Mecque',quand:'En réponse aux questions sur la nature de Dieu',pourquoi:'Définition pure de l’Unicité divine (At-Tawḥīd), équivalant au tiers du Coran.'},
    53:{rang:23,lieu:'La Mecque',quand:'An 5 de la Prophétie',pourquoi:'Confirmation de la véracité de la révélation transmise par l’ange Jibrīl (Gabriel).'},
    80:{rang:24,lieu:'La Mecque',quand:'Lors de la venue de l’aveugle Ibn Umm Maktūm',pourquoi:'Enseignement divin accordant la priorité à celui qui cherche sincèrement à se purifier.'},
    97:{rang:25,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Révélation de la grandeur de la Nuit du Destin (Laylat al-Qadr), meilleure que mille mois.'},
    91:{rang:26,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Serments cosmiques sur le Soleil et la Lune montrant que la réussite réside dans la purification de l’âme.'},
    85:{rang:27,lieu:'La Mecque',quand:'Période de persécution des premiers croyants',pourquoi:'Soutien aux croyants persécutés à travers le récit des Gens du Fossé (Aṣḥāb al-Ukhdūd).'},
    95:{rang:28,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Création de l’homme dans la plus parfaite harmonie et importance de la foi accompagnée d’œuvres.'},
    106:{rang:29,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Appel adressé à Quraysh pour adorer le Seigneur de la Kaʿbah qui les a nourris et sécurisés.'},
    101:{rang:30,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Tableau du Jour du Fracas et de la pesée des œuvres.'},
    75:{rang:31,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Preuve de la Résurrection et apaisement du Prophète ﷺ lors de la réception de la Révélation.'},
    104:{rang:32,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Avertissement sévère contre la médisance, la calomnie et l’accumulation orgueilleuse de richesses.'},
    77:{rang:33,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Rappel répété de la vérité du Jour du Jugement aux dénégateurs.'},
    50:{rang:34,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Arguments rationnels et cosmiques sur la résurrection des corps après la mort.'},
    90:{rang:35,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'La vraie voie ascendante : affranchir les opprimés, nourrir l’orphelin et le démuni.'},
    86:{rang:36,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Méditation sur l’astre nocturne et l’origine de l’être humain.'},
    54:{rang:37,lieu:'La Mecque',quand:'~5 ans avant l’Hégire',pourquoi:'Révélée lors du prodige de la fission de la Lune et rappel de l’histoire des peuples anciens.'},
    38:{rang:38,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Récits de Dāwūd (David), Sulaymān (Salomon) et Ayyūb (Job) invitant à la patience et au repentir.'},
    7:{rang:39,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Grande fresque de l’histoire des Prophètes face à leurs peuples.'},
    72:{rang:40,lieu:'La Mecque',quand:'Au retour de Ṭāʾif (~619)',pourquoi:'Écoute et foi d’un groupe de djinns ayant entendu la récitation du Coran.'},
    36:{rang:41,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Le « Cœur du Coran » : preuves de l’Unicité, de la mission prophétique et de la Résurrection.'},
    25:{rang:42,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Réponse aux objections des polythéistes et portrait lumineux des Serviteurs du Tout Miséricordieux.'},
    35:{rang:43,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Contemplation des merveilles de la Création divine.'},
    19:{rang:44,lieu:'La Mecque',quand:'Avant l’émigration en Abyssinie (~615)',pourquoi:'Récits de Zakariyyā, Maryam (Marie), ʿĪsā (Jésus) et Ibrāhīm (Abraham), récités devant le Négus.'},
    20:{rang:45,lieu:'La Mecque',quand:'Vers l’an 5-6 de la Prophétie',pourquoi:'Récit de Mūsā (Moïse) qui toucha le cœur de ʿUmar ibn al-Khaṭṭāb lors de sa conversion.'},
    56:{rang:46,lieu:'La Mecque',quand:'1re/2e période mecquoise',pourquoi:'Répartition des hommes en trois groupes au Jour de l’Événement inéluctable.'},
    26:{rang:47,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Consolation du Prophète ﷺ à travers l’histoire de Moïse, Abraham, Noé et des prophètes.'},
    27:{rang:48,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Récit de Sulaymān (Salomon), de la fourmi et de la reine de Saba.'},
    28:{rang:49,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Histoire détaillée de la jeunesse de Moïse et de sa délivrance face à Pharaon.'},
    17:{rang:50,lieu:'La Mecque',quand:'1 an avant l’Hégire (~621)',pourquoi:'Révélée suite au Voyage Nocturne (Al-Isrāʾ) de La Mecque à Jérusalem et grands commandements moraux.'},
    10:{rang:51,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'La miséricorde divine illustrée par le repentir du peuple de Yūnus (Jonas).'},
    11:{rang:52,lieu:'La Mecque',quand:'Année du Chagrin (~619)',pourquoi:'Fermeté sur la droiture à travers les récits de Noé, Hūd, Ṣāliḥ, Abraham, Loth et Chuʿayb.'},
    12:{rang:53,lieu:'La Mecque',quand:'Année du Chagrin (~619-620)',pourquoi:'Le « plus beau des récits » : l’histoire complète de Yūsuf (Joseph), de l’épreuve au pardon et au triomphe.'},
    15:{rang:54,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Promesse divine de préserver intégralement le texte du Coran à travers les siècles.'},
    6:{rang:55,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Fondements du monothéisme pur et réfutation des superstitions préislamiques.'},
    37:{rang:56,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Ordre des anges en rangs et grande épreuve de foi d’Abraham et de son fils.'},
    31:{rang:57,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Conseils pleins de sagesse de Luqmān à son fils : unicité, piété filiale, humilité et prière.'},
    34:{rang:58,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Gratitude envers les bienfaits divins à travers l’exemple de David, Salomon et du royaume de Saba.'},
    39:{rang:59,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Sincérité exclusive du culte (Ikhlāṣ) et vaste appel au repentir sans jamais désespérer de la miséricorde divine.'},
    40:{rang:60,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Plaidoyer du croyant de la famille de Pharaon et pardon accordé par le Pardonneur (Ghāfir).'},
    41:{rang:61,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Répondre au mal par ce qui est meilleur et signes divins dans l’univers et en nous-mêmes.'},
    42:{rang:62,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Unité du message des prophètes, consultation mutuelle (Chūrā) et pardon.'},
    43:{rang:63,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Vraie valeur spirituelle face aux ornements éphémères du monde.'},
    44:{rang:64,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Révélation du Coran lors d’une nuit bénie et avertissement contre l’orgueil.'},
    45:{rang:65,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Signes de Dieu dans les cieux et la terre pour ceux qui méditent.'},
    46:{rang:66,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Bonté envers les parents et avertissement du peuple de ʿĀd à Al-Aḥqāf.'},
    51:{rang:67,lieu:'La Mecque',quand:'1re/2e période mecquoise',pourquoi:'Rappel du but de la création et que la subsistance vient uniquement d’Allāh.'},
    88:{rang:68,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Invitation à observer les chameaux, le ciel élevé, les montagnes et la terre étendue.'},
    18:{rang:69,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Quatre récits fondamentaux (la Caverne, les deux jardins, Moïse & Al-Khiḍr, Dhū al-Qarnayn) face aux épreuves.'},
    16:{rang:70,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'La sourate des Bienfaits (An-Niʿam) : abeilles, nature, justice et reconnaissance envers le Créateur.'},
    71:{rang:71,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Persévérance exemplaire du prophète Nūḥ (Noé) durant des siècles d’appel et d’imploration.'},
    14:{rang:72,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Parabole de la bonne parole pareille à un bel arbre aux racines fermes et aux branches dans le ciel.'},
    21:{rang:73,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Unité de la communauté des Prophètes et envoi du Prophète ﷺ comme miséricorde pour les mondes.'},
    23:{rang:74,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Portrait moral et spirituel des croyants promis à la réussite éternelle (Al-Firdaws).'},
    32:{rang:75,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Humilité des croyants qui se prosternent et invoquent leur Seigneur la nuit.'},
    52:{rang:76,lieu:'La Mecque',quand:'1re/2e période mecquoise',pourquoi:'Preuves irréfutables de la création (« Ont-ils été créés à partir de rien ? »).'},
    67:{rang:77,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Harmonie parfaite de la royauté divine (Al-Mulk) et sens de l’épreuve de la vie et de la mort.'},
    69:{rang:78,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'L’Inévitable vérité du Jugement et authenticité absolue de la Révélation.'},
    70:{rang:79,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Qualités de ceux qui sont préservés de l’inquiétude : prière assidue, aumône, chasteté et respect des engagements.'},
    78:{rang:80,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'La Grande Annonce de la Résurrection et les merveilles de la terre et du ciel.'},
    79:{rang:81,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Dialogue de Moïse avec Pharaon et récompense de celui qui maîtrise les passions de son âme.'},
    82:{rang:82,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Rappel des nobles anges scribes qui consignent chaque action.'},
    84:{rang:83,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Cheminement de l’homme vers la rencontre de son Seigneur.'},
    30:{rang:84,lieu:'La Mecque',quand:'Vers 615 ap. J.-C.',pourquoi:'Annonce prophétique de la victoire future des Romains (Byzantins) et signes divins dans la création.'},
    29:{rang:85,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Sens des épreuves qui vérifient la sincérité de la foi et fragilité des faux appuis comparable à la toile de l’araignée.'},
    83:{rang:86,lieu:'La Mecque / Début Médine',quand:'Au moment de l’Hégire (~622)',pourquoi:'Condamnation de la fraude dans les poids et mesures et justice dans les transactions.'},
    2:{rang:87,lieu:'Médine',quand:'An 1 à 10 de l’Hégire (1re sourate médinoise)',pourquoi:'Fondation de la communauté à Médine : foi, prière, jeûne, pèlerinage, éthique, Verset du Trône (2:255).'},
    8:{rang:88,lieu:'Médine',quand:'An 2 de l’Hégire (après Badr, 624)',pourquoi:'Leçons spirituelles et morales de l’épreuve de Badr : union des cœurs et confiance en Dieu.'},
    3:{rang:89,lieu:'Médine',quand:'An 3 à 9 de l’Hégire (Uḥud & délégation de Najrān)',pourquoi:'Fermeté dans l’épreuve, dialogue avec les Gens du Livre et histoire de la famille de ʿImrān.'},
    33:{rang:90,lieu:'Médine',quand:'An 5 de l’Hégire (bataille du Fossé, 627)',pourquoi:'Épreuve des Coalisés, modèle prophétique parfait et règles d’éthique familiale et sociale.'},
    60:{rang:91,lieu:'Médine',quand:'An 8 de l’Hégire (avant l’ouverture de La Mecque)',pourquoi:'Équité et bonté envers ceux qui ne combattent pas les croyants pour leur foi.'},
    4:{rang:92,lieu:'Médine',quand:'An 3 à 5 de l’Hégire',pourquoi:'Protection des droits des femmes, des orphelins et des faibles, justice absolue et équité.'},
    99:{rang:93,lieu:'Médine',quand:'Début de la période médinoise',pourquoi:'Justice parfaite au Jour dernier : le poids d’un atome de bien ou de mal sera vu.'},
    57:{rang:94,lieu:'Médine',quand:'Milieu de la période médinoise',pourquoi:'Appel au renouvellement de l’humilité du cœur et à la dépense généreuse.'},
    47:{rang:95,lieu:'Médine',quand:'Début de la période médinoise',pourquoi:'Invitation à méditer profondément le Coran et soutien divin à ceux qui défendent la justice.'},
    13:{rang:96,lieu:'Médine',quand:'Période médinoise',pourquoi:'Harmonie des signes cosmiques et rappel que c’est par l’évocation d’Allāh que les cœurs s’apaisent (13:28).'},
    55:{rang:97,lieu:'Médine / La Mecque',quand:'Révélation des bienfaits divins',pourquoi:'Hymne aux grâces innombrables du Tout Miséricordieux dans la nature et l’au-delà (Miracle des deux mers, v.19-20).'},
    76:{rang:98,lieu:'Médine',quand:'Période médinoise',pourquoi:'Sincérité de ceux qui nourrissent le pauvre, l’orphelin et le captif uniquement pour l’amour de Dieu.'},
    65:{rang:99,lieu:'Médine',quand:'Milieu de la période médinoise',pourquoi:'Éthique et dignité en cas de séparation conjugale, et promesse d’une issue favorable à qui craint Dieu.'},
    98:{rang:100,lieu:'Médine',quand:'Période médinoise',pourquoi:'La Preuve évidente : adorer Dieu avec une foi pure, accomplir la prière et acquitter l’aumône.'},
    59:{rang:101,lieu:'Médine',quand:'An 4 de l’Hégire',pourquoi:'Fraternité exemplaire entre Émigrés et Auxiliaires (Anṣār) et sublimes Noms divins finaux (v.22-24).'},
    24:{rang:102,lieu:'Médine',quand:'An 5-6 de l’Hégire',pourquoi:'Préservation de l’honneur, pudeur et célèbre Verset de la Lumière (Āyat an-Nūr, 24:35).'},
    22:{rang:103,lieu:'Médine',quand:'Période médinoise',pourquoi:'Rites et spiritualité du Pèlerinage (Al-Ḥajj) institué depuis Abraham.'},
    63:{rang:104,lieu:'Médine',quand:'An 5-6 de l’Hégire',pourquoi:'Mise en garde contre l’hypocrisie et l’attachement aux biens qui détournent du rappel de Dieu.'},
    58:{rang:105,lieu:'Médine',quand:'Période médinoise',pourquoi:'Révélée lorsque Dieu entendit la plainte de Khawlah bint Thaʿlabah ; omni-science divine et dignité humaine.'},
    49:{rang:106,lieu:'Médine',quand:'An 9 de l’Hégire',pourquoi:'Charte de l’éthique morale : vérifier les informations, réconcilier les frères, bannir le mépris, la suspicion et la médisance.'},
    66:{rang:107,lieu:'Médine',quand:'An 7-8 de l’Hégire',pourquoi:'Appel au repentir sincère (Tawbah Naṣūḥ) et exemples spirituels d’Āsiyah et de Maryam.'},
    64:{rang:108,lieu:'Médine',quand:'Période médinoise',pourquoi:'Confiance en Dieu face aux épreuves et pardon au sein de la famille.'},
    61:{rang:109,lieu:'Médine',quand:'Période médinoise',pourquoi:'Cohérence entre les paroles et les actes et annonce par Jésus de la venue d’Aḥmad.'},
    62:{rang:110,lieu:'Médine',quand:'Période médinoise',pourquoi:'Importance du rassemblement du vendredi et danger de porter le savoir sans le mettre en pratique.'},
    48:{rang:111,lieu:'Médine',quand:'An 6 de l’Hégire (pacte d’Al-Ḥudaybiyah, 628)',pourquoi:'La paix d’Al-Ḥudaybiyah qualifiée de « Victoire éclatante » (Fatḥ Mubīn) et apaisement (Sakīnah) dans les cœurs.'},
    5:{rang:112,lieu:'Médine',quand:'An 10 de l’Hégire (Pèlerinage d’Adieu)',pourquoi:'Respect des engagements, sacralité de la vie humaine (5:32) et parachèvement du message (5:3).'},
    9:{rang:113,lieu:'Médine',quand:'An 9 de l’Hégire',pourquoi:'Sincérité des croyants et acceptation du repentir de ceux qui reviennent vers Dieu.'},
    110:{rang:114,lieu:'Médine (Minā)',quand:'An 10 de l’Hégire (Dernière sourate complète révélée)',pourquoi:'Annonce de l’accomplissement de la mission du Prophète ﷺ et appel final à la louange et au pardon.'}
  };

  function injecterLiensFooterPropres() {
    var tousBtns = document.querySelectorAll('button, a');
    var btnMentions = null;
    for (var i = 0; i < tousBtns.length; i++) {
      var t = (tousBtns[i].textContent || '').trim();
      if (/Mentions\\s+l[ée]gales/i.test(t)) { btnMentions = tousBtns[i]; break; }
    }
    if (btnMentions && btnMentions.parentElement && !document.getElementById('wbwInstitutionalLinksV120')) {
      var wrap = document.createElement('span');
      wrap.id = 'wbwInstitutionalLinksV120';
      wrap.style.cssText = 'display:inline-flex;align-items:center;gap:10px;margin-left:10px;flex-wrap:wrap;justify-content:center;';
      var stylePill = 'background:rgba(15,23,42,0.75);color:#cbd5e1;border:1px solid rgba(56,189,248,0.28);padding:6px 14px;border-radius:999px;font-size:0.78rem;font-weight:700;text-decoration:none;transition:all 0.2s ease;display:inline-flex;align-items:center;gap:5px;';
      wrap.innerHTML =
        '<a href="/a-propos.html" style="' + stylePill + '">🏛️ À propos</a>' +
        '<a href="/contact.html" style="' + stylePill + '">✉️ Contact</a>';
      btnMentions.parentElement.insertBefore(wrap, btnMentions.nextSibling);
    }
  }

  function extraireTafsirDuVersetActuel() {
    var frEl = document.getElementById('frenchVerseEl') || document.querySelector('.french-glow-verse');
    var trad = frEl ? (frEl.textContent || '').replace(/^\\s*\\d+\\s*[\\.:\\-]\\s*/, '').trim() : '';

    var tafsirBrut = '';
    var selecteursTafsir = ['#tafsirContent', '#tafsirText', '#tafsirBox', '.tafsir-content', '.tafsir-text', '.tafsir-body'];
    for (var s = 0; s < selecteursTafsir.length; s++) {
      var el = document.querySelector(selecteursTafsir[s]);
      if (el && (el.textContent || '').trim().length > 25) {
        tafsirBrut = (el.textContent || '').trim();
        break;
      }
    }
    if (!tafsirBrut) {
      var blocs = document.querySelectorAll('div, section, article, p');
      for (var b = 0; b < blocs.length; b++) {
        var txt = (blocs[b].textContent || '').trim();
        if (blocs[b].children.length <= 4 && txt.length > 45 && txt.length < 1200 && /Tafs[iī]r|Ex[ée]g[èe]se|Ibn\\s+Kath|Mukhtasar|signifie|All[aā]h\\s+informe/i.test(txt)) {
          tafsirBrut = txt;
          break;
        }
      }
    }
    tafsirBrut = tafsirBrut.replace(/^(?:Tafs[iī]r|Ex[ée]g[èe]se)[^:]*:\\s*/i, '').replace(/\\s{2,}/g, ' ').trim();
    if (tafsirBrut.length > 260) {
      var coupe = tafsirBrut.slice(0, 255);
      var dernierPoint = Math.max(coupe.lastIndexOf('.'), coupe.lastIndexOf('!'), coupe.lastIndexOf('?'), coupe.lastIndexOf(';'));
      tafsirBrut = (dernierPoint > 110 ? coupe.slice(0, dernierPoint + 1) : (coupe + '…'));
    }
    return { trad: trad, tafsir: tafsirBrut };
  }

  function creerBoutonTikTokStudioV120() {
    var estPageSourate = /sourate-\\d+/i.test(window.location.pathname) || Boolean(document.querySelector('#arabicVerse, #arabicVerseEl, .arabic-glow-verse'));
    if (!estPageSourate || document.getElementById('wbwTikTokStudioBtnV120')) return;
    var cible = document.getElementById('wbwAudioRangeBtnV110') || document.querySelector('.rp-btn') || document.getElementById('playSyncBtn');
    if (!cible || !cible.parentElement) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'wbwTikTokStudioBtnV120';
    btn.innerHTML = '🎬 Studio TikTok 9:16';
    btn.style.cssText = 'background:linear-gradient(135deg,rgba(14,165,233,0.22),rgba(236,72,153,0.22));color:#f8fafc;border:1px solid rgba(56,189,248,0.55);padding:6px 14px;border-radius:11px;font-family:inherit;font-size:0.81rem;font-weight:800;cursor:pointer;margin-left:6px;display:inline-flex;align-items:center;gap:6px;box-shadow:0 0 14px rgba(56,189,248,0.25);';
    btn.onclick = ouvrirConfigStudioTikTokV120;
    cible.parentElement.insertBefore(btn, cible.nextSibling);
  }

  function ouvrirConfigStudioTikTokV120() {
    var old = document.getElementById('wbwTikTokConfigModalV120');
    if (old) old.remove();

    var info = obtenirInfosSourateEtVerset();
    var metaRev = ORDRE_REVELATION_SOURATES[info.s] || { rang: info.s, lieu: 'Révélation coranique', quand: 'Époque prophétique', pourquoi: 'Méditation et enseignement des versets.' };
    var endAuto = Math.min(info.totalV, info.v + (info.totalV <= 15 ? info.totalV : 9));

    var optsStart = '', optsEnd = '';
    for (var i = 1; i <= info.totalV; i++) {
      optsStart += '<option value="' + i + '"' + (i === info.v ? ' selected' : '') + '>Verset ' + info.s + ':' + i + '</option>';
      optsEnd += '<option value="' + i + '"' + (i === endAuto ? ' selected' : '') + '>Verset ' + info.s + ':' + i + '</option>';
    }

    var mod = document.createElement('div');
    mod.id = 'wbwTikTokConfigModalV120';
    mod.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,23,0.82);backdrop-filter:blur(8px);z-index:100050;display:flex;align-items:center;justify-content:center;padding:16px;font-family:"Plus Jakarta Sans",system-ui,sans-serif;color:#f8fafc;';
    mod.innerHTML =
      '<div style="width:100%;max-width:480px;background:#0f172a;border:1px solid rgba(56,189,248,0.35);border-radius:24px;padding:24px;box-shadow:0 25px 60px rgba(0,0,0,0.85);">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
          '<span style="background:rgba(56,189,248,0.15);color:#38bdf8;padding:4px 12px;border-radius:999px;font-size:0.76rem;font-weight:800;">Révélation n°' + metaRev.rang + '/114 • ' + metaRev.lieu + '</span>' +
          '<button type="button" id="wbwCloseCfgV120" style="background:none;border:none;color:#94a3b8;font-size:1.3rem;cursor:pointer;">✕</button>' +
        '</div>' +
        '<h3 style="margin:0 0 6px 0;font-size:1.18rem;color:#fff;">🎬 Studio TikTok 9:16 (Easy-Ease Pro Motion)</h3>' +
        '<p style="margin:0 0 16px 0;font-size:0.83rem;color:#94a3b8;line-height:1.5;">Sélectionne la plage de versets à partager. Le mode 9:16 synchronise le Mot à Mot, l’audio de Yasser Al-Dosari et le Tafsir complet (Où, Quand, Pourquoi & Source).</p>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">' +
          '<div><label style="display:block;font-size:0.78rem;color:#cbd5e1;margin-bottom:5px;font-weight:700;">Du verset :</label>' +
          '<select id="wbwTkStartV120" style="width:100%;background:#1e293b;color:#fff;border:1px solid rgba(56,189,248,0.35);border-radius:10px;padding:9px;font-weight:700;">' + optsStart + '</select></div>' +
          '<div><label style="display:block;font-size:0.78rem;color:#cbd5e1;margin-bottom:5px;font-weight:700;">Au verset :</label>' +
          '<select id="wbwTkEndV120" style="width:100%;background:#1e293b;color:#fff;border:1px solid rgba(56,189,248,0.35);border-radius:10px;padding:9px;font-weight:700;">' + optsEnd + '</select></div>' +
        '</div>' +
        '<button type="button" id="wbwTkAuto1m30V120" style="width:100%;background:rgba(56,189,248,0.12);color:#38bdf8;border:1px dashed rgba(56,189,248,0.45);border-radius:10px;padding:8px;font-size:0.8rem;font-weight:800;cursor:pointer;margin-bottom:16px;">⚡ Calibrer automatiquement pour 1 min 30 – 2 min (Défi TikTok)</button>' +
        '<div style="display:flex;flex-direction:column;gap:10px;">' +
          '<button type="button" id="wbwTkLaunchCinemaV120" style="background:linear-gradient(135deg,#38bdf8,#0284c7);color:#021019;border:none;border-radius:14px;padding:12px;font-weight:800;font-size:0.92rem;cursor:pointer;">▶️ Lancer l’Animation 9:16 Plein Écran (Sans interface)</button>' +
          '<button type="button" id="wbwTkLaunchRecordV120" style="background:linear-gradient(135deg,#ec4899,#be185d);color:#ffffff;border:none;border-radius:14px;padding:12px;font-weight:800;font-size:0.92rem;cursor:pointer;">🔴 Enregistrer & Télécharger la Vidéo 9:16 (.webm HD + Audio)</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(mod);

    var selS = document.getElementById('wbwTkStartV120');
    var selE = document.getElementById('wbwTkEndV120');
    selS.onchange = function() { if (parseInt(selE.value, 10) < parseInt(selS.value, 10)) selE.value = selS.value; };
    selE.onchange = function() { if (parseInt(selE.value, 10) < parseInt(selS.value, 10)) selS.value = selE.value; };

    document.getElementById('wbwCloseCfgV120').onclick = function() { mod.remove(); };
    document.getElementById('wbwTkAuto1m30V120').onclick = function() {
      var sVal = parseInt(selS.value, 10) || 1;
      var cibleFin = info.totalV <= 18 ? info.totalV : Math.min(info.totalV, sVal + 10);
      selE.value = String(cibleFin);
    };

    document.getElementById('wbwTkLaunchCinemaV120').onclick = function() {
      var v1 = parseInt(selS.value, 10) || 1, v2 = Math.max(v1, parseInt(selE.value, 10) || v1);
      mod.remove();
      demarrerPlayerTikTok916V120(v1, v2, false);
    };
    document.getElementById('wbwTkLaunchRecordV120').onclick = function() {
      var v1 = parseInt(selS.value, 10) || 1, v2 = Math.max(v1, parseInt(selE.value, 10) || v1);
      mod.remove();
      demarrerPlayerTikTok916V120(v1, v2, true);
    };
  }

  function easeOutBackPro(x) {
    var v = Math.max(0, Math.min(1, x || 0));
    var c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(v - 1, 3) + c1 * Math.pow(v - 1, 2);
  }

  function easeInOutCubicPro(x) {
    var v = Math.max(0, Math.min(1, x || 0));
    return v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
  }

  function decouperTexteCanvasPro(ctx, texte, maxW) {
    var mots = (texte || '').split(/\\s+/), lignes = [], cur = '';
    for (var i = 0; i < mots.length; i++) {
      var test = cur ? (cur + ' ' + mots[i]) : mots[i];
      if (ctx.measureText(test).width > maxW && cur) {
        lignes.push(cur);
        cur = mots[i];
      } else {
        cur = test;
      }
    }
    if (cur) lignes.push(cur);
    return lignes;
  }

  function demarrerPlayerTikTok916V120(startV, endV, avecEnregistrementVideo) {
    var aud = document.getElementById('ayahAudio');
    if (!aud) return;

    var btnWbw = trouverBoutonMotAMot();
    if (btnWbw && !estModeMotAMotActif()) btnWbw.click();
    window.__wbwSuiviBoutonActif = true;

    // Création de la scène plein écran 9:16
    var stage = document.createElement('div');
    stage.id = 'wbwTikTokStageV120';
    stage.style.cssText = 'position:fixed;inset:0;background:#02050d;z-index:100100;display:flex;flex-direction:column;align-items:center;justify-content:center;user-select:none;';

    var canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    canvas.style.cssText = 'height:92vh;max-height:940px;width:auto;aspect-ratio:9/16;border-radius:26px;box-shadow:0 0 70px rgba(56,189,248,0.25),0 25px 60px rgba(0,0,0,0.95);border:1px solid rgba(56,189,248,0.3);background:#040814;';
    var ctx = canvas.getContext('2d');

    var ctrlBar = document.createElement('div');
    ctrlBar.style.cssText = 'margin-top:12px;display:flex;align-items:center;gap:14px;font-family:"Plus Jakarta Sans",sans-serif;';
    var lblTimer = document.createElement('span');
    lblTimer.style.cssText = 'color:#7dd3fc;font-size:0.86rem;font-weight:800;';
    lblTimer.textContent = '🎬 Plage ' + startV + ' ➔ ' + endV + ' • 00:00';

    var btnQuitter = document.createElement('button');
    btnQuitter.type = 'button';
    btnQuitter.textContent = avecEnregistrementVideo ? '⏹ Terminer & Télécharger la vidéo' : '✕ Quitter le mode 9:16';
    btnQuitter.style.cssText = 'background:rgba(239,68,68,0.2);color:#fecaca;border:1px solid rgba(239,68,68,0.5);padding:7px 16px;border-radius:999px;font-weight:800;font-size:0.82rem;cursor:pointer;';

    ctrlBar.appendChild(lblTimer);
    ctrlBar.appendChild(btnQuitter);
    stage.appendChild(canvas);
    stage.appendChild(ctrlBar);
    document.body.appendChild(stage);

    // Enregistreur vidéo HD + Audio
    var recorder = null, chunks = [], actif = true, debutMs = performance.now();
    if (avecEnregistrementVideo && typeof MediaRecorder !== 'undefined') {
      try {
        var vStream = canvas.captureStream(60);
        var finalStream = vStream;
        try {
          if (!window.__wbwAudioCtxV120) {
            var AC = window.AudioContext || window.webkitAudioContext;
            window.__wbwAudioCtxV120 = new AC();
            window.__wbwAudioSrcV120 = window.__wbwAudioCtxV120.createMediaElementSource(aud);
            window.__wbwAudioDestV120 = window.__wbwAudioCtxV120.createMediaStreamDestination();
            window.__wbwAudioSrcV120.connect(window.__wbwAudioCtxV120.destination);
            window.__wbwAudioSrcV120.connect(window.__wbwAudioDestV120);
          }
          if (window.__wbwAudioCtxV120.state === 'suspended') window.__wbwAudioCtxV120.resume();
          finalStream = new MediaStream(vStream.getVideoTracks().concat(window.__wbwAudioDestV120.stream.getAudioTracks()));
        } catch (errA) {}
        var mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus') ? 'video/webm;codecs=vp9,opus' : 'video/webm';
        recorder = new MediaRecorder(finalStream, { mimeType: mime, videoBitsPerSecond: 8000000 });
        recorder.ondataavailable = function(e) { if (e.data && e.data.size > 0) chunks.push(e.data); };
        recorder.onstop = function() {
          var blob = new Blob(chunks, { type: 'video/webm' });
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          var inf = obtenirInfosSourateEtVerset();
          a.href = url;
          a.download = 'tiktok-corantafsir-s' + inf.s + '-v' + startV + '-' + endV + '.webm';
          document.body.appendChild(a);
          a.click();
          setTimeout(function() { a.remove(); URL.revokeObjectURL(url); }, 600);
        };
        recorder.start(200);
      } catch (errR) {}
    }

    // Étoiles animées pour le fond cosmique
    var etoiles = [];
    for (var s = 0; s < 90; s++) {
      etoiles.push({ x: Math.random() * 1080, y: Math.random() * 1920, r: 0.7 + Math.random() * 2.1, p: Math.random() * 6.28 });
    }

    var derniereCleTransition = '';
    var tDebutTransitionVerset = performance.now();
    var cacheTafsirVerset = { trad: '', tafsir: '' };

    function fermerStudio() {
      if (!actif) return;
      actif = false;
      etatAudioRange.actif = false;
      if (recorder && recorder.state !== 'inactive') {
        try { recorder.stop(); } catch (e) {}
      }
      if (!aud.paused) aud.pause();
      stage.remove();
    }
    btnQuitter.onclick = fermerStudio;

    // Configurer la plage automatique du verset startV au verset endV
    var infInit = obtenirInfosSourateEtVerset();
    etatAudioRange.actif = true;
    etatAudioRange.sourate = infInit.s;
    etatAudioRange.startV = startV;
    etatAudioRange.endV = endV;
    etatAudioRange.repeatSelMax = 1;
    etatAudioRange.repeatAyahMax = 1;
    etatAudioRange.compteurSel = 1;
    etatAudioRange.compteurAyah = 1;

    if (infInit.v !== startV) {
      naviguerEtJouerVerset(startV);
    } else {
      aud.currentTime = 0;
      var pBtn = document.getElementById('playSyncBtn');
      if (pBtn && aud.paused) pBtn.click();
      else aud.play().catch(function(){});
    }

    var checkFinPlage = function() {
      if (!actif) return;
      var infNow = obtenirInfosSourateEtVerset();
      if (infNow.v >= endV && aud.ended) {
        aud.removeEventListener('ended', checkFinPlage);
        setTimeout(fermerStudio, 600);
      }
    };
    aud.addEventListener('ended', checkFinPlage);

    function dessinerFrameProMotion(now) {
      if (!actif) return;
      if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW(now);

      var inf = obtenirInfosSourateEtVerset();
      var cleV = inf.s + ':' + inf.v;
      if (cleV !== derniereCleTransition) {
        derniereCleTransition = cleV;
        tDebutTransitionVerset = now;
        cacheTafsirVerset = extraireTafsirDuVersetActuel();
      } else if (!cacheTafsirVerset.trad) {
        cacheTafsirVerset = extraireTafsirDuVersetActuel();
      }

      // Animation d'entrée Easy-Ease lors d'un changement de verset (0 -> 1 en 520ms)
      var progEntreeVerset = easeInOutCubicPro(Math.min(1, (now - tDebutTransitionVerset) / 520));
      var decalageYTransition = (1 - progEntreeVerset) * 34;

      // 1. Fond cosmique profond + Soleil & Lune subtils (style corantafsir.com)
      var bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
      bgGrad.addColorStop(0, '#030712');
      bgGrad.addColorStop(0.5, '#071022');
      bgGrad.addColorStop(1, '#03060f');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1920);

      // Halo Soleil (gauche) et Lune (droite)
      var sunGrad = ctx.createRadialGradient(90, 480, 10, 90, 480, 180);
      sunGrad.addColorStop(0, 'rgba(250, 204, 21, 0.22)');
      sunGrad.addColorStop(1, 'rgba(250, 204, 21, 0)');
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 280, 300, 400);

      var moonGrad = ctx.createRadialGradient(990, 620, 10, 990, 620, 160);
      moonGrad.addColorStop(0, 'rgba(241, 245, 249, 0.18)');
      moonGrad.addColorStop(1, 'rgba(241, 245, 249, 0)');
      ctx.fillStyle = moonGrad;
      ctx.fillRect(800, 440, 280, 360);

      for (var stIdx = 0; stIdx < etoiles.length; stIdx++) {
        var st = etoiles[stIdx];
        var alphaSt = 0.25 + 0.55 * Math.abs(Math.sin(now * 0.0012 + st.p));
        ctx.fillStyle = 'rgba(186, 230, 253, ' + alphaSt.toFixed(2) + ')';
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Barre supérieure minimaliste : Sourate + Verset + Ordre de Révélation
      var metaRev = ORDRE_REVELATION_SOURATES[inf.s] || { rang: inf.s, lieu: 'Révélation coranique', quand: 'Époque prophétique', pourquoi: 'Méditation et exégèse des versets.' };
      var nomSourateEl = document.querySelector('h1, .surah-title');
      var nomSourate = nomSourateEl ? nomSourateEl.textContent.replace(/\\s+/g, ' ').trim() : ('Sourate ' + inf.s);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
      ctx.beginPath();
      ctx.roundRect(64, 78, 952, 118, 28);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#f8fafc';
      ctx.font = '800 33px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(nomSourate + '  •  Verset ' + inf.s + ':' + inf.v, 540, 128);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Révélation n°' + metaRev.rang + '/114  •  ' + metaRev.lieu + '  •  Plage ' + startV + ' ➔ ' + endV, 540, 168);

      // 3. CŒUR CENTRAL : GRILLE MOT-À-MOT EN ANIMATION AFTER EFFECTS EASY-EASE
      var cartes = obtenirCartesMotAMotUniversel();
      ctx.save();
      ctx.globalAlpha = progEntreeVerset;
      ctx.translate(0, decalageYTransition);

      if (cartes && cartes.length > 0) {
        var totalMots = cartes.length;
        var parLigne = totalMots <= 3 ? totalMots : (totalMots <= 8 ? 4 : (totalMots <= 15 ? 5 : 6));
        var nbLignes = Math.ceil(totalMots / parLigne);
        var espacementY = nbLignes <= 3 ? 215 : (nbLignes === 4 ? 175 : 145);
        var policeAr = nbLignes <= 3 ? 66 : (nbLignes === 4 ? 54 : 44);
        var policeTr = nbLignes <= 3 ? 24 : 20;
        var zoneCentreY = 670;
        var startY = zoneCentreY - ((nbLignes - 1) * espacementY) * 0.5;

        for (var i = 0; i < totalMots; i++) {
          var r = Math.floor(i / parLigne);
          var c = i % parLigne;
          var nbColsLigne = Math.min(parLigne, totalMots - r * parLigne);
          var colW = 940 / nbColsLigne;
          var xMot = 1010 - (c + 0.5) * colW;
          var yMot = startY + r * espacementY;

          var meta = cacheMetaCartes[i];
          var txtAr = (meta && meta.elAr) ? meta.elAr.textContent.trim() : '';
          var txtTr = (meta && meta.elTrad) ? meta.elTrad.textContent.trim() : '';

          var eBrut = lissageE[i] || 0;
          var bBrut = lissageB[i] || 0;
          var ePro = easeOutBackPro(eBrut);

          var scaleMot = 1.0 + 0.16 * ePro;
          var liftY = -16 * ePro;

          ctx.save();
          ctx.translate(xMot, yMot + liftY);
          ctx.scale(scaleMot, scaleMot);

          // Barre de suivi lumineuse au-dessus du mot (style corantafsir.com)
          var barW = Math.min(130, colW * 0.72);
          ctx.fillStyle = 'rgba(148, 163, 184, 0.22)';
          ctx.beginPath();
          ctx.roundRect(-barW * 0.5, -policeAr - 18, barW, 6, 3);
          ctx.fill();

          if (bBrut > 0.05 || eBrut > 0.05) {
            var fillW = barW * Math.min(1, Math.max(eBrut, bBrut));
            ctx.fillStyle = eBrut > 0.2 ? '#38bdf8' : 'rgba(56, 189, 248, 0.65)';
            ctx.beginPath();
            ctx.roundRect(barW * 0.5 - fillW, -policeAr - 18, fillW, 6, 3);
            ctx.fill();
          }

          // Mot Arabe avec glow After Effects
          ctx.font = 'bold ' + policeAr + 'px "Amiri", "Scheherazade New", serif';
          ctx.textAlign = 'center';
          if (eBrut > 0.15) {
            ctx.shadowColor = 'rgba(56, 189, 248, 0.95)';
            ctx.shadowBlur = 28 * eBrut;
            ctx.fillStyle = '#ffffff';
          } else if (bBrut > 0.5) {
            ctx.shadowColor = 'rgba(186, 230, 253, 0.35)';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#f8fafc';
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(203, 213, 225, 0.45)';
          }
          ctx.fillText(txtAr, 0, 0);

          // Traduction sous le mot arabe
          ctx.shadowBlur = 0;
          ctx.font = (eBrut > 0.2 ? '700 ' : '500 ') + policeTr + 'px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = eBrut > 0.2 ? '#38bdf8' : (bBrut > 0.5 ? '#e2e8f0' : 'rgba(148, 163, 184, 0.52)');
          var trCourt = txtTr.length > 22 ? (txtTr.slice(0, 20) + '…') : txtTr;
          ctx.fillText(trCourt, 0, 42);

          ctx.restore();
        }
      }
      ctx.restore();

      // 4. PANNEAU INFÉRIEUR : TRADUCTION + TAFSIR COMPLET (OÙ, QUAND, POURQUOI & SOURCE)
      ctx.save();
      ctx.globalAlpha = progEntreeVerset;
      ctx.translate(0, decalageYTransition * 0.6);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.90)';
      ctx.beginPath();
      ctx.roundRect(56, 1180, 968, 630, 32);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.42)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // A. Traduction du verset en cours
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
      var texteTrad = '« ' + (cacheTafsirVerset.trad || 'Lecture synchronisée du verset...') + ' »';
      var lignesTrad = decouperTexteCanvasPro(ctx, texteTrad, 890).slice(0, 4);
      var curY = 1242;
      for (var lt = 0; lt < lignesTrad.length; lt++) {
        ctx.fillText(lignesTrad[lt], 540, curY);
        curY += 38;
      }

      // Ligne séparatrice fine
      curY += 8;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(110, curY);
      ctx.lineTo(970, curY);
      ctx.stroke();
      curY += 36;

      // B. OÙ & QUAND (Lieu et Époque de la Révélation)
      ctx.textAlign = 'left';
      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('📍 OÙ & QUAND : ' + metaRev.lieu + ' • ' + metaRev.quand, 92, curY);
      curY += 36;

      // C. POURQUOI & TAFSIR DU VERSET
      ctx.fillStyle = '#facc15';
      ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('💡 POURQUOI & EXÉGÈSE (TAFSĪR) :', 92, curY);
      curY += 32;

      var explicationCombinee = metaRev.pourquoi;
      if (cacheTafsirVerset.tafsir) {
        explicationCombinee += ' — ' + cacheTafsirVerset.tafsir;
      }
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
      var lignesTafsir = decouperTexteCanvasPro(ctx, explicationCombinee, 890).slice(0, 6);
      for (var lf = 0; lf < lignesTafsir.length; lf++) {
        ctx.fillText(lignesTafsir[lf], 92, curY);
        curY += 31;
      }

      // D. SOURCES AUTHENTIQUES + SIGNATURE DU SITE
      ctx.textAlign = 'center';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 19px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('📚 Sources : Tafsīr Al-Mukhtasar • Tafsīr Ibn Kathīr • Asbāb an-Nuzūl (Al-Wāhidī / As-Suyūtī)', 540, 1752);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('corantafsir.com', 540, 1790);

      ctx.restore();

      // Mise à jour du chronomètre (objectif 1 min – 2 min)
      var secTot = Math.floor((now - debutMs) / 1000);
      var mm = String(Math.floor(secTot / 60)).padStart(2, '0');
      var ss = String(secTot % 60).padStart(2, '0');
      lblTimer.textContent = '🎬 Verset ' + inf.s + ':' + inf.v + ' (Plage ' + startV + '➔' + endV + ') • Durée : ' + mm + ':' + ss;

      requestAnimationFrame(dessinerFrameProMotion);
    }

    requestAnimationFrame(dessinerFrameProMotion);
  }
`;

// 3. MISE A JOUR PROPRE DE PATCH-MOT-A-MOT.JS SANS DOUBLON NI CORRUPTION
const cheminPatch = path.join(__dirname, 'patch-mot-a-mot.js');
if (!fs.existsSync(cheminPatch)) {
  console.error('Erreur : patch-mot-a-mot.js introuvable.');
  process.exit(1);
}

let patchTxt = fs.readFileSync(cheminPatch, 'utf8');

// Nettoyage de tout code expérimental précédent
patchTxt = patchTxt.replace(/\/\*\s*---\s*AJOUT AUTOMATIQUE PARTAGE[\s\S]*$/g, '');
patchTxt = patchTxt.replace(/\/\*\s*---\s*GENERATEUR DE VIDEO TIKTOK DIRECT[\s\S]*$/g, '');
patchTxt = patchTxt.replace(/\/\*\s*---\s*MOTEUR VIDEO TIKTOK 9:16[\s\S]*?function verifierChangementVersetEtPause\(\)\s*\{\s*creerBoutonTikTokV119\(\);/g, 'function verifierChangementVersetEtPause() {');
patchTxt = patchTxt.replace(/\/\*\s*===\s*LIENS A PROPOS & CONTACT \+ STUDIO TIKTOK 9:16 PRO MOTION \(V120\)[\s\S]*?function verifierChangementVersetEtPause\(\)\s*\{\s*injecterLiensFooterPropres\(\);\s*creerBoutonTikTokStudioV120\(\);/g, 'function verifierChangementVersetEtPause() {');

// Injection propre dans verifierChangementVersetEtPause
patchTxt = patchTxt.replace(
  'function verifierChangementVersetEtPause() {',
  codeStudioTikTokPro + '\n  function verifierChangementVersetEtPause() {\n    injecterLiensFooterPropres();\n    creerBoutonTikTokStudioV120();'
);

fs.writeFileSync(cheminPatch, patchTxt, 'utf8');
console.log('✅ 1/2 : Pages a-propos.html, contact.html et Studio TikTok 9:16 Pro Motion intégrés dans patch-mot-a-mot.js !');

// 4. EXECUTION AUTOMATIQUE DE PATCH-MOT-A-MOT.JS POUR METTRE A JOUR TOUTES LES PAGES HTML
require(cheminPatch);
console.log('✅ 2/2 : Toutes les pages du site ont été mises à jour sans erreur !');
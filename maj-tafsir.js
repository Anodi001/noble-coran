const fs = require('fs');
const path = require('path');

// ============================================================================
// 0. CONTRÔLEUR D'INTÉGRITÉ & DE TAILLE DU FICHIER (ANTI-COUPURE)
// ============================================================================
const tailleScriptOctets = fs.statSync(__filename).size;
const tailleScriptKo = (tailleScriptOctets / 1024).toFixed(1);
console.log(`📏 Taille détectée de maj-tafsir.js : ${tailleScriptKo} Ko`);

if (tailleScriptOctets < 15000) {
  console.error(`⚠️ ALERTE : Le fichier maj-tafsir.js ne fait que ${tailleScriptKo} Ko (attendu : > 16 Ko) !`);
  console.error(`⚠️ Le code semble avoir été coupé ou est trop court. Vérifie le copier-coller !`);
}

// ============================================================================
// 1. CORRECTIF DÉFINITIF DU MODE SUIVI (FOLLOW) SANS AUCUN CARRÉ (LUEUR PURE)
//    + MASQUAGE DE LA TRADUCTION EN MODE MOT À MOT
// ============================================================================
const pGen = path.join(__dirname, 'generateur.js');
if (fs.existsSync(pGen)) {
  let g = fs.readFileSync(pGen, 'utf8');

  // Remplacer directement dans generateur.js tout fond/bordure sur les mots suivis
  g = g.replace(
    /background\s*:\s*rgba\(\s*250\s*,\s*204\s*,\s*21[^;)]*\)\s*;?/gi,
    'background: transparent !important;'
  );
  g = g.replace(
    /border\s*:\s*1px\s+solid\s+rgba\(\s*250\s*,\s*204\s*,\s*21[^;)]*\)\s*;?/gi,
    'border: none !important;'
  );

  const cssLuminositePure = `
/* PATCH_SUIVI_LUMINOSITE_PURE_V5 */
.arabic-glow-verse span,
#arabicVerse span,
.ar-word-follow,
.ar-word,
.follow-word,
.karaoke-word,
[data-word-index],
[data-widx] {
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  padding: 0 3px !important;
  display: inline-block !important;
  transition: color 0.16s ease, text-shadow 0.16s ease, transform 0.16s ease, filter 0.16s ease !important;
}

/* Quand le mode Suivi est actif : les mots non lus s'assombrissent légèrement pour faire ressortir l'illumination du mot lu */
.arabic-glow-verse.follow-active span:not(.active):not(.speaking),
#arabicVerse.follow-active span:not(.active):not(.speaking) {
  opacity: 0.62 !important;
  filter: brightness(0.85);
}

.arabic-glow-verse span.active,
.arabic-glow-verse span.speaking,
.arabic-glow-verse span.current,
.arabic-glow-verse span.highlight,
#arabicVerse span.active,
.ar-word-follow.active,
.ar-word.active,
.follow-word.active,
.karaoke-word.active,
[data-word-index].active,
[data-widx].active {
  opacity: 1 !important;
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  color: #ffffff !important;
  filter: brightness(1.35) drop-shadow(0 0 12px rgba(56, 189, 248, 0.95)) drop-shadow(0 0 26px rgba(250, 204, 21, 0.9)) !important;
  text-shadow: 0 0 8px #ffffff, 0 0 18px #fde047, 0 0 36px #f59e0b, 0 0 65px rgba(250, 204, 21, 0.95) !important;
  transform: translateY(-4px) scale(1.11) !important;
}

.arabic-glow-verse span.active::after,
#arabicVerse span.active::after,
.ar-word-follow.active::after {
  display: none !important;
}
`;

  g = g.replace(/\/\* PATCH_SUIVI_LUMINOSITE_PURE_V4 \*\/[\s\S]*?(?=\`;\n\nconst MOTEUR_CIEL_JS)/g, '');
  if (!g.includes('/* PATCH_SUIVI_LUMINOSITE_PURE_V5 */')) {
    const idxFinCss = g.indexOf('`;\n\nconst MOTEUR_CIEL_JS');
    if (idxFinCss !== -1) {
      g = g.slice(0, idxFinCss) + '\n' + cssLuminositePure + g.slice(idxFinCss);
    } else {
      g = g.replace('const CSS_COMMUN = `', 'const CSS_COMMUN = `\n' + cssLuminositePure);
    }
  }

  fs.writeFileSync(pGen, g, 'utf8');
  console.log('✅ generateur.js : Suivi par luminosité pure & ombres (0 carré, 0 trait) activé !');
}

// ============================================================================
// 2. BLOC 5 COMPLET ET DÉTAILLÉ (SOURATES 76, 67, 69, 70, 78 + 35, 19, 20)
// ============================================================================
const pMem = path.join(__dirname, 'memoire-site.json');
const tailleAvant = fs.existsSync(pMem) ? fs.statSync(pMem).size : 0;
let mem = fs.existsSync(pMem)
  ? JSON.parse(fs.readFileSync(pMem, 'utf8'))
  : { miracles: {}, tafsirFr: {}, tafsirEn: {}, tafsirEs: {}, tafsirAr: {} };

const tafsirFr = {
  // --- SOURATE 76 : AL-INSĀN (31 versets — Version intégrale enrichie) ---
  "76:1": "<strong style='color:#ffffff;'>L'origine de l'homme et sa création à partir d'une goutte mélangée (v.1-3).</strong><br><br>📜 <strong>Hadith d'Abū Hurayrah (Sahīh Al-Bukhārī n°891 & Sahīh Muslim n°880) :</strong> Le Messager d'Allāh ﷺ avait coutume de réciter lors de la prière de l'aube (<em>Al-Fajr</em>) le jour du vendredi : <em>« Alif, Lām, Mīm. La révélation du Livre »</em> (Sourate As-Sajdah, 32) dans la première unité de prière, et <em>« S'est-il écoulé pour l'homme un laps de temps »</em> (Sourate Al-Insān, 76) dans la seconde, car toutes deux réunissent le rappel de la création d'Adam, de la Résurrection et du rassemblement des serviteurs.",
  "76:2": "<strong style='color:#ffffff;'>L'épreuve de la liberté humaine et les dons de l'ouïe et de la vue (v.2-3) :</strong><br><br>Allāh a créé l'homme d'une goutte de sperme mélangée (issue de l'homme et de la femme), l'a doté de l'ouïe et de la vue pour méditer Ses signes, et lui a clairement indiqué la voie droite : à lui de choisir d'être reconnaissant (croyant) ou ingrat (mécréant).",
  "76:5": "<strong style='color:#ffffff;'>Les coupes du Paradis mêlées de camphre (Kāfūr) et la source des serviteurs d'Allāh (v.5-6) :</strong><br><br>Les vertueux (<em>Al-Abrār</em>) boiront d'une boisson pure alliant la fraîcheur et le parfum exquis du camphre, puisée à une source qu'ils feront jaillir à volonté dans leurs palais.",
  "76:7": "<strong style='color:#ffffff;'>Les qualités des vertueux dans ce bas monde (v.7-10) :</strong><br><br>Ils accomplissent leurs vœux d'obéissance, redoutent un Jour dont le mal sera généralisé, et offrent leur nourriture — malgré l'amour et le besoin qu'ils en ont eux-mêmes — au pauvre, à l'orphelin et au captif, en disant dans leur cœur (selon Ibn ‘Abbās et Mujāhid) : <em>« Nous ne vous nourrissons que pour la Face d'Allāh ; nous n'attendons de vous ni récompense ni remerciement ! »</em>",
  "76:11": "<strong style='color:#ffffff;'>La protection contre le mal de ce Jour et les délices du Paradis (v.11-22) :</strong><br><br>Allāh les préservera de la détresse de la Résurrection, illuminera leurs visages d'éclat et de joie, et les récompensera pour leur patience par des Jardins, des habits de soie, des coupes d'argent cristallines et la source de <em>Salsabīl</em>, en leur disant : <em>« Ceci est pour vous une récompense, et votre effort a été pleinement reconnu ! »</em>",
  "76:23": "<strong style='color:#ffffff;'>La révélation graduée du Coran et l'exhortation à la constance (v.23-31) :</strong><br><br>Allāh exhorte Son Messager ﷺ à endurer avec patience le décret de son Seigneur, à ne jamais obéir au pécheur ou à l'ingrat, à mentionner le Nom de son Seigneur matin et soir, à se prosterner durant la nuit, et conclut que toute volonté humaine dépend de la Volonté d'Allāh, Omniscient et Sage.",

  // --- SOURATE 67 : AL-MULK (30 versets — Version intégrale enrichie) ---
  "67:1": "<strong style='color:#ffffff;'>Béni soit Celui dans la Main de qui est la Royauté absolue (Al-Mulk), et Il est Omnipotent !</strong><br><br>📜 <strong>Hadith d'Abū Hurayrah et d'Ibn Mas‘ūd (At-Tirmidhī n°2891, Abū Dāwūd n°1400 & An-Nasā'ī) :</strong> Le Messager d'Allāh ﷺ a dit : <em>« Il y a dans le Coran une sourate de trente versets qui a intercédé en faveur d'un homme jusqu'à ce qu'il lui soit pardonné : c'est “Béni soit Celui dans la Main de qui est la Royauté” (Sourate Al-Mulk). »</em> Ibn Mas‘ūd précise qu'elle est « La Protectrice » (<em>Al-Māni‘ah</em>) qui préserve du châtiment de la tombe celui qui la récite chaque nuit.",
  "67:2": "<strong style='color:#ffffff;'>La sagesse de la création de la mort et de la vie :</strong><br><br>📜 <strong>Parole d'Al-Fudayl ibn ‘Iyād :</strong> Allāh a créé la mort et la vie afin de vous éprouver pour voir <em>« qui de vous est le meilleur en œuvre (Ahsanu ‘amalā) »</em> — et non pas simplement le plus nombreux en œuvres. Al-Fudayl expliquait que l'œuvre la meilleure est celle qui réunit deux conditions : être <strong>la plus sincère</strong> (vouée à Allāh seul) et <strong>la plus conforme</strong> (à la Sunnah du Prophète ﷺ).",
  "67:3": "<strong style='color:#ffffff;'>L'harmonie parfaite des sept cieux superposés et le rôle des étoiles (v.3-5) :</strong><br><br>Nulle faille ni fissure ne se trouve dans la création du Tout Miséricordieux ; et Allāh a orné le ciel le plus proche de lampes célestes (les étoiles) qui servent aussi de projectiles contre les démons qui tentent d'écouter aux portes du ciel.",
  "67:6": "<strong style='color:#ffffff;'>Le rugissement de la Géhenne et l'aveu des damnés (v.6-11) :</strong><br><br>Lorsque les mécréants y seront jetés, les gardiens de l'Enfer leur demanderont : <em>« Aucun avertisseur ne vous était-il venu ? »</em> Ils répondront avec remords : <em>« Certes oui, un avertisseur nous était venu, mais nous l'avons traité de menteur... Si seulement nous avions écouté ou raisonné, nous ne serions pas parmi les gens de la Fournaise ! »</em>",
  "67:15": "<strong style='color:#ffffff;'>L'invitation à parcourir la Terre et le Hadith de la confiance en Allāh (v.15).</strong><br><br>📜 <strong>Hadith de ‘Umar ibn Al-Khattāb (At-Tirmidhī n°2344 & Ibn Mājah) :</strong> En lien avec ce verset qui ordonne de parcourir la Terre tout en s'en remettant à Allāh pour la subsistance et avec le verset 19 sur le vol des oiseaux, le Prophète ﷺ a dit : <em>« Si vous placiez votre confiance en Allāh comme il se doit, Il vous accorderait votre subsistance comme Il l'accorde aux oiseaux : ils partent le matin le ventre vide et rentrent le soir le ventre plein ! »</em>",
  "67:30": "<strong style='color:#ffffff;'>Le défi final sur le bienfait de l'eau douce :</strong><br><br><em>« Dis : Que vous en semble ? Si votre eau était absorbée dans les profondeurs de la terre, qui donc vous apporterait une eau vive et jaillissante ? »</em> Il est recommandé de répondre en méditant ce verset : <em>« Allāh, le Seigneur des mondes ! »</em>",

  // --- SOURATE 69 : AL-HĀQQAH (52 versets — Version intégrale enrichie) ---
  "69:1": "<strong style='color:#ffffff;'>L'Inéluctable (Al-Hāqqah, v.1-12) :</strong><br><br>La Résurrection est appelée <em>Al-Hāqqah</em> car en elle se réalise la promesse véridique et le jugement certain. Allāh rappelle le sort des Thamūd foudroyés par un cri assourdissant (<em>At-Tāghiyah</em>), des ‘Ād détruits par un vent glacial mugissant durant sept nuits et huit jours consécutifs, de Pharaon et de l'Arche salvatrice de Nūh.",
  "69:13": "<strong style='color:#ffffff;'>Le souffle unique dans la Trompe et les huit Anges porteurs du Trône (v.13-18) :</strong><br><br>Lorsque la terre et les montagnes seront soulevées et pulvérisées d'un seul coup, que le ciel se fendra et que huit Anges immenses porteront ce Jour-là le Trône de ton Seigneur au-dessus d'eux, vous serez exposés au jugement sans qu'aucun secret ne puisse être dissimulé.",
  "69:19": "<strong style='color:#ffffff;'>Le contraste saisissant entre les deux registres (v.19-37) :</strong><br><br>Celui qui recevra son livre dans la main droite s'écriera de joie devant tous : <em>« Tenez ! Lisez mon livre ! J'étais certain que je rencontrerais mon compte ! »</em>, tandis que celui qui le recevra dans la main gauche dira : <em>« Hélas pour moi ! Si seulement on ne m'avait pas remis mon livre !... Ma fortune ne m'a servi à rien et mon pouvoir m'a abandonné ! »</em>",
  "69:40": "<strong style='color:#ffffff;'>Le récit de la conversion de ‘Umar ibn Al-Khattāb en écoutant cette sourate (v.40-52).</strong><br><br>📜 <strong>Hadith de ‘Umar ibn Al-Khattāb (Musnad Ahmad n°107) :</strong> ‘Umar raconta qu'avant son Islam, il sortit un soir pour surveiller le Prophète ﷺ qui priait près de la Ka‘bah. Il entendit le Prophète ﷺ réciter la Sourate Al-Hāqqah. Émerveillé par l'éloquence de ces paroles, ‘Umar se dit en lui-même : <em>« Par Allāh, c'est un poète comme le disent les Qurayshites ! »</em> Au même instant, le Prophète ﷺ récita : <strong>« Et ce n'est point la parole d'un poète, mais vous croyez si peu ! »</strong> (v.41). ‘Umar se dit alors : <em>« C'est donc un devin qui lit dans mes pensées ! »</em> Et le Prophète ﷺ récita aussitôt : <strong>« Ni la parole d'un devin, mais vous réfléchissez si peu ! C'est une Révélation du Seigneur des mondes ! »</strong> (v.42-43) jusqu'à la fin de la sourate. ‘Umar conclut : <em>« C'est à cet instant que l'Islam pénétra profondément dans mon cœur ! »</em>",

  // --- SOURATE 70 : AL-MA‘ĀRIJ (44 versets — Version intégrale enrichie) ---
  "70:1": "<strong style='color:#ffffff;'>Le défi arrogant d'An-Nadr ibn Al-Hārith réclamant le châtiment (v.1-7) :</strong><br><br>📜 <strong>Récit d'Ibn ‘Abbās (An-Nasā'ī & Ibn Jarīr) :</strong> Le polythéiste An-Nadr ibn Al-Hārith avait osé invoquer : <em>« Ô Allāh, si cela est bien la vérité venue de Toi, fais pleuvoir sur nous des pierres du ciel ou fais-nous subir un châtiment douloureux ! »</em> (Sourate 8:32). Allāh révéla alors le début de cette sourate et le fit périr quelques années plus tard à Badr. Les Anges et l'Esprit (Jibrīl) montent vers Allāh en un Jour dont la mesure équivaut à <strong>cinquante mille ans</strong> pour les mécréants, tandis qu'un Hadith d'Abū Sa‘īd Al-Khudrī (Musnad Ahmad) précise que ce Jour sera allégé pour le croyant jusqu'à lui paraître plus court qu'une prière prescrite !",
  "70:11": "<strong style='color:#ffffff;'>La terreur du Jour où le criminel voudrait se racheter en sacrifiant ses enfants, son épouse, son frère et tous les habitants de la terre (v.11-18).</strong>",
  "70:19": "<strong style='color:#ffffff;'>Le remède divin à l'impatience et à l'avarice humaines : les 8 qualités des croyants (v.19-35) :</strong><br><br>L'homme a été créé impatient (abattu dans le malheur et avare dans l'aisance), à l'exception de ceux qui prient avec constance (v.22-23), réservent dans leurs biens un droit connu au mendiant et au démuni (v.24-25), croient au Jour du Jugement (v.26), redoutent le châtiment de leur Seigneur (v.27-28), préservent leur chasteté (v.29-31), respectent leurs dépôts et leurs engagements (v.32), témoignent avec droiture (v.33) et veillent sur leurs prières (v.34-35).",

  // --- SOURATE 78 : AN-NABA' (40 versets — Version intégrale enrichie) ---
  "78:1": "<strong style='color:#ffffff;'>La Grande Nouvelle de la Résurrection et les neuf signes cosmiques (v.1-16) :</strong><br><br>Face aux polythéistes qui s'interrogent avec scepticisme sur la Résurrection (<em>An-Naba' al-‘Adhīm</em> selon Mujāhid et Qatādah), Allāh expose neuf preuves de Sa puissance : la terre étendue comme un berceau, les montagnes ancrées comme des pieux stabilisateurs, la création en couples, le sommeil apaisant, la nuit couvrante, le jour propice aux activités, les sept cieux robustes, l'astre solaire flamboyant et les nuages déversant une eau abondante.",
  "78:17": "<strong style='color:#ffffff;'>Le Jour de la Décision (Yawm al-Fasl), l'embuscade de l'Enfer et le triomphe des pieux (v.17-36) :</strong><br><br>Au son de la Trompe, le ciel s'ouvrira en portes et les montagnes s'évanouiront comme un mirage ; l'Enfer guettera les rebelles qui n'y goûteront ni fraîcheur ni boisson hormis une eau bouillante, tandis que les pieux jouiront des Jardins et des vignes en récompense de leur Seigneur.",
  "78:38": "<strong style='color:#ffffff;'>La majesté du Jour où l'Esprit (Jibrīl) et les Anges se tiendront en rangs silencieux (v.38-40) :</strong><br><br>Nul ne parlera sinon celui à qui le Tout Miséricordieux aura accordé la permission et qui dira la vérité ; et ce Jour-là, le mécréant découvrant les œuvres de ses mains s'écriera : <em>« Hélas pour moi ! Si seulement j'étais poussière ! »</em>",

  // --- SOURATE 35 : FĀTIR (45 versets) ---
  "35:1": "<strong style='color:#ffffff;'>Louange à Allāh, Créateur originel (Fātir) des cieux et de la terre, qui fait des Anges des messagers dotés de deux, trois ou quatre ailes — et davantage selon Sa volonté !</strong>",
  "35:2": "<strong style='color:#ffffff;'>« Ce qu'Allāh accorde aux hommes en miséricorde, nul ne peut le retenir ; et ce qu'Il retient, nul ne peut le relâcher après Lui » :</strong><br><br>📜 <strong>Hadith d'Al-Mughīrah ibn Shu‘bah (Al-Bukhārī n°844 & Muslim n°593) :</strong> Ce verset inspire l'invocation prophétique récitée après chaque prière obligatoire : <em>« Ô Allāh, nul ne peut retenir ce que Tu donnes, et nul ne peut donner ce que Tu retiens ! »</em>",
  "35:5": "<strong style='color:#ffffff;'>« Ô hommes ! La promesse d'Allāh est vérité : que la vie présente ne vous trompe donc pas, et que le Grand Trompeur (Satan) ne vous séduise pas au sujet d'Allāh ! Le diable est pour vous un ennemi : prenez-le donc pour ennemi ! » (v.5-6).</strong>",
  "35:10": "<strong style='color:#ffffff;'>« Quiconque veut la puissance (et l'honneur), c'est à Allāh qu'appartient toute la puissance : vers Lui monte la bonne parole, et Il élève haut la bonne action ! »</strong>",
  "35:15": "<strong style='color:#ffffff;'>« Ô hommes ! C'est vous qui êtes les indigents ayant constamment besoin d'Allāh, tandis qu'Allāh est Celui qui se suffit à Lui-même, le Digne de louange ! »</strong>",
  "35:28": "<strong style='color:#ffffff;'>« Parmi Ses serviteurs, seuls les savants (ceux qui connaissent Sa grandeur à travers Ses signes) craignent véritablement Allāh ! »</strong>",
  "35:32": "<strong style='color:#ffffff;'>Les trois catégories d'héritiers du Coran dans la communauté de Muhammad ﷺ (v.32-35) :</strong><br><br>📜 <strong>Hadith d'Abū ad-Dardā' et commentaire d'Ibn ‘Abbās :</strong> Allāh a fait hériter le Livre à Ses serviteurs élus : <strong>1.</strong> celui qui se fait du tort à lui-même (par quelques péchés tout en gardant la foi), <strong>2.</strong> celui qui se tient sur une voie moyenne (accomplissant les obligations et délaissant les interdits), et <strong>3.</strong> celui qui devance les autres dans les bonnes œuvres par la permission d'Allāh ; et tous trois finiront par entrer dans les Jardins d'Éden par la grâce d'Allāh !",

  // --- SOURATE 19 : MARYAM (98 versets) ---
  "19:1": "<strong style='color:#ffffff;'>L'invocation secrète du Prophète Zakariyyā (Zacharie) et la naissance miraculeuse de Yahyā (Jean-Baptiste, v.1-15) :</strong><br><br>📜 <strong>Récit de Ja‘far ibn Abī Tālib devant le Négus d'Abyssinie (Musnad Ahmad n°1740) :</strong> C'est le début de cette sourate que Ja‘far ibn Abī Tālib récita devant le roi chrétien d'Abyssinie (An-Najāshī) et ses évêques lors de la première émigration : en l'écoutant, le Négus pleura jusqu'à mouiller sa barbe et attesta que cela et ce qu'a apporté Jésus jaillissent d'une seule et même source lumineuse !",
  "19:16": "<strong style='color:#ffffff;'>Le récit pur de Maryam (Marie) et la naissance miraculeuse de ‘Īsā (Jésus, v.16-36) :</strong><br><br>Lorsque Maryam revint vers son peuple portant son enfant, Jésus parla dès le berceau pour défendre l'honneur de sa mère et proclamer le monothéisme pur : <em>« Je suis vraiment le serviteur d'Allāh ! Il m'a donné le Livre et m'a désigné Prophète ; Il m'a rendu béni où que je sois, et m'a recommandé la prière et la Zakāt tant que je vivrai, ainsi que la bonté envers ma mère... Certes, Allāh est mon Seigneur et votre Seigneur : adorez-Le donc ! Voilà le droit chemin ! »</em>",
  "19:41": "<strong style='color:#ffffff;'>Le plaidoyer plein de douceur filiale du Prophète Ibrāhīm (Abraham) auprès de son père Āzar (v.41-50), suivi de l'éloge de Mūsā, Hārūn, Ismā‘īl et Idrīs (v.51-58).</strong>",
  "19:59": "<strong style='color:#ffffff;'>La mise en garde contre l'abandon de la prière et le suivi des passions, suivie de la porte grande ouverte du repentir (v.59-63).</strong>",
  "19:96": "<strong style='color:#ffffff;'>L'amour déposé par Allāh dans les cœurs pour les croyants vertueux.</strong><br><br>📜 <strong>Hadith d'Abū Hurayrah (Sahīh Al-Bukhārī n°3209 & Sahīh Muslim n°2637) :</strong> Au sujet du verset <em>« Ceux qui croient et accomplissent les bonnes œuvres, le Tout Miséricordieux leur accordera Son affection (Wuddā) »</em>, le Prophète ﷺ a dit : <em>« Lorsqu'Allāh aime un serviteur, Il appelle Jibrīl et dit : “J'aime un tel, aime-le donc !” Jibrīl l'aime alors, puis proclame parmi les habitants du ciel : “Allāh aime un tel, aimez-le donc !” Les habitants du ciel l'aiment, puis l'acceptation et l'affection pour lui sont déposées dans le cœur des gens sur la terre ! »</em>"
};

const tafsirEn = {
  "76:1": "<strong style='color:#ffffff;'>Surah Al-Insān: Human Creation & the Reward of the Righteous (v.1–31):</strong><br><br>📜 Recited by the Prophet ﷺ every Friday at the Fajr prayer alongside Surah As-Sajdah (Sahīh Al-Bukhārī #891 & Muslim #880). Highlights the sincerity of the righteous who feed the needy, orphan, and captive solely for Allāh's Face without seeking reward or thanks (v.8–9).",
  "67:1": "<strong style='color:#ffffff;'>Surah Al-Mulk: The Protecting Surah & Reliance upon Allāh (v.1–30):</strong><br><br>📜 The 30-verse surah that intercedes for its reciter and shields from the torment of the grave (At-Tirmidhī #2891). Includes Al-Fudayl ibn ‘Iyād's explanation of <em>'best in deed'</em> (v.2: sincerest and most correct) and the Hadith of ‘Umar on true reliance upon Allāh like the birds (v.15 & 19, At-Tirmidhī #2344).",
  "69:1": "<strong style='color:#ffffff;'>Surah Al-Hāqqah: The Inevitable & the Conversion of ‘Umar ibn Al-Khattāb (v.1–52):</strong><br><br>📜 Contrasts the joy of those given their record in the right hand with the grief of the left hand (v.19–37), and concludes with verses 40–52 which entered the heart of ‘Umar ibn Al-Khattāb when he heard the Prophet ﷺ reciting them by the Ka‘bah (Musnad Ahmad #107).",
  "70:1": "<strong style='color:#ffffff;'>Surah Al-Ma‘ārij: The Ways of Ascent & Qualities of the Believers (v.1–44):</strong><br><br>📜 Revealed regarding An-Nadr ibn Al-Hārith; describes the Day of 50,000 years (made brief for the believer like a single prayer, Ahmad) and the eight noble traits of the prayerful believers (v.22–35).",
  "78:1": "<strong style='color:#ffffff;'>Surah An-Naba': Nine Cosmic Proofs & the Day of Decision (v.1–40):</strong><br><br>Refutes skepticism about the Resurrection through nine signs of creation and depicts the Day when Jibrīl and the angels stand in ranks.",
  "35:1": "<strong style='color:#ffffff;'>Surah Fātir: Originator of the Heavens & Inheritors of the Book (v.1–45):</strong><br><br>📜 Declares that none can withhold Allāh's mercy (v.2, Al-Bukhārī #844), that only the scholars truly fear Allāh (v.28), and describes the three categories of believers who inherit the Quran and enter Paradise by Allāh's grace (v.32–35).",
  "19:1": "<strong style='color:#ffffff;'>Surah Maryam: Zakariyyā, Maryam, ‘Īsā & Divine Love (v.1–98):</strong><br><br>📜 Recited by Ja‘far ibn Abī Tālib before the Negus of Abyssinia who wept at its truth (Ahmad #1740). Relates Jesus speaking in the cradle as Allāh's servant and Prophet (v.30–36), and concludes with verse 96 and the Hadith of Al-Bukhārī (#3209) and Muslim (#2637) on how Allāh places love for His righteous servant in the heavens and on earth."
};

const tafsirEs = {
  "76:1": "<strong style='color:#ffffff;'>Sura Al-Insān: La creación humana y la sinceridad de los justos (v.1–31):</strong><br><br>📜 Recitada por el Profeta ﷺ los viernes en el Fayr (Al-Bukhārī n°891), destaca a quienes alimentan al pobre, al huérfano y al cautivo solo por el Rostro de Allah (v.8–9).",
  "67:1": "<strong style='color:#ffffff;'>Sura Al-Mulk: La Protectora y la confianza en Allah (v.1–30):</strong><br><br>📜 Intercede por quien la recita y protege del castigo de la tumba (At-Tirmidhī n°2891), e incluye el Hadiz de ‘Umar sobre la confianza en Allah como las aves (v.15 y 19).",
  "69:1": "<strong style='color:#ffffff;'>Sura Al-Hāqqah: La Inevitable y el relato de ‘Umar ibn Al-Khattāb (v.1–52):</strong><br><br>📜 Describe la entrega de los libros por la derecha y la izquierda, y las aleyas 40–52 que abrieron el corazón de ‘Umar al Islam junto a la Ka‘bah (Ahmad n°107).",
  "70:1": "<strong style='color:#ffffff;'>Sura Al-Ma‘ārij: Las Vías de Ascenso y las virtudes de los orantes (v.1–44):</strong><br><br>📜 Revelada sobre An-Nadr ibn Al-Hārith, detalla las ocho cualidades de los creyentes constantes en su oración (v.22–35).",
  "78:1": "<strong style='color:#ffffff;'>Sura An-Naba': Nueve signos cósmicos y el Día de la Decisión (v.1–40):</strong><br><br>Expone nueve pruebas de la creación y el Día en que el Espíritu (Yibrīl) y los ángeles estarán en filas.",
  "35:1": "<strong style='color:#ffffff;'>Sura Fātir: El Creador y los herederos del Libro (v.1–45):</strong><br><br>📜 Nadie puede retener la misericordia que Allah abre (v.2, Al-Bukhārī n°844), solo los sabios temen verdaderamente a Allah (v.28), y describe los tres grados de creyentes que heredan el Corán (v.32–35).",
  "19:1": "<strong style='color:#ffffff;'>Sura Maryam: Zakariyyā, María, Jesús y el amor de Allah (v.1–98):</strong><br><br>📜 Recitada por Ya‘far ante el Negus de Abisinia (Ahmad n°1740), relata el milagro de Jesús hablando en la cuna (v.30–36) y el Hadiz de Al-Bukhārī (n°3209) y Muslim (n°2637) en la aleya 96 sobre cómo Allah deposita el amor por el siervo piadoso en los corazones."
};

const tafsirAr = {
  "76:1": "<strong style='color:#ffffff;'>﴿هَلْ أَتَىٰ عَلَى الْإِنسَانِ حِينٌ مِّنَ الدَّهْرِ﴾</strong><br><br>📜 <strong>حديث أبي هريرة في الصحيحين (البخاري 891 ومسلم 880) :</strong> كان النبي ﷺ يقرأ في فجر الجمعة ﴿الم * تَنزِيلُ﴾ السجدة و﴿هَلْ أَتَىٰ عَلَى الْإِنسَانِ﴾ لما جمعتا من خلق آدم وذكر المعاد، وفيها ثناء الله على الأبرار الذين يطعمون المسكين واليتيم والأسير لوجه الله خالصًا ﴿لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا﴾ (آية 1-31).",
  "67:1": "<strong style='color:#ffffff;'>﴿تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ﴾</strong><br><br>📜 <strong>فضل سورة الملك وتفسير الفضيل بن عياض :</strong> هي المانعة المنجية من عذاب القبر التي شفعت لصاحبها حتى غُفر له (الترمذي 2891)، وقال الفضيل في قوله ﴿لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا﴾: أخلصه وأصوبه؛ وفي الآية 15 و19 التوكل على الله مع الأخذ بالأسباب كما في حديث عمر: <strong>«لو أنكم تتوكلون على الله حق توكله لرزقكم كما يرزق الطير»</strong> (الترمذي 2344).",
  "69:1": "<strong style='color:#ffffff;'>﴿الْحَاقَّةُ * مَا الْحَاقَّةُ﴾</strong><br><br>📜 <strong>أهوال القيامة وقصة إسلام عمر بن الخطاب رضي الله عنه :</strong> تصف أهوال النفخة الواحدة وحمل ثمانية من الملائكة العرش يومئذ، وسعادة صاحب اليمين﴿هَاؤُمُ اقْرَءُوا كِتَابِيَهْ﴾ وحسرة صاحب الشمال؛ وفي الآيات (40-52) روى الإمام أحمد (107) عن عمر بن الخطاب كيف استمع لقراءة النبي ﷺ لها عند الكعبة فوقع الإسلام في قلبه.",
  "70:1": "<strong style='color:#ffffff;'>﴿سَأَلَ سَائِلٌ بِعَذَابٍ وَاقِعٍ﴾</strong><br><br>📜 نزلت في النضر بن الحارث حين استعجل العذاب، وفيها ذكر اليوم الذي مقداره خمسون ألف سنة (ويُخفف على المؤمن حتى يكون أخف من صلاة مكتوبة)، وبيان صفات المؤمنين الثمان الناجين من الهلع والجزع (آية 19-35).",
  "78:1": "<strong style='color:#ffffff;'>﴿عَمَّ يَتَسَاءَلُونَ * عَنِ النَّبَإِ الْعَظِيمِ﴾</strong><br><br>📜 إقامة تسع دلائل كونية على البعث والنشور، وبيان يوم الفصل وموقف الروح (جبريل) والملائكة صفًّا لا يتكلمون إلا من أذن له الرحمن وقال صوابًا (آية 1-40).",
  "35:1": "<strong style='color:#ffffff;'>﴿الْحَمْدُ لِلَّهِ فَاطِرِ السَّمَاوَاتِ وَالْأَرْضِ﴾</strong><br><br>📜 تتضمن آية ﴿مَّا يَفْتَحِ اللَّهُ لِلنَّاسِ مِن رَّحْمَةٍ فَلَا مُمْسِكَ لَهَا﴾ (البخاري 844)، وقوله ﴿إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ﴾ (آية 28)، وأصناف ورثة الكتاب الثلاثة من أمة محمد ﷺ (الظالم لنفسه، والمقتصد، والسابق بالخيرات) ودخولهم جنات عدن بفضل الله (آية 32-35).",
  "19:1": "<strong style='color:#ffffff;'>﴿كهيعص * ذِكْرُ رَحْمَتِ رَبِّكَ عَبْدَهُ زَكَرِيَّا﴾</strong><br><br>📜 <strong>قصة جعفر مع النجاشي وحديث المحبة في الصحيحين :</strong> تلاها جعفر بن أبي طالب رضي الله عنه على النجاشي فبكى وقال: «إن هذا والذي جاء به عيسى ليخرج من مشكاة واحدة» (أحمد 1740)، وفيها نطق عيسى عليه السلام في المهد بالعبودية والتوحيد (آية 30-36)، وفي الآية 96 ﴿سَيَجْعَلُ لَهُمُ الرَّحْمَٰنُ وُدًّا﴾ حديث الصحيحين (البخاري 3209 ومسلم 2637) في نداء جبريل بمحبة الله لعبده الصالح ووضع القبول له في الأرض."
};

Object.assign(mem.tafsirFr, tafsirFr);
Object.assign(mem.tafsirEn, tafsirEn);
Object.assign(mem.tafsirEs, tafsirEs);
Object.assign(mem.tafsirAr, tafsirAr);

fs.writeFileSync(pMem, JSON.stringify(mem, null, 2), 'utf8');
const tailleApres = fs.statSync(pMem).size;
console.log(`✅ memoire-site.json mis à jour : ${(tailleAvant / 1024).toFixed(1)} Ko -> ${(tailleApres / 1024).toFixed(1)} Ko (+${((tailleApres - tailleAvant) / 1024).toFixed(1)} Ko) !`);
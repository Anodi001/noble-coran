const fs = require('fs');
const path = require('path');

// ============================================================================
// DOSSIERS DÉTAILLÉS DES MIRACLES & PROPHÉTIES AUTHENTIQUES DU CORAN
// ============================================================================
const MIRACLES = {
  "30:1": {
    titre: "Prophétie Historique & Miracle Linguistique — La victoire des Romains et le pari d'Abū Bakr As-Siddīq",
    resume: "Au moment où l'Empire byzantin (les Romains) venait d'être écrasé par l'Empire perse vers 614, le Coran annonce l'impossible : les Romains vaincus remporteront la victoire dans « quelques années » (Bid‘i sinīn : entre 3 et 9 ans).",
    developpement: `
      <p><strong>1. Le contexte historique (La défaite écrasante des Romains) :</strong> Vers l'an 613-614 après J.-C., les armées perses (adorateurs du feu) dirigées par Chosroès II écrasent les armées byzantines (chrétiennes, Gens du Livre) en Syrie et en Palestine, prenant Jérusalem et poussant l'Empire romain d'Orient au bord de l'effondrement total. À La Mecque, les polythéistes de Quraysh se réjouissent de la victoire des Perses polythéistes et se moquent des musulmans en disant : <em>« De même que nos frères perses ont vaincu les Gens du Livre, nous vous vaincrons ! »</em></p>
      <p><strong>2. Le Hadīth authentique du pari d'Abū Bakr As-Siddīq (qu'Allāh l'agrée) :</strong> L'imam At-Tirmidhī, l'imam Ahmad, At-Tabarī, Al-Qurtubī et Ibn Kathīr rapportent d'après Ibn ‘Abbās et Niyār ibn Mukram Al-Aslamī qu'Allāh révéla alors : <em>« Alif, Lām, Mīm. Les Romains ont été vaincus, dans le pays voisin, et après leur défaite ils seront les vainqueurs, dans quelques années (fī bid‘i sinīn) »</em> (30:1-4).</p>
      <p>Abū Bakr As-Siddīq sortit proclamer ces versets aux polythéistes de La Mecque. Ubayy ibn Khalaf lui lança : <em>« Tu mens, ô Abū Fasil ! Fixons un pari entre nous ! »</em> (Cela eut lieu avant que les paris ne soient interdits en Islam). Ils parièrent dix jeunes chamelles sur un délai de trois ans. Abū Bakr vint en informer le Prophète ﷺ, qui lui dit : <strong>« Qu'as-tu fait ? Le mot arabe "Bid‘" (بِضْع) désigne un nombre compris entre trois et neuf ans ! Retourne le voir, augmente la mise et prolonge le délai jusqu'à neuf ans. »</strong> Abū Bakr porta le pari à cent chamelles pour un délai de neuf ans.</p>
      <p><strong>3. La réalisation exacte de la prophétie :</strong> Sept à neuf ans plus tard (vers 622-624, à l'époque de la bataille de Badr), l'empereur byzantin Héraclius mena une contre-offensive foudroyante et détruisit l'armée perse à Issos et Ninive. Les croyants se réjouirent de cette double victoire, et Abū Bakr remporta les cent chamelles auprès des héritiers d'Ubayy ibn Khalaf (mort après Badr). Le Prophète ﷺ lui ordonna d'en faire aumône aux pauvres.</p>
      <p><strong>4. La précision géographique de « Adnā al-Ard » :</strong> Le terme arabe <em>« Adnā al-Ard »</em> (30:3) possède un double sens en langue arabe : « la terre la plus proche » (de la péninsule arabique, c'est-à-dire le bassin du Jourdain et de la Syrie-Palestine) et « la terre la plus basse » (le bassin de la Mer Morte, situé à plus de 400 mètres sous le niveau de la mer).</p>
    `
  },
  "30:2": {
    titre: "Prophétie Historique — « Les Romains ont été vaincus » (Sourate Ar-Rūm)",
    resume: "Ce verset et les deux suivants annoncent la revanche inattendue des Byzantins sur les Perses dans un délai de 3 à 9 ans (Bid‘i sinīn), prophétie liée au célèbre récit d'Abū Bakr As-Siddīq.",
    developpement: `
      <p><strong>Le défi d'Abū Bakr As-Siddīq face à Quraysh :</strong> Lorsque ce verset fut révélé à La Mecque, personne ne pensait que l'Empire romain d'Orient, ruiné et amputé de l'Égypte, de la Syrie et de la Palestine par les Perses, pourrait se relever. Abū Bakr As-Siddīq engagea un pari de cent chamelles avec Ubayy ibn Khalaf sur la recommandation du Prophète ﷺ qui précisa que le terme <em>« Bid‘i sinīn »</em> (verset 4) désigne une période de 3 à 9 ans. La victoire décisive des Romains survint exactement dans cet intervalle, au moment même où les musulmans remportaient la victoire contre Quraysh.</p>
    `
  },
  "30:3": {
    titre: "Prophétie Historique & Géographique — « Dans le pays voisin, et après leur défaite ils seront les vainqueurs »",
    resume: "L'expression « Adnā al-Ard » désigne la région limitrophe du Levant où eurent lieu les batailles entre Byzantins et Perses, et annonce le renversement total de la guerre.",
    developpement: `
      <p><strong>La promesse divine qui ne faillit jamais :</strong> Dans son Tafsīr, l'imam Ibn Kathīr rapporte d'après Ibn ‘Abbās et ‘Ikrimah que les polythéistes mecquois souhaitaient la victoire des Perses (idolâtres), tandis que les musulmans souhaitaient la victoire des Romains (détenteurs d'un Livre révélé). Allāh annonça la victoire future des Romains dans un délai inférieur à neuf ans, ce qui constitua l'une des preuves éclatantes de la véracité du Prophète Muhammad ﷺ aux yeux des Arabes.</p>
    `
  },
  "30:4": {
    titre: "Miracle Prophétique — « Dans quelques années (Fī bid‘i sinīn)... Et ce jour-là les croyants se réjouiront »",
    resume: "Le mot arabe « Bid‘ » fixe mathématiquement l'échéance entre 3 et 9 ans. Le jour de la victoire des Romains coïncida avec le triomphe des croyants musulmans.",
    developpement: `
      <p><strong>La double réjouissance des croyants :</strong> Les grands exégètes (At-Tabarī, Al-Qurtubī, Ibn Kathīr) rapportent d'après Ibn ‘Abbās, Abū Sa‘īd Al-Khudrī et As-Suddī que la nouvelle de la victoire des Byzantins sur les Perses parvint aux musulmans le jour de la bataille de Badr (ou lors de la trêve d'Al-Hudaybiyyah selon d'autres transmissions), accomplissant à la lettre la parole d'Allāh : <em>« Et ce jour-là, les croyants se réjouiront du secours d'Allah. »</em></p>
    `
  },
  "96:2": {
    titre: "Signe Embryologique — La création de l'homme à partir d'une adhérence ('Alaq)",
    resume: "Le terme arabe « 'Alaq » décrit l'embryon humain qui s'accroche à la paroi de l'utérus maternel et puise dans son sang.",
    developpement: `
      <p><strong>Analyse linguistique et exégétique :</strong> En langue arabe, le mot <em>« 'Alaq »</em> désigne toute chose qui s'accroche et reste suspendue, ainsi que le caillot sanguin et la sangsue qui adhère pour se nourrir du sang. Les exégètes classiques (At-Tabarī, Al-Qurtubī, Ibn Kathīr) expliquent qu'après le stade de la goutte (<em>Nutfah</em>), l'embryon s'accroche fermement à la paroi de l'utérus de la femme, description d'une précision remarquable révélée dès les tout premiers versets du Coran.</p>
    `
  },
  "96:15": {
    titre: "Signe Anatomique — Le toupet / la région frontale « menteuse et fautive » (An-Nāsiyah)",
    resume: "Le Coran désigne la zone située derrière le front (An-Nāsiyah) comme étant « menteuse et pécheresse ».",
    developpement: `
      <p><strong>Précision du texte coranique :</strong> Dans les versets 15 et 16 de la Sourate Al-‘Alaq, Allāh dit à propos d'Abū Jahl : <em>« Nous le saisirons certes par le toupet (An-Nāsiyah), un toupet menteur et pécheur ! »</em> Au lieu de qualifier la personne entière ou sa langue de menteuse, le texte cible spécifiquement la région frontale supérieure du crâne (<em>Nāsiyah</em>), siège de l'élaboration des décisions, du mensonge et de l'obstination.</p>
    `
  },
  "23:14": {
    titre: "Signe Embryologique — Les étapes successives de la formation du fœtus",
    resume: "Description chronologique des stades : goutte (Nutfah), adhérence ('Alaqah), morceau de chair mâchée (Mudghah), ossature ('Idhām) puis enveloppement par la chair (Lahm).",
    developpement: `
      <p><strong>L'ordre exact des stades embryonnaires :</strong> Ce verset détaille avec une terminologie précise la transformation graduelle dans l'utérus : de la goutte (<em>Nutfah</em>) à l'adhérence (<em>'Alaqah</em>) qui s'implante dans la paroi utérine, puis à la <em>Mudghah</em> (substance ayant l'aspect d'une chair mâchée portant l'empreinte des dents, semblable aux somites de l'embryon), suivie de la formation du squelette cartilagineux puis de son habillage par les muscles.</p>
    `
  },
  "10:92": {
    titre: "Signe Historique — La sauvegarde du corps de Pharaon comme signe pour les générations futures",
    resume: "« Aujourd'hui, Nous sauvons ton corps afin que tu sois un signe pour ceux qui viendront après toi. »",
    developpement: `
      <p><strong>Le récit d'Ibn ‘Abbās dans les Tafsīrs :</strong> L'imam Ibn Kathīr et l'imam At-Tabarī rapportent d'après Ibn ‘Abbās que certains parmi les Enfants d'Israël doutaient de la mort de Pharaon. Allāh ordonna alors à la mer de rejeter son corps sans vie, revêtu de sa cuirasse, sur une hauteur du rivage afin que tous puissent constater sa mort et que sa dépouille demeure préservée comme une leçon à travers les siècles.</p>
    `
  },
  "55:19": {
    titre: "Signe Maritime — La barrière invisible (Barzakh) entre les deux mers",
    resume: "« Il a donné libre cours aux deux mers pour se rencontrer ; il y a entre elles une barrière qu'elles ne dépassent pas. »",
    developpement: `
      <p><strong>Les deux masses d'eau qui ne se confondent pas :</strong> Dans les versets 19 et 20 de la Sourate Ar-Rahmān (ainsi que dans Sourate Al-Furqān 25:53), Allāh décrit la rencontre entre deux masses d'eau (l'une douce et l'autre salée, ou deux mers contiguës) maintenues distinctes par une séparation (<em>Barzakh</em>) établie par la puissance divine afin que l'une n'altère pas la nature de l'autre.</p>
    `
  },
  "111:1": {
    titre: "Prophétie Éclatante — La fin d'Abū Lahab annoncée dix ans à l'avance",
    resume: "La Sourate Al-Masad annonce qu'Abū Lahab mourra dans la mécréance, alors qu'il aurait suffi à ce dernier de prononcer une fausse conversion en dix ans pour tenter de contredire le Coran.",
    developpement: `
      <p><strong>La preuve soulignée par les savants :</strong> Les exégètes (dont Al-Qurtubī et Ibn Kathīr) font remarquer que cette sourate fut révélée à La Mecque plus de dix ans avant la mort d'Abū Lahab (survenue peu après la bataille de Badr). Durant toute cette décennie, Abū Lahab cherchait par tous les moyens à démentir le Prophète ﷺ. Il lui aurait suffi de déclarer publiquement (même par hypocrisie) : <em>« Je suis devenu musulman ! »</em> pour prétendre que le Coran s'était trompé. Pourtant, il ne put jamais le faire et mourut exactement comme le Coran l'avait décrété.</p>
    `
  },
  "54:1": {
    titre: "Miracle Prophétique — La fente de la Lune (Inshiqāq Al-Qamar)",
    resume: "« L'Heure approche et la Lune s'est fendue. » Miracle observé à La Mecque et attesté par des chaînes de transmission multiples (Mutawātir).",
    developpement: `
      <p><strong>Les témoignages authentiques (Al-Bukhārī & Muslim) :</strong> Les imams Al-Bukhārī, Muslim, At-Tabarī et Ibn Kathīr rapportent par des voies multiples d'après ‘Abdullāh ibn Mas‘ūd, Anas ibn Mālik, Jubayr ibn Mut‘im et Ibn ‘Abbās que les habitants de La Mecque demandèrent au Prophète ﷺ un signe céleste. La Lune se fendit alors en deux parties distinctes, une moitié d'un côté de la montagne de Hirā' et l'autre moitié de l'autre côté, et le Prophète ﷺ leur dit : <em>« Soyez-en témoins ! »</em></p>
    `
  }
};

// ============================================================================
// SYNTHÈSES CLASSIQUES (AT-TABARĪ, AL-QURTUBĪ, IBN KATHĪR, LE LAURIER)
// ============================================================================
const SYNTHESE_LAURIER_EXEGESE = {
  "1:1": "Étymologie & Exégèse : Le nom « Allāh » est le nom propre de l'Essence divine réunissant tous les attributs de perfection. « Ar-Rahmān » (le Tout-Miséricordieux) désigne Celui dont la miséricorde englobe toutes les créatures dans ce monde, tandis que « Ar-Rahīm » (le Très-Miséricordieux) désigne Celui qui réserve Sa miséricorde particulière aux croyants dans l'Au-delà.",
  "1:2": "Exégèse classique (« Rabb al-‘Ālamīn » — Seigneur des mondes) : Les exégètes (At-Tabarī, Al-Qurtubī, Ibn Kathīr) expliquent qu'« Al-‘Ālamīn » est le pluriel de « ‘Ālam » (monde) et désigne l'ensemble des créatures d'ici-bas et de l'Au-delà (le monde des hommes, le monde des djinns, le monde des anges). C'est pourquoi la traduction fidèle de Muhammad Hamidullah (édition originale 1977) traduit ce terme par « Seigneur des mondes » et non « de l'univers ».",
  "2:1": "Ces lettres isolées (Alif, Lām, Mīm) placées en ouverture de vingt-neuf sourates appartiennent au secret d'Allāh et démontrent le miracle inimitable du Coran : bien qu'il soit composé des mêmes lettres arabes que celles utilisées par les hommes dans leur langage quotidien, nul ne peut produire un livre semblable.",
  "2:22": "Tafsīr d'At-Tabarī & d'Al-Qurtubī : Dans son Jāmi‘ Al-Bayān, l'imam At-Tabarī rapporte d'après Ibn ‘Abbās, Ibn Mas‘ūd et Mujāhid que « Firāshan » signifie qu'Allāh a fait de la Terre un lit étendu, un tapis plat et stable sur lequel les hommes marchent, s'installent et dorment. L'imam Al-Qurtubī ajoute que le ciel a été érigé au-dessus d'elle comme un « Binā' » (un dôme et un toit élevé dressé au-dessus de la Terre).",
  "2:255": "Verset du Trône (Āyat Al-Kursī) : Il s'agit du plus grand verset du Coran. Le terme « Al-Hayy » désigne le Vivant par essence dont la vie est éternelle, et « Al-Qayyūm » désigne Celui qui subsiste par Lui-même et par qui subsistent toutes les créatures des cieux et de la terre.",
  "6:1": "Étymologie & Exégèse : Allāh emploie le verbe « Khalaqa » (créer à partir du néant et déterminer avec mesure) pour les cieux et la terre, et le verbe « Ja‘ala » (établir, disposer) pour les ténèbres et la lumière. Les ténèbres sont mentionnées au pluriel (Zulumāt) car les voies de l'égarement sont multiples, tandis que la lumière (Nūr) est mentionnée au singulier car la voie de la Vérité est unique.",
  "13:3": "Tafsīr d'At-Tabarī & d'Al-Qurtubī : L'imam At-Tabarī explique sous la parole « Wa huwa alladhī madda al-ard » : C'est Allāh qui a étendu la Terre à plat en longueur et en largeur, et y a posé des montagnes fermement ancrées (Rawāsiya) comme des pieux afin qu'elle demeure immobile pour ses habitants.",
  "15:19": "Tafsīr d'At-Tabarī & d'Al-Qurtubī : Commentant « Wa al-arda madadnāhā », l'imam At-Tabarī et l'imam Al-Qurtubī rapportent d'après Ibn ‘Abbās et Qatādah qu'Allāh a étalé et aplani la Terre (Basatnāhā) sur la face des eaux à partir de La Mecque (Umm Al-Qurā), puis y a jeté de lourdes montagnes pour l'empêcher de pencher ou de trembler.",
  "20:53": "Tafsīr d'At-Tabarī & d'Al-Qurtubī : Allāh rappelle qu'Il a fait de la Terre un « Mahd » (un lit aplani et un berceau étendu) et y a tracé des sentiers praticables d'un bout à l'autre.",
  "41:9": "Tafsīr de la Création en 6 jours (Sourate Fussilat 41:9-12) : Comme l'expliquent At-Tabarī et Ibn Kathīr, Allāh a créé la Terre en deux jours, y a placé ses montagnes et ses subsistances en quatre jours au total, puis s'est tourné vers le ciel qui était fumée (Dukhān) et l'a agencé en sept cieux superposés en deux jours, achevant ainsi la création des cieux et de la terre en six jours.",
  "43:10": "Tafsīr d'At-Tabarī & d'Al-Qurtubī : L'imam At-Tabarī et l'imam Al-Qurtubī expliquent que le terme « Mahdan » désigne une couche plane et stabilisée sur laquelle les créatures résident et se déplacent en suivant des voies tracées.",
  "50:1": "Authenticité & Analyse des sources : L'avis authentique retenu par les exégètes est que la lettre « Qāf » fait partie des lettres isolées de l'alphabet arabe (Al-Hurūf Al-Muqatta‘ah) placées au début des sourates pour démontrer le miracle inimitable du Coran. Quant au récit mentionné chez certains auteurs anciens via la chaîne faible d'Abū Al-Yaqzān affirmant que « Qāf » serait une montagne entourant la Terre, l'imam Ibn Kathīr précise qu'il ne repose sur aucun hadith authentique du Prophète ﷺ et provient des Isrā'īliyyāt (récits issus des Gens du Livre).",
  "50:7": "Tafsīr d'At-Tabarī & d'Al-Qurtubī : Après avoir invité l'homme à regarder le ciel construit au-dessus de lui sans la moindre fissure (50:6), Allāh dit : « Et la Terre, Nous l'avons étendue (Madadnāhā) ». At-Tabarī et Al-Qurtubī expliquent qu'elle a été déployée et étalée à plat sur l'eau et maintenue fixe par les montagnes.",
  "51:47": "Tafsīr Classique & Analyse Grammaticale (« Wa innā lamūsi‘ūn ») : Dans la traduction originale de Muhammad Hamidullah (1977), ce verset est traduit par : « Et le ciel, Nous l'avons construit renforcé ; et c'est encore Nous l'Élargisseur. » Les grands exégètes classiques (At-Tabarī, Al-Qurtubī, Ibn Kathīr) expliquent qu'Allāh fait ici Son propre éloge par le participe actif « Mūsi‘ūn » : 1) Selon Ibn ‘Abbās, Mujāhid et Qatādah, cela signifie « Nous sommes détenteurs de puissance, de richesse et d'abondance (Dhū sa‘ah) » ; 2) Cela rappelle qu'Allāh a créé au-dessus de la Terre un toit céleste vaste et élevé sans piliers. Les exégètes classiques ne parlent nullement d'une expansion continue de l'univers, la création des sept cieux et de la terre ayant été parachevée en six jours.",
  "51:48": "Tafsīr d'At-Tabarī & d'Al-Qurtubī (« Wa al-arda farashnāhā fa-ni‘ma al-māhidūn ») : Traduction originale de 1977 : « Et la terre, Nous l'avons faite lit ; et quel excellent berceur (niveleur) Nous sommes ! » At-Tabarī et Al-Qurtubī expliquent qu'Allāh a étendu, aplani et nivelé la Terre comme un lit stable pour Ses créatures, et Se loue Lui-même pour la perfection de cet aplanissement.",
  "68:1": "Authenticité & Analyse des sources : La lettre « Nūn » fait partie des lettres isolées de l'alphabet arabe démontrant le miracle du Coran, suivie du serment divin par le Calame (la Plume céleste qui a écrit la destinée). Les récits identifiant « Nūn » à une baleine cosmique proviennent des Isrā'īliyyāt (traditions des Gens du Livre) et ne reposent sur aucun hadith prophétique authentique.",
  "71:19": "Tafsīr d'At-Tabarī & d'Al-Qurtubī : Commentant la parole du prophète Nūh (Noé) « Et c'est Allāh qui vous a fait de la Terre un tapis (Bisātan) », At-Tabarī et Al-Qurtubī expliquent que « Bisāt » désigne littéralement un grand tapis étalé à plat sur lequel on marche, afin que les hommes puissent parcourir ses larges chemins (Subulan Fijājan).",
  "78:6": "Tafsīr d'At-Tabarī & d'Al-Qurtubī : « N'avons-Nous pas fait de la Terre une couche aplanie (Mihādan) et des montagnes des pieux (Awtādan) ? » At-Tabarī et Al-Qurtubī expliquent que la Terre a été nivelée comme un tapis étendu, et que les montagnes y ont été enfoncées comme les piquets d'une tente pour l'immobiliser.",
  "79:30": "Tafsīr d'At-Tabarī & d'Al-Qurtubī : Sous le verset « Et quant à la Terre, après cela, Il l'a étendue (Dahāhā) », l'imam At-Tabarī (d'après Ibn ‘Abbās et Sa‘īd ibn Jubayr) et l'imam Al-Qurtubī expliquent que « Dahāhā » signifie qu'Allāh l'a aplanie, étalée et déroulée d'Est en Ouest, en faisant jaillir ses eaux et ses pâturages et en y ancrant ses montagnes.",
  "88:20": "Tafsīr d'At-Tabarī, d'Al-Qurtubī & d'Al-Jalālayn : Sous la parole « Et la Terre, comment elle est nivelée (Sutihat) ? », l'imam At-Tabarī écrit : « Comment elle a été étalée (Busitat) et aplanie (Muddat) ». L'imam Al-Qurtubī et le Tafsīr Al-Jalālayn soulignent explicitement que le terme arabe « Sutihat » (de la racine Sath : surface plane / toit plat) exprime selon le sens littéral apparent du texte (Zāhir) que la Terre a été aplanie et étendue à plat devant le regard de l'homme.",
  "91:1": "Tafsīr d'At-Tabarī & d'Al-Qurtubī : Allāh jure ici par le Soleil et par sa clarté (« Duhāhā »). Ibn ‘Abbās, Mujāhid et Qatādah expliquent dans le Tafsīr d'At-Tabarī que « Duhāhā » désigne à la fois la lumière éclatante du Soleil lorsqu'il s'élève au matin et sa chaleur bienfaisante qui se répand sur la Terre.",
  "91:2": "Tafsīr d'At-Tabarī & d'Al-Qurtubī : « Et par la Lune quand elle le suit (Talāhā) ! » At-Tabarī et Al-Qurtubī rapportent d'après Ibn ‘Abbās et Qatādah que la Lune suit directement le Soleil dans sa course : lorsque le Soleil se couche, la Lune apparaît et prend le relais pour éclairer la nuit.",
  "91:3": "Tafsīr d'At-Tabarī & d'Al-Qurtubī : « Et par le jour quand il l'éclaire / le dévoile (Jallāhā) ! » L'imam At-Tabarī et l'imam Al-Qurtubī rapportent deux explications complémentaires des Salaf (Ibn ‘Abbās, Mujāhid, Qatādah) : 1) Quand le jour dévoile le Soleil dans toute sa splendeur et sa clarté ; 2) Quand la clarté du jour dévoile la surface de la Terre et dissipe l'obscurité qui la recouvrait.",
  "91:6": "Tafsīr d'At-Tabarī & d'Al-Qurtubī sur la Terre nivelée (« Wa al-ardi wa mā tahāhā ») : Dans son Jāmi‘ Al-Bayān, l'imam At-Tabarī rapporte d'après Ibn ‘Abbās, Mujāhid, Qatādah, ‘Ikrimah et As-Suddī : « Tahāhā signifie : Il l'a aplanie et étendue à plat (Basatahā) sur l'eau de tous côtés. » L'imam Al-Qurtubī écrit dans Al-Jāmi‘ li-Ahkām Al-Qur'ān : « Tahāhā a le même sens que Dahāhā, c'est-à-dire qu'Allāh a nivelé, aplani et étalé la Terre de tous ses côtés (Basatahā min kulli jānib) comme un tapis stable pour l'installation des créatures. »",
  "96:1": "Il s'agit du tout premier verset révélé au Prophète ﷺ dans la grotte de Hirā' par l'ange Jibrīl, inaugurant la révélation coranique par l'ordre de lire et d'apprendre au Nom d'Allāh le Créateur."
};

const VERSIONS_ORIGINALES_HAMIDULLAH_1977 = {
  "1:2": "Louange à Allah, Seigneur des mondes,",
  "51:47": "Et le ciel, Nous l'avons construit renforcé; et c'est encore Nous l'Élargisseur.",
  "51:48": "Et la terre, Nous l'avons faite lit; et quel excellent berceur Nous sommes!",
  "71:19": "Et c'est Allah qui vous a fait de la terre un tapis,",
  "88:20": "et la terre, comment elle est nivelée?",
  "91:6": "Et par la terre et Celui qui l'a nivelée!"
};

// ============================================================================
// LE TOUT PREMIER LOGO EN 4K — SANS AUCUN BORD BLEU NI BLANC SUR LE CARRÉ
// ============================================================================
const LOGO_FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#07111a"/>
      <stop offset="100%" stop-color="#020406"/>
    </linearGradient>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="45%" stop-color="#7dd3fc"/>
      <stop offset="75%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>
    <filter id="glow" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="3.2" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="120" height="120" rx="28" fill="url(#bgGrad)"/>
  <path d="M60 20 L63.5 29.5 L73.5 30 L65.5 36 L68.5 45.5 L60 40 L51.5 45.5 L54.5 36 L46.5 30 L56.5 29.5 Z" fill="url(#titleGrad)" filter="url(#glow)"/>
  <path d="M24 54 C38 48, 52 52, 60 59 C68 52, 82 48, 96 54 L96 88 C82 82, 68 86, 60 93 C52 86, 38 82, 24 88 Z" fill="none" stroke="url(#titleGrad)" stroke-width="5" stroke-linejoin="round" filter="url(#glow)"/>
  <line x1="60" y1="59" x2="60" y2="93" stroke="url(#titleGrad)" stroke-width="4" stroke-linecap="round"/>
  <path d="M32 64 C42 61, 50 63, 55 67" fill="none" stroke="#7dd3fc" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
  <path d="M32 74 C42 71, 50 73, 55 77" fill="none" stroke="#7dd3fc" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
  <path d="M88 64 C78 61, 70 63, 65 67" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
  <path d="M88 74 C78 71, 70 73, 65 77" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
</svg>`;

// Version inline (directement intégrée au HTML pour bloquer tout cache d'image)
function genererLogoInlineSVG(classeCSS) {
  return `<svg class="${classeCSS}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-label="Logo Le Noble Coran & Tafsir">
    <defs>
      <linearGradient id="bgGrad_${classeCSS}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#07111a"/>
        <stop offset="100%" stop-color="#020406"/>
      </linearGradient>
      <linearGradient id="titleGrad_${classeCSS}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="45%" stop-color="#7dd3fc"/>
        <stop offset="75%" stop-color="#38bdf8"/>
        <stop offset="100%" stop-color="#34d399"/>
      </linearGradient>
      <filter id="glow_${classeCSS}" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="3.2" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <rect width="120" height="120" rx="28" fill="url(#bgGrad_${classeCSS})"/>
    <path d="M60 20 L63.5 29.5 L73.5 30 L65.5 36 L68.5 45.5 L60 40 L51.5 45.5 L54.5 36 L46.5 30 L56.5 29.5 Z" fill="url(#titleGrad_${classeCSS})" filter="url(#glow_${classeCSS})"/>
    <path d="M24 54 C38 48, 52 52, 60 59 C68 52, 82 48, 96 54 L96 88 C82 82, 68 86, 60 93 C52 86, 38 82, 24 88 Z" fill="none" stroke="url(#titleGrad_${classeCSS})" stroke-width="5" stroke-linejoin="round" filter="url(#glow_${classeCSS})"/>
    <line x1="60" y1="59" x2="60" y2="93" stroke="url(#titleGrad_${classeCSS})" stroke-width="4" stroke-linecap="round"/>
    <path d="M32 64 C42 61, 50 63, 55 67" fill="none" stroke="#7dd3fc" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
    <path d="M32 74 C42 71, 50 73, 55 77" fill="none" stroke="#7dd3fc" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
    <path d="M88 64 C78 61, 70 63, 65 67" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
    <path d="M88 74 C78 71, 70 73, 65 77" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
  </svg>`;
}

// ============================================================================
// GRAPHIE AUTHENTIQUE DES LETTRES MYSTÉRIEUSES + SIMPLIFICATION PROPRE DU RESTE
// ============================================================================
const LETTRES_MYSTERIEUSES_EXACTES = {
  "2:1": "آلٓمٓ",
  "3:1": "آلٓمٓ",
  "7:1": "آلٓمٓصٓ",
  "10:1": "آلٓر",
  "11:1": "آلٓر",
  "12:1": "آلٓر",
  "13:1": "آلٓمٓر",
  "14:1": "آلٓر",
  "15:1": "آلٓر",
  "19:1": "كٓهيعٓصٓ",
  "20:1": "طه",
  "26:1": "طسٓمٓ",
  "27:1": "طسٓ",
  "28:1": "طسٓمٓ",
  "29:1": "آلٓمٓ",
  "30:1": "آلٓمٓ",
  "31:1": "آلٓمٓ",
  "32:1": "آلٓمٓ",
  "36:1": "يسٓ",
  "38:1": "صٓ ۚ وَالْقُرْآنِ ذِي الذِّكْرِ",
  "40:1": "حمٓ",
  "41:1": "حمٓ",
  "42:1": "حمٓ",
  "42:2": "عٓسٓقٓ",
  "43:1": "حمٓ",
  "44:1": "حمٓ",
  "45:1": "حمٓ",
  "46:1": "حمٓ",
  "50:1": "قٓ ۚ وَالْقُرْآنِ الْمَجِيدِ",
  "68:1": "نٓ وَالْقَلَمِ وَمَا يَسْطُرُونَ"
};

function nettoyerArabeToutEnGardantLettresMysterieuses(cleVerset, texteArabeBrut) {
  if (LETTRES_MYSTERIEUSES_EXACTES[cleVerset]) {
    return LETTRES_MYSTERIEUSES_EXACTES[cleVerset];
  }
  if (!texteArabeBrut) return '';
  let t = String(texteArabeBrut);
  // Remplace l'Alif Wasla Uthmani (ٱ) par un Alif simple (ا)
  t = t.replace(/\u0671/g, '\u0627');
  // Remplace le Sukun ouvert (ۡ) par un Sukun classique (ْ)
  t = t.replace(/\u06E1/g, '\u0652');
  // Retire les petits signes d'arrêt (ج / ۚ / ۖ / ۗ) et petits ronds qui se superposent aux lettres,
  // MAIS CONSERVE LE MADDAH (\u0653 ٓ) !
  t = t.replace(/[\u06D6-\u06DC\u06DF\u06E0\u06E2\u06E3\u06E5\u06E6\u06E7\u06E8\u06EA\u06EB\u06EC\u06ED]/g, '');
  return t.replace(/\s+/g, ' ').trim();
}

function restaurerHamidullah1977(cleVerset, texte) {
  if (VERSIONS_ORIGINALES_HAMIDULLAH_1977[cleVerset]) {
    return VERSIONS_ORIGINALES_HAMIDULLAH_1977[cleVerset];
  }
  let t = String(texte || '');
  t = t.replace(/Seigneur de l['’]univers/gi, 'Seigneur des mondes');
  t = t.replace(/Seigneur des univers/gi, 'Seigneur des mondes');
  t = t.replace(/pour l['’]univers/gi, 'pour les mondes');
  t = t.replace(/à travers l['’]univers/gi, 'à travers les mondes');
  t = t.replace(/sur l['’]univers/gi, 'sur les mondes');
  t = t.replace(/dans l['’]univers/gi, 'dans les mondes');
  t = t.replace(/de tout l['’]univers/gi, 'de tous les mondes');
  return t;
}

async function telechargerJSON(url, essais = 3) {
  for (let i = 0; i < essais; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === essais - 1) throw err;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

function echapperHTML(texte) {
  if (!texte) return '';
  return String(texte)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function nettoyerTexteIntegralSansFaute(texteBrut) {
  if (!texteBrut) return '';
  let t = String(texteBrut);

  t = t.replace(/\[\d+\]/g, '');

  for (let passe = 0; passe < 4; passe++) {
    t = t.replace(/\s*\([^()]*`[^()]*\)/g, '');
    t = t.replace(/\s*\([a-zA-ZâîûôêÂÎÛÔÊĥĵ'-]+\)/g, function(match) {
      if (/^(pluriel|singulier|littéralement|c'est-à-dire|ou)$/i.test(match.slice(1, -1))) return match;
      if (match.includes('-') || /[âîûĥĵ]/i.test(match)) return '';
      return match;
    });
    t = t.replace(/\s*\(\s*\)/g, '');
  }

  t = t.replace(/\s*\([^()]*voir\s+note[^()]*\)/gi, '');
  t = t.replace(/`/g, '');
  t = t.replace(/ĥ/g, 'h').replace(/Ĥ/g, 'H').replace(/ĵ/g, 'j').replace(/Ĵ/g, 'J');
  t = t.replace(/Seigneur de l['’]univers/gi, 'Seigneur des mondes');

  t = t.replace(
    /Il a déjà été question de telles lettres séparées au début de [Ss]ourate Al-Baqarah\.?/gi,
    "Ces lettres isolées placées en ouverture de la sourate appartiennent au secret d'Allāh et démontrent le miracle inimitable du Coran, composé des mêmes lettres arabes que celles utilisées par les hommes."
  );
  t = t.replace(
    /Ces lettres séparées apparaissent dans [Ss]ourate Al-Baqarah et renvoient à/gi,
    "Ces lettres isolées placées en ouverture de la sourate démontrent"
  );

  t = t.replace(/\bla zak[âa]t\b(?!\s*\()/gi, "la Zakât (l'aumône purificatrice obligatoire)");
  t = t.replace(/\bla sal[âa]t\b(?!\s*\()/gi, "la Salât (la prière rituelle)");
  t = t.replace(/\s+-\s+(All[âa]hu|Ar-Rahm[âa]nu|Ar-Rah[îi]mu)/g, '<br>• <strong>$1</strong>');

  t = t.replace(/\s*\(\s*\)/g, '');
  t = t.replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();

  return t;
}

function nettoyerTraductionPure(cleVerset, tradBrute, footnotesTrad, footnotesTafsir) {
  let trad = restaurerHamidullah1977(cleVerset, tradBrute);
  trad = trad.replace(/\s*\[\d+\]/g, '');
  trad = trad.replace(/\s*\([^()]*voir\s+note[^()]*\)/gi, '');
  trad = trad.replace(/\s*\([^()]*sourate\s+\d+[^()]*\)/gi, '');
  trad = trad.replace(/\s*\(\s*\)/g, '');
  trad = trad.replace(/`/g, '');

  const notesMap = {};
  const toutesFootnotes = [footnotesTrad || '', footnotesTafsir || ''].join('\n');

  if (toutesFootnotes.trim()) {
    const lignes = toutesFootnotes.split(/\n+/);
    let numCourant = null;
    for (const l of lignes) {
      const match = l.match(/^\s*\[(\d+)\]\s*(.*)/);
      if (match) {
        numCourant = match[1];
        if (!notesMap[numCourant]) {
          notesMap[numCourant] = match[2].trim();
        }
      } else if (numCourant && l.trim()) {
        notesMap[numCourant] += ' ' + l.trim();
      }
    }
  }

  let precisions = [];
  for (const num of Object.keys(notesMap)) {
    let noteTexte = notesMap[num]
      .replace(/`/g, '')
      .replace(/\s*\(?voir\s+note[^)]*\)?\.?/gi, '')
      .replace(/\s*\(\s*\)/g, '')
      .trim();

    if (!noteTexte || /^voir\s/i.test(noteTexte)) continue;

    if (noteTexte.length >= 25) {
      precisions.push(`<strong>Précision exégétique :</strong> ${echapperHTML(noteTexte)}`);
    }
  }

  const tradPropre = echapperHTML(trad.replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim());
  return { tradPropre, noteUnique: precisions.join('<br><br>') };
}

const MOTEUR_SOLEIL_LUNE_V21_JS = `
  const bgCanvas = document.getElementById('fullPageSkyCanvas');
  const bgCtx = bgCanvas.getContext('2d');
  const sunEl = document.getElementById('flatEarthSun');
  const moonEl = document.getElementById('flatEarthMoon');
  const skyLightingEl = document.getElementById('dynamicSkyLighting');

  let wScreen = window.innerWidth;
  let hScreen = window.innerHeight;
  let stars = [];
  let angleOrbite = 0.35;
  let vitesseOrbite = 0.0015;

  function chargerEtatOrbite() {
    try {
      const savedAngle = sessionStorage.getItem('orbit_angle_v21');
      if (savedAngle !== null && !isNaN(Number(savedAngle))) {
        angleOrbite = Number(savedAngle);
      }
    } catch (e) {}
  }

  function sauvegarderConfigCiel() {
    try {
      sessionStorage.setItem('orbit_angle_v21', String(angleOrbite));
      sessionStorage.setItem('sky_stars_v21', JSON.stringify(stars));
    } catch (e) {}
  }

  window.addEventListener('beforeunload', sauvegarderConfigCiel);

  function resizeFullSky() {
    wScreen = window.innerWidth;
    hScreen = window.innerHeight;
    bgCanvas.width = wScreen;
    bgCanvas.height = hScreen;
  }

  function initFullSky() {
    resizeFullSky();
    chargerEtatOrbite();

    try {
      const savedStars = sessionStorage.getItem('sky_stars_v21');
      if (savedStars) {
        const parsed = JSON.parse(savedStars);
        if (Array.isArray(parsed) && parsed.length === 145) {
          stars = parsed.map(function(s) {
            return {
              x: s.xRatio * wScreen,
              y: s.yRatio * hScreen,
              xRatio: s.xRatio,
              yRatio: s.yRatio,
              r: s.r,
              alphaBase: s.alphaBase,
              phase: s.phase,
              speed: s.speed,
              bright: s.bright
            };
          });
          return;
        }
      }
    } catch (e) {}

    stars = [];
    for (let i = 0; i < 145; i++) {
      const xRatio = Math.random();
      const yRatio = Math.random();
      const bright = Math.random() < 0.22;
      stars.push({
        x: xRatio * wScreen,
        y: yRatio * hScreen,
        xRatio: xRatio,
        yRatio: yRatio,
        r: bright ? (Math.random() * 1.5 + 1.0) : (Math.random() * 0.9 + 0.3),
        alphaBase: Math.random() * 0.6 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.006,
        bright: bright
      });
    }
  }

  function mettreAJourAstres() {
    if (!sunEl && !moonEl) return;

    angleOrbite += vitesseOrbite;
    const angleSoleil = angleOrbite;
    const angleLune = angleOrbite - Math.PI;

    const centreX = wScreen * 0.5;
    const centreY = hScreen * 0.48;

    const rayonX = Math.min(wScreen * 0.40, Math.max(330, wScreen * 0.35));
    const rayonY = Math.min(hScreen * 0.38, Math.max(220, hScreen * 0.33));

    const sunX = centreX + Math.cos(angleSoleil) * rayonX;
    const sunY = centreY + Math.sin(angleSoleil) * rayonY;

    const moonX = centreX + Math.cos(angleLune) * rayonX;
    const moonY = centreY + Math.sin(angleLune) * rayonY;

    if (sunEl) {
      sunEl.style.transform = "translate3d(" + (sunX - 58) + "px, " + (sunY - 58) + "px, 0)";
    }
    if (moonEl) {
      moonEl.style.transform = "translate3d(" + (moonX - 64) + "px, " + (moonY - 64) + "px, 0)";
    }

    if (skyLightingEl) {
      const sunPctX = Math.round((sunX / wScreen) * 100);
      const sunPctY = Math.round((sunY / hScreen) * 100);
      const moonPctX = Math.round((moonX / wScreen) * 100);
      const moonPctY = Math.round((moonY / hScreen) * 100);

      skyLightingEl.style.background =
        "radial-gradient(circle at " + sunPctX + "% " + sunPctY + "%, rgba(251, 191, 36, 0.17) 0%, rgba(245, 158, 11, 0.05) 24%, transparent 50%), " +
        "radial-gradient(circle at " + moonPctX + "% " + moonPctY + "%, rgba(255, 255, 255, 0.20) 0%, rgba(226, 232, 240, 0.07) 26%, transparent 52%)";
    }
  }

  function renderFullSky() {
    bgCtx.clearRect(0, 0, wScreen, hScreen);

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.phase += s.speed;
      const alpha = Math.max(0.08, Math.min(1, s.alphaBase + Math.sin(s.phase) * 0.35));

      bgCtx.save();
      bgCtx.beginPath();
      if (s.bright) {
        bgCtx.shadowBlur = 10;
        bgCtx.shadowColor = "rgba(255, 255, 255, 0.85)";
      }
      bgCtx.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
      bgCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      bgCtx.fill();
      bgCtx.restore();
    }

    mettreAJourAstres();
    requestAnimationFrame(renderFullSky);
  }

  window.addEventListener('resize', function() {
    resizeFullSky();
    for (let i = 0; i < stars.length; i++) {
      stars[i].x = stars[i].xRatio * wScreen;
      stars[i].y = stars[i].yRatio * hScreen;
    }
  });

  initFullSky();
  renderFullSky();
`;

// ============================================================================
// NAVIGATION + BOUTONS VOLUME (- / +) + CASE AUTO TOUJOURS DÉCOCHÉE AU DÉBUT
// ============================================================================
const SCRIPT_NAVIGATION_CLASSIQUE_V27 = `
  const audio = document.getElementById('ayahAudio');
  const preloadAudio = document.getElementById('preloadNextAudio');
  const playBtn = document.getElementById('playSyncBtn');
  const select = document.getElementById('reciterSelect');
  const autoCheck = document.getElementById('autoNextCheck');
  const stage = document.getElementById('verseStage');
  const progressBar = document.getElementById('syncProgressBar');
  const volLabel = document.getElementById('volPctLabel');
  let animId = null;
  let currentVolume = 1.0;

  const RECITATEURS_VALIDES = [
    'Yasser_Ad-Dussary_128kbps',
    'Alafasy_128kbps',
    'Abdurrahmaan_As-Sudais_192kbps',
    'Saood_ash-Shuraym_128kbps',
    'Nasser_Alqatami_128kbps',
    'Abdullah_Basfar_192kbps',
    'Minshawy_Murattal_128kbps',
    'Husary_128kbps',
    'Hudhaify_128kbps'
  ];

  // Toujours décoché à l'arrivée sur une sourate pour que le lecteur lise avant d'écouter
  autoCheck.checked = false;

  try {
    localStorage.removeItem('autoNext');
    localStorage.removeItem('autoNext_v2');
    const savedReciter = localStorage.getItem('reciter');
    if (savedReciter && RECITATEURS_VALIDES.indexOf(savedReciter) !== -1) {
      select.value = savedReciter;
    } else {
      select.value = 'Yasser_Ad-Dussary_128kbps';
    }
    const savedVol = localStorage.getItem('audio_volume_v25');
    if (savedVol !== null && !isNaN(Number(savedVol))) {
      currentVolume = Math.max(0.1, Math.min(1.0, Number(savedVol)));
    }
  } catch (e) {}

  function appliquerVolume() {
    audio.volume = currentVolume;
    if (volLabel) {
      volLabel.textContent = Math.round(currentVolume * 100) + "%";
    }
    try {
      localStorage.setItem('audio_volume_v25', String(currentVolume));
    } catch (e) {}
  }
  appliquerVolume();

  function modifierVolume(delta) {
    currentVolume = Math.round((currentVolume + delta) * 10) / 10;
    if (currentVolume < 0.1) currentVolume = 0.1;
    if (currentVolume > 1.0) currentVolume = 1.0;
    appliquerVolume();
  }

  function prechargerVersetSuivant() {
    if (!preloadAudio) return;
    if (window.SOURATE_DATA && window.SOURATE_DATA.versets) {
      const vSuiv = window.SOURATE_DATA.versets[numVersetActuel];
      if (vSuiv && vSuiv.codeAudio) {
        const nextUrl = "https://everyayah.com/data/" + select.value + "/" + vSuiv.codeAudio + ".mp3";
        if (preloadAudio.src !== nextUrl) {
          preloadAudio.src = nextUrl;
        }
      }
    }
  }

  function majSourceAudio() {
    const nouvelleUrl = "https://everyayah.com/data/" + select.value + "/" + codeAudio + ".mp3";
    if (audio.src !== nouvelleUrl) {
      audio.src = nouvelleUrl;
    }
    appliquerVolume();
    prechargerVersetSuivant();
  }
  majSourceAudio();

  function sauverAutoNext() {}

  function animerBarre() {
    if (audio.paused) return;
    if (audio.duration && isFinite(audio.duration)) {
      const pct = Math.min(100, (audio.currentTime / audio.duration) * 100);
      progressBar.style.width = pct + "%";
    }
    animId = requestAnimationFrame(animerBarre);
  }

  function arreterVisuel() {
    if (animId) cancelAnimationFrame(animId);
    stage.classList.remove('playing');
    progressBar.style.width = "0%";
    playBtn.textContent = "▶ Écouter le verset";
    playBtn.classList.remove('active');
  }

  function toggleAudioSync() {
    if (audio.paused) {
      appliquerVolume();
      stage.classList.add('playing');
      playBtn.textContent = "⏸ Pause";
      playBtn.classList.add('active');
      prechargerVersetSuivant();
      audio.play().then(function() {
        animId = requestAnimationFrame(animerBarre);
      }).catch(function() {
        arreterVisuel();
      });
    } else {
      audio.pause();
      arreterVisuel();
    }
  }

  function changerRecitateur() {
    try { localStorage.setItem('reciter', select.value); } catch (e) {}
    const enCours = !audio.paused;
    majSourceAudio();
    if (enCours) {
      audio.play().then(function() {
        animId = requestAnimationFrame(animerBarre);
      }).catch(function() {
        arreterVisuel();
      });
    }
  }

  function basculerDeveloppementMiracle() {
    const detailsEl = document.getElementById('miracleDeepDetails');
    const btnEl = document.getElementById('miracleToggleBtn');
    if (!detailsEl || !btnEl) return;
    const estOuvert = detailsEl.classList.toggle('open');
    btnEl.textContent = estOuvert
      ? "▲ Masquer l'explication détaillée du miracle"
      : "★ Développer l'explication complète & le Hadīth historique";
  }

  function construireHTMLMiracle(mObj) {
    if (!mObj) return '';
    return '<div class="miracle-banner">' +
      '<div class="miracle-header"><span class="sky-star-icon">★</span> ' + mObj.titre + '</div>' +
      '<p class="miracle-summary">' + mObj.resume + '</p>' +
      '<button type="button" class="miracle-expand-btn" id="miracleToggleBtn" onclick="basculerDeveloppementMiracle()">' +
        '★ Développer l\\'explication complète & le Hadīth historique' +
      '</button>' +
      '<div class="miracle-deep-details" id="miracleDeepDetails">' +
        mObj.developpement +
      '</div>' +
    '</div>';
  }

  function majEffetSpecifiqueVerset(numS, numV) {
    if (!stage) return;
    stage.classList.toggle('ash-shams-daylight', numS === 91 && (numV === 1 || numV === 3));
    stage.classList.toggle('earth-leveled-glow', (numS === 91 && numV === 6) || (numS === 88 && numV === 20) || (numS === 15 && numV === 19) || (numS === 50 && numV === 7) || (numS === 71 && numV === 19));
  }

  majEffetSpecifiqueVerset(numSourateActuelle, numVersetActuel);

  function allerAuVersetSansRecharger(numVersetCible, lancerAudioAuto) {
    if (!window.SOURATE_DATA || !window.SOURATE_DATA.versets) {
      sauvegarderConfigCiel();
      window.location.href = "sourate-" + numSourateActuelle + "-verset-" + numVersetCible + ".html?v=27";
      return;
    }

    const vData = window.SOURATE_DATA.versets[numVersetCible - 1];
    if (!vData) {
      sauvegarderConfigCiel();
      window.location.href = "sourate-" + numSourateActuelle + "-verset-" + numVersetCible + ".html?v=27";
      return;
    }

    if (!audio.paused) {
      audio.pause();
    }
    arreterVisuel();

    numVersetActuel = numVersetCible;
    codeAudio = vData.codeAudio;
    majSourceAudio();
    majEffetSpecifiqueVerset(numSourateActuelle, numVersetCible);

    document.title = "Sourate " + numSourateActuelle + " verset " + numVersetCible + " (" + window.SOURATE_DATA.nomSourate + ") - Traduction Hamidullah 1977 & Tafsir";
    document.getElementById('badgeNumEl').textContent = numSourateActuelle + " : " + numVersetCible;
    document.getElementById('mainTitleEl').textContent = "Sourate " + window.SOURATE_DATA.nomSourate + " (" + window.SOURATE_DATA.nomFr + ") — Verset " + numVersetCible;
    document.getElementById('arabicVerseEl').innerHTML = vData.texteArabe;
    document.getElementById('frenchVerseEl').innerHTML = numVersetCible + ". " + vData.tradPropre;
    document.getElementById('mainExplanationEl').innerHTML = vData.explicationUnanime;

    const extraContainer = document.getElementById('extraNotesContainer');
    let extraHTML = '';
    if (vData.noteUnique) extraHTML += '<div class="consensus-note">' + vData.noteUnique + '</div>';
    if (vData.precisionConsensus) extraHTML += '<div class="consensus-note">' + vData.precisionConsensus + '</div>';
    if (vData.texteLaurierPerso) extraHTML += '<div class="consensus-note"><strong>Le Laurier de l\\'Exégèse :</strong> ' + vData.texteLaurierPerso + '</div>';
    extraContainer.innerHTML = extraHTML;

    const miracleContainer = document.getElementById('miracleContainer');
    miracleContainer.innerHTML = construireHTMLMiracle(vData.miracle);

    const jumperEl = document.getElementById('verseJumperSelect');
    if (jumperEl) {
      jumperEl.value = "sourate-" + numSourateActuelle + "-verset-" + numVersetCible + ".html";
      jumperEl.classList.toggle('is-miracle-verse', Boolean(vData.miracle));
    }

    document.getElementById('pageIndicatorEl').textContent = "Verset " + numVersetCible + " / " + window.SOURATE_DATA.nbVersets;
    document.getElementById('prevVerseLink').setAttribute('href', vData.lienPrecedent);
    document.getElementById('nextVerseLink').setAttribute('href', vData.lienSuivant);

    try {
      history.pushState({ verset: numVersetCible }, '', "sourate-" + numSourateActuelle + "-verset-" + numVersetCible + ".html");
    } catch (e) {}

    if (lancerAudioAuto) {
      stage.classList.add('playing');
      playBtn.textContent = "⏸ Pause";
      playBtn.classList.add('active');
      appliquerVolume();
      audio.play().then(function() {
        animId = requestAnimationFrame(animerBarre);
      }).catch(function() {
        arreterVisuel();
      });
    }
  }

  function naviguerVerset(event, lienCible, autoAudio) {
    const cleanLien = String(lienCible).split('?')[0];
    const match = cleanLien.match(/^sourate-(\\d+)-verset-(\\d+)\\.html$/);
    if (match && Number(match[1]) === numSourateActuelle) {
      if (event) event.preventDefault();
      allerAuVersetSansRecharger(Number(match[2]), autoAudio);
      return false;
    }
    sauvegarderConfigCiel();
    if (autoAudio) {
      window.location.href = cleanLien + "?v=27&autoplay=1";
      return false;
    }
    return true;
  }

  window.addEventListener('popstate', function(e) {
    if (e.state && e.state.verset) {
      allerAuVersetSansRecharger(e.state.verset, false);
    }
  });

  audio.onended = function() {
    arreterVisuel();
    if (autoCheck.checked) {
      const hrefSuiv = document.getElementById('nextVerseLink').getAttribute('href');
      naviguerVerset(null, hrefSuiv, true);
    }
  };

  if (window.location.search.indexOf('autoplay=1') !== -1) {
    autoCheck.checked = true;
    stage.classList.add('playing');
    appliquerVolume();
    audio.play().then(function() {
      playBtn.textContent = "⏸ Pause";
      playBtn.classList.add('active');
      animId = requestAnimationFrame(animerBarre);
    }).catch(function() {
      arreterVisuel();
    });
  }
`;

const CSS_BLEU_CIEL_V21 = `
  .cosmos-exterior-wrapper {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
    background: radial-gradient(ellipse at 50% 40%, #070d14 0%, #030609 65%, #010203 100%);
  }

  #dynamicSkyLighting {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: background 0.6s ease;
  }

  #fullPageSkyCanvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .flat-earth-sun {
    position: fixed;
    top: 0;
    left: 0;
    width: 116px;
    height: 116px;
    border-radius: 50%;
    z-index: 3;
    pointer-events: none;
    will-change: transform;
  }
  .sun-core {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle, #ffffff 0%, #fef08a 38%, #f59e0b 72%, rgba(234, 88, 12, 0) 100%);
    box-shadow:
      0 0 35px 10px rgba(253, 224, 71, 0.85),
      0 0 90px 35px rgba(245, 158, 11, 0.45),
      0 0 160px 70px rgba(234, 88, 12, 0.22);
    animation: sunCoronaPulse 4s ease-in-out infinite alternate;
  }
  @keyframes sunCoronaPulse {
    0% { transform: scale(0.96); opacity: 0.92; }
    100% { transform: scale(1.05); opacity: 1; }
  }

  .flat-earth-moon {
    position: fixed;
    top: 0;
    left: 0;
    width: 128px;
    height: 128px;
    border-radius: 50%;
    z-index: 3;
    pointer-events: none;
    will-change: transform;
  }
  .moon-white-core {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle at 38% 38%, #ffffff 0%, #ffffff 48%, #f1f5f9 78%, #e2e8f0 94%, rgba(255, 255, 255, 0) 100%);
    box-shadow:
      0 0 35px 12px rgba(255, 255, 255, 0.95),
      0 0 85px 32px rgba(226, 232, 240, 0.55),
      0 0 160px 65px rgba(186, 230, 253, 0.28),
      inset -8px -8px 18px rgba(203, 213, 225, 0.45);
    animation: whiteMoonPulse 4.5s ease-in-out infinite alternate;
  }
  @keyframes whiteMoonPulse {
    0% { transform: scale(0.96); opacity: 0.92; }
    100% { transform: scale(1.05); opacity: 1; }
  }

  .verse-stage.ash-shams-daylight {
    border-color: rgba(56, 189, 248, 0.55);
    box-shadow:
      0 0 60px rgba(56, 189, 248, 0.22),
      0 20px 50px rgba(0, 0, 0, 0.55),
      inset 0 0 50px rgba(125, 211, 252, 0.12);
    animation: daylightSweepPulse 3.5s ease-in-out infinite alternate;
  }
  @keyframes daylightSweepPulse {
    0% { box-shadow: 0 0 45px rgba(56, 189, 248, 0.16), inset 0 0 35px rgba(125, 211, 252, 0.08); }
    100% { box-shadow: 0 0 80px rgba(56, 189, 248, 0.32), inset 0 0 65px rgba(125, 211, 252, 0.18); }
  }

  .verse-stage.earth-leveled-glow::after {
    content: "";
    position: absolute;
    bottom: 6px;
    left: 8%;
    width: 84%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.85), #ffffff, rgba(56, 189, 248, 0.85), transparent);
    box-shadow: 0 0 18px rgba(56, 189, 248, 0.9);
    animation: horizonExpand 3s ease-in-out infinite alternate;
  }
  @keyframes horizonExpand {
    0% { transform: scaleX(0.85); opacity: 0.65; }
    100% { transform: scaleX(1.05); opacity: 1; }
  }

  .revelation-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 4px 10px;
    border-radius: 99px;
    text-decoration: none;
  }
  .revelation-pill.mecquoise {
    background: rgba(56, 189, 248, 0.14);
    color: #7dd3fc;
    border: 1px solid rgba(56, 189, 248, 0.42);
    box-shadow: 0 0 12px rgba(56, 189, 248, 0.12);
  }
  .revelation-pill.medinoise {
    background: rgba(16, 185, 129, 0.16);
    color: #6ee7b7;
    border: 1px solid rgba(52, 211, 153, 0.38);
  }
  .revelation-pill.miracle-pill {
    background: rgba(14, 165, 233, 0.22);
    color: #38bdf8;
    border: 1px solid rgba(56, 189, 248, 0.6);
    box-shadow: 0 0 16px rgba(56, 189, 248, 0.28);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .revelation-pill.miracle-pill:hover {
    background: #38bdf8;
    color: #031521;
    box-shadow: 0 0 22px rgba(56, 189, 248, 0.55);
  }

  .sky-star-icon {
    color: #38bdf8;
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.9), 0 0 20px rgba(14, 165, 233, 0.6);
  }

  .miracle-banner {
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.16) 0%, rgba(8, 47, 73, 0.52) 100%);
    border: 1px solid rgba(56, 189, 248, 0.5);
    border-radius: 18px;
    padding: 20px 24px;
    margin-bottom: 20px;
    box-shadow: 0 12px 35px rgba(2, 132, 199, 0.18), inset 0 0 25px rgba(56, 189, 248, 0.08);
  }
  .miracle-header {
    color: #38bdf8;
    text-shadow: 0 0 14px rgba(56, 189, 248, 0.4);
    font-weight: 800;
    font-size: 1.02rem;
    margin-bottom: 8px;
  }
  .miracle-summary {
    color: #e0f2fe;
    font-size: 0.95rem;
    line-height: 1.7;
    margin-bottom: 14px;
  }
  .miracle-expand-btn {
    background: rgba(56, 189, 248, 0.16);
    color: #7dd3fc;
    border: 1px solid rgba(56, 189, 248, 0.55);
    padding: 9px 16px;
    border-radius: 10px;
    font-family: inherit;
    font-size: 0.84rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.15);
  }
  .miracle-expand-btn:hover {
    background: #38bdf8;
    color: #031521;
    box-shadow: 0 0 24px rgba(56, 189, 248, 0.5);
  }
  .miracle-deep-details {
    display: none;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(56, 189, 248, 0.3);
    color: #f0f9ff;
    font-size: 0.95rem;
    line-height: 1.8;
  }
  .miracle-deep-details.open {
    display: block;
  }
  .miracle-deep-details p {
    margin-bottom: 12px;
  }

  .interface-layer {
    position: relative;
    z-index: 10;
  }
`;

// AVEC SOLEIL & LUNE (Uniquement pour index.html)
const HTML_SOLEIL_LUNE_ACCUEIL = `
  <div class="cosmos-exterior-wrapper">
    <div id="dynamicSkyLighting"></div>
    <canvas id="fullPageSkyCanvas"></canvas>

    <div class="flat-earth-sun" id="flatEarthSun">
      <div class="sun-core"></div>
    </div>

    <div class="flat-earth-moon" id="flatEarthMoon">
      <div class="moon-white-core"></div>
    </div>
  </div>
`;

// SANS SOLEIL NI LUNE (Pour l'intérieur des sourates)
const HTML_CIEL_ETOILE_SOURATE = `
  <div class="cosmos-exterior-wrapper">
    <canvas id="fullPageSkyCanvas"></canvas>
  </div>
`;

async function lancerGeneration() {
  console.log('================================================================================');
  console.log('🚀 GÉNÉRATEUR V27 : LOGO SANS BORD BLEU + ALIF LAM MIM & LETTRES SIMPLES + ANTI-CACHE');
  console.log('================================================================================\n');

  let extraitsLaurierPerso = {};
  const cheminLaurierJSON = path.join(__dirname, 'laurier.json');
  if (fs.existsSync(cheminLaurierJSON)) {
    try {
      extraitsLaurierPerso = JSON.parse(fs.readFileSync(cheminLaurierJSON, 'utf8'));
    } catch (e) {}
  }

  let hamidullahParSourate = {};
  try {
    console.log('📖 Téléchargement du texte original de Muhammad Hamidullah (1977)...');
    const hamidullahData = await telechargerJSON('https://api.alquran.cloud/v1/quran/fr.hamidullah');
    if (hamidullahData && hamidullahData.data && Array.isArray(hamidullahData.data.surahs)) {
      for (const sObj of hamidullahData.data.surahs) {
        hamidullahParSourate[sObj.number] = sObj.ayahs;
      }
      console.log('✅ Traduction Hamidullah 1977 chargée !\n');
    }
  } catch (e) {
    console.log('⚠️ Connexion secondaire utilisée pour la traduction.\n');
  }

  const chapitresDataFr = await telechargerJSON('https://api.quran.com/api/v4/chapters?language=fr');
  const sourates = chapitresDataFr.chapters;

  const dossierSite = path.join(__dirname, 'site');
  if (!fs.existsSync(dossierSite)) {
    fs.mkdirSync(dossierSite);
  }

  // Enregistrement du Logo sans bord bleu pour l'onglet navigateur
  fs.writeFileSync(path.join(dossierSite, 'favicon.svg'), LOGO_FAVICON_SVG, 'utf8');
  fs.writeFileSync(path.join(dossierSite, 'logo-v27.svg'), LOGO_FAVICON_SVG, 'utf8');

  // Fichier _headers Cloudflare Pages pour empêcher Opera/Chrome de garder les anciennes pages en cache
  const headersCloudflare = `/*.html\n  Cache-Control: no-cache, no-store, must-revalidate\n/\n  Cache-Control: no-cache, no-store, must-revalidate\n/*.svg\n  Cache-Control: public, max-age=0, must-revalidate\n/*.js\n  Cache-Control: public, max-age=0, must-revalidate\n`;
  fs.writeFileSync(path.join(dossierSite, '_headers'), headersCloudflare, 'utf8');

  const souratesAvecMiracleMap = {};
  for (const cle of Object.keys(MIRACLES)) {
    const [sId, vId] = cle.split(':').map(Number);
    if (!souratesAvecMiracleMap[sId]) {
      souratesAvecMiracleMap[sId] = { premierVersetMiracle: vId, versetsMiracles: [], titre: MIRACLES[cle].titre };
    }
    souratesAvecMiracleMap[sId].versetsMiracles.push(vId);
  }

  const urlsSitemap = ['https://corantafsir.com/'];

  for (let s = 0; s < sourates.length; s++) {
    const sourate = sourates[s];
    const numSourate = sourate.id;
    const nomSourate = sourate.name_simple;
    const nomFr = sourate.translated_name ? sourate.translated_name.name : '';
    const nomArabe = sourate.name_arabic;
    const estMecquoise = sourate.revelation_place === 'makkah';
    const typeSourateLabel = estMecquoise ? 'Sourate Mecquoise' : 'Sourate Médinoise';
    const typeSourateClasse = estMecquoise ? 'mecquoise' : 'medinoise';
    const lieu = estMecquoise ? 'La Mecque' : 'Médine';
    const ordreRev = sourate.revelation_order;
    const nbVersets = sourate.verses_count;
    const infoMiracleSourate = souratesAvecMiracleMap[numSourate] || null;

    console.log(`[${numSourate}/114] Génération V27 de Sourate ${numSourate} - ${nomSourate}...`);

    const [tradData, tafsirData] = await Promise.all([
      telechargerJSON(`https://quranenc.com/api/v1/translation/sura/french_rashid/${numSourate}`),
      telechargerJSON(`https://quranenc.com/api/v1/translation/sura/french_mokhtasar/${numSourate}`)
    ]);

    const versetsTrad = tradData.result || [];
    const versetsTafsir = tafsirData.result || [];
    const versetsHamidullah = hamidullahParSourate[numSourate] || [];

    const donneesSourate = {
      numSourate,
      nomSourate,
      nomFr,
      nomArabe,
      lieu,
      typeSourateLabel,
      typeSourateClasse,
      ordreRev,
      nbVersets,
      versets: []
    };

    for (let v = 0; v < versetsTrad.length; v++) {
      const itemTrad = versetsTrad[v];
      const itemTafsir = versetsTafsir[v] || {};
      const itemHamidullah = versetsHamidullah[v] || null;
      const numVerset = Number(itemTrad.aya);
      const cleVerset = `${numSourate}:${numVerset}`;
      const miracle = MIRACLES[cleVerset] || null;

      // Arabe propre : garde آلٓمٓ, نٓ, قٓ intacts sans Basmalah collée, et nettoie les petits signes ج / ٱ / ۡ
      const texteArabePropre = nettoyerArabeToutEnGardantLettresMysterieuses(cleVerset, itemTrad.arabic_text || '');
      const texteArabe = echapperHTML(texteArabePropre);

      const texteFrSource = (itemHamidullah && itemHamidullah.text) ? itemHamidullah.text : itemTrad.translation;

      const { tradPropre, noteUnique } = nettoyerTraductionPure(
        cleVerset,
        texteFrSource,
        itemTrad.footnotes,
        itemTafsir.footnotes
      );
      const explicationUnanime = nettoyerTexteIntegralSansFaute(itemTafsir.translation);
      const precisionConsensus = SYNTHESE_LAURIER_EXEGESE[cleVerset] || '';
      const texteLaurierPerso = extraitsLaurierPerso[cleVerset] ? echapperHTML(extraitsLaurierPerso[cleVerset]) : '';

      const codeAudio = String(numSourate).padStart(3, '0') + String(numVerset).padStart(3, '0');

      let lienPrecedent = 'index.html?v=27';
      if (numVerset > 1) {
        lienPrecedent = `sourate-${numSourate}-verset-${numVerset - 1}.html?v=27`;
      } else if (numSourate > 1) {
        const souratePrec = sourates[s - 1];
        lienPrecedent = `sourate-${souratePrec.id}-verset-${souratePrec.verses_count}.html?v=27`;
      }

      let lienSuivant = 'index.html?v=27';
      if (numVerset < nbVersets) {
        lienSuivant = `sourate-${numSourate}-verset-${numVerset + 1}.html?v=27`;
      } else if (numSourate < 114) {
        lienSuivant = `sourate-${numSourate + 1}-verset-1.html?v=27`;
      }

      donneesSourate.versets.push({
        numVerset,
        texteArabe,
        tradPropre,
        noteUnique,
        explicationUnanime,
        precisionConsensus,
        texteLaurierPerso,
        miracle,
        codeAudio,
        lienPrecedent,
        lienSuivant
      });
    }

    const fichierDataJS = `data-sourate-${numSourate}.js`;
    fs.writeFileSync(
      path.join(dossierSite, fichierDataJS),
      `window.SOURATE_DATA = ${JSON.stringify(donneesSourate)};`,
      'utf8'
    );

    const htmlAccesRapideMiracle = infoMiracleSourate
      ? `<a href="sourate-${numSourate}-verset-${infoMiracleSourate.premierVersetMiracle}.html?v=27" class="revelation-pill miracle-pill" onclick="return naviguerVerset(event, this.getAttribute('href'), false)">★ Verset Miracle : v.${infoMiracleSourate.premierVersetMiracle}</a>`
      : '';

    for (let v = 0; v < donneesSourate.versets.length; v++) {
      const vObj = donneesSourate.versets[v];
      const numVerset = vObj.numVerset;

      let optionsSelectVerset = '';
      for (let i = 1; i <= nbVersets; i++) {
        const sel = i === numVerset ? 'selected' : '';
        const estVersetMiracle = Boolean(MIRACLES[`${numSourate}:${i}`]);
        if (estVersetMiracle) {
          optionsSelectVerset += `<option value="sourate-${numSourate}-verset-${i}.html" class="opt-miracle-blue" ${sel}>★ Verset ${i} / ${nbVersets} — Miracle</option>`;
        } else {
          optionsSelectVerset += `<option value="sourate-${numSourate}-verset-${i}.html" ${sel}>Verset ${i} / ${nbVersets}</option>`;
        }
      }

      const nomFichier = `sourate-${numSourate}-verset-${numVerset}.html`;
      urlsSitemap.push(`https://corantafsir.com/${nomFichier}`);

      const htmlVerset = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Coran Tafsīr">
  <link rel="icon" type="image/svg+xml" href="logo-v27.svg?v=27">
  <link rel="apple-touch-icon" href="logo-v27.svg?v=27">
  <link rel="canonical" href="https://corantafsir.com/${nomFichier}">
  <title>Sourate ${numSourate} verset ${numVerset} (${nomSourate}) - Traduction Hamidullah 1977 & Tafsir</title>
  <meta name="description" content="Sourate ${numSourate} verset ${numVerset} (${nomSourate} - ${typeSourateLabel}) : Texte arabe, traduction originale de Muhammad Hamidullah (1977) et exégèse (Tafsīr) Al-Mukhtasar.">
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Scheherazade+New:wght@400;700&family=Cinzel+Decorative:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-main: #020406;
      --bg-card: rgba(8, 13, 18, 0.24);
      --bg-elevated: rgba(12, 19, 25, 0.30);
      --green-accent: #10b981;
      --green-bright: #34d399;
      --green-dim: rgba(16, 185, 129, 0.16);
      --sky-accent: #38bdf8;
      --sky-bright: #7dd3fc;
      --text-main: #f8fafc;
      --text-muted: #cbd5e1;
      --border-color: rgba(255, 255, 255, 0.15);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-main);
      color: var(--text-main);
      font-family: 'Plus Jakarta Sans', sans-serif;
      line-height: 1.8;
      min-height: 100vh;
      padding: 18px 20px 88px 20px;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    ${CSS_BLEU_CIEL_V21}

    .top-nav {
      max-width: 820px;
      margin: 0 auto 14px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      background: var(--bg-card);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid var(--border-color);
      padding: 12px 22px;
      border-radius: 16px;
      box-shadow: 0 12px 35px rgba(0,0,0,0.35);
    }
    .home-btn {
      color: var(--green-bright);
      text-decoration: none;
      font-weight: 700;
      font-size: 0.9rem;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transition: 0.2s;
    }
    .nav-logo-svg {
      width: 32px;
      height: 32px;
      display: block;
      flex-shrink: 0;
      filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 10px rgba(56, 189, 248, 0.35));
    }
    .home-btn:hover { opacity: 0.85; transform: translateX(-2px); }
    .meta-badges { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .tag {
      font-size: 0.78rem;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 99px;
      background: var(--bg-elevated);
      color: var(--text-main);
      border: 1px solid var(--border-color);
    }
    .verse-jumper {
      background: rgba(10, 16, 22, 0.75);
      color: var(--text-main);
      border: 1px solid var(--border-color);
      padding: 6px 14px;
      border-radius: 10px;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      outline: none;
      transition: all 0.25s ease;
    }
    .verse-jumper.is-miracle-verse {
      border-color: rgba(56, 189, 248, 0.75);
      color: #7dd3fc;
      box-shadow: 0 0 16px rgba(56, 189, 248, 0.3);
    }
    .verse-jumper option { background: #0b1116; color: #fff; }
    .verse-jumper option.opt-miracle-blue {
      background: #082f49;
      color: #38bdf8;
      font-weight: 800;
    }

    .centered-container {
      max-width: 820px;
      margin: 0 auto;
    }
    .panel {
      background: var(--bg-card);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 28px 30px;
      min-height: calc(100vh - 165px);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      box-shadow: 0 20px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12);
    }
    .main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 20px;
    }
    .title-group { display: flex; align-items: center; gap: 15px; }
    .badge-num {
      background: var(--green-dim);
      color: var(--green-bright);
      border: 1px solid rgba(52, 211, 153, 0.35);
      font-weight: 800;
      font-size: 1rem;
      padding: 9px 15px;
      border-radius: 12px;
    }
    .title-group h1 { font-size: 1.28rem; color: #fff; font-weight: 800; text-shadow: 0 2px 8px rgba(0,0,0,0.8); }
    .title-group p { color: var(--text-muted); font-size: 0.84rem; }
    .arabic-surah {
      font-family: 'Scheherazade New', 'Amiri', serif;
      font-size: 2.2rem;
      color: #fff;
      text-shadow: 0 0 16px rgba(255,255,255,0.6);
    }

    .verse-stage {
      position: relative;
      background: rgba(4, 8, 12, 0.28);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 22px;
      padding: 46px 34px 40px 34px;
      margin-bottom: 18px;
      text-align: center;
      overflow: hidden;
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.5), inset 0 0 35px rgba(255, 255, 255, 0.04);
      transition: all 0.4s ease;
    }
    .verse-stage.playing {
      border-color: rgba(255, 255, 255, 0.5);
      box-shadow: 0 0 50px rgba(255, 255, 255, 0.16), 0 25px 60px rgba(0, 0, 0, 0.65);
    }

    .arabic-glow-verse {
      font-family: 'Scheherazade New', 'Amiri', serif;
      font-size: 2.95rem;
      line-height: 2.15;
      direction: rtl;
      margin-bottom: 24px;
      color: #ffffff;
      font-variant-ligatures: no-contextual;
      font-feature-settings: "calt" 0, "liga" 1;
      word-spacing: 4px;
      text-shadow:
        0 2px 6px rgba(0, 0, 0, 0.95),
        0 0 10px rgba(255, 255, 255, 0.85),
        0 0 26px rgba(255, 255, 255, 0.45),
        0 0 55px rgba(255, 255, 255, 0.22);
      position: relative;
      z-index: 2;
    }

    .french-glow-verse {
      font-family: 'Amiri', serif;
      font-size: 1.55rem;
      font-weight: 700;
      line-height: 1.65;
      color: #ffffff;
      text-shadow:
        0 2px 6px rgba(0, 0, 0, 0.95),
        0 0 10px rgba(255, 255, 255, 0.85),
        0 0 26px rgba(255, 255, 255, 0.45),
        0 0 55px rgba(255, 255, 255, 0.22);
      position: relative;
      z-index: 2;
      max-width: 92%;
      margin: 0 auto;
    }

    .sync-progress-track {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: rgba(255,255,255,0.08);
      z-index: 3;
    }
    .sync-progress-bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #38bdf8, #ffffff);
      box-shadow: 0 0 12px #38bdf8;
    }

    .audio-control-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
      padding: 12px 18px;
      border-radius: 16px;
      margin-bottom: 20px;
      font-size: 0.85rem;
    }
    .audio-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .btn-listen-sync {
      background: var(--green-dim);
      color: var(--green-bright);
      border: 1px solid rgba(52, 211, 153, 0.35);
      padding: 8px 16px;
      border-radius: 10px;
      font-family: inherit;
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-listen-sync:hover, .btn-listen-sync.active {
      background: var(--green-accent);
      color: #032218;
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.35);
    }
    .reciter-mini {
      background: rgba(8, 13, 18, 0.75);
      color: var(--text-main);
      border: 1px solid var(--border-color);
      padding: 7px 12px;
      border-radius: 10px;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      outline: none;
    }
    .reciter-mini option { background: #0b1116; color: #fff; }
    .volume-control-group {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(8, 13, 18, 0.75);
      border: 1px solid var(--border-color);
      padding: 4px 8px;
      border-radius: 10px;
    }
    .vol-btn {
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-main);
      border: 1px solid rgba(255, 255, 255, 0.14);
      padding: 3px 9px;
      border-radius: 7px;
      font-family: inherit;
      font-size: 0.78rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.18s ease;
    }
    .vol-btn:hover {
      background: var(--sky-accent);
      color: #031521;
      border-color: var(--sky-bright);
    }
    .vol-pct {
      font-size: 0.76rem;
      font-weight: 700;
      color: var(--sky-bright);
      min-width: 38px;
      text-align: center;
    }
    .auto-scroll-toggle {
      display: flex;
      align-items: center;
      gap: 7px;
      color: var(--text-main);
      font-size: 0.82rem;
      cursor: pointer;
      user-select: none;
    }

    .tafsir-box {
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 18px;
      padding: 26px;
      margin-bottom: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .section-tag {
      display: inline-block;
      font-size: 0.74rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--green-bright);
      margin-bottom: 10px;
    }
    .main-explanation {
      font-size: 1.06rem;
      color: #ffffff;
      text-shadow: 0 1px 4px rgba(0,0,0,0.8);
      line-height: 1.85;
      margin-bottom: 14px;
    }
    .consensus-note {
      background: rgba(16, 185, 129, 0.10);
      border-left: 3px solid var(--green-bright);
      padding: 13px 16px;
      border-radius: 0 12px 12px 0;
      color: #f1f5f9;
      font-size: 0.95rem;
      margin-top: 12px;
    }
    .sources-line {
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid var(--border-color);
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .bottom-nav {
      position: fixed;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 40px);
      max-width: 820px;
      background: rgba(8, 13, 18, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      padding: 10px 18px;
      border-radius: 18px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 15px 35px rgba(0,0,0,0.75);
      z-index: 50;
    }
    .btn {
      padding: 10px 24px;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .btn-prev { background: rgba(255,255,255,0.1); color: var(--text-main); }
    .btn-next { background: var(--green-accent); color: #032218; }
    .page-indicator { font-size: 0.85rem; color: var(--text-main); font-weight: 700; }

    @media (max-width: 768px) {
      body { padding: 12px 10px 85px 10px; }
      .panel { padding: 20px 15px; min-height: calc(100vh - 145px); }
      .verse-stage { padding: 36px 18px 32px 18px; }
      .arabic-glow-verse { font-size: 2.3rem; }
      .french-glow-verse { font-size: 1.3rem; }
      .arabic-surah { display: none; }
      .bottom-nav { width: calc(100% - 20px); }
    }
  </style>
</head>
<body>

  ${HTML_CIEL_ETOILE_SOURATE}

  <div class="interface-layer">
    <header class="top-nav">
      <a href="index.html?v=27" class="home-btn" onclick="sauvegarderConfigCiel()">
        ${genererLogoInlineSVG('nav-logo-svg')}
        ‹ Retour aux 114 Sourates
      </a>
      <div class="meta-badges">
        <span class="revelation-pill ${typeSourateClasse}">${typeSourateLabel}</span>
        ${htmlAccesRapideMiracle}
        <span class="tag">${ordreRev === 1 ? '1re Sourate révélée' : ordreRev + 'e Sourate révélée'} (Sourate n°${numSourate})</span>
        <select id="verseJumperSelect" class="verse-jumper ${vObj.miracle ? 'is-miracle-verse' : ''}" onchange="naviguerVerset(event, this.value, false)">
          ${optionsSelectVerset}
        </select>
      </div>
    </header>

    <div class="centered-container">
      <main class="panel">
        <div style="display: flex; flex-direction: column; flex: 1;">
          <div class="main-header">
            <div class="title-group">
              <div class="badge-num" id="badgeNumEl">${numSourate} : ${numVerset}</div>
              <div>
                <h1 id="mainTitleEl">Sourate ${nomSourate} (${nomFr}) — Verset ${numVerset}</h1>
                <p>${typeSourateLabel} (${lieu}) • Traduction Muhammad Hamidullah (1977) & Exégèse</p>
              </div>
            </div>
            <div class="arabic-surah">${nomArabe}</div>
          </div>

          <section class="verse-stage" id="verseStage">
            <div class="arabic-glow-verse" id="arabicVerseEl">${vObj.texteArabe}</div>
            <div class="french-glow-verse" id="frenchVerseEl">${numVerset}. ${vObj.tradPropre}</div>
            <div class="sync-progress-track">
              <div class="sync-progress-bar" id="syncProgressBar"></div>
            </div>
          </section>

          <div id="miracleContainer">
            ${vObj.miracle ? `
            <div class="miracle-banner">
              <div class="miracle-header"><span class="sky-star-icon">★</span> ${vObj.miracle.titre}</div>
              <p class="miracle-summary">${vObj.miracle.resume}</p>
              <button type="button" class="miracle-expand-btn" id="miracleToggleBtn" onclick="basculerDeveloppementMiracle()">
                ★ Développer l'explication complète & le Hadīth historique
              </button>
              <div class="miracle-deep-details" id="miracleDeepDetails">
                ${vObj.miracle.developpement}
              </div>
            </div>
            ` : ''}
          </div>

          <div class="audio-control-strip">
            <div class="audio-left">
              <button type="button" class="btn-listen-sync" id="playSyncBtn" onclick="toggleAudioSync()">▶ Écouter le verset</button>
              <select id="reciterSelect" class="reciter-mini" onchange="changerRecitateur()">
                <option value="Yasser_Ad-Dussary_128kbps">Yasser Al-Dosari</option>
                <option value="Alafasy_128kbps">Mishary Rashid Alafasy</option>
                <option value="Abdurrahmaan_As-Sudais_192kbps">Abderrahman Al-Soudais (HD)</option>
                <option value="Saood_ash-Shuraym_128kbps">Saoud Al-Shuraim</option>
                <option value="Nasser_Alqatami_128kbps">Nasser Al-Qatami</option>
                <option value="Abdullah_Basfar_192kbps">Abdullah Basfar (HD)</option>
                <option value="Minshawy_Murattal_128kbps">Mohamed Siddiq Al-Minshawi</option>
                <option value="Husary_128kbps">Mahmoud Khalil Al-Hussary</option>
                <option value="Hudhaify_128kbps">Ali Al-Hudhaify</option>
              </select>
              <div class="volume-control-group" title="Régler le volume audio">
                <button type="button" class="vol-btn" onclick="modifierVolume(-0.1)">🔉 -</button>
                <span class="vol-pct" id="volPctLabel">100%</span>
                <button type="button" class="vol-btn" onclick="modifierVolume(0.1)">🔊 +</button>
              </div>
            </div>
            <label class="auto-scroll-toggle">
              <input type="checkbox" id="autoNextCheck" onchange="sauverAutoNext()">
              Enchaîner au verset suivant automatiquement
            </label>
            <audio id="ayahAudio" preload="auto"></audio>
            <audio id="preloadNextAudio" preload="auto" style="display:none;"></audio>
          </div>

          <article class="tafsir-box">
            <span class="section-tag">Tafsīr & Explication du verset</span>
            <p class="main-explanation" id="mainExplanationEl">${vObj.explicationUnanime}</p>
            <div id="extraNotesContainer">
              ${vObj.noteUnique ? `<div class="consensus-note">${vObj.noteUnique}</div>` : ''}
              ${vObj.precisionConsensus ? `<div class="consensus-note">${vObj.precisionConsensus}</div>` : ''}
              ${vObj.texteLaurierPerso ? `<div class="consensus-note"><strong>Le Laurier de l'Exégèse :</strong> ${vObj.texteLaurierPerso}</div>` : ''}
            </div>
            <div class="sources-line">
              Traduction originale de Muhammad Hamidullah (1977) • Exégèse (Tafsīr) Al-Mukhtasar
            </div>
          </article>
        </div>
      </main>
    </div>
  </div>

  <nav class="bottom-nav">
    <a href="${vObj.lienPrecedent}" id="prevVerseLink" class="btn btn-prev" onclick="return naviguerVerset(event, this.getAttribute('href'), false)">‹ Précédent</a>
    <span class="page-indicator" id="pageIndicatorEl">Verset ${numVerset} / ${nbVersets}</span>
    <a href="${vObj.lienSuivant}" id="nextVerseLink" class="btn btn-next" onclick="return naviguerVerset(event, this.getAttribute('href'), false)">Suivant ›</a>
  </nav>

  <script src="${fichierDataJS}?v=27"></script>
  <script>
    const numSourateActuelle = ${numSourate};
    let numVersetActuel = ${numVerset};
    let codeAudio = "${vObj.codeAudio}";
    ${MOTEUR_SOLEIL_LUNE_V21_JS}
    ${SCRIPT_NAVIGATION_CLASSIQUE_V27}
  </script>
</body>
</html>`;

      fs.writeFileSync(path.join(dossierSite, nomFichier), htmlVerset, 'utf8');
    }
  }

  console.log('\nMise à jour de la page d\'accueil (index.html) avec le Logo sans bord bleu...');

  const cartesSouratesJSON = JSON.stringify(sourates.map(s => {
    const estMecquoise = s.revelation_place === 'makkah';
    const infoMiracle = souratesAvecMiracleMap[s.id] || null;
    return {
      id: s.id,
      nom: s.name_simple,
      nomFr: s.translated_name ? s.translated_name.name : '',
      nomAr: s.name_arabic,
      versets: s.verses_count,
      ordreRev: s.revelation_order,
      typeLabel: estMecquoise ? 'Mecquoise' : 'Médinoise',
      typeClasse: estMecquoise ? 'mecquoise' : 'medinoise',
      hasMiracle: Boolean(infoMiracle),
      miracleVerset: infoMiracle ? infoMiracle.premierVersetMiracle : 1,
      miracleTitre: infoMiracle ? infoMiracle.titre : ''
    };
  }));

  const htmlAccueil = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Coran Tafsīr">
  <link rel="icon" type="image/svg+xml" href="logo-v27.svg?v=27">
  <link rel="apple-touch-icon" href="logo-v27.svg?v=27">
  <link rel="canonical" href="https://corantafsir.com/">
  <title>Le Noble Coran & Tafsīr — Traduction Muhammad Hamidullah (1977) & Exégèse Al-Mukhtasar</title>
  <meta name="description" content="Lisez et écoutez les 114 sourates du Noble Coran avec le texte arabe, la traduction originale de Muhammad Hamidullah (1977) et l'exégèse (Tafsīr) Al-Mukhtasar.">
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Scheherazade+New:wght@400;700&family=Cinzel+Decorative:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-main: #020406;
      --bg-card: rgba(8, 14, 20, 0.22);
      --bg-card-hover: rgba(14, 24, 32, 0.36);
      --green-accent: #10b981;
      --green-bright: #34d399;
      --green-soft: rgba(16, 185, 129, 0.18);
      --sky-accent: #38bdf8;
      --sky-bright: #7dd3fc;
      --text-main: #f8fafc;
      --text-muted: #cbd5e1;
      --border-color: rgba(255, 255, 255, 0.15);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-main);
      color: var(--text-main);
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 32px 4vw 60px 4vw;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    ${CSS_BLEU_CIEL_V21}

    .wrapper { width: 100%; max-width: 1220px; margin: 0 auto; }

    .hero {
      text-align: center;
      margin-bottom: 26px;
      padding: 38px 24px 32px 24px;
      background: rgba(6, 11, 16, 0.18);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 26px;
      box-shadow: 0 18px 45px rgba(0,0,0,0.4), inset 0 0 30px rgba(255,255,255,0.03);
      position: relative;
      overflow: hidden;
    }
    .hero-logo-svg {
      width: 62px;
      height: 62px;
      margin: 0 auto 12px auto;
      display: block;
      filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 16px rgba(56, 189, 248, 0.45));
      animation: gentleFloatTitle 4s ease-in-out infinite alternate;
    }
    .hero-ornament-top {
      font-family: 'Scheherazade New', 'Amiri', serif;
      font-size: 1.45rem;
      color: rgba(255, 255, 255, 0.85);
      letter-spacing: 0.04em;
      margin-bottom: 8px;
      text-shadow: 0 0 14px rgba(255, 255, 255, 0.6);
      animation: gentleFloatTitle 4s ease-in-out infinite alternate;
    }
    .hero h1 {
      font-family: 'Cinzel Decorative', 'Amiri', serif;
      font-size: 3.1rem;
      font-weight: 900;
      letter-spacing: 0.03em;
      background: linear-gradient(
        110deg,
        #ffffff 0%,
        #e0f2fe 22%,
        #7dd3fc 45%,
        #ffffff 55%,
        #a7f3d0 78%,
        #ffffff 100%
      );
      background-size: 240% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 18px rgba(56, 189, 248, 0.35)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.85));
      animation: continuousTitleShimmer 6.5s linear infinite, gentleFloatTitle 4s ease-in-out infinite alternate;
    }
    @keyframes continuousTitleShimmer {
      0% { background-position: 0% center; }
      100% { background-position: 240% center; }
    }
    @keyframes gentleFloatTitle {
      0% { transform: translateY(0px); }
      100% { transform: translateY(-4px); }
    }
    .hero-glow-line {
      width: 240px;
      height: 2px;
      margin: 16px auto 16px auto;
      border-radius: 99px;
      background: linear-gradient(90deg, transparent, #ffffff, #38bdf8, #ffffff, transparent);
      background-size: 200% 100%;
      box-shadow: 0 0 16px rgba(56, 189, 248, 0.85);
      animation: lineGlowSweep 3.5s ease-in-out infinite alternate;
    }
    @keyframes lineGlowSweep {
      0% { width: 170px; opacity: 0.65; background-position: 0% 50%; }
      100% { width: 310px; opacity: 1; background-position: 100% 50%; }
    }

    .app-install-trigger {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(56, 189, 248, 0.14);
      color: #7dd3fc;
      border: 1px solid rgba(56, 189, 248, 0.45);
      padding: 8px 18px;
      border-radius: 99px;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 0 16px rgba(56, 189, 248, 0.18);
    }
    .app-install-trigger:hover {
      background: #38bdf8;
      color: #031521;
      box-shadow: 0 0 24px rgba(56, 189, 248, 0.5);
    }

    .modal-tuto-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(2, 4, 6, 0.82);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 100;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal-tuto-overlay.open {
      display: flex;
    }
    .modal-tuto-card {
      background: #071018;
      border: 1px solid rgba(56, 189, 248, 0.45);
      border-radius: 22px;
      max-width: 540px;
      width: 100%;
      padding: 26px 28px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(56, 189, 248, 0.2);
      color: #f8fafc;
      position: relative;
    }
    .modal-tuto-close {
      position: absolute;
      top: 16px;
      right: 18px;
      background: rgba(255,255,255,0.1);
      color: #fff;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      font-weight: 800;
      cursor: pointer;
    }
    .modal-tuto-card h3 {
      font-size: 1.18rem;
      color: #7dd3fc;
      margin-bottom: 14px;
    }
    .tuto-box {
      background: rgba(12, 21, 30, 0.85);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 14px;
      padding: 14px 16px;
      margin-bottom: 12px;
    }
    .tuto-box h4 {
      color: #34d399;
      font-size: 0.92rem;
      margin-bottom: 6px;
    }
    .tuto-box ol {
      padding-left: 18px;
      font-size: 0.86rem;
      color: #e2e8f0;
      line-height: 1.7;
    }

    .revelation-guide-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 26px;
    }
    .guide-box {
      background: rgba(8, 14, 20, 0.24);
      backdrop-filter: blur(7px);
      -webkit-backdrop-filter: blur(7px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      padding: 20px 24px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.35);
    }
    .guide-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .guide-header h3 {
      font-size: 1rem;
      color: #ffffff;
      font-weight: 800;
      text-shadow: 0 1px 4px rgba(0,0,0,0.8);
    }
    .guide-box p {
      font-size: 0.86rem;
      color: #e2e8f0;
      line-height: 1.65;
      text-shadow: 0 1px 3px rgba(0,0,0,0.85);
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      margin-bottom: 22px;
    }
    .sort-btn {
      background: var(--bg-card);
      backdrop-filter: blur(8px);
      color: var(--text-main);
      border: 1px solid var(--border-color);
      padding: 12px 22px;
      border-radius: 14px;
      cursor: pointer;
      font-family: inherit;
      font-weight: 700;
      font-size: 0.92rem;
      transition: all 0.2s ease;
    }
    .sort-btn:hover { border-color: var(--sky-bright); color: #fff; }
    .sort-btn.active {
      background: var(--green-accent);
      color: #032218;
      border-color: var(--green-bright);
      box-shadow: 0 0 25px rgba(16, 185, 129, 0.4);
    }
    .sort-btn.miracle-btn-filter.active {
      background: var(--sky-accent);
      color: #031521;
      border-color: var(--sky-bright);
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.5);
    }

    .search-box {
      width: 100%;
      max-width: 520px;
      margin: 0 auto 30px auto;
      display: block;
      padding: 14px 20px;
      border-radius: 14px;
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      backdrop-filter: blur(8px);
      color: #fff;
      font-family: inherit;
      font-size: 0.95rem;
      outline: none;
    }
    .search-box::placeholder { color: #cbd5e1; }
    .search-box:focus { border-color: var(--sky-bright); }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      gap: 16px;
    }
    .card {
      background: var(--bg-card);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: 1px solid var(--border-color);
      border-radius: 18px;
      padding: 18px 20px;
      text-decoration: none;
      color: inherit;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.22s ease;
      box-shadow: 0 10px 28px rgba(0,0,0,0.3);
    }
    .card:hover {
      background: var(--bg-card-hover);
      border-color: rgba(56, 189, 248, 0.45);
      transform: translateY(-3px);
      box-shadow: 0 16px 35px rgba(0,0,0,0.5);
    }
    .card-left { display: flex; align-items: center; gap: 14px; }
    .num-badge {
      background: var(--green-soft);
      color: var(--green-bright);
      border: 1px solid rgba(52, 211, 153, 0.3);
      font-weight: 800;
      padding: 9px 13px;
      border-radius: 10px;
      font-size: 0.92rem;
      min-width: 48px;
      text-align: center;
    }
    .card-info h2 {
      font-size: 1.02rem;
      color: #ffffff;
      margin-bottom: 5px;
      font-weight: 700;
      text-shadow: 0 1px 4px rgba(0,0,0,0.9);
    }
    .surah-subnum {
      color: #7dd3fc;
      font-size: 0.84rem;
      font-weight: 700;
    }
    .card-meta-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .card-meta-text {
      font-size: 0.78rem;
      color: var(--text-muted);
      text-shadow: 0 1px 3px rgba(0,0,0,0.9);
    }
    .ar-name {
      font-family: 'Scheherazade New', 'Amiri', serif;
      font-size: 1.7rem;
      color: #ffffff;
      text-shadow: 0 0 12px rgba(255,255,255,0.55);
      margin-left: 8px;
    }

    @media (max-width: 820px) {
      .hero h1 { font-size: 2.1rem; }
      .revelation-guide-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  ${HTML_SOLEIL_LUNE_ACCUEIL}

  <div class="wrapper interface-layer">
    <header class="hero">
      ${genererLogoInlineSVG('hero-logo-svg')}
      <div class="hero-ornament-top">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
      <h1>Le Noble Coran & Tafsīr</h1>
      <div class="hero-glow-line"></div>
      <button type="button" class="app-install-trigger" onclick="document.getElementById('tutoModal').classList.add('open')">
        📲 Mettre le site en application sur téléphone (Safari / Android)
      </button>
    </header>

    <div class="modal-tuto-overlay" id="tutoModal" onclick="if(event.target===this)this.classList.remove('open')">
      <div class="modal-tuto-card">
        <button type="button" class="modal-tuto-close" onclick="document.getElementById('tutoModal').classList.remove('open')">✕</button>
        <h3>📲 Ajouter Coran Tafsīr sur votre écran d'accueil</h3>
        <div class="tuto-box">
          <h4>🍎 Sur iPhone / iPad (avec Safari) :</h4>
          <ol>
            <li>Ouvrez <strong>corantafsir.com</strong> dans l'application <strong>Safari</strong>.</li>
            <li>Appuyez sur l'icône <strong>Partager</strong> (le carré avec une flèche vers le haut <strong>⬆️</strong> tout en bas de l'écran).</li>
            <li>Faites défiler vers le bas et appuyez sur <strong>« Sur l'écran d'accueil »</strong> puis sur <strong>Ajouter</strong> en haut à droite.</li>
          </ol>
        </div>
        <div class="tuto-box">
          <h4>🤖 Sur Android (avec Chrome) :</h4>
          <ol>
            <li>Ouvrez <strong>corantafsir.com</strong> dans <strong>Google Chrome</strong>.</li>
            <li>Appuyez sur les <strong>trois petits points (⋮)</strong> tout en haut à droite.</li>
            <li>Appuyez sur <strong>« Ajouter à l'écran d'accueil »</strong> ou <strong>« Installer l'application »</strong>.</li>
          </ol>
        </div>
      </div>
    </div>

    <section class="revelation-guide-grid">
      <div class="guide-box">
        <div class="guide-header">
          <h3>Qu'est-ce qu'une Sourate Mecquoise ?</h3>
          <span class="revelation-pill mecquoise">Mecquoise • 86 Sourates</span>
        </div>
        <p>
          Révélée <strong>avant l'Hégire</strong> (l'émigration du Prophète ﷺ vers Médine). Ces sourates fondent la foi du croyant : elles appellent à l'Unicité pure d'Allāh (<em>Tawhīd</em>), rappellent la Résurrection, le Jour du Jugement, le Paradis et l'Enfer, et relatent l'histoire des Prophètes anciens.
        </p>
      </div>
      <div class="guide-box">
        <div class="guide-header">
          <h3>Qu'est-ce qu'une Sourate Médinoise ?</h3>
          <span class="revelation-pill medinoise">Médinoise • 28 Sourates</span>
        </div>
        <p>
          Révélée <strong>après l'Hégire</strong>, lorsque les croyants formaient une société établie à Médine. Ces sourates détaillent les adorations pratiques, les lois familiales et sociales, la justice, l'éthique communautaire et les règles encadrant la vie des croyants.
        </p>
      </div>
    </section>

    <div class="controls">
      <button class="sort-btn active" onclick="trier('classique', this)">1. Ordre classique (1 à 114)</button>
      <button class="sort-btn" onclick="trier('chrono', this)">2. Ordre de Révélation (Chronologique : 1 à 114)</button>
      <button class="sort-btn miracle-btn-filter" onclick="trier('miracles', this)">3. <span class="sky-star-icon">★</span> Les Miracles & Prophéties du Coran</button>
    </div>

    <input type="text" id="searchInput" class="search-box" placeholder="Rechercher une sourate (ex: 10, Yunus, 30, Ar-Rum, Miracle...)" oninput="afficher()">

    <div id="grid" class="grid"></div>
  </div>

  <script>
    const sourates = ${cartesSouratesJSON};
    let modeTri = 'classique';

    function trier(mode, btn) {
      modeTri = mode;
      document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      afficher();
    }

    function afficher() {
      const q = document.getElementById('searchInput').value.toLowerCase().trim();
      const container = document.getElementById('grid');

      let liste = sourates.filter(s => {
        if (modeTri === 'miracles' && !s.hasMiracle) return false;
        return (
          s.nom.toLowerCase().includes(q) ||
          s.nomFr.toLowerCase().includes(q) ||
          s.typeLabel.toLowerCase().includes(q) ||
          s.miracleTitre.toLowerCase().includes(q) ||
          String(s.id) === q ||
          String(s.ordreRev) === q
        );
      });

      if (modeTri === 'chrono') {
        liste.sort((a, b) => a.ordreRev - b.ordreRev);
      } else {
        liste.sort((a, b) => a.id - b.id);
      }

      container.innerHTML = liste.map(s => {
        const badgeNumero = modeTri === 'chrono' ? s.ordreRev : s.id;
        const titreSourate = modeTri === 'chrono'
          ? \`\${s.nom} (\${s.nomFr}) <span class="surah-subnum">(Sourate \${s.id})</span>\`
          : \`\${s.nom} (\${s.nomFr})\`;
        const texteMeta = modeTri === 'chrono'
          ? \`\${s.ordreRev === 1 ? '1re sourate révélée' : s.ordreRev + 'e sourate révélée'} • \${s.versets} versets\`
          : \`\${s.versets} versets • Révélation n°\${s.ordreRev}\`;
        const versetCible = (modeTri === 'miracles' && s.hasMiracle) ? s.miracleVerset : 1;

        return \`
        <a href="sourate-\${s.id}-verset-\${versetCible}.html?v=27" class="card" onclick="sauvegarderConfigCiel()">
          <div class="card-left">
            <div class="num-badge">\${badgeNumero}</div>
            <div class="card-info">
              <h2>\${titreSourate}</h2>
              <div class="card-meta-row">
                <span class="revelation-pill \${s.typeClasse}">\${s.typeLabel}</span>
                \${s.hasMiracle ? \`<span class="revelation-pill miracle-pill">★ Miracle (v.\${s.miracleVerset})</span>\` : ''}
                <span class="card-meta-text">\${texteMeta}</span>
              </div>
            </div>
          </div>
          <div class="ar-name">\${s.nomAr}</div>
        </a>
        \`;
      }).join('');
    }
    afficher();

    ${MOTEUR_SOLEIL_LUNE_V21_JS}
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(dossierSite, 'index.html'), htmlAccueil, 'utf8');

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urlsSitemap.map(u => `  <url><loc>${u}</loc></url>`).join('\n') +
    `\n</urlset>`;
  fs.writeFileSync(path.join(dossierSite, 'sitemap.xml'), sitemapXML, 'utf8');

  const robotsTXT = `User-agent: *\nAllow: /\nSitemap: https://corantafsir.com/sitemap.xml\n`;
  fs.writeFileSync(path.join(dossierSite, 'robots.txt'), robotsTXT, 'utf8');

  console.log('\n✅ MISE À JOUR V27 TERMINÉE !');
  console.log('👉 Premier logo sans bordure bleue + Alif Lam Mim & Nûn corrigés + Cache Opera bloqué !');
}

lancerGeneration();
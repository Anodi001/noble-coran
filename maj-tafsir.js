const fs = require('fs');
const path = require('path');

const pMem = path.join(__dirname, 'memoire-site.json');
let mem = fs.existsSync(pMem)
  ? JSON.parse(fs.readFileSync(pMem, 'utf8'))
  : { miracles: {}, tafsirFr: {}, tafsirEn: {}, tafsirEs: {}, tafsirAr: {} };

// ============================================================================
// BLOC 2 (SOURATES 28 À 32 DE L'ORDRE DE RÉVÉLATION) : 95, 106, 101, 75, 104
// ============================================================================

const tafsirFr = {
  // --- 28e Révélée : SOURATE 95 — AT-TĪN (8 versets) ---
  "95:1": "<strong style='color:#ffffff;'>Les quatre serments solennels d'Allāh (v.1-3) :</strong><br><br>Allāh jure par le figuier et l'olivier (les lieux de prédication de Jésus en Palestine), par le mont Sinaï (où Mūsā/Moïse parla à Allāh), et par cette cité sûre (La Mecque, sanctuaire de la Révélation de Muhammad ﷺ) :",
  "95:4": "<strong style='color:#ffffff;'>La création de l'homme dans la stature la plus parfaite et harmonieuse.</strong>",
  "95:5": "<strong style='color:#ffffff;'>Puis sa rétrogradation dans le degré le plus bas s'il ne croit pas et n'obéit pas à son Créateur (l'Enfer ou la déchéance de la vieillesse selon les exégètes).</strong>",
  "95:6": "<strong style='color:#ffffff;'>L'exception des croyants qui accomplissent de bonnes œuvres :</strong><br><br>Ils auront une récompense ininterrompue et généreuse.",
  "95:7": "<strong style='color:#ffffff;'>Interpellation finale : Après cela, qui te traite de menteur au sujet du Jugement ?</strong>",
  "95:8": "<strong style='color:#ffffff;'>Allāh n'est-Il pas le plus Juste des juges ?</strong><br><br>📜 <strong>Hadith d'Abū Mūsā al-Ash‘arī (Abū Dāwūd n°887) :</strong> Le Messager d'Allāh ﷺ a dit : <em>« Lorsque l'un d'entre vous récite “At-Tīn wa az-zaytūn” et arrive au verset final “Allāh n'est-Il pas le plus Juste des juges ?”, qu'il réponde : “Certes oui, et je suis de cela au nombre des témoins !” (Balā wa anā ‘alā dhālika mina ash-shāhidīn). »</em>",

  // --- 29e Révélée : SOURATE 106 — QURAYSH (4 versets) ---
  "106:1": "<strong style='color:#ffffff;'>La faveur accordée à la tribu de Quraysh pour assurer leur union,</strong>",
  "106:2": "<strong style='color:#ffffff;'>et faciliter leurs voyages réguliers d'hiver (vers le Yémen) et d'été (vers le Shām / la Syrie) en toute sécurité grâce au prestige du Sanctuaire de La Mecque,</strong>",
  "106:3": "<strong style='color:#ffffff;'>qu'ils adorent donc exclusivement le Seigneur de cette Maison sacrée (la Ka‘bah) :</strong>",
  "106:4": "<strong style='color:#ffffff;'>Celui qui les a nourris pour les préserver de la faim et leur a accordé la sécurité contre toute terreur !</strong>",

  // --- 30e Révélée : SOURATE 101 — AL-QĀRI‘AH (11 versets) ---
  "101:1": "<strong style='color:#ffffff;'>Le Fracas (Al-Qāri‘ah) :</strong><br><br>L'un des noms redoutables du Jour de la Résurrection, qui frappe les cœurs par sa terreur.",
  "101:4": "<strong style='color:#ffffff;'>Le jour où les hommes seront pareils à des papillons éparpillés,</strong>",
  "101:5": "<strong style='color:#ffffff;'>et les montagnes pareilles à de la laine cardée de toutes les couleurs !</strong>",
  "101:6": "<strong style='color:#ffffff;'>La mise en balance des œuvres (v.6-9) :</strong><br><br>Celui dont la balance pèsera lourd en bonnes actions vivra dans une vie agréable et heureuse au Paradis, tandis que celui dont la balance pèsera léger aura pour deumeure l'abîme d'<em>Al-Hāwiyah</em>.",
  "101:10": "<strong style='color:#ffffff;'>Et qui te dira ce qu'est Al-Hāwiyah ?</strong>",
  "101:11": "<strong style='color:#ffffff;'>C'est un Feu ardent et consumant !</strong>",

  // --- 31e Révélée : SOURATE 75 — AL-QIYĀMAH (40 versets) ---
  "75:1": "<strong style='color:#ffffff;'>Serment par le Jour de la Résurrection (v.1) et par l'âme qui se blâme (An-Nafs al-Lawwāmah, v.2) :</strong><br><br>📜 Selon <strong>Hasan Al-Basrī</strong>, l'âme du croyant ne cesse de se reprocher ses manquements en disant : <em>« Pourquoi ai-je fait ceci ? Pourquoi ai-je dit cela ? »</em>",
  "75:3": "<strong style='color:#ffffff;'>L'étonnement des négateurs face à la résurrection :</strong><br><br>L'homme s'imagine-t-il que Nous ne pourrons jamais rassembler ses os après sa mort ?",
  "75:4": "<strong style='color:#ffffff;'>Bien au plus : Nous sommes Capables de reconstituer parfaitement jusqu'à ses extrémités digitales (ses empreintes digitales) !</strong><br><br>Ce rappel de la précision divine dans la recréation des empreintes digitales souligne l'unicité anatomique de chaque être humain.",
  "75:16": "<strong style='color:#ffffff;'>L'empressement du Prophète ﷺ à répéter la Révélation :</strong><br><br>Au début, craignant d'oublier les versets dictés par Jibrīl, le Prophète ﷺ hâtait sa langue pour les répéter aussitôt. Allāh le rassura :",
  "75:17": "<strong style='color:#ffffff;'>C'est à Nous qu'incombent de rassembler le Coran dans ton cœur et de t'en faciliter la récitation !</strong>",
  "75:18": "<strong style='color:#ffffff;'>Lorsque Nous te le récitons donc, suis attentivement sa récitation,</strong>",
  "75:19": "<strong style='color:#ffffff;'>puis c'est à Nous de t'en clarifier le sens et l'explication.</strong>",
  "75:22": "<strong style='color:#ffffff;'>Ce Jour-là, des visages seront radieux (v.22),</strong>",
  "75:23": "<strong style='color:#ffffff;'>regardant avec émerveillement vers leur Seigneur (v.23) !</strong><br><br>📜 C'est l'une des plus grandes preuves de la vision béatifique d'Allāh par les croyants au Paradis, confirmée par de nombreux Hadiths authentiques.",
  "75:26": "<strong style='color:#ffffff;'>L'angoisse suprême de l'agonie (v.26-30) :</strong><br><br>Quand l'âme remonte à la gorge, qu'on s'écrie : <em>« Qui peut le sauver ? »</em>, que le mourant comprend qu'il s'agit de la séparation définitive (la mort) et que ses jambes s'entrelacent dans les affres du trépas.",
  "75:36": "<strong style='color:#ffffff;'>Rappel de la création originelle : de la goutte de sperme éjaculée à l'embryon, puis au couple formé du mâle et de la femelle (v.36-40), prouvant qu' Celui qui a créé la vie peut parfaitement redonner la vie aux morts.</strong>",

  // --- 32e Révélée : SOURATE 104 — AL-HUMAZAH (9 versets) ---
  "104:1": "<strong style='color:#ffffff;'>Malheur à tout calomniateur (Al-Humazah) et diffamateur (Al-Lumazah) !</strong><br><br>Ceux qui rabaissent les gens, les critiquent par gestes ou par paroles, et sèment le mépris.",
  "104:2": "<strong style='color:#ffffff;'>Celui qui amasse des richesses en les comptant sans cesse,</strong>",
  "104:3": "<strong style='color:#ffffff;'>s'imaginant sottement que sa fortune l'immortalisera éternellement dans ce bas monde !</strong>",
  "104:4": "<strong style='color:#ffffff;'>Non et non ! Il sera certes jeté et écrasé dans l'Al-Hutamah (la Fournaise broyeuse).</strong>",
  "104:5": "<strong style='color:#ffffff;'>Et qui te dira ce qu'est l'Al-Hutamah ?</strong>",
  "104:6": "<strong style='color:#ffffff;'>C'est le Feu ardente d'Allāh, souverainement allumé,</strong>",
  "104:7": "<strong style='color:#ffffff;'>qui s'insinue et monte jusqu'aux cœurs des damnés !</strong><br><br>Selon Thābit Al-Bunānī, le feu atteint le cœur des criminels tout en les laissant en vie, dans un supplice infini."
};

const tafsirEn = {
  "95:1": "<strong style='color:#ffffff;'>The Four Divine Oaths & Human Dignity (v.1–8):</strong><br><br>📜 <strong>Hadith of Abū Mūsā al-Ash‘arī (Abū Dāwūd #887):</strong> The Prophet ﷺ instructed that upon reciting the final verse of Surah At-Tīn (<em>'Is not Allāh the most Just of judges?'</em>), one should respond: <em>'Balā wa anā ‘alā dhālika mina ash-shāhidīn'</em> (Certainly so, and of that I am among the witnesses).",
  "106:1": "<strong style='color:#ffffff;'>Blessings of Security and Provision for Quraysh (v.1–4):</strong><br><br>Reminding the tribe of Quraysh of Allāh's grace in securing their winter and summer trade caravans and protecting the Sacred Sanctuary, urging them to worship the Lord of the Ka‘bah exclusively.",
  "101:1": "<strong style='color:#ffffff;'>The Striking Calamity — Al-Qāri‘ah (v.1–11):</strong><br><br>Describes the terror of the Day of Judgment when people scatter like moths and mountains become like carded wool, followed by the weighing of deeds and the abyss of <em>Al-Hāwiyah</em>.",
  "75:1": "<strong style='color:#ffffff;'>The Resurrection and the Self-Reproaching Soul (v.1–40):</strong><br><br>📜 Highlights the precision of divine resurrection down to human fingertips (v.4), the divine guarantee of Quranic memorization for the Prophet ﷺ (v.16–19), the beatific vision of Allāh by the believers in Paradise (v.22–23), and the harrowing reality of the agony of death (v.26–30).",
  "104:1": "<strong style='color:#ffffff;'>Condemnation of the Backbiter and Slanderer (v.1–9):</strong><br><br>Warns those who accumulate wealth and mock people that they will be hurled into <em>Al-Hutamah</em>—the crushing Fire whose flames reach deep into human hearts."
};

const tafsirEs = {
  "95:1": "<strong style='color:#ffffff;'>Los cuatro juramentos y la justicia divina (v.1–8):</strong><br><br>📜 <strong>Hadiz de Abū Mūsā al-Ash‘arī (Abū Dāwūd n°887):</strong> El Profeta ﷺ enseñó que al recitar el versículo final de At-Tīn («¿Acaso no es Allah el más Justo de los jueces?»), se debe responder: <em>«Balā wa anā ‘alā dhālika mina ash-shāhidīn»</em> (¡Ciertamente sí, y de ello soy de los testigos!).",
  "106:1": "<strong style='color:#ffffff;'>El favor concedido a Quraysh (v.1–4):</strong><br><br>La seguridad en sus viajes comerciales de invierno y verano y la protección del Santuario para que adoren al Señor de la Casa Sagrada.",
  "101:1": "<strong style='color:#ffffff;'>La Calamidad — Al-Qāri‘ah (v.1–11):</strong><br><br>Describe el Día del Juicio, la dispersión de los hombres como polillas, el peso de las obras en la balanza y el abismo de <em>Al-Hāwiyah</em>.",
  "75:1": "<strong style='color:#ffffff;'>La Resurrección y la agonía de la muerte (v.1–40):</strong><br><br>Destaca la reconstrucción perfecta de las huellas dactilares, la visión beatífica de Allah por los creyentes en el Paraíso y la crudeza del trance de la muerte.",
  "104:1": "<strong style='color:#ffffff;'>Condena del difamador y avaro (v.1–9):</strong><br><br>Amenaza a quienes acumulan riquezas despreciando a los demás, arrojándolos a <em>Al-Hutamah</em>, el Fuego que devora hasta los corazones."
};

const tafsirAr = {
  "95:1": "<strong style='color:#ffffff;'>﴿وَالتِّينِ وَالزَّيْتُونِ * وَطُورِ سِينِينَ * وَهَذَا الْبَلَدِ الْأَمِينِ﴾</strong><br><br>📜 <strong>حديث أبي موسى الأشعري (أبو داود 887) :</strong> علمنا النبي ﷺ أنه من قرأ سورة التين ووصل إلى آية ﴿أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ﴾ أن يقول: <strong>«بلى وأنَا على ذلِكَ مِن الشَّاهدين»</strong>.",
  "106:1": "<strong style='color:#ffffff;'>﴿لِإِيلَافِ قُرَيْشٍ * إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ﴾</strong><br><br>📜 تذكير لقريش بنعمة الأمن والرزق وتيسير رحلتي التجارة الشتوية (إلى اليمن) والصيفية (إلى الشام) ببركة الحرم، ودعوتهم لتوحيد رب هذا البيت.",
  "101:1": "<strong style='color:#ffffff;'>﴿الْقَارِعَةُ * مَا الْقَارِعَةُ﴾</strong><br><br>📜 وصف أهوال القيامة وتطاير الناس كالفرشاث المبثوث والجبال كالعهن المنفوش، ووزن الأعمال ومصير الثقلين إلى الجنة أو الهاوية (آية 1-11).",
  "75:1": "<strong style='color:#ffffff;'>﴿لَا أُقْسِمُ بِيَوْمِ الْقِيَامَةِ * وَلَا أُقْسِمُ بِالنَّفْسِ اللَّوَّامَةِ﴾</strong><br><br>📜 بيان قدرة الله على تسوية بنان الإنسان (بصمات الأصابع)، وتكفل الله بجمع القرآن في صدر نبيه ﷺ، ورؤية المؤمنين لربهم في الجنة، وشدة سكرات الموت وبلغ التراقي (آية 1-40).",
  "104:1": "<strong style='color:#ffffff;'>﴿وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ﴾</strong><br><br>📜 الوعيد الشديد لمن عاب الناس واغتابهم وجمع المال وعدّده ظنًّا أنه مخلَّد، ومصيره إلى الحطمة التي تطلع على الأفئدة (آية 1-9)."
};

Object.assign(mem.tafsirFr, tafsirFr);
Object.assign(mem.tafsirEn, tafsirEn);
Object.assign(mem.tafsirEs, tafsirEs);
Object.assign(mem.tafsirAr, tafsirAr);

fs.writeFileSync(pMem, JSON.stringify(mem, null, 2), 'utf8');
console.log('✅ Bloc 2 (Sourates 95, 106, 101, 75 et 104) enregistré en 4 langues dans memoire-site.json !');
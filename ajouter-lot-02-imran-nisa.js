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

const dossierSite = path.join(__dirname, 'site');
const asbabPath = path.join(dossierSite, 'asbab-nuzul.json');
const cssPath = path.join(dossierSite, 'assets', 'verset.css');
const jsPath = path.join(dossierSite, 'assets', 'verset.js');
const workerPath = path.join(dossierSite, '_worker.js');

// ============================================================================
// 1. MISE À JOUR DU MOTEUR POUR SUPPORTER type: "hadith" + cache: "no-cache"
// ============================================================================
let moteurModifie = false;

// 1a. Style doré .type-hadith dans site/assets/verset.css
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('.asbab-nuzul-card.type-hadith')) {
  css += `
.asbab-nuzul-card.type-hadith {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.11), rgba(16, 185, 129, 0.06));
  border-color: rgba(251, 191, 36, 0.36);
  border-left-color: #fbbf24;
}
.asbab-nuzul-card.type-hadith[dir="rtl"] {
  border-left-color: rgba(251, 191, 36, 0.36);
  border-right-color: #fbbf24;
}
.asbab-nuzul-card.type-hadith .asbab-nuzul-title {
  color: #fcd34d;
}
`;
  writeSafe(cssPath, css);
  moteurModifie = true;
  console.log('✓ site/assets/verset.css : style doré .type-hadith ajouté.');
}

// 1b. Support TITRES_HADITH + fetch no-cache dans site/assets/verset.js
let vjs = fs.readFileSync(jsPath, 'utf8');
if (!vjs.includes('TITRES_HADITH')) {
  vjs = vjs.replace(
    /var LABELS_SOURCE = \{/,
    `var TITRES_HADITH = {
    fr: "📖 Hadith authentique & Exégèse",
    en: "📖 Authentic Hadith & Exegesis",
    es: "📖 Hadiz auténtico y Exégesis",
    ar: "📖 حديث صحيح في التفسير",
    de: "📖 Authentischer Hadith & Exegese",
    it: "📖 Hadith autentico ed Esegesi",
    id: "📖 Hadits Shahih & Penjelasan",
    ru: "📖 Достоверный хадис и тафсир"
  };
  var LABELS_SOURCE = {`
  );

  vjs = vjs.replace(
    /var url = \(window\.location\.protocol === "http:" \|\| window\.location\.protocol === "https:"\)\s*\?\s*"\/asbab-nuzul\.json\?v=1"\s*:\s*"asbab-nuzul\.json";\s*fetch\(url\)/,
    `var url = (window.location.protocol === "http:" || window.location.protocol === "https:")
      ? "/asbab-nuzul.json"
      : "asbab-nuzul.json";
    fetch(url, { cache: "no-cache" })`
  );

  vjs = vjs.replace(
    /var titre = TITRES_ASBAB\[lang\] \|\| TITRES_ASBAB\.fr;/,
    `var estHadith = recit.type === "hadith";
    var titre = estHadith ? (TITRES_HADITH[lang] || TITRES_HADITH.fr) : (TITRES_ASBAB[lang] || TITRES_ASBAB.fr);`
  );

  vjs = vjs.replace(
    /'<div class="asbab-nuzul-card" dir="'/,
    '\'<div class="asbab-nuzul-card\' + (estHadith ? " type-hadith" : "") + \'" dir="\''
  );

  try {
    new vm.Script(vjs, { filename: 'site/assets/verset.js' });
  } catch (err) {
    console.error('ERREUR DE SYNTAXE dans verset.js (non écrit) :\n', err.message);
    process.exit(1);
  }
  writeSafe(jsPath, vjs);
  moteurModifie = true;
  console.log('✓ site/assets/verset.js : support type "hadith" + fetch no-cache validé.');
}

// 1c. Support HADITH_TITRES_SSR dans site/_worker.js
let worker = fs.readFileSync(workerPath, 'utf8');
if (!worker.includes('HADITH_TITRES_SSR')) {
  worker = worker.replace(
    /async function obtenirAsbabSSR\(sNum, vNum, lang, env\) \{/,
    `const HADITH_TITRES_SSR = {
  fr: "📖 Hadith authentique & Exégèse",
  en: "📖 Authentic Hadith & Exegesis",
  es: "📖 Hadiz auténtico y Exégesis",
  ar: "📖 حديث صحيح في التفسير",
  de: "📖 Authentischer Hadith & Exegese",
  it: "📖 Hadith autentico ed Esegesi",
  id: "📖 Hadits Shahih & Penjelasan",
  ru: "📖 Достоверный хадис и тафсир"
};

async function obtenirAsbabSSR(sNum, vNum, lang, env) {`
  );

  worker = worker.replace(
    /const titre = \(ASBAB_TITRES_SSR\[lang\] \|\| ASBAB_TITRES_SSR\.fr\) \+ \(rec\.plage \? " \(" \+ rec\.plage \+ "\)" : ""\);/,
    `const estHadith = rec.type === "hadith";
    const mapTitres = estHadith ? HADITH_TITRES_SSR : ASBAB_TITRES_SSR;
    const titre = (mapTitres[lang] || mapTitres.fr) + (rec.plage ? " (" + rec.plage + ")" : "");`
  );

  worker = worker.replace(
    /'<div class="asbab-nuzul-card" dir="'/,
    '\'<div class="asbab-nuzul-card\' + (estHadith ? " type-hadith" : "") + \'" dir="\''
  );
  console.log('✓ site/_worker.js : support SSR type "hadith" ajouté.');
}

// Incrémenter SSR_VERSION
worker = worker.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
writeSafe(workerPath, worker);

// ============================================================================
// 2. AJOUT DU LOT 2 : SOURATES 3 (ĀL ‘IMRĀN) & 4 (AN-NISĀ') — 18 RÉCITS SAHĪH
// ============================================================================
const data = JSON.parse(fs.readFileSync(asbabPath, 'utf8'));
if (!data.recits) data.recits = {};

const LOT_02_IMRAN_NISA = {
  "3:7": {
    type: "hadith",
    versets: ["3:7"],
    plage: "3:7",
    source: "Sahīh Al-Bukhārī n°4547 & Sahīh Muslim n°2665",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ récita ce verset puis dit : « Lorsque vous voyez ceux qui s'attachent aux passages équivoques du Coran (al-mutashābihāt), ce sont eux qu'Allāh a désignés ici : prenez donc garde à eux ! »",
      en: "‘Ā’ishah (may Allāh be pleased with her) narrated that the Messenger of Allāh ﷺ recited this verse and said: 'When you see those who follow what is ambiguous in it, they are the ones whom Allāh has named here, so beware of them!'",
      es: "‘Ā’ishah relató que el Mensajero de Allah ﷺ recitó esta aleya y dijo: «Cuando veáis a quienes siguen los pasajes ambiguos del Corán, esos son los que Allah ha mencionado aquí; ¡guardaos pues de ellos!».",
      ar: "عن عائشة رضي الله عنها أن رسول الله ﷺ تلا هذه الآية ثم قال: «فإذا رأيتِ الذين يتّبعون ما تشابه منه فأولئك الذين سمّى الله فاحذروهم».",
      de: "‘Ā’ishah berichtete, dass der Gesandte Allahs ﷺ diesen Vers rezitierte und sagte: „Wenn ihr diejenigen seht, die dem Mehrdeutigen darin folgen, so sind sie es, die Allah hier benannt hat – nehmt euch also vor ihnen in Acht!“",
      it: "‘Ā’ishah narrò che il Messaggero di Allāh ﷺ recitò questo versetto e disse: «Quando vedete coloro che seguono i passi ambigui del Corano, sono proprio quelli che Allāh ha nominato qui: guardatevi dunque da loro!».",
      id: "‘Aisyah meriwayatkan bahwa Rasulullah ﷺ membaca ayat ini lalu bersabda: “Apabila kalian melihat orang-orang yang mengikuti ayat-ayat mutasyabihat (samar), merekalah yang disebut Allah dalam ayat ini, maka waspadalah terhadap mereka!”",
      ru: "‘Аиша передала, что Посланник Аллаха ﷺ прочёл этот аят и сказал: «Когда вы увидите тех, кто следует за иносказательными (неясными) аятами Корана, знайте, что это именно те, кого назвал Аллах, — остерегайтесь же их!»"
    }
  },
  "3:77": {
    type: "sabab",
    versets: ["3:77"],
    plage: "3:77",
    source: "Sahīh Al-Bukhārī n°4549, n°4550 & Sahīh Muslim n°138",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd et Al-Ash‘ath ibn Qays rapportent qu'un litige opposa Al-Ash‘ath à un homme au sujet d'un puits (ou d'un terrain). Le Prophète ﷺ rappela que quiconque prête un faux serment pour s'approprier injustement le bien d'autrui rencontrera Allāh en colère contre lui. Ce verset fut révélé à cette occasion pour condamner la trahison des engagements et les faux serments pour un vil prix.",
      en: "‘Abdullāh ibn Mas‘ūd and Al-Ash‘ath ibn Qays narrated that a dispute arose between Al-Ash‘ath and another man over a well. The Prophet ﷺ warned that whoever takes a false oath to seize another's property unlawfully will meet Allāh while He is angry with him. This verse was revealed condemning the sale of Allāh's covenant and oaths for a small price.",
      es: "‘Abdullāh ibn Mas‘ūd y Al-Ash‘ath ibn Qays relataron una disputa por un pozo en la que el Profeta ﷺ advirtió que quien jura en falso para apropiarse injustamente de bienes ajenos se encontrará con Allah airado contra él. Esta aleya fue revelada con ese motivo.",
      ar: "عن عبد الله بن مسعود والأشعث بن قيس رضي الله عنهما أنه كانت بين الأشعث ورجل خصومة في بئر، فقال النبي ﷺ: «من حلف على يمين صبر يقتطع بها مال امرئ مسلم هو فيها فاجر لقي الله وهو عليه غضبان»، فأنزل الله تصديق ذلك هذه الآية.",
      de: "‘Abdullāh ibn Mas‘ūd und Al-Ash‘ath ibn Qays berichteten von einem Streit um einen Brunnen, bei dem der Prophet ﷺ warnte, dass jeder, der einen falschen Eid schwört, um sich unrechtmäßig fremdes Eigentum anzueignen, Allah in Zorn begegnen wird. Zu diesem Anlass wurde dieser Vers offenbart.",
      it: "‘Abdullāh ibn Mas‘ūd e Al-Ash‘ath ibn Qays narrarono di una disputa su un pozzo durante la quale il Profeta ﷺ avvertì che chi giura il falso per appropriarsi ingiustamente dei beni altrui incontrerà Allāh adirato con lui. Questo versetto fu rivelato in tale occasione.",
      id: "‘Abdullah bin Mas‘ud dan Al-Asy‘ats bin Qais meriwayatkan perselisihan mengenai sebuah sumur; Nabi ﷺ memperingatkan bahwa siapa pun yang bersumpah palsu demi merampas harta orang lain akan bertemu Allah dalam keadaan Dia murka. Ayat ini pun diturunkan.",
      ru: "‘Абдуллах ибн Мас‘уд и аль-Аш‘ас ибн Кайс передали историю спора из-за колодца, когда Пророк ﷺ предупредил, что давший ложную клятву ради незаконного захвата чужого имущества встретит Аллаха в гневе. По этому случаю и был ниспослан данный аят."
    }
  },
  "3:121": {
    type: "sabab",
    versets: ["3:121", "3:122"],
    plage: "3:121–122",
    source: "Sahīh Al-Bukhārī n°4558 & Sahīh Muslim n°2505",
    degre: "Sahīh",
    texte: {
      fr: "Jābir ibn ‘Abdillāh (qu'Allāh les agrée) rapporte que le verset 122 (« Quand deux de vos groupes songèrent à fléchir, alors qu'Allāh est leur Allié ») fut révélé au sujet de deux clans des Ansār — les Banū Salimah et les Banū Hārithah — qui eurent un instant d'hésitation à la veille de la bataille d'Uhud après la défection des hypocrites. Jābir disait : « Nous ne voudrions pas qu'il n'ait pas été révélé, car Allāh y a affirmé : “Et Allāh est leur Allié !” »",
      en: "Jābir ibn ‘Abdillāh (may Allāh be pleased with them) narrated that verse 122 ('When two parties among you were about to lose heart, while Allāh was their Ally') was revealed concerning two Ansār clans—Banū Salimah and Banū Hārithah—at the Battle of Uhud. Jābir said: 'We would not wish it had not been revealed, for Allāh said in it: “And Allāh is their Ally.”'",
      es: "Yābir ibn ‘Abdillāh relató que la aleya 122 fue revelada acerca de dos clanes de los Ansār —Banū Salimah y Banū Hārithah— que dudaron brevemente en Uhud, y añadía: «Nos alegra que descendiera, pues Allah afirmó en ella que Él es su Protector».",
      ar: "عن جابر بن عبد الله رضي الله عنهما قال: فينا نزلت ﴿إِذْ هَمَّت طَّائِفَتَانِ مِنكُمْ أَن تَفْشَلَا وَاللَّهُ وَلِيُّهُمَا﴾، نحن الطائفتان بنو حارثة وبنو سلمة، وما نحب أنها لم تنزل لقول الله عز وجل: ﴿وَاللَّهُ وَلِيُّهُمَا﴾.",
      de: "Dschābir ibn ‘Abdillāh berichtete, dass Vers 122 über die beiden Ansār-Sippen Banū Salimah und Banū Hārithah am Tag von Uhud offenbart wurde, und fügte hinzu: „Wir wünschten nicht, er wäre nicht offenbart worden, denn Allah sagte darin: ‚Und Allah ist ihr Beschützer.‘“",
      it: "Jābir ibn ‘Abdillāh narrò che il versetto 122 fu rivelato riguardo a due clan degli Ansār — Banū Salimah e Banū Hārithah — ad Uhud, aggiungendo: «Non vorremmo mai che non fosse sceso, perché in esso Allāh afferma: “E Allāh è il loro Alleato”».",
      id: "Jabir bin ‘Abdillah meriwayatkan bahwa ayat 122 turun berkenaan dengan dua kabilah Anshar — Bani Salamah dan Bani Haritsah — pada Perang Uhud; ia berkata: “Kami justru bersyukur ayat itu turun karena Allah berfirman bahwa Dialah Pelindung keduanya.”",
      ru: "Джабир ибн ‘Абдуллах передал, что 122-й аят был ниспослан о двух племенах ансаров — Бану Салима и Бану Хариса — при Ухуде, и добавил: «Мы не хотели бы, чтобы он не был ниспослан, ведь Аллах сказал в нём: “Аллах — их Покровитель”»."
    }
  },
  "3:128": {
    type: "sabab",
    versets: ["3:128"],
    plage: "3:128",
    source: "Sahīh Al-Bukhārī n°4069, n°4559 & Sahīh Muslim n°1791",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik et Ibn ‘Umar (qu'Allāh les agrée) rapportent que le jour de la bataille d'Uhud, le visage du Messager d'Allāh ﷺ fut blessé et l'une de ses incisives fut brisée. En essuyant le sang, il s'exclama : « Comment réussirait un peuple qui a blessé son Prophète alors qu'il les appelle vers Allāh ? » Il invoqua également contre certains chefs de Quraysh durant la prière. Allāh révéla alors ce verset rappelant que le décret de la guidance et du pardon appartient à Allāh Seul (et plusieurs de ces chefs embrassèrent par la suite l'Islam).",
      en: "Anas ibn Mālik and Ibn ‘Umar narrated that at the Battle of Uhud, the Messenger of Allāh ﷺ had his face wounded and a tooth broken. Wiping the blood, he said: 'How can a people succeed who have wounded their Prophet while he calls them to Allāh?' Allāh then revealed this verse affirming that guidance and forgiveness belong solely to Allāh.",
      es: "Anas ibn Mālik e Ibn ‘Umar relataron que el día de Uhud el Profeta ﷺ fue herido en el rostro y se le fracturó un diente; al secarse la sangre preguntó cómo prosperaría un pueblo que hiere a su Profeta. Entonces Allah reveló esta aleya recordando que la guía y el perdón pertenecen solo a Él.",
      ar: "عن أنس بن مالك وابن عمر رضي الله عنهم أن النبي ﷺ شُجَّ وجهه وكُسرت رباعيته يوم أُحد فجعل يسلت الدم ويقول: «كيف يفلح قوم شجّوا نبيهم وهو يدعوهم إلى الله؟»، كما دعا على نفر من قريش، فأنزل الله هذه الآية بيانًا أن الأمر كله بيد الله وحده يتوب على من يشاء.",
      de: "Anas ibn Mālik und Ibn ‘Umar berichteten, dass der Prophet ﷺ am Tag von Uhud am Gesicht verletzt und ihm ein Zahn ausgeschlagen wurde. Während er das Blut abwischte, sagte er: „Wie kann ein Volk Erfolg haben, das seinen Propheten verletzt?“ Daraufhin offenbarte Allah diesen Vers, dass die Entscheidung allein bei Ihm liegt.",
      it: "Anas ibn Mālik e Ibn ‘Umar narrarono che il giorno di Uhud il Profeta ﷺ fu ferito al volto e gli fu spezzato un dente; asciugandosi il sangue disse: «Come può prosperare un popolo che ferisce il proprio Profeta?». Allāh rivelò allora questo versetto ricordando che la decisione appartiene solo a Lui.",
      id: "Anas bin Malik dan Ibnu ‘Umar meriwayatkan bahwa pada Perang Uhud wajah Nabi ﷺ terluka dan gigi seri beliau patah. Sambil mengusap darah, beliau bersabda: “Bagaimana mungkin suatu kaum beruntung setelah melukai Nabi mereka?” Maka Allah menurunkan ayat ini bahwa segala urusan adalah hak Allah semata.",
      ru: "Анас ибн Малик и Ибн ‘Умар передали, что в день битвы при Ухуде Пророк ﷺ получил ранение лица и у него был сломан зуб. Вытирая кровь, он сказал: «Как преуспеет народ, ранивший своего Пророка?» Тогда Аллах ниспослал этот аят, указав, что принятие покаяния и решение принадлежат одному Аллаху."
    }
  },
  "3:169": {
    type: "hadith",
    versets: ["3:169", "3:170", "3:171"],
    plage: "3:169–171",
    source: "Sahīh Muslim n°1887",
    degre: "Sahīh",
    texte: {
      fr: "Masrūq rapporte qu'ils interrogèrent ‘Abdullāh ibn Mas‘ūd au sujet de ce verset (« Ne pense pas que ceux qui ont été tués dans le sentier d'Allāh soient morts »). Il répondit : « Nous avons posé cette question au Prophète ﷺ et il nous a dit : “Leurs âmes sont dans le corps d'oiseaux verts qui disposent de lampes suspendues au Trône ; ils parcourent librement le Paradis où bon leur semble, puis reviennent se reposer dans ces lampes.” »",
      en: "Masrūq narrated that they asked ‘Abdullāh ibn Mas‘ūd about this verse ('Do not think of those who were killed in the way of Allāh as dead'). He replied: 'We asked the Prophet ﷺ about it and he said: “Their souls are inside green birds that have lanterns suspended beneath the Throne; they roam freely wherever they wish in Paradise, then return to those lanterns.”'",
      es: "Masrūq relató que preguntaron a ‘Abdullāh ibn Mas‘ūd por esta aleya y respondió que el Profeta ﷺ les explicó: «Sus almas están en el interior de aves verdes con lámparas suspendidas bajo el Trono; vuelan libremente por el Paraíso adonde desean y luego regresan a esas lámparas».",
      ar: "عن مسروق قال: سألنا عبد الله بن مسعود عن هذه الآية فقال: أما إنا قد سألنا عن ذلك النبي ﷺ فقال: «أرواحهم في جوف طير خضر، لها قناديل معلّقة بالعرش، تسرح من الجنة حيث شاءت ثم تأوي إلى تلك القناديل».",
      de: "Masrūq berichtete, dass sie ‘Abdullāh ibn Mas‘ūd nach diesem Vers fragten, woraufhin er die Antwort des Propheten ﷺ überlieferte: „Ihre Seelen befinden sich in grünen Vögeln, deren Laternen am Thron hängen; sie fliegen frei durch das Paradies, wohin sie wollen, und kehren dann zu diesen Laternen zurück.“",
      it: "Masrūq narrò che chiesero a ‘Abdullāh ibn Mas‘ūd spiegazioni su questo versetto ed egli riferì la risposta del Profeta ﷺ: «Le loro anime dimorano in uccelli verdi con lanterne sospese sotto il Trono; volano liberamente nel Paradiso dove desiderano e poi fanno ritorno a quelle lanterne».",
      id: "Masruq meriwayatkan bahwa mereka bertanya kepada ‘Abdullah bin Mas‘ud tentang ayat ini, lalu ia menyampaikan sabda Nabi ﷺ: “Ruh-ruh mereka berada di dalam rongga burung hijau yang memiliki pelita-pelita tergantung di ‘Arsy; mereka bebas terbang di Surga sekehendak hati lalu kembali ke pelita tersebut.”",
      ru: "Масрук передал, что они спросили ‘Абдуллаха ибн Мас‘уда об этом аяте, и он привёл слова Пророка ﷺ: «Их души находятся внутри зелёных птиц, у которых есть светильники, подвешенные под Троном; они свободно летают по Раю, где пожелают, а затем возвращаются к этим светильникам»."
    }
  },
  "3:172": {
    type: "sabab",
    versets: ["3:172", "3:173", "3:174"],
    plage: "3:172–174",
    source: "Sahīh Al-Bukhārī n°4077, n°4563 & Sahīh Muslim n°2418",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) dit à son neveu ‘Urwah : « Ton père Az-Zubayr et ton grand-père Abū Bakr faisaient partie de ceux au sujet desquels ces versets furent révélés ! » Au lendemain de la bataille d'Uhud, malgré leurs blessures et leur épuisement, lorsque le Prophète ﷺ appela à poursuivre l'armée de Quraysh jusqu'à Hamrā' al-Asad, soixante-dix Compagnons répondirent immédiatement à l'appel en disant : « Allāh nous suffit ! Quel excellent Garant ! »",
      en: "‘Ā’ishah (may Allāh be pleased with her) told her nephew ‘Urwah: 'Your father Az-Zubayr and your grandfather Abū Bakr were among those about whom these verses were revealed!' The day after Uhud, despite their wounds, seventy Companions immediately answered the Prophet's ﷺ call to march out to Hamrā' al-Asad, proclaiming: 'Sufficient for us is Allāh, and He is the best Disposer of affairs!'",
      es: "‘Ā’ishah dijo a su sobrino ‘Urwah que su padre Az-Zubayr y su abuelo Abū Bakr estaban entre aquellos sobre quienes descendieron estas aleyas: al día siguiente de Uhud, pese a sus heridas, setenta Compañeros respondieron al llamado del Profeta ﷺ hacia Hamrā' al-Asad diciendo: «¡Allah nos basta!».",
      ar: "عن عائشة رضي الله عنها أنها قالت لعروة: كان أبوك الزبير وأبو بكر من الذين استجابوا لله والرسول من بعد ما أصابهم القرح؛ حين ندب النبي ﷺ أصحابه للخروج في أثر المشركين إلى حمراء الأسد غداة أُحد فاستجاب سبعون منهم رغم جراحهم.",
      de: "‘Ā’ishah sagte zu ihrem Neffen ‘Urwah, dass sein Vater Az-Zubayr und sein Großvater Abū Bakr zu jenen gehörten, über die diese Verse offenbart wurden: Am Tag nach Uhud folgten siebzig verwundete Gefährten sofort dem Ruf des Propheten ﷺ nach Hamrā' al-Asad.",
      it: "‘Ā’ishah disse a suo nipote ‘Urwah che suo padre Az-Zubayr e suo nonno Abū Bakr erano tra coloro per i quali furono rivelati questi versetti: l'indomani di Uhud, nonostante le ferite, settanta Compagni risposero subito all'appello del Profeta ﷺ verso Hamrā' al-Asad.",
      id: "‘Aisyah berkata kepada keponakannya ‘Urwah bahwa ayahnya Az-Zubair dan kakeknya Abu Bakar termasuk orang-orang yang dimaksud ayat ini: sehari setelah Perang Uhud, meski terluka, tujuh puluh sahabat segera memenuhi seruan Nabi ﷺ menuju Hamra' al-Asad.",
      ru: "‘Аиша сказала своему племяннику ‘Урве, что его отец аз-Зубайр и дед Абу Бакр были среди тех, о ком ниспосланы эти аяты: на следующий день после Ухуда семьдесят раненых сподвижников немедленно откликнулись на призыв Пророка ﷺ выступить к Хамра аль-Асад."
    }
  },
  "3:188": {
    type: "sabab",
    versets: ["3:188"],
    plage: "3:188",
    source: "Sahīh Al-Bukhārī n°4567, n°4568 & Sahīh Muslim n°2777, n°2778",
    degre: "Sahīh",
    texte: {
      fr: "Abū Sa‘īd Al-Khudrī rapporte que ce verset fut révélé au sujet d'hypocrites qui restaient en arrière lors des expéditions du Prophète ﷺ, se réjouissaient de leur dérobade puis inventaient des excuses à son retour en espérant être loués. Dans une autre version authentique, Ibn ‘Abbās précise qu'il concerne aussi des savants des Gens du Livre qui dissimulèrent la vérité au Prophète ﷺ tout en attendant des éloges pour leurs réponses mensongères.",
      en: "Abū Sa‘īd Al-Khudrī narrated that this verse was revealed regarding hypocrites who stayed behind from expeditions, rejoiced in staying back, and later offered false excuses hoping to be praised. In another authentic report, Ibn ‘Abbās added that it also referred to scholars of the People of the Book who concealed the truth when questioned by the Prophet ﷺ yet sought praise.",
      es: "Abū Sa‘īd Al-Khudrī relató que esta aleya descendió acerca de hipócritas que se quedaban atrás en las expediciones y luego buscaban elogios con falsas excusas; Ibn ‘Abbās añadió que también aludía a quienes ocultaron la verdad al Profeta ﷺ esperando ser alabados.",
      ar: "عن أبي سعيد الخدري رضي الله عنه أنها نزلت في رجال من المنافقين كانوا يتخلفون عن الغزو ويفرحون بمقعدهم ثم يعتذرون ويحبون أن يُحمدوا بما لم يفعلوا، وذكر ابن عباس رضي الله عنهما أنها نزلت أيضًا في أهل الكتاب حين كتموا الحق وأخبروا النبي ﷺ بغيره.",
      de: "Abū Sa‘īd Al-Khudrī berichtete, dass dieser Vers über Heuchler offenbart wurde, die bei Feldzügen zurückblieben, sich darüber freuten und dennoch Lob erwarteten; Ibn ‘Abbās ergänzte, dass er auch Schriftgelehrte betraf, die dem Propheten ﷺ die Wahrheit verschwiegen.",
      it: "Abū Sa‘īd Al-Khudrī narrò che questo versetto fu rivelato riguardo agli ipocriti che restavano indietro durante le spedizioni cercando comunque elogi con false scuse; Ibn ‘Abbās aggiunse che riguardava anche chi nascose la verità al Profeta ﷺ attendendosi lode.",
      id: "Abu Sa‘id Al-Khudri meriwayatkan bahwa ayat ini turun berkenaan dengan orang-orang munafik yang mangkir dari peperangan namun tetap ingin dipuji dengan alasan palsu; Ibnu ‘Abbas menambahkan ayat ini juga terkait Ahli Kitab yang menyembunyikan kebenaran.",
      ru: "Абу Са‘ид аль-Худри передал, что этот аят был ниспослан о лицемерах, которые отсиживались дома во время походов и желали похвалы за ложные оправдания; Ибн ‘Аббас также указал, что он касался людей Писания, скрывших истину от Пророка ﷺ."
    }
  },
  "3:190": {
    type: "hadith",
    versets: ["3:190", "3:191", "3:192", "3:193", "3:194", "3:195", "3:196", "3:197", "3:198", "3:199", "3:200"],
    plage: "3:190–200",
    source: "Sahīh Al-Bukhārī n°183, n°4569 & Sahīh Muslim n°763",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) raconte qu'il passa une nuit chez sa tante Maymūnah, épouse du Prophète ﷺ. Au milieu de la nuit, le Messager d'Allāh ﷺ s'éveilla, s'essuya le visage pour chasser le sommeil, leva son regard vers le ciel et récita ces dix derniers versets de la Sourate Āl ‘Imrān avant de faire ses ablutions et de se lever pour la prière nocturne.",
      en: "Ibn ‘Abbās (may Allāh be pleased with them) narrated that he once stayed overnight at his aunt Maymūnah's home. In the middle of the night, the Messenger of Allāh ﷺ woke up, wiped sleep from his face, looked up at the sky, and recited these final ten verses of Sūrah Āl ‘Imrān before performing ablution and standing for night prayer.",
      es: "Ibn ‘Abbās relató que pasó una noche en casa de su tía Maymūnah; a medianoche, el Profeta ﷺ se despertó, se frotó el rostro, miró al cielo y recitó estas diez últimas aleyas de Āl ‘Imrān antes de hacer la ablución y rezar la oración nocturna.",
      ar: "عن ابن عباس رضي الله عنهما أنه بات عند خالته ميمونة زوج النبي ﷺ، فاستيقظ رسول الله ﷺ في جوف الليل فمسح النوم عن وجهه، ثم نظر إلى السماء وقرأ العشر الآيات الخواتيم من سورة آل عمران، ثم قام فتوضأ وصلى.",
      de: "Ibn ‘Abbās berichtete, dass er eine Nacht bei seiner Tante Maymūnah verbrachte: Mitten in der Nacht erwachte der Gesandte Allahs ﷺ, wischte sich den Schlaf aus dem Gesicht, blickte zum Himmel und rezitierte diese letzten zehn Verse von Sure Āl ‘Imrān, bevor er die Waschung vollzog und betete.",
      it: "Ibn ‘Abbās raccontò di aver trascorso una notte da sua zia Maymūnah: a metà della notte il Messaggero di Allāh ﷺ si svegliò, si passò la mano sul volto, alzò lo sguardo al cielo e recitò questi ultimi dieci versetti di Āl ‘Imrān prima di fare le abluzioni e pregare.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa ia bermalam di rumah bibinya Maimunah: di tengah malam Rasulullah ﷺ bangun, mengusap wajahnya, memandang ke langit, lalu membaca sepuluh ayat terakhir Surah Ali ‘Imran ini sebelum berwudhu dan mendirikan shalat malam.",
      ru: "Ибн ‘Аббас рассказал, что однажды заночевал у своей тёти Маймуны: посреди ночи Посланник Аллаха ﷺ проснулся, протёр лицо ото сна, взглянул на небо и прочёл эти десять последних аятов суры «Али ‘Имран», после чего совершил омовение и встал на ночную молитву."
    }
  },
  "4:3": {
    type: "sabab",
    versets: ["4:3"],
    plage: "4:3",
    source: "Sahīh Al-Bukhārī n°4574 & Sahīh Muslim n°3018",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) expliqua à ‘Urwah que ce verset fut révélé au sujet d'un tuteur qui avait une orpheline sous sa garde et désirait l'épouser pour sa fortune ou sa beauté sans lui verser une dot équitable. Allāh interdit d'épouser les orphelines sous tutelle si l'on craint de ne pas être juste envers elles, et rappela que la limite est d'une seule épouse dès que l'on craint de ne pas pouvoir maintenir l'équité.",
      en: "‘Ā’ishah (may Allāh be pleased with her) explained to ‘Urwah that this verse was revealed regarding a guardian who wished to marry an orphan girl under his care for her wealth or beauty without giving her a fair dowry. Allāh forbade marrying them unless full justice is upheld, and stressed marrying only one if one fears being unjust.",
      es: "‘Ā’ishah explicó a ‘Urwah que esta aleya fue revelada respecto a los tutores que querían casarse con huérfanas bajo su cuidado sin darles una dote justa; Allah prohibió hacerlo si se teme ser injusto y ordenó limitarse a una sola esposa si se teme faltar a la equidad.",
      ar: "عن عائشة رضي الله عنها أن هذه الآية نزلت في اليتيمة تكون في حجر وليّها فيرغب في مالها وجمالها ويريد أن يتزوجها بأقل من صداق مثلها، فنُهوا عن نكاحهن إلا أن يقسطوا لهن ويبلغوا بهن أعلى سنتهن في الصداق، وأُمروا بالاقتصار على واحدة عند خوف الجور.",
      de: "‘Ā’ishah erklärte ‘Urwah, dass dieser Vers über Vormünder offenbart wurde, die eine ihrer Obhut anvertraute Waise ohne gerechte Brautgabe heiraten wollten. Allah verbot dies bei Befürchtung von Ungerechtigkeit und betonte, bei Angst vor Unbilligkeit nur eine Frau zu heiraten.",
      it: "‘Ā’ishah spiegò a ‘Urwah che questo versetto fu rivelato riguardo a un tutore che desiderava sposare un'orfana sotto la sua custodia senza darle una dote equa: Allāh lo vietò se si teme di essere ingiusti, ribadendo di sposarne una sola qualora si tema di mancare di equità.",
      id: "‘Aisyah menjelaskan kepada ‘Urwah bahwa ayat ini turun berkenaan dengan wali yang ingin menikahi anak yatim perempuan dalam asuhannya tanpa memberi mahar yang adil; Allah melarang hal itu dan memerintahkan mencukupkan satu istri jika khawatir tidak berlaku adil.",
      ru: "‘Аиша пояснила ‘Урве, что этот аят был ниспослан об опекуне, желавшем жениться на сироте под своей опекой без справедливого брачного дара (махра). Аллах запретил это при опасении несправедливости и велел ограничиться одной женой, если человек боится быть несправедливым."
    }
  },
  "4:11": {
    type: "sabab",
    versets: ["4:11", "4:12"],
    plage: "4:11–12",
    source: "Sahīh Al-Bukhārī n°4577 & Sahīh Muslim n°1616",
    degre: "Sahīh",
    texte: {
      fr: "Jābir ibn ‘Abdillāh (qu'Allāh les agrée) raconte qu'il tomba gravement malade ; le Messager d'Allāh ﷺ et Abū Bakr vinrent lui rendre visite à pied et le trouvèrent inconscient. Le Prophète ﷺ fit ses ablutions et répandit sur lui un peu de cette eau. Quand Jābir reprit connaissance, il demanda : « Ô Messager d'Allāh, comment dois-je disposer de mes biens ? » Le Prophète ﷺ ne répondit rien jusqu'à ce que descendent ces versets établissant définitivement le droit successoral des femmes et des enfants.",
      en: "Jābir ibn ‘Abdillāh (may Allāh be pleased with them) narrated that he fell severely ill and the Prophet ﷺ and Abū Bakr walked to visit him, finding him unconscious. When he regained consciousness, Jābir asked how to dispose of his wealth; the Prophet ﷺ remained silent until these verses of inheritance were revealed.",
      es: "Yābir ibn ‘Abdillāh relató que cayó gravemente enfermo y el Profeta ﷺ junto a Abū Bakr acudieron a pie a visitarlo. Al recobrar el sentido, Yābir preguntó cómo debía repartir sus bienes, y entonces descendieron estas aleyas estableciendo las leyes de la herencia.",
      ar: "عن جابر بن عبد الله رضي الله عنهما قال: مرضتُ فجاءني رسول الله ﷺ وأبو بكر ماشيَين فوجداني قد أُغمي عليّ، فتوضأ النبي ﷺ وصبّ عليّ من وضوئه فأفقتُ فقلت: يا رسول الله، كيف أصنع في مالي؟ فلم يردّ عليّ شيئًا حتى نزلت آية الميراث.",
      de: "Dschābir ibn ‘Abdillāh berichtete, dass er schwer erkrankte und der Prophet ﷺ sowie Abū Bakr ihn zu Fuß besuchten. Als er wieder zu Bewusstsein kam und fragte, wie er über sein Vermögen verfügen solle, schwieg der Prophet ﷺ, bis diese Erbverse offenbart wurden.",
      it: "Jābir ibn ‘Abdillāh narrò che si ammalò gravemente e il Profeta ﷺ con Abū Bakr vennero a piedi a visitarlo. Ripresi i sensi, Jābir chiese come disporre dei suoi beni, e il Profeta ﷺ tacque finché scesero questi versetti sull'eredità.",
      id: "Jabir bin ‘Abdillah meriwayatkan bahwa ketika ia sakit keras, Nabi ﷺ dan Abu Bakar datang menjenguknya dengan berjalan kaki. Saat sadar, Jabir bertanya bagaimana ia harus mengatur hartanya, hingga turunlah ayat-ayat pembagian warisan ini.",
      ru: "Джабир ибн ‘Абдуллах рассказал, что тяжело заболел, и Пророк ﷺ с Абу Бакром пришли пешком навестить его. Придя в себя, Джабир спросил, как распорядиться своим имуществом, и Пророк ﷺ ничего не ответил, пока не были ниспосланы эти аяты о наследовании."
    }
  },
  "4:41": {
    type: "hadith",
    versets: ["4:41"],
    plage: "4:41",
    source: "Sahīh Al-Bukhārī n°4582, n°5050 & Sahīh Muslim n°800",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd (qu'Allāh l'agrée) rapporte : « Le Prophète ﷺ me dit : “Récite-moi du Coran.” Je répondis : “Ô Messager d'Allāh, vais-je te le réciter alors que c'est sur toi qu'il a été révélé ?” Il dit : “J'aime l'entendre d'un autre que moi.” Je commençai donc à réciter la Sourate An-Nisā', et lorsque j'arrivai à ce verset (“Comment seront-ils quand Nous ferons venir de chaque communauté un témoin, et que Nous t'amènerons comme témoin contre eux ?”), il me dit : “Cela suffit maintenant.” Je me tournai vers lui et vis que ses yeux débordaient de larmes. »",
      en: "‘Abdullāh ibn Mas‘ūd (may Allāh be pleased with him) narrated: 'The Prophet ﷺ said to me: “Recite the Qur'an to me.” I said: “Shall I recite it to you when it was revealed to you?” He replied: “I love to hear it from someone else.” So I recited Sūrah An-Nisā' until I reached this verse, and he said: “That is enough for now.” I turned toward him and saw his eyes overflowing with tears.'",
      es: "‘Abdullāh ibn Mas‘ūd relató que el Profeta ﷺ le pidió recitarle el Corán porque le gustaba escucharlo de otro. Al llegar recitando la Sura An-Nisā' a esta aleya, el Profeta ﷺ dijo: «Basta por ahora», y al mirarlo, sus ojos rebosaban de lágrimas.",
      ar: "عن عبد الله بن مسعود رضي الله عنه قال: قال لي النبي ﷺ: «اقرأ عليّ»، قلت: أقرأ عليك وعليك أُنزل؟ قال: «إني أحب أن أسمعه من غيري»، فقرأت عليه سورة النساء حتى بلغت هذه الآية فقال: «حسبك الآن»، فالتفتُّ إليه فإذا عيناه تذرفان.",
      de: "‘Abdullāh ibn Mas‘ūd berichtete, dass der Prophet ﷺ ihn bat, ihm aus dem Koran vorzutragen, da er ihn gern von jemand anderem höre. Als er in Sure An-Nisā' diesen Vers erreichte, sagte der Prophet ﷺ: „Es genügt jetzt“, und seine Augen flossen über vor Tränen.",
      it: "‘Abdullāh ibn Mas‘ūd narrò che il Profeta ﷺ gli chiese di recitargli il Corano poiché amava ascoltarlo da altri. Giunto a questo versetto di Sura An-Nisā', il Profeta ﷺ disse: «Basta così», e volgendosi verso di lui vide i suoi occhi traboccare di lacrime.",
      id: "‘Abdullah bin Mas‘ud meriwayatkan bahwa Nabi ﷺ memintanya membacakan Al-Qur'an karena beliau senang mendengarnya dari orang lain. Ketika sampai pada ayat ini dalam Surah An-Nisa', beliau berkata: “Cukup sampai di sini”, dan kedua mata beliau pun berlinang air mata.",
      ru: "‘Абдуллах ибн Мас‘уд рассказал, что Пророк ﷺ попросил его почитать Коран, сказав, что любит слушать его из уст другого. Когда он дошёл в суре «Ан-Ниса» до этого аята, Пророк ﷺ произнёс: «Достаточно», а глаза его были полны слёз."
    }
  },
  "4:43": {
    type: "sabab",
    versets: ["4:43"],
    plage: "4:43",
    source: "Sahīh Al-Bukhārī n°334, n°4583 & Sahīh Muslim n°367",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) rapporte qu'au cours d'une expédition, le collier qu'elle avait emprunté à sa sœur Asmā' se brisa et fut perdu. Le Prophète ﷺ fit halte pour le chercher avec ses Compagnons dans un lieu dépourvu d'eau ; lorsque l'heure de la prière arriva sans eau pour les ablutions, Allāh révéla le passage autorisant les ablutions sèches (At-Tayammum). Usayd ibn Hudayr s'exclama alors : « Ce n'est pas là votre première bénédiction pour la communauté, ô famille d'Abū Bakr ! »",
      en: "‘Ā’ishah (may Allāh be pleased with her) narrated that during an expedition, a necklace she had borrowed from her sister Asmā' was lost. The Prophet ﷺ halted to search for it in a waterless place; when prayer time arrived with no water for ablution, Allāh revealed the permission for dry ablution (Tayammum). Usayd ibn Hudayr said: 'This is not the first blessing from you, O family of Abū Bakr!'",
      es: "‘Ā’ishah relató que durante una expedición perdió el collar que había tomado prestado de su hermana Asmā'. El Profeta ﷺ se detuvo en un paraje sin agua para buscarlo y, al llegar la hora de la oración, Allah reveló la facilidad de la ablución seca (Tayammum).",
      ar: "عن عائشة رضي الله عنها أنها استعارت قلادة من أختها أسماء فهلكت في سفر، فأقام النبي ﷺ والناس لطلبها وليس معهم ماء، فحضرت الصلاة فأنزل الله آية التيمم تيسيرًا للأمة، فقال أسيد بن حضير: ما هي بأول بركتكم يا آل أبي بكر!",
      de: "‘Ā’ishah berichtete, dass auf einer Reise eine von ihrer Schwester Asmā' geliehene Halskette verloren ging. Der Prophet ﷺ ließ an einem wasserlosen Ort danach suchen; als die Gebetszeit eintrat, offenbarte Allah die Erleichterung der trockenen Waschung (Tayammum).",
      it: "‘Ā’ishah narrò che durante una spedizione si smarrì la collana prestatale dalla sorella Asmā'. Il Profeta ﷺ sostò in un luogo privo d'acqua per cercarla e, giunta l'ora della preghiera, Allāh rivelò la facilitazione dell'abluzione secca (Tayammum).",
      id: "‘Aisyah meriwayatkan bahwa dalam suatu perjalanan, kalung yang dipinjamnya dari saudarinya Asma' hilang. Nabi ﷺ berhenti mencarinya di tempat yang tidak memiliki air; ketika waktu shalat tiba, Allah menurunkan ayat keringanan tayamum ini.",
      ru: "‘Аиша передала, что во время похода потерялось ожерелье, которое она одолжила у сестры Асмы. Пророк ﷺ остановил войско для поисков в безводной местности, и когда настало время молитвы, Аллах ниспослал аят о сухом очищении (тайаммуме)."
    }
  },
  "4:59": {
    type: "sabab",
    versets: ["4:59"],
    plage: "4:59",
    source: "Sahīh Al-Bukhārī n°4584 & Sahīh Muslim n°1834",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte que ce verset (« Obéissez à Allāh, obéissez au Messager et à ceux d'entre vous qui détiennent l'autorité ») fut révélé au sujet de ‘Abdullāh ibn Hudhāfah as-Sahmī lorsque le Messager d'Allāh ﷺ le désigna à la tête d'une expédition — rappelant l'obéissance due aux responsables dans le bien, tout en la subordonnant strictement à Allāh et à Son Messager ﷺ.",
      en: "Ibn ‘Abbās (may Allāh be pleased with them) narrated that this verse ('Obey Allāh and obey the Messenger and those in authority among you') was revealed concerning ‘Abdullāh ibn Hudhāfah as-Sahmī when the Prophet ﷺ appointed him commander of an expedition—establishing lawful obedience within what pleases Allāh and His Messenger ﷺ.",
      es: "Ibn ‘Abbās relató que esta aleya fue revelada respecto a ‘Abdullāh ibn Hudhāfah as-Sahmī cuando el Profeta ﷺ lo envió al mando de una expedición, estableciendo la obediencia a la autoridad dentro de los límites de la obediencia a Allah y Su Mensajero ﷺ.",
      ar: "عن ابن عباس رضي الله عنهما أن قوله تعالى: ﴿أَطِيعُوا اللَّهَ وَأَطِيعُوا الرَّسُولَ وَأُولِي الْأَمْرِ مِنكُمْ﴾ نزل في عبد الله بن حذافة بن قيس السهمي إذ بعثه النبي ﷺ في سرية، بيانًا لوجوب الطاعة بالمعروف في غير معصية الله.",
      de: "Ibn ‘Abbās berichtete, dass dieser Vers bezüglich ‘Abdullāh ibn Hudhāfah as-Sahmī offenbart wurde, als der Prophet ﷺ ihn als Leiter einer Expedition entsandte – womit Gehorsam gegenüber Verantwortlichen im Rahmen des Erlaubten festgelegt wurde.",
      it: "Ibn ‘Abbās narrò che questo versetto fu rivelato riguardo ad ‘Abdullāh ibn Hudhāfah as-Sahmī quando il Profeta ﷺ lo pose a capo di una spedizione, stabilendo l'obbedienza alle autorità nel bene e nei limiti di Allāh e del Suo Messaggero ﷺ.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa ayat ini turun berkenaan dengan ‘Abdullah bin Hudzafah as-Sahmi ketika Nabi ﷺ mengutusnya memimpin suatu pasukan, sebagai penegasan ketaatan kepada pemimpin dalam hal yang makruf.",
      ru: "Ибн ‘Аббас передал, что этот аят был ниспослан в связи с ‘Абдуллахом ибн Хузафой ас-Сахми, которого Пророк ﷺ назначил командиром отряда, утверждая повиновение правителям в благом и без ослушания Аллаха."
    }
  },
  "4:65": {
    type: "sabab",
    versets: ["4:65"],
    plage: "4:65",
    source: "Sahīh Al-Bukhārī n°2359, n°4585 & Sahīh Muslim n°2357",
    degre: "Sahīh",
    texte: {
      fr: "‘Urwah rapporte qu'Az-Zubayr ibn al-‘Awwām eut un différend avec un homme des Ansār au sujet d'un cours d'eau d'irrigation à Al-Harrah. Le Prophète ﷺ jugea équitablement : « Ô Zubayr, irrigue ta terre puis laisse l'eau couler vers ton voisin. » L'homme s'emporta en disant : « Est-ce parce qu'il est ton cousin ? » Le visage du Prophète ﷺ changea, et Az-Zubayr disait que c'est à cette occasion que fut révélé ce serment solennel sur l'acceptation pleine et sincère du jugement du Messager ﷺ.",
      en: "‘Urwah narrated that Az-Zubayr ibn al-‘Awwām disputed with an Ansārī man over an irrigation stream at Al-Harrah. The Prophet ﷺ ruled fairly: 'Irrigate your land, O Zubayr, then let the water flow to your neighbor.' When the man objected, saying it was because Az-Zubayr was his cousin, Az-Zubayr stated this verse was revealed affirming heartfelt acceptance of the Prophet's ﷺ judgment.",
      es: "‘Urwah relató que Az-Zubayr disputó con un hombre de los Ansār por el agua de riego en Al-Harrah. Cuando el hombre objetó el fallo justo del Profeta ﷺ insinuando favoritismo, Az-Zubayr dijo que esta aleya descendió afirmando la aceptación plena del juicio del Mensajero ﷺ.",
      ar: "عن عروة أن الزبير بن العوام خاصم رجلًا من الأنصار في شراج الحرّة التي يسقون بها النخل، فقضى النبي ﷺ بالعدل: «اسقِ يا زبير ثم أرسل الماء إلى جارك»، فغضب الأنصاري وقال: أن كان ابن عمتك! قال الزبير: فأحسب هذه الآية نزلت في ذلك.",
      de: "‘Urwah berichtete, dass Az-Zubayr mit einem Mann der Ansār über einen Bewässerungskanal in Al-Harrah stritt. Als der Mann das gerechte Urteil des Propheten ﷺ anzweifelte, sagte Az-Zubayr, dass dieser Vers über die aufrichtige Annahme des prophetischen Urteils offenbart wurde.",
      it: "‘Urwah narrò che Az-Zubayr ebbe una disputa con un uomo degli Ansār per l'acqua di irrigazione ad Al-Harrah. Quando l'uomo contestò il giudizio equo del Profeta ﷺ insinuando favoritismo, Az-Zubayr affermò che questo versetto fu rivelato sull'accettazione sincera del giudizio del Messaggero ﷺ.",
      id: "‘Urwah meriwayatkan bahwa Az-Zubair berselisih dengan seorang laki-laki Anshar mengenai aliran air irigasi di Al-Harrah. Ketika orang itu memprotes keputusan adil Nabi ﷺ, Az-Zubair menyatakan bahwa ayat ini turun berkenaan dengan peristiwa tersebut.",
      ru: "‘Урва передал, что аз-Зубайр поспорил с одним из ансаров из-за воды для орошения в аль-Харре. Когда тот усомнился в справедливом решении Пророка ﷺ, аз-Зубайр сказал, что этот аят был ниспослан по данному случаю в подтверждение искреннего принятия суда Пророка ﷺ."
    }
  },
  "4:94": {
    type: "sabab",
    versets: ["4:94"],
    plage: "4:94",
    source: "Sahīh Al-Bukhārī n°4591 & Sahīh Muslim n°3025",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte qu'une patrouille de musulmans rencontra un homme avec un petit troupeau de moutons. L'homme les salua en disant : « As-Salāmu ‘alaykum ! » Mais ils crurent à une ruse, le tuèrent et prirent son troupeau. Allāh révéla alors ce verset sévère interdisant de rejeter la parole de paix de quiconque s'adresse à eux ainsi, et ordonnant la vérification scrupuleuse.",
      en: "Ibn ‘Abbās (may Allāh be pleased with them) narrated that a Muslim patrol encountered a man tending a small flock of sheep who greeted them with 'As-Salāmu ‘alaykum!' Suspecting a ruse, they killed him and took his flock. Allāh then revealed this stern verse forbidding anyone from dismissing a greeting of peace and commanding careful verification.",
      es: "Ibn ‘Abbās relató que una patrulla encontró a un hombre con un pequeño rebaño que los saludó con «As-Salāmu ‘alaykum», pero creyendo que fingía lo mataron y tomaron su rebaño. Allah reveló esta severa aleya prohibiendo despreciar el saludo de paz y ordenando verificar siempre.",
      ar: "عن ابن عباس رضي الله عنهما أن رجلًا في غُنيمة له لحقه المسلمون فقال: السلام عليكم، فقتلوه وأخذوا غُنيمته، فأنزل الله هذه الآية ناهيًا عن تكذيب من ألقى السلام وآمرًا بالتبيّن والتثبّت.",
      de: "Ibn ‘Abbās berichtete, dass eine muslimische Patrouille auf einen Mann mit einer kleinen Schafherde traf, der sie mit „As-Salāmu ‘alaykum“ grüßte; sie hielten es für eine List, töteten ihn und nahmen die Herde. Daraufhin offenbarte Allah diesen strengen Vers zur Pflicht sorgfältiger Prüfung.",
      it: "Ibn ‘Abbās narrò che una pattuglia incontrò un uomo con un piccolo gregge che li salutò dicendo «As-Salāmu ‘alaykum!», ma credendo a un inganno lo uccisero e presero il gregge. Allāh rivelò questo severo versetto che vieta di respingere il saluto di pace e impone di verificare.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa sekelompok pasukan bertemu seorang pria penggembala kambing yang mengucapkan salam “Assalamu ‘alaikum”, namun mereka menyangkanya berpura-pura lalu membunuhnya dan mengambil ternaknya. Maka Allah menurunkan ayat peringatan tegas ini.",
      ru: "Ибн ‘Аббас передал, что мусульманский отряд встретил человека с небольшим стадом овец, который приветствовал их словами «Ас-саляму ‘алейкум», но его убили, приняв это за уловку. Тогда Аллах ниспослал этот строгий аят, запретив отвергать приветствие мира и повелев тщательно проверять."
    }
  },
  "4:95": {
    type: "sabab",
    versets: ["4:95"],
    plage: "4:95",
    source: "Sahīh Al-Bukhārī n°4592, n°4594 & Sahīh Muslim n°1898",
    degre: "Sahīh",
    texte: {
      fr: "Zayd ibn Thābit et Al-Barā' ibn ‘Āzib rapportent que lorsque descendit le début du verset (« Ne sont pas égaux ceux des croyants qui restent chez eux et ceux qui luttent dans le sentier d'Allāh »), le Compagnon aveugle ‘Abdullāh ibn Umm Maktūm vint dire : « Ô Messager d'Allāh, si je le pouvais, je sortirais assurément ! » La Révélation descendit aussitôt sur le Prophète ﷺ, ajoutant l'exception : « hormis ceux qui ont un empêchement (ghayru ulī ad-darar) ».",
      en: "Zayd ibn Thābit and Al-Barā' ibn ‘Āzib narrated that when 'Not equal are those believers who remain behind and those who strive in the cause of Allāh' was revealed, the blind Companion ‘Abdullāh ibn Umm Maktūm said: 'O Messenger of Allāh, if I were able, I would surely go out!' Revelation immediately descended adding the exception: 'other than the disabled.'",
      es: "Zayd ibn Thābit y Al-Barā' relataron que al revelarse la primera parte de esta aleya, el Compañero ciego ‘Abdullāh ibn Umm Maktūm expresó su deseo de participar si pudiera; de inmediato descendió la Revelación añadiendo la excepción: «excepto quienes tienen un impedimento».",
      ar: "عن زيد بن ثابت والبراء بن عازب رضي الله عنهما أنه لما نزل قوله تعالى: ﴿لَّا يَسْتَوِي الْقَاعِدُونَ مِنَ الْمُؤْمِنِينَ وَالْمُجَاهِدُونَ﴾ جاء عبد الله بن أم مكتوم وكان أعمى فقال: يا رسول الله، لو أستطيع لجاهدت، فنزل الوحي فورًا بقوله تعالى: ﴿غَيْرُ أُولِي الضَّرَرِ﴾.",
      de: "Zayd ibn Thābit und Al-Barā' berichteten, dass der blinde Gefährte ‘Abdullāh ibn Umm Maktūm nach der Offenbarung des Versbeginns sagte: „O Gesandter Allahs, wenn ich könnte, würde ich gewiss ausziehen!“ Sogleich offenbarte Allah die Ausnahme: „außer denen, die ein Gebrechen haben“.",
      it: "Zayd ibn Thābit e Al-Barā' narrarono che alla rivelazione dell'inizio del versetto, il Compagno cieco ‘Abdullāh ibn Umm Maktūm disse che sarebbe uscito se avesse potuto; subito scese la Rivelazione aggiungendo l'eccezione: «eccetto coloro che hanno un impedimento».",
      id: "Zaid bin Tsabit dan Al-Bara' meriwayatkan bahwa ketika awal ayat ini turun, sahabat tunanetra ‘Abdullah bin Ummi Maktum berkata bahwa ia pasti ikut berangkat seandainya mampu. Seketika wahyu pun turun menambahkan pengecualian: “selain yang mempunyai uzur.”",
      ru: "Зайд ибн Сабит и аль-Бара передали, что когда была ниспослана первая часть аята, слепой сподвижник ‘Абдуллах ибн Умм Мактум сказал: «О Посланник Аллаха, если бы я мог, я непременно выступил бы!» — и сразу было ниспослано исключение: «кроме тех, кто имеет уважительную причину (недуг)»."
    }
  },
  "4:128": {
    type: "sabab",
    versets: ["4:128"],
    plage: "4:128",
    source: "Sahīh Al-Bukhārī n°4601 & Sahīh Muslim n°3021",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) rapporte que ce verset fut révélé au sujet d'une épouse qui craint que son mari ne s'éloigne d'elle (par exemple avec l'âge) et qui préfère préserver le lien du mariage en concluant un arrangement amiable de plein gré avec lui — ce que fit Sawdah bint Zam‘ah afin de demeurer parmi les épouses du Prophète ﷺ. Allāh confirma que la conciliation amiable est licite et préférable.",
      en: "‘Ā’ishah (may Allāh be pleased with her) narrated that this verse was revealed regarding a wife who fears aversion or separation from her husband and willingly agrees to an amicable settlement to preserve the marriage—as Sawdah bint Zam‘ah did. Allāh affirmed that peaceful reconciliation is lawful and best.",
      es: "‘Ā’ishah relató que esta aleya fue revelada respecto a la esposa que teme el alejamiento de su marido y acuerda voluntariamente una conciliación amistosa para preservar el matrimonio, confirmando Allah que la reconciliación es lícita y mejor.",
      ar: "عن عائشة رضي الله عنها أن هذه الآية نزلت في المرأة تكون عند الرجل فيخشى أن يفارقها أو يعرض عنها فتصالحه عن طيب نفس على بقاء الزوجية، كما فعلت سودة بنت زمعة رضي الله عنها، فبيّن الله أن الصلح والتراضي خير.",
      de: "‘Ā’ishah berichtete, dass dieser Vers über eine Ehefrau offenbart wurde, die eine Abwendung ihres Mannes befürchtet und aus freien Stücken eine gütliche Einigung trifft, um die Ehe zu bewahren – worin Allah bekräftigte, dass Versöhnung besser ist.",
      it: "‘Ā’ishah narrò che questo versetto fu rivelato riguardo a una moglie che teme l'allontanamento del marito e sceglie liberamente un accordo amichevole per preservare il matrimonio, confermando Allāh che la conciliazione è lecita e migliore.",
      id: "‘Aisyah meriwayatkan bahwa ayat ini turun berkenaan dengan seorang istri yang khawatir dijauhi suaminya lalu dengan sukarela menyepakati perdamaian demi menjaga keutuhan rumah tangga, dan Allah menegaskan bahwa perdamaian itu lebih baik.",
      ru: "‘Аиша передала, что этот аят был ниспослан о жене, опасающейся отчуждения мужа и добровольно заключающей с ним мировое соглашение ради сохранения брака, как поступила Сауда бинт Зам‘а; Аллах подтвердил, что примирение лучше."
    }
  },
  "4:176": {
    type: "sabab",
    versets: ["4:176"],
    plage: "4:176",
    source: "Sahīh Al-Bukhārī n°4605 & Sahīh Muslim n°1616",
    degre: "Sahīh",
    texte: {
      fr: "Jābir ibn ‘Abdillāh (qu'Allāh les agrée) rapporte que ce verset final — appelé « le verset d'Al-Kalālah » (la succession d'une personne décédée sans père ni enfant) — fut révélé à son sujet alors qu'il était malade et n'avait pour héritières que ses sœurs. Al-Barā' ibn ‘Āzib précise dans le Sahīh Al-Bukhārī (n°4605) qu'il s'agit du tout dernier verset révélé sur les règles de l'héritage.",
      en: "Jābir ibn ‘Abdillāh (may Allāh be pleased with them) narrated that this closing verse—known as the verse of Al-Kalālah (inheritance of one leaving neither parent nor child)—was revealed concerning him when he fell ill leaving only sisters. Al-Barā' ibn ‘Āzib noted in Sahīh Al-Bukhārī (4605) that it was the very last verse revealed on inheritance.",
      es: "Yābir ibn ‘Abdillāh relató que esta última aleya —conocida como la aleya de Al-Kalālah (herencia de quien fallece sin padres ni hijos)— fue revelada respecto a él al tener únicamente hermanas; Al-Barā' precisó que fue la última aleya revelada sobre herencias.",
      ar: "عن جابر بن عبد الله رضي الله عنهما أن هذه الآية الأخيرة — المسماة آية الكلالة — نزلت في شأنه حين مرض ولم يكن له إلا أخوات، وذكر البراء بن عازب في صحيح البخاري أنها آخر آية نزلت في الفرائض.",
      de: "Dschābir ibn ‘Abdillāh berichtete, dass dieser Schlussvers – der Vers über Al-Kalālah (Erbschaft ohne Eltern und Kinder) – über ihn offenbart wurde, als er erkrankte und nur Schwestern hatte; laut Al-Barā' war er der letzte Vers über das Erbrecht.",
      it: "Jābir ibn ‘Abdillāh narrò che questo versetto conclusivo — chiamato versetto di Al-Kalālah (l'eredità di chi muore senza genitori né figli) — fu rivelato a suo riguardo; Al-Barā' precisò che fu l'ultimo versetto rivelato sulle successioni.",
      id: "Jabir bin ‘Abdillah meriwayatkan bahwa ayat penutup ini — ayat Kalalah (warisan orang yang wafat tanpa orang tua dan anak) — turun berkenaan dengannya karena ia hanya memiliki saudara-saudara perempuan; menurut Al-Bara', inilah ayat terakhir tentang warisan.",
      ru: "Джабир ибн ‘Абдуллах передал, что этот заключительный аят — аят о каляле (наследовании после человека без родителей и детей) — был ниспослан в связи с ним; аль-Бара ибн ‘Азиб уточнил, что это последний ниспосланный аят о наследстве."
    }
  }
};

Object.assign(data.recits, LOT_02_IMRAN_NISA);
data.version = (data.version || 1) + 1;
writeSafe(asbabPath, JSON.stringify(data, null, 2));

// ============================================================================
// 3. CACHE-BUSTING FINAL POUR ACTIVER .type-hadith ET fetch(no-cache)
// ============================================================================
if (moteurModifie) {
  const ts = Date.now();
  const htmlFiles = fs.readdirSync(dossierSite).filter(f => /^sourate-\d+-verset-\d+\.html$/i.test(f));
  let nbHtml = 0;
  for (const f of htmlFiles) {
    const fp = path.join(dossierSite, f);
    const h = fs.readFileSync(fp, 'utf8');
    const h2 = h
      .replace(/assets\/verset\.css(?:\?v=\d+)?/g, 'assets/verset.css?v=' + ts)
      .replace(/assets\/verset\.js(?:\?v=\d+)?/g, 'assets/verset.js?v=' + ts);
    if (h2 !== h) {
      writeSafe(fp, h2);
      nbHtml++;
    }
  }
  console.log(`✓ Cache-busting moteur (v=${ts}) appliqué sur ${nbHtml} pages HTML (dernière fois).`);
}

const nbRecits = Object.keys(data.recits).length;
const nbVersets = Object.values(data.recits).reduce((acc, r) => acc + (Array.isArray(r.versets) ? r.versets.length : 1), 0);
console.log(`\n✅ Lot 2 (Āl ‘Imrān & An-Nisā') intégré ! Total actuel : ${nbRecits} récits Sahīh couvrant ${nbVersets} versets en 8 langues.`);
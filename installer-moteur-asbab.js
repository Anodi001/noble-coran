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
// 1. CRÉATION DE site/asbab-nuzul.json (5 fiches pilotes 100 % Sahīh en 8 langues)
// ============================================================================
const ASBAB_PILOTE = {
  version: 1,
  recits: {
    "96:1": {
      versets: ["96:1", "96:2", "96:3", "96:4", "96:5"],
      plage: "96:1–5",
      source: "Sahīh Al-Bukhārī n°3 & Sahīh Muslim n°160",
      degre: "Sahīh",
      texte: {
        fr: "‘Ā’ishah (qu'Allāh l'agrée) rapporte que la toute première Révélation reçue par le Prophète Muhammad ﷺ eut lieu alors qu'il se retirait en adoration dans la grotte de Hirā'. L'Ange Jibrīl (Gabriel) vint à lui et lui dit : « Lis ! (Iqra') ». Le Prophète ﷺ répondit : « Je ne sais pas lire. » L'Ange l'étreignit fermement trois fois avant de lui révéler ces cinq premiers versets, inaugurant ainsi sa mission prophétique.",
        en: "‘Ā’ishah (may Allāh be pleased with her) narrated that the very first Revelation to Prophet Muhammad ﷺ occurred while he was worshipping in seclusion in the Cave of Hirā'. Angel Jibrīl (Gabriel) came to him and said: 'Read!' The Prophet ﷺ replied: 'I do not know how to read.' The Angel pressed him firmly three times and then revealed these opening five verses.",
        es: "‘Ā’ishah (que Allah esté complacido con ella) relató que la primera Revelación al Profeta Muhammad ﷺ tuvo lugar mientras se retiraba a adorar en la cueva de Hirā'. El Ángel Yibrīl le dijo: «¡Lee!», y al responder el Profeta ﷺ que no sabía leer, el Ángel lo estrechó tres veces y le reveló estos cinco primeros versículos.",
        ar: "عن عائشة أم المؤمنين رضي الله عنها أن أول ما نزل من القرآن الكريم كان على رسول الله ﷺ وهو يتعبد في غار حراء، فجاءه جبريل عليه السلام فقال: «اقرأ!» فقال ﷺ: «ما أنا بقارئ»، فغطّه ثلاث مرات ثم أرسله وأنزل عليه هذه الآيات الخمس الأولى.",
        de: "‘Ā’ishah (möge Allah mit ihr zufrieden sein) berichtete, dass die allererste Offenbarung an den Propheten Muhammad ﷺ geschah, während er sich zur Anbetung in die Höhle Hirā' zurückzog. Der Engel Dschibrīl sprach zu ihm: „Lies!“ Als der Prophet ﷺ antwortete, dass er nicht lesen könne, drückte ihn der Engel dreimal fest an sich und offenbarte diese ersten fünf Verse.",
        it: "‘Ā’ishah (che Allāh sia soddisfatto di lei) narrò che la primissima Rivelazione al Profeta Muhammad ﷺ avvenne mentre era raccolto in adorazione nella grotta di Hirā'. L'Angelo Jibrīl gli disse: «Leggi!». Alla risposta del Profeta ﷺ di non saper leggere, l'Angelo lo strinse tre volte e gli rivelò questi primi cinque versetti.",
        id: "‘Aisyah (radhiyallahu ‘anha) meriwayatkan bahwa wahyu pertama yang diturunkan kepada Nabi Muhammad ﷺ terjadi ketika beliau berkhalwat beribadah di Gua Hira. Malaikat Jibril datang seraya berkata: “Bacalah!” Ketika Nabi ﷺ menjawab bahwa beliau tidak bisa membaca, Jibril memeluknya erat tiga kali lalu menyampaikan lima ayat pertama ini.",
        ru: "‘Аиша (да будет доволен ею Аллах) передала, что самое первое откровение пришло к Пророку Мухаммаду ﷺ, когда он уединялся для поклонения в пещере Хира. Ангел Джибриль явился к нему и сказал: «Читай!» Когда Пророк ﷺ ответил, что не умеет читать, ангел трижды крепко сжал его и ниспослал эти первые пять аятов."
      }
    },
    "60:1": {
      versets: ["60:1", "60:2", "60:3"],
      plage: "60:1–3",
      source: "Sahīh Al-Bukhārī n°3007, n°4890 & Sahīh Muslim n°2494",
      degre: "Sahīh",
      texte: {
        fr: "‘Alī ibn Abī Tālib (qu'Allāh l'agrée) rapporte que ces versets furent révélés au sujet de Hātib ibn Abī Balta‘ah : juste avant la conquête de La Mecque, il envoya secrètement une lettre aux notables de Quraysh pour les avertir, uniquement dans l'espoir de protéger sa famille restée sans clan à La Mecque. Averti par la Révélation, le Prophète ﷺ fit intercepter la lettre par ‘Alī, Az-Zubayr et Al-Miqdād, puis accepta l'excuse sincère de Hātib en raison de sa participation à la bataille de Badr.",
        en: "‘Alī ibn Abī Tālib (may Allāh be pleased with him) narrated that these verses were revealed concerning Hātib ibn Abī Balta‘ah. Just before the Conquest of Makkah, he secretly sent a letter to Quraysh solely hoping to protect his vulnerable relatives in Makkah. Informed by Revelation, the Prophet ﷺ sent ‘Alī, Az-Zubayr, and Al-Miqdād to intercept the letter, and accepted Hātib's sincere explanation because he was a veteran of Badr.",
        es: "‘Alī ibn Abī Tālib relató que estas aleyas fueron reveladas respecto a Hātib ibn Abī Balta‘ah, quien antes de la conquista de La Meca envió en secreto una carta a Quraysh buscando únicamente proteger a su familia desamparada allí. Informado por la Revelación, el Profeta ﷺ mandó interceptar la carta y aceptó su disculpa sincera por haber combatido en Badr.",
        ar: "عن علي بن أبي طالب رضي الله عنه أن هذه الآيات نزلت في حاطب بن أبي بلتعة حين كتب كتابًا سرًّا إلى قريش قبيل فتح مكة يريد بذلك حماية أهله المستضعفين بمكة، فأطلع الله نبيه ﷺ فأرسل عليًّا والزبير والمقداد فأخذوا الكتاب، وقبل النبي ﷺ عذر حاطب لشهوده بدرًا.",
        de: "‘Alī ibn Abī Tālib berichtete, dass diese Verse wegen Hātib ibn Abī Balta‘ah offenbart wurden, der kurz vor der Einnahme Mekkas heimlich einen Brief an die Quraisch sandte, um seine ungeschützten Angehörigen in Mekka zu bewahren. Durch Offenbarung unterrichtet, ließ der Prophet ﷺ den Brief abfangen und nahm Hātibs aufrichtige Entschuldigung an, da er an der Schlacht von Badr teilgenommen hatte.",
        it: "‘Alī ibn Abī Tālib narrò che questi versetti furono rivelati riguardo a Hātib ibn Abī Balta‘ah, che prima della conquista della Mecca inviò segretamente una lettera ai Quraysh solo per proteggere i suoi familiari rimasti privi di tutela. Avvertito dalla Rivelazione, il Profeta ﷺ fece intercettare la lettera e accettò le sue scuse sincere perché aveva partecipato alla battaglia di Badr.",
        id: "‘Ali bin Abi Thalib meriwayatkan bahwa ayat-ayat ini turun berkenaan dengan Hathib bin Abi Balta‘ah yang diam-diam mengirim surat kepada kaum Quraisy menjelang Fathu Makkah semata-mata demi melindungi keluarganya yang tidak memiliki pelindung di Makkah. Nabi ﷺ menerima wahyu tentang hal itu, menyita surat tersebut, lalu memaafkan Hathib karena beliau adalah peserta Perang Badar.",
        ru: "‘Али ибн Абу Талиб передал, что эти аяты были ниспосланы по поводу Хатыба ибн Абу Бальта‘а, который накануне открытия Мекки тайно отправил письмо курайшитам лишь ради защиты своей беззащитной семьи в Мекке. Узнав об этом через откровение, Пророк ﷺ велел перехватить письмо и принял искреннее оправдание Хатыба, поскольку тот был участником битвы при Бадре."
      }
    },
    "60:8": {
      versets: ["60:8", "60:9"],
      plage: "60:8–9",
      source: "Sahīh Al-Bukhārī n°2620, n°3183 & Sahīh Muslim n°1003",
      degre: "Sahīh",
      texte: {
        fr: "Asmā' bint Abī Bakr (qu'Allāh les agrée) rapporte que sa mère Qutaylah, alors polythéiste, vint lui rendre visite à Médine avec des cadeaux durant la trêve avec Quraysh. Asmā' consulta le Messager d'Allāh ﷺ : « Ma mère est venue en espérant ma bonté, dois-je maintenir les liens de parenté avec elle ? » Il répondit : « Oui, maintiens le lien avec ta mère ! » Ce verset fut alors révélé, établissant la permission d'être bienfaisant et équitable envers les non-musulmans pacifiques.",
        en: "Asmā' bint Abī Bakr (may Allāh be pleased with them) narrated that her mother, who was still a polytheist, visited her in Madinah bringing gifts during the truce with Quraysh. Asmā' asked the Prophet ﷺ: 'Should I uphold ties of kinship with my mother?' He replied: 'Yes, uphold ties with your mother!' This verse was then revealed affirming kindness and justice toward peaceful non-Muslims.",
        es: "Asmā' bint Abī Bakr relató que su madre, entonces politeísta, la visitó en Medina con regalos durante la tregua con Quraysh. Asmā' preguntó al Profeta ﷺ si debía mantener los lazos familiares con ella, y él respondió: «¡Sí, mantén el vínculo con tu madre!». Entonces fue revelada esta aleya confirmando el buen trato y la justicia hacia los no musulmanes pacíficos.",
        ar: "عن أسماء بنت أبي بكر رضي الله عنهما قالت: قدمت عليّ أمي وهي مشركة في عهد قريش ومعها هدايا، فاستفتيت رسول الله ﷺ: أفأصل أمي؟ قال: «نعم، صلي أمك»، فأنزل الله هذه الآية في الإذن بالبر والقسط مع غير المحاربين.",
        de: "Asmā' bint Abī Bakr berichtete, dass ihre damals noch polytheistische Mutter sie während des Waffenstillstands mit Geschenken in Medina besuchte. Asmā' fragte den Propheten ﷺ, ob sie die verwandtschaftliche Güte ihr gegenüber pflegen dürfe, worauf er antwortete: „Ja, pflege die Bindung zu deiner Mutter!“ Daraufhin wurde dieser Vers offenbart.",
        it: "Asmā' bint Abī Bakr narrò che sua madre, allora politeista, le fece visita a Medina portando doni durante la tregua con i Quraysh. Asmā' chiese al Profeta ﷺ se dovesse mantenere i legami familiari con lei, ed egli rispose: «Sì, mantieni il legame con tua madre!». Fu quindi rivelato questo versetto sulla bontà e la giustizia verso i non musulmani pacifici.",
        id: "Asma' binti Abu Bakar meriwayatkan bahwa ibunya yang saat itu masih musyrik datang mengunjunginya di Madinah membawa hadiah pada masa gencatan senjata. Asma' bertanya kepada Nabi ﷺ apakah ia boleh berbuat baik kepadanya, lalu beliau menjawab: “Ya, sambunglah silaturahmi dengan ibumu!” Maka turunlah ayat ini.",
        ru: "Асма бинт Абу Бакр передала, что её мать, бывшая тогда многобожницей, приехала к ней в Медину с подарками во время перемирия. Асма спросила Пророка ﷺ, следует ли ей поддерживать родственные отношения с матерью, и он ответил: «Да, поддерживай родственную связь со своей матерью!» После этого был ниспослан данный аят."
      }
    },
    "60:10": {
      versets: ["60:10"],
      plage: "60:10",
      source: "Sahīh Al-Bukhārī n°2712, n°4891",
      degre: "Sahīh",
      texte: {
        fr: "Al-Miswar ibn Makhramah et Marwān rapportent que ce verset fut révélé après le traité d'Al-Hudaybiyah, lorsque des femmes croyantes — parmi lesquelles Umm Kulthūm bint ‘Uqbah — émigrèrent de La Mecque vers Médine et que leurs proches vinrent réclamer leur restitution en vertu du pacte. Allāh interdit alors de renvoyer les femmes croyantes aux polythéistes après avoir vérifié la sincérité de leur foi.",
        en: "Al-Miswar ibn Makhramah and Marwān narrated that this verse was revealed after the Treaty of Al-Hudaybiyah when believing women—including Umm Kulthūm bint ‘Uqbah—emigrated from Makkah to Madinah and their relatives demanded their return. Allāh forbade returning believing women to the polytheists once their faith was examined.",
        es: "Al-Miswar ibn Makhramah y Marwān relataron que esta aleya descendió tras el pacto de Al-Hudaybiyah cuando mujeres creyentes —entre ellas Umm Kulthūm bint ‘Uqbah— emigraron a Medina y sus familiares exigieron su devolución. Allah prohibió devolver a las mujeres creyentes a los politeístas.",
        ar: "عن المسور بن مخرمة ومروان أن هذه الآية نزلت عقب صلح الحديبية حين هاجرت مؤمنات إلى المدينة ومنهن أم كلثوم بنت عقبة، فجاء أهلها يطلبون ردّها بمقتضى الصلح، فنهى الله عن رد المؤمنات إلى المشركين بعد امتحان إيمانهن.",
        de: "Al-Miswar ibn Makhramah und Marwān berichteten, dass dieser Vers nach dem Vertrag von Al-Hudaybiyah offenbart wurde, als gläubige Frauen – darunter Umm Kulthūm bint ‘Uqbah – nach Medina auswanderten und ihre Verwandten ihre Auslieferung forderten. Allah verbot die Rückgabe gläubiger Frauen an die Polytheisten.",
        it: "Al-Miswar ibn Makhramah e Marwān narrarono che questo versetto fu rivelato dopo il patto di Al-Hudaybiyah, quando donne credenti — tra cui Umm Kulthūm bint ‘Uqbah — emigrarono a Medina e i loro parenti ne chiesero la restituzione. Allāh vietò di restituire le credenti ai politeisti.",
        id: "Al-Miswar bin Makhramah dan Marwan meriwayatkan bahwa ayat ini turun setelah Perjanjian Hudaibiyah ketika para wanita beriman — di antaranya Ummu Kultsum binti ‘Uqbah — berhijrah ke Madinah dan keluarga mereka meminta agar mereka dikembalikan. Allah melarang pengembalian wanita mukminah kepada kaum musyrikin.",
        ru: "Аль-Мисвар ибн Махрама и Марван передали, что этот аят был ниспослан после Худайбийского договора, когда верующие женщины — среди них Умм Кульсум бинт ‘Укба — переселились в Медину, а их родственники потребовали вернуть их. Аллах запретил возвращать верующих женщин многобожникам."
      }
    },
    "93:1": {
      versets: ["93:1", "93:2", "93:3", "93:4", "93:5"],
      plage: "93:1–5",
      source: "Sahīh Al-Bukhārī n°4950 & Sahīh Muslim n°1797",
      degre: "Sahīh",
      texte: {
        fr: "Jundub ibn Sufyān (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ fut souffrant et ne put se lever pour la prière durant deux ou trois nuits. Une femme vint alors le railler en disant : « Ô Muhammad, j'espère que ton démon t'a abandonné ! » Allāh fit aussitôt descendre ces versets pour consoler Son Prophète ﷺ : « Ton Seigneur ne t'a ni abandonné, ni détesté ! »",
        en: "Jundub ibn Sufyān (may Allāh be pleased with him) narrated that the Messenger of Allāh ﷺ fell ill and could not stand for night prayer for two or three nights. A woman came mocking him, saying: 'O Muhammad, I think your devil has forsaken you!' Allāh then revealed these comforting verses: 'Your Lord has not taken leave of you, nor has He detested you.'",
        es: "Yundub ibn Sufyān relató que el Mensajero de Allah ﷺ estuvo indispuesto dos o tres noches sin poder levantarse a orar. Una mujer acudió burlándose de que su demonio lo había abandonado, y entonces Allah reveló estas aleyas de consuelo: «Tu Señor no te ha abandonado ni te ha aborrecido».",
        ar: "عن جندب بن سفيان البجلي رضي الله عنه قال: اشتكى رسول الله ﷺ فلم يقم ليلتين أو ثلاثًا، فجاءت امرأة فقالت: يا محمد، إني لأرجو أن يكون شيطانك قد تركك! فأنزل الله تعالى هذه الآيات تسليةً وتثبيتًا لنبيه ﷺ: ﴿وَالضُّحَىٰ * وَاللَّيْلِ إِذَا سَجَىٰ * مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ﴾.",
        de: "Dschundub ibn Sufyān berichtete, dass der Gesandte Allahs ﷺ krank war und zwei oder drei Nächte nicht zum Gebet aufstehen konnte. Als eine Frau ihn verspottete, sein Dämon habe ihn verlassen, offenbarte Allah diese tröstenden Verse: „Dein Herr hat dich weder verlassen noch verabscheut.“",
        it: "Jundub ibn Sufyān narrò che il Messaggero di Allāh ﷺ fu indisposto per due o tre notti senza potersi alzare per la preghiera. Una donna venne a deriderlo dicendo che il suo demone lo aveva abbandonato; allora Allāh rivelò questi versetti di conforto: «Il tuo Signore non ti ha abbandonato e non ti ha preso in odio».",
        id: "Jundub bin Sufyan meriwayatkan bahwa Rasulullah ﷺ pernah sakit sehingga tidak bangun shalat malam selama dua atau tiga malam. Seorang wanita datang mengejek beliau bahwa setannya telah meninggalkannya, maka Allah menurunkan ayat-ayat penenang ini.",
        ru: "Джундуб ибн Суфьян передал, что Посланник Аллаха ﷺ заболел и не вставал на ночную молитву две или три ночи. Одна женщина пришла с насмешкой, сказав, что его шайтан покинул его, и тогда Аллах ниспослал эти утешающие аяты: «Не покинул тебя Господь твой и не возненавидел»."
      }
    }
  }
};

if (!fs.existsSync(asbabPath)) {
  writeSafe(asbabPath, JSON.stringify(ASBAB_PILOTE, null, 2));
  console.log('✓ site/asbab-nuzul.json créé (5 fiches pilotes Sahīh en 8 langues).');
} else {
  console.log('• site/asbab-nuzul.json existe déjà (conservé tel quel).');
}

// ============================================================================
// 2. AJOUT DU CSS DE LA CARTE ASBĀB AN-NUZŪL DANS site/assets/verset.css
// ============================================================================
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('.asbab-nuzul-card')) {
  css += `

/* === ENCADRÉ ASBĀB AN-NUZŪL (8 LANGUES) === */
.asbab-nuzul-card {
  margin-top: 16px;
  padding: 16px 18px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.11), rgba(16, 185, 129, 0.08));
  border: 1px solid rgba(56, 189, 248, 0.34);
  border-left: 3.5px solid #38bdf8;
  color: #e2e8f0;
  font-size: 0.96rem;
  line-height: 1.75;
}
.asbab-nuzul-card[dir="rtl"] {
  border-left: 1px solid rgba(56, 189, 248, 0.34);
  border-right: 3.5px solid #38bdf8;
  text-align: right;
  font-family: 'Scheherazade New', 'Amiri', serif;
  font-size: 1.24rem;
}
.asbab-nuzul-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}
.asbab-nuzul-title {
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #7dd3fc;
}
.asbab-nuzul-card[dir="rtl"] .asbab-nuzul-title {
  text-transform: none;
  font-size: 1.08rem;
}
.asbab-nuzul-badges {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.asbab-badge-degre {
  font-size: 0.72rem;
  font-weight: 800;
  padding: 2px 9px;
  border-radius: 99px;
  background: rgba(16, 185, 129, 0.22);
  color: #6ee7b7;
  border: 1px solid rgba(52, 211, 153, 0.5);
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.asbab-badge-degre.hasan {
  background: rgba(56, 189, 248, 0.2);
  color: #bae6fd;
  border-color: rgba(56, 189, 248, 0.5);
}
.asbab-nuzul-source {
  margin-top: 10px;
  font-size: 0.8rem;
  color: #94a3b8;
  font-style: italic;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
`;
  writeSafe(cssPath, css);
  console.log('✓ site/assets/verset.css : styles .asbab-nuzul-card ajoutés.');
}

// ============================================================================
// 3. MISE À JOUR DE site/assets/verset.js (fix 2 bugs vidéo + module Asbāb)
// ============================================================================
let vjs = fs.readFileSync(jsPath, 'utf8');

// 3a. Fix bug ES -> DE : toujours revenir sur FR avant d'activer DE/IT/ID/RU
vjs = vjs.replace(
  /var arEstActif = btnSaAr && btnSaAr\.classList\.contains\("active"\);\s*if \(arEstActif && btnFr\)/,
  'var frEstActif = btnFr && btnFr.classList.contains("active");\n    if (!frEstActif && btnFr)'
);

// 3b. Fix bug #sourcesLineEl affichant "Médinoise" après clic AR : cibler par ID exact
const reMentions = /function mettreAJourMentionsTraducteurEtExegese\(\) \{[\s\S]*?\r?\n  \}\r?\n\r?\n  var DICO_MULTILINGUE = \{/;
if (reMentions.test(vjs)) {
  vjs = vjs.replace(reMentions, `function mettreAJourMentionsTraducteurEtExegese() {
    var lang = obtenirLangueActive();
    var textesBas = {
      fr: "Traduction originale de Muhammad Hamidullah (1977) • Exégèse (Tafsir) Al-Mukhtasar & Ibn Kathir",
      en: "Translation by Saheeh International • Exegesis (Tafsir) Al-Mukhtasar & Ibn Kathir",
      es: "Traducción de Sheikh Isa García • Exégesis (Tafsir) Al-Mukhtasar & Ibn Kathir",
      de: "Deutsche Übersetzung von Frank Bubenheim & Nadeem Elyas • Exegese (Tafsir) Al-Mukhtasar & Ibn Kathir",
      it: "Traduzione italiana di Hamza Roberto Piccardo • Esegesi (Tafsir) Al-Mukhtasar & Ibn Kathir",
      id: "Terjemahan Kementerian Agama RI (Kemenag) • Tafsir Al-Mukhtasar & Ibnu Katsir",
      ru: "Смысловой перевод Эльмира Кулиева • Тафсир аль-Мухтасар и Ибн Касир",
      ar: "النص القرآني بالرسم العثماني • التفسير المختصر وتفسير ابن كثير وأسباب النزول"
    };
    var textesHaut = {
      fr: "Traduction Muhammad Hamidullah (1977) & Exégèse",
      en: "Saheeh International & Exegesis",
      es: "Traducción Sheikh Isa García y Exégesis",
      de: "Übersetzung Bubenheim & Elyas & Exegese (Tafsir)",
      it: "Traduzione Hamza Roberto Piccardo & Esegesi (Tafsir)",
      id: "Terjemahan Kemenag RI & Tafsir Al-Mukhtasar",
      ru: "Перевод Э. Кулиева и Тафсир аль-Мухтасар",
      ar: "التفسير المختصر وتفسير ابن كثير وأسباب النزول"
    };

    var srcEl = document.getElementById("sourcesLineEl");
    if (srcEl && textesBas[lang]) {
      if (srcEl.textContent !== textesBas[lang]) {
        srcEl.textContent = textesBas[lang];
      }
      srcEl.style.setProperty("direction", lang === "ar" ? "rtl" : "ltr", "important");
    }

    var subEl = document.getElementById("subHeaderInfoEl");
    if (subEl && textesHaut[lang]) {
      var estMec = window.SOURATE_DATA
        ? (window.SOURATE_DATA.typeSourateClasse === "mecquoise")
        : /mecqu|mecc|makk|мекк|مكية/i.test(subEl.textContent || "");
      var mapLieu = {
        fr: estMec ? "Sourate Mecquoise (La Mecque)" : "Sourate Médinoise (Médine)",
        en: estMec ? "Meccan Surah (Makkah)" : "Medinan Surah (Madinah)",
        es: estMec ? "Sura Mequí (La Meca)" : "Sura Medinense (Medina)",
        ar: estMec ? "سورة مكية (مكة المكرمة)" : "سورة مدنية (المدينة المنورة)",
        de: estMec ? "Mekkanische Sure (Mekka)" : "Medinensische Sure (Medina)",
        it: estMec ? "Sura Meccana (La Mecca)" : "Sura Medinese (Medina)",
        id: estMec ? "Surah Makkiyah (Mekkah)" : "Surah Madaniyah (Madinah)",
        ru: estMec ? "Мекканская сура (Мекка)" : "Мединская сура (Медина)"
      };
      var nvSub = (mapLieu[lang] || "") + " • " + textesHaut[lang];
      if (subEl.textContent !== nvSub) subEl.textContent = nvSub;
    }
  }

  var DICO_MULTILINGUE = {`);
  console.log('✓ site/assets/verset.js : fix #sourcesLineEl / #subHeaderInfoEl + fix retour FR avant DE.');
}

// 3c. Exclure #asbabNuzulContainer du TreeWalker Google Translate (déjà traduit nativement en 8 langues)
if (!vjs.includes('#asbabNuzulContainer')) {
  vjs = vjs.replace(
    /pEl\.closest\("#khatmPlannerWidgetV77"\)/,
    'pEl.closest("#khatmPlannerWidgetV77") || pEl.closest("#asbabNuzulContainer")'
  );
}

// 3d. Ajouter le module autonome de rendu Asbāb an-Nuzūl en 8 langues
if (!vjs.includes('__moduleAsbabNuzulV1')) {
  vjs += `

/* === MODULE ASBĀB AN-NUZŪL 8 LANGUES === */
(function __moduleAsbabNuzulV1() {
  var TITRES_ASBAB = {
    fr: "📜 Contexte de révélation (Sabab an-Nuzūl)",
    en: "📜 Occasion of Revelation (Sabab an-Nuzūl)",
    es: "📜 Contexto de revelación (Sabab an-Nuzūl)",
    ar: "📜 سبب النزول الصحيح",
    de: "📜 Offenbarungsanlass (Sabab an-Nuzūl)",
    it: "📜 Circostanza della rivelazione (Sabab an-Nuzūl)",
    id: "📜 Asbabun Nuzul (Sebab Turunnya Ayat)",
    ru: "📜 Причина ниспослания (Сабаб ан-нузуль)"
  };
  var LABELS_SOURCE = {
    fr: "Source :", en: "Source:", es: "Fuente:", ar: "المصدر:",
    de: "Quelle:", it: "Fonte:", id: "Sumber:", ru: "Источник:"
  };

  var asbabIndex = null;
  var asbabLoading = false;

  function detecterLangue8() {
    var extMap = { btnLangDeV77: "de", btnLangItV77: "it", btnLangIdV77: "id", btnLangRuV77: "ru" };
    for (var id in extMap) {
      var b = document.getElementById(id);
      if (b && b.classList.contains("active-ext-v77")) return extMap[id];
    }
    var hl = (document.documentElement.getAttribute("lang") || "").slice(0, 2).toLowerCase();
    if (TITRES_ASBAB[hl]) return hl;
    if (typeof currentLang === "string" && TITRES_ASBAB[currentLang]) return currentLang;
    var p = new URLSearchParams(window.location.search).get("lang");
    if (p && TITRES_ASBAB[p.slice(0, 2).toLowerCase()]) return p.slice(0, 2).toLowerCase();
    return "fr";
  }

  function obtenirCleActuelle() {
    var badge = document.getElementById("badgeNumEl");
    if (badge) {
      var m = (badge.textContent || "").match(/(\\d+)\\s*:\\s*(\\d+)/);
      if (m) return m[1] + ":" + m[2];
    }
    if (typeof numSourateActuelle !== "undefined" && typeof numVersetActuel !== "undefined") {
      return numSourateActuelle + ":" + numVersetActuel;
    }
    return "";
  }

  function construireIndex(data) {
    var idx = {};
    var recits = (data && data.recits) ? data.recits : {};
    for (var cle in recits) {
      var r = recits[cle];
      if (!r) continue;
      idx[cle] = r;
      if (Array.isArray(r.versets)) {
        for (var i = 0; i < r.versets.length; i++) idx[r.versets[i]] = r;
      }
    }
    return idx;
  }

  function chargerAsbabSiNecessaire() {
    if (asbabIndex || asbabLoading) return;
    asbabLoading = true;
    var url = (window.location.protocol === "http:" || window.location.protocol === "https:")
      ? "/asbab-nuzul.json?v=1"
      : "asbab-nuzul.json";
    fetch(url)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && d.recits) {
          asbabIndex = construireIndex(d);
          afficherAsbabNuzul();
        }
      })
      .catch(function () {})
      .finally(function () { asbabLoading = false; });
  }

  function afficherAsbabNuzul() {
    if (!asbabIndex) { chargerAsbabSiNecessaire(); return; }
    var extra = document.getElementById("extraNotesContainer");
    if (!extra || !extra.parentElement) return;

    var cont = document.getElementById("asbabNuzulContainer");
    if (!cont) {
      cont = document.createElement("div");
      cont.id = "asbabNuzulContainer";
      cont.className = "notranslate";
      cont.setAttribute("translate", "no");
      extra.parentElement.insertBefore(cont, extra.nextSibling);
    }

    var cle = obtenirCleActuelle();
    var lang = detecterLangue8();
    var recit = cle ? asbabIndex[cle] : null;

    if (!recit || !recit.texte) {
      if (cont.innerHTML !== "") cont.innerHTML = "";
      return;
    }

    // Anti-doublon propre : si l'ancien bloc 📜 est collé dans #mainExplanationEl, on le retire à l'affichage
    var mExpl = document.getElementById("mainExplanationEl");
    if (mExpl && mExpl.innerHTML.indexOf("<br><br>📜") !== -1) {
      mExpl.innerHTML = mExpl.innerHTML.split("<br><br>📜")[0];
    }

    var sig = cle + "|" + lang;
    if (cont.getAttribute("data-asbab-sig") === sig) return;
    cont.setAttribute("data-asbab-sig", sig);

    var txt = recit.texte[lang] || recit.texte.fr || "";
    var isAr = lang === "ar";
    var titre = TITRES_ASBAB[lang] || TITRES_ASBAB.fr;
    var lblSrc = LABELS_SOURCE[lang] || "Source :";
    var degre = recit.degre || "Sahīh";
    var clsDeg = /hasan/i.test(degre) ? " hasan" : "";
    var plage = recit.plage ? (" (" + recit.plage + ")") : "";

    cont.innerHTML =
      '<div class="asbab-nuzul-card" dir="' + (isAr ? "rtl" : "ltr") + '">' +
        '<div class="asbab-nuzul-head">' +
          '<span class="asbab-nuzul-title">' + titre + plage + '</span>' +
          '<span class="asbab-nuzul-badges"><span class="asbab-badge-degre' + clsDeg + '">✓ ' + degre + '</span></span>' +
        '</div>' +
        '<div class="asbab-nuzul-body"></div>' +
        '<div class="asbab-nuzul-source">' + lblSrc + ' ' + (recit.source || "") + '</div>' +
      '</div>';
    var bodyEl = cont.querySelector(".asbab-nuzul-body");
    if (bodyEl) bodyEl.textContent = txt;
  }

  window.__majAsbabNuzul = afficherAsbabNuzul;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", afficherAsbabNuzul);
  } else {
    afficherAsbabNuzul();
  }
  document.addEventListener("click", function () { setTimeout(afficherAsbabNuzul, 40); setTimeout(afficherAsbabNuzul, 150); });
  document.addEventListener("change", function () { setTimeout(afficherAsbabNuzul, 40); });
  window.addEventListener("popstate", function () { setTimeout(afficherAsbabNuzul, 40); });
  if (typeof MutationObserver !== "undefined") {
    var badge = document.getElementById("badgeNumEl");
    if (badge) new MutationObserver(function () { setTimeout(afficherAsbabNuzul, 30); }).observe(badge, { childList: true, characterData: true, subtree: true });
    if (document.documentElement) new MutationObserver(function () { setTimeout(afficherAsbabNuzul, 30); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }
})();
`;
  console.log('✓ site/assets/verset.js : module Asbāb an-Nuzūl 8 langues ajouté.');
}

try {
  new vm.Script(vjs, { filename: 'site/assets/verset.js' });
  console.log('✓ Syntaxe de site/assets/verset.js validée : 0 erreur.');
} catch (err) {
  console.error('ERREUR DE SYNTAXE dans verset.js (non écrit) :\n', err.message);
  process.exit(1);
}
writeSafe(jsPath, vjs);

// ============================================================================
// 4. INJECTION SSR DES ASBĀB AN-NUZŪL DANS site/_worker.js (SEO 8 langues)
// ============================================================================
let worker = fs.readFileSync(workerPath, 'utf8');

if (!worker.includes('MEM_ASBAB_INDEX')) {
  worker = worker.replace(
    /let MEM_STATIC_TAFSIR_CACHE = null;/,
    `let MEM_STATIC_TAFSIR_CACHE = null;
let MEM_ASBAB_INDEX = null;

const ASBAB_TITRES_SSR = {
  fr: "📜 Contexte de révélation (Sabab an-Nuzūl)",
  en: "📜 Occasion of Revelation (Sabab an-Nuzūl)",
  es: "📜 Contexto de revelación (Sabab an-Nuzūl)",
  ar: "📜 سبب النزول الصحيح",
  de: "📜 Offenbarungsanlass (Sabab an-Nuzūl)",
  it: "📜 Circostanza della rivelazione (Sabab an-Nuzūl)",
  id: "📜 Asbabun Nuzul (Sebab Turunnya Ayat)",
  ru: "📜 Причина ниспослания (Сабаб ан-нузуль)"
};

async function obtenirAsbabSSR(sNum, vNum, lang, env) {
  try {
    if (!MEM_ASBAB_INDEX && env && env.ASSETS && typeof env.ASSETS.fetch === "function") {
      const rA = await env.ASSETS.fetch(new Request("https://corantafsir.com/asbab-nuzul.json"));
      if (rA.ok) {
        const dA = await rA.json();
        const idx = {};
        for (const [k, rec] of Object.entries(dA.recits || {})) {
          idx[k] = rec;
          if (Array.isArray(rec.versets)) rec.versets.forEach(vk => { idx[vk] = rec; });
        }
        MEM_ASBAB_INDEX = idx;
      }
    }
    const rec = MEM_ASBAB_INDEX ? MEM_ASBAB_INDEX[sNum + ":" + vNum] : null;
    if (!rec || !rec.texte || !rec.texte[lang]) return "";
    const isAr = lang === "ar";
    const titre = (ASBAB_TITRES_SSR[lang] || ASBAB_TITRES_SSR.fr) + (rec.plage ? " (" + rec.plage + ")" : "");
    const degre = rec.degre || "Sahīh";
    const clsDeg = /hasan/i.test(degre) ? " hasan" : "";
    return '<div id="asbabNuzulContainer" class="notranslate" translate="no" data-asbab-sig="' + sNum + ':' + vNum + '|' + lang + '">' +
      '<div class="asbab-nuzul-card" dir="' + (isAr ? "rtl" : "ltr") + '">' +
      '<div class="asbab-nuzul-head"><span class="asbab-nuzul-title">' + escapeHtmlText(titre) + '</span>' +
      '<span class="asbab-nuzul-badges"><span class="asbab-badge-degre' + clsDeg + '">✓ ' + escapeHtmlText(degre) + '</span></span></div>' +
      '<div class="asbab-nuzul-body">' + escapeHtmlText(rec.texte[lang]) + '</div>' +
      '<div class="asbab-nuzul-source">' + escapeHtmlText(rec.source || "") + '</div></div></div>';
  } catch (e) {}
  return "";
}`
  );

  worker = worker.replace(
    /if \(!versetTraiteOk \|\| !tafsirTraiteOk\) \{/,
    `const asbabHtml = await obtenirAsbabSSR(sNum, vNum, lang, env);
    if (asbabHtml) {
      out = out.replace(/<div id="extraNotesContainer"><\/div>/i, '$&' + asbabHtml);
    }

    if (!versetTraiteOk || !tafsirTraiteOk) {`
  );

  worker = worker.replace(/const SSR_VERSION = "v\d+";/, 'const SSR_VERSION = "v113";');
  writeSafe(workerPath, worker);
  console.log('✓ site/_worker.js : injection SSR Asbāb an-Nuzūl ajoutée (v113).');
}

// ============================================================================
// 5. CACHE-BUSTING CSS & JS SUR LES 6 236 PAGES HTML (DERNIÈRE FOIS !)
// ============================================================================
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
console.log(`✅ Moteur Asbāb installé sur ${nbHtml} pages (v=${ts}). Désormais, il suffira d'éditer site/asbab-nuzul.json !`);
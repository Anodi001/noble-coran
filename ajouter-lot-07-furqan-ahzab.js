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
const asbabPath = path.join(dossierSite, 'asbab-nuzul.json');
const workerPath = path.join(dossierSite, '_worker.js');

const data = JSON.parse(fs.readFileSync(asbabPath, 'utf8'));
if (!data.recits) data.recits = {};

const LOT_07_FURQAN_AHZAB = {
  "25:68": {
    type: "sabab",
    versets: ["25:68", "25:69", "25:70"],
    plage: "25:68–70",
    source: "Sahīh Al-Bukhārī n°4810 & Sahīh Muslim n°122",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte que des hommes parmi les polythéistes, qui avaient commis de nombreux meurtres et adultères avant l'Islam, vinrent trouver le Prophète Muhammad ﷺ et lui dirent : « Ce que tu prêches est certes beau et noble ; dis-nous seulement si nos fautes passées peuvent être expiées ! » Allāh fit alors descendre ces versets ouvrant la porte du repentir sincère et promettant de changer leurs mauvaises actions passées en bonnes œuvres.",
      en: "Ibn ‘Abbās (may Allāh be pleased with them) narrated that some polytheists who had committed many killings and much adultery came to Prophet Muhammad ﷺ and said: 'What you call to is indeed good, if only you could tell us there is an expiation for what we have done.' Allāh then revealed these verses opening the door of sincere repentance and promising to replace their past misdeeds with good deeds.",
      es: "Ibn ‘Abbās relató que algunos politeístas que habían cometido numerosos homicidios y adulterios acudieron al Profeta ﷺ preguntando si existía expiación para su pasado. Entonces Allah reveló estas aleyas abriendo la puerta del arrepentimiento sincero y prometiendo transformar sus malas obras pasadas en buenas.",
      ar: "عن ابن عباس رضي الله عنهما أن ناسًا من أهل الشرك كانوا قد قتلوا وأكثروا وزنوا وأكثروا، فأتوا محمدًا ﷺ فقالوا: إن الذي تقول وتدعو إليه لحسن لو تخبرنا أن لما عملنا كفارة! فنزلت هذه الآيات فاتحةً باب التوبة الصادقة وتبديل السيئات حسنات.",
      de: "Ibn ‘Abbās berichtete, dass einige Polytheisten, die viele Morde und Ehebrüche begangen hatten, zum Propheten ﷺ kamen und fragten, ob es für ihre Vergangenheit eine Sühne gebe. Daraufhin offenbarte Allah diese Verse über die aufrichtige Reue und die Verwandlung früherer Sünden in gute Taten.",
      it: "Ibn ‘Abbās narrò che alcuni politeisti macchiatisi di molti omicidi e adultèri si recarono dal Profeta ﷺ chiedendo se vi fosse espiazione per il loro passato. Allāh rivelò allora questi versetti aprendo la porta del pentimento sincero e promettendo di mutare le loro cattive azioni in buone.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa beberapa kaum musyrik yang pernah banyak membunuh dan berzina mendatangi Nabi ﷺ menanyakan apakah ada penghapus bagi dosa masa lalu mereka. Maka Allah menurunkan ayat-ayat ini yang membuka pintu tobat dan menjanjikan penggantian keburukan dengan kebaikan.",
      ru: "Ибн ‘Аббас передал, что некоторые многобожники, совершившие множество убийств и прелюбодеяний, пришли к Пророку ﷺ и спросили, есть ли искупление за их прошлое. Тогда Аллах ниспослал эти аяты, открывающие врата искреннего покаяния и обещающие заменить прошлые злодеяния благими делами."
    }
  },
  "26:214": {
    type: "sabab",
    versets: ["26:214"],
    plage: "26:214",
    source: "Sahīh Al-Bukhārī n°4770 & Sahīh Muslim n°208",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte qu'à la révélation de cet ordre (« Et avertis les gens qui te sont les plus proches »), le Messager d'Allāh ﷺ gravit la colline d'As-Safā à La Mecque et appela solennellement les différents clans de Quraysh. Il leur demanda : « Si je vous annonçais qu'une cavalerie est derrière cette vallée prête à vous attaquer, me croiriez-vous ? » Ils répondirent : « Oui, nous ne t'avons jamais entendu mentir ! » Il déclara alors : « Je suis pour vous un avertisseur devant un terrible châtiment ! » C'est à cet instant qu'Abū Lahab lança sa malédiction contre lui.",
      en: "Ibn ‘Abbās narrated that when this command ('And warn your closest kindred') was revealed, the Messenger of Allāh ﷺ climbed Mount As-Safā in Makkah and called out to the clans of Quraysh. Asking whether they would believe him if he warned of an army behind the valley, they answered: 'Yes, we have never known you to lie.' He then proclaimed: 'I am a warner to you before a severe punishment!'—prompting Abū Lahab's hostile outburst.",
      es: "Ibn ‘Abbās relató que al descender esta orden («Advierte a tus parientes más cercanos»), el Profeta ﷺ subió al monte As-Safā y convocó a los clanes de Quraysh; tras confirmar ellos que jamás lo habían oído mentir, les advirtió de un castigo severo, provocando la airada reacción de Abū Lahab.",
      ar: "عن ابن عباس رضي الله عنهما أنه لما نزلت ﴿وَأَنذِرْ عَشِيرَتَكَ الْأَقْرَبِينَ﴾ صعد النبي ﷺ على الصفا فنادى بطون قريش، فلما أقرّوا له بأنه لم يجربوا عليه كذبًا قط قال: «فإني نذير لكم بين يدي عذاب شديد»، فاعترضه أبو لهب بقوله: تبًّا لك!",
      de: "Ibn ‘Abbās berichtete, dass der Prophet ﷺ bei der Offenbarung dieses Befehls auf den Hügel As-Safā stieg und die Stämme der Quraisch rief. Nachdem sie bestätigten, ihn niemals lügen gehört zu haben, warnte er sie vor einer schweren Strafe, woraufhin Abū Lahab ihn schmähte.",
      it: "Ibn ‘Abbās narrò che alla rivelazione di questo comando il Profeta ﷺ salì sul colle As-Safā e chiamò i clan di Quraysh. Dopo che essi attestarono di non averlo mai sentito mentire, egli si proclamò ammonitore davanti a un duro castigo, suscitando l'ostilità di Abū Lahab.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa saat ayat ini turun, Nabi ﷺ menaiki bukit Shafa lalu memanggil kabilah-kabilah Quraisy. Setelah mereka mengakui beliau tak pernah berdusta, beliau memperingatkan akan azab yang pedih, yang langsung ditentang oleh Abu Lahab.",
      ru: "Ибн ‘Аббас передал, что после ниспослания этого веления Пророк ﷺ взошёл на холм ас-Сафа и созвал роды курайшитов. Когда они подтвердили, что никогда не слышали от него лжи, он объявил себя предостерегающим перед суровым наказанием, на что Абу Ляхаб ответил враждебным возгласом."
    }
  },
  "28:56": {
    type: "sabab",
    versets: ["28:56"],
    plage: "28:56",
    source: "Sahīh Al-Bukhārī n°4772 & Sahīh Muslim n°24, n°25",
    degre: "Sahīh",
    texte: {
      fr: "Sa‘īd ibn Al-Musayyib (d'après son père) et Abū Hurayrah rapportent que ce verset fut révélé à la mort d'Abū Tālib, l'oncle bienveillant qui avait toujours protégé le Prophète ﷺ. À son chevet, le Messager d'Allāh ﷺ le supplia jusqu'au dernier instant de prononcer la parole d'unicité, mais Abū Jahl et ‘Abdullāh ibn Abī Umayyah l'en dissuadèrent, et il mourut sur la religion de ses ancêtres. Allāh consola Son Prophète ﷺ : « Tu ne guides pas celui que tu aimes, mais c'est Allāh qui guide qui Il veut. »",
      en: "Sa‘īd ibn Al-Musayyib (from his father) and Abū Hurayrah narrated that this verse was revealed upon the death of Abū Tālib, the Prophet's ﷺ protective uncle. Despite the Prophet's ﷺ earnest pleas at his deathbed, Abū Jahl and ‘Abdullāh ibn Abī Umayyah pressured him until he died upon the religion of his forefathers. Allāh consoled His Prophet ﷺ: 'Indeed, you do not guide whom you like, but Allāh guides whom He wills.'",
      es: "Sa‘īd ibn Al-Musayyib y Abū Hurayrah relataron que esta aleya fue revelada al fallecer Abū Tālib: pese a las súplicas del Profeta ﷺ en su lecho de muerte, Abū Yahl lo disuadió y murió en la fe de sus ancestros. Allah consoló al Profeta ﷺ recordándole que solo Él guía a quien quiere.",
      ar: "عن سعيد بن المسيب عن أبيه وأبي هريرة رضي الله عنهما أن هذه الآية نزلت عند وفاة أبي طالب عم النبي ﷺ؛ فقد حرص النبي ﷺ على إسلامه حتى آخر لحظة ولكن أبا جهل ثناه فمات على ملة عبد المطلب، فسلّى الله نبيه ﷺ بقوله: ﴿إِنَّكَ لَا تَهْدِي مَنْ أَحْبَبْتَ وَلَٰكِنَّ اللَّهَ يَهْدِي مَن يَشَاءُ﴾.",
      de: "Sa‘īd ibn Al-Musayyib und Abū Hurayrah berichteten, dass dieser Vers beim Tod von Abū Tālib offenbart wurde: Trotz der inständigen Bitten des Propheten ﷺ starb sein Onkel auf dem Glauben seiner Vorväter, und Allah tröstete den Propheten ﷺ damit, dass allein Er rechtleitet, wen Er will.",
      it: "Sa‘īd ibn Al-Musayyib e Abū Hurayrah narrarono che questo versetto scese alla morte di Abū Tālib: nonostante le suppliche del Profeta ﷺ al suo capezzale, egli morì nella religione degli avi e Allāh consolò il Profeta ﷺ ricordando che la guida spetta solo a Lui.",
      id: "Sa‘id bin Al-Musayyib dan Abu Hurairah meriwayatkan bahwa ayat ini turun saat wafatnya paman Nabi ﷺ, Abu Thalib, yang meski terus dibujuk tetap wafat di atas agama leluhurnya; Allah pun menghibur Nabi ﷺ bahwa hidayah berada di tangan Allah semata.",
      ru: "Са‘ид ибн аль-Мусаййиб и Абу Хурайра передали, что этот аят был ниспослан при кончине Абу Талиба: несмотря на мольбы Пророка ﷺ у его смертного одра, он умер на вере предков, и Аллах утешил Пророка ﷺ словами, что наставляет на прямой путь лишь Тот, Кто пожелает."
    }
  },
  "28:85": {
    type: "hadith",
    versets: ["28:85"],
    plage: "28:85",
    source: "Sahīh Al-Bukhārī n°4773",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) expliqua dans le Kitāb at-Tafsīr d'Al-Bukhārī que la promesse divine adressée au Prophète ﷺ dans ce verset — « Celui qui t'a prescrit le Coran te ramènera assurément vers un lieu de retour (Ma‘ād) » — désigne La Mecque, annonçant déjà avant son départ vers Médine son retour victorieux dans sa cité natale.",
      en: "Ibn ‘Abbās (may Allāh be pleased with them) explained in Sahīh Al-Bukhārī that the divine promise in this verse—'He who imposed upon you the Qur'an will surely take you back to a place of return (Ma‘ād)'—means Makkah, foretelling the Prophet's ﷺ victorious return to his native city.",
      es: "Ibn ‘Abbās explicó en Sahīh Al-Bukhārī que la promesa divina de esta aleya —«te hará regresar a un lugar de retorno (Ma‘ād)»— se refiere a La Meca, anunciando de antemano el regreso victorioso del Profeta ﷺ a su ciudad natal.",
      ar: "عن ابن عباس رضي الله عنهما في كتاب التفسير من صحيح البخاري أن قوله تعالى: ﴿لَرَادُّكَ إِلَىٰ مَعَادٍ﴾ يعني مكة المكرمة، في بشارة مبكرة بعودة النبي ﷺ إليها فاتحًا منصورًا.",
      de: "Ibn ‘Abbās erklärte in Sahīh Al-Bukhārī, dass die göttliche Verheißung in diesem Vers – „wird dich gewiss zu einem Ort der Rückkehr (Ma‘ād) zurückbringen“ – Mekka bezeichnet und die siegreiche Rückkehr des Propheten ﷺ ankündigte.",
      it: "Ibn ‘Abbās spiegò in Sahīh Al-Bukhārī che la promessa divina di questo versetto — «ti ricondurrà certamente a un luogo di ritorno (Ma‘ād)» — indica La Mecca, preannunciando il ritorno vittorioso del Profeta ﷺ nella sua città natale.",
      id: "Ibnu ‘Abbas menjelaskan dalam Shahih Al-Bukhari bahwa janji Allah dalam ayat ini untuk mengembalikan Nabi ﷺ ke ‘tempat kembali (Ma‘ad)’ maksudnya adalah kota Makkah, sebagai kabar gembira kepulangan beliau dengan kemenangan.",
      ru: "Ибн ‘Аббас пояснил в «Сахихе» аль-Бухари, что обещание Аллаха вернуть Пророка ﷺ «к месту возвращения (Ма‘ад)» означает Мекку — раннюю благую весть о его победоносном возвращении в родной город."
    }
  },
  "29:8": {
    type: "sabab",
    versets: ["29:8"],
    plage: "29:8",
    source: "Sahīh Muslim n°1748 & n°2412",
    degre: "Sahīh",
    texte: {
      fr: "Sa‘d ibn Abī Waqqās (qu'Allāh l'agrée) raconte qu'il était extrêmement dévoué envers sa mère. Lorsqu'il embrassa l'Islam, sa mère jura de ne plus ni manger ni boire jusqu'à ce qu'il renie sa foi ou qu'elle meure. Malgré son profond attachement filial, Sa‘d resta ferme sur le Tawhīd tout en demeurant respectueux, et Allāh fit descendre ce verset ordonnant la bonté envers les parents tout en interdisant de leur obéir s'ils poussent à l'associationnisme (Shirk).",
      en: "Sa‘d ibn Abī Waqqās narrated that he was deeply devoted to his mother, yet upon his acceptance of Islam she swore neither to eat nor drink until he renounced his faith or died. Sa‘d remained firm in monotheism while maintaining kindness, and Allāh revealed this verse commanding goodness to parents while forbidding obedience to them if they urge associating partners with Him.",
      es: "Sa‘d ibn Abī Waqqās relató que era muy devoto de su madre, pero al abrazar el Islam ella juró no comer ni beber hasta que apostatara. Sa‘d permaneció firme con respeto filial, y Allah reveló esta aleya ordenando bondad con los padres pero prohibiendo obedecerlos si incitan al politeísmo.",
      ar: "عن سعد بن أبي وقاص رضي الله عنه أنه كان بارًّا بأمه، فلما أسلم حلفت أمه ألا تأكل ولا تشرب حتى يكفر أو تموت، فثبت سعد على التوحيد مع برّه بها، فأنزل الله هذه الآية آمرًا بالإحسان للوالدين وناهيًا عن طاعتهما في الشرك.",
      de: "Sa‘d ibn Abī Waqqās berichtete, dass seine Mutter nach seiner Annahme des Islams schwor, weder zu essen noch zu trinken, bis er den Glauben aufgebe. Sa‘d blieb standhaft und achtungsvoll, woraufhin Allah diesen Vers über Güte zu den Eltern bei gleichzeitigem Verbot des Gehorsams im Schirk offenbarte.",
      it: "Sa‘d ibn Abī Waqqās narrò che dopo la sua conversione sua madre giurò di non mangiare né bere finché non avesse rinnegato la fede. Sa‘d restò saldo con rispetto filiale e Allāh rivelò questo versetto ordinando bontà verso i genitori ma vietando di obbedire loro se spingono al politeismo.",
      id: "Sa‘d bin Abi Waqqash meriwayatkan bahwa ibunya bersumpah tidak mau makan dan minum setelah ia masuk Islam hingga ia murtad. Sa‘d tetap teguh pada tauhid dengan tetap berbakti, lalu turunlah ayat perintah berbuat baik kepada orang tua namun tidak menaati mereka dalam kesyirikan.",
      ru: "Са‘д ибн Абу Ваккас рассказал, что после его принятия ислама мать поклялась не есть и не пить, пока он не отречётся от веры. Са‘д остался твёрд в единобожии, сохраняя почтение к ней, и Аллах ниспослал этот аят о благочестии к родителям при запрете подчиняться им в многобожии."
    }
  },
  "30:1": {
    type: "sabab",
    versets: ["30:1", "30:2", "30:3", "30:4", "30:5"],
    plage: "30:1–5",
    source: "Sunan At-Tirmidhī n°3193, n°3194",
    degre: "Hasan",
    texte: {
      fr: "Ibn ‘Abbās et Niyār ibn Mukram rapportent que lorsque l'Empire perse (zoroastrien) infligea une lourde défaite aux Byzantins (chrétiens, Gens du Livre), les polythéistes de La Mecque s'en réjouirent et raillèrent les musulmans. Allāh révéla aussitôt ces versets annonçant que les Byzantins vaincraient à leur tour dans quelques années (entre trois et neuf ans — bid‘ sinīn). Abū Bakr engagea même un pari avec des notables de Quraysh (avant l'interdiction des jeux de hasard), et la prophétie se réalisa exactement dans le délai annoncé.",
      en: "Ibn ‘Abbās and Niyār ibn Mukram narrated that when the Persian Empire heavily defeated the Byzantines (People of the Book), the polytheists of Makkah rejoiced and mocked the Muslims. Allāh immediately revealed these verses foretelling a Byzantine victory within a few years (three to nine years—bid‘ sinīn). Abū Bakr wagered with Quraysh notables (before gambling was prohibited), and the prophecy came true precisely within that timeframe.",
      es: "Ibn ‘Abbās y Niyār ibn Mukram relataron que cuando los persas derrotaron a los bizantinos, los politeístas de La Meca se regocijaron burlándose de los musulmanes. Allah reveló de inmediato estas aleyas profetizando la victoria bizantina en pocos años (entre tres y nueve), lo cual se cumplió con exactitud.",
      ar: "عن ابن عباس ونيار بن مكرم رضي الله عنهما أنه لما غلبت فارس الروم فرح المشركون بمكة وشمتوا بالمسلمين، فأنزل الله هذه الآيات مبشّرةً بغلبة الروم في بضع سنين (ما بين ثلاث إلى تسع)، وراهنهم أبو بكر قبل تحريم القمار، فتحققت النبوءة بدقة في المدة المحددة.",
      de: "Ibn ‘Abbās und Niyār ibn Mukram berichteten, dass die Polytheisten Mekkas über die Niederlage der Byzantiner gegen Persien frohlockten. Sogleich offenbarte Allah diese Verse, die einen byzantinischen Sieg binnen weniger Jahre (drei bis neun Jahre) ankündigten – was exakt eintraf.",
      it: "Ibn ‘Abbās e Niyār ibn Mukram narrarono che quando i Persiani sconfissero i Bizantini, i politeisti della Mecca esultarono schernendo i musulmani. Allāh rivelò subito questi versetti profetizzando la rivincita bizantina entro pochi anni (da tre a nove), che si compì puntualmente.",
      id: "Ibnu ‘Abbas dan Niyar bin Mukram meriwayatkan bahwa ketika Persia mengalahkan Romawi, kaum musyrik Makkah bersorak mengejek kaum muslimin. Allah langsung menurunkan ayat-ayat yang menubuatkan kemenangan Romawi dalam beberapa tahun (tiga hingga sembilan tahun), dan nubuat itu benar-benar terwujud.",
      ru: "Ибн ‘Аббас и Нияр ибн Мукрам передали, что когда персы разгромили византийцев, мекканские многобожники возликовали. Аллах немедленно ниспослал эти аяты, предсказав победу византийцев в пределах нескольких лет (от трёх до девяти), и пророчество в точности исполнилось."
    }
  },
  "31:13": {
    type: "hadith",
    versets: ["31:13"],
    plage: "31:13",
    source: "Sahīh Al-Bukhārī n°4776 & Sahīh Muslim n°124",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd (qu'Allāh l'agrée) rapporte que lorsque les Compagnons s'inquiétèrent de la portée du mot « injustice » (Zulm) dans Sourate 6:82, le Messager d'Allāh ﷺ s'appuya directement sur ce conseil du sage Luqmān à son fils pour trancher le sens du terme : « N'avez-vous pas entendu la parole du serviteur vertueux : “Ô mon fils, ne donne pas d'associé à Allāh, car l'associationnisme (Shirk) est certes une immense injustice” ? »",
      en: "‘Abdullāh ibn Mas‘ūd narrated that when the Companions worried about the meaning of 'wrongdoing' (Zulm) in Sūrah 6:82, the Messenger of Allāh ﷺ directly cited Luqmān's advice to his son here to clarify it: 'Have you not heard the statement of the righteous servant: “O my son, do not associate anything with Allāh; indeed, association with Him is great injustice”?'",
      es: "‘Abdullāh ibn Mas‘ūd relató que cuando los Compañeros se preocuparon por el sentido de «injusticia» en 6:82, el Profeta ﷺ citó directamente este consejo de Luqmān a su hijo para aclarar que se refiere a la mayor de las injusticias: asociar copartícipes a Allah.",
      ar: "عن عبد الله بن مسعود رضي الله عنه أنه لما شقّ على الصحابة معنى «الظلم» في آية الأنعام (٦:٨٢) استدلّ النبي ﷺ بهذه الوصية من لقمان لابنه مبيّنًا أن المقصود هو الشرك: ﴿إِنَّ الشِّرْكَ لَظُلْمٌ عَظِيمٌ﴾.",
      de: "‘Abdullāh ibn Mas‘ūd berichtete, dass der Gesandte Allahs ﷺ zur Klärung von „Unrecht“ (Zulm) in Sure 6:82 direkt diesen Rat Luqmāns an seinen Sohn anführte: „Wahrlich, die Beigesellung (Schirk) ist ein gewaltiges Unrecht.“",
      it: "‘Abdullāh ibn Mas‘ūd narrò che per chiarire il termine «ingiustizia» (Zulm) in 6:82, il Messaggero di Allāh ﷺ citò direttamente questo consiglio di Luqmān a suo figlio: «In verità associare altri ad Allāh è un'immensa ingiustizia».",
      id: "‘Abdullah bin Mas‘ud meriwayatkan bahwa untuk menjelaskan makna ‘kezaliman’ pada Surah 6:82, Nabi ﷺ merujuk langsung nasihat Luqman kepada putranya dalam ayat ini bahwa syirik adalah kezaliman yang sangat besar.",
      ru: "‘Абдуллах ибн Мас‘уд передал, что разъясняя значение слова «несправедливость» в суре 6:82, Пророк ﷺ прямо привёл это наставление Лукмана своему сыну: «Поистине, многобожие — великая несправедливость»."
    }
  },
  "31:14": {
    type: "sabab",
    versets: ["31:14", "31:15"],
    plage: "31:14–15",
    source: "Sahīh Muslim n°1748",
    degre: "Sahīh",
    texte: {
      fr: "Sa‘d ibn Abī Waqqās (qu'Allāh l'agrée) rapporte que ces versets furent révélés à son sujet lorsque sa mère tenta par une grève de la faim de le faire renoncer à l'Islam. Tout en interdisant formellement d'obéir à ses parents dans le polythéisme, Allāh posa ici une règle d'or d'éthique familiale : « Mais accompagne-les ici-bas de façon convenable et bienveillante (Ma‘rūf). »",
      en: "Sa‘d ibn Abī Waqqās narrated that these verses were revealed concerning him when his mother tried to pressure him out of Islam through a hunger strike. While forbidding obedience in polytheism, Allāh established a golden principle of family ethics here: 'Yet accompany them in this world with kindness and respect (Ma‘rūf).'",
      es: "Sa‘d ibn Abī Waqqās relató que estas aleyas descendieron respecto a su madre cuando intentó apartarlo del Islam. Aunque prohíbe obedecer a los padres en el politeísmo, Allah estableció aquí una regla de oro: «pero compórtate con ellos en este mundo con bondad y respeto».",
      ar: "عن سعد بن أبي وقاص رضي الله عنه أن هاتين الآيتين نزلتا فيه حين حاولت أمه ردّه عن الإسلام؛ فمع النهي القاطع عن طاعتهما في الشرك قرّر الله قاعدةً عظيمة في البر: ﴿وَصَاحِبْهُمَا فِي الدُّنْيَا مَعْرُوفًا﴾.",
      de: "Sa‘d ibn Abī Waqqās berichtete, dass diese Verse wegen ihm und seiner Mutter offenbart wurden: Neben dem Verbot des Gehorsams im Schirk legte Allah hier einen Grundsatz familiärer Ethik fest: „Geh dennoch im Diesseits in gütiger Weise mit ihnen um.“",
      it: "Sa‘d ibn Abī Waqqās narrò che questi versetti scesero per il caso suo e di sua madre: pur vietando di obbedire ai genitori nel politeismo, Allāh stabilì qui una regola aurea: «ma comportati con loro in questo mondo con bontà e rispetto».",
      id: "Sa‘d bin Abi Waqqash meriwayatkan bahwa dua ayat ini turun mengenai dirinya dan ibunya: meski melarang ketaatan dalam syirik, Allah menetapkan prinsip luhur: “dan pergaulilah keduanya di dunia dengan cara yang baik.”",
      ru: "Са‘д ибн Абу Ваккас передал, что эти аяты были ниспосланы о нём и его матери: запретив подчиняться родителям в многобожии, Аллах утвердил золотое правило: «но сопровождай их в этом мире по-доброму»."
    }
  },
  "31:34": {
    type: "hadith",
    versets: ["31:34"],
    plage: "31:34",
    source: "Sahīh Al-Bukhārī n°50, n°4777, n°4778 & Sahīh Muslim n°9",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah rapporte que lorsque l'Ange Jibrīl (sous forme humaine) interrogea le Prophète ﷺ devant ses Compagnons sur la date de l'Heure suprême, le Prophète ﷺ répondit que celui qui est interrogé n'en sait pas plus que celui qui interroge, puis récita ce verset : « Il y a cinq choses dont Allāh Seul détient la science : la connaissance de l'Heure, la descente de la pluie, ce que renferment les matrices, ce que chaque âme acquerra demain et en quelle terre elle mourra. »",
      en: "Abū Hurayrah narrated that when Angel Jibrīl (in human form) asked the Prophet ﷺ about the timing of the Hour, the Prophet ﷺ replied that the one questioned knows no more than the questioner, then recited this verse affirming the five matters of the Unseen whose complete knowledge belongs exclusively to Allāh.",
      es: "Abū Hurayrah relató que cuando el Ángel Yibrīl preguntó al Profeta ﷺ por el momento de la Hora, este respondió que el preguntado no sabe más que quien pregunta y recitó esta aleya sobre las cinco realidades ocultas cuyo conocimiento absoluto pertenece solo a Allah.",
      ar: "عن أبي هريرة رضي الله عنه أن جبريل عليه السلام حين سأل النبي ﷺ عن موعد الساعة قال ﷺ: «ما المسؤول عنها بأعلم من السائل»، ثم تلا هذه الآية مبينًا مفاتيح الغيب الخمس التي استأثر الله بعلمها وحده.",
      de: "Abū Hurayrah berichtete, dass der Prophet ﷺ auf die Frage des Engels Dschibrīl nach dem Zeitpunkt der Stunde antwortete, der Befragte wisse nicht mehr als der Fragende, und daraufhin diesen Vers über die fünf verborgenen Dinge rezitierte, die allein Allah kennt.",
      it: "Abū Hurayrah narrò che alla domanda dell'Angelo Jibrīl sul momento dell'Ora, il Profeta ﷺ rispose che l'interrogato non ne sa più di chi interroga, recitando poi questo versetto sulle cinque realtà invisibili note solo ad Allāh.",
      id: "Abu Hurairah meriwayatkan bahwa saat Malaikat Jibril bertanya tentang waktu Hari Kiamat, Nabi ﷺ menjawab yang ditanya tidak lebih tahu daripada yang bertanya, lalu membacakan ayat tentang lima perkara gaib yang hanya diketahui Allah semata.",
      ru: "Абу Хурайра передал, что когда ангел Джибриль спросил Пророка ﷺ о времени наступления Часа, тот ответил, что спрашиваемый знает о нём не больше спрашивающего, и прочёл этот аят о пяти сокровенных вещах, ведомых одному Аллаху."
    }
  },
  "32:17": {
    type: "hadith",
    versets: ["32:17"],
    plage: "32:17",
    source: "Sahīh Al-Bukhārī n°3244, n°4779 & Sahīh Muslim n°2824",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah (qu'Allāh l'agrée) rapporte ce Hadith Qudsī du Messager d'Allāh ﷺ : « Allāh le Très-Haut a dit : “J'ai préparé pour Mes serviteurs vertueux ce qu'aucun œil n'a jamais vu, ce qu'aucune oreille n'a jamais entendu et ce qui n'a jamais effleuré le cœur d'aucun être humain !” » Puis Abū Hurayrah ajouta : « Récitez, si vous le voulez, ce verset : “Aucune âme ne sait ce qu'on a réservé pour eux comme réjouissance pour les yeux.” »",
      en: "Abū Hurayrah narrated this Hadith Qudsī from the Messenger of Allāh ﷺ: 'Allāh the Exalted said: “I have prepared for My righteous servants what no eye has seen, no ear has heard, and what has never crossed the human heart.” Recite if you wish: “And no soul knows what has been hidden for them of comfort for eyes.”'",
      es: "Abū Hurayrah relató este Hadiz Qudsī del Profeta ﷺ: «Allah dijo: “He preparado para Mis siervos virtuosos lo que ningún ojo ha visto, ningún oído ha escuchado y ningún corazón humano ha imaginado”. Recitad si queréis esta aleya sobre las delicias reservadas para sus ojos».",
      ar: "عن أبي هريرة رضي الله عنه أن رسول الله ﷺ قال: «قال الله تعالى: أعددتُ لعبادي الصالحين ما لا عينٌ رأت ولا أذنٌ سمعت ولا خطر على قلب بشر»، ثم قال: اقرؤوا إن شئتم: ﴿فَلَا تَعْلَمُ نَفْسٌ مَّا أُخْفِيَ لَهُم مِّن قُرَّةِ أَعْيُنٍ﴾.",
      de: "Abū Hurayrah berichtete dieses Hadith Qudsī des Gesandten Allahs ﷺ: „Allah sprach: ‚Ich habe für Meine rechtschaffenen Diener bereitet, was kein Auge gesehen, kein Ohr gehört und kein Menschenherz je erahnt hat.‘ Lest, wenn ihr wollt, diesen Vers.“",
      it: "Abū Hurayrah narrò questo Hadith Qudsī dal Messaggero di Allāh ﷺ: «Allāh ha detto: “Ho preparato per i Miei servi virtuosi ciò che nessun occhio ha mai visto, nessun orecchio ha udito e nessun cuore umano ha mai immaginato”. Recitate se volete questo versetto».",
      id: "Abu Hurairah meriwayatkan Hadits Qudsi dari Rasulullah ﷺ bahwa Allah berfirman: “Aku telah menyiapkan bagi hamba-hamba-Ku yang saleh apa yang belum pernah dilihat mata, didengar telinga, dan terlintas di hati manusia”, lalu ia mengutip ayat ini.",
      ru: "Абу Хурайра передал этот хадис кудси от Посланника Аллаха ﷺ: «Аллах сказал: “Я уготовил для Моих праведных рабов то, чего не видел глаз, не слышало ухо и о чём даже не помышляло сердце человека”. И прочтите, если желаете, этот аят»."
    }
  },
  "33:4": {
    type: "sabab",
    versets: ["33:4", "33:5"],
    plage: "33:4–5",
    source: "Sahīh Al-Bukhārī n°4782 & Sahīh Muslim n°2425",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn ‘Umar (qu'Allāh les agrée) rapporte : « Nous n'appelions Zayd ibn Hārithah (l'affranchi et protégé du Prophète ﷺ) que “Zayd fils de Muhammad”, jusqu'à ce que descende ce verset du Coran : “Appelez-les du nom de leurs pères ; c'est plus équitable devant Allāh.” » Ce verset abolit ainsi l'adoption filiale qui effaçait la lignée biologique réelle, tout en préservant l'affection fraternelle et la prise en charge des orphelins.",
      en: "‘Abdullāh ibn ‘Umar narrated: 'We used to call Zayd ibn Hārithah nothing other than “Zayd ibn Muhammad” until the Qur'an revealed: “Call them by the names of their fathers; it is more just in the sight of Allāh.”' This abolished legal attribution that erased true lineage while preserving loving guardianship and brotherhood.",
      es: "‘Abdullāh ibn ‘Umar relató: «No llamábamos a Zayd ibn Hārithah sino “Zayd hijo de Muhammad” hasta que descendió esta aleya ordenando llamarlos por el nombre de sus padres biológicos, lo cual es más justo ante Allah», preservando siempre la fraternidad y el cuidado.",
      ar: "عن عبد الله بن عمر رضي الله عنهما قال: ما كنا ندعو زيد بن حارثة إلا زيد بن محمد حتى نزل القرآن: ﴿ادْعُوهُمْ لِآبَائِهِمْ هُوَ أَقْسَطُ عِندَ اللَّهِ﴾، فأبطلت الآية التبنّي الذي يطمس النسب الحقيقي مع حفظ الأخوة والكفالة.",
      de: "‘Abdullāh ibn ‘Umar berichtete: „Wir nannten Zayd ibn Hārithah stets ‚Zayd, Sohn Muhammads‘, bis dieser Vers offenbart wurde: ‚Nennt sie nach ihren Vätern; das ist gerechter bei Allah.‘“ Damit wurde die Verwischung der wahren Abstammung bei voller Wahrung der Fürsorge abgeschafft.",
      it: "‘Abdullāh ibn ‘Umar narrò: «Chiamavamo Zayd ibn Hārithah soltanto “Zayd figlio di Muhammad”, finché scese questo versetto ordinando di chiamarli col nome dei loro padri biologici, cosa più equa presso Allāh», pur custodendo fratellanza e cura.",
      id: "‘Abdullah bin ‘Umar meriwayatkan: “Dahulu kami selalu memanggil Zaid bin Haritsah dengan sebutan Zaid bin Muhammad hingga turun ayat yang memerintahkan memanggil mereka dengan nasab ayah kandungnya karena itu lebih adil di sisi Allah.”",
      ru: "‘Абдуллах ибн ‘Умар передал: «Мы называли Зайда ибн Харису не иначе как “Зайд, сын Мухаммада”, пока не был ниспослан этот аят: “Зовите их по именам их отцов — это справедливее пред Аллахом”»."
    }
  },
  "33:23": {
    type: "sabab",
    versets: ["33:23"],
    plage: "33:23",
    source: "Sahīh Al-Bukhārī n°2805, n°4783 & Sahīh Muslim n°1903",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik (qu'Allāh l'agrée) rapporte que ce verset fut révélé au sujet de son oncle paternel Anas ibn An-Nadr : n'ayant pu assister à la bataille de Badr, il éprouva un profond regret et déclara : « Si Allāh me fait assister à une prochaine bataille, Il verra certes ce que je ferai ! » Lors de la bataille d'Uhud, il tint parole avec un courage héroïque et tomba martyr couvert de plus de quatre-vingts blessures, si bien que seule sa sœur put le reconnaître au bout de ses doigts.",
      en: "Anas ibn Mālik narrated that this verse was revealed about his uncle Anas ibn An-Nadr, who regretted missing the Battle of Badr and vowed that if Allāh let him witness another battle, he would prove his devotion. At Uhud he kept his pledge heroically and was martyred with over eighty wounds, recognized only by his sister from his fingertips.",
      es: "Anas ibn Mālik relató que esta aleya fue revelada respecto a su tío Anas ibn An-Nadr, quien lamentó ausentarse de Badr y prometió demostrar su entrega en el siguiente combate: en Uhud cumplió su pacto con heroísmo y cayó mártir con más de ochenta heridas.",
      ar: "عن أنس بن مالك رضي الله عنه أن هذه الآية نزلت في عمه أنس بن النضر الذي غاب عن بدر فحزن وقال: لئن أشهدني الله قتال المشركين ليرين الله ما أصنع! فوفّى بعهده يوم أُحد واستُشهد وبه بضع وثمانون جراحة لم تعرفه إلا أخته ببنانه.",
      de: "Anas ibn Mālik berichtete, dass dieser Vers über seinen Onkel Anas ibn An-Nadr offenbart wurde, der Badr verpasst hatte und gelobte, seine Hingabe in der nächsten Schlacht zu beweisen: Bei Uhud erfüllte er sein Versprechen tapfer und fiel als Märtyrer mit über achtzig Wunden.",
      it: "Anas ibn Mālik narrò che questo versetto fu rivelato riguardo a suo zio Anas ibn An-Nadr, rattristato per aver mancato Badr: egli promise fedeltà assoluta e ad Uhud mantenne eroicamente il patto cadendo martire con oltre ottanta ferite.",
      id: "Anas bin Malik meriwayatkan bahwa ayat ini turun berkenaan dengan pamannya Anas bin An-Nadhr yang sangat menyesal tertinggal dari Perang Badar; pada Perang Uhud ia menepati janjinya dengan gagah berani hingga gugur syahid dengan lebih dari delapan puluh luka.",
      ru: "Анас ибн Малик передал, что этот аят был ниспослан о его дяде Анасе ибн ан-Надре, который сожалел, что пропустил Бадр, и поклялся проявить стойкость в следующем сражении: при Ухуде он сдержал обет и пал мучеником, получив более восьмидесяти ран."
    }
  },
  "33:28": {
    type: "sabab",
    versets: ["33:28", "33:29"],
    plage: "33:28–29",
    source: "Sahīh Al-Bukhārī n°4785, n°4786 & Sahīh Muslim n°1478",
    degre: "Sahīh",
    texte: {
      fr: "Jābir ibn ‘Abdillāh et ‘Ā’ishah rapportent que lorsque les épouses du Prophète ﷺ demandèrent un accroissement des dépenses matérielles du foyer malgré sa simplicité de vie, Allāh révéla ces deux « versets du choix » (Āyat at-Takhyīr) invitant le Prophète ﷺ à leur laisser librement choisir entre l'aisance de ce bas monde (avec séparation honorable) ou Allāh, Son Messager et la demeure de l'Au-delà. Le Prophète ﷺ commença par ‘Ā’ishah en lui conseillant même de consulter ses parents ; elle répondit sur-le-champ qu'elle choisissait Allāh, Son Messager et l'Au-delà, et toutes ses coépouses firent aussitôt le même choix.",
      en: "Jābir ibn ‘Abdillāh and ‘Ā’ishah narrated that when the Prophet's ﷺ wives requested greater worldly allowance, Allāh revealed these two 'Verses of Choice,' instructing him to let them freely choose between worldly comfort with an honorable release or Allāh, His Messenger, and the Hereafter. Starting with ‘Ā’ishah—even advising her to consult her parents—she immediately chose Allāh and His Messenger ﷺ, followed by all the other wives.",
      es: "Yābir y ‘Ā’ishah relataron que cuando las esposas del Profeta ﷺ solicitaron mayores bienes materiales, Allah reveló estas dos «aleyas de la elección» dándoles libertad para elegir entre el bienestar mundano o Allah, Su Mensajero y la Otra Vida; empezando por ‘Ā’ishah, todas eligieron de inmediato a Allah y a Su Mensajero ﷺ.",
      ar: "عن جابر وعائشة رضي الله عنهم أنه لما طلبت أزواج النبي ﷺ التوسعة في النفقة أنزل الله آيتي التخيير، فبدأ النبي ﷺ بعائشة وأشار عليها أن تستأمر أبويها فقالت فورًا: بل أختار الله ورسوله والدار الآخرة، فاختارت سائر أزواجه مثل اختيارها.",
      de: "Dschābir und ‘Ā’ishah berichteten, dass Allah diese beiden „Verse der Wahl“ offenbarte, als die Ehefrauen des Propheten ﷺ mehr weltlichen Unterhalt erbaten. Er begann bei ‘Ā’ishah und riet ihr sogar, ihre Eltern zu fragen, doch sie und alle übrigen Ehefrauen wählten sofort Allah, Seinen Gesandten ﷺ und das Jenseits.",
      it: "Jābir e ‘Ā’ishah narrarono che quando le mogli del Profeta ﷺ chiesero maggiori mezzi materiali, Allāh rivelò questi due «versetti della scelta». Iniziando da ‘Ā’ishah, il Profeta ﷺ la invitò persino a consultare i genitori, ma lei e tutte le altre scelsero subito Allāh, il Suo Messaggero ﷺ e l'Aldilà.",
      id: "Jabir dan ‘Aisyah meriwayatkan bahwa ketika para istri Nabi ﷺ meminta tambahan nafkah duniawi, Allah menurunkan dua ayat pilihan ini. Nabi ﷺ memulai dari ‘Aisyah, namun ia beserta seluruh istri beliau lainnya langsung memilih Allah, Rasul-Nya, dan negeri akhirat.",
      ru: "Джабир и ‘Аиша передали, что когда жёны Пророка ﷺ попросили увеличить мирское содержание, Аллах ниспослал эти два «аята выбора». Начав с ‘Аиши, Пророк ﷺ даже посоветовал ей посоветоваться с родителями, но она и все остальные жёны немедленно выбрали Аллаха, Его Посланника ﷺ и Вечную жизнь."
    }
  },
  "33:37": {
    type: "sabab",
    versets: ["33:37"],
    plage: "33:37",
    source: "Sahīh Al-Bukhārī n°4787, n°7420 & Sahīh Muslim n°1428",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik (qu'Allāh l'agrée) rapporte que ce verset fut révélé au sujet de Zaynab bint Jahsh et de Zayd ibn Hārithah : après que leur mariage se fut achevé par un divorce malgré les exhortations du Prophète ﷺ à préserver leur union, Allāh ordonna Lui-même le mariage du Prophète ﷺ avec Zaynab afin d'abolir concrètement l'ancien tabou préislamique qui interdisait d'épouser l'ex-épouse d'un fils adoptif. Zaynab s'en réjouissait en disant : « C'est Allāh Lui-même qui m'a mariée depuis au-dessus des sept cieux ! »",
      en: "Anas ibn Mālik narrated that this verse was revealed regarding Zaynab bint Jahsh and Zayd ibn Hārithah: after their marriage ended in divorce despite the Prophet's ﷺ advice to keep her, Allāh Himself decreed the Prophet's ﷺ marriage to Zaynab to abolish the pre-Islamic taboo against marrying the former wife of an adopted son. Zaynab took pride in saying Allāh Himself gave her in marriage from above the seven heavens.",
      es: "Anas ibn Mālik relató que esta aleya descendió acerca de Zaynab bint Yahsh y Zayd ibn Hārithah: tras divorciarse pese al consejo del Profeta ﷺ de mantener su unión, Allah mismo dispuso el matrimonio del Profeta ﷺ con Zaynab para abolir el tabú preislámico sobre la exesposa de un hijo adoptivo.",
      ar: "عن أنس بن مالك رضي الله عنه أن هذه الآية نزلت في زينب بنت جحش وزيد بن حارثة رضي الله عنهما؛ فبعد أن طلقها زيد أمر الله نبيه ﷺ بالزواج منها لإبطال عادة الجاهلية في تحريم حلائل الأدعياء، وكانت زينب تفتخر بأن الله زوّجها من فوق سبع سماوات.",
      de: "Anas ibn Mālik berichtete, dass dieser Vers über Zaynab bint Dschahsch und Zayd ibn Hārithah offenbart wurde: Nach ihrer Scheidung verfügte Allah selbst die Ehe des Propheten ﷺ mit Zaynab, um das vorislamische Tabu bezüglich der früheren Ehefrau eines Adoptivsohnes praktisch aufzuheben.",
      it: "Anas ibn Mālik narrò che questo versetto scese riguardo a Zaynab bint Jahsh e Zayd ibn Hārithah: dopo il loro divorzio, Allāh stesso dispose il matrimonio del Profeta ﷺ con Zaynab per abolire il tabù preislamico relativo all'ex moglie di un figlio adottivo.",
      id: "Anas bin Malik meriwayatkan bahwa ayat ini turun mengenai Zainab binti Jahsy dan Zaid bin Haritsah: setelah perceraian mereka, Allah sendiri menetapkan pernikahan Nabi ﷺ dengan Zainab demi menghapus adat Jahiliyah yang mengharamkan mantan istri anak angkat.",
      ru: "Анас ибн Малик передал, что этот аят был ниспослан о Зайнаб бинт Джахш и Зайде ибн Харисе: после их развода сам Аллах предписал Пророку ﷺ жениться на Зайнаб, чтобы на деле отменить доисламский запрет на брак с бывшей женой приёмного сына."
    }
  },
  "33:51": {
    type: "hadith",
    versets: ["33:51"],
    plage: "33:51",
    source: "Sahīh Al-Bukhārī n°4788, n°4789 & Sahīh Muslim n°1464",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) rapporte qu'après la révélation de ce verset accordant au Messager d'Allāh ﷺ une latitude particulière dans le partage des jours entre ses épouses, le Prophète ﷺ continua néanmoins, par délicatesse et équité exemplaires, à demander leur consentement avant tout changement de tour — comme lorsque Sawdah bint Zam‘ah offrit volontairement son jour à ‘Ā’ishah.",
      en: "‘Ā’ishah narrated that even after this verse granted the Messenger of Allāh ﷺ special discretion in alternating days among his wives, he still continued—out of exemplary fairness and gentleness—to seek their consent before any change, as when Sawdah bint Zam‘ah willingly gifted her turn to ‘Ā’ishah.",
      es: "‘Ā’ishah relató que incluso tras revelarse esta aleya que otorgaba al Profeta ﷺ flexibilidad en los turnos con sus esposas, él siguió pidiendo con suma delicadeza y equidad su consentimiento, como cuando Sawdah cedió voluntariamente su día a ‘Ā’ishah.",
      ar: "عن عائشة رضي الله عنها أنه حتى بعد نزول هذه الآية التي وسّعت للنبي ﷺ في القسم بين أزواجه، ظلّ ﷺ لشدة عدله ولطفه يستأذن زوجاته عند أي تبديل، كما حين وهبت سودة بنت زمعة يومها لعائشة عن طيب نفس.",
      de: "‘Ā’ishah berichtete, dass der Gesandte Allahs ﷺ trotz der in diesem Vers gewährten Freiheit bei der Aufteilung der Tage unter seinen Ehefrauen aus vorbildlicher Gerechtigkeit und Rücksichtnahme stets deren Einverständnis einholte.",
      it: "‘Ā’ishah narrò che persino dopo la discesa di questo versetto, il Profeta ﷺ continuò per esemplare equità e delicatezza a chiedere il consenso delle sue mogli per ogni variazione, come quando Sawdah cedette spontaneamente il proprio giorno ad ‘Ā’ishah.",
      id: "‘Aisyah meriwayatkan bahwa meski ayat ini memberikan kelonggaran kepada Rasulullah ﷺ dalam mengatur giliran para istrinya, beliau tetap meminta izin mereka dengan penuh keadilan dan kelembutan, seperti saat Saudah dengan tulus menghadiahkan harinya kepada ‘Aisyah.",
      ru: "‘Аиша передала, что даже после ниспослания этого аята, даровавшего Пророку ﷺ свободу в распределении дней между жёнами, он из величайшей справедливости и чуткости продолжал спрашивать их согласия при любых изменениях."
    }
  },
  "33:53": {
    type: "sabab",
    versets: ["33:53"],
    plage: "33:53",
    source: "Sahīh Al-Bukhārī n°4791, n°4792, n°4793 & Sahīh Muslim n°1428",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik (qu'Allāh l'agrée) rapporte que ce verset fut révélé le jour du banquet de mariage du Prophète ﷺ avec Zaynab bint Jahsh : après le repas, trois invités s'attardèrent longtemps à bavarder dans la maison alors que le Prophète ﷺ, par grande pudeur, n'osait pas leur demander de partir. Allāh révéla alors ce verset — connu sous le nom de « Verset du Hijāb » — posant les règles de bienséance lors des visites et instituant le voile de séparation pour les Mères des Croyants.",
      en: "Anas ibn Mālik narrated that this verse was revealed on the day of the Prophet's ﷺ wedding banquet with Zaynab bint Jahsh: after dining, three guests lingered in conversation while the Prophet ﷺ felt too shy to ask them to leave. Allāh then revealed this verse—known as the 'Verse of the Hijāb'—establishing visiting etiquette and the screen of privacy for the Mothers of the Believers.",
      es: "Anas ibn Mālik relató que esta aleya descendió el día del banquete nupcial del Profeta ﷺ con Zaynab: tras comer, tres invitados se demoraron conversando mientras el Profeta ﷺ sentía pudor de pedirles que se retiraran. Allah reveló entonces esta aleya fijando las normas de cortesía en las visitas y el velo de privacidad para las Madres de los Creyentes.",
      ar: "عن أنس بن مالك رضي الله عنه أن هذه الآية — المعروفة بآية الحجاب — نزلت يوم وليمة زواج النبي ﷺ بزينب بنت جحش حين أطال ثلاثة من الضيوف الجلوس للحديث بعد الطعام واستحيا النبي ﷺ أن يطلب منهم الانصراف، فأرسى الله آداب الزيارة والاستئذان وحجاب أمهات المؤمنين.",
      de: "Anas ibn Mālik berichtete, dass dieser als „Vers des Hidschāb“ bekannte Vers am Tag des Hochzeitsmahls mit Zaynab offenbart wurde, als drei Gäste nach dem Essen lange sitzen blieben und der Prophet ﷺ aus Schamgefühl nichts sagte. Allah legte damit die Höflichkeitsregeln für Besuche und die Wahrung der Privatsphäre der Mütter der Gläubigen fest.",
      it: "Anas ibn Mālik narrò che questo versetto — noto come «Versetto del Hijāb» — scese il giorno del banchetto nuziale con Zaynab, quando tre ospiti si attardarono a conversare e il Profeta ﷺ per pudore non li congedò. Allāh stabilì così il galateo delle visite e la riservatezza delle Madri dei Credenti.",
      id: "Anas bin Malik meriwayatkan bahwa ayat ini — yang dikenal sebagai Ayat Hijab — turun pada hari walimah pernikahan Nabi ﷺ dengan Zainab ketika tiga tamu berlama-lama berbincang usai makan sementara Nabi ﷺ merasa sungkan menyuruh mereka pulang. Allah pun menetapkan adab bertamu dan hijab bagi para Ummahatul Mukminin.",
      ru: "Анас ибн Малик передал, что этот аят — известный как «аят о хиджабе» — был ниспослан в день свадебного угощения по случаю брака Пророка ﷺ с Зайнаб, когда трое гостей задержались за беседой, а Пророк ﷺ постеснялся попросить их уйти. Аллах установил правила этикета посещений и завесы для Матерей верующих."
    }
  },
  "33:56": {
    type: "hadith",
    versets: ["33:56"],
    plage: "33:56",
    source: "Sahīh Al-Bukhārī n°4797, n°4798 & Sahīh Muslim n°406",
    degre: "Sahīh",
    texte: {
      fr: "Ka‘b ibn ‘Ujrah (qu'Allāh l'agrée) rapporte qu'après la révélation de ce verset ordonnant aux croyants de prier sur le Prophète ﷺ et de le saluer, les Compagnons lui demandèrent : « Ô Messager d'Allāh, nous savons déjà comment te saluer (le Salām), mais comment devons-nous prier sur toi (As-Salāh) ? » Le Prophète ﷺ leur enseigna alors la formule dite « Prière Abrahamique » (As-Salāh al-Ibrāhīmiyyah) récitée dans chaque prière : « Ô Allāh, prie sur Muhammad et sur la famille de Muhammad comme Tu as prié sur Ibrāhīm et sur la famille d'Ibrāhīm… »",
      en: "Ka‘b ibn ‘Ujrah narrated that when this verse commanding believers to send blessings and peace upon the Prophet ﷺ was revealed, the Companions asked: 'O Messenger of Allāh, we know how to send peace upon you, but how should we send blessings upon you?' The Prophet ﷺ then taught them the Abrahamic Blessing (Salāh Ibrāhīmiyyah) recited in every prayer.",
      es: "Ka‘b ibn ‘Ujrah relató que al revelarse esta aleya ordenando bendecir y saludar al Profeta ﷺ, los Compañeros le preguntaron cómo debían bendecirlo, y él les enseñó la fórmula conocida como la Oración Abrahámica (As-Salāh al-Ibrāhīmiyyah) que se recita en cada oración.",
      ar: "عن كعب بن عجرة رضي الله عنه أنه لما نزلت هذه الآية سأل الصحابة رسول الله ﷺ: قد علمنا كيف نسلّم عليك، فكيف نصلّي عليك؟ فعلّمهم ﷺ الصيغة الإبراهيمية التي تُقرأ في كل صلاة: «اللهم صلِّ على محمد وعلى آل محمد كما صليتَ على إبراهيم وعلى آل إبراهيم...».",
      de: "Ka‘b ibn ‘Ujrah berichtete, dass die Gefährten nach der Offenbarung dieses Verses fragten, wie sie den Segen über den Propheten ﷺ sprechen sollten, woraufhin er sie das Abrahamische Segensgebet (Salāh Ibrāhīmiyyah) lehrte, das in jedem Gebet gesprochen wird.",
      it: "Ka‘b ibn ‘Ujrah narrò che alla rivelazione di questo versetto i Compagni chiesero al Profeta ﷺ come invocare la benedizione su di lui, ed egli insegnò loro la formula della Preghiera Abrahamica (As-Salāh al-Ibrāhīmiyyah) recitata in ogni preghiera.",
      id: "Ka‘b bin ‘Ujrah meriwayatkan bahwa saat ayat perintah bershalawat ini turun, para sahabat bertanya bagaimana cara bershalawat kepada Nabi ﷺ, lalu beliau mengajarkan bacaan Shalawat Ibrahimiyah yang dibaca dalam setiap shalat.",
      ru: "Ка‘б ибн ‘Уджра передал, что после ниспослания этого аята сподвижники спросили Пророка ﷺ, как именно благословлять его, и он обучил их формуле Ибрахимова благословения (ас-Салят аль-Ибрахимийя), читаемой в каждой молитве."
    }
  }
};

// Auto-contrôle strict avant écriture (8 langues + champs obligatoires)
const LANGUES_REQ = ['fr', 'en', 'es', 'ar', 'de', 'it', 'id', 'ru'];
for (const [cle, rec] of Object.entries(LOT_07_FURQAN_AHZAB)) {
  if (!rec.type || !rec.source || !rec.degre || !Array.isArray(rec.versets) || !rec.texte) {
    throw new Error(`Structure invalide pour ${cle}`);
  }
  for (const lg of LANGUES_REQ) {
    if (!rec.texte[lg] || typeof rec.texte[lg] !== 'string' || rec.texte[lg].trim().length < 20) {
      throw new Error(`Texte manquant ou trop court pour ${cle} [${lg}]`);
    }
  }
}

Object.assign(data.recits, LOT_07_FURQAN_AHZAB);
data.version = (data.version || 1) + 1;

const jsonFinal = JSON.stringify(data, null, 2);
JSON.parse(jsonFinal);
writeSafe(asbabPath, jsonFinal);

let worker = fs.readFileSync(workerPath, 'utf8');
worker = worker.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
writeSafe(workerPath, worker);

const nbRecits = Object.keys(data.recits).length;
const nbVersets = Object.values(data.recits).reduce((acc, r) => acc + (Array.isArray(r.versets) ? r.versets.length : 1), 0);
console.log(`✅ Lot 7 (Sourates 25 à 33) validé et intégré ! Total actuel : ${nbRecits} récits couvrant ${nbVersets} versets en 8 langues.`);
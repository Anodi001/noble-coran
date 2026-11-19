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

const LOT_04_ANFAL_TAWBAH = {
  "8:1": {
    type: "sabab",
    versets: ["8:1"],
    plage: "8:1",
    source: "Sahīh Muslim n°1748",
    degre: "Sahīh",
    texte: {
      fr: "Sa‘d ibn Abī Waqqās (qu'Allāh l'agrée) rapporte qu'au lendemain de la bataille de Badr, il ramassa une épée parmi le butin et demanda au Messager d'Allāh ﷺ de la lui attribuer. Le Prophète ﷺ lui ordonna de la reposer là où il l'avait prise. Alors qu'un différend commençait à naître autour du partage du butin, Allāh révéla ce verset d'ouverture affirmant que le butin appartient à Allāh et à Son Messager ﷺ, et appelant les croyants à la piété et à la concorde.",
      en: "Sa‘d ibn Abī Waqqās (may Allāh be pleased with him) narrated that after the Battle of Badr he picked up a sword from the spoils and asked the Messenger of Allāh ﷺ to grant it to him, but the Prophet ﷺ told him to return it where he found it. As disagreement arose over distributing the spoils, Allāh revealed this opening verse declaring that the spoils belong to Allāh and His Messenger ﷺ and calling believers to reconciliation.",
      es: "Sa‘d ibn Abī Waqqās relató que tras la batalla de Badr tomó una espada del botín y pidió al Profeta ﷺ que se la concediera, pero él le ordenó devolverla a su lugar. Al surgir desacuerdos sobre el reparto, Allah reveló esta primera aleya declarando que el botín pertenece a Allah y a Su Mensajero ﷺ e instando a la concordia.",
      ar: "عن سعد بن أبي وقاص رضي الله عنه أنه أصاب سيفًا يوم بدر فاستوهبه النبي ﷺ فأمره أن يرده من حيث أخذه، ولما اختلف الناس في الغنائم أنزل الله تعالى هذه الآية مبينًا أن الأنفال لله والرسول وآمرًا بتقوى الله وإصلاح ذات البين.",
      de: "Sa‘d ibn Abī Waqqās berichtete, dass er nach der Schlacht von Badr ein Schwert aus der Beute nahm und den Propheten ﷺ darum bat, doch dieser wies ihn an, es zurückzulegen. Als Uneinigkeit über die Verteilung entstand, offenbarte Allah diesen Vers, dass die Beute Allah und Seinem Gesandten ﷺ gehört, und rief zur Eintracht auf.",
      it: "Sa‘d ibn Abī Waqqās narrò che dopo la battaglia di Badr raccolse una spada dal bottino e chiese al Profeta ﷺ di concedergliela, ma egli gli ordinò di rimetterla al suo posto. Sorto un dissenso sulla spartizione, Allāh rivelò questo versetto affermando che il bottino appartiene ad Allāh e al Suo Messaggero ﷺ ed esortando alla concordia.",
      id: "Sa‘d bin Abi Waqqash meriwayatkan bahwa usai Perang Badar ia mengambil sebilah pedang dari rampasan perang lalu memintanya kepada Nabi ﷺ, namun beliau menyuruhnya mengembalikannya. Saat muncul perselisihan soal pembagian ghanimah, Allah menurunkan ayat ini yang menegaskan bahwa harta rampasan itu milik Allah dan Rasul-Nya serta memerintahkan persatuan.",
      ru: "Са‘д ибн Абу Ваккас передал, что после битвы при Бадре он взял меч из трофеев и попросил его у Пророка ﷺ, но тот велел положить его обратно. Когда возник спор о разделе трофеев, Аллах ниспослал этот аят, указав, что трофеи принадлежат Аллаху и Его Посланнику ﷺ, и призвав верующих к примирению."
    }
  },
  "8:9": {
    type: "sabab",
    versets: ["8:9", "8:10"],
    plage: "8:9–10",
    source: "Sahīh Muslim n°1763",
    degre: "Sahīh",
    texte: {
      fr: "‘Umar ibn Al-Khattāb (qu'Allāh l'agrée) rapporte qu'au jour de Badr, voyant les mille combattants de Quraysh face à ses trois cent dix-neuf Compagnons, le Messager d'Allāh ﷺ se tourna vers la Qiblah, leva les mains et implora intensément le secours de son Seigneur jusqu'à ce que son manteau glisse de ses épaules. Abū Bakr le remit sur ses épaules en l'apaisant, et Allāh fit aussitôt descendre ces versets annonçant le renfort de mille Anges se succédant.",
      en: "‘Umar ibn Al-Khattāb (may Allāh be pleased with him) narrated that on the Day of Badr, seeing the thousand fighters of Quraysh facing his three hundred and nineteen Companions, the Messenger of Allāh ﷺ faced the Qiblah, raised his hands, and supplicated earnestly until his cloak slipped from his shoulders. Abū Bakr comforted him, and Allāh immediately revealed these verses promising reinforcement with a thousand angels.",
      es: "‘Umar ibn Al-Khattāb relató que el día de Badr, al ver mil combatientes de Quraysh frente a sus trescientos diecinueve Compañeros, el Profeta ﷺ se orientó hacia la Qiblah y suplicó con tal fervor que su manto cayó de sus hombros. Abū Bakr lo reconfortó y Allah reveló de inmediato estas aleyas anunciando el auxilio de mil Ángeles.",
      ar: "عن عمر بن الخطاب رضي الله عنه أنه لما كان يوم بدر نظر النبي ﷺ إلى المشركين وهم ألف وأصحابه ثلاثمائة وتسعة عشر، فاستقبل القبلة ومدّ يديه يستغيث ربه حتى سقط رداؤه عن منكبيه، فالتزمه أبو بكر يواسيه، فأنزل الله هاتين الآيتين بالبشرى بإمداد ألف من الملائكة مردفين.",
      de: "‘Umar ibn Al-Khattāb berichtete, dass der Prophet ﷺ am Tag von Badr angesichts der tausend Kämpfer der Quraisch gegen seine dreihundertneunzehn Gefährten die Hände erhob und so innig betete, dass sein Umhang von den Schultern glitt. Abū Bakr tröstete ihn, und sogleich offenbarte Allah diese Verse über den Beistand von tausend Engeln.",
      it: "‘Umar ibn Al-Khattāb narrò che il giorno di Badr, vedendo mille combattenti di Quraysh di fronte ai suoi trecentodiciannove Compagni, il Profeta ﷺ si volse verso la Qiblah e supplicò con tale fervore che il mantello gli scivolò dalle spalle. Abū Bakr lo confortò e Allāh rivelò subito questi versetti sul rinforzo di mille Angeli.",
      id: "‘Umar bin Al-Khaththab meriwayatkan bahwa pada Perang Badar, melihat seribu pasukan Quraisy menghadapi tiga ratus sembilan belas sahabat, Nabi ﷺ menghadap kiblat dan berdoa sungguh-sungguh hingga selendangnya jatuh. Abu Bakar menenangkannya, lalu Allah langsung menurunkan ayat-ayat kabar gembira bantuan seribu malaikat.",
      ru: "‘Умар ибн аль-Хаттаб передал, что в день Бадра, увидев тысячу воинов курайшитов против трёхсот девятнадцати сподвижников, Пророк ﷺ обратился к кибле и взывал к Господу столь горячо, что накидка спала с его плеч. Абу Бакр успокоил его, и Аллах немедленно ниспослал эти аяты о подкреплении тысячью ангелов."
    }
  },
  "8:24": {
    type: "hadith",
    versets: ["8:24"],
    plage: "8:24",
    source: "Sahīh Al-Bukhārī n°4647",
    degre: "Sahīh",
    texte: {
      fr: "Abū Sa‘īd ibn Al-Mu‘allā rapporte qu'il était en prière dans la mosquée lorsque le Messager d'Allāh ﷺ l'appela ; il termina sa prière avant de venir vers lui. Le Prophète ﷺ lui demanda ce qui l'avait retenu et lui récita ce verset : « Ô vous qui croyez ! Répondez à Allāh et au Messager lorsqu'il vous appelle à ce qui vous donne la vraie vie », avant de lui enseigner que Sourate Al-Fātihah est la plus grande sourate du Coran.",
      en: "Abū Sa‘īd ibn Al-Mu‘allā narrated that he was praying in the mosque when the Messenger of Allāh ﷺ called him; he finished his prayer before coming over. The Prophet ﷺ asked what delayed him and recited this verse—'O you who believe, respond to Allāh and to the Messenger when he calls you to that which gives you life'—before teaching him that Sūrah Al-Fātihah is the greatest surah of the Qur'an.",
      es: "Abū Sa‘īd ibn Al-Mu‘allā relató que rezaba en la mezquita cuando el Profeta ﷺ lo llamó y acudió tras concluir la oración. El Profeta ﷺ le recitó esta aleya ordenando responder a Allah y al Mensajero cuando llama a lo que da vida, antes de enseñarle que Al-Fātihah es la mayor sura del Corán.",
      ar: "عن أبي سعيد بن المعلى رضي الله عنه أنه كان يصلي في المسجد فدعاه النبي ﷺ فلم يُجبه حتى فرغ من صلاته، فتلا عليه النبي ﷺ هذه الآية في وجوب الاستجابة لله وللرسول لما يحيي القلوب، ثم أخبره أن الفاتحة أعظم سورة في القرآن.",
      de: "Abū Sa‘īd ibn Al-Mu‘allā berichtete, dass der Prophet ﷺ ihn während seines Gebets in der Moschee rief und er erst nach dem Gebet kam. Der Prophet ﷺ rezitierte ihm diesen Vers über die sofortige Antwort auf Allah und Seinen Gesandten, bevor er ihn lehrte, dass Al-Fātihah die gewaltigste Sure des Korans ist.",
      it: "Abū Sa‘īd ibn Al-Mu‘allā narrò che stava pregando in moschea quando il Profeta ﷺ lo chiamò e vi si recò solo al termine della preghiera. Il Profeta ﷺ gli recitò questo versetto sulla prontezza nel rispondere ad Allāh e al Messaggero, prima di insegnargli che Al-Fātihah è la più grande sura del Corano.",
      id: "Abu Sa‘id bin Al-Mu‘alla meriwayatkan bahwa ia sedang shalat di masjid ketika Nabi ﷺ memanggilnya, lalu baru menghampiri setelah selesai shalat. Nabi ﷺ membacakan ayat perintah memenuhi seruan Allah dan Rasul ini sebelum mengajarkan bahwa Al-Fatihah adalah surah teragung dalam Al-Qur'an.",
      ru: "Абу Са‘ид ибн аль-Му‘алля передал, что он молился в мечети, когда его позвал Пророк ﷺ, и подошёл лишь завершив молитву. Пророк ﷺ прочёл ему этот аят о повиновении призыву Аллаха и Посланника к тому, что дарует жизнь, а затем сообщил, что аль-Фатиха — величайшая сура Корана."
    }
  },
  "8:32": {
    type: "sabab",
    versets: ["8:32", "8:33"],
    plage: "8:32–33",
    source: "Sahīh Al-Bukhārī n°4648 & Sahīh Muslim n°2796",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik (qu'Allāh l'agrée) rapporte qu'Abū Jahl déclara avec arrogance : « Ô Allāh, si ce Coran est vraiment la vérité venant de Toi, fais alors pleuvoir sur nous des pierres du ciel ou inflige-nous un châtiment douloureux ! » Allāh révéla alors ces deux versets précisant qu'Il ne les châtierait pas d'un anéantissement général tant que le Prophète ﷺ se trouvait parmi eux, ni tant qu'ils imploraient Son pardon.",
      en: "Anas ibn Mālik (may Allāh be pleased with him) narrated that Abū Jahl arrogantly said: 'O Allāh, if this Qur'an is truly the truth from You, then rain down stones upon us from the sky or bring us a painful punishment!' Allāh then revealed these verses stating He would not destroy them while the Prophet ﷺ was among them or while people sought forgiveness.",
      es: "Anas ibn Mālik relató que Abū Yahl exclamó con soberbia: «¡Oh Allah!, si esto es la verdad procedente de Ti, haz llover sobre nosotros piedras del cielo o envíanos un castigo doloroso». Entonces Allah reveló estas dos aleyas asegurando que no los castigaría mientras el Profeta ﷺ estuviera entre ellos ni mientras pidieran perdón.",
      ar: "عن أنس بن مالك رضي الله عنه أن أبا جهل قال متعنتًا: اللهم إن كان هذا هو الحق من عندك فأمطر علينا حجارة من السماء أو ائتنا بعذاب أليم، فأنزل الله هاتين الآيتين بيانًا أن الله لا يعذبهم عذاب استئصال ما دام النبي ﷺ فيهم وما داموا يستغفرون.",
      de: "Anas ibn Mālik berichtete, dass Abū Dschahl hochmütig sagte: „O Allah, wenn dies die Wahrheit von Dir ist, so lass Steine vom Himmel auf uns regnen!“ Daraufhin offenbarte Allah diese beiden Verse, dass Er sie nicht vernichten würde, solange der Prophet ﷺ unter ihnen weilt oder sie um Vergebung bitten.",
      it: "Anas ibn Mālik narrò che Abū Jahl disse con arroganza: «O Allāh, se questa è davvero la verità da parte Tua, fa' piovere su di noi pietre dal cielo!». Allāh rivelò allora questi due versetti affermando che non li avrebbe colpiti con un castigo sterminatore finché il Profeta ﷺ era tra loro né finché chiedevano perdono.",
      id: "Anas bin Malik meriwayatkan bahwa Abu Jahal berkata dengan sombong: “Ya Allah, jika Al-Qur'an ini benar dari sisi-Mu, hujanilah kami dengan batu dari langit!” Maka Allah menurunkan dua ayat ini yang menegaskan bahwa Dia tidak akan mengazab mereka selama Nabi ﷺ berada di tengah mereka dan selama mereka beristighfar.",
      ru: "Анас ибн Малик передал, что Абу Джахль высокомерно произнёс: «О Аллах, если это истина от Тебя, то пролей на нас дождь из камней с неба!» Тогда Аллах ниспослал эти два аята, сообщив, что не станет губить их, пока Пророк ﷺ находится среди них и пока люди просят о прощении."
    }
  },
  "8:65": {
    type: "sabab",
    versets: ["8:65", "8:66"],
    plage: "8:65–66",
    source: "Sahīh Al-Bukhārī n°4652, n°4653",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte que lorsque descendit le verset 65 prescrivant que vingt croyants endurants tiennent tête à deux cents adversaires (un rapport d'un contre dix), cette exigence pesa lourdement sur les musulmans. Allāh leur accorda aussitôt un allègement par miséricorde dans le verset 66, ramenant l'obligation de fermeté à un contre deux : cent croyants endurants face à deux cents.",
      en: "Ibn ‘Abbās (may Allāh be pleased with them) narrated that when verse 65 was revealed requiring twenty steadfast believers to stand firm against two hundred (a ten-to-one ratio), it weighed heavily upon the Muslims. Out of mercy, Allāh immediately lightened the obligation in verse 66 to a two-to-one ratio: one hundred steadfast believers against two hundred.",
      es: "Ibn ‘Abbās relató que al descender la aleya 65 exigiendo que veinte creyentes firmes resistieran a doscientos adversarios (proporción de uno contra diez), la carga resultó muy dura para los musulmanes; entonces Allah la aligeró por misericordia en la aleya 66 reduciéndola a uno contra dos.",
      ar: "عن ابن عباس رضي الله عنهما أنه لما نزلت الآية ٦٥ وفيها وجوب ثبات عشرين صابرًا أمام مائتين شقّ ذلك على المسلمين، فخفّف الله عنهم رحمةً بهم في الآية ٦٦ وجعل الواجب ثبات مائة صابرة أمام مائتين.",
      de: "Ibn ‘Abbās berichtete, dass Vers 65, der zwanzig standhafte Gläubige gegen zweihundert Gegner verpflichtete, schwer auf den Muslimen lastete. Aus Barmherzigkeit erleichterte Allah ihnen dies sogleich in Vers 66 auf ein Verhältnis von eins zu zwei.",
      it: "Ibn ‘Abbās narrò che la rivelazione del versetto 65, che richiedeva a venti credenti saldi di resistere a duecento avversari, risultò molto gravosa per i musulmani; per misericordia Allāh alleggerì subito l'obbligo nel versetto 66 riducendo il rapporto a uno contro due.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa ketika ayat 65 turun yang mewajibkan dua puluh orang sabar menghadapi dua ratus musuh, hal itu terasa berat bagi kaum muslimin. Maka Allah segera memberi keringanan pada ayat 66 menjadi seratus orang sabar menghadapi dua ratus.",
      ru: "Ибн ‘Аббас передал, что после ниспослания 65-го аята, обязывавшего двадцать стойких верующих противостоять двумстам, это оказалось тяжелым для мусульман. По Своей милости Аллах сразу облегчил предписание в 66-м аяте, сократив соотношение до одного против двоих."
    }
  },
  "8:67": {
    type: "sabab",
    versets: ["8:67", "8:68", "8:69"],
    plage: "8:67–69",
    source: "Sahīh Muslim n°1763",
    degre: "Sahīh",
    texte: {
      fr: "‘Umar ibn Al-Khattāb rapporte qu'après la victoire de Badr, le Prophète ﷺ consulta Abū Bakr et ‘Umar au sujet des captifs. Abū Bakr conseilla de les libérer contre rançon dans l'espoir qu'Allāh les guide un jour, tandis que ‘Umar proposa une sanction sévère. Le Prophète ﷺ suivit l'avis clément d'Abū Bakr ; le lendemain, ‘Umar le trouva en pleurs avec Abū Bakr suite à la révélation du reproche du verset 67, avant qu'Allāh ne rende officiellement licites le butin et la rançon au verset 69.",
      en: "‘Umar ibn Al-Khattāb narrated that after Badr the Prophet ﷺ consulted Abū Bakr and ‘Umar regarding the captives. Abū Bakr advised accepting ransom hoping Allāh might later guide them, while ‘Umar urged strict punishment. The Prophet ﷺ inclined toward Abū Bakr's clemency; the next day ‘Umar found them weeping after verse 67 was revealed, before verse 69 formally made the spoils and ransom lawful.",
      es: "‘Umar ibn Al-Khattāb relató que tras Badr el Profeta ﷺ consultó a Abū Bakr y ‘Umar sobre los prisioneros. Siguió el consejo clemente de Abū Bakr de aceptar rescate, y al día siguiente ‘Umar los halló llorando tras revelarse la advertencia de la aleya 67, antes de que la aleya 69 declarara lícitos el botín y el rescate.",
      ar: "عن عمر بن الخطاب رضي الله عنه أن النبي ﷺ استشاره وأبا بكر في أسرى بدر، فأشار أبو بكر بأخذ الفداء لعل الله يهديهم وأشار عمر بقتلهم، فمال النبي ﷺ إلى رأي أبي بكر؛ وفي الغد وجدهما عمر يبكيان لنزول العتاب في الآية ٦٧، ثم أحلّ الله لهم الغنيمة والفداء في الآية ٦٩.",
      de: "‘Umar ibn Al-Khattāb berichtete, dass der Prophet ﷺ ihn und Abū Bakr nach Badr wegen der Gefangenen um Rat fragte und Abū Bakrs mildem Rat des Lösegelds folgte. Am nächsten Tag fand ‘Umar beide nach der Offenbarung von Vers 67 weinend vor, ehe Vers 69 Beute und Lösegeld ausdrücklich für erlaubt erklärte.",
      it: "‘Umar ibn Al-Khattāb narrò che dopo Badr il Profeta ﷺ consultò Abū Bakr e ‘Umar sui prigionieri, seguendo il consiglio clemente di Abū Bakr di accettare un riscatto. L'indomani ‘Umar li trovò in lacrime dopo la rivelazione del versetto 67, prima che il versetto 69 dichiarasse leciti il bottino e il riscatto.",
      id: "‘Umar bin Al-Khaththab meriwayatkan bahwa seusai Perang Badar, Nabi ﷺ bermusyawarah dengannya dan Abu Bakar mengenai tawanan lalu memilih pendapat Abu Bakar untuk menerima tebusan. Keesokan harinya ‘Umar mendapati keduanya menangis karena turunnya ayat 67, sebelum Allah menghalalkan rampasan perang pada ayat 69.",
      ru: "‘Умар ибн аль-Хаттаб передал, что после Бадра Пророк ﷺ посоветовался с ним и Абу Бакром о пленных и принял милосердный совет Абу Бакра взять выкуп. На следующий день ‘Умар застал обоих плачущими после ниспослания 67-го аята, а затем в 69-м аяте Аллах официально дозволил трофеи и выкуп."
    }
  },
  "9:1": {
    type: "sabab",
    versets: ["9:1", "9:2", "9:3"],
    plage: "9:1–3",
    source: "Sahīh Al-Bukhārī n°4654, n°4655 & Sahīh Muslim n°1347",
    degre: "Sahīh",
    texte: {
      fr: "Al-Barā' ibn ‘Āzib précise que la Sourate Barā'ah (At-Tawbah) est la toute dernière sourate complète à avoir été révélée. Abū Hurayrah rapporte qu'en l'an 9 de l'Hégire, lors du Pèlerinage dirigé par Abū Bakr, le Prophète ﷺ envoya ‘Alī ibn Abī Tālib proclamer ces versets d'ouverture le Jour du Sacrifice à Minā, annonçant solennellement la fin des pactes non limités avec les polythéistes, l'interdiction pour eux d'accéder à la Ka‘bah après cette année et l'abolition définitive du Tawāf accompli nu.",
      en: "Al-Barā' ibn ‘Āzib noted that Sūrah Barā'ah (At-Tawbah) was the very last complete surah revealed. Abū Hurayrah narrated that during the Hajj of 9 AH led by Abū Bakr, the Prophet ﷺ sent ‘Alī ibn Abī Tālib to proclaim these opening verses on the Day of Sacrifice in Minā, announcing that no polytheist would perform Hajj after that year and permanently abolishing naked Tawāf.",
      es: "Al-Barā' señaló que At-Tawbah fue la última sura completa revelada. Abū Hurayrah relató que en el año 9 de la Hégira, durante la Peregrinación dirigida por Abū Bakr, ‘Alī proclamó estas primeras aleyas en Minā anunciando que ningún politeísta peregrinaría tras ese año y aboliendo definitivamente la circunvalación sin ropa.",
      ar: "ذكر البراء بن عازب رضي الله عنه أن سورة براءة (التوبة) هي آخر سورة نزلت كاملة؛ وروى أبو هريرة أن أبا بكر بعثه مع علي بن أبي طالب في حجة السنة التاسعة ليؤذّنوا بهذه الآيات يوم النحر في منى بألا يحج بعد العام مشرك ولا يطوف بالبيت عريان.",
      de: "Al-Barā' berichtete, dass At-Tawbah die letzte vollständig offenbarte Sure war. Abū Hurayrah überlieferte, dass ‘Alī im Jahr 9 n. H. während der von Abū Bakr geleiteten Pilgerfahrt diese Eingangsverse am Opfertag in Minā verkündete und den nackten Umgang um die Ka‘bah endgültig abschaffte.",
      it: "Al-Barā' precisò che At-Tawbah fu l'ultima sura completa rivelata. Abū Hurayrah narrò che nell'anno 9 dell'Egira, durante il Pellegrinaggio guidato da Abū Bakr, ‘Alī proclamò questi versetti a Minā annunciando la fine dei vecchi patti con i politeisti e l'abolizione definitiva del Tawāf senza vesti.",
      id: "Al-Bara' menyebutkan bahwa At-Taubah adalah surah utuh terakhir yang turun. Abu Hurairah meriwayatkan bahwa pada musim haji tahun 9 H yang dipimpin Abu Bakar, ‘Ali mengumumkan ayat-ayat pembuka ini di Mina bahwa setelah tahun itu kaum musyrik tidak lagi berhaji dan thawaf tanpa busana dihapuskan selamanya.",
      ru: "Аль-Бара отметил, что Ат-Тауба — последняя полностью ниспосланная сура. Абу Хурайра передал, что в 9 году хиджры во время хаджа под руководством Абу Бакра ‘Али возвестил эти аяты в Мине, объявив, что после этого года многобожники не будут совершать хадж, а обход Каабы нагим отменяется навсегда."
    }
  },
  "9:25": {
    type: "sabab",
    versets: ["9:25", "9:26"],
    plage: "9:25–26",
    source: "Sahīh Al-Bukhārī n°4315 & Sahīh Muslim n°1775, n°1776",
    degre: "Sahīh",
    texte: {
      fr: "Al-Barā' ibn ‘Āzib et Al-‘Abbās rapportent qu'au début de la bataille de Hunayn (en l'an 8 de l'Hégire), certains musulmans s'émerveillèrent de leur grand nombre (douze mille hommes). Pris par surprise dans une embuscade d'archers, les rangs se dispersèrent ; seul le Messager d'Allāh ﷺ resta inébranlable sur sa mule blanche en proclamant : « Je suis le Prophète, sans nul mensonge ! » Al-‘Abbās rappela les Compagnons de sa voix puissante, Allāh fit descendre Sa sérénité (Sakīnah) sur eux et transforma la déroute en victoire éclatante.",
      en: "Al-Barā' ibn ‘Āzib and Al-‘Abbās narrated that at the Battle of Hunayn (8 AH), after some felt confident in their large numbers, an ambush scattered the ranks. The Messenger of Allāh ﷺ alone held completely firm on his white mule declaring: 'I am the Prophet, no lie!' Al-‘Abbās called the Companions back, and Allāh sent down His tranquility (Sakīnah) and granted a decisive victory.",
      es: "Al-Barā' y Al-‘Abbās relataron que en Hunayn (año 8 H.), tras sorprender una emboscada a las filas pese a su gran número, el Profeta ﷺ permaneció firme sobre su mula blanca proclamando su misión profética. Al-‘Abbās reunió a los Compañeros, Allah hizo descender Su serenidad (Sakīnah) y les concedió la victoria.",
      ar: "عن البراء بن عازب والعباس رضي الله عنهما أنه يوم حنين (سنة ٨ هـ) لما أُعجب بعض الناس بكثرتهم ووقع الكمين وتفرّقت الصفوف، ثبت النبي ﷺ وحده على بغلته البيضاء يقول: «أنا النبي لا كذب»، ونادى العباس في الصحابة فكرّوا راجعين وأنزل الله سكينته ونصرهم.",
      de: "Al-Barā' und Al-‘Abbās berichteten, dass die Reihen bei Hunayn (8 n. H.) trotz ihrer großen Zahl durch einen Hinterhalt auseinanderbrachen, während der Prophet ﷺ unerschütterlich standhielt. Al-‘Abbās rief die Gefährten zurück, woraufhin Allah Seine Ruhe (Sakīnah) herabsandte und ihnen den Sieg verlieh.",
      it: "Al-Barā' e Al-‘Abbās narrarono che a Hunayn (anno 8 E.), dopo un'imboscata che disperse le file nonostante il grande numero, solo il Profeta ﷺ rimase saldo proclamando la propria missione. Al-‘Abbās richiamò i Compagni e Allāh fece scendere la Sua serenità (Sakīnah) concedendo loro la vittoria.",
      id: "Al-Bara' dan Al-‘Abbas meriwayatkan bahwa pada Perang Hunain (8 H), ketika barisan sempat kocar-kacir akibat sergapan meski jumlah pasukan besar, Nabi ﷺ tetap teguh berdiri. Al-‘Abbas memanggil para sahabat kembali, lalu Allah menurunkan ketenangan (Sakinah) dan memenangkan mereka.",
      ru: "Аль-Бара и аль-‘Аббас передали, что при Хунайне (8 г. хиджры), когда засада рассеяла ряды несмотря на многочисленность войска, Пророк ﷺ остался непоколебим на своём белом муле. Аль-‘Аббас громко созвал сподвижников обратно, Аллах ниспослал спокойствие (сакину) и даровал победу."
    }
  },
  "9:34": {
    type: "hadith",
    versets: ["9:34", "9:35"],
    plage: "9:34–35",
    source: "Sahīh Al-Bukhārī n°1402, n°4660 & Sahīh Muslim n°987",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah (et Abū Dharr dans le Kitāb at-Tafsīr d'Al-Bukhārī) rapporte que le Messager d'Allāh ﷺ expliqua cette terrible menace visant quiconque thésaurise l'or et l'argent sans s'acquitter de l'aumône obligatoire (Zakāt) : au Jour de la Résurrection, ses richesses seront transformées en plaques incandescentes dans le feu de la Géhenne pour lui cautériser le front, les flancs et le dos, en guise de rétribution pour ce qu'il amassait égoïstement.",
      en: "Abū Hurayrah (and Abū Dharr in Al-Bukhārī) narrated that the Messenger of Allāh ﷺ explained this stern warning against hoarding gold and silver without paying Zakāt: on the Day of Resurrection, that wealth will be heated into blazing plates in Hellfire to brand the hoarder's forehead, flanks, and back as a consequence of withholding the rights of the needy.",
      es: "Abū Hurayrah y Abū Dharr relataron que el Profeta ﷺ explicó esta severa advertencia contra atesorar oro y plata sin pagar el Zakāt: el Día de la Resurrección esa riqueza se calentará en el fuego infernal en forma de placas ardientes con las que serán marcados su frente, costados y espalda.",
      ar: "عن أبي هريرة وأبي ذر رضي الله عنهما أن النبي ﷺ بيّن هذا الوعيد الشديد لمن يكنز الذهب والفضة ولا يؤدي زكاتهما؛ إذ تُحمى يوم القيامة صفائح في نار جهنم فيُكوى بها جبينه وجنبه وظهره جزاءً لما كنز ومنع حق الفقراء.",
      de: "Abū Hurayrah und Abū Dharr berichteten, dass der Prophet ﷺ diese ernste Warnung vor dem Horten von Gold und Silber ohne Entrichtung der Zakāt erläuterte: Am Tag der Auferstehung wird dieses Vermögen im Höllenfeuer zu glühenden Platten erhitzt, mit denen Stirn, Seiten und Rücken gezeichnet werden.",
      it: "Abū Hurayrah e Abū Dharr narrarono che il Profeta ﷺ spiegò questa severa minaccia contro chi accumula oro e argento senza versare la Zakāt: nel Giorno della Resurrezione tali ricchezze saranno arroventate in lastre nel fuoco per marchiarne fronte, fianchi e schiena.",
      id: "Abu Hurairah dan Abu Dzar meriwayatkan penjelasan Nabi ﷺ atas ancaman keras bagi penimbun emas dan perak yang enggan menunaikan zakat: pada Hari Kiamat harta itu dipanaskan menjadi lempengan api neraka untuk menyetrika dahi, lambung, dan punggung pemiliknya.",
      ru: "Абу Хурайра и Абу Зарр передали разъяснение Пророка ﷺ об этом суровом предостережении тем, кто копит золото и серебро, не выплачивая закят: в День Воскресения эти богатства раскалят в огне Геенны в виде пластин и будут прижигать ими их лбы, бока и спины."
    }
  },
  "9:40": {
    type: "sabab",
    versets: ["9:40"],
    plage: "9:40",
    source: "Sahīh Al-Bukhārī n°3653, n°4663 & Sahīh Muslim n°2381",
    degre: "Sahīh",
    texte: {
      fr: "Abū Bakr As-Siddīq (qu'Allāh l'agrée) raconte que lorsqu'il était réfugié avec le Prophète ﷺ dans la grotte de Thawr durant l'Hégire vers Médine, les poursuivants de Quraysh arrivèrent juste au-dessus de l'entrée. Abū Bakr murmura : « Ô Messager d'Allāh, si l'un d'eux baissait les yeux vers ses pieds, il nous verrait ! » Le Prophète ﷺ le rassura aussitôt : « Que penses-tu, ô Abū Bakr, de deux personnes dont Allāh est le Troisième ? Ne t'afflige pas, car Allāh est avec nous ! »",
      en: "Abū Bakr As-Siddīq (may Allāh be pleased with him) narrated that while sheltering with the Prophet ﷺ in the Cave of Thawr during the Hijrah, Quraysh pursuers stood right above the entrance. Abū Bakr whispered: 'If one of them looks down at his feet, he will see us!' The Prophet ﷺ calmly replied: 'What do you think, O Abū Bakr, of two with whom Allāh is the third? Do not grieve; indeed Allāh is with us.'",
      es: "Abū Bakr As-Siddīq relató que refugiados en la cueva de Thawr durante la Hégira, los perseguidores llegaron hasta la entrada y él susurró que si alguno miraba hacia sus pies los vería. El Profeta ﷺ lo tranquilizó: «¿Qué piensas, Abū Bakr, de dos cuyo tercero es Allah? No te apenes, pues Allah está con nosotros».",
      ar: "عن أبي بكر الصديق رضي الله عنه أنه لما كان مع النبي ﷺ في غار ثور أثناء الهجرة ووصل المشركون إلى باب الغار قال: لو أن أحدهم نظر تحت قدميه لأبصرنا! فطمأنه النبي ﷺ قائلًا: «ما ظنك يا أبا بكر باثنين الله ثالثهما؟ لا تحزن إن الله معنا».",
      de: "Abū Bakr As-Siddīq berichtete, dass er während der Hidschra mit dem Propheten ﷺ in der Höhle Thawr Zuflucht suchte, als Verfolger direkt am Eingang standen. Auf seine Sorge antwortete der Prophet ﷺ ruhig: „Was denkst du, o Abū Bakr, von zweien, deren Dritter Allah ist? Sei nicht betrübt, denn Allah ist mit uns.“",
      it: "Abū Bakr As-Siddīq narrò che mentre si rifugiavano nella grotta di Thawr durante l'Egira, gli inseguitori giunsero fino all'ingresso e temette di essere visto. Il Profeta ﷺ lo rassicurò: «Che pensi, o Abū Bakr, di due persone di cui Allāh è il Terzo? Non rattristarti, perché Allāh è con noi».",
      id: "Abu Bakar Ash-Shiddiq meriwayatkan bahwa saat berlindung bersama Nabi ﷺ di Gua Tsur ketika hijrah, para pengejar Quraisy berdiri tepat di mulut gua. Nabi ﷺ menenangkannya: “Apa dugaanmu wahai Abu Bakar tentang dua orang yang ketiganya adalah Allah? Jangan bersedih, sesungguhnya Allah bersama kita.”",
      ru: "Абу Бакр ас-Сиддик рассказал, что во время хиджры, когда они с Пророком ﷺ укрывались в пещере Саур, преследователи подошли к самому входу. На его тревогу Пророк ﷺ спокойно ответил: «Что ты думаешь, о Абу Бакр, о двоих, третьим с которыми является Аллах? Не печалься, ведь Аллах с нами»."
    }
  },
  "9:79": {
    type: "sabab",
    versets: ["9:79"],
    plage: "9:79",
    source: "Sahīh Al-Bukhārī n°1415, n°4668 & Sahīh Muslim n°1018",
    degre: "Sahīh",
    texte: {
      fr: "Abū Mas‘ūd Al-Ansārī (qu'Allāh l'agrée) rapporte que lorsque le verset incitant à l'aumône (pour préparer l'expédition de Tabūk) fut révélé, des Compagnons modestes travaillèrent comme portefaix toute la journée pour offrir une simple mesure de dattes, tandis que des Compagnons aisés comme ‘Abd ar-Rahmān ibn ‘Awf offrirent des sommes considérables. Les hypocrites se moquèrent des deux — accusant les riches d'ostentation et raillant la modeste offrande des pauvres — et Allāh révéla ce verset pour les dénoncer.",
      en: "Abū Mas‘ūd Al-Ansārī narrated that when charity was encouraged for Tabūk, poor Companions carried loads on their backs to donate a single measure of dates while wealthy Companions gave generously. Hypocrites mocked both—accusing the wealthy of showing off and belittling the poor's modest gift—prompting the revelation of this verse condemning them.",
      es: "Abū Mas‘ūd Al-Ansārī relató que al llamarse a la caridad para Tabūk, Compañeros pobres trabajaron como cargadores para donar un puñado de dátiles mientras otros aportaron grandes sumas. Los hipócritas se burlaron de ambos y Allah reveló esta aleya reprobándolos.",
      ar: "عن أبي مسعود الأنصاري رضي الله عنه أنه لما أُمر بالصدقة (في غزوة تبوك) تصدق بعض الأغنياء بمال كثير وحمل بعض الفقراء على ظهورهم ليتصدقوا بمدٍّ من تمر، فلمز المنافقون الفريقين جميعًا، فأنزل الله هذه الآية فاضحًا سخرية المنافقين.",
      de: "Abū Mas‘ūd Al-Ansārī berichtete, dass beim Spendenaufruf für Tabūk arme Gefährten schwer schufteten, um eine Handvoll Datteln zu geben, während Wohlhabende reichlich spendeten. Die Heuchler verspotteten beide Seiten, woraufhin Allah diesen Vers gegen sie offenbarte.",
      it: "Abū Mas‘ūd Al-Ansārī narrò che all'invito alla carità per Tabūk i Compagni poveri lavorarono come facchini per donare una piccola misura di datteri mentre i benestanti donarono generosamente. Gli ipocriti derisero entrambi e Allāh rivelò questo versetto per smascherarli.",
      id: "Abu Mas‘ud Al-Anshari meriwayatkan bahwa saat anjuran bersedekah untuk Perang Tabuk turun, sahabat miskin bekerja memanggul barang demi menyumbang secupak kurma sedangkan yang kaya bersedekah besar. Kaum munafik mencemooh keduanya hingga turunlah ayat ini.",
      ru: "Абу Мас‘уд аль-Ансари передал, что при сборе пожертвований на поход Табук бедные сподвижники работали носильщиками ради горсти фиников, а состоятельные жертвовали щедро. Лицемеры высмеяли и тех и других, и Аллах ниспослал этот аят в их обличение."
    }
  },
  "9:84": {
    type: "sabab",
    versets: ["9:80", "9:84"],
    plage: "9:80 & 9:84",
    source: "Sahīh Al-Bukhārī n°1269, n°4670 & Sahīh Muslim n°2774",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn ‘Umar (qu'Allāh les agrée) rapporte qu'à la mort du chef des hypocrites ‘Abdullāh ibn Ubayy ibn Salūl, son fils croyant demanda au Prophète ﷺ de lui donner sa tunique comme linceul et de prier sur lui. Alors que le Prophète ﷺ se levait pour la prière funéraire — rappelant par miséricorde la formulation du verset 80 — ‘Umar lui rappela les méfaits d'Ibn Ubayy. Peu après la prière, Allāh révéla le verset 84 interdisant définitivement au Prophète ﷺ de prier sur tout hypocrite mort dans la mécréance ou de se tenir devant sa tombe.",
      en: "‘Abdullāh ibn ‘Umar narrated that when the hypocrite leader ‘Abdullāh ibn Ubayy died, his believing son requested the Prophet's ﷺ shirt as a shroud and asked him to lead the funeral prayer. After the Prophet ﷺ prayed over him—noting the phrasing of verse 80 despite ‘Umar's concern—Allāh revealed verse 84 permanently forbidding him from ever praying over a hypocrite or standing at their grave.",
      es: "‘Abdullāh ibn ‘Umar relató que al fallecer el jefe de los hipócritas ‘Abdullāh ibn Ubayy, su hijo creyente pidió al Profeta ﷺ que rezara la oración fúnebre por él. Tras realizarla pese a la inquietud de ‘Umar (aludiendo a la aleya 80), Allah reveló la aleya 84 prohibiendo definitivamente rezar por los hipócritas fallecidos en la incredulidad.",
      ar: "عن عبد الله بن عمر رضي الله عنهما أنه لما تُوفي رأس المنافقين عبد الله بن أُبيّ جاء ابنه المؤمن فطلب من النبي ﷺ الصلاة عليه، فصلى عليه النبي ﷺ رغم تذكير عمر له بحاله، ثم لم يلبث أن أنزل الله الآية ٨٤ ناهيًا نبيه ﷺ أبدًا عن الصلاة على أي منافق أو القيام على قبره.",
      de: "‘Abdullāh ibn ‘Umar berichtete, dass der Prophet ﷺ auf Bitten des gläubigen Sohnes des Heuchlerführers ‘Abdullāh ibn Ubayy trotz ‘Umars Einwand das Totengebet verrichtete (mit Verweis auf Vers 80). Kurz darauf offenbarte Allah Vers 84 und untersagte endgültig das Totengebet für Heuchler.",
      it: "‘Abdullāh ibn ‘Umar narrò che alla morte del capo degli ipocriti ‘Abdullāh ibn Ubayy, suo figlio credente chiese al Profeta ﷺ di guidare la preghiera funebre. Dopo che il Profeta ﷺ la compì richiamando il versetto 80, Allāh rivelò il versetto 84 vietando per sempre di pregare sui defunti ipocriti.",
      id: "‘Abdullah bin ‘Umar meriwayatkan bahwa ketika pemimpin munafik ‘Abdullah bin Ubay wafat, putranya yang beriman memohon Nabi ﷺ menyalatinya. Setelah Nabi ﷺ menyalatinya meski ‘Umar sempat mengingatkan (merujuk ayat 80), Allah menurunkan ayat 84 yang melarang selamanya menyalati orang munafik.",
      ru: "‘Абдуллах ибн ‘Умар передал, что после смерти предводителя лицемеров ‘Абдуллаха ибн Убайя его верующий сын попросил Пророка ﷺ совершить заупокойную молитву. Пророк ﷺ совершил её, сославшись на формулировку 80-го аята, но вскоре Аллах ниспослал 84-й аят, навсегда запретив молиться за умерших лицемеров."
    }
  },
  "9:113": {
    type: "sabab",
    versets: ["9:113"],
    plage: "9:113",
    source: "Sahīh Al-Bukhārī n°4675, n°4772 & Sahīh Muslim n°24",
    degre: "Sahīh",
    texte: {
      fr: "Sa‘īd ibn Al-Musayyib rapporte d'après son père que lorsque son oncle Abū Tālib fut à l'agonie, le Messager d'Allāh ﷺ le supplia jusqu'au dernier souffle de prononcer la parole d'unicité (« Lā ilāha illā Allāh »), mais Abū Tālib mourut sur la religion de ses ancêtres. Le Prophète ﷺ dit alors avec peine : « Par Allāh, je ne cesserai de demander pardon pour toi tant que cela ne m'aura pas été interdit ! » Allāh révéla alors ce verset interdisant aux croyants d'implorer le pardon pour ceux qui meurent dans le polythéisme, même s'ils sont de proches parents.",
      en: "Sa‘īd ibn Al-Musayyib narrated from his father that when Abū Tālib was on his deathbed, the Messenger of Allāh ﷺ earnestly urged him to declare the testimony of faith, yet he died upon the religion of his forefathers. The Prophet ﷺ said: 'I will keep asking forgiveness for you unless I am forbidden.' Allāh then revealed this verse forbidding seeking forgiveness for those who die in polytheism, even close relatives.",
      es: "Sa‘īd ibn Al-Musayyib relató de su padre que al agonizar Abū Tālib, el Profeta ﷺ le suplicó pronunciar el testimonio de fe, pero falleció en la religión de sus antepasados. Al decir el Profeta ﷺ que pediría perdón por él mientras no se le prohibiera, Allah reveló esta aleya prohibiendo pedir perdón por quienes mueren en el politeísmo.",
      ar: "عن سعيد بن المسيب عن أبيه أنه لما حضرت أبا طالب الوفاة دعاه النبي ﷺ إلى كلمة التوحيد فأبى ومات على ملة عبد المطلب، فقال النبي ﷺ: «لأستغفرن لك ما لم أُنه عنك»، فأنزل الله هذه الآية ناهيًا عن الاستغفار لمن مات على الشرك ولو كان من أولي القربى.",
      de: "Sa‘īd ibn Al-Musayyib berichtete von seinem Vater, dass der Prophet ﷺ seinen sterbenden Onkel Abū Tālib inständig zum Glaubensbekenntnis aufrief, dieser jedoch im Glauben seiner Vorväter starb. Als der Prophet ﷺ versprach, um Vergebung für ihn zu bitten, solange es nicht verboten werde, offenbarte Allah diesen Vers.",
      it: "Sa‘īd ibn Al-Musayyib narrò dal padre che sul letto di morte di Abū Tālib il Profeta ﷺ lo esortò a pronunciare la testimonianza di fede, ma egli morì nella religione degli avi. Quando il Profeta ﷺ disse che avrebbe chiesto perdono per lui finché non gli fosse stato vietato, Allāh rivelò questo versetto.",
      id: "Sa‘id bin Al-Musayyib meriwayatkan dari ayahnya bahwa saat Abu Thalib menjelang wafat, Nabi ﷺ terus membujuknya mengucapkan kalimat tauhid namun ia wafat di atas agama leluhurnya. Ketika Nabi ﷺ berniat memohonkan ampun selama belum dilarang, Allah menurunkan ayat larangan ini.",
      ru: "Са‘ид ибн аль-Мусаййиб передал от своего отца, что у смертного одра Абу Талиба Пророк ﷺ умолял его произнести свидетельство единобожия, но тот умер на вере предков. Когда Пророк ﷺ сказал, что будет просить за него прощения, пока ему не запретят, Аллах ниспослал этот аят."
    }
  },
  "9:117": {
    type: "sabab",
    versets: ["9:117", "9:118", "9:119"],
    plage: "9:117–119",
    source: "Sahīh Al-Bukhārī n°4418, n°4676 & Sahīh Muslim n°2769",
    degre: "Sahīh",
    texte: {
      fr: "Ka‘b ibn Mālik (qu'Allāh l'agrée) raconte que lui-même ainsi que Murārah ibn Ar-Rabī‘ et Hilāl ibn Umayyah restèrent à Médine lors de la difficile expédition de Tabūk sans excuse valable. Contrairement aux hypocrites qui inventèrent des mensonges, tous trois avouèrent franchement leur tort au Prophète ﷺ. Ils subirent une mise à l'écart éprouvante de cinquante jours jusqu'à ce que la terre leur semble étroite malgré son immensité, puis à l'aube du cinquantième jour Allāh révéla ces versets annonçant Son pardon total envers eux et enjoignant d'être toujours avec les véridiques.",
      en: "Ka‘b ibn Mālik narrated that he, Murārah ibn Ar-Rabī‘, and Hilāl ibn Umayyah stayed behind from the Expedition of Tabūk without excuse. Unlike the hypocrites who fabricated excuses, all three told the Prophet ﷺ the complete truth and endured fifty agonizing days of social boycott until the vast earth felt narrow to them—before Allāh revealed these verses announcing their complete forgiveness and commanding believers to be with the truthful.",
      es: "Ka‘b ibn Mālik relató que él, Murārah y Hilāl se rezagaron de la expedición de Tabūk sin excusa válida, pero a diferencia de los hipócritas dijeron toda la verdad al Profeta ﷺ. Soportaron cincuenta días de aislamiento hasta que la tierra les pareció estrecha, y al amanecer del día cincuenta Allah reveló estas aleyas anunciando su perdón completo.",
      ar: "عن كعب بن مالك رضي الله عنه أنه تخلّف هو ومرارة بن الربيع وهلال بن أمية عن غزوة تبوك بغير عذر، فصدقوا النبي ﷺ ولم يعتذروا بالكذب كالمنافقين، فهجرهم المسلمون خمسين ليلة حتى ضاقت عليهم الأرض بما رحبت، ثم أنزل الله فجر الليلة الخمسين هذه الآيات بقبول توبتهم والأمر بالصدق.",
      de: "Ka‘b ibn Mālik berichtete, dass er, Murārah und Hilāl ohne Entschuldigung vom Feldzug nach Tabūk zurückblieben, dem Propheten ﷺ jedoch anders als die Heuchler die volle Wahrheit sagten. Nach fünfzig schmerzhaften Tagen der Meidung offenbarte Allah im Morgengrauen diese Verse ihrer vollständigen Vergebung.",
      it: "Ka‘b ibn Mālik narrò che lui, Murārah e Hilāl rimasero indietro dalla spedizione di Tabūk senza scusa, ma a differenza degli ipocriti dissero la piena verità al Profeta ﷺ. Sopportarono cinquanta giorni di isolamento finché la terra parve loro angusta, poi all'alba del cinquantesimo giorno Allāh rivelò questi versetti del loro perdono.",
      id: "Ka‘b bin Malik meriwayatkan bahwa ia bersama Murarah dan Hilal tertinggal dari Perang Tabuk tanpa uzur, namun mereka berkata jujur kepada Nabi ﷺ tidak seperti kaum munafik. Setelah menjalani lima puluh hari pengucilan yang berat, pada fajar hari kelima puluh Allah menurunkan ayat-ayat penerimaan tobat mereka.",
      ru: "Ка‘б ибн Малик рассказал, что он, Мурара и Хиляль без уважительной причины отстали от похода на Табук, но, в отличие от лицемеров, сказали Пророку ﷺ чистую правду. Выдержав пятьдесят мучительных дней бойкота, на рассвете пятидесятого дня они получили радостную весть об этих аятах полного прощения."
    }
  },
  "9:128": {
    type: "hadith",
    versets: ["9:128", "9:129"],
    plage: "9:128–129",
    source: "Sahīh Al-Bukhārī n°4679, n°4986",
    degre: "Sahīh",
    texte: {
      fr: "Zayd ibn Thābit (qu'Allāh l'agrée) rapporte que lorsqu'il fut chargé par Abū Bakr As-Siddīq de rassembler tous les feuillets écrits du Coran en un recueil unique (en confrontant l'écrit à la mémorisation des Compagnons), il retrouva la trace écrite de ces deux derniers versets de la Sourate At-Tawbah uniquement auprès d'Abū Khuzaymah Al-Ansārī, qu'il replaça à la fin de la sourate conformément à la récitation établie du Prophète ﷺ.",
      en: "Zayd ibn Thābit (may Allāh be pleased with him) narrated that when Abū Bakr As-Siddīq commissioned him to compile the written manuscripts of the Qur'an into a single volume (cross-checked with mass memorization), he found the written copy of these last two verses of Sūrah At-Tawbah with Abū Khuzaymah Al-Ansārī and placed them at the end of the surah.",
      es: "Zayd ibn Thābit relató que cuando Abū Bakr le encargó recopilar por escrito el Corán en un único códice (verificado con la memorización de los Compañeros), halló la copia escrita de estas dos últimas aleyas de At-Tawbah únicamente junto a Abū Khuzaymah Al-Ansārī y las ubicó al final de la sura.",
      ar: "عن زيد بن ثابت رضي الله عنه أنه لما كلّفه أبو بكر الصديق بجمع القرآن المكتوب ومطابقته على حفظ الصحابة، وجد آخر آيتين من سورة التوبة مكتوبتين عند أبي خزيمة الأنصاري فألحقهما في موضعهما من السورة.",
      de: "Zayd ibn Thābit berichtete, dass er bei der von Abū Bakr beauftragten schriftlichen Zusammenstellung des Korans die Niederschrift dieser letzten beiden Verse von Sure At-Tawbah bei Abū Khuzaymah Al-Ansārī fand und sie an ihrem angestammten Platz am Ende der Sure einfügte.",
      it: "Zayd ibn Thābit narrò che quando Abū Bakr lo incaricò di riunire in un unico codice i fogli scritti del Corano (verificati con la memorizzazione dei Compagni), trovò la trascrizione di questi ultimi due versetti di At-Tawbah presso Abū Khuzaymah Al-Ansārī e li collocò alla fine della sura.",
      id: "Zaid bin Tsabit meriwayatkan bahwa saat ditugaskan Abu Bakar mengumpulkan lembaran tertulis Al-Qur'an, ia menemukan catatan tertulis dua ayat terakhir Surah At-Taubah ini pada Abu Khuzaimah Al-Anshari lalu menempatkannya di akhir surah sesuai hafalan para sahabat.",
      ru: "Зайд ибн Сабит передал, что когда Абу Бакр поручил ему собрать все письменные записи Корана в единый свиток (сверяя их с памятью сподвижников), письменную запись этих двух последних аятов суры «Ат-Тауба» он нашёл у Абу Хузаймы аль-Ансари и поместил их в конце суры."
    }
  }
};

// Auto-contrôle strict avant écriture (8 langues + champs obligatoires)
const LANGUES_REQ = ['fr', 'en', 'es', 'ar', 'de', 'it', 'id', 'ru'];
for (const [cle, rec] of Object.entries(LOT_04_ANFAL_TAWBAH)) {
  if (!rec.source || !rec.degre || !Array.isArray(rec.versets) || !rec.texte) {
    throw new Error(`Structure invalide pour ${cle}`);
  }
  for (const lg of LANGUES_REQ) {
    if (!rec.texte[lg] || typeof rec.texte[lg] !== 'string' || rec.texte[lg].trim().length < 20) {
      throw new Error(`Texte manquant ou trop court pour ${cle} [${lg}]`);
    }
  }
}

Object.assign(data.recits, LOT_04_ANFAL_TAWBAH);
data.version = (data.version || 1) + 1;

const jsonFinal = JSON.stringify(data, null, 2);
JSON.parse(jsonFinal); // Vérification JSON stricte
writeSafe(asbabPath, jsonFinal);

let worker = fs.readFileSync(workerPath, 'utf8');
worker = worker.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
writeSafe(workerPath, worker);

const nbRecits = Object.keys(data.recits).length;
const nbVersets = Object.values(data.recits).reduce((acc, r) => acc + (Array.isArray(r.versets) ? r.versets.length : 1), 0);
console.log(`✅ Lot 4 (Sourates 8 & 9) validé et intégré ! Total actuel : ${nbRecits} récits Sahīh couvrant ${nbVersets} versets en 8 langues.`);
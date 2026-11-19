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

const LOT_06_ISRA_NUR = {
  "17:1": {
    type: "hadith",
    versets: ["17:1"],
    plage: "17:1",
    source: "Sahīh Al-Bukhārī n°3887 & Sahīh Muslim n°162",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik et Mālik ibn Sa‘sa‘ah rapportent le récit du Voyage Nocturne (Al-Isrā') évoqué dans ce verset : en une seule nuit avant l'Hégire, l'Ange Jibrīl conduisit le Messager d'Allāh ﷺ sur la monture Al-Burāq depuis la Mosquée Sacrée de La Mecque jusqu'à la Mosquée Al-Aqsā de Jérusalem, où il dirigea les Prophètes en prière avant l'Ascension céleste (Al-Mi‘rāj) durant laquelle furent prescrites les cinq prières quotidiennes.",
      en: "Anas ibn Mālik and Mālik ibn Sa‘sa‘ah narrated the Night Journey (Al-Isrā') mentioned in this verse: in a single night before the Hijrah, Angel Jibrīl accompanied the Messenger of Allāh ﷺ on Al-Burāq from the Sacred Mosque in Makkah to Al-Aqsā Mosque in Jerusalem, where he led the prophets in prayer before the Heavenly Ascension (Al-Mi‘rāj), during which the five daily prayers were prescribed.",
      es: "Anas ibn Mālik y Mālik ibn Sa‘sa‘ah relataron el Viaje Nocturno (Al-Isrā') mencionado en esta aleya: en una sola noche antes de la Hégira, el Ángel Yibrīl llevó al Profeta ﷺ sobre Al-Burāq desde la Mezquita Sagrada de La Meca hasta Al-Aqsā en Jerusalén, antes de la Ascensión celestial en la que se prescribieron las cinco oraciones diarias.",
      ar: "عن أنس بن مالك ومالك بن صعصعة رضي الله عنهما في قصة الإسراء المذكورة في هذه الآية: أن جبريل عليه السلام أسرى برسول الله ﷺ ليلًا على البُراق من المسجد الحرام بمكة إلى المسجد الأقصى بالقدس حيث أمَّ الأنبياء، ثم عُرج به إلى السماوات العلا حيث فُرضت الصلوات الخمس.",
      de: "Anas ibn Mālik und Mālik ibn Sa‘sa‘ah berichteten von der Nachtreise (Al-Isrā') aus diesem Vers: In einer einzigen Nacht vor der Hidschra begleitete der Engel Dschibrīl den Gesandten Allahs ﷺ auf Al-Burāq von der Heiligen Moschee in Mekka zur Al-Aqsā-Moschee in Jerusalem, gefolgt von der Himmelsreise (Al-Mi‘rāj), bei der die fünf täglichen Gebete vorgeschrieben wurden.",
      it: "Anas ibn Mālik e Mālik ibn Sa‘sa‘ah narrarono il Viaggio Notturno (Al-Isrā') evocato in questo versetto: in una sola notte prima dell'Egira, l'Angelo Jibrīl condusse il Profeta ﷺ su Al-Burāq dalla Moschea Sacra della Mecca alla Moschea Al-Aqsā di Gerusalemme, prima dell'Ascensione celeste in cui furono prescritte le cinque preghiere quotidiane.",
      id: "Anas bin Malik dan Malik bin Sha‘sha‘ah meriwayatkan peristiwa Isra' dalam ayat ini: dalam satu malam sebelum hijrah, Malaikat Jibril membawa Rasulullah ﷺ menaiki Buraq dari Masjidil Haram di Makkah ke Masjidil Aqsa di Yerusalem, lalu dilanjutkan dengan Mi‘raj ketika shalat lima waktu diwajibkan.",
      ru: "Анас ибн Малик и Малик ибн Са‘са‘а передали историю Ночного перенесения (аль-Исра), упомянутого в этом аяте: в одну ночь до хиджры ангел Джибриль перенёс Посланника Аллаха ﷺ на Бураке из Заповедной мечети в Мекке в мечеть аль-Акса в Иерусалиме, после чего состоялось Вознесение (аль-Ми‘радж), во время которого были предписаны пять ежедневных молитв."
    }
  },
  "17:78": {
    type: "hadith",
    versets: ["17:78"],
    plage: "17:78",
    source: "Sahīh Al-Bukhārī n°648, n°4717",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ cita la fin de ce verset (« car la récitation de l'aube a des témoins ») pour expliquer que les Anges de la nuit et les Anges du jour se rassemblent ensemble lors de la prière de l'aube (Al-Fajr), témoignant ainsi de la récitation et de la dévotion des croyants.",
      en: "Abū Hurayrah (may Allāh be pleased with him) narrated that the Messenger of Allāh ﷺ cited the end of this verse ('indeed, the recitation of dawn is ever witnessed') to explain that the angels of the night and the angels of the day gather together at the Fajr prayer, bearing witness to the believers' recitation.",
      es: "Abū Hurayrah relató que el Mensajero de Allah ﷺ citó el final de esta aleya («pues la recitación del alba tiene testigos») explicando que los ángeles de la noche y del día se reúnen en la oración del alba (Fajr) para dar testimonio de la recitación de los creyentes.",
      ar: "عن أبي هريرة رضي الله عنه أن رسول الله ﷺ تلا آخر هذه الآية ﴿إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا﴾ مبيّنًا أن ملائكة الليل وملائكة النهار تجتمع في صلاة الفجر فتشهد قراءة المؤمنين وعبادتهم.",
      de: "Abū Hurayrah berichtete, dass der Gesandte Allahs ﷺ das Ende dieses Verses („denn die Rezitation der Morgendämmerung wird bezeugt“) anführte, um zu erklären, dass die Engel der Nacht und des Tages beim Morgengebet (Fajr) zusammenkommen.",
      it: "Abū Hurayrah narrò che il Messaggero di Allāh ﷺ citò la fine di questo versetto («poiché la recitazione dell'alba ha testimoni») spiegando che gli angeli della notte e quelli del giorno si riuniscono durante la preghiera dell'alba (Fajr).",
      id: "Abu Hurairah meriwayatkan bahwa Rasulullah ﷺ mengutip akhir ayat ini seraya menjelaskan bahwa para malaikat malam dan malaikat siang berkumpul bersama pada waktu shalat Subuh untuk menyaksikan bacaan kaum mukminin.",
      ru: "Абу Хурайра передал, что Посланник Аллаха ﷺ привёл окончание этого аята («поистине, чтение на рассвете имеет свидетелей»), пояснив, что ангелы ночи и ангелы дня собираются вместе на утренней молитве (фаджр)."
    }
  },
  "17:79": {
    type: "hadith",
    versets: ["17:79"],
    plage: "17:79",
    source: "Sahīh Al-Bukhārī n°4718",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn ‘Umar (qu'Allāh les agrée) rapporte qu'au Jour de la Résurrection, lorsque l'humanité éprouvée se tournera successivement vers les grands Prophètes pour demander l'intercession afin que commence le Jugement, c'est au Prophète Muhammad ﷺ qu'Allāh accordera cette Grande Intercession : c'est là « la Station louée » (Al-Maqām Al-Mahmūd) promise dans ce verset.",
      en: "‘Abdullāh ibn ‘Umar (may Allāh be pleased with them) narrated that on the Day of Resurrection, after humanity turns to the great prophets seeking intercession for judgment to begin, Allāh will grant that Great Intercession specifically to Prophet Muhammad ﷺ—and that is the 'Praised Station' (Al-Maqām Al-Mahmūd) promised in this verse.",
      es: "‘Abdullāh ibn ‘Umar relató que el Día de la Resurrección, cuando la humanidad pida intercesión para que comience el Juicio, Allah concederá esa Gran Intercesión al Profeta Muhammad ﷺ: esa es la «Posición loada» (Al-Maqām Al-Mahmūd) prometida en esta aleya.",
      ar: "عن عبد الله بن عمر رضي الله عنهما أن الناس يوم القيامة يستشفعون بالأنبياء حتى ينتهي الأمر إلى النبي محمد ﷺ فيأذن الله له بالشفاعة العظمى لفصل القضاء، فذلك هو «المقام المحمود» الذي وعده الله في هذه الآية.",
      de: "‘Abdullāh ibn ‘Umar berichtete, dass Allah am Tag der Auferstehung dem Propheten Muhammad ﷺ die Große Fürsprache zum Beginn des Gerichts gewähren wird – genau dies ist der in diesem Vers verheißene „lobenswerte Rang“ (Al-Maqām Al-Mahmūd).",
      it: "‘Abdullāh ibn ‘Umar narrò che nel Giorno della Resurrezione, quando l'umanità cercherà l'intercessione per l'inizio del Giudizio, Allāh concederà la Grande Intercessione al Profeta Muhammad ﷺ: è questa la «Stazione lodata» (Al-Maqām Al-Mahmūd) promessa qui.",
      id: "‘Abdullah bin ‘Umar meriwayatkan bahwa pada Hari Kiamat ketika seluruh manusia memohon syafaat agar hisab segera dimulai, Allah menganugerahkan Syafaat Agung itu kepada Nabi Muhammad ﷺ; itulah ‘kedudukan terpuji’ (Al-Maqam Al-Mahmud) dalam ayat ini.",
      ru: "‘Абдуллах ибн ‘Умар передал, что в День Воскресения, когда человечество будет просить о заступничестве ради начала Суда, Аллах дарует Великое Заступничество Пророку Мухаммаду ﷺ — это и есть «достохвальное место» (аль-Макам аль-Махмуд), обещанное в этом аяте."
    }
  },
  "17:85": {
    type: "sabab",
    versets: ["17:85"],
    plage: "17:85",
    source: "Sahīh Al-Bukhārī n°125, n°4721 & Sahīh Muslim n°2794",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd (qu'Allāh l'agrée) raconte qu'il marchait avec le Prophète ﷺ dans les terrains de Médine lorsqu'ils passèrent près d'un groupe de Juifs. L'un d'eux dit : « Interrogeons-le au sujet de l'Âme (Ar-Rūh) ! » Ils lui posèrent la question ; le Prophète ﷺ s'appuya sur son bâton de palmier, garda le silence tandis que la Révélation descendait sur lui, puis leur récita ce verset : « Dis : L'Âme relève de l'ordre de mon Seigneur, et il ne vous a été donné que peu de science. »",
      en: "‘Abdullāh ibn Mas‘ūd narrated that he was walking with the Prophet ﷺ in Madinah when they passed a group of Jews who decided to ask him about the Soul (Ar-Rūh). When they questioned him, the Prophet ﷺ leaned on his palm-leaf stalk in silence as Revelation descended upon him, then recited this verse: 'Say: The soul is of the affair of my Lord, and mankind has been given only a little knowledge.'",
      es: "‘Abdullāh ibn Mas‘ūd relató que caminaba con el Profeta ﷺ por Medina cuando un grupo de judíos decidió preguntarle sobre el Espíritu (Ar-Rūh). El Profeta ﷺ guardó silencio apoyado en su bastón mientras recibía la Revelación y luego les recitó esta aleya.",
      ar: "عن عبد الله بن مسعود رضي الله عنه أنه كان يمشي مع النبي ﷺ في حَرث بالمدينة فمرّ بنفر من اليهود فسألوه عن الروح، فسكت النبي ﷺ متكئًا على عسيب حتى نزل عليه الوحي ثم تلا عليهم هذه الآية: ﴿قُلِ الرُّوحُ مِنْ أَمْرِ رَبِّي وَمَا أُوتِيتُم مِّنَ الْعِلْمِ إِلَّا قَلِيلًا﴾.",
      de: "‘Abdullāh ibn Mas‘ūd berichtete, dass er mit dem Propheten ﷺ durch Medina ging, als eine Gruppe Juden ihn nach der Seele (Ar-Rūh) fragte. Der Prophet ﷺ schwieg, während die Offenbarung auf ihn herabkam, und rezitierte ihnen dann diesen Vers.",
      it: "‘Abdullāh ibn Mas‘ūd narrò che camminava con il Profeta ﷺ a Medina quando un gruppo di Ebrei gli chiese dell'Anima (Ar-Rūh). Il Profeta ﷺ rimase in silenzio mentre scendeva la Rivelazione e poi recitò loro questo versetto.",
      id: "‘Abdullah bin Mas‘ud meriwayatkan bahwa saat berjalan bersama Nabi ﷺ di Madinah, sekelompok orang Yahudi bertanya kepadanya tentang ruh. Nabi ﷺ terdiam sejenak menerima wahyu lalu membacakan ayat ini kepada mereka.",
      ru: "‘Абдуллах ибн Мас‘уд рассказал, что шёл с Пророком ﷺ по Медине, когда группа иудеев спросила его о душе (ар-Рух). Пророк ﷺ помолчал, принимая откровение, а затем прочёл им этот аят: «Скажи: Душа — от повеления Господа моего, а вам дано лишь немного знания»."
    }
  },
  "17:110": {
    type: "sabab",
    versets: ["17:110"],
    plage: "17:110",
    source: "Sahīh Al-Bukhārī n°4722 & Sahīh Muslim n°446",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte que ce verset fut révélé alors que le Messager d'Allāh ﷺ vivait encore caché avec ses Compagnons à La Mecque : lorsqu'il récitait le Coran à voix trop haute durant la prière, les polythéistes l'entendaient et insultaient le Coran et Celui qui l'a révélé. Allāh lui ordonna donc de ne pas élever excessivement la voix pour éviter leurs outrages, ni de la baisser au point que ses Compagnons ne puissent l'entendre, mais d'adopter une voie mesurée entre les deux.",
      en: "Ibn ‘Abbās narrated that this verse was revealed while the Prophet ﷺ was still discreetly praying with his Companions in Makkah: whenever he recited aloud, polytheists heard him and insulted the Qur'an and its Revealer. Allāh therefore instructed him neither to raise his voice too loudly nor lower it completely, but to seek a balanced middle course.",
      es: "Ibn ‘Abbās relató que esta aleya descendió en La Meca cuando, al recitar en voz alta durante la oración, los politeístas insultaban el Corán y a Quien lo reveló. Por ello Allah le ordenó no elevar demasiado la voz ni bajarla por completo, sino adoptar un término medio.",
      ar: "عن ابن عباس رضي الله عنهما أن هذه الآية نزلت ورسول الله ﷺ متوارٍ بمكة؛ فكان إذا رفع صوته بالقرآن سمع المشركون فسبّوا القرآن ومن أنزله، فأمره الله ألا يجهر بصلاته فيسمع المشركون ولا يخافت بها عن أصحابه، بل يبتغي بين ذلك سبيلًا.",
      de: "Ibn ‘Abbās berichtete, dass dieser Vers in Mekka offenbart wurde, als Polytheisten den Koran schmähten, sobald sie den Propheten ﷺ laut rezitieren hörten. Allah gebot ihm daher, weder zu laut noch völlig lautlos zu beten, sondern einen ausgewogenen Mittelweg zu wählen.",
      it: "Ibn ‘Abbās narrò che questo versetto scese alla Mecca quando i politeisti, sentendo il Profeta ﷺ recitare ad alta voce in preghiera, insultavano il Corano. Allāh gli ordinò quindi di non alzare troppo la voce né di abbassarla del tutto, scegliendo una via intermedia.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa ayat ini turun di Makkah ketika kaum musyrik mencela Al-Qur'an bila mendengar Nabi ﷺ mengeraskan bacaan shalatnya. Maka Allah memerintahkan agar tidak terlalu mengeraskan suara dan tidak pula terlalu merendahkannya, melainkan di antara keduanya.",
      ru: "Ибн ‘Аббас передал, что этот аят был ниспослан в Мекке, когда многобожники, слыша громкое чтение Пророка ﷺ в молитве, поносили Коран. Тогда Аллах велел не читать слишком громко и не произносить совсем шёпотом, а придерживаться середины."
    }
  },
  "18:60": {
    type: "hadith",
    versets: ["18:60", "18:61", "18:62", "18:63", "18:64", "18:65"],
    plage: "18:60–65",
    source: "Sahīh Al-Bukhārī n°122, n°4725 & Sahīh Muslim n°2380",
    degre: "Sahīh",
    texte: {
      fr: "Ubayy ibn Ka‘b rapporte d'après le Prophète ﷺ l'origine de ce voyage : un jour, alors que Mūsā (Moïse) prêchait aux Enfants d'Israël, on lui demanda quel était l'homme le plus savant sur terre, et il répondit « Moi » sans renvoyer la science absolue à Allāh. Allāh lui révéla alors qu'au confluent des deux mers vivait un serviteur (Al-Khidr) doté d'une science particulière qu'il ne possédait pas ; Mūsā partit aussitôt avec son jeune serviteur Yūsha‘ ibn Nūn et un poisson dans un panier comme signe du lieu de rencontre.",
      en: "Ubayy ibn Ka‘b narrated from the Prophet ﷺ the background of this journey: when Mūsā (Moses) was asked who was the most knowledgeable person on earth and answered 'I am' without attributing absolute knowledge to Allāh, Allāh informed him of a servant (Al-Khidr) at the junction of the two seas who possessed distinct knowledge. Mūsā immediately set out with his young companion Yūsha‘ ibn Nūn carrying a fish as the sign of their meeting place.",
      es: "Ubayy ibn Ka‘b relató del Profeta ﷺ el origen de este viaje: al responder Mūsā (Moisés) que él era el más sabio de la tierra sin remitir el saber absoluto a Allah, Allah le informó de un siervo (Al-Khidr) en la confluencia de los dos mares dotado de un conocimiento distinto, y Mūsā partió a buscarlo con un pez como señal.",
      ar: "عن أُبيّ بن كعب رضي الله عنه عن النبي ﷺ أن موسى عليه السلام سُئل: أي الناس أعلم؟ فقال: أنا، فعتب الله عليه إذ لم يردّ العلم إليه، وأوحى إليه أن بمجمع البحرين عبدًا من عبادي (الخضر) هو أعلم منك ببعض العلم، فانطلق موسى مع فتاه يوشع بن نون والحوت علامةً لموضع لقائه.",
      de: "Ubayy ibn Ka‘b berichtete vom Propheten ﷺ den Hintergrund dieser Reise: Als Mūsā auf die Frage nach dem wissendsten Menschen „Ich“ antwortete, ohne das Wissen auf Allah zurückzuführen, teilte Allah ihm mit, dass am Zusammenfluss der beiden Meere ein Diener (Al-Khidr) besonderes Wissen besitze, worauf Mūsā sich mit einem Fisch als Erkennungszeichen auf den Weg machte.",
      it: "Ubayy ibn Ka‘b narrò dal Profeta ﷺ l'origine di questo viaggio: quando Mosè, interrogato su chi fosse l'uomo più sapiente, rispose «Io» senza ricondurre la scienza ad Allāh, Egli gli rivelò che alla confluenza dei due mari viveva un servo (Al-Khidr) dotato di una scienza distinta, e Mosè partì subito con un pesce come segno dell'incontro.",
      id: "Ubayy bin Ka‘b meriwayatkan dari Nabi ﷺ latar kisah ini: ketika Nabi Musa ditanya siapa manusia paling berilmu dan menjawab dirinya sendiri tanpa menyandarkan ilmu kepada Allah, Allah mengabarkan adanya seorang hamba (Khidr) di pertemuan dua lautan yang memiliki ilmu khusus, lalu Musa segera berangkat mencarinya.",
      ru: "Убайй ибн Ка‘б передал от Пророка ﷺ предысторию этого пути: когда Муса на вопрос, кто самый знающий человек на земле, ответил «Я», не воздав должное знанию Аллаха, Аллах сообщил ему о Своём рабе (аль-Хидре) у места слияния двух морей, и Муса сразу отправился в путь, взяв рыбу как знамение места встречи."
    }
  },
  "19:64": {
    type: "sabab",
    versets: ["19:64"],
    plage: "19:64",
    source: "Sahīh Al-Bukhārī n°4731",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte que le Messager d'Allāh ﷺ dit un jour à l'Ange Jibrīl (Gabriel) : « Qu'est-ce qui t'empêche de nous rendre visite plus souvent que tu ne le fais ? » Ce verset fut aussitôt révélé en réponse par la voix de Jibrīl : « Nous ne descendons que sur l'ordre de ton Seigneur ; à Lui appartient tout ce qui est devant nous, derrière nous et entre les deux. »",
      en: "Ibn ‘Abbās (may Allāh be pleased with them) narrated that the Messenger of Allāh ﷺ once asked Angel Jibrīl (Gabriel): 'What prevents you from visiting us more frequently than you do?' This verse was immediately revealed as Jibrīl's reply: 'We do not descend except by the command of your Lord; to Him belongs all that is before us, behind us, and in between.'",
      es: "Ibn ‘Abbās relató que el Mensajero de Allah ﷺ preguntó al Ángel Yibrīl: «¿Qué te impide visitarnos más a menudo de lo que lo haces?». Al instante descendió esta aleya como respuesta: «No descendemos sino por orden de tu Señor».",
      ar: "عن ابن عباس رضي الله عنهما أن رسول الله ﷺ قال لجبريل عليه السلام: «ما يمنعك أن تزورنا أكثر مما تزورنا؟» فنزلت هذه الآية جوابًا على لسان جبريل: ﴿وَمَا نَتَنَزَّلُ إِلَّا بِأَمْرِ رَبِّكَ لَهُ مَا بَيْنَ أَيْدِينَا وَمَا خَلْفَنَا وَمَا بَيْنَ ذَٰلِكَ﴾.",
      de: "Ibn ‘Abbās berichtete, dass der Gesandte Allahs ﷺ den Engel Dschibrīl fragte: „Was hindert dich daran, uns häufiger zu besuchen?“ Sogleich wurde dieser Vers als Antwort offenbart: „Wir steigen nur auf Befehl deines Herrn herab.“",
      it: "Ibn ‘Abbās narrò che il Messaggero di Allāh ﷺ chiese all'Angelo Jibrīl: «Cosa ti impedisce di farci visita più spesso?». Immediatamente fu rivelato questo versetto in risposta: «Noi non scendiamo se non per ordine del tuo Signore».",
      id: "Ibnu ‘Abbas meriwayatkan bahwa Rasulullah ﷺ pernah bertanya kepada Malaikat Jibril: “Apa yang menghalangimu untuk mengunjungi kami lebih sering?” Seketika turunlah ayat ini sebagai jawaban: “Dan tidaklah kami (Jibril) turun kecuali dengan perintah Tuhanmu.”",
      ru: "Ибн ‘Аббас передал, что Посланник Аллаха ﷺ спросил ангела Джибриля: «Что мешает тебе навещать нас чаще?» В ответ немедленно был ниспослан этот аят: «Мы нисходим только по повелению твоего Господа»."
    }
  },
  "19:77": {
    type: "sabab",
    versets: ["19:77", "19:78", "19:79", "19:80"],
    plage: "19:77–80",
    source: "Sahīh Al-Bukhārī n°2091, n°4732 & Sahīh Muslim n°2795",
    degre: "Sahīh",
    texte: {
      fr: "Khabbāb ibn Al-Aratt (qu'Allāh l'agrée) raconte qu'il était forgeron à La Mecque et qu'Al-‘Ās ibn Wā'il lui devait de l'argent pour un travail. Quand Khabbāb vint réclamer son dû, Al-‘Ās répondit avec arrogance : « Je ne te paierai pas tant que tu n'auras pas renié Muhammad ! » Khabbāb répliqua qu'il ne le renierait jamais, même après la mort et la résurrection. Al-‘Ās se moqua alors : « Eh bien, quand je serai ressuscité, j'aurai des biens et des enfants et je te paierai là-bas ! » Allāh fit descendre ces versets pour réfuter sa raillerie.",
      en: "Khabbāb ibn Al-Aratt narrated that he worked as a blacksmith in Makkah and Al-‘Ās ibn Wā'il owed him money. When Khabbāb demanded payment, Al-‘Ās refused unless he disbelieved in Muhammad ﷺ, and mocked him saying: 'When I am resurrected, I will surely be given wealth and children and pay you then!' Allāh revealed these verses refuting his arrogance.",
      es: "Khabbāb ibn Al-Aratt relató que era herrero en La Meca y Al-‘Ās ibn Wā'il le debía dinero; este se negó a pagarle mientras no negara a Muhammad ﷺ y se burló diciendo que en la resurrección tendría bienes e hijos y entonces le pagaría. Allah reveló estas aleyas refutando su soberbia.",
      ar: "عن خباب بن الأرت رضي الله عنه أنه كان حدّادًا بمكة وكان له دَين على العاص بن وائل، فلما تقاضاه قال العاص: لا أقضيك حتى تكفر بمحمد، واستهزأ قائلًا: سأُوتى مالًا وولدًا عند البعث فأقضيك! فأنزل الله هذه الآيات ردًّا على استهزائه.",
      de: "Khabbāb ibn Al-Aratt berichtete, dass er in Mekka als Schmied arbeitete und Al-‘Ās ibn Wā'il ihm Geld schuldete. Dieser verweigerte die Zahlung, solange Khabbāb nicht Muhammad ﷺ verleugne, und spottete, er werde im Jenseits Vermögen und Kinder besitzen und dann zahlen. Daraufhin offenbarte Allah diese Verse.",
      it: "Khabbāb ibn Al-Aratt narrò che era fabbro alla Mecca e Al-‘Ās ibn Wā'il aveva un debito con lui: questi si rifiutò di pagare finché non avesse rinnegato Muhammad ﷺ, schernendolo col dire che dopo la risurrezione avrebbe avuto beni e figli per saldarlo. Allāh rivelò questi versetti.",
      id: "Khabbab bin Al-Aratt meriwayatkan bahwa ia bekerja sebagai pandai besi di Makkah dan Al-‘Ash bin Wa'il berutang kepadanya. Al-‘Ash menolak membayar kecuali ia mengingkari Nabi Muhammad ﷺ seraya mengejek akan membayarnya kelak setelah dibangkitkan bersama harta dan anak-anaknya. Maka turunlah ayat-ayat ini.",
      ru: "Хаббаб ибн аль-Аратт рассказал, что работал кузнецом в Мекке, и аль-‘Ас ибн Ваиль задолжал ему деньги. Аль-‘Ас отказался платить, пока тот не отречётся от Мухаммада ﷺ, и насмешливо заявил, что в будущей жизни получит богатство и детей и тогда расплатится. В ответ Аллах ниспослал эти аяты."
    }
  },
  "19:96": {
    type: "hadith",
    versets: ["19:96"],
    plage: "19:96",
    source: "Sahīh Al-Bukhārī n°3209 & Sahīh Muslim n°2637",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ illustra la promesse de ce verset (« le Tout Miséricordieux déposera pour eux de l'affection ») en expliquant que lorsqu'Allāh aime un serviteur, Il appelle Jibrīl et lui dit qu'Il aime ce serviteur ; Jibrīl l'aime alors et l'annonce aux habitants du ciel, puis Allāh dépose l'acceptation et l'affection pour ce serviteur sur la terre.",
      en: "Abū Hurayrah narrated that the Messenger of Allāh ﷺ illustrated the promise of this verse ('the Most Merciful will appoint for them affection') by explaining that when Allāh loves a servant, He informs Jibrīl, who loves him and announces it to the inhabitants of heaven, and then acceptance and affection for him are placed upon the earth.",
      es: "Abū Hurayrah relató que el Profeta ﷺ ilustró esta promesa explicando que cuando Allah ama a un siervo lo anuncia a Yibrīl, quien lo ama y lo proclama entre los habitantes del cielo, y luego Allah deposita aceptación y afecto hacia ese siervo en la tierra.",
      ar: "عن أبي هريرة رضي الله عنه أن النبي ﷺ بيّن معنى هذا الوعد بأن الله إذا أحب عبدًا نادى جبريل فأخبره بحبه فيحبه جبريل وينادي في أهل السماء فيحبونه، ثم يُوضع له القبول والمودة في الأرض.",
      de: "Abū Hurayrah berichtete, dass der Gesandte Allahs ﷺ dieses Versprechen erläuterte: Wenn Allah einen Diener liebt, teilt Er es Dschibrīl mit, der es den Bewohnern des Himmels verkündet, woraufhin dem Diener Zuneigung und Annahme auf der Erde zuteilwerden.",
      it: "Abū Hurayrah narrò che il Messaggero di Allāh ﷺ illustrò questa promessa spiegando che quando Allāh ama un servo lo annuncia a Jibrīl e agli abitanti del cielo, e quindi viene deposta accettazione e affetto per lui sulla terra.",
      id: "Abu Hurairah meriwayatkan sabda Nabi ﷺ yang menjelaskan janji ayat ini: apabila Allah mencintai seorang hamba, Dia memanggil Jibril lalu Jibril menyerukannya kepada penghuni langit, kemudian ditanamkanlah penerimaan dan rasa cinta kepadanya di muka bumi.",
      ru: "Абу Хурайра передал слова Пророка ﷺ, разъясняющие это обещание: когда Аллах любит какого-либо раба, Он возвещает об этом Джибрилю и обитателям небес, а затем внушает любовь и благосклонность к этому рабу на земле."
    }
  },
  "20:130": {
    type: "hadith",
    versets: ["20:130"],
    plage: "20:130",
    source: "Sahīh Al-Bukhārī n°554, n°4735 & Sahīh Muslim n°633",
    degre: "Sahīh",
    texte: {
      fr: "Jarīr ibn ‘Abdillāh (qu'Allāh l'agrée) rapporte qu'une nuit de pleine lune, le Messager d'Allāh ﷺ contempla la lune et déclara aux croyants : « Vous verrez certes votre Seigneur (au Paradis) aussi clairement que vous voyez cette lune, sans aucune gêne ! Si vous pouvez donc ne jamais manquer une prière avant le lever du soleil (Al-Fajr) et une prière avant son coucher (Al-‘Asr), faites-le ! » Puis il récita ce verset.",
      en: "Jarīr ibn ‘Abdillāh narrated that on a full-moon night the Messenger of Allāh ﷺ looked at the moon and said: 'You will surely see your Lord (in Paradise) as clearly as you see this moon, without crowding! So if you can avoid ever missing a prayer before sunrise (Fajr) and before sunset (‘Asr), do so!' Then he recited this verse.",
      es: "Yarīr ibn ‘Abdillāh relató que una noche de luna llena el Profeta ﷺ dijo que los creyentes verán a su Señor en el Paraíso con tanta claridad como esa luna, y añadió: «Si podéis no descuidar nunca una oración antes de la salida del sol (Fajr) y antes de su puesta (‘Asr), hacedlo», recitando luego esta aleya.",
      ar: "عن جرير بن عبد الله رضي الله عنه أن النبي ﷺ نظر إلى القمر ليلة البدر فقال: «إنكم سترون ربكم كما ترون هذا القمر لا تُضامّون في رؤيته، فإن استطعتم ألا تُغلبوا على صلاة قبل طلوع الشمس وقبل غروبها فافعلوا»، ثم قرأ هذه الآية.",
      de: "Dscharīr ibn ‘Abdillāh berichtete, dass der Prophet ﷺ in einer Vollmondnacht sagte, die Gläubigen würden ihren Herrn im Paradies so klar sehen wie diesen Mond, und ermahnte sie, niemals das Gebet vor Sonnenaufgang (Fajr) und vor Sonnenuntergang (‘Asr) zu versäumen, worauf er diesen Vers rezitierte.",
      it: "Jarīr ibn ‘Abdillāh narrò che in una notte di luna piena il Profeta ﷺ assicurò che i credenti vedranno il loro Signore in Paradiso chiaramente come quella luna, esortandoli a non mancare mai la preghiera prima dell'alba (Fajr) e prima del tramonto (‘Asr), poi recitò questo versetto.",
      id: "Jarir bin ‘Abdillah meriwayatkan bahwa pada malam bulan purnama Nabi ﷺ bersabda kaum mukminin akan melihat Tuhan mereka di Surga sejelas melihat purnama, lalu berpesan agar tidak pernah melalaikan shalat Subuh dan Ashar sembari membacakan ayat ini.",
      ru: "Джарир ибн ‘Абдуллах передал, что в ночь полнолуния Пророк ﷺ сказал, что верующие увидят своего Господа в Раю так же ясно, как эту луну, и призвал никогда не пропускать молитвы перед восходом солнца (фаджр) и перед его закатом (‘аср), прочтя затем этот аят."
    }
  },
  "21:104": {
    type: "hadith",
    versets: ["21:104"],
    plage: "21:104",
    source: "Sahīh Al-Bukhārī n°3349, n°4740 & Sahīh Muslim n°2860",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte que le Messager d'Allāh ﷺ récita ce verset (« De même que Nous avons commencé la première création, Nous la referons ») dans un sermon et expliqua que tous les êtres humains seront ressuscités et rassemblés pieds nus, nus et incirconcis — exactement comme lors de leur première naissance — et que le premier être humain à être revêtu au Jour de la Résurrection sera le Prophète Ibrāhīm (Abraham).",
      en: "Ibn ‘Abbās narrated that the Messenger of Allāh ﷺ recited this verse ('As We began the first creation, We will repeat it') in a sermon and explained that all people will be resurrected barefoot, unclothed, and uncircumcised—just as they were first created—and that the first human to be clothed on the Day of Resurrection will be Prophet Ibrāhīm (Abraham).",
      es: "Ibn ‘Abbās relató que el Profeta ﷺ recitó esta aleya en un sermón explicando que la humanidad será resucitada descalza y desnuda, tal como fue creada por primera vez, y que el primero en ser vestido el Día de la Resurrección será el Profeta Ibrāhīm (Abraham).",
      ar: "عن ابن عباس رضي الله عنهما أن النبي ﷺ خطب فتلا هذه الآية ﴿كَمَا بَدَأْنَا أَوَّلَ خَلْقٍ نُّعِيدُهُ﴾ وبيّن أن الناس يُحشرون يوم القيامة حفاةً عراةً غرلًا كما خُلقوا أول مرة، وأن أول الخلائق يُكسى يوم القيامة هو إبراهيم عليه السلام.",
      de: "Ibn ‘Abbās berichtete, dass der Prophet ﷺ diesen Vers in einer Predigt rezitierte und erklärte, alle Menschen würden barfuß und unbekleidet auferweckt werden – genau wie bei ihrer ersten Erschaffung – und als Erster werde der Prophet Ibrāhīm bekleidet werden.",
      it: "Ibn ‘Abbās narrò che il Profeta ﷺ recitò questo versetto in un sermone spiegando che gli esseri umani saranno risuscitati scalzi e nudi come nella prima creazione, e che il primo ad essere vestito nel Giorno della Resurrezione sarà il Profeta Abramo.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa Nabi ﷺ membacakan ayat ini dalam khutbahnya seraya menjelaskan bahwa manusia akan dibangkitkan dalam keadaan tanpa alas kaki dan tak berpakaian seperti penciptaan awal, dan orang pertama yang diberi pakaian kelak adalah Nabi Ibrahim.",
      ru: "Ибн ‘Аббас передал, что Пророк ﷺ прочёл этот аят в проповеди, пояснив, что люди будут воскрешены босыми и нагими, подобно их первому сотворению, а первым, кого оденут в День Воскресения, будет пророк Ибрахим (Авраам)."
    }
  },
  "22:11": {
    type: "sabab",
    versets: ["22:11"],
    plage: "22:11",
    source: "Sahīh Al-Bukhārī n°4742",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte que ce verset (« Il en est parmi les gens qui adorent Allāh marginalement, sur un bord ») fut révélé au sujet d'hommes qui venaient s'installer à Médine : si leur épouse donnait naissance à un garçon et que leurs juments mettaient bas, ils disaient « Voici une excellente religion ! » ; mais si un revers les touchait, ils disaient « Quelle mauvaise religion ! » et se détournaient de la foi.",
      en: "Ibn ‘Abbās narrated that this verse ('Among the people is he who worships Allāh on an edge') was revealed about men who moved to Madinah: if their wives bore sons and their mares foaled, they said 'This is a good religion,' but if hardship struck them, they blamed the religion and turned back on their heels.",
      es: "Ibn ‘Abbās relató que esta aleya fue revelada respecto a personas que llegaban a Medina y condicionaban su fe a su prosperidad material: si todo les iba bien elogiaban la religión, pero ante la primera prueba le daban la espalda.",
      ar: "عن ابن عباس رضي الله عنهما أن هذه الآية نزلت في رجال كانوا يقدمون المدينة، فإن ولدت امرأته غلامًا ونتجت خيله قال: هذا دين صالح، وإن لم تلد ولم تنتج خيله قال: هذا دين سوء، فينقلب على وجهه.",
      de: "Ibn ‘Abbās berichtete, dass dieser Vers über Menschen offenbart wurde, die nach Medina kamen und ihren Glauben von materiellem Erfolg abhängig machten: Ging es ihnen gut, lobten sie die Religion, doch bei einer Prüfung wandten sie sich sofort ab.",
      it: "Ibn ‘Abbās narrò che questo versetto fu rivelato riguardo a persone che giungevano a Medina legando la propria fede al benessere materiale: se tutto prosperava lodavano la religione, ma alla prima difficoltà le voltavano le spalle.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa ayat ini turun mengenai orang-orang yang datang ke Madinah dan menggantungkan keimanan pada kelapangan duniawi: bila beruntung mereka memuji Islam, tetapi begitu ditimpa kesulitan mereka langsung berbalik murtad.",
      ru: "Ибн ‘Аббас передал, что этот аят был ниспослан о людях, приезжавших в Медину и связывавших свою веру с мирским достатком: если их дела процветали, они хвалили религию, а при первом испытании отворачивались от веры."
    }
  },
  "22:19": {
    type: "sabab",
    versets: ["22:19"],
    plage: "22:19",
    source: "Sahīh Al-Bukhārī n°3965, n°4743 & Sahīh Muslim n°3033",
    degre: "Sahīh",
    texte: {
      fr: "Abū Dharr Al-Ghifārī et ‘Alī ibn Abī Tālib (qu'Allāh les agrée) attestent que ce verset (« Voici deux groupes adverses qui disputaient au sujet de leur Seigneur ») fut révélé au sujet des six combattants du duel singulier qui ouvrit la bataille de Badr : Hamzah ibn ‘Abd al-Muttalib, ‘Alī ibn Abī Tālib et ‘Ubaydah ibn Al-Hārith face à ‘Utbah ibn Rabī‘ah, son frère Shaybah et son fils Al-Walīd.",
      en: "Abū Dharr and ‘Alī ibn Abī Tālib confirmed that this verse ('These are two adversaries who have disputed over their Lord') was revealed regarding the six champions of the opening duel at the Battle of Badr: Hamzah, ‘Alī, and ‘Ubaydah facing ‘Utbah ibn Rabī‘ah, Shaybah, and Al-Walīd.",
      es: "Abū Dharr y ‘Alī ibn Abī Tālib confirmaron que esta aleya fue revelada acerca de los seis combatientes del duelo inicial de la batalla de Badr: Hamzah, ‘Alī y ‘Ubaydah frente a ‘Utbah, Shaybah y Al-Walīd.",
      ar: "عن أبي ذر وعلي بن أبي طالب رضي الله عنهما أنهما أقسما أن هذه الآية ﴿هَٰذَانِ خَصْمَانِ اخْتَصَمُوا فِي رَبِّهِمْ﴾ نزلت في المتبارزين الستة يوم بدر: حمزة وعلي وعبيدة بن الحارث مقابل عتبة وشيبة ابني ربيعة والوليد بن عتبة.",
      de: "Abū Dharr und ‘Alī ibn Abī Tālib bezeugten, dass dieser Vers über die sechs Kämpfer des Eröffnungsduells der Schlacht von Badr offenbart wurde: Hamzah, ‘Alī und ‘Ubaydah gegen ‘Utbah, Shaybah und Al-Walīd.",
      it: "Abū Dharr e ‘Alī ibn Abī Tālib attestarono che questo versetto fu rivelato riguardo ai sei combattenti del duello iniziale della battaglia di Badr: Hamzah, ‘Alī e ‘Ubaydah contro ‘Utbah, Shaybah e Al-Walīd.",
      id: "Abu Dzar dan ‘Ali bin Abi Thalib menegaskan bahwa ayat ini turun berkenaan dengan enam orang yang maju berduel di awal Perang Badar: Hamzah, ‘Ali, dan ‘Ubaidah menghadapi ‘Utbah, Syaibah, dan Al-Walid.",
      ru: "Абу Зарр и ‘Али ибн Абу Талиб подтвердили, что этот аят был ниспослан о шести участниках поединка в начале битвы при Бадре: Хамзе, ‘Али и ‘Убайде против ‘Утбы, Шайбы и аль-Валида."
    }
  },
  "23:60": {
    type: "hadith",
    versets: ["23:60"],
    plage: "23:60",
    source: "Sunan At-Tirmidhī n°3175 & Musnad Ahmad",
    degre: "Hasan",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) demanda au Messager d'Allāh ﷺ si « ceux qui donnent ce qu'ils donnent tandis que leurs cœurs sont pleins de crainte » désignaient les gens qui commettent de grands péchés comme le vol ou la boisson. Le Prophète ﷺ répondit : « Non, ô fille d'As-Siddīq ! Ce sont au contraire ceux qui jeûnent, prient et donnent l'aumône, tout en craignant par humilité que leurs œuvres ne soient pas acceptées ! »",
      en: "‘Ā’ishah asked the Messenger of Allāh ﷺ whether 'those who give what they give while their hearts are fearful' referred to people committing major sins. The Prophet ﷺ replied: 'No, O daughter of As-Siddīq! Rather, they are those who fast, pray, and give charity while humbly fearing that their deeds might not be accepted!'",
      es: "‘Ā’ishah preguntó al Profeta ﷺ si quienes dan con corazones temerosos en esta aleya eran pecadores que temen el castigo, y él respondió: «¡No, hija de As-Siddīq! Son quienes ayunan, rezan y dan caridad temiendo con humildad que sus obras no sean aceptadas».",
      ar: "عن عائشة رضي الله عنها أنها سألت رسول الله ﷺ عن هذه الآية: أهم الذين يشربون الخمر ويسرقون؟ فقال ﷺ: «لا يا بنت الصديق، ولكنهم الذين يصومون ويصلّون ويتصدّقون وهم يخافون ألا يُتقبّل منهم».",
      de: "‘Ā’ishah fragte den Gesandten Allahs ﷺ, ob dieser Vers von großen Sündern handle, doch er erwiderte: „Nein, o Tochter von As-Siddīq! Es sind vielmehr jene, die fasten, beten und spenden und dennoch in Demut fürchten, ihre Taten könnten nicht angenommen werden.“",
      it: "‘Ā’ishah chiese al Profeta ﷺ se questo versetto si riferisse a chi commette gravi peccati, ma egli rispose: «No, figlia di As-Siddīq! Sono invece coloro che digiunano, pregano e fanno l'elemosina temendo con umiltà che le loro opere non vengano accettate».",
      id: "‘Aisyah bertanya kepada Nabi ﷺ apakah yang dimaksud ayat ini adalah para pelaku dosa besar, lalu beliau menjawab: “Bukan wahai putri Ash-Shiddiq, melainkan mereka yang berpuasa, shalat, dan bersedekah namun tetap merasa takut amal mereka tidak diterima.”",
      ru: "‘Аиша спросила Пророка ﷺ, не говорится ли в этом аяте о тех, кто совершает тяжкие грехи, и он ответил: «Нет, о дочь ас-Сиддика! Это те, кто постится, молится и подаёт милостыню, смиренно опасаясь, что их деяния не будут приняты»."
    }
  },
  "24:6": {
    type: "sabab",
    versets: ["24:6", "24:7", "24:8", "24:9"],
    plage: "24:6–9",
    source: "Sahīh Al-Bukhārī n°4745, n°4747 & Sahīh Muslim n°1492",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās et Sahl ibn Sa‘d rapportent que Hilāl ibn Umayyah (et ‘Uwaymir Al-‘Ajlānī dans un cas similaire) vint auprès du Prophète ﷺ exposer une situation délicate : un époux accusant son épouse d'adultère sans pouvoir réunir quatre témoins s'exposait à la peine de diffamation (v.4). Allāh révéla alors la procédure solennelle des serments mutuels (Al-Li‘ān) permettant de trancher le litige devant le juge et de dissoudre le mariage sans châtiment injuste.",
      en: "Ibn ‘Abbās and Sahl ibn Sa‘d narrated that when Hilāl ibn Umayyah (and similarly ‘Uwaymir Al-‘Ajlānī) faced the dilemma of accusing a spouse without four witnesses—which carried the penalty for slander (v.4)—Allāh revealed the solemn mutual-oath procedure (Al-Li‘ān) to resolve the matter before a judge and dissolve the marriage justly.",
      es: "Ibn ‘Abbās y Sahl ibn Sa‘d relataron que ante el dilema planteado por Hilāl ibn Umayyah (y ‘Uwaymir Al-‘Ajlānī) respecto a un cónyuge sin cuatro testigos, Allah reveló el procedimiento solemne de juramentos mutuos (Al-Li‘ān) para resolver el caso con justicia.",
      ar: "عن ابن عباس وسهل بن سعد رضي الله عنهم أن هلال بن أمية (وكذا عويمر العجلاني) عرض على النبي ﷺ نازلة قذف الزوج لزوجته دون أربعة شهداء، فأنزل الله آيات اللعان الأيمان المغلّظة للفصل بالعدل والتفريق بينهما دون حدٍّ.",
      de: "Ibn ‘Abbās und Sahl ibn Sa‘d berichteten, dass Allah anlässlich des Falles von Hilāl ibn Umayyah (und ‘Uwaymir Al-‘Ajlānī), als ein Ehemann keine vier Zeugen beibringen konnte, das feierliche gegenseitige Schwurverfahren (Al-Li‘ān) zur gerechten Klärung offenbarte.",
      it: "Ibn ‘Abbās e Sahl ibn Sa‘d narrarono che di fronte al caso di Hilāl ibn Umayyah (e ‘Uwaymir Al-‘Ajlānī), privo di quattro testimoni, Allāh rivelò la procedura solenne dei giuramenti reciproci (Al-Li‘ān) per risolvere la controversia con equità.",
      id: "Ibnu ‘Abbas dan Sahl bin Sa‘d meriwayatkan bahwa terkait peristiwa Hilal bin Umayyah (serta ‘Uwaimir Al-‘Ajlani) yang tidak memiliki empat saksi, Allah menurunkan hukum sumpah li‘an guna menyelesaikan perkara secara adil.",
      ru: "Ибн ‘Аббас и Сахль ибн Са‘д передали, что в связи со случаем Хиляля ибн Умайи (и ‘Уваймира аль-‘Аджляни), когда муж не мог привести четырёх свидетелей, Аллах ниспослал процедуру торжественных взаимных клятв (аль-ли‘ан) для справедливого разрешения дела."
    }
  },
  "24:11": {
    type: "sabab",
    versets: ["24:11", "24:12", "24:13", "24:14", "24:15", "24:16", "24:17", "24:18", "24:19", "24:20"],
    plage: "24:11–20",
    source: "Sahīh Al-Bukhārī n°4141, n°4750 & Sahīh Muslim n°2770",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) raconte la grande épreuve de la Calomnie (Al-Ifk) au retour de l'expédition des Banū al-Mustaliq : demeurée en arrière après avoir égaré son collier, elle fut ramenée saine et sauve à Médine sur la monture de Safwān ibn al-Mu‘attal. Le chef des hypocrites ‘Abdullāh ibn Ubayy lança une rumeur infâme qui éprouva profondément le Prophète ﷺ et sa famille pendant un mois entier, jusqu'à ce qu'Allāh fasse descendre ces dix versets proclamant solennellement l'innocence absolue de ‘Ā’ishah et interdisant la propagation des rumeurs sans preuve.",
      en: "‘Ā’ishah narrated the grave trial of the Slander (Al-Ifk) after the Banū al-Mustaliq expedition: accidentally left behind while searching for her necklace, she was safely escorted back to Madinah by Safwān ibn al-Mu‘attal. The hypocrite leader ‘Abdullāh ibn Ubayy spread a malicious rumor that deeply grieved the Prophet ﷺ and his family for an entire month, until Allāh revealed these ten verses solemnly declaring ‘Ā’ishah's complete innocence.",
      es: "‘Ā’ishah relató la dura prueba de la Calumnia (Al-Ifk) tras la expedición de Banū al-Mustaliq: tras quedar rezagada buscando su collar y ser escoltada hasta Medina por Safwān ibn al-Mu‘attal, el hipócrita ‘Abdullāh ibn Ubayy difundió una falsa acusación durante un mes hasta que Allah reveló estas diez aleyas proclamando solemnemente su total inocencia.",
      ar: "عن عائشة رضي الله عنها في قصة الإفك عقب غزوة بني المصطلق؛ حين تخلفت عن الركب لطلب عقدها فحملها صفوان بن المعطل حتى ألحقها بالمدينة، فخاض رأس المنافقين عبد الله بن أُبيّ في شائعة باطلة آلمت النبي ﷺ وأهله شهرًا كاملًا، حتى أنزل الله هذه الآيات العشر ببراءتها التامة وتحريم إشاعة الفاحشة.",
      de: "‘Ā’ishah berichtete von der schweren Prüfung der Verleumdung (Al-Ifk) nach dem Zug der Banū al-Mustaliq: Nachdem sie auf der Suche nach ihrer Halskette zurückgeblieben und sicher nach Medina gebracht worden war, verbreitete ‘Abdullāh ibn Ubayy einen Monat lang ein bösartiges Gerücht, bis Allah diese zehn Verse zu ihrer vollständigen Unschuld offenbarte.",
      it: "‘Ā’ishah narrò la grave prova della Calunnia (Al-Ifk) dopo la spedizione dei Banū al-Mustaliq: rimasta indietro cercando la sua collana e ricondotta sana e salva a Medina da Safwān, l'ipocrita ‘Abdullāh ibn Ubayy diffuse per un mese una falsa accusa, finché Allāh rivelò questi dieci versetti proclamando la sua totale innocenza.",
      id: "‘Aisyah meriwayatkan ujian berat berita bohong (Haditsul Ifki) seusai perang Bani Mushthaliq: setelah tertinggal mencari kalungnya dan diantar pulang dengan aman oleh Shafwan, tokoh munafik ‘Abdullah bin Ubay menyebarkan fitnah keji selama sebulan hingga Allah menurunkan sepuluh ayat ini yang membebaskan ‘Aisyah sepenuhnya.",
      ru: "‘Аиша рассказала о тяжёлом испытании клеветой (аль-Ифк) после похода против Бану аль-Мусталик: оставшись позади в поисках ожерелья и благополучно доставленная в Медину Сафваном, она стала жертвой лживого слуха, пущенного лицемером ‘Абдуллахом ибн Убайем, пока через месяц Аллах не ниспослал эти десять аятов, торжественно подтвердивших её полную невиновность."
    }
  },
  "24:22": {
    type: "sabab",
    versets: ["24:22"],
    plage: "24:22",
    source: "Sahīh Al-Bukhārī n°4750, n°4757 & Sahīh Muslim n°2770",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) rapporte qu'après la révélation de son innocence, son père Abū Bakr As-Siddīq — qui subvenait habituellement aux besoins de son parent pauvre Mistah ibn Uthāthah — jura de ne plus jamais lui verser d'aide financière parce que Mistah avait relayé la rumeur. Allāh fit aussitôt descendre ce verset : « Qu'ils pardonnent et absolvent ! N'aimez-vous pas qu'Allāh vous pardonne ? » Abū Bakr s'écria immédiatement : « Si, par Allāh ! J'aime qu'Allāh me pardonne ! » et rétablit aussitôt sa pension à Mistah.",
      en: "‘Ā’ishah narrated that after her innocence was revealed, her father Abū Bakr—who regularly supported his poor relative Mistah ibn Uthāthah—swore never to spend on him again because Mistah had repeated the rumor. Allāh immediately revealed this verse: 'Let them pardon and overlook; would you not like Allāh to forgive you?' Abū Bakr instantly declared 'Yes, by Allāh!' and restored Mistah's support.",
      es: "‘Ā’ishah relató que tras probarse su inocencia, Abū Bakr juró no seguir manteniendo a su pariente pobre Mistah por haber repetido el rumor. Allah reveló al instante esta aleya preguntando si no desean el perdón de Allah; Abū Bakr exclamó «¡Sí, por Allah!» y restableció de inmediato su ayuda.",
      ar: "عن عائشة رضي الله عنها أنه بعد نزول براءتها حلف أبو بكر الصديق ألا ينفق على قريبه الفقير مِسطح بن أثاثة لمشاركته في نقل الشائعة، فأنزل الله فورًا: ﴿وَلْيَعْفُوا وَلْيَصْفَحُوا أَلَا تُحِبُّونَ أَن يَغْفِرَ اللَّهُ لَكُمْ﴾، فقال أبو بكر: بلى والله إني لأحب أن يغفر الله لي، وأعاد النفقة لمسطح فورًا.",
      de: "‘Ā’ishah berichtete, dass Abū Bakr schwor, seinen bedürftigen Verwandten Mistah nicht mehr zu unterstützen, weil dieser das Gerücht weitergetragen hatte. Sogleich offenbarte Allah diesen Vers: „Liebt ihr es denn nicht, dass Allah euch vergibt?“ Abū Bakr rief sofort „Doch, bei Allah!“ und nahm die Unterstützung wieder auf.",
      it: "‘Ā’ishah narrò che dopo la sua assoluzione Abū Bakr giurò di non sostenere più il parente povero Mistah per aver ripetuto la voce. Allāh rivelò subito questo versetto chiedendo se non amassero il perdono di Allāh; Abū Bakr esclamò «Sì, per Allāh!» e ripristinò subito il sussidio.",
      id: "‘Aisyah meriwayatkan bahwa setelah kesuciannya dinyatakan, Abu Bakar bersumpah menghentikan nafkah bagi kerabat miskinnya Misthah karena ikut menyebarkan isu. Allah langsung menurunkan ayat anjuran memaafkan ini, dan Abu Bakar seketika berseru bahwa ia amat mencintai ampunan Allah lalu mengembalikan santunan tersebut.",
      ru: "‘Аиша передала, что после подтверждения её невиновности Абу Бакр поклялся больше не содержать своего бедного родственника Мистаха за участие в слухах. Аллах немедленно ниспослал этот аят: «Разве вы не желаете, чтобы Аллах простил вас?» — и Абу Бакр тут же воскликнул: «Конечно, клянусь Аллахом!» — и возобновил помощь."
    }
  },
  "24:31": {
    type: "hadith",
    versets: ["24:31"],
    plage: "24:31",
    source: "Sahīh Al-Bukhārī n°4758",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) rendit hommage à la promptitude exemplaire des premières femmes émigrées (Al-Muhājirāt) : dès l'instant où fut révélé ce verset ordonnant aux croyantes de rabattre leur voile (Khimār) sur leur poitrine, elles déchirèrent aussitôt leurs étoffes épaisses pour se couvrir sans le moindre délai.",
      en: "‘Ā’ishah praised the exemplary swiftness of the early emigrant women (Al-Muhājirāt): the very moment this verse was revealed instructing believing women to draw their headcovers over their chests, they immediately tore their thick garments to cover themselves without hesitation.",
      es: "‘Ā’ishah elogió la ejemplar prontitud de las primeras mujeres emigrantes (Al-Muhājirāt): en cuanto descendió esta aleya ordenando cubrirse el pecho con el velo, rasgaron de inmediato sus mantos para obedecer sin vacilar.",
      ar: "عن عائشة رضي الله عنها أنها أثنت على نساء المهاجرات الأول؛ فما إن نزل قوله تعالى: ﴿وَلْيَضْرِبْنَ بِخُمُرِهِنَّ عَلَىٰ جُيُوبِهِنَّ﴾ حتى شققن مروطهن فاختمرن بها فورًا استجابةً سريعةً لأمر الله.",
      de: "‘Ā’ishah lobte die vorbildliche Folgsamkeit der ersten Auswanderinnen (Al-Muhājirāt): Im selben Augenblick, als dieser Vers offenbart wurde, zerrissen sie ihre dicken Tücher und bedeckten sich unverzüglich.",
      it: "‘Ā’ishah elogiò la prontezza esemplare delle prime donne emigrate (Al-Muhājirāt): nell'istante stesso in cui scese questo versetto, strapparono subito i loro drappi spessi per coprirsi senza alcuna esitazione.",
      id: "‘Aisyah memuji kesegeraan para wanita Muhajirin pertama: begitu ayat perintah mengulurkan kerudung ke dada ini turun, mereka langsung merobek kain tebal mereka untuk segera menutupinya tanpa menunda.",
      ru: "‘Аиша восхвалила образцовую покорность первых переселенок (мухаджирок): как только был ниспослан этот аят, они немедленно разорвали свои плотные покрывала и укрылись ими без малейшего промедления."
    }
  },
  "24:33": {
    type: "sabab",
    versets: ["24:33"],
    plage: "24:33",
    source: "Sahīh Muslim n°3029",
    degre: "Sahīh",
    texte: {
      fr: "Jābir ibn ‘Abdillāh (qu'Allāh les agrée) rapporte que le chef des hypocrites ‘Abdullāh ibn Ubayy ibn Salūl possédait deux servantes qu'il cherchait à contraindre à la prostitution pour en tirer un gain matériel. Lorsqu'elles s'en plaignirent au Prophète ﷺ pour préserver leur chasteté, Allāh révéla aussitôt ce verset interdisant formellement toute contrainte à la prostitution et assurant celles qui y auraient été forcées de Son pardon et de Sa miséricorde.",
      en: "Jābir ibn ‘Abdillāh narrated that the hypocrite leader ‘Abdullāh ibn Ubayy sought to force two of his maidservants into prostitution for worldly gain. When they sought protection to preserve their chastity, Allāh immediately revealed this verse strictly prohibiting forcing them and assuring any coerced woman of His forgiveness and mercy.",
      es: "Yābir ibn ‘Abdillāh relató que el hipócrita ‘Abdullāh ibn Ubayy pretendía forzar a dos sirvientas a la prostitución por lucro. Al buscar ellas amparo para preservar su castidad, Allah reveló al instante esta aleya prohibiendo tajantemente tal coacción y asegurando Su perdón y misericordia a quien fuera forzada.",
      ar: "عن جابر بن عبد الله رضي الله عنهما أن رأس المنافقين عبد الله بن أُبيّ أراد إكراه جاريتين له على البغاء طلبًا للمال، فشكتا ذلك حفاظًا على عفافهما فأنزل الله هذه الآية محرّمًا الإكراه على البغاء تحريمًا قاطعًا ومبشّرًا المُكرَهات بالمغفرة والرحمة.",
      de: "Dschābir ibn ‘Abdillāh berichtete, dass der Heuchler ‘Abdullāh ibn Ubayy zwei Mägde aus Gewinnsucht zur Prostitution zwingen wollte. Als sie Schutz für ihre Keuschheit suchten, offenbarte Allah sofort diesen Vers, der jeden Zwang streng untersagte.",
      it: "Jābir ibn ‘Abdillāh narrò che l'ipocrita ‘Abdullāh ibn Ubayy voleva costringere due serve alla prostituzione per lucro. Quando chiesero tutela per la loro castità, Allāh rivelò subito questo versetto vietando ogni coercizione e assicurando perdono e misericordia alle vittime.",
      id: "Jabir bin ‘Abdillah meriwayatkan bahwa tokoh munafik ‘Abdullah bin Ubay hendak memaksa dua budak wanitanya melacur demi keuntungan dunia. Ketika mereka mengadu demi menjaga kehormatan, Allah segera menurunkan ayat yang melarang keras pemaksaan tersebut.",
      ru: "Джабир ибн ‘Абдуллах передал, что лицемер ‘Абдуллах ибн Убайй пытался принудить двух невольниц к распутству ради выгоды. Когда они обратились за защитой своего целомудрия, Аллах немедленно ниспослал этот аят, строго запретив принуждение и даровав прощение принуждённым."
    }
  }
};

// Auto-contrôle strict avant écriture (8 langues + champs obligatoires)
const LANGUES_REQ = ['fr', 'en', 'es', 'ar', 'de', 'it', 'id', 'ru'];
for (const [cle, rec] of Object.entries(LOT_06_ISRA_NUR)) {
  if (!rec.type || !rec.source || !rec.degre || !Array.isArray(rec.versets) || !rec.texte) {
    throw new Error(`Structure invalide pour ${cle}`);
  }
  for (const lg of LANGUES_REQ) {
    if (!rec.texte[lg] || typeof rec.texte[lg] !== 'string' || rec.texte[lg].trim().length < 20) {
      throw new Error(`Texte manquant ou trop court pour ${cle} [${lg}]`);
    }
  }
}

Object.assign(data.recits, LOT_06_ISRA_NUR);
data.version = (data.version || 1) + 1;

const jsonFinal = JSON.stringify(data, null, 2);
JSON.parse(jsonFinal);
writeSafe(asbabPath, jsonFinal);

let worker = fs.readFileSync(workerPath, 'utf8');
worker = worker.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
writeSafe(workerPath, worker);

const nbRecits = Object.keys(data.recits).length;
const nbVersets = Object.values(data.recits).reduce((acc, r) => acc + (Array.isArray(r.versets) ? r.versets.length : 1), 0);
console.log(`✅ Lot 6 (Sourates 17 à 24) validé et intégré ! Total actuel : ${nbRecits} récits couvrant ${nbVersets} versets en 8 langues.`);
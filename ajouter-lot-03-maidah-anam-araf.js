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

const LOT_03_MAIDAH_ANAM_ARAF = {
  "5:3": {
    type: "sabab",
    versets: ["5:3"],
    plage: "5:3",
    source: "Sahīh Al-Bukhārī n°45, n°4606 & Sahīh Muslim n°3017",
    degre: "Sahīh",
    texte: {
      fr: "Un homme parmi les Juifs vint dire à ‘Umar ibn Al-Khattāb que si ce verset sur le parachèvement de la religion leur avait été révélé, ils auraient fait de ce jour une fête. ‘Umar lui répondit qu'il connaissait exactement le jour et le lieu de sa descente : il fut révélé au Messager d'Allāh ﷺ un vendredi, lors de son stationnement à ‘Arafāt pendant le Pèlerinage d'Adieu.",
      en: "A Jewish man told ‘Umar ibn Al-Khattāb that had this verse about the perfection of religion been revealed to them, they would have taken that day as a festival. ‘Umar replied that he knew the exact day and place it descended: it was revealed to the Messenger of Allāh ﷺ while he was standing at ‘Arafāt on a Friday during the Farewell Pilgrimage.",
      es: "Un hombre judío comentó a ‘Umar ibn Al-Khattāb que si esa aleya sobre la culminación de la religión les hubiera sido revelada, habrían tomado aquel día como festividad. ‘Umar respondió que conocía con exactitud cuándo y dónde descendió: fue revelada al Mensajero de Allah ﷺ un viernes en ‘Arafāt durante la Peregrinación de Despedida.",
      ar: "جاء رجل من اليهود إلى عمر بن الخطاب رضي الله عنه فذكر أنهم لو نزلت عليهم هذه الآية لاتخذوا يومها عيدًا، فأجابه عمر بأنه يعلم اليوم والمكان الذي نزلت فيه؛ فقد نزلت على النبي ﷺ وهو واقف بعرفة يوم جمعة في حجة الوداع.",
      de: "Ein jüdischer Mann sagte zu ‘Umar ibn Al-Khattāb, hätten sie diesen Vers über die Vollendung der Religion erhalten, hätten sie jenen Tag zu einem Festtag gemacht. ‘Umar erwiderte, er kenne genau Tag und Ort seiner Offenbarung: Er wurde dem Gesandten Allahs ﷺ an einem Freitag in ‘Arafāt während der Abschiedspilgerfahrt offenbart.",
      it: "Un uomo ebreo disse a ‘Umar ibn Al-Khattāb che se questo versetto sul compimento della religione fosse stato rivelato a loro, avrebbero reso quel giorno una festa. ‘Umar rispose di conoscere esattamente giorno e luogo: scese sul Messaggero di Allāh ﷺ di venerdì mentre sostava a ‘Arafāt durante il Pellegrinaggio d'Addio.",
      id: "Seorang Yahudi berkata kepada ‘Umar bin Al-Khaththab bahwa seandainya ayat penyempurnaan agama ini turun kepada mereka, tentu hari itu akan dijadikan hari raya. ‘Umar menjawab bahwa ia tahu persis waktu dan tempat turunnya, yakni pada hari Jumat saat Nabi ﷺ wukuf di ‘Arafah ketika Haji Wada.",
      ru: "Один иудей сказал ‘Умару ибн аль-Хаттабу, что если бы этот аят о завершении религии был ниспослан им, они сделали бы тот день праздником. ‘Умар ответил, что точно знает день и место его ниспослания: он был открыт Посланнику Аллаха ﷺ в пятницу во время стояния на ‘Арафате в Прощальном паломничестве."
    }
  },
  "5:6": {
    type: "sabab",
    versets: ["5:6"],
    plage: "5:6",
    source: "Sahīh Al-Bukhārī n°334, n°4607 & Sahīh Muslim n°367",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) rapporte que durant un voyage avec le Prophète ﷺ, son collier se perdit dans le désert, ce qui immobilisa la troupe dans un lieu sans eau. Lorsque l'heure de la prière arriva, Allāh révéla la prescription des ablutions sèches (At-Tayammum) comme allègement permanent pour toute la communauté.",
      en: "‘Ā’ishah (may Allāh be pleased with her) narrated that during a journey with the Prophet ﷺ, her necklace was lost in the desert, causing the group to halt in a waterless area. When prayer time arrived without water, Allāh revealed the ruling of dry ablution (Tayammum) as a lasting ease for the entire community.",
      es: "‘Ā’ishah relató que durante un viaje con el Profeta ﷺ perdió su collar en el desierto, deteniéndose la caravana en un lugar sin agua. Al llegar la hora de la oración, Allah reveló la normativa de la ablución seca (Tayammum) como facilidad permanente para toda la comunidad.",
      ar: "عن عائشة رضي الله عنها أن عقدها انقطع في سفر مع النبي ﷺ فأقام الناس لطلبه على غير ماء، فلما حضرت الصلاة أنزل الله آية التيمم تيسيرًا ورحمةً للأمة كلها.",
      de: "‘Ā’ishah berichtete, dass während einer Reise mit dem Propheten ﷺ ihre Halskette in der Wüste verloren ging und die Gruppe an einem wasserlosen Ort anhielt. Zur Gebetszeit offenbarte Allah die Regelung der trockenen Waschung (Tayammum) als dauerhafte Erleichterung.",
      it: "‘Ā’ishah narrò che durante un viaggio con il Profeta ﷺ la sua collana si smarrì nel deserto, fermando il gruppo in un luogo privo d'acqua. Giunta l'ora della preghiera, Allāh rivelò la norma dell'abluzione secca (Tayammum) come facilitazione per l'intera comunità.",
      id: "‘Aisyah meriwayatkan bahwa dalam perjalanan bersama Nabi ﷺ kalungnya hilang di padang pasir sehingga rombongan berhenti di tempat tanpa air. Ketika waktu shalat tiba, Allah menurunkan hukum tayamum sebagai kemudahan bagi seluruh umat.",
      ru: "‘Аиша передала, что во время путешествия с Пророком ﷺ в пустыне потерялось её ожерелье, и отряд остановился в безводной местности. Когда настало время молитвы, Аллах ниспослал предписание о сухом очищении (тайаммуме) как облегчение для всей общины."
    }
  },
  "5:67": {
    type: "hadith",
    versets: ["5:67"],
    plage: "5:67",
    source: "Sahīh Al-Bukhārī n°4612 & Sahīh Muslim n°177",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) affirma avec force que quiconque prétendrait que le Prophète Muhammad ﷺ a dissimulé une quelconque partie de ce qui lui a été révélé commettrait un grave mensonge contre Allāh, en citant cet ordre divin de transmettre l'intégralité du Message sans rien omettre.",
      en: "‘Ā’ishah (may Allāh be pleased with her) emphatically stated that anyone claiming Prophet Muhammad ﷺ concealed even a single part of the Revelation would be fabricating a grave lie against Allāh, citing this divine command to convey the entire Message faithfully.",
      es: "‘Ā’ishah afirmó con rotundidad que quien sostuviera que el Profeta Muhammad ﷺ ocultó alguna parte de la Revelación cometería una grave falsedad contra Allah, apoyándose en este mandato divino de transmitir íntegro todo el Mensaje.",
      ar: "أكّدت عائشة رضي الله عنها أن من زعم أن النبي ﷺ كتم شيئًا مما أُنزل عليه فقد أعظم على الله الفرية، مستدلةً بهذه الآية الكريمة التي تأمر بتبليغ الرسالة كاملةً.",
      de: "‘Ā’ishah betonte nachdrücklich, dass jeder, der behauptet, der Prophet Muhammad ﷺ habe irgendeinen Teil der Offenbarung verschwiegen, eine schwere Lüge über Allah verbreitet, und verwies auf diesen göttlichen Auftrag zur vollständigen Übermittlung der Botschaft.",
      it: "‘Ā’ishah affermò con fermezza che chiunque sostenesse che il Profeta Muhammad ﷺ abbia celato una parte della Rivelazione direbbe una grave menzogna contro Allāh, citando questo ordine divino di trasmettere integralmente il Messaggio.",
      id: "‘Aisyah menegaskan bahwa siapa pun yang mengklaim Nabi Muhammad ﷺ menyembunyikan sebagian wahyu telah membuat kedustaan besar atas nama Allah, seraya merujuk perintah penyampaian risalah secara utuh dalam ayat ini.",
      ru: "‘Аиша твёрдо заявила, что любой, кто утверждает, будто Пророк Мухаммад ﷺ скрыл хоть какую-то часть откровения, возводит великую ложь на Аллаха, приведя в довод этот аят о полной передаче Послания."
    }
  },
  "5:87": {
    type: "sabab",
    versets: ["5:87"],
    plage: "5:87",
    source: "Sahīh Al-Bukhārī n°4615 & Sahīh Muslim n°1404",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd rapporte que lors d'une expédition où ils étaient loin de leurs épouses, certains jeunes Compagnons demandèrent au Prophète ﷺ s'ils devaient renoncer radicalement au mariage en se mutilant. Le Prophète ﷺ le leur interdit formellement, puis récita ce verset défendant aux croyants de s'interdire les bonnes choses licites qu'Allāh leur a accordées.",
      en: "‘Abdullāh ibn Mas‘ūd narrated that during an expedition away from their wives, some companions asked the Prophet ﷺ about extreme self-denial through castration. The Prophet ﷺ strictly forbade it and then recited this verse prohibiting believers from declaring unlawful the good, lawful things Allāh has permitted.",
      es: "‘Abdullāh ibn Mas‘ūd relató que durante una expedición lejos de sus esposas, algunos compañeros preguntaron al Profeta ﷺ sobre la abstinencia extrema mediante la castración. El Profeta ﷺ se lo prohibió terminantemente y recitó esta aleya contra prohibirse lo bueno que Allah ha hecho lícito.",
      ar: "عن عبد الله بن مسعود رضي الله عنه أنهم كانوا في غزوة مع النبي ﷺ وليس معهم نساء فسألوه عن الاختصاء، فنهاهم ﷺ عن ذلك وتلا هذه الآية نهيًا عن تحريم الطيبات التي أحلّها الله.",
      de: "‘Abdullāh ibn Mas‘ūd berichtete, dass einige Gefährten auf einem Feldzug fern ihrer Ehefrauen den Propheten ﷺ nach extremer Enthaltsamkeit fragten. Der Prophet ﷺ untersagte dies streng und rezitierte diesen Vers gegen das Verbieten der guten Dinge, die Allah erlaubt hat.",
      it: "‘Abdullāh ibn Mas‘ūd narrò che durante una spedizione lontani dalle mogli alcuni compagni chiesero al Profeta ﷺ se potessero imporsi una rinuncia estrema. Il Profeta ﷺ lo vietò categoricamente e recitò questo versetto che proibisce di dichiarare illecito ciò che Allāh ha reso lecito.",
      id: "‘Abdullah bin Mas‘ud meriwayatkan bahwa dalam suatu perjalanan perang jauh dari istri, sebagian sahabat bertanya kepada Nabi ﷺ tentang mengebiri diri. Nabi ﷺ melarangnya dengan tegas lalu membacakan ayat larangan mengharamkan hal-hal baik yang telah Allah halalkan.",
      ru: "‘Абдуллах ибн Мас‘уд передал, что во время похода вдали от жён некоторые сподвижники спросили Пророка ﷺ о крайнем воздержании через оскопление. Пророк ﷺ строго запретил это и прочёл этот аят, запрещающий объявлять запретным то благое, что дозволил Аллах."
    }
  },
  "5:90": {
    type: "sabab",
    versets: ["5:90", "5:91"],
    plage: "5:90–91",
    source: "Sahīh Al-Bukhārī n°4617, n°4620 & Sahīh Muslim n°1980",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik rapporte qu'il servait encore une boisson fermentée chez Abū Talhah lorsqu'un crieur parcourut Médine en annonçant l'interdiction définitive des boissons enivrantes suite à la révélation de ces versets. Abū Talhah ordonna immédiatement de tout répandre dehors, si bien que le vin coula dans les rues de Médine tant l'obéissance des Compagnons fut instantanée.",
      en: "Anas ibn Mālik narrated that he was serving a fermented drink at Abū Talhah's home when an announcer proclaimed across Madinah that intoxicants had been permanently forbidden by these verses. Abū Talhah immediately ordered him to pour it all out, and the streets of Madinah ran with spilled wine due to the Companions' instant obedience.",
      es: "Anas ibn Mālik relató que servía bebida fermentada en casa de Abū Talhah cuando un pregonero anunció en Medina la prohibición definitiva del alcohol tras revelarse estas aleyas. Abū Talhah ordenó derramarla al instante, corriendo el vino por las calles de Medina como muestra de su obediencia inmediata.",
      ar: "عن أنس بن مالك رضي الله عنه أنه كان يسقي القوم في بيت أبي طلحة حين نادى منادٍ في المدينة بأن الخمر قد حُرّمت بنزول هاتين الآيتين، فأمر أبو طلحة فورًا بإراقتها حتى جرت الخمر في سكك المدينة سرعةً في الاستجابة لأمر الله.",
      de: "Anas ibn Mālik berichtete, dass er gerade im Haus von Abū Talhah vergorene Getränke ausschenkte, als ein Ausrufer in Medina das endgültige Alkoholverbot verkündete. Abū Talhah ließ sofort alles ausschütten, sodass der Wein vor raschem Gehorsam durch die Gassen Medinas floss.",
      it: "Anas ibn Mālik narrò che stava servendo bevande fermentate in casa di Abū Talhah quando un banditore annunciò a Medina il divieto definitivo degli inebrianti. Abū Talhah ordinò subito di versare tutto fuori, tanto che il vino scorse nelle vie di Medina per l'obbedienza immediata dei Compagni.",
      id: "Anas bin Malik meriwayatkan bahwa ia sedang menuangkan minuman keras di rumah Abu Thalhah ketika seorang penyeru di Madinah mengumumkan pengharaman khamar secara mutlak. Abu Thalhah langsung menyuruh menumpahkannya hingga khamar mengalir di jalanan Madinah.",
      ru: "Анас ибн Малик передал, что он разливал хмельной напиток в доме Абу Тальхи, когда глашатай объявил по всей Медине о полном запрете вина после ниспослания этих аятов. Абу Тальха немедленно велел вылить всё на улицу, и вино потекло по переулкам Медины."
    }
  },
  "5:93": {
    type: "sabab",
    versets: ["5:93"],
    plage: "5:93",
    source: "Sahīh Al-Bukhārī n°4620 & Sahīh Muslim n°1980",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik rapporte qu'au moment où les boissons enivrantes furent interdites, certains croyants s'inquiétèrent du sort de leurs compagnons morts avant cette interdiction — notamment des martyrs d'Uhud — qui en avaient consommé lorsqu'elle était encore permise. Allāh révéla aussitôt ce verset pour les rassurer : aucun reproche ne pèse sur ceux qui ont cru et œuvré dans le bien avant l'entrée en vigueur de l'interdiction.",
      en: "Anas ibn Mālik narrated that once intoxicants were prohibited, believers worried about companions who had already passed away—such as martyrs of Uhud—having consumed them before the prohibition was revealed. Allāh immediately revealed this verse assuring them that no blame rests upon righteous believers for what they consumed prior to the ban.",
      es: "Anas ibn Mālik relató que tras prohibirse el alcohol, algunos creyentes se preocuparon por los compañeros fallecidos antes de la prohibición que lo habían consumido siendo lícito. Allah reveló enseguida esta aleya tranquilizándolos: no hay culpa para quienes creyeron y obraron bien antes del veto.",
      ar: "عن أنس بن مالك رضي الله عنه أنه لما حُرّمت الخمر تساءل بعض الناس عن حال إخوانهم الذين ماتوا قبل التحريم وقد شربوها، فأنزل الله هذه الآية طمأنةً لهم بأنه لا جناح على المؤمنين المتقين فيما طَعِموا قبل نزول التحريم.",
      de: "Anas ibn Mālik berichtete, dass die Gläubigen nach dem Alkoholverbot besorgt nach dem Schicksal jener Gefährten fragten, die zuvor verstorben waren. Sogleich offenbarte Allah diesen Vers, um zu versichern, dass auf rechtschaffenen Gläubigen keine Schuld für die Zeit vor dem Verbot lastet.",
      it: "Anas ibn Mālik narrò che dopo il divieto degli alcolici alcuni credenti si preoccuparono per i compagni deceduti prima del divieto. Allāh rivelò subito questo versetto per rassicurarli che nessuna colpa grava sui credenti pii per quanto consumato prima della proibizione.",
      id: "Anas bin Malik meriwayatkan bahwa setelah khamar diharamkan, sebagian orang mengkhawatirkan nasib saudara-saudara mereka yang wafat sebelumnya. Allah segera menurunkan ayat ini untuk menenangkan bahwa tidak ada dosa bagi orang beriman atas apa yang dikonsumsi sebelum larangan turun.",
      ru: "Анас ибн Малик передал, что после запрета вина верующие обеспокоились участью сподвижников, умерших до этого запрета. Аллах немедленно ниспослал этот аят, успокоив их тем, что на праведных верующих нет греха за употреблённое до запрета."
    }
  },
  "5:101": {
    type: "sabab",
    versets: ["5:101"],
    plage: "5:101",
    source: "Sahīh Al-Bukhārī n°4621, n°4622 & Sahīh Muslim n°2359",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik rapporte que le Prophète ﷺ fut un jour vivement contrarié par l'insistance de certaines personnes à poser des questions indiscrètes ou superflues. Monté en chaire, il déclara qu'il répondrait à toute question ; un homme demanda alors qui était son véritable père, et d'autres posèrent des questions embarrassantes, si bien que ‘Umar s'agenouilla en implorant la satisfaction d'Allāh. C'est dans ce contexte que fut révélé ce verset mettant en garde contre les questions excessives susceptibles de causer peine ou contrainte.",
      en: "Anas ibn Mālik narrated that the Prophet ﷺ was displeased by people persistently asking unnecessary or probing questions. Ascending the pulpit, he offered to answer whatever they asked, prompting awkward inquiries until ‘Umar knelt expressing contentment with Allāh and Islam. This verse was revealed cautioning believers against excessive questioning that could bring them hardship.",
      es: "Anas ibn Mālik relató que el Profeta ﷺ se disgustó por la insistencia en hacer preguntas innecesarias o indiscretas; tras responder desde el púlpito a varias cuestiones delicadas y arrodillarse ‘Umar suplicando la complacencia de Allah, descendió esta aleya advirtiendo contra preguntar en exceso sobre asuntos que podrían perjudicarles.",
      ar: "عن أنس بن مالك رضي الله عنه أن الناس أكثروا المسائل على النبي ﷺ حتى غضب وصعد المنبر فأجاب عن أسئلة محرجة لبعض الحاضرين، فبرك عمر رضي الله عنه معلنًا الرضا بالله وبالإسلام وبمحمد ﷺ، ونزلت هذه الآية نهيًا عن كثرة السؤال عما قد يسوء السائل أو يشق عليه.",
      de: "Anas ibn Mālik berichtete, dass der Prophet ﷺ über übermäßiges und unnötiges Ausfragen verstimmt war und auf der Kanzel heikle Fragen beantwortete, bis ‘Umar niederkniete und seine Zufriedenheit mit Allah bekannte. In diesem Zusammenhang wurde dieser Vers als Warnung vor unnötigen Fragen offenbart.",
      it: "Anas ibn Mālik narrò che il Profeta ﷺ si rattristò per l'insistenza in domande superflue o indiscrete; dopo aver risposto dal pulpito a quesiti imbarazzanti mentre ‘Umar si inginocchiava invocando il compiacimento di Allāh, scese questo versetto che mette in guardia dall'eccesso di domande gravose.",
      id: "Anas bin Malik meriwayatkan bahwa Nabi ﷺ sempat gusar karena banyaknya pertanyaan yang tidak perlu hingga beliau menjawab beberapa pertanyaan sensitif di atas mimbar dan ‘Umar berlutut memohon keridaan Allah. Ayat ini pun turun memperingatkan agar tidak berlebihan bertanya tentang hal yang memberatkan.",
      ru: "Анас ибн Малик передал, что Пророк ﷺ разгневался из-за чрезмерных и ненужных расспросов; поднявшись на минбар, он ответил на несколько неудобных вопросов, пока ‘Умар не опустился на колени, выражая довольство Аллахом. В этом контексте был ниспослан данный аят, предостерегающий от лишних вопросов."
    }
  },
  "5:116": {
    type: "hadith",
    versets: ["5:116", "5:117"],
    plage: "5:116–117",
    source: "Sahīh Al-Bukhārī n°4625, n°4626 & Sahīh Muslim n°2860",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās rapporte que le Messager d'Allāh ﷺ rappela dans un sermon qu'au Jour de la Résurrection, certains individus seront écartés de son Bassin parce qu'ils auront dévié après son départ. Le Prophète ﷺ expliqua qu'il prononcera alors la même réponse humble que le serviteur vertueux ‘Īsā (Jésus) dans le verset 117 : il fut témoin parmi eux tant qu'il demeura à leurs côtés, puis Allāh Seul demeura leur Observateur après son rappel.",
      en: "Ibn ‘Abbās narrated that the Messenger of Allāh ﷺ mentioned in a sermon that on the Day of Resurrection some people who strayed after him will be turned away from his Pool. The Prophet ﷺ stated he would respond just as the righteous servant ‘Īsā (Jesus) does in verse 117: he was a witness over them while he remained among them, and Allāh alone watched over them afterward.",
      es: "Ibn ‘Abbās relató que el Profeta ﷺ anunció que el Día de la Resurrección algunas personas que se desviaron tras su partida serán apartadas de su Estanque, y que él responderá con la misma humildad que ‘Īsā (Jesús) en la aleya 117: fue testigo mientras estuvo entre ellos, y luego solo Allah vigiló sus actos.",
      ar: "عن ابن عباس رضي الله عنهما أن النبي ﷺ خطب فذكر أن أناسًا يُصرفون عن حوضه يوم القيامة لأنهم بدّلوا بعده، فبيّن ﷺ أنه سيقول كما قال العبد الصالح عيسى عليه السلام في الآية ١١٧ بأنه كان عليهم شهيدًا ما دام فيهم، فلما توفاه الله كان هو الرقيب عليهم.",
      de: "Ibn ‘Abbās berichtete, dass der Gesandte Allahs ﷺ erklärte, am Tag der Auferstehung würden manche Abweichler von seinem Becken ferngehalten, und er werde dann ebenso sprechen wie der rechtschaffene Diener ‘Īsā (Jesus) in Vers 117: Er war Zeuge über sie, solange er unter ihnen weilte, und danach war allein Allah ihr Beobachter.",
      it: "Ibn ‘Abbās narrò che il Messaggero di Allāh ﷺ spiegò che nel Giorno della Resurrezione alcuni deviati saranno allontanati dal suo Bacino, e che egli risponderà come il servo giusto ‘Īsā (Gesù) nel versetto 117: fu testimone finché rimase tra loro, e in seguito solo Allāh vegliò su di loro.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa Nabi ﷺ menjelaskan pada Hari Kiamat sebagian orang yang menyimpang sepeninggal beliau akan dijauhkan dari Telaga beliau, lalu beliau mengucapkan perkataan hamba yang saleh ‘Isa dalam ayat 117 bahwa beliau hanya menjadi saksi selama berada di tengah mereka.",
      ru: "Ибн ‘Аббас передал, что Пророк ﷺ сообщил: в День Воскресения некоторых отступивших от его пути отгонят от его Водоёма, и тогда он произнесёт те же слова, что и праведный раб ‘Иса (Иисус) в 117-м аяте — он был свидетелем, пока находился среди них, а затем лишь Аллах наблюдал за ними."
    }
  },
  "6:52": {
    type: "sabab",
    versets: ["6:52"],
    plage: "6:52",
    source: "Sahīh Muslim n°2413",
    degre: "Sahīh",
    texte: {
      fr: "Sa‘d ibn Abī Waqqās rapporte qu'il se trouvait avec cinq autres Compagnons modestes — dont ‘Abdullāh ibn Mas‘ūd — auprès du Prophète ﷺ à La Mecque lorsque des notables polythéistes exigèrent que le Prophète ﷺ les éloigne pour qu'ils consentent à s'asseoir avec lui. Allāh fit aussitôt descendre ce verset interdisant catégoriquement de repousser les croyants sincères qui invoquent leur Seigneur matin et soir.",
      en: "Sa‘d ibn Abī Waqqās narrated that he and five other humble Companions—including ‘Abdullāh ibn Mas‘ūd—were sitting with the Prophet ﷺ in Makkah when polytheist elites demanded he send them away before they would sit with him. Allāh immediately revealed this verse strictly forbidding him from turning away sincere believers who call upon their Lord morning and evening.",
      es: "Sa‘d ibn Abī Waqqās relató que estaba junto a otros cinco Compañeros humildes —entre ellos Ibn Mas‘ūd— con el Profeta ﷺ cuando los notables politeístas exigieron apartarlos para sentarse con él. Allah reveló al instante esta aleya prohibiendo rechazar a los creyentes sinceros que invocan a su Señor mañana y tarde.",
      ar: "عن سعد بن أبي وقاص رضي الله عنه أنه كان مع خمسة من الصحابة الفقراء منهم ابن مسعود عند النبي ﷺ، فطلب كبراء المشركين طردهم ليجالسوه، فأنزل الله هذه الآية نهيًا قاطعًا عن طرد المؤمنين الصادقين الذين يدعون ربهم بالغداة والعشي.",
      de: "Sa‘d ibn Abī Waqqās berichtete, dass er mit fünf weiteren einfachen Gefährten – darunter Ibn Mas‘ūd – beim Propheten ﷺ saß, als vornehme Polytheisten verlangten, sie fortzuschicken. Sogleich offenbarte Allah diesen Vers, der es strikt untersagte, die aufrichtigen Gläubigen abzuweisen.",
      it: "Sa‘d ibn Abī Waqqās narrò che sedeva con altri cinque umili Compagni — tra cui Ibn Mas‘ūd — presso il Profeta ﷺ quando i notabili politeisti pretesero che li allontanasse. Allāh rivelò subito questo versetto vietando categoricamente di respingere i credenti sinceri che invocano il loro Signore mattina e sera.",
      id: "Sa‘d bin Abi Waqqash meriwayatkan bahwa ia bersama lima sahabat sederhana lainnya termasuk Ibnu Mas‘ud sedang duduk bersama Nabi ﷺ ketika para pembesar musyrik meminta beliau mengusir mereka. Allah langsung menurunkan ayat yang melarang keras mengusir orang-orang beriman tersebut.",
      ru: "Са‘д ибн Абу Ваккас передал, что он и ещё пятеро скромных сподвижников, включая Ибн Мас‘уда, сидели у Пророка ﷺ, когда знатные многобожники потребовали прогнать их. Аллах немедленно ниспослал этот аят, строго запретив отталкивать искренних верующих."
    }
  },
  "6:65": {
    type: "hadith",
    versets: ["6:65"],
    plage: "6:65",
    source: "Sahīh Al-Bukhārī n°4628",
    degre: "Sahīh",
    texte: {
      fr: "Jābir ibn ‘Abdillāh rapporte qu'à la révélation de ce verset évoquant la puissance d'Allāh d'envoyer un châtiment d'en haut ou de dessous leurs pieds, le Prophète ﷺ chercha à chaque fois refuge auprès de la Face d'Allāh. Puis, à la mention de la division en factions rivales s'infligeant mutuellement des torts, il indiqua que cette épreuve est moindre en gravité qu'un anéantissement total.",
      en: "Jābir ibn ‘Abdillāh narrated that when this verse was revealed mentioning Allāh's power to send punishment from above or beneath their feet, the Prophet ﷺ repeatedly sought refuge in the Face of Allāh. When the clause mentioning division into rival factions was revealed, he remarked that this trial is lighter than total destruction.",
      es: "Yābir ibn ‘Abdillāh relató que al revelarse la advertencia de un castigo desde arriba o desde abajo, el Profeta ﷺ buscó refugio en el Rostro de Allah en cada ocasión; y al mencionarse la división en facciones rivales, señaló que esa prueba era menos severa que la aniquilación total.",
      ar: "عن جابر بن عبد الله رضي الله عنهما أنه لما نزلت هذه الآية استعاذ النبي ﷺ بوجه الله عند ذكر العذاب من فوقهم ومن تحت أرجلهم، ولما نزل ذكر التفرّق شِيَعًا واختلاف البأس قال ﷺ إن ذلك أهون وأيسر من الهلاك العام.",
      de: "Dschābir ibn ‘Abdillāh berichtete, dass der Prophet ﷺ bei den Worten über eine Strafe von oben oder von unter den Füßen jeweils Zuflucht beim Angesicht Allahs suchte; bei der Erwähnung der Spaltung in streitende Gruppen sagte er, dies sei vergleichsweise leichter.",
      it: "Jābir ibn ‘Abdillāh narrò che alla rivelazione della minaccia di un castigo dall'alto o da sotto i piedi, il Profeta ﷺ cercò rifugio presso il Volto di Allāh; alla menzione della divisione in fazioni rivali osservò che tale prova è meno grave della distruzione totale.",
      id: "Jabir bin ‘Abdillah meriwayatkan bahwa ketika ayat tentang azab dari atas dan dari bawah kaki turun, Nabi ﷺ memohon perlindungan kepada Wajah Allah; sedangkan saat disebutkan perpecahan menjadi beberapa golongan, beliau menyatakan bahwa itu lebih ringan dibanding pemusnahan menyeluruh.",
      ru: "Джабир ибн ‘Абдуллах передал, что при ниспослании слов о наказании сверху и из-под ног Пророк ﷺ каждый раз прибегал к защите Лика Аллаха, а при упоминании разделения на враждующие группировки отметил, что это испытание легче всеобщего истребления."
    }
  },
  "6:82": {
    type: "hadith",
    versets: ["6:82"],
    plage: "6:82",
    source: "Sahīh Al-Bukhārī n°32, n°4629 & Sahīh Muslim n°124",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd rapporte que lorsque ce verset fut révélé — réservant la sécurité et la guidance à ceux qui n'ont pas mêlé leur foi d'injustice (Zulm) — les Compagnons s'alarmèrent, craignant qu'aucun être humain ne soit exempt de faute envers lui-même. Le Prophète ﷺ les rassura aussitôt en expliquant que le mot « injustice » désigne ici l'associationnisme (Shirk), à l'image des paroles du sage Luqmān dans la Sourate 31:13.",
      en: "‘Abdullāh ibn Mas‘ūd narrated that when this verse promised security to those who do not mix their faith with wrongdoing (Zulm), the Companions felt deeply distressed, asking who among them never wrongs himself. The Prophet ﷺ immediately reassured them, explaining that wrongdoing here specifically means associating partners with Allāh (Shirk), just as Luqmān advised his son in Sūrah 31:13.",
      es: "‘Abdullāh ibn Mas‘ūd relató que al descender esta aleya, los Compañeros se preocuparon pensando quién estaba libre de cometer alguna injusticia consigo mismo. El Profeta ﷺ los tranquilizó explicando que aquí «injusticia» (Zulm) se refiere específicamente a asociar copartícipes a Allah (Shirk), como enseñó Luqmān en 31:13.",
      ar: "عن عبد الله بن مسعود رضي الله عنه أنه لما نزلت هذه الآية شقّ ذلك على الصحابة وقالوا: وأيّنا لم يظلم نفسه؟ فطمأنهم النبي ﷺ مبيّنًا أن المراد بالظلم هنا هو الشرك بالله، واستدلّ بقول لقمان لابنه في سورة لقمان (٣١:١٣).",
      de: "‘Abdullāh ibn Mas‘ūd berichtete, dass die Gefährten bei diesem Vers besorgt fragten, wer von ihnen sich selbst kein Unrecht (Zulm) antue. Der Prophet ﷺ beruhigte sie sofort und erklärte, dass hier mit Unrecht ausschließlich die Beigesellung (Schirk) gemeint ist, wie in Sure 31:13.",
      it: "‘Abdullāh ibn Mas‘ūd narrò che alla discesa di questo versetto i Compagni si preoccuparono chiedendosi chi non commettesse mai ingiustizia verso sé stesso. Il Profeta ﷺ li rassicurò spiegando che qui per «ingiustizia» (Zulm) si intende il politeismo (Shirk), come nelle parole di Luqmān in 31:13.",
      id: "‘Abdullah bin Mas‘ud meriwayatkan bahwa para sahabat merasa berat saat ayat ini turun karena khawatir tak seorang pun luput dari berbuat zalim. Nabi ﷺ segera menenangkan mereka bahwa makna kezaliman dalam ayat ini adalah syirik, sebagaimana nasihat Luqman pada Surah 31:13.",
      ru: "‘Абдуллах ибн Мас‘уд передал, что сподвижники встревожились при ниспослании этого аята, спрашивая, кто же из них не поступал несправедливо по отношению к себе. Пророк ﷺ успокоил их, разъяснив, что под несправедливостью (зульм) здесь имеется в виду многобожие (ширк), как в словах Лукмана (31:13)."
    }
  },
  "6:151": {
    type: "hadith",
    versets: ["6:151"],
    plage: "6:151",
    source: "Sahīh Al-Bukhārī n°4634 & Sahīh Muslim n°2760",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd rapporte que le Messager d'Allāh ﷺ souligna qu'aucun être n'a une jalousie protectrice de l'honneur (Ghayrah) plus grande qu'Allāh : c'est précisément pour cette raison qu'Il a interdit dans ce verset toutes les turpitudes, qu'elles soient apparentes ou cachées, tout en aimant recevoir la louange de Ses serviteurs.",
      en: "‘Abdullāh ibn Mas‘ūd narrated that the Messenger of Allāh ﷺ explained that no one has greater protective honor (Ghayrah) than Allāh; for this very reason, He prohibited all indecencies—both open and secret—as stated in this verse.",
      es: "‘Abdullāh ibn Mas‘ūd relató que el Mensajero de Allah ﷺ explicó que nadie posee un celo protector del honor mayor que Allah, y precisamente por ello prohibió en esta aleya toda clase de indecencias, tanto públicas como ocultas.",
      ar: "عن عبد الله بن مسعود رضي الله عنه أن النبي ﷺ بيّن أنه ليس أحد أغير من الله، ومن أجل غيرته سبحانه حرّم الفواحش ما ظهر منها وما بطن كما جاء في هذه الآية.",
      de: "‘Abdullāh ibn Mas‘ūd berichtete, dass der Gesandte Allahs ﷺ erläuterte, niemand habe eine größere schützende Ehrliebe als Allah, weshalb Er in diesem Vers alle Schändlichkeiten – ob offenkundig oder verborgen – untersagt hat.",
      it: "‘Abdullāh ibn Mas‘ūd narrò che il Messaggero di Allāh ﷺ spiegò che nessuno ha una gelosia protettiva dell'onore maggiore di Allāh, e proprio per questo Egli ha proibito in questo versetto tutte le turpitudini, sia palesi sia nascoste.",
      id: "‘Abdullah bin Mas‘ud meriwayatkan sabda Nabi ﷺ bahwa tidak ada yang lebih cemburu menjaga kehormatan daripada Allah; karena itulah Dia mengharamkan segala perbuatan keji, baik yang tampak maupun yang tersembunyi.",
      ru: "‘Абдуллах ибн Мас‘уд передал слова Пророка ﷺ о том, что никто не обладает большей ревностью в защите чести, чем Аллах, и именно поэтому Он запретил в этом аяте всякую мерзость — как явную, так и тайную."
    }
  },
  "6:158": {
    type: "hadith",
    versets: ["6:158"],
    plage: "6:158",
    source: "Sahīh Al-Bukhārī n°4635, n°4636 & Sahīh Muslim n°157",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah rapporte que le Messager d'Allāh ﷺ expliqua le moment évoqué dans ce verset — lorsque surviendront certains grands signes de votre Seigneur et que la foi tardive ne profitera plus — comme étant le lever du soleil à l'occident : face à ce signe irrécusable de la fin des temps, tous les humains croiront, mais la porte du repentir sera alors close pour qui n'avait pas cru auparavant.",
      en: "Abū Hurayrah narrated that the Messenger of Allāh ﷺ explained the major sign mentioned in this verse—after which belated faith no longer benefits—as the rising of the sun from the west: upon witnessing it, all people will believe, yet repentance will no longer avail a soul that had not believed beforehand.",
      es: "Abū Hurayrah relató que el Profeta ﷺ explicó que el gran signo mencionado en esta aleya —tras el cual la fe tardía ya no beneficia— es la salida del sol por occidente: entonces todos creerán, pero ya no servirá la fe a quien no creyó previamente.",
      ar: "عن أبي هريرة رضي الله عنه أن النبي ﷺ فسّر المقصود بـ«بعض آيات ربك» في هذه الآية بطلوع الشمس من مغربها؛ فعند رؤيتها يؤمن الناس أجمعون ولكن لا ينفع نفسًا إيمانها إن لم تكن آمنت من قبل.",
      de: "Abū Hurayrah berichtete, dass der Gesandte Allahs ﷺ das in diesem Vers genannte große Zeichen – nach dem später Glaube nichts mehr nützt – als den Sonnenaufgang im Westen erklärte, bei dem das Tor der Reue geschlossen wird.",
      it: "Abū Hurayrah narrò che il Messaggero di Allāh ﷺ spiegò il grande segno evocato in questo versetto — dopo il quale la fede tardiva non giova più — come il sorgere del sole da occidente, momento in cui si chiude la porta del pentimento.",
      id: "Abu Hurairah meriwayatkan bahwa Nabi ﷺ menafsirkan sebagian tanda kebesaran Tuhan dalam ayat ini sebagai terbitnya matahari dari barat; saat itu semua orang akan beriman, namun tidak lagi bermanfaat bagi yang belum beriman sebelumnya.",
      ru: "Абу Хурайра передал, что Пророк ﷺ разъяснил упомянутые в этом аяте великие знамения как восход солнца с запада: увидев это, уверуют все люди, но запоздалая вера уже не принесёт пользы тем, кто не уверовал раньше."
    }
  },
  "7:31": {
    type: "sabab",
    versets: ["7:31", "7:32"],
    plage: "7:31–32",
    source: "Sahīh Muslim n°3028",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte qu'avant l'Islam, certaines tribus pratiquaient les tours rituels (Tawāf) autour de la Ka‘bah entièrement dévêtues, hommes et femmes, en invoquant des coutumes superstitieuses sur les vêtements. Allāh révéla alors ces deux versets abolissant définitivement cette pratique indigne, ordonnant de se vêtir dignement lors de toute prière et rappelant que les parures et bonnes subsistances qu'Il a créées sont licites.",
      en: "Ibn ‘Abbās (may Allāh be pleased with them) narrated that in pre-Islamic times some tribes performed Tawāf around the Ka‘bah unclothed due to superstitious customs about garments. Allāh revealed these two verses permanently abolishing that practice, commanding dignified attire at every place of worship, and affirming the lawfulness of His good provisions.",
      es: "Ibn ‘Abbās relató que antes del Islam algunas tribus realizaban la circunvalación alrededor de la Ka‘bah sin ropa por supersticiones sobre las vestiduras. Allah reveló estas dos aleyas aboliendo tal práctica, ordenando vestir con decoro al orar y confirmando la licitud de Sus buenos sustentos.",
      ar: "عن ابن عباس رضي الله عنهما أن بعض العرب في الجاهلية كانوا يطوفون بالبيت عراةً بسبب عادات جاهلية متعلقة بالثياب، فأنزل الله هاتين الآيتين إبطالًا لذلك وأمرًا بأخذ الزينة والستر عند كل مسجد وإباحة الطيبات.",
      de: "Ibn ‘Abbās berichtete, dass manche Stämme vor dem Islam aufgrund abergläubischer Bräuche unbekleidet um die Ka‘bah kreisten. Allah offenbarte diese beiden Verse, um diesen Brauch abzuschaffen, würdige Kleidung zum Gebet zu gebieten und Seine guten Gaben als erlaubt zu bestätigen.",
      it: "Ibn ‘Abbās narrò che in epoca preislamica alcune tribù compivano il giro rituale attorno alla Ka‘bah svestite per superstizione. Allāh rivelò questi due versetti abolendo tale usanza, ordinando un abbigliamento decoroso in ogni luogo di preghiera e confermando la liceità dei Suoi buoni doni.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa pada masa Jahiliyah sebagian orang melakukan thawaf mengelilingi Ka‘bah tanpa busana karena tradisi keliru. Maka Allah menurunkan dua ayat ini yang memerintahkan berpakaian indah dan sopan di setiap masjid serta menghalalkan rezeki yang baik.",
      ru: "Ибн ‘Аббас передал, что в доисламскую эпоху некоторые племена совершали обход вокруг Каабы обнажёнными из-за суеверий. Аллах ниспослал эти два аята, навсегда отменив такой обычай, повелев одеваться достойно при молитве и подтвердив дозволенность Своих благ."
    }
  },
  "7:143": {
    type: "hadith",
    versets: ["7:143"],
    plage: "7:143",
    source: "Sahīh Al-Bukhārī n°2411, n°4638 & Sahīh Muslim n°2373",
    degre: "Sahīh",
    texte: {
      fr: "Abū Sa‘īd Al-Khudrī et Abū Hurayrah rapportent qu'à la suite d'une dispute entre un musulman et un juif qui comparaient les mérites de Muhammad ﷺ et de Mūsā (Moïse), le Prophète ﷺ interdit par humilité d'établir des préférences dédaigneuses entre les Prophètes. Il mentionna qu'au Jour du Jugement, lorsque les créatures reprendront conscience après le souffle foudroyant, il trouvera peut-être Mūsā déjà accroché au pilier du Trône, car il avait déjà connu l'évanouissement terrestre du Mont Sinaï décrit dans ce verset.",
      en: "Abū Sa‘īd Al-Khudrī and Abū Hurayrah narrated that after a dispute comparing Muhammad ﷺ and Mūsā (Moses), the Prophet ﷺ humbly forbade belittling comparisons among prophets. He mentioned that on Judgment Day, when people regain consciousness after the thunderous blast, Mūsā might already be holding the Throne because he had already experienced the earthly swoon at Mount Sinai described in this verse.",
      es: "Abū Sa‘īd Al-Khudrī y Abū Hurayrah relataron que, tras una disputa comparando a Muhammad ﷺ con Mūsā (Moisés), el Profeta ﷺ prohibió comparaciones despectivas entre profetas y evocó este versículo: el Día del Juicio quizá Mūsā no sufra el desmayo final por haber experimentado ya el del Monte Sinaí.",
      ar: "عن أبي سعيد الخدري وأبي هريرة رضي الله عنهما أن النبي ﷺ نهى عن التفضيل بين الأنبياء على وجه الانتقاص، وذكر أنه حين يُصعق الناس يوم القيامة فقد يجد موسى عليه السلام ممسكًا بقائمة العرش لأنه قد جُوزي بصعقته في الدنيا المذكورة في هذه الآية.",
      de: "Abū Sa‘īd Al-Khudrī und Abū Hurayrah berichteten, dass der Prophet ﷺ abwertende Vergleiche zwischen den Propheten untersagte und auf diesen Vers verwies: Am Jüngsten Tag werde Mūsā möglicherweise bereits am Thron stehen, da ihm die Ohnmacht am Berg Sinai aus diesem Vers bereits angerechnet wurde.",
      it: "Abū Sa‘īd Al-Khudrī e Abū Hurayrah narrarono che il Profeta ﷺ vietò paragoni irrispettosi tra i profeti e richiamò questo versetto: nel Giorno del Giudizio forse Mosè sarà già desto presso il Trono, essendogli già bastato lo svenimento sul Monte Sinai narrato qui.",
      id: "Abu Sa‘id Al-Khudri dan Abu Hurairah meriwayatkan bahwa Nabi ﷺ melarang membanding-bandingkan para nabi dengan merendahkan, lalu menyinggung ayat ini bahwa pada Hari Kiamat bisa jadi Nabi Musa telah tersadar lebih dahulu di dekat ‘Arsy karena beliau sudah merasakan pingsan di Bukit Sinai.",
      ru: "Абу Са‘ид аль-Худри и Абу Хурайра передали, что Пророк ﷺ запретил пренебрежительно сравнивать пророков и упомянул этот аят: в День Суда Муса (Моисей), возможно, уже будет держаться за Трон, поскольку ему будет зачтено потрясение на горе Синай, описанное здесь."
    }
  },
  "7:180": {
    type: "hadith",
    versets: ["7:180"],
    plage: "7:180",
    source: "Sahīh Al-Bukhārī n°2736 & Sahīh Muslim n°2677",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ a enseigné qu'Allāh possède quatre-vingt-dix-neuf Noms sublimes (sans que Ses Noms ne s'y limitent), et que quiconque les apprend, en médite le sens et agit conformément à leurs implications en invoquant Allāh par eux entrera au Paradis.",
      en: "Abū Hurayrah (may Allāh be pleased with him) narrated that the Messenger of Allāh ﷺ taught that Allāh has ninety-nine sublime Names (not exhaustive of His perfection), and whoever learns them, reflects upon their meanings, and lives and supplicates by them will enter Paradise.",
      es: "Abū Hurayrah relató que el Mensajero de Allah ﷺ enseñó que Allah posee noventa y nueve Nombres sublimes, y que quien los aprende, medita su significado y obra e invoca a Allah conforme a ellos entrará en el Paraíso.",
      ar: "عن أبي هريرة رضي الله عنه أن النبي ﷺ أخبر أن لله تسعةً وتسعين اسمًا من أحصاها — أي حفظها وفهم معانيها وعمل بمقتضاها ودعا الله بها — دخل الجنة.",
      de: "Abū Hurayrah berichtete, dass der Gesandte Allahs ﷺ lehrte, Allah besitze neunundneunzig erhabene Namen, und wer sie lernt, ihre Bedeutung verinnerlicht und entsprechend handelt und Ihn damit anruft, wird ins Paradies eingehen.",
      it: "Abū Hurayrah narrò che il Messaggero di Allāh ﷺ insegnò che Allāh possiede novantanove Nomi sublimi, e chiunque li apprenda, ne comprenda il significato e agisca invocando Allāh con essi entrerà in Paradiso.",
      id: "Abu Hurairah meriwayatkan sabda Nabi ﷺ bahwa Allah memiliki sembilan puluh sembilan Nama yang indah; barang siapa menghafal, memahami, mengamalkan kandungannya, serta berdoa dengannya akan masuk Surga.",
      ru: "Абу Хурайра передал слова Пророка ﷺ о том, что у Аллаха есть девяносто девять прекрасных Имён, и всякий, кто выучит их, осмыслит их значение, будет жить в соответствии с ними и взывать ими к Аллаху, войдёт в Рай."
    }
  },
  "7:199": {
    type: "hadith",
    versets: ["7:199"],
    plage: "7:199",
    source: "Sahīh Al-Bukhārī n°4642, n°4643",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās rapporte que le bédouin ‘Uyaynah ibn Hisn entra un jour chez le calife ‘Umar et lui tint des propos durs et injustes. Alors que ‘Umar s'apprêtait à sévir, Al-Hurr ibn Qays lui récita ce verset commandant l'indulgence, l'injonction du bien et le fait de se détourner des ignorants : ‘Umar s'arrêta aussitôt, car il s'inclinait immédiatement devant le Livre d'Allāh. ‘Abdullāh ibn Az-Zubayr précise que ce verset a été révélé pour enseigner la noblesse de caractère envers les gens.",
      en: "Ibn ‘Abbās narrated that when the Bedouin ‘Uyaynah ibn Hisn spoke harshly to Caliph ‘Umar and ‘Umar nearly punished him, Al-Hurr ibn Qays recited this verse commanding forgiveness, enjoining good, and turning away from the ignorant. ‘Umar stopped immediately out of reverence for the Qur'an. ‘Abdullāh ibn Az-Zubayr added that this verse was revealed to teach noble conduct in dealing with people.",
      es: "Ibn ‘Abbās relató que cuando ‘Uyaynah habló con dureza al califa ‘Umar y este estuvo a punto de reprenderlo, Al-Hurr ibn Qays le recitó esta aleya sobre el perdón y apartarse de los ignorantes, y ‘Umar se detuvo al instante por respeto al Corán. Ibn Az-Zubayr añadió que descendió para enseñar la nobleza de carácter.",
      ar: "عن ابن عباس رضي الله عنهما أن عيينة بن حصن أغلظ القول للخليفة عمر بن الخطاب فهمّ عمر به، فتلا عليه الحر بن قيس هذه الآية فكفّ عمر فورًا وقوفًا عند كتاب الله، وذكر عبد الله بن الزبير أنها نزلت في أخلاق الناس ومعاملتهم بالعفو والرفق.",
      de: "Ibn ‘Abbās berichtete, dass der Kalif ‘Umar sofort innehielt, als man ihm gegenüber einem groben Beduinen diesen Vers über Nachsicht und das Abwenden von den Unwissenden rezitierte. ‘Abdullāh ibn Az-Zubayr ergänzte, der Vers lehre edlen Charakter im Umgang mit den Menschen.",
      it: "Ibn ‘Abbās narrò che il califfo ‘Umar si fermò all'istante di fronte a un uomo scortese non appena gli fu recitato questo versetto sull'indulgenza e sull'allontanarsi dagli ignoranti. ‘Abdullāh ibn Az-Zubayr precisò che il versetto insegna la nobiltà di carattere nei rapporti umani.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa Khalifah ‘Umar seketika menahan amarahnya terhadap seorang Badui yang bersikap kasar begitu ayat tentang memberi maaf dan berpaling dari orang jahil ini dibacakan kepadanya. ‘Abdullah bin Az-Zubair menjelaskan ayat ini turun mengenai keluhuran akhlak.",
      ru: "Ибн ‘Аббас передал, что халиф ‘Умар мгновенно сдержал свой гнев в ответ на грубость бедуина, как только ему прочли этот аят о снисходительности и отстранении от невежд. ‘Абдуллах ибн аз-Зубайр отметил, что аят ниспослан о благородстве нрава в отношениях с людьми."
    }
  }
};

Object.assign(data.recits, LOT_03_MAIDAH_ANAM_ARAF);
data.version = (data.version || 1) + 1;
writeSafe(asbabPath, JSON.stringify(data, null, 2));

let worker = fs.readFileSync(workerPath, 'utf8');
worker = worker.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
writeSafe(workerPath, worker);

const nbRecits = Object.keys(data.recits).length;
const nbVersets = Object.values(data.recits).reduce((acc, r) => acc + (Array.isArray(r.versets) ? r.versets.length : 1), 0);
console.log(`✅ Lot 3 (Sourates 5, 6 & 7) intégré ! Total actuel : ${nbRecits} récits Sahīh couvrant ${nbVersets} versets en 8 langues.`);
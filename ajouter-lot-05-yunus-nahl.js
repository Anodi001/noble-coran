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

const LOT_05_YUNUS_NAHL = {
  "10:26": {
    type: "hadith",
    versets: ["10:26"],
    plage: "10:26",
    source: "Sahīh Muslim n°181",
    degre: "Sahīh",
    texte: {
      fr: "Suhayb Ar-Rūmī (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ récita ce verset (« À ceux qui agissent en bien appartient la meilleure récompense et un surplus ») puis expliqua qu'une fois entrés au Paradis, un appel retentira demandant aux croyants s'ils souhaitent davantage encore. Le Voile sera alors levé, et rien ne leur sera plus cher que de contempler le Visage de leur Seigneur : c'est là « le surplus » (Az-Ziyādah).",
      en: "Suhayb Ar-Rūmī (may Allāh be pleased with him) narrated that the Messenger of Allāh ﷺ recited this verse ('For those who have done good is the best reward and even more') and explained that once the people of Paradise enter, Allāh will lift the Veil and nothing granted to them will be dearer than looking upon their Lord—that is 'the extra' (Az-Ziyādah).",
      es: "Suhayb Ar-Rūmī relató que el Mensajero de Allah ﷺ recitó esta aleya y explicó que, una vez en el Paraíso, se levantará el Velo y nada será más amado para los creyentes que contemplar a su Señor; ese es el «aumento» (Az-Ziyādah) prometido.",
      ar: "عن صهيب الرومي رضي الله عنه أن النبي ﷺ تلا هذه الآية ثم أخبر أن أهل الجنة إذا دخلوها يُكشف الحجاب فما أُعطوا شيئًا أحب إليهم من النظر إلى ربهم عز وجل، فالجنة هي «الحسنى» والنظر إلى وجه الله هو «الزيادة».",
      de: "Suhayb Ar-Rūmī berichtete, dass der Gesandte Allahs ﷺ diesen Vers rezitierte und erklärte, dass den Bewohnern des Paradieses der Schleier gelüftet wird und ihnen nichts lieber sein wird als der Anblick ihres Herrn – genau dies ist das „Mehr“ (Az-Ziyādah).",
      it: "Suhayb Ar-Rūmī narrò che il Messaggero di Allāh ﷺ recitò questo versetto spiegando che, una volta in Paradiso, verrà sollevato il Velo e nulla sarà più caro ai credenti del contemplare il loro Signore: è questo il «di più» (Az-Ziyādah).",
      id: "Shuhaib Ar-Rumi meriwayatkan bahwa Rasulullah ﷺ membaca ayat ini lalu menjelaskan bahwa setelah penghuni Surga masuk, tirai disingkapkan dan tidak ada nikmat yang lebih mereka cintai daripada memandang wajah Tuhan mereka; itulah makna ‘tambahan’ (Az-Ziyadah).",
      ru: "Сухайб ар-Руми передал, что Посланник Аллаха ﷺ прочёл этот аят и разъяснил: когда обитатели Рая войдут в него, завеса будет поднята, и ничто не будет для них милее, чем лицезреть своего Господа — это и есть обещанная «добавка» (аз-зияда)."
    }
  },
  "10:90": {
    type: "hadith",
    versets: ["10:90"],
    plage: "10:90",
    source: "Sahīh Al-Bukhārī n°2004, n°4680 & Sahīh Muslim n°1130",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte qu'à son arrivée à Médine, le Prophète ﷺ vit les Juifs jeûner le jour de ‘Āshūrā' (le 10 de Muharram) en expliquant que c'est le jour où Allāh sauva Mūsā (Moïse) et les Enfants d'Israël de Pharaon — épisode relaté dans ce verset. Le Prophète ﷺ déclara alors : « Nous sommes plus en droit de nous réclamer de Mūsā que vous ! », jeûna ce jour-là et encouragea à le jeûner.",
      en: "Ibn ‘Abbās (may Allāh be pleased with them) narrated that upon arriving in Madinah, the Prophet ﷺ saw the Jews fasting on the Day of ‘Āshūrā', explaining it was the day Allāh rescued Mūsā (Moses) and the Children of Israel from Pharaoh—as recounted in this verse. The Prophet ﷺ said: 'We have a closer right to Mūsā than you,' fasted that day, and encouraged fasting it.",
      es: "Ibn ‘Abbās relató que al llegar a Medina el Profeta ﷺ vio a los judíos ayunar el día de ‘Āshūrā' en gratitud por el día en que Allah salvó a Mūsā de Faraón —relatado en esta aleya—; el Profeta ﷺ afirmó tener mayor cercanía con Mūsā, ayunó ese día y recomendó hacerlo.",
      ar: "عن ابن عباس رضي الله عنهما أن النبي ﷺ قدم المدينة فرأى اليهود يصومون يوم عاشوراء شكرًا لله على نجاة موسى وبني إسرائيل من فرعون كما في هذه الآية، فقال ﷺ: «نحن أحق بموسى منكم»، فصامه وأمر بصيامه.",
      de: "Ibn ‘Abbās berichtete, dass der Prophet ﷺ bei seiner Ankunft in Medina die Juden am Tag von ‘Āshūrā' fasten sah, weil Allah an diesem Tag Mūsā vor Pharao rettete. Der Prophet ﷺ sagte: „Wir haben ein größeres Anrecht auf Mūsā als ihr“, fastete selbst und empfahl dieses Fasten.",
      it: "Ibn ‘Abbās narrò che giunto a Medina il Profeta ﷺ vide gli Ebrei digiunare il giorno di ‘Āshūrā' per celebrare la salvezza di Mosè dal Faraone narrata in questo versetto; il Profeta ﷺ affermò di avere maggior titolo verso Mosè, digiunò quel giorno e ne raccomandò il digiuno.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa setibanya di Madinah Nabi ﷺ melihat orang Yahudi berpuasa hari ‘Asyura karena hari itu Allah menyelamatkan Nabi Musa dari Fir‘aun sebagaimana kisah ayat ini; Nabi ﷺ pun bersabda bahwa kaum muslimin lebih berhak atas Musa, lalu berpuasa dan menganjurkannya.",
      ru: "Ибн ‘Аббас передал, что по прибытии в Медину Пророк ﷺ увидел, как иудеи постятся в день ‘Ашура в память о спасении Мусы от Фараона, упомянутом в этом аяте. Пророк ﷺ сказал: «Мы имеем больше прав на Мусу, чем вы», стал поститься в этот день и побудил к этому сподвижников."
    }
  },
  "11:5": {
    type: "sabab",
    versets: ["11:5"],
    plage: "11:5",
    source: "Sahīh Al-Bukhārī n°4681, n°4682",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte que ce verset fut révélé au sujet de personnes qui éprouvaient de la gêne à se dévêtir en privé ou lors de l'intimité conjugale par crainte de s'exposer face au ciel, ainsi que de ceux qui cherchaient à dissimuler leur hostilité au Prophète ﷺ en se détournant. Allāh rappela qu'Il connaît parfaitement ce qu'ils cachent autant que ce qu'ils montrent, même lorsqu'ils s'enveloppent de leurs vêtements.",
      en: "Ibn ‘Abbās (may Allāh be pleased with them) narrated that this verse was revealed regarding people who felt ashamed to uncover themselves in private facing the sky, as well as those who turned away to conceal their hostility. Allāh reminded them that He knows everything they hide and reveal, even when they cover themselves with their garments.",
      es: "Ibn ‘Abbās relató que esta aleya fue revelada respecto a quienes sentían pudor de descubrirse en privado frente al cielo o pretendían ocultar su hostilidad, recordando Allah que Él conoce por igual lo que ocultan y lo que manifiestan incluso al cubrirse con sus ropas.",
      ar: "عن ابن عباس رضي الله عنهما أن هذه الآية نزلت في أناس كانوا يستحيون أن يتخلّوا أو يفضوا إلى نسائهم فيستترون بثيابهم ظنًّا منهم أن ذلك يخفيهم، وفيمن كان يُسرّ العداوة للنبي ﷺ، فبيّن الله أنه يعلم ما يسرون وما يعلنون في كل حال.",
      de: "Ibn ‘Abbās berichtete, dass dieser Vers über Menschen offenbart wurde, die meinten, sich unter ihren Gewändern verbergen zu können oder ihre Feindseligkeit zu verheimlichen; Allah stellte klar, dass Er genau weiß, was sie verbergen und was sie offenlegen.",
      it: "Ibn ‘Abbās narrò che questo versetto fu rivelato riguardo a persone che credevano di potersi celare avvolgendosi nei propri abiti o nascondendo la loro ostilità: Allāh ricordò di conoscere pienamente sia ciò che celano sia ciò che palesano.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa ayat ini turun berkenaan dengan orang-orang yang mengira dapat bersembunyi dengan menutupi diri memakai pakaian atau menyembunyikan permusuhan; Allah menegaskan bahwa Dia Maha Mengetahui segala yang mereka rahasiakan maupun tampakkan.",
      ru: "Ибн ‘Аббас передал, что этот аят был ниспослан о людях, полагавших, будто можно укрыться, завернувшись в одежды, или скрыть свою враждебность: Аллах напомнил, что Ему ведомо всё, что они утаивают и что обнаруживают."
    }
  },
  "11:102": {
    type: "hadith",
    versets: ["11:102"],
    plage: "11:102",
    source: "Sahīh Al-Bukhārī n°4686 & Sahīh Muslim n°2583",
    degre: "Sahīh",
    texte: {
      fr: "Abū Mūsā Al-Ash‘arī (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ déclara : « Certes, Allāh accorde un délai à l'injuste ; mais lorsqu'Il le saisit, Il ne le laisse plus échapper ! » Puis le Prophète ﷺ récita ce verset : « Telle est la rigueur de la saisie de ton Seigneur lorsqu'Il saisit les cités injustes : Sa saisie est certes douloureuse et sévère. »",
      en: "Abū Mūsā Al-Ash‘arī (may Allāh be pleased with him) narrated that the Messenger of Allāh ﷺ said: 'Indeed, Allāh gives respite to the oppressor, until when He seizes him, He never lets him escape.' Then the Prophet ﷺ recited this verse: 'And thus is the seizure of your Lord when He seizes the cities while they are committing wrong.'",
      es: "Abū Mūsā Al-Ash‘arī relató que el Profeta ﷺ dijo: «Ciertamente Allah concede un plazo al opresor, pero cuando lo atrapa ya no lo deja escapar», y a continuación recitó esta aleya sobre el rigor del castigo de Allah contra las ciudades injustas.",
      ar: "عن أبي موسى الأشعري رضي الله عنه أن رسول الله ﷺ قال: «إن الله ليُملي للظالم حتى إذا أخذه لم يُفلته»، ثم قرأ هذه الآية الكريمة: ﴿وَكَذَٰلِكَ أَخْذُ رَبِّكَ إِذَا أَخَذَ الْقُرَىٰ وَهِيَ ظَالِمَةٌ إِنَّ أَخْذَهُ أَلِيمٌ شَدِيدٌ﴾.",
      de: "Abū Mūsā Al-Ash‘arī berichtete, dass der Gesandte Allahs ﷺ sagte: „Gewiss gewährt Allah dem Ungerechten Aufschub, doch wenn Er ihn ergreift, lässt Er ihn nicht mehr entkommen.“ Daraufhin rezitierte er diesen Vers.",
      it: "Abū Mūsā Al-Ash‘arī narrò che il Messaggero di Allāh ﷺ disse: «In verità Allāh concede respiro all'oppressore, ma quando lo afferra non lo lascia più sfuggire», e subito dopo recitò questo versetto.",
      id: "Abu Musa Al-Asy‘ari meriwayatkan sabda Rasulullah ﷺ: “Sesungguhnya Allah memberi tangguh kepada orang zalim, hingga apabila Dia mengazabnya maka tidak akan dilepaskan lagi”, lalu beliau membacakan ayat ini.",
      ru: "Абу Муса аль-Аш‘ари передал слова Посланника Аллаха ﷺ: «Поистине, Аллах даёт отсрочку несправедливому, но когда Он схватывает его, то уже не отпускает», после чего Пророк ﷺ прочёл этот аят."
    }
  },
  "11:114": {
    type: "sabab",
    versets: ["11:114"],
    plage: "11:114",
    source: "Sahīh Al-Bukhārī n°526, n°4687 & Sahīh Muslim n°2763",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd (qu'Allāh l'agrée) rapporte qu'un homme commit un péché (il embrassa une femme qui ne lui était pas licite) puis vint immédiatement voir le Prophète ﷺ, rongé par le remords, pour lui avouer sa faute. Allāh révéla alors ce verset : « Accomplis la prière aux deux extrémités du jour et à certaines heures de la nuit ; les bonnes actions dissipent les mauvaises. » L'homme demanda : « Ô Messager d'Allāh, cela est-il réservé à moi seul ? » Le Prophète ﷺ répondit : « Non, c'est pour l'ensemble de ma communauté ! »",
      en: "‘Abdullāh ibn Mas‘ūd (may Allāh be pleased with him) narrated that a man committed a sin by kissing a woman unlawful to him and came to the Prophet ﷺ filled with remorse. Allāh then revealed this verse: 'Establish prayer at the two ends of the day and at the approach of night; indeed, good deeds erase bad deeds.' When the man asked if this applied only to him, the Prophet ﷺ replied: 'No, it is for my entire Ummah!'",
      es: "‘Abdullāh ibn Mas‘ūd relató que un hombre cometió una falta al besar a una mujer ajena y acudió arrepentido al Profeta ﷺ. Entonces descendió esta aleya confirmando que la oración y las buenas obras borran las malas. Al preguntar si era solo para él, el Profeta ﷺ respondió que era para toda su comunidad.",
      ar: "عن عبد الله بن مسعود رضي الله عنه أن رجلًا أصاب من امرأة قُبلةً فأتى النبي ﷺ نادمًا تائبًا، فأنزل الله تعالى هذه الآية: ﴿إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ﴾، فقال الرجل: ألي هذا يا رسول الله؟ قال ﷺ: «لجميع أمتي كلهم».",
      de: "‘Abdullāh ibn Mas‘ūd berichtete, dass ein Mann eine Sünde beging, indem er eine ihm nicht erlaubte Frau küsste, und reumütig zum Propheten ﷺ kam. Daraufhin offenbarte Allah diesen Vers, dass Gebet und gute Taten schlechte Taten auslöschen – und der Prophet ﷺ versicherte, dies gelte für seine gesamte Gemeinschaft.",
      it: "‘Abdullāh ibn Mas‘ūd narrò che un uomo commise un peccato baciando una donna a lui non lecita e si presentò pentito al Profeta ﷺ. Allāh rivelò questo versetto affermando che la preghiera e le buone azioni cancellano le cattive, e il Profeta ﷺ confermò che vale per tutta la sua comunità.",
      id: "‘Abdullah bin Mas‘ud meriwayatkan bahwa seorang pria menyesal setelah mencium wanita yang bukan mahramnya lalu melapor kepada Nabi ﷺ. Maka turunlah ayat bahwa shalat dan kebaikan menghapus keburukan, dan Nabi ﷺ menegaskan hal itu berlaku bagi seluruh umatnya.",
      ru: "‘Абдуллах ибн Мас‘уд передал, что некий мужчина поцеловал постороннюю женщину и в глубоком раскаянии пришёл к Пророку ﷺ. Тогда Аллах ниспослал этот аят о том, что молитва и добрые дела стирают дурные; на вопрос мужчины Пророк ﷺ ответил, что это относится ко всей его общине."
    }
  },
  "12:7": {
    type: "hadith",
    versets: ["12:7"],
    plage: "12:7",
    source: "Sahīh Al-Bukhārī n°3353, n°4688",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah (qu'Allāh l'agrée) rapporte qu'on demanda au Messager d'Allāh ﷺ : « Quel est le plus noble des hommes ? » Il répondit : « Le plus pieux envers Allāh. » Comme ses interlocuteurs précisaient qu'ils interrogeaient sur la lignée prophétique, il déclara : « Alors c'est Yūsuf (Joseph), Prophète d'Allāh, fils du Prophète d'Allāh (Ya‘qūb), fils du Prophète d'Allāh (Ishāq), fils de l'Ami intime d'Allāh (Ibrāhīm) ! »",
      en: "Abū Hurayrah (may Allāh be pleased with him) narrated that the Messenger of Allāh ﷺ was asked: 'Who is the most honorable of people?' He replied: 'The most God-fearing.' When they clarified they meant by noble prophetic lineage, he answered: 'Then it is Yūsuf (Joseph), Prophet of Allāh, son of the Prophet of Allāh (Ya‘qūb), son of the Prophet of Allāh (Ishāq), son of the Close Friend of Allāh (Ibrāhīm)!'",
      es: "Abū Hurayrah relató que al preguntar al Profeta ﷺ quién era el más noble de los hombres respondió: «El más piadoso», y al precisar que se referían al linaje respondió: «Entonces es Yūsuf (José), Profeta de Allah, hijo de Profeta, nieto de Profeta y bisnieto del Amigo íntimo de Allah (Ibrāhīm)».",
      ar: "عن أبي هريرة رضي الله عنه أنه سُئل رسول الله ﷺ: أي الناس أكرم؟ قال: «أتقاهم»، قالوا: ليس عن هذا نسألك، قال: «فيوسف نبي الله، ابن نبي الله، ابن نبي الله، ابن خليل الله».",
      de: "Abū Hurayrah berichtete, dass der Prophet ﷺ auf die Frage nach dem edelsten Menschen antwortete: „Der Gottesfürchtigste.“ Als man nach der Abstammung fragte, sagte er: „Dann ist es Yūsuf (Josef), Prophet Allahs, Sohn des Propheten Allahs, Sohn des Propheten Allahs, Sohn des innigen Freundes Allahs (Ibrāhīm).“",
      it: "Abū Hurayrah narrò che fu chiesto al Profeta ﷺ chi fosse il più nobile degli uomini ed egli rispose: «Il più pio». Precisando che intendevano per lignaggio, disse: «Allora è Yūsuf (Giuseppe), Profeta di Allāh, figlio di Profeta, nipote di Profeta, pronipote dell'Amico intimo di Allāh (Ibrāhīm)».",
      id: "Abu Hurairah meriwayatkan bahwa Nabi ﷺ ditanya siapakah manusia paling mulia, beliau menjawab: “Yang paling bertakwa.” Ketika dijelaskan yang dimaksud adalah nasab, beliau bersabda: “Yusuf, Nabi Allah, putra Nabi Allah, putra Nabi Allah, putra Khalilullah (Ibrahim).”",
      ru: "Абу Хурайра передал, что Пророка ﷺ спросили, кто самый благородный из людей, и он ответил: «Самый богобоязненный». Когда уточнили, что речь о происхождении, он сказал: «Тогда это Юсуф (Иосиф), пророк Аллаха, сын пророка Аллаха, внук пророка Аллаха, правнук возлюбленного друга Аллаха (Ибрахима)»."
    }
  },
  "12:50": {
    type: "hadith",
    versets: ["12:50"],
    plage: "12:50",
    source: "Sahīh Al-Bukhārī n°3372, n°4694 & Sahīh Muslim n°151",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah rapporte que le Messager d'Allāh ﷺ fit l'éloge de l'extraordinaire patience et de la dignité du Prophète Yūsuf (Joseph) lorsqu'il refusa de sortir de prison avant que son innocence ne soit officiellement reconnue devant le roi : « Si j'étais resté en prison aussi longtemps que Yūsuf, j'aurais assurément répondu aussitôt à l'invitation de l'émissaire venu me libérer ! »",
      en: "Abū Hurayrah narrated that the Messenger of Allāh ﷺ praised Prophet Yūsuf's remarkable patience and dignity when he refused to leave prison until his innocence was formally cleared before the king, saying: 'Had I stayed in prison as long as Yūsuf did, I would have immediately accepted the messenger's call to come out!'",
      es: "Abū Hurayrah relató que el Profeta ﷺ elogió la extraordinaria paciencia e integridad de Yūsuf al rehusar salir de prisión antes de demostrarse su inocencia ante el rey, diciendo con humildad que si él hubiera pasado tanto tiempo preso habría aceptado al instante la llamada para salir.",
      ar: "عن أبي هريرة رضي الله عنه أن النبي ﷺ أثنى على صبر نبي الله يوسف عليه السلام وعفّته حين أبى الخروج من السجن قبل إثبات براءته أمام الملك، فقال ﷺ تواضعًا: «ولو لبثت في السجن طول ما لبث يوسف لأجبتُ الداعي».",
      de: "Abū Hurayrah berichtete, dass der Gesandte Allahs ﷺ die außergewöhnliche Geduld und Würde von Yūsuf lobte, der das Gefängnis erst nach Feststellung seiner Unschuld verlassen wollte, und bescheiden sagte: „Hätte ich so lange wie Yūsuf im Gefängnis gesessen, wäre ich dem Ruf sogleich gefolgt.“",
      it: "Abū Hurayrah narrò che il Profeta ﷺ elogiò la straordinaria pazienza e integrità di Yūsuf, che rifiutò di lasciare il carcere prima che fosse provata la sua innocenza, dicendo con umiltà: «Se fossi rimasto in prigione quanto Yūsuf, avrei risposto subito alla chiamata».",
      id: "Abu Hurairah meriwayatkan bahwa Nabi ﷺ memuji kesabaran dan kehormatan luar biasa Nabi Yusuf yang menolak keluar dari penjara sebelum kebersihan namanya terbukti, seraya bersabda dengan rendah hati bahwa seandainya beliau dipenjara selama Yusuf tentu beliau segera memenuhi panggilan keluar.",
      ru: "Абу Хурайра передал, что Пророк ﷺ восхвалил удивительное терпение и достоинство пророка Юсуфа, отказавшегося выходить из темницы до полного доказательства своей невиновности, и скромно заметил: «Если бы я пробыл в темнице столько же, сколько Юсуф, я бы сразу откликнулся на зов посланца»."
    }
  },
  "12:110": {
    type: "hadith",
    versets: ["12:110"],
    plage: "12:110",
    source: "Sahīh Al-Bukhārī n°4695 & Sahīh Muslim n°3022",
    degre: "Sahīh",
    texte: {
      fr: "‘Urwah rapporte qu'il interrogea ‘Ā’ishah (qu'Allāh l'agrée) sur le sens exact de ce verset (« Au point que lorsque les Messagers désespérèrent et pensèrent qu'on les avait traités de menteurs… »). ‘Ā’ishah repoussa catégoriquement l'idée qu'un Prophète puisse jamais douter de la promesse d'Allāh : elle expliqua que cela désigne le moment où les Messagers désespèrent de la conversion de leur peuple obstiné et constatent que les gens les ont définitivement traités de menteurs — et c'est alors que survient le secours d'Allāh.",
      en: "‘Urwah narrated that he asked ‘Ā’ishah about the meaning of this verse ('Until, when the messengers despaired and were certain they had been denied...'). ‘Ā’ishah firmly rejected any notion that a prophet could ever doubt Allāh's promise, explaining it means the messengers despaired of their stubborn people's faith and saw themselves completely rejected—at which point Allāh's victory arrived.",
      es: "‘Urwah relató que preguntó a ‘Ā’ishah por el sentido de esta aleya y ella descartó rotundamente que un Profeta pudiera dudar de la promesa de Allah: explicó que significa que desesperaron de la fe de su pueblo obstinado al verse definitivamente desmentidos, momento en que llega el auxilio de Allah.",
      ar: "عن عروة أنه سأل عائشة رضي الله عنها عن معنى هذه الآية فأنكرت أن يظن الأنبياء بربهم غير الحق، وبيّنت أن المعنى: حتى إذا استيأس الرسل من إيمان قومهم وأيقنوا أن قومهم قد كذّبوهم جاءهم نصر الله.",
      de: "‘Urwah berichtete, dass ‘Ā’ishah jede Vorstellung zurückwies, ein Prophet könne an Allahs Versprechen zweifeln: Der Vers bedeute, dass die Gesandten die Hoffnung auf den Glauben ihres verstockten Volkes aufgaben und erkannten, dass man sie der Lüge bezichtigte – genau dann kam Allahs Hilfe.",
      it: "‘Urwah narrò che ‘Ā’ishah respinse categoricamente l'idea che un Profeta possa dubitare della promessa di Allāh: spiegò che significa quando i Messaggeri disperarono della fede del loro popolo ostinato vedendosi respinti come mentitori, e proprio allora giunse il soccorso di Allāh.",
      id: "‘Urwah meriwayatkan bahwa ‘Aisyah menolak keras anggapan para nabi meragukan janji Allah; beliau menjelaskan maknanya ialah ketika para rasul berputus asa atas keimanan kaumnya yang keras kepala dan yakin telah didustakan, saat itulah pertolongan Allah tiba.",
      ru: "‘Урва передал, что ‘Аиша решительно отвергла мысль о том, будто пророки могли усомниться в обещании Аллаха, пояснив: речь идёт о том, что посланники отчаялись в уверовании своего упорствующего народа и убедились, что их сочли лжецами — и тогда приходила помощь Аллаха."
    }
  },
  "13:8": {
    type: "hadith",
    versets: ["13:8"],
    plage: "13:8",
    source: "Sahīh Al-Bukhārī n°4697",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn ‘Umar (qu'Allāh les agrée) rapporte que le Messager d'Allāh ﷺ rattacha la science parfaite de ce que portent les matrices (mentionnée dans ce verset) aux cinq clés de l'Inconnaissable (Mafātīh al-Ghayb) qu'Allāh Seul détient dans leur réalité absolue : l'Heure suprême, la descente de la pluie, ce que renferment les matrices dans toute sa destinée, ce que chaque âme acquerra demain et le lieu où elle mourra.",
      en: "‘Abdullāh ibn ‘Umar (may Allāh be pleased with them) narrated that the Messenger of Allāh ﷺ connected Allāh's comprehensive knowledge of what every womb bears (mentioned in this verse) to the five Keys of the Unseen known exclusively to Allāh in their absolute reality: the Hour, the sending of rain, what is in the wombs, what a soul will earn tomorrow, and where it will die.",
      es: "‘Abdullāh ibn ‘Umar relató que el Profeta ﷺ vinculó el conocimiento absoluto de cuanto gesta cada vientre (mencionado en esta aleya) con las cinco llaves de lo Oculto que solo Allah conoce plenamente: la Hora, la lluvia, lo que albergan los vientres, lo que el alma hará mañana y dónde morirá.",
      ar: "عن عبد الله بن عمر رضي الله عنهما أن النبي ﷺ ربط علم الله الشامل بما تحمل كل أنثى (في هذه الآية) بمفاتيح الغيب الخمس التي لا يعلمها على حقيقتها إلا الله: قيام الساعة، ونزول الغيث، وما في الأرحام، وما تكسب نفس غدًا، وبأي أرض تموت.",
      de: "‘Abdullāh ibn ‘Umar berichtete, dass der Gesandte Allahs ﷺ das allumfassende Wissen über das, was jeder Mutterschoß trägt, mit den fünf Schlüsseln des Verborgenen verband, die allein Allah vollkommen kennt.",
      it: "‘Abdullāh ibn ‘Umar narrò che il Messaggero di Allāh ﷺ collegò la conoscenza assoluta di ciò che ogni grembo porta alle cinque chiavi dell'Invisibile note solo ad Allāh: l'Ora, la pioggia, ciò che è nei grembi, ciò che l'anima farà domani e dove morirà.",
      id: "‘Abdullah bin ‘Umar meriwayatkan bahwa Rasulullah ﷺ mengaitkan ilmu menyeluruh Allah tentang kandungan setiap rahim dalam ayat ini dengan lima kunci perkara gaib yang hanya diketahui secara mutlak oleh Allah semata.",
      ru: "‘Абдуллах ибн ‘Умар передал, что Посланник Аллаха ﷺ связал абсолютное знание о том, что носит каждая утроба (упомянутое в этом аяте), с пятью ключами сокровенного, ведомыми в полной мере одному Аллаху."
    }
  },
  "14:24": {
    type: "hadith",
    versets: ["14:24", "14:25"],
    plage: "14:24–25",
    source: "Sahīh Al-Bukhārī n°61, n°4698 & Sahīh Muslim n°2811",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn ‘Umar (qu'Allāh les agrée) rapporte que le Messager d'Allāh ﷺ posa une énigme à ses Compagnons en évoquant cette parabole : « Parmi les arbres, il en est un dont les feuilles ne tombent pas et qui est l'image du croyant ; dites-moi quel est cet arbre ? » Alors que les Compagnons citaient des arbres du désert, le Prophète ﷺ révéla : « C'est le palmier-dattier ! » (dont la racine est ferme et les bienfaits permanents).",
      en: "‘Abdullāh ibn ‘Umar (may Allāh be pleased with them) narrated that the Messenger of Allāh ﷺ asked his Companions regarding this parable: 'Among trees there is one whose leaves never fall, and it resembles the believer—tell me which tree it is?' While they thought of desert trees, the Prophet ﷺ replied: 'It is the date palm!'",
      es: "‘Abdullāh ibn ‘Umar relató que el Profeta ﷺ preguntó a sus Compañeros a propósito de esta parábola cuál era el árbol cuyas hojas no caen y que se asemeja al creyente; tras mencionar ellos diversos árboles del desierto, él reveló: «¡Es la palmera datilera!».",
      ar: "عن عبد الله بن عمر رضي الله عنهما أن النبي ﷺ سأل أصحابه مستحضرًا هذا المثل القرآني: «إن من الشجر شجرةً لا يسقط ورقها وإنها مثل المسلم، فحدثوني ما هي؟» فوقع الناس في شجر البوادي، ثم قال النبي ﷺ: «هي النخلة».",
      de: "‘Abdullāh ibn ‘Umar berichtete, dass der Prophet ﷺ seine Gefährten zu diesem Gleichnis fragte, welcher Baum sein Laub nicht abwirft und dem Gläubigen gleicht; nachdem sie an Wüstenbäume dachten, löste er auf: „Es ist die Dattelpalme!“",
      it: "‘Abdullāh ibn ‘Umar narrò che il Profeta ﷺ chiese ai Compagni, richiamando questa parabola, quale fosse l'albero che non perde le foglie e somiglia al credente; mentre pensavano agli alberi del deserto, egli rivelò: «È la palma da dattero!».",
      id: "‘Abdullah bin ‘Umar meriwayatkan bahwa Nabi ﷺ bertanya kepada para sahabat mengenai perumpamaan ini tentang pohon yang daunnya tidak gugur dan menyerupai seorang mukmin; lalu beliau menjawab: “Pohon itu adalah kurma!”",
      ru: "‘Абдуллах ибн ‘Умар передал, что Пророк ﷺ задал сподвижникам загадку в связи с этой притчей: «Среди деревьев есть одно, листья которого не опадают, и оно подобно верующему — скажите, что это за дерево?» — а затем ответил: «Это финиковая пальма!»"
    }
  },
  "14:27": {
    type: "sabab",
    versets: ["14:27"],
    plage: "14:27",
    source: "Sahīh Al-Bukhārī n°4699 & Sahīh Muslim n°2871",
    degre: "Sahīh",
    texte: {
      fr: "Al-Barā' ibn ‘Āzib (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ expliqua que ce verset (« Allāh affermit ceux qui croient par une parole ferme dans la vie présente et dans l'au-delà ») fut révélé au sujet de l'épreuve et de l'interrogatoire de la tombe : lorsqu'on demande au croyant qui est son Seigneur et quel est son Prophète, il témoigne avec fermeté qu'il n'y a de divinité digne d'adoration qu'Allāh et que Muhammad ﷺ est Son Messager.",
      en: "Al-Barā' ibn ‘Āzib (may Allāh be pleased with him) narrated that the Messenger of Allāh ﷺ stated this verse ('Allāh keeps firm those who believe, with the firm word, in worldly life and in the Hereafter') was revealed concerning the questioning in the grave: when the believer is questioned, he testifies steadfastly that none has the right to be worshipped but Allāh and that Muhammad ﷺ is His Messenger.",
      es: "Al-Barā' ibn ‘Āzib relató que el Profeta ﷺ afirmó que esta aleya fue revelada acerca de la prueba e interrogatorio de la tumba: al ser preguntado el creyente, responde con firmeza dando testimonio de la unicidad de Allah y la misión de Muhammad ﷺ.",
      ar: "عن البراء بن عازب رضي الله عنه أن النبي ﷺ أخبر أن هذه الآية نزلت في عذاب القبر وسؤاله؛ فالمسلم إذا سُئل في قبره ثبّته الله فيشهد أن لا إله إلا الله وأن محمدًا رسول الله.",
      de: "Al-Barā' ibn ‘Āzib berichtete, dass der Gesandte Allahs ﷺ erklärte, dieser Vers sei bezüglich der Befragung im Grab offenbart worden: Dort festigt Allah den Gläubigen, sodass er standhaft das Glaubensbekenntnis bezeugt.",
      it: "Al-Barā' ibn ‘Āzib narrò che il Messaggero di Allāh ﷺ spiegò che questo versetto fu rivelato riguardo all'interrogatorio nella tomba: quando il credente viene interrogato, Allāh lo rende saldo nella testimonianza di fede.",
      id: "Al-Bara' bin ‘Azib meriwayatkan bahwa Nabi ﷺ menjelaskan ayat ini turun mengenai pertanyaan dan azab kubur: ketika seorang mukmin ditanya di dalam kubur, Allah meneguhkannya untuk bersyahadat dengan mantap.",
      ru: "Аль-Бара ибн ‘Азиб передал слова Пророка ﷺ о том, что этот аят был ниспослан о допросе и испытании в могиле: когда верующего спрашивают в могиле, Аллах укрепляет его, и он твёрдо произносит свидетельство веры."
    }
  },
  "14:28": {
    type: "sabab",
    versets: ["14:28", "14:29"],
    plage: "14:28–29",
    source: "Sahīh Al-Bukhārī n°3977, n°4700",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) expliqua que « ceux qui ont troqué le bienfait d'Allāh contre l'ingratitude et ont entraîné leur peuple dans la demeure de la perdition » désignent les chefs polythéistes de Quraysh qui rejetèrent la miséricorde de la mission de Muhammad ﷺ et menèrent leurs hommes à leur perte le jour de la bataille de Badr.",
      en: "Ibn ‘Abbās (may Allāh be pleased with them) explained that 'those who exchanged the favor of Allāh for disbelief and settled their people in the home of ruin' referred specifically to the polytheist leaders of Quraysh who rejected the mercy of Prophet Muhammad's ﷺ mission and led their men to ruin at the Battle of Badr.",
      es: "Ibn ‘Abbās explicó que «quienes cambiaron la gracia de Allah por la incredulidad y llevaron a su pueblo a la morada de la perdición» alude a los líderes politeístas de Quraysh que rechazaron la misión de Muhammad ﷺ y condujeron a los suyos a la derrota en Badr.",
      ar: "عن ابن عباس رضي الله عنهما أنه قال في تفسير هذه الآية: هم كفار قريش الذين كفروا بنعمة الله عليهم ببعثة محمد ﷺ وأوردوا قومهم دار البوار والهلاك يوم بدر.",
      de: "Ibn ‘Abbās erklärte, dass mit „jenen, die Allahs Gnade gegen Unglauben eintauschten“ die polytheistischen Anführer der Quraisch gemeint waren, die die Sendung Muhammads ﷺ zurückwiesen und ihr Volk am Tag von Badr ins Verderben führten.",
      it: "Ibn ‘Abbās spiegò che «coloro che hanno scambiato il beneficio di Allāh con la miscredenza» indica i capi politeisti di Quraysh che respinsero la missione di Muhammad ﷺ conducendo i loro uomini alla rovina nella battaglia di Badr.",
      id: "Ibnu ‘Abbas menjelaskan bahwa orang-orang yang menukar nikmat Allah dengan kekufuran dan menjerumuskan kaumnya ke lembah kebinasaan dalam ayat ini adalah para pemuka kafir Quraisy yang menolak risalah Nabi Muhammad ﷺ dan binasa pada Perang Badar.",
      ru: "Ибн ‘Аббас пояснил, что «променявшие милость Аллаха на неверие и приведшие свой народ в обитель погибели» — это предводители многобожников из курайшитов, отвергшие миссию Пророка Мухаммада ﷺ и приведшие своих людей к гибели при Бадре."
    }
  },
  "15:87": {
    type: "hadith",
    versets: ["15:87"],
    plage: "15:87",
    source: "Sahīh Al-Bukhārī n°4703, n°4704",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah et Abū Sa‘īd ibn Al-Mu‘allā rapportent que le Messager d'Allāh ﷺ précisa que « les Sept versets répétés (As-Sab‘ al-Mathānī) et le Coran sublime » mentionnés dans ce verset désignent Sourate Al-Fātihah (« La Mère du Livre »), qui est répétée à chaque unité de prière et constitue la plus grande sourate du Coran.",
      en: "Abū Hurayrah and Abū Sa‘īd ibn Al-Mu‘allā narrated that the Messenger of Allāh ﷺ clarified that 'the Seven Oft-Repeated Verses (As-Sab‘ al-Mathānī) and the Great Qur'an' mentioned here refer to Sūrah Al-Fātihah ('The Mother of the Book'), recited in every unit of prayer and the greatest surah of the Qur'an.",
      es: "Abū Hurayrah y Abū Sa‘īd ibn Al-Mu‘allā relataron que el Profeta ﷺ aclaró que «los Siete versículos reiterados y el sublime Corán» se refieren a la Sura Al-Fātihah, recitada en cada unidad de oración y la mayor sura del Libro.",
      ar: "عن أبي هريرة وأبي سعيد بن المعلى رضي الله عنهما أن النبي ﷺ بيّن أن «السبع المثاني والقرآن العظيم» في هذه الآية هي سورة الفاتحة (أم الكتاب) التي تُكرر في كل ركعة وهي أعظم سورة في القرآن.",
      de: "Abū Hurayrah und Abū Sa‘īd ibn Al-Mu‘allā berichteten, dass der Prophet ﷺ erklärte, mit den „sieben oft wiederholten Versen und dem gewaltigen Koran“ sei Sure Al-Fātihah gemeint, die in jeder Gebetseinheit rezitiert wird.",
      it: "Abū Hurayrah e Abū Sa‘īd ibn Al-Mu‘allā narrarono che il Profeta ﷺ chiarì che «i Sette versetti ripetuti e il sublime Corano» designano Sura Al-Fātihah, recitata in ogni unità di preghiera e la più grande sura del Corano.",
      id: "Abu Hurairah dan Abu Sa‘id bin Al-Mu‘alla meriwayatkan penjelasan Nabi ﷺ bahwa ‘tujuh ayat yang dibaca berulang-ulang dan Al-Qur'an yang agung’ dalam ayat ini adalah Surah Al-Fatihah, surah teragung yang dibaca di setiap rakaat shalat.",
      ru: "Абу Хурайра и Абу Са‘ид ибн аль-Му‘алля передали разъяснение Пророка ﷺ о том, что «семь повторяемых аятов и великий Коран» в этом аяте — это сура «Аль-Фатиха», читаемая в каждом ракаате молитвы и являющаяся величайшей сурой Корана."
    }
  },
  "15:90": {
    type: "hadith",
    versets: ["15:90", "15:91"],
    plage: "15:90–91",
    source: "Sahīh Al-Bukhārī n°4705, n°4706",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) expliqua que « les diviseurs qui ont mis le Livre en pièces » désignent ceux parmi les Gens du Livre qui acceptèrent arbitrairement une partie de la Révélation conforme à leurs penchants et en rejetèrent une autre partie, fragmentant ainsi l'unité du Message divin.",
      en: "Ibn ‘Abbās (may Allāh be pleased with them) explained that 'the dividers who made the Scripture into parts' refers to those among the People of the Book who selectively believed in parts of Revelation while rejecting other parts, fragmenting the unity of the divine Message.",
      es: "Ibn ‘Abbās explicó que «los divisores que fragmentaron el Libro» se refiere a quienes entre la Gente del Libro creyeron selectivamente en una parte de la Revelación y rechazaron otra.",
      ar: "عن ابن عباس رضي الله عنهما أنه فسّر «المقتسمين الذين جعلوا القرآن عضين» بأهل الكتاب الذين جزّؤوه أجزاءً، فآمنوا ببعضه وكفروا ببعضه.",
      de: "Ibn ‘Abbās erklärte, dass „die Aufteiler, welche die Schrift in Stücke zerrissen“, jene unter den Leuten der Schrift bezeichnet, die selektiv an einen Teil der Offenbarung glaubten und einen anderen verwarfen.",
      it: "Ibn ‘Abbās spiegò che «coloro che divisero la Scrittura in frammenti» designa quanti tra la Gente del Libro credettero selettivamente a una parte della Rivelazione respingendone un'altra.",
      id: "Ibnu ‘Abbas menjelaskan bahwa ‘orang-orang yang membagi-bagi Kitab’ adalah sebagian Ahli Kitab yang mengimani sebagian isi wahyu sesuai keinginan mereka dan mengingkari sebagian lainnya.",
      ru: "Ибн ‘Аббас пояснил, что «разделившие Писание на части» — это те из людей Писания, которые избирательно уверовали в одну часть откровения и отвергли другую."
    }
  },
  "16:68": {
    type: "hadith",
    versets: ["16:68", "16:69"],
    plage: "16:68–69",
    source: "Sahīh Al-Bukhārī n°5684 & Sahīh Muslim n°2217",
    degre: "Sahīh",
    texte: {
      fr: "Abū Sa‘īd Al-Khudrī (qu'Allāh l'agrée) rapporte qu'un homme vint voir le Prophète ﷺ pour lui dire que son frère souffrait de violents maux de ventre. Le Prophète ﷺ lui conseilla de lui faire boire du miel. L'homme revint à trois reprises en disant que le mal persistait, et le Prophète ﷺ lui répéta : « Allāh a dit vrai (en affirmant que le miel renferme une guérison) et le ventre de ton frère a menti : donne-lui encore du miel ! » Après une nouvelle prise, son frère fut complètement guéri.",
      en: "Abū Sa‘īd Al-Khudrī (may Allāh be pleased with him) narrated that a man told the Prophet ﷺ his brother had severe stomach trouble, and the Prophet ﷺ advised giving him honey. When the man returned repeatedly saying it had not stopped, the Prophet ﷺ said: 'Allāh has spoken the truth (that honey contains healing), and your brother's stomach has lied—give him honey again!' After taking it again, he was cured.",
      es: "Abū Sa‘īd Al-Khudrī relató que un hombre acudió al Profeta ﷺ porque su hermano sufría fuertes dolores de estómago y él le recomendó darle miel. Al insistir el hombre en que el dolor seguía, el Profeta ﷺ le dijo: «Allah ha dicho la verdad (al afirmar que en la miel hay curación); vuelve a darle miel», y al tomarla sanó por completo.",
      ar: "عن أبي سعيد الخدري رضي الله عنه أن رجلًا أتى النبي ﷺ يشكو استطلاق بطن أخيه، فأمره ﷺ أن يسقيه عسلًا، فتكرر مجيؤه ثلاثًا والنبي ﷺ يقول: «صدق الله وكذب بطن أخيك، اسقه عسلًا»، فسقاه فبرئ تمامًا.",
      de: "Abū Sa‘īd Al-Khudrī berichtete, dass ein Mann den Propheten ﷺ wegen schwerer Bauchbeschwerden seines Bruders aufsuchte und dieser ihm Honig empfahl. Als der Mann mehrmals zurückkam, sagte der Prophet ﷺ: „Allah hat die Wahrheit gesprochen – gib ihm erneut Honig!“, woraufhin der Bruder genas.",
      it: "Abū Sa‘īd Al-Khudrī narrò che un uomo chiese aiuto al Profeta ﷺ per i forti dolori di stomaco del fratello e questi gli consigliò il miele. Tornato più volte dicendo che il male persisteva, il Profeta ﷺ ripeté: «Allāh ha detto il vero: dagli ancora del miele!», e il fratello guarì completamente.",
      id: "Abu Sa‘id Al-Khudri meriwayatkan bahwa seorang pria mengadu kepada Nabi ﷺ karena perut saudaranya sakit keras, lalu beliau menyuruh memberinya madu. Setelah berulang kali kembali, Nabi ﷺ bersabda: “Allah Maha Benar (bahwa madu mengandung obat), beri dia minum madu lagi!”, lalu saudaranya pun sembuh.",
      ru: "Абу Са‘ид аль-Худри передал, что к Пророку ﷺ пришёл человек, пожаловавшись на сильное расстройство желудка у брата, и Пророк ﷺ посоветовал дать ему мёд. Когда тот возвращался несколько раз, Пророк ﷺ повторил: «Аллах сказал правду (об исцелении в мёде) — напои его мёдом ещё раз!», после чего брат полностью исцелился."
    }
  },
  "16:70": {
    type: "hadith",
    versets: ["16:70"],
    plage: "16:70",
    source: "Sahīh Al-Bukhārī n°2822, n°4707",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik et Sa‘d ibn Abī Waqqās rapportent que le Messager d'Allāh ﷺ demandait régulièrement refuge auprès d'Allāh dans ses invocations contre le fait d'atteindre « l'âge le plus décrépit » (ardhal al-‘umur) évoqué dans ce verset — ce grand âge où l'être humain perd ses facultés et sa mémoire après avoir connu la science et la lucidité.",
      en: "Anas ibn Mālik and Sa‘d ibn Abī Waqqās narrated that the Messenger of Allāh ﷺ regularly sought refuge with Allāh in his supplications from reaching 'the most decrepit old age' (ardhal al-‘umur) mentioned in this verse, when a person loses lucidity and memory after having possessed knowledge.",
      es: "Anas ibn Mālik y Sa‘d ibn Abī Waqqās relataron que el Profeta ﷺ pedía refugio habitualmente a Allah contra alcanzar «la edad más decrépita» mencionada en esta aleya, cuando el ser humano pierde su lucidez y memoria tras haber tenido conocimiento.",
      ar: "عن أنس بن مالك وسعد بن أبي وقاص رضي الله عنهما أن النبي ﷺ كان يتعوّذ بالله في دعائه من أن يُردّ إلى «أرذل العمر» المذكور في هذه الآية، وهو الهرم الشديد الذي يذهب بالعقل والذاكرة بعد العلم.",
      de: "Anas ibn Mālik und Sa‘d ibn Abī Waqqās berichteten, dass der Gesandte Allahs ﷺ in seinen Bittgebeten regelmäßig Zuflucht bei Allah davor suchte, das in diesem Vers erwähnte „gebrechlichste Greisenalter“ zu erreichen.",
      it: "Anas ibn Mālik e Sa‘d ibn Abī Waqqās narrarono che il Messaggero di Allāh ﷺ chiedeva regolarmente rifugio ad Allāh dal raggiungere «l'età più decrepita» evocata in questo versetto, in cui si perdono lucidità e memoria.",
      id: "Anas bin Malik dan Sa‘d bin Abi Waqqash meriwayatkan bahwa Rasulullah ﷺ senantiasa berlindung kepada Allah dalam doanya agar tidak dikembalikan kepada ‘usia yang paling lemah/pikun’ sebagaimana disebutkan dalam ayat ini.",
      ru: "Анас ибн Малик и Са‘д ибн Абу Ваккас передали, что Посланник Аллаха ﷺ регулярно прибегал к защите Аллаха в мольбах от того, чтобы дожить до упомянутой в этом аяте «самой дряхлой старости», когда человек утрачивает ясность ума и память."
    }
  },
  "16:126": {
    type: "sabab",
    versets: ["16:126", "16:127", "16:128"],
    plage: "16:126–128",
    source: "Sunan At-Tirmidhī n°3129 & Musnad Ahmad",
    degre: "Hasan",
    texte: {
      fr: "Ubayy ibn Ka‘b (qu'Allāh l'agrée) rapporte qu'au jour de la bataille d'Uhud, lorsque soixante-dix Compagnons — dont Hamzah, l'oncle du Prophète ﷺ — tombèrent en martyrs et que certains corps furent mutilés, des croyants bouleversés jurèrent d'infliger une riposte bien plus sévère s'ils remportaient la victoire. Allāh révéla alors ces trois versets interdisant tout excès dans la réciprocité et exhortant à la patience qui est meilleure : le Prophète ﷺ patienta, pardonna et interdit formellement toute mutilation.",
      en: "Ubayy ibn Ka‘b (may Allāh be pleased with him) narrated that at the Battle of Uhud, after seventy Companions—including the Prophet's ﷺ uncle Hamzah—were martyred and mutilated, grieving believers vowed to retaliate far more severely if granted victory. Allāh then revealed these three verses forbidding any excess beyond strict proportionality and commending patience as best; the Prophet ﷺ chose patience and forbade mutilation.",
      es: "Ubayy ibn Ka‘b relató que en Uhud, tras caer setenta Compañeros —entre ellos Hamzah— y ser mutilados algunos cuerpos, varios creyentes juraron responder con mayor dureza si vencían. Allah reveló estas tres aleyas prohibiendo todo exceso y recomendando la paciencia, y el Profeta ﷺ prohibió tajantemente la mutilación.",
      ar: "عن أُبيّ بن كعب رضي الله عنه أنه لما أُصيب يوم أُحد سبعون من الصحابة ومُثّل ببعضهم ومنهم حمزة عم النبي ﷺ، قال بعض المسلمين لئن أُديل لنا لنُمثّلن بهم أكثر، فأنزل الله هذه الآيات الثلاث ناهيًا عن الاعتداء ومرغّبًا في الصبر، فصبر النبي ﷺ ونهى عن المُثلة.",
      de: "Ubayy ibn Ka‘b berichtete, dass nach dem Tod und der Verstümmelung von siebzig Gefährten bei Uhud – darunter Hamzah – einige Gläubige härtere Vergeltung schworen. Daraufhin offenbarte Allah diese drei Verse gegen jede Maßlosigkeit und zugunsten der Geduld; der Prophet ﷺ verbot jede Verstümmelung.",
      it: "Ubayy ibn Ka‘b narrò che ad Uhud, dopo il martirio e la mutilazione di settanta Compagni tra cui Hamzah, alcuni credenti giurarono una rappresaglia più dura. Allāh rivelò questi tre versetti vietando ogni eccesso ed esaltando la pazienza; il Profeta ﷺ scelse la pazienza e proibì ogni mutilazione.",
      id: "Ubayy bin Ka‘b meriwayatkan bahwa pada Perang Uhud setelah tujuh puluh sahabat termasuk Hamzah gugur dan jasadnya dicincang, sebagian kaum muslimin bersumpah akan membalas lebih keras. Allah menurunkan tiga ayat ini yang melarang melampaui batas dan menganjurkan kesabaran, lalu Nabi ﷺ melarang perbuatan mutilasi.",
      ru: "Убайй ибн Ка‘б передал, что при Ухуде, после гибели семидесяти сподвижников, включая Хамзу, и надругательства над их телами, некоторые верующие поклялись отомстить ещё жёстче. Тогда Аллах ниспослал эти три аята, запретив превышение меры и указав, что терпение лучше; Пророк ﷺ проявил терпение и строго запретил уродование тел."
    }
  }
};

// Auto-contrôle strict avant écriture (8 langues + champs obligatoires)
const LANGUES_REQ = ['fr', 'en', 'es', 'ar', 'de', 'it', 'id', 'ru'];
for (const [cle, rec] of Object.entries(LOT_05_YUNUS_NAHL)) {
  if (!rec.type || !rec.source || !rec.degre || !Array.isArray(rec.versets) || !rec.texte) {
    throw new Error(`Structure invalide pour ${cle}`);
  }
  for (const lg of LANGUES_REQ) {
    if (!rec.texte[lg] || typeof rec.texte[lg] !== 'string' || rec.texte[lg].trim().length < 20) {
      throw new Error(`Texte manquant ou trop court pour ${cle} [${lg}]`);
    }
  }
}

Object.assign(data.recits, LOT_05_YUNUS_NAHL);
data.version = (data.version || 1) + 1;

const jsonFinal = JSON.stringify(data, null, 2);
JSON.parse(jsonFinal); // Vérification JSON stricte
writeSafe(asbabPath, jsonFinal);

let worker = fs.readFileSync(workerPath, 'utf8');
worker = worker.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
writeSafe(workerPath, worker);

const nbRecits = Object.keys(data.recits).length;
const nbVersets = Object.values(data.recits).reduce((acc, r) => acc + (Array.isArray(r.versets) ? r.versets.length : 1), 0);
console.log(`✅ Lot 5 (Sourates 10 à 16) validé et intégré ! Total actuel : ${nbRecits} récits couvrant ${nbVersets} versets en 8 langues.`);
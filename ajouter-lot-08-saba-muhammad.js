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

const LOT_08_SABA_MUHAMMAD = {
  "34:23": {
    type: "hadith",
    versets: ["34:23"],
    plage: "34:23",
    source: "Sahīh Al-Bukhārī n°4701, n°4800",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ décrivit la scène évoquée dans ce verset : lorsqu'Allāh décrète un ordre dans le ciel, les Anges battent des ailes en signe de soumission absolue devant Sa Parole, produisant un son semblable à celui d'une chaîne sur un rocher lisse. Quand la frayeur se dissipe de leurs cœurs, ils demandent : « Qu'a dit votre Seigneur ? » — « La Vérité ! Et Il est le Très-Haut, le Très-Grand ! »",
      en: "Abū Hurayrah (may Allāh be pleased with him) narrated that the Messenger of Allāh ﷺ described the scene in this verse: when Allāh decrees a matter in heaven, the angels beat their wings in humble submission to His Word, like a chain striking smooth rock. Once awe subsides from their hearts, they ask: 'What has your Lord said?' and reply: 'The truth! And He is the Most High, the Most Great.'",
      es: "Abū Hurayrah relató que el Profeta ﷺ describió esta escena: cuando Allah decreta una orden en el cielo, los Ángeles baten sus alas en sumisión ante Su Palabra; al disiparse el temor de sus corazones preguntan «¿Qué ha dicho vuestro Señor?» y responden: «¡La Verdad! Y Él es el Altísimo, el Grandioso».",
      ar: "عن أبي هريرة رضي الله عنه أن النبي ﷺ وصف مشهد هذه الآية: إذا قضى الله الأمر في السماء ضربت الملائكة بأجنحتها خضعانًا لقوله كأنه سلسلة على صفوان، فإذا فُزّع عن قلوبهم قالوا: ماذا قال ربكم؟ قالوا: الحق وهو العلي الكبير.",
      de: "Abū Hurayrah berichtete, dass der Gesandte Allahs ﷺ die Szene dieses Verses beschrieb: Wenn Allah im Himmel eine Sache beschließt, schlagen die Engel in Ehrfurcht vor Seinem Wort mit den Flügeln; sobald der Schrecken von ihren Herzen weicht, fragen sie „Was hat euer Herr gesagt?“ und antworten: „Die Wahrheit! Und Er ist der Erhabene, der Große.“",
      it: "Abū Hurayrah narrò che il Messaggero di Allāh ﷺ descrisse la scena di questo versetto: quando Allāh decreta un ordine nei cieli, gli Angeli battono le ali in sottomissione alla Sua Parola; dissipato il timore dai loro cuori, chiedono «Cosa ha detto il vostro Signore?» e rispondono: «La Verità! Ed Egli è l'Altissimo, il Grande».",
      id: "Abu Hurairah meriwayatkan penjelasan Nabi ﷺ atas ayat ini: apabila Allah menetapkan suatu perkara di langit, para malaikat mengepakkan sayapnya karena tunduk kepada firman-Nya; setelah rasa takut hilang dari hati mereka, mereka bertanya “Apa yang difirmankan Tuhanmu?” lalu dijawab: “Kebenaran, dan Dialah Yang Mahatinggi lagi Mahabesar.”",
      ru: "Абу Хурайра передал, что Пророк ﷺ описал сцену из этого аята: когда Аллах решает дело на небесах, ангелы бьют крыльями в смирении перед Его Словом; когда же страх покидает их сердца, они спрашивают «Что сказал ваш Господь?» и отвечают: «Истину! И Он — Всевышний, Великий»."
    }
  },
  "36:12": {
    type: "sabab",
    versets: ["36:12"],
    plage: "36:12",
    source: "Sahīh Muslim n°665 & Sunan At-Tirmidhī n°3226",
    degre: "Sahīh",
    texte: {
      fr: "Jābir ibn ‘Abdillāh et Abū Sa‘īd Al-Khudrī rapportent que le clan des Banū Salimah habitait loin de la Mosquée du Prophète ﷺ à Médine et souhaita déménager près d'elle lorsque des terrains se libérèrent. Le Messager d'Allāh ﷺ leur conseilla de rester dans leurs demeures en leur annonçant que chacun de leurs pas vers la mosquée est inscrit auprès d'Allāh (« Nous écrivons ce qu'ils ont avancé ainsi que leurs traces »).",
      en: "Jābir ibn ‘Abdillāh and Abū Sa‘īd Al-Khudrī narrated that the Banū Salimah clan lived far from the Prophet's ﷺ Mosque in Madinah and wished to move closer when plots became vacant. The Messenger of Allāh ﷺ advised them to stay in their homes, assuring them that every footstep they walked to the mosque is recorded ('We record that which they put forward and their footsteps').",
      es: "Yābir y Abū Sa‘īd Al-Khudrī relataron que el clan Banū Salimah vivía lejos de la Mezquita del Profeta ﷺ y quiso mudarse cerca, pero el Profeta ﷺ les aconsejó permanecer en sus hogares asegurándoles que cada paso hacia la mezquita queda inscrito ante Allah.",
      ar: "عن جابر وأبي سعيد الخدري رضي الله عنهما أن بني سلمة أرادوا الانتقال إلى قرب المسجد النبوي لُبعد ديارهم، فقال لهم النبي ﷺ: «دياركم تُكتب آثاركم»، مبشّرًا بأن كل خطوة يخطونها إلى المسجد مكتوبة لهم عند الله.",
      de: "Dschābir und Abū Sa‘īd Al-Khudrī berichteten, dass der Stamm Banū Salimah weit entfernt von der Moschee des Propheten ﷺ wohnte und näher heran ziehen wollte; der Prophet ﷺ riet ihnen, in ihren Häusern zu bleiben, da jeder Schritt zur Moschee als Lohn aufgezeichnet wird.",
      it: "Jābir e Abū Sa‘īd Al-Khudrī narrarono che il clan Banū Salimah abitava lontano dalla Moschea del Profeta ﷺ e desiderava trasferirsi più vicino; il Profeta ﷺ li esortò a restare nelle loro case, assicurando che ogni passo verso la moschea è registrato presso Allāh.",
      id: "Jabir dan Abu Sa‘id Al-Khudri meriwayatkan bahwa Bani Salamah tinggal jauh dari Masjid Nabawi dan ingin pindah mendekat, namun Nabi ﷺ menasihati mereka tetap di rumah mereka karena setiap langkah kaki menuju masjid dicatat pahalanya oleh Allah.",
      ru: "Джабир и Абу Са‘ид аль-Худри передали, что племя Бану Салима жило далеко от мечети Пророка ﷺ и хотело переселиться ближе, но Пророк ﷺ посоветовал им оставаться в своих домах, обрадовав тем, что каждый их шаг к мечети записывается у Аллаха."
    }
  },
  "36:38": {
    type: "hadith",
    versets: ["36:38"],
    plage: "36:38",
    source: "Sahīh Al-Bukhārī n°3199, n°4802 & Sahīh Muslim n°159",
    degre: "Sahīh",
    texte: {
      fr: "Abū Dharr Al-Ghifārī (qu'Allāh l'agrée) rapporte qu'au coucher du soleil, le Messager d'Allāh ﷺ lui demanda : « Sais-tu où va le soleil ? » Abū Dharr répondit qu'Allāh et Son Messager le savent mieux. Le Prophète ﷺ expliqua alors que le soleil poursuit sa course assignée jusqu'à se prosterner sous le Trône et demander la permission de poursuivre son cycle — illustrant ainsi la soumission absolue de la création décrite dans ce verset.",
      en: "Abū Dharr Al-Ghifārī (may Allāh be pleased with him) narrated that at sunset the Messenger of Allāh ﷺ asked him: 'Do you know where the sun goes?' Abū Dharr replied that Allāh and His Messenger know best. The Prophet ﷺ explained that it continues on its appointed course to prostrate beneath the Throne and seek permission to continue, illustrating the complete submission of creation in this verse.",
      es: "Abū Dharr relató que al ponerse el sol el Profeta ﷺ le preguntó si sabía adónde va, y explicó que el sol prosigue su curso asignado hasta postrarse bajo el Trono y pedir permiso para continuar su ciclo, manifestando la plena sumisión de la creación a Allah.",
      ar: "عن أبي ذر الغفاري رضي الله عنه أن النبي ﷺ سأله عند غروب الشمس: «أتدري أين تذهب؟» فأخبره أنها تمضي في مسارها المقدّر حتى تسجد تحت العرش وتستأذن فيؤذن لها، بيانًا لخضوع المخلوقات التام لأمر الله كما في هذه الآية.",
      de: "Abū Dharr berichtete, dass der Gesandte Allahs ﷺ ihn bei Sonnenuntergang fragte, wohin die Sonne gehe, und erläuterte, dass sie auf ihrer festgelegten Bahn zieht, sich unter dem Thron niederwirft und um Erlaubnis bittet – als Zeichen der völligen Unterwerfung der Schöpfung unter Allah.",
      it: "Abū Dharr narrò che al tramonto il Profeta ﷺ gli chiese dove vada il sole, spiegando che esso percorre il corso assegnato fino a prosternarsi sotto il Trono e chiedere permesso, a testimonianza della piena sottomissione del creato ad Allāh.",
      id: "Abu Dzar meriwayatkan bahwa saat matahari terbenam Nabi ﷺ bertanya kepadanya ke mana matahari pergi, lalu menjelaskan bahwa matahari berjalan pada ketetapannya hingga bersujud di bawah ‘Arsy dan memohon izin sebagai wujud ketundukan mutlak makhluk kepada Allah.",
      ru: "Абу Зарр передал, что на закате Пророк ﷺ спросил его, знает ли он, куда уходит солнце, и пояснил, что оно следует своим путём, совершая земной поклон под Троном и испрашивая дозволения продолжить движение в знак полной покорности творения Аллаху."
    }
  },
  "38:35": {
    type: "hadith",
    versets: ["38:35"],
    plage: "38:35",
    source: "Sahīh Al-Bukhārī n°461, n°4808 & Sahīh Muslim n°541",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ raconta qu'un djinn rebelle (‘Ifrīt) surgit soudainement la nuit pour interrompre sa prière. Allāh donna au Prophète ﷺ plein pouvoir sur lui ; il songea un instant à l'attacher à l'un des piliers de la mosquée afin que tous les habitants de Médine le voient au matin, mais il se souvint de l'invocation de son frère le Prophète Sulaymān dans ce verset (« Accorde-moi un royaume tel que nul après moi n'aura de pareil ») et le relâcha par respect pour cette prière.",
      en: "Abū Hurayrah narrated that the Messenger of Allāh ﷺ told his Companions that a rebellious jinn (‘Ifrīt) suddenly interrupted his night prayer, and Allāh enabled him to overpower it. He thought of tying it to a mosque pillar so everyone could see it in the morning, but remembered the supplication of his brother Prophet Sulaymān in this verse ('Grant me a kingdom such as will not belong to anyone after me') and released it.",
      es: "Abū Hurayrah relató que el Profeta ﷺ contó cómo un genio rebelde intentó interrumpir su oración nocturna y Allah le dio dominio sobre él; pensó atarlo a una columna de la mezquita, pero recordó la súplica de su hermano el Profeta Sulaymān en esta aleya y lo soltó.",
      ar: "عن أبي هريرة رضي الله عنه أن النبي ﷺ أخبر أن عفريتًا من الجن تفلّت عليه البارحة ليقطع عليه صلاته فأمكنه الله منه، وهمّ أن يربطه إلى سارية من سواري المسجد حتى ينظر إليه الناس، ثم ذكر دعوة أخيه سليمان عليه السلام في هذه الآية فردّه خاسئًا.",
      de: "Abū Hurayrah berichtete, dass ein widerspenstiger Dschinn (‘Ifrīt) das Nachtgebet des Propheten ﷺ zu stören versuchte und Allah ihn überwinden ließ; er wollte ihn an eine Säule der Moschee binden, erinnerte sich jedoch an das Bittgebet seines Bruders Sulaymān in diesem Vers und ließ ihn frei.",
      it: "Abū Hurayrah narrò che un jinn ribelle cercò di interrompere la preghiera notturna del Profeta ﷺ e Allāh gli diede potere su di lui; pensò di legarlo a una colonna della moschea, ma ricordò la supplica del fratello Salomone in questo versetto e lo lasciò andare.",
      id: "Abu Hurairah meriwayatkan bahwa Nabi ﷺ bercerita tentang jin Ifrit yang mengganggu shalatnya lalu berhasil beliau taklukkan; beliau sempat hendak mengikatnya di tiang masjid, namun teringat doa saudaranya Nabi Sulaiman dalam ayat ini lalu melepaskannya.",
      ru: "Абу Хурайра передал, что Пророк ﷺ рассказал о мятежном джинне (‘ифрите), попытавшемся прервать его молитву: Аллах дал Пророку ﷺ власть над ним, и он хотел привязать его к колонне мечети, но вспомнил мольбу своего брата Сулеймана в этом аяте и отпустил его."
    }
  },
  "38:86": {
    type: "hadith",
    versets: ["38:86"],
    plage: "38:86",
    source: "Sahīh Al-Bukhārī n°4809",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd (qu'Allāh l'agrée) enseigna une règle fondamentale de probité scientifique en s'appuyant sur ce verset : « Ô gens ! Que celui qui sait parle selon sa science, et que celui qui ne sait pas dise simplement : “Allāh est plus Savant” ! Car dire “Allāh est plus Savant” sur ce que l'on ignore fait partie intégrante de la vraie science ; Allāh n'a-t-Il pas ordonné à Son Prophète ﷺ : “Je ne suis point parmi les prétentieux (al-mutakallifīn)” ? »",
      en: "‘Abdullāh ibn Mas‘ūd taught a golden rule of scholarly integrity citing this verse: 'Whoever knows something, let him speak of it, and whoever does not know, let him say “Allāh knows best,” for saying “Allāh knows best” about what one does not know is itself part of true knowledge—Allāh told His Prophet ﷺ: “Nor am I of the pretentious.”'",
      es: "‘Abdullāh ibn Mas‘ūd enseñó una regla esencial de rigor citando esta aleya: quien sabe debe hablar con conocimiento, y quien ignora algo debe decir «Allah sabe más», pues reconocer lo que no se sabe forma parte del verdadero saber, tal como ordenó Allah a Su Profeta ﷺ no ser presuntuoso.",
      ar: "عن عبد الله بن مسعود رضي الله عنه أنه قال مستشهدًا بهذه الآية: «يا أيها الناس، من علم شيئًا فليقل به، ومن لم يعلم فليقل: الله أعلم؛ فإن من العلم أن يقول لما لا يعلم: الله أعلم»، فقد قال الله لنبيه ﷺ: ﴿وَمَا أَنَا مِنَ الْمُتَكَلِّفِينَ﴾.",
      de: "‘Abdullāh ibn Mas‘ūd lehrte mit Verweis auf diesen Vers eine Grundregel wissenschaftlicher Redlichkeit: Wer etwas weiß, möge es aussprechen, und wer es nicht weiß, möge sagen „Allah weiß es am besten“, denn dies gehört zum wahren Wissen, da Allah Seinem Propheten ﷺ befahl, nicht zu den Anmaßenden zu gehören.",
      it: "‘Abdullāh ibn Mas‘ūd insegnò una regola d'oro di onestà intellettuale citando questo versetto: chi sa parli con scienza, e chi non sa dica «Allāh ne sa di più», poiché riconoscere ciò che non si conosce fa parte della vera scienza.",
      id: "‘Abdullah bin Mas‘ud mengajarkan kaidah penting kejujuran ilmiah berdasarkan ayat ini: siapa yang berilmu hendaklah berbicara sesuai ilmunya, dan siapa yang tidak tahu hendaklah berkata “Allahu a‘lam”, karena itulah bagian dari ilmu yang sejati.",
      ru: "‘Абдуллах ибн Мас‘уд, ссылаясь на этот аят, преподал важнейшее правило честности в знании: кто знает — пусть говорит, а кто не знает — пусть скажет «Аллаху ведомо лучше», ибо признание своего незнания есть часть истинного знания."
    }
  },
  "39:53": {
    type: "sabab",
    versets: ["39:53"],
    plage: "39:53",
    source: "Sahīh Al-Bukhārī n°4810",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte que des polythéistes ayant commis de nombreux meurtres et adultères vinrent demander au Prophète ﷺ si leur lourd passé pouvait encore être pardonné. C'est à leur sujet que descendit cet appel immense à l'espérance : « Dis : Ô Mes serviteurs qui avez commis des excès à votre propre détriment, ne désespérez jamais de la miséricorde d'Allāh, car Allāh pardonne tous les péchés (à celui qui se repent sincèrement) ! »",
      en: "Ibn ‘Abbās narrated that polytheists who had committed numerous killings and much adultery came asking the Prophet ﷺ whether such grave past sins could ever be forgiven. Concerning them, this universal call of hope was revealed: 'Say: O My servants who have transgressed against themselves, do not despair of the mercy of Allāh; indeed, Allāh forgives all sins (for the sincerely repentant).'",
      es: "Ibn ‘Abbās relató que unos politeístas que habían cometido muchos crímenes y adulterios preguntaron al Profeta ﷺ si había perdón para ellos. Entonces descendió este inmenso llamado a la esperanza: «No desesperéis de la misericordia de Allah, pues Allah perdona todos los pecados».",
      ar: "عن ابن عباس رضي الله عنهما أن أناسًا من أهل الشرك كانوا قد قتلوا وأكثروا وزنوا وأكثروا، فأتوا النبي ﷺ يسألون هل لما عملوا كفارة؟ فأنزل الله هذه الآية العظيمة في الرجاء: ﴿قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ﴾.",
      de: "Ibn ‘Abbās berichtete, dass Polytheisten, die viele schwere Sünden begangen hatten, den Propheten ﷺ fragten, ob es noch Vergebung für sie gebe. Daraufhin wurde dieser große Ruf zur Hoffnung offenbart: „Verzweifelt nicht an der Barmherzigkeit Allahs; wahrlich, Allah vergibt alle Sünden.“",
      it: "Ibn ‘Abbās narrò che alcuni politeisti macchiatisi di gravi crimini e adultèri chiesero al Profeta ﷺ se potessero essere perdonati. Scese allora questo immenso appello alla speranza: «Non disperate della misericordia di Allāh: Allāh perdona tutti i peccati».",
      id: "Ibnu ‘Abbas meriwayatkan bahwa beberapa kaum musyrik yang pernah banyak berbuat dosa besar datang menanyakan kepada Nabi ﷺ apakah ada ampunan bagi mereka. Maka turunlah ayat penuh harapan ini agar tidak berputus asa dari rahmat Allah.",
      ru: "Ибн ‘Аббас передал, что многобожники, совершившие множество тяжких грехов, спросили Пророка ﷺ, есть ли для них прощение. В ответ был ниспослан этот великий аят надежды: «Не отчаивайтесь в милости Аллаха, ибо Аллах прощает все грехи»."
    }
  },
  "39:67": {
    type: "sabab",
    versets: ["39:67"],
    plage: "39:67",
    source: "Sahīh Al-Bukhārī n°4811 & Sahīh Muslim n°2786",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd (qu'Allāh l'agrée) rapporte qu'un savant des Juifs vint trouver le Messager d'Allāh ﷺ et lui dit : « Ô Muhammad, nous trouvons dans nos Écritures qu'Allāh placera les cieux sur un Doigt, les terres sur un Doigt, les arbres et les eaux sur un Doigt et toutes les créatures sur un Doigt, puis Il proclamera : “Je suis le Roi !” » Le Prophète ﷺ sourit si largement que ses molaires apparurent pour confirmer la véracité de ses paroles, puis il récita ce verset : « Ils n'ont pas estimé Allāh à Sa juste valeur… »",
      en: "‘Abdullāh ibn Mas‘ūd narrated that a Jewish scholar came to the Messenger of Allāh ﷺ describing from their scriptures how Allāh will hold the heavens, the earths, the waters, and all creation on His Fingers on the Day of Resurrection and declare 'I am the King!' The Prophet ﷺ smiled broadly in confirmation of his words and recited this verse: 'They have not appraised Allāh with true appraisal...'",
      es: "‘Abdullāh ibn Mas‘ūd relató que un erudito judío acudió al Profeta ﷺ describiendo la inmensa majestad de Allah al sostener los cielos y la tierra en el Día del Juicio y proclamar «¡Yo soy el Rey!». El Profeta ﷺ sonrió confirmando sus palabras y recitó esta aleya.",
      ar: "عن عبد الله بن مسعود رضي الله عنه أن حبرًا من الأحبار جاء إلى النبي ﷺ يصف عظمة الله يوم القيامة وقبضه للسماوات والأرضين وقوله: «أنا الملك»، فضحك النبي ﷺ حتى بدت نواجذه تصديقًا لقوله، ثم قرأ: ﴿وَمَا قَدَرُوا اللَّهَ حَقَّ قَدْرِهِ﴾.",
      de: "‘Abdullāh ibn Mas‘ūd berichtete, dass ein jüdischer Gelehrter zum Propheten ﷺ kam und aus seinen Schriften die unermessliche Erhabenheit Allahs am Jüngsten Tag beschrieb. Der Prophet ﷺ lächelte zustimmend und rezitierte diesen Vers: „Sie haben Allah nicht nach Seinem wahren Maß geschätzt...“",
      it: "‘Abdullāh ibn Mas‘ūd narrò che un dotto ebreo venne dal Profeta ﷺ descrivendo dalle Scritture la maestà di Allāh che tiene i cieli e la terra nel Giorno del Giudizio proclamando «Io sono il Re!». Il Profeta ﷺ sorrise confermando le sue parole e recitò questo versetto.",
      id: "‘Abdullah bin Mas‘ud meriwayatkan bahwa seorang pendeta Yahudi datang menemui Nabi ﷺ menggambarkan keagungan Allah yang menggenggam langit dan bumi pada Hari Kiamat seraya berfirman “Akulah Raja”. Nabi ﷺ tersenyum membenarkannya lalu membacakan ayat ini.",
      ru: "‘Абдуллах ибн Мас‘уд передал, что к Пророку ﷺ пришёл иудейский учёный и описал из Писания величие Аллаха, держащего небеса и земли в День Суда и возглашающего «Я — Царь!». Пророк ﷺ улыбнулся в подтверждение его слов и прочёл этот аят."
    }
  },
  "40:28": {
    type: "hadith",
    versets: ["40:28"],
    plage: "40:28",
    source: "Sahīh Al-Bukhārī n°3856, n°4815",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn ‘Amr (qu'Allāh les agrée) rapporte la pire agression qu'il vit Quraysh commettre contre le Prophète ﷺ : un jour qu'il priait dans l'enceinte de la Ka‘bah, ‘Uqbah ibn Abī Mu‘ayt s'approcha et lui serra violemment le cou avec son manteau pour l'étrangler. Abū Bakr As-Siddīq accourut aussitôt, le repoussa vigoureusement et s'écria en pleurant la parole même du croyant de la famille de Pharaon dans ce verset : « Allez-vous tuer un homme simplement parce qu'il dit : “Mon Seigneur est Allāh” ? »",
      en: "‘Abdullāh ibn ‘Amr narrated the worst assault he witnessed Quraysh commit against the Prophet ﷺ: while he was praying at the Ka‘bah, ‘Uqbah ibn Abī Mu‘ayt twisted his cloak tightly around the Prophet's ﷺ neck to strangle him. Abū Bakr rushed in, pushed him away, and cried out the very words of the believer in this verse: 'Would you kill a man merely because he says, “My Lord is Allāh”?'",
      es: "‘Abdullāh ibn ‘Amr relató la peor agresión que presenció contra el Profeta ﷺ junto a la Ka‘bah: cuando ‘Uqbah ibn Abī Mu‘ayt intentó estrangularlo con su manto mientras rezaba, Abū Bakr acudió a apartarlo exclamando las mismas palabras de esta aleya: «¿Mataréis a un hombre por decir “Mi Señor es Allah”?».",
      ar: "عن عبد الله بن عمرو رضي الله عنهما في أشد ما رأى قريشًا صنعت برسول الله ﷺ: أن عقبة بن أبي معيط أقبل وهو يصلي عند الكعبة فلوى ثوبه في عنقه يخنقه خنقًا شديدًا، فأقبل أبو بكر الصديق فدفعه عنه وهو يبكي ويقول بكلمات هذه الآية: ﴿أَتَقْتُلُونَ رَجُلًا أَن يَقُولَ رَبِّيَ اللَّهُ﴾!",
      de: "‘Abdullāh ibn ‘Amr berichtete vom schlimmsten Übergriff der Quraisch auf den Propheten ﷺ an der Ka‘bah: Als ‘Uqbah ibn Abī Mu‘ayt ihn beim Gebet mit seinem Gewand würgte, eilte Abū Bakr herbei, stieß ihn weg und rief die Worte dieses Verses: „Wollt ihr einen Mann töten, nur weil er sagt: ‚Mein Herr ist Allah‘?“",
      it: "‘Abdullāh ibn ‘Amr narrò la peggiore aggressione subita dal Profeta ﷺ presso la Ka‘bah: mentre pregava, ‘Uqbah tentò di strangolarlo col mantello, ma Abū Bakr accorse spingendolo via e gridando le parole stesse di questo versetto: «Ucciderete un uomo solo perché dice “Il mio Signore è Allāh”?».",
      id: "‘Abdullah bin ‘Amr meriwayatkan perlakuan terkejam Quraisy yang pernah dilihatnya: saat Nabi ﷺ shalat di sisi Ka‘bah, ‘Uqbah mencekik leher beliau dengan selendang, lalu Abu Bakar segera menepisnya sambil berseru dengan bunyi ayat ini: “Apakah kalian hendak membunuh seseorang hanya karena ia berkata ‘Tuhanku adalah Allah’?”",
      ru: "‘Абдуллах ибн ‘Амр рассказал о самом жестоком нападении курайшитов на Пророка ﷺ у Каабы: когда ‘Укба начал душить его во время молитвы, Абу Бакр подбежал, оттолкнул нападавшего и воскликнул словами этого аята: «Неужели вы убьёте человека за то, что он говорит: “Мой Господь — Аллах”?»"
    }
  },
  "40:46": {
    type: "hadith",
    versets: ["40:46"],
    plage: "40:46",
    source: "Sahīh Al-Bukhārī n°1379 & Sahīh Muslim n°2866",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn ‘Umar (qu'Allāh les agrée) rapporte que le Messager d'Allāh ﷺ a enseigné que lorsqu'un être humain meurt, sa demeure future lui est présentée chaque matin et chaque soir dans la vie intermédiaire de la tombe (Al-Barzakh) — le Paradis s'il fait partie de ses gens, ou le Feu s'il en fait partie — jusqu'au Jour de la Résurrection, ce que confirme l'exposition matin et soir des gens de Pharaon mentionnée dans ce verset.",
      en: "‘Abdullāh ibn ‘Umar narrated that the Messenger of Allāh ﷺ taught that when anyone dies, their future abode is shown to them every morning and evening in the intermediate life of the grave (Al-Barzakh)—Paradise if they belong to its people, or the Fire if they belong to its people—until Resurrection Day, mirroring the morning-and-evening exposure mentioned in this verse.",
      es: "‘Abdullāh ibn ‘Umar relató que el Profeta ﷺ enseñó que tras la muerte se muestra a cada persona su morada futura mañana y tarde en la vida intermedia (Al-Barzakh) hasta la Resurrección, en concordancia con la exposición mañana y tarde descrita en esta aleya.",
      ar: "عن عبد الله بن عمر رضي الله عنهما أن النبي ﷺ أخبر أن أحدكم إذا مات عُرض عليه مقعده بالغداة والعشي في حياة البرزخ — من الجنة أو من النار — حتى يُبعث يوم القيامة، وهو ما توافقه هذه الآية في عرض آل فرعون على النار غدوًّا وعشيًّا.",
      de: "‘Abdullāh ibn ‘Umar berichtete, dass der Gesandte Allahs ﷺ lehrte, jedem Verstorbenen werde im Zwischenzustand (Al-Barzakh) morgens und abends sein künftiger Platz im Paradies oder im Feuer gezeigt – entsprechend der in diesem Vers beschriebenen Vorführung morgens und abends.",
      it: "‘Abdullāh ibn ‘Umar narrò che il Messaggero di Allāh ﷺ insegnò che dopo la morte viene mostrata a ciascuno la propria dimora futura mattina e sera nel Barzakh fino alla Resurrezione, in piena concordanza con l'esposizione evocata in questo versetto.",
      id: "‘Abdullah bin ‘Umar meriwayatkan sabda Nabi ﷺ bahwa setiap orang yang wafat akan diperlihatkan tempat tinggalnya pagi dan petang di alam kubur (Barzakh) hingga Hari Kiamat, selaras dengan paparan api pagi dan petang bagi pengikut Fir‘aun dalam ayat ini.",
      ru: "‘Абдуллах ибн ‘Умар передал слова Пророка ﷺ о том, что после смерти человеку утром и вечером показывают его будущее место в Раю или Огне вплоть до Воскресения — в полном согласии с упоминанием утреннего и вечернего ввержения в этом аяте."
    }
  },
  "41:22": {
    type: "sabab",
    versets: ["41:22", "41:23"],
    plage: "41:22–23",
    source: "Sahīh Al-Bukhārī n°4816, n°4817 & Sahīh Muslim n°2775",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd (qu'Allāh l'agrée) rapporte que trois hommes (deux de Quraysh et un de Thaqīf, ou l'inverse) se réunirent près de la Ka‘bah et se demandèrent entre eux : « Pensez-vous qu'Allāh entend ce que nous disons ? » L'un dit : « Il entend si nous élevons la voix, mais pas si nous parlons bas. » Un autre dit : « S'Il entend quand nous parlons fort, Il entend aussi quand nous chuchotons ! » Allāh révéla alors ces deux versets exposant leur fausse supposition sur la science divine.",
      en: "‘Abdullāh ibn Mas‘ūd narrated that three men gathered near the Ka‘bah debating: 'Do you think Allāh hears what we say?' One claimed He hears if they speak aloud but not softly, while another replied that if He hears loud speech He surely hears whispers too. Allāh then revealed these two verses exposing their false assumptions about His all-encompassing knowledge.",
      es: "‘Abdullāh ibn Mas‘ūd relató que tres hombres se reunieron junto a la Ka‘bah debatiendo si Allah escuchaba lo que hablaban en voz baja o solo en voz alta; entonces Allah reveló estas dos aleyas desmintiendo su falsa suposición sobre el conocimiento divino.",
      ar: "عن عبد الله بن مسعود رضي الله عنه أن ثلاثة نفر اجتمعوا عند البيت الحرام فتساءلوا: أترون الله يسمع ما نقول؟ فقال أحدهم: يسمع إن جهرنا ولا يسمع إن أخفينا، وقال آخر: إن كان يسمع إذا جهرنا فإنه يسمع إذا أخفينا، فأنزل الله هاتين الآيتين.",
      de: "‘Abdullāh ibn Mas‘ūd berichtete, dass drei Männer nahe der Ka‘bah darüber stritten, ob Allah nur lautes Reden oder auch ihr Flüstern höre; daraufhin offenbarte Allah diese beiden Verse über ihre falsche Vorstellung von Seiner Allwissenheit.",
      it: "‘Abdullāh ibn Mas‘ūd narrò che tre uomini si riunirono presso la Ka‘bah discutendo se Allāh udisse solo le parole pronunciate a voce alta o anche quelle sussurrate; Allāh rivelò allora questi due versetti confutando la loro errata supposizione.",
      id: "‘Abdullah bin Mas‘ud meriwayatkan bahwa tiga orang berkumpul di dekat Ka‘bah memperdebatkan apakah Allah mendengar ucapan mereka jika dipelankan atau hanya jika dikeraskan; maka Allah menurunkan dua ayat ini membantah prasangka keliru mereka.",
      ru: "‘Абдуллах ибн Мас‘уд передал, что трое мужчин у Каабы спорили о том, слышит ли Аллах их слова, если они говорят шёпотом, или только вслух; тогда Аллах ниспослал эти два аята, разоблачающие их ошибочное предположение."
    }
  },
  "41:30": {
    type: "hadith",
    versets: ["41:30"],
    plage: "41:30",
    source: "Sahīh Muslim n°38",
    degre: "Sahīh",
    texte: {
      fr: "Sufyān ibn ‘Abdillāh Ath-Thaqafī (qu'Allāh l'agrée) demanda au Messager d'Allāh ﷺ : « Ô Messager d'Allāh, dis-moi sur l'Islam une parole si complète que je n'aie plus besoin d'interroger personne d'autre après toi ! » Le Prophète ﷺ lui répondit en résumant l'essence même de ce verset : « Dis : “Je crois en Allāh”, puis tiens-toi droit avec constance (Istaqim) ! »",
      en: "Sufyān ibn ‘Abdillāh Ath-Thaqafī asked the Messenger of Allāh ﷺ: 'Tell me a statement about Islam so comprehensive that I will never need to ask anyone else after you.' Summarizing the very essence of this verse, the Prophet ﷺ replied: 'Say: “I believe in Allāh,” and then remain steadfast (Istaqim)!'",
      es: "Sufyān ibn ‘Abdillāh pidió al Profeta ﷺ una enseñanza sobre el Islam tan completa que no necesitara preguntar a nadie más; resumiendo la esencia misma de esta aleya, él respondió: «Di: “Creo en Allah”, y luego mantente recto y constante».",
      ar: "عن سفيان بن عبد الله الثقفي رضي الله عنه أنه قال: يا رسول الله، قل لي في الإسلام قولًا لا أسأل عنه أحدًا بعدك؛ فأجابه النبي ﷺ جامعًا جوهر هذه الآية: «قل آمنتُ بالله ثم استقم».",
      de: "Sufyān ibn ‘Abdillāh bat den Gesandten Allahs ﷺ um ein umfassendes Wort über den Islam, sodass er danach niemanden mehr fragen müsse. Ganz im Sinne dieses Verses antwortete der Prophet ﷺ: „Sprich: ‚Ich glaube an Allah‘, und bleibe dann standhaft!“",
      it: "Sufyān ibn ‘Abdillāh chiese al Messaggero di Allāh ﷺ una parola sull'Islam tanto completa da non dover chiedere ad altri; riassumendo l'essenza di questo versetto, il Profeta ﷺ rispose: «Di': “Credo in Allāh”, e poi rimani saldo nella rettitudine!».",
      id: "Sufyan bin ‘Abdillah meminta kepada Nabi ﷺ satu ucapan ringkas tentang Islam yang membuatnya tak perlu bertanya lagi kepada orang lain; merangkum inti ayat ini, beliau bersabda: “Katakanlah: ‘Aku beriman kepada Allah’, lalu beristiqamahlah!”",
      ru: "Суфьян ибн ‘Абдуллах попросил Пророка ﷺ сказать об исламе столь исчерпывающие слова, чтобы больше никого не спрашивать; выразив самую суть этого аята, Пророк ﷺ ответил: «Скажи: “Я уверовал в Аллаха”, а затем будь стоек на прямом пути!»"
    }
  },
  "42:23": {
    type: "sabab",
    versets: ["42:23"],
    plage: "42:23",
    source: "Sahīh Al-Bukhārī n°4818",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) expliqua le sens exact de la demande du Prophète ﷺ aux habitants de La Mecque dans ce verset (« Je ne vous demande aucun salaire, sinon l'affection due aux liens de parenté ») : il n'existait aucun clan de Quraysh auquel le Prophète ﷺ ne fût uni par un lien de parenté. Le verset signifie donc : « Si vous refusez de croire pour l'instant, respectez au moins le lien de parenté qui nous unit et cessez de me nuire. »",
      en: "Ibn ‘Abbās explained the exact context of the Prophet's ﷺ appeal to the Makkans in this verse ('I ask of you no payment for it, except kindness through kinship'): every single clan of Quraysh shared blood ties with the Prophet ﷺ, so the verse means: 'At the very least, honor the ties of kinship between us and refrain from harming me.'",
      es: "Ibn ‘Abbās explicó el sentido exacto de esta aleya dirigida a los habitantes de La Meca: todos los clanes de Quraysh tenían lazos de parentesco con el Profeta ﷺ, por lo que significa «al menos respetad el vínculo familiar que nos une y cesad de perjudicarme».",
      ar: "عن ابن عباس رضي الله عنهما أنه بيّن المقصود بقوله تعالى ﴿إِلَّا الْمَوَدَّةَ فِي الْقُرْبَىٰ﴾؛ إذ لم يكن بطن من بطون قريش إلا وللنبي ﷺ فيهم قرابة، فمعنى الآية: إلا أن تصلوا ما بيني وبينكم من القرابة وتكفّوا عن أذاي.",
      de: "Ibn ‘Abbās erklärte den genauen Sinn dieses Verses gegenüber den Mekkanern: Jeder einzelne Stamm der Quraisch war mit dem Propheten ﷺ verwandt, sodass die Aussage bedeutet: „Achtet zumindest die Verwandtschaftsbande zwischen uns und lasst ab davon, mir Schaden zuzufügen.“",
      it: "Ibn ‘Abbās spiegò il senso preciso di questo versetto rivolto ai Meccani: non vi era clan di Quraysh che non avesse legami di parentela con il Profeta ﷺ, sicché il versetto significa: «Rispettate almeno i legami di parentela tra noi ed evitate di nuocermi».",
      id: "Ibnu ‘Abbas menjelaskan konteks ayat ini kepada penduduk Makkah: setiap kabilah Quraisy memiliki ikatan kekerabatan dengan Nabi ﷺ, sehingga maknanya ialah agar mereka minimal menjaga tali kekerabatan dengannya dan tidak menyakitinya.",
      ru: "Ибн ‘Аббас пояснил точный смысл этого аята, обращённого к мекканцам: у Пророка ﷺ были родственные связи со всеми родами курайшитов, поэтому слова означают: «По крайней мере, соблюдайте родственные узы между мной и вами и не причиняйте мне вреда»."
    }
  },
  "43:77": {
    type: "hadith",
    versets: ["43:77"],
    plage: "43:77",
    source: "Sahīh Al-Bukhārī n°4819 & Sahīh Muslim n°871",
    degre: "Sahīh",
    texte: {
      fr: "Ya‘lā ibn Umayyah (qu'Allāh l'agrée) rapporte qu'il entendit le Messager d'Allāh ﷺ réciter solennellement ce verset du haut de la chaire (« Et ils crieront : “Ô Mālik ! Que ton Seigneur mette fin à nos jours !” »), rappelant la gravité du châtiment de l'Enfer où les damnés supplieront son Ange gardien Mālik d'obtenir l'anéantissement, sans qu'aucune échappatoire ne leur soit accordée.",
      en: "Ya‘lā ibn Umayyah narrated that he heard the Messenger of Allāh ﷺ solemnly reciting this verse from the pulpit ('And they will call: “O Mālik! Let your Lord put an end to us!”'), reminding the believers of the gravity of the Hereafter where the condemned will plead with Mālik, the guardian angel of Hell.",
      es: "Ya‘lā ibn Umayyah relató que escuchó al Mensajero de Allah ﷺ recitar solemnemente desde el púlpito esta aleya sobre el clamor de los condenados hacia Mālik, el ángel guardián del Infierno, recordando la gravedad de la Otra Vida.",
      ar: "عن يعلى بن أمية رضي الله عنه أنه سمع رسول الله ﷺ يقرأ على المنبر هذه الآية الكريمة: ﴿وَنَادَوْا يَا مَالِكُ لِيَقْضِ عَلَيْنَا رَبُّكَ﴾، تذكيرًا بهول عذاب النار ومناشدة أهلها لخازنها مالك عليه السلام.",
      de: "Ya‘lā ibn Umayyah berichtete, dass er den Gesandten Allahs ﷺ auf der Kanzel diesen Vers feierlich rezitieren hörte, in dem die Verdammten den Wächterengel der Hölle (Mālik) anflehen – als eindringliche Mahnung vor dem Jenseits.",
      it: "Ya‘lā ibn Umayyah narrò di aver udito il Messaggero di Allāh ﷺ recitare solennemente dal pulpito questo versetto sull'invocazione rivolta a Mālik, l'angelo custode dell'Inferno, per ricordare la gravità dell'Aldilà.",
      id: "Ya‘la bin Umayyah meriwayatkan bahwa ia mendengar Rasulullah ﷺ membacakan ayat ini dari atas mimbar mengenai seruan penghuni neraka kepada Malaikat Malik sebagai peringatan keras akan dahsyatnya hari akhir.",
      ru: "Я‘ля ибн Умайя передал, что слышал, как Посланник Аллаха ﷺ торжественно читал этот аят с минбара о воззвании обитателей Огня к его стражу ангелу Малику, напоминая о тяжести Судного дня."
    }
  },
  "44:10": {
    type: "sabab",
    versets: ["44:10", "44:11", "44:12", "44:13", "44:14", "44:15", "44:16"],
    plage: "44:10–16",
    source: "Sahīh Al-Bukhārī n°4820, n°4821 & Sahīh Muslim n°2798",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd (qu'Allāh l'agrée) rapporte que devant l'obstination et la persécution de Quraysh, le Prophète ﷺ invoqua Allāh pour qu'ils connaissent des années de disette semblables aux sept années de famine du temps de Yūsuf. La faim les frappa si durement qu'en levant les yeux au ciel, l'homme affamé croyait voir une brume semblable à de la fumée (Ad-Dukhān). Ils supplièrent alors d'être délivrés en promettant de croire, puis retombèrent dans l'incrédulité une fois l'épreuve levée — jusqu'au « Grand Assaut » annoncé au verset 16, qui s'accomplit le jour de Badr.",
      en: "‘Abdullāh ibn Mas‘ūd narrated that when Quraysh stubbornly resisted and persecuted the believers, the Prophet ﷺ prayed for years of drought like the seven lean years of Yūsuf. Famine struck so severely that starving men looking up at the sky saw what resembled smoke (Ad-Dukhān). They pleaded for relief promising to believe, yet reverted once spared—culminating in the 'Greatest Seizure' of verse 16 at the Battle of Badr.",
      es: "‘Abdullāh ibn Mas‘ūd relató que ante la obstinación de Quraysh, el Profeta ﷺ pidió años de sequía como los de Yūsuf: el hambre fue tan intensa que al mirar al cielo creían ver humo (Ad-Dukhān). Suplicaron alivio prometiendo creer, pero recayeron hasta la «Gran Acometida» (v.16) en Badr.",
      ar: "عن عبد الله بن مسعود رضي الله عنه أنه لما اشتد أذى قريش دعا عليهم النبي ﷺ بسنين كسني يوسف، فأصابهم جوع شديد حتى كان الرجل ينظر إلى السماء فيرى بينه وبينها كهيئة الدخان من الجهد، فلما كُشف عنهم عادوا إلى كفرهم حتى أُخذوا بالبطشة الكبرى يوم بدر.",
      de: "‘Abdullāh ibn Mas‘ūd berichtete, dass die Quraisch nach dem Bittgebet des Propheten ﷺ von einer so schweren Dürre wie zu Zeiten Yūsufs getroffen wurden, dass Hungernde am Himmel wie Rauch (Ad-Dukhān) sahen. Nach der Linderung fielen sie jedoch in den Unglauben zurück, bis sie der „gewaltige Zugriff“ (V. 16) bei Badr traf.",
      it: "‘Abdullāh ibn Mas‘ūd narrò che di fronte all'ostinazione di Quraysh una carestia simile a quella di Giuseppe li colpì tanto duramente da far vedere come fumo (Ad-Dukhān) nel cielo per la fame. Sollevati dalla prova, tornarono alla miscredenza fino al «Grande Colpo» (v.16) a Badr.",
      id: "‘Abdullah bin Mas‘ud meriwayatkan bahwa akibat keangkuhan Quraisy, mereka ditimpa paceklik hebat seperti masa Nabi Yusuf hingga orang kelaparan melihat seperti asap (Ad-Dukhan) di langit. Setelah cobaan diangkat mereka kembali ingkar hingga ditimpa ‘hantaman besar’ (ayat 16) pada Perang Badar.",
      ru: "‘Абдуллах ибн Мас‘уд передал, что из-за упорства курайшитов их постигла суровая засуха, подобная годам Юсуфа, так что от голода им мерещился дым (ад-Духан) между небом и землёй. Когда бедствие было снято, они вернулись к неверию, пока их не настигла «великая хватка» (аят 16) при Бадре."
    }
  },
  "45:24": {
    type: "hadith",
    versets: ["45:24"],
    plage: "45:24",
    source: "Sahīh Al-Bukhārī n°4826 & Sahīh Muslim n°2246",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah (qu'Allāh l'agrée) rapporte ce Hadith Qudsī expliquant l'erreur des matérialistes préislamiques cités dans ce verset (« Et seul le Temps [Ad-Dahr] nous fait périr ») : le Prophète ﷺ a dit qu'Allāh déclare : « Le fils d'Adam Me porte offense en insultant le Temps (le sort), alors que c'est Moi qui suis le Maître du Temps : dans Ma Main se trouve le commandement, et c'est Moi qui fais alterner la nuit et le jour. »",
      en: "Abū Hurayrah narrated this Hadith Qudsī addressing the pre-Islamic fatalism quoted here ('Nothing destroys us except Time [Ad-Dahr]'): Allāh says, 'The son of Adam wrongs Me by cursing Time, for I am the Sovereign of Time; in My Hand is all command, and I alternate the night and the day.'",
      es: "Abū Hurayrah relató este Hadiz Qudsī frente a la creencia citada en esta aleya («solo el Tiempo nos hace perecer»): Allah declara que el ser humano Le ofende al maldecir el Tiempo, pues solo Allah gobierna el tiempo y hace alternar la noche y el día.",
      ar: "عن أبي هريرة رضي الله عنه في الحديث القدسي المبيّن لبطلان قول الجاهلية في هذه الآية: «يؤذيني ابن آدم يسب الدهر وأنا الدهر، بيدي الأمر أُقلّب الليل والنهار»؛ أي أن الله وحده هو مقلّب الدهر ومقدّر الأقدار.",
      de: "Abū Hurayrah berichtete dieses Hadith Qudsī zu dem hier zitierten Glauben („nichts vernichtet uns außer der Zeit“): Allah spricht, dass der Mensch Ihn kränkt, wenn er die Zeit verflucht, denn allein Allah lenkt die Zeit und lässt Nacht und Tag wechseln.",
      it: "Abū Hurayrah narrò questo Hadith Qudsī in risposta all'errore citato nel versetto («solo il Tempo ci fa perire»): Allāh afferma che l'uomo Lo offende maledicendo il Tempo, poiché è Allāh a governare il tempo e ad alternare la notte e il giorno.",
      id: "Abu Hurairah meriwayatkan Hadits Qudsi yang meluruskan keyakinan keliru dalam ayat ini: Allah berfirman bahwa manusia menyakiti-Nya bila mencela waktu/masa, padahal Allah-lah Pengatur waktu yang mempergilirkan malam dan siang.",
      ru: "Абу Хурайра передал хадис кудси, разъясняющий заблуждение из этого аята («губит нас только время»): Аллах говорит, что человек обижает Его, понося время, ибо именно Аллах управляет временем и сменяет ночь и день."
    }
  },
  "46:17": {
    type: "sabab",
    versets: ["46:17"],
    plage: "46:17",
    source: "Sahīh Al-Bukhārī n°4827",
    degre: "Sahīh",
    texte: {
      fr: "Yūsuf ibn Māhak rapporte que lorsque le gouverneur Marwān ibn al-Hakam prétendit en chaire que ce verset (sur le fils irrespectueux qui nie la Résurrection) avait été révélé au sujet de ‘Abd ar-Rahmān ibn Abī Bakr, ‘Ā’ishah (qu'Allāh l'agrée) le démentit formellement depuis derrière son rideau : elle jura qu'Allāh n'avait rien révélé dans le Coran au sujet de leur famille hormis les versets de son innocence (24:11–20), rappelant que ce verset vise de manière générale tout enfant ingrat envers ses parents et négateur de la Résurrection.",
      en: "Yūsuf ibn Māhak narrated that when Governor Marwān claimed from the pulpit that this verse about a disrespectful son denying the Resurrection was revealed regarding ‘Abd ar-Rahmān ibn Abī Bakr, ‘Ā’ishah firmly refuted him, swearing that Allāh revealed nothing about their family except her exoneration (24:11–20) and clarifying that the verse is a general warning.",
      es: "Yūsuf ibn Māhak relató que cuando el gobernador Marwān afirmó que esta aleya había sido revelada sobre ‘Abd ar-Rahmān ibn Abī Bakr, ‘Ā’ishah lo desmintió rotundamente aclarando que Allah no reveló nada sobre su familia salvo su absolución (24:11–20) y que esta aleya es una advertencia general.",
      ar: "عن يوسف بن ماهك أنه لما ادّعى مروان بن الحكم أن هذه الآية نزلت في عبد الرحمن بن أبي بكر كذّبته عائشة رضي الله عنها بحزم من وراء الحجاب وأقسمت أنه ما أنزل الله فينا شيئًا من القرآن إلا عذري (آيات الإفك)، مبينةً أن الآية عامة في كل عاقٍّ منكر للبعث.",
      de: "Yūsuf ibn Māhak berichtete, dass ‘Ā’ishah die Behauptung des Statthalters Marwān entschieden zurückwies, dieser Vers sei über ‘Abd ar-Rahmān ibn Abī Bakr offenbart worden: Sie bekräftigte, dass der Vers eine allgemeine Warnung vor Undankbarkeit gegenüber den Eltern und Leugnung der Auferstehung darstellt.",
      it: "Yūsuf ibn Māhak narrò che quando il governatore Marwān sostenne che questo versetto riguardasse ‘Abd ar-Rahmān ibn Abī Bakr, ‘Ā’ishah lo smentì categoricamente chiarendo che Allāh non rivelò nulla sulla loro famiglia eccetto la sua assoluzione (24:11–20) e che il versetto è un monito generale.",
      id: "Yusuf bin Mahak meriwayatkan bahwa ketika Marwan mengklaim ayat ini turun tentang ‘Abdurrahman bin Abu Bakar, ‘Aisyah membantahnya dengan tegas dan menjelaskan bahwa ayat ini merupakan peringatan umum bagi siapa pun yang durhaka dan mengingkari hari kebangkitan.",
      ru: "Юсуф ибн Махак передал, что когда наместник Марван заявил, будто этот аят ниспослан о ‘Абдуррахмане ибн Абу Бакре, ‘Аиша решительно опровергла его, подчеркнув, что о их семье были ниспосланы лишь аяты её оправдания (24:11–20), а этот аят носит общий характер."
    }
  },
  "46:24": {
    type: "hadith",
    versets: ["46:24"],
    plage: "46:24",
    source: "Sahīh Al-Bukhārī n°4828, n°4829 & Sahīh Muslim n°899",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) rapporte que chaque fois que le Messager d'Allāh ﷺ apercevait un nuage sombre ou un vent violent se lever à l'horizon, son visage changeait d'inquiétude et il multipliait les invocations jusqu'à ce que la pluie tombe. Lorsque ‘Ā’ishah lui demanda pourquoi il éprouvait cette crainte alors que les autres se réjouissaient, il répondit : « Qu'est-ce qui m'assure qu'il ne renferme pas un châtiment ? Un peuple ancien (les ‘Ād) vit un nuage venir et s'écria : “Voici un nuage qui va nous apporter la pluie !” — alors qu'il portait un vent de châtiment ! »",
      en: "‘Ā’ishah narrated that whenever the Messenger of Allāh ﷺ saw dark clouds or strong wind forming on the horizon, his face showed apprehension until rain fell. When ‘Ā’ishah asked why, he replied: 'What assures me it does not contain punishment? An earlier people (‘Ād) saw a cloud approaching and rejoiced saying “This is a cloud bringing us rain,” whereas it carried a punishing wind!'",
      es: "‘Ā’ishah relató que cada vez que el Profeta ﷺ veía nubes densas o viento fuerte en el horizonte mostraba temor hasta que llovía; al preguntarle la razón, recordó este versículo en el que el pueblo de ‘Ād celebró una nube creyéndola lluvia cuando traía un viento de castigo.",
      ar: "عن عائشة رضي الله عنها أن النبي ﷺ كان إذا رأى غيمًا أو ريحًا شديدة عُرف ذلك في وجهه حتى يُمطر، فلما سألته عائشة عن ذلك قال: «وما يؤمّنني أن يكون فيه عذاب؟ قد عُذّب قوم بالريح، وقد رأى قوم (عاد) العذاب فقالوا: هذا عارض ممطرنا!».",
      de: "‘Ā’ishah berichtete, dass das Gesicht des Propheten ﷺ stets Besorgnis zeigte, wenn dunkle Wolken oder starker Wind aufzogen. Auf ihre Frage erinnerte er an diesen Vers: Das Volk ‘Ād freute sich über eine nahende Wolke in der Hoffnung auf Regen, doch sie brachte einen strafenden Sturm.",
      it: "‘Ā’ishah narrò che ogni volta che il Profeta ﷺ vedeva nubi scure o vento forte mostrava timore fino alla pioggia; interrogato da lei, richiamò questo versetto in cui il popolo di ‘Ād esultò per una nube credendola pioggia mentre recava un vento di castigo.",
      id: "‘Aisyah meriwayatkan bahwa setiap kali melihat awan gelap atau angin kencang, tampak kekhawatiran di wajah Nabi ﷺ hingga hujan turun; beliau menjelaskan bahwa kaum ‘Ad dahulu mengira awan azab sebagai hujan sebagaimana disebutkan dalam ayat ini.",
      ru: "‘Аиша передала, что при виде тёмных туч или сильного ветра на лице Пророка ﷺ появлялась тревога, пока не начинался дождь; он объяснил это данным аятом о народе ‘ад, который обрадовался туче, приняв её за дождь, тогда как она несла губительный ветер."
    }
  },
  "46:29": {
    type: "sabab",
    versets: ["46:29", "46:30", "46:31", "46:32"],
    plage: "46:29–32",
    source: "Sahīh Al-Bukhārī n°773, n°4921 & Sahīh Muslim n°449",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte qu'alors que le Messager d'Allāh ﷺ dirigeait la prière de l'aube avec ses Compagnons dans la vallée de Nakhlah (en chemin vers le marché de ‘Ukāz), un groupe de Djinns passa à proximité et entendit la récitation du Coran. Ils s'arrêtèrent, s'imposèrent le silence pour écouter attentivement, crurent aussitôt au Message et retournèrent avertir leur peuple. Le Prophète ﷺ ne les avait pas vus : c'est par la révélation de ces versets qu'Allāh l'informa de leur écoute et de leur conversion.",
      en: "Ibn ‘Abbās narrated that while the Messenger of Allāh ﷺ led the Fajr prayer at Nakhlah on the way to the market of ‘Ukāz, a passing group of jinn heard his recitation of the Qur'an, urged one another to listen in silence, believed immediately, and returned to warn their people. Allāh informed the Prophet ﷺ of their listening through the revelation of these verses.",
      es: "Ibn ‘Abbās relató que mientras el Profeta ﷺ dirigía la oración del alba en Nakhlah, un grupo de genios escuchó su recitación del Corán, se impuso silencio para atender, creyó de inmediato y regresó a advertir a su pueblo, informando Allah al Profeta ﷺ mediante estas aleyas.",
      ar: "عن ابن عباس رضي الله عنهما أن النبي ﷺ بينما كان يصلي بأصحابه صلاة الفجر ببطن نخلة مرّ نفر من الجن فسمعوا القرآن وأنصتوا له وآمنوا به ثم ولّوا إلى قومهم منذرين، فأوحى الله إلى نبيه ﷺ هذه الآيات ليخبره باستماعهم وإيمانهم.",
      de: "Ibn ‘Abbās berichtete, dass eine vorbeiziehende Gruppe von Dschinn die Koranrezitation des Propheten ﷺ beim Morgengebet in Nakhlah hörte, einander zum stillen Zuhören mahnte, sogleich glaubte und als Warner zu ihrem Volk zurückkehrte – wovon Allah den Propheten ﷺ durch diese Verse unterrichtete.",
      it: "Ibn ‘Abbās narrò che mentre il Profeta ﷺ guidava la preghiera dell'alba a Nakhlah, un gruppo di jinn di passaggio ascoltò in silenzio la recitazione del Corano, credette subito e tornò ad ammonire il proprio popolo; Allāh ne informò il Profeta ﷺ con questi versetti.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa saat Nabi ﷺ mengimami shalat Subuh di Nakhlah, serombongan jin lewat lalu diam menyimak bacaan Al-Qur'an, seketika beriman, dan kembali memberi peringatan kepada kaumnya; Allah mengabarkan peristiwa ini melalui ayat-ayat tersebut.",
      ru: "Ибн ‘Аббас передал, что когда Пророк ﷺ совершал утреннюю молитву в долине Нахля, проходившая мимо группа джиннов услышала чтение Корана, призвала друг друга к тишине, сразу уверовала и вернулась предостерегать свой народ, о чём Аллах сообщил Пророку ﷺ в этих аятах."
    }
  },
  "47:22": {
    type: "hadith",
    versets: ["47:22", "47:23"],
    plage: "47:22–23",
    source: "Sahīh Al-Bukhārī n°4830, n°5987 & Sahīh Muslim n°2554",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ a enseigné qu'après avoir achevé la création, les liens de parenté (Ar-Rahim) implorèrent la protection d'Allāh contre toute rupture. Allāh leur promit : « Ne te suffit-il pas que Je maintienne le lien avec celui qui te maintient, et que Je rompe avec celui qui te rompt ? » Puis le Prophète ﷺ ajouta : « Récitez, si vous le voulez, ce verset mettant en garde contre la corruption sur terre et la rupture des liens de parenté. »",
      en: "Abū Hurayrah narrated that the Messenger of Allāh ﷺ taught that when Allāh completed creation, kinship ties (Ar-Rahim) sought refuge from being severed, and Allāh promised: 'I will keep ties with whoever upholds you and sever ties with whoever severs you.' The Prophet ﷺ then added: 'Recite if you wish this verse warning against spreading corruption and severing ties of kinship.'",
      es: "Abū Hurayrah relató que el Profeta ﷺ enseñó que Allah prometió mantener Su vínculo con quien preserva los lazos familiares y romperlo con quien los corta, añadiendo: «Recitad si queréis esta aleya» que advierte contra sembrar corrupción y romper el parentesco.",
      ar: "عن أبي هريرة رضي الله عنه أن النبي ﷺ أخبر أن الله لما فرغ من الخلق قامت الرحم مستعيذةً من القطيعة فقال الله لها: «أما ترضين أن أصل من وصلك وأقطع من قطعك؟»، ثم قال النبي ﷺ: «فاقرؤوا إن شئتم: ﴿فَهَلْ عَسَيْتُمْ إِن تَوَلَّيْتُمْ أَن تُفْسِدُوا فِي الْأَرْضِ وَتُقَطِّعُوا أَرْحَامَكُمْ﴾».",
      de: "Abū Hurayrah berichtete, dass der Prophet ﷺ lehrte, Allah habe den Verwandtschaftsbanden versprochen, sich mit dem zu verbinden, der sie pflegt, und sich von dem zu trennen, der sie zerreißt, und fügte hinzu: „Lest, wenn ihr wollt, diesen Vers.“",
      it: "Abū Hurayrah narrò che il Profeta ﷺ insegnò che Allāh promise ai legami di parentela di restare unito a chi li custodisce e di separarsi da chi li spezza, aggiungendo poi: «Recitate se volete questo versetto» che ammonisce dal rompere i legami familiari.",
      id: "Abu Hurairah meriwayatkan sabda Nabi ﷺ bahwa Allah berjanji menyambung rahmat-Nya kepada orang yang menjaga silaturahmi dan memutusnya bagi yang memutus silaturahmi, lalu beliau bersabda: “Bacalah jika kalian mau ayat ini.”",
      ru: "Абу Хурайра передал слова Пророка ﷺ о том, что Аллах пообещал родственным узам поддерживать связь с тем, кто поддерживает их, и порвать с тем, кто порывает их, а затем добавил: «Прочтите, если желаете, этот аят»."
    }
  },
  "47:38": {
    type: "sabab",
    versets: ["47:38"],
    plage: "47:38",
    source: "Sahīh Muslim n°2546",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah (qu'Allāh l'agrée) rapporte qu'à la révélation de la fin de ce verset (« Et si vous vous détournez, Il vous remplacera par un autre peuple, et ils ne seront pas comme vous »), les Compagnons demandèrent : « Ô Messager d'Allāh, quels sont ces gens qui nous remplaceraient si nous nous détournions ? » Le Prophète ﷺ posa alors sa main sur l'épaule de Salmān Al-Fārisī et déclara : « Cet homme et son peuple ! Quand bien même la religion serait suspendue aux Pléiades, des hommes parmi les Perses l'atteindraient ! »",
      en: "Abū Hurayrah narrated that when the end of this verse was revealed ('And if you turn away, He will replace you with another people, and they will not be the likes of you'), the Companions asked who those people were. The Prophet ﷺ placed his hand on Salmān Al-Fārisī's shoulder and said: 'This man and his people! Even if religion were suspended at the Pleiades, men from among the Persians would reach it.'",
      es: "Abū Hurayrah relató que al revelarse el final de esta aleya los Compañeros preguntaron quién sería ese otro pueblo; el Profeta ﷺ puso su mano sobre el hombro de Salmān Al-Fārisī y dijo: «¡Este y su pueblo! Aunque la religión estuviera junto a las Pléyades, hombres de Persia la alcanzarían».",
      ar: "عن أبي هريرة رضي الله عنه أنه لما نزل قوله تعالى: ﴿وَإِن تَتَوَلَّوْا يَسْتَبْدِلْ قَوْمًا غَيْرَكُمْ ثُمَّ لَا يَكُونُوا أَمْثَالَكُمْ﴾ سأل الصحابة: من هؤلاء؟ فضرب النبي ﷺ على منكب سلمان الفارسي وقال: «هذا وقومه، لو كان الدين عند الثريا لتناوله رجال من فارس».",
      de: "Abū Hurayrah berichtete, dass die Gefährten nach der Offenbarung dieses Versendes fragten, wer jenes andere Volk sei; der Prophet ﷺ legte seine Hand auf die Schulter von Salmān Al-Fārisī und sagte: „Dieser und sein Volk! Selbst wenn der Glaube bei den Plejaden hinge, würden Männer aus Persien ihn erreichen.“",
      it: "Abū Hurayrah narrò che alla rivelazione della fine di questo versetto i Compagni chiesero chi fosse quell'altro popolo; il Profeta ﷺ posò la mano sulla spalla di Salmān Al-Fārisī e disse: «Costui e il suo popolo! Anche se la fede fosse sospesa alle Pleiadi, uomini di Persia la raggiungerebbero».",
      id: "Abu Hurairah meriwayatkan bahwa saat akhir ayat ini turun, para sahabat bertanya siapakah kaum pengganti itu; Nabi ﷺ menepuk bahu Salman Al-Farisi seraya bersabda: “Orang ini dan kaumnya; seandainya agama berada di bintang Tsurayya, niscaya orang-orang dari Persia akan meraihnya.”",
      ru: "Абу Хурайра передал, что после ниспослания окончания этого аята сподвижники спросили, кто же этот другой народ; Пророк ﷺ положил руку на плечо Сальмана аль-Фариси и сказал: «Этот человек и его народ! Даже если бы вера была у Плеяд, люди из Персии достигли бы её»."
    }
  }
};

// Auto-contrôle strict avant écriture (8 langues + champs obligatoires)
const LANGUES_REQ = ['fr', 'en', 'es', 'ar', 'de', 'it', 'id', 'ru'];
for (const [cle, rec] of Object.entries(LOT_08_SABA_MUHAMMAD)) {
  if (!rec.type || !rec.source || !rec.degre || !Array.isArray(rec.versets) || !rec.texte) {
    throw new Error(`Structure invalide pour ${cle}`);
  }
  for (const lg of LANGUES_REQ) {
    if (!rec.texte[lg] || typeof rec.texte[lg] !== 'string' || rec.texte[lg].trim().length < 20) {
      throw new Error(`Texte manquant ou trop court pour ${cle} [${lg}]`);
    }
  }
}

Object.assign(data.recits, LOT_08_SABA_MUHAMMAD);
data.version = (data.version || 1) + 1;

const jsonFinal = JSON.stringify(data, null, 2);
JSON.parse(jsonFinal);
writeSafe(asbabPath, jsonFinal);

let worker = fs.readFileSync(workerPath, 'utf8');
worker = worker.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
writeSafe(workerPath, worker);

const nbRecits = Object.keys(data.recits).length;
const nbVersets = Object.values(data.recits).reduce((acc, r) => acc + (Array.isArray(r.versets) ? r.versets.length : 1), 0);
console.log(`✅ Lot 8 (Sourates 34 à 47) validé et intégré ! Total actuel : ${nbRecits} récits couvrant ${nbVersets} versets en 8 langues.`);
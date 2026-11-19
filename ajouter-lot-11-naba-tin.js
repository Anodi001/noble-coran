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

const LOT_11_NABA_TIN = {
  "80:1": {
    type: "sabab",
    versets: ["80:1", "80:2", "80:3", "80:4", "80:5", "80:6", "80:7", "80:8", "80:9", "80:10"],
    plage: "80:1–10",
    source: "Sunan At-Tirmidhī n°3331 & Al-Muwatta'",
    degre: "Hasan",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) rapporte que ces dix versets furent révélés au sujet du Compagnon aveugle ‘Abdullāh ibn Umm Maktūm : alors que le Messager d'Allāh ﷺ s'entretenait avec des chefs polythéistes de Quraysh dans l'espoir qu'ils embrassent l'Islam, Ibn Umm Maktūm arriva en demandant : « Ô Messager d'Allāh, enseigne-moi ce qu'Allāh t'a appris ! » Absorbé par son échange, le Prophète ﷺ fronça les sourcils et se détourna. Allāh fit aussitôt descendre ce doux reproche rappelant que celui qui accourt avec sincérité et crainte révérencielle mérite la priorité absolue. Par la suite, le Prophète ﷺ accueillait toujours Ibn Umm Maktūm en disant : « Bienvenue à celui pour qui mon Seigneur m'a adressé un reproche ! »",
      en: "‘Ā’ishah narrated that these ten verses were revealed concerning the blind Companion ‘Abdullāh ibn Umm Maktūm: while the Messenger of Allāh ﷺ was speaking with polytheist leaders of Quraysh hoping they would embrace Islam, Ibn Umm Maktūm arrived asking to be taught. Preoccupied with the leaders, the Prophet ﷺ frowned and turned away. Allāh immediately revealed this gentle admonition affirming that the sincere seeker deserves utmost attention; thereafter the Prophet ﷺ warmly greeted him saying: 'Welcome to the one on whose account my Lord admonished me!'",
      es: "‘Ā’ishah relató que estas diez aleyas descendieron respecto al Compañero ciego ‘Abdullāh ibn Umm Maktūm: mientras el Profeta ﷺ dialogaba con jefes de Quraysh esperando su conversión, aquel llegó pidiendo enseñanza y el Profeta ﷺ frunció el ceño y se volvió. Allah reveló enseguida este reproche recordando que el creyente sincero merece total prioridad.",
      ar: "عن عائشة رضي الله عنها أن هذه الآيات العشر نزلت في الصحابي الأعمى عبد الله بن أم مكتوم؛ إذ أقبل على النبي ﷺ يطلب العلم بينما كان ﷺ منشغلًا بدعوة كبراء قريش فأعرض عنه وعبس، فعاتبه الله عتابًا لطيفًا وبيّن أن الصادق المقبل على الهداية أحق بالإقبال، فكان النبي ﷺ بعد ذلك يكرمه ويقول: «مرحبًا بمن عاتبني فيه ربي».",
      de: "‘Ā’ishah berichtete, dass diese zehn Verse wegen des blinden Gefährten ‘Abdullāh ibn Umm Maktūm offenbart wurden: Während der Prophet ﷺ mit Führern der Quraisch sprach, bat dieser um Belehrung, und der Prophet ﷺ runzelte die Stirn und wandte sich ab. Allah ermahnte ihn sanft, dass dem aufrichtigen Suchenden der Vorrang gebührt, woraufhin der Prophet ﷺ ihn fortan besonders herzlich begrüßte.",
      it: "‘Ā’ishah narrò che questi dieci versetti furono rivelati riguardo al Compagno cieco ‘Abdullāh ibn Umm Maktūm: mentre il Profeta ﷺ parlava con i capi dei Quraysh sperando nella loro conversione, egli chiese istruzione e il Profeta ﷺ aggrottò la fronte. Allāh lo rimproverò con dolcezza ricordando che chi cerca la guida con sincerità ha la priorità assoluta.",
      id: "‘Aisyah meriwayatkan bahwa sepuluh ayat ini turun berkenaan dengan sahabat tunanetra ‘Abdullah bin Ummi Maktum yang datang meminta bimbingan saat Nabi ﷺ sedang mendakwahi pemuka Quraisy sehingga beliau bermuka masam. Allah segera menegur dengan lembut bahwa pencari kebenaran yang tulus lebih berhak diutamakan.",
      ru: "‘Аиша передала, что эти десять аятов были ниспосланы по поводу слепого сподвижника ‘Абдуллаха ибн Умм Мактума: когда он попросил наставления во время беседы Пророка ﷺ с вождями курайшитов, Пророк ﷺ нахмурился и отвернулся. Аллах мягко упрекнул его, указав, что искренне стремящийся к вере заслуживает первоочередного внимания."
    }
  },
  "80:15": {
    type: "hadith",
    versets: ["80:15", "80:16"],
    plage: "80:15–16",
    source: "Sahīh Al-Bukhārī n°4937 & Sahīh Muslim n°798",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ a relié le rang des lecteurs du Coran aux Anges évoqués dans ces deux versets : « Celui qui récite le Coran avec maîtrise sera en compagnie des nobles et obéissants Anges scribes (As-Safarah al-Kirām al-Bararah) ; quant à celui qui le récite avec peine et hésitation, il obtient une double récompense » (l'une pour sa lecture, l'autre pour son effort).",
      en: "‘Ā’ishah narrated that the Messenger of Allāh ﷺ linked reciters of the Qur'an to the angels described in these verses: 'The one who is proficient in reciting the Qur'an will be with the noble and righteous angelic scribes (As-Safarah al-Kirām al-Bararah), while the one who recites it with difficulty and stammering receives a double reward.'",
      es: "‘Ā’ishah relató que el Profeta ﷺ vinculó a los lectores del Corán con los ángeles mencionados aquí: «Quien recita el Corán con maestría estará con los nobles y obedientes ángeles escribas, y quien lo lee con esfuerzo y dificultad tendrá doble recompensa».",
      ar: "عن عائشة رضي الله عنها أن رسول الله ﷺ قال: «الماهر بالقرآن مع السفرة الكرام البررة، والذي يقرأ القرآن ويتتعتع فيه وهو عليه شاق له أجران» — أجر القراءة وأجر المشقة.",
      de: "‘Ā’ishah berichtete, dass der Gesandte Allahs ﷺ sagte: „Wer den Koran meisterhaft rezitiert, wird bei den edlen, gehorsamen Schreibengeln sein; wer ihn jedoch mit Mühe und Stocken liest, erhält doppelten Lohn.“",
      it: "‘Ā’ishah narrò che il Messaggero di Allāh ﷺ disse: «Chi recita il Corano con maestria sarà in compagnia dei nobili e obbedienti angeli scribi, mentre chi lo legge con fatica e sforzo riceverà una doppia ricompensa».",
      id: "‘Aisyah meriwayatkan sabda Rasulullah ﷺ: “Orang yang mahir membaca Al-Qur'an akan bersama para malaikat pencatat yang mulia lagi taat, sedangkan orang yang membacanya terbata-bata dengan susah payah mendapat dua pahala.”",
      ru: "‘Аиша передала слова Посланника Аллаха ﷺ: «Искусный в чтении Корана пребудет с благородными и покорными ангелами-писцами, а тому, кто читает Коран с трудом и запинками, полагается двойная награда»."
    }
  },
  "81:1": {
    type: "hadith",
    versets: ["81:1"],
    plage: "81:1",
    source: "Sunan At-Tirmidhī n°3333 & Musnad Ahmad",
    degre: "Hasan",
    texte: {
      fr: "‘Abdullāh ibn ‘Umar (qu'Allāh les agrée) rapporte que le Messager d'Allāh ﷺ a souligné la force saisissante des tableaux eschatologiques de cette sourate : « Quiconque souhaite contempler le Jour de la Résurrection comme s'il le voyait de ses propres yeux, qu'il récite : “Quand le soleil sera obscurci” (At-Takwīr, 81), “Quand le ciel se rompra” (Al-Infitār, 82) et “Quand le ciel se déchirera” (Al-Inshiqāq, 84) ! »",
      en: "‘Abdullāh ibn ‘Umar narrated that the Messenger of Allāh ﷺ highlighted the vivid power of this surah's scenes: 'Whoever wishes to look upon the Day of Resurrection as though seeing it with his own eyes should recite: “When the sun is wrapped up” (81), “When the sky breaks apart” (82), and “When the sky is split open” (84).'",
      es: "‘Abdullāh ibn ‘Umar relató que el Profeta ﷺ destacó la viveza de estas escenas del Día Final: «Quien desee contemplar el Día de la Resurrección como si lo viera con sus propios ojos, que recite At-Takwīr (81), Al-Infitār (82) y Al-Inshiqāq (84)».",
      ar: "عن عبد الله بن عمر رضي الله عنهما أن رسول الله ﷺ قال: «من سرّه أن ينظر إلى يوم القيامة كأنه رأيُ عين فليقرأ: ﴿إِذَا الشَّمْسُ كُوِّرَتْ﴾، و﴿إِذَا السَّمَاءُ انفَطَرَتْ﴾، و﴿إِذَا السَّمَاءُ انشَقَّتْ﴾».",
      de: "‘Abdullāh ibn ‘Umar berichtete, dass der Gesandte Allahs ﷺ sagte: „Wer den Tag der Auferstehung betrachten möchte, als sähe er ihn mit eigenen Augen, der möge At-Takwīr (81), Al-Infitār (82) und Al-Inshiqāq (84) rezitieren.“",
      it: "‘Abdullāh ibn ‘Umar narrò che il Messaggero di Allāh ﷺ disse: «Chi desidera contemplare il Giorno della Resurrezione come se lo vedesse con i propri occhi, reciti At-Takwīr (81), Al-Infitār (82) e Al-Inshiqāq (84)».",
      id: "‘Abdullah bin ‘Umar meriwayatkan sabda Rasulullah ﷺ: “Siapa yang ingin melihat gambaran Hari Kiamat seakan-akan menyaksikannya dengan mata kepala sendiri, hendaklah ia membaca At-Takwir (81), Al-Infithar (82), dan Al-Insyiqaq (84).”",
      ru: "‘Абдуллах ибн ‘Умар передал слова Посланника Аллаха ﷺ: «Кто желает увидеть День Воскресения словно воочию, пусть прочтёт суры “Ат-Таквир” (81), “Аль-Инфитар” (82) и “Аль-Иншикак” (84)»."
    }
  },
  "83:1": {
    type: "sabab",
    versets: ["83:1", "83:2", "83:3"],
    plage: "83:1–3",
    source: "Sunan Ibn Mājah n°2223 & Sunan An-Nasā'ī al-Kubrā",
    degre: "Hasan",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte qu'à l'arrivée du Prophète ﷺ à Médine, la fraude dans les poids et les mesures était très répandue sur les marchés locaux. Dès qu'Allāh fit descendre cet avertissement solennel (« Malheur aux fraudeurs qui exigent pleine mesure lorsqu'ils achètent, mais qui trichent lorsqu'ils vendent »), les habitants de Médine réformèrent immédiatement leurs pratiques commerciales et devinrent exemplaires d'équité dans la pesée.",
      en: "Ibn ‘Abbās narrated that when the Prophet ﷺ arrived in Madinah, cheating in weights and measures was widespread in the markets. Once Allāh revealed this stern warning ('Woe to those who give less than due'), the people of Madinah immediately reformed their trade and became exemplary in fair measurement.",
      es: "Ibn ‘Abbās relató que al llegar el Profeta ﷺ a Medina era habitual el fraude en pesos y medidas; en cuanto descendió esta severa advertencia («¡Ay de los defraudadores!»), los habitantes de Medina corrigieron de inmediato sus balanzas y pasaron a pesar con ejemplar equidad.",
      ar: "عن ابن عباس رضي الله عنهما قال: لما قدم النبي ﷺ المدينة كانوا من أخبث الناس كيلًا، فأنزل الله تعالى: ﴿وَيْلٌ لِّلْمُطَفِّفِينَ﴾ فأحسنوا الكيل بعد ذلك واستقاموا على العدل في الميزان.",
      de: "Ibn ‘Abbās berichtete, dass bei der Ankunft des Propheten ﷺ in Medina Betrug bei Maß und Gewicht verbreitet war; kaum hatte Allah diese strenge Warnung („Wehe den Betrügern!“) offenbart, besserten die Bewohner Medinas sofort ihre Handelsgewohnheiten und maßen gerecht.",
      it: "Ibn ‘Abbās narrò che all'arrivo del Profeta ﷺ a Medina la frode nei pesi e nelle misure era diffusa; non appena Allāh rivelò questo severo monito («Guai ai frodatori!»), gli abitanti di Medina corressero subito le bilance diventando esemplari nell'equità.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa setibanya Nabi ﷺ di Madinah kecurangan takaran masih marak terjadi; begitu Allah menurunkan ayat ancaman keras ini, penduduk Madinah segera memperbaiki timbangan mereka dengan sangat jujur.",
      ru: "Ибн ‘Аббас передал, что по прибытии Пророка ﷺ в Медину там был распространён обвес в торговле; как только Аллах ниспослал это суровое предостережение («Горе обвешивающим!»), жители Медины немедленно исправили свои весы и стали образцом честности."
    }
  },
  "83:6": {
    type: "hadith",
    versets: ["83:6"],
    plage: "83:6",
    source: "Sahīh Al-Bukhārī n°4938 & Sahīh Muslim n°2862",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn ‘Umar (qu'Allāh les agrée) rapporte que le Messager d'Allāh ﷺ commenta ce verset (« Le jour où les gens se tiendront debout devant le Seigneur des mondes ») en décrivant l'intensité de cette station prolongée du Jugement, où certains coupables se retrouveront immergés dans leur propre sueur jusqu'à la moitié des oreilles.",
      en: "‘Abdullāh ibn ‘Umar narrated that the Messenger of Allāh ﷺ commented on this verse ('The Day when mankind will stand before the Lord of the worlds'), describing the intensity of that standing when some people will stand submerged in their own sweat up to the middle of their ears.",
      es: "‘Abdullāh ibn ‘Umar relató que el Profeta ﷺ comentó esta aleya describiendo la gravedad de aquel día en que la humanidad permanecerá de pie ante el Señor de los mundos y algunos quedarán sumergidos en su propio sudor hasta la mitad de las orejas.",
      ar: "عن عبد الله بن عمر رضي الله عنهما أن النبي ﷺ قال في تفسير قوله تعالى: ﴿يَوْمَ يَقُومُ النَّاسُ لِرَبِّ الْعَالَمِينَ﴾: «حتى يغيب أحدهم في رشحه إلى أنصاف أذنيه» من شدة هول ذلك الموقف.",
      de: "‘Abdullāh ibn ‘Umar berichtete, dass der Prophet ﷺ diesen Vers über das Stehen vor dem Herrn der Welten erläuterte und die Schwere jenes Tages beschrieb, an dem manche bis zur Mitte ihrer Ohren in ihrem eigenen Schweiß stehen werden.",
      it: "‘Abdullāh ibn ‘Umar narrò che il Profeta ﷺ commentò questo versetto descrivendo l'intensità di quel giorno in cui gli uomini staranno in piedi davanti al Signore dei mondi e alcuni saranno immersi nel proprio sudore fino a metà delle orecchie.",
      id: "‘Abdullah bin ‘Umar meriwayatkan penjelasan Nabi ﷺ atas ayat tentang hari manusia berdiri menghadap Tuhan semesta alam, bahwa saking dahsyatnya suasana saat itu sebagian orang tenggelam dalam keringatnya sendiri hingga setengah telinganya.",
      ru: "‘Абдуллах ибн ‘Умар передал комментарий Пророка ﷺ к этому аяту о дне, когда люди предстанут перед Господом миров: от тяжести стояния некоторые погрузятся в собственный пот до середины ушей."
    }
  },
  "83:14": {
    type: "hadith",
    versets: ["83:14"],
    plage: "83:14",
    source: "Sunan At-Tirmidhī n°3334 & Sunan Ibn Mājah n°4244",
    degre: "Hasan",
    texte: {
      fr: "Abū Hurayrah (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ expliqua le « voile de rouille » (Ar-Rān) mentionné dans ce verset : « Lorsque le serviteur commet un péché, une tache noire se dépose sur son cœur. S'il cesse, implore pardon et se repent, son cœur est aussitôt purifié et poli ; mais s'il persiste dans les péchés, cette noirceur s'étend jusqu'à recouvrir tout son cœur : c'est cela le Rān qu'Allāh évoque dans ce verset ! »",
      en: "Abū Hurayrah narrated that the Messenger of Allāh ﷺ explained the 'stain' (Ar-Rān) in this verse: 'When a servant commits a sin, a black spot appears on his heart. If he stops, seeks forgiveness, and repents, his heart is polished clean; but if he continues sinning, it spreads until it envelops his heart—that is the Rān Allāh mentions here!'",
      es: "Abū Hurayrah relató que el Profeta ﷺ explicó la «herrumbre» (Ar-Rān) de esta aleya: cada pecado deja una mancha negra en el corazón; si el siervo se arrepiente, el corazón se limpia y pule, pero si persiste en pecar, la mancha termina cubriéndolo por completo.",
      ar: "عن أبي هريرة رضي الله عنه أن النبي ﷺ فسّر «الرَّان» في هذه الآية فقال: «إن العبد إذا أخطأ خطيئة نُكتت في قلبه نكتة سوداء، فإذا نزع واستغفر وتاب صُقل قلبه، وإن عاد زيد فيها حتى تعلو قلبه، وهو الران الذي ذكر الله».",
      de: "Abū Hurayrah berichtete, dass der Prophet ﷺ den hier genannten „Rost“ (Ar-Rān) erklärte: Jede Sünde hinterlässt einen schwarzen Punkt auf dem Herzen; bereut der Mensch, wird das Herz wieder rein poliert, fährt er jedoch fort, überzieht die Schwärze das gesamte Herz.",
      it: "Abū Hurayrah narrò che il Profeta ﷺ spiegò la «ruggine» (Ar-Rān) di questo versetto: ogni peccato lascia una macchia nera sul cuore; con il pentimento il cuore torna limpido, mentre persistendo nel peccato la macchia finisce per ricoprirlo interamente.",
      id: "Abu Hurairah meriwayatkan penjelasan Nabi ﷺ tentang ‘noda penutup’ (Ar-Ran) dalam ayat ini: setiap dosa menorehkan titik hitam di hati; bila bertobat hati kembali bersih, namun bila terus berdosa noda itu kian melebar hingga menutupi seluruh hati.",
      ru: "Абу Хурайра передал разъяснение Пророка ﷺ о «покрове» (ар-ран) из этого аята: каждый грех оставляет на сердце чёрное пятно; при покаянии сердце очищается, но если человек упорствует в грехах, чернота полностью покрывает его сердце."
    }
  },
  "84:7": {
    type: "hadith",
    versets: ["84:7", "84:8"],
    plage: "84:7–8",
    source: "Sahīh Al-Bukhārī n°103, n°4939 & Sahīh Muslim n°2876",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ déclara : « Quiconque subit un examen minutieux de ses comptes au Jour du Jugement sera châtié. » ‘Ā’ishah lui demanda alors : « Allāh n'a-t-Il pourtant pas dit dans ce verset : “Il sera soumis à un jugement facile” ? » Le Prophète ﷺ précisa : « Cela désigne la simple présentation des œuvres (Al-‘Ard) par miséricorde d'Allāh ; en revanche, celui dont les comptes sont passés au crible encourt la perte ! »",
      en: "‘Ā’ishah narrated that the Messenger of Allāh ﷺ said: 'Whoever is scrutinized in reckoning on Judgment Day will be punished.' ‘Ā’ishah asked: 'Does Allāh not say here, “He will be judged with an easy reckoning”?' He replied: 'That refers only to the simple presentation of deeds (Al-‘Ard), whereas anyone cross-examined in reckoning will perish.'",
      es: "‘Ā’ishah relató que cuando el Profeta ﷺ dijo que quien sea interrogado minuciosamente en el Juicio será castigado, ella citó esta aleya («recibirá una cuenta fácil»); él aclaró que la cuenta fácil es la simple exposición de las obras por misericordia, no un escrutinio severo.",
      ar: "عن عائشة رضي الله عنها أن النبي ﷺ قال: «من حُوسب عُذّب»، فسألته عائشة: أوليس يقول الله تعالى: ﴿فَسَوْفَ يُحَاسَبُ حِسَابًا يَسِيرًا﴾؟ فأجابها ﷺ: «إنما ذلك العَرض، ولكن من نُوقش الحساب يهلك».",
      de: "‘Ā’ishah berichtete, dass der Prophet ﷺ sagte, wer im Gericht streng ausgefragt werde, gehe zugrunde; auf ihre Frage nach der „leichten Abrechnung“ in diesem Vers erklärte er, damit sei lediglich die gnädige Vorlage der Taten (Al-‘Ard) ohne peinliche Prüfung gemeint.",
      it: "‘Ā’ishah narrò che quando il Profeta ﷺ disse che chi subisce un esame rigoroso dei conti andrà in rovina, lei citò questo versetto («avrà un rendiconto facile»); egli chiarì che si tratta della semplice presentazione delle opere per misericordia divina.",
      id: "‘Aisyah meriwayatkan bahwa saat Nabi ﷺ bersabda siapa yang dihisab secara rinci akan binasa, ia menanyakan ayat ‘hisab yang mudah’ ini; Nabi ﷺ menjelaskan bahwa hisab mudah adalah sekadar penampakan amal semata tanpa diperdebatkan.",
      ru: "‘Аиша передала, что на слова Пророка ﷺ «кто будет подвергнут строгому расчёту, тот погибнет» она спросила об этом аяте («получит лёгкий расчёт»), и он пояснил, что лёгкий расчёт — это лишь милостивое предъявление деяний без придирчивого допроса."
    }
  },
  "84:19": {
    type: "hadith",
    versets: ["84:19"],
    plage: "84:19",
    source: "Sahīh Al-Bukhārī n°4940",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) clarifia dans le Kitāb at-Tafsīr d'Al-Bukhārī le sens de l'expression « vous passerez certes d'un état à un autre (tabaqan ‘an tabaq) » : cela désigne la succession des étapes et des états que traverse l'être humain (de la vie à la mort, puis à la résurrection et aux étapes de l'Au-delà, ou les épreuves successives), en précisant qu'il s'agit de l'explication même transmise par le Prophète ﷺ.",
      en: "Ibn ‘Abbās clarified in Sahīh Al-Bukhārī that 'you will surely experience state after state (tabaqan ‘an tabaq)' means passing from one condition to another across the stages of existence and the Hereafter, explicitly noting that this was the statement of the Prophet ﷺ.",
      es: "Ibn ‘Abbās aclaró en Sahīh Al-Bukhārī que «pasaréis de un estado a otro» significa atravesar sucesivas condiciones y etapas de la existencia hasta la Otra Vida, precisando que esa es la explicación transmitida del Profeta ﷺ.",
      ar: "عن ابن عباس رضي الله عنهما في كتاب التفسير من صحيح البخاري أنه قال في قوله تعالى: ﴿لَتَرْكَبُنَّ طَبَقًا عَن طَبَقٍ﴾: «حالًا بعد حال، قال: هذا نبيكم ﷺ»؛ أي تنقّل الإنسان في أطوار الحياة والموت والبعث.",
      de: "Ibn ‘Abbās erklärte in Sahīh Al-Bukhārī, dass „ihr werdet gewiss einen Zustand nach dem anderen durchlaufen“ den Übergang durch die verschiedenen Stufen des Daseins bis ins Jenseits bezeichnet, und verwies dabei ausdrücklich auf den Propheten ﷺ.",
      it: "Ibn ‘Abbās chiarì in Sahīh Al-Bukhārī che «passerete certamente da uno stato all'altro» indica il susseguirsi delle condizioni e tappe dell'esistenza fino all'Aldilà, precisando che è la spiegazione trasmessa dal Profeta ﷺ.",
      id: "Ibnu ‘Abbas menjelaskan dalam Shahih Al-Bukhari bahwa makna ‘sungguh kamu akan melalui tingkat demi tingkat’ adalah perpindahan dari satu keadaan ke keadaan lain sepanjang tahapan kehidupan hingga akhirat, sebagaimana penjelasan Nabi ﷺ.",
      ru: "Ибн ‘Аббас пояснил в «Сахихе» аль-Бухари, что слова «вы непременно будете переходить из одного состояния в другое» означают смену этапов и состояний человека от земной жизни до Вечности, подчеркнув, что это слова самого Пророка ﷺ."
    }
  },
  "85:4": {
    type: "hadith",
    versets: ["85:4", "85:5", "85:6", "85:7", "85:8"],
    plage: "85:4–8",
    source: "Sahīh Muslim n°3005",
    degre: "Sahīh",
    texte: {
      fr: "Suhayb Ar-Rūmī (qu'Allāh l'agrée) rapporte le célèbre récit prophétique expliquant qui étaient « les Gens de la Tranchée » (Ashāb al-Ukhdūd) évoqués dans ces versets : un roi tyran persécuta un jeune croyant guidé par un moine monothéiste. Grâce à la constance du jeune homme qui proclama publiquement sa foi au Seigneur de l'univers devant tout le peuple, des foules entières crurent en Allāh. Furieux, le roi fit creuser d'immenses fosses remplies de feu ardent et y fit jeter ceux qui refusaient d'abjurer leur foi — et une mère hésitante portant son nourrisson fut miraculeusement raffermie lorsque son bébé lui parla en disant : « Patiente, ô ma mère, car tu es certes sur la Vérité ! »",
      en: "Suhayb Ar-Rūmī narrated the famous prophetic account explaining the 'People of the Ditch' (Ashāb al-Ukhdūd) mentioned here: a tyrannical king persecuted a devout youth whose steadfast faith led an entire crowd to believe in Allāh alone. Enraged, the king dug vast blazing trenches for all who refused to renounce their faith—and when a mother holding her infant hesitated at the edge, her baby miraculously spoke: 'Be patient, O mother, for you are upon the truth!'",
      es: "Suhayb Ar-Rūmī relató la célebre historia profética sobre la «Gente de la Fosa» (Ashāb al-Ukhdūd): un rey tirano persiguió a un joven creyente cuya fe inquebrantable llevó al pueblo a creer en Allah; furioso, el rey cavó fosas ardientes para quienes no abjuraran, y un bebé habló milagrosamente a su madre para alentarla: «Ten paciencia, madre, pues estás en la verdad».",
      ar: "عن صهيب الرومي رضي الله عنه في الحديث الطويل لقصة أصحاب الأخدود؛ حيث آمن الناس برب الغلام المؤمن بعد ثباته أمام الملك الظالم، فخدّ الملك أخاديد عظيمة وأضرم فيها النار ليلقي فيها من ثبت على التوحيد، حتى أنطق الله رضيعًا يثبّت أمه بقوله: «يا أمه اصبري فإنك على الحق».",
      de: "Suhayb Ar-Rūmī überlieferte die berühmte Geschichte der „Leute des Grabens“ (Ashāb al-Ukhdūd): Nach der Standhaftigkeit eines gläubigen Jünglings gegen einen tyrannischen König glaubte das Volk an Allah; der König ließ flammende Gräben ausheben, und ein Säugling sprach wunderbar zu seiner zögernden Mutter: „Sei geduldig, Mutter, denn du bist auf der Wahrheit!“",
      it: "Suhayb Ar-Rūmī narrò la celebre storia profetica della «Gente del Fossato» (Ashāb al-Ukhdūd): la saldezza di un giovane credente davanti a un re tiranno portò il popolo alla fede; il re scavò fosse infuocate per chi non abiurava, e un neonato parlò prodigiosamente alla madre dicendole: «Abbi pazienza, madre, perché sei nella verità!».",
      id: "Shuhaib Ar-Rumi meriwayatkan kisah masyhur Ashabul Ukhdud dari Nabi ﷺ: keteguhan iman seorang pemuda di hadapan raja zalim membuat rakyat beriman kepada Allah; raja lalu menggali parit berapi bagi yang mempertahankan iman, hingga seorang bayi berbicara secara mukjizat menguatkan ibunya: “Bersabarlah wahai ibuku, sungguh engkau berada di atas kebenaran.”",
      ru: "Сухайб ар-Руми передал знаменитый хадис о «людях рва» (Асхаб аль-Ухдуд): стойкость верующего юноши перед тираном привела народ к вере в Аллаха; разъярённый царь вырыл пылающие рвы для всех, кто не отречётся от единобожия, и младенец чудом заговорил, укрепив мать словами: «Терпи, мама, ибо ты на истине!»"
    }
  },
  "87:1": {
    type: "hadith",
    versets: ["87:1"],
    plage: "87:1",
    source: "Sahīh Al-Bukhārī n°4941 & Sahīh Muslim n°878",
    degre: "Sahīh",
    texte: {
      fr: "Al-Barā' ibn ‘Āzib (qu'Allāh l'agrée) rapporte que les tout premiers émigrés arrivés à Médine (Mus‘ab ibn ‘Umayr et Ibn Umm Maktūm) enseignaient le Coran aux habitants, si bien que lorsque le Prophète ﷺ arriva enfin à Médine, Al-Barā' avait déjà mémorisé cette sourate (« Glorifie le Nom de ton Seigneur le Très-Haut »). An-Nu‘mān ibn Bashīr précise dans Sahīh Muslim que le Prophète ﷺ la récitait régulièrement lors des prières du vendredi et des deux fêtes (Al-‘Īd).",
      en: "Al-Barā' ibn ‘Āzib narrated that the earliest emigrants to Madinah taught the Qur'an to the Ansār so thoroughly that by the time the Prophet ﷺ arrived, Al-Barā' had already memorized Sūrah Al-A‘lā. An-Nu‘mān ibn Bashīr added in Sahīh Muslim that the Prophet ﷺ regularly recited it during Friday and both Eid prayers.",
      es: "Al-Barā' ibn ‘Āzib relató que los primeros emigrantes llegados a Medina enseñaron el Corán con tal celo que antes de llegar el Profeta ﷺ ya había memorizado la Sura Al-A‘lā; An-Nu‘mān ibn Bashīr precisó que el Profeta ﷺ solía recitarla en las oraciones del viernes y de las dos festividades (‘Īd).",
      ar: "عن البراء بن عازب رضي الله عنه أن أوائل المهاجرين إلى المدينة علّموا الأنصار القرآن حتى حفظ البراء سورة الأعلى قبل قدوم النبي ﷺ؛ وروى النعمان بن بشير في صحيح مسلم أن النبي ﷺ كان يقرأ بها في صلاة الجمعة والعيدين.",
      de: "Al-Barā' ibn ‘Āzib berichtete, dass die ersten Auswanderer in Medina den Koran so eifrig lehrten, dass er Sure Al-A‘lā bereits vor der Ankunft des Propheten ﷺ auswendig konnte; laut An-Nu‘mān rezitierte der Prophet ﷺ sie regelmäßig beim Freitags- und den beiden Festgebeten.",
      it: "Al-Barā' ibn ‘Āzib narrò che i primi emigrati a Medina insegnarono il Corano con tale dedizione che aveva già memorizzato Sura Al-A‘lā prima dell'arrivo del Profeta ﷺ; An-Nu‘mān aggiunse che il Profeta ﷺ la recitava regolarmente nelle preghiere del venerdì e delle due feste (‘Īd).",
      id: "Al-Bara' bin ‘Azib meriwayatkan bahwa para sahabat Muhajirin awal di Madinah telah mengajarkan Al-Qur'an hingga ia hafal Surah Al-A‘la sebelum Nabi ﷺ tiba; An-Nu‘man bin Basyir menambahkan bahwa Nabi ﷺ rutin membacanya pada shalat Jumat dan dua shalat ‘Id.",
      ru: "Аль-Бара ибн ‘Азиб передал, что первые переселенцы в Медину столь усердно обучали ансаров Корану, что он выучил суру «Аль-А‘ля» ещё до прибытия Пророка ﷺ; ан-Ну‘ман ибн Башир добавил, что Пророк ﷺ регулярно читал её в пятничной и праздничных молитвах."
    }
  },
  "89:2": {
    type: "hadith",
    versets: ["89:1", "89:2"],
    plage: "89:1–2",
    source: "Sahīh Al-Bukhārī n°969",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) — qui explique avec la majorité des exégètes que « les dix nuits » par lesquelles Allāh jure ici désignent les dix premiers jours bénis du mois de Dhū al-Hijjah — rapporte cette parole du Messager d'Allāh ﷺ : « Il n'est pas de jours durant lesquels les bonnes œuvres soient plus aimées d'Allāh que durant ces dix jours ! » Les Compagnons demandèrent : « Pas même le combat dans le sentier d'Allāh ? » Il répondit : « Pas même cela, sauf pour un homme qui sort de sa personne et de ses biens sans rien en ramener. »",
      en: "Ibn ‘Abbās—who, along with the majority of scholars, explained 'the ten nights' sworn by here as the first ten blessed days of Dhū al-Hijjah—narrated from the Messenger of Allāh ﷺ: 'There are no days in which righteous deeds are more beloved to Allāh than these ten days!'",
      es: "Ibn ‘Abbās —quien junto a la mayoría de exegetas explica que «las diez noches» juradas aquí son los diez primeros días de Dhū al-Hijjah— relató del Profeta ﷺ: «No hay días en los que las buenas obras sean más amadas por Allah que estos diez días».",
      ar: "عن ابن عباس رضي الله عنهما — وهو القائل مع جمهور المفسرين إن «الليالي العشر» هي عشر ذي الحجة — أن النبي ﷺ قال: «ما من أيام العمل الصالح فيهن أحب إلى الله من هذه الأيام العشر».",
      de: "Ibn ‘Abbās – der wie die Mehrheit der Exegeten unter den hier beschworenen „zehn Nächten“ die ersten zehn gesegneten Tage des Monats Dhū al-Hijjah versteht – überlieferte vom Propheten ﷺ: „Es gibt keine Tage, an denen gute Taten Allah lieber sind als in diesen zehn Tagen!“",
      it: "Ibn ‘Abbās — che con la maggioranza degli esegeti identifica «le dieci notti» con i primi dieci giorni benedetti di Dhū al-Hijjah — narrò dal Profeta ﷺ: «Non vi sono giorni in cui le opere pie siano più amate da Allāh di questi dieci giorni!».",
      id: "Ibnu ‘Abbas — yang bersama mayoritas mufasir menafsirkan ‘malam yang sepuluh’ sebagai sepuluh hari pertama bulan Dzulhijjah — meriwayatkan sabda Nabi ﷺ: “Tidak ada hari-hari yang amal saleh di dalamnya lebih dicintai Allah melebihi sepuluh hari ini.”",
      ru: "Ибн ‘Аббас, который вместе с большинством толкователей относил «десять ночей» к первым десяти благословенным дням месяца зу-ль-хиджа, передал слова Пророка ﷺ: «Нет дней, в которые праведные дела были бы более любимы Аллаху, чем эти десять дней!»"
    }
  },
  "89:23": {
    type: "hadith",
    versets: ["89:23"],
    plage: "89:23",
    source: "Sahīh Muslim n°2842",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ illustra l'immensité redoutable de la scène évoquée dans ce verset (« Et ce jour-là, on amènera la Géhenne ») : « On amènera ce jour-là la Géhenne munie de soixante-dix mille brides, et à chaque bride soixante-dix mille Anges la tireront ! » — moment bouleversant où l'homme insouciant se souviendra enfin, mais trop tard.",
      en: "‘Abdullāh ibn Mas‘ūd narrated that the Messenger of Allāh ﷺ described the awe-inspiring scene in this verse ('And brought forth that Day is Hell'): 'Hell will be brought on that Day with seventy thousand reins, and with each rein will be seventy thousand angels pulling it!'",
      es: "‘Abdullāh ibn ‘Mas‘ūd relató que el Profeta ﷺ describió la escena de esta aleya («y aquel día será traído el Infierno»): «Será traído con setenta mil riendas, y de cada rienda tirarán setenta mil ángeles».",
      ar: "عن عبد الله بن مسعود رضي الله عنه أن رسول الله ﷺ قال في بيان قوله تعالى ﴿وَجِيءَ يَوْمَئِذٍ بِجَهَنَّمَ﴾: «يُؤتى بجهنم يومئذٍ لها سبعون ألف زمام، مع كل زمام سبعون ألف ملك يجرونها».",
      de: "‘Abdullāh ibn Mas‘ūd berichtete, dass der Gesandte Allahs ﷺ diese Szene beschrieb: „Die Hölle wird an jenem Tag mit siebzigtausend Zügeln herbeigebracht, und an jedem Zügel ziehen siebzigtausend Engel!“",
      it: "‘Abdullāh ibn Mas‘ūd narrò che il Messaggero di Allāh ﷺ descrisse la scena di questo versetto: «Quel giorno la Geenna sarà condotta con settantamila briglie, e a ciascuna briglia la tireranno settantamila angeli!».",
      id: "‘Abdullah bin Mas‘ud meriwayatkan sabda Nabi ﷺ tentang ayat ini: “Pada hari itu Neraka Jahannam didatangkan dengan tujuh puluh ribu tali kekang, dan pada setiap tali kekang terdapat tujuh puluh ribu malaikat yang menariknya.”",
      ru: "‘Абдуллах ибн Мас‘уд передал слова Пророка ﷺ об этом аяте: «В тот день приведут Геенну, у которой будет семьдесят тысяч поводьев, и за каждый повод её будут тянуть семьдесят тысяч ангелов!»"
    }
  },
  "91:12": {
    type: "hadith",
    versets: ["91:12"],
    plage: "91:12",
    source: "Sahīh Al-Bukhārī n°4942 & Sahīh Muslim n°2855",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Zam‘ah (qu'Allāh l'agrée) rapporte que dans un sermon, le Messager d'Allāh ﷺ évoqua la chamelle miraculeuse de Sālih et le coupable qui la tua dans ce verset (« Lorsque le plus misérable d'entre eux se leva »), précisant qu'il ne s'agissait pas d'un homme marginal mais d'un individu puissant, influent et redouté au sein de son clan — montrant que la puissance sociale ne protège jamais contre la justice d'Allāh.",
      en: "‘Abdullāh ibn Zam‘ah narrated that in a sermon the Messenger of Allāh ﷺ mentioned the miraculous she-camel of Sālih and the man who hamstrung her in this verse ('When the most wretched of them was sent forth'), describing him as a powerful, fiercely protected chief among his clan—showing that worldly power never shields against Allāh's justice.",
      es: "‘Abdullāh ibn Zam‘ah relató que el Profeta ﷺ describió al culpable citado en esta aleya —quien mató a la camella de Sālih— no como un marginado sino como un hombre poderoso y temido en su tribu, mostrando que el poder mundano no protege de la justicia de Allah.",
      ar: "عن عبد الله بن زمعة رضي الله عنه أن النبي ﷺ ذكر الناقة والذي عقرها في هذه الآية فقال: «انبعث لها رجل عزيز عارم منيع في رهطه»، مبينًا أن القوة والمنعة الدنيوية لا تحمي من عذاب الله.",
      de: "‘Abdullāh ibn Zam‘ah berichtete, dass der Prophet ﷺ den in diesem Vers genannten Mörder der Kamelstute Sālihs als einen mächtigen, in seiner Sippe gefürchteten Mann beschrieb – ein Zeichen dafür, dass weltliche Macht niemanden vor Allahs Gerechtigkeit bewahrt.",
      it: "‘Abdullāh ibn Zam‘ah narrò che il Profeta ﷺ descrisse l'uccisore della cammella di Sālih evocato in questo versetto come un uomo potente e temuto nel suo clan, a dimostrazione che il potere terreno non protegge dalla giustizia di Allāh.",
      id: "‘Abdullah bin Zam‘ah meriwayatkan bahwa Nabi ﷺ menjelaskan pelaku pembunuhan unta Nabi Shalih dalam ayat ini adalah seorang tokoh kuat dan disegani di kaumnya, membuktikan kekuasaan dunia tidak mampu melindungi dari keadilan Allah.",
      ru: "‘Абдуллах ибн Зам‘а передал, что Пророк ﷺ описал упомянутого здесь убийцу верблюдицы Салиха как влиятельного и могущественного в своём роду человека, показав, что мирская сила никого не спасёт от правосудия Аллаха."
    }
  },
  "92:5": {
    type: "hadith",
    versets: ["92:5", "92:6", "92:7", "92:8", "92:9", "92:10"],
    plage: "92:5–10",
    source: "Sahīh Al-Bukhārī n°4945, n°4947 & Sahīh Muslim n°2647",
    degre: "Sahīh",
    texte: {
      fr: "‘Alī ibn Abī Tālib (qu'Allāh l'agrée) rapporte qu'alors qu'ils assistaient à des funérailles au cimetière d'Al-Baqī‘, le Prophète ﷺ rappela que la destination finale de chaque âme est déjà connue d'Allāh. Un Compagnon demanda alors : « Ô Messager d'Allāh, ne devons-nous donc pas nous reposer sur ce qui est écrit et cesser d'œuvrer ? » Le Prophète ﷺ répondit : « Œuvrez plutôt ! Car chacun se verra faciliter la voie pour laquelle il a été créé », puis il récita ces versets montrant le lien entre le don, la piété et la facilité vers le bien.",
      en: "‘Alī ibn Abī Tālib narrated that at a funeral in Al-Baqī‘, when the Prophet ﷺ spoke of Divine Knowledge of every soul's final abode, a Companion asked: 'Should we then rely on what is written and stop acting?' The Prophet ﷺ replied: 'No—act! For everyone will have made easy for him that for which he was created,' and recited these verses linking generosity and piety to ease toward goodness.",
      es: "‘Alī ibn Abī Tālib relató que ante la pregunta de si debían dejar de obrar al estar todo en el conocimiento divino, el Profeta ﷺ respondió: «¡Obrad!, pues a cada cual se le facilitará aquello para lo que fue creado», y recitó estas aleyas sobre la generosidad y la piedad.",
      ar: "عن علي بن أبي طالب رضي الله عنه أنه لما سُئل النبي ﷺ في جنازة بالبقيع: أفلا نتكل على كتابنا وندع العمل؟ قال ﷺ: «اعملوا فكلٌّ ميسّر لما خُلق له»، ثم قرأ هذه الآيات (٥–١٠) بيانًا لأثر العطاء والتقوى في التيسير لليسرى.",
      de: "‘Alī ibn Abī Tālib berichtete, dass ein Gefährte fragte, ob man angesichts der göttlichen Bestimmung aufhören solle zu handeln; der Prophet ﷺ entgegnete: „Handelt! Denn jedem wird das leicht gemacht, wofür er erschaffen wurde“, und rezitierte diese Verse (5–10).",
      it: "‘Alī ibn Abī Tālib narrò che quando un Compagno chiese se si dovesse smettere di operare affidandosi al Decreto, il Profeta ﷺ rispose: «Operate! Perché a ciascuno viene facilitato ciò per cui è stato creato», recitando poi questi versetti (5–10).",
      id: "‘Ali bin Abi Thalib meriwayatkan bahwa saat seorang sahabat bertanya apakah mereka cukup pasrah pada takdir tanpa beramal, Nabi ﷺ bersabda: “Beramallah, karena setiap orang dimudahkan menuju apa yang ia diciptakan untuknya”, lalu membacakan ayat 5–10 ini.",
      ru: "‘Али ибн Абу Талиб передал, что на вопрос сподвижника, не оставить ли дела, положившись на предопределение, Пророк ﷺ ответил: «Трудитесь, ибо каждому облегчено то, ради чего он сотворён», — и прочёл эти аяты (5–10)."
    }
  },
  "92:14": {
    type: "hadith",
    versets: ["92:14"],
    plage: "92:14",
    source: "Sahīh Al-Bukhārī n°6562 & Sahīh Muslim n°213",
    degre: "Sahīh",
    texte: {
      fr: "An-Nu‘mān ibn Bashīr (qu'Allāh les agrée) rapporte qu'il entendit le Messager d'Allāh ﷺ prononcer un sermon vibrant en reprenant l'avertissement de ce verset (« Je vous ai donc avertis d'un Feu qui flambe »), élevant la voix par souci de mettre en garde sa communauté avant de décrire le degré le plus léger du châtiment de l'Enfer pour inciter chacun à la vigilance et aux œuvres vertueuses.",
      en: "An-Nu‘mān ibn Bashīr narrated that he heard the Messenger of Allāh ﷺ deliver a heartfelt sermon echoing the warning of this verse ('So I have warned you of a Fire which is blazing'), raising his voice out of deep compassion to urge believers toward vigilance and righteous deeds.",
      es: "An-Nu‘mān ibn Bashīr relató que escuchó al Profeta ﷺ pronunciar un emotivo sermón repitiendo la advertencia de esta aleya («Os he advertido de un Fuego ardiente») para despertar la vigilancia y las buenas obras en su comunidad.",
      ar: "عن النعمان بن بشير رضي الله عنهما أنه سمع رسول الله ﷺ يخطب محذّرًا أمته من النار كما في هذه الآية رافعًا صوته شفقةً عليهم، ثم ذكر أهون أهل النار عذابًا يوم القيامة تذكيرًا بالوقاية بالعمل الصالح.",
      de: "An-Nu‘mān ibn Bashīr berichtete, dass er den Gesandten Allahs ﷺ in einer eindringlichen Predigt vor dem lodernden Feuer dieses Verses warnen hörte, um die Gläubigen aus Fürsorge zu Wachsamkeit und guten Taten anzuspornen.",
      it: "An-Nu‘mān ibn Bashīr narrò di aver udito il Profeta ﷺ tenere un sermone vibrante riprendendo l'ammonimento di questo versetto sul Fuoco ardente, per esortare i credenti alla vigilanza e alle buone opere.",
      id: "An-Nu‘man bin Basyir meriwayatkan bahwa ia mendengar Rasulullah ﷺ berkhutbah dengan penuh kasih sayang memperingatkan umatnya akan api neraka yang menyala-nyala seperti ayat ini agar senantiasa menjaga diri dengan amal saleh.",
      ru: "Ан-Ну‘ман ибн Башир передал, что слышал, как Пророк ﷺ в взволнованной проповеди предостерегал общину от пылающего Огня, упомянутого в этом аяте, призывая людей к бдительности и праведным поступкам."
    }
  },
  "94:1": {
    type: "hadith",
    versets: ["94:1"],
    plage: "94:1",
    source: "Sahīh Al-Bukhārī n°3207, n°3887 & Sahīh Muslim n°162, n°164",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik et Mālik ibn Sa‘sa‘ah (qu'Allāh les agrée) rapportent le miracle de l'ouverture de la poitrine du Prophète ﷺ (Sharh as-Sadr) — dont ce verset célèbre à la fois la dimension spirituelle (lumière de la guidance et sérénité) et physique : l'Ange Jibrīl ouvrit sa poitrine (une première fois dans son enfance, puis avant le Voyage Nocturne Al-Isrā'), lava son cœur avec l'eau de Zamzam et le remplit de foi et de sagesse.",
      en: "Anas ibn Mālik and Mālik ibn Sa‘sa‘ah narrated the miracle of the expansion and purification of the Prophet's ﷺ chest (Sharh as-Sadr)—celebrated both spiritually and physically in this verse: Angel Jibrīl opened his chest (in childhood and again before the Night Journey Al-Isrā'), washed his heart with Zamzam water, and filled it with faith and wisdom.",
      es: "Anas ibn Mālik y Mālik ibn Sa‘sa‘ah relataron el milagro de la apertura y purificación del pecho del Profeta ﷺ (Sharh as-Sadr) —en su infancia y antes del Viaje Nocturno—, cuando Yibrīl lavó su corazón con agua de Zamzam y lo colmó de fe y sabiduría.",
      ar: "عن أنس بن مالك ومالك بن صعصعة رضي الله عنهما في معجزة شرح صدر النبي ﷺ — التي تجمع المعنى المعنوي بالهداية والسكينة والمعنى الحسي — حيث شقّ جبريل صدره ﷺ (في صغره وقبيل الإسراء) وغسل قلبه بماء زمزم وملأه إيمانًا وحكمة.",
      de: "Anas ibn Mālik und Mālik ibn Sa‘sa‘ah überlieferten das Wunder der Öffnung und Läuterung der Brust des Propheten ﷺ (sowohl in seiner Kindheit als auch vor der Nachtreise Al-Isrā'), als Dschibrīl sein Herz mit Zamzam-Wasser wusch und mit Glauben und Weisheit erfüllte.",
      it: "Anas ibn Mālik e Mālik ibn Sa‘sa‘ah narrarono il miracolo dell'apertura del petto del Profeta ﷺ (nell'infanzia e prima del Viaggio Notturno), quando Jibrīl lavò il suo cuore con acqua di Zamzam colmandolo di fede e saggezza.",
      id: "Anas bin Malik dan Malik bin Sha‘sha‘ah meriwayatkan mukjizat pembelahan dan pelapangan dada Nabi ﷺ (saat kecil dan menjelang Isra' Mi‘raj) ketika Jibril mencuci hati beliau dengan air Zamzam lalu memenuhinya dengan iman dan hikmah.",
      ru: "Анас ибн Малик и Малик ибн Са‘са‘а передали чудо раскрытия и очищения груди Пророка ﷺ (в детстве и перед Ночным перенесением аль-Исра), когда Джибриль омыл его сердце водой Замзам и наполнил его верой и мудростью."
    }
  },
  "95:1": {
    type: "hadith",
    versets: ["95:1", "95:2", "95:3", "95:4", "95:5", "95:6", "95:7", "95:8"],
    plage: "95:1–8",
    source: "Sahīh Al-Bukhārī n°767, n°4952 & Sahīh Muslim n°464",
    degre: "Sahīh",
    texte: {
      fr: "Al-Barā' ibn ‘Āzib (qu'Allāh l'agrée) rapporte que lors d'un voyage, il pria derrière le Messager d'Allāh ﷺ la prière du soir (Al-‘Ishā') : le Prophète ﷺ récita la Sourate At-Tīn (« Par le figuier et l'olivier ») dans l'une des deux unités de prière, et Al-Barā' témoigna avec émotion : « Je n'ai jamais entendu personne avoir une voix plus belle ni une récitation plus émouvante que la sienne ! »",
      en: "Al-Barā' ibn ‘Āzib narrated that during a journey he prayed ‘Ishā' behind the Messenger of Allāh ﷺ, who recited Sūrah At-Tīn ('By the fig and the olive') in one of the two units, and Al-Barā' testified: 'I have never heard anyone with a more beautiful voice or recitation than his!'",
      es: "Al-Barā' ibn ‘Āzib relató que en un viaje rezó la oración de la noche (‘Ishā') detrás del Profeta ﷺ, quien recitó la Sura At-Tīn en una de las unidades, y exclamó: «¡Jamás he escuchado a nadie con una voz ni una recitación más hermosas que las suyas!».",
      ar: "عن البراء بن عازب رضي الله عنه أنه سمع النبي ﷺ يقرأ في صلاة العشاء في سفر بسورة ﴿وَالتِّينِ وَالزَّيْتُونِ﴾، فقال البراء: «فما سمعتُ أحدًا أحسن صوتًا أو قراءةً منه ﷺ».",
      de: "Al-Barā' ibn ‘Āzib berichtete, dass er auf einer Reise den Propheten ﷺ im Nachtgebet (‘Ishā') Sure At-Tīn rezitieren hörte, und bezeugte: „Ich habe niemals jemanden mit einer schöneren Stimme oder Rezitation gehört als ihn!“",
      it: "Al-Barā' ibn ‘Āzib narrò che in viaggio udì il Profeta ﷺ recitare Sura At-Tīn nella preghiera della sera (‘Ishā') e testimoniò: «Non ho mai udito nessuno avere una voce o una recitazione più belle della sua!».",
      id: "Al-Bara' bin ‘Azib meriwayatkan bahwa dalam sebuah perjalanan ia mendengar Nabi ﷺ membaca Surah At-Tin pada shalat Isya, lalu ia bersaksi: “Belum pernah aku mendengar seorang pun yang lebih indah suara dan bacaannya daripada beliau!”",
      ru: "Аль-Бара ибн ‘Азиб передал, что в пути слышал, как Пророк ﷺ читал суру «Ат-Тин» в вечерней молитве (‘иша), и засвидетельствовал: «Я никогда не слышал никого с более прекрасным голосом и чтением, чем у него!»"
    }
  }
};

// Auto-contrôle strict avant écriture (8 langues + champs obligatoires)
const LANGUES_REQ = ['fr', 'en', 'es', 'ar', 'de', 'it', 'id', 'ru'];
for (const [cle, rec] of Object.entries(LOT_11_NABA_TIN)) {
  if (!rec.type || !rec.source || !rec.degre || !Array.isArray(rec.versets) || !rec.texte) {
    throw new Error(`Structure invalide pour ${cle}`);
  }
  for (const lg of LANGUES_REQ) {
    if (!rec.texte[lg] || typeof rec.texte[lg] !== 'string' || rec.texte[lg].trim().length < 20) {
      throw new Error(`Texte manquant ou trop court pour ${cle} [${lg}]`);
    }
  }
}

Object.assign(data.recits, LOT_11_NABA_TIN);
data.version = (data.version || 1) + 1;

const jsonFinal = JSON.stringify(data, null, 2);
JSON.parse(jsonFinal);
writeSafe(asbabPath, jsonFinal);

let worker = fs.readFileSync(workerPath, 'utf8');
worker = worker.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
writeSafe(workerPath, worker);

const nbRecits = Object.keys(data.recits).length;
const nbVersets = Object.values(data.recits).reduce((acc, r) => acc + (Array.isArray(r.versets) ? r.versets.length : 1), 0);
console.log(`✅ Lot 11 (Sourates 78 à 95) validé et intégré ! Total actuel : ${nbRecits} récits couvrant ${nbVersets} versets en 8 langues.`);
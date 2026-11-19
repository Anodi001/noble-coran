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

const LOT_12_FINAL = {
  "1:1": {
    type: "hadith",
    versets: ["1:1", "1:2", "1:3", "1:4", "1:5", "1:6", "1:7"],
    plage: "1:1–7",
    source: "Sahīh Al-Bukhārī n°4474 & Sahīh Muslim n°395",
    degre: "Sahīh",
    texte: {
      fr: "Abū Sa‘īd ibn Al-Mu‘allā rapporte que le Prophète ﷺ présenta Sourate Al-Fātihah comme la plus grande sourate du Coran et les sept versets sans cesse répétés. Dans un Hadith Qudsī transmis par Abū Hurayrah, le Prophète ﷺ explique également qu'Allāh partage cette prière en deux moitiés entre Lui et Son serviteur : à chaque verset récité avec présence du cœur, Allāh répond directement au croyant et lui accorde ce qu'il implore.",
      en: "Abū Sa‘īd ibn Al-Mu‘allā reported that the Prophet ﷺ identified Sūrah Al-Fātihah as the greatest chapter of the Qur'an and the seven oft-repeated verses. In a Hadith Qudsī narrated by Abū Hurayrah, the Prophet ﷺ further explained that Allāh divides this prayer equally between Himself and His servant, responding directly to each verse recited in prayer and granting the believer's supplication.",
      es: "Abū Sa‘īd ibn Al-Mu‘allā relató que el Profeta ﷺ señaló la Sura Al-Fātihah como la mayor sura del Corán y los siete versículos reiterados. Asimismo, Abū Hurayrah transmitió que Allah divide esta súplica entre Él y Su siervo, respondiendo directamente a cada aleya recitada en la oración.",
      ar: "روى أبو سعيد بن المعلى رضي الله عنه أن النبي ﷺ بيّن أن سورة الفاتحة هي أعظم سورة في القرآن والسبع المثاني، كما ورد في حديث أبي هريرة رضي الله عنه أنها مقسومة بين الله وعبده نصفين، حيث يجيب الله عبده عند كل آية يقرؤها في صلاته ويعطيه سؤله.",
      de: "Abū Sa‘īd ibn Al-Mu‘allā berichtete, dass der Prophet ﷺ Sure Al-Fātihah als die gewaltigste Sure des Korans bezeichnete. Zudem überlieferte Abū Hurayrah, dass Allah dieses Gebet zwischen Sich und Seinem Diener teilt und auf jeden im Gebet vorgetragenen Vers unmittelbar antwortet.",
      it: "Abū Sa‘īd ibn Al-Mu‘allā riferì che il Profeta ﷺ indicò Sura Al-Fātihah come la più grande sura del Corano. Inoltre Abū Hurayrah trasmise che Allāh divide questa preghiera a metà tra Sé e il Suo servo, rispondendo direttamente a ogni versetto recitato con devozione.",
      id: "Abu Sa‘id bin Al-Mu‘alla meriwayatkan bahwa Nabi ﷺ menjelaskan Surah Al-Fatihah sebagai surah teragung dalam Al-Qur'an. Dalam riwayat Abu Hurairah juga diterangkan bahwa Allah membagi bacaan ini antara diri-Nya dan hamba-Nya serta menjawab setiap ayat yang dibaca dalam shalat.",
      ru: "Абу Са‘ид ибн аль-Му‘алля передал, что Пророк ﷺ назвал суру Аль-Фатиха величайшей сурой Корана. Кроме того, Абу Хурайра сообщил, что Аллах делит эту молитву пополам между Собой и Своим рабом, отвечая верующему на каждый прочитанный аят и даруя ему просимое."
    }
  },
  "96:9": {
    type: "sabab",
    versets: ["96:9", "96:10", "96:11", "96:12", "96:13", "96:14", "96:15", "96:16", "96:17", "96:18", "96:19"],
    plage: "96:9–19",
    source: "Sahīh Al-Bukhārī n°4958 & Sahīh Muslim n°2797",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah et Ibn ‘Abbās rapportent que ces versets furent révélés à la suite des menaces d'Abū Jahl, qui avait juré de piétiner la nuque du Prophète ﷺ s'il le voyait prier près de la Ka‘bah. Lorsqu'il s'avança effectivement pour passer à l'acte, il recula brusquement en se protégeant des mains : il raconta ensuite avoir vu devant lui un fossé de feu terrifiant et des ailes. Le Prophète ﷺ précisa que s'il avait approché davantage, les Anges gardiens de l'Enfer (Az-Zabāniyah) l'auraient saisi sur-le-champ.",
      en: "Abū Hurayrah and Ibn ‘Abbās reported that these verses were revealed after Abū Jahl threatened to trample the Prophet's ﷺ neck if he saw him praying at the Ka‘bah. When Abū Jahl approached to carry out his threat, he abruptly retreated shielding himself with his hands, saying he saw a terrifying trench of fire and wings blocking him. The Prophet ﷺ remarked that had he come closer, the angels would have seized him on the spot.",
      es: "Abū Hurayrah e Ibn ‘Abbās relataron que estas aleyas descendieron cuando Abū Yahl amenazó con agredir al Profeta ﷺ mientras rezaba junto a la Ka‘bah. Al acercarse para hacerlo, retrocedió espantado afirmando ver una fosa de fuego y alas, y el Profeta ﷺ señaló que si hubiese avanzado más, los ángeles lo habrían apresado al instante.",
      ar: "روى أبو هريرة وابن عباس رضي الله عنهم أن هذه الآيات نزلت حين توعّد أبو جهل رسول الله ﷺ إن رآه يصلي عند الكعبة؛ فلما دنا منه نكص على عقبيه يتقي بيديه وذكر أنه رأى خندقًا من نار وأجنحة، فأخبر النبي ﷺ أنه لو دنا لاختطفته الملائكة.",
      de: "Abū Hurayrah und Ibn ‘Abbās berichteten, dass diese Verse offenbart wurden, als Abū Dschahl drohte, den Propheten ﷺ beim Gebet an der Ka‘bah anzugreifen. Als er sich näherte, wich er entsetzt zurück und berichtete von einem Feuergraben und Flügeln; der Prophet ﷺ erklärte, die Engel hätten ihn ergriffen, wäre er weitergegangen.",
      it: "Abū Hurayrah e Ibn ‘Abbās narrarono che questi versetti scesero quando Abū Jahl minacciò di aggredire il Profeta ﷺ mentre pregava alla Ka‘bah. Avvicinatosi per colpire, indietreggiò atterrito descrivendo un fossato di fuoco e ali; il Profeta ﷺ spiegò che gli angeli lo avrebbero afferrato se avesse osato avanzare.",
      id: "Abu Hurairah dan Ibnu ‘Abbas meriwayatkan bahwa ayat-ayat ini turun saat Abu Jahal mengancam akan mengganggu Nabi ﷺ ketika shalat di dekat Ka‘bah. Saat mendekat, ia mendadak mundur ketakutan karena melihat parit api dan sayap, dan Nabi ﷺ menjelaskan para malaikat akan menyambarnya jika ia melangkah lebih dekat.",
      ru: "Абу Хурайра и Ибн ‘Аббас передали, что эти аяты были ниспосланы после угрозы Абу Джахля напасть на Пророка ﷺ во время молитвы у Каабы. Подойдя ближе, он внезапно отпрянул в ужасе, сказав, что увидел огненный ров и крылья; Пророк ﷺ отметил, что если бы он приблизился ещё, ангелы схватили бы его."
    }
  },
  "97:1": {
    type: "hadith",
    versets: ["97:1", "97:2", "97:3", "97:4", "97:5"],
    plage: "97:1–5",
    source: "Sahīh Al-Bukhārī n°1901, n°2017 & Sahīh Muslim n°760, n°1169",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah et ‘Ā’ishah rapportent que le Prophète ﷺ encourageait vivement à rechercher la Nuit du Destin (Laylat al-Qadr) durant les nuits impaires des dix derniers jours de Ramadān. Il enseigna que quiconque veille cette nuit en prière avec une foi sincère et en espérant la récompense d'Allāh voit ses péchés passés pardonnés, et recommanda d'y multiplier la demande de pardon.",
      en: "Abū Hurayrah and ‘Ā’ishah narrated that the Prophet ﷺ strongly encouraged believers to seek the Night of Decree (Laylat al-Qadr) during the odd nights of the final ten days of Ramadan. He taught that whoever stands in prayer on that night out of sincere faith and hope for Allāh's reward has their past sins forgiven.",
      es: "Abū Hurayrah y ‘Ā’ishah relataron que el Profeta ﷺ animó a buscar la Noche del Decreto (Laylat al-Qadr) en las noches impares de los últimos diez días de Ramadán, enseñando que a quien la pase en oración con fe sincera y esperanza de recompensa se le perdonarán sus faltas pasadas.",
      ar: "روى أبو هريرة وعائشة رضي الله عنهما أن النبي ﷺ حثّ على تحري ليلة القدر في الوتر من العشر الأواخر من رمضان، وبشّر بأن من قامها إيمانًا واحتسابًا غُفر له ما تقدم من ذنبه.",
      de: "Abū Hurayrah und ‘Ā’ishah berichteten, dass der Prophet ﷺ dazu ermutigte, die Nacht der Bestimmung (Laylat al-Qadr) in den ungeraden Nächten der letzten zehn Tage des Ramadan zu suchen, und verhieß, dass demjenigen, der sie im Glauben betend verbringt, frühere Sünden vergeben werden.",
      it: "Abū Hurayrah e ‘Ā’ishah narrarono che il Profeta ﷺ esortò a cercare la Notte del Destino (Laylat al-Qadr) nelle notti dispari degli ultimi dieci giorni di Ramadan, assicurando il perdono dei peccati passati a chi la trascorre in preghiera con fede sincera.",
      id: "Abu Hurairah dan ‘Aisyah meriwayatkan bahwa Nabi ﷺ menganjurkan mencari malam Lailatul Qadar pada malam-malam ganjil sepuluh hari terakhir Ramadan, dan menyampaikan bahwa siapa yang menghidupkannya dengan iman dan harap pahala akan diampuni dosa-dosanya yang telah lalu.",
      ru: "Абу Хурайра и ‘Аиша передали, что Пророк ﷺ побуждал искать Ночь Предопределения (Ляйлят аль-Кадр) в нечётные ночи последних десяти дней Рамадана, сообщив, что тому, кто проведёт её в молитве с верой и надеждой на награду, будут прощены прежние грехи."
    }
  },
  "98:1": {
    type: "hadith",
    versets: ["98:1", "98:2", "98:3", "98:4", "98:5", "98:6", "98:7", "98:8"],
    plage: "98:1–8",
    source: "Sahīh Al-Bukhārī n°3809, n°4959 & Sahīh Muslim n°799",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik rapporte que le Prophète ﷺ informa Ubayy ibn Ka‘b qu'Allāh lui avait ordonné de lui réciter personnellement Sourate Al-Bayyinah. Très ému, Ubayy demanda si Allāh l'avait véritablement désigné par son nom ; lorsque le Prophète ﷺ lui confirma que oui, Ubayy fondit en larmes de gratitude devant cet immense honneur.",
      en: "Anas ibn Mālik narrated that the Prophet ﷺ informed Ubayy ibn Ka‘b that Allāh had instructed him to recite Sūrah Al-Bayyinah directly to him. Deeply moved, Ubayy asked whether Allāh had actually mentioned him by name; upon the Prophet's ﷺ confirmation, Ubayy wept out of gratitude for that extraordinary honor.",
      es: "Anas ibn Mālik relató que el Profeta ﷺ comunicó a Ubayy ibn Ka‘b que Allah le había ordenado recitarle personalmente la Sura Al-Bayyinah. Profundamente conmovido, Ubayy preguntó si Allah lo había mencionado por su nombre, y al confirmárselo el Profeta ﷺ, rompió a llorar de gratitud.",
      ar: "روى أنس بن مالك رضي الله عنه أن النبي ﷺ أخبر أُبيّ بن كعب أن الله أمره أن يقرأ عليه سورة البينة؛ فسأل أُبيّ متأثرًا هل سمّاه الله باسمه، فلما أكد له النبي ﷺ ذلك بكى فرحًا وتأثرًا بهذا التشريف العظيم.",
      de: "Anas ibn Mālik berichtete, dass der Prophet ﷺ Ubayy ibn Ka‘b mitteilte, Allah habe ihm aufgetragen, ihm Sure Al-Bayyinah persönlich vorzulesen. Tief bewegt fragte Ubayy, ob Allah ihn tatsächlich beim Namen genannt habe, und brach bei der Bestätigung vor Dankbarkeit in Tränen aus.",
      it: "Anas ibn Mālik narrò che il Profeta ﷺ riferì a Ubayy ibn Ka‘b che Allāh gli aveva ordinato di recitargli personalmente Sura Al-Bayyinah. Commosso, Ubayy chiese se Allāh lo avesse davvero nominato e, alla conferma del Profeta ﷺ, pianse di gratitudine.",
      id: "Anas bin Malik meriwayatkan bahwa Nabi ﷺ menyampaikan kepada Ubayy bin Ka‘b bahwa Allah memerintahkan beliau membacakan Surah Al-Bayyinah kepadanya. Dengan haru Ubayy menanyakan apakah Allah benar menyebut namanya, dan saat Nabi ﷺ membenarkannya ia pun menangis penuh syukur.",
      ru: "Анас ибн Малик передал, что Пророк ﷺ сообщил Убайю ибн Ка‘бу, что Аллах велел прочесть ему лично суру Аль-Баййина. Глубоко тронутый Убайй спросил, действительно ли Аллах назвал его по имени, и, получив подтверждение, расплакался от благодарности."
    }
  },
  "99:7": {
    type: "hadith",
    versets: ["99:7", "99:8"],
    plage: "99:7–8",
    source: "Sahīh Al-Bukhārī n°4962 & Sahīh Muslim n°987",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah rapporte que lorsque le Prophète ﷺ fut interrogé sur le statut des biens courants au regard de l'aumône et de la responsabilité morale, il désigna ces deux versets finaux de Sourate Az-Zalzalah comme un principe englobant et unique en son genre, rappelant que le moindre atome de bien comme le moindre atome de mal sera présenté à son auteur sans aucune omission.",
      en: "Abū Hurayrah narrated that when asked about moral accountability regarding everyday possessions, the Prophet ﷺ referred to these final two verses of Sūrah Az-Zalzalah as uniquely comprehensive, emphasizing that every single particle of good or evil will be accounted for without omission.",
      es: "Abū Hurayrah relató que al ser consultado sobre la responsabilidad moral respecto a los bienes cotidianos, el Profeta ﷺ describió estas dos últimas aleyas de Az-Zalzalah como una regla singular y abarcadora, pues hasta el más ínfimo peso de bien o de mal será mostrado a su autor.",
      ar: "روى أبو هريرة رضي الله عنه أن النبي ﷺ وصف هاتين الآيتين الأخيرتين من سورة الزلزلة بأنهما «الجامعة الفاذّة» التي تشمل كل عمل مهما صغر؛ إذ يرى الإنسان مثقال الذرة من الخير والشر دون أن يضيع شيء.",
      de: "Abū Hurayrah berichtete, dass der Prophet ﷺ diese beiden Schlussverse von Sure Az-Zalzalah als einzigartig umfassend bezeichnete, da selbst das winzigste Stäubchen an Gutem oder Schlechtem dem Menschen ohne Ausnahme vorgelegt wird.",
      it: "Abū Hurayrah narrò che il Profeta ﷺ definì questi due versetti finali di Sura Az-Zalzalah come un principio singolare e onnicomprensivo, poiché anche il minimo granello di bene o di male verrà mostrato a chi lo ha compiuto.",
      id: "Abu Hurairah meriwayatkan bahwa Nabi ﷺ menyebut dua ayat penutup Surah Az-Zalzalah ini sebagai ayat yang sangat menyeluruh dan istimewa, karena sekecil apa pun kebaikan maupun keburukan pasti akan diperlihatkan balasannya tanpa terlewat.",
      ru: "Абу Хурайра передал, что Пророк ﷺ назвал два заключительных аята суры Аз-Зальзаля всеобъемлющими и исключительными, подчеркнув, что ни малейшая пылинка добра или зла не останется без воздаяния."
    }
  },
  "102:1": {
    type: "hadith",
    versets: ["102:1", "102:2"],
    plage: "102:1–2",
    source: "Sahīh Muslim n°2958",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Ash-Shikhkhīr rapporte qu'il arriva auprès du Prophète ﷺ tandis que celui-ci récitait le début de Sourate At-Takāthur. Le Prophète ﷺ fit alors remarquer que l'être humain s'attache à ses richesses en les revendiquant comme siennes, alors que ses seuls véritables biens sont ce qu'il a consommé, ce dont il s'est vêtu, et surtout ce qu'il a donné en aumône et ainsi préservé durablement pour l'Au-delà.",
      en: "‘Abdullāh ibn Ash-Shikhkhīr narrated that he came upon the Prophet ﷺ reciting the opening of Sūrah At-Takāthur, upon which the Prophet ﷺ pointed out that while a person clings to worldly wealth claiming ownership, all that truly belongs to him is what he consumes, wears, and above all gives in charity to endure for the Hereafter.",
      es: "‘Abdullāh ibn Ash-Shikhkhīr relató que halló al Profeta ﷺ recitando el comienzo de At-Takāthur, ocasión en la que explicó que lo único que realmente pertenece al ser humano de su riqueza es lo que consume, lo que viste y, sobre todo, lo que da en caridad y preserva para la Otra Vida.",
      ar: "روى عبد الله بن الشخير رضي الله عنه أنه أتى النبي ﷺ وهو يقرأ مطلع سورة التكاثر، فبيّن ﷺ أن الإنسان يتباهى بماله وليس له منه حقيقةً إلا ما أكل فأفنى أو لبس فأبلى أو تصدّق فأبقى لآخرته.",
      de: "‘Abdullāh ibn Ash-Shikhkhīr berichtete, dass er den Propheten ﷺ beim Vortrag des Beginns von Sure At-Takāthur antraf; dieser wies darauf hin, dass dem Menschen von seinem Besitz in Wahrheit nur bleibt, was er verzehrt, trägt und vor allem als Almosen für das Jenseits vorausschickt.",
      it: "‘Abdullāh ibn Ash-Shikhkhīr narrò di aver trovato il Profeta ﷺ intento a recitare l'inizio di Sura At-Takāthur, spiegando che dei beni mondani appartiene davvero all'uomo solo ciò che consuma, ciò che indossa e soprattutto ciò che dona in carità per l'Aldilà.",
      id: "‘Abdullah bin Asy-Syikhkhir meriwayatkan bahwa ia menjumpai Nabi ﷺ sedang membaca awal Surah At-Takatsur, lalu beliau mengingatkan bahwa harta yang benar-benar menjadi milik seseorang hanyalah yang dimakan, dipakai, dan terlebih lagi yang disedekahkan untuk akhirat.",
      ru: "‘Абдуллах ибн аш-Шиххир передал, что застал Пророка ﷺ за чтением начала суры Ат-Такасур; Пророк ﷺ напомнил, что из всего богатства человеку по-настоящему принадлежит лишь то, что он съел, сносил и особенно то, что раздал в милостыню, сохранив для Вечности."
    }
  },
  "105:1": {
    type: "hadith",
    versets: ["105:1", "105:2", "105:3", "105:4", "105:5"],
    plage: "105:1–5",
    source: "Sahīh Al-Bukhārī n°2731, n°4297",
    degre: "Sahīh",
    texte: {
      fr: "Al-Miswar ibn Makhramah et Marwān rapportent que lors du départ vers La Mecque l'année d'Al-Hudaybiyah, la chamelle du Prophète ﷺ, Al-Qaswā', s'agenouilla soudainement et refusa d'avancer plus loin. Alors que les Compagnons pensaient qu'elle était simplement rétive, le Prophète ﷺ les reprit et expliqua qu'elle avait été arrêtée par Celui-là même qui avait jadis bloqué l'Éléphant aux portes de La Mecque — rappelant directement la protection miraculeuse de la Ka‘bah relatée dans cette sourate.",
      en: "Al-Miswar ibn Makhramah and Marwān narrated that during the journey toward Makkah at Al-Hudaybiyah, the Prophet's ﷺ camel Al-Qaswā' suddenly knelt and refused to move forward. When people assumed she was stubborn, the Prophet ﷺ clarified that she had been held back by the very One who once held back the Elephant from entering Makkah, directly recalling the miraculous protection of the Ka‘bah in this surah.",
      es: "Al-Miswar ibn Makhramah y Marwān relataron que rumbo a La Meca en Al-Hudaybiyah, la camella del Profeta ﷺ (Al-Qaswā') se arrodilló y rehusó avanzar; él explicó que la había detenido Aquel que antaño detuvo al Elefante ante La Meca, evocando la protección milagrosa de la Ka‘bah narrada en esta sura.",
      ar: "روى المسور بن مخرمة ومروان أن ناقة النبي ﷺ القصواء بركت في طريق الحديبية وأبت أن تتحرك، فلما ظن الصحابة أنها خلأت قال ﷺ: إنما حبسها حابس الفيل، في إشارة مباشرة إلى حماية الله للبيت الحرام المذكورة في هذه السورة.",
      de: "Al-Miswar ibn Makhramah und Marwān berichteten, dass die Kamelstute des Propheten ﷺ bei Al-Hudaybiyah plötzlich niederkniete und nicht weiterging; der Prophet ﷺ erklärte, derselbe Gott, der einst den Elefanten vor Mekka aufhielt, habe sie aufgehalten – in direktem Bezug auf diese Sure.",
      it: "Al-Miswar ibn Makhramah e Marwān narrarono che durante il cammino di Al-Hudaybiyah la cammella del Profeta ﷺ si inginocchiò rifiutando di proseguire; egli chiarì che l'aveva fermata Colui che un tempo trattenne l'Elefante davanti alla Mecca, richiamando il prodigio narrato in questa sura.",
      id: "Al-Miswar bin Makhramah dan Marwan meriwayatkan bahwa dalam perjalanan Hudaibiyah, unta Nabi ﷺ bernama Al-Qashwa' tiba-tiba menderum dan enggan melangkah; Nabi ﷺ menegaskan ia ditahan oleh Dzat yang dahulu menahan pasukan Gajah memasuki Makkah sebagaimana kisah surah ini.",
      ru: "Аль-Мисвар ибн Махрама и Марван передали, что на пути к аль-Худайбии верблюдица Пророка ﷺ аль-Касва внезапно опустилась на колени и отказалась идти дальше; Пророк ﷺ пояснил, что её удержал Тот же, Кто некогда удержал Слона от входа в Мекку, напомнив о чуде из этой суры."
    }
  },
  "108:1": {
    type: "sabab",
    versets: ["108:1", "108:2", "108:3"],
    plage: "108:1–3",
    source: "Sahīh Muslim n°400 & Sahīh Al-Bukhārī n°4964",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik rapporte qu'un jour, alors que le Prophète ﷺ était assis parmi ses Compagnons, il eut un bref assoupissement puis releva la tête en souriant et annonça qu'une sourate venait de lui être révélée, avant de réciter Sourate Al-Kawthar. Il expliqua ensuite que Al-Kawthar est un fleuve immense et abondant qu'Allāh lui a promis au Paradis, entouré de coupes aussi nombreuses que les étoiles, où sa communauté viendra s'abreuver au Jour de la Résurrection.",
      en: "Anas ibn Mālik narrated that while sitting among his Companions, the Prophet ﷺ briefly dosed off, then raised his head smiling to announce that a surah had just been revealed to him and recited Sūrah Al-Kawthar. He explained that Al-Kawthar is a vast river promised to him by Allāh in Paradise, lined with vessels as numerous as the stars, where his community will gather to drink.",
      es: "Anas ibn Mālik relató que estando el Profeta ﷺ con sus Compañeros tuvo un breve adormecimiento, alzó luego el rostro sonriendo, anunció la revelación de la Sura Al-Kawthar y explicó que Al-Kawthar es un río abundante prometido por Allah en el Paraíso al que acudirá su comunidad.",
      ar: "روى أنس بن مالك رضي الله عنه أن النبي ﷺ أغفى إغفاءةً بين أصحابه ثم رفع رأسه متبسمًا وأخبرهم بنزول سورة الكوثر، وبيّن لهم أن الكوثر نهر عظيم وعده الله إياه في الجنة ترد عليه أمته يوم القيامة.",
      de: "Anas ibn Mālik berichtete, dass der Prophet ﷺ im Kreis seiner Gefährten kurz einnickte, dann lächelnd das Haupt hob, die Offenbarung von Sure Al-Kawthar verkündete und erklärte, Al-Kawthar sei ein gewaltiger Fluss, den Allah ihm im Paradies verheißen hat.",
      it: "Anas ibn Mālik narrò che mentre sedeva tra i Compagni il Profeta ﷺ ebbe un breve sopore, poi alzò il capo sorridendo annunciando la rivelazione di Sura Al-Kawthar, spiegando che si tratta di un fiume immenso promessogli da Allāh in Paradiso.",
      id: "Anas bin Malik meriwayatkan bahwa ketika duduk bersama para sahabat, Nabi ﷺ sempat terlelap sejenak lalu mengangkat kepala sambil tersenyum mengabarkan turunnya Surah Al-Kautsar, dan menjelaskan bahwa Al-Kautsar adalah sungai berlimpah yang Allah janjikan baginya di Surga.",
      ru: "Анас ибн Малик передал, что Пророк ﷺ на мгновение задремал среди сподвижников, затем с улыбкой поднял голову, возвестил о ниспослании суры Аль-Каусар и пояснил, что аль-Каусар — это обильная река, обещанная ему Аллахом в Раю."
    }
  },
  "109:1": {
    type: "hadith",
    versets: ["109:1", "109:2", "109:3", "109:4", "109:5", "109:6"],
    plage: "109:1–6",
    source: "Sahīh Muslim n°726 & Sunan Abī Dāwūd n°5055",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah rapporte que le Messager d'Allāh ﷺ récitait régulièrement Sourate Al-Kāfirūn et Sourate Al-Ikhlās dans les deux unités surérogatoires qui précèdent la prière de l'aube. D'après Farwah ibn Nawfal, le Prophète ﷺ conseilla également de réciter cette sourate avant de dormir, car elle constitue une proclamation claire de monothéisme pur et de désaveu absolu de toute forme d'associationnisme.",
      en: "Abū Hurayrah narrated that the Messenger of Allāh ﷺ regularly recited Sūrah Al-Kāfirūn and Sūrah Al-Ikhlās in the two voluntary units before Fajr prayer. Furthermore, Farwah ibn Nawfal reported that the Prophet ﷺ advised reciting this surah before sleep as a clear declaration of pure monotheism and complete disavowal of polytheism.",
      es: "Abū Hurayrah relató que el Profeta ﷺ recitaba habitualmente Al-Kāfirūn junto a Al-Ikhlās en las dos unidades voluntarias previas al alba; además recomendó leerla antes de dormir por representar una declaración nítida de monoteísmo puro y desvinculación del politeísmo.",
      ar: "روى أبو هريرة رضي الله عنه أن النبي ﷺ كان يقرأ بسورتي الكافرون والإخلاص في ركعتي سنة الفجر، كما أوصى ﷺ بقراءتها عند النوم لأنها براءة صريحة من الشرك وإعلان خالص للتوحيد.",
      de: "Abū Hurayrah berichtete, dass der Prophet ﷺ Sure Al-Kāfirūn und Sure Al-Ikhlās regelmäßig in den beiden freiwilligen Gebetseinheiten vor dem Morgengebet rezitierte; zudem empfahl er sie vor dem Schlafengehen als klares Bekenntnis zum reinen Monotheismus.",
      it: "Abū Hurayrah narrò che il Profeta ﷺ recitava regolarmente Sura Al-Kāfirūn e Sura Al-Ikhlās nelle due unità facoltative prima dell'alba, e ne raccomandò la recitazione prima di dormire quale dichiarazione limpida di puro monoteismo.",
      id: "Abu Hurairah meriwayatkan bahwa Nabi ﷺ rutin membaca Surah Al-Kafirun dan Al-Ikhlas pada dua rakaat sunnah sebelum Subuh, serta menganjurkan membacanya menjelang tidur sebagai pernyataan tauhid murni dan pembebasan diri dari syirik.",
      ru: "Абу Хурайра передал, что Пророк ﷺ регулярно читал суры Аль-Кафирун и Аль-Ихляс в двух добровольных ракаатах перед утренней молитвой, а также советовал читать эту суру перед сном как ясное отречение от многобожия."
    }
  },
  "110:1": {
    type: "sabab",
    versets: ["110:1", "110:2", "110:3"],
    plage: "110:1–3",
    source: "Sahīh Al-Bukhārī n°4967, n°4970 & Sahīh Muslim n°484",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās rapporte que le calife ‘Umar réunit des vétérans de Badr pour les interroger sur la portée profonde de Sourate An-Nasr. Alors que les anciens y voyaient l'ordre de louer Allāh lors des victoires, le jeune Ibn ‘Abbās expliqua qu'elle annonçait l'approche du terme de la vie du Prophète ﷺ une fois sa mission accomplie — explication que ‘Umar approuva pleinement. ‘Ā’ishah témoigne qu'à partir de sa révélation, le Prophète ﷺ multipliait sans cesse la glorification et la demande de pardon dans ses inclinaisons et prosternations.",
      en: "Ibn ‘Abbās narrated that Caliph ‘Umar asked senior veterans of Badr about the deeper meaning of Sūrah An-Nasr. While they understood it as a command to praise Allāh upon victory, young Ibn ‘Abbās explained it also signaled the approaching end of the Prophet's ﷺ earthly life now that his mission was fulfilled—an insight ‘Umar fully affirmed. ‘Ā’ishah added that thereafter the Prophet ﷺ constantly praised Allāh and sought forgiveness in bowing and prostration.",
      es: "Ibn ‘Abbās relató que el califa ‘Umar preguntó a los veteranos de Badr por el sentido profundo de An-Nasr; mientras ellos vieron un mandato de alabanza ante la victoria, el joven Ibn ‘Abbās comprendió que anunciaba el cercano fallecimiento del Profeta ﷺ al haberse cumplido su misión, lo que ‘Umar confirmó. Desde entonces, según ‘Ā’ishah, el Profeta ﷺ multiplicaba la glorificación y la petición de perdón en la oración.",
      ar: "روى ابن عباس رضي الله عنهما أن عمر بن الخطاب سأل كبار أهل بدر عن معنى سورة النصر فأجاب ابن عباس بأنها إشارة إلى اقتراب أجل النبي ﷺ بعد إتمام البلاغ، فوافقه عمر على ذلك؛ وذكرت عائشة أن النبي ﷺ أكثر بعد نزولها من التسبيح والاستغفار في ركوعه وسجوده.",
      de: "Ibn ‘Abbās berichtete, dass Kalif ‘Umar die Veteranen von Badr nach der tieferen Bedeutung von Sure An-Nasr fragte und dem jungen Ibn ‘Abbās zustimmte, als dieser erklärte, die Sure kündige nach Vollendung der Botschaft das nahe Lebensende des Propheten ﷺ an. Laut ‘Ā’ishah mehrte der Prophet ﷺ daraufhin Lobpreis und Bitte um Vergebung im Gebet.",
      it: "Ibn ‘Abbās narrò che il califfo ‘Umar chiese ai veterani di Badr il senso profondo di Sura An-Nasr, concordando con il giovane Ibn ‘Abbās quando spiegò che annunciava l'avvicinarsi del congedo del Profeta ﷺ a missione compiuta. Secondo ‘Ā’ishah, da allora il Profeta ﷺ moltiplicò lode e richiesta di perdono nelle preghiere.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa Khalifah ‘Umar bertanya kepada para tokoh Perang Badar tentang makna terdalam Surah An-Nashr, lalu membenarkan penjelasan Ibnu ‘Abbas bahwa surah itu mengisyaratkan dekatnya wafat Nabi ﷺ setelah risalah sempurna. Menurut ‘Aisyah, sejak saat itu Nabi ﷺ memperbanyak tasbih dan istighfar dalam rukuk serta sujud.",
      ru: "Ибн ‘Аббас передал, что халиф ‘Умар спросил участников Бадра о глубинном смысле суры Ан-Наср и полностью согласился с юным Ибн ‘Аббасом, объяснившим, что она возвещает о близости кончины Пророка ﷺ после завершения его миссии. По словам ‘Аиши, с тех пор Пророк ﷺ постоянно восхвалял Аллаха и просил прощения в поклонах."
    }
  },
  "111:1": {
    type: "sabab",
    versets: ["111:1", "111:2", "111:3", "111:4", "111:5"],
    plage: "111:1–5",
    source: "Sahīh Al-Bukhārī n°4770, n°4971, n°4972 & Sahīh Muslim n°208",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās rapporte que lorsque le Messager d'Allāh ﷺ monta sur le mont As-Safā à La Mecque pour avertir solennellement les clans de Quraysh du châtiment de l'Au-delà et les appeler au monothéisme, son oncle Abū Lahab l'interrompit avec mépris en lui souhaitant la perte pour les avoir réunis ainsi. En réponse immédiate à son hostilité ouverte, Allāh révéla Sourate Al-Masad annonçant la ruine d'Abū Lahab et de son épouse complice.",
      en: "Ibn ‘Abbās narrated that when the Messenger of Allāh ﷺ climbed Mount As-Safā in Makkah to solemnly warn the clans of Quraysh and call them to monotheism, his uncle Abū Lahab interrupted him with scorn, wishing ruin upon him for gathering them. In immediate response to this hostility, Allāh revealed Sūrah Al-Masad foretelling the downfall of Abū Lahab and his supportive wife.",
      es: "Ibn ‘Abbās relató que al subir el Profeta ﷺ al monte As-Safā para advertir a los clanes de Quraysh y llamarlos al monoteísmo, su tío Abū Lahab lo interrumpió con desprecio deseándole la perdición por haberlos convocado. En respuesta inmediata descendió la Sura Al-Masad anunciando la ruina de Abū Lahab y su esposa.",
      ar: "روى ابن عباس رضي الله عنهما أنه لما صعد النبي ﷺ الصفا ينذر بطون قريش ويدعوهم إلى التوحيد، قاطعه عمه أبو لهب مستهزئًا وداعيًا عليه بالهلاك لأنه جمعهم، فأنزل الله ردًّا فوريًّا سورة المسد معلنةً خسران أبي لهب وامرأته.",
      de: "Ibn ‘Abbās berichtete, dass der Onkel Abū Lahab den Propheten ﷺ voller Spott unterbrach und ihm Verderben wünschte, als dieser auf dem Hügel As-Safā die Stämme der Quraisch zum Monotheismus rief. Als unmittelbare Antwort offenbarte Allah Sure Al-Masad.",
      it: "Ibn ‘Abbās narrò che quando il Profeta ﷺ salì sul colle As-Safā per chiamare i clan di Quraysh al monoteismo, suo zio Abū Lahab lo interruppe con disprezzo augurandogli la rovina. In risposta immediata Allāh rivelò Sura Al-Masad annunciando la disfatta di Abū Lahab e di sua moglie.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa saat Nabi ﷺ naik ke Bukit Shafa untuk menyeru kabilah Quraisy kepada tauhid, pamannya Abu Lahab memotong ucapan beliau dengan cemoohan dan sumpah serapah. Seketika Allah menurunkan Surah Al-Masad sebagai balasan tegas atas permusuhannya.",
      ru: "Ибн ‘Аббас передал, что когда Пророк ﷺ поднялся на холм ас-Сафа, чтобы призвать роды курайшитов к единобожию, его дядя Абу Ляхаб презрительно прервал его проклятием. В немедленный ответ на эту враждебность Аллах ниспослал суру Аль-Масад."
    }
  },
  "112:1": {
    type: "sabab",
    versets: ["112:1", "112:2", "112:3", "112:4"],
    plage: "112:1–4",
    source: "Sunan At-Tirmidhī n°3364 & Sahīh Al-Bukhārī n°5013, n°7375",
    degre: "Hasan",
    texte: {
      fr: "Ubayy ibn Ka‘b rapporte que des polythéistes demandèrent au Messager d'Allāh ﷺ de leur décrire la généalogie et la nature de son Seigneur ; Allāh fit alors descendre Sourate Al-Ikhlās pour proclamer Son Unicité absolue et Sa transcendance parfaite. Par ailleurs, dans Sahīh Al-Bukhārī, le Prophète ﷺ confirme que cette sourate équivaut en sens et en récompense au tiers du Coran, et évoque l'amour d'Allāh envers le Compagnon qui aimait la réciter dans chaque prière parce qu'elle expose les attributs du Tout Miséricordieux.",
      en: "Ubayy ibn Ka‘b reported that polytheists asked the Messenger of Allāh ﷺ to describe the lineage of his Lord, whereupon Allāh revealed Sūrah Al-Ikhlās proclaiming His absolute Oneness and transcendence. Additionally, in Sahīh Al-Bukhārī, the Prophet ﷺ affirmed that it equals one-third of the Qur'an in thematic weight and praised a Companion whose love for reciting it stemmed from its description of the Most Merciful.",
      es: "Ubayy ibn Ka‘b relató que unos politeístas pidieron al Profeta ﷺ describir el linaje de su Señor, y entonces Allah reveló la Sura Al-Ikhlās afirmando Su Unicidad absoluta y trascendencia. Además, en Sahīh Al-Bukhārī, el Profeta ﷺ confirmó que equivale en significado a un tercio del Corán.",
      ar: "روى أُبيّ بن كعب رضي الله عنه أن المشركين سألوا النبي ﷺ أن ينسب لهم ربه، فأنزل الله سورة الإخلاص تقريرًا للتوحيد الخالص وتنزيهه سبحانه؛ كما ثبت في صحيح البخاري أنها تعدل ثلث القرآن وأن الله أحبَّ صحابيًّا كان يحب قراءتها لأنها صفة الرحمن.",
      de: "Ubayy ibn Ka‘b überlieferte, dass Polytheisten den Propheten ﷺ nach dem Wesen und der Abstammung seines Herrn fragten, woraufhin Allah Sure Al-Ikhlās zur Verkündung Seiner absoluten Einheit offenbarte. Zudem bestätigte der Prophet ﷺ in Sahīh Al-Bukhārī, dass sie inhaltlich einem Drittel des Korans entspricht.",
      it: "Ubayy ibn Ka‘b riferì che alcuni politeisti chiesero al Profeta ﷺ di descrivere la discendenza del suo Signore, al che Allāh rivelò Sura Al-Ikhlās proclamando la Sua Unicità assoluta. Inoltre, in Sahīh Al-Bukhārī, il Profeta ﷺ affermò che essa equivale a un terzo del Corano.",
      id: "Ubayy bin Ka‘b meriwayatkan bahwa kaum musyrik meminta Nabi ﷺ menyebutkan nasab Tuhannya, lalu Allah menurunkan Surah Al-Ikhlas yang menegaskan keesaan mutlak-Nya. Selain itu dalam Shahih Al-Bukhari ditegaskan bahwa surah ini setara sepertiga Al-Qur'an.",
      ru: "Убайй ибн Ка‘б передал, что многобожники попросили Пророка ﷺ описать происхождение его Господа, и Аллах ниспослал суру Аль-Ихляс, утверждающую Его абсолютное Единство. Кроме того, в Сахихе аль-Бухари подтверждается, что по своему значению она приравнивается к трети Корана."
    }
  },
  "113:1": {
    type: "hadith",
    versets: ["113:1", "113:2", "113:3", "113:4", "113:5"],
    plage: "113:1–5",
    source: "Sahīh Muslim n°814 & Sahīh Al-Bukhārī n°5017, n°5763",
    degre: "Sahīh",
    texte: {
      fr: "‘Uqbah ibn ‘Āmir rapporte que le Prophète ﷺ lui annonça la révélation de versets de protection sans équivalent — Sourates Al-Falaq et An-Nās — surpassant toute autre formule de refuge. ‘Ā’ishah ajoute que le Prophète ﷺ les récitait chaque soir avec Sourate Al-Ikhlās en soufflant légèrement dans ses mains avant de les passer sur son corps, et rappelle le rôle de cette protection divine contre tout mal extérieur, l'envie et la sorcellerie.",
      en: "‘Uqbah ibn ‘Āmir narrated that the Prophet ﷺ told him verses of protection unlike any ever seen before—Sūrahs Al-Falaq and An-Nās—had been revealed. ‘Ā’ishah reported that the Prophet ﷺ recited them together with Al-Ikhlās every night before sleeping, wiping his hands over his body for protection against external harm, envy, and sorcery.",
      es: "‘Uqbah ibn ‘Āmir relató que el Profeta ﷺ le anunció la revelación de versículos de protección sin igual —Al-Falaq y An-Nās—. ‘Ā’ishah añadió que el Profeta ﷺ los recitaba cada noche junto a Al-Ikhlās pasando sus manos por el cuerpo como amparo frente al mal, la envidia y la hechicería.",
      ar: "روى عقبة بن عامر رضي الله عنه أن النبي ﷺ أخبره بنزول آيات لم يُرَ مثلهن قط في الاستعاذة وهما المعوّذتان (الفلق والناس)، وأخبرت عائشة رضي الله عنها أنه ﷺ كان يقرؤهما مع الإخلاص كل ليلة عند النوم وينفث في كفيه ويمسح بهما جسده وقايةً من الشرور والحسد والسحر.",
      de: "‘Uqbah ibn ‘Āmir berichtete, dass der Prophet ﷺ die Offenbarung unvergleichlicher Schutzverse – Al-Falaq und An-Nās – verkündete. Laut ‘Ā’ishah rezitierte er sie jeden Abend gemeinsam mit Al-Ikhlās als Schutz vor äußerem Übel, Neid und Zauberei.",
      it: "‘Uqbah ibn ‘Āmir narrò che il Profeta ﷺ annunciò la rivelazione di versetti di protezione senza eguali — Al-Falaq e An-Nās. ‘Ā’ishah riferì che egli li recitava ogni sera con Al-Ikhlās passando le mani sul corpo per chiedere protezione da mali, invidia e magia.",
      id: "‘Uqbah bin ‘Amir meriwayatkan bahwa Nabi ﷺ mengabarkan turunnya ayat-ayat perlindungan yang belum pernah ada tandingannya, yakni Al-Falaq dan An-Nas. ‘Aisyah menambahkan beliau rutin membacanya bersama Al-Ikhlas setiap malam menjelang tidur sebagai perlindungan dari keburukan, dengki, dan sihir.",
      ru: "‘Укба ибн ‘Амир передал, что Пророк ﷺ возвестил о ниспослании несравненных аятов защиты — сур Аль-Фаляк и Ан-Нас. ‘Аиша рассказала, что он читал их вместе с Аль-Ихляс каждую ночь перед сном, прося у Аллаха защиты от зла, зависти и колдовства."
    }
  },
  "114:1": {
    type: "hadith",
    versets: ["114:1", "114:2", "114:3", "114:4", "114:5", "114:6"],
    plage: "114:1–6",
    source: "Sahīh Muslim n°814 & Sahīh Al-Bukhārī n°5017",
    degre: "Sahīh",
    texte: {
      fr: "D'après ‘Uqbah ibn ‘Āmir et ‘Ā’ishah, Sourate An-Nās clôt le Coran en formant avec Sourate Al-Falaq les deux Sourates Protectrices (Al-Mu‘awwidhatān), que le Messager d'Allāh ﷺ prescrivait de réciter après les prières et avant le sommeil. Alors qu'Al-Falaq demande protection contre les dangers extérieurs, An-Nās enseigne au croyant à chercher refuge auprès du Seigneur, Roi et Dieu de l'humanité contre les suggestions insidieuses et les tentations intérieures.",
      en: "According to ‘Uqbah ibn ‘Āmir and ‘Ā’ishah, Sūrah An-Nās closes the Qur'an alongside Sūrah Al-Falaq as the Two Chapters of Refuge (Al-Mu‘awwidhatān), which the Messenger of Allāh ﷺ encouraged reciting after prayers and before sleep. While Al-Falaq seeks refuge from external harms, An-Nās turns to the Lord, Sovereign, and God of mankind for protection against hidden whispers and inner temptations.",
      es: "Según ‘Uqbah ibn ‘Āmir y ‘Ā’ishah, la Sura An-Nās cierra el Corán junto a Al-Falaq formando las Dos Suras Protectoras (Al-Mu‘awwidhatān), recomendadas tras la oración y antes de dormir para pedir amparo al Señor y Rey de la humanidad frente a los susurros ocultos y las tentaciones interiores.",
      ar: "وفق رواية عقبة بن عامر وعائشة رضي الله عنهما تختم سورة الناس القرآن مع سورة الفلق بوصفهما المعوّذتين اللتين أوصى النبي ﷺ بقراءتهما دبر الصلوات وعند النوم؛ فبينما تركز الفلق على الوقاية من الشرور الخارجية، تعلّم سورة الناس الاستعاذة برب الناس وملكهم وإلههم من الوسواس الخفي.",
      de: "Nach ‘Uqbah ibn ‘Āmir und ‘Ā’ishah beschließt Sure An-Nās zusammen mit Al-Falaq den Koran als die beiden Schutzsuren (Al-Mu‘awwidhatān), die nach den Gebeten und vor dem Schlafengehen empfohlen werden, um beim Herrn der Menschen Schutz vor inneren Einflüsterungen zu suchen.",
      it: "Secondo ‘Uqbah ibn ‘Āmir e ‘Ā’ishah, Sura An-Nās chiude il Corano insieme ad Al-Falaq formando le Due Sure Protettrici (Al-Mu‘awwidhatān), raccomandate dopo le preghiere e prima del riposo per cercare rifugio presso il Signore degli uomini dalle tentazioni sottili.",
      id: "Menurut ‘Uqbah bin ‘Amir dan ‘Aisyah, Surah An-Nas menutup Al-Qur'an bersama Al-Falaq sebagai Al-Mu‘awwidzatain yang dianjurkan dibaca usai shalat dan sebelum tidur untuk memohon perlindungan kepada Tuhan dan Raja manusia dari bisikan jahat yang tersembunyi.",
      ru: "Согласно ‘Укбе ибн ‘Амиру и ‘Аише, сура Ан-Нас завершает Коран вместе с Аль-Фаляк, образуя две суры защиты (аль-Му‘аввизатан), рекомендуемые после молитв и перед сном для обретения защиты у Господа и Владыки людей от тайного наущения."
    }
  }
};

// Auto-contrôle strict avant écriture (8 langues + champs obligatoires)
const LANGUES_REQ = ['fr', 'en', 'es', 'ar', 'de', 'it', 'id', 'ru'];
for (const [cle, rec] of Object.entries(LOT_12_FINAL)) {
  if (!rec.type || !rec.source || !rec.degre || !Array.isArray(rec.versets) || !rec.texte) {
    throw new Error(`Structure invalide pour ${cle}`);
  }
  for (const lg of LANGUES_REQ) {
    if (!rec.texte[lg] || typeof rec.texte[lg] !== 'string' || rec.texte[lg].trim().length < 20) {
      throw new Error(`Texte manquant ou trop court pour ${cle} [${lg}]`);
    }
  }
}

Object.assign(data.recits, LOT_12_FINAL);
data.version = (data.version || 1) + 1;

const jsonFinal = JSON.stringify(data, null, 2);
JSON.parse(jsonFinal);
writeSafe(asbabPath, jsonFinal);

let worker = fs.readFileSync(workerPath, 'utf8');
worker = worker.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
writeSafe(workerPath, worker);

const nbRecits = Object.keys(data.recits).length;
const nbVersets = Object.values(data.recits).reduce((acc, r) => acc + (Array.isArray(r.versets) ? r.versets.length : 1), 0);
console.log(`✅ Lot 12 final (Al-Fātihah + Sourates 96 à 114) validé et intégré !`);
console.log(`🎉 BASE COMPLÈTE : ${nbRecits} fiches authentifiées (Sahīh/Hasan) couvrant ${nbVersets} versets en 8 langues.`);
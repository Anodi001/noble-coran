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

const LOT_10_SAFF_MURSALAT = {
  "61:2": {
    type: "sabab",
    versets: ["61:2", "61:3", "61:4"],
    plage: "61:2–4",
    source: "Sunan At-Tirmidhī n°3309 & Musnad Ahmad",
    degre: "Hasan",
    texte: {
      fr: "‘Abdullāh ibn Salām (qu'Allāh l'agrée) rapporte qu'un groupe de Compagnons se réunirent et se dirent : « Si seulement nous savions quelle est l'œuvre la plus aimée d'Allāh afin que nous l'accomplissions ! » Allāh fit alors descendre le début de la Sourate As-Saff (v.1–4), les exhortant à l'accord parfait entre la parole et l'acte et à la fermeté en rangs serrés dans Son sentier.",
      en: "‘Abdullāh ibn Salām narrated that a group of Companions gathered and said: 'If only we knew which deed is most beloved to Allāh so that we could perform it!' Allāh then revealed the opening of Sūrah As-Saff (v.1–4), urging harmony between words and actions and steadfastness in solid ranks in His cause.",
      es: "‘Abdullāh ibn Salām relató que un grupo de Compañeros comentaron que deseaban conocer la obra más amada por Allah para practicarla; entonces descendió el comienzo de la Sura As-Saff (v.1–4), exhortándolos a la coherencia entre palabra y obra y a la firmeza en filas cerradas.",
      ar: "عن عبد الله بن سلام رضي الله عنه أن نفرًا من الصحابة تذاكروا فقالوا: لو نعلم أي الأعمال أحب إلى الله لعملناه، فأنزل الله مطلع سورة الصف (١–٤) حثًّا على مطابقة القول للعمل والثبات صفًّا واحدًا في سبيله.",
      de: "‘Abdullāh ibn Salām berichtete, dass eine Gruppe von Gefährten wünschte zu erfahren, welche Tat bei Allah am beliebtesten sei, um sie auszuführen; daraufhin offenbarte Allah den Beginn von Sure As-Saff (V. 1–4) über die Übereinstimmung von Wort und Tat.",
      it: "‘Abdullāh ibn Salām narrò che un gruppo di Compagni si disse: «Se solo sapessimo qual è l'opera più amata da Allāh per compierla!». Allāh rivelò allora l'inizio di Sura As-Saff (v.1–4), esortandoli alla coerenza tra parole e azioni.",
      id: "‘Abdullah bin Salam meriwayatkan bahwa sekelompok sahabat berbincang ingin mengetahui amal yang paling dicintai Allah agar dapat mengamalkannya; maka Allah menurunkan awal Surah Ash-Shaff (ayat 1–4) tentang keselarasan ucapan dan perbuatan.",
      ru: "‘Абдуллах ибн Салям передал, что группа сподвижников сказала: «Если бы мы знали, какое деяние любимее всего для Аллаха, мы бы совершили его!» Тогда Аллах ниспослал начало суры «Ас-Сафф» (аяты 1–4), призывая к единству слов и дел."
    }
  },
  "62:11": {
    type: "sabab",
    versets: ["62:11"],
    plage: "62:11",
    source: "Sahīh Al-Bukhārī n°936, n°4899 & Sahīh Muslim n°863",
    degre: "Sahīh",
    texte: {
      fr: "Jābir ibn ‘Abdillāh (qu'Allāh les agrée) rapporte qu'un vendredi, alors que le Messager d'Allāh ﷺ prononçait le sermon (Khutbah) debout dans la mosquée, une caravane marchande venue du Shām arriva à Médine. Les gens se précipitèrent dehors vers la caravane jusqu'à ce qu'il ne reste plus que douze hommes avec le Prophète ﷺ. Allāh révéla aussitôt ce verset rappelant que ce qui est auprès d'Allāh est infiniment meilleur que tout divertissement et tout commerce.",
      en: "Jābir ibn ‘Abdillāh narrated that on a Friday while the Messenger of Allāh ﷺ was delivering the sermon (Khutbah) standing in the mosque, a trade caravan arrived from Syria and the congregation rushed out toward it until only twelve men remained with him. Allāh immediately revealed this verse reminding believers that what is with Allāh is far better than amusement or trade.",
      es: "Yābir ibn ‘Abdillāh relató que un viernes, mientras el Profeta ﷺ pronunciaba el sermón de pie, llegó una caravana comercial desde Siria y la gente salió apresurada hasta quedar solo doce hombres con él; Allah reveló enseguida esta aleya recordando que lo que está junto a Él es mejor que cualquier distracción o comercio.",
      ar: "عن جابر بن عبد الله رضي الله عنهما أنه بينما كان النبي ﷺ يخطب قائمًا يوم الجمعة أقبلت عير تجارة من الشام فانفتل الناس إليها حتى لم يبقَ مع النبي ﷺ إلا اثنا عشر رجلًا، فنزلت هذه الآية تذكيرًا بأن ما عند الله خير من اللهو ومن التجارة.",
      de: "Dschābir ibn ‘Abdillāh berichtete, dass während der Freitagspredigt des Propheten ﷺ eine Handelskarawane aus Syrien eintraf und die Menge hinausströmte, bis nur zwölf Männer bei ihm blieben; sogleich offenbarte Allah diesen Vers, dass das, was bei Ihm ist, besser ist als Zerstreuung und Handel.",
      it: "Jābir ibn ‘Abdillāh narrò che un venerdì, mentre il Profeta ﷺ teneva il sermone in piedi, giunse una carovana commerciale dalla Siria e la gente uscì di corsa finché rimasero solo dodici uomini con lui; Allāh rivelò subito questo versetto ricordando che ciò che è presso di Lui è migliore del commercio.",
      id: "Jabir bin ‘Abdillah meriwayatkan bahwa saat Nabi ﷺ sedang berdiri menyampaikan khutbah Jumat, rombongan kafilah dagang tiba dari Syam sehingga jamaah berhamburan keluar hingga tersisa dua belas orang saja; seketika Allah menurunkan ayat teguran ini.",
      ru: "Джабир ибн ‘Абдуллах передал, что в пятницу, когда Пророк ﷺ стоя произносил проповедь, прибыл торговый караван из Шама, и люди поспешили к нему, оставив с Пророком ﷺ лишь двенадцать человек; тогда Аллах немедленно ниспослал этот аят."
    }
  },
  "63:1": {
    type: "sabab",
    versets: ["63:1", "63:2", "63:3", "63:4", "63:5", "63:6", "63:7", "63:8"],
    plage: "63:1–8",
    source: "Sahīh Al-Bukhārī n°4900, n°4901, n°4905 & Sahīh Muslim n°2772",
    degre: "Sahīh",
    texte: {
      fr: "Zayd ibn Arqam (qu'Allāh l'agrée), alors jeune adolescent, rapporte qu'au cours d'une expédition il entendit le chef des hypocrites ‘Abdullāh ibn Ubayy dire : « Ne dépensez rien pour ceux qui entourent le Messager d'Allāh afin qu'ils se dispersent ! Si nous retournons à Médine, le plus puissant en chassera certes le plus faible ! » Zayd en informa le Prophète ﷺ, mais Ibn Ubayy jura par Allāh n'avoir rien dit de tel, plongeant Zayd dans une grande tristesse jusqu'à ce qu'Allāh révèle ces versets confirmant intégralement sa parole. Le Prophète ﷺ lui prit alors doucement l'oreille en disant : « Allāh a confirmé ta véracité, ô garçon ! »",
      en: "Zayd ibn Arqam narrated that during an expedition he overheard the hypocrite leader ‘Abdullāh ibn Ubayy say: 'Do not spend on those with the Messenger of Allāh so they disperse; if we return to Madinah, the mightier will surely expel the weaker.' When Zayd reported this, Ibn Ubayy swore he never said it, distressing Zayd deeply until Allāh revealed these verses completely vindicating him. The Prophet ﷺ gently held his ear saying: 'Allāh has confirmed your truthfulness!'",
      es: "Zayd ibn Arqam relató que durante una expedición oyó al hipócrita ‘Abdullāh ibn Ubayy pronunciar las palabras citadas en los versículos 7 y 8; al negarlo aquel bajo juramento, Zayd quedó afligido hasta que Allah reveló estas aleyas confirmando su veracidad, y el Profeta ﷺ le tomó suavemente de la oreja diciendo: «¡Allah ha confirmado tu verdad!».",
      ar: "عن زيد بن أرقم رضي الله عنه أنه سمع عبد الله بن أُبيّ يقول في غزوة: لا تنفقوا على من عند رسول الله حتى ينفضوا، ولئن رجعنا إلى المدينة ليخرجن الأعز منها الأذل؛ فلما أخبر النبي ﷺ حلف ابن أُبيّ أنه لم يقل، فحزن زيد حتى أنزل الله سورة المنافقين تصديقًا لزيد، فأخذ النبي ﷺ بأذنه وقال: «إن الله قد صدّقك يا غلام».",
      de: "Zayd ibn Arqam berichtete, dass er auf einem Feldzug hörte, wie der Heuchler ‘Abdullāh ibn Ubayy die in den Versen 7–8 zitierten Worte sprach; dieser schwor jedoch, sie nie gesagt zu haben, sodass Zayd betrübt war, bis Allah diese Verse zu seiner Bestätigung offenbarte und der Prophet ﷺ ihn für seine Wahrhaftigkeit lobte.",
      it: "Zayd ibn Arqam narrò di aver udito durante una spedizione l'ipocrita ‘Abdullāh ibn Ubayy pronunciare le parole riportate nei versetti 7–8; quando costui giurò il falso, Zayd si rattristò finché Allāh rivelò questi versetti confermando pienamente la sua veridicità.",
      id: "Zaid bin Arqam meriwayatkan bahwa dalam sebuah perjalanan perang ia mendengar tokoh munafik ‘Abdullah bin Ubay mengucapkan perkataan pada ayat 7–8; saat ia melaporkannya, Ibnu Ubay bersumpah mengingkarinya hingga Zaid bersedih, lalu Allah menurunkan ayat-ayat ini membenarkan Zaid.",
      ru: "Зайд ибн Аркам передал, что в походе услышал от лицемера ‘Абдуллаха ибн Убайя слова, приведённые в 7–8 аятах; тот поклялся, что не говорил этого, чем сильно опечалил Зайда, но Аллах ниспослал эти аяты, полностью подтвердив его правоту, и Пророк ﷺ похвалил его за правдивость."
    }
  },
  "64:14": {
    type: "sabab",
    versets: ["64:14"],
    plage: "64:14",
    source: "Sunan At-Tirmidhī n°3317",
    degre: "Hasan",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte que ce verset fut révélé au sujet d'hommes de La Mecque qui avaient embrassé l'Islam et voulaient émigrer vers le Prophète ﷺ à Médine, mais que leurs épouses et leurs enfants retinrent par attachement. Lorsqu'ils purent enfin émigrer plus tard et constatèrent combien leurs compagnons les avaient devancés dans la science religieuse, ils songèrent à sévir contre leurs proches ; Allāh révéla alors la fin du verset les exhortant au pardon et à l'indulgence.",
      en: "Ibn ‘Abbās narrated that this verse was revealed regarding men in Makkah who embraced Islam and wished to migrate to Madinah, but whose wives and children held them back. When they finally migrated later and saw how others had surpassed them in religious learning, they considered punishing their families, so Allāh revealed the end of the verse urging them to pardon and forgive.",
      es: "Ibn ‘Abbās relató que esta aleya descendió sobre hombres de La Meca cuyas esposas e hijos les impidieron emigrar a tiempo a Medina; cuando luego emigraron y quisieron reprender severamente a sus familias por haberlos retrasado, Allah reveló el final de la aleya exhortándolos al perdón.",
      ar: "عن ابن عباس رضي الله عنهما أن هذه الآية نزلت في رجال أسلموا بمكة وأرادوا الهجرة إلى النبي ﷺ فأبى أزواجهم وأولادهم أن يدعوهم، فلما هاجروا لاحقًا ورأوا الناس قد فقهوا في الدين همّوا بمعاقبتهم، فأنزل الله آخر الآية حثًّا على العفو والصفح والمغفرة.",
      de: "Ibn ‘Abbās berichtete, dass dieser Vers über Männer aus Mekka offenbart wurde, die von ihren Familien an einer früheren Auswanderung nach Medina gehindert wurden; als sie später nachkamen und ihre Angehörigen streng maßregeln wollten, rief Allah sie am Ende des Verses zu Nachsicht und Vergebung auf.",
      it: "Ibn ‘Abbās narrò che questo versetto scese riguardo ad uomini della Mecca trattenuti dai familiari dall'emigrare a Medina; quando poi emigrarono e pensarono di punire i propri cari, Allāh rivelò la fine del versetto invitandoli al perdono e all'indulgenza.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa ayat ini turun mengenai beberapa pria di Makkah yang ditahan istri dan anak-anaknya untuk berhijrah ke Madinah; ketika akhirnya mereka berhijrah dan berniat menghukum keluarganya, Allah menurunkan akhir ayat yang menganjurkan pemaafan.",
      ru: "Ибн ‘Аббас передал, что этот аят был ниспослан о мекканцах, которых жёны и дети удержали от переселения в Медину; когда же они всё-таки переселились позже и задумали наказать свои семьи, Аллах в конце аята призвал их к прощению и снисходительности."
    }
  },
  "65:1": {
    type: "sabab",
    versets: ["65:1"],
    plage: "65:1",
    source: "Sahīh Al-Bukhārī n°4908, n°5251 & Sahīh Muslim n°1471",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn ‘Umar (qu'Allāh les agrée) raconte qu'il divorça son épouse alors qu'elle avait ses menstrues. Son père ‘Umar consulta aussitôt le Messager d'Allāh ﷺ, qui s'en montra vivement contrarié et lui ordonna de la reprendre jusqu'à ce qu'elle soit purifiée, puis qu'elle ait un nouveau cycle et soit de nouveau purifiée — lui rappelant alors cet ordre coranique : « Divorcez-les en respectant leur délai prescrit (li-‘iddatihinna) ! »",
      en: "‘Abdullāh ibn ‘Umar narrated that he divorced his wife during her menstrual period. When ‘Umar informed the Messenger of Allāh ﷺ, he was displeased and ordered Ibn ‘Umar to take her back until she became pure, went through another cycle, and became pure again—reminding him of this Qur'anic rule: 'Divorce them for their prescribed waiting period.'",
      es: "‘Abdullāh ibn ‘Umar relató que divorció a su esposa durante su menstruación; al saberlo, el Profeta ﷺ se disgustó y le ordenó retomarla hasta que se purificara conforme a la regla de esta aleya sobre respetar el plazo prescrito de espera.",
      ar: "عن عبد الله بن عمر رضي الله عنهما أنه طلق امرأته وهي حائض، فسأل عمر رسول الله ﷺ فتغيّظ فيه وأمره أن يراجعها حتى تطهر ثم تحيض ثم تطهر، تلاوةً وتطبيقًا لقوله تعالى: ﴿فَطَلِّقُوهُنَّ لِعِدَّتِهِنَّ﴾.",
      de: "‘Abdullāh ibn ‘Umar berichtete, dass er sich während der Menstruation von seiner Frau schied; der Prophet ﷺ war darüber verstimmt und wies ihn an, sie zurückzunehmen und erst in einem Zustand der Reinheit gemäß der Regel dieses Verses über die vorgeschriebene Wartezeit zu verfahren.",
      it: "‘Abdullāh ibn ‘Umar narrò di aver divorziato la moglie durante le mestruazioni; il Profeta ﷺ se ne rammaricò e gli ordinò di riprenderla fino a quando fosse purificata, in applicazione della norma di questo versetto sul rispetto del termine prescritto.",
      id: "‘Abdullah bin ‘Umar meriwayatkan bahwa ia menceraikan istrinya saat sedang haid; Nabi ﷺ menegurnya dan menyuruhnya merujuk kembali hingga istrinya suci sesuai ketentuan ayat ini agar menceraikan pada waktu yang tepat untuk masa iddah.",
      ru: "‘Абдуллах ибн ‘Умар рассказал, что развёлся с женой во время менструации; Пророк ﷺ разгневался и велел ему вернуть её до наступления периода чистоты, указав на предписание этого аята соблюдать установленный срок ожидания."
    }
  },
  "66:1": {
    type: "sabab",
    versets: ["66:1", "66:2", "66:3", "66:4", "66:5"],
    plage: "66:1–5",
    source: "Sahīh Al-Bukhārī n°4912, n°4913, n°5267 & Sahīh Muslim n°1474, n°1479",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah et ‘Umar ibn Al-Khattāb (qu'Allāh les agrée) rapportent que le Messager d'Allāh ﷺ avait l'habitude de rester un moment chez son épouse Zaynab bint Jahsh où elle lui servait du miel. Par jalousie, ‘Ā’ishah et Hafsah se mirent d'accord pour lui dire qu'il sentait l'odeur du Maghāfīr (une gomme d'arbre à l'odeur forte que le Prophète ﷺ détestait). Pour leur faire plaisir, il jura alors de ne plus jamais boire de miel. Allāh fit descendre ces versets lui demandant pourquoi il s'interdisait ce qu'Allāh lui avait rendu licite, tout en exhortant ses épouses au repentir.",
      en: "‘Ā’ishah and ‘Umar ibn Al-Khattāb narrated that the Messenger of Allāh ﷺ used to spend extra time at Zaynab bint Jahsh's home drinking honey. Out of jealousy, ‘Ā’ishah and Hafsah agreed to tell him he smelled of Maghāfīr (a pungent tree resin he disliked), so he vowed never to drink honey again to please them. Allāh then revealed these verses asking why he forbade what Allāh made lawful for him.",
      es: "‘Ā’ishah y ‘Umar relataron que el Profeta ﷺ solía tomar miel en casa de Zaynab bint Yahsh; por celos, ‘Ā’ishah y Hafsah acordaron decirle que olía a resina de Maghāfīr, por lo que él juró no volver a probar miel. Entonces Allah reveló estas aleyas preguntándole por qué se prohibía lo que Allah le había hecho lícito.",
      ar: "عن عائشة وعمر بن الخطاب رضي الله عنهما أن النبي ﷺ كان يمكث عند زينب بنت جحش ويشرب عندها عسلًا، فتواطأت عائشة وحفصة غيرةً أن تقولا له إنه أكل مغافير (صمغ ذو رائحة يكرهها ﷺ)، فحلف ﷺ ألا يشرب العسل إرضاءً لهن، فأنزل الله هذه الآيات عتابًا لطيفًا: ﴿لِمَ تُحَرِّمُ مَا أَحَلَّ اللَّهُ لَكَ﴾.",
      de: "‘Ā’ishah und ‘Umar berichteten, dass der Prophet ﷺ bei Zaynab bint Dschahsch gern Honig trank; aus Eifersucht verabredeten ‘Ā’ishah und Hafsah, ihm zu sagen, er rieche nach Maghāfīr-Harz, woraufhin er schwor, keinen Honig mehr zu trinken. Daraufhin offenbarte Allah diese Verse, warum er sich verbiete, was Allah ihm erlaubt hat.",
      it: "‘Ā’ishah e ‘Umar narrarono che il Profeta ﷺ era solito bere miele da Zaynab bint Jahsh; per gelosia, ‘Ā’ishah e Hafsah si accordarono per dirgli che sapeva di resina Maghāfīr, inducendolo a giurare di non berne più. Allāh rivelò allora questi versetti chiedendogli perché si proibisse ciò che Gli era lecito.",
      id: "‘Aisyah dan ‘Umar meriwayatkan bahwa Nabi ﷺ biasa meminum madu di rumah Zainab binti Jahsy; karena cemburu, ‘Aisyah dan Hafshah sepakat mengatakan tercium bau getah Maghafir sehingga Nabi ﷺ bersumpah tidak meminum madu lagi. Allah pun menurunkan ayat-ayat ini.",
      ru: "‘Аиша и ‘Умар передали, что Пророк ﷺ любил пить мёд у Зайнаб бинт Джахш; из ревности ‘Аиша и Хафса сговорились сказать ему, что от него пахнет смолой магафир, после чего он поклялся больше не пить мёд. Тогда Аллах ниспослал эти аяты, спрашивая, зачем он запрещает себе дозволенное Аллахом."
    }
  },
  "66:11": {
    type: "hadith",
    versets: ["66:11", "66:12"],
    plage: "66:11–12",
    source: "Sahīh Al-Bukhārī n°3411, n°3769 & Sahīh Muslim n°2431",
    degre: "Sahīh",
    texte: {
      fr: "Abū Mūsā Al-Ash‘arī (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ a honoré les deux figures féminines citées en modèles universels pour tous les croyants dans ces deux versets finaux : « Beaucoup d'hommes ont atteint la perfection, mais parmi les femmes seules Āsiyah, l'épouse de Pharaon, et Maryam, fille de ‘Imrān, l'ont atteinte ; et la supériorité de ‘Ā’ishah sur les autres femmes est comparable à celle du plat de Tharīd sur les autres mets. »",
      en: "Abū Mūsā Al-Ash‘arī narrated that the Messenger of Allāh ﷺ honored the two believing women presented as timeless models in these closing verses: 'Many among men have attained perfection, yet among women only Āsiyah the wife of Pharaoh and Maryam daughter of ‘Imrān attained it; and the excellence of ‘Ā’ishah over other women is like that of Tharīd over all other foods.'",
      es: "Abū Mūsā Al-Ash‘arī relató que el Profeta ﷺ ensalzó a las dos mujeres presentadas como modelos universales en estas aleyas finales: «Muchos hombres alcanzaron la perfección, pero entre las mujeres solo la alcanzaron Āsiyah, esposa de Faraón, y Maryam, hija de ‘Imrān».",
      ar: "عن أبي موسى الأشعري رضي الله عنه أن النبي ﷺ أشاد بالمرأتين اللتين ضربهما الله مثلًا للمؤمنين في ختام هذه السورة فقال: «كمل من الرجال كثير، ولم يكمل من النساء إلا آسية امرأة فرعون ومريم بنت عمران، وإن فضل عائشة على النساء كفضل الثريد على سائر الطعام».",
      de: "Abū Mūsā Al-Ash‘arī berichtete, dass der Prophet ﷺ die beiden in diesen Schlussversen als Vorbilder genannten Frauen rühmte: „Viele unter den Männern erreichten Vollkommenheit, doch unter den Frauen erreichten sie nur Āsiyah, die Frau Pharaos, und Maryam, die Tochter ‘Imrāns.“",
      it: "Abū Mūsā Al-Ash‘arī narrò che il Profeta ﷺ esaltò le due figure femminili additate a modello in questi versetti finali: «Molti uomini hanno raggiunto la perfezione, ma tra le donne l'hanno raggiunta solo Āsiyah moglie del Faraone e Maria figlia di ‘Imrān».",
      id: "Abu Musa Al-Asy‘ari meriwayatkan sabda Nabi ﷺ yang memuji dua teladan agung pada penutup surah ini: “Banyak laki-laki yang mencapai kesempurnaan, namun dari kalangan wanita tidak ada yang sempurna kecuali Asiyah istri Fir‘aun dan Maryam putri ‘Imran.”",
      ru: "Абу Муса аль-Аш‘ари передал слова Пророка ﷺ о двух женщинах, приведённых в пример верующим в этих аятах: «Многие из мужчин достигли совершенства, а из женщин совершенства достигли лишь Асия, жена Фараона, и Марьям, дочь ‘Имрана»."
    }
  },
  "67:1": {
    type: "hadith",
    versets: ["67:1"],
    plage: "67:1",
    source: "Sunan At-Tirmidhī n°2891 & Sunan Abī Dāwūd n°1400",
    degre: "Hasan",
    texte: {
      fr: "Abū Hurayrah (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ a dit au sujet du mérite immense de cette sourate : « Il y a dans le Coran une sourate de trente versets qui a intercédé en faveur d'un homme jusqu'à ce qu'il lui soit pardonné : c'est “Béni soit Celui dans la Main de qui est la Royauté” (Sourate Al-Mulk). »",
      en: "Abū Hurayrah narrated that the Messenger of Allāh ﷺ said regarding the great virtue of this surah: 'There is a surah in the Qur'an of thirty verses that interceded for a man until he was forgiven: “Blessed is He in whose hand is dominion” (Sūrah Al-Mulk).'",
      es: "Abū Hurayrah relató que el Mensajero de Allah ﷺ dijo sobre la gran virtud de esta sura: «Hay en el Corán una sura de treinta aleyas que intercedió por un hombre hasta que le fue perdonado: es la Sura Al-Mulk».",
      ar: "عن أبي هريرة رضي الله عنه أن النبي ﷺ قال في فضل هذه السورة: «إن سورةً من القرآن ثلاثون آية شفعت لرجل حتى غُفر له، وهي: ﴿تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ﴾».",
      de: "Abū Hurayrah berichtete, dass der Gesandte Allahs ﷺ über den Vorzug dieser Sure sagte: „Es gibt eine Sure im Koran mit dreißig Versen, die für einen Menschen Fürsprache einlegte, bis ihm vergeben wurde: Sure Al-Mulk.“",
      it: "Abū Hurayrah narrò che il Messaggero di Allāh ﷺ disse sul merito di questa sura: «Vi è nel Corano una sura di trenta versetti che intercedette per un uomo finché non gli fu perdonato: è Sura Al-Mulk».",
      id: "Abu Hurairah meriwayatkan sabda Rasulullah ﷺ tentang keutamaan surah ini: “Sesungguhnya ada satu surah dalam Al-Qur'an berisi tiga puluh ayat yang memberi syafaat bagi seseorang hingga ia diampuni, yaitu Surah Al-Mulk.”",
      ru: "Абу Хурайра передал слова Посланника Аллаха ﷺ о великом достоинстве этой суры: «Поистине, есть в Коране сура из тридцати аятов, которая заступилась за человека, пока ему не было прощено — это сура “Аль-Мульк”»."
    }
  },
  "68:1": {
    type: "hadith",
    versets: ["68:1"],
    plage: "68:1",
    source: "Sahīh Muslim n°2653 & Sunan Abī Dāwūd n°4700",
    degre: "Sahīh",
    texte: {
      fr: "‘Ubādah ibn As-Sāmit et ‘Abdullāh ibn ‘Amr rapportent deux Hadiths authentiques éclairant le serment par la Plume (Al-Qalam) : le Messager d'Allāh ﷺ a enseigné que la première créature qu'Allāh créa parmi les instruments du décret fut la Plume, à laquelle Il ordonna d'écrire tout ce qui doit advenir jusqu'au Jour de la Résurrection — et qu'Allāh inscrivit les destinées de toutes les créatures cinquante mille ans avant la création des cieux et de la terre.",
      en: "‘Ubādah ibn As-Sāmit and ‘Abdullāh ibn ‘Amr narrated two authentic Hadiths illuminating the oath by the Pen (Al-Qalam): the Messenger of Allāh ﷺ taught that Allāh commanded the Pen to write everything destined to occur until the Day of Resurrection, and that Allāh recorded the decrees of all creation fifty thousand years before creating the heavens and the earth.",
      es: "‘Ubādah ibn As-Sāmit y ‘Abdullāh ibn ‘Amr relataron dos hadices auténticos sobre la Pluma (Al-Qalam): el Profeta ﷺ enseñó que Allah ordenó a la Pluma escribir todo cuanto acontecería hasta el Día de la Resurrección, y que decretó el destino de la creación cincuenta mil años antes de crear los cielos y la tierra.",
      ar: "عن عبادة بن الصامت وعبد الله بن عمرو رضي الله عنهما في بيان شأن القلم الذي أقسم الله به: أن الله أمر القلم أن يكتب مقادير كل شيء حتى تقوم الساعة، وأن الله كتب مقادير الخلائق قبل أن يخلق السماوات والأرض بخمسين ألف سنة.",
      de: "‘Ubādah ibn As-Sāmit und ‘Abdullāh ibn ‘Amr überlieferten zwei authentische Hadithe zum Schwur bei dem Schreibrohr (Al-Qalam): Allah gebot dem Schreibrohr, alles bis zum Tag der Auferstehung niederzuschreiben, und verzeichnete die Bestimmungen der Geschöpfe fünfzigtausend Jahre vor der Erschaffung der Himmel und der Erde.",
      it: "‘Ubādah ibn As-Sāmit e ‘Abdullāh ibn ‘Amr narrarono due Hadith autentici sul giuramento per il Calamo (Al-Qalam): Allāh ordinò al Calamo di scrivere tutto ciò che sarebbe accaduto fino al Giorno della Resurrezione, e fissò i decreti del creato cinquantamila anni prima della creazione dei cieli e della terra.",
      id: "‘Ubadah bin Ash-Shamit dan ‘Abdullah bin ‘Amr meriwayatkan dua hadits shahih tentang Pena (Al-Qalam): Allah memerintahkan Pena mencatat segala ketetapan hingga Hari Kiamat, dan Allah menuliskan takdir seluruh makhluk lima puluh ribu tahun sebelum penciptaan langit dan bumi.",
      ru: "‘Убада ибн ас-Самит и ‘Абдуллах ибн ‘Амр передали два достоверных хадиса о Письменной трости (аль-Калам): Аллах повелел ей записать всё, что произойдёт до Судного дня, и предопределения всех творений были записаны за пятьдесят тысяч лет до сотворения небес и земли."
    }
  },
  "68:4": {
    type: "hadith",
    versets: ["68:4"],
    plage: "68:4",
    source: "Sahīh Muslim n°746",
    degre: "Sahīh",
    texte: {
      fr: "Sa‘d ibn Hishām interrogea la Mère des Croyants ‘Ā’ishah (qu'Allāh l'agrée) au sujet du caractère du Messager d'Allāh ﷺ — auquel Allāh rend cet hommage sublime (« Et tu es certes d'une moralité éminente »). Elle répondit par cette formule célèbre : « Ne lis-tu donc pas le Coran ? En vérité, le caractère du Prophète d'Allāh ﷺ était le Coran lui-même ! » — mettant en pratique chacun de ses ordres, de ses interdits et de ses vertus.",
      en: "When Sa‘d ibn Hishām asked ‘Ā’ishah about the character of the Messenger of Allāh ﷺ—praised here as 'of an exalted standard of character'—she replied with her famous words: 'Do you not read the Qur'an? Indeed, the character of the Prophet of Allāh ﷺ was the Qur'an!'—living out every command, prohibition, and virtue within it.",
      es: "Al preguntar Sa‘d ibn Hishām a ‘Ā’ishah por el carácter del Mensajero de Allah ﷺ —elogiado en esta aleya—, ella respondió con sus célebres palabras: «¿Acaso no lees el Corán? Su carácter era el Corán mismo», encarnando en su vida cada enseñanza y virtud del Libro.",
      ar: "سأل سعد بن هشام أم المؤمنين عائشة رضي الله عنها عن خُلق رسول الله ﷺ الذي أثنى الله عليه في هذه الآية، فقالت قولتها الشهيرة: «ألست تقرأ القرآن؟ فإن خُلق نبي الله ﷺ كان القرآن»، امتثالًا تامًّا لأوامره وآدابه ومكارمه.",
      de: "Auf die Frage von Sa‘d ibn Hishām nach dem Charakter des Gesandten Allahs ﷺ – den dieser Vers als gewaltig rühmt – antwortete ‘Ā’ishah mit den berühmten Worten: „Liest du denn nicht den Koran? Wahrlich, der Charakter des Propheten ﷺ war der Koran!“",
      it: "Quando Sa‘d ibn Hishām chiese ad ‘Ā’ishah quale fosse il carattere del Messaggero di Allāh ﷺ — lodato in questo versetto — ella rispose con le sue celebri parole: «Non leggi forse il Corano? In verità il carattere del Profeta ﷺ era il Corano stesso!».",
      id: "Ketika Sa‘d bin Hisyam bertanya kepada ‘Aisyah tentang akhlak Rasulullah ﷺ yang dipuji agung dalam ayat ini, beliau menjawab dengan ungkapan masyhur: “Bukankah engkau membaca Al-Qur'an? Sesungguhnya akhlak Nabi Allah ﷺ adalah Al-Qur'an!”",
      ru: "Когда Са‘д ибн Хишам спросил ‘Аишу о нраве Посланника Аллаха ﷺ, восхваляемом в этом аяте, она произнесла свои знаменитые слова: «Разве ты не читаешь Коран? Поистине, нравом Пророка Аллаха ﷺ был сам Коран!»"
    }
  },
  "68:42": {
    type: "hadith",
    versets: ["68:42"],
    plage: "68:42",
    source: "Sahīh Al-Bukhārī n°4919 & Sahīh Muslim n°183",
    degre: "Sahīh",
    texte: {
      fr: "Abū Sa‘īd Al-Khudrī (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ décrivit ce moment décisif du Jour de la Résurrection (« Le jour où la Jambe sera découverte et où ils seront appelés à la prosternation ») : chaque croyant et chaque croyante se prosternera aussitôt spontanément devant son Seigneur, tandis que quiconque se prosternait ici-bas par ostentation ou pour se faire remarquer verra son dos se figer comme une seule vertèbre rigide, incapable de s'incliner.",
      en: "Abū Sa‘īd Al-Khudrī narrated that the Messenger of Allāh ﷺ described this decisive moment of Judgment Day ('The Day the Shin will be uncovered and they are invited to prostrate'): every sincere believing man and woman will spontaneously fall into prostration, while whoever used to pray merely for show in this world will find their back stiffened like a single rigid bone, unable to bow.",
      es: "Abū Sa‘īd Al-Khudrī relató que el Profeta ﷺ describió este instante del Día del Juicio: todo creyente y creyente sincero se postrará de inmediato ante su Señor, mientras que quien se postraba en este mundo por ostentación verá su espalda volverse rígida e incapaz de inclinarse.",
      ar: "عن أبي سعيد الخدري رضي الله عنه أن النبي ﷺ وصف هذا المشهد العظيم يوم القيامة: فيسجد كل مؤمن ومؤمنة لله طوعًا، أما من كان يسجد في الدنيا رياءً وسمعةً فيذهب ليسجد فيعود ظهره طبقًا واحدًا فلا يستطيع السجود.",
      de: "Abū Sa‘īd Al-Khudrī berichtete, dass der Prophet ﷺ diesen Moment am Jüngsten Tag beschrieb: Jeder aufrichtige Gläubige wird sich mühelos niederwerfen, während demjenigen, der im Diesseits nur aus Augendienerei betete, der Rücken wie ein einziges starres Stück wird.",
      it: "Abū Sa‘īd Al-Khudrī narrò che il Profeta ﷺ descrisse questo momento del Giorno del Giudizio: ogni credente sincero si prosternerà spontaneamente, mentre chi pregava in questo mondo per ostentazione avrà la schiena irrigidita come un solo osso, incapace di chinarsi.",
      id: "Abu Sa‘id Al-Khudri meriwayatkan penjelasan Nabi ﷺ atas momen Hari Kiamat ini: setiap mukmin dan mukminah yang tulus langsung bersujud, sedangkan orang yang dahulu shalat karena riya punggungnya menjadi kaku seperti satu tulang sehingga tak mampu bersujud.",
      ru: "Абу Са‘ид аль-Худри передал описание Пророком ﷺ этого момента Судного дня: каждый искренний верующий и верующая легко падут ниц, тогда как у того, кто молился в земной жизни напоказ, спина станет твёрдой, словно единая кость, и он не сможет склониться."
    }
  },
  "68:51": {
    type: "hadith",
    versets: ["68:51"],
    plage: "68:51",
    source: "Sahīh Al-Bukhārī n°5740 & Sahīh Muslim n°2187, n°2188",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah et Ibn ‘Abbās (qu'Allāh les agrée) rapportent que le Messager d'Allāh ﷺ a confirmé la réalité du mauvais œil (« Al-‘aynu haqq ») — illustrant l'hostilité des regards envieux décrits dans ce verset (« Peu s'en faut que les mécréants ne te fassent glisser par leurs regards ») — tout en rappelant que rien ne peut nuire sans la permission d'Allāh et en enseignant de rechercher protection auprès d'Allāh et de prononcer des bénédictions (Al-Barakah).",
      en: "Abū Hurayrah and Ibn ‘Abbās narrated that the Messenger of Allāh ﷺ affirmed that the evil eye is real ('Al-‘aynu haqq')—echoing the hostile gazes described in this verse ('Those who disbelieve would almost make you slip with their eyes')—while teaching believers that nothing harms except by Allāh's leave and instructing them to seek refuge in Allāh.",
      es: "Abū Hurayrah e Ibn ‘Abbās relataron que el Profeta ﷺ confirmó la realidad del mal de ojo («Al-‘aynu haqq») —en alusión a las miradas envidiosas mencionadas en esta aleya—, recordando siempre que nada daña sin el permiso de Allah y enseñando a buscar refugio en Él.",
      ar: "عن أبي هريرة وابن عباس رضي الله عنهما أن النبي ﷺ أثبت حقيقة العين بقوله: «العين حق» — وهو ما يوافق ذكر نظرات الحسد في هذه الآية — مع بيان أن شيئًا لا يضر إلا بإذن الله والأمر بالاستعاذة والتبريك.",
      de: "Abū Hurayrah und Ibn ‘Abbās berichteten, dass der Gesandte Allahs ﷺ die Wirklichkeit des bösen Blicks („Al-‘aynu haqq“) bestätigte – passend zu den feindseligen Blicken in diesem Vers – und zugleich betonte, dass nichts ohne Allahs Erlaubnis schaden kann.",
      it: "Abū Hurayrah e Ibn ‘Abbās narrarono che il Profeta ﷺ confermò la realtà del malocchio («Al-‘aynu haqq») — in sintonia con gli sguardi ostili evocati in questo versetto — ricordando che nulla nuoce senza il permesso di Allāh e insegnando a chiedere la Sua protezione.",
      id: "Abu Hurairah dan Ibnu ‘Abbas meriwayatkan sabda Nabi ﷺ bahwa ‘ain (pandangan mata yang hasad) itu benar adanya — selaras dengan tatapan tajam kaum kafir pada ayat ini — sembari menegaskan bahwa tidak ada mudarat kecuali atas izin Allah serta anjuran memohon perlindungan kepada-Nya.",
      ru: "Абу Хурайра и Ибн ‘Аббас передали слова Пророка ﷺ о том, что сглаз — истина («аль-‘айну хакк»), что соотносится со злобными взглядами из этого аята, при неизменном напоминании, что ничто не вредит без воли Аллаха, и повелении прибегать к Его защите."
    }
  },
  "71:23": {
    type: "hadith",
    versets: ["71:23"],
    plage: "71:23",
    source: "Sahīh Al-Bukhārī n°4920",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) dévoile l'origine historique des cinq idoles mentionnées dans ce verset (Wadd, Suwā‘, Yaghūth, Ya‘ūq et Nasr) : c'étaient à l'origine les noms d'hommes vertueux du peuple de Nūh (Noé). Après leur décès, Satan insuffla à leurs contemporains d'ériger des statues portant leurs noms sur leurs lieux de réunion en guise de simple souvenir ; celles-ci ne furent pas adorées au début, mais lorsque cette génération disparut et que la science fut oubliée, les générations suivantes se mirent à les adorer en dehors d'Allāh.",
      en: "Ibn ‘Abbās explained the historical origin of the five idols named here (Wadd, Suwā‘, Yaghūth, Ya‘ūq, and Nasr): they were originally the names of righteous men among the people of Nūh (Noah). After their deaths, Satan inspired people to erect statues in their memory; they were not worshipped at first, but once that generation passed and knowledge faded, later generations began worshipping them alongside Allāh.",
      es: "Ibn ‘Abbās explicó el origen histórico de los cinco ídolos citados aquí (Wadd, Suwā‘, Yaghūth, Ya‘ūq y Nasr): eran originalmente nombres de hombres virtuosos del pueblo de Noé; tras su muerte se erigieron estatuas en su recuerdo y, al olvidarse el saber con las generaciones siguientes, acabaron siendo adoradas.",
      ar: "عن ابن عباس رضي الله عنهما في أصل الأصنام الخمسة (ودّ وسواع ويغوث ويعوق ونسر): كانت أسماء رجال صالحين من قوم نوح، فلما هلكوا أوحى الشيطان إلى قومهم أن انصبوا إلى مجالسهم أنصابًا وسمّوها بأسمائهم ففعلوا ولم تُعبد، حتى إذا هلك أولئك وتنسّخ العلم عُبدت من دون الله.",
      de: "Ibn ‘Abbās erläuterte den Ursprung der fünf hier genannten Götzen (Wadd, Suwā‘, Yaghūth, Ya‘ūq und Nasr): Ursprünglich waren dies Namen rechtschaffener Männer aus dem Volk Noahs, zu deren Gedenken Statuen errichtet wurden; als das Wissen in späteren Generationen schwand, begann man, sie anzubeten.",
      it: "Ibn ‘Abbās spiegò l'origine storica dei cinque idoli citati qui (Wadd, Suwā‘, Yaghūth, Ya‘ūq e Nasr): erano in origine nomi di uomini pii del popolo di Noè; dopo la loro morte furono erette statue in loro memoria che, dimenticata la scienza nelle generazioni successive, finirono per essere adorate.",
      id: "Ibnu ‘Abbas menjelaskan asal-usul lima berhala (Wadd, Suwa‘, Yaghuts, Ya‘uq, dan Nasr): awalnya itu adalah nama orang-orang saleh kaum Nabi Nuh; setelah wafat dibuatlah patung untuk mengenang mereka, lalu ketika generasi berilmu punah patung-patung itu mulai disembah.",
      ru: "Ибн ‘Аббас разъяснил происхождение пяти идолов (Вадд, Сува‘, Ягус, Я‘ук и Наср): первоначально это были имена праведников из народа Нуха; после их смерти в память о них поставили изваяния, а когда знание угасло в следующих поколениях, им стали поклоняться помимо Аллаха."
    }
  },
  "72:1": {
    type: "sabab",
    versets: ["72:1", "72:2"],
    plage: "72:1–2",
    source: "Sahīh Al-Bukhārī n°773, n°4921 & Sahīh Muslim n°449",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte qu'au début de la mission prophétique, lorsque les démons furent empêchés d'écouter aux portes du ciel par des étoiles filantes, ils parcoururent la terre d'est en ouest pour découvrir quel grand événement venait de survenir. Un groupe passant par Nakhlah entendit le Prophète ﷺ réciter le Coran durant la prière de l'aube : ils comprirent aussitôt que c'était là la cause de ce bouleversement, crurent au Coran et retournèrent avertir leur peuple — et Allāh révéla au Prophète ﷺ le début de cette sourate pour l'en informer.",
      en: "Ibn ‘Abbās narrated that when devils were blocked from eavesdropping on heaven by shooting stars, they searched the earth to learn what major event had occurred. A group passing through Nakhlah heard the Prophet ﷺ reciting the Qur'an in Fajr prayer, realized this was the cause, embraced faith immediately, and returned to warn their people—upon which Allāh revealed this opening to inform the Prophet ﷺ.",
      es: "Ibn ‘Abbās relató que al verse impedidos de espiar el cielo por meteoros, los genios recorrieron la tierra buscando la causa; un grupo pasó por Nakhlah, oyó al Profeta ﷺ recitar el Corán al alba, creyó al instante y regresó a advertir a los suyos, revelando Allah al Profeta ﷺ el inicio de esta sura.",
      ar: "عن ابن عباس رضي الله عنهما أنه لما حيل بين الشياطين وبين خبر السماء وأُرسلت عليهم الشهب، ضربوا مشارق الأرض ومغاربها يبحثون عن السبب، فمرّ نفر منهم بنخلة فسمعوا النبي ﷺ يقرأ القرآن في الفجر فآمنوا وعادوا لقومهم، فأنزل الله على نبيه ﷺ مطلع هذه السورة إخبارًا بذلك.",
      de: "Ibn ‘Abbās berichtete, dass die Dschinn die Erde durchstreiften, als Sternschnuppen das Belauschen des Himmels verhinderten; eine Gruppe hörte bei Nakhlah die Koranrezitation des Propheten ﷺ im Morgengebet, glaubte sofort und kehrte als Warner zu ihrem Volk zurück, worüber Allah den Propheten ﷺ in diesen Versen unterrichtete.",
      it: "Ibn ‘Abbās narrò che quando le stelle cadenti impedirono di origliare il cielo, i jinn perlustrarono la terra; un gruppo udì a Nakhlah il Profeta ﷺ recitare il Corano all'alba, credette subito e tornò ad ammonire il proprio popolo, e Allāh ne informò il Profeta ﷺ rivelando l'inizio di questa sura.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa ketika setan terhalang mencuri berita langit oleh panah-panah api, serombongan jin menjelajahi bumi lalu mendengar Nabi ﷺ membaca Al-Qur'an saat shalat Subuh di Nakhlah; mereka seketika beriman dan Allah mengabarkan peristiwa ini melalui awal surah ini.",
      ru: "Ибн ‘Аббас передал, что когда падающие звёзды преградили подслушивание небес, джинны разошлись по земле искать причину; группа из них в Нахле услышала чтение Корана Пророком ﷺ на утренней молитве, сразу уверовала и вернулась к своему народу, о чём Аллах возвестил Пророку ﷺ в начале этой суры."
    }
  },
  "73:20": {
    type: "sabab",
    versets: ["73:20"],
    plage: "73:20",
    source: "Sahīh Muslim n°746",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) rapporte qu'après la révélation du début de la Sourate Al-Muzzammil, le Prophète ﷺ et ses Compagnons accomplirent assidûment la prière nocturne (Qiyām al-layl) durant une année entière jusqu'à ce que leurs pieds enflent, tandis qu'Allāh retint la fin de la sourate pendant douze mois. Puis Allāh révéla ce verset final d'allègement, transformant la prière nocturne d'une obligation stricte en un acte surérogatoire volontaire selon la capacité de chacun.",
      en: "‘Ā’ishah narrated that after the opening of Sūrah Al-Muzzammil was revealed, the Prophet ﷺ and his Companions stood in night prayer (Qiyām al-layl) for an entire year until their feet swelled while Allāh held back the ending of the surah for twelve months. Then Allāh revealed this closing verse of mercy, easing night prayer from a strict obligation into a voluntary act according to one's ability.",
      es: "‘Ā’ishah relató que tras descender el inicio de Al-Muzzammil, el Profeta ﷺ y sus Compañeros mantuvieron la oración nocturna durante un año entero hasta hinchárseles los pies; luego Allah reveló esta última aleya de alivio, convirtiendo la oración nocturna de obligación estricta en acto voluntario.",
      ar: "عن عائشة رضي الله عنها أنه لما نزل أول سورة المزمل قام النبي ﷺ وأصحابه ليلهم حولًا كاملًا حتى انتفخت أقدامهم، وأمسك الله خاتمتها اثني عشر شهرًا، ثم أنزل الله التخفيف في هذه الآية الأخيرة فصار قيام الليل تطوعًا بعد أن كان فريضة.",
      de: "‘Ā’ishah berichtete, dass der Prophet ﷺ und seine Gefährten nach der Offenbarung des Beginns von Al-Muzzammil ein ganzes Jahr lang nachts beteten, bis ihre Füße anschwollen; zwölf Monate später offenbarte Allah diesen erleichternden Schlussvers und machte das Nachtgebet von einer Pflicht zu einer freiwilligen Handlung.",
      it: "‘Ā’ishah narrò che dopo l'inizio di Al-Muzzammil il Profeta ﷺ e i Compagni pregarono la notte per un anno intero fino ad avere i piedi gonfi; dodici mesi dopo Allāh rivelò questo versetto finale di alleviamento, trasformando la preghiera notturna da obbligo in atto volontario.",
      id: "‘Aisyah meriwayatkan bahwa setelah awal Surah Al-Muzzammil turun, Nabi ﷺ dan para sahabat mendirikan shalat malam selama setahun penuh hingga kaki mereka bengkak; dua belas bulan kemudian Allah menurunkan ayat penutup keringanan ini sehingga shalat malam menjadi sunnah.",
      ru: "‘Аиша передала, что после ниспослания начала суры «Аль-Муззаммиль» Пророк ﷺ и его сподвижники целый год выстаивали ночные молитвы до опухания ног; спустя двенадцать месяцев Аллах ниспослал этот облегчающий аят, сделав ночную молитву добровольной."
    }
  },
  "74:1": {
    type: "sabab",
    versets: ["74:1", "74:2", "74:3", "74:4", "74:5"],
    plage: "74:1–5",
    source: "Sahīh Al-Bukhārī n°4, n°4922, n°4925 & Sahīh Muslim n°161",
    degre: "Sahīh",
    texte: {
      fr: "Jābir ibn ‘Abdillāh (qu'Allāh les agrée) rapporte d'après le Prophète ﷺ qu'après la première pause de la Révélation (Fatrat al-Wahy), alors qu'il marchait, il entendit une voix venant du ciel : en levant les yeux, il aperçut le même Ange qui lui était apparu dans la grotte de Hirā', assis sur un siège entre le ciel et la terre. Saisi d'une vive frayeur, il rentra aussitôt chez lui en disant : « Enveloppez-moi ! Couvrez-moi ! » Allāh révéla alors ces cinq premiers versets (« Ô toi, le revêtu d'un manteau ! Lève-toi et avertis ! »), inaugurant la phase d'appel public et la reprise continue de la Révélation.",
      en: "Jābir ibn ‘Abdillāh narrated from the Prophet ﷺ that following the initial pause in Revelation, while walking he heard a voice from the sky and looked up to see the very Angel who had appeared to him in Hirā' seated on a throne between heaven and earth. Overwhelmed with awe, he rushed home saying 'Wrap me up! Cover me!'—whereupon Allāh revealed these opening five verses ('O you who covers himself, arise and warn!'), launching his public mission.",
      es: "Yābir ibn ‘Abdillāh relató del Profeta ﷺ que tras la primera pausa de la Revelación oyó una voz del cielo y vio al Ángel de Hirā' sentado entre el cielo y la tierra; sobrecogido regresó a casa pidiendo que lo cubrieran con un manto, y entonces Allah reveló estas cinco primeras aleyas («¡Oh el envuelto en su manto! Levántate y advierte»).",
      ar: "عن جابر بن عبد الله رضي الله عنهما عن النبي ﷺ أنه بعد فترة الوحي سمع صوتًا من السماء فرفع بصره فإذا الملك الذي جاءه بحراء جالس على كرسي بين السماء والأرض، فرُعب ورجع يقول: «زمّلوني دثّروني»، فأنزل الله هذه الآيات الخمس الأولى: ﴿يَا أَيُّهَا الْمُدَّثِّرُ * قُمْ فَأَنذِرْ﴾، ثم حمي الوحي وتتابع.",
      de: "Dschābir ibn ‘Abdillāh überlieferte vom Propheten ﷺ, dass er nach der ersten Offenbarungspause eine Stimme vom Himmel hörte und den Engel von Hirā' zwischen Himmel und Erde erblickte; erschüttert eilte er heim und bat, ihn einzuhüllen, worauf Allah diese ersten fünf Verse („O du Zugedeckter, steh auf und warne!“) offenbarte.",
      it: "Jābir ibn ‘Abdillāh narrò dal Profeta ﷺ che dopo la prima pausa della Rivelazione udì una voce dal cielo e vide l'Angelo di Hirā' assiso tra cielo e terra; scosso rientrò chiedendo di essere avvolto in un mantello, e Allāh rivelò questi cinque versetti («O avvolto nel mantello, alzati e ammonisci!»).",
      id: "Jabir bin ‘Abdillah meriwayatkan dari Nabi ﷺ bahwa seusai masa jeda wahyu beliau mendengar suara dari langit dan melihat Malaikat Jibril yang datang di Gua Hira duduk di kursi antara langit dan bumi; beliau pulang meminta diselimuti, lalu turunlah lima ayat pertama ini.",
      ru: "Джабир ибн ‘Абдуллах передал от Пророка ﷺ, что после первого перерыва в откровении он услышал голос с неба и увидел ангела из пещеры Хира на троне между небом и землёй; потрясённый, он вернулся домой со словами «Укройте меня!», и Аллах ниспослал эти пять первых аятов («О завернувшийся! Встань и увещевай!»)."
    }
  },
  "75:16": {
    type: "sabab",
    versets: ["75:16", "75:17", "75:18", "75:19"],
    plage: "75:16–19",
    source: "Sahīh Al-Bukhārī n°5, n°4927, n°4928 & Sahīh Muslim n°448",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte qu'au début de la mission, lorsque Jibrīl descendait avec la Révélation, le Messager d'Allāh ﷺ remuait précipitamment sa langue et ses lèvres par crainte d'en oublier le moindre mot. Allāh révéla alors ces quatre versets pour l'apaiser : « Ne remue pas ta langue pour hâter la récitation ; c'est à Nous qu'incombent son rassemblement dans ton cœur et sa récitation. » Dès lors, le Prophète ﷺ écoutait Jibrīl dans un silence recueilli puis récitait le Coran avec une parfaite maîtrise.",
      en: "Ibn ‘Abbās narrated that whenever Jibrīl brought Revelation, the Messenger of Allāh ﷺ used to move his tongue rapidly out of intense eagerness to memorize every word. Allāh then revealed these four verses reassuring him: 'Move not your tongue with it to hasten it; upon Us is its collection in your heart and its recitation.' Thereafter, he listened quietly until Jibrīl finished, then recited it effortlessly.",
      es: "Ibn ‘Abbās relató que al recibir la Revelación de Yibrīl, el Profeta ﷺ movía deprisa los labios temiendo olvidar alguna palabra; entonces Allah reveló estas cuatro aleyas tranquilizándolo y garantizando que Él mismo reuniría el Corán en su pecho y facilitaría su recitación.",
      ar: "عن ابن عباس رضي الله عنهما أن النبي ﷺ كان يعالج من التنزيل شدة وكان يحرّك به شفتيه ولسانه حرصًا على حفظه، فأنزل الله هذه الآيات الأربع طمأنةً له بأن الله تكفّل بجمعه في صدره وتيسير قراءته وبيانه، فكان بعد ذلك يستمع لجبريل صامتًا ثم يقرؤه كما أقرأه.",
      de: "Ibn ‘Abbās berichtete, dass der Prophet ﷺ bei der Offenbarung eilig die Lippen bewegte, aus Sorge, etwas zu vergessen; daraufhin offenbarte Allah diese vier Verse mit der Zusage, den Koran selbst in seinem Herzen zu bewahren, sodass er fortan still zuhörte und ihn mühelos rezitierte.",
      it: "Ibn ‘Abbās narrò che quando Jibrīl portava la Rivelazione, il Profeta ﷺ muoveva rapidamente le labbra per timore di dimenticare una parola; Allāh rivelò allora questi quattro versetti rassicurandolo che Egli stesso avrebbe custodito il Corano nel suo cuore.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa setiap kali Jibril membawa wahyu, Nabi ﷺ menggerakkan lidahnya dengan cepat karena takut lupa; maka Allah menurunkan empat ayat ini untuk menenangkan bahwa Allah sendiri yang menjamin pengumpulan dan pembacaannya di dada beliau.",
      ru: "Ибн ‘Аббас передал, что при получении откровения от Джибриля Пророк ﷺ поспешно шевелил языком и губами из опасения забыть хоть слово; тогда Аллах ниспослал эти четыре аята, заверив, что Сам соберёт Коран в его сердце и облегчит чтение."
    }
  },
  "75:22": {
    type: "hadith",
    versets: ["75:22", "75:23"],
    plage: "75:22–23",
    source: "Sahīh Al-Bukhārī n°7434, n°7435 & Sahīh Muslim n°182, n°633",
    degre: "Sahīh",
    texte: {
      fr: "Jarīr ibn ‘Abdillāh et Abū Hurayrah (qu'Allāh les agrée) rapportent que le Messager d'Allāh ﷺ confirma de manière explicite la réalité de la vision béatifique promise dans ces deux versets (« Ce jour-là, il y aura des visages resplendissants, qui regarderont vers leur Seigneur ») : les croyants contempleront leur Seigneur au Paradis avec une clarté parfaite, sans aucune peine ni bousculade, à l'image de la pleine lune dans un ciel sans nuage.",
      en: "Jarīr ibn ‘Abdillāh and Abū Hurayrah narrated that the Messenger of Allāh ﷺ explicitly confirmed the beatific vision promised in these two verses ('Faces that Day will be radiant, looking at their Lord'): the believers will gaze upon their Lord in Paradise with utter clarity, as clearly as seeing the full moon on a cloudless night.",
      es: "Yarīr ibn ‘Abdillāh y Abū Hurayrah relataron que el Profeta ﷺ confirmó explícitamente la visión beatífica prometida en estas dos aleyas: los creyentes contemplarán a su Señor en el Paraíso con total claridad, sin dificultad alguna, como se contempla la luna llena en una noche despejada.",
      ar: "عن جرير بن عبد الله وأبي هريرة رضي الله عنهما أن النبي ﷺ أكّد بوضوح حقيقة رؤية المؤمنين لربهم في الجنة الموعودة في هاتين الآيتين، وأنهم يرونه سبحانه رؤيةً واضحة لا يُضامّون فيها كما يُرى القمر ليلة البدر ليس دونه سحاب.",
      de: "Dscharīr ibn ‘Abdillāh und Abū Hurayrah berichteten, dass der Gesandte Allahs ﷺ die in diesen Versen verheißene Schau Allahs im Paradies ausdrücklich bestätigte: Die Gläubigen werden ihren Herrn so klar sehen wie den Vollmond in einer wolkenlosen Nacht.",
      it: "Jarīr ibn ‘Abdillāh e Abū Hurayrah narrarono che il Profeta ﷺ confermò esplicitamente la visione beatifica promessa in questi versetti: i credenti contempleranno il loro Signore in Paradiso con piena chiarezza, come la luna piena in una notte limpida.",
      id: "Jarir bin ‘Abdillah dan Abu Hurairah meriwayatkan penegasan Nabi ﷺ atas nikmat melihat wajah Allah yang dijanjikan dua ayat ini: kaum mukminin akan memandang Tuhan mereka di Surga dengan sangat jelas seperti melihat bulan purnama di malam tak berawan.",
      ru: "Джарир ибн ‘Абдуллах и Абу Хурайра передали, что Пророк ﷺ прямо подтвердил обещанное в этих аятах лицезрение Аллаха в Раю: верующие увидят своего Господа столь же ясно, как полную луну на безоблачном небе."
    }
  },
  "77:1": {
    type: "sabab",
    versets: ["77:1", "77:2", "77:3", "77:4", "77:5", "77:6", "77:7"],
    plage: "77:1–7",
    source: "Sahīh Al-Bukhārī n°4930 & Sahīh Muslim n°2234",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd (qu'Allāh l'agrée) raconte les circonstances précises de la descente de cette sourate : « Alors que nous étions avec le Messager d'Allāh ﷺ dans une grotte à Minā, la Sourate Al-Mursalāt lui fut révélée ; je la recueillais directement de sa bouche alors qu'elle était toute fraîche, lorsqu'un serpent surgit soudainement vers nous ! Le Prophète ﷺ ordonna : “Tuez-le !”, mais il se glissa dans son trou avant que nous ne l'atteignions, et le Prophète ﷺ dit : “Il a été préservé de votre mal, comme vous avez été préservés du sien.” »",
      en: "‘Abdullāh ibn Mas‘ūd recounted the exact moment this surah descended: 'While we were with the Messenger of Allāh ﷺ in a cave at Minā, Sūrah Al-Mursalāt was revealed to him, and I was learning it fresh from his lips when a snake suddenly emerged! The Prophet ﷺ said “Kill it,” but it slipped into its hole, and he remarked: “It has been saved from your harm just as you have been saved from its harm.”'",
      es: "‘Abdullāh ibn Mas‘ūd relató el momento preciso de esta revelación: estando con el Profeta ﷺ en una cueva de Minā descendió la Sura Al-Mursalāt y él la aprendía recién recitada de sus labios cuando apareció una serpiente que logró escapar, comentando el Profeta ﷺ que ambos habían quedado a salvo el uno del otro.",
      ar: "عن عبد الله بن مسعود رضي الله عنه قال: «بينما نحن مع رسول الله ﷺ في غار بمنى إذ نزلت عليه سورة المرسلات، وإنه ليتلوها وإني لأتلقاها من فيه وإن فاه لرطب بها، إذ وثبت علينا حية فقال النبي ﷺ: اقتلوها، فسبقناها إلى جحرها فقال ﷺ: وُقيت شركم كما وُقيتم شرها».",
      de: "‘Abdullāh ibn Mas‘ūd schilderte den genauen Augenblick dieser Offenbarung: In einer Höhle bei Minā empfing der Prophet ﷺ Sure Al-Mursalāt, während Ibn Mas‘ūd sie frisch von seinen Lippen lernte, als plötzlich eine Schlange hervorkam und wieder entkam, worauf der Prophet ﷺ sagte, beide Seiten seien voreinander bewahrt worden.",
      it: "‘Abdullāh ibn Mas‘ūd narrò il momento preciso della discesa di questa sura: trovandosi con il Profeta ﷺ in una grotta a Minā, gli fu rivelata Al-Mursalāt e la apprendeva fresca dalle sue labbra quando spuntò un serpente che fuggì via, e il Profeta ﷺ osservò che entrambi erano stati preservati dal male reciproco.",
      id: "‘Abdullah bin Mas‘ud menuturkan momen turunnya surah ini: ketika bersama Nabi ﷺ di sebuah gua di Mina, Surah Al-Mursalat turun dan ia langsung menghafalnya dari lisan beliau saat seekor ular tiba-tiba muncul lalu melesat kabur; Nabi ﷺ bersabda bahwa ular itu selamat dari mereka sebagaimana mereka selamat darinya.",
      ru: "‘Абдуллах ибн Мас‘уд рассказал о моменте ниспослания этой суры: когда они были с Пророком ﷺ в пещере в Мине, была ниспослана сура «Аль-Мурсалят», и он заучивал её прямо с уст Пророка ﷺ, как вдруг выползла змея и скрылась в норе, а Пророк ﷺ сказал, что они и она были убережены от вреда друг друга."
    }
  }
};

// Auto-contrôle strict avant écriture (8 langues + champs obligatoires)
const LANGUES_REQ = ['fr', 'en', 'es', 'ar', 'de', 'it', 'id', 'ru'];
for (const [cle, rec] of Object.entries(LOT_10_SAFF_MURSALAT)) {
  if (!rec.type || !rec.source || !rec.degre || !Array.isArray(rec.versets) || !rec.texte) {
    throw new Error(`Structure invalide pour ${cle}`);
  }
  for (const lg of LANGUES_REQ) {
    if (!rec.texte[lg] || typeof rec.texte[lg] !== 'string' || rec.texte[lg].trim().length < 20) {
      throw new Error(`Texte manquant ou trop court pour ${cle} [${lg}]`);
    }
  }
}

Object.assign(data.recits, LOT_10_SAFF_MURSALAT);
data.version = (data.version || 1) + 1;

const jsonFinal = JSON.stringify(data, null, 2);
JSON.parse(jsonFinal);
writeSafe(asbabPath, jsonFinal);

let worker = fs.readFileSync(workerPath, 'utf8');
worker = worker.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
writeSafe(workerPath, worker);

const nbRecits = Object.keys(data.recits).length;
const nbVersets = Object.values(data.recits).reduce((acc, r) => acc + (Array.isArray(r.versets) ? r.versets.length : 1), 0);
console.log(`✅ Lot 10 (Sourates 61 à 77) validé et intégré ! Total actuel : ${nbRecits} récits couvrant ${nbVersets} versets en 8 langues.`);
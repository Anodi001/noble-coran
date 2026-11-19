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

const LOT_09_FATH_HASHR = {
  "48:1": {
    type: "sabab",
    versets: ["48:1", "48:2"],
    plage: "48:1–2",
    source: "Sahīh Al-Bukhārī n°4177, n°4833 & Sahīh Muslim n°1786",
    degre: "Sahīh",
    texte: {
      fr: "‘Umar ibn Al-Khattāb et Anas ibn Mālik (qu'Allāh les agrée) rapportent que la Sourate Al-Fath fut révélée sur le chemin du retour d'Al-Hudaybiyah (an 6 de l'Hégire), alors que certains Compagnons éprouvaient de la tristesse face aux clauses apparentes du traité de paix. Le Messager d'Allāh ﷺ annonça avec joie à ‘Umar : « Cette nuit m'a été révélée une sourate qui m'est plus chère que tout ce sur quoi se lève le soleil ! », qualifiant la trêve d'Al-Hudaybiyah de « victoire éclatante » (Fathan mubīnan).",
      en: "‘Umar ibn Al-Khattāb and Anas ibn Mālik narrated that Sūrah Al-Fath was revealed on the return journey from Al-Hudaybiyah (6 AH), while some Companions felt saddened by the treaty's outward terms. The Messenger of Allāh ﷺ joyfully told ‘Umar: 'Tonight a surah has been revealed to me that is dearer to me than everything upon which the sun rises!'—calling the truce of Al-Hudaybiyah a 'clear victory.'",
      es: "‘Umar ibn Al-Khattāb y Anas ibn Mālik relataron que la Sura Al-Fath descendió al regresar de Al-Hudaybiyah (año 6 H.), cuando algunos Compañeros sentían tristeza por las cláusulas aparentes del pacto. El Profeta ﷺ anunció alegremente a ‘Umar que esa noche le había sido revelada una sura más querida para él que cuanto ilumina el sol.",
      ar: "عن عمر بن الخطاب وأنس بن مالك رضي الله عنهما أن سورة الفتح نزلت في طريق العودة من صلح الحديبية (سنة ٦ هـ) حين حزن بعض الصحابة من ظاهر شروط الصلح، فبشّر النبي ﷺ عمر قائلًا: «لقد أُنزلت عليّ الليلة سورة لهي أحب إليّ مما طلعت عليه الشمس»، وسمّى الله صلح الحديبية فتحًا مبينًا.",
      de: "‘Umar ibn Al-Khattāb und Anas ibn Mālik berichteten, dass Sure Al-Fath auf dem Rückweg von Al-Hudaybiyah (6 n. H.) offenbart wurde, als einige Gefährten über die Bedingungen des Vertrags betrübt waren. Der Prophet ﷺ sagte erfreut zu ‘Umar: „Mir wurde heute Nacht eine Sure offenbart, die mir lieber ist als alles, worüber die Sonne aufgeht!“",
      it: "‘Umar ibn Al-Khattāb e Anas ibn Mālik narrarono che Sura Al-Fath fu rivelata sulla via del ritorno da Al-Hudaybiyah (anno 6 E.), mentre alcuni Compagni erano rattristati dai termini apparenti del patto. Il Profeta ﷺ annunciò con gioia a ‘Umar che quella notte gli era scesa una sura più cara di tutto ciò su cui sorge il sole.",
      id: "‘Umar bin Al-Khaththab dan Anas bin Malik meriwayatkan bahwa Surah Al-Fath turun dalam perjalanan pulang dari Perjanjian Hudaibiyah (6 H) ketika sebagian sahabat bersedih melihat syarat perjanjian. Nabi ﷺ dengan gembira mengabarkan kepada ‘Umar bahwa malam itu turun surah yang lebih beliau cintai daripada seluruh dunia dan isinya.",
      ru: "‘Умар ибн аль-Хаттаб и Анас ибн Малик передали, что сура «Аль-Фатх» была ниспослана на обратном пути из аль-Худайбии (6 г. хиджры), когда некоторые сподвижники опечалились условиями договора. Пророк ﷺ радостно сказал ‘Умару: «Этой ночью мне была ниспослана сура, которая дороже для меня всего, над чем восходит солнце!»"
    }
  },
  "48:18": {
    type: "sabab",
    versets: ["48:18", "48:19"],
    plage: "48:18–19",
    source: "Sahīh Al-Bukhārī n°4154, n°4839 & Sahīh Muslim n°1856",
    degre: "Sahīh",
    texte: {
      fr: "Jābir ibn ‘Abdillāh (qu'Allāh les agrée) rapporte que ce verset fut révélé au sujet des quelque mille quatre cents Compagnons qui prêtèrent le Serment d'Agrément (Bay‘at ar-Ridwān) au Prophète ﷺ sous un arbre à Al-Hudaybiyah, lorsque courut la rumeur de l'assassinat de ‘Uthmān ibn ‘Affān envoyé comme émissaire à La Mecque. Le Prophète ﷺ annonça que nul parmi ceux qui avaient prêté ce serment sous l'arbre n'entrerait en Enfer.",
      en: "Jābir ibn ‘Abdillāh narrated that this verse was revealed regarding the roughly fourteen hundred Companions who pledged allegiance to the Prophet ﷺ under the tree at Al-Hudaybiyah (Bay‘at ar-Ridwān) upon hearing a rumor that ‘Uthmān ibn ‘Affān had been killed in Makkah. The Prophet ﷺ announced that none of those who gave that pledge under the tree would enter Hellfire.",
      es: "Yābir ibn ‘Abdillāh relató que esta aleya fue revelada respecto a los cerca de mil cuatrocientos Compañeros que prestaron el Juramento de Complacencia (Bay‘at ar-Ridwān) bajo el árbol en Al-Hudaybiyah, anunciando el Profeta ﷺ que ninguno de ellos entraría en el Fuego.",
      ar: "عن جابر بن عبد الله رضي الله عنهما أن هذه الآية نزلت في قرابة ألف وأربعمائة صحابي بايعوا النبي ﷺ تحت الشجرة بالحديبية (بيعة الرضوان) حين شاع خبر مقتل عثمان بن عفان رضي الله عنه، وبشّرهم النبي ﷺ بأنه لن يدخل النار أحد ممن بايع تحت الشجرة.",
      de: "Dschābir ibn ‘Abdillāh berichtete, dass dieser Vers über die rund eintausendvierhundert Gefährten offenbart wurde, die dem Propheten ﷺ bei Al-Hudaybiyah unter dem Baum den Treueeid (Bay‘at ar-Ridwān) leisteten; der Prophet ﷺ verkündete, dass niemand von ihnen ins Höllenfeuer eingehen werde.",
      it: "Jābir ibn ‘Abdillāh narrò che questo versetto fu rivelato riguardo ai circa millequattrocento Compagni che prestarono il Giuramento del Compiacimento (Bay‘at ar-Ridwān) sotto l'albero ad Al-Hudaybiyah; il Profeta ﷺ annunciò che nessuno di loro sarebbe entrato nel Fuoco.",
      id: "Jabir bin ‘Abdillah meriwayatkan bahwa ayat ini turun berkenaan dengan sekitar seribu empat ratus sahabat yang berbaiat kepada Nabi ﷺ di bawah pohon di Hudaibiyah (Bai‘atur Ridhwan), dan Nabi ﷺ memberi kabar gembira bahwa tak seorang pun dari mereka akan masuk neraka.",
      ru: "Джабир ибн ‘Абдуллах передал, что этот аят был ниспослан о примерно тысяче четырёхстах сподвижниках, принесших присягу Довольства (Бай‘ат ар-Ридван) Пророку ﷺ под деревом в аль-Худайбии; Пророк ﷺ возвестил, что никто из присягнувших под деревом не войдёт в Огонь."
    }
  },
  "48:24": {
    type: "sabab",
    versets: ["48:24"],
    plage: "48:24",
    source: "Sahīh Muslim n°1808",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik (qu'Allāh l'agrée) rapporte qu'à Al-Hudaybiyah, quatre-vingts hommes armés descendirent du mont At-Tan‘īm vers le camp musulman à l'heure de la prière de l'aube dans l'intention de tuer le Prophète ﷺ et ses Compagnons. Ils furent capturés sans combat ; le Messager d'Allāh ﷺ fit preuve de clémence en leur laissant la vie sauve et en les libérant, et Allāh révéla ce verset rappelant qu'Il avait retenu leurs mains les uns des autres au cœur de la vallée de La Mecque.",
      en: "Anas ibn Mālik narrated that at Al-Hudaybiyah, eighty armed men descended from Mount At-Tan‘īm toward the Muslim camp at Fajr intending to ambush the Prophet ﷺ and his Companions. They were captured peacefully, and the Messenger of Allāh ﷺ pardoned and released them, upon which Allāh revealed this verse reminding them how He withheld both sides' hands in the valley of Makkah.",
      es: "Anas ibn Mālik relató que en Al-Hudaybiyah ochenta hombres armados bajaron del monte At-Tan‘īm al alba para emboscar al Profeta ﷺ, pero fueron capturados sin derramamiento de sangre y el Profeta ﷺ los perdonó y liberó, revelándose entonces esta aleya.",
      ar: "عن أنس بن مالك رضي الله عنه أن ثمانين رجلًا من أهل مكة هبطوا من جبل التنعيم متسلحين عند صلاة الفجر يريدون غرّة النبي ﷺ وأصحابه فأُخذوا سلمًا، فاستحياهم النبي ﷺ وعفا عنهم وأطلقهم، فأنزل الله هذه الآية في كفّ الأيدي ببطن مكة.",
      de: "Anas ibn Mālik berichtete, dass achtzig bewaffnete Männer bei Al-Hudaybiyah im Morgengrauen vom Berg At-Tan‘īm herabstiegen, um den Propheten ﷺ zu überfallen; sie wurden kampflos gefasst und vom Propheten ﷺ begnadigt und freigelassen, woraufhin Allah diesen Vers offenbarte.",
      it: "Anas ibn Mālik narrò che ad Al-Hudaybiyah ottanta uomini armati scesero dal monte At-Tan‘īm all'alba per tendere un agguato al Profeta ﷺ; furono catturati pacificamente e il Profeta ﷺ li graziò e li liberò, e Allāh rivelò questo versetto.",
      id: "Anas bin Malik meriwayatkan bahwa di Hudaibiyah delapan puluh orang bersenjata turun dari Bukit Tan‘im saat Subuh untuk menyergap Nabi ﷺ, namun berhasil ditangkap tanpa pertumpahan darah lalu dibebaskan oleh Nabi ﷺ, maka turunlah ayat ini.",
      ru: "Анас ибн Малик передал, что в аль-Худайбии восемьдесят вооружённых мекканцев спустились на рассвете с горы ат-Тан‘им, чтобы напасть на Пророка ﷺ; их взяли в плен без боя, Пророк ﷺ помиловал и отпустил их, и Аллах ниспослал этот аят."
    }
  },
  "49:1": {
    type: "sabab",
    versets: ["49:1", "49:2", "49:3"],
    plage: "49:1–3",
    source: "Sahīh Al-Bukhārī n°4845, n°4846, n°4847 & Sahīh Muslim n°119",
    degre: "Sahīh",
    texte: {
      fr: "Ibn Az-Zubayr rapporte qu'à l'arrivée de la délégation des Banū Tamīm, Abū Bakr et ‘Umar divergèrent sur l'homme à nommer à leur tête et leurs voix s'élevèrent en présence du Prophète ﷺ, ce qui entraîna la révélation de ces versets ordonnant de ne jamais devancer Allāh et Son Messager ni d'élever la voix au-dessus de la sienne. Anas ibn Mālik ajoute que Thābit ibn Qays, qui avait naturellement une voix très puissante, s'enferma chez lui en pleurant par crainte que ses œuvres ne soient annulées ; le Prophète ﷺ lui fit alors annoncer qu'il faisait partie des gens du Paradis.",
      en: "Ibn Az-Zubayr narrated that when the Banū Tamīm delegation arrived, Abū Bakr and ‘Umar disagreed over who should be appointed leader and raised their voices before the Prophet ﷺ, prompting these verses commanding utmost reverence. Anas ibn Mālik added that Thābit ibn Qays—who had a naturally loud voice—stayed home weeping out of fear his deeds were voided, until the Prophet ﷺ sent him glad tidings that he was among the people of Paradise.",
      es: "Ibn Az-Zubayr relató que al llegar la delegación de Banū Tamīm, Abū Bakr y ‘Umar alzaron la voz discrepando ante el Profeta ﷺ, descendiendo estas aleyas sobre el máximo respeto hacia él. Anas añadió que Thābit ibn Qays, de voz naturalmente potente, temió haber perdido sus obras hasta que el Profeta ﷺ le dio la buena nueva del Paraíso.",
      ar: "عن ابن الزبير أنه لما قدم وفد بني تميم اختلف أبو بكر وعمر فيمن يُؤمّر عليهم وارتفعت أصواتهما عند النبي ﷺ فنزلت هذه الآيات في الأدب معه ﷺ؛ وزاد أنس بن مالك أن ثابت بن قيس كان جهوري الصوت فجلس في بيته يبكي خشية حبوط عمله، فبشّره النبي ﷺ بأنه من أهل الجنة.",
      de: "Ibn Az-Zubayr berichtete, dass Abū Bakr und ‘Umar beim Eintreffen der Delegation der Banū Tamīm vor dem Propheten ﷺ ihre Stimmen erhoben, worauf diese Verse über die Ehrerbietung offenbart wurden. Anas ergänzte, dass der von Natur aus lautstarke Thābit ibn Qays weinend zu Hause blieb, bis der Prophet ﷺ ihm das Paradies verhieß.",
      it: "Ibn Az-Zubayr narrò che all'arrivo della delegazione dei Banū Tamīm, Abū Bakr e ‘Umar alzarono la voce davanti al Profeta ﷺ, provocando la rivelazione di questi versetti sul rispetto dovutogli. Anas aggiunse che Thābit ibn Qays, di voce naturalmente forte, pianse in casa finché il Profeta ﷺ gli annunciò il Paradiso.",
      id: "Ibnu Az-Zubair meriwayatkan bahwa saat delegasi Bani Tamim datang, suara Abu Bakar dan ‘Umar meninggi di hadapan Nabi ﷺ sehingga turun ayat-ayat adab ini. Anas menambahkan bahwa Tsabit bin Qais yang bersuara lantang mengurung diri menangis karena takut amalnya gugur, lalu Nabi ﷺ memberinya kabar gembira sebagai penghuni Surga.",
      ru: "Ибн аз-Зубайр передал, что при прибытии делегации Бану Тамим Абу Бакр и ‘Умар повысили голоса в присутствии Пророка ﷺ, после чего были ниспосланы эти аяты о почтении к нему. Анас добавил, что Сабит ибн Кайс, обладавший от природы громким голосом, заплакал дома из страха за свои деяния, но Пророк ﷺ обрадовал его вестью о Рае."
    }
  },
  "49:9": {
    type: "sabab",
    versets: ["49:9"],
    plage: "49:9",
    source: "Sahīh Al-Bukhārī n°2691 & Sahīh Muslim n°1799",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik (qu'Allāh l'agrée) rapporte qu'un jour, alors que le Prophète ﷺ se rendait à dos d'âne pour rendre visite à ‘Abdullāh ibn Ubayy, une vive altercation éclata entre les partisans d'Ibn Ubayy et des Compagnons au point qu'ils se frappèrent avec des branches de palmier et des sandales. Ce verset fut révélé à cette occasion pour établir le devoir impératif de réconciliation équitable dès qu'un conflit éclate entre deux groupes de croyants.",
      en: "Anas ibn Mālik narrated that when the Prophet ﷺ rode to visit ‘Abdullāh ibn Ubayy, a heated altercation broke out between Ibn Ubayy's followers and some Companions, exchanging blows with palm branches and sandals. This verse was revealed establishing the imperative duty of fair reconciliation whenever conflict arises between two groups of believers.",
      es: "Anas ibn Mālik relató que durante una visita del Profeta ﷺ a ‘Abdullāh ibn Ubayy estalló una riña entre partidarios de este y algunos Compañeros, revelándose esta aleya que ordena reconciliar con justicia a dos grupos enfrentados de creyentes.",
      ar: "عن أنس بن مالك رضي الله عنه أنه لما ركب النبي ﷺ حمارًا ليعود عبد الله بن أُبيّ وقعت مشاجرة بالأيدي والجريد والنعال بين بعض الصحابة وقوم ابن أُبيّ، فبلغنا أن هذه الآية نزلت في وجوب الإصلاح بالعدل بين الفئتين المتقاتلتين.",
      de: "Anas ibn Mālik berichtete, dass bei einem Besuch des Propheten ﷺ bei ‘Abdullāh ibn Ubayy ein handfester Streit zwischen dessen Anhängern und einigen Gefährten ausbrach, woraufhin dieser Vers über die Pflicht zur gerechten Versöhnung zwischen zerstrittenen Gläubigen offenbart wurde.",
      it: "Anas ibn Mālik narrò che durante una visita del Profeta ﷺ ad ‘Abdullāh ibn Ubayy scoppiò un alterco tra i sostenitori di quest'ultimo e alcuni Compagni; fu quindi rivelato questo versetto che impone la riconciliazione equa tra credenti in conflitto.",
      id: "Anas bin Malik meriwayatkan bahwa saat Nabi ﷺ mengunjungi ‘Abdullah bin Ubay terjadi pertikaian fisik antara pengikutnya dan beberapa sahabat, lalu turunlah ayat yang mewajibkan pendamaian secara adil antara dua golongan mukmin yang bertikai.",
      ru: "Анас ибн Малик передал, что во время визита Пророка ﷺ к ‘Абдуллаху ибн Убайю между его сторонниками и сподвижниками вспыхнула стычка, и по этому случаю был ниспослан данный аят о долге справедливого примирения между враждующими группами верующих."
    }
  },
  "49:11": {
    type: "sabab",
    versets: ["49:11"],
    plage: "49:11",
    source: "Sunan Abī Dāwūd n°4962 & Sunan At-Tirmidhī n°3268",
    degre: "Sahīh",
    texte: {
      fr: "Abū Jabīrah ibn Ad-Dahhāk (qu'Allāh l'agrée) rapporte qu'à l'arrivée du Messager d'Allāh ﷺ à Médine, la plupart des Ansār portaient deux ou trois noms et surnoms. Un jour, le Prophète ﷺ interpella un homme par l'un de ces surnoms, et les gens l'avertirent aussitôt : « Ô Messager d'Allāh, il déteste qu'on l'appelle ainsi ! » Allāh révéla alors ce verset interdisant les moqueries, les médisances et le fait d'affubler autrui de sobriquets blessants.",
      en: "Abū Jabīrah ibn Ad-Dahhāk narrated that when the Messenger of Allāh ﷺ arrived in Madinah, many Ansār had two or three nicknames. Once he called a man by a nickname, and people told him: 'O Messenger of Allāh, he dislikes that name!' Allāh then revealed this verse forbidding mockery and calling one another by offensive nicknames.",
      es: "Abū Yabīrah relató que al llegar el Profeta ﷺ a Medina muchos habitantes tenían varios apodos; al llamar una vez a un hombre por un apodo que le disgustaba, los presentes se lo advirtieron y Allah reveló esta aleya prohibiendo las burlas y los motes ofensivos.",
      ar: "عن أبي جبيرة بن الضحاك رضي الله عنه أنه لما قدم النبي ﷺ المدينة كان للرجل من الأنصار الاسمان والثلاثة، فدعا النبي ﷺ رجلًا بأحد ألقابه فقيل له: يا رسول الله إنه يكره هذا الاسم! فنزلت هذه الآية في تحريم السخرية والتنابز بالألقاب.",
      de: "Abū Dschabīrah berichtete, dass bei der Ankunft des Propheten ﷺ in Medina viele Menschen mehrere Spitznamen trugen; als er jemanden versehentlich mit einem ungeliebten Beinamen rief, wurde dieser Vers offenbart, der Spott und verletzende Spitznamen verbietet.",
      it: "Abū Jabīrah narrò che all'arrivo del Profeta ﷺ a Medina molti avevano vari soprannomi; avendo chiamato un uomo con un nomignolo che questi non gradiva, Allāh rivelò questo versetto che vieta lo scherno e i soprannomi offensivi.",
      id: "Abu Jabirah meriwayatkan bahwa setibanya Nabi ﷺ di Madinah banyak warga memiliki beberapa gelar; ketika beliau memanggil seseorang dengan julukan yang tidak disukainya, turunlah ayat larangan saling mengejek dan memanggil dengan gelar buruk.",
      ru: "Абу Джабира передал, что по прибытии Пророка ﷺ в Медину у многих жителей было по несколько прозвищ; когда он позвал одного человека прозвищем, которое тому не нравилось, Аллах ниспослал этот аят, запретив насмешки и обидные клички."
    }
  },
  "50:30": {
    type: "hadith",
    versets: ["50:30"],
    plage: "50:30",
    source: "Sahīh Al-Bukhārī n°4848, n°4849 & Sahīh Muslim n°2846",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik et Abū Hurayrah rapportent que le Messager d'Allāh ﷺ commenta ce dialogue au Jour du Jugement : l'Enfer ne cessera d'absorber ses damnés en répétant « Y en a-t-il encore davantage ? » jusqu'à ce que le Seigneur de la Majesté pose Son Pied sur lui ; il se repliera alors aussitôt sur lui-même en s'écriant : « Assez ! Assez ! Par Ta Puissance et Ta Générosité ! » Tandis que le Paradis gardera encore de la place libre jusqu'à ce qu'Allāh crée des êtres pour l'habiter.",
      en: "Anas ibn Mālik and Abū Hurayrah narrated that the Messenger of Allāh ﷺ explained this Judgment Day dialogue: Hellfire will keep asking 'Are there any more?' until the Lord of Majesty places His Foot over it, whereupon it will contract and cry 'Enough! Enough!'—whereas Paradise will still have abundant space remaining.",
      es: "Anas ibn Mālik y Abū Hurayrah relataron la explicación del Profeta ﷺ sobre este diálogo del Día del Juicio: el Infierno seguirá preguntando «¿Hay más?» hasta que el Señor de la Majestad ponga Su Pie sobre él y exclame «¡Basta, basta!», mientras que en el Paraíso sobrará espacio.",
      ar: "عن أنس بن مالك وأبي هريرة رضي الله عنهما أن النبي ﷺ بيّن أن جهنم لا تزال تقول «هل من مزيد» حتى يضع رب العزة عليها قدمه فينزوي بعضها إلى بعض وتقول: «قط قط بعزتك وكرمك»، بينما يبقى في الجنة فضلٌ وسعة.",
      de: "Anas ibn Mālik und Abū Hurayrah berichteten die Erklärung des Propheten ﷺ zu diesem Dialog am Jüngsten Tag: Die Hölle wird immer wieder fragen „Gibt es noch mehr?“, bis der Herr der Erhabenheit Seinen Fuß auf sie setzt und sie „Genug, genug!“ ruft, während im Paradies stets reichlich Raum bleibt.",
      it: "Anas ibn Mālik e Abū Hurayrah narrarono la spiegazione del Profeta ﷺ su questo dialogo del Giorno del Giudizio: l'Inferno continuerà a chiedere «Ce ne sono ancora?» finché il Signore della Maestà porrà il Suo Piede su di esso ed esclamerà «Basta, basta!», mentre il Paradiso conserverà ampio spazio.",
      id: "Anas bin Malik dan Abu Hurairah meriwayatkan penjelasan Nabi ﷺ atas dialog Hari Kiamat ini: Neraka terus bertanya “Masih adakah tambahan?” hingga Allah meletakkan kaki-Nya di atasnya lalu ia berseru “Cukup, cukup!”, sedangkan di Surga masih tersisa ruang luas.",
      ru: "Анас ибн Малик и Абу Хурайра передали разъяснение Пророка ﷺ об этом диалоге Судного дня: Ад будет спрашивать «Нет ли ещё добавки?», пока Господь Величия не наступит на него Своей Стопой, и тогда он сожмётся и воскликнет «Довольно, довольно!», тогда как в Раю останется простор."
    }
  },
  "52:35": {
    type: "hadith",
    versets: ["52:35", "52:36", "52:37"],
    plage: "52:35–37",
    source: "Sahīh Al-Bukhārī n°4854",
    degre: "Sahīh",
    texte: {
      fr: "Jubayr ibn Mut‘im (qu'Allāh l'agrée) raconte qu'alors qu'il était encore polythéiste (venu à Médine négocier la rançon des captifs de Badr), il entendit le Messager d'Allāh ﷺ réciter la Sourate At-Tūr durant la prière du Maghrib. Lorsque le Prophète ﷺ parvint à ces trois questions rationnelles bouleversantes (« Ont-ils été créés à partir de rien, ou sont-ils eux-mêmes les créateurs ? »), Jubayr avoua : « Mon cœur a failli s'envoler ! » — et ce fut la toute première fois que la foi s'enracina dans son cœur.",
      en: "Jubayr ibn Mut‘im narrated that while still a polytheist visiting Madinah regarding the captives of Badr, he heard the Messenger of Allāh ﷺ reciting Sūrah At-Tūr during Maghrib prayer. When he reached these piercing rational questions ('Or were they created by nothing, or were they the creators of themselves?'), Jubayr said: 'My heart nearly took flight!'—the first moment faith entered his heart.",
      es: "Yubayr ibn Mut‘im relató que siendo aún politeísta escuchó al Profeta ﷺ recitar la Sura At-Tūr en la oración del Maghrib; al llegar a estas preguntas racionales sobre la creación, confesó: «¡Mi corazón estuvo a punto de echar a volar!», siendo ese el primer instante en que la fe penetró en su pecho.",
      ar: "عن جبير بن مطعم رضي الله عنه أنه سمع النبي ﷺ يقرأ في المغرب بسورة الطور وهو يومئذٍ مشرك، فلما بلغ هذه الآيات العقلية القاطعة (٣٥–٣٧) قال جبير: «كاد قلبي أن يطير»، فكان ذلك أول ما وقر الإيمان في قلبه.",
      de: "Dschubayr ibn Mut‘im berichtete, dass er noch als Polytheist den Propheten ﷺ beim Abendgebet Sure At-Tūr rezitieren hörte; als dieser diese eindringlichen Vernunftfragen zur Schöpfung erreichte, sagte Dschubayr: „Mein Herz wäre beinahe davongeflogen!“ – und erstmals fand der Glaube Eingang in sein Herz.",
      it: "Jubayr ibn Mut‘im narrò che, ancora politeista, udì il Profeta ﷺ recitare Sura At-Tūr durante la preghiera del Maghrib; giunto a queste domande razionali sulla creazione, confessò: «Il mio cuore stava per spiccare il volo!», segnando il primo ingresso della fede nel suo cuore.",
      id: "Jubair bin Muth‘im meriwayatkan bahwa saat masih musyrik ia mendengar Nabi ﷺ membaca Surah Ath-Thur dalam shalat Magrib; ketika sampai pada ayat-ayat argumen penciptaan ini, ia berkata: “Hatiku hampir saja terbang!”, dan sejak itulah iman pertama kali meresap di hatinya.",
      ru: "Джубайр ибн Мут‘им рассказал, что ещё будучи многобожником услышал, как Пророк ﷺ читает суру «Ат-Тур» в вечерней молитве; когда прозвучали эти потрясающие доводы разума о сотворении, Джубайр сказал: «Моё сердце едва не вылетело из груди!» — и впервые вера вошла в его сердце."
    }
  },
  "53:7": {
    type: "hadith",
    versets: ["53:7", "53:8", "53:9", "53:10", "53:11", "53:12", "53:13", "53:14", "53:15", "53:16", "53:17", "53:18"],
    plage: "53:7–18",
    source: "Sahīh Al-Bukhārī n°4855, n°4856, n°4857 & Sahīh Muslim n°174, n°177",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah et ‘Abdullāh ibn Mas‘ūd (qu'Allāh les agrée) clarifient que celui que le Prophète Muhammad ﷺ vit « à l'horizon suprême » puis « près du Jujubier de la Limite » (Sidrat al-Muntahā, lors de l'Ascension nocturne) était l'Ange Jibrīl (Gabriel) sous sa véritable forme angélique originelle, doté de six cents ailes qui recouvraient l'horizon entier — et non Allāh vu de ses yeux terrestres, confirmant la transcendance absolue d'Allāh.",
      en: "‘Ā’ishah and ‘Abdullāh ibn Mas‘ūd clarified that the one Prophet Muhammad ﷺ saw 'on the highest horizon' and again 'near the Lote Tree of the Utmost Boundary' (Sidrat al-Muntahā during Al-Mi‘rāj) was Angel Jibrīl in his true original angelic form, having six hundred wings filling the horizon—not Allāh seen with earthly eyes.",
      es: "‘Ā’ishah e Ibn Mas‘ūd aclararon que a quien vio el Profeta ﷺ «en el horizonte supremo» y luego «junto al Azufaifo del Límite» (en el Mi‘rāy) fue al Ángel Yibrīl en su forma angélica original con seiscientas alas que cubrían el horizonte, y no a Allah con ojos terrenales.",
      ar: "عن عائشة وعبد الله بن مسعود رضي الله عنهما أن المقصود بالرؤية في الأفق الأعلى وعند سدرة المنتهى هو رؤية النبي ﷺ لجبريل عليه السلام على صورته الحقيقية التي خُلق عليها، له ستمائة جناح قد سدّ بها الأفق، وليس رؤية الله بالعين في الدنيا.",
      de: "‘Ā’ishah und ‘Abdullāh ibn Mas‘ūd stellten klar, dass der Prophet ﷺ „am höchsten Horizont“ und am „Lotosbaum der äußersten Grenze“ (Sidrat al-Muntahā) den Engel Dschibrīl in seiner wahren Gestalt mit sechshundert Flügeln sah, die den gesamten Horizont füllten.",
      it: "‘Ā’ishah e Ibn Mas‘ūd chiarirono che colui che il Profeta ﷺ vide «all'orizzonte supremo» e poi «presso il Loto del Limite» (durante il Mi‘rāj) era l'Angelo Jibrīl nella sua vera forma angelica con seicento ali che colmavano l'orizzonte.",
      id: "‘Aisyah dan ‘Abdullah bin Mas‘ud menjelaskan bahwa sosok yang dilihat Nabi ﷺ di ufuk tertinggi dan di Sidratul Muntaha (saat Mi‘raj) adalah Malaikat Jibril dalam wujud aslinya yang memiliki enam ratus sayap yang memenuhi cakrawala.",
      ru: "‘Аиша и ‘Абдуллах ибн Мас‘уд разъяснили, что тот, кого Пророк ﷺ увидел «на высшем горизонте» и у «Лотоса крайнего предела» (Сидрат аль-Мунтаха во время Вознесения), был ангел Джибриль в его истинном облике с шестьюстами крыльями, закрывавшими весь горизонт."
    }
  },
  "53:62": {
    type: "hadith",
    versets: ["53:62"],
    plage: "53:62",
    source: "Sahīh Al-Bukhārī n°1071, n°4862, n°4863",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd et Ibn ‘Abbās rapportent que la Sourate An-Najm fut la toute première sourate contenant un verset de prosternation (Sajdah) à être révélée. Lorsque le Prophète ﷺ la récita publiquement à La Mecque et se prosterna à ce verset final, toute l'assemblée — musulmans et polythéistes confondus — fut si saisie par la majesté du Coran que tous se prosternèrent avec lui, à l'exception d'un vieillard orgueilleux qui porta une poignée de terre à son front et mourut plus tard dans l'incrédulité à Badr.",
      en: "‘Abdullāh ibn Mas‘ūd and Ibn ‘Abbās narrated that Sūrah An-Najm was the very first surah revealed with a verse of prostration. When the Prophet ﷺ recited it aloud in Makkah and prostrated at this closing verse, everyone present—Muslims and polytheists alike—was so overwhelmed by the Qur'an's majesty that all prostrated with him, save one arrogant elder who lifted dust to his forehead.",
      es: "Ibn Mas‘ūd e Ibn ‘Abbās relataron que An-Najm fue la primera sura revelada con una aleya de postración: al recitarla el Profeta ﷺ en La Meca y postrarse al final, todos los presentes —musulmanes y politeístas— quedaron tan sobrecogidos que se postraron con él, salvo un anciano arrogante.",
      ar: "عن عبد الله بن مسعود وابن عباس رضي الله عنهما أن سورة النجم هي أول سورة أُنزلت فيها سجدة؛ فلما قرأها النبي ﷺ بمكة وسجد في آخرها سجد معه كل من حضر من المسلمين والمشركين رهبةً من عظمة القرآن، إلا شيخًا متكبرًا رفع كفًّا من تراب إلى جبهته فقُتل كافرًا يوم بدر.",
      de: "‘Abdullāh ibn Mas‘ūd und Ibn ‘Abbās berichteten, dass An-Najm die erste Sure mit einem Niederwerfungsvers war: Als der Prophet ﷺ sie in Mekka rezitierte und sich am Ende niederwarf, warfen sich Muslime wie Polytheisten überwältigt mit ihm nieder – bis auf einen hochmütigen Ältesten.",
      it: "Ibn Mas‘ūd e Ibn ‘Abbās narrarono che An-Najm fu la prima sura rivelata con una prosternazione: quando il Profeta ﷺ la recitò alla Mecca e si prosternò alla fine, tutti i presenti — musulmani e politeisti — rimasero così colpiti da prosternarsi con lui, salvo un anziano superbo.",
      id: "Ibnu Mas‘ud dan Ibnu ‘Abbas meriwayatkan bahwa An-Najm adalah surah pertama yang memiliki ayat sajadah; saat Nabi ﷺ membacanya di Makkah lalu bersujud, seluruh hadirin baik muslim maupun musyrik ikut bersujud karena takjub akan keagungan Al-Qur'an, kecuali seorang tokoh sombong.",
      ru: "Ибн Мас‘уд и Ибн ‘Аббас передали, что «Ан-Наджм» стала первой сурой с аятом земного поклона: когда Пророк ﷺ прочёл её в Мекке и совершил земной поклон в конце, все присутствующие — и мусульмане, и многобожники — потрясённые величием Корана, склонились вместе с ним, кроме одного высокомерного старейшины."
    }
  },
  "54:1": {
    type: "sabab",
    versets: ["54:1", "54:2"],
    plage: "54:1–2",
    source: "Sahīh Al-Bukhārī n°3637, n°4864, n°4865 & Sahīh Muslim n°2800, n°2802",
    degre: "Sahīh",
    texte: {
      fr: "Anas ibn Mālik et ‘Abdullāh ibn Mas‘ūd (qu'Allāh les agrée) rapportent que les habitants de La Mecque réclamèrent au Messager d'Allāh ﷺ un signe miraculeux tangible. Allāh fendit alors la lune en deux moitiés bien distinctes sous leurs yeux — Ibn Mas‘ūd témoigna avoir vu le mont Hirā' entre les deux moitiés ! Malgré ce signe éclatant, les obstinés s'écrièrent « C'est de la magie ! », et Allāh révéla ces deux versets d'ouverture.",
      en: "Anas ibn Mālik and ‘Abdullāh ibn Mas‘ūd narrated that the people of Makkah demanded a visible miracle from the Messenger of Allāh ﷺ. Allāh then split the moon into two distinct halves before their eyes—Ibn Mas‘ūd witnessed Mount Hirā' between the two halves. Despite this clear sign, the stubborn dismissed it as 'magic,' and Allāh revealed these opening verses.",
      es: "Anas ibn Mālik e Ibn Mas‘ūd relataron que los habitantes de La Meca exigieron un milagro visible al Profeta ﷺ, y Allah hendió la luna en dos mitades nítidas —Ibn Mas‘ūd vio el monte Hirā' entre ambas—; pese a ello los obstinados lo llamaron magia, revelándose estas dos aleyas.",
      ar: "عن أنس بن مالك وعبد الله بن مسعود رضي الله عنهما أن أهل مكة سألوا رسول الله ﷺ أن يريهم آيةً فأراهم انشقاق القمر فرقتين واضحتين حتى رأى ابن مسعود جبل حراء بينهما، ومع ذلك كذّب المعاندون وقالوا: سحر مستمر، فأنزل الله هاتين الآيتين.",
      de: "Anas ibn Mālik und ‘Abdullāh ibn Mas‘ūd berichteten, dass die Mekkaner vom Propheten ﷺ ein sichtbares Wunder verlangten, worauf Allah den Mond vor ihren Augen in zwei klare Hälften spaltete – Ibn Mas‘ūd sah den Berg Hirā' dazwischen. Dennoch nannten die Verstockten es Magie, und diese Verse wurden offenbart.",
      it: "Anas ibn Mālik e Ibn Mas‘ūd narrarono che i Meccani chiesero un segno visibile al Profeta ﷺ, e Allāh spaccò la luna in due metà distinte — Ibn Mas‘ūd vide il monte Hirā' tra le due metà. Nonostante ciò gli ostinati gridarono alla magia, e scesero questi due versetti.",
      id: "Anas bin Malik dan Ibnu Mas‘ud meriwayatkan bahwa penduduk Makkah meminta mukjizat nyata dari Nabi ﷺ, lalu Allah membelah bulan menjadi dua bagian jelas hingga Ibnu Mas‘ud melihat Gua Hira di antara keduanya; namun kaum musyrik tetap menuduhnya sihir hingga turun dua ayat ini.",
      ru: "Анас ибн Малик и Ибн Мас‘уд передали, что мекканцы потребовали от Пророка ﷺ явного знамения, и Аллах расколол луну на две отчётливые половины — Ибн Мас‘уд видел гору Хира между ними. Упорствующие назвали это колдовством, и Аллах ниспослал эти два аята."
    }
  },
  "54:45": {
    type: "hadith",
    versets: ["54:45"],
    plage: "54:45",
    source: "Sahīh Al-Bukhārī n°4875",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte que lorsque ce verset mecquois (« Leur rassemblement sera bientôt mis en déroute et ils tourneront le dos ») fut révélé alors que les musulmans étaient encore faibles et persécutés à La Mecque, ‘Umar ibn Al-Khattāb s'interrogeait : « Quel rassemblement sera mis en déroute ? » Des années plus tard, le jour de la bataille de Badr, il vit le Prophète ﷺ revêtir sa cuirasse en récitant exactement ce verset, et comprit alors l'accomplissement éclatant de la prophétie.",
      en: "Ibn ‘Abbās narrated that when this Makkan verse ('Their assembly will be defeated, and they will turn their backs') was revealed while Muslims were still oppressed in Makkah, ‘Umar wondered which assembly it meant. Years later on the Day of Badr, he saw the Prophet ﷺ stepping forth in his armor reciting this very verse, witnessing its exact fulfillment.",
      es: "Ibn ‘Abbās relató que al revelarse esta aleya en La Meca cuando los musulmanes eran débiles, ‘Umar se preguntaba qué multitud sería derrotada; años después, el día de Badr, vio al Profeta ﷺ recitar precisamente esta aleya al ponerse su cota de malla, comprendiendo el cumplimiento exacto de la profecía.",
      ar: "عن ابن عباس رضي الله عنهما أنه لما نزلت هذه الآية بمكة والمسلمون مستضعفون كان عمر بن الخطاب يتساءل: أي جمع يُهزم؟ فلما كان يوم بدر رأى النبي ﷺ يثب في الدرع وهو يتلو هذه الآية فعرف يومئذٍ تأويلها وتحقق النبوءة.",
      de: "Ibn ‘Abbās berichtete, dass ‘Umar sich bei der Offenbarung dieses mekkanischen Verses fragte, welche Schar besiegt werden würde; Jahre später, am Tag von Badr, sah er den Propheten ﷺ genau diesen Vers rezitieren und erkannte die exakte Erfüllung der Verheißung.",
      it: "Ibn ‘Abbās narrò che alla rivelazione di questo versetto alla Mecca ‘Umar si chiedeva quale schiera sarebbe stata sconfitta; anni dopo, il giorno di Badr, vide il Profeta ﷺ recitare proprio questo versetto indossando la corazza e ne comprese l'esatto compimento.",
      id: "Ibnu ‘Abbas meriwayatkan bahwa saat ayat Makkiyah ini turun, ‘Umar sempat bertanya-tanya pasukan mana yang akan dikalahkan; bertahun-tahun kemudian pada Perang Badar ia melihat Nabi ﷺ keluar memakai baju besi sembari membaca ayat ini dan menyaksikan nubuat itu terbukti nyata.",
      ru: "Ибн ‘Аббас передал, что после ниспослания этого мекканского аята ‘Умар недоумевал, какое же полчище будет разбито; спустя годы в день битвы при Бадре он увидел, как Пророк ﷺ выходит в кольчуге, читая именно этот аят, и понял точное исполнение пророчества."
    }
  },
  "54:49": {
    type: "sabab",
    versets: ["54:48", "54:49"],
    plage: "54:48–49",
    source: "Sahīh Muslim n°2656",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah (qu'Allāh l'agrée) rapporte que les polythéistes de Quraysh vinrent polémiquer avec le Messager d'Allāh ﷺ au sujet de la Prédestination (Al-Qadar). C'est à cette occasion que descendirent ces versets : « Goûtez au contact de Saqar ! Nous avons certes créé toute chose selon une mesure déterminée (bi-qadar). »",
      en: "Abū Hurayrah narrated that the polytheists of Quraysh came disputing with the Messenger of Allāh ﷺ over Divine Decree (Al-Qadar), whereupon these verses were revealed: 'Taste the touch of Hellfire! Indeed, all things We created with predestination (bi-qadar).'",
      es: "Abū Hurayrah relató que los politeístas de Quraysh acudieron a discutir con el Profeta ﷺ acerca del Decreto divino (Al-Qadar), y en respuesta descendieron estas aleyas afirmando que Allah creó todas las cosas con una medida determinada.",
      ar: "عن أبي هريرة رضي الله عنه قال: جاء مشركو قريش يخاصمون رسول الله ﷺ في القدر، فنزلت هاتان الآيتان: ﴿ذُوقُوا مَسَّ سَقَرَ * إِنَّا كُلَّ شَيْءٍ خَلَقْنَاهُ بِقَدَرٍ﴾.",
      de: "Abū Hurayrah berichtete, dass die Polytheisten der Quraisch zum Propheten ﷺ kamen, um mit ihm über die göttliche Bestimmung (Al-Qadar) zu streiten, woraufhin diese Verse offenbart wurden: „Wahrlich, Wir haben alle Dinge nach einem bestimmten Maß erschaffen.“",
      it: "Abū Hurayrah narrò che i politeisti di Quraysh vennero a disputare con il Profeta ﷺ sul Decreto divino (Al-Qadar), e furono rivelati questi versetti: «In verità Noi abbiamo creato ogni cosa secondo una misura determinata».",
      id: "Abu Hurairah meriwayatkan bahwa kaum musyrik Quraisy datang mendebat Nabi ﷺ mengenai takdir (Al-Qadar), lalu turunlah dua ayat ini yang menegaskan bahwa segala sesuatu diciptakan Allah menurut ukuran dan ketetapan-Nya.",
      ru: "Абу Хурайра передал, что многобожники курайшиты пришли спорить с Пророком ﷺ о предопределении (аль-Кадар), и по этому поводу были ниспосланы эти аяты: «Воистину, Мы сотворили всякую вещь согласно предопределению»."
    }
  },
  "55:62": {
    type: "hadith",
    versets: ["55:46", "55:62"],
    plage: "55:46 & 55:62",
    source: "Sahīh Al-Bukhārī n°4878, n°4880 & Sahīh Muslim n°180",
    degre: "Sahīh",
    texte: {
      fr: "Abū Mūsā Al-Ash‘arī (qu'Allāh l'agrée) rapporte que le Messager d'Allāh ﷺ décrivit les quatre jardins promis aux pieux dans la Sourate Ar-Rahmān (v.46 et v.62) : « Il y a deux jardins dont les coupes et tout ce qu'ils contiennent sont d'argent, et deux jardins dont les coupes et tout ce qu'ils contiennent sont d'or ; et rien ne sépare les gens du Paradis de la contemplation de leur Seigneur sinon le Voile de Majesté sur Sa Face dans le Jardin d'Éden. »",
      en: "Abū Mūsā Al-Ash‘arī narrated that the Messenger of Allāh ﷺ described the four gardens mentioned in Sūrah Ar-Rahmān (v.46 and v.62): 'There are two gardens whose vessels and contents are of silver, and two gardens whose vessels and contents are of gold; and nothing stands between the people of Paradise and gazing upon their Lord except the Veil of Majesty upon His Face in the Garden of Eden.'",
      es: "Abū Mūsā Al-Ash‘arī relató que el Profeta ﷺ describió los cuatro jardines mencionados en Ar-Rahmān (v.46 y v.62): dos jardines cuyos recipientes y ornamentos son de plata y dos de oro, y nada separa a los moradores del Jardín del Edén de contemplar a su Señor sino el Velo de Majestad.",
      ar: "عن أبي موسى الأشعري رضي الله عنه أن النبي ﷺ وصف الجنات الأربع المذكورة في سورة الرحمن (الآيتان ٤٦ و٦٢) فقال: «جنتان من فضة آنيتهما وما فيهما، وجنتان من ذهب آنيتهما وما فيهما، وما بين القوم وبين أن ينظروا إلى ربهم إلا رداء الكبرياء على وجهه في جنة عدن».",
      de: "Abū Mūsā Al-Ash‘arī berichtete, dass der Prophet ﷺ die vier Gärten aus Sure Ar-Rahmān (V. 46 und 62) beschrieb: zwei Gärten mit Gefäßen aus Silber und zwei aus Gold, und nichts trennt die Bewohner des Paradieses vom Anblick ihres Herrn außer dem Schleier der Majestät.",
      it: "Abū Mūsā Al-Ash‘arī narrò che il Profeta ﷺ descrisse i quattro giardini citati in Ar-Rahmān (v.46 e v.62): due giardini con vasi d'argento e due d'oro, e nulla separa gli abitanti del Paradiso dal contemplare il loro Signore se non il Velo della Maestà.",
      id: "Abu Musa Al-Asy‘ari meriwayatkan penjelasan Nabi ﷺ tentang empat surga dalam Surah Ar-Rahman (ayat 46 dan 62): dua surga yang bejana dan isinya dari perak dan dua surga dari emas, serta tidak ada penghalang bagi penghuni Surga ‘Adn melihat Tuhannya selain tabir keagungan-Nya.",
      ru: "Абу Муса аль-Аш‘ари передал слова Пророка ﷺ о четырёх садах, упомянутых в суре «Ар-Рахман» (аяты 46 и 62): два сада с сосудами и убранством из серебра и два — из золота, и ничто не отделяет обитателей Рая от лицезрения их Господа, кроме Завесы Величия в Саду Эдема."
    }
  },
  "56:82": {
    type: "sabab",
    versets: ["56:75", "56:76", "56:77", "56:78", "56:79", "56:80", "56:81", "56:82"],
    plage: "56:75–82",
    source: "Sahīh Muslim n°73 & Sahīh Al-Bukhārī n°846",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās (qu'Allāh les agrée) rapporte qu'après une pluie tombée à l'époque du Prophète ﷺ, certains dirent : « Nous avons reçu la pluie grâce à telle et telle étoile (Anwā') ! » — attribuant le bienfait d'Allāh aux astres plutôt qu'au Créateur. Allāh fit aussitôt descendre ces versets (v.75–82) blâmant le fait de répondre à Sa subsistance par l'ingratitude et le démenti. Le Prophète ﷺ rappela après la pluie d'Al-Hudaybiyah que le croyant dit : « Nous avons reçu la pluie par la grâce et la miséricorde d'Allāh. »",
      en: "Ibn ‘Abbās narrated that after rain fell during the Prophet's ﷺ time, some people credited it to certain stars rather than to Allāh. Allāh then revealed these verses (v.75–82) reproaching them for meeting His provision with ingratitude and denial. As the Prophet ﷺ taught after rain at Al-Hudaybiyah, the believer says: 'We have been given rain by the grace and mercy of Allāh.'",
      es: "Ibn ‘Abbās relató que tras una lluvia en tiempos del Profeta ﷺ algunos atribuyeron la lluvia a las estrellas en lugar de a Allah, por lo que descendieron estas aleyas (v.75–82) censurando responder al sustento divino con ingratitud; el creyente dice: «Nos ha llovido por la gracia y misericordia de Allah».",
      ar: "عن ابن عباس رضي الله عنهما أن الناس مُطروا على عهد النبي ﷺ فقال بعضهم: مُطرنا بنوء كذا وكذا (نسبةً للنجوم)، فأنزل الله هذه الآيات (٧٥–٨٢) توبيخًا على جعل شكر الرزق تكذيبًا، وبيّن النبي ﷺ أن المؤمن يقول: «مُطرنا بفضل الله ورحمته».",
      de: "Ibn ‘Abbās berichtete, dass manche nach einem Regen die Sterne dafür verantwortlich machten statt Allah; daraufhin offenbarte Allah diese Verse (V. 75–82) als Tadel für Undankbarkeit gegenüber Seiner Versorgung, und der Prophet ﷺ lehrte zu sagen: „Wir erhielten Regen durch Allahs Huld und Barmherzigkeit.“",
      it: "Ibn ‘Abbās narrò che dopo una pioggia alcuni l'attribuirono agli astri anziché ad Allāh; scesero così questi versetti (v.75–82) che biasimano l'ingratitudine di fronte ai Suoi doni, mentre il credente dice: «Abbiamo avuto la pioggia per grazia e misericordia di Allāh».",
      id: "Ibnu ‘Abbas meriwayatkan bahwa setelah turun hujan sebagian orang menisbatkannya kepada bintang-bintang, lalu turunlah ayat-ayat ini (75–82) yang mencela sikap mengingkari nikmat; Nabi ﷺ mengajarkan kaum mukmin untuk mengucapkan: “Kita diberi hujan karena karunia dan rahmat Allah.”",
      ru: "Ибн ‘Аббас передал, что после дождя некоторые люди приписали его восходу звёзд, а не Аллаху; тогда Аллах ниспослал эти аяты (75–82), порицая неблагодарность за Его удел, а Пророк ﷺ научил верующих говорить: «Нам был дарован дождь по милости и милосердию Аллаха»."
    }
  },
  "57:16": {
    type: "sabab",
    versets: ["57:16"],
    plage: "57:16",
    source: "Sahīh Muslim n°3027",
    degre: "Sahīh",
    texte: {
      fr: "‘Abdullāh ibn Mas‘ūd (qu'Allāh l'agrée) rapporte : « Il ne s'était écoulé que quatre années entre notre entrée en Islam et le moment où Allāh nous adressa ce doux rappel solennel : “Le moment n'est-il pas venu pour ceux qui ont cru que leurs cœurs s'humilient à l'évocation d'Allāh et devant ce qui est descendu de la vérité ?” » — un avertissement permanent contre l'endurcissement progressif des cœurs avec le temps.",
      en: "‘Abdullāh ibn Mas‘ūd remarked: 'There were only four years between our embracing Islam and when Allāh gently admonished us with this verse: “Has the time not come for those who have believed that their hearts should become humbly submissive at the remembrance of Allāh and what has come down of the truth?”'—a timeless warning against gradual hardening of the heart.",
      es: "‘Abdullāh ibn Mas‘ūd señaló: «Solo habían pasado cuatro años desde nuestra entrada en el Islam cuando Allah nos dirigió este llamado: “¿No ha llegado aún el momento de que se humillen los corazones de los creyentes ante el recuerdo de Allah?”», advertencia eterna contra el endurecimiento del corazón.",
      ar: "عن عبد الله بن مسعود رضي الله عنه قال: «ما كان بين إسلامنا وبين أن عاتبنا الله بهذه الآية: ﴿أَلَمْ يَأْنِ لِلَّذِينَ آمَنُوا أَن تَخْشَعَ قُلُوبُهُمْ لِذِكْرِ اللَّهِ﴾ إلا أربع سنين»، تحذيرًا دائمًا من قسوة القلوب بطول الأمد.",
      de: "‘Abdullāh ibn Mas‘ūd sagte: „Zwischen unserer Annahme des Islams und dem Zeitpunkt, als Allah uns mit diesem Vers sanft ermahnte, lagen nur vier Jahre“ – eine bleibende Mahnung vor dem allmählichen Verhärten der Herzen.",
      it: "‘Abdullāh ibn Mas‘ūd riferì: «Non erano passati che quattro anni dal nostro ingresso nell'Islam quando Allāh ci rivolse questo richiamo solenne affinché i cuori si umilino al Suo ricordo», monito perenne contro l'indurimento del cuore.",
      id: "‘Abdullah bin Mas‘ud bertutur: “Hanya berselang empat tahun sejak keislaman kami hingga Allah menegur kami dengan ayat ini agar hati orang-orang beriman tunduk khusyuk mengingat Allah”, sebagai pengingat abadi agar hati tidak mengeras seiring waktu.",
      ru: "‘Абдуллах ибн Мас‘уд сказал: «Между принятием нами ислама и тем, как Аллах мягко упрекнул нас этим аятом — “Разве не пришло время для того, чтобы сердца верующих смирились при упоминании Аллаха?” — прошло всего четыре года»."
    }
  },
  "58:1": {
    type: "sabab",
    versets: ["58:1", "58:2", "58:3", "58:4"],
    plage: "58:1–4",
    source: "Sahīh Al-Bukhārī (Kitāb at-Tawhīd), Sunan Abī Dāwūd n°2214 & Sunan Ibn Mājah n°2063",
    degre: "Sahīh",
    texte: {
      fr: "‘Ā’ishah (qu'Allāh l'agrée) rapporte : « Louange à Celui dont l'Ouïe embrasse toutes les voix ! Khawlah bint Tha‘labah vint se plaindre à voix basse au Messager d'Allāh ﷺ au sujet de son mari (Aws ibn As-Sāmit) qui avait prononcé contre elle la formule préislamique du Zihār. Bien que je fusse dans un coin de la même pièce, certaines de ses paroles m'échappaient — et pourtant Allāh l'entendit du haut des sept cieux et révéla aussitôt ces quatre versets abolissant cette pratique injuste et fixant son expiation ! »",
      en: "‘Ā’ishah exclaimed: 'Praise be to the One whose Hearing encompasses all voices! Khawlah bint Tha‘labah came pleading softly to the Messenger of Allāh ﷺ about her husband (Aws ibn As-Sāmit), who had pronounced the pre-Islamic oath of Zihār against her. Though I was in a corner of the same room and missed parts of her speech, Allāh heard her from above the seven heavens and immediately revealed these four verses abolishing that injustice.'",
      es: "‘Ā’ishah exclamó: «¡Alabado sea Aquel cuyo Oído abarca todas las voces! Khawlah bint Tha‘labah acudió a quejarse en voz baja al Profeta ﷺ por su esposo que pronunció el Zihār; aunque yo estaba en la misma habitación sin oírlo todo, Allah la escuchó desde lo alto de los siete cielos y reveló al instante estas cuatro aleyas».",
      ar: "عن عائشة رضي الله عنها قالت: «الحمد لله الذي وسع سمعه الأصوات؛ لقد جاءت المجادِلة (خولة بنت ثعلبة) تشكو زوجها إلى رسول الله ﷺ وأنا في ناحية البيت ما أسمع بعض كلامها، فأنزل الله من فوق سبع سماوات هذه الآيات الأربع في إبطال الظهار وبيان كفارته».",
      de: "‘Ā’ishah sagte: „Lob sei Dem, Dessen Hören alle Stimmen umfasst! Khawlah bint Tha‘labah klagte dem Propheten ﷺ leise über ihren Ehemann, der den Zihār ausgesprochen hatte; selbst im selben Raum entging mir manches, doch Allah hörte sie über den sieben Himmeln und offenbarte sogleich diese vier Verse.“",
      it: "‘Ā’ishah esclamò: «Lode a Colui il cui Udito abbraccia tutte le voci! Khawlah bint Tha‘labah venne a confidarsi a bassa voce con il Profeta ﷺ per il torto del marito (Zihār); persino nella stessa stanza mi sfuggivano alcune parole, eppure Allāh l'udì dall'alto dei sette cieli rivelando subito questi quattro versetti!».",
      id: "‘Aisyah berkata: “Segala puji bagi Allah yang pendengaran-Nya meliputi segala suara; Khaulah binti Tsa‘labah mengadu pelan kepada Nabi ﷺ soal zihar suaminya hingga sebagian ucapannya tak kudengar di sudut ruangan, namun Allah mendengarnya dari atas tujuh langit lalu segera menurunkan empat ayat ini.”",
      ru: "‘Аиша сказала: «Хвала Тому, Чей Слух объемлет все голоса! Хауля бинт Са‘ляба тихо жаловалась Пророку ﷺ на своего мужа, произнёсшего зихар, так что даже в той же комнате я не расслышала части её слов, но Аллах услышал её свыше семи небес и сразу ниспослал эти четыре аята!»"
    }
  },
  "59:1": {
    type: "sabab",
    versets: ["59:1", "59:2", "59:3", "59:4", "59:5"],
    plage: "59:1–5",
    source: "Sahīh Al-Bukhārī n°4882, n°4884 & Sahīh Muslim n°1746, n°3031",
    degre: "Sahīh",
    texte: {
      fr: "Ibn ‘Abbās et ‘Abdullāh ibn ‘Umar rapportent que ces versets d'ouverture furent révélés lors de l'expulsion de la tribu des Banū An-Nadīr en l'an 4 de l'Hégire (Ibn ‘Abbās disait même : « Appelez-la Sourate Banū An-Nadīr ! ») après leur rupture de pacte et leur tentative d'attentat contre le Prophète ﷺ. Durant le siège, lorsque des palmiers furent abattus par nécessité stratégique, les assiégés crièrent à la corruption ; Allāh révéla alors le verset 5 confirmant que cela s'était fait avec Sa permission.",
      en: "Ibn ‘Abbās and ‘Abdullāh ibn ‘Umar narrated that these opening verses were revealed during the expulsion of Banū An-Nadīr in 4 AH (Ibn ‘Abbās even called it 'Sūrah Banū An-Nadīr') following their treaty breach and plot against the Prophet's ﷺ life. When palm trees were cut for tactical reasons during the siege and they protested, Allāh revealed verse 5 confirming it was done by His leave.",
      es: "Ibn ‘Abbās e Ibn ‘Umar relataron que estas aleyas iniciales descendieron durante la expulsión de Banū An-Nadīr en el año 4 H. tras romper su pacto y conspirar contra el Profeta ﷺ; cuando durante el asedio se cortaron algunas palmeras por necesidad táctica, Allah reveló la aleya 5 confirmando que fue con Su permiso.",
      ar: "عن ابن عباس وعبد الله بن عمر رضي الله عنهم أن مطلع هذه السورة نزل في إجلاء بني النضير سنة ٤ هـ بعد نقضهم العهد ومحاولة الغدر بالنبي ﷺ — حتى كان ابن عباس يسميها «سورة بني النضير» — ولما قُطع بعض النخل أثناء الحصار نزل قوله تعالى في الآية ٥ مبينًا أن ذلك بإذن الله.",
      de: "Ibn ‘Abbās und ‘Abdullāh ibn ‘Umar berichteten, dass diese Eingangsverse bei der Vertreibung der Banū An-Nadīr im Jahr 4 n. H. nach deren Vertragsbruch offenbart wurden (Ibn ‘Abbās nannte sie sogar „Sure Banū An-Nadīr“); Vers 5 bestätigte zudem, dass das Fällen einzelner Palmen während der Belagerung mit Allahs Erlaubnis geschah.",
      it: "Ibn ‘Abbās e Ibn ‘Umar narrarono che questi versetti iniziali scesero durante l'espulsione dei Banū An-Nadīr nell'anno 4 E. dopo la rottura del patto (Ibn ‘Abbās la chiamava persino «Sura Banū An-Nadīr»), e il versetto 5 confermò che il taglio di alcune palme durante l'assedio avvenne con il permesso di Allāh.",
      id: "Ibnu ‘Abbas dan Ibnu ‘Umar meriwayatkan bahwa ayat-ayat awal ini turun mengenai pengusiran Bani Nadhir pada tahun 4 H setelah mereka melanggar perjanjian (Ibnu ‘Abbas bahkan menyebutnya Surah Bani Nadhir), dan ayat 5 menegaskan penebangan sebagian kurma saat pengepungan terjadi atas izin Allah.",
      ru: "Ибн ‘Аббас и Ибн ‘Умар передали, что начало этой суры было ниспослано в связи с изгнанием племени Бану ан-Надир в 4 г. хиджры после нарушения ими договора (Ибн ‘Аббас даже называл её «сурой Бану ан-Надир»), а 5-й аят подтвердил, что вырубка части пальм во время осады произошла с дозволения Аллаха."
    }
  },
  "59:9": {
    type: "sabab",
    versets: ["59:9"],
    plage: "59:9",
    source: "Sahīh Al-Bukhārī n°3798, n°4889 & Sahīh Muslim n°2054",
    degre: "Sahīh",
    texte: {
      fr: "Abū Hurayrah (qu'Allāh l'agrée) rapporte qu'un voyageur affamé vint chez le Prophète ﷺ, mais ses épouses n'avaient que de l'eau à la maison. Un Compagnon des Ansār (Abū Talhah) l'invita chez lui alors qu'il ne restait que le repas de ses jeunes enfants. Avec son épouse (Umm Sulaym), ils endormirent les enfants, éteignirent la lampe et firent semblant de manger dans l'obscurité pour que l'invité puisse manger à sa faim. Au matin, le Prophète ﷺ leur annonça qu'Allāh s'était émerveillé de leur geste, et révéla ce verset louant ceux qui préfèrent autrui à eux-mêmes malgré leur propre besoin.",
      en: "Abū Hurayrah narrated that a hungry guest came to the Prophet ﷺ, whose household had only water. An Ansārī Companion (Abū Talhah) took him home where only enough food for his children remained; he and his wife put the children to sleep, dimmed the lamp, and pretended to eat in the dark so the guest could eat his fill. The next morning the Prophet ﷺ told them Allāh marvelled at their selflessness and revealed this verse praising those who prefer others over themselves despite their own need.",
      es: "Abū Hurayrah relató que un huésped hambriento acudió al Profeta ﷺ y un Compañero de los Ansār (Abū Talhah) lo alojó pese a tener solo la cena de sus hijos: acostaron a los niños, apagaron la lámpara y fingieron comer a oscuras para que el invitado se saciara. Al amanecer, el Profeta ﷺ les anunció la complacencia de Allah y reveló esta aleya sobre el altruismo.",
      ar: "عن أبي هريرة رضي الله عنه أن ضيفًا جائعًا نزل برسول الله ﷺ فلم يجد في بيوته إلا الماء، فاستضافه رجل من الأنصار (أبو طلحة) ولم يكن عنده إلا قوت صبيانه، فنوّما الصبيان وأطفآ السراج وتظاهرا بالأكل في الظلام حتى شبع الضيف، فلما أصبح أخبرهما النبي ﷺ بعجب الله من صنيعهما وأنزل الله: ﴿وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ﴾.",
      de: "Abū Hurayrah berichtete, dass ein hungriger Gast zum Propheten ﷺ kam und ein Mann der Ansār (Abū Talhah) ihn aufnahm, obwohl nur noch Essen für seine Kinder da war: Er und seine Frau legten die Kinder schlafen, löschten die Lampe und taten im Dunkeln so, als äßen sie mit, damit der Gast satt wurde. Daraufhin offenbarte Allah diesen Vers über selbstlose Großzügigkeit.",
      it: "Abū Hurayrah narrò che un ospite affamato giunse dal Profeta ﷺ e un Compagno degli Ansār (Abū Talhah) lo accolse pur avendo solo il pasto dei figli: misero a letto i bambini, spensero la lampada e finsero di mangiare al buio affinché l'ospite si saziasse. Allāh rivelò allora questo versetto elogiando chi antepone gli altri a sé stesso.",
      id: "Abu Hurairah meriwayatkan bahwa seorang tamu lapar datang kepada Nabi ﷺ lalu dijamu seorang sahabat Anshar (Abu Thalhah) yang hanya memiliki makanan anak-anaknya; bersama istrinya ia menidurkan anak-anak, mematikan lampu, dan berpura-pura makan dalam gelap agar sang tamu kenyang, hingga Allah menurunkan ayat pujian itsar ini.",
      ru: "Абу Хурайра передал, что голодного гостя Пророка ﷺ приютил один из ансаров (Абу Тальха), у которого оставалась еда лишь для детей: они с женой уложили детей спать, погасили светильник и в темноте делали вид, что едят, чтобы гость наелся досыта. Утром Пророк ﷺ сообщил, что Аллах восхитился их поступком, и был ниспослан этот аят о самоотверженности."
    }
  }
};

// Auto-contrôle strict avant écriture (8 langues + champs obligatoires)
const LANGUES_REQ = ['fr', 'en', 'es', 'ar', 'de', 'it', 'id', 'ru'];
for (const [cle, rec] of Object.entries(LOT_09_FATH_HASHR)) {
  if (!rec.type || !rec.source || !rec.degre || !Array.isArray(rec.versets) || !rec.texte) {
    throw new Error(`Structure invalide pour ${cle}`);
  }
  for (const lg of LANGUES_REQ) {
    if (!rec.texte[lg] || typeof rec.texte[lg] !== 'string' || rec.texte[lg].trim().length < 20) {
      throw new Error(`Texte manquant ou trop court pour ${cle} [${lg}]`);
    }
  }
}

Object.assign(data.recits, LOT_09_FATH_HASHR);
data.version = (data.version || 1) + 1;

const jsonFinal = JSON.stringify(data, null, 2);
JSON.parse(jsonFinal);
writeSafe(asbabPath, jsonFinal);

let worker = fs.readFileSync(workerPath, 'utf8');
worker = worker.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
writeSafe(workerPath, worker);

const nbRecits = Object.keys(data.recits).length;
const nbVersets = Object.values(data.recits).reduce((acc, r) => acc + (Array.isArray(r.versets) ? r.versets.length : 1), 0);
console.log(`✅ Lot 9 (Sourates 48 à 59) validé et intégré ! Total actuel : ${nbRecits} récits couvrant ${nbVersets} versets en 8 langues.`);
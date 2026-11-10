const fs = require('fs');
const path = require('path');

// ============================================================================
// 1. COMPLÉTER MEMOIRE-SITE.JSON À 801 CLÉS (AJOUT DU BLOC 6 : SOURATES 58 À 66)
// ============================================================================
const pMem = path.join(__dirname, 'memoire-site.json');
if (fs.existsSync(pMem)) {
  const mem = JSON.parse(fs.readFileSync(pMem, 'utf8'));

  const asbab6Fr = {
    "58:1": "<strong style='color:#ffffff;'>Contexte des versets 1 à 4 : la plainte de Khawlah bint Tha‘labah entendue du haut des sept cieux.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith de ‘Ā'ishah (Sahīh Al-Bukhārī, Ibn Mājah n°2063 & Musnad Ahmad) :</strong> Khawlah bint Tha‘labah vint se plaindre à voix basse auprès du Prophète ﷺ après que son époux Aws ibn As-Sāmit eut prononcé contre elle la formule préislamique du Zihār. Allāh entendit sa complainte du haut des sept cieux et fit descendre ces versets instituant l'expiation pour préserver leur foyer.",
    "58:11": "<strong style='color:#ffffff;'>Contexte du verset 11 : élargir l'assemblée pour les vétérans de Badr et l'élévation des gens de science.</strong><br><br>📜 <strong style='color:#ffffff;'>Récit de Muqātil et de Qatādah (At-Tabarī & Ibn Kathīr) :</strong> Révélé un vendredi lorsque des compagnons ayant combattu à Badr (dont Thābit ibn Qays) arrivèrent dans une assemblée dense autour du Prophète ﷺ, ordonnant de faire de la place fraternellement et proclamant qu'Allāh élève en degrés les croyants et les gens de science.",
    "58:22": "<strong style='color:#ffffff;'>Contexte du verset 22 : l'allégeance pure à Allāh et à Son Messager ﷺ lors des grandes batailles.</strong><br><br>📜 <strong style='color:#ffffff;'>Récit d'Ibn ‘Abbās et d'Ibn Mas‘ūd (At-Tabarī & Al-Bayhaqī) :</strong> Révélé en l'honneur des compagnons qui placèrent le lien de la foi au-dessus de toute attache tribale face aux armées venues combattre l'Islam à Badr et Uhud.",
    "59:5": "<strong style='color:#ffffff;'>Contexte du verset 5 : le siège des Banū An-Nadīr.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith d'Ibn ‘Umar (Sahīh Al-Bukhārī n°2326, n°4884 & Sahīh Muslim n°1746) :</strong> Révélé lors du siège des Banū An-Nadīr après la rupture de leur pacte, confirmant que le dégagement des abords de la forteresse avait eu lieu avec la permission d'Allāh.",
    "59:9": "<strong style='color:#ffffff;'>Contexte du verset 9 : l'altruisme exemplaire (Al-Īthār) d'Abū Talhah et d'Umm Sulaym.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith d'Abū Hurayrah (Sahīh Al-Bukhārī n°3798, n°4889 & Sahīh Muslim n°2054) :</strong> Révélé au sujet d'Abū Talhah et de son épouse Umm Sulaym qui endormirent leurs enfants et éteignirent la lampe pour offrir leur unique repas à l'invité affamé du Prophète ﷺ tout en passant la nuit le ventre vide.",
    "60:1": "<strong style='color:#ffffff;'>Contexte des versets 1 à 4 : la missive de Hātib ibn Abī Balta‘ah avant la conquête de La Mecque.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith de ‘Alī ibn Abī Tālib (Sahīh Al-Bukhārī n°3007, n°4890 & Sahīh Muslim n°2494) :</strong> Révélé lorsque Hātib ibn Abī Balta‘ah chercha à protéger ses proches restés sans clan à La Mecque ; le Prophète ﷺ fit intercepter la missive, accepta l'excuse sincère de Hātib en raison de sa présence à Badr et reçut le début de cette sourate.",
    "60:8": "<strong style='color:#ffffff;'>Contexte des versets 8 et 9 : la bonté et l'équité envers la mère d'Asmā' bint Abī Bakr.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith d'Asmā' bint Abī Bakr (Sahīh Al-Bukhārī n°2620, n°3183 & Sahīh Muslim n°1003) :</strong> Révélé lorsque la mère d'Asmā' bint Abī Bakr vint lui rendre visite avec des cadeaux à Médine ; le Prophète ﷺ lui ordonna de maintenir les liens de parenté avec elle, et Allāh autorisa la bienveillance et l'équité envers tous ceux qui ne combattent pas les croyants.",
    "60:10": "<strong style='color:#ffffff;'>Contexte du verset 10 : la protection des femmes croyantes émigrées (Umm Kulthūm bint ‘Uqbah).</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith d'Al-Miswar ibn Makhramah (Sahīh Al-Bukhārī n°2712 & n°4891) :</strong> Révélé lorsque Umm Kulthūm bint ‘Uqbah rejoignit Médine à pied après Al-Hudaybiyah, interdisant de renvoyer les femmes croyantes aux polythéistes.",
    "61:2": "<strong style='color:#ffffff;'>Contexte des versets 2 à 4 : la cohérence entre la parole et l'action.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith de ‘Abdullāh ibn Salām (At-Tirmidhī n°3309 & Musnad Ahmad) :</strong> Révélé lorsque des compagnons demandèrent quelle était l'œuvre la plus aimée d'Allāh afin de s'y engager avec fermeté.",
    "62:11": "<strong style='color:#ffffff;'>Contexte des versets 9 à 11 : l'arrivée de la caravane pendant le sermon du vendredi.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith de Jābir ibn ‘Abdillāh (Sahīh Al-Bukhārī n°936, n°4899 & Sahīh Muslim n°863) :</strong> Révélé lorsqu'une caravane de vivres arriva du Shām pendant le sermon du vendredi et qu'il ne resta que douze compagnons autour du Prophète ﷺ, rappelant que ce qui est auprès d'Allāh est meilleur que le divertissement et le commerce.",
    "63:7": "<strong style='color:#ffffff;'>Contexte des versets 7 et 8 : la véracité du jeune Zayd ibn Arqam confirmée par la Révélation.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith de Zayd ibn Arqam (Sahīh Al-Bukhārī n°4900, n°4901 & Sahīh Muslim n°2772) :</strong> Révélé pour confirmer mot pour mot le témoignage du jeune Zayd ibn Arqam après que ‘Abdullāh ibn Ubayy eut nié ses paroles hostiles lors de l'expédition des Banū Al-Mustaliq.",
    "64:14": "<strong style='color:#ffffff;'>Contexte des versets 14 à 16 : l'épreuve de l'attachement familial lors de l'Hégire et l'appel au pardon.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith d'Ibn ‘Abbās (At-Tirmidhī n°3317 & Al-Hākim) :</strong> Révélé au sujet de croyants qui avaient retardé leur émigration par attachement à leurs proches, les invitant à pardonner, à passer outre et à craindre Allāh autant qu'ils le peuvent.",
    "65:2": "<strong style='color:#ffffff;'>Contexte des versets 2 et 3 : la promesse d'issue favorable et de subsistance pour celui qui craint Allāh.</strong><br><br>📜 <strong style='color:#ffffff;'>Exégèse d'Ibn ‘Abbās et de Jābir (At-Tabarī & Ibn Kathīr) :</strong> Établit la règle universelle que la piété (Taqwā) et la confiance en Allāh (Tawakkul) ouvrent une issue à toute détresse et apportent la subsistance d'où l'on ne s'y attend pas.",
    "65:4": "<strong style='color:#ffffff;'>Contexte du verset 4 : la précision des délais de viduité suite à la question d'Ubayy ibn Ka‘b.</strong><br><br>📜 <strong style='color:#ffffff;'>Récit d'Ubayy ibn Ka‘b (Al-Hākim & At-Tabarī) :</strong> Révélé en réponse à la question d'Ubayy ibn Ka‘b afin de préciser les délais d'attente qui n'avaient pas été mentionnés dans la Sourate Al-Baqarah (2:228).",
    "66:1": "<strong style='color:#ffffff;'>Contexte des versets 1 à 5 : le serment d'abstinence du miel et l'exhortation aux épouses du Prophète ﷺ.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadiths de ‘Ā'ishah et d'Ibn ‘Abbās (Sahīh Al-Bukhārī n°4912, n°4913 & Sahīh Muslim n°1474) :</strong> Révélé lorsque le Prophète ﷺ s'interdit de boire du miel pour plaire à ses épouses, lui rappelant avec douceur de ne pas s'interdire ce qu'Allāh a rendu licite et instituant l'expiation des serments.",
    "66:11": "<strong style='color:#ffffff;'>Les deux modèles sublimes de la foi : Āsiyah et Maryam bint ‘Imrān (v.11-12).</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith d'Abū Mūsā Al-Ash‘arī (Sahīh Al-Bukhārī n°3411 & Sahīh Muslim n°2431) :</strong> Propose en conclusion de la sourate deux exemples suprêmes de foi pour tous les croyants : Āsiyah bint Muzāhim et Maryam bint ‘Imrān."
  };

  const asbab6En = {
    "58:1": "<strong style='color:#ffffff;'>Context of Verses 1–4: The Plea of Khawlah bint Tha‘labah Heard from Above the Seven Heavens.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith of ‘Ā'ishah (Sahīh Al-Bukhārī, Ibn Mājah #2063 & Musnad Ahmad):</strong> Revealed when Khawlah bint Tha‘labah pleaded with the Prophet ﷺ after her husband Aws ibn As-Sāmit pronounced the pre-Islamic formula of Zihār; Allāh heard her plea from above the seven heavens and ordained the expiation to preserve their family.",
    "58:11": "<strong style='color:#ffffff;'>Context of Verse 11: Making Room in Gatherings for the Veterans of Badr and Elevating People of Knowledge.</strong><br><br>📜 <strong style='color:#ffffff;'>Account of Muqātil & Qatādah (At-Tabarī & Ibn Kathīr):</strong> Revealed on a Friday when veterans of Badr arrived at a crowded gathering around the Prophet ﷺ, commanding believers to make room generously and declaring that Allāh raises in degrees those who believe and those given knowledge.",
    "58:22": "<strong style='color:#ffffff;'>Context of Verse 22: Pure Allegiance to Allāh and His Messenger ﷺ Above Tribal Ties.</strong><br><br>📜 <strong style='color:#ffffff;'>Account of Ibn ‘Abbās & Ibn Mas‘ūd (At-Tabarī & Al-Bayhaqī):</strong> Revealed honoring the companions who placed faith above clan loyalty at Badr and Uhud.",
    "59:5": "<strong style='color:#ffffff;'>Context of Verse 5: The Siege of Banū An-Nadīr.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith of Ibn ‘Umar (Sahīh Al-Bukhārī #2326, #4884 & Muslim #1746):</strong> Revealed during the siege of Banū An-Nadīr after they broke their treaty, affirming that clearing obstructing palms was done by Allāh's permission.",
    "59:9": "<strong style='color:#ffffff;'>Context of Verse 9: The Supreme Selflessness (Al-Īthār) of Abū Talhah and Umm Sulaym.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith of Abū Hurayrah (Sahīh Al-Bukhārī #3798, #4889 & Muslim #2054):</strong> Revealed regarding Abū Talhah and Umm Sulaym, who put their children to sleep and dimmed the lamp so the Prophet's ﷺ hungry guest could eat their only meal while they spent the night hungry.",
    "60:1": "<strong style='color:#ffffff;'>Context of Verses 1–4: The Letter of Hātib ibn Abī Balta‘ah Before the Conquest of Makkah.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith of ‘Alī ibn Abī Tālib (Sahīh Al-Bukhārī #3007, #4890 & Muslim #2494):</strong> Revealed when Hātib sent a letter seeking to protect his vulnerable relatives in Makkah; the Prophet ﷺ retrieved the letter, accepted Hātib's sincere excuse as a veteran of Badr, and received the opening of this surah.",
    "60:8": "<strong style='color:#ffffff;'>Context of Verses 8–9: Kindness and Justice Toward Asmā' bint Abī Bakr's Mother.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith of Asmā' bint Abī Bakr (Sahīh Al-Bukhārī #2620, #3183 & Muslim #1003):</strong> Revealed when Asmā's mother visited her with gifts in Madinah; the Prophet ﷺ instructed Asmā' to maintain kinship ties with her, and Allāh permitted kindness and justice toward all who do not fight believers over religion.",
    "60:10": "<strong style='color:#ffffff;'>Context of Verse 10: Protecting Believing Women Who Emigrated to Madinah (Umm Kulthūm bint ‘Uqbah).</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith of Al-Miswar ibn Makhramah (Sahīh Al-Bukhārī #2712 & #4891):</strong> Revealed after Al-Hudaybiyah when Umm Kulthūm bint ‘Uqbah escaped Makkah on foot to join Madinah, forbidding returning believing women to the polytheists.",
    "61:2": "<strong style='color:#ffffff;'>Context of Verses 2–4: Matching Words with Steadfast Action.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith of ‘Abdullāh ibn Salām (At-Tirmidhī #3309 & Musnad Ahmad):</strong> Revealed calling believers to unite truthful speech with firm action in Allāh's cause.",
    "62:11": "<strong style='color:#ffffff;'>Context of Verses 9–11: The Arrival of the Caravan During the Friday Sermon.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith of Jābir ibn ‘Abdillāh (Sahīh Al-Bukhārī #936, #4899 & Muslim #863):</strong> Revealed when a trade caravan arrived during the Friday sermon until twelve companions remained with the Prophet ﷺ, reminding believers that what is with Allāh is far better than amusement and trade.",
    "63:7": "<strong style='color:#ffffff;'>Context of Verses 7–8: The Vindication of Young Zayd ibn Arqam by Revelation.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith of Zayd ibn Arqam (Sahīh Al-Bukhārī #4900, #4901 & Muslim #2772):</strong> Revealed confirming every word reported by young Zayd ibn Arqam after ‘Abdullāh ibn Ubayy falsely denied his hostile remarks.",
    "64:14": "<strong style='color:#ffffff;'>Context of Verses 14–16: The Trial of Family Attachment During Migration and the Call to Pardon.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith of Ibn ‘Abbās (At-Tirmidhī #3317 & Al-Hākim):</strong> Revealed regarding believers who delayed migration out of attachment to their families, instructing them to pardon, overlook, and fear Allāh as much as they are able.",
    "65:2": "<strong style='color:#ffffff;'>Context of Verses 2–3: The Promise of a Way Out and Provision for Whoever Fears Allāh.</strong><br><br>📜 <strong style='color:#ffffff;'>Exegesis of Ibn ‘Abbās & Jābir (At-Tabarī & Ibn Kathīr):</strong> Establishes the universal promise that Taqwā and reliance upon Allāh open a way out of every hardship.",
    "65:4": "<strong style='color:#ffffff;'>Context of Verse 4: Clarifying Waiting Periods Following Ubayy ibn Ka‘b's Question.</strong><br><br>📜 <strong style='color:#ffffff;'>Account of Ubayy ibn Ka‘b (Al-Hākim & At-Tabarī):</strong> Revealed in response to Ubayy ibn Ka‘b's question regarding waiting periods not mentioned in Surah Al-Baqarah (2:228).",
    "66:1": "<strong style='color:#ffffff;'>Context of Verses 1–5: The Vow to Abstain from Honey and the Admonition to the Prophet's ﷺ Wives.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith of ‘Ā'ishah & Ibn ‘Abbās (Sahīh Al-Bukhārī #4912, #4913 & Muslim #1474):</strong> Revealed when the Prophet ﷺ vowed to stop drinking honey to please his wives, gently reminding him not to forbid what Allāh made lawful and ordaining the expiation for oaths.",
    "66:11": "<strong style='color:#ffffff;'>The Two Supreme Parables of Faith: Āsiyah and Maryam bint ‘Imrān (v.11–12).</strong><br><br>📜 <strong style='color:#ffffff;'>Hadith of Abū Mūsā Al-Ash‘arī (Sahīh Al-Bukhārī #3411 & Muslim #2431):</strong> Concludes the surah by setting forth Āsiyah bint Muzāhim and Maryam bint ‘Imrān as timeless models of faith for all believers."
  };

  const asbab6Es = {
    "58:1": "<strong style='color:#ffffff;'>Contexto de las aleyas 1–4: La súplica de Khawlah bint Tha‘labah escuchada desde encima de los siete cielos.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadiz de ‘Ā'ishah (Sahīh Al-Bukhārī e Ibn Māyah n°2063):</strong> Reveladas cuando Khawlah bint Tha‘labah acudió al Profeta ﷺ tras el Zihār de su esposo; Allah escuchó su lamento desde los cielos e instituyó la expiación para salvar su hogar.",
    "58:11": "<strong style='color:#ffffff;'>Contexto de la aleya 11: Hacer sitio en las asambleas a los veteranos de Badr y la elevación de los sabios.</strong><br><br>📜 <strong style='color:#ffffff;'>Relato de Muqātil y Qatādah (At-Tabarī):</strong> Ordena abrir espacio con fraternidad en las asambleas y proclama que Allah eleva en grados a los creyentes y a quienes han recibido el conocimiento.",
    "58:22": "<strong style='color:#ffffff;'>Contexto de la aleya 22: La lealtad pura a Allah y a Su Mensajero ﷺ por encima de todo lazo tribal.</strong><br><br>📜 <strong style='color:#ffffff;'>Relato de Ibn ‘Abbās e Ibn Mas‘ūd (At-Tabarī):</strong> Elogia a los compañeros que antepusieron la fe en Badr y Uhud.",
    "59:5": "<strong style='color:#ffffff;'>Contexto de la aleya 5: El asedio de Banū An-Nadīr.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadiz de Ibn ‘Umar (Sahīh Al-Bukhārī n°2326 y Muslim n°1746):</strong> Confirmó que despejar ciertas palmeras durante el asedio se hizo con permiso de Allah.",
    "59:9": "<strong style='color:#ffffff;'>Contexto de la aleya 9: El altruismo ejemplar (Al-Īthār) de Abū Talhah y Umm Sulaym.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadiz de Abū Hurayrah (Sahīh Al-Bukhārī n°3798 y Muslim n°2054):</strong> Revelada sobre Abū Talhah y Umm Sulaym, quienes durmieron a sus hijos y apagaron la lámpara para que el huésped hambriento del Profeta ﷺ se saciara con su única cena.",
    "60:1": "<strong style='color:#ffffff;'>Contexto de las aleyas 1–4: La carta de Hātib ibn Abī Balta‘ah antes de la Conquista de La Meca.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadiz de ‘Alī ibn Abī Tālib (Sahīh Al-Bukhārī n°3007 y Muslim n°2494):</strong> Reveladas cuando Hātib intentó proteger a su familia desamparada en La Meca; el Profeta ﷺ recuperó la carta y aceptó su sincera disculpa por haber combatido en Badr.",
    "60:8": "<strong style='color:#ffffff;'>Contexto de las aleyas 8–9: La bondad y justicia hacia la madre de Asmā' bint Abī Bakr.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadiz de Asmā' bint Abī Bakr (Sahīh Al-Bukhārī n°2620 y Muslim n°1003):</strong> Reveladas cuando la madre de Asmā' la visitó en Medina con regalos; el Profeta ﷺ le ordenó tratarla con generosidad, autorizando Allah la bondad y justicia hacia quienes no combaten a los creyentes.",
    "60:10": "<strong style='color:#ffffff;'>Contexto de la aleya 10: La protección de las creyentes emigradas a Medina (Umm Kulthūm bint ‘Uqbah).</strong><br><br>📜 <strong style='color:#ffffff;'>Hadiz de Al-Miswar ibn Makhramah (Sahīh Al-Bukhārī n°2712):</strong> Prohibió devolver a las mujeres creyentes emigradas a los politeístas.",
    "61:2": "<strong style='color:#ffffff;'>Contexto de las aleyas 2–4: La coherencia entre la palabra y la acción.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadiz de ‘Abdullāh ibn Salām (At-Tirmidhī n°3309):</strong> Exhorta a los creyentes a respaldar siempre sus palabras con firmeza en los hechos.",
    "62:11": "<strong style='color:#ffffff;'>Contexto de las aleyas 9–11: La llegada de la caravana durante el sermón del viernes.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadiz de Yābir ibn ‘Abdillāh (Sahīh Al-Bukhārī n°936 y Muslim n°863):</strong> Revelada cuando llegó una caravana comercial durante el sermón del viernes, recordando que lo que hay junto a Allah es mejor que el entretenimiento y el comercio.",
    "63:7": "<strong style='color:#ffffff;'>Contexto de las aleyas 7–8: Confirmación de la veracidad de Zayd ibn Arqam por la Revelación.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadiz de Zayd ibn Arqam (Sahīh Al-Bukhārī n°4900 y Muslim n°2772):</strong> Confirmó palabra por palabra el testimonio del joven Zayd ibn Arqam frente a las negaciones de ‘Abdullāh ibn Ubayy.",
    "64:14": "<strong style='color:#ffffff;'>Contexto de las aleyas 14–16: La prueba del apego familiar en la emigración y el llamado a perdonar.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadiz de Ibn ‘Abbās (At-Tirmidhī n°3317):</strong> Exhortó a quienes retrasaron su emigración por sus familias a perdonar, disculpar y temer a Allah en la medida de sus fuerzas.",
    "65:2": "<strong style='color:#ffffff;'>Contexto de las aleyas 2–3: La promesa de una salida favorable y sustento para quien teme a Allah.</strong><br><br>📜 <strong style='color:#ffffff;'>Comentario de Ibn ‘Abbās (At-Tabarī):</strong> Promesa universal de que la piedad (Taqwā) y la confianza en Allah abren una salida ante toda dificultad.",
    "65:4": "<strong style='color:#ffffff;'>Contexto de la aleya 4: Precisión de los plazos de espera tras la pregunta de Ubayy ibn Ka‘b.</strong><br><br>📜 <strong style='color:#ffffff;'>Relato de Ubayy ibn Ka‘b (Al-Hākim y At-Tabarī):</strong> Detalló los plazos de espera no mencionados en la Sura Al-Baqarah (2:228).",
    "66:1": "<strong style='color:#ffffff;'>Contexto de las aleyas 1–5: La promesa de abstenerse de la miel y la exhortación a las esposas del Profeta ﷺ.</strong><br><br>📜 <strong style='color:#ffffff;'>Hadiz de ‘Ā'ishah e Ibn ‘Abbās (Sahīh Al-Bukhārī n°4912 y Muslim n°1474):</strong> Recordó suavemente al Profeta ﷺ no prohibirse lo que Allah hizo lícito e instituyó la expiación de los juramentos.",
    "66:11": "<strong style='color:#ffffff;'>Los dos modelos sublimes de la fe: Āsiyah y Maryam bint ‘Imrān (v.11–12).</strong><br><br>📜 <strong style='color:#ffffff;'>Hadiz de Abū Mūsā Al-Ash‘arī (Sahīh Al-Bukhārī n°3411 y Muslim n°2431):</strong> Presenta a Āsiyah bint Muzāhim y a Maryam bint ‘Imrān como ejemplos supremos de fe para todos los creyentes."
  };

  const asbab6Ar = {
    "58:1": "<strong style='color:#ffffff;'>سياق الآيات (1-4) : سماع الله لشكوى خولة بنت ثعلبة من فوق سبع سماوات.</strong><br><br>📜 <strong style='color:#ffffff;'>حديث عائشة رضي الله عنها (البخاري تعليقًا وابن ماجه 2063 ومسند أحمد) :</strong> جاءت خولة بنت ثعلبة تشتكي إلى النبي ﷺ بعد أن ظاهر منها زوجها أوس بن الصامت، فسمع الله محاورتها من فوق سبع سماوات وأنزل كفارة الظهار رحمةً بها وبأسرتها.",
    "58:11": "<strong style='color:#ffffff;'>سياق نزول الآية 11 : التفاسح في المجالس لأهل بدر ورفع درجات أهل العلم.</strong><br><br>📜 <strong style='color:#ffffff;'>أثر مقاتل وقتادة (الطبري وابن كثير) :</strong> نزلت يوم جمعة حين أقبل نفرٌ من أهل بدر والمجلس غاصٌّ بأهله، فأمر الله بالتفسح في المجالس وبشّر برفع درجات المؤمنين وأهل العلم.",
    "58:22": "<strong style='color:#ffffff;'>سياق نزول الآية 22 : تقديم ولاء الله ورسوله ﷺ على كل عصبية.</strong><br><br>📜 <strong style='color:#ffffff;'>أثر ابن عباس وابن مسعود (الطبري والبيهقي) :</strong> نزلت في الصحابة الصادقين الذين قدّموا رابطة الإيمان يوم بدر وأُحد فكتب الله في قلوبهم الإيمان.",
    "59:5": "<strong style='color:#ffffff;'>سياق نزول الآية 5 : حصار بني النضير.</strong><br><br>📜 <strong style='color:#ffffff;'>حديث ابن عمر رضي الله عنهما (البخاري 2326 ومسلم 1746) :</strong> نزلت في شأن نخيل بني النضير أثناء الحصار بعد غدرهم بالعهد مبينةً أن ذلك كان بإذن الله.",
    "59:9": "<strong style='color:#ffffff;'>سياق نزول الآية 9 : الإيثار العظيم لأبي طلحة وأم سليم مع ضيف رسول الله ﷺ.</strong><br><br>📜 <strong style='color:#ffffff;'>حديث أبي هريرة رضي الله عنه (البخاري 3798 ومسلم 2054) :</strong> نزلت في أبي طلحة الأنصاري وزوجته أم سليم حين نوّما الصبيان وأطفآ السراج ليؤثرا ضيف النبي ﷺ بقوتهما ويبيتا طاويين.",
    "60:1": "<strong style='color:#ffffff;'>سياق الآيات (1-4) : قصة كتاب حاطب بن أبي بلتعة رضي الله عنه قبيل فتح مكة.</strong><br><br>📜 <strong style='color:#ffffff;'>حديث علي بن أبي طالب رضي الله عنه (البخاري 3007 ومسلم 2494) :</strong> نزلت حين أراد حاطب حماية أهله المستضعفين بمكة، فأطلع الله نبيه ﷺ وقبل عذر حاطب لشهوده بدرًا.",
    "60:8": "<strong style='color:#ffffff;'>سياق الآيتين (8-9) : برّ أسماء بنت أبي بكر رضي الله عنهما بأمها وصلتها بالقسط.</strong><br><br>📜 <strong style='color:#ffffff;'>حديث أسماء بنت أبي بكر (البخاري 2620 ومسلم 1003) :</strong> نزلت حين قدمت قتيلة على ابنتها أسماء بالمدينة بهدايا، فأمرها النبي ﷺ بصلتها وأباح الله البر والقسط مع كل من لم يقاتل المؤمنين في الدين.",
    "60:10": "<strong style='color:#ffffff;'>سياق نزول الآية 10 : هجرة أم كلثوم بنت عقبة رضي الله عنها ومنع ردّ المؤمنات.</strong><br><br>📜 <strong style='color:#ffffff;'>حديث المسور بن مخرمة (البخاري 2712 و4891) :</strong> نزلت حين هاجرت أم كلثوم بنت عقبة إلى المدينة عقب الحديبية فنهاهم الله عن ردّ المؤمنات إلى المشركين.",
    "61:2": "<strong style='color:#ffffff;'>سياق الآيات (2-4) : مطابقة القول للعمل والثبات في سبيل الله.</strong><br><br>📜 <strong style='color:#ffffff;'>حديث عبد الله بن سلام رضي الله عنه (الترمذي 3309 ومسند أحمد) :</strong> نزلت تذكيرًا للمؤمنين بوجوب موافقة العمل للقول الصادق والثبات صفًّا واحدًا.",
    "62:11": "<strong style='color:#ffffff;'>سياق الآيات (9-11) : قدوم العير والتجارة أثناء خطبة الجمعة.</strong><br><br>📜 <strong style='color:#ffffff;'>حديث جابر بن عبد الله رضي الله عنهما (البخاري 936 ومسلم 863) :</strong> نزلت حين قدمت عيرٌ من الشام أثناء خطبة الجمعة وبقي مع النبي ﷺ اثنا عشر رجلًا، مبينةً أن ما عند الله خيرٌ من اللهو ومن التجارة.",
    "63:7": "<strong style='color:#ffffff;'>سياق الآيتين (7-8) : تصديق الوحي للغلام زيد بن أرقم رضي الله عنه.</strong><br><br>📜 <strong style='color:#ffffff;'>حديث زيد بن أرقم رضي الله عنه (البخاري 4900 ومسلم 2772) :</strong> نزلت مصدقةً لزيد بن أرقم حرفًا بحرف فيما نقله من مقالة عبد الله بن أبيّ في غزوة بني المصطلق.",
    "64:14": "<strong style='color:#ffffff;'>سياق الآيات (14-16) : فتنة الأهل والمال عند الهجرة والأمر بالعفو والصفح.</strong><br><br>📜 <strong style='color:#ffffff;'>حديث ابن عباس رضي الله عنهما (الترمذي 3317 والحاكم) :</strong> نزلت فيمن ثبّطهم أهلهم عن الهجرة، فأمرهم الله بالعفو والصفح وتقوى الله ما استطاعوا.",
    "65:2": "<strong style='color:#ffffff;'>سياق الآيتين (2-3) : آية الفرج والرزق لمن اتقى الله وتوكل عليه.</strong><br><br>📜 <strong style='color:#ffffff;'>تفسير ابن عباس وجابر (الطبري وابن كثير) :</strong> قاعدة إيمانية خالدة بأن تقوى الله والتوكل عليه يفتحان للمؤمن مخرجًا من كل ضيق ورزقًا من حيث لا يحتسب.",
    "65:4": "<strong style='color:#ffffff;'>سياق نزول الآية 4 : بيان العدد جوابًا لسؤال أُبيّ بن كعب رضي الله عنه.</strong><br><br>📜 <strong style='color:#ffffff;'>أثر أُبيّ بن كعب (الحاكم والطبري) :</strong> نزلت جوابًا لسؤال أُبيّ بن كعب لبيان عدد النساء اللاتي لم يُذكرن في آية سورة البقرة (2:228).",
    "66:1": "<strong style='color:#ffffff;'>سياق الآيات (1-5) : قصة شرب العسل وكفارة اليمين.</strong><br><br>📜 <strong style='color:#ffffff;'>حديث عائشة وابن عباس (البخاري 4912 ومسلم 1474) :</strong> نزلت حين امتنع النبي ﷺ عن شرب العسل مرضاةً لأزواجه، فعاتبه الله بلطف وشرع كفارة اليمين.",
    "66:11": "<strong style='color:#ffffff;'>المثلان الأعليان لأهل الإيمان : آسية امرأة فرعون ومريم ابنة عمران (آية 11-12).</strong><br><br>📜 <strong style='color:#ffffff;'>حديث أبي موسى الأشعري (البخاري 3411 ومسلم 2431) :</strong> خُتمت السورة بضرب أعظم مثلين للثبات على الإيمان: آسية بنت مزاحم ومريم ابنة عمران."
  };

  Object.assign(mem.tafsirFr, asbab6Fr);
  Object.assign(mem.tafsirEn, asbab6En);
  Object.assign(mem.tafsirEs, asbab6Es);
  Object.assign(mem.tafsirAr, asbab6Ar);

  fs.writeFileSync(pMem, JSON.stringify(mem, null, 2), 'utf8');
  console.log(`✅ Base memoire-site.json complétée : FR=${Object.keys(mem.tafsirFr).length} | EN=${Object.keys(mem.tafsirEn).length} | ES=${Object.keys(mem.tafsirEs).length} | AR=${Object.keys(mem.tafsirAr).length}`);
}

// ============================================================================
// 2. NETTOYER LES DOUBLONS DANS GENERATEUR.JS (DIVISE LE POIDS DU PATCH PAR 2)
// ============================================================================
const pGen = path.join(__dirname, 'generateur.js');
if (fs.existsSync(pGen)) {
  let g = fs.readFileSync(pGen, 'utf8');

  // Extraire le bloc patch-master-v35 existant une seule fois et supprimer les doublons
  const matchStyle = g.match(/<style id="patch-master-v35">[\s\S]*?<\/script>/);
  if (matchStyle) {
    const blocUnique = matchStyle[0];
    g = g.replace(/<style id="patch-master-v35">[\s\S]*?<\/script>\s*/g, '');
    g = g.replace(/<\/head>/g, blocUnique + '\n</head>');
  }

  // Supprimer aussi le doublon de style-refs-cliquables s'il apparaît deux fois de suite
  const matchRefs = g.match(/<style id="style-refs-cliquables">[\s\S]*?<\/script>/);
  if (matchRefs) {
    const blocRefsUnique = matchRefs[0];
    g = g.replace(/<style id="style-refs-cliquables">[\s\S]*?<\/script>\s*/g, '');
    g = g.replace(/<\/head>/g, blocRefsUnique + '\n</head>');
  }

  fs.writeFileSync(pGen, g, 'utf8');
  console.log('✅ Doublons de patchs nettoyés dans generateur.js !');
}

// ============================================================================
// 3. CRÉER LE FICHIER _headers POUR CLOUDFLARE PAGES (CACHE 100% RAPIDE < 25ms)
// ============================================================================
const dirSite = path.join(__dirname, 'site');
if (fs.existsSync(dirSite)) {
  const headersContent = `/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/*.html
  Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800

/index.html
  Cache-Control: public, max-age=1800, s-maxage=86400, stale-while-revalidate=604800

/sitemap.xml
  Cache-Control: public, max-age=86400
`;
  fs.writeFileSync(path.join(dirSite, '_headers'), headersContent, 'utf8');
  console.log('✅ Fichier site/_headers créé pour accélérer Cloudflare Pages !');
}
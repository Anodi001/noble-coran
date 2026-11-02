const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Nettoyage automatique des anciens fichiers temporaires
['tafsir-corrige.json', 'moteur.js', 'moteur-site.js'].forEach(f => {
  const p = path.join(__dirname, f);
  if (fs.existsSync(p)) {
    try { fs.unlinkSync(p); } catch (e) {}
  }
});

const ANTI_CACHE = Date.now();

// ============================================================================
// 1. DOSSIER COMPLET DE SOURATE AR-RŪM (30:1 À 30:5) EN 4 LANGUES
// ============================================================================
const DEV_RUM_FR = `
  <div class="miracle-pillars-grid">
    <div class="miracle-pillar-card">
      <div class="pillar-badge">MIRACLE N°1 • GÉOGRAPHIE & ALTITUDE</div>
      <h4>🌊 « Adnā al-Ard » : Le point émergé le plus bas sur Terre (-434 m)</h4>
      <p>Au verset 3, le Coran précise que les Romains ont été vaincus <em>« Fī Adnā al-Ard »</em> (فِي أَدْنَى الْأَرْضِ). En langue arabe, le mot <strong>« Adnā »</strong> possède un double sens miraculeux : il signifie à la fois <strong>« la terre la plus proche »</strong> (le Levant / Ash-Shām, voisin de la péninsule arabique) et <strong>« la terre la plus basse »</strong> en altitude. Or, les relevés satellites modernes confirment que l'endroit exact où les Byzantins ont été écrasés autour du bassin de la <strong>Mer Morte</strong> constitue le point émergé le plus bas de toute la planète Terre, situé à <strong>434 mètres au-dessous du niveau de la mer</strong>.</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">MIRACLE N°2 • PROPHÉTIE DE L'IMPOSSIBLE EN 3 À 9 ANS</div>
      <h4>⏳ « Bid‘i sinīn » (3 à 9 ans) & La confiance absolue du Prophète ﷺ</h4>
      <p>Vers <strong>615-616</strong>, les Perses sassanides écrasent les Byzantins, s'emparent de Damas, de Jérusalem et de l'Égypte, poussant Constantinople au bord de l'anéantissement. Les polythéistes de La Mecque se moquent des croyants. C'est à ce moment précis que le Coran annonce que les Romains vaincus triompheront dans <strong>« Bid‘i sinīn » (بِضْعِ سِنِينَ)</strong>, terme arabe qui désigne strictement une période de <strong>3 à 9 ans</strong>.</p>
      <p>Abū Bakr As-Siddīq paria alors avec Ubayy ibn Khalaf (avant l'interdiction des paris) que les Romains gagneraient d'ici 3 ans. Informé, le Prophète Muhammad ﷺ lui dit avec une sérénité et une certitude absolues : <strong>« Le mot "Bid‘" désigne un nombre entre 3 et 9 ans ! Retourne le voir, augmente la mise et prolonge le délai ! »</strong> Abū Bakr porta le pari à <strong>100 chamelles sur 7 à 9 ans</strong>. Exactement <strong>8 ans plus tard (en 624)</strong>, la contre-offensive de l'empereur Héraclius écrasa les Perses, accomplissant la prophétie à la lettre (<em>Sunan At-Tirmidhī n°3193, Tafsīr At-Tabarī 18/165 n°27876, Ibn ‘Asākir 1/251, Al-Bayhaqī 2/333</em>).</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">MIRACLE N°3 • DOUBLE VICTOIRE SIMULTANÉE À BADR</div>
      <h4>⚔️ « Et ce jour-là, les croyants se réjouiront du secours d'Allah » (300 contre 1 000)</h4>
      <p>Les versets 4 et 5 annoncent une seconde prophétie simultanée : <em>« Et ce jour-là, les croyants se réjouiront du secours d'Allah. Il secourt qui Il veut »</em>. Au moment même où les Romains remportaient leur victoire décisive contre les Perses en <strong>624</strong>, les musulmans — à peine <strong>300 soldats</strong> sous-équipés face à une armée mecquoise de <strong>1 000 soldats</strong> — remportaient la victoire historique de la <strong>bataille de Badr</strong> grâce au secours des Anges envoyés par Allah (<em>Sourate Āl-‘Imrān 3:123-125</em>). Le compagnon Niyār rapporte : <em>« À cet instant précis, énormément de gens embrassèrent l'Islam. »</em></p>
    </div>
  </div>

  <div class="historians-proof-section">
    <div class="historians-header">🏛️ CE QU'EN DISENT LES HISTORIENS NON-MUSULMANS & ATHÉES</div>

    <div class="historian-quote-box">
      <div class="historian-name">1. Prof. James Howard-Johnston (Université d'Oxford — Historien byzantiniste laïc/athée)</div>
      <div class="historian-role">Formé à Christ Church (Oxford) et professeur émérite à Corpus Christi College (Université d'Oxford), grand spécialiste mondial des guerres romano-perses, dans son ouvrage de référence <em>The Last Great War of Antiquity</em> (Oxford University Press, 2021) :</div>
      <blockquote>« Dès l'introduction de son ouvrage, James Howard-Johnston souligne que <strong>personne n'aurait pu prédire ni parier sur un tel retournement</strong>. Puis, décrivant l'offensive lancée au printemps 624, il écrit : <em>"Ce fut la première opération de la phase finale de la guerre, une phase remplie de drames qui allait culminer en <strong>un renversement de situation si extraordinaire qu'il semblait relever d'une intervention surnaturelle dans les affaires humaines</strong> (a reversal of fortunes so extraordinary as to suggest supernatural intervention in human affairs)."</em> »</blockquote>
    </div>

    <div class="historian-quote-box">
      <div class="historian-name">2. Edward Gibbon (1737–1794 — Célèbre historien britannique sceptique/athée)</div>
      <div class="historian-role">Auteur de l'œuvre monumentale <em>Histoire de la décadence et de la chute de l'Empire romain</em> (<em>The Decline and Fall of the Roman Empire</em>, vol. 2, p. 788) :</div>
      <blockquote>« Au milieu des triomphes perses, il [Muhammad] osa prédire qu'avant que beaucoup d'années ne s'écoulent, la victoire reviendrait sous les bannières des Romains. <strong>Au moment où cette prédiction fut annoncée, aucune prophétie ne pouvait paraître plus éloignée de sa réalisation</strong>, puisque les douze premières années du règne d'Héraclius annonçaient la dissolution imminente de l'Empire. »</blockquote>
    </div>

    <div class="historian-quote-box">
      <div class="historian-name">3. Les Chroniques de Théophane le Confesseur (Chroniqueur byzantin)</div>
      <div class="historian-role">Dans sa <em>Chronographie</em> historique :</div>
      <blockquote>« Théophane atteste l'état de crise économique et militaire totale dans lequel se trouvait l'Empire romain d'Orient face à l'occupation perse : humainement et militairement, l'Empire byzantin était considéré comme condamné. »</blockquote>
    </div>

    <div class="proof-links-bar">
      <span class="proof-links-label">🔗 Sources & preuves historiques vérifiables :</span>
      <a href="https://en.wikipedia.org/wiki/James_Howard-Johnston" target="_blank" rel="noopener" class="proof-link-pill">📘 James Howard-Johnston (Oxford)</a>
      <a href="https://global.oup.com/academic/product/the-last-great-war-of-antiquity-9780198830191" target="_blank" rel="noopener" class="proof-link-pill">🏛️ The Last Great War of Antiquity (Oxford 2021)</a>
      <a href="https://fr.wikipedia.org/wiki/Edward_Gibbon" target="_blank" rel="noopener" class="proof-link-pill">📜 Edward Gibbon (Decline & Fall)</a>
      <a href="https://fr.wikipedia.org/wiki/Th%C3%A9ophane_le_Confesseur" target="_blank" rel="noopener" class="proof-link-pill">📖 Chroniques de Théophane</a>
      <a href="https://fr.wikipedia.org/wiki/Mer_Morte" target="_blank" rel="noopener" class="proof-link-pill">🌍 Mer Morte (-434m)</a>
      <a href="https://fr.wikipedia.org/wiki/Bataille_de_Badr" target="_blank" rel="noopener" class="proof-link-pill">⚔️ Bataille de Badr (300 vs 1000)</a>
    </div>
  </div>
`;

const DEV_RUM_EN = `
  <div class="miracle-pillars-grid">
    <div class="miracle-pillar-card">
      <div class="pillar-badge">MIRACLE #1 • GEOGRAPHY & ALTITUDE</div>
      <h4>🌊 'Adnā al-Ard': The Lowest Point on Dry Land on Earth (-434 m)</h4>
      <p>In verse 3, the Quran states that the Romans were defeated <em>'Fī Adnā al-Ard'</em> (فِي أَدْنَى الْأَرْضِ). In Arabic, <strong>'Adnā'</strong> carries a dual meaning: <strong>'the nearest land'</strong> (Ash-Shām / the Levant bordering Arabia) and <strong>'the lowest land'</strong> in elevation. Modern satellite altimetry confirms that the Dead Sea basin where the Byzantine defeat took place is the lowest point of dry land on Earth, at <strong>434 meters below sea level</strong>.</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">MIRACLE #2 • PREDICTING THE IMPOSSIBLE IN 3 TO 9 YEARS</div>
      <h4>⏳ 'Bid‘i sinīn' (3 to 9 years) & The Prophet's ﷺ Absolute Confidence</h4>
      <p>Around <strong>615–616 CE</strong>, the Sassanian Persians crushed the Byzantines, capturing Damascus, Jerusalem, and Egypt. Everyone believed the Byzantine Empire was finished. Yet the Quran proclaimed that the defeated Romans would be victorious within <strong>'Bid‘i sinīn'</strong>—an Arabic term strictly meaning <strong>3 to 9 years</strong>.</p>
      <p>When Abū Bakr As-Siddīq bet Ubayy ibn Khalaf that the Romans would win within 3 years, the Prophet ﷺ told him with total confidence: <strong>"'Bid‘' denotes a number from 3 to 9 years! Go back, increase the stake, and extend the term!"</strong> Abū Bakr raised the wager to 100 camels over 7 to 9 years. Exactly <strong>8 years later (in 624 CE)</strong>, Emperor Heraclius defeated the Persians (<em>At-Tirmidhī 3193, At-Tabarī 18/165, Ibn ‘Asākir 1/251, Al-Bayhaqī 2/333</em>).</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">MIRACLE #3 • SIMULTANEOUS MUSLIM VICTORY AT BADR</div>
      <h4>⚔️ 'And that day the believers will rejoice in the victory of Allah' (300 vs 1,000)</h4>
      <p>Verses 4–5 add a second simultaneous prophecy: <em>"And that day the believers will rejoice in the victory of Allah."</em> At the exact time the Romans defeated the Persians in <strong>624 CE</strong>, the poorly equipped Muslims—only <strong>300 soldiers against 1,000</strong> Meccan soldiers—won the historic <strong>Battle of Badr</strong> supported by angels sent by Allah (<em>Surah Āl-‘Imrān 3:123–125</em>). Niyār states: <em>"And at that point many people became Muslims."</em></p>
    </div>
  </div>

  <div class="historians-proof-section">
    <div class="historians-header">🏛️ TESTIMONIES OF SECULAR & ATHEIST HISTORIANS</div>

    <div class="historian-quote-box">
      <div class="historian-name">1. Prof. James Howard-Johnston (Oxford University — Secular Byzantine Historian)</div>
      <div class="historian-role">Educated at Christ Church, Oxford, and Emeritus Fellow of Corpus Christi College, Oxford, in his landmark book <em>The Last Great War of Antiquity</em> (Oxford University Press, 2021):</div>
      <blockquote>"In the introduction, Howard-Johnston notes that <strong>nobody could have predicted or bet on such an outcome</strong>. Describing Heraclius's campaign launched in spring 624, he writes: <em>'It was the first operation in the final phase of the war, a phase which was to be filled with drama and to culminate in <strong>a reversal of fortunes so extraordinary as to suggest supernatural intervention in human affairs</strong>.'</em>"</blockquote>
    </div>

    <div class="historian-quote-box">
      <div class="historian-name">2. Edward Gibbon (1737–1794 — Famous Sceptical British Historian)</div>
      <div class="historian-role">In <em>The History of the Decline and Fall of the Roman Empire</em> (Vol. 2, p. 788):</div>
      <blockquote>"In the midst of the Persian triumphs he ventured to foretell that, before many years should elapse, victory would again return to the banners of the Romans. <strong>At the time when this prediction is said to have been delivered, no prophecy could be more distant from its accomplishment</strong>, since the first twelve years of Heraclius announced the approaching dissolution of the empire."</blockquote>
    </div>

    <div class="historian-quote-box">
      <div class="historian-name">3. The Chronicles of Theophanes the Confessor (Byzantine Chronicler)</div>
      <div class="historian-role">In his historical <em>Chronicle</em>:</div>
      <blockquote>"Theophanes documents the total economic and military collapse of the Eastern Roman Empire during the Persian occupation, when no observer believed Byzantium could survive."</blockquote>
    </div>

    <div class="proof-links-bar">
      <span class="proof-links-label">🔗 Verifiable Historical Sources:</span>
      <a href="https://en.wikipedia.org/wiki/James_Howard-Johnston" target="_blank" rel="noopener" class="proof-link-pill">📘 James Howard-Johnston (Oxford)</a>
      <a href="https://global.oup.com/academic/product/the-last-great-war-of-antiquity-9780198830191" target="_blank" rel="noopener" class="proof-link-pill">🏛️ The Last Great War of Antiquity (Oxford)</a>
      <a href="https://en.wikipedia.org/wiki/Edward_Gibbon" target="_blank" rel="noopener" class="proof-link-pill">📜 Edward Gibbon</a>
      <a href="https://en.wikipedia.org/wiki/Theophanes_the_Confessor" target="_blank" rel="noopener" class="proof-link-pill">📖 Chronicles of Theophanes</a>
      <a href="https://en.wikipedia.org/wiki/Dead_Sea" target="_blank" rel="noopener" class="proof-link-pill">🌍 Dead Sea (-434m)</a>
      <a href="https://en.wikipedia.org/wiki/Battle_of_Badr" target="_blank" rel="noopener" class="proof-link-pill">⚔️ Battle of Badr (300 vs 1000)</a>
    </div>
  </div>
`;

const DEV_RUM_ES = `
  <div class="miracle-pillars-grid">
    <div class="miracle-pillar-card">
      <div class="pillar-badge">MILAGRO N°1 • GEOGRAFÍA Y ALTITUD</div>
      <h4>🌊 « Adnā al-Ard »: El punto continental más bajo de la Tierra (-434 m)</h4>
      <p>En la aleya 3, el Corán precisa que los Romanos fueron vencidos <em>« Fī Adnā al-Ard »</em> (فِي أَدْنَى الْأَرْضِ). En árabe, <strong>« Adnā »</strong> significa tanto <strong>« la tierra más cercana »</strong> (el Levante / Ash-Shām) como <strong>« la tierra más baja »</strong> en altitud. Las mediciones modernas confirman que la ribera del <strong>Mar Muerto</strong>, donde los Bizantinos fueron derrotados, es el punto emergido más bajo de toda la Tierra, a <strong>434 metros bajo el nivel del mar</strong>.</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">MILAGRO N°2 • PROFECÍA DE LO IMPOSIBLE EN 3 A 9 AÑOS</div>
      <h4>⏳ « Bid‘i sinīn » (3 a 9 años) y la confianza absoluta del Profeta ﷺ</h4>
      <p>Hacia <strong>615-616</strong>, los Persas aplastaron a los Bizantinos tomando Damasco, Jerusalén y Egipto. Todo el mundo daba por muerto al Imperio romano de Oriente. Sin embargo, el Corán anunció que los Romanos vencerían en <strong>« Bid‘i sinīn »</strong> (un período estricto de <strong>3 a 9 años</strong>).</p>
      <p>Abū Bakr As-Siddīq apostó con Ubayy ibn Khalaf a un plazo de 3 años, pero el Profeta ﷺ le indicó con total seguridad: <strong>« ¡La palabra "Bid‘" designa entre 3 y 9 años! Vuelve, aumenta la apuesta y amplía el plazo. »</strong> Abū Bakr subió la apuesta a 100 camellas a 7-9 años, y exactamente <strong>8 años después (en 624)</strong> Heraclio derrotó a los Persas (<em>At-Tirmidhī 3193, At-Tabarī 18/165, Ibn ‘Asākir 1/251, Al-Bayhaqī 2/333</em>).</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">MILAGRO N°3 • VICTORIA SIMULTÁNEA EN BADR (300 CONTRA 1.000)</div>
      <h4>⚔️ « Y ese día los creyentes se alegrarán con el auxilio de Allah »</h4>
      <p>Las aleyas 4 y 5 anuncian que ese mismo día los creyentes se alegrarán con el socorro de Allah. Exactamente cuando los Romanos vencieron a los Persas en <strong>624</strong>, los musulmanes —solo <strong>300 soldados mal equipados frente a 1.000 soldados de Quraysh</strong>— ganaron la <strong>batalla de Badr</strong> ayudados por los Ángeles (<em>Sura Āl-‘Imrān 3:123-125</em>), lo que llevó a multitudes a abrazar el Islam.</p>
    </div>
  </div>

  <div class="historians-proof-section">
    <div class="historians-header">🏛️ TESTIMONIOS DE HISTORIADORES NO MUSULMANES Y ATEOS</div>

    <div class="historian-quote-box">
      <div class="historian-name">1. Prof. James Howard-Johnston (Universidad de Oxford — Historiador bizantinista ateo/laico)</div>
      <div class="historian-role">Formado en Christ Church (Oxford) y profesor emérito de Corpus Christi College (Oxford), en su obra <em>The Last Great War of Antiquity</em> (Oxford University Press, 2021):</div>
      <blockquote>« En la introducción afirma que <strong>nadie habría podido predecir ni apostar por semejante giro</strong>, y sobre la campaña de 624 escribe: <em>"Fue la primera operación de la fase final de la guerra, una fase llena de drama que culminaría en <strong>un giro del destino tan extraordinario que parecía sugerir una intervención sobrenatural en los asuntos humanos</strong>."</em> »</blockquote>
    </div>

    <div class="historian-quote-box">
      <div class="historian-name">2. Edward Gibbon (1737–1794 — Célebre historiador británico escéptico/ateo)</div>
      <div class="historian-role">En <em>Historia de la decadencia y caída del Imperio romano</em> (Vol. 2, p. 788):</div>
      <blockquote>« En medio de los triunfos persas, se aventuró a predecir que en pocos años la victoria volvería a los estandartes romanos. <strong>En el momento en que se anunció esta predicción, ninguna profecía podía parecer más lejana de su cumplimiento</strong>, pues los doce primeros años de Heraclio anunciaban la disolución inminente del imperio. »</blockquote>
    </div>

    <div class="historian-quote-box">
      <div class="historian-name">3. Las Crónicas de Teófanes el Confesor (Cronista bizantino)</div>
      <div class="historian-role">En su <em>Cronografía</em>:</div>
      <blockquote>« Teófanes documenta la crisis económica y militar absoluta del Imperio bizantino, cuando nadie creía posible su supervivencia. »</blockquote>
    </div>

    <div class="proof-links-bar">
      <span class="proof-links-label">🔗 Fuentes históricas verificables:</span>
      <a href="https://en.wikipedia.org/wiki/James_Howard-Johnston" target="_blank" rel="noopener" class="proof-link-pill">📘 James Howard-Johnston (Oxford)</a>
      <a href="https://global.oup.com/academic/product/the-last-great-war-of-antiquity-9780198830191" target="_blank" rel="noopener" class="proof-link-pill">🏛️ The Last Great War of Antiquity (Oxford)</a>
      <a href="https://es.wikipedia.org/wiki/Edward_Gibbon" target="_blank" rel="noopener" class="proof-link-pill">📜 Edward Gibbon</a>
      <a href="https://es.wikipedia.org/wiki/Te%C3%B3fanes_el_Confesor" target="_blank" rel="noopener" class="proof-link-pill">📖 Crónicas de Teófanes</a>
      <a href="https://es.wikipedia.org/wiki/Mar_Muerto" target="_blank" rel="noopener" class="proof-link-pill">🌍 Mar Muerto (-434m)</a>
      <a href="https://es.wikipedia.org/wiki/Batalla_de_Badr" target="_blank" rel="noopener" class="proof-link-pill">⚔️ Batalla de Badr (300 vs 1000)</a>
    </div>
  </div>
`;

const DEV_RUM_AR = `
  <div class="miracle-pillars-grid">
    <div class="miracle-pillar-card">
      <div class="pillar-badge">المعجزة الأولى • الإعجاز الجغرافي والمنسوب الأرضي</div>
      <h4>🌊 ﴿فِي أَدْنَى الْأَرْضِ﴾ : أخفض بقعة على سطح اليابسة (-434 مترًا)</h4>
      <p>أخبر القرآن الكريم أن الروم غُلبوا ﴿فِي أَدْنَى الْأَرْضِ﴾ (الروم: 3). ولفظ <strong>«أدنى»</strong> في اللسان العربي يحمل معنيين متلازمين: <strong>«أقرب الأرض»</strong> إلى جزيرة العرب (بلاد الشام)، و<strong>«أخفض الأرض»</strong> ارتفاعًا. وقد أثبتت القياسات الجغرافية الحديثة والأقمار الصناعية أن منطقة حوض <strong>البحر الميت</strong> التي وقعت فيها الهزيمة هي أخفض نقطة على اليابسة في الكرة الأرضية بعمق <strong>434 مترًا تحت مستوى سطح البحر</strong>.</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">المعجزة الثانية • الإخبار بالمستحيل وتحديد الأجل (3 إلى 9 سنين)</div>
      <h4>⏳ ﴿فِي بِضْعِ سِنِينَ﴾ ويقين النبي ﷺ التام في رهان أبي بكر الصديق</h4>
      <p>نحو عام <strong>615-616م</strong> سحق الفرسُ الرومَ واستولوا على الشام وبيت المقدس ومصر، وأشرفـت القسطنطينية على السقوط، ففرح مشركو قريش. فنزل الوحي يعلن أن الروم سينتصرون <strong>﴿فِي بِضْعِ سِنِينَ﴾</strong>، والـبِضْع في لغة العرب ما بين <strong>3 إلى 9 سنين</strong>.</p>
      <p>ولما راهن أبو بكر الصديق رضي الله عنه أُبيّ بن خلف على ثلاث سنين (قبل تحريم الرهان)، قال له النبي ﷺ بكل ثقة ويقين بوعد الله: <strong>«إنما البِضْع ما بين الثلاث إلى التسع، فزايِدْه في الخطر ومادَّه في الأجل!»</strong> فجعلها أبو بكر 100 قلوص إلى سبع أو تسع سنين، وبعد <strong>8 سنوات (عام 624م)</strong> انتصر هرقل على الفرس انتصارًا ساحقًا كما أخبر القرآن (<em>رواه الترمذي والطبري 18/165 وابن عساكر 1/251 والبيهقي في دلائل النبوة 2/333</em>).</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">المعجزة الثالثة • النصر المتزامن للمسلمين يوم بدر (300 ضد 1000)</div>
      <h4>⚔️ ﴿وَيَوْمَئِذٍ يَفْرَحُ الْمُؤْمِنُونَ * بِنَصْرِ اللَّهِ﴾</h4>
      <p>تنبأت الآيتان 4 و5 ببشارة ثانية في نفس التوقيت: ففي الوقت الذي هزم فيه الرومُ الفرسَ عام <strong>624م</strong>، انتصر المسلمون في <strong>غزوة بدر الكبرى</strong> وهم قلة مستضعفون (نحو <strong>300 مجاهد</strong> ضعيفي العتاد في مواجهة <strong>1000 مقاتل</strong> من قريش) بمدد الملائكة الذي أنزله الله (<em>سورة آل عمران: 123-125</em>)، قال نيار الأسلمي: <em>«فعند ذلك أسلم خلق كثير»</em>.</p>
    </div>
  </div>

  <div class="historians-proof-section">
    <div class="historians-header">🏛️ شهادات المؤرخين الغربيين غير المسلمين والملاحدة</div>

    <div class="historian-quote-box">
      <div class="historian-name">1. البروفيسور جيمس هوارد-جونستون (James Howard-Johnston — جامعة أكسفورد)</div>
      <div class="historian-role">مؤرخ بريطاني ملحد/غير مسلم، درس في كلية كرايست تشيرش وأستاذ فخري للدراسات البيزنطية في كلية كوربوس كريستي بجامعة أكسفورد، يقول في كتابه <em>The Last Great War of Antiquity</em> (جامعة أكسفورد، 2021):</div>
      <blockquote>« أكّد في مقدمة كتابه أنه <strong>لم يكن بوسع أي إنسان أن يتنبأ بهذا الانقلاب أو يراهن عليه</strong>، ثم قال عن حملة ربيع 624م: <em>"كانت العملية الأولى في المرحلة النهائية من الحرب، وهي مرحلة بلغت ذروتها في <strong>انقلابٍ في الموازين خارقٍ للعادة إلى حدّ يوحي بتدخلٍ فوق طبيعي (إعجازي) في شؤون البشر</strong>."</em> »</blockquote>
    </div>

    <div class="historian-quote-box">
      <div class="historian-name">2. إدوارد غيبون (Edward Gibbon — المؤرخ البريطاني الشهير)</div>
      <div class="historian-role">في موسوعته التاريخية <em>تاريخ ضعف وسقوط الإمبراطورية الرومانية</em> (المجلد 2، ص 788):</div>
      <blockquote>« في خضم انتصارات الفرس، أعلن [محمد ﷺ] أنه قبل مضي سنوات قليلة سيعود النصر إلى رايات الروم. <strong>وفي الوقت الذي أُعلنت فيه هذه النبوءة، لم يكن هناك أي نبوءة أبعد عن التحقق منها</strong>؛ إذ كانت السنوات الاثنتا عشرة الأولى من حكم هرقل تنذر بالانهيار الوشيك للإمبراطورية. »</blockquote>
    </div>

    <div class="historian-quote-box">
      <div class="historian-name">3. حوليات المؤرخ البيزنطي ثيوفان المعترف (Theophanes)</div>
      <div class="historian-role">في تاريخه البيزنطي:</div>
      <blockquote>« يوثّق ثيوفان الانهيار الاقتصادي والعسكري الشامل الذي أصاب دولة الروم حتى ظن الجميع أنها قد انتهت إلى الأبد. »</blockquote>
    </div>

    <div class="proof-links-bar">
      <span class="proof-links-label">🔗 روابط المصادر التاريخية الموثقة:</span>
      <a href="https://en.wikipedia.org/wiki/James_Howard-Johnston" target="_blank" rel="noopener" class="proof-link-pill">📘 James Howard-Johnston (Oxford)</a>
      <a href="https://global.oup.com/academic/product/the-last-great-war-of-antiquity-9780198830191" target="_blank" rel="noopener" class="proof-link-pill">🏛️ كتاب جامعة أكسفورد (2021)</a>
      <a href="https://ar.wikipedia.org/wiki/%D8%A5%D8%AF%D9%88%D8%A7%D8%B1%D8%AF_%D8%AC%D9%8A%D8%A8%D9%88%D9%86" target="_blank" rel="noopener" class="proof-link-pill">📜 المؤرخ إدوارد غيبون</a>
      <a href="https://ar.wikipedia.org/wiki/%D8%AB%D9%8A%D9%88%D9%81%D8%A7%D9%86_%D8%A7%D9%84%D9%85%D8%B9%D8%AA%D8%B1%D9%81" target="_blank" rel="noopener" class="proof-link-pill">📖 حوليات ثيوفان</a>
      <a href="https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D8%A8%D8%AD%D8%B1_%D8%A7%D9%84%D9%85%D9%8A%D8%AA" target="_blank" rel="noopener" class="proof-link-pill">🌍 البحر الميت (-434م)</a>
      <a href="https://ar.wikipedia.org/wiki/%D8%BA%D8%B2%D9%88%D8%A9_%D8%A8%D8%AF%D8%B1" target="_blank" rel="noopener" class="proof-link-pill">⚔️ غزوة بدر (300 ضد 1000)</a>
    </div>
  </div>
`;

// ============================================================================
// 2. DOSSIER COMPLET DE SOURATE AL-QAMAR (54:1) — LA FENTE DE LA LUNE & LE ROI D'INDE
// ============================================================================
const DEV_QAMAR_FR = `
  <div class="miracle-pillars-grid">
    <div class="miracle-pillar-card">
      <div class="pillar-badge">PREUVE N°1 • TÉMOIGNAGES OCULAIRES MULTIPLES (MUTAWĀTIR)</div>
      <h4>🌙 La Lune fendue en deux au-dessus du mont Hirā' à La Mecque</h4>
      <p>Cinq ans avant l'Hégire, les chefs polythéistes de La Mecque (Quraysh) défièrent le Prophète Muhammad ﷺ de leur montrer un miracle céleste impossible à simuler sur Terre. Par la permission d'Allāh, la Lune se fendit en deux moitiés distinctes : les témoins virent une moitié d'un côté de la montagne de Hirā' et l'autre moitié de l'autre côté, tandis que le Prophète ﷺ leur disait : <strong>« Soyez-en témoins ! (Ash-hadū !) »</strong>.</p>
      <p>Ce fait historique est rapporté par des chaînes de transmission multiples et ininterrompues (<em>Mutawātir</em>) dans <em>Sahīh Al-Bukhārī</em> (n°3636, 3868) et <em>Sahīh Muslim</em> (n°2800) d'après de nombreux témoins oculaires directs, notamment <strong>‘Abdullāh ibn Mas‘ūd, Anas ibn Mālik, Jubayr ibn Mut‘im, ‘Abdullāh ibn ‘Abbās et ‘Abdullāh ibn ‘Umar</strong>.</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">PREUVE N°2 • L'ARGUMENT IMPARABLE DES VOYAGEURS & L'AVEU DE QURAYSH</div>
      <h4>🐪 La vérification auprès des caravanes venant de l'extérieur</h4>
      <p>Comme le souligne le verset suivant (<em>« Et s'ils voient un signe, ils se détournent et disent : "C'est une magie persistante !" »</em> — 54:2), les ennemis mecquois n'ont jamais dit : <em>« Rien ne s'est passé dans le ciel »</em>, car toute la ville venait de le voir. Pour tenter de l'expliquer, Abū Jahl prétendit que Muhammad ﷺ avait « ensorcelé » leurs yeux.</p>
      <p>Les notables mecquois dirent alors : <strong>« Interrogez les voyageurs et les caravanes qui arrivent des autres contrées ! Car même s'il avait pu tromper nos yeux à La Mecque, il ne peut pas ensorceler les gens qui se trouvent au loin sur toute la terre ! »</strong> Or, lorsque les voyageurs arrivèrent de toutes les directions les jours suivants, ils confirmèrent unanimement : <strong>« Oui, nous avons vu la Lune se fendre telle nuit à telle heure ! »</strong> (<em>Musnad Ahmad, Sunan At-Tirmidhī n°3289, Al-Bayhaqī dans Dalā'il An-Nubuwwah 2/266</em>).</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">PREUVE N°3 • LE ROI D'INDE CHERAMAN PERUMAL & LE MANUSCRIT DE LONDRES</div>
      <h4>📜 L'observation depuis l'Inde (Kerala) et l'archive de la British Library</h4>
      <p>Ce phénomène céleste fut également observé hors d'Arabie, sur la côte sud-ouest de l'Inde (région de Malabar, actuel État du Kerala). Le roi indien de la dynastie Chera, connu sous le titre de <strong>Cheraman Perumal</strong> (appelé <em>Chakrawati Farmas</em> ou <em>Shakarwati Farmad</em> dans les chroniques arabes), vit la Lune se fendre depuis le toit de son palais par une nuit claire et fit consigner l'heure exacte du prodige par ses astronomes.</p>
      <p>Lorsque des marchands arabes firent escale dans ses ports en route vers Ceylan et lui apprirent qu'un Prophète à La Mecque avait accompli ce miracle, le roi partagea son royaume, embarqua pour l'Arabie, rencontra le Prophète Muhammad ﷺ et embrassa l'Islam sous le nom de <strong>Tājuddīn</strong>. Le compagnon <strong>Abū Sa‘īd Al-Khudrī</strong> rapporte à ce sujet dans un Hadīth consigné par <em>Al-Hākim dans Al-Mustadrak (n°7373)</em> : <strong>« Le roi de l'Inde offrit au Messager d'Allāh ﷺ une jarre contenant du gingembre ; le Prophète ﷺ en fit goûter à ses compagnons morceau par morceau, et il m'en donna un morceau à manger. »</strong></p>
      <p>Tombé malade sur le chemin du retour à Zafar (Salalah, Oman) où se trouve encore son tombeau, le roi confia à ses compagnons de voyage (dont Mālik ibn Dīnār) des lettres royales en langue malayalam ordonnant d'accueillir les musulmans, ce qui aboutit en <strong>629 ap. J.-C.</strong> à la fondation de la <strong>Cheraman Juma Masjid</strong> à Kodungallur (Kerala), la plus ancienne mosquée du sous-continent indien.</p>
    </div>
  </div>

  <div class="historians-proof-section">
    <div class="historians-header">🏛️ ARCHIVE DU MANUSCRIT DE LONDRES & RÉFÉRENCES HISTORIQUES</div>

    <div class="historian-quote-box">
      <div class="historian-name">1. Le Manuscrit de Londres (British Library / India Office Library, MS. Arabic 2807)</div>
      <div class="historian-role">Cité par le Pr. Muhammad Hamidullah dans son ouvrage de référence <em>Muhammad Rasulullah</em> (paragraphes 199-200) :</div>
      <blockquote>« Conservé à Londres dans les fonds de l'<em>India Office Library</em> (British Library) sous la cote <strong>MS. Arabic 2807 (fols. 152–173 / 81a–104a)</strong> et intitulé <em>Qissat Shakarwati Farmad</em>, ce manuscrit historique relate comment le souverain du Malabar observa la fente de la Lune depuis l'Inde, se rendit en Arabie auprès du Prophète ﷺ et ordonna la construction de la première mosquée du Kerala. »</blockquote>
    </div>

    <div class="historian-quote-box">
      <div class="historian-name">2. Tuhfat al-Mujāhidīn de Zayn al-Dīn al-Malībārī (Historien du Kerala, XVIe siècle)</div>
      <div class="historian-role">Ouvrage historique de référence sur l'histoire du Malabar :</div>
      <blockquote>« Atteste la tradition historique ancienne du Kerala concernant le voyage du roi Cheraman Perumal vers l'Arabie après l'observation du signe lunaire et l'établissement des premières mosquées sur la côte de Malabar dès le VIIe siècle. »</blockquote>
    </div>

    <div class="proof-links-bar">
      <span class="proof-links-label">🔗 Sources & archives historiques vérifiables :</span>
      <a href="https://sunnah.com/bukhari:3636" target="_blank" rel="noopener" class="proof-link-pill">📘 Sahīh Al-Bukhārī (n°3636)</a>
      <a href="https://sunnah.com/muslim:2800a" target="_blank" rel="noopener" class="proof-link-pill">📗 Sahīh Muslim (n°2800)</a>
      <a href="https://en.wikipedia.org/wiki/Cheraman_Perumal_myths" target="_blank" rel="noopener" class="proof-link-pill">👑 Roi Cheraman Perumal (Kerala)</a>
      <a href="https://en.wikipedia.org/wiki/Cheraman_Juma_Mosque" target="_blank" rel="noopener" class="proof-link-pill">🕌 Mosquée Cheraman Juma (629 ap. J.-C.)</a>
      <a href="https://fr.wikipedia.org/wiki/Muhammad_Hamidullah" target="_blank" rel="noopener" class="proof-link-pill">📜 Pr. Muhammad Hamidullah (MS. Arabic 2807)</a>
    </div>
  </div>
`;

const DEV_QAMAR_EN = `
  <div class="miracle-pillars-grid">
    <div class="miracle-pillar-card">
      <div class="pillar-badge">PROOF #1 • MASS-TRANSMITTED EYEWITNESS REPORTS (MUTAWĀTIR)</div>
      <h4>🌙 The Moon Split in Two Above Mount Hirā' in Makkah</h4>
      <p>Five years before the Hijrah, the Quraishi leaders of Makkah challenged Prophet Muhammad ﷺ to show them a celestial miracle that no mortal could fabricate on Earth. By the permission of Allāh, the Moon split into two distinct halves—one seen on one side of Mount Hirā' and the other on the opposite side—while the Prophet ﷺ proclaimed: <strong>"Bear witness! (Ash-hadū!)"</strong>.</p>
      <p>This event is transmitted through multiple uninterrupted chains (<em>Mutawātir</em>) in <em>Sahīh Al-Bukhārī</em> (#3636, 3868) and <em>Sahīh Muslim</em> (#2800) from eyewitnesses including <strong>‘Abdullāh ibn Mas‘ūd, Anas ibn Mālik, Jubayr ibn Mut‘im, Ibn ‘Abbās, and Ibn ‘Umar</strong>.</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">PROOF #2 • THE TRAVELERS' CONFIRMATION & QURAYSH'S ADMISSION</div>
      <h4>🐪 Independent Verification from Incoming Caravans</h4>
      <p>As the very next verse records (<em>"And if they see a sign, they turn away and say: 'Passing magic!'"</em> — 54:2), the Meccan opponents never denied seeing the event. When Abū Jahl claimed that Muhammad ﷺ had cast a spell over their eyes, the elders of Makkah said: <strong>"Ask the travelers arriving from outside! Even if he could bewitch our eyes in Makkah, he cannot bewitch people across the distant lands!"</strong> When caravans arrived from every direction over the following days, every single one of them confirmed having witnessed the Moon split that very night (<em>Musnad Ahmad, Sunan At-Tirmidhī #3289, Al-Bayhaqī 2/266</em>).</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">PROOF #3 • KING CHERAMAN PERUMAL OF INDIA & THE LONDON MANUSCRIPT</div>
      <h4>📜 Observed from Malabar (Kerala, India) & Archived at the British Library</h4>
      <p>The phenomenon was also witnessed on the Malabar Coast of southwestern India (modern Kerala). The Chera monarch <strong>Cheraman Perumal</strong> (referred to as <em>Chakrawati Farmas</em> or <em>Shakarwati Farmad</em> in Arabic chronicles) saw the Moon split from his palace roof and had his royal astronomers record the exact date and hour.</p>
      <p>Upon learning from Arab traders that a Prophet in Makkah had performed this miracle, the king divided his kingdom, sailed to Arabia, met Prophet Muhammad ﷺ, and accepted Islam under the name <strong>Tājuddīn</strong>. Companion <strong>Abū Sa‘īd Al-Khudrī</strong> narrates in <em>Al-Hākim's Mustadrak (#7373)</em>: <strong>"The King of India presented the Messenger of Allāh ﷺ with a jar of ginger; the Prophet ﷺ distributed it piece by piece to his companions, and gave me a piece to eat."</strong></p>
      <p>Passing away at Zafar (Salalah, Oman) on his return voyage, the king left royal letters carried by Mālik ibn Dīnār that led to the founding in <strong>629 CE</strong> of the <strong>Cheraman Juma Masjid</strong> in Kerala—the oldest mosque in India.</p>
    </div>
  </div>

  <div class="historians-proof-section">
    <div class="historians-header">🏛️ THE LONDON MANUSCRIPT ARCHIVE & HISTORICAL SOURCES</div>

    <div class="historian-quote-box">
      <div class="historian-name">1. The London Manuscript (British Library / India Office Library, MS. Arabic 2807)</div>
      <div class="historian-role">Cited by Prof. Muhammad Hamidullah in <em>Muhammad Rasulullah</em>:</div>
      <blockquote>"Preserved in London in the <em>India Office Library</em> (British Library) under catalog reference <strong>MS. Arabic 2807 (fols. 152–173 / 81a–104a)</strong>, titled <em>Qissat Shakarwati Farmad</em>, this manuscript records how the ruler of Malabar witnessed the splitting of the Moon from India, traveled to Arabia to meet the Prophet ﷺ, and authorized the building of Kerala's first mosque."</blockquote>
    </div>

    <div class="proof-links-bar">
      <span class="proof-links-label">🔗 Verifiable Historical Sources:</span>
      <a href="https://sunnah.com/bukhari:3636" target="_blank" rel="noopener" class="proof-link-pill">📘 Sahīh Al-Bukhārī (#3636)</a>
      <a href="https://sunnah.com/muslim:2800a" target="_blank" rel="noopener" class="proof-link-pill">📗 Sahīh Muslim (#2800)</a>
      <a href="https://en.wikipedia.org/wiki/Cheraman_Perumal_myths" target="_blank" rel="noopener" class="proof-link-pill">👑 King Cheraman Perumal (India)</a>
      <a href="https://en.wikipedia.org/wiki/Cheraman_Juma_Mosque" target="_blank" rel="noopener" class="proof-link-pill">🕌 Cheraman Juma Mosque (629 CE)</a>
      <a href="https://en.wikipedia.org/wiki/Muhammad_Hamidullah" target="_blank" rel="noopener" class="proof-link-pill">📜 Prof. Muhammad Hamidullah (MS. Arabic 2807)</a>
    </div>
  </div>
`;

const DEV_QAMAR_ES = `
  <div class="miracle-pillars-grid">
    <div class="miracle-pillar-card">
      <div class="pillar-badge">PRUEBA N°1 • TESTIMONIOS OCULARES MÚLTIPLES (MUTAWĀTIR)</div>
      <h4>🌙 La Luna partida en dos sobre el monte Hirā' en La Meca</h4>
      <p>Cinco años antes de la Hégira, los líderes politeístas de Quraysh desafiaron al Profeta Muhammad ﷺ a mostrarles un milagro celeste imposible de manipular. Con el permiso de Allah, la Luna se partió en dos mitades visibles a cada lado del monte Hirā', mientras el Profeta ﷺ decía: <strong>« ¡Sed testigos de ello! »</strong> (<em>Sahīh Al-Bukhārī n°3636 y Sahīh Muslim n°2800</em>).</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">PRUEBA N°2 • EL ARGUMENTO DE LOS VIAJEROS Y CARAVANAS</div>
      <h4>🐪 La confirmación de los viajeros procedentes del exterior</h4>
      <p>Cuando Abū Yahl afirmó que Muhammad ﷺ había hechizado sus ojos, los sabios de La Meca dijeron: <strong>« ¡Preguntad a las caravanas que vienen de fuera! Si pudo hechizarnos aquí, no pudo hechizar a quienes están lejos. »</strong> Al llegar los viajeros de todas las direcciones, todos confirmaron haber visto la Luna partirse aquella misma noche (<em>Sunan At-Tirmidhī n°3289, Al-Bayhaqī 2/266</em>).</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">PRUEBA N°3 • EL REY DE LA INDIA CHERAMAN PERUMAL Y EL MANUSCRITO DE LONDRES</div>
      <h4>📜 Observado desde Kerala (India) y conservado en la British Library</h4>
      <p>El rey de la dinastía Chera en la costa de Malabar (Kerala, India), <strong>Cheraman Perumal (Chakrawati Farmas)</strong>, contempló la partición de la Luna desde su palacio. Informado por mercaderes árabes sobre el Profeta ﷺ, viajó a Arabia, abrazó el Islam bajo el nombre de <strong>Tājuddīn</strong> y ofreció al Profeta ﷺ una jarra de jengibre (narrado por Abū Sa‘īd Al-Khudrī en <em>Al-Mustadrak de Al-Hākim n°7373</em>). Sus cartas reales dieron origen en el año <strong>629 d. C.</strong> a la <strong>Cheraman Juma Masjid</strong>, la mezquita más antigua de la India.</p>
    </div>
  </div>

  <div class="historians-proof-section">
    <div class="historians-header">🏛️ ARCHIVO DEL MANUSCRITO DE LONDRES Y FUENTES HISTÓRICAS</div>

    <div class="historian-quote-box">
      <div class="historian-name">1. El Manuscrito de Londres (British Library / India Office Library, MS. Arabic 2807)</div>
      <div class="historian-role">Citado por el Prof. Muhammad Hamidullah en su obra <em>Muhammad Rasulullah</em>:</div>
      <blockquote>« Conservado en Londres bajo la signatura <strong>MS. Arabic 2807 (fols. 152–173)</strong> con el título <em>Qissat Shakarwati Farmad</em>, documenta cómo el monarca de Malabar observó la partición de la Luna desde la India, viajó para encontrarse con el Profeta ﷺ y ordenó edificar la primera mezquita de Kerala. »</blockquote>
    </div>

    <div class="proof-links-bar">
      <span class="proof-links-label">🔗 Fuentes históricas verificables:</span>
      <a href="https://sunnah.com/bukhari:3636" target="_blank" rel="noopener" class="proof-link-pill">📘 Sahīh Al-Bukhārī (n°3636)</a>
      <a href="https://en.wikipedia.org/wiki/Cheraman_Perumal_myths" target="_blank" rel="noopener" class="proof-link-pill">👑 Rey Cheraman Perumal (India)</a>
      <a href="https://en.wikipedia.org/wiki/Cheraman_Juma_Mosque" target="_blank" rel="noopener" class="proof-link-pill">🕌 Mezquita Cheraman Juma (629 d.C.)</a>
    </div>
  </div>
`;

const DEV_QAMAR_AR = `
  <div class="miracle-pillars-grid">
    <div class="miracle-pillar-card">
      <div class="pillar-badge">الدليل الأول • التواتر القطعي في الصحيحين</div>
      <h4>🌙 انشقاق القمر فرقتين فوق جبل حراء بمكة المكرمة</h4>
      <p>سأل أهل مكة النبيَّ ﷺ أن يريهم آيةً سماوية لا يقدر عليها البشر، فأراهم انشقاق القمر فرقتين، فرقة من وراء جبل حراء وفرقة دونه، وقال لهم النبي ﷺ: <strong>«اشهدوا!»</strong>. وقد ثبتت هذه المعجزة بالأحاديث الصحيحة المتواترة في <em>صحيح البخاري (3636) وصحيح مسلم (2800)</em> عن جمع من الصحابة الذين شاهدوها بأعينهم كعبد الله بن مسعود وأنس بن مالك وجبير بن مطعم وابن عباس وابن عمر رضي الله عنهم.</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">الدليل الثاني • شهادة المسافرين والقوافل القادمة من الآفاق</div>
      <h4>🐪 حجة قريش على نفسها وتصديق السَّفْر من خارج مكة</h4>
      <p>لما رأى المشركون انشقاق القمر عيانًا لم ينكروا وقوعه، بل قالوا كما ذكر القرآن: ﴿سِحْرٌ مُّسْتَمِرٌّ﴾ (القمر: 2)، ثم قال عقلاؤهم: <strong>«انتظروا ما يأتيكم من السَّفْر (المسافرين)، فإن محمدًا لا يستطيع أن يسحر الناس كلهم!»</strong> فلما قدمت القوافل من كل وجه وسألوهم، شهدوا جميعًا أنهم رأوا القمر قد انشق في تلك الليلة بعينها (<em>رواه أحمد والترمذي 3289 والبيهقي في دلائل النبوة 2/266</em>).</p>
    </div>

    <div class="miracle-pillar-card">
      <div class="pillar-badge">الدليل الثالث • ملك الهند «شيرمان بيرومال» ومخطوطة لندن التاريخية</div>
      <h4>📜 رصد المعجزة في الهند (كيرلا) وحديث هدية الزنجبيل للنبي ﷺ</h4>
      <p>شاهد هذه المعجزة أيضًا ملك مالابار في جنوب غرب الهند (ولاية كيرلا حاليًا) المعروف بلقب <strong>شيرمان بيرومال (شكرورتي فرماض)</strong> من شرفة قصره، وسجّل تاريخها. ولما أخبره التجار العرب أن نبيًّا بمكة قد ظهرت على يديه هذه الآية، ترك ملكه ورحل إلى جزيرة العرب ولقي النبي ﷺ وأسلم وتسمّى <strong>تاج الدين</strong>. وقد روى أبو سعيد الخدري رضي الله عنه في <em>مستدرك الحاكم (7373)</em>: <strong>«أهدى ملك الهند إلى رسول الله ﷺ جرّة فيها زنجبيل، فأطعم أصحابه قطعةً قطعةً، وأطعمني منها قطعة»</strong>. وبأمره تأسس عام <strong>629م</strong> <strong>مسجد شيرمان جمعة</strong> في كيرلا، وهو أقدم مسجد في الهند.</p>
    </div>
  </div>

  <div class="historians-proof-section">
    <div class="historians-header">🏛️ وثيقة مخطوطة لندن بالمكتبة البريطانية والمصادر التاريخية</div>

    <div class="historian-quote-box">
      <div class="historian-name">1. مخطوطة لندن (British Library / India Office Library, MS. Arabic 2807)</div>
      <div class="historian-role">ذكرها العلامة محمد حميد الله في كتابه <em>محمد رسول الله ﷺ</em>:</div>
      <blockquote>« تُحفظ في المكتبة البريطانية بلندن (مكتبة المكتب الهندي) تحت رقم <strong>MS. Arabic 2807 (الأوراق 152-173)</strong> مخطوطة تاريخية بعنوان <em>"قصة شكرورتي فرماض"</em> توثّق رؤية ملك الهند لانشقاق القمر، ورحلته إلى النبي ﷺ وإسلامه، وتأسيس أول مسجد في الهند. »</blockquote>
    </div>

    <div class="proof-links-bar">
      <span class="proof-links-label">🔗 روابط المصادر التاريخية الموثقة:</span>
      <a href="https://sunnah.com/bukhari:3636" target="_blank" rel="noopener" class="proof-link-pill">📘 صحيح البخاري (3636)</a>
      <a href="https://en.wikipedia.org/wiki/Cheraman_Perumal_myths" target="_blank" rel="noopener" class="proof-link-pill">👑 ملك الهند شيرمان بيرومال</a>
      <a href="https://en.wikipedia.org/wiki/Cheraman_Juma_Mosque" target="_blank" rel="noopener" class="proof-link-pill">🕌 مسجد شيرمان جمعة (629م)</a>
    </div>
  </div>
`;

const MIRACLES_DE_BASE = {
  "30:1": {
    titre: "Les 3 Miracles de Sourate Ar-Rūm — La Mer Morte (-434m), la Victoire impossible en 3 à 9 ans & Badr",
    titreEn: "The 3 Miracles of Surah Ar-Rūm — The Dead Sea (-434m), the Impossible Victory in 3–9 Years & Badr",
    titreEs: "Los 3 Milagros de Sura Ar-Rūm — El Mar Muerto (-434m), la Victoria imposible en 3–9 años y Badr",
    titreAr: "المعجزات الثلاث في سورة الروم — أخفض الأرض (-434م)، والنصر المستحيل في بضع سنين، ويوم بدر",
    resume: "Révélée vers 616 alors que l'Empire romain d'Orient s'effondrait face aux Perses, cette sourate réunit 3 miracles : le point le plus bas sur Terre (la Mer Morte à -434 m), la victoire impossible des Romains dans un intervalle précis de 3 à 9 ans (confirmée par les historiens d'Oxford James Howard-Johnston et Edward Gibbon), et la victoire simultanée des 300 musulmans contre 1 000 à Badr.",
    resumeEn: "Revealed around 616 CE as the Eastern Roman Empire collapsed before the Persians, this surah unites 3 miracles: the lowest point on Earth (the Dead Sea at -434m), the impossible Roman victory within 3 to 9 years (attested by Oxford historian James Howard-Johnston and Edward Gibbon), and the simultaneous victory of 300 Muslims against 1,000 at Badr.",
    resumeEs: "Revelada hacia el 616 cuando el Imperio romano colapsaba ante los Persas, esta sura reúne 3 milagros: el punto más bajo de la Tierra (el Mar Muerto a -434m), la victoria imposible romana en 3 a 9 años (atestiguada por los historiadores James Howard-Johnston de Oxford y Edward Gibbon), y la victoria simultánea de 300 musulmanes contra 1.000 en Badr.",
    resumeAr: "نزلت عام 616م حين كانت دولة الروم تنهار أمام الفرس، فجمعت 3 معجزات باهرة: تحديد أخفض بقعة على الأرض (البحر الميت -434م)، والتنبؤ بانتصار الروم المستحيل في 3 إلى 9 سنين (بشهادة مؤرخ أكسفورد جيمس هوارد-جونستون وإدوارد غيبون)، وتزامن ذلك مع نصر 300 من المسلمين على 1000 يوم بدر.",
    developpement: DEV_RUM_FR,
    developpementEn: DEV_RUM_EN,
    developpementEs: DEV_RUM_ES,
    developpementAr: DEV_RUM_AR
  },
  "30:2": {
    titre: "Miracle Historique (1/3) — « Les Romains ont été vaincus » : L'effondrement de 616 attesté par Théophane et Gibbon",
    titreEn: "Historical Miracle (1/3) — 'The Romans have been defeated': The 616 Collapse Attested by Theophanes & Gibbon",
    titreEs: "Milagro Histórico (1/3) — « Los Romanos han sido vencidos »: El colapso de 616 según Teófanes y Gibbon",
    titreAr: "الإعجاز التاريخي (1/3) — ﴿غُلِبَتِ الرُّومُ﴾ : الانهيار التام عام 616م بشهادة ثيوفان وغيبون",
    resume: "En 616, les Byzantins perdent le Levant, Jérusalem et l'Égypte. Les Chroniques de Théophane et l'historien athée Edward Gibbon confirment que personne ne pensait que l'Empire romain pourrait survivre.",
    resumeEn: "In 616 CE, the Byzantines lost the Levant, Jerusalem, and Egypt. The Chronicles of Theophanes and historian Edward Gibbon confirm that nobody believed the Roman Empire could survive.",
    resumeEs: "En 616, los Bizantinos perdieron el Levante, Jerusalén y Egipto. Las Crónicas de Teófanes y el historiador Edward Gibbon confirman que nadie creía que el Imperio romano sobreviviera.",
    resumeAr: "في عام 616م خسر الروم الشام والقدس ومصر، وتؤكد حوليات ثيوفان والمؤرخ إدوارد غيبون أن الجميع ظن أن دولة الروم قد انتهت.",
    developpement: DEV_RUM_FR,
    developpementEn: DEV_RUM_EN,
    developpementEs: DEV_RUM_ES,
    developpementAr: DEV_RUM_AR
  },
  "30:3": {
    titre: "Miracle Géographique & Historique (2/3) — « Fī Adnā al-Ard » : La Mer Morte (-434 m) & le retournement « surnaturel »",
    titreEn: "Geographical & Historical Miracle (2/3) — 'Fī Adnā al-Ard': The Dead Sea (-434m) & the 'Supernatural' Reversal",
    titreEs: "Milagro Geográfico e Histórico (2/3) — « Fī Adnā al-Ard »: El Mar Muerto (-434m) y el giro « sobrenatural »",
    titreAr: "الإعجاز الجغرافي والتاريخي (2/3) — ﴿فِي أَدْنَى الْأَرْضِ﴾ : البحر الميت (-434م) والانقلاب الخارق للعادة",
    resume: "« Adnā al-Ard » désigne à la fois le pays voisin (le Shām) et la terre la plus basse sur Terre (le rivage de la Mer Morte à -434 m). Quant à la victoire annoncée, l'historien d'Oxford James Howard-Johnston la qualifie d'« intervention surnaturelle ».",
    resumeEn: "'Adnā al-Ard' means both the nearest land (Ash-Shām) and the lowest land on Earth (the Dead Sea shore at -434m). Oxford historian James Howard-Johnston describes the subsequent Roman victory as suggesting 'supernatural intervention'.",
    resumeEs: "« Adnā al-Ard » designa tanto la tierra cercana (Ash-Shām) como la tierra más baja del planeta (el Mar Muerto a -434m). El historiador de Oxford James Howard-Johnston califica la victoria romana como una « intervención sobrenatural ».",
    resumeAr: "«أدنى الأرض» تعني أقرب الأرض (الشام) وأخفض الأرض منسوبًا (شاطئ البحر الميت -434م)، وقد وصف مؤرخ أكسفورد جيمس هوارد-جونستون انتصار الروم بأنه يوحي بتدخل فوق طبيعي.",
    developpement: DEV_RUM_FR,
    developpementEn: DEV_RUM_EN,
    developpementEs: DEV_RUM_ES,
    developpementAr: DEV_RUM_AR
  },
  "30:4": {
    titre: "Miracle Mathématique & Prophétique (3/3) — « Dans quelques années (Bid‘i sinīn : 3 à 9 ans) » & le pari d'Abū Bakr",
    titreEn: "Mathematical & Prophetic Miracle (3/3) — 'Within a few years (Bid‘i sinīn: 3 to 9 years)' & Abū Bakr's Wager",
    titreEs: "Milagro Matemático y Profético (3/3) — « En pocos años (Bid‘i sinīn: 3 a 9 años) » y la apuesta de Abū Bakr",
    titreAr: "الإعجاز الغيبي (3/3) — ﴿فِي بِضْعِ سِنِينَ﴾ (3 إلى 9 سنين) ويقين النبي ﷺ في رهان أبي بكر",
    resume: "Le Prophète ﷺ ordonna à Abū Bakr d'augmenter son pari à 100 chamelles et de prolonger le délai au-delà de 3 ans car « Bid‘ » signifie 3 à 9 ans. Huit ans plus tard (en 624), les Romains écrasent les Perses le jour où les croyants triomphent à Badr.",
    resumeEn: "The Prophet ﷺ instructed Abū Bakr to raise his wager to 100 camels and extend the term beyond 3 years because 'Bid‘' means 3 to 9 years. Eight years later (in 624 CE), the Romans defeated the Persians as the Muslims triumphed at Badr.",
    resumeEs: "El Profeta ﷺ ordenó a Abū Bakr aumentar su apuesta a 100 camellas y ampliar el plazo porque « Bid‘ » significa de 3 a 9 años. Ocho años después (en 624), los Romanos vencieron a los Persas mientras los creyentes triunfaban en Badr.",
    resumeAr: "أمر النبي ﷺ أبا بكر بزيادة الرهان إلى 100 قلوص ومدّ الأجل لأن «البضع» من 3 إلى 9 سنين، فانتصر الروم بعد 8 سنوات (عام 624م) بالتزامن مع نصر المؤمنين يوم بدر.",
    developpement: DEV_RUM_FR,
    developpementEn: DEV_RUM_EN,
    developpementEs: DEV_RUM_ES,
    developpementAr: DEV_RUM_AR
  },
  "30:5": {
    titre: "Accomplissement de la Double Prophétie — « Du secours d'Allah » : 300 croyants contre 1 000 à la bataille de Badr",
    titreEn: "Fulfillment of the Double Prophecy — 'In the victory of Allah': 300 Believers Against 1,000 at the Battle of Badr",
    titreEs: "Cumplimiento de la Doble Profecía — « Con el auxilio de Allah »: 300 creyentes contra 1.000 en la batalla de Badr",
    titreAr: "تحقق الوعد الإلهي المزدوج — ﴿بِنَصْرِ اللَّهِ﴾ : انتصار 300 من المؤمنين على 1000 يوم بدر",
    resume: "Le jour même où les Romains renversaient les Perses en 624, Allah envoyait Ses Anges (Sourate 3:123-125) pour donner la victoire à 300 musulmans mal équipés contre 1 000 soldats de Quraysh à Badr, provoquant une vague de conversions à l'Islam.",
    resumeEn: "At the very time the Romans reversed the war against the Persians in 624 CE, Allah sent His Angels (Surah 3:123–125) to grant victory to 300 poorly equipped Muslims over 1,000 Quraishi soldiers at Badr, leading many to embrace Islam.",
    resumeEs: "En el mismo momento en que los Romanos vencían a los Persas en 624, Allah envió a Sus Ángeles (Sura 3:123-125) para dar la victoria a 300 musulmanes mal equipados frente a 1.000 soldados de Quraysh en Badr.",
    resumeAr: "في الوقت نفسه الذي انتصر فيه الروم على الفرس عام 624م، أنزل الله الملائكة (آل عمران: 123-125) لنصرة 300 من المسلمين على 1000 من المشركين يوم بدر، فدخل خلق كثير في الإسلام.",
    developpement: DEV_RUM_FR,
    developpementEn: DEV_RUM_EN,
    developpementEs: DEV_RUM_ES,
    developpementAr: DEV_RUM_AR
  },
  "54:1": {
    titre: "Miracle Prophétique & Historique — La fente de la Lune, les voyageurs de Quraysh & le Roi d'Inde Cheraman Perumal",
    titreEn: "Prophetic & Historical Miracle — The Splitting of the Moon, the Travelers & King Cheraman Perumal of India",
    titreEs: "Milagro Profético e Histórico — La partición de la Luna, los viajeros y el Rey Cheraman Perumal de la India",
    titreAr: "معجزة انشقاق القمر — شهادة الصحابة والمسافرين، وإسلام ملك الهند (مخطوطة لندن)",
    resume: "« L'Heure approche et la Lune s'est fendue. » Un miracle observé à La Mecque (rapporté par voies Mutawātir dans Al-Bukhārī et Muslim), confirmé par les caravanes de voyageurs extérieurs interrogées par Quraysh, et observé jusqu'en Inde par le roi du Kerala Cheraman Perumal (attesté par le Hadīth d'Al-Hākim, la mosquée de 629 ap. J.-C. et le Manuscrit de Londres MS. Arabic 2807 cité par Muhammad Hamidullah).",
    resumeEn: "'The Hour has drawn near and the Moon has split.' Witnessed in Makkah (Mutawātir in Al-Bukhārī & Muslim), confirmed by incoming caravans questioned by Quraysh, and observed in India by King Cheraman Perumal of Kerala (attested by Al-Hākim's Hadīth, the 629 CE Cheraman Mosque, and British Library MS. Arabic 2807 cited by Prof. Muhammad Hamidullah).",
    resumeEs: "« La Hora se acerca y la Luna se ha partido. » Milagro observado en La Meca (Al-Bukhārī y Muslim), confirmado por las caravanas de viajeros interrogadas por Quraysh, y presenciado en la India por el rey Cheraman Perumal de Kerala (documentado en la mezquita de 629 d.C. y el Manuscrito de Londres MS. Arabic 2807).",
    resumeAr: "﴿اقْتَرَبَتِ السَّاعَةُ وَانشَقَّ الْقَمَرُ﴾ معجزة حسية متواترة في البخاري ومسلم، أكّدتها القوافل القادمة من خارج مكة، ورصدها ملك الهند «شيرمان بيرومال» الذي رحل إلى النبي ﷺ وأسلم كما في مستدرك الحاكم ومخطوطة المكتبة البريطانية بلندن (MS. Arabic 2807).",
    developpement: DEV_QAMAR_FR,
    developpementEn: DEV_QAMAR_EN,
    developpementEs: DEV_QAMAR_ES,
    developpementAr: DEV_QAMAR_AR
  },
  "96:2": {
    titre: "Signe Embryologique — La création de l'homme à partir d'une adhérence ('Alaq)",
    titreEn: "Embryological Sign — The Creation of Man from a Clinging Substance ('Alaq)",
    titreEs: "Signo Embriológico — La creación del ser humano a partir de una adherencia ('Alaq)",
    titreAr: "آية خلق الإنسان — ﴿خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ﴾",
    resume: "Le terme arabe « 'Alaq » décrit l'embryon humain qui s'accroche à la paroi de l'utérus maternel et puise dans son sang.",
    resumeEn: "The Arabic term ''Alaq' describes the human embryo that clings to the maternal uterine wall and draws nourishment from its blood.",
    resumeEs: "El término árabe « 'Alaq » describe al embrión humano que se aferra a la pared del útero materno y se nutre de su sangre.",
    resumeAr: "يصف لفظ «علق» الجنين البشري الذي يتعلق ويلتصق بجدار رحم الأم ويتغذى من دمها.",
    developpement: `<p><strong>Analyse linguistique et exégétique :</strong> En langue arabe, le mot <em>« 'Alaq »</em> désigne toute chose qui s'accroche et reste suspendue, ainsi que le caillot sanguin et la sangsue qui adhère pour se nourrir du sang. Les exégètes classiques (At-Tabarī, Al-Qurtubī, Ibn Kathīr) expliquent qu'après le stade de la goutte (<em>Nutfah</em>), l'embryon s'accroche fermement à la paroi de l'utérus de la femme, description d'une précision remarquable révélée dès les tout premiers versets du Coran.</p>`,
    developpementEn: `<p><strong>Linguistic and Exegetical Analysis:</strong> In the Arabic language, the word <em>''Alaq'</em> denotes anything that clings and hangs suspended, as well as a blood clot and a leech that attaches itself to draw blood. Classical exegetes (At-Tabarī, Al-Qurtubī, Ibn Kathīr) explain that after the drop stage (<em>Nutfah</em>), the embryo firmly attaches itself to the wall of the mother's womb—a remarkably precise description revealed in the very first verses of the Quran.</p>`,
    developpementEs: `<p><strong>Análisis lingüístico y exegético:</strong> En lengua árabe, la palabra <em>« 'Alaq »</em> designa todo aquello que se aferra y queda suspendido, así como el coágulo de sangre y la sanguijuela que se adhiere para alimentarse de sangre. Los exégetas clásicos (At-Tabarī, Al-Qurtubī, Ibn Kathīr) explican que tras la etapa de la gota (<em>Nutfah</em>), el embrión se adhiere firmemente a la pared del útero de la mujer.</p>`,
    developpementAr: `<p><strong>البيان اللغوي والتفسيري:</strong> يدل لفظ «العلق» في اللغة العربية على كل ما يعلق ويلتصق، كما يطلق على الدم الجامد وعلى دودة العلق التي تتعلق لتمتص الدم. وقد بيّن أئمة التفسير أن الجنين بعد طور النطفة يصير علقة تتعلق بجدار رحم الأم.</p>`
  },
  "96:15": {
    titre: "Signe Anatomique — Le toupet / la région frontale « menteuse et fautive » (An-Nāsiyah)",
    titreEn: "Anatomical Sign — The 'Lying and Sinful' Forelock / Frontal Region (An-Nāsiyah)",
    titreEs: "Signo Anatómico — El copete / la región frontal « mentirosa y pecadora » (An-Nāsiyah)",
    titreAr: "دقة الوصف القرآني — ﴿نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ﴾",
    resume: "Le Coran désigne la zone située derrière le front (An-Nāsiyah) comme étant « menteuse et pécheresse ».",
    resumeEn: "The Quran designates the region located behind the forehead (An-Nāsiyah) as being 'lying and sinful'.",
    resumeEs: "El Corán señala la zona situada detrás de la frente (An-Nāsiyah) como « mentirosa y pecadora ».",
    resumeAr: "يصف القرآن الكريم مقدمة الرأس (الناصية) بأنها «كاذبة خاطئة».",
    developpement: `<p><strong>Précision du texte coranique :</strong> Dans les versets 15 et 16 de la Sourate Al-‘Alaq, Allāh dit à propos d'Abū Jahl : <em>« Nous le saisirons certes par le toupet (An-Nāsiyah), un toupet menteur et pécheur ! »</em> Au lieu de qualifier la langue de menteuse, le texte cible spécifiquement la région frontale supérieure du crâne (<em>Nāsiyah</em>), siège de l'élaboration des décisions, du mensonge et de l'obstination.</p>`,
    developpementEn: `<p><strong>Precision of the Quranic Text:</strong> In verses 15 and 16 of Surah Al-‘Alaq, Allāh says regarding Abū Jahl: <em>"We will surely drag him by the forelock (An-Nāsiyah)—a lying, sinful forelock!"</em> Instead of calling the tongue a liar, the Quranic text specifically targets the upper frontal region of the skull (<em>Nāsiyah</em>), the seat of decision-making and premeditated lying.</p>`,
    developpementEs: `<p><strong>Precisión del texto coránico:</strong> En los versículos 15 y 16 de la Sura Al-‘Alaq, Allah dice acerca de Abū Yahl: <em>« ¡Ciertamente lo agarraremos por el copete (An-Nāsiyah), un copete mentiroso y pecador! »</em> El texto apunta específicamente a la región frontal superior del cráneo (<em>Nāsiyah</em>), sede de las decisiones y la mentira premeditada.</p>`,
    developpementAr: `<p><strong>دقة التعبير القرآني:</strong> خصّ القرآن الكريم منطقة مقدمة الرأس والجبهة (الناصية) بوصف الكذب والخطيئة في قوله: ﴿نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ﴾، لأنها مركز التدبير والتخطيط واتخاذ القرار.</p>`
  },
  "23:14": {
    titre: "Signe Embryologique — Les étapes successives de la formation du fœtus",
    titreEn: "Embryological Sign — The Successive Stages of Fetal Development",
    titreEs: "Signo Embriológico — Las etapas sucesivas de la formación del feto",
    titreAr: "أطوار خلق الجنين — ﴿ثُمَّ خَلَقْنَا النُّطْفَةَ عَلَقَةً فَخَلَقْنَا الْعَلَقَةَ مُضْغَةً﴾",
    resume: "Description chronologique des stades : goutte (Nutfah), adhérence ('Alaqah), morceau de chair mâchée (Mudghah), ossature ('Idhām) puis enveloppement par la chair (Lahm).",
    resumeEn: "Chronological description of the stages: drop (Nutfah), clinging substance ('Alaqah), chewed-like lump (Mudghah), skeletal bones ('Idhām), then clothing the bones with flesh (Lahm).",
    resumeEs: "Descripción cronológica de las etapas: gota (Nutfah), adherencia ('Alaqah), bocado de carne masticada (Mudghah), estructura ósea ('Idhām) y revestimiento con carne (Lahm).",
    resumeAr: "وصف زمني متسلسل لأطوار الجنين: النطفة، ثم العلقة، ثم المضغة، ثم العظام، ثم كسوة العظام باللحم.",
    developpement: `<p><strong>L'ordre exact des stades embryonnaires :</strong> Ce verset détaille avec une terminologie précise la transformation graduelle dans l'utérus : de la goutte (<em>Nutfah</em>) à l'adhérence (<em>'Alaqah</em>) qui s'implante dans la paroi utérine, puis à la <em>Mudghah</em> (substance ayant l'aspect d'une chair mâchée portant l'empreinte des dents, semblable aux somites de l'embryon), suivie de la formation du squelette cartilagineux puis de son habillage par les muscles.</p>`,
    developpementEn: `<p><strong>Exact Sequence of Embryonic Stages:</strong> This verse details with precise terminology the gradual transformation inside the uterus: from the drop (<em>Nutfah</em>) to the clinging substance (<em>'Alaqah</em>), then to the <em>Mudghah</em> (resembling chewed flesh with somite marks), followed by the formation of the skeleton and its clothing with muscles.</p>`,
    developpementEs: `<p><strong>El orden exacto de las etapas embrionarias:</strong> Este versículo detalla con terminología precisa la transformación gradual en el útero: de la gota (<em>Nutfah</em>) a la adherencia (<em>'Alaqah</em>), luego a la <em>Mudghah</em>, seguida de los huesos y su revestimiento por los músculos.</p>`,
    developpementAr: `<p><strong>الترتيب الدقيق لأطوار الجنين:</strong> تفصّل الآية الكريمة التحول التدريجي في الرحم من النطفة إلى العلقة ثم المضغة ثم تكوين العظام وإحاطتها بالعضلات واللحم.</p>`
  },
  "10:92": {
    titre: "Signe Historique — La sauvegarde du corps de Pharaon comme signe pour les générations futures",
    titreEn: "Historical Sign — Preservation of Pharaoh's Body as a Sign for Future Generations",
    titreEs: "Signo Histórico — La preservación del cuerpo del Faraón como señal para las generaciones futuras",
    titreAr: "آية تاريخية — نجاة بدن فرعون ليكون آية لمن خلفه",
    resume: "« Aujourd'hui, Nous sauvons ton corps afin que tu sois un signe pour ceux qui viendront après toi. »",
    resumeEn: "'Today We will preserve your body so that you may be a sign for those who come after you.'",
    resumeEs: "« Hoy salvaremos tu cuerpo para que seas una señal para quienes vengan después de ti. »",
    resumeAr: "﴿فَالْيَوْمَ نُنَجِّيكَ بِبَدَنِكَ لِتَكُونَ لِمَنْ خَلْفَكَ آيَةً﴾.",
    developpement: `<p><strong>Le récit d'Ibn ‘Abbās dans les Tafsīrs :</strong> L'imam Ibn Kathīr et l'imam At-Tabarī rapportent d'après Ibn ‘Abbās que certains parmi les Enfants d'Israël doutaient de la mort de Pharaon. Allāh ordonna alors à la mer de rejeter son corps sans vie, revêtu de sa cuirasse, sur une hauteur du rivage afin que tous puissent constater sa mort et que sa dépouille demeure préservée comme une leçon à travers les siècles.</p>`,
    developpementEn: `<p><strong>The Account of Ibn ‘Abbās in the Tafsīrs:</strong> Imam Ibn Kathīr and Imam At-Tabarī report from Ibn ‘Abbās that some among the Children of Israel doubted Pharaoh's death. Allāh therefore commanded the sea to cast his lifeless body onto a raised bank of the shore so that his preserved corpse would remain a sign across the centuries.</p>`,
    developpementEs: `<p><strong>El relato de Ibn ‘Abbās en los Tafsīrs:</strong> El imam Ibn Kathīr y el imam At-Tabarī relatan de Ibn ‘Abbās que Allah ordenó al mar que arrojara el cuerpo sin vida del Faraón sobre una elevación de la costa para que permaneciera preservado como señal a través de los siglos.</p>`,
    developpementAr: `<p><strong>رواية ابن عباس في كتب التفسير:</strong> روى الإمام الطبري وابن كثير عن ابن عباس أن الله أمر البحر أن يلقي جسد فرعون ببدنه ودرعه على نجوة من الأرض ليبقى آية وعبرة للأجيال.</p>`
  },
  "55:19": {
    titre: "Signe Maritime — La barrière invisible (Barzakh) entre les deux mers",
    titreEn: "Marine Sign — The Invisible Barrier (Barzakh) Between the Two Seas",
    titreEs: "Signo Marítimo — La barrera invisible (Barzakh) entre los dos mares",
    titreAr: "آية البحار — ﴿مَرَجَ الْبَحْرَيْنِ يَلْتَقِيَانِ * بَيْنَهُمَا بَرْزَخٌ لَّا يَبْغِيَانِ﴾",
    resume: "« Il a donné libre cours aux deux mers pour se rencontrer ; il y a entre elles une barrière qu'elles ne dépassent pas. »",
    resumeEn: "'He released the two seas, meeting side by side; between them is a barrier they do not transgress.'",
    resumeEs: "« Él ha dejado fluir los dos mares para que se encuentren; entre ambos hay una barrera que no sobrepasan. »",
    resumeAr: "التقاء البحرين مع وجود حاجز خفي (برزخ) بقدرة الله يمنع طغيان أحدهما على الآخر.",
    developpement: `<p><strong>Les deux masses d'eau qui ne se confondent pas :</strong> Dans les versets 19 et 20 de la Sourate Ar-Rahmān (ainsi que dans Sourate Al-Furqān 25:53), Allāh décrit la rencontre entre deux masses d'eau (l'une douce et l'autre salée, ou deux mers contiguës) maintenues distinctes par une séparation (<em>Barzakh</em>) établie par la puissance divine afin que l'une n'altère pas la nature de l'autre.</p>`,
    developpementEn: `<p><strong>Two Bodies of Water That Do Not Merge:</strong> In verses 19 and 20 of Surah Ar-Rahmān (as well as in Surah Al-Furqān 25:53), Allāh describes the meeting of two bodies of water kept distinct by an unseen barrier (<em>Barzakh</em>) ordained by Divine power.</p>`,
    developpementEs: `<p><strong>Las dos masas de agua que no se confunden:</strong> En los versículos 19 y 20 de la Sura Ar-Rahmān, Allah describe el encuentro entre dos masas de agua mantenidas distintas por una separación (<em>Barzakh</em>) establecida por el poder divino.</p>`,
    developpementAr: `<p><strong>التقاء الكتلتين المائيتين دون طغيان:</strong> يصف الله عز وجل في سورة الرحمن (19-20) التقاء البحرين مع بقاء خصائص كلٍّ منهما محفوظة بفضل الحاجز الإلهي (البرزخ).</p>`
  },
  "111:1": {
    titre: "Prophétie Éclatante — La fin d'Abū Lahab annoncée dix ans à l'avance",
    titreEn: "Clear Prophecy — The Fate of Abū Lahab Foretold Ten Years in Advance",
    titreEs: "Profecía Clara — El destino de Abū Lahab anunciado con diez años de antelación",
    titreAr: "إعجاز غيبي باهر — الإخبار بموت أبي لهب على الكفر قبل هلاكه بعشر سنين",
    resume: "La Sourate Al-Masad annonce qu'Abū Lahab mourra dans la mécréance, alors qu'il aurait suffi à ce dernier de prononcer une fausse conversion en dix ans pour tenter de contredire le Coran.",
    resumeEn: "Surah Al-Masad announced that Abū Lahab would die in disbelief, even though he could have simply uttered a fake conversion at any point during ten years to try to contradict the Quran.",
    resumeEs: "La Sura Al-Masad anuncia que Abū Lahab morirá en la incredulidad, aunque le habría bastado pronunciar una falsa conversión durante diez años para intentar contradecir el Corán.",
    resumeAr: "أعلنت سورة المسد أن أبا لهب سيموت على الكفر والنار، مع أنه كان يكفيه طوال عشر سنين أن ينطق بالشهادتين ولو نفاقًا ليزعم معارضة القرآن.",
    developpement: `<p><strong>La preuve soulignée par les savants :</strong> Les exégètes (dont Al-Qurtubī et Ibn Kathīr) font remarquer que cette sourate fut révélée à La Mecque plus de dix ans avant la mort d'Abū Lahab (survenue peu après la bataille de Badr). Durant toute cette décennie, Abū Lahab cherchait par tous les moyens à démentir le Prophète ﷺ. Il lui aurait suffi de déclarer publiquement (même par hypocrisie) : <em>« Je suis devenu musulman ! »</em> pour prétendre que le Coran s'était trompé. Pourtant, il ne put jamais le faire et mourut exactement comme le Coran l'avait décrété.</p>`,
    developpementEn: `<p><strong>The Proof Highlighted by the Scholars:</strong> Classical exegetes (including Al-Qurtubī and Ibn Kathīr) point out that this surah was revealed in Makkah more than ten years before the death of Abū Lahab. All he had to do was declare publicly (even out of hypocrisy): <em>"I have become a Muslim!"</em> to claim that the Quran was wrong. Yet he was never able to do so and died in disbelief exactly as decreed.</p>`,
    developpementEs: `<p><strong>La prueba destacada por los sabios:</strong> Los exégetas señalan que esta sura fue revelada en La Meca más de diez años antes de la muerte de Abū Lahab. Le habría bastado declarar públicamente (incluso por hipocresía): <em>« ¡Me he hecho musulmán! »</em> para pretender que el Corán se había equivocado, pero murió exactamente como el Corán decretó.</p>`,
    developpementAr: `<p><strong>الحجة الباهرة التي أبرزها العلماء:</strong> نزلت هذه السورة بمكة قبل هلاك أبي لهب بأكثر من عشر سنين، وكان يكفيه أن يتظاهر بالإسلام كذبًا ليطعن في الآية، لكنه لم يستطع ذلك قط ومات على الكفر كما قضى الله.</p>`
  }
};

const TAFSIR_INTEGRAL_DE_BASE_FR = {
  "2:3": "<strong style='color:#ffffff;'>Ce verset désigne les pieux qui croient fermement à l'Invisible</strong> — c'est-à-dire tout ce qui ne peut être perçu par les sens ni par la seule raison, mais que nous connaissons uniquement grâce à la révélation d'Allāh et de Son Messager, comme les Anges, le Paradis, l'Enfer et le Jour Dernier.<br><br>Ils accomplissent également la prière (la Salât) conformément aux commandements d'Allāh et aux enseignements du Prophète ﷺ, et dépensent une partie des biens qu'Allāh leur a accordés en s'acquittant de l'aumône obligatoire (la Zakât) ainsi que des aumônes volontaires (Sadaqah), dans l'espoir d'être récompensés par Allāh.",
  "2:4": "<strong style='color:#ffffff;'>Ces croyants sincères ont foi en la Révélation qu'Allāh t'a descendue (ô Muhammad), à savoir le Noble Coran,</strong> ainsi qu'en tous les Livres divins révélés aux Prophètes et Messagers avant toi (comme la Torah, l'Évangile et les Psaumes), sans faire aucune distinction entre les Envoyés d'Allāh. Et ils ont une certitude absolue quant à la vie de l'Au-delà, à la résurrection, au jugement, à la récompense du Paradis et au châtiment de l'Enfer.",
  "2:6": "<strong style='color:#ffffff;'>Quant à ceux qui rejettent obstinément la foi (les mécréants), ils persistent dans leur égarement et leur obstination à refuser la vérité.</strong> Que tu les avertisses (ô Muhammad) du châtiment d'Allāh ou que tu ne les avertisses pas, cela leur est tout à fait égal : ils n'auront pas la foi, car ils ont choisi de fermer leurs cœurs à la guidée."
};

const cheminMemoire = path.join(__dirname, 'memoire-site.json');
let memoireGlobale = { miracles: {}, tafsirFr: {}, tafsirEn: {}, tafsirEs: {}, tafsirAr: {} };
if (fs.existsSync(cheminMemoire)) {
  try {
    const lu = JSON.parse(fs.readFileSync(cheminMemoire, 'utf8'));
    if (lu && typeof lu === 'object') {
      memoireGlobale.miracles = Object.assign({}, lu.miracles || {});
      memoireGlobale.tafsirFr = Object.assign({}, lu.tafsirFr || {});
      memoireGlobale.tafsirEn = Object.assign({}, lu.tafsirEn || {});
      memoireGlobale.tafsirEs = Object.assign({}, lu.tafsirEs || {});
      memoireGlobale.tafsirAr = Object.assign({}, lu.tafsirAr || {});
    }
  } catch (e) {}
}
Object.assign(MIRACLES_DE_BASE, {
  "10:92": {
    "titre": "Miracle Historique — La sauvegarde du corps de Pharaon (« Nunajjīka bi-badanika ») comme signe pour les générations futures",
    "titreEn": "Historical Miracle — Preservation of Pharaoh's Body ('Nunajjīka bi-badanika') as a Sign for Future Generations",
    "titreEs": "Milagro Histórico — La preservación del cuerpo del Faraón (« Nunajjīka bi-badanika ») como señal para la posteridad",
    "titreAr": "الإعجاز التاريخي — نجاة بدن فرعون ﴿فَالْيَوْمَ نُنَجِّيكَ بِبَدَنِكَ لِتَكُونَ لِمَنْ خَلْفَكَ آيَةً﴾",
    "resume": "« Aujourd'hui, Nous sauvons ton corps afin que tu sois un signe pour ceux qui viendront après toi. » Alors que toute l'armée égyptienne fut engloutie au fond de la mer et que le sort des dépouilles royales était inconnu au VIIe siècle, le Coran affirme que le corps physique de Pharaon a été épargné de la destruction pour demeurer un témoin visible à travers les siècles.",
    "resumeEn": "'Today We will preserve your body so that you may be a sign for those who come after you.' While the entire Egyptian army was swallowed by the sea and the fate of royal bodies was unknown in the 7th century, the Quran states that Pharaoh's physical body was spared destruction to remain a visible sign across the ages.",
    "resumeEs": "« Hoy salvaremos tu cuerpo para que seas una señal para quienes vengan después de ti. » Mientras todo el ejército egipcio fue tragado por el mar, el Corán afirma que el cuerpo físico del Faraón fue preservado de la destrucción para permanecer como señal visible a través de los siglos.",
    "resumeAr": "﴿فَالْيَوْمَ نُنَجِّيكَ بِبَدَنِكَ لِتَكُونَ لِمَنْ خَلْفَكَ آيَةً﴾ بينما غرق جيش فرعون بالكامل، أخبر القرآن الكريم أن جسد فرعون وحده سيسلم من الفناء ليبقى آيةً مشاهَدةً للأجيال اللاحقة.",
    "developpement": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PREUVE N°1 • PRÉCISION DU TERME CORANIQUE « BADAN »</div>\n          <h4>🌊 « Nunajjīka bi-badanika » : La sauvegarde du corps sans l'âme</h4>\n          <p>En langue arabe, le mot <strong>« Badan » (بَدَن)</strong> désigne spécifiquement le corps physique dépouillé de vie (ainsi que la cotte de mailles). Alors que la Bible mentionne uniquement que Pharaon et son armée furent engloutis dans la mer (<em>Exode 14:28</em>), le Coran apporte une révélation singulière : <strong>le corps physique de Pharaon ne disparaîtra pas dans les abysses</strong>, mais sera préservé comme un signe matériel pour les générations futures (<em>« li-takūna li-man khalfaka āyah »</em>).</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PREUVE N°2 • LE RÉCIT HISTORIQUE D'IBN ‘ABBĀS DANS LES TAFSĪRS</div>\n          <h4>📜 Le corps rejeté sur le rivage pour lever tout doute</h4>\n          <p>Les imams <strong>At-Tabarī (Tafsīr 15/193)</strong> et <strong>Ibn Kathīr</strong> rapportent d'après le compagnon <strong>‘Abdullāh ibn ‘Abbās</strong> que certains parmi les Enfants d'Israël doutaient de la mort réelle de Pharaon tant sa tyrannie les avait terrifiés. Allāh ordonna alors à la mer de rejeter sa dépouille intacte, revêtue de sa cuirasse connue, sur une élévation du littoral (<em>Najwah</em>) afin que tous constatent sa mort de leurs propres yeux avant que son corps ne soit recueilli et embaumé selon les rites royaux égyptiens.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PREUVE N°3 • DÉCOUVERTE DES MOMIES ROYALES DU NOUVEL EMPIRE (1881–1898)</div>\n          <h4>🏛️ De la Vallée des Rois au Musée du Caire</h4>\n          <p>Au VIIe siècle en Arabie, personne ne savait que les corps des pharaons du Nouvel Empire (époque de Moïse / Mūsā) avaient survécu : leurs tombes étaient enfouies sous les roches de Thèbes depuis près de deux millénaires. Ce n'est qu'à la fin du XIXe siècle (en <strong>1881</strong> dans la cachette royale de Deir el-Bahari, puis en <strong>1898</strong> par Victor Loret dans la tombe KV35) que les momies des pharaons de l'époque de l'Exode — notamment <strong>Ramsès II</strong> et son fils <strong>Merneptah</strong> — furent exhumées et exposées aux yeux du monde entier au Caire, accomplissant littéralement la parole divine : <em>« afin que tu sois un signe pour ceux qui viendront après toi »</em>.</p>\n        </div>\n      </div>\n      <div class=\"historians-proof-section\">\n        <div class=\"historians-header\">🔗 SOURCES EXÉGÉTIQUES & ARCHÉOLOGIQUES VÉRIFIABLES</div>\n        <div class=\"proof-links-bar\">\n          <a href=\"https://fr.wikipedia.org/wiki/Momie_de_Rams%C3%A8s_II\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🏛️ Momie royale de Ramsès II</a>\n          <a href=\"https://fr.wikipedia.org/wiki/Merneptah\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">👑 Momie de Merneptah (KV35, 1898)</a>\n          <a href=\"https://fr.wikipedia.org/wiki/Mus%C3%A9e_national_de_la_civilisation_%C3%A9gyptienne\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🏺 Musée National du Caire (NMEC)</a>\n        </div>\n      </div>",
    "developpementEn": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PROOF #1 • PRECISION OF THE ARABIC TERM 'BADAN'</div>\n          <h4>🌊 'Nunajjīka bi-badanika': Saving the Lifeless Physical Body</h4>\n          <p>While the biblical account only mentions that Pharaoh's army drowned in the sea (<em>Exodus 14:28</em>), the Quran reveals a unique historical detail: Pharaoh's physical body (<strong>'Badan'</strong>) would not be lost in the depths, but preserved as a visible sign for future generations (<em>'li-takūna li-man khalfaka āyah'</em>).</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PROOF #2 • THE ACCOUNT OF IBN ‘ABBĀS IN CLASSICAL TAFSĪR</div>\n          <h4>📜 Cast Upon the Raised Shore Before Royal Embalming</h4>\n          <p>Imam <strong>At-Tabarī (15/193)</strong> and <strong>Ibn Kathīr</strong> record from <strong>Ibn ‘Abbās</strong> that some among the Children of Israel doubted Pharaoh had truly died. Allāh commanded the sea to cast his intact body onto a raised bank (<em>Najwah</em>) so all could witness his death before his body was recovered and mummified.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PROOF #3 • REDISCOVERY OF THE NEW KINGDOM ROYAL MUMMIES (1881–1898)</div>\n          <h4>🏛️ Hidden for Millennia, Now Displayed in Cairo</h4>\n          <p>In 7th-century Arabia, no one knew the bodies of the New Kingdom Pharaohs still existed, buried deep in the Theban hills. Only in <strong>1881</strong> (Deir el-Bahari) and <strong>1898</strong> (KV35) were the mummies of <strong>Ramesses II</strong> and <strong>Merneptah</strong> discovered and placed on public display in Cairo as a sign for modern humanity.</p>\n        </div>\n      </div>\n      <div class=\"historians-proof-section\">\n        <div class=\"historians-header\">🔗 VERIFIABLE HISTORICAL & ARCHAEOLOGICAL SOURCES</div>\n        <div class=\"proof-links-bar\">\n          <a href=\"https://en.wikipedia.org/wiki/Ramesses_II#Mummy\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🏛️ Mummy of Ramesses II</a>\n          <a href=\"https://en.wikipedia.org/wiki/Merneptah#Mummy\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">👑 Mummy of Merneptah (KV35)</a>\n          <a href=\"https://en.wikipedia.org/wiki/National_Museum_of_Egyptian_Civilization\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🏺 Cairo National Museum (NMEC)</a>\n        </div>\n      </div>",
    "developpementEs": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PRUEBA N°1 • PRECISIÓN DEL TÉRMINO ÁRABE « BADAN »</div>\n          <h4>🌊 « Nunajjīka bi-badanika »: La preservación del cuerpo físico</h4>\n          <p>Mientras que el relato bíblico solo menciona el ahogamiento del ejército en el mar (<em>Éxodo 14:28</em>), el Corán revela que el cuerpo físico (<strong>« Badan »</strong>) del Faraón sería salvado de la destrucción para ser una señal visible para las generaciones futuras.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PRUEBA N°2 • EL RELATO DE IBN ‘ABBĀS EN AT-TABARĪ E IBN KATHĪR</div>\n          <h4>📜 Arrojado a la costa para disipar toda duda</h4>\n          <p>Los imames <strong>At-Tabarī (15/193)</strong> e <strong>Ibn Kathīr</strong> relatan de <strong>Ibn ‘Abbās</strong> que Allah ordenó al mar arrojar su cadáver intacto con su armadura sobre una elevación de la costa para que los Hijos de Israel comprobaran su muerte.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PRUEBA N°3 • DESCUBRIMIENTO DE LAS MOMIAS REALES (1881–1898)</div>\n          <h4>🏛️ Del Valle de los Reyes al Museo de El Cairo</h4>\n          <p>Ocultas durante milenios bajo tierra y desconocidas en el siglo VII, las momias reales del Imperio Nuevo (como <strong>Ramsés II</strong> y <strong>Merneptah</strong>) fueron halladas en <strong>1881</strong> y <strong>1898</strong> y hoy se exhiben ante el mundo entero en El Cairo.</p>\n        </div>\n      </div>",
    "developpementAr": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الدليل الأول • دقة اللفظ القرآني ﴿نُنَجِّيكَ بِبَدَنِكَ﴾</div>\n          <h4>🌊 نجاة الجسد الهامد دون الروح ليكون آيةً مشاهَدة</h4>\n          <p>بينما تذكر التوراة غرق فرعون وجيشه في اليم فحسب، انفرد القرآن الكريم بالإخبار عن نجاة <strong>«بدن»</strong> فرعون (أي جسده بغير روح) من الضياع والتحلل في قاع البحر، ليبقى آيةً حسيةً لمن يأتي بعده من القرون.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الدليل الثاني • رواية ابن عباس في تفسير الطبري وابن كثير</div>\n          <h4>📜 إلقاء البحر لجسده على نجوةٍ من الأرض</h4>\n          <p>روى الإمام <strong>الطبري (15/193)</strong> و<strong>ابن كثير</strong> عن <strong>عبد الله بن عباس</strong> رضي الله عنهما أن بعض بني إسرائيل شكّوا في موت فرعون، فأمر الله البحر أن يرمي به على نجوةٍ (مكان مرتفع من الساحل) ببدنه ودرعه حتى تحقّقوا هلاكه.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الدليل الثالث • اكتشاف المومياوات الملكية (1881–1898م)</div>\n          <h4>🏛️ من خبيئة الدير البحري ووادي الملوك إلى العرض في متحف القاهرة</h4>\n          <p>لم يكن أحد في القرن السابع الميلادي يعلم بمكان أجساد فراعنة الخروج المطمورة في جبال طيبة، حتى كُشف عنها عام <strong>1881م</strong> و<strong>1898م</strong> (مومياوات رمسيس الثاني ومرنبتاح) وصارت معروضةً للناس كافة في المتحف القومي للحضارة المصرية بالقاهرة، تصديقًا لقوله تعالى: ﴿لِتَكُونَ لِمَنْ خَلْفَكَ آيَةً﴾.</p>\n        </div>\n      </div>"
  },
  "23:14": {
    "titre": "Miracle Embryologique — La chronologie exacte des stades du fœtus (Nutfah, ‘Alaqah, Mudghah, ‘Idhām et Lahm)",
    "titreEn": "Embryological Miracle — The Exact Chronology of Fetal Stages (Nutfah, ‘Alaqah, Mudghah, ‘Idhām & Lahm)",
    "titreEs": "Milagro Embriológico — La cronología exacta de las etapas fetales (Nutfah, ‘Alaqah, Mudghah, ‘Idhām y Lahm)",
    "titreAr": "الإعجاز الجنيني — الترتيب الدقيق لأطوار الجنين ﴿ثُمَّ خَلَقْنَا النُّطْفَةَ عَلَقَةً فَخَلَقْنَا الْعَلَقَةَ مُضْغَةً﴾",
    "resume": "Ce verset décrit avec une précision morphologique et chronologique saisissante les stades successifs du développement embryonnaire : de la goutte (Nutfah) à l'adhérence irriguée (‘Alaqah), puis au stade de chair mâchée (Mudghah ressemblant aux somites), suivi de la formation de l'ossature cartilagineuse (‘Idhām) puis de son enveloppement par les muscles (Lahm).",
    "resumeEn": "This verse describes with striking morphological and chronological accuracy the successive stages of embryonic development: from the drop (Nutfah) to the clinging substance (‘Alaqah), then the chewed-like lump (Mudghah resembling somites), followed by the cartilaginous skeleton (‘Idhām) and its clothing with muscles (Lahm).",
    "resumeEs": "Este versículo describe con extraordinaria precisión morfológica y cronológica las etapas sucesivas del desarrollo embrionario: de la gota (Nutfah) a la adherencia (‘Alaqah), luego la masa de aspecto masticado (Mudghah), seguida del esqueleto (‘Idhām) y su revestimiento muscular (Lahm).",
    "resumeAr": "تفصّل الآية الكريمة بتسلسلٍ زمنيّ ووصفيّ معجز أطوار الجنين البشري: من النطفة، إلى العلقة المتعلقة بجدار الرحم، ثم المضغة المخلّقة، ثم تكوين الهيكل الغضروفي والعظمي، ثم كسوته بالعضلات واللحم.",
    "developpement": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">STADE N°1 & 2 • « NUTFAH » PUIS « ‘ALAQAH » (JOURS 1 À 21)</div>\n          <h4>🧬 De la goutte fécondée à l'embryon suspendu dans la paroi utérine</h4>\n          <p>Le développement débute par la <strong>« Nutfah »</strong> (une infime quantité de liquide fécondant), qui se transforme en <strong>« ‘Alaqah »</strong> (du 7e au 21e jour) : l'embryon s'accroche fermement à l'endomètre maternel par le cordon conjonctif, se nourrit du sang de la mère et adopte une forme arquée identique à celle d'une sangsue microscopique.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">STADE N°3 • « MUDGHAH » (SEMAINES 4 À 5)</div>\n          <h4>🔬 L'apparition des somites semblables à des marques de dents</h4>\n          <p>Le Coran utilise la conjonction <strong>« Fa » (فَ)</strong> (qui exprime en arabe une succession rapide) : <em>« Fa-khalaqnā al-‘alaqata mudghatan »</em>. Vers le 24e–28e jour, l'embryon se couvre de <strong>somites</strong> (de petits reliefs alignés le long du tube neural) qui lui donnent très exactement l'aspect d'un morceau de chair mâchée portant l'empreinte de dents (sens littéral du mot <strong>« Mudghah »</strong>).</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">STADE N°4 & 5 • « ‘IDHĀM » PUIS « LAHM » (SEMAINES 6 À 8)</div>\n          <h4>🦴 Formation de la matrice osseuse avant l'enveloppement musculaire</h4>\n          <p>Contrairement aux croyances grecques antiques d'Aristote et de Galien (qui imaginaient le fœtus formé d'un bloc à partir du sang menstruel), le Coran distingue deux phases successives : la différenciation de la charpente cartilagineuse et osseuse (<strong>« ‘Idhām »</strong>) à partir de la 6e semaine, immédiatement suivie (<em>« Fa-kasawnā al-‘idhāma lahman »</em>) par la migration des myoblastes qui viennent envelopper et habiller les os pour former les muscles (<strong>« Lahm »</strong>).</p>\n        </div>\n      </div>\n      <div class=\"historians-proof-section\">\n        <div class=\"historians-header\">🔗 SOURCES EXÉGÉTIQUES & EMBRYOLOGIQUES VÉRIFIABLES</div>\n        <div class=\"proof-links-bar\">\n          <a href=\"https://fr.wikipedia.org/wiki/Somite\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🔬 Somites embryonnaires (Stade Mudghah)</a>\n          <a href=\"https://fr.wikipedia.org/wiki/Embryogen%C3%A8se_humaine\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🧬 Chronologie de l'embryogenèse humaine</a>\n          <a href=\"https://fr.wikipedia.org/wiki/Ost%C3%A9ogen%C3%A8se\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🦴 Ostéogenèse & Myogenèse</a>\n        </div>\n      </div>",
    "developpementEn": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">STAGES #1 & 2 • 'NUTFAH' TO '‘ALAQAH' (DAYS 1–21)</div>\n          <h4>🧬 From the Fertilized Drop to the Clinging Embryo</h4>\n          <p>Development begins with the <strong>'Nutfah'</strong> (a minute drop), which transitions into the <strong>'‘Alaqah'</strong>: the blastocyst implants into the uterine wall, hangs suspended by the connecting stalk, and draws nourishment from the maternal blood.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">STAGE #3 • 'MUDGHAH' (WEEKS 4–5)</div>\n          <h4>🔬 Somites Resembling Teeth Marks on Chewed Flesh</h4>\n          <p>Around days 24–28, bead-like ridges called <strong>somites</strong> appear along the embryo's back, giving it the exact visual appearance of a substance bearing teeth marks—the literal Arabic meaning of <strong>'Mudghah'</strong>.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">STAGES #4 & 5 • '‘IDHĀM' THEN 'LAHM' (WEEKS 6–8)</div>\n          <h4>🦴 Cartilaginous Skeleton Preceding Muscle Attachment</h4>\n          <p>Refuting ancient Greek theories (Aristotle and Galen), the Quran specifies that the skeletal framework (<strong>'‘Idhām'</strong>) forms first, followed by myoblasts wrapping around the bones to form muscles (<strong>'Lahm'</strong>).</p>\n        </div>\n      </div>\n      <div class=\"historians-proof-section\">\n        <div class=\"historians-header\">🔗 VERIFIABLE EMBRYOLOGICAL SOURCES</div>\n        <div class=\"proof-links-bar\">\n          <a href=\"https://en.wikipedia.org/wiki/Somite\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🔬 Embryonic Somites (Mudghah)</a>\n          <a href=\"https://en.wikipedia.org/wiki/Human_embryogenesis\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🧬 Human Embryogenesis</a>\n        </div>\n      </div>",
    "developpementEs": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">ETAPAS N°1 Y 2 • « NUTFAH » Y « ‘ALAQAH » (DÍAS 1 A 21)</div>\n          <h4>🧬 De la gota fecundada al embrión adherido al útero</h4>\n          <p>El desarrollo comienza con la <strong>« Nutfah »</strong> y pasa a la <strong>« ‘Alaqah »</strong>, cuando el embrión se implanta en la pared uterina y se nutre de la sangre materna.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">ETAPA N°3 • « MUDGHAH » (SEMANAS 4 A 5)</div>\n          <h4>🔬 Los somitas con aspecto de marcas de dientes</h4>\n          <p>Hacia el día 24–28 aparecen los <strong>somitas</strong> a lo largo del dorso embrionario, dándole el aspecto exacto de carne masticada (<strong>« Mudghah »</strong>).</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">ETAPAS N°4 Y 5 • « ‘IDHĀM » Y « LAHM » (SEMANAS 6 A 8)</div>\n          <h4>🦴 Formación del esqueleto antes del revestimiento muscular</h4>\n          <p>El Corán precisa que primero se modela la estructura ósea (<strong>« ‘Idhām »</strong>) y acto seguido los músculos (<strong>« Lahm »</strong>) envuelven los huesos.</p>\n        </div>\n      </div>",
    "developpementAr": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الطور الأول والثاني • «النطفة» ثم «العلقة» (الأيام 1 إلى 21)</div>\n          <h4>🧬 من النطفة الأمشاج إلى العلقة المتعلقة بجدار الرحم</h4>\n          <p>يبدأ تخلّق الإنسان من <strong>«النطفة»</strong> ثم يتحول إلى <strong>«علقة»</strong> تنغرس في بطانة الرحم وتتعلق بها وتتغذى من دم الأم، وتأخذ شكلًا مطابقًا لدودة العلق.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الطور الثالث • «المضغة» (الأسبوع الرابع والخامس)</div>\n          <h4>🔬 ظهور الكتل البدنية (Somites) كطبعة الأسنان في اللحم الممضوغ</h4>\n          <p>في الأسبوع الرابع تظهر على ظهر الجنين كتلٌ متراصة (الفلقات البدنية) تجعله مطابقًا في مظهره لقطعة لحمٍ عليها آثار الأسنان، وهو المعنى الدقيق للفظ <strong>«المضغة»</strong>.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الطور الرابع والخامس • «العظام» ثم كسوتها «باللحم» (الأسبوع 6 إلى 8)</div>\n          <h4>🦴 سبق التشكّل الهيكلي ثم إحاطته بالعضلات</h4>\n          <p>خلافًا لظنون الفلاسفة والأطباء القدماء (كأرسطو وجالينوس)، فرّق القرآن بدقة بالغة بين طور تشكّل الهيكل الغضروفي والعظمي <strong>﴿فَخَلَقْنَا الْمُضْغَةَ عِظَامًا﴾</strong> ثم إحاطة العظام بالعضلات <strong>﴿فَكَسَوْنَا الْعِظَامَ لَحْمًا﴾</strong> بحرف الفاء الدال على الترتيب والتعقيب.</p>\n        </div>\n      </div>"
  },
  "55:19": {
    "titre": "Miracle Océanographique — La barrière invisible (Barzakh) entre les deux mers qui se rencontrent",
    "titreEn": "Oceanographic Miracle — The Unseen Barrier (Barzakh) Between Two Meeting Seas",
    "titreEs": "Milagro Oceanográfico — La barrera invisible (Barzakh) entre los dos mares que se encuentran",
    "titreAr": "الإعجاز في علوم البحار — ﴿مَرَجَ الْبَحْرَيْنِ يَلْتَقِيَانِ * بَيْنَهُمَا بَرْزَخٌ لَّا يَبْغِيَانِ﴾",
    "resume": "« Il a donné libre cours aux deux mers pour se rencontrer ; il y a entre elles une barrière (Barzakh) qu'elles ne dépassent pas. » L'océanographie moderne confirme que lorsque deux mers de salinité, de température et de densité différentes se rencontrent (comme la Méditerranée et l'Atlantique à Gibraltar), une zone de transition physique (pycnocline / halocline) empêche leur fusion immédiate.",
    "resumeEn": "'He released the two seas, meeting side by side; between them is a barrier (Barzakh) they do not transgress.' Modern oceanography confirms that where two seas of different salinity, temperature, and density meet (such as the Mediterranean and the Atlantic at Gibraltar), a physical transition zone (pycnocline / halocline) prevents them from immediately merging.",
    "resumeEs": "« Él ha dejado fluir los dos mares para que se encuentren; entre ambos hay una barrera (Barzakh) que no sobrepasan. » La oceanografía moderna confirma que cuando se encuentran dos mares de diferente salinidad y densidad (como en el estrecho de Gibraltar), una frontera física (haloclina / picnoclina) mantiene sus propiedades distintas.",
    "resumeAr": "﴿مَرَجَ الْبَحْرَيْنِ يَلْتَقِيَانِ * بَيْنَهُمَا بَرْزَخٌ لَّا يَبْغِيَانِ﴾ أثبتت علوم البحار الحديثة أنه عند التقاء بحرين مختلفين في الملوحة والحرارة والكثافة (كالبحر المتوسط والمحيط الأطلسي عند مضيق جبل طارق)، يقوم حاجزٌ فيزيائي مائي يحفظ لكل بحرٍ خصائصه.",
    "developpement": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PREUVE N°1 • LE SENS PRÉCIS DE « MARAJA » ET « BARZAKH »</div>\n          <h4>🌊 Deux masses d'eau en contact direct mais maintenues distinctes</h4>\n          <p>Dans les versets 19 et 20 de la Sourate Ar-Rahmān, Allāh dit : <em>« Maraja al-bahrayni yaltaqiyān, baynahumā barzakhun lā yabghiyān »</em>. À l'œil nu, deux mers contiguës semblent former une seule étendue d'eau homogène. Pourtant, le Coran révèle qu'au lieu même de leur rencontre (<em>Yaltaqiyān</em>), il existe une barrière dynamique invisible (<strong>« Barzakh »</strong>) qui empêche l'une de dissoudre immédiatement les caractéristiques de l'autre (<em>Lā yabghiyān</em>).</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PREUVE N°2 • LA HALOCLINE & LA PYCNOCLINE (DÉTROIT DE GIBRALTAR & BAB EL-MANDEB)</div>\n          <h4>🧭 La découverte des frontières océaniques au XXe siècle</h4>\n          <p>Les campagnes océanographiques modernes (notamment après l'expédition du <em>Challenger</em> et les relevés par capteurs de salinité et satellites) ont démontré que la mer Méditerranée (plus chaude et plus salée, ~38 g/L) et l'océan Atlantique (plus froid et moins salé, ~35 g/L) se rencontrent au <strong>détroit de Gibraltar</strong> sans perdre leur identité propre. Une zone de discontinuité de densité et de salinité (appelée <strong>pycnocline</strong> et <strong>halocline</strong>) agit comme une véritable frontière fluide qui régule les échanges sur des centaines de kilomètres.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PREUVE N°3 • DOUBLE DISTINCTION AVEC LES ESTUAIRES (SOURATE 25:53)</div>\n          <h4>💧 Mer salée contre Mer salée (55:19) & Eau douce contre Eau salée (25:53)</h4>\n          <p>La précision du Coran va encore plus loin : dans la Sourate Ar-Rahmān (55:19-20), il décrit la rencontre de deux mers dotées d'un <em>Barzakh</em>. Puis, dans la <strong>Sourate Al-Furqān (25:53)</strong>, lorsqu'il décrit la rencontre entre un fleuve d'eau douce potable (<em>‘Adbun Furāt</em>) et une mer salée amère (<em>Milhun Ujāj</em>) dans les estuaires, il ajoute un second terme : <strong>« Wa hijran mahjūrā »</strong> (une zone d'exclusion biologique et osmotique propre aux eaux saumâtres d'estuaire).</p>\n        </div>\n      </div>\n      <div class=\"historians-proof-section\">\n        <div class=\"historians-header\">🔗 SOURCES OCÉANOGRAPHIQUES VÉRIFIABLES</div>\n        <div class=\"proof-links-bar\">\n          <a href=\"https://fr.wikipedia.org/wiki/Halocline\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🌊 Halocline (Frontière de salinité)</a>\n          <a href=\"https://fr.wikipedia.org/wiki/Pycnocline\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🧭 Pycnocline (Frontière de densité)</a>\n          <a href=\"https://fr.wikipedia.org/wiki/D%C3%A9troit_de_Gibraltar\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🌍 Détroit de Gibraltar (Méditerranée / Atlantique)</a>\n        </div>\n      </div>",
    "developpementEn": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PROOF #1 • THE MEANING OF 'MARAJA' AND 'BARZAKH'</div>\n          <h4>🌊 Two Seas Meeting Yet Preserving Their Distinct Properties</h4>\n          <p>To the naked eye, adjacent seas appear uniform. Yet the Quran reveals that where two seas meet (<em>Yaltaqiyān</em>), an unseen dynamic barrier (<strong>'Barzakh'</strong>) prevents one from overwhelming the properties of the other.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PROOF #2 • HALOCLINE & PYCNOCLINE AT THE STRAIT OF GIBRALTAR</div>\n          <h4>🧭 Modern Oceanographic Measurements</h4>\n          <p>Modern marine physics demonstrates that where the warmer, saltier Mediterranean Sea meets the cooler, less salty Atlantic Ocean at the <strong>Strait of Gibraltar</strong>, a physical density and salinity boundary (<strong>pycnocline / halocline</strong>) maintains each water mass's distinct characteristics.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PROOF #3 • DISTINCTION WITH ESTUARIES (SURAH AL-FURQĀN 25:53)</div>\n          <h4>💧 Salt Sea vs Salt Sea (55:19) & Fresh Water vs Salt Water (25:53)</h4>\n          <p>In Surah Al-Furqān (25:53), when describing fresh river water meeting salty sea water in estuaries, the Quran adds a second term alongside <em>Barzakh</em>: <strong>'Hijran Mahjūrā'</strong> (an osmotic and biological partition zone).</p>\n        </div>\n      </div>\n      <div class=\"historians-proof-section\">\n        <div class=\"historians-header\">🔗 VERIFIABLE OCEANOGRAPHIC SOURCES</div>\n        <div class=\"proof-links-bar\">\n          <a href=\"https://en.wikipedia.org/wiki/Halocline\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🌊 Halocline</a>\n          <a href=\"https://en.wikipedia.org/wiki/Pycnocline\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🧭 Pycnocline</a>\n          <a href=\"https://en.wikipedia.org/wiki/Strait_of_Gibraltar\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🌍 Strait of Gibraltar</a>\n        </div>\n      </div>",
    "developpementEs": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PRUEBA N°1 • EL SIGNIFICADO DE « MARAJA » Y « BARZAKH »</div>\n          <h4>🌊 Dos masas de agua en contacto pero sin confundirse</h4>\n          <p>En las aleyas 19 y 20 de Sura Ar-Rahmān, el Corán revela que donde dos mares se encuentran existe una barrera física invisible (<strong>« Barzakh »</strong>) que impide que uno anule las propiedades del otro.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PRUEBA N°2 • HALOCLINA Y PICNOCLINA EN EL ESTRECHO DE GIBRALTAR</div>\n          <h4>🧭 Las fronteras oceánicas medidas en el siglo XX</h4>\n          <p>Las mediciones oceanográficas modernas demuestran que el mar Mediterráneo y el océano Atlántico se encuentran en el <strong>estrecho de Gibraltar</strong> separados por una frontera de densidad y salinidad (<strong>picnoclina y haloclina</strong>).</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PRUEBA N°3 • DISTINCIÓN CON LOS ESTUARIOS (SURA 25:53)</div>\n          <h4>💧 Agua dulce frente a agua salada (« Hijran Mahjūrā »)</h4>\n          <p>En Sura Al-Furqān (25:53), al describir el encuentro entre el agua dulce y el mar salado en los estuarios, el Corán añade la expresión <strong>« Wa hijran mahjūrā »</strong>.</p>\n        </div>\n      </div>",
    "developpementAr": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الدليل الأول • دقة قوله تعالى ﴿مَرَجَ الْبَحْرَيْنِ يَلْتَقِيَانِ * بَيْنَهُمَا بَرْزَخٌ لَّا يَبْغِيَانِ﴾</div>\n          <h4>🌊 التقاء الكتلتين المائيتين مع بقاء خصائص كل بحر</h4>\n          <p>يظن الناظر بالعين المجردة أن البحار المتصلة ماءٌ واحد متجانس، لكن القرآن الكريم كشف أن بين البحرين الملتقيين حاجزًا مائيًّا خفيًّا (<strong>برزخًا</strong>) يمنع طغيان أحدهما على الآخر وذوبان خصائصه فيه.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الدليل الثاني • منطقة التدرج الملحي والكثافي (مضيق جبل طارق وباب المندب)</div>\n          <h4>🧭 الاكتشافات الحديثة في فيزياء المحيطات</h4>\n          <p>أثبتت القياسات البحرية الحديثة أن مياه البحر الأبيض المتوسط ومياه المحيط الأطلسي تلتقيان عند <strong>مضيق جبل طارق</strong> مع احتفاظ كل بحر بدرجة حرارته وملوحته وكثافته الخاصة بفضل منطقة الفصل الفيزيائي (<strong>Halocline & Pycnocline</strong>).</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الدليل الثالث • التفريق الدقيق بين التقاء البحار المالحة ومصبات الأنهار (الفرقان: 53)</div>\n          <h4>💧 زيادة وصف ﴿وَحِجْرًا مَّحْجُورًا﴾ عند التقاء العذب بالمالح</h4>\n          <p>فرّق القرآن الكريم بين التقاء بحرين مالحين في سورة الرحمن (فذكر البرزخ وحده)، وبين التقاء النهر العذب بالبحر المالح في المصبات (سورة الفرقان: 53) فزاد قوله: <strong>﴿وَجَعَلَ بَيْنَهُمَا بَرْزَخًا وَحِجْرًا مَّحْجُورًا﴾</strong> إشارةً إلى منطقة المصب ذات النظام البيئي والأسموزي الخاص.</p>\n        </div>\n      </div>"
  },
  "96:2": {
    "titre": "Miracle Embryologique & Linguistique — La création de l'homme à partir d'une adhérence (‘Alaq) dès la 1re Révélation",
    "titreEn": "Embryological & Linguistic Miracle — Creation of Man from a Clinging Substance (‘Alaq) in the 1st Revelation",
    "titreEs": "Milagro Embriológico y Lingüístico — La creación del ser humano a partir de una adherencia (‘Alaq)",
    "titreAr": "الإعجاز الجنيني واللغوي في أول الوحي — ﴿خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ﴾",
    "resume": "Dans les tout premiers versets révélés du Coran à La Mecque, Allāh emploie le mot « ‘Alaq » qui réunit 3 réalités biologiques de l'embryon humain entre le 7e et le 21e jour : une structure qui s'accroche à la paroi utérine, une forme semblable à une sangsue qui puise dans le sang maternel, et un aspect de sang coagulé.",
    "resumeEn": "In the very first verses of the Quran revealed in Makkah, Allāh uses the word '‘Alaq', uniting 3 biological realities of the human embryo between days 7 and 21: a structure clinging to the uterine wall, a leech-like form drawing from maternal blood, and the appearance of a blood clot.",
    "resumeEs": "En los primeros versículos revelados del Corán en La Meca, Allah emplea la palabra « ‘Alaq », que reúne 3 realidades biológicas del embrión humano: algo que se aferra a la pared uterina, una forma semejante a una sanguijuela que se nutre de la sangre materna y un coágulo.",
    "resumeAr": "في أوائل الآيات التي نزلت من القرآن الكريم بمكة، وصف الله أصل الجنين البشري بلفظ ﴿عَلَقٍ﴾ الذي يجمع ثلاث حقائق تشريحية دقيقة: التعلّق والانغراس بجدار الرحم، والتغذي من دم الأم كالعلقة، ومظهر الدم الجامد.",
    "developpement": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">SENS N°1 • L'IMPLANTATION UTÉRINE (« CE QUI S'ACCROCHE »)</div>\n          <h4>🧬 L'embryon suspendu à l'endomètre par le pédicule embryonnaire</h4>\n          <p>En langue arabe classique, la racine <strong>« ‘A-L-Q » (علق)</strong> désigne tout ce qui s'accroche, adhère et demeure suspendu. La microscopie électronique montre qu'à partir du 7e jour après la fécondation, le blastocyste s'implante profondément dans la paroi de l'utérus maternel grâce aux villosités chorioniques et reste littéralement suspendu dans la cavité chorionique par son pédicule de fixation.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">SENS N°2 • LA MORPHOLOGIE ET LA NUTRITION (« LA SANGSUE »)</div>\n          <h4>🔬 Similitude anatomique et échanges sanguins maternels</h4>\n          <p>Le mot <strong>« ‘Alaqah »</strong> désigne également en arabe la sangsue. Or, vers le 15e–21e jour, l'embryon humain présente non seulement un profil dorsal incurvé remarquablement semblable à celui d'une sangsue, mais il tire l'intégralité de son oxygène et de ses nutriments des lacs sanguins maternels de l'endomètre.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">SENS N°3 • LE SYSTÈME CARDIOVASCULAIRE PRIMITIF (« LE CAILLOT »)</div>\n          <h4>🩸 La stagnation du sang dans les vaisseaux primitifs</h4>\n          <p>Le troisième sens arabe d'<strong>« ‘Alaq »</strong> est le caillot de sang rouge foncé. Au cours de la 3e semaine, les îlots sanguins et les vaisseaux primitifs de l'embryon se forment et se remplissent de sang alors que la circulation ne bat pas encore pleinement, donnant à l'embryon de quelques millimètres l'aspect externe d'un minuscule caillot sanguin.</p>\n        </div>\n      </div>\n      <div class=\"historians-proof-section\">\n        <div class=\"historians-header\">🔗 SOURCES EXÉGÉTIQUES & SCIENTIFIQUES VÉRIFIABLES</div>\n        <div class=\"proof-links-bar\">\n          <a href=\"https://fr.wikipedia.org/wiki/Nidation\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🧬 Nidation & Implantation utérine</a>\n          <a href=\"https://fr.wikipedia.org/wiki/Villosite_choriale\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🔬 Villosités choriales</a>\n        </div>\n      </div>",
    "developpementEn": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">MEANING #1 • UTERINE IMPLANTATION ('THAT WHICH CLINGS')</div>\n          <h4>🧬 Suspended from the Endometrium by the Connecting Stalk</h4>\n          <p>In classical Arabic, the root <strong>'‘A-L-Q'</strong> means that which clings and hangs suspended. Electron microscopy confirms that from day 7, the blastocyst burrows into the uterine wall via chorionic villi and hangs by its connecting stalk.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">MEANING #2 • MORPHOLOGY & NUTRITION ('THE LEECH')</div>\n          <h4>🔬 Anatomical Resemblance and Maternal Blood Supply</h4>\n          <p><strong>'‘Alaqah'</strong> also means a leech. Around days 15–21, the human embryo curves into the exact profile of a leech while drawing nourishment from the maternal blood lacunae.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">MEANING #3 • PRIMITIVE VASCULAR SYSTEM ('THE BLOOD CLOT')</div>\n          <h4>🩸 Closed Primitive Vessels Giving a Clot-Like Appearance</h4>\n          <p>The third meaning of <strong>'‘Alaq'</strong> is a congealed blood clot, matching the embryo's external appearance during the third week before full circulation begins.</p>\n        </div>\n      </div>",
    "developpementEs": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">SIGNIFICADO N°1 • IMPLANTACIÓN UTERINA (« LO QUE SE AFERRA »)</div>\n          <h4>🧬 El embrión suspendido en el endometrio</h4>\n          <p>En árabe clásico, la raíz <strong>« ‘A-L-Q »</strong> designa todo lo que se adhiere y queda suspendido, describiendo la implantación del blastocisto en la pared uterina desde el séptimo día.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">SIGNIFICADO N°2 • MORFOLOGÍA Y NUTRICIÓN (« LA SANGUIJUELA »)</div>\n          <h4>🔬 Similitud anatómica y nutrición a partir de la sangre materna</h4>\n          <p>Hacia los días 15–21, el embrión humano adopta una curvatura idéntica a una sanguijuela y se alimenta de los lagos sanguíneos maternos.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">SIGNIFICADO N°3 • SISTEMA VASCULAR PRIMITIVO (« EL COÁGULO »)</div>\n          <h4>🩸 Aspecto externo en la tercera semana</h4>\n          <p>Durante la tercera semana, los vasos primitivos llenos de sangre dan al embrión el aspecto de un diminuto coágulo.</p>\n        </div>\n      </div>",
    "developpementAr": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">المعنى الأول • التعلّق والانغراس في جدار الرحم</div>\n          <h4>🧬 انغراس الكيسة الأريمية وتعلّقها بالحبل السري البدائي</h4>\n          <p>يدل الجذر اللغوي <strong>(ع ل ق)</strong> في العربية على كل ما يتعلق ويلتصق بشيء، وقد أثبت المجهر الإلكتروني أن الجنين ينغرس في بطانة الرحم ويتعلق بها عبر الزغابات المشيمية.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">المعنى الثاني • المشابهة الشكلية والغذائية لدودة العلق</div>\n          <h4>🔬 التغذي من البرك الدموية للأم</h4>\n          <p>في الأسبوع الثالث يتخذ الجنين انحناءً مطابقًا لشكل دودة العلق المائية، ويتغذى بامتصاص العناصر اللازمة من دم الأم.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">المعنى الثالث • العلقة بمعنى الدم الغليظ المتجمّد</div>\n          <h4>🩸 تشكّل الأوعية الدموية البدائية في الأسبوع الثالث</h4>\n          <p>تتجمع الدماء في الجزر والأوعية الدموية المغلقة للجنين قبل اكتمال النبض فيبدو الجنين للعين كأنه علقة دمٍ جامد.</p>\n        </div>\n      </div>"
  },
  "96:15": {
    "titre": "Miracle Neuro-Anatomique — La région préfrontale « menteuse et fautive » (Nāsiyatin kādhibatin khāti'ah)",
    "titreEn": "Neuro-Anatomical Miracle — The 'Lying and Sinful' Prefrontal Region (Nāsiyatin kādhibatin khāti'ah)",
    "titreEs": "Milagro Neuroanatómico — La región prefrontal « mentirosa y pecadora » (Nāsiyatin kādhibatin khāti'ah)",
    "titreAr": "الإعجاز التشريحي والعصبي — ﴿نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ﴾ ووظيفة الفص الجبهي",
    "resume": "Aux versets 15 et 16 de la Sourate Al-‘Alaq, le Coran qualifie le toupet / la région frontale supérieure du crâne (An-Nāsiyah) de « menteuse et fautive ». Or, la neurophysiologie moderne a découvert que le cortex préfrontal situé juste derrière le front est le centre cérébral de la planification, de la prise de décision morale et de l'élaboration du mensonge.",
    "resumeEn": "In verses 15–16 of Surah Al-‘Alaq, the Quran describes the upper frontal region of the head (An-Nāsiyah) as 'lying and sinful'. Modern neurophysiology has established that the prefrontal cortex located directly behind the forehead is the brain's center for planning, moral decision-making, and the fabrication of lies.",
    "resumeEs": "En las aleyas 15 y 16 de Sura Al-‘Alaq, el Corán califica la región frontal superior de la cabeza (An-Nāsiyah) como « mentirosa y pecadora ». La neurofisiología moderna ha demostrado que la corteza prefrontal situada detrás de la frente dirige la planificación, las decisiones y la elaboración de la mentira.",
    "resumeAr": "في الآيتين 15 و16 من سورة العلق، وصف القرآن الكريم مقدمة الرأس (الناصية) بأنها ﴿نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ﴾. وقد كشف علم الأعصاب الحديث أن القشرة الجبهية الأمامية الواقعة خلف الجبهة مباشرةً هي المركز المسؤول عن التخطيط واتخاذ القرار وصناعة الكذب.",
    "developpement": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PREUVE N°1 • LA FORMULATION SINGULIÈRE DU VERSET (96:15-16)</div>\n          <h4>🧠 Pourquoi qualifier le front de « menteur » plutôt que la langue ?</h4>\n          <p>En s'adressant à Abū Jahl qui interdisait au Prophète ﷺ de prier près de la Ka‘bah, Allāh dit : <em>« Nous le saisirons certes par le toupet (An-Nāsiyah), un toupet menteur et fautif (Nāsiyatin kādhibatin khāti'ah) ! »</em>. Dans toutes les cultures anciennes, le mensonge était attribué à la langue et les intentions au cœur. Désigner la partie antérieure et supérieure du front (<strong>An-Nāsiyah</strong>) comme étant elle-même l'auteur du mensonge (<em>Kādhibah</em>) et de la transgression (<em>Khāti'ah</em>) constituait une affirmation inédite au VIIe siècle.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PREUVE N°2 • LA FONCTION DU CORTEX PRÉFRONTAL EN NEUROLOGIE</div>\n          <h4>🔬 Le siège des fonctions exécutives et du choix moral</h4>\n          <p>Ce n'est qu'aux XIXe et XXe siècles que la neurologie a établi le rôle exact du <strong>cortex préfrontal</strong> (logé directement derrière l'os frontal, dans la zone de la <em>Nāsiyah</em>) : il gouverne les fonctions exécutives supérieures, l'initiative, la planification des actes volontaires et le contrôle du comportement moral.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PREUVE N°3 • IMAGERIE CÉRÉBRALE (IRMf) DU MENSONGE VOLONTAIRE</div>\n          <h4>⚡ L'activation préfrontale lors de la fabrication d'un mensonge</h4>\n          <p>Les études modernes par <strong>imagerie par résonance magnétique fonctionnelle (IRMf)</strong> (notamment les travaux de Langleben et de Yang sur la neurobiologie de la tromperie) démontrent que lorsqu'un individu élabore un mensonge délibéré, c'est précisément le <strong>cortex préfrontal dorsolatéral et ventromédian</strong> qui s'active intensément pour inhiber la vérité et construire le récit mensonger.</p>\n        </div>\n      </div>\n      <div class=\"historians-proof-section\">\n        <div class=\"historians-header\">🔗 SOURCES NEUROLOGIQUES VÉRIFIABLES</div>\n        <div class=\"proof-links-bar\">\n          <a href=\"https://fr.wikipedia.org/wiki/Cortex_pr%C3%A9frontal\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🧠 Cortex préfrontal (Fonctions exécutives)</a>\n          <a href=\"https://fr.wikipedia.org/wiki/Lobe_frontal\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🔬 Lobe frontal (Planification & Décision)</a>\n        </div>\n      </div>",
    "developpementEn": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PROOF #1 • THE UNIQUE QURANIC EXPRESSION (96:15–16)</div>\n          <h4>🧠 Attributing Lying and Sin Directly to the Forehead ('An-Nāsiyah')</h4>\n          <p>Instead of attributing lying to the tongue, verses 15–16 target the upper frontal region of the head: <em>'A lying, sinful forelock (Nāsiyatin kādhibatin khāti'ah)!'</em></p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PROOF #2 • THE ROLE OF THE PREFRONTAL CORTEX</div>\n          <h4>🔬 Seat of Executive Function, Planning, and Will</h4>\n          <p>Modern neuroscience has shown that the <strong>prefrontal cortex</strong>—located directly behind the forehead in the exact region of <em>An-Nāsiyah</em>—directs planning, voluntary action, and behavioral control.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PROOF #3 • fMRI STUDIES ON DECEPTION AND LYING</div>\n          <h4>⚡ Prefrontal Activation During Deliberate Deception</h4>\n          <p>Functional MRI (fMRI) brain imaging confirms that fabricating a deliberate lie specifically activates the <strong>prefrontal cortex</strong>, which suppresses truthful responses and constructs deception.</p>\n        </div>\n      </div>\n      <div class=\"historians-proof-section\">\n        <div class=\"historians-header\">🔗 VERIFIABLE NEUROSCIENTIFIC SOURCES</div>\n        <div class=\"proof-links-bar\">\n          <a href=\"https://en.wikipedia.org/wiki/Prefrontal_cortex\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🧠 Prefrontal Cortex</a>\n          <a href=\"https://en.wikipedia.org/wiki/Frontal_lobe\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🔬 Frontal Lobe</a>\n        </div>\n      </div>",
    "developpementEs": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PRUEBA N°1 • LA EXPRESIÓN CORÁNICA ÚNICA (96:15-16)</div>\n          <h4>🧠 ¿Por qué llamar « mentirosa » a la frente en lugar de a la lengua?</h4>\n          <p>El Corán atribuye la mentira y el pecado directamente a la región frontal superior de la cabeza: <em>« ¡Un copete mentiroso y pecador (Nāsiyatin kādhibatin khāti'ah)! »</em>.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PRUEBA N°2 • LA CORTEZA PREFRONTAL EN NEUROLOGÍA</div>\n          <h4>🔬 Sede de las funciones ejecutivas y las decisiones</h4>\n          <p>La neurociencia moderna ha establecido que la <strong>corteza prefrontal</strong> situada detrás de la frente dirige la planificación y los actos voluntarios.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PRUEBA N°3 • RESONANCIA MAGNÉTICA FUNCIONAL (fMRI) DE LA MENTIRA</div>\n          <h4>⚡ Activación prefrontal al elaborar un engaño</h4>\n          <p>Los estudios por neuroimagen demuestran que al elaborar una mentira deliberada se activa intensamente la <strong>corteza prefrontal</strong>.</p>\n        </div>\n      </div>",
    "developpementAr": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الدليل الأول • دقة التعبير القرآني ﴿نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ﴾</div>\n          <h4>🧠 إسناد الكذب والخطيئة إلى مقدمة الرأس (الناصية)</h4>\n          <p>لم يقل القرآن «لسان كاذب»، بل أسند وصف الكذب والخطيئة مباشرةً إلى <strong>«الناصية»</strong> (وهي مقدم الرأس والجبهة)، وهو أمر لم يكن معروفًا للبشر في القرن السابع الميلادي.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الدليل الثاني • وظيفة القشرة الجبهية الأمامية (Prefrontal Cortex)</div>\n          <h4>🔬 مركز التخطيط والإرادة وتوجيه السلوك</h4>\n          <p>أثبت علم التشريح العصبي الحديث أن منطقة <strong>الفص الجبهي الأمامي</strong> الواقعة خلف الجبهة مباشرةً هي المسؤولة عن الوظائف التنفيذية العليا والتخطيط واتخاذ القرارات الإرادية.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الدليل الثالث • التصوير بالرنين المغناطيسي الوظيفي (fMRI) أثناء الكذب</div>\n          <h4>⚡ نشاط الناصية عند اختلاق الكذب</h4>\n          <p>أظهرت فحوصات الرنين المغناطيسي الوظيفي للدماغ أن اختلاق الكذب يتطلب نشاطًا مضاعفًا في <strong>القشرة الجبهية الأمامية</strong> لكبح الحقيقة وبناء القصة الكاذبة.</p>\n        </div>\n      </div>"
  },
  "111:1": {
    "titre": "Miracle Prophétique & Historique — La condamnation définitive d'Abū Lahab révélée 10 ans avant sa mort",
    "titreEn": "Prophetic & Historical Miracle — The Definitive Condemnation of Abū Lahab Revealed 10 Years Before His Death",
    "titreEs": "Milagro Profético e Histórico — La condena definitiva de Abū Lahab revelada 10 años antes de su muerte",
    "titreAr": "الإعجاز الغيبي والتاريخي — الإخبار بهلاك أبي لهب على الكفر قبل موته بعشر سنين",
    "resume": "Révélée publiquement à La Mecque plus de dix ans avant la mort d'Abū Lahab, la Sourate Al-Masad décrète de manière irrévocable qu'Abū Lahab et son épouse mourront dans la mécréance. Durant toute une décennie, il aurait suffi à Abū Lahab de prononcer une seule phrase de conversion — même par hypocrisie — pour tenter de démentir le Coran, mais il ne put jamais le faire.",
    "resumeEn": "Publicly revealed in Makkah more than ten years before Abū Lahab's death, Surah Al-Masad irrevocably decreed that Abū Lahab and his wife would die in disbelief. For an entire decade, Abū Lahab could have uttered a single sentence of fake conversion to try to disprove the Quran, yet he was never able to do so.",
    "resumeEs": "Revelada públicamente en La Meca más de diez años antes de la muerte de Abū Lahab, la Sura Al-Masad decretó irreversiblemente que él y su esposa morirían en la incredulidad. Durante toda una década le habría bastado fingir su conversión con una sola frase para intentar desmentir el Corán, pero jamás pudo hacerlo.",
    "resumeAr": "نزلت سورة المسد بمكة قبل هلاك أبي لهب بأكثر من عشر سنين، فحكمت حُكمًا قاطعًا بأنه وامرأته سيموتان على الكفر ويدخلان النار. وطوال عقدٍ كامل كان يكفي أبا لهب أن ينطق بكلمة الإسلام ولو كذبًا ونفاقًا ليزعم نقض القرآن، لكنه لم يستطع ذلك قط حتى هلك.",
    "developpement": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PREUVE N°1 • UN VERDICT IRRÉVOCABLE DU VIVANT DE L'ENNEMI</div>\n          <h4>🔥 Une sourate récitée publiquement à La Mecque pendant 10 ans</h4>\n          <p>Lorsque le Prophète Muhammad ﷺ réunit son clan sur le mont As-Safā pour les appeler à l'Unicité d'Allāh (<em>Sahīh Al-Bukhārī n°4770</em>), son oncle ‘Abd al-‘Uzzā (surnommé <strong>Abū Lahab</strong>) s'écria : <em>« Périsses-tu (Tabban laka) ! Est-ce pour cela que tu nous as réunis ? »</em>. Allāh fit alors descendre la Sourate Al-Masad décrétant qu'Abū Lahab et son épouse Umm Jamīl périraient et brûleraient dans un Feu ardent, fermant définitivement la porte à tout repentir de leur part.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PREUVE N°2 • LE PARADOXE HISTORIQUE SOULIGNÉ PAR LES SAVANTS</div>\n          <h4>⚖️ Il lui suffisait d'une seule phrase hypocrite pour contredire le Coran</h4>\n          <p>Les grands exégètes (notamment <strong>Al-Qurtubī, Fakhr ad-Dīn ar-Rāzī et Ibn Kathīr</strong>) soulignent le défi extraordinaire contenu dans cette sourate : alors que de nombreux ennemis farouches de l'Islam (comme Khālid ibn al-Walīd, ‘Amr ibn al-‘Ās, ‘Ikrimah ibn Abī Jahl ou Abū Sufyān) finirent par embrasser l'Islam, le Coran affirma dix ans à l'avance qu'Abū Lahab n'aurait jamais la foi. Durant ces <strong>10 années</strong>, Abū Lahab dépensait sa fortune pour prouver que Muhammad ﷺ se trompait : il lui aurait suffi de se présenter devant les Mecquois et de dire, même en mentant : <strong>« J'atteste que je suis musulman, votre Coran s'est donc trompé ! »</strong>. Mais aucun être humain ne peut contredire le décret de Celui qui connaît l'avenir.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PREUVE N°3 • L'ACCOMPLISSEMENT EXACT APRÈS LA BATAILLE DE BADR (624 AP. J.-C.)</div>\n          <h4>⚔️ La mort d'Abū Lahab sept nuits après la défaite de Quraysh</h4>\n          <p>En <strong>624 ap. J.-C.</strong> (an 2 de l'Hégire), en apprenant la déroute humiliante de l'armée mecquoise face aux 300 croyants à la bataille de Badr, Abū Lahab fut frappé d'une terrible maladie infectieuse pustuleuse (<em>Al-‘Adasah</em>) et mourut sept nuits plus tard dans la mécréance la plus totale, accomplissant la prophétie coranique à la lettre.</p>\n        </div>\n      </div>\n      <div class=\"historians-proof-section\">\n        <div class=\"historians-header\">🔗 SOURCES AUTHENTIQUES & HISTORIQUES VÉRIFIABLES</div>\n        <div class=\"proof-links-bar\">\n          <a href=\"https://sunnah.com/bukhari:4770\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">📘 Sahīh Al-Bukhārī (Hadith n°4770)</a>\n          <a href=\"https://sunnah.com/muslim:208a\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">📗 Sahīh Muslim (n°208)</a>\n          <a href=\"https://fr.wikipedia.org/wiki/Abou_Lahab\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">📜 Biographie historique d'Abū Lahab</a>\n        </div>\n      </div>",
    "developpementEn": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PROOF #1 • AN IRREVOCABLE VERDICT DURING HIS LIFETIME</div>\n          <h4>🔥 Recited Publicly in Makkah for Over a Decade</h4>\n          <p>When the Prophet ﷺ called his people on Mount As-Safā (<em>Sahīh Al-Bukhārī #4770</em>), Abū Lahab shouted: <em>'May you perish!'</em> Allāh immediately revealed Surah Al-Masad decreeing that Abū Lahab and his wife Umm Jamīl would perish in disbelief.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PROOF #2 • THE 10-YEAR CHALLENGE HIGHLIGHTED BY SCHOLARS</div>\n          <h4>⚖️ A Single Fake Sentence Would Have Sufficed to Challenge the Quran</h4>\n          <p>Scholars such as <strong>Al-Qurtubī, Ar-Rāzī, and Ibn Kathīr</strong> point out that while other fierce enemies (like Khālid ibn al-Walīd and Abū Sufyān) eventually accepted Islam, the Quran declared 10 years in advance that Abū Lahab never would. All he had to do was pretend to convert for five minutes in public to claim the Quran was wrong—yet he was never able to do so.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PROOF #3 • EXACT FULFILLMENT AFTER BADR (624 CE)</div>\n          <h4>⚔️ His Death Seven Nights After the Meccan Defeat at Badr</h4>\n          <p>In <strong>624 CE</strong>, devastated by the news of Quraysh's defeat at Badr, Abū Lahab contracted a malignant pustular plague (<em>Al-‘Adasah</em>) and died in disbelief seven nights later.</p>\n        </div>\n      </div>\n      <div class=\"historians-proof-section\">\n        <div class=\"historians-header\">🔗 VERIFIABLE HISTORICAL SOURCES</div>\n        <div class=\"proof-links-bar\">\n          <a href=\"https://sunnah.com/bukhari:4770\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">📘 Sahīh Al-Bukhārī (#4770)</a>\n          <a href=\"https://sunnah.com/muslim:208a\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">📗 Sahīh Muslim (#208)</a>\n          <a href=\"https://en.wikipedia.org/wiki/Abu_Lahab\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">📜 Historical Biography of Abū Lahab</a>\n        </div>\n      </div>",
    "developpementEs": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PRUEBA N°1 • UN VEREDICTO IRREVOCABLE EN VIDA DEL ENEMIGO</div>\n          <h4>🔥 Recitada públicamente en La Meca durante 10 años</h4>\n          <p>Cuando el Profeta ﷺ llamó a su pueblo en el monte As-Safā (<em>Sahīh Al-Bukhārī n°4770</em>), Abū Lahab lo maldijo y Allah reveló la Sura Al-Masad anunciando que él y su esposa morirían sin fe.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PRUEBA N°2 • EL DESAFÍO DE 10 AÑOS DESTACADO POR LOS EXÉGETAS</div>\n          <h4>⚖️ Una sola frase fingida habría bastado para intentar contradecir el Corán</h4>\n          <p>Los sabios <strong>Al-Qurtubī, Ar-Rāzī e Ibn Kathīr</strong> subrayan que durante diez años Abū Lahab tuvo en su mano pronunciar una falsa conversión en público para decir que el Corán se equivocaba, pero jamás pudo contradecir el decreto divino.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PRUEBA N°3 • CUMPLIMIENTO EXACTO TRAS LA BATALLA DE BADR (624 D. C.)</div>\n          <h4>⚔️ Su muerte siete noches después de la derrota de Quraysh</h4>\n          <p>En el año <strong>624 d. C.</strong>, tras conocer la derrota de Quraysh en Badr, Abū Lahab contrajo una grave infección pustulosa (<em>Al-‘Adasah</em>) y murió en la incredulidad tal como anunció la sura.</p>\n        </div>\n      </div>",
    "developpementAr": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الدليل الأول • حكمٌ قاطع بالمواجهة العلنية في مكة</div>\n          <h4>🔥 سورة تتلى في مجالس قريش عشر سنين كاملة</h4>\n          <p>لما صعد النبي ﷺ على الصفا يدعو قريشًا (<em>صحيح البخاري 4770</em>) قال أبو لهب: «تبًّا لك سائر اليوم، ألهذا جمعتنا؟»، فأنزل الله سورة المسد تحكم بأنه وامرأته سيموتان على الكفر ويصليان نارًا ذات لهب.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الدليل الثاني • التحدي التاريخي الذي أبرزه أئمة التفسير</div>\n          <h4>⚖️ كان يكفيه التظاهر بالإسلام بكلمةٍ واحدة ليزعم معارضة القرآن</h4>\n          <p>بيّن الأئمة <strong>القرطبي والفخر الرازي وابن كثير</strong> أن كثيرًا من أشد صناديد قريش (كخالد بن الوليد وعمرو بن العاص وعكرمة بن أبي جهل وأبي سفيان) أسلموا لاحقًا، إلا أبا لهب فقد أخبر العليم الخبير أنه لن يؤمن أبدًا؛ ومضت عشر سنين وهو يحاول تكذيب النبي ﷺ فلم يخطر بباله ولا قدر لسانه على النطق بالشهادتين ولو نفاقًا.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الدليل الثالث • تحقق النبوءة بعد غزوة بدر الكبرى (624م)</div>\n          <h4>⚔️ هلاكه بمرض العدسة بعد سبع ليالٍ من هزيمة قريش</h4>\n          <p>في السنة الثانية للهجرة (<strong>624م</strong>) وبعد هزيمة المشركين في بدر، أُصيب أبو لهب بمرض «العدسة» الخبيث فمات شرّ ميتة على الكفر كما أخبر القرآن حرفيًّا.</p>\n        </div>\n      </div>"
  }
});
Object.assign(memoireGlobale.miracles, MIRACLES_DE_BASE);
Object.assign(memoireGlobale.tafsirFr, TAFSIR_INTEGRAL_DE_BASE_FR);
try {
  fs.writeFileSync(cheminMemoire, JSON.stringify(memoireGlobale, null, 2), 'utf8');
} catch (e) {}

const MIRACLES = memoireGlobale.miracles;
const TAFSIR_INTEGRAL_CORRIGE_FR = memoireGlobale.tafsirFr;

const NOMS_SOURATES_ES = {
  1:"La Apertura",2:"La Vaca",3:"La Familia de Imrán",4:"Las Mujeres",5:"La Mesa Servida",6:"Los Rebaños",7:"Los Lugares Elevados",8:"El Botín",9:"El Arrepentimiento",10:"Jonás",11:"Hud",12:"José",13:"El Trueno",14:"Abraham",15:"Al-Hiyr",16:"Las Abejas",17:"El Viaje Nocturno",18:"La Caverna",19:"María",20:"Ta-Ha",21:"Los Profetas",22:"La Peregrinación",23:"Los Creyentes",24:"La Luz",25:"El Criterio",26:"Los Poetas",27:"Las Hormigas",28:"Los Relatos",29:"La Araña",30:"Los Romanos",31:"Luqmán",32:"La Postración",33:"Los Coaligados",34:"Saba",35:"El Originador",36:"Ya-Sin",37:"Los Ordenados en Filas",38:"Sad",39:"Los Grupos",40:"El Perdonador",41:"Explicadas Detalladamente",42:"La Consulta",43:"Los Adornos Dorados",44:"El Humo",45:"La Arrodillada",46:"Las Dunas",47:"Muhammad",48:"La Victoria",49:"Los Aposentos Privados",50:"Qaf",51:"Los Vientos que Esparcen",52:"El Monte",53:"La Estrella",54:"La Luna",55:"El Misericordioso",56:"El Suceso Inminente",57:"El Hierro",58:"La Mujer que Discute",59:"El Destierro",60:"La Examinada",61:"La Fila",62:"El Viernes",63:"Los Hipócritas",64:"El Desengaño",65:"El Divorcio",66:"La Prohibición",67:"La Soberanía",68:"El Cálamo",69:"La Realidad Inevitable",70:"Las Vías de Ascenso",71:"Noé",72:"Los Genios",73:"El Envuelto en su Manto",74:"El Arropado",75:"La Resurrección",76:"El Ser Humano",77:"Los Enviados",78:"La Gran Noticia",79:"Los que Arrancan",80:"Frunció el Ceño",81:"El Oscurecimiento",82:"La Hendidura",83:"Los Defraudadores",84:"El Resquebrajamiento",85:"Las Constelaciones",86:"El Astro Nocturno",87:"El Altísimo",88:"El Evento Abrumador",89:"La Aurora",90:"La Ciudad",91:"El Sol",92:"La Noche",93:"La Mañana",94:"La Apertura del Pecho",95:"La Higuera",96:"El Coágulo",97:"El Decreto",98:"La Prueba Clara",99:"El Terremoto",100:"Los Corceles",101:"La Calamidad",102:"El Afán de Acumular",103:"El Tiempo",104:"El Difamador",105:"El Elefante",106:"Quraysh",107:"La Ayuda Mínima",108:"La Abundancia",109:"Los Incrédulos",110:"El Socorro Divino",111:"Las Fibras de Palma",112:"La Unicidad Pura",113:"El Amanecer",114:"La Humanidad"
};

const SYNTHESE_LAURIER_EXEGESE = {
  "1:2": "Exégèse classique (« Rabb al-‘Ālamīn » — Seigneur des mondes) : Les exégètes (At-Tabarī, Al-Qurtubī, Ibn Kathīr) expliquent qu'« Al-‘Ālamīn » est le pluriel de « ‘Ālam » (monde) et désigne l'ensemble des créatures. C'est pourquoi la traduction originale de Muhammad Hamidullah (1977) traduit ce terme par « Seigneur des mondes ».",
  "2:1": "Ces lettres isolées (Alif, Lām, Mīm) placées en ouverture de vingt-neuf sourates appartiennent au secret d'Allāh et démontrent le miracle inimitable du Coran : bien qu'il soit composé des mêmes lettres arabes que celles utilisées par les hommes, nul ne peut produire un livre semblable.",
  "2:19": "Synthèse d'Ibn ‘Abbās & d'Al-Jalālayn (Sens de la comparaison) : La « pluie abondante » représente le Coran ; les « ténèbres » représentent les doutes des hypocrites ; le « tonnerre » correspond aux avertissements divins qui les effraient ; et les « éclairs » désignent la clarté de la Vérité coranique qui dévoile leur hypocrisie.",
  "2:22": "Tafsīr d'At-Tabarī & d'Al-Qurtubī : L'imam At-Tabarī rapporte d'après Ibn ‘Abbās et Mujāhid que « Firāshan » signifie qu'Allāh a fait de la Terre un lit étendu, un tapis plat et stable, et que le ciel a été érigé au-dessus d'elle comme un « Binā' » (un dôme et un toit élevé).",
  "2:255": "Verset du Trône (Āyat Al-Kursī) : Il s'agit du plus grand verset du Coran. « Al-Hayy » désigne le Vivant par essence dont la vie est éternelle, et « Al-Qayyūm » désigne Celui qui subsiste par Lui-même et par qui subsistent toutes les créatures.",
  "51:47": "Tafsīr Classique (« Wa innā lamūsi‘ūn ») : Traduction originale de Muhammad Hamidullah (1977) : « Et le ciel, Nous l'avons construit renforcé ; et c'est encore Nous l'Élargisseur. » At-Tabarī, Al-Qurtubī et Ibn Kathīr expliquent que « Mūsi‘ūn » signifie : détenteurs de puissance et d'abondance ayant érigé un toit céleste vaste sans piliers.",
  "51:48": "Tafsīr d'At-Tabarī & d'Al-Qurtubī : Traduction originale de 1977 : « Et la terre, Nous l'avons faite lit ; et quel excellent berceur (niveleur) Nous sommes ! » Allāh a étendu, aplani et nivelé la Terre comme un lit stable.",
  "71:19": "Tafsīr d'At-Tabarī & d'Al-Qurtubī : « Et c'est Allāh qui vous a fait de la Terre un tapis (Bisātan) » : un grand tapis étalé à plat sur lequel on marche.",
  "88:20": "Tafsīr d'At-Tabarī, d'Al-Qurtubī & d'Al-Jalālayn : Sous « Et la Terre, comment elle est nivelée (Sutihat) ? », le terme « Sutihat » exprime selon le sens apparent du texte que la Terre a été aplanie et étendue à plat devant le regard de l'homme.",
  "91:6": "Tafsīr d'At-Tabarī & d'Al-Qurtubī (« Wa al-ardi wa mā tahāhā ») : At-Tabarī et Al-Qurtubī expliquent que « Tahāhā » signifie qu'Allāh a nivelé, aplani et étalé la Terre de tous ses côtés (Basatahā min kulli jānib) comme un tapis stable."
};

const SYNTHESE_LAURIER_EN = {
  "1:2": "Classical Exegesis ('Rabb al-‘Ālamīn' — Lord of the Worlds): At-Tabarī, Al-Qurtubī, and Ibn Kathīr explain that 'Al-‘Ālamīn' is the plural of '‘Ālam' (world) and refers to all created realms.",
  "2:19": "Summary of Ibn ‘Abbās & Al-Jalālayn: The 'rainstorm' represents the Quran; 'darkness' represents the hypocrites' doubts; 'thunder' represents Divine warnings; and 'lightning' represents the clear truth.",
  "2:255": "Verse of the Throne (Āyat Al-Kursī): The greatest verse of the Quran. 'Al-Hayy' is the Ever-Living, and 'Al-Qayyūm' is the Self-Sustaining Sustainer.",
  "88:20": "Tafsīr of At-Tabarī, Al-Qurtubī & Al-Jalālayn: Under 'And the Earth, how it is spread out / leveled (Sutihat)?', scholars explain that the Earth was spread out flat and leveled.",
  "91:6": "Tafsīr of At-Tabarī & Al-Qurtubī: 'Tahāhā' means He leveled and spread out the Earth on all sides."
};

const SYNTHESE_LAURIER_ES = {
  "1:2": "Exégesis clásica (« Rabb al-‘Ālamīn » — Señor de los mundos): At-Tabarī, Al-Qurtubī e Ibn Kathīr explican que « Al-‘Ālamīn » es el plural de « ‘Ālam » (mundo).",
  "2:19": "Síntesis de Ibn ‘Abbās y Al-Jalālayn: La « lluvia » representa el Corán; las « tinieblas » las dudas de los hipócritas; el « trueno » las advertencias divinas; y los « relámpagos » la Verdad.",
  "2:255": "El Versículo del Trono (Āyat Al-Kursī): El versículo más grandioso del Corán.",
  "88:20": "Tafsīr de At-Tabarī, Al-Qurtubī y Al-Jalālayn: Bajo « ¿Y la Tierra, cómo ha sido allanada (Sutihat)? », explican que la Tierra fue extendida y nivelada.",
  "91:6": "Tafsīr de At-Tabarī y Al-Qurtubī: « Tahāhā » significa que Allah niveló y extendió la Tierra por todos sus lados."
};

const SYNTHESE_LAURIER_AR = {
  "1:2": "تفسير الطبري والقرطبي وابن كثير: «العالمين» جمع عالَم، وهم كل ما سوى الله من الإنس والجن والملائكة وسائر المخلوقات.",
  "2:19": "خلاصة تفسير ابن عباس والجلالين: «الصيّب» المطر وهو مَثَلٌ للقرآن، و«الظلمات» شكوك المنافقين، و«الرعد» الزواجر والوعيد، و«البرق» الحجج الباهرة.",
  "2:255": "آية الكرسي: أعظم آية في كتاب الله، «الحي» الدائم الباقي، و«القيوم» القائم بنفسه المقيم لكل ما سواه.",
  "88:20": "تفسير الطبري والقرطبي والجلالين: قوله تعالى ﴿وَإِلَى الْأَرْضِ كَيْفَ سُطِحَتْ﴾ أي كيف بُسطت ومُدّت ومُهّدت.",
  "91:6": "تفسير الطبري والقرطبي: قال ابن عباس وقتادة في قوله ﴿وَالْأَرْضِ وَمَا طَحَاهَا﴾: أي بسطها ومدّها من كل جانب."
};

const VERSIONS_ORIGINALES_HAMIDULLAH_1977 = {
  "1:2": "Louange à Allah, Seigneur des mondes,",
  "51:47": "Et le ciel, Nous l'avons construit renforcé; et c'est encore Nous l'Élargisseur.",
  "51:48": "Et la terre, Nous l'avons faite lit; et quel excellent berceur Nous sommes!",
  "71:19": "Et c'est Allah qui vous a fait de la terre un tapis,",
  "88:20": "et la terre, comment elle est nivelée?",
  "91:6": "Et par la terre et Celui qui l'a nivelée!"
};

const LOGO_FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#07111a"/>
      <stop offset="100%" stop-color="#020406"/>
    </linearGradient>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="45%" stop-color="#7dd3fc"/>
      <stop offset="75%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>
    <filter id="glow" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="3.2" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="120" height="120" rx="28" fill="url(#bgGrad)"/>
  <path d="M60 20 L63.5 29.5 L73.5 30 L65.5 36 L68.5 45.5 L60 40 L51.5 45.5 L54.5 36 L46.5 30 L56.5 29.5 Z" fill="url(#titleGrad)" filter="url(#glow)"/>
  <path d="M24 54 C38 48, 52 52, 60 59 C68 52, 82 48, 96 54 L96 88 C82 82, 68 86, 60 93 C52 86, 38 82, 24 88 Z" fill="none" stroke="url(#titleGrad)" stroke-width="5" stroke-linejoin="round" filter="url(#glow)"/>
  <line x1="60" y1="59" x2="60" y2="93" stroke="url(#titleGrad)" stroke-width="4" stroke-linecap="round"/>
  <path d="M32 64 C42 61, 50 63, 55 67" fill="none" stroke="#7dd3fc" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
  <path d="M32 74 C42 71, 50 73, 55 77" fill="none" stroke="#7dd3fc" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
  <path d="M88 64 C78 61, 70 63, 65 67" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
  <path d="M88 74 C78 71, 70 73, 65 77" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
</svg>`;

function genererLogoInlineSVG(classeCSS) {
  return `<svg class="${classeCSS}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-label="Logo Le Noble Coran & Tafsir">
    <defs>
      <linearGradient id="bgGrad_${classeCSS}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#07111a"/>
        <stop offset="100%" stop-color="#020406"/>
      </linearGradient>
      <linearGradient id="titleGrad_${classeCSS}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="45%" stop-color="#7dd3fc"/>
        <stop offset="75%" stop-color="#38bdf8"/>
        <stop offset="100%" stop-color="#34d399"/>
      </linearGradient>
      <filter id="glow_${classeCSS}" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="3.2" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <rect width="120" height="120" rx="28" fill="url(#bgGrad_${classeCSS})"/>
    <path d="M60 20 L63.5 29.5 L73.5 30 L65.5 36 L68.5 45.5 L60 40 L51.5 45.5 L54.5 36 L46.5 30 L56.5 29.5 Z" fill="url(#titleGrad_${classeCSS})" filter="url(#glow_${classeCSS})"/>
    <path d="M24 54 C38 48, 52 52, 60 59 C68 52, 82 48, 96 54 L96 88 C82 82, 68 86, 60 93 C52 86, 38 82, 24 88 Z" fill="none" stroke="url(#titleGrad_${classeCSS})" stroke-width="5" stroke-linejoin="round" filter="url(#glow_${classeCSS})"/>
    <line x1="60" y1="59" x2="60" y2="93" stroke="url(#titleGrad_${classeCSS})" stroke-width="4" stroke-linecap="round"/>
    <path d="M32 64 C42 61, 50 63, 55 67" fill="none" stroke="#7dd3fc" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
    <path d="M32 74 C42 71, 50 73, 55 77" fill="none" stroke="#7dd3fc" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
    <path d="M88 64 C78 61, 70 63, 65 67" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
    <path d="M88 74 C78 71, 70 73, 65 77" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
  </svg>`;
}

const ICONE_LIVRE_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;

function creerAppleTouchIconPNG(taille = 180) {
  const buf = Buffer.alloc(taille * (taille * 3 + 1));
  function distSeg(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy;
    const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l2));
    return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
  }
  for (let py = 0; py < taille; py++) {
    const row = py * (taille * 3 + 1);
    buf[row] = 0;
    const y = (py / taille) * 120;
    for (let px = 0; px < taille; px++) {
      const x = (px / taille) * 120, tg = (x + y) / 240;
      let r = Math.round(7 * (1 - tg) + 2 * tg), g = Math.round(17 * (1 - tg) + 4 * tg), b = Math.round(26 * (1 - tg) + 6 * tg);
      const dc = Math.hypot(x - 60, y - 62);
      if (dc < 50) {
        const gl = Math.pow(1 - dc / 50, 2) * 0.4;
        r = Math.min(255, Math.round(r + 45 * gl)); g = Math.min(255, Math.round(g + 189 * gl)); b = Math.min(255, Math.round(b + 248 * gl));
      }
      let db = 999;
      if (x >= 24 && x <= 96) {
        const dx = Math.abs(x - 60), arch = -6 * Math.sin((dx / 36) * Math.PI);
        const yt = 54 + (36 - dx) * (5 / 36) + arch, yb = 88 + (36 - dx) * (5 / 36) + arch;
        if (y >= yt && y <= yb) { r = 3; g = 8; b = 13; }
        db = Math.min(Math.abs(y - yt), Math.abs(y - yb));
      }
      db = Math.min(db, distSeg(x, y, 24, 54, 24, 88), distSeg(x, y, 96, 54, 96, 88), distSeg(x, y, 60, 59, 60, 93), Math.max(0, Math.hypot(x - 60, y - 33) - 9));
      if (db < 2.4) { r = 56; g = 189; b = 248; }
      const i = row + 1 + px * 3;
      buf[i] = r; buf[i + 1] = g; buf[i + 2] = b;
    }
  }
  const tab = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    tab[n] = c >>> 0;
  }
  function crc(b) {
    let c = 0xffffffff;
    for (let i = 0; i < b.length; i++) c = tab[(c ^ b[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  }
  function chk(t, d) {
    const o = Buffer.alloc(d.length + 12);
    o.writeUInt32BE(d.length, 0); o.write(t, 4, 4, 'ascii'); d.copy(o, 8);
    o.writeUInt32BE(crc(o.slice(4, d.length + 8)), d.length + 8);
    return o;
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(taille, 0); ihdr.writeUInt32BE(taille, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chk('IHDR', ihdr), chk('IDAT', zlib.deflateSync(buf)), chk('IEND', Buffer.alloc(0))]);
}

const LETTRES_MYSTERIEUSES_EXACTES = {
  "2:1":"آلٓمٓ","3:1":"آلٓمٓ","7:1":"آلٓمٓصٓ","10:1":"آلٓر","11:1":"آلٓر","12:1":"آلٓر","13:1":"آلٓمٓر","14:1":"آلٓر","15:1":"آلٓر","19:1":"كٓهيعٓصٓ","20:1":"طه","26:1":"طسٓمٓ","27:1":"طسٓ","28:1":"طسٓمٓ","29:1":"آلٓمٓ","30:1":"آلٓمٓ","31:1":"آلٓمٓ","32:1":"آلٓمٓ","36:1":"يسٓ","38:1":"صٓ وَالْقُرْآنِ ذِي الذِّكْرِ","40:1":"حمٓ","41:1":"حمٓ","42:1":"حمٓ","42:2":"عٓسٓقٓ","43:1":"حمٓ","44:1":"حمٓ","45:1":"حمٓ","46:1":"حمٓ","50:1":"قٓ وَالْقُرْآنِ الْمَجِيدِ","68:1":"نٓ وَالْقَلَمِ وَمَا يَسْطُرُونَ"
};

function nettoyerArabe(cle, tBrut) {
  if (LETTRES_MYSTERIEUSES_EXACTES[cle]) return LETTRES_MYSTERIEUSES_EXACTES[cle];
  return String(tBrut || '').replace(/\u0671/g, '\u0627').replace(/\u06E1/g, '\u0652').replace(/[\u06D6-\u06DC\u06DF\u06E0\u06E2\u06E3\u06E5\u06E6\u06E7\u06E8\u06EA\u06EB\u06EC\u06ED]/g, '').replace(/\s+/g, ' ').trim();
}

function restaurerHamidullah1977(cle, texte) {
  if (VERSIONS_ORIGINALES_HAMIDULLAH_1977[cle]) return VERSIONS_ORIGINALES_HAMIDULLAH_1977[cle];
  return String(texte || '').replace(/Seigneur de l['’]univers/gi, 'Seigneur des mondes').replace(/Seigneur des univers/gi, 'Seigneur des mondes').replace(/pour l['’]univers/gi, 'pour les mondes');
}

async function telechargerJSON(url, essais = 5) {
  for (let i = 0; i < essais; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i === essais - 1) throw e;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

function echapperHTML(t) {
  return String(t || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

let compteurDoublonsRepares = 0;
function separerDoublonsConsecutifs(listeTafsirBrut) {
  const copie = listeTafsirBrut.map(item => Object.assign({}, item));
  for (let i = 0; i < copie.length - 1; i++) {
    const t1 = String(copie[i]?.translation || '').trim();
    const t2 = String(copie[i + 1]?.translation || '').trim();
    if (t1.length > 120 && t1 === t2) {
      const phrases = t1.match(/[^.!?]+[.!?]+/g);
      if (phrases && phrases.length >= 2) {
        const milieu = Math.ceil(phrases.length / 2);
        copie[i].translation = phrases.slice(0, milieu).join(' ').trim();
        copie[i + 1].translation = phrases.slice(milieu).join(' ').trim();
        compteurDoublonsRepares++;
      }
    }
  }
  return copie;
}

function structurerEtMettreEnValeurTafsir(textePropre) {
  if (!textePropre) return '';
  let t = String(textePropre);
  if (t.includes('<strong')) return t;

  const idxPoint = t.search(/[.!?]\s+[A-ZÉÈÊÀÂÎÔÛÇÁÍÓÚÑ¡¿]/);
  if (idxPoint > 22 && idxPoint < 260 && !t.startsWith('<br>')) {
    const p1 = t.slice(0, idxPoint + 1);
    let suite = t.slice(idxPoint + 1).trim();

    if (suite.length > 380 && !suite.includes('<br>')) {
      const moitie = Math.floor(suite.length * 0.48);
      const sousChaine = suite.slice(moitie);
      const idxCoupe = sousChaine.search(/[.!?]\s+[A-ZÉÈÊÀÂÎÔÛÇÁÍÓÚÑ¡¿]/);
      if (idxCoupe !== -1 && idxCoupe < 220) {
        const pos = moitie + idxCoupe + 1;
        suite = suite.slice(0, pos).trim() + '<br><br>' + suite.slice(pos).trim();
      }
    }
    return `<strong style="color:#ffffff;">${p1}</strong> ${suite}`;
  }
  return t;
}

function nettoyerEtSimplifierGrandTafsirFr(cle, tBrut) {
  if (TAFSIR_INTEGRAL_CORRIGE_FR[cle]) return TAFSIR_INTEGRAL_CORRIGE_FR[cle];
  let t = String(tBrut || '').replace(/\[\d+\]/g, '');

  for (let p = 0; p < 6; p++) {
    t = t.replace(/\s*\([^()]*[ṣḍṭḥḏẓāīūâîûĥĵšğ`ʼ'’_-][^()]*\)/gi, '');
    t = t.replace(/\s*\([a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s'-]{1,30}\)/g, function(m) {
      const interieur = m.slice(1, -1).trim();
      if (/^(pluriel|singulier|ou|c'est-à-dire|littéralement)/i.test(interieur)) return m;
      if (interieur.includes('-') || /[ṣḍṭḥḏẓāīūâîûĥĵ]/i.test(interieur)) return '';
      return m;
    });
    t = t.replace(/\s*\(\s*\)/g, '');
  }

  t = t.replace(/([a-zàâéèêîôûùç])\.([A-ZÉÈÊÀÂÎÔÛÇL])/g, '$1. $2');
  t = t.replace(/\s*\([^()]*voir\s+note[^()]*\)/gi, '').replace(/`/g, '');
  t = t.replace(/Seigneur de l['’]univers/gi, 'Seigneur des mondes');

  t = t.replace(/\bleur entêtement\b/gi, 'leur obstination à refuser la vérité');
  t = t.replace(/\bentêtement\b/gi, 'obstination');
  t = t.replace(/\bl['’]entendement\b/gi, 'la raison et la capacité de comprendre');
  t = t.replace(/\bentendement\b/gi, 'raison et compréhension');
  t = t.replace(/\bprescriptions divines\b/gi, "commandements d'Allāh");
  t = t.replace(/\brecommandations prophétiques\b/gi, 'enseignements du Prophète ﷺ');
  t = t.replace(/\bd['’]être rétribués par\b/gi, "d'être récompensés par");
  t = t.replace(/\brétribués\b/gi, 'récompensés');
  t = t.replace(/\brétribuer\b/gi, 'récompenser selon les œuvres');
  t = t.replace(/\bla rétribution\b/gi, 'la récompense et le jugement des œuvres');
  t = t.replace(/\bCeux qui mécroient\b/g, 'Ceux qui rejettent la foi (les mécréants)');
  t = t.replace(/\bmécroient\b/g, 'rejettent la foi');
  t = t.replace(/\bl['’]ignominie\b/gi, "l'humiliation et le déshonneur");
  t = t.replace(/\bl['’]opprobre\b/gi, "la honte et l'humiliation");
  t = t.replace(/\bcourroux\b/gi, 'colère');
  t = t.replace(/\binéluctable\b/gi, 'inévitable et certain');
  t = t.replace(/\bdissension\b/gi, 'division et désaccord');
  t = t.replace(/\bexhortation\b/gi, 'rappel et conseil bienveillant');
  t = t.replace(/\bl['’]iniquité\b/gi, "l'injustice grave");
  t = t.replace(/\bles iniques\b/gi, 'les injustes');
  t = t.replace(/\binique\b/gi, 'injuste');
  t = t.replace(/\bles réprouvés\b/gi, 'ceux qui sont voués au châtiment');
  t = t.replace(/\bles prévaricateurs\b/gi, 'les transgresseurs qui désobéissent ouvertement');
  t = t.replace(/\bprévaricateurs\b/gi, 'transgresseurs');
  t = t.replace(/\bl['’]outrecuidance\b/gi, "l'arrogance démesurée");
  t = t.replace(/\boutrecuidance\b/gi, 'arrogance démesurée');
  t = t.replace(/\bsubterfuges\b/gi, 'ruses et stratagèmes trompeurs');
  t = t.replace(/\bmanigances\b/gi, 'complots et ruses secrètes');
  t = t.replace(/\bl['’]indigence\b/gi, 'la grande pauvreté');
  t = t.replace(/\bl['’]opulence\b/gi, "la grande richesse et l'abondance");
  t = t.replace(/\bla munificence\b/gi, 'la générosité infinie');
  t = t.replace(/\bassujettis\b/gi, "soumis par la puissance d'Allāh");
  t = t.replace(/\bassujetti\b/gi, "soumis par la puissance d'Allāh");
  t = t.replace(/\blicite\b/gi, 'permis (Halāl)');
  t = t.replace(/\billicite\b/gi, 'interdit (Harām)');
  t = t.replace(/\bpéremptoire\b/gi, 'tranchant et indiscutable');
  t = t.replace(/\ballégations\b/gi, 'affirmations mensongères sans preuve');
  t = t.replace(/\baffliction\b/gi, 'grande peine et épreuve');
  t = t.replace(/\bpérégrinations\b/gi, 'déplacements et voyages sur terre');

  t = t.replace(
    /Il a déjà été question de telles lettres séparées au début de [Ss]ourate Al-Baqarah\.?/gi,
    "Ces lettres isolées placées en ouverture de la sourate appartiennent au secret d'Allāh et démontrent le miracle inimitable du Coran, composé des mêmes lettres arabes que celles utilisées par les hommes."
  );

  t = t.replace(/\s+(\d+)\s*-\s+/g, '<br>• <strong>$1.</strong> ');
  t = t.replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();
  return structurerEtMettreEnValeurTafsir(t);
}

function nettoyerTexteIntl(tBrut, estTafsir = false) {
  let t = String(tBrut || '').replace(/\[\d+\]/g, '').replace(/\s*\(\s*\)/g, '').replace(/`/g, '');
  t = t.replace(/Al[\u002D\u2010\u2011\u2012\u2013\u2014\u2212]lah/gi, 'Allah');
  t = t.replace(/\bAlá\b/g, 'Allah');
  t = t.replace(/([a-z])\.([A-Z])/g, '$1. $2');
  t = t.replace(
    /Ya se ha hablado sobre las letras separadas en el comienzo de la sura Al-Báqarah\.?/gi,
    "Estas letras aisladas situadas al comienzo de la sura pertenecen al conocimiento de Allah y demuestran el milagro inimitable del Corán, compuesto por las mismas letras árabes que conocen y utilizan los seres humanos."
  );
  t = t.replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();
  let p = echapperHTML(t);
  if (estTafsir) {
    p = p.replace(/\s+(\d+)\s*-\s+/g, '<br>• <strong>$1.</strong> ');
    p = structurerEtMettreEnValeurTafsir(p);
  }
  return p;
}

function nettoyerTafsirArabe(tBrut) {
  let t = String(tBrut || '').replace(/\[\d+\]/g, '').replace(/\s+/g, ' ').trim();
  t = t.replace(/سبَق الكلام على الحروف المقطَّعة في أول سورة البقرة\.?/g, "هذه الحروف المقطعة في فواتح السور سرٌّ استأثر الله بعلمه، وفيها بيان إعجاز القرآن الكريم.");
  return echapperHTML(t).replace(/\s*(\d+)\s*-\s*/g, '<br>• <strong>$1 - </strong>');
}

function nettoyerTradFr(cle, tradBrute) {
  let t = restaurerHamidullah1977(cle, tradBrute).replace(/\s*\[\d+\]/g, '').replace(/\s*\([^()]*voir\s+note[^()]*\)/gi, '').replace(/`/g, '');
  return echapperHTML(t.replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim());
}

const MOTEUR_CIEL_JS = `
  const bgCanvas = document.getElementById('fullPageSkyCanvas');
  const bgCtx = bgCanvas.getContext('2d');
  const sunEl = document.getElementById('flatEarthSun');
  const moonEl = document.getElementById('flatEarthMoon');
  let wScreen = window.innerWidth, hScreen = window.innerHeight, stars = [], angleOrbite = 0.35;
  try { const sa = sessionStorage.getItem('orbit_angle_v21'); if (sa !== null && !isNaN(Number(sa))) angleOrbite = Number(sa); } catch(e){}
  function sauvegarderConfigCiel() { try { sessionStorage.setItem('orbit_angle_v21', String(angleOrbite)); } catch(e){} }
  window.addEventListener('beforeunload', sauvegarderConfigCiel);
  function resizeFullSky() { wScreen = window.innerWidth; hScreen = window.innerHeight; bgCanvas.width = wScreen; bgCanvas.height = hScreen; }
  resizeFullSky();
  for (let i = 0; i < 140; i++) {
    const xr = Math.random(), yr = Math.random(), br = Math.random() < 0.22;
    stars.push({ x: xr * wScreen, y: yr * hScreen, xr, yr, r: br ? 1.8 : 0.8, a: Math.random() * 0.6 + 0.25, p: Math.random() * 6.28, s: 0.015 });
  }
  function renderFullSky() {
    bgCtx.clearRect(0, 0, wScreen, hScreen);
    for (let i = 0; i < stars.length; i++) {
      const st = stars[i]; st.p += st.s;
      const al = Math.max(0.1, Math.min(1, st.a + Math.sin(st.p) * 0.3));
      bgCtx.fillStyle = "rgba(255,255,255," + al + ")";
      bgCtx.beginPath(); bgCtx.arc(st.x, st.y, st.r, 0, 6.28); bgCtx.fill();
    }
    if (sunEl || moonEl) {
      angleOrbite += 0.0015;
      const cx = wScreen * 0.5, cy = hScreen * 0.48, rx = Math.max(320, wScreen * 0.36), ry = Math.max(210, hScreen * 0.34);
      const sx = cx + Math.cos(angleOrbite) * rx, sy = cy + Math.sin(angleOrbite) * ry;
      const mx = cx + Math.cos(angleOrbite - Math.PI) * rx, my = cy + Math.sin(angleOrbite - Math.PI) * ry;
      if (sunEl) sunEl.style.transform = "translate3d(" + (sx - 58) + "px," + (sy - 58) + "px,0)";
      if (moonEl) moonEl.style.transform = "translate3d(" + (mx - 64) + "px," + (my - 64) + "px,0)";
    }
    requestAnimationFrame(renderFullSky);
  }
  window.addEventListener('resize', () => { resizeFullSky(); stars.forEach(s => { s.x = s.xr * wScreen; s.y = s.yr * hScreen; }); });
  renderFullSky();
`;

const SCRIPT_VERSET_V52 = `
  const audio = document.getElementById('ayahAudio');
  const preloadAudio = document.getElementById('preloadNextAudio');
  const playBtn = document.getElementById('playSyncBtn');
  const replayBtn = document.getElementById('replaySyncBtn');
  const select = document.getElementById('reciterSelect');
  const autoCheck = document.getElementById('autoNextCheck');
  const stage = document.getElementById('verseStage');
  const progressBar = document.getElementById('syncProgressBar');
  let animId = null, currentLang = 'fr', zoomScale = 1.0;
  autoCheck.checked = false; audio.volume = 1.0;

  try {
    const sr = localStorage.getItem('reciter');
    if (sr) select.value = sr;
    const savedZoom = parseFloat(localStorage.getItem('coran_zoom_v39'));
    if (!isNaN(savedZoom) && savedZoom >= 0.75 && savedZoom <= 1.45) zoomScale = savedZoom;
    const up = new URLSearchParams(window.location.search).get('lang');
    const sl = localStorage.getItem('site_lang_v32');
    if (['fr','en','es','ar'].includes(up)) { currentLang = up; localStorage.setItem('site_lang_v32', up); }
    else if (['fr','en','es','ar'].includes(sl)) currentLang = sl;
    else {
      const navL = (navigator.language || navigator.userLanguage || 'fr').toLowerCase().slice(0, 2);
      if (['fr','en','es','ar'].includes(navL)) currentLang = navL;
    }
    else {
      const navL = (navigator.language || navigator.userLanguage || 'fr').toLowerCase().slice(0, 2);
      if (['fr','en','es','ar'].includes(navL)) currentLang = navL;
    }
    else {
      const navL = (navigator.language || navigator.userLanguage || 'fr').toLowerCase().slice(0, 2);
      if (['fr','en','es','ar'].includes(navL)) currentLang = navL;
    }
  } catch(e){}

  function appliquerTailleTexte() {
    const arEl = document.getElementById('arabicVerseEl');
    const frEl = document.getElementById('frenchVerseEl');
    const exEl = document.getElementById('mainExplanationEl');
    const isMob = window.innerWidth <= 768;
    if (arEl) arEl.style.fontSize = ((isMob ? 2.2 : 2.9) * zoomScale).toFixed(2) + "rem";
    if (frEl) frEl.style.fontSize = ((isMob ? 1.25 : 1.52) * zoomScale).toFixed(2) + "rem";
    if (exEl) {
      const baseEx = (currentLang === 'ar') ? 1.38 : 1.06;
      exEl.style.fontSize = (baseEx * zoomScale).toFixed(2) + "rem";
    }
  }

  function modifierTailleTexte(delta) {
    zoomScale = Math.max(0.75, Math.min(1.45, Math.round((zoomScale + delta) * 100) / 100));
    try { localStorage.setItem('coran_zoom_v39', String(zoomScale)); } catch(e){}
    appliquerTailleTexte();
  }

  function memoriserLecture(s, v) {
    try {
      const nom = window.SOURATE_DATA ? window.SOURATE_DATA.nomSourate : ("Sourate " + s);
      localStorage.setItem('last_read_v28', JSON.stringify({ s, v, nom }));
    } catch(e){}
  }
  memoriserLecture(numSourateActuelle, numVersetActuel);

  function txtPlay() {
    if (!audio.paused) return currentLang === 'ar' ? "⏸ إيقاف مؤقت" : "⏸ Pause";
    return currentLang === 'ar' ? "▶ استمع للآية" : (currentLang === 'en' ? "▶ Listen to verse" : (currentLang === 'es' ? "▶ Escuchar aleya" : "▶ Écouter le verset"));
  }

  function majAudio() {
    const u = "https://everyayah.com/data/" + select.value + "/" + codeAudio + ".mp3";
    if (audio.src !== u) audio.src = u;
    if (preloadAudio && window.SOURATE_DATA && window.SOURATE_DATA.versets[numVersetActuel]) {
      preloadAudio.src = "https://everyayah.com/data/" + select.value + "/" + window.SOURATE_DATA.versets[numVersetActuel].codeAudio + ".mp3";
    }
  }
  majAudio();

  function animerBarre() {
    if (audio.paused) return;
    if (audio.duration && isFinite(audio.duration)) progressBar.style.width = Math.min(100, (audio.currentTime / audio.duration) * 100) + "%";
    animId = requestAnimationFrame(animerBarre);
  }
  function arreterVisuel() {
    if (animId) cancelAnimationFrame(animId);
    stage.classList.remove('playing'); progressBar.style.width = "0%";
    playBtn.textContent = txtPlay(); playBtn.classList.remove('active');
  }
  function toggleAudioSync() {
    if (audio.paused) {
      stage.classList.add('playing'); playBtn.textContent = currentLang === 'ar' ? "⏸ إيقاف مؤقت" : "⏸ Pause"; playBtn.classList.add('active');
      audio.play().then(() => { animId = requestAnimationFrame(animerBarre); }).catch(arreterVisuel);
    } else { audio.pause(); arreterVisuel(); }
  }
  function rejouerAudioVerset() {
    audio.pause(); audio.currentTime = 0; toggleAudioSync();
  }
  function changerRecitateur() {
    try { localStorage.setItem('reciter', select.value); } catch(e){}
    const enCours = !audio.paused; majAudio(); if (enCours) audio.play();
  }
  function basculerDeveloppementMiracle() {
    const d = document.getElementById('miracleDeepDetails');
    const b = document.getElementById('miracleToggleBtn');
    if (!d || !b) return;
    const isO = d.classList.toggle('open');
    if (currentLang === 'ar') b.textContent = isO ? "▲ إخفاء الشرح المفصل والمصادر التاريخية" : "★ عرض الشرح الكامل والأدلة والمخطوطات التاريخية";
    else if (currentLang === 'en') b.textContent = isO ? "▲ Hide detailed explanation & historical proofs" : "★ Read full explanation, Hadīth & Historical Proofs";
    else if (currentLang === 'es') b.textContent = isO ? "▲ Ocultar explicación detallada y pruebas" : "★ Ver explicación completa, Hadiz y pruebas históricas";
    else b.textContent = isO ? "▲ Masquer l'explication détaillée & les preuves historiques" : "★ Développer l'explication complète, le Hadīth & les preuves historiques";
  }
  function construireMiracle(m) {
    if (!m) return '';
    const isAr = currentLang === 'ar', isEn = currentLang === 'en', isEs = currentLang === 'es';
    const t = isAr ? (m.titreAr || m.titre) : (isEn ? (m.titreEn || m.titre) : (isEs ? (m.titreEs || m.titre) : m.titre));
    const r = isAr ? (m.resumeAr || m.resume) : (isEn ? (m.resumeEn || m.resume) : (isEs ? (m.resumeEs || m.resume) : m.resume));
    const dv = isAr ? (m.developpementAr || m.developpement) : (isEn ? (m.developpementEn || m.developpement) : (isEs ? (m.developpementEs || m.developpement) : m.developpement));
    const bt = isAr ? "★ عرض الشرح الكامل والأدلة والمخطوطات التاريخية" : (isEn ? "★ Read full explanation, Hadīth & Historical Proofs" : (isEs ? "★ Ver explicación completa, Hadiz y pruebas históricas" : "★ Développer l'explication complète, le Hadīth & les preuves historiques"));
    return '<div class="miracle-banner ae-laser-box"' + (isAr ? ' dir="rtl" style="text-align:right;"' : '') + '><div class="ae-shimmer-sweep"></div><div class="miracle-header"><span class="gold-star-icon">★</span> ' + t + '</div><p class="miracle-summary">' + r + '</p><button type="button" class="miracle-expand-btn" id="miracleToggleBtn" onclick="basculerDeveloppementMiracle()">' + bt + '</button><div class="miracle-deep-details" id="miracleDeepDetails">' + dv + '</div></div>';
  }

  function appliquerLangueVerset() {
    document.querySelectorAll('.lang-pill-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === currentLang));
    if (!window.SOURATE_DATA) return;
    const S = window.SOURATE_DATA, vData = S.versets[numVersetActuel - 1];
    if (!vData) return;
    const isAr = currentLang === 'ar', isEn = currentLang === 'en', isEs = currentLang === 'es';
    const estMec = S.typeSourateClasse === 'mecquoise';
    const typeL = isAr ? (estMec ? 'سورة مكية' : 'سورة مدنية') : (isEn ? (estMec ? 'Meccan Surah' : 'Medinan Surah') : (isEs ? (estMec ? 'Sura Mequí' : 'Sura Medinense') : S.typeSourateLabel));
    const lieuL = isAr ? (estMec ? 'مكة المكرمة' : 'المدينة المنورة') : (isEn ? (estMec ? 'Makkah' : 'Madinah') : (isEs ? (estMec ? 'La Meca' : 'Medina') : S.lieu));

    document.getElementById('homeBtnTextEl').textContent = isAr ? "‹ العودة إلى السور الـ 114" : (isEn ? "‹ Back to 114 Surahs" : (isEs ? "‹ Volver a las 114 Suras" : "‹ Retour aux 114 Sourates"));
    document.getElementById('typeSouratePillEl').textContent = typeL;
    const revEl = document.getElementById('revOrderTagEl');
    if (revEl) {
      revEl.textContent = isAr
        ? ("ترتيب النزول: " + S.ordreRev + " (سورة " + S.numSourate + ")")
        : (isEn ? ("Revelation #" + S.ordreRev + " (Surah #" + S.numSourate + ")") : (isEs ? (S.ordreRev + "ª revelada (Sura n°" + S.numSourate + ")") : (S.ordreRev + "e Sourate révélée (n°" + S.numSourate + ")")));
    }

    const nomT = isEn ? S.nomEn : (isEs ? S.nomEs : S.nomFr);
    const motS = isAr ? "سورة" : (isEn ? "Surah" : (isEs ? "Sura" : "Sourate"));
    const motV = isAr ? "الآية" : (isEn ? "Verse" : (isEs ? "Aleya" : "Verset"));
    const motMiracle = isAr ? "إعجاز" : (isEs ? "Milagro" : "Miracle");

    document.getElementById('mainTitleEl').textContent = isAr ? ("سورة " + S.nomArabe + " — الآية " + numVersetActuel) : (motS + " " + S.nomSourate + " (" + nomT + ") — " + motV + " " + numVersetActuel);

    const topMiracleLink = document.getElementById('topMiraclePillLink');
    if (topMiracleLink) {
      const vM = topMiracleLink.getAttribute('data-v');
      if (S.numSourate === 30) {
        topMiracleLink.innerHTML = '<span class="gold-star-icon">★</span> ' + (isAr ? '3 معجزات (آية 1-5)' : (isEs ? '3 Milagros (a.1-5)' : '3 Miracles (v.1-5)'));
      } else {
        topMiracleLink.innerHTML = '<span class="gold-star-icon">★</span> ' + (isAr ? ('إعجاز : آية ' + vM) : (isEs ? ('Milagro : a.' + vM) : ('Miracle : v.' + vM)));
      }
    }

    const subEl = document.getElementById('subHeaderInfoEl');
    if (subEl) {
      subEl.textContent = isAr
        ? (typeL + " (" + lieuL + ") • التفسير المختصر الصحيح")
        : (isEn ? (typeL + " (" + lieuL + ") • Saheeh International & Exegesis") : (isEs ? (typeL + " (" + lieuL + ") • Traducción Sheikh Isa García y Exégesis") : (typeL + " (" + lieuL + ") • Traduction Muhammad Hamidullah (1977) & Exégèse")));
    }

    const estMiracleActuel = Boolean(vData.miracle);
    if (stage) stage.classList.toggle('is-miracle-stage', estMiracleActuel);

    const jEl = document.getElementById('verseJumperSelect');
    if (jEl) {
      jEl.classList.toggle('is-miracle-gold', estMiracleActuel);
      for (let idx = 0; idx < jEl.options.length; idx++) {
        const opt = jEl.options[idx];
        const vNum = idx + 1;
        const vEstMir = Boolean(S.versets[idx] && S.versets[idx].miracle);
        opt.textContent = (vEstMir ? "★ " : "") + motV + " " + vNum + " / " + S.nbVersets + (vEstMir ? (" (" + motMiracle + ")") : "");
      }
    }

    const arEl = document.getElementById('arabicVerseEl'), frEl = document.getElementById('frenchVerseEl');
    arEl.innerHTML = vData.texteArabe;
    if (isAr) {
      frEl.innerHTML = ""; frEl.style.display = "none"; arEl.style.marginBottom = "0px";
    } else {
      frEl.innerHTML = numVersetActuel + ". " + (isEn ? (vData.tradEn || vData.tradPropre) : (isEs ? (vData.tradEs || vData.tradPropre) : vData.tradPropre));
      frEl.style.display = "block"; arEl.style.marginBottom = "22px";
    }

    playBtn.textContent = txtPlay();
    replayBtn.textContent = isAr ? "↺ إعادة" : (isEn ? "↺ Replay" : (isEs ? "↺ Repetir" : "↺ Rejouer"));
    document.getElementById('switchAutoTextEl').textContent = isAr ? "الانتقال التلقائي للآية التالية" : (isEn ? "Auto-advance" : (isEs ? "Avance automático" : "Enchaîner automatiquement"));

    const tBox = document.querySelector('.tafsir-box'), mExpl = document.getElementById('mainExplanationEl');
    tBox.setAttribute('dir', isAr ? 'rtl' : 'ltr'); tBox.style.textAlign = isAr ? 'right' : 'left';
    document.getElementById('tafsirSectionTagEl').textContent = isAr ? "التفسير المختصر وبيان المعنى" : (isEn ? "Tafsīr & Verse Explanation" : (isEs ? "Tafsīr y Explicación de la Aleya" : "Tafsīr & Explication du verset"));
    mExpl.innerHTML = isAr ? (vData.explicationAr || vData.explicationUnanime) : (isEn ? (vData.explicationEn || vData.explicationUnanime) : (isEs ? (vData.explicationEs || vData.explicationUnanime) : vData.explicationUnanime));
    mExpl.style.fontFamily = isAr ? "'Scheherazade New','Amiri',serif" : "";

    appliquerTailleTexte();

    const exC = document.getElementById('extraNotesContainer');
    let exH = '';
    if (currentLang === 'fr' && vData.precisionConsensus) exH += '<div class="consensus-note">' + vData.precisionConsensus + '</div>';
    else if (isEn && vData.precisionEn) exH += '<div class="consensus-note">' + vData.precisionEn + '</div>';
    else if (isEs && vData.precisionEs) exH += '<div class="consensus-note">' + vData.precisionEs + '</div>';
    else if (isAr && vData.precisionAr) exH += '<div class="consensus-note" style="border-left:none;border-right:3px solid var(--sky-bright);border-radius:12px 0 0 12px;font-family:\\'Scheherazade New\\',serif;font-size:1.22rem;">' + vData.precisionAr + '</div>';
    exC.innerHTML = exH;

    document.getElementById('miracleContainer').innerHTML = construireMiracle(vData.miracle);
    document.getElementById('prevVerseLink').textContent = isAr ? "‹ السابقة" : (isEn ? "‹ Previous" : (isEs ? "‹ Anterior" : "‹ Précédent"));
    document.getElementById('nextVerseLink').textContent = isAr ? "التالية ›" : (isEn ? "Next ›" : (isEs ? "Siguiente ›" : "Suivant ›"));
  }

  function changerLangueVerset(l) { currentLang = l; try { localStorage.setItem('site_lang_v32', l); } catch(e){} appliquerLangueVerset(); }
  appliquerLangueVerset();

  function allerAuVerset(n, auto) {
    if (!window.SOURATE_DATA || !window.SOURATE_DATA.versets[n - 1]) { window.location.href = "sourate-" + numSourateActuelle + "-verset-" + n + ".html"; return; }
    if (!audio.paused) audio.pause(); arreterVisuel();
    numVersetActuel = n; const vD = window.SOURATE_DATA.versets[n - 1]; codeAudio = vD.codeAudio; majAudio();
    memoriserLecture(numSourateActuelle, n);
    document.getElementById('badgeNumEl').textContent = numSourateActuelle + " : " + n;
    const jEl = document.getElementById('verseJumperSelect');
    if (jEl) jEl.value = "sourate-" + numSourateActuelle + "-verset-" + n + ".html";
    document.getElementById('prevVerseLink').setAttribute('href', vD.lienPrecedent);
    document.getElementById('nextVerseLink').setAttribute('href', vD.lienSuivant);
    appliquerLangueVerset();
    try { history.pushState({ verset: n }, '', "sourate-" + numSourateActuelle + "-verset-" + n + ".html"); } catch(e){}
    if (auto) toggleAudioSync();
  }

  function naviguerVerset(ev, lien, auto) {
    const m = String(lien).split('?')[0].match(/^sourate-(\\d+)-verset-(\\d+)\\.html$/);
    if (m && Number(m[1]) === numSourateActuelle) { if (ev) ev.preventDefault(); allerAuVerset(Number(m[2]), auto); return false; }
    if (auto) { window.location.href = String(lien).split('?')[0] + "?autoplay=1"; return false; }
    return true;
  }
  audio.onended = () => { arreterVisuel(); if (autoCheck.checked) naviguerVerset(null, document.getElementById('nextVerseLink').getAttribute('href'), true); };
`;

const CSS_COMMUN = `
  @property --ae-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  @keyframes aeLaserSpin {
    0% { --ae-angle: 0deg; }
    100% { --ae-angle: 360deg; }
  }
  @keyframes aeShimmerSweep {
    0% { transform: translateX(-140%) skewX(-22deg); opacity: 0; }
    18% { opacity: 0.45; }
    38% { transform: translateX(220%) skewX(-22deg); opacity: 0; }
    100% { transform: translateX(220%) skewX(-22deg); opacity: 0; }
  }
  @keyframes aeRevealCascade {
    0% { opacity: 0; transform: translateY(14px) scale(0.985); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes titleShimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  :root { --bg-main:#020406; --bg-card:rgba(8,13,18,0.28); --bg-elevated:rgba(12,19,25,0.35); --sky-accent:#0ea5e9; --sky-bright:#38bdf8; --sky-light:#7dd3fc; --sky-dim:rgba(56,189,248,0.16); --gold-soft:#e2c078; --gold-dim:rgba(226,192,120,0.12); --text-main:#f8fafc; --text-muted:#cbd5e1; --border-color:rgba(255,255,255,0.15); }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--bg-main); color:var(--text-main); font-family:'Plus Jakarta Sans',sans-serif; line-height:1.8; min-height:100vh; overflow-x:hidden; }
  .cosmos-exterior-wrapper { position:fixed; inset:0; width:100vw; height:100vh; z-index:0; pointer-events:none; overflow:hidden; background:radial-gradient(ellipse at 50% 40%, #070d14 0%, #030609 65%, #010203 100%); }
  #fullPageSkyCanvas { position:absolute; inset:0; width:100%; height:100%; z-index:2; }
  .flat-earth-sun { position:fixed; top:0; left:0; width:116px; height:116px; border-radius:50%; z-index:3; pointer-events:none; }
  .sun-core { width:100%; height:100%; border-radius:50%; background:radial-gradient(circle, #fff 0%, #fef08a 38%, #f59e0b 72%, rgba(234,88,12,0) 100%); box-shadow:0 0 35px 10px rgba(253,224,71,0.85), 0 0 90px 35px rgba(245,158,11,0.45); }
  .flat-earth-moon { position:fixed; top:0; left:0; width:128px; height:128px; border-radius:50%; z-index:3; pointer-events:none; }
  .moon-white-core { width:100%; height:100%; border-radius:50%; background:radial-gradient(circle at 38% 38%, #fff 0%, #f1f5f9 78%, rgba(255,255,255,0) 100%); box-shadow:0 0 35px 12px rgba(255,255,255,0.95), 0 0 85px 32px rgba(226,232,240,0.55); }
  .interface-layer { position:relative; z-index:10; }
  .revelation-pill { display:inline-flex; align-items:center; gap:5px; font-size:0.72rem; font-weight:800; text-transform:uppercase; padding:4px 10px; border-radius:99px; text-decoration:none; }
  .revelation-pill.mecquoise { background:rgba(56,189,248,0.15); color:#7dd3fc; border:1px solid rgba(56,189,248,0.45); }
  .revelation-pill.medinoise { background:rgba(16,185,129,0.16); color:#6ee7b7; border:1px solid rgba(52,211,153,0.38); }

  .revelation-pill.miracle-pill {
    background: linear-gradient(135deg, rgba(14,165,233,0.22), rgba(251,191,36,0.10));
    color: #e0f2fe;
    border: 1px solid rgba(56,189,248,0.55);
    box-shadow: 0 0 12px rgba(56,189,248,0.18);
    cursor: pointer;
    transition: 0.25s;
  }
  .revelation-pill.miracle-pill:hover { background:rgba(56,189,248,0.32); color:#ffffff; border-color:#7dd3fc; box-shadow:0 0 18px rgba(56,189,248,0.4); }

  .lang-switcher-group { display:inline-flex; align-items:center; background:rgba(6,12,18,0.88); border:1px solid rgba(56,189,248,0.42); padding:3px; border-radius:99px; gap:3px; }
  .lang-pill-btn { background:transparent; color:#94a3b8; border:1px solid transparent; padding:5px 10px; border-radius:99px; font-family:inherit; font-size:0.74rem; font-weight:800; cursor:pointer; }
  .lang-pill-btn.active { background:linear-gradient(135deg, rgba(56,189,248,0.38), rgba(14,165,233,0.32)); color:#fff; border-color:rgba(56,189,248,0.85); box-shadow:0 0 12px rgba(56,189,248,0.35); }
  .gold-star-icon { color:#f3d078; text-shadow:0 0 6px rgba(251,191,36,0.45); font-size:1.02em; }
  .sort-btn.active .gold-star-icon { color:#fde68a; text-shadow:0 1px 4px rgba(0,0,0,0.75); }

  .miracle-banner {
    position: relative;
    background: linear-gradient(145deg, rgba(5, 22, 38, 0.88) 0%, rgba(3, 10, 19, 0.94) 100%);
    border: 1px solid rgba(56, 189, 248, 0.48);
    border-radius: 22px;
    padding: 24px 26px;
    margin-bottom: 22px;
    overflow: hidden;
    box-shadow: 0 14px 38px rgba(0,0,0,0.65), 0 0 24px rgba(56,189,248,0.18), 0 0 14px rgba(251,191,36,0.06);
  }
  .miracle-banner::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.8px;
    background: conic-gradient(from var(--ae-angle), transparent 15%, #0ea5e9 34%, #38bdf8 46%, #7dd3fc 52%, rgba(251,191,36,0.52) 56%, #38bdf8 62%, transparent 82%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: aeLaserSpin 5.5s linear infinite;
    pointer-events: none;
    z-index: 2;
  }
  .ae-shimmer-sweep {
    position: absolute;
    top: 0;
    left: 0;
    width: 45%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(56,189,248,0.06), rgba(251,191,36,0.04), transparent);
    animation: aeShimmerSweep 7s ease-in-out infinite;
    pointer-events: none;
    z-index: 1;
  }
  .miracle-header { position:relative; z-index:3; color:#e0f2fe; font-weight:800; font-size:1.14rem; margin-bottom:10px; line-height:1.4; text-shadow:0 2px 10px rgba(0,0,0,0.85), 0 0 14px rgba(56,189,248,0.28); }
  .miracle-summary { position:relative; z-index:3; color:#cbd5e1; font-size:0.97rem; line-height:1.75; margin-bottom:16px; }
  .miracle-expand-btn {
    position: relative;
    z-index: 3;
    background: linear-gradient(135deg, rgba(14,165,233,0.28), rgba(56,189,248,0.16), rgba(251,191,36,0.10));
    color: #e0f2fe;
    border: 1px solid rgba(56,189,248,0.68);
    padding: 10px 20px;
    border-radius: 12px;
    font-family: inherit;
    font-size: 0.86rem;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 0 16px rgba(56,189,248,0.22);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .miracle-expand-btn:hover { background:linear-gradient(135deg, #38bdf8, #0ea5e9); color:#02060d; transform:translateY(-2px); box-shadow:0 0 24px rgba(56,189,248,0.5); }
  .miracle-deep-details { position:relative; z-index:3; display:none; margin-top:20px; padding-top:20px; border-top:1px solid rgba(56,189,248,0.35); color:#f0f9ff; font-size:0.95rem; line-height:1.8; }
  .miracle-deep-details.open { display:block; animation:aeRevealCascade 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .miracle-deep-details p { margin-bottom:12px; }

  .miracle-pillars-grid { display:flex; flex-direction:column; gap:14px; margin-bottom:20px; }
  .miracle-pillar-card {
    position: relative;
    background: linear-gradient(135deg, rgba(4, 15, 28, 0.88), rgba(2, 8, 16, 0.92));
    border: 1px solid rgba(56, 189, 248, 0.42);
    border-left: 4px solid #38bdf8;
    border-radius: 16px;
    padding: 18px 20px;
    box-shadow: 0 10px 28px rgba(0,0,0,0.5), inset 0 0 20px rgba(56,189,248,0.05);
    transition: transform 0.25s ease, border-color 0.25s ease;
  }
  .miracle-pillar-card:hover { transform: translateX(4px); border-color: #7dd3fc; }
  [dir="rtl"] .miracle-pillar-card { border-left: 1px solid rgba(56, 189, 248, 0.42); border-right: 4px solid #38bdf8; }
  .pillar-badge {
    display: inline-block;
    background: linear-gradient(90deg, rgba(56, 189, 248, 0.22), rgba(251, 191, 36, 0.12));
    color: #bae6fd;
    border: 1px solid rgba(56, 189, 248, 0.55);
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    padding: 3px 11px;
    border-radius: 99px;
    margin-bottom: 8px;
  }
  .miracle-pillar-card h4 { color:#7dd3fc; font-size:1.04rem; font-weight:800; margin-bottom:8px; }
  .historians-proof-section {
    position: relative;
    background: linear-gradient(145deg, rgba(8, 20, 36, 0.92), rgba(4, 10, 20, 0.96));
    border: 1px solid rgba(56, 189, 248, 0.52);
    border-radius: 18px;
    padding: 20px 22px;
    box-shadow: 0 0 26px rgba(56, 189, 248, 0.15);
  }
  .historians-header { color:#7dd3fc; font-size:0.95rem; font-weight:900; letter-spacing:0.04em; margin-bottom:14px; text-transform:uppercase; }
  .historian-quote-box {
    background: rgba(2, 6, 12, 0.78);
    border: 1px solid rgba(56, 189, 248, 0.35);
    border-radius: 14px;
    padding: 14px 16px;
    margin-bottom: 12px;
    transition: border-color 0.2s ease;
  }
  .historian-quote-box:hover { border-color: rgba(56, 189, 248, 0.75); }
  .historian-name { color:#38bdf8; font-weight:800; font-size:0.94rem; margin-bottom:3px; }
  .historian-role { color:#94a3b8; font-size:0.81rem; margin-bottom:8px; }
  .historian-quote-box blockquote {
    color: #f8fafc;
    font-size: 0.92rem;
    line-height: 1.7;
    border-left: 3px solid rgba(251, 191, 36, 0.65);
    padding-left: 12px;
    margin: 0;
  }
  [dir="rtl"] .historian-quote-box blockquote { border-left: none; border-right: 3px solid rgba(251, 191, 36, 0.65); padding-left: 0; padding-right: 12px; }
  .proof-links-bar { display:flex; align-items:center; flex-wrap:wrap; gap:8px; margin-top:14px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.12); }
  .proof-links-label { font-size:0.8rem; font-weight:800; color:#bae6fd; width:100%; margin-bottom:4px; }
  .proof-link-pill {
    display: inline-flex;
    align-items: center;
    background: rgba(56, 189, 248, 0.16);
    color: #7dd3fc;
    border: 1px solid rgba(56, 189, 248, 0.55);
    padding: 5px 12px;
    border-radius: 99px;
    font-size: 0.76rem;
    font-weight: 700;
    text-decoration: none;
    transition: 0.2s;
  }
  .proof-link-pill:hover { background:#38bdf8; color:#021019; transform:translateY(-1px); box-shadow:0 0 14px rgba(56,189,248,0.5); }

  /* BOUTON MENTIONS LÉGALES DISCRET TOUT EN BAS DE L'ORDRE CLASSIQUE */
  .discreet-legal-btn {
    background: rgba(8, 14, 22, 0.55);
    color: #64748b;
    border: 1px solid rgba(56, 189, 248, 0.18);
    padding: 6px 16px;
    border-radius: 99px;
    font-family: inherit;
    font-size: 0.74rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
  }
  .discreet-legal-btn:hover {
    color: #cbd5e1;
    border-color: rgba(56, 189, 248, 0.45);
  }
`;

async function lancerGeneration() {
  console.log('================================================================================');
  console.log('🚀 GÉNÉRATEUR V52 (ÉTAPE 1) : MENTIONS LÉGALES UNIQUEMENT SUR ORDRE CLASSIQUE');
  console.log('================================================================================\n');

  let hamidullahParSourate = {}, anglaisParSourate = {}, espagnolParSourate = {}, arabeParSourate = {};
  try {
    const [frB, enB, esB, arB] = await Promise.all([
      telechargerJSON('https://api.alquran.cloud/v1/quran/fr.hamidullah'),
      telechargerJSON('https://api.alquran.cloud/v1/quran/en.sahih'),
      telechargerJSON('https://api.alquran.cloud/v1/quran/es.garcia').catch(() => telechargerJSON('https://api.alquran.cloud/v1/quran/es.cortes')),
      telechargerJSON('https://api.alquran.cloud/v1/quran/ar.muyassar').catch(() => ({ data: { surahs: [] } }))
    ]);
    if (frB?.data?.surahs) frB.data.surahs.forEach(s => hamidullahParSourate[s.number] = s.ayahs);
    if (enB?.data?.surahs) enB.data.surahs.forEach(s => anglaisParSourate[s.number] = s.ayahs);
    if (esB?.data?.surahs) esB.data.surahs.forEach(s => espagnolParSourate[s.number] = s.ayahs);
    if (arB?.data?.surahs) arB.data.surahs.forEach(s => arabeParSourate[s.number] = s.ayahs);
  } catch (e) {}

  const [chapFr, chapEn] = await Promise.all([
    telechargerJSON('https://api.quran.com/api/v4/chapters?language=fr'),
    telechargerJSON('https://api.quran.com/api/v4/chapters?language=en')
  ]);
  const sourates = chapFr.chapters, souratesEnMap = {};
  if (chapEn?.chapters) chapEn.chapters.forEach(c => souratesEnMap[c.id] = c.translated_name ? c.translated_name.name : '');

  const dossierSite = path.join(__dirname, 'site');
  if (!fs.existsSync(dossierSite)) fs.mkdirSync(dossierSite);
  fs.writeFileSync(path.join(dossierSite, 'favicon.svg'), LOGO_FAVICON_SVG, 'utf8');
  fs.writeFileSync(path.join(dossierSite, 'logo-v30.svg'), LOGO_FAVICON_SVG, 'utf8');

  const png180 = creerAppleTouchIconPNG(180);
  fs.writeFileSync(path.join(dossierSite, 'apple-touch-icon.png'), png180);
  const appleIconDataUri = 'data:image/png;base64,' + png180.toString('base64');

  const souratesMiracle = {};
  Object.keys(MIRACLES).forEach(k => {
    const [sId, vId] = k.split(':').map(Number);
    if (!souratesMiracle[sId]) souratesMiracle[sId] = { premierVersetMiracle: vId, titre: MIRACLES[k].titre };
  });

  const urlsSitemap = ['https://corantafsir.com/'];
  let totalVersetsVerifies = 0;

  for (let s = 0; s < sourates.length; s++) {
    const sr = sourates[s], numS = sr.id, nomS = sr.name_simple;
    const nomFr = sr.translated_name ? sr.translated_name.name : '', nomEn = souratesEnMap[numS] || nomFr, nomEs = NOMS_SOURATES_ES[numS] || nomFr, nomAr = sr.name_arabic;
    const estMec = sr.revelation_place === 'makkah', typeLabel = estMec ? 'Sourate Mecquoise' : 'Sourate Médinoise', typeCls = estMec ? 'mecquoise' : 'medinoise', lieu = estMec ? 'La Mecque' : 'Médine';
    const ordreRev = sr.revelation_order, nbV = sr.verses_count;
    const infoMiracleSourate = souratesMiracle[numS] || null;

    const [tradD, tafFrD] = await Promise.all([
      telechargerJSON(`https://quranenc.com/api/v1/translation/sura/french_rashid/${numS}`),
      telechargerJSON(`https://quranenc.com/api/v1/translation/sura/french_mokhtasar/${numS}`)
    ]);
    const [tafEnD, tafEsD, tafArD] = await Promise.all([
      telechargerJSON(`https://quranenc.com/api/v1/translation/sura/english_mokhtasar/${numS}`).catch(() => ({ result: [] })),
      telechargerJSON(`https://quranenc.com/api/v1/translation/sura/spanish_mokhtasar/${numS}`).catch(() => ({ result: [] })),
      telechargerJSON(`https://quranenc.com/api/v1/translation/sura/arabic_mokhtasar/${numS}`).catch(() => ({ result: [] }))
    ]);

    console.log(`[${numS}/114] Sourate ${numS} - ${nomS} [✓ V52 : Sans pied de page d'adresse]`);

    const donneesS = { numSourate: numS, nomSourate: nomS, nomFr, nomEn, nomEs, nomArabe: nomAr, lieu, typeSourateLabel: typeLabel, typeSourateClasse: typeCls, ordreRev, nbVersets: nbV, versets: [] };
    const vTr = tradD.result || [];
    const vTFr = separerDoublonsConsecutifs(tafFrD.result || []);
    const vTEn = separerDoublonsConsecutifs(tafEnD.result || []);
    const vTEs = separerDoublonsConsecutifs(tafEsD.result || []);
    const vTAr = tafArD.result || [];
    const vHam = hamidullahParSourate[numS] || [], vEn = anglaisParSourate[numS] || [], vEs = espagnolParSourate[numS] || [], vArM = arabeParSourate[numS] || [];

    for (let v = 0; v < vTr.length; v++) {
      totalVersetsVerifies++;
      const numV = Number(vTr[v].aya), cle = `${numS}:${numV}`;
      const texteArabe = echapperHTML(nettoyerArabe(cle, vTr[v].arabic_text));
      const tradPropre = nettoyerTradFr(cle, vHam[v]?.text || vTr[v].translation);
      const explicationUnanime = nettoyerEtSimplifierGrandTafsirFr(cle, vTFr[v]?.translation);
      const tradEn = nettoyerTexteIntl(vEn[v]?.text || '', false);
      const explicationEn = memoireGlobale.tafsirEn[cle] || nettoyerTexteIntl(vTEn[v]?.translation || '', true) || tradEn;
      const tradEs = nettoyerTexteIntl(vEs[v]?.text || '', false);
      const explicationEs = memoireGlobale.tafsirEs[cle] || nettoyerTexteIntl(vTEs[v]?.translation || '', true) || tradEs;
      const explicationAr = memoireGlobale.tafsirAr[cle] || nettoyerTafsirArabe(vTAr[v]?.translation || vArM[v]?.text || '') || texteArabe;

      const lienPrecedent = numV > 1 ? `sourate-${numS}-verset-${numV - 1}.html` : (numS > 1 ? `sourate-${sourates[s - 1].id}-verset-${sourates[s - 1].verses_count}.html` : 'index.html');
      const lienSuivant = numV < nbV ? `sourate-${numS}-verset-${numV + 1}.html` : (numS < 114 ? `sourate-${numS + 1}-verset-1.html` : 'index.html');

      donneesS.versets.push({
        numVerset: numV, texteArabe, tradPropre, tradEn, tradEs, noteUnique: '',
        explicationUnanime, explicationEn, explicationEs, explicationAr,
        precisionConsensus: SYNTHESE_LAURIER_EXEGESE[cle] || '',
        precisionEn: SYNTHESE_LAURIER_EN[cle] || '',
        precisionEs: SYNTHESE_LAURIER_ES[cle] || '',
        precisionAr: SYNTHESE_LAURIER_AR[cle] || '',
        miracle: MIRACLES[cle] || null,
        codeAudio: String(numS).padStart(3, '0') + String(numV).padStart(3, '0'),
        lienPrecedent, lienSuivant
      });
    }

    const fichierDataJS = `data-sourate-${numS}.js`;
    fs.writeFileSync(path.join(dossierSite, fichierDataJS), `window.SOURATE_DATA = ${JSON.stringify(donneesS)};`, 'utf8');

    const labelMiracleHaut = numS === 30 ? '3 Miracles (v.1-5)' : `Miracle : v.${infoMiracleSourate ? infoMiracleSourate.premierVersetMiracle : 1}`;
    const htmlAccesRapideMiracle = infoMiracleSourate
      ? `<a href="sourate-${numS}-verset-${infoMiracleSourate.premierVersetMiracle}.html" id="topMiraclePillLink" data-v="${infoMiracleSourate.premierVersetMiracle}" class="revelation-pill miracle-pill" onclick="return naviguerVerset(event, this.getAttribute('href'), false)"><span class="gold-star-icon">★</span> ${labelMiracleHaut}</a>`
      : '';

    for (let v = 0; v < donneesS.versets.length; v++) {
      const vObj = donneesS.versets[v], numV = vObj.numVerset, nomFichier = `sourate-${numS}-verset-${numV}.html`;
      urlsSitemap.push(`https://corantafsir.com/${nomFichier}`);
      let opts = '';
      for (let i = 1; i <= nbV; i++) {
        const estM = Boolean(MIRACLES[`${numS}:${i}`]);
        opts += `<option value="sourate-${numS}-verset-${i}.html" class="${estM ? 'opt-miracle-gold' : ''}" ${i === numV ? 'selected' : ''}>${estM ? '★ ' : ''}Verset ${i} / ${nbV}${estM ? ' (Miracle)' : ''}</option>`;
      }

      const htmlV = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=${ANTI_CACHE}">
  <link rel="icon" type="image/svg+xml" href="/logo-v30.svg?v=${ANTI_CACHE}">
  <link rel="canonical" href="https://corantafsir.com/${nomFichier}">
  <title>Sourate ${numS} verset ${numV} (${nomS}) - Coran & Tafsir</title>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Scheherazade+New:wght@400;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    ${CSS_COMMUN}
    body { padding:18px 20px 45px 20px; }
    .top-nav { max-width:820px; margin:0 auto 14px auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; background:var(--bg-card); backdrop-filter:blur(8px); border:1px solid rgba(56,189,248,0.28); padding:12px 20px; border-radius:16px; box-shadow:0 8px 28px rgba(0,0,0,0.45); }
    .home-btn { color:var(--sky-light); text-decoration:none; font-weight:700; font-size:0.88rem; display:inline-flex; align-items:center; gap:10px; transition:0.2s; }
    .home-btn:hover { color:#fff; }
    .nav-logo-svg { width:34px; height:34px; display:block; filter:drop-shadow(0 0 8px rgba(56,189,248,0.4)); }
    .meta-badges { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
    .tag { font-size:0.75rem; font-weight:600; padding:5px 11px; border-radius:99px; background:var(--bg-elevated); border:1px solid var(--border-color); }
    .centered-container { max-width:820px; margin:0 auto; }

    .panel {
      position: relative;
      background: var(--bg-card);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(56, 189, 248, 0.28);
      border-radius: 24px;
      padding: 26px 28px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 55px rgba(0,0,0,0.6), 0 0 30px rgba(56,189,248,0.08);
      overflow: hidden;
    }
    .panel::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.5px;
      background: conic-gradient(from var(--ae-angle), transparent 22%, rgba(14,165,233,0.72) 44%, rgba(125,211,252,0.85) 50%, rgba(251,191,36,0.38) 53%, rgba(56,189,248,0.65) 58%, transparent 78%);
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: aeLaserSpin 8s linear infinite;
      pointer-events: none;
    }

    .main-header { display:flex; justify-content:space-between; align-items:center; gap:16px; padding-bottom:16px; border-bottom:1px solid var(--border-color); margin-bottom:18px; }
    .title-group { flex:1; min-width:0; }
    .title-top-row { display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-bottom:6px; }
    .title-top-row h1 { font-size:1.25rem; color:#fff; font-weight:800; line-height:1.3; }
    .header-right-badges { display:inline-flex; align-items:center; gap:8px; flex-shrink:0; }

    .verse-jumper-select {
      background: rgba(14, 165, 233, 0.16);
      color: var(--sky-light);
      border: 1.5px solid rgba(56, 189, 248, 0.55);
      padding: 6px 12px;
      border-radius: 10px;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 800;
      cursor: pointer;
      outline: none;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.18);
      transition: 0.2s;
    }
    .verse-jumper-select:hover { background: var(--sky-bright); color: #020810; }
    .verse-jumper-select.is-miracle-gold {
      background: linear-gradient(135deg, rgba(14, 165, 233, 0.25), rgba(251, 191, 36, 0.12));
      color: #e0f2fe;
      border-color: rgba(56, 189, 248, 0.78);
      box-shadow: 0 0 16px rgba(56, 189, 248, 0.25);
    }
    .verse-jumper-select option { background:#0b1116; color:#e0f2fe; font-weight:700; }
    .verse-jumper-select option.opt-miracle-gold { background:#0c1d2c; color:#bae6fd; font-weight:800; }

    .badge-num {
      background: rgba(14, 165, 233, 0.18);
      color: var(--sky-light);
      border: 1px solid rgba(56, 189, 248, 0.5);
      font-weight: 800;
      font-size: 0.92rem;
      padding: 5px 13px;
      border-radius: 10px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .title-group p { color:var(--text-muted); font-size:0.84rem; }
    .arabic-surah { font-family:'Scheherazade New',serif; font-size:2.2rem; color:#fff; flex-shrink:0; }

    .verse-stage {
      position: relative;
      background: rgba(4, 8, 14, 0.42);
      border: 1.5px solid rgba(56, 189, 248, 0.35);
      border-radius: 22px;
      padding: 38px 30px 20px 30px;
      margin-bottom: 18px;
      text-align: center;
      overflow: hidden;
      box-shadow: 0 15px 40px rgba(0,0,0,0.5), inset 0 0 25px rgba(56,189,248,0.06);
      transition: all 0.3s ease;
    }
    .verse-stage::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.8px;
      background: conic-gradient(from var(--ae-angle), transparent 18%, #0ea5e9 40%, #7dd3fc 50%, rgba(251,191,36,0.42) 54%, #38bdf8 60%, transparent 82%);
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: aeLaserSpin 6s linear infinite;
      pointer-events: none;
    }
    .verse-stage.is-miracle-stage {
      border-color: rgba(56, 189, 248, 0.55);
      box-shadow: 0 0 32px rgba(56, 189, 248, 0.22), 0 0 18px rgba(251, 191, 36, 0.08), inset 0 0 24px rgba(56, 189, 248, 0.08);
    }
    .verse-stage.is-miracle-stage::before {
      padding: 2px;
      background: conic-gradient(from var(--ae-angle), transparent 14%, #0ea5e9 34%, #38bdf8 46%, #e0f2fe 51%, rgba(251,191,36,0.55) 55%, #38bdf8 64%, transparent 86%);
      animation-duration: 4.8s;
    }

    .arabic-glow-verse { position:relative; z-index:2; font-family:'Scheherazade New','Amiri',serif; font-size:2.9rem; line-height:2.15; direction:rtl; margin-bottom:22px; color:#fff; text-shadow:0 2px 6px rgba(0,0,0,0.95), 0 0 14px rgba(255,255,255,0.65); transition:font-size 0.15s ease; }
    .french-glow-verse { position:relative; z-index:2; font-family:'Amiri',serif; font-size:1.52rem; font-weight:700; line-height:1.65; color:#fff; text-shadow:0 2px 6px rgba(0,0,0,0.95), 0 0 12px rgba(255,255,255,0.55); max-width:94%; margin:0 auto; transition:font-size 0.15s ease; }

    .stage-blue-nav {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-top: 24px;
      padding-top: 14px;
      border-top: 1px solid rgba(56, 189, 248, 0.22);
    }
    .btn-blue-nav {
      background: linear-gradient(135deg, #38bdf8, #0ea5e9);
      color: #021019;
      border: 1px solid #7dd3fc;
      padding: 9px 22px;
      border-radius: 12px;
      font-size: 0.88rem;
      font-weight: 800;
      text-decoration: none;
      box-shadow: 0 0 18px rgba(56, 189, 248, 0.35);
      transition: 0.2s;
    }
    .btn-blue-nav:hover { background: #7dd3fc; transform: translateY(-1px); box-shadow: 0 0 24px rgba(56, 189, 248, 0.55); }

    .sync-progress-track { position:absolute; bottom:0; left:0; width:100%; height:3px; background:rgba(255,255,255,0.08); }
    .sync-progress-bar { height:100%; width:0%; background:linear-gradient(90deg,#38bdf8,#fff); }
    .audio-control-strip { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; background:var(--bg-elevated); border:1px solid rgba(56,189,248,0.24); padding:12px 18px; border-radius:16px; margin-bottom:20px; }
    .audio-left { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
    .btn-listen-sync { background:rgba(14,165,233,0.18); color:var(--sky-light); border:1px solid rgba(56,189,248,0.45); padding:8px 16px; border-radius:10px; font-weight:700; cursor:pointer; transition:0.2s; }
    .btn-listen-sync:hover, .btn-listen-sync.active { background:var(--sky-bright); color:#021019; box-shadow:0 0 18px rgba(56,189,248,0.45); }
    .btn-replay-sync { background:rgba(56,189,248,0.14); color:var(--sky-light); border:1px solid rgba(56,189,248,0.38); padding:8px 13px; border-radius:10px; font-weight:700; cursor:pointer; transition:0.2s; }
    .btn-replay-sync:hover { background:var(--sky-bright); color:#021019; }
    .reciter-mini { background:rgba(8,13,18,0.75); color:#fff; border:1px solid var(--border-color); padding:7px 12px; border-radius:10px; font-weight:600; }

    .zoom-btn-group { display:inline-flex; align-items:center; gap:4px; background:rgba(6,12,18,0.75); border:1px solid rgba(56,189,248,0.38); padding:3px; border-radius:10px; }
    .btn-zoom-text { background:rgba(56,189,248,0.14); color:var(--sky-light); border:1px solid rgba(56,189,248,0.35); padding:5px 10px; border-radius:7px; font-family:inherit; font-size:0.8rem; font-weight:800; cursor:pointer; transition:0.2s; }
    .btn-zoom-text:hover { background:var(--sky-bright); color:#021019; }

    .auto-scroll-toggle { display:inline-flex; align-items:center; gap:10px; background:rgba(8,13,18,0.72); border:1px solid rgba(255,255,255,0.14); padding:6px 14px 6px 10px; border-radius:99px; color:var(--text-muted); font-size:0.81rem; font-weight:700; cursor:pointer; }
    .auto-scroll-toggle input { display:none; }
    .switch-slider { position:relative; width:36px; height:20px; background:rgba(255,255,255,0.14); border-radius:99px; border:1px solid rgba(255,255,255,0.2); }
    .switch-slider::after { content:""; position:absolute; top:2px; left:2px; width:14px; height:14px; background:#cbd5e1; border-radius:50%; transition:0.25s; }
    .auto-scroll-toggle input:checked + .switch-slider { background:rgba(56,189,248,0.32); border-color:var(--sky-bright); }
    .auto-scroll-toggle input:checked + .switch-slider::after { transform:translateX(16px); background:var(--sky-bright); }
    .auto-scroll-toggle input:checked ~ .switch-text { color:var(--sky-light); }

    .tafsir-box { background:var(--bg-elevated); border:1px solid rgba(56,189,248,0.25); border-radius:18px; padding:26px; flex:1; display:flex; flex-direction:column; box-shadow:inset 0 0 22px rgba(56,189,248,0.04); }
    .section-tag { font-size:0.74rem; font-weight:800; text-transform:uppercase; color:var(--sky-light); margin-bottom:10px; }
    .main-explanation { font-size:1.06rem; color:#e2e8f0; line-height:1.88; margin-bottom:14px; transition:font-size 0.15s ease; }
    .consensus-note { background:rgba(56,189,248,0.10); border-left:3px solid var(--sky-bright); padding:13px 16px; border-radius:0 12px 12px 0; color:#f1f5f9; font-size:0.95rem; margin-top:12px; }
    .sources-line { margin-top:auto; padding-top:16px; border-top:1px solid var(--border-color); font-size:0.8rem; color:var(--text-muted); }
    @media (max-width:768px) {
      body { padding:10px 8px 36px 8px; }
      .panel { padding:18px 12px; }
      .verse-stage { padding:28px 16px 16px 16px; }
      .arabic-glow-verse { font-size:2.2rem; }
      .french-glow-verse { font-size:1.25rem; }
      .arabic-surah { display:none; }
    }
  </style>
</head>
<body>
  <div class="cosmos-exterior-wrapper"><canvas id="fullPageSkyCanvas"></canvas></div>
  <div class="interface-layer">
    <header class="top-nav">
      <a href="index.html?v=${ANTI_CACHE}" class="home-btn" onclick="sauvegarderConfigCiel()">${genererLogoInlineSVG('nav-logo-svg')}<span id="homeBtnTextEl">‹ Retour aux 114 Sourates</span></a>
      <div class="meta-badges">
        <span class="revelation-pill ${typeCls}" id="typeSouratePillEl">${typeLabel}</span>
        ${htmlAccesRapideMiracle}
        <span class="tag" id="revOrderTagEl">${ordreRev}e Sourate révélée (n°${numS})</span>
        <div class="lang-switcher-group">
          <button type="button" class="lang-pill-btn active" data-lang="fr" onclick="changerLangueVerset('fr')">🇫🇷 FR</button>
          <button type="button" class="lang-pill-btn" data-lang="en" onclick="changerLangueVerset('en')">🇬🇧 EN</button>
          <button type="button" class="lang-pill-btn" data-lang="es" onclick="changerLangueVerset('es')">🇪🇸 ES</button>
          <button type="button" class="lang-pill-btn" data-lang="ar" onclick="changerLangueVerset('ar')">🇸🇦 AR</button>
        </div>
      </div>
    </header>
    <div class="centered-container">
      <main class="panel">
        <div class="main-header">
          <div class="title-group">
            <div class="title-top-row">
              <h1 id="mainTitleEl">Sourate ${nomS} (${nomFr}) — Verset ${numV}</h1>
              <div class="header-right-badges">
                <div class="badge-num" id="badgeNumEl">${numS} : ${numV}</div>
              </div>
            </div>
            <p id="subHeaderInfoEl">${typeLabel} (${lieu}) • Traduction Muhammad Hamidullah (1977) & Exégèse</p>
          </div>
          <div class="arabic-surah">${nomAr}</div>
        </div>
        <section class="verse-stage ${vObj.miracle ? 'is-miracle-stage' : ''}" id="verseStage">
          <div class="arabic-glow-verse" id="arabicVerseEl">${vObj.texteArabe}</div>
          <div class="french-glow-verse" id="frenchVerseEl">${numV}. ${vObj.tradPropre}</div>
          <div class="stage-blue-nav">
            <a href="${vObj.lienPrecedent}" id="prevVerseLink" class="btn-blue-nav" onclick="return naviguerVerset(event, this.getAttribute('href'), false)">‹ Précédent</a>
            <a href="${vObj.lienSuivant}" id="nextVerseLink" class="btn-blue-nav" onclick="return naviguerVerset(event, this.getAttribute('href'), false)">Suivant ›</a>
          </div>
          <div class="sync-progress-track"><div class="sync-progress-bar" id="syncProgressBar"></div></div>
        </section>
        <div id="miracleContainer"></div>
        <div class="audio-control-strip">
          <div class="audio-left">
            <button type="button" class="btn-listen-sync" id="playSyncBtn" onclick="toggleAudioSync()">▶ Écouter le verset</button>
            <button type="button" class="btn-replay-sync" id="replaySyncBtn" onclick="rejouerAudioVerset()">↺ Rejouer</button>
            <select id="reciterSelect" class="reciter-mini" onchange="changerRecitateur()">
              <option value="Yasser_Ad-Dussary_128kbps">Yasser Al-Dosari</option>
              <option value="Alafasy_128kbps">Mishary Rashid Alafasy</option>
              <option value="Abdurrahmaan_As-Sudais_192kbps">Abderrahman Al-Soudais (HD)</option>
              <option value="Saood_ash-Shuraym_128kbps">Saoud Al-Shuraim</option>
              <option value="Nasser_Alqatami_128kbps">Nasser Al-Qatami</option>
              <option value="Minshawy_Murattal_128kbps">Mohamed Siddiq Al-Minshawi</option>
              <option value="Husary_128kbps">Mahmoud Khalil Al-Hussary</option>
            </select>
            <div class="zoom-btn-group" title="Modifier la taille du texte">
              <button type="button" class="btn-zoom-text" onclick="modifierTailleTexte(-0.1)">A-</button>
              <button type="button" class="btn-zoom-text" onclick="modifierTailleTexte(0.1)">A+</button>
            </div>
            <select id="verseJumperSelect" class="verse-jumper-select ${vObj.miracle ? 'is-miracle-gold' : ''}" onchange="naviguerVerset(event, this.value, false)">${opts}</select>
          </div>
          <label class="auto-scroll-toggle"><input type="checkbox" id="autoNextCheck"><span class="switch-slider"></span><span class="switch-text" id="switchAutoTextEl">Enchaîner automatiquement</span></label>
          <audio id="ayahAudio" preload="auto"></audio><audio id="preloadNextAudio" preload="auto" style="display:none;"></audio>
        </div>
        <article class="tafsir-box">
          <span class="section-tag" id="tafsirSectionTagEl">Tafsīr & Explication du verset</span>
          <p class="main-explanation" id="mainExplanationEl">${vObj.explicationUnanime}</p>
          <div id="extraNotesContainer"></div>
          <div class="sources-line" id="sourcesLineEl">Traduction originale de Muhammad Hamidullah (1977) • Exégèse (Tafsīr) Al-Mukhtasar</div>
        </article>
      </main>
    </div>
  </div>
  <script src="${fichierDataJS}?v=${ANTI_CACHE}"></script>
  <script>
    const numSourateActuelle = ${numS}; let numVersetActuel = ${numV}; let codeAudio = "${vObj.codeAudio}";
    ${MOTEUR_CIEL_JS}
    ${SCRIPT_VERSET_V52}
  </script>
</body>
</html>`;
      fs.writeFileSync(path.join(dossierSite, nomFichier), htmlV, 'utf8');
    }
  }

  const cartesJSON = JSON.stringify(sourates.map(s => {
    const estM = s.revelation_place === 'makkah', infM = souratesMiracle[s.id] || null;
    return {
      id: s.id, nom: s.name_simple, nomFr: s.translated_name ? s.translated_name.name : '',
      nomEn: souratesEnMap[s.id] || '', nomEs: NOMS_SOURATES_ES[s.id] || '', nomAr: s.name_arabic,
      versets: s.verses_count, ordreRev: s.revelation_order,
      typeLabel: estM ? 'Mecquoise' : 'Médinoise', typeLabelEn: estM ? 'Meccan' : 'Medinan', typeLabelEs: estM ? 'Mequí' : 'Medinense', typeLabelAr: estM ? 'مكية' : 'مدنية',
      typeClasse: estM ? 'mecquoise' : 'medinoise', hasMiracle: Boolean(infM), miracleVerset: infM ? infM.premierVersetMiracle : 1
    };
  }));

  const htmlAccueil = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="apple-touch-icon" sizes="180x180" href="${appleIconDataUri}">
  <link rel="icon" type="image/svg+xml" href="/logo-v30.svg?v=${ANTI_CACHE}">
  <link rel="canonical" href="https://corantafsir.com/">
  <link rel="alternate" hreflang="fr" href="https://corantafsir.com/?lang=fr">
  <link rel="alternate" hreflang="en" href="https://corantafsir.com/?lang=en">
  <link rel="alternate" hreflang="es" href="https://corantafsir.com/?lang=es">
  <link rel="alternate" hreflang="ar" href="https://corantafsir.com/?lang=ar">
  <link rel="alternate" hreflang="x-default" href="https://corantafsir.com/">
  <title>Coran &amp; Tafsīr | Noble Quran Tafsir in English | Corán y Tafsir en Español | القرآن الكريم والتفسير</title>
  <meta name="description" content="Read, listen and understand the 114 Surahs of the Noble Quran with authentic Tafsir and historical &amp; scientific miracles in 4 languages: Français, English, Español, العربية.">
  <meta name="keywords" content="Quran Tafsir, Coran Tafsir, Tafsir en español, تفسير القرآن الكريم, Miracles of the Quran, Miracles du Coran, Milagros del Corán, Al-Mukhtasar, Saheeh International, Hamidullah">
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Scheherazade+New:wght@400;700&family=Cinzel+Decorative:wght@700;900&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    ${CSS_COMMUN}
    body { padding:24px 4vw 60px 4vw; }
    .wrapper { max-width:1220px; margin:0 auto; }

    .hero {
      text-align: center;
      margin-bottom: 22px;
      padding: 28px 24px 22px 24px;
      background: rgba(6, 11, 16, 0.22);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(56, 189, 248, 0.28);
      border-radius: 26px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 18px 45px rgba(0,0,0,0.5);
    }
    .hero::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.5px;
      background: conic-gradient(from var(--ae-angle), transparent 20%, #38bdf8 46%, #ffffff 50%, rgba(251,191,36,0.45) 54%, transparent 80%);
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: aeLaserSpin 9s linear infinite;
      pointer-events: none;
    }
    .hero-top-lang-bar { position:absolute; top:16px; right:20px; z-index:15; }
    .hero-ornament-top { font-family:'Scheherazade New',serif; font-size:1.4rem; color:rgba(255,255,255,0.85); margin-bottom:4px; }
    .hero h1 {
      font-family: 'Cinzel Decorative', 'Scheherazade New', serif;
      font-size: 2.85rem;
      font-weight: 900;
      background: linear-gradient(90deg, #0f2942 0%, #38bdf8 25%, #e0f2fe 50%, #34d399 75%, #0f2942 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: titleShimmer 8s linear infinite;
      filter: drop-shadow(0 0 18px rgba(56,189,248,0.28));
    }
    .hero-glow-line { width:240px; height:2px; margin:12px auto 14px auto; background:linear-gradient(90deg,transparent,#fff,#38bdf8,#fff,transparent); }
    .hero-bottom-bar { display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:12px; }
    .hero-inline-logo { width:46px; height:46px; filter:drop-shadow(0 6px 16px rgba(0,0,0,0.9)) drop-shadow(0 0 14px rgba(56,189,248,0.5)); }

    .app-install-trigger {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(56, 189, 248, 0.14);
      color: #7dd3fc;
      border: 1px solid rgba(56, 189, 248, 0.45);
      padding: 9px 18px;
      border-radius: 99px;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      transition: 0.2s;
    }
    .app-install-trigger:hover { background: #38bdf8; color: #021019; }

    .resume-reading-pill { display:none; align-items:center; gap:8px; background:rgba(16,185,129,0.18); color:#6ee7b7; border:1px solid rgba(52,211,153,0.48); padding:9px 18px; border-radius:99px; font-size:0.82rem; font-weight:700; text-decoration:none; box-shadow:0 0 16px rgba(16,185,129,0.22); transition:0.2s; }
    .resume-reading-pill:hover { background:#10b981; color:#021810; }

    .app-modal-overlay { display:none; position:fixed; inset:0; background:rgba(2,5,9,0.85); backdrop-filter:blur(10px); z-index:999; align-items:center; justify-content:center; padding:20px; }
    .app-modal-overlay.open { display:flex; }
    .app-modal-card { background:#08111a; border:1.5px solid rgba(56,189,248,0.55); border-radius:22px; max-width:480px; width:100%; padding:24px; color:#f8fafc; box-shadow:0 20px 50px rgba(0,0,0,0.8); }
    .app-modal-card h3 { color:#7dd3fc; margin-bottom:12px; font-size:1.1rem; }
    .app-modal-card p { font-size:0.9rem; color:#cbd5e1; margin-bottom:12px; line-height:1.6; }
    .app-modal-close { background:linear-gradient(135deg,#38bdf8,#0ea5e9); color:#021019; border:none; padding:9px 20px; border-radius:10px; font-weight:800; cursor:pointer; width:100%; margin-top:8px; }

    .revelation-guide-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:22px; }
    .guide-box { background:rgba(8,14,20,0.28); backdrop-filter:blur(7px); border:1px solid rgba(56,189,248,0.25); border-radius:20px; padding:18px 22px; box-shadow:0 8px 24px rgba(0,0,0,0.35); }
    .guide-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; gap:8px; }
    .guide-header h3 { font-size:1rem; color:#fff; font-weight:800; }
    .guide-box p { font-size:0.86rem; color:#e2e8f0; line-height:1.68; }
    .controls { display:flex; flex-wrap:wrap; gap:12px; justify-content:center; margin-bottom:20px; }
    .sort-btn { position:relative; overflow:hidden; background:var(--bg-card); color:#fff; border:1px solid rgba(56,189,248,0.3); padding:12px 22px; border-radius:14px; font-weight:700; cursor:pointer; transition:0.25s; }
    .sort-btn:hover { border-color:#38bdf8; transform:translateY(-2px); }
    .sort-btn.active { background:linear-gradient(135deg,#38bdf8,#0ea5e9); color:#021019; border-color:#7dd3fc; box-shadow:0 0 25px rgba(56,189,248,0.55); }

    .sort-btn.miracle-tab-btn {
      background: linear-gradient(135deg, rgba(14, 165, 233, 0.22), rgba(251, 191, 36, 0.08));
      border: 1px solid rgba(56, 189, 248, 0.65);
      color: #e0f2fe;
      box-shadow: 0 0 18px rgba(56, 189, 248, 0.22);
    }
    .sort-btn.miracle-tab-btn::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.8px;
      background: conic-gradient(from var(--ae-angle), transparent 15%, #0ea5e9 38%, #7dd3fc 48%, rgba(251,191,36,0.48) 54%, #38bdf8 62%, transparent 85%);
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: aeLaserSpin 4.2s linear infinite;
      pointer-events: none;
    }
    .sort-btn.miracle-tab-btn.active {
      background: linear-gradient(135deg, #38bdf8, #0ea5e9);
      color: #020810;
      border-color: #bae6fd;
      box-shadow: 0 0 26px rgba(56, 189, 248, 0.55);
    }

    .search-box { width:100%; max-width:540px; margin:0 auto 26px auto; display:block; padding:14px 20px; border-radius:14px; border:1px solid rgba(56,189,248,0.32); background:var(--bg-card); color:#fff; font-size:0.95rem; outline:none; transition:0.2s; }
    .search-box:focus { border-color:#38bdf8; box-shadow:0 0 20px rgba(56,189,248,0.25); }
    .grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(310px, 1fr)); gap:16px; }

    .card {
      background: var(--bg-card);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(56, 189, 248, 0.22);
      border-radius: 18px;
      padding: 18px 20px;
      text-decoration: none;
      color: inherit;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    }
    .card:hover {
      border-color: rgba(56, 189, 248, 0.75);
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.55), 0 0 22px rgba(56,189,248,0.25);
    }

    .card.miracle-card-glow {
      background: linear-gradient(145deg, rgba(8, 22, 38, 0.62) 0%, rgba(5, 11, 19, 0.52) 100%);
      border: 1px solid rgba(56, 189, 248, 0.45);
      box-shadow: 0 10px 28px rgba(0,0,0,0.55), 0 0 18px rgba(56, 189, 248, 0.16);
    }
    .card.miracle-card-glow::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.6px;
      background: conic-gradient(from var(--ae-angle), transparent 18%, #0ea5e9 38%, #7dd3fc 48%, rgba(251,191,36,0.42) 53%, #38bdf8 60%, transparent 82%);
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: aeLaserSpin 5.2s linear infinite;
      pointer-events: none;
    }
    .card.miracle-card-glow:hover {
      transform: translateY(-4px);
      border-color: rgba(56, 189, 248, 0.82);
      box-shadow: 0 14px 32px rgba(56, 189, 248, 0.28), 0 0 16px rgba(251, 191, 36, 0.12);
    }

    .card.rum-featured-card {
      background: linear-gradient(135deg, rgba(10, 32, 54, 0.78) 0%, rgba(7, 18, 32, 0.68) 100%);
      border: 1.5px solid rgba(56, 189, 248, 0.68);
      box-shadow: 0 0 26px rgba(56, 189, 248, 0.28), 0 0 16px rgba(251, 191, 36, 0.10);
    }
    .card.rum-featured-card::before {
      padding: 2px;
      background: conic-gradient(from var(--ae-angle), transparent 12%, #0ea5e9 32%, #38bdf8 45%, #e0f2fe 50%, rgba(251,191,36,0.52) 55%, #38bdf8 65%, transparent 88%);
      animation-duration: 4.2s;
    }
    .card.rum-featured-card .num-badge {
      background: linear-gradient(135deg, rgba(14, 165, 233, 0.28), rgba(251, 191, 36, 0.12));
      color: #bae6fd;
      border-color: rgba(56, 189, 248, 0.72);
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.28);
    }

    .card-left { position:relative; z-index:2; display:flex; align-items:center; gap:14px; }
    .num-badge { background:rgba(14,165,233,0.18); color:var(--sky-light); border:1px solid rgba(56,189,248,0.38); font-weight:800; padding:9px 13px; border-radius:10px; min-width:48px; text-align:center; }
    .card-info h2 { font-size:1.02rem; color:#fff; margin-bottom:5px; font-weight:700; }
    .card-meta-row { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
    .card-meta-text { font-size:0.78rem; color:var(--text-muted); }
    .ar-name { position:relative; z-index:2; font-family:'Scheherazade New',serif; font-size:1.7rem; color:#fff; }
    @media (max-width:820px) { .hero-top-lang-bar { position:static; margin-bottom:10px; display:flex; justify-content:center; } .hero h1 { font-size:2rem; } .revelation-guide-grid { grid-template-columns:1fr; } }
  </style>
</head>
<body>
  <div class="cosmos-exterior-wrapper"><div id="dynamicSkyLighting"></div><canvas id="fullPageSkyCanvas"></canvas><div class="flat-earth-sun" id="flatEarthSun"><div class="sun-core"></div></div><div class="flat-earth-moon" id="flatEarthMoon"><div class="moon-white-core"></div></div></div>
  <div class="wrapper interface-layer">
    <header class="hero">
      <div class="hero-top-lang-bar">
        <div class="lang-switcher-group">
          <button type="button" class="lang-pill-btn active" data-lang="fr" onclick="changerLangueAccueil('fr')">🇫🇷 FR</button>
          <button type="button" class="lang-pill-btn" data-lang="en" onclick="changerLangueAccueil('en')">🇬🇧 EN</button>
          <button type="button" class="lang-pill-btn" data-lang="es" onclick="changerLangueAccueil('es')">🇪🇸 ES</button>
          <button type="button" class="lang-pill-btn" data-lang="ar" onclick="changerLangueAccueil('ar')">🇸🇦 AR</button>
        </div>
      </div>
      <div class="hero-ornament-top">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
      <h1 id="heroTitleEl">LE NOBLE CORAN &amp; TAFSĪR</h1>
      <div class="hero-glow-line"></div>
      <div class="hero-bottom-bar">
        ${genererLogoInlineSVG('hero-inline-logo')}
        <button type="button" class="app-install-trigger" id="appInstallBtnEl" onclick="document.getElementById('appInstallModal').classList.add('open')">📲 Mettre le site en application sur téléphone (Safari / Android)</button>
        <a href="#" id="resumeReadingBtn" class="resume-reading-pill" onclick="sauvegarderConfigCiel()">${ICONE_LIVRE_SVG}<span id="resumeTextSpan">Reprendre ma lecture</span></a>
      </div>
    </header>
    <section class="revelation-guide-grid" id="guideGridEl">
      <div class="guide-box"><div class="guide-header"><h3 id="mecTitleEl">Qu'est-ce qu'une Sourate Mecquoise ?</h3><span class="revelation-pill mecquoise" id="mecPillEl">Mecquoise • 86 Sourates</span></div><p id="mecDescEl">Révélée au début de la révélation (avant l'Hégire), lorsque les croyants étaient encore peu nombreux à La Mecque : fonde l'Unicité pure d'Allāh (Tawhīd), les preuves de la foi, le Jugement dernier et l'histoire des Prophètes.</p></div>
      <div class="guide-box"><div class="guide-header"><h3 id="medTitleEl">Qu'est-ce qu'une Sourate Médinoise ?</h3><span class="revelation-pill medinoise" id="medPillEl">Médinoise • 28 Sourates</span></div><p id="medDescEl">Révélée après l'Hégire, lorsque les musulmans sont devenus nombreux, unis à Médine, victorieux lors des grandes batailles (comme Badr) et jusqu'à la conquête de La Mecque : détaille les adorations, les lois sociales et la justice.</p></div>
    </section>
    <div class="controls">
      <button class="sort-btn active" id="sortBtn1" onclick="trier('classique', this)">1. Ordre classique (1 à 114)</button>
      <button class="sort-btn" id="sortBtn2" onclick="trier('chrono', this)">2. Ordre de Révélation (1 à 114)</button>
      <button class="sort-btn miracle-tab-btn" id="sortBtn3" onclick="trier('miracles', this)">3. <span class="gold-star-icon">★</span> Les Miracles du Coran</button>
    </div>
    <input type="text" id="searchInput" class="search-box" placeholder="Rechercher une sourate ou un verset direct (ex: 30:1, 54:1, 2:255...)" oninput="afficher()">
    <div id="grid" class="grid"></div>

    <!-- BOUTON MENTIONS LÉGALES VISIBLE UNIQUEMENT TOUT EN BAS DE L'ONGLET 1 (ORDRE CLASSIQUE) -->
    <div id="classicLegalWrap" style="text-align:center; margin-top:34px; padding-bottom:10px;">
      <button type="button" class="discreet-legal-btn" id="legalBtnEl" onclick="document.getElementById('legalModal').classList.add('open')">Mentions légales</button>
    </div>
  </div>

  <div class="app-modal-overlay" id="appInstallModal" onclick="if(event.target===this)this.classList.remove('open')">
    <div class="app-modal-card" id="appInstallModalCard">
      <h3 id="appModalTitleEl">📲 Installer CoranTafsir sur votre téléphone</h3>
      <p id="appModalIosEl"><strong>Sur iPhone (Safari) :</strong> Appuyez sur l'icône <strong>Partager</strong> (le carré avec une flèche vers le haut en bas de l'écran), puis choisissez <strong>« Sur l'écran d'accueil »</strong>.</p>
      <p id="appModalAndroidEl"><strong>Sur Android (Chrome) :</strong> Appuyez sur les <strong>3 petits points</strong> en haut à droite, puis sélectionnez <strong>« Ajouter à l'écran d'accueil »</strong>.</p>
      <button type="button" class="app-modal-close" id="appModalCloseEl" onclick="document.getElementById('appInstallModal').classList.remove('open')">Fermer</button>
    </div>
  </div>

  <div class="app-modal-overlay" id="legalModal" onclick="if(event.target===this)this.classList.remove('open')">
    <div class="app-modal-card" id="legalModalCard" style="text-align:center;">
      <h3 id="legalModalTitleEl">⚖️ Mentions légales</h3>
      <p id="legalModalDescEl">Portail éducatif, linguistique et culturel gratuit (sans publicité commerciale) édité par l'Association Loi 1901 à but non lucratif :</p>
      <p style="color:#7dd3fc; font-weight:800; font-size:0.98rem;">« Institut Numérique Coran, Langues &amp; Tafsīr »</p>
      <button type="button" class="app-modal-close" id="legalModalCloseEl" onclick="document.getElementById('legalModal').classList.remove('open')">Fermer</button>
    </div>
  </div>

  <script>
    const sourates = ${cartesJSON};
    const V_STAMP = "${ANTI_CACHE}";
    let modeTri = 'classique', currentLang = 'fr', lastReadData = null;
    try {
      const sl = localStorage.getItem('site_lang_v32');
      if (['fr','en','es','ar'].includes(sl)) currentLang = sl;
      const sr = localStorage.getItem('last_read_v28');
      if (sr) {
        const p = JSON.parse(sr);
        if (p && p.s && p.v) lastReadData = p;
      }
    } catch(e){}
    function trier(m, btn) { modeTri = m; document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); afficher(); }
    function changerLangueAccueil(l) { currentLang = l; try { localStorage.setItem('site_lang_v32', l); } catch(e){} appliquerLangueAccueil(); }
    function appliquerLangueAccueil() {
      document.querySelectorAll('.lang-pill-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === currentLang));
      const isAr = currentLang === 'ar', isEn = currentLang === 'en', isEs = currentLang === 'es';

      document.getElementById('heroTitleEl').textContent = isAr ? "القرآن الكريم والتفسير المختصر" : (isEn ? "THE NOBLE QURAN & TAFSĪR" : (isEs ? "EL NOBLE CORÁN Y TAFSĪR" : "LE NOBLE CORAN & TAFSĪR"));

      const appBtn = document.getElementById('appInstallBtnEl');
      if (appBtn) {
        appBtn.textContent = isAr
          ? "📲 تثبيت الموقع كتطبيق على الهاتف (آيفون / أندرويد)"
          : (isEn ? "📲 Add website as an App on phone (Safari / Android)" : (isEs ? "📲 Instalar como aplicación en el móvil (Safari / Android)" : "📲 Mettre le site en application sur téléphone (Safari / Android)"));
      }

      if (lastReadData) {
        const btnR = document.getElementById('resumeReadingBtn');
        const spanR = document.getElementById('resumeTextSpan');
        btnR.href = "sourate-" + lastReadData.s + "-verset-" + lastReadData.v + ".html?v=" + V_STAMP;
        const pref = isAr ? "متابعة القراءة : " : (isEn ? "Resume: " : (isEs ? "Continuar: " : "Reprendre : "));
        const motV = isAr ? "آية " : (isEs ? "a." : "v.");
        spanR.textContent = pref + (lastReadData.nom || ("Surah " + lastReadData.s)) + " (" + motV + lastReadData.v + ")";
        btnR.style.display = "inline-flex";
      }

      const guideGrid = document.getElementById('guideGridEl');
      if (guideGrid) {
        guideGrid.setAttribute('dir', isAr ? 'rtl' : 'ltr');
        guideGrid.style.textAlign = isAr ? 'right' : 'left';
      }
      document.getElementById('mecTitleEl').textContent = isAr ? "ما هي السورة المكية؟" : (isEn ? "What is a Meccan Surah?" : (isEs ? "¿Qué es una Sura Mequí?" : "Qu'est-ce qu'une Sourate Mecquoise ?"));
      document.getElementById('mecPillEl').textContent = isAr ? "مكية • 86 سورة" : (isEn ? "Meccan • 86 Surahs" : (isEs ? "Mequí • 86 Suras" : "Mecquoise • 86 Sourates"));
      document.getElementById('mecDescEl').textContent = isAr
        ? "نزلت في بداية الوحي (قبل الهجرة) حين كان المسلمون قلة مستضعفين بمكة : ترسّخ التوحيد الخالص لله، ودلائل الإيمان، والبعث وقصص الأنبياء."
        : (isEn
            ? "Revealed at the beginning of revelation (before the Hijrah), when the believers were still few in Makkah: establishes the pure Oneness of Allāh (Tawhīd), proofs of faith, the Hereafter, and the stories of the Prophets."
            : (isEs
                ? "Revelada al inicio de la revelación (antes de la Hégira), cuando los creyentes aún eran pocos en La Meca: establece el Monoteísmo puro de Allah (Tawhīd), las pruebas de la fe, el Juicio Final y las historias de los Profetas."
                : "Révélée au début de la révélation (avant l'Hégire), lorsque les croyants étaient encore peu nombreux à La Mecque : fonde l'Unicité pure d'Allāh (Tawhīd), les preuves de la foi, le Jugement dernier et l'histoire des Prophètes."));

      document.getElementById('medTitleEl').textContent = isAr ? "ما هي السورة المدنية؟" : (isEn ? "What is a Medinan Surah?" : (isEs ? "¿Qué es una Sura Medinense?" : "Qu'est-ce qu'une Sourate Médinoise ?"));
      document.getElementById('medPillEl').textContent = isAr ? "مدنية • 28 سورة" : (isEn ? "Medinan • 28 Surahs" : (isEs ? "Medinense • 28 Suras" : "Médinoise • 28 Sourates"));
      document.getElementById('medDescEl').textContent = isAr
        ? "نزلت بعد الهجرة حين كثر المسلمون وقويت شوكتهم بالمدينة وانتصروا في الغزوات (كبدر) وحتى فتح مكة : تفصّل العبادات والشرائع والعدل."
        : (isEn
            ? "Revealed after the Hijrah, when the Muslims grew numerous, united in Madinah, victorious in major battles (like Badr) and up to the Conquest of Makkah: details worship, social laws, and justice."
            : (isEs
                ? "Revelada después de la Hégira, cuando los musulmanes se hicieron numerosos en Medina, victoriosos en las batallas (como Badr) y hasta la conquista de La Meca: detalla las adoraciones, las leyes sociales y la justicia."
                : "Révélée après l'Hégire, lorsque les musulmans sont devenus nombreux, unis à Médine, victorieux lors des grandes batailles (comme Badr) et jusqu'à la conquête de La Mecque : détaille les adorations, les lois sociales et la justice."));

      document.getElementById('sortBtn1').textContent = isAr ? "1. ترتيب المصحف (1 إلى 114)" : (isEn ? "1. Traditional Order (1 to 114)" : (isEs ? "1. Orden tradicional (1 a 114)" : "1. Ordre classique (1 à 114)"));
      document.getElementById('sortBtn2').textContent = isAr ? "2. ترتيب النزول (1 إلى 114)" : (isEn ? "2. Revelation Order (1 to 114)" : (isEs ? "2. Orden de Revelación (1 a 114)" : "2. Ordre de Révélation (1 à 114)"));
      document.getElementById('sortBtn3').innerHTML = isAr
        ? '3. <span class="gold-star-icon">★</span> آيات الإعجاز القرآني'
        : (isEn ? '3. <span class="gold-star-icon">★</span> Miracles of the Quran' : (isEs ? '3. <span class="gold-star-icon">★</span> Milagros del Corán' : '3. <span class="gold-star-icon">★</span> Les Miracles du Coran'));

      // Traduction complète de la fenêtre "Installer l'application" (FR / EN / ES / AR)
      const appCard = document.getElementById('appInstallModalCard');
      if (appCard) {
        appCard.setAttribute('dir', isAr ? 'rtl' : 'ltr');
        appCard.style.textAlign = isAr ? 'right' : 'left';
      }
      const appTitle = document.getElementById('appModalTitleEl');
      if (appTitle) appTitle.textContent = isAr ? "📲 تثبيت الموقع كتطبيق على هاتفك" : (isEn ? "📲 Install CoranTafsir on your phone" : (isEs ? "📲 Instalar CoranTafsir en tu teléfono" : "📲 Installer CoranTafsir sur votre téléphone"));
      const appIos = document.getElementById('appModalIosEl');
      if (appIos) appIos.innerHTML = isAr
        ? "<strong>على آيفون (Safari) :</strong> اضغط على أيقونة <strong>المشاركة</strong> (المربع الذي يخرج منه سهم للأعلى في أسفل الشاشة)، ثم اختر <strong>«إضافة إلى الشاشة الرئيسية»</strong>."
        : (isEn
            ? "<strong>On iPhone (Safari):</strong> Tap the <strong>Share</strong> icon (the square with an upward arrow at the bottom of the screen), then select <strong>«Add to Home Screen»</strong>."
            : (isEs
                ? "<strong>En iPhone (Safari):</strong> Pulsa el icono <strong>Compartir</strong> (el cuadrado con una flecha hacia arriba en la parte inferior) y elige <strong>«Añadir a la pantalla de inicio»</strong>."
                : "<strong>Sur iPhone (Safari) :</strong> Appuyez sur l'icône <strong>Partager</strong> (le carré avec une flèche vers le haut en bas de l'écran), puis choisissez <strong>« Sur l'écran d'accueil »</strong>."));
      const appAndroid = document.getElementById('appModalAndroidEl');
      if (appAndroid) appAndroid.innerHTML = isAr
        ? "<strong>على أندرويد (Chrome) :</strong> اضغط على <strong>النقاط الثلاث</strong> في أعلى اليمين، ثم اختر <strong>«الإضافة إلى الشاشة الرئيسية»</strong>."
        : (isEn
            ? "<strong>On Android (Chrome):</strong> Tap the <strong>3 dots</strong> in the top right corner, then select <strong>«Add to Home screen»</strong>."
            : (isEs
                ? "<strong>En Android (Chrome):</strong> Pulsa los <strong>3 puntos</strong> arriba a la derecha y selecciona <strong>«Añadir a pantalla de inicio»</strong>."
                : "<strong>Sur Android (Chrome) :</strong> Appuyez sur les <strong>3 petits points</strong> en haut à droite, puis sélectionnez <strong>« Ajouter à l'écran d'accueil »</strong>."));
      const appClose = document.getElementById('appModalCloseEl');
      if (appClose) appClose.textContent = isAr ? "إغلاق" : (isEn ? "Close" : (isEs ? "Cerrar" : "Fermer"));

      // Traduction complète du bouton et de la fenêtre "Mentions légales" (FR / EN / ES / AR)
      const legCard = document.getElementById('legalModalCard');
      if (legCard) legCard.setAttribute('dir', isAr ? 'rtl' : 'ltr');
      const legBtn = document.getElementById('legalBtnEl');
      if (legBtn) legBtn.textContent = isAr ? "الإشعار القانوني" : (isEn ? "Legal Notice" : (isEs ? "Aviso legal" : "Mentions légales"));
      const legTitle = document.getElementById('legalModalTitleEl');
      if (legTitle) legTitle.textContent = isAr ? "⚖️ الإشعار القانوني" : (isEn ? "⚖️ Legal Notice" : (isEs ? "⚖️ Aviso legal" : "⚖️ Mentions légales"));
      const legDesc = document.getElementById('legalModalDescEl');
      if (legDesc) legDesc.textContent = isAr
        ? "بوابة تعليمية ولغوية وثقافية مجانية (بدون إعلانات تجارية) تصدر عن الجمعية غير الربحية :"
        : (isEn
            ? "Free educational, linguistic and cultural portal (ad-free) published by the non-profit organization:"
            : (isEs
                ? "Portal educativo, lingüístico y cultural gratuito (sin publicidad comercial) editado por la asociación sin ánimo de lucro:"
                : "Portail éducatif, linguistique et culturel gratuit (sans publicité commerciale) édité par l'Association Loi 1901 à but non lucratif :"));
      const legClose = document.getElementById('legalModalCloseEl');
      if (legClose) legClose.textContent = isAr ? "إغلاق" : (isEn ? "Close" : (isEs ? "Cerrar" : "Fermer"));

      document.getElementById('searchInput').placeholder = isAr
        ? "ابحث عن سورة أو آية مباشرة (مثال: 30:1، 54:1، 2:255...)"
        : (isEn ? "Search a surah or direct verse (e.g., 30:1, 54:1, 2:255...)" : (isEs ? "Buscar una sura o aleya directa (ej: 30:1, 54:1, 2:255...)" : "Rechercher une sourate ou un verset direct (ex: 30:1, 54:1, 2:255...)"));

      afficher();
    }
    function afficher() {
      const q = document.getElementById('searchInput').value.toLowerCase().trim();
      const isAr = currentLang === 'ar', isEn = currentLang === 'en', isEs = currentLang === 'es';

      // Affichage du bouton Mentions légales uniquement tout en bas de l'Ordre classique
      const legWrap = document.getElementById('classicLegalWrap');
      if (legWrap) {
        legWrap.style.display = (modeTri === 'classique' && !q) ? 'block' : 'none';
      }

      let directHTML = '';
      const mv = q.match(/^(\\d{1,3})\\s*[:\\/-]\\s*(\\d{1,3})$/);
      if (mv) {
        const ns = Number(mv[1]), nv = Number(mv[2]), st = sourates.find(x => x.id === ns);
        if (st && nv >= 1 && nv <= st.versets) {
          const txtOuvrir = isAr ? ('فتح سورة ' + st.nomAr + ' — الآية ' + nv) : (isEn ? ('Open Surah ' + st.nom + ' — Verse ' + nv) : (isEs ? ('Abrir Sura ' + st.nom + ' — Aleya ' + nv) : ('Ouvrir Sourate ' + st.nom + ' — Verset ' + nv)));
          directHTML = '<a href="sourate-' + ns + '-verset-' + nv + '.html?v=' + V_STAMP + '" class="card miracle-card-glow"><div class="card-left"><div class="num-badge">' + ns + ':' + nv + '</div><div class="card-info"><h2>' + txtOuvrir + '</h2></div></div><div class="ar-name">' + st.nomAr + '</div></a>';
        }
      }
      let liste = sourates.filter(s => {
        if (modeTri === 'miracles' && !s.hasMiracle) return false;
        if (mv) return s.id === Number(mv[1]);
        return s.nom.toLowerCase().includes(q) || s.nomFr.toLowerCase().includes(q) || s.nomEn.toLowerCase().includes(q) || s.nomEs.toLowerCase().includes(q) || s.nomAr.includes(q) || String(s.id) === q;
      });

      if (modeTri === 'miracles') {
        liste.sort((a, b) => {
          if (a.id === 30) return -1;
          if (b.id === 30) return 1;
          return a.id - b.id;
        });
      } else if (modeTri === 'chrono') {
        liste.sort((a, b) => a.ordreRev - b.ordreRev);
      } else {
        liste.sort((a, b) => a.id - b.id);
      }

      document.getElementById('grid').innerHTML = directHTML + liste.map(s => {
        const badge = modeTri === 'chrono' ? s.ordreRev : s.id;
        const nomT = isEn ? s.nomEn : (isEs ? s.nomEs : s.nomFr);
        const titre = isAr ? ("سورة " + s.nomAr + " (" + s.nom + ")") : (s.nom + " (" + nomT + ")");
        const typeP = isAr ? s.typeLabelAr : (isEn ? s.typeLabelEn : (isEs ? s.typeLabelEs : s.typeLabel));
        const vCible = (modeTri === 'miracles' && s.hasMiracle) ? s.miracleVerset : 1;

        let txtBadgeMiracle = '';
        if (s.id === 30) {
          txtBadgeMiracle = isAr
            ? '<span class="gold-star-icon">★</span> 3 معجزات (آية 1-5)'
            : (isEs ? '<span class="gold-star-icon">★</span> 3 Milagros (a.1-5)' : '<span class="gold-star-icon">★</span> 3 Miracles (v.1-5)');
        } else {
          txtBadgeMiracle = isAr
            ? ('<span class="gold-star-icon">★</span> إعجاز (آية ' + s.miracleVerset + ')')
            : (isEs ? ('<span class="gold-star-icon">★</span> Milagro (a.' + s.miracleVerset + ')') : ('<span class="gold-star-icon">★</span> Miracle (v.' + s.miracleVerset + ')'));
        }

        const mPill = s.hasMiracle ? '<span class="revelation-pill miracle-pill">' + txtBadgeMiracle + '</span>' : '';
        const txtNbV = isAr ? (s.versets + ' آية') : (isEs ? (s.versets + ' a.') : (s.versets + ' v.'));
        const classesCarte = 'card' + (s.hasMiracle ? ' miracle-card-glow' : '') + (s.id === 30 && modeTri === 'miracles' ? ' rum-featured-card' : '');
        return '<a href="sourate-' + s.id + '-verset-' + vCible + '.html?v=' + V_STAMP + '" class="' + classesCarte + '" onclick="sauvegarderConfigCiel()"><div class="card-left"><div class="num-badge">' + badge + '</div><div class="card-info"><h2>' + titre + '</h2><div class="card-meta-row"><span class="revelation-pill ' + s.typeClasse + '">' + typeP + '</span>' + mPill + '<span class="card-meta-text">' + txtNbV + '</span></div></div></div><div class="ar-name">' + s.nomAr + '</div></a>';
      }).join('');
    }
    appliquerLangueAccueil();
    ${MOTEUR_CIEL_JS}
  </script>
</body>
</html>`;
  fs.writeFileSync(path.join(dossierSite, 'index.html'), htmlAccueil, 'utf8');

  const xmlSitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urlsSitemap.map(u => '  <url><loc>' + u + '</loc><changefreq>monthly</changefreq><priority>' + (u.endsWith('.com/') ? '1.0' : '0.8') + '</priority></url>').join('\n') +
    '\n</urlset>';
  fs.writeFileSync(path.join(dossierSite, 'sitemap.xml'), xmlSitemap, 'utf8');
  fs.writeFileSync(path.join(dossierSite, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://corantafsir.com/sitemap.xml\n', 'utf8');
  console.log('\n================================================================================');
  console.log('✅ SITE + SEO 4 LANGUES + SITEMAP.XML + MENTIONS LÉGALES & APP TRADUITS GÉNÉRÉS !');
  console.log('================================================================================');
}

lancerGeneration();

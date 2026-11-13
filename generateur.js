/*ONEDRIVE_SAFE*/(function(){const _fs=require("fs"),_w=_fs.writeFileSync;_fs.writeFileSync=function(p,d,o){for(let i=0;i<15;i++){try{return _w.call(_fs,p,d,o);}catch(e){if(i===14)throw e;Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,80);}}};})();
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
// 1. DOSSIER COMPLET DE SOURATE AR-RŪM (30:1 À 30:5) EN 8 langues (FR, EN, ES, AR, DE, IT, ID, RU)
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
const TAFSIR_SOURATE_96_FR = {
  "96:1": "<strong style='color:#ffffff;'>Ô Messager, lis ce qu’Allāh te révèle en commençant par le Nom de ton Seigneur qui a créé toutes les créatures.</strong><br><br>📜 <strong>Hadith du début de la Révélation (1re sourate révélée) :</strong> ‘Ā’ishah, la Mère des croyants (qu’Allāh l’agrée), rapporte : <em>« Le début de la révélation au Messager d’Allāh ﷺ prit la forme de visions pieuses durant son sommeil, aussi claires que l’aube. Puis l’amour de la retraite lui fut inspiré et il se retirait seul dans la <strong>grotte de Hirā’</strong> pour adorer Allāh durant plusieurs nuits avant de revenir s’approvisionner auprès de Khadījah. »</em><br><br>Un jour, l’Ange <strong>Jibrīl (Gabriel)</strong> vint à lui dans la grotte et dit : <em>« Lis ! (Iqra’) »</em>. Le Prophète ﷺ répondit : <em>« Je ne sais pas lire. »</em> Il raconte : <em>« L’Ange me saisit et me serra jusqu’à me faire perdre toute force, puis me relâcha et dit : “Lis !” Je répondis : “Je ne sais pas lire.” Il me serra une deuxième fois puis une troisième fois avant de me relâcher en disant : “Lis, au nom de ton Seigneur qui a créé, qui a créé l’homme d’une adhérence. Lis ! Ton Seigneur est le Très Noble.” »</em><br><br>Le Messager d’Allāh ﷺ rentra avec ces versets, le cœur tremblant, auprès de <strong>Khadījah bint Khuwaylid</strong> et dit : <em>« Enveloppez-moi ! Enveloppez-moi ! »</em>. Khadījah le rassura : <em>« Non ! Par Allāh, Allāh ne t’humiliera jamais : tu maintiens les liens de parenté, tu portes le fardeau du faible, tu donnes au démuni et tu secours les victimes des épreuves. »</em> Elle l’emmena ensuite chez son cousin <strong>Waraqah ibn Nawfal</strong>, qui s’écria : <em>« C’est le Nāmūs (l’Ange Jibrīl) qu’Allāh a envoyé à Moïse ! »</em> (<em>Rapporté par Al-Bukhārī n°3 et Muslim n°160</em>).",
  "96:2": "<strong style='color:#ffffff;'>C’est Lui qui a créé l’être humain à partir d’une « ‘Alaqah » (une adhérence suspendue et irriguée de sang)</strong>, après le stade de la goutte séminale (<em>Nutfah</em>).<br><br>Après avoir proclamé au verset 1 qu’Allāh est le Créateur de tout l’univers, ce verset rappelle à l’homme l’humilité de son origine biologique : formé à partir d’une minuscule adhérence accrochée à la paroi utérine, il a été élevé par la grâce d’Allāh au rang de créature douée d’intelligence, de parole et de discernement.",
  "96:3": "<strong style='color:#ffffff;'>Lis, ô Messager, ce qu’Allāh te révèle ! Car ton Seigneur est le Très Noble (Al-Akram)</strong>, Celui dont la générosité, la clémence et la magnanimité n’ont aucun égal.<br><br>Lorsque le Prophète ﷺ répondit à l’Ange <em>« Je ne sais pas lire »</em>, Allāh répéta l’ordre <em>« Lis ! »</em> en lui annonçant que son Seigneur est <strong>Al-Akram (le Très Généreux)</strong> : Celui qui enseigne à qui ne savait pas lire, facilite la mémorisation du Coran et comble Ses serviteurs de Ses bienfaits.",
  "96:4": "<strong style='color:#ffffff;'>C’est Lui qui a enseigné l’écriture à l’être humain par l’usage de la plume (Al-Qalam)</strong>.<br><br>Par cet immense bienfait divin, l’homme peut fixer la parole, préserver les sciences, consigner la Révélation et transmettre le savoir à travers les siècles. Qatādah disait : <em>« La plume est un bienfait grandiose d’Allāh ; sans elle, aucune religion ne subsisterait et aucune vie sociale ne serait ordonnée. »</em>",
  "96:5": "<strong style='color:#ffffff;'>Et Il a enseigné à l’être humain ce qu’il ne savait absolument pas</strong>.<br><br>Sorti du ventre de sa mère dépourvu de toute connaissance (<em>Sourate An-Nahl 16:78</em>), l’être humain a reçu d’Allāh l’ouïe, la vue, la raison et la révélation prophétique qui l’ont fait sortir des ténèbres de l’ignorance vers la lumière du savoir.",
  "96:6": "<strong style='color:#ffffff;'>Prenez garde ! En vérité, l’être humain rebelle dépasse toutes les limites (Yatghā)</strong> et s’enfle d’arrogance lorsqu’il oublie son Créateur.<br><br>📜 <strong>Contexte de révélation :</strong> Les exégètes (At-Tabarī, Al-Qurtubī, Ibn Kathīr) précisent que les versets 6 à 19 furent révélés au sujet d’<strong>Abū Jahl (‘Amr ibn Hishām)</strong>, le chef mecquois qui persécutait le Prophète ﷺ, tout en visant quiconque se laisse aveugler par l’orgueil et la fortune.",
  "96:7": "<strong style='color:#ffffff;'>Et cela dès qu’il se voit dans l’aisance et s’imagine pouvoir se suffire à lui-même (Istaghna)</strong> grâce à sa richesse, son prestige et ses partisans.<br><br>Quand il se voit comblé de biens et de santé, l’homme ingrat — à l’image d’Abū Jahl à La Mecque — s’imagine qu’il n’a plus besoin de son Seigneur ni de Ses commandements.",
  "96:8": "<strong style='color:#ffffff;'>Mais en vérité, c’est vers ton Seigneur qu’aura lieu le retour final (Ar-Ruj‘ā) de toute créature !</strong><br><br>Allāh le menace ici en lui rappelant : comment peut-il se rebeller contre son Seigneur alors qu’il retournera inévitablement seul devant Lui au Jour de la Résurrection pour rendre compte de sa richesse et de chacun de ses actes ?",
  "96:9": "<strong style='color:#ffffff;'>As-tu vu (ô Messager) un cas plus étonnant que celui qui interdit</strong> avec arrogance d’adorer Allāh ?<br><br>📜 <strong>Récit historique :</strong> Ibn ‘Abbās rapporte que ce verset fut révélé au sujet d’<strong>Abū Jahl</strong> lorsqu’il menaça le Prophète Muhammad ﷺ et voulut l’empêcher de prier près de la Ka‘bah sacrée (<em>Sahīh Al-Bukhārī n°4958</em>).",
  "96:10": "<strong style='color:#ffffff;'>Qui ose interdire à un serviteur d’Allāh — le Prophète Muhammad ﷺ — d’accomplir sa prière (Salāt)</strong> lorsqu’il se lève et se prosterne pour son Seigneur près de la Ka‘bah ?<br><br>En qualifiant Muhammad ﷺ de <strong>« ‘Abd » (Serviteur d’Allāh)</strong>, Allāh honore son Prophète ﷺ et souligne que sa prière ne dépend que du Maître des mondes, et non des tyrans de Quraysh.",
  "96:11": "<strong style='color:#ffffff;'>Que penses-tu (ô Abū Jahl) si ce serviteur que tu empêches de prier (Muhammad ﷺ) est sur la bonne voie (Al-Hudā)</strong> et sur une lumière claire venant de son Seigneur ?<br><br>Comment oses-tu menacer un homme guidé par la vérité divine alors que tu demeures toi-même dans l’égarement et l’idolâtrie ?",
  "96:12": "<strong style='color:#ffffff;'>Ou s’il ordonne la piété (At-Taqwā), l’Unicité d’Allāh et la bienfaisance ?</strong><br><br>Celui qui appelle les gens à craindre Allāh, à délaisser les interdits et à accomplir le bien mérite-t-il d’être soutenu et respecté, ou d’être combattu et empêché de prier ?",
  "96:13": "<strong style='color:#ffffff;'>Vois-tu (ô Muhammad ﷺ) la gravité de son sort si cet oppresseur (Abū Jahl) dément la vérité (Kadh-dhaba) et tourne le dos (Tawallā)</strong> au Coran et à la foi ?<br><br>Il réunit ainsi contre lui-même deux crimes : rejeter le Message divin par le mensonge et persécuter le Messager d’Allāh ﷺ qui prie.",
  "96:14": "<strong style='color:#ffffff;'>Cet homme arrogant (Abū Jahl) ne sait-il donc pas qu’Allāh voit absolument tout ce qu’il fait ?</strong><br><br>Il s’agit d’une question d’avertissement et de menace : Allāh l’Omniscient voit parfaitement toutes les manigances et les menaces d’Abū Jahl envers le Prophète ﷺ, et rien ne Lui échappe.",
  "96:15": "<strong style='color:#ffffff;'>Mais non (Kallā) ! S’il ne cesse pas son hostilité contre le Prophète ﷺ, Nous le saisirons certes violemment par le toupet (An-Nāsiyah)</strong> pour le traîner au Feu !<br><br>Le mot <em>« Kallā »</em> exprime une réprimande tranchante. Saisir un chef arrogant par le toupet (la partie avant du crâne et du front) constituait chez les Arabes le symbole suprême de l’humiliation et de la défaite.",
  "96:16": "<strong style='color:#ffffff;'>Le toupet d’un grand menteur dans ses paroles, d’un grand pécheur (fautif) dans ses actes !</strong><br><br>Il s’agit toujours d’Abū Jahl : le Coran qualifie directement sa région frontale (<em>Nāsiyah</em>) de menteuse et fautive (<em>Kādhibatin Khāti’ah</em>), car c’est elle qui dirige son mensonge obstiné et sa rébellion contre Allāh.",
  "96:17": "<strong style='color:#ffffff;'>Qu’il appelle donc à son secours son assemblée et les gens de son clan (Nādiyah)</strong> dont il se vantait !<br><br>📜 <strong>Hadith d’Ibn ‘Abbās :</strong> Lorsque le Prophète ﷺ réprimanda Abū Jahl, ce dernier répliqua avec orgueil : <em>« Ô Muhammad, avec quoi me menaces-tu alors que tu sais bien que c’est moi qui possède la plus grande assemblée (le plus nombreux clan de partisans) de toute cette vallée ? »</em> Le mot <strong>« Nādī »</strong> désigne le lieu où les notables mecquois se réunissaient. Allāh lui lança alors ce défi (<em>Rapporté par At-Tirmidhī n°3349</em>).",
  "96:18": "<strong style='color:#ffffff;'>Pour Notre part, Nous appellerons les « Zabāniyah » — les redoutables Anges gardiens de l’Enfer</strong> afin qu’ils se saisissent de lui !<br><br>📜 <strong>Hadith d’Ibn ‘Abbās :</strong> Le mot <em>« Az-Zabāniyah »</em> désigne les Anges du châtiment d’une force irrésistible. Ibn ‘Abbās a dit : <em>« Par Allāh ! Si Abū Jahl avait appelé les gens de son assemblée, les Anges du châtiment (Az-Zabāniyah) l’auraient saisi sur-le-champ sous leurs yeux ! »</em> (<em>Rapporté par Al-Bukhārī n°4958 et At-Tirmidhī n°3349</em>).",
  "96:19": "<strong style='color:#ffffff;'>Non (Kallā) ! Ne lui obéis point, ô Muhammad ﷺ, mais persévère dans ta prosternation (Wasjud) et rapproche-toi de ton Seigneur (Waqtarib) !</strong><br><br>📜 <strong>1. Le Hadith d’Abū Hurayrah sur la terreur d’Abū Jahl :</strong> Abū Hurayrah rapporte qu’Abū Jahl dit aux gens de Quraysh : <em>« Muhammad pose-t-il son visage contre terre (en prosternation) devant vous ? — Oui, lui répondit-on. — Par Al-Lāt et Al-‘Uzzā ! Si je le vois faire cela, je lui foulerai le cou du pied et je roulerai son visage dans la poussière ! »</em> Plus tard, Abū Jahl arriva alors que le Messager d’Allāh ﷺ priait. Voulant s’avancer pour lui piétiner le cou, il recula soudain précipitamment sur ses talons en se protégeant le visage de ses deux mains, effrayé ! On lui demanda : <em>« Qu’as-tu, ô Abū Al-Hakam ? »</em> Il répondit : <em>« Un fossé en flammes me sépare de lui, ainsi qu’une terreur et des ailes effrayantes ! »</em> Le Messager d’Allāh ﷺ dit alors : <strong>« S’il s’était approché de moi, les Anges l’auraient saisi et déchiqueté membre par membre ! »</strong> (<em>Rapporté par Muslim n°2797, Ahmad et An-Nasā’ī</em>).<br><br>📜 <strong>2. Le Hadith authentique de la Prosternation :</strong> D’après Abū Hurayrah également, le Messager d’Allāh ﷺ a dit : <strong>« La position où le serviteur est le plus proche de son Seigneur est lorsqu’il est en prosternation (Sājid) ; multipliez-y donc vos invocations ! »</strong> (<em>Rapporté par Muslim n°482</em>)."
};
const TAFSIR_SOURATE_96_EN = {
  "96:1": "<strong style='color:#ffffff;'>Read, O Messenger, what Allāh reveals to you, beginning in the Name of your Lord who created all things.</strong><br><br>📜 <strong>Hadith of the First Revelation:</strong> ‘Ā’ishah, the Mother of the Believers (may Allāh be pleased with her), narrated that revelation to the Messenger of Allāh ﷺ began with true visions in sleep as bright as dawn. Then he was made to love seclusion in the <strong>Cave of Hirā’</strong>, worshipping Allāh for several nights before returning to Khadījah.<br><br>One day the Angel <strong>Jibrīl (Gabriel)</strong> came to him and said: <em>‘Read! (Iqra’)’</em> The Prophet ﷺ replied: <em>‘I do not know how to read.’</em> The Angel embraced him tightly three times until he was exhausted, then released him and recited: <em>‘Read in the name of your Lord who created—created man from a clinging substance. Read! And your Lord is the Most Generous.’</em><br><br>The Messenger of Allāh ﷺ returned with his heart trembling to <strong>Khadījah bint Khuwaylid</strong> saying: <em>‘Cover me! Cover me!’</em> Khadījah reassured him: <em>‘Never! By Allāh, Allāh will never disgrace you: you uphold family ties, bear the burden of the weak, give to the destitute, and help the afflicted.’</em> She took him to her cousin <strong>Waraqah ibn Nawfal</strong>, who declared: <em>‘This is the Nāmūs (Angel Gabriel) whom Allāh sent down to Moses!’</em> (<em>Sahīh Al-Bukhārī #3 & Sahīh Muslim #160</em>).",
  "96:2": "<strong style='color:#ffffff;'>He created the human being from an ‘Alaqah (a clinging, blood-nourished embryonic substance)</strong> after the drop stage, reminding humankind of its humble origin and the supreme power of its Creator.",
  "96:3": "<strong style='color:#ffffff;'>Read, O Prophet! And your Lord is the Most Generous (Al-Akram)</strong>, whose bounty and forbearance have no equal—teaching the unlettered and making the Revelation easy to preserve.",
  "96:4": "<strong style='color:#ffffff;'>He is the One who taught humankind writing by means of the Pen (Al-Qalam)</strong>, whereby knowledge, sciences, and Divine Revelation are preserved across generations.",
  "96:5": "<strong style='color:#ffffff;'>And He taught the human being what he did not know</strong>, bringing him forth from complete ignorance into the light of intellect, revelation, and guidance.",
  "96:6": "<strong style='color:#ffffff;'>No indeed! Truly the rebellious human being transgresses all bounds (Yatghā)</strong> when he forgets his Creator.<br><br>📜 <strong>Context of Revelation:</strong> Revealed regarding <strong>Abū Jahl (‘Amr ibn Hishām)</strong>, while applying generally to anyone blinded by wealth and arrogance.",
  "96:7": "<strong style='color:#ffffff;'>Because he sees himself as self-sufficient (Istaghna)</strong> through his wealth, prestige, and followers, imagining he has no need to obey his Lord.",
  "96:8": "<strong style='color:#ffffff;'>Indeed, to your Lord is the ultimate return (Ar-Ruj‘ā) of all creation!</strong> On that Day, Allāh will hold every arrogant transgressor accountable for his wealth and deeds.",
  "96:9": "<strong style='color:#ffffff;'>Have you seen the astonishing case of the one who forbids</strong> others from worshipping Allāh?<br><br>📜 <strong>Historical Context:</strong> Revealed concerning <strong>Abū Jahl</strong> when he threatened the Prophet Muhammad ﷺ and tried to stop him from praying near the Ka‘bah (<em>Sahīh Al-Bukhārī #4958</em>).",
  "96:10": "<strong style='color:#ffffff;'>Forbidding a servant of Allāh—Prophet Muhammad ﷺ—when he stands and prostrates in prayer (Salāt)</strong> near the Sacred House?",
  "96:11": "<strong style='color:#ffffff;'>Tell me (O Abū Jahl): what if this praying servant (Muhammad ﷺ) is upon clear guidance (Al-Hudā) from his Lord</strong>, while you blindly oppose him?",
  "96:12": "<strong style='color:#ffffff;'>Or what if he enjoins righteousness and God-consciousness (At-Taqwā)?</strong> Should one who calls to truth and virtue be prevented from praying?",
  "96:13": "<strong style='color:#ffffff;'>Do you see, O Messenger, his dreadful fate if this tyrant denies the truth (Kadh-dhaba) and turns his back (Tawallā)</strong> on the Quran and faith?",
  "96:14": "<strong style='color:#ffffff;'>Does he (Abū Jahl) not know that Allāh sees everything he does</strong>, and that none of his plots or threats escape the All-Seeing?",
  "96:15": "<strong style='color:#ffffff;'>No indeed (Kallā)! If he does not desist from opposing the Prophet ﷺ, We will surely seize and drag him by the forelock (An-Nāsiyah)</strong> into the Hellfire—an utter humiliation for his pride!",
  "96:16": "<strong style='color:#ffffff;'>A lying, sinful forelock (Nāsiyatin Kādhibatin Khāti’ah)!</strong> It refers once again to Abū Jahl, whose frontal region directs his deliberate lies and sinful aggression.",
  "96:17": "<strong style='color:#ffffff;'>Then let him call upon his assembly and clansmen (Nādiyah)</strong> of whom he boasted!<br><br>📜 <strong>Hadith of Ibn ‘Abbās:</strong> Abū Jahl boasted to the Prophet ﷺ: <em>‘With what do you threaten me when you know I have the largest assembly of supporters in this valley?’</em> Allāh therefore revealed this challenge (<em>Sunan At-Tirmidhī #3349</em>).",
  "96:18": "<strong style='color:#ffffff;'>We will call the Zabāniyah—the fierce, mighty Angels of Hell</strong> so it will be seen who is stronger!<br><br>📜 <strong>Hadith:</strong> Ibn ‘Abbās said: <em>‘By Allāh, had he called his assembly, the Angels of punishment (Az-Zabāniyah) would have seized him on the spot before their eyes!’</em> (<em>Sahīh Al-Bukhārī #4958</em>).",
  "96:19": "<strong style='color:#ffffff;'>No indeed! Do not obey him, O Muhammad ﷺ, but persevere in prostration (Wasjud) and draw near to your Lord (Waqtarib)!</strong><br><br>📜 <strong>1. Hadith of Abū Hurayrah on Abū Jahl’s Terror:</strong> Abū Jahl swore by Al-Lāt and Al-‘Uzzā that if he saw Muhammad ﷺ prostrating near the Ka‘bah he would trample his neck. When he approached the Prophet ﷺ while he was praying, he suddenly retreated in terror, shielding his face with both hands! When asked what happened, he said: <em>‘A fiery trench separates me from him, along with terror and wings!’</em> The Messenger of Allāh ﷺ said: <strong>‘Had he come near me, the Angels would have snatched him limb from limb!’</strong> (<em>Sahīh Muslim #2797, Ahmad & An-Nasā’ī</em>).<br><br>📜 <strong>2. Hadith on Closeness in Prostration:</strong> Abū Hurayrah narrated that the Messenger of Allāh ﷺ said: <strong>‘The closest a servant is to his Lord is when he is prostrating (Sājid), so multiply your supplications therein!’</strong> (<em>Sahīh Muslim #482</em>)."
};
const TAFSIR_SOURATE_96_ES = {
  "96:1": "<strong style='color:#ffffff;'>¡Lee, oh Mensajero, lo que Allah te revela comenzando en el Nombre de tu Señor que creó todas las cosas!</strong><br><br>📜 <strong>Hadiz del inicio de la Revelación:</strong> ‘Ā’ishah, la Madre de los Creyentes, relató que el comienzo de la revelación al Mensajero de Allah ﷺ fue mediante visiones verídicas en sueños tan claras como la aurora. Luego se retiraba a adorar a Allah en la <strong>cueva de Hirā’</strong>.<br><br>Un día se le presentó el Ángel <strong>Yibrīl (Gabriel)</strong> y le dijo: <em>«¡Lee! (Iqra’)»</em>. El Profeta ﷺ respondió: <em>«No sé leer.»</em> El Ángel lo estrechó tres veces hasta dejarlo sin fuerzas y luego le reveló: <em>«¡Lee en el nombre de tu Señor que creó, que creó al ser humano de una adherencia! ¡Lee, que tu Señor es el Más Generoso!»</em><br><br>El Profeta ﷺ regresó con el corazón tembloroso junto a <strong>Khadījah bint Khuwaylid</strong> diciendo: <em>«¡Cubridme! ¡Cubridme!»</em> Ella lo consoló y lo llevó ante su primo <strong>Waraqah ibn Nawfal</strong>, quien anunció: <em>«¡Éste es el Nāmūs (el Ángel Gabriel) que Allah envió a Moisés!»</em> (<em>Sahīh Al-Bukhārī n°3 y Sahīh Muslim n°160</em>).",
  "96:2": "<strong style='color:#ffffff;'>Él creó al ser humano a partir de una « ‘Alaqah » (una adherencia suspendida y nutrida de sangre)</strong> tras la etapa de la gota fecundada, recordándole la humildad de su origen frente a la grandeza de su Creador.",
  "96:3": "<strong style='color:#ffffff;'>¡Lee, oh Profeta! Pues tu Señor es el Más Generoso y Noble (Al-Akram)</strong>, cuya bondad infinita enseña a quien no sabía leer y facilita la memorización de la Revelación.",
  "96:4": "<strong style='color:#ffffff;'>Él es Quien enseñó al ser humano la escritura mediante el cálamo (Al-Qalam)</strong>, gracias al cual se conservan las ciencias, la Revelación y el conocimiento a través de los siglos.",
  "96:5": "<strong style='color:#ffffff;'>Y enseñó al ser humano lo que no sabía</strong>, dotándolo de oído, vista, razón y guía revelada tras haber nacido sin conocimiento alguno.",
  "96:6": "<strong style='color:#ffffff;'>¡Pero no! En verdad el ser humano rebelde se extralimita en la arrogancia y la injusticia (Yatghā)</strong> cuando olvida a su Creador.<br><br>📜 <strong>Contexto de revelación:</strong> Revelado acerca de <strong>Abū Yahl (‘Amr ibn Hishām)</strong> y aplicable a todo aquel que se deja cegar por la soberbia.",
  "96:7": "<strong style='color:#ffffff;'>Cuando se ve rico y cree bastarse a sí mismo (Istaghna)</strong> gracias a su riqueza y prestigio, pensando que ya no necesita obedecer a su Señor.",
  "96:8": "<strong style='color:#ffffff;'>¡Pero ciertamente hacia tu Señor es el retorno final (Ar-Ruj‘ā) de todos!</strong> Allah lo amenaza recordándole que volverá ante Él para ser juzgado y rendir cuentas.",
  "96:9": "<strong style='color:#ffffff;'>¿Has visto a aquel que prohíbe</strong> con arrogancia adorar a Allah?<br><br>📜 <strong>Relato histórico:</strong> Este versículo fue revelado acerca de <strong>Abū Yahl</strong> cuando amenazó al Profeta Muhammad ﷺ y quiso impedirle rezar junto a la Ka‘bah (<em>Sahīh Al-Bukhārī n°4958</em>).",
  "96:10": "<strong style='color:#ffffff;'>¿Impidiendo a un siervo de Allah —el Profeta Muhammad ﷺ— realizar la oración (Salāt)</strong> junto a la Casa Sagrada?",
  "96:11": "<strong style='color:#ffffff;'>¿Qué piensas (oh Abū Yahl) si este siervo a quien prohíbes rezar está en la buena vía (Al-Hudā)</strong> y la guía de su Señor?",
  "96:12": "<strong style='color:#ffffff;'>¿O si ordena la piedad (At-Taqwā) y exhorta a los demás a hacer el bien?</strong> ¿Por qué entonces le impides rezar y adorar a Allah?",
  "96:13": "<strong style='color:#ffffff;'>¿Ves, oh Muhammad ﷺ, su destino si este opresor (Abū Yahl) desmiente y rechaza el Mensaje (el Corán) y da la espalda (Tawallā)</strong> a la fe?",
  "96:14": "<strong style='color:#ffffff;'>¿Acaso no sabe que verdaderamente Allah ve todo lo que hace?</strong> Allah el Omnisciente observa todas las amenazas de Abū Yahl contra el Profeta ﷺ.",
  "96:15": "<strong style='color:#ffffff;'>¡Pero no (Kallā)! Si no cesa en su hostilidad contra Allah y Su Mensajero ﷺ, ciertamente lo agarraremos por el copete (An-Nāsiyah)</strong>, símbolo de humillación para su soberbia, y lo arrastraremos al Infierno.",
  "96:16": "<strong style='color:#ffffff;'>¡El copete de un mentiroso y un pecador!</strong> Se refiere nuevamente a Abū Yahl, cuya región frontal dirige sus mentiras y pecados.",
  "96:17": "<strong style='color:#ffffff;'>¡Que llame entonces a sus partidarios y a los miembros de su asamblea (Nādiyah)</strong> para que vengan en su ayuda!<br><br>📜 <strong>Hadiz de Ibn ‘Abbās:</strong> Abū Yahl se jactaba de tener la mayor asamblea (<em>Nādī</em>) de partidarios en el valle de La Meca, por lo que Allah le lanzó este desafío (<em>Sunan At-Tirmidhī n°3349</em>).",
  "96:18": "<strong style='color:#ffffff;'>¡Nosotros llamaremos a los « Zabāniyah » (los severos Ángeles guardianes del Infierno)</strong> para que quede claro quién tiene el poder absoluto!<br><br>📜 <strong>Hadiz:</strong> Dijo Ibn ‘Abbās: <em>«¡Por Allah! Si hubiera llamado a su asamblea, los Ángeles del castigo lo habrían arrebatado al instante ante sus propios ojos!»</em> (<em>Sahīh Al-Bukhārī n°4958</em>).",
  "96:19": "<strong style='color:#ffffff;'>¡No! ¡No le obedezcas, oh Muhammad ﷺ, sino póstrate (Wasjud) y acércate a tu Señor (Waqtarib)!</strong><br><br>📜 <strong>1. Hadiz de Abū Hurayrah sobre el terror de Abū Yahl:</strong> Abū Yahl juró por Al-Lāt y Al-‘Uzzā que si veía a Muhammad ﷺ postrarse le pisotearía el cuello. Cuando se acercó al Profeta ﷺ mientras rezaba en la Ka‘bah, retrocedió de golpe cubriéndose el rostro con ambas manos, aterrado, y dijo: <em>«¡Un foso en llamas me separa de él, junto con terror y alas espantosas!»</em> El Mensajero de Allah ﷺ dijo: <strong>«¡Si se hubiera acercado a mí, los Ángeles lo habrían despedazado miembro por miembro!»</strong> (<em>Sahīh Muslim n°2797, Ahmad y An-Nasā’ī</em>).<br><br>📜 <strong>2. Hadiz sobre la Postración:</strong> Dijo el Mensajero de Allah ﷺ: <strong>«La posición en que el siervo está más cerca de su Señor es la postración (Sājid); multiplicad, pues, en ella vuestras súplicas.»</strong> (<em>Sahīh Muslim n°482</em>)."
};
const TAFSIR_SOURATE_96_AR = {
  "96:1": "<strong style='color:#ffffff;'>اقرأ يا نبي الله ما أُنزل إليك من القرآن مُفتتحًا باسم ربك الذي خلق الخلق كله.</strong><br><br>📜 <strong>حديث بدء الوحي (أول سورة نزلت من القرآن الكريم) :</strong> عن عائشة أم المؤمنين رضي الله عنها قالت: «أول ما بُدئ به رسول الله ﷺ من الوحي الرؤيا الصالحة في النوم، فكان لا يرى رؤيا إلا جاءت مثل فلق الصبح، ثم حُبِّب إليه الخلاء، وكان يخلو بـ<strong>غار حراء</strong> فيتحنّث فيه الليالي ذوات العدد قبل أن ينزع إلى أهله ويتزوّد لذلك، حتى جاءه الحق وهو في غار حراء، فجاءه الملَك (جبريل عليه السلام) فقال: <strong>اقرأ!</strong> قال: <em>ما أنا بقارئ</em>. قال: <em>فأخذني فغطّني حتى بلغ مني الجهد، ثم أرسلني فقال: اقرأ! قلت: ما أنا بقارئ، فأخذني فغطّني الثانية ثم الثالثة، ثم أرسلني فقال: ﴿اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ * خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ * اقْرَأْ وَرَبُّكَ الْأَكْرَمُ﴾</em>».<br><br>فرجع بها رسول الله ﷺ يرجف فؤاده فدخل على <strong>خديجة بنت خويلد</strong> رضي الله عنها فقال: <em>«زمّلوني! زمّلوني!»</em> فطَمأنته خديجة وقالت: <em>«كلا والله ما يخزيك الله أبدًا؛ إنك لتصل الرحم، وتحمل الكَلّ، وتكسب المعدوم، وتقري الضيف، وتعين على نوائب الحق»</em>، ثم انطلقت به إلى ابن عمها <strong>ورقة بن نوفل</strong> فقال: <em>«هذا الناموس الذي نزل الله على موسى! يا ليتني فيها جذعًا إذ يخرجك قومك!»</em> (<em>رواه البخاري رقم 3 ومسلم رقم 160</em>).",
  "96:2": "<strong style='color:#ffffff;'>خلق اللهُ الإنسانَ من «علقة»</strong> (قطعة دمٍ غليظة متعلقة بجدار الرحم بعد طور النطفة)، تذكيرًا للإنسان بأصله الضعيف وعظيم قدرة خالقه الذي سوّاه بشرًا عاقلًا ناطقًا.",
  "96:3": "<strong style='color:#ffffff;'>اقرأ يا نبي الله ما يوحى إليك، وربك هو الأكرم</strong> الذي لا يوازيه كريم في جوده وحلمه وإحسانه، يعلّم الأميّ وييسّر له حفظ الوحي وتبليغه.",
  "96:4": "<strong style='color:#ffffff;'>الذي علّم الإنسان الكتابة بالقلم</strong>، فبه تُحفظ العلوم والشرائع وتُدوَّن أخبار الأمم عبر القرون، وهو من أعظم نعم الله على البشر.",
  "96:5": "<strong style='color:#ffffff;'>وعلّم الإنسان ما لم يكن يعلمه</strong>، فأخرجه من ظلمة الجهل بعد أن خُلق لا يعلم شيئًا إلى نور العلم والوحي والبيان.",
  "96:6": "<strong style='color:#ffffff;'>حقًّا إن الإنسان المتمرد ليتجاوز الحدّ في الكبر والطغيان (لَيَطْغَى)</strong> إذا غفل عن خالقه.<br><br>📜 <strong>سبب النزول :</strong> نزلت هذه الآيات (من الآية 6 إلى آخر السورة) في <strong>أبي جهل (عمرو بن هشام)</strong> عدو الله حين طغى وتجبّر بمكة، ولفظها عامٌّ في كل من أطغاه الغنى والكِبر.",
  "96:7": "<strong style='color:#ffffff;'>من أجل أنه رأى نفسه ذا مالٍ وثروةٍ وعشيرةٍ فظنّ أنه قد استغنى بذلك عن ربه</strong> وعن الانقياد للحق.",
  "96:8": "<strong style='color:#ffffff;'>إن إلى ربك وحده مصير الخلائق ورجوعهم يوم القيامة (الرُّجْعَى)</strong>، فيحاسب كلَّ طاغية على ماله وعمله.",
  "96:9": "<strong style='color:#ffffff;'>أرأيت أعجبَ من حال هذا الطاغية (أبي جهل) الذي ينهى</strong> عن عبادة الله؟<br><br>📜 نزلت في أبي جهل حين توعّد النبيَّ ﷺ وأراد منعه من الصلاة عند الكعبة المشرفة (<em>صحيح البخاري رقم 4958</em>).",
  "96:10": "<strong style='color:#ffffff;'>ينهى عبدًا لله — وهو نبينا محمد ﷺ — إذا قام يصلي لربه</strong> عند الكعبة المشرفة؟",
  "96:11": "<strong style='color:#ffffff;'>أرأيت (يا أبا جهل) إن كان هذا العبد المصلي (محمد ﷺ) على الهدى المستقيم</strong> والبصيرة من ربه، فكيف تنهاه عن صلاته؟",
  "96:12": "<strong style='color:#ffffff;'>أو كان يأمر الناس بتقوى الله وإخلاص التوحيد وعمل الخير؟</strong> أينبغي أن يُمنع من الصلاة أم يُتّبع ويُناصر؟",
  "96:13": "<strong style='color:#ffffff;'>أرأيت (يا محمد ﷺ) إن كذّب هذا الناهي (أبو جهل) بالقرآن وأعرض عن الإيمان</strong> والطاعة، ما أعظم جرمه؟",
  "96:14": "<strong style='color:#ffffff;'>ألم يعلم هذا المتجبّر أن الله يرى كل ما يصنع</strong> ويسمع وعيده للنبي ﷺ، ولا يخفى عليه شيء من أمره؟",
  "96:15": "<strong style='color:#ffffff;'>كلا! لئن لم ينتهِ أبو جهل عن عداوته وأذاه للنبي ﷺ لنأخذنّ بمقدّم رأسه (النَّاصِيَة)</strong> ولنسحبنّه بها إلى النار إذلالًا لكبريائه!",
  "96:16": "<strong style='color:#ffffff;'>ناصيةٍ صاحبُها (أبو جهل) كاذبٌ في مقاله، خاطئٌ آثمٌ في أفعاله!</strong>",
  "96:17": "<strong style='color:#ffffff;'>فليدعُ إذن أهلَ ناديه ومجلس عشيرته الذين افتخر بكثرتهم لينصروه!</strong><br><br>📜 <strong>حديث ابن عباس رضي الله عنهما :</strong> لما انتهر النبيُّ ﷺ أبا جهل، قال أبو جهل: <em>«يا محمد، بأي شيء تهددني؟ فوالله إني لأكثر أهل هذا الوادي ناديًا!»</em> فأنزل الله تعالى: ﴿فَلْيَدْعُ نَادِيَهُ * سَنَدْعُ الزَّبَانِيَةَ﴾ (<em>رواه الترمذي رقم 3349 وصححه</em>).",
  "96:18": "<strong style='color:#ffffff;'>سندعو نحن الزبانية — وهم ملائكة العذاب الغلاظ الشداد</strong> حتى يتبيّن من الغالب!<br><br>📜 قال ابن عباس رضي الله عنهما: <strong>«فوالله لو دعا ناديه لأخذته زبانيةُ الله من ساعته عيانًا!»</strong> (<em>رواه البخاري رقم 4958 والترمذي رقم 3349</em>).",
  "96:19": "<strong style='color:#ffffff;'>كلا! لا تطعه يا محمد ﷺ فيما يأمرك به من ترك الصلاة، بل اثبت على صلاتك واسجد لربك واقترب منه بالطاعة والدعاء!</strong><br><br>📜 <strong>1. حديث أبي هريرة رضي الله عنه في رعب أبي جهل :</strong> قال أبو جهل لقريش: <em>«هل يعفّر محمد وجهه بين أظهركم؟»</em> قيل: نعم، فقال: <em>«واللات والعزى لئن رأيته يفعل ذلك لأطأنّ على رقبته ولأعفّرنّ وجهه في التراب!»</em> فأتى رسول الله ﷺ وهو يصلي ليركب رقبته، فما فجأهم إلا وهو ينكص على عقبيه ويتّقي بيديه! فقيل له: ما لك؟ فقال: <em>«إن بيني وبينه لخندقًا من نار وهولًا وأجنحة!»</em> فقال رسول الله ﷺ: <strong>«لو دنا مني لاختطفته الملائكةُ عضوًا عضوًا!»</strong> (<em>رواه مسلم رقم 2797 وأحمد والنسائي</em>).<br><br>📜 <strong>2. حديث فضل السجود والدعاء فيه :</strong> عن أبي هريرة رضي الله عنه أن رسول الله ﷺ قال: <strong>«أقرب ما يكون العبد من ربه وهو ساجد، فأكثروا الدعاء»</strong> (<em>رواه مسلم رقم 482</em>)."
};
const MIRACLE_CHAMEAU_88_17 = {
  "88:17": {
    "titre": "Miracle Biologique — L'ingénierie anatomique et cellulaire du Chameau (« Afalā yandhurūna ilā al-ibili kayfa khuliqat »)",
    "titreEn": "Biological Miracle — The Anatomical & Cellular Engineering of the Camel ('Do they not look at the camels, how they are created?')",
    "titreEs": "Milagro Biológico — La ingeniería anatómica y celular del Camello (« ¿Acaso no observan los camellos, cómo han sido creados? »)",
    "titreAr": "الإعجاز البيولوجي والتشريحي في خلق الإبل — ﴿أَفَلَا يَنظُرُونَ إِلَى الْإِبِلِ كَيْفَ خُلِقَتْ﴾",
    "resume": "« Ne considèrent-ils donc pas les chameaux, comment ils ont été créés ? » (88:17). La biologie et l'hématologie modernes ont révélé chez le chameau des caractéristiques uniques parmi tous les mammifères : des globules rouges ovales capables de gonfler jusqu'à 240 % sans éclater, une thermorégulation interne de 34 °C à 41 °C et un système de filtration optique et respiratoire conçu pour survivre aux tempêtes du désert.",
    "resumeEn": "'Do they not look at the camels—how they are created?' (88:17). Modern biology and hematology have revealed features in the camel unique among all mammals: oval red blood cells capable of expanding up to 240% without rupturing, internal thermoregulation ranging from 34°C to 41°C, and specialized optical and respiratory shields built for desert survival.",
    "resumeEs": "« ¿Acaso no observan los camellos, cómo han sido creados? » (88:17). La biología y la hematología modernas han descubierto en el camello características únicas entre todos los mamíferos: glóbulos rojos ovalados capaces de expandirse hasta un 240 % sin estallar, termorregulación interna de 34 °C a 41 °C y escudos anatómicos frente a las tormentas de arena.",
    "resumeAr": "﴿أَفَلَا يَنظُرُونَ إِلَى الْإِبِلِ كَيْفَ خُلِقَتْ﴾ كشف علم الأحياء وأمراض الدم الحديث عن خصائص فريدة في الإبل لا توجد في سائر الثدييات: كريات دم حمراء بيضاوية تتمدد حتى 240% دون أن تنفجر، ونظام حراري متغير من 34 إلى 41 درجة مئوية، ودروع تشريحية مذهلة لمقاومة العواصف الرملية والعطش.",
    "developpement": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PREUVE N°1 • HÉMATOLOGIE UNIQUE CHEZ LES MAMMIFÈRES</div>\n          <h4>🩸 Des globules rouges ovales capables de gonfler jusqu'à 240 %</h4>\n          <p>Contrairement à tous les autres mammifères dont les globules rouges sont ronds, ceux du chameau sont de forme <strong>ovale (elliptique)</strong>. Cette géométrie unique leur permet de continuer à circuler dans les capillaires les plus fins même lorsque le sang devient extrêmement épais et visqueux après une perte de <strong>30 % de son poids en eau</strong> (seuil mortel pour l'être humain dès 12 %). De plus, leur membrane ultra-élastique peut gonfler jusqu'à <strong>240 % de son volume initial</strong> sans éclater par choc osmotique lorsque le chameau boit plus de <strong>100 à 130 litres d'eau en 10 minutes</strong>.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PREUVE N°2 • THERMORÉGULATION & CONDENSATION NASALE</div>\n          <h4>🌡️ Une climatisation interne de 34 °C à 41 °C qui bloque l'évaporation</h4>\n          <p>Pour économiser chaque goutte d'eau sous une chaleur torride, le chameau possède un thermostat biologique programmable : sa température corporelle descend à <strong>34 °C la nuit</strong> et monte très lentement jusqu'à <strong>41 °C le jour</strong> avant qu'il ne commence à transpirer, économisant ainsi jusqu'à 5 litres d'eau par jour. Parallèlement, ses cornets nasaux en spirale refroidissent l'air expiré et récupèrent par condensation <strong>près de 70 % de l'humidité</strong> de son souffle.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PREUVE N°3 • BOUCLIER ANATOMIQUE DU DÉSERT</div>\n          <h4>🐪 Triple paupière translucide, narines étanches & papilles kératinisées</h4>\n          <p>Ses yeux sont protégés par une double rangée de longs cils entrecroisés et une <strong>troisième paupière translucide (membrane nictitante)</strong> qui se ferme comme des lunettes de protection, lui permettant de marcher en pleine tempête de sable tout en voyant son chemin. Ses narines se ferment hermétiquement sur commande musculaire, et sa bouche est tapissée de <strong>papilles coniques dures en kératine</strong> qui lui permettent de broyer les buissons d'épines les plus acérés du désert sans jamais se blesser.</p>\n        </div>\n      </div>\n      <div class=\"historians-proof-section\">\n        <div class=\"historians-header\">🔗 SOURCES BIOLOGIQUES & PHYSIOLOGIQUES VÉRIFIABLES</div>\n        <div class=\"proof-links-bar\">\n          <a href=\"https://fr.wikipedia.org/wiki/Dromadaire#Adaptations_physiologiques_et_anatomiques\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🐪 Adaptations physiologiques des camélidés</a>\n          <a href=\"https://en.wikipedia.org/wiki/Camel#Eco-behavioral_adaptations\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">🩸 Hématologie & Globules rouges elliptiques</a>\n          <a href=\"https://fr.wikipedia.org/wiki/Membrane_nictitante\" target=\"_blank\" rel=\"noopener\" class=\"proof-link-pill\">👁️ Membrane nictitante (3e paupière)</a>\n        </div>\n      </div>",
    "developpementEn": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PROOF #1 • UNIQUE HEMATOLOGY AMONG MAMMALS</div>\n          <h4>🩸 Oval Red Blood Cells Expanding up to 240% Without Rupturing</h4>\n          <p>Unlike all other mammals whose red blood cells are circular, the camel's red blood cells are <strong>oval (elliptical)</strong>. This allows them to flow smoothly through narrow capillaries even during severe dehydration when blood viscosity increases drastically. Furthermore, their elastic membrane can swell to <strong>240% of their original volume</strong> without bursting when the camel drinks over <strong>100 liters of water in minutes</strong>.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PROOF #2 • THERMOREGULATION & NASAL MOISTURE RECOVERY</div>\n          <h4>🌡️ Internal Temperature Fluctuating from 34°C to 41°C</h4>\n          <p>To prevent water loss through sweating, the camel varies its body temperature from <strong>34°C at night to 41°C during the day</strong>, while its labyrinthine nasal turbinates condense and recover nearly 70% of the moisture in its exhaled breath.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PROOF #3 • DESERT ANATOMICAL SHIELD</div>\n          <h4>🐪 Translucent Third Eyelid, Sealable Nostrils & Keratinized Mouth</h4>\n          <p>Equipped with interlocking double eyelashes, a <strong>translucent nictitating membrane</strong> acting as sand-goggles, muscularly sealable nostrils, and horn-like keratinized oral papillae to chew desert thorns effortlessly.</p>\n        </div>\n      </div>",
    "developpementEs": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PRUEBA N°1 • HEMATOLOGÍA ÚNICA ENTRE LOS MAMÍFEROS</div>\n          <h4>🩸 Glóbulos rojos ovalados que se expanden hasta un 240 %</h4>\n          <p>A diferencia de todos los demás mamíferos, los glóbulos rojos del camello son <strong>ovalados</strong>, lo que les permite circular incluso cuando la sangre se espesa tras perder un 30 % de agua, y expandirse hasta un <strong>240 %</strong> sin estallar al beber 100 litros de agua en poucos minutos.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PRUEBA N°2 • TERMORREGULACIÓN DE 34 °C A 41 °C</div>\n          <h4>🌡️ Ahorro extremo de agua y condensación nasal</h4>\n          <p>Su temperatura corporal oscila entre <strong>34 °C por la noche y 41 °C durante el día</strong> para evitar la sudoración, mientras sus cornetes nasales recuperan la humedad del aire exhalado.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">PRUEBA N°3 • ESCUDO ANATÓMICO DEL DESIERTO</div>\n          <h4>🐪 Tercer párpado translúcido, fosas nasales herméticas y papilas córneas</h4>\n          <p>Posee doble hilera de pestañas, una <strong>membrana nictitante translúcida</strong> que le permite caminar viendo en plena tormenta de arena, narinas que se cierran herméticamente y papilas bucales endurecidas para masticar espinas.</p>\n        </div>\n      </div>",
    "developpementAr": "\n      <div class=\"miracle-pillars-grid\">\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الدليل الأول • هندسة فريدة لكريات الدم الحمراء</div>\n          <h4>🩸 كريات دم بيضاوية تتمدد حتى 240% دون انفجار</h4>\n          <p>خلافًا لجميع الثدييات الأخرى ذات الكريات الدائرية، تمتاز الإبل بكريات دم حمراء <strong>بيضاوية الشكل</strong> تنساب في أدق الشعيرات الدموية حتى عند زيادة لزوجة الدم بسبب العطش الشديد، كما تتمدد أغشيتها المرنة حتى <strong>240% من حجمها</strong> دون أن تنفجر عندما يشرب الجمل أكثر من 100 لتر من الماء في دقائق معدودة.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الدليل الثاني • التنظيم الحراري وتكثيف بخار التنفس</div>\n          <h4>🌡️ تغيّر حرارة الجسم من 34°م ليلًا إلى 41°م نهارًا</h4>\n          <p>يرفع الجمل حرارة جسمه تدريجيًّا حتى <strong>41 درجة مئوية</strong> قبل أن يبدأ بالتعرق ليحفظ ماءه، وتقوم التجاويف الأنفية الحلزونية بتبريد هواء الزفير واستعادة نحو 70% من رطوبته.</p>\n        </div>\n        <div class=\"miracle-pillar-card\">\n          <div class=\"pillar-badge\">الدليل الثالث • الدروع التشريحية في الصحراء</div>\n          <h4>🐪 جفن ثالث شفاف، ومنخران محكمان، وحليمات فموية قرنية</h4>\n          <p>زُوّدت الإبل بأهداب مزدوجة متشابكة، و<strong>غشاء رامش شفاف (جفن ثالث)</strong> يعمل كنظارة واقية يسير بها الجمل وسط العواصف الرملية وهو يبصر طريقه، مع فم مبطّن بحليمات مخروطية صلبة يمضغ بها أشواك الصحراء القاسية دون أذى.</p>\n        </div>\n      </div>"
  }
};
Object.assign(MIRACLES_DE_BASE, MIRACLE_CHAMEAU_88_17);
Object.assign(memoireGlobale.miracles, MIRACLES_DE_BASE);

const TAFSIR_SOURATES_68_73_FR = {
  "68:1": "<strong style='color:#ffffff;'>Nūn (Lettre détachée). Par la plume et ce qu'ils écrivent !</strong><br><br>📜 <strong>1. Le défi de la lettre détachée :</strong> Allāh commence cette sourate par une lettre détachée (<em>Nūn</em>) pour mettre les Arabes au défi : ce Coran est composé des mêmes lettres que votre alphabet, essayez donc de produire une œuvre semblable !<br><br>📜 <strong>2. La Plume céleste (Al-Qalam) et les Anges scribes :</strong> Quant à <em>« la plume et ce qu'ils écrivent »</em>, <strong>As-Suddī</strong> a dit qu'il s'agit des Anges qui consignent toutes les actions des hommes. D'autres exégètes ont expliqué qu'il s'agit de la Plume céleste (<em>Al-Qalam</em>) à laquelle Allāh a ordonné d'écrire tout ce qu'Il a prédestiné et tout ce qui sera de toutes les créatures <strong>cinquante mille ans avant la création des cieux et de la terre</strong>, conformément au Hadith authentique rapporté par <em>Muslim (n°2653), Abū Dāwūd (n°4700) et At-Tirmidhī (n°2155)</em>.",
  "68:2": "<strong style='color:#ffffff;'>Tu (Muhammad) n'es pas, par la grâce de ton Seigneur, un possédé.</strong><br><br>Allāh s'adresse à Son Prophète Muhammad ﷺ qui fut injustement traité de fou et de possédé par les Qurayshites : Il le rassure en attestant que par la grâce de la Prophétie et de la Révélation dont Il l'a comblé, il n'est ni fou ni possédé.",
  "68:3": "<strong style='color:#ffffff;'>Et il y aura pour toi certes, une récompense infinie (ininterrompue).</strong><br><br>Allāh lui assure que sa patience et ses efforts pour transmettre le Message seront récompensés par un salaire immense qui ne diminuera et ne s'interrompra jamais (<em>Ghayra mamnūn</em>).",
  "68:4": "<strong style='color:#ffffff;'>Et tu es certes, d'une moralité éminente (Khuluqin ‘Adhīm).</strong><br><br>📜 <strong>Le Hadith de ‘Ā'ishah sur le caractère du Prophète ﷺ :</strong> Allāh atteste que la moralité de Son Prophète ﷺ est irréprochable et sublime. Interrogée sur le comportement du Messager d'Allāh ﷺ, <strong>‘Ā'ishah (qu'Allāh l'agrée)</strong> répondit : <strong>« Son caractère était le Coran ! (Kāna khuluquhu Al-Qur'ān) »</strong> (<em>Rapporté par Muslim n°746</em>) : il se conformait à tous ses ordres, s'écartait de ses interdits et incarnait sa miséricorde, sa patience et sa noblesse.",
  "68:5": "<strong style='color:#ffffff;'>Tu verras et ils verront,</strong><br><br>Tu verras bientôt, ô Muhammad ﷺ, et ces mécréants qui te rejettent verront eux aussi lorsque la vérité éclatera,",
  "68:6": "<strong style='color:#ffffff;'>qui d'entre vous a perdu la raison (Al-Maftūn).</strong><br><br>Ces négateurs idolâtres qui te traitent de menteur et d'insensé verront alors clairement lequel des deux camps avait l'esprit dérangé et égaré par Satan.",
  "68:7": "<strong style='color:#ffffff;'>C'est ton Seigneur qui connaît mieux ceux qui s'égarent de Son chemin, et Il connaît mieux ceux qui suivent la bonne voie.</strong>",
  "68:8": "<strong style='color:#ffffff;'>N'obéis pas à ceux qui crient au mensonge (les négateurs),</strong><br><br>Ô Muhammad ﷺ, n'écoute pas les chefs mecquois qui démentent le Coran et ne cède jamais lorsqu'ils te demandent d'assouplir ou de délaisser ta mission.",
  "68:9": "<strong style='color:#ffffff;'>Ils aimeraient bien que tu transiges avec eux afin qu'ils transigent avec toi.</strong><br><br>Ils voudraient que tu fasses des compromis sur tes convictions et l'Unicité d'Allāh en flattant leurs idoles, au lieu de demeurer ferme sur la Vérité.",
  "68:10": "<strong style='color:#ffffff;'>Et n'obéis à aucun grand jureur (Hallāfin), méprisable (Mahīn),</strong><br><br>N'obéis pas à celui qui jure à tort et à travers tout en sachant qu'il ment : car celui qui ment habituellement est vil et méprisable.",
  "68:11": "<strong style='color:#ffffff;'>grand diffamateur (Hammāz), grand colporteur de médisances (Mash-shā'in bi-namīm),</strong><br><br>Allāh décrit les comportements vils de cet ennemi : il diffame les gens et colporte les paroles des uns aux autres (<em>Namīmah</em>) pour semer la haine et la division.",
  "68:12": "<strong style='color:#ffffff;'>grand empêcheur du bien, transgresseur, grand pécheur,</strong><br><br>Non seulement il refuse de dépenser dans le bien, mais il empêche aussi ses proches d'embrasser l'Islam et transgresse ouvertement les limites d'Allāh.",
  "68:13": "<strong style='color:#ffffff;'>au cœur dur (‘Utullin), et en plus de cela « Zanīm ».</strong><br><br>📜 <strong>Les 3 explications de « Zanīm » chez les exégètes :</strong><br>• D'après <strong>‘Ikrimah</strong> : il désigne l'adultérin (né hors mariage).<br>• D'après <strong>Ibn ‘Abbās</strong> : il désigne l'homme dévergondé, connu de tous pour sa méchanceté et sa débauche (comme la marque pendante au cou d'une brebis).<br>• Troisième sens : celui qui s'attribue une fausse origine (qui prétend appartenir à une tribu qui n'est pas réellement la sienne). Les exégètes précisent que ces versets furent révélés au sujet d'<strong>Al-Walīd ibn Al-Mughīrah</strong> (ou d'Al-Akhnas ibn Sharīq).",
  "68:14": "<strong style='color:#ffffff;'>Même s'il est doté de richesses et de (nombreux) enfants.</strong><br><br>Au lieu de remercier Allāh qui l'a comblé d'une immense fortune et d'une nombreuse descendance mâle, il en tire orgueil contre la vérité.",
  "68:15": "<strong style='color:#ffffff;'>Quand Nos versets lui sont récités, il dit : « Des contes d'anciens ! »</strong><br><br>Par ingratitude et arrogance, lorsqu'il entend le Coran, il s'en détourne et prétend qu'il ne s'agit que de vieilles fables héritées des peuples anciens.",
  "68:16": "<strong style='color:#ffffff;'>Nous le marquerons sur le museau (le nez — Al-Khurtūm) !</strong><br><br>📜 <strong>Accomplissement historique :</strong> Il s'agit d'une expression arabe désignant un châtiment et un déshonneur indélébiles, car le marquage en plein visage (sur le nez) est le comble de l'humiliation. Les exégètes (At-Tabarī, Ibn Kathīr) rapportent que cette prophétie s'accomplit dès ce monde à la bataille de Badr où son nez fut fendu d'un coup d'épée, avant que son visage ne soit noirci en Enfer.",
  "68:17": "<strong style='color:#ffffff;'>Nous les avons éprouvés comme Nous avons éprouvés les propriétaires du verger qui avaient juré d'en faire la récolte au matin,</strong><br><br>📜 <strong>La parabole des propriétaires du verger :</strong> Allāh a éprouvé les riches Mecquois par la venue du Prophète ﷺ tout comme Il éprouva autrefois les propriétaires d'un riche verger (situé au Yémen près de Sanaa selon Ibn ‘Abbās) : après la mort de leur père pieux qui donnait toujours aux pauvres leur part le jour de la moisson, les fils jurèrent entre eux de tout récolter à l'aube en cachette afin qu'aucun indigent ne vienne demander l'aumône.",
  "68:18": "<strong style='color:#ffffff;'>sans dire : « Si Allāh le veut » (Wa lā yastathnūn).</strong><br><br>Aveuglés par leur avarice, ils prirent cette décision sans jamais formuler la réserve de la volonté d'Allāh (<em>In shā' Allāh</em>).",
  "68:19": "<strong style='color:#ffffff;'>Une calamité de la part de ton Seigneur tomba dessus pendant qu'ils dormaient,</strong><br><br>Durant la nuit même où ils dormaient en préparant leur ruse contre les pauvres, Allāh envoya un feu céleste qui consuma entièrement ce jardin dont ils étaient si fiers.",
  "68:20": "<strong style='color:#ffffff;'>et le matin, il (le verger) devint noir semblable à la nuit sombre (Ka-as-Sarīm).</strong><br><br>Le mot <strong>« Sarīm »</strong> désigne la nuit noire (ou la terre brûlée et moissonnée) : le jardin verdoyant et chargé de fruits se transforma en un champ de cendres noires.",
  "68:21": "<strong style='color:#ffffff;'>Le (lendemain) matin, ils s'appelèrent les uns les autres :</strong><br><br>Comme prévu, ils se réveillèrent à l'aube et s'interpellèrent, ignorant encore tout du désastre survenu dans la nuit.",
  "68:22": "<strong style='color:#ffffff;'>« Partez tôt à votre champ si vous voulez le récolter ! »</strong>",
  "68:23": "<strong style='color:#ffffff;'>Ils allèrent donc, tout en parlant entre eux à voix basse :</strong><br><br>Ils marchaient discrètement en chuchotant pour que les pauvres ne les entendent pas partir.",
  "68:24": "<strong style='color:#ffffff;'>« Qu'aucun pauvre n'entre aujourd'hui chez vous (dans le verger) ! »</strong>",
  "68:25": "<strong style='color:#ffffff;'>Ils partirent de bonne heure, décidés à user d'avarice (envers les pauvres), convaincus que cela était en leur pouvoir.</strong><br><br>Ils s'imaginaient détenir un pouvoir absolu sur leur récolte, oubliant Celui qui détient les cieux et la terre.",
  "68:26": "<strong style='color:#ffffff;'>Puis, quand ils le virent (le jardin calciné), ils dirent : « Vraiment, nous avons perdu notre chemin ! »</strong><br><br>En découvrant les terres noircies et dévastées, ils crurent d'abord s'être trompés de route.",
  "68:27": "<strong style='color:#ffffff;'>« Ou plutôt, nous sommes frustrés (privés de tout) ! »</strong><br><br>Après avoir reconnu les lieux, ils comprirent que c'était bien leur verger et qu'ils avaient été privés de ses fruits pour avoir voulu en priver les pauvres.",
  "68:28": "<strong style='color:#ffffff;'>Le plus juste d'entre eux (Awsatuhum) dit : « Ne vous avais-je pas dit : si seulement vous aviez rendu gloire à Allāh (et dit In shā' Allāh) ! »</strong><br><br>Le plus sage et le plus équitable des frères leur rappela son conseil qu'ils avaient refusé d'écouter la veille.",
  "68:29": "<strong style='color:#ffffff;'>Ils dirent : « Gloire à notre Seigneur ! Oui, nous avons été des injustes. »</strong><br><br>Prenant conscience de leur faute, ils purifièrent Allāh de toute injustice et reconnurent leur propre tort.",
  "68:30": "<strong style='color:#ffffff;'>Puis ils se mirent à se blâmer les uns les autres.</strong>",
  "68:31": "<strong style='color:#ffffff;'>Ils dirent : « Malheur à nous ! Nous avons été des transgresseurs.</strong>",
  "68:32": "<strong style='color:#ffffff;'>Nous souhaitons que notre Seigneur nous le remplace par quelque chose de meilleur. Nous désirons nous rapprocher de notre Seigneur. »</strong><br><br>Ils implorèrent Allāh avec un repentir sincère, espérant Son pardon et une compensation meilleure.",
  "68:33": "<strong style='color:#ffffff;'>Tel fut le châtiment (dans ce monde) ; et le châtiment de l'Au-delà est plus grand encore, si seulement ils savaient !</strong>",
  "68:34": "<strong style='color:#ffffff;'>Les pieux auront auprès de leur Seigneur les Jardins du délice.</strong><br><br>Après avoir montré le sort du jardin terrestre détruit à cause de l'avarice, Allāh promet à ceux qui Le craignent les Jardins éternels du Paradis qui ne périront jamais.",
  "68:35": "<strong style='color:#ffffff;'>Allons-Nous traiter ceux qui se soumettent (les musulmans) de la même façon que les criminels ?</strong><br><br>Lorsque les polythéistes mecquois prétendirent que s'il y avait une résurrection, ils auraient dans l'Au-delà encore plus de biens que les croyants, Allāh leur répondit par cette vérité éclatante : la justice divine ne saurait jamais traiter l'obéissant comme le rebelle.",
  "68:36": "<strong style='color:#ffffff;'>Qu'avez-vous ? Comment jugez-vous ainsi ?</strong>",
  "68:37": "<strong style='color:#ffffff;'>Avez-vous un Livre (révélé) dans lequel vous étudiez (cela),</strong>",
  "68:38": "<strong style='color:#ffffff;'>et où il serait écrit que vous aurez en vérité tout ce que vous choisirez ?</strong>",
  "68:39": "<strong style='color:#ffffff;'>Ou bien avez-vous obtenu de Nous des serments valables jusqu'au Jour de la Résurrection, nous engageant à vous donner ce que vous décidez ?</strong>",
  "68:40": "<strong style='color:#ffffff;'>Demande-leur qui d'entre eux en est garant !</strong>",
  "68:41": "<strong style='color:#ffffff;'>Ou encore, ont-ils des associés ? Eh bien, qu'ils fassent venir leurs associés s'ils sont véridiques !</strong>",
  "68:42": "<strong style='color:#ffffff;'>Le jour où la Jambe sera découverte (Yawma yukshafu ‘an sāq) et où ils seront appelés à la prosternation, mais ils ne le pourront pas,</strong><br><br>📜 <strong>Le Hadith authentique d'Abū Sa‘īd Al-Khudrī (Al-Bukhārī & Muslim) :</strong> Au sujet de ce verset, le Messager d'Allāh ﷺ a dit : <strong>« Notre Seigneur découvrira Sa Jambe, alors tout croyant et toute croyante se prosternera devant Lui. Il ne restera que celui qui se prosternait dans le bas monde par ostentation et pour la renommée : il voudra alors se prosterner, mais son dos redeviendra un seul bloc rigide (Tabaqan wāhidan, incapable de plier) ! »</strong> (<em>Rapporté par Al-Bukhārī n°4919 et Muslim n°183</em>).",
  "68:43": "<strong style='color:#ffffff;'>leurs regards seront abaissés, et l'avilissement les couvrira. Or, ils étaient appelés à la prosternation au temps où ils étaient sains et saufs !</strong><br><br>Conviés chaque jour à se prosterner par l'appel à la prière (<em>Hayya ‘alā as-Salāh</em>) dans ce bas monde alors qu'ils étaient en parfaite santé et libres de leurs mouvements, ils refusaient par orgueil ; au Jour du Jugement, leur colonne vertébrale sera figée en punition de leur refus.",
  "68:44": "<strong style='color:#ffffff;'>Laisse-Moi donc avec quiconque traite ce discours (le Coran) de mensonge ; Nous allons les mener graduellement vers leur perte (Sanastadrijuhum) par où ils ne savent pas !</strong><br><br>C'est la loi divine de l'<em>Istidrāj</em> : lorsque le pécheur persiste dans son arrogance, Allāh lui ouvre les portes des richesses et de la santé jusqu'à ce qu'il croie être à l'abri, puis Il le saisit soudainement.",
  "68:45": "<strong style='color:#ffffff;'>Et Je leur accorde un délai, car Mon stratagème est sûr (infaillible) !</strong>",
  "68:46": "<strong style='color:#ffffff;'>Ou bien est-ce que tu leur demandes un salaire, les accablant ainsi d'une lourde dette ?</strong><br><br>Question rhétorique : leur demandes-tu de l'argent en échange de la guidée ? Non, le Prophète ﷺ les appelle gratuitement au salut.",
  "68:47": "<strong style='color:#ffffff;'>Ou savent-ils l'Inconnaissable (Al-Ghayb) et c'est de là qu'ils écrivent (leurs prétentions) ?</strong>",
  "68:48": "<strong style='color:#ffffff;'>Endure avec patience la sentence de ton Seigneur, et ne sois pas comme l'Homme au Poisson (Jonas / Yūnus) qui appela (Allāh) dans sa grande détresse (Makdhūm).</strong><br><br>📜 <strong>L'histoire du Prophète Yūnus (Jonas) :</strong> Allāh exhorte Son Prophète Muhammad ﷺ à patienter face aux persécutions de son peuple sans se précipiter comme le fit Yūnus (Jonas) lorsqu'il quitta son peuple irrité avant d'en avoir reçu l'autorisation divine. Avalé par le grand poisson dans les profondeurs de la mer, il invoqua son Seigneur du fond des ténèbres : <strong>« Il n'y a de divinité que Toi ! Gloire et pureté à Toi ! J'étais certes du nombre des injustes ! »</strong> (<em>Sourate Al-Anbiyā' 21:87 & Sunan At-Tirmidhī n°3505</em>).",
  "68:49": "<strong style='color:#ffffff;'>Si un bienfait de son Seigneur ne l'avait pas atteint, il aurait été rejeté honni sur une terre déserte,</strong><br><br>Si la grâce d'Allāh, son passé de grand adorateur et son repentir sincère ne l'avaient pas secouru dans le ventre du poisson, il aurait été rejeté sur une plage aride tout en étant blâmé.",
  "68:50": "<strong style='color:#ffffff;'>Mais son Seigneur l'élut (l'agréa) et le plaça au nombre des gens de bien (As-Sālihīn).</strong>",
  "68:51": "<strong style='color:#ffffff;'>Peu s'en faut que ceux qui mécroient ne te transpercent par leurs regards, quand ils entendent le Coran, et qu'ils disent : « Il est certes fou ! »</strong><br><br>📜 <strong>Le mauvais œil (Al-‘Ayn) et la haine des négateurs :</strong> Les exégètes (Ibn ‘Abbās, Ibn Kathīr, Al-Qurtubī) expliquent que les mécréants regardaient le Prophète ﷺ avec une telle haine et une telle jalousie lorsqu'il récitait le Coran qu'ils auraient voulu le foudroyer du mauvais œil si Allāh ne l'avait pas protégé. Ce verset est l'une des preuves coraniques de la réalité du mauvais œil, confirmée par le Hadith : <strong>« Le mauvais œil (Al-‘Ayn) est une réalité »</strong> (<em>Rapporté par Al-Bukhārī n°5740 et Muslim n°2187</em>).",
  "68:52": "<strong style='color:#ffffff;'>Et ce (Coran) n'est qu'un Rappel, adressé aux Mondes (hommes et djinns) !</strong>",
  "73:1": "<strong style='color:#ffffff;'>Ô toi, l'enveloppé (dans tes vêtements — Al-Muzzammil) !</strong><br><br>Ce verset s'adresse avec douceur au Prophète Muhammad ﷺ alors qu'il s'était enveloppé dans ses vêtements. Faisant partie des toutes premières sourates révélées à La Mecque, elle lui ordonne de quitter le confort du sommeil pour se lever dans l'adoration nocturne.",
  "73:2": "<strong style='color:#ffffff;'>Lève-toi (pour prier), toute la nuit, excepté une petite partie ;</strong><br><br>📜 <strong>L'obligation initiale de la prière nocturne (Qiyām al-Layl) :</strong> Au début de l'Islam, par ces versets, Allāh décréta la prière de la nuit comme une obligation pour le Prophète ﷺ et les premiers croyants afin de forger leur âme et de les préparer à porter le poids de la mission prophétique, avant que cette obligation ne soit allégée un an plus tard au verset 20.",
  "73:3": "<strong style='color:#ffffff;'>Sa moitié, ou un peu moins ;</strong><br><br>Allāh lui précise avec miséricorde la part de la nuit à consacrer à la prière : la moitié de la nuit, ou un peu moins (jusqu'au tiers),",
  "73:4": "<strong style='color:#ffffff;'>ou un peu plus (jusqu'aux deux tiers). Et récite le Coran, lentement et clairement (Wa rattili al-Qur'āna tartīlā).</strong><br><br>📜 <strong>L'ordre du Tartīl :</strong> Allāh ordonne de réciter le Coran avec <em>Tartīl</em>, c'est-à-dire posément, en articulant distinctement chaque lettre, en respectant les règles de prononciation et en méditant profondément ses sens. ‘Alī ibn Abī Tālib (qu'Allāh l'agrée) a expliqué que le <em>Tartīl</em> consiste à bien prononcer les lettres et à connaître les pauses.",
  "73:5": "<strong style='color:#ffffff;'>Nous allons te révéler des paroles lourdes (très importantes — Qawlan Thaqīlā).</strong><br><br>Allāh prépare Son Prophète ﷺ : le Coran est une parole « lourde » par la majesté de ses commandements, par son poids immense sur la Balance au Jour de la Résurrection, et même physiquement lors de la descente de la Révélation (comme le rapporte ‘Ā'ishah dans <em>Sahīh Al-Bukhārī n°2</em> : le front du Prophète ﷺ perlait de sueur par grand froid lorsque la Révélation descendait sur lui).",
  "73:6": "<strong style='color:#ffffff;'>La prière pendant la nuit (Nāshi'ata al-layl) est plus efficace (pour toucher le cœur) et plus propice pour la récitation.</strong><br><br>Les heures de la nuit sont le moment où le cœur et la langue s'accordent le mieux, loin du bruit et des distractions du monde, apportant une sérénité et une concentration profondes.",
  "73:7": "<strong style='color:#ffffff;'>Tu as, dans la journée, à vaquer à de longues occupations.</strong><br><br>Durant le jour, tu as tout le temps nécessaire pour accomplir tes besoins quotidiens, rencontrer les gens et transmettre le Message ; réserve donc ta nuit à l'intimité avec ton Seigneur.",
  "73:8": "<strong style='color:#ffffff;'>Et invoque le nom de ton Seigneur et consacre-toi totalement à Lui (Tabattul),</strong><br><br>Mentionne abondamment ton Seigneur, détache ton cœur des créatures et voue-Lui un culte sincère et exclusif.",
  "73:9": "<strong style='color:#ffffff;'>le Seigneur du Levant et du Couchant. Il n'y a point de divinité à part Lui. Prends-Le donc comme Protecteur (Wakīlā).</strong><br><br>Il est l'Unique Souverain de l'Orient et de l'Occident : confie-Lui donc toutes tes affaires en toute confiance.",
  "73:10": "<strong style='color:#ffffff;'>Et endure ce qu'ils disent ; et écarte-toi d'eux d'une façon convenable (Hajran Jamīlā).</strong><br><br>Supporte avec patience les calomnies et les moqueries des mécréants mecquois, et détourne-toi d'eux dignement sans leur rendre leurs insultes.",
  "73:11": "<strong style='color:#ffffff;'>Et laisse-Moi avec ceux qui crient au mensonge et qui vivent dans l'aisance ; et accorde-leur un court répit :</strong><br><br>Allāh rassure Son Prophète ﷺ : laisse-Moi Me charger Moi-même de ces chefs opulents de Quraysh qui rejettent la vérité, et accorde-leur un court délai en ce bas monde.",
  "73:12": "<strong style='color:#ffffff;'>Nous avons (pour eux) de lourdes chaînes (Ankālan) et la Fournaise (Jahīmā),</strong>",
  "73:13": "<strong style='color:#ffffff;'>et une nourriture à faire suffoquer (qui reste coincée dans la gorge), et un châtiment douloureux,</strong><br><br>Ibn ‘Abbās explique qu'il s'agit d'une nourriture épineuse infernale (<em>Ad-Darī‘</em> et <em>Az-Zaqqūm</em>) qui s'accroche dans la gorge sans pouvoir ni descendre ni ressortir.",
  "73:14": "<strong style='color:#ffffff;'>le jour où la terre et les montagnes trembleront, tandis que les montagnes deviendront comme une dune de sable dispersée (qui s'écoule).</strong><br><br>Au Jour de la Résurrection, les montagnes de roche solide seront pulvérisées et s'affaisseront comme des tas de sable mouvant.",
  "73:15": "<strong style='color:#ffffff;'>Nous vous avons envoyé un Messager pour être témoin contre vous, de même que Nous avions envoyé un Messager à Pharaon (Fir‘awn).</strong><br><br>Allāh avertit les habitants de La Mecque en établissant un parallèle direct : Il leur a envoyé Muhammad ﷺ tout comme Il avait envoyé Mūsā (Moïse) à Pharaon.",
  "73:16": "<strong style='color:#ffffff;'>Pharaon désobéit alors au Messager. Nous le saisîmes donc rudement (d'un châtiment dévastateur).</strong><br><br>Prenez donc garde, ô chefs de Quraysh, de subir un sort semblable à celui de Pharaon qui fut englouti malgré toute sa puissance !",
  "73:17": "<strong style='color:#ffffff;'>Comment vous préserverez-vous, si vous mécroyez, d'un Jour qui rendra les enfants comme des vieillards aux cheveux blancs ?</strong><br><br>Tant la terreur et l'angoisse du Jour du Jugement seront intenses, les jeunes enfants auraient les cheveux blanchis sur-le-champ.",
  "73:18": "<strong style='color:#ffffff;'>(Et) durant lequel le ciel se fendra. Sa promesse s'accomplira sans aucun doute.</strong>",
  "73:19": "<strong style='color:#ffffff;'>Ceci est un rappel. Que celui qui veut prenne donc une voie (menant) à son Seigneur !</strong>",
  "73:20": "<strong style='color:#ffffff;'>Ton Seigneur sait, certes, que tu (Muhammad) te tiens debout moins de deux tiers de la nuit, ou sa moitié, ou son tiers, de même qu'une partie de ceux qui sont avec toi...</strong><br><br>📜 <strong>Le Hadith de ‘Ā'ishah sur l'allègement après un an (Sahīh Muslim n°746) :</strong> ‘Ā'ishah (qu'Allāh l'agrée) rapporte qu'Allāh révéla les premiers versets de cette sourate rendant obligatoire la prière de la nuit. Le Prophète ﷺ et ses compagnons accomplirent alors cette obligation durant <strong>une année entière</strong> jusqu'à ce que leurs pieds enflent, tandis qu'Allāh retint au ciel la fin de la sourate pendant douze mois, avant de faire descendre ce verset 20 d'allègement : la prière nocturne (<em>Qiyām al-Layl</em>) devint alors surérogatoire (recommandée) après avoir été obligatoire.<br><br>⚖️ <strong>Les enseignements majeurs de ce verset :</strong><br>• <strong>1. La miséricorde d'Allāh envers les croyants :</strong> Allāh sait que Ses serviteurs ne peuvent pas calculer avec précision les fractions de la nuit ni veiller indéfiniment, car certains sont touchés par <strong>la maladie</strong>, d'autres <strong>voyagent sur terre pour gagner licitement leur subsistance par le commerce</strong>, et d'autres <strong>combattent dans le sentier d'Allāh</strong>. Il ordonne donc : <em>« Récitez ce qui vous est possible du Coran ! »</em><br>• <strong>2. L'institution de la Zakât dès La Mecque :</strong> L'ordre <em>« Accomplissez la Salât et acquittez la Zakât »</em> dans cette sourate mecquoise prouve que le principe de l'aumône légale (Zakât) fut prescrit dès la période mecquoise, tandis que ses seuils imposables (<em>Nisāb</em>) et ses barèmes détaillés furent fixés à Médine.<br>• <strong>3. Le prêt sincère à Allāh et l'Istighfār :</strong> Tout bien dépensé pour Allāh est comparé à un <em>« beau prêt » (Qardan hasanā)</em> qu'Allāh multiplie au centuple, et la sourate se conclut par l'ordre d'implorer le pardon d'Allāh, le Pardonneur et Très Miséricordieux."
};
const TAFSIR_SOURATES_68_73_EN = {
  "68:1": "<strong style='color:#ffffff;'>Nūn (Detached Letter). By the Pen and what they inscribe!</strong><br><br>📜 <strong>1. The Challenge of the Detached Letter:</strong> Allāh begins with the letter <em>Nūn</em> to challenge the Arabs: this Quran is composed of the very letters of your alphabet, yet none can produce its like.<br><br>📜 <strong>2. The Heavenly Pen (Al-Qalam) & the Scribing Angels:</strong> <strong>As-Suddī</strong> stated this refers to the Angels recording human deeds, while other scholars explained it refers to the Heavenly Pen which Allāh commanded to write the decree of all things <strong>fifty thousand years before creating the heavens and the earth</strong> (<em>Sahīh Muslim #2653, Abū Dāwūd #4700 & At-Tirmidhī #2155</em>).",
  "68:4": "<strong style='color:#ffffff;'>And indeed, you are of a sublime moral character (Khuluqin ‘Adhīm).</strong><br><br>📜 <strong>Hadith of ‘Ā'ishah:</strong> When asked about the character of the Messenger of Allāh ﷺ, <strong>‘Ā'ishah (may Allāh be pleased with her)</strong> said: <strong>'His character was the Quran!'</strong> (<em>Sahīh Muslim #746</em>).",
  "68:13": "<strong style='color:#ffffff;'>Cruel and coarse (‘Utullin), and moreover ignoble (Zanīm).</strong><br><br>📜 <strong>Three Classical Explanations of 'Zanīm':</strong> According to <strong>‘Ikrimah</strong>, one born out of wedlock; according to <strong>Ibn ‘Abbās</strong>, a notoriously wicked person known for evil; and thirdly, one who falsely claims lineage in a tribe. Revealed regarding <strong>Al-Walīd ibn Al-Mughīrah</strong>.",
  "68:16": "<strong style='color:#ffffff;'>We will brand him upon the snout (nose — Al-Khurtūm)!</strong><br><br>📜 Branding on the nose was the ultimate mark of humiliation among the Arabs; fulfilled at the Battle of Badr when his nose was struck by a sword, leaving a permanent scar until his death.",
  "68:17": "<strong style='color:#ffffff;'>Indeed, We have tried them just as We tried the owners of the garden when they swore to harvest its fruit in the early morning,</strong><br><br>📜 A historical parable of brothers in Yemen who inherited a lush orchard from their righteous father, but conspired to harvest it in secret at dawn to deprive the poor of charity.",
  "68:18": "<strong style='color:#ffffff;'>Without making exception (without saying: 'In shā' Allāh — If Allāh wills').</strong>",
  "68:20": "<strong style='color:#ffffff;'>And by morning it became as pitch-black ashes / dark night (Ka-as-Sarīm).</strong>",
  "68:42": "<strong style='color:#ffffff;'>The Day the Shin will be uncovered (Yawma yukshafu ‘an sāq) and they are invited to prostration, yet they will not be able to do so!</strong><br><br>📜 <strong>Hadith of Abū Sa‘īd Al-Khudrī (Al-Bukhārī #4919 & Muslim #183):</strong> The Prophet ﷺ said: <strong>'Our Lord will uncover His Shin, and every believing man and woman will prostrate to Him. Only those who used to prostrate in the world for show and reputation will remain; when they try to prostrate, their backs will become a single rigid plate!'</strong>",
  "68:43": "<strong style='color:#ffffff;'>Their eyes humbled, humiliation will cover them; for indeed they used to be called to prostrate while they were sound and healthy!</strong>",
  "68:48": "<strong style='color:#ffffff;'>So wait patiently for the decree of your Lord, and do not be like the Companion of the Fish (Jonah / Yūnus) when he cried out in deep distress.</strong><br><br>📜 Inside the belly of the whale, Yūnus called upon Allāh: <strong>'There is no deity except You; exalted are You! Indeed, I have been of the wrongdoers.'</strong> (<em>Surah 21:87 & At-Tirmidhī #3505</em>).",
  "68:51": "<strong style='color:#ffffff;'>And indeed, those who disbelieve would almost strike you down with their eyes when they hear the Reminder (the Quran), saying: 'Surely he is mad!'</strong><br><br>📜 <strong>Reality of the Evil Eye (Al-‘Ayn):</strong> Ibn ‘Abbās and Ibn Kathīr explain that the disbelievers glared at the Prophet ﷺ with intense envy and hatred, wishing to afflict him with the evil eye. The Prophet ﷺ said: <strong>'The evil eye is real.'</strong> (<em>Sahīh Al-Bukhārī #5740 & Sahīh Muslim #2187</em>).",
  "73:1": "<strong style='color:#ffffff;'>O you who wraps himself (in his garments — Al-Muzzammil)!</strong><br><br>A gentle address to Prophet Muhammad ﷺ in the earliest days of revelation in Makkah, calling him to rise from sleep to night prayer.",
  "73:2": "<strong style='color:#ffffff;'>Stand (in prayer) through the night, except a little—</strong><br><br>📜 Night prayer (<em>Qiyām al-Layl</em>) was initially made obligatory upon the Prophet ﷺ and the early believers for one full year to prepare their hearts for the heavy mission of the Quran, before being lightened in verse 20.",
  "73:4": "<strong style='color:#ffffff;'>Or add to it a little; and recite the Quran with measured, distinct recitation (Wa rattili al-Qur'āna tartīlā).</strong><br><br>📜 Allāh commands reciting the Quran slowly and clearly (<em>Tartīl</em>), pronouncing every letter properly while pondering its meanings.",
  "73:20": "<strong style='color:#ffffff;'>Indeed, your Lord knows that you stand (in prayer) less than two-thirds of the night, or half of it, or a third of it, as does a group of those with you...</strong><br><br>📜 <strong>Hadith of ‘Ā'ishah in Sahīh Muslim (#746):</strong> ‘Ā'ishah reported that after the Prophet ﷺ and his companions stood in obligatory night prayer for <strong>twelve months</strong> until their feet swelled, Allāh revealed this final verse to lighten the obligation and make night prayer voluntary.<br><br>⚖️ Allāh acknowledged three excused groups—the <strong>sick</strong>, <strong>travelers seeking Allāh's bounty through lawful trade</strong>, and <strong>those striving in Allāh's cause</strong>—and ordained establishing Prayer, giving <strong>Zakāh</strong> (showing Zakāh was instituted in principle in Makkah before its thresholds were detailed in Madinah), lending Allāh a goodly loan, and seeking His forgiveness."
};
const TAFSIR_SOURATES_68_73_ES = {
  "68:1": "<strong style='color:#ffffff;'>Nūn (Letra aislada). ¡Por el cálamo y lo que escriben!</strong><br><br>📜 <strong>1. El desafío de las letras aisladas:</strong> Allah desafía a los árabes a producir algo semejante a este Corán compuesto con las letras de su propio alfabeto.<br><br>📜 <strong>2. El Cálamo celestial (Al-Qalam) y los Ángeles:</strong> <strong>As-Suddī</strong> dijo que se refiere a los Ángeles escribas, mientras que otros sabios explican que es el Cálamo al que Allah ordenó escribir todo lo predestinado <strong>cincuenta mil años antes de la creación de los cielos y de la tierra</strong> (<em>Sahīh Muslim n°2653 y At-Tirmidhī n°2155</em>).",
  "68:4": "<strong style='color:#ffffff;'>Y ciertamente eres de una moralidad sublime (Khuluqin ‘Adhīm).</strong><br><br>📜 <strong>Hadiz de ‘Ā'ishah:</strong> Cuando le preguntaron por el carácter del Profeta ﷺ, <strong>‘Ā'ishah</strong> respondió: <strong>«¡Su carácter era el Corán!»</strong> (<em>Sahīh Muslim n°746</em>).",
  "68:13": "<strong style='color:#ffffff;'>De corazón duro (‘Utullin), y además de eso « Zanīm ».</strong><br><br>📜 <strong>Las 3 explicaciones de « Zanīm »:</strong> Según <strong>‘Ikrimah</strong>, es el hijo ilegítimo; según <strong>Ibn ‘Abbās</strong>, el libertino conocido por su maldad; y el que se atribuye un falso linaje tribal, revelado sobre <strong>Al-Walīd ibn Al-Mughīrah</strong>.",
  "68:16": "<strong style='color:#ffffff;'>¡Lo marcaremos en el hocico (la nariz — Al-Khurtūm)!</strong><br><br>📜 Expresión árabe que designa un castigo humillante; se cumplió en la batalla de Badr cuando recibió un golpe de espada en la nariz cuya cicatriz llevó hasta su muerte.",
  "68:17": "<strong style='color:#ffffff;'>Los hemos puesto a prueba como probamos a los dueños del huerto cuando juraron cosechar sus frutos por la mañana,</strong><br><br>📜 Parábola histórica de los hermanos dueños de un jardín que juraron cosechar al amanecer en secreto para no dar limosna a los pobres, sin decir <em>« Si Allah quiere » (In shā' Allāh)</em> (v.18), por lo que Allah quemó su jardín mientras dormían dejándolo negro como la noche oscura (<em>As-Sarīm</em>, v.20).",
  "68:42": "<strong style='color:#ffffff;'>El Día en que se descubra la Pierna (Yawma yukshafu ‘an sāq) y sean llamados a la postración, pero no podrán hacerlo.</strong><br><br>📜 <strong>Hadiz de Abū Sa‘īd Al-Khudrī (Al-Bukhārī n°4919 y Muslim n°183):</strong> En el Día del Juicio, todo creyente sincero se postrará ante su Señor, mientras que quienes rechazaban rezar en el mundo cuando estaban sanos y salvos (v.43) o lo hacían por hipocresía querrán postrarse, pero <strong>sus espaldas se volverán rígidas como una sola placa</strong>.",
  "68:48": "<strong style='color:#ffffff;'>Soporta con paciencia el decreto de tu Señor y no seas como el Hombre del Pez (Jonás / Yūnus) cuando invocó lleno de angustia.</strong><br><br>📜 Yūnus (Jonás) se marchó airado antes del permiso de Allah y desde el vientre de la ballena suplicó: <strong>«¡No hay divinidad sino Tú! ¡Glorificado seas! Ciertamente fui de los injustos.»</strong> (<em>Sura 21:87</em>).",
  "68:51": "<strong style='color:#ffffff;'>Casi te fulminan con sus miradas los incrédulos cuando escuchan el Recuerdo (el Corán), y dicen: «¡Ciertamente está loco!»</strong><br><br>📜 Prueba coránica de la realidad del <strong>mal de ojo (Al-‘Ayn)</strong> por envidia y odio, confirmada por el Hadiz: <strong>«El mal de ojo es una realidad»</strong> (<em>Al-Bukhārī n°5740 y Muslim n°2187</em>).",
  "73:1": "<strong style='color:#ffffff;'>¡Oh tú, el envuelto en sus vestiduras (Al-Muzzammil)!</strong><br><br>Llamado afectuoso al Profeta Muhammad ﷺ al inicio de la revelación en La Meca para levantarse a rezar por la noche.",
  "73:4": "<strong style='color:#ffffff;'>O un poco más; y recita el Corán lenta y claramente (Wa rattili al-Qur'āna tartīlā).</strong><br><br>📜 Orden divina de recitar el Corán pausadamente, articulando cada letra y meditando sus significados.",
  "73:20": "<strong style='color:#ffffff;'>Tu Señor sabe que te levantas a rezar menos de dos tercios de la noche, o la mitad, o un tercio, al igual que una parte de los que están contigo...</strong><br><br>📜 <strong>Hadiz de ‘Ā'ishah (Sahīh Muslim n°746):</strong> Tras haber cumplido el Profeta ﷺ y sus compañeros la obligación de rezar gran parte de la noche durante <strong>un año entero</strong>, Allah reveló esta última aleya abrogando la obligatoriedad y haciéndola voluntaria, teniendo en cuenta a los <strong>enfermos</strong>, a los que <strong>viajan buscando el sustento lícito</strong> y a quienes <strong>combaten por la causa de Allah</strong>, e instituyendo el principio del <strong>Zakāt</strong> ya en La Meca antes de que sus cuantías se detallaran en Medina."
};
const TAFSIR_SOURATES_68_73_AR = {
  "68:1": "<strong style='color:#ffffff;'>﴿ن ۚ وَالْقَلَمِ وَمَا يَسْطُرُونَ﴾</strong><br><br>📜 <strong>1. التحدي بالحروف المقطعة :</strong> افتتح الله السورة بالحرف المقطّع (ن) تحديًا للعرب بأن هذا القرآن مؤلّف من جنس الحروف التي ينطقون بها ومع ذلك عجزوا عن الإتيان بمثله.<br><br>📜 <strong>2. القلم وما يسطرون :</strong> قال <strong>السُّدِّيّ</strong>: المراد الملائكة الحفظة وما يكتبون من أعمال العباد، وقال جمهور المفسرين (كابن عباس وقتادة): هو القلم الأول الذي خلقه الله وأمره بكتابة مقادير كل شيء <strong>قبل خلق السماوات والأرض بخمسين ألف سنة</strong>، كما ثبت في الحديث الصحيح: <strong>«إن أول ما خلق الله القلم، فقال له: اكتب! قال: ربِّ وماذا أكتب؟ قال: اكتب مقادير كل شيء حتى تقوم الساعة»</strong> (<em>رواه أبو داود 4700 والترمذي 2155 ومسلم 2653</em>).",
  "68:4": "<strong style='color:#ffffff;'>﴿وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ﴾</strong><br><br>📜 <strong>حديث عائشة رضي الله عنها في خُلُق النبي ﷺ :</strong> زكّى الله عز وجل نبيه محمدًا ﷺ بأعظم تزكية، ولما سُئلت أم المؤمنين <strong>عائشة رضي الله عنها</strong> عن خُلُق رسول الله ﷺ قالت: <strong>«كان خُلُقُه القرآن!»</strong> (<em>رواه مسلم رقم 746</em>)، يمتثل أوامره ويجتنب نواهيه ويتحلى بآدابه.",
  "68:13": "<strong style='color:#ffffff;'>﴿عُتُلٍّ بَعْدَ ذَٰلِكَ زَنِيمٍ﴾</strong><br><br>📜 <strong>تفسير «الزَّنِيم» عند السلف :</strong> العُتُلّ هو الغليظ الجافي القاسي القلب، وأما <strong>«الزنيم»</strong> ففيه ثلاثة أقوال متلازمة: قال <strong>عكرمة</strong>: هو ولد الزنا، وقال <strong>ابن عباس</strong>: هو الرجل الفاجر العِربيد المعروف بالشر كما تُعرف الشاة بزنمتها، والثالث: الدَّعِيّ المُلصَق في القوم وليس منهم؛ ونزلت في <strong>الوليد بن المغيرة</strong>.",
  "68:16": "<strong style='color:#ffffff;'>﴿سَنَسِمُهُ عَلَى الْخُرْطُومِ﴾</strong><br><br>📜 <strong>تحقق الوعيد الإلهي :</strong> السِّمَة على الأنف (الخرطوم) غاية الإذلال والعار عند العرب، وقد تحقق ذلك في الدنيا يوم بدر حين ضُرب أنفه بالسيف فبقيت علامته ظاهرة في وجهه حتى هلك، قبل سواد الوجه في الآخرة.",
  "68:17": "<strong style='color:#ffffff;'>﴿إِنَّا بَلَوْنَاهُمْ كَمَا بَلَوْنَا أَصْحَابَ الْجَنَّةِ إِذْ أَقْسَمُوا لَيَصْرِمُنَّهَا مُصْبِحِينَ﴾</strong><br><br>📜 <strong>قصة أصحاب الجنة :</strong> ضرب الله مثلًا لكفار قريش في كفران النعمة بأصحاب البستان (قرب صنعاء باليمن)، حين ورثوا جنةً عن أبيهم الصالح الذي كان يعطي المساكين حقهم، فحلف الأبناء سرًّا أن يقطعوا ثمارها في الصباح الباكر حرمانًا للفقراء، <strong>دون أن يقولوا «إن شاء الله» (آية 18)</strong>، فأرسل الله عليها نارًا ليلًا وهم نائمون فأصبحت <strong>﴿كَالصَّرِيمِ﴾ (آية 20)</strong> أي سوداء كالليل المظلم، فلما رأوها ندموا وتابوا إلى ربهم (آية 28-32).",
  "68:42": "<strong style='color:#ffffff;'>﴿يَوْمَ يُكْشَفُ عَن سَاقٍ وَيُدْعَوْنَ إِلَى السُّجُودِ فَلَا يَسْتَطِيعُونَ﴾</strong><br><br>📜 <strong>حديث أبي سعيد الخدري في الصحيحين :</strong> قال رسول الله ﷺ: <strong>«يكشف ربنا عن ساقه، فيسجد له كل مؤمن ومؤمنة، ويبقى من كان يسجد في الدنيا رياءً وسمعةً، فيذهب ليسجد فيعود ظهره طبقًا واحدًا (أي عظمًا واحدًا متصلًا كصفيحة صلبة لا ينحني)!»</strong> (<em>رواه البخاري 4919 ومسلم 183</em>)، وذلك جزاءً لهم لأنهم كانوا يُدعون إلى السجود في الدنيا بالأذان وهم سالمون أصحاء فيمتنعون استكبارًا (آية 43).",
  "68:48": "<strong style='color:#ffffff;'>﴿فَاصْبِرْ لِحُكْمِ رَبِّكَ وَلَا تَكُن كَصَاحِبِ الْحُوتِ إِذْ نَادَىٰ وَهُوَ مَكْظُومٌ﴾</strong><br><br>📜 يأمر الله نبيه ﷺ بالصبر على أذى قومه وألا يعجل كعجلة نبي الله <strong>يونس بن متّى عليه السلام (صاحب الحوت)</strong> حين خرج مغاضبًا لقومه قبل إذن ربه، فالتقمه الحوت فنادى في الظلمات وهو مكظوم مملوء غمًّا: <strong>﴿لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ﴾</strong> فنجّاه الله واجتباه وجعله من الصالحين (آية 49-50).",
  "68:51": "<strong style='color:#ffffff;'>﴿وَإِن يَكَادُ الَّذِينَ كَفَرُوا لَيُزْلِقُونَكَ بِأَبْصَارِهِمْ لَمَّا سَمِعُوا الذِّكْرَ وَيَقُولُونَ إِنَّهُ لَمَجْنُونٌ﴾</strong><br><br>📜 <strong>إثبات حقيقة العين والحسد :</strong> قال ابن عباس ومجاهد وابن كثير: أي لَينفذونك ويعينونك بأبصارهم حسدًا وبغضًا لك لولا وقاية الله وحفظه؛ وفي الآية دليل على أن <strong>«العين حق»</strong> كما صح عن النبي ﷺ في <em>صحيح البخاري (5740) وصحيح مسلم (2187)</em>.",
  "73:1": "<strong style='color:#ffffff;'>﴿يَا أَيُّهَا الْمُزَّمِّلُ﴾</strong><br><br>نداءٌ لطيف لنبي الله محمد ﷺ وهو متلفّف في ثيابه في أوائل الوحي بمكة، يأمره بالنهوض إلى قيام الليل ومناجاة ربه.",
  "73:2": "<strong style='color:#ffffff;'>﴿قُمِ اللَّيْلَ إِلَّا قَلِيلًا﴾</strong><br><br>📜 فرض الله قيام الليل في أول هذه السورة على النبي ﷺ وأصحابه <strong>حولًا كاملًا</strong> إعدادًا لقلوبهم لتحمّل القول الثقيل (القرآن الكريم)، قبل أن ينزل التخفيف في آخر السورة.",
  "73:4": "<strong style='color:#ffffff;'>﴿أَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا﴾</strong><br><br>📜 <strong>الأمر بترتيل القرآن :</strong> أي اقرأه على تمهّل وتبيين للحروف وتدبّر للمعاني؛ قال علي بن أبي طالب رضي الله عنه: <em>«الترتيل تجويد الحروف ومعرفة الوقوف»</em>.",
  "73:20": "<strong style='color:#ffffff;'>﴿إِنَّ رَبَّكَ يَعْلَمُ أَنَّكَ تَقُومُ أَدْنَىٰ مِن ثُلُثَيِ اللَّيْلِ وَنِصْفَهُ وَثُلُثَهُ وَطَائِفَةٌ مِّنَ الَّذِينَ مَعَكَ...﴾</strong><br><br>📜 <strong>حديث عائشة رضي الله عنها في صحيح مسلم (746) :</strong> قالت عائشة رضي الله عنها: إن الله افترض قيام الليل في أول هذه السورة، فقام نبي الله ﷺ وأصحابه <strong>حولًا كاملًا</strong> حتى انتفخت أقدامهم، وأمسك الله خاتمتها في السماء اثني عشر شهرًا، ثم أنزل الله التخفيف في آخر هذه السورة فصار قيام الليل تطوّعًا بعد فريضة.<br><br>⚖️ <strong>فوائد الآية العظيمة :</strong> رحم الله الأمة لعلمه بعجزهم عن إحصاء ساعات الليل، ولوجود الأعذار كـ<strong>المرض</strong>، و<strong>السفر في الأرض للتجارة وطلب الرزق الحلال</strong>، و<strong>الجهاد في سبيل الله</strong>، فأمرهم بقراءة ما تيسّر من القرآن، وإقام الصلاة وإيتاء <strong>الزكاة</strong> (مما يدل على أن أصل فرض الزكاة شُرع بمكة ثم فُصّلت أنصبتها ومقاديرها بالمدينة)، وإقراض الله قرضًا حسنًا بالصدقة، وكثرة الاستغفار."
};

Object.assign(memoireGlobale.tafsirFr, TAFSIR_INTEGRAL_DE_BASE_FR, TAFSIR_SOURATE_96_FR, TAFSIR_SOURATES_68_73_FR);
Object.assign(memoireGlobale.tafsirEn, TAFSIR_SOURATE_96_EN, TAFSIR_SOURATES_68_73_EN);
Object.assign(memoireGlobale.tafsirEs, TAFSIR_SOURATE_96_ES, TAFSIR_SOURATES_68_73_ES);
Object.assign(memoireGlobale.tafsirAr, TAFSIR_SOURATE_96_AR, TAFSIR_SOURATES_68_73_AR);
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
  const bgCtx = bgCanvas.getContext('2d', { alpha: true, desynchronized: true });
  const sunEl = document.getElementById('flatEarthSun');
  const moonEl = document.getElementById('flatEarthMoon');
  if (sunEl) sunEl.style.display = 'flex';
  if (moonEl) moonEl.style.display = 'flex';

  const isMobileScreen = window.innerWidth <= 820;
  let wScreen = window.innerWidth, hScreen = window.innerHeight, stars = [], flakes = [], angleOrbite = 0.35;
  try { const sa = sessionStorage.getItem('orbit_angle_v21'); if (sa !== null && !isNaN(Number(sa))) angleOrbite = Number(sa); } catch(e){}
  function sauvegarderConfigCiel() { try { sessionStorage.setItem('orbit_angle_v21', String(angleOrbite)); } catch(e){} }
  window.addEventListener('beforeunload', sauvegarderConfigCiel);

  function resizeFullSky() {
    wScreen = window.innerWidth;
    hScreen = window.innerHeight;
    bgCanvas.width = wScreen;
    bgCanvas.height = hScreen;
  }
  resizeFullSky();

  const starSprite = document.createElement('canvas');
  starSprite.width = 24; starSprite.height = 24;
  const sCtx = starSprite.getContext('2d');
  const radGrad = sCtx.createRadialGradient(12, 12, 0.5, 12, 12, 11);
  radGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  radGrad.addColorStop(0.35, 'rgba(103, 232, 249, 0.9)');
  radGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
  sCtx.fillStyle = radGrad;
  sCtx.beginPath(); sCtx.arc(12, 12, 11, 0, Math.PI * 2); sCtx.fill();

  const flakeSprite = document.createElement('canvas');
  flakeSprite.width = 40; flakeSprite.height = 40;
  const fCtx = flakeSprite.getContext('2d');
  fCtx.translate(20, 20);
  fCtx.strokeStyle = 'rgba(103, 232, 249, 0.92)';
  fCtx.shadowColor = 'rgba(0, 245, 255, 0.95)';
  fCtx.shadowBlur = 4;
  fCtx.lineWidth = 1.35;
  fCtx.beginPath();
  const rad = 12;
  for (let b = 0; b < 6; b++) {
    const ang = (b * Math.PI) / 3;
    const cos = Math.cos(ang), sin = Math.sin(ang);
    fCtx.moveTo(0, 0); fCtx.lineTo(cos * rad, sin * rad);
    const mx = cos * (rad * 0.58), my = sin * (rad * 0.58), rBr = rad * 0.34;
    fCtx.moveTo(mx, my); fCtx.lineTo(mx + Math.cos(ang + 0.55) * rBr, my + Math.sin(ang + 0.55) * rBr);
    fCtx.moveTo(mx, my); fCtx.lineTo(mx + Math.cos(ang - 0.55) * rBr, my + Math.sin(ang - 0.55) * rBr);
  }
  fCtx.stroke();

  const nbStars = isMobileScreen ? 60 : 110;
  for (let i = 0; i < nbStars; i++) {
    const br = Math.random() < 0.28;
    stars.push({
      x: Math.random() * wScreen,
      y: Math.random() * hScreen,
      size: br ? (Math.random() * 6 + 7.5) : (Math.random() * 4.5 + 4),
      a: Math.random() * 0.58 + 0.32,
      p: Math.random() * 6.28,
      s: Math.random() * 0.018 + 0.008,
      vx: (Math.random() - 0.5) * 0.14,
      vy: Math.random() * 0.24 + 0.08
    });
  }

  const nbFlakes = isMobileScreen ? 10 : 20;
  for (let i = 0; i < nbFlakes; i++) {
    flakes.push({
      x: Math.random() * wScreen,
      y: Math.random() * hScreen,
      scale: (Math.random() * 0.5 + 0.45),
      a: Math.random() * 0.42 + 0.2,
      rot: Math.random() * 6.28,
      vRot: (Math.random() - 0.5) * 0.005,
      vx: (Math.random() - 0.5) * 0.18,
      vy: Math.random() * 0.28 + 0.12
    });
  }

  let prevTime = performance.now();
  function renderFullSky(now) {
    requestAnimationFrame(renderFullSky);
    if (document.hidden) return;
    now = now || performance.now();
    const dt = Math.min(2.5, Math.max(0.1, (now - prevTime) / 16.6667));
    prevTime = now;

    bgCtx.clearRect(0, 0, wScreen, hScreen);

    for (let i = 0; i < stars.length; i++) {
      const st = stars[i];
      st.p += st.s * dt;
      st.x += st.vx * dt;
      st.y += st.vy * dt;
      if (st.y > hScreen + 12) { st.y = -12; st.x = Math.random() * wScreen; }
      if (st.x < -12) st.x = wScreen + 12;
      if (st.x > wScreen + 12) st.x = -12;
      bgCtx.globalAlpha = Math.max(0.15, Math.min(0.95, st.a + Math.sin(st.p) * 0.25));
      bgCtx.drawImage(starSprite, st.x - st.size * 0.5, st.y - st.size * 0.5, st.size, st.size);
    }

    for (let i = 0; i < flakes.length; i++) {
      const fl = flakes[i];
      fl.x += fl.vx * dt;
      fl.y += fl.vy * dt;
      fl.rot += fl.vRot * dt;
      if (fl.y > hScreen + 24) { fl.y = -24; fl.x = Math.random() * wScreen; }
      if (fl.x < -24) fl.x = wScreen + 24;
      if (fl.x > wScreen + 24) fl.x = -24;
      bgCtx.save();
      bgCtx.globalAlpha = fl.a;
      bgCtx.translate(fl.x, fl.y);
      bgCtx.rotate(fl.rot);
      const d = 32 * fl.scale;
      bgCtx.drawImage(flakeSprite, -d * 0.5, -d * 0.5, d, d);
      bgCtx.restore();
    }
    bgCtx.globalAlpha = 1;

    if (sunEl || moonEl) {
      angleOrbite += 0.0018 * dt;
      const cx = wScreen * 0.5, cy = hScreen * 0.48;
      const rx = Math.max(260, wScreen * 0.36), ry = Math.max(180, hScreen * 0.34);
      const sx = cx + Math.cos(angleOrbite) * rx, sy = cy + Math.sin(angleOrbite) * ry;
      const mx = cx + Math.cos(angleOrbite - Math.PI) * rx, my = cy + Math.sin(angleOrbite - Math.PI) * ry;
      if (sunEl) sunEl.style.transform = "translate3d(" + (sx - 55) + "px," + (sy - 55) + "px,0)";
      if (moonEl) moonEl.style.transform = "translate3d(" + (mx - 55) + "px," + (my - 55) + "px,0)";
    }
  }
  window.addEventListener('resize', resizeFullSky);
  renderFullSky(performance.now());
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
  autoCheck.checked = (localStorage.getItem('coran_auto_next') !== '0'); autoCheck.addEventListener('change', () => { try { localStorage.setItem('coran_auto_next', autoCheck.checked ? '1' : '0'); } catch(e){} }); audio.volume = 1.0;

  try {
    const sr = localStorage.getItem('reciter');
    if (sr) select.value = (sr === 'QDC_Maher_Haramain_HD') ? 'MaherAlMuaiqly128kbps' : sr;
    if (!select.value) select.selectedIndex = 0;
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

  function urlAudioVerset(code) {
    return "https://everyayah.com/data/" + select.value + "/" + code + ".mp3";
  }
  function majAudio() {
    const u = urlAudioVerset(codeAudio);
    if (audio.src !== u) audio.src = u;
    if (preloadAudio && window.SOURATE_DATA && window.SOURATE_DATA.versets[numVersetActuel]) {
      preloadAudio.src = urlAudioVerset(window.SOURATE_DATA.versets[numVersetActuel].codeAudio);
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

/* PATCH_SUIVI_LUMINOSITE_PURE_V5 */
.arabic-glow-verse span,
#arabicVerse span,
.ar-word-follow,
.ar-word,
.follow-word,
.karaoke-word,
[data-word-index],
[data-widx] {
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  padding: 0 3px !important;
  display: inline-block !important;
  transition: color 0.16s ease, text-shadow 0.16s ease, transform 0.16s ease, filter 0.16s ease !important;
}

/* Quand le mode Suivi est actif : les mots non lus s'assombrissent légèrement pour faire ressortir l'illumination du mot lu */
.arabic-glow-verse.follow-active span:not(.active):not(.speaking),
#arabicVerse.follow-active span:not(.active):not(.speaking) {
  opacity: 0.62 !important;
  filter: brightness(0.85);
}

.arabic-glow-verse span.active,
.arabic-glow-verse span.speaking,
.arabic-glow-verse span.current,
.arabic-glow-verse span.highlight,
#arabicVerse span.active,
.ar-word-follow.active,
.ar-word.active,
.follow-word.active,
.karaoke-word.active,
[data-word-index].active,
[data-widx].active {
  opacity: 1 !important;
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  color: #ffffff !important;
  filter: brightness(1.35) drop-shadow(0 0 12px rgba(56, 189, 248, 0.95)) drop-shadow(0 0 26px transparent) !important;
  text-shadow: 0 0 8px #ffffff, 0 0 18px #60a5fa, 0 0 36px #00e5ff, 0 0 65px transparent !important;
  transform: translateY(-4px) scale(1.11) !important;
}

.arabic-glow-verse span.active::after,
#arabicVerse span.active::after,
.ar-word-follow.active::after {
  display: none !important;
}


/* PATCH_FOLLOW_ULTIME_V3 */
.arabic-glow-verse span,
#arabicVerse span,
.ar-word-follow,
.ar-word,
.follow-word,
.karaoke-word {
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  border: none !important;
  border-color: transparent !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  padding: 0 2px !important;
  margin: 0 !important;
  display: inline-block !important;
  position: relative !important;
  transition: color 0.18s cubic-bezier(0.22, 1, 0.36, 1), text-shadow 0.18s cubic-bezier(0.22, 1, 0.36, 1), transform 0.18s cubic-bezier(0.22, 1, 0.36, 1) !important;
}

.arabic-glow-verse span.active,
.arabic-glow-verse span.speaking,
.arabic-glow-verse span.current,
.arabic-glow-verse span.highlight,
#arabicVerse span.active,
.ar-word-follow.active,
.ar-word.active,
.follow-word.active,
.karaoke-word.active {
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  color: #60a5fa !important;
  text-shadow: 0 0 8px #93c5fd, 0 0 20px #00e5ff, 0 0 42px #00e5ff, 0 0 70px transparent !important;
  transform: translateY(-4px) scale(1.1) !important;
}

/* Rayons lumineux subtils sous le mot actif (sans aucun carré) */
.arabic-glow-verse span.active::after,
#arabicVerse span.active::after,
.ar-word-follow.active::after {
  content: '' !important;
  position: absolute !important;
  left: 12% !important;
  right: 12% !important;
  bottom: 4px !important;
  height: 3px !important;
  border-radius: 99px !important;
  background: linear-gradient(90deg, transparent, #60a5fa, #00e5ff, #60a5fa, transparent) !important;
  box-shadow: 0 0 12px #00e5ff, 0 0 24px #00e5ff !important;
  pointer-events: none !important;
}

/* Masquage automatique de la phrase de traduction quand Mot-à-mot est actif */
body.wbw-mode-on .verse-translation,
body.wbw-mode-on #verseTranslation,
body.wbw-mode-on .translation-text,
body.wbw-mode-on .fr-verse-text {
  display: none !important;
}


.wbw-card, .wbw-item, .wbw-word {
  border-radius: 18px !important;
  background: rgba(10, 20, 35, 0.65) !important;
  border: 1px solid rgba(56, 189, 248, 0.2) !important;
  transition: all 0.2s ease !important;
}
.wbw-card.active, .wbw-item.active, .wbw-word.active {
  background: radial-gradient(circle at 50% 40%, transparent, rgba(14, 165, 233, 0.08)) !important;
  border-color: transparent !important;
  box-shadow: 0 0 22px transparent !important;
  transform: translateY(-3px) !important;
}

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
  .sun-core { width:100%; height:100%; border-radius:50%; background:radial-gradient(circle, #fff 0%, #93c5fd 38%, #00e5ff 72%, rgba(234,88,12,0) 100%); box-shadow:0 0 35px 10px rgba(253,224,71,0.85), 0 0 90px 35px transparent; }
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
  .gold-star-icon { color:#f3d078; text-shadow: 0 0 6px #ffffff, 0 0 16px #ffffff, 0 0 32px rgba(255, 255, 255, 0.95), 0 0 55px rgba(255, 255, 255, 0.8); font-size:1.02em; }
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
      background: radial-gradient(ellipse at 50% 40%, rgba(14, 165, 233, 0.22) 0%, rgba(4, 12, 24, 0.72) 65%, rgba(4, 8, 14, 0.85) 100%);
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

    .arabic-glow-verse { position:relative; z-index:2; font-family:'Scheherazade New','Amiri',serif; font-size:2.9rem; line-height:2.15; direction:rtl; margin-bottom:22px; color:#f0f9ff; text-shadow:0 0 6px rgba(125,211,252,0.98), 0 0 16px #38bdf8, 0 0 34px #0ea5e9, 0 0 62px rgba(2,132,199,0.88), 0 2px 6px rgba(0,0,0,0.95); transition:font-size 0.15s ease; }
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
    .btn-listen-sync, .btn-replay-sync { display:inline-flex; align-items:center; gap:8px; border-radius:999px; font-family:inherit; font-weight:800; font-size:0.9rem; cursor:pointer; transition:transform 0.15s, box-shadow 0.2s, filter 0.2s, background 0.2s; -webkit-tap-highlight-color:transparent; }
    .btn-listen-sync { background:linear-gradient(135deg,#0ea5e9,#38bdf8); color:#021019; border:0; padding:10px 22px; box-shadow:0 6px 18px rgba(14,165,233,0.35); }
    .btn-listen-sync:hover { transform:translateY(-1px); filter:brightness(1.08); box-shadow:0 8px 22px rgba(56,189,248,0.5); }
    .btn-listen-sync.active { background:linear-gradient(135deg,#60a5fa,#00e5ff); color:#1a1300; box-shadow:0 6px 22px rgba(253,224,71,0.4); }
    .btn-replay-sync { background:rgba(56,189,248,0.12); color:var(--sky-light); border:1px solid rgba(56,189,248,0.4); padding:9px 18px; }
    .btn-replay-sync:hover { background:rgba(56,189,248,0.28); transform:translateY(-1px); }
    .btn-listen-sync:active, .btn-replay-sync:active { transform:scale(0.96); }
        .reciter-mini { display:none !important; }
    .rp { position:relative; }
    .rp-btn { display:flex; align-items:center; gap:10px; background:linear-gradient(145deg,rgba(14,165,233,0.16),rgba(8,13,18,0.85)); color:#fff; border:1px solid rgba(56,189,248,0.4); padding:6px 12px 6px 6px; border-radius:999px; font:inherit; font-weight:700; font-size:0.86rem; cursor:pointer; transition:border-color 0.15s, box-shadow 0.15s; max-width:100%; }
    .rp-btn:hover, .rp-btn[aria-expanded="true"] { border-color:#38bdf8; box-shadow:0 0 18px rgba(56,189,248,0.3); }
    .rp-av { flex:none; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.95rem; color:#04121f; background:linear-gradient(135deg,var(--c1),var(--c2)); }
    .rp-txt { display:flex; flex-direction:column; align-items:flex-start; line-height:1.15; text-align:left; min-width:0; }
    .rp-name { font-size:0.86rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .rp-sub { font-size:0.68rem; font-weight:600; color:#7dd3fc; }
    .rp-chev { font-size:0.7rem; color:#7dd3fc; transition:transform 0.2s; }
    .rp-btn[aria-expanded="true"] .rp-chev { transform:rotate(180deg); }
    .rp-panel { position:absolute; top:calc(100% + 8px); left:0; z-index:80; width:min(360px,88vw); max-height:min(420px,60vh); overflow-y:auto; padding:8px; border-radius:18px; background:rgba(6,12,20,0.97); border:1px solid rgba(56,189,248,0.35); box-shadow:0 18px 48px rgba(0,0,0,0.7); display:none; overscroll-behavior:contain; }
    .rp-panel.open { display:block; animation:rpIn 0.16s ease-out; }
    @keyframes rpIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:none; } }
    .rp-item { width:100%; display:flex; align-items:center; gap:12px; padding:8px 10px; border:1px solid transparent; border-radius:14px; background:none; color:#e2e8f0; font:inherit; cursor:pointer; text-align:left; transition:background 0.12s, border-color 0.12s; }
    .rp-item:hover, .rp-item:focus-visible { background:rgba(56,189,248,0.12); border-color:rgba(56,189,248,0.3); outline:none; }
    .rp-item.sel { background:linear-gradient(145deg,transparent,rgba(14,165,233,0.1)); border-color:rgba(253,224,71,0.5); }
    .rp-item .rp-av { width:38px; height:38px; }
    .rp-ck { margin-left:auto; color:#60a5fa; font-weight:800; }
    .rp-av { position:relative; overflow:hidden; }
    .rp-av img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; border-radius:50%; }

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
    
    
    
    
    
    
    
    
    .btn-wbw-toggle { background:rgba(14,165,233,0.14); color:var(--sky-light); border:1px solid rgba(56,189,248,0.4); padding:6px 13px; border-radius:11px; font-family:inherit; font-size:0.81rem; font-weight:800; cursor:pointer; transition:0.22s; }
    .btn-wbw-toggle:hover, .btn-wbw-toggle.active { background:var(--sky-bright); color:#021019; box-shadow:0 0 16px rgba(56,189,248,0.48); }
    .brown-noise-group { display:inline-flex; align-items:center; gap:6px; background:rgba(6,12,20,0.65); border:1px solid rgba(56,189,248,0.28); padding:3px 6px; border-radius:13px; }
    .brown-vol-box { display:inline-flex; align-items:center; gap:5px; padding:0 4px; }
    .btn-brown-vol { background:rgba(56,189,248,0.15); color:var(--sky-light); border:1px solid rgba(56,189,248,0.35); width:24px; height:24px; border-radius:7px; font-weight:800; font-size:0.9rem; line-height:1; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; transition:0.18s; }
    .btn-brown-vol:hover { background:var(--sky-bright); color:#021019; }
    .brown-vol-slider { width:68px; height:5px; accent-color:#38bdf8; cursor:pointer; }
    .inline-clickable-word::after, .wbw-word-box::after { display:none !important; }
    .wbw-word-box { position:relative; }
    .inline-clickable-word { position:relative; display:inline-block; padding:2px 8px; border-radius:12px; cursor:pointer; transition:all 0.2s cubic-bezier(0.16,1,0.3,1); border:1px solid transparent; }
    .inline-clickable-word:hover { background:rgba(56,189,248,0.15); transform:translateY(-2px); }
    .inline-clickable-word.playing { color:#60a5fa !important; background:linear-gradient(135deg, transparent, rgba(56,189,248,0.16)) !important; border-color:rgba(253,224,71,0.68) !important; box-shadow:0 8px 24px rgba(0,0,0,0.65), 0 0 22px rgba(253,224,71,0.45) !important; text-shadow: 0 0 6px #ffffff, 0 0 16px #ffffff, 0 0 32px rgba(255, 255, 255, 0.95), 0 0 55px rgba(255, 255, 255, 0.8); transform:translateY(-4px) scale(1.07) !important; z-index:5; }
    .wbw-stage-grid { position:relative; z-index:2; display:flex; flex-wrap:wrap; direction:rtl; justify-content:center; align-items:stretch; gap:14px 16px; margin-bottom:26px; padding:10px 6px; }
    .wbw-word-box { display:flex; flex-direction:column; align-items:center; justify-content:space-between; background:linear-gradient(145deg, rgba(12,22,35,0.88), rgba(6,12,20,0.94)); border:1.5px solid rgba(56,189,248,0.28); border-radius:18px; padding:12px 14px; min-width:96px; cursor:pointer; transition:transform 0.18s, border-color 0.18s, background 0.18s, box-shadow 0.18s; -webkit-tap-highlight-color:transparent; box-shadow:0 8px 24px rgba(0,0,0,0.45), inset 0 0 12px rgba(56,189,248,0.04); }
    .wbw-word-box:hover { transform:translateY(-4px); border-color:var(--sky-bright); background:linear-gradient(145deg, rgba(14,165,233,0.18), rgba(8,16,26,0.96)); box-shadow:0 12px 28px rgba(0,0,0,0.6), 0 0 20px rgba(56,189,248,0.32); }
    .wbw-word-box.playing { z-index:5; border-color:#60a5fa !important; background:linear-gradient(145deg, transparent, rgba(14,165,233,0.18)) !important; box-shadow:0 14px 32px rgba(0,0,0,0.75), 0 0 26px rgba(253,224,71,0.5) !important; transform:translateY(-6px) scale(1.04) !important; }
    .wbw-word-box.playing .wbw-ar { font-family:'Scheherazade New','Amiri',serif; font-size:2.3rem; line-height:1.55; color:#f0f9ff; text-shadow:0 0 6px rgba(125,211,252,0.95), 0 0 15px #38bdf8, 0 0 30px rgba(14,165,233,0.85); margin-bottom:8px; text-align:center; transition:color 0.12s, text-shadow 0.12s; }
    .wbw-word-box.playing .wbw-tr { color:#93c5fd !important; border-top-color:rgba(253,224,71,0.4) !important; }
    .wbw-ar { font-family:'Scheherazade New','Amiri',serif; font-size:2.3rem; line-height:1.55; color:#f0f9ff; text-shadow:0 0 6px rgba(125,211,252,0.95), 0 0 15px #38bdf8, 0 0 30px rgba(14,165,233,0.85); margin-bottom:8px; text-align:center; transition:color 0.12s, text-shadow 0.12s; }
    .wbw-tr { font-family:'Plus Jakarta Sans',sans-serif; font-size:0.82rem; font-weight:700; color:#bae6fd; direction:ltr; text-align:center; max-width:160px; line-height:1.35; border-top:1px solid rgba(56,189,248,0.22); padding-top:8px; width:100%; transition:color 0.12s; }

    tajweed, .tajweed { font-family:inherit; pointer-events:none; }
    tajweed[class*="ghunnah"], tajweed[class*="ikhf"], tajweed[class*="iqlab"], .ghunnah, .ikhafa, .ikhafa_shafawi, .iqlab { color:#4ade80 !important; text-shadow:0 0 10px rgba(74,222,128,0.4); }
    tajweed[class*="qalq"], tajweed[class*="qalaq"], .qalaqah, .qalqalah { color:#38bdf8 !important; text-shadow:0 0 10px rgba(56,189,248,0.45); }
    tajweed[class*="madd"], .madda_normal, .madda_permissible, .madda_necessary, .madda_obligatory { color:#f87171 !important; text-shadow:0 0 12px rgba(248,113,113,0.45); }
    tajweed[class*="idgham"], tajweed[class*="laam_shams"], tajweed[class*="tafkh"], .idgham_ghunnah, .idgham_wo_ghunnah, .idgham_shafawi, .laam_shamsiyah { color:#fbbf24 !important; text-shadow: 0 0 6px #ffffff, 0 0 16px #ffffff, 0 0 32px rgba(255, 255, 255, 0.95), 0 0 55px rgba(255, 255, 255, 0.8); }
    tajweed[class*="ham_wasl"], tajweed[class*="slnt"], .ham_wasl, .slnt { color:#64748b !important; text-shadow:none !important; }

    .tajweed-legend-bar { width:100%; display:flex; flex-wrap:wrap; justify-content:center; gap:14px; margin-top:4px; padding:8px 14px; background:rgba(4,9,16,0.65); border-top:1px solid rgba(56,189,248,0.18); border-radius:10px; font-size:0.74rem; font-weight:700; color:#cbd5e1; }
    .tajweed-legend-bar span { display:inline-flex; align-items:center; gap:6px; }
    .tajweed-legend-bar b { font-weight:700; }
    .tajweed-legend-bar i { width:9px; height:9px; border-radius:50%; display:inline-block; }
    .taj-tooltip { position:relative; cursor:help; padding:2px 6px; border-radius:6px; transition:0.15s; }
    .taj-tooltip:hover { background:rgba(56,189,248,0.14); color:#fff; }
    .taj-tooltip:hover::after { content:attr(data-title); position:absolute; bottom:135%; left:50%; transform:translateX(-50%); background:rgba(4,10,20,0.96); color:#bae6fd; padding:8px 12px; border-radius:10px; border:1px solid rgba(56,189,248,0.5); font-size:0.74rem; width:max-content; max-width:240px; white-space:normal; text-align:center; line-height:1.35; box-shadow:0 10px 25px rgba(0,0,0,0.85); z-index:50; pointer-events:none; font-weight:700; }
    .wbw-modal-backdrop { position:fixed; inset:0; background:rgba(0,0,0,0.72); backdrop-filter:blur(6px); z-index:9999; display:none; align-items:center; justify-content:center; padding:16px; }
    .wbw-modal-backdrop.open { display:flex; }
    .wbw-modal-sheet { width:100%; max-width:480px; background:#12151a; border:1px solid rgba(56,189,248,0.35); border-radius:24px; padding:22px; color:#fff; box-shadow:0 15px 50px rgba(0,0,0,0.88); }
    .wbw-sheet-handle { width:42px; height:4px; background:rgba(255,255,255,0.2); border-radius:99px; margin:0 auto 12px auto; }
    .wbw-sheet-ref { text-align:center; font-weight:800; font-size:0.95rem; color:#e2e8f0; margin-bottom:16px; }
    .wbw-sheet-inner { background:#181c22; border:1px solid rgba(255,255,255,0.1); border-radius:18px; padding:18px; }
    .wbw-pos-tags { display:flex; align-items:center; justify-content:flex-start; gap:10px; font-size:0.82rem; font-weight:700; color:#cbd5e1; margin-bottom:12px; }
    .wbw-pos-dot { width:9px; height:9px; border-radius:50%; background:#00e5ff; display:inline-block; margin-right:5px; }
    .wbw-big-word-card { background:#232218; border:1px solid transparent; border-radius:14px; padding:12px 26px; width:fit-content; margin:0 auto 14px auto; font-family:'Scheherazade New','Amiri',serif; font-size:3rem; color:#60a5fa; text-align:center; line-height:1.4; }
    .wbw-big-trans { font-size:1.22rem; font-weight:800; color:#fff; margin-bottom:18px; text-align:center; }
    .wbw-morph-row { display:grid; grid-template-columns:1fr 1fr auto; gap:10px; align-items:end; }
    .wbw-morph-col label { display:block; font-size:0.75rem; color:#94a3b8; margin-bottom:6px; font-weight:600; }
    .wbw-morph-pill { background:#232730; border:1px solid rgba(255,255,255,0.08); border-radius:99px; padding:9px 14px; text-align:center; font-family:'Scheherazade New','Amiri',serif; font-size:1.35rem; color:#fff; min-height:44px; display:flex; align-items:center; justify-content:center; }
    .wbw-audio-circle { width:46px; height:46px; border-radius:50%; background:#262b35; border:1px solid rgba(56,189,248,0.45); color:#fff; font-size:1.15rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:0.2s; }
    .wbw-audio-circle:hover { background:var(--sky-bright); color:#021019; }
    .wbw-cancel-btn { width:100%; margin-top:14px; background:transparent; border:none; color:#cbd5e1; font-weight:700; font-size:0.95rem; padding:10px; cursor:pointer; }
    .wbw-cancel-btn:hover { color:#fff; }

    @media (max-width:768px) {
      body { padding:10px 8px 36px 8px; }
      .panel { padding:18px 12px; }
      .verse-stage { padding:28px 16px 16px 16px; }
      .arabic-glow-verse { position:relative; z-index:2; font-family:'Scheherazade New','Amiri',serif; font-size:2.9rem; line-height:2.15; direction:rtl; margin-bottom:22px; color:#f0f9ff; text-shadow:0 0 6px rgba(125,211,252,0.98), 0 0 16px #38bdf8, 0 0 34px #0ea5e9, 0 0 62px rgba(2,132,199,0.88), 0 2px 6px rgba(0,0,0,0.95); transition:font-size 0.15s ease; }
      .french-glow-verse { font-size:1.25rem; }
      .arabic-surah { display:none; }
      .btn-listen-sync, .btn-replay-sync, .btn-blue-nav { white-space:nowrap; }
      .stage-blue-nav { flex-wrap:wrap; justify-content:center; gap:10px; }
      .stage-blue-nav > div { order:-1; width:100%; display:flex; justify-content:center; flex-wrap:wrap; gap:8px; margin-bottom:4px; }
      .stage-blue-nav > a.btn-blue-nav { flex:1; text-align:center; justify-content:center; }
      .btn-listen-sync { padding:10px 18px; font-size:0.86rem; }
      .btn-replay-sync { padding:9px 14px; font-size:0.84rem; }
    }
  </style>
















<style id="style-refs-cliquables">
.tafsir-ref-link {
  color: #38bdf8 !important;
  background: rgba(56, 189, 248, 0.12) !important;
  border: 1px solid rgba(56, 189, 248, 0.35) !important;
  padding: 1px 6px !important;
  border-radius: 6px !important;
  text-decoration: none !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.18s ease !important;
  display: inline-block !important;
}
.tafsir-ref-link:hover {
  background: rgba(56, 189, 248, 0.28) !important;
  color: #ffffff !important;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.5) !important;
  transform: translateY(-1px) !important;
}
</style>
<script id="script-refs-cliquables">
(function(){
  window.allerAuVerset = function(numVerset) {
    var sel = document.querySelector('select');
    if (sel) {
      for (var i = 0; i < sel.options.length; i++) {
        var optTxt = sel.options[i].textContent || '';
        var m = optTxt.match(/(\d+)/);
        if (m && parseInt(m[1], 10) === numVerset) {
          sel.selectedIndex = i;
          sel.dispatchEvent(new Event('change', { bubbles: true }));
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
    }
  };

  function rendreReferencesCliquables() {
    var blocs = document.querySelectorAll('.tafsir-box, .tafsir-content, #tafsirContent, [class*="tafsir"]');
    for (var i = 0; i < blocs.length; i++) {
      var el = blocs[i];
      if (el.dataset.refsReady === '1' || el.querySelector('button, select')) continue;
      var html = el.innerHTML;
      if (!html) continue;

      // Transformer (v.4) ou (v.10-12) ou (آية 4) en bouton qui change directement le verset de la sourate actuelle
      var nvHtml = html.replace(/\b(v\.|verset\s+|aleya\s+|آية\s*)(\d+)(?:\s*[–\-]\s*\d+)?/gi, function(match, prefix, num) {
        return '<span class="tafsir-ref-link" onclick="window.allerAuVerset(' + num + ')" title="Aller directement au verset ' + num + '">' + match + '</span>';
      });

      if (nvHtml !== html) {
        el.innerHTML = nvHtml;
      }
      el.dataset.refsReady = '1';
    }
  }

  document.addEventListener('click', function(){ setTimeout(rendreReferencesCliquables, 40); });
  document.addEventListener('change', function(){ setTimeout(rendreReferencesCliquables, 40); });
  window.addEventListener('DOMContentLoaded', rendreReferencesCliquables);
  setInterval(rendreReferencesCliquables, 250);
})();
</script>








<link rel="preconnect" href="[https://api.quran.com](https://api.quran.com)" crossorigin>
<link rel="preconnect" href="[https://api.qurancdn.com](https://api.qurancdn.com)" crossorigin>
<link rel="preconnect" href="[https://everyayah.com](https://everyayah.com)" crossorigin>

<link rel="preconnect" href="[https://api.quran.com](https://api.quran.com)" crossorigin>
<link rel="preconnect" href="[https://api.qurancdn.com](https://api.qurancdn.com)" crossorigin>
<link rel="preconnect" href="[https://everyayah.com](https://everyayah.com)" crossorigin>

<meta name="yandex-verification" content="9ed8551291c4ae1e">
<link rel="preconnect" href="https://api.quran.com" crossorigin>
<link rel="preconnect" href="https://api.qurancdn.com" crossorigin>
<link rel="preconnect" href="https://everyayah.com" crossorigin>
<link rel="preconnect" href="https://translate.googleapis.com" crossorigin>
<style id="patch-master-v77">
:root {
  --wbw-ar-size: 2.15rem;
  --wbw-tr-size: 0.92rem;
  --wbw-pad-v: 14px;
  --wbw-pad-h: 18px;
  --wbw-min-w: 92px;
}

/* 1. SOLEIL DORÉ PUR 150px EN ARRIÈRE-PLAN (Z-INDEX 0 POUR CONTRASTE > 4.5:1) */
html body #flatEarthSun,
html body .flat-earth-sun,
html body [id*="sun" i]:not([id*="sound" i]),
html body [class*="sun" i]:not([class*="sound" i]),
html body [data-astre-role="sun"],
html body .astre-soleil-pur-v77 {
  width: 150px !important;
  height: 150px !important;
  min-width: 150px !important;
  min-height: 150px !important;
  max-width: 150px !important;
  max-height: 150px !important;
  border-radius: 50% !important;
  border: none !important;
  outline: none !important;
  background: radial-gradient(circle at 50% 50%, #ffffff 0%, #fffef0 26%, #fef08a 52%, #facc15 76%, #f59e0b 94%, rgba(245, 158, 11, 0) 100%) !important;
  background-image: radial-gradient(circle at 50% 50%, #ffffff 0%, #fffef0 26%, #fef08a 52%, #facc15 76%, #f59e0b 94%, rgba(245, 158, 11, 0) 100%) !important;
  background-color: #fde047 !important;
  box-shadow: 0 0 45px 14px rgba(253, 224, 71, 0.55), 0 0 95px 30px rgba(245, 158, 11, 0.30) !important;
  filter: none !important;
  backdrop-filter: none !important;
  mix-blend-mode: normal !important;
  will-change: transform !important;
  z-index: 0 !important;
  pointer-events: none !important;
  opacity: 0.72 !important;
}
html body #flatEarthSun::before, html body #flatEarthSun::after,
html body .flat-earth-sun::before, html body .flat-earth-sun::after,
html body .astre-soleil-pur-v77::before, html body .astre-soleil-pur-v77::after,
html body #flatEarthSun *, html body .flat-earth-sun *, html body .astre-soleil-pur-v77 * {
  display: none !important; content: none !important; background: none !important; box-shadow: none !important; opacity: 0 !important;
}

/* 2. LUNE BLANCHE PURE 150px EN ARRIÈRE-PLAN (Z-INDEX 0 POUR CONTRASTE > 4.5:1) */
html body #flatEarthMoon,
html body .flat-earth-moon,
html body [id*="moon" i],
html body [class*="moon" i],
html body [data-astre-role="moon"],
html body .astre-lune-pure-v77 {
  width: 150px !important;
  height: 150px !important;
  min-width: 150px !important;
  min-height: 150px !important;
  max-width: 150px !important;
  max-height: 150px !important;
  border-radius: 50% !important;
  border: none !important;
  outline: none !important;
  background: radial-gradient(circle at 50% 50%, #ffffff 0%, #f8fafc 38%, #e2e8f0 70%, rgba(186, 230, 253, 0) 100%) !important;
  background-image: radial-gradient(circle at 50% 50%, #ffffff 0%, #f8fafc 38%, #e2e8f0 70%, rgba(186, 230, 253, 0) 100%) !important;
  background-color: #ffffff !important;
  box-shadow: 0 0 40px 12px rgba(255, 255, 255, 0.50), 0 0 85px 28px rgba(148, 163, 184, 0.25) !important;
  filter: none !important;
  backdrop-filter: none !important;
  mix-blend-mode: normal !important;
  will-change: transform !important;
  z-index: 0 !important;
  pointer-events: none !important;
  opacity: 0.72 !important;
}
html body #flatEarthMoon::before, html body #flatEarthMoon::after,
html body .flat-earth-moon::before, html body .flat-earth-moon::after,
html body .astre-lune-pure-v77::before, html body .astre-lune-pure-v77::after,
html body #flatEarthMoon *, html body .flat-earth-moon *, html body .astre-lune-pure-v77 * {
  display: none !important; content: none !important; background: none !important; box-shadow: none !important; opacity: 0 !important;
}

/* PANNEAUX ET CARTES OPAQUES AU PREMIER PLAN */
html body a[href*="sourate-"],
html body input[type="text"],
html body input[type="search"],
html body input:not([type]),
html body .panneau-opaque-v77 {
  background-color: rgba(4, 11, 22, 0.92) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  position: relative !important;
  z-index: 2 !important;
}

/* 3. MASQUAGE DE MAHER AL-MUAIQLY, BOUTON REPRENDRE DOUBLON & TRADUCTION DU BAS EN MOT-À-MOT */
html body img[src*="maher" i],
html body [data-reciter*="maher" i],
html body .maher-supprime-v77,
html body .wbw-masquer-traduction-bas,
html body .khatm-doublon-reprendre-masque {
  display: none !important; visibility: hidden !important; height: 0 !important; max-height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; overflow: hidden !important; opacity: 0 !important; pointer-events: none !important;
}

/* 4. BANDEAU & CARTES MOT-À-MOT */
html body #wbwSensLectureBanner {
  width: 100% !important; text-align: center !important; font-size: 0.78rem !important; letter-spacing: 0.04em !important; color: #38bdf8 !important; margin-bottom: 10px !important; opacity: 0.92 !important; font-weight: 500 !important; direction: ltr !important; cursor: pointer !important; user-select: none !important;
}
html body .wbw-card-unit {
  position: relative !important; padding: var(--wbw-pad-v) var(--wbw-pad-h) !important; min-width: var(--wbw-min-w) !important; border-radius: 18px !important; transform-origin: 50% 80% !important; will-change: transform, opacity, box-shadow, border-color !important; backface-visibility: hidden !important;
}
html body .wbw-card-unit::before {
  content: attr(data-word-num); position: absolute !important; top: 5px !important; right: 8px !important; font-size: 0.65rem !important; font-weight: 700 !important; color: rgba(56, 189, 248, 0.75) !important; line-height: 1 !important; pointer-events: none !important;
}
html body .wbw-card-unit > *:first-child {
  font-size: var(--wbw-ar-size) !important; line-height: 1.45 !important; direction: rtl !important; text-align: center !important;
}
html body .wbw-card-unit > *:first-child::before { content: none !important; display: none !important; }
html body .wbw-card-unit > *:last-child {
  font-size: var(--wbw-tr-size) !important; direction: ltr !important; text-align: center !important;
}

/* 5. MODE SUIVI VERSET : BLANC TAMISÉ (78%) AU REPOS -> 100% LUMINEUX + BLEU NÉON À LA LECTURE */
html body #arabicVerse, html body .arabic-glow-verse {
  direction: rtl !important;
  color: rgba(255, 255, 255, 0.78) !important;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.14) !important;
}
html body .verse-stage .arabic-glow-verse span,
html body .verse-stage #arabicVerse span,
html body .ar-word-follow,
html body .follow-word {
  position: relative !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: rgba(255, 255, 255, 0.78) !important;
  opacity: 0.78 !important;
  padding: 0 7px !important;
  display: inline-block !important;
  transform-origin: 50% 85% !important;
  will-change: transform, opacity, filter, text-shadow, color !important;
  backface-visibility: hidden !important;
  -webkit-font-smoothing: antialiased !important;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.14) !important;
}

/* 6. BOUTONS DE LANGUE ÉTENDUS (DE, IT, ID, RU) AVEC DRAPEAUX IPHONE EXACTS */
html body #btnLangDeV77,
html body #btnLangItV77,
html body #btnLangIdV77,
html body #btnLangRuV77 {
  cursor: pointer !important; transition: all 0.2s ease !important; display: inline-flex !important; align-items: center !important; justify-content: center !important;
}
html body #btnLangDeV77.active-ext-v77,
html body #btnLangItV77.active-ext-v77,
html body #btnLangIdV77.active-ext-v77,
html body #btnLangRuV77.active-ext-v77 {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.28), rgba(56, 189, 248, 0.18)) !important;
  border: 1px solid #38bdf8 !important; color: #ffffff !important; border-radius: 999px !important;
}

/* 7. PLANIFICATEUR KHATM ULTRA-COMPACT (STYLE SÉLECTEUR RÉCITATEUR) */
#khatmPlannerWidgetV77 {
  width: 100% !important;
  box-sizing: border-box !important;
  margin: 12px auto 0 auto !important;
  padding: 12px 10px 4px 10px !important;
  border-top: 1px solid rgba(56, 189, 248, 0.16) !important;
  background: transparent !important;
  color: #f8fafc !important;
  font-family: system-ui, -apple-system, sans-serif !important;
  position: relative !important;
  z-index: 10 !important;
  text-align: center !important;
}
.khatm-compact-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.khatm-reciter-select {
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  background-color: rgba(8, 22, 42, 0.92) !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%2338bdf8' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E") !important;
  background-repeat: no-repeat !important;
  background-position: right 11px center !important;
  background-size: 9px 6px !important;
  border: 1px solid rgba(56, 189, 248, 0.38) !important;
  color: #f1f5f9 !important;
  padding: 6px 28px 6px 13px !important;
  border-radius: 999px !important;
  font-size: 0.77rem !important;
  font-weight: 600 !important;
  outline: none !important;
  cursor: pointer !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35), inset 0 0 8px rgba(56, 189, 248, 0.06) !important;
  transition: all 0.18s ease !important;
}
[dir="rtl"] .khatm-reciter-select,
#khatmPlannerWidgetV77[style*="rtl"] .khatm-reciter-select {
  background-position: left 11px center !important;
  padding: 6px 13px 6px 28px !important;
}
.khatm-reciter-select:hover {
  border-color: #38bdf8 !important;
  background-color: rgba(14, 34, 64, 0.96) !important;
  color: #ffffff !important;
}
.khatm-reciter-select option {
  background-color: #06101e !important;
  color: #f8fafc !important;
}
.khatm-btn-green-compact {
  background: rgba(6, 46, 36, 0.75) !important;
  border: 1px solid rgba(16, 185, 129, 0.55) !important;
  color: #34d399 !important;
  padding: 6px 14px !important;
  border-radius: 999px !important;
  font-size: 0.77rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  text-decoration: none !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.12) !important;
  transition: all 0.18s ease !important;
}
.khatm-btn-green-compact:hover {
  background: rgba(16, 185, 129, 0.28) !important;
  color: #ffffff !important;
  border-color: #6ee7b7 !important;
}
.khatm-btn-cyan-compact {
  background: rgba(8, 25, 48, 0.82) !important;
  border: 1px solid rgba(56, 189, 248, 0.48) !important;
  color: #38bdf8 !important;
  padding: 6px 13px !important;
  border-radius: 999px !important;
  font-size: 0.76rem !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  text-decoration: none !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  transition: all 0.18s ease !important;
}
.khatm-btn-cyan-compact:hover {
  background: rgba(14, 165, 233, 0.28) !important;
  color: #ffffff !important;
  border-color: #7dd3fc !important;
}
.khatm-btn-reset-mini {
  background: rgba(30, 10, 18, 0.65) !important;
  border: 1px solid rgba(248, 113, 113, 0.35) !important;
  color: #fca5a5 !important;
  padding: 5px 10px !important;
  border-radius: 999px !important;
  font-size: 0.74rem !important;
  font-weight: 600 !important;
  cursor: pointer !important;
}
.khatm-btn-reset-mini:hover {
  background: rgba(239, 68, 68, 0.28) !important;
  color: #ffffff !important;
}
.khatm-mini-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 7px;
  font-size: 0.73rem;
  color: #cbd5e1;
}
.khatm-mini-bar-wrap {
  width: 140px;
  height: 5px;
  background: rgba(15, 23, 42, 0.95);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid rgba(56, 189, 248, 0.25);
}
.khatm-mini-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #38bdf8, #2dd4bf, #fde047);
  border-radius: 999px;
  transition: width 0.3s ease;
}
</style>
<script id="script-master-v77">(function codeClientV77() {
  var LANGUES_EXT_SUPPORTEES = { de: 27, it: 153, id: 33, ru: 45 };
  var TOUTES_LANGUES_8 = { fr: true, en: true, es: true, ar: true, de: true, it: true, id: true, ru: true };
  var langExtActive = "";
  var langueNativeCible = "";
  var IgnoreClicInterneFr = false;

  try {
    var oldIds = ["khatmPlannerWidgetV66", "khatmPlannerWidgetV67", "khatmPlannerWidgetV68", "khatmPlannerWidgetV69", "khatmPlannerWidgetV70", "khatmPlannerWidgetV73", "khatmPlannerWidgetV75", "khatmPlannerWidgetV76"];
    for (var w = 0; w < oldIds.length; w++) {
      var elOld = document.getElementById(oldIds[w]);
      if (elOld && elOld.parentNode) elOld.parentNode.removeChild(elOld);
    }

    var urlParams = new URLSearchParams(window.location.search);
    var pLang = (urlParams.get("lang") || "").split("-")[0].toLowerCase();

    if (pLang && TOUTES_LANGUES_8[pLang]) {
      localStorage.setItem("corantafsir_user_lang_v77", pLang);
      if (LANGUES_EXT_SUPPORTEES[pLang]) {
        langExtActive = pLang;
        localStorage.setItem("corantafsir_lang_ext_v77", pLang);
      } else {
        langExtActive = "";
        langueNativeCible = pLang;
        localStorage.setItem("corantafsir_lang_ext_v77", "native");
      }
    } else {
      var estRobotSeo = /bot|googlebot|crawler|spider|yandex|bingbot|slurp|duckduckbot|baiduspider|lighthouse/i.test(navigator.userAgent || "");
      if (!estRobotSeo && localStorage.getItem("corantafsir_manual_click_v77") === "1") {
        var savedManual = localStorage.getItem("corantafsir_user_lang_v77") || "fr";
        if (LANGUES_EXT_SUPPORTEES[savedManual]) {
          langExtActive = savedManual;
        } else if (TOUTES_LANGUES_8[savedManual] && savedManual !== "fr") {
          langExtActive = "";
          langueNativeCible = savedManual;
        }
      }
    }
  } catch (e) {}

  function synchroniserUrlEtSeoAvecLangueEtVerset() {
    try {
      var lang = obtenirLangueActive();
      var vk = obtenirCleVerset();
      var parts = vk ? vk.split(":") : [];
      var numS = parts.length === 2 ? Number(parts[0]) : 0;
      var numV = parts.length === 2 ? Number(parts[1]) : 0;

      if (document.documentElement) {
        if (document.documentElement.getAttribute("lang") !== lang) {
          document.documentElement.setAttribute("lang", lang);
        }
        var dirAttendu = lang === "ar" ? "rtl" : "ltr";
        if (document.documentElement.getAttribute("dir") !== dirAttendu) {
          document.documentElement.setAttribute("dir", dirAttendu);
        }
      }

      var pathBase = (numS && numV) ? ("/sourate-" + numS + "-verset-" + numV + ".html") : "/";
      var urlBaseFr = "https://corantafsir.com" + pathBase;
      var urlCanoniqueLang = lang === "fr" ? urlBaseFr : (urlBaseFr + "?lang=" + lang);

      var linkCanon = document.querySelector("link[rel='canonical']");
      if (!linkCanon) {
        linkCanon = document.createElement("link");
        linkCanon.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanon);
      }
      if (linkCanon.getAttribute("href") !== urlCanoniqueLang) {
        linkCanon.setAttribute("href", urlCanoniqueLang);
      }

      var languesSeo = ["fr", "en", "es", "ar", "de", "it", "id", "ru"];
      for (var l = 0; l < languesSeo.length; l++) {
        var codeL = languesSeo[l];
        var linkAlt = document.querySelector("link[rel='alternate'][hreflang='" + codeL + "']");
        if (!linkAlt) {
          linkAlt = document.createElement("link");
          linkAlt.setAttribute("rel", "alternate");
          linkAlt.setAttribute("hreflang", codeL);
          document.head.appendChild(linkAlt);
        }
        var hrefAlt = codeL === "fr" ? urlBaseFr : (urlBaseFr + "?lang=" + codeL);
        if (linkAlt.getAttribute("href") !== hrefAlt) {
          linkAlt.setAttribute("href", hrefAlt);
        }
      }
      var linkXDef = document.querySelector("link[rel='alternate'][hreflang='x-default']");
      if (!linkXDef) {
        linkXDef = document.createElement("link");
        linkXDef.setAttribute("rel", "alternate");
        linkXDef.setAttribute("hreflang", "x-default");
        document.head.appendChild(linkXDef);
      }
      if (linkXDef.getAttribute("href") !== urlBaseFr) {
        linkXDef.setAttribute("href", urlBaseFr);
      }

      // Mettre à jour les liens internes vers les sourates pour conserver ?lang=xx
      var liensInternes = document.querySelectorAll("a[href*='sourate-'], a[href*='index.html']");
      for (var aIdx = 0; aIdx < liensInternes.length; aIdx++) {
        var aEl = liensInternes[aIdx];
        if (aEl.closest("#khatmPlannerWidgetV77")) continue;
        var rawHref = aEl.getAttribute("href") || "";
        var baseHref = rawHref.split("?")[0];
        var nvHref = lang === "fr" ? baseHref : (baseHref + "?lang=" + lang);
        if (rawHref !== nvHref) aEl.setAttribute("href", nvHref);
      }

      if (window.location.protocol === "http:" || window.location.protocol === "https:") {
        var sp = new URLSearchParams(window.location.search);
        if (lang === "fr") {
          sp.delete("lang");
        } else {
          sp.set("lang", lang);
        }
        sp.delete("khatm_verse");
        var qs = sp.toString();
        var nouvelleUrlRelative = pathBase + (qs ? "?" + qs : "");
        if (window.location.pathname + window.location.search !== nouvelleUrlRelative) {
          window.history.replaceState(null, "", nouvelleUrlRelative);
        }
      }

      var nomS = (numS && NOMS_SOURATES_COURT[numS]) ? NOMS_SOURATES_COURT[numS] : "";
      var TITRES_META_I18N = {
        fr: numS ? ("Sourate " + nomS + " (" + numS + ":" + numV + ") — Coran, Audio, Mot à Mot & Tafsīr") : "Le Noble Coran & Tafsīr Al-Mukhtasar — Audio, Tajwīd & Mot à Mot (8 Langues)",
        en: numS ? ("Surah " + nomS + " (" + numS + ":" + numV + ") — Noble Quran, Audio, Word by Word & Tafsīr") : "The Noble Quran & Tafsīr Al-Mukhtasar — Audio, Tajwīd & Word by Word (8 Languages)",
        es: numS ? ("Sura " + nomS + " (" + numS + ":" + numV + ") — El Noble Corán, Audio, Palabra por Palabra y Tafsīr") : "El Noble Corán y Tafsīr Al-Mukhtasar — Audio, Tajwīd y Palabra por Palabra (8 Idiomas)",
        ar: numS ? ("سورة " + nomS + " (" + numS + ":" + numV + ") — القرآن الكريم والتفسير المختصر") : "القرآن الكريم والتفسير المختصر — تلاوة، تجويد وترجمة كلمة بكلمة (8 لغات)",
        de: numS ? ("Sure " + nomS + " (" + numS + ":" + numV + ") — Der Edle Koran, Audio, Wort für Wort & Tafsīr") : "Der Edle Koran & Tafsīr Al-Mukhtasar — Audio, Tajwīd & Wort für Wort (Bubenheim & Elyas)",
        it: numS ? ("Sura " + nomS + " (" + numS + ":" + numV + ") — Il Nobile Corano, Audio, Parola per Parola e Tafsīr") : "Il Nobile Corano e Tafsīr Al-Mukhtasar — Audio, Tajwīd e Parola per Parola (Piccardo)",
        id: numS ? ("Surah " + nomS + " (" + numS + ":" + numV + ") — Al-Qur'an Mulia, Audio, Kata demi Kata & Tafsir") : "Al-Qur'an Mulia & Tafsir Al-Mukhtasar — Audio, Tajwid & Kata demi Kata (Kemenag RI)",
        ru: numS ? ("Сура " + nomS + " (" + numS + ":" + numV + ") — Священный Коран, Аудио, Пословный перевод и Тафсир") : "Священный Коран и Тафсир аль-Мухтасар — Аудио, Таджвид и Пословный перевод (Э. Кулиев)"
      };
      var DESC_META_I18N = {
        fr: "Lisez et écoutez le Noble Coran (6 236 versets) avec suivi audio mot à mot, Tajwīd coloré, planificateur Khatm et exégèse (Tafsīr Al-Mukhtasar & Ibn Kathīr) en 8 langues : Français, Anglais, Espagnol, Arabe, Allemand, Italien, Indonésien et Russe.",
        en: "Read and listen to the Noble Quran (6,236 verses) with word-by-word audio tracking, color Tajwīd, Khatm planner and Tafsīr Al-Mukhtasar & Ibn Kathīr in 8 languages: French, English, Spanish, Arabic, German, Italian, Indonesian and Russian.",
        es: "Lea y escuche el Noble Corán (6.236 aleyas) con seguimiento de audio palabra por palabra, Tajwīd, planificador Khatm y Tafsīr Al-Mukhtasar en 8 idiomas: Francés, Inglés, Español, Árabe, Alemán, Italiano, Indonesio y Ruso.",
        ar: "اقرأ واستمع إلى القرآن الكريم (6236 آية) مع التتبع الصوتي كلمة بكلمة، التجويد المصور، برنامج ختم القرآن والتفسير المختصر وابن كثير بـ 8 لغات.",
        de: "Lesen und hören Sie den Edlen Koran (6.236 Verse, Übersetzung Bubenheim & Elyas) mit Wort-für-Wort-Audioverfolgung, Tajwīd, Leseplaner (Khatm) und Tafsīr Al-Mukhtasar & Ibn Kathīr in 8 Sprachen.",
        it: "Leggi e ascolta il Nobile Corano (6.236 versetti, traduzione Hamza Roberto Piccardo) con seguito audio parola per parola, Tajwīd, pianificatore Khatm e Tafsīr Al-Mukhtasar in 8 lingue.",
        id: "Baca dan dengarkan Al-Qur'an Mulia (6.236 ayat, Terjemahan Kemenag RI) dengan pelacakan audio kata demi kata, Tajwid, perencana Khatam, dan Tafsir Al-Mukhtasar & Ibnu Katsir dalam 8 bahasa.",
        ru: "Читайте и слушайте Священный Коран (6 236 аятов, перевод Эльмира Кулиева) с пословным аудио-слежением, Таджвидом, планом чтения (Хатм) и Тафсиром аль-Мухтасар и Ибн Касира на 8 языках."
      };

      if (TITRES_META_I18N[lang] && document.title !== TITRES_META_I18N[lang]) {
        document.title = TITRES_META_I18N[lang];
      }
      var metaDesc = document.querySelector("meta[name='description']");
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      if (DESC_META_I18N[lang] && metaDesc.getAttribute("content") !== DESC_META_I18N[lang]) {
        metaDesc.setAttribute("content", DESC_META_I18N[lang]);
      }
    } catch (e) {}
  }

  function cliquerBoutonNatifSiNecessaire(codeNat) {
    if (!codeNat || langExtActive) return;
    var btnDeRef = document.getElementById("btnLangDeV77");
    if (!btnDeRef || !btnDeRef.parentElement) return;
    var parentBar = btnDeRef.parentElement;
    var codeUpper = codeNat.toUpperCase();
    for (var i = 0; i < parentBar.children.length; i++) {
      var btn = parentBar.children[i];
      if (btn.id && btn.id.indexOf("V77") !== -1) continue;
      var txt = (btn.textContent || "").toUpperCase();
      if (txt.indexOf(codeUpper) !== -1) {
        if (!btn.classList.contains("active")) {
          IgnoreClicInterneFr = true;
          btn.click();
          IgnoreClicInterneFr = false;
        }
        langueNativeCible = "";
        break;
      }
    }
  }

  // ==========================================================================
  // 0. MOTEUR DU PLANIFICATEUR KHATM (VALIDATION EXPLICITE REQUISE POUR 6236/6236)
  // ==========================================================================
  var NB_VERSETS_PAR_SOURATE = [
    0,
    7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,
    112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,
    54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,
    14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,
    29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,
    11,8,3,9,5,4,7,3,6,3,5,4,5,6
  ];

  var ORDRE_REVELATION_114 = [
    96,68,73,74,1,111,81,87,92,89,93,94,103,100,108,102,107,109,105,113,
    114,112,53,80,97,91,85,95,106,101,75,104,77,50,90,86,54,38,7,72,
    36,25,35,19,20,56,26,27,28,17,10,11,12,15,6,37,31,34,39,40,
    41,42,43,44,45,46,51,88,18,16,71,14,21,23,32,52,67,69,70,78,
    79,82,84,30,29,83,2,8,3,33,60,4,99,57,47,13,55,76,65,98,
    59,24,22,63,58,49,66,64,61,62,48,5,9,110
  ];

  var NOMS_SOURATES_COURT = [
    "",
    "Al-Fātihah","Al-Baqarah","Āl 'Imrān","An-Nisā'","Al-Mā'idah","Al-An'ām","Al-A'rāf","Al-Anfāl","At-Tawbah","Yūnus",
    "Hūd","Yūsuf","Ar-Ra'd","Ibrāhīm","Al-Hijr","An-Nahl","Al-Isrā'","Al-Kahf","Maryam","Tā-Hā",
    "Al-Anbiyā'","Al-Hajj","Al-Mu'minūn","An-Nūr","Al-Furqān","Ash-Shu'arā'","An-Naml","Al-Qasas","Al-'Ankabūt","Ar-Rūm",
    "Luqmān","As-Sajdah","Al-Ahzāb","Saba'","Fātir","Yā-Sīn","As-Sāffāt","Sād","Az-Zumar","Ghāfir",
    "Fussilat","Ash-Shūrā","Az-Zukhruf","Ad-Dukhān","Al-Jāthiyah","Al-Ahqāf","Muhammad","Al-Fath","Al-Hujurāt","Qāf",
    "Adh-Dhāriyāt","At-Tūr","An-Najm","Al-Qamar","Ar-Rahmān","Al-Wāqi'ah","Al-Hadīd","Al-Mujādilah","Al-Hashr","Al-Mumtahanah",
    "As-Saff","Al-Jumu'ah","Al-Munāfiqūn","At-Taghābun","At-Talāq","At-Tahrīm","Al-Mulk","Al-Qalam","Al-Hāqqah","Al-Ma'ārij",
    "Nūh","Al-Jinn","Al-Muzzammil","Al-Muddaththir","Al-Qiyāmah","Al-Insān","Al-Mursalāt","An-Naba'","An-Nāzi'āt","'Abasa",
    "At-Takwīr","Al-Infitār","Al-Mutaffifīn","Al-Inshiqāq","Al-Burūj","At-Tāriq","Al-A'lā","Al-Ghāshiyah","Al-Fajr","Al-Balad",
    "Ash-Shams","Al-Layl","Ad-Duhā","Ash-Sharh","At-Tīn","Al-'Alaq","Al-Qadr","Al-Bayyinah","Az-Zalzalah","Al-'Ādiyāt",
    "Al-Qāri'ah","At-Takāthur","Al-'Asr","Al-Humazah","Al-Fīl","Quraysh","Al-Mā'ūn","Al-Kawthar","Al-Kāfirūn","An-Nasr",
    "Al-Masad","Al-Ikhlās","Al-Falaq","An-Nās"
  ];

  var TOTAL_VERSETS_CORAN = 6236;
  var etatKhatm = {
    months: 1,
    order: "revelation",
    idxByOrder: {
      revelation: 0,
      croissant: 0,
      decroissant: 0
    }
  };

  try {
    var sauvKhatm = localStorage.getItem("corantafsir_khatm_v77") || localStorage.getItem("corantafsir_khatm_v76") || localStorage.getItem("corantafsir_khatm_v75");
    if (sauvKhatm) {
      var parsedK = JSON.parse(sauvKhatm);
      if (parsedK && parsedK.idxByOrder) {
        etatKhatm.months = Number(parsedK.months) || 1;
        etatKhatm.order = parsedK.order || "revelation";
        etatKhatm.idxByOrder = parsedK.idxByOrder;
      }
    }
  } catch (e) {}

  function sauvegarderEtatKhatm() {
    try {
      localStorage.setItem("corantafsir_khatm_v77", JSON.stringify(etatKhatm));
    } catch (e) {}
  }

  function obtenirListeSouratesSelonOrdre(ord) {
    if (ord === "revelation") return ORDRE_REVELATION_114;
    var arr = [];
    if (ord === "decroissant") {
      for (var d = 114; d >= 1; d--) arr.push(d);
    } else {
      for (var c = 1; c <= 114; c++) arr.push(c);
    }
    return arr;
  }

  function obtenirSourateSuivanteSelonOrdre(ord, numSActuel) {
    var liste = obtenirListeSouratesSelonOrdre(ord);
    var idx = liste.indexOf(Number(numSActuel));
    if (idx !== -1 && idx + 1 < liste.length) {
      return liste[idx + 1];
    }
    return null;
  }

  function convertirIndexGlobalVersSourateVerset(ord, globalIdx) {
    var idx = Math.max(0, Math.min(TOTAL_VERSETS_CORAN - 1, Math.floor(globalIdx || 0)));
    var listeS = obtenirListeSouratesSelonOrdre(ord);
    var reste = idx;
    for (var i = 0; i < listeS.length; i++) {
      var numS = listeS[i];
      var nbV = NB_VERSETS_PAR_SOURATE[numS];
      if (reste < nbV) {
        return { s: numS, v: reste + 1, rangSourate: i + 1 };
      }
      reste -= nbV;
    }
    var dernS = listeS[listeS.length - 1];
    return { s: dernS, v: NB_VERSETS_PAR_SOURATE[dernS], rangSourate: 114 };
  }

  function convertirSourateVersetVersIndexGlobal(ord, numS, numV) {
    var listeS = obtenirListeSouratesSelonOrdre(ord);
    var cumul = 0;
    for (var i = 0; i < listeS.length; i++) {
      var s = listeS[i];
      if (s === Number(numS)) {
        var vClamp = Math.max(1, Math.min(NB_VERSETS_PAR_SOURATE[s] || 1, Number(numV) || 1));
        return cumul + (vClamp - 1);
      }
      cumul += NB_VERSETS_PAR_SOURATE[s];
    }
    return 0;
  }

  function obtenirVersetsParJour(months) {
    var joursMap = { 1: 30, 4: 120, 6: 180, 12: 365 };
    var j = joursMap[months] || 30;
    return Math.ceil(TOTAL_VERSETS_CORAN / j);
  }

  function obtenirCleVerset() {
    var urlFull = window.location.pathname.match(/sourate-(\\d+)-verset-(\\d+)/i);
    var aVersetArabe = Boolean(document.querySelector("#arabicVerse, .arabic-glow-verse"));
    if (!urlFull && !aVersetArabe) {
      return "";
    }
    var numS = urlFull ? urlFull[1] : "";
    var selects = document.querySelectorAll("select");
    for (var i = 0; i < selects.length; i++) {
      var s = selects[i];
      if (s.classList.contains("khatm-reciter-select")) continue;
      if (s.options && s.selectedIndex >= 0) {
        var optTxt = s.options[s.selectedIndex].textContent || "";
        var vm = optTxt.match(/(?:Verset|Verse|Aleya|Vers|Versetto|Ayat|Аят|آية)\\s*(\\d+)/i);
        if (vm && numS) return numS + ":" + vm[1];
      }
    }
    var badges = document.querySelectorAll("span, div");
    for (var b = 0; b < badges.length; b++) {
      var el = badges[b];
      if (el.children.length > 0 || el.closest("#khatmPlannerWidgetV77")) continue;
      var txt = (el.textContent || "").trim();
      var bm = txt.match(/^(\\d{1,3})\\s*:\\s*(\\d{1,3})$/);
      if (bm) return bm[1] + ":" + bm[2];
    }
    if (urlFull) return urlFull[1] + ":" + urlFull[2];
    return "";
  }

  function allerAuVersetSurMemePage(numV) {
    var selects = document.querySelectorAll("select");
    for (var i = 0; i < selects.length; i++) {
      var sel = selects[i];
      if (sel.classList.contains("khatm-reciter-select")) continue;
      if (sel.options && sel.options.length >= numV) {
        var opt0 = (sel.options[0].textContent || "").toLowerCase();
        if (opt0.indexOf("vers") !== -1 || opt0.indexOf("aleya") !== -1 || opt0.indexOf("ayat") !== -1 || opt0.indexOf("аят") !== -1 || opt0.indexOf("آية") !== -1 || /\\d+\\s*\\/\\s*\\d+/.test(opt0)) {
          if (sel.selectedIndex !== numV - 1) {
            sel.selectedIndex = numV - 1;
            sel.dispatchEvent(new Event("change", { bubbles: true }));
          }
          return true;
        }
      }
    }
    return false;
  }

  var tentativesKhatmVerse = 0;
  function verifierSautDirectVersetKhatm() {
    if (tentativesKhatmVerse > 8) return;
    try {
      var up = new URLSearchParams(window.location.search);
      var kv = Number(up.get("khatm_verse"));
      if (kv && kv >= 1 && obtenirCleVerset()) {
        tentativesKhatmVerse++;
        allerAuVersetSurMemePage(kv);
      }
    } catch (e) {}
  }

  var dernierVersetAutoSyncKhatm = "";
  function synchroniserPositionKhatmAutomatique() {
    var vk = obtenirCleVerset();
    if (!vk || vk === dernierVersetAutoSyncKhatm) return;
    dernierVersetAutoSyncKhatm = vk;
    var p = vk.split(":");
    var sAct = Number(p[0]);
    var vAct = Number(p[1]);
    if (!sAct || !vAct) return;

    var ord = etatKhatm.order;
    var idxActuel = etatKhatm.idxByOrder[ord] || 0;
    if (idxActuel >= TOTAL_VERSETS_CORAN) return;
    var idxPage = convertirSourateVersetVersIndexGlobal(ord, sAct, vAct);
    if (idxPage > idxActuel && idxPage - idxActuel <= 220) {
      etatKhatm.idxByOrder[ord] = Math.min(TOTAL_VERSETS_CORAN - 1, idxPage);
      sauvegarderEtatKhatm();
    }
  }

  var TEXTES_KHATM_I18N = {
    fr: {
      m1: "🗓️ 1 Mois (208 v./j)", m4: "🗓️ 4 Mois (52 v./j)", m6: "🗓️ 6 Mois (35 v./j)", m12: "🗓️ 12 Mois (18 v./j)",
      ordRev: "📜 Ordre : Révélation (96➔110)",
      ordAsc: "⬆️ Ordre : Croissant (1➔114)",
      ordDesc: "⬇️ Ordre : Décroissant (114➔1)",
      jours: "j. restants",
      termine: "🎉 Khatm terminé !",
      posActuelle: "Position :",
      objJour: "Objectif du jour :",
      reprendre: "📖 Reprendre :",
      validerEtape: "✅ Valider étape",
      memoriserIci: "📍 Mémoriser",
      sourateSuiv: "⏭️ Suiv. :",
      reset: "↺"
    },
    en: {
      m1: "🗓️ 1 Month (208 v./d)", m4: "🗓️ 4 Months (52 v./d)", m6: "🗓️ 6 Months (35 v./d)", m12: "🗓️ 12 Months (18 v./d)",
      ordRev: "📜 Order: Revelation (96➔110)",
      ordAsc: "⬆️ Order: Ascending (1➔114)",
      ordDesc: "⬇️ Order: Descending (114➔1)",
      jours: "d. left",
      termine: "🎉 Khatm Completed!",
      posActuelle: "Position:",
      objJour: "Today's goal:",
      reprendre: "📖 Resume:",
      validerEtape: "✅ Complete step",
      memoriserIci: "📍 Save here",
      sourateSuiv: "⏭️ Next:",
      reset: "↺"
    },
    es: {
      m1: "🗓️ 1 Mes (208 a./d)", m4: "🗓️ 4 Meses (52 a./d)", m6: "🗓️ 6 Meses (35 a./d)", m12: "🗓️ 12 Meses (18 a./d)",
      ordRev: "📜 Orden: Revelación (96➔110)",
      ordAsc: "⬆️ Orden: Creciente (1➔114)",
      ordDesc: "⬇️ Orden: Decreciente (114➔1)",
      jours: "d. restantes",
      termine: "🎉 ¡Khatm completado!",
      posActuelle: "Posición:",
      objJour: "Meta de hoy:",
      reprendre: "📖 Continuar:",
      validerEtape: "✅ Validar meta",
      memoriserIci: "📍 Guardar",
      sourateSuiv: "⏭️ Sig.:",
      reset: "↺"
    },
    ar: {
      m1: "🗓️ شهر واحد (208 آية/ي)", m4: "🗓️ 4 أشهر (52 آية/ي)", m6: "🗓️ 6 أشهر (35 آية/ي)", m12: "🗓️ 12 شهراً (18 آية/ي)",
      ordRev: "📜 الترتيب: النزول (96⬅110)",
      ordAsc: "⬆️ الترتيب: تصاعدي (1⬅114)",
      ordDesc: "⬇️ الترتيب: تنازلي (114⬅1)",
      jours: "يوم متبقي",
      termine: "🎉 تم ختم القرآن الكريم!",
      posActuelle: "الموضع:",
      objJour: "ورد اليوم:",
      reprendre: "📖 متابعة:",
      validerEtape: "✅ إتمام الورد",
      memoriserIci: "📍 حفظ هنا",
      sourateSuiv: "⏭️ التالية:",
      reset: "↺"
    },
    de: {
      m1: "🗓️ 1 Monat (208 V./T)", m4: "🗓️ 4 Monate (52 V./T)", m6: "🗓️ 6 Monate (35 V./T)", m12: "🗓️ 12 Monate (18 V./T)",
      ordRev: "📜 Reihenfolge: Offenbarung (96➔110)",
      ordAsc: "⬆️ Reihenfolge: Aufsteigend (1➔114)",
      ordDesc: "⬇️ Reihenfolge: Absteigend (114➔1)",
      jours: "T. übrig",
      termine: "🎉 Khatm abgeschlossen!",
      posActuelle: "Position:",
      objJour: "Tagesziel:",
      reprendre: "📖 Weiterlesen:",
      validerEtape: "✅ Tagesziel",
      memoriserIci: "📍 Speichern",
      sourateSuiv: "⏭️ Nächste:",
      reset: "↺"
    },
    it: {
      m1: "🗓️ 1 Mese (208 v./g)", m4: "🗓️ 4 Mesi (52 v./g)", m6: "🗓️ 6 Mesi (35 v./g)", m12: "🗓️ 12 Mesi (18 v./g)",
      ordRev: "📜 Ordine: Rivelazione (96➔110)",
      ordAsc: "⬆️ Ordine: Crescente (1➔114)",
      ordDesc: "⬇️ Ordine: Decrescente (114➔1)",
      jours: "g. rimasti",
      termine: "🎉 Khatm completato!",
      posActuelle: "Posizione:",
      objJour: "Obiettivo:",
      reprendre: "📖 Riprendi:",
      validerEtape: "✅ Convalida",
      memoriserIci: "📍 Salva qui",
      sourateSuiv: "⏭️ Succ.:",
      reset: "↺"
    },
    id: {
      m1: "🗓️ 1 Bulan (208 a./h)", m4: "🗓️ 4 Bulan (52 a./h)", m6: "🗓️ 6 Bulan (35 a./h)", m12: "🗓️ 12 Bulan (18 a./h)",
      ordRev: "📜 Urutan: Wahyu (96➔110)",
      ordAsc: "⬆️ Urutan: Menaik (1➔114)",
      ordDesc: "⬇️ Urutan: Menurun (114➔1)",
      jours: "h. tersisa",
      termine: "🎉 Khatam Selesai!",
      posActuelle: "Posisi:",
      objJour: "Target hari ini:",
      reprendre: "📖 Lanjutkan:",
      validerEtape: "✅ Selesai",
      memoriserIci: "📍 Simpan",
      sourateSuiv: "⏭️ Berikut:",
      reset: "↺"
    },
    ru: {
      m1: "🗓️ 1 мес. (208 а./д)", m4: "🗓️ 4 мес. (52 а./д)", m6: "🗓️ 6 мес. (35 а./д)", m12: "🗓️ 12 мес. (18 а./д)",
      ordRev: "📜 Порядок: Ниспослание (96➔110)",
      ordAsc: "⬆️ Порядок: Возрастание (1➔114)",
      ordDesc: "⬇️ Порядок: Убывание (114➔1)",
      jours: "дн. ост.",
      termine: "🎉 Хатм завершён!",
      posActuelle: "Позиция:",
      objJour: "Цель дня:",
      reprendre: "📖 Продолжить:",
      validerEtape: "✅ Завершить",
      memoriserIci: "📍 Сохранить",
      sourateSuiv: "⏭️ След.:",
      reset: "↺"
    }
  };

  function trouverBoiteHeroPourInsertionInterne() {
    var h1 = document.querySelector("h1, h2");
    if (h1) {
      var curr = h1.parentElement;
      while (curr && curr !== document.body) {
        var st = window.getComputedStyle(curr);
        var r = curr.getBoundingClientRect();
        if (st.borderRadius && parseFloat(st.borderRadius) >= 12 && r.width >= 500) {
          curr.classList.add("panneau-opaque-v77");
          return curr;
        }
        curr = curr.parentElement;
      }
      if (h1.parentElement) return h1.parentElement;
    }
    return null;
  }

  function afficherOuMettreAJourPlanificateurKhatm() {
    if (!document.body) return;
    var lang = obtenirLangueActive();
    var t = TEXTES_KHATM_I18N[lang] || TEXTES_KHATM_I18N.fr;
    var vkPage = obtenirCleVerset();
    var estSurPageVerset = Boolean(vkPage);

    var boiteHero = trouverBoiteHeroPourInsertionInterne();
    if (!boiteHero) return;

    var liensInternes = boiteHero.querySelectorAll("a, button");
    for (var l = 0; l < liensInternes.length; l++) {
      var elL = liensInternes[l];
      if (elL.closest("#khatmPlannerWidgetV77")) continue;
      var txtL = (elL.textContent || "").trim();
      if (
        txtL.indexOf("Reprendre :") !== -1 ||
        txtL.indexOf("Resume:") !== -1 ||
        txtL.indexOf("Continuar:") !== -1 ||
        txtL.indexOf("Weiterlesen:") !== -1 ||
        txtL.indexOf("Riprendi") !== -1 ||
        txtL.indexOf("Lanjutkan") !== -1 ||
        txtL.indexOf("Продолжить") !== -1 ||
        txtL.indexOf("متابعة") !== -1
      ) {
        elL.classList.add("khatm-doublon-reprendre-masque");
      }
    }

    var widget = document.getElementById("khatmPlannerWidgetV77");
    if (!widget) {
      widget = document.createElement("div");
      widget.id = "khatmPlannerWidgetV77";
      widget.setAttribute("translate", "no");
      widget.className = "notranslate";
      boiteHero.appendChild(widget);
    } else if (widget.parentElement !== boiteHero) {
      boiteHero.appendChild(widget);
    }

    var ord = etatKhatm.order;
    var m = etatKhatm.months;
    var versetsValides = Math.max(0, Math.min(TOTAL_VERSETS_CORAN, etatKhatm.idxByOrder[ord] || 0));
    var estTermine = versetsValides >= TOTAL_VERSETS_CORAN;
    var idxLectureCourant = Math.min(TOTAL_VERSETS_CORAN - 1, versetsValides);
    var vParJour = obtenirVersetsParJour(m);
    var idxCibleJour = Math.min(TOTAL_VERSETS_CORAN - 1, idxLectureCourant + vParJour - 1);

    var posInfo = convertirIndexGlobalVersSourateVerset(ord, idxLectureCourant);
    var cibleInfo = convertirIndexGlobalVersSourateVerset(ord, idxCibleJour);
    var pct = estTermine ? "100.0" : ((versetsValides / TOTAL_VERSETS_CORAN) * 100).toFixed(1);
    var joursRestants = estTermine ? 0 : Math.max(0, Math.ceil((TOTAL_VERSETS_CORAN - versetsValides) / vParJour));

    var nomSourateAct = NOMS_SOURATES_COURT[posInfo.s] || ("Sourate " + posInfo.s);
    var nomSourateCible = NOMS_SOURATES_COURT[cibleInfo.s] || ("Sourate " + cibleInfo.s);
    var suffixeLangUrl = lang !== "fr" ? ("&lang=" + lang) : "";
    var urlReprise = "sourate-" + posInfo.s + "-verset-" + posInfo.v + ".html?khatm_verse=" + posInfo.v + suffixeLangUrl;

    var cleSignatureRendu = [lang, m, ord, versetsValides, vkPage].join("|");
    if (widget.getAttribute("data-render-sig") === cleSignatureRendu) return;
    widget.setAttribute("data-render-sig", cleSignatureRendu);
    widget.style.direction = lang === "ar" ? "rtl" : "ltr";

    var controlePositionHtml = "";
    if (estSurPageVerset) {
      var partsVk = vkPage.split(":");
      var sPage = Number(partsVk[0]);
      var sSuiv = obtenirSourateSuivanteSelonOrdre(ord, sPage);
      var btnSuivHtml = "";
      if (sSuiv) {
        var urlSuiv = "sourate-" + sSuiv + "-verset-1.html?khatm_verse=1" + suffixeLangUrl;
        btnSuivHtml = '<a href="' + urlSuiv + '" class="khatm-btn-cyan-compact">' + t.sourateSuiv + ' ' + NOMS_SOURATES_COURT[sSuiv] + ' (' + sSuiv + ':1)</a>';
      }
      controlePositionHtml =
        '<button type="button" class="khatm-btn-cyan-compact" data-khatm-act="save-here">' + t.memoriserIci + " (" + vkPage + ")</button>" +
        btnSuivHtml;
    } else {
      var listeSOrd = obtenirListeSouratesSelonOrdre(ord);
      var optsHtml = "";
      for (var idxS = 0; idxS < listeSOrd.length; idxS++) {
        var numSOpt = listeSOrd[idxS];
        var selAttr = numSOpt === posInfo.s ? ' selected="selected"' : "";
        var vAffiche = numSOpt === posInfo.s ? posInfo.v : 1;
        optsHtml += '<option value="' + numSOpt + '"' + selAttr + '>📍 ' + (idxS + 1) + '. ' + NOMS_SOURATES_COURT[numSOpt] + ' (' + numSOpt + ':' + vAffiche + ')</option>';
      }
      controlePositionHtml = '<select class="khatm-reciter-select" data-khatm-sel="pos">' + optsHtml + '</select>';
    }

    var texteStatutFin = estTermine
      ? ('6236 / 6236 (100%) • ' + t.termine)
      : (versetsValides + ' / 6236 (' + pct + '%) • ~' + joursRestants + ' ' + t.jours);

    widget.innerHTML =
      '<div class="khatm-compact-row">' +
        '<select class="khatm-reciter-select" data-khatm-sel="months">' +
          '<option value="1"' + (m === 1 ? ' selected="selected"' : '') + '>' + t.m1 + '</option>' +
          '<option value="4"' + (m === 4 ? ' selected="selected"' : '') + '>' + t.m4 + '</option>' +
          '<option value="6"' + (m === 6 ? ' selected="selected"' : '') + '>' + t.m6 + '</option>' +
          '<option value="12"' + (m === 12 ? ' selected="selected"' : '') + '>' + t.m12 + '</option>' +
        '</select>' +
        '<select class="khatm-reciter-select" data-khatm-sel="order">' +
          '<option value="revelation"' + (ord === "revelation" ? ' selected="selected"' : '') + '>' + t.ordRev + '</option>' +
          '<option value="croissant"' + (ord === "croissant" ? ' selected="selected"' : '') + '>' + t.ordAsc + '</option>' +
          '<option value="decroissant"' + (ord === "decroissant" ? ' selected="selected"' : '') + '>' + t.ordDesc + '</option>' +
        '</select>' +
        controlePositionHtml +
        '<a href="' + urlReprise + '" class="khatm-btn-green-compact" data-khatm-act="resume" data-target-s="' + posInfo.s + '" data-target-v="' + posInfo.v + '">' +
          t.reprendre + ' ' + nomSourateAct + ' (v.' + posInfo.v + ')' +
        '</a>' +
        '<button type="button" class="khatm-btn-cyan-compact" data-khatm-act="step-day">' +
          t.validerEtape + ' (+' + vParJour + ')' +
        '</button>' +
        '<button type="button" class="khatm-btn-reset-mini" data-khatm-act="reset" title="Reset">' + t.reset + '</button>' +
      '</div>' +
      '<div class="khatm-mini-footer">' +
        '<span>' + t.posActuelle + ' <strong style="color:#38bdf8;">' + nomSourateAct + ' (' + posInfo.s + ':' + posInfo.v + ')</strong></span>' +
        '<span>•</span>' +
        '<span>' + t.objJour + ' <strong style="color:#fde047;">' + nomSourateCible + ' (' + cibleInfo.s + ':' + cibleInfo.v + ')</strong></span>' +
        '<span>•</span>' +
        '<div class="khatm-mini-bar-wrap"><div class="khatm-mini-bar-fill" style="width:' + Math.max(2, Number(pct)) + '%;"></div></div>' +
        '<span dir="ltr" style="color:#6ee7b7;font-weight:600;display:inline-block;">' + texteStatutFin + '</span>' +
      '</div>';

    var selMonths = widget.querySelector("select[data-khatm-sel='months']");
    if (selMonths) {
      selMonths.addEventListener("change", function () {
        etatKhatm.months = Number(this.value) || 1;
        sauvegarderEtatKhatm();
        afficherOuMettreAJourPlanificateurKhatm();
      });
    }

    var selOrder = widget.querySelector("select[data-khatm-sel='order']");
    if (selOrder) {
      selOrder.addEventListener("change", function () {
        etatKhatm.order = this.value || "revelation";
        sauvegarderEtatKhatm();
        afficherOuMettreAJourPlanificateurKhatm();
      });
    }

    var selPos = widget.querySelector("select[data-khatm-sel='pos']");
    if (selPos) {
      selPos.addEventListener("change", function () {
        var sChoisi = Number(this.value) || 1;
        etatKhatm.idxByOrder[etatKhatm.order] = convertirSourateVersetVersIndexGlobal(etatKhatm.order, sChoisi, 1);
        sauvegarderEtatKhatm();
        afficherOuMettreAJourPlanificateurKhatm();
      });
    }
  }

  var NOMS_114_ACCUEIL = {
    de: {
      1: "Al-Fātihah (Die Eröffnende)", 2: "Al-Baqarah (Die Kuh)", 3: "Āl 'Imrān (Die Sippe 'Imrāns)", 4: "An-Nisā' (Die Frauen)",
      5: "Al-Mā'idah (Der Tisch)", 6: "Al-An'ām (Das Vieh)", 7: "Al-A'rāf (Die Höhen)", 8: "Al-Anfāl (Die Beute)",
      9: "At-Tawbah (Die Reue)", 10: "Yūnus (Jonas)", 11: "Hūd", 12: "Yūsuf (Josef)", 13: "Ar-Ra'd (Der Donner)",
      14: "Ibrāhīm (Abraham)", 15: "Al-Hijr", 16: "An-Nahl (Die Biene)", 17: "Al-Isrā' (Die Nachtreise)", 18: "Al-Kahf (Die Höhle)",
      19: "Maryam (Maria)", 20: "Tā-Hā", 21: "Al-Anbiyā' (Die Propheten)", 22: "Al-Hajj (Die Pilgerfahrt)", 23: "Al-Mu'minūn (Die Gläubigen)",
      24: "An-Nūr (Das Licht)", 25: "Al-Furqān (Die Unterscheidung)", 26: "Ash-Shu'arā' (Die Dichter)", 27: "An-Naml (Die Ameisen)",
      28: "Al-Qasas (Die Geschichten)", 29: "Al-'Ankabūt (Die Spinne)", 30: "Ar-Rūm (Die Römer)", 31: "Luqmān",
      32: "As-Sajdah (Die Niederwerfung)", 33: "Al-Ahzāb (Die Gruppierungen)", 34: "Saba'", 35: "Fātir (Der Schöpfer)", 36: "Yā-Sīn",
      37: "As-Sāffāt (Die Gereihten)", 38: "Sād", 39: "Az-Zumar (Die Scharen)", 40: "Ghāfir (Der Vergebende)", 41: "Fussilat (Ausführlich dargelegt)",
      42: "Ash-Shūrā (Die Beratung)", 43: "Az-Zukhruf (Der Prunk)", 44: "Ad-Dukhān (Der Rauch)", 45: "Al-Jāthiyah (Das Knien)",
      46: "Al-Ahqāf (Die Dünen)", 47: "Muhammad", 48: "Al-Fath (Der Sieg)", 49: "Al-Hujurāt (Die Gemächer)", 50: "Qāf",
      51: "Adh-Dhāriyāt (Die Aufwirbelnden)", 52: "At-Tūr (Der Berg)", 53: "An-Najm (Der Stern)", 54: "Al-Qamar (Der Mond)",
      55: "Ar-Rahmān (Der Allerbarmer)", 56: "Al-Wāqi'ah (Das Ereignis)", 57: "Al-Hadīd (Das Eisen)", 58: "Al-Mujādilah (Die Streitende)",
      59: "Al-Hashr (Die Versammlung)", 60: "Al-Mumtahanah (Die Geprüfte)", 61: "As-Saff (Die Reihe)", 62: "Al-Jumu'ah (Der Freitag)",
      63: "Al-Munāfiqūn (Die Heuchler)", 64: "At-Taghābun (Die Übervorteilung)", 65: "At-Talāq (Die Scheidung)", 66: "At-Tahrīm (Das Verbot)",
      67: "Al-Mulk (Die Herrschaft)", 68: "Al-Qalam (Das Schreibrohr)", 69: "Al-Hāqqah (Die Fällige)", 70: "Al-Ma'ārij (Die Aufstiegswege)",
      71: "Nūh (Noah)", 72: "Al-Jinn (Die Dschinn)", 73: "Al-Muzzammil (Der Eingehüllte)", 74: "Al-Muddaththir (Der Bedeckte)",
      75: "Al-Qiyāmah (Die Auferstehung)", 76: "Al-Insān (Der Mensch)", 77: "Al-Mursalāt (Die Gesandten)", 78: "An-Naba' (Die Kunde)",
      79: "An-Nāzi'āt (Die Entreißenden)", 80: "'Abasa (Er runzelte die Stirn)", 81: "At-Takwīr (Das Umschlingen)", 82: "Al-Infitār (Das Zerbrechen)",
      83: "Al-Mutaffifīn (Die Betrüger)", 84: "Al-Inshiqāq (Das Zerreißen)", 85: "Al-Burūj (Die Türme)", 86: "At-Tāriq (Der Nachtstern)",
      87: "Al-A'lā (Der Höchste)", 88: "Al-Ghāshiyah (Die Überdeckende)", 89: "Al-Fajr (Die Morgenröte)", 90: "Al-Balad (Die Stadt)",
      91: "Ash-Shams (Die Sonne)", 92: "Al-Layl (Die Nacht)", 93: "Ad-Duhā (Der Vormittag)", 94: "Ash-Sharh (Das Weiten)",
      95: "At-Tīn (Die Feige)", 96: "Al-'Alaq (Das Anhängsel)", 97: "Al-Qadr (Die Bestimmung)", 98: "Al-Bayyinah (Der klare Beweis)",
      99: "Az-Zalzalah (Das Beben)", 100: "Al-'Ādiyāt (Die Rennenden)", 101: "Al-Qāri'ah (Die Pochende)", 102: "At-Takāthur (Die Vermehrung)",
      103: "Al-'Asr (Die Zeit)", 104: "Al-Humazah (Der Stichler)", 105: "Al-Fīl (Der Elefant)", 106: "Quraysh (Quraisch)",
      107: "Al-Mā'ūn (Die Hilfeleistung)", 108: "Al-Kawthar (Die Fülle)", 109: "Al-Kāfirūn (Die Ungläubigen)", 110: "An-Nasr (Die Hilfe)",
      111: "Al-Masad (Die Palmfasern)", 112: "Al-Ikhlās (Die Reinheit)", 113: "Al-Falaq (Das Morgenrot)", 114: "An-Nās (Die Menschen)"
    },
    it: {
      1: "Al-Fātihah (L'Aprente)", 2: "Al-Baqarah (La Giovenca)", 3: "Āl 'Imrān (La Famiglia di 'Imrān)", 4: "An-Nisā' (Le Donne)",
      5: "Al-Mā'idah (La Mensa)", 18: "Al-Kahf (La Caverna)", 36: "Yā-Sīn", 55: "Ar-Rahmān (Il Compassionevole)",
      56: "Al-Wāqi'ah (L'Evento)", 67: "Al-Mulk (La Sovranità)", 68: "Al-Qalam (Il Calamo)",
      73: "Al-Muzzammil (L'Avvolto)", 74: "Al-Muddaththir (Il Rivestito)", 81: "At-Takwīr (L'Oscuramento)",
      87: "Al-A'lā (L'Altissimo)", 89: "Al-Fajr (L'Alba)", 92: "Al-Layl (La Notte)", 93: "Ad-Duhā (La Luce del Mattino)",
      94: "Ash-Sharh (L'Apertura del Petto)", 96: "Al-'Alaq (L'Aderenza)", 100: "Al-'Ādiyāt (Le Galoppanti)",
      102: "At-Takāthur (La Rivalità)", 103: "Al-'Asr (Il Tempo)", 107: "Al-Mā'ūn (L'Utensile)",
      108: "Al-Kawthar (L'Abbondanza)", 109: "Al-Kāfirūn (I Miscredenti)", 111: "Al-Masad (Le Fibre di Palma)",
      112: "Al-Ikhlās (Il Puro Monoteismo)", 113: "Al-Falaq (L'Alba Nascente)", 114: "An-Nās (Gli Uomini)"
    },
    id: {
      1: "Al-Fātihah (Pembukaan)", 2: "Al-Baqarah (Sapi Betina)", 68: "Al-Qalam (Pena)", 73: "Al-Muzzammil (Orang yang Berselimut)",
      74: "Al-Muddaththir (Orang yang Berkemul)", 81: "At-Takwīr (Menggulung)", 87: "Al-A'lā (Yang Paling Tinggi)", 89: "Al-Fajr (Fajar)",
      92: "Al-Layl (Malam)", 93: "Ad-Duhā (Waktu Duha)", 94: "Ash-Sharh (Melapangkan)", 96: "Al-'Alaq (Segumpal Darah)",
      100: "Al-'Ādiyāt (Kuda Perang)", 102: "At-Takāthur (Bermegah-megahan)", 103: "Al-'Asr (Masa)", 107: "Al-Mā'ūn (Barang yang Berguna)",
      108: "Al-Kawthar (Nikmat yang Banyak)", 109: "Al-Kāfirūn (Orang-Orang Kafir)", 111: "Al-Masad (Gejolak Api)",
      112: "Al-Ikhlās (Kemurnian Keesaan Allah)", 113: "Al-Falaq (Waktu Subuh)", 114: "An-Nās (Manusia)"
    },
    ru: {
      1: "Аль-Фатиха (Открывающая Коран)", 2: "Аль-Бакара (Корова)", 68: "Аль-Калам (Письменная трость)", 73: "Аль-Муззаммиль (Закутавшийся)",
      74: "Аль-Муддассир (Завернувшийся)", 81: "Ат-Таквир (Скручивание)", 87: "Аль-Аля (Всевышний)", 89: "Аль-Фаджр (Заря)",
      92: "Аль-Лейл (Ночь)", 93: "Ад-Духа (Утро)", 94: "Аш-Шарх (Раскрытие)", 96: "Аль-Аляк (Сгусток крови)",
      100: "Аль-Адият (Скачущие)", 102: "Ат-Такасур (Страсть к приумножению)", 103: "Аль-Аср (Предвечернее время)", 107: "Аль-Маун (Мелочь)",
      108: "Аль-Каусар (Изобилие)", 109: "Аль-Кафирун (Неверующие)", 111: "Аль-Масад (Пальмовые волокна)",
      112: "Аль-Ихляс (Очищение веры)", 113: "Аль-Фаляк (Рассвет)", 114: "Ан-Нас (Люди)"
    }
  };

  var cacheChapitresExt = {};
  var requetesChapExtEnCours = {};
  var cacheTexteUnitaireExt = {};
  var requeteTexteExtEnCours = {};
  var noeudsTextesModifies = [];

  try {
    var sauvChapExt = localStorage.getItem("cache_ext_chap_v64");
    if (sauvChapExt) cacheChapitresExt = JSON.parse(sauvChapExt);
    var sauvTxtExt = localStorage.getItem("cache_txt_unit_ext_v64");
    if (sauvTxtExt) cacheTexteUnitaireExt = JSON.parse(sauvTxtExt);
  } catch (e) {}

  function restaurerTextesOriginauxDepuisExt() {
    for (var i = 0; i < noeudsTextesModifies.length; i++) {
      var item = noeudsTextesModifies[i];
      if (item.node && item.orig !== undefined) {
        item.node.nodeValue = item.orig;
      }
    }
    noeudsTextesModifies = [];
  }

  function modifierNoeudTexteSeul(textNode, nouveauTexte) {
    if (!textNode || textNode.nodeType !== 3) return;
    if (textNode.__origExtV77 === undefined) {
      textNode.__origExtV77 = textNode.nodeValue;
      noeudsTextesModifies.push({ node: textNode, orig: textNode.__origExtV77 });
    }
    if (textNode.nodeValue !== nouveauTexte) {
      textNode.nodeValue = nouveauTexte;
    }
  }

  function nettoyerVersetBrutApi(rawHtml) {
    if (!rawHtml) return "";
    return rawHtml
      .replace(/<sup[^>]*>[\\s\\S]*?<\\/sup>/gi, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\\[\\d+\\]|\\(\\d+\\)/g, "")
      .replace(/\\s+(\\d+)\\s*([\\.!\\?;:])/g, "$2")
      .replace(/\\s+([\\.!\\?,;:])/g, "$1")
      .replace(/\\s{2,}/g, " ")
      .trim();
  }

  function affinerTraductionTheologique(str, codeLang) {
    if (!str) return "";
    var out = str.trim();
    if (codeLang === "it") {
      out = out.replace(/soddisfatto di lui/gi, "soddisfatto di lei").replace(/Il suo personaggio era il Corano/gi, "Il suo carattere era il Corano").replace(/r[eé]pondit\\s*:/gi, "rispose:");
    } else if (codeLang === "de") {
      out = out.replace(/mit ihm zufrieden/gi, "mit ihr zufrieden").replace(/Sein Charakter war der Koran/gi, "Sein Wesen (Charakter) war der Koran").replace(/r[eé]pondit\\s*:/gi, "antwortete:");
    } else if (codeLang === "id") {
      out = out.replace(/r[eé]pondit\\s*:/gi, "menjawab:").replace(/karakternya adalah Al-Qur'an/gi, "akhlaknya adalah Al-Qur'an");
    } else if (codeLang === "ru") {
      out = out.replace(/доволен им Аллах/gi, "доволен ею Аллах").replace(/Его персонажем был Коран/gi, "Его нравом был Коран").replace(/r[eé]pondit\\s*:/gi, "ответила:");
    }
    return out;
  }

  function basculerDepuisArabeSurClicUtilisateur(conteneurLang, btnActif) {
    if (!conteneurLang) return;
    var btnSaAr = null;
    var btnFr = null;
    for (var i = 0; i < conteneurLang.children.length; i++) {
      var c = conteneurLang.children[i];
      var t = (c.textContent || "").replace(/\\s+/g, "").toUpperCase();
      if (t.indexOf("FR") !== -1) btnFr = c;
      if (t === "SAAR" || /AR$/.test(t)) btnSaAr = c;
    }

    var arEstActif = btnSaAr && btnSaAr.classList.contains("active");
    if (arEstActif && btnFr) {
      IgnoreClicInterneFr = true;
      btnFr.click();
      IgnoreClicInterneFr = false;
    }

    for (var f = 0; f < conteneurLang.children.length; f++) {
      if (conteneurLang.children[f] !== btnActif) {
        conteneurLang.children[f].classList.remove("active");
        conteneurLang.children[f].classList.remove("active-ext-v77");
      }
    }
    if (btnActif) btnActif.classList.add("active-ext-v77");
  }

  function assurerBoutonsLanguesEtendues() {
    var oldBtns = document.querySelectorAll("[id^='btnLangTrV'], [id^='btnLangDeV']:not(#btnLangDeV77), [id^='btnLangItV']:not(#btnLangItV77), [id^='btnLangIdV']:not(#btnLangIdV77), [id^='btnLangRuV']:not(#btnLangRuV77)");
    for (var b = 0; b < oldBtns.length; b++) {
      if (oldBtns[b].parentNode) oldBtns[b].parentNode.removeChild(oldBtns[b]);
    }

    var mapIds = { de: "btnLangDeV77", it: "btnLangItV77", id: "btnLangIdV77", ru: "btnLangRuV77" };
    if (document.getElementById("btnLangDeV77") && document.getElementById("btnLangIdV77") && document.getElementById("btnLangRuV77")) {
      var parentBar = document.getElementById("btnLangDeV77").parentElement;
      if (parentBar) {
        parentBar.setAttribute("translate", "no");
        parentBar.classList.add("notranslate");
      }
      for (var code in mapIds) {
        var bEl = document.getElementById(mapIds[code]);
        if (!bEl) continue;
        if (langExtActive === code) {
          bEl.classList.add("active-ext-v77");
          if (parentBar) {
            for (var k = 0; k < parentBar.children.length; k++) {
              if (parentBar.children[k] !== bEl) parentBar.children[k].classList.remove("active");
            }
          }
        } else {
          bEl.classList.remove("active-ext-v77");
        }
      }
      if (!langExtActive && langueNativeCible) {
        cliquerBoutonNatifSiNecessaire(langueNativeCible);
      }
      return;
    }

    var tous = document.querySelectorAll("button, a, span, div, li");
    var btnFrFr = null;
    var btnSaAr = null;
    for (var i = 0; i < tous.length; i++) {
      var el = tous[i];
      var rect = el.getBoundingClientRect();
      if (rect.width < 18 || rect.width > 110 || rect.height < 14 || rect.height > 60) continue;
      var tSansEspace = (el.textContent || "").replace(/\\s+/g, "").toUpperCase();
      if (tSansEspace === "SAAR" || tSansEspace === "\\uD83C\\uDDF8\\uD83C\\uDDE6AR" || /AR$/.test(tSansEspace)) {
        var parent = el.parentElement;
        if (parent) {
          var pTxt = (parent.textContent || "").toUpperCase();
          if (pTxt.indexOf("FR") !== -1 && pTxt.indexOf("EN") !== -1 && pTxt.indexOf("ES") !== -1) {
            btnSaAr = el;
            for (var c = 0; c < parent.children.length; c++) {
              if ((parent.children[c].textContent || "").toUpperCase().indexOf("FR") !== -1) {
                btnFrFr = parent.children[c];
                break;
              }
            }
            break;
          }
        }
      }
    }

    if (btnSaAr && btnSaAr.parentElement) {
      var conteneurLang = btnSaAr.parentElement;
      conteneurLang.setAttribute("translate", "no");
      conteneurLang.classList.add("notranslate");
      conteneurLang.style.setProperty("overflow", "visible", "important");
      conteneurLang.style.setProperty("flex-wrap", "wrap", "important");
      var modeleBtn = btnFrFr || btnSaAr;

      var freresInit = Array.prototype.slice.call(conteneurLang.children);
      var mapDrapeauxNatifs = {
        FR: { flag: "\\uD83C\\uDDEB\\uD83C\\uDDF7", code: "FR" },
        EN: { flag: "\\uD83C\\uDDEC\\uD83C\\uDDE7", code: "EN" },
        ES: { flag: "\\uD83C\\uDDEA\\uD83C\\uDDF8", code: "ES" },
        AR: { flag: "\\uD83C\\uDDF8\\uD83C\\uDDE6", code: "AR" }
      };
      for (var nIdx = 0; nIdx < freresInit.length; nIdx++) {
        var btnNat = freresInit[nIdx];
        var txtNat = (btnNat.textContent || "").toUpperCase();
        for (var cleNat in mapDrapeauxNatifs) {
          if (txtNat.indexOf(cleNat) !== -1) {
            var infoNat = mapDrapeauxNatifs[cleNat];
            if (btnNat.children && btnNat.children.length >= 2) {
              btnNat.children[0].textContent = infoNat.flag;
              btnNat.children[btnNat.children.length - 1].textContent = infoNat.code;
            } else {
              btnNat.innerHTML = '<span style="margin-right:3px;">' + infoNat.flag + '</span><span>' + infoNat.code + '</span>';
            }
            break;
          }
        }
      }

      function creerBoutonLangExt(idBtn, codeIso, emojiDrapeau, labelCourt) {
        var nvBtn = modeleBtn.cloneNode(true);
        nvBtn.id = idBtn;
        nvBtn.setAttribute("translate", "no");
        nvBtn.classList.add("notranslate");
        nvBtn.classList.remove("active");
        nvBtn.removeAttribute("onclick");
        nvBtn.removeAttribute("data-lang");
        if (nvBtn.children && nvBtn.children.length >= 2) {
          nvBtn.children[0].textContent = emojiDrapeau;
          nvBtn.children[nvBtn.children.length - 1].textContent = labelCourt;
        } else {
          nvBtn.innerHTML = '<span style="margin-right:3px;">' + emojiDrapeau + "</span><span>" + labelCourt + "</span>";
        }
        if (langExtActive === codeIso) nvBtn.classList.add("active-ext-v77");

        nvBtn.addEventListener("click", function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          restaurerTextesOriginauxDepuisExt();
          langExtActive = codeIso;
          langueNativeCible = "";
          try {
            localStorage.setItem("corantafsir_lang_ext_v77", codeIso);
            localStorage.setItem("corantafsir_user_lang_v77", codeIso);
            localStorage.setItem("corantafsir_manual_click_v77", "1");
          } catch (e) {}
          basculerDepuisArabeSurClicUtilisateur(conteneurLang, nvBtn);
          setTimeout(synchroniserTout, 15);
        });
        return nvBtn;
      }

      var btnDe = creerBoutonLangExt("btnLangDeV77", "de", "\\uD83C\\uDDE9\\uD83C\\uDDEA", "DE");
      var btnIt = creerBoutonLangExt("btnLangItV77", "it", "\\uD83C\\uDDEE\\uD83C\\uDDF9", "IT");
      var btnId = creerBoutonLangExt("btnLangIdV77", "id", "\\uD83C\\uDDEE\\uD83C\\uDDE9", "ID");
      var btnRu = creerBoutonLangExt("btnLangRuV77", "ru", "\\uD83C\\uDDF7\\uD83C\\uDDFA", "RU");

      for (var a = 0; a < freresInit.length; a++) {
        (function (autre) {
          autre.setAttribute("translate", "no");
          autre.classList.add("notranslate");
          autre.addEventListener("click", function () {
            if (IgnoreClicInterneFr) return;
            var etaitEnWbw = obtenirCartesMotAMotVisibles().length >= 2;
            langExtActive = "";
            langueNativeCible = "";
            var txtAutre = (autre.textContent || "").toUpperCase();
            var codeNatClique = txtAutre.indexOf("EN") !== -1 ? "en" : (txtAutre.indexOf("ES") !== -1 ? "es" : (txtAutre.indexOf("AR") !== -1 ? "ar" : "fr"));
            try {
              localStorage.setItem("corantafsir_lang_ext_v77", "native");
              localStorage.setItem("corantafsir_user_lang_v77", codeNatClique);
              localStorage.setItem("corantafsir_manual_click_v77", "1");
            } catch (e) {}
            btnDe.classList.remove("active-ext-v77");
            btnIt.classList.remove("active-ext-v77");
            btnId.classList.remove("active-ext-v77");
            btnRu.classList.remove("active-ext-v77");
            restaurerTextesOriginauxDepuisExt();

            setTimeout(function () {
              if (etaitEnWbw && obtenirCartesMotAMotVisibles().length === 0) {
                var btns = document.querySelectorAll("button, .btn");
                for (var bIdx = 0; bIdx < btns.length; bIdx++) {
                  var bt = (btns[bIdx].textContent || "").trim();
                  if (bt.indexOf("Mot à mot") !== -1 || bt.indexOf("Word by Word") !== -1 || bt.indexOf("كلمة بكلمة") !== -1 || bt.indexOf("Palabra por palabra") !== -1) {
                    btns[bIdx].click();
                    break;
                  }
                }
              }
              synchroniserTout();
            }, 25);
          });
        })(freresInit[a]);
      }

      conteneurLang.appendChild(btnDe);
      conteneurLang.appendChild(btnIt);
      conteneurLang.appendChild(btnId);
      conteneurLang.appendChild(btnRu);

      if (langExtActive && mapIds[langExtActive]) {
        basculerDepuisArabeSurClicUtilisateur(conteneurLang, document.getElementById(mapIds[langExtActive]));
      } else if (langueNativeCible) {
        cliquerBoutonNatifSiNecessaire(langueNativeCible);
      }
    }
  }

  function chargerChapitreOfficielExt(codeLang, chap) {
    var translationId = LANGUES_EXT_SUPPORTEES[codeLang];
    if (!chap || !translationId) return;
    var cle = codeLang + "_chap_" + chap;
    if (cacheChapitresExt[cle] || requetesChapExtEnCours[cle]) return;
    requetesChapExtEnCours[cle] = true;
    cacheChapitresExt[cle] = {};

    var urlApi = "https://api.quran.com/api/v4/quran/translations/" + translationId + "?chapter_number=" + chap;
    fetch(urlApi)
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.translations && d.translations.length > 0) {
          for (var j = 0; j < d.translations.length; j++) {
            var vk = chap + ":" + (j + 1);
            cacheChapitresExt[cle][vk] = nettoyerVersetBrutApi(d.translations[j].text || "");
          }
          try { localStorage.setItem("cache_ext_chap_v64", JSON.stringify(cacheChapitresExt)); } catch (e) {}
          if (langExtActive === codeLang) appliquerInterfaceEtContenuExt();
        }
      })
      .catch(function () {})
      .finally(function () {
        requetesChapExtEnCours[cle] = false;
      });
  }

  function traduireNoeudVersExtAsync(textNode, origTxt, codeLang) {
    if (!origTxt || origTxt.length < 3 || !LANGUES_EXT_SUPPORTEES[codeLang]) return;
    var cle = codeLang + "_" + origTxt.slice(0, 140) + "_" + origTxt.length;
    var esp1 = (textNode.__origExtV77 || textNode.nodeValue).match(/^\\s*/)[0];
    var esp2 = (textNode.__origExtV77 || textNode.nodeValue).match(/\\s*$/)[0];

    if (cacheTexteUnitaireExt[cle]) {
      modifierNoeudTexteSeul(textNode, esp1 + cacheTexteUnitaireExt[cle] + esp2);
      return;
    }

    if (requeteTexteExtEnCours[cle]) return;
    requeteTexteExtEnCours[cle] = true;

    var urlGtx = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" + codeLang + "&dt=t&q=" + encodeURIComponent(origTxt);
    fetch(urlGtx)
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res && res[0]) {
          var tr = "";
          for (var s = 0; s < res[0].length; s++) {
            if (res[0][s][0]) tr += res[0][s][0];
          }
          tr = affinerTraductionTheologique(tr, codeLang);
          if (tr) {
            cacheTexteUnitaireExt[cle] = tr;
            try { localStorage.setItem("cache_txt_unit_ext_v64", JSON.stringify(cacheTexteUnitaireExt)); } catch (e) {}
            if (langExtActive === codeLang) {
              modifierNoeudTexteSeul(textNode, esp1 + tr + esp2);
            }
          }
        }
      })
      .catch(function () {})
      .finally(function () {
        requeteTexteExtEnCours[cle] = false;
      });
  }

  var DICO_UI_PAR_LANG = {
    de: {
      "le noble coran & tafsīr": "DER EDLE KORAN & TAFSĪR",
      "le noble coran & tafsir": "DER EDLE KORAN & TAFSĪR",
      "the noble quran & tafsīr": "DER EDLE KORAN & TAFSĪR",
      "el noble corán y tafsīr": "DER EDLE KORAN & TAFSĪR",
      "le noble coran & tafsīr al-mukhtasar": "Der Edle Koran & Tafsīr Al-Mukhtasar",
      "the noble quran & tafsīr al-mukhtasar": "Der Edle Koran & Tafsīr Al-Mukhtasar",
      "‹ retour aux 114 sourates": "‹ Zurück zu den 114 Suren",
      "‹ back to 114 surahs": "‹ Zurück zu den 114 Suren",
      "‹ volver a las 114 suras": "‹ Zurück zu den 114 Suren",
      "sourate médinoise": "MEDINENSISCHE SURE",
      "medinan surah": "MEDINENSISCHE SURE",
      "sura medinense": "MEDINENSISCHE SURE",
      "sourate mecquoise": "MEKKANISCHE SURE",
      "makkan surah": "MEKKANISCHE SURE",
      "sura mequí": "MEKKANISCHE SURE",
      "📖 mot à mot": "📖 Wort für Wort",
      "mot à mot": "Wort für Wort",
      "📖 word by word": "📖 Wort für Wort",
      "word by word": "Wort für Wort",
      "🌊 bruit brun": "🌊 Braunes Rauschen",
      "bruit brun": "Braunes Rauschen",
      "🌊 brown noise": "🌊 Braunes Rauschen",
      "brown noise": "Braunes Rauschen",
      "✨ suivi": "✨ Verfolgung",
      "suivi": "Verfolgung",
      "✨ follow": "✨ Verfolgung",
      "follow": "Verfolgung",
      "enchaîner automatiquement": "Automatisch weiter",
      "auto-advance": "Automatisch weiter",
      "‹ précédent": "‹ Zurück",
      "‹ previous": "‹ Zurück",
      "suivant ›": "Weiter ›",
      "next ›": "Weiter ›",
      "▶ écouter le verset": "▶ Vers anhören",
      "▶ listen to verse": "▶ Vers anhören",
      "⏸ pause": "⏸ Pause",
      "↺ rejouer": "↺ Wiederholen",
      "↺ replay": "↺ Wiederholen",
      "tafsīr & explication du verset": "TAFSĪR & ERKLÄRUNG DES VERSES",
      "tafsīr & verse explanation": "TAFSĪR & ERKLÄRUNG DES VERSES",
      "tafsīr y explicación de la aleya": "TAFSĪR & ERKLÄRUNG DES VERSES",
      "madd (prolongation)": "Madd (Dehnung)",
      "lettre muette": "Stummer Buchstabe",
      "silent letter": "Stummer Buchstabe",
      "qu'est-ce qu'une sourate mecquoise ?": "Was ist eine mekkanische Sure?",
      "what is a meccan surah?": "Was ist eine mekkanische Sure?",
      "¿qué es una sura mequí?": "Was ist eine mekkanische Sure?",
      "qu'est-ce qu'une sourate médinoise ?": "Was ist eine medinensische Sure?",
      "what is a medinan surah?": "Was ist eine medinensische Sure?",
      "¿qué es una sura medinense?": "Was ist eine medinensische Sure?",
      "mecquoise • 86 sourates": "MEKKANISCH • 86 SUREN",
      "meccan • 86 surahs": "MEKKANISCH • 86 SUREN",
      "mequí • 86 suras": "MEKKANISCH • 86 SUREN",
      "médinoise • 28 sourates": "MEDINENSISCH • 28 SUREN",
      "medinan • 28 surahs": "MEDINENSISCH • 28 SUREN",
      "medinense • 28 suras": "MEDINENSISCH • 28 SUREN",
      "1. ordre de révélation (1 à 114)": "1. Offenbarungsreihenfolge (1–114)",
      "1. revelation order (1 to 114)": "1. Offenbarungsreihenfolge (1–114)",
      "1. orden de revelación (1 a 114)": "1. Offenbarungsreihenfolge (1–114)",
      "2. ordre du mushaf (1 à 114)": "2. Klassische Reihenfolge (1–114)",
      "2. ordre classique (1 à 114)": "2. Klassische Reihenfolge (1–114)",
      "2. traditional order (1 to 114)": "2. Klassische Reihenfolge (1–114)",
      "2. orden tradicional (1 a 114)": "2. Klassische Reihenfolge (1–114)",
      "⭐ 3. versets des miracles scientifiques": "3. ⭐ Wunder des Korans",
      "3. ⭐ miracles du coran": "3. ⭐ Wunder des Korans",
      "3. ⭐ les miracles du coran": "3. ⭐ Wunder des Korans",
      "les miracles du coran": "Wunder des Korans",
      "miracles du coran": "Wunder des Korans",
      "3. ⭐ miracles of the quran": "3. ⭐ Wunder des Korans",
      "miracles of the quran": "Wunder des Korans",
      "3. ⭐ milagros del corán": "3. ⭐ Wunder des Korans",
      "milagros del corán": "Wunder des Korans",
      "mecquoise": "MEKKANISCH",
      "meccan": "MEKKANISCH",
      "mequí": "MEKKANISCH",
      "médinoise": "MEDINENSISCH",
      "medinan": "MEDINENSISCH",
      "medinense": "MEDINENSISCH"
    },
    it: {
      "le noble coran & tafsīr": "IL NOBILE CORANO E TAFSĪR",
      "le noble coran & tafsir": "IL NOBILE CORANO E TAFSĪR",
      "the noble quran & tafsīr": "IL NOBILE CORANO E TAFSĪR",
      "el noble corán y tafsīr": "IL NOBILE CORANO E TAFSĪR",
      "le noble coran & tafsīr al-mukhtasar": "Il Nobile Corano e Tafsīr Al-Mukhtasar",
      "the noble quran & tafsīr al-mukhtasar": "Il Nobile Corano e Tafsīr Al-Mukhtasar",
      "‹ retour aux 114 sourates": "‹ Torna alle 114 Sure",
      "‹ back to 114 surahs": "‹ Torna alle 114 Sure",
      "‹ volver a las 114 suras": "‹ Torna alle 114 Sure",
      "sourate médinoise": "SURA MEDINESE",
      "medinan surah": "SURA MEDINESE",
      "sura medinense": "SURA MEDINESE",
      "sourate mecquoise": "SURA MECCANA",
      "makkan surah": "SURA MECCANA",
      "sura mequí": "SURA MECCANA",
      "📖 mot à mot": "📖 Parola per parola",
      "mot à mot": "Parola per parola",
      "📖 word by word": "📖 Parola per parola",
      "word by word": "Parola per parola",
      "🌊 bruit brun": "🌊 Rumore Marrone",
      "bruit brun": "Rumore Marrone",
      "🌊 brown noise": "🌊 Rumore Marrone",
      "brown noise": "Rumore Marrone",
      "✨ suivi": "✨ Seguito",
      "suivi": "Seguito",
      "✨ follow": "✨ Seguito",
      "follow": "Seguito",
      "enchaîner automatiquement": "Riproduzione automatica",
      "auto-advance": "Riproduzione automatica",
      "‹ précédent": "‹ Precedente",
      "‹ previous": "‹ Precedente",
      "suivant ›": "Successivo ›",
      "next ›": "Successivo ›",
      "▶ écouter le verset": "▶ Ascolta il versetto",
      "▶ listen to verse": "▶ Ascolta il versetto",
      "⏸ pause": "⏸ Pausa",
      "↺ rejouer": "↺ Riascolta",
      "↺ replay": "↺ Riascolta",
      "tafsīr & explication du verset": "TAFSĪR E SPIEGAZIONE DEL VERSETTO",
      "tafsīr & verse explanation": "TAFSĪR E SPIEGAZIONE DEL VERSETTO",
      "tafsīr y explicación de la aleya": "TAFSĪR E SPIEGAZIONE DEL VERSETTO",
      "madd (prolongation)": "Madd (Prolungamento)",
      "lettre muette": "Lettera muta",
      "silent letter": "Lettera muta",
      "qu'est-ce qu'une sourate mecquoise ?": "Cos'è una Sura Meccana?",
      "what is a meccan surah?": "Cos'è una Sura Meccana?",
      "¿qué es una sura mequí?": "Cos'è una Sura Meccana?",
      "qu'est-ce qu'une sourate médinoise ?": "Cos'è una Sura Medinese?",
      "what is a medinan surah?": "Cos'è una Sura Medinese?",
      "¿qué es una sura medinense?": "Cos'è una Sura Medinese?",
      "mecquoise • 86 sourates": "MECCANA • 86 SURE",
      "meccan • 86 surahs": "MECCANA • 86 SURE",
      "mequí • 86 suras": "MECCANA • 86 SURE",
      "médinoise • 28 sourates": "MEDINESE • 28 SURE",
      "medinan • 28 surahs": "MEDINESE • 28 SURE",
      "medinense • 28 suras": "MEDINESE • 28 SURE",
      "1. ordre de révélation (1 à 114)": "1. Ordine di Rivelazione (1–114)",
      "1. revelation order (1 to 114)": "1. Ordine di Rivelazione (1–114)",
      "1. orden de revelación (1 a 114)": "1. Ordine di Rivelazione (1–114)",
      "2. ordre du mushaf (1 à 114)": "2. Ordine Classico (1–114)",
      "2. ordre classique (1 à 114)": "2. Ordine Classico (1–114)",
      "2. traditional order (1 to 114)": "2. Ordine Classico (1–114)",
      "2. orden tradicional (1 a 114)": "2. Ordine Classico (1–114)",
      "⭐ 3. versets des miracles scientifiques": "3. ⭐ I Miracoli del Corano",
      "3. ⭐ miracles du coran": "3. ⭐ I Miracoli del Corano",
      "3. ⭐ les miracles du coran": "3. ⭐ I Miracoli del Corano",
      "les miracles du coran": "I Miracoli del Corano",
      "miracles du coran": "I Miracoli del Corano",
      "3. ⭐ miracles of the quran": "3. ⭐ I Miracoli del Corano",
      "miracles of the quran": "I Miracoli del Corano",
      "3. ⭐ milagros del corán": "3. ⭐ I Miracoli del Corano",
      "milagros del corán": "I Miracoli del Corano",
      "mecquoise": "MECCANA",
      "meccan": "MECCANA",
      "mequí": "MECCANA",
      "médinoise": "MEDINESE",
      "medinan": "MEDINESE",
      "medinense": "MEDINESE"
    },
    id: {
      "le noble coran & tafsīr": "AL-QUR'AN MULIA & TAFSĪR",
      "le noble coran & tafsir": "AL-QUR'AN MULIA & TAFSĪR",
      "the noble quran & tafsīr": "AL-QUR'AN MULIA & TAFSĪR",
      "el noble corán y tafsīr": "AL-QUR'AN MULIA & TAFSĪR",
      "le noble coran & tafsīr al-mukhtasar": "Al-Qur'an Mulia & Tafsīr Al-Mukhtasar",
      "the noble quran & tafsīr al-mukhtasar": "Al-Qur'an Mulia & Tafsīr Al-Mukhtasar",
      "‹ retour aux 114 sourates": "‹ Kembali ke 114 Surah",
      "‹ back to 114 surahs": "‹ Kembali ke 114 Surah",
      "‹ volver a las 114 suras": "‹ Kembali ke 114 Surah",
      "sourate médinoise": "SURAH MADANIYAH",
      "medinan surah": "SURAH MADANIYAH",
      "sura medinense": "SURAH MADANIYAH",
      "sourate mecquoise": "SURAH MAKKIYAH",
      "makkan surah": "SURAH MAKKIYAH",
      "sura mequí": "SURAH MAKKIYAH",
      "📖 mot à mot": "📖 Kata demi Kata",
      "mot à mot": "Kata demi Kata",
      "📖 word by word": "📖 Kata demi Kata",
      "word by word": "Kata demi Kata",
      "🌊 bruit brun": "🌊 Derau Cokelat",
      "bruit brun": "Derau Cokelat",
      "🌊 brown noise": "🌊 Derau Cokelat",
      "brown noise": "Derau Cokelat",
      "✨ suivi": "✨ Ikuti Bacaan",
      "suivi": "Ikuti Bacaan",
      "✨ follow": "✨ Ikuti Bacaan",
      "follow": "Ikuti Bacaan",
      "enchaîner automatiquement": "Putar otomatis",
      "auto-advance": "Putar otomatis",
      "‹ précédent": "‹ Sebelumnya",
      "‹ previous": "‹ Sebelumnya",
      "suivant ›": "Berikutnya ›",
      "next ›": "Berikutnya ›",
      "▶ écouter le verset": "▶ Dengarkan Ayat",
      "▶ listen to verse": "▶ Dengarkan Ayat",
      "⏸ pause": "⏸ Jeda",
      "↺ rejouer": "↺ Ulangi",
      "↺ replay": "↺ Ulangi",
      "tafsīr & explication du verset": "TAFSĪR & PENJELASAN AYAT",
      "tafsīr & verse explanation": "TAFSĪR & PENJELASAN AYAT",
      "tafsīr y explicación de la aleya": "TAFSĪR & PENJELASAN AYAT",
      "madd (prolongation)": "Mad (Bacaan Panjang)",
      "lettre muette": "Huruf Bisu",
      "silent letter": "Huruf Bisu",
      "qu'est-ce qu'une sourate mecquoise ?": "Apa itu Surah Makkiyah?",
      "what is a meccan surah?": "Apa itu Surah Makkiyah?",
      "¿qué es una sura mequí?": "Apa itu Surah Makkiyah?",
      "qu'est-ce qu'une sourate médinoise ?": "Apa itu Surah Madaniyah?",
      "what is a medinan surah?": "Apa itu Surah Madaniyah?",
      "¿qué es una sura medinense?": "Apa itu Surah Madaniyah?",
      "mecquoise • 86 sourates": "MAKKIYAH • 86 SURAH",
      "meccan • 86 surahs": "MAKKIYAH • 86 SURAH",
      "mequí • 86 suras": "MAKKIYAH • 86 SURAH",
      "médinoise • 28 sourates": "MADANIYAH • 28 SURAH",
      "medinan • 28 surahs": "MADANIYAH • 28 SURAH",
      "medinense • 28 suras": "MADANIYAH • 28 SURAH",
      "1. ordre de révélation (1 à 114)": "1. Urutan Turunnya Wahyu (1–114)",
      "1. revelation order (1 to 114)": "1. Urutan Turunnya Wahyu (1–114)",
      "1. orden de revelación (1 a 114)": "1. Urutan Turunnya Wahyu (1–114)",
      "2. ordre du mushaf (1 à 114)": "2. Urutan Mushaf (1–114)",
      "2. ordre classique (1 à 114)": "2. Urutan Mushaf (1–114)",
      "2. traditional order (1 to 114)": "2. Urutan Mushaf (1–114)",
      "2. orden tradicional (1 a 114)": "2. Urutan Mushaf (1–114)",
      "⭐ 3. versets des miracles scientifiques": "3. ⭐ Mukjizat Al-Qur'an",
      "3. ⭐ miracles du coran": "3. ⭐ Mukjizat Al-Qur'an",
      "3. ⭐ les miracles du coran": "3. ⭐ Mukjizat Al-Qur'an",
      "les miracles du coran": "Mukjizat Al-Qur'an",
      "miracles du coran": "Mukjizat Al-Qur'an",
      "3. ⭐ miracles of the quran": "3. ⭐ Mukjizat Al-Qur'an",
      "miracles of the quran": "Mukjizat Al-Qur'an",
      "3. ⭐ milagros del corán": "3. ⭐ Mukjizat Al-Qur'an",
      "milagros del corán": "Mukjizat Al-Qur'an",
      "mecquoise": "MAKKIYAH",
      "meccan": "MAKKIYAH",
      "mequí": "MAKKIYAH",
      "médinoise": "MADANIYAH",
      "medinan": "MADANIYAH",
      "medinense": "MADANIYAH"
    },
    ru: {
      "le noble coran & tafsīr": "СВЯЩЕННЫЙ КОРАН И ТАФСИР",
      "le noble coran & tafsir": "СВЯЩЕННЫЙ КОРАН И ТАФСИР",
      "the noble quran & tafsīr": "СВЯЩЕННЫЙ КОРАН И ТАФСИР",
      "el noble corán y tafsīr": "СВЯЩЕННЫЙ КОРАН И ТАФСИР",
      "le noble coran & tafsīr al-mukhtasar": "Священный Коран и Тафсир аль-Мухтасар",
      "the noble quran & tafsīr al-mukhtasar": "Священный Коран и Тафсир аль-Мухтасар",
      "‹ retour aux 114 sourates": "‹ Назад к 114 сурам",
      "‹ back to 114 surahs": "‹ Назад к 114 сурам",
      "‹ volver a las 114 suras": "‹ Назад к 114 сурам",
      "sourate médinoise": "МЕДИНСКАЯ СУРА",
      "medinan surah": "МЕДИНСКАЯ СУРА",
      "sura medinense": "МЕДИНСКАЯ СУРА",
      "sourate mecquoise": "МЕККАНСКАЯ СУРА",
      "makkan surah": "МЕККАНСКАЯ СУРА",
      "sura mequí": "МЕККАНСКАЯ СУРА",
      "📖 mot à mot": "📖 Пословный перевод",
      "mot à mot": "Пословный перевод",
      "📖 word by word": "📖 Пословный перевод",
      "word by word": "Пословный перевод",
      "🌊 bruit brun": "🌊 Коричневый шум",
      "bruit brun": "Коричневый шум",
      "🌊 brown noise": "🌊 Коричневый шум",
      "brown noise": "Коричневый шум",
      "✨ suivi": "✨ Слежение",
      "suivi": "Слежение",
      "✨ follow": "✨ Слежение",
      "follow": "Слежение",
      "enchaîner automatiquement": "Автопереход",
      "auto-advance": "Автопереход",
      "‹ précédent": "‹ Назад",
      "‹ previous": "‹ Назад",
      "suivant ›": "Далее ›",
      "next ›": "Далее ›",
      "▶ écouter le verset": "▶ Слушать аят",
      "▶ listen to verse": "▶ Слушать аят",
      "⏸ pause": "⏸ Пауза",
      "↺ rejouer": "↺ Повторить",
      "↺ replay": "↺ Повторить",
      "tafsīr & explication du verset": "ТАФСИР И ТОЛКОВАНИЕ АЯТА",
      "tafsīr & verse explanation": "ТАФСИР И ТОЛКОВАНИЕ АЯТА",
      "tafsīr y explicación de la aleya": "ТАФСИР И ТОЛКОВАНИЕ АЯТА",
      "madd (prolongation)": "Мадд (Удлинение)",
      "lettre muette": "Немая буква",
      "silent letter": "Немая буква",
      "qu'est-ce qu'une sourate mecquoise ?": "Что такое мекканская сура?",
      "what is a meccan surah?": "Что такое мекканская сура?",
      "¿qué es una sura mequí?": "Что такое мекканская сура?",
      "qu'est-ce qu'une sourate médinoise ?": "Что такое мединская сура?",
      "what is a medinan surah?": "Что такое мединская сура?",
      "¿qué es una sura medinense?": "Что такое мединская сура?",
      "mecquoise • 86 sourates": "МЕККАНСКАЯ • 86 СУР",
      "meccan • 86 surahs": "МЕККАНСКАЯ • 86 СУР",
      "mequí • 86 suras": "МЕККАНСКАЯ • 86 СУР",
      "médinoise • 28 sourates": "МЕДИНСКАЯ • 28 СУР",
      "medinan • 28 surahs": "МЕДИНСКАЯ • 28 СУР",
      "medinense • 28 suras": "МЕДИНСКАЯ • 28 СУР",
      "1. ordre de révélation (1 à 114)": "1. По порядку ниспослания (1–114)",
      "1. revelation order (1 to 114)": "1. По порядку ниспослания (1–114)",
      "1. orden de revelación (1 a 114)": "1. По порядку ниспослания (1–114)",
      "2. ordre du mushaf (1 à 114)": "2. По порядку Мусхафа (1–114)",
      "2. ordre classique (1 à 114)": "2. По порядку Мусхафа (1–114)",
      "2. traditional order (1 to 114)": "2. По порядку Мусхафа (1–114)",
      "2. orden tradicional (1 a 114)": "2. По порядку Мусхафа (1–114)",
      "⭐ 3. versets des miracles scientifiques": "3. ⭐ Чудеса Корана",
      "3. ⭐ miracles du coran": "3. ⭐ Чудеса Корана",
      "3. ⭐ les miracles du coran": "3. ⭐ Чудеса Корана",
      "les miracles du coran": "Чудеса Корана",
      "miracles du coran": "Чудеса Корана",
      "3. ⭐ miracles of the quran": "3. ⭐ Чудеса Корана",
      "miracles of the quran": "Чудеса Корана",
      "3. ⭐ milagros del corán": "3. ⭐ Чудеса Корана",
      "milagros del corán": "Чудеса Корана",
      "mecquoise": "МЕККАНСКАЯ",
      "meccan": "МЕККАНСКАЯ",
      "mequí": "МЕККАНСКАЯ",
      "médinoise": "МЕДИНСКАЯ",
      "medinan": "МЕДИНСКАЯ",
      "medinense": "МЕДИНСКАЯ"
    }
  };

  var TEXTES_INTRO_ACCUEIL = {
    de: {
      mecq: "Offenbart zu Beginn der Prophetie (vor der Hidschra), als die Gläubigen in Mekka noch wenige waren: begründet die reine Einheit Allāhs (Tawhīd), die Beweise des Glaubens, das Jüngste Gericht und die Geschichten der Propheten.",
      med: "Offenbart nach der Hidschra, als die Muslime zahlreich wurden, vereint in Medina, siegreich in den großen Schlachten (wie Badr) bis zur Eroberung Mekkas: regelt die Gottesdienste, die sozialen Gesetze und die Gerechtigkeit."
    },
    it: {
      mecq: "Rivelata all'inizio della profezia (prima dell'Egira), quando i credenti erano ancora pochi alla Mecca: fonda la pura Unicità di Allāh (Tawhīd), le prove della fede, il Giudizio Finale e la storia dei Profeti.",
      med: "Rivelata dopo l'Egira, quando i musulmani divennero numerosi, uniti a Medina, vittoriosi nelle grandi battaglie (come Badr) fino alla conquista della Mecca: dettaglia le adorazioni, le leggi sociali e la giustizia."
    },
    id: {
      mecq: "Diturunkan pada awal kenabian (sebelum Hijrah), ketika kaum mukminin masih sedikit di Mekkah: menegakkan kemurnian Tauhid kepada Allah, bukti-bukti keimanan, Hari Kiamat, dan kisah para Nabi.",
      med: "Diturunkan setelah Hijrah, ketika umat Islam telah banyak dan bersatu di Madinah, menang dalam pertempuran besar (seperti Badar) hingga penaklukan Mekkah: merinci ibadah, hukum sosial, dan keadilan."
    },
    ru: {
      mecq: "Ниспослана в начале пророчества (до Хиджры), когда верующих в Мекке было ещё мало: утверждает чистое Единобожие Аллаха (Таухид), доказательства веры, Судный день и истории Пророков.",
      med: "Ниспослана после Хиджры, когда мусульмане стали многочисленными и объединились в Медине, одержав победу в великих битвах (как при Бадре) вплоть до открытия Мекки: разъясняет поклонение, общественные законы и справедливость."
    }
  };

  function trouverBoiteTafsirBas() {
    var els = document.querySelectorAll("div, p, span, h3, h4");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.children.length > 0) continue;
      var t = (el.textContent || "").trim().toUpperCase();
      if (t.indexOf("TAFSĪR") !== -1 || t.indexOf("ТАФСИР") !== -1 || t.indexOf("تفسير") !== -1) {
        return el.parentElement;
      }
    }
    return null;
  }

  function appliquerInterfaceEtContenuExt() {
    var codeL = langExtActive;
    if (!LANGUES_EXT_SUPPORTEES[codeL] || !document.body) return;

    var vk = obtenirCleVerset();
    var parts = vk ? vk.split(":") : [];
    var numS = parts.length === 2 ? Number(parts[0]) : 0;
    var numV = parts.length === 2 ? Number(parts[1]) : 0;

    var cleChap = codeL + "_chap_" + numS;
    if (numS && !cacheChapitresExt[cleChap]) {
      chargerChapitreOfficielExt(codeL, numS);
    }
    var texteOfficielVerset = (numS && cacheChapitresExt[cleChap]) ? cacheChapitresExt[cleChap][vk] : null;
    var dicoUi = DICO_UI_PAR_LANG[codeL];
    var noms114 = NOMS_114_ACCUEIL[codeL] || {};
    var introTxt = TEXTES_INTRO_ACCUEIL[codeL];

    var placeholders = {
      de: "Suche nach einer Sure oder einem Vers (z.B. 2:255, 30:1, Al-Kahf...)",
      it: "Cerca una Sura o un versetto (es. 2:255, 30:1, Al-Kahf...)",
      id: "Cari Surah atau ayat (misal: 2:255, 30:1, Al-Kahf...)",
      ru: "Поиск суры или аята (например: 2:255, 30:1, Аль-Кахф...)"
    };
    var inputs = document.querySelectorAll("input[type='text'], input[type='search'], input:not([type])");
    for (var inp = 0; inp < inputs.length; inp++) {
      inputs[inp].setAttribute("placeholder", placeholders[codeL]);
    }

    var cartesAccueil = document.querySelectorAll("a[href*='sourate-']");
    for (var ca = 0; ca < cartesAccueil.length; ca++) {
      var lienCarte = cartesAccueil[ca];
      if (lienCarte.closest("#khatmPlannerWidgetV77")) continue;
      var mHref = (lienCarte.getAttribute("href") || "").match(/sourate-(\\d+)/i);
      if (mHref) {
        var sId = Number(mHref[1]);
        if (noms114[sId]) {
          var titresEl = lienCarte.querySelectorAll("h2, h3, h4, div, span");
          for (var te = 0; te < titresEl.length; te++) {
            var candT = titresEl[te];
            if (candT.children.length === 0) {
              var origT = (candT.__origTitreV77 || candT.textContent || "").trim();
              if (origT.indexOf("(") !== -1 && origT.indexOf(")") !== -1 && origT.indexOf("Miracle") === -1 && origT.indexOf("Wunder") === -1 && origT.indexOf("Milagro") === -1) {
                if (!candT.__origTitreV77) candT.__origTitreV77 = origT;
                if (candT.firstChild && candT.firstChild.nodeType === 3) {
                  modifierNoeudTexteSeul(candT.firstChild, noms114[sId]);
                }
                break;
              }
            }
          }
        }
      }
    }

    var conteneurArabe = document.querySelector("#arabicVerse, .arabic-glow-verse");
    var rectArabe = conteneurArabe ? conteneurArabe.getBoundingClientRect() : null;
    var boiteTafsir = trouverBoiteTafsirBas();
    var versetHautDejaRemplace = false;

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var pEl = node.parentElement;
      if (!pEl) continue;
      var tag = pEl.tagName;
      if (tag === "SCRIPT" || tag === "STYLE") continue;
      if (pEl.closest(".wbw-card-unit") || pEl.id === "wbwSensLectureBanner" || pEl.closest(".notranslate") || pEl.closest("#khatmPlannerWidgetV77")) continue;

      var val = (node.__origExtV77 !== undefined ? node.__origExtV77 : node.nodeValue || "").replace(/\\u00A0/g, " ").trim();
      if (!val || /[\\u0600-\\u06FF]/.test(val)) continue;
      var valLower = val.toLowerCase();

      if (dicoUi[valLower]) {
        modifierNoeudTexteSeul(node, dicoUi[valLower]);
        continue;
      }

      if (introTxt && (valLower.indexOf("tawhid") !== -1 || valLower.indexOf("hégire") !== -1 || valLower.indexOf("hijrah") !== -1)) {
        if (valLower.indexOf("tawhid") !== -1) {
          modifierNoeudTexteSeul(node, introTxt.mecq);
        } else {
          modifierNoeudTexteSeul(node, introTxt.med);
        }
        pEl.classList.add("panneau-opaque-v77");
        continue;
      }

      var matchVersetsCourt = val.match(/^(\\d+)\\s*(?:v\\.|a\\.|versets|verses|aleyas)$/i);
      if (matchVersetsCourt) {
        var nbV = matchVersetsCourt[1];
        var unitV = { de: nbV + " Verse", it: nbV + " versetti", id: nbV + " ayat", ru: nbV + " аятов" }[codeL];
        modifierNoeudTexteSeul(node, unitV);
        continue;
      }

      if (valLower.indexOf("safari") !== -1 || valLower.indexOf("android") !== -1 || valLower.indexOf("iphone") !== -1) {
        var txtPwa = {
          de: "📲 App auf Ihrem Telefon installieren (iPhone / Android)",
          it: "📲 Installa l'App sul tuo telefono (iPhone / Android)",
          id: "📲 Pasang Aplikasi di ponsel Anda (iPhone / Android)",
          ru: "📲 Установить приложение на телефон (iPhone / Android)"
        }[codeL];
        modifierNoeudTexteSeul(node, txtPwa);
        continue;
      }

      if (/(?:Verset|Verse|Aleya)\\s+\\d+\\s*\\/\\s*\\d+/i.test(val)) {
        var mapMotVers = { de: "Vers", it: "Versetto", id: "Ayat", ru: "Аят" };
        var mapMotMir = { de: "Wunder", it: "Miracolo", id: "Mukjizat", ru: "Чудо" };
        modifierNoeudTexteSeul(node, val.replace(/Verset|Verse|Aleya/gi, mapMotVers[codeL]).replace(/Miracle/gi, mapMotMir[codeL]));
        continue;
      }

      var mMirBadge = val.match(/(?:Miracle|Milagro)\\s*[:\\(]\\s*(?:V\\.?|A\\.?|Verset|Verse)\\s*(\\d+)\\)?/i);
      if (mMirBadge) {
        var vNumMir = mMirBadge[1];
        var txtMir = {
          de: "⭐ WUNDER (VERS " + vNumMir + ")",
          it: "⭐ MIRACOLO (V. " + vNumMir + ")",
          id: "⭐ MUKJIZAT (AYAT " + vNumMir + ")",
          ru: "⭐ ЧУДО (АЯТ " + vNumMir + ")"
        }[codeL];
        modifierNoeudTexteSeul(node, txtMir);
        continue;
      }

      if ((val.indexOf("Sourate ") === 0 || val.indexOf("Surah ") === 0 || val.indexOf("Sure ") === 0 || val.indexOf("Sura ") === 0) && (val.indexOf(" — Verset ") !== -1 || val.indexOf(" — Verse ") !== -1 || val.indexOf(" — Aleya ") !== -1)) {
        var prefS = { de: "Sure ", it: "Sura ", id: "Surah ", ru: "Сура " }[codeL];
        var prefV = { de: " — Vers ", it: " — Versetto ", id: " — Ayat ", ru: " — Аят " }[codeL];
        if (numS && noms114[numS]) {
          modifierNoeudTexteSeul(node, prefS + noms114[numS] + prefV + numV);
        } else {
          modifierNoeudTexteSeul(node, val.replace(/^Sourate |^Surah |^Sura /, prefS).replace(/ — Verset | — Verse | — Aleya /, prefV));
        }
        continue;
      }

      var rectP = pEl.getBoundingClientRect();
      var estDansTafsir = boiteTafsir && boiteTafsir.contains(pEl);
      if (
        !estDansTafsir &&
        !versetHautDejaRemplace &&
        numV &&
        rectArabe &&
        rectP.top >= rectArabe.top &&
        rectP.top <= rectArabe.bottom + 180 &&
        new RegExp("^" + numV + "\\\\s*[\\\\.-]\\\\s+").test(val)
      ) {
        versetHautDejaRemplace = true;
        if (texteOfficielVerset) {
          modifierNoeudTexteSeul(node, numV + ". " + texteOfficielVerset);
        } else {
          traduireNoeudVersExtAsync(node, val, codeL);
        }
        continue;
      }

      var estSousVerset = (estDansTafsir || (rectArabe && rectP.top > rectArabe.bottom + 75)) && val.length >= 3;
      if (estSousVerset) {
        if (
          val.indexOf("Traduction originale") === -1 &&
          val.indexOf("Deutsche Übersetzung") === -1 &&
          val.indexOf("Traduzione italiana") === -1 &&
          val.indexOf("Terjemahan Kementerian") === -1 &&
          val.indexOf("Смысловой перевод") === -1 &&
          val.indexOf("Translation by Saheeh") === -1 &&
          val.indexOf("Traducción de Sheikh Isa García") === -1 &&
          val.indexOf("TAFSĪR") === -1
        ) {
          traduireNoeudVersExtAsync(node, val, codeL);
        }
      }
    }
  }

  function corrigerCoquillesNativesEtTafsir() {
    var lang = obtenirLangueActive();
    var pEls = document.querySelectorAll("p, button, strong, b, span");
    for (var i = 0; i < pEls.length; i++) {
      var el = pEls[i];
      if (el.children.length > 0 || el.closest("#khatmPlannerWidgetV77")) continue;
      var t = el.textContent || "";
      if (t.indexOf("y e temen") !== -1) {
        el.textContent = t.replace("y e temen", "y le temen");
      }
      if ((lang === "es" || lang === "it") && t.trim() === "⏸ Pause") {
        el.textContent = "⏸ Pausa";
      }
      if (/^\\d+\\s*\\.\\s+(?:Le Livre par excellence|This is the Qur'ān|El Libro por excelencia|Das Buch schlechthin|Il Libro per eccellenza|Kitab yang paling|Лучшей книгой)/i.test(t.trim())) {
        el.textContent = t.trim().replace(/^\\d+\\s*\\.\\s+/, "");
      }
    }
  }

  var suiviEstActif = true;

  function assurerBoutonSuiviVisible() {
    if (!obtenirCleVerset()) return;
    var tousBtns = document.querySelectorAll("button, .btn, span[role='button']");
    var btnSuivi = null;
    var btnTajwid = null;
    for (var i = 0; i < tousBtns.length; i++) {
      var b = tousBtns[i];
      var t = (b.textContent || "").trim();
      if (t.indexOf("Suivi") !== -1 || t.indexOf("Follow") !== -1 || t.indexOf("Seguimiento") !== -1 || t.indexOf("Verfolgung") !== -1 || t.indexOf("Seguito") !== -1 || t.indexOf("Ikuti") !== -1 || t.indexOf("Слежение") !== -1 || t.indexOf("تتبع") !== -1) {
        btnSuivi = b;
      } else if (t.indexOf("Tajw") !== -1 || t.indexOf("تجويد") !== -1) {
        btnTajwid = b;
      }
    }

    var mapLabelsSuivi = { de: "✨ Verfolgung", it: "✨ Seguito", id: "✨ Ikuti Bacaan", ru: "✨ Слежение" };
    var labelSuivi = mapLabelsSuivi[langExtActive] || "✨ Suivi";

    if (btnSuivi) {
      btnSuivi.style.setProperty("display", "inline-flex", "important");
      btnSuivi.style.setProperty("visibility", "visible", "important");
      btnSuivi.style.setProperty("opacity", "1", "important");
      if (btnSuivi.id === "btnSuiviUniverselV77" && btnSuivi.textContent !== labelSuivi) {
        btnSuivi.textContent = labelSuivi;
      }
      if (suiviEstActif) {
        btnSuivi.style.setProperty("background", "linear-gradient(135deg, #0ea5e9, #38bdf8)", "important");
        btnSuivi.style.setProperty("color", "#ffffff", "important");
      } else {
        btnSuivi.style.removeProperty("background");
      }
    } else if (btnTajwid && btnTajwid.parentElement && !document.getElementById("btnSuiviUniverselV77")) {
      var nv = document.createElement("button");
      nv.id = "btnSuiviUniverselV77";
      nv.type = "button";
      nv.className = btnTajwid.className;
      nv.textContent = labelSuivi;
      nv.style.setProperty("background", "linear-gradient(135deg, #0ea5e9, #38bdf8)", "important");
      nv.style.setProperty("color", "#ffffff", "important");
      nv.style.setProperty("margin-left", "6px", "important");
      btnTajwid.parentElement.insertBefore(nv, btnTajwid.nextSibling);
    }
  }

  var astresDejaVerrouilles = false;
  function reparerSoleilEtLuneEnOrbite() {
    if (astresDejaVerrouilles && document.querySelector(".astre-soleil-pur-v77") && document.querySelector(".astre-lune-pure-v77")) {
      return;
    }

    var tousDivs = document.querySelectorAll("div, span, canvas");
    var spheresTrouvees = [];

    for (var i = 0; i < tousDivs.length; i++) {
      var el = tousDivs[i];
      var idCls = ((el.id || "") + " " + (el.className && typeof el.className === "string" ? el.className : "")).toLowerCase();

      var estNommeSun = idCls.indexOf("sun") !== -1 || idCls.indexOf("soleil") !== -1 || el.getAttribute("data-astre-role") === "sun";
      var estNommeMoon = idCls.indexOf("moon") !== -1 || idCls.indexOf("lune") !== -1 || el.getAttribute("data-astre-role") === "moon";

      var r = el.getBoundingClientRect();
      var estRondVide =
        r.width >= 55 &&
        r.width <= 320 &&
        Math.abs(r.width - r.height) <= 10 &&
        (el.textContent || "").trim() === "" &&
        !el.querySelector("button, input, select, p, a, img");

      if (estNommeSun || estNommeMoon || estRondVide) {
        var st = window.getComputedStyle(el);
        var br = st.borderRadius || "";
        if (estNommeSun || estNommeMoon || br.indexOf("50%") !== -1 || parseFloat(br) >= r.width * 0.4) {
          var styleStr = ((el.getAttribute("style") || "") + " " + (st.boxShadow || "") + " " + (st.backgroundImage || "") + " " + (st.backgroundColor || "")).toLowerCase();
          var aCouleurSoleil =
            styleStr.indexOf("250, 204, 21") !== -1 || styleStr.indexOf("245, 158, 11") !== -1 ||
            styleStr.indexOf("253, 224, 71") !== -1 || styleStr.indexOf("234, 88, 12") !== -1 ||
            styleStr.indexOf("255, 215") !== -1 || styleStr.indexOf("255, 180") !== -1 ||
            styleStr.indexOf("facc15") !== -1 || styleStr.indexOf("fde047") !== -1 ||
            styleStr.indexOf("f59e0b") !== -1 || styleStr.indexOf("0, 210, 255") !== -1 ||
            styleStr.indexOf("56, 189, 248") !== -1;

          spheresTrouvees.push({
            el: el, cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: r.width,
            isSun: estNommeSun || (!estNommeMoon && aCouleurSoleil), isMoon: estNommeMoon
          });
        }
      }
    }

    var astresPrincipaux = [];
    for (var j = 0; j < spheresTrouvees.length; j++) {
      var s = spheresTrouvees[j];
      var doublonSuperpose = false;
      for (var k = 0; k < astresPrincipaux.length; k++) {
        var p = astresPrincipaux[k];
        if (Math.hypot(s.cx - p.cx, s.cy - p.cy) < 48) {
          doublonSuperpose = true;
          s.el.style.setProperty("display", "none", "important");
          break;
        }
      }
      if (!doublonSuperpose) astresPrincipaux.push(s);
    }

    var soleilDejaTrouve = false;
    for (var m = 0; m < astresPrincipaux.length; m++) {
      if (astresPrincipaux[m].isSun) soleilDejaTrouve = true;
    }

    for (var n = 0; n < astresPrincipaux.length; n++) {
      var astre = astresPrincipaux[n];
      var node = astre.el;
      if (node.children && node.children.length > 0) node.innerHTML = "";

      var role = node.getAttribute("data-astre-role");
      if (!role) {
        if (astre.isSun || (!soleilDejaTrouve && !astre.isMoon && n === 0)) {
          role = "sun";
          soleilDejaTrouve = true;
        } else {
          role = "moon";
        }
        node.setAttribute("data-astre-role", role);
      }

      if (role === "sun") {
        node.classList.remove("astre-lune-pure-v77");
        node.classList.add("astre-soleil-pur-v77");
      } else {
        node.classList.remove("astre-soleil-pur-v77");
        node.classList.add("astre-lune-pure-v77");
      }
    }
    if (astresPrincipaux.length >= 2) {
      astresDejaVerrouilles = true;
    }
  }

  function retirerRecitateurMaher() {
    var imgs = document.querySelectorAll("img");
    for (var im = 0; im < imgs.length; im++) {
      var src = (imgs[im].getAttribute("src") || "").toLowerCase();
      imgs[im].setAttribute("loading", "lazy");
      if (src.indexOf("maher") !== -1 || src.indexOf("muaiqly") !== -1) {
        var row = imgs[im].parentElement;
        if (row && row.getBoundingClientRect().height < 110) {
          row.classList.add("maher-supprime-v77");
          if (row.parentNode) row.parentNode.removeChild(row);
        }
      }
    }
  }

  function obtenirLangueActive() {
    if (langExtActive && LANGUES_EXT_SUPPORTEES[langExtActive]) return langExtActive;

    var btnDeRef = document.getElementById("btnLangDeV77");
    if (btnDeRef && btnDeRef.parentElement) {
      var ch = btnDeRef.parentElement.children;
      for (var i = 0; i < ch.length; i++) {
        if (ch[i].classList.contains("active")) {
          var t = (ch[i].textContent || "").toUpperCase();
          if (t.indexOf("EN") !== -1) return "en";
          if (t.indexOf("ES") !== -1) return "es";
          if (t.indexOf("AR") !== -1) return "ar";
          if (t.indexOf("FR") !== -1) return "fr";
        }
      }
    }

    var bodyTxt = document.body ? document.body.innerText : "";
    if (bodyTxt.indexOf("Escuchar aleya") !== -1 || bodyTxt.indexOf("EXPLICACIÓN DE LA ALEYA") !== -1 || bodyTxt.indexOf("EL NOBLE CORÁN") !== -1 || bodyTxt.indexOf("¿Qué es una Sura") !== -1) return "es";
    if (bodyTxt.indexOf("Listen to verse") !== -1 || bodyTxt.indexOf("VERSE EXPLANATION") !== -1 || bodyTxt.indexOf("THE NOBLE QURAN") !== -1 || bodyTxt.indexOf("What is a Meccan") !== -1) return "en";
    if (bodyTxt.indexOf("استمع للآية") !== -1 || bodyTxt.indexOf("تفسير الآية") !== -1 || bodyTxt.indexOf("ترتيب النزول") !== -1 || bodyTxt.indexOf("ما هي السورة المكية") !== -1) return "ar";
    return "fr";
  }

  function mettreAJourMentionsTraducteurEtExegese() {
    var lang = obtenirLangueActive();
    var textesBas = {
      fr: "Traduction originale de Muhammad Hamidullah (1977) • Exégèse (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      en: "Translation by Saheeh International • Exegesis (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      es: "Traducción de Sheikh Isa García • Exégesis (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      de: "Deutsche Übersetzung von Frank Bubenheim & Nadeem Elyas • Exegese (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      it: "Traduzione italiana di Hamza Roberto Piccardo • Esegesi (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      id: "Terjemahan Kementerian Agama RI (Kemenag) • Tafsir Al-Mukhtasar & Ibnu Katsir",
      ru: "Смысловой перевод Эльмира Кулиева • Тафсир аль-Мухтасар и Ибн Касир",
      ar: "النص القرآني بالرسم العثماني • التفسير المختصر وتفسير ابن كثير وأسباب النزول"
    };
    var textesHaut = {
      fr: "Traduction Muhammad Hamidullah (1977) & Exégèse",
      en: "Saheeh International & Exegesis",
      es: "Traducción Sheikh Isa García y Exégesis",
      de: "Übersetzung Bubenheim & Elyas & Exegese (Tafsīr)",
      it: "Traduzione Hamza Roberto Piccardo & Esegesi (Tafsīr)",
      id: "Terjemahan Kemenag RI & Tafsir Al-Mukhtasar",
      ru: "Перевод Э. Кулиева и Тафсир аль-Мухтасар",
      ar: "التفسير المختصر وتفسير ابن كثير وأسباب النزول"
    };

    var tous = document.querySelectorAll("p, div, span, small, footer");
    for (var i = 0; i < tous.length; i++) {
      var el = tous[i];
      if (el.children.length > 0) continue;
      var txt = (el.textContent || "").trim();
      if (!txt) continue;

      if (
        txt.indexOf("Traduction originale de Muhammad Hamidullah") !== -1 ||
        txt.indexOf("Translation by Saheeh International") !== -1 ||
        txt.indexOf("Traducción de Abdel Ghani Melara") !== -1 ||
        txt.indexOf("Traducción de Sheikh Isa García") !== -1 ||
        txt.indexOf("Deutsche Übersetzung von Frank Bubenheim") !== -1 ||
        txt.indexOf("Traduzione italiana di Hamza Roberto Piccardo") !== -1 ||
        txt.indexOf("Terjemahan Kementerian Agama RI") !== -1 ||
        txt.indexOf("Смысловой перевод Эльмира Кулиева") !== -1 ||
        txt.indexOf("النص القرآني بالرسم العثماني") !== -1
      ) {
        if (el.textContent !== textesBas[lang]) {
          el.textContent = textesBas[lang];
          el.style.setProperty("direction", lang === "ar" ? "rtl" : "ltr", "important");
        }
      }

      if (
        txt.indexOf("Traduction Muhammad Hamidullah") !== -1 ||
        txt.indexOf("Saheeh International & Exegesis") !== -1 ||
        txt.indexOf("Traducción Abdel Ghani Melara") !== -1 ||
        txt.indexOf("Traducción Sheikh Isa García") !== -1 ||
        txt.indexOf("Übersetzung Bubenheim & Elyas") !== -1 ||
        txt.indexOf("Traduzione Hamza Roberto Piccardo") !== -1 ||
        txt.indexOf("Terjemahan Kemenag RI") !== -1 ||
        txt.indexOf("Перевод Э. Кулиева") !== -1 ||
        txt.indexOf("التفسير المختصر وتفسير ابن كثير") !== -1
      ) {
        var parts = txt.split("•");
        if (parts.length >= 2) {
          var lieu = parts[0].trim();
          var nv = lieu + " • " + textesHaut[lang];
          if (el.textContent !== nv) el.textContent = nv;
        }
      }
    }
  }

  var DICO_MULTILINGUE = {
    fr: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn", "طه": "Tā-Hā",
      "ذلك": "Ce (C'est)", "الكتاب": "le Livre", "لا": "ne...pas / point de", "ريب": "doute", "فيه": "en lui", "هدى": "un guide", "للمتقين": "pour les pieux",
      "ختم": "a scellé", "الله": "Allāh", "على": "sur", "قلوبهم": "leurs cœurs", "وعلى": "et sur", "سمعهم": "leur ouïe", "وأبصارهم": "et sur leurs regards", "أبصارهم": "leurs regards", "غشاوة": "un voile", "غشوة": "un voile", "ولهم": "et pour eux", "عذاب": "un châtiment", "عظيم": "immense",
      "والقلم": "Par la plume", "يسطرون": "ils écrivent !", "ما": "Tu n'es pas", "أنت": "toi", "بنعمة": "par la grâce de", "ربك": "ton Seigneur", "بمجنون": "un possédé"
    },
    de: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn", "طه": "Tā-Hā",
      "ذلك": "Dieses (Das ist)", "الكتاب": "das Buch", "لا": "kein", "ريب": "Zweifel", "فيه": "darin", "هدى": "eine Rechtleitung", "للمتقين": "für die Gottesfürchtigen",
      "ختم": "Versiegelt hat", "الله": "Allāh", "على": "auf", "قلوبهم": "ihre Herzen", "وعلى": "und auf", "سمعهم": "ihr Gehör", "أبصارهم": "ihre Blicke", "غشاوة": "eine Hülle", "غشوة": "eine Hülle", "ولهم": "und für sie", "عذاب": "eine Strafe", "عظيم": "gewaltige",
      "والقلم": "Beim Schreibrohr", "يسطرون": "sie niederschreiben!"
    },
    it: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn", "طه": "Tā-Hā",
      "ذلك": "Questo (è)", "الكتاب": "il Libro", "لا": "non c'è", "ريب": "dubbio", "فيه": "in esso", "هدى": "una guida", "للمتقين": "per i timorati",
      "ختم": "Ha suggellato", "الله": "Allāh", "على": "sui", "قلوبهم": "loro cuori", "وعلى": "e sul", "سمعهم": "loro udito", "أبصارهم": "loro sguardi", "غشاوة": "un velo", "غشوة": "un velo", "ولهم": "e per loro", "عذاب": "un castigo", "عظيم": "immenso",
      "والقلم": "Per il calamo", "يسطرون": "scrivono!"
    },
    id: {
      "الم": "Alif Lām Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn", "طه": "Tā-Hā",
      "ذلك": "Kitab (ini)", "الكتاب": "Al-Kitab", "لا": "tidak ada", "ريب": "keraguan", "فيه": "padanya", "هدى": "petunjuk", "للمتقين": "bagi orang-orang bertakwa",
      "ختم": "telah mengunci", "الله": "Allah", "على": "atas", "قلوبهم": "hati mereka", "وعلى": "dan atas", "سمعهم": "pendengaran mereka", "أبصارهم": "penglihatan mereka", "غشاوة": "penutup", "غشوة": "penutup", "ولهم": "dan bagi mereka", "عذاب": "azab", "عظيم": "yang besar",
      "والقلم": "Demi pena", "وما": "dan apa yang", "يسطرون": "mereka tuliskan"
    },
    ru: {
      "الم": "Алиф, Лам, Мим", "ن": "Нун", "ق": "Каф", "ص": "Сад", "يس": "Йа Син", "طه": "Та Ха",
      "ذلك": "Это", "الكتاب": "Писание (Книга)", "لا": "нет", "ريب": "сомнения", "فيه": "в нём", "هدى": "верное руководство", "للمتقين": "для богобоязненных",
      "ختم": "Запечатал", "الله": "Аллах", "على": "на", "قلوبهم": "их сердца", "وعلى": "и на", "سمعهم": "их слух", "أبصارهم": "их взорах", "غشاوة": "пелена (завеса)", "غشوة": "пелена (завеса)", "ولهم": "и для них", "عذاب": "наказание", "عظيم": "великое",
      "والقلم": "Клянусь письменной тростью", "وما": "и тем, что", "يسطرون": "они пишут!"
    },
    es: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn",
      "ذلك": "Ese (Este es)", "الكتاب": "el Libro", "لا": "no hay", "ريب": "duda", "فيه": "en él", "هدى": "una guía", "للمتقين": "para los piadosos",
      "ختم": "ha sellado", "الله": "Allāh (Dios)", "على": "sobre", "قلوبهم": "sus corazones", "وعلى": "y sobre", "سمعهم": "su oído", "وأبصارهم": "y sus miradas", "أبصارهم": "sus miradas (ojos)", "غشاوة": "un velo", "غشوة": "un velo", "ولهم": "y para ellos", "عذاب": "un castigo", "عظيم": "inmenso"
    }
  };

  var cacheVersetMotsExact = {};
  var requetesVersetEnCours = {};
  var sensGrilleRtl = true;

  try {
    var sauv = localStorage.getItem("cache_wbw_exact_v65") || localStorage.getItem("cache_wbw_exact_v64");
    if (sauv) cacheVersetMotsExact = JSON.parse(sauv);
  } catch (e) {}

  function normaliserArabeCle(str) {
    if (!str) return "";
    return str
      .replace(/[\\u06D6-\\u06ED\\u064B-\\u065F\\u0670\\u0640\\u0653\\u0654\\u0655]/g, "")
      .replace(/[إأآٱ]/g, "ا")
      .replace(/ؤ/g, "و")
      .replace(/ئ/g, "ي")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .replace(/\\s+/g, "")
      .trim();
  }

  function chercherDansDicoCertifie(motAr, lang) {
    var cle = normaliserArabeCle(motAr);
    if (!cle) return "";

    if (cle === "من") {
      var aKasra = motAr.indexOf("\\u0650") !== -1;
      if (lang === "fr") return aKasra ? "de / avant" : "qui (quiconque)";
      if (lang === "de") return aKasra ? "von / vor" : "wer (jemand)";
      if (lang === "it") return aKasra ? "da / prima" : "chi (colui che)";
      if (lang === "id") return aKasra ? "dari / sebelum" : "siapa (orang yang)";
      if (lang === "ru") return aKasra ? "из / от" : "кто (тот, кто)";
      if (lang === "es") return aKasra ? "de / antes" : "quien";
    }

    var dico = DICO_MULTILINGUE[lang];
    if (!dico) return "";
    for (var k in dico) {
      if (normaliserArabeCle(k) === cle) return dico[k];
    }
    return "";
  }

  function chargerVraiMotAMotVerset(vk, lang) {
    if (!vk) return;
    var cleCache = vk + "_" + lang;
    if (cacheVersetMotsExact[cleCache] || requetesVersetEnCours[cleCache]) return;
    requetesVersetEnCours[cleCache] = true;

    var urlQdc = "https://api.quran.com/api/v4/verses/by_key/" + vk + "?language=en&words=true&word_fields=text_uthmani,translation";
    fetch(urlQdc)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || !data.verse || !data.verse.words) return;
        var motsQdc = [];
        for (var i = 0; i < data.verse.words.length; i++) {
          var w = data.verse.words[i];
          if (w.char_type_name === "word") {
            var arTxt = w.text_uthmani || "";
            var trTxt = w.translation && w.translation.text ? w.translation.text : "";
            motsQdc.push({ ar: arTxt, en: trTxt, tr: trTxt });
          }
        }

        if (lang === "en" || lang === "ar") {
          cacheVersetMotsExact[cleCache] = motsQdc;
          try { localStorage.setItem("cache_wbw_exact_v65", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
          appliquerVraiMotAMotSurDOM();
          return;
        }

        var aTraduireIdx = [];
        var aTraduireTextes = [];
        for (var j = 0; j < motsQdc.length; j++) {
          var cert2 = chercherDansDicoCertifie(motsQdc[j].ar, lang);
          if (cert2) {
            motsQdc[j].tr = cert2;
          } else {
            var propreEn = motsQdc[j].en.replace(/[\\(\\)\\[\\]]/g, "").trim();
            aTraduireIdx.push(j);
            aTraduireTextes.push(propreEn || motsQdc[j].ar);
          }
        }

        if (aTraduireTextes.length === 0) {
          cacheVersetMotsExact[cleCache] = motsQdc;
          try { localStorage.setItem("cache_wbw_exact_v65", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
          appliquerVraiMotAMotSurDOM();
          return;
        }

        var sep = String.fromCharCode(10);
        var blocTexte = aTraduireTextes.join(" " + sep + " ");
        var gtxUrl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" + lang + "&dt=t&q=" + encodeURIComponent(blocTexte);
        fetch(gtxUrl)
          .then(function (r2) { return r2.json(); })
          .then(function (resGtx) {
            if (resGtx && resGtx[0]) {
              var texteCompletTraduit = "";
              for (var s = 0; s < resGtx[0].length; s++) {
                if (resGtx[0][s][0]) texteCompletTraduit += resGtx[0][s][0];
              }
              var lignes = texteCompletTraduit.split(sep);
              for (var k = 0; k < aTraduireIdx.length; k++) {
                var idxMot = aTraduireIdx[k];
                var trMot = lignes[k] ? lignes[k].trim() : "";
                if (trMot) motsQdc[idxMot].tr = trMot;
              }
            }
          })
          .catch(function () {})
          .finally(function () {
            cacheVersetMotsExact[cleCache] = motsQdc;
            try { localStorage.setItem("cache_wbw_exact_v65", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
            appliquerVraiMotAMotSurDOM();
          });
      })
      .catch(function () {})
      .finally(function () {
        requetesVersetEnCours[cleCache] = false;
      });
  }

  function obtenirCartesMotAMotVisibles() {
    var cartes = [];
    var c1 = document.querySelectorAll(".wbw-card, .wbw-word, .wbw-item");
    for (var i = 0; i < c1.length; i++) {
      var r1 = c1[i].getBoundingClientRect();
      if (r1.width > 25 && r1.height > 25) {
        c1[i].classList.add("wbw-card-unit");
        cartes.push(c1[i]);
      }
    }
    if (cartes.length > 0) return cartes;

    var tousDivs = document.querySelectorAll("div");
    var candidats = [];
    for (var d = 0; d < tousDivs.length; d++) {
      var el = tousDivs[d];
      if (
        el.children && el.children.length >= 2 && el.children.length <= 3 &&
        el.children[0].tagName === "DIV" && el.children[el.children.length - 1].tagName === "DIV" &&
        !el.querySelector("button")
      ) {
        var r = el.getBoundingClientRect();
        if (r.width >= 48 && r.width <= 280 && r.height >= 48 && r.height <= 220) {
          var txt0 = (el.children[0].textContent || "").trim();
          if (/[\\u0600-\\u06FF]/.test(txt0) && txt0.length < 40) candidats.push(el);
        }
      }
    }

    for (var c = 0; c < candidats.length; c++) {
      var cand = candidats[c];
      var estEnfant = false;
      for (var p = 0; p < candidats.length; p++) {
        if (c !== p && candidats[p].contains(cand)) { estEnfant = true; break; }
      }
      if (!estEnfant) {
        cand.classList.add("wbw-card-unit");
        cartes.push(cand);
      } else {
        cand.classList.remove("wbw-card-unit");
        cand.removeAttribute("data-word-num");
      }
    }
    return cartes;
  }

  function appliquerVraiMotAMotSurDOM() {
    var cartes = obtenirCartesMotAMotVisibles();
    var oldBanner = document.getElementById("wbwSensLectureBanner");
    if (cartes.length === 0) {
      if (oldBanner) oldBanner.style.display = "none";
      return;
    }

    var lang = obtenirLangueActive();
    var vk = obtenirCleVerset();
    var cleCache = vk + "_" + lang;

    if (!cacheVersetMotsExact[cleCache]) chargerVraiMotAMotVerset(vk, lang);
    var listeExacte = cacheVersetMotsExact[cleCache];

    for (var i = 0; i < cartes.length; i++) {
      var c = cartes[i];
      c.setAttribute("data-word-num", String(i + 1));
      if (!c.children || c.children.length < 2) continue;
      var elAr = c.children[0];
      var elTr = c.children[c.children.length - 1];
      elAr.classList.remove("wbw-card-unit");
      elAr.removeAttribute("data-word-num");

      var txtAr = (elAr.textContent || "").trim();
      var cleCarteAr = normaliserArabeCle(txtAr);
      var tradFinale = chercherDansDicoCertifie(txtAr, lang);

      if (cleCarteAr === "وما" && (lang === "fr" || lang === "de" || lang === "it" || lang === "id" || lang === "ru")) {
        var estNeg = false;
        if (i + 1 < cartes.length && cartes[i + 1].children.length) {
          var suivAr = normaliserArabeCle(cartes[i + 1].children[0].textContent || "");
          if (suivAr === "هم" || suivAr === "يخدعون" || suivAr === "يشعرون" || suivAr === "يعلمون" || suivAr === "كانوا") {
            estNeg = true;
          }
        }
        if (lang === "de") tradFinale = estNeg ? "und sie (sind) nicht" : "und was";
        else if (lang === "it") tradFinale = estNeg ? "ed essi non (sono)" : "e ciò che";
        else if (lang === "id") tradFinale = estNeg ? "padahal mereka bukanlah" : "dan apa yang";
        else if (lang === "ru") tradFinale = estNeg ? "но они не" : "и тем, что";
        else tradFinale = estNeg ? "et ils ne" : "et ce qu'";
      }

      if (!tradFinale && listeExacte && listeExacte.length > 0) {
        if (listeExacte[i] && normaliserArabeCle(listeExacte[i].ar) === cleCarteAr) {
          tradFinale = listeExacte[i].tr;
        } else {
          for (var m = 0; m < listeExacte.length; m++) {
            if (normaliserArabeCle(listeExacte[m].ar) === cleCarteAr) {
              tradFinale = listeExacte[m].tr;
              break;
            }
          }
          if (!tradFinale && listeExacte[i]) tradFinale = listeExacte[i].tr;
        }
      }

      if (tradFinale && elTr.textContent !== tradFinale) elTr.textContent = tradFinale;
    }

    var grilleParente = cartes[0].parentElement;
    if (grilleParente) {
      grilleParente.style.setProperty("direction", sensGrilleRtl ? "rtl" : "ltr", "important");
      var totalW = cartes.length;
      var textesRtl = {
        fr: "⬅️ Sens de lecture : de droite à gauche (1 ➔ " + totalW + ") • Cliquer pour inverser",
        en: "⬅️ Reading order: Right to Left (1 ➔ " + totalW + ") • Click to reverse",
        es: "⬅️ Orden de lectura: de derecha a izquierda (1 ➔ " + totalW + ") • Clic para invertir",
        de: "⬅️ Leserichtung: von rechts nach links (1 ➔ " + totalW + ") • Klicken zum Umkehren",
        it: "⬅️ Ordine di lettura: da destra a sinistra (1 ➔ " + totalW + ") • Clicca per invertire",
        id: "⬅️ Arah baca: dari kanan ke kiri (1 ➔ " + totalW + ") • Klik untuk membalik",
        ru: "⬅️ Порядок чтения: справа налево (1 ➔ " + totalW + ") • Нажмите, чтобы изменить",
        ar: "⬅️ ترتيب القراءة: من اليمين إلى اليسار (1 ➔ " + totalW + ")"
      };
      var textesLtr = {
        fr: "➡️ Sens de lecture : de gauche à droite (1 ➔ " + totalW + ") • Cliquer pour inverser",
        en: "➡️ Reading order: Left to Right (1 ➔ " + totalW + ") • Click to reverse",
        es: "➡️ Orden de lectura: de izquierda a derecha (1 ➔ " + totalW + ") • Clic para invertir",
        de: "➡️ Leserichtung: von links nach rechts (1 ➔ " + totalW + ") • Klicken zum Umkehren",
        it: "➡️ Ordine di lettura: da sinistra a destra (1 ➔ " + totalW + ") • Clicca per invertire",
        id: "➡️ Arah baca: dari kiri ke kanan (1 ➔ " + totalW + ") • Klik untuk membalik",
        ru: "➡️ Порядок чтения: слева направо (1 ➔ " + totalW + ") • Нажмите, чтобы изменить",
        ar: "➡️ ترتيب القراءة: من اليسار إلى اليمين (1 ➔ " + totalW + ")"
      };
      var fleche = sensGrilleRtl ? (textesRtl[lang] || textesRtl.fr) : (textesLtr[lang] || textesLtr.fr);
      if (!oldBanner) {
        oldBanner = document.createElement("div");
        oldBanner.id = "wbwSensLectureBanner";
        oldBanner.addEventListener("click", function () {
          sensGrilleRtl = !sensGrilleRtl;
          appliquerVraiMotAMotSurDOM();
        });
        grilleParente.parentElement.insertBefore(oldBanner, grilleParente);
      }
      oldBanner.style.display = "block";
      if (oldBanner.textContent !== fleche) oldBanner.textContent = fleche;
    }
  }

  function masquerTraductionBasSiMotAMot() {
    var cartes = obtenirCartesMotAMotVisibles();
    if (cartes.length < 2) {
      var caches = document.querySelectorAll(".wbw-masquer-traduction-bas");
      for (var c = 0; c < caches.length; c++) caches[c].classList.remove("wbw-masquer-traduction-bas");
      return;
    }
    var premiereCarte = cartes[0];
    var grilleParente = premiereCarte.parentElement;
    var boiteVerset = grilleParente ? grilleParente.parentElement : null;
    if (!boiteVerset) return;

    var rectDerniereCarte = cartes[cartes.length - 1].getBoundingClientRect();
    var candidats = boiteVerset.querySelectorAll("p, div, h1, h2, h3, h4, span");
    for (var i = 0; i < candidats.length; i++) {
      var el = candidats[i];
      if (el.id === "wbwSensLectureBanner" || el === grilleParente || el.contains(premiereCarte) || grilleParente.contains(el)) continue;
      if (el.querySelector("button") || el.tagName === "BUTTON") continue;
      var txt = (el.textContent || "").trim();
      if (!txt || /[\\u0600-\\u06FF]/.test(txt)) continue;
      var r = el.getBoundingClientRect();
      if (r.top >= rectDerniereCarte.top + 10 || /^\\d+\\s*[\\.-]/.test(txt)) {
        if (txt.indexOf("TAFSĪR") === -1 && txt.indexOf("ТАФСИР") === -1 && txt.indexOf("ERKLÄRUNG") === -1 && txt.indexOf("SPIEGAZIONE") === -1 && txt.indexOf("PENJELASAN") === -1 && txt.indexOf("EXPLICATION") === -1 && txt.indexOf("Ghunnah") === -1) {
          el.classList.add("wbw-masquer-traduction-bas");
        }
      }
    }
  }

  var wbwScale = 1.0;
  function appliquerZoomMotAMot() {
    var root = document.documentElement;
    var arRem = (2.15 * wbwScale).toFixed(2) + "rem";
    var trRem = (0.92 * Math.pow(wbwScale, 0.82)).toFixed(2) + "rem";
    var padV = Math.round(14 * Math.pow(wbwScale, 0.75)) + "px";
    var padH = Math.round(18 * Math.pow(wbwScale, 0.78)) + "px";
    var minW = Math.round(92 * wbwScale) + "px";
    root.style.setProperty("--wbw-ar-size", arRem);
    root.style.setProperty("--wbw-tr-size", trRem);
    root.style.setProperty("--wbw-pad-v", padV);
    root.style.setProperty("--wbw-pad-h", padH);
    root.style.setProperty("--wbw-min-w", minW);
  }

  var MAP_NOMS_VERS_QDC = {
    dosari: [174, 168], dossari: [174, 168], yasser: [174, 168],
    afasy: [7], alafasy: [7], mishary: [7],
    sudais: [3], soudais: [3],
    shuraim: [10, 4], shuraym: [10, 4],
    hussary: [6], husary: [6],
    abdulbaset: [2, 1], abdulbasit: [2, 1],
    minshawi: [9]
  };

  var cacheTimingVerset = {};
  var requetesEnCours = {};
  window.__lecteurAudioActuel = null;
  var rafId = null;
  var energiesMots = [];
  var bleusMots = [];
  var dernierVersetSuivi = "";

  function obtenirCleRecitateurSelectionne() {
    var selects = document.querySelectorAll("select");
    for (var i = 0; i < selects.length; i++) {
      var s = selects[i];
      if (s.classList.contains("khatm-reciter-select")) continue;
      if (s.options && s.selectedIndex >= 0) {
        var txt = ((s.value || "") + " " + (s.options[s.selectedIndex].textContent || "")).toLowerCase();
        if (txt.indexOf("verset") === -1 && txt.indexOf("verse") === -1 && txt.indexOf("aleya") === -1 && txt.indexOf("vers ") === -1 && txt.indexOf("ayat") === -1 && txt.indexOf("аят") === -1) {
          for (var k in MAP_NOMS_VERS_QDC) {
            if (txt.indexOf(k) !== -1) return k;
          }
        }
      }
    }
    return "dosari";
  }

  function chargerTimestampsQdc(cleRec, vk) {
    if (!cleRec || !vk) return;
    var chap = vk.split(":")[0];
    var cleChap = cleRec + "_chap_" + chap;
    if (requetesEnCours[cleChap]) return;
    requetesEnCours[cleChap] = true;

    var idPrincipal = (MAP_NOMS_VERS_QDC[cleRec] || [174])[0];
    fetch("https://api.qurancdn.com/api/qdc/audio/reciters/" + idPrincipal + "/audio_files?chapter=" + chap + "&segments=true")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.audio_files && data.audio_files[0] && data.audio_files[0].verse_timings) {
          var vts = data.audio_files[0].verse_timings;
          for (var i = 0; i < vts.length; i++) {
            var vt = vts[i];
            if (vt.verse_key && vt.segments && vt.segments.length > 0) {
              var valides = [], minMs = Infinity, maxMs = -Infinity;
              for (var j = 0; j < vt.segments.length; j++) {
                var s = vt.segments[j];
                if (s && s.length >= 3 && s[0] != null && s[1] != null && s[2] != null) {
                  var wIdx = Number(s[0]) - 1, t1 = Number(s[1]), t2 = Number(s[2]);
                  if (!isNaN(wIdx) && !isNaN(t1) && !isNaN(t2) && t2 >= t1) {
                    if (t1 < minMs) minMs = t1;
                    if (t2 > maxMs) maxMs = t2;
                    valides.push({ wordIndex: wIdx, t1: t1, t2: t2 });
                  }
                }
              }
              if (valides.length > 0 && maxMs > minMs) {
                var span = maxMs - minMs;
                cacheTimingVerset[cleRec + "_" + vt.verse_key] = valides.map(function (v) {
                  return { wordIndex: v.wordIndex, rStart: (v.t1 - minMs) / span, rEnd: (v.t2 - minMs) / span };
                });
              }
            }
          }
        }
      })
      .catch(function () {});
  }

  function obtenirElementsMotsAAnimer() {
    var cartes = obtenirCartesMotAMotVisibles();
    if (cartes.length >= 2) return { type: "cartes", items: cartes };

    var conteneur = document.querySelector("#arabicVerse, .arabic-glow-verse");
    if (!conteneur) return { type: "spans", items: [] };
    conteneur.setAttribute("dir", "rtl");

    var spansExistants = conteneur.querySelectorAll("span");
    var aSigneIsole = false;
    for (var s = 0; s < spansExistants.length; s++) {
      var stxt = (spansExistants[s].textContent || "").replace(/[\\u06D6-\\u06ED\\u064B-\\u065F\\u0670\\u06DD\\u06DE\\u06E9\\s]/g, "");
      if (stxt.length === 0) {
        aSigneIsole = true;
        break;
      }
    }
    if (spansExistants.length > 1 && !aSigneIsole) {
      return { type: "spans", items: spansExistants };
    }

    var texte = (conteneur.textContent || "").trim();
    if (!texte) return { type: "spans", items: [] };
    var bruts = texte.split(/\\s+/).filter(Boolean);
    var motsPropres = [];
    for (var i = 0; i < bruts.length; i++) {
      var w = bruts[i];
      var sansMarques = w.replace(/[\\u06D6-\\u06ED\\u064B-\\u065F\\u0670\\u06DD\\u06DE\\u06E9]/g, "");
      if (sansMarques.length === 0 && motsPropres.length > 0) {
        motsPropres[motsPropres.length - 1] += " " + w;
      } else {
        motsPropres.push(w);
      }
    }
    if (motsPropres.length <= 1) return { type: "spans", items: spansExistants };
    conteneur.innerHTML = motsPropres.map(function (m, idx) {
      return '<span class="ar-word-follow" data-widx="' + idx + '">' + m + "</span>";
    }).join(" ");
    return { type: "spans", items: conteneur.querySelectorAll("span") };
  }

  function reinitialiserMotsEnBlancTamise() {
    energiesMots = [];
    bleusMots = [];
    var cibleObj = obtenirElementsMotsAAnimer();
    var items = cibleObj.items;
    var estCartes = cibleObj.type === "cartes";
    for (var i = 0; i < items.length; i++) {
      var el = items[i];
      el.style.setProperty("transform", "translate3d(0, 0px, 0) scale(1)", "important");
      el.style.setProperty("filter", "none", "important");
      if (estCartes) {
        el.style.setProperty("opacity", "0.82", "important");
        el.style.setProperty("border-color", "rgba(255, 255, 255, 0.15)", "important");
        el.style.setProperty("box-shadow", "none", "important");
      } else {
        el.style.setProperty("opacity", "0.78", "important");
        el.style.setProperty("color", "rgba(255, 255, 255, 0.78)", "important");
        el.style.setProperty("text-shadow", "0 0 8px rgba(255, 255, 255, 0.14)", "important");
      }
    }
  }

  function lancerBoucleSuivi() {
    if (!rafId) {
      rafId = requestAnimationFrame(etapeSuiviAudioAfterEffects);
    }
  }

  if (typeof HTMLMediaElement !== "undefined" && HTMLMediaElement.prototype && !HTMLMediaElement.prototype.__hookedV77) {
    var origPlay = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      var self = this;
      window.__lecteurAudioActuel = self;
      if (self.currentTime < 0.25) {
        reinitialiserMotsEnBlancTamise();
      }
      if (!self.__listenersV77) {
        self.__listenersV77 = true;
        self.addEventListener("playing", lancerBoucleSuivi);
        self.addEventListener("timeupdate", lancerBoucleSuivi);
      }
      var cleRec = obtenirCleRecitateurSelectionne();
      var vk = obtenirCleVerset();
      if (cleRec && vk) chargerTimestampsQdc(cleRec, vk);
      lancerBoucleSuivi();
      return origPlay.apply(self, arguments);
    };
    HTMLMediaElement.prototype.__hookedV77 = true;
  }

  function trouverAudioActif() {
    if (window.__lecteurAudioActuel && !window.__lecteurAudioActuel.paused && !window.__lecteurAudioActuel.ended) {
      return window.__lecteurAudioActuel;
    }
    var audios = document.querySelectorAll("audio");
    for (var i = 0; i < audios.length; i++) {
      if (!audios[i].paused && !audios[i].ended) return audios[i];
    }
    return null;
  }

  function courbeAfterEffects(x) {
    var t = Math.max(0, Math.min(1, x));
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function etapeSuiviAudioAfterEffects() {
    var vkActuel = obtenirCleVerset();
    if (vkActuel && vkActuel !== dernierVersetSuivi) {
      dernierVersetSuivi = vkActuel;
      energiesMots = [];
      bleusMots = [];
    }

    var cibleObj = obtenirElementsMotsAAnimer();
    var items = cibleObj.items;
    var estCartes = cibleObj.type === "cartes";
    var aud = trouverAudioActif();
    var activeIndexFloat = -1;

    if (items && items.length && suiviEstActif) {
      if (energiesMots.length !== items.length) {
        energiesMots = new Array(items.length).fill(0);
        bleusMots = new Array(items.length).fill(0);
      }

      for (var i = 0; i < items.length; i++) {
        if (items[i].classList.contains("active") || items[i].classList.contains("speaking") || items[i].classList.contains("current")) {
          activeIndexFloat = i;
          break;
        }
      }

      if (activeIndexFloat === -1 && aud && aud.duration > 0.2 && aud.currentTime > 0.02) {
        var cleRec = obtenirCleRecitateurSelectionne();
        var vk = obtenirCleVerset();
        var t = aud.currentTime;
        var d = aud.duration;
        var debutVoix = Math.min(0.18, d * 0.04);
        var finVoix = Math.max(debutVoix + 0.25, d - Math.min(0.35, d * 0.07));
        var ratioVoix = Math.max(0, Math.min(0.999, (t - debutVoix) / (finVoix - debutVoix)));

        var segsNorm = cacheTimingVerset[cleRec + "_" + vk];
        if (segsNorm && segsNorm.length > 0) {
          for (var s = 0; s < segsNorm.length; s++) {
            var sg = segsNorm[s];
            if (ratioVoix >= sg.rStart && ratioVoix <= sg.rEnd) {
              var progInterne = sg.rEnd > sg.rStart ? (ratioVoix - sg.rStart) / (sg.rEnd - sg.rStart) : 0.5;
              activeIndexFloat = sg.wordIndex + progInterne * 0.35;
              break;
            }
          }
        }
        if (activeIndexFloat === -1) {
          activeIndexFloat = ratioVoix * items.length;
        }
      } else if (aud && aud.ended) {
        activeIndexFloat = items.length;
      }

      var idxEntier = Math.floor(activeIndexFloat);
      var lectureEnCours = activeIndexFloat >= 0;

      for (var m = 0; m < items.length; m++) {
        var el = items[m];

        var cibleElevation = lectureEnCours && m === idxEntier ? 1.0 : 0.0;
        energiesMots[m] += (cibleElevation - energiesMots[m]) * 0.22;
        if (energiesMots[m] < 0.002) energiesMots[m] = 0;
        if (energiesMots[m] > 0.998) energiesMots[m] = 1;

        var cibleBleu = lectureEnCours && m <= idxEntier ? 1.0 : bleusMots[m];
        bleusMots[m] += (cibleBleu - bleusMots[m]) * 0.18;
        if (bleusMots[m] < 0.002) bleusMots[m] = 0;
        if (bleusMots[m] > 0.998) bleusMots[m] = 1;

        var e = courbeAfterEffects(energiesMots[m]);
        var b = courbeAfterEffects(bleusMots[m]);

        var yPx = (-7.5 * e).toFixed(2);
        var sc = (1.0 + 0.12 * e).toFixed(3);

        if (estCartes) {
          var opCarte = (0.82 + 0.18 * b).toFixed(2);
          el.style.setProperty("opacity", opCarte, "important");
          el.style.setProperty("transform", "translate3d(0, " + yPx + "px, 0) scale(" + (1.0 + 0.08 * e).toFixed(3) + ")", "important");
          if (b > 0.02) {
            el.style.setProperty("border-color", "rgba(56, 189, 248, " + (0.45 * b + 0.55 * e).toFixed(2) + ")", "important");
            el.style.setProperty("box-shadow", "0 " + (6 * b + 6 * e).toFixed(1) + "px " + (18 * b + 14 * e).toFixed(1) + "px rgba(56, 189, 248, " + (0.35 * b + 0.35 * e).toFixed(2) + "), inset 0 0 " + (12 * b).toFixed(1) + "px rgba(56, 189, 248, " + (0.18 * b).toFixed(2) + ")", "important");
          } else {
            el.style.setProperty("border-color", "rgba(255, 255, 255, 0.15)", "important");
            el.style.setProperty("box-shadow", "none", "important");
          }
        } else {
          el.style.setProperty("background", "transparent", "important");
          el.style.setProperty("border", "none", "important");
          el.style.setProperty("filter", "none", "important");
          el.style.setProperty("transform", "translate3d(0, " + yPx + "px, 0) scale(" + sc + ")", "important");

          if (b < 0.03) {
            el.style.setProperty("opacity", "0.78", "important");
            el.style.setProperty("color", "rgba(255, 255, 255, 0.78)", "important");
            el.style.setProperty("text-shadow", "0 0 8px rgba(255, 255, 255, 0.14)", "important");
          } else {
            var opMot = (0.78 + 0.22 * b).toFixed(2);
            el.style.setProperty("opacity", opMot, "important");
            el.style.setProperty("color", "#ffffff", "important");
            var alphaBleu1 = (0.88 * b + 0.12 * e).toFixed(2);
            var alphaBleu2 = (0.68 * b + 0.32 * e).toFixed(2);
            var rayon1 = (15 + 9 * e).toFixed(1);
            var rayon2 = (30 + 18 * e).toFixed(1);
            el.style.setProperty(
              "text-shadow",
              "0 0 10px rgba(255, 255, 255, 0.98), 0 0 " + rayon1 + "px rgba(56, 189, 248, " + alphaBleu1 + "), 0 0 " + rayon2 + "px rgba(14, 165, 233, " + alphaBleu2 + ")",
              "important"
            );
          }
        }
      }
    }

    var animEnCours = false;
    for (var z = 0; z < energiesMots.length; z++) {
      if (energiesMots[z] > 0.005 || (bleusMots[z] > 0.005 && bleusMots[z] < 0.995)) {
        animEnCours = true;
        break;
      }
    }

    if ((aud && !aud.paused) || animEnCours) {
      rafId = requestAnimationFrame(etapeSuiviAudioAfterEffects);
    } else {
      rafId = null;
    }
  }

  var enCoursDeSync = false;
  function synchroniserTout() {
    if (enCoursDeSync) return;
    enCoursDeSync = true;
    try {
      verifierSautDirectVersetKhatm();
      synchroniserPositionKhatmAutomatique();
      assurerBoutonsLanguesEtendues();
      assurerBoutonSuiviVisible();
      reparerSoleilEtLuneEnOrbite();
      retirerRecitateurMaher();
      if (langExtActive && LANGUES_EXT_SUPPORTEES[langExtActive]) appliquerInterfaceEtContenuExt();
      corrigerCoquillesNativesEtTafsir();
      mettreAJourMentionsTraducteurEtExegese();
      afficherOuMettreAJourPlanificateurKhatm();
      masquerTraductionBasSiMotAMot();
      appliquerVraiMotAMotSurDOM();
      appliquerZoomMotAMot();
      synchroniserUrlEtSeoAvecLangueEtVerset();
      var cleRec = obtenirCleRecitateurSelectionne();
      var vk = obtenirCleVerset();
      if (cleRec && vk) chargerTimestampsQdc(cleRec, vk);
      if (vk) chargerVraiMotAMotVerset(vk, obtenirLangueActive());
    } finally {
      enCoursDeSync = false;
    }
  }

  window.addEventListener("DOMContentLoaded", function () {
    synchroniserTout();
    reinitialiserMotsEnBlancTamise();
  });

  document.addEventListener("click", function (e) {
    var btnKhatmAct = e.target.closest("[data-khatm-act]");
    if (btnKhatmAct) {
      var act = btnKhatmAct.getAttribute("data-khatm-act");
      var ord = etatKhatm.order;
      if (act === "resume") {
        var vkCurr = obtenirCleVerset();
        var tS = Number(btnKhatmAct.getAttribute("data-target-s"));
        var tV = Number(btnKhatmAct.getAttribute("data-target-v"));
        if (vkCurr && Number(vkCurr.split(":")[0]) === tS && tV) {
          e.preventDefault();
          allerAuVersetSurMemePage(tV);
          setTimeout(synchroniserTout, 20);
          return;
        }
      } else if (act === "step-day") {
        var vJour = obtenirVersetsParJour(etatKhatm.months);
        etatKhatm.idxByOrder[ord] = Math.min(TOTAL_VERSETS_CORAN, (etatKhatm.idxByOrder[ord] || 0) + vJour);
        sauvegarderEtatKhatm();
        afficherOuMettreAJourPlanificateurKhatm();
        return;
      } else if (act === "save-here") {
        var vkHere = obtenirCleVerset();
        if (vkHere) {
          var ph = vkHere.split(":");
          etatKhatm.idxByOrder[ord] = convertirSourateVersetVersIndexGlobal(ord, Number(ph[0]), Number(ph[1]));
          sauvegarderEtatKhatm();
          afficherOuMettreAJourPlanificateurKhatm();
        }
        return;
      } else if (act === "reset") {
        etatKhatm.idxByOrder[ord] = 0;
        sauvegarderEtatKhatm();
        afficherOuMettreAJourPlanificateurKhatm();
        return;
      }
    }

    var btn = e.target.closest("button, .btn, span, a, div");
    if (btn) {
      var t = (btn.textContent || "").trim();
      if (t === "A+" || t === "A +") {
        wbwScale = Math.min(2.5, +(wbwScale + 0.16).toFixed(2));
      } else if (t === "A-" || t === "A -" || t === "A−") {
        wbwScale = Math.max(0.68, +(wbwScale - 0.16).toFixed(2));
      } else if (t.indexOf("Rejouer") !== -1 || t.indexOf("Replay") !== -1 || t.indexOf("Repetir") !== -1 || t.indexOf("Wiederholen") !== -1 || t.indexOf("Riascolta") !== -1 || t.indexOf("Ulangi") !== -1 || t.indexOf("Повторить") !== -1) {
        reinitialiserMotsEnBlancTamise();
      } else if (t.indexOf("Suivi") !== -1 || t.indexOf("Follow") !== -1 || t.indexOf("Seguimiento") !== -1 || t.indexOf("Verfolgung") !== -1 || t.indexOf("Seguito") !== -1 || t.indexOf("Ikuti") !== -1 || t.indexOf("Слежение") !== -1 || t.indexOf("تتبع") !== -1) {
        suiviEstActif = !suiviEstActif;
        lancerBoucleSuivi();
      } else if (t.indexOf("Suivant") !== -1 || t.indexOf("Next") !== -1 || t.indexOf("Siguiente") !== -1 || t.indexOf("Weiter") !== -1 || t.indexOf("Successivo") !== -1 || t.indexOf("Berikutnya") !== -1 || t.indexOf("Далее") !== -1) {
        var vkNow = obtenirCleVerset();
        if (vkNow) {
          var pNow = vkNow.split(":");
          var sNow = Number(pNow[0]);
          var vNow = Number(pNow[1]);
          if (sNow && vNow && vNow >= NB_VERSETS_PAR_SOURATE[sNow]) {
            var sNext = obtenirSourateSuivanteSelonOrdre(etatKhatm.order, sNow);
            var langCurr = obtenirLangueActive();
            var sfxL = langCurr !== "fr" ? ("&lang=" + langCurr) : "";
            if (sNext) {
              etatKhatm.idxByOrder[etatKhatm.order] = convertirSourateVersetVersIndexGlobal(etatKhatm.order, sNext, 1);
              sauvegarderEtatKhatm();
              window.location.href = "sourate-" + sNext + "-verset-1.html?khatm_verse=1" + sfxL;
              return;
            }
          }
        }
      }
    }
    setTimeout(synchroniserTout, 15);
    setTimeout(synchroniserTout, 80);
  });

  setInterval(function () {
    synchroniserTout();
    var aud = trouverAudioActif();
    if (aud && !aud.paused && !rafId) {
      lancerBoucleSuivi();
    }
  }, 300);

  synchroniserTout();
})();</script>
</head>
<body>
  <div class="cosmos-exterior-wrapper"><canvas id="fullPageSkyCanvas"></canvas><div class="flat-earth-sun" id="flatEarthSun"><div class="sun-core"></div></div><div class="flat-earth-moon" id="flatEarthMoon"><div class="moon-white-core"></div></div></div>
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
        <div class="audio-control-strip" style="margin-bottom: 18px;">
          <div class="audio-left">
            <select id="reciterSelect" class="reciter-mini" onchange="changerRecitateur()">
              <option value="Yasser_Ad-Dussary_128kbps">Yasser Al-Dosari</option>
              <option value="MaherAlMuaiqly128kbps">Maher Al-Muaiqly</option>
              <option value="Ali_Jaber_64kbps">Abdullah Ali Jaber (Haramain)</option>
              <option value="Muhammad_Ayyoub_128kbps">Muhammad Ayyub (Madinah HD)</option>
              <option value="Husary_128kbps_Mujawwad">Al-Hussary (Tajwīd Mujawwad)</option>
              <option value="Husary_Muallim_128kbps">Al-Hussary (Muallim • Éducatif)</option>
              <option value="Husary_128kbps">Mahmoud Khalil Al-Hussary</option>
              <option value="Alafasy_128kbps">Mishary Rashid Alafasy</option>
              <option value="Abdurrahmaan_As-Sudais_192kbps">Abderrahman Al-Soudais (HD)</option>
              <option value="Saood_ash-Shuraym_128kbps">Saoud Al-Shuraim</option>
              <option value="Nasser_Alqatami_128kbps">Nasser Al-Qatami</option>
              <option value="Minshawy_Murattal_128kbps">Mohamed Siddiq Al-Minshawi</option>
            </select>
            <div class="rp" id="reciterPicker"></div>
              <script>
              (function () {
                var sel = document.getElementById('reciterSelect'), box = document.getElementById('reciterPicker');
                if (!sel || !box) return;
                var palettes = [['#38bdf8','#818cf8'],['#60a5fa','#fb923c'],['#34d399','#38bdf8'],['#f472b6','#a78bfa'],['#fbbf24','#f87171'],['#2dd4bf','#60a5fa']];
                function infos(o, i) {
                  var t = o.textContent.trim(), p = t.indexOf('('), name = p > 0 ? t.slice(0, p).trim() : t, sub = p > 0 ? t.slice(p + 1).replace(')', '').trim() : '';
                  var pal = palettes[i % palettes.length];
                  return { value: o.value, name: name, sub: sub, ini: name.charAt(0).toUpperCase(), c1: pal[0], c2: pal[1] };
                }
                var photos = { 'Yasser_Ad-Dussary_128kbps':'yasser', 'MaherAlMuaiqly128kbps':'maher', 'Ali_Jaber_64kbps':'ali-jaber', 'Muhammad_Ayyoub_128kbps':'ayyub', 'Husary_128kbps_Mujawwad':'husary', 'Husary_Muallim_128kbps':'husary', 'Husary_128kbps':'husary', 'Alafasy_128kbps':'alafasy', 'Abdurrahmaan_As-Sudais_192kbps':'sudais', 'Saood_ash-Shuraym_128kbps':'shuraim', 'Nasser_Alqatami_128kbps':'qatami', 'Minshawy_Murattal_128kbps':'minshawi' };
                var exts = ['jpg', 'jpeg', 'png', 'webp'];
                window.rpErr = function (img) { var i = +(img.dataset.i || 0) + 1; if (i < exts.length) { img.dataset.i = i; img.src = 'recitateurs/' + img.dataset.p + '.' + exts[i]; } else { img.remove(); } };
                function avatar(r) { var p = photos[r.value]; var im = p ? '<img src="recitateurs/' + p + '.jpg" data-p="' + p + '" alt="" loading="lazy" onerror="rpErr(this)">' : ''; return '<span class="rp-av" style="--c1:' + r.c1 + ';--c2:' + r.c2 + '">' + r.ini + im + '</span>'; }
                var list = Array.prototype.map.call(sel.options, infos);
                var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'rp-btn'; btn.setAttribute('aria-haspopup', 'listbox'); btn.setAttribute('aria-expanded', 'false');
                var panel = document.createElement('div'); panel.className = 'rp-panel'; panel.setAttribute('role', 'listbox');
                box.appendChild(btn); box.appendChild(panel);
                function draw() {
                  var cur = list[sel.selectedIndex < 0 ? 0 : sel.selectedIndex];
                  btn.innerHTML = avatar(cur) + '<span class="rp-txt"><span class="rp-name">' + cur.name + '</span>' + (cur.sub ? '<span class="rp-sub">' + cur.sub + '</span>' : '') + '</span><span class="rp-chev">▼</span>';
                  panel.innerHTML = '';
                  list.forEach(function (r) {
                    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'option');
                    b.className = 'rp-item' + (r.value === cur.value ? ' sel' : '');
                    b.innerHTML = avatar(r) + '<span class="rp-txt"><span class="rp-name">' + r.name + '</span>' + (r.sub ? '<span class="rp-sub">' + r.sub + '</span>' : '') + '</span>' + (r.value === cur.value ? '<span class="rp-ck">✓</span>' : '');
                    b.onclick = function () { fermer(); if (sel.value !== r.value) { sel.value = r.value; sel.dispatchEvent(new Event('change')); } draw(); };
                    panel.appendChild(b);
                  });
                }
                function fermer() { panel.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
                btn.onclick = function (e) { e.stopPropagation(); draw(); var ouvert = panel.classList.toggle('open'); btn.setAttribute('aria-expanded', ouvert ? 'true' : 'false'); };
                document.addEventListener('click', function (e) { if (!box.contains(e.target)) fermer(); });
                document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fermer(); });
                draw();
                window.addEventListener('DOMContentLoaded', draw);
                window.addEventListener('load', draw);
              })();
              </script>
            <div class="zoom-btn-group" title="Modifier la taille du texte">
              <button type="button" class="btn-zoom-text" onclick="modifierTailleTexte(-0.1)">A-</button>
              <button type="button" class="btn-zoom-text" onclick="modifierTailleTexte(0.1)">A+</button>
            </div>
            <button type="button" class="btn-wbw-toggle" id="btnToggleWbw" onclick="basculerMotAMot()">📖 Mot à mot</button>
            <button type="button" class="btn-wbw-toggle" id="btnToggleTajweed" onclick="basculerTajweed()">🎨 Tajwīd</button>
            <button type="button" class="btn-wbw-toggle" id="btnToggleSuivi" onclick="basculerSuivi()">✨ Suivi</button>
            
            <div class="brown-noise-group" id="brownNoiseGroup">
              <button type="button" class="btn-wbw-toggle" id="btnToggleBrown" onclick="basculerBrownNoise()">🌊 Bruit Brun</button>
              <div class="brown-vol-box" id="brownVolBox" style="display:none;">
                <button type="button" class="btn-brown-vol" onclick="ajusterVolumeBrown(-0.08)" title="Baisser">−</button>
                <input type="range" id="brownVolSlider" class="brown-vol-slider" min="2" max="100" value="35" oninput="definirVolumeBrown(this.value)">
                <button type="button" class="btn-brown-vol" onclick="ajusterVolumeBrown(0.08)" title="Augmenter">+</button>
              </div>
            </div>
            <select id="verseJumperSelect" class="verse-jumper-select ${vObj.miracle ? 'is-miracle-gold' : ''}" onchange="naviguerVerset(event, this.value, false)">${opts}</select>
          </div>
          <label class="auto-scroll-toggle"><input type="checkbox" id="autoNextCheck" checked><span class="switch-slider"></span><span class="switch-text" id="switchAutoTextEl">Enchaîner automatiquement</span></label>
          <audio id="ayahAudio" preload="auto"></audio><audio id="preloadNextAudio" preload="auto" style="display:none;"></audio>
          <div id="tajweedLegendBar" class="tajweed-legend-bar" style="display:none;">
            <span class="taj-tooltip" data-title="Nasalisation (son par le nez) maintenue sur 2 temps."><i style="background:#4ade80"></i><b>Ghunnah / Ikhfā'</b></span>
            <span class="taj-tooltip" data-title="Rebond sonore (écho) sur la consonne."><i style="background:#38bdf8"></i><b>Qalqalah</b></span>
            <span class="taj-tooltip" data-title="Prolongation vocale du son (2 à 6 temps)."><i style="background:#f87171"></i><b>Madd (Prolongation)</b></span>
            <span class="taj-tooltip" data-title="Fusion de 2 lettres (Idghām) ou emphase (Tafkhīm)."><i style="background:#fbbf24"></i><b>Idghām / Tafkhīm</b></span>
            <span class="taj-tooltip" data-title="Lettre écrite mais qui ne se prononce pas."><i style="background:#64748b"></i><b>Lettre muette</b></span>
          </div>
          
          
          
          
        </div>
        <section class="verse-stage ${vObj.miracle ? 'is-miracle-stage' : ''}" id="verseStage">
          <div class="arabic-glow-verse" id="arabicVerseEl">${vObj.texteArabe}</div>
          <div id="wbwStageContainer" class="wbw-stage-grid" style="display:none;"></div>
          
          <div class="french-glow-verse" id="frenchVerseEl">${numV}. ${vObj.tradPropre}</div>
          <div class="stage-blue-nav">
            <a href="${vObj.lienPrecedent}" id="prevVerseLink" class="btn-blue-nav" onclick="return naviguerVerset(event, this.getAttribute('href'), false)">‹ Précédent</a>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
              <button type="button" class="btn-listen-sync" id="playSyncBtn" onclick="toggleAudioSync()">▶ Écouter le verset</button>
              <button type="button" class="btn-replay-sync" id="replaySyncBtn" onclick="rejouerAudioVerset()">↺ Rejouer</button>
            </div>
            <a href="${vObj.lienSuivant}" id="nextVerseLink" class="btn-blue-nav" onclick="return naviguerVerset(event, this.getAttribute('href'), false)">Suivant ›</a>
          </div>
          <div class="sync-progress-track"><div class="sync-progress-bar" id="syncProgressBar"></div></div>
        </section>
        <div id="miracleContainer"></div>
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

  
  
  
  
  
  
  
  <div class="wbw-modal-backdrop" id="wbwWordModal" onclick="if(event.target===this)fermerModalMot()">
    <div class="wbw-modal-sheet">
      <div class="wbw-sheet-handle"></div>
      <div class="wbw-sheet-ref" id="wbwModalRef">Sourate 1:1:1</div>
      <div class="wbw-sheet-inner">
        <div class="wbw-pos-tags">
          <span id="wbwModalPosLabel"><i class="wbw-pos-dot"></i>Mot coranique</span>
        </div>
        <div class="wbw-big-word-card" id="wbwModalAr">ٱلرَّحِيمِ</div>
        <div class="wbw-big-trans" id="wbwModalTr">...</div>
        <div class="wbw-morph-row">
          <div class="wbw-morph-col">
            <label id="wbwLabelLemma">Lemme / Forme dérivée :</label>
            <div class="wbw-morph-pill" id="wbwModalLemma">...</div>
          </div>
          <div class="wbw-morph-col">
            <label id="wbwLabelRoot">Racine (Root) :</label>
            <div class="wbw-morph-pill" id="wbwModalRoot">...</div>
          </div>
          <button type="button" class="wbw-audio-circle" id="wbwModalAudioBtn" title="Écouter ce mot">🔊</button>
        </div>
      </div>
      <button type="button" class="wbw-cancel-btn" onclick="fermerModalMot()" id="wbwModalCancelBtn">Fermer</button>
    </div>
  </div>
  <audio id="wbwSingleWordAudio" preload="none"></audio>
  <script>
    let modeMotAMotActif = localStorage.getItem('coran_wbw_mode') === '1';
    let modeTajweedActif = localStorage.getItem('coran_tajweed_mode') === '1';
    let modeSuiviActif = localStorage.getItem('coran_suivi_mode') !== '0';
    // Karaoké réservé exclusivement à Mahmoud Khalil Al-Hussary
    function suiviDisponible() {
      const sel = document.getElementById('reciterSelect');
      return Boolean(sel && sel.value.includes('Husary'));
    }
    function majBoutonSuivi() {
      const b = document.getElementById('btnToggleSuivi');
      if (!b) return;
      const lg = (typeof currentLang !== 'undefined' && UI_WBW_I18N[currentLang]) ? currentLang : 'fr';
      b.textContent = UI_WBW_I18N[lg].btnSuivi;
      const dispo = suiviDisponible();
      b.style.display = dispo ? 'inline-block' : 'none';
      b.classList.toggle('active', dispo && modeSuiviActif);
      if (!dispo) eteindreSurlignageKaraoke();
    }
    function basculerSuivi() {
      modeSuiviActif = !modeSuiviActif;
      try { localStorage.setItem('coran_suivi_mode', modeSuiviActif ? '1' : '0'); } catch(e){}
      majBoutonSuivi();
      if (!modeSuiviActif) eteindreSurlignageKaraoke();
    }
    let cacheWbwData = {};
    let cacheTajweedVerset = {};
    let cacheTradMot = {};
    let cacheSegmentsRecitateur = {};
    let motsActuelsDuVerset = [];
    let dernierVersetCharge = '';

    let brownAudioCtx = null;
    let brownGainNode = null;
    let brownActif = false;
    let brownVolume = parseFloat(localStorage.getItem('coran_brown_vol') || '0.35');
    if (isNaN(brownVolume) || brownVolume < 0.02 || brownVolume > 1) brownVolume = 0.35;

    function initialiserBrownNoise() {
      if (brownAudioCtx) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      brownAudioCtx = new AudioCtx();
      const bufferSize = brownAudioCtx.sampleRate * 5;
      const noiseBuffer = brownAudioCtx.createBuffer(2, bufferSize, brownAudioCtx.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const output = noiseBuffer.getChannelData(ch);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.2;
        }
      }
      const whiteNoise = brownAudioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;
      const filter = brownAudioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 420;
      brownGainNode = brownAudioCtx.createGain();
      brownGainNode.gain.value = brownVolume;
      whiteNoise.connect(filter);
      filter.connect(brownGainNode);
      brownGainNode.connect(brownAudioCtx.destination);
      whiteNoise.start(0);
    }

    function basculerBrownNoise() {
      const btn = document.getElementById('btnToggleBrown');
      const volBox = document.getElementById('brownVolBox');
      const slider = document.getElementById('brownVolSlider');
      if (slider) slider.value = Math.round(brownVolume * 100);
      if (!brownActif) {
        initialiserBrownNoise();
        if (brownAudioCtx && brownAudioCtx.state === 'suspended') brownAudioCtx.resume();
        if (brownGainNode) brownGainNode.gain.setTargetAtTime(brownVolume, brownAudioCtx.currentTime, 0.08);
        brownActif = true;
        if (btn) btn.classList.add('active');
        if (volBox) volBox.style.display = 'inline-flex';
      } else {
        if (brownGainNode && brownAudioCtx) {
          brownGainNode.gain.setTargetAtTime(0.0001, brownAudioCtx.currentTime, 0.08);
          setTimeout(() => { if (!brownActif && brownAudioCtx) brownAudioCtx.suspend(); }, 120);
        }
        brownActif = false;
        if (btn) btn.classList.remove('active');
        if (volBox) volBox.style.display = 'none';
      }
    }

    function definirVolumeBrown(valPct) {
      brownVolume = Math.max(0.02, Math.min(1, parseFloat(valPct) / 100));
      try { localStorage.setItem('coran_brown_vol', String(brownVolume)); } catch(e){}
      if (brownGainNode && brownAudioCtx && brownActif) {
        brownGainNode.gain.setTargetAtTime(brownVolume, brownAudioCtx.currentTime, 0.05);
      }
    }

    function ajusterVolumeBrown(delta) {
      const nv = Math.max(0.02, Math.min(1, Math.round((brownVolume + delta) * 100) / 100));
      const slider = document.getElementById('brownVolSlider');
      if (slider) slider.value = Math.round(nv * 100);
      definirVolumeBrown(nv * 100);
    }

    const UI_WBW_I18N = {
      fr: { btnWbw: "📖 Mot à mot", btnSuivi: "✨ Suivi", btnTaj: "🎨 Tajwīd", btnBrown: "🌊 Bruit Brun", pos: "Mot coranique", lemma: "Lemme / Forme dérivée :", root: "Racine (Root) :", close: "Fermer" },
      en: { btnWbw: "📖 Word by Word", btnSuivi: "✨ Follow", btnTaj: "🎨 Tajweed", btnBrown: "🌊 Brown Noise", pos: "Quranic Word", lemma: "Lemma / Derived form:", root: "Root:", close: "Cancel" },
      es: { btnWbw: "📖 Palabra por palabra", btnSuivi: "✨ Seguimiento", btnTaj: "🎨 Tajwīd", btnBrown: "🌊 Ruido Marrón", pos: "Palabra coránica", lemma: "Lema / Forma derivada:", root: "Raíz (Root):", close: "Cerrar" },
      ar: { btnWbw: "📖 كلمة بكلمة", btnSuivi: "✨ المتابعة", btnTaj: "🎨 التجويد", btnBrown: "🌊 ضوضاء بنية", pos: "كلمة قرآنية", lemma: "الصيغة المشتقة :", root: "الجذر اللغوي :", close: "إغلاق" }
    };

    const QDC_RECITER_IDS = {
      "Yasser_Ad-Dussary_128kbps": 13,
      "MaherAlMuaiqly128kbps": 9,
      "Alafasy_128kbps": 7,
      "Abdurrahmaan_As-Sudais_192kbps": 3,
      "Saood_ash-Shuraym_128kbps": 10,
      "Husary_128kbps": 6,
      "Husary_128kbps_Mujawwad": 6,
      "Husary_Muallim_128kbps": 12,
      "Minshawy_Murattal_128kbps": 8
    };

    const DICO_CORAN_EXACT = {
      "الم": { fr: "Alif, Lām, Mīm", en: "Alif, Lām, Mīm", es: "Alif, Lām, Mīm", ar: "ألف لام ميم" },
      "فِيهِ": { fr: "en lui (à son sujet)", en: "in it", es: "en él", ar: "فِيهِ" },
      "رَيْبَ": { fr: "doute", en: "doubt", es: "duda", ar: "رَيْبَ" },
      "لَا": { fr: "aucun (pas de)", en: "no", es: "ninguna", ar: "لَا" },
      "ٱلْكِتَـٰبُ": { fr: "le Livre", en: "the Book", es: "el Libro", ar: "ٱلْكِتَـٰبُ" },
      "ذَٰلِكَ": { fr: "Ce (Voici)", en: "That / This", es: "Este", ar: "ذَٰلِكَ" },
      "لِّلْمُتَّقِينَ": { fr: "pour les pieux", en: "for the righteous", es: "para los piadosos", ar: "لِّلْمُتَّقِينَ" },
      "هُدًى": { fr: "un guide", en: "guidance", es: "una guía", ar: "هُدًى" }
    };

    const DICO_GLOSS_FR = {
      "in it": "en lui", "doubt": "doute", "no": "aucun", "the book": "le Livre", "that": "ce",
      "for the righteous": "pour les pieux", "guidance": "un guide", "a guidance": "un guide",
      "you may be": "tu sois", "in your body": "dans ton corps", "we will save you": "nous te sauverons"
    };
    const DICO_GLOSS_ES = {
      "in it": "en él", "doubt": "duda", "no": "ninguna", "the book": "el Libro", "that": "este",
      "for the righteous": "para los piadosos", "guidance": "una guía", "a guidance": "una guía"
    };

    function retirerBalisesHtml(str) {
      let out = '';
      let inTag = false;
      const s = str || '';
      for (let i = 0; i < s.length; i++) {
        if (s[i] === '<') inTag = true;
        else if (s[i] === '>') inTag = false;
        else if (!inTag) out += s[i];
      }
      return out;
    }

    function squeletteSansVoyelles(motArabe) {
      let s = '';
      const txt = retirerBalisesHtml(motArabe || '');
      for (let i = 0; i < txt.length; i++) {
        const c = txt.charCodeAt(i);
        if ((c >= 0x0621 && c <= 0x064A && c !== 0x0640) || c === 0x0671) {
          s += (c === 0x0671) ? 'ا' : txt[i];
        }
      }
      return s;
    }

    function extraireMotsTajweedPropres(htmlTajweedComplet) {
      if (!htmlTajweedComplet) return [];
      const temp = document.createElement('div');
      temp.innerHTML = htmlTajweedComplet;
      temp.querySelectorAll('span.end').forEach(el => el.remove());
      const src = temp.innerHTML.trim();
      const tokens = [];
      let courant = '';
      let profTag = 0;

      for (let i = 0; i < src.length; i++) {
        const ch = src[i];
        const codeCh = src.charCodeAt(i);
        if (ch === '<') { profTag++; courant += ch; }
        else if (ch === '>') { if (profTag > 0) profTag--; courant += ch; }
        else if (codeCh <= 32 && profTag === 0) {
          if (courant.trim().length > 0) { tokens.push(courant.trim()); courant = ''; }
        } else { courant += ch; }
      }
      if (courant.trim().length > 0) tokens.push(courant.trim());
      return tokens.filter(tok => squeletteSansVoyelles(tok).length > 0);
    }

    function majTextesInterfaceWbw() {
      const lg = (typeof currentLang !== 'undefined' && UI_WBW_I18N[currentLang]) ? currentLang : 'fr';
      const t = UI_WBW_I18N[lg];
      const bW = document.getElementById('btnToggleWbw');
      const bT = document.getElementById('btnToggleTajweed');
      const bB = document.getElementById('btnToggleBrown');
      if (bW) { bW.textContent = t.btnWbw; bW.style.display = (lg === 'ar') ? 'none' : 'inline-block'; }
      if (bT) bT.textContent = t.btnTaj;
      majBoutonSuivi();
      if (bB) bB.textContent = t.btnBrown;
      const lLem = document.getElementById('wbwLabelLemma');
      if (lLem) lLem.textContent = t.lemma;
      const lRoot = document.getElementById('wbwLabelRoot');
      if (lRoot) lRoot.textContent = t.root;
      const bCl = document.getElementById('wbwModalCancelBtn');
      if (bCl) bCl.textContent = t.close;
    }

    async function prechargerSegmentsKaraoke() {
      const selRec = document.getElementById('reciterSelect');
      if (!selRec) return null;
      const qdcId = QDC_RECITER_IDS[selRec.value] || 13;
      const cleChap = qdcId + '_chap_' + numSourateActuelle;
      if (cacheSegmentsRecitateur[cleChap]) return cacheSegmentsRecitateur[cleChap];
      try {
        const urlSeg = 'https://api.qurancdn.com/api/qdc/audio/reciters/' + qdcId + '/audio_files?chapter=' + numSourateActuelle + '&segments=true';
        const r = await fetch(urlSeg);
        const j = await r.json();
        if (j && j.audio_files && j.audio_files[0] && j.audio_files[0].verse_timings) {
          cacheSegmentsRecitateur[cleChap] = j.audio_files[0];
          return j.audio_files[0];
        }
      } catch (e) {}
      return null;
    }

    // Mot à mot calé directement sur la traduction de Muhammad Hamidullah (Zéro antislash pour compatibilité template literal)
    const GLOSE_HAMIDULLAH_FR = {
      "1:1": ["Au nom", "d'Allah", "le Tout Miséricordieux", "le Très Miséricordieux"],
      "1:2": ["Louange", "à Allah", "Seigneur", "des mondes"],
      "1:3": ["Le Tout Miséricordieux", "le Très Miséricordieux"],
      "1:4": ["Maître", "du Jour", "de la rétribution"],
      "1:5": ["C'est Toi [Seul]", "que nous adorons", "et c'est Toi [Seul]", "dont nous implorons secours"],
      "1:6": ["Guide-nous", "dans le droit", "chemin"],
      "1:7": ["le chemin", "de ceux que", "Tu as comblés de faveurs", "sur eux", "non pas de ceux", "qui ont encouru Ta colère", "sur eux", "ni", "des égarés"],
      "2:1": ["Alif, Lām, Mīm"],
      "2:2": ["C'est", "le Livre", "il n'y a aucun", "doute", "au sujet duquel", "c'est un guide", "pour les pieux"],
      "2:3": ["qui", "croient", "à l'inconnaissable", "et accomplissent", "la Salât", "et de ce que", "Nous leur avons attribué", "dépensent"],
      "2:4": ["et qui", "croient", "à ce qui", "t'a été descendu (révélé)", "vers toi", "et à ce qui", "a été descendu", "avant", "toi", "et quant à l'au-delà", "ils", "ont la certitude"],
      "2:5": ["Ceux-là", "sont sur", "le bon chemin", "de", "leur Seigneur", "et ce sont", "eux", "qui réussissent"],
      "10:92": ["Nous allons aujourd'hui", "épargner", "ton corps", "afin que tu deviennes", "pour ceux qui", "sont tes successeurs", "un signe", "Cependant", "beaucoup", "de", "gens", "à", "Nos signes (d'avertissement)", "ne prêtent aucune attention"],
      "96:1": ["Lis", "au nom", "de ton Seigneur", "qui", "a créé"],
      "96:2": ["Il a créé", "l'homme", "d'une", "adhérence"],
      "96:3": ["Lis !", "Ton Seigneur", "est le Très Noble"],
      "96:4": ["qui", "a enseigné", "par la plume"],
      "96:5": ["a enseigné", "à l'homme", "ce qu'il", "ne savait pas"]
    };
    const PONT_SENS_HAMIDULLAH = {
      book:["livre"], doubt:["doute"], in:["sujet","duquel","dans","en"], it:["sujet","duquel","lui","elle"],
      no:["aucun","pas","point","nul"], that:["c'est","ce","cela","voici"], this:["c'est","ce","ceci"],
      guidance:["guide","chemin"], righteous:["pieux","craignent"], god:["pieux","allah"],
      believe:["croient","foi"], unseen:["inconnaissable","invisible"], prayer:["salat","priere"],
      spend:["depensent"], provided:["attribue"], sent:["descendu","revele"], before:["avant"],
      hereafter:["au-dela","future"], lord:["seigneur"], successful:["reussissent"]
    };
    function normaliserAsciiSimple(str) {
      const s = String(str || '').toLowerCase().normalize('NFD');
      let out = '';
      for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i);
        if (c >= 0x0300 && c <= 0x036f) continue;
        if ((c >= 97 && c <= 122) || (c >= 48 && c <= 57)) out += s[i];
        else out += ' ';
      }
      return out.trim();
    }
    function retirerNumeroVersetDebut(str) {
      let s = String(str || '').trim();
      let i = 0;
      while (i < s.length && s.charCodeAt(i) >= 48 && s.charCodeAt(i) <= 57) i++;
      if (i > 0 && i < s.length && (s[i] === '.' || s[i] === '-')) {
        return s.slice(i + 1).trim();
      }
      return s;
    }
    async function traduireGlossaireVerset(mots, langCible, cleVerset) {
      if (langCible === 'ar') {
        mots.forEach(w => { w.tradLocalisee = ''; });
        return;
      }
      const manuel = (langCible === 'fr') ? GLOSE_HAMIDULLAH_FR[cleVerset] : null;
      if (manuel && manuel.length === mots.length) {
        mots.forEach((w, i) => { w.tradLocalisee = manuel[i]; });
        return;
      }
      const S = window.SOURATE_DATA;
      const vData = (S && S.versets) ? S.versets[numVersetActuel - 1] : null;
      const phrase = vData ? (langCible === 'en' ? (vData.tradEn || '') : (langCible === 'es' ? (vData.tradEs || '') : (vData.tradPropre || ''))) : '';
      if ((langCible === 'fr' || langCible === 'es') && phrase && mots.length > 0) {
        const txt = document.createElement('textarea');
        txt.innerHTML = phrase;
        const propre = retirerNumeroVersetDebut(txt.value);
        if (mots.length === 1) {
          mots[0].tradLocalisee = propre;
          return;
        }
        const outils = new Set(['le','la','les','l','un','une','des','du','de','d','au','aux','a','en','dans','sur','par','pour','vers','sans','avec','ce','cet','cette','ces','mon','ton','son','ma','ta','sa','mes','tes','ses','notre','votre','leur','nos','vos','leurs','je','tu','il','elle','on','nous','vous','ils','elles','me','te','se','lui','y','qui','que','qu','dont','ou','et','ni','mais','car','ne','n','pas','point','plus','aucun','aucune','c','est','sont','tout','tous','toute','toutes','tres','comme','afin','sujet']);
        const bruts = propre.split(' ').filter(Boolean);
        const groupes = [];
        let buf = [];
        const ponctForte = ',.;:!?])';
        for (let i = 0; i < bruts.length; i++) {
          const t = bruts[i];
          const sm = normaliserAsciiSimple(t).split(' ').filter(Boolean);
          const dernier = sm[sm.length - 1] || '';
          const estOutil = sm.length > 0 && sm.every(x => outils.has(x));
          buf.push(t);
          const rest = bruts.length - 1 - i;
          const manq = mots.length - (groupes.length + 1);
          const dernChar = t[t.length - 1] || '';
          if (rest <= manq) {
            groupes.push(buf.join(' '));
            buf = [];
          } else if ((!estOutil && !outils.has(dernier)) || ponctForte.includes(dernChar) || buf.length >= 4) {
            groupes.push(buf.join(' '));
            buf = [];
          }
        }
        if (buf.length) {
          if (groupes.length) groupes[groupes.length - 1] += ' ' + buf.join(' ');
          else groupes.push(buf.join(' '));
        }
        while (groupes.length > mots.length && groupes.length > 1) {
          let mI = 0, mL = 9999;
          for (let i = 0; i < groupes.length - 1; i++) {
            const l = groupes[i].length + groupes[i + 1].length;
            if (l < mL) { mL = l; mI = i; }
          }
          groupes.splice(mI, 2, groupes[mI] + ' ' + groupes[mI + 1]);
        }
        const pris = new Array(groupes.length).fill(false);
        mots.forEach((w, i) => {
          const enW = normaliserAsciiSimple((w.translation && w.translation.text) || '').split(' ').filter(Boolean);
          const cibleIdx = Math.min(groupes.length - 1, Math.round((i * (groupes.length - 1)) / Math.max(1, mots.length - 1)));
          let bestJ = -1, bestSc = -99;
          for (let j = Math.max(0, cibleIdx - 2); j <= Math.min(groupes.length - 1, cibleIdx + 2); j++) {
            if (pris[j]) continue;
            const gNorm = normaliserAsciiSimple(groupes[j]);
            let sc = -Math.abs(j - cibleIdx) * 0.6;
            enW.forEach(ew => {
              (PONT_SENS_HAMIDULLAH[ew] || [ew.slice(0,4)]).forEach(frK => {
                if (frK.length >= 3 && gNorm.includes(frK)) sc += 5;
              });
            });
            if (sc > bestSc) { bestSc = sc; bestJ = j; }
          }
          if (bestJ === -1) bestJ = pris.findIndex(p => !p);
          if (bestJ !== -1) {
            pris[bestJ] = true;
            w.tradLocalisee = groupes[bestJ];
          } else {
            w.tradLocalisee = groupes[cibleIdx] || '';
          }
        });
        return;
      }
      mots.forEach(w => { w.tradLocalisee = (w.translation && w.translation.text) ? w.translation.text : ''; });
    }

    async function chargerDonneesMotAMotEtTajweed() {
      majTextesInterfaceWbw();
      const langSite = (typeof currentLang !== 'undefined' && ['fr','en','es','ar'].includes(currentLang)) ? currentLang : 'fr';
      const afficherMotAMot = modeMotAMotActif && (langSite !== 'ar');

      const btnWbw = document.getElementById('btnToggleWbw');
      const btnTaj = document.getElementById('btnToggleTajweed');
      if (btnWbw) btnWbw.classList.toggle('active', afficherMotAMot);
      if (btnTaj) btnTaj.classList.toggle('active', modeTajweedActif);

      const arEl = document.getElementById('arabicVerseEl');
      const wbwBox = document.getElementById('wbwStageContainer');
      const legBar = document.getElementById('tajweedLegendBar');
      if (!arEl || !wbwBox) return;

      if (legBar) legBar.style.display = modeTajweedActif ? 'flex' : 'none';

      const cleVerset = numSourateActuelle + ':' + numVersetActuel;
      dernierVersetCharge = cleVerset + '_' + langSite + '_' + (modeMotAMotActif ? '1' : '0') + '_' + (modeTajweedActif ? '1' : '0');


      if (!cacheWbwData[cleVerset]) {
        try {
          const [respWords, respTaj] = await Promise.all([
            fetch('https://api.quran.com/api/v4/verses/by_key/' + cleVerset + '?language=en&words=true&word_fields=text_uthmani,text_uthmani_tajweed,audio_url'),
            fetch('https://api.quran.com/api/v4/quran/verses/uthmani_tajweed?verse_key=' + cleVerset)
          ]);
          const jsonWords = await respWords.json();
          const jsonTaj = await respTaj.json();
          if (jsonWords && jsonWords.verse) cacheWbwData[cleVerset] = jsonWords.verse;
          if (jsonTaj && jsonTaj.verses && jsonTaj.verses[0] && jsonTaj.verses[0].text_uthmani_tajweed) {
            cacheTajweedVerset[cleVerset] = jsonTaj.verses[0].text_uthmani_tajweed;
          }
        } catch (err) { return; }
      }

      const dataVerset = cacheWbwData[cleVerset];
      if (!dataVerset || !dataVerset.words) return;

      const htmlTajComplet = cacheTajweedVerset[cleVerset] || dataVerset.text_uthmani_tajweed || '';
      const vraisMots = dataVerset.words.filter(w => w.char_type_name === 'word');
      const tokensTajweed = extraireMotsTajweedPropres(htmlTajComplet);

      let totalPoidsLettres = 0;
      vraisMots.forEach((w, idx) => {
        w.indexMotReel = idx + 1;
        w.totalMotsVerset = vraisMots.length;
        w.poidsLettres = Math.max(2, squeletteSansVoyelles(w.text_uthmani).length);
        totalPoidsLettres += w.poidsLettres;
        if (tokensTajweed[idx]) w.htmlTajweedMot = tokensTajweed[idx];
        else if (w.text_uthmani_tajweed) w.htmlTajweedMot = w.text_uthmani_tajweed;
        else w.htmlTajweedMot = w.text_uthmani;
      });

      let cumul = 0;
      vraisMots.forEach(w => {
        w.ratioDebut = cumul / (totalPoidsLettres || 1);
        cumul += w.poidsLettres;
        w.ratioFin = cumul / (totalPoidsLettres || 1);
      });
      motsActuelsDuVerset = vraisMots;

      await traduireGlossaireVerset(vraisMots, langSite, cleVerset);
      const signatureActuelle = cleVerset + '_' + langSite + '_' + (modeMotAMotActif ? '1' : '0') + '_' + (modeTajweedActif ? '1' : '0');
      if (signatureActuelle !== dernierVersetCharge) return;

      if (!afficherMotAMot) {
        wbwBox.style.display = 'none';
        arEl.style.display = 'block';
        arEl.innerHTML = '';
        vraisMots.forEach(w => {
          const span = document.createElement('span');
          span.className = 'inline-clickable-word';
          span.innerHTML = modeTajweedActif ? w.htmlTajweedMot : w.text_uthmani;
          span.onclick = (e) => { e.stopPropagation(); ouvrirModalMot(w); };
          arEl.appendChild(span);
          arEl.appendChild(document.createTextNode(' '));
        });
      } else {
        arEl.style.display = 'none';
        wbwBox.style.display = 'flex';
        wbwBox.innerHTML = '';
        vraisMots.forEach(w => {
          const item = document.createElement('div');
          item.className = 'wbw-word-box';
          const htmlMotArabe = modeTajweedActif ? w.htmlTajweedMot : w.text_uthmani;
          const motArabe = document.createElement('div');
          motArabe.className = 'wbw-ar';
          motArabe.innerHTML = htmlMotArabe;
          const traduction = document.createElement('div');
          traduction.className = 'wbw-tr';
          traduction.textContent = w.tradLocalisee || '';
          item.append(motArabe, traduction);
          item.onclick = () => ouvrirModalMot(w);
          wbwBox.appendChild(item);
        });
      }
    }

    function basculerMotAMot() {
      modeMotAMotActif = !modeMotAMotActif;
      try { localStorage.setItem('coran_wbw_mode', modeMotAMotActif ? '1' : '0'); } catch(e){}
      chargerDonneesMotAMotEtTajweed();
    }

    function basculerTajweed() {
      modeTajweedActif = !modeTajweedActif;
      try { localStorage.setItem('coran_tajweed_mode', modeTajweedActif ? '1' : '0'); } catch(e){}
      chargerDonneesMotAMotEtTajweed();
    }

    function ouvrirModalMot(w) {
      majTextesInterfaceWbw();
      const modal = document.getElementById('wbwWordModal');
      if (!modal) return;
      const lg = (typeof currentLang !== 'undefined' && UI_WBW_I18N[currentLang]) ? currentLang : 'fr';
      const t = UI_WBW_I18N[lg];

      const nomS = (window.SOURATE_DATA && window.SOURATE_DATA.nomSourate) ? window.SOURATE_DATA.nomSourate : ('Sourate ' + numSourateActuelle);
      const posReelle = w.indexMotReel || 1;
      document.getElementById('wbwModalRef').textContent = nomS + ' ' + numSourateActuelle + ':' + numVersetActuel + ':' + posReelle;
      document.getElementById('wbwModalAr').innerHTML = modeTajweedActif ? (w.htmlTajweedMot || w.text_uthmani) : w.text_uthmani;
      document.getElementById('wbwModalTr').textContent = (lg === 'ar') ? '' : (w.tradLocalisee || (w.translation && w.translation.text) || '');

      const squelette = squeletteSansVoyelles(w.text_uthmani);
      document.getElementById('wbwModalLemma').textContent = w.text_uthmani;
      document.getElementById('wbwModalRoot').textContent = squelette.split('').join(' ');

      const playerMot = document.getElementById('wbwSingleWordAudio');
      const pad3 = n => String(n).padStart(3, '0');
      const fichierMp3 = pad3(numSourateActuelle) + '_' + pad3(numVersetActuel) + '_' + pad3(posReelle) + '.mp3';
      const urlMot = 'https://audio.qurancdn.com/wbw/' + fichierMp3;

      const btnAudio = document.getElementById('wbwModalAudioBtn');
      btnAudio.onclick = () => { playerMot.src = urlMot; playerMot.play().catch(()=>{}); };

      modal.classList.add('open');
    }

    function fermerModalMot() {
      const playerMot = document.getElementById('wbwSingleWordAudio');
      if (playerMot) playerMot.pause();
      const modal = document.getElementById('wbwWordModal');
      if (modal) modal.classList.remove('open');
    }

    let rafKaraoke = 0, elsKaraoke = null, elsSigKaraoke = '', idxKaraoke = -1, vtCle = '', vtCache = null;

    function elementsKaraoke() {
      const sig = dernierVersetCharge + '|' + motsActuelsDuVerset.length;
      if (!elsKaraoke || elsSigKaraoke !== sig || (!elsKaraoke.longueur ? (document.querySelector('.wbw-word-box, .inline-clickable-word') !== null) : !elsKaraoke.longueur.isConnected)) {
        const boites = Array.from(document.querySelectorAll('.wbw-stage-grid .wbw-word-box'));
        const mots = Array.from(document.querySelectorAll('#arabicVerseEl .inline-clickable-word'));
        elsKaraoke = { boites: boites, mots: mots, longueur: boites[0] || mots[0] || null };
        elsSigKaraoke = sig; idxKaraoke = -1;
      }
      return elsKaraoke;
    }

    function mettreAJourSurlignageKaraoke() {
      const mainAudioEl = document.getElementById('ayahAudio');
      if (!mainAudioEl || mainAudioEl.paused || !mainAudioEl.duration || isNaN(mainAudioEl.duration)) return;
      if (!modeSuiviActif || !suiviDisponible()) { eteindreSurlignageKaraoke(); return; }

      const totalMots = motsActuelsDuVerset.length;
      if (totalMots === 0) return;

      let activeIndex = -1;
      let progressionMot = 0;
      const selRec = document.getElementById('reciterSelect');
      const qdcId = (selRec && QDC_RECITER_IDS[selRec.value]) ? QDC_RECITER_IDS[selRec.value] : null;
      const cleVerset = numSourateActuelle + ':' + numVersetActuel;
      const cleVt = qdcId + '|' + cleVerset;
      if (cleVt !== vtCle || (!vtCache && qdcId)) {
        const chapData = qdcId ? cacheSegmentsRecitateur[qdcId + '_chap_' + numSourateActuelle] : null;
        vtCache = (chapData && chapData.verse_timings) ? (chapData.verse_timings.find(v => v.verse_key === cleVerset) || null) : null;
        vtCle = cleVt;
      }
      const vt = vtCache;
      const ratioTemps = Math.min(0.999, Math.max(0, mainAudioEl.currentTime / mainAudioEl.duration));

      if (vt && vt.segments && vt.segments.length > 0) {
        const dureeQdcMs = Math.max(500, vt.timestamp_to - vt.timestamp_from);
        const msCalibre = ratioTemps * dureeQdcMs;
        for (let i = 0; i < vt.segments.length; i++) {
          const seg = vt.segments[i];
          if (seg && seg.length >= 3) {
            const startRel = seg[1] - vt.timestamp_from;
            const endRel = (seg[2] - vt.timestamp_from) + 120;
            if (msCalibre >= startRel && msCalibre <= endRel) {
              activeIndex = seg[0] - 1;
              progressionMot = Math.min(1, Math.max(0, (msCalibre - startRel) / Math.max(1, endRel - startRel)));
              break;
            }
          }
        }
      }

      if (activeIndex < 0 || activeIndex >= totalMots) {
        for (let i = 0; i < totalMots; i++) {
          if (ratioTemps >= motsActuelsDuVerset[i].ratioDebut && ratioTemps <= motsActuelsDuVerset[i].ratioFin) {
            activeIndex = i;
            progressionMot = (ratioTemps - motsActuelsDuVerset[i].ratioDebut) / Math.max(0.0001, motsActuelsDuVerset[i].ratioFin - motsActuelsDuVerset[i].ratioDebut);
            break;
          }
        }
      }

      const els = elementsKaraoke();
      if (activeIndex !== idxKaraoke) {
        if (idxKaraoke >= 0) {
          if (els.boites[idxKaraoke]) els.boites[idxKaraoke].classList.remove('playing');
          if (els.mots[idxKaraoke]) els.mots[idxKaraoke].classList.remove('playing');
        }
        if (activeIndex >= 0) {
          if (els.boites[activeIndex]) els.boites[activeIndex].classList.add('playing');
          if (els.mots[activeIndex]) els.mots[activeIndex].classList.add('playing');
        }
        idxKaraoke = activeIndex;
      }
      if (activeIndex >= 0) {
        const v = progressionMot.toFixed(3);
        if (els.boites[activeIndex]) els.boites[activeIndex].style.setProperty('--p', v);
        if (els.mots[activeIndex]) els.mots[activeIndex].style.setProperty('--p', v);
      }
    }

    function boucleKaraoke() {
      rafKaraoke = 0;
      const a = document.getElementById('ayahAudio');
      if (!a || a.paused || a.ended) return;
      mettreAJourSurlignageKaraoke();
      rafKaraoke = requestAnimationFrame(boucleKaraoke);
    }
    function demarrerBoucleKaraoke() { if (!rafKaraoke) rafKaraoke = requestAnimationFrame(boucleKaraoke); }

    function eteindreSurlignageKaraoke() {
      if (rafKaraoke) { cancelAnimationFrame(rafKaraoke); rafKaraoke = 0; }
      document.querySelectorAll('.wbw-word-box.playing, .inline-clickable-word.playing').forEach(el => el.classList.remove('playing'));
      idxKaraoke = -1;
    }

    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(chargerDonneesMotAMotEtTajweed, 60);

      const mainAudioEl = document.getElementById('ayahAudio');
      const selRecitateur = document.getElementById('reciterSelect');
      if (selRecitateur) selRecitateur.addEventListener('change', majBoutonSuivi);
      majBoutonSuivi();
      if (mainAudioEl) {
        mainAudioEl.addEventListener('play', () => {
          if (suiviDisponible() && modeSuiviActif) {
            prechargerSegmentsKaraoke().then(() => { vtCle = ''; demarrerBoucleKaraoke(); });
            demarrerBoucleKaraoke();
          } else {
            eteindreSurlignageKaraoke();
          }
        });
        mainAudioEl.addEventListener('timeupdate', mettreAJourSurlignageKaraoke);
        mainAudioEl.addEventListener('pause', eteindreSurlignageKaraoke);
        mainAudioEl.addEventListener('ended', eteindreSurlignageKaraoke);
      }
      document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
        if (e.code === 'Space') { e.preventDefault(); toggleAudioSync(); }
        else if (e.code === 'ArrowRight') { const n = document.getElementById('nextVerseLink'); if (n) n.click(); }
        else if (e.code === 'ArrowLeft') { const p = document.getElementById('prevVerseLink'); if (p) p.click(); }
      });

      setInterval(() => {
        const lg = (typeof currentLang !== 'undefined' && ['fr','en','es','ar'].includes(currentLang)) ? currentLang : 'fr';
        const signatureActuelle = numSourateActuelle + ':' + numVersetActuel + '_' + lg + '_' + (modeMotAMotActif ? '1' : '0') + '_' + (modeTajweedActif ? '1' : '0');
        const arEl = document.getElementById('arabicVerseEl');
        const besoinMaj = (signatureActuelle !== dernierVersetCharge) || (!modeMotAMotActif && arEl && arEl.children.length === 0 && motsActuelsDuVerset.length > 0);
        if (besoinMaj) chargerDonneesMotAMotEtTajweed();
      }, 400);
    });
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
















<style id="style-refs-cliquables">
.tafsir-ref-link {
  color: #38bdf8 !important;
  background: rgba(56, 189, 248, 0.12) !important;
  border: 1px solid rgba(56, 189, 248, 0.35) !important;
  padding: 1px 6px !important;
  border-radius: 6px !important;
  text-decoration: none !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.18s ease !important;
  display: inline-block !important;
}
.tafsir-ref-link:hover {
  background: rgba(56, 189, 248, 0.28) !important;
  color: #ffffff !important;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.5) !important;
  transform: translateY(-1px) !important;
}
</style>
<script id="script-refs-cliquables">
(function(){
  window.allerAuVerset = function(numVerset) {
    var sel = document.querySelector('select');
    if (sel) {
      for (var i = 0; i < sel.options.length; i++) {
        var optTxt = sel.options[i].textContent || '';
        var m = optTxt.match(/(\d+)/);
        if (m && parseInt(m[1], 10) === numVerset) {
          sel.selectedIndex = i;
          sel.dispatchEvent(new Event('change', { bubbles: true }));
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
    }
  };

  function rendreReferencesCliquables() {
    var blocs = document.querySelectorAll('.tafsir-box, .tafsir-content, #tafsirContent, [class*="tafsir"]');
    for (var i = 0; i < blocs.length; i++) {
      var el = blocs[i];
      if (el.dataset.refsReady === '1' || el.querySelector('button, select')) continue;
      var html = el.innerHTML;
      if (!html) continue;

      // Transformer (v.4) ou (v.10-12) ou (آية 4) en bouton qui change directement le verset de la sourate actuelle
      var nvHtml = html.replace(/\b(v\.|verset\s+|aleya\s+|آية\s*)(\d+)(?:\s*[–\-]\s*\d+)?/gi, function(match, prefix, num) {
        return '<span class="tafsir-ref-link" onclick="window.allerAuVerset(' + num + ')" title="Aller directement au verset ' + num + '">' + match + '</span>';
      });

      if (nvHtml !== html) {
        el.innerHTML = nvHtml;
      }
      el.dataset.refsReady = '1';
    }
  }

  document.addEventListener('click', function(){ setTimeout(rendreReferencesCliquables, 40); });
  document.addEventListener('change', function(){ setTimeout(rendreReferencesCliquables, 40); });
  window.addEventListener('DOMContentLoaded', rendreReferencesCliquables);
  setInterval(rendreReferencesCliquables, 250);
})();
</script>








<link rel="preconnect" href="[https://api.quran.com](https://api.quran.com)" crossorigin>
<link rel="preconnect" href="[https://api.qurancdn.com](https://api.qurancdn.com)" crossorigin>
<link rel="preconnect" href="[https://everyayah.com](https://everyayah.com)" crossorigin>

<link rel="preconnect" href="[https://api.quran.com](https://api.quran.com)" crossorigin>
<link rel="preconnect" href="[https://api.qurancdn.com](https://api.qurancdn.com)" crossorigin>
<link rel="preconnect" href="[https://everyayah.com](https://everyayah.com)" crossorigin>

<meta name="yandex-verification" content="9ed8551291c4ae1e">
<link rel="preconnect" href="https://api.quran.com" crossorigin>
<link rel="preconnect" href="https://api.qurancdn.com" crossorigin>
<link rel="preconnect" href="https://everyayah.com" crossorigin>
<link rel="preconnect" href="https://translate.googleapis.com" crossorigin>
<style id="patch-master-v77">
:root {
  --wbw-ar-size: 2.15rem;
  --wbw-tr-size: 0.92rem;
  --wbw-pad-v: 14px;
  --wbw-pad-h: 18px;
  --wbw-min-w: 92px;
}

/* 1. SOLEIL DORÉ PUR 150px EN ARRIÈRE-PLAN (Z-INDEX 0 POUR CONTRASTE > 4.5:1) */
html body #flatEarthSun,
html body .flat-earth-sun,
html body [id*="sun" i]:not([id*="sound" i]),
html body [class*="sun" i]:not([class*="sound" i]),
html body [data-astre-role="sun"],
html body .astre-soleil-pur-v77 {
  width: 150px !important;
  height: 150px !important;
  min-width: 150px !important;
  min-height: 150px !important;
  max-width: 150px !important;
  max-height: 150px !important;
  border-radius: 50% !important;
  border: none !important;
  outline: none !important;
  background: radial-gradient(circle at 50% 50%, #ffffff 0%, #fffef0 26%, #fef08a 52%, #facc15 76%, #f59e0b 94%, rgba(245, 158, 11, 0) 100%) !important;
  background-image: radial-gradient(circle at 50% 50%, #ffffff 0%, #fffef0 26%, #fef08a 52%, #facc15 76%, #f59e0b 94%, rgba(245, 158, 11, 0) 100%) !important;
  background-color: #fde047 !important;
  box-shadow: 0 0 45px 14px rgba(253, 224, 71, 0.55), 0 0 95px 30px rgba(245, 158, 11, 0.30) !important;
  filter: none !important;
  backdrop-filter: none !important;
  mix-blend-mode: normal !important;
  will-change: transform !important;
  z-index: 0 !important;
  pointer-events: none !important;
  opacity: 0.72 !important;
}
html body #flatEarthSun::before, html body #flatEarthSun::after,
html body .flat-earth-sun::before, html body .flat-earth-sun::after,
html body .astre-soleil-pur-v77::before, html body .astre-soleil-pur-v77::after,
html body #flatEarthSun *, html body .flat-earth-sun *, html body .astre-soleil-pur-v77 * {
  display: none !important; content: none !important; background: none !important; box-shadow: none !important; opacity: 0 !important;
}

/* 2. LUNE BLANCHE PURE 150px EN ARRIÈRE-PLAN (Z-INDEX 0 POUR CONTRASTE > 4.5:1) */
html body #flatEarthMoon,
html body .flat-earth-moon,
html body [id*="moon" i],
html body [class*="moon" i],
html body [data-astre-role="moon"],
html body .astre-lune-pure-v77 {
  width: 150px !important;
  height: 150px !important;
  min-width: 150px !important;
  min-height: 150px !important;
  max-width: 150px !important;
  max-height: 150px !important;
  border-radius: 50% !important;
  border: none !important;
  outline: none !important;
  background: radial-gradient(circle at 50% 50%, #ffffff 0%, #f8fafc 38%, #e2e8f0 70%, rgba(186, 230, 253, 0) 100%) !important;
  background-image: radial-gradient(circle at 50% 50%, #ffffff 0%, #f8fafc 38%, #e2e8f0 70%, rgba(186, 230, 253, 0) 100%) !important;
  background-color: #ffffff !important;
  box-shadow: 0 0 40px 12px rgba(255, 255, 255, 0.50), 0 0 85px 28px rgba(148, 163, 184, 0.25) !important;
  filter: none !important;
  backdrop-filter: none !important;
  mix-blend-mode: normal !important;
  will-change: transform !important;
  z-index: 0 !important;
  pointer-events: none !important;
  opacity: 0.72 !important;
}
html body #flatEarthMoon::before, html body #flatEarthMoon::after,
html body .flat-earth-moon::before, html body .flat-earth-moon::after,
html body .astre-lune-pure-v77::before, html body .astre-lune-pure-v77::after,
html body #flatEarthMoon *, html body .flat-earth-moon *, html body .astre-lune-pure-v77 * {
  display: none !important; content: none !important; background: none !important; box-shadow: none !important; opacity: 0 !important;
}

/* PANNEAUX ET CARTES OPAQUES AU PREMIER PLAN */
html body a[href*="sourate-"],
html body input[type="text"],
html body input[type="search"],
html body input:not([type]),
html body .panneau-opaque-v77 {
  background-color: rgba(4, 11, 22, 0.92) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  position: relative !important;
  z-index: 2 !important;
}

/* 3. MASQUAGE DE MAHER AL-MUAIQLY, BOUTON REPRENDRE DOUBLON & TRADUCTION DU BAS EN MOT-À-MOT */
html body img[src*="maher" i],
html body [data-reciter*="maher" i],
html body .maher-supprime-v77,
html body .wbw-masquer-traduction-bas,
html body .khatm-doublon-reprendre-masque {
  display: none !important; visibility: hidden !important; height: 0 !important; max-height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; overflow: hidden !important; opacity: 0 !important; pointer-events: none !important;
}

/* 4. BANDEAU & CARTES MOT-À-MOT */
html body #wbwSensLectureBanner {
  width: 100% !important; text-align: center !important; font-size: 0.78rem !important; letter-spacing: 0.04em !important; color: #38bdf8 !important; margin-bottom: 10px !important; opacity: 0.92 !important; font-weight: 500 !important; direction: ltr !important; cursor: pointer !important; user-select: none !important;
}
html body .wbw-card-unit {
  position: relative !important; padding: var(--wbw-pad-v) var(--wbw-pad-h) !important; min-width: var(--wbw-min-w) !important; border-radius: 18px !important; transform-origin: 50% 80% !important; will-change: transform, opacity, box-shadow, border-color !important; backface-visibility: hidden !important;
}
html body .wbw-card-unit::before {
  content: attr(data-word-num); position: absolute !important; top: 5px !important; right: 8px !important; font-size: 0.65rem !important; font-weight: 700 !important; color: rgba(56, 189, 248, 0.75) !important; line-height: 1 !important; pointer-events: none !important;
}
html body .wbw-card-unit > *:first-child {
  font-size: var(--wbw-ar-size) !important; line-height: 1.45 !important; direction: rtl !important; text-align: center !important;
}
html body .wbw-card-unit > *:first-child::before { content: none !important; display: none !important; }
html body .wbw-card-unit > *:last-child {
  font-size: var(--wbw-tr-size) !important; direction: ltr !important; text-align: center !important;
}

/* 5. MODE SUIVI VERSET : BLANC TAMISÉ (78%) AU REPOS -> 100% LUMINEUX + BLEU NÉON À LA LECTURE */
html body #arabicVerse, html body .arabic-glow-verse {
  direction: rtl !important;
  color: rgba(255, 255, 255, 0.78) !important;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.14) !important;
}
html body .verse-stage .arabic-glow-verse span,
html body .verse-stage #arabicVerse span,
html body .ar-word-follow,
html body .follow-word {
  position: relative !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: rgba(255, 255, 255, 0.78) !important;
  opacity: 0.78 !important;
  padding: 0 7px !important;
  display: inline-block !important;
  transform-origin: 50% 85% !important;
  will-change: transform, opacity, filter, text-shadow, color !important;
  backface-visibility: hidden !important;
  -webkit-font-smoothing: antialiased !important;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.14) !important;
}

/* 6. BOUTONS DE LANGUE ÉTENDUS (DE, IT, ID, RU) AVEC DRAPEAUX IPHONE EXACTS */
html body #btnLangDeV77,
html body #btnLangItV77,
html body #btnLangIdV77,
html body #btnLangRuV77 {
  cursor: pointer !important; transition: all 0.2s ease !important; display: inline-flex !important; align-items: center !important; justify-content: center !important;
}
html body #btnLangDeV77.active-ext-v77,
html body #btnLangItV77.active-ext-v77,
html body #btnLangIdV77.active-ext-v77,
html body #btnLangRuV77.active-ext-v77 {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.28), rgba(56, 189, 248, 0.18)) !important;
  border: 1px solid #38bdf8 !important; color: #ffffff !important; border-radius: 999px !important;
}

/* 7. PLANIFICATEUR KHATM ULTRA-COMPACT (STYLE SÉLECTEUR RÉCITATEUR) */
#khatmPlannerWidgetV77 {
  width: 100% !important;
  box-sizing: border-box !important;
  margin: 12px auto 0 auto !important;
  padding: 12px 10px 4px 10px !important;
  border-top: 1px solid rgba(56, 189, 248, 0.16) !important;
  background: transparent !important;
  color: #f8fafc !important;
  font-family: system-ui, -apple-system, sans-serif !important;
  position: relative !important;
  z-index: 10 !important;
  text-align: center !important;
}
.khatm-compact-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.khatm-reciter-select {
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  background-color: rgba(8, 22, 42, 0.92) !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%2338bdf8' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E") !important;
  background-repeat: no-repeat !important;
  background-position: right 11px center !important;
  background-size: 9px 6px !important;
  border: 1px solid rgba(56, 189, 248, 0.38) !important;
  color: #f1f5f9 !important;
  padding: 6px 28px 6px 13px !important;
  border-radius: 999px !important;
  font-size: 0.77rem !important;
  font-weight: 600 !important;
  outline: none !important;
  cursor: pointer !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35), inset 0 0 8px rgba(56, 189, 248, 0.06) !important;
  transition: all 0.18s ease !important;
}
[dir="rtl"] .khatm-reciter-select,
#khatmPlannerWidgetV77[style*="rtl"] .khatm-reciter-select {
  background-position: left 11px center !important;
  padding: 6px 13px 6px 28px !important;
}
.khatm-reciter-select:hover {
  border-color: #38bdf8 !important;
  background-color: rgba(14, 34, 64, 0.96) !important;
  color: #ffffff !important;
}
.khatm-reciter-select option {
  background-color: #06101e !important;
  color: #f8fafc !important;
}
.khatm-btn-green-compact {
  background: rgba(6, 46, 36, 0.75) !important;
  border: 1px solid rgba(16, 185, 129, 0.55) !important;
  color: #34d399 !important;
  padding: 6px 14px !important;
  border-radius: 999px !important;
  font-size: 0.77rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  text-decoration: none !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.12) !important;
  transition: all 0.18s ease !important;
}
.khatm-btn-green-compact:hover {
  background: rgba(16, 185, 129, 0.28) !important;
  color: #ffffff !important;
  border-color: #6ee7b7 !important;
}
.khatm-btn-cyan-compact {
  background: rgba(8, 25, 48, 0.82) !important;
  border: 1px solid rgba(56, 189, 248, 0.48) !important;
  color: #38bdf8 !important;
  padding: 6px 13px !important;
  border-radius: 999px !important;
  font-size: 0.76rem !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  text-decoration: none !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  transition: all 0.18s ease !important;
}
.khatm-btn-cyan-compact:hover {
  background: rgba(14, 165, 233, 0.28) !important;
  color: #ffffff !important;
  border-color: #7dd3fc !important;
}
.khatm-btn-reset-mini {
  background: rgba(30, 10, 18, 0.65) !important;
  border: 1px solid rgba(248, 113, 113, 0.35) !important;
  color: #fca5a5 !important;
  padding: 5px 10px !important;
  border-radius: 999px !important;
  font-size: 0.74rem !important;
  font-weight: 600 !important;
  cursor: pointer !important;
}
.khatm-btn-reset-mini:hover {
  background: rgba(239, 68, 68, 0.28) !important;
  color: #ffffff !important;
}
.khatm-mini-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 7px;
  font-size: 0.73rem;
  color: #cbd5e1;
}
.khatm-mini-bar-wrap {
  width: 140px;
  height: 5px;
  background: rgba(15, 23, 42, 0.95);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid rgba(56, 189, 248, 0.25);
}
.khatm-mini-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #38bdf8, #2dd4bf, #fde047);
  border-radius: 999px;
  transition: width 0.3s ease;
}
</style>
<script id="script-master-v77">(function codeClientV77() {
  var LANGUES_EXT_SUPPORTEES = { de: 27, it: 153, id: 33, ru: 45 };
  var TOUTES_LANGUES_8 = { fr: true, en: true, es: true, ar: true, de: true, it: true, id: true, ru: true };
  var langExtActive = "";
  var langueNativeCible = "";
  var IgnoreClicInterneFr = false;

  try {
    var oldIds = ["khatmPlannerWidgetV66", "khatmPlannerWidgetV67", "khatmPlannerWidgetV68", "khatmPlannerWidgetV69", "khatmPlannerWidgetV70", "khatmPlannerWidgetV73", "khatmPlannerWidgetV75", "khatmPlannerWidgetV76"];
    for (var w = 0; w < oldIds.length; w++) {
      var elOld = document.getElementById(oldIds[w]);
      if (elOld && elOld.parentNode) elOld.parentNode.removeChild(elOld);
    }

    var urlParams = new URLSearchParams(window.location.search);
    var pLang = (urlParams.get("lang") || "").split("-")[0].toLowerCase();

    if (pLang && TOUTES_LANGUES_8[pLang]) {
      localStorage.setItem("corantafsir_user_lang_v77", pLang);
      if (LANGUES_EXT_SUPPORTEES[pLang]) {
        langExtActive = pLang;
        localStorage.setItem("corantafsir_lang_ext_v77", pLang);
      } else {
        langExtActive = "";
        langueNativeCible = pLang;
        localStorage.setItem("corantafsir_lang_ext_v77", "native");
      }
    } else {
      var estRobotSeo = /bot|googlebot|crawler|spider|yandex|bingbot|slurp|duckduckbot|baiduspider|lighthouse/i.test(navigator.userAgent || "");
      if (!estRobotSeo && localStorage.getItem("corantafsir_manual_click_v77") === "1") {
        var savedManual = localStorage.getItem("corantafsir_user_lang_v77") || "fr";
        if (LANGUES_EXT_SUPPORTEES[savedManual]) {
          langExtActive = savedManual;
        } else if (TOUTES_LANGUES_8[savedManual] && savedManual !== "fr") {
          langExtActive = "";
          langueNativeCible = savedManual;
        }
      }
    }
  } catch (e) {}

  function synchroniserUrlEtSeoAvecLangueEtVerset() {
    try {
      var lang = obtenirLangueActive();
      var vk = obtenirCleVerset();
      var parts = vk ? vk.split(":") : [];
      var numS = parts.length === 2 ? Number(parts[0]) : 0;
      var numV = parts.length === 2 ? Number(parts[1]) : 0;

      if (document.documentElement) {
        if (document.documentElement.getAttribute("lang") !== lang) {
          document.documentElement.setAttribute("lang", lang);
        }
        var dirAttendu = lang === "ar" ? "rtl" : "ltr";
        if (document.documentElement.getAttribute("dir") !== dirAttendu) {
          document.documentElement.setAttribute("dir", dirAttendu);
        }
      }

      var pathBase = (numS && numV) ? ("/sourate-" + numS + "-verset-" + numV + ".html") : "/";
      var urlBaseFr = "https://corantafsir.com" + pathBase;
      var urlCanoniqueLang = lang === "fr" ? urlBaseFr : (urlBaseFr + "?lang=" + lang);

      var linkCanon = document.querySelector("link[rel='canonical']");
      if (!linkCanon) {
        linkCanon = document.createElement("link");
        linkCanon.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanon);
      }
      if (linkCanon.getAttribute("href") !== urlCanoniqueLang) {
        linkCanon.setAttribute("href", urlCanoniqueLang);
      }

      var languesSeo = ["fr", "en", "es", "ar", "de", "it", "id", "ru"];
      for (var l = 0; l < languesSeo.length; l++) {
        var codeL = languesSeo[l];
        var linkAlt = document.querySelector("link[rel='alternate'][hreflang='" + codeL + "']");
        if (!linkAlt) {
          linkAlt = document.createElement("link");
          linkAlt.setAttribute("rel", "alternate");
          linkAlt.setAttribute("hreflang", codeL);
          document.head.appendChild(linkAlt);
        }
        var hrefAlt = codeL === "fr" ? urlBaseFr : (urlBaseFr + "?lang=" + codeL);
        if (linkAlt.getAttribute("href") !== hrefAlt) {
          linkAlt.setAttribute("href", hrefAlt);
        }
      }
      var linkXDef = document.querySelector("link[rel='alternate'][hreflang='x-default']");
      if (!linkXDef) {
        linkXDef = document.createElement("link");
        linkXDef.setAttribute("rel", "alternate");
        linkXDef.setAttribute("hreflang", "x-default");
        document.head.appendChild(linkXDef);
      }
      if (linkXDef.getAttribute("href") !== urlBaseFr) {
        linkXDef.setAttribute("href", urlBaseFr);
      }

      // Mettre à jour les liens internes vers les sourates pour conserver ?lang=xx
      var liensInternes = document.querySelectorAll("a[href*='sourate-'], a[href*='index.html']");
      for (var aIdx = 0; aIdx < liensInternes.length; aIdx++) {
        var aEl = liensInternes[aIdx];
        if (aEl.closest("#khatmPlannerWidgetV77")) continue;
        var rawHref = aEl.getAttribute("href") || "";
        var baseHref = rawHref.split("?")[0];
        var nvHref = lang === "fr" ? baseHref : (baseHref + "?lang=" + lang);
        if (rawHref !== nvHref) aEl.setAttribute("href", nvHref);
      }

      if (window.location.protocol === "http:" || window.location.protocol === "https:") {
        var sp = new URLSearchParams(window.location.search);
        if (lang === "fr") {
          sp.delete("lang");
        } else {
          sp.set("lang", lang);
        }
        sp.delete("khatm_verse");
        var qs = sp.toString();
        var nouvelleUrlRelative = pathBase + (qs ? "?" + qs : "");
        if (window.location.pathname + window.location.search !== nouvelleUrlRelative) {
          window.history.replaceState(null, "", nouvelleUrlRelative);
        }
      }

      var nomS = (numS && NOMS_SOURATES_COURT[numS]) ? NOMS_SOURATES_COURT[numS] : "";
      var TITRES_META_I18N = {
        fr: numS ? ("Sourate " + nomS + " (" + numS + ":" + numV + ") — Coran, Audio, Mot à Mot & Tafsīr") : "Le Noble Coran & Tafsīr Al-Mukhtasar — Audio, Tajwīd & Mot à Mot (8 Langues)",
        en: numS ? ("Surah " + nomS + " (" + numS + ":" + numV + ") — Noble Quran, Audio, Word by Word & Tafsīr") : "The Noble Quran & Tafsīr Al-Mukhtasar — Audio, Tajwīd & Word by Word (8 Languages)",
        es: numS ? ("Sura " + nomS + " (" + numS + ":" + numV + ") — El Noble Corán, Audio, Palabra por Palabra y Tafsīr") : "El Noble Corán y Tafsīr Al-Mukhtasar — Audio, Tajwīd y Palabra por Palabra (8 Idiomas)",
        ar: numS ? ("سورة " + nomS + " (" + numS + ":" + numV + ") — القرآن الكريم والتفسير المختصر") : "القرآن الكريم والتفسير المختصر — تلاوة، تجويد وترجمة كلمة بكلمة (8 لغات)",
        de: numS ? ("Sure " + nomS + " (" + numS + ":" + numV + ") — Der Edle Koran, Audio, Wort für Wort & Tafsīr") : "Der Edle Koran & Tafsīr Al-Mukhtasar — Audio, Tajwīd & Wort für Wort (Bubenheim & Elyas)",
        it: numS ? ("Sura " + nomS + " (" + numS + ":" + numV + ") — Il Nobile Corano, Audio, Parola per Parola e Tafsīr") : "Il Nobile Corano e Tafsīr Al-Mukhtasar — Audio, Tajwīd e Parola per Parola (Piccardo)",
        id: numS ? ("Surah " + nomS + " (" + numS + ":" + numV + ") — Al-Qur'an Mulia, Audio, Kata demi Kata & Tafsir") : "Al-Qur'an Mulia & Tafsir Al-Mukhtasar — Audio, Tajwid & Kata demi Kata (Kemenag RI)",
        ru: numS ? ("Сура " + nomS + " (" + numS + ":" + numV + ") — Священный Коран, Аудио, Пословный перевод и Тафсир") : "Священный Коран и Тафсир аль-Мухтасар — Аудио, Таджвид и Пословный перевод (Э. Кулиев)"
      };
      var DESC_META_I18N = {
        fr: "Lisez et écoutez le Noble Coran (6 236 versets) avec suivi audio mot à mot, Tajwīd coloré, planificateur Khatm et exégèse (Tafsīr Al-Mukhtasar & Ibn Kathīr) en 8 langues : Français, Anglais, Espagnol, Arabe, Allemand, Italien, Indonésien et Russe.",
        en: "Read and listen to the Noble Quran (6,236 verses) with word-by-word audio tracking, color Tajwīd, Khatm planner and Tafsīr Al-Mukhtasar & Ibn Kathīr in 8 languages: French, English, Spanish, Arabic, German, Italian, Indonesian and Russian.",
        es: "Lea y escuche el Noble Corán (6.236 aleyas) con seguimiento de audio palabra por palabra, Tajwīd, planificador Khatm y Tafsīr Al-Mukhtasar en 8 idiomas: Francés, Inglés, Español, Árabe, Alemán, Italiano, Indonesio y Ruso.",
        ar: "اقرأ واستمع إلى القرآن الكريم (6236 آية) مع التتبع الصوتي كلمة بكلمة، التجويد المصور، برنامج ختم القرآن والتفسير المختصر وابن كثير بـ 8 لغات.",
        de: "Lesen und hören Sie den Edlen Koran (6.236 Verse, Übersetzung Bubenheim & Elyas) mit Wort-für-Wort-Audioverfolgung, Tajwīd, Leseplaner (Khatm) und Tafsīr Al-Mukhtasar & Ibn Kathīr in 8 Sprachen.",
        it: "Leggi e ascolta il Nobile Corano (6.236 versetti, traduzione Hamza Roberto Piccardo) con seguito audio parola per parola, Tajwīd, pianificatore Khatm e Tafsīr Al-Mukhtasar in 8 lingue.",
        id: "Baca dan dengarkan Al-Qur'an Mulia (6.236 ayat, Terjemahan Kemenag RI) dengan pelacakan audio kata demi kata, Tajwid, perencana Khatam, dan Tafsir Al-Mukhtasar & Ibnu Katsir dalam 8 bahasa.",
        ru: "Читайте и слушайте Священный Коран (6 236 аятов, перевод Эльмира Кулиева) с пословным аудио-слежением, Таджвидом, планом чтения (Хатм) и Тафсиром аль-Мухтасар и Ибн Касира на 8 языках."
      };

      if (TITRES_META_I18N[lang] && document.title !== TITRES_META_I18N[lang]) {
        document.title = TITRES_META_I18N[lang];
      }
      var metaDesc = document.querySelector("meta[name='description']");
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      if (DESC_META_I18N[lang] && metaDesc.getAttribute("content") !== DESC_META_I18N[lang]) {
        metaDesc.setAttribute("content", DESC_META_I18N[lang]);
      }
    } catch (e) {}
  }

  function cliquerBoutonNatifSiNecessaire(codeNat) {
    if (!codeNat || langExtActive) return;
    var btnDeRef = document.getElementById("btnLangDeV77");
    if (!btnDeRef || !btnDeRef.parentElement) return;
    var parentBar = btnDeRef.parentElement;
    var codeUpper = codeNat.toUpperCase();
    for (var i = 0; i < parentBar.children.length; i++) {
      var btn = parentBar.children[i];
      if (btn.id && btn.id.indexOf("V77") !== -1) continue;
      var txt = (btn.textContent || "").toUpperCase();
      if (txt.indexOf(codeUpper) !== -1) {
        if (!btn.classList.contains("active")) {
          IgnoreClicInterneFr = true;
          btn.click();
          IgnoreClicInterneFr = false;
        }
        langueNativeCible = "";
        break;
      }
    }
  }

  // ==========================================================================
  // 0. MOTEUR DU PLANIFICATEUR KHATM (VALIDATION EXPLICITE REQUISE POUR 6236/6236)
  // ==========================================================================
  var NB_VERSETS_PAR_SOURATE = [
    0,
    7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,
    112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,
    54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,
    14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,
    29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,
    11,8,3,9,5,4,7,3,6,3,5,4,5,6
  ];

  var ORDRE_REVELATION_114 = [
    96,68,73,74,1,111,81,87,92,89,93,94,103,100,108,102,107,109,105,113,
    114,112,53,80,97,91,85,95,106,101,75,104,77,50,90,86,54,38,7,72,
    36,25,35,19,20,56,26,27,28,17,10,11,12,15,6,37,31,34,39,40,
    41,42,43,44,45,46,51,88,18,16,71,14,21,23,32,52,67,69,70,78,
    79,82,84,30,29,83,2,8,3,33,60,4,99,57,47,13,55,76,65,98,
    59,24,22,63,58,49,66,64,61,62,48,5,9,110
  ];

  var NOMS_SOURATES_COURT = [
    "",
    "Al-Fātihah","Al-Baqarah","Āl 'Imrān","An-Nisā'","Al-Mā'idah","Al-An'ām","Al-A'rāf","Al-Anfāl","At-Tawbah","Yūnus",
    "Hūd","Yūsuf","Ar-Ra'd","Ibrāhīm","Al-Hijr","An-Nahl","Al-Isrā'","Al-Kahf","Maryam","Tā-Hā",
    "Al-Anbiyā'","Al-Hajj","Al-Mu'minūn","An-Nūr","Al-Furqān","Ash-Shu'arā'","An-Naml","Al-Qasas","Al-'Ankabūt","Ar-Rūm",
    "Luqmān","As-Sajdah","Al-Ahzāb","Saba'","Fātir","Yā-Sīn","As-Sāffāt","Sād","Az-Zumar","Ghāfir",
    "Fussilat","Ash-Shūrā","Az-Zukhruf","Ad-Dukhān","Al-Jāthiyah","Al-Ahqāf","Muhammad","Al-Fath","Al-Hujurāt","Qāf",
    "Adh-Dhāriyāt","At-Tūr","An-Najm","Al-Qamar","Ar-Rahmān","Al-Wāqi'ah","Al-Hadīd","Al-Mujādilah","Al-Hashr","Al-Mumtahanah",
    "As-Saff","Al-Jumu'ah","Al-Munāfiqūn","At-Taghābun","At-Talāq","At-Tahrīm","Al-Mulk","Al-Qalam","Al-Hāqqah","Al-Ma'ārij",
    "Nūh","Al-Jinn","Al-Muzzammil","Al-Muddaththir","Al-Qiyāmah","Al-Insān","Al-Mursalāt","An-Naba'","An-Nāzi'āt","'Abasa",
    "At-Takwīr","Al-Infitār","Al-Mutaffifīn","Al-Inshiqāq","Al-Burūj","At-Tāriq","Al-A'lā","Al-Ghāshiyah","Al-Fajr","Al-Balad",
    "Ash-Shams","Al-Layl","Ad-Duhā","Ash-Sharh","At-Tīn","Al-'Alaq","Al-Qadr","Al-Bayyinah","Az-Zalzalah","Al-'Ādiyāt",
    "Al-Qāri'ah","At-Takāthur","Al-'Asr","Al-Humazah","Al-Fīl","Quraysh","Al-Mā'ūn","Al-Kawthar","Al-Kāfirūn","An-Nasr",
    "Al-Masad","Al-Ikhlās","Al-Falaq","An-Nās"
  ];

  var TOTAL_VERSETS_CORAN = 6236;
  var etatKhatm = {
    months: 1,
    order: "revelation",
    idxByOrder: {
      revelation: 0,
      croissant: 0,
      decroissant: 0
    }
  };

  try {
    var sauvKhatm = localStorage.getItem("corantafsir_khatm_v77") || localStorage.getItem("corantafsir_khatm_v76") || localStorage.getItem("corantafsir_khatm_v75");
    if (sauvKhatm) {
      var parsedK = JSON.parse(sauvKhatm);
      if (parsedK && parsedK.idxByOrder) {
        etatKhatm.months = Number(parsedK.months) || 1;
        etatKhatm.order = parsedK.order || "revelation";
        etatKhatm.idxByOrder = parsedK.idxByOrder;
      }
    }
  } catch (e) {}

  function sauvegarderEtatKhatm() {
    try {
      localStorage.setItem("corantafsir_khatm_v77", JSON.stringify(etatKhatm));
    } catch (e) {}
  }

  function obtenirListeSouratesSelonOrdre(ord) {
    if (ord === "revelation") return ORDRE_REVELATION_114;
    var arr = [];
    if (ord === "decroissant") {
      for (var d = 114; d >= 1; d--) arr.push(d);
    } else {
      for (var c = 1; c <= 114; c++) arr.push(c);
    }
    return arr;
  }

  function obtenirSourateSuivanteSelonOrdre(ord, numSActuel) {
    var liste = obtenirListeSouratesSelonOrdre(ord);
    var idx = liste.indexOf(Number(numSActuel));
    if (idx !== -1 && idx + 1 < liste.length) {
      return liste[idx + 1];
    }
    return null;
  }

  function convertirIndexGlobalVersSourateVerset(ord, globalIdx) {
    var idx = Math.max(0, Math.min(TOTAL_VERSETS_CORAN - 1, Math.floor(globalIdx || 0)));
    var listeS = obtenirListeSouratesSelonOrdre(ord);
    var reste = idx;
    for (var i = 0; i < listeS.length; i++) {
      var numS = listeS[i];
      var nbV = NB_VERSETS_PAR_SOURATE[numS];
      if (reste < nbV) {
        return { s: numS, v: reste + 1, rangSourate: i + 1 };
      }
      reste -= nbV;
    }
    var dernS = listeS[listeS.length - 1];
    return { s: dernS, v: NB_VERSETS_PAR_SOURATE[dernS], rangSourate: 114 };
  }

  function convertirSourateVersetVersIndexGlobal(ord, numS, numV) {
    var listeS = obtenirListeSouratesSelonOrdre(ord);
    var cumul = 0;
    for (var i = 0; i < listeS.length; i++) {
      var s = listeS[i];
      if (s === Number(numS)) {
        var vClamp = Math.max(1, Math.min(NB_VERSETS_PAR_SOURATE[s] || 1, Number(numV) || 1));
        return cumul + (vClamp - 1);
      }
      cumul += NB_VERSETS_PAR_SOURATE[s];
    }
    return 0;
  }

  function obtenirVersetsParJour(months) {
    var joursMap = { 1: 30, 4: 120, 6: 180, 12: 365 };
    var j = joursMap[months] || 30;
    return Math.ceil(TOTAL_VERSETS_CORAN / j);
  }

  function obtenirCleVerset() {
    var urlFull = window.location.pathname.match(/sourate-(\\d+)-verset-(\\d+)/i);
    var aVersetArabe = Boolean(document.querySelector("#arabicVerse, .arabic-glow-verse"));
    if (!urlFull && !aVersetArabe) {
      return "";
    }
    var numS = urlFull ? urlFull[1] : "";
    var selects = document.querySelectorAll("select");
    for (var i = 0; i < selects.length; i++) {
      var s = selects[i];
      if (s.classList.contains("khatm-reciter-select")) continue;
      if (s.options && s.selectedIndex >= 0) {
        var optTxt = s.options[s.selectedIndex].textContent || "";
        var vm = optTxt.match(/(?:Verset|Verse|Aleya|Vers|Versetto|Ayat|Аят|آية)\\s*(\\d+)/i);
        if (vm && numS) return numS + ":" + vm[1];
      }
    }
    var badges = document.querySelectorAll("span, div");
    for (var b = 0; b < badges.length; b++) {
      var el = badges[b];
      if (el.children.length > 0 || el.closest("#khatmPlannerWidgetV77")) continue;
      var txt = (el.textContent || "").trim();
      var bm = txt.match(/^(\\d{1,3})\\s*:\\s*(\\d{1,3})$/);
      if (bm) return bm[1] + ":" + bm[2];
    }
    if (urlFull) return urlFull[1] + ":" + urlFull[2];
    return "";
  }

  function allerAuVersetSurMemePage(numV) {
    var selects = document.querySelectorAll("select");
    for (var i = 0; i < selects.length; i++) {
      var sel = selects[i];
      if (sel.classList.contains("khatm-reciter-select")) continue;
      if (sel.options && sel.options.length >= numV) {
        var opt0 = (sel.options[0].textContent || "").toLowerCase();
        if (opt0.indexOf("vers") !== -1 || opt0.indexOf("aleya") !== -1 || opt0.indexOf("ayat") !== -1 || opt0.indexOf("аят") !== -1 || opt0.indexOf("آية") !== -1 || /\\d+\\s*\\/\\s*\\d+/.test(opt0)) {
          if (sel.selectedIndex !== numV - 1) {
            sel.selectedIndex = numV - 1;
            sel.dispatchEvent(new Event("change", { bubbles: true }));
          }
          return true;
        }
      }
    }
    return false;
  }

  var tentativesKhatmVerse = 0;
  function verifierSautDirectVersetKhatm() {
    if (tentativesKhatmVerse > 8) return;
    try {
      var up = new URLSearchParams(window.location.search);
      var kv = Number(up.get("khatm_verse"));
      if (kv && kv >= 1 && obtenirCleVerset()) {
        tentativesKhatmVerse++;
        allerAuVersetSurMemePage(kv);
      }
    } catch (e) {}
  }

  var dernierVersetAutoSyncKhatm = "";
  function synchroniserPositionKhatmAutomatique() {
    var vk = obtenirCleVerset();
    if (!vk || vk === dernierVersetAutoSyncKhatm) return;
    dernierVersetAutoSyncKhatm = vk;
    var p = vk.split(":");
    var sAct = Number(p[0]);
    var vAct = Number(p[1]);
    if (!sAct || !vAct) return;

    var ord = etatKhatm.order;
    var idxActuel = etatKhatm.idxByOrder[ord] || 0;
    if (idxActuel >= TOTAL_VERSETS_CORAN) return;
    var idxPage = convertirSourateVersetVersIndexGlobal(ord, sAct, vAct);
    if (idxPage > idxActuel && idxPage - idxActuel <= 220) {
      etatKhatm.idxByOrder[ord] = Math.min(TOTAL_VERSETS_CORAN - 1, idxPage);
      sauvegarderEtatKhatm();
    }
  }

  var TEXTES_KHATM_I18N = {
    fr: {
      m1: "🗓️ 1 Mois (208 v./j)", m4: "🗓️ 4 Mois (52 v./j)", m6: "🗓️ 6 Mois (35 v./j)", m12: "🗓️ 12 Mois (18 v./j)",
      ordRev: "📜 Ordre : Révélation (96➔110)",
      ordAsc: "⬆️ Ordre : Croissant (1➔114)",
      ordDesc: "⬇️ Ordre : Décroissant (114➔1)",
      jours: "j. restants",
      termine: "🎉 Khatm terminé !",
      posActuelle: "Position :",
      objJour: "Objectif du jour :",
      reprendre: "📖 Reprendre :",
      validerEtape: "✅ Valider étape",
      memoriserIci: "📍 Mémoriser",
      sourateSuiv: "⏭️ Suiv. :",
      reset: "↺"
    },
    en: {
      m1: "🗓️ 1 Month (208 v./d)", m4: "🗓️ 4 Months (52 v./d)", m6: "🗓️ 6 Months (35 v./d)", m12: "🗓️ 12 Months (18 v./d)",
      ordRev: "📜 Order: Revelation (96➔110)",
      ordAsc: "⬆️ Order: Ascending (1➔114)",
      ordDesc: "⬇️ Order: Descending (114➔1)",
      jours: "d. left",
      termine: "🎉 Khatm Completed!",
      posActuelle: "Position:",
      objJour: "Today's goal:",
      reprendre: "📖 Resume:",
      validerEtape: "✅ Complete step",
      memoriserIci: "📍 Save here",
      sourateSuiv: "⏭️ Next:",
      reset: "↺"
    },
    es: {
      m1: "🗓️ 1 Mes (208 a./d)", m4: "🗓️ 4 Meses (52 a./d)", m6: "🗓️ 6 Meses (35 a./d)", m12: "🗓️ 12 Meses (18 a./d)",
      ordRev: "📜 Orden: Revelación (96➔110)",
      ordAsc: "⬆️ Orden: Creciente (1➔114)",
      ordDesc: "⬇️ Orden: Decreciente (114➔1)",
      jours: "d. restantes",
      termine: "🎉 ¡Khatm completado!",
      posActuelle: "Posición:",
      objJour: "Meta de hoy:",
      reprendre: "📖 Continuar:",
      validerEtape: "✅ Validar meta",
      memoriserIci: "📍 Guardar",
      sourateSuiv: "⏭️ Sig.:",
      reset: "↺"
    },
    ar: {
      m1: "🗓️ شهر واحد (208 آية/ي)", m4: "🗓️ 4 أشهر (52 آية/ي)", m6: "🗓️ 6 أشهر (35 آية/ي)", m12: "🗓️ 12 شهراً (18 آية/ي)",
      ordRev: "📜 الترتيب: النزول (96⬅110)",
      ordAsc: "⬆️ الترتيب: تصاعدي (1⬅114)",
      ordDesc: "⬇️ الترتيب: تنازلي (114⬅1)",
      jours: "يوم متبقي",
      termine: "🎉 تم ختم القرآن الكريم!",
      posActuelle: "الموضع:",
      objJour: "ورد اليوم:",
      reprendre: "📖 متابعة:",
      validerEtape: "✅ إتمام الورد",
      memoriserIci: "📍 حفظ هنا",
      sourateSuiv: "⏭️ التالية:",
      reset: "↺"
    },
    de: {
      m1: "🗓️ 1 Monat (208 V./T)", m4: "🗓️ 4 Monate (52 V./T)", m6: "🗓️ 6 Monate (35 V./T)", m12: "🗓️ 12 Monate (18 V./T)",
      ordRev: "📜 Reihenfolge: Offenbarung (96➔110)",
      ordAsc: "⬆️ Reihenfolge: Aufsteigend (1➔114)",
      ordDesc: "⬇️ Reihenfolge: Absteigend (114➔1)",
      jours: "T. übrig",
      termine: "🎉 Khatm abgeschlossen!",
      posActuelle: "Position:",
      objJour: "Tagesziel:",
      reprendre: "📖 Weiterlesen:",
      validerEtape: "✅ Tagesziel",
      memoriserIci: "📍 Speichern",
      sourateSuiv: "⏭️ Nächste:",
      reset: "↺"
    },
    it: {
      m1: "🗓️ 1 Mese (208 v./g)", m4: "🗓️ 4 Mesi (52 v./g)", m6: "🗓️ 6 Mesi (35 v./g)", m12: "🗓️ 12 Mesi (18 v./g)",
      ordRev: "📜 Ordine: Rivelazione (96➔110)",
      ordAsc: "⬆️ Ordine: Crescente (1➔114)",
      ordDesc: "⬇️ Ordine: Decrescente (114➔1)",
      jours: "g. rimasti",
      termine: "🎉 Khatm completato!",
      posActuelle: "Posizione:",
      objJour: "Obiettivo:",
      reprendre: "📖 Riprendi:",
      validerEtape: "✅ Convalida",
      memoriserIci: "📍 Salva qui",
      sourateSuiv: "⏭️ Succ.:",
      reset: "↺"
    },
    id: {
      m1: "🗓️ 1 Bulan (208 a./h)", m4: "🗓️ 4 Bulan (52 a./h)", m6: "🗓️ 6 Bulan (35 a./h)", m12: "🗓️ 12 Bulan (18 a./h)",
      ordRev: "📜 Urutan: Wahyu (96➔110)",
      ordAsc: "⬆️ Urutan: Menaik (1➔114)",
      ordDesc: "⬇️ Urutan: Menurun (114➔1)",
      jours: "h. tersisa",
      termine: "🎉 Khatam Selesai!",
      posActuelle: "Posisi:",
      objJour: "Target hari ini:",
      reprendre: "📖 Lanjutkan:",
      validerEtape: "✅ Selesai",
      memoriserIci: "📍 Simpan",
      sourateSuiv: "⏭️ Berikut:",
      reset: "↺"
    },
    ru: {
      m1: "🗓️ 1 мес. (208 а./д)", m4: "🗓️ 4 мес. (52 а./д)", m6: "🗓️ 6 мес. (35 а./д)", m12: "🗓️ 12 мес. (18 а./д)",
      ordRev: "📜 Порядок: Ниспослание (96➔110)",
      ordAsc: "⬆️ Порядок: Возрастание (1➔114)",
      ordDesc: "⬇️ Порядок: Убывание (114➔1)",
      jours: "дн. ост.",
      termine: "🎉 Хатм завершён!",
      posActuelle: "Позиция:",
      objJour: "Цель дня:",
      reprendre: "📖 Продолжить:",
      validerEtape: "✅ Завершить",
      memoriserIci: "📍 Сохранить",
      sourateSuiv: "⏭️ След.:",
      reset: "↺"
    }
  };

  function trouverBoiteHeroPourInsertionInterne() {
    var h1 = document.querySelector("h1, h2");
    if (h1) {
      var curr = h1.parentElement;
      while (curr && curr !== document.body) {
        var st = window.getComputedStyle(curr);
        var r = curr.getBoundingClientRect();
        if (st.borderRadius && parseFloat(st.borderRadius) >= 12 && r.width >= 500) {
          curr.classList.add("panneau-opaque-v77");
          return curr;
        }
        curr = curr.parentElement;
      }
      if (h1.parentElement) return h1.parentElement;
    }
    return null;
  }

  function afficherOuMettreAJourPlanificateurKhatm() {
    if (!document.body) return;
    var lang = obtenirLangueActive();
    var t = TEXTES_KHATM_I18N[lang] || TEXTES_KHATM_I18N.fr;
    var vkPage = obtenirCleVerset();
    var estSurPageVerset = Boolean(vkPage);

    var boiteHero = trouverBoiteHeroPourInsertionInterne();
    if (!boiteHero) return;

    var liensInternes = boiteHero.querySelectorAll("a, button");
    for (var l = 0; l < liensInternes.length; l++) {
      var elL = liensInternes[l];
      if (elL.closest("#khatmPlannerWidgetV77")) continue;
      var txtL = (elL.textContent || "").trim();
      if (
        txtL.indexOf("Reprendre :") !== -1 ||
        txtL.indexOf("Resume:") !== -1 ||
        txtL.indexOf("Continuar:") !== -1 ||
        txtL.indexOf("Weiterlesen:") !== -1 ||
        txtL.indexOf("Riprendi") !== -1 ||
        txtL.indexOf("Lanjutkan") !== -1 ||
        txtL.indexOf("Продолжить") !== -1 ||
        txtL.indexOf("متابعة") !== -1
      ) {
        elL.classList.add("khatm-doublon-reprendre-masque");
      }
    }

    var widget = document.getElementById("khatmPlannerWidgetV77");
    if (!widget) {
      widget = document.createElement("div");
      widget.id = "khatmPlannerWidgetV77";
      widget.setAttribute("translate", "no");
      widget.className = "notranslate";
      boiteHero.appendChild(widget);
    } else if (widget.parentElement !== boiteHero) {
      boiteHero.appendChild(widget);
    }

    var ord = etatKhatm.order;
    var m = etatKhatm.months;
    var versetsValides = Math.max(0, Math.min(TOTAL_VERSETS_CORAN, etatKhatm.idxByOrder[ord] || 0));
    var estTermine = versetsValides >= TOTAL_VERSETS_CORAN;
    var idxLectureCourant = Math.min(TOTAL_VERSETS_CORAN - 1, versetsValides);
    var vParJour = obtenirVersetsParJour(m);
    var idxCibleJour = Math.min(TOTAL_VERSETS_CORAN - 1, idxLectureCourant + vParJour - 1);

    var posInfo = convertirIndexGlobalVersSourateVerset(ord, idxLectureCourant);
    var cibleInfo = convertirIndexGlobalVersSourateVerset(ord, idxCibleJour);
    var pct = estTermine ? "100.0" : ((versetsValides / TOTAL_VERSETS_CORAN) * 100).toFixed(1);
    var joursRestants = estTermine ? 0 : Math.max(0, Math.ceil((TOTAL_VERSETS_CORAN - versetsValides) / vParJour));

    var nomSourateAct = NOMS_SOURATES_COURT[posInfo.s] || ("Sourate " + posInfo.s);
    var nomSourateCible = NOMS_SOURATES_COURT[cibleInfo.s] || ("Sourate " + cibleInfo.s);
    var suffixeLangUrl = lang !== "fr" ? ("&lang=" + lang) : "";
    var urlReprise = "sourate-" + posInfo.s + "-verset-" + posInfo.v + ".html?khatm_verse=" + posInfo.v + suffixeLangUrl;

    var cleSignatureRendu = [lang, m, ord, versetsValides, vkPage].join("|");
    if (widget.getAttribute("data-render-sig") === cleSignatureRendu) return;
    widget.setAttribute("data-render-sig", cleSignatureRendu);
    widget.style.direction = lang === "ar" ? "rtl" : "ltr";

    var controlePositionHtml = "";
    if (estSurPageVerset) {
      var partsVk = vkPage.split(":");
      var sPage = Number(partsVk[0]);
      var sSuiv = obtenirSourateSuivanteSelonOrdre(ord, sPage);
      var btnSuivHtml = "";
      if (sSuiv) {
        var urlSuiv = "sourate-" + sSuiv + "-verset-1.html?khatm_verse=1" + suffixeLangUrl;
        btnSuivHtml = '<a href="' + urlSuiv + '" class="khatm-btn-cyan-compact">' + t.sourateSuiv + ' ' + NOMS_SOURATES_COURT[sSuiv] + ' (' + sSuiv + ':1)</a>';
      }
      controlePositionHtml =
        '<button type="button" class="khatm-btn-cyan-compact" data-khatm-act="save-here">' + t.memoriserIci + " (" + vkPage + ")</button>" +
        btnSuivHtml;
    } else {
      var listeSOrd = obtenirListeSouratesSelonOrdre(ord);
      var optsHtml = "";
      for (var idxS = 0; idxS < listeSOrd.length; idxS++) {
        var numSOpt = listeSOrd[idxS];
        var selAttr = numSOpt === posInfo.s ? ' selected="selected"' : "";
        var vAffiche = numSOpt === posInfo.s ? posInfo.v : 1;
        optsHtml += '<option value="' + numSOpt + '"' + selAttr + '>📍 ' + (idxS + 1) + '. ' + NOMS_SOURATES_COURT[numSOpt] + ' (' + numSOpt + ':' + vAffiche + ')</option>';
      }
      controlePositionHtml = '<select class="khatm-reciter-select" data-khatm-sel="pos">' + optsHtml + '</select>';
    }

    var texteStatutFin = estTermine
      ? ('6236 / 6236 (100%) • ' + t.termine)
      : (versetsValides + ' / 6236 (' + pct + '%) • ~' + joursRestants + ' ' + t.jours);

    widget.innerHTML =
      '<div class="khatm-compact-row">' +
        '<select class="khatm-reciter-select" data-khatm-sel="months">' +
          '<option value="1"' + (m === 1 ? ' selected="selected"' : '') + '>' + t.m1 + '</option>' +
          '<option value="4"' + (m === 4 ? ' selected="selected"' : '') + '>' + t.m4 + '</option>' +
          '<option value="6"' + (m === 6 ? ' selected="selected"' : '') + '>' + t.m6 + '</option>' +
          '<option value="12"' + (m === 12 ? ' selected="selected"' : '') + '>' + t.m12 + '</option>' +
        '</select>' +
        '<select class="khatm-reciter-select" data-khatm-sel="order">' +
          '<option value="revelation"' + (ord === "revelation" ? ' selected="selected"' : '') + '>' + t.ordRev + '</option>' +
          '<option value="croissant"' + (ord === "croissant" ? ' selected="selected"' : '') + '>' + t.ordAsc + '</option>' +
          '<option value="decroissant"' + (ord === "decroissant" ? ' selected="selected"' : '') + '>' + t.ordDesc + '</option>' +
        '</select>' +
        controlePositionHtml +
        '<a href="' + urlReprise + '" class="khatm-btn-green-compact" data-khatm-act="resume" data-target-s="' + posInfo.s + '" data-target-v="' + posInfo.v + '">' +
          t.reprendre + ' ' + nomSourateAct + ' (v.' + posInfo.v + ')' +
        '</a>' +
        '<button type="button" class="khatm-btn-cyan-compact" data-khatm-act="step-day">' +
          t.validerEtape + ' (+' + vParJour + ')' +
        '</button>' +
        '<button type="button" class="khatm-btn-reset-mini" data-khatm-act="reset" title="Reset">' + t.reset + '</button>' +
      '</div>' +
      '<div class="khatm-mini-footer">' +
        '<span>' + t.posActuelle + ' <strong style="color:#38bdf8;">' + nomSourateAct + ' (' + posInfo.s + ':' + posInfo.v + ')</strong></span>' +
        '<span>•</span>' +
        '<span>' + t.objJour + ' <strong style="color:#fde047;">' + nomSourateCible + ' (' + cibleInfo.s + ':' + cibleInfo.v + ')</strong></span>' +
        '<span>•</span>' +
        '<div class="khatm-mini-bar-wrap"><div class="khatm-mini-bar-fill" style="width:' + Math.max(2, Number(pct)) + '%;"></div></div>' +
        '<span dir="ltr" style="color:#6ee7b7;font-weight:600;display:inline-block;">' + texteStatutFin + '</span>' +
      '</div>';

    var selMonths = widget.querySelector("select[data-khatm-sel='months']");
    if (selMonths) {
      selMonths.addEventListener("change", function () {
        etatKhatm.months = Number(this.value) || 1;
        sauvegarderEtatKhatm();
        afficherOuMettreAJourPlanificateurKhatm();
      });
    }

    var selOrder = widget.querySelector("select[data-khatm-sel='order']");
    if (selOrder) {
      selOrder.addEventListener("change", function () {
        etatKhatm.order = this.value || "revelation";
        sauvegarderEtatKhatm();
        afficherOuMettreAJourPlanificateurKhatm();
      });
    }

    var selPos = widget.querySelector("select[data-khatm-sel='pos']");
    if (selPos) {
      selPos.addEventListener("change", function () {
        var sChoisi = Number(this.value) || 1;
        etatKhatm.idxByOrder[etatKhatm.order] = convertirSourateVersetVersIndexGlobal(etatKhatm.order, sChoisi, 1);
        sauvegarderEtatKhatm();
        afficherOuMettreAJourPlanificateurKhatm();
      });
    }
  }

  var NOMS_114_ACCUEIL = {
    de: {
      1: "Al-Fātihah (Die Eröffnende)", 2: "Al-Baqarah (Die Kuh)", 3: "Āl 'Imrān (Die Sippe 'Imrāns)", 4: "An-Nisā' (Die Frauen)",
      5: "Al-Mā'idah (Der Tisch)", 6: "Al-An'ām (Das Vieh)", 7: "Al-A'rāf (Die Höhen)", 8: "Al-Anfāl (Die Beute)",
      9: "At-Tawbah (Die Reue)", 10: "Yūnus (Jonas)", 11: "Hūd", 12: "Yūsuf (Josef)", 13: "Ar-Ra'd (Der Donner)",
      14: "Ibrāhīm (Abraham)", 15: "Al-Hijr", 16: "An-Nahl (Die Biene)", 17: "Al-Isrā' (Die Nachtreise)", 18: "Al-Kahf (Die Höhle)",
      19: "Maryam (Maria)", 20: "Tā-Hā", 21: "Al-Anbiyā' (Die Propheten)", 22: "Al-Hajj (Die Pilgerfahrt)", 23: "Al-Mu'minūn (Die Gläubigen)",
      24: "An-Nūr (Das Licht)", 25: "Al-Furqān (Die Unterscheidung)", 26: "Ash-Shu'arā' (Die Dichter)", 27: "An-Naml (Die Ameisen)",
      28: "Al-Qasas (Die Geschichten)", 29: "Al-'Ankabūt (Die Spinne)", 30: "Ar-Rūm (Die Römer)", 31: "Luqmān",
      32: "As-Sajdah (Die Niederwerfung)", 33: "Al-Ahzāb (Die Gruppierungen)", 34: "Saba'", 35: "Fātir (Der Schöpfer)", 36: "Yā-Sīn",
      37: "As-Sāffāt (Die Gereihten)", 38: "Sād", 39: "Az-Zumar (Die Scharen)", 40: "Ghāfir (Der Vergebende)", 41: "Fussilat (Ausführlich dargelegt)",
      42: "Ash-Shūrā (Die Beratung)", 43: "Az-Zukhruf (Der Prunk)", 44: "Ad-Dukhān (Der Rauch)", 45: "Al-Jāthiyah (Das Knien)",
      46: "Al-Ahqāf (Die Dünen)", 47: "Muhammad", 48: "Al-Fath (Der Sieg)", 49: "Al-Hujurāt (Die Gemächer)", 50: "Qāf",
      51: "Adh-Dhāriyāt (Die Aufwirbelnden)", 52: "At-Tūr (Der Berg)", 53: "An-Najm (Der Stern)", 54: "Al-Qamar (Der Mond)",
      55: "Ar-Rahmān (Der Allerbarmer)", 56: "Al-Wāqi'ah (Das Ereignis)", 57: "Al-Hadīd (Das Eisen)", 58: "Al-Mujādilah (Die Streitende)",
      59: "Al-Hashr (Die Versammlung)", 60: "Al-Mumtahanah (Die Geprüfte)", 61: "As-Saff (Die Reihe)", 62: "Al-Jumu'ah (Der Freitag)",
      63: "Al-Munāfiqūn (Die Heuchler)", 64: "At-Taghābun (Die Übervorteilung)", 65: "At-Talāq (Die Scheidung)", 66: "At-Tahrīm (Das Verbot)",
      67: "Al-Mulk (Die Herrschaft)", 68: "Al-Qalam (Das Schreibrohr)", 69: "Al-Hāqqah (Die Fällige)", 70: "Al-Ma'ārij (Die Aufstiegswege)",
      71: "Nūh (Noah)", 72: "Al-Jinn (Die Dschinn)", 73: "Al-Muzzammil (Der Eingehüllte)", 74: "Al-Muddaththir (Der Bedeckte)",
      75: "Al-Qiyāmah (Die Auferstehung)", 76: "Al-Insān (Der Mensch)", 77: "Al-Mursalāt (Die Gesandten)", 78: "An-Naba' (Die Kunde)",
      79: "An-Nāzi'āt (Die Entreißenden)", 80: "'Abasa (Er runzelte die Stirn)", 81: "At-Takwīr (Das Umschlingen)", 82: "Al-Infitār (Das Zerbrechen)",
      83: "Al-Mutaffifīn (Die Betrüger)", 84: "Al-Inshiqāq (Das Zerreißen)", 85: "Al-Burūj (Die Türme)", 86: "At-Tāriq (Der Nachtstern)",
      87: "Al-A'lā (Der Höchste)", 88: "Al-Ghāshiyah (Die Überdeckende)", 89: "Al-Fajr (Die Morgenröte)", 90: "Al-Balad (Die Stadt)",
      91: "Ash-Shams (Die Sonne)", 92: "Al-Layl (Die Nacht)", 93: "Ad-Duhā (Der Vormittag)", 94: "Ash-Sharh (Das Weiten)",
      95: "At-Tīn (Die Feige)", 96: "Al-'Alaq (Das Anhängsel)", 97: "Al-Qadr (Die Bestimmung)", 98: "Al-Bayyinah (Der klare Beweis)",
      99: "Az-Zalzalah (Das Beben)", 100: "Al-'Ādiyāt (Die Rennenden)", 101: "Al-Qāri'ah (Die Pochende)", 102: "At-Takāthur (Die Vermehrung)",
      103: "Al-'Asr (Die Zeit)", 104: "Al-Humazah (Der Stichler)", 105: "Al-Fīl (Der Elefant)", 106: "Quraysh (Quraisch)",
      107: "Al-Mā'ūn (Die Hilfeleistung)", 108: "Al-Kawthar (Die Fülle)", 109: "Al-Kāfirūn (Die Ungläubigen)", 110: "An-Nasr (Die Hilfe)",
      111: "Al-Masad (Die Palmfasern)", 112: "Al-Ikhlās (Die Reinheit)", 113: "Al-Falaq (Das Morgenrot)", 114: "An-Nās (Die Menschen)"
    },
    it: {
      1: "Al-Fātihah (L'Aprente)", 2: "Al-Baqarah (La Giovenca)", 3: "Āl 'Imrān (La Famiglia di 'Imrān)", 4: "An-Nisā' (Le Donne)",
      5: "Al-Mā'idah (La Mensa)", 18: "Al-Kahf (La Caverna)", 36: "Yā-Sīn", 55: "Ar-Rahmān (Il Compassionevole)",
      56: "Al-Wāqi'ah (L'Evento)", 67: "Al-Mulk (La Sovranità)", 68: "Al-Qalam (Il Calamo)",
      73: "Al-Muzzammil (L'Avvolto)", 74: "Al-Muddaththir (Il Rivestito)", 81: "At-Takwīr (L'Oscuramento)",
      87: "Al-A'lā (L'Altissimo)", 89: "Al-Fajr (L'Alba)", 92: "Al-Layl (La Notte)", 93: "Ad-Duhā (La Luce del Mattino)",
      94: "Ash-Sharh (L'Apertura del Petto)", 96: "Al-'Alaq (L'Aderenza)", 100: "Al-'Ādiyāt (Le Galoppanti)",
      102: "At-Takāthur (La Rivalità)", 103: "Al-'Asr (Il Tempo)", 107: "Al-Mā'ūn (L'Utensile)",
      108: "Al-Kawthar (L'Abbondanza)", 109: "Al-Kāfirūn (I Miscredenti)", 111: "Al-Masad (Le Fibre di Palma)",
      112: "Al-Ikhlās (Il Puro Monoteismo)", 113: "Al-Falaq (L'Alba Nascente)", 114: "An-Nās (Gli Uomini)"
    },
    id: {
      1: "Al-Fātihah (Pembukaan)", 2: "Al-Baqarah (Sapi Betina)", 68: "Al-Qalam (Pena)", 73: "Al-Muzzammil (Orang yang Berselimut)",
      74: "Al-Muddaththir (Orang yang Berkemul)", 81: "At-Takwīr (Menggulung)", 87: "Al-A'lā (Yang Paling Tinggi)", 89: "Al-Fajr (Fajar)",
      92: "Al-Layl (Malam)", 93: "Ad-Duhā (Waktu Duha)", 94: "Ash-Sharh (Melapangkan)", 96: "Al-'Alaq (Segumpal Darah)",
      100: "Al-'Ādiyāt (Kuda Perang)", 102: "At-Takāthur (Bermegah-megahan)", 103: "Al-'Asr (Masa)", 107: "Al-Mā'ūn (Barang yang Berguna)",
      108: "Al-Kawthar (Nikmat yang Banyak)", 109: "Al-Kāfirūn (Orang-Orang Kafir)", 111: "Al-Masad (Gejolak Api)",
      112: "Al-Ikhlās (Kemurnian Keesaan Allah)", 113: "Al-Falaq (Waktu Subuh)", 114: "An-Nās (Manusia)"
    },
    ru: {
      1: "Аль-Фатиха (Открывающая Коран)", 2: "Аль-Бакара (Корова)", 68: "Аль-Калам (Письменная трость)", 73: "Аль-Муззаммиль (Закутавшийся)",
      74: "Аль-Муддассир (Завернувшийся)", 81: "Ат-Таквир (Скручивание)", 87: "Аль-Аля (Всевышний)", 89: "Аль-Фаджр (Заря)",
      92: "Аль-Лейл (Ночь)", 93: "Ад-Духа (Утро)", 94: "Аш-Шарх (Раскрытие)", 96: "Аль-Аляк (Сгусток крови)",
      100: "Аль-Адият (Скачущие)", 102: "Ат-Такасур (Страсть к приумножению)", 103: "Аль-Аср (Предвечернее время)", 107: "Аль-Маун (Мелочь)",
      108: "Аль-Каусар (Изобилие)", 109: "Аль-Кафирун (Неверующие)", 111: "Аль-Масад (Пальмовые волокна)",
      112: "Аль-Ихляс (Очищение веры)", 113: "Аль-Фаляк (Рассвет)", 114: "Ан-Нас (Люди)"
    }
  };

  var cacheChapitresExt = {};
  var requetesChapExtEnCours = {};
  var cacheTexteUnitaireExt = {};
  var requeteTexteExtEnCours = {};
  var noeudsTextesModifies = [];

  try {
    var sauvChapExt = localStorage.getItem("cache_ext_chap_v64");
    if (sauvChapExt) cacheChapitresExt = JSON.parse(sauvChapExt);
    var sauvTxtExt = localStorage.getItem("cache_txt_unit_ext_v64");
    if (sauvTxtExt) cacheTexteUnitaireExt = JSON.parse(sauvTxtExt);
  } catch (e) {}

  function restaurerTextesOriginauxDepuisExt() {
    for (var i = 0; i < noeudsTextesModifies.length; i++) {
      var item = noeudsTextesModifies[i];
      if (item.node && item.orig !== undefined) {
        item.node.nodeValue = item.orig;
      }
    }
    noeudsTextesModifies = [];
  }

  function modifierNoeudTexteSeul(textNode, nouveauTexte) {
    if (!textNode || textNode.nodeType !== 3) return;
    if (textNode.__origExtV77 === undefined) {
      textNode.__origExtV77 = textNode.nodeValue;
      noeudsTextesModifies.push({ node: textNode, orig: textNode.__origExtV77 });
    }
    if (textNode.nodeValue !== nouveauTexte) {
      textNode.nodeValue = nouveauTexte;
    }
  }

  function nettoyerVersetBrutApi(rawHtml) {
    if (!rawHtml) return "";
    return rawHtml
      .replace(/<sup[^>]*>[\\s\\S]*?<\\/sup>/gi, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\\[\\d+\\]|\\(\\d+\\)/g, "")
      .replace(/\\s+(\\d+)\\s*([\\.!\\?;:])/g, "$2")
      .replace(/\\s+([\\.!\\?,;:])/g, "$1")
      .replace(/\\s{2,}/g, " ")
      .trim();
  }

  function affinerTraductionTheologique(str, codeLang) {
    if (!str) return "";
    var out = str.trim();
    if (codeLang === "it") {
      out = out.replace(/soddisfatto di lui/gi, "soddisfatto di lei").replace(/Il suo personaggio era il Corano/gi, "Il suo carattere era il Corano").replace(/r[eé]pondit\\s*:/gi, "rispose:");
    } else if (codeLang === "de") {
      out = out.replace(/mit ihm zufrieden/gi, "mit ihr zufrieden").replace(/Sein Charakter war der Koran/gi, "Sein Wesen (Charakter) war der Koran").replace(/r[eé]pondit\\s*:/gi, "antwortete:");
    } else if (codeLang === "id") {
      out = out.replace(/r[eé]pondit\\s*:/gi, "menjawab:").replace(/karakternya adalah Al-Qur'an/gi, "akhlaknya adalah Al-Qur'an");
    } else if (codeLang === "ru") {
      out = out.replace(/доволен им Аллах/gi, "доволен ею Аллах").replace(/Его персонажем был Коран/gi, "Его нравом был Коран").replace(/r[eé]pondit\\s*:/gi, "ответила:");
    }
    return out;
  }

  function basculerDepuisArabeSurClicUtilisateur(conteneurLang, btnActif) {
    if (!conteneurLang) return;
    var btnSaAr = null;
    var btnFr = null;
    for (var i = 0; i < conteneurLang.children.length; i++) {
      var c = conteneurLang.children[i];
      var t = (c.textContent || "").replace(/\\s+/g, "").toUpperCase();
      if (t.indexOf("FR") !== -1) btnFr = c;
      if (t === "SAAR" || /AR$/.test(t)) btnSaAr = c;
    }

    var arEstActif = btnSaAr && btnSaAr.classList.contains("active");
    if (arEstActif && btnFr) {
      IgnoreClicInterneFr = true;
      btnFr.click();
      IgnoreClicInterneFr = false;
    }

    for (var f = 0; f < conteneurLang.children.length; f++) {
      if (conteneurLang.children[f] !== btnActif) {
        conteneurLang.children[f].classList.remove("active");
        conteneurLang.children[f].classList.remove("active-ext-v77");
      }
    }
    if (btnActif) btnActif.classList.add("active-ext-v77");
  }

  function assurerBoutonsLanguesEtendues() {
    var oldBtns = document.querySelectorAll("[id^='btnLangTrV'], [id^='btnLangDeV']:not(#btnLangDeV77), [id^='btnLangItV']:not(#btnLangItV77), [id^='btnLangIdV']:not(#btnLangIdV77), [id^='btnLangRuV']:not(#btnLangRuV77)");
    for (var b = 0; b < oldBtns.length; b++) {
      if (oldBtns[b].parentNode) oldBtns[b].parentNode.removeChild(oldBtns[b]);
    }

    var mapIds = { de: "btnLangDeV77", it: "btnLangItV77", id: "btnLangIdV77", ru: "btnLangRuV77" };
    if (document.getElementById("btnLangDeV77") && document.getElementById("btnLangIdV77") && document.getElementById("btnLangRuV77")) {
      var parentBar = document.getElementById("btnLangDeV77").parentElement;
      if (parentBar) {
        parentBar.setAttribute("translate", "no");
        parentBar.classList.add("notranslate");
      }
      for (var code in mapIds) {
        var bEl = document.getElementById(mapIds[code]);
        if (!bEl) continue;
        if (langExtActive === code) {
          bEl.classList.add("active-ext-v77");
          if (parentBar) {
            for (var k = 0; k < parentBar.children.length; k++) {
              if (parentBar.children[k] !== bEl) parentBar.children[k].classList.remove("active");
            }
          }
        } else {
          bEl.classList.remove("active-ext-v77");
        }
      }
      if (!langExtActive && langueNativeCible) {
        cliquerBoutonNatifSiNecessaire(langueNativeCible);
      }
      return;
    }

    var tous = document.querySelectorAll("button, a, span, div, li");
    var btnFrFr = null;
    var btnSaAr = null;
    for (var i = 0; i < tous.length; i++) {
      var el = tous[i];
      var rect = el.getBoundingClientRect();
      if (rect.width < 18 || rect.width > 110 || rect.height < 14 || rect.height > 60) continue;
      var tSansEspace = (el.textContent || "").replace(/\\s+/g, "").toUpperCase();
      if (tSansEspace === "SAAR" || tSansEspace === "\\uD83C\\uDDF8\\uD83C\\uDDE6AR" || /AR$/.test(tSansEspace)) {
        var parent = el.parentElement;
        if (parent) {
          var pTxt = (parent.textContent || "").toUpperCase();
          if (pTxt.indexOf("FR") !== -1 && pTxt.indexOf("EN") !== -1 && pTxt.indexOf("ES") !== -1) {
            btnSaAr = el;
            for (var c = 0; c < parent.children.length; c++) {
              if ((parent.children[c].textContent || "").toUpperCase().indexOf("FR") !== -1) {
                btnFrFr = parent.children[c];
                break;
              }
            }
            break;
          }
        }
      }
    }

    if (btnSaAr && btnSaAr.parentElement) {
      var conteneurLang = btnSaAr.parentElement;
      conteneurLang.setAttribute("translate", "no");
      conteneurLang.classList.add("notranslate");
      conteneurLang.style.setProperty("overflow", "visible", "important");
      conteneurLang.style.setProperty("flex-wrap", "wrap", "important");
      var modeleBtn = btnFrFr || btnSaAr;

      var freresInit = Array.prototype.slice.call(conteneurLang.children);
      var mapDrapeauxNatifs = {
        FR: { flag: "\\uD83C\\uDDEB\\uD83C\\uDDF7", code: "FR" },
        EN: { flag: "\\uD83C\\uDDEC\\uD83C\\uDDE7", code: "EN" },
        ES: { flag: "\\uD83C\\uDDEA\\uD83C\\uDDF8", code: "ES" },
        AR: { flag: "\\uD83C\\uDDF8\\uD83C\\uDDE6", code: "AR" }
      };
      for (var nIdx = 0; nIdx < freresInit.length; nIdx++) {
        var btnNat = freresInit[nIdx];
        var txtNat = (btnNat.textContent || "").toUpperCase();
        for (var cleNat in mapDrapeauxNatifs) {
          if (txtNat.indexOf(cleNat) !== -1) {
            var infoNat = mapDrapeauxNatifs[cleNat];
            if (btnNat.children && btnNat.children.length >= 2) {
              btnNat.children[0].textContent = infoNat.flag;
              btnNat.children[btnNat.children.length - 1].textContent = infoNat.code;
            } else {
              btnNat.innerHTML = '<span style="margin-right:3px;">' + infoNat.flag + '</span><span>' + infoNat.code + '</span>';
            }
            break;
          }
        }
      }

      function creerBoutonLangExt(idBtn, codeIso, emojiDrapeau, labelCourt) {
        var nvBtn = modeleBtn.cloneNode(true);
        nvBtn.id = idBtn;
        nvBtn.setAttribute("translate", "no");
        nvBtn.classList.add("notranslate");
        nvBtn.classList.remove("active");
        nvBtn.removeAttribute("onclick");
        nvBtn.removeAttribute("data-lang");
        if (nvBtn.children && nvBtn.children.length >= 2) {
          nvBtn.children[0].textContent = emojiDrapeau;
          nvBtn.children[nvBtn.children.length - 1].textContent = labelCourt;
        } else {
          nvBtn.innerHTML = '<span style="margin-right:3px;">' + emojiDrapeau + "</span><span>" + labelCourt + "</span>";
        }
        if (langExtActive === codeIso) nvBtn.classList.add("active-ext-v77");

        nvBtn.addEventListener("click", function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          restaurerTextesOriginauxDepuisExt();
          langExtActive = codeIso;
          langueNativeCible = "";
          try {
            localStorage.setItem("corantafsir_lang_ext_v77", codeIso);
            localStorage.setItem("corantafsir_user_lang_v77", codeIso);
            localStorage.setItem("corantafsir_manual_click_v77", "1");
          } catch (e) {}
          basculerDepuisArabeSurClicUtilisateur(conteneurLang, nvBtn);
          setTimeout(synchroniserTout, 15);
        });
        return nvBtn;
      }

      var btnDe = creerBoutonLangExt("btnLangDeV77", "de", "\\uD83C\\uDDE9\\uD83C\\uDDEA", "DE");
      var btnIt = creerBoutonLangExt("btnLangItV77", "it", "\\uD83C\\uDDEE\\uD83C\\uDDF9", "IT");
      var btnId = creerBoutonLangExt("btnLangIdV77", "id", "\\uD83C\\uDDEE\\uD83C\\uDDE9", "ID");
      var btnRu = creerBoutonLangExt("btnLangRuV77", "ru", "\\uD83C\\uDDF7\\uD83C\\uDDFA", "RU");

      for (var a = 0; a < freresInit.length; a++) {
        (function (autre) {
          autre.setAttribute("translate", "no");
          autre.classList.add("notranslate");
          autre.addEventListener("click", function () {
            if (IgnoreClicInterneFr) return;
            var etaitEnWbw = obtenirCartesMotAMotVisibles().length >= 2;
            langExtActive = "";
            langueNativeCible = "";
            var txtAutre = (autre.textContent || "").toUpperCase();
            var codeNatClique = txtAutre.indexOf("EN") !== -1 ? "en" : (txtAutre.indexOf("ES") !== -1 ? "es" : (txtAutre.indexOf("AR") !== -1 ? "ar" : "fr"));
            try {
              localStorage.setItem("corantafsir_lang_ext_v77", "native");
              localStorage.setItem("corantafsir_user_lang_v77", codeNatClique);
              localStorage.setItem("corantafsir_manual_click_v77", "1");
            } catch (e) {}
            btnDe.classList.remove("active-ext-v77");
            btnIt.classList.remove("active-ext-v77");
            btnId.classList.remove("active-ext-v77");
            btnRu.classList.remove("active-ext-v77");
            restaurerTextesOriginauxDepuisExt();

            setTimeout(function () {
              if (etaitEnWbw && obtenirCartesMotAMotVisibles().length === 0) {
                var btns = document.querySelectorAll("button, .btn");
                for (var bIdx = 0; bIdx < btns.length; bIdx++) {
                  var bt = (btns[bIdx].textContent || "").trim();
                  if (bt.indexOf("Mot à mot") !== -1 || bt.indexOf("Word by Word") !== -1 || bt.indexOf("كلمة بكلمة") !== -1 || bt.indexOf("Palabra por palabra") !== -1) {
                    btns[bIdx].click();
                    break;
                  }
                }
              }
              synchroniserTout();
            }, 25);
          });
        })(freresInit[a]);
      }

      conteneurLang.appendChild(btnDe);
      conteneurLang.appendChild(btnIt);
      conteneurLang.appendChild(btnId);
      conteneurLang.appendChild(btnRu);

      if (langExtActive && mapIds[langExtActive]) {
        basculerDepuisArabeSurClicUtilisateur(conteneurLang, document.getElementById(mapIds[langExtActive]));
      } else if (langueNativeCible) {
        cliquerBoutonNatifSiNecessaire(langueNativeCible);
      }
    }
  }

  function chargerChapitreOfficielExt(codeLang, chap) {
    var translationId = LANGUES_EXT_SUPPORTEES[codeLang];
    if (!chap || !translationId) return;
    var cle = codeLang + "_chap_" + chap;
    if (cacheChapitresExt[cle] || requetesChapExtEnCours[cle]) return;
    requetesChapExtEnCours[cle] = true;
    cacheChapitresExt[cle] = {};

    var urlApi = "https://api.quran.com/api/v4/quran/translations/" + translationId + "?chapter_number=" + chap;
    fetch(urlApi)
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.translations && d.translations.length > 0) {
          for (var j = 0; j < d.translations.length; j++) {
            var vk = chap + ":" + (j + 1);
            cacheChapitresExt[cle][vk] = nettoyerVersetBrutApi(d.translations[j].text || "");
          }
          try { localStorage.setItem("cache_ext_chap_v64", JSON.stringify(cacheChapitresExt)); } catch (e) {}
          if (langExtActive === codeLang) appliquerInterfaceEtContenuExt();
        }
      })
      .catch(function () {})
      .finally(function () {
        requetesChapExtEnCours[cle] = false;
      });
  }

  function traduireNoeudVersExtAsync(textNode, origTxt, codeLang) {
    if (!origTxt || origTxt.length < 3 || !LANGUES_EXT_SUPPORTEES[codeLang]) return;
    var cle = codeLang + "_" + origTxt.slice(0, 140) + "_" + origTxt.length;
    var esp1 = (textNode.__origExtV77 || textNode.nodeValue).match(/^\\s*/)[0];
    var esp2 = (textNode.__origExtV77 || textNode.nodeValue).match(/\\s*$/)[0];

    if (cacheTexteUnitaireExt[cle]) {
      modifierNoeudTexteSeul(textNode, esp1 + cacheTexteUnitaireExt[cle] + esp2);
      return;
    }

    if (requeteTexteExtEnCours[cle]) return;
    requeteTexteExtEnCours[cle] = true;

    var urlGtx = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" + codeLang + "&dt=t&q=" + encodeURIComponent(origTxt);
    fetch(urlGtx)
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res && res[0]) {
          var tr = "";
          for (var s = 0; s < res[0].length; s++) {
            if (res[0][s][0]) tr += res[0][s][0];
          }
          tr = affinerTraductionTheologique(tr, codeLang);
          if (tr) {
            cacheTexteUnitaireExt[cle] = tr;
            try { localStorage.setItem("cache_txt_unit_ext_v64", JSON.stringify(cacheTexteUnitaireExt)); } catch (e) {}
            if (langExtActive === codeLang) {
              modifierNoeudTexteSeul(textNode, esp1 + tr + esp2);
            }
          }
        }
      })
      .catch(function () {})
      .finally(function () {
        requeteTexteExtEnCours[cle] = false;
      });
  }

  var DICO_UI_PAR_LANG = {
    de: {
      "le noble coran & tafsīr": "DER EDLE KORAN & TAFSĪR",
      "le noble coran & tafsir": "DER EDLE KORAN & TAFSĪR",
      "the noble quran & tafsīr": "DER EDLE KORAN & TAFSĪR",
      "el noble corán y tafsīr": "DER EDLE KORAN & TAFSĪR",
      "le noble coran & tafsīr al-mukhtasar": "Der Edle Koran & Tafsīr Al-Mukhtasar",
      "the noble quran & tafsīr al-mukhtasar": "Der Edle Koran & Tafsīr Al-Mukhtasar",
      "‹ retour aux 114 sourates": "‹ Zurück zu den 114 Suren",
      "‹ back to 114 surahs": "‹ Zurück zu den 114 Suren",
      "‹ volver a las 114 suras": "‹ Zurück zu den 114 Suren",
      "sourate médinoise": "MEDINENSISCHE SURE",
      "medinan surah": "MEDINENSISCHE SURE",
      "sura medinense": "MEDINENSISCHE SURE",
      "sourate mecquoise": "MEKKANISCHE SURE",
      "makkan surah": "MEKKANISCHE SURE",
      "sura mequí": "MEKKANISCHE SURE",
      "📖 mot à mot": "📖 Wort für Wort",
      "mot à mot": "Wort für Wort",
      "📖 word by word": "📖 Wort für Wort",
      "word by word": "Wort für Wort",
      "🌊 bruit brun": "🌊 Braunes Rauschen",
      "bruit brun": "Braunes Rauschen",
      "🌊 brown noise": "🌊 Braunes Rauschen",
      "brown noise": "Braunes Rauschen",
      "✨ suivi": "✨ Verfolgung",
      "suivi": "Verfolgung",
      "✨ follow": "✨ Verfolgung",
      "follow": "Verfolgung",
      "enchaîner automatiquement": "Automatisch weiter",
      "auto-advance": "Automatisch weiter",
      "‹ précédent": "‹ Zurück",
      "‹ previous": "‹ Zurück",
      "suivant ›": "Weiter ›",
      "next ›": "Weiter ›",
      "▶ écouter le verset": "▶ Vers anhören",
      "▶ listen to verse": "▶ Vers anhören",
      "⏸ pause": "⏸ Pause",
      "↺ rejouer": "↺ Wiederholen",
      "↺ replay": "↺ Wiederholen",
      "tafsīr & explication du verset": "TAFSĪR & ERKLÄRUNG DES VERSES",
      "tafsīr & verse explanation": "TAFSĪR & ERKLÄRUNG DES VERSES",
      "tafsīr y explicación de la aleya": "TAFSĪR & ERKLÄRUNG DES VERSES",
      "madd (prolongation)": "Madd (Dehnung)",
      "lettre muette": "Stummer Buchstabe",
      "silent letter": "Stummer Buchstabe",
      "qu'est-ce qu'une sourate mecquoise ?": "Was ist eine mekkanische Sure?",
      "what is a meccan surah?": "Was ist eine mekkanische Sure?",
      "¿qué es una sura mequí?": "Was ist eine mekkanische Sure?",
      "qu'est-ce qu'une sourate médinoise ?": "Was ist eine medinensische Sure?",
      "what is a medinan surah?": "Was ist eine medinensische Sure?",
      "¿qué es una sura medinense?": "Was ist eine medinensische Sure?",
      "mecquoise • 86 sourates": "MEKKANISCH • 86 SUREN",
      "meccan • 86 surahs": "MEKKANISCH • 86 SUREN",
      "mequí • 86 suras": "MEKKANISCH • 86 SUREN",
      "médinoise • 28 sourates": "MEDINENSISCH • 28 SUREN",
      "medinan • 28 surahs": "MEDINENSISCH • 28 SUREN",
      "medinense • 28 suras": "MEDINENSISCH • 28 SUREN",
      "1. ordre de révélation (1 à 114)": "1. Offenbarungsreihenfolge (1–114)",
      "1. revelation order (1 to 114)": "1. Offenbarungsreihenfolge (1–114)",
      "1. orden de revelación (1 a 114)": "1. Offenbarungsreihenfolge (1–114)",
      "2. ordre du mushaf (1 à 114)": "2. Klassische Reihenfolge (1–114)",
      "2. ordre classique (1 à 114)": "2. Klassische Reihenfolge (1–114)",
      "2. traditional order (1 to 114)": "2. Klassische Reihenfolge (1–114)",
      "2. orden tradicional (1 a 114)": "2. Klassische Reihenfolge (1–114)",
      "⭐ 3. versets des miracles scientifiques": "3. ⭐ Wunder des Korans",
      "3. ⭐ miracles du coran": "3. ⭐ Wunder des Korans",
      "3. ⭐ les miracles du coran": "3. ⭐ Wunder des Korans",
      "les miracles du coran": "Wunder des Korans",
      "miracles du coran": "Wunder des Korans",
      "3. ⭐ miracles of the quran": "3. ⭐ Wunder des Korans",
      "miracles of the quran": "Wunder des Korans",
      "3. ⭐ milagros del corán": "3. ⭐ Wunder des Korans",
      "milagros del corán": "Wunder des Korans",
      "mecquoise": "MEKKANISCH",
      "meccan": "MEKKANISCH",
      "mequí": "MEKKANISCH",
      "médinoise": "MEDINENSISCH",
      "medinan": "MEDINENSISCH",
      "medinense": "MEDINENSISCH"
    },
    it: {
      "le noble coran & tafsīr": "IL NOBILE CORANO E TAFSĪR",
      "le noble coran & tafsir": "IL NOBILE CORANO E TAFSĪR",
      "the noble quran & tafsīr": "IL NOBILE CORANO E TAFSĪR",
      "el noble corán y tafsīr": "IL NOBILE CORANO E TAFSĪR",
      "le noble coran & tafsīr al-mukhtasar": "Il Nobile Corano e Tafsīr Al-Mukhtasar",
      "the noble quran & tafsīr al-mukhtasar": "Il Nobile Corano e Tafsīr Al-Mukhtasar",
      "‹ retour aux 114 sourates": "‹ Torna alle 114 Sure",
      "‹ back to 114 surahs": "‹ Torna alle 114 Sure",
      "‹ volver a las 114 suras": "‹ Torna alle 114 Sure",
      "sourate médinoise": "SURA MEDINESE",
      "medinan surah": "SURA MEDINESE",
      "sura medinense": "SURA MEDINESE",
      "sourate mecquoise": "SURA MECCANA",
      "makkan surah": "SURA MECCANA",
      "sura mequí": "SURA MECCANA",
      "📖 mot à mot": "📖 Parola per parola",
      "mot à mot": "Parola per parola",
      "📖 word by word": "📖 Parola per parola",
      "word by word": "Parola per parola",
      "🌊 bruit brun": "🌊 Rumore Marrone",
      "bruit brun": "Rumore Marrone",
      "🌊 brown noise": "🌊 Rumore Marrone",
      "brown noise": "Rumore Marrone",
      "✨ suivi": "✨ Seguito",
      "suivi": "Seguito",
      "✨ follow": "✨ Seguito",
      "follow": "Seguito",
      "enchaîner automatiquement": "Riproduzione automatica",
      "auto-advance": "Riproduzione automatica",
      "‹ précédent": "‹ Precedente",
      "‹ previous": "‹ Precedente",
      "suivant ›": "Successivo ›",
      "next ›": "Successivo ›",
      "▶ écouter le verset": "▶ Ascolta il versetto",
      "▶ listen to verse": "▶ Ascolta il versetto",
      "⏸ pause": "⏸ Pausa",
      "↺ rejouer": "↺ Riascolta",
      "↺ replay": "↺ Riascolta",
      "tafsīr & explication du verset": "TAFSĪR E SPIEGAZIONE DEL VERSETTO",
      "tafsīr & verse explanation": "TAFSĪR E SPIEGAZIONE DEL VERSETTO",
      "tafsīr y explicación de la aleya": "TAFSĪR E SPIEGAZIONE DEL VERSETTO",
      "madd (prolongation)": "Madd (Prolungamento)",
      "lettre muette": "Lettera muta",
      "silent letter": "Lettera muta",
      "qu'est-ce qu'une sourate mecquoise ?": "Cos'è una Sura Meccana?",
      "what is a meccan surah?": "Cos'è una Sura Meccana?",
      "¿qué es una sura mequí?": "Cos'è una Sura Meccana?",
      "qu'est-ce qu'une sourate médinoise ?": "Cos'è una Sura Medinese?",
      "what is a medinan surah?": "Cos'è una Sura Medinese?",
      "¿qué es una sura medinense?": "Cos'è una Sura Medinese?",
      "mecquoise • 86 sourates": "MECCANA • 86 SURE",
      "meccan • 86 surahs": "MECCANA • 86 SURE",
      "mequí • 86 suras": "MECCANA • 86 SURE",
      "médinoise • 28 sourates": "MEDINESE • 28 SURE",
      "medinan • 28 surahs": "MEDINESE • 28 SURE",
      "medinense • 28 suras": "MEDINESE • 28 SURE",
      "1. ordre de révélation (1 à 114)": "1. Ordine di Rivelazione (1–114)",
      "1. revelation order (1 to 114)": "1. Ordine di Rivelazione (1–114)",
      "1. orden de revelación (1 a 114)": "1. Ordine di Rivelazione (1–114)",
      "2. ordre du mushaf (1 à 114)": "2. Ordine Classico (1–114)",
      "2. ordre classique (1 à 114)": "2. Ordine Classico (1–114)",
      "2. traditional order (1 to 114)": "2. Ordine Classico (1–114)",
      "2. orden tradicional (1 a 114)": "2. Ordine Classico (1–114)",
      "⭐ 3. versets des miracles scientifiques": "3. ⭐ I Miracoli del Corano",
      "3. ⭐ miracles du coran": "3. ⭐ I Miracoli del Corano",
      "3. ⭐ les miracles du coran": "3. ⭐ I Miracoli del Corano",
      "les miracles du coran": "I Miracoli del Corano",
      "miracles du coran": "I Miracoli del Corano",
      "3. ⭐ miracles of the quran": "3. ⭐ I Miracoli del Corano",
      "miracles of the quran": "I Miracoli del Corano",
      "3. ⭐ milagros del corán": "3. ⭐ I Miracoli del Corano",
      "milagros del corán": "I Miracoli del Corano",
      "mecquoise": "MECCANA",
      "meccan": "MECCANA",
      "mequí": "MECCANA",
      "médinoise": "MEDINESE",
      "medinan": "MEDINESE",
      "medinense": "MEDINESE"
    },
    id: {
      "le noble coran & tafsīr": "AL-QUR'AN MULIA & TAFSĪR",
      "le noble coran & tafsir": "AL-QUR'AN MULIA & TAFSĪR",
      "the noble quran & tafsīr": "AL-QUR'AN MULIA & TAFSĪR",
      "el noble corán y tafsīr": "AL-QUR'AN MULIA & TAFSĪR",
      "le noble coran & tafsīr al-mukhtasar": "Al-Qur'an Mulia & Tafsīr Al-Mukhtasar",
      "the noble quran & tafsīr al-mukhtasar": "Al-Qur'an Mulia & Tafsīr Al-Mukhtasar",
      "‹ retour aux 114 sourates": "‹ Kembali ke 114 Surah",
      "‹ back to 114 surahs": "‹ Kembali ke 114 Surah",
      "‹ volver a las 114 suras": "‹ Kembali ke 114 Surah",
      "sourate médinoise": "SURAH MADANIYAH",
      "medinan surah": "SURAH MADANIYAH",
      "sura medinense": "SURAH MADANIYAH",
      "sourate mecquoise": "SURAH MAKKIYAH",
      "makkan surah": "SURAH MAKKIYAH",
      "sura mequí": "SURAH MAKKIYAH",
      "📖 mot à mot": "📖 Kata demi Kata",
      "mot à mot": "Kata demi Kata",
      "📖 word by word": "📖 Kata demi Kata",
      "word by word": "Kata demi Kata",
      "🌊 bruit brun": "🌊 Derau Cokelat",
      "bruit brun": "Derau Cokelat",
      "🌊 brown noise": "🌊 Derau Cokelat",
      "brown noise": "Derau Cokelat",
      "✨ suivi": "✨ Ikuti Bacaan",
      "suivi": "Ikuti Bacaan",
      "✨ follow": "✨ Ikuti Bacaan",
      "follow": "Ikuti Bacaan",
      "enchaîner automatiquement": "Putar otomatis",
      "auto-advance": "Putar otomatis",
      "‹ précédent": "‹ Sebelumnya",
      "‹ previous": "‹ Sebelumnya",
      "suivant ›": "Berikutnya ›",
      "next ›": "Berikutnya ›",
      "▶ écouter le verset": "▶ Dengarkan Ayat",
      "▶ listen to verse": "▶ Dengarkan Ayat",
      "⏸ pause": "⏸ Jeda",
      "↺ rejouer": "↺ Ulangi",
      "↺ replay": "↺ Ulangi",
      "tafsīr & explication du verset": "TAFSĪR & PENJELASAN AYAT",
      "tafsīr & verse explanation": "TAFSĪR & PENJELASAN AYAT",
      "tafsīr y explicación de la aleya": "TAFSĪR & PENJELASAN AYAT",
      "madd (prolongation)": "Mad (Bacaan Panjang)",
      "lettre muette": "Huruf Bisu",
      "silent letter": "Huruf Bisu",
      "qu'est-ce qu'une sourate mecquoise ?": "Apa itu Surah Makkiyah?",
      "what is a meccan surah?": "Apa itu Surah Makkiyah?",
      "¿qué es una sura mequí?": "Apa itu Surah Makkiyah?",
      "qu'est-ce qu'une sourate médinoise ?": "Apa itu Surah Madaniyah?",
      "what is a medinan surah?": "Apa itu Surah Madaniyah?",
      "¿qué es una sura medinense?": "Apa itu Surah Madaniyah?",
      "mecquoise • 86 sourates": "MAKKIYAH • 86 SURAH",
      "meccan • 86 surahs": "MAKKIYAH • 86 SURAH",
      "mequí • 86 suras": "MAKKIYAH • 86 SURAH",
      "médinoise • 28 sourates": "MADANIYAH • 28 SURAH",
      "medinan • 28 surahs": "MADANIYAH • 28 SURAH",
      "medinense • 28 suras": "MADANIYAH • 28 SURAH",
      "1. ordre de révélation (1 à 114)": "1. Urutan Turunnya Wahyu (1–114)",
      "1. revelation order (1 to 114)": "1. Urutan Turunnya Wahyu (1–114)",
      "1. orden de revelación (1 a 114)": "1. Urutan Turunnya Wahyu (1–114)",
      "2. ordre du mushaf (1 à 114)": "2. Urutan Mushaf (1–114)",
      "2. ordre classique (1 à 114)": "2. Urutan Mushaf (1–114)",
      "2. traditional order (1 to 114)": "2. Urutan Mushaf (1–114)",
      "2. orden tradicional (1 a 114)": "2. Urutan Mushaf (1–114)",
      "⭐ 3. versets des miracles scientifiques": "3. ⭐ Mukjizat Al-Qur'an",
      "3. ⭐ miracles du coran": "3. ⭐ Mukjizat Al-Qur'an",
      "3. ⭐ les miracles du coran": "3. ⭐ Mukjizat Al-Qur'an",
      "les miracles du coran": "Mukjizat Al-Qur'an",
      "miracles du coran": "Mukjizat Al-Qur'an",
      "3. ⭐ miracles of the quran": "3. ⭐ Mukjizat Al-Qur'an",
      "miracles of the quran": "Mukjizat Al-Qur'an",
      "3. ⭐ milagros del corán": "3. ⭐ Mukjizat Al-Qur'an",
      "milagros del corán": "Mukjizat Al-Qur'an",
      "mecquoise": "MAKKIYAH",
      "meccan": "MAKKIYAH",
      "mequí": "MAKKIYAH",
      "médinoise": "MADANIYAH",
      "medinan": "MADANIYAH",
      "medinense": "MADANIYAH"
    },
    ru: {
      "le noble coran & tafsīr": "СВЯЩЕННЫЙ КОРАН И ТАФСИР",
      "le noble coran & tafsir": "СВЯЩЕННЫЙ КОРАН И ТАФСИР",
      "the noble quran & tafsīr": "СВЯЩЕННЫЙ КОРАН И ТАФСИР",
      "el noble corán y tafsīr": "СВЯЩЕННЫЙ КОРАН И ТАФСИР",
      "le noble coran & tafsīr al-mukhtasar": "Священный Коран и Тафсир аль-Мухтасар",
      "the noble quran & tafsīr al-mukhtasar": "Священный Коран и Тафсир аль-Мухтасар",
      "‹ retour aux 114 sourates": "‹ Назад к 114 сурам",
      "‹ back to 114 surahs": "‹ Назад к 114 сурам",
      "‹ volver a las 114 suras": "‹ Назад к 114 сурам",
      "sourate médinoise": "МЕДИНСКАЯ СУРА",
      "medinan surah": "МЕДИНСКАЯ СУРА",
      "sura medinense": "МЕДИНСКАЯ СУРА",
      "sourate mecquoise": "МЕККАНСКАЯ СУРА",
      "makkan surah": "МЕККАНСКАЯ СУРА",
      "sura mequí": "МЕККАНСКАЯ СУРА",
      "📖 mot à mot": "📖 Пословный перевод",
      "mot à mot": "Пословный перевод",
      "📖 word by word": "📖 Пословный перевод",
      "word by word": "Пословный перевод",
      "🌊 bruit brun": "🌊 Коричневый шум",
      "bruit brun": "Коричневый шум",
      "🌊 brown noise": "🌊 Коричневый шум",
      "brown noise": "Коричневый шум",
      "✨ suivi": "✨ Слежение",
      "suivi": "Слежение",
      "✨ follow": "✨ Слежение",
      "follow": "Слежение",
      "enchaîner automatiquement": "Автопереход",
      "auto-advance": "Автопереход",
      "‹ précédent": "‹ Назад",
      "‹ previous": "‹ Назад",
      "suivant ›": "Далее ›",
      "next ›": "Далее ›",
      "▶ écouter le verset": "▶ Слушать аят",
      "▶ listen to verse": "▶ Слушать аят",
      "⏸ pause": "⏸ Пауза",
      "↺ rejouer": "↺ Повторить",
      "↺ replay": "↺ Повторить",
      "tafsīr & explication du verset": "ТАФСИР И ТОЛКОВАНИЕ АЯТА",
      "tafsīr & verse explanation": "ТАФСИР И ТОЛКОВАНИЕ АЯТА",
      "tafsīr y explicación de la aleya": "ТАФСИР И ТОЛКОВАНИЕ АЯТА",
      "madd (prolongation)": "Мадд (Удлинение)",
      "lettre muette": "Немая буква",
      "silent letter": "Немая буква",
      "qu'est-ce qu'une sourate mecquoise ?": "Что такое мекканская сура?",
      "what is a meccan surah?": "Что такое мекканская сура?",
      "¿qué es una sura mequí?": "Что такое мекканская сура?",
      "qu'est-ce qu'une sourate médinoise ?": "Что такое мединская сура?",
      "what is a medinan surah?": "Что такое мединская сура?",
      "¿qué es una sura medinense?": "Что такое мединская сура?",
      "mecquoise • 86 sourates": "МЕККАНСКАЯ • 86 СУР",
      "meccan • 86 surahs": "МЕККАНСКАЯ • 86 СУР",
      "mequí • 86 suras": "МЕККАНСКАЯ • 86 СУР",
      "médinoise • 28 sourates": "МЕДИНСКАЯ • 28 СУР",
      "medinan • 28 surahs": "МЕДИНСКАЯ • 28 СУР",
      "medinense • 28 suras": "МЕДИНСКАЯ • 28 СУР",
      "1. ordre de révélation (1 à 114)": "1. По порядку ниспослания (1–114)",
      "1. revelation order (1 to 114)": "1. По порядку ниспослания (1–114)",
      "1. orden de revelación (1 a 114)": "1. По порядку ниспослания (1–114)",
      "2. ordre du mushaf (1 à 114)": "2. По порядку Мусхафа (1–114)",
      "2. ordre classique (1 à 114)": "2. По порядку Мусхафа (1–114)",
      "2. traditional order (1 to 114)": "2. По порядку Мусхафа (1–114)",
      "2. orden tradicional (1 a 114)": "2. По порядку Мусхафа (1–114)",
      "⭐ 3. versets des miracles scientifiques": "3. ⭐ Чудеса Корана",
      "3. ⭐ miracles du coran": "3. ⭐ Чудеса Корана",
      "3. ⭐ les miracles du coran": "3. ⭐ Чудеса Корана",
      "les miracles du coran": "Чудеса Корана",
      "miracles du coran": "Чудеса Корана",
      "3. ⭐ miracles of the quran": "3. ⭐ Чудеса Корана",
      "miracles of the quran": "Чудеса Корана",
      "3. ⭐ milagros del corán": "3. ⭐ Чудеса Корана",
      "milagros del corán": "Чудеса Корана",
      "mecquoise": "МЕККАНСКАЯ",
      "meccan": "МЕККАНСКАЯ",
      "mequí": "МЕККАНСКАЯ",
      "médinoise": "МЕДИНСКАЯ",
      "medinan": "МЕДИНСКАЯ",
      "medinense": "МЕДИНСКАЯ"
    }
  };

  var TEXTES_INTRO_ACCUEIL = {
    de: {
      mecq: "Offenbart zu Beginn der Prophetie (vor der Hidschra), als die Gläubigen in Mekka noch wenige waren: begründet die reine Einheit Allāhs (Tawhīd), die Beweise des Glaubens, das Jüngste Gericht und die Geschichten der Propheten.",
      med: "Offenbart nach der Hidschra, als die Muslime zahlreich wurden, vereint in Medina, siegreich in den großen Schlachten (wie Badr) bis zur Eroberung Mekkas: regelt die Gottesdienste, die sozialen Gesetze und die Gerechtigkeit."
    },
    it: {
      mecq: "Rivelata all'inizio della profezia (prima dell'Egira), quando i credenti erano ancora pochi alla Mecca: fonda la pura Unicità di Allāh (Tawhīd), le prove della fede, il Giudizio Finale e la storia dei Profeti.",
      med: "Rivelata dopo l'Egira, quando i musulmani divennero numerosi, uniti a Medina, vittoriosi nelle grandi battaglie (come Badr) fino alla conquista della Mecca: dettaglia le adorazioni, le leggi sociali e la giustizia."
    },
    id: {
      mecq: "Diturunkan pada awal kenabian (sebelum Hijrah), ketika kaum mukminin masih sedikit di Mekkah: menegakkan kemurnian Tauhid kepada Allah, bukti-bukti keimanan, Hari Kiamat, dan kisah para Nabi.",
      med: "Diturunkan setelah Hijrah, ketika umat Islam telah banyak dan bersatu di Madinah, menang dalam pertempuran besar (seperti Badar) hingga penaklukan Mekkah: merinci ibadah, hukum sosial, dan keadilan."
    },
    ru: {
      mecq: "Ниспослана в начале пророчества (до Хиджры), когда верующих в Мекке было ещё мало: утверждает чистое Единобожие Аллаха (Таухид), доказательства веры, Судный день и истории Пророков.",
      med: "Ниспослана после Хиджры, когда мусульмане стали многочисленными и объединились в Медине, одержав победу в великих битвах (как при Бадре) вплоть до открытия Мекки: разъясняет поклонение, общественные законы и справедливость."
    }
  };

  function trouverBoiteTafsirBas() {
    var els = document.querySelectorAll("div, p, span, h3, h4");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.children.length > 0) continue;
      var t = (el.textContent || "").trim().toUpperCase();
      if (t.indexOf("TAFSĪR") !== -1 || t.indexOf("ТАФСИР") !== -1 || t.indexOf("تفسير") !== -1) {
        return el.parentElement;
      }
    }
    return null;
  }

  function appliquerInterfaceEtContenuExt() {
    var codeL = langExtActive;
    if (!LANGUES_EXT_SUPPORTEES[codeL] || !document.body) return;

    var vk = obtenirCleVerset();
    var parts = vk ? vk.split(":") : [];
    var numS = parts.length === 2 ? Number(parts[0]) : 0;
    var numV = parts.length === 2 ? Number(parts[1]) : 0;

    var cleChap = codeL + "_chap_" + numS;
    if (numS && !cacheChapitresExt[cleChap]) {
      chargerChapitreOfficielExt(codeL, numS);
    }
    var texteOfficielVerset = (numS && cacheChapitresExt[cleChap]) ? cacheChapitresExt[cleChap][vk] : null;
    var dicoUi = DICO_UI_PAR_LANG[codeL];
    var noms114 = NOMS_114_ACCUEIL[codeL] || {};
    var introTxt = TEXTES_INTRO_ACCUEIL[codeL];

    var placeholders = {
      de: "Suche nach einer Sure oder einem Vers (z.B. 2:255, 30:1, Al-Kahf...)",
      it: "Cerca una Sura o un versetto (es. 2:255, 30:1, Al-Kahf...)",
      id: "Cari Surah atau ayat (misal: 2:255, 30:1, Al-Kahf...)",
      ru: "Поиск суры или аята (например: 2:255, 30:1, Аль-Кахф...)"
    };
    var inputs = document.querySelectorAll("input[type='text'], input[type='search'], input:not([type])");
    for (var inp = 0; inp < inputs.length; inp++) {
      inputs[inp].setAttribute("placeholder", placeholders[codeL]);
    }

    var cartesAccueil = document.querySelectorAll("a[href*='sourate-']");
    for (var ca = 0; ca < cartesAccueil.length; ca++) {
      var lienCarte = cartesAccueil[ca];
      if (lienCarte.closest("#khatmPlannerWidgetV77")) continue;
      var mHref = (lienCarte.getAttribute("href") || "").match(/sourate-(\\d+)/i);
      if (mHref) {
        var sId = Number(mHref[1]);
        if (noms114[sId]) {
          var titresEl = lienCarte.querySelectorAll("h2, h3, h4, div, span");
          for (var te = 0; te < titresEl.length; te++) {
            var candT = titresEl[te];
            if (candT.children.length === 0) {
              var origT = (candT.__origTitreV77 || candT.textContent || "").trim();
              if (origT.indexOf("(") !== -1 && origT.indexOf(")") !== -1 && origT.indexOf("Miracle") === -1 && origT.indexOf("Wunder") === -1 && origT.indexOf("Milagro") === -1) {
                if (!candT.__origTitreV77) candT.__origTitreV77 = origT;
                if (candT.firstChild && candT.firstChild.nodeType === 3) {
                  modifierNoeudTexteSeul(candT.firstChild, noms114[sId]);
                }
                break;
              }
            }
          }
        }
      }
    }

    var conteneurArabe = document.querySelector("#arabicVerse, .arabic-glow-verse");
    var rectArabe = conteneurArabe ? conteneurArabe.getBoundingClientRect() : null;
    var boiteTafsir = trouverBoiteTafsirBas();
    var versetHautDejaRemplace = false;

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var pEl = node.parentElement;
      if (!pEl) continue;
      var tag = pEl.tagName;
      if (tag === "SCRIPT" || tag === "STYLE") continue;
      if (pEl.closest(".wbw-card-unit") || pEl.id === "wbwSensLectureBanner" || pEl.closest(".notranslate") || pEl.closest("#khatmPlannerWidgetV77")) continue;

      var val = (node.__origExtV77 !== undefined ? node.__origExtV77 : node.nodeValue || "").replace(/\\u00A0/g, " ").trim();
      if (!val || /[\\u0600-\\u06FF]/.test(val)) continue;
      var valLower = val.toLowerCase();

      if (dicoUi[valLower]) {
        modifierNoeudTexteSeul(node, dicoUi[valLower]);
        continue;
      }

      if (introTxt && (valLower.indexOf("tawhid") !== -1 || valLower.indexOf("hégire") !== -1 || valLower.indexOf("hijrah") !== -1)) {
        if (valLower.indexOf("tawhid") !== -1) {
          modifierNoeudTexteSeul(node, introTxt.mecq);
        } else {
          modifierNoeudTexteSeul(node, introTxt.med);
        }
        pEl.classList.add("panneau-opaque-v77");
        continue;
      }

      var matchVersetsCourt = val.match(/^(\\d+)\\s*(?:v\\.|a\\.|versets|verses|aleyas)$/i);
      if (matchVersetsCourt) {
        var nbV = matchVersetsCourt[1];
        var unitV = { de: nbV + " Verse", it: nbV + " versetti", id: nbV + " ayat", ru: nbV + " аятов" }[codeL];
        modifierNoeudTexteSeul(node, unitV);
        continue;
      }

      if (valLower.indexOf("safari") !== -1 || valLower.indexOf("android") !== -1 || valLower.indexOf("iphone") !== -1) {
        var txtPwa = {
          de: "📲 App auf Ihrem Telefon installieren (iPhone / Android)",
          it: "📲 Installa l'App sul tuo telefono (iPhone / Android)",
          id: "📲 Pasang Aplikasi di ponsel Anda (iPhone / Android)",
          ru: "📲 Установить приложение на телефон (iPhone / Android)"
        }[codeL];
        modifierNoeudTexteSeul(node, txtPwa);
        continue;
      }

      if (/(?:Verset|Verse|Aleya)\\s+\\d+\\s*\\/\\s*\\d+/i.test(val)) {
        var mapMotVers = { de: "Vers", it: "Versetto", id: "Ayat", ru: "Аят" };
        var mapMotMir = { de: "Wunder", it: "Miracolo", id: "Mukjizat", ru: "Чудо" };
        modifierNoeudTexteSeul(node, val.replace(/Verset|Verse|Aleya/gi, mapMotVers[codeL]).replace(/Miracle/gi, mapMotMir[codeL]));
        continue;
      }

      var mMirBadge = val.match(/(?:Miracle|Milagro)\\s*[:\\(]\\s*(?:V\\.?|A\\.?|Verset|Verse)\\s*(\\d+)\\)?/i);
      if (mMirBadge) {
        var vNumMir = mMirBadge[1];
        var txtMir = {
          de: "⭐ WUNDER (VERS " + vNumMir + ")",
          it: "⭐ MIRACOLO (V. " + vNumMir + ")",
          id: "⭐ MUKJIZAT (AYAT " + vNumMir + ")",
          ru: "⭐ ЧУДО (АЯТ " + vNumMir + ")"
        }[codeL];
        modifierNoeudTexteSeul(node, txtMir);
        continue;
      }

      if ((val.indexOf("Sourate ") === 0 || val.indexOf("Surah ") === 0 || val.indexOf("Sure ") === 0 || val.indexOf("Sura ") === 0) && (val.indexOf(" — Verset ") !== -1 || val.indexOf(" — Verse ") !== -1 || val.indexOf(" — Aleya ") !== -1)) {
        var prefS = { de: "Sure ", it: "Sura ", id: "Surah ", ru: "Сура " }[codeL];
        var prefV = { de: " — Vers ", it: " — Versetto ", id: " — Ayat ", ru: " — Аят " }[codeL];
        if (numS && noms114[numS]) {
          modifierNoeudTexteSeul(node, prefS + noms114[numS] + prefV + numV);
        } else {
          modifierNoeudTexteSeul(node, val.replace(/^Sourate |^Surah |^Sura /, prefS).replace(/ — Verset | — Verse | — Aleya /, prefV));
        }
        continue;
      }

      var rectP = pEl.getBoundingClientRect();
      var estDansTafsir = boiteTafsir && boiteTafsir.contains(pEl);
      if (
        !estDansTafsir &&
        !versetHautDejaRemplace &&
        numV &&
        rectArabe &&
        rectP.top >= rectArabe.top &&
        rectP.top <= rectArabe.bottom + 180 &&
        new RegExp("^" + numV + "\\\\s*[\\\\.-]\\\\s+").test(val)
      ) {
        versetHautDejaRemplace = true;
        if (texteOfficielVerset) {
          modifierNoeudTexteSeul(node, numV + ". " + texteOfficielVerset);
        } else {
          traduireNoeudVersExtAsync(node, val, codeL);
        }
        continue;
      }

      var estSousVerset = (estDansTafsir || (rectArabe && rectP.top > rectArabe.bottom + 75)) && val.length >= 3;
      if (estSousVerset) {
        if (
          val.indexOf("Traduction originale") === -1 &&
          val.indexOf("Deutsche Übersetzung") === -1 &&
          val.indexOf("Traduzione italiana") === -1 &&
          val.indexOf("Terjemahan Kementerian") === -1 &&
          val.indexOf("Смысловой перевод") === -1 &&
          val.indexOf("Translation by Saheeh") === -1 &&
          val.indexOf("Traducción de Sheikh Isa García") === -1 &&
          val.indexOf("TAFSĪR") === -1
        ) {
          traduireNoeudVersExtAsync(node, val, codeL);
        }
      }
    }
  }

  function corrigerCoquillesNativesEtTafsir() {
    var lang = obtenirLangueActive();
    var pEls = document.querySelectorAll("p, button, strong, b, span");
    for (var i = 0; i < pEls.length; i++) {
      var el = pEls[i];
      if (el.children.length > 0 || el.closest("#khatmPlannerWidgetV77")) continue;
      var t = el.textContent || "";
      if (t.indexOf("y e temen") !== -1) {
        el.textContent = t.replace("y e temen", "y le temen");
      }
      if ((lang === "es" || lang === "it") && t.trim() === "⏸ Pause") {
        el.textContent = "⏸ Pausa";
      }
      if (/^\\d+\\s*\\.\\s+(?:Le Livre par excellence|This is the Qur'ān|El Libro por excelencia|Das Buch schlechthin|Il Libro per eccellenza|Kitab yang paling|Лучшей книгой)/i.test(t.trim())) {
        el.textContent = t.trim().replace(/^\\d+\\s*\\.\\s+/, "");
      }
    }
  }

  var suiviEstActif = true;

  function assurerBoutonSuiviVisible() {
    if (!obtenirCleVerset()) return;
    var tousBtns = document.querySelectorAll("button, .btn, span[role='button']");
    var btnSuivi = null;
    var btnTajwid = null;
    for (var i = 0; i < tousBtns.length; i++) {
      var b = tousBtns[i];
      var t = (b.textContent || "").trim();
      if (t.indexOf("Suivi") !== -1 || t.indexOf("Follow") !== -1 || t.indexOf("Seguimiento") !== -1 || t.indexOf("Verfolgung") !== -1 || t.indexOf("Seguito") !== -1 || t.indexOf("Ikuti") !== -1 || t.indexOf("Слежение") !== -1 || t.indexOf("تتبع") !== -1) {
        btnSuivi = b;
      } else if (t.indexOf("Tajw") !== -1 || t.indexOf("تجويد") !== -1) {
        btnTajwid = b;
      }
    }

    var mapLabelsSuivi = { de: "✨ Verfolgung", it: "✨ Seguito", id: "✨ Ikuti Bacaan", ru: "✨ Слежение" };
    var labelSuivi = mapLabelsSuivi[langExtActive] || "✨ Suivi";

    if (btnSuivi) {
      btnSuivi.style.setProperty("display", "inline-flex", "important");
      btnSuivi.style.setProperty("visibility", "visible", "important");
      btnSuivi.style.setProperty("opacity", "1", "important");
      if (btnSuivi.id === "btnSuiviUniverselV77" && btnSuivi.textContent !== labelSuivi) {
        btnSuivi.textContent = labelSuivi;
      }
      if (suiviEstActif) {
        btnSuivi.style.setProperty("background", "linear-gradient(135deg, #0ea5e9, #38bdf8)", "important");
        btnSuivi.style.setProperty("color", "#ffffff", "important");
      } else {
        btnSuivi.style.removeProperty("background");
      }
    } else if (btnTajwid && btnTajwid.parentElement && !document.getElementById("btnSuiviUniverselV77")) {
      var nv = document.createElement("button");
      nv.id = "btnSuiviUniverselV77";
      nv.type = "button";
      nv.className = btnTajwid.className;
      nv.textContent = labelSuivi;
      nv.style.setProperty("background", "linear-gradient(135deg, #0ea5e9, #38bdf8)", "important");
      nv.style.setProperty("color", "#ffffff", "important");
      nv.style.setProperty("margin-left", "6px", "important");
      btnTajwid.parentElement.insertBefore(nv, btnTajwid.nextSibling);
    }
  }

  var astresDejaVerrouilles = false;
  function reparerSoleilEtLuneEnOrbite() {
    if (astresDejaVerrouilles && document.querySelector(".astre-soleil-pur-v77") && document.querySelector(".astre-lune-pure-v77")) {
      return;
    }

    var tousDivs = document.querySelectorAll("div, span, canvas");
    var spheresTrouvees = [];

    for (var i = 0; i < tousDivs.length; i++) {
      var el = tousDivs[i];
      var idCls = ((el.id || "") + " " + (el.className && typeof el.className === "string" ? el.className : "")).toLowerCase();

      var estNommeSun = idCls.indexOf("sun") !== -1 || idCls.indexOf("soleil") !== -1 || el.getAttribute("data-astre-role") === "sun";
      var estNommeMoon = idCls.indexOf("moon") !== -1 || idCls.indexOf("lune") !== -1 || el.getAttribute("data-astre-role") === "moon";

      var r = el.getBoundingClientRect();
      var estRondVide =
        r.width >= 55 &&
        r.width <= 320 &&
        Math.abs(r.width - r.height) <= 10 &&
        (el.textContent || "").trim() === "" &&
        !el.querySelector("button, input, select, p, a, img");

      if (estNommeSun || estNommeMoon || estRondVide) {
        var st = window.getComputedStyle(el);
        var br = st.borderRadius || "";
        if (estNommeSun || estNommeMoon || br.indexOf("50%") !== -1 || parseFloat(br) >= r.width * 0.4) {
          var styleStr = ((el.getAttribute("style") || "") + " " + (st.boxShadow || "") + " " + (st.backgroundImage || "") + " " + (st.backgroundColor || "")).toLowerCase();
          var aCouleurSoleil =
            styleStr.indexOf("250, 204, 21") !== -1 || styleStr.indexOf("245, 158, 11") !== -1 ||
            styleStr.indexOf("253, 224, 71") !== -1 || styleStr.indexOf("234, 88, 12") !== -1 ||
            styleStr.indexOf("255, 215") !== -1 || styleStr.indexOf("255, 180") !== -1 ||
            styleStr.indexOf("facc15") !== -1 || styleStr.indexOf("fde047") !== -1 ||
            styleStr.indexOf("f59e0b") !== -1 || styleStr.indexOf("0, 210, 255") !== -1 ||
            styleStr.indexOf("56, 189, 248") !== -1;

          spheresTrouvees.push({
            el: el, cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: r.width,
            isSun: estNommeSun || (!estNommeMoon && aCouleurSoleil), isMoon: estNommeMoon
          });
        }
      }
    }

    var astresPrincipaux = [];
    for (var j = 0; j < spheresTrouvees.length; j++) {
      var s = spheresTrouvees[j];
      var doublonSuperpose = false;
      for (var k = 0; k < astresPrincipaux.length; k++) {
        var p = astresPrincipaux[k];
        if (Math.hypot(s.cx - p.cx, s.cy - p.cy) < 48) {
          doublonSuperpose = true;
          s.el.style.setProperty("display", "none", "important");
          break;
        }
      }
      if (!doublonSuperpose) astresPrincipaux.push(s);
    }

    var soleilDejaTrouve = false;
    for (var m = 0; m < astresPrincipaux.length; m++) {
      if (astresPrincipaux[m].isSun) soleilDejaTrouve = true;
    }

    for (var n = 0; n < astresPrincipaux.length; n++) {
      var astre = astresPrincipaux[n];
      var node = astre.el;
      if (node.children && node.children.length > 0) node.innerHTML = "";

      var role = node.getAttribute("data-astre-role");
      if (!role) {
        if (astre.isSun || (!soleilDejaTrouve && !astre.isMoon && n === 0)) {
          role = "sun";
          soleilDejaTrouve = true;
        } else {
          role = "moon";
        }
        node.setAttribute("data-astre-role", role);
      }

      if (role === "sun") {
        node.classList.remove("astre-lune-pure-v77");
        node.classList.add("astre-soleil-pur-v77");
      } else {
        node.classList.remove("astre-soleil-pur-v77");
        node.classList.add("astre-lune-pure-v77");
      }
    }
    if (astresPrincipaux.length >= 2) {
      astresDejaVerrouilles = true;
    }
  }

  function retirerRecitateurMaher() {
    var imgs = document.querySelectorAll("img");
    for (var im = 0; im < imgs.length; im++) {
      var src = (imgs[im].getAttribute("src") || "").toLowerCase();
      imgs[im].setAttribute("loading", "lazy");
      if (src.indexOf("maher") !== -1 || src.indexOf("muaiqly") !== -1) {
        var row = imgs[im].parentElement;
        if (row && row.getBoundingClientRect().height < 110) {
          row.classList.add("maher-supprime-v77");
          if (row.parentNode) row.parentNode.removeChild(row);
        }
      }
    }
  }

  function obtenirLangueActive() {
    if (langExtActive && LANGUES_EXT_SUPPORTEES[langExtActive]) return langExtActive;

    var btnDeRef = document.getElementById("btnLangDeV77");
    if (btnDeRef && btnDeRef.parentElement) {
      var ch = btnDeRef.parentElement.children;
      for (var i = 0; i < ch.length; i++) {
        if (ch[i].classList.contains("active")) {
          var t = (ch[i].textContent || "").toUpperCase();
          if (t.indexOf("EN") !== -1) return "en";
          if (t.indexOf("ES") !== -1) return "es";
          if (t.indexOf("AR") !== -1) return "ar";
          if (t.indexOf("FR") !== -1) return "fr";
        }
      }
    }

    var bodyTxt = document.body ? document.body.innerText : "";
    if (bodyTxt.indexOf("Escuchar aleya") !== -1 || bodyTxt.indexOf("EXPLICACIÓN DE LA ALEYA") !== -1 || bodyTxt.indexOf("EL NOBLE CORÁN") !== -1 || bodyTxt.indexOf("¿Qué es una Sura") !== -1) return "es";
    if (bodyTxt.indexOf("Listen to verse") !== -1 || bodyTxt.indexOf("VERSE EXPLANATION") !== -1 || bodyTxt.indexOf("THE NOBLE QURAN") !== -1 || bodyTxt.indexOf("What is a Meccan") !== -1) return "en";
    if (bodyTxt.indexOf("استمع للآية") !== -1 || bodyTxt.indexOf("تفسير الآية") !== -1 || bodyTxt.indexOf("ترتيب النزول") !== -1 || bodyTxt.indexOf("ما هي السورة المكية") !== -1) return "ar";
    return "fr";
  }

  function mettreAJourMentionsTraducteurEtExegese() {
    var lang = obtenirLangueActive();
    var textesBas = {
      fr: "Traduction originale de Muhammad Hamidullah (1977) • Exégèse (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      en: "Translation by Saheeh International • Exegesis (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      es: "Traducción de Sheikh Isa García • Exégesis (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      de: "Deutsche Übersetzung von Frank Bubenheim & Nadeem Elyas • Exegese (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      it: "Traduzione italiana di Hamza Roberto Piccardo • Esegesi (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
      id: "Terjemahan Kementerian Agama RI (Kemenag) • Tafsir Al-Mukhtasar & Ibnu Katsir",
      ru: "Смысловой перевод Эльмира Кулиева • Тафсир аль-Мухтасар и Ибн Касир",
      ar: "النص القرآني بالرسم العثماني • التفسير المختصر وتفسير ابن كثير وأسباب النزول"
    };
    var textesHaut = {
      fr: "Traduction Muhammad Hamidullah (1977) & Exégèse",
      en: "Saheeh International & Exegesis",
      es: "Traducción Sheikh Isa García y Exégesis",
      de: "Übersetzung Bubenheim & Elyas & Exegese (Tafsīr)",
      it: "Traduzione Hamza Roberto Piccardo & Esegesi (Tafsīr)",
      id: "Terjemahan Kemenag RI & Tafsir Al-Mukhtasar",
      ru: "Перевод Э. Кулиева и Тафсир аль-Мухтасар",
      ar: "التفسير المختصر وتفسير ابن كثير وأسباب النزول"
    };

    var tous = document.querySelectorAll("p, div, span, small, footer");
    for (var i = 0; i < tous.length; i++) {
      var el = tous[i];
      if (el.children.length > 0) continue;
      var txt = (el.textContent || "").trim();
      if (!txt) continue;

      if (
        txt.indexOf("Traduction originale de Muhammad Hamidullah") !== -1 ||
        txt.indexOf("Translation by Saheeh International") !== -1 ||
        txt.indexOf("Traducción de Abdel Ghani Melara") !== -1 ||
        txt.indexOf("Traducción de Sheikh Isa García") !== -1 ||
        txt.indexOf("Deutsche Übersetzung von Frank Bubenheim") !== -1 ||
        txt.indexOf("Traduzione italiana di Hamza Roberto Piccardo") !== -1 ||
        txt.indexOf("Terjemahan Kementerian Agama RI") !== -1 ||
        txt.indexOf("Смысловой перевод Эльмира Кулиева") !== -1 ||
        txt.indexOf("النص القرآني بالرسم العثماني") !== -1
      ) {
        if (el.textContent !== textesBas[lang]) {
          el.textContent = textesBas[lang];
          el.style.setProperty("direction", lang === "ar" ? "rtl" : "ltr", "important");
        }
      }

      if (
        txt.indexOf("Traduction Muhammad Hamidullah") !== -1 ||
        txt.indexOf("Saheeh International & Exegesis") !== -1 ||
        txt.indexOf("Traducción Abdel Ghani Melara") !== -1 ||
        txt.indexOf("Traducción Sheikh Isa García") !== -1 ||
        txt.indexOf("Übersetzung Bubenheim & Elyas") !== -1 ||
        txt.indexOf("Traduzione Hamza Roberto Piccardo") !== -1 ||
        txt.indexOf("Terjemahan Kemenag RI") !== -1 ||
        txt.indexOf("Перевод Э. Кулиева") !== -1 ||
        txt.indexOf("التفسير المختصر وتفسير ابن كثير") !== -1
      ) {
        var parts = txt.split("•");
        if (parts.length >= 2) {
          var lieu = parts[0].trim();
          var nv = lieu + " • " + textesHaut[lang];
          if (el.textContent !== nv) el.textContent = nv;
        }
      }
    }
  }

  var DICO_MULTILINGUE = {
    fr: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn", "طه": "Tā-Hā",
      "ذلك": "Ce (C'est)", "الكتاب": "le Livre", "لا": "ne...pas / point de", "ريب": "doute", "فيه": "en lui", "هدى": "un guide", "للمتقين": "pour les pieux",
      "ختم": "a scellé", "الله": "Allāh", "على": "sur", "قلوبهم": "leurs cœurs", "وعلى": "et sur", "سمعهم": "leur ouïe", "وأبصارهم": "et sur leurs regards", "أبصارهم": "leurs regards", "غشاوة": "un voile", "غشوة": "un voile", "ولهم": "et pour eux", "عذاب": "un châtiment", "عظيم": "immense",
      "والقلم": "Par la plume", "يسطرون": "ils écrivent !", "ما": "Tu n'es pas", "أنت": "toi", "بنعمة": "par la grâce de", "ربك": "ton Seigneur", "بمجنون": "un possédé"
    },
    de: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn", "طه": "Tā-Hā",
      "ذلك": "Dieses (Das ist)", "الكتاب": "das Buch", "لا": "kein", "ريب": "Zweifel", "فيه": "darin", "هدى": "eine Rechtleitung", "للمتقين": "für die Gottesfürchtigen",
      "ختم": "Versiegelt hat", "الله": "Allāh", "على": "auf", "قلوبهم": "ihre Herzen", "وعلى": "und auf", "سمعهم": "ihr Gehör", "أبصارهم": "ihre Blicke", "غشاوة": "eine Hülle", "غشوة": "eine Hülle", "ولهم": "und für sie", "عذاب": "eine Strafe", "عظيم": "gewaltige",
      "والقلم": "Beim Schreibrohr", "يسطرون": "sie niederschreiben!"
    },
    it: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn", "طه": "Tā-Hā",
      "ذلك": "Questo (è)", "الكتاب": "il Libro", "لا": "non c'è", "ريب": "dubbio", "فيه": "in esso", "هدى": "una guida", "للمتقين": "per i timorati",
      "ختم": "Ha suggellato", "الله": "Allāh", "على": "sui", "قلوبهم": "loro cuori", "وعلى": "e sul", "سمعهم": "loro udito", "أبصارهم": "loro sguardi", "غشاوة": "un velo", "غشوة": "un velo", "ولهم": "e per loro", "عذاب": "un castigo", "عظيم": "immenso",
      "والقلم": "Per il calamo", "يسطرون": "scrivono!"
    },
    id: {
      "الم": "Alif Lām Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn", "طه": "Tā-Hā",
      "ذلك": "Kitab (ini)", "الكتاب": "Al-Kitab", "لا": "tidak ada", "ريب": "keraguan", "فيه": "padanya", "هدى": "petunjuk", "للمتقين": "bagi orang-orang bertakwa",
      "ختم": "telah mengunci", "الله": "Allah", "على": "atas", "قلوبهم": "hati mereka", "وعلى": "dan atas", "سمعهم": "pendengaran mereka", "أبصارهم": "penglihatan mereka", "غشاوة": "penutup", "غشوة": "penutup", "ولهم": "dan bagi mereka", "عذاب": "azab", "عظيم": "yang besar",
      "والقلم": "Demi pena", "وما": "dan apa yang", "يسطرون": "mereka tuliskan"
    },
    ru: {
      "الم": "Алиф, Лам, Мим", "ن": "Нун", "ق": "Каф", "ص": "Сад", "يس": "Йа Син", "طه": "Та Ха",
      "ذلك": "Это", "الكتاب": "Писание (Книга)", "لا": "нет", "ريب": "сомнения", "فيه": "в нём", "هدى": "верное руководство", "للمتقين": "для богобоязненных",
      "ختم": "Запечатал", "الله": "Аллах", "على": "на", "قلوبهم": "их сердца", "وعلى": "и на", "سمعهم": "их слух", "أبصارهم": "их взорах", "غشاوة": "пелена (завеса)", "غشوة": "пелена (завеса)", "ولهم": "и для них", "عذاب": "наказание", "عظيم": "великое",
      "والقلم": "Клянусь письменной тростью", "وما": "и тем, что", "يسطرون": "они пишут!"
    },
    es: {
      "الم": "Alif, Lām, Mīm", "ن": "Nūn", "ق": "Qāf", "ص": "Sād", "يس": "Yā-Sīn",
      "ذلك": "Ese (Este es)", "الكتاب": "el Libro", "لا": "no hay", "ريب": "duda", "فيه": "en él", "هدى": "una guía", "للمتقين": "para los piadosos",
      "ختم": "ha sellado", "الله": "Allāh (Dios)", "على": "sobre", "قلوبهم": "sus corazones", "وعلى": "y sobre", "سمعهم": "su oído", "وأبصارهم": "y sus miradas", "أبصارهم": "sus miradas (ojos)", "غشاوة": "un velo", "غشوة": "un velo", "ولهم": "y para ellos", "عذاب": "un castigo", "عظيم": "inmenso"
    }
  };

  var cacheVersetMotsExact = {};
  var requetesVersetEnCours = {};
  var sensGrilleRtl = true;

  try {
    var sauv = localStorage.getItem("cache_wbw_exact_v65") || localStorage.getItem("cache_wbw_exact_v64");
    if (sauv) cacheVersetMotsExact = JSON.parse(sauv);
  } catch (e) {}

  function normaliserArabeCle(str) {
    if (!str) return "";
    return str
      .replace(/[\\u06D6-\\u06ED\\u064B-\\u065F\\u0670\\u0640\\u0653\\u0654\\u0655]/g, "")
      .replace(/[إأآٱ]/g, "ا")
      .replace(/ؤ/g, "و")
      .replace(/ئ/g, "ي")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .replace(/\\s+/g, "")
      .trim();
  }

  function chercherDansDicoCertifie(motAr, lang) {
    var cle = normaliserArabeCle(motAr);
    if (!cle) return "";

    if (cle === "من") {
      var aKasra = motAr.indexOf("\\u0650") !== -1;
      if (lang === "fr") return aKasra ? "de / avant" : "qui (quiconque)";
      if (lang === "de") return aKasra ? "von / vor" : "wer (jemand)";
      if (lang === "it") return aKasra ? "da / prima" : "chi (colui che)";
      if (lang === "id") return aKasra ? "dari / sebelum" : "siapa (orang yang)";
      if (lang === "ru") return aKasra ? "из / от" : "кто (тот, кто)";
      if (lang === "es") return aKasra ? "de / antes" : "quien";
    }

    var dico = DICO_MULTILINGUE[lang];
    if (!dico) return "";
    for (var k in dico) {
      if (normaliserArabeCle(k) === cle) return dico[k];
    }
    return "";
  }

  function chargerVraiMotAMotVerset(vk, lang) {
    if (!vk) return;
    var cleCache = vk + "_" + lang;
    if (cacheVersetMotsExact[cleCache] || requetesVersetEnCours[cleCache]) return;
    requetesVersetEnCours[cleCache] = true;

    var urlQdc = "https://api.quran.com/api/v4/verses/by_key/" + vk + "?language=en&words=true&word_fields=text_uthmani,translation";
    fetch(urlQdc)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || !data.verse || !data.verse.words) return;
        var motsQdc = [];
        for (var i = 0; i < data.verse.words.length; i++) {
          var w = data.verse.words[i];
          if (w.char_type_name === "word") {
            var arTxt = w.text_uthmani || "";
            var trTxt = w.translation && w.translation.text ? w.translation.text : "";
            motsQdc.push({ ar: arTxt, en: trTxt, tr: trTxt });
          }
        }

        if (lang === "en" || lang === "ar") {
          cacheVersetMotsExact[cleCache] = motsQdc;
          try { localStorage.setItem("cache_wbw_exact_v65", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
          appliquerVraiMotAMotSurDOM();
          return;
        }

        var aTraduireIdx = [];
        var aTraduireTextes = [];
        for (var j = 0; j < motsQdc.length; j++) {
          var cert2 = chercherDansDicoCertifie(motsQdc[j].ar, lang);
          if (cert2) {
            motsQdc[j].tr = cert2;
          } else {
            var propreEn = motsQdc[j].en.replace(/[\\(\\)\\[\\]]/g, "").trim();
            aTraduireIdx.push(j);
            aTraduireTextes.push(propreEn || motsQdc[j].ar);
          }
        }

        if (aTraduireTextes.length === 0) {
          cacheVersetMotsExact[cleCache] = motsQdc;
          try { localStorage.setItem("cache_wbw_exact_v65", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
          appliquerVraiMotAMotSurDOM();
          return;
        }

        var sep = String.fromCharCode(10);
        var blocTexte = aTraduireTextes.join(" " + sep + " ");
        var gtxUrl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" + lang + "&dt=t&q=" + encodeURIComponent(blocTexte);
        fetch(gtxUrl)
          .then(function (r2) { return r2.json(); })
          .then(function (resGtx) {
            if (resGtx && resGtx[0]) {
              var texteCompletTraduit = "";
              for (var s = 0; s < resGtx[0].length; s++) {
                if (resGtx[0][s][0]) texteCompletTraduit += resGtx[0][s][0];
              }
              var lignes = texteCompletTraduit.split(sep);
              for (var k = 0; k < aTraduireIdx.length; k++) {
                var idxMot = aTraduireIdx[k];
                var trMot = lignes[k] ? lignes[k].trim() : "";
                if (trMot) motsQdc[idxMot].tr = trMot;
              }
            }
          })
          .catch(function () {})
          .finally(function () {
            cacheVersetMotsExact[cleCache] = motsQdc;
            try { localStorage.setItem("cache_wbw_exact_v65", JSON.stringify(cacheVersetMotsExact)); } catch (e) {}
            appliquerVraiMotAMotSurDOM();
          });
      })
      .catch(function () {})
      .finally(function () {
        requetesVersetEnCours[cleCache] = false;
      });
  }

  function obtenirCartesMotAMotVisibles() {
    var cartes = [];
    var c1 = document.querySelectorAll(".wbw-card, .wbw-word, .wbw-item");
    for (var i = 0; i < c1.length; i++) {
      var r1 = c1[i].getBoundingClientRect();
      if (r1.width > 25 && r1.height > 25) {
        c1[i].classList.add("wbw-card-unit");
        cartes.push(c1[i]);
      }
    }
    if (cartes.length > 0) return cartes;

    var tousDivs = document.querySelectorAll("div");
    var candidats = [];
    for (var d = 0; d < tousDivs.length; d++) {
      var el = tousDivs[d];
      if (
        el.children && el.children.length >= 2 && el.children.length <= 3 &&
        el.children[0].tagName === "DIV" && el.children[el.children.length - 1].tagName === "DIV" &&
        !el.querySelector("button")
      ) {
        var r = el.getBoundingClientRect();
        if (r.width >= 48 && r.width <= 280 && r.height >= 48 && r.height <= 220) {
          var txt0 = (el.children[0].textContent || "").trim();
          if (/[\\u0600-\\u06FF]/.test(txt0) && txt0.length < 40) candidats.push(el);
        }
      }
    }

    for (var c = 0; c < candidats.length; c++) {
      var cand = candidats[c];
      var estEnfant = false;
      for (var p = 0; p < candidats.length; p++) {
        if (c !== p && candidats[p].contains(cand)) { estEnfant = true; break; }
      }
      if (!estEnfant) {
        cand.classList.add("wbw-card-unit");
        cartes.push(cand);
      } else {
        cand.classList.remove("wbw-card-unit");
        cand.removeAttribute("data-word-num");
      }
    }
    return cartes;
  }

  function appliquerVraiMotAMotSurDOM() {
    var cartes = obtenirCartesMotAMotVisibles();
    var oldBanner = document.getElementById("wbwSensLectureBanner");
    if (cartes.length === 0) {
      if (oldBanner) oldBanner.style.display = "none";
      return;
    }

    var lang = obtenirLangueActive();
    var vk = obtenirCleVerset();
    var cleCache = vk + "_" + lang;

    if (!cacheVersetMotsExact[cleCache]) chargerVraiMotAMotVerset(vk, lang);
    var listeExacte = cacheVersetMotsExact[cleCache];

    for (var i = 0; i < cartes.length; i++) {
      var c = cartes[i];
      c.setAttribute("data-word-num", String(i + 1));
      if (!c.children || c.children.length < 2) continue;
      var elAr = c.children[0];
      var elTr = c.children[c.children.length - 1];
      elAr.classList.remove("wbw-card-unit");
      elAr.removeAttribute("data-word-num");

      var txtAr = (elAr.textContent || "").trim();
      var cleCarteAr = normaliserArabeCle(txtAr);
      var tradFinale = chercherDansDicoCertifie(txtAr, lang);

      if (cleCarteAr === "وما" && (lang === "fr" || lang === "de" || lang === "it" || lang === "id" || lang === "ru")) {
        var estNeg = false;
        if (i + 1 < cartes.length && cartes[i + 1].children.length) {
          var suivAr = normaliserArabeCle(cartes[i + 1].children[0].textContent || "");
          if (suivAr === "هم" || suivAr === "يخدعون" || suivAr === "يشعرون" || suivAr === "يعلمون" || suivAr === "كانوا") {
            estNeg = true;
          }
        }
        if (lang === "de") tradFinale = estNeg ? "und sie (sind) nicht" : "und was";
        else if (lang === "it") tradFinale = estNeg ? "ed essi non (sono)" : "e ciò che";
        else if (lang === "id") tradFinale = estNeg ? "padahal mereka bukanlah" : "dan apa yang";
        else if (lang === "ru") tradFinale = estNeg ? "но они не" : "и тем, что";
        else tradFinale = estNeg ? "et ils ne" : "et ce qu'";
      }

      if (!tradFinale && listeExacte && listeExacte.length > 0) {
        if (listeExacte[i] && normaliserArabeCle(listeExacte[i].ar) === cleCarteAr) {
          tradFinale = listeExacte[i].tr;
        } else {
          for (var m = 0; m < listeExacte.length; m++) {
            if (normaliserArabeCle(listeExacte[m].ar) === cleCarteAr) {
              tradFinale = listeExacte[m].tr;
              break;
            }
          }
          if (!tradFinale && listeExacte[i]) tradFinale = listeExacte[i].tr;
        }
      }

      if (tradFinale && elTr.textContent !== tradFinale) elTr.textContent = tradFinale;
    }

    var grilleParente = cartes[0].parentElement;
    if (grilleParente) {
      grilleParente.style.setProperty("direction", sensGrilleRtl ? "rtl" : "ltr", "important");
      var totalW = cartes.length;
      var textesRtl = {
        fr: "⬅️ Sens de lecture : de droite à gauche (1 ➔ " + totalW + ") • Cliquer pour inverser",
        en: "⬅️ Reading order: Right to Left (1 ➔ " + totalW + ") • Click to reverse",
        es: "⬅️ Orden de lectura: de derecha a izquierda (1 ➔ " + totalW + ") • Clic para invertir",
        de: "⬅️ Leserichtung: von rechts nach links (1 ➔ " + totalW + ") • Klicken zum Umkehren",
        it: "⬅️ Ordine di lettura: da destra a sinistra (1 ➔ " + totalW + ") • Clicca per invertire",
        id: "⬅️ Arah baca: dari kanan ke kiri (1 ➔ " + totalW + ") • Klik untuk membalik",
        ru: "⬅️ Порядок чтения: справа налево (1 ➔ " + totalW + ") • Нажмите, чтобы изменить",
        ar: "⬅️ ترتيب القراءة: من اليمين إلى اليسار (1 ➔ " + totalW + ")"
      };
      var textesLtr = {
        fr: "➡️ Sens de lecture : de gauche à droite (1 ➔ " + totalW + ") • Cliquer pour inverser",
        en: "➡️ Reading order: Left to Right (1 ➔ " + totalW + ") • Click to reverse",
        es: "➡️ Orden de lectura: de izquierda a derecha (1 ➔ " + totalW + ") • Clic para invertir",
        de: "➡️ Leserichtung: von links nach rechts (1 ➔ " + totalW + ") • Klicken zum Umkehren",
        it: "➡️ Ordine di lettura: da sinistra a destra (1 ➔ " + totalW + ") • Clicca per invertire",
        id: "➡️ Arah baca: dari kiri ke kanan (1 ➔ " + totalW + ") • Klik untuk membalik",
        ru: "➡️ Порядок чтения: слева направо (1 ➔ " + totalW + ") • Нажмите, чтобы изменить",
        ar: "➡️ ترتيب القراءة: من اليسار إلى اليمين (1 ➔ " + totalW + ")"
      };
      var fleche = sensGrilleRtl ? (textesRtl[lang] || textesRtl.fr) : (textesLtr[lang] || textesLtr.fr);
      if (!oldBanner) {
        oldBanner = document.createElement("div");
        oldBanner.id = "wbwSensLectureBanner";
        oldBanner.addEventListener("click", function () {
          sensGrilleRtl = !sensGrilleRtl;
          appliquerVraiMotAMotSurDOM();
        });
        grilleParente.parentElement.insertBefore(oldBanner, grilleParente);
      }
      oldBanner.style.display = "block";
      if (oldBanner.textContent !== fleche) oldBanner.textContent = fleche;
    }
  }

  function masquerTraductionBasSiMotAMot() {
    var cartes = obtenirCartesMotAMotVisibles();
    if (cartes.length < 2) {
      var caches = document.querySelectorAll(".wbw-masquer-traduction-bas");
      for (var c = 0; c < caches.length; c++) caches[c].classList.remove("wbw-masquer-traduction-bas");
      return;
    }
    var premiereCarte = cartes[0];
    var grilleParente = premiereCarte.parentElement;
    var boiteVerset = grilleParente ? grilleParente.parentElement : null;
    if (!boiteVerset) return;

    var rectDerniereCarte = cartes[cartes.length - 1].getBoundingClientRect();
    var candidats = boiteVerset.querySelectorAll("p, div, h1, h2, h3, h4, span");
    for (var i = 0; i < candidats.length; i++) {
      var el = candidats[i];
      if (el.id === "wbwSensLectureBanner" || el === grilleParente || el.contains(premiereCarte) || grilleParente.contains(el)) continue;
      if (el.querySelector("button") || el.tagName === "BUTTON") continue;
      var txt = (el.textContent || "").trim();
      if (!txt || /[\\u0600-\\u06FF]/.test(txt)) continue;
      var r = el.getBoundingClientRect();
      if (r.top >= rectDerniereCarte.top + 10 || /^\\d+\\s*[\\.-]/.test(txt)) {
        if (txt.indexOf("TAFSĪR") === -1 && txt.indexOf("ТАФСИР") === -1 && txt.indexOf("ERKLÄRUNG") === -1 && txt.indexOf("SPIEGAZIONE") === -1 && txt.indexOf("PENJELASAN") === -1 && txt.indexOf("EXPLICATION") === -1 && txt.indexOf("Ghunnah") === -1) {
          el.classList.add("wbw-masquer-traduction-bas");
        }
      }
    }
  }

  var wbwScale = 1.0;
  function appliquerZoomMotAMot() {
    var root = document.documentElement;
    var arRem = (2.15 * wbwScale).toFixed(2) + "rem";
    var trRem = (0.92 * Math.pow(wbwScale, 0.82)).toFixed(2) + "rem";
    var padV = Math.round(14 * Math.pow(wbwScale, 0.75)) + "px";
    var padH = Math.round(18 * Math.pow(wbwScale, 0.78)) + "px";
    var minW = Math.round(92 * wbwScale) + "px";
    root.style.setProperty("--wbw-ar-size", arRem);
    root.style.setProperty("--wbw-tr-size", trRem);
    root.style.setProperty("--wbw-pad-v", padV);
    root.style.setProperty("--wbw-pad-h", padH);
    root.style.setProperty("--wbw-min-w", minW);
  }

  var MAP_NOMS_VERS_QDC = {
    dosari: [174, 168], dossari: [174, 168], yasser: [174, 168],
    afasy: [7], alafasy: [7], mishary: [7],
    sudais: [3], soudais: [3],
    shuraim: [10, 4], shuraym: [10, 4],
    hussary: [6], husary: [6],
    abdulbaset: [2, 1], abdulbasit: [2, 1],
    minshawi: [9]
  };

  var cacheTimingVerset = {};
  var requetesEnCours = {};
  window.__lecteurAudioActuel = null;
  var rafId = null;
  var energiesMots = [];
  var bleusMots = [];
  var dernierVersetSuivi = "";

  function obtenirCleRecitateurSelectionne() {
    var selects = document.querySelectorAll("select");
    for (var i = 0; i < selects.length; i++) {
      var s = selects[i];
      if (s.classList.contains("khatm-reciter-select")) continue;
      if (s.options && s.selectedIndex >= 0) {
        var txt = ((s.value || "") + " " + (s.options[s.selectedIndex].textContent || "")).toLowerCase();
        if (txt.indexOf("verset") === -1 && txt.indexOf("verse") === -1 && txt.indexOf("aleya") === -1 && txt.indexOf("vers ") === -1 && txt.indexOf("ayat") === -1 && txt.indexOf("аят") === -1) {
          for (var k in MAP_NOMS_VERS_QDC) {
            if (txt.indexOf(k) !== -1) return k;
          }
        }
      }
    }
    return "dosari";
  }

  function chargerTimestampsQdc(cleRec, vk) {
    if (!cleRec || !vk) return;
    var chap = vk.split(":")[0];
    var cleChap = cleRec + "_chap_" + chap;
    if (requetesEnCours[cleChap]) return;
    requetesEnCours[cleChap] = true;

    var idPrincipal = (MAP_NOMS_VERS_QDC[cleRec] || [174])[0];
    fetch("https://api.qurancdn.com/api/qdc/audio/reciters/" + idPrincipal + "/audio_files?chapter=" + chap + "&segments=true")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.audio_files && data.audio_files[0] && data.audio_files[0].verse_timings) {
          var vts = data.audio_files[0].verse_timings;
          for (var i = 0; i < vts.length; i++) {
            var vt = vts[i];
            if (vt.verse_key && vt.segments && vt.segments.length > 0) {
              var valides = [], minMs = Infinity, maxMs = -Infinity;
              for (var j = 0; j < vt.segments.length; j++) {
                var s = vt.segments[j];
                if (s && s.length >= 3 && s[0] != null && s[1] != null && s[2] != null) {
                  var wIdx = Number(s[0]) - 1, t1 = Number(s[1]), t2 = Number(s[2]);
                  if (!isNaN(wIdx) && !isNaN(t1) && !isNaN(t2) && t2 >= t1) {
                    if (t1 < minMs) minMs = t1;
                    if (t2 > maxMs) maxMs = t2;
                    valides.push({ wordIndex: wIdx, t1: t1, t2: t2 });
                  }
                }
              }
              if (valides.length > 0 && maxMs > minMs) {
                var span = maxMs - minMs;
                cacheTimingVerset[cleRec + "_" + vt.verse_key] = valides.map(function (v) {
                  return { wordIndex: v.wordIndex, rStart: (v.t1 - minMs) / span, rEnd: (v.t2 - minMs) / span };
                });
              }
            }
          }
        }
      })
      .catch(function () {});
  }

  function obtenirElementsMotsAAnimer() {
    var cartes = obtenirCartesMotAMotVisibles();
    if (cartes.length >= 2) return { type: "cartes", items: cartes };

    var conteneur = document.querySelector("#arabicVerse, .arabic-glow-verse");
    if (!conteneur) return { type: "spans", items: [] };
    conteneur.setAttribute("dir", "rtl");

    var spansExistants = conteneur.querySelectorAll("span");
    var aSigneIsole = false;
    for (var s = 0; s < spansExistants.length; s++) {
      var stxt = (spansExistants[s].textContent || "").replace(/[\\u06D6-\\u06ED\\u064B-\\u065F\\u0670\\u06DD\\u06DE\\u06E9\\s]/g, "");
      if (stxt.length === 0) {
        aSigneIsole = true;
        break;
      }
    }
    if (spansExistants.length > 1 && !aSigneIsole) {
      return { type: "spans", items: spansExistants };
    }

    var texte = (conteneur.textContent || "").trim();
    if (!texte) return { type: "spans", items: [] };
    var bruts = texte.split(/\\s+/).filter(Boolean);
    var motsPropres = [];
    for (var i = 0; i < bruts.length; i++) {
      var w = bruts[i];
      var sansMarques = w.replace(/[\\u06D6-\\u06ED\\u064B-\\u065F\\u0670\\u06DD\\u06DE\\u06E9]/g, "");
      if (sansMarques.length === 0 && motsPropres.length > 0) {
        motsPropres[motsPropres.length - 1] += " " + w;
      } else {
        motsPropres.push(w);
      }
    }
    if (motsPropres.length <= 1) return { type: "spans", items: spansExistants };
    conteneur.innerHTML = motsPropres.map(function (m, idx) {
      return '<span class="ar-word-follow" data-widx="' + idx + '">' + m + "</span>";
    }).join(" ");
    return { type: "spans", items: conteneur.querySelectorAll("span") };
  }

  function reinitialiserMotsEnBlancTamise() {
    energiesMots = [];
    bleusMots = [];
    var cibleObj = obtenirElementsMotsAAnimer();
    var items = cibleObj.items;
    var estCartes = cibleObj.type === "cartes";
    for (var i = 0; i < items.length; i++) {
      var el = items[i];
      el.style.setProperty("transform", "translate3d(0, 0px, 0) scale(1)", "important");
      el.style.setProperty("filter", "none", "important");
      if (estCartes) {
        el.style.setProperty("opacity", "0.82", "important");
        el.style.setProperty("border-color", "rgba(255, 255, 255, 0.15)", "important");
        el.style.setProperty("box-shadow", "none", "important");
      } else {
        el.style.setProperty("opacity", "0.78", "important");
        el.style.setProperty("color", "rgba(255, 255, 255, 0.78)", "important");
        el.style.setProperty("text-shadow", "0 0 8px rgba(255, 255, 255, 0.14)", "important");
      }
    }
  }

  function lancerBoucleSuivi() {
    if (!rafId) {
      rafId = requestAnimationFrame(etapeSuiviAudioAfterEffects);
    }
  }

  if (typeof HTMLMediaElement !== "undefined" && HTMLMediaElement.prototype && !HTMLMediaElement.prototype.__hookedV77) {
    var origPlay = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      var self = this;
      window.__lecteurAudioActuel = self;
      if (self.currentTime < 0.25) {
        reinitialiserMotsEnBlancTamise();
      }
      if (!self.__listenersV77) {
        self.__listenersV77 = true;
        self.addEventListener("playing", lancerBoucleSuivi);
        self.addEventListener("timeupdate", lancerBoucleSuivi);
      }
      var cleRec = obtenirCleRecitateurSelectionne();
      var vk = obtenirCleVerset();
      if (cleRec && vk) chargerTimestampsQdc(cleRec, vk);
      lancerBoucleSuivi();
      return origPlay.apply(self, arguments);
    };
    HTMLMediaElement.prototype.__hookedV77 = true;
  }

  function trouverAudioActif() {
    if (window.__lecteurAudioActuel && !window.__lecteurAudioActuel.paused && !window.__lecteurAudioActuel.ended) {
      return window.__lecteurAudioActuel;
    }
    var audios = document.querySelectorAll("audio");
    for (var i = 0; i < audios.length; i++) {
      if (!audios[i].paused && !audios[i].ended) return audios[i];
    }
    return null;
  }

  function courbeAfterEffects(x) {
    var t = Math.max(0, Math.min(1, x));
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function etapeSuiviAudioAfterEffects() {
    var vkActuel = obtenirCleVerset();
    if (vkActuel && vkActuel !== dernierVersetSuivi) {
      dernierVersetSuivi = vkActuel;
      energiesMots = [];
      bleusMots = [];
    }

    var cibleObj = obtenirElementsMotsAAnimer();
    var items = cibleObj.items;
    var estCartes = cibleObj.type === "cartes";
    var aud = trouverAudioActif();
    var activeIndexFloat = -1;

    if (items && items.length && suiviEstActif) {
      if (energiesMots.length !== items.length) {
        energiesMots = new Array(items.length).fill(0);
        bleusMots = new Array(items.length).fill(0);
      }

      for (var i = 0; i < items.length; i++) {
        if (items[i].classList.contains("active") || items[i].classList.contains("speaking") || items[i].classList.contains("current")) {
          activeIndexFloat = i;
          break;
        }
      }

      if (activeIndexFloat === -1 && aud && aud.duration > 0.2 && aud.currentTime > 0.02) {
        var cleRec = obtenirCleRecitateurSelectionne();
        var vk = obtenirCleVerset();
        var t = aud.currentTime;
        var d = aud.duration;
        var debutVoix = Math.min(0.18, d * 0.04);
        var finVoix = Math.max(debutVoix + 0.25, d - Math.min(0.35, d * 0.07));
        var ratioVoix = Math.max(0, Math.min(0.999, (t - debutVoix) / (finVoix - debutVoix)));

        var segsNorm = cacheTimingVerset[cleRec + "_" + vk];
        if (segsNorm && segsNorm.length > 0) {
          for (var s = 0; s < segsNorm.length; s++) {
            var sg = segsNorm[s];
            if (ratioVoix >= sg.rStart && ratioVoix <= sg.rEnd) {
              var progInterne = sg.rEnd > sg.rStart ? (ratioVoix - sg.rStart) / (sg.rEnd - sg.rStart) : 0.5;
              activeIndexFloat = sg.wordIndex + progInterne * 0.35;
              break;
            }
          }
        }
        if (activeIndexFloat === -1) {
          activeIndexFloat = ratioVoix * items.length;
        }
      } else if (aud && aud.ended) {
        activeIndexFloat = items.length;
      }

      var idxEntier = Math.floor(activeIndexFloat);
      var lectureEnCours = activeIndexFloat >= 0;

      for (var m = 0; m < items.length; m++) {
        var el = items[m];

        var cibleElevation = lectureEnCours && m === idxEntier ? 1.0 : 0.0;
        energiesMots[m] += (cibleElevation - energiesMots[m]) * 0.22;
        if (energiesMots[m] < 0.002) energiesMots[m] = 0;
        if (energiesMots[m] > 0.998) energiesMots[m] = 1;

        var cibleBleu = lectureEnCours && m <= idxEntier ? 1.0 : bleusMots[m];
        bleusMots[m] += (cibleBleu - bleusMots[m]) * 0.18;
        if (bleusMots[m] < 0.002) bleusMots[m] = 0;
        if (bleusMots[m] > 0.998) bleusMots[m] = 1;

        var e = courbeAfterEffects(energiesMots[m]);
        var b = courbeAfterEffects(bleusMots[m]);

        var yPx = (-7.5 * e).toFixed(2);
        var sc = (1.0 + 0.12 * e).toFixed(3);

        if (estCartes) {
          var opCarte = (0.82 + 0.18 * b).toFixed(2);
          el.style.setProperty("opacity", opCarte, "important");
          el.style.setProperty("transform", "translate3d(0, " + yPx + "px, 0) scale(" + (1.0 + 0.08 * e).toFixed(3) + ")", "important");
          if (b > 0.02) {
            el.style.setProperty("border-color", "rgba(56, 189, 248, " + (0.45 * b + 0.55 * e).toFixed(2) + ")", "important");
            el.style.setProperty("box-shadow", "0 " + (6 * b + 6 * e).toFixed(1) + "px " + (18 * b + 14 * e).toFixed(1) + "px rgba(56, 189, 248, " + (0.35 * b + 0.35 * e).toFixed(2) + "), inset 0 0 " + (12 * b).toFixed(1) + "px rgba(56, 189, 248, " + (0.18 * b).toFixed(2) + ")", "important");
          } else {
            el.style.setProperty("border-color", "rgba(255, 255, 255, 0.15)", "important");
            el.style.setProperty("box-shadow", "none", "important");
          }
        } else {
          el.style.setProperty("background", "transparent", "important");
          el.style.setProperty("border", "none", "important");
          el.style.setProperty("filter", "none", "important");
          el.style.setProperty("transform", "translate3d(0, " + yPx + "px, 0) scale(" + sc + ")", "important");

          if (b < 0.03) {
            el.style.setProperty("opacity", "0.78", "important");
            el.style.setProperty("color", "rgba(255, 255, 255, 0.78)", "important");
            el.style.setProperty("text-shadow", "0 0 8px rgba(255, 255, 255, 0.14)", "important");
          } else {
            var opMot = (0.78 + 0.22 * b).toFixed(2);
            el.style.setProperty("opacity", opMot, "important");
            el.style.setProperty("color", "#ffffff", "important");
            var alphaBleu1 = (0.88 * b + 0.12 * e).toFixed(2);
            var alphaBleu2 = (0.68 * b + 0.32 * e).toFixed(2);
            var rayon1 = (15 + 9 * e).toFixed(1);
            var rayon2 = (30 + 18 * e).toFixed(1);
            el.style.setProperty(
              "text-shadow",
              "0 0 10px rgba(255, 255, 255, 0.98), 0 0 " + rayon1 + "px rgba(56, 189, 248, " + alphaBleu1 + "), 0 0 " + rayon2 + "px rgba(14, 165, 233, " + alphaBleu2 + ")",
              "important"
            );
          }
        }
      }
    }

    var animEnCours = false;
    for (var z = 0; z < energiesMots.length; z++) {
      if (energiesMots[z] > 0.005 || (bleusMots[z] > 0.005 && bleusMots[z] < 0.995)) {
        animEnCours = true;
        break;
      }
    }

    if ((aud && !aud.paused) || animEnCours) {
      rafId = requestAnimationFrame(etapeSuiviAudioAfterEffects);
    } else {
      rafId = null;
    }
  }

  var enCoursDeSync = false;
  function synchroniserTout() {
    if (enCoursDeSync) return;
    enCoursDeSync = true;
    try {
      verifierSautDirectVersetKhatm();
      synchroniserPositionKhatmAutomatique();
      assurerBoutonsLanguesEtendues();
      assurerBoutonSuiviVisible();
      reparerSoleilEtLuneEnOrbite();
      retirerRecitateurMaher();
      if (langExtActive && LANGUES_EXT_SUPPORTEES[langExtActive]) appliquerInterfaceEtContenuExt();
      corrigerCoquillesNativesEtTafsir();
      mettreAJourMentionsTraducteurEtExegese();
      afficherOuMettreAJourPlanificateurKhatm();
      masquerTraductionBasSiMotAMot();
      appliquerVraiMotAMotSurDOM();
      appliquerZoomMotAMot();
      synchroniserUrlEtSeoAvecLangueEtVerset();
      var cleRec = obtenirCleRecitateurSelectionne();
      var vk = obtenirCleVerset();
      if (cleRec && vk) chargerTimestampsQdc(cleRec, vk);
      if (vk) chargerVraiMotAMotVerset(vk, obtenirLangueActive());
    } finally {
      enCoursDeSync = false;
    }
  }

  window.addEventListener("DOMContentLoaded", function () {
    synchroniserTout();
    reinitialiserMotsEnBlancTamise();
  });

  document.addEventListener("click", function (e) {
    var btnKhatmAct = e.target.closest("[data-khatm-act]");
    if (btnKhatmAct) {
      var act = btnKhatmAct.getAttribute("data-khatm-act");
      var ord = etatKhatm.order;
      if (act === "resume") {
        var vkCurr = obtenirCleVerset();
        var tS = Number(btnKhatmAct.getAttribute("data-target-s"));
        var tV = Number(btnKhatmAct.getAttribute("data-target-v"));
        if (vkCurr && Number(vkCurr.split(":")[0]) === tS && tV) {
          e.preventDefault();
          allerAuVersetSurMemePage(tV);
          setTimeout(synchroniserTout, 20);
          return;
        }
      } else if (act === "step-day") {
        var vJour = obtenirVersetsParJour(etatKhatm.months);
        etatKhatm.idxByOrder[ord] = Math.min(TOTAL_VERSETS_CORAN, (etatKhatm.idxByOrder[ord] || 0) + vJour);
        sauvegarderEtatKhatm();
        afficherOuMettreAJourPlanificateurKhatm();
        return;
      } else if (act === "save-here") {
        var vkHere = obtenirCleVerset();
        if (vkHere) {
          var ph = vkHere.split(":");
          etatKhatm.idxByOrder[ord] = convertirSourateVersetVersIndexGlobal(ord, Number(ph[0]), Number(ph[1]));
          sauvegarderEtatKhatm();
          afficherOuMettreAJourPlanificateurKhatm();
        }
        return;
      } else if (act === "reset") {
        etatKhatm.idxByOrder[ord] = 0;
        sauvegarderEtatKhatm();
        afficherOuMettreAJourPlanificateurKhatm();
        return;
      }
    }

    var btn = e.target.closest("button, .btn, span, a, div");
    if (btn) {
      var t = (btn.textContent || "").trim();
      if (t === "A+" || t === "A +") {
        wbwScale = Math.min(2.5, +(wbwScale + 0.16).toFixed(2));
      } else if (t === "A-" || t === "A -" || t === "A−") {
        wbwScale = Math.max(0.68, +(wbwScale - 0.16).toFixed(2));
      } else if (t.indexOf("Rejouer") !== -1 || t.indexOf("Replay") !== -1 || t.indexOf("Repetir") !== -1 || t.indexOf("Wiederholen") !== -1 || t.indexOf("Riascolta") !== -1 || t.indexOf("Ulangi") !== -1 || t.indexOf("Повторить") !== -1) {
        reinitialiserMotsEnBlancTamise();
      } else if (t.indexOf("Suivi") !== -1 || t.indexOf("Follow") !== -1 || t.indexOf("Seguimiento") !== -1 || t.indexOf("Verfolgung") !== -1 || t.indexOf("Seguito") !== -1 || t.indexOf("Ikuti") !== -1 || t.indexOf("Слежение") !== -1 || t.indexOf("تتبع") !== -1) {
        suiviEstActif = !suiviEstActif;
        lancerBoucleSuivi();
      } else if (t.indexOf("Suivant") !== -1 || t.indexOf("Next") !== -1 || t.indexOf("Siguiente") !== -1 || t.indexOf("Weiter") !== -1 || t.indexOf("Successivo") !== -1 || t.indexOf("Berikutnya") !== -1 || t.indexOf("Далее") !== -1) {
        var vkNow = obtenirCleVerset();
        if (vkNow) {
          var pNow = vkNow.split(":");
          var sNow = Number(pNow[0]);
          var vNow = Number(pNow[1]);
          if (sNow && vNow && vNow >= NB_VERSETS_PAR_SOURATE[sNow]) {
            var sNext = obtenirSourateSuivanteSelonOrdre(etatKhatm.order, sNow);
            var langCurr = obtenirLangueActive();
            var sfxL = langCurr !== "fr" ? ("&lang=" + langCurr) : "";
            if (sNext) {
              etatKhatm.idxByOrder[etatKhatm.order] = convertirSourateVersetVersIndexGlobal(etatKhatm.order, sNext, 1);
              sauvegarderEtatKhatm();
              window.location.href = "sourate-" + sNext + "-verset-1.html?khatm_verse=1" + sfxL;
              return;
            }
          }
        }
      }
    }
    setTimeout(synchroniserTout, 15);
    setTimeout(synchroniserTout, 80);
  });

  setInterval(function () {
    synchroniserTout();
    var aud = trouverAudioActif();
    if (aud && !aud.paused && !rafId) {
      lancerBoucleSuivi();
    }
  }, 300);

  synchroniserTout();
})();</script>
</head>
<body>
  <div class="cosmos-exterior-wrapper"><div id="dynamicSkyLighting"></div><canvas id="fullPageSkyCanvas"></canvas><div class="flat-earth-sun" id="flatEarthSun"><div class="sun-core"></div></div><div class="flat-earth-moon" id="flatEarthMoon"><div class="moon-white-core"></div></div></div>
  <div class="wrapper interface-layer">
    <header class="hero">
      <div class="hero-top-lang-bar">
        <div class="lang-switcher-group">
          <button type="button" class="lang-pill-btn" data-lang="fr" onclick="changerLangueAccueil('fr')">🇫🇷 FR</button>
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
      <button class="sort-btn active" id="sortBtn2" onclick="trier('chrono', this)">1. Ordre de Révélation (1 à 114)</button>
      <button class="sort-btn" id="sortBtn1" onclick="trier('classique', this)">2. Ordre classique (1 à 114)</button>
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
    let modeTri = 'chrono', currentLang = 'fr', lastReadData = null;
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

      document.getElementById('sortBtn1').textContent = isAr ? "2. ترتيب المصحف (1 إلى 114)" : (isEn ? "2. Traditional Order (1 to 114)" : (isEs ? "2. Orden tradicional (1 a 114)" : "2. Ordre classique (1 à 114)"));
      document.getElementById('sortBtn2').textContent = isAr ? "1. ترتيب النزول (1 إلى 114)" : (isEn ? "1. Revelation Order (1 to 114)" : (isEs ? "1. Orden de Revelación (1 a 114)" : "1. Ordre de Révélation (1 à 114)"));
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
        legWrap.style.display = (modeTri !== 'miracles' && !q) ? 'block' : 'none';
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
  console.log('✅ SITE + SEO 8 langues (FR, EN, ES, AR, DE, IT, ID, RU) + SITEMAP.XML + MENTIONS LÉGALES & APP TRADUITS GÉNÉRÉS !');
  console.log('================================================================================');
}

lancerGeneration();

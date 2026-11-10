const fs = require('fs');
const path = require('path');

const fichier = path.join(__dirname, 'generateur.js');
let code = fs.readFileSync(fichier, 'utf8');

// ============================================================================
// 1. CORRECTION DE LA TRADUCTION DES MENTIONS LÉGALES EN 4 LANGUES (FR/EN/ES/AR)
// ============================================================================
const ancienModalLegal = `<div class="app-modal-overlay" id="legalModal" onclick="if(event.target===this)this.classList.remove('open')">
    <div class="app-modal-card" style="text-align:center;">
      <h3>⚖️ Mentions légales</h3>
      <p>Portail éducatif, linguistique et culturel gratuit (sans publicité commerciale) édité par l'Association Loi 1901 à but non lucratif :</p>
      <p style="color:#7dd3fc; font-weight:800; font-size:0.98rem;">« Institut Numérique Coran, Langues &amp; Tafsīr »</p>
      <button type="button" class="app-modal-close" onclick="document.getElementById('legalModal').classList.remove('open')">Fermer</button>
    </div>
  </div>`;

const nouveauModalLegal = `<div class="app-modal-overlay" id="legalModal" onclick="if(event.target===this)this.classList.remove('open')">
    <div class="app-modal-card" style="text-align:center;">
      <h3 id="legalModalTitleEl">⚖️ Mentions légales</h3>
      <p id="legalModalDescEl">Portail éducatif, linguistique et culturel gratuit (sans publicité commerciale) édité par l'Association Loi 1901 à but non lucratif :</p>
      <p style="color:#7dd3fc; font-weight:800; font-size:0.98rem;">« Institut Numérique Coran, Langues &amp; Tafsīr »</p>
      <button type="button" class="app-modal-close" id="legalModalCloseEl" onclick="document.getElementById('legalModal').classList.remove('open')">Fermer</button>
    </div>
  </div>`;

code = code.replace(ancienModalLegal, nouveauModalLegal);

const cibleLangueAccueil = `document.getElementById('searchInput').placeholder = isAr`;
const ajoutTraductionLegal = `const legBtn = document.getElementById('legalBtnEl');
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

      document.getElementById('searchInput').placeholder = isAr`;

if (!code.includes('legalModalTitleEl')) {
  code = code.replace(cibleLangueAccueil, ajoutTraductionLegal);
}

// ============================================================================
// 2. DOSSIERS COMPLETS DES 5 AUTRES MIRACLES EN 4 LANGUES
// ============================================================================
const MIRACLES_ENRICHIS = {
  "10:92": {
    titre: "Miracle Historique — La sauvegarde du corps de Pharaon (« Nunajjīka bi-badanika ») comme signe pour les générations futures",
    titreEn: "Historical Miracle — Preservation of Pharaoh's Body ('Nunajjīka bi-badanika') as a Sign for Future Generations",
    titreEs: "Milagro Histórico — La preservación del cuerpo del Faraón (« Nunajjīka bi-badanika ») como señal para la posteridad",
    titreAr: "الإعجاز التاريخي — نجاة بدن فرعون ﴿فَالْيَوْمَ نُنَجِّيكَ بِبَدَنِكَ لِتَكُونَ لِمَنْ خَلْفَكَ آيَةً﴾",
    resume: "« Aujourd'hui, Nous sauvons ton corps afin que tu sois un signe pour ceux qui viendront après toi. » Alors que toute l'armée égyptienne fut engloutie au fond de la mer et que le sort des dépouilles royales était inconnu au VIIe siècle, le Coran affirme que le corps physique de Pharaon a été épargné de la destruction pour demeurer un témoin visible à travers les siècles.",
    resumeEn: "'Today We will preserve your body so that you may be a sign for those who come after you.' While the entire Egyptian army was swallowed by the sea and the fate of royal bodies was unknown in the 7th century, the Quran states that Pharaoh's physical body was spared destruction to remain a visible sign across the ages.",
    resumeEs: "« Hoy salvaremos tu cuerpo para que seas una señal para quienes vengan después de ti. » Mientras todo el ejército egipcio fue tragado por el mar, el Corán afirma que el cuerpo físico del Faraón fue preservado de la destrucción para permanecer como señal visible a través de los siglos.",
    resumeAr: "﴿فَالْيَوْمَ نُنَجِّيكَ بِبَدَنِكَ لِتَكُونَ لِمَنْ خَلْفَكَ آيَةً﴾ بينما غرق جيش فرعون بالكامل، أخبر القرآن الكريم أن جسد فرعون وحده سيسلم من الفناء ليبقى آيةً مشاهَدةً للأجيال اللاحقة.",
    developpement: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PREUVE N°1 • PRÉCISION DU TERME CORANIQUE « BADAN »</div>
          <h4>🌊 « Nunajjīka bi-badanika » : La sauvegarde du corps sans l'âme</h4>
          <p>En langue arabe, le mot <strong>« Badan » (بَدَن)</strong> désigne spécifiquement le corps physique dépouillé de vie (ainsi que la cotte de mailles). Alors que la Bible mentionne uniquement que Pharaon et son armée furent engloutis dans la mer (<em>Exode 14:28</em>), le Coran apporte une révélation singulière : <strong>le corps physique de Pharaon ne disparaîtra pas dans les abysses</strong>, mais sera préservé comme un signe matériel pour les générations futures (<em>« li-takūna li-man khalfaka āyah »</em>).</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PREUVE N°2 • LE RÉCIT HISTORIQUE D'IBN ‘ABBĀS DANS LES TAFSĪRS</div>
          <h4>📜 Le corps rejeté sur le rivage pour lever tout doute</h4>
          <p>Les imams <strong>At-Tabarī (Tafsīr 15/193)</strong> et <strong>Ibn Kathīr</strong> rapportent d'après le compagnon <strong>‘Abdullāh ibn ‘Abbās</strong> que certains parmi les Enfants d'Israël doutaient de la mort réelle de Pharaon tant sa tyrannie les avait terrifiés. Allāh ordonna alors à la mer de rejeter sa dépouille intacte, revêtue de sa cuirasse connue, sur une élévation du littoral (<em>Najwah</em>) afin que tous constatent sa mort de leurs propres yeux avant que son corps ne soit recueilli et embaumé selon les rites royaux égyptiens.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PREUVE N°3 • DÉCOUVERTE DES MOMIES ROYALES DU NOUVEL EMPIRE (1881–1898)</div>
          <h4>🏛️ De la Vallée des Rois au Musée du Caire</h4>
          <p>Au VIIe siècle en Arabie, personne ne savait que les corps des pharaons du Nouvel Empire (époque de Moïse / Mūsā) avaient survécu : leurs tombes étaient enfouies sous les roches de Thèbes depuis près de deux millénaires. Ce n'est qu'à la fin du XIXe siècle (en <strong>1881</strong> dans la cachette royale de Deir el-Bahari, puis en <strong>1898</strong> par Victor Loret dans la tombe KV35) que les momies des pharaons de l'époque de l'Exode — notamment <strong>Ramsès II</strong> et son fils <strong>Merneptah</strong> — furent exhumées et exposées aux yeux du monde entier au Caire, accomplissant littéralement la parole divine : <em>« afin que tu sois un signe pour ceux qui viendront après toi »</em>.</p>
        </div>
      </div>
      <div class="historians-proof-section">
        <div class="historians-header">🔗 SOURCES EXÉGÉTIQUES & ARCHÉOLOGIQUES VÉRIFIABLES</div>
        <div class="proof-links-bar">
          <a href="https://fr.wikipedia.org/wiki/Momie_de_Rams%C3%A8s_II" target="_blank" rel="noopener" class="proof-link-pill">🏛️ Momie royale de Ramsès II</a>
          <a href="https://fr.wikipedia.org/wiki/Merneptah" target="_blank" rel="noopener" class="proof-link-pill">👑 Momie de Merneptah (KV35, 1898)</a>
          <a href="https://fr.wikipedia.org/wiki/Mus%C3%A9e_national_de_la_civilisation_%C3%A9gyptienne" target="_blank" rel="noopener" class="proof-link-pill">🏺 Musée National du Caire (NMEC)</a>
        </div>
      </div>`,
    developpementEn: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PROOF #1 • PRECISION OF THE ARABIC TERM 'BADAN'</div>
          <h4>🌊 'Nunajjīka bi-badanika': Saving the Lifeless Physical Body</h4>
          <p>While the biblical account only mentions that Pharaoh's army drowned in the sea (<em>Exodus 14:28</em>), the Quran reveals a unique historical detail: Pharaoh's physical body (<strong>'Badan'</strong>) would not be lost in the depths, but preserved as a visible sign for future generations (<em>'li-takūna li-man khalfaka āyah'</em>).</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PROOF #2 • THE ACCOUNT OF IBN ‘ABBĀS IN CLASSICAL TAFSĪR</div>
          <h4>📜 Cast Upon the Raised Shore Before Royal Embalming</h4>
          <p>Imam <strong>At-Tabarī (15/193)</strong> and <strong>Ibn Kathīr</strong> record from <strong>Ibn ‘Abbās</strong> that some among the Children of Israel doubted Pharaoh had truly died. Allāh commanded the sea to cast his intact body onto a raised bank (<em>Najwah</em>) so all could witness his death before his body was recovered and mummified.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PROOF #3 • REDISCOVERY OF THE NEW KINGDOM ROYAL MUMMIES (1881–1898)</div>
          <h4>🏛️ Hidden for Millennia, Now Displayed in Cairo</h4>
          <p>In 7th-century Arabia, no one knew the bodies of the New Kingdom Pharaohs still existed, buried deep in the Theban hills. Only in <strong>1881</strong> (Deir el-Bahari) and <strong>1898</strong> (KV35) were the mummies of <strong>Ramesses II</strong> and <strong>Merneptah</strong> discovered and placed on public display in Cairo as a sign for modern humanity.</p>
        </div>
      </div>
      <div class="historians-proof-section">
        <div class="historians-header">🔗 VERIFIABLE HISTORICAL & ARCHAEOLOGICAL SOURCES</div>
        <div class="proof-links-bar">
          <a href="https://en.wikipedia.org/wiki/Ramesses_II#Mummy" target="_blank" rel="noopener" class="proof-link-pill">🏛️ Mummy of Ramesses II</a>
          <a href="https://en.wikipedia.org/wiki/Merneptah#Mummy" target="_blank" rel="noopener" class="proof-link-pill">👑 Mummy of Merneptah (KV35)</a>
          <a href="https://en.wikipedia.org/wiki/National_Museum_of_Egyptian_Civilization" target="_blank" rel="noopener" class="proof-link-pill">🏺 Cairo National Museum (NMEC)</a>
        </div>
      </div>`,
    developpementEs: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PRUEBA N°1 • PRECISIÓN DEL TÉRMINO ÁRABE « BADAN »</div>
          <h4>🌊 « Nunajjīka bi-badanika »: La preservación del cuerpo físico</h4>
          <p>Mientras que el relato bíblico solo menciona el ahogamiento del ejército en el mar (<em>Éxodo 14:28</em>), el Corán revela que el cuerpo físico (<strong>« Badan »</strong>) del Faraón sería salvado de la destrucción para ser una señal visible para las generaciones futuras.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PRUEBA N°2 • EL RELATO DE IBN ‘ABBĀS EN AT-TABARĪ E IBN KATHĪR</div>
          <h4>📜 Arrojado a la costa para disipar toda duda</h4>
          <p>Los imames <strong>At-Tabarī (15/193)</strong> e <strong>Ibn Kathīr</strong> relatan de <strong>Ibn ‘Abbās</strong> que Allah ordenó al mar arrojar su cadáver intacto con su armadura sobre una elevación de la costa para que los Hijos de Israel comprobaran su muerte.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PRUEBA N°3 • DESCUBRIMIENTO DE LAS MOMIAS REALES (1881–1898)</div>
          <h4>🏛️ Del Valle de los Reyes al Museo de El Cairo</h4>
          <p>Ocultas durante milenios bajo tierra y desconocidas en el siglo VII, las momias reales del Imperio Nuevo (como <strong>Ramsés II</strong> y <strong>Merneptah</strong>) fueron halladas en <strong>1881</strong> y <strong>1898</strong> y hoy se exhiben ante el mundo entero en El Cairo.</p>
        </div>
      </div>`,
    developpementAr: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الدليل الأول • دقة اللفظ القرآني ﴿نُنَجِّيكَ بِبَدَنِكَ﴾</div>
          <h4>🌊 نجاة الجسد الهامد دون الروح ليكون آيةً مشاهَدة</h4>
          <p>بينما تذكر التوراة غرق فرعون وجيشه في اليم فحسب، انفرد القرآن الكريم بالإخبار عن نجاة <strong>«بدن»</strong> فرعون (أي جسده بغير روح) من الضياع والتحلل في قاع البحر، ليبقى آيةً حسيةً لمن يأتي بعده من القرون.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الدليل الثاني • رواية ابن عباس في تفسير الطبري وابن كثير</div>
          <h4>📜 إلقاء البحر لجسده على نجوةٍ من الأرض</h4>
          <p>روى الإمام <strong>الطبري (15/193)</strong> و<strong>ابن كثير</strong> عن <strong>عبد الله بن عباس</strong> رضي الله عنهما أن بعض بني إسرائيل شكّوا في موت فرعون، فأمر الله البحر أن يرمي به على نجوةٍ (مكان مرتفع من الساحل) ببدنه ودرعه حتى تحقّقوا هلاكه.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الدليل الثالث • اكتشاف المومياوات الملكية (1881–1898م)</div>
          <h4>🏛️ من خبيئة الدير البحري ووادي الملوك إلى العرض في متحف القاهرة</h4>
          <p>لم يكن أحد في القرن السابع الميلادي يعلم بمكان أجساد فراعنة الخروج المطمورة في جبال طيبة، حتى كُشف عنها عام <strong>1881م</strong> و<strong>1898م</strong> (مومياوات رمسيس الثاني ومرنبتاح) وصارت معروضةً للناس كافة في المتحف القومي للحضارة المصرية بالقاهرة، تصديقًا لقوله تعالى: ﴿لِتَكُونَ لِمَنْ خَلْفَكَ آيَةً﴾.</p>
        </div>
      </div>`
  },
  "23:14": {
    titre: "Miracle Embryologique — La chronologie exacte des stades du fœtus (Nutfah, ‘Alaqah, Mudghah, ‘Idhām et Lahm)",
    titreEn: "Embryological Miracle — The Exact Chronology of Fetal Stages (Nutfah, ‘Alaqah, Mudghah, ‘Idhām & Lahm)",
    titreEs: "Milagro Embriológico — La cronología exacta de las etapas fetales (Nutfah, ‘Alaqah, Mudghah, ‘Idhām y Lahm)",
    titreAr: "الإعجاز الجنيني — الترتيب الدقيق لأطوار الجنين ﴿ثُمَّ خَلَقْنَا النُّطْفَةَ عَلَقَةً فَخَلَقْنَا الْعَلَقَةَ مُضْغَةً﴾",
    resume: "Ce verset décrit avec une précision morphologique et chronologique saisissante les stades successifs du développement embryonnaire : de la goutte (Nutfah) à l'adhérence irriguée (‘Alaqah), puis au stade de chair mâchée (Mudghah ressemblant aux somites), suivi de la formation de l'ossature cartilagineuse (‘Idhām) puis de son enveloppement par les muscles (Lahm).",
    resumeEn: "This verse describes with striking morphological and chronological accuracy the successive stages of embryonic development: from the drop (Nutfah) to the clinging substance (‘Alaqah), then the chewed-like lump (Mudghah resembling somites), followed by the cartilaginous skeleton (‘Idhām) and its clothing with muscles (Lahm).",
    resumeEs: "Este versículo describe con extraordinaria precisión morfológica y cronológica las etapas sucesivas del desarrollo embrionario: de la gota (Nutfah) a la adherencia (‘Alaqah), luego la masa de aspecto masticado (Mudghah), seguida del esqueleto (‘Idhām) y su revestimiento muscular (Lahm).",
    resumeAr: "تفصّل الآية الكريمة بتسلسلٍ زمنيّ ووصفيّ معجز أطوار الجنين البشري: من النطفة، إلى العلقة المتعلقة بجدار الرحم، ثم المضغة المخلّقة، ثم تكوين الهيكل الغضروفي والعظمي، ثم كسوته بالعضلات واللحم.",
    developpement: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">STADE N°1 & 2 • « NUTFAH » PUIS « ‘ALAQAH » (JOURS 1 À 21)</div>
          <h4>🧬 De la goutte fécondée à l'embryon suspendu dans la paroi utérine</h4>
          <p>Le développement débute par la <strong>« Nutfah »</strong> (une infime quantité de liquide fécondant), qui se transforme en <strong>« ‘Alaqah »</strong> (du 7e au 21e jour) : l'embryon s'accroche fermement à l'endomètre maternel par le cordon conjonctif, se nourrit du sang de la mère et adopte une forme arquée identique à celle d'une sangsue microscopique.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">STADE N°3 • « MUDGHAH » (SEMAINES 4 À 5)</div>
          <h4>🔬 L'apparition des somites semblables à des marques de dents</h4>
          <p>Le Coran utilise la conjonction <strong>« Fa » (فَ)</strong> (qui exprime en arabe une succession rapide) : <em>« Fa-khalaqnā al-‘alaqata mudghatan »</em>. Vers le 24e–28e jour, l'embryon se couvre de <strong>somites</strong> (de petits reliefs alignés le long du tube neural) qui lui donnent très exactement l'aspect d'un morceau de chair mâchée portant l'empreinte de dents (sens littéral du mot <strong>« Mudghah »</strong>).</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">STADE N°4 & 5 • « ‘IDHĀM » PUIS « LAHM » (SEMAINES 6 À 8)</div>
          <h4>🦴 Formation de la matrice osseuse avant l'enveloppement musculaire</h4>
          <p>Contrairement aux croyances grecques antiques d'Aristote et de Galien (qui imaginaient le fœtus formé d'un bloc à partir du sang menstruel), le Coran distingue deux phases successives : la différenciation de la charpente cartilagineuse et osseuse (<strong>« ‘Idhām »</strong>) à partir de la 6e semaine, immédiatement suivie (<em>« Fa-kasawnā al-‘idhāma lahman »</em>) par la migration des myoblastes qui viennent envelopper et habiller les os pour former les muscles (<strong>« Lahm »</strong>).</p>
        </div>
      </div>
      <div class="historians-proof-section">
        <div class="historians-header">🔗 SOURCES EXÉGÉTIQUES & EMBRYOLOGIQUES VÉRIFIABLES</div>
        <div class="proof-links-bar">
          <a href="https://fr.wikipedia.org/wiki/Somite" target="_blank" rel="noopener" class="proof-link-pill">🔬 Somites embryonnaires (Stade Mudghah)</a>
          <a href="https://fr.wikipedia.org/wiki/Embryogen%C3%A8se_humaine" target="_blank" rel="noopener" class="proof-link-pill">🧬 Chronologie de l'embryogenèse humaine</a>
          <a href="https://fr.wikipedia.org/wiki/Ost%C3%A9ogen%C3%A8se" target="_blank" rel="noopener" class="proof-link-pill">🦴 Ostéogenèse & Myogenèse</a>
        </div>
      </div>`,
    developpementEn: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">STAGES #1 & 2 • 'NUTFAH' TO '‘ALAQAH' (DAYS 1–21)</div>
          <h4>🧬 From the Fertilized Drop to the Clinging Embryo</h4>
          <p>Development begins with the <strong>'Nutfah'</strong> (a minute drop), which transitions into the <strong>'‘Alaqah'</strong>: the blastocyst implants into the uterine wall, hangs suspended by the connecting stalk, and draws nourishment from the maternal blood.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">STAGE #3 • 'MUDGHAH' (WEEKS 4–5)</div>
          <h4>🔬 Somites Resembling Teeth Marks on Chewed Flesh</h4>
          <p>Around days 24–28, bead-like ridges called <strong>somites</strong> appear along the embryo's back, giving it the exact visual appearance of a substance bearing teeth marks—the literal Arabic meaning of <strong>'Mudghah'</strong>.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">STAGES #4 & 5 • '‘IDHĀM' THEN 'LAHM' (WEEKS 6–8)</div>
          <h4>🦴 Cartilaginous Skeleton Preceding Muscle Attachment</h4>
          <p>Refuting ancient Greek theories (Aristotle and Galen), the Quran specifies that the skeletal framework (<strong>'‘Idhām'</strong>) forms first, followed by myoblasts wrapping around the bones to form muscles (<strong>'Lahm'</strong>).</p>
        </div>
      </div>
      <div class="historians-proof-section">
        <div class="historians-header">🔗 VERIFIABLE EMBRYOLOGICAL SOURCES</div>
        <div class="proof-links-bar">
          <a href="https://en.wikipedia.org/wiki/Somite" target="_blank" rel="noopener" class="proof-link-pill">🔬 Embryonic Somites (Mudghah)</a>
          <a href="https://en.wikipedia.org/wiki/Human_embryogenesis" target="_blank" rel="noopener" class="proof-link-pill">🧬 Human Embryogenesis</a>
        </div>
      </div>`,
    developpementEs: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">ETAPAS N°1 Y 2 • « NUTFAH » Y « ‘ALAQAH » (DÍAS 1 A 21)</div>
          <h4>🧬 De la gota fecundada al embrión adherido al útero</h4>
          <p>El desarrollo comienza con la <strong>« Nutfah »</strong> y pasa a la <strong>« ‘Alaqah »</strong>, cuando el embrión se implanta en la pared uterina y se nutre de la sangre materna.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">ETAPA N°3 • « MUDGHAH » (SEMANAS 4 A 5)</div>
          <h4>🔬 Los somitas con aspecto de marcas de dientes</h4>
          <p>Hacia el día 24–28 aparecen los <strong>somitas</strong> a lo largo del dorso embrionario, dándole el aspecto exacto de carne masticada (<strong>« Mudghah »</strong>).</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">ETAPAS N°4 Y 5 • « ‘IDHĀM » Y « LAHM » (SEMANAS 6 A 8)</div>
          <h4>🦴 Formación del esqueleto antes del revestimiento muscular</h4>
          <p>El Corán precisa que primero se modela la estructura ósea (<strong>« ‘Idhām »</strong>) y acto seguido los músculos (<strong>« Lahm »</strong>) envuelven los huesos.</p>
        </div>
      </div>`,
    developpementAr: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الطور الأول والثاني • «النطفة» ثم «العلقة» (الأيام 1 إلى 21)</div>
          <h4>🧬 من النطفة الأمشاج إلى العلقة المتعلقة بجدار الرحم</h4>
          <p>يبدأ تخلّق الإنسان من <strong>«النطفة»</strong> ثم يتحول إلى <strong>«علقة»</strong> تنغرس في بطانة الرحم وتتعلق بها وتتغذى من دم الأم، وتأخذ شكلًا مطابقًا لدودة العلق.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الطور الثالث • «المضغة» (الأسبوع الرابع والخامس)</div>
          <h4>🔬 ظهور الكتل البدنية (Somites) كطبعة الأسنان في اللحم الممضوغ</h4>
          <p>في الأسبوع الرابع تظهر على ظهر الجنين كتلٌ متراصة (الفلقات البدنية) تجعله مطابقًا في مظهره لقطعة لحمٍ عليها آثار الأسنان، وهو المعنى الدقيق للفظ <strong>«المضغة»</strong>.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الطور الرابع والخامس • «العظام» ثم كسوتها «باللحم» (الأسبوع 6 إلى 8)</div>
          <h4>🦴 سبق التشكّل الهيكلي ثم إحاطته بالعضلات</h4>
          <p>خلافًا لظنون الفلاسفة والأطباء القدماء (كأرسطو وجالينوس)، فرّق القرآن بدقة بالغة بين طور تشكّل الهيكل الغضروفي والعظمي <strong>﴿فَخَلَقْنَا الْمُضْغَةَ عِظَامًا﴾</strong> ثم إحاطة العظام بالعضلات <strong>﴿فَكَسَوْنَا الْعِظَامَ لَحْمًا﴾</strong> بحرف الفاء الدال على الترتيب والتعقيب.</p>
        </div>
      </div>`
  },
  "55:19": {
    titre: "Miracle Océanographique — La barrière invisible (Barzakh) entre les deux mers qui se rencontrent",
    titreEn: "Oceanographic Miracle — The Unseen Barrier (Barzakh) Between Two Meeting Seas",
    titreEs: "Milagro Oceanográfico — La barrera invisible (Barzakh) entre los dos mares que se encuentran",
    titreAr: "الإعجاز في علوم البحار — ﴿مَرَجَ الْبَحْرَيْنِ يَلْتَقِيَانِ * بَيْنَهُمَا بَرْزَخٌ لَّا يَبْغِيَانِ﴾",
    resume: "« Il a donné libre cours aux deux mers pour se rencontrer ; il y a entre elles une barrière (Barzakh) qu'elles ne dépassent pas. » L'océanographie moderne confirme que lorsque deux mers de salinité, de température et de densité différentes se rencontrent (comme la Méditerranée et l'Atlantique à Gibraltar), une zone de transition physique (pycnocline / halocline) empêche leur fusion immédiate.",
    resumeEn: "'He released the two seas, meeting side by side; between them is a barrier (Barzakh) they do not transgress.' Modern oceanography confirms that where two seas of different salinity, temperature, and density meet (such as the Mediterranean and the Atlantic at Gibraltar), a physical transition zone (pycnocline / halocline) prevents them from immediately merging.",
    resumeEs: "« Él ha dejado fluir los dos mares para que se encuentren; entre ambos hay una barrera (Barzakh) que no sobrepasan. » La oceanografía moderna confirma que cuando se encuentran dos mares de diferente salinidad y densidad (como en el estrecho de Gibraltar), una frontera física (haloclina / picnoclina) mantiene sus propiedades distintas.",
    resumeAr: "﴿مَرَجَ الْبَحْرَيْنِ يَلْتَقِيَانِ * بَيْنَهُمَا بَرْزَخٌ لَّا يَبْغِيَانِ﴾ أثبتت علوم البحار الحديثة أنه عند التقاء بحرين مختلفين في الملوحة والحرارة والكثافة (كالبحر المتوسط والمحيط الأطلسي عند مضيق جبل طارق)، يقوم حاجزٌ فيزيائي مائي يحفظ لكل بحرٍ خصائصه.",
    developpement: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PREUVE N°1 • LE SENS PRÉCIS DE « MARAJA » ET « BARZAKH »</div>
          <h4>🌊 Deux masses d'eau en contact direct mais maintenues distinctes</h4>
          <p>Dans les versets 19 et 20 de la Sourate Ar-Rahmān, Allāh dit : <em>« Maraja al-bahrayni yaltaqiyān, baynahumā barzakhun lā yabghiyān »</em>. À l'œil nu, deux mers contiguës semblent former une seule étendue d'eau homogène. Pourtant, le Coran révèle qu'au lieu même de leur rencontre (<em>Yaltaqiyān</em>), il existe une barrière dynamique invisible (<strong>« Barzakh »</strong>) qui empêche l'une de dissoudre immédiatement les caractéristiques de l'autre (<em>Lā yabghiyān</em>).</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PREUVE N°2 • LA HALOCLINE & LA PYCNOCLINE (DÉTROIT DE GIBRALTAR & BAB EL-MANDEB)</div>
          <h4>🧭 La découverte des frontières océaniques au XXe siècle</h4>
          <p>Les campagnes océanographiques modernes (notamment après l'expédition du <em>Challenger</em> et les relevés par capteurs de salinité et satellites) ont démontré que la mer Méditerranée (plus chaude et plus salée, ~38 g/L) et l'océan Atlantique (plus froid et moins salé, ~35 g/L) se rencontrent au <strong>détroit de Gibraltar</strong> sans perdre leur identité propre. Une zone de discontinuité de densité et de salinité (appelée <strong>pycnocline</strong> et <strong>halocline</strong>) agit comme une véritable frontière fluide qui régule les échanges sur des centaines de kilomètres.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PREUVE N°3 • DOUBLE DISTINCTION AVEC LES ESTUAIRES (SOURATE 25:53)</div>
          <h4>💧 Mer salée contre Mer salée (55:19) & Eau douce contre Eau salée (25:53)</h4>
          <p>La précision du Coran va encore plus loin : dans la Sourate Ar-Rahmān (55:19-20), il décrit la rencontre de deux mers dotées d'un <em>Barzakh</em>. Puis, dans la <strong>Sourate Al-Furqān (25:53)</strong>, lorsqu'il décrit la rencontre entre un fleuve d'eau douce potable (<em>‘Adbun Furāt</em>) et une mer salée amère (<em>Milhun Ujāj</em>) dans les estuaires, il ajoute un second terme : <strong>« Wa hijran mahjūrā »</strong> (une zone d'exclusion biologique et osmotique propre aux eaux saumâtres d'estuaire).</p>
        </div>
      </div>
      <div class="historians-proof-section">
        <div class="historians-header">🔗 SOURCES OCÉANOGRAPHIQUES VÉRIFIABLES</div>
        <div class="proof-links-bar">
          <a href="https://fr.wikipedia.org/wiki/Halocline" target="_blank" rel="noopener" class="proof-link-pill">🌊 Halocline (Frontière de salinité)</a>
          <a href="https://fr.wikipedia.org/wiki/Pycnocline" target="_blank" rel="noopener" class="proof-link-pill">🧭 Pycnocline (Frontière de densité)</a>
          <a href="https://fr.wikipedia.org/wiki/D%C3%A9troit_de_Gibraltar" target="_blank" rel="noopener" class="proof-link-pill">🌍 Détroit de Gibraltar (Méditerranée / Atlantique)</a>
        </div>
      </div>`,
    developpementEn: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PROOF #1 • THE MEANING OF 'MARAJA' AND 'BARZAKH'</div>
          <h4>🌊 Two Seas Meeting Yet Preserving Their Distinct Properties</h4>
          <p>To the naked eye, adjacent seas appear uniform. Yet the Quran reveals that where two seas meet (<em>Yaltaqiyān</em>), an unseen dynamic barrier (<strong>'Barzakh'</strong>) prevents one from overwhelming the properties of the other.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PROOF #2 • HALOCLINE & PYCNOCLINE AT THE STRAIT OF GIBRALTAR</div>
          <h4>🧭 Modern Oceanographic Measurements</h4>
          <p>Modern marine physics demonstrates that where the warmer, saltier Mediterranean Sea meets the cooler, less salty Atlantic Ocean at the <strong>Strait of Gibraltar</strong>, a physical density and salinity boundary (<strong>pycnocline / halocline</strong>) maintains each water mass's distinct characteristics.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PROOF #3 • DISTINCTION WITH ESTUARIES (SURAH AL-FURQĀN 25:53)</div>
          <h4>💧 Salt Sea vs Salt Sea (55:19) & Fresh Water vs Salt Water (25:53)</h4>
          <p>In Surah Al-Furqān (25:53), when describing fresh river water meeting salty sea water in estuaries, the Quran adds a second term alongside <em>Barzakh</em>: <strong>'Hijran Mahjūrā'</strong> (an osmotic and biological partition zone).</p>
        </div>
      </div>
      <div class="historians-proof-section">
        <div class="historians-header">🔗 VERIFIABLE OCEANOGRAPHIC SOURCES</div>
        <div class="proof-links-bar">
          <a href="https://en.wikipedia.org/wiki/Halocline" target="_blank" rel="noopener" class="proof-link-pill">🌊 Halocline</a>
          <a href="https://en.wikipedia.org/wiki/Pycnocline" target="_blank" rel="noopener" class="proof-link-pill">🧭 Pycnocline</a>
          <a href="https://en.wikipedia.org/wiki/Strait_of_Gibraltar" target="_blank" rel="noopener" class="proof-link-pill">🌍 Strait of Gibraltar</a>
        </div>
      </div>`,
    developpementEs: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PRUEBA N°1 • EL SIGNIFICADO DE « MARAJA » Y « BARZAKH »</div>
          <h4>🌊 Dos masas de agua en contacto pero sin confundirse</h4>
          <p>En las aleyas 19 y 20 de Sura Ar-Rahmān, el Corán revela que donde dos mares se encuentran existe una barrera física invisible (<strong>« Barzakh »</strong>) que impide que uno anule las propiedades del otro.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PRUEBA N°2 • HALOCLINA Y PICNOCLINA EN EL ESTRECHO DE GIBRALTAR</div>
          <h4>🧭 Las fronteras oceánicas medidas en el siglo XX</h4>
          <p>Las mediciones oceanográficas modernas demuestran que el mar Mediterráneo y el océano Atlántico se encuentran en el <strong>estrecho de Gibraltar</strong> separados por una frontera de densidad y salinidad (<strong>picnoclina y haloclina</strong>).</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PRUEBA N°3 • DISTINCIÓN CON LOS ESTUARIOS (SURA 25:53)</div>
          <h4>💧 Agua dulce frente a agua salada (« Hijran Mahjūrā »)</h4>
          <p>En Sura Al-Furqān (25:53), al describir el encuentro entre el agua dulce y el mar salado en los estuarios, el Corán añade la expresión <strong>« Wa hijran mahjūrā »</strong>.</p>
        </div>
      </div>`,
    developpementAr: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الدليل الأول • دقة قوله تعالى ﴿مَرَجَ الْبَحْرَيْنِ يَلْتَقِيَانِ * بَيْنَهُمَا بَرْزَخٌ لَّا يَبْغِيَانِ﴾</div>
          <h4>🌊 التقاء الكتلتين المائيتين مع بقاء خصائص كل بحر</h4>
          <p>يظن الناظر بالعين المجردة أن البحار المتصلة ماءٌ واحد متجانس، لكن القرآن الكريم كشف أن بين البحرين الملتقيين حاجزًا مائيًّا خفيًّا (<strong>برزخًا</strong>) يمنع طغيان أحدهما على الآخر وذوبان خصائصه فيه.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الدليل الثاني • منطقة التدرج الملحي والكثافي (مضيق جبل طارق وباب المندب)</div>
          <h4>🧭 الاكتشافات الحديثة في فيزياء المحيطات</h4>
          <p>أثبتت القياسات البحرية الحديثة أن مياه البحر الأبيض المتوسط ومياه المحيط الأطلسي تلتقيان عند <strong>مضيق جبل طارق</strong> مع احتفاظ كل بحر بدرجة حرارته وملوحته وكثافته الخاصة بفضل منطقة الفصل الفيزيائي (<strong>Halocline & Pycnocline</strong>).</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الدليل الثالث • التفريق الدقيق بين التقاء البحار المالحة ومصبات الأنهار (الفرقان: 53)</div>
          <h4>💧 زيادة وصف ﴿وَحِجْرًا مَّحْجُورًا﴾ عند التقاء العذب بالمالح</h4>
          <p>فرّق القرآن الكريم بين التقاء بحرين مالحين في سورة الرحمن (فذكر البرزخ وحده)، وبين التقاء النهر العذب بالبحر المالح في المصبات (سورة الفرقان: 53) فزاد قوله: <strong>﴿وَجَعَلَ بَيْنَهُمَا بَرْزَخًا وَحِجْرًا مَّحْجُورًا﴾</strong> إشارةً إلى منطقة المصب ذات النظام البيئي والأسموزي الخاص.</p>
        </div>
      </div>`
  },
  "96:2": {
    titre: "Miracle Embryologique & Linguistique — La création de l'homme à partir d'une adhérence (‘Alaq) dès la 1re Révélation",
    titreEn: "Embryological & Linguistic Miracle — Creation of Man from a Clinging Substance (‘Alaq) in the 1st Revelation",
    titreEs: "Milagro Embriológico y Lingüístico — La creación del ser humano a partir de una adherencia (‘Alaq)",
    titreAr: "الإعجاز الجنيني واللغوي في أول الوحي — ﴿خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ﴾",
    resume: "Dans les tout premiers versets révélés du Coran à La Mecque, Allāh emploie le mot « ‘Alaq » qui réunit 3 réalités biologiques de l'embryon humain entre le 7e et le 21e jour : une structure qui s'accroche à la paroi utérine, une forme semblable à une sangsue qui puise dans le sang maternel, et un aspect de sang coagulé.",
    resumeEn: "In the very first verses of the Quran revealed in Makkah, Allāh uses the word '‘Alaq', uniting 3 biological realities of the human embryo between days 7 and 21: a structure clinging to the uterine wall, a leech-like form drawing from maternal blood, and the appearance of a blood clot.",
    resumeEs: "En los primeros versículos revelados del Corán en La Meca, Allah emplea la palabra « ‘Alaq », que reúne 3 realidades biológicas del embrión humano: algo que se aferra a la pared uterina, una forma semejante a una sanguijuela que se nutre de la sangre materna y un coágulo.",
    resumeAr: "في أوائل الآيات التي نزلت من القرآن الكريم بمكة، وصف الله أصل الجنين البشري بلفظ ﴿عَلَقٍ﴾ الذي يجمع ثلاث حقائق تشريحية دقيقة: التعلّق والانغراس بجدار الرحم، والتغذي من دم الأم كالعلقة، ومظهر الدم الجامد.",
    developpement: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">SENS N°1 • L'IMPLANTATION UTÉRINE (« CE QUI S'ACCROCHE »)</div>
          <h4>🧬 L'embryon suspendu à l'endomètre par le pédicule embryonnaire</h4>
          <p>En langue arabe classique, la racine <strong>« ‘A-L-Q » (علق)</strong> désigne tout ce qui s'accroche, adhère et demeure suspendu. La microscopie électronique montre qu'à partir du 7e jour après la fécondation, le blastocyste s'implante profondément dans la paroi de l'utérus maternel grâce aux villosités chorioniques et reste littéralement suspendu dans la cavité chorionique par son pédicule de fixation.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">SENS N°2 • LA MORPHOLOGIE ET LA NUTRITION (« LA SANGSUE »)</div>
          <h4>🔬 Similitude anatomique et échanges sanguins maternels</h4>
          <p>Le mot <strong>« ‘Alaqah »</strong> désigne également en arabe la sangsue. Or, vers le 15e–21e jour, l'embryon humain présente non seulement un profil dorsal incurvé remarquablement semblable à celui d'une sangsue, mais il tire l'intégralité de son oxygène et de ses nutriments des lacs sanguins maternels de l'endomètre.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">SENS N°3 • LE SYSTÈME CARDIOVASCULAIRE PRIMITIF (« LE CAILLOT »)</div>
          <h4>🩸 La stagnation du sang dans les vaisseaux primitifs</h4>
          <p>Le troisième sens arabe d'<strong>« ‘Alaq »</strong> est le caillot de sang rouge foncé. Au cours de la 3e semaine, les îlots sanguins et les vaisseaux primitifs de l'embryon se forment et se remplissent de sang alors que la circulation ne bat pas encore pleinement, donnant à l'embryon de quelques millimètres l'aspect externe d'un minuscule caillot sanguin.</p>
        </div>
      </div>
      <div class="historians-proof-section">
        <div class="historians-header">🔗 SOURCES EXÉGÉTIQUES & SCIENTIFIQUES VÉRIFIABLES</div>
        <div class="proof-links-bar">
          <a href="https://fr.wikipedia.org/wiki/Nidation" target="_blank" rel="noopener" class="proof-link-pill">🧬 Nidation & Implantation utérine</a>
          <a href="https://fr.wikipedia.org/wiki/Villosite_choriale" target="_blank" rel="noopener" class="proof-link-pill">🔬 Villosités choriales</a>
        </div>
      </div>`,
    developpementEn: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">MEANING #1 • UTERINE IMPLANTATION ('THAT WHICH CLINGS')</div>
          <h4>🧬 Suspended from the Endometrium by the Connecting Stalk</h4>
          <p>In classical Arabic, the root <strong>'‘A-L-Q'</strong> means that which clings and hangs suspended. Electron microscopy confirms that from day 7, the blastocyst burrows into the uterine wall via chorionic villi and hangs by its connecting stalk.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">MEANING #2 • MORPHOLOGY & NUTRITION ('THE LEECH')</div>
          <h4>🔬 Anatomical Resemblance and Maternal Blood Supply</h4>
          <p><strong>'‘Alaqah'</strong> also means a leech. Around days 15–21, the human embryo curves into the exact profile of a leech while drawing nourishment from the maternal blood lacunae.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">MEANING #3 • PRIMITIVE VASCULAR SYSTEM ('THE BLOOD CLOT')</div>
          <h4>🩸 Closed Primitive Vessels Giving a Clot-Like Appearance</h4>
          <p>The third meaning of <strong>'‘Alaq'</strong> is a congealed blood clot, matching the embryo's external appearance during the third week before full circulation begins.</p>
        </div>
      </div>`,
    developpementEs: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">SIGNIFICADO N°1 • IMPLANTACIÓN UTERINA (« LO QUE SE AFERRA »)</div>
          <h4>🧬 El embrión suspendido en el endometrio</h4>
          <p>En árabe clásico, la raíz <strong>« ‘A-L-Q »</strong> designa todo lo que se adhiere y queda suspendido, describiendo la implantación del blastocisto en la pared uterina desde el séptimo día.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">SIGNIFICADO N°2 • MORFOLOGÍA Y NUTRICIÓN (« LA SANGUIJUELA »)</div>
          <h4>🔬 Similitud anatómica y nutrición a partir de la sangre materna</h4>
          <p>Hacia los días 15–21, el embrión humano adopta una curvatura idéntica a una sanguijuela y se alimenta de los lagos sanguíneos maternos.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">SIGNIFICADO N°3 • SISTEMA VASCULAR PRIMITIVO (« EL COÁGULO »)</div>
          <h4>🩸 Aspecto externo en la tercera semana</h4>
          <p>Durante la tercera semana, los vasos primitivos llenos de sangre dan al embrión el aspecto de un diminuto coágulo.</p>
        </div>
      </div>`,
    developpementAr: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">المعنى الأول • التعلّق والانغراس في جدار الرحم</div>
          <h4>🧬 انغراس الكيسة الأريمية وتعلّقها بالحبل السري البدائي</h4>
          <p>يدل الجذر اللغوي <strong>(ع ل ق)</strong> في العربية على كل ما يتعلق ويلتصق بشيء، وقد أثبت المجهر الإلكتروني أن الجنين ينغرس في بطانة الرحم ويتعلق بها عبر الزغابات المشيمية.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">المعنى الثاني • المشابهة الشكلية والغذائية لدودة العلق</div>
          <h4>🔬 التغذي من البرك الدموية للأم</h4>
          <p>في الأسبوع الثالث يتخذ الجنين انحناءً مطابقًا لشكل دودة العلق المائية، ويتغذى بامتصاص العناصر اللازمة من دم الأم.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">المعنى الثالث • العلقة بمعنى الدم الغليظ المتجمّد</div>
          <h4>🩸 تشكّل الأوعية الدموية البدائية في الأسبوع الثالث</h4>
          <p>تتجمع الدماء في الجزر والأوعية الدموية المغلقة للجنين قبل اكتمال النبض فيبدو الجنين للعين كأنه علقة دمٍ جامد.</p>
        </div>
      </div>`
  },
  "96:15": {
    titre: "Miracle Neuro-Anatomique — La région préfrontale « menteuse et fautive » (Nāsiyatin kādhibatin khāti'ah)",
    titreEn: "Neuro-Anatomical Miracle — The 'Lying and Sinful' Prefrontal Region (Nāsiyatin kādhibatin khāti'ah)",
    titreEs: "Milagro Neuroanatómico — La región prefrontal « mentirosa y pecadora » (Nāsiyatin kādhibatin khāti'ah)",
    titreAr: "الإعجاز التشريحي والعصبي — ﴿نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ﴾ ووظيفة الفص الجبهي",
    resume: "Aux versets 15 et 16 de la Sourate Al-‘Alaq, le Coran qualifie le toupet / la région frontale supérieure du crâne (An-Nāsiyah) de « menteuse et fautive ». Or, la neurophysiologie moderne a découvert que le cortex préfrontal situé juste derrière le front est le centre cérébral de la planification, de la prise de décision morale et de l'élaboration du mensonge.",
    resumeEn: "In verses 15–16 of Surah Al-‘Alaq, the Quran describes the upper frontal region of the head (An-Nāsiyah) as 'lying and sinful'. Modern neurophysiology has established that the prefrontal cortex located directly behind the forehead is the brain's center for planning, moral decision-making, and the fabrication of lies.",
    resumeEs: "En las aleyas 15 y 16 de Sura Al-‘Alaq, el Corán califica la región frontal superior de la cabeza (An-Nāsiyah) como « mentirosa y pecadora ». La neurofisiología moderna ha demostrado que la corteza prefrontal situada detrás de la frente dirige la planificación, las decisiones y la elaboración de la mentira.",
    resumeAr: "في الآيتين 15 و16 من سورة العلق، وصف القرآن الكريم مقدمة الرأس (الناصية) بأنها ﴿نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ﴾. وقد كشف علم الأعصاب الحديث أن القشرة الجبهية الأمامية الواقعة خلف الجبهة مباشرةً هي المركز المسؤول عن التخطيط واتخاذ القرار وصناعة الكذب.",
    developpement: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PREUVE N°1 • LA FORMULATION SINGULIÈRE DU VERSET (96:15-16)</div>
          <h4>🧠 Pourquoi qualifier le front de « menteur » plutôt que la langue ?</h4>
          <p>En s'adressant à Abū Jahl qui interdisait au Prophète ﷺ de prier près de la Ka‘bah, Allāh dit : <em>« Nous le saisirons certes par le toupet (An-Nāsiyah), un toupet menteur et fautif (Nāsiyatin kādhibatin khāti'ah) ! »</em>. Dans toutes les cultures anciennes, le mensonge était attribué à la langue et les intentions au cœur. Désigner la partie antérieure et supérieure du front (<strong>An-Nāsiyah</strong>) comme étant elle-même l'auteur du mensonge (<em>Kādhibah</em>) et de la transgression (<em>Khāti'ah</em>) constituait une affirmation inédite au VIIe siècle.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PREUVE N°2 • LA FONCTION DU CORTEX PRÉFRONTAL EN NEUROLOGIE</div>
          <h4>🔬 Le siège des fonctions exécutives et du choix moral</h4>
          <p>Ce n'est qu'aux XIXe et XXe siècles que la neurologie a établi le rôle exact du <strong>cortex préfrontal</strong> (logé directement derrière l'os frontal, dans la zone de la <em>Nāsiyah</em>) : il gouverne les fonctions exécutives supérieures, l'initiative, la planification des actes volontaires et le contrôle du comportement moral.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PREUVE N°3 • IMAGERIE CÉRÉBRALE (IRMf) DU MENSONGE VOLONTAIRE</div>
          <h4>⚡ L'activation préfrontale lors de la fabrication d'un mensonge</h4>
          <p>Les études modernes par <strong>imagerie par résonance magnétique fonctionnelle (IRMf)</strong> (notamment les travaux de Langleben et de Yang sur la neurobiologie de la tromperie) démontrent que lorsqu'un individu élabore un mensonge délibéré, c'est précisément le <strong>cortex préfrontal dorsolatéral et ventromédian</strong> qui s'active intensément pour inhiber la vérité et construire le récit mensonger.</p>
        </div>
      </div>
      <div class="historians-proof-section">
        <div class="historians-header">🔗 SOURCES NEUROLOGIQUES VÉRIFIABLES</div>
        <div class="proof-links-bar">
          <a href="https://fr.wikipedia.org/wiki/Cortex_pr%C3%A9frontal" target="_blank" rel="noopener" class="proof-link-pill">🧠 Cortex préfrontal (Fonctions exécutives)</a>
          <a href="https://fr.wikipedia.org/wiki/Lobe_frontal" target="_blank" rel="noopener" class="proof-link-pill">🔬 Lobe frontal (Planification & Décision)</a>
        </div>
      </div>`,
    developpementEn: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PROOF #1 • THE UNIQUE QURANIC EXPRESSION (96:15–16)</div>
          <h4>🧠 Attributing Lying and Sin Directly to the Forehead ('An-Nāsiyah')</h4>
          <p>Instead of attributing lying to the tongue, verses 15–16 target the upper frontal region of the head: <em>'A lying, sinful forelock (Nāsiyatin kādhibatin khāti'ah)!'</em></p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PROOF #2 • THE ROLE OF THE PREFRONTAL CORTEX</div>
          <h4>🔬 Seat of Executive Function, Planning, and Will</h4>
          <p>Modern neuroscience has shown that the <strong>prefrontal cortex</strong>—located directly behind the forehead in the exact region of <em>An-Nāsiyah</em>—directs planning, voluntary action, and behavioral control.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PROOF #3 • fMRI STUDIES ON DECEPTION AND LYING</div>
          <h4>⚡ Prefrontal Activation During Deliberate Deception</h4>
          <p>Functional MRI (fMRI) brain imaging confirms that fabricating a deliberate lie specifically activates the <strong>prefrontal cortex</strong>, which suppresses truthful responses and constructs deception.</p>
        </div>
      </div>
      <div class="historians-proof-section">
        <div class="historians-header">🔗 VERIFIABLE NEUROSCIENTIFIC SOURCES</div>
        <div class="proof-links-bar">
          <a href="https://en.wikipedia.org/wiki/Prefrontal_cortex" target="_blank" rel="noopener" class="proof-link-pill">🧠 Prefrontal Cortex</a>
          <a href="https://en.wikipedia.org/wiki/Frontal_lobe" target="_blank" rel="noopener" class="proof-link-pill">🔬 Frontal Lobe</a>
        </div>
      </div>`,
    developpementEs: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PRUEBA N°1 • LA EXPRESIÓN CORÁNICA ÚNICA (96:15-16)</div>
          <h4>🧠 ¿Por qué llamar « mentirosa » a la frente en lugar de a la lengua?</h4>
          <p>El Corán atribuye la mentira y el pecado directamente a la región frontal superior de la cabeza: <em>« ¡Un copete mentiroso y pecador (Nāsiyatin kādhibatin khāti'ah)! »</em>.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PRUEBA N°2 • LA CORTEZA PREFRONTAL EN NEUROLOGÍA</div>
          <h4>🔬 Sede de las funciones ejecutivas y las decisiones</h4>
          <p>La neurociencia moderna ha establecido que la <strong>corteza prefrontal</strong> situada detrás de la frente dirige la planificación y los actos voluntarios.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PRUEBA N°3 • RESONANCIA MAGNÉTICA FUNCIONAL (fMRI) DE LA MENTIRA</div>
          <h4>⚡ Activación prefrontal al elaborar un engaño</h4>
          <p>Los estudios por neuroimagen demuestran que al elaborar una mentira deliberada se activa intensamente la <strong>corteza prefrontal</strong>.</p>
        </div>
      </div>`,
    developpementAr: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الدليل الأول • دقة التعبير القرآني ﴿نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ﴾</div>
          <h4>🧠 إسناد الكذب والخطيئة إلى مقدمة الرأس (الناصية)</h4>
          <p>لم يقل القرآن «لسان كاذب»، بل أسند وصف الكذب والخطيئة مباشرةً إلى <strong>«الناصية»</strong> (وهي مقدم الرأس والجبهة)، وهو أمر لم يكن معروفًا للبشر في القرن السابع الميلادي.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الدليل الثاني • وظيفة القشرة الجبهية الأمامية (Prefrontal Cortex)</div>
          <h4>🔬 مركز التخطيط والإرادة وتوجيه السلوك</h4>
          <p>أثبت علم التشريح العصبي الحديث أن منطقة <strong>الفص الجبهي الأمامي</strong> الواقعة خلف الجبهة مباشرةً هي المسؤولة عن الوظائف التنفيذية العليا والتخطيط واتخاذ القرارات الإرادية.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الدليل الثالث • التصوير بالرنين المغناطيسي الوظيفي (fMRI) أثناء الكذب</div>
          <h4>⚡ نشاط الناصية عند اختلاق الكذب</h4>
          <p>أظهرت فحوصات الرنين المغناطيسي الوظيفي للدماغ أن اختلاق الكذب يتطلب نشاطًا مضاعفًا في <strong>القشرة الجبهية الأمامية</strong> لكبح الحقيقة وبناء القصة الكاذبة.</p>
        </div>
      </div>`
  },
  "111:1": {
    titre: "Miracle Prophétique & Historique — La condamnation définitive d'Abū Lahab révélée 10 ans avant sa mort",
    titreEn: "Prophetic & Historical Miracle — The Definitive Condemnation of Abū Lahab Revealed 10 Years Before His Death",
    titreEs: "Milagro Profético e Histórico — La condena definitiva de Abū Lahab revelada 10 años antes de su muerte",
    titreAr: "الإعجاز الغيبي والتاريخي — الإخبار بهلاك أبي لهب على الكفر قبل موته بعشر سنين",
    resume: "Révélée publiquement à La Mecque plus de dix ans avant la mort d'Abū Lahab, la Sourate Al-Masad décrète de manière irrévocable qu'Abū Lahab et son épouse mourront dans la mécréance. Durant toute une décennie, il aurait suffi à Abū Lahab de prononcer une seule phrase de conversion — même par hypocrisie — pour tenter de démentir le Coran, mais il ne put jamais le faire.",
    resumeEn: "Publicly revealed in Makkah more than ten years before Abū Lahab's death, Surah Al-Masad irrevocably decreed that Abū Lahab and his wife would die in disbelief. For an entire decade, Abū Lahab could have uttered a single sentence of fake conversion to try to disprove the Quran, yet he was never able to do so.",
    resumeEs: "Revelada públicamente en La Meca más de diez años antes de la muerte de Abū Lahab, la Sura Al-Masad decretó irreversiblemente que él y su esposa morirían en la incredulidad. Durante toda una década le habría bastado fingir su conversión con una sola frase para intentar desmentir el Corán, pero jamás pudo hacerlo.",
    resumeAr: "نزلت سورة المسد بمكة قبل هلاك أبي لهب بأكثر من عشر سنين، فحكمت حُكمًا قاطعًا بأنه وامرأته سيموتان على الكفر ويدخلان النار. وطوال عقدٍ كامل كان يكفي أبا لهب أن ينطق بكلمة الإسلام ولو كذبًا ونفاقًا ليزعم نقض القرآن، لكنه لم يستطع ذلك قط حتى هلك.",
    developpement: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PREUVE N°1 • UN VERDICT IRRÉVOCABLE DU VIVANT DE L'ENNEMI</div>
          <h4>🔥 Une sourate récitée publiquement à La Mecque pendant 10 ans</h4>
          <p>Lorsque le Prophète Muhammad ﷺ réunit son clan sur le mont As-Safā pour les appeler à l'Unicité d'Allāh (<em>Sahīh Al-Bukhārī n°4770</em>), son oncle ‘Abd al-‘Uzzā (surnommé <strong>Abū Lahab</strong>) s'écria : <em>« Périsses-tu (Tabban laka) ! Est-ce pour cela que tu nous as réunis ? »</em>. Allāh fit alors descendre la Sourate Al-Masad décrétant qu'Abū Lahab et son épouse Umm Jamīl périraient et brûleraient dans un Feu ardent, fermant définitivement la porte à tout repentir de leur part.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PREUVE N°2 • LE PARADOXE HISTORIQUE SOULIGNÉ PAR LES SAVANTS</div>
          <h4>⚖️ Il lui suffisait d'une seule phrase hypocrite pour contredire le Coran</h4>
          <p>Les grands exégètes (notamment <strong>Al-Qurtubī, Fakhr ad-Dīn ar-Rāzī et Ibn Kathīr</strong>) soulignent le défi extraordinaire contenu dans cette sourate : alors que de nombreux ennemis farouches de l'Islam (comme Khālid ibn al-Walīd, ‘Amr ibn al-‘Ās, ‘Ikrimah ibn Abī Jahl ou Abū Sufyān) finirent par embrasser l'Islam, le Coran affirma dix ans à l'avance qu'Abū Lahab n'aurait jamais la foi. Durant ces <strong>10 années</strong>, Abū Lahab dépensait sa fortune pour prouver que Muhammad ﷺ se trompait : il lui aurait suffi de se présenter devant les Mecquois et de dire, même en mentant : <strong>« J'atteste que je suis musulman, votre Coran s'est donc trompé ! »</strong>. Mais aucun être humain ne peut contredire le décret de Celui qui connaît l'avenir.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PREUVE N°3 • L'ACCOMPLISSEMENT EXACT APRÈS LA BATAILLE DE BADR (624 AP. J.-C.)</div>
          <h4>⚔️ La mort d'Abū Lahab sept nuits après la défaite de Quraysh</h4>
          <p>En <strong>624 ap. J.-C.</strong> (an 2 de l'Hégire), en apprenant la déroute humiliante de l'armée mecquoise face aux 300 croyants à la bataille de Badr, Abū Lahab fut frappé d'une terrible maladie infectieuse pustuleuse (<em>Al-‘Adasah</em>) et mourut sept nuits plus tard dans la mécréance la plus totale, accomplissant la prophétie coranique à la lettre.</p>
        </div>
      </div>
      <div class="historians-proof-section">
        <div class="historians-header">🔗 SOURCES AUTHENTIQUES & HISTORIQUES VÉRIFIABLES</div>
        <div class="proof-links-bar">
          <a href="https://sunnah.com/bukhari:4770" target="_blank" rel="noopener" class="proof-link-pill">📘 Sahīh Al-Bukhārī (Hadith n°4770)</a>
          <a href="https://sunnah.com/muslim:208a" target="_blank" rel="noopener" class="proof-link-pill">📗 Sahīh Muslim (n°208)</a>
          <a href="https://fr.wikipedia.org/wiki/Abou_Lahab" target="_blank" rel="noopener" class="proof-link-pill">📜 Biographie historique d'Abū Lahab</a>
        </div>
      </div>`,
    developpementEn: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PROOF #1 • AN IRREVOCABLE VERDICT DURING HIS LIFETIME</div>
          <h4>🔥 Recited Publicly in Makkah for Over a Decade</h4>
          <p>When the Prophet ﷺ called his people on Mount As-Safā (<em>Sahīh Al-Bukhārī #4770</em>), Abū Lahab shouted: <em>'May you perish!'</em> Allāh immediately revealed Surah Al-Masad decreeing that Abū Lahab and his wife Umm Jamīl would perish in disbelief.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PROOF #2 • THE 10-YEAR CHALLENGE HIGHLIGHTED BY SCHOLARS</div>
          <h4>⚖️ A Single Fake Sentence Would Have Sufficed to Challenge the Quran</h4>
          <p>Scholars such as <strong>Al-Qurtubī, Ar-Rāzī, and Ibn Kathīr</strong> point out that while other fierce enemies (like Khālid ibn al-Walīd and Abū Sufyān) eventually accepted Islam, the Quran declared 10 years in advance that Abū Lahab never would. All he had to do was pretend to convert for five minutes in public to claim the Quran was wrong—yet he was never able to do so.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PROOF #3 • EXACT FULFILLMENT AFTER BADR (624 CE)</div>
          <h4>⚔️ His Death Seven Nights After the Meccan Defeat at Badr</h4>
          <p>In <strong>624 CE</strong>, devastated by the news of Quraysh's defeat at Badr, Abū Lahab contracted a malignant pustular plague (<em>Al-‘Adasah</em>) and died in disbelief seven nights later.</p>
        </div>
      </div>
      <div class="historians-proof-section">
        <div class="historians-header">🔗 VERIFIABLE HISTORICAL SOURCES</div>
        <div class="proof-links-bar">
          <a href="https://sunnah.com/bukhari:4770" target="_blank" rel="noopener" class="proof-link-pill">📘 Sahīh Al-Bukhārī (#4770)</a>
          <a href="https://sunnah.com/muslim:208a" target="_blank" rel="noopener" class="proof-link-pill">📗 Sahīh Muslim (#208)</a>
          <a href="https://en.wikipedia.org/wiki/Abu_Lahab" target="_blank" rel="noopener" class="proof-link-pill">📜 Historical Biography of Abū Lahab</a>
        </div>
      </div>`,
    developpementEs: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PRUEBA N°1 • UN VEREDICTO IRREVOCABLE EN VIDA DEL ENEMIGO</div>
          <h4>🔥 Recitada públicamente en La Meca durante 10 años</h4>
          <p>Cuando el Profeta ﷺ llamó a su pueblo en el monte As-Safā (<em>Sahīh Al-Bukhārī n°4770</em>), Abū Lahab lo maldijo y Allah reveló la Sura Al-Masad anunciando que él y su esposa morirían sin fe.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PRUEBA N°2 • EL DESAFÍO DE 10 AÑOS DESTACADO POR LOS EXÉGETAS</div>
          <h4>⚖️ Una sola frase fingida habría bastado para intentar contradecir el Corán</h4>
          <p>Los sabios <strong>Al-Qurtubī, Ar-Rāzī e Ibn Kathīr</strong> subrayan que durante diez años Abū Lahab tuvo en su mano pronunciar una falsa conversión en público para decir que el Corán se equivocaba, pero jamás pudo contradecir el decreto divino.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PRUEBA N°3 • CUMPLIMIENTO EXACTO TRAS LA BATALLA DE BADR (624 D. C.)</div>
          <h4>⚔️ Su muerte siete noches después de la derrota de Quraysh</h4>
          <p>En el año <strong>624 d. C.</strong>, tras conocer la derrota de Quraysh en Badr, Abū Lahab contrajo una grave infección pustulosa (<em>Al-‘Adasah</em>) y murió en la incredulidad tal como anunció la sura.</p>
        </div>
      </div>`,
    developpementAr: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الدليل الأول • حكمٌ قاطع بالمواجهة العلنية في مكة</div>
          <h4>🔥 سورة تتلى في مجالس قريش عشر سنين كاملة</h4>
          <p>لما صعد النبي ﷺ على الصفا يدعو قريشًا (<em>صحيح البخاري 4770</em>) قال أبو لهب: «تبًّا لك سائر اليوم، ألهذا جمعتنا؟»، فأنزل الله سورة المسد تحكم بأنه وامرأته سيموتان على الكفر ويصليان نارًا ذات لهب.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الدليل الثاني • التحدي التاريخي الذي أبرزه أئمة التفسير</div>
          <h4>⚖️ كان يكفيه التظاهر بالإسلام بكلمةٍ واحدة ليزعم معارضة القرآن</h4>
          <p>بيّن الأئمة <strong>القرطبي والفخر الرازي وابن كثير</strong> أن كثيرًا من أشد صناديد قريش (كخالد بن الوليد وعمرو بن العاص وعكرمة بن أبي جهل وأبي سفيان) أسلموا لاحقًا، إلا أبا لهب فقد أخبر العليم الخبير أنه لن يؤمن أبدًا؛ ومضت عشر سنين وهو يحاول تكذيب النبي ﷺ فلم يخطر بباله ولا قدر لسانه على النطق بالشهادتين ولو نفاقًا.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الدليل الثالث • تحقق النبوءة بعد غزوة بدر الكبرى (624م)</div>
          <h4>⚔️ هلاكه بمرض العدسة بعد سبع ليالٍ من هزيمة قريش</h4>
          <p>في السنة الثانية للهجرة (<strong>624م</strong>) وبعد هزيمة المشركين في بدر، أُصيب أبو لهب بمرض «العدسة» الخبيث فمات شرّ ميتة على الكفر كما أخبر القرآن حرفيًّا.</p>
        </div>
      </div>`
  }
};

// Injection dans generateur.js juste avant Object.assign(memoireGlobale.miracles, MIRACLES_DE_BASE);
const cibleAssign = `Object.assign(memoireGlobale.miracles, MIRACLES_DE_BASE);`;
const codeInjection = `Object.assign(MIRACLES_DE_BASE, ${JSON.stringify(MIRACLES_ENRICHIS, null, 2)});\n` + cibleAssign;

if (!code.includes('PREUVE N°1 • PRÉCISION DU TERME CORANIQUE « BADAN »')) {
  code = code.replace(cibleAssign, codeInjection);
}

fs.writeFileSync(fichier, code, 'utf8');

// Mise à jour immédiate de memoire-site.json également
const cheminMemoire = path.join(__dirname, 'memoire-site.json');
if (fs.existsSync(cheminMemoire)) {
  try {
    const mem = JSON.parse(fs.readFileSync(cheminMemoire, 'utf8'));
    mem.miracles = Object.assign({}, mem.miracles || {}, MIRACLES_ENRICHIS);
    fs.writeFileSync(cheminMemoire, JSON.stringify(mem, null, 2), 'utf8');
  } catch (e) {}
}

console.log('✅ LES 5 AUTRES MIRACLES + LA TRADUCTION DES MENTIONS LÉGALES SONT ACTIVÉS !');
console.log('👉 Lance maintenant : node generateur.js');
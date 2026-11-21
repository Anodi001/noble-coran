/* ONEDRIVE_SAFE */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function writeSafe(p, d) {
  for (let i = 0; i < 15; i++) {
    try { fs.writeFileSync(p, d, 'utf8'); return; }
    catch (e) {
      if (i === 14) throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80);
    }
  }
}

function readNorm(p) {
  const raw = fs.readFileSync(p, 'utf8');
  return { text: raw.replace(/\r\n/g, '\n'), eol: raw.includes('\r\n') ? '\r\n' : '\n' };
}

function writeNorm(p, text, eol) {
  writeSafe(p, eol === '\r\n' ? text.replace(/\n/g, '\r\n') : text);
}

const MIRACLE_FER_57_25 = {
  titre: "Miracle Historique, Archéologique & Biologique — Le Fer descendu du ciel (« Wa anzalna al-hadid »)",
  titreEn: "Historical, Archaeological & Biological Miracle — Iron Sent Down from the Sky ('And We sent down iron')",
  titreEs: "Milagro Histórico, Arqueológico y Biológico — El Hierro hecho descender del cielo (« Hice descender el hierro »)",
  titreAr: "الإعجاز اللغوي والأثري والبيولوجي في الحديد — ﴿وَأَنزَلْنَا الْحَدِيدَ فِيهِ بَأْسٌ شَدِيدٌ وَمَنَافِعُ لِلنَّاسِ﴾",
  resume: "« Et Nous avons fait descendre le fer, dans lequel il y a une force redoutable, aussi bien que des utilités pour les gens » (57:25). Le Coran emploie le verbe précis « anzalna » (faire descendre) plutôt que « créer » : l'archéologie confirme que les premiers objets en fer façonnés par l'humanité provenaient de fer météoritique tombé du ciel, tandis que la biologie moderne a révélé que ce métal est indispensable à la vie humaine au cœur de l'hémoglobine.",
  resumeEn: "'And We sent down iron, wherein is great might and benefits for the people' (57:25). The Quran uses the exact verb 'anzalna' (sent down) rather than 'created': archaeology confirms that humanity's earliest iron artifacts were forged from meteoritic iron fallen from the sky, while modern biology revealed that iron is essential to human life at the core of hemoglobin.",
  resumeEs: "« Hice descender el hierro, en el que hay gran poder y beneficio para la gente » (57:25). El Corán emplea el verbo preciso « anzalna » (hacer descender) en lugar de « crear »: la arqueología confirma que los primeros objetos de hierro forjados por la humanidad procedían de hierro meteorítico caído del cielo, y la biología moderna reveló su papel vital en la hemoglobina.",
  resumeAr: "﴿وَأَنزَلْنَا الْحَدِيدَ فِيهِ بَأْسٌ شَدِيدٌ وَمَنَافِعُ لِلنَّاسِ﴾ (الحديد: 25). اختار القرآن لفظ «أنزلنا» بدل «خلقنا»، وقد أثبتت الآثار الحديثة أن أقدم الأدوات الحديدية التي صنعها الإنسان صيغت من الحديد النيزكي النازل من السماء، كما كشف الطب الحديث أن ذرات الحديد هي أساس الهيموغلوبين الذي ينقل الأكسجين في دم الإنسان.",
  developpement: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PREUVE N°1 • PRÉCISION DU VERBE ARABE & ARCHÉOLOGIE</div>
          <h4>☄️ « Nous avons fait descendre le fer » : le fer météoritique des origines</h4>
          <p>Contrairement à d'autres ressources décrites comme « créées » sur Terre, le verset emploie l'expression littérale <strong>« وَأَنزَلْنَا الْحَدِيدَ » (Nous avons fait descendre le fer)</strong>. Or l'archéologie et la spectrométrie modernes ont confirmé que les tout premiers objets en fer travaillés par l'humanité — tels que les perles égyptiennes de Gerzeh (~3200 av. J.-C.) et la célèbre <strong>dague de Toutânkhamon</strong> (analysée en 2016 avec près de 11 % de nickel, signature typique des météorites) — ont été forgés à partir de <strong>fer météoritique tombé du ciel</strong>. Les anciens Égyptiens l'appelaient d'ailleurs littéralement <em>bjA-n-pt</em> : le « métal du ciel ».</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PREUVE N°2 • MÉTALLURGIE & CIVILISATION</div>
          <h4>⚒️ « Une force redoutable » (Ba'sun Shadid)</h4>
          <p>Le fer possède une combinaison unique de dureté, de résistance mécanique et de malléabilité qui le distingue de tous les autres métaux courants. Alliage de fer et de carbone, l'<strong>acier</strong> constitue l'ossature même de la civilisation humaine : outils agricoles, ponts, navires, bâtiments, machinerie lourde et défense. Aucun autre élément métallique n'a autant transformé la capacité matérielle des sociétés humaines.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PREUVE N°3 • BIOCHIMIE & VIE HUMAINE</div>
          <h4>🩸 « Et des utilités pour les gens » : le moteur de l'hémoglobine</h4>
          <p>Les « utilités » du fer dépassent largement les outils extérieurs : il est <strong>vital à l'intérieur même du corps humain</strong>. Chaque molécule d'<strong>hémoglobine</strong> dans nos globules rouges repose sur des atomes de fer capables de capter l'oxygène dans les poumons et de le distribuer à chaque cellule de l'organisme, tandis que la <strong>myoglobine</strong> le stocke dans nos muscles. Sans cet atome métallique précis, la respiration cellulaire s'arrête instantanément.</p>
        </div>
      </div>
      <div class="historians-proof-section">
        <div class="historians-header">🔗 SOURCES ARCHÉOLOGIQUES & BIOLOGIQUES VÉRIFIABLES</div>
        <div class="proof-links-bar">
          <a href="https://fr.wikipedia.org/wiki/Fer_m%C3%A9t%C3%A9orique" target="_blank" rel="noopener" class="proof-link-pill">☄️ Fer météorique & premières civilisations</a>
          <a href="https://en.wikipedia.org/wiki/Tutankhamun%27s_meteoric_iron_dagger" target="_blank" rel="noopener" class="proof-link-pill">🗡️ Dague en fer météoritique de Toutânkhamon</a>
          <a href="https://fr.wikipedia.org/wiki/H%C3%A9moglobine" target="_blank" rel="noopener" class="proof-link-pill">🩸 Rôle vital du fer dans l'hémoglobine</a>
        </div>
      </div>`,
  developpementEn: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PROOF #1 • ARABIC VERB PRECISION & ARCHAEOLOGY</div>
          <h4>☄️ 'We Sent Down Iron': Meteoritic Iron in Human History</h4>
          <p>The verse specifically uses <strong>'anzalna' (We sent down)</strong> rather than 'created'. Modern archaeology and X-ray spectrometry confirmed that humanity's earliest iron artifacts—including ancient Egyptian Gerzeh beads (~3200 BCE) and <strong>Tutankhamun's dagger</strong> (~11% nickel signature)—were forged from <strong>meteoritic iron fallen from the sky</strong>, which ancient Egyptians literally called <em>metal from the sky</em>.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PROOF #2 • METALLURGY & STRENGTH</div>
          <h4>⚒️ 'Great Might' (Ba'sun Shadid)</h4>
          <p>Iron and its primary alloy, <strong>steel</strong>, combine unmatched mechanical strength, durability, and workability, serving as the structural backbone of agriculture, architecture, transport, tools, and defense across human history.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PROOF #3 • BIOCHEMISTRY & HUMAN LIFE</div>
          <h4>🩸 'Benefits for the People': Essential to Hemoglobin</h4>
          <p>Beyond industry, iron is biologically irreplaceable inside the human body: iron atoms at the heart of <strong>hemoglobin</strong> bind oxygen in the lungs and deliver it to every cell, while <strong>myoglobin</strong> stores oxygen in muscles.</p>
        </div>
      </div>`,
  developpementEs: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PRUEBA N°1 • PRECISIÓN LINGÜÍSTICA Y ARQUEOLOGÍA</div>
          <h4>☄️ « Hice descender el hierro »: el hierro meteorítico</h4>
          <p>El versículo utiliza el verbo <strong>« anzalna » (hacer descender)</strong>. La arqueología moderna confirmó que los primeros objetos de hierro trabajados por el ser humano —como las cuentas egipcias de Gerzeh y la célebre <strong>daga de Tutankamón</strong>— fueron forjados con <strong>hierro meteorítico caído del cielo</strong>, llamado por los antiguos egipcios « metal del cielo ».</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PRUEBA N°2 • METALURGIA Y RESISTENCIA</div>
          <h4>⚒️ « Gran poder » (Ba'sun Shadid)</h4>
          <p>El hierro y su aleación principal, el <strong>acero</strong>, combinan resistencia mecánica y maleabilidad excepcionales, formando la columna vertebral de herramientas, construcciones y defensa en toda la civilización.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">PRUEBA N°3 • BIOQUÍMICA Y VIDA HUMANA</div>
          <h4>🩸 « Beneficios para la gente »: vital en la hemoglobina</h4>
          <p>El hierro es indispensable dentro del propio cuerpo humano: sus átomos en la <strong>hemoglobina</strong> fijan y transportan el oxígeno desde los pulmones hasta cada célula, mientras la <strong>mioglobina</strong> lo almacena en los músculos.</p>
        </div>
      </div>`,
  developpementAr: `
      <div class="miracle-pillars-grid">
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الدليل الأول • دقة التعبير القرآني والآثار الحديثة</div>
          <h4>☄️ ﴿وَأَنزَلْنَا الْحَدِيدَ﴾: الحديد النيزكي النازل من السماء</h4>
          <p>اختار النص القرآني التعبير الدقيق <strong>«أنزلنا الحديد»</strong> بدل «خلقنا». وقد أثبتت التحاليل المخبرية والأثرية أن أقدم المشغولات الحديدية في تاريخ البشرية — مثل خرز جرزة القديم و<strong>خنجر توت عنخ آمون</strong> الغني بالنيكل — صيغت من <strong>الحديد النيزكي الساقط من السماء</strong>، وهو ما سماه المصريون القدماء حرفيًا «معدن السماء».</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الدليل الثاني • القوة المعدنية والعمران</div>
          <h4>⚒️ ﴿فِيهِ بَأْسٌ شَدِيدٌ﴾: عماد الحضارة البشرية</h4>
          <p>يجمع الحديد وسبائكه كالفولاذ بين الصلابة الفائقة وقابلية التشكيل، مما جعله الأساس الأول للأدوات والزراعة والبناء والجسور ووسائل الدفاع عبر العصور.</p>
        </div>
        <div class="miracle-pillar-card">
          <div class="pillar-badge">الدليل الثالث • الكيمياء الحيوية وحياة الإنسان</div>
          <h4>🩸 ﴿وَمَنَافِعُ لِلنَّاسِ﴾: سرّ نقل الأكسجين في الدم</h4>
          <p>تتجاوز منافع الحديد الصناعة إلى داخل جسم الإنسان نفسه؛ إذ تعتمد جزيئات <strong>الهيموغلوبين</strong> في كريات الدم الحمراء على ذرات الحديد لربط الأكسجين ونقله إلى جميع خلايا الجسم، كما يختزنه <strong>الميوغلوبين</strong> في العضلات.</p>
        </div>
      </div>`
};

// 1. Mettre à jour site/data-sourate-57.js
const data57Path = path.join(__dirname, 'site', 'data-sourate-57.js');
const d57File = readNorm(data57Path);
const mPrefix = d57File.text.match(/^(\s*(?:window\.SOURATE_DATA|const\s+SOURATE_DATA|var\s+SOURATE_DATA|let\s+SOURATE_DATA)\s*=\s*)/);
if (!mPrefix) throw new Error('Déclaration SOURATE_DATA introuvable dans site/data-sourate-57.js');

const ctx57 = { window: {} };
vm.runInNewContext(d57File.text, ctx57);
const data57 = ctx57.window.SOURATE_DATA || ctx57.SOURATE_DATA;
const v25 = data57.versets.find(v => v.numVerset === 25);
if (!v25) throw new Error('Verset 25 introuvable dans site/data-sourate-57.js');

v25.miracle = MIRACLE_FER_57_25;
const newData57Js = mPrefix[1] + JSON.stringify(data57, null, 2) + ';\n';
new vm.Script(newData57Js);
writeNorm(data57Path, newData57Js, d57File.eol);
console.log('✓ site/data-sourate-57.js : objet miracle ajouté sur 57:25 (FR/EN/ES/AR).');

// 2. Mettre à jour site/index.html (sourate 57 -> hasMiracle: true, miracleVerset: 25)
const idxPath = path.join(__dirname, 'site', 'index.html');
const idxFile = readNorm(idxPath);
const reSourates = /(const\s+sourates\s*=\s*)(\[[^\n]+\])(;)/;
const mIdx = idxFile.text.match(reSourates);
if (!mIdx) throw new Error('Tableau const sourates introuvable dans site/index.html');

const souratesArr = JSON.parse(mIdx[2]);
const s57 = souratesArr.find(s => s.id === 57);
if (!s57) throw new Error('Sourate id:57 introuvable dans site/index.html');
s57.hasMiracle = true;
s57.miracleVerset = 25;

const newIdxText = idxFile.text.replace(reSourates, mIdx[1] + JSON.stringify(souratesArr) + mIdx[3]);
const idxScripts = [...newIdxText.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
idxScripts.forEach((m, i) => {
  const code = (m[1] || '').trim();
  if (!code || /type\s*=\s*["']application\/ld\+json["']/i.test(m[0])) return;
  new vm.Script(code);
});
writeNorm(idxPath, newIdxText, idxFile.eol);
console.log('✓ site/index.html : Sourate 57 activée dans ★ Les Miracles du Coran (v.25).');

// 3. Mettre à jour les 29 pages HTML de la sourate 57 (pilule dorée + v.25 doré + data-sourate-57.js?v=3)
const ref88Lines = readNorm(path.join(__dirname, 'site', 'sourate-88-verset-1.html')).text.split('\n');
const iPill = ref88Lines.findIndex(l => l.includes('id="topMiraclePillLink"'));
if (iPill === -1) throw new Error('topMiraclePillLink introuvable dans site/sourate-88-verset-1.html');

const pillLine57 = ref88Lines[iPill]
  .replace(/sourate-88-verset-17\.html/g, 'sourate-57-verset-25.html')
  .replace(/data-v="17"/g, 'data-v="25"')
  .replace(/\(v\.?\s*17\)/gi, '(v.25)')
  .replace(/17(?=<\/a>|\))/g, '25');

const prevLine88 = ref88Lines[iPill - 1] || '';
const nextLine88 = ref88Lines[iPill + 1] || '';
const prevIdMatch = prevLine88.match(/\bid="([^"]+)"/);
const nextIdMatch = nextLine88.match(/\bid="([^"]+)"/);

let updatedHtmlCount = 0;
for (let v = 1; v <= data57.nbVersets; v++) {
  const fPath = path.join(__dirname, 'site', `sourate-57-verset-${v}.html`);
  if (!fs.existsSync(fPath)) continue;
  const fObj = readNorm(fPath);
  let lines = fObj.text.split('\n');

  // a) Pilule topMiraclePillLink
  if (!fObj.text.includes('id="topMiraclePillLink"')) {
    let inserted = false;
    if (prevIdMatch) {
      const idxAnchor = lines.findIndex(l => l.includes(`id="${prevIdMatch[1]}"`));
      if (idxAnchor !== -1) { lines.splice(idxAnchor + 1, 0, pillLine57); inserted = true; }
    }
    if (!inserted && nextIdMatch) {
      const idxAnchor = lines.findIndex(l => l.includes(`id="${nextIdMatch[1]}"`));
      if (idxAnchor !== -1) { lines.splice(idxAnchor, 0, pillLine57); inserted = true; }
    }
    if (!inserted) {
      const idxRev = lines.findIndex(l => l.includes('revelation-pill'));
      if (idxRev !== -1) { lines.splice(idxRev + 1, 0, pillLine57); inserted = true; }
    }
    if (!inserted) {
      throw new Error(`Impossible de placer topMiraclePillLink dans sourate-57-verset-${v}.html (contexte 88:1 -> ${prevLine88.trim()} | ${nextLine88.trim()})`);
    }
  }

  let html = lines.join('\n');

  // b) Versionning data-sourate-57.js?v=3
  html = html.replace(/data-sourate-57\.js(?:\?v=\d+)?/g, 'data-sourate-57.js?v=3');

  // c) Classes dorées sur le verset miracle (57:25)
  if (v === 25) {
    html = html
      .replace(/class="verse-jumper-select"(?!\s*is-miracle-gold)/, 'class="verse-jumper-select is-miracle-gold"')
      .replace(/class="verse-stage"(?!\s*is-miracle-stage)/, 'class="verse-stage is-miracle-stage"');
  }

  writeNorm(fPath, html, fObj.eol);
  updatedHtmlCount++;
}
console.log(`✓ ${updatedHtmlCount} pages HTML sourate-57-verset-*.html mises à jour (badge doré + v.25 + ?v=3).`);

// 4. Bump cache (_worker.js + sw.js)
const workerPath = path.join(__dirname, 'site', '_worker.js');
const wFile = readNorm(workerPath);
const tag = String(Date.now());
const wNew = wFile.text
  .replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`)
  .replace(/htmlPropre\.replace\(\/v=1795050050086\/g,\s*"v=\d+"\)/, `htmlPropre.replace(/v=1795050050086/g, "v=${tag}")`);
writeNorm(workerPath, wNew, wFile.eol);

const swPath = path.join(__dirname, 'site', 'sw.js');
const swFile = readNorm(swPath);
const swNew = swFile.text.replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
writeNorm(swPath, swNew, swFile.eol);
console.log(`✓ _worker.js (?v=${tag}) et sw.js incrémentés.`);
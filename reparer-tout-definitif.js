const fs = require('fs');
const vm = require('vm');

let code = fs.readFileSync('generateur.js', 'utf8');

// 1. Nettoyage complet des anciennes versions pour repartir sur des bases saines
code = code.replace(/\/\* BOUTONS ET STYLES \*\/[\s\S]*?(?=@media \(max-width:768px\))/, '');
code = code.replace(/\/\* BOUTONS MOT A MOT[\s\S]*?(?=@media \(max-width:768px\))/, '');
code = code.replace(/<div id="tajweedLegendBar"[\s\S]*?<\/div>/g, '');
code = code.replace(/<div class="brown-noise-group"[\s\S]*?<\/div>\s*<\/div>/g, '');
code = code.replace(/<button type="button" class="btn-wbw-toggle" id="btnToggleWbw"[\s\S]*?(?=<select id="verseJumperSelect")/, '');
code = code.replace(/<div class="wbw-modal-backdrop" id="wbwWordModal"[\s\S]*?<\/body>/, '</body>');

// 2. Boutons de contrôle (Mot à mot, Tajwīd, Bruit Brun)
const cibleApresZoom = `<select id="verseJumperSelect"`;
const htmlTroisBoutonsPropres = `<button type="button" class="btn-wbw-toggle" id="btnToggleWbw" onclick="basculerMotAMot()">📖 Mot à mot</button>
            <button type="button" class="btn-wbw-toggle" id="btnToggleTajweed" onclick="basculerTajweed()">🎨 Tajwīd</button>
            <div class="brown-noise-group" id="brownNoiseGroup">
              <button type="button" class="btn-wbw-toggle" id="btnToggleBrown" onclick="basculerBrownNoise()">🌊 Bruit Brun</button>
              <div class="brown-vol-box" id="brownVolBox" style="display:none;">
                <button type="button" class="btn-brown-vol" onclick="ajusterVolumeBrown(-0.08)" title="Baisser">−</button>
                <input type="range" id="brownVolSlider" class="brown-vol-slider" min="2" max="100" value="35" oninput="definirVolumeBrown(this.value)">
                <button type="button" class="btn-brown-vol" onclick="ajusterVolumeBrown(0.08)" title="Augmenter">+</button>
              </div>
            </div>
            <select id="verseJumperSelect"`;
code = code.replace(cibleApresZoom, htmlTroisBoutonsPropres);

// 3. Légende Tajwīd interactive
const cibleAudioTag = `<audio id="ayahAudio" preload="auto"></audio><audio id="preloadNextAudio" preload="auto" style="display:none;"></audio>`;
const htmlLegendeTajweed = cibleAudioTag + `
          <div id="tajweedLegendBar" class="tajweed-legend-bar" style="display:none;">
            <span class="taj-tooltip" data-title="Nasalisation (son par le nez) maintenue sur 2 temps."><i style="background:#4ade80"></i><b>Ghunnah / Ikhfā'</b></span>
            <span class="taj-tooltip" data-title="Rebond sonore (écho) sur la consonne."><i style="background:#38bdf8"></i><b>Qalqalah</b></span>
            <span class="taj-tooltip" data-title="Prolongation vocale du son (2 à 6 temps)."><i style="background:#f87171"></i><b>Madd (Prolongation)</b></span>
            <span class="taj-tooltip" data-title="Fusion de 2 lettres (Idghām) ou emphase (Tafkhīm)."><i style="background:#fbbf24"></i><b>Idghām / Tafkhīm</b></span>
            <span class="taj-tooltip" data-title="Lettre écrite mais qui ne se prononce pas."><i style="background:#64748b"></i><b>Lettre muette</b></span>
          </div>`;
code = code.replace(cibleAudioTag, htmlLegendeTajweed);

// 4. CSS Stylé pour les cartes et le Tajwīd
const cssComplet = `
    .btn-wbw-toggle { background:rgba(14,165,233,0.14); color:var(--sky-light); border:1px solid rgba(56,189,248,0.4); padding:6px 13px; border-radius:11px; font-family:inherit; font-size:0.81rem; font-weight:800; cursor:pointer; transition:0.22s; }
    .btn-wbw-toggle:hover, .btn-wbw-toggle.active { background:var(--sky-bright); color:#021019; box-shadow:0 0 16px rgba(56,189,248,0.48); }
    .brown-noise-group { display:inline-flex; align-items:center; gap:6px; background:rgba(6,12,20,0.65); border:1px solid rgba(56,189,248,0.28); padding:3px 6px; border-radius:13px; }
    .brown-vol-box { display:inline-flex; align-items:center; gap:5px; padding:0 4px; }
    .btn-brown-vol { background:rgba(56,189,248,0.15); color:var(--sky-light); border:1px solid rgba(56,189,248,0.35); width:24px; height:24px; border-radius:7px; font-weight:800; font-size:0.9rem; line-height:1; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; transition:0.18s; }
    .btn-brown-vol:hover { background:var(--sky-bright); color:#021019; }
    .brown-vol-slider { width:68px; height:5px; accent-color:#38bdf8; cursor:pointer; }
    .inline-clickable-word { display:inline-block; padding:2px 6px; border-radius:10px; cursor:pointer; transition:all 0.18s ease; border:1px solid transparent; }
    .inline-clickable-word:hover { background:rgba(56,189,248,0.15); transform:translateY(-2px); }
    .inline-clickable-word.playing { color:#fde047 !important; background:rgba(234,179,8,0.18); border-color:rgba(253,224,71,0.55); text-shadow:0 0 18px rgba(253,224,71,0.75) !important; transform:translateY(-3px) scale(1.06); }
    .wbw-stage-grid { position:relative; z-index:2; display:flex; flex-wrap:wrap; direction:rtl; justify-content:center; align-items:stretch; gap:14px 16px; margin-bottom:26px; padding:10px 6px; }
    .wbw-word-box { display:flex; flex-direction:column; align-items:center; justify-content:space-between; background:linear-gradient(145deg, rgba(12,22,35,0.88), rgba(6,12,20,0.94)); border:1.5px solid rgba(56,189,248,0.28); border-radius:18px; padding:14px 18px; min-width:104px; cursor:pointer; transition:all 0.2s ease; box-shadow:0 8px 24px rgba(0,0,0,0.45), inset 0 0 12px rgba(56,189,248,0.04); }
    .wbw-word-box:hover { transform:translateY(-4px); border-color:var(--sky-bright); background:linear-gradient(145deg, rgba(14,165,233,0.18), rgba(8,16,26,0.96)); box-shadow:0 12px 28px rgba(0,0,0,0.6), 0 0 20px rgba(56,189,248,0.32); }
    .wbw-word-box.playing { border-color:#fde047 !important; background:linear-gradient(145deg, rgba(234,179,8,0.24), rgba(14,165,233,0.18)) !important; box-shadow:0 14px 32px rgba(0,0,0,0.75), 0 0 26px rgba(253,224,71,0.48) !important; transform:translateY(-7px) scale(1.04) !important; z-index:5; }
    .wbw-word-box.playing .wbw-ar { color:#fde047 !important; text-shadow:0 0 18px rgba(253,224,71,0.7) !important; }
    .wbw-word-box.playing .wbw-tr { color:#fef08a !important; border-top-color:rgba(253,224,71,0.4) !important; }
    .wbw-ar { font-family:'Scheherazade New','Amiri',serif; font-size:2.55rem; line-height:1.55; color:#fff; margin-bottom:8px; text-align:center; transition:0.18s; }
    .wbw-tr { font-family:'Plus Jakarta Sans',sans-serif; font-size:0.82rem; font-weight:700; color:#bae6fd; direction:ltr; text-align:center; max-width:160px; line-height:1.35; border-top:1px solid rgba(56,189,248,0.22); padding-top:8px; width:100%; transition:0.18s; }

    tajweed, .tajweed { font-family:inherit; pointer-events:none; }
    tajweed[class*="ghunnah"], tajweed[class*="ikhf"], tajweed[class*="iqlab"], .ghunnah, .ikhafa, .ikhafa_shafawi, .iqlab { color:#4ade80 !important; text-shadow:0 0 10px rgba(74,222,128,0.4); }
    tajweed[class*="qalq"], tajweed[class*="qalaq"], .qalaqah, .qalqalah { color:#38bdf8 !important; text-shadow:0 0 10px rgba(56,189,248,0.45); }
    tajweed[class*="madd"], .madda_normal, .madda_permissible, .madda_necessary, .madda_obligatory { color:#f87171 !important; text-shadow:0 0 12px rgba(248,113,113,0.45); }
    tajweed[class*="idgham"], tajweed[class*="laam_shams"], tajweed[class*="tafkh"], .idgham_ghunnah, .idgham_wo_ghunnah, .idgham_shafawi, .laam_shamsiyah { color:#fbbf24 !important; text-shadow:0 0 10px rgba(251,191,36,0.35); }
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
    .wbw-pos-dot { width:9px; height:9px; border-radius:50%; background:#eab308; display:inline-block; margin-right:5px; }
    .wbw-big-word-card { background:#232218; border:1px solid rgba(234,179,8,0.28); border-radius:14px; padding:12px 26px; width:fit-content; margin:0 auto 14px auto; font-family:'Scheherazade New','Amiri',serif; font-size:3rem; color:#fde047; text-align:center; line-height:1.4; }
    .wbw-big-trans { font-size:1.22rem; font-weight:800; color:#fff; margin-bottom:18px; text-align:center; }
    .wbw-morph-row { display:grid; grid-template-columns:1fr 1fr auto; gap:10px; align-items:end; }
    .wbw-morph-col label { display:block; font-size:0.75rem; color:#94a3b8; margin-bottom:6px; font-weight:600; }
    .wbw-morph-pill { background:#232730; border:1px solid rgba(255,255,255,0.08); border-radius:99px; padding:9px 14px; text-align:center; font-family:'Scheherazade New','Amiri',serif; font-size:1.35rem; color:#fff; min-height:44px; display:flex; align-items:center; justify-content:center; }
    .wbw-audio-circle { width:46px; height:46px; border-radius:50%; background:#262b35; border:1px solid rgba(56,189,248,0.45); color:#fff; font-size:1.15rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:0.2s; }
    .wbw-audio-circle:hover { background:var(--sky-bright); color:#021019; }
    .wbw-cancel-btn { width:100%; margin-top:14px; background:transparent; border:none; color:#cbd5e1; font-weight:700; font-size:0.95rem; padding:10px; cursor:pointer; }
    .wbw-cancel-btn:hover { color:#fff; }
`;
code = code.replace('@media (max-width:768px)', cssComplet + '\n    @media (max-width:768px)');

// 6. Moteur JavaScript avec Dictionnaire de Traduction Localisée et Endpoints Tajwīd & Karaoké
const jsMoteurV9 = `
    let modeMotAMotActif = localStorage.getItem('coran_wbw_mode') === '1';
    let modeTajweedActif = localStorage.getItem('coran_tajweed_mode') === '1';
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
      fr: { btnWbw: "📖 Mot à mot", btnTaj: "🎨 Tajwīd", btnBrown: "🌊 Bruit Brun", pos: "Mot coranique", lemma: "Lemme / Forme dérivée :", root: "Racine (Root) :", close: "Fermer" },
      en: { btnWbw: "📖 Word by Word", btnTaj: "🎨 Tajweed", btnBrown: "🌊 Brown Noise", pos: "Quranic Word", lemma: "Lemma / Derived form:", root: "Root:", close: "Cancel" },
      es: { btnWbw: "📖 Palabra por palabra", btnTaj: "🎨 Tajwīd", btnBrown: "🌊 Ruido Marrón", pos: "Palabra coránica", lemma: "Lema / Forma derivada:", root: "Raíz (Root):", close: "Cerrar" },
      ar: { btnWbw: "📖 كلمة بكلمة", btnTaj: "🎨 التجويد", btnBrown: "🌊 ضوضاء بنية", pos: "كلمة قرآنية", lemma: "الصيغة المشتقة :", root: "الجذر اللغوي :", close: "إغلاق" }
    };

    const QDC_RECITER_IDS = {
      "Yasser_Ad-Dussary_128kbps": 13,
      "QDC_Maher_Haramain_HD": 9,
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

    async function traduireGlossaireVerset(mots, langCible, cleVerset) {
      if (langCible === 'ar') {
        mots.forEach(w => { w.tradLocalisee = ''; });
        return;
      }
      mots.forEach(w => {
        const u = w.text_uthmani || '';
        const sq = squeletteSansVoyelles(u);
        if (DICO_CORAN_EXACT[u] && DICO_CORAN_EXACT[u][langCible]) {
          w.tradLocalisee = DICO_CORAN_EXACT[u][langCible];
          return;
        }
        if (DICO_CORAN_EXACT[sq] && DICO_CORAN_EXACT[sq][langCible]) {
          w.tradLocalisee = DICO_CORAN_EXACT[sq][langCible];
          return;
        }
        const rawEn = (w.translation && w.translation.text) ? w.translation.text.replace(/[()]/g, '').trim().toLowerCase() : '';
        if (langCible === 'fr' && DICO_GLOSS_FR[rawEn]) {
          w.tradLocalisee = DICO_GLOSS_FR[rawEn];
          return;
        }
        if (langCible === 'es' && DICO_GLOSS_ES[rawEn]) {
          w.tradLocalisee = DICO_GLOSS_ES[rawEn];
          return;
        }
        w.tradLocalisee = w.translation ? w.translation.text : '';
      });
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

      prechargerSegmentsKaraoke();

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
          const tradAffichee = w.tradLocalisee || (w.translation ? w.translation.text : '');
          item.innerHTML = '<div class="wbw-ar">' + htmlMotArabe + '</div><div class="wbw-tr">' + tradAffichee + '</div>';
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

    function mettreAJourSurlignageKaraoke() {
      const mainAudioEl = document.getElementById('ayahAudio');
      if (!mainAudioEl || mainAudioEl.paused || !mainAudioEl.duration || isNaN(mainAudioEl.duration)) return;

      const totalMots = motsActuelsDuVerset.length;
      if (totalMots === 0) return;

      let activeIndex = -1;
      const selRec = document.getElementById('reciterSelect');
      const qdcId = (selRec && QDC_RECITER_IDS[selRec.value]) ? QDC_RECITER_IDS[selRec.value] : null;
      const chapData = qdcId ? cacheSegmentsRecitateur[qdcId + '_chap_' + numSourateActuelle] : null;
      const cleVerset = numSourateActuelle + ':' + numVersetActuel;
      const vt = (chapData && chapData.verse_timings) ? chapData.verse_timings.find(v => v.verse_key === cleVerset) : null;

      if (vt && vt.segments && vt.segments.length > 0) {
        const dureeQdcMs = Math.max(500, vt.timestamp_to - vt.timestamp_from);
        const ratioTemps = Math.min(1, Math.max(0, mainAudioEl.currentTime / mainAudioEl.duration));
        const msCalibre = ratioTemps * dureeQdcMs;

        for (let i = 0; i < vt.segments.length; i++) {
          const seg = vt.segments[i];
          if (seg && seg.length >= 3) {
            const startRel = seg[1] - vt.timestamp_from;
            const endRel = (seg[2] - vt.timestamp_from) + 120;
            if (msCalibre >= startRel && msCalibre <= endRel) { activeIndex = seg[0] - 1; break; }
          }
        }
      }

      if (activeIndex < 0 || activeIndex >= totalMots) {
        const ratio = Math.min(0.999, Math.max(0, mainAudioEl.currentTime / mainAudioEl.duration));
        for (let i = 0; i < totalMots; i++) {
          if (ratio >= motsActuelsDuVerset[i].ratioDebut && ratio <= motsActuelsDuVerset[i].ratioFin) {
            activeIndex = i; break;
          }
        }
      }

      document.querySelectorAll('.wbw-stage-grid .wbw-word-box').forEach((box, idx) => {
        box.classList.toggle('playing', idx === activeIndex);
      });
      document.querySelectorAll('#arabicVerseEl .inline-clickable-word').forEach((sp, idx) => {
        sp.classList.toggle('playing', idx === activeIndex);
      });
    }

    function eteindreSurlignageKaraoke() {
      document.querySelectorAll('.wbw-word-box.playing, .inline-clickable-word.playing').forEach(el => el.classList.remove('playing'));
    }

    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(chargerDonneesMotAMotEtTajweed, 60);

      const mainAudioEl = document.getElementById('ayahAudio');
      if (mainAudioEl) {
        mainAudioEl.addEventListener('play', () => prechargerSegmentsKaraoke());
        mainAudioEl.addEventListener('timeupdate', mettreAJourSurlignageKaraoke);
        mainAudioEl.addEventListener('pause', eteindreSurlignageKaraoke);
        mainAudioEl.addEventListener('ended', eteindreSurlignageKaraoke);
      }

      setInterval(() => {
        const lg = (typeof currentLang !== 'undefined' && ['fr','en','es','ar'].includes(currentLang)) ? currentLang : 'fr';
        const signatureActuelle = numSourateActuelle + ':' + numVersetActuel + '_' + lg + '_' + (modeMotAMotActif ? '1' : '0') + '_' + (modeTajweedActif ? '1' : '0');
        const arEl = document.getElementById('arabicVerseEl');
        const besoinMaj = (signatureActuelle !== dernierVersetCharge) || (!modeMotAMotActif && arEl && arEl.children.length === 0 && motsActuelsDuVerset.length > 0);
        if (besoinMaj) chargerDonneesMotAMotEtTajweed();
      }, 200);
    });
`;

try {
  new vm.Script(jsMoteurV9);
  console.log('✅ TEST SYNTAXE V9 OK !');
} catch (errSyntaxe) {
  console.error('❌ ERREUR SYNTAXE :', errSyntaxe);
  process.exit(1);
}

const blocHtmlEtScriptFinal = `
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
  <script>${jsMoteurV9}</script>
</body>`;

code = code.replace('</body>', blocHtmlEtScriptFinal);

fs.writeFileSync('generateur.js', code, 'utf8');
console.log('✅ CORRECTION FINALE APPLIQUÉE : Traduction française/espagnole restaurée + Tajwīd coloré actif + Boutons fonctionnels !');
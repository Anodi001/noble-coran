const fs = require('fs');

let code = fs.readFileSync('generateur.js', 'utf8');

// 1. RESTAURER LES 4 LANGUES (FR / EN / ES / AR) EN HAUT A DROITE SI ELLES ONT ÉTÉ SUPPRIMÉES
if (!code.includes('class="lang-switcher-group"')) {
  const cibleTagRev = `<span class="tag" id="revOrderTagEl">\${ordreRev}e Sourate révélée (n°\${numS})</span>`;
  const blocQuatreLangues = cibleTagRev + `
        <div class="lang-switcher-group">
          <button type="button" class="lang-pill-btn active" data-lang="fr" onclick="changerLangueVerset('fr')">🇫🇷 FR</button>
          <button type="button" class="lang-pill-btn" data-lang="en" onclick="changerLangueVerset('en')">🇬🇧 EN</button>
          <button type="button" class="lang-pill-btn" data-lang="es" onclick="changerLangueVerset('es')">🇪🇸 ES</button>
          <button type="button" class="lang-pill-btn" data-lang="ar" onclick="changerLangueVerset('ar')">🇸🇦 AR</button>
        </div>`;
  code = code.replace(cibleTagRev, blocQuatreLangues);
}

// 2. Nettoyage complet des versions précédentes du Mot-à-Mot / Tajwīd
code = code.replace(/\/\* BOUTONS MOT A MOT & TAJWEED \*\/[\s\S]*?(?=@media \(max-width:768px\))/, '');
code = code.replace(/<div id="tajweedLegendBar"[\s\S]*?<\/div>/g, '');
code = code.replace(/<div class="brown-noise-group"[\s\S]*?<\/div>/g, '');
code = code.replace(/<div class="wbw-modal-backdrop" id="wbwWordModal"[\s\S]*?<\/body>/, '</body>');

// 3. Ajout du contrôle de Bruit Brun (Brown Sound + Volume -/+) dans la barre du haut
if (!code.includes('id="btnToggleBrown"')) {
  const cibleBtnTaj = `<button type="button" class="btn-wbw-toggle" id="btnToggleTajweed" onclick="basculerTajweed()">🎨 Tajwīd</button>`;
  const ajoutBrownControls = cibleBtnTaj + `
            <div class="brown-noise-group" id="brownNoiseGroup">
              <button type="button" class="btn-wbw-toggle" id="btnToggleBrown" onclick="basculerBrownNoise()">🌊 Bruit Brun</button>
              <div class="brown-vol-box" id="brownVolBox" style="display:none;">
                <button type="button" class="btn-brown-vol" onclick="ajusterVolumeBrown(-0.08)" title="Baisser le bruit brun">−</button>
                <input type="range" id="brownVolSlider" class="brown-vol-slider" min="2" max="100" value="35" oninput="definirVolumeBrown(this.value)">
                <button type="button" class="btn-brown-vol" onclick="ajusterVolumeBrown(0.08)" title="Augmenter le bruit brun">+</button>
              </div>
            </div>`;
  code = code.replace(cibleBtnTaj, ajoutBrownControls);
}

// 4. Repère des couleurs Tajwīd bien rangé en haut dans la barre de contrôle
if (!code.includes('id="tajweedLegendBar"')) {
  const cibleAudioStrip = `<audio id="ayahAudio" preload="auto"></audio><audio id="preloadNextAudio" preload="auto" style="display:none;"></audio>`;
  const legendeDansBarreHaut = cibleAudioStrip + `
          <div id="tajweedLegendBar" class="tajweed-legend-bar" style="display:none;">
            <span><i style="background:#4ade80"></i>Ghunnah / Ikhfā'</span>
            <span><i style="background:#38bdf8"></i>Qalqalah</span>
            <span><i style="background:#f87171"></i>Madd (Prolongation)</span>
            <span><i style="background:#fbbf24"></i>Idghām / Tafkhīm</span>
            <span><i style="background:#64748b"></i>Lettre muette</span>
          </div>`;
  code = code.replace(cibleAudioStrip, legendeDansBarreHaut);
}

// 5. CSS V7 : Cartes Mot-à-Mot stylées avec Tajwīd actif + Contrôleur Bruit Brun + Pop-up épurée sans badge Sheikh
const cssWbwTajweedV7 = `
    /* BOUTONS MOT A MOT, TAJWEED & BRUIT BRUN */
    .btn-wbw-toggle { background:rgba(14,165,233,0.14); color:var(--sky-light); border:1px solid rgba(56,189,248,0.4); padding:6px 13px; border-radius:11px; font-family:inherit; font-size:0.81rem; font-weight:800; cursor:pointer; transition:0.22s; }
    .btn-wbw-toggle:hover, .btn-wbw-toggle.active { background:var(--sky-bright); color:#021019; box-shadow:0 0 16px rgba(56,189,248,0.48); }

    .brown-noise-group { display:inline-flex; align-items:center; gap:6px; background:rgba(6,12,20,0.65); border:1px solid rgba(56,189,248,0.28); padding:3px 6px; border-radius:13px; }
    .brown-vol-box { display:inline-flex; align-items:center; gap:5px; padding:0 4px; }
    .btn-brown-vol { background:rgba(56,189,248,0.15); color:var(--sky-light); border:1px solid rgba(56,189,248,0.35); width:24px; height:24px; border-radius:7px; font-weight:800; font-size:0.9rem; line-height:1; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; transition:0.18s; }
    .btn-brown-vol:hover { background:var(--sky-bright); color:#021019; }
    .brown-vol-slider { width:68px; height:5px; accent-color:#38bdf8; cursor:pointer; }

    /* MOTS CLIQUABLES DIRECTEMENT DANS LE VERSET NORMAL */
    .inline-clickable-word { display:inline-block; padding:0 5px; border-radius:8px; cursor:pointer; transition:all 0.15s ease; }
    .inline-clickable-word:hover { background:rgba(56,189,248,0.15); transform:translateY(-2px); }

    /* MODE MOT A MOT ULTRA STYLÉ (TAJWEED DIRECTEMENT DANS LES CARTES) */
    .wbw-stage-grid { position:relative; z-index:2; display:flex; flex-wrap:wrap; direction:rtl; justify-content:center; align-items:stretch; gap:14px 16px; margin-bottom:26px; padding:10px 6px; }
    .wbw-word-box { display:flex; flex-direction:column; align-items:center; justify-content:space-between; background:linear-gradient(145deg, rgba(12,22,35,0.88), rgba(6,12,20,0.94)); border:1.5px solid rgba(56,189,248,0.28); border-radius:18px; padding:14px 18px; min-width:104px; cursor:pointer; transition:all 0.2s ease; box-shadow:0 8px 24px rgba(0,0,0,0.45), inset 0 0 12px rgba(56,189,248,0.04); }
    .wbw-word-box:hover { transform:translateY(-4px); border-color:var(--sky-bright); background:linear-gradient(145deg, rgba(14,165,233,0.18), rgba(8,16,26,0.96)); box-shadow:0 12px 28px rgba(0,0,0,0.6), 0 0 20px rgba(56,189,248,0.32); }
    .wbw-ar { font-family:'Scheherazade New','Amiri',serif; font-size:2.55rem; line-height:1.55; color:#fff; margin-bottom:8px; text-align:center; }
    .wbw-tr { font-family:'Plus Jakarta Sans',sans-serif; font-size:0.82rem; font-weight:700; color:#bae6fd; direction:ltr; text-align:center; max-width:160px; line-height:1.35; border-top:1px solid rgba(56,189,248,0.22); padding-top:8px; width:100%; }

    /* COULEURS TAJWEED OFFICIELLES DANS LE VERSET ET DANS LES CARTES MOT A MOT */
    tajweed { font-family:inherit; pointer-events:none; }
    tajweed.ghunnah, tajweed.ikhafa, tajweed.ikhafa_shafawi, tajweed.iqlab { color:#4ade80 !important; text-shadow:0 0 10px rgba(74,222,128,0.35); }
    tajweed.qalaqah { color:#38bdf8 !important; text-shadow:0 0 10px rgba(56,189,248,0.4); }
    tajweed.madda_normal, tajweed.madda_permissible { color:#fb923c !important; text-shadow:0 0 10px rgba(251,146,60,0.35); }
    tajweed.madda_necessary, tajweed.madda_obligatory { color:#f87171 !important; text-shadow:0 0 12px rgba(248,113,113,0.45); }
    tajweed.idgham_ghunnah, tajweed.idgham_wo_ghunnah, tajweed.idgham_shafawi, tajweed.idgham_mutajanisayn, tajweed.idgham_mutaqaribayn, tajweed.laam_shamsiyah { color:#fbbf24 !important; }
    tajweed.ham_wasl, tajweed.slnt { color:#64748b !important; text-shadow:none !important; }

    /* REPERE TAJWEED EN HAUT */
    .tajweed-legend-bar { width:100%; display:flex; flex-wrap:wrap; justify-content:center; gap:14px; margin-top:4px; padding:8px 14px; background:rgba(4,9,16,0.65); border-top:1px solid rgba(56,189,248,0.18); border-radius:10px; font-size:0.74rem; font-weight:700; color:#cbd5e1; }
    .tajweed-legend-bar span { display:inline-flex; align-items:center; gap:6px; }
    .tajweed-legend-bar i { width:9px; height:9px; border-radius:50%; display:inline-block; }

    /* POP-UP CENTREE SANS BADGE SHEIKH EN HAUT A DROITE */
    .wbw-modal-backdrop { position:fixed; inset:0; background:rgba(0,0,0,0.72); backdrop-filter:blur(6px); z-index:9999; display:none; align-items:center; justify-content:center; padding:16px; }
    .wbw-modal-backdrop.open { display:flex; }
    .wbw-modal-sheet { width:100%; max-width:480px; background:#12151a; border:1px solid rgba(56,189,248,0.35); border-radius:24px; padding:22px; color:#fff; box-shadow:0 15px 50px rgba(0,0,0,0.88); animation:wbwSlideUp 0.18s ease-out; }
    @keyframes wbwSlideUp { from { transform:scale(0.95); opacity:0; } to { transform:scale(1); opacity:1; } }
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
    .wbw-audio-circle:hover { background:var(--sky-bright); color:#021019; transform:scale(1.06); }
    .wbw-cancel-btn { width:100%; margin-top:14px; background:transparent; border:none; color:#cbd5e1; font-weight:700; font-size:0.95rem; padding:10px; cursor:pointer; }
    .wbw-cancel-btn:hover { color:#fff; }
`;

code = code.replace('@media (max-width:768px)', cssWbwTajweedV7 + '\n    @media (max-width:768px)');

// 6. Moteur JS V7 : Zéro antislash (100% compatible generateur.js) + Tajwīd dans chaque carte + Générateur Bruit Brun
const scriptWbwEtModalV7 = `
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
    let cacheWbwData = {};
    let cacheTradMot = {};
    let cacheSegmentsRecitateur = {};
    let timerArretSegment = null;

    // GENERATEUR DE BRUIT BRUN (BROWN SOUND) HAUTE QUALITÉ (WEB AUDIO API)
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

      // Filtre passe-bas doux à 420 Hz pour une ambiance profonde et relaxante
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
        if (brownAudioCtx && brownAudioCtx.state === 'suspended') {
          brownAudioCtx.resume();
        }
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
      fr: { btnWbw: "📖 Mot à mot", btnTaj: "🎨 Tajwīd", btnBrown: "🌊 Bruit Brun", pos: "Mot coranique", muq: "Lettres Mystérieuses (Muqatta'āt)", lemma: "Lemme / Forme dérivée :", root: "Racine (Root) :", close: "Fermer" },
      en: { btnWbw: "📖 Word by Word", btnTaj: "🎨 Tajweed", btnBrown: "🌊 Brown Noise", pos: "Quranic Word", muq: "Mysterious Letters (Muqatta'āt)", lemma: "Lemma / Derived form:", root: "Root:", close: "Cancel" },
      es: { btnWbw: "📖 Palabra por palabra", btnTaj: "🎨 Tajwīd", btnBrown: "🌊 Ruido Marrón", pos: "Palabra coránica", muq: "Letras Misteriosas (Muqatta'āt)", lemma: "Lema / Forma derivada:", root: "Raíz (Root):", close: "Cerrar" },
      ar: { btnWbw: "📖 كلمة بكلمة", btnTaj: "🎨 التجويد", btnBrown: "🌊 ضوضاء بنية", pos: "كلمة قرآنية", muq: "حروف مقطعة", lemma: "الصيغة المشتقة :", root: "الجذر اللغوي :", close: "إغلاق" }
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
      "المص": { fr: "Alif, Lām, Mīm, Sād", en: "Alif, Lām, Mīm, Sād", es: "Alif, Lām, Mīm, Sād", ar: "ألف لام ميم صاد" },
      "الر": { fr: "Alif, Lām, Rā", en: "Alif, Lām, Rā", es: "Alif, Lām, Rā", ar: "ألف لام را" },
      "المر": { fr: "Alif, Lām, Mīm, Rā", en: "Alif, Lām, Mīm, Rā", es: "Alif, Lām, Mīm, Rā", ar: "ألف لام ميم را" },
      "كهيعص": { fr: "Kāf, Hā, Yā, 'Ayn, Sād", en: "Kāf, Hā, Yā, 'Ayn, Sād", es: "Kāf, Hā, Yā, 'Ayn, Sād", ar: "كاف ها يا عين صاد" },
      "طه": { fr: "Tā, Hā", en: "Tā, Hā", es: "Tā, Hā", ar: "طا ها" },
      "طسم": { fr: "Tā, Sīn, Mīm", en: "Tā, Sīn, Mīm", es: "Tā, Sīn, Mīm", ar: "طا سين ميم" },
      "طس": { fr: "Tā, Sīn", en: "Tā, Sīn", es: "Tā, Sīn", ar: "طا سين" },
      "يس": { fr: "Yā, Sīn", en: "Yā, Sīn", es: "Yā, Sīn", ar: "يا سين" },
      "ص": { fr: "Sād", en: "Sād", es: "Sād", ar: "صاد" },
      "حم": { fr: "Hā, Mīm", en: "Hā, Mīm", es: "Hā, Mīm", ar: "حا ميم" },
      "عسق": { fr: "'Ayn, Sīn, Qāf", en: "'Ayn, Sīn, Qāf", es: "'Ayn, Sīn, Qāf", ar: "عين سين قاف" },
      "ق": { fr: "Qāf", en: "Qāf", es: "Qāf", ar: "قاف" },
      "ن": { fr: "Nūn", en: "Nūn", es: "Nūn", ar: "نون" },
      "بِسْمِ": { fr: "Au nom", en: "In the name", es: "En el nombre", ar: "بِسْمِ" },
      "ٱللَّهِ": { fr: "d'Allah", en: "of Allah", es: "de Allah", ar: "ٱللَّهِ" },
      "ٱلرَّحْمَـٰنِ": { fr: "le Tout Miséricordieux", en: "the Most Gracious", es: "el Clemente", ar: "ٱلرَّحْمَـٰنِ" },
      "ٱلرَّحِيمِ": { fr: "le Très Miséricordieux", en: "the Most Merciful", es: "el Misericordioso", ar: "ٱلرَّحِيمِ" },
      "ذَٰلِكَ": { fr: "Ce (Voici)", en: "This / That", es: "Este", ar: "ذَٰلِكَ" },
      "ٱلْكِتَـٰبُ": { fr: "le Livre", en: "the Book", es: "el Libro", ar: "ٱلْكِتَـٰبُ" },
      "لَا": { fr: "aucun (pas de)", en: "no", es: "ninguna", ar: "لَا" },
      "رَيْبَ": { fr: "doute", en: "doubt", es: "duda", ar: "رَيْبَ" },
      "فِيهِ": { fr: "à son sujet (en lui)", en: "in it", es: "en él", ar: "فِيهِ" },
      "هُدًى": { fr: "un guide", en: "a guidance", es: "una guía", ar: "هُدًى" },
      "لِّلْمُتَّقِينَ": { fr: "pour les pieux", en: "for the righteous", es: "para los piadosos", ar: "لِّلْمُتَّقِينَ" }
    };

    const DICO_GLOSS_ANGLAIS = {
      "that": { fr: "Ce / Cela", es: "Ese / Este" },
      "this": { fr: "Ce / Ceci", es: "Este" },
      "the book": { fr: "le Livre", es: "el Libro" },
      "no": { fr: "aucun / pas de", es: "ningún / no" },
      "doubt": { fr: "doute", es: "duda" },
      "in it": { fr: "en lui / à son sujet", es: "en él" },
      "guidance": { fr: "un guide", es: "una guía" },
      "a guidance": { fr: "un guide", es: "una guía" },
      "for the righteous": { fr: "pour les pieux", es: "para los piadosos" },
      "for those who fear allah": { fr: "pour les pieux", es: "para los piadosos" },
      "and those who": { fr: "Et ceux qui", es: "Y quienes" },
      "believe": { fr: "croient", es: "creen" },
      "in what": { fr: "en ce qui", es: "en lo que" },
      "is sent down": { fr: "a été révélé (descendu)", es: "fue revelado" },
      "was sent down": { fr: "a été révélé (descendu)", es: "fue revelado" },
      "sent down": { fr: "révélé (descendu)", es: "revelado" },
      "to you": { fr: "à toi", es: "a ti" },
      "and what": { fr: "et en ce qui", es: "y en lo que" },
      "from": { fr: "avant / de", es: "de" },
      "before you": { fr: "avant toi", es: "antes de ti" },
      "and in the hereafter": { fr: "et en l'au-delà", es: "y en el Más Allá" },
      "they": { fr: "eux", es: "ellos" },
      "firmly believe": { fr: "ont la certitude", es: "tienen certeza" },
      "so today": { fr: "Aujourd'hui donc", es: "Así que hoy" },
      "we will save you": { fr: "Nous te sauverons", es: "te salvaremos" },
      "in your body": { fr: "dans ton corps", es: "en tu cuerpo" },
      "that you may be": { fr: "afin que tu sois", es: "para que seas" },
      "for those who": { fr: "pour ceux qui", es: "para quienes" },
      "succeed you": { fr: "viendront après toi", es: "vendrán después de ti" },
      "a sign": { fr: "un signe", es: "una señal" },
      "and indeed": { fr: "Et certes", es: "Y ciertamente" },
      "many": { fr: "beaucoup", es: "muchos" },
      "among": { fr: "parmi", es: "entre" },
      "the people": { fr: "les gens (l'humanité)", es: "la gente" },
      "of": { fr: "de", es: "de" },
      "our signs": { fr: "Nos signes (versets)", es: "Nuestros signos" },
      "signs": { fr: "signes (versets)", es: "signos" },
      "are surely heedless": { fr: "sont certes inattentifs", es: "están desatentos" }
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

    function nettoyerParentheses(str) {
      let out = '';
      const s = str || '';
      for (let i = 0; i < s.length; i++) {
        if (s[i] !== '(' && s[i] !== ')') out += s[i];
      }
      return out.trim();
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

    function estLettreMysterieuse(motArabe) {
      const sq = squeletteSansVoyelles(motArabe);
      return Boolean(DICO_CORAN_EXACT[sq] && numVersetActuel <= 2);
    }

    function extraireRacinePropre(motArabe) {
      let s = squeletteSansVoyelles(motArabe);
      if (s.startsWith('وال') || s.startsWith('فال') || s.startsWith('بال') || s.startsWith('كال')) s = s.slice(3);
      else if (s.startsWith('ال') || s.startsWith('لل')) s = s.slice(2);
      return s || motArabe;
    }

    // Découpeur HTML Tajwīd 100% SANS REGEX NI ANTISLASH : sépare chaque mot arabe avec ses balises <tajweed>
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
        if (ch === '<') {
          profTag++;
          courant += ch;
        } else if (ch === '>') {
          if (profTag > 0) profTag--;
          courant += ch;
        } else if ((ch === ' ' || ch === '\n' || ch === '\t') && profTag === 0) {
          if (courant.trim().length > 0) {
            tokens.push(courant.trim());
            courant = '';
          }
        } else {
          courant += ch;
        }
      }
      if (courant.trim().length > 0) tokens.push(courant.trim());

      // Garde uniquement les vrais mots contenant des lettres arabes (ignore les signes de pause isolés ۛ)
      return tokens.filter(tok => squeletteSansVoyelles(tok).length > 0);
    }

    function majTextesInterfaceWbw() {
      const lg = (typeof currentLang !== 'undefined' && UI_WBW_I18N[currentLang]) ? currentLang : 'fr';
      const t = UI_WBW_I18N[lg];
      const bW = document.getElementById('btnToggleWbw');
      const bT = document.getElementById('btnToggleTajweed');
      const bB = document.getElementById('btnToggleBrown');
      if (bW) {
        bW.textContent = t.btnWbw;
        bW.style.display = (lg === 'ar') ? 'none' : 'inline-block';
      }
      if (bT) bT.textContent = t.btnTaj;
      if (bB) bB.textContent = t.btnBrown;
      const lLem = document.getElementById('wbwLabelLemma');
      if (lLem) lLem.textContent = t.lemma;
      const lRoot = document.getElementById('wbwLabelRoot');
      if (lRoot) lRoot.textContent = t.root;
      const bCl = document.getElementById('wbwModalCancelBtn');
      if (bCl) bCl.textContent = t.close;
    }

    async function traduireGlossaireVerset(mots, langCible, cleVerset) {
      if (langCible === 'ar') {
        mots.forEach(w => { w.tradLocalisee = ''; });
        return;
      }
      if (langCible === 'en') {
        mots.forEach(w => {
          const sq = squeletteSansVoyelles(w.text_uthmani);
          w.tradLocalisee = (DICO_CORAN_EXACT[sq] && DICO_CORAN_EXACT[sq].en) ? DICO_CORAN_EXACT[sq].en : ((w.translation && w.translation.text) ? w.translation.text : '');
        });
        return;
      }

      const cleTrad = cleVerset + '_' + langCible;
      if (cacheTradMot[cleTrad]) {
        mots.forEach((w, i) => { w.tradLocalisee = cacheTradMot[cleTrad][i]; });
        return;
      }

      const promesses = mots.map(async (w) => {
        const u = w.text_uthmani || '';
        const sq = squeletteSansVoyelles(u);
        if (DICO_CORAN_EXACT[u] && DICO_CORAN_EXACT[u][langCible]) return DICO_CORAN_EXACT[u][langCible];
        if (DICO_CORAN_EXACT[sq] && DICO_CORAN_EXACT[sq][langCible]) return DICO_CORAN_EXACT[sq][langCible];

        const rawEn = (w.translation && w.translation.text) ? nettoyerParentheses(w.translation.text) : '';
        const cleanLow = rawEn.toLowerCase();
        if (DICO_GLOSS_ANGLAIS[cleanLow] && DICO_GLOSS_ANGLAIS[cleanLow][langCible]) {
          return DICO_GLOSS_ANGLAIS[cleanLow][langCible];
        }
        if (!rawEn) return '';

        try {
          const urlG = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + langCible + '&dt=t&q=' + encodeURIComponent(rawEn);
          const r = await fetch(urlG);
          const d = await r.json();
          return (d && d[0] && d[0][0] && d[0][0][0]) ? d[0][0][0] : rawEn;
        } catch (e) {
          return rawEn;
        }
      });

      const resultats = await Promise.all(promesses);
      cacheTradMot[cleTrad] = resultats;
      mots.forEach((w, i) => { w.tradLocalisee = resultats[i]; });
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

      if (!cacheWbwData[cleVerset]) {
        try {
          const url = 'https://api.quran.com/api/v4/verses/by_key/' + cleVerset + '?language=en&words=true&word_fields=text_uthmani,text_uthmani_tajweed,audio_url&fields=text_uthmani_tajweed';
          const resp = await fetch(url);
          const json = await resp.json();
          if (json && json.verse) cacheWbwData[cleVerset] = json.verse;
        } catch (err) {
          return;
        }
      }

      const dataVerset = cacheWbwData[cleVerset];
      if (!dataVerset || !dataVerset.words) return;

      const vraisMots = dataVerset.words.filter(w => w.char_type_name === 'word');
      const tokensTajweed = extraireMotsTajweedPropres(dataVerset.text_uthmani_tajweed);

      vraisMots.forEach((w, idx) => {
        w.indexMotReel = idx + 1;
        w.totalMotsVerset = vraisMots.length;
        // Assigne le mot Tajwīd exact à chaque carte (sans jamais mettre tout le verset dans la 1re carte !)
        if (w.text_uthmani_tajweed) {
          w.htmlTajweedMot = w.text_uthmani_tajweed;
        } else if (tokensTajweed.length === vraisMots.length && tokensTajweed[idx]) {
          w.htmlTajweedMot = tokensTajweed[idx];
        } else {
          w.htmlTajweedMot = w.text_uthmani;
        }
      });

      await traduireGlossaireVerset(vraisMots, langSite, cleVerset);

      if (!afficherMotAMot) {
        // Mode Verset Normal ou Tajwīd seul (sans les cartes Mot à Mot)
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
        // Mode Mot à Mot activé : cache totalement le verset du haut (plus de bloc jaune !) et colorie chaque carte en Tajwīd !
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

    async function jouerAudioMotVoixRecitateur(w) {
      const playerMot = document.getElementById('wbwSingleWordAudio');
      const selRec = document.getElementById('reciterSelect');
      if (!playerMot || !selRec) return;

      if (timerArretSegment) {
        clearTimeout(timerArretSegment);
        timerArretSegment = null;
      }
      playerMot.pause();

      const reciterVal = selRec.value;
      const posMot = w.indexMotReel || 1;
      const totalMots = w.totalMotsVerset || 1;

      // Uniquement pour les Lettres Mystérieuses (ex: 2:1 Alif-Lam-Mim) : utilise la voix du récitateur choisi
      if (totalMots === 1 || estLettreMysterieuse(w.text_uthmani)) {
        const urlRecitateur = reciterVal === "QDC_Maher_Haramain_HD"
          ? ("https://everyayah.com/data/Maher_AlMuaiqly_64kbps/" + codeAudio + ".mp3")
          : ("https://everyayah.com/data/" + reciterVal + "/" + codeAudio + ".mp3");
        playerMot.src = urlRecitateur;
        playerMot.currentTime = 0;
        playerMot.play().catch(()=>{});
        return;
      }

      // Pour tous les autres mots : lecture directe du mot isolé officiel (clair et instantané)
      const pad3 = n => String(n).padStart(3, '0');
      const fichierMp3 = pad3(numSourateActuelle) + '_' + pad3(numVersetActuel) + '_' + pad3(posMot) + '.mp3';
      playerMot.src = 'https://audio.qurancdn.com/wbw/' + fichierMp3;
      playerMot.play().catch(()=>{});
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

      const posEl = document.getElementById('wbwModalPosLabel');
      if (posEl) {
        posEl.innerHTML = '<i class="wbw-pos-dot"></i>' + (estLettreMysterieuse(w.text_uthmani) ? t.muq : t.pos);
      }

      const squelette = extraireRacinePropre(w.text_uthmani);
      document.getElementById('wbwModalLemma').textContent = w.text_uthmani;
      document.getElementById('wbwModalRoot').textContent = squelette.split('').join(' ');

      const btnAudio = document.getElementById('wbwModalAudioBtn');
      btnAudio.onclick = () => jouerAudioMotVoixRecitateur(w);

      modal.classList.add('open');
    }

    function fermerModalMot() {
      const playerMot = document.getElementById('wbwSingleWordAudio');
      if (playerMot) playerMot.pause();
      if (timerArretSegment) clearTimeout(timerArretSegment);
      const modal = document.getElementById('wbwWordModal');
      if (modal) modal.classList.remove('open');
    }

    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(chargerDonneesMotAMotEtTajweed, 60);
      document.addEventListener('click', (e) => {
        if (e.target.closest('.lang-pill-btn') || e.target.closest('.btn-blue-nav')) {
          setTimeout(chargerDonneesMotAMotEtTajweed, 140);
        }
      });
      const jumper = document.getElementById('verseJumperSelect');
      if (jumper) jumper.addEventListener('change', () => setTimeout(chargerDonneesMotAMotEtTajweed, 140));
    });
  </script>
</body>`;

code = code.replace('</body>', scriptWbwEtModalV7);

fs.writeFileSync('generateur.js', code, 'utf8');
console.log('✅ V7 INSTALLÉE : 4 Langues restaurées + Bloc jaune supprimé + Tajwīd dans les cartes vertes + Bruit Brun (-/+) + Badge Sheikh retiré !');
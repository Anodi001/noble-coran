const fs = require('fs');

let code = fs.readFileSync('generateur.js', 'utf8');

// 1. Remplacement de la légende Tajwīd par la version avec Info-bulles (Tooltips)
const ancienneLegende = /<div id="tajweedLegendBar"[\s\S]*?<\/div>/;
const nouvelleLegendeTooltips = `<div id="tajweedLegendBar" class="tajweed-legend-bar" style="display:none;">
            <span class="taj-tooltip" data-title="Nasalisation (son par le nez) maintenue sur 2 temps."><i style="background:#4ade80"></i>Ghunnah / Ikhfā'</span>
            <span class="taj-tooltip" data-title="Rebond sonore (écho) sur la consonne."><i style="background:#38bdf8"></i>Qalqalah</span>
            <span class="taj-tooltip" data-title="Prolongation obligatoire du son (4 à 6 temps)."><i style="background:#f87171"></i>Madd (Prolongation)</span>
            <span class="taj-tooltip" data-title="Fusion de 2 lettres (Idghām) ou emphase/son grave (Tafkhīm)."><i style="background:#fbbf24"></i>Idghām / Tafkhīm</span>
            <span class="taj-tooltip" data-title="Lettre écrite mais qui ne se prononce pas."><i style="background:#64748b"></i>Lettre muette</span>
          </div>`;
code = code.replace(ancienneLegende, nouvelleLegendeTooltips);

// 2. Ajout du CSS pour les Info-bulles Tajwīd et l'effet lumineux du mot "En cours de lecture" (.playing)
const cssNouveau = `
    /* INFO-BULLES EXPLICATIVES DU TAJWEED */
    .taj-tooltip { position:relative; cursor:help; }
    .taj-tooltip:hover::after { content:attr(data-title); position:absolute; bottom:140%; left:50%; transform:translateX(-50%); background:rgba(4,10,20,0.95); color:#bae6fd; padding:7px 14px; border-radius:10px; border:1px solid rgba(56,189,248,0.45); font-size:0.75rem; white-space:nowrap; box-shadow:0 8px 20px rgba(0,0,0,0.7); z-index:10; pointer-events:none; font-weight:700; backdrop-filter:blur(4px); }

    /* EFFET KARAOKÉ : SURLIGNAGE DYNAMIQUE DU MOT ACTIF */
    .wbw-word-box.playing { 
      border-color:#fde047 !important; 
      background:linear-gradient(145deg, rgba(234,179,8,0.2), rgba(10,18,28,0.96)) !important; 
      box-shadow:0 15px 35px rgba(0,0,0,0.75), 0 0 25px rgba(253,224,71,0.4) !important; 
      transform:translateY(-8px) scale(1.03) !important; 
      z-index:5; 
    }
    .wbw-word-box.playing .wbw-ar { color:#fde047 !important; text-shadow:0 0 18px rgba(253,224,71,0.6) !important; }
`;

code = code.replace('/* POP-UP CENTREE SANS BADGE SHEIKH EN HAUT A DROITE */', cssNouveau + '\n    /* POP-UP CENTREE SANS BADGE SHEIKH EN HAUT A DROITE */');

// 3. Moteur JavaScript de synchronisation audio milliseconde (Karaoké Word-by-Word)
const scriptSynchroMot = `
    // MOTEUR DE SYNCHRONISATION KAKAOÉ (SURLIGNAGE DYNAMIQUE)
    const mainAudioEl = document.getElementById('ayahAudio');
    if (mainAudioEl) {
      mainAudioEl.addEventListener('timeupdate', () => {
        if (!modeMotAMotActif) return;
        const selRec = document.getElementById('reciterSelect');
        const qdcId = selRec ? QDC_RECITER_IDS[selRec.value] : null;
        if (!qdcId) return;

        const chapData = cacheSegmentsRecitateur[qdcId + '_chap_' + numSourateActuelle];
        if (!chapData || !chapData.verse_timings) return;

        const cleVerset = numSourateActuelle + ':' + numVersetActuel;
        const vt = chapData.verse_timings.find(v => v.verse_key === cleVerset);
        if (!vt || !vt.segments) return;

        // Le temps actuel de la piste audio principale en millisecondes
        const currentMs = mainAudioEl.currentTime * 1000;
        let activeIndex = -1;

        for (let i = 0; i < vt.segments.length; i++) {
          const seg = vt.segments[i];
          const relativeStart = seg[1] - vt.timestamp_from;
          const relativeEnd = (seg[2] - vt.timestamp_from) + 150; // Marge de 150ms pour une transition plus fluide
          
          if (currentMs >= relativeStart && currentMs <= relativeEnd) {
            activeIndex = seg[0] - 1;
            break;
          }
        }

        const boxes = document.querySelectorAll('.wbw-stage-grid .wbw-word-box');
        boxes.forEach((box, idx) => {
          if (idx === activeIndex) {
            if (!box.classList.contains('playing')) box.classList.add('playing');
          } else {
            box.classList.remove('playing');
          }
        });
      });

      // Éteindre les lumières quand on met pause ou que le verset est terminé
      mainAudioEl.addEventListener('pause', () => document.querySelectorAll('.wbw-word-box.playing').forEach(b => b.classList.remove('playing')));
      mainAudioEl.addEventListener('ended', () => document.querySelectorAll('.wbw-word-box.playing').forEach(b => b.classList.remove('playing')));
    }

    window.addEventListener('DOMContentLoaded', () => {`;

code = code.replace("window.addEventListener('DOMContentLoaded', () => {", scriptSynchroMot);

fs.writeFileSync('generateur.js', code, 'utf8');
console.log('✅ SUCCÈS : Explications Tajwīd interactives et Surlignage dynamique Karaoké installés !');
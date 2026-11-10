const fs = require('fs');

let code = fs.readFileSync('generateur.js', 'utf8');

// 1. Supprimer l'ancienne barre audio du bas
const regexAncienneBarre = /<div class="audio-control-strip">[\s\S]*?<article class="tafsir-box">/;
code = code.replace(regexAncienneBarre, '<article class="tafsir-box">');

// 2. Ajouter la nouvelle barre audio en haut (avec Maher Al-Muaiqly 128kbps)
const cibleHaut = `<section class="verse-stage \${vObj.miracle ? 'is-miracle-stage' : ''}" id="verseStage">`;
const nouvelleBarreHaut = `<div class="audio-control-strip" style="margin-bottom: 18px;">
          <div class="audio-left">
            <select id="reciterSelect" class="reciter-mini" onchange="changerRecitateur()">
              <option value="MaherAlMuaiqly128kbps">Maher Al-Muaiqly (HD)</option>
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
            <select id="verseJumperSelect" class="verse-jumper-select \${vObj.miracle ? 'is-miracle-gold' : ''}" onchange="naviguerVerset(event, this.value, false)">\${opts}</select>
          </div>
          <label class="auto-scroll-toggle"><input type="checkbox" id="autoNextCheck"><span class="switch-slider"></span><span class="switch-text" id="switchAutoTextEl">Enchaîner automatiquement</span></label>
          <audio id="ayahAudio" preload="auto"></audio><audio id="preloadNextAudio" preload="auto" style="display:none;"></audio>
        </div>
        <section class="verse-stage \${vObj.miracle ? 'is-miracle-stage' : ''}" id="verseStage">`;

code = code.replace(cibleHaut, nouvelleBarreHaut);

// 3. Centrer les boutons Lecture et Rejouer entre Précédent et Suivant
const regexNav = /<div class="stage-blue-nav">[\s\S]*?<\/div>/;
const nouvelleNav = `<div class="stage-blue-nav">
            <a href="\${vObj.lienPrecedent}" id="prevVerseLink" class="btn-blue-nav" onclick="return naviguerVerset(event, this.getAttribute('href'), false)">‹ Précédent</a>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
              <button type="button" class="btn-listen-sync" id="playSyncBtn" onclick="toggleAudioSync()">▶ Écouter le verset</button>
              <button type="button" class="btn-replay-sync" id="replaySyncBtn" onclick="rejouerAudioVerset()">↺ Rejouer</button>
            </div>
            <a href="\${vObj.lienSuivant}" id="nextVerseLink" class="btn-blue-nav" onclick="return naviguerVerset(event, this.getAttribute('href'), false)">Suivant ›</a>
          </div>`;

code = code.replace(regexNav, nouvelleNav);

fs.writeFileSync('generateur.js', code, 'utf8');
console.log('✅ DESIGN MIS À JOUR : Audio en haut, Boutons centrés, Maher Al-Muaiqly HD ajouté !');
const fs = require('fs');
const path = require('path');

const codeGenerateurVideo = `
/* --- GENERATEUR DE VIDEO TIKTOK DIRECT (9:16) --- */
(function() {
  function creerBoutonVideoTikTok() {
    if (document.getElementById('wbwVideoGenBtnV118')) return;
    
    var cible = document.getElementById('wbwShareBtnV118') || document.getElementById('wbwAudioRangeBtnV110') || document.querySelector('.rp-btn');
    if (!cible || !cible.parentElement) return;

    var btnVid = document.createElement('button');
    btnVid.type = 'button';
    btnVid.id = 'wbwVideoGenBtnV118';
    btnVid.innerHTML = '🎥 Générer Vidéo TikTok';
    btnVid.style.cssText = 'background:rgba(239, 68, 68, 0.16); color:#fca5a5; border:1px solid rgba(239, 68, 68, 0.45); padding:6px 13px; border-radius:11px; font-family:inherit; font-size:0.81rem; font-weight:800; cursor:pointer; transition:all 0.2s ease; display:inline-flex; align-items:center; gap:6px; margin-left:8px;';
    
    btnVid.onmouseover = function() {
      this.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
      this.style.color = '#ffffff';
    };
    btnVid.onmouseout = function() {
      this.style.background = 'rgba(239, 68, 68, 0.16)';
      this.style.color = '#fca5a5';
    };

    btnVid.onclick = function() {
      if (typeof MediaRecorder === 'undefined') {
        alert('Votre navigateur ne supporte pas l\\'enregistrement vidéo direct. Utilisez Google Chrome ou Edge sur PC.');
        return;
      }

      var aud = document.getElementById('ayahAudio');
      if (!aud || !aud.src) {
        alert('Veuillez lancer l\\'audio du verset au moins une fois avant de générer la vidéo.');
        return;
      }

      // Création d'une modale de progression de l\\'enregistrement
      var overlay = document.createElement('div');
      overlay.id = 'wbwVideoModalV118';
      overlay.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:100000; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; font-family:inherit;';
      overlay.innerHTML = '<div style="background:#14171c; border:1px solid rgba(56,189,248,0.3); padding:30px; border-radius:20px; text-align:center; max-width:400px;">' +
        '<h3 style="color:#38bdf8; margin-top:0;">🎥 Génération de la vidéo TikTok</h3>' +
        '<p id="wbwVidStatus" style="font-size:0.9rem; color:#cbd5e1;">Préparation de l\\'enregistrement...</p>' +
        '<div style="width:100%; background:#1e232b; height:8px; border-radius:99px; overflow:hidden; margin-top:15px;">' +
        '<div id="wbwVidBar" style="width:0%; background:#38bdf8; height:100%; transition:width 0.1s linear;"></div>' +
        '</div></div>';
      document.body.appendChild(overlay);

      // Lancer la lecture audio depuis le début
      aud.currentTime = 0;
      var dureeTotale = aud.duration && isFinite(aud.duration) ? aud.duration : 6;
      
      var playBtn = document.getElementById('playSyncBtn');
      if (playBtn) playBtn.click();
      else aud.play().catch(function(){});

      // Capturer le flux de la zone principale du verset ou de l\\'écran
      var stageEl = document.querySelector('.verse-stage') || document.querySelector('body');
      
      setTimeout(function() {
        try {
          // Utilisation de canvas ou capture de flux si supporté, sinon capture du conteneur
          var canvasContainer = document.querySelector('#fullPageSkyCanvas') || document.querySelector('canvas');
          var stream;
          
          if (canvasContainer && canvasContainer.captureStream) {
            stream = canvasContainer.captureStream(30);
          } else if (stageEl.captureStream) {
            stream = stageEl.captureStream(30);
          } else {
            // Fallback flux écran global
            navigator.mediaDevices.getDisplayMedia({video: {mediaSource: "screen"}}).then(function(s) {
              lancerEnregistrementFlux(s, aud, dureeTotale, overlay);
            }).catch(function(err) {
              overlay.remove();
              alert('Erreur de capture : ' + err.message);
            });
            return;
          }
          lancerEnregistrementFlux(stream, aud, dureeTotale, overlay);
        } catch(e) {
          overlay.remove();
          alert('Impossible de lancer l\\'enregistrement automatique : ' + e.message);
        }
      }, 500);
    };

    cible.parentElement.insertBefore(btnVid, cible.nextSibling);
  }

  function lancerEnregistrementFlux(stream, aud, dureeTotale, overlay) {
    var chunks = [];
    var options = { mimeType: 'video/webm; codecs=vp9' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: 'video/webm' };
    }

    var recorder;
    try {
      recorder = new MediaRecorder(stream, options);
    } catch (err) {
      overlay.remove();
      alert('Format MediaRecorder non supporté : ' + err.message);
      return;
    }

    recorder.ondataavailable = function(e) {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = function() {
      var blob = new Blob(chunks, { type: 'video/webm' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'coran-tiktok-verset.webm';
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
      overlay.remove();
      alert('✅ Vidéo TikTok générée et téléchargée avec succès ! Vous pouvez la poster directement.');
    };

    recorder.start();
    var debut = Date.now();
    var interval = setInterval(function() {
      var ecoule = (Date.now() - debut) / 1000;
      var pct = Math.min(100, Math.round((ecoule / dureeTotale) * 100));
      var bar = document.getElementById('wbwVidBar');
      var status = document.getElementById('wbwVidStatus');
      if (bar) bar.style.width = pct + '%';
      if (status) status.textContent = 'Enregistrement en cours... ' + Math.round(ecoule) + 's / ' + Math.round(dureeTotale) + 's';

      if (ecoule >= dureeTotale || aud.ended) {
        clearInterval(interval);
        try { recorder.stop(); } catch(err){}
        if (!aud.paused) aud.pause();
      }
    }, 200);
  }

  setInterval(creerBoutonVideoTikTok, 1500);
})();
`;

// Ajouter ce code à patch-mot-a-mot.js
const cheminPatch = path.join(__dirname, 'patch-mot-a-mot.js');
if (fs.existsSync(cheminPatch)) {
  let contenu = fs.readFileSync(cheminPatch, 'utf8');
  if (!contenu.includes('wbwVideoGenBtnV118')) {
    contenu += '\n\n' + codeGenerateurVideo;
    fs.writeFileSync(cheminPatch, contenu, 'utf8');
    console.log('✅ Générateur de vidéo TikTok injecté dans patch-mot-a-mot.js !');
  } else {
    console.log('ℹ️ Le générateur de vidéo est déjà présent.');
  }
}
const fs = require('fs');
const path = require('path');

const pGen = path.join(__dirname, 'generateur.js');
if (!fs.existsSync(pGen)) {
  console.error('❌ Fichier generateur.js introuvable !');
  process.exit(1);
}

let g = fs.readFileSync(pGen, 'utf8');

// 1. MOTEUR DU CIEL : ÉTOILES BLEUES + FLOCONS DE NEIGE BLEUS + SOLEIL & LUNE EN ORBITE
const nouveauMoteurCielBleu = `const MOTEUR_CIEL_JS = \`
  const bgCanvas = document.getElementById('fullPageSkyCanvas');
  const bgCtx = bgCanvas.getContext('2d');
  const sunEl = document.getElementById('flatEarthSun');
  const moonEl = document.getElementById('flatEarthMoon');
  if (sunEl) sunEl.style.display = 'block';
  if (moonEl) moonEl.style.display = 'block';
  let wScreen = window.innerWidth, hScreen = window.innerHeight, stars = [], flakes = [], angleOrbite = 0.35;
  try { const sa = sessionStorage.getItem('orbit_angle_v21'); if (sa !== null && !isNaN(Number(sa))) angleOrbite = Number(sa); } catch(e){}
  function sauvegarderConfigCiel() { try { sessionStorage.setItem('orbit_angle_v21', String(angleOrbite)); } catch(e){} }
  window.addEventListener('beforeunload', sauvegarderConfigCiel);
  function resizeFullSky() { wScreen = window.innerWidth; hScreen = window.innerHeight; bgCanvas.width = wScreen; bgCanvas.height = hScreen; }
  resizeFullSky();

  // Étoiles et particules bleues scintillantes
  for (let i = 0; i < 145; i++) {
    const xr = Math.random(), yr = Math.random(), br = Math.random() < 0.28;
    stars.push({
      x: xr * wScreen, y: yr * hScreen,
      r: br ? (Math.random() * 1.8 + 1.2) : (Math.random() * 1.0 + 0.5),
      a: Math.random() * 0.65 + 0.25,
      p: Math.random() * 6.28,
      s: Math.random() * 0.025 + 0.01,
      vx: (Math.random() - 0.5) * 0.22,
      vy: Math.random() * 0.38 + 0.12,
      hue: Math.random() < 0.72 ? '56, 189, 248' : '186, 230, 253'
    });
  }

  // Flocons cristallins bleus (style neige céleste bleue)
  for (let i = 0; i < 26; i++) {
    flakes.push({
      x: Math.random() * wScreen,
      y: Math.random() * hScreen,
      size: Math.random() * 7 + 4.5,
      a: Math.random() * 0.42 + 0.18,
      rot: Math.random() * 6.28,
      vRot: (Math.random() - 0.5) * 0.008,
      vx: (Math.random() - 0.5) * 0.3,
      vy: Math.random() * 0.45 + 0.18
    });
  }

  function dessinerFloconBleu(ctx, x, y, rad, rot, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.strokeStyle = "rgba(56, 189, 248, " + alpha + ")";
    ctx.shadowColor = "rgba(14, 165, 233, " + Math.min(1, alpha * 1.6) + ")";
    ctx.shadowBlur = 8;
    ctx.lineWidth = 1.15;
    ctx.beginPath();
    for (let b = 0; b < 6; b++) {
      const ang = (b * Math.PI) / 3;
      const cos = Math.cos(ang), sin = Math.sin(ang);
      ctx.moveTo(0, 0);
      ctx.lineTo(cos * rad, sin * rad);
      const rMid = rad * 0.58, rBr = rad * 0.32;
      const mx = cos * rMid, my = sin * rMid;
      ctx.moveTo(mx, my);
      ctx.lineTo(mx + Math.cos(ang + 0.55) * rBr, my + Math.sin(ang + 0.55) * rBr);
      ctx.moveTo(mx, my);
      ctx.lineTo(mx + Math.cos(ang - 0.55) * rBr, my + Math.sin(ang - 0.55) * rBr);
    }
    ctx.stroke();
    ctx.restore();
  }

  let dernierDessinCiel = 0;
  function renderFullSky(t) {
    requestAnimationFrame(renderFullSky);
    t = t || performance.now();
    if (document.hidden || t - dernierDessinCiel < 30) return;
    dernierDessinCiel = t;
    bgCtx.clearRect(0, 0, wScreen, hScreen);

    for (let i = 0; i < stars.length; i++) {
      const st = stars[i];
      st.p += st.s;
      st.x += st.vx;
      st.y += st.vy;
      if (st.y > hScreen + 10) { st.y = -10; st.x = Math.random() * wScreen; }
      if (st.x < -10) st.x = wScreen + 10;
      if (st.x > wScreen + 10) st.x = -10;
      const al = Math.max(0.12, Math.min(0.95, st.a + Math.sin(st.p) * 0.28));
      bgCtx.save();
      bgCtx.fillStyle = "rgba(" + st.hue + "," + al + ")";
      bgCtx.shadowColor = "rgba(14, 165, 233, " + al + ")";
      bgCtx.shadowBlur = st.r > 1.3 ? 10 : 5;
      bgCtx.beginPath();
      bgCtx.arc(st.x, st.y, st.r, 0, 6.28);
      bgCtx.fill();
      bgCtx.restore();
    }

    for (let i = 0; i < flakes.length; i++) {
      const fl = flakes[i];
      fl.x += fl.vx;
      fl.y += fl.vy;
      fl.rot += fl.vRot;
      if (fl.y > hScreen + 20) { fl.y = -20; fl.x = Math.random() * wScreen; }
      if (fl.x < -20) fl.x = wScreen + 20;
      if (fl.x > wScreen + 20) fl.x = -20;
      dessinerFloconBleu(bgCtx, fl.x, fl.y, fl.size, fl.rot, fl.a);
    }

    // Orbite du Soleil et de la Lune
    if (sunEl || moonEl) {
      angleOrbite += 0.003;
      const cx = wScreen * 0.5, cy = hScreen * 0.48, rx = Math.max(320, wScreen * 0.36), ry = Math.max(210, hScreen * 0.34);
      const sx = cx + Math.cos(angleOrbite) * rx, sy = cy + Math.sin(angleOrbite) * ry;
      const mx = cx + Math.cos(angleOrbite - Math.PI) * rx, my = cy + Math.sin(angleOrbite - Math.PI) * ry;
      if (sunEl) sunEl.style.transform = "translate3d(" + (sx - 58) + "px," + (sy - 58) + "px,0)";
      if (moonEl) moonEl.style.transform = "translate3d(" + (mx - 64) + "px," + (my - 64) + "px,0)";
    }
  }
  window.addEventListener('resize', resizeFullSky);
  renderFullSky();
\`;`;

const idxDebutCiel = g.indexOf('const MOTEUR_CIEL_JS = `');
const idxFinCiel = g.indexOf('renderFullSky();\n`;');
if (idxDebutCiel !== -1 && idxFinCiel !== -1) {
  g = g.slice(0, idxDebutCiel) + nouveauMoteurCielBleu + g.slice(idxFinCiel + 'renderFullSky();\n`;'.length);
}

// 2. AJOUTER LE SOLEIL ET LA LUNE AUSSI SUR LES PAGES DE VERSETS
g = g.replace(
  `<div class="cosmos-exterior-wrapper"><canvas id="fullPageSkyCanvas"></canvas></div>`,
  `<div class="cosmos-exterior-wrapper"><canvas id="fullPageSkyCanvas"></canvas><div class="flat-earth-sun" id="flatEarthSun"><div class="sun-core"></div></div><div class="flat-earth-moon" id="flatEarthMoon"><div class="moon-white-core"></div></div></div>`
);

// 3. CALLIGRAPHIE ARABE AU NÉON BLEU CÉLESTE + HALO BLEU TAMISÉ
g = g.replace(
  /\.arabic-glow-verse\s*\{[^}]*\}/g,
  `.arabic-glow-verse { position:relative; z-index:2; font-family:'Scheherazade New','Amiri',serif; font-size:2.9rem; line-height:2.15; direction:rtl; margin-bottom:22px; color:#f0f9ff; text-shadow:0 0 6px rgba(125,211,252,0.98), 0 0 16px #38bdf8, 0 0 34px #0ea5e9, 0 0 62px rgba(2,132,199,0.88), 0 2px 6px rgba(0,0,0,0.95); transition:font-size 0.15s ease; }`
);
g = g.replace(
  /\.wbw-ar\s*\{[^}]*\}/g,
  `.wbw-ar { font-family:'Scheherazade New','Amiri',serif; font-size:2.3rem; line-height:1.55; color:#f0f9ff; text-shadow:0 0 6px rgba(125,211,252,0.95), 0 0 15px #38bdf8, 0 0 30px rgba(14,165,233,0.85); margin-bottom:8px; text-align:center; transition:color 0.12s, text-shadow 0.12s; }`
);
g = g.replace(
  /background:\s*radial-gradient\(ellipse at 50% 40%,\s*rgba\(185,\s*28,\s*28,\s*0\.22\)[^;]*;/g,
  `background: radial-gradient(ellipse at 50% 40%, rgba(14, 165, 233, 0.22) 0%, rgba(4, 12, 24, 0.72) 65%, rgba(4, 8, 14, 0.85) 100%);`
);

// 4. ACTIVER LE BOUTON "ENCHAÎNER AUTOMATIQUEMENT" DÈS LE DÉBUT DU SITE
g = g.replace(
  `<input type="checkbox" id="autoNextCheck">`,
  `<input type="checkbox" id="autoNextCheck" checked>`
);
g = g.replace(
  /autoCheck\.checked\s*=\s*false;/g,
  `autoCheck.checked = (localStorage.getItem('coran_auto_next') !== '0'); autoCheck.addEventListener('change', () => { try { localStorage.setItem('coran_auto_next', autoCheck.checked ? '1' : '0'); } catch(e){} });`
);

fs.writeFileSync(pGen, g, 'utf8');
console.log('✅ Tout est mis à jour : Néon & Neige Bleus + Soleil & Lune rétablis + Enchaîner auto activé dès le début !');
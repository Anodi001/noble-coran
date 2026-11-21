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

const siteDir = path.join(__dirname, 'site');
const versetJsPath = path.join(siteDir, 'assets', 'verset.js');
const versetCssPath = path.join(siteDir, 'assets', 'verset.css');
const lexPath = path.join(siteDir, 'lexique-wbw-fr.json');
const workerPath = path.join(siteDir, '_worker.js');
const swPath = path.join(siteDir, 'sw.js');

// ============================================================================
// 1. FINITION MAJUSCULES NOBLES DANS SITE/LEXIQUE-WBW-FR.JSON
// ============================================================================
const lex = JSON.parse(fs.readFileSync(lexPath, 'utf8'));
const restaurerMaj = {
  'most forgiving': 'Très Pardonneur',
  'most wise': 'Très-Sage',
  'most high': 'Très-Haut',
  'most merciful': 'Très Miséricordieux',
  'most gracious': 'Tout Miséricordieux',
  'all praise': 'Louange',
  'our signs': 'Nos signes',
  'our verses': 'Nos versets',
  'fire': 'le Feu',
  'the fire': 'le Feu',
  'my mercy': 'Ma miséricorde',
  'our slave': 'Notre serviteur',
  'my slave': 'Mon serviteur',
  'my servants': 'Mes serviteurs',
  'we said': 'Nous dîmes',
  'we know': 'Nous savons',
  'we created': 'Nous avons créé',
  'we made': 'Nous avons fait',
  'we sent': 'Nous avons envoyé',
  'we sent down': 'Nous avons fait descendre',
  'we revealed': 'Nous avons révélé',
  'we gave': 'Nous avons donné',
  'we bestowed': 'Nous avons accordé',
  'we guided': 'Nous avons guidé',
  'we destroyed': 'Nous avons anéanti'
};
let nbMajRest = 0;
for (const [k, v] of Object.entries(restaurerMaj)) {
  if (lex.en && lex.en[k] !== v) {
    lex.en[k] = v;
    nbMajRest++;
  }
}
if (lex.en) {
  for (const [k, val] of Object.entries(lex.en)) {
    if (typeof val !== 'string') continue;
    if (/^très[- ]/i.test(val) && /^most\s/i.test(k)) {
      lex.en[k] = val.charAt(0).toUpperCase() + val.slice(1);
      nbMajRest++;
    }
  }
}
lex.version = Number(lex.version || 30) + 1;
writeSafe(lexPath, JSON.stringify(lex));
console.log(`✓ site/lexique-wbw-fr.json (v${lex.version}) : ${nbMajRest} majuscules nobles restaurées.`);

// ============================================================================
// 2. PATCH SITE/ASSETS/VERSET.JS : LUMIÈRE UNIFORME + PLEIN ÉCRAN V2
// ============================================================================
const rawJs = fs.readFileSync(versetJsPath, 'utf8');
const eolJs = rawJs.includes('\r\n') ? '\r\n' : '\n';
let js = rawJs.replace(/\r\n/g, '\n');

// --- 2A. reinitialiserMotsEnBlancTamise : brillant si Suivi OFF, tamisé si Suivi ON ---
const debutReinit = '  function reinitialiserMotsEnBlancTamise() {';
const finReinit = '\n  function lancerBoucleSuivi() {';
const iR1 = js.indexOf(debutReinit);
const iR2 = js.indexOf(finReinit, iR1);
if (iR1 === -1 || iR2 === -1) throw new Error('Bloc reinitialiserMotsEnBlancTamise introuvable');

const nouveauReinit = `  function reinitialiserMotsEnBlancTamise() {
    window.__wbwResetDemande = true;
    window.__wbwEnergies = [];
    window.__wbwBleus = [];
    window.__wbwActiveFloat = -1;
    window.__wbwIdxEntier = -1;
    window.__wbwLectureActive = false;
    energiesMots = [];
    bleusMots = [];
    var cibleObj = obtenirElementsMotsAAnimer();
    var items = cibleObj.items;
    var estCartes = cibleObj.type === "cartes";
    var estMob = window.__aeIsMobile ? window.__aeIsMobile() : false;
    var haloRepos = estMob
      ? "0 0 12px rgba(56, 189, 248, 0.50)"
      : "0 0 9px rgba(255, 255, 255, 0.62), 0 0 16px rgba(56, 189, 248, 0.56), 0 0 28px rgba(14, 165, 233, 0.34)";
    var modeBrillant = !suiviEstActif;
    for (var i = 0; i < items.length; i++) {
      var el = items[i];
      el.__lastAk = "";
      el.__aeGlowKey = "";
      el.__aeHasGlow = modeBrillant;
      el.style.setProperty("transform", "translate3d(0, 0px, 0) scale(1)", "important");
      el.style.setProperty("filter", "none", "important");
      if (estCartes) {
        if (window.__wbwBypassOrigCartes) continue;
        el.style.setProperty("opacity", modeBrillant ? "1" : "0.78", "important");
        el.style.setProperty("border-color", modeBrillant ? "rgba(56, 189, 248, 0.25)" : "rgba(255, 255, 255, 0.15)", "important");
        el.style.setProperty("box-shadow", "none", "important");
      } else if (modeBrillant) {
        el.style.setProperty("opacity", "1", "important");
        el.style.setProperty("color", "#ffffff", "important");
        el.style.setProperty("text-shadow", haloRepos, "important");
      } else {
        el.style.setProperty("opacity", "0.62", "important");
        el.style.setProperty("color", "rgba(226, 232, 240, 0.80)", "important");
        el.style.setProperty("text-shadow", "none", "important");
      }
    }
    if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW(performance.now());
  }`;

js = js.slice(0, iR1) + nouveauReinit + js.slice(iR2);

// --- 2B. Boucle A : brillant blanc + halo cyan quand Suivi OFF ou avant lecture ---
const debutA = '    if (items && items.length && suiviEstActif) {';
const finA = '\n    var animEnCours = Boolean(window.__wbwAnimEnCours);';
const iA1 = js.indexOf(debutA);
const iA2 = js.indexOf(finA, iA1);
if (iA1 === -1 || iA2 === -1) throw new Error('Bloc Boucle A introuvable');

const blocBoucleAOrig = js.slice(iA1, iA2);
const cibleReposA = `          if (b < 0.025) {
            el.style.setProperty('opacity', '0.74', 'important');
            el.style.setProperty('color', 'rgba(241, 245, 249, 0.80)', 'important');
            if (el.__aeHasGlow !== false) {
              el.__aeHasGlow = false;
              el.style.setProperty('text-shadow', 'none', 'important');
            }
          } else {`;

const rempReposA = `          if (!lectureEnCours) {
            el.style.setProperty('opacity', '1', 'important');
            el.style.setProperty('color', '#ffffff', 'important');
            if (el.__aeGlowKey !== 'idle') {
              el.__aeGlowKey = 'idle';
              el.__aeHasGlow = true;
              el.style.setProperty(
                'text-shadow',
                _estMobA
                  ? '0 0 12px rgba(56, 189, 248, 0.50)'
                  : '0 0 9px rgba(255, 255, 255, 0.62), 0 0 16px rgba(56, 189, 248, 0.56), 0 0 28px rgba(14, 165, 233, 0.34)',
                'important'
              );
            }
          } else if (b < 0.025) {
            el.style.setProperty('opacity', '0.58', 'important');
            el.style.setProperty('color', 'rgba(226, 232, 240, 0.78)', 'important');
            if (el.__aeHasGlow !== false) {
              el.__aeHasGlow = false;
              el.__aeGlowKey = 'dim';
              el.style.setProperty('text-shadow', 'none', 'important');
            }
          } else {`;

if (!blocBoucleAOrig.includes(cibleReposA)) throw new Error('Sous-bloc b < 0.025 de Boucle A introuvable');

const brancheSuiviOffA = ` else if (items && items.length && !suiviEstActif) {
      /* UNIFIED_GLOW_SUIVI_OFF_V2 */
      window.__wbwLectureActive = false;
      window.__wbwActiveFloat = -1;
      window.__wbwIdxEntier = -1;
      energiesMots = new Array(items.length).fill(0);
      bleusMots = new Array(items.length).fill(0);
      window.__wbwEnergies = energiesMots;
      window.__wbwBleus = bleusMots;
      var _estMobOff = window.__aeIsMobile ? window.__aeIsMobile() : false;
      var _haloOff = _estMobOff
        ? '0 0 12px rgba(56, 189, 248, 0.50)'
        : '0 0 9px rgba(255, 255, 255, 0.62), 0 0 16px rgba(56, 189, 248, 0.56), 0 0 28px rgba(14, 165, 233, 0.34)';
      for (var kOff = 0; kOff < items.length; kOff++) {
        var elOff = items[kOff];
        if (estCartes && window.__wbwBypassOrigCartes) continue;
        if (elOff.__lastAk === 'suivi_off_glow') continue;
        elOff.__lastAk = 'suivi_off_glow';
        elOff.__aeGlowKey = 'idle';
        elOff.__aeHasGlow = true;
        elOff.style.setProperty('transform', 'translate3d(0, 0px, 0) scale(1)', 'important');
        elOff.style.setProperty('filter', 'none', 'important');
        if (estCartes) {
          elOff.style.setProperty('opacity', '1', 'important');
          elOff.style.setProperty('border-color', 'rgba(56, 189, 248, 0.25)', 'important');
        } else {
          elOff.style.setProperty('background', 'transparent', 'important');
          elOff.style.setProperty('border', 'none', 'important');
          elOff.style.setProperty('opacity', '1', 'important');
          elOff.style.setProperty('color', '#ffffff', 'important');
          elOff.style.setProperty('text-shadow', _haloOff, 'important');
        }
      }
      if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW(performance.now());
    }`;

const blocBoucleANouv = blocBoucleAOrig.replace(cibleReposA, rempReposA) + brancheSuiviOffA;
js = js.slice(0, iA1) + blocBoucleANouv + js.slice(iA2);

// --- 2C. Boucle B (Mot à mot) : exactement la même couleur/halo cyan que Classique (Suivi ON & OFF) ---
const debutB = '      var lum = Math.max(b, e), opReposBase = 0.96 - 0.54 * modeContrasteSuivi;';
const finB = "          forcer(meta.elTrad, 'text-shadow', ombreTr);";
const iB1 = js.indexOf(debutB);
const iB2 = js.indexOf(finB, iB1);
if (iB1 === -1 || iB2 === -1) throw new Error('Bloc couleurs Boucle B introuvable');

const blocCouleursBNouv = `      /* UNIFIED_GLOW_LOOP_B_V2 */
      var lum = Math.max(b, e), opReposBase = 1.0 - 0.44 * modeContrasteSuivi;
      if (audioActif && !estDejaLu && !estMotActuel) {
        if (distanceFutur === 1) opReposBase = Math.max(opReposBase, 0.72);
        else if (distanceFutur === 2) opReposBase = Math.max(opReposBase, 0.60);
      }
      var opMot = (opReposBase + (1.0 - opReposBase) * lum).toFixed(3);
      var scB = (1.0 + _scaleMaxB * e).toFixed(4);
      var transMot = 'translate3d(0px, ' + (_liftMaxB * e).toFixed(2) + 'px, 0px) scale3d(' + scB + ',' + scB + ',1)';

      if (meta.elAr) {
        if (!meta._aeArInit) {
          meta._aeArInit = true;
          forcer(meta.elAr, 'border', 'none');
          forcer(meta.elAr, 'border-bottom', 'none');
        }
        var enModeReposB = (!audioActif || modeContrasteSuivi < 0.15);
        forcer(meta.elAr, 'color', (enModeReposB || lum > 0.025) ? '#ffffff' : 'rgba(226, 232, 240, 0.80)');
        forcer(meta.elAr, 'opacity', opMot);
        forcer(meta.elAr, 'transform', transMot);
        var glowArKey = (e > 0.015 || b > 0.025)
          ? (Math.round(e * 20) + ':' + Math.round(b * 20))
          : (enModeReposB ? 'idle' : 'off');
        if (meta._aeGlowAr !== glowArKey) {
          meta._aeGlowAr = glowArKey;
          var ombreAr;
          if (e > 0.015 || b > 0.025) {
            ombreAr = _estMobB
              ? ('0 0 ' + (12 + 12 * e).toFixed(1) + 'px rgba(56, 189, 248, ' + (0.55 * b + 0.42 * e).toFixed(2) + ')')
              : ('0 0 9px rgba(255, 255, 255, ' + (0.75 * b + 0.23 * e).toFixed(2) + '), 0 0 ' + (14 + 10 * e).toFixed(1) + 'px rgba(56, 189, 248, ' + (0.85 * b + 0.15 * e).toFixed(2) + '), 0 0 ' + (28 + 16 * e).toFixed(1) + 'px rgba(14, 165, 233, ' + (0.60 * b + 0.35 * e).toFixed(2) + ')');
          } else if (enModeReposB) {
            ombreAr = _estMobB
              ? '0 0 12px rgba(56, 189, 248, 0.50)'
              : '0 0 9px rgba(255, 255, 255, 0.62), 0 0 16px rgba(56, 189, 248, 0.56), 0 0 28px rgba(14, 165, 233, 0.34)';
          } else {
            ombreAr = 'none';
          }
          forcer(meta.elAr, 'text-shadow', ombreAr);
        }
      }

      if (meta.elTrad) {
        if (!meta._aeTrInit) {
          meta._aeTrInit = true;
          forcer(meta.elTrad, 'border', 'none');
          forcer(meta.elTrad, 'border-top', 'none');
        }
        var colTrRepos = melangerRGB(224, 242, 254, 148, 163, 184, modeContrasteSuivi);
        var colTrFinal = lum > 0.01 ? melangerRGB(148, 163, 184, 255, 255, 255, lum) : colTrRepos;
        forcer(meta.elTrad, 'opacity', opMot);
        forcer(meta.elTrad, 'transform', transMot);
        forcer(meta.elTrad, 'color', colTrFinal);
        var glowTrKey = (e > 0.02 || b > 0.08) ? (Math.round(e * 15) + ':' + Math.round(b * 15)) : ((!audioActif || modeContrasteSuivi < 0.15) ? 'idle' : 'off');
        if (meta._aeGlowTr !== glowTrKey) {
          meta._aeGlowTr = glowTrKey;
          var ombreTr = (!_estMobB && (e > 0.02 || b > 0.08))
            ? ('0 0 ' + (10 * e + 5 * b).toFixed(1) + 'px rgba(56, 189, 248, ' + (0.60 * e + 0.32 * b).toFixed(2) + ')')
            : ((!_estMobB && (!audioActif || modeContrasteSuivi < 0.15)) ? '0 0 8px rgba(56, 189, 248, 0.24)' : 'none');
          forcer(meta.elTrad, 'text-shadow', ombreTr);`;

js = js.slice(0, iB1) + blocCouleursBNouv + js.slice(iB2 + finB.length);

// --- 2D. Clic sur Suivi : mise à jour immédiate (0 latence) ---
const cibleClickSuivi = `        suiviEstActif = !suiviEstActif;\n        lancerBoucleSuivi();`;
const rempClickSuivi = `        suiviEstActif = !suiviEstActif;\n        window.__wbwSuiviBoutonActif = Boolean(suiviEstActif);\n        etapeSuiviAudioAfterEffects();\n        lancerBoucleSuivi();`;
if (js.includes(cibleClickSuivi)) {
  js = js.replace(cibleClickSuivi, rempClickSuivi);
}

// --- 2E. Module Plein écran V2 (barre complète + Suivi + Auto + raccourcis clavier + WakeLock) ---
const debutFs = '/* __MODULE_FULLSCREEN_FOCUS_V1__ */';
const iFs = js.indexOf(debutFs);
if (iFs === -1) throw new Error('Module __MODULE_FULLSCREEN_FOCUS_V1__ introuvable');

const moduleFsV2 = `/* __MODULE_FULLSCREEN_FOCUS_V1__ */
/* __MODULE_FULLSCREEN_FOCUS_V2__ */
(function moduleFullscreenFocusV2() {
  var LABELS_FS = {
    fr: { btn: '⛶ Plein écran', exit: '✕ Quitter', wbw: '📖 Mot à mot', suivi: '✨ Suivi', tajwid: '🎨 Tajwid', auto: '🔁 Auto' },
    en: { btn: '⛶ Fullscreen', exit: '✕ Exit', wbw: '📖 Word by Word', suivi: '✨ Follow', tajwid: '🎨 Tajwid', auto: '🔁 Auto' },
    es: { btn: '⛶ Pantalla completa', exit: '✕ Salir', wbw: '📖 Palabra', suivi: '✨ Seguimiento', tajwid: '🎨 Tajwid', auto: '🔁 Auto' },
    ar: { btn: '⛶ ملء الشاشة', exit: '✕ خروج', wbw: '📖 كلمة بكلمة', suivi: '✨ تتبع', tajwid: '🎨 تجويد', auto: '🔁 تلقائي' },
    de: { btn: '⛶ Vollbild', exit: '✕ Beenden', wbw: '📖 Wort für Wort', suivi: '✨ Verfolgung', tajwid: '🎨 Tajwid', auto: '🔁 Auto' },
    it: { btn: '⛶ Schermo intero', exit: '✕ Esci', wbw: '📖 Parola', suivi: '✨ Seguito', tajwid: '🎨 Tajwid', auto: '🔁 Auto' },
    id: { btn: '⛶ Layar penuh', exit: '✕ Keluar', wbw: '📖 Kata demi Kata', suivi: '✨ Ikuti', tajwid: '🎨 Tajwid', auto: '🔁 Auto' },
    ru: { btn: '⛶ На весь экран', exit: '✕ Выход', wbw: '📖 Пословно', suivi: '✨ Слежение', tajwid: '🎨 Таджвид', auto: '🔁 Авто' }
  };

  var wakeLockRef = null;

  function demanderWakeLock(actif) {
    try {
      if (!navigator.wakeLock) return;
      if (actif && !wakeLockRef) {
        navigator.wakeLock.request('screen').then(function(l) {
          wakeLockRef = l;
          l.addEventListener('release', function() { wakeLockRef = null; });
        }).catch(function() {});
      } else if (!actif && wakeLockRef) {
        wakeLockRef.release().catch(function() {});
        wakeLockRef = null;
      }
    } catch (e) {}
  }

  function getLangFs() {
    var p = new URLSearchParams(window.location.search).get('lang');
    var l = p ? p.slice(0, 2).toLowerCase() : ((document.documentElement.lang || 'fr').slice(0, 2).toLowerCase());
    return LABELS_FS[l] ? l : 'fr';
  }

  function findBtnByTxt(mots) {
    var btns = document.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
      if (btns[i].closest('#wbwFsTopBarV1')) continue;
      var t = (btns[i].textContent || '').trim();
      for (var k = 0; k < mots.length; k++) if (t.indexOf(mots[k]) !== -1) return btns[i];
    }
    return null;
  }

  function estActif(btn) {
    return Boolean(btn && (btn.classList.contains('active') || btn.getAttribute('aria-pressed') === 'true'));
  }

  function getOrigWbw() {
    return document.getElementById('btnToggleWbw') || document.getElementById('wbwToggleBtn') || findBtnByTxt(['Mot à mot', 'Word by Word', 'Palabra', 'Wort für', 'Parola', 'Kata demi', 'Пословн', 'كلمة بكلمة']);
  }
  function getOrigSuivi() {
    return findBtnByTxt(['Suivi', 'Follow', 'Seguimiento', 'Verfolgung', 'Seguito', 'Ikuti', 'Слежение', 'تتبع']);
  }
  function getOrigTajwid() {
    return findBtnByTxt(['Tajw', 'Таджвид', 'تجويد']);
  }
  function getAutoCheckbox() {
    return document.getElementById('autoPlayToggle') || document.getElementById('autoCheck') || document.querySelector('input[type="checkbox"]');
  }

  function syncFsBar() {
    var bar = document.getElementById('wbwFsTopBarV1');
    var mainBtn = document.getElementById('wbwFullscreenBtnV1');
    var lang = getLangFs();
    var t = LABELS_FS[lang] || LABELS_FS.fr;
    if (mainBtn) mainBtn.textContent = t.btn;
    if (!bar) return;

    var badgeOrig = document.getElementById('badgeNumEl');
    var fsBadge = document.getElementById('wbwFsBadgeV1');
    if (fsBadge && badgeOrig) fsBadge.textContent = (badgeOrig.textContent || '').trim();

    var fsWbw = document.getElementById('wbwFsWbwV1');
    var fsSuivi = document.getElementById('wbwFsSuiviV1');
    var fsTaj = document.getElementById('wbwFsTajwidV1');
    var fsAuto = document.getElementById('wbwFsAutoV1');
    var fsExit = document.getElementById('wbwFsExitV1');

    var origWbw = getOrigWbw();
    var origSuivi = getOrigSuivi();
    var origTaj = getOrigTajwid();
    var autoCb = getAutoCheckbox();

    if (fsWbw) { fsWbw.textContent = t.wbw; fsWbw.classList.toggle('active', estActif(origWbw)); }
    if (fsSuivi) {
      var suiviOn = origSuivi ? estActif(origSuivi) : Boolean(window.__wbwSuiviBoutonActif);
      fsSuivi.textContent = t.suivi;
      fsSuivi.classList.toggle('active', suiviOn);
    }
    if (fsTaj) { fsTaj.textContent = t.tajwid; fsTaj.classList.toggle('active', estActif(origTaj)); }
    if (fsAuto) {
      fsAuto.style.display = autoCb ? '' : 'none';
      fsAuto.textContent = t.auto;
      fsAuto.classList.toggle('active', Boolean(autoCb && autoCb.checked));
    }
    if (fsExit) fsExit.textContent = t.exit;
  }

  function marquerDOMFullscreen(actif) {
    var stage = document.querySelector('.verse-stage');
    if (!stage) return;
    document.documentElement.classList.toggle('wbw-fullscreen-html', actif);
    document.body.classList.toggle('wbw-fullscreen-mode', actif);

    var anciensAnc = document.querySelectorAll('.wbw-fs-ancestor');
    for (var a = 0; a < anciensAnc.length; a++) anciensAnc[a].classList.remove('wbw-fs-ancestor');
    var anciensHid = document.querySelectorAll('.wbw-fs-hidden');
    for (var h = 0; h < anciensHid.length; h++) anciensHid[h].classList.remove('wbw-fs-hidden');

    if (actif) {
      var cur = stage;
      while (cur && cur.parentElement && cur.parentElement !== document.body) {
        var par = cur.parentElement;
        par.classList.add('wbw-fs-ancestor');
        for (var i = 0; i < par.children.length; i++) {
          var sib = par.children[i];
          if (sib !== cur && sib.id !== 'wbwFsTopBarV1') sib.classList.add('wbw-fs-hidden');
        }
        cur = par;
      }
      for (var b = 0; b < document.body.children.length; b++) {
        var child = document.body.children[b];
        if (child !== cur && child.id !== 'wbwFsTopBarV1' && child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE') {
          child.classList.add('wbw-fs-hidden');
        }
      }
      stage.scrollTop = 0;
    }
    demanderWakeLock(actif);
    syncFsBar();
  }

  function entrerPleinEcran() {
    marquerDOMFullscreen(true);
    try {
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(function() {});
      }
    } catch (e) {}
  }

  function quitterPleinEcran() {
    marquerDOMFullscreen(false);
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(function() {});
      }
    } catch (e) {}
  }

  function installerFullscreen() {
    var stage = document.querySelector('.verse-stage');
    if (!stage) return;

    if (!document.getElementById('wbwFsTopBarV1')) {
      var bar = document.createElement('div');
      bar.id = 'wbwFsTopBarV1';
      bar.className = 'notranslate';
      bar.setAttribute('translate', 'no');
      bar.innerHTML =
        '<div class="wbw-fs-group wbw-fs-scroll">' +
          '<span id="wbwFsBadgeV1" class="wbw-fs-badge"></span>' +
          '<button type="button" id="wbwFsWbwV1" class="wbw-fs-pill">📖 Mot à mot</button>' +
          '<button type="button" id="wbwFsSuiviV1" class="wbw-fs-pill">✨ Suivi</button>' +
          '<button type="button" id="wbwFsTajwidV1" class="wbw-fs-pill">🎨 Tajwid</button>' +
          '<button type="button" id="wbwFsAutoV1" class="wbw-fs-pill">🔁 Auto</button>' +
          '<button type="button" id="wbwFsZoomOutV1" class="wbw-fs-pill" aria-label="Réduire le texte">A−</button>' +
          '<button type="button" id="wbwFsZoomInV1" class="wbw-fs-pill" aria-label="Agrandir le texte">A+</button>' +
        '</div>' +
        '<button type="button" id="wbwFsExitV1" class="wbw-fs-exit">✕ Quitter</button>';
      document.body.appendChild(bar);

      document.getElementById('wbwFsExitV1').addEventListener('click', function(e) {
        e.stopPropagation();
        quitterPleinEcran();
      });
      document.getElementById('wbwFsWbwV1').addEventListener('click', function(e) {
        e.stopPropagation();
        var b = getOrigWbw();
        if (b) b.click();
        setTimeout(syncFsBar, 60);
      });
      document.getElementById('wbwFsSuiviV1').addEventListener('click', function(e) {
        e.stopPropagation();
        var b = getOrigSuivi();
        if (b) b.click();
        setTimeout(syncFsBar, 60);
      });
      document.getElementById('wbwFsTajwidV1').addEventListener('click', function(e) {
        e.stopPropagation();
        var b = getOrigTajwid();
        if (b) b.click();
        setTimeout(syncFsBar, 60);
      });
      document.getElementById('wbwFsAutoV1').addEventListener('click', function(e) {
        e.stopPropagation();
        var cb = getAutoCheckbox();
        if (cb) {
          cb.checked = !cb.checked;
          cb.dispatchEvent(new Event('change', { bubbles: true }));
        }
        setTimeout(syncFsBar, 40);
      });
      document.getElementById('wbwFsZoomOutV1').addEventListener('click', function(e) {
        e.stopPropagation();
        var b = findBtnByTxt(['A-', 'A−', 'A–']);
        if (b) b.click();
      });
      document.getElementById('wbwFsZoomInV1').addEventListener('click', function(e) {
        e.stopPropagation();
        var b = findBtnByTxt(['A+', 'A＋']);
        if (b) b.click();
      });
    }

    if (!document.getElementById('wbwFullscreenBtnV1')) {
      var cible = document.getElementById('wbwAudioRangeBtnV110') || findBtnByTxt(['Bruit', 'Brown', 'Suivi', 'Follow', 'Tajw']);
      if (cible && cible.parentElement) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'wbwFullscreenBtnV1';
        btn.className = 'notranslate';
        btn.addEventListener('click', function() {
          if (document.body.classList.contains('wbw-fullscreen-mode')) quitterPleinEcran();
          else entrerPleinEcran();
        });
        cible.parentElement.insertBefore(btn, cible.nextSibling);
      }
    }
    syncFsBar();
  }

  // Raccourcis clavier confortables en mode Plein écran
  document.addEventListener('keydown', function(e) {
    if (!document.body.classList.contains('wbw-fullscreen-mode')) return;
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/i.test(e.target.tagName)) return;
    if (e.key === 'Escape') {
      quitterPleinEcran();
    } else if (e.code === 'Space') {
      e.preventDefault();
      var playBtn = document.querySelector('.verse-stage .stage-blue-nav button[onclick*="toggleAudio"], .verse-stage #playBtn, .verse-stage .play-btn') || findBtnByTxt(['Écouter', 'Pause', 'Listen', 'Escuchar', 'Hören', 'Ascolta', 'Dengar', 'Слушать', 'استمع']);
      if (playBtn) playBtn.click();
    } else if (e.key === 'ArrowRight') {
      var nxt = document.getElementById('nextVerseLink');
      if (nxt) nxt.click();
    } else if (e.key === 'ArrowLeft') {
      var prv = document.getElementById('prevVerseLink');
      if (prv) prv.click();
    } else if (e.key === 'r' || e.key === 'R') {
      var rep = findBtnByTxt(['Rejouer', 'Replay', 'Repetir', 'Wiederholen', 'Riascolta', 'Ulangi', 'Повторить']);
      if (rep) rep.click();
    } else if (e.key === 'w' || e.key === 'W') {
      var wbwB = getOrigWbw();
      if (wbwB) wbwB.click();
      setTimeout(syncFsBar, 60);
    } else if (e.key === 's' || e.key === 'S') {
      var suivB = getOrigSuivi();
      if (suivB) suivB.click();
      setTimeout(syncFsBar, 60);
    } else if (e.key === '+' || e.key === '=') {
      var zi = findBtnByTxt(['A+', 'A＋']);
      if (zi) zi.click();
    } else if (e.key === '-') {
      var zo = findBtnByTxt(['A-', 'A−', 'A–']);
      if (zo) zo.click();
    }
  });

  document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement && document.body.classList.contains('wbw-fullscreen-mode')) {
      marquerDOMFullscreen(false);
    }
  });
  document.addEventListener('click', function() { setTimeout(installerFullscreen, 50); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installerFullscreen);
  else installerFullscreen();
  setTimeout(installerFullscreen, 300);

  if (typeof MutationObserver !== 'undefined') {
    var _bObs = document.getElementById('badgeNumEl');
    if (_bObs) {
      new MutationObserver(function() { syncFsBar(); })
        .observe(_bObs, { childList: true, characterData: true, subtree: true });
    }
  }
  setInterval(function() {
    if (document.body && document.body.classList.contains('wbw-fullscreen-mode')) syncFsBar();
  }, 500);
})();
`;

js = js.slice(0, iFs) + moduleFsV2;

new vm.Script(js, { filename: 'site/assets/verset.js' });
writeSafe(versetJsPath, eolJs === '\r\n' ? js.replace(/\n/g, '\r\n') : js);
console.log('✓ site/assets/verset.js : lumière uniforme (Suivi ON/OFF identique Classique & WBW) + Plein écran V2 injectés et validés.');

// ============================================================================
// 3. PATCH SITE/ASSETS/VERSET.CSS : PLEIN ÉCRAN V2 (DOCK FLOTTANT + MOBILE PROPRE)
// ============================================================================
const rawCss = fs.readFileSync(versetCssPath, 'utf8');
const eolCss = rawCss.includes('\r\n') ? '\r\n' : '\n';
let css = rawCss.replace(/\r\n/g, '\n');

const marqueurCss = '/* UNIFIED_GLOW_AND_FULLSCREEN_V2 */';
const idxCssOld = css.indexOf(marqueurCss);
if (idxCssOld !== -1) css = css.slice(0, idxCssOld).trimEnd();

const blocCssV2 = `

${marqueurCss}
/* Barre Plein écran V2 : compacte, translucide et scrollable sur une seule ligne sur mobile */
#wbwFsTopBarV1 {
  background: rgba(3, 10, 22, 0.86) !important;
  backdrop-filter: blur(14px) !important;
  -webkit-backdrop-filter: blur(14px) !important;
  border-bottom: 1px solid rgba(56, 189, 248, 0.24) !important;
  flex-wrap: nowrap !important;
  gap: 10px !important;
  padding: max(10px, env(safe-area-inset-top)) 16px 10px 16px !important;
}
.wbw-fs-scroll {
  flex-wrap: nowrap !important;
  overflow-x: auto !important;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
  max-width: calc(100vw - 125px) !important;
  padding-bottom: 2px !important;
}
.wbw-fs-scroll::-webkit-scrollbar {
  display: none !important;
}
.wbw-fs-pill, .wbw-fs-badge, .wbw-fs-exit {
  white-space: nowrap !important;
  flex-shrink: 0 !important;
}

/* Scène Plein écran V2 : plus ample, ambiance profonde et centrée */
body.wbw-fullscreen-mode .verse-stage {
  padding: 78px clamp(16px, 5vw, 64px) max(28px, env(safe-area-inset-bottom)) clamp(16px, 5vw, 64px) !important;
  background: radial-gradient(ellipse at 50% 28%, #0a1b33 0%, #030914 55%, #010409 100%) !important;
}
body.wbw-fullscreen-mode .verse-stage > * {
  width: 100%;
  max-width: 1120px;
}

/* Texte légèrement plus grand et confortable en Plein écran sur desktop */
@media (min-width: 821px) {
  body.wbw-fullscreen-mode .verse-stage .arabic-text,
  body.wbw-fullscreen-mode .verse-stage #arabicTextEl {
    font-size: clamp(2.4rem, 3.6vw, 3.8rem) !important;
    line-height: 2.05 !important;
  }
  body.wbw-fullscreen-mode .verse-stage .translation-text,
  body.wbw-fullscreen-mode .verse-stage #translationTextEl {
    font-size: clamp(1.1rem, 1.45vw, 1.38rem) !important;
    max-width: 900px !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}

/* Dock audio flottant en bas : toujours accessible même sur un très long verset */
body.wbw-fullscreen-mode .verse-stage .stage-blue-nav {
  position: sticky !important;
  bottom: max(10px, env(safe-area-inset-bottom)) !important;
  z-index: 100015 !important;
  margin-top: 26px !important;
  padding: 10px 16px !important;
  border-radius: 999px !important;
  background: rgba(4, 12, 26, 0.88) !important;
  border: 1px solid rgba(56, 189, 248, 0.30) !important;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.55), 0 0 22px rgba(14, 165, 233, 0.14) !important;
  width: auto !important;
  max-width: 100% !important;
}
@media (max-width: 640px) {
  body.wbw-fullscreen-mode .verse-stage .stage-blue-nav {
    border-radius: 18px !important;
    padding: 8px 10px !important;
    gap: 6px !important;
  }
  #wbwFsTopBarV1 {
    padding: max(8px, env(safe-area-inset-top)) 10px 8px 10px !important;
  }
}
`;

css = css + blocCssV2;
writeSafe(versetCssPath, eolCss === '\r\n' ? css.replace(/\n/g, '\r\n') : css);
console.log('✓ site/assets/verset.css : styles Plein écran V2 ajoutés.');

// ============================================================================
// 4. BUMP CACHE (_WORKER.JS + SW.JS)
// ============================================================================
const rawW = fs.readFileSync(workerPath, 'utf8');
const eolW = rawW.includes('\r\n') ? '\r\n' : '\n';
let w = rawW.replace(/\r\n/g, '\n');
const nouveauTag = String(Date.now());
w = w.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
w = w.replace(/htmlPropre\.replace\(\/v=1795050050086\/g,\s*"v=\d+"\)/, `htmlPropre.replace(/v=1795050050086/g, "v=${nouveauTag}")`);
writeSafe(workerPath, eolW === '\r\n' ? w.replace(/\n/g, '\r\n') : w);

let sw = fs.readFileSync(swPath, 'utf8');
sw = sw.replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
writeSafe(swPath, sw);
console.log(`✓ site/_worker.js (?v=${nouveauTag}) et site/sw.js mis à jour.`);
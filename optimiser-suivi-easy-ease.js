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
const jsPath = path.join(siteDir, 'assets', 'verset.js');
const workerPath = path.join(siteDir, '_worker.js');
const swPath = path.join(siteDir, 'sw.js');

const rawJs = fs.readFileSync(jsPath, 'utf8');
const eol = rawJs.includes('\r\n') ? '\r\n' : '\n';
let js = rawJs.replace(/\r\n/g, '\n');

// 1. S'assurer que les helpers Easy Ease Spring sont présents
const marqueurHelper = '/* __EASY_EASE_SPRING_HELPERS_V1__ */';
if (!js.includes(marqueurHelper)) {
  const helperCode = `${marqueurHelper}
  window.__aeSpringStep = function(x, v, target, omega, dt) {
    var diff = x - target;
    var exp = Math.exp(-omega * dt);
    var b = v + omega * diff;
    return [
      target + (diff + b * dt) * exp,
      (v - b * omega * dt) * exp
    ];
  };
  window.__aeIsMobile = function() {
    return (typeof window !== 'undefined') && (
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
      window.innerWidth <= 820
    );
  };
  window.__aeLastManualScroll = 0;
  if (typeof window !== 'undefined' && !window.__aeScrollListenersBound) {
    window.__aeScrollListenersBound = true;
    var _marquerScrollManuel = function() { window.__aeLastManualScroll = performance.now(); };
    window.addEventListener('wheel', _marquerScrollManuel, { passive: true });
    window.addEventListener('touchmove', _marquerScrollManuel, { passive: true });
  }
  window.__aeAutoScrollDoux = function(el) {
    if (!el || !el.getBoundingClientRect) return;
    if (performance.now() - (window.__aeLastManualScroll || 0) < 2500) return;
    var rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return;
    var enPleinEcran = document.body && document.body.classList.contains('wbw-fullscreen-mode');
    if (enPleinEcran) {
      var stage = document.querySelector('.verse-stage');
      if (!stage) return;
      var sRect = stage.getBoundingClientRect();
      var relTop = rect.top - sRect.top;
      var relBot = rect.bottom - sRect.top;
      if (relTop < sRect.height * 0.22 || relBot > sRect.height * 0.78) {
        var cible = stage.scrollTop + relTop - (sRect.height * 0.44) + (rect.height * 0.5);
        try { stage.scrollTo({ top: Math.max(0, cible), behavior: 'smooth' }); } catch (e) {}
      }
    } else {
      var vh = window.innerHeight || 700;
      if (rect.top < 88 || rect.bottom > vh - 88) {
        var cibleWin = window.scrollY + rect.top - (vh * 0.42);
        try { window.scrollTo({ top: Math.max(0, cibleWin), behavior: 'smooth' }); } catch (e) {}
      }
    }
  };
`;
  const cibleIns = '  function etapeSuiviAudioAfterEffects() {';
  if (!js.includes(cibleIns)) {
    console.error('❌ etapeSuiviAudioAfterEffects introuvable.');
    process.exit(1);
  }
  js = js.replace(cibleIns, helperCode + '\n' + cibleIns);
}

// 2. Injecter Bloc A (Mode Suivi classique — Spring 60/120/240Hz + GPU mobile)
if (!js.includes('/* AE_SPRING_LOOP_A_V1 */')) {
  const debutBlocA = '      for (var m = 0; m < items.length; m++) {';
  const finBlocA = `    if ((aud && !aud.paused) || animEnCours) {
      rafId = requestAnimationFrame(etapeSuiviAudioAfterEffects);
    } else {
      rafId = null;
    }
  }`;

  const posFnA = js.indexOf('function etapeSuiviAudioAfterEffects()');
  const idxDebutA = posFnA !== -1 ? js.indexOf(debutBlocA, posFnA) : -1;
  const idxFinA = idxDebutA !== -1 ? js.indexOf(finBlocA, idxDebutA) : -1;

  if (idxDebutA === -1 || idxFinA === -1) {
    console.error('❌ Échec localisation Bloc A :', { posFnA, idxDebutA, idxFinA });
    process.exit(1);
  }

  const nouveauBlocA = `      /* AE_SPRING_LOOP_A_V1 */
      var _stA = etapeSuiviAudioAfterEffects._st || (etapeSuiviAudioAfterEffects._st = { velE: [], lastTs: 0, lastScrollKey: '' });
      var _nowA = performance.now();
      var _dtA = _stA.lastTs ? Math.min(0.05, Math.max(0.004, (_nowA - _stA.lastTs) / 1000)) : 0.016;
      _stA.lastTs = _nowA;
      if (_stA.velE.length !== items.length) _stA.velE = new Array(items.length).fill(0);
      var _estMobA = window.__aeIsMobile ? window.__aeIsMobile() : false;
      var _alphaBleuA = 1 - Math.exp(-_dtA * 10.5);
      var _liftMaxA = _estMobA ? -5.5 : -7.2;
      var _scaleMaxA = _estMobA ? 0.085 : 0.11;

      if (lectureEnCours && !estCartes && idxEntier >= 0 && idxEntier < items.length && aud && !aud.paused) {
        var _skA = (vkActuel || '') + ':' + idxEntier;
        if (_stA.lastScrollKey !== _skA) {
          _stA.lastScrollKey = _skA;
          if (window.__aeAutoScrollDoux) window.__aeAutoScrollDoux(items[idxEntier]);
        }
      }

      for (var m = 0; m < items.length; m++) {
        var el = items[m];

        var cibleElevation = lectureEnCours && m === idxEntier ? 1.0 : 0.0;
        var omegaA = cibleElevation > energiesMots[m] ? 15.5 : 9.5;
        var resSpringA = window.__aeSpringStep(energiesMots[m], _stA.velE[m], cibleElevation, omegaA, _dtA);
        energiesMots[m] = resSpringA[0];
        _stA.velE[m] = resSpringA[1];
        if (Math.abs(energiesMots[m] - cibleElevation) < 0.0015 && Math.abs(_stA.velE[m]) < 0.01) {
          energiesMots[m] = cibleElevation;
          _stA.velE[m] = 0;
        }

        var cibleBleu = lectureEnCours && m <= idxEntier ? 1.0 : bleusMots[m];
        bleusMots[m] += (cibleBleu - bleusMots[m]) * _alphaBleuA;
        if (bleusMots[m] < 0.002) bleusMots[m] = 0;
        if (bleusMots[m] > 0.998) bleusMots[m] = 1;

        var e = Math.max(0, Math.min(1, energiesMots[m]));
        var b = Math.max(0, Math.min(1, bleusMots[m]));

        if (estCartes && window.__wbwBypassOrigCartes) continue;

        var yPx = (_liftMaxA * e).toFixed(2);
        var sc = (1.0 + _scaleMaxA * e).toFixed(4);
        var __ak = (lectureEnCours ? '1:' : '0:') + e.toFixed(3) + ':' + b.toFixed(3);
        if (el.__lastAk === __ak) continue;
        el.__lastAk = __ak;

        if (estCartes) {
          var opCarte = (0.82 + 0.18 * b).toFixed(3);
          el.style.setProperty('opacity', opCarte, 'important');
          el.style.setProperty('transform', 'translate3d(0, ' + yPx + 'px, 0) scale3d(' + (1.0 + 0.07 * e).toFixed(4) + ',' + (1.0 + 0.07 * e).toFixed(4) + ',1)', 'important');
          if (!_estMobA && b > 0.02) {
            el.style.setProperty('border-color', 'rgba(56, 189, 248, ' + (0.42 * b + 0.52 * e).toFixed(2) + ')', 'important');
          }
        } else {
          if (!el.__aeInitSpan) {
            el.__aeInitSpan = true;
            el.style.setProperty('background', 'transparent', 'important');
            el.style.setProperty('border', 'none', 'important');
            el.style.setProperty('filter', 'none', 'important');
          }
          el.style.setProperty('transform', 'translate3d(0, ' + yPx + 'px, 0) scale3d(' + sc + ',' + sc + ',1)', 'important');

          if (b < 0.025) {
            el.style.setProperty('opacity', '0.74', 'important');
            el.style.setProperty('color', 'rgba(241, 245, 249, 0.80)', 'important');
            if (el.__aeHasGlow !== false) {
              el.__aeHasGlow = false;
              el.style.setProperty('text-shadow', 'none', 'important');
            }
          } else {
            var opMot = (0.74 + 0.26 * b).toFixed(3);
            el.style.setProperty('opacity', opMot, 'important');
            el.style.setProperty('color', '#ffffff', 'important');
            var glowKey = Math.round(e * 20) + ':' + Math.round(b * 20);
            if (el.__aeGlowKey !== glowKey) {
              el.__aeGlowKey = glowKey;
              el.__aeHasGlow = true;
              if (_estMobA) {
                var rMob = (12 + 12 * e).toFixed(1);
                var aMob = (0.55 * b + 0.42 * e).toFixed(2);
                el.style.setProperty('text-shadow', '0 0 ' + rMob + 'px rgba(56, 189, 248, ' + aMob + ')', 'important');
              } else {
                var a1 = (0.85 * b + 0.15 * e).toFixed(2);
                var a2 = (0.60 * b + 0.35 * e).toFixed(2);
                el.style.setProperty(
                  'text-shadow',
                  '0 0 9px rgba(255, 255, 255, ' + (0.75 * b + 0.23 * e).toFixed(2) + '), 0 0 ' + (14 + 10 * e).toFixed(1) + 'px rgba(56, 189, 248, ' + a1 + '), 0 0 ' + (28 + 16 * e).toFixed(1) + 'px rgba(14, 165, 233, ' + a2 + ')',
                  'important'
                );
              }
            }
          }
        }
      }
    }

    var animEnCours = Boolean(window.__wbwAnimEnCours);
    if (!animEnCours) {
      for (var z = 0; z < energiesMots.length; z++) {
        if (energiesMots[z] > 0.002 || (bleusMots[z] > 0.002 && bleusMots[z] < 0.998)) {
          animEnCours = true;
          break;
        }
      }
    }

    if ((aud && !aud.paused) || animEnCours) {
      rafId = requestAnimationFrame(etapeSuiviAudioAfterEffects);
    } else {
      if (etapeSuiviAudioAfterEffects._st) etapeSuiviAudioAfterEffects._st.lastTs = 0;
      rafId = null;
    }
  }`;

  js = js.slice(0, idxDebutA) + nouveauBlocA + js.slice(idxFinA + finBlocA.length);
  console.log('✓ Bloc A (Mode Suivi classique Easy Ease Spring) injecté !');
}

// 3. Injecter Bloc B (Mode Mot à mot — Spring + dirty-checking 0 DOM inutile + GPU mobile)
if (!js.includes('/* AE_SPRING_LOOP_B_V1 */')) {
  const debutBlocB = "    var dirLecture = detecterSensLectureGrille(), audioActif = Boolean(suiviBoutonOn && (audioJoue || maxIdxAtteintVerset >= 0));";
  const finBlocB = "        forcer(meta.elTrad, 'text-shadow', ombreTr); forcer(meta.elTrad, 'border', 'none'); forcer(meta.elTrad, 'border-top', 'none');\n      }\n    }\n  };";

  const idxDebutB = js.indexOf(debutBlocB);
  const idxFinB = idxDebutB !== -1 ? js.indexOf(finBlocB, idxDebutB) : -1;

  if (idxDebutB === -1 || idxFinB === -1) {
    console.error('❌ Échec localisation Bloc B :', { idxDebutB, idxFinB });
    process.exit(1);
  }

  const nouveauBlocB = `    /* AE_SPRING_LOOP_B_V1 */
    var dirLecture = detecterSensLectureGrille(), audioActif = Boolean(suiviBoutonOn && (audioJoue || maxIdxAtteintVerset >= 0));
    var _stB = window.__wbwSpringState || (window.__wbwSpringState = { velE: [], smoothRatio: [], lastTs: 0, lastScrollIdx: -1, lastScrollCardCount: 0 });
    var _nowB = performance.now();
    var _dtB = _stB.lastTs ? Math.min(0.05, Math.max(0.004, (_nowB - _stB.lastTs) / 1000)) : 0.016;
    _stB.lastTs = _nowB;
    var _estMobB = window.__aeIsMobile ? window.__aeIsMobile() : false;

    if (_stB.velE.length !== cacheMetaCartes.length) {
      _stB.velE = new Array(cacheMetaCartes.length).fill(0);
      _stB.smoothRatio = new Array(cacheMetaCartes.length).fill(0);
    }

    var _alphaContraste = 1 - Math.exp(-_dtB * 7.5);
    var _alphaB = 1 - Math.exp(-_dtB * 10.5);
    var _alphaRatio = 1 - Math.exp(-_dtB * 16.0);
    modeContrasteSuivi += ((audioActif ? 1.0 : 0.0) - modeContrasteSuivi) * _alphaContraste;
    if (modeContrasteSuivi < 0.002) modeContrasteSuivi = 0;
    if (modeContrasteSuivi > 0.998) modeContrasteSuivi = 1;

    var versetTermine = Boolean(aud && (aud.ended || (durAudio > 0 && !audioJoue && tActuel >= durAudio - 0.15)));
    var _animBActive = (modeContrasteSuivi > 0.002 && modeContrasteSuivi < 0.998);
    var _liftMaxB = _estMobB ? -5.0 : -6.5;
    var _scaleMaxB = _estMobB ? 0.085 : 0.105;

    if (audioJoue && idxActuel >= 0 && idxActuel < cacheMetaCartes.length) {
      if (_stB.lastScrollIdx !== idxActuel || _stB.lastScrollCardCount !== cacheMetaCartes.length) {
        _stB.lastScrollIdx = idxActuel;
        _stB.lastScrollCardCount = cacheMetaCartes.length;
        if (cacheMetaCartes[idxActuel] && cacheMetaCartes[idxActuel].carte && window.__aeAutoScrollDoux) {
          window.__aeAutoScrollDoux(cacheMetaCartes[idxActuel].carte);
        }
      }
    }

    for (var m = 0; m < cacheMetaCartes.length; m++) {
      var meta = cacheMetaCartes[m];
      if (!meta || !meta.carte) continue;

      if (!meta.carte.dataset.wbwChiffresPurges) {
        purgerTousLesChiffresDeLaCarte(meta.carte, meta.elAr, meta.elTrad);
        meta.carte.dataset.wbwChiffresPurges = '1';
      }
      if (meta.elTrad && meta.elTrad.dataset.wbwTrFinal && meta.elTrad.textContent !== meta.elTrad.dataset.wbwTrFinal) {
        definirTexteSansBoucle(meta.elTrad, meta.elTrad.dataset.wbwTrFinal);
      }

      var estMotActuel = !versetTermine && suiviBoutonOn && (audioJoue || maintenant < expIdxMotForce) && (m === idxActuel || (cartes.length === 1 && (!aud || !aud.ended)));
      var estDejaLu = suiviBoutonOn && (versetTermine || m < idxActuel);
      var distanceFutur = idxActuel >= 0 ? (m - idxActuel) : (m + 1);

      var cibleE = estMotActuel ? 1.0 : 0.0;
      var curE = lissageE[m] || 0;
      var omegaB = cibleE > curE ? 15.5 : 9.5;
      var stepE = window.__aeSpringStep(curE, _stB.velE[m] || 0, cibleE, omegaB, _dtB);
      lissageE[m] = stepE[0];
      _stB.velE[m] = stepE[1];
      if (Math.abs(lissageE[m] - cibleE) < 0.0015 && Math.abs(_stB.velE[m]) < 0.01) {
        lissageE[m] = cibleE;
        _stB.velE[m] = 0;
      } else {
        _animBActive = true;
      }

      var cibleB = (estDejaLu || estMotActuel) ? 1.0 : 0.0;
      lissageB[m] = (lissageB[m] || 0) + (cibleB - (lissageB[m] || 0)) * _alphaB;
      if (Math.abs(lissageB[m] - cibleB) < 0.002) lissageB[m] = cibleB;
      else _animBActive = true;

      var e = Math.max(0, Math.min(1, lissageE[m]));
      var b = Math.max(0, Math.min(1, lissageB[m]));

      var cibleRatio = estDejaLu ? 1.0 : (estMotActuel ? ratioMotActuel : 0.0);
      if (cibleRatio < (_stB.smoothRatio[m] || 0) - 0.5) _stB.smoothRatio[m] = cibleRatio;
      else _stB.smoothRatio[m] = (_stB.smoothRatio[m] || 0) + (cibleRatio - (_stB.smoothRatio[m] || 0)) * _alphaRatio;
      var pctScrub = Math.round(Math.max(0, Math.min(1, _stB.smoothRatio[m])) * 1000) / 10;

      var stateKey =
        (estMotActuel ? '1' : '0') + (estDejaLu ? '1' : '0') + ':' +
        Math.min(3, Math.max(0, distanceFutur)) + ':' +
        e.toFixed(3) + ':' + b.toFixed(3) + ':' +
        modeContrasteSuivi.toFixed(2) + ':' +
        pctScrub.toFixed(1) + ':' + dirLecture;
      if (meta._aeLastKey === stateKey) continue;
      meta._aeLastKey = stateKey;

      if (meta.scrub && meta.scrub.wrap && meta.scrub.fill && meta.scrub.track) {
        if (meta.scrub.wrap.getAttribute('data-dir') !== dirLecture) meta.scrub.wrap.setAttribute('data-dir', dirLecture);
        forcer(meta.scrub.fill, 'width', pctScrub + '%');
        var trackMode = estMotActuel ? 'A' : (estDejaLu ? 'D' : (audioActif && distanceFutur === 1 ? 'N1' : (audioActif && distanceFutur === 2 ? 'N2' : (audioActif ? 'F1' : 'F0'))));
        if (meta._aeTrackMode !== trackMode) {
          meta._aeTrackMode = trackMode;
          if (estMotActuel) {
            meta.scrub.wrap.classList.add('wbw-scrub-active');
            forcer(meta.scrub.track, 'background', 'rgba(186, 230, 253, 0.38)');
            forcer(meta.scrub.track, 'opacity', '1');
          } else {
            meta.scrub.wrap.classList.remove('wbw-scrub-active');
            if (estDejaLu) { forcer(meta.scrub.track, 'background', 'rgba(56, 189, 248, 0.28)'); forcer(meta.scrub.track, 'opacity', '0.95'); }
            else if (audioActif && distanceFutur === 1) { forcer(meta.scrub.track, 'background', 'rgba(186, 230, 253, 0.34)'); forcer(meta.scrub.track, 'opacity', '0.68'); }
            else if (audioActif && distanceFutur === 2) { forcer(meta.scrub.track, 'background', 'rgba(148, 163, 184, 0.26)'); forcer(meta.scrub.track, 'opacity', '0.45'); }
            else { forcer(meta.scrub.track, 'background', 'rgba(148, 163, 184, 0.18)'); forcer(meta.scrub.track, 'opacity', audioActif ? '0.24' : '0.42'); }
          }
        }
      }

      var lum = Math.max(b, e), opReposBase = 0.96 - 0.54 * modeContrasteSuivi;
      if (audioActif && !estDejaLu && !estMotActuel) {
        if (distanceFutur === 1) opReposBase = Math.max(opReposBase, 0.72);
        else if (distanceFutur === 2) opReposBase = Math.max(opReposBase, 0.56);
      }
      var opMot = (opReposBase + (1.0 - opReposBase) * lum).toFixed(3);
      var scB = (1.0 + _scaleMaxB * e).toFixed(4);
      var transMot = 'translate3d(0px, ' + (_liftMaxB * e).toFixed(2) + 'px, 0px) scale3d(' + scB + ',' + scB + ',1)';

      if (meta.elAr) {
        if (!meta._aeArInit) {
          meta._aeArInit = true;
          forcer(meta.elAr, 'color', '#f8fafc');
          forcer(meta.elAr, 'border', 'none');
          forcer(meta.elAr, 'border-bottom', 'none');
        }
        forcer(meta.elAr, 'opacity', opMot);
        forcer(meta.elAr, 'transform', transMot);
        var glowArKey = (e > 0.015 || b > 0.02) ? (Math.round(e * 18) + ':' + Math.round(b * 18)) : (modeContrasteSuivi < 0.2 ? 'idle' : 'off');
        if (meta._aeGlowAr !== glowArKey) {
          meta._aeGlowAr = glowArKey;
          var ombreAr = (e > 0.015 || b > 0.02)
            ? (_estMobB
                ? ('0 0 ' + (12 + 12 * e).toFixed(1) + 'px rgba(186, 230, 253, ' + (0.45 * b + 0.45 * e).toFixed(2) + ')')
                : ('0 0 ' + (10 + 12 * e + 4 * b).toFixed(1) + 'px rgba(255, 255, 255, ' + (0.65 * b + 0.30 * e).toFixed(2) + '), 0 0 ' + (20 + 16 * e + 8 * b).toFixed(1) + 'px rgba(186, 230, 253, ' + (0.35 * b + 0.42 * e).toFixed(2) + ')'))
            : (modeContrasteSuivi < 0.2 ? '0 0 8px rgba(255, 255, 255, 0.14)' : 'none');
          forcer(meta.elAr, 'text-shadow', ombreAr);
        }
      }

      if (meta.elTrad) {
        if (!meta._aeTrInit) {
          meta._aeTrInit = true;
          forcer(meta.elTrad, 'border', 'none');
          forcer(meta.elTrad, 'border-top', 'none');
        }
        var colTrRepos = melangerRGB(186, 230, 253, 148, 163, 184, modeContrasteSuivi);
        var colTrFinal = lum > 0.01 ? melangerRGB(148, 163, 184, 255, 255, 255, lum) : colTrRepos;
        forcer(meta.elTrad, 'opacity', opMot);
        forcer(meta.elTrad, 'transform', transMot);
        forcer(meta.elTrad, 'color', colTrFinal);
        var glowTrKey = (e > 0.02 || b > 0.08) ? (Math.round(e * 15) + ':' + Math.round(b * 15)) : 'off';
        if (meta._aeGlowTr !== glowTrKey) {
          meta._aeGlowTr = glowTrKey;
          var ombreTr = (!_estMobB && (e > 0.02 || b > 0.08))
            ? ('0 0 ' + (10 * e + 5 * b).toFixed(1) + 'px rgba(255, 255, 255, ' + (0.52 * e + 0.25 * b).toFixed(2) + ')')
            : 'none';
          forcer(meta.elTrad, 'text-shadow', ombreTr);
        }
      }
    }
    window.__wbwAnimEnCours = _animBActive;
    if (!_animBActive && !audioJoue) _stB.lastTs = 0;
  };`;

  js = js.slice(0, idxDebutB) + nouveauBlocB + js.slice(idxFinB + finBlocB.length);
  console.log('✓ Bloc B (Mode Mot à mot Easy Ease Spring + mobile) injecté !');
}

// Validation stricte avant écriture
if (!js.includes('AE_SPRING_LOOP_A_V1') || !js.includes('AE_SPRING_LOOP_B_V1')) {
  console.error('❌ Validation échouée : les 2 marqueurs Easy Ease doivent être présents.');
  process.exit(1);
}
new vm.Script(js, { filename: 'site/assets/verset.js' });
writeSafe(jsPath, eol === '\r\n' ? js.replace(/\n/g, '\r\n') : js);
console.log('✓ site/assets/verset.js validé et écrit.');

// 4. Mettre à jour le tag ?v= dans site/_worker.js + SSR_VERSION + sw.js (cache-busting automatique)
const nouveauTag = String(Date.now());
let w = fs.readFileSync(workerPath, 'utf8');
w = w.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
w = w.replace(/html\.replace\(\/v=1795050050086\/g,\s*"v=\d+"\)/, `html.replace(/v=1795050050086/g, "v=${nouveauTag}")`);
writeSafe(workerPath, w);

let sw = fs.readFileSync(swPath, 'utf8');
sw = sw.replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
writeSafe(swPath, sw);
console.log(`✓ site/_worker.js (?v=${nouveauTag}) et site/sw.js mis à jour.`);
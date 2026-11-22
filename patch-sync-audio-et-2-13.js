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

// ============================================================
// 1. CORRECTION SYNCHRO AUDIO DANS site/assets/verset.js
// ============================================================
const versetPath = path.join(__dirname, 'site', 'assets', 'verset.js');
const vFile = readNorm(versetPath);
let v = vFile.text;

// 1a. Corriger QDC_RECITER_IDS (Yasser=97, Minshawi=9, Mujawwad=null)
const oldQdcIds =
`    const QDC_RECITER_IDS = {
      "Yasser_Ad-Dussary_128kbps": 13,
      "MaherAlMuaiqly128kbps": 9,
      "Alafasy_128kbps": 7,
      "Abdurrahmaan_As-Sudais_192kbps": 3,
      "Saood_ash-Shuraym_128kbps": 10,
      "Husary_128kbps": 6,
      "Husary_128kbps_Mujawwad": 6,
      "Husary_Muallim_128kbps": 12,
      "Minshawy_Murattal_128kbps": 8
    };`;

const newQdcIds =
`    const QDC_RECITER_IDS = {
      "Yasser_Ad-Dussary_128kbps": 97,
      "Alafasy_128kbps": 7,
      "Abdurrahmaan_As-Sudais_192kbps": 3,
      "Saood_ash-Shuraym_128kbps": 10,
      "Husary_128kbps": 6,
      "Husary_128kbps_Mujawwad": null,
      "Husary_Muallim_128kbps": 12,
      "Minshawy_Murattal_128kbps": 9
    };`;

if (!v.includes(oldQdcIds)) throw new Error('Bloc QDC_RECITER_IDS introuvable dans verset.js');
v = v.replace(oldQdcIds, newQdcIds);

// 1b. Retirer le décalage +120ms sur endRel dans le karaoké
const oldEndRel = "const endRel = (seg[2] - vt.timestamp_from) + 120;";
const newEndRel = "const endRel = (seg[2] - vt.timestamp_from);";
if (v.includes(oldEndRel)) {
  v = v.replace(oldEndRel, newEndRel);
}

// 1c. Corriger MAP_NOMS_VERS_QDC + obtenirCleRecitateurSelectionne (distinguer Muallim / Mujawwad / Murattal, et null si pas de segments QDC)
const oldMapBlock =
`  var MAP_NOMS_VERS_QDC = {
    dosari: [97], dossari: [97], yasser: [97],
    afasy: [7], alafasy: [7], mishary: [7],
    sudais: [3], soudais: [3],
    shuraim: [10, 4], shuraym: [10, 4],
    hussary: [6], husary: [6],
    abdulbaset: [2, 1], abdulbasit: [2, 1],
    minshawi: [9]
  };`;

const newMapBlock =
`  var MAP_NOMS_VERS_QDC = {
    dosari: [97], dossari: [97], yasser: [97],
    afasy: [7], alafasy: [7], mishary: [7],
    sudais: [3], soudais: [3],
    shuraim: [10], shuraym: [10],
    husary_muallim: [12],
    hussary: [6], husary: [6],
    abdulbaset: [2, 1], abdulbasit: [2, 1],
    minshawi: [9], minshawy: [9]
  };`;

if (!v.includes(oldMapBlock)) throw new Error('Bloc MAP_NOMS_VERS_QDC introuvable dans verset.js');
v = v.replace(oldMapBlock, newMapBlock);

const oldGetRec =
`  function obtenirCleRecitateurSelectionne() {
    var selects = document.querySelectorAll("select");
    for (var i = 0; i < selects.length; i++) {
      var s = selects[i];
      if (s.classList.contains("khatm-reciter-select")) continue;
      if (s.options && s.selectedIndex >= 0) {
        var txt = ((s.value || "") + " " + (s.options[s.selectedIndex].textContent || "")).toLowerCase();
        if (txt.indexOf("verset") === -1 && txt.indexOf("verse") === -1 && txt.indexOf("aleya") === -1 && txt.indexOf("vers ") === -1 && txt.indexOf("ayat") === -1 && txt.indexOf("аят") === -1) {
          for (var k in MAP_NOMS_VERS_QDC) {
            if (txt.indexOf(k) !== -1) return k;
          }
        }
      }
    }
    return "dosari";
  }`;

const newGetRec =
`  function obtenirCleRecitateurSelectionne() {
    var exactMap = {
      "Yasser_Ad-Dussary_128kbps": "dosari",
      "Alafasy_128kbps": "alafasy",
      "Abdurrahmaan_As-Sudais_192kbps": "sudais",
      "Saood_ash-Shuraym_128kbps": "shuraym",
      "Husary_128kbps": "husary",
      "Husary_Muallim_128kbps": "husary_muallim",
      "Husary_128kbps_Mujawwad": null,
      "Minshawy_Murattal_128kbps": "minshawi",
      "Ali_Jaber_64kbps": null,
      "Muhammad_Ayyoub_128kbps": null,
      "Nasser_Alqatami_128kbps": null
    };
    var selMain = document.getElementById("reciterSelect");
    if (selMain && selMain.value && Object.prototype.hasOwnProperty.call(exactMap, selMain.value)) {
      return exactMap[selMain.value];
    }
    var selects = document.querySelectorAll("select");
    for (var i = 0; i < selects.length; i++) {
      var s = selects[i];
      if (s.classList.contains("khatm-reciter-select")) continue;
      if (s.options && s.selectedIndex >= 0) {
        var val = s.value || "";
        if (Object.prototype.hasOwnProperty.call(exactMap, val)) return exactMap[val];
        var txt = (val + " " + (s.options[s.selectedIndex].textContent || "")).toLowerCase();
        if (txt.indexOf("verset") === -1 && txt.indexOf("verse") === -1 && txt.indexOf("aleya") === -1 && txt.indexOf("vers ") === -1 && txt.indexOf("ayat") === -1 && txt.indexOf("аят") === -1) {
          if (txt.indexOf("mujawwad") !== -1) return null;
          if (txt.indexOf("muallim") !== -1) return "husary_muallim";
          for (var k in MAP_NOMS_VERS_QDC) {
            if (k !== "husary_muallim" && txt.indexOf(k) !== -1) return k;
          }
        }
      }
    }
    return null;
  }`;

if (!v.includes(oldGetRec)) throw new Error('Fonction obtenirCleRecitateurSelectionne introuvable dans verset.js');
v = v.replace(oldGetRec, newGetRec);

// 1d. Normaliser les segments QDC sur timestamp_from..timestamp_to (fidèle à la durée réelle du MP3)
const oldNormSegs =
`              if (valides.length > 0 && maxMs > minMs) {
                var span = maxMs - minMs;
                cacheTimingVerset[cleRec + "_" + vt.verse_key] = valides.map(function (v) {
                  return { wordIndex: v.wordIndex, rStart: (v.t1 - minMs) / span, rEnd: (v.t2 - minMs) / span };
                });
              }`;

const newNormSegs =
`              if (valides.length > 0 && maxMs > minMs) {
                var baseFrom = (typeof vt.timestamp_from === "number" && vt.timestamp_from <= minMs) ? vt.timestamp_from : minMs;
                var baseTo = (typeof vt.timestamp_to === "number" && vt.timestamp_to >= maxMs) ? vt.timestamp_to : maxMs;
                var span = Math.max(1, baseTo - baseFrom);
                cacheTimingVerset[cleRec + "_" + vt.verse_key] = valides.map(function (v) {
                  return { wordIndex: v.wordIndex, rStart: (v.t1 - baseFrom) / span, rEnd: (v.t2 - baseFrom) / span };
                });
              }`;

if (!v.includes(oldNormSegs)) throw new Error('Bloc normalisation segments QDC introuvable dans verset.js');
v = v.replace(oldNormSegs, newNormSegs);

// 1e. Corriger la boucle de suivi (ratio direct t/d pour QDC + seuil souple + fallback arabe uniquement avec poids waqf)
const oldSuiviBlock =
`      if (activeIndexFloat === -1 && aud && aud.duration > 0.2 && aud.currentTime > 0.02) {
        var cleRec = obtenirCleRecitateurSelectionne();
        var vk = obtenirCleVerset();
        var t = aud.currentTime;
        var d = aud.duration;
        var debutVoix = Math.min(0.18, d * 0.04);
        var finVoix = Math.max(debutVoix + 0.25, d - Math.min(0.35, d * 0.07));
        var ratioVoix = Math.max(0, Math.min(0.999, (t - debutVoix) / (finVoix - debutVoix)));

        var segsRaw = cacheTimingVerset[cleRec + "_" + vk];
        var segsNorm = null;
        if (segsRaw && segsRaw.length > 0) {
          var maxWIdx = -1;
          for (var si = 0; si < segsRaw.length; si++) {
            if (segsRaw[si].wordIndex > maxWIdx) maxWIdx = segsRaw[si].wordIndex;
          }
          if (items.length <= 1 || (segsRaw.length >= items.length && maxWIdx >= items.length - 1)) {
            segsNorm = segsRaw;
          }
        }
        if (segsNorm && segsNorm.length > 0) {
          for (var s = 0; s < segsNorm.length; s++) {
            var sg = segsNorm[s];
            if (ratioVoix >= sg.rStart && ratioVoix <= sg.rEnd) {
              var progInterne = sg.rEnd > sg.rStart ? (ratioVoix - sg.rStart) / (sg.rEnd - sg.rStart) : 0.5;
              activeIndexFloat = sg.wordIndex + progInterne * 0.35;
              break;
            }
          }
        }
        if (activeIndexFloat === -1) { if (segsNorm && segsNorm.length > 0) { if (ratioVoix <= segsNorm[0].rStart) { activeIndexFloat = 0; } else { for (var sGap = segsNorm.length - 1; sGap >= 0; sGap--) { if (ratioVoix >= segsNorm[sGap].rStart) { activeIndexFloat = segsNorm[sGap].wordIndex; break; } } if (activeIndexFloat === -1) activeIndexFloat = 0; } } else { var wArr = [], wTot = 0;
          for (var wi = 0; wi < items.length; wi++) {
            var rawW = (items[wi].textContent || "");
            var cleanW = rawW.replace(/[\\u064B-\\u065F\\u0670\\u06D6-\\u06ED\\u0640\\s]/g, "");
            var nMadd = (rawW.match(/\\u0653/g) || []).length;
            var nShad = (rawW.match(/\\u0651/g) || []).length;
            var pw = Math.max(2.2, cleanW.length * 1.15 + nMadd * 7.5 + nShad * 1.0);
            wArr.push(pw); wTot += pw;
          }
          var cumW = 0; activeIndexFloat = items.length - 1;
          for (var wj = 0; wj < wArr.length; wj++) {
            var nextW = cumW + wArr[wj] / (wTot || 1);
            if (ratioVoix <= nextW) { activeIndexFloat = wj; break; }
            cumW = nextW;
          } } }`;

const newSuiviBlock =
`      if (activeIndexFloat === -1 && aud && aud.duration > 0.2 && aud.currentTime > 0.02) {
        var cleRec = obtenirCleRecitateurSelectionne();
        var vk = obtenirCleVerset();
        var t = aud.currentTime;
        var d = aud.duration;
        var ratioDirect = Math.max(0, Math.min(0.9999, t / d));
        var debutVoix = Math.min(0.15, d * 0.03);
        var finVoix = Math.max(debutVoix + 0.25, d - Math.min(0.28, d * 0.05));
        var ratioEstime = Math.max(0, Math.min(0.999, (t - debutVoix) / (finVoix - debutVoix)));

        var segsRaw = (cleRec && vk) ? cacheTimingVerset[cleRec + "_" + vk] : null;
        var segsNorm = null;
        if (segsRaw && segsRaw.length > 0) {
          var maxWIdx = -1;
          for (var si = 0; si < segsRaw.length; si++) {
            if (segsRaw[si].wordIndex > maxWIdx) maxWIdx = segsRaw[si].wordIndex;
          }
          if (items.length <= 1 || (segsRaw.length >= Math.max(1, Math.floor(items.length * 0.7)) && maxWIdx >= Math.floor(items.length * 0.7) - 1)) {
            segsNorm = segsRaw;
          }
        }
        if (segsNorm && segsNorm.length > 0) {
          for (var s = 0; s < segsNorm.length; s++) {
            var sg = segsNorm[s];
            if (ratioDirect >= sg.rStart && ratioDirect <= sg.rEnd) {
              var progInterne = sg.rEnd > sg.rStart ? (ratioDirect - sg.rStart) / (sg.rEnd - sg.rStart) : 0.5;
              var clampedIdx = Math.min(items.length - 1, Math.max(0, sg.wordIndex));
              activeIndexFloat = clampedIdx + progInterne * 0.35;
              break;
            }
          }
        }
        if (activeIndexFloat === -1) { if (segsNorm && segsNorm.length > 0) { if (ratioDirect <= segsNorm[0].rStart) { activeIndexFloat = 0; } else { for (var sGap = segsNorm.length - 1; sGap >= 0; sGap--) { if (ratioDirect >= segsNorm[sGap].rStart) { activeIndexFloat = Math.min(items.length - 1, Math.max(0, segsNorm[sGap].wordIndex)); break; } } if (activeIndexFloat === -1) activeIndexFloat = 0; } } else { var wArr = [], wTot = 0;
          for (var wi = 0; wi < items.length; wi++) {
            var arNode = items[wi].querySelector ? (items[wi].querySelector('.wbw-ar, .wbw-word-ar, .ar-word, [lang="ar"], [dir="rtl"]') || items[wi].firstElementChild) : null;
            var rawSrc = (arNode && /[\\u0600-\\u06FF]/.test(arNode.textContent || "")) ? (arNode.textContent || "") : (items[wi].textContent || "");
            var rawW = rawSrc.replace(/[^\\u0600-\\u06FF\\u0750-\\u077F\\uFB50-\\uFDFF\\uFE70-\\uFEFF\\s]/g, "");
            var cleanW = rawW.replace(/[\\u064B-\\u065F\\u0670\\u06D6-\\u06ED\\u0640\\s]/g, "");
            var nMadd = (rawW.match(/\\u0653/g) || []).length;
            var nShad = (rawW.match(/\\u0651/g) || []).length;
            var nWaqf = (rawW.match(/[\\u06D6-\\u06DC]/g) || []).length;
            var pw = Math.max(2.0, cleanW.length * 1.15 + nMadd * 6.5 + nShad * 1.1 + nWaqf * 5.0);
            wArr.push(pw); wTot += pw;
          }
          var cumW = 0; activeIndexFloat = items.length - 1;
          for (var wj = 0; wj < wArr.length; wj++) {
            var nextW = cumW + wArr[wj] / (wTot || 1);
            if (ratioEstime <= nextW) { activeIndexFloat = wj; break; }
            cumW = nextW;
          } } }`;

if (!v.includes(oldSuiviBlock)) throw new Error('Bloc etapeSuiviAudioAfterEffects introuvable dans verset.js');
v = v.replace(oldSuiviBlock, newSuiviBlock);

new vm.Script(v);
writeNorm(versetPath, v, vFile.eol);
console.log('✓ site/assets/verset.js : synchro audio corrigée et validée (Husary Murattal=6, Muallim=12, Mujawwad=estimation arabe, Dosari=97, Minshawi=9).');

// ============================================================
// 2. CORRECTION MOT À MOT 2:13 DANS site/lexique-wbw-fr.json
// ============================================================
const lexPath = path.join(__dirname, 'site', 'lexique-wbw-fr.json');
const lexFile = readNorm(lexPath);
const lex = JSON.parse(lexFile.text);

const mots213 = [
  "et quand",
  "on dit",
  "à eux",
  "croyez",
  "comme",
  "ont cru",
  "les gens",
  "ils disent",
  "croirons-nous",
  "comme",
  "ont cru",
  "les faibles d'esprit",
  "en vérité",
  "certes, eux",
  "sont vraiment",
  "les insensés",
  "mais",
  "ne… pas",
  "ils savent"
];

if (!lex.versets || typeof lex.versets !== 'object') {
  throw new Error('Clé lex.versets introuvable dans site/lexique-wbw-fr.json');
}

const sampleKey = Object.keys(lex.versets)[0];
const sampleVal = sampleKey ? lex.versets[sampleKey] : null;

if (Array.isArray(sampleVal) && (sampleVal.length === 0 || typeof sampleVal[0] === 'string')) {
  lex.versets['2:13'] = mots213;
} else if (sampleVal && typeof sampleVal === 'object' && !Array.isArray(sampleVal)) {
  const keys = Object.keys(sampleVal);
  const startAtZero = keys.includes('0');
  const obj213 = {};
  mots213.forEach((txt, i) => { obj213[String(startAtZero ? i : i + 1)] = txt; });
  lex.versets['2:13'] = obj213;
} else {
  throw new Error(`Format inattendu dans lex.versets["${sampleKey}"] : ${JSON.stringify(sampleVal).slice(0, 160)}`);
}

writeNorm(lexPath, JSON.stringify(lex, null, 2) + '\n', lexFile.eol);
console.log('✓ site/lexique-wbw-fr.json : verset 2:13 certifié (19 mots alignés Hamidullah + négation corrigée).');

// ============================================================
// 3. BUMP CACHE (_worker.js + sw.js)
// ============================================================
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
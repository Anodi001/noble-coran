/* ONEDRIVE_SAFE */
const fs = require('fs');
const path = require('path');

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

// ============================================================================
// 1. PATCH site/assets/verset.js
//    - Fix bug 112:3 -> 112:4 (suppression du détournement Khatm sur clic Suivant)
//    - Pause propre en fin de sourate + modale choix de la prochaine sourate
//    - Anti-doublon Hadith/Asbab (affichage unique sur le 1er verset d'une plage)
// ============================================================================
const jsPath = path.join(__dirname, 'site', 'assets', 'verset.js');
const jsFile = readNorm(jsPath);
let js = jsFile.text;

// 1a. Exposer les métadonnées des 114 sourates pour la modale de fin de sourate
const anchorMeta = '  var TOTAL_VERSETS_CORAN = 6236;';
if (!js.includes('window.__CORAN_META_114')) {
  if (!js.includes(anchorMeta)) throw new Error('Ancre TOTAL_VERSETS_CORAN introuvable dans verset.js');
  js = js.replace(
    anchorMeta,
    anchorMeta + '\n  window.__CORAN_META_114 = { nbVersets: NB_VERSETS_PAR_SOURATE, ordreRev: ORDRE_REVELATION_114, noms: NOMS_SOURATES_COURT };'
  );
}

// 1b. Corriger naviguerVerset & audio.onended : pause propre en fin de sourate + choix sourate
const oldNavEnded =
`  function naviguerVerset(ev, lien, auto) {
    const m = String(lien).split('?')[0].match(/^(?:\\/(?:en|es|ar|de|it|id|ru))?\\/?sourate-(\\d+)-verset-(\\d+)(?:\\.html)?$/i);
    if (m && Number(m[1]) === numSourateActuelle) { if (ev) ev.preventDefault(); allerAuVerset(Number(m[2]), auto); return false; }
    if (auto) { window.location.href = String(lien).split('?')[0].replace(/\\.html$/i, "") + "?autoplay=1"; return false; }
    return true;
  }
  audio.onended = () => { arreterVisuel(); if (autoCheck.checked) naviguerVerset(null, document.getElementById('nextVerseLink').getAttribute('href'), true); };`;

const newNavEnded =
`  function naviguerVerset(ev, lien, auto) {
    const m = String(lien || '').split('?')[0].match(/^(?:\\/(?:en|es|ar|de|it|id|ru))?\\/?sourate-(\\d+)-verset-(\\d+)(?:\\.html)?$/i);
    if (m && Number(m[1]) === numSourateActuelle) {
      if (ev) ev.preventDefault();
      allerAuVerset(Number(m[2]), auto);
      return false;
    }
    const estClicSuivant = Boolean(
      (ev && ev.currentTarget && ev.currentTarget.id === 'nextVerseLink') ||
      (ev && ev.target && ev.target.closest && ev.target.closest('#nextVerseLink')) ||
      (!ev && auto)
    );
    if (estClicSuivant) {
      if (ev) ev.preventDefault();
      if (window.__wbwAudioClickPro) window.__wbwAudioClickPro.stopper();
      if (!audio.paused) audio.pause();
      arreterVisuel();
      if (typeof window.__ouvrirModalFinSourate === 'function') {
        window.__ouvrirModalFinSourate(numSourateActuelle);
      }
      return false;
    }
    return true;
  }
  audio.onended = () => {
    arreterVisuel();
    if (!autoCheck.checked) return;
    const nextHref = document.getElementById('nextVerseLink').getAttribute('href');
    const mNext = String(nextHref || '').split('?')[0].match(/^(?:\\/(?:en|es|ar|de|it|id|ru))?\\/?sourate-(\\d+)-verset-(\\d+)(?:\\.html)?$/i);
    if (mNext && Number(mNext[1]) === numSourateActuelle) {
      naviguerVerset(null, nextHref, true);
    } else {
      setTimeout(() => {
        const totalV = (window.SOURATE_DATA && window.SOURATE_DATA.nbVersets) ? Number(window.SOURATE_DATA.nbVersets) : numVersetActuel;
        if (audio.paused && numVersetActuel >= totalV && typeof window.__ouvrirModalFinSourate === 'function') {
          window.__ouvrirModalFinSourate(numSourateActuelle);
        }
      }, 90);
    }
  };`;

if (js.includes(oldNavEnded)) {
  js = js.replace(oldNavEnded, newNavEnded);
} else if (!js.includes('window.__ouvrirModalFinSourate(numSourateActuelle)')) {
  throw new Error('Ancre naviguerVerset / audio.onended introuvable dans verset.js');
}

// 1c. Supprimer le détournement Khatm sur clic "Suivant" (cause du saut 112:3 -> autre sourate)
const oldKhatmNextHijack =
`      } else if (t.indexOf("Suivant") !== -1 || t.indexOf("Next") !== -1 || t.indexOf("Siguiente") !== -1 || t.indexOf("Weiter") !== -1 || t.indexOf("Successivo") !== -1 || t.indexOf("Berikutnya") !== -1 || t.indexOf("Далее") !== -1) {
        var vkNow = obtenirCleVerset();
        if (vkNow) {
          var pNow = vkNow.split(":");
          var sNow = Number(pNow[0]);
          var vNow = Number(pNow[1]);
          if (sNow && vNow && vNow >= NB_VERSETS_PAR_SOURATE[sNow]) {
            var sNext = obtenirSourateSuivanteSelonOrdre(etatKhatm.order, sNow);
            var langCurr = obtenirLangueActive();
            var sfxL = langCurr !== "fr" ? ("&lang=" + langCurr) : "";
            if (sNext) {
              etatKhatm.idxByOrder[etatKhatm.order] = convertirSourateVersetVersIndexGlobal(etatKhatm.order, sNext, 1);
              sauvegarderEtatKhatm();
              window.location.href = "sourate-" + sNext + "-verset-1?khatm_verse=1" + sfxL;
              return;
            }
          }
        }
      }`;

if (js.includes(oldKhatmNextHijack)) {
  js = js.replace(oldKhatmNextHijack, '      } /* Fin de sourate gérée proprement par la modale dédiée */');
} else if (!js.includes('Fin de sourate gérée proprement par la modale dédiée')) {
  throw new Error('Ancre détournement Khatm Suivant (ligne ~4019) introuvable dans verset.js');
}

// 1d. Anti-doublon Hadith/Asbab : ne plus recopier un même hadith sur tous les versets d'une plage
const oldConstruireIndex =
`  function construireIndex(data) {
    var idx = {};
    var recits = (data && data.recits) ? data.recits : {};
    for (var cle in recits) {
      var r = recits[cle];
      if (!r) continue;
      idx[cle] = r;
      if (Array.isArray(r.versets)) {
        for (var i = 0; i < r.versets.length; i++) idx[r.versets[i]] = r;
      }
    }
    return idx;
  }`;

const newConstruireIndex =
`  function construireIndex(data) {
    var idx = {};
    var vusParSourate = {};
    var recits = (data && data.recits) ? data.recits : {};
    var cles = Object.keys(recits).sort(function (a, b) {
      var pa = String(a).split(":"), pb = String(b).split(":");
      return (Number(pa[0]) - Number(pb[0])) || (Number(pa[1]) - Number(pb[1]));
    });
    for (var k = 0; k < cles.length; k++) {
      var cle = cles[k];
      var r = recits[cle];
      if (!r || !r.texte) continue;

      var cible = cle;
      if (Array.isArray(r.versets) && r.versets.length > 0) {
        var tries = r.versets.slice().sort(function (a, b) {
          var pa = String(a).split(":"), pb = String(b).split(":");
          return (Number(pa[0]) - Number(pb[0])) || (Number(pa[1]) - Number(pb[1]));
        });
        if (tries[0]) cible = tries[0];
      }

      var sNum = String(cible).split(":")[0];
      var empreinte = String(r.texte.fr || r.texte.en || r.texte.ar || "").replace(/\\s+/g, " ").trim().slice(0, 140).toLowerCase();
      var cleDedup = sNum + "|" + empreinte;
      if (empreinte && vusParSourate[cleDedup]) continue;
      if (empreinte) vusParSourate[cleDedup] = true;

      if (!idx[cible]) idx[cible] = r;
    }
    return idx;
  }`;

if (js.includes(oldConstruireIndex)) {
  js = js.replace(oldConstruireIndex, newConstruireIndex);
} else if (!js.includes('var vusParSourate = {};')) {
  throw new Error('Ancre construireIndex (Asbab/Hadith) introuvable dans verset.js');
}

// 1e. Nettoyer data-asbab-sig quand un verset n'a pas de hadith (évite blocage au retour sur v.1)
const oldClearAsbab =
`    if (!recit || !recit.texte) {
      if (cont.innerHTML !== "") cont.innerHTML = "";
      return;
    }`;
const newClearAsbab =
`    if (!recit || !recit.texte) {
      if (cont.innerHTML !== "") cont.innerHTML = "";
      cont.removeAttribute("data-asbab-sig");
      return;
    }`;
if (js.includes(oldClearAsbab)) {
  js = js.replace(oldClearAsbab, newClearAsbab);
}

// 1f. Ajouter le module Modale Fin de Sourate (pause propre + choix de la sourate suivante)
const MODAL_MARKER = '/* === MODULE FIN DE SOURATE & CHOIX SOURATE V1 === */';
if (!js.includes(MODAL_MARKER)) {
  const modalModule = `

${MODAL_MARKER}
(function() {
  if (window.__MODULE_FIN_SOURATE_V1__) return;
  window.__MODULE_FIN_SOURATE_V1__ = true;

  var I18N_FIN = {
    fr: {
      badge: "Lecture en pause",
      titre: "Fin de la sourate",
      sous: "La récitation est terminée et mise en pause. Choisissez dans quelle sourate continuer :",
      prec: "Sourate précédente",
      suiv: "Sourate suivante",
      rev: "Suivante (ordre de révélation)",
      choisir: "Ou choisir n'importe quelle sourate :",
      ordAsc: "1 → 114",
      ordDesc: "114 → 1",
      ordRev: "Révélation",
      ouvrir: "Aller à cette sourate ›",
      rejouer: "↻ Rejouer cette sourate",
      fermer: "Rester ici",
      versets: "v."
    },
    en: {
      badge: "Playback paused",
      titre: "End of Surah",
      sous: "Recitation has finished and paused. Choose which Surah to continue with:",
      prec: "Previous Surah",
      suiv: "Next Surah",
      rev: "Next (Revelation order)",
      choisir: "Or pick any Surah:",
      ordAsc: "1 → 114",
      ordDesc: "114 → 1",
      ordRev: "Revelation",
      ouvrir: "Go to this Surah ›",
      rejouer: "↻ Replay this Surah",
      fermer: "Stay here",
      versets: "v."
    },
    es: {
      badge: "Reproducción en pausa",
      titre: "Fin de la Sura",
      sous: "La recitación ha terminado y está en pausa. Elige con qué Sura continuar:",
      prec: "Sura anterior",
      suiv: "Sura siguiente",
      rev: "Siguiente (orden de revelación)",
      choisir: "O elige cualquier Sura:",
      ordAsc: "1 → 114",
      ordDesc: "114 → 1",
      ordRev: "Revelación",
      ouvrir: "Ir a esta Sura ›",
      rejouer: "↻ Repetir esta Sura",
      fermer: "Quedarse aquí",
      versets: "a."
    },
    ar: {
      badge: "تم إيقاف التلاوة مؤقتاً",
      titre: "نهاية سورة",
      sous: "انتهت التلاوة وتم إيقافها مؤقتاً. اختر السورة التي تريد الانتقال إليها:",
      prec: "السورة السابقة",
      suiv: "السورة التالية",
      rev: "التالية (ترتيب النزول)",
      choisir: "أو اختر أي سورة:",
      ordAsc: "1 → 114",
      ordDesc: "114 → 1",
      ordRev: "النزول",
      ouvrir: "الانتقال إلى هذه السورة ‹",
      rejouer: "↻ إعادة السورة",
      fermer: "البقاء هنا",
      versets: "آية"
    },
    de: {
      badge: "Wiedergabe pausiert",
      titre: "Ende der Sure",
      sous: "Die Rezitation ist beendet und pausiert. Wählen Sie die nächste Sure:",
      prec: "Vorherige Sure",
      suiv: "Nächste Sure",
      rev: "Nächste (Offenbarung)",
      choisir: "Oder beliebige Sure wählen:",
      ordAsc: "1 → 114",
      ordDesc: "114 → 1",
      ordRev: "Offenbarung",
      ouvrir: "Zu dieser Sure ›",
      rejouer: "↻ Sure wiederholen",
      fermer: "Hier bleiben",
      versets: "V."
    },
    it: {
      badge: "Riproduzione in pausa",
      titre: "Fine della Sura",
      sous: "La recitazione è terminata ed è in pausa. Scegli la prossima Sura:",
      prec: "Sura precedente",
      suiv: "Sura successiva",
      rev: "Successiva (Rivelazione)",
      choisir: "Oppure scegli qualsiasi Sura:",
      ordAsc: "1 → 114",
      ordDesc: "114 → 1",
      ordRev: "Rivelazione",
      ouvrir: "Vai a questa Sura ›",
      rejouer: "↻ Riascolta questa Sura",
      fermer: "Resta qui",
      versets: "v."
    },
    id: {
      badge: "Pemutaran dijeda",
      titre: "Akhir Surah",
      sous: "Bacaan telah selesai dan dijeda. Pilih Surah berikutnya:",
      prec: "Surah sebelumnya",
      suiv: "Surah berikutnya",
      rev: "Berikutnya (Urutan Wahyu)",
      choisir: "Atau pilih Surah apa saja:",
      ordAsc: "1 → 114",
      ordDesc: "114 → 1",
      ordRev: "Wahyu",
      ouvrir: "Buka Surah ini ›",
      rejouer: "↻ Putar ulang Surah",
      fermer: "Tetap di sini",
      versets: "ayat"
    },
    ru: {
      badge: "Воспроизведение на паузе",
      titre: "Конец суры",
      sous: "Чтение завершено и поставлено на паузу. Выберите следующую суру:",
      prec: "Предыдущая сура",
      suiv: "Следующая сура",
      rev: "Следующая (по ниспосланию)",
      choisir: "Или выберите любую суру:",
      ordAsc: "1 → 114",
      ordDesc: "114 → 1",
      ordRev: "Ниспослание",
      ouvrir: "Перейти к суре ›",
      rejouer: "↻ Повторить суру",
      fermer: "Остаться здесь",
      versets: "аят."
    }
  };

  function detectLang() {
    var m = (window.location.pathname || "").match(/^\\/(en|es|ar|de|it|id|ru)\\//i);
    if (m) return m[1].toLowerCase();
    var l = (document.documentElement.lang || "fr").slice(0, 2).toLowerCase();
    return I18N_FIN[l] ? l : "fr";
  }

  function prefUrl() {
    var m = (window.location.pathname || "").match(/^\\/(en|es|ar|de|it|id|ru)\\//i);
    return m ? ("/" + m[1].toLowerCase() + "/") : "/";
  }

  function allerSourate(numS) {
    var s = Math.max(1, Math.min(114, parseInt(numS, 10) || 1));
    window.location.href = prefUrl() + "sourate-" + s + "-verset-1";
  }

  function fermerModal() {
    var ov = document.getElementById("finSourateModalV1");
    if (ov) ov.classList.remove("open");
  }

  function remplirSelect(sel, ordre, defautS, t) {
    var meta = window.__CORAN_META_114;
    if (!meta || !sel) return;
    var liste = [];
    if (ordre === "desc") {
      for (var d = 114; d >= 1; d--) liste.push(d);
    } else if (ordre === "rev" && Array.isArray(meta.ordreRev)) {
      liste = meta.ordreRev.slice();
    } else {
      for (var c = 1; c <= 114; c++) liste.push(c);
    }
    var html = "";
    for (var i = 0; i < liste.length; i++) {
      var s = liste[i];
      var nom = (meta.noms && meta.noms[s]) ? meta.noms[s] : ("Sourate " + s);
      var nb = (meta.nbVersets && meta.nbVersets[s]) ? meta.nbVersets[s] : "";
      var prefix = (ordre === "rev") ? ("#" + (i + 1) + " • n°" + s + " ") : (s + ". ");
      html += '<option value="' + s + '"' + (s === defautS ? ' selected' : '') + '>' + prefix + nom + ' (' + nb + ' ' + t.versets + ')</option>';
    }
    sel.innerHTML = html;
  }

  function ouvrirModalFinSourate(numSActuel) {
    var meta = window.__CORAN_META_114;
    if (!meta) return;
    var s = parseInt(numSActuel, 10) || 1;
    var lang = detectLang();
    var t = I18N_FIN[lang] || I18N_FIN.fr;
    var isAr = lang === "ar";

    var ov = document.getElementById("finSourateModalV1");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "finSourateModalV1";
      ov.className = "fin-sourate-overlay notranslate";
      ov.setAttribute("translate", "no");
      ov.addEventListener("click", function(e) {
        if (e.target === ov) fermerModal();
      });
      document.body.appendChild(ov);
    }

    var nomActuel = (meta.noms && meta.noms[s]) ? meta.noms[s] : ("#" + s);
    var sPrec = s > 1 ? s - 1 : null;
    var sSuiv = s < 114 ? s + 1 : null;
    var sRevNext = null;
    if (Array.isArray(meta.ordreRev)) {
      var idxRev = meta.ordreRev.indexOf(s);
      if (idxRev !== -1 && idxRev + 1 < meta.ordreRev.length) {
        var cand = meta.ordreRev[idxRev + 1];
        if (cand !== sPrec && cand !== sSuiv) sRevNext = cand;
      }
    }

    var defautChoix = sSuiv || sPrec || 1;
    var ordreInitial = (s >= 78) ? "desc" : "asc";

    var quickHtml = "";
    if (sPrec) {
      quickHtml +=
        '<button type="button" class="fin-sourate-quick-btn' + (s === 114 ? ' primary' : '') + '" data-goto-s="' + sPrec + '">' +
          '<span class="fsq-label">← ' + t.prec + '</span>' +
          '<span class="fsq-name">' + sPrec + '. ' + meta.noms[sPrec] + ' <small>(' + meta.nbVersets[sPrec] + ' ' + t.versets + ')</small></span>' +
        '</button>';
    }
    if (sSuiv) {
      quickHtml +=
        '<button type="button" class="fin-sourate-quick-btn primary" data-goto-s="' + sSuiv + '">' +
          '<span class="fsq-label">' + t.suiv + ' →</span>' +
          '<span class="fsq-name">' + sSuiv + '. ' + meta.noms[sSuiv] + ' <small>(' + meta.nbVersets[sSuiv] + ' ' + t.versets + ')</small></span>' +
        '</button>';
    }
    if (sRevNext) {
      quickHtml +=
        '<button type="button" class="fin-sourate-quick-btn gold" data-goto-s="' + sRevNext + '">' +
          '<span class="fsq-label">✦ ' + t.rev + '</span>' +
          '<span class="fsq-name">n°' + sRevNext + ' ' + meta.noms[sRevNext] + ' <small>(' + meta.nbVersets[sRevNext] + ' ' + t.versets + ')</small></span>' +
        '</button>';
    }

    ov.innerHTML =
      '<div class="fin-sourate-card" dir="' + (isAr ? 'rtl' : 'ltr') + '">' +
        '<div class="fin-sourate-pill">⏸ ' + t.badge + '</div>' +
        '<h3 class="fin-sourate-title">' + t.titre + ' ' + nomActuel + ' (n°' + s + ')</h3>' +
        '<p class="fin-sourate-sub">' + t.sous + '</p>' +
        '<div class="fin-sourate-quick-grid">' + quickHtml + '</div>' +
        '<div class="fin-sourate-picker-box">' +
          '<div class="fin-sourate-picker-head">' +
            '<span>' + t.choisir + '</span>' +
            '<div class="fin-sourate-order-tabs">' +
              '<button type="button" class="fso-tab' + (ordreInitial === 'asc' ? ' active' : '') + '" data-ord="asc">' + t.ordAsc + '</button>' +
              '<button type="button" class="fso-tab' + (ordreInitial === 'desc' ? ' active' : '') + '" data-ord="desc">' + t.ordDesc + '</button>' +
              '<button type="button" class="fso-tab" data-ord="rev">' + t.ordRev + '</button>' +
            '</div>' +
          '</div>' +
          '<div class="fin-sourate-select-row">' +
            '<select id="finSourateSelectV1" class="fin-sourate-select"></select>' +
            '<button type="button" id="finSourateGoBtnV1" class="fin-sourate-go-btn">' + t.ouvrir + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="fin-sourate-footer">' +
          '<button type="button" id="finSourateReplayV1" class="fin-sourate-sec-btn">' + t.rejouer + '</button>' +
          '<button type="button" id="finSourateCloseV1" class="fin-sourate-sec-btn">' + t.fermer + '</button>' +
        '</div>' +
      '</div>';

    var selEl = ov.querySelector("#finSourateSelectV1");
    remplirSelect(selEl, ordreInitial, defautChoix, t);

    ov.querySelectorAll("[data-goto-s]").forEach(function(b) {
      b.addEventListener("click", function() { allerSourate(b.getAttribute("data-goto-s")); });
    });

    ov.querySelectorAll(".fso-tab").forEach(function(tab) {
      tab.addEventListener("click", function() {
        ov.querySelectorAll(".fso-tab").forEach(function(x) { x.classList.remove("active"); });
        tab.classList.add("active");
        var curVal = parseInt(selEl.value, 10) || defautChoix;
        remplirSelect(selEl, tab.getAttribute("data-ord"), curVal, t);
      });
    });

    ov.querySelector("#finSourateGoBtnV1").addEventListener("click", function() {
      allerSourate(selEl.value);
    });

    ov.querySelector("#finSourateReplayV1").addEventListener("click", function() {
      fermerModal();
      if (typeof allerAuVerset === "function") {
        allerAuVerset(1, true);
      } else {
        window.location.href = prefUrl() + "sourate-" + s + "-verset-1?autoplay=1";
      }
    });

    ov.querySelector("#finSourateCloseV1").addEventListener("click", fermerModal);

    requestAnimationFrame(function() { ov.classList.add("open"); });
  }

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") fermerModal();
  });

  window.__ouvrirModalFinSourate = ouvrirModalFinSourate;
})();
`;
  js += modalModule;
}

writeNorm(jsPath, js, jsFile.eol);
console.log('✓ site/assets/verset.js : fix saut 112:3->112:4 + pause fin de sourate & sélecteur + anti-doublon Hadith appliqués.');

// ============================================================================
// 2. PATCH site/assets/verset.css
//    - Badge doré animé pour #revOrderTagEl ("XXe Sourate révélée")
//    - Styles de la modale Fin de Sourate
// ============================================================================
const cssPath = path.join(__dirname, 'site', 'assets', 'verset.css');
const cssFile = readNorm(cssPath);
let css = cssFile.text;
const CSS_MARKER = '/* === REV_BADGE_GOLD_AND_END_SURAH_MODAL_V1 === */';

if (!css.includes(CSS_MARKER)) {
  const extraCss = `

${CSS_MARKER}
/* Mise en avant dorée & animée du badge "XXe Sourate révélée" */
#revOrderTagEl {
  position: relative !important;
  overflow: hidden !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.24), rgba(180, 83, 9, 0.18), rgba(251, 191, 36, 0.26)) !important;
  color: #fde68a !important;
  border: 1.5px solid rgba(251, 191, 36, 0.85) !important;
  font-weight: 800 !important;
  letter-spacing: 0.2px !important;
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.45) !important;
  box-shadow: 0 0 14px rgba(245, 158, 11, 0.34), inset 0 0 12px rgba(251, 191, 36, 0.16) !important;
  animation: revGoldPulseV1 3s ease-in-out infinite !important;
}

#revOrderTagEl::before {
  content: "✦";
  color: #fbbf24;
  font-size: 0.92em;
  text-shadow: 0 0 8px rgba(251, 191, 36, 0.85);
}

#revOrderTagEl::after {
  content: "";
  position: absolute;
  top: -30%;
  left: -70%;
  width: 48%;
  height: 160%;
  background: linear-gradient(110deg, transparent 0%, rgba(254, 243, 199, 0.48) 50%, transparent 100%);
  transform: skewX(-22deg);
  pointer-events: none;
  animation: revGoldShimmerV1 3.6s ease-in-out infinite;
}

@keyframes revGoldPulseV1 {
  0%, 100% {
    box-shadow: 0 0 12px rgba(245, 158, 11, 0.30), inset 0 0 10px rgba(251, 191, 36, 0.14);
    border-color: rgba(251, 191, 36, 0.78);
  }
  50% {
    box-shadow: 0 0 24px rgba(251, 191, 36, 0.62), inset 0 0 16px rgba(254, 243, 199, 0.24);
    border-color: rgba(254, 240, 138, 1);
  }
}

@keyframes revGoldShimmerV1 {
  0%, 58% { left: -70%; opacity: 0; }
  66% { opacity: 1; }
  100% { left: 135%; opacity: 0; }
}

/* Modale Fin de Sourate (pause propre + sélection prochaine sourate) */
.fin-sourate-overlay {
  position: fixed;
  inset: 0;
  z-index: 99995;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(2, 8, 18, 0.78);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.24s ease;
}

.fin-sourate-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

.fin-sourate-card {
  width: 100%;
  max-width: 470px;
  background: linear-gradient(165deg, rgba(10, 22, 38, 0.97), rgba(4, 12, 24, 0.98));
  border: 1.5px solid rgba(56, 189, 248, 0.42);
  border-radius: 22px;
  padding: 22px 20px 18px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.65), 0 0 32px rgba(14, 165, 233, 0.18);
  color: #f1f5f9;
  transform: translateY(14px) scale(0.97);
  transition: transform 0.26s ease;
}

.fin-sourate-overlay.open .fin-sourate-card {
  transform: translateY(0) scale(1);
}

.fin-sourate-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  border: 1px solid rgba(56, 189, 248, 0.45);
  color: #7dd3fc;
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.fin-sourate-title {
  margin: 0 0 6px;
  font-size: 1.24rem;
  font-weight: 800;
  color: #fff;
}

.fin-sourate-sub {
  margin: 0 0 16px;
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.45;
}

.fin-sourate-quick-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 9px;
  margin-bottom: 16px;
}

.fin-sourate-quick-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  width: 100%;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(15, 32, 54, 0.85);
  border: 1px solid rgba(56, 189, 248, 0.34);
  color: #e2e8f0;
  cursor: pointer;
  text-align: start;
  transition: transform 0.16s ease, border-color 0.16s ease, background 0.16s ease;
}

.fin-sourate-quick-btn:hover {
  transform: translateY(-1px);
  border-color: #38bdf8;
  background: rgba(20, 44, 74, 0.95);
}

.fin-sourate-quick-btn.primary {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.26), rgba(2, 132, 199, 0.16));
  border-color: rgba(56, 189, 248, 0.72);
}

.fin-sourate-quick-btn.gold {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(180, 83, 9, 0.12));
  border-color: rgba(251, 191, 36, 0.55);
}

.fin-sourate-quick-btn .fsq-label {
  font-size: 0.76rem;
  font-weight: 700;
  color: #7dd3fc;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.fin-sourate-quick-btn.gold .fsq-label {
  color: #fde68a;
}

.fin-sourate-quick-btn .fsq-name {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
}

.fin-sourate-quick-btn .fsq-name small {
  font-weight: 500;
  color: #94a3b8;
}

.fin-sourate-picker-box {
  background: rgba(8, 18, 32, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 14px;
  padding: 12px;
  margin-bottom: 14px;
}

.fin-sourate-picker-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.82rem;
  color: #cbd5e1;
  font-weight: 600;
  margin-bottom: 10px;
}

.fin-sourate-order-tabs {
  display: inline-flex;
  gap: 4px;
}

.fso-tab {
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid rgba(56, 189, 248, 0.28);
  background: rgba(15, 23, 42, 0.8);
  color: #94a3b8;
  font-size: 0.74rem;
  font-weight: 700;
  cursor: pointer;
}

.fso-tab.active {
  background: rgba(56, 189, 248, 0.24);
  border-color: #38bdf8;
  color: #e0f2fe;
}

.fin-sourate-select-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fin-sourate-select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 11px;
  background: #0b1728;
  border: 1px solid rgba(56, 189, 248, 0.4);
  color: #f8fafc;
  font-size: 0.94rem;
  font-weight: 600;
}

.fin-sourate-go-btn {
  width: 100%;
  padding: 11px 14px;
  border-radius: 11px;
  border: none;
  background: linear-gradient(135deg, #38bdf8, #0284c7);
  color: #021019;
  font-size: 0.94rem;
  font-weight: 800;
  cursor: pointer;
}

.fin-sourate-footer {
  display: flex;
  gap: 8px;
  justify-content: space-between;
}

.fin-sourate-sec-btn {
  flex: 1;
  padding: 9px 12px;
  border-radius: 11px;
  background: rgba(30, 41, 59, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.26);
  color: #cbd5e1;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
}

.fin-sourate-sec-btn:hover {
  border-color: rgba(56, 189, 248, 0.55);
  color: #fff;
}
`;
  writeNorm(cssPath, css + extraCss, cssFile.eol);
  console.log('✓ site/assets/verset.css : badge doré animé (#revOrderTagEl) + styles modale fin de sourate ajoutés.');
} else {
  console.log('ℹ site/assets/verset.css contient déjà REV_BADGE_GOLD_AND_END_SURAH_MODAL_V1.');
}

// ============================================================================
// 3. PATCH site/index.html
//    - Ordre de base = bouton du milieu (2. Ordre classique 1 à 114)
//    - Bouton Croissant / Décroissant (1 -> 114 / 114 -> 1)
// ============================================================================
const idxPath = path.join(__dirname, 'site', 'index.html');
const idxFile = readNorm(idxPath);
let idx = idxFile.text;

// 3a. CSS du bouton Croissant / Décroissant
const IDX_STYLE_MARKER = 'id="sortDirStyleV1"';
if (!idx.includes(IDX_STYLE_MARKER)) {
  const idxStyle = `<style ${IDX_STYLE_MARKER}>
  .sort-dir-wrap {
    display: flex;
    justify-content: center;
    margin: -6px 0 18px;
  }
  .sort-dir-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: 999px;
    background: rgba(15, 28, 46, 0.86);
    border: 1px solid rgba(56, 189, 248, 0.42);
    color: #e0f2fe;
    font-size: 0.86rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.16s ease, border-color 0.16s ease, background 0.16s ease, box-shadow 0.16s ease;
  }
  .sort-dir-btn:hover {
    border-color: #38bdf8;
    transform: translateY(-1px);
  }
  .sort-dir-btn.desc {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.24), rgba(217, 119, 6, 0.16));
    border-color: rgba(251, 191, 36, 0.8);
    color: #fde68a;
    box-shadow: 0 0 16px rgba(245, 158, 11, 0.24);
  }
  </style>\n</head>`;
  if (!idx.includes('</head>')) throw new Error('Balise </head> introuvable dans site/index.html');
  idx = idx.replace('</head>', idxStyle);
}

// 3b. Mettre "2. Ordre classique" (milieu) actif par défaut + insérer le bouton Croissant/Décroissant
const oldControls =
`    <div class="controls">
      <button class="sort-btn active" id="sortBtn2" onclick="trier('chrono', this)">1. Ordre de Révélation (1 à 114)</button>
      <button class="sort-btn" id="sortBtn1" onclick="trier('classique', this)">2. Ordre classique (1 à 114)</button>
      <button class="sort-btn miracle-tab-btn" id="sortBtn3" onclick="trier('miracles', this)">3. <span class="gold-star-icon">★</span> Les Miracles du Coran</button>
    </div>`;

const newControls =
`    <div class="controls">
      <button class="sort-btn" id="sortBtn2" onclick="trier('chrono', this)">1. Ordre de Révélation (1 à 114)</button>
      <button class="sort-btn active" id="sortBtn1" onclick="trier('classique', this)">2. Ordre classique (1 à 114)</button>
      <button class="sort-btn miracle-tab-btn" id="sortBtn3" onclick="trier('miracles', this)">3. <span class="gold-star-icon">★</span> Les Miracles du Coran</button>
    </div>
    <div class="sort-dir-wrap" id="sortDirWrap">
      <button type="button" class="sort-dir-btn" id="sortDirBtn" onclick="basculerSensTri()">↑ Ordre croissant (1 → 114)</button>
    </div>`;

if (idx.includes(oldControls)) {
  idx = idx.replace(oldControls, newControls);
} else if (!idx.includes('id="sortDirBtn"')) {
  throw new Error('Bloc .controls introuvable dans site/index.html');
}

// 3c. modeTri par défaut = 'classique' + variable sensTri = 'asc'
const oldModeInit = "    let modeTri = 'chrono', currentLang = 'fr', lastReadData = null;";
const newModeInit = "    let modeTri = 'classique', sensTri = 'asc', currentLang = 'fr', lastReadData = null;";
if (idx.includes(oldModeInit)) {
  idx = idx.replace(oldModeInit, newModeInit);
} else if (!idx.includes("sensTri = 'asc'")) {
  throw new Error('Déclaration modeTri introuvable dans site/index.html');
}

// 3d. Fonction basculerSensTri() + mise à jour visuelle dans trier()
const oldTrierFn = "    function trier(m, btn) { modeTri = m; document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); afficher(); }";
const newTrierFn =
`    function majBoutonSensTri() {
      const wrap = document.getElementById('sortDirWrap');
      const b = document.getElementById('sortDirBtn');
      if (!wrap || !b) return;
      wrap.style.display = (modeTri === 'miracles') ? 'none' : 'flex';
      const lg = (document.documentElement.lang || currentLang || 'fr').slice(0, 2).toLowerCase();
      const desc = sensTri === 'desc';
      b.classList.toggle('desc', desc);
      const mapAsc = {
        fr: '↑ Ordre croissant (1 → 114)',
        en: '↑ Ascending order (1 → 114)',
        es: '↑ Orden ascendente (1 → 114)',
        ar: '↑ ترتيب تصاعدي (1 ← 114)',
        de: '↑ Aufsteigend (1 → 114)',
        it: '↑ Ordine crescente (1 → 114)',
        id: '↑ Urutan naik (1 → 114)',
        ru: '↑ По возрастанию (1 → 114)'
      };
      const mapDesc = {
        fr: '↓ Ordre décroissant (114 → 1)',
        en: '↓ Descending order (114 → 1)',
        es: '↓ Orden descendente (114 → 1)',
        ar: '↓ ترتيب تنازلي (114 ← 1)',
        de: '↓ Absteigend (114 → 1)',
        it: '↓ Ordine decrescente (114 → 1)',
        id: '↓ Urutan turun (114 → 1)',
        ru: '↓ По убыванию (114 → 1)'
      };
      b.textContent = desc ? (mapDesc[lg] || mapDesc.fr) : (mapAsc[lg] || mapAsc.fr);
    }
    function basculerSensTri() { sensTri = (sensTri === 'asc') ? 'desc' : 'asc'; majBoutonSensTri(); afficher(); }
    function trier(m, btn) { modeTri = m; document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); majBoutonSensTri(); afficher(); }`;

if (idx.includes(oldTrierFn)) {
  idx = idx.replace(oldTrierFn, newTrierFn);
} else if (!idx.includes('function basculerSensTri()')) {
  throw new Error('Fonction trier() introuvable dans site/index.html');
}

// 3e. Appliquer sensTri (asc / desc) dans afficher()
const oldSortLogic =
`      } else if (modeTri === 'chrono') {
        liste.sort((a, b) => a.ordreRev - b.ordreRev);
      } else {
        liste.sort((a, b) => a.id - b.id);
      }`;

const newSortLogic =
`      } else if (modeTri === 'chrono') {
        liste.sort((a, b) => sensTri === 'desc' ? (b.ordreRev - a.ordreRev) : (a.ordreRev - b.ordreRev));
      } else {
        liste.sort((a, b) => sensTri === 'desc' ? (b.id - a.id) : (a.id - b.id));
      }
      if (typeof majBoutonSensTri === 'function') majBoutonSensTri();`;

if (idx.includes(oldSortLogic)) {
  idx = idx.replace(oldSortLogic, newSortLogic);
} else if (!idx.includes("sensTri === 'desc' ? (b.id - a.id)")) {
  throw new Error('Bloc liste.sort introuvable dans site/index.html');
}

writeNorm(idxPath, idx, idxFile.eol);
console.log('✓ site/index.html : Ordre classique par défaut + bouton Croissant/Décroissant (1->114 / 114->1) appliqués.');

// ============================================================================
// 4. BUMP CACHE (_worker.js + sw.js)
// ============================================================================
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
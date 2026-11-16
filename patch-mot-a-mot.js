/*ONEDRIVE_SAFE*/(function(){const _fs=require("fs"),_w=_fs.writeFileSync;_fs.writeFileSync=function(p,d,o){if(typeof d==="string"&&_fs.existsSync(p)){try{if(_fs.readFileSync(p,"utf8")===d)return;}catch(e){}}for(let i=0;i<30;i++){try{return _w.call(_fs,p,d,o);}catch(e){if(i===29)throw e;Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,100);}}};})();
const fs = require('fs');
const path = require('path');

const dossierSite = path.join(__dirname, 'site');

const styleStable = `<style id="wbw-style-v110">
  html body #flatEarthSun, html body .flat-earth-sun, html body .astre-soleil-pur-v77 {
    opacity: 1 !important; background-color: #facc15 !important;
  }
  html body #flatEarthMoon, html body .flat-earth-moon, html body .astre-lune-pure-v77 {
    opacity: 1 !important; background-color: #f1f5f9 !important;
  }
  .wbw-hide-khatm-on-surah, .wbw-masquer-doublon-v110, .maher-item-removed-v110 {
    display: none !important;
  }
  /* Désactivation totale de la modale de racine / morphologie au clic sur un mot */
  #wordMorphModal, #morphModal, #wordRootModal, #quranWordModal,
  .word-morph-modal, .morph-modal-overlay, .wbw-morph-hidden-v110 {
    display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important;
  }
  /* Bascule instantanée quand Mot à mot est désactivé */
  body.wbw-instant-off #wbwSensLectureBanner,
  body.wbw-instant-off #wbwStageContainer,
  body.wbw-instant-off .wbw-grid-container-v110,
  body.wbw-instant-off .wbw-card-v110 {
    display: none !important;
  }
  body.wbw-instant-off #arabicVerseEl,
  body.wbw-instant-off #arabicVerse,
  body.wbw-instant-off .arabic-glow-verse,
  body.wbw-instant-off #frenchVerseEl,
  body.wbw-instant-off .french-glow-verse {
    display: block !important;
  }
  .wbw-num-hidden-v110, .wbw-card-v110 sup, .wbw-card-v110 small,
  html body .wbw-card-unit::before, html body .wbw-card-unit::after,
  html body .wbw-word-box::before, html body .wbw-word-box::after,
  html body .wbw-card-v110::before, html body .wbw-card-v110::after,
  html body .wbw-card-v110 .wbw-ar-v110::before, html body .wbw-card-v110 .wbw-ar-v110::after,
  html body .wbw-card-v110 .wbw-tr-v110::before, html body .wbw-card-v110 .wbw-tr-v110::after {
    content: none !important; display: none !important; visibility: hidden !important;
    opacity: 0 !important; font-size: 0px !important; width: 0px !important;
    height: 0px !important; margin: 0px !important; padding: 0px !important;
    border: none !important; overflow: hidden !important; pointer-events: none !important;
  }
  /* Suppression totale de la ligne entre le mot arabe et le mot traduit */
  html body .wbw-card-v110, html body .wbw-word-box, html body .wbw-card-unit,
  html body .wbw-card-v110 .wbw-ar-v110, html body .wbw-card-v110 .wbw-tr-v110,
  html body .wbw-card-v110 .wbw-ar, html body .wbw-card-v110 .wbw-tr,
  html body .wbw-word-box .wbw-ar, html body .wbw-word-box .wbw-tr {
    border: none !important; border-top: none !important; border-bottom: none !important;
    border-left: none !important; border-right: none !important;
    outline: none !important; box-shadow: none !important; background-image: none !important;
    text-decoration: none !important; cursor: pointer !important;
  }
  html body .wbw-card-v110 .wbw-tr-v110, html body .wbw-word-box .wbw-tr {
    display: block !important; visibility: visible !important; height: auto !important;
    max-height: none !important; overflow: visible !important;
  }
  /* Ligne cliquable au-dessus de chaque mot */
  .wbw-scrub-wrap {
    width: calc(100% + 12px) !important; margin: 0 -6px 10px -6px !important;
    padding: 10px 0 !important; cursor: pointer !important; user-select: none !important;
    -webkit-user-select: none !important; touch-action: manipulation !important;
    position: relative !important; display: block !important; z-index: 30 !important;
    pointer-events: auto !important;
  }
  .wbw-scrub-track {
    width: 100% !important; height: 4px !important; border-radius: 999px !important;
    background: rgba(148, 163, 184, 0.22) !important; position: relative !important;
    overflow: hidden !important; pointer-events: none !important;
    transition: height 0.15s ease, background-color 0.2s ease, opacity 0.2s ease !important;
  }
  .wbw-scrub-wrap:hover .wbw-scrub-track, .wbw-scrub-wrap.wbw-scrub-active .wbw-scrub-track {
    height: 5.5px !important;
  }
  .wbw-scrub-fill {
    position: absolute !important; top: 0 !important; bottom: 0 !important;
    right: 0 !important; left: auto !important; width: 0% !important;
    border-radius: 999px !important;
    background: linear-gradient(90deg, #ffffff 0%, #bae6fd 35%, #38bdf8 100%) !important;
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.65), 0 0 4px rgba(255, 255, 255, 0.8) !important;
    pointer-events: none !important; transition: width 0.06s linear !important;
  }
  .wbw-scrub-wrap[data-dir="ltr"] .wbw-scrub-fill {
    left: 0 !important; right: auto !important;
    background: linear-gradient(90deg, #38bdf8 0%, #bae6fd 65%, #ffffff 100%) !important;
  }
  .wbw-scrub-dot { display: none !important; }

  /* Bouton & Modale Audio : Plage & Répétition (texte parfaitement lisible) */
  html body #wbwAudioRangeBtnV110 {
    background: rgba(14, 165, 233, 0.16) !important;
    color: #e0f2fe !important;
    border: 1px solid rgba(56, 189, 248, 0.45) !important;
    padding: 6px 13px !important;
    border-radius: 11px !important;
    font-family: inherit !important;
    font-size: 0.81rem !important;
    font-weight: 800 !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 6px !important;
  }
  html body #wbwAudioRangeBtnV110:hover,
  html body #wbwAudioRangeBtnV110.active {
    background: linear-gradient(135deg, #38bdf8, #0ea5e9) !important;
    color: #021019 !important;
    border-color: #7dd3fc !important;
    box-shadow: 0 0 16px rgba(56, 189, 248, 0.48) !important;
  }
  #wbwAudioRangeOverlayV110 {
    position: fixed; inset: 0; background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
    z-index: 10050; display: none; align-items: flex-end; justify-content: center; padding: 0;
  }
  @media (min-width: 640px) { #wbwAudioRangeOverlayV110 { align-items: center; padding: 16px; } }
  #wbwAudioRangeOverlayV110.open { display: flex; }
  .wbw-audio-sheet-v110 {
    width: 100%; max-width: 440px; background: #14171c;
    border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px 24px 0 0;
    padding: 12px 20px 22px 20px; color: #f8fafc;
    box-shadow: 0 -10px 45px rgba(0, 0, 0, 0.85);
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }
  @media (min-width: 640px) { .wbw-audio-sheet-v110 { border-radius: 24px; } }
  .wbw-audio-handle-v110 {
    width: 40px; height: 4px; background: rgba(255, 255, 255, 0.25);
    border-radius: 99px; margin: 0 auto 12px auto;
  }
  .wbw-audio-title-v110 {
    text-align: center; font-size: 1.02rem; font-weight: 800; color: #ffffff; margin-bottom: 14px;
  }
  .wbw-audio-row-v110 {
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; padding: 13px 4px; border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }
  .wbw-audio-row-v110:last-of-type { border-bottom: none; }
  .wbw-audio-label-v110 {
    display: inline-flex; align-items: center; gap: 12px; font-size: 0.93rem; font-weight: 600; color: #e2e8f0;
  }
  .wbw-audio-icon-v110 {
    width: 22px; text-align: center; font-size: 1rem; color: #94a3b8;
    display: inline-flex; align-items: center; justify-content: center;
  }
  .wbw-audio-select-v110 {
    background: #1e232b; color: #f8fafc; border: 1px solid rgba(56, 189, 248, 0.28);
    border-radius: 10px; padding: 7px 12px; font-family: inherit; font-size: 0.9rem;
    font-weight: 700; cursor: pointer; outline: none; min-width: 118px; text-align: right;
  }
  .wbw-audio-actions-v110 {
    display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
    margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.09);
  }
  .wbw-audio-cancel-v110 {
    background: transparent; color: #e2e8f0; border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 999px; padding: 11px 16px; font-family: inherit; font-size: 0.94rem;
    font-weight: 700; cursor: pointer;
  }
  .wbw-audio-play-v110 {
    background: linear-gradient(135deg, #56a8f5, #38bdf8); color: #ffffff; border: none;
    border-radius: 999px; padding: 11px 16px; font-family: inherit; font-size: 0.95rem;
    font-weight: 800; cursor: pointer; box-shadow: 0 6px 20px rgba(56, 189, 248, 0.38);
  }

  /* Couleurs du Tajwīd */
  html body .verse-stage [class*="ghunnah"], html body .verse-stage [class*="ikhf"], html body .verse-stage [class*="iqlab"] {
    color: #4ade80 !important; text-shadow: 0 0 10px rgba(74, 222, 128, 0.45) !important; opacity: 1 !important;
  }
  html body .verse-stage [class*="qalq"], html body .verse-stage [class*="qalaq"] {
    color: #38bdf8 !important; text-shadow: 0 0 10px rgba(56, 189, 248, 0.5) !important; opacity: 1 !important;
  }
  html body .verse-stage [class*="madd"] {
    color: #f87171 !important; text-shadow: 0 0 12px rgba(248, 113, 113, 0.5) !important; opacity: 1 !important;
  }
  html body .verse-stage [class*="idgham"], html body .verse-stage [class*="laam_shams"], html body .verse-stage [class*="tafkh"] {
    color: #fbbf24 !important; text-shadow: 0 0 10px rgba(251, 191, 36, 0.45) !important; opacity: 1 !important;
  }
  html body .verse-stage [class*="ham_wasl"], html body .verse-stage [class*="slnt"] {
    color: #94a3b8 !important; text-shadow: none !important;
  }
</style>`;

const codeClientStable = `
(function() {
  window.__wbwBypassOrigCartes = true;

  try {
    if (localStorage.getItem('wbw_tr_purge_v116') !== '1') {
      localStorage.removeItem('wbw_tr_cache_v110');
      localStorage.removeItem('wbw_tr_cache_v111');
      localStorage.removeItem('wbw_tr_cache_v113');
      localStorage.removeItem('wbw_tr_cache_v114');
      localStorage.removeItem('wbw_tr_cache_v115');
      localStorage.setItem('wbw_tr_purge_v116', '1');
    }
  } catch (e) {}

  var NOM_OFFICIEL_ASSOS = '« INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX »';
  var NUMERO_RNA_OFFICIEL = 'W343035331';
  var NUMERO_SIRET_OFFICIEL = '13288669800019';

  function mettreAJourMentionsLegalesGoogleGrants() {
    var els = document.querySelectorAll('div, p, span, strong, h3, h4, footer');
    for (var i = 0; i < els.length; i++) {
      var d = els[i];
      if (d.children.length > 0) continue;
      var txt = (d.textContent || '').trim();
      if (/Institut\\s+Muhasiba|Institut\\s+Num[ée]rique\\s+Coran|INSTITUT\\s+NUM[ÉE]RIQUE\\s+CULTURE/i.test(txt)) {
        if (d.textContent !== NOM_OFFICIEL_ASSOS) d.textContent = NOM_OFFICIEL_ASSOS;
        d.style.cssText = 'color:#38bdf8;font-weight:800;font-size:0.96rem;margin:10px 0 6px 0;text-align:center;line-height:1.45;';
        var parentModale = d.parentElement;
        if (parentModale && !parentModale.querySelector('#wbw-legal-extra-v118')) {
          var anciens = parentModale.querySelectorAll('[id^="wbw-legal-extra-v"]');
          for (var a = 0; a < anciens.length; a++) anciens[a].remove();
          var infoAssos = document.createElement('div');
          infoAssos.id = 'wbw-legal-extra-v118';
          infoAssos.style.cssText = 'font-size:0.82rem;color:#cbd5e1;margin-top:8px;margin-bottom:14px;line-height:1.6;text-align:center;padding:10px 12px;background:rgba(15,23,42,0.55);border:1px solid rgba(56,189,248,0.22);border-radius:12px;';
          var adr = 'contact' + '@' + 'corantafsir.com';
          infoAssos.innerHTML =
            '<strong>Association loi 1901 à but non lucratif</strong> • RNA : <strong>' + NUMERO_RNA_OFFICIEL + '</strong> • SIRET : <strong>' + NUMERO_SIRET_OFFICIEL + '</strong><br>' +
            '<strong>Objet :</strong> Rendre accessibles à tous la culture, les langues (français, anglais, espagnol, arabe, allemand, italien, indonésien, russe) ainsi que les études historiques et exégétiques des textes fondamentaux grâce à des supports numériques gratuits et sans publicité commerciale.<br>' +
            '<strong>Siège :</strong> Montpellier, France • <strong>Hébergement :</strong> Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA)<br>' +
            '<strong>Contact officiel :</strong> <a href="mailto:' + adr + '" style="color:#38bdf8;text-decoration:none;font-weight:700;">' + adr + '</a>';
          parentModale.insertBefore(infoAssos, d.nextSibling);
        }
      }
    }
  }

  function desactiverModaleRacineMot() {
    var tous = document.querySelectorAll('div, section, aside');
    for (var i = 0; i < tous.length; i++) {
      var el = tous[i];
      var txt = el.textContent || '';
      if (txt.indexOf('Mot coranique') !== -1 && (txt.indexOf('Lemme') !== -1 || txt.indexOf('Racine') !== -1)) {
        var st = window.getComputedStyle(el);
        if (st.position === 'fixed' || st.position === 'absolute' || el.id) {
          el.classList.add('wbw-morph-hidden-v110');
          forcer(el, 'display', 'none');
        }
      }
    }
  }

  function activerOccultationSoleilLune() {
    if (window.__skyOcclusionV110 || typeof CanvasRenderingContext2D === 'undefined') return;
    window.__skyOcclusionV110 = true;
    var proto = CanvasRenderingContext2D.prototype;
    var origClearRect = proto.clearRect, origSave = proto.save, origRestore = proto.restore;
    var origTranslate = proto.translate, origDrawImage = proto.drawImage, origArc = proto.arc;
    var origFillText = proto.fillText, origFill = proto.fill;

    function recenserOrbesSoleilLune(ctx) {
      var orbes = [];
      var els = document.querySelectorAll('#flatEarthSun, #flatEarthMoon, .flat-earth-sun, .flat-earth-moon, .astre-soleil-pur-v77, .astre-lune-pure-v77');
      for (var i = 0; i < els.length; i++) {
        var el = els[i], st = window.getComputedStyle(el);
        if (st.display === 'none' || st.visibility === 'hidden' || parseFloat(st.opacity || '1') < 0.05) continue;
        var rect = el.getBoundingClientRect();
        if (rect.width >= 30 && rect.height >= 30 && rect.bottom > 0 && rect.right > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth) {
          orbes.push({ x: rect.left + rect.width * 0.5, y: rect.top + rect.height * 0.5, r: Math.max(rect.width, rect.height) * 0.5 });
        }
      }
      ctx.__orbesDomV110 = orbes;
    }

    function visibiliteEtoile(ctx, x, y, rayonEtoile) {
      var liste = (ctx.__orbesDomV110 || []).concat(ctx.__orbesCanvasV110 || []);
      if (liste.length === 0) return 1.0;
      var pad = (rayonEtoile || 5) * 0.85, visMin = 1.0;
      for (var k = 0; k < liste.length; k++) {
        var o = liste[k], dx = x - o.x, dy = y - o.y, dist = Math.sqrt(dx * dx + dy * dy);
        var rOpaque = o.r * 1.12 + pad, rDoux = o.r * 1.38 + pad;
        if (dist <= rOpaque) return 0.0;
        if (dist < rDoux) {
          var t = (dist - rOpaque) / (rDoux - rOpaque), v = t * t * (3 - 2 * t);
          if (v < visMin) visMin = v;
        }
      }
      return visMin;
    }

    proto.clearRect = function(x, y, w, h) {
      if (this.canvas && w >= this.canvas.width * 0.8 && h >= this.canvas.height * 0.8) {
        this.__orbesCanvasV110 = []; this.__txV110 = 0; this.__tyV110 = 0; this.__stackTxV110 = [];
        recenserOrbesSoleilLune(this);
      }
      return origClearRect.apply(this, arguments);
    };
    proto.save = function() {
      if (this.canvas && this.canvas.id === 'fullPageSkyCanvas') {
        if (!this.__stackTxV110) this.__stackTxV110 = [];
        this.__stackTxV110.push({ x: this.__txV110 || 0, y: this.__tyV110 || 0 });
      }
      return origSave.apply(this, arguments);
    };
    proto.restore = function() {
      if (this.canvas && this.canvas.id === 'fullPageSkyCanvas' && this.__stackTxV110 && this.__stackTxV110.length > 0) {
        var prev = this.__stackTxV110.pop(); this.__txV110 = prev.x; this.__tyV110 = prev.y;
      }
      return origRestore.apply(this, arguments);
    };
    proto.translate = function(tx, ty) {
      if (this.canvas && this.canvas.id === 'fullPageSkyCanvas') {
        this.__txV110 = (this.__txV110 || 0) + (Number(tx) || 0);
        this.__tyV110 = (this.__tyV110 || 0) + (Number(ty) || 0);
      }
      return origTranslate.apply(this, arguments);
    };
    proto.drawImage = function(img, dx, dy, dw, dh) {
      if (this.canvas && (this.canvas.id === 'fullPageSkyCanvas' || this.canvas.width > 200)) {
        if (!this.__orbesDomV110) recenserOrbesSoleilLune(this);
        var w = typeof dw === 'number' ? dw : (img && img.width ? img.width : 0);
        var h = typeof dh === 'number' ? dh : (img && img.height ? img.height : 0);
        var vis = visibiliteEtoile(this, (this.__txV110 || 0) + (Number(dx) || 0) + w * 0.5, (this.__tyV110 || 0) + (Number(dy) || 0) + h * 0.5, Math.max(w, h) * 0.5);
        if (vis <= 0.02) return;
        if (vis < 0.99) {
          var oldAlpha = this.globalAlpha; this.globalAlpha = oldAlpha * vis;
          var res = origDrawImage.apply(this, arguments); this.globalAlpha = oldAlpha; return res;
        }
      }
      return origDrawImage.apply(this, arguments);
    };
    proto.arc = function(x, y, r, sa, ea, ccw) {
      if (r >= 22 && r <= 240 && this.canvas && this.canvas.width > 200) {
        if (!this.__orbesCanvasV110) this.__orbesCanvasV110 = [];
        if (this.__orbesCanvasV110.length < 6) this.__orbesCanvasV110.push({ x: (this.__txV110 || 0) + x, y: (this.__tyV110 || 0) + y, r: r });
        this.__skipNextStarFill = false; this.__starFadeFactor = 1.0;
      } else if (r > 0 && r <= 8 && this.canvas && this.canvas.width > 200) {
        if (!this.__orbesDomV110) recenserOrbesSoleilLune(this);
        var vis = visibiliteEtoile(this, (this.__txV110 || 0) + x, (this.__tyV110 || 0) + y, r);
        if (vis <= 0.02) { this.__skipNextStarFill = true; return; }
        this.__starFadeFactor = vis;
      } else {
        this.__skipNextStarFill = false; this.__starFadeFactor = 1.0;
      }
      return origArc.apply(this, arguments);
    };
    proto.fill = function() {
      if (this.__skipNextStarFill) { this.__skipNextStarFill = false; return; }
      if (typeof this.__starFadeFactor === 'number' && this.__starFadeFactor < 0.99) {
        var oldAlpha = this.globalAlpha; this.globalAlpha = oldAlpha * this.__starFadeFactor;
        this.__starFadeFactor = 1.0; var res = origFill.apply(this, arguments); this.globalAlpha = oldAlpha; return res;
      }
      return origFill.apply(this, arguments);
    };
    proto.fillText = function(text, x, y) {
      if (this.canvas && this.canvas.width > 200 && typeof text === 'string' && text.length <= 3) {
        if (!this.__orbesDomV110) recenserOrbesSoleilLune(this);
        var vis = visibiliteEtoile(this, (this.__txV110 || 0) + x, (this.__tyV110 || 0) + y, 7);
        if (vis <= 0.02) return;
        if (vis < 0.99) {
          var oldA = this.globalAlpha; this.globalAlpha = oldA * vis;
          var r = origFillText.apply(this, arguments); this.globalAlpha = oldA; return r;
        }
      }
      return origFillText.apply(this, arguments);
    };
  }
  activerOccultationSoleilLune();

  function forcer(el, prop, val) {
    if (el && el.style && el.style.getPropertyValue(prop) !== val) el.style.setProperty(prop, val, 'important');
  }
  function definirTexteSansBoucle(el, val) {
    if (el && el.textContent !== val) el.textContent = val;
  }
  function contientArabe(str) {
    var s = str || '';
    for (var i = 0; i < s.length; i++) { var c = s.charCodeAt(i); if (c >= 1536 && c <= 1791) return true; }
    return false;
  }
  function estPetitNumero(str) {
    var s = (str || '').replace(/[\\s\\u200E\\u200F\\u061C#\\.\\-\\(\\):]/g, '');
    if (s.length < 1 || s.length > 3) return false;
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (!(c >= 48 && c <= 57) && !((c >= 1632 && c <= 1641) || (c >= 1776 && c <= 1785))) return false;
    }
    return true;
  }
  function extraireValeurPetitNumero(str) {
    if (!estPetitNumero(str)) return 0;
    var s = (str || '').replace(/[\\s\\u200E\\u200F\\u061C#\\.\\-\\(\\):]/g, ''), out = '';
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c >= 48 && c <= 57) out += s[i];
      else if (c >= 1632 && c <= 1641) out += String(c - 1632);
      else if (c >= 1776 && c <= 1785) out += String(c - 1776);
    }
    return parseInt(out, 10) || 0;
  }
  function courbeAppleMusic(x) { var v = Math.max(0, Math.min(1, x || 0)); return v * v * (3 - 2 * v); }
  function melangerRGB(r1, g1, b1, r2, g2, b2, t) {
    var k = Math.max(0, Math.min(1, t || 0));
    return 'rgb(' + Math.round(r1 + (r2 - r1) * k) + ', ' + Math.round(g1 + (g2 - g1) * k) + ', ' + Math.round(b1 + (b2 - b1) * k) + ')';
  }
  function nettoyerArabeBrut(s) { return (s || '').replace(/[\\u064B-\\u065F\\u0670\\u06D6-\\u06ED\\u0640\\s]/g, ''); }
  function normaliserArabeCle(str) {
    return nettoyerArabeBrut(str).replace(/[إأآٱ]/g, 'ا').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
  }

  function obtenirCleVersetActuelDom() {
    var badge = document.getElementById('badgeNumEl');
    if (badge) { var m = (badge.textContent || '').match(/(\\d+)\\s*:\\s*(\\d+)/); if (m) return m[1] + ':' + m[2]; }
    if (typeof numSourateActuelle !== 'undefined' && typeof numVersetActuel !== 'undefined') return numSourateActuelle + ':' + numVersetActuel;
    var u = window.location.pathname.match(/sourate-(\\d+)-verset-(\\d+)/i);
    return u ? (u[1] + ':' + u[2]) : '';
  }

  function obtenirInfosSourateEtVerset() {
    var cle = obtenirCleVersetActuelDom(), parts = cle ? cle.split(':') : [];
    var s = parts.length === 2 ? parseInt(parts[0], 10) : (typeof numSourateActuelle !== 'undefined' ? Number(numSourateActuelle) : 1);
    var v = parts.length === 2 ? parseInt(parts[1], 10) : (typeof numVersetActuel !== 'undefined' ? Number(numVersetActuel) : 1);
    var totalV = (window.SOURATE_DATA && window.SOURATE_DATA.nbVersets) ? Number(window.SOURATE_DATA.nbVersets) : (document.getElementById('verseJumperSelect')?.options?.length || 1);
    return { s: s || 1, v: v || 1, totalV: Math.max(1, totalV || 1) };
  }

  function boutonEstActif(btn) {
    if (!btn) return false;
    if (btn.classList.contains('active') || btn.classList.contains('on') || btn.classList.contains('is-active') || btn.getAttribute('aria-pressed') === 'true') return true;
    var st = window.getComputedStyle(btn);
    var bg = (st.backgroundColor || '') + ' ' + (st.backgroundImage || '');
    if (bg.indexOf('rgb(56, 189, 248)') !== -1 || bg.indexOf('rgb(14, 165, 233)') !== -1 || bg.indexOf('rgb(2, 132, 199)') !== -1 || bg.indexOf('rgb(125, 211, 252)') !== -1) {
      return true;
    }
    var cNums = (st.color || '').split('(').pop().split(')')[0].split(',');
    if (cNums.length >= 3 && parseInt(cNums[0], 10) < 35 && parseInt(cNums[1], 10) < 45 && parseInt(cNums[2], 10) < 55) {
      return true;
    }
    return false;
  }

  function legendeTajwidEstVisible() {
    var els = document.querySelectorAll('div, span');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.children.length <= 6 && (el.textContent || '').indexOf('Ghunnah') !== -1 && (el.textContent || '').indexOf('Qalqalah') !== -1) {
        var r = el.getBoundingClientRect();
        if (r.width > 40 && r.height > 8 && window.getComputedStyle(el).display !== 'none') return true;
      }
    }
    return false;
  }

  function trouverBoutonParTexte(mots) {
    var boutons = document.querySelectorAll('button');
    for (var i = 0; i < boutons.length; i++) {
      var b = boutons[i], t = (b.textContent || '').trim();
      for (var k = 0; k < mots.length; k++) if (t.indexOf(mots[k]) !== -1) return b;
    }
    return null;
  }
  function trouverBoutonMotAMot() {
    return document.getElementById('wbwToggleBtn') || trouverBoutonParTexte(['Mot à mot', 'Word by Word', 'Пословный', 'Palabra por', 'Wort für', 'Parola per', 'Kata demi', 'كلمة بكلمة']);
  }
  function trouverBoutonTajwid() { return trouverBoutonParTexte(['Tajw', 'Таджвид', 'تجويد']); }
  function estModeMotAMotActif() {
    var btnWbw = trouverBoutonMotAMot();
    return btnWbw ? boutonEstActif(btnWbw) : document.body.classList.contains('wbw-mode-on');
  }

  var wbwFontScale = 1.0;
  try {
    var savedScale = parseFloat(localStorage.getItem('wbw_font_scale_v110') || '1.0');
    if (savedScale >= 0.65 && savedScale <= 1.85) wbwFontScale = savedScale;
  } catch (e) {}

  function appliquerTailleSurMetaCartes() {
    var hRem = (3.35 * wbwFontScale).toFixed(2) + 'rem';
    var arFont = 'calc(clamp(2.15rem, 3.6vw, 2.75rem) * ' + wbwFontScale.toFixed(2) + ')';
    var trFont = (0.92 * Math.pow(wbwFontScale, 0.78)).toFixed(3) + 'rem';
    var trMaxW = Math.round(145 * wbwFontScale) + 'px';
    for (var i = 0; i < cacheMetaCartes.length; i++) {
      var m = cacheMetaCartes[i];
      if (!m) continue;
      if (m.elAr) { forcer(m.elAr, 'min-height', hRem); forcer(m.elAr, 'line-height', hRem); forcer(m.elAr, 'font-size', arFont); }
      if (m.elTrad) { forcer(m.elTrad, 'font-size', trFont); forcer(m.elTrad, 'max-width', trMaxW); }
    }
  }

  function estElementVersetNormal(el) {
    if (!el) return false;
    return el.id === 'arabicVerse' || el.id === 'arabicVerseEl' || el.id === 'frenchVerseEl' || el.classList.contains('arabic-glow-verse') || el.classList.contains('french-glow-verse');
  }

  function cacherGrilleMotAMotQuandInactif() {
    document.body.classList.add('wbw-instant-off');
    var banner = document.getElementById('wbwSensLectureBanner');
    if (banner) {
      forcer(banner, 'display', 'none');
      var g = banner.nextElementSibling;
      if (g && !estElementVersetNormal(g) && !g.classList.contains('stage-blue-nav')) forcer(g, 'display', 'none');
    }
    var stage = document.getElementById('wbwStageContainer');
    if (stage) forcer(stage, 'display', 'none');
    var cartesRestantes = document.querySelectorAll('.wbw-card-v110, .wbw-word-box, .wbw-card-unit');
    for (var i = 0; i < cartesRestantes.length; i++) {
      var p = cartesRestantes[i].parentElement;
      if (p && !estElementVersetNormal(p) && !p.classList.contains('verse-stage') && !p.classList.contains('stage-blue-nav')) {
        p.classList.add('wbw-grid-container-v110');
        forcer(p, 'display', 'none');
      }
    }
  }

  function extraireIndiceOrdreCarte(carte) {
    if (!carte) return 0;
    if (carte.dataset && carte.dataset.wbwOrd) return parseInt(carte.dataset.wbwOrd, 10) || 0;
    var attrNum = carte.getAttribute('data-word-num') || carte.getAttribute('data-widx') || carte.getAttribute('data-word-index') || carte.getAttribute('data-index');
    if (attrNum) {
      var nAttr = parseInt(attrNum, 10);
      if (!isNaN(nAttr) && nAttr >= 0) {
        carte.dataset.wbwOrd = String(nAttr + (carte.hasAttribute('data-widx') ? 1 : 0));
        return parseInt(carte.dataset.wbwOrd, 10);
      }
    }
    var tous = carte.querySelectorAll('*');
    for (var i = 0; i < tous.length; i++) {
      var v = extraireValeurPetitNumero(tous[i].textContent || '');
      if (v > 0) { carte.dataset.wbwOrd = String(v); return v; }
    }
    return 0;
  }

  function ordonnerCartesSensLecture(liste) {
    if (!liste || liste.length <= 1) return liste || [];
    var copie = liste.slice(), tousOntOrdre = true;
    for (var i = 0; i < copie.length; i++) if (!extraireIndiceOrdreCarte(copie[i])) { tousOntOrdre = false; break; }
    if (tousOntOrdre) copie.sort(function(a, b) { return extraireIndiceOrdreCarte(a) - extraireIndiceOrdreCarte(b); });
    return copie;
  }

  function grilleCorrespondAuVersetActuel(cartes) {
    if (!cartes || cartes.length === 0) return false;
    var cleDom = obtenirCleVersetActuelDom();
    if (cleDom && cleDom !== '19:1' && cartes.length === 1) {
      if (nettoyerArabeBrut(cartes[0].textContent || '').indexOf('كهيعص') !== -1) return false;
    }
    return true;
  }

  function obtenirCartesMotAMotUniversel() {
    if (!estModeMotAMotActif()) {
      cacherGrilleMotAMotQuandInactif();
      return [];
    }
    document.body.classList.remove('wbw-instant-off');
    var cartesDejaDom = document.querySelectorAll('.wbw-card-v110, .wbw-word-box, .wbw-card-unit');
    for (var k = 0; k < cartesDejaDom.length; k++) {
      var pk = cartesDejaDom[k].parentElement;
      if (pk && !estElementVersetNormal(pk) && !pk.classList.contains('verse-stage') && !pk.classList.contains('stage-blue-nav')) {
        pk.classList.add('wbw-grid-container-v110');
        forcer(pk, 'display', 'flex');
      }
    }
    var stage = document.getElementById('wbwStageContainer');
    if (stage) {
      forcer(stage, 'display', 'flex');
      var boxes = stage.querySelectorAll('.wbw-word-box, .wbw-card-unit, .wbw-card-v110');
      if (boxes && boxes.length >= 1) {
        var arr = Array.prototype.slice.call(boxes);
        if (grilleCorrespondAuVersetActuel(arr)) return ordonnerCartesSensLecture(arr);
      }
    }
    var banner = document.getElementById('wbwSensLectureBanner');
    if (banner && banner.nextElementSibling) {
      var g = banner.nextElementSibling;
      if (!estElementVersetNormal(g) && !g.classList.contains('stage-blue-nav')) {
        g.classList.add('wbw-grid-container-v110');
        forcer(g, 'display', 'flex');
        var ch = [];
        for (var i = 0; i < g.children.length; i++) {
          var c = g.children[i];
          if (c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE' && contientArabe(c.textContent || '')) ch.push(c);
        }
        if (ch.length >= 1 && grilleCorrespondAuVersetActuel(ch)) return ordonnerCartesSensLecture(ch);
      }
    }
    if (typeof window.__obtenirCartesWBWOrig === 'function') {
      try {
        var orig = window.__obtenirCartesWBWOrig() || [];
        if (orig.length >= 1 && grilleCorrespondAuVersetActuel(orig)) return ordonnerCartesSensLecture(orig);
      } catch (e) {}
    }
    return [];
  }
  window.__obtenirCartesWBW = obtenirCartesMotAMotUniversel;

  var initDefautFait = false;

  function supprimerMaherEtForcerYasser() {
    var rpElements = document.querySelectorAll('.rp-item, [data-reciter], .rp-panel div, .rp-panel li, .rp-panel button');
    var itemYasser = null;
    for (var i = 0; i < rpElements.length; i++) {
      var it = rpElements[i];
      var txtIt = (it.textContent || '') + ' ' + (it.getAttribute('data-reciter') || '');
      if (it.children.length <= 4 && /maher|muaiqly|ماهر|Махер/i.test(txtIt)) {
        it.classList.add('maher-item-removed-v110');
        forcer(it, 'display', 'none');
        if (it.parentNode) { try { it.parentNode.removeChild(it); } catch (e) {} }
      } else if (!itemYasser && (it.classList.contains('rp-item') || it.hasAttribute('data-reciter')) && /yasser|dosari|dossary|dussary|الدوسري|Досари/i.test(txtIt)) {
        itemYasser = it;
      }
    }

    var selects = document.querySelectorAll('select');
    for (var s = 0; s < selects.length; s++) {
      var sel = selects[s];
      if (sel.classList.contains('wbw-audio-select-v110') || sel.classList.contains('khatm-reciter-select') || sel.id === 'verseJumperSelect') continue;
      for (var o = sel.options.length - 1; o >= 0; o--) {
        var optTxt = (sel.options[o].textContent || '') + ' ' + (sel.options[o].value || '');
        if (/maher|muaiqly|ماهر|Махер/i.test(optTxt)) sel.remove(o);
      }
      if (!window.__userPickedReciterManuallyV110) {
        var yasserIdx = -1;
        for (var y = 0; y < sel.options.length; y++) {
          var yTxt = (sel.options[y].textContent || '') + ' ' + (sel.options[y].value || '');
          if (/yasser|dosari|dossary|dussary|الدوسري|Досари/i.test(yTxt)) { yasserIdx = y; break; }
        }
        if (yasserIdx !== -1 && sel.selectedIndex !== yasserIdx) {
          sel.selectedIndex = yasserIdx;
          sel.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }

    if (window.__userPickedReciterManuallyV110) return;

    try {
      for (var k = 0; k < localStorage.length; k++) {
        var cle = localStorage.key(k);
        if (cle && /recit|sheikh|qari|lecteur|audio/i.test(cle)) {
          var val = localStorage.getItem(cle) || '';
          if (!/yasser|dosari|dossary|dussary/i.test(val)) {
            localStorage.setItem(cle, 'Yasser_Ad-Dussary_128kbps');
          }
        }
      }
    } catch (e) {}

    var rpBtn = document.querySelector('.rp-btn');
    if (rpBtn && itemYasser) {
      var txtBtn = rpBtn.textContent || '';
      if (!/yasser|dosari|dossary|dussary|الدوسري|Досари/i.test(txtBtn)) {
        itemYasser.click();
        var rpPanel = document.querySelector('.rp-panel');
        if (rpPanel) rpPanel.classList.remove('open');
        rpBtn.setAttribute('aria-expanded', 'false');
      }
    }
  }

  var TEXTES_AUDIO_MODAL_I18N = {
    fr: { btn: '🔁 Plage & Répétition', title: 'Audio', start: 'Début de la plage', end: 'Fin de la plage', repSel: 'Répéter la sélection', repAyah: 'Répéter le verset', none: 'Aucune', times: 'fois', inf: '∞ Infini', cancel: 'Annuler', stop: 'Arrêter la boucle', play: 'Lire' },
    en: { btn: '🔁 Audio Range', title: 'Audio', start: 'Start Range', end: 'End Range', repSel: 'Repeat selection', repAyah: 'Repeat Ayah', none: 'None', times: 'times', inf: '∞ Infinite', cancel: 'Cancel', stop: 'Stop Loop', play: 'Play' },
    es: { btn: '🔁 Rango y Repetición', title: 'Audio', start: 'Inicio del rango', end: 'Fin del rango', repSel: 'Repetir selección', repAyah: 'Repetir aleya', none: 'Ninguna', times: 'veces', inf: '∞ Infinito', cancel: 'Cancelar', stop: 'Detener bucle', play: 'Reproducir' },
    ar: { btn: '🔁 نطاق التكرار', title: 'الصوت والتكرار', start: 'بداية النطاق', end: 'نهاية النطاق', repSel: 'تكرار المقطع', repAyah: 'تكرار الآية', none: 'بدون', times: 'مرات', inf: '∞ بلا حدود', cancel: 'إلغاء', stop: 'إيقاف التكرار', play: 'تشغيل' },
    de: { btn: '🔁 Bereich & Wiederholung', title: 'Audio', start: 'Startbereich', end: 'Endbereich', repSel: 'Auswahl wiederholen', repAyah: 'Vers wiederholen', none: 'Keine', times: 'Mal', inf: '∞ Unendlich', cancel: 'Abbrechen', stop: 'Stoppen', play: 'Abspielen' },
    it: { btn: '🔁 Intervallo Audio', title: 'Audio', start: 'Inizio intervallo', end: 'Fine intervallo', repSel: 'Ripeti selezione', repAyah: 'Ripeti versetto', none: 'Nessuna', times: 'volte', inf: '∞ Infinito', cancel: 'Annulla', stop: 'Ferma ciclo', play: 'Riproduci' },
    id: { btn: '🔁 Rentang & Ulangi', title: 'Audio', start: 'Mulai Rentang', end: 'Akhir Rentang', repSel: 'Ulangi pilihan', repAyah: 'Ulangi Ayat', none: 'Tidak ada', times: 'kali', inf: '∞ Tak terbatas', cancel: 'Batal', stop: 'Hentikan', play: 'Putar' },
    ru: { btn: '🔁 Диапазон и повтор', title: 'Аудио', start: 'Начало диапазона', end: 'Конец диапазона', repSel: 'Повтор выбора', repAyah: 'Повтор аята', none: 'Нет', times: 'раз(а)', inf: '∞ Бесконечно', cancel: 'Отмена', stop: 'Остановить', play: 'Слушать' }
  };

  var etatAudioRange = { actif: false, sourate: 0, startV: 1, endV: 1, repeatSelMax: 1, repeatAyahMax: 1, compteurSel: 1, compteurAyah: 1 };

  function mettreAJourBoutonAudioRange() {
    var btn = document.getElementById('wbwAudioRangeBtnV110');
    if (!btn) return;
    var lang = obtenirLanguePage(), t = TEXTES_AUDIO_MODAL_I18N[lang] || TEXTES_AUDIO_MODAL_I18N.fr, info = obtenirInfosSourateEtVerset();
    if (etatAudioRange.actif && etatAudioRange.sourate === info.s) {
      btn.classList.add('active');
      var lblAyah = etatAudioRange.repeatAyahMax === -1 ? '∞' : (etatAudioRange.repeatAyahMax > 1 ? (etatAudioRange.compteurAyah + '/' + etatAudioRange.repeatAyahMax) : '');
      var lblSel = etatAudioRange.repeatSelMax === -1 ? '∞' : (etatAudioRange.repeatSelMax > 1 ? (etatAudioRange.compteurSel + '/' + etatAudioRange.repeatSelMax) : '');
      var details = [lblAyah ? ('v.' + lblAyah) : '', lblSel ? ('↻' + lblSel) : ''].filter(Boolean).join(' ');
      btn.textContent = '🔁 ' + info.s + ':' + etatAudioRange.startV + '➔' + etatAudioRange.endV + (details ? (' (' + details + ')') : '');
    } else {
      btn.classList.remove('active');
      btn.textContent = t.btn;
    }
  }

  function naviguerEtJouerVerset(numV) {
    if (typeof window.allerAuVerset === 'function') { window.allerAuVerset(numV, true); return; }
    var selJ = document.getElementById('verseJumperSelect');
    if (selJ && selJ.options.length >= numV) { selJ.selectedIndex = numV - 1; selJ.dispatchEvent(new Event('change', { bubbles: true })); }
    setTimeout(function() {
      var aud = document.getElementById('ayahAudio');
      if (aud && aud.paused) { var playBtn = document.getElementById('playSyncBtn'); if (playBtn) playBtn.click(); else aud.play().catch(function() {}); }
    }, 90);
  }

  function installerIntercepteurFinAudio() {
    var aud = document.getElementById('ayahAudio');
    if (!aud || aud.__wbwRangeHookedV110) return;
    aud.__wbwRangeHookedV110 = true;
    aud.addEventListener('ended', function(ev) {
      var info = obtenirInfosSourateEtVerset();
      if (!etatAudioRange.actif || etatAudioRange.sourate !== info.s) return;
      ev.stopImmediatePropagation();
      if ((etatAudioRange.repeatAyahMax === -1) || (etatAudioRange.compteurAyah < etatAudioRange.repeatAyahMax)) {
        etatAudioRange.compteurAyah++; mettreAJourBoutonAudioRange();
        window.__wbwResetDemande = true; aud.currentTime = 0; aud.play().catch(function() {}); return;
      }
      etatAudioRange.compteurAyah = 1;
      if (info.v < etatAudioRange.endV && info.v < info.totalV) { mettreAJourBoutonAudioRange(); naviguerEtJouerVerset(info.v + 1); return; }
      if ((etatAudioRange.repeatSelMax === -1) || (etatAudioRange.compteurSel < etatAudioRange.repeatSelMax)) {
        etatAudioRange.compteurSel++; mettreAJourBoutonAudioRange();
        if (info.v !== etatAudioRange.startV) naviguerEtJouerVerset(etatAudioRange.startV);
        else { window.__wbwResetDemande = true; aud.currentTime = 0; aud.play().catch(function() {}); }
        return;
      }
      etatAudioRange.actif = false; mettreAJourBoutonAudioRange();
      if (typeof arreterVisuel === 'function') { try { arreterVisuel(); } catch (e) {} }
    }, true);
  }

  function ouvrirModaleAudioRange() {
    var overlay = document.getElementById('wbwAudioRangeOverlayV110');
    if (!overlay) return;
    var lang = obtenirLanguePage(), t = TEXTES_AUDIO_MODAL_I18N[lang] || TEXTES_AUDIO_MODAL_I18N.fr, info = obtenirInfosSourateEtVerset();
    var startDef = (etatAudioRange.actif && etatAudioRange.sourate === info.s) ? etatAudioRange.startV : info.v;
    var endDef = (etatAudioRange.actif && etatAudioRange.sourate === info.s) ? etatAudioRange.endV : info.totalV;
    var repSelDef = (etatAudioRange.actif && etatAudioRange.sourate === info.s) ? etatAudioRange.repeatSelMax : 1;
    var repAyahDef = (etatAudioRange.actif && etatAudioRange.sourate === info.s) ? etatAudioRange.repeatAyahMax : 1;
    var optsStart = '', optsEnd = '';
    for (var i = 1; i <= info.totalV; i++) {
      optsStart += '<option value="' + i + '"' + (i === startDef ? ' selected' : '') + '>' + info.s + ':' + i + '</option>';
      optsEnd += '<option value="' + i + '"' + (i === endDef ? ' selected' : '') + '>' + info.s + ':' + i + '</option>';
    }
    var valeursRep = [{ val: 1, txt: t.none }, { val: 2, txt: '2 ' + t.times }, { val: 3, txt: '3 ' + t.times }, { val: 5, txt: '5 ' + t.times }, { val: 10, txt: '10 ' + t.times }, { val: -1, txt: t.inf }];
    var optsRepSel = '', optsRepAyah = '';
    for (var r = 0; r < valeursRep.length; r++) {
      var it = valeursRep[r];
      optsRepSel += '<option value="' + it.val + '"' + (it.val === repSelDef ? ' selected' : '') + '>' + it.txt + '</option>';
      optsRepAyah += '<option value="' + it.val + '"' + (it.val === repAyahDef ? ' selected' : '') + '>' + it.txt + '</option>';
    }
    var sheet = overlay.querySelector('.wbw-audio-sheet-v110');
    sheet.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
    sheet.innerHTML =
      '<div class="wbw-audio-handle-v110"></div><div class="wbw-audio-title-v110">' + t.title + '</div>' +
      '<div class="wbw-audio-row-v110"><span class="wbw-audio-label-v110"><span class="wbw-audio-icon-v110">|&lt;</span> ' + t.start + '</span><select id="wbwStartRangeSelV110" class="wbw-audio-select-v110">' + optsStart + '</select></div>' +
      '<div class="wbw-audio-row-v110"><span class="wbw-audio-label-v110"><span class="wbw-audio-icon-v110">&gt;|</span> ' + t.end + '</span><select id="wbwEndRangeSelV110" class="wbw-audio-select-v110">' + optsEnd + '</select></div>' +
      '<div class="wbw-audio-row-v110"><span class="wbw-audio-label-v110"><span class="wbw-audio-icon-v110">↻</span> ' + t.repSel + '</span><select id="wbwRepSelV110" class="wbw-audio-select-v110">' + optsRepSel + '</select></div>' +
      '<div class="wbw-audio-row-v110"><span class="wbw-audio-label-v110"><span class="wbw-audio-icon-v110">↺</span> ' + t.repAyah + '</span><select id="wbwRepAyahV110" class="wbw-audio-select-v110">' + optsRepAyah + '</select></div>' +
      '<div class="wbw-audio-actions-v110"><button type="button" id="wbwAudioCancelBtnV110" class="wbw-audio-cancel-v110">' + (etatAudioRange.actif ? t.stop : t.cancel) + '</button><button type="button" id="wbwAudioPlayBtnV110" class="wbw-audio-play-v110">' + t.play + '</button></div>';
    var selS = document.getElementById('wbwStartRangeSelV110'), selE = document.getElementById('wbwEndRangeSelV110');
    selS.addEventListener('change', function() { if (parseInt(selE.value, 10) < parseInt(selS.value, 10)) selE.value = selS.value; });
    selE.addEventListener('change', function() { if (parseInt(selE.value, 10) < parseInt(selS.value, 10)) selS.value = selE.value; });
    document.getElementById('wbwAudioCancelBtnV110').addEventListener('click', function() {
      if (etatAudioRange.actif) { etatAudioRange.actif = false; var aud = document.getElementById('ayahAudio'); if (aud && !aud.paused) aud.pause(); mettreAJourBoutonAudioRange(); }
      overlay.classList.remove('open');
    });
    document.getElementById('wbwAudioPlayBtnV110').addEventListener('click', function() {
      var sVal = parseInt(selS.value, 10) || 1, eVal = Math.max(sVal, parseInt(selE.value, 10) || sVal);
      etatAudioRange.actif = true; etatAudioRange.sourate = info.s; etatAudioRange.startV = sVal; etatAudioRange.endV = eVal;
      etatAudioRange.repeatSelMax = parseInt(document.getElementById('wbwRepSelV110').value, 10) || 1;
      etatAudioRange.repeatAyahMax = parseInt(document.getElementById('wbwRepAyahV110').value, 10) || 1;
      etatAudioRange.compteurSel = 1; etatAudioRange.compteurAyah = 1;
      overlay.classList.remove('open'); mettreAJourBoutonAudioRange();
      var aud = document.getElementById('ayahAudio');
      if (info.v !== sVal) naviguerEtJouerVerset(sVal);
      else if (aud) {
        window.__wbwResetDemande = true; aud.currentTime = 0;
        if (aud.paused) { var playBtn = document.getElementById('playSyncBtn'); if (playBtn) playBtn.click(); else aud.play().catch(function() {}); }
      }
    });
    overlay.classList.add('open');
  }

  function assurerBoutonEtModaleAudioRange() {
    var estPageSourate = /sourate-\\d+/i.test(window.location.pathname) || Boolean(document.querySelector('#arabicVerse, #arabicVerseEl, .arabic-glow-verse'));
    if (!estPageSourate) return;
    installerIntercepteurFinAudio();
    if (!document.getElementById('wbwAudioRangeOverlayV110')) {
      var ov = document.createElement('div'); ov.id = 'wbwAudioRangeOverlayV110'; ov.innerHTML = '<div class="wbw-audio-sheet-v110"></div>';
      ov.addEventListener('click', function(e) { if (e.target === ov) ov.classList.remove('open'); });
      document.body.appendChild(ov);
    }
    if (!document.getElementById('wbwAudioRangeBtnV110')) {
      var cible = trouverBoutonParTexte(['Suivi', 'Follow', 'Слежение', 'Seguimiento', 'Verfolgen', 'Segui', 'Ikuti', 'تتبع']) || trouverBoutonTajwid() || document.getElementById('replaySyncBtn');
      if (cible && cible.parentElement) {
        var btn = document.createElement('button'); btn.type = 'button'; btn.id = 'wbwAudioRangeBtnV110';
        btn.addEventListener('click', ouvrirModaleAudioRange);
        cible.parentElement.insertBefore(btn, cible.nextSibling);
      }
    }
    mettreAJourBoutonAudioRange();
  }

  function initialiserModesSurSourate() {
    supprimerMaherEtForcerYasser();
    assurerBoutonEtModaleAudioRange();
    if (initDefautFait) return;
    var estPageSourate = window.location.pathname.indexOf('sourate-') !== -1 || Boolean(document.querySelector('#arabicVerse, #arabicVerseEl, .arabic-glow-verse'));
    if (!estPageSourate) return;
    var btnWbw = trouverBoutonMotAMot(), btnTajwid = trouverBoutonTajwid();
    var btnSuivi = trouverBoutonParTexte(['Suivi', 'Follow', 'Слежение', 'Seguimiento', 'Verfolgen', 'Segui', 'Ikuti', 'تتبع']);
    if (!btnSuivi || !btnTajwid) return;
    initDefautFait = true;

    function forcerEtatInitial() {
      if (window.__userClickedModeBtnV115) return;
      supprimerMaherEtForcerYasser();
      if (btnWbw && boutonEstActif(btnWbw)) btnWbw.click();
      if (btnTajwid && (!boutonEstActif(btnTajwid) && !legendeTajwidEstVisible())) btnTajwid.click();
      if (btnSuivi && !boutonEstActif(btnSuivi)) btnSuivi.click();
      window.__wbwSuiviBoutonActif = true;
      cacherGrilleMotAMotQuandInactif();
    }
    forcerEtatInitial();
    setTimeout(forcerEtatInitial, 80);
    setTimeout(forcerEtatInitial, 260);
  }

  function masquerBlocProgressionSurSourate() {
    var kWidget = document.getElementById('khatmPlannerWidgetV77');
    if (kWidget && (/sourate-\\d+/i.test(window.location.pathname) || document.querySelector('#arabicVerse, #arabicVerseEl, .arabic-glow-verse'))) {
      kWidget.classList.add('wbw-hide-khatm-on-surah'); forcer(kWidget, 'display', 'none');
    }
  }

  function gererMasquageDoublonVerset(cartes, grilleVisible) {
    var caches = document.querySelectorAll('.wbw-masquer-doublon-v104, .wbw-masquer-doublon-v105, .wbw-masquer-doublon-v106, .wbw-masquer-doublon-v107, .wbw-masquer-doublon-v108, .wbw-masquer-doublon-v109, .wbw-masquer-doublon-v110, .wbw-masquer-doublon-v111, .wbw-masquer-doublon-v112, .wbw-masquer-traduction-bas');
    if (!grilleVisible || !cartes || cartes.length < 1 || !estModeMotAMotActif()) {
      for (var c = 0; c < caches.length; c++) {
        caches[c].classList.remove('wbw-masquer-doublon-v110', 'wbw-masquer-traduction-bas');
        caches[c].style.removeProperty('display');
      }
      var vNorms = document.querySelectorAll('#arabicVerseEl, #arabicVerse, .arabic-glow-verse');
      for (var v = 0; v < vNorms.length; v++) { vNorms[v].classList.remove('wbw-masquer-doublon-v110'); forcer(vNorms[v], 'display', 'block'); }
      if (obtenirLanguePage() !== 'ar') {
        var fNorms = document.querySelectorAll('#frenchVerseEl, .french-glow-verse');
        for (var f = 0; f < fNorms.length; f++) { fNorms[f].classList.remove('wbw-masquer-doublon-v110'); forcer(fNorms[f], 'display', 'block'); }
      }
      return;
    }
    var grille = cartes[0].parentElement, boite = grille ? grille.parentElement : null;
    if (!boite) return;
    var tous = boite.querySelectorAll('p, div, h1, h2, h3, h4');
    for (var i = 0; i < tous.length; i++) {
      var el = tous[i];
      if (el === grille || el.id === 'wbwSensLectureBanner' || el.contains(grille) || grille.contains(el)) continue;
      if (el.querySelector('button') || el.tagName === 'BUTTON' || el.classList.contains('stage-blue-nav') || el.classList.contains('sync-progress-track')) continue;
      var t = (el.textContent || '').trim();
      if (estElementVersetNormal(el) || /^\\d+\\s*[\\.:\\-]/.test(t) || el.tagName === 'P') {
        el.classList.add('wbw-masquer-doublon-v110'); forcer(el, 'display', 'none');
      }
    }
  }

  var tableMuqattaat = { 'الم': 'Alif Lām Mīm', 'المص': 'Alif Lām Mīm Sād', 'الر': 'Alif Lām Rā', 'المر': 'Alif Lām Mīm Rā', 'كهيعص': 'Kāf Hā Yā ʿAyn Sād', 'طه': 'Tā Hā', 'طسم': 'Tā Sīn Mīm', 'طس': 'Tā Sīn', 'يس': 'Yā Sīn', 'ص': 'Sād', 'حم': 'Hā Mīm', 'عسق': 'ʿAyn Sīn Qāf', 'حمعسق': 'Hā Mīm ʿAyn Sīn Qāf', 'ق': 'Qāf', 'ن': 'Nūn' };

  var dicoArabeFr = {
    'من': 'de', 'عنه': 'de lui', 'عنهم': 'd’eux', 'دونهم': 'en dehors d’eux', 'دون': 'en dehors de',
    'في': 'dans', 'علي': 'sur', 'الي': 'vers', 'اليها': 'vers elle', 'اليه': 'vers lui', 'اليهم': 'vers eux',
    'لها': 'devant elle', 'له': 'pour lui', 'لهم': 'pour eux', 'لكم': 'pour vous', 'لنا': 'pour nous',
    'فاتخذت': 'Puis elle prit', 'حجابا': 'un voile', 'فارسلنا': 'Nous envoyâmes alors', 'روحنا': 'Notre Esprit',
    'فتمثل': 'et il se présenta', 'بشرا': 'sous la forme d’un homme', 'سويا': 'parfait',
    'افرايت': 'As-tu vu', 'الذي': 'celui qui', 'كفر': 'a mécru', 'باياتنا': 'en Nos versets', 'اياتنا': 'Nos versets',
    'بايات': 'aux versets', 'ايات': 'versets', 'وقال': 'et a dit', 'لاوتين': 'On me donnera certes', 'مالا': 'des biens', 'وولدا': 'et des enfants',
    'وان': 'Et si', 'ان': 'si', 'كنتم': 'vous êtes', 'ريب': 'un doute', 'مما': 'sur ce que', 'نزلنا': 'Nous avons révélé',
    'عبدنا': 'Notre serviteur', 'عبده': 'Son serviteur', 'فاتوا': 'apportez donc', 'بسوره': 'une sourate', 'سوره': 'une sourate',
    'مثله': 'semblable à ceci', 'وادعوا': 'et appelez', 'شهداءكم': 'vos témoins', 'الله': 'd’Allāh', 'صادقين': 'véridiques',
    'مني': 'de moi', 'واشتعل': 'et s’est embrasée', 'الراس': 'la tête', 'شيبا': 'de cheveux blancs',
    'ولم': 'et je n’ai pas', 'اكن': 'été', 'بدعايك': 'en T’invoquant', 'شقيا': 'malheureux',
    'وهن': 's’est affaibli', 'العظم': 'mes os', 'ذكر': 'Le rappel', 'رحمت': 'de la miséricorde',
    'زكريا': 'Zakariyyā', 'اذ': 'Quand', 'نادي': 'il invoqua', 'ربه': 'son Seigneur', 'ربك': 'de ton Seigneur',
    'نداء': 'd’un appel', 'خفيا': 'secret', 'والقلم': 'Par la plume', 'يسطرون': 'ils écrivent',
    'بنعمه': 'par la grâce de', 'بمجنون': 'un possédé'
  };

  var dicoInstantaneFr = {
    'like it': 'semblable à ceci', '(the) like of it': 'semblable à ceci', 'the like of it': 'semblable à ceci',
    'in our verses': 'en Nos versets', 'our verses': 'Nos versets', 'his verses': 'Ses versets', 'verses': 'versets',
    'dans nos vers': 'en Nos versets', 'nos vers': 'Nos versets',
    'our slave': 'Notre serviteur', 'his slave': 'Son serviteur', 'my slave': 'Mon serviteur', 'notre esclave': 'Notre serviteur',
    'a chapter': 'une sourate', 'un chapitre': 'une sourate',
    'then produce': 'apportez donc', 'puis produire': 'apportez donc',
    'and call': 'et appelez', 'other than': 'en dehors de', 'autre que': 'en dehors de',
    'truthful': 'véridiques', 'when': 'Quand', 'nun': 'Nūn', 'by the pen': 'Par la plume',
    'and what': 'et ce qu’', 'they inscribe': 'ils écrivent', 'stand': 'Lève-toi', 'stand (in prayer)': 'Lève-toi (en prière)',
    'support': 'Lève-toi', 'and flared': 'et s’est embrasée', 'flared': 's’est embrasée',
    'with white': 'de cheveux blancs', '(with) white': 'de cheveux blancs', 'white hair': 'de cheveux blancs',
    'unblessed': 'malheureux', 'of me': 'de moi', 'from me': 'de moi', 'and not': 'et je n’ai pas',
    'i have been': 'été', 'in my supplication to you': 'en T’invoquant', 'in (the) name': 'au nom', 'in the name': 'au nom',
    'the one who': 'Celui qui', 'who': 'qui', 'created': 'a créé', 'read': 'Lis', 'recite': 'Lis',
    'your lord': 'ton Seigneur', 'and your lord': 'Et ton Seigneur', '(is) the most generous': 'est le Très Généreux',
    'the most generous': 'le Très Généreux', 'taught': 'a enseigné', 'man': 'à l’homme',
    'what': 'ce que', 'not': 'ne ... pas', 'he knew': 'il savait', 'from': 'de',
    'a clinging substance': 'une adhérence', 'clinging substance': 'une adhérence'
  };

  function estMotArabePluriel(arNorm) {
    return /(تم|كم|وا|ون|ين|هم|هن|تن|نا)$/.test(arNorm);
  }

  function desambiguiserAnglaisCoranique(enBrut, arNorm) {
    var s = (enBrut || '').replace(/^\\(is\\)\\s*/i, '').replace(/[\\[\\]\\(\\)]/g, '').replace(/\\s{2,}/g, ' ').trim();
    if (/^(the\\s+)?like(\\s+of)?\\s+(it|him|them|this|that)$/i.test(s)) return 'similar to it';
    s = s.replace(/\\bour\\s+verses\\b/gi, 'Our Quranic verses').replace(/\\bverses\\b/gi, 'Quranic verses');
    s = s.replace(/\\bour\\s+slave\\b/gi, 'Our servant').replace(/\\bhis\\s+slave\\b/gi, 'His servant').replace(/\\bslaves\\b/gi, 'servants').replace(/\\bslave\\b/gi, 'servant');
    s = s.replace(/\\ba\\s+chapter\\b/gi, 'a Surah');
    if (estMotArabePluriel(arNorm)) {
      s = s.replace(/\\byou\\s+are\\b/gi, 'you all are').replace(/\\byou\\s+were\\b/gi, 'you all were');
    }
    return s;
  }

  function corrigerFrancaisSelonMorphologieArabe(tr, arNorm) {
    var out = (tr || '').trim();
    if (/^j.aime\\s+ça$/i.test(out)) return 'semblable à ceci';
    out = out.replace(/\\bdans\\s+nos\\s+vers\\b/gi, 'en Nos versets').replace(/\\bnos\\s+vers\\b/gi, 'Nos versets');
    out = out.replace(/\\bnotre\\s+esclave\\b/gi, 'Notre serviteur').replace(/\\bson\\s+esclave\\b/gi, 'Son serviteur');
    out = out.replace(/\\bun\\s+chapitre\\b/gi, 'une sourate');
    if (estMotArabePluriel(arNorm)) {
      if (/^tu\\s+es$/i.test(out)) return 'vous êtes';
      if (/^tu\\s+étais$/i.test(out)) return 'vous étiez';
      if (/^et\\s+appelle$/i.test(out)) return 'et appelez';
      if (/^véridique$/i.test(out)) return 'véridiques';
      out = out.replace(/^tu\\s+/i, 'vous ');
    }
    return out;
  }

  var cacheTradMots = {};
  try { cacheTradMots = JSON.parse(localStorage.getItem('wbw_tr_cache_v116') || '{}'); } catch (e) {}
  var enCoursTrad = {}, prochainEssaiTrad = {};

  function obtenirLanguePage() {
    var p = new URLSearchParams(window.location.search).get('lang');
    return p ? p.slice(0, 2).toLowerCase() : ((document.documentElement.lang || 'fr').slice(0, 2).toLowerCase() || 'fr');
  }

  function nettoyerEtTraduireMotUneFois(elTrad, elAr, lang, forcerRetraduction) {
    if (!elTrad) return;
    if (!forcerRetraduction && elTrad.dataset.wbwTrOk === lang && elTrad.dataset.wbwTrLock === '1') {
      if (elTrad.dataset.wbwTrFinal && elTrad.textContent !== elTrad.dataset.wbwTrFinal) {
        definirTexteSansBoucle(elTrad, elTrad.dataset.wbwTrFinal);
      }
      return;
    }

    var brut = (elTrad.textContent || '').trim(), txtAr = elAr ? (elAr.textContent || '') : '';
    var arPur = nettoyerArabeBrut(txtAr), arNorm = normaliserArabeCle(txtAr);

    function figerTraduction(valFinale) {
      definirTexteSansBoucle(elTrad, valFinale);
      elTrad.dataset.wbwTrFinal = valFinale;
      elTrad.dataset.wbwTrOk = lang;
      elTrad.dataset.wbwTrLock = '1';
    }

    if (tableMuqattaat[arPur]) { figerTraduction(tableMuqattaat[arPur]); return; }
    if (lang === 'fr' && dicoArabeFr[arNorm]) { figerTraduction(dicoArabeFr[arNorm]); return; }
    if (!brut) return;

    if (brut.indexOf('_') !== -1) {
      brut = brut.split('_').join(' ').replace(/\\s{2,}/g, ' ').trim();
      definirTexteSansBoucle(elTrad, brut);
    }
    if (lang === 'en' || lang === 'ar') { figerTraduction(brut); return; }

    var cleMin = brut.toLowerCase().replace(/\\s{2,}/g, ' ');
    if (lang === 'fr' && dicoInstantaneFr[cleMin]) {
      figerTraduction(corrigerFrancaisSelonMorphologieArabe(dicoInstantaneFr[cleMin], arNorm));
      return;
    }

    if (lang === 'fr') {
      var corrigeImmediate = corrigerFrancaisSelonMorphologieArabe(brut, arNorm);
      if (corrigeImmediate !== brut) {
        figerTraduction(corrigeImmediate);
        return;
      }
    }

    var cle = lang + ':' + arNorm + ':' + cleMin;
    if (cacheTradMots[cle]) {
      var valCache = lang === 'fr' ? corrigerFrancaisSelonMorphologieArabe(cacheTradMots[cle], arNorm) : cacheTradMots[cle];
      figerTraduction(valCache);
      return;
    }

    if (/[àâäéèêëîïôöùûüçœæ]/i.test(brut) && lang === 'fr') {
      figerTraduction(corrigerFrancaisSelonMorphologieArabe(brut, arNorm));
      return;
    }

    if (enCoursTrad[cle] || Date.now() < (prochainEssaiTrad[cle] || 0)) return;
    enCoursTrad[cle] = true;

    var propreEn = desambiguiserAnglaisCoranique(brut, arNorm);
    fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + encodeURIComponent(lang) + '&dt=t&q=' + encodeURIComponent(propreEn))
      .then(function(r) { return r.ok ? r.json() : Promise.reject(new Error('HTTP')); })
      .then(function(d) {
        if (d && d[0] && d[0][0] && d[0][0][0]) {
          var tr = d[0].map(function(x) { return x[0] || ''; }).join('').trim();
          if (tr) {
            if (lang === 'fr') {
              if (dicoInstantaneFr[tr.toLowerCase()]) tr = dicoInstantaneFr[tr.toLowerCase()];
              tr = corrigerFrancaisSelonMorphologieArabe(tr, arNorm);
            }
            cacheTradMots[cle] = tr;
            try { localStorage.setItem('wbw_tr_cache_v116', JSON.stringify(cacheTradMots)); } catch (e) {}
            if (elTrad && elTrad.isConnected && obtenirLanguePage() === lang) {
              figerTraduction(tr);
            }
          }
        }
      })
      .catch(function() { prochainEssaiTrad[cle] = Date.now() + 15000; })
      .finally(function() { delete enCoursTrad[cle]; });
  }

  var cacheMetaCartes = [], derniereSigPreparation = '', lissageE = [], lissageB = [];
  var modeContrasteSuivi = 0, maxIdxAtteintVerset = -1, dernierTempsAudio = 0, derniereCleVersetVue = '', dernierTimestampRaf = 0;
  var idxMotEnCoursCache = -1, debutTempsMotActuel = 0, idxMotForceDebut = -1, expIdxMotForce = 0, tempsDebutReelObserve = {};

  if (!window.__captureClickScrubEtRacineV110) {
    window.__captureClickScrubEtRacineV110 = true;
    window.addEventListener('click', function(e) {
      var surScrub = e.target && e.target.closest && e.target.closest('.wbw-scrub-wrap');
      if (surScrub) {
        e.stopPropagation(); e.stopImmediatePropagation(); e.preventDefault();
        return false;
      }
      var carteCliquee = e.target && e.target.closest ? e.target.closest('.wbw-card-v110, .wbw-word-box, .wbw-card-unit') : null;
      if (carteCliquee) {
        e.stopPropagation(); e.stopImmediatePropagation(); e.preventDefault();
        var idxCarte = (parseInt(carteCliquee.dataset.wbwOrd, 10) || 1) - 1;
        allerAuDebutDuMot(idxCarte);
        return false;
      }
      var motNormalClique = e.target && e.target.closest ? e.target.closest('.inline-clickable-word, .ar-word-follow') : null;
      if (motNormalClique) {
        e.stopPropagation(); e.stopImmediatePropagation();
        return false;
      }
      if (e.isTrusted && e.target && e.target.closest && e.target.closest('.rp-item')) {
        window.__userPickedReciterManuallyV110 = true;
      }
      var btn = e.target && e.target.closest ? e.target.closest('button') : null;
      if (btn) {
        if (e.isTrusted && !btn.classList.contains('rp-btn')) {
          window.__userClickedModeBtnV115 = true;
        }
        var txt = (btn.textContent || '').replace(/\\s+/g, '');
        if (txt === 'A+' || txt === 'A＋') {
          wbwFontScale = Math.min(1.75, Math.round((wbwFontScale + 0.12) * 100) / 100);
          try { localStorage.setItem('wbw_font_scale_v110', String(wbwFontScale)); } catch (err) {}
          appliquerTailleSurMetaCartes();
        } else if (txt === 'A-' || txt === 'A−' || txt === 'A–') {
          wbwFontScale = Math.max(0.70, Math.round((wbwFontScale - 0.12) * 100) / 100);
          try { localStorage.setItem('wbw_font_scale_v110', String(wbwFontScale)); } catch (err) {}
          appliquerTailleSurMetaCartes();
        }
      }
      setTimeout(mettreAJourMentionsLegalesGoogleGrants, 10);
      setTimeout(desactiverModaleRacineMot, 10);
    }, true);
  }

  function detruireNoeudNumero(el) {
    if (!el || el.classList.contains('wbw-ar-v110') || el.classList.contains('wbw-tr-v110') || el.classList.contains('wbw-ar') || el.classList.contains('wbw-tr')) return;
    el.dataset.wbwIsNum = '1';
    if (el.textContent !== '') el.textContent = '';
    el.classList.add('wbw-num-hidden-v110'); forcer(el, 'display', 'none');
  }

  function purgerTousLesChiffresDeLaCarte(carte, elAr, elTrad) {
    if (!carte) return;
    extraireIndiceOrdreCarte(carte);
    if (carte.hasAttribute('data-word-num')) carte.removeAttribute('data-word-num');
    if (carte.hasAttribute('data-index')) carte.removeAttribute('data-index');
    var tous = carte.querySelectorAll('*');
    for (var i = 0; i < tous.length; i++) {
      var sub = tous[i];
      if (sub === elAr || sub === elTrad || sub.classList.contains('wbw-scrub-wrap') || (sub.closest && sub.closest('.wbw-scrub-wrap'))) continue;
      if (sub.classList.contains('wbw-ar-v110') || sub.classList.contains('wbw-tr-v110') || sub.classList.contains('wbw-ar') || sub.classList.contains('wbw-tr')) continue;
      if ((elAr && elAr.contains(sub) && !estPetitNumero(sub.textContent)) || (elTrad && elTrad.contains(sub))) continue;
      if (sub.dataset.wbwIsNum === '1' || sub.tagName === 'SUP' || sub.tagName === 'SMALL' || (sub.children.length === 0 && estPetitNumero(sub.textContent))) detruireNoeudNumero(sub);
    }
  }

  function calculerFenetresMots(dureeAudio) {
    var n = cacheMetaCartes.length;
    if (n === 0 || !dureeAudio || !isFinite(dureeAudio) || dureeAudio <= 0) return [];
    var segs = window.__wbwSegsActuels;
    if (segs && segs.length > 0) {
      var fenetresQdc = new Array(n), nbTrouves = 0;
      for (var s = 0; s < segs.length; s++) {
        var sg = segs[s];
        if (sg && sg.length >= 3) {
          var wIdx = Number(sg[0]) - 1;
          if (wIdx >= 0 && wIdx < n) {
            fenetresQdc[wIdx] = { t0: Number(sg[1]) / 1000, t1: Number(sg[2]) / 1000 };
            nbTrouves++;
          }
        }
      }
      if (nbTrouves === n) return fenetresQdc;
    }
    var poids = new Array(n), totalPoids = 0;
    for (var i = 0; i < n; i++) {
      var m = cacheMetaCartes[i], arTxt = m && m.elAr ? nettoyerArabeBrut(m.elAr.textContent || '') : '';
      poids[i] = Math.max(2.2, arTxt.length * 1.15); totalPoids += poids[i];
    }
    var cumul = 0, fenetres = new Array(n), dureeUtile = Math.max(0.2, dureeAudio * 0.96);
    for (var j = 0; j < n; j++) {
      var dMot = (poids[j] / totalPoids) * dureeUtile;
      fenetres[j] = { t0: cumul, t1: cumul + dMot }; cumul += dMot;
    }
    return fenetres;
  }

  function detecterSensLectureGrille() {
    if (cacheMetaCartes.length >= 2 && cacheMetaCartes[0].carte && cacheMetaCartes[1].carte) {
      var r0 = cacheMetaCartes[0].carte.getBoundingClientRect(), r1 = cacheMetaCartes[1].carte.getBoundingClientRect();
      if (Math.abs(r0.top - r1.top) < 35) return r0.left >= r1.left ? 'rtl' : 'ltr';
    }
    return 'rtl';
  }

  function allerAuDebutDuMot(idxMot) {
    if (idxMot < 0 || idxMot >= cacheMetaCartes.length) return;
    maxIdxAtteintVerset = idxMot;
    idxMotEnCoursCache = idxMot;
    debutTempsMotActuel = performance.now();
    idxMotForceDebut = idxMot;
    expIdxMotForce = performance.now() + 950;

    for (var r = 0; r < cacheMetaCartes.length; r++) {
      lissageE[r] = (r === idxMot) ? 1 : 0;
      lissageB[r] = (r <= idxMot) ? 1 : 0;
    }

    var aud = document.getElementById('ayahAudio') || window.__lecteurAudioActuel || document.querySelector('audio');
    if (!aud) return;

    var positionnerEtJouer = function() {
      var dur = aud.duration;
      var tCible = 0;
      if (idxMot > 0 && dur && isFinite(dur) && dur > 0) {
        var fen = calculerFenetresMots(dur);
        if (fen[idxMot] && typeof fen[idxMot].t0 === 'number') {
          tCible = Math.max(0, Math.min(dur - 0.08, fen[idxMot].t0));
        } else if (typeof tempsDebutReelObserve[idxMot] === 'number') {
          tCible = Math.max(0, Math.min(dur - 0.08, tempsDebutReelObserve[idxMot]));
        } else {
          tCible = (idxMot / cacheMetaCartes.length) * dur;
        }
      }
      try { aud.currentTime = tCible; } catch (e) {}
      if (aud.paused) {
        var p = aud.play();
        if (p && typeof p.catch === 'function') {
          p.catch(function() {
            var playBtn = document.getElementById('playSyncBtn');
            if (playBtn) playBtn.click();
          });
        }
      }
    };

    if (!aud.src || aud.readyState === 0) {
      var playBtnInit = document.getElementById('playSyncBtn');
      if (playBtnInit && aud.paused) playBtnInit.click();
      aud.addEventListener('loadedmetadata', function onMeta() {
        aud.removeEventListener('loadedmetadata', onMeta);
        positionnerEtJouer();
      });
    } else {
      positionnerEtJouer();
    }

    if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW(performance.now());
  }

  function creerBarreScrubPourCarte(carte, idxMot) {
    var wrap = carte.querySelector('.wbw-scrub-wrap');
    if (!wrap) {
      wrap = document.createElement('div'); wrap.className = 'wbw-scrub-wrap'; wrap.setAttribute('data-dir', 'rtl');
      wrap.innerHTML = '<div class="wbw-scrub-track"><div class="wbw-scrub-fill"></div></div>';
      carte.insertBefore(wrap, carte.firstChild);
    }
    wrap.dataset.wbwIdx = String(idxMot);
    if (!wrap.__scrubEventsAttached) {
      wrap.__scrubEventsAttached = true;
      ['click', 'dblclick', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'pointerup'].forEach(function(evtName) {
        wrap.addEventListener(evtName, function(ev) {
          ev.stopPropagation(); ev.stopImmediatePropagation();
          if (evtName === 'click') ev.preventDefault();
        }, false);
      });
      wrap.addEventListener('pointerdown', function(ev) {
        ev.stopPropagation(); ev.stopImmediatePropagation(); ev.preventDefault();
        allerAuDebutDuMot(parseInt(wrap.dataset.wbwIdx, 10) || 0);
      }, false);
    }
    return { wrap: wrap, track: wrap.querySelector('.wbw-scrub-track'), fill: wrap.querySelector('.wbw-scrub-fill') };
  }

  function preparerGrilleSiNecessaire(cartes) {
    if (!cartes || cartes.length < 1 || !estModeMotAMotActif()) {
      cacheMetaCartes = []; derniereSigPreparation = ''; cacherGrilleMotAMotQuandInactif(); gererMasquageDoublonVerset(null, false); return false;
    }
    var grille = cartes[0].parentElement;
    if (!grille) { gererMasquageDoublonVerset(null, false); return false; }
    gererMasquageDoublonVerset(cartes, true);
    var banner = document.getElementById('wbwSensLectureBanner');
    if (banner) forcer(banner, 'display', cartes.length <= 1 ? 'none' : 'block');
    var lang = obtenirLanguePage(), cleDom = obtenirCleVersetActuelDom();
    var sig = cleDom + ':' + lang + ':' + cartes.length;
    if (sig === derniereSigPreparation && cacheMetaCartes.length === cartes.length && cacheMetaCartes[0] && cacheMetaCartes[0].carte === cartes[0] && cacheMetaCartes[0].elAr && cacheMetaCartes[0].elAr.isConnected && cartes[0].classList.contains('wbw-card-v110')) {
      for (var u = 0; u < cacheMetaCartes.length; u++) if (cacheMetaCartes[u] && cacheMetaCartes[u].elTrad) nettoyerEtTraduireMotUneFois(cacheMetaCartes[u].elTrad, cacheMetaCartes[u].elAr, lang);
      return true;
    }
    if (sig !== derniereSigPreparation || lissageE.length !== cartes.length) {
      maxIdxAtteintVerset = -1; idxMotEnCoursCache = -1; tempsDebutReelObserve = {}; modeContrasteSuivi = 0;
      window.__wbwEnergies = []; window.__wbwBleus = [];
      lissageE = new Array(cartes.length).fill(0); lissageB = new Array(cartes.length).fill(0);
    }
    derniereSigPreparation = sig; cacheMetaCartes = new Array(cartes.length);
    forcer(grille, 'display', 'flex'); forcer(grille, 'flex-wrap', 'wrap'); forcer(grille, 'justify-content', 'center');
    forcer(grille, 'align-items', 'flex-start'); forcer(grille, 'gap', '6px 4px'); forcer(grille, 'row-gap', '24px');
    forcer(grille, 'margin-top', cartes.length === 1 ? '6px' : '20px'); forcer(grille, 'margin-bottom', '14px');
    forcer(grille, 'padding', cartes.length === 1 ? '10px 10px' : '16px 10px'); forcer(grille, 'background', 'transparent');
    forcer(grille, 'border', 'none'); forcer(grille, 'box-shadow', 'none');

    var hRem = (3.35 * wbwFontScale).toFixed(2) + 'rem';
    var arFont = 'calc(clamp(2.15rem, 3.6vw, 2.75rem) * ' + wbwFontScale.toFixed(2) + ')';
    var trFont = (0.92 * Math.pow(wbwFontScale, 0.78)).toFixed(3) + 'rem';
    var trMaxW = Math.round(145 * wbwFontScale) + 'px';

    for (var m = 0; m < cartes.length; m++) {
      var carte = cartes[m];
      carte.dataset.wbwOrd = String(m + 1);
      carte.classList.add('wbw-card-v110');
      forcer(carte, 'margin', '0px'); forcer(carte, 'padding', '2px 8px 4px 8px'); forcer(carte, 'background', 'transparent');
      forcer(carte, 'border', 'none'); forcer(carte, 'box-shadow', 'none'); forcer(carte, 'display', 'inline-flex');
      forcer(carte, 'flex-direction', 'column'); forcer(carte, 'align-items', 'center'); forcer(carte, 'transform', 'none');
      var elAr = null, elTrad = null, directs = carte.children;
      for (var d = 0; d < directs.length; d++) {
        var ch = directs[d];
        if (ch.classList.contains('wbw-scrub-wrap')) continue;
        var tCh = (ch.textContent || '').trim();
        if (estPetitNumero(tCh) || ch.tagName === 'SUP' || ch.tagName === 'SMALL') detruireNoeudNumero(ch);
        else if (!elAr && (ch.classList.contains('wbw-ar') || ch.classList.contains('wbw-ar-v110') || contientArabe(tCh))) elAr = ch;
        else if (ch !== elAr && (ch.classList.contains('wbw-tr') || ch.classList.contains('wbw-tr-v110') || tCh.length > 0)) elTrad = ch;
      }
      if (elAr) {
        elAr.classList.remove('wbw-num-hidden-v110'); delete elAr.dataset.wbwIsNum; elAr.classList.add('wbw-ar-v110');
        forcer(elAr, 'display', 'block'); forcer(elAr, 'min-height', hRem); forcer(elAr, 'line-height', hRem);
        forcer(elAr, 'text-align', 'center'); forcer(elAr, 'font-size', arFont); forcer(elAr, 'white-space', 'nowrap');
        forcer(elAr, 'border', 'none'); forcer(elAr, 'border-bottom', 'none');
      }
      if (elTrad) {
        elTrad.classList.remove('wbw-num-hidden-v110'); delete elTrad.dataset.wbwIsNum; elTrad.classList.add('wbw-tr-v110');
        forcer(elTrad, 'display', 'block'); forcer(elTrad, 'max-width', cartes.length === 1 ? '220px' : trMaxW);
        forcer(elTrad, 'text-align', 'center'); forcer(elTrad, 'line-height', '1.25'); forcer(elTrad, 'font-size', trFont);
        forcer(elTrad, 'margin-top', '4px'); forcer(elTrad, 'border', 'none'); forcer(elTrad, 'border-top', 'none');
        nettoyerEtTraduireMotUneFois(elTrad, elAr, lang, true);
      }
      var scrubObj = creerBarreScrubPourCarte(carte, m);
      purgerTousLesChiffresDeLaCarte(carte, elAr, elTrad);
      cacheMetaCartes[m] = { carte: carte, elAr: elAr, elTrad: elTrad, scrub: scrubObj };
    }
    return true;
  }

  window.__appliquerRubanColleWBW = function(ts) {
    var maintenant = (typeof ts === 'number' && ts > 0) ? ts : performance.now();
    var dt = dernierTimestampRaf ? Math.min(50, Math.max(1, maintenant - dernierTimestampRaf)) : (1000 / 60);
    dernierTimestampRaf = maintenant;
    var alphaE = 1 - Math.pow(1 - 0.32, dt / (1000 / 60)), alphaB = 1 - Math.pow(1 - 0.26, dt / (1000 / 60)), alphaC = 1 - Math.pow(1 - 0.25, dt / (1000 / 60));
    var aud = document.getElementById('ayahAudio') || window.__lecteurAudioActuel || document.querySelector('audio');
    var tActuel = aud ? (aud.currentTime || 0) : 0, durAudio = (aud && aud.duration && isFinite(aud.duration)) ? aud.duration : 0;
    var audioJoue = Boolean(aud && !aud.paused && !aud.ended);
    var cartes = obtenirCartesMotAMotUniversel(), banner = document.getElementById('wbwSensLectureBanner');
    if (!cartes || cartes.length < 1 || !preparerGrilleSiNecessaire(cartes)) {
      if (banner) forcer(banner, 'display', 'none');
      gererMasquageDoublonVerset(null, false); return;
    }

    var suiviBoutonOn = window.__wbwSuiviBoutonActif !== false, energies = (suiviBoutonOn && audioJoue) ? (window.__wbwEnergies || []) : [];
    var fenetres = durAudio > 0 ? calculerFenetresMots(durAudio) : [];

    var idxPic = -1, maxValE = 0.50;
    if (maintenant < expIdxMotForce && idxMotForceDebut >= 0) {
      idxPic = idxMotForceDebut;
    } else if (audioJoue) {
      for (var p = 0; p < cartes.length; p++) {
        var ev = energies[p] || 0;
        if (ev > maxValE) { maxValE = ev; idxPic = p; }
      }
      if (idxPic === -1 && fenetres.length === cartes.length) {
        for (var f = 0; f < fenetres.length; f++) {
          if (tActuel >= fenetres[f].t0 && tActuel <= fenetres[f].t1 + 0.08) {
            idxPic = f;
            break;
          }
        }
        if (idxPic === -1 && tActuel >= fenetres[fenetres.length - 1].t0) {
          idxPic = cartes.length - 1;
        }
      }
      if (idxPic === -1 && tActuel < 0.45) idxPic = 0;
    }

    if (window.__wbwResetDemande || (tActuel < 0.12 && dernierTempsAudio > 0.4 && maintenant >= expIdxMotForce) || (!audioJoue && tActuel < 0.08 && (!aud || !aud.ended) && maintenant >= expIdxMotForce)) {
      window.__wbwResetDemande = false; maxIdxAtteintVerset = -1; idxMotEnCoursCache = -1;
      for (var r = 0; r < cartes.length; r++) { lissageE[r] = 0; lissageB[r] = 0; }
    }
    dernierTempsAudio = tActuel;

    if (suiviBoutonOn && (audioJoue || maintenant < expIdxMotForce) && idxPic >= 0) {
      maxIdxAtteintVerset = idxPic;
    }
    if (suiviBoutonOn && aud && (aud.ended || (durAudio > 0 && tActuel >= durAudio - 0.12))) {
      maxIdxAtteintVerset = cartes.length - 1;
      idxPic = cartes.length - 1;
    }

    var idxActuel = idxPic >= 0 ? idxPic : maxIdxAtteintVerset;
    if (idxActuel !== idxMotEnCoursCache) {
      idxMotEnCoursCache = idxActuel; debutTempsMotActuel = maintenant;
      if (idxActuel >= 0 && audioJoue && typeof tempsDebutReelObserve[idxActuel] !== 'number') tempsDebutReelObserve[idxActuel] = tActuel;
    }

    var ratioMotActuel = 0;
    if (aud && (aud.ended || (durAudio > 0 && tActuel >= durAudio - 0.12))) {
      ratioMotActuel = 1.0;
    } else if ((audioJoue || maintenant < expIdxMotForce) && idxActuel >= 0) {
      if (fenetres[idxActuel] && fenetres[idxActuel].t1 > fenetres[idxActuel].t0 && audioJoue) {
        ratioMotActuel = Math.max(0.06, Math.min(1.0, (tActuel - fenetres[idxActuel].t0) / (fenetres[idxActuel].t1 - fenetres[idxActuel].t0)));
      } else {
        var dureeMoyMotMs = durAudio > 0 ? Math.max(260, (durAudio * 920) / Math.max(1, cartes.length)) : 650;
        ratioMotActuel = Math.max(0.06, Math.min(1.0, (maintenant - debutTempsMotActuel) / dureeMoyMotMs));
      }
    }

    var dirLecture = detecterSensLectureGrille(), audioActif = Boolean(suiviBoutonOn && (audioJoue || maxIdxAtteintVerset >= 0));
    modeContrasteSuivi += ((audioActif ? 1.0 : 0.0) - modeContrasteSuivi) * alphaC;

    var versetTermine = Boolean(aud && (aud.ended || (durAudio > 0 && !audioJoue && tActuel >= durAudio - 0.15)));

    for (var m = 0; m < cacheMetaCartes.length; m++) {
      var meta = cacheMetaCartes[m];
      if (!meta || !meta.carte) continue;
      purgerTousLesChiffresDeLaCarte(meta.carte, meta.elAr, meta.elTrad);
      if (meta.elTrad && meta.elTrad.dataset.wbwTrFinal && meta.elTrad.textContent !== meta.elTrad.dataset.wbwTrFinal) {
        definirTexteSansBoucle(meta.elTrad, meta.elTrad.dataset.wbwTrFinal);
      }

      var estMotActuel = !versetTermine && suiviBoutonOn && (audioJoue || maintenant < expIdxMotForce) && (m === idxActuel || (cartes.length === 1 && (!aud || !aud.ended)));
      var estDejaLu = suiviBoutonOn && (versetTermine || m < idxActuel);
      var distanceFutur = idxActuel >= 0 ? (m - idxActuel) : (m + 1);
      lissageE[m] += ((estMotActuel ? 1.0 : 0.0) - lissageE[m]) * alphaE;
      lissageB[m] += (((estDejaLu || estMotActuel) ? 1.0 : 0.0) - lissageB[m]) * alphaB;
      var e = courbeAppleMusic(lissageE[m]), b = courbeAppleMusic(lissageB[m]);

      if (meta.scrub && meta.scrub.wrap && meta.scrub.fill && meta.scrub.track) {
        if (meta.scrub.wrap.getAttribute('data-dir') !== dirLecture) meta.scrub.wrap.setAttribute('data-dir', dirLecture);
        forcer(meta.scrub.fill, 'width', (estDejaLu ? 100 : (estMotActuel ? Math.round(ratioMotActuel * 100) : 0)) + '%');
        if (estMotActuel) {
          meta.scrub.wrap.classList.add('wbw-scrub-active');
          forcer(meta.scrub.track, 'background', 'rgba(186, 230, 253, 0.38)'); forcer(meta.scrub.track, 'opacity', '1');
        } else {
          meta.scrub.wrap.classList.remove('wbw-scrub-active');
          if (estDejaLu) { forcer(meta.scrub.track, 'background', 'rgba(56, 189, 248, 0.28)'); forcer(meta.scrub.track, 'opacity', '0.95'); }
          else if (audioActif && distanceFutur === 1) { forcer(meta.scrub.track, 'background', 'rgba(186, 230, 253, 0.34)'); forcer(meta.scrub.track, 'opacity', '0.68'); }
          else if (audioActif && distanceFutur === 2) { forcer(meta.scrub.track, 'background', 'rgba(148, 163, 184, 0.26)'); forcer(meta.scrub.track, 'opacity', '0.45'); }
          else { forcer(meta.scrub.track, 'background', 'rgba(148, 163, 184, 0.18)'); forcer(meta.scrub.track, 'opacity', audioActif ? '0.24' : '0.42'); }
        }
      }

      var lum = Math.max(b, e), opReposBase = 0.96 - 0.54 * modeContrasteSuivi;
      if (audioActif && !estDejaLu && !estMotActuel) {
        if (distanceFutur === 1) opReposBase = Math.max(opReposBase, 0.72);
        else if (distanceFutur === 2) opReposBase = Math.max(opReposBase, 0.56);
      }
      var opMot = (opReposBase + (1.0 - opReposBase) * lum).toFixed(3);
      var transMot = 'translate3d(0px, ' + (-6.5 * e).toFixed(2) + 'px, 0px) scale(' + (1.0 + 0.11 * e).toFixed(3) + ')';

      if (meta.elAr) {
        var ombreAr = (e > 0.015 || b > 0.02)
          ? ('0 0 ' + (10 + 12 * e + 4 * b).toFixed(1) + 'px rgba(255, 255, 255, ' + (0.68 * b + 0.30 * e).toFixed(3) + '), 0 0 ' + (20 + 18 * e + 8 * b).toFixed(1) + 'px rgba(186, 230, 253, ' + (0.36 * b + 0.44 * e).toFixed(3) + ')')
          : (modeContrasteSuivi < 0.2 ? '0 0 8px rgba(255, 255, 255, 0.14)' : 'none');
        forcer(meta.elAr, 'opacity', opMot); forcer(meta.elAr, 'transform', transMot);
        forcer(meta.elAr, 'color', '#f8fafc'); forcer(meta.elAr, 'text-shadow', ombreAr);
        forcer(meta.elAr, 'border', 'none'); forcer(meta.elAr, 'border-bottom', 'none');
      }
      if (meta.elTrad) {
        var colTrRepos = melangerRGB(186, 230, 253, 148, 163, 184, modeContrasteSuivi);
        var colTrFinal = lum > 0.01 ? melangerRGB(148, 163, 184, 255, 255, 255, lum) : colTrRepos;
        var ombreTr = (e > 0.02 || b > 0.08) ? ('0 0 ' + (10 * e + 5 * b).toFixed(1) + 'px rgba(255, 255, 255, ' + (0.55 * e + 0.28 * b).toFixed(3) + ')') : 'none';
        forcer(meta.elTrad, 'opacity', opMot); forcer(meta.elTrad, 'transform', transMot);
        forcer(meta.elTrad, 'color', colTrFinal); forcer(meta.elTrad, 'font-weight', e > 0.25 ? '600' : (b > 0.5 ? '500' : '400'));
        forcer(meta.elTrad, 'text-shadow', ombreTr); forcer(meta.elTrad, 'border', 'none'); forcer(meta.elTrad, 'border-top', 'none');
      }
    }
  };

  
  /* === LIENS A PROPOS & CONTACT + STUDIO TIKTOK 9:16 PRO MOTION (V120) === */
  var ORDRE_REVELATION_SOURATES = {
    96:{rang:1,lieu:'La Mecque (Grotte de Ḥirāʾ)',quand:'~610 ap. J.-C. (1re révélation)',pourquoi:'Premiers versets révélés au Prophète ﷺ ordonnant la lecture et la connaissance au nom du Créateur.'},
    68:{rang:2,lieu:'La Mecque',quand:'Début de la période mecquoise (~610)',pourquoi:'Défense du Prophète ﷺ face aux accusations de folie et rappel de la noblesse de son caractère.'},
    73:{rang:3,lieu:'La Mecque',quand:'Début de la mission à La Mecque',pourquoi:'Préparation spirituelle par la prière nocturne (Qiyām al-Layl) et la récitation posée du Coran.'},
    74:{rang:4,lieu:'La Mecque',quand:'Début de la prédication publique',pourquoi:'Ordre de se lever pour avertir les hommes et purifier son cœur.'},
    1:{rang:5,lieu:'La Mecque',quand:'Début de l’Islam à La Mecque',pourquoi:'Sourate d’ouverture et pilier de la prière résumant la louange, l’unicité (Tawḥīd) et la demande de guidée.'},
    111:{rang:6,lieu:'La Mecque',quand:'Début de l’appel sur le mont As-Safā',pourquoi:'Réponse à l’hostilité d’Abū Lahab contre l’appel du Prophète ﷺ.'},
    81:{rang:7,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Description saisissante du Jour de la Résurrection et réveil des consciences.'},
    87:{rang:8,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Glorification du Très-Haut et rappel de la purification de l’âme.'},
    92:{rang:9,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Contraste entre la générosité pieuse (inspirée par Abū Bakr) et l’avarice orgueilleuse.'},
    89:{rang:10,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Leçon historique sur la fin des peuples tyrans (ʿĀd, Thamūd, Pharaon) et l’apaisement de l’âme croyante.'},
    93:{rang:11,lieu:'La Mecque',quand:'Après une courte interruption de la Révélation',pourquoi:'Consolation divine au Prophète ﷺ confirmant qu’Allāh ne l’a ni abandonné ni détesté.'},
    94:{rang:12,lieu:'La Mecque',quand:'Juste après Ad-Duḥā',pourquoi:'Apaisement du cœur du Prophète ﷺ et promesse qu’à chaque difficulté succède une facilité.'},
    103:{rang:13,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Synthèse de la réussite humaine : la foi, les œuvres justes, le conseil mutuel de la vérité et de la patience.'},
    100:{rang:14,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Mise en garde contre l’ingratitude de l’homme et son amour excessif des biens terrestres.'},
    108:{rang:15,lieu:'La Mecque',quand:'Suite aux moqueries d’Al-ʿĀṣ ibn Wāʾil',pourquoi:'Annonce du don de l’abondance (Al-Kawthar) au Prophète ﷺ face à ceux qui le disaient sans postérité.'},
    102:{rang:16,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Avertissement contre la course aux richesses qui distrait l’homme jusqu’à la tombe.'},
    107:{rang:17,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Condamnation de ceux qui repoussent l’orphelin, négligent le pauvre et prient par ostentation.'},
    109:{rang:18,lieu:'La Mecque',quand:'Face aux compromis proposés par Quraysh',pourquoi:'Affirmation pacifique mais absolue de l’unicité du culte sans syncrétisme.'},
    105:{rang:19,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Rappel de la protection miraculeuse de la Kaʿbah contre l’armée d’Abraha (l’Année de l’Éléphant, 570).'},
    113:{rang:20,lieu:'La Mecque / Médine',quand:'Protection quotidienne',pourquoi:'Demande de refuge auprès du Seigneur de l’aube contre tous les maux extérieurs et l’envie.'},
    114:{rang:21,lieu:'La Mecque / Médine',quand:'Protection spirituelle',pourquoi:'Demande de protection auprès du Seigneur des hommes contre les insufflations du tentateur.'},
    112:{rang:22,lieu:'La Mecque',quand:'En réponse aux questions sur la nature de Dieu',pourquoi:'Définition pure de l’Unicité divine (At-Tawḥīd), équivalant au tiers du Coran.'},
    53:{rang:23,lieu:'La Mecque',quand:'An 5 de la Prophétie',pourquoi:'Confirmation de la véracité de la révélation transmise par l’ange Jibrīl (Gabriel).'},
    80:{rang:24,lieu:'La Mecque',quand:'Lors de la venue de l’aveugle Ibn Umm Maktūm',pourquoi:'Enseignement divin accordant la priorité à celui qui cherche sincèrement à se purifier.'},
    97:{rang:25,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Révélation de la grandeur de la Nuit du Destin (Laylat al-Qadr), meilleure que mille mois.'},
    91:{rang:26,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Serments cosmiques sur le Soleil et la Lune montrant que la réussite réside dans la purification de l’âme.'},
    85:{rang:27,lieu:'La Mecque',quand:'Période de persécution des premiers croyants',pourquoi:'Soutien aux croyants persécutés à travers le récit des Gens du Fossé (Aṣḥāb al-Ukhdūd).'},
    95:{rang:28,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Création de l’homme dans la plus parfaite harmonie et importance de la foi accompagnée d’œuvres.'},
    106:{rang:29,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Appel adressé à Quraysh pour adorer le Seigneur de la Kaʿbah qui les a nourris et sécurisés.'},
    101:{rang:30,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Tableau du Jour du Fracas et de la pesée des œuvres.'},
    75:{rang:31,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Preuve de la Résurrection et apaisement du Prophète ﷺ lors de la réception de la Révélation.'},
    104:{rang:32,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Avertissement sévère contre la médisance, la calomnie et l’accumulation orgueilleuse de richesses.'},
    77:{rang:33,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Rappel répété de la vérité du Jour du Jugement aux dénégateurs.'},
    50:{rang:34,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Arguments rationnels et cosmiques sur la résurrection des corps après la mort.'},
    90:{rang:35,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'La vraie voie ascendante : affranchir les opprimés, nourrir l’orphelin et le démuni.'},
    86:{rang:36,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Méditation sur l’astre nocturne et l’origine de l’être humain.'},
    54:{rang:37,lieu:'La Mecque',quand:'~5 ans avant l’Hégire',pourquoi:'Révélée lors du prodige de la fission de la Lune et rappel de l’histoire des peuples anciens.'},
    38:{rang:38,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Récits de Dāwūd (David), Sulaymān (Salomon) et Ayyūb (Job) invitant à la patience et au repentir.'},
    7:{rang:39,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Grande fresque de l’histoire des Prophètes face à leurs peuples.'},
    72:{rang:40,lieu:'La Mecque',quand:'Au retour de Ṭāʾif (~619)',pourquoi:'Écoute et foi d’un groupe de djinns ayant entendu la récitation du Coran.'},
    36:{rang:41,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Le « Cœur du Coran » : preuves de l’Unicité, de la mission prophétique et de la Résurrection.'},
    25:{rang:42,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Réponse aux objections des polythéistes et portrait lumineux des Serviteurs du Tout Miséricordieux.'},
    35:{rang:43,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Contemplation des merveilles de la Création divine.'},
    19:{rang:44,lieu:'La Mecque',quand:'Avant l’émigration en Abyssinie (~615)',pourquoi:'Récits de Zakariyyā, Maryam (Marie), ʿĪsā (Jésus) et Ibrāhīm (Abraham), récités devant le Négus.'},
    20:{rang:45,lieu:'La Mecque',quand:'Vers l’an 5-6 de la Prophétie',pourquoi:'Récit de Mūsā (Moïse) qui toucha le cœur de ʿUmar ibn al-Khaṭṭāb lors de sa conversion.'},
    56:{rang:46,lieu:'La Mecque',quand:'1re/2e période mecquoise',pourquoi:'Répartition des hommes en trois groupes au Jour de l’Événement inéluctable.'},
    26:{rang:47,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Consolation du Prophète ﷺ à travers l’histoire de Moïse, Abraham, Noé et des prophètes.'},
    27:{rang:48,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Récit de Sulaymān (Salomon), de la fourmi et de la reine de Saba.'},
    28:{rang:49,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Histoire détaillée de la jeunesse de Moïse et de sa délivrance face à Pharaon.'},
    17:{rang:50,lieu:'La Mecque',quand:'1 an avant l’Hégire (~621)',pourquoi:'Révélée suite au Voyage Nocturne (Al-Isrāʾ) de La Mecque à Jérusalem et grands commandements moraux.'},
    10:{rang:51,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'La miséricorde divine illustrée par le repentir du peuple de Yūnus (Jonas).'},
    11:{rang:52,lieu:'La Mecque',quand:'Année du Chagrin (~619)',pourquoi:'Fermeté sur la droiture à travers les récits de Noé, Hūd, Ṣāliḥ, Abraham, Loth et Chuʿayb.'},
    12:{rang:53,lieu:'La Mecque',quand:'Année du Chagrin (~619-620)',pourquoi:'Le « plus beau des récits » : l’histoire complète de Yūsuf (Joseph), de l’épreuve au pardon et au triomphe.'},
    15:{rang:54,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Promesse divine de préserver intégralement le texte du Coran à travers les siècles.'},
    6:{rang:55,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Fondements du monothéisme pur et réfutation des superstitions préislamiques.'},
    37:{rang:56,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Ordre des anges en rangs et grande épreuve de foi d’Abraham et de son fils.'},
    31:{rang:57,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Conseils pleins de sagesse de Luqmān à son fils : unicité, piété filiale, humilité et prière.'},
    34:{rang:58,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Gratitude envers les bienfaits divins à travers l’exemple de David, Salomon et du royaume de Saba.'},
    39:{rang:59,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Sincérité exclusive du culte (Ikhlāṣ) et vaste appel au repentir sans jamais désespérer de la miséricorde divine.'},
    40:{rang:60,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Plaidoyer du croyant de la famille de Pharaon et pardon accordé par le Pardonneur (Ghāfir).'},
    41:{rang:61,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Répondre au mal par ce qui est meilleur et signes divins dans l’univers et en nous-mêmes.'},
    42:{rang:62,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Unité du message des prophètes, consultation mutuelle (Chūrā) et pardon.'},
    43:{rang:63,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Vraie valeur spirituelle face aux ornements éphémères du monde.'},
    44:{rang:64,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Révélation du Coran lors d’une nuit bénie et avertissement contre l’orgueil.'},
    45:{rang:65,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Signes de Dieu dans les cieux et la terre pour ceux qui méditent.'},
    46:{rang:66,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Bonté envers les parents et avertissement du peuple de ʿĀd à Al-Aḥqāf.'},
    51:{rang:67,lieu:'La Mecque',quand:'1re/2e période mecquoise',pourquoi:'Rappel du but de la création et que la subsistance vient uniquement d’Allāh.'},
    88:{rang:68,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Invitation à observer les chameaux, le ciel élevé, les montagnes et la terre étendue.'},
    18:{rang:69,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Quatre récits fondamentaux (la Caverne, les deux jardins, Moïse & Al-Khiḍr, Dhū al-Qarnayn) face aux épreuves.'},
    16:{rang:70,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'La sourate des Bienfaits (An-Niʿam) : abeilles, nature, justice et reconnaissance envers le Créateur.'},
    71:{rang:71,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Persévérance exemplaire du prophète Nūḥ (Noé) durant des siècles d’appel et d’imploration.'},
    14:{rang:72,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Parabole de la bonne parole pareille à un bel arbre aux racines fermes et aux branches dans le ciel.'},
    21:{rang:73,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Unité de la communauté des Prophètes et envoi du Prophète ﷺ comme miséricorde pour les mondes.'},
    23:{rang:74,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Portrait moral et spirituel des croyants promis à la réussite éternelle (Al-Firdaws).'},
    32:{rang:75,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Humilité des croyants qui se prosternent et invoquent leur Seigneur la nuit.'},
    52:{rang:76,lieu:'La Mecque',quand:'1re/2e période mecquoise',pourquoi:'Preuves irréfutables de la création (« Ont-ils été créés à partir de rien ? »).'},
    67:{rang:77,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Harmonie parfaite de la royauté divine (Al-Mulk) et sens de l’épreuve de la vie et de la mort.'},
    69:{rang:78,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'L’Inévitable vérité du Jugement et authenticité absolue de la Révélation.'},
    70:{rang:79,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Qualités de ceux qui sont préservés de l’inquiétude : prière assidue, aumône, chasteté et respect des engagements.'},
    78:{rang:80,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'La Grande Annonce de la Résurrection et les merveilles de la terre et du ciel.'},
    79:{rang:81,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Dialogue de Moïse avec Pharaon et récompense de celui qui maîtrise les passions de son âme.'},
    82:{rang:82,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Rappel des nobles anges scribes qui consignent chaque action.'},
    84:{rang:83,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Cheminement de l’homme vers la rencontre de son Seigneur.'},
    30:{rang:84,lieu:'La Mecque',quand:'Vers 615 ap. J.-C.',pourquoi:'Annonce prophétique de la victoire future des Romains (Byzantins) et signes divins dans la création.'},
    29:{rang:85,lieu:'La Mecque',quand:'Fin de la période mecquoise',pourquoi:'Sens des épreuves qui vérifient la sincérité de la foi et fragilité des faux appuis comparable à la toile de l’araignée.'},
    83:{rang:86,lieu:'La Mecque / Début Médine',quand:'Au moment de l’Hégire (~622)',pourquoi:'Condamnation de la fraude dans les poids et mesures et justice dans les transactions.'},
    2:{rang:87,lieu:'Médine',quand:'An 1 à 10 de l’Hégire (1re sourate médinoise)',pourquoi:'Fondation de la communauté à Médine : foi, prière, jeûne, pèlerinage, éthique, Verset du Trône (2:255).'},
    8:{rang:88,lieu:'Médine',quand:'An 2 de l’Hégire (après Badr, 624)',pourquoi:'Leçons spirituelles et morales de l’épreuve de Badr : union des cœurs et confiance en Dieu.'},
    3:{rang:89,lieu:'Médine',quand:'An 3 à 9 de l’Hégire (Uḥud & délégation de Najrān)',pourquoi:'Fermeté dans l’épreuve, dialogue avec les Gens du Livre et histoire de la famille de ʿImrān.'},
    33:{rang:90,lieu:'Médine',quand:'An 5 de l’Hégire (bataille du Fossé, 627)',pourquoi:'Épreuve des Coalisés, modèle prophétique parfait et règles d’éthique familiale et sociale.'},
    60:{rang:91,lieu:'Médine',quand:'An 8 de l’Hégire (avant l’ouverture de La Mecque)',pourquoi:'Équité et bonté envers ceux qui ne combattent pas les croyants pour leur foi.'},
    4:{rang:92,lieu:'Médine',quand:'An 3 à 5 de l’Hégire',pourquoi:'Protection des droits des femmes, des orphelins et des faibles, justice absolue et équité.'},
    99:{rang:93,lieu:'Médine',quand:'Début de la période médinoise',pourquoi:'Justice parfaite au Jour dernier : le poids d’un atome de bien ou de mal sera vu.'},
    57:{rang:94,lieu:'Médine',quand:'Milieu de la période médinoise',pourquoi:'Appel au renouvellement de l’humilité du cœur et à la dépense généreuse.'},
    47:{rang:95,lieu:'Médine',quand:'Début de la période médinoise',pourquoi:'Invitation à méditer profondément le Coran et soutien divin à ceux qui défendent la justice.'},
    13:{rang:96,lieu:'Médine',quand:'Période médinoise',pourquoi:'Harmonie des signes cosmiques et rappel que c’est par l’évocation d’Allāh que les cœurs s’apaisent (13:28).'},
    55:{rang:97,lieu:'Médine / La Mecque',quand:'Révélation des bienfaits divins',pourquoi:'Hymne aux grâces innombrables du Tout Miséricordieux dans la nature et l’au-delà (Miracle des deux mers, v.19-20).'},
    76:{rang:98,lieu:'Médine',quand:'Période médinoise',pourquoi:'Sincérité de ceux qui nourrissent le pauvre, l’orphelin et le captif uniquement pour l’amour de Dieu.'},
    65:{rang:99,lieu:'Médine',quand:'Milieu de la période médinoise',pourquoi:'Éthique et dignité en cas de séparation conjugale, et promesse d’une issue favorable à qui craint Dieu.'},
    98:{rang:100,lieu:'Médine',quand:'Période médinoise',pourquoi:'La Preuve évidente : adorer Dieu avec une foi pure, accomplir la prière et acquitter l’aumône.'},
    59:{rang:101,lieu:'Médine',quand:'An 4 de l’Hégire',pourquoi:'Fraternité exemplaire entre Émigrés et Auxiliaires (Anṣār) et sublimes Noms divins finaux (v.22-24).'},
    24:{rang:102,lieu:'Médine',quand:'An 5-6 de l’Hégire',pourquoi:'Préservation de l’honneur, pudeur et célèbre Verset de la Lumière (Āyat an-Nūr, 24:35).'},
    22:{rang:103,lieu:'Médine',quand:'Période médinoise',pourquoi:'Rites et spiritualité du Pèlerinage (Al-Ḥajj) institué depuis Abraham.'},
    63:{rang:104,lieu:'Médine',quand:'An 5-6 de l’Hégire',pourquoi:'Mise en garde contre l’hypocrisie et l’attachement aux biens qui détournent du rappel de Dieu.'},
    58:{rang:105,lieu:'Médine',quand:'Période médinoise',pourquoi:'Révélée lorsque Dieu entendit la plainte de Khawlah bint Thaʿlabah ; omni-science divine et dignité humaine.'},
    49:{rang:106,lieu:'Médine',quand:'An 9 de l’Hégire',pourquoi:'Charte de l’éthique morale : vérifier les informations, réconcilier les frères, bannir le mépris, la suspicion et la médisance.'},
    66:{rang:107,lieu:'Médine',quand:'An 7-8 de l’Hégire',pourquoi:'Appel au repentir sincère (Tawbah Naṣūḥ) et exemples spirituels d’Āsiyah et de Maryam.'},
    64:{rang:108,lieu:'Médine',quand:'Période médinoise',pourquoi:'Confiance en Dieu face aux épreuves et pardon au sein de la famille.'},
    61:{rang:109,lieu:'Médine',quand:'Période médinoise',pourquoi:'Cohérence entre les paroles et les actes et annonce par Jésus de la venue d’Aḥmad.'},
    62:{rang:110,lieu:'Médine',quand:'Période médinoise',pourquoi:'Importance du rassemblement du vendredi et danger de porter le savoir sans le mettre en pratique.'},
    48:{rang:111,lieu:'Médine',quand:'An 6 de l’Hégire (pacte d’Al-Ḥudaybiyah, 628)',pourquoi:'La paix d’Al-Ḥudaybiyah qualifiée de « Victoire éclatante » (Fatḥ Mubīn) et apaisement (Sakīnah) dans les cœurs.'},
    5:{rang:112,lieu:'Médine',quand:'An 10 de l’Hégire (Pèlerinage d’Adieu)',pourquoi:'Respect des engagements, sacralité de la vie humaine (5:32) et parachèvement du message (5:3).'},
    9:{rang:113,lieu:'Médine',quand:'An 9 de l’Hégire',pourquoi:'Sincérité des croyants et acceptation du repentir de ceux qui reviennent vers Dieu.'},
    110:{rang:114,lieu:'Médine (Minā)',quand:'An 10 de l’Hégire (Dernière sourate complète révélée)',pourquoi:'Annonce de l’accomplissement de la mission du Prophète ﷺ et appel final à la louange et au pardon.'}
  };

  function injecterLiensFooterPropres() {
    var tousBtns = document.querySelectorAll('button, a');
    var btnMentions = null;
    for (var i = 0; i < tousBtns.length; i++) {
      var t = (tousBtns[i].textContent || '').trim();
      if (/Mentions\s+l[ée]gales/i.test(t)) { btnMentions = tousBtns[i]; break; }
    }
    if (btnMentions && btnMentions.parentElement && !document.getElementById('wbwInstitutionalLinksV120')) {
      var wrap = document.createElement('span');
      wrap.id = 'wbwInstitutionalLinksV120';
      wrap.style.cssText = 'display:inline-flex;align-items:center;gap:10px;margin-left:10px;flex-wrap:wrap;justify-content:center;';
      var stylePill = 'background:rgba(15,23,42,0.75);color:#cbd5e1;border:1px solid rgba(56,189,248,0.28);padding:6px 14px;border-radius:999px;font-size:0.78rem;font-weight:700;text-decoration:none;transition:all 0.2s ease;display:inline-flex;align-items:center;gap:5px;';
      wrap.innerHTML =
        '<a href="/a-propos.html" style="' + stylePill + '">🏛️ À propos</a>' +
        '<a href="/contact.html" style="' + stylePill + '">✉️ Contact</a>';
      btnMentions.parentElement.insertBefore(wrap, btnMentions.nextSibling);
    }
  }

  function extraireTafsirDuVersetActuel() {
    var frEl = document.getElementById('frenchVerseEl') || document.querySelector('.french-glow-verse');
    var trad = frEl ? (frEl.textContent || '').replace(/^\s*\d+\s*[\.:\-]\s*/, '').trim() : '';

    var tafsirBrut = '';
    var selecteursTafsir = ['#tafsirContent', '#tafsirText', '#tafsirBox', '.tafsir-content', '.tafsir-text', '.tafsir-body'];
    for (var s = 0; s < selecteursTafsir.length; s++) {
      var el = document.querySelector(selecteursTafsir[s]);
      if (el && (el.textContent || '').trim().length > 25) {
        tafsirBrut = (el.textContent || '').trim();
        break;
      }
    }
    if (!tafsirBrut) {
      var blocs = document.querySelectorAll('div, section, article, p');
      for (var b = 0; b < blocs.length; b++) {
        var txt = (blocs[b].textContent || '').trim();
        if (blocs[b].children.length <= 4 && txt.length > 45 && txt.length < 1200 && /Tafs[iī]r|Ex[ée]g[èe]se|Ibn\s+Kath|Mukhtasar|signifie|All[aā]h\s+informe/i.test(txt)) {
          tafsirBrut = txt;
          break;
        }
      }
    }
    tafsirBrut = tafsirBrut.replace(/^(?:Tafs[iī]r|Ex[ée]g[èe]se)[^:]*:\s*/i, '').replace(/\s{2,}/g, ' ').trim();
    if (tafsirBrut.length > 260) {
      var coupe = tafsirBrut.slice(0, 255);
      var dernierPoint = Math.max(coupe.lastIndexOf('.'), coupe.lastIndexOf('!'), coupe.lastIndexOf('?'), coupe.lastIndexOf(';'));
      tafsirBrut = (dernierPoint > 110 ? coupe.slice(0, dernierPoint + 1) : (coupe + '…'));
    }
    return { trad: trad, tafsir: tafsirBrut };
  }

  function creerBoutonTikTokStudioV120() {
    var estPageSourate = /sourate-\d+/i.test(window.location.pathname) || Boolean(document.querySelector('#arabicVerse, #arabicVerseEl, .arabic-glow-verse'));
    if (!estPageSourate || document.getElementById('wbwTikTokStudioBtnV120')) return;
    var cible = document.getElementById('wbwAudioRangeBtnV110') || document.querySelector('.rp-btn') || document.getElementById('playSyncBtn');
    if (!cible || !cible.parentElement) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'wbwTikTokStudioBtnV120';
    btn.innerHTML = '🎬 Studio TikTok 9:16';
    btn.style.cssText = 'background:linear-gradient(135deg,rgba(14,165,233,0.22),rgba(236,72,153,0.22));color:#f8fafc;border:1px solid rgba(56,189,248,0.55);padding:6px 14px;border-radius:11px;font-family:inherit;font-size:0.81rem;font-weight:800;cursor:pointer;margin-left:6px;display:inline-flex;align-items:center;gap:6px;box-shadow:0 0 14px rgba(56,189,248,0.25);';
    btn.onclick = ouvrirConfigStudioTikTokV120;
    cible.parentElement.insertBefore(btn, cible.nextSibling);
  }

  function ouvrirConfigStudioTikTokV120() {
    var old = document.getElementById('wbwTikTokConfigModalV120');
    if (old) old.remove();

    var info = obtenirInfosSourateEtVerset();
    var metaRev = ORDRE_REVELATION_SOURATES[info.s] || { rang: info.s, lieu: 'Révélation coranique', quand: 'Époque prophétique', pourquoi: 'Méditation et enseignement des versets.' };
    var endAuto = Math.min(info.totalV, info.v + (info.totalV <= 15 ? info.totalV : 9));

    var optsStart = '', optsEnd = '';
    for (var i = 1; i <= info.totalV; i++) {
      optsStart += '<option value="' + i + '"' + (i === info.v ? ' selected' : '') + '>Verset ' + info.s + ':' + i + '</option>';
      optsEnd += '<option value="' + i + '"' + (i === endAuto ? ' selected' : '') + '>Verset ' + info.s + ':' + i + '</option>';
    }

    var mod = document.createElement('div');
    mod.id = 'wbwTikTokConfigModalV120';
    mod.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,23,0.82);backdrop-filter:blur(8px);z-index:100050;display:flex;align-items:center;justify-content:center;padding:16px;font-family:"Plus Jakarta Sans",system-ui,sans-serif;color:#f8fafc;';
    mod.innerHTML =
      '<div style="width:100%;max-width:480px;background:#0f172a;border:1px solid rgba(56,189,248,0.35);border-radius:24px;padding:24px;box-shadow:0 25px 60px rgba(0,0,0,0.85);">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
          '<span style="background:rgba(56,189,248,0.15);color:#38bdf8;padding:4px 12px;border-radius:999px;font-size:0.76rem;font-weight:800;">Révélation n°' + metaRev.rang + '/114 • ' + metaRev.lieu + '</span>' +
          '<button type="button" id="wbwCloseCfgV120" style="background:none;border:none;color:#94a3b8;font-size:1.3rem;cursor:pointer;">✕</button>' +
        '</div>' +
        '<h3 style="margin:0 0 6px 0;font-size:1.18rem;color:#fff;">🎬 Studio TikTok 9:16 (Easy-Ease Pro Motion)</h3>' +
        '<p style="margin:0 0 16px 0;font-size:0.83rem;color:#94a3b8;line-height:1.5;">Sélectionne la plage de versets à partager. Le mode 9:16 synchronise le Mot à Mot, l’audio de Yasser Al-Dosari et le Tafsir complet (Où, Quand, Pourquoi & Source).</p>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">' +
          '<div><label style="display:block;font-size:0.78rem;color:#cbd5e1;margin-bottom:5px;font-weight:700;">Du verset :</label>' +
          '<select id="wbwTkStartV120" style="width:100%;background:#1e293b;color:#fff;border:1px solid rgba(56,189,248,0.35);border-radius:10px;padding:9px;font-weight:700;">' + optsStart + '</select></div>' +
          '<div><label style="display:block;font-size:0.78rem;color:#cbd5e1;margin-bottom:5px;font-weight:700;">Au verset :</label>' +
          '<select id="wbwTkEndV120" style="width:100%;background:#1e293b;color:#fff;border:1px solid rgba(56,189,248,0.35);border-radius:10px;padding:9px;font-weight:700;">' + optsEnd + '</select></div>' +
        '</div>' +
        '<button type="button" id="wbwTkAuto1m30V120" style="width:100%;background:rgba(56,189,248,0.12);color:#38bdf8;border:1px dashed rgba(56,189,248,0.45);border-radius:10px;padding:8px;font-size:0.8rem;font-weight:800;cursor:pointer;margin-bottom:16px;">⚡ Calibrer automatiquement pour 1 min 30 – 2 min (Défi TikTok)</button>' +
        '<div style="display:flex;flex-direction:column;gap:10px;">' +
          '<button type="button" id="wbwTkLaunchCinemaV120" style="background:linear-gradient(135deg,#38bdf8,#0284c7);color:#021019;border:none;border-radius:14px;padding:12px;font-weight:800;font-size:0.92rem;cursor:pointer;">▶️ Lancer l’Animation 9:16 Plein Écran (Sans interface)</button>' +
          '<button type="button" id="wbwTkLaunchRecordV120" style="background:linear-gradient(135deg,#ec4899,#be185d);color:#ffffff;border:none;border-radius:14px;padding:12px;font-weight:800;font-size:0.92rem;cursor:pointer;">🔴 Enregistrer & Télécharger la Vidéo 9:16 (.webm HD + Audio)</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(mod);

    var selS = document.getElementById('wbwTkStartV120');
    var selE = document.getElementById('wbwTkEndV120');
    selS.onchange = function() { if (parseInt(selE.value, 10) < parseInt(selS.value, 10)) selE.value = selS.value; };
    selE.onchange = function() { if (parseInt(selE.value, 10) < parseInt(selS.value, 10)) selS.value = selE.value; };

    document.getElementById('wbwCloseCfgV120').onclick = function() { mod.remove(); };
    document.getElementById('wbwTkAuto1m30V120').onclick = function() {
      var sVal = parseInt(selS.value, 10) || 1;
      var cibleFin = info.totalV <= 18 ? info.totalV : Math.min(info.totalV, sVal + 10);
      selE.value = String(cibleFin);
    };

    document.getElementById('wbwTkLaunchCinemaV120').onclick = function() {
      var v1 = parseInt(selS.value, 10) || 1, v2 = Math.max(v1, parseInt(selE.value, 10) || v1);
      mod.remove();
      demarrerPlayerTikTok916V120(v1, v2, false);
    };
    document.getElementById('wbwTkLaunchRecordV120').onclick = function() {
      var v1 = parseInt(selS.value, 10) || 1, v2 = Math.max(v1, parseInt(selE.value, 10) || v1);
      mod.remove();
      demarrerPlayerTikTok916V120(v1, v2, true);
    };
  }

  function easeOutBackPro(x) {
    var v = Math.max(0, Math.min(1, x || 0));
    var c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(v - 1, 3) + c1 * Math.pow(v - 1, 2);
  }

  function easeInOutCubicPro(x) {
    var v = Math.max(0, Math.min(1, x || 0));
    return v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
  }

  function decouperTexteCanvasPro(ctx, texte, maxW) {
    var mots = (texte || '').split(/\s+/), lignes = [], cur = '';
    for (var i = 0; i < mots.length; i++) {
      var test = cur ? (cur + ' ' + mots[i]) : mots[i];
      if (ctx.measureText(test).width > maxW && cur) {
        lignes.push(cur);
        cur = mots[i];
      } else {
        cur = test;
      }
    }
    if (cur) lignes.push(cur);
    return lignes;
  }

  function demarrerPlayerTikTok916V120(startV, endV, avecEnregistrementVideo) {
    var aud = document.getElementById('ayahAudio');
    if (!aud) return;

    var btnWbw = trouverBoutonMotAMot();
    if (btnWbw && !estModeMotAMotActif()) btnWbw.click();
    window.__wbwSuiviBoutonActif = true;

    // Création de la scène plein écran 9:16
    var stage = document.createElement('div');
    stage.id = 'wbwTikTokStageV120';
    stage.style.cssText = 'position:fixed;inset:0;background:#02050d;z-index:100100;display:flex;flex-direction:column;align-items:center;justify-content:center;user-select:none;';

    var canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    canvas.style.cssText = 'height:92vh;max-height:940px;width:auto;aspect-ratio:9/16;border-radius:26px;box-shadow:0 0 70px rgba(56,189,248,0.25),0 25px 60px rgba(0,0,0,0.95);border:1px solid rgba(56,189,248,0.3);background:#040814;';
    var ctx = canvas.getContext('2d');

    var ctrlBar = document.createElement('div');
    ctrlBar.style.cssText = 'margin-top:12px;display:flex;align-items:center;gap:14px;font-family:"Plus Jakarta Sans",sans-serif;';
    var lblTimer = document.createElement('span');
    lblTimer.style.cssText = 'color:#7dd3fc;font-size:0.86rem;font-weight:800;';
    lblTimer.textContent = '🎬 Plage ' + startV + ' ➔ ' + endV + ' • 00:00';

    var btnQuitter = document.createElement('button');
    btnQuitter.type = 'button';
    btnQuitter.textContent = avecEnregistrementVideo ? '⏹ Terminer & Télécharger la vidéo' : '✕ Quitter le mode 9:16';
    btnQuitter.style.cssText = 'background:rgba(239,68,68,0.2);color:#fecaca;border:1px solid rgba(239,68,68,0.5);padding:7px 16px;border-radius:999px;font-weight:800;font-size:0.82rem;cursor:pointer;';

    ctrlBar.appendChild(lblTimer);
    ctrlBar.appendChild(btnQuitter);
    stage.appendChild(canvas);
    stage.appendChild(ctrlBar);
    document.body.appendChild(stage);

    // Enregistreur vidéo HD + Audio
    var recorder = null, chunks = [], actif = true, debutMs = performance.now();
    if (avecEnregistrementVideo && typeof MediaRecorder !== 'undefined') {
      try {
        var vStream = canvas.captureStream(60);
        var finalStream = vStream;
        try {
          if (!window.__wbwAudioCtxV120) {
            var AC = window.AudioContext || window.webkitAudioContext;
            window.__wbwAudioCtxV120 = new AC();
            window.__wbwAudioSrcV120 = window.__wbwAudioCtxV120.createMediaElementSource(aud);
            window.__wbwAudioDestV120 = window.__wbwAudioCtxV120.createMediaStreamDestination();
            window.__wbwAudioSrcV120.connect(window.__wbwAudioCtxV120.destination);
            window.__wbwAudioSrcV120.connect(window.__wbwAudioDestV120);
          }
          if (window.__wbwAudioCtxV120.state === 'suspended') window.__wbwAudioCtxV120.resume();
          finalStream = new MediaStream(vStream.getVideoTracks().concat(window.__wbwAudioDestV120.stream.getAudioTracks()));
        } catch (errA) {}
        var mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus') ? 'video/webm;codecs=vp9,opus' : 'video/webm';
        recorder = new MediaRecorder(finalStream, { mimeType: mime, videoBitsPerSecond: 8000000 });
        recorder.ondataavailable = function(e) { if (e.data && e.data.size > 0) chunks.push(e.data); };
        recorder.onstop = function() {
          var blob = new Blob(chunks, { type: 'video/webm' });
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          var inf = obtenirInfosSourateEtVerset();
          a.href = url;
          a.download = 'tiktok-corantafsir-s' + inf.s + '-v' + startV + '-' + endV + '.webm';
          document.body.appendChild(a);
          a.click();
          setTimeout(function() { a.remove(); URL.revokeObjectURL(url); }, 600);
        };
        recorder.start(200);
      } catch (errR) {}
    }

    // Étoiles animées pour le fond cosmique
    var etoiles = [];
    for (var s = 0; s < 90; s++) {
      etoiles.push({ x: Math.random() * 1080, y: Math.random() * 1920, r: 0.7 + Math.random() * 2.1, p: Math.random() * 6.28 });
    }

    var derniereCleTransition = '';
    var tDebutTransitionVerset = performance.now();
    var cacheTafsirVerset = { trad: '', tafsir: '' };

    function fermerStudio() {
      if (!actif) return;
      actif = false;
      etatAudioRange.actif = false;
      if (recorder && recorder.state !== 'inactive') {
        try { recorder.stop(); } catch (e) {}
      }
      if (!aud.paused) aud.pause();
      stage.remove();
    }
    btnQuitter.onclick = fermerStudio;

    // Configurer la plage automatique du verset startV au verset endV
    var infInit = obtenirInfosSourateEtVerset();
    etatAudioRange.actif = true;
    etatAudioRange.sourate = infInit.s;
    etatAudioRange.startV = startV;
    etatAudioRange.endV = endV;
    etatAudioRange.repeatSelMax = 1;
    etatAudioRange.repeatAyahMax = 1;
    etatAudioRange.compteurSel = 1;
    etatAudioRange.compteurAyah = 1;

    if (infInit.v !== startV) {
      naviguerEtJouerVerset(startV);
    } else {
      aud.currentTime = 0;
      var pBtn = document.getElementById('playSyncBtn');
      if (pBtn && aud.paused) pBtn.click();
      else aud.play().catch(function(){});
    }

    var checkFinPlage = function() {
      if (!actif) return;
      var infNow = obtenirInfosSourateEtVerset();
      if (infNow.v >= endV && aud.ended) {
        aud.removeEventListener('ended', checkFinPlage);
        setTimeout(fermerStudio, 600);
      }
    };
    aud.addEventListener('ended', checkFinPlage);

    function dessinerFrameProMotion(now) {
      if (!actif) return;
      if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW(now);

      var inf = obtenirInfosSourateEtVerset();
      var cleV = inf.s + ':' + inf.v;
      if (cleV !== derniereCleTransition) {
        derniereCleTransition = cleV;
        tDebutTransitionVerset = now;
        cacheTafsirVerset = extraireTafsirDuVersetActuel();
      } else if (!cacheTafsirVerset.trad) {
        cacheTafsirVerset = extraireTafsirDuVersetActuel();
      }

      // Animation d'entrée Easy-Ease lors d'un changement de verset (0 -> 1 en 520ms)
      var progEntreeVerset = easeInOutCubicPro(Math.min(1, (now - tDebutTransitionVerset) / 520));
      var decalageYTransition = (1 - progEntreeVerset) * 34;

      // 1. Fond cosmique profond + Soleil & Lune subtils (style corantafsir.com)
      var bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
      bgGrad.addColorStop(0, '#030712');
      bgGrad.addColorStop(0.5, '#071022');
      bgGrad.addColorStop(1, '#03060f');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1920);

      // Halo Soleil (gauche) et Lune (droite)
      var sunGrad = ctx.createRadialGradient(90, 480, 10, 90, 480, 180);
      sunGrad.addColorStop(0, 'rgba(250, 204, 21, 0.22)');
      sunGrad.addColorStop(1, 'rgba(250, 204, 21, 0)');
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 280, 300, 400);

      var moonGrad = ctx.createRadialGradient(990, 620, 10, 990, 620, 160);
      moonGrad.addColorStop(0, 'rgba(241, 245, 249, 0.18)');
      moonGrad.addColorStop(1, 'rgba(241, 245, 249, 0)');
      ctx.fillStyle = moonGrad;
      ctx.fillRect(800, 440, 280, 360);

      for (var stIdx = 0; stIdx < etoiles.length; stIdx++) {
        var st = etoiles[stIdx];
        var alphaSt = 0.25 + 0.55 * Math.abs(Math.sin(now * 0.0012 + st.p));
        ctx.fillStyle = 'rgba(186, 230, 253, ' + alphaSt.toFixed(2) + ')';
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Barre supérieure minimaliste : Sourate + Verset + Ordre de Révélation
      var metaRev = ORDRE_REVELATION_SOURATES[inf.s] || { rang: inf.s, lieu: 'Révélation coranique', quand: 'Époque prophétique', pourquoi: 'Méditation et exégèse des versets.' };
      var nomSourateEl = document.querySelector('h1, .surah-title');
      var nomSourate = nomSourateEl ? nomSourateEl.textContent.replace(/\s+/g, ' ').trim() : ('Sourate ' + inf.s);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
      ctx.beginPath();
      ctx.roundRect(64, 78, 952, 118, 28);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#f8fafc';
      ctx.font = '800 33px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(nomSourate + '  •  Verset ' + inf.s + ':' + inf.v, 540, 128);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Révélation n°' + metaRev.rang + '/114  •  ' + metaRev.lieu + '  •  Plage ' + startV + ' ➔ ' + endV, 540, 168);

      // 3. CŒUR CENTRAL : GRILLE MOT-À-MOT EN ANIMATION AFTER EFFECTS EASY-EASE
      var cartes = obtenirCartesMotAMotUniversel();
      ctx.save();
      ctx.globalAlpha = progEntreeVerset;
      ctx.translate(0, decalageYTransition);

      if (cartes && cartes.length > 0) {
        var totalMots = cartes.length;
        var parLigne = totalMots <= 3 ? totalMots : (totalMots <= 8 ? 4 : (totalMots <= 15 ? 5 : 6));
        var nbLignes = Math.ceil(totalMots / parLigne);
        var espacementY = nbLignes <= 3 ? 215 : (nbLignes === 4 ? 175 : 145);
        var policeAr = nbLignes <= 3 ? 66 : (nbLignes === 4 ? 54 : 44);
        var policeTr = nbLignes <= 3 ? 24 : 20;
        var zoneCentreY = 670;
        var startY = zoneCentreY - ((nbLignes - 1) * espacementY) * 0.5;

        for (var i = 0; i < totalMots; i++) {
          var r = Math.floor(i / parLigne);
          var c = i % parLigne;
          var nbColsLigne = Math.min(parLigne, totalMots - r * parLigne);
          var colW = 940 / nbColsLigne;
          var xMot = 1010 - (c + 0.5) * colW;
          var yMot = startY + r * espacementY;

          var meta = cacheMetaCartes[i];
          var txtAr = (meta && meta.elAr) ? meta.elAr.textContent.trim() : '';
          var txtTr = (meta && meta.elTrad) ? meta.elTrad.textContent.trim() : '';

          var eBrut = lissageE[i] || 0;
          var bBrut = lissageB[i] || 0;
          var ePro = easeOutBackPro(eBrut);

          var scaleMot = 1.0 + 0.16 * ePro;
          var liftY = -16 * ePro;

          ctx.save();
          ctx.translate(xMot, yMot + liftY);
          ctx.scale(scaleMot, scaleMot);

          // Barre de suivi lumineuse au-dessus du mot (style corantafsir.com)
          var barW = Math.min(130, colW * 0.72);
          ctx.fillStyle = 'rgba(148, 163, 184, 0.22)';
          ctx.beginPath();
          ctx.roundRect(-barW * 0.5, -policeAr - 18, barW, 6, 3);
          ctx.fill();

          if (bBrut > 0.05 || eBrut > 0.05) {
            var fillW = barW * Math.min(1, Math.max(eBrut, bBrut));
            ctx.fillStyle = eBrut > 0.2 ? '#38bdf8' : 'rgba(56, 189, 248, 0.65)';
            ctx.beginPath();
            ctx.roundRect(barW * 0.5 - fillW, -policeAr - 18, fillW, 6, 3);
            ctx.fill();
          }

          // Mot Arabe avec glow After Effects
          ctx.font = 'bold ' + policeAr + 'px "Amiri", "Scheherazade New", serif';
          ctx.textAlign = 'center';
          if (eBrut > 0.15) {
            ctx.shadowColor = 'rgba(56, 189, 248, 0.95)';
            ctx.shadowBlur = 28 * eBrut;
            ctx.fillStyle = '#ffffff';
          } else if (bBrut > 0.5) {
            ctx.shadowColor = 'rgba(186, 230, 253, 0.35)';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#f8fafc';
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(203, 213, 225, 0.45)';
          }
          ctx.fillText(txtAr, 0, 0);

          // Traduction sous le mot arabe
          ctx.shadowBlur = 0;
          ctx.font = (eBrut > 0.2 ? '700 ' : '500 ') + policeTr + 'px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = eBrut > 0.2 ? '#38bdf8' : (bBrut > 0.5 ? '#e2e8f0' : 'rgba(148, 163, 184, 0.52)');
          var trCourt = txtTr.length > 22 ? (txtTr.slice(0, 20) + '…') : txtTr;
          ctx.fillText(trCourt, 0, 42);

          ctx.restore();
        }
      }
      ctx.restore();

      // 4. PANNEAU INFÉRIEUR : TRADUCTION + TAFSIR COMPLET (OÙ, QUAND, POURQUOI & SOURCE)
      ctx.save();
      ctx.globalAlpha = progEntreeVerset;
      ctx.translate(0, decalageYTransition * 0.6);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.90)';
      ctx.beginPath();
      ctx.roundRect(56, 1180, 968, 630, 32);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.42)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // A. Traduction du verset en cours
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
      var texteTrad = '« ' + (cacheTafsirVerset.trad || 'Lecture synchronisée du verset...') + ' »';
      var lignesTrad = decouperTexteCanvasPro(ctx, texteTrad, 890).slice(0, 4);
      var curY = 1242;
      for (var lt = 0; lt < lignesTrad.length; lt++) {
        ctx.fillText(lignesTrad[lt], 540, curY);
        curY += 38;
      }

      // Ligne séparatrice fine
      curY += 8;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(110, curY);
      ctx.lineTo(970, curY);
      ctx.stroke();
      curY += 36;

      // B. OÙ & QUAND (Lieu et Époque de la Révélation)
      ctx.textAlign = 'left';
      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('📍 OÙ & QUAND : ' + metaRev.lieu + ' • ' + metaRev.quand, 92, curY);
      curY += 36;

      // C. POURQUOI & TAFSIR DU VERSET
      ctx.fillStyle = '#facc15';
      ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('💡 POURQUOI & EXÉGÈSE (TAFSĪR) :', 92, curY);
      curY += 32;

      var explicationCombinee = metaRev.pourquoi;
      if (cacheTafsirVerset.tafsir) {
        explicationCombinee += ' — ' + cacheTafsirVerset.tafsir;
      }
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
      var lignesTafsir = decouperTexteCanvasPro(ctx, explicationCombinee, 890).slice(0, 6);
      for (var lf = 0; lf < lignesTafsir.length; lf++) {
        ctx.fillText(lignesTafsir[lf], 92, curY);
        curY += 31;
      }

      // D. SOURCES AUTHENTIQUES + SIGNATURE DU SITE
      ctx.textAlign = 'center';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 19px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('📚 Sources : Tafsīr Al-Mukhtasar • Tafsīr Ibn Kathīr • Asbāb an-Nuzūl (Al-Wāhidī / As-Suyūtī)', 540, 1752);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('corantafsir.com', 540, 1790);

      ctx.restore();

      // Mise à jour du chronomètre (objectif 1 min – 2 min)
      var secTot = Math.floor((now - debutMs) / 1000);
      var mm = String(Math.floor(secTot / 60)).padStart(2, '0');
      var ss = String(secTot % 60).padStart(2, '0');
      lblTimer.textContent = '🎬 Verset ' + inf.s + ':' + inf.v + ' (Plage ' + startV + '➔' + endV + ') • Durée : ' + mm + ':' + ss;

      requestAnimationFrame(dessinerFrameProMotion);
    }

    requestAnimationFrame(dessinerFrameProMotion);
  }

  function verifierChangementVersetEtPause() {
    injecterLiensFooterPropres();
    creerBoutonTikTokStudioV120();
    initialiserModesSurSourate();
    masquerBlocProgressionSurSourate();
    mettreAJourMentionsLegalesGoogleGrants();
    desactiverModaleRacineMot();
    var cleActuelle = obtenirCleVersetActuelDom();
    if (cleActuelle && derniereCleVersetVue && cleActuelle !== derniereCleVersetVue) {
      derniereCleVersetVue = cleActuelle; derniereSigPreparation = ''; maxIdxAtteintVerset = -1;
      idxMotEnCoursCache = -1; tempsDebutReelObserve = {}; modeContrasteSuivi = 0;
      window.__wbwEnergies = []; window.__wbwBleus = [];
      gererMasquageDoublonVerset(null, false); mettreAJourBoutonAudioRange();
    } else if (cleActuelle) derniereCleVersetVue = cleActuelle;
    if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW();
  }

  setInterval(verifierChangementVersetEtPause, 180);
  document.addEventListener('click', function() { setTimeout(verifierChangementVersetEtPause, 5); setTimeout(verifierChangementVersetEtPause, 60); });
  document.addEventListener('change', function() { setTimeout(verifierChangementVersetEtPause, 5); setTimeout(verifierChangementVersetEtPause, 60); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', verifierChangementVersetEtPause);
  else verifierChangementVersetEtPause();
})();
`;

new Function(codeClientStable);

const blocHtmlStable = '<!-- WBW_COLLE_V110_START -->\n' + styleStable + '\n<script id="wbw-colle-v110">' + codeClientStable + '</script>\n<!-- WBW_COLLE_V110_END -->';

function patcherContenu(c) {
  c = c.replace(/<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90|COLLE_V91|COLLE_V92|COLLE_V93|COLLE_V94|COLLE_V95|COLLE_V96|COLLE_V97|COLLE_V98|COLLE_V99|COLLE_V100|COLLE_V101|COLLE_V102|COLLE_V103|COLLE_V104|COLLE_V105|COLLE_V106|COLLE_V107|COLLE_V108|COLLE_V109|COLLE_V110|COLLE_V111|COLLE_V112)_START -->[\s\S]*?<!-- WBW_(?:RIBBON_V83|UNIFIED_V84|CLEAN_V85|COLLE_V86|COLLE_V87|COLLE_V88|COLLE_V89|COLLE_V90|COLLE_V91|COLLE_V92|COLLE_V93|COLLE_V94|COLLE_V95|COLLE_V96|COLLE_V97|COLLE_V98|COLLE_V99|COLLE_V100|COLLE_V101|COLLE_V102|COLLE_V103|COLLE_V104|COLLE_V105|COLLE_V106|COLLE_V107|COLLE_V108|COLLE_V109|COLLE_V110|COLLE_V111|COLLE_V112)_END -->\s*/g, '');
  c = c.replace(/«\s*Institut\s+Muhasiba\s*»/gi, '« INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX »');
  c = c.replace(/«\s*Institut\s+Numérique\s+Coran[^»]*»/gi, '« INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX »');
  c = c.replace(/W343000000\s*•\s*SIRET en cours d['’]attribution INSEE/g, 'W343035331 • SIRET : 13288669800019');
  c = c.replace(/W343000000/g, 'W343035331');
  c = c.replace(/RNA\s*:\s*<strong>W343035331<\/strong>(?!\s*•\s*SIRET)/g, 'RNA : <strong>W343035331</strong> • SIRET : <strong>13288669800019</strong>');
  c = c.replace(/340[08]0\s*Montpellier/gi, 'Montpellier');
  c = c.replace(/dosari:\s*\[13,\s*174,\s*168\],\s*dossari:\s*\[13,\s*174,\s*168\],\s*yasser:\s*\[13,\s*174,\s*168\]/g, 'dosari: [174, 168], dossari: [174, 168], yasser: [174, 168]');
  c = c.replace(/minshawi:\s*\[8,\s*9\]/g, 'minshawi: [9]');
  c = c.replace(/function chargerVraiMotAMotVerset\(vk,\s*lang\)\s*\{\s*if\s*\(window\.__wbwBypassOrigCartes\)\s*return;\s*/g, 'function chargerVraiMotAMotVerset(vk, lang) {');
  c = c.replace(/if\s*\(!window\.__wbwBypassOrigCartes\)\s*c\.setAttribute\("data-word-num",\s*String\(i\s*\+\s*1\)\);/g, 'c.setAttribute("data-word-num", String(i + 1));');
  c = c.replace(/if\s*\(tradFinale\s*&&\s*elTr\.textContent\s*!==\s*tradFinale\)\s*\{\s*delete\s*elTr\.dataset\.wbwTrOk;\s*elTr\.textContent\s*=\s*tradFinale;\s*\}/g, 'if (tradFinale && !elTr.dataset.wbwTrOk && elTr.textContent !== tradFinale) elTr.textContent = tradFinale;');
  c = c.replace(/if\s*\(tradFinale\s*&&\s*elTr\.textContent\s*!==\s*tradFinale\)\s*elTr\.textContent\s*=\s*tradFinale;/g, 'if (tradFinale && !elTr.dataset.wbwTrOk && elTr.textContent !== tradFinale) elTr.textContent = tradFinale;');
  c = c.replace(/var segs = obtenirSegmentsDepuisCache\(vk\);/g, 'var segs = obtenirSegmentsDepuisCache(vk); window.__wbwSegsActuels = segs;');
  c = c.replace(/var c1 = document\.querySelectorAll\("\.wbw-word-box, \.wbw-card-v11[012], \.wbw-card, \.wbw-word, \.wbw-item"\);/g, 'var c1 = document.querySelectorAll(".wbw-word-box, .wbw-card-v110, .wbw-card, .wbw-word, .wbw-item");');
  c = c.replace(/window\.__obtenirCartesWBW\s*=\s*obtenirCartesMotAMotVisibles;/g, 'window.__obtenirCartesWBWOrig = obtenirCartesMotAMotVisibles;');
  c = c.replace(/if\s*\(\s*estCartes\s*\)\s*\{(?!\s*if\s*\(\s*window\.__wbwBypassOrigCartes\s*\))/g, 'if (estCartes) { if (window.__wbwBypassOrigCartes) continue;');
  if (c.indexOf('window.__wbwBleus = bleusMots;') !== -1 && c.indexOf('window.__wbwBleus = bleusMots; if (window.__appliquerRubanColleWBW)') === -1) {
    c = c.replace('window.__wbwBleus = bleusMots;', 'window.__wbwBleus = bleusMots; if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW(performance.now());');
  }
  return c;
}

const fichiers = fs.existsSync(dossierSite) ? fs.readdirSync(dossierSite).filter(f => f.endsWith('.html') && f !== '404.html') : [];
let nb = 0;

for (const f of fichiers) {
  const p = path.join(dossierSite, f);
  let c = patcherContenu(fs.readFileSync(p, 'utf8'));
  c = c.replace('</body>', function() { return blocHtmlStable + '\n</body>'; });
  fs.writeFileSync(p, c, 'utf8');
  nb++;
}

for (const racineF of ['index.html', 'site/index.html', 'generateur.js', 'maj-tafsir.js']) {
  const pRacine = path.join(__dirname, racineF);
  if (fs.existsSync(pRacine)) {
    let cr = patcherContenu(fs.readFileSync(pRacine, 'utf8'));
    if (racineF.endsWith('.html') && cr.indexOf('</body>') !== -1 && !cr.includes('<!-- WBW_COLLE_V110_START -->')) {
      cr = cr.replace('</body>', function() { return blocHtmlStable + '\n</body>'; });
    }
    fs.writeFileSync(pRacine, cr, 'utf8');
  }
}

console.log('✅ Correctif V116 appliqué sur ' + nb + ' pages (Mentions légales RNA W343035331 + SIRET 13288669800019 mis à jour partout) !');



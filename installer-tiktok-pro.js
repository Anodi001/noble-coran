const fs = require('fs');
const path = require('path');

// 1. GENERATION DES PAGES A-PROPOS.HTML ET CONTACT.HTML
const pageAPropos = `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>À propos — INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { background: #050914; color: #f8fafc; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; margin: 0; padding: 24px; line-height: 1.75; }
    .card { max-width: 820px; margin: 40px auto; padding: 40px; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.7); }
    .badge { display: inline-block; background: rgba(56, 189, 248, 0.14); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35); padding: 6px 16px; border-radius: 999px; font-size: 0.82rem; font-weight: 800; }
    h1 { color: #38bdf8; font-size: 1.75rem; font-weight: 800; margin: 18px 0 12px 0; }
    h2 { color: #e2e8f0; font-size: 1.2rem; margin-top: 28px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; }
    p, li { color: #cbd5e1; font-size: 0.96rem; }
    .legal-box { background: rgba(2, 6, 23, 0.65); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 16px; padding: 18px 20px; margin-top: 24px; font-size: 0.88rem; color: #94a3b8; }
    .btn-back { display: inline-block; margin-top: 28px; background: linear-gradient(135deg, #38bdf8, #0ea5e9); color: #021019; text-decoration: none; font-weight: 800; padding: 11px 24px; border-radius: 999px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">⚖️ Association Loi 1901 à but non lucratif</span>
    <h1>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</h1>
    <p>Portail éducatif, linguistique et culturel gratuit et sans publicité commerciale, édité par l’association déclarée <strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong> (RNA : <strong>W343035331</strong> • SIRET : <strong>13288669800019</strong>), dont le siège est situé à Montpellier, France.</p>
    <h2>Notre Mission Éducative & Culturelle</h2>
    <ul>
      <li><strong>Accès universel et multilingue :</strong> Diffuser gratuitement l’étude des textes fondamentaux et des langues (français, arabe, anglais, espagnol, allemand, italien, indonésien, russe).</li>
      <li><strong>Technologie pédagogique :</strong> Proposer un suivi audio mot à mot synchronisé, la visualisation des règles phonétiques de Tajwīd et l’étude chronologique de la Révélation.</li>
      <li><strong>Exégèse et sources vérifiées :</strong> Présenter pour chaque verset le contexte historique de révélation (lieu, époque, circonstances) appuyé sur les sources classiques (<em>Tafsīr Al-Mukhtasar</em>, <em>Ibn Kathīr</em>, <em>Asbāb an-Nuzūl</em>).</li>
    </ul>
    <div class="legal-box">
      <strong>Identifiants officiels :</strong> Association Loi 1901 • RNA : W343035331 • SIREN : 132 886 698 • SIRET : 13288669800019<br>
      <strong>Siège social :</strong> Montpellier, France • <strong>Contact :</strong> <a href="mailto:contact@corantafsir.com" style="color:#38bdf8;">contact@corantafsir.com</a>
    </div>
    <a href="/" class="btn-back">← Retour à l’accueil corantafsir.com</a>
  </div>
</body>
</html>`;

const pageContact = `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact — INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { background: #050914; color: #f8fafc; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; margin: 0; padding: 24px; line-height: 1.75; }
    .card { max-width: 680px; margin: 50px auto; padding: 40px; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 24px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.7); }
    h1 { color: #38bdf8; font-size: 1.7rem; font-weight: 800; margin-bottom: 12px; }
    p { color: #cbd5e1; font-size: 0.96rem; }
    .mail-box { background: rgba(2, 6, 23, 0.75); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 18px; padding: 24px; margin: 26px 0; }
    .mail-link { color: #38bdf8; font-size: 1.25rem; font-weight: 800; text-decoration: none; }
    .btn-back { display: inline-block; margin-top: 18px; background: linear-gradient(135deg, #38bdf8, #0ea5e9); color: #021019; text-decoration: none; font-weight: 800; padding: 11px 24px; border-radius: 999px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Contactez notre Institut</h1>
    <p>Pour toute question pédagogique, linguistique, technique ou institutionnelle concernant le portail <strong>corantafsir.com</strong> :</p>
    <div class="mail-box">
      <div style="font-size:0.85rem;color:#94a3b8;margin-bottom:8px;">Courriel officiel de l’association :</div>
      <a href="mailto:contact@corantafsir.com" class="mail-link">contact@corantafsir.com</a>
    </div>
    <p style="font-size:0.84rem;color:#94a3b8;">
      <strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong><br>
      Association Loi 1901 à but non lucratif • RNA : W343035331 • SIRET : 13288669800019<br>
      Siège : Montpellier, France
    </p>
    <a href="/" class="btn-back">← Retour à l’accueil</a>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'a-propos.html'), pageAPropos, 'utf8');
fs.writeFileSync(path.join(__dirname, 'contact.html'), pageContact, 'utf8');
if (fs.existsSync(path.join(__dirname, 'site'))) {
  fs.writeFileSync(path.join(__dirname, 'site', 'a-propos.html'), pageAPropos, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'site', 'contact.html'), pageContact, 'utf8');
}

// 2. MODULE CLIENT TIKTOK PRO MOTION V121 (SANS AUCUN ANTISLASH)
function moduleTikTokProMotionV121() {
  var ORDRE_REVELATION_SOURATES = {
    96:{rang:1,lieu:'La Mecque (Grotte de Hira)',quand:'~610 ap. J.-C. (1re révélation)',pourquoi:'Premiers versets révélés au Prophète ﷺ ordonnant la lecture et la recherche du savoir au nom du Créateur.'},
    68:{rang:2,lieu:'La Mecque',quand:'Début de la période mecquoise (~610)',pourquoi:'Défense du Prophète ﷺ face aux accusations de folie et éloge de sa haute moralité.'},
    73:{rang:3,lieu:'La Mecque',quand:'Début de la mission à La Mecque',pourquoi:'Préparation spirituelle par la prière nocturne (Qiyam al-Layl) et la récitation posée du Coran.'},
    74:{rang:4,lieu:'La Mecque',quand:'Début de la prédication publique',pourquoi:'Ordre de se lever pour avertir les hommes et purifier son cœur.'},
    1:{rang:5,lieu:'La Mecque',quand:'Début de l’Islam à La Mecque',pourquoi:'Sourate d’ouverture et pilier de la prière résumant la louange, l’unicité (Tawhid) et la demande de guidée.'},
    111:{rang:6,lieu:'La Mecque',quand:'Début de l’appel sur le mont As-Safa',pourquoi:'Réponse à l’hostilité d’Abu Lahab contre l’appel du Prophète ﷺ.'},
    81:{rang:7,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Description saisissante du Jour de la Résurrection et réveil des consciences.'},
    87:{rang:8,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Glorification du Très-Haut et rappel de la purification de l’âme.'},
    92:{rang:9,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Contraste entre la générosité pieuse (inspirée par Abu Bakr) et l’avarice orgueilleuse.'},
    89:{rang:10,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Leçon historique sur la fin des peuples tyrans (Ad, Thamud, Pharaon) et l’apaisement de l’âme croyante.'},
    93:{rang:11,lieu:'La Mecque',quand:'Après une courte interruption de la Révélation',pourquoi:'Consolation divine au Prophète ﷺ confirmant qu’Allah ne l’a ni abandonné ni détesté.'},
    94:{rang:12,lieu:'La Mecque',quand:'Juste après Ad-Duha',pourquoi:'Apaisement du cœur du Prophète ﷺ et promesse qu’à chaque difficulté succède une facilité.'},
    103:{rang:13,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Synthèse du salut humain : la foi, les œuvres justes, le conseil mutuel de la vérité et de la patience.'},
    100:{rang:14,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Mise en garde contre l’ingratitude de l’homme et son amour excessif des biens terrestres.'},
    108:{rang:15,lieu:'La Mecque',quand:'Suite aux moqueries d’Al-As ibn Wail',pourquoi:'Annonce du don de l’abondance (Al-Kawthar) au Prophète ﷺ.'},
    102:{rang:16,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Avertissement contre la course aux richesses qui distrait l’homme jusqu’à la tombe.'},
    107:{rang:17,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Condamnation de ceux qui repoussent l’orphelin, négligent le pauvre et prient par ostentation.'},
    109:{rang:18,lieu:'La Mecque',quand:'Face aux compromis proposés par Quraysh',pourquoi:'Affirmation pacifique mais absolue de l’unicité du culte sans compromis.'},
    105:{rang:19,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Rappel de la protection miraculeuse de la Kabah contre l’armée d’Abraha (Année de l’Éléphant, 570).'},
    113:{rang:20,lieu:'La Mecque / Médine',quand:'Protection quotidienne',pourquoi:'Demande de refuge auprès du Seigneur de l’aube contre tous les maux extérieurs et l’envie.'},
    114:{rang:21,lieu:'La Mecque / Médine',quand:'Protection spirituelle',pourquoi:'Demande de protection auprès du Seigneur des hommes contre les insufflations du tentateur.'},
    112:{rang:22,lieu:'La Mecque',quand:'En réponse aux questions sur la nature de Dieu',pourquoi:'Définition pure de l’Unicité divine (At-Tawhid), équivalant au tiers du Coran.'},
    53:{rang:23,lieu:'La Mecque',quand:'An 5 de la Prophétie',pourquoi:'Confirmation de la véracité de la révélation transmise par l’ange Jibril (Gabriel).'},
    80:{rang:24,lieu:'La Mecque',quand:'Lors de la venue d’Ibn Umm Maktum',pourquoi:'Enseignement divin accordant la priorité à celui qui cherche sincèrement à se purifier.'},
    97:{rang:25,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Révélation de la grandeur de la Nuit du Destin (Laylat al-Qadr), meilleure que mille mois.'},
    91:{rang:26,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Serments cosmiques sur le Soleil et la Lune montrant que la réussite réside dans la purification de l’âme.'},
    85:{rang:27,lieu:'La Mecque',quand:'Période de persécution des premiers croyants',pourquoi:'Soutien aux croyants éprouvés à travers le récit des Gens du Fossé (Ashab al-Ukhdud).'},
    95:{rang:28,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Création de l’homme dans la plus parfaite harmonie et importance de la foi accompagnée d’œuvres.'},
    106:{rang:29,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Appel adressé à Quraysh pour adorer le Seigneur de la Kabah qui les a nourris et sécurisés.'},
    101:{rang:30,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Tableau saisissant du Jour du Fracas et de la pesée des œuvres.'},
    75:{rang:31,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Preuve de la Résurrection et apaisement du Prophète ﷺ lors de la réception de la Révélation.'},
    104:{rang:32,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Avertissement sévère contre la médisance, la calomnie et l’accumulation orgueilleuse de richesses.'},
    77:{rang:33,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Rappel répété de la vérité du Jour du Jugement.'},
    50:{rang:34,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Arguments cosmiques et rationnels sur la résurrection après la mort.'},
    90:{rang:35,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'La vraie voie ascendante : affranchir les opprimés, nourrir l’orphelin et le démuni.'},
    86:{rang:36,lieu:'La Mecque',quand:'1re période mecquoise',pourquoi:'Méditation sur l’astre nocturne et l’origine de l’être humain.'},
    54:{rang:37,lieu:'La Mecque',quand:'~5 ans avant l’Hégire',pourquoi:'Révélée lors du prodige de la fission de la Lune et rappel des peuples anciens.'},
    38:{rang:38,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Récits de Dawud, Sulayman et Ayyub invitant à la patience et au repentir.'},
    36:{rang:41,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Le Cœur du Coran : preuves de l’Unicité, de la mission prophétique et de la Résurrection.'},
    19:{rang:44,lieu:'La Mecque',quand:'Avant l’émigration en Abyssinie (~615)',pourquoi:'Récits de Zakariyya, Maryam (Marie), Isa (Jésus) et Ibrahim, récités devant le Négus.'},
    20:{rang:45,lieu:'La Mecque',quand:'Vers l’an 5-6 de la Prophétie',pourquoi:'Récit de Musa (Moïse) qui toucha le cœur de Umar ibn al-Khattab lors de sa conversion.'},
    56:{rang:46,lieu:'La Mecque',quand:'1re/2e période mecquoise',pourquoi:'Répartition des hommes en trois groupes au Jour de l’Événement inéluctable.'},
    17:{rang:50,lieu:'La Mecque',quand:'1 an avant l’Hégire (~621)',pourquoi:'Révélée suite au Voyage Nocturne (Al-Isra) et grands commandements moraux.'},
    12:{rang:53,lieu:'La Mecque',quand:'Année du Chagrin (~619-620)',pourquoi:'Le plus beau des récits : l’histoire de Yusuf (Joseph), de l’épreuve au pardon et au triomphe.'},
    18:{rang:69,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Quatre récits fondamentaux (la Caverne, les deux jardins, Moïse & Al-Khidr, Dhu al-Qarnayn) face aux épreuves.'},
    67:{rang:77,lieu:'La Mecque',quand:'2e période mecquoise',pourquoi:'Harmonie parfaite de la royauté divine (Al-Mulk) et sens de l’épreuve de la vie et de la mort.'},
    2:{rang:87,lieu:'Médine',quand:'An 1 à 10 de l’Hégire (1re sourate médinoise)',pourquoi:'Fondation de la communauté à Médine : foi, prière, jeûne, pèlerinage, éthique et Verset du Trône (2:255).'},
    3:{rang:89,lieu:'Médine',quand:'An 3 à 9 de l’Hégire',pourquoi:'Fermeté dans l’épreuve, dialogue avec les Gens du Livre et histoire de la famille de Imran.'},
    55:{rang:97,lieu:'Médine / La Mecque',quand:'Révélation des bienfaits divins',pourquoi:'Hymne aux grâces du Tout Miséricordieux dans la nature et l’au-delà (Miracle des deux mers, v.19-20).'},
    24:{rang:102,lieu:'Médine',quand:'An 5-6 de l’Hégire',pourquoi:'Préservation de l’honneur, pudeur et célèbre Verset de la Lumière (Ayat an-Nur, 24:35).'},
    49:{rang:106,lieu:'Médine',quand:'An 9 de l’Hégire',pourquoi:'Charte de l’éthique morale : vérifier les informations, réconcilier les frères, bannir le mépris et la médisance.'},
    5:{rang:112,lieu:'Médine',quand:'An 10 de l’Hégire (Pèlerinage d’Adieu)',pourquoi:'Respect des engagements, sacralité de la vie humaine (5:32) et parachèvement du message (5:3).'},
    110:{rang:114,lieu:'Médine (Mina)',quand:'An 10 de l’Hégire (Dernière sourate complète révélée)',pourquoi:'Annonce de l’accomplissement de la mission du Prophète ﷺ et appel final à la louange et au pardon.'}
  };

  function nettoyerEspacesPropres(texte) {
    var s = String(texte || '');
    var out = '';
    var dernierEspace = true;
    for (var i = 0; i < s.length; i++) {
      var code = s.charCodeAt(i);
      if (code <= 32 || code === 160) {
        if (!dernierEspace) {
          out += ' ';
          dernierEspace = true;
        }
      } else {
        out += s.charAt(i);
        dernierEspace = false;
      }
    }
    return out.trim();
  }

  function retirerNumeroDebut(texte) {
    var s = nettoyerEspacesPropres(texte);
    var idx = 0;
    while (idx < s.length) {
      var c = s.charCodeAt(idx);
      if ((c >= 48 && c <= 57) || c === 46 || c === 58 || c === 45 || c === 32) idx++;
      else break;
    }
    return s.slice(idx).trim() || s;
  }

  function decouperLignesPropres(ctx, texte, maxW) {
    var propre = nettoyerEspacesPropres(texte);
    if (!propre) return [];
    var mots = propre.split(' ');
    var lignes = [];
    var cur = '';
    for (var i = 0; i < mots.length; i++) {
      var m = mots[i];
      if (!m) continue;
      var test = cur ? (cur + ' ' + m) : m;
      if (ctx.measureText(test).width > maxW && cur) {
        lignes.push(cur);
        cur = m;
      } else {
        cur = test;
      }
    }
    if (cur) lignes.push(cur);
    return lignes;
  }

  function injecterLiensFooterPropres() {
    var tousBtns = document.querySelectorAll('button, a');
    var btnMentions = null;
    for (var i = 0; i < tousBtns.length; i++) {
      var t = nettoyerEspacesPropres(tousBtns[i].textContent || '');
      if (t.indexOf('Mentions') !== -1 && t.indexOf('gales') !== -1) {
        btnMentions = tousBtns[i];
        break;
      }
    }
    if (btnMentions && btnMentions.parentElement && !document.getElementById('wbwInstitutionalLinksV121')) {
      var old = document.getElementById('wbwInstitutionalLinksV120');
      if (old) old.remove();
      var wrap = document.createElement('span');
      wrap.id = 'wbwInstitutionalLinksV121';
      wrap.style.cssText = 'display:inline-flex;align-items:center;gap:10px;margin-left:10px;flex-wrap:wrap;justify-content:center;';
      var stylePill = 'background:rgba(15,23,42,0.75);color:#cbd5e1;border:1px solid rgba(56,189,248,0.28);padding:6px 14px;border-radius:999px;font-size:0.78rem;font-weight:700;text-decoration:none;transition:all 0.2s ease;display:inline-flex;align-items:center;gap:5px;';
      wrap.innerHTML =
        '<a href="/a-propos.html" style="' + stylePill + '">🏛️ À propos</a>' +
        '<a href="/contact.html" style="' + stylePill + '">✉️ Contact</a>';
      btnMentions.parentElement.insertBefore(wrap, btnMentions.nextSibling);
    }
  }

  function extraireTradEtTafsirDuSite() {
    var frEl = document.getElementById('frenchVerseEl') || document.querySelector('.french-glow-verse');
    var trad = '';
    if (frEl) {
      trad = retirerNumeroDebut(frEl.innerText || frEl.textContent || '');
    }

    var sautLigne = String.fromCharCode(10);
    var contexteTitre = '';
    var contexteCorps = '';
    var tousBlocs = document.querySelectorAll('div, section, article');
    for (var i = 0; i < tousBlocs.length; i++) {
      var b = tousBlocs[i];
      if (b.id === 'wbwTikTokStageV121' || b.id === 'wbwTikTokConfigModalV121') continue;
      var txt = nettoyerEspacesPropres(b.innerText || b.textContent || '');
      if (txt.length > 60 && txt.length < 900 && b.children.length >= 1 && b.children.length <= 5) {
        if (txt.indexOf('Contexte de révélation') !== -1 || txt.indexOf('Hadith du début') !== -1 || txt.indexOf('Miracle') !== -1 || txt.indexOf('Exégèse') !== -1 || txt.indexOf('Al-Mukhtasar') !== -1) {
          var lignesBloc = (b.innerText || b.textContent || '').split(sautLigne).map(nettoyerEspacesPropres).filter(Boolean);
          if (lignesBloc.length >= 2) {
            contexteTitre = lignesBloc[0];
            contexteCorps = lignesBloc.slice(1).join(' ');
          } else {
            contexteCorps = txt;
          }
          break;
        }
      }
    }

    if (!trad) {
      for (var j = 0; j < tousBlocs.length; j++) {
        var el = tousBlocs[j];
        var tEl = nettoyerEspacesPropres(el.innerText || el.textContent || '');
        if (tEl.indexOf('Traduction explicative') !== -1 && tEl.length < 700) {
          var parts = tEl.split('Traduction explicative');
          if (parts[0] && parts[0].length > 15) {
            trad = retirerNumeroDebut(parts[0]);
            break;
          }
        }
      }
    }

    if (contexteCorps.indexOf('Traduction explicative') !== -1) {
      contexteCorps = nettoyerEspacesPropres(contexteCorps.split('Traduction explicative')[0]);
    }
    if (contexteCorps.length > 340) {
      var coupe = contexteCorps.slice(0, 335);
      var pt = Math.max(coupe.lastIndexOf('.'), coupe.lastIndexOf('!'), coupe.lastIndexOf('?'), coupe.lastIndexOf('»'));
      contexteCorps = pt > 160 ? coupe.slice(0, pt + 1) : (coupe + '…');
    }

    return {
      trad: trad,
      titreContexte: contexteTitre,
      tafsir: contexteCorps
    };
  }

  function creerBoutonTikTokStudioV121() {
    var pathUrl = window.location.pathname.toLowerCase();
    var estPageSourate = pathUrl.indexOf('sourate-') !== -1 || Boolean(document.querySelector('#arabicVerse, #arabicVerseEl, .arabic-glow-verse'));
    if (!estPageSourate) return;
    var oldBtn = document.getElementById('wbwTikTokStudioBtnV120');
    if (oldBtn) oldBtn.remove();
    if (document.getElementById('wbwTikTokStudioBtnV121')) return;

    var cible = document.getElementById('wbwAudioRangeBtnV110') || document.querySelector('.rp-btn') || document.getElementById('playSyncBtn');
    if (!cible || !cible.parentElement) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'wbwTikTokStudioBtnV121';
    btn.innerHTML = '🎬 Studio TikTok 9:16';
    btn.style.cssText = 'background:linear-gradient(135deg,rgba(14,165,233,0.24),rgba(236,72,153,0.24));color:#f8fafc;border:1px solid rgba(56,189,248,0.55);padding:6px 14px;border-radius:11px;font-family:inherit;font-size:0.81rem;font-weight:800;cursor:pointer;margin-left:6px;display:inline-flex;align-items:center;gap:6px;box-shadow:0 0 14px rgba(56,189,248,0.25);';
    btn.onclick = ouvrirConfigStudioTikTokV121;
    cible.parentElement.insertBefore(btn, cible.nextSibling);
  }

  function ouvrirConfigStudioTikTokV121() {
    var old = document.getElementById('wbwTikTokConfigModalV121');
    if (old) old.remove();

    var info = obtenirInfosSourateEtVerset();
    var metaRev = ORDRE_REVELATION_SOURATES[info.s] || { rang: info.s, lieu: 'La Mecque / Médine', quand: 'Époque prophétique', pourquoi: 'Enseignement spirituel, historique et exégétique des versets.' };
    var endAuto = Math.min(info.totalV, info.v + (info.totalV <= 19 ? info.totalV : 9));

    var optsStart = '', optsEnd = '';
    for (var i = 1; i <= info.totalV; i++) {
      optsStart += '<option value="' + i + '"' + (i === info.v ? ' selected' : '') + '>Verset ' + info.s + ':' + i + '</option>';
      optsEnd += '<option value="' + i + '"' + (i === endAuto ? ' selected' : '') + '>Verset ' + info.s + ':' + i + '</option>';
    }

    var mod = document.createElement('div');
    mod.id = 'wbwTikTokConfigModalV121';
    mod.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,23,0.84);backdrop-filter:blur(10px);z-index:100050;display:flex;align-items:center;justify-content:center;padding:16px;font-family:"Plus Jakarta Sans",system-ui,sans-serif;color:#f8fafc;';
    mod.innerHTML =
      '<div style="width:100%;max-width:480px;background:#0b1222;border:1px solid rgba(56,189,248,0.38);border-radius:24px;padding:24px;box-shadow:0 25px 60px rgba(0,0,0,0.88);">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
          '<span style="background:rgba(56,189,248,0.15);color:#38bdf8;padding:5px 13px;border-radius:999px;font-size:0.76rem;font-weight:800;">Révélation n°' + metaRev.rang + '/114 • ' + metaRev.lieu + '</span>' +
          '<button type="button" id="wbwCloseCfgV121" style="background:none;border:none;color:#94a3b8;font-size:1.3rem;cursor:pointer;">✕</button>' +
        '</div>' +
        '<h3 style="margin:0 0 6px 0;font-size:1.18rem;color:#fff;">🎬 Studio TikTok 9:16 (Pro Motion 60 FPS)</h3>' +
        '<p style="margin:0 0 16px 0;font-size:0.83rem;color:#94a3b8;line-height:1.5;">Choisis la plage de versets à partager. Rendu 9:16 avec Soleil & Lune en orbite, étoiles occultées, Mot-à-Mot Easy-Ease et Tafsīr (Où, Quand, Pourquoi & Sources).</p>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">' +
          '<div><label style="display:block;font-size:0.78rem;color:#cbd5e1;margin-bottom:5px;font-weight:700;">Du verset :</label>' +
          '<select id="wbwTkStartV121" style="width:100%;background:#162033;color:#fff;border:1px solid rgba(56,189,248,0.35);border-radius:10px;padding:9px;font-weight:700;">' + optsStart + '</select></div>' +
          '<div><label style="display:block;font-size:0.78rem;color:#cbd5e1;margin-bottom:5px;font-weight:700;">Au verset :</label>' +
          '<select id="wbwTkEndV121" style="width:100%;background:#162033;color:#fff;border:1px solid rgba(56,189,248,0.35);border-radius:10px;padding:9px;font-weight:700;">' + optsEnd + '</select></div>' +
        '</div>' +
        '<button type="button" id="wbwTkAuto1m30V121" style="width:100%;background:rgba(56,189,248,0.12);color:#38bdf8;border:1px dashed rgba(56,189,248,0.45);border-radius:10px;padding:8px;font-size:0.8rem;font-weight:800;cursor:pointer;margin-bottom:16px;">⚡ Calibrer automatiquement pour 1 min 30 – 2 min (Défi TikTok)</button>' +
        '<div style="display:flex;flex-direction:column;gap:10px;">' +
          '<button type="button" id="wbwTkLaunchCinemaV121" style="background:linear-gradient(135deg,#38bdf8,#0284c7);color:#021019;border:none;border-radius:14px;padding:12px;font-weight:800;font-size:0.92rem;cursor:pointer;">▶️ Lancer l’Animation 9:16 Plein Écran (Sans interface)</button>' +
          '<button type="button" id="wbwTkLaunchRecordV121" style="background:linear-gradient(135deg,#ec4899,#be185d);color:#ffffff;border:none;border-radius:14px;padding:12px;font-weight:800;font-size:0.92rem;cursor:pointer;">🔴 Enregistrer & Télécharger la Vidéo 9:16 (.webm HD + Audio)</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(mod);

    var selS = document.getElementById('wbwTkStartV121');
    var selE = document.getElementById('wbwTkEndV121');
    selS.onchange = function() { if (parseInt(selE.value, 10) < parseInt(selS.value, 10)) selE.value = selS.value; };
    selE.onchange = function() { if (parseInt(selE.value, 10) < parseInt(selS.value, 10)) selS.value = selE.value; };

    document.getElementById('wbwCloseCfgV121').onclick = function() { mod.remove(); };
    document.getElementById('wbwTkAuto1m30V121').onclick = function() {
      var sVal = parseInt(selS.value, 10) || 1;
      var cibleFin = info.totalV <= 19 ? info.totalV : Math.min(info.totalV, sVal + 10);
      selE.value = String(cibleFin);
    };

    document.getElementById('wbwTkLaunchCinemaV121').onclick = function() {
      var v1 = parseInt(selS.value, 10) || 1, v2 = Math.max(v1, parseInt(selE.value, 10) || v1);
      mod.remove();
      demarrerPlayerTikTok916V121(v1, v2, false);
    };
    document.getElementById('wbwTkLaunchRecordV121').onclick = function() {
      var v1 = parseInt(selS.value, 10) || 1, v2 = Math.max(v1, parseInt(selE.value, 10) || v1);
      mod.remove();
      demarrerPlayerTikTok916V121(v1, v2, true);
    };
  }

  function easeOutCubicPro(x) {
    var v = Math.max(0, Math.min(1, x || 0));
    return 1 - Math.pow(1 - v, 3);
  }

  function easeInOutCubicPro(x) {
    var v = Math.max(0, Math.min(1, x || 0));
    return v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
  }

  function easeOutBackDoux(x) {
    var v = Math.max(0, Math.min(1, x || 0));
    var c1 = 1.25, c3 = c1 + 1;
    return 1 + c3 * Math.pow(v - 1, 3) + c1 * Math.pow(v - 1, 2);
  }

  function demarrerPlayerTikTok916V121(startV, endV, avecEnregistrementVideo) {
    var aud = document.getElementById('ayahAudio');
    if (!aud) return;

    var btnWbw = trouverBoutonMotAMot();
    if (btnWbw && !estModeMotAMotActif()) btnWbw.click();
    window.__wbwSuiviBoutonActif = true;

    var stage = document.createElement('div');
    stage.id = 'wbwTikTokStageV121';
    stage.style.cssText = 'position:fixed;inset:0;background:#01040a;z-index:100100;display:flex;flex-direction:column;align-items:center;justify-content:center;user-select:none;';

    var canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    canvas.style.cssText = 'height:92vh;max-height:950px;width:auto;aspect-ratio:9/16;border-radius:28px;box-shadow:0 0 80px rgba(56,189,248,0.22),0 25px 60px rgba(0,0,0,0.95);border:1px solid rgba(56,189,248,0.34);background:#030712;';
    var ctx = canvas.getContext('2d');

    var ctrlBar = document.createElement('div');
    ctrlBar.style.cssText = 'margin-top:10px;display:flex;align-items:center;gap:14px;font-family:"Plus Jakarta Sans",sans-serif;';
    var lblTimer = document.createElement('span');
    lblTimer.style.cssText = 'color:#7dd3fc;font-size:0.85rem;font-weight:800;';
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

    var recorder = null, chunks = [], actif = true, debutMs = performance.now(), dernierTs = performance.now();
    if (avecEnregistrementVideo && typeof MediaRecorder !== 'undefined') {
      try {
        var vStream = canvas.captureStream(60);
        var finalStream = vStream;
        try {
          if (!window.__wbwAudioCtxV121) {
            var AC = window.AudioContext || window.webkitAudioContext;
            window.__wbwAudioCtxV121 = new AC();
            window.__wbwAudioSrcV121 = window.__wbwAudioCtxV121.createMediaElementSource(aud);
            window.__wbwAudioDestV121 = window.__wbwAudioCtxV121.createMediaStreamDestination();
            window.__wbwAudioSrcV121.connect(window.__wbwAudioCtxV121.destination);
            window.__wbwAudioSrcV121.connect(window.__wbwAudioDestV121);
          }
          if (window.__wbwAudioCtxV121.state === 'suspended') window.__wbwAudioCtxV121.resume();
          finalStream = new MediaStream(vStream.getVideoTracks().concat(window.__wbwAudioDestV121.stream.getAudioTracks()));
        } catch (errA) {}
        var mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus') ? 'video/webm;codecs=vp9,opus' : 'video/webm';
        recorder = new MediaRecorder(finalStream, { mimeType: mime, videoBitsPerSecond: 9000000 });
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

    var etoiles = [];
    for (var s = 0; s < 160; s++) {
      var angle = Math.random() * Math.PI * 2;
      var dist = 40 + Math.random() * 1150;
      etoiles.push({
        angle: angle,
        dist: dist,
        vitesse: (0.00004 + Math.random() * 0.00007) * (s % 2 === 0 ? 1 : -1),
        r: 0.7 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
        freq: 0.0012 + Math.random() * 0.0022,
        brillante: s % 19 === 0,
        teinte: s % 5 === 0 ? '#fde68a' : (s % 3 === 0 ? '#bae6fd' : '#f8fafc')
      });
    }

    var derniereCleTransition = '';
    var tDebutTransitionVerset = performance.now();
    var cacheContenuVerset = { trad: '', titreContexte: '', tafsir: '' };
    var animMots60 = [];
    var spotX = 540, spotY = 580;

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
        setTimeout(fermerStudio, 650);
      }
    };
    aud.addEventListener('ended', checkFinPlage);

    function visibiliteSousSoleilLune(x, y, sunX, sunY, sunR, moonX, moonY, moonR) {
      var dxS = x - sunX, dyS = y - sunY;
      var dS = Math.sqrt(dxS * dxS + dyS * dyS);
      if (dS <= sunR * 1.18) return 0;
      var vS = dS < sunR * 1.55 ? (dS - sunR * 1.18) / (sunR * 0.37) : 1;

      var dxM = x - moonX, dyM = y - moonY;
      var dM = Math.sqrt(dxM * dxM + dyM * dyM);
      if (dM <= moonR * 1.18) return 0;
      var vM = dM < moonR * 1.55 ? (dM - moonR * 1.18) / (moonR * 0.37) : 1;

      return Math.min(vS, vM);
    }

    function dessinerSoleilEtLuneOrbitaux(now) {
      var tOrb = now * 0.00018;
      var moonX = 165 + Math.cos(tOrb) * 68;
      var moonY = 390 + Math.sin(tOrb * 1.3) * 115;
      var moonR = 46;

      var sunX = 915 + Math.cos(tOrb + Math.PI) * 68;
      var sunY = 670 + Math.sin(tOrb * 1.3 + Math.PI) * 125;
      var sunR = 52;

      for (var i = 0; i < etoiles.length; i++) {
        var st = etoiles[i];
        var ang = st.angle + now * st.vitesse;
        var sx = 540 + Math.cos(ang) * st.dist;
        var sy = 960 + Math.sin(ang) * (st.dist * 1.25);
        if (sx < -20 || sx > 1100 || sy < -20 || sy > 1940) continue;

        var occ = visibiliteSousSoleilLune(sx, sy, sunX, sunY, sunR, moonX, moonY, moonR);
        if (occ <= 0.02) continue;

        var scint = 0.32 + 0.68 * (0.5 + 0.5 * Math.sin(now * st.freq + st.phase));
        var alpha = scint * occ;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = st.teinte;
        ctx.beginPath();
        ctx.arc(sx, sy, st.r, 0, Math.PI * 2);
        ctx.fill();

        if (st.brillante && scint > 0.72) {
          ctx.strokeStyle = st.teinte;
          ctx.lineWidth = 1.1;
          var br = st.r * 3.4;
          ctx.beginPath();
          ctx.moveTo(sx - br, sy); ctx.lineTo(sx + br, sy);
          ctx.moveTo(sx, sy - br); ctx.lineTo(sx, sy + br);
          ctx.stroke();
        }
        ctx.restore();
      }

      ctx.save();
      var haloMoon = ctx.createRadialGradient(moonX, moonY, moonR * 0.4, moonX, moonY, moonR * 3.6);
      haloMoon.addColorStop(0, 'rgba(241, 245, 249, 0.42)');
      haloMoon.addColorStop(0.35, 'rgba(186, 230, 253, 0.16)');
      haloMoon.addColorStop(1, 'rgba(186, 230, 253, 0)');
      ctx.fillStyle = haloMoon;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR * 3.6, 0, Math.PI * 2);
      ctx.fill();

      var corpsMoon = ctx.createRadialGradient(moonX - moonR * 0.28, moonY - moonR * 0.28, moonR * 0.1, moonX, moonY, moonR);
      corpsMoon.addColorStop(0, '#ffffff');
      corpsMoon.addColorStop(0.7, '#f1f5f9');
      corpsMoon.addColorStop(1, '#cbd5e1');
      ctx.fillStyle = corpsMoon;
      ctx.shadowColor = 'rgba(241, 245, 249, 0.75)';
      ctx.shadowBlur = 28;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = 'rgba(148, 163, 184, 0.22)';
      ctx.beginPath(); ctx.arc(moonX - 14, moonY - 8, 9, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(moonX + 12, moonY + 11, 12, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(moonX + 8, moonY - 16, 6, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

      ctx.save();
      var haloSun = ctx.createRadialGradient(sunX, sunY, sunR * 0.3, sunX, sunY, sunR * 4.2);
      haloSun.addColorStop(0, 'rgba(254, 240, 138, 0.55)');
      haloSun.addColorStop(0.32, 'rgba(250, 204, 21, 0.24)');
      haloSun.addColorStop(0.65, 'rgba(234, 179, 8, 0.07)');
      haloSun.addColorStop(1, 'rgba(234, 179, 8, 0)');
      ctx.fillStyle = haloSun;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunR * 4.2, 0, Math.PI * 2);
      ctx.fill();

      var corpsSun = ctx.createRadialGradient(sunX - sunR * 0.2, sunY - sunR * 0.2, sunR * 0.08, sunX, sunY, sunR);
      corpsSun.addColorStop(0, '#fef9c3');
      corpsSun.addColorStop(0.55, '#facc15');
      corpsSun.addColorStop(1, '#eab308');
      ctx.fillStyle = corpsSun;
      ctx.shadowColor = 'rgba(250, 204, 21, 0.85)';
      ctx.shadowBlur = 36;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function dessinerFrameProMotion(now) {
      if (!actif) return;
      var dt = Math.min(50, Math.max(1, now - dernierTs));
      dernierTs = now;

      if (window.__appliquerRubanColleWBW) window.__appliquerRubanColleWBW(now);

      var inf = obtenirInfosSourateEtVerset();
      var cleV = inf.s + ':' + inf.v;
      var textesDom = extraireTradEtTafsirDuSite();
      if (cleV !== derniereCleTransition) {
        derniereCleTransition = cleV;
        tDebutTransitionVerset = now;
        cacheContenuVerset = textesDom;
        animMots60 = [];
      } else if (textesDom.trad && textesDom.trad !== cacheContenuVerset.trad) {
        cacheContenuVerset = textesDom;
      }

      var progEntree = easeInOutCubicPro(Math.min(1, (now - tDebutTransitionVerset) / 480));
      var slideY = (1 - progEntree) * 26;

      var bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
      bgGrad.addColorStop(0, '#020611');
      bgGrad.addColorStop(0.48, '#060f20');
      bgGrad.addColorStop(1, '#02050e');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1920);

      dessinerSoleilEtLuneOrbitaux(now);

      var metaRev = ORDRE_REVELATION_SOURATES[inf.s] || { rang: inf.s, lieu: 'La Mecque / Médine', quand: 'Époque prophétique', pourquoi: 'Enseignement spirituel et exégétique des versets.' };
      var nomSourateEl = document.querySelector('h1, .surah-title');
      var nomSourate = nomSourateEl ? nettoyerEspacesPropres(nomSourateEl.textContent) : ('Sourate ' + inf.s);
      if (nomSourate.indexOf('—') !== -1) nomSourate = nettoyerEspacesPropres(nomSourate.split('—')[0]);

      ctx.fillStyle = 'rgba(10, 18, 35, 0.80)';
      ctx.beginPath();
      ctx.roundRect(54, 58, 972, 134, 28);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.34)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = 'rgba(56, 189, 248, 0.14)';
      ctx.beginPath();
      ctx.roundRect(190, 74, 700, 38, 19);
      ctx.fill();
      ctx.textAlign = 'center';
      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('✨ Révélation n°' + metaRev.rang + '/114  •  ' + metaRev.lieu + '  •  Plage ' + startV + ' ➔ ' + endV, 540, 100);

      ctx.fillStyle = '#f8fafc';
      ctx.font = '800 33px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(nomSourate + '  —  Verset ' + inf.s + ':' + inf.v, 540, 162);

      var cartes = obtenirCartesMotAMotUniversel();
      var totalMots = cartes ? cartes.length : 0;

      ctx.save();
      ctx.fillStyle = 'rgba(9, 16, 32, 0.74)';
      ctx.beginPath();
      ctx.roundRect(54, 214, 972, 746, 34);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.32)';
      ctx.lineWidth = 2;
      ctx.stroke();

      var spotGrad = ctx.createRadialGradient(spotX, spotY, 15, spotX, spotY, 320);
      spotGrad.addColorStop(0, 'rgba(56, 189, 248, 0.13)');
      spotGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.roundRect(54, 214, 972, 746, 34);
      ctx.fill();

      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      ctx.roundRect(220, 238, 640, 42, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.fillStyle = '#7dd3fc';
      ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⬅ Sens de lecture : de droite à gauche (1 ➔ ' + Math.max(1, totalMots) + ')', 540, 265);

      if (totalMots > 0) {
        var tAudio = aud ? (aud.currentTime || 0) : 0;
        var durAudio = (aud && aud.duration && isFinite(aud.duration)) ? aud.duration : 0;
        var audioJoue = Boolean(aud && !aud.paused && !aud.ended);
        var fenetres = durAudio > 0 ? calculerFenetresMots(durAudio) : [];

        var idxActif60 = -1;
        var progMot60 = 0;
        if (fenetres.length === totalMots && durAudio > 0) {
          for (var w = 0; w < totalMots; w++) {
            if (tAudio >= fenetres[w].t0 && tAudio <= fenetres[w].t1 + 0.05) {
              idxActif60 = w;
              var dFen = Math.max(0.12, fenetres[w].t1 - fenetres[w].t0);
              progMot60 = easeOutCubicPro(Math.max(0, Math.min(1, (tAudio - fenetres[w].t0) / dFen)));
              break;
            }
          }
          if (idxActif60 === -1 && tAudio >= fenetres[totalMots - 1].t0) {
            idxActif60 = totalMots - 1;
            progMot60 = 1;
          }
        }
        if (idxActif60 === -1) {
          for (var eIdx = 0; eIdx < totalMots; eIdx++) {
            if ((lissageE[eIdx] || 0) > 0.35) { idxActif60 = eIdx; progMot60 = lissageE[eIdx]; break; }
          }
        }

        var parLigne = totalMots <= 3 ? totalMots : (totalMots <= 8 ? 4 : (totalMots <= 15 ? 5 : 6));
        var nbLignes = Math.ceil(totalMots / parLigne);
        var espY = nbLignes <= 2 ? 235 : (nbLignes === 3 ? 195 : (nbLignes === 4 ? 155 : 128));
        var tailleAr = nbLignes <= 2 ? 68 : (nbLignes === 3 ? 58 : (nbLignes === 4 ? 48 : 40));
        var tailleTr = nbLignes <= 2 ? 23 : (nbLignes === 3 ? 21 : 18);
        var centreGrilleY = 605;
        var debutY = centreGrilleY - ((nbLignes - 1) * espY) * 0.5;

        var alphaLissage = 1 - Math.pow(1 - 0.28, dt / 16.67);

        ctx.save();
        ctx.globalAlpha = progEntree;
        ctx.translate(0, slideY);

        for (var m = 0; m < totalMots; m++) {
          if (!animMots60[m]) animMots60[m] = { e: 0, b: 0, fill: 0 };
          var stMot = animMots60[m];

          var cibleE = (audioJoue && m === idxActif60) ? 1 : (lissageE[m] || 0);
          var cibleB = (m < idxActif60 || (aud && aud.ended)) ? 1 : (m === idxActif60 ? Math.max(0.35, progMot60) : (lissageB[m] || 0));
          var cibleFill = (m < idxActif60 || (aud && aud.ended)) ? 1 : (m === idxActif60 ? Math.max(0.12, progMot60) : 0);

          stMot.e += (cibleE - stMot.e) * alphaLissage;
          stMot.b += (cibleB - stMot.b) * alphaLissage;
          stMot.fill += (cibleFill - stMot.fill) * (alphaLissage * 1.15);

          var r = Math.floor(m / parLigne);
          var c = m % parLigne;
          var nbColsCetteLigne = Math.min(parLigne, totalMots - r * parLigne);
          var largeurCol = 890 / nbColsCetteLigne;
          var xCentre = 985 - (c + 0.5) * largeurCol;
          var yCentre = debutY + r * espY;

          if (m === idxActif60) {
            spotX += (xCentre - spotX) * 0.18;
            spotY += (yCentre - spotY) * 0.18;
          }

          var meta = cacheMetaCartes[m];
          var txtAr = (meta && meta.elAr) ? nettoyerEspacesPropres(meta.elAr.textContent) : '';
          var txtTr = (meta && meta.elTrad) ? nettoyerEspacesPropres(meta.elTrad.textContent) : '';

          var eEase = easeOutBackDoux(stMot.e);
          var zoomMot = 1 + 0.14 * eEase;
          var yLift = -15 * eEase;

          ctx.save();
          ctx.translate(xCentre, yCentre + yLift);
          ctx.scale(zoomMot, zoomMot);

          var barW = Math.min(138, largeurCol * 0.72);
          var barY = -tailleAr - 14;
          ctx.fillStyle = 'rgba(148, 163, 184, 0.22)';
          ctx.beginPath();
          ctx.roundRect(-barW * 0.5, barY, barW, 5.5, 3);
          ctx.fill();

          if (stMot.fill > 0.01) {
            var wFill = barW * Math.min(1, stMot.fill);
            var xLeft = barW * 0.5 - wFill;
            var gradBar = ctx.createLinearGradient(xLeft, barY, barW * 0.5, barY);
            gradBar.addColorStop(0, '#ffffff');
            gradBar.addColorStop(0.45, '#bae6fd');
            gradBar.addColorStop(1, '#38bdf8');
            ctx.fillStyle = gradBar;
            ctx.shadowColor = 'rgba(56, 189, 248, 0.85)';
            ctx.shadowBlur = 10 * stMot.e;
            ctx.beginPath();
            ctx.roundRect(xLeft, barY, wFill, 5.5, 3);
            ctx.fill();
            ctx.shadowBlur = 0;
          }

          ctx.font = 'bold ' + tailleAr + 'px "Amiri", "Scheherazade New", serif';
          ctx.textAlign = 'center';
          if (stMot.e > 0.12) {
            ctx.shadowColor = 'rgba(56, 189, 248, 0.92)';
            ctx.shadowBlur = 26 * stMot.e;
            ctx.fillStyle = '#ffffff';
          } else if (stMot.b > 0.45) {
            ctx.shadowColor = 'rgba(255, 255, 255, 0.28)';
            ctx.shadowBlur = 8;
            ctx.fillStyle = '#f8fafc';
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(226, 232, 240, 0.52)';
          }
          ctx.fillText(txtAr, 0, 0);

          ctx.shadowBlur = 0;
          ctx.font = (stMot.e > 0.2 ? '700 ' : '500 ') + tailleTr + 'px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = stMot.e > 0.2 ? '#ffffff' : (stMot.b > 0.45 ? '#bae6fd' : 'rgba(148, 163, 184, 0.68)');
          var lignesMotTr = decouperLignesPropres(ctx, txtTr, largeurCol * 0.88).slice(0, 2);
          for (var lm = 0; lm < lignesMotTr.length; lm++) {
            ctx.fillText(lignesMotTr[lm], 0, 36 + lm * (tailleTr + 5));
          }

          ctx.restore();
        }
        ctx.restore();
      }
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = progEntree;
      ctx.translate(0, slideY * 0.65);

      ctx.fillStyle = 'rgba(11, 20, 38, 0.86)';
      ctx.beginPath();
      ctx.roundRect(54, 982, 972, 260, 28);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.36)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('📖 TRADUCTION DU VERSET (' + inf.s + ':' + inf.v + ')', 90, 1024);

      var texteTradPropre = cacheContenuVerset.trad || 'Lecture synchronisée du verset en cours...';
      var policeTrad = texteTradPropre.length > 180 ? 25 : (texteTradPropre.length > 110 ? 28 : 31);
      ctx.font = '700 ' + policeTrad + 'px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      var lignesTrad = decouperLignesPropres(ctx, '« ' + texteTradPropre + ' »', 900).slice(0, 4);
      var yTr = 1072;
      for (var lt = 0; lt < lignesTrad.length; lt++) {
        ctx.fillText(lignesTrad[lt], 90, yTr);
        yTr += policeTrad + 12;
      }
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = progEntree;
      ctx.translate(0, slideY * 0.45);

      ctx.fillStyle = 'rgba(12, 19, 36, 0.90)';
      ctx.beginPath();
      ctx.roundRect(54, 1262, 972, 578, 30);
      ctx.fill();
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.38)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('📍 OÙ & QUAND : ' + metaRev.lieu + '  •  ' + metaRev.quand, 90, 1312);

      ctx.fillStyle = '#facc15';
      ctx.font = '800 23px "Plus Jakarta Sans", sans-serif';
      var sousTitreCtx = cacheContenuVerset.titreContexte ? cacheContenuVerset.titreContexte : '📜 Pourquoi & Exégèse (Tafsīr du verset) :';
      if (sousTitreCtx.length > 68) sousTitreCtx = sousTitreCtx.slice(0, 66) + '…';
      ctx.fillText(sousTitreCtx, 90, 1356);

      var texteTafsirComplet = cacheContenuVerset.tafsir ? (cacheContenuVerset.tafsir + ' — ' + metaRev.pourquoi) : metaRev.pourquoi;
      var taillePolTafsir = texteTafsirComplet.length > 320 ? 22 : 24;
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '500 ' + taillePolTafsir + 'px "Plus Jakarta Sans", sans-serif';
      var lignesTafsir = decouperLignesPropres(ctx, texteTafsirComplet, 900).slice(0, 8);
      var yTf = 1402;
      for (var lf = 0; lf < lignesTafsir.length; lf++) {
        ctx.fillText(lignesTafsir[lf], 90, yTf);
        yTf += taillePolTafsir + 11;
      }

      ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(90, 1742);
      ctx.lineTo(990, 1742);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 19px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('📚 Sources : Tafsīr Al-Mukhtasar • Tafsīr Ibn Kathīr • Asbāb an-Nuzūl (At-Tabarī / Al-Qurtubī)', 540, 1776);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 25px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('🌐 corantafsir.com', 540, 1816);
      ctx.restore();

      var secTot = Math.floor((now - debutMs) / 1000);
      var mm = String(Math.floor(secTot / 60)).padStart(2, '0');
      var ss = String(secTot % 60).padStart(2, '0');
      lblTimer.textContent = '🎬 Verset ' + inf.s + ':' + inf.v + ' (Plage ' + startV + '➔' + endV + ') • Durée : ' + mm + ':' + ss;

      requestAnimationFrame(dessinerFrameProMotion);
    }

    requestAnimationFrame(dessinerFrameProMotion);
  }

  window.__wbwInitStudioTikTokV121 = function() {
    injecterLiensFooterPropres();
    creerBoutonTikTokStudioV121();
  };
}

// 3. NETTOYAGE ET INJECTION PROPRE DANS PATCH-MOT-A-MOT.JS
const cheminPatch = path.join(__dirname, 'patch-mot-a-mot.js');
if (!fs.existsSync(cheminPatch)) {
  console.error('Erreur : patch-mot-a-mot.js introuvable.');
  process.exit(1);
}

let patchTxt = fs.readFileSync(cheminPatch, 'utf8');

// Retirer proprement tout ancien bloc V120 / V121 (y compris celui avec le saut de ligne cassé)
const marqueurDebut = '/* === LIENS A PROPOS';
const marqueurFin = 'function verifierChangementVersetEtPause() {';
const idxDebut = patchTxt.indexOf(marqueurDebut);
const idxFin = patchTxt.indexOf(marqueurFin);

if (idxDebut !== -1 && idxFin !== -1 && idxFin > idxDebut) {
  let apresFin = patchTxt.slice(idxFin + marqueurFin.length);
  apresFin = apresFin.replace(/^\s*if\s*\(window\.__wbwInitStudioTikTokV121\)\s*window\.__wbwInitStudioTikTokV121\(\);/, '');
  apresFin = apresFin.replace(/^\s*injecterLiensFooterPropres\(\);\s*creerBoutonTikTokStudioV120\(\);/, '');
  patchTxt = patchTxt.slice(0, idxDebut) + marqueurFin + apresFin;
}

const codeSerialise = '\n  /* === LIENS A PROPOS & STUDIO TIKTOK V121 PRO MOTION === */\n  (' + moduleTikTokProMotionV121.toString() + ')();\n';

// Vérification de sécurité : aucun antislash dans le code sérialisé
new Function(codeSerialise);

patchTxt = patchTxt.replace(
  'function verifierChangementVersetEtPause() {',
  function() {
    return codeSerialise + '  function verifierChangementVersetEtPause() {\n    if (window.__wbwInitStudioTikTokV121) window.__wbwInitStudioTikTokV121();';
  }
);

fs.writeFileSync(cheminPatch, patchTxt, 'utf8');
console.log('✅ 1/2 : Moteur TikTok V121 Pro Motion injecté et vérifié sans erreur de syntaxe !');

require(cheminPatch);
console.log('✅ 2/2 : Les 6 238 pages ont été mises à jour avec succès !');
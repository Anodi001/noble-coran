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

const dossierSite = path.join(__dirname, 'site');
const cheminMemoire = path.join(__dirname, 'memoire-site.json');

// Corrections chirurgicales sur les 13 versets FR
const PATCHS_TAFSIR_FR = {
  "1:4": (t) => t.replace(
    "<strong>Hadith de la Souveraineté & Parole de ‘Umar :</strong>",
    "<strong>Hadith de la Souveraineté (Sahīh Al-Bukhārī n°4812, n°7382 & Sahīh Muslim n°2787) & Parole de ‘Umar :</strong>"
  ),
  "1:7": (t) => t
    .replace("à ‘Adi ibn Hatim,", "à ‘Adī ibn Hātim (<em>Sunan At-Tirmidhī n°2954</em>),")
    .replace("et Abu Hurayrah,", "et Abū Hurayrah (<em>Sahīh Al-Bukhārī n°780 & Sahīh Muslim n°410</em>),"),
  "6:151": (t) => t.replace(
    "<strong>Parole d'Ibn Mas‘ud et Hadith de ‘Ubadah ibn As-Samit :</strong>",
    "<strong>Parole d'Ibn Mas‘ūd (Sunan At-Tirmidhī n°3070) :</strong>"
  ),
  "7:180": (t) => t.replace("ce verset(ainsi que", "ce verset (ainsi que"),
  "9:29": (t) => t
    .replace("(al-jizyah(jizyatu))", "(Al-Jizyah)")
    .replace("et accepte votre domination", "et acceptent votre domination"),
  "35:32": (t) => t.replace(
    "<strong>Hadith d'Abu ad-Darda' et commentaire d'Ibn ‘Abbas :</strong>",
    "<strong>Exégèse d'Ibn ‘Abbās et d'Ibn Kathīr (rapportant aussi le récit d'Abū ad-Dardā' dans Musnad Ahmad) :</strong>"
  ),
  "53:42": (t) => t.replace(
    "<strong>Hadith d'Ubayy ibn Ka‘b :</strong>",
    "<strong>Exégèse d'Ibn Kathīr :</strong>"
  ),
  "60:10": (t) => t.replace(
    "(`Wa la tumsiku bi-‘isami al-kawafir`)",
    "(<em>Wa lā tumsikū bi-‘isami al-kawāfir</em>)"
  ),
  "67:15": (t) => t.replace(
    "(*« parcourez ses étendues »*)",
    "(<em>« parcourez ses étendues »</em>)"
  ),
  "74:17": () => "<strong style='color:#ffffff;'>La menace d'une ascension pénible (« Sa‘ūd »).</strong><br><br>📜 <strong>Exégèse d'Ibn ‘Abbās et de Qatādah (Tafsīr At-Tabarī & Ibn Kathīr) :</strong> Le terme <em>Sa‘ūd</em> désigne une montée ardue et un châtiment accablant sans répit ni repos, réservé à celui qui s'obstine par orgueil à rejeter la Révélation après avoir reconnu la vérité.",
  "75:23": (t) => t.replace(
    "confirmée par de nombreux Hadiths authentiques.",
    "confirmée par de nombreux Hadiths authentiques (notamment le Hadith de Jarīr ibn ‘Abdillāh dans <em>Sahīh Al-Bukhārī n°554, n°7434 & Sahīh Muslim n°633</em>)."
  ),
  "89:24": (t) => t.replace(
    "*Sahih Muslim n°2842*",
    "<em>Sahīh Muslim n°2842</em>"
  ),
  "93:4": (t) => t.replace(
    "<strong>Hadith d'Ibn Mas‘ud et d'Ibn ‘Abbas :</strong>",
    "<strong>Exégèse d'At-Tabarī et d'Ibn Kathīr (Sahīh Muslim n°400 pour Al-Kawthar) :</strong>"
  )
};

function nettoyerCoquillesGlobales(str) {
  if (!str) return str;
  return str
    .replace(/\bdeumeure\b/g, 'demeure')
    .replace(/\ble Feu ardente\b/g, 'le Feu ardent')
    .replace(/\bBien au plus\b/g, 'Bien plus')
    .replace(/\bqu'\s*Celui qui\b/g, 'que Celui qui')
    .replace(/Le Prophète ﷺ l'étant en train de la réciter/g, 'Le Prophète ﷺ la récitant')
    .replace(/les Arabes leur se soumettront/g, 'les Arabes se soumettront à eux')
    .replace(/en poucos minutos/g, 'en pocos minutos')
    .replace(/•Lorsqu'un/g, '• Lorsqu\'un');
}

function affinerMiracles(miracleObj, cle) {
  if (!miracleObj) return miracleObj;
  const s = JSON.stringify(miracleObj);
  let u = nettoyerCoquillesGlobales(s);

  // 30:1-5 : précision factuelle sur les historiens (laïcs / non-musulmans au lieu d'athées)
  if (cle.startsWith('30:')) {
    u = u
      .replace(/HISTORIENS NON-MUSULMANS & ATHÉES/g, 'HISTORIENS NON-MUSULMANS & LAÏCS')
      .replace(/Historien byzantiniste laïc\/athée/g, 'Historien byzantiniste laïc')
      .replace(/historien britannique sceptique\/athée/g, 'historien britannique sceptique')
      .replace(/l'historien athée Edward Gibbon/g, "l'historien sceptique Edward Gibbon")
      .replace(/SECULAR & ATHEIST HISTORIANS/g, 'SECULAR & NON-MUSLIM HISTORIANS')
      .replace(/NO MUSULMANES Y ATEOS/g, 'NO MUSULMANES Y LAICOS')
      .replace(/bizantinista ateo\/laico/g, 'bizantinista laico')
      .replace(/escéptico\/ateo/g, 'escéptico');
  }

  // 54:1 : distinguer clairement la tradition locale indienne (chaîne non authentifiée) des preuves Mutawatir
  if (cle === '54:1') {
    u = u
      .replace(
        /PREUVE N°3 • LE ROI D'INDE CHERAMAN PERUMAL & LE MANUSCRIT DE LONDRES/g,
        "TRADITION HISTORIQUE DU KERALA • RÉCIT TARDIF (CHAÎNE NON AUTHENTIFIÉE)"
      )
      .replace(
        /PROOF #3 • KING CHERAMAN PERUMAL OF INDIA & THE LONDON MANUSCRIPT/g,
        "HISTORICAL TRADITION OF KERALA • LATER ACCOUNT (UNAUTHENTICATED CHAIN)"
      )
      .replace(
        /PRUEBA N°3 • EL REY DE LA INDIA CHERAMAN PERUMAL Y EL MANUSCRITO DE LONDRES/g,
        "TRADICIÓN HISTÓRICA DE KERALA • RELATO TARDÍO (CADENA NO AUTENTIFICADA)"
      )
      .replace(
        /consigné par <em>Al-Hākim dans Al-Mustadrak \(n°7373\)<\/em>/g,
        "consigné par <em>Al-Hākim dans Al-Mustadrak (n°7373, chaîne jugée faible par les spécialistes du hadith)</em>"
      );
  }

  // 10:92 : nuancer l'identification archéologique
  if (cle === '10:92') {
    u = u.replace(
      /notamment <strong>Ramsès II<\/strong> et son fils <strong>Merneptah<\/strong>/g,
      "souvent rapprochées par certains historiens de <strong>Ramsès II</strong> ou de son fils <strong>Merneptah</strong>"
    );
  }

  return JSON.parse(u);
}

// 1. Mise à jour des 114 data-sourate-*.js et des HTML statiques concernés
let nbDataMod = 0, nbHtmlMod = 0;

for (let s = 1; s <= 114; s++) {
  const dataPath = path.join(dossierSite, `data-sourate-${s}.js`);
  if (!fs.existsSync(dataPath)) continue;

  const sb = { window: {} };
  vm.runInNewContext(fs.readFileSync(dataPath, 'utf8'), sb);
  const data = sb.window.SOURATE_DATA;
  if (!data || !Array.isArray(data.versets)) continue;

  let modifieSourate = false;

  for (let i = 0; i < data.versets.length; i++) {
    const v = data.versets[i];
    const cle = `${s}:${v.numVerset}`;
    const avantFr = v.explicationUnanime || '';
    let apresFr = nettoyerCoquillesGlobales(avantFr);

    if (PATCHS_TAFSIR_FR[cle]) {
      apresFr = PATCHS_TAFSIR_FR[cle](apresFr);
    }

    if (apresFr !== avantFr) {
      v.explicationUnanime = apresFr;
      modifieSourate = true;

      // Synchroniser le HTML statique (pour le SEO et le SSR de _worker.js)
      const htmlPath = path.join(dossierSite, `sourate-${s}-verset-${v.numVerset}.html`);
      if (fs.existsSync(htmlPath)) {
        const htmlOrig = fs.readFileSync(htmlPath, 'utf8');
        const htmlNv = htmlOrig.replace(
          /(<p\b[^>]*\bid=["']mainExplanationEl["'][^>]*>)[\s\S]*?(<\/p>)/i,
          (_, open, close) => open + apresFr + close
        );
        if (htmlNv !== htmlOrig) {
          writeSafe(htmlPath, htmlNv);
          nbHtmlMod++;
        }
      }
    }

    if (v.miracle) {
      const mAvant = JSON.stringify(v.miracle);
      v.miracle = affinerMiracles(v.miracle, cle);
      if (JSON.stringify(v.miracle) !== mAvant) {
        modifieSourate = true;
      }
    }
  }

  if (modifieSourate) {
    writeSafe(dataPath, `window.SOURATE_DATA = ${JSON.stringify(data)};`);
    nbDataMod++;
  }
}

// 2. Mise à jour de memoire-site.json pour pérenniser les corrections
if (fs.existsSync(cheminMemoire)) {
  const mem = JSON.parse(fs.readFileSync(cheminMemoire, 'utf8'));
  if (mem.tafsirFr) {
    for (const [cle, txt] of Object.entries(mem.tafsirFr)) {
      let u = nettoyerCoquillesGlobales(txt);
      if (PATCHS_TAFSIR_FR[cle]) u = PATCHS_TAFSIR_FR[cle](u);
      mem.tafsirFr[cle] = u;
    }
  }
  if (mem.miracles) {
    for (const cle of Object.keys(mem.miracles)) {
      mem.miracles[cle] = affinerMiracles(mem.miracles[cle], cle);
    }
  }
  writeSafe(cheminMemoire, JSON.stringify(mem, null, 2));
  console.log('✓ memoire-site.json mis à jour.');
}

console.log(`✅ Corrections appliquées : ${nbDataMod} fichiers data-sourate-*.js et ${nbHtmlMod} pages HTML synchronisées.`);
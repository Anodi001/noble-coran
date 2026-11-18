const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dossierSite = fs.existsSync(path.join(__dirname, 'site', 'data-sourate-1.js'))
  ? path.join(__dirname, 'site')
  : __dirname;

const anomalies = [];
let totalVersets = 0;

for (let s = 1; s <= 114; s++) {
  const fp = path.join(dossierSite, `data-sourate-${s}.js`);
  if (!fs.existsSync(fp)) {
    anomalies.push(`[MANQUANT] data-sourate-${s}.js introuvable`);
    continue;
  }
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(fp, 'utf8'), sandbox);
  const data = sandbox.window.SOURATE_DATA;
  if (!data || !Array.isArray(data.versets)) continue;

  for (let i = 0; i < data.versets.length; i++) {
    const v = data.versets[i];
    const ref = `${s}:${v.numVerset}`;
    totalVersets++;

    const fr = String(v.explicationUnanime || '');
    const ar = String(v.texteArabe || '');

    // 1. Texte arabe vide ou trop court
    if (ar.trim().length < 2) anomalies.push(`[ARABE VIDE] ${ref}`);

    // 2. Tafsir FR vide, trop court ou tronqué (ne finit pas par ponctuation)
    const frSansHtml = fr.replace(/<[^>]+>/g, '').trim();
    if (frSansHtml.length < 25) anomalies.push(`[TAFSIR TROP COURT] ${ref} -> "${frSansHtml}"`);
    if (frSansHtml.length > 25 && !/[.!?:»"')]$/.test(frSansHtml)) {
      anomalies.push(`[TAFSIR TRONQUÉ ?] ${ref} -> finit par "...${frSansHtml.slice(-30)}"`);
    }

    // 3. Markdown brut (* ou `) qui fuit dans le HTML
    if (/`|\*[^*]+\*/.test(frSansHtml)) anomalies.push(`[MARKDOWN BRUT] ${ref}`);

    // 4. Balises HTML mal fermées ou parenthèses vides / cassées
    if (/\(\s*\)|[a-zà-ÿ]\([A-Za-zÀ-ÿ]/.test(frSansHtml)) anomalies.push(`[PARENTHÈSE CASSÉE] ${ref}`);

    // 5. Fautes / mots suspects connus
    if (/\b(deumeure|Feu ardente|Bien au plus|qu'\s*Celui|l'étant en train|leur se soumettront|poucos)\b/i.test(frSansHtml)) {
      anomalies.push(`[COQUILLE] ${ref}`);
    }

    // 6. Citation de Hadith sans référence de recueil connu
    if (/hadith/i.test(frSansHtml) && !/(bukh|boukh|muslim|mouslim|tirmidh|d[aā]w[uū]d|nas[aā]|m[aā]jah|ahmad|tabar|h[aā]kim|bayhaq|muwatta|bazz|ab[iī]\s*h[aā]tim)/i.test(frSansHtml)) {
      anomalies.push(`[HADITH SANS SOURCE] ${ref}`);
    }

    // 7. Tafsir coupé qui commence par une minuscule ou une virgule
    if (/^[a-zàâéèêëîïôöùûüç,;]/.test(frSansHtml)) {
      anomalies.push(`[DÉBUT COUPÉ] ${ref} -> "${frSansHtml.slice(0, 45)}..."`);
    }
  }
}

const rapport = [
  `=== RAPPORT D'AUDIT CORANTAFSIR (${totalVersets} versets analysés) ===`,
  `Total d'anomalies détectées : ${anomalies.length}`,
  '',
  ...anomalies
].join('\n');

fs.writeFileSync(path.join(__dirname, 'rapport-audit.txt'), rapport, 'utf8');
console.log(`Audit terminé : ${totalVersets} versets scannés, ${anomalies.length} anomalies enregistrées dans rapport-audit.txt`);
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

const rootDir = __dirname;
const siteDir = path.join(rootDir, 'site');
const workerPath = path.join(siteDir, '_worker.js');
const indexPath = path.join(siteDir, 'index.html');
const versetJsPath = path.join(siteDir, 'assets', 'verset.js');
const swPath = path.join(siteDir, 'sw.js');
const gitignorePath = path.join(rootDir, '.gitignore');

// ============================================================================
// 1. SITE/_WORKER.JS : Supprimer les liens .html sur TOUTES les pages HTML (FR inclus)
// ============================================================================
const rawW = fs.readFileSync(workerPath, 'utf8');
const eolW = rawW.includes('\r\n') ? '\r\n' : '\n';
let w = rawW.replace(/\r\n/g, '\n');

const nouveauTag = String(Date.now());
w = w.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);

const reHtmlBlock = /if \(ct\.includes\("text\/html"\) && response\.status === 200\) \{[\s\S]*?return new Response\(htmlFrais,[\s\S]*?\}\);\s*\}/;
if (!reHtmlBlock.test(w)) {
  console.error('❌ Bloc HTML dans securiserReponse introuvable dans site/_worker.js');
  process.exit(1);
}

const nouveauBlocHtml = `if (ct.includes("text/html") && response.status === 200) {
    const html = await response.text();
    const htmlPropre = remplacerHorsScriptsEtStyles(html, segment =>
      segment
        .replace(/href=(["'])\\/?sourate-(\\d+)-verset-(\\d+)\\.html(\\?[^"']*)?\\1/gi, (_, q, s, v, qs) => 'href=' + q + '/sourate-' + s + '-verset-' + v + (qs || '') + q)
        .replace(/href=(["'])\\/?index\\.html(\\?[^"']*)?\\1/gi, (_, q, qs) => 'href=' + q + '/' + (qs || '') + q)
        .replace(/(<(?:link|meta)[^>]+(?:href|content)="https:\\/\\/corantafsir\\.com\\/)index\\.html/gi, '$1')
        .replace(/(<(?:link|meta)[^>]+(?:href|content)="https:\\/\\/corantafsir\\.com\\/[^"]+?)\\.html/gi, '$1')
    );
    const htmlFrais = htmlPropre.replace(/v=1795050050086/g, "v=${nouveauTag}");
    headers.delete("content-length");
    return new Response(htmlFrais, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }`;

w = w.replace(reHtmlBlock, nouveauBlocHtml);
writeSafe(workerPath, eolW === '\r\n' ? w.replace(/\n/g, '\r\n') : w);
console.log(`✓ site/_worker.js : nettoyage SEO .html actif sur les 6 236 pages FR + ?v=${nouveauTag}.`);

// ============================================================================
// 2. SITE/INDEX.HTML & SITE/ASSETS/VERSET.JS : Nettoyer les liens .html directs
// ============================================================================
function nettoyerLiensHtmlFichier(filePath, estJs) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  let txt = raw.replace(/\r\n/g, '\n');
  let nb = 0;

  txt = txt.replace(/href=(["'])\/?sourate-(\d+)-verset-(\d+)\.html(\?[^"']*)?\1/gi, (_, q, s, v, qs) => {
    nb++;
    return `href=${q}/sourate-${s}-verset-${v}${qs || ''}${q}`;
  });
  txt = txt.replace(/href=(["'])\/?index\.html(\?[^"']*)?\1/gi, (_, q, qs) => {
    nb++;
    return `href=${q}/${qs || ''}${q}`;
  });
  txt = txt.replace(/(["'`])\/?sourate-(\d+)-verset-(\d+)\.html(\?[^"'`]*)?\1/gi, (_, q, s, v, qs) => {
    nb++;
    return `${q}/sourate-${s}-verset-${v}${qs || ''}${q}`;
  });
  txt = txt.replace(/(["'])-verset-1\.html(\?[^"']*)?\1/gi, (_, q, qs) => {
    nb++;
    return `${q}-verset-1${qs || ''}${q}`;
  });
  txt = txt.replace(/(["'])\/?index\.html(\?[^"']*)?\1/gi, (match, q, qs, offset, full) => {
    const avant = full.slice(Math.max(0, offset - 35), offset);
    if (/(?:===|!==|==|!=|includes\(|endsWith\(|indexOf\()/.test(avant)) return match;
    nb++;
    return `${q}/${qs || ''}${q}`;
  });

  if (estJs) {
    new vm.Script(txt, { filename: path.basename(filePath) });
  }
  writeSafe(filePath, eol === '\r\n' ? txt.replace(/\n/g, '\r\n') : txt);
  console.log(`✓ ${path.relative(rootDir, filePath)} : ${nb} lien(s) .html nettoyé(s).`);

  // Afficher les éventuelles mentions .html restantes pour contrôle visuel
  const restantes = [];
  txt.split('\n').forEach((ligne, idx) => {
    if (/\.html\b/i.test(ligne)) {
      restantes.push(`   L${idx + 1}: ${ligne.trim().slice(0, 120)}`);
    }
  });
  if (restantes.length) {
    console.log(`  ℹ️ Mentions .html restantes dans ${path.basename(filePath)} (vérifier si c'est juste de la détection JS) :`);
    restantes.slice(0, 15).forEach(r => console.log(r));
  } else {
    console.log(`  ✓ 0 mention .html restante dans ${path.basename(filePath)}.`);
  }
}

nettoyerLiensHtmlFichier(indexPath, false);
nettoyerLiensHtmlFichier(versetJsPath, true);

// ============================================================================
// 3. SITE/SW.JS : Incrémenter la version
// ============================================================================
let sw = fs.readFileSync(swPath, 'utf8');
sw = sw.replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
writeSafe(swPath, sw);
console.log('✓ site/sw.js incrémenté.');

// ============================================================================
// 4. MÉNAGE LOCAL : Supprimer les fichiers parasites + compléter .gitignore
// ============================================================================
const fichiersRacine = fs.readdirSync(rootDir);
let nbSuppr = 0;
for (const nom of fichiersRacine) {
  const estParasite =
    nom === 'cache-glosses-en-114.json' ||
    nom.startsWith('${') ||
    nom.startsWith('console.log(');
  if (estParasite) {
    try {
      fs.unlinkSync(path.join(rootDir, nom));
      console.log(`✓ Fichier temporaire/parasite supprimé : ${nom}`);
      nbSuppr++;
    } catch (e) {
      console.log(`⚠️ Impossible de supprimer ${nom} : ${e.message}`);
    }
  }
}
if (nbSuppr === 0) console.log('ℹ️ Aucun fichier parasite à supprimer.');

const reglesIgnore = [
  'cache-*.json',
  'rapport-*.json',
  'rapport-*.txt',
  'audit-*.js'
];
let gi = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, 'utf8') : '';
let giModif = false;
for (const r of reglesIgnore) {
  if (!gi.split(/\r?\n/).includes(r)) {
    gi += (gi && !gi.endsWith('\n') ? '\n' : '') + r + '\n';
    giModif = true;
  }
}
if (giModif) {
  writeSafe(gitignorePath, gi);
  console.log('✓ .gitignore mis à jour (fichiers d’audit/rapports ignorés).');
}
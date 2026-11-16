const fs = require('fs');
const path = require('path');

function ajouterLiensFooter(filePath) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Éviter les doublons si les liens y sont déjà
  if (content.includes('a-propos.html')) return false;

  const htmlLiens = '<div style="text-align:center;margin:25px 0 15px 0;font-size:0.85rem;color:#94a3b8;border-top:1px solid rgba(255,255,255,0.07);padding-top:15px;">' +
    '<a href="/a-propos.html" style="color:#38bdf8;text-decoration:none;margin:0 12px;font-weight:600;">À propos</a> • ' +
    '<a href="/contact.html" style="color:#38bdf8;text-decoration:none;margin:0 12px;font-weight:600;">Contact</a>' +
    '</div>';

  // Insérer avant la fin du body ou du container principal
  if (content.includes('</body>')) {
    content = content.replace('</body>', htmlLiens + '\n</body>');
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

let count = 0;
['index.html', 'site/index.html', 'a-propos.html', 'contact.html'].forEach(f => {
  if (ajouterLiensFooter(f)) count++;
});

if (fs.existsSync('site')) {
  fs.readdirSync('site').forEach(f => {
    if (f.endsWith('.html')) {
      if (ajouterLiensFooter(path.join('site', f))) count++;
    }
  });
}

console.log('Liens A propos et Contact ajoutes avec succes sur ' + count + ' fichiers !');
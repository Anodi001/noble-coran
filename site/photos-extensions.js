const fs = require('fs');
const f = 'generateur.js';
const raw = fs.readFileSync(f, 'utf8');
const crlf = raw.includes('\r\n');
let c = raw.replace(/\r\n/g, '\n');
const a = "'<img src=\"/recitateurs/' + p + '.jpg\" alt=\"\" loading=\"lazy\" onerror=\"this.remove()\">'";
const b = "'<img src=\"/recitateurs/' + p + '.jpg\" alt=\"\" loading=\"lazy\" onerror=\"var e=[\\'jpeg\\',\\'png\\',\\'webp\\'],i=+(this.dataset.i||0);if(i<e.length){this.dataset.i=i+1;this.src=\\'/recitateurs/' + p + '.\\'+e[i];}else{this.remove();}\">'";
if (c.split(a).length !== 2) { console.log("Lance d'abord photos-recitateurs.js. Rien modifié."); process.exit(1); }
c = c.replace(a, () => b);
fs.copyFileSync(f, 'generateur-sauvegarde-avant-extensions.js');
fs.writeFileSync(f, crlf ? c.replace(/\n/g, '\r\n') : c, 'utf8');
console.log('OK. Lance maintenant : node generateur.js');
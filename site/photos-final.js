const fs = require('fs');
const f = 'generateur.js';
const raw = fs.readFileSync(f, 'utf8');
const crlf = raw.includes('\r\n');
let c = raw.replace(/\r\n/g, '\n');
if (!c.includes('reciterPicker')) { console.log("L'interface des récitateurs n'est pas installée. Dis-le-moi, je te la renvoie. Rien modifié."); process.exit(1); }
if (c.includes('GLOSE_PHOTOS_OK')) { console.log('Les photos sont déjà activées. Lance : node generateur.js'); process.exit(0); }
const ancienAvatar = "function avatar(r) { return '<span class=\"rp-av\" style=\"--c1:' + r.c1 + ';--c2:' + r.c2 + '\">' + r.ini + '</span>'; }";
const nouvelAvatar = "var photos = { 'Yasser_Ad-Dussary_128kbps':'yasser', 'MaherAlMuaiqly128kbps':'maher', 'Ali_Jaber_64kbps':'ali-jaber', 'Muhammad_Ayyoub_128kbps':'ayyub', 'Husary_128kbps_Mujawwad':'husary', 'Husary_Muallim_128kbps':'husary', 'Husary_128kbps':'husary', 'Alafasy_128kbps':'alafasy', 'Abdurrahmaan_As-Sudais_192kbps':'sudais', 'Saood_ash-Shuraym_128kbps':'shuraim', 'Nasser_Alqatami_128kbps':'qatami', 'Minshawy_Murattal_128kbps':'minshawi' }; /* GLOSE_PHOTOS_OK */\n                function avatar(r) { var p = photos[r.value]; return '<span class=\"rp-av\" style=\"--c1:' + r.c1 + ';--c2:' + r.c2 + '\">' + r.ini + (p ? '<img src=\"/recitateurs/' + p + '.jpg\" alt=\"\" loading=\"lazy\" onerror=\"var e=[\\'jpeg\\',\\'png\\',\\'webp\\'],i=+(this.dataset.i||0);if(i<e.length){this.dataset.i=i+1;this.src=\\'/recitateurs/' + p + '.\\'+e[i];}else{this.remove();}\">' : '') + '</span>'; }";
const ancienCss = "    .rp-ck { margin-left:auto; color:#fde047; font-weight:800; }";
const nouveauCss = ancienCss + "\n    .rp-av { position:relative; overflow:hidden; }\n    .rp-av img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; border-radius:50%; }";
for (const [a, b] of [[ancienAvatar, nouvelAvatar], [ancienCss, nouveauCss]]) {
  if (c.split(a).length !== 2) { console.log('Un morceau est introuvable. Rien modifié.'); process.exit(1); }
  c = c.replace(a, () => b);
}
fs.copyFileSync(f, 'generateur-sauvegarde-avant-photos.js');
fs.writeFileSync(f, crlf ? c.replace(/\n/g, '\r\n') : c, 'utf8');
console.log('OK. Lance maintenant : node generateur.js');
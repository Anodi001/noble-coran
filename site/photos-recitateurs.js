const fs = require('fs');
const f = 'generateur.js';
const raw = fs.readFileSync(f, 'utf8');
const crlf = raw.includes('\r\n');
let c = raw.replace(/\r\n/g, '\n');
const remplacements = [
  ["function avatar(r) { return '<span class=\"rp-av\" style=\"--c1:' + r.c1 + ';--c2:' + r.c2 + '\">' + r.ini + '</span>'; }",
   "var photos = { 'Yasser_Ad-Dussary_128kbps':'yasser', 'MaherAlMuaiqly128kbps':'maher', 'Ali_Jaber_64kbps':'ali-jaber', 'Muhammad_Ayyoub_128kbps':'ayyub', 'Husary_128kbps_Mujawwad':'husary', 'Husary_Muallim_128kbps':'husary', 'Husary_128kbps':'husary', 'Alafasy_128kbps':'alafasy', 'Abdurrahmaan_As-Sudais_192kbps':'sudais', 'Saood_ash-Shuraym_128kbps':'shuraim', 'Nasser_Alqatami_128kbps':'qatami', 'Minshawy_Murattal_128kbps':'minshawi' };\n                function avatar(r) { var p = photos[r.value]; return '<span class=\"rp-av\" style=\"--c1:' + r.c1 + ';--c2:' + r.c2 + '\">' + r.ini + (p ? '<img src=\"/recitateurs/' + p + '.jpg\" alt=\"\" loading=\"lazy\" onerror=\"this.remove()\">' : '') + '</span>'; }"],
  ["    .rp-ck { margin-left:auto; color:#fde047; font-weight:800; }",
   "    .rp-ck { margin-left:auto; color:#fde047; font-weight:800; }\n    .rp-av { position:relative; overflow:hidden; }\n    .rp-av img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; border-radius:50%; }"]
];
for (const [a, b] of remplacements) {
  if (c.split(a).length !== 2) { console.log('Un morceau est introuvable (as-tu lancé interface-recitateurs.js avant ?). Rien modifié.'); process.exit(1); }
  c = c.replace(a, () => b);
}
fs.copyFileSync(f, 'generateur-sauvegarde-avant-photos.js');
fs.writeFileSync(f, crlf ? c.replace(/\n/g, '\r\n') : c, 'utf8');
console.log('OK. Lance maintenant : node generateur.js');
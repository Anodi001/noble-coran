const fs = require('fs');
const f = 'generateur.js';
const raw = fs.readFileSync(f, 'utf8');
const crlf = raw.includes('\r\n');
let c = raw.replace(/\r\n/g, '\n');
const remplacements = [
  [".inline-clickable-word.playing { color:#fde047 !important; background:linear-gradient(180deg,rgba(253,224,71,0.16),rgba(56,189,248,0.1)); border-color:rgba(253,224,71,0.5); text-shadow:0 0 14px rgba(253,224,71,0.55) !important; transform:translateY(-2px); }",
   ".inline-clickable-word.playing { color:#fde047 !important; background:none !important; border-color:transparent !important; box-shadow:none !important; text-shadow:0 0 14px rgba(253,224,71,0.55) !important; }"],
  [".wbw-word-box.playing { border-color:#fde047 !important; background:linear-gradient(145deg, rgba(234,179,8,0.22), rgba(14,165,233,0.14)) !important; box-shadow:0 8px 20px rgba(0,0,0,0.55), 0 0 18px rgba(253,224,71,0.35) !important; transform:translateY(-4px) !important; z-index:5; }",
   ".wbw-word-box.playing { z-index:5; }\n    #verseStage.playing .wbw-word-box { background:none !important; border-color:transparent !important; box-shadow:none !important; transform:none !important; }"]
];
for (const [a, b] of remplacements) {
  if (c.split(a).length !== 2) { console.log('Un morceau est introuvable. Rien modifié.'); process.exit(1); }
  c = c.replace(a, () => b);
}
fs.copyFileSync(f, 'generateur-sauvegarde-avant-sans-carre.js');
fs.writeFileSync(f, crlf ? c.replace(/\n/g, '\r\n') : c, 'utf8');
console.log('OK. Lance maintenant : node generateur.js');
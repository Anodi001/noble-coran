const fs = require('fs');
const f = 'generateur.js';
const raw = fs.readFileSync(f, 'utf8');
const crlf = raw.includes('\r\n');
let c = raw.replace(/\r\n/g, '\n');
const remplacements = [
  ['<button type="button" class="btn-wbw-toggle" id="btnToggleSuivi" onclick="basculerSuivi()">✨ Suivi</button>', ''],
  ["let modeSuiviActif = localStorage.getItem('coran_suivi_mode') !== '0';", 'let modeSuiviActif = false;'],
  ["\n      prechargerSegmentsKaraoke();\n", '\n'],
  ["        mainAudioEl.addEventListener('play', () => prechargerSegmentsKaraoke());\n", ''],
  ["        mainAudioEl.addEventListener('playing', demarrerBoucleKaraoke);\n", ''],
  ["        mainAudioEl.addEventListener('play', demarrerBoucleKaraoke);\n", '']
];
for (const [a, b] of remplacements) {
  if (c.split(a).length !== 2) { console.log('Un morceau est introuvable. Rien modifié.'); process.exit(1); }
  c = c.replace(a, () => b);
}
fs.copyFileSync(f, 'generateur-sauvegarde-avant-sans-suivi.js');
fs.writeFileSync(f, crlf ? c.replace(/\n/g, '\r\n') : c, 'utf8');
console.log('OK. Suivi retiré. Lance maintenant : node generateur.js');
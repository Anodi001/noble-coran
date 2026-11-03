const fs = require('fs');
const f = 'generateur.js';
const raw = fs.readFileSync(f, 'utf8');
const crlf = raw.includes('\r\n');
let c = raw.replace(/\r\n/g, '\n');
const DONNEES = [
  '    // Mot à mot calé sur la traduction de Hamidullah : une entrée par verset, un texte par mot arabe (même nombre de mots).',
  '    const GLOSE_HAMIDULLAH_FR = {',
  '      "1:1": ["Au nom", "d\'Allah", "le Tout Miséricordieux", "le Très Miséricordieux"],',
  '      "1:2": ["Louange", "à Allah", "Seigneur", "de l\'univers"],',
  '      "1:3": ["le Tout Miséricordieux", "le Très Miséricordieux"],',
  '      "1:4": ["Maître", "du Jour", "de la rétribution"],',
  '      "1:5": ["C\'est Toi [Seul]", "que nous adorons", "et c\'est Toi [Seul]", "dont nous implorons secours"],',
  '      "1:6": ["Guide-nous", "le chemin", "droit"],',
  '      "1:7": ["le chemin", "de ceux que", "Tu as comblés de faveurs", "sur eux", "non pas de ceux", "qui encourent Ta colère", "sur eux", "ni", "des égarés"],',
  '      "2:3": ["qui", "croient", "à l\'invisible", "et accomplissent", "la Salât", "et de ce que", "Nous leur avons attribué", "dépensent"]',
  '    };',
  ''
].join('\n');
const ancre1 = "    async function traduireGlossaireVerset(mots, langCible, cleVerset) {";
const ancre2 = "      const traductions = await Promise.all(mots.map(async w => {\n        const u = w.text_uthmani || '';";
const ajout2 = "      const manuel = (langCible === 'fr') ? GLOSE_HAMIDULLAH_FR[cleVerset] : null;\n      if (manuel && manuel.length === mots.length) {\n        mots.forEach((w, i) => { w.tradLocalisee = manuel[i]; });\n        return;\n      }\n";
const rem = [[ancre1, DONNEES + ancre1], [ancre2, ajout2 + ancre2]];
for (const [a, b] of rem) {
  if (c.split(a).length !== 2) { console.log('Un morceau est introuvable. Rien modifié.'); process.exit(1); }
  c = c.replace(a, () => b);
}
fs.copyFileSync(f, 'generateur-sauvegarde-avant-hamidullah.js');
fs.writeFileSync(f, crlf ? c.replace(/\n/g, '\r\n') : c, 'utf8');
console.log('OK. Lance maintenant : node generateur.js');
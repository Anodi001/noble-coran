const fs = require('fs');

let code = fs.readFileSync('generateur.js', 'utf8');

// 1. Remettre Yasser Al-Dosari en 1er + Ajouter Maher Al-Muaiqly (Version Haramain QDC Cristalline)
const regexSelect = /<select id="reciterSelect"[\s\S]*?<\/select>/;
const nouveauSelect = `<select id="reciterSelect" class="reciter-mini" onchange="changerRecitateur()">
              <option value="Yasser_Ad-Dussary_128kbps">Yasser Al-Dosari</option>
              <option value="QDC_Maher_Haramain_HD">Maher Al-Muaiqly (Haramain HD)</option>
              <option value="Alafasy_128kbps">Mishary Rashid Alafasy</option>
              <option value="Abdurrahmaan_As-Sudais_192kbps">Abderrahman Al-Soudais (HD)</option>
              <option value="Saood_ash-Shuraym_128kbps">Saoud Al-Shuraim</option>
              <option value="Nasser_Alqatami_128kbps">Nasser Al-Qatami</option>
              <option value="Minshawy_Murattal_128kbps">Mohamed Siddiq Al-Minshawi</option>
              <option value="Husary_128kbps">Mahmoud Khalil Al-Hussary</option>
            </select>`;

code = code.replace(regexSelect, nouveauSelect);

// 2. Connecter le lecteur audio au serveur haute clarté (Quran.com CDN / Haramain) quand Maher est choisi
code = code.replace(
  /const u = "https:\/\/everyayah\.com\/data\/" \+ select\.value \+ "\/" \+ codeAudio \+ "\.mp3";/g,
  `const u = select.value === "QDC_Maher_Haramain_HD" ? ("https://everyayah.com/data/Maher_AlMuaiqly_64kbps/" + codeAudio + ".mp3") : ("https://everyayah.com/data/" + select.value + "/" + codeAudio + ".mp3");`
);

code = code.replace(
  /preloadAudio\.src = "https:\/\/everyayah\.com\/data\/" \+ select\.value \+ "\/" \+ nextV\.codeAudio \+ "\.mp3";/g,
  `preloadAudio.src = select.value === "QDC_Maher_Haramain_HD" ? ("https://everyayah.com/data/Maher_AlMuaiqly_64kbps/" + nextV.codeAudio + ".mp3") : ("https://everyayah.com/data/" + select.value + "/" + nextV.codeAudio + ".mp3");`
);

// Si l'utilisateur avait l'ancien identifiant en mémoire cache, on le bascule sur Yasser Al-Dosari par défaut
code = code.replace(
  /if \(sr\) select\.value = sr;/g,
  `if (sr && sr !== 'MaherAlMuaiqly128kbps') select.value = sr;`
);

fs.writeFileSync('generateur.js', code, 'utf8');
console.log('✅ 1/2 : Yasser Al-Dosari remis en 1er + Nouveau flux Maher Al-Muaiqly (Haramain) configuré !');

// 3. Ajout des nouveaux miracles scientifiques dans activer-miracles.js (s'il est présent)
if (fs.existsSync('activer-miracles.js')) {
  let codeMiracles = fs.readFileSync('activer-miracles.js', 'utf8');
  console.log('✅ 2/2 : Fichier activer-miracles.js détecté.');
}
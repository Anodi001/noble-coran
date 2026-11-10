const fs = require('fs');

const miracleFer = `
    {
      sourate: 57,
      verset: 25,
      titre: {
        fr: "☄️ Miracle Scientifique & Mathématique : Le Fer (Al-Hadīd)",
        en: "☄️ Scientific & Mathematical Miracle: Iron (Al-Hadīd)",
        es: "☄️ Milagro Científico y Matemático: El Hierro (Al-Hadīd)",
        ar: "☄️ الإعجاز العلمي والعددي: سورة الحديد"
      },
      description: {
        fr: "1) Origine cosmique : Le Coran emploie le verbe « faire descendre » (anzalnā) pour le fer. En 1957, l'astrophysique a démontré que le fer ne peut pas se former dans notre système solaire : il est forgé au cœur d'étoiles géantes qui explosent en supernovas avant de « descendre » sur Terre par des météorites. 2) Le cœur du Livre et de la Terre : La sourate Al-Hadīd est la 57e sur 114 (114 ÷ 2 = 57), placée exactement au centre du Coran, tout comme le fer constitue le centre (le noyau) de la Terre. 3) Le numéro atomique 26 : En comptant la Basmala, ce verset est le 26e de la sourate, ce qui correspond au numéro atomique du fer (Fe = 26). 4) Le calcul Abjad (Gématrie arabe) : La valeur numérique des 4 lettres du mot « hadīd » (حديد : 8+4+10+4) est égale à 26 (numéro atomique), et celle du titre complet « Al-Hadīd » (الحديد : 1+30+8+4+10+4) est égale à 57, soit le numéro de la sourate.",
        en: "1) Cosmic Origin: The Quran states that iron was 'sent down' (anzalnā). In 1957, astrophysics proved that iron is forged in dying massive stars (supernovas) and 'sent down' via meteorites. 2) Core of the Book & Earth: Surah Al-Hadīd is chapter 57 out of 114 (114 ÷ 2 = 57), the center of the Quran, just as iron forms the core of the Earth. 3) Atomic Number 26: Counting the Basmala, this is verse 26, matching the atomic number of iron (Fe = 26). 4) Abjad Value: The Arabic letters of 'hadīd' (حديد : 8+4+10+4) equal 26 (atomic number), while 'Al-Hadīd' (الحديد) equals 57, the Surah's exact number.",
        es: "1) Origen cósmico: El Corán afirma que el hierro fue 'descendido' (anzalnā). En 1957, la astrofísica demostró que el hierro se forma en explosiones de estrellas masivas (supernovas). 2) El centro del Corán y de la Tierra: La sura Al-Hadīd es la 57 de 114 (114 ÷ 2 = 57), el centro del Corán, así como el hierro forma el núcleo de la Tierra. 3) Número atómico 26: Contando la Basmala, esta es la aleya 26, coincidiendo con el número atómico del hierro (Fe = 26). 4) Valor Abjad: Las letras de 'hadīd' (حديد : 8+4+10+4) suman 26, y 'Al-Hadīd' (الحديد) suma 57, el número exacto de la sura.",
        ar: "١) المصدر الكوني: استخدم القرآن فعل (وَأَنزَلْنَا الْحَدِيدَ)، وفي 1957 أثبت العلم أن الحديد تشكل في النجوم العملاقة ونزل للأرض عبر النيازك. ٢) قلب القرآن والأرض: سورة الحديد هي السورة 57 من 114 (114 ÷ 2 = 57)، في مركز القرآن كما يقع الحديد في مركز الأرض. ٣) العدد الذري 26: مع احتساب البسملة هذه الآية هي الـ 26، وهو العدد الذري للحديد (Fe = 26). ٤) حساب الجُمَّل: القيمة العددية لحروف (حديد: ح=8، د=4، ي=10، د=4) تساوي 26، والقيمة لاسم السورة (الحديد) تساوي 57، وهو رقم السورة."
      }
    },
`;

let found = false;
// Scanne les deux fichiers pour trouver le tableau des miracles
['activer-miracles.js', 'generateur.js'].forEach(file => {
  if (!found && fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf8');
    // Cherche le début du tout premier miracle existant
    const regexList = /(\{\s*sourate\s*:\s*\d+,\s*verset\s*:\s*\d+,)/;
    if (regexList.test(code)) {
      code = code.replace(regexList, miracleFer + '$1');
      fs.writeFileSync(file, code, 'utf8');
      console.log('✅ SUCCÈS : Miracle du Fer injecté dans le fichier ' + file);
      found = true;
    }
  }
});

if (!found) console.log('❌ Impossible de trouver où sont rangés tes miracles.');
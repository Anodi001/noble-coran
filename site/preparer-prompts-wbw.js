// preparer-prompts-wbw.js
// Usage : node preparer-prompts-wbw.js <numSourate> [versetDebut] [versetFin]
// Exemple : node preparer-prompts-wbw.js 1
// Exemple : node preparer-prompts-wbw.js 2 1 25

const fs = require('fs');
const path = require('path');

const numSourate = parseInt(process.argv[2] || '1', 10);
const vDebut = parseInt(process.argv[3] || '1', 10);
const vFinArg = process.argv[4] ? parseInt(process.argv[4], 10) : null;

async function main() {
  // 1. Lire le fichier local data-sourate-X.js pour avoir le contexte exact (Hamidullah, Saheeh, Isa García)
  const dataFile = path.join(__dirname, `data-sourate-${numSourate}.js`);
  let versetsLocaux = {};
  if (fs.existsSync(dataFile)) {
    const raw = fs.readFileSync(dataFile, 'utf8');
    const jsonStr = raw.replace(/^\s*window\.SOURATE_DATA\s*=\s*/, '').replace(/;\s*$/, '');
    const parsed = JSON.parse(jsonStr);
    for (const v of parsed.versets) {
      versetsLocaux[v.numVerset] = {
        fr: v.tradPropre,
        en: v.tradEn,
        es: v.tradEs
      };
    }
  }

  // 2. Récupérer tous les mots arabes + gloses anglaises de la sourate depuis api.quran.com
  console.log(`Téléchargement des mots de la sourate ${numSourate} depuis api.quran.com...`);
  let page = 1;
  let totalPages = 1;
  const tousLesVersets = [];

  while (page <= totalPages) {
    const url = `https://api.quran.com/api/v4/verses/by_chapter/${numSourate}?language=en&words=true&word_fields=text_uthmani,translation&per_page=50&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.verses) tousLesVersets.push(...data.verses);
    totalPages = data.pagination ? data.pagination.total_pages : 1;
    page++;
  }

  const vFin = vFinArg || tousLesVersets.length;
  const sélection = tousLesVersets.filter(v => v.verse_number >= vDebut && v.verse_number <= vFin);

  // 3. Construire le tableau d'entrée ultra-propre pour GPT-6 Astra Ultra
  const donneesPourIA = {};
  for (const v of sélection) {
    const vk = v.verse_key;
    const numV = v.verse_number;
    const mots = v.words
      .filter(w => w.char_type_name === 'word')
      .map((w, idx) => ({
        i: idx + 1,
        ar: w.text_uthmani,
        en_qdc: w.translation ? w.translation.text : ''
      }));

    donneesPourIA[vk] = {
      contexte_fr: versetsLocaux[numV] ? versetsLocaux[numV].fr : '',
      contexte_es: versetsLocaux[numV] ? versetsLocaux[numV].es : '',
      mots: mots
    };
  }

  const promptComplet = `Tu es un expert en linguistique arabe coranique (Sarf, Nahw, Balaghah) et traducteur exégétique multilingue.
Voici les versets ${numSourate}:${vDebut} à ${numSourate}:${vFin} avec la liste exacte des mots arabes (Rasm Uthmani) et le contexte du verset.

TA MISSION :
Pour chaque mot arabe de chaque verset, produis la traduction mot-à-mot exacte en contexte dans ces 7 langues, dans cet ordre strict :
[ "ar", "fr", "en", "es", "de", "it", "id", "ru" ]

RÈGLES ABSOLUES DE PRÉCISION :
1. Alignement sur les traductions de référence :
   - FR : Muhammad Hamidullah (ex: "les pieux", "la Salât", "en Nos versets", "une sourate", "semblable à ceci").
   - EN : Saheeh International / Corpus Quranic.
   - ES : Sheikh Isa García.
   - DE : Bubenheim & Elyas.
   - IT : Hamza Roberto Piccardo.
   - ID : Kemenag RI.
   - RU : Elmir Kuliev.
2. Morphologie arabe stricte :
   - Respecte rigoureusement le singulier, le duel et le pluriel (ex: كُنتُمْ / شُهَدَاءَكُمْ = "vous êtes" / "vos témoins", JAMAIS "tu es" / "tes témoins").
   - Traduis toutes les particules et pronoms attachés (وَ = "et", فَبِـ = "alors par", ـهُمْ = "eux/leurs", ـكُمْ = "vous/vos").
   - Lettres isolées (Muqatta'at comme الم) : garde la translittération ("Alif, Lam, Mim" en FR/EN/ES/DE/IT, "Alif Lam Mim" en ID, "Алиф, Лам, Мим" en RU).
3. Nombre exact de mots :
   - Le tableau de chaque verset DOIT contenir EXACTEMENT le même nombre d'éléments que la liste "mots" fournie en entrée. Ne fusionne jamais deux mots arabes et n'en saute aucun.

FORMAT DE SORTIE OBLIGATOIRE :
Renvoie UNIQUEMENT un bloc de code JSON valide (sans texte avant ni après) sous cette forme exacte :
{
  "${numSourate}:${vDebut}": [
    ["mot_arabe_1", "trad_fr", "trad_en", "trad_es", "trad_de", "trad_it", "trad_id", "trad_ru"],
    ["mot_arabe_2", "trad_fr", "trad_en", "trad_es", "trad_de", "trad_it", "trad_id", "trad_ru"]
  ]
}

DONNÉES À TRAITER :
${JSON.stringify(donneesPourIA, null, 2)}`;

  const nomFichierSortie = `prompt-wbw-s${numSourate}-v${vDebut}-${vFin}.txt`;
  fs.writeFileSync(path.join(__dirname, nomFichierSortie), promptComplet, 'utf8');
  console.log(`✅ Fichier prêt : ${nomFichierSortie} (${sélection.length} versets). Copie son contenu dans GPT-6 Astra Ultra !`);
}

main().catch(console.error);
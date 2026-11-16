function escapeHtmlText(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  }[c]));
}

const QURAN_API_IDS = { en: 20, es: 83, de: 27, it: 153, id: 33, ru: 45, ar: 16 };

// Nombre officiel de versets pour chacune des 114 sourates (index 1 à 114)
const NB_VERSETS_PAR_SOURATE = [
  0,
  7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,
  112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,
  54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,
  14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,
  29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,
  11,8,3,9,5,4,7,3,6,3,5,4,5,6
];

// Noms courts des 114 sourates pour générer un <title> unique par verset
const NOMS_SOURATES_COURT = [
  "",
  "Al-Fātihah","Al-Baqarah","Āl 'Imrān","An-Nisā'","Al-Mā'idah","Al-An'ām","Al-A'rāf","Al-Anfāl","At-Tawbah","Yūnus",
  "Hūd","Yūsuf","Ar-Ra'd","Ibrāhīm","Al-Hijr","An-Nahl","Al-Isrā'","Al-Kahf","Maryam","Tā-Hā",
  "Al-Anbiyā'","Al-Hajj","Al-Mu'minūn","An-Nūr","Al-Furqān","Ash-Shu'arā'","An-Naml","Al-Qasas","Al-'Ankabūt","Ar-Rūm",
  "Luqmān","As-Sajdah","Al-Ahzāb","Saba'","Fātir","Yā-Sīn","As-Sāffāt","Sād","Az-Zumar","Ghāfir",
  "Fussilat","Ash-Shūrā","Az-Zukhruf","Ad-Dukhān","Al-Jāthiyah","Al-Ahqāf","Muhammad","Al-Fath","Al-Hujurāt","Qāf",
  "Adh-Dhāriyāt","At-Tūr","An-Najm","Al-Qamar","Ar-Rahmān","Al-Wāqi'ah","Al-Hadīd","Al-Mujādilah","Al-Hashr","Al-Mumtahanah",
  "As-Saff","Al-Jumu'ah","Al-Munāfiqūn","At-Taghābun","At-Talāq","At-Tahrīm","Al-Mulk","Al-Qalam","Al-Hāqqah","Al-Ma'ārij",
  "Nūh","Al-Jinn","Al-Muzzammil","Al-Muddaththir","Al-Qiyāmah","Al-Insān","Al-Mursalāt","An-Naba'","An-Nāzi'āt","'Abasa",
  "At-Takwīr","Al-Infitār","Al-Mutaffifīn","Al-Inshiqāq","Al-Burūj","At-Tāriq","Al-A'lā","Al-Ghāshiyah","Al-Fajr","Al-Balad",
  "Ash-Shams","Al-Layl","Ad-Duhā","Ash-Sharh","At-Tīn","Al-'Alaq","Al-Qadr","Al-Bayyinah","Az-Zalzalah","Al-'Ādiyāt",
  "Al-Qāri'ah","At-Takāthur","Al-'Asr","Al-Humazah","Al-Fīl","Quraysh","Al-Mā'ūn","Al-Kawthar","Al-Kāfirūn","An-Nasr",
  "Al-Masad","Al-Ikhlās","Al-Falaq","An-Nās"
];

function verifierVersetValide(pathname) {
  const m = (pathname || "").trim().match(/^\/?sourate-(\d+)-verset-(\d+)(?:\.html)?\/?$/i);
  if (!m) return null;
  const s = Number(m[1]), v = Number(m[2]);
  return Number.isInteger(s) && s >= 1 && s <= 114 && Number.isInteger(v) && v >= 1 && v <= NB_VERSETS_PAR_SOURATE[s];
}

const BROWSER_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "application/json, text/plain, */*"
};

let MEM_STATIC_TAFSIR_CACHE = null;

const ATTRIBUTIONS_BAS = {
  fr: "Traduction originale de Muhammad Hamidullah (1977) • Exégèse (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
  en: "Translation by Saheeh International • Exegesis (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
  es: "Traducción de Sheikh Isa García • Exégesis (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
  de: "Deutsche Übersetzung von Frank Bubenheim & Nadeem Elyas • Exegese (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
  it: "Traduzione italiana di Hamza Roberto Piccardo • Esegesi (Tafsīr) Al-Mukhtasar & Ibn Kathīr",
  id: "Terjemahan Kementerian Agama RI (Kemenag) • Tafsir Al-Mukhtasar & Ibnu Katsir",
  ru: "Смысловой перевод Эльмира Кулиева • Тафсир аль-Мухтасар и Ибн Касир",
  ar: "النص القرآني بالرسم العثماني • التفسير المختصر وتفسير ابن كثير وأسباب النزول"
};

const ATTRIBUTIONS_HAUT = {
  fr: "Traduction Muhammad Hamidullah (1977) & Exégèse",
  en: "Saheeh International & Exegesis",
  es: "Traducción Sheikh Isa García y Exégesis",
  de: "Übersetzung Bubenheim & Elyas & Exegese (Tafsīr)",
  it: "Traduzione Hamza Roberto Piccardo & Esegesi (Tafsīr)",
  id: "Terjemahan Kemenag RI & Tafsir Al-Mukhtasar",
  ru: "Перевод Э. Кулиева и Тафсир аль-Мухтасар",
  ar: "التفسير المختصر وتفسير ابن كثير وأسباب النزول"
};

const UI_TEXTES = {
  en: {
    "LE NOBLE CORAN & TAFSĪR": "THE NOBLE QURAN & TAFSĪR",
    "‹ Retour aux 114 Sourates": "‹ Back to 114 Surahs",
    "SOURATE MÉDINOISE": "MEDINAN SURAH",
    "SOURATE MECQUOISE": "MAKKAN SURAH",
    "Sourate Médinoise": "Medinan Surah",
    "Sourate Mecquoise": "Makkan Surah",
    "📖 Mot à mot": "📖 Word by Word",
    "🌊 Bruit Brun": "🌊 Brown Noise",
    "✨ Suivi": "✨ Follow",
    "Enchaîner automatiquement": "Auto-advance",
    "‹ Précédent": "‹ Previous",
    "Suivant ›": "Next ›",
    "▶ Écouter le verset": "▶ Listen to verse",
    "↺ Rejouer": "↺ Replay",
    "TAFSĪR & EXPLICATION DU VERSET": "TAFSĪR & VERSE EXPLANATION",
    "Qu'est-ce qu'une Sourate Mecquoise ?": "What is a Meccan Surah?",
    "Qu’est-ce qu’une Sourate Mecquoise ?": "What is a Meccan Surah?",
    "Qu'est-ce qu'une Sourate Médinoise ?": "What is a Medinan Surah?",
    "Qu’est-ce qu’une Sourate Médinoise ?": "What is a Medinan Surah?",
    "MECQUOISE • 86 SOURATES": "MECCAN • 86 SURAHS",
    "MÉDINOISE • 28 SOURATES": "MEDINAN • 28 SURAHS",
    "1. Ordre de Révélation (1 à 114)": "1. Revelation Order (1 to 114)",
    "2. Ordre classique (1 à 114)": "2. Traditional Order (1 to 114)",
    "3. ⭐ Les Miracles du Coran": "3. ⭐ Miracles of the Quran",
    "Les Miracles du Coran": "Miracles of the Quran",
    "Mettre le site en application sur téléphone (Safari / Android)": "Add website as an App on phone (Safari / Android)",
    "Rechercher une sourate ou un verset direct (ex: 30:1, 54:1, 2:255...)": "Search a surah or direct verse (e.g., 30:1, 54:1, 2:255...)"
  },
  es: {
    "LE NOBLE CORAN & TAFSĪR": "EL NOBLE CORÁN Y TAFSĪR",
    "‹ Retour aux 114 Sourates": "‹ Volver a las 114 Suras",
    "SOURATE MÉDINOISE": "SURA MEDINENSE",
    "SOURATE MECQUOISE": "SURA MEQUÍ",
    "Sourate Médinoise": "Sura Medinense",
    "Sourate Mecquoise": "Sura Mequí",
    "📖 Mot à mot": "📖 Palabra por palabra",
    "🌊 Bruit Brun": "🌊 Ruido Marrón",
    "✨ Suivi": "✨ Seguimiento",
    "Enchaîner automatiquement": "Avance automático",
    "‹ Précédent": "‹ Anterior",
    "Suivant ›": "Siguiente ›",
    "▶ Écouter le verset": "▶ Escuchar aleya",
    "⏸ Pause": "⏸ Pausa",
    "↺ Rejouer": "↺ Repetir",
    "TAFSĪR & EXPLICATION DU VERSET": "TAFSĪR Y EXPLICACIÓN DE LA ALEYA",
    "Qu'est-ce qu'une Sourate Mecquoise ?": "¿Qué es una Sura Mequí?",
    "Qu’est-ce qu’une Sourate Mecquoise ?": "¿Qué es una Sura Mequí?",
    "Qu'est-ce qu'une Sourate Médinoise ?": "¿Qué es una Sura Medinense?",
    "Qu’est-ce qu’une Sourate Médinoise ?": "¿Qué es una Sura Medinense?",
    "MECQUOISE • 86 SOURATES": "MEQUÍ • 86 SURAS",
    "MÉDINOISE • 28 SOURATES": "MEDINENSE • 28 SURAS",
    "1. Ordre de Révélation (1 à 114)": "1. Orden de Revelación (1 a 114)",
    "2. Ordre classique (1 à 114)": "2. Orden tradicional (1 a 114)",
    "3. ⭐ Les Miracles du Coran": "3. ⭐ Milagros del Corán",
    "Les Miracles du Coran": "Milagros del Corán",
    "Mettre le site en application sur téléphone (Safari / Android)": "Instalar como aplicación en el móvil (Safari / Android)",
    "Rechercher une sourate ou un verset direct (ex: 30:1, 54:1, 2:255...)": "Buscar una sura o aleya directa (ej: 30:1, 54:1, 2:255...)"
  },
  ar: {
    "LE NOBLE CORAN & TAFSĪR": "القرآن الكريم والتفسير المختصر",
    "‹ Retour aux 114 Sourates": "‹ العودة إلى 114 سورة",
    "SOURATE MÉDINOISE": "سورة مدنية",
    "SOURATE MECQUOISE": "سورة مكية",
    "Sourate Médinoise": "سورة مدنية",
    "Sourate Mecquoise": "سورة مكية",
    "📖 Mot à mot": "📖 كلمة بكلمة",
    "🌊 Bruit Brun": "🌊 ضوضاء بنية",
    "✨ Suivi": "✨ تتبع",
    "Enchaîner automatiquement": "تشغيل تلقائي",
    "‹ Précédent": "‹ السابق",
    "Suivant ›": "التالي ›",
    "▶ Écouter le verset": "▶ استمع للآية",
    "⏸ Pause": "⏸ إيقاف مؤقت",
    "↺ Rejouer": "↺ إعادة",
    "TAFSĪR & EXPLICATION DU VERSET": "تفسير الآية وبيان معانيها",
    "Qu'est-ce qu'une Sourate Mecquoise ?": "ما هي السورة المكية؟",
    "Qu’est-ce qu’une Sourate Mecquoise ?": "ما هي السورة المكية؟",
    "Qu'est-ce qu'une Sourate Médinoise ?": "ما هي السورة المدنية؟",
    "Qu’est-ce qu’une Sourate Médinoise ?": "ما هي السورة المدنية؟",
    "MECQUOISE • 86 SOURATES": "مكية • 86 سورة",
    "MÉDINOISE • 28 SOURATES": "مدنية • 28 سورة",
    "1. Ordre de Révélation (1 à 114)": "1. ترتيب النزول (1 إلى 114)",
    "2. Ordre classique (1 à 114)": "2. ترتيب المصحف (1 إلى 114)",
    "3. ⭐ Les Miracles du Coran": "3. ⭐ آيات الإعجاز القرآني",
    "Les Miracles du Coran": "آيات الإعجاز القرآني",
    "Mettre le site en application sur téléphone (Safari / Android)": "تثبيت الموقع كتطبيق على الهاتف (آيفون / أندرويد)",
    "Rechercher une sourate ou un verset direct (ex: 30:1, 54:1, 2:255...)": "ابحث عن سورة أو آية مباشرة (مثال: 30:1، 54:1، 2:255...)"
  },
  de: {
    "LE NOBLE CORAN & TAFSĪR": "DER EDLE KORAN & TAFSĪR",
    "‹ Retour aux 114 Sourates": "‹ Zurück zu den 114 Suren",
    "SOURATE MÉDINOISE": "MEDINENSISCHE SURE",
    "SOURATE MECQUOISE": "MEKKANISCHE SURE",
    "Sourate Médinoise": "Medinensische Sure",
    "Sourate Mecquoise": "Mekkanische Sure",
    "📖 Mot à mot": "📖 Wort für Wort",
    "🌊 Bruit Brun": "🌊 Braunes Rauschen",
    "✨ Suivi": "✨ Verfolgung",
    "Enchaîner automatiquement": "Automatisch weiter",
    "‹ Précédent": "‹ Zurück",
    "Suivant ›": "Weiter ›",
    "▶ Écouter le verset": "▶ Vers anhören",
    "↺ Rejouer": "↺ Wiederholen",
    "TAFSĪR & EXPLICATION DU VERSET": "TAFSĪR & ERKLÄRUNG DES VERSES",
    "Qu'est-ce qu'une Sourate Mecquoise ?": "Was ist eine mekkanische Sure?",
    "Qu’est-ce qu’une Sourate Mecquoise ?": "Was ist eine mekkanische Sure?",
    "Qu'est-ce qu'une Sourate Médinoise ?": "Was ist eine medinensische Sure?",
    "Qu’est-ce qu’une Sourate Médinoise ?": "Was ist eine medinensische Sure?",
    "MECQUOISE • 86 SOURATES": "MEKKANISCH • 86 SUREN",
    "MÉDINOISE • 28 SOURATES": "MEDINENSISCH • 28 SUREN",
    "1. Ordre de Révélation (1 à 114)": "1. Offenbarungsreihenfolge (1–114)",
    "2. Ordre classique (1 à 114)": "2. Klassische Reihenfolge (1–114)",
    "3. ⭐ Les Miracles du Coran": "3. ⭐ Wunder des Korans",
    "Les Miracles du Coran": "Wunder des Korans",
    "Mettre le site en application sur téléphone (Safari / Android)": "App auf Ihrem Telefon installieren (iPhone / Android)",
    "Rechercher une sourate ou un verset direct (ex: 30:1, 54:1, 2:255...)": "Suche nach einer Sure oder einem Vers (z.B. 2:255, 30:1, Al-Kahf...)"
  },
  it: {
    "LE NOBLE CORAN & TAFSĪR": "IL NOBILE CORANO E TAFSĪR",
    "‹ Retour aux 114 Sourates": "‹ Torna alle 114 Sure",
    "SOURATE MÉDINOISE": "SURA MEDINESE",
    "SOURATE MECQUOISE": "SURA MECCANA",
    "Sourate Médinoise": "Sura Medinese",
    "Sourate Mecquoise": "Sura Meccana",
    "📖 Mot à mot": "📖 Parola per parola",
    "🌊 Bruit Brun": "🌊 Rumore Marrone",
    "✨ Suivi": "✨ Seguito",
    "Enchaîner automatiquement": "Riproduzione automatica",
    "‹ Précédent": "‹ Precedente",
    "Suivant ›": "Successivo ›",
    "▶ Écouter le verset": "▶ Ascolta il versetto",
    "⏸ Pause": "⏸ Pausa",
    "↺ Rejouer": "↺ Riascolta",
    "TAFSĪR & EXPLICATION DU VERSET": "TAFSĪR E SPIEGAZIONE DEL VERSETTO",
    "Qu'est-ce qu'une Sourate Mecquoise ?": "Cos'è una Sura Meccana?",
    "Qu’est-ce qu’une Sourate Mecquoise ?": "Cos'è una Sura Meccana?",
    "Qu'est-ce qu'une Sourate Médinoise ?": "Cos'è una Sura Medinese?",
    "Qu’est-ce qu’une Sourate Médinoise ?": "Cos'è una Sura Medinese?",
    "MECQUOISE • 86 SOURATES": "MECCANA • 86 SURE",
    "MÉDINOISE • 28 SOURATES": "MEDINESE • 28 SURE",
    "1. Ordre de Révélation (1 à 114)": "1. Ordine di Rivelazione (1–114)",
    "2. Ordre classique (1 à 114)": "2. Ordine Classico (1–114)",
    "3. ⭐ Les Miracles du Coran": "3. ⭐ I Miracoli del Corano",
    "Les Miracles du Coran": "I Miracoli del Corano",
    "Mettre le site en application sur téléphone (Safari / Android)": "Installa l'App sul tuo telefono (iPhone / Android)",
    "Rechercher une sourate ou un verset direct (ex: 30:1, 54:1, 2:255...)": "Cerca una Sura o un versetto (es. 2:255, 30:1, Al-Kahf...)"
  },
  id: {
    "LE NOBLE CORAN & TAFSĪR": "AL-QUR'AN MULIA & TAFSĪR",
    "‹ Retour aux 114 Sourates": "‹ Kembali ke 114 Surah",
    "SOURATE MÉDINOISE": "SURAH MADANIYAH",
    "SOURATE MECQUOISE": "SURAH MAKKIYAH",
    "Sourate Médinoise": "Surah Madaniyah",
    "Sourate Mecquoise": "Surah Makkiyah",
    "📖 Mot à mot": "📖 Kata demi Kata",
    "🌊 Bruit Brun": "🌊 Derau Cokelat",
    "✨ Suivi": "✨ Ikuti Bacaan",
    "Enchaîner automatiquement": "Putar otomatis",
    "‹ Précédent": "‹ Sebelumnya",
    "Suivant ›": "Berikutnya ›",
    "▶ Écouter le verset": "▶ Dengarkan Ayat",
    "⏸ Pause": "⏸ Jeda",
    "↺ Rejouer": "↺ Ulangi",
    "TAFSĪR & EXPLICATION DU VERSET": "TAFSĪR & PENJELASAN AYAT",
    "Qu'est-ce qu'une Sourate Mecquoise ?": "Apa itu Surah Makkiyah?",
    "Qu’est-ce qu’une Sourate Mecquoise ?": "Apa itu Surah Makkiyah?",
    "Qu'est-ce qu'une Sourate Médinoise ?": "Apa itu Surah Madaniyah?",
    "Qu’est-ce qu’une Sourate Médinoise ?": "Apa itu Surah Madaniyah?",
    "MECQUOISE • 86 SOURATES": "MAKKIYAH • 86 SURAH",
    "MÉDINOISE • 28 SOURATES": "MADANIYAH • 28 SURAH",
    "1. Ordre de Révélation (1 à 114)": "1. Urutan Turunnya Wahyu (1–114)",
    "2. Ordre classique (1 à 114)": "2. Urutan Mushaf (1–114)",
    "3. ⭐ Les Miracles du Coran": "3. ⭐ Mukjizat Al-Qur'an",
    "Les Miracles du Coran": "Mukjizat Al-Qur'an",
    "Mettre le site en application sur téléphone (Safari / Android)": "Pasang Aplikasi di ponsel Anda (iPhone / Android)",
    "Rechercher une sourate ou un verset direct (ex: 30:1, 54:1, 2:255...)": "Cari Surah atau ayat (misal: 2:255, 30:1, Al-Kahf...)"
  },
  ru: {
    "LE NOBLE CORAN & TAFSĪR": "СВЯЩЕННЫЙ КОРАН И ТАФСИР",
    "‹ Retour aux 114 Sourates": "‹ Назад к 114 сурам",
    "SOURATE MÉDINOISE": "МЕДИНСКАЯ СУРА",
    "SOURATE MECQUOISE": "МЕККАНСКАЯ СУРА",
    "Sourate Médinoise": "Мединская сура",
    "Sourate Mecquoise": "Мекканская сура",
    "📖 Mot à mot": "📖 Пословный перевод",
    "🌊 Bruit Brun": "🌊 Коричневый шум",
    "✨ Suivi": "✨ Слежение",
    "Enchaîner automatiquement": "Автопереход",
    "‹ Précédent": "‹ Назад",
    "Suivant ›": "Далее ›",
    "▶ Écouter le verset": "▶ Слушать аят",
    "⏸ Pause": "⏸ Пауза",
    "↺ Rejouer": "↺ Повторить",
    "TAFSĪR & EXPLICATION DU VERSET": "ТАФСИР И ТОЛКОВАНИЕ АЯТА",
    "Qu'est-ce qu'une Sourate Mecquoise ?": "Что такое мекканская сура?",
    "Qu’est-ce qu’une Sourate Mecquoise ?": "Что такое мекканская сура?",
    "Qu'est-ce qu'une Sourate Médinoise ?": "Что такое мединская сура?",
    "Qu’est-ce qu’une Sourate Médinoise ?": "Что такое мединская сура?",
    "MECQUOISE • 86 SOURATES": "МЕККАНСКАЯ • 86 СУР",
    "MÉDINOISE • 28 SOURATES": "МЕДИНСКАЯ • 28 СУР",
    "1. Ordre de Révélation (1 à 114)": "1. По порядку ниспослания (1–114)",
    "2. Ordre classique (1 à 114)": "2. По порядку Мусхафа (1–114)",
    "3. ⭐ Les Miracles du Coran": "3. ⭐ Чудеса Корана",
    "Les Miracles du Coran": "Чудеса Корана",
    "Mettre le site en application sur téléphone (Safari / Android)": "Установить приложение на телефон (iPhone / Android)",
    "Rechercher une sourate ou un verset direct (ex: 30:1, 54:1, 2:255...)": "Поиск суры или аята (например: 2:255, 30:1, Аль-Кахф...)"
  }
};

const INTRO_HOME = {
  en: {
    mecq: "Revealed at the beginning of prophethood (before the Hijrah), when the believers were still few in Makkah: establishes the pure Oneness of Allāh (Tawhīd), proofs of faith, the Hereafter, and the stories of the Prophets.",
    med: "Revealed after the Hijrah, when the Muslims grew numerous and united in Madinah, victorious in major battles (like Badr) up to the Conquest of Makkah: details worship, social laws, and justice."
  },
  es: {
    mecq: "Revelada al inicio de la profecía (antes de la Hégira), cuando los creyentes aún eran pocos en La Meca: establece el Monoteísmo puro de Allāh (Tawhīd), las pruebas de la fe, el Juicio Final y las historias de los Profetas.",
    med: "Revelada después de la Hégira, cuando los musulmanes se hicieron numerosos y unidos en Medina, victoriosos en las grandes batallas (como Badr) hasta la conquista de La Meca: detalla las adoraciones, las leyes sociales y la justicia."
  },
  ar: {
    mecq: "نزلت في بداية الوحي (قبل الهجرة) حين كان المسلمون قلة مستضعفين بمكة: ترسخ التوحيد الخالص لله، ودلائل الإيمان، والبعث والحساب، وقصص الأنبياء.",
    med: "نزلت بعد الهجرة حين كثر المسلمون وقويت شوكتهم بالمدينة وانتصروا في الغزوات (كبدر) وحتى فتح مكة: تفصل العبادات والشرائع والمعاملات والعدل."
  },
  de: {
    mecq: "Offenbart zu Beginn der Prophetie (vor der Hidschra), als die Gläubigen in Mekka noch wenige waren: begründet die reine Einheit Allāhs (Tawhīd), die Beweise des Glaubens, das Jüngste Gericht und die Geschichten der Propheten.",
    med: "Offenbart nach der Hidschra, als die Muslime zahlreich wurden, vereint in Medina, siegreich in den großen Schlachten (wie Badr) bis zur Eroberung Mekkas: regelt die Gottesdienste, die sozialen Gesetze und die Gerechtigkeit."
  },
  it: {
    mecq: "Rivelata all'inizio della profezia (prima dell'Egira), quando i credenti erano ancora pochi alla Mecca: fonda la pura Unicità di Allāh (Tawhīd), le prove della fede, il Giudizio Finale e la storia dei Profeti.",
    med: "Rivelata dopo l'Egira, quando i musulmani divennero numerosi, uniti a Medina, vittoriosi nelle grandi battaglie (come Badr) fino alla conquista della Mecca: dettaglia le adorazioni, le leggi sociali e la giustizia."
  },
  id: {
    mecq: "Diturunkan pada awal kenabian (sebelum Hijrah), ketika kaum mukminin masih sedikit di Mekkah: menegakkan kemurnian Tauhid kepada Allah, bukti-bukti keimanan, Hari Kiamat, dan kisah para Nabi.",
    med: "Diturunkan setelah Hijrah, ketika umat Islam telah banyak dan bersatu di Madinah, menang dalam pertempuran besar (seperti Badar) hingga penaklukan Mekkah: merinci ibadah, hukum sosial, dan keadilan."
  },
  ru: {
    mecq: "Ниспослана в начале пророчества (до Хиджры), когда верующих в Мекке было ещё мало: утверждает чистое Единобожие Аллаха (Таухид), доказательства веры, Судный день и истории Пророков.",
    med: "Ниспослана после Хиджры, когда мусульмане стали многочисленными и объединились в Медине, одержав победу в великих битвах (как при Бадре) вплоть до открытия Мекки: разъясняет поклонение, общественные законы и справедливость."
  }
};

function nettoyerVersetApi(raw) {
  if (!raw) return "";
  return raw
    .replace(/<sup[^>]*>[\s\S]*?<\/sup>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\[\d+\]|\(\d+\)/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

async function obtenirVersetOfficiel(sNum, vNum, lang) {
  if (!sNum || !vNum || !QURAN_API_IDS[lang]) return { ok: false, text: null };
  const url = "https://api.quran.com/api/v4/quran/translations/" + QURAN_API_IDS[lang] + "?verse_key=" + sNum + ":" + vNum;
  try {
    const r = await fetch(url, { headers: BROWSER_HEADERS, signal: AbortSignal.timeout(2800), cf: { cacheTtl: 2592000, cacheEverything: true } });
    if (!r.ok) return { ok: false, text: null };
    const d = await r.json();
    if (d && d.translations && d.translations[0] && d.translations[0].text) {
      const clean = nettoyerVersetApi(d.translations[0].text);
      return { ok: Boolean(clean), text: clean || null };
    }
  } catch (e) {}
  return { ok: false, text: null };
}

async function traduireTexteServeur(texte, lang) {
  if (!texte || lang === "fr") return { ok: true, text: texte, provider: "fr" };

  try {
    const url1 = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=" + lang + "&dt=t&q=" + encodeURIComponent(texte);
    const r1 = await fetch(url1, { headers: BROWSER_HEADERS, signal: AbortSignal.timeout(2800), cf: { cacheTtl: 2592000, cacheEverything: true } });
    if (r1.ok) {
      const d1 = await r1.json();
      if (d1 && Array.isArray(d1[0])) {
        let out = "";
        for (let i = 0; i < d1[0].length; i++) {
          if (d1[0][i] && d1[0][i][0]) out += d1[0][i][0];
        }
        if (out.trim()) return { ok: true, text: out.trim(), provider: "gtx" };
      }
    }
  } catch (e1) {}

  try {
    const url2 = "https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=fr&tl=" + lang + "&q=" + encodeURIComponent(texte);
    const r2 = await fetch(url2, { headers: BROWSER_HEADERS, signal: AbortSignal.timeout(2800), cf: { cacheTtl: 2592000, cacheEverything: true } });
    if (r2.ok) {
      const d2 = await r2.json();
      let out2 = "";
      if (Array.isArray(d2)) {
        if (typeof d2[0] === "string") out2 = d2[0];
        else if (Array.isArray(d2[0]) && typeof d2[0][0] === "string") out2 = d2.map(x => x[0]).join("");
      } else if (d2 && Array.isArray(d2.sentences)) {
        out2 = d2.sentences.map(s => s.trans || "").join("");
      }
      if (out2.trim()) return { ok: true, text: out2.trim(), provider: "clients5" };
    }
  } catch (e2) {}

  if (texte.length <= 490) {
    try {
      const endpoint = new URL("https://api.mymemory.translated.net/get");
      endpoint.searchParams.set("q", texte);
      endpoint.searchParams.set("langpair", "fr|" + lang);
      const r3 = await fetch(endpoint, { headers: BROWSER_HEADERS, signal: AbortSignal.timeout(2800), redirect: "error" });
      if (r3.ok) {
        const d3 = await r3.json();
        const text = d3?.responseData?.translatedText;
        const errorText = /MYMEMORY WARNING|QUERY LENGTH LIMIT|FREE TRANSLATIONS|PLEASE SELECT/i;
        if (Number(d3?.responseStatus) === 200 && typeof text === "string" && text.trim() && !errorText.test(text)) {
          return { ok: true, text: text.trim(), provider: "mymemory" };
        }
      }
    } catch (e3) {}
  }

  return { ok: false, text: texte, provider: "failed" };
}

async function traduireHtmlEnPreservantBalises(innerHtml, lang) {
  if (!innerHtml || lang === "fr") return { ok: true, html: innerHtml, diag: "fr" };
  const parts = innerHtml.split(/(<[^>]+>)/g);
  const idxs = [];
  const segs = [];

  for (let i = 0; i < parts.length; i += 2) {
    const rawTxt = parts[i];
    const cleanTxt = rawTxt.replace(/&nbsp;/g, " ").trim();
    if (cleanTxt.length >= 2 && /[a-zA-ZÀ-ÿ]/.test(cleanTxt)) {
      idxs.push(i);
      segs.push(cleanTxt);
    }
  }

  if (segs.length === 0) return { ok: false, html: innerHtml, diag: "empty-segs" };

  const joined = segs.join("\n\n");
  const batchRes = await traduireTexteServeur(joined, lang);
  if (batchRes.ok && batchRes.text) {
    const splitTr = batchRes.text.split(/\n\s*\n/);
    if (splitTr.length === idxs.length) {
      for (let j = 0; j < idxs.length; j++) {
        const idx = idxs[j];
        const rawOrig = parts[idx];
        const lead = (rawOrig.match(/^\s*/) || [""])[0];
        const trail = (rawOrig.match(/\s*$/) || [""])[0];
        parts[idx] = lead + escapeHtmlText(splitTr[j].trim()) + trail;
      }
      return { ok: true, html: parts.join(""), diag: "batch-" + batchRes.provider };
    }
  }

  let okCount = 0;
  let lastProv = batchRes.provider || "err";
  for (let j = 0; j < idxs.length; j++) {
    const idx = idxs[j];
    const rawOrig = parts[idx];
    const lead = (rawOrig.match(/^\s*/) || [""])[0];
    const trail = (rawOrig.match(/\s*$/) || [""])[0];
    const r = await traduireTexteServeur(segs[j], lang);
    if (r.ok && r.text) {
      parts[idx] = lead + escapeHtmlText(r.text) + trail;
      okCount++;
      lastProv = r.provider;
    }
  }

  return {
    ok: okCount === idxs.length,
    html: parts.join(""),
    diag: okCount === idxs.length ? ("seq-" + lastProv) : ("partial-" + okCount + "-of-" + idxs.length)
  };
}

async function obtenirTafsirDepuisCachesDurablesOuTraduire(innerHtml, sNum, vNum, lang, env, ctx) {
  const vk = sNum + ":" + vNum;
  try {
    if (!MEM_STATIC_TAFSIR_CACHE && env && env.ASSETS && typeof env.ASSETS.fetch === "function") {
      const rStatic = await env.ASSETS.fetch(new Request("https://corantafsir.com/tafsir-cache.json"));
      if (rStatic.ok) MEM_STATIC_TAFSIR_CACHE = await rStatic.json();
    }
    if (MEM_STATIC_TAFSIR_CACHE && MEM_STATIC_TAFSIR_CACHE[vk] && MEM_STATIC_TAFSIR_CACHE[vk][lang]) {
      return { ok: true, html: MEM_STATIC_TAFSIR_CACHE[vk][lang], diag: "static-cache" };
    }
  } catch (e) {}

  const cache = typeof caches !== "undefined" && caches.default ? caches.default : null;
  const edgeCacheReq = new Request("https://corantafsir.com/_tafsir_edge_v105/" + sNum + "-" + vNum + "-" + lang);
  if (cache) {
    try {
      const cachedTaf = await cache.match(edgeCacheReq);
      if (cachedTaf) {
        const txt = await cachedTaf.text();
        if (txt && txt.length > 10) return { ok: true, html: txt, diag: "edge-cache" };
      }
    } catch (e) {}
  }

  const liveRes = await traduireHtmlEnPreservantBalises(innerHtml, lang);
  if (liveRes.ok && liveRes.html && cache) {
    try {
      const respToStore = new Response(liveRes.html, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=31536000, immutable"
        }
      });
      if (ctx && ctx.waitUntil) ctx.waitUntil(cache.put(edgeCacheReq, respToStore));
      else await cache.put(edgeCacheReq, respToStore);
    } catch (e) {}
  }
  return liveRes;
}

function construireBlocHreflangHarmonise(urlBaseFr) {
  const langs = ["fr", "en", "es", "ar", "de", "it", "id", "ru"];
  const lignes = langs.map(l => {
    const href = l === "fr" ? urlBaseFr : (urlBaseFr + "?lang=" + l);
    return '<link rel="alternate" hreflang="' + l + '" href="' + href + '">';
  });
  lignes.push('<link rel="alternate" hreflang="x-default" href="' + urlBaseFr + '">');
  return lignes.join("\n");
}

function remplacerHorsScriptsEtStyles(html, fnRemplacement) {
  const blocs = html.split(/(<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>)/gi);
  for (let i = 0; i < blocs.length; i += 2) {
    blocs[i] = fnRemplacement(blocs[i]);
  }
  return blocs.join("");
}

export async function transformerHtmlCompletSSRWithStatus(html, lang, pathname, env, ctx) {
  const cleanPath = (pathname || "/").trim();
  const mVerse = cleanPath.match(/^\/?sourate-(\d+)-verset-(\d+)(?:\.html)?\/?$/i);
  const isHome = !mVerse && /^\/?(?:index(?:\.html)?)?\/?$/i.test(cleanPath);

  const sNum = mVerse ? mVerse[1] : "";
  const vNum = mVerse ? mVerse[2] : "";
  const nomS = sNum && NOMS_SOURATES_COURT[Number(sNum)] ? NOMS_SOURATES_COURT[Number(sNum)] : "";
  const pathClean = mVerse
    ? ("/sourate-" + sNum + "-verset-" + vNum)
    : (isHome ? "/" : cleanPath.replace(/\.html$/i, ""));

  const urlBaseFr = "https://corantafsir.com" + pathClean;
  const canonicalHref = (!lang || lang === "fr") ? urlBaseFr : (urlBaseFr + "?lang=" + lang);

  let out = html;
  let diagTafsir = "none";

  out = out.replace(/<link rel="canonical" href="[^"]*">/gi, '<link rel="canonical" href="' + canonicalHref + '">');
  out = out.replace(/<link rel="alternate" hreflang="[^"]*"[^>]*>\s*/gi, "");
  out = out.replace(/(<link rel="canonical" href="[^"]*">)/i, "$1\n" + construireBlocHreflangHarmonise(urlBaseFr));

  if (!lang || lang === "fr") {
    if (mVerse) {
      const titleFr = "Sourate " + nomS + " (" + sNum + ":" + vNum + ") — Coran, Audio, Mot à Mot & Tafsīr";
      out = out.replace(/<title>[\s\S]*?<\/title>/i, () => "<title>" + escapeHtmlText(titleFr) + "</title>");
    }
    out = remplacerHorsScriptsEtStyles(out, segment =>
      segment
        .replace(/href="\/?sourate-(\d+)-verset-(\d+)(?:\.html)?"/gi, 'href="/sourate-$1-verset-$2"')
        .replace(/href="\/?index(?:\.html)?"/gi, 'href="/"')
    );
    return { html: out, complete: Boolean(isHome || mVerse), diag: "fr" };
  }

  let traductionComplete = true;

  out = out.replace(/<html([^>]*)lang="[^"]*"([^>]*)>/i, '<html$1lang="' + lang + '" dir="' + (lang === "ar" ? "rtl" : "ltr") + '"$2>');

  const titles = {
    en: mVerse ? ("Surah " + nomS + " (" + sNum + ":" + vNum + ") — Noble Quran, Audio, Word by Word & Tafsīr") : "The Noble Quran & Tafsīr Al-Mukhtasar — Audio, Tajwīd & Word by Word (8 Languages)",
    es: mVerse ? ("Sura " + nomS + " (" + sNum + ":" + vNum + ") — El Noble Corán, Audio, Palabra por Palabra y Tafsīr") : "El Noble Corán y Tafsīr Al-Mukhtasar — Audio, Tajwīd y Palabra por Palabra (8 Idiomas)",
    ar: mVerse ? ("سورة " + nomS + " (" + sNum + ":" + vNum + ") — القرآن الكريم والتفسير المختصر") : "القرآن الكريم والتفسير المختصر — تلاوة، تجويد وترجمة كلمة بكلمة (8 لغات)",
    de: mVerse ? ("Sure " + nomS + " (" + sNum + ":" + vNum + ") — Der Edle Koran, Audio, Wort für Wort & Tafsīr") : "Der Edle Koran & Tafsīr Al-Mukhtasar — Audio, Tajwīd & Wort für Wort (Bubenheim & Elyas)",
    it: mVerse ? ("Sura " + nomS + " (" + sNum + ":" + vNum + ") — Il Nobile Corano, Audio, Parola per Parola e Tafsīr") : "Il Nobile Corano e Tafsīr Al-Mukhtasar — Audio, Tajwīd e Parola per Parola (Piccardo)",
    id: mVerse ? ("Surah " + nomS + " (" + sNum + ":" + vNum + ") — Al-Qur'an Mulia, Audio, Kata demi Kata & Tafsir") : "Al-Qur'an Mulia & Tafsir Al-Mukhtasar — Audio, Tajwid & Kata demi Kata (Kemenag RI)",
    ru: mVerse ? ("Сура " + nomS + " (" + sNum + ":" + vNum + ") — Священный Коран, Аудио, Пословный перевод и Тафсир") : "Священный Коран и Тафсир аль-Мухтасар — Аудио, Таджвид и Пословный перевод (Э. Кулиев)"
  };
  const descriptions = {
    en: "Read and listen to the Noble Quran (6,236 verses) with word-by-word audio tracking, color Tajwīd, Khatm planner and Tafsīr Al-Mukhtasar & Ibn Kathīr in 8 languages.",
    es: "Lea y escuche el Noble Corán (6.236 aleyas) con seguimiento de audio palabra por palabra, Tajwīd, planificador Khatm y Tafsīr Al-Mukhtasar en 8 idiomas.",
    ar: "اقرأ واستمع إلى القرآن الكريم (6236 آية) مع التتبع الصوتي كلمة بكلمة، التجويد المصور، برنامج ختم القرآن والتفسير المختصر وابن كثير بـ 8 لغات.",
    de: "Lesen und hören Sie den Edlen Koran (6.236 Verse, Übersetzung Bubenheim & Elyas) mit Wort-für-Wort-Audioverfolgung, Tajwīd, Leseplaner und Tafsīr Al-Mukhtasar.",
    it: "Leggi e ascolta il Nobile Corano (6.236 versetti, traduzione Hamza Roberto Piccardo) con seguito audio parola per parola, Tajwīd, pianificatore Khatm e Tafsīr.",
    id: "Baca dan dengarkan Al-Qur'an Mulia (6.236 ayat, Terjemahan Kemenag RI) dengan pelacakan audio kata demi kata, Tajwid, perencana Khatam, dan Tafsir Al-Mukhtasar.",
    ru: "Читайте и слушайте Священный Коран (6 236 аятов, перевод Эльмира Кулиева) с пословным аудио-слежением, Таджвидом, планом чтения и Тафсиром аль-Мухтасар."
  };

  if (titles[lang]) {
    out = out.replace(/<title>[\s\S]*?<\/title>/i, () => "<title>" + escapeHtmlText(titles[lang]) + "</title>");
  }
  if (descriptions[lang]) {
    if (/<meta name="description" content="[^"]*">/i.test(out)) {
      out = out.replace(/<meta name="description" content="[^"]*">/i, () => '<meta name="description" content="' + escapeHtmlText(descriptions[lang]) + '">');
    } else {
      out = out.replace(/<\/title>/i, () => '</title>\n  <meta name="description" content="' + escapeHtmlText(descriptions[lang]) + '">');
    }
  }

  const mapUi = UI_TEXTES[lang] || {};
  out = remplacerHorsScriptsEtStyles(out, segment => {
    let s = segment;
    for (const [kFr, vTr] of Object.entries(mapUi)) {
      s = s.split(kFr).join(vTr);
    }
    if (ATTRIBUTIONS_BAS[lang]) s = s.split(ATTRIBUTIONS_BAS.fr).join(ATTRIBUTIONS_BAS[lang]);
    if (ATTRIBUTIONS_HAUT[lang]) s = s.split(ATTRIBUTIONS_HAUT.fr).join(ATTRIBUTIONS_HAUT[lang]);
    return s;
  });

  if (isHome) {
    if (INTRO_HOME[lang]) {
      out = remplacerHorsScriptsEtStyles(out, segment =>
        segment
          .replace(/Révélée au début de la révélation[^<]+/i, () => INTRO_HOME[lang].mecq)
          .replace(/Révélée après l['’]Hégire[^<]+/i, () => INTRO_HOME[lang].med)
      );
      const mecqOk = out.includes(INTRO_HOME[lang].mecq);
      const medOk = out.includes(INTRO_HOME[lang].med);
      if (!mecqOk || !medOk) traductionComplete = false;
      diagTafsir = mecqOk && medOk ? "home-ok" : "home-incomplete";
    } else {
      traductionComplete = false;
    }
  } else if (mVerse) {
    const prefS = { en: "Surah ", es: "Sura ", ar: "سورة ", de: "Sure ", it: "Sura ", id: "Surah ", ru: "Сура " }[lang] || "Sourate ";
    const prefV = { en: " — Verse ", es: " — Aleya ", ar: " — الآية ", de: " — Vers ", it: " — Versetto ", id: " — Ayat ", ru: " — Аят " }[lang] || " — Verset ";
    out = out.replace(/(<h1[^>]*>\s*)Sourate ([^<]+?) — Verset (\d+)/i, "$1" + prefS + "$2" + prefV + "$3");

    let versetTraiteOk = false;
    const regVersetFr = new RegExp("(>)(\\s*" + vNum + "\\s*[\\.-]\\s+)([^<]{2,})(<\\/)", "i");
    if (lang === "ar") {
      versetTraiteOk = true;
    } else if (QURAN_API_IDS[lang] && regVersetFr.test(out)) {
      const versetRes = await obtenirVersetOfficiel(sNum, vNum, lang);
      if (versetRes.ok && versetRes.text) {
        out = out.replace(regVersetFr, (_, p1, p2, _p3, p4) => p1 + p2 + escapeHtmlText(versetRes.text) + p4);
        versetTraiteOk = true;
      }
    }

    let tafsirTraiteOk = false;
    const regMainExp = /(<([a-z0-9]+)[^>]*\bid=["']mainExplanationEl["'][^>]*>)([\s\S]*?)(<\/\2>)/i;
    const mMainExp = out.match(regMainExp);
    if (mMainExp && mMainExp[3]) {
      const expRes = await obtenirTafsirDepuisCachesDurablesOuTraduire(mMainExp[3], sNum, vNum, lang, env, ctx);
      diagTafsir = expRes.diag || "unknown";
      if (expRes.ok && expRes.html) {
        out = out.replace(regMainExp, (_, openTag, _tag, _inner, closeTag) => openTag + expRes.html + closeTag);
        tafsirTraiteOk = true;
      }
    } else {
      diagTafsir = "selector-not-found";
    }

    if (!versetTraiteOk || !tafsirTraiteOk) {
      traductionComplete = false;
    }
  } else {
    traductionComplete = false;
  }

  out = remplacerHorsScriptsEtStyles(out, segment =>
    segment
      .replace(/href="\/?sourate-(\d+)-verset-(\d+)(?:\.html)?(?:\?[^"]*)?"/gi, 'href="/sourate-$1-verset-$2?lang=' + lang + '"')
      .replace(/href="\/?index(?:\.html)?(?:\?[^"]*)?"/gi, 'href="/?lang=' + lang + '"')
      .replace(/href="\/"/g, 'href="/?lang=' + lang + '"')
  );

  return { html: out, complete: traductionComplete, diag: diagTafsir };
}

export async function transformerHtmlCompletSSR(html, lang, pathname, env, ctx) {
  const res = await transformerHtmlCompletSSRWithStatus(html, lang, pathname, env, ctx);
  return res.html;
}

async function recupererFichierStatiquePages(request, env) {
  if (env && env.ASSETS && typeof env.ASSETS.fetch === "function") {
    return env.ASSETS.fetch(request);
  }
  return fetch(request);
}

const SSR_VERSION = "v111";
function construireCleCache(request, lang) {
  const key = new URL(request.url);
  key.pathname = key.pathname.replace(/\.html$/i, "");
  if (key.pathname === "/index") key.pathname = "/";
  key.search = "";
  if (lang !== "fr") key.searchParams.set("lang", lang);
  key.searchParams.set("_ssr_v", SSR_VERSION);
  return new Request(key.toString(), { method: "GET" });
}

const CSP_COMPATIBLE = [
  "default-src 'self'", "base-uri 'none'", "object-src 'none'",
  "frame-ancestors 'none'", "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com", "img-src 'self' data:",
  "media-src 'self' blob: https://everyayah.com https://audio.qurancdn.com",
  "connect-src 'self' https://api.quran.com https://api.qurancdn.com https://translate.googleapis.com https://everyayah.com https://audio.qurancdn.com",
  "worker-src 'self' blob:", "upgrade-insecure-requests"
].join("; ");

function securiserReponse(response) {
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", CSP_COMPATIBLE);
  headers.set("Strict-Transport-Security", "max-age=31536000");
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), autoplay=(self)");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

const application = {
  async fetch(request, env, ctx) {
    if (!["GET", "HEAD"].includes(request.method)) {
      return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    }

    const url = new URL(request.url);
    const validiteVerset = verifierVersetValide(url.pathname);
    if (validiteVerset === false) {
      return new Response("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'><meta name='robots' content='noindex'><title>404 - Verset introuvable</title></head><body style='background:#020406;color:#f8fafc;font-family:sans-serif;text-align:center;padding:80px 20px;'><h1>404 — Ce verset n'existe pas</h1><p><a href='/' style='color:#38bdf8;'>Retour aux 114 Sourates</a></p></body></html>", {
        status: 404,
        headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" }
      });
    }

    const langParam = (url.searchParams.get("lang") || "fr").split("-")[0].toLowerCase();
    const supported = ["fr", "en", "es", "ar", "de", "it", "id", "ru"];
    const lang = supported.includes(langParam) ? langParam : "fr";

    if (lang === "fr") {
      return recupererFichierStatiquePages(request, env);
    }

    const cache = typeof caches !== "undefined" && caches.default ? caches.default : null;
    const cacheKey = construireCleCache(request, lang);

    if (cache && request.method === "GET") {
      const cachedResp = await cache.match(cacheKey);
      if (cachedResp) return cachedResp;
    }

    const response = await recupererFichierStatiquePages(request, env);
    if (!response.ok) return response;

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    const htmlOrig = await response.text();
    const { html: htmlTraduit, complete: traductionComplete, diag } = await transformerHtmlCompletSSRWithStatus(htmlOrig, lang, url.pathname, env, ctx);

    const headers = new Headers(response.headers);
    headers.set("content-type", "text/html; charset=utf-8");
    headers.set("content-language", lang);
    headers.set("x-translation-status", traductionComplete ? "complete" : "incomplete");
    headers.set("x-tafsir-diag", diag || "none");

    if (!traductionComplete) {
      headers.set("cache-control", "no-store, no-cache, must-revalidate");
    }

    const finalResponse = new Response(request.method === "HEAD" ? null : htmlTraduit, {
      status: response.status,
      statusText: response.statusText,
      headers
    });

    if (request.method === "GET" && traductionComplete && cache && ctx && ctx.waitUntil) {
      ctx.waitUntil(cache.put(cacheKey, finalResponse.clone()));
    }
    return finalResponse;
  }
};

export default {
  async fetch(request, env, ctx) {
    return securiserReponse(await application.fetch(request, env, ctx));
  }
};

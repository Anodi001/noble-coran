const QURAN_API_IDS = { en: 20, es: 83, de: 27, it: 153, id: 33, ru: 45 };

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
  if (!sNum || !vNum || !QURAN_API_IDS[lang]) return null;
  const url = "https://api.quran.com/api/v4/quran/translations/" + QURAN_API_IDS[lang] + "?verse_key=" + sNum + ":" + vNum;
  try {
    const r = await fetch(url, { cf: { cacheTtl: 2592000, cacheEverything: true } });
    const d = await r.json();
    if (d && d.translations && d.translations[0] && d.translations[0].text) {
      return nettoyerVersetApi(d.translations[0].text);
    }
  } catch (e) {}
  return null;
}

async function traduireTexteServeur(texte, lang) {
  if (!texte || lang === "fr") return texte;
  try {
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=" + lang + "&dt=t&q=" + encodeURIComponent(texte);
    const r = await fetch(url, { cf: { cacheTtl: 2592000, cacheEverything: true } });
    const d = await r.json();
    if (d && d[0]) {
      let out = "";
      for (let i = 0; i < d[0].length; i++) {
        if (d[0][i][0]) out += d[0][i][0];
      }
      return out.trim() || texte;
    }
  } catch (e) {}
  return texte;
}

export async function transformerHtmlCompletSSR(html, lang, pathname) {
  if (!lang || lang === "fr") return html;
  let out = html;

  const mVerse = (pathname || "").match(/sourate-(\d+)-verset-(\d+)\.html/i);
  const sNum = mVerse ? mVerse[1] : "";
  const vNum = mVerse ? mVerse[2] : "";
  const pathClean = mVerse ? ("/sourate-" + sNum + "-verset-" + vNum + ".html") : "/";
  const canonicalHref = "https://corantafsir.com" + pathClean + "?lang=" + lang;

  // 1. Attributs <html lang="..." dir="...">
  out = out.replace(/<html([^>]*)lang="[^"]*"([^>]*)>/i, '<html$1lang="' + lang + '" dir="' + (lang === "ar" ? "rtl" : "ltr") + '"$2>');

  // 2. Canonical autoréférente avec ?lang=xx
  out = out.replace(/<link rel="canonical" href="[^"]*">/gi, '<link rel="canonical" href="' + canonicalHref + '">');

  // 3. Title & Meta Description traduits dès la réponse HTML initiale
  const titles = {
    en: sNum ? ("Surah " + sNum + ":" + vNum + " — Noble Quran, Audio, Word by Word & Tafsīr") : "The Noble Quran & Tafsīr Al-Mukhtasar — Audio, Tajwīd & Word by Word (8 Languages)",
    es: sNum ? ("Sura " + sNum + ":" + vNum + " — El Noble Corán, Audio, Palabra por Palabra y Tafsīr") : "El Noble Corán y Tafsīr Al-Mukhtasar — Audio, Tajwīd y Palabra por Palabra (8 Idiomas)",
    ar: sNum ? ("سورة " + sNum + ":" + vNum + " — القرآن الكريم والتفسير المختصر") : "القرآن الكريم والتفسير المختصر — تلاوة، تجويد وترجمة كلمة بكلمة (8 لغات)",
    de: sNum ? ("Sure " + sNum + ":" + vNum + " — Der Edle Koran, Audio, Wort für Wort & Tafsīr") : "Der Edle Koran & Tafsīr Al-Mukhtasar — Audio, Tajwīd & Wort für Wort (Bubenheim & Elyas)",
    it: sNum ? ("Sura " + sNum + ":" + vNum + " — Il Nobile Corano, Audio, Parola per Parola e Tafsīr") : "Il Nobile Corano e Tafsīr Al-Mukhtasar — Audio, Tajwīd e Parola per Parola (Piccardo)",
    id: sNum ? ("Surah " + sNum + ":" + vNum + " — Al-Qur'an Mulia, Audio, Kata demi Kata & Tafsir") : "Al-Qur'an Mulia & Tafsir Al-Mukhtasar — Audio, Tajwid & Kata demi Kata (Kemenag RI)",
    ru: sNum ? ("Сура " + sNum + ":" + vNum + " — Священный Коран, Аудио, Пословный перевод и Тафсир") : "Священный Коран и Тафсир аль-Мухтасар — Аудио, Таджвид и Пословный перевод (Э. Кулиев)"
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
  if (titles[lang]) out = out.replace(/<title>[\s\S]*?<\/title>/i, "<title>" + titles[lang] + "</title>");
  if (descriptions[lang]) out = out.replace(/<meta name="description" content="[^"]*">/i, '<meta name="description" content="' + descriptions[lang] + '">');

  // 4. Traduction du texte visible de l'interface et des attributions dans le <body>
  const mapUi = UI_TEXTES[lang] || {};
  for (const [kFr, vTr] of Object.entries(mapUi)) {
    out = out.split(kFr).join(vTr);
  }
  if (ATTRIBUTIONS_BAS[lang]) out = out.split(ATTRIBUTIONS_BAS.fr).join(ATTRIBUTIONS_BAS[lang]);
  if (ATTRIBUTIONS_HAUT[lang]) out = out.split(ATTRIBUTIONS_HAUT.fr).join(ATTRIBUTIONS_HAUT[lang]);

  // 5. Traduction du contenu principal visible (Accueil ou Verset + Tafsir) dans le HTML initial sans JS
  if (!mVerse && INTRO_HOME[lang]) {
    out = out.replace(/Révélée au début de la révélation[^<]+/i, INTRO_HOME[lang].mecq);
    out = out.replace(/Révélée après l['’]Hégire[^<]+/i, INTRO_HOME[lang].med);
  } else if (mVerse) {
    const prefS = { en: "Surah ", es: "Sura ", ar: "سورة ", de: "Sure ", it: "Sura ", id: "Surah ", ru: "Сура " }[lang] || "Sourate ";
    const prefV = { en: " — Verse ", es: " — Aleya ", ar: " — الآية ", de: " — Vers ", it: " — Versetto ", id: " — Ayat ", ru: " — Аят " }[lang] || " — Verset ";
    out = out.replace(/(<h1[^>]*>\s*)Sourate ([^<]+?) — Verset (\d+)/i, "$1" + prefS + "$2" + prefV + "$3");

    // Remplacement de la traduction du verset par la traduction officielle de référence
    const versetOff = await obtenirVersetOfficiel(sNum, vNum, lang);
    if (versetOff) {
      const regVersetFr = new RegExp("(>)(\\s*" + vNum + "\\s*[\\.-]\\s+)([^<]{4,})(<\\/)", "i");
      out = out.replace(regVersetFr, "$1$2" + versetOff + "$4");
    }

    // Traduction du paragraphe de Tafsir dans le HTML initial
    const regTafsir = /(TAFSĪR[^<]*<\/[^>]+>\s*<[^>]+>)([^<]{15,})(<\/)/i;
    const mTaf = out.match(regTafsir);
    if (mTaf && mTaf[2]) {
      const tafTraduit = await traduireTexteServeur(mTaf[2].trim(), lang);
      out = out.replace(regTafsir, "$1" + tafTraduit + "$3");
    }
  }

  // 6. Mise à jour des liens internes <a href="sourate-..."> avec ?lang=xx
  out = out.replace(/href="((?:sourate-\d+-verset-\d+|index)\.html)"/gi, 'href="$1?lang=' + lang + '"');

  return out;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const langParam = (url.searchParams.get("lang") || "fr").split("-")[0].toLowerCase();
    const supported = ["fr", "en", "es", "ar", "de", "it", "id", "ru"];
    const lang = supported.includes(langParam) ? langParam : "fr";

    if (lang === "fr") {
      return fetch(request);
    }

    const cache = typeof caches !== "undefined" && caches.default ? caches.default : null;
    const cacheKey = new Request(url.toString(), request);
    if (cache) {
      const cachedResp = await cache.match(cacheKey);
      if (cachedResp) return cachedResp;
    }

    const response = await fetch(request);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return response;
    }

    const htmlOrig = await response.text();
    const htmlTraduit = await transformerHtmlCompletSSR(htmlOrig, lang, url.pathname);

    const headers = new Headers(response.headers);
    headers.set("content-type", "text/html; charset=utf-8");
    headers.set("content-language", lang);

    const finalResponse = new Response(htmlTraduit, {
      status: response.status,
      statusText: response.statusText,
      headers
    });

    if (cache && ctx && ctx.waitUntil) {
      ctx.waitUntil(cache.put(cacheKey, finalResponse.clone()));
    }
    return finalResponse;
  }
};
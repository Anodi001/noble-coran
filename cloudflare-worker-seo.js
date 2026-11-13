export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const langParam = (url.searchParams.get('lang') || 'fr').split('-')[0].toLowerCase();
    const supported = ['fr', 'en', 'es', 'ar', 'de', 'it', 'id', 'ru'];
    const lang = supported.includes(langParam) ? langParam : 'fr';

    const response = await fetch(request);
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html') || lang === 'fr') {
      return response;
    }

    const mVerse = url.pathname.match(/sourate-(\d+)-verset-(\d+)\.html/i);
    const sNum = mVerse ? mVerse[1] : '';
    const vNum = mVerse ? mVerse[2] : '';
    const pathClean = mVerse ? ('/sourate-' + sNum + '-verset-' + vNum + '.html') : '/';
    const canonicalHref = 'https://corantafsir.com' + pathClean + '?lang=' + lang;

    const titles = {
      en: sNum ? `Surah ${sNum}:${vNum} — Noble Quran, Audio, Word by Word & Tafsir` : 'The Noble Quran & Tafsir Al-Mukhtasar (8 Languages)',
      es: sNum ? `Sura ${sNum}:${vNum} — El Noble Corán, Audio, Palabra por Palabra y Tafsir` : 'El Noble Corán y Tafsir Al-Mukhtasar (8 Idiomas)',
      ar: sNum ? `سورة ${sNum}:${vNum} — القرآن الكريم والتفسير المختصر` : 'القرآن الكريم والتفسير المختصر (8 لغات)',
      de: sNum ? `Sure ${sNum}:${vNum} — Der Edle Koran, Audio, Wort für Wort & Tafsir` : 'Der Edle Koran & Tafsir Al-Mukhtasar (Bubenheim & Elyas)',
      it: sNum ? `Sura ${sNum}:${vNum} — Il Nobile Corano, Audio, Parola per Parola e Tafsir` : 'Il Nobile Corano e Tafsir Al-Mukhtasar (Piccardo)',
      id: sNum ? `Surah ${sNum}:${vNum} — Al-Qur'an Mulia, Audio, Kata demi Kata & Tafsir` : 'Al-Qur\'an Mulia & Tafsir Al-Mukhtasar (Kemenag RI)',
      ru: sNum ? `Сура ${sNum}:${vNum} — Священный Коран, Аудио, Пословный перевод и Тафсир` : 'Священный Коран и Тафсир аль-Мухтасар (Э. Кулиев)'
    };

    const descriptions = {
      en: 'Read and listen to the Noble Quran (6,236 verses) with word-by-word audio tracking, Tajwid, Khatm planner and Tafsir Al-Mukhtasar in 8 languages.',
      es: 'Lea y escuche el Noble Corán (6.236 aleyas) con seguimiento de audio palabra por palabra, Tajwid, planificador Khatm y Tafsir Al-Mukhtasar.',
      ar: 'اقرأ واستمع إلى القرآن الكريم (6236 آية) مع التتبع الصوتي كلمة بكلمة، التجويد المصور، برنامج ختم القرآن والتفسير المختصر.',
      de: 'Lesen und hören Sie den Edlen Koran (6.236 Verse, Übersetzung Bubenheim & Elyas) mit Wort-für-Wort-Audioverfolgung, Tajwid, Leseplaner und Tafsir.',
      it: 'Leggi e ascolta il Nobile Corano (6.236 versetti, traduzione Hamza Roberto Piccardo) con seguito audio parola per parola, Tajwid e Tafsir.',
      id: 'Baca dan dengarkan Al-Qur\'an Mulia (6.236 ayat, Terjemahan Kemenag RI) dengan pelacakan audio kata demi kata, Tajwid, dan Tafsir Al-Mukhtasar.',
      ru: 'Читайте и слушайте Священный Коран (6 236 аятов, перевод Эльмира Кулиева) с пословным аудио-слежением, Таджвидом и Тафсиром аль-Мухтасар.'
    };

    return new HTMLRewriter()
      .on('html', {
        element(el) {
          el.setAttribute('lang', lang);
          el.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        }
      })
      .on('title', {
        element(el) {
          if (titles[lang]) el.setInnerContent(titles[lang]);
        }
      })
      .on('meta[name="description"]', {
        element(el) {
          if (descriptions[lang]) el.setAttribute('content', descriptions[lang]);
        }
      })
      .on('link[rel="canonical"]', {
        element(el) {
          el.setAttribute('href', canonicalHref);
        }
      })
      .transform(response);
  }
};

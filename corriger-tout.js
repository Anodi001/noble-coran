const fs = require('fs');
const path = require('path');

// 1. GENERATION DES PAGES A-PROPOS.HTML ET CONTACT.HTML MULTILINGUES (8 LANGUES + LIENS RELATIFS)
const htmlAProposMultilingue = `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>À propos — INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { background: #050914; color: #f8fafc; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; margin: 0; padding: 24px; line-height: 1.75; }
    .card { max-width: 820px; margin: 40px auto; padding: 40px; background: rgba(15, 23, 42, 0.88); border: 1px solid rgba(56, 189, 248, 0.28); border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.75); }
    .badge { display: inline-block; background: rgba(56, 189, 248, 0.14); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35); padding: 6px 16px; border-radius: 999px; font-size: 0.82rem; font-weight: 800; }
    h1 { color: #38bdf8; font-size: 1.65rem; font-weight: 800; margin: 18px 0 12px 0; }
    h2 { color: #e2e8f0; font-size: 1.18rem; margin-top: 26px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; }
    p, li { color: #cbd5e1; font-size: 0.96rem; }
    .legal-box { background: rgba(2, 6, 23, 0.65); border: 1px solid rgba(56, 189, 248, 0.22); border-radius: 16px; padding: 18px 20px; margin-top: 24px; font-size: 0.88rem; color: #94a3b8; }
    .btn-back { display: inline-block; margin-top: 28px; background: linear-gradient(135deg, #38bdf8, #0ea5e9); color: #021019; text-decoration: none; font-weight: 800; padding: 11px 24px; border-radius: 999px; }
  </style>
</head>
<body>
  <div class="card" id="aboutContainer">
    <span class="badge" id="abBadge">⚖️ Association Loi 1901 à but non lucratif</span>
    <h1>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</h1>
    <p id="abIntro"></p>
    <h2 id="abMissionTitle"></h2>
    <ul id="abList"></ul>
    <div class="legal-box" id="abLegalBox"></div>
    <a href="index.html" class="btn-back" id="abBackBtn">← Retour au portail</a>
  </div>
  <script>
    (function(){
      var T = {
        fr: {
          badge: "⚖️ Association Loi 1901 à but non lucratif",
          intro: "Portail éducatif, linguistique et culturel gratuit et sans publicité commerciale, édité par l'association déclarée <strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong> (RNA : <strong>W343035331</strong> • SIRET : <strong>13288669800019</strong>), dont le siège est situé à Montpellier, France.",
          mTitle: "Notre Mission Éducative & Culturelle",
          items: [
            "<strong>Accès universel et multilingue :</strong> Diffuser gratuitement l'étude des textes fondamentaux et des langues (français, anglais, espagnol, arabe, allemand, italien, indonésien, russe).",
            "<strong>Technologie pédagogique :</strong> Proposer un suivi audio mot à mot synchronisé, la visualisation des règles phonétiques de Tajwīd et l'étude chronologique de la Révélation.",
            "<strong>Exégèse et sources vérifiées :</strong> Présenter pour chaque verset le contexte historique de révélation appuyé sur les sources classiques (<em>Tafsīr Al-Mukhtasar</em>, <em>Ibn Kathīr</em>)."
          ],
          legal: "<strong>Identifiants officiels :</strong> Association Loi 1901 • RNA : W343035331 • SIREN : 132 886 698 • SIRET : 13288669800019<br><strong>Siège social :</strong> Montpellier, France • <strong>Contact :</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;'>contact@corantafsir.com</a>",
          back: "← Retour au portail corantafsir.com"
        },
        en: {
          badge: "⚖️ Non-Profit Organization (French Law 1901)",
          intro: "Free, ad-free educational, linguistic, and cultural portal published by the registered non-profit organization <strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong> (RNA: <strong>W343035331</strong> • SIRET: <strong>13288669800019</strong>), headquartered in Montpellier, France.",
          mTitle: "Our Educational & Cultural Mission",
          items: [
            "<strong>Universal & multilingual access:</strong> Provide free access to the study of foundational texts and languages (French, English, Spanish, Arabic, German, Italian, Indonesian, Russian).",
            "<strong>Educational technology:</strong> Offer synchronized word-by-word audio tracking, visual Tajwīd phonetic rules, and chronological study of the Revelation.",
            "<strong>Verified exegesis & sources:</strong> Present the historical context of revelation supported by classical sources (<em>Tafsīr Al-Mukhtasar</em>, <em>Ibn Kathīr</em>)."
          ],
          legal: "<strong>Official Registration:</strong> Non-profit organization (Law 1901) • RNA: W343035331 • SIREN: 132 886 698 • SIRET: 13288669800019<br><strong>Headquarters:</strong> Montpellier, France • <strong>Contact:</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;'>contact@corantafsir.com</a>",
          back: "← Back to corantafsir.com"
        },
        es: {
          badge: "⚖️ Asociación sin ánimo de lucro (Ley 1901)",
          intro: "Portal educativo, lingüístico y cultural gratuito y sin publicidad comercial, editado por la asociación registrada <strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong> (RNA: <strong>W343035331</strong> • SIRET: <strong>13288669800019</strong>), con sede en Montpellier, Francia.",
          mTitle: "Nuestra Misión Educativa y Cultural",
          items: [
            "<strong>Acceso universal y multilingüe:</strong> Difundir gratuitamente el estudio de los textos fundamentales y los idiomas (francés, inglés, español, árabe, alemán, italiano, indonesio, ruso).",
            "<strong>Tecnología pedagógica:</strong> Ofrecer seguimiento de audio palabra por palabra, reglas fonéticas visuales de Tajwīd y estudio cronológico de la Revelación.",
            "<strong>Exégesis y fuentes verificadas:</strong> Presentar el contexto histórico de revelación respaldado por fuentes clásicas (<em>Tafsīr Al-Mukhtasar</em>, <em>Ibn Kathīr</em>)."
          ],
          legal: "<strong>Registro oficial:</strong> Asociación Ley 1901 • RNA: W343035331 • SIREN: 132 886 698 • SIRET: 13288669800019<br><strong>Sede:</strong> Montpellier, Francia • <strong>Contacto:</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;'>contact@corantafsir.com</a>",
          back: "← Volver al portal corantafsir.com"
        },
        ar: {
          dir: "rtl",
          badge: "⚖️ جمعية غير ربحية (قانون 1901 الفرنسي)",
          intro: "بوابة تعليمية ولغوية وثقافية مجانية وبدون إعلانات تجارية، تصدرها الجمعية المسجلة <strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong> (رقم RNA: <strong>W343035331</strong> • رقم SIRET: <strong>13288669800019</strong>)، ومقرها في مونبلييه، فرنسا.",
          mTitle: "رسالتنا التعليمية والثقافية",
          items: [
            "<strong>وصول عالمي ومتعدد اللغات:</strong> إتاحة دراسة النصوص الأساسية واللغات مجاناً (الفرنسية، الإنجليزية، الإسبانية، العربية، الألمانية، الإيطالية، الإندونيسية، الروسية).",
            "<strong>تقنيات تعليمية تفاعلية:</strong> تتبع صوتي متزامن كلمة بكلمة، وتوضيح أحكام التجويد الملونة، والدراسة الزمنية للوحي.",
            "<strong>تفسير ومصادر موثوقة:</strong> عرض السياق التاريخي وأسباب النزول بالاعتماد على أمهات كتب التفسير (<em>التفسير المختصر</em>، <em>تفسير ابن كثير</em>)."
          ],
          legal: "<strong>المعرفات الرسمية:</strong> جمعية غير ربحية • RNA: W343035331 • SIRET: 13288669800019<br><strong>المقر:</strong> مونبلييه، فرنسا • <strong>التواصل:</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;'>contact@corantafsir.com</a>",
          back: "→ العودة إلى البوابة الرئيسية corantafsir.com"
        },
        de: {
          badge: "⚖️ Gemeinnütziger Verein (Französisches Gesetz 1901)",
          intro: "Kostenloses und werbefreies Bildungs-, Sprach- und Kulturportal, herausgegeben vom eingetragenen gemeinnützigen Verein <strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong> (RNA: <strong>W343035331</strong> • SIRET: <strong>13288669800019</strong>) mit Sitz in Montpellier, Frankreich.",
          mTitle: "Unsere Bildungs- und Kulturmission",
          items: [
            "<strong>Universeller & mehrsprachiger Zugang:</strong> Kostenlose Verbreitung des Studiums grundlegender Texte und Sprachen (Französisch, Englisch, Spanisch, Arabisch, Deutsch, Italienisch, Indonesisch, Russisch).",
            "<strong>Lerntechnologie:</strong> Synchronisierte Wort-für-Wort-Audioverfolgung, visuelle Tajwīd-Regeln und chronologisches Studium der Offenbarung.",
            "<strong>Geprüfte Exegese & Quellen:</strong> Darstellung des historischen Offenbarungskontexts auf Basis klassischer Quellen (<em>Tafsīr Al-Mukhtasar</em>, <em>Ibn Kathīr</em>)."
          ],
          legal: "<strong>Offizielle Registerdaten:</strong> Gemeinnütziger Verein • RNA: W343035331 • SIRET: 13288669800019<br><strong>Sitz:</strong> Montpellier, Frankreich • <strong>Kontakt:</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;'>contact@corantafsir.com</a>",
          back: "← Zurück zum Portal corantafsir.com"
        },
        it: {
          badge: "⚖️ Associazione senza scopo di lucro (Legge 1901)",
          intro: "Portale educativo, linguistico e culturale gratuito e senza pubblicità commerciale, edito dall'associazione registrata <strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong> (RNA: <strong>W343035331</strong> • SIRET: <strong>13288669800019</strong>), con sede a Montpellier, Francia.",
          mTitle: "La Nostra Missione Educativa e Culturale",
          items: [
            "<strong>Accesso universale e multilingue:</strong> Diffondere gratuitamente lo studio dei testi fondamentali e delle lingue (francese, inglese, spagnolo, arabo, tedesco, italiano, indonesiano, russo).",
            "<strong>Tecnologia didattica:</strong> Audio sincronizzato parola per parola, regole fonetiche visive di Tajwīd e studio cronologico della Rivelazione.",
            "<strong>Esegesi e fonti verificate:</strong> Presentare il contesto storico della rivelazione basato sulle fonti classiche (<em>Tafsīr Al-Mukhtasar</em>, <em>Ibn Kathīr</em>)."
          ],
          legal: "<strong>Dati ufficiali:</strong> Associazione Legge 1901 • RNA: W343035331 • SIRET: 13288669800019<br><strong>Sede:</strong> Montpellier, Francia • <strong>Contatto:</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;'>contact@corantafsir.com</a>",
          back: "← Torna al portale corantafsir.com"
        },
        id: {
          badge: "⚖️ Organisasi Nirlaba (UU Prancis 1901)",
          intro: "Portal pendidikan, bahasa, dan budaya gratis tanpa iklan komersial, diterbitkan oleh asosiasi nirlaba terdaftar <strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong> (RNA: <strong>W343035331</strong> • SIRET: <strong>13288669800019</strong>), berkantor pusat di Montpellier, Prancis.",
          mTitle: "Misi Pendidikan & Budaya Kami",
          items: [
            "<strong>Akses universal & multibahasa:</strong> Menyediakan akses gratis untuk mempelajari teks-teks dasar dan bahasa (Prancis, Inggris, Spanyol, Arab, Jerman, Italia, Indonesia, Rusia).",
            "<strong>Teknologi pembelajaran:</strong> Pelacakan audio kata demi kata yang disinkronkan, aturan fonetik Tajwīd visual, dan studi kronologis Wahyu.",
            "<strong>Tafsir & sumber terverifikasi:</strong> Menyajikan konteks sejarah turunnya ayat berdasarkan rujukan klasik (<em>Tafsīr Al-Mukhtasar</em>, <em>Ibn Kathīr</em>)."
          ],
          legal: "<strong>Identitas Resmi:</strong> Organisasi Nirlaba • RNA: W343035331 • SIRET: 13288669800019<br><strong>Kantor Pusat:</strong> Montpellier, Prancis • <strong>Kontak:</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;'>contact@corantafsir.com</a>",
          back: "← Kembali ke portal corantafsir.com"
        },
        ru: {
          badge: "⚖️ Некоммерческая организация (Закон 1901 г.)",
          intro: "Бесплатный образовательный, лингвистический и культурный портал без коммерческой рекламы, издаваемый зарегистрированной некоммерческой ассоциацией <strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong> (RNA: <strong>W343035331</strong> • SIRET: <strong>13288669800019</strong>), расположенной в Монпелье, Франция.",
          mTitle: "Наша образовательная и культурная миссия",
          items: [
            "<strong>Универсальный многоязычный доступ:</strong> Бесплатное изучение фундаментальных текстов и языков (французский, английский, испанский, арабский, немецкий, итальянский, индонезийский, русский).",
            "<strong>Образовательные технологии:</strong> Синхронизированное пословное аудиосопровождение, визуальные правила таджвида и хронологическое изучение Откровения.",
            "<strong>Проверенный тафсир и источники:</strong> Исторический контекст ниспослания на основе классических трудов (<em>Тафсир Аль-Мухтасар</em>, <em>Ибн Касир</em>)."
          ],
          legal: "<strong>Официальные реквизиты:</strong> Ассоциация 1901 г. • RNA: W343035331 • SIRET: 13288669800019<br><strong>Штаб-квартира:</strong> Монпелье, Франция • <strong>Контакт:</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;'>contact@corantafsir.com</a>",
          back: "← Вернуться на портал corantafsir.com"
        }
      };
      var params = new URLSearchParams(window.location.search);
      var lang = (params.get('lang') || localStorage.getItem('coran_lang') || localStorage.getItem('lang') || 'fr').toLowerCase().slice(0,2);
      var d = T[lang] || T.fr;
      document.documentElement.lang = lang;
      document.documentElement.dir = d.dir || 'ltr';
      document.getElementById('abBadge').innerHTML = d.badge;
      document.getElementById('abIntro').innerHTML = d.intro;
      document.getElementById('abMissionTitle').innerHTML = d.mTitle;
      document.getElementById('abList').innerHTML = d.items.map(function(x){ return '<li>' + x + '</li>'; }).join('');
      document.getElementById('abLegalBox').innerHTML = d.legal;
      document.getElementById('abBackBtn').innerHTML = d.back;
    })();
  </script>
</body>
</html>`;

const htmlContactMultilingue = `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact — INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { background: #050914; color: #f8fafc; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; margin: 0; padding: 24px; line-height: 1.75; }
    .card { max-width: 680px; margin: 50px auto; padding: 40px; background: rgba(15, 23, 42, 0.88); border: 1px solid rgba(56, 189, 248, 0.28); border-radius: 24px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.75); }
    h1 { color: #38bdf8; font-size: 1.7rem; font-weight: 800; margin-bottom: 12px; }
    p { color: #cbd5e1; font-size: 0.96rem; }
    .mail-box { background: rgba(2, 6, 23, 0.75); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 18px; padding: 24px; margin: 26px 0; }
    .mail-link { color: #38bdf8; font-size: 1.25rem; font-weight: 800; text-decoration: none; }
    .btn-back { display: inline-block; margin-top: 18px; background: linear-gradient(135deg, #38bdf8, #0ea5e9); color: #021019; text-decoration: none; font-weight: 800; padding: 11px 24px; border-radius: 999px; }
  </style>
</head>
<body>
  <div class="card">
    <h1 id="ctTitle">Contactez notre Institut</h1>
    <p id="ctDesc"></p>
    <div class="mail-box">
      <div id="ctLabel" style="font-size:0.85rem;color:#94a3b8;margin-bottom:8px;"></div>
      <a href="mailto:contact@corantafsir.com" class="mail-link">contact@corantafsir.com</a>
    </div>
    <p id="ctFooter" style="font-size:0.84rem;color:#94a3b8;"></p>
    <a href="index.html" class="btn-back" id="ctBack">← Retour à l'accueil</a>
  </div>
  <script>
    (function(){
      var T = {
        fr: { title: "Contactez notre Institut", desc: "Pour toute question pédagogique, linguistique, technique ou institutionnelle concernant le portail <strong>corantafsir.com</strong> :", label: "Courriel officiel de l'association :", footer: "<strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong><br>Association Loi 1901 à but non lucratif • RNA : W343035331 • SIRET : 13288669800019<br>Siège : Montpellier, France", back: "← Retour à l'accueil" },
        en: { title: "Contact Our Institute", desc: "For any educational, linguistic, technical, or institutional inquiry regarding the <strong>corantafsir.com</strong> portal:", label: "Official organization email:", footer: "<strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong><br>Non-profit organization (Law 1901) • RNA: W343035331 • SIRET: 13288669800019<br>Headquarters: Montpellier, France", back: "← Back to Home" },
        es: { title: "Contacte con nuestro Instituto", desc: "Para cualquier consulta pedagógica, lingüística, técnica o institucional sobre el portal <strong>corantafsir.com</strong>:", label: "Correo electrónico oficial de la asociación:", footer: "<strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong><br>Asociación sin ánimo de lucro (Ley 1901) • RNA: W343035331 • SIRET: 13288669800019<br>Sede: Montpellier, Francia", back: "← Volver al inicio" },
        ar: { dir: "rtl", title: "اتصل بمعهدنا", desc: "لأي استفسار تعليمي أو لغوي أو تقني أو مؤسسي بخصوص بوابة <strong>corantafsir.com</strong>:", label: "البريد الإلكتروني الرسمي للجمعية:", footer: "<strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong><br>جمعية غير ربحية (قانون 1901) • RNA: W343035331 • SIRET: 13288669800019<br>المقر: مونبلييه، فرنسا", back: "→ العودة إلى الصفحة الرئيسية" },
        de: { title: "Kontaktieren Sie unser Institut", desc: "Für pädagogische, sprachliche, technische oder institutionelle Fragen zum Portal <strong>corantafsir.com</strong>:", label: "Offizielle E-Mail-Adresse des Vereins:", footer: "<strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong><br>Gemeinnütziger Verein (Gesetz 1901) • RNA: W343035331 • SIRET: 13288669800019<br>Sitz: Montpellier, Frankreich", back: "← Zurück zur Startseite" },
        it: { title: "Contatta il nostro Istituto", desc: "Per qualsiasi domanda didattica, linguistica, tecnica o istituzionale riguardante il portale <strong>corantafsir.com</strong>:", label: "Email ufficiale dell'associazione:", footer: "<strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong><br>Associazione senza scopo di lucro (Legge 1901) • RNA: W343035331 • SIRET: 13288669800019<br>Sede: Montpellier, Francia", back: "← Torna alla Home" },
        id: { title: "Hubungi Institut Kami", desc: "Untuk pertanyaan pendidikan, bahasa, teknis, atau kelembagaan terkait portal <strong>corantafsir.com</strong>:", label: "Email resmi organisasi:", footer: "<strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong><br>Organisasi Nirlaba (UU 1901) • RNA: W343035331 • SIRET: 13288669800019<br>Kantor Pusat: Montpellier, Prancis", back: "← Kembali ke Beranda" },
        ru: { title: "Свяжитесь с нашим Институтом", desc: "По любым образовательным, лингвистическим, техническим или организационным вопросам, касающимся портала <strong>corantafsir.com</strong>:", label: "Официальный email ассоциации:", footer: "<strong>INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX</strong><br>Некоммерческая ассоциация (Закон 1901 г.) • RNA: W343035331 • SIRET: 13288669800019<br>Штаб-квартира: Монпелье, Франция", back: "← Вернуться на главную" }
      };
      var params = new URLSearchParams(window.location.search);
      var lang = (params.get('lang') || localStorage.getItem('coran_lang') || localStorage.getItem('lang') || 'fr').toLowerCase().slice(0,2);
      var d = T[lang] || T.fr;
      document.documentElement.lang = lang;
      document.documentElement.dir = d.dir || 'ltr';
      document.getElementById('ctTitle').innerHTML = d.title;
      document.getElementById('ctDesc').innerHTML = d.desc;
      document.getElementById('ctLabel').innerHTML = d.label;
      document.getElementById('ctFooter').innerHTML = d.footer;
      document.getElementById('ctBack').innerHTML = d.back;
    })();
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'a-propos.html'), htmlAProposMultilingue, 'utf8');
fs.writeFileSync(path.join(__dirname, 'contact.html'), htmlContactMultilingue, 'utf8');
if (fs.existsSync(path.join(__dirname, 'site'))) {
  fs.writeFileSync(path.join(__dirname, 'site', 'a-propos.html'), htmlAProposMultilingue, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'site', 'contact.html'), htmlContactMultilingue, 'utf8');
}

// 2. MODULE CLIENT PROPRE (SANS TIKTOK STUDIO) : MENTIONS LEGALES + A PROPOS + CONTACT EN 8 LANGUES
function moduleInstitutionnelMultilingueV122() {
  var TRAD_LEGAL_8 = {
    fr: {
      btnLegal: "Mentions légales",
      btnAbout: "🏛️ À propos",
      btnContact: "✉️ Contact",
      title: "⚖️ Mentions légales",
      intro: "Portail éducatif, linguistique et culturel gratuit (sans publicité commerciale) édité par l'Association Loi 1901 à but non lucratif :",
      status: "<strong>Association loi 1901 à but non lucratif</strong> • RNA : <strong>W343035331</strong> • SIRET : <strong>13288669800019</strong>",
      objet: "<strong>Objet :</strong> Rendre accessibles à tous la culture, les langues (français, anglais, espagnol, arabe, allemand, italien, indonésien, russe) ainsi que les études historiques et exégétiques des textes fondamentaux grâce à des supports numériques gratuits et sans publicité commerciale.",
      siege: "<strong>Siège :</strong> Montpellier, France • <strong>Hébergement :</strong> Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA)",
      contact: "<strong>Contact officiel :</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;text-decoration:none;font-weight:700;'>contact@corantafsir.com</a>",
      close: "Fermer"
    },
    en: {
      btnLegal: "Legal Notice",
      btnAbout: "🏛️ About",
      btnContact: "✉️ Contact",
      title: "⚖️ Legal Notice",
      intro: "Free educational, linguistic, and cultural portal (without commercial advertising) published by the non-profit organization:",
      status: "<strong>Non-profit organization (French Law 1901)</strong> • RNA: <strong>W343035331</strong> • SIRET: <strong>13288669800019</strong>",
      objet: "<strong>Purpose:</strong> To make culture, languages (French, English, Spanish, Arabic, German, Italian, Indonesian, Russian), as well as historical and exegetical studies of foundational texts accessible to everyone through free, ad-free digital resources.",
      siege: "<strong>Headquarters:</strong> Montpellier, France • <strong>Hosting:</strong> Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA)",
      contact: "<strong>Official Contact:</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;text-decoration:none;font-weight:700;'>contact@corantafsir.com</a>",
      close: "Close"
    },
    es: {
      btnLegal: "Aviso legal",
      btnAbout: "🏛️ Acerca de",
      btnContact: "✉️ Contacto",
      title: "⚖️ Aviso legal",
      intro: "Portal educativo, lingüístico y cultural gratuito (sin publicidad comercial) editado por la asociación sin ánimo de lucro:",
      status: "<strong>Asociación sin ánimo de lucro (Ley 1901)</strong> • RNA: <strong>W343035331</strong> • SIRET: <strong>13288669800019</strong>",
      objet: "<strong>Objeto:</strong> Hacer accesibles a todos la cultura, los idiomas (francés, inglés, español, árabe, alemán, italiano, indonesio, ruso), así como los estudios históricos y exegéticos de los textos fundamentales mediante soportes digitales gratuitos y sin publicidad comercial.",
      siege: "<strong>Sede:</strong> Montpellier, Francia • <strong>Alojamiento:</strong> Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA)",
      contact: "<strong>Contacto oficial:</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;text-decoration:none;font-weight:700;'>contact@corantafsir.com</a>",
      close: "Cerrar"
    },
    ar: {
      dir: "rtl",
      btnLegal: "الإشعار القانوني",
      btnAbout: "🏛️ من نحن",
      btnContact: "✉️ اتصل بنا",
      title: "⚖️ الإشعار القانوني",
      intro: "بوابة تعليمية ولغوية وثقافية مجانية (بدون إعلانات تجارية) تصدرها الجمعية غير الربحية:",
      status: "<strong>جمعية غير ربحية (قانون 1901 الفرنسي)</strong> • RNA: <strong>W343035331</strong> • SIRET: <strong>13288669800019</strong>",
      objet: "<strong>الهدف:</strong> إتاحة الثقافة واللغات (الفرنسية، الإنجليزية، الإسبانية، العربية، الألمانية، الإيطالية، الإندونيسية، الروسية) والدراسات التاريخية والتفسيرية للنصوص الأساسية للجميع عبر وسائط رقمية مجانية وبدون إعلانات تجارية.",
      siege: "<strong>المقر:</strong> مونبلييه، فرنسا • <strong>الاستضافة:</strong> Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA)",
      contact: "<strong>التواصل الرسمي:</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;text-decoration:none;font-weight:700;'>contact@corantafsir.com</a>",
      close: "إغلاق"
    },
    de: {
      btnLegal: "Impressum",
      btnAbout: "🏛️ Über uns",
      btnContact: "✉️ Kontakt",
      title: "⚖️ Impressum",
      intro: "Kostenloses Bildungs-, Sprach- und Kulturportal (ohne kommerzielle Werbung), herausgegeben vom gemeinnützigen Verein:",
      status: "<strong>Gemeinnütziger Verein (Gesetz 1901)</strong> • RNA: <strong>W343035331</strong> • SIRET: <strong>13288669800019</strong>",
      objet: "<strong>Zweck:</strong> Kultur, Sprachen (Französisch, Englisch, Spanisch, Arabisch, Deutsch, Italienisch, Indonesisch, Russisch) sowie historische und exegetische Studien grundlegender Texte durch kostenlose und werbefreie digitale Medien für alle zugänglich zu machen.",
      siege: "<strong>Sitz:</strong> Montpellier, Frankreich • <strong>Hosting:</strong> Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA)",
      contact: "<strong>Offizieller Kontakt:</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;text-decoration:none;font-weight:700;'>contact@corantafsir.com</a>",
      close: "Schließen"
    },
    it: {
      btnLegal: "Note legali",
      btnAbout: "🏛️ Chi siamo",
      btnContact: "✉️ Contatto",
      title: "⚖️ Note legali",
      intro: "Portale educativo, linguistico e culturale gratuito (senza pubblicità commerciale) edito dall'associazione senza scopo di lucro:",
      status: "<strong>Associazione senza scopo di lucro (Legge 1901)</strong> • RNA: <strong>W343035331</strong> • SIRET: <strong>13288669800019</strong>",
      objet: "<strong>Oggetto:</strong> Rendere accessibili a tutti la cultura, le lingue (francese, inglese, spagnolo, arabo, tedesco, italiano, indonesiano, russo) e gli studi storici ed esegetici dei testi fondamentali tramite supporti digitali gratuiti e senza pubblicità commerciale.",
      siege: "<strong>Sede:</strong> Montpellier, Francia • <strong>Hosting:</strong> Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA)",
      contact: "<strong>Contatto ufficiale:</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;text-decoration:none;font-weight:700;'>contact@corantafsir.com</a>",
      close: "Chiudi"
    },
    id: {
      btnLegal: "Catatan hukum",
      btnAbout: "🏛️ Tentang kami",
      btnContact: "✉️ Kontak",
      title: "⚖️ Catatan hukum",
      intro: "Portal pendidikan, bahasa, dan budaya gratis (tanpa iklan komersial) yang diterbitkan oleh organisasi nirlaba:",
      status: "<strong>Organisasi nirlaba (UU 1901 Prancis)</strong> • RNA: <strong>W343035331</strong> • SIRET: <strong>13288669800019</strong>",
      objet: "<strong>Tujuan:</strong> Menjadikan budaya, bahasa (Prancis, Inggris, Spanyol, Arab, Jerman, Italia, Indonesia, Rusia), serta studi sejarah dan tafsir teks-teks dasar dapat diakses oleh semua orang melalui media digital gratis tanpa iklan komersial.",
      siege: "<strong>Kantor Pusat:</strong> Montpellier, Prancis • <strong>Hosting:</strong> Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA)",
      contact: "<strong>Kontak resmi:</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;text-decoration:none;font-weight:700;'>contact@corantafsir.com</a>",
      close: "Tutup"
    },
    ru: {
      btnLegal: "Правовая информация",
      btnAbout: "🏛️ О нас",
      btnContact: "✉️ Контакты",
      title: "⚖️ Правовая информация",
      intro: "Бесплатный образовательный, лингвистический и культурный портал (без коммерческой рекламы), издаваемый некоммерческой организацией:",
      status: "<strong>Некоммерческая ассоциация (Закон 1901 г.)</strong> • RNA: <strong>W343035331</strong> • SIRET: <strong>13288669800019</strong>",
      objet: "<strong>Цель:</strong> Сделать культуру, языки (французский, английский, испанский, арабский, немецкий, итальянский, индонезийский, русский), а также исторические и экзегетические исследования фундаментальных текстов доступными для всех с помощью бесплатных цифровых ресурсов без рекламы.",
      siege: "<strong>Штаб-квартира:</strong> Монпелье, Франция • <strong>Хостинг:</strong> Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA)",
      contact: "<strong>Официальный контакт:</strong> <a href='mailto:contact@corantafsir.com' style='color:#38bdf8;text-decoration:none;font-weight:700;'>contact@corantafsir.com</a>",
      close: "Закрыть"
    }
  };

  function detecterLangueActive() {
    if (window.__coranLangOverride && TRAD_LEGAL_8[window.__coranLangOverride]) {
      return window.__coranLangOverride;
    }
    var h1 = document.querySelector('h1');
    var t = h1 ? (h1.textContent || '') : '';
    if (t.indexOf('THE NOBLE QURAN') !== -1) return 'en';
    if (t.indexOf('EL NOBLE COR') !== -1) return 'es';
    if (t.indexOf('القرآن') !== -1) return 'ar';
    if (t.indexOf('DER EDLE') !== -1) return 'de';
    if (t.indexOf('IL NOBILE CORANO') !== -1) return 'it';
    if (t.indexOf('AL-QUR') !== -1 && t.indexOf('MULIA') !== -1) return 'id';
    if (t.indexOf('СВЯЩЕННЫЙ') !== -1) return 'ru';
    if (t.indexOf('LE NOBLE CORAN') !== -1) return 'fr';

    var htmlLang = (document.documentElement.lang || '').toLowerCase().slice(0, 2);
    if (TRAD_LEGAL_8[htmlLang]) return htmlLang;
    return 'fr';
  }

  function trouverBoutonMentionsLegales() {
    var byId = document.getElementById('legalBtn') || document.getElementById('openLegalBtn') || document.querySelector('[onclick*="legal"], [onclick*="Legal"]');
    if (byId) return byId;
    var btns = document.querySelectorAll('button, a');
    var cles = ['Mentions l', 'Legal Notice', 'Aviso legal', 'الإشعار القانوني', 'Impressum', 'Note legali', 'Catatan hukum', 'Правовая информация'];
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      if (b.id === 'wbwAboutLinkV122' || b.id === 'wbwContactLinkV122') continue;
      var txt = (b.textContent || '').trim();
      for (var k = 0; k < cles.length; k++) {
        if (txt.indexOf(cles[k]) !== -1) return b;
      }
    }
    return null;
  }

  function ouvrirModaleMentionsLegalesV122(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();

    // Fermer toute ancienne modale cassée si elle était ouverte
    var oldModals = document.querySelectorAll('#legalModal, .legal-modal-overlay, #wbwLegalModalV122');
    for (var m = 0; m < oldModals.length; m++) {
      if (oldModals[m].id === 'wbwLegalModalV122') oldModals[m].remove();
      else oldModals[m].style.display = 'none';
    }

    var lang = detecterLangueActive();
    var d = TRAD_LEGAL_8[lang] || TRAD_LEGAL_8.fr;

    var overlay = document.createElement('div');
    overlay.id = 'wbwLegalModalV122';
    overlay.dir = d.dir || 'ltr';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,23,0.82);backdrop-filter:blur(8px);z-index:100200;display:flex;align-items:center;justify-content:center;padding:18px;font-family:"Plus Jakarta Sans",system-ui,sans-serif;';

    overlay.innerHTML =
      '<div style="width:100%;max-width:520px;background:#081121;border:1px solid rgba(56,189,248,0.38);border-radius:24px;padding:28px 26px;text-align:center;color:#f8fafc;box-shadow:0 25px 60px rgba(0,0,0,0.85);">' +
        '<h2 style="margin:0 0 14px 0;color:#38bdf8;font-size:1.3rem;font-weight:800;">' + d.title + '</h2>' +
        '<p style="margin:0 0 12px 0;color:#cbd5e1;font-size:0.9rem;line-height:1.6;">' + d.intro + '</p>' +
        '<div style="color:#38bdf8;font-weight:800;font-size:0.98rem;margin-bottom:14px;line-height:1.45;">« INSTITUT NUMÉRIQUE CULTURE, LANGUES ET TEXTES FONDAMENTAUX »</div>' +
        '<div style="background:rgba(15,23,42,0.75);border:1px solid rgba(56,189,248,0.22);border-radius:16px;padding:16px;font-size:0.83rem;color:#cbd5e1;line-height:1.65;margin-bottom:20px;">' +
          '<div>' + d.status + '</div>' +
          '<div style="margin-top:6px;">' + d.objet + '</div>' +
          '<div style="margin-top:6px;">' + d.siege + '</div>' +
          '<div style="margin-top:6px;">' + d.contact + '</div>' +
        '</div>' +
        '<button type="button" id="wbwCloseLegalV122" style="width:100%;background:linear-gradient(135deg,#38bdf8,#0284c7);color:#021019;border:none;border-radius:12px;padding:11px;font-weight:800;font-size:0.92rem;cursor:pointer;">' + d.close + '</button>' +
      '</div>';

    document.body.appendChild(overlay);
    document.getElementById('wbwCloseLegalV122').onclick = function() { overlay.remove(); };
    overlay.onclick = function(ev) { if (ev.target === overlay) overlay.remove(); };
  }

  function synchroniserFooterEtBoutonsLangue() {
    // Nettoyer tout ancien bouton TikTok ou ancien conteneur s'il en reste dans le DOM
    var restesTikTok = document.querySelectorAll('#wbwTikTokStudioBtnV121, #wbwTikTokStudioBtnV120, #wbwTikTokBtnV119, #wbwVideoGenBtnV118, #wbwInstitutionalLinksV120, #wbwInstitutionalLinksV121');
    for (var r = 0; r < restesTikTok.length; r++) restesTikTok[r].remove();

    // Surveiller le clic sur les boutons de langue du header (FR, EN, ES, AR, DE, IT, ID, RU)
    var codeLangues = ['fr', 'en', 'es', 'ar', 'de', 'it', 'id', 'ru'];
    var tousElements = document.querySelectorAll('button, a, span');
    for (var i = 0; i < tousElements.length; i++) {
      var el = tousElements[i];
      if (el.__wbwLangBoundV122) continue;
      var txt = (el.textContent || '').trim().toLowerCase();
      for (var c = 0; c < codeLangues.length; c++) {
        var code = codeLangues[c];
        if (txt === code || txt.indexOf(' ' + code) !== -1) {
          el.__wbwLangBoundV122 = true;
          (function(codeChoisi) {
            el.addEventListener('click', function() {
              window.__coranLangOverride = codeChoisi;
              try { localStorage.setItem('coran_lang', codeChoisi); } catch (e) {}
              setTimeout(synchroniserFooterEtBoutonsLangue, 40);
            });
          })(code);
          break;
        }
      }
    }

    var lang = detecterLangueActive();
    try { localStorage.setItem('coran_lang', lang); } catch (e) {}
    var d = TRAD_LEGAL_8[lang] || TRAD_LEGAL_8.fr;

    var btnMentions = trouverBoutonMentionsLegales();
    if (!btnMentions || !btnMentions.parentElement) return;

    btnMentions.textContent = d.btnLegal;
    btnMentions.onclick = ouvrirModaleMentionsLegalesV122;

    var wrap = document.getElementById('wbwInstitutionalLinksV122');
    if (!wrap) {
      wrap = document.createElement('span');
      wrap.id = 'wbwInstitutionalLinksV122';
      wrap.style.cssText = 'display:inline-flex;align-items:center;gap:10px;margin-left:10px;flex-wrap:wrap;justify-content:center;';
      btnMentions.parentElement.insertBefore(wrap, btnMentions.nextSibling);
    }

    var stylePill = 'background:rgba(15,23,42,0.78);color:#cbd5e1;border:1px solid rgba(56,189,248,0.3);padding:6px 14px;border-radius:999px;font-size:0.78rem;font-weight:700;text-decoration:none;transition:all 0.2s ease;display:inline-flex;align-items:center;gap:5px;';
    wrap.innerHTML =
      '<a id="wbwAboutLinkV122" href="a-propos.html?lang=' + lang + '" style="' + stylePill + '">' + d.btnAbout + '</a>' +
      '<a id="wbwContactLinkV122" href="contact.html?lang=' + lang + '" style="' + stylePill + '">' + d.btnContact + '</a>';
  }

  window.__wbwInitInstitutionnelV122 = synchroniserFooterEtBoutonsLangue;
  synchroniserFooterEtBoutonsLangue();
  setInterval(synchroniserFooterEtBoutonsLangue, 900);
}

// 3. NETTOYAGE DE PATCH-MOT-A-MOT.JS (SUPPRESSION TOTALE DE TIKTOK STUDIO)
const cheminPatch = path.join(__dirname, 'patch-mot-a-mot.js');
if (!fs.existsSync(cheminPatch)) {
  console.error('Erreur : patch-mot-a-mot.js introuvable.');
  process.exit(1);
}

let patchTxt = fs.readFileSync(cheminPatch, 'utf8');

// Supprimer tout bloc V120 / V121 / V122 précédent
const marqueurDebut = '/* === LIENS A PROPOS';
const marqueurFin = 'function verifierChangementVersetEtPause() {';
const idxDebut = patchTxt.indexOf(marqueurDebut);
const idxFin = patchTxt.indexOf(marqueurFin);

if (idxDebut !== -1 && idxFin !== -1 && idxFin > idxDebut) {
  let apresFin = patchTxt.slice(idxFin + marqueurFin.length);
  apresFin = apresFin.replace(/^\s*if\s*\(window\.__wbwInitStudioTikTokV121\)\s*window\.__wbwInitStudioTikTokV121\(\);/, '');
  apresFin = apresFin.replace(/^\s*if\s*\(window\.__wbwInitInstitutionnelV122\)\s*window\.__wbwInitInstitutionnelV122\(\);/, '');
  apresFin = apresFin.replace(/^\s*injecterLiensFooterPropres\(\);\s*creerBoutonTikTokStudioV120\(\);/, '');
  patchTxt = patchTxt.slice(0, idxDebut) + marqueurFin + apresFin;
}

const codeClientPropre = '\n  /* === LIENS A PROPOS & MENTIONS MULTILINGUES V122 (SANS TIKTOK) === */\n  (' + moduleInstitutionnelMultilingueV122.toString() + ')();\n';

new Function(codeClientPropre);

patchTxt = patchTxt.replace(
  'function verifierChangementVersetEtPause() {',
  function() {
    return codeClientPropre + '  function verifierChangementVersetEtPause() {\n    if (window.__wbwInitInstitutionnelV122) window.__wbwInitInstitutionnelV122();';
  }
);

fs.writeFileSync(cheminPatch, patchTxt, 'utf8');
console.log('✅ 1/3 : Studio TikTok supprimé et module multilingue V122 intégré dans patch-mot-a-mot.js !');

// 4. INJECTION DIRECTE DANS INDEX.HTML ET SITE/INDEX.HTML (POUR QUE L ACCUEIL FONCTIONNE EN LOCAL ET EN LIGNE)
function mettreAJourIndexAccueil(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');
  html = html.replace(/<script id="wbwInstitutionnelAccueilV122">[\s\S]*?<\/script>/g, '');
  const baliseScript = '<script id="wbwInstitutionnelAccueilV122">(' + moduleInstitutionnelMultilingueV122.toString() + ')();</script>';
  if (html.indexOf('</body>') !== -1) {
    html = html.replace('</body>', baliseScript + '\n</body>');
    fs.writeFileSync(filePath, html, 'utf8');
  }
}

mettreAJourIndexAccueil(path.join(__dirname, 'index.html'));
mettreAJourIndexAccueil(path.join(__dirname, 'site', 'index.html'));
console.log('✅ 2/3 : Page d accueil (index.html) et pages a-propos.html / contact.html corrigées en 8 langues !');

// 5. RELANCER PATCH-MOT-A-MOT.JS SUR LES 6 238 PAGES DE VERSETS
require(cheminPatch);
console.log('✅ 3/3 : Les 6 238 pages de versets ont été nettoyées et mises à jour !');
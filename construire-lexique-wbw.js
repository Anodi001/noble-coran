/* ONEDRIVE_SAFE */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function writeSafe(p, d) {
  for (let i = 0; i < 15; i++) {
    try { fs.writeFileSync(p, d, 'utf8'); return; }
    catch (e) {
      if (i === 14) throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80);
    }
  }
}

const dossierSite = path.join(__dirname, 'site');
const lexiquePath = path.join(dossierSite, 'lexique-wbw-fr.json');
const versetJsPath = path.join(dossierSite, 'assets', 'verset.js');
const swPath = path.join(dossierSite, 'sw.js');
const workerPath = path.join(dossierSite, '_worker.js');

// ============================================================================
// 1. LEXIQUE STATIQUE CORANIQUE VERIFIE (site/lexique-wbw-fr.json)
// ============================================================================
const LEXIQUE_WBW_FR = {
  version: 1,
  versets: {
    "1:1": ["Au nom", "d'Allah", "le Tout Miséricordieux", "le Très Miséricordieux"],
    "1:2": ["Louange", "à Allah", "Seigneur", "des mondes"],
    "1:3": ["Le Tout Miséricordieux", "le Très Miséricordieux"],
    "1:4": ["Maître", "du Jour", "de la Rétribution"],
    "1:5": ["C'est Toi [Seul]", "que nous adorons", "et c'est Toi [Seul]", "dont nous implorons secours"],
    "1:6": ["Guide-nous", "dans le chemin", "droit"],
    "1:7": ["le chemin", "de ceux que", "Tu as comblés de faveurs", "sur eux", "non pas de ceux", "qui ont encouru Ta colère", "sur eux", "et non", "des égarés"],
    "2:1": ["Alif, Lam, Mim"],
    "2:2": ["C'est", "le Livre", "il n'y a aucun", "doute", "en lui", "un guide", "pour les pieux"],
    "2:3": ["Ceux qui", "croient", "en l'Invisible", "et accomplissent", "la Salât", "et de ce que", "Nous leur avons attribué", "dépensent"],
    "2:4": ["Et ceux qui", "croient", "en ce qui", "a été révélé", "vers toi", "et ce qui", "a été révélé", "avant", "toi", "et quant à l'Au-delà", "eux", "ont la certitude"],
    "2:5": ["Ceux-là", "sont sur", "une guidée", "de", "leur Seigneur", "et ceux-là", "eux", "sont ceux qui réussissent"],
    "2:255": [
      "Allah", "nulle", "divinité", "sauf", "Lui", "le Vivant", "l'Absolu (Qui subsiste par Lui-même)",
      "ne", "Le saisit", "somnolence", "ni", "sommeil", "à Lui", "ce qui est", "dans", "les cieux",
      "et ce qui est", "sur", "la terre", "qui", "est celui", "qui intercède", "auprès de Lui", "sauf",
      "avec Sa permission", "Il sait", "ce qui est", "devant", "eux", "et ce qui est", "derrière eux",
      "et ils n'embrassent", "rien", "de", "Sa science", "sauf", "ce qu'", "Il veut",
      "Son Trône (Kursī)", "déborde", "les cieux", "et la terre", "et ne", "Lui pèse", "leur préservation",
      "et Il est", "le Très-Haut", "l'Immense"
    ],
    "10:92": ["Nous allons aujourd'hui", "épargner", "ton corps", "afin que tu sois", "pour ceux qui", "viendront après toi", "un signe", "et certes", "beaucoup", "parmi", "les gens", "de", "Nos signes", "sont certes insouciants"],
    "96:1": ["Lis", "au nom", "de ton Seigneur", "qui", "a créé"],
    "96:2": ["Il a créé", "l'homme", "d'une", "adhérence"],
    "96:3": ["Lis", "et ton Seigneur", "est le Très Généreux"],
    "96:4": ["Qui", "a enseigné", "par la plume"],
    "96:5": ["Il a enseigné", "à l'homme", "ce qu'", "il ne", "savait pas"],
    "108:1": ["Certes Nous", "t'avons accordé", "Al-Kawthar (l'abondance)"],
    "108:2": ["Accomplis donc la Salât", "pour ton Seigneur", "et sacrifie"],
    "108:3": ["Certes", "celui qui te hait", "lui", "sera sans postérité"],
    "109:1": ["Dis", "Ô", "les mécréants"],
    "109:2": ["Je ne", "adore pas", "ce que", "vous adorez"],
    "109:3": ["Et non", "vous", "n'êtes adorateurs", "de ce que", "j'adore"],
    "109:4": ["Et non", "je", "ne suis adorateur", "de ce que", "vous avez adoré"],
    "109:5": ["Et non", "vous", "n'êtes adorateurs", "de ce que", "j'adore"],
    "109:6": ["À vous", "votre religion", "et à moi", "ma religion"],
    "110:1": ["Lorsque", "vient", "le secours", "d'Allah", "et la victoire"],
    "110:2": ["Et que tu vois", "les gens", "entrer", "dans", "la religion", "d'Allah", "en foule"],
    "110:3": ["Glorifie alors", "par la louange", "de ton Seigneur", "et implore Son pardon", "certes Il", "est", "Accueillant au repentir"],
    "111:1": ["Que périssent", "les deux mains", "d'Abū", "Lahab", "et qu'il périsse"],
    "111:2": ["Ne", "lui a pas profité", "sa richesse", "ni ce qu'", "il a acquis"],
    "111:3": ["Il brûlera", "dans un feu", "plein de", "flammes"],
    "111:4": ["Et son épouse", "la porteuse", "de bois"],
    "111:5": ["À", "son cou", "une corde", "de", "fibres"],
    "112:1": ["Dis", "Il est", "Allah", "Unique"],
    "112:2": ["Allah", "le Seul à être imploré (As-Samad)"],
    "112:3": ["Il n'a pas", "engendré", "et n'a pas", "été engendré"],
    "112:4": ["Et n'a", "pas été", "pour Lui", "d'égal", "nul"],
    "113:1": ["Dis", "je cherche refuge", "auprès du Seigneur", "de l'aube naissante"],
    "113:2": ["contre", "le mal", "de ce qu'", "Il a créé"],
    "113:3": ["et contre", "le mal", "de l'obscurité", "quand", "elle s'approfondit"],
    "113:4": ["et contre", "le mal", "de celles qui soufflent", "sur", "les nœuds"],
    "113:5": ["et contre", "le mal", "d'un envieux", "quand", "il envie"],
    "114:1": ["Dis", "je cherche refuge", "auprès du Seigneur", "des hommes"],
    "114:2": ["Le Souverain", "des hommes"],
    "114:3": ["Le Dieu", "des hommes"],
    "114:4": ["contre", "le mal", "du mauvais conseiller", "furtif"],
    "114:5": ["celui qui", "souffle le mal", "dans", "les poitrines", "des hommes"],
    "114:6": ["qu'il soit parmi", "les djinns", "et les hommes"]
  },

  // Formes arabes normalisées (strictement univoques, sans homographes ambigus)
  ar: {
    "الله": "Allah", "لله": "à Allah", "بالله": "en Allah", "والله": "et Allah", "فالله": "Allah donc",
    "تالله": "par Allah", "اللهم": "Ô Allah",
    "الرحمن": "le Tout Miséricordieux", "الرحيم": "le Très Miséricordieux",
    "العالمين": "des mondes", "العلمين": "des mondes",
    "الذين": "Ceux qui", "والذين": "et ceux qui", "للذين": "pour ceux qui", "بالذين": "par ceux qui",
    "الذي": "Celui qui", "والذي": "et celui qui", "للذي": "à celui qui",
    "التي": "celle qui", "اللاتي": "celles qui", "اللايي": "celles qui",
    "اوليك": "Ceux-là", "اولئك": "Ceux-là", "واوليك": "et ceux-là", "واولئك": "et ceux-là", "فاوليك": "ceux-là donc",
    "مما": "de ce que", "ومما": "et de ce que", "عما": "de ce que", "فيما": "dans ce que",
    "يومنون": "croient", "يؤمنون": "croient", "تومنون": "vous croyez", "تؤمنون": "vous croyez",
    "امنوا": "ont cru", "ءامنوا": "ont cru", "وامنوا": "et ont cru",
    "بالغيب": "en l'Invisible", "الغيب": "l'Invisible",
    "ويقيمون": "et accomplissent", "يقيمون": "accomplissent", "اقيموا": "accomplissez",
    "الصلوه": "la Salât", "الصلاه": "la Salât", "الزكوه": "la Zakât", "الزكاه": "la Zakât",
    "ينفقون": "dépensent", "وينفقون": "et dépensent", "انفقوا": "dépensez",
    "رزقنهم": "Nous leur avons attribué", "رزقناهم": "Nous leur avons attribué",
    "يوقنون": "ont la certitude", "المفلحون": "ceux qui réussissent", "المفلحين": "ceux qui réussissent",
    "للمتقين": "pour les pieux", "المتقين": "les pieux", "المتقون": "les pieux",
    "المومنين": "les croyants", "المؤمنين": "les croyants", "المومنون": "les croyants", "للمومنين": "pour les croyants",
    "المومنات": "les croyantes", "المومنت": "les croyantes",
    "الكافرين": "les mécréants", "الكفرين": "les mécréants", "الكافرون": "les mécréants", "للكافرين": "pour les mécréants",
    "الظالمين": "les injustes", "الظلمين": "les injustes", "الظالمون": "les injustes",
    "المنافقين": "les hypocrites", "المنفقين": "les hypocrites", "المنافقون": "les hypocrites",
    "المشركين": "les polythéistes", "المشركون": "les polythéistes",
    "الفاسقين": "les pervers", "الفسقين": "les pervers", "الفاسقون": "les pervers",
    "الصالحين": "les vertueux", "الصلحين": "les vertueux", "الصالحات": "les bonnes œuvres", "الصلحت": "les bonnes œuvres",
    "الصادقين": "les véridiques", "الصدقين": "les véridiques", "صادقين": "véridiques",
    "الصابرين": "les endurants", "الصبرين": "les endurants", "المحسنين": "les bienfaisants",
    "السماوات": "les cieux", "السموات": "les cieux", "السموت": "les cieux", "السماء": "le ciel",
    "الارض": "la terre", "والارض": "et la terre", "الارضين": "les terres",
    "الاخره": "l'Au-delà", "بالاخره": "en l'Au-delà", "الدنيا": "la vie présente",
    "الكتاب": "le Livre", "الكتب": "le Livre", "القران": "le Coran", "القرءان": "le Coran",
    "الحق": "la vérité", "بالحق": "en toute vérité", "الباطل": "le faux",
    "القيامه": "la Résurrection", "القيثمه": "la Résurrection", "الساعه": "l'Heure",
    "الجنه": "le Paradis", "جنات": "des Jardins", "جنت": "des Jardins", "جهنم": "la Géhenne", "النار": "le Feu",
    "الملايكه": "les Anges", "الملائكه": "les Anges", "والملئكه": "et les Anges",
    "الشيطان": "Satan", "الشيطن": "Satan", "الشياطين": "les diables", "ابليس": "Iblîs",
    "الرسول": "le Messager", "رسول": "Messager", "رسوله": "Son Messager", "الرسل": "les Messagers",
    "النبي": "le Prophète", "النبيين": "les Prophètes", "النبيون": "les Prophètes",
    "موسي": "Mūsā (Moïse)", "عيسي": "‘Īsā (Jésus)", "ابراهيم": "Ibrāhīm (Abraham)", "ابرهيم": "Ibrāhīm (Abraham)",
    "نوح": "Nūh (Noé)", "يوسف": "Yūsuf (Joseph)", "داود": "Dāwūd (David)", "سليمان": "Sulaymān (Salomon)",
    "سليمن": "Sulaymān (Salomon)", "فرعون": "Pharaon", "مريم": "Maryam (Marie)", "ادم": "Ādam", "ءادم": "Ādam",
    "زكريا": "Zakariyyā", "يحيي": "Yahyā", "اسماعيل": "Ismā‘īl", "اسمعيل": "Ismā‘īl", "يعقوب": "Ya‘qūb", "لوط": "Lūt",
    "هارون": "Hārūn", "هرون": "Hārūn", "اسحاق": "Ishāq", "اسحق": "Ishāq", "محمد": "Muhammad",
    "العزيز": "le Tout-Puissant", "الحكيم": "le Très-Sage", "العليم": "l'Omniscient", "السميع": "l'Audient",
    "البصير": "le Clairvoyant", "الغفور": "le Pardonneur", "الخبير": "le Parfaitement Connaisseur",
    "القدير": "l'Omnipotent", "العظيم": "l'Immense", "الكريم": "le Généreux", "اللطيف": "le Subtil",
    "التواب": "l'Accueillant au repentir", "الوكيل": "le Garant", "الولي": "le Protecteur",
    "باياتنا": "en Nos versets", "بايتنا": "en Nos versets", "اياتنا": "Nos versets", "ايتنا": "Nos versets",
    "ايات": "des versets", "ايت": "des versets", "بسوره": "une sourate", "سوره": "une sourate",
    "عبدنا": "Notre serviteur", "عبده": "Son serviteur", "عبادي": "Mes serviteurs", "عباده": "Ses serviteurs",
    "قلوبهم": "leurs cœurs", "ابصارهم": "leurs regards", "ابصرهم": "leurs regards", "سمعهم": "leur ouïe",
    "انفسهم": "eux-mêmes", "انفسكم": "vous-mêmes", "انفسنا": "nous-mêmes",
    "عنه": "de lui", "عنهم": "d'eux", "عنكم": "de vous", "دونهم": "en dehors d'eux", "دون": "en dehors de",
    "اليها": "vers elle", "اليه": "vers lui", "اليهم": "vers eux", "اليكم": "vers vous", "الينا": "vers nous",
    "عليهم": "sur eux", "عليكم": "sur vous", "علينا": "sur nous", "عليه": "sur lui", "عليها": "sur elle",
    "لهم": "pour eux", "لكم": "pour vous", "لنا": "pour nous", "لها": "pour elle", "له": "pour lui",
    "فيهم": "parmi eux", "فيكم": "parmi vous", "فينا": "parmi nous", "فيها": "en elle", "فيه": "en lui",
    "منهم": "d'entre eux", "منكم": "d'entre vous", "منا": "de nous", "منها": "d'elle", "منه": "de lui",
    "بهم": "par eux", "بكم": "par vous", "بنا": "par nous", "بها": "par elle", "به": "par lui",
    "الحمد": "Louange", "سبحان": "Gloire à", "سبحن": "Gloire à", "انشاالله": "si Allah le veut",
    "ربهم": "leur Seigneur", "ربكم": "votre Seigneur", "ربنا": "notre Seigneur", "ربك": "ton Seigneur", "ربي": "mon Seigneur", "ربه": "son Seigneur",
    "شهداءكم": "vos témoins", "شهدايكم": "vos témoins", "والقلم": "Par la plume", "يسطرون": "ils écrivent"
  },

  // ~450 gloses anglaises les plus fréquentes de Quran.com -> français vérifié
  // (déjà désambiguïsées en contexte par le Quranic Arabic Corpus !)
  en: {
    // Particules, prépositions, conjonctions, pronoms
    "and": "et", "or": "ou", "but": "mais", "then": "puis", "so": "alors", "therefore": "donc",
    "indeed": "Certes", "verily": "Certes", "surely": "certes", "truly": "en vérité", "certainly": "assurément",
    "if": "si", "and if": "et si", "but if": "mais si", "even if": "même si", "unless": "à moins que",
    "except": "sauf", "only": "seulement", "not": "ne ... pas", "no": "aucun", "nor": "ni", "neither": "ni",
    "never": "jamais", "nay": "mais non", "rather": "plutôt", "however": "cependant", "yet": "pourtant",
    "when": "lorsque", "and when": "et lorsque", "until": "jusqu'à ce que", "while": "tandis que", "since": "puisque",
    "because": "parce que", "for": "pour", "so that": "afin que", "in order that": "afin que", "lest": "de crainte que",
    "that": "que", "this": "ceci", "these": "ceux-ci", "those": "ceux-là", "such": "tels",
    "who": "qui", "which": "qui", "what": "ce que", "whatever": "tout ce que", "whoever": "quiconque",
    "and whoever": "et quiconque", "wherever": "où que", "where": "où", "how": "comment", "why": "pourquoi",
    "the one who": "Celui qui", "one who": "celui qui", "those who": "Ceux qui", "and those who": "et ceux qui",
    "for those who": "pour ceux qui", "to those who": "à ceux qui", "of those who": "de ceux qui",
    "from": "de", "of": "de", "in": "dans", "into": "dans", "within": "dans", "on": "sur", "upon": "sur",
    "over": "au-dessus de", "above": "au-dessus de", "under": "sous", "beneath": "sous", "below": "au-dessous de",
    "to": "vers", "unto": "vers", "towards": "vers", "toward": "vers", "at": "à", "by": "par", "with": "avec",
    "without": "sans", "about": "au sujet de", "concerning": "au sujet de", "among": "parmi", "between": "entre",
    "before": "avant", "after": "après", "behind": "derrière", "around": "autour de", "near": "près de",
    "against": "contre", "besides": "en dehors de", "other than": "en dehors de", "instead of": "au lieu de",
    "like": "comme", "as": "comme", "than": "que", "beyond": "au-delà de", "through": "à travers",
    "and from": "et de", "and in": "et dans", "and on": "et sur", "and upon": "et sur", "and to": "et vers",
    "and with": "et avec", "and for": "et pour", "and by": "et par", "and not": "et ne ... pas",
    "and no": "et aucun", "and what": "et ce que", "and who": "et qui", "and indeed": "et certes",
    "and that": "et que", "and this": "et ceci", "and those": "et ceux-là", "and they": "et ils",
    "and he": "et il", "and she": "et elle", "and we": "et Nous", "and you": "et vous", "and i": "et je",
    "in it": "en lui", "in them": "en eux", "in you": "en vous", "in us": "en nous", "in him": "en lui", "in her": "en elle",
    "on it": "sur elle", "on them": "sur eux", "on you": "sur vous", "on us": "sur nous", "on him": "sur lui",
    "upon them": "sur eux", "upon you": "sur vous", "upon us": "sur nous", "upon him": "sur lui", "upon it": "sur lui",
    "from it": "d'elle", "from them": "d'eux", "from you": "de vous", "from us": "de nous", "from him": "de lui", "from me": "de moi",
    "of them": "d'entre eux", "of you": "d'entre vous", "of us": "d'entre nous", "of it": "en", "of him": "de lui", "of me": "de moi",
    "to them": "à eux", "to you": "à toi", "to us": "à nous", "to him": "à lui", "to her": "à elle", "to me": "à moi",
    "for them": "pour eux", "for you": "pour vous", "for us": "pour nous", "for him": "pour lui", "for her": "pour elle", "for me": "pour moi",
    "with them": "avec eux", "with you": "avec vous", "with us": "avec nous", "with him": "avec lui", "with me": "avec moi", "with it": "avec cela",
    "by it": "par lui", "by them": "par eux", "by him": "par lui", "before you": "avant toi", "before them": "avant eux",
    "after it": "après cela", "after them": "après eux", "between them": "entre eux", "among them": "parmi eux",
    "and out of what": "et de ce que", "out of what": "de ce que", "and from what": "et de ce que", "from what": "de ce que",
    "and from that which": "et de ce que", "from that which": "de ce que", "of what": "de ce que",
    "in what": "dans ce que", "with what": "avec ce que", "by what": "par ce que", "for what": "pour ce que",
    "i": "je", "you": "tu / vous", "he": "il", "she": "elle", "it": "il / cela", "we": "Nous", "they": "ils",
    "me": "moi", "him": "lui", "her": "elle", "us": "nous", "them": "eux",
    "my": "mon", "your": "ton / votre", "his": "son", "its": "son", "our": "notre", "their": "leur",
    "myself": "moi-même", "yourself": "toi-même", "yourselves": "vous-mêmes", "himself": "lui-même",
    "themselves": "eux-mêmes", "ourselves": "nous-mêmes", "each other": "les uns les autres",
    "all": "tous", "every": "chaque", "each": "chaque", "some": "certains", "many": "beaucoup", "most": "la plupart",
    "few": "peu", "little": "peu", "more": "plus", "less": "moins", "much": "beaucoup", "none": "aucun",
    "any": "aucun", "anything": "quoi que ce soit", "nothing": "rien", "something": "quelque chose", "everything": "toute chose",
    "one": "un", "two": "deux", "three": "trois", "four": "quatre", "five": "cinq", "six": "six", "seven": "sept", "first": "premier", "last": "dernier",
    "o": "Ô", "yes": "oui", "indeed he": "certes Il", "indeed they": "certes ils", "indeed we": "certes Nous",
    "indeed you": "certes tu", "indeed allah": "certes Allah", "and indeed allah": "et certes Allah",

    // Allah, Attributs, Noms divins
    "allah": "Allah", "of allah": "d'Allah", "to allah": "à Allah", "for allah": "pour Allah",
    "in allah": "en Allah", "with allah": "auprès d'Allah", "by allah": "par Allah", "and allah": "et Allah",
    "god": "divinité", "a god": "une divinité", "gods": "des divinités", "deity": "divinité",
    "lord": "Seigneur", "the lord": "le Seigneur", "my lord": "mon Seigneur", "your lord": "ton Seigneur",
    "his lord": "son Seigneur", "our lord": "notre Seigneur", "their lord": "leur Seigneur",
    "and your lord": "et ton Seigneur", "from their lord": "de leur Seigneur", "from your lord": "de ton Seigneur",
    "from his lord": "de son Seigneur", "lord of the worlds": "Seigneur des mondes",
    "the most gracious": "le Tout Miséricordieux", "the entirely merciful": "le Tout Miséricordieux",
    "the most merciful": "le Très Miséricordieux", "the especially merciful": "le Très Miséricordieux",
    "oft-forgiving": "Pardonneur", "most forgiving": "Très Pardonneur", "the forgiving": "le Pardonneur",
    "all-knowing": "Omniscient", "the all-knowing": "l'Omniscient", "all-knower": "Omniscient", "knower": "Connaisseur",
    "all-wise": "Très-Sage", "the all-wise": "le Très-Sage", "most wise": "Très-Sage",
    "all-mighty": "Tout-Puissant", "almighty": "Tout-Puissant", "the all-mighty": "le Tout-Puissant", "the mighty": "le Puissant",
    "all-hearing": "Audient", "the all-hearing": "l'Audient", "all-seeing": "Clairvoyant", "the all-seeing": "le Clairvoyant",
    "all-aware": "Parfaitement Connaisseur", "most high": "Très-Haut", "the most high": "le Très-Haut",
    "the supreme": "l'Immense", "the great": "l'Immense", "the sovereign": "le Souverain", "the king": "le Souverain",
    "the creator": "le Créateur", "creator": "Créateur", "the guardian": "le Garant", "the protector": "le Protecteur",
    "the praiseworthy": "le Digne de louange", "the subtle": "le Subtil", "the generous": "le Généreux",
    "the most generous": "le Très Généreux", "the living": "le Vivant", "the sustainer": "l'Absolu",
    "glory be to": "Gloire à", "glory be to him": "Gloire à Lui", "exalted is he": "Gloire à Lui",
    "all praise": "Louange", "praise": "louange", "in the name": "au nom", "in (the) name": "au nom",

    // Concepts coraniques essentiels
    "the book": "le Livre", "book": "Livre", "a book": "un Livre", "the scripture": "le Livre", "scripture": "Livre",
    "the quran": "le Coran", "quran": "Coran", "this quran": "ce Coran",
    "guidance": "guidée", "a guidance": "une guidée", "the guidance": "la guidée",
    "the straight path": "le droit chemin", "straight path": "droit chemin", "path": "chemin", "the path": "le chemin",
    "way": "voie", "the way": "la voie", "straight": "droit",
    "the truth": "la vérité", "truth": "vérité", "in truth": "en toute vérité", "with truth": "en toute vérité",
    "falsehood": "le faux", "the falsehood": "le faux", "doubt": "doute", "no doubt": "aucun doute",
    "sign": "signe", "a sign": "un signe", "the sign": "le signe", "signs": "versets / signes",
    "the signs": "les signes", "our signs": "Nos signes", "his signs": "Ses signes",
    "our verses": "Nos versets", "in our verses": "en Nos versets", "his verses": "Ses versets", "verses": "versets",
    "a chapter": "une sourate", "revelation": "Révélation", "the revelation": "la Révélation",
    "faith": "foi", "the faith": "la foi", "religion": "religion", "the religion": "la religion", "islam": "l'Islam",
    "the prayer": "la Salât", "prayer": "prière", "the zakah": "la Zakât", "zakah": "la Zakât", "charity": "aumône",
    "the unseen": "l'Invisible", "in the unseen": "en l'Invisible", "unseen": "Invisible",
    "the hereafter": "l'Au-delà", "hereafter": "Au-delà", "and of the hereafter": "et quant à l'Au-delà",
    "the world": "le monde", "the worlds": "les mondes", "world": "monde", "the life": "la vie", "life": "vie",
    "life of the world": "la vie présente", "this world": "ici-bas", "death": "la mort", "the death": "la mort",
    "day": "Jour", "the day": "le Jour", "a day": "un Jour", "days": "jours", "today": "aujourd'hui",
    "day of resurrection": "Jour de la Résurrection", "the resurrection": "la Résurrection",
    "day of judgment": "Jour de la Rétribution", "day of judgement": "Jour de la Rétribution",
    "the hour": "l'Heure", "night": "nuit", "the night": "la nuit", "light": "lumière", "the light": "la lumière",
    "darkness": "ténèbres", "the darkness": "les ténèbres", "darknesses": "ténèbres",
    "paradise": "le Paradis", "the paradise": "le Paradis", "garden": "Jardin", "the garden": "le Paradis", "gardens": "des Jardins",
    "hell": "l'Enfer", "the hell": "la Géhenne", "hellfire": "le Feu de l'Enfer", "fire": "Feu", "the fire": "le Feu",
    "punishment": "châtiment", "a punishment": "un châtiment", "the punishment": "le châtiment",
    "painful": "douloureux", "severe": "sévère", "great": "immense", "mighty": "immense", "humiliating": "avilissant",
    "reward": "récompense", "a reward": "une récompense", "the reward": "la récompense",
    "mercy": "miséricorde", "the mercy": "la miséricorde", "his mercy": "Sa miséricorde", "my mercy": "Ma miséricorde",
    "blessing": "bienfait", "blessings": "bienfaits", "favor": "faveur", "grace": "grâce", "bounty": "grâce",
    "forgiveness": "pardon", "repentance": "repentir", "peace": "paix", "patience": "patience",
    "knowledge": "science", "the knowledge": "la science", "wisdom": "sagesse", "the wisdom": "la sagesse",
    "covenant": "pacte", "the covenant": "le pacte", "promise": "promesse", "the promise": "la promesse",
    "command": "ordre", "the command": "l'ordre", "permission": "permission", "will": "volonté",
    "sin": "péché", "sins": "péchés", "evil": "mal", "the evil": "le mal", "good": "bien", "the good": "le bien",
    "righteous deeds": "bonnes œuvres", "good deeds": "bonnes œuvres", "deeds": "œuvres", "their deeds": "leurs œuvres",
    "mischief": "corruption", "corruption": "corruption", "oppression": "injustice", "injustice": "injustice",
    "error": "égarement", "astray": "égaré", "clear": "évident", "manifest": "évident", "plain": "clair",

    // Création, univers, être humain
    "the heavens": "les cieux", "heavens": "cieux", "heaven": "ciel", "the heaven": "le ciel", "sky": "ciel", "the sky": "le ciel",
    "the earth": "la terre", "earth": "terre", "and the earth": "et la terre", "in the earth": "sur la terre",
    "sun": "soleil", "the sun": "le soleil", "moon": "lune", "the moon": "la lune", "stars": "étoiles",
    "water": "eau", "the water": "l'eau", "rain": "pluie", "sea": "mer", "the sea": "la mer", "rivers": "rivières",
    "mountains": "montagnes", "the mountains": "les montagnes", "wind": "vent", "winds": "vents", "clouds": "nuages",
    "trees": "arbres", "fruits": "fruits", "cattle": "bestiaux", "birds": "oiseaux", "creatures": "créatures",
    "man": "l'homme", "mankind": "les hommes", "the mankind": "les hommes", "people": "les gens", "the people": "les gens",
    "a people": "un peuple", "nation": "communauté", "nations": "communautés", "folk": "peuple",
    "soul": "âme", "souls": "âmes", "heart": "cœur", "hearts": "cœurs", "their hearts": "leurs cœurs",
    "eyes": "yeux", "sight": "vue", "hearing": "ouïe", "ears": "oreilles", "tongue": "langue", "mouths": "bouches",
    "hand": "main", "hands": "mains", "their hands": "leurs mains", "face": "visage", "faces": "visages",
    "head": "tête", "feet": "pieds", "chests": "poitrines", "breasts": "poitrines", "bodies": "corps",
    "father": "père", "fathers": "pères", "mother": "mère", "son": "fils", "sons": "fils", "daughter": "fille",
    "children": "enfants", "children of israel": "Enfants d'Israël", "wife": "épouse", "wives": "épouses",
    "women": "femmes", "the women": "les femmes", "men": "hommes", "the men": "les hommes",
    "brother": "frère", "brothers": "frères", "family": "famille", "house": "maison", "the house": "la Maison",
    "city": "cité", "town": "cité", "towns": "cités", "land": "terre", "wealth": "biens", "property": "biens",

    // Catégories d'humains, Prophètes, Anges
    "the believers": "les croyants", "believers": "croyants", "believer": "croyant", "a believer": "un croyant",
    "the disbelievers": "les mécréants", "disbelievers": "mécréants", "disbeliever": "mécréant",
    "the righteous": "les pieux", "for the righteous": "pour les pieux", "righteous": "pieux",
    "the wrongdoers": "les injustes", "wrongdoers": "injustes", "the oppressors": "les injustes",
    "the hypocrites": "les hypocrites", "hypocrites": "hypocrites",
    "the polytheists": "les polythéistes", "polytheists": "polythéistes", "associators": "associateurs",
    "the wicked": "les pervers", "the defiantly disobedient": "les pervers", "the transgressors": "les transgresseurs",
    "the truthful": "les véridiques", "truthful": "véridiques", "the liars": "les menteurs",
    "the patient": "les endurants", "the grateful": "les reconnaissants", "the successful": "ceux qui réussissent",
    "are the successful": "sont ceux qui réussissent", "the losers": "les perdants", "losers": "perdants",
    "the angels": "les Anges", "angels": "Anges", "angel": "Ange", "an angel": "un Ange",
    "satan": "Satan", "the satan": "Satan", "devil": "diable", "devils": "diables", "jinn": "djinns", "the jinn": "les djinns",
    "messenger": "Messager", "a messenger": "un Messager", "the messenger": "le Messager", "messengers": "Messagers", "the messengers": "les Messagers",
    "his messenger": "Son Messager", "prophet": "Prophète", "the prophet": "le Prophète", "prophets": "Prophètes", "the prophets": "les Prophètes",
    "servant": "serviteur", "servants": "serviteurs", "slave": "serviteur", "slaves": "serviteurs",
    "our slave": "Notre serviteur", "his slave": "Son serviteur", "my slave": "Mon serviteur", "my servants": "Mes serviteurs",
    "enemy": "ennemi", "an enemy": "un ennemi", "enemies": "ennemis", "friend": "allié", "friends": "alliés",
    "protector": "protecteur", "helper": "secoureur", "witness": "témoin", "witnesses": "témoins",
    "moses": "Mūsā (Moïse)", "jesus": "‘Īsā (Jésus)", "abraham": "Ibrāhīm (Abraham)", "noah": "Nūh (Noé)",
    "joseph": "Yūsuf (Joseph)", "david": "Dāwūd (David)", "solomon": "Sulaymān (Salomon)", "pharaoh": "Pharaon",
    "mary": "Maryam (Marie)", "adam": "Ādam", "jacob": "Ya‘qūb", "ishmael": "Ismā‘īl", "isaac": "Ishāq", "aaron": "Hārūn", "lot": "Lūt",

    // Verbes les plus fréquents du Coran
    "say": "Dis", "he said": "il dit", "said": "a dit", "they said": "ils dirent", "and said": "et dit", "and he said": "et il dit",
    "and they said": "et ils dirent", "we said": "Nous dîmes", "you say": "vous dites", "they say": "ils disent",
    "he says": "il dit", "saying": "disant", "speech": "parole", "word": "parole", "words": "paroles",
    "is": "est", "are": "sont", "was": "était", "were": "étaient", "be": "sois", "will be": "sera", "has been": "a été",
    "have been": "ont été", "are upon": "sont sur", "is upon": "est sur",
    "he knows": "Il sait", "knows": "sait", "they know": "ils savent", "you know": "vous savez", "we know": "Nous savons",
    "know": "sachez", "knew": "savait", "he knew": "il savait", "do not know": "ne savent pas", "they do not know": "ils ne savent pas",
    "he sees": "Il voit", "sees": "voit", "saw": "vit", "see": "vois", "they see": "ils voient", "do you not see": "n'as-tu pas vu",
    "he hears": "Il entend", "hear": "entendez", "heard": "entendit", "they hear": "ils entendent", "listen": "écoutez",
    "they believe": "croient", "believed": "ont cru", "have believed": "ont cru", "and believed": "et ont cru",
    "disbelieved": "ont mécru", "they disbelieve": "mécroient", "disbelieve": "mécroyent", "rejected": "ont rejeté", "denied": "ont démenti",
    "created": "a créé", "he created": "Il a créé", "we created": "Nous avons créé", "create": "créer",
    "made": "a fait", "he made": "Il a fait", "we made": "Nous avons fait", "do": "faites", "did": "firent",
    "does": "fait", "they do": "ils font", "you do": "vous faites", "doing": "faisant", "worked": "ont œuvré",
    "sent": "a envoyé", "we sent": "Nous avons envoyé", "sent down": "a fait descendre", "we sent down": "Nous avons fait descendre",
    "revealed": "a révélé", "was revealed": "a été révélé", "has been revealed": "a été révélé", "we revealed": "Nous avons révélé",
    "came": "est venu", "came to them": "leur est venu", "came to you": "vous est venu", "comes": "vient", "come": "venez",
    "went": "est allé", "go": "allez", "entered": "sont entrés", "enter": "entrez", "bring": "apportez", "brought": "a apporté",
    "gave": "a donné", "we gave": "Nous avons donné", "give": "donnez", "gives": "donne",
    "we have provided them": "Nous leur avons attribué", "we provided them": "Nous leur avons attribué", "provided": "a attribué",
    "they spend": "dépensent", "spend": "dépensez", "and establish": "et accomplissent", "and they establish": "et accomplissent",
    "establish": "accomplissez", "worship": "adorez", "we worship": "nous adorons", "fear": "craignez", "fear allah": "craignez Allah",
    "obey": "obéissez", "follow": "suivez", "followed": "ont suivi", "remember": "souvenez-vous", "glorify": "glorifiez",
    "forgive": "pardonne", "forgives": "pardonne", "he forgives": "Il pardonne", "guide": "guide", "guides": "guide",
    "guided": "guidé", "he wills": "Il veut", "wills": "veut", "willed": "a voulu", "we willed": "Nous avons voulu",
    "love": "aime", "loves": "aime", "does not love": "n'aime pas", "pleased": "satisfait",
    "took": "ont pris", "take": "prenez", "found": "a trouvé", "find": "trouveront", "called": "a appelé", "call": "appelez",
    "and call": "et appelez", "asked": "ont demandé", "ask": "demande", "answered": "a répondu",
    "turned away": "se sont détournés", "return": "retournez", "returned": "retournés", "they will return": "ils retourneront",
    "die": "meurent", "died": "est mort", "kill": "tuez", "killed": "ont tué", "fight": "combattez",
    "eat": "mangez", "drink": "buvez", "read": "Lis", "recite": "Lis", "taught": "a enseigné", "write": "écrivez", "they inscribe": "ils écrivent",
    "they are certain": "ils ont la certitude", "then produce": "apportez donc", "like it": "semblable à ceci",
    "the like of it": "semblable à ceci", "(the) like of it": "semblable à ceci",
    "stand": "Lève-toi", "stand (in prayer)": "Lève-toi (en prière)", "by the pen": "Par la plume",
    "a clinging substance": "une adhérence", "clinging substance": "une adhérence",
    "and flared": "et s'est embrasée", "with white": "de cheveux blancs", "unblessed": "malheureux",
    "i have been": "j'ai été", "in my supplication to you": "en T'invoquant"
  }
};

// Valider et écrire site/lexique-wbw-fr.json
const lexiqueJson = JSON.stringify(LEXIQUE_WBW_FR, null, 2);
JSON.parse(lexiqueJson);
writeSafe(lexiquePath, lexiqueJson);
console.log(`✓ site/lexique-wbw-fr.json créé : ${Object.keys(LEXIQUE_WBW_FR.versets).length} versets certifiés, ${Object.keys(LEXIQUE_WBW_FR.ar).length} formes arabes, ${Object.keys(LEXIQUE_WBW_FR.en).length} gloses EN->FR (${(Buffer.byteLength(lexiqueJson) / 1024).toFixed(1)} Ko).`);

// ============================================================================
// 2. UNIFIER LE PIPELINE MOT-A-MOT DANS site/assets/verset.js
// ============================================================================
let code = fs.readFileSync(versetJsPath, 'utf8');

// 2a. Retirer le faux-ami global "ما": "Tu n'es pas" de DICO_MULTILINGUE.fr
code = code.replace(/"ما":\s*"Tu n'es pas",\s*/g, '');

// 2b. Purger le vieux cache corrompu v64 et migrer vers v125
code = code.replace(
  /var sauv = localStorage\.getItem\("cache_wbw_exact_v120"\) \|\| localStorage\.getItem\("cache_wbw_exact_v64"\);/,
  'try { localStorage.removeItem("cache_wbw_exact_v64"); localStorage.removeItem("cache_wbw_exact_v65"); localStorage.removeItem("cache_wbw_exact_v120"); } catch (e) {}\n    var sauv = localStorage.getItem("cache_wbw_exact_v125");'
);
code = code.split('cache_wbw_exact_v120').join('cache_wbw_exact_v125');

// 2c. Empêcher le moteur batch (appliquerVraiMotAMotSurDOM / chargerVraiMotAMotVerset) de concurrencer le moteur unifié en français
const reBatchCall = /if \(!cacheVersetMotsExact\[cleCache\]\) chargerVraiMotAMotVerset\(vk, lang\);/;
if (!reBatchCall.test(code)) throw new Error('Ancre introuvable : chargerVraiMotAMotVerset');
code = code.replace(
  reBatchCall,
  'if (lang !== "fr" && !cacheVersetMotsExact[cleCache]) chargerVraiMotAMotVerset(vk, lang);'
);

const reBatchGuard = /if \(elTr\.dataset\.wbwManual === "1"\) continue;/;
if (!reBatchGuard.test(code)) throw new Error('Ancre introuvable : garde wbwManual dans appliquerVraiMotAMotSurDOM');
code = code.replace(
  reBatchGuard,
  'if (lang === "fr" || elTr.dataset.wbwManual === "1" || elTr.dataset.wbwTrOk) continue;'
);

// 2d. Remplacer le moteur nettoyerEtTraduireMotUneFois par la version unifiée branchée sur /lexique-wbw-fr.json
const debutAncre = '  // Purge automatique des anciens caches corrompus (v65 / v117)';
const finAncre = '  var cacheMetaCartes = []';
const iDebut = code.indexOf(debutAncre);
const iFin = code.indexOf(finAncre);
if (iDebut === -1 || iFin === -1 || iFin <= iDebut) {
  throw new Error(`Bloc moteur WBW introuvable (${iDebut}, ${iFin})`);
}

const moteurUnifie = `  // Purge automatique des anciens caches corrompus (v64 / v65 / v117 / v120)
  try {
    localStorage.removeItem('cache_wbw_exact_v64');
    localStorage.removeItem('cache_wbw_exact_v65');
    localStorage.removeItem('cache_wbw_exact_v120');
    localStorage.removeItem('wbw_tr_cache_v117');
    localStorage.removeItem('wbw_tr_cache_v120');
  } catch (e) {}

  // Chargement unique du lexique statique vérifié (/lexique-wbw-fr.json)
  var lexiqueStatiqueFr = null;
  var promesseLexiqueFr = null;
  function chargerLexiqueStatiqueFr() {
    if (lexiqueStatiqueFr) return Promise.resolve(lexiqueStatiqueFr);
    if (!promesseLexiqueFr) {
      promesseLexiqueFr = fetch('/lexique-wbw-fr.json')
        .then(function(r) { return r.ok ? r.json() : null; })
        .then(function(d) {
          if (d && (d.en || d.ar || d.versets)) lexiqueStatiqueFr = d;
          return lexiqueStatiqueFr;
        })
        .catch(function() { return null; });
    }
    return promesseLexiqueFr;
  }
  chargerLexiqueStatiqueFr();

  function estMotArabePluriel(arNorm) {
    return /(تم|كم|وا|ون|ين|هم|هن|تن|نا)$/.test(arNorm);
  }

  function estVerbeArabeInaccompli3Pl(arNorm) {
    return /^(و|ف|ل)?ي.{2,}ون$/.test(arNorm);
  }

  function estVerbeArabeInaccompli2Pl(arNorm) {
    return /^(و|ف|ل)?ت.{2,}ون$/.test(arNorm);
  }

  function estVerbeArabePasse3Pl(arNorm) {
    return /وا$/.test(arNorm) && arNorm.length >= 4;
  }

  function normaliserCleEnLexique(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/^\\(is\\)\\s*/i, '')
      .replace(/^\\(are\\)\\s*/i, '')
      .replace(/^\\(the\\)\\s+/i, 'the ')
      .replace(/[\\[\\]\\(\\)]/g, '')
      .replace(/[.,;:!?"]+$/g, '')
      .replace(/\\s{2,}/g, ' ')
      .trim();
  }

  function estDejaFrancaisSansAccent(str) {
    var s = (str || '').toLowerCase().trim();
    if (!s) return false;
    if (/[àâäéèêëîïôöùûüçœæ]/i.test(s)) return true;
    return /^(ceux qui|celui qui|celle qui|ceux-la|qui|que|et de ce que|de ce que|et ce que|ce que|croient|disent|font|sont|savent|voient|entendent|accomplissent|et accomplissent|et|ou|ni|mais|car|dans|sur|sous|pour|par|avec|sans|vers|chez|de|du|des|le|la|les|un|une|au|aux|mon|ton|son|ma|ta|sa|mes|tes|ses|notre|votre|leur|leurs|nous|vous|ils|elles|lui|eux|seigneur|livre|doute|pieux|guide|jour|nuit|terre|cieux|ciel|allah|dieu|salat|zakat|chemin|droit|louange|monde|mondes|certes|point|aucun|avant|apres|toi|moi|soi|ici-bas)(\\s+[a-z'-]+){0,3}$/i.test(s);
  }

  function desambiguiserAnglaisCoranique(enBrut, arNorm) {
    var s = normaliserCleEnLexique(enBrut)
      .replace(/\\bthou art\\b/gi, 'you are')
      .replace(/\\bthou hast\\b/gi, 'you have')
      .replace(/\\bthou\\b/gi, 'you')
      .replace(/\\bthee\\b/gi, 'you')
      .replace(/\\bthy\\b/gi, 'your')
      .replace(/\\bthine\\b/gi, 'yours')
      .replace(/\\bye\\b/gi, 'you')
      .replace(/\\bhath\\b/gi, 'has')
      .replace(/\\bhast\\b/gi, 'have')
      .replace(/\\bunto\\b/gi, 'to')
      .replace(/\\bverily\\b/gi, 'indeed');
    if (/^(the\\s+)?like(\\s+of)?\\s+(it|him|them|this|that)$/i.test(s)) return 'similar to it';
    s = s.replace(/\\band\\s+out\\s+of\\s+what\\b/gi, 'and from that which')
         .replace(/\\bout\\s+of\\s+what\\b/gi, 'from that which')
         .replace(/\\band\\s+from\\s+what\\b/gi, 'and from that which')
         .replace(/\\bfrom\\s+what\\b/gi, 'from that which');
    s = s.replace(/\\bour\\s+verses\\b/gi, 'Our Quranic verses').replace(/\\bverses\\b/gi, 'Quranic verses');
    s = s.replace(/\\bour\\s+slave\\b/gi, 'Our servant').replace(/\\bhis\\s+slave\\b/gi, 'His servant').replace(/\\bslaves\\b/gi, 'servants').replace(/\\bslave\\b/gi, 'servant');
    s = s.replace(/\\ba\\s+chapter\\b/gi, 'a Surah');
    if (estMotArabePluriel(arNorm)) {
      s = s.replace(/\\byou\\s+are\\b/gi, 'you all are').replace(/\\byou\\s+were\\b/gi, 'you all were');
    }
    if (estVerbeArabeInaccompli3Pl(arNorm) && !/^(they|those|who|he|she|we|you|i|in|on|of|for|the|a|an|to|with|not|no)\\b/i.test(s)) {
      s = /^and\\s+/i.test(s) ? s.replace(/^and\\s+/i, 'and they ') : ('they ' + s);
    } else if (estVerbeArabeInaccompli2Pl(arNorm) && !/^(you|they|we|he|she|i|in|on|of|for|the|a|an|to|with|not|no)\\b/i.test(s)) {
      s = /^and\\s+/i.test(s) ? s.replace(/^and\\s+/i, 'and you all ') : ('you all ' + s);
    }
    return s;
  }

  function chercherDansLexiqueStatiqueFr(sourceEn, arNorm, cleVerset, idxMot) {
    if (!lexiqueStatiqueFr) return '';
    // 1. Verset certifié mot-à-mot
    if (cleVerset && idxMot >= 0 && lexiqueStatiqueFr.versets && lexiqueStatiqueFr.versets[cleVerset]) {
      var tab = lexiqueStatiqueFr.versets[cleVerset];
      if (tab[idxMot]) return tab[idxMot];
    }
    // 2. Forme arabe strictement univoque
    if (arNorm && lexiqueStatiqueFr.ar && lexiqueStatiqueFr.ar[arNorm]) {
      return lexiqueStatiqueFr.ar[arNorm];
    }
    // 3. Glose anglaise Quran.com (avec variantes morphologiques pour les verbes pluriels)
    var enCle = normaliserCleEnLexique(sourceEn);
    if (enCle && lexiqueStatiqueFr.en) {
      if (estVerbeArabeInaccompli3Pl(arNorm)) {
        var clePl3 = /^and\\s+/i.test(enCle) ? enCle.replace(/^and\\s+/i, 'and they ') : ('they ' + enCle);
        if (lexiqueStatiqueFr.en[clePl3]) return lexiqueStatiqueFr.en[clePl3];
      }
      if (estVerbeArabePasse3Pl(arNorm) && enCle === 'believe') return 'ont cru';
      if (estVerbeArabeInaccompli2Pl(arNorm) && enCle === 'believe') return 'vous croyez';
      if (lexiqueStatiqueFr.en[enCle]) return lexiqueStatiqueFr.en[enCle];
      // Retirer un "and " en tête pour réutiliser la glose de base
      if (/^and\\s+/.test(enCle)) {
        var sansAnd = enCle.replace(/^and\\s+/, '');
        if (lexiqueStatiqueFr.en[sansAnd]) return 'et ' + lexiqueStatiqueFr.en[sansAnd];
      }
    }
    return '';
  }

  function corrigerFrancaisSelonMorphologieArabe(tr, arNorm) {
    var out = (tr || '').trim();
    if (/^j.aime\\s+ça$/i.test(out)) return 'semblable à ceci';
    if (/^ici$/i.test(out) && (arNorm === 'الذين' || arNorm === 'الذي')) return arNorm === 'الذين' ? 'Ceux qui' : 'Celui qui';
    out = out.replace(/^et\\s+de\\s+quoi$/i, 'et de ce que').replace(/^de\\s+quoi$/i, 'de ce que');
    out = out.replace(/\\bdans\\s+nos\\s+vers\\b/gi, 'en Nos versets').replace(/\\bnos\\s+vers\\b/gi, 'Nos versets');
    out = out.replace(/\\bnotre\\s+esclave\\b/gi, 'Notre serviteur').replace(/\\bson\\s+esclave\\b/gi, 'Son serviteur');
    out = out.replace(/\\bun\\s+chapitre\\b/gi, 'une sourate');
    if (estMotArabePluriel(arNorm)) {
      if (/^crois$/i.test(out)) return 'croient';
      if (/^et\\s+crois$/i.test(out)) return 'et croient';
      if (/^établis$/i.test(out)) return 'accomplissent';
      if (/^et\\s+établis$/i.test(out)) return 'et accomplissent';
      if (/^tu\\s+es$/i.test(out)) return 'vous êtes';
      if (/^tu\\s+étais$/i.test(out)) return 'vous étiez';
      if (/^et\\s+appelle$/i.test(out)) return 'et appelez';
      if (/^véridique$/i.test(out)) return 'véridiques';
      out = out.replace(/^tu\\s+/i, 'vous ');
    }
    return out;
  }

  var cacheTradMots = {};
  try { cacheTradMots = JSON.parse(localStorage.getItem('wbw_tr_cache_v125') || '{}'); } catch (e) {}
  var enCoursTrad = {}, prochainEssaiTrad = {};

  function obtenirLanguePage() {
    var p = new URLSearchParams(window.location.search).get('lang');
    return p ? p.slice(0, 2).toLowerCase() : ((document.documentElement.lang || 'fr').slice(0, 2).toLowerCase() || 'fr');
  }

  function nettoyerEtTraduireMotUneFois(elTrad, elAr, lang, forcerRetraduction) {
    if (!elTrad) return;
    if (elTrad.dataset.wbwManual === '1') {
      if (elTrad.dataset.wbwTrFinal && elTrad.textContent !== elTrad.dataset.wbwTrFinal) {
        definirTexteSansBoucle(elTrad, elTrad.dataset.wbwTrFinal);
      }
      return;
    }
    if (!forcerRetraduction && elTrad.dataset.wbwTrOk === lang && elTrad.dataset.wbwTrLock === '1') {
      if (elTrad.dataset.wbwTrFinal && elTrad.textContent !== elTrad.dataset.wbwTrFinal) {
        definirTexteSansBoucle(elTrad, elTrad.dataset.wbwTrFinal);
      }
      return;
    }

    var brutDom = (elTrad.textContent || '').trim();
    var sourceEn = (elTrad.dataset.wbwEn || '').trim();
    var brut = sourceEn || brutDom;
    var txtAr = elAr ? (elAr.textContent || '') : '';
    var arPur = nettoyerArabeBrut(txtAr), arNorm = normaliserArabeCle(txtAr);

    function figerTraduction(valFinale) {
      definirTexteSansBoucle(elTrad, valFinale);
      elTrad.dataset.wbwTrFinal = valFinale;
      elTrad.dataset.wbwTrOk = lang;
      elTrad.dataset.wbwTrLock = '1';
    }

    if (tableMuqattaat[arPur]) { figerTraduction(tableMuqattaat[arPur]); return; }
    if (!brut) return;

    if (brut.indexOf('_') !== -1) {
      brut = brut.split('_').join(' ').replace(/\\s{2,}/g, ' ').trim();
      if (!sourceEn) definirTexteSansBoucle(elTrad, brut);
    }
    if (lang === 'en' || lang === 'ar') { figerTraduction(brut); return; }

    var carteParent = elTrad.parentElement;
    var idxMot = (carteParent && carteParent.dataset && carteParent.dataset.wbwOrd) ? (parseInt(carteParent.dataset.wbwOrd, 10) - 1) : -1;
    var cleVerset = obtenirCleVersetActuelDom();

    // En français : attendre le chargement du lexique statique (/lexique-wbw-fr.json) avant tout appel externe
    if (lang === 'fr' && !lexiqueStatiqueFr) {
      chargerLexiqueStatiqueFr().then(function() {
        if (elTrad && elTrad.isConnected && obtenirLanguePage() === 'fr') {
          nettoyerEtTraduireMotUneFois(elTrad, elAr, 'fr', true);
        }
      });
      return;
    }

    if (lang === 'fr') {
      var trLex = chercherDansLexiqueStatiqueFr(sourceEn || brutDom, arNorm, cleVerset, idxMot);
      if (trLex) {
        figerTraduction(trLex);
        return;
      }
    }

    if (!sourceEn && elTrad.dataset.wbwBatchOk === lang && brutDom) {
      figerTraduction(lang === 'fr' ? corrigerFrancaisSelonMorphologieArabe(brutDom, arNorm) : brutDom);
      return;
    }

    // Ne jamais renvoyer un texte déjà en français (même sans accent) vers sl=en
    if (lang === 'fr' && !sourceEn && estDejaFrancaisSansAccent(brutDom)) {
      figerTraduction(corrigerFrancaisSelonMorphologieArabe(brutDom, arNorm));
      return;
    }

    var cleMin = normaliserCleEnLexique(brut);
    var cle = lang + ':' + arNorm + ':' + cleMin;
    if (cacheTradMots[cle]) {
      var valCache = lang === 'fr' ? corrigerFrancaisSelonMorphologieArabe(cacheTradMots[cle], arNorm) : cacheTradMots[cle];
      figerTraduction(valCache);
      return;
    }

    if (enCoursTrad[cle] || Date.now() < (prochainEssaiTrad[cle] || 0)) return;
    enCoursTrad[cle] = true;

    var propreEn = desambiguiserAnglaisCoranique(brut, arNorm);

    function lancerFallbackGtx() {
      fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + encodeURIComponent(lang) + '&dt=t&q=' + encodeURIComponent(propreEn))
        .then(function(r) { return r.ok ? r.json() : Promise.reject(new Error('HTTP')); })
        .then(function(d) {
          if (d && d[0] && d[0][0] && d[0][0][0]) {
            var tr = d[0].map(function(x) { return x[0] || ''; }).join('').trim();
            if (tr) {
              if (lang === 'fr') {
                tr = corrigerFrancaisSelonMorphologieArabe(tr, arNorm);
              }
              cacheTradMots[cle] = tr;
              try { localStorage.setItem('wbw_tr_cache_v125', JSON.stringify(cacheTradMots)); } catch (e) {}
              if (elTrad && elTrad.isConnected && obtenirLanguePage() === lang) {
                figerTraduction(tr);
              }
            }
          }
        })
        .catch(function() { prochainEssaiTrad[cle] = Date.now() + 15000; })
        .finally(function() { delete enCoursTrad[cle]; });
    }

    if ((lang === 'ru' || lang === 'de' || lang === 'id') && typeof numSourateActuelle !== 'undefined' && typeof numVersetActuel !== 'undefined') {
      window.__qdcNativeWbw = window.__qdcNativeWbw || {};
      var vkNat = numSourateActuelle + ':' + numVersetActuel + ':' + lang;
      if (window.__qdcNativeWbw[vkNat] && window.__qdcNativeWbw[vkNat][arNorm]) {
        var trNat = window.__qdcNativeWbw[vkNat][arNorm];
        cacheTradMots[cle] = trNat;
        figerTraduction(trNat);
        delete enCoursTrad[cle];
        return;
      }
      if (!window.__qdcNativeWbw['req_' + vkNat]) {
        window.__qdcNativeWbw['req_' + vkNat] = fetch('https://api.quran.com/api/v4/verses/by_key/' + numSourateActuelle + ':' + numVersetActuel + '?language=' + lang + '&words=true&word_fields=text_uthmani,translation')
          .then(function(r) { return r.ok ? r.json() : null; })
          .then(function(dNat) {
            var mapNat = {};
            if (dNat && dNat.verse && Array.isArray(dNat.verse.words)) {
              dNat.verse.words.forEach(function(wNat) {
                if (wNat && wNat.text_uthmani && wNat.translation && wNat.translation.text) {
                  mapNat[normaliserArabeCle(wNat.text_uthmani)] = wNat.translation.text.trim();
                }
              });
            }
            window.__qdcNativeWbw[vkNat] = mapNat;
            return mapNat;
          }).catch(function() { return {}; });
      }
      window.__qdcNativeWbw['req_' + vkNat].then(function(mapNat) {
        if (mapNat && mapNat[arNorm]) {
          var trOfficiel = mapNat[arNorm];
          cacheTradMots[cle] = trOfficiel;
          try { localStorage.setItem('wbw_tr_cache_v125', JSON.stringify(cacheTradMots)); } catch (e) {}
          if (elTrad && elTrad.isConnected && obtenirLanguePage() === lang) figerTraduction(trOfficiel);
          delete enCoursTrad[cle];
        } else {
          lancerFallbackGtx();
        }
      });
      return;
    }

    lancerFallbackGtx();
  }

`;

code = code.slice(0, iDebut) + moteurUnifie + code.slice(iFin);

// Validation syntaxique stricte avant écriture
new vm.Script(code, { filename: 'site/assets/verset.js' });
writeSafe(versetJsPath, code);
console.log('✓ site/assets/verset.js unifié et validé (0 erreur).');

// ============================================================================
// 3. METTRE A JOUR sw.js ET _worker.js
// ============================================================================
if (fs.existsSync(swPath)) {
  let sw = fs.readFileSync(swPath, 'utf8');
  if (!sw.includes('/lexique-wbw-fr.json')) {
    sw = sw.replace("'/asbab-nuzul.json'", "'/asbab-nuzul.json',\n  '/lexique-wbw-fr.json'");
  }
  sw = sw.replace(/coran-tafsir-pwa-v(\d+)/, (_, n) => `coran-tafsir-pwa-v${Number(n) + 1}`);
  new vm.Script(sw, { filename: 'site/sw.js' });
  writeSafe(swPath, sw);
  console.log('✓ site/sw.js mis à jour (/lexique-wbw-fr.json pré-caché + version incrémentée).');
}

if (fs.existsSync(workerPath)) {
  let w = fs.readFileSync(workerPath, 'utf8');
  w = w.replace(/const SSR_VERSION = "v(\d+)";/, (_, n) => `const SSR_VERSION = "v${Number(n) + 1}";`);
  writeSafe(workerPath, w);
  console.log('✓ site/_worker.js : SSR_VERSION incrémentée.');
}

console.log('\n🎉 Lexique statique WBW FR + moteur unifié prêts à déployer !');
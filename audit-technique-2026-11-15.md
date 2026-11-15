# Audit technique — corantafsir.com — 15 novembre 2026

Audit en lecture seule des sources demandées : `site/_worker.js`, `generateur.js`, `patch-mot-a-mot.js`, `site/index.html`, `site/sourate-2-verset-2.html`. Lecture complémentaire de `_headers`, des sitemaps, de `tafsir-cache.json` et des données du chapitre 2. Les numéros de ligne désignent les versions examinées. Les commentaires « 120Hz fluide », « durable » ou « garanti » du code ne constituent pas des résultats de tests.

**Verdict : plusieurs défauts majeurs démontrés ; aucune faille critique directement exploitable par un simple `?lang=` n'a été démontrée.** Les correctifs ci-dessous sont proposés, pas appliqués. Les blocs qui nécessitent une dépendance, une liaison Cloudflare ou une modification de plusieurs fonctions le signalent explicitement. Ils doivent être intégrés aux sources de génération avant de reconstruire les pages.

Tests réalisés : transformation du HTML par le vrai Worker avec API simulées, compilation des scripts inline avant/après SSR, réponse de traduction contenant une balise avec gestionnaire d'événement, faux succès MyMemory, inspection des chemins d'erreur, des caches et des boucles audio. Aucune charge hostile envoyée au site public. Aucune mesure sur iPhone/Android réel : ni 120 fps, ni consommation, ni fuite mémoire ne peuvent être certifiés par cette analyse statique.

## 1. Sécurité : entrées, DOM, Worker et en-têtes

### S1 — Majeure, conditionnelle : HTML tiers injecté sans assainissement

**Preuves.** Le Worker incorpore les fragments de traduction à `parts[idx]` sans échappement (`site/_worker.js:392`, `408`), puis les insère dans le tafsir à `573`. Une API simulée renvoyant `<img src=x onerror="console.log(123)">` laisse cette balise intacte dans le HTML et produit `complete: true`. La preuve porte sur le chemin d'injection, sans exécuter le gestionnaire. Une réponse amont compromise ou inattendue peut donc devenir une XSS et être réutilisée par le cache. Cela ne démontre pas qu'un visiteur anonyme puisse contrôler directement cette réponse.

Côté navigateur, les réponses Tajwīd arrivent dans `innerHTML` sans assainissement : page 2:2 lignes `4414`, `4676`, `4691`, `4724` ; sources correspondantes dans `generateur.js:5762`, `6024`, `6039`, `6072`. Le nettoyage des numéros et des voyelles n'est pas un assainissement HTML. Le tafsir français externe n'est pas systématiquement échappé au build (`generateur.js:1162`), contrairement aux branches EN/ES. Une chaîne `</script>` venant de données externes peut aussi sortir d'un JSON inline si seule `JSON.stringify` est utilisée.

**Correctif Worker, sans nouvelle dépendance.** Ajouter cette fonction et l'utiliser uniquement pour les fragments de texte externes, en conservant les balises originales du tafsir :

```js
function escapeHtmlText(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#39;'
  }[c]));
}

// Dans la branche batch de traduireHtmlEnPreservantBalises :
parts[idx] = lead + escapeHtmlText(splitTr[j].trim()) + trail;

// Dans la branche segment par segment :
parts[idx] = lead + escapeHtmlText(r.text) + trail;

// Lors du remplacement du verset de référence :
out = out.replace(regVersetFr, (_, a, b, _old, d) =>
  a + b + escapeHtmlText(versetRes.text) + d
);
```

Les traductions doivent être traitées comme du **texte brut**. Si un fournisseur renvoie des entités HTML, les décoder comme texte avec une bibliothèque adaptée puis échapper ; ne jamais décoder le résultat après son échappement. Les caches existants doivent être purgés/versionnés : corriger uniquement les nouvelles insertions ne nettoie pas leur contenu antérieur. Les fichiers HTML éditoriaux de confiance et les réponses API doivent avoir des chemins distincts.

**Correctif DOM.** Charger une version maintenue de DOMPurify depuis un fichier local, avant le rendu. Assainir également avant le premier `temp.innerHTML`, pas seulement à l'insertion finale :

```js
function nettoyerTajwid(raw) {
  return DOMPurify.sanitize(String(raw ?? ''), {
    ALLOWED_TAGS: ['tajweed', 'span', 'br'],
    ALLOWED_ATTR: ['class'],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: false
  });
}

// Dans extraireMotsTajweedPropres :
temp.innerHTML = nettoyerTajwid(htmlTajweedComplet);

// Dans les deux rendus de mots, ainsi que le modal :
if (modeTajweedActif) {
  span.innerHTML = nettoyerTajwid(w.htmlTajweedMot);
} else {
  span.textContent = w.text_uthmani || '';
}
```

Adapter `span` au nom de l'élément du rendu concerné. Le balisage éditorial autorisé doit être assaini avec sa propre liste. Ne pas utiliser la liste Tajwīd pour les liens et tableaux du tafsir.

Au build, échapper le texte français externe **avant** d'ajouter le balisage contrôlé :

```js
// Au début du traitement de tBrut externe :
let t = echapperHTML(String(tBrut || '')).replace(/\[\d+\]/g, '');

// Pour toute insertion JSON dans un script HTML :
function jsonInline(data) {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
```

L'affectation initiale de `t` remplace celle de la fonction existante ; ne pas ajouter une seconde déclaration. Les traductions DOM ordinaires utilisant `nodeValue`/`textContent` sont déjà mieux protégées. Voir [OWASP DOM XSS](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html) et [DOMPurify](https://github.com/cure53/DOMPurify).

### S2 — Majeure : MyMemory valide des erreurs et tronque le texte

`site/_worker.js:348` transmet seulement `texte.slice(0, 490)`, puis accepte tout `responseData.translatedText` (`352–353`). Le test avec HTTP 200, `responseStatus:403` et un message de quota produit `complete:true` et insère ce message dans le tafsir. Le texte fourni au service est bien réduit à 490 caractères. Ce faux succès peut être stocké pendant un an.

**Remplacer intégralement le troisième moteur par ce bloc.** Il refuse les textes trop longs plutôt que d'en supprimer la fin ; ils doivent être découpés à des frontières de phrase pendant la préparation des traductions, ou confiés à un service approprié.

```js
if (texte.length <= 490) {
  try {
    const endpoint = new URL('https://api.mymemory.translated.net/get');
    endpoint.searchParams.set('q', texte);
    endpoint.searchParams.set('langpair', `fr|${lang}`);
    const response = await fetch(endpoint, {
      headers: BROWSER_HEADERS,
      signal: AbortSignal.timeout(3000),
      redirect: 'error'
    });
    if (response.ok) {
      const data = await response.json();
      const text = data?.responseData?.translatedText;
      const errorText = /MYMEMORY WARNING|QUERY LENGTH LIMIT|FREE TRANSLATIONS/i;
      if (Number(data?.responseStatus) === 200 &&
          typeof text === 'string' && text.trim() && !errorText.test(text)) {
        return { ok: true, text: text.trim(), provider: 'mymemory' };
      }
    }
  } catch (error) {
    console.warn('[SSR] MyMemory indisponible', error.name);
  }
}
return { ok: false, text: texte, provider: 'failed' };
```

Un succès HTTP n'est pas une validation du contenu théologique. Garder une traduction coranique de référence ; les traductions automatiques de tafsir doivent être identifiées et relues, sans être attribuées comme traductions officielles d'un exégète.

### S3 — Majeure : fragmentation du cache et amplification des appels à froid

Les paramètres arbitraires sont conservés dans la clé du cache page (`618–620`). Les URL `?lang=de&x=1` et `?lang=de&x=2` ont le même contenu mais des entrées différentes. Les échecs restent hors cache, et les replis peuvent déclencher trois moteurs pour chaque segment après le batch. Aucun délai maximal, budget global ni dédoublonnage concurrent n'est défini. Des règles WAF externes peuvent exister : leur absence dans les sources ne prouve pas leur absence dans le compte Cloudflare.

**Clé de cache, remplacement des lignes 618–620 :**

```js
const SSR_VERSION = 'audit-fix-1'; // changer à chaque changement de contenu/rendu
function construireCleCache(request, lang) {
  const key = new URL(request.url);
  key.pathname = key.pathname.replace(/\.html$/i, '');
  if (key.pathname === '/index') key.pathname = '/';
  key.search = '';
  if (lang !== 'fr') key.searchParams.set('lang', lang);
  key.searchParams.set('_ssr_v', SSR_VERSION);
  return new Request(key.toString(), { method: 'GET' });
}

// Dans fetch, après normalisation de lang :
const cacheKey = construireCleCache(request, lang);
```

Le cache HTML doit rester indépendant des paramètres de lecture (`khatm_verse`, autoplay) qui sont traités côté navigateur. Ne l'utiliser que pour un contenu public identique entre utilisateurs. Ne pas recopier cookies et autorisation dans sa clé. N'écrire au cache que pour GET ; traiter HEAD sans stocker une réponse vide. Refuser les méthodes inutilisées :

```js
if (!['GET', 'HEAD'].includes(request.method)) {
  return new Response('Method Not Allowed', {
    status: 405, headers: { Allow: 'GET, HEAD' }
  });
}
```

Ajouter `signal: AbortSignal.timeout(3000)` aux appels API et un budget **total** de traduction, pas trois secondes multipliées sans borne par les segments. Le remède le plus robuste consiste à préparer les traductions hors requête utilisateur : fichier statique ou stockage R2/KV, cache edge comme accélérateur. Si la traduction à la demande subsiste, limiter les vrais cache misses par IP et par clé verset/langue avec un mécanisme Cloudflare configuré ; une Map en mémoire n'est pas un quota global. Un point de départ à mesurer est 10 préparations/minute/IP, avec exemption contrôlée pour le préchauffage interne ; ne pas pénaliser toutes les lectures de pages déjà en cache.

### S4 — Majeure : le « cache durable » ne constitue pas un stockage durable

`caches.default` (`438–459`) est évictable et local à un centre de données. Un TTL d'un an ne garantit pas une présence pendant un an. La clé `_tafsir_edge_v82` ne dépend pas du texte source ; une correction peut laisser une traduction ancienne. `tafsir-cache.json` ne contient que **9 versets**, pas 6 236, et pas de version arabe dans ces entrées.

Préparer le corpus dans des fichiers ou R2/KV. Versionner à partir du contenu source, du fournisseur et de la version éditoriale, par exemple `tafsir/{contentVersion}/{sourate}/{verset}/{langue}.html`. Garder les anciennes versions seulement pour un rollback explicite. Le code chargé en mémoire doit aussi être versionné. [Documentation Cache Cloudflare](https://developers.cloudflare.com/workers/runtime-apis/cache/).

### S5 — Mineure à majeure selon exposition : protections navigateur incomplètes

`site/_headers` contient X-Frame-Options SAMEORIGIN, nosniff et Referrer-Policy ; aucune CSP, HSTS ni Permissions-Policy n'y est définie. Le Worker ne les définit pas explicitement sur toutes ses réponses. `_headers` n'est pas une garantie pour les réponses générées par Functions : appliquer les en-têtes dans le Worker, y compris sur les retours précoces et les hits du cache. [Cloudflare Headers](https://developers.cloudflare.com/pages/configuration/headers/).

**Configuration compatible avec les usages constatés**, à ajouter dans `_headers` pour les fichiers statiques et dans le Worker avec le wrapper ci-dessous :

```http
Content-Security-Policy: default-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self' blob: https://everyayah.com https://audio.qurancdn.com; connect-src 'self' https://api.quran.com https://api.qurancdn.com https://translate.googleapis.com https://everyayah.com https://audio.qurancdn.com; worker-src 'self' blob:; upgrade-insecure-requests
Strict-Transport-Security: max-age=31536000
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), autoplay=(self)
```

**Limite importante :** `script-src 'unsafe-inline'` est nécessaire ici pour conserver les scripts et les nombreux `onclick` existants ; cette politique de transition ne bloque pas la XSS par événement HTML démontrée en S1. Ne pas présenter cette CSP comme stricte. Pour la cible stricte : extraire les scripts dans des fichiers locaux, remplacer les gestionnaires inline par `addEventListener`, puis employer `script-src 'self'; script-src-attr 'none'` (ou nonces/hashes construits sur la réponse finale). Un nonce sur les scripts ne rend pas les `onclick` compatibles. Ne pas ajouter `unsafe-eval` : le `new Function` du patch est exécuté dans Node au build, pas dans la page.

Pas de `includeSubDomains`/`preload` HSTS tant que tous les sous-domaines ne sont pas vérifiés. `DENY` suppose que tu ne souhaites aucun affichage en iframe. Les domaines clients5/MyMemory sont des appels **serveur** et n'ont pas besoin d'être autorisés par le `connect-src` du navigateur. La politique ci-dessus couvre les origines trouvées ; vérifier les éventuelles redirections CDN et intégrations activées seulement dans le tableau Cloudflare, d'abord en Report-Only. Aucun endpoint de collecte CSP n'est inventé ici. [MDN CSP](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP).

**Wrapper à intégrer.** Remplacer seulement `export default {` de l'application actuelle par `const application = {`, conserver son corps, puis ajouter ceci à la fin du Worker. Le bloc HTTP ci-dessus donne la valeur de CSP à renseigner dans `CSP_COMPATIBLE`.

```js
const CSP_COMPATIBLE = [
  "default-src 'self'", "base-uri 'none'", "object-src 'none'",
  "frame-ancestors 'none'", "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com", "img-src 'self' data:",
  "media-src 'self' blob: https://everyayah.com https://audio.qurancdn.com",
  "connect-src 'self' https://api.quran.com https://api.qurancdn.com https://translate.googleapis.com https://everyayah.com https://audio.qurancdn.com",
  "worker-src 'self' blob:", "upgrade-insecure-requests"
].join('; ');

function securiserReponse(response) {
  const headers = new Headers(response.headers);
  headers.set('Content-Security-Policy', CSP_COMPATIBLE);
  headers.set('Strict-Transport-Security', 'max-age=31536000');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), autoplay=(self)');
  return new Response(response.body, {
    status: response.status, statusText: response.statusText, headers
  });
}

export default {
  async fetch(request, env, ctx) {
    return securiserReponse(await application.fetch(request, env, ctx));
  }
};
```

**Pas de SSRF, open redirect ou empoisonnement interutilisateur démontré.** `lang` est normalisé par liste blanche (`609–611`), les hôtes des API sont fixes et aucune cible `Location` arbitraire n'est construite depuis un visiteur. La fragmentation de cache est un abus de ressources ; ne pas la confondre avec une preuve de cache poisoning. Conserver cette liste blanche et ne jamais transformer le Worker en proxy acceptant `?url=`.

## 2. Performance mobile et animations 60/120 Hz

### P1 — Majeure : le patch intercepte toutes les animations

`patch-mot-a-mot.js:797–809` remplace globalement `window.requestAnimationFrame`. Chaque callback appelle ensuite `__appliquerRubanColleWBW`, y compris le ciel, la barre de progression, le karaoké et le suivi AfterEffects. Le ciel tourne en permanence (`page 2:2:3922`), donc le travail WBW continue même lorsque le lecteur est en pause. S'ajoutent les polls à 150, 250, 300 et 400 ms, et plusieurs timers par clic/changement.

**Correctif ciblé :** supprimer le wrapper global, et appeler le ruban une seule fois depuis le moteur de suivi avant sa reprogrammation :

```js
// Dans etapeSuiviAudioAfterEffects, juste avant le test final de reprogrammation :
if (typeof window.__appliquerRubanColleWBW === 'function') {
  window.__appliquerRubanColleWBW();
}
```

Appeler aussi le ruban explicitement après le rendu des mots et les événements pause/seek/reset. Supprimer progressivement les polls seulement après avoir relié tous ces changements à un événement ; les supprimer seuls casserait les actualisations. Le moteur AfterEffects retrouve un audio uniquement en lecture et peut arrêter sa propre boucle après décroissance : aucune boucle infinie en pause n'est démontrée dans cette fonction prise isolément.

### P2 — Majeure : mesures de géométrie et préparation répétées

`obtenirCartesMotAMotVisibles` (`page:3058`) mesure les rectangles et modifie des classes dans les mêmes parcours ; son repli parcourt tous les `div`. Le patch lit `getComputedStyle` et masque des éléments avant même son test de signature (`patch:502–540`). Le répéter après plusieurs callbacks multiplie les recalculs possibles. La barre de progression modifie `width` par frame (`page:4048`).

**Correctif :** utiliser les identifiants stables déjà présents et mettre en cache les cartes après chaque rendu. Remplacer la détection géométrique par ce fournisseur dans le code de rendu, et le notifier après avoir rempli `#wbwStageContainer` :

```js
let cartesWbwRendues = [];
function actualiserCacheCartesWbw() {
  const root = document.getElementById('wbwStageContainer');
  cartesWbwRendues = root ? [...root.querySelectorAll('.wbw-word-box')] : [];
}
window.__obtenirCartesWBW = () => {
  const root = document.getElementById('wbwStageContainer');
  return root && root.style.display !== 'none' ? cartesWbwRendues : [];
};
// Appeler actualiserCacheCartesWbw() immédiatement après chaque reconstruction.
```

Le fournisseur ci-dessus concerne les cartes du rendu connu `.wbw-word-box` ; si un autre rendu de cartes est conservé, ajouter sa classe dans la requête de **reconstruction**, jamais un scan géométrique par frame. Déplacer la préparation de grille dans cette reconstruction. Toutes les lectures nécessaires doivent précéder les écritures.

Pour la barre :

```css
.sync-progress-bar {
  width: 100%;
  transform: scaleX(0);
  transform-origin: left center;
}
```

```js
// Remplace progressBar.style.width dans animerBarre :
const ratio = Number.isFinite(audio.duration) && audio.duration > 0
  ? Math.min(1, Math.max(0, audio.currentTime / audio.duration)) : 0;
progressBar.style.transform = `scaleX(${ratio})`;
// Dans arreterVisuel : même propriété avec scaleX(0).
```

### P3 — Majeure pour l'objectif 120 Hz : paints et vitesse dépendant du nombre de frames

Le ruban anime `text-shadow`, couleur et `font-weight` (`patch:767–790`), avec des rayons d'ombre pouvant atteindre environ 46 px. `will-change` est appliqué à toutes les cartes (`596`). Le ciel dessine encore 60 étoiles/10 flocons par frame sur mobile. Le patch supprime déjà le backdrop-filter sur petit écran : il ne faut pas signaler ce filtre comme actif sur tous les mobiles.

À 120 Hz, le budget d'une frame est **8,33 ms**, à partager avec le navigateur. Réserver les variations par frame à transform/opacity du mot courant et éventuellement du suivant, garder police/ombres stables ou modifier une classe au passage du mot, et borner le décor à 30 Hz ou à un fond fixe. Ne pas promouvoir systématiquement chaque mot en couche GPU.

Les coefficients `.22/.18`, `.32/.26/.25` sont liés aux frames : à 120 Hz, la transition prend environ deux fois moins de temps qu'à 60 Hz. Dans chaque moteur, accepter le timestamp rAF et remplacer les coefficients constants par des alphas calculés une fois par frame :

```js
let dernierTimestampSuivi = 0;
function alphasSuivi(timestamp) {
  const dt = dernierTimestampSuivi
    ? Math.min(50, Math.max(0, timestamp - dernierTimestampSuivi)) : 1000 / 60;
  dernierTimestampSuivi = timestamp;
  const alpha = coefficient60Hz => 1 - Math.pow(1 - coefficient60Hz, dt / (1000 / 60));
  return { elevation: alpha(0.22), bleu: alpha(0.18), ruban: alpha(0.32) };
}
// Une fois par frame : const a = alphasSuivi(timestamp);
// energiesMots[m] += (cibleElevation - energiesMots[m]) * a.elevation;
```

Passer le même timestamp au ruban et calculer ses alphas une fois, pas par mot. Réinitialiser le dernier timestamp au retour d'arrière-plan. Respecter `prefers-reduced-motion` pour le décor ; conserver un indicateur discret du mot lu pour l'accessibilité. [Guide rendu et layout](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing), [rAF](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame).

### P4 — Mineure : transfert et parsing répétés

La page 2:2 fait 313 055 octets et `data-sourate-2.js` 991 063 octets avant compression. L'accueil fait 281 430 octets. Le chapitre complet est partagé, ce qui évite 286 téléchargements si le cache fonctionne, mais son téléchargement et son parsing restent nécessaires à la première lecture. Cela ne représente pas un transfert de toutes les 6 236 pages à chaque visite.

Extraire CSS/JS communs vers des fichiers versionnés, mettre en cache les données du chapitre, puis charger le chapitre ou les données utiles à la demande. Vérifier Brotli réellement servi et les volumes transférés dans Network. Le gain n'a pas été mesuré ici.

## 3. SEO international et génération

### I1 — Majeure, reproduite : l'accueil indonésien contient un script invalide après SSR

Les remplacements globaux `out.split(kFr).join(vTr)` (`Worker:533–538`) traversent le HTML **et les scripts**. Après transformation du vrai accueil en indonésien, un script contient une chaîne entre apostrophes terminée par `Al-Qur'an` : `SyntaxError: Unexpected identifier 'an'`. Les scripts non transformés se compilent correctement. Le défaut peut casser la construction de l'accueil, pas seulement une métadonnée.

**Correctif parser, avec dépendance explicite `parse5` à bundler dans le Worker.** Cette fonction remplace les boucles de remplacement global des libellés/attributions et les trois remplacements globaux de `href` en fin de transformation. Ne pas mettre cet import nu dans un `_worker.js` téléversé sans bundling.

```js
import { parse, serialize } from 'parse5';

function localiserDocument(html, lang) {
  const document = parse(html);
  const dictionnaire = {
    ...(UI_TEXTES[lang] || {}),
    [ATTRIBUTIONS_BAS.fr]: ATTRIBUTIONS_BAS[lang] || ATTRIBUTIONS_BAS.fr,
    [ATTRIBUTIONS_HAUT.fr]: ATTRIBUTIONS_HAUT[lang] || ATTRIBUTIONS_HAUT.fr
  };
  const traduire = value => {
    let result = value;
    for (const [fr, cible] of Object.entries(dictionnaire)) {
      result = result.split(fr).join(cible);
    }
    return result;
  };
  function visiter(node) {
    if (['script', 'style', 'template', 'noscript'].includes(node.tagName)) return;
    if (node.nodeName === '#text') node.value = traduire(node.value);
    for (const attr of node.attrs || []) {
      if (['placeholder', 'title', 'aria-label'].includes(attr.name)) {
        attr.value = traduire(attr.value);
      }
      if (node.tagName === 'a' && attr.name === 'href') {
        const u = new URL(attr.value, 'https://corantafsir.com');
        const verse = /^\/sourate-\d+-verset-\d+(?:\.html)?$/.test(u.pathname);
        const home = ['/', '/index', '/index.html'].includes(u.pathname);
        if (u.origin === 'https://corantafsir.com' && (verse || home)) {
          u.pathname = home ? '/' : u.pathname.replace(/\.html$/, '');
          if (lang === 'fr') u.searchParams.delete('lang');
          else u.searchParams.set('lang', lang);
          attr.value = u.pathname + u.search + u.hash;
        }
      }
    }
    for (const child of node.childNodes || []) visiter(child);
  }
  visiter(document);
  return serialize(document);
}

// À la place des remplacements globaux de textes UI et d'attributions :
out = localiserDocument(out, lang);
```

Cette fonction localise les libellés existants et les liens de navigation réels ; elle ne traduit pas tout le tafsir à elle seule. Les remplacements de champs de contenu et métadonnées doivent également être effectués sur des nœuds ciblés à terme. Elle préserve les scripts, donc une apostrophe traduite n'est plus injectée dans du JavaScript. [Documentation parse5](https://parse5.js.org/).

### I2 — Majeure : le build peut annuler le SEO corrigé

Les fichiers finaux examinés ont une canonical sans `.html` et neuf alternates cohérents (`index:638–647`, `2:2:720–729`). Le Worker reconnaît les deux formats d'URL. Les huit sitemaps actuels possèdent chacun 6 237 entrées, soit 49 896 URL, sans `.html`. **Ces éléments sont actuellement cohérents.**

Mais `generateur.js:9732` écrit encore un sitemap monolingue en `.html`, et son template de page (`2088`) n'inclut pas le même pack statique. Une reconstruction via le seul générateur peut donc supprimer la correction. L'audit n'a pas exécuté ce générateur, car il écrit des milliers de fichiers et appelle le réseau.

Imposer un point d'entrée unique qui attend la fin du générateur puis applique les post-traitements SEO et WBW. Le fichier `maj-tafsir.js`, utilisé précédemment pour le SEO, reste une dépendance externe aux cinq fichiers de cet audit : vérifier qu'il est effectivement le post-traitement retenu. Exemple de commande de build, **après correction des étapes elles-mêmes** :

```js
// build.cjs — nouveau point d'entrée, pas de modification des pages à la main
const { execFileSync } = require('node:child_process');
for (const script of ['generateur.js', 'maj-tafsir.js', 'patch-mot-a-mot.js']) {
  execFileSync(process.execPath, [script], { stdio: 'inherit', cwd: __dirname });
}
```

Ne pas modifier le générateur puis oublier les deux post-traitements. Ne pas exécuter ces scripts pendant cet audit. Le test de sortie doit contrôler canonical/alternates, index sitemap, 49 896 URL et compilation des scripts **après SSR dans les huit langues**, pas seulement avant.

### I3 — Majeure conditionnelle : fausses pages et traductions incomplètes

Il n'y a pas de `site/404.html`. Le Worker reconnaît n'importe quels chiffres sans vérifier les bornes. Cloudflare Pages peut utiliser un repli SPA vers l'accueil lorsqu'il n'y a pas de 404 au sommet ; une URL de faux verset peut alors devenir une page HTTP 200 avec un titre de verset inventé. Ce chemin est un risque de soft 404 ; il n'a pas été testé en production dans cet audit. Ajouter un vrai `404.html` et valider les bornes depuis le tableau des 114 sourates avant toute transformation ou traduction. [Comportement Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/).

Correctif de validation sans recopier à la main les 114 nombres : générer un manifeste au build depuis les mêmes données que les pages, l'importer dans le bundle Worker et utiliser cette fonction :

```js
// manifesteVersets : tableau [0, 7, 286, 200, ...] généré par le build.
function versetValide(pathname, manifesteVersets) {
  const match = pathname.match(/^\/sourate-(\d+)-verset-(\d+)(?:\.html)?\/?$/i);
  if (!match) return null; // accueil ou fichier, traité séparément
  const s = Number(match[1]), v = Number(match[2]);
  return Number.isInteger(s) && s >= 1 && s <= 114 &&
    Number.isInteger(v) && v >= 1 && v <= manifesteVersets[s];
}
// Avant cache/SSR : si versetValide(...) === false, répondre 404 + noindex.
```

Les réponses incomplètes sont déjà marquées `no-store` et exclues du cache page : c'est positif. Le mot `complete` signifie réussite technique des tâches contrôlées, pas traduction complète de toute la page ni exactitude du tafsir. Les libellés non couverts par le dictionnaire, les attributions ne correspondant pas exactement à la chaîne attendue et les noms français dans le titre peuvent subsister. Comparer le texte visible sans JavaScript et après hydratation. Des pages presque entièrement françaises sous plusieurs `?lang` peuvent être regroupées comme doublons ; leur exclusion réelle ne peut être déduite des sources. Les hreflang ne garantissent pas un classement. [Google : versions localisées](https://developers.google.com/search/docs/specialty/international/localized-versions).

Le moteur natif conserve aussi un choix depuis `site_lang_v32` et, sur le verset sans paramètre reconnu, depuis `navigator.language` (`page:3992–4001`). Il faut tester l'URL française sans paramètre avec un navigateur anglais et un stockage vierge : le HTML serveur français et le rendu hydraté doivent rester cohérents, ou la langue choisie doit immédiatement être représentée dans une URL explicite. Ne pas déduire du seul retrait de `/cdn-cgi/trace` que toutes les anciennes détections ont disparu.

### I4 — Mineure : description, OpenGraph et données structurées

Le verset n'a pas de meta description statique. Le Worker ne fait qu'un `replace` de cette balise, donc ne peut pas la créer si elle manque ; le JavaScript navigateur la crée ensuite. L'accueil conserve initialement une description anglaise annonçant quatre langues. Aucun JSON-LD, OpenGraph ou Twitter Card n'est présent. Ce ne sont pas des conditions d'indexabilité ni la preuve d'une pénalité.

Au build/SSR final, générer la description, `og:title`, `og:description`, `og:url`, `og:type=article`, `og:locale` et éventuellement une image réelle. Ajouter un `WebPage` ou `CreativeWork` et `BreadcrumbList` décrivant ce qui est visible. Ne pas inventer auteur, organisation, dates, notes ou résultat enrichi spécial « verset ».

```js
// Dans le modèle de page final, avec les mêmes valeurs que la canonical :
const donneesPage = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: urlCanoniqueLang,
  name: titreLocalise,
  description: descriptionLocalisee,
  inLanguage: langue
};
const jsonLd = JSON.stringify(donneesPage).replace(/</g, '\\u003c');
// Insérer jsonLd comme contenu d'un script type="application/ld+json".
// Pour les attributs meta content, utiliser l'échappement HTML du build.
```

Ce bloc emploie les valeurs du modèle à fournir ; ne pas insérer un JSON-LD français fixe sur toutes les traductions. Préférer un seul modèle de métadonnées à trois systèmes qui se corrigent successivement.

## 4. Robustesse audio et cas limites

### A1 — Majeure : course entre chargements de mots et état chargé prématuré

`chargerDonneesMotAMotEtTajweed` met `dernierVersetCharge` à jour avant le réseau (`page:4621`). Sur échec, la fonction sort sans rétablir la possibilité de réessai. Elle affecte aussi `motsActuelsDuVerset` avant une attente de traduction et avant le test d'obsolescence (`4663–4667`). Avec A lent puis B rapide, un modèle A peut remplacer B ; un contrôle tardif empêchant le rendu ne suffit pas si le modèle global est déjà modifié.

**Modifications ciblées dans cette même fonction :**

1. Ajouter les variables ci-dessous près de ses autres états.
2. Remplacer l'affectation anticipée de `dernierVersetCharge` par la prise de signature et de génération.
3. Effectuer les fetch/traductions dans un `try/finally`, en ne modifiant que des variables locales jusque-là. Cloner les objets mots du cache avant de leur ajouter des propriétés.
4. Après le dernier `await`, appliquer le garde puis seulement modifier les globaux et le DOM ; affecter `dernierVersetCharge` après le rendu synchrone réussi.

```js
let wbwGeneration = 0;
let wbwPendingSig = '';
function signatureWbwCourante() {
  const lg = ['fr', 'en', 'es', 'ar'].includes(currentLang) ? currentLang : 'fr';
  return `${numSourateActuelle}:${numVersetActuel}_${lg}_${modeMotAMotActif ? 1 : 0}_${modeTajweedActif ? 1 : 0}`;
}

// À l'entrée du bloc de chargement :
const signatureDemandee = signatureWbwCourante();
if (wbwPendingSig === signatureDemandee) return;
const generationDemandee = ++wbwGeneration;
wbwPendingSig = signatureDemandee;

// Remplace la création de vraisMots, pour ne pas muter les objets du cache :
const vraisMots = dataVerset.words
  .filter(w => w.char_type_name === 'word')
  .map(w => ({ ...w }));

// Après les attentes réseau/traduction, avant tout commit global/DOM :
if (generationDemandee !== wbwGeneration ||
    signatureDemandee !== signatureWbwCourante()) return;
motsActuelsDuVerset = vraisMots;
// Affecter dernierVersetCharge = signatureDemandee APRÈS le rendu existant.

// Dans le finally du try englobant le chargement et le rendu :
if (generationDemandee === wbwGeneration) wbwPendingSig = '';
```

Ce sont les blocs de remplacement à leurs emplacements, pas une seconde implémentation à ajouter après la fonction. Un AbortController seul ne protège pas contre les résultats d'un cache ou d'une traduction déjà en cours. Ajouter du backoff aux réessais pour éviter un nouvel appel toutes les 400 ms pendant une panne.

### A2 — Majeure : un échec de timestamps bloque les réessais

`chargerTimestampsQdc` (`page:3282–3325`) fixe `requetesEnCours[cleChap]=true` sans jamais le libérer. Un premier appel raté en 4G empêche tous les suivants pour ce récitateur/chapitre jusqu'au rechargement. Le patch de traduction mot à mot fait de même (`patch:456–475`).

**Pour les timestamps :** garder un indicateur séparé « chargé », libérer « en cours » dans `finally`, vérifier HTTP et données, et n'inscrire « chargé » qu'après création d'un cache non vide. Après l'échec, attendre au moins 15 secondes ou une action explicite de réessai. Le même principe s'applique au patch de traduction des mots.

```js
// Ajouts dans la portée des caches :
const chapitresTimingCharges = Object.create(null);
const prochainEssaiTiming = Object.create(null);

// Au début de chargerTimestampsQdc, après calcul de cleChap :
if (chapitresTimingCharges[cleChap] || requetesEnCours[cleChap] ||
    Date.now() < (prochainEssaiTiming[cleChap] || 0)) return;
requetesEnCours[cleChap] = true;

// Dans la chaîne existante, vérifier r.ok avant r.json().
// À la fin du traitement VALIDÉ, si au moins un timing exploitable a été créé :
chapitresTimingCharges[cleChap] = true;

// Remplacer le catch vide et ajouter finally :
.catch(() => { prochainEssaiTiming[cleChap] = Date.now() + 15000; })
.finally(() => { delete requetesEnCours[cleChap]; });
```

Dans le patch des mots, libérer également `enCoursTrad[cle]` en `finally`, ajouter un délai de réessai et vérifier `elTrad.isConnected` et la langue actuelle avant d'écrire une traduction tardive. Ne pas garder un marqueur « déjà traité » après un échec.

### A3 — Majeure : un son de mot peut piloter le suivi du verset

Le hook global `HTMLMediaElement.prototype.play` (`page:3392–3410`) mémorise tout média joué comme lecteur courant. Le modal joue `#wbwSingleWordAudio` (`4737`), dont la courte durée peut alors piloter le suivi du verset entier.

**Correction immédiate :** au tout début du wrapper existant, après la déclaration de `origPlay`, conserver seulement le lecteur de verset :

```js
HTMLMediaElement.prototype.play = function () {
  if (this.id !== 'ayahAudio') return origPlay.apply(this, arguments);
  // Le corps existant du hook de verset suit ici, une seule fois.
};
```

Préférer ensuite la suppression du patch de prototype et des écouteurs attachés au seul `#ayahAudio`. Adapter aussi `trouverAudioActif` pour qu'il ne retombe pas sur n'importe quel autre élément audio. Les gardes `__listenersV77` existantes limitent déjà les attachements répétés : aucune fuite d'écouteurs croissant indéfiniment n'a été prouvée.

### A4 — Majeure pour la précision : deux moteurs, deux correspondances de récitateurs

Le mapping utilisé par le suivi AfterEffects donne Dosari `[174,168]` et Minshawi `[9]` (`page:3249`). Le moteur karaoké donne respectivement `13` et `8` (`4352`). Les deux appellent le même endpoint QDC. Il y a donc une incohérence certaine ; lequel correspond au MP3 réellement joué exige de vérifier les métadonnées du fournisseur. La normalisation sur le premier/dernier mot, suivie d'une nouvelle marge artificielle de 0,18/0,35 s (`3314`, `3455`), rend l'alignement approximatif même avec le bon récitateur.

Unifier la table, vérifier le fichier/enregistrement correspondant et garder un seul moteur. Lorsque les segments correspondent exactement à l'audio, comparer directement en millisecondes :

```js
function indexMotDepuisSegments(audio, segments) {
  const ms = audio.currentTime * 1000;
  return segments.findIndex(s => ms >= s.t1 && ms < s.t2);
}
```

Conserver `t1/t2` au chargement au lieu d'en perdre l'offset. Entre deux mots, décider explicitement s'il faut garder le précédent ou aucun. Ne pas appliquer cette comparaison directe à un enregistrement MP3 différent ; afficher alors un mode approximatif, sans promesse de synchronisation exacte.

### A5 — Majeure UX : Retour navigateur non géré

`allerAuVerset` fait `history.pushState` (`page:4194`) mais aucun `popstate` ne restaure le verset. Retour peut changer l'adresse sans changer le contenu ; la synchronisation SEO peut ensuite réimposer l'adresse du verset affiché. Correctif minimal compatible avec l'architecture actuelle, au prix d'un rechargement :

```js
window.addEventListener('popstate', () => window.location.reload());
```

À terme, séparer l'affichage du verset et l'écriture de l'historique, puis restaurer l'état sans `pushState`. Préserver la langue dans chaque entrée et chaque lien.

### A6 — Majeure/mineure : promesses play, interruptions et arrière-plan

`changerRecitateur` appelle `audio.play()` sans gérer son rejet (`page:4065–4068`). `rejouerAudioVerset` ne coupe pas explicitement l'ancienne frame de progression avant de démarrer une nouvelle. Les démarrages doivent partager un jeton de version et un seul identifiant rAF ; annuler avant changement de source et replay. Après chaque `await audio.play()`, vérifier que la source et la version demandées sont encore courantes avant de modifier l'interface. Intercepter AbortError, NotAllowedError et les erreurs réseau, puis proposer une reprise explicite.

Patch immédiat du changement de récitateur :

```js
async function changerRecitateur() {
  try { localStorage.setItem('reciter', select.value); } catch (_) {}
  const reprendre = !audio.paused;
  audio.pause();
  arreterVisuel();
  animId = null;
  majAudio();
  if (!reprendre) return;
  const sourceDemandee = audio.src;
  try {
    await audio.play();
    if (audio.src !== sourceDemandee) return;
    stage.classList.add('playing');
    playBtn.textContent = txtPlay();
    playBtn.classList.add('active');
    if (animId) cancelAnimationFrame(animId);
    animId = requestAnimationFrame(animerBarre);
  } catch (error) {
    if (audio.src === sourceDemandee) arreterVisuel();
    if (error.name !== 'AbortError') console.warn('Lecture interrompue', error.name);
  }
}
```

Ce patch gère la promesse locale ; pour le scénario A→B→A, ajouter un compteur commun incrémenté dans **tous** les changements de verset/source et vérifier ce compteur en plus de `audio.src`. Cela doit être centralisé, pas ajouté indépendamment à plusieurs moteurs.

Traiter `waiting`, `stalled`, `error`, `playing`, `pause`, `ended`, `seeking` et `seeked` ; « chargement » et « lecture effective » sont des états différents. Sur `visibilitychange`, arrêter les animations visuelles cachées sans imposer l'arrêt de l'audio, puis resynchroniser depuis `audio.currentTime` au retour. Faire de même sur `pageshow` pour le bfcache. Ne pas appeler automatiquement `play()` au retour : iOS peut exiger un geste utilisateur. [Comportement rAF](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame).

### A7 — Mineure/conditionnelle : un mot et repli hors réseau

Le patch gère explicitement une seule carte ; aucune division par zéro générale n'a été constatée. Si un verset d'un seul mot n'a encore aucun span et que l'API échoue, le repli peut néanmoins retourner une liste vide (`page:3366`). Créer un span de texte dans cette branche plutôt que renvoyer le vide :

```js
// Dans obtenirElementsMotsAAnimer, quand spansExistants est vide
// et que le texte ne contient effectivement qu'un mot :
const texte = conteneur.textContent.trim();
if (spansExistants.length === 0 && texte && texte.split(/\s+/).length === 1) {
  const mot = document.createElement('span');
  mot.textContent = texte;
  conteneur.replaceChildren(mot);
  return { type: 'spans', items: [mot] };
}
```

## 5. Plan d'action et validation

| Priorité | Criticité | Travail | Critère de sortie |
|---|---|---|---|
| 1 | Majeure | S1 : échapper API, assainir Tajwīd, sécuriser JSON inline | Une réponse API contenant une balise reste du texte ou est rejetée ; aucun événement conservé |
| 2 | Majeure | I1 : arrêter les remplacements dans les scripts | Accueil indonésien et huit langues : tous les scripts inline se compilent après SSR |
| 3 | Majeure | S2/S3 : faux succès, troncature, temps maximal, clé de cache | Quota/429/payload vide => incomplete/no-store ; paramètres parasites ne multiplient plus les caches |
| 4 | Majeure | A1/A2/A3/A5 : courses, réessais, mauvais lecteur, historique | A→B→A rapide, panne puis reprise, modal et Retour rendent toujours le bon verset |
| 5 | Majeure | P1/P2 : retirer le hook rAF et les mesures par frame | Une mise à jour WBW par frame de suivi, aucune boucle de suivi au repos via le ciel |
| 6 | Majeure | A4 : unifier récitateurs et moteur de timing | Un mapping vérifié ; segments correspondant au même enregistrement audio |
| 7 | Majeure | I2/I3/S4 : build unique, 404, stockage versionné | Reconstruction propre reproductible ; 404 réelles ; traductions indépendantes d'un cache évictable |
| 8 | Mineure puis durcissement | Headers/CSP, métadonnées, ressources communes, mouvement réduit | Audio/polices/API fonctionnels ; CSP stricte après migration des handlers ; profils appareils |

**Mesures à effectuer sur appareils physiques.** Safari iPhone 60 Hz ancien + iPhone ProMotion + Chrome Android 60/120 Hz ; privilégier 2:282 pour une forte densité de mots, puis 2:1 pour le mot unique. Tracer 60 s de lecture, pause, ouverture du modal, changement de récitateur et défilement. Examiner durée des frames, forced layout, paints et mémoire ; contrôler 8,33 ms à 120 Hz et 16,67 ms à 60 Hz sans confondre la fréquence d'écran avec celle effectivement choisie par le navigateur. Le mode économie d'énergie peut changer la cadence.

**Scénarios réseau.** Réponses lentes dans un ordre inversé A/B, API 429/500, JSON invalide, traduction vide, quota MyMemory HTTP 200, perte puis reprise 4G, seek arrière/avant, mise en veille iOS et reprise bfcache. Vérifier que le nombre d'écouteurs et de rAF n'augmente pas après 50 changements. Les caches par session et les sérialisations localStorage complètes peuvent croître ; aucune fuite mémoire mesurée n'est affirmée ici.

**Scénarios SEO.** Deux versets et l'accueil dans chaque langue, réponses HTTP sans JavaScript puis rendu navigateur, avec/sans `.html`, langue inconnue, paramètres parasites, URL de verset invalide. Confirmer URL finale, code HTTP, langue du contenu, une canonical, alternates réciproques, métadonnées, et cohérence des 49 896 entrées de sitemap après build complet. L'indexation réelle doit être observée dans Search Console/Yandex Webmaster ; ces tests ne permettent pas de la garantir.

Après corrections : reconstruire avec le point d'entrée unique, tester en préproduction, déployer le Worker et les assets correspondants ensemble, changer les versions de cache et purger les anciennes traductions HTML. Aucun des exemples proposés n'a été appliqué aux sources durant cet audit.

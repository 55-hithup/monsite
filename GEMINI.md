# Règles de développement pour DevSupAi

Ces règles s'appliquent automatiquement à chaque tâche de modification, d'ajout ou de suppression d'éléments sur le site DevSupAi.

## 0. Architecture Static Site Generation (SSG)
Le projet est configuré en SSG hybride via `vite-react-ssg` combiné à `react-router-dom` v7.
* **Dépendances :** Toujours conserver `.npmrc` avec `legacy-peer-deps=true` pour résoudre le conflit nominal de dépendances entre React 19 et React Router v7.
* **Patch Post-installation :** Le package `vite-react-ssg` cherche à importer `react-router-dom/server` ou `react-router-dom/server.js` (qui ne sont pas exportés sous cette forme en v7). Le script de post-installation `scripts/patch-ssg.js` doit être configuré dans `package.json` et maintenu pour corriger l'import dynamiquement vers `react-router`.
* **Sécurisation SSR (Server-Side Rendering) :**
  * Interdiction d'accéder directement à `window`, `document`, ou aux API navigateurs au niveau du module ou dans les constructeurs/corps de composants. Tous les accès doivent se faire dans un hook `useEffect` ou être gardés par un test `typeof window !== 'undefined'`.
  * Les hooks d'appels réseau (ex : Firestore dans `Testimonials.tsx` ou localStorage dans `firebase.ts`) doivent être immédiatement court-circuités avec `if (typeof window === 'undefined') return;` pour éviter des blocages ou ralentissements pendant le build.

## 1. Synchronisation SEO & Sitemaps
Pour toute modification affectant les routes du site ou le contenu d'une page :
* Mettre à jour les métadonnées SEO dans les pages concernées (titre, meta descriptions, Open Graph, Twitter Cards).
* Vérifier et mettre à jour le hostname de génération du sitemap dans `vite.config.ts` (doit être `https://www.devsupai.fr`).
* Mettre à jour `public/robots.txt` si de nouvelles routes doivent être bloquées ou autorisées.
* S'assurer de la présence d'une balise canonique `<link rel="canonical">` pointant vers la version `www.` de l'URL.

## 2. Synchronisation de la documentation globale (Overview)
* Mettre systématiquement à jour le fichier `public/llms.txt` avec les nouvelles routes publiques ou les changements structurels du projet.

## 3. Optimisation des images & Médias
* Les images doivent impérativement être converties au format `.webp` (ou `.svg` pour les logos/icones vectorielles) et compressées à des dimensions réalistes pour éviter les surcharges de bande passante. Aucun format `.png` ou `.jpg` non compressé ne doit être introduit.

## 4. Structure sémantique des titres (Headings)
* Valider que chaque page possède **exactement un seul** titre `<h1>`.
* Veiller à ce que la hiérarchie des balises de titres soit strictement séquentielle (`<h1>` ➔ `<h2>` ➔ `<h3>` ➔ `<h4>`), sans jamais sauter de niveau intermédiaire (par exemple, pas d'élément `<h4>` directement sous un `<h2>`).

## 5. Règles d'accessibilité (A11y) & Contraste
* **Spécificité et contraste des liens :** Pour tout bouton ou lien interactif sur fond de couleur vive (ex: `bg-accent`), s'assurer que la couleur du texte n'est pas surchargée par une règle globale (comme `a { color: #fff }`). Utiliser des styles en ligne explicites (ex: `style={{ color: '#020617' }}`) ou des classes hautement spécifiques pour garantir un ratio de contraste >= 4.5:1 (conforme aux normes WCAG AA).
* **Pagination & Zones tactiles (Carrousels) :** Les boutons de pagination circulaires (ex: `.testi-dot`) doivent conserver leur design visuel minimaliste (8x8px) mais avoir une zone cliquable agrandie à au moins 24x24px (recommandé 32x32px) à l'aide d'un pseudo-élément `::after` transparent positionné en absolu. L'espacement (`gap`) entre ces boutons voisins doit être de 16px minimum pour éviter les chevauchements tactiles.
* **Contrôles de formulaires :** Tous les champs de saisie (y compris les cases à cocher type `checkbox`) doivent impérativement posséder une association d'identifiant unique (`id` sur l'input et `htmlFor` sur le `label`) ou un attribut `aria-label` descriptif pour les lecteurs d'écran.

## 6. Interdiction stricte des Emojis
* **Zero Emoji :** Aucun emoji (caractère ou symbole Unicode de type 🔨, 🏢, ⚡, 🛒, 🌐, etc.) ne doit être présent sur l'ensemble du site DevSupAi (composants, libellés, boutons, balises ou commentaires). Utiliser exclusivement des icônes vectorielles SVG ou `lucide-react`.

## 7. Interdiction stricte des chiffres et statistiques inventés (No Fake Stats)
* **Zero Fake Stats :** Interdiction absolue d'inventer des pourcentages marketing ou des statistiques arbitraires (ex : `+40%`, `+30%`, `+50%`, `doublé en deux mois`). Les études de cas, descriptions de projets, argumentaires et témoignages doivent être strictement factuels, réalistes et centrés sur les fonctionnalités concrètes livrées et la valeur d'usage réelle.

## 8. Modération des Avis et Témoignages par défaut
* **Validation humaine préalable :** Tout avis client généré, injecté ou créé dans le cadre d'exemples doit impérativement être configuré avec `approved: false` (statut « En attente de modération ») pour garantir un contrôle humain exclusif par l'administrateur avant toute mise en ligne publique.

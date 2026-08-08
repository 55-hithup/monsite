# Règles de développement pour DevSupAi

Ces règles s'appliquent automatiquement à chaque tâche de modification, d'ajout ou de suppression d'éléments sur le site DevSupAi.

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

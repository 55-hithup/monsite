# Plan Éditorial & Stratégie Blog (devsupai.fr)
## Cadrage des 6 Articles Longue Traîne (AEO & Query Fan-Out)

Ce document récapitule la confirmation technique de factorisation du template d'article existant ainsi que les 6 plans détaillés d'articles de blog à valider avant toute rédaction.

---

## 1. Confirmation Technique : Factorisation du Template d'Article

### Analyse de l'existant (`/blog/performance-web-sur-mesure`)
L'article initial `ArticlePerformance.tsx` contenait l'intégralité de sa structure JSX codée en dur (~288 lignes) :
- En-tête parallaxe avec fond dépoli
- Métadonnées (Date, temps de lecture, tag)
- Fil d'Ariane (Breadcrumb)
- Corps d'article avec encadrés, citations et listes à puces
- Carte auteur Alexandre Pabst
- Bannière CTA finale de contact

**Diagnostic :** Le template initial n'était pas directement réutilisable sous forme de composant générique sans dupliquer 300 lignes de code JSX à chaque nouvel article (ce qui aurait créé une dette technique majeure et un risque de régression sur le score Lighthouse 100/100).

### Solution de factorisation mise en place : `ArticleTemplate.tsx`
Le composant réutilisable [`src/pages/blog/ArticleTemplate.tsx`](file:///c:/Users/Alex/Desktop/Pro/devsupai%20new%20site/src/pages/blog/ArticleTemplate.tsx) a été développé :
1. **Contrat de données typé (`ArticleData`)** : chaque article est défini sous forme d'objet structuré (titre, chapô, métadonnées, sections H2/H3, listes, encadré « À retenir », liens internes ciblés).
2. **Respect des standards A11y & Lighthouse 100/100** :
   - Hiérarchie stricte des titres (`h1` unique, `h2`, `h3` séquentiels sans saut de niveau).
   - Contraste WCAG AA >= 4.5:1 garanti (`#1A1A1A` pour les titres, `#525252` pour les textes secondaires, `#0284C7` pour les accents).
   - Cibles tactiles >= 32px sur tous les liens et boutons.
   - Zéro Emoji et Zéro Fake Stats.
3. **Données structurées Schema.org** : injection automatique du schéma `BlogPosting` et `BreadcrumbList` cohérent avec l'ensemble du site.
4. **Hook SSR / SSG `onPageRendered` (`vite.config.ts`)** : les métadonnées (`<title>`, `<meta description>`, `<link rel="canonical">`, Schema.org) sont prêtes à être injectées statiquement lors du build SSG pour chaque route.

---

## 2. Les 6 Plans Détaillés d'Articles à Valider

---

### Article 1 : Site internet vs Fiche Google Business

* **Titre proposé** : « Site internet vs Fiche Google Business : lequel choisir en premier pour votre entreprise locale ? »
* **Méta description proposée** : « Faut-il créer un site internet ou une fiche Google Maps en priorité ? Comparatif stratégique pour artisans et PME : visibilité locale, conversion et synergie. »
* **Sous-requêtes fan-out ciblées** :
  - *« Faut-il un site web quand on a déjà une fiche Google Maps ? »*
  - *« Avantages fiche Google Business vs site internet »*
  - *« Comment relier sa fiche Google d'établissement à son site vitrine »*
  - *« Prix création fiche Google Business vs site vitrine artisan »*
* **Maillage interne prévu** :
  - Pack Présence One-Page (`/#services` / Pack Présence 950 €)
  - Catalogue complet des prestations (`/nos-services`)
  - Page pilier métier Artisan & Rénovation (`/sites-internet/artisan-renovation`)
  - Option d'animation Google Business Profile (`/#services`)

#### Plan H2 / H3
- **H2 - 1. La fiche Google Business Profile : l'aimant à visibilité locale immédiate**
  - H3 - Le premier point de contact sur smartphone en recherche locale
  - H3 - Les fonctionnalités clés : avis, itinéraire direct et appel en un clic
  - H3 - Les limites structurelles : dépendance aux règles de Google et espace d'expression restreint
- **H2 - 2. Le site internet sur-mesure : la machine à rassurer et convertir**
  - H3 - Propriété intégrale de votre vitrine : zéro concurrence affichée sur votre page
  - H3 - La qualification des demandes : formulaires précis et galeries de réalisations
  - H3 - Référencement naturel sur la longue traîne (hors du rayon strict de Maps)
- **H2 - 3. Comparatif stratégique : Fiche Maps vs Site Web**
  - H3 - Coût initial vs coût d'entretien récurrent
  - H3 - Propriété des données et indépendance commerciale
  - H3 - Taux de conversion comparé sur les demandes qualifiées
- **H2 - 4. La synergie gagnante : faire travailler les deux canaux ensemble**
  - H3 - Comment un site ultra-rapide balisé `LocalBusiness` renforce le ranking Google Maps
  - H3 - L'accompagnement DevSupAi : Pack Présence et animation Google Business Profile

---

### Article 2 : Pourquoi éviter WordPress pour un petit budget

* **Titre proposé** : « Pourquoi éviter WordPress quand on a un petit budget en 2026 ? »
* **Méta description proposée** : « L'illusion du CMS gratuit décryptée pour les TPE : accumulation des licences de plugins, failles de sécurité, maintenance corrective et lenteurs sur mobile. »
* **Sous-requêtes fan-out ciblées** :
  - *« WordPress est-il vraiment gratuit pour une entreprise ? »*
  - *« Coûts cachés d'un site WordPress sur 3 ans »*
  - *« WordPress ou site sur-mesure pour petit budget »*
  - *« Pourquoi les sites WordPress ralentissent avec le temps »*
* **Maillage interne prévu** :
  - FAQ homepage existante (`/#faq` et question sur les CMS)
  - Pack Présence 950 € sans abonnement (`/#services`)
  - Guide sur la performance et vitesse web (`/blog/performance-web-sur-mesure`)
  - Page À Propos d'Alexandre Pabst (`/a-propos`)

#### Plan H2 / H3
- **H2 - 1. L'illusion de la gratuité : la facture réelle des extensions (plugins)**
  - H3 - Du logiciel libre open-source au panier d'abonnements annuels indispensables
  - H3 - L'accumulation des coûts de licences : constructeur de page, formulaires, sécurité, cache
  - H3 - L'obligation de payer chaque année sous peine de blocage technique
- **H2 - 2. La dette technique et la vulnérabilité permanente**
  - H3 - Pourquoi la majorité des failles de sécurité visent les plugins WordPress tiers
  - H3 - Le risque des mises à jour conflictuelles qui cassent l'affichage
  - H3 - Le coût des dépannages d'urgence auprès d'un prestataire externe
- **H2 - 3. Le fardeau de la lenteur sur mobile (Google Core Web Vitals)**
  - H3 - La surcharge de code (code bloat) : des dizaines de styles et scripts inutiles
  - H3 - L'impact direct sur les visiteurs : un site qui rame perd ses prospects locaux
  - H3 - La pénalisation par Google sur les résultats de recherche sur smartphone
- **H2 - 4. L'alternative sur-mesure sans CMS : investissement net et durable**
  - H3 - Architecture légère React 19 / SSG : zéro licence logicielle payante
  - H3 - Sécurité native : aucune base de données publique exposée
  - H3 - Rentabilité financière constatée dès la fin de la première année

---

### Article 3 : Comment un artisan peut convertir plus de devis

* **Titre proposé** : « Comment un artisan du bâtiment peut convertir plus de devis grâce à son site internet »
* **Méta description proposée** : « Découvrez les leviers concrets pour transformer les visiteurs d'un site artisan en devis signés : réassurance décennale, photos de chantiers réels et formulaires mobiles. »
* **Sous-requêtes fan-out ciblées** :
  - *« Comment avoir plus de devis avec un site artisan »*
  - *« Exemple de site internet artisan bâtiment qui convertit »*
  - *« Éléments indispensables sur un site d'artisan rénovation »*
  - *« Formulaire de demande de devis artisan efficace »*
* **Maillage interne prévu** :
  - Page pilier métier Artisan & Rénovation (`/sites-internet/artisan-renovation`)
  - Témoignage client Mercier Rénovation / Avis vérifiés (`/#avis`)
  - Pack Croissance PME & Artisan (`/#services`)
  - Formulaire de contact direct / étude gratuite (`/#contact`)

#### Plan H2 / H3
- **H2 - 1. Les 3 freins d'un particulier avant de solliciter un artisan**
  - H3 - La peur des malfaçons et le besoin vital de garanties légales vérifiables
  - H3 - Le doute sur le rayon d'intervention géographique réel
  - H3 - L'appréhension d'un devis opaque ou d'une démarche téléphonique contraignante
- **H2 - 2. Les signaux de réassurance indispensables dès l'arrivée sur le site**
  - H3 - Affichage immédiat de la garantie décennale, RC pro et labels (RGE, Qualibat)
  - H3 - Retours d'expérience clients authentiques et géolocalisés (ex. Mercier Rénovation)
  - H3 - Bouton d'appel direct cliquable en permanence sur smartphone
- **H2 - 3. La preuve par l'image : la force des galeries Avant / Après**
  - H3 - Pourquoi les photos de chantiers réels convertissent mieux que les banques d'images
  - H3 - Structurer ses réalisations par corps d'état (rénovation globale, isolation, salle de bain)
  - H3 - Format WebP ultra-léger : de grands visuels nets sans ralentir la page
- **H2 - 4. L'anatomie d'un formulaire de devis pensé pour les chantiers**
  - H3 - Réduire les champs obligatoires au strict nécessaire
  - H3 - Donner la possibilité au client de joindre une photo de sa pièce depuis son mobile
  - H3 - Confirmation automatique et engagement de rappel sous 24h

---

### Article 4 : Boutique en ligne sans commission pour commerçant local

* **Titre proposé** : « Boutique en ligne sans commission : combien peut économiser un commerçant local ? »
* **Méta description proposée** : « Comparatif chiffré des coûts réels entre plateformes à commission (Shopify, marketplaces) et une boutique sur-mesure propriétaire sans frais cachés. »
* **Sous-requêtes fan-out ciblées** :
  - *« Créer une boutique en ligne sans commission sur les ventes »*
  - *« Coût réel d'un site Shopify pour petit commerce »*
  - *« Alternative à Shopify sans abonnement mensuel »*
  - *« Click and collect sur-mesure pour commerce de proximité »*
* **Maillage interne prévu** :
  - Pack Boutique E-Commerce dès 2 600 € (`/#services`)
  - Page pilier métier Commerce & Boutique (`/sites-internet/commerce-boutique`)
  - Étude de cas logiciel sur-mesure LocaTool (`/projets/locatool`)
  - Section contact pour audit de rentabilité (`/#contact`)

#### Plan H2 / H3
- **H2 - 1. Le piège des plateformes e-commerce : le cumul des prélèvements**
  - H3 - L'abonnement mensuel de base (36 € à 105 €/mois) dû chaque mois
  - H3 - Les commissions additionnelles prélevées sur chaque vente (1% à 2% hors frais bancaires)
  - H3 - Le surcoût des modules indispensables (facturation française, gestion des stocks, fidélité)
- **H2 - 2. Comparatif chiffré sur 36 mois pour un commerce de proximité**
  - H3 - Simulation pour un commerce réalisant 30 000 € puis 50 000 € de ventes annuelles en ligne
  - H3 - Le total des ponctions cumulées sur une plateforme captive (4 500 € à 7 500 €)
  - H3 - Le modèle de l'Atelier DevSupAi : forfait initial unique + 39 €/an d'hébergement direct
- **H2 - 3. La liberté technique et commerciale retrouvée**
  - H3 - Encaissement direct sur votre compte Stripe / bancaire sans commission prélevée
  - H3 - Module Click & Collect sur-mesure adapté aux créneaux réels de votre boutique
  - H3 - Propriété totale de votre fichier clients, sans exploitation tierce de vos données
- **H2 - 4. La vitesse d'affichage au service de la conversion**
  - H3 - Chargement sub-seconde : pourquoi chaque dixième de seconde gagné réduit les paniers abandonnés
  - H3 - Parcours d'achat épuré et sans friction sur smartphone

---

### Article 5 : Accessibilité web (RGAA / WCAG) pour petites entreprises

* **Titre proposé** : « Accessibilité web (RGAA / WCAG) : pourquoi c'est aussi un enjeu pour les petites entreprises »
* **Méta description proposée** : « Pourquoi l'accessibilité numérique concerne toutes les PME et artisans : conformité légale européenne, SEO renforcé, élargissement de clientèle et confort mobile. »
* **Sous-requêtes fan-out ciblées** :
  - *« Pourquoi rendre son site web accessible pour une PME »*
  - *« Normes accessibilité web WCAG AA artisan commerçant »*
  - *« Impact de l'accessibilité sur le référencement Google »*
  - *« Directive européenne accessibilité web entreprises »*
* **Maillage interne prévu** :
  - Section engagement qualité et respect des normes (`/#engagement`)
  - Page À Propos d'Alexandre Pabst et standards d'atelier (`/a-propos`)
  - Catalogue des prestations (`/nos-services`)
  - Offres d'audit et développement (`/#services`)

#### Plan H2 / H3
- **H2 - 1. L'accessibilité numérique : sortir des idées reçues**
  - H3 - Qui sont les utilisateurs concernés ? (troubles visuels, daltonisme, difficultés motrices, seniors)
  - H3 - L'accessibilité situationnelle : le confort de tous (consultation en plein soleil, usage à une main)
  - H3 - Pourquoi un site accessible est avant tout un site plus simple et ergonomique pour tout le monde
- **H2 - 2. Le cadre réglementaire et les directives européennes**
  - H3 - La transposition de l'European Accessibility Act (EAA) et ses répercussions graduelles
  - H3 - Anticiper les exigences plutôt que subir une refonte dans l'urgence
  - H3 - Valoriser son image de marque et son sérieux auprès des donneurs d'ordre
- **H2 - 3. Le triple bénéfice commercial et SEO pour une TPE**
  - H3 - Pourquoi Google valorise les sites accessibles (balisage sémantique rigoureux, hiérarchie séquentielle)
  - H3 - L'amélioration de la lisibilité : des contrastes nets (>= 4.5:1) qui réduisent le taux de rebond
  - H3 - Des zones tactiles agrandies (>= 32px) qui suppriment les erreurs de clic sur smartphone
- **H2 - 4. Les standards de conception de l'Atelier DevSupAi**
  - H3 - Respect rigoureux des critères WCAG 2.1 AA intégrés dès le premier jet de code
  - H3 - Score Lighthouse de 100/100 en accessibilité garanti par architecture SSG
  - H3 - Zéro surcoût pour le client : l'accessibilité comme standard de qualité par défaut

---

### Article 6 : IA et développement web pour le client final

* **Titre proposé** : « IA et développement web : ce qui change (et ce qui ne change pas) pour un client final »
* **Méta description proposée** : « Démystification de l'intelligence artificielle dans la création web : gain de rapidité d'exécution, rôle de l'ingénieur humain et pièges des générateurs no-code. »
* **Sous-requêtes fan-out ciblées** :
  - *« Un site web créé par IA est-il fiable et professionnel ? »*
  - *« Différence entre générateur de site IA et développeur web »*
  - *« Comment l'IA est utilisée dans la programmation de sites internet »*
  - *« Rôle du développeur humain face à l'intelligence artificielle »*
* **Maillage interne prévu** :
  - FAQ homepage existante sur la méthode DevSupAi et l'IA (`/#faq`)
  - Étude de cas sur-mesure L'Atelier Gourmand (`/projets/atelier-gourmand`)
  - Page À Propos d'Alexandre Pabst (`/a-propos`)
  - Formulaire de contact (`/#contact`)

#### Plan H2 / H3
- **H2 - 1. Les promesses des générateurs automatiques de sites par IA face à la réalité**
  - H3 - Ce que savent faire les outils grand public : assembler rapidement des maquettes génériques
  - H3 - Les faiblesses structurelles cachées : code lourd, lenteurs, rigidité et impasses SEO
  - H3 - L'absence de responsabilité juridique et de support humain en cas de dysfonctionnement
- **H2 - 2. Comment l'IA est réellement utilisée chez DevSupAi : l'assistant d'atelier**
  - H3 - L'accélération des tâches techniques ingrates : génération de squelettes, tests de non-régression, typage strict
  - H3 - Des délais de livraison réduits sans rogner sur la précision artisanale
  - H3 - L'audit automatisé de la performance et de la sécurité en continu
- **H2 - 3. Ce qui reste 100% humain et irremplaçable**
  - H3 - La compréhension empathique de vos enjeux d'entreprise et de votre contexte local
  - H3 - La direction artistique, le choix des animations fluides et l'ergonomie sur-mesure
  - H3 - L'audit manuel de chaque ligne de code mise en production et la garantie RGPD
- **H2 - 4. La grille de décision pour votre entreprise**
  - H3 - Quand un outil no-code suffit-il, et quand le code sur-mesure artisanal est-il indispensable ?
  - H3 - L'engagement de l'Atelier : un interlocuteur direct dédié, zéro boîte noire, propriété totale du code

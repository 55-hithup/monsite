export interface PlannedArticle {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  cluster: string;
  outline: {
    heading: string;
    points: string[];
  }[];
  keyTakeaway: string;
}

export const blogPlanData: Record<string, Record<string, PlannedArticle>> = {
  fr: {
    'site-internet-vs-google-business': {
      slug: 'site-internet-vs-google-business',
      category: 'Stratégie Locale',
      date: '2026-09-10',
      readTime: '6 min',
      title: 'Site internet vs Fiche Google Business : lequel choisir pour votre entreprise locale ?',
      description: 'Analyse comparative détaillée entre site internet sur-mesure et fiche Google Maps d\'établissement pour PME et artisans. Découvrez pourquoi ces deux canaux sont indissociables.',
      cluster: 'SEO Local & Visibilité Google Maps',
      outline: [
        {
          heading: '1. Les forces et limites de la fiche Google Business Profile',
          points: [
            'Visibilité immédiate dans le Pack Local Google Maps',
            'Avis clients et bouton d\'appel direct en un clic',
            'Dépendance totale à l\'algorithme Google et espace d\'expression restreint',
          ],
        },
        {
          heading: '2. Le rôle stratégique d\'un site internet sur-mesure',
          points: [
            'Propriété intégrale de votre vitrine et de votre image de marque',
            'Conversion des visiteurs via des formulaires de devis personnalisés',
            'Positionnement sur la longue traîne au-delà du seul nom de ville',
          ],
        },
        {
          heading: '3. La synergie gagnante : le duo Fiche Google + Site Web',
          points: [
            'Comment le lien vers un site ultra-rapide booste le classement de votre fiche Maps',
            'L\'impact des données structurées Schema.org LocalBusiness sur l\'affichage enrichi',
            'Plan d\'action recommandé pour les artisans et commerçants locaux',
          ],
        },
      ],
      keyTakeaway: 'Ne choisissez pas entre les deux : votre fiche Google attire l\'attention locale, votre site sur-mesure transforme cette attention en devis signés.',
    },
    'pourquoi-eviter-wordpress-petit-budget': {
      slug: 'pourquoi-eviter-wordpress-petit-budget',
      category: 'Architecture Web',
      date: '2026-09-15',
      readTime: '7 min',
      title: 'Pourquoi éviter WordPress pour un petit budget en 2026 ?',
      description: 'L\'illusion du CMS gratuit décryptée : abonnements récurrents de plugins, failles de sécurité régulières et lenteurs techniques. Pourquoi le sur-mesure est plus rentable dès la 1ère année.',
      cluster: 'Comparatif CMS vs Sur-Mesure',
      outline: [
        {
          heading: '1. Le piège des coûts cachés sur WordPress',
          points: [
            'Thèmes premium et licences annuelles de plugins (sécurité, formulaires, cache)',
            'Accumulation de 400 € à 1 200 € par an d\'abonnements logiciels obligatoires',
            'Maintenance corrective fréquente suite aux ruptures de compatibilité',
          ],
        },
        {
          heading: '2. Lenteurs et pénalités Google Core Web Vitals',
          points: [
            'Surcharge de scripts JavaScript et requêtes CSS superflues',
            'Taux de rebond accru sur smartphone causé par un temps de chargement > 2,5s',
            'Impact direct sur la perte de prospects qualifiés',
          ],
        },
        {
          heading: '3. L\'alternative moderne : le code propriétaire sans abonnement',
          points: [
            'Architecture légère React 19 et génération statique ultra-sécurisée',
            'Zéro base de données exposée publiquement aux attaques par injection',
            'Rentabilité financière démontrée dès les premiers mois d\'exploitation',
          ],
        },
      ],
      keyTakeaway: 'Un site sous CMS gratuit coûte souvent plus cher sur 3 ans qu\'un site sur-mesure, tout en offrant des performances très inférieures.',
    },
    'artisan-convertir-plus-de-devis': {
      slug: 'artisan-convertir-plus-de-devis',
      category: 'Conversion Artisan',
      date: '2026-09-20',
      readTime: '5 min',
      title: 'Comment un artisan du bâtiment peut convertir 2x plus de devis grâce à son site',
      description: 'Guide méthodologique pour les professionnels du bâtiment : structure de page idéale, preuves de réassurance décennale, photos avant/après et formulaires de demande simplifiés.',
      cluster: 'Conversion de Devis & Artisans',
      outline: [
        {
          heading: '1. Soigner les signaux de réassurance indispensables',
          points: [
            'Affichage lisible de la garantie décennale et des assurances',
            'Mise en avant des certifications RGE, Qualibat ou Eco Artisan',
            'Témoignages clients vérifiés géolocalisés pour rassurer les voisins',
          ],
        },
        {
          heading: '2. La force visuelle des photos avant/après chantiers',
          points: [
            'Montrer la transformation concrète plutôt que de simples photos de fin',
            'Organiser par spécialités (rénovation globale, salle de bain, isolation)',
            'Compression WebP pour conserver une netteté parfaite sans ralentir le site',
          ],
        },
        {
          heading: '3. Simplifier le formulaire de contact à l\'extrême',
          points: [
            'Demander uniquement les données utiles au pré-chiffrage',
            'Option d\'envoi de photos du chantier directement depuis le smartphone',
            'Notification instantanée par SMS ou email pour rappeler sous 2 heures',
          ],
        },
      ],
      keyTakeaway: 'Un particulier choisit l\'artisan qui le rassure le plus vite : clarté des photos, preuve d\'assurance et réactivité de réponse font toute la différence.',
    },
    'cout-reel-site-internet-3-ans': {
      slug: 'cout-reel-site-internet-3-ans',
      category: 'Économie & Budget',
      date: '2026-09-25',
      readTime: '8 min',
      title: 'Quel est le coût réel d\'un site internet sur 3 ans ? (Coûts cachés vs sur-mesure)',
      description: 'Calcul complet du coût total de possession (TCO) d\'un site web d\'entreprise sur 36 mois : création initiale, hébergement, licences de plugins et infogérance.',
      cluster: 'Prix & Budget Site Internet',
      outline: [
        {
          heading: '1. La décomposition des postes budgétaires',
          points: [
            'Conception initiale vs abonnements mensuels SaaS ou plateformes (Wix, Shopify)',
            'Coût technique direct de l\'hébergement et du nom de domaine',
            'Renouvellement des extensions et modules indispensables',
          ],
        },
        {
          heading: '2. Tableau comparatif chiffré sur 3 ans',
          points: [
            'Modèle CMS avec abonnement d\'agence : 3 500 € à 7 000 € sur 3 ans',
            'Modèle plateforme captive : 1 200 € à 3 000 € de redevances perpétuelles',
            'Modèle sur-mesure propriétaire DevSupAi : investissement initial + 39 €/an de renouvellement',
          ],
        },
        {
          heading: '3. Les critères pour sécuriser votre investissement digital',
          points: [
            'Clause de propriété intégrale du code source dans le devis',
            'Absence de pénalités de transfert ou de rétention de données',
            'Autonomie de modification sans dépendre d\'un prestataire payant au moindre mot',
          ],
        },
      ],
      keyTakeaway: 'Un développement sur-mesure 100% propriétaire vous libère de tout abonnement captif et s\'avère l\'option la plus économique sur la durée.',
    },
    'reservation-directe-restaurant-sans-commission': {
      slug: 'reservation-directe-restaurant-sans-commission',
      category: 'Restauration',
      date: '2026-09-30',
      readTime: '6 min',
      title: 'Réservation directe pour restaurants : comment se libérer des commissions de plateformes',
      description: 'Pourquoi et comment reprendre la main sur vos réservations de table en direct. Économisez des milliers d\'euros de commissions annuelles tout en fidélisant votre clientèle.',
      cluster: 'Restauration & Réservation Directe',
      outline: [
        {
          heading: '1. Le fardeau financier des intermédiaires (TheFork, plateformes tierces)',
          points: [
            'Commissions prélevées de 2 € à 3,50 € par couvert réservé',
            'Perte de propriété sur le fichier client et les données de contact',
            'Concurrence directe encouragée sur la plateforme vers d\'autres tables',
          ],
        },
        {
          heading: '2. Les clés d\'un moteur de réservation directe réussi',
          points: [
            'Parcours en 4 étapes simples sans inscription préalable requise',
            'Confirmation instantanée par email et rappel automatique anti-no-show',
            'Tableau de bord gérant les services, jauges et fermetures exceptionnelles',
          ],
        },
        {
          heading: '3. Étude concrète : le cas de L\'Atelier Gourmand',
          points: [
            'Conception sur-mesure d\'un moteur de réservation multilingue 7 langues',
            '0 € de commission reversée et autonomie totale du chef',
            'Rentabilisation de l\'outil dès les deux premiers mois de service',
          ],
        },
      ],
      keyTakeaway: 'Chaque réservation directe est une marge conservée à 100% pour votre restaurant et un lien direct avec vos clients réguliers.',
    },
    'ia-creation-site-web-opportunites-pieges': {
      slug: 'ia-creation-site-web-opportunites-pieges',
      category: 'Intelligence Artificielle',
      date: '2026-10-05',
      readTime: '7 min',
      title: 'L\'intelligence artificielle dans la création web : opportunités réelles et pièges à éviter',
      description: 'Démystification de l\'IA dans le développement web : pourquoi les générateurs automatiques no-code échouent sur la durée et comment le pilotage humain par agents produit un code d\'élite.',
      cluster: 'IA & Méthode de Développement',
      outline: [
        {
          heading: '1. Les limites des générateurs de sites automatiques no-code',
          points: [
            'Génération de code générique lourd, non optimisé et difficilement maintenable',
            'Failles de sécurité potentielles et absence d\'audit sémantique approfondi',
            'Impossibilité d\'ajuster finement les micro-interactions et le responsive complexe',
          ],
        },
        {
          heading: '2. La véritable valeur de l\'IA : l\'assistant d\'ingénierie supervisé',
          points: [
            'Accélération du prototypage et tests de résistance automatisés',
            'Refactorisation rigoureuse et vérification de la conformité WCAG AA',
            'Contrôle qualité permanent exercé par un développeur humain chevronné',
          ],
        },
        {
          heading: '3. Ce que cela change pour vous, client PME ou artisan',
          points: [
            'Des délais de livraison réduits sans aucun sacrifice de qualité artisanale',
            'Un interlocuteur humain direct responsable de la fiabilité de chaque ligne de code',
            'Un site ultra-performant noté 100/100 sur Google Lighthouse',
          ],
        },
      ],
      keyTakeaway: 'L\'IA ne remplace pas l\'artisan développeur : elle augmente sa précision et vous offre un niveau d\'exigence technique autrefois réservé aux grands comptes.',
    },
  },
  en: {
    'site-internet-vs-google-business': {
      slug: 'en/blog/site-internet-vs-google-business',
      category: 'Local Strategy',
      date: '2026-09-10',
      readTime: '6 min',
      title: 'Website vs Google Business Profile: Which One for Your Local Business?',
      description: 'In-depth comparison between a custom website and a Google Maps profile for SMEs and contractors. Discover why both channels must work in tandem.',
      cluster: 'Local SEO & Google Maps Visibility',
      outline: [
        {
          heading: '1. Strengths and limitations of Google Business Profile',
          points: [
            'Immediate visibility in Google Maps 3-Pack',
            'Customer reviews and direct call button',
            'Total dependency on Google policies and limited branding space',
          ],
        },
        {
          heading: '2. The strategic role of a bespoke website',
          points: [
            'Full ownership of your digital storefront and brand identity',
            'Higher conversion through specialized quote request funnels',
            'Ranking for regional long-tail queries beyond a single town name',
          ],
        },
        {
          heading: '3. The winning synergy: Google Profile + Custom Site',
          points: [
            'How linking to a fast website elevates your Maps ranking',
            'Impact of Schema.org LocalBusiness structured data',
            'Recommended action plan for local businesses',
          ],
        },
      ],
      keyTakeaway: 'Do not choose between them: your Google listing captures initial local attention, while your custom site turns that attention into signed contracts.',
    },
    'pourquoi-eviter-wordpress-petit-budget': {
      slug: 'en/blog/pourquoi-eviter-wordpress-petit-budget',
      category: 'Web Architecture',
      date: '2026-09-15',
      readTime: '7 min',
      title: 'Why Avoid WordPress on a Small Budget in 2026?',
      description: 'The hidden costs of "free" CMS: recurring plugin subscriptions, frequent security vulnerabilities, and slow page loads. Why bespoke code is more profitable from year one.',
      cluster: 'CMS vs Bespoke Code Comparison',
      outline: [
        {
          heading: '1. The hidden costs trap of WordPress',
          points: [
            'Premium themes and annual plugin licenses (security, forms, cache)',
            'Accumulating €400 to €1,200 per year in compulsory subscriptions',
            'Frequent troubleshooting when plugin updates break the layout',
          ],
        },
        {
          heading: '2. Speed penalties & Google Core Web Vitals',
          points: [
            'Bloated JavaScript payloads and redundant stylesheet requests',
            'Increased bounce rates on smartphones due to slow load times (>2.5s)',
            'Direct loss of qualified business inquiries',
          ],
        },
        {
          heading: '3. The modern alternative: 100% proprietary code',
          points: [
            'Lean React 19 architecture with secure static site generation',
            'Zero publicly exposed database vectors for injection attacks',
            'Demonstrated financial profitability within the first months of operation',
          ],
        },
      ],
      keyTakeaway: 'A "free" CMS website frequently costs significantly more over 3 years than a bespoke site, while delivering substantially inferior performance.',
    },
    'artisan-convertir-plus-de-devis': {
      slug: 'en/blog/artisan-convertir-plus-de-devis',
      category: 'Contractor Conversion',
      date: '2026-09-20',
      readTime: '5 min',
      title: 'How Contractors Can Double Quote Conversion Rates with Their Website',
      description: 'Methodological guide for building trades: ideal page structure, liability insurance badges, before/after photography, and streamlined inquiry forms.',
      cluster: 'Quote Conversion & Contractors',
      outline: [
        {
          heading: '1. Essential trust signals and reassurance badges',
          points: [
            'Prominent display of liability guarantees and certifications',
            'Quality badges (RGE, Qualibat, Master Craftsman)',
            'Geolocated verified customer testimonials',
          ],
        },
        {
          heading: '2. The visual persuasion of before/after photos',
          points: [
            'Displaying the transformation journey rather than just final photos',
            'Categorizing by specialty (renovation, roofing, electrical)',
            'WebP compression to maintain crisp detail without slowing down pages',
          ],
        },
        {
          heading: '3. Streamlining the inquiry form to the essentials',
          points: [
            'Requesting only key details required for initial estimation',
            'Option to upload project photos directly from a smartphone',
            'Instant notifications enabling follow-up within 2 hours',
          ],
        },
      ],
      keyTakeaway: 'Homeowners choose the contractor who inspires trust fastest: photo proof, clear credentials, and fast response make all the difference.',
    },
    'cout-reel-site-internet-3-ans': {
      slug: 'en/blog/cout-reel-site-internet-3-ans',
      category: 'Economics & Budget',
      date: '2026-09-25',
      readTime: '8 min',
      title: 'What Is the Real 3-Year Cost of a Website? (Hidden Fees vs Bespoke)',
      description: 'Complete breakdown of the Total Cost of Ownership (TCO) for a business website over 36 months: initial build, hosting, plugin licenses, and maintenance.',
      cluster: 'Website Cost & Budgeting',
      outline: [
        {
          heading: '1. Breaking down website expenditure categories',
          points: [
            'Initial design vs recurring monthly SaaS fees (Wix, Shopify)',
            'Direct server hosting and domain renewal fees',
            'Compulsory third-party extensions and maintenance contracts',
          ],
        },
        {
          heading: '2. 3-year comparative cost evaluation',
          points: [
            'CMS agency model: €3,500 to €7,000 over 3 years',
            'Captive hosted platforms: €1,200 to €3,000 in perpetual rent',
            'DevSupAi bespoke proprietary code: initial build + €39/yr renewal',
          ],
        },
        {
          heading: '3. Essential clauses to protect your digital investment',
          points: [
            '100% source code ownership explicitly written in the agreement',
            'Zero data transfer penalties or migration fees',
            'Autonomous editing freedom without recurring agency retainer fees',
          ],
        },
      ],
      keyTakeaway: '100% proprietary custom development frees you from recurring software fees and proves to be the most cost-effective solution over time.',
    },
    'reservation-directe-restaurant-sans-commission': {
      slug: 'en/blog/reservation-directe-restaurant-sans-commission',
      category: 'Hospitality & Dining',
      date: '2026-09-30',
      readTime: '6 min',
      title: 'Direct Restaurant Reservations: Freeing Yourself from Platform Commissions',
      description: 'Why and how restaurateurs should regain direct control over their bookings. Save thousands in annual fees while building loyal customer relationships.',
      cluster: 'Hospitality & Direct Bookings',
      outline: [
        {
          heading: '1. The heavy financial toll of third-party platforms (TheFork, etc.)',
          points: [
            'Commissions ranging from €2 to €3.50 per cover booked',
            'Loss of customer database ownership and direct communication',
            'Competing restaurant suggestions featured on the same platform',
          ],
        },
        {
          heading: '2. Core pillars of an effective direct booking engine',
          points: [
            '4-step frictionless booking flow without mandatory account creation',
            'Instant confirmation emails and automatic reminders to curb no-shows',
            'Operational dashboard to configure capacity, sittings, and holiday hours',
          ],
        },
        {
          heading: '3. Real-world case study: L\'Atelier Gourmand',
          points: [
            'Custom 7-language direct reservation engine',
            'Zero commissions paid and total chef autonomy',
            'Complete return on investment within the first two months of service',
          ],
        },
      ],
      keyTakeaway: 'Every direct reservation keeps 100% of profit margins inside your restaurant and strengthens direct ties with repeat guests.',
    },
    'ia-creation-site-web-opportunites-pieges': {
      slug: 'en/blog/ia-creation-site-web-opportunites-pieges',
      category: 'Artificial Intelligence',
      date: '2026-10-05',
      readTime: '7 min',
      title: 'AI in Web Development: Real Opportunities and Pitfalls to Avoid',
      description: 'Demystifying AI in software craftsmanship: why automated no-code generators fail over time and how human-supervised agentic engineering produces elite code.',
      cluster: 'AI & Development Methodology',
      outline: [
        {
          heading: '1. Pitfalls of generic no-code automated AI website generators',
          points: [
            'Bloated, non-maintainable code with unpredictable visual regressions',
            'Overlooked security vulnerabilities and flawed semantic SEO structures',
            'Inability to tailor responsive layouts and micro-interactions with precision',
          ],
        },
        {
          heading: '2. The true power of AI: supervised engineering acceleration',
          points: [
            'Accelerated prototyping and automated regression testing',
            'Rigorous refactoring and WCAG 2.1 AA accessibility validation',
            'Continuous oversight by an experienced human software craftsman',
          ],
        },
        {
          heading: '3. What this means for SMEs and local business owners',
          points: [
            'Faster turnaround without compromising on hand-crafted quality',
            'A dedicated human point of contact accountable for every line of code',
            'An ultra-fast website scoring 100/100 across all Google Lighthouse metrics',
          ],
        },
      ],
      keyTakeaway: 'AI does not replace the web craftsman: it augments technical precision to deliver enterprise-grade performance to local businesses and SMEs.',
    },
  },
};

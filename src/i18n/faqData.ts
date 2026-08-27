export interface FaqItem {
  q: string;
  short: string;
  detail: string;
}

export const faqData = {
  fr: {
    columnLeft: [
      {
        q: "Comment est défini le tarif d'un projet sur-mesure ?",
        short: "Mes tarifs sont transparents, indicatifs et adaptés à vos besoins réels : à partir de 950 € pour le Pack Présence (One-Page), à partir de 1 850 € pour le Pack Croissance (site vitrine 3 à 5 pages), et à partir de 3 200 € pour une application web ou un outil SaaS sur-mesure (base TJM 400 €/jour).",
        detail: "Ces montants constituent des prix de départ indicatifs. Chaque projet fait l'objet d'une étude préalable et d'un devis gratuit personnalisé chiffrant avec exactitude vos fonctionnalités, sans aucun frais caché ni abonnement logiciel obligatoire.",
      },
      {
        q: 'Pourquoi le sur-mesure est-il plus rentable sur la durée ?',
        short: 'Un site sous modèle générique accumule souvent des abonnements payants de plugins (sécurité, formulaires, thème) générant 400 € à 1 200 € par an.',
        detail: "Avec DevSupAi, vous ne payez aucun abonnement tiers obligatoire. Votre code est propre, ne souffre d'aucune obsolescence et conserve un affichage instantané qui maximise vos conversions.",
      },
      {
        q: 'Combien de temps dure la réalisation d\'un projet web ?',
        short: 'Les délais de livraison varient de 1 à 2 semaines pour un Pack Présence, de 2 à 4 semaines pour un Pack Croissance (vitrine 3-5 pages), et de 4 à 8 semaines pour une application SaaS.',
        detail: 'Un calendrier précis avec des jalons de validation intermédiaire est fixé dès la signature du devis pour garantir le respect des échéances.',
      },
      {
        q: 'Proposez-vous la gestion de la fiche Google Business et le référencement local ?',
        short: 'Oui, une prestation mensuelle dédiée est proposée dès 29 €/mois pour animer, optimiser et référencer votre fiche d\'établissement sur Google Maps.',
        detail: "Elle comprend l'optimisation initiale, la publication régulière d'actualités/photos, la réponse aux avis clients et le suivi de positionnement local.",
      },
    ],
    columnRight: [
      {
        q: 'Suis-je propriétaire à 100 % de mon site internet et de mes données ?',
        short: "Oui, vous êtes l'unique et total propriétaire de l'intégralité du code source, de vos contenus, de votre base de données et de votre nom de domaine.",
        detail: "Aucun contrat d'engagement forcé : vous êtes libre de faire évoluer ou d'héberger votre projet où vous le souhaitez.",
      },
      {
        q: 'Quels sont les frais récurrents à prévoir (hébergement & domaine) ?',
        short: "L'hébergement sécurisé haute performance et votre nom de domaine sont inclus la première année dans chaque forfait.",
        detail: "Par la suite, le coût technique direct de renouvellement reste minime (généralement entre 40 € et 90 € par an selon l'envergure du projet), sans surcoût imposé.",
      },
      {
        q: 'Puis-je administrer moi-même les contenus ou les données de mon site ?',
        short: "Selon vos besoins, une interface d'administration intuitive peut être intégrée à votre projet.",
        detail: "Si votre activité nécessite de mettre à jour des actualités, des réservations ou du matériel (comme pour LocaTool), l'outil est conçu pour être simple sans compétences techniques.",
      },
      {
        q: 'Quel suivi ou accompagnement est proposé après la mise en ligne ?',
        short: "Chaque livraison s'accompagne d'une période de garantie technique et d'une assistance à la prise en main.",
        detail: "Des forfaits d'infogérance, de maintenance préventive et de sauvegardes régulières sont disponibles dès 29 €/mois pour assurer votre sérénité.",
      },
    ],
  },
  en: {
    columnLeft: [
      {
        q: 'How is the pricing of a custom project defined?',
        short: 'Pricing is clear, indicative, and tailored to your actual scope: starting at €950 for the Presence Pack (One-Page), starting at €1,850 for the Growth Pack (3 to 5 pages), and starting at €3,200 for a custom SaaS web app (based on a €400/day rate).',
        detail: 'These rates serve as indicative starting points. Every project begins with a free discovery review and a detailed itemized quote with no hidden fees or required third-party software subscriptions.',
      },
      {
        q: 'Why is custom development more cost-effective over time?',
        short: 'Sites built on generic templates often accumulate recurring paid plugin fees (security, forms, theme updates) costing €400 to €1,200 per year.',
        detail: 'With DevSupAi, you pay zero mandatory third-party software subscriptions. Your code is clean, free of forced obsolescence, and loads instantly to maximize visitor conversions.',
      },
      {
        q: 'How long does it take to deliver a web project?',
        short: 'Turnaround ranges from 1 to 2 weeks for a Presence Pack, 2 to 4 weeks for a Growth Pack (3-5 pages), and 4 to 8 weeks for a SaaS application.',
        detail: 'A clear schedule with intermediate validation milestones is established upon quote signature to ensure deadlines are strictly honored.',
      },
      {
        q: 'Do you offer Google Business Profile management and local SEO?',
        short: 'Yes, a dedicated monthly service is available from €29/month to manage, optimize, and rank your business listing on Google Maps.',
        detail: 'This includes initial profile tuning, recurring posts and photo updates, customer review management, and local search visibility tracking.',
      },
    ],
    columnRight: [
      {
        q: 'Do I own 100% of my website and data?',
        short: 'Yes, you are the sole, full owner of all source code, content, databases, and domain names.',
        detail: 'No lock-in contracts: you are completely free to host, scale, or migrate your project wherever you wish.',
      },
      {
        q: 'What recurring costs should be expected (hosting & domain)?',
        short: 'High-performance secure hosting and domain registration are included for the first year with every package.',
        detail: 'Afterwards, direct technical renewal fees remain minimal (typically €40 to €90 per year depending on project scale), with zero artificial markups.',
      },
      {
        q: 'Can I manage website content and data independently?',
        short: 'Depending on your needs, an intuitive custom administration panel can be integrated into your project.',
        detail: 'If your business requires updating news, bookings, or rental fleets (like LocaTool), the tool is engineered for effortless use without coding knowledge.',
      },
      {
        q: 'What ongoing support is provided following deployment?',
        short: 'Every delivery includes a technical warranty period and dedicated onboarding assistance.',
        detail: 'Preventive maintenance, backup, and managed hosting plans are available from €29/month for complete peace of mind.',
      },
    ],
  },
};

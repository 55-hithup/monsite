import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import SectionReveal from './SectionReveal';

export default function FAQ() {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [activeLeftIndex, setActiveLeftIndex] = useState<number | null>(null);
  const [activeRightIndex, setActiveRightIndex] = useState<number | null>(null);

  const faqData = [
    {
      q: 'Comment est défini le tarif d\'un projet sur-mesure ?',
      short: 'Nos forfaits sont transparents et adaptés à vos besoins réels : dès 690 € pour le Pack Présence (One-Page), dès 1 350 € pour le Pack Croissance (site vitrine 3 à 5 pages), et dès 2 450 € pour une application web ou un outil SaaS sur-mesure (base TJM 350 €).',
      detail: 'Chaque projet fait l\'objet d\'un devis détaillé chiffrant exactement ce dont vous avez besoin, sans frais cachés ni abonnements obligatoires de plugins.',
    },
    {
      q: 'Pourquoi le sur-mesure est-il plus rentable sur la durée qu\'un modèle pré-conçu ?',
      short: 'Un site sous modèle ou CMS générique accumule souvent des dizaines de plugins payants (thème, constructeur de page, sécurité, formulaires) générant 400 € à 1 200 € d\'abonnements annuels récurrents.',
      detail: 'Avec la création sur-mesure DevSupAi, vous ne payez aucun abonnement logiciel tiers captif. Votre code est propre, ne souffre d\'aucune obsolescence de plugin et conserve un affichage instantané qui maximise vos conversions.',
    },
    {
      q: 'Combien de temps dure la réalisation d\'un projet web ?',
      short: 'Les délais de livraison varient de 1 à 2 semaines pour un Pack Présence (One-Page), de 2 à 4 semaines pour un Pack Croissance (vitrine 3-5 pages), et de 4 à 8 semaines pour une application SaaS ou un outil métier.',
      detail: 'Un calendrier précis avec des jalons de validation intermédiaire est fixé dès la signature du devis pour garantir le respect strict des échéances.',
    },
    {
      q: 'Quels sont les frais récurrents à prévoir (hébergement & nom de domaine) ?',
      short: 'L\'hébergement sécurisé haute performance et votre nom de domaine sont inclus la première année dans nos forfaits.',
      detail: 'Par la suite, le coût technique direct de renouvellement reste minime (généralement entre 40 € et 90 € par an selon l\'envergure du projet), sans surcoût imposé.',
    },
    {
      q: 'Suis-je propriétaire à 100 % de mon site internet et de mes données ?',
      short: 'Oui, vous êtes l\'unique et total propriétaire de l\'intégralité du code source, de vos contenus, de votre base de données et de votre nom de domaine.',
      detail: 'Aucun contrat d\'engagement forcé ni clause d\'exclusivité : vous êtes libre de faire évoluer ou héberger votre projet où vous le souhaitez.',
    },
    {
      q: 'Puis-je administrer moi-même les contenus ou les données de mon projet ?',
      short: 'Selon la nature de votre projet et vos besoins, une interface d\'administration ou un système de gestion adapté peut être développé sur-mesure.',
      detail: 'Si votre activité nécessite de mettre à jour des actualités, des réservations ou du matériel (comme pour le logiciel LocaTool), l\'outil est conçu pour être simple d\'utilisation sans formation complexe.',
    },
    {
      q: 'Quel suivi ou accompagnement est proposé après la mise en ligne ?',
      short: 'Chaque livraison s\'accompagne d\'une période de garantie technique et d\'une assistance à la prise en main.',
      detail: 'Pour assurer une sérénité maximale, des forfaits d\'infogérance, de maintenance préventive et de sauvegardes régulières sont disponibles à partir de 29 €/mois, ou via des interventions ponctuelles à la demande.',
    },
    {
      q: 'Proposez-vous un accompagnement pour la gestion de ma fiche Google Business et le référencement local ?',
      short: 'Oui, une prestation mensuelle dédiée est proposée dès 29 €/mois pour animer, optimiser et référencer votre fiche d\'établissement sur Google Maps.',
      detail: 'La Formule Starter (29 €/mois) assure l\'optimisation initiale, les posts réguliers et la réponse aux avis clients. La Formule Boost (99 à 179 €/mois) intègre une stratégie de positionnement local avancée sur les requêtes ciblées de votre secteur.',
    },
  ];

  const expertiseData = [
    {
      q: 'Comment un site vitrine permet-il à une PME de gagner la confiance de ses clients ?',
      short: 'En proposant une navigation fluide, une présentation claire de vos services et un formulaire de contact accessible en un clic.',
      detail: 'La première impression est cruciale : un site sur-mesure professionnel renvoie instantanément une image de sérieux et d\'organisation moderne qui rassure les clients potentiels.',
      badge: 'Site Vitrine PME',
    },
    {
      q: 'Comment un portail web aide-t-il une association à informer et rassembler ses membres ?',
      short: 'En centralisant la présentation des projets, l\'agenda des événements et les formulaires d\'adhésion sur une interface simple à utiliser.',
      detail: 'Cela permet de structurer les échanges, de faciliter la gestion administrative et d\'augmenter l\'engagement de vos membres grâce à un point de contact unique et interactif.',
      badge: 'Portail Association',
    },
    {
      q: 'Pourquoi une boutique en ligne sur-mesure facilite-t-elle le parcours d\'achat ?',
      short: 'Parce que les pages de produits et les étapes de paiement s\'affichent sans lenteur, évitant de perdre le client avant la validation du panier.',
      detail: 'L\'optimisation technique élimine toute friction lors du paiement (intégration Stripe sécurisée, vitesse de chargement instantanée).',
      badge: 'Vente en Ligne',
    },
    {
      q: 'Comment une application web métier simplifie-t-elle l\'organisation d\'une entreprise ?',
      short: 'En remplaçant les documents éparpillés par un outil unique pour suivre l\'activité, gérer les plannings ou suivre le matériel (comme le logiciel LocaTool).',
      detail: 'Une solution SaaS sur-mesure automatise vos tâches répétitives et réunit vos collaborateurs sur un outil partagé adapté précisément à vos processus internes.',
      badge: 'Application & SaaS',
    },
    {
      q: 'Comment assurer la visibilité d\'un site sur Google ?',
      short: 'En concevant une structure de code épurée et des contenus bien organisés pour faciliter l\'indexation par les moteurs de recherche.',
      detail: 'Un site propre techniquement (balisage HTML5 sémantique strict, vitesse d\'affichage maximale) donne d\'excellents signaux à Google pour améliorer votre classement naturel.',
      badge: 'Structure & Visibilité',
    },
    {
      q: 'Comment maintenir un site web sécurisé et à jour sur la durée ?',
      short: 'En choisissant une structure propre et légère qui demande peu d\'interventions complexes tout en restant parfaitement protégée.',
      detail: 'Sans dépendances de CMS obsolètes ni plugins tiers vulnérables, les risques de failles de sécurité et de pannes de serveurs sont minimisés au maximum.',
      badge: 'Suivi & Sérénité',
    },
  ];

  // Combiner les deux sources de données pour la structure SEO JSON-LD
  const allFaqData = [
    ...faqData.map((item) => ({ q: item.q, a: `${item.short} ${item.detail}` })),
    ...expertiseData.map((item) => ({ q: item.q, a: `${item.short} ${item.detail}` })),
  ];

  const faqSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqData.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  };

  return (
    <SectionReveal id="faq" className="faq-section">
      <script type="application/ld+json">
        {JSON.stringify(faqSchemaMarkup)}
      </script>

      <div className="wrap max-w-6xl">
        <div className="text-center mb-6">
          <div className="eyebrow reveal justify-center">FOIRE AUX QUESTIONS</div>
          <h2 className="section-title reveal mt-2">Questions fréquentes & expertises</h2>
          <p className="text-sm text-text-secondary mt-3 reveal max-w-2xl mx-auto">
            Retrouvez nos réponses claires sur le déroulement de vos projets et nos domaines d'intervention.
          </p>
        </div>

        {/* Bouton de contrôle global de la FAQ */}
        <div className="flex justify-center mb-6 reveal">
          <button
            onClick={() => setIsFaqOpen(!isFaqOpen)}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#2E8FE0]/40 bg-[#121729]/80 text-xs md:text-sm font-semibold text-[#2E8FE0] hover:bg-[#2E8FE0]/10 transition-all duration-300 shadow-[0_0_20px_rgba(46,143,224,0.1)] cursor-pointer"
            aria-expanded={isFaqOpen}
          >
            <HelpCircle size={16} />
            <span>{isFaqOpen ? 'Masquer la foire aux questions' : 'Afficher les questions fréquentes & cas d\'usage'}</span>
            {isFaqOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Grille Double-Colonne masquable */}
        <div
          className="transition-all duration-500 ease-in-out overflow-hidden text-left"
          style={{
            maxHeight: isFaqOpen ? '3500px' : '0px',
            opacity: isFaqOpen ? 1 : 0,
            pointerEvents: isFaqOpen ? 'auto' : 'none',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            
            {/* Colonne de Gauche : Commercial & Organisation */}
            <div>
              <h3 className="text-xs label-mono font-bold text-text-primary uppercase tracking-wider mb-6 border-b border-[rgba(245,246,250,0.08)] pb-2">
                Tarification & Organisation
              </h3>
              <div className="faq-list space-y-4">
                {faqData.map((item, idx) => {
                  const isActive = activeLeftIndex === idx;
                  return (
                    <div key={idx} className={`faq-item rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] transition-colors ${isActive ? 'active border-[#2E8FE0]/40' : ''}`}>
                      <button
                        className="faq-q w-full text-left flex items-center justify-between cursor-pointer focus:outline-none gap-4"
                        onClick={() => setActiveLeftIndex(isActive ? null : idx)}
                        aria-expanded={isActive}
                      >
                        <span className="font-semibold text-text-primary text-sm md:text-base leading-snug">{item.q}</span>
                        <span className="faq-plus flex-shrink-0 text-accent font-bold text-lg">{isActive ? '−' : '+'}</span>
                      </button>
                      <div
                        className="faq-a transition-all duration-300 ease-in-out"
                        style={{
                          maxHeight: isActive ? '500px' : '0px',
                          opacity: isActive ? 1 : 0,
                          overflow: 'hidden',
                        }}
                      >
                        <div className="faq-a-in pt-4 pb-5 px-6 border-t border-[rgba(245,246,250,0.06)] text-xs md:text-sm text-text-secondary space-y-2">
                          <p className="p-3 rounded-lg bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-text-primary font-medium">
                            {item.short}
                          </p>
                          <p className="leading-relaxed pt-1">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Colonne de Droite : Domaines d'Expertise & Cas d'usage */}
            <div>
              <h3 className="text-xs label-mono font-bold text-text-primary uppercase tracking-wider mb-6 border-b border-[rgba(245,246,250,0.08)] pb-2">
                Expertise & Cas d'usage
              </h3>
              <div className="faq-list space-y-4">
                {expertiseData.map((item, idx) => {
                  const isActive = activeRightIndex === idx;
                  return (
                    <div key={idx} className={`faq-item rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] transition-colors ${isActive ? 'active border-[#2E8FE0]/40' : ''}`}>
                      <button
                        className="faq-q w-full text-left flex items-center justify-between cursor-pointer focus:outline-none gap-4"
                        onClick={() => setActiveRightIndex(isActive ? null : idx)}
                        aria-expanded={isActive}
                      >
                        <div className="flex flex-col gap-1 text-left">
                          <span className="text-[10px] label-mono text-cyan-300 font-bold uppercase tracking-wider">{item.badge}</span>
                          <span className="font-semibold text-text-primary text-sm md:text-base leading-snug">{item.q}</span>
                        </div>
                        <span className="faq-plus flex-shrink-0 text-accent font-bold text-lg">{isActive ? '−' : '+'}</span>
                      </button>
                      <div
                        className="faq-a transition-all duration-300 ease-in-out"
                        style={{
                          maxHeight: isActive ? '500px' : '0px',
                          opacity: isActive ? 1 : 0,
                          overflow: 'hidden',
                        }}
                      >
                        <div className="faq-a-in pt-4 pb-5 px-6 border-t border-[rgba(245,246,250,0.06)] text-xs md:text-sm text-text-secondary space-y-2">
                          <p className="p-3 rounded-lg bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-text-primary font-medium">
                            {item.short}
                          </p>
                          <p className="leading-relaxed pt-1">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

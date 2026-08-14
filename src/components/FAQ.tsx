import { useState } from 'react';
import SectionReveal from './SectionReveal';

export default function FAQ() {
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

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const faqSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${item.short} ${item.detail}`,
      },
    })),
  };

  return (
    <SectionReveal id="faq" className="section-pad">
      <script type="application/ld+json">
        {JSON.stringify(faqSchemaMarkup)}
      </script>

      <div className="wrap max-w-4xl">
        <div className="text-center mb-[50px]">
          <div className="eyebrow reveal justify-center">QUESTIONS FRÉQUENTES</div>
          <h2 className="section-title reveal mt-2 whitespace-normal md:whitespace-nowrap">Questions fréquentes sur vos projets web</h2>
          <p className="text-sm text-text-secondary mt-3 reveal max-w-2xl mx-auto">
            Des réponses claires et réalistes sur la réalisation de votre site ou application.
          </p>
        </div>
        
        <div className="faq-list space-y-4">
          {faqData.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div key={idx} className={`faq-item reveal rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] transition-colors ${isActive ? 'active border-[#2E8FE0]/40' : ''}`}>
                <button
                  className="faq-q w-full text-left flex items-center justify-between cursor-pointer focus:outline-none gap-4"
                  onClick={() => toggleIndex(idx)}
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
    </SectionReveal>
  );
}

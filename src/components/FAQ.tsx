import { useState } from 'react';
import SectionReveal from './SectionReveal';

export default function FAQ() {
  const faqData = [
    {
      q: 'Combien coûte la création d\'un site web sur-mesure pour une PME ou une association ?',
      short: 'Le tarif dépend des fonctionnalités spécifiques, mais un projet web complet débute généralement à partir de 1 500 € pour un site vitrine optimisé.',
      detail: 'Chaque proposition fait l\'objet d’un devis transparent et détaillé après une étude de vos besoins. Aucun frais d\'abonnement récurrent n\'est imposé : vous êtes propriétaire à 100 % de votre site et de votre nom de domaine.',
    },
    {
      q: 'Pourquoi choisir un site web sur-mesure plutôt qu\'un template WordPress ou Wix ?',
      short: 'Le sur-mesure garantit un temps de chargement sous les 600ms, un score Google Lighthouse de 100/100, un référencement SEO optimal et une sécurité totale.',
      detail: 'Les templates pré-conçus (WordPress, Wix, Elementor) sont alourdis par du code inutile et des extensions vulnérables qui ralentissent votre site et pénalisent votre conversion. Avec du code sur-mesure (React, TypeScript), votre PME ou association dispose d\'un outil unique, rapide et évolutif.',
    },
    {
      q: 'Puis-je modifier le contenu de mon site moi-même sans compétences techniques ?',
      short: 'Oui, une interface d\'administration intuitive et sur-mesure peut être intégrée pour que vous puissiez gérer vos articles, actualités et visuels en toute autonomie.',
      detail: 'Je vous forme lors de la livraison du site et vous fournis un guide d\'utilisation simple pour mettre à jour votre contenu en quelques clics, sans risque de casser la mise en page.',
    },
    {
      q: 'Proposez-vous des formules et facilités adaptées aux budgets des associations loi 1901 ?',
      short: 'Oui, des formules d\'accompagnement spécifiques et des facilités de paiement sont proposées pour s\'adapter aux contraintes budgétaires des associations.',
      detail: 'L\'objectif est de doter votre association d\'un site moderne et professionnel (formulaires d\'adhésion, d\'événements ou de dons) tout en respectant votre budget associatif.',
    },
    {
      q: 'Combien de temps dure la réalisation d\'un projet web ?',
      short: 'La durée moyenne de développement est de 3 à 6 semaines, de la phase de cadrage à la mise en ligne finale.',
      detail: 'Un calendrier précis est défini au lancement du projet avec des jalons réguliers pour valider chaque étape (conception graphique, développement, tests et optimisation SEO).',
    },
    {
      q: 'Comment se passe la maintenance et la sécurité après la mise en ligne ?',
      short: 'Plusieurs formules de maintenance sont disponibles pour assurer les sauvegardes, la surveillance de sécurité et l\'optimisation continue de votre site.',
      detail: 'Contrairement aux CMS classiques qui nécessitent des mises à jour constantes d\'extensions vulnérables, un site sur-mesure moderne est extrêmement stable et sécurisé par nature.',
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
    <SectionReveal id="faq" className="section-pad" style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <script type="application/ld+json">
        {JSON.stringify(faqSchemaMarkup)}
      </script>

      <div className="wrap max-w-4xl">
        <div className="text-center mb-[50px]">
          <div className="eyebrow reveal justify-center">FAQ & CIBLES</div>
          <h2 className="section-title reveal mt-2">Questions fréquentes des PME & Associations.</h2>
          <p className="text-sm text-text-secondary mt-3 reveal max-w-2xl mx-auto">
            Retrouvez les réponses synthétiques et détaillées aux interrogations les plus courantes sur la création et la refonte de sites web.
          </p>
        </div>
        
        <div className="faq-list space-y-4">
          {faqData.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div key={idx} className={`faq-item reveal rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] p-5 transition-colors ${isActive ? 'active border-[#2E8FE0]/40' : ''}`}>
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
                    maxHeight: isActive ? '300px' : '0px',
                    opacity: isActive ? 1 : 0,
                    overflow: 'hidden',
                  }}
                >
                  <div className="faq-a-in pt-4 mt-3 border-t border-[rgba(245,246,250,0.06)] text-xs md:text-sm text-text-secondary space-y-2">
                    <p className="p-3 rounded-lg bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-text-primary font-medium">
                      ⚡ <strong>Réponse rapide :</strong> {item.short}
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

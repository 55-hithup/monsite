import { useState } from 'react';
import SectionReveal from './SectionReveal';

export default function FAQ() {
  const faqData = [
    {
      q: 'Comment est défini le tarif d\'un projet sur-mesure ?',
      short: 'Chaque projet (site vitrine, application métier, logiciel SaaS) ayant un périmètre spécifique, un devis clair et détaillé est établi sur-mesure après un premier échange gratuit.',
      detail: 'Cela permet de chiffrer uniquement ce dont vous avez réellement besoin, sans vous imposer de packs génériques inutiles.',
    },
    {
      q: 'Pourquoi privilégier le sur-mesure par rapport à un modèle pré-conçu ?',
      short: 'Le sur-mesure offre une structure épurée et réactive, sans fonctions inutiles ni ralentissements sur smartphone.',
      detail: 'Votre site ou application répond exactement à l\'image de votre entreprise ou association et reste facile à faire évoluer au fil des ans.',
    },
    {
      q: 'Puis-je administrer moi-même les contenus ou les données de mon projet ?',
      short: 'Selon la nature de votre projet et vos besoins, une interface d\'administration ou un système de gestion adapté peut être développé sur-mesure.',
      detail: 'Si votre activité nécessite de mettre à jour des actualités, des réservations ou du matériel (comme pour le logiciel LocaTool), l\'outil est conçu pour être simple d\'utilisation.',
    },
    {
      q: 'Combien de temps dure le développement d\'un projet web ?',
      short: 'Le délai dépend directement de l\'ampleur et de la complexité des fonctionnalités à créer.',
      detail: 'Un planning clair et des étapes de validation sont fixés dès le départ lors de la signature du devis.',
    },
    {
      q: 'Quel suivi ou accompagnement est proposé après la mise en ligne ?',
      short: 'Selon la nature du projet et vos souhaits, des solutions de suivi, de maintenance ou de prise en main peuvent être intégrées.',
      detail: 'L\'objectif est de vous garantir un outil stable et durable dans le temps.',
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

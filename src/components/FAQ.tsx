import { useState } from 'react';
import SectionReveal from './SectionReveal';

export default function FAQ() {
  const faqData = [
    {
      q: 'Combien coûte la création d\'un site web sur-mesure pour une PME ou une association ?',
      short: 'Le tarif dépend des fonctionnalités dont vous avez réellement besoin. Un devis clair et détaillé est établi après notre premier échange.',
      detail: 'Chaque projet fait l\'objet d\'une étude personnalisée sans engagement. Vous êtes propriétaire de votre site et de votre nom de domaine.',
    },
    {
      q: 'Pourquoi choisir un site web sur-mesure plutôt qu\'un modèle pré-conçu ?',
      short: 'Un site sur-mesure s\'affiche rapidement sur mobile, ne contient aucun fichier inutile et offre un visuel unique adapté à votre image.',
      detail: 'Les modèles pré-conçus (WordPress, Wix, thèmes génériques) intègrent souvent des options lourdes que vous n\'utiliserez jamais. Le sur-mesure vous garantit un site épuré, sécurisé et facile à faire évoluer.',
    },
    {
      q: 'Puis-je modifier le contenu de mon site moi-même sans connaissances techniques ?',
      short: 'Oui, une interface simple est mise en place pour que vous puissiez mettre à jour vos textes, actualités et visuels en toute autonomie.',
      detail: 'Je vous forme lors de la livraison et vous fournis des explications claires pour modifier vos informations en quelques clics.',
    },
    {
      q: 'Proposez-vous des solutions adaptées aux budgets des associations ?',
      short: 'Oui, nous étudions ensemble les fonctionnalités essentielles pour proposer un outil efficace adapté aux capacités de votre association.',
      detail: 'L\'objectif est de doter votre association d\'un site clair (présentation des activités, formulaires de contact ou d\'adhésion) sans alourdir vos charges.',
    },
    {
      q: 'Combien de temps prend la réalisation d\'un projet web ?',
      short: 'La création dure généralement quelques semaines, selon la complexité du projet et la validation des contenus.',
      detail: 'Un planning clair est défini au lancement pour vous permettre de suivre l\'avancement à chaque étape (conception graphique, développement, tests).',
    },
    {
      q: 'Comment se passe le suivi et la sécurité après la mise en ligne ?',
      short: 'Des solutions d\'accompagnement sont prévues pour assurer la tranquillité d\'esprit, la sécurité et la mise à jour de votre site.',
      detail: 'Grâce à une structure épurée et moderne, le site reste très stable dans le temps et demande peu de maintenance lourde.',
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
          <h2 className="section-title reveal mt-2">Questions posées par les PME & Associations.</h2>
          <p className="text-sm text-text-secondary mt-3 reveal max-w-2xl mx-auto">
            Retrouvez des réponses simples et directes aux interrogations les plus courantes sur la création de site internet.
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

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useJsonLd } from '../../hooks/useJsonLd';
import { useLanguage } from '../../i18n/LanguageContext';

export default function GlacierFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { isEn } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Animation En-tête
      if (headerRef.current) {
        const targets = Array.from(headerRef.current.children);
        if (targets.length > 0) {
          gsap.fromTo(
            targets,
            { opacity: 0, y: 30, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 85%',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // 2. Animation des questions FAQ : Arrivée dynamique depuis l'extérieur de l'écran avec cascade resserrée
      if (cardsContainerRef.current) {
        const cards = Array.from(cardsContainerRef.current.children);
        const faqTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          },
        });

        const offscreenX = typeof window !== 'undefined' ? window.innerWidth + 100 : 1200;

        cards.forEach((card, idx) => {
          const fromLeft = idx % 2 === 0;
          const questionTitle = card.querySelector('.faq-question-title');
          const chevronBadge = card.querySelector('.faq-chevron-badge');
          // Délai resserré entre chaque question pour un enchaînement dynamique sans temps mort
          const insertPosition = idx === 0 ? 0 : '-=0.52';

          // Animation du conteneur de la carte (départ depuis l'extérieur de l'écran avec fond bleu identité)
          faqTimeline.fromTo(
            card,
            {
              opacity: 0,
              x: fromLeft ? -offscreenX : offscreenX,
              filter: 'blur(8px)',
              backgroundColor: '#0284C7',
              borderColor: '#0284C7',
              transition: 'none',
            },
            {
              opacity: 1,
              x: 0,
              filter: 'blur(0px)',
              backgroundColor: '#F8F8F8',
              borderColor: '#E5E5E5',
              duration: 0.62,
              ease: 'power3.out',
              clearProps: 'backgroundColor,borderColor,transition',
            },
            insertPosition
          );

          // Animation du texte de la question (du blanc vers le noir foncé d'origine)
          if (questionTitle) {
            faqTimeline.fromTo(
              questionTitle,
              {
                color: '#FFFFFF',
                transition: 'none',
              },
              {
                color: '#1A1A1A',
                duration: 0.62,
                ease: 'power3.out',
                clearProps: 'color,transition',
              },
              insertPosition
            );
          }

          // Animation de la pastille du chevron (de la pastille transparente blanche vers le bouton neutre d'origine)
          if (chevronBadge) {
            faqTimeline.fromTo(
              chevronBadge,
              {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                color: '#FFFFFF',
                transition: 'none',
              },
              {
                backgroundColor: '#FFFFFF',
                borderColor: '#E5E5E5',
                color: '#555555',
                duration: 0.62,
                ease: 'power3.out',
                clearProps: 'backgroundColor,borderColor,color,transition',
              },
              insertPosition
            );
          }
        });
      }
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const homeFaqItems = isEn ? [
    {
      question: "How much does a custom website or web app cost with DevSupAi?",
      answer: "Starting packages are clear and transparent: the Presence Pack (One-Page) starts at €950, the SME Growth Pack (3 to 5 pages) starts at €1,850, and bespoke SaaS applications start from €3,200 (based on a daily rate of €400/day). Every quote is free, detailed, and completely free of recurring software subscriptions.",
    },
    {
      question: "Why choose custom bespoke code instead of a CMS (WordPress, Wix)?",
      answer: "A bespoke coded website (React 19, TypeScript, Tailwind) benefits from a lean, lightweight architecture without bloated plugins. You get optimized loading times, enhanced security against vulnerabilities, and full ownership of your code with zero ongoing license fees.",
    },
    {
      question: "Where do you provide your web development services?",
      answer: "DevSupAi is based in Saint-Mihiel (Meuse, Grand Est, France). I work on-site with clients across Saint-Mihiel, Commercy, Verdun, Bar-le-Duc, Nancy, Metz, and the Grand Est region, as well as remotely via video calls with businesses across France and worldwide.",
    },
    {
      question: "What are the typical project turnaround and delivery timelines?",
      answer: "Turnarounds are typically 1 to 2 weeks for a One-Page showcase, 2 to 3 weeks for a 3 to 5-page business vitrine, and 4 to 6 weeks for custom SaaS tools and software. A clear milestone calendar is agreed upon before starting.",
    },
    {
      question: "Do I fully own my website, code, and domain name?",
      answer: "Yes, absolutely. Upon project completion, you retain 100% exclusive ownership of your source code, design assets, database, and domain name. There are no compulsory maintenance contracts or recurring software lock-ins.",
    },
  ] : [
    {
      question: "Combien coûte la création d'un site internet sur-mesure avec DevSupAi ?",
      answer: "Les forfaits de départ sont transparents : le Pack Présence (One-Page) démarre à 950 €, le Pack Croissance PME (site vitrine 3 à 5 pages) à 1 850 €, et les applications web SaaS ou outils métiers à partir de 3 200 € (base TJM 400 €/jour). Chaque devis est gratuit, détaillé et sans aucun abonnement logiciel mensuel captif.",
    },
    {
      question: "Pourquoi choisir un développement artisanal sur-mesure plutôt qu'un CMS (WordPress, Wix) ?",
      answer: "Un site codé sur-mesure (React 19, TypeScript, Tailwind) bénéficie d'une architecture épurée sans plugins superflus. Vous profitez de temps de chargement optimisés, d'une sécurité renforcée contre les failles et d'une propriété intégrale de votre code sans frais de licence récurrents.",
    },
    {
      question: "Dans quelles zones géographiques intervenez-vous pour vos prestations web ?",
      answer: "L'atelier DevSupAi est situé au 13 Allée des Roses à Saint-Mihiel (55300) en Meuse. J'interviens en présentiel à Saint-Mihiel, Commercy, Verdun, Bar-le-Duc, Nancy, Metz et dans toute la région Grand Est, ainsi qu'à distance par visioconférence pour des clients partout en France et à l'international.",
    },
    {
      question: "Quels sont les délais de conception et de mise en ligne d'un projet ?",
      answer: "Comptez généralement 1 à 2 semaines pour un site One-Page, 2 à 3 semaines pour un site vitrine 3 à 5 pages, et 4 à 6 semaines pour une application SaaS métier sur-mesure. Un calendrier de livraison précis est établi dès la validation du devis.",
    },
    {
      question: "Suis-je propriétaire de mon site internet et de mon nom de domaine ?",
      answer: "Oui, absolument. Dès le règlement de la facture finale, vous êtes l'unique propriétaire du code source, des identifiants, des visuels et du nom de domaine. Vous ne subissez aucun engagement de maintenance obligatoire.",
    },
  ];

  // Schema.org FAQPage for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homeFaqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  useJsonLd(faqSchema, isEn ? "home-faqpage-schema-en" : "home-faqpage-schema-fr");

  return (
    <div id="faq-atelier">
      {/* 1. Bandeau En-tête avec Fond Parallaxe Fixe */}
      <section 
        className="glacier-faq-header-parallax py-16 md:py-24 text-center relative overflow-hidden" 
        aria-labelledby="faq-title"
      >
        <div 
          className="faq-parallax-bg" 
          style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
        />
        <div className="faq-parallax-tint" />

        <div 
          ref={headerRef}
          className="container mx-auto px-6 max-w-3xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/40 bg-sky-500/20 text-xs font-bold font-['Montserrat'] text-sky-300 mb-4">
            <HelpCircle size={14} className="text-sky-300" aria-hidden="true" />
            <span>{isEn ? "ANSWERS & ADVICE" : "RÉPONSES & CONSEILS"}</span>
          </div>
          
          <h2 id="faq-title" className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-white mb-3 tracking-tight">
            {isEn ? "FREQUENTLY ASKED QUESTIONS" : "QUESTIONS FRÉQUENTES"}
          </h2>
          <p className="text-sm sm:text-base text-slate-200 font-['Plus_Jakarta_Sans']">
            {isEn
              ? "Everything you need to know about bespoke web development, pricing, and project methodology."
              : "Tout ce qu'il faut savoir sur la méthode sur-mesure, les tarifs et l'accompagnement DevSupAi en Meuse et France."}
          </p>
        </div>
      </section>

      {/* 2. Questions & Réponses sur Fond Blanc Épuré */}
      <section 
        className="py-16 md:py-24 bg-white text-center border-b border-[#E5E5E5] overflow-hidden" 
        aria-label={isEn ? "Frequently Asked Questions" : "Questions fréquentes"}
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <div ref={cardsContainerRef} className="space-y-4">
            {homeFaqItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border transition-all duration-300 ease-out text-center ${
                    isOpen
                      ? 'border-[#0284C7] bg-white shadow-md'
                      : 'border-[#E5E5E5] bg-[#F8F8F8] hover:border-[#CCCCCC]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-center gap-4 cursor-pointer focus:outline-none group"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-question-${idx}`}
                  >
                    <span className="w-[30px] shrink-0 invisible" aria-hidden="true" />
                    <h3 className="faq-question-title text-sm sm:text-base font-bold font-['Montserrat'] text-[#1A1A1A] leading-snug text-center transition-colors duration-200 group-hover:text-[#0284C7] flex-1">
                      {item.question}
                    </h3>
                    <span className={`faq-chevron-badge shrink-0 p-1.5 rounded-full bg-white border transition-all duration-300 ${
                      isOpen ? 'border-[#0284C7] text-[#0284C7] bg-sky-50' : 'border-[#E5E5E5] text-[#555555]'
                    }`}>
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={`transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                      />
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-4 pt-4 border-t border-[#E5E5E5] text-xs sm:text-sm text-[#555555] leading-relaxed font-['Plus_Jakarta_Sans'] text-center">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}


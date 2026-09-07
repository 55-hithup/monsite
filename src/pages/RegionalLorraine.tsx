import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  MapPin, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles,
  Zap
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { debouncedScrollTriggerRefresh } from '../utils/scrollTriggerRefresh';
import GlacierParallaxBreak from '../components/glacier/GlacierParallaxBreak';
import ParallaxLogoVoyager from '../components/glacier/ParallaxLogoVoyager';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { useJsonLd } from '../hooks/useJsonLd';
import { useLanguage } from '../i18n/LanguageContext';

export default function RegionalLorraine() {
  const { isEn } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const pageContainerRef = useRef<HTMLDivElement>(null);
  const heroEyebrowRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroTrustSignalsRef = useRef<HTMLDivElement>(null);

  const whyHeaderRef = useRef<HTMLDivElement>(null);
  const whyCardsRef = useRef<HTMLDivElement>(null);

  const territoriesHeaderRef = useRef<HTMLDivElement>(null);
  const territoriesGridRef = useRef<HTMLDivElement>(null);

  const casesHeaderRef = useRef<HTMLDivElement>(null);
  const casesGridRef = useRef<HTMLDivElement>(null);

  const packagesHeaderRef = useRef<HTMLDivElement>(null);
  const packagesGridRef = useRef<HTMLDivElement>(null);

  const faqHeaderRef = useRef<HTMLDivElement>(null);
  const faqContainerRef = useRef<HTMLDivElement>(null);

  const bannerCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024;

      // 1. HERO ELEMENTS (Timeline au montage : départ vif, décélération fluide)
      const heroTl = gsap.timeline();

      if (heroEyebrowRef.current) {
        heroTl.fromTo(
          heroEyebrowRef.current,
          { opacity: 0, y: -18, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power4.out', clearProps: 'transform,opacity' },
          0
        );
      }

      if (heroTitleRef.current) {
        heroTl.fromTo(
          heroTitleRef.current,
          { opacity: 0, y: 30, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
          0.06
        );
      }

      if (heroDescRef.current) {
        heroTl.fromTo(
          heroDescRef.current,
          { opacity: 0, y: 25, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power4.out', clearProps: 'transform,opacity' },
          0.12
        );
      }

      if (heroCtaRef.current) {
        heroTl.fromTo(
          heroCtaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
          0.18
        );
      }

      if (heroTrustSignalsRef.current) {
        const signals = Array.from(heroTrustSignalsRef.current.children) as HTMLElement[];
        heroTl.fromTo(
          signals,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power4.out', clearProps: 'transform,opacity' },
          0.24
        );
      }

      // 2. WHY CHOOSE (En-tête et 3 cartes comparatives)
      if (whyHeaderRef.current) {
        const headerElements = Array.from(whyHeaderRef.current.children) as HTMLElement[];
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power4.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: whyHeaderRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (whyCardsRef.current) {
        const whyCards = Array.from(whyCardsRef.current.children) as HTMLElement[];
        if (isDesktop && whyCards.length === 3) {
          const whyTl = gsap.timeline({
            scrollTrigger: {
              trigger: whyCardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });

          // Carte 1 (gauche) : Jaillit depuis la gauche
          whyTl.fromTo(
            whyCards[0],
            { opacity: 0, x: -60, y: 20, scale: 0.96 },
            { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.8, ease: 'power4.out', clearProps: 'transform,opacity' },
            0
          );

          // Carte 2 (centre) : Impulsion verticale
          whyTl.fromTo(
            whyCards[1],
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power4.out', clearProps: 'transform,opacity' },
            0.08
          );

          // Carte 3 (droite) : Jaillit depuis la droite
          whyTl.fromTo(
            whyCards[2],
            { opacity: 0, x: 60, y: 20, scale: 0.96 },
            { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.8, ease: 'power4.out', clearProps: 'transform,opacity' },
            0.16
          );
        } else {
          gsap.fromTo(
            whyCards,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power4.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: whyCardsRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // 3. TERRITORIES (En-tête et 4 départements lorrains)
      if (territoriesHeaderRef.current) {
        const terrElements = Array.from(territoriesHeaderRef.current.children) as HTMLElement[];
        gsap.fromTo(
          terrElements,
          { opacity: 0, y: 25, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power4.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: territoriesHeaderRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (territoriesGridRef.current) {
        const terrCards = Array.from(territoriesGridRef.current.children) as HTMLElement[];
        if (isDesktop && terrCards.length === 4) {
          const terrTl = gsap.timeline({
            scrollTrigger: {
              trigger: territoriesGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });

          // Carte 1 (Meuse 55 - gauche)
          terrTl.fromTo(
            terrCards[0],
            { opacity: 0, x: -50, y: 20 },
            { opacity: 1, x: 0, y: 0, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
            0
          );
          // Carte 2 (54)
          terrTl.fromTo(
            terrCards[1],
            { opacity: 0, y: 35, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
            0.08
          );
          // Carte 3 (57)
          terrTl.fromTo(
            terrCards[2],
            { opacity: 0, y: 35, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
            0.16
          );
          // Carte 4 (88 & Grand Est - droite)
          terrTl.fromTo(
            terrCards[3],
            { opacity: 0, x: 50, y: 20 },
            { opacity: 1, x: 0, y: 0, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
            0.24
          );
        } else {
          gsap.fromTo(
            terrCards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power4.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: territoriesGridRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // 4. CASE STUDIES (En-tête et 3 réalisations régionales)
      if (casesHeaderRef.current) {
        const caseHeaderItems = Array.from(casesHeaderRef.current.children) as HTMLElement[];
        gsap.fromTo(
          caseHeaderItems,
          { opacity: 0, y: 25, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power4.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: casesHeaderRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (casesGridRef.current) {
        const caseCards = Array.from(casesGridRef.current.children) as HTMLElement[];
        if (isDesktop && caseCards.length === 3) {
          const casesTl = gsap.timeline({
            scrollTrigger: {
              trigger: casesGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });

          // Carte 1 (LocaTool) : Angle léger depuis la gauche
          casesTl.fromTo(
            caseCards[0],
            { opacity: 0, x: -60, y: 20, rotateY: 6, scale: 0.95 },
            { opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1, duration: 0.85, ease: 'power4.out', clearProps: 'transform,opacity' },
            0
          );
          // Carte 2 (Atelier Gourmand) : Impulsion centrale
          casesTl.fromTo(
            caseCards[1],
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power4.out', clearProps: 'transform,opacity' },
            0.08
          );
          // Carte 3 (AboGame) : Angle léger depuis la droite
          casesTl.fromTo(
            caseCards[2],
            { opacity: 0, x: 60, y: 20, rotateY: -6, scale: 0.95 },
            { opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1, duration: 0.85, ease: 'power4.out', clearProps: 'transform,opacity' },
            0.16
          );
        } else {
          gsap.fromTo(
            caseCards,
            { opacity: 0, y: 35, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power4.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: casesGridRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // 5. TRANSPARENT PACKAGES (En-tête et 4 grilles tarifaires)
      if (packagesHeaderRef.current) {
        const pkgHeaderItems = Array.from(packagesHeaderRef.current.children) as HTMLElement[];
        gsap.fromTo(
          pkgHeaderItems,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power4.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: packagesHeaderRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (packagesGridRef.current) {
        const pkgCards = Array.from(packagesGridRef.current.children) as HTMLElement[];
        if (isDesktop && pkgCards.length === 4) {
          const pkgTl = gsap.timeline({
            scrollTrigger: {
              trigger: packagesGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });

          // Carte 1 (Pack Présence - gauche)
          pkgTl.fromTo(
            pkgCards[0],
            { opacity: 0, x: -70, y: 20 },
            { opacity: 1, x: 0, y: 0, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
            0
          );
          // Carte 2 (Pack Croissance - mise en avant PME)
          pkgTl.fromTo(
            pkgCards[1],
            { opacity: 0, y: 45, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
            0.08
          );
          // Carte 3 (Pack E-Commerce)
          pkgTl.fromTo(
            pkgCards[2],
            { opacity: 0, y: 45, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
            0.16
          );
          // Carte 4 (Pack SaaS - droite)
          pkgTl.fromTo(
            pkgCards[3],
            { opacity: 0, x: 70, y: 20 },
            { opacity: 1, x: 0, y: 0, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
            0.24
          );
        } else {
          gsap.fromTo(
            pkgCards,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power4.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: packagesGridRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // 6. FAQ (En-tête et cascade dynamique avec arrivée depuis l'extérieur de l'écran - Signature Glacier)
      if (faqHeaderRef.current) {
        const faqHeaderItems = Array.from(faqHeaderRef.current.children) as HTMLElement[];
        gsap.fromTo(
          faqHeaderItems,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: faqHeaderRef.current,
              start: 'top 85%',
              end: 'bottom top',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (faqContainerRef.current) {
        const cards = Array.from(faqContainerRef.current.children) as HTMLElement[];
        const faqTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: faqContainerRef.current,
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

      // 7. FINAL CONTACT BANNER (Arrivée soignée et décélération douce)
      if (bannerCardRef.current) {
        const bannerChildren = Array.from(bannerCardRef.current.children) as HTMLElement[];
        const bannerTl = gsap.timeline({
          scrollTrigger: {
            trigger: bannerCardRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });

        bannerTl.fromTo(
          bannerCardRef.current,
          { opacity: 0, scale: 0.96, y: 35 },
          { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: 'power4.out', clearProps: 'transform,opacity' },
          0
        );

        if (bannerChildren.length > 0) {
          bannerTl.fromTo(
            bannerChildren,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.65, stagger: 0.06, ease: 'power4.out', clearProps: 'transform,opacity' },
            0.08
          );
        }
      }
    }, pageContainerRef);

    debouncedScrollTriggerRefresh(150);

    return () => {
      ctx.revert();
    };
  }, []);

  // SEO Metadata
  useDocumentMetadata(
    {
      fr: "Développeur Web en Lorraine & Grand Est (Nancy, Metz) | DevSupAi",
      en: "Custom Web Developer in Lorraine & Grand Est (Nancy, Metz) | DevSupAi",
    },
    {
      fr: "Développeur web freelance en Lorraine et Grand Est (Nancy, Metz, Meuse). Création sur-mesure de sites vitrines, e-commerce et applications sans abonnement captif.",
      en: "Bespoke freelance web developer serving Lorraine and Grand Est (Nancy, Metz, Meuse). Handcrafted showcase websites, e-commerce, and web applications without recurring fees.",
    },
    'https://www.devsupai.fr/hero-bg-mockup.webp'
  );

  // Schema.org Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": isEn 
      ? "Custom Web Development in Lorraine & Grand Est"
      : "Développement Web Sur-Mesure en Lorraine & Grand Est",
    "description": isEn
      ? "Bespoke web development for SMEs, artisans, and contractors across Lorraine (Nancy, Metz, Meuse, Vosges) and Grand Est. Zero CMS bloat, 100% proprietary code."
      : "Conception sur-mesure de sites vitrines, boutiques e-commerce et applications web métiers pour PME, artisans et indépendants en Lorraine (Nancy, Metz, Meuse, Vosges) et Grand Est.",
    "provider": {
      "@type": "ProfessionalService",
      "name": "DevSupAi • Alexandre Pabst",
      "url": "https://www.devsupai.fr",
      "telephone": "+33783666098",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13 Allée des Roses",
        "addressLocality": "Saint-Mihiel",
        "postalCode": "55300",
        "addressRegion": "Grand Est",
        "addressCountry": "FR"
      }
    },
    "serviceType": isEn ? "Web Development & Local SEO" : "Développement Web & Référencement Local",
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Lorraine" },
      { "@type": "AdministrativeArea", "name": "Grand Est" },
      { "@type": "AdministrativeArea", "name": "Meuse" },
      { "@type": "AdministrativeArea", "name": "Meurthe-et-Moselle" },
      { "@type": "AdministrativeArea", "name": "Moselle" },
      { "@type": "AdministrativeArea", "name": "Vosges" },
      { "@type": "City", "name": "Nancy", "postalCode": "54000" },
      { "@type": "City", "name": "Metz", "postalCode": "57000" },
      { "@type": "City", "name": "Bar-le-Duc", "postalCode": "55000" },
      { "@type": "City", "name": "Verdun", "postalCode": "55100" },
      { "@type": "City", "name": "Épinal", "postalCode": "88000" },
      { "@type": "Country", "name": "France" }
    ],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": "950",
      "description": isEn
        ? "Starter package for local businesses starting from €950."
        : "Pack Présence One-Page pour entreprise locale dès 950 €."
    }
  };

  const faqItems = isEn
    ? [
        {
          q: "Why choose an independent web developer in Lorraine rather than a traditional web agency?",
          a: "Unlike traditional web agencies in Nancy or Metz that often rely on heavy CMS platforms with recurring monthly maintenance contracts, DevSupAi offers direct collaboration with a single dedicated engineer (Alexandre Pabst). You get 100% proprietary code (React 19 / TypeScript), lightning-fast loading speeds under one second, zero mandatory subscription fees, and complete ownership of your digital assets."
        },
        {
          q: "Do you travel on-site to clients across Lorraine and Grand Est?",
          a: "Yes. Based in Saint-Mihiel (Meuse), I regularly travel on-site for scoping meetings, workshops, and project presentations in Nancy, Metz, Toul, Bar-le-Duc, Verdun, and throughout Lorraine. Video conference meetings are also organized for regular follow-ups and clients situated further across Grand Est and France."
        },
        {
          q: "Are regional grants available in Grand Est to fund website creation?",
          a: "Yes. The Grand Est Region and local chambers of commerce periodically offer digital transformation vouchers (such as the Chèque Transformation Numérique) for SMEs, craftsmen, and retailers. DevSupAi delivers compliant technical specifications and transparent itemized invoices facilitating your regional subsidy applications."
        },
        {
          q: "How will my website rank on Google in Lorraine and my targeted city?",
          a: "Every website includes tailored local SEO: semantic HTML5 hierarchy, Schema.org structured data, Core Web Vitals optimization, and Google Business Profile guidance. This dual setup ensures optimal search prominence on local keywords across Nancy, Metz, Meuse, or your specific regional market."
        },
        {
          q: "What is the typical turnaround time for delivering a website in Lorraine?",
          a: "Turnaround times range from 1 to 2 weeks for a Starter showcase page, 2 to 4 weeks for a multi-page Growth business website (3-5 pages), and 4 to 8 weeks for a bespoke SaaS web application. Milestones and delivery dates are clearly scheduled from day one."
        }
      ]
    : [
        {
          q: "Pourquoi choisir un développeur indépendant en Lorraine plutôt qu'une agence web traditionnelle ?",
          a: "Contrairement aux agences web traditionnelles de Nancy ou Metz qui s'appuient souvent sur des CMS lourds assortis d'abonnements mensuels captifs, DevSupAi vous garantit un interlocuteur direct unique (Alexandre Pabst). Vous bénéficiez d'un code 100% propriétaire (React 19 / TypeScript), d'une vitesse de chargement instantanée inférieure à la seconde, de 0 € d'abonnement logiciel imposé et de la pleine propriété de votre site dès sa livraison."
        },
        {
          q: "Vous déplacez-vous dans les entreprises en Lorraine et dans le Grand Est ?",
          a: "Oui. Basé à Saint-Mihiel en Meuse, je me déplace régulièrement en présentiel pour les réunions de cadrage, ateliers et présentations à Nancy, Metz, Bar-le-Duc, Verdun, Toul, Épinal et dans toute la Lorraine. Les points d'étape et le suivi régulier peuvent également s'effectuer par visioconférence pour un confort optimal."
        },
        {
          q: "Existe-t-il des aides de la Région Grand Est pour financer la création d'un site internet ?",
          a: "Oui. La Région Grand Est ainsi que les Chambres de Métiers et de Commerce proposent régulièrement des dispositifs d'aide à la digitalisation (comme le Chèque Transformation Numérique) destinés aux TPE, PME, artisans et commerçants. DevSupAi vous fournit un devis détaillé et un cahier des charges technique conforme pour appuyer votre dossier de subvention."
        },
        {
          q: "Mon site sera-t-il bien positionné sur Google en Lorraine et dans ma ville ?",
          a: "Chaque projet bénéficie d'une optimisation SEO local approfondie : structure sémantique HTML5 stricte, balisage Schema.org pour les moteurs de recherche, vitesse de chargement optimale (Core Web Vitals) et accompagnement sur votre fiche Google Business Profile. Cela assure une visibilité maximale sur vos requêtes cibles à Nancy, Metz, en Meuse ou dans votre bassin d'activité."
        },
        {
          q: "Quel est le délai de réalisation d'un projet web en Lorraine ?",
          a: "Les délais constatés sont de 1 à 2 semaines pour un Pack Présence (One-Page), de 2 à 4 semaines pour un Pack Croissance PME (vitrine 3 à 5 pages), et de 4 à 8 semaines pour une application SaaS métier. Un calendrier d'étapes clair est défini dès la signature du devis."
        }
      ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  useJsonLd(serviceSchema, `lorraine-service-schema-${isEn ? 'en' : 'fr'}`);
  useJsonLd(faqSchema, `lorraine-faq-schema-${isEn ? 'en' : 'fr'}`);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
    debouncedScrollTriggerRefresh(150);
  };

  return (
    <div ref={pageContainerRef} className="w-full bg-[#FFFFFF] text-[#4A4A4A] min-h-screen">
      
      {/* 1. HERO BANNER REGIONAL (Fond Parallaxe Fixe Signature) */}
      <section className="services-parallax-section py-20 md:py-28 relative overflow-hidden border-b border-slate-800 text-left">
        <div 
          className="services-parallax-bg" 
          style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
        />
        <div className="services-parallax-tint" />

        <div className="container max-w-5xl mx-auto px-6 relative z-10 text-left">
          
          {/* Fil d'Ariane */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 mb-6 text-xs font-bold font-['Montserrat']">
            <Link 
              to={isEn ? "/en" : "/"}
              className="text-sky-400 hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>{isEn ? "Home" : "Accueil"}</span>
            </Link>
            <span className="text-slate-400" aria-hidden="true">/</span>
            <span className="text-white">
              {isEn ? "Web Developer Lorraine & Grand Est" : "Développeur Web Lorraine & Grand Est"}
            </span>
          </nav>

          {/* Surtitre Badge */}
          <div ref={heroEyebrowRef} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/40 bg-sky-500/20 text-xs font-bold font-['Montserrat'] text-sky-300 mb-4 shadow-sm">
            <Sparkles size={13} className="text-sky-300" aria-hidden="true" />
            <span>{isEn ? "REGIONAL EXPERTISE • LORRAINE & GRAND EST" : "EXPERTISE RÉGIONALE • LORRAINE & GRAND EST"}</span>
          </div>

          {/* Single H1 Title */}
          <h1 ref={heroTitleRef} className="text-3xl sm:text-4xl md:text-5xl font-black font-['Montserrat'] text-white mb-6 leading-tight tracking-tight" style={{ color: '#FFFFFF' }}>
            {isEn ? (
              <>
                Custom Web Developer in Lorraine &amp; Grand Est <br />
                <span className="text-sky-400 font-normal italic">High-performance code without CMS bloat.</span>
              </>
            ) : (
              <>
                Développeur Web Indépendant en Lorraine &amp; Grand Est <br />
                <span className="text-sky-400 font-normal italic">Sites sur-mesure ultra-rapides, sans abonnement captif.</span>
              </>
            )}
          </h1>

          <p ref={heroDescRef} className="text-base sm:text-lg text-slate-200 font-['Plus_Jakarta_Sans'] leading-relaxed max-w-3xl mb-8" style={{ color: '#E2E8F0' }}>
            {isEn
              ? "Conception of bespoke showcase websites, e-commerce stores, and tailored SaaS applications for SMEs, craftsmen, and professionals across Nancy, Metz, Bar-le-Duc, Verdun, Épinal, and throughout Grand Est. 100% proprietary code, sub-second loading speeds, and direct communication without agency overhead."
              : "Création de sites vitrines, boutiques e-commerce et applications web métiers pour les PME, artisans, commerçants et professions libérales à Nancy, Metz, Bar-le-Duc, Verdun, Épinal et dans toute la région Grand Est. 100% de code propriétaire, temps de chargement instantanés et accompagnement direct sans intermédiaire."}
          </p>

          <div ref={heroCtaRef} className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              to={isEn ? "/en/#contact" : "/#contact"}
              className="btn-glacier-solid rounded-none bg-[#0284C7] hover:bg-sky-400 font-bold py-3.5 px-6 inline-flex items-center gap-2 transition-all active:scale-95 shadow-md"
              style={{ color: '#FFFFFF', backgroundColor: '#0284C7' }}
            >
              <span style={{ color: '#FFFFFF' }}>{isEn ? "REQUEST A REGIONAL QUOTE" : "DEMANDER UN DEVIS GRATUIT"}</span>
              <ArrowRight size={16} aria-hidden="true" style={{ color: '#FFFFFF' }} />
            </Link>

            <Link
              to={isEn ? "/en/services" : "/nos-services"}
              className="btn-glacier-outline rounded-none border border-slate-600 hover:border-white text-white font-bold py-3.5 px-6 inline-flex items-center gap-2 transition-all active:scale-95 bg-slate-900/60 backdrop-blur-sm"
              style={{ color: '#FFFFFF' }}
            >
              <span>{isEn ? "VIEW ALL SERVICES" : "CATALOGUE DES SERVICES"}</span>
            </Link>
          </div>

          {/* Key Trust Signals */}
          <div ref={heroTrustSignalsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-700/80 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-sky-400 shrink-0" aria-hidden="true" />
              <span>{isEn ? "0% mandatory monthly software subscriptions" : "0% abonnement logiciel mensuel captif"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-sky-400 shrink-0" aria-hidden="true" />
              <span>{isEn ? "Direct engineer contact (no sales middleman)" : "Interlocuteur direct unique (Alexandre Pabst)"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-sky-400 shrink-0" aria-hidden="true" />
              <span>{isEn ? "On-site meetings across Lorraine & Grand Est" : "Déplacements en présentiel dans toute la Lorraine"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE DEVSUPAI VS TRADITIONAL REGIONAL AGENCIES */}
      <section className="py-16 md:py-20 bg-white border-b border-[#E5E5E5]">
        <div className="container max-w-5xl mx-auto px-6">
          <div ref={whyHeaderRef} className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] mb-4">
              {isEn
                ? "Why Choose an Artisan Developer Over an Agency in Lorraine?"
                : "Pourquoi choisir un artisan du web plutôt qu'une agence en Lorraine ?"}
            </h2>
            <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
              {isEn
                ? "Businesses in Nancy, Metz, and across Lorraine often face a difficult choice: expensive digital agencies with overhead costs and recurring CMS plugin maintenance, or generic template builders. DevSupAi delivers a superior third path: handcrafted engineering with complete business independence."
                : "Pour concevoir un site internet à Nancy, Metz ou dans le Grand Est, les dirigeants hésitent souvent entre des agences web aux coûts de structure élevés (imposant des abonnements de maintenance récurrents sur CMS lourd) et des solutions pré-conçues rigides. DevSupAi propose une alternative exigeante : l'artisanat du code sur-mesure au service de votre rentabilité."}
            </p>
          </div>

          <div ref={whyCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7] mb-4">
                  <ShieldCheck size={20} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] font-['Montserrat'] mb-2">
                  {isEn ? "100% Proprietary Ownership" : "100% Propriétaire sans Rente"}
                </h3>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
                  {isEn
                    ? "You own the entire source code, domain name, assets, and databases. No platform lock-in, no mandatory monthly plugin renewals, and zero licensing fees."
                    : "Vous êtes l'unique propriétaire du code source, de vos contenus et de votre hébergement. Aucun engagement forcé, zéro abonnement de plugin tiers (contrairement aux solutions CMS qui coûtent plusieurs centaines d'euros chaque année)."}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7] mb-4">
                  <Zap size={20} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] font-['Montserrat'] mb-2">
                  {isEn ? "Core Web Vitals Performance" : "Vitesse Sub-Seconde & Core Web Vitals"}
                </h3>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
                  {isEn
                    ? "Architected with React 19, TypeScript, and Static Site Generation. Pages display instantaneously, ensuring superior Google search ranking and lower mobile bounce rates."
                    : "Construit sur une architecture ultra-légère React 19 et SSG. Vos pages s'affichent instantanément sans temps de latence, garantissant un score de 100/100 sur Google Lighthouse et un taux de conversion maximal."}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7] mb-4">
                  <MapPin size={20} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] font-['Montserrat'] mb-2">
                  {isEn ? "Direct Local Partnership" : "Proximité & Écoute Directe"}
                </h3>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
                  {isEn
                    ? "One dedicated technical partner based in Lorraine from initial consultation to deployment and training. No telephone switchboards or changing project managers."
                    : "Un interlocuteur unique (Alexandre Pabst) basé en Lorraine, qui comprend les réalités de votre marché local. Échanges fluides, réactivité garantie sous 24h ouvrées et déplacements dans vos locaux."}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. COVERED TERRITORIES IN LORRAINE & GRAND EST */}
      <section className="py-16 md:py-20 bg-[#F8F8F8] border-b border-[#E5E5E5]">
        <div className="container max-w-5xl mx-auto px-6">
          <div ref={territoriesHeaderRef} className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] mb-4">
              {isEn ? "Geographic Scope across Lorraine & Grand Est" : "Périmètre d'Intervention en Lorraine & Grand Est"}
            </h2>
            <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
              {isEn
                ? "Based in Saint-Mihiel (Meuse), DevSupAi provides hands-on digital engineering services across all four departments of Lorraine, major metropolitan areas, and the broader Grand Est region."
                : "Implanté au cœur de la Meuse à Saint-Mihiel, DevSupAi intervient en présentiel et à distance pour accompagner les entreprises sur l'ensemble des 4 départements lorrains et du Grand Est."}
            </p>
          </div>

          <div ref={territoriesGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-5 rounded-lg border border-[#E5E5E5] shadow-sm">
              <h3 className="font-bold text-base text-[#1A1A1A] font-['Montserrat'] mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-[#0284C7]" aria-hidden="true" />
                <span>Meuse (55)</span>
              </h3>
              <p className="text-xs text-[#525252] leading-relaxed">
                {isEn
                  ? "Atelier headquarters in Saint-Mihiel. Regular visits to Commercy, Bar-le-Duc, Verdun, and Côtes de Meuse."
                  : "Siège de l'Atelier à Saint-Mihiel. Interventions directes à Commercy, Bar-le-Duc, Verdun et Côtes de Meuse."}
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-[#E5E5E5] shadow-sm">
              <h3 className="font-bold text-base text-[#1A1A1A] font-['Montserrat'] mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-[#0284C7]" aria-hidden="true" />
                <span>Meurthe-et-Moselle (54)</span>
              </h3>
              <p className="text-xs text-[#525252] leading-relaxed">
                {isEn
                  ? "Bassin nancéien (Nancy, Vandœuvre, Laxou), Toul, Pont-à-Mousson, et Lunéville."
                  : "Bassin nancéien (Nancy, Vandœuvre, Laxou), Toul, Pont-à-Mousson, Val de Lorraine et Lunéville."}
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-[#E5E5E5] shadow-sm">
              <h3 className="font-bold text-base text-[#1A1A1A] font-['Montserrat'] mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-[#0284C7]" aria-hidden="true" />
                <span>Moselle (57)</span>
              </h3>
              <p className="text-xs text-[#525252] leading-relaxed">
                {isEn
                  ? "Metz Métropole, Thionville, Saint-Avold, Sarreguemines, et sillon mosellan."
                  : "Metz Métropole, Thionville, Saint-Avold, Sarreguemines et axe autoroutier A31."}
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-[#E5E5E5] shadow-sm">
              <h3 className="font-bold text-base text-[#1A1A1A] font-['Montserrat'] mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-[#0284C7]" aria-hidden="true" />
                <span>Vosges (88) &amp; Grand Est</span>
              </h3>
              <p className="text-xs text-[#525252] leading-relaxed">
                {isEn
                  ? "Épinal, Saint-Dié-des-Vosges, Gérardmer, ainsi que Reims, Troyes et Strasbourg."
                  : "Épinal, Saint-Dié-des-Vosges, Gérardmer, ainsi que Reims, Troyes et Strasbourg à distance."}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* PARALLAX BREAK SIGNATURE (Engagements & Manifeste DevSupAi) */}
      <GlacierParallaxBreak />

      {/* 4. REAL CASE STUDIES (Internal Linking Bidirectionnel) */}
      <section className="py-16 md:py-20 bg-white border-b border-[#E5E5E5]">
        <div className="container max-w-5xl mx-auto px-6">
          <div ref={casesHeaderRef} className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] mb-4">
              {isEn ? "Concrete Regional Case Studies" : "Études de Cas & Réalisations Régionales"}
            </h2>
            <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
              {isEn
                ? "Explore real-world web applications and custom websites crafted for businesses and associations in Lorraine."
                : "Découvrez des exemples concrets d'applications web et de sites vitrines conçus sur-mesure pour des structures locales et régionales."}
            </p>
          </div>

          <div ref={casesGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Case 1 : LocaTool */}
            <div className="border border-[#E5E5E5] rounded-lg overflow-hidden bg-[#FAFAFA] flex flex-col justify-between">
              <div className="p-6">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#0284C7] font-['Montserrat'] block mb-2">
                  {isEn ? "SaaS Application • Equipment Fleet" : "Application SaaS • Parc Matériel"}
                </span>
                <h3 className="text-lg font-bold text-[#1A1A1A] font-['Montserrat'] mb-2">LocaTool</h3>
                <p className="text-xs text-[#525252] leading-relaxed mb-4">
                  {isEn
                    ? "Originally developed for the association Le Caf'Tiers in Saint-Mihiel, then expanded into a scalable SaaS platform for construction and equipment rental contractors across Lorraine."
                    : "Développé initialement pour l'association Le Caf'Tiers à Saint-Mihiel (Meuse), puis déployé en SaaS multi-tenant pour les entreprises de location et artisans du BTP en Lorraine."}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-[#EAEAEA] mt-auto">
                <Link
                  to={isEn ? "/en/projects/locatool" : "/projets/locatool"}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] hover:text-[#1A1A1A] transition-colors pt-4"
                >
                  <span>{isEn ? "View LocaTool Case Study" : "Lire l'étude de cas LocaTool"}</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Case 2 : L'Atelier Gourmand */}
            <div className="border border-[#E5E5E5] rounded-lg overflow-hidden bg-[#FAFAFA] flex flex-col justify-between">
              <div className="p-6">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#0284C7] font-['Montserrat'] block mb-2">
                  {isEn ? "Showcase & Direct Booking" : "Site Vitrine & Réservation"}
                </span>
                <h3 className="text-lg font-bold text-[#1A1A1A] font-['Montserrat'] mb-2">L'Atelier Gourmand</h3>
                <p className="text-xs text-[#525252] leading-relaxed mb-4">
                  {isEn
                    ? "Bespoke bistro showcase website featuring a commission-free 4-step table reservation engine, interactive digital menu without heavy PDFs, and multi-language support."
                    : "Création d'un site vitrine bistronomique avec moteur de réservation directe 4 étapes sans commission ni widget tiers, carte réactive sans PDF lourd et support multilingue."}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-[#EAEAEA] mt-auto">
                <Link
                  to={isEn ? "/en/projects/atelier-gourmand" : "/projets/atelier-gourmand"}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] hover:text-[#1A1A1A] transition-colors pt-4"
                >
                  <span>{isEn ? "View Restaurant Case Study" : "Lire l'étude de cas Restaurant"}</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Case 3 : AboGame */}
            <div className="border border-[#E5E5E5] rounded-lg overflow-hidden bg-[#FAFAFA] flex flex-col justify-between">
              <div className="p-6">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#0284C7] font-['Montserrat'] block mb-2">
                  {isEn ? "Interactive Web App • 60 FPS" : "Web App Temps Réel • 60 FPS"}
                </span>
                <h3 className="text-lg font-bold text-[#1A1A1A] font-['Montserrat'] mb-2">AboGame</h3>
                <p className="text-xs text-[#525252] leading-relaxed mb-4">
                  {isEn
                    ? "Mobile-first live interactive engagement platform with real-time giveaway animations, sub-second latency, and zero dependency on restrictive third-party plugins."
                    : "Plateforme interactive mobile-first pour animations d'événements et tirages en direct à 60 FPS, conçue sur une architecture fluide sans aucun plugin tiers."}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-[#EAEAEA] mt-auto">
                <Link
                  to={isEn ? "/en/projects/abogame" : "/projets/abogame"}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] hover:text-[#1A1A1A] transition-colors pt-4"
                >
                  <span>{isEn ? "View AboGame Case Study" : "Lire l'étude de cas AboGame"}</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TRANSPARENT PACKAGES */}
      <section className="py-16 md:py-20 bg-[#F8F8F8] border-b border-[#E5E5E5]">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <div ref={packagesHeaderRef} className="max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] mb-4">
              {isEn ? "Transparent Regional Packages" : "Forfaits Clés en Main & Sans Surprise"}
            </h2>
            <p className="text-sm sm:text-base text-[#525252]">
              {isEn
                ? "Exact quotes tailored to your business goals. Zero hidden recurring fees."
                : "Des tarifs indicatifs transparents et chiffrés sur-mesure. Aucun abonnement logiciel caché."}
            </p>
          </div>

          <div ref={packagesGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* Pack 1 : Présence */}
            <div className="bg-white p-6 rounded-lg border border-[#E5E5E5] flex flex-col justify-between shadow-sm transition-all duration-300 ease-out transform-gpu hover:-translate-y-2 hover:scale-[1.025] hover:shadow-xl hover:border-sky-300 group">
              <div>
                <span className="text-xs font-bold uppercase text-[#0284C7] tracking-wider font-['Montserrat']">
                  {isEn ? "Starter Pack (One-Page)" : "Pack Présence (One-Page)"}
                </span>
                <div className="text-2xl font-black text-[#1A1A1A] my-3 font-['Montserrat']">
                  {isEn ? "From €950" : "Dès 950 €"}
                </div>
                <p className="text-xs text-[#525252] leading-relaxed mb-4">
                  {isEn
                    ? "Ideal for independent professionals and local businesses needing a fast, conversion-oriented single page."
                    : "Idéal pour artisans et indépendants souhaitant une présence locale efficace, crédible et rapidement indexée."}
                </p>
                <ul className="space-y-2 text-xs text-[#525252] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0284C7] shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <span>{isEn ? "Custom single-page architecture" : "Design épuré sur-mesure"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0284C7] shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <span>{isEn ? "Local SEO setup & schema markup" : "Référencement local & données structurées"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0284C7] shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <span>{isEn ? "Secure contact form & anti-spam" : "Formulaire sécurisé anti-spam"}</span>
                  </li>
                </ul>
              </div>
              <Link
                to={isEn ? "/en/#contact?pack=presence" : "/#contact?pack=presence"}
                className="btn-glacier-solid w-full text-center py-2.5 rounded-none text-xs font-bold"
                style={{ color: '#FFFFFF', backgroundColor: '#0284C7' }}
              >
                {isEn ? "Select Starter Pack" : "Choisir le Pack Présence"}
              </Link>
            </div>

            {/* Pack 2 : Croissance */}
            <div className="bg-white p-6 rounded-lg border-2 border-[#0284C7] flex flex-col justify-between shadow-md relative transition-all duration-300 ease-out transform-gpu hover:-translate-y-2 hover:scale-[1.025] hover:shadow-2xl hover:border-sky-600 group">
              <span className="absolute -top-3 right-4 bg-[#0284C7] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full font-['Montserrat'] uppercase">
                {isEn ? "Recommended for SMEs" : "Recommandé PME"}
              </span>
              <div>
                <span className="text-xs font-bold uppercase text-[#0284C7] tracking-wider font-['Montserrat']">
                  {isEn ? "Growth Pack (3-5 Pages)" : "Pack Croissance (3-5 Pages)"}
                </span>
                <div className="text-2xl font-black text-[#1A1A1A] my-3 font-['Montserrat']">
                  {isEn ? "From €1,850" : "Dès 1 850 €"}
                </div>
                <p className="text-xs text-[#525252] leading-relaxed mb-4">
                  {isEn
                    ? "Complete multi-page showcase website with project photo galleries, customer reviews, and advanced SEO."
                    : "Architecture complète pour PME et artisans : galerie chantiers avant/après, avis vérifiés et SEO territorial."}
                </p>
                <ul className="space-y-2 text-xs text-[#525252] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0284C7] shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <span>{isEn ? "3 to 5 custom-crafted pages" : "3 à 5 pages conçues sur-mesure"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0284C7] shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <span>{isEn ? "Dynamic project / photo gallery" : "Galerie dynamique de réalisations"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0284C7] shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <span>{isEn ? "Multi-city regional SEO targeting" : "Ciblage SEO multi-villes en Lorraine"}</span>
                  </li>
                </ul>
              </div>
              <Link
                to={isEn ? "/en/#contact?pack=croissance" : "/#contact?pack=croissance"}
                className="btn-glacier-solid w-full text-center py-2.5 rounded-none text-xs font-bold"
                style={{ color: '#FFFFFF', backgroundColor: '#0284C7' }}
              >
                {isEn ? "Select Growth Pack" : "Choisir le Pack Croissance"}
              </Link>
            </div>

            {/* Pack 3 : E-Commerce */}
            <div className="bg-white p-6 rounded-lg border border-[#E5E5E5] flex flex-col justify-between shadow-sm transition-all duration-300 ease-out transform-gpu hover:-translate-y-2 hover:scale-[1.025] hover:shadow-xl hover:border-sky-300 group">
              <div>
                <span className="text-xs font-bold uppercase text-[#0284C7] tracking-wider font-['Montserrat']">
                  {isEn ? "Bespoke E-Commerce" : "Pack Boutique E-Commerce"}
                </span>
                <div className="text-2xl font-black text-[#1A1A1A] my-3 font-['Montserrat']">
                  {isEn ? "From €2,600" : "Dès 2 600 €"}
                </div>
                <p className="text-xs text-[#525252] leading-relaxed mb-4">
                  {isEn
                    ? "Custom online store or Click & Collect with secure Stripe payments and zero sales commission."
                    : "Boutique en ligne ou Click & Collect sur-mesure avec paiement sécurisé Stripe et 0% de commission sur vos ventes."}
                </p>
                <ul className="space-y-2 text-xs text-[#525252] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0284C7] shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <span>{isEn ? "0% commission on your sales" : "0% de commission sur votre CA"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0284C7] shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <span>{isEn ? "Stripe / Apple Pay checkout" : "Paiement CB sécurisé Stripe"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0284C7] shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <span>{isEn ? "Autonomous stock & order manager" : "Gestion autonome des stocks & commandes"}</span>
                  </li>
                </ul>
              </div>
              <Link
                to={isEn ? `/en/#contact?service=${encodeURIComponent("Boutique E-Commerce")}` : `/#contact?service=${encodeURIComponent("Boutique E-Commerce")}`}
                className="btn-glacier-solid w-full text-center py-2.5 rounded-none text-xs font-bold"
                style={{ color: '#FFFFFF', backgroundColor: '#0284C7' }}
              >
                {isEn ? "Select E-Commerce Pack" : "Choisir le Pack E-Commerce"}
              </Link>
            </div>

            {/* Pack 4 : SaaS & Outil Métier */}
            <div className="bg-white p-6 rounded-lg border border-[#E5E5E5] flex flex-col justify-between shadow-sm transition-all duration-300 ease-out transform-gpu hover:-translate-y-2 hover:scale-[1.025] hover:shadow-xl hover:border-sky-300 group">
              <div>
                <span className="text-xs font-bold uppercase text-[#0284C7] tracking-wider font-['Montserrat']">
                  {isEn ? "SaaS & Custom Web App" : "Pack SaaS & Outil Métier"}
                </span>
                <div className="text-2xl font-black text-[#1A1A1A] my-3 font-['Montserrat']">
                  {isEn ? "From €3,200" : "Dès 3 200 €"}
                </div>
                <p className="text-xs text-[#525252] leading-relaxed mb-4">
                  {isEn
                    ? "Custom business management software, client portals, equipment fleet tracking, and automated workflows."
                    : "Logiciel de gestion interne, portail adhérents, suivi de matériel ou tunnel de réservation sur-mesure."}
                </p>
                <ul className="space-y-2 text-xs text-[#525252] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0284C7] shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <span>{isEn ? "Custom SQL databases & secure auth" : "Bases de données & authentification"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0284C7] shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <span>{isEn ? "PDF contract & invoice generation" : "Génération de contrats & factures PDF"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0284C7] shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <span>{isEn ? "Daily rate basis (€400/day)" : "Base TJM 400 €/jour"}</span>
                  </li>
                </ul>
              </div>
              <Link
                to={isEn ? "/en/#contact?pack=saas" : "/#contact?pack=saas"}
                className="btn-glacier-solid w-full text-center py-2.5 rounded-none text-xs font-bold"
                style={{ color: '#FFFFFF', backgroundColor: '#0284C7' }}
              >
                {isEn ? "Discuss Your Web App" : "Parler de votre Projet Métier"}
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FAQ CIBLÉE LORRAINE & GRAND EST (En-tête Parallaxe Signature) */}
      <section 
        className="glacier-faq-header-parallax py-16 md:py-20 min-h-[280px] md:min-h-[320px] flex items-center justify-center relative overflow-hidden border-b border-slate-800 text-center"
        aria-labelledby="faq-regional-title"
      >
        <div className="faq-parallax-bg" />
        <div className="faq-parallax-tint" />
        <ParallaxLogoVoyager variant="curve-left" />

        <div 
          ref={faqHeaderRef}
          className="container mx-auto px-6 max-w-3xl relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/40 bg-sky-500/20 text-xs font-bold font-['Montserrat'] text-sky-300 mb-4">
            <Sparkles size={14} className="text-sky-300" aria-hidden="true" />
            <span>{isEn ? "REGIONAL ADVICE & FAQ" : "RÉPONSES & EXPERTISE RÉGIONALE"}</span>
          </div>
          
          <h2 id="faq-regional-title" className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-white mb-3 tracking-tight" style={{ color: '#FFFFFF' }}>
            {isEn ? "Frequently Asked Questions • Lorraine & Grand Est" : "Questions Fréquentes • Lorraine & Grand Est"}
          </h2>
          <p className="text-sm sm:text-base text-slate-200 font-['Plus_Jakarta_Sans']" style={{ color: '#E2E8F0' }}>
            {isEn
              ? "Everything you need to know about bespoke web development, regional subsidies, and collaboration in Lorraine."
              : "Tout ce qu'il faut savoir sur la méthode sur-mesure, les aides régionales Grand Est et notre accompagnement en Lorraine."}
          </p>
        </div>
      </section>

      {/* Questions FAQ sur Fond Blanc avec Arrivée Dynamique DevSupAi */}
      <section 
        className="py-16 md:py-24 bg-white text-left border-b border-[#E5E5E5] overflow-hidden" 
        aria-label={isEn ? "Frequently Asked Questions" : "Questions fréquentes"}
      >
        <div className="container max-w-4xl mx-auto px-6">
          <div ref={faqContainerRef} className="space-y-4">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border transition-all duration-300 ease-out text-left ${
                    isOpen
                      ? 'border-[#0284C7] bg-white shadow-md'
                      : 'border-[#E5E5E5] bg-[#F8F8F8] hover:border-[#CCCCCC]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none group"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-question-${idx}`}
                  >
                    <h3 className="faq-question-title text-sm sm:text-base font-bold font-['Montserrat'] text-[#1A1A1A] leading-snug text-left transition-colors duration-200 group-hover:text-[#0284C7] flex-1">
                      {item.q}
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
                      <div className="mt-4 pt-4 border-t border-[#E5E5E5] text-xs sm:text-sm text-[#525252] leading-relaxed font-['Plus_Jakarta_Sans'] text-left">
                        {item.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CONTACT FINAL CALL TO ACTION (Fond Parallaxe Signature & Card Glassy) */}
      <section id="cta-lorraine" className="services-parallax-section py-16 md:py-20 min-h-[280px] md:min-h-[320px] flex items-center justify-center relative overflow-hidden border-t border-slate-800 text-white">
        <div 
          className="services-parallax-bg" 
          style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
        />
        <div className="services-parallax-tint" />

        <div className="container max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div 
            ref={bannerCardRef}
            className="p-8 sm:p-14 rounded-none bg-slate-900/65 backdrop-blur-xl border border-white/25 text-white text-center space-y-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-all duration-300 hover:border-white/40 group max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/40 bg-sky-500/20 text-xs font-bold font-['Montserrat'] text-sky-300">
              <Sparkles size={13} aria-hidden="true" />
              <span>{isEn ? "READY TO START IN LORRAINE?" : "UN PROJET EN LORRAINE OU GRAND EST ?"}</span>
            </div>

            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-white tracking-tight"
              style={{ color: '#FFFFFF' }}
            >
              {isEn ? "Let's Engineer Your Digital Project" : "Concevons ensemble votre site sur-mesure"}
            </h2>

            <p 
              className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal"
              style={{ color: '#E2E8F0' }}
            >
              {isEn
                ? "Free preliminary consultation without obligation. Response guaranteed within 24 business hours."
                : "Échange préalable gratuit et sans engagement. Réponse détaillée garantie sous 24h ouvrées."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to={isEn ? "/en/#contact" : "/#contact"}
                className="btn-glacier-solid rounded-none bg-[#0284C7] hover:bg-sky-400 font-bold py-3.5 px-8 inline-flex items-center gap-2 shadow-lg transition-all active:scale-95"
                style={{ color: '#FFFFFF', backgroundColor: '#0284C7' }}
              >
                <span style={{ color: '#FFFFFF' }}>{isEn ? "Discuss My Project" : "Échanger sur mon projet"}</span>
                <ArrowRight size={16} aria-hidden="true" style={{ color: '#FFFFFF' }} />
              </Link>

              <a
                href="tel:0783666098"
                className="btn-glacier-outline rounded-none border border-slate-500 hover:border-white text-white font-bold py-3.5 px-6 inline-flex items-center gap-2 bg-slate-900/60 backdrop-blur-sm transition-all active:scale-95"
                style={{ color: '#FFFFFF' }}
              >
                <PhoneCall size={16} aria-hidden="true" />
                <span>07 83 66 60 98</span>
              </a>
            </div>

            <p className="text-xs text-slate-400 pt-4">
              DevSupAi • Alexandre Pabst | contact@devsupai.fr | 13 Allée des Roses, 55300 Saint-Mihiel (Lorraine / Grand Est)
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

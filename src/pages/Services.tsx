import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  SlidersHorizontal, 
  PhoneCall, 
  Gauge, 
  FileCode, 
  UserCheck,
  RotateCcw,
  RotateCw
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import SectionReveal from '../components/SectionReveal';
import { useLanguage } from '../i18n/LanguageContext';
import { servicesData } from '../i18n/servicesTranslations';
import { servicesCatalog, strategicPillarsData, servicesFaqData } from '../i18n/servicesCatalog';

export default function Services() {
  const { language } = useLanguage();
  const t = servicesData[language] || servicesData.fr;
  const pillars = strategicPillarsData[language] || strategicPillarsData.fr;
  const faqs = servicesFaqData[language] || servicesFaqData.fr;

  useDocumentMetadata(
    {
      fr: 'Nos Prestations & Solutions Web Sur-Mesure | DevSupAi',
      en: 'Our Custom Web Services & Digital Solutions | DevSupAi',
    },
    {
      fr: 'Découvrez nos 47 prestations informatiques : création de sites vitrines, e-commerce, applications Android & PWA, SaaS sur-mesure et maintenance technique.',
      en: 'Explore our 47 custom digital services: showcase websites, e-commerce, Android & PWA apps, custom SaaS software, and technical maintenance.',
    },
    'https://www.devsupai.fr/hero-bg-mockup.webp'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeProfile, setActiveProfile] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [flippedPillars, setFlippedPillars] = useState<Record<string, boolean>>({});

  const togglePillarFlip = (id: string) => {
    setFlippedPillars((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // References for coordinated GSAP animations
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const heroEyebrowRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const heroValuesRef = useRef<HTMLDivElement>(null);
  const heroAnchorsRef = useRef<HTMLDivElement>(null);

  const pillarsHeaderRef = useRef<HTMLDivElement>(null);
  const pillarsGridRef = useRef<HTMLDivElement>(null);

  const explorerHeaderRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const categoryTabsRef = useRef<HTMLDivElement>(null);
  const profilePillsRef = useRef<HTMLDivElement>(null);
  const catalogCountRef = useRef<HTMLDivElement>(null);
  const catalogGridRef = useRef<HTMLDivElement>(null);

  const methodologyHeaderRef = useRef<HTMLDivElement>(null);
  const methodologyGridRef = useRef<HTMLDivElement>(null);

  const faqHeaderRef = useRef<HTMLDivElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);

  const bannerCardRef = useRef<HTMLDivElement>(null);

  const filteredServices = useMemo(() => {
    return servicesCatalog.filter((service) => {
      if (activeCategory !== 'all' && service.category !== activeCategory) {
        return false;
      }
      if (activeProfile !== 'all' && !service.profiles.includes(activeProfile)) {
        return false;
      }
      const itemData = service[language] || service.fr;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = itemData.title.toLowerCase().includes(query);
        const matchesDesc = itemData.description.toLowerCase().includes(query);
        const matchesTags = itemData.tags.some((tag) => tag.toLowerCase().includes(query));
        return matchesTitle || matchesDesc || matchesTags;
      }
      return true;
    });
  }, [searchQuery, activeCategory, activeProfile, language]);

  // Master GSAP ScrollTrigger & Entrance Animation Context
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // A11y: Respect user motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. HERO ENTRANCE (Editorial Text Blur-Reveal & Micro-Pop)
      if (heroEyebrowRef.current) {
        gsap.fromTo(
          heroEyebrowRef.current,
          { opacity: 0, y: 25, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power2.out',
            clearProps: 'filter,transform,opacity',
          }
        );
      }

      if (heroTitleRef.current) {
        gsap.fromTo(
          heroTitleRef.current,
          { opacity: 0, scale: 0.85, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: 'back.out(1.7)',
            clearProps: 'transform,opacity',
          }
        );
      }

      if (heroDescRef.current) {
        gsap.fromTo(
          heroDescRef.current,
          { opacity: 0, y: 30, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            delay: 0.15,
            ease: 'power2.out',
            clearProps: 'filter,transform,opacity',
          }
        );
      }

      // Hero Value Proposition 4 Cards (Tactile Pop-up like landing page break)
      if (heroValuesRef.current) {
        const valueItems = Array.from(heroValuesRef.current.children);
        gsap.fromTo(
          valueItems,
          { opacity: 0, y: 25, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.1,
            delay: 0.3,
            ease: 'back.out(1.4)',
            clearProps: 'transform,opacity',
          }
        );
      }

      // Hero Direct Links Bar
      if (heroAnchorsRef.current) {
        gsap.fromTo(
          heroAnchorsRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.5,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
          }
        );
      }

      // 2. STRATEGIC PILLARS SECTION (Exact 3D Eventail from GlacierOffers)
      if (pillarsHeaderRef.current) {
        const headerChildren = Array.from(pillarsHeaderRef.current.children);
        gsap.fromTo(
          headerChildren,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.15,
            ease: 'power3.out',
            clearProps: 'filter,transform,opacity',
            scrollTrigger: {
              trigger: pillarsHeaderRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. STRATEGIC PILLARS SECTION (Chaque carte animée individuellement au scroll, rapide et réactif)
      if (pillarsGridRef.current) {
        const pillarCards = Array.from(pillarsGridRef.current.children) as HTMLElement[];
        const isDesktop = window.innerWidth >= 768;

        pillarCards.forEach((card, idx) => {
          const isLeft = idx % 2 === 0;
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: isDesktop ? (isLeft ? -40 : 40) : 0,
              y: 25,
              rotateY: isDesktop ? (isLeft ? 8 : -8) : 0,
              transformPerspective: 1200,
              scale: 0.95,
              filter: 'blur(3px)',
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotateY: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.45,
              ease: 'power2.out',
              clearProps: 'transform,opacity,filter',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // 3. CATALOG EXPLORER SECTION (Contrôles en-tête rapides)
      if (explorerHeaderRef.current) {
        const expHeaderChildren = Array.from(explorerHeaderRef.current.children);
        gsap.fromTo(
          expHeaderChildren,
          { opacity: 0, y: 15, filter: 'blur(3px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.4,
            stagger: 0.06,
            ease: 'power2.out',
            clearProps: 'filter,transform,opacity',
            scrollTrigger: {
              trigger: explorerHeaderRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      const controlsGroup = [
        searchBarRef.current,
        categoryTabsRef.current,
        profilePillsRef.current,
        catalogCountRef.current,
      ].filter(Boolean);

      if (controlsGroup.length > 0) {
        gsap.fromTo(
          controlsGroup,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.05,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: searchBarRef.current || explorerHeaderRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 4. METHODOLOGY SECTION (Chaque étape animée individuellement, rapide et fluide)
      if (methodologyHeaderRef.current) {
        const methHeaderChildren = Array.from(methodologyHeaderRef.current.children);
        gsap.fromTo(
          methHeaderChildren,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: methodologyHeaderRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (methodologyGridRef.current) {
        const items = Array.from(methodologyGridRef.current.children) as HTMLElement[];

        items.forEach((item) => {
          gsap.fromTo(
            item,
            {
              opacity: 0,
              y: 25,
              scale: 0.95,
              filter: 'blur(3px)',
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.4,
              ease: 'power2.out',
              clearProps: 'filter,transform,opacity',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // 5. SERVICES FAQ (Exact Offscreen + Color-Morph from GlacierFaq)
      // 5. SERVICES FAQ (Rapide et vif)
      if (faqHeaderRef.current) {
        const faqTargets = Array.from(faqHeaderRef.current.children);
        gsap.fromTo(
          faqTargets,
          { opacity: 0, y: 20, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: faqHeaderRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (faqListRef.current) {
        const cards = Array.from(faqListRef.current.children) as HTMLElement[];
        const faqTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: faqListRef.current,
            start: 'top 85%',
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          },
        });

        const offscreenX = typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.3, 300) : 250;

        cards.forEach((card, idx) => {
          const fromLeft = idx % 2 === 0;
          const questionTitle = card.querySelector('.services-faq-question-title');
          const chevronBadge = card.querySelector('.services-faq-chevron-badge');
          const insertPosition = idx === 0 ? 0 : '-=0.22';

          // Animation conteneur de la carte (rapide et percutante)
          faqTimeline.fromTo(
            card,
            {
              opacity: 0,
              x: fromLeft ? -offscreenX : offscreenX,
              filter: 'blur(4px)',
              backgroundColor: '#0284C7',
              borderColor: '#0284C7',
              transition: 'none',
            },
            {
              opacity: 1,
              x: 0,
              filter: 'blur(0px)',
              backgroundColor: '#FFFFFF',
              borderColor: '#E5E5E5',
              duration: 0.35,
              ease: 'power2.out',
              clearProps: 'backgroundColor,borderColor,transition',
            },
            insertPosition
          );

          // Animation du titre de question (blanc vers noir)
          if (questionTitle) {
            faqTimeline.fromTo(
              questionTitle,
              {
                color: '#FFFFFF',
                transition: 'none',
              },
              {
                color: '#1A1A1A',
                duration: 0.35,
                ease: 'power2.out',
                clearProps: 'color,transition',
              },
              insertPosition
            );
          }

          // Animation de la pastille du chevron (bleu vers blanc)
          if (chevronBadge) {
            faqTimeline.fromTo(
              chevronBadge,
              {
                backgroundColor: '#0284C7',
                borderColor: '#0284C7',
                color: '#FFFFFF',
                transition: 'none',
              },
              {
                backgroundColor: '#FFFFFF',
                borderColor: '#E5E5E5',
                color: '#555555',
                duration: 0.35,
                ease: 'power2.out',
                clearProps: 'backgroundColor,borderColor,color,transition',
              },
              insertPosition
            );
          }
        });
      }

      // 6. BOTTOM CONTACT BANNER (Apparition rapide, nette et réactive)
      if (bannerCardRef.current) {
        gsap.fromTo(
          bannerCardRef.current,
          {
            opacity: 0,
            scale: 0.96,
            y: 20,
            filter: 'blur(3px)',
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.35,
            ease: 'power2.out',
            clearProps: 'filter,transform,opacity',
            scrollTrigger: {
              trigger: bannerCardRef.current,
              start: 'top 92%',
              end: 'bottom top',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, pageContainerRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  // 3. CATALOG CARDS: Animation individuelle rapide et fluide pour CHACUNE des 47 cartes
  useEffect(() => {
    if (typeof window === 'undefined' || !catalogGridRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = Array.from(catalogGridRef.current.children) as HTMLElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 20,
            scale: 0.96,
            filter: 'blur(3px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.32,
            ease: 'power2.out',
            clearProps: 'transform,opacity,filter',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              end: 'bottom top',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, catalogGridRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 80);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [filteredServices]);

  const selectCategoryFromPillar = (catId: string) => {
    setActiveCategory(catId);
    setActiveProfile('all');
    setSearchQuery('');
    if (typeof document !== 'undefined') {
      const explorerElem = document.getElementById('catalogue-explorer');
      if (explorerElem) {
        explorerElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const isFilteringActive = activeCategory !== 'all' || activeProfile !== 'all' || searchQuery.trim() !== '';

  const resetAllFilters = () => {
    setActiveCategory('all');
    setActiveProfile('all');
    setSearchQuery('');
  };

  return (
    <div ref={pageContainerRef} className="w-full bg-white text-[#4A4A4A] min-h-screen">
      
      {/* 1. HERO SECTION AVEC FOND PARALLAXE FIXE */}
      <section 
        id="hero"
        className="services-parallax-section py-16 md:py-24 text-left border-b border-slate-800"
        aria-label={language === 'en' ? "Services Overview" : "Présentation des Prestations DevSupAi"}
      >
        <div 
          className="services-parallax-bg" 
          style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
        />
        <div className="services-parallax-tint" />

        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          
          <div 
            ref={heroEyebrowRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/40 bg-sky-500/20 text-xs font-bold font-['Montserrat'] text-sky-300 mb-6 shadow-sm"
          >
            <Sparkles size={14} className="text-sky-300" aria-hidden="true" />
            <span>{t.hero.eyebrow}</span>
          </div>

          <h1 
            ref={heroTitleRef}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-['Montserrat'] text-white mb-6 leading-[1.15] tracking-tight max-w-4xl"
          >
            {t.hero.title}
          </h1>

          <p 
            ref={heroDescRef}
            className="text-base sm:text-lg text-white max-w-3xl leading-relaxed mb-10 font-['Plus_Jakarta_Sans'] font-normal"
            style={{ color: '#FFFFFF' }}
          >
            {t.hero.desc}
          </p>

          {/* Value Proposition Bar (Cards with micro-elevation & subtle hover) */}
          <div 
            ref={heroValuesRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-white/20 shadow-2xl mb-8"
          >
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 group">
              <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#0284C7] shrink-0 group-hover:scale-110 group-hover:bg-[#0284C7]/10 transition-all duration-300">
                <FileCode size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-bold font-['Montserrat'] text-[#1A1A1A] leading-snug">{t.hero.valCode}</div>
                <div className="text-xs text-[#666666]">{t.hero.valCodeSub}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 group">
              <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#0284C7] shrink-0 group-hover:scale-110 group-hover:bg-[#0284C7]/10 transition-all duration-300">
                <Gauge size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-bold font-['Montserrat'] text-[#1A1A1A] leading-snug">{t.hero.valSpeed}</div>
                <div className="text-xs text-[#666666]">{t.hero.valSpeedSub}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 group">
              <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#0284C7] shrink-0 group-hover:scale-110 group-hover:bg-[#0284C7]/10 transition-all duration-300">
                <SlidersHorizontal size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-bold font-['Montserrat'] text-[#1A1A1A] leading-snug">{t.hero.valPillars}</div>
                <div className="text-xs text-[#666666]">{t.hero.valPillarsSub}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 group">
              <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#0284C7] shrink-0 group-hover:scale-110 group-hover:bg-[#0284C7]/10 transition-all duration-300">
                <UserCheck size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-bold font-['Montserrat'] text-[#1A1A1A] leading-snug">{t.hero.valContact}</div>
                <div className="text-xs text-[#666666]">{t.hero.valContactSub}</div>
              </div>
            </div>
          </div>

          {/* Quick Anchor Jumps (Tactile links with high contrast) */}
          <div 
            ref={heroAnchorsRef}
            className="flex flex-wrap items-center gap-3 text-xs font-['Montserrat'] font-semibold text-white"
          >
            <span className="text-white font-bold" style={{ color: '#FFFFFF' }}>{t.hero.directAccess}</span>
            <a 
              href="#poles-expertise" 
              className="text-white hover:text-sky-300 transition-all duration-150 border-b border-white/40 hover:border-sky-300 active:scale-95"
              style={{ color: '#FFFFFF' }}
            >
              {t.hero.anchorPillars}
            </a>
            <span className="text-sky-400" aria-hidden="true">•</span>
            <a 
              href="#catalogue-explorer" 
              className="text-white hover:text-sky-300 transition-all duration-150 border-b border-white/40 hover:border-sky-300 active:scale-95"
              style={{ color: '#FFFFFF' }}
            >
              {t.hero.anchorCatalog}
            </a>
            <span className="text-sky-400" aria-hidden="true">•</span>
            <a 
              href="#methodologie" 
              className="text-white hover:text-sky-300 transition-all duration-150 border-b border-white/40 hover:border-sky-300 active:scale-95"
              style={{ color: '#FFFFFF' }}
            >
              {t.hero.anchorMethod}
            </a>
            <span className="text-sky-400" aria-hidden="true">•</span>
            <a 
              href="#faq" 
              className="text-white hover:text-sky-300 transition-all duration-150 border-b border-white/40 hover:border-sky-300 active:scale-95"
              style={{ color: '#FFFFFF' }}
            >
              {t.hero.anchorFaq}
            </a>
          </div>

        </div>
      </section>

      {/* 2. STRATEGIC PILLARS SECTION (3D Spatial Perspective) */}
      <SectionReveal id="poles-expertise" className="py-16 md:py-24 border-b border-[#E5E5E5] bg-white">
        <div className="container max-w-6xl mx-auto px-6">
          
          <div ref={pillarsHeaderRef} className="max-w-2xl mb-12 text-left">
            <span className="col-pre-title">{t.pillarsSection.eyebrow}</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-[#1A1A1A] leading-tight mb-4">
              {t.pillarsSection.title}
            </h2>
            <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
              {t.pillarsSection.desc}
            </p>
          </div>

          <div ref={pillarsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
            {pillars.map((pillar) => {
              const IconComp = pillar.icon;
              const isFlipped = !!flippedPillars[pillar.id];
              return (
                <div key={pillar.id} className="glacier-flip-card-wrapper min-h-[520px]">
                  <div className={`glacier-flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                    
                    {/* --- RECTO (FRONT) --- */}
                    <div className="glacier-flip-card-front p-8 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#0284C7] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl">
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0284C7] group-hover:scale-110 group-hover:bg-[#0284C7]/10 transition-all duration-300">
                              <IconComp size={24} aria-hidden="true" />
                            </div>
                            <div>
                              <span className="text-xs font-bold font-['Montserrat'] text-[#0284C7] block uppercase tracking-wider">
                                {pillar.badge}
                              </span>
                              <span className="text-xs text-[#777777]">{pillar.subtitle}</span>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold font-['Montserrat'] text-[#1A1A1A] mb-3 leading-snug group-hover:text-[#0284C7] transition-colors duration-200">
                          {pillar.title}
                        </h3>

                        <p className="text-sm text-[#555555] leading-relaxed mb-6 font-normal">
                          {pillar.desc}
                        </p>

                        {/* Deliverables Checklist with subtle hover highlight */}
                        <div className="space-y-2.5 mb-6 p-5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] group-hover:border-[#0284C7]/30 transition-colors duration-200">
                          <div className="text-xs font-bold font-['Montserrat'] text-[#1A1A1A] uppercase tracking-wider mb-2">
                            {t.pillarsSection.deliverablesTitle}
                          </div>
                          {pillar.deliverables.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs text-[#555555]">
                              <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                              <span className="leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-4">
                          <span className="text-xs text-[#888888] mr-1">{t.pillarsSection.techLabel}</span>
                          {pillar.tech.map((techItem, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2.5 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] font-semibold transition-colors hover:border-[#0284C7]/40 hover:text-[#0284C7]"
                            >
                              {techItem}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bas de carte : Lien Flip 3D + CTA */}
                      <div className="pt-4 border-t border-[#E5E5E5] flex flex-col gap-3">
                        <button
                          type="button"
                          onClick={() => togglePillarFlip(pillar.id)}
                          className="glacier-flip-text-link group cursor-pointer"
                          aria-label={language === 'en' ? "Flip card to view technical specifications" : "Retourner la carte pour voir la fiche technique complète"}
                        >
                          <RotateCw className="w-3.5 h-3.5 text-[#0284C7] group-hover:rotate-180 transition-transform duration-500 shrink-0" aria-hidden="true" />
                          <span>{language === 'en' ? "Detailed specifications & tech (Flip ⟲)" : "Voir la fiche technique complète (Verso ⟲)"}</span>
                        </button>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="text-xs">
                            <span className="text-[#888888] block text-xs">{t.pillarsSection.pricingLabel}</span>
                            <strong className="text-[#0284C7] font-extrabold font-['Montserrat'] text-sm">{pillar.pricing}</strong>
                          </div>

                          <button
                            onClick={() => selectCategoryFromPillar(pillar.id)}
                            className="text-xs font-['Montserrat'] font-bold text-white bg-[#1A1A1A] hover:bg-[#0284C7] px-4 py-2.5 rounded-md transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
                          >
                            <span>{t.pillarsSection.viewServicesBtn}</span>
                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* --- VERSO (BACK) --- */}
                    <div className="glacier-flip-card-back p-8 rounded-xl bg-white border-2 border-[#0284C7] shadow-xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E5E5E5]">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] bg-[#0284C7]/10 border border-[#0284C7]/30 px-2.5 py-1 rounded-md inline-flex items-center gap-1.5">
                            <IconComp size={14} aria-hidden="true" />
                            <span>{language === 'en' ? "DETAILED SPECS" : "FICHE TECHNIQUE"}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => togglePillarFlip(pillar.id)}
                            className="px-2.5 py-1 bg-[#F8FAFC] hover:bg-sky-50 border border-[#E2E8F0] hover:border-[#0284C7]/40 text-[#475569] hover:text-[#0284C7] rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold font-['Montserrat'] active:scale-95"
                            title={language === 'en' ? "Flip back" : "Retourner au recto"}
                          >
                            <RotateCcw size={13} className="text-[#0284C7]" aria-hidden="true" />
                            <span>{language === 'en' ? "Back" : "Retour"}</span>
                          </button>
                        </div>

                        <div className="flex items-baseline justify-between gap-2 mb-3">
                          <h3 className="text-base sm:text-lg font-bold font-['Montserrat'] text-[#1A1A1A]">
                            {pillar.title}
                          </h3>
                          <strong className="text-sm font-extrabold font-['Montserrat'] text-[#0284C7] shrink-0">
                            {pillar.badge}
                          </strong>
                        </div>

                        <p className="text-xs text-[#555555] leading-relaxed mb-4 font-normal">
                          {pillar.desc}
                        </p>

                        {/* All deliverables */}
                        <div className="space-y-2 mb-4 p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                          <div className="text-xs font-bold font-['Montserrat'] text-[#1A1A1A] uppercase tracking-wider mb-1">
                            {t.pillarsSection.deliverablesTitle}
                          </div>
                          {pillar.deliverables.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-[#555555]">
                              <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                              <span className="leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {pillar.tech.map((techItem, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2.5 py-0.5 rounded-md bg-[#F1F5F9] text-[#0284C7] border border-[#E2E8F0] font-semibold"
                            >
                              {techItem}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[#888888] block text-xs">{t.pillarsSection.pricingLabel}</span>
                          <strong className="text-[#0284C7] font-extrabold font-['Montserrat'] text-sm">{pillar.pricing}</strong>
                        </div>

                        <button
                          onClick={() => selectCategoryFromPillar(pillar.id)}
                          className="text-xs font-['Montserrat'] font-bold text-white bg-[#0284C7] hover:bg-[#1A1A1A] px-4 py-2.5 rounded-md transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
                        >
                          <span>{t.pillarsSection.viewServicesBtn}</span>
                          <ArrowRight size={13} aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </SectionReveal>

      {/* 3. INTERACTIVE CATALOG & SEARCH ENGINE */}
      <section id="catalogue-explorer" className="border-b border-[#E5E5E5] bg-[#F8F8F8]">
        {/* Bandeau En-tête & Moteur de Recherche avec Fond Parallaxe Fixe */}
        <div className="services-parallax-section py-14 md:py-20 border-b border-slate-800">
          <div 
            className="services-parallax-bg" 
            style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
          />
          <div className="services-parallax-tint" />

          <div className="container max-w-6xl mx-auto px-6 relative z-10">
            <div ref={explorerHeaderRef} className="text-left mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/40 bg-sky-500/20 text-xs font-bold font-['Montserrat'] text-sky-300 mb-4">
                <SlidersHorizontal size={13} className="text-sky-300" aria-hidden="true" />
                <span>{t.explorer.eyebrow}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-white mb-3 leading-tight tracking-tight">
                {t.explorer.title}
              </h2>
              <p 
                className="text-sm sm:text-base text-white max-w-2xl leading-relaxed font-normal"
                style={{ color: '#FFFFFF' }}
              >
                {t.explorer.desc}
              </p>
            </div>

            {/* Search bar with focus ring animation */}
            <div ref={searchBarRef} className="mb-6">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#38BDF8] transition-colors duration-200" size={18} aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.explorer.searchPlaceholder}
                  aria-label={t.explorer.searchPlaceholder}
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/30 text-sm text-[#1A1A1A] placeholder-slate-500 focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 shadow-lg transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-['Montserrat'] text-slate-500 hover:text-slate-800 active:scale-90 transition-all cursor-pointer group/reset"
                    aria-label="Effacer la recherche"
                  >
                    <RotateCcw size={14} className="inline group-hover/reset:-rotate-180 transition-transform duration-500" />
                  </button>
                )}
              </div>
            </div>

            {/* Category tabs (Tactile buttons with active states & high contrast pure white text) */}
            <div ref={categoryTabsRef} className="flex flex-wrap items-center gap-2 mb-4 text-left">
              {[
                { id: 'all', label: t.explorer.categoryAll },
                { id: 'vitrines', label: t.explorer.catVitrines },
                { id: 'ecommerce', label: t.explorer.catEcommerce },
                { id: 'apps', label: t.explorer.catApps },
                { id: 'maintenance', label: t.explorer.catMaintenance },
              ].map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2.5 rounded-lg text-xs font-['Montserrat'] font-bold transition-all duration-200 cursor-pointer active:scale-95 shadow-md border ${
                      isActive
                        ? 'bg-[#0284C7] text-white border-sky-300 shadow-sky-600/40 ring-2 ring-sky-400/40'
                        : 'bg-slate-900/85 hover:bg-slate-800 text-white border-white/30 hover:border-white/60 backdrop-blur-md'
                    }`}
                    style={{ color: '#FFFFFF' }}
                  >
                    <span style={{ color: '#FFFFFF' }}>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Profile Filter Dropdown / Tags (Pure white text & high contrast) */}
            <div ref={profilePillsRef} className="flex flex-wrap items-center gap-2 text-left">
              <span className="text-xs text-white font-bold mr-1" style={{ color: '#FFFFFF' }}>
                Filtrer par profil :
              </span>
              {[
                { id: 'all', label: t.explorer.profileAll },
                { id: 'pme', label: t.explorer.profPme },
                { id: 'artisans', label: t.explorer.profArtisans },
                { id: 'commerces', label: t.explorer.profCommerces },
                { id: 'associations', label: t.explorer.profAsso },
                { id: 'professions-liberales', label: t.explorer.profLiberal },
                { id: 'restaurants', label: t.explorer.profResto },
              ].map((p) => {
                const isActive = activeProfile === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveProfile(p.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer active:scale-95 border ${
                      isActive
                        ? 'bg-[#0284C7] text-white border-sky-300 font-bold shadow-sm'
                        : 'bg-slate-900/85 hover:bg-slate-800 text-white border-white/25 hover:border-white/50 backdrop-blur-md'
                    }`}
                    style={{ color: '#FFFFFF' }}
                  >
                    <span style={{ color: '#FFFFFF' }}>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Grille des prestations sur fond clair */}
        <div className="container max-w-6xl mx-auto px-6 py-12 md:py-16">
          {/* Counter bar */}
          <div ref={catalogCountRef} className="flex items-center justify-between mb-8 pb-3 border-b border-[#E5E5E5] text-xs text-[#666666]">
            <div>
              <strong className="text-[#1A1A1A] font-bold text-sm">{filteredServices.length}</strong> {t.explorer.resultsCount}
            </div>
            {isFilteringActive && (
              <button
                onClick={resetAllFilters}
                className="text-xs font-bold text-[#0284C7] hover:underline active:scale-95 cursor-pointer transition-all"
              >
                {t.explorer.resetBtn}
              </button>
            )}
          </div>

          {/* Grid of Services (Cards with subtle elevation & border highlight) */}
          {filteredServices.length > 0 ? (
            <div ref={catalogGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
              {filteredServices.map((service) => {
                const itemData = service[language] || service.fr;
                const IconComp = service.icon;
                return (
                  <div
                    key={service.id}
                    className="p-6 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#0284C7] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-lg hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0284C7] group-hover:scale-110 group-hover:bg-[#0284C7]/10 transition-all duration-300">
                          <IconComp size={20} aria-hidden="true" />
                        </div>
                        <span className="text-xs font-bold font-['Montserrat'] px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] uppercase">
                          {service.category}
                        </span>
                      </div>

                      <h3 className="text-base font-bold font-['Montserrat'] text-[#1A1A1A] mb-2 leading-snug group-hover:text-[#0284C7] transition-colors duration-200">
                        {itemData.title}
                      </h3>

                      <p className="text-xs text-[#666666] leading-relaxed mb-4 font-normal">
                        {itemData.description}
                      </p>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4 pt-3 border-t border-[#F1F5F9]">
                        {itemData.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-0.5 rounded-md bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/#contact?service=${encodeURIComponent(itemData.title)}`}
                        className="text-xs font-['Montserrat'] font-bold text-[#0284C7] hover:text-[#1A1A1A] transition-colors inline-flex items-center gap-1 cursor-pointer group/link active:scale-95"
                      >
                        <span>{t.explorer.contactCtaText}</span>
                        <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 rounded-xl bg-white border border-[#E5E5E5] text-center max-w-lg mx-auto shadow-sm">
              <h3 className="text-lg font-bold font-['Montserrat'] text-[#1A1A1A] mb-2">{t.explorer.emptyTitle}</h3>
              <p className="text-xs text-[#666666] mb-6 leading-relaxed">
                {t.explorer.emptyDesc}
              </p>
              <button
                onClick={resetAllFilters}
                className="btn-glacier-solid cursor-pointer active:scale-95 transition-all"
              >
                {t.explorer.resetBtn}
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 4. METHODOLOGY SECTION (Chronological Steps 01 -> 04 - Exact 3D Flip from GlacierGallery) */}
      <section id="methodologie" className="border-b border-[#E5E5E5] bg-white">
        {/* Bandeau En-tête avec Fond Parallaxe Fixe */}
        <div className="services-parallax-section py-16 md:py-20 text-center border-b border-slate-800">
          <div 
            className="services-parallax-bg" 
            style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
          />
          <div className="services-parallax-tint" />

          <div ref={methodologyHeaderRef} className="container max-w-3xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/40 bg-sky-500/20 text-xs font-bold font-['Montserrat'] text-sky-300 mb-4 shadow-sm">
              <Sparkles size={13} className="text-sky-300" aria-hidden="true" />
              <span>{t.methodology.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-white mb-3 tracking-tight">
              {t.methodology.title}
            </h2>
          </div>
        </div>

        {/* Grille des 4 étapes 3D sur fond clair */}
        <div className="container max-w-6xl mx-auto px-6 py-16 md:py-20 overflow-hidden">
          <div ref={methodologyGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {t.methodology.steps.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0284C7] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="text-sm font-black font-['Montserrat'] text-[#0284C7] mb-3 group-hover:scale-105 transition-transform duration-200">
                    {step.num}
                  </div>
                  <h3 className="text-base font-bold font-['Montserrat'] text-[#1A1A1A] mb-2 group-hover:text-[#0284C7] transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES FAQ (Exact Offscreen + Color-Morph from GlacierFaq) */}
      <section id="faq" className="border-b border-[#E5E5E5] bg-[#F8F8F8]">
        {/* Bandeau En-tête avec Fond Parallaxe Fixe (Identique à GlacierFaq) */}
        <div className="services-parallax-section py-16 md:py-20 text-center border-b border-slate-800">
          <div 
            className="services-parallax-bg" 
            style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
          />
          <div className="services-parallax-tint" />

          <div ref={faqHeaderRef} className="container max-w-3xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/40 bg-sky-500/20 text-xs font-bold font-['Montserrat'] text-sky-300 mb-4 shadow-sm">
              <Sparkles size={13} className="text-sky-300" aria-hidden="true" />
              <span>{t.faqSection.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-white tracking-tight">
              {t.faqSection.title}
            </h2>
          </div>
        </div>

        {/* Liste des Questions FAQ en Accordéon avec animation Offscreen */}
        <div className="container max-w-4xl mx-auto px-6 py-16 md:py-24 text-left overflow-hidden">
          <div ref={faqListRef} className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border transition-all duration-300 ease-out ${
                    isOpen 
                      ? 'border-[#0284C7] bg-white shadow-md' 
                      : 'border-[#E5E5E5] bg-white hover:border-[#CCCCCC]'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none group active:scale-[0.99] transition-transform"
                    aria-expanded={isOpen}
                    aria-controls={`services-faq-answer-${idx}`}
                    id={`services-faq-question-${idx}`}
                  >
                    <span className="services-faq-question-title text-sm sm:text-base font-bold font-['Montserrat'] text-[#1A1A1A] leading-snug group-hover:text-[#0284C7] transition-colors duration-200 flex-1">
                      {faq.question}
                    </span>
                    <span className={`services-faq-chevron-badge shrink-0 p-1.5 rounded-full border transition-all duration-300 ${
                      isOpen 
                        ? 'border-[#0284C7] text-[#0284C7] bg-sky-50' 
                        : 'border-[#E5E5E5] text-[#555555] bg-white group-hover:border-[#0284C7]/40'
                    }`}>
                      <ChevronDown 
                        size={16} 
                        aria-hidden="true" 
                        className={`transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                      />
                    </span>
                  </button>

                  <div
                    id={`services-faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`services-faq-question-${idx}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-4 pt-4 border-t border-[#E5E5E5] text-xs sm:text-sm text-[#555555] leading-relaxed font-['Plus_Jakarta_Sans']">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CONTACT BANNER (Fond Parallaxe Signature & Card Glassy) */}
      <section className="services-parallax-section py-20 md:py-28 relative overflow-hidden border-t border-slate-800">
        <div 
          className="services-parallax-bg" 
          style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
        />
        <div className="services-parallax-tint" />

        <div className="container max-w-4xl mx-auto px-6 relative z-10">
          <div 
            ref={bannerCardRef}
            className="p-8 sm:p-14 rounded-none bg-slate-900/65 backdrop-blur-xl border border-white/25 text-white text-center space-y-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-all duration-300 hover:border-white/40 group"
          >
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-white tracking-tight"
              style={{ color: '#FFFFFF' }}
            >
              {t.banner.title}
            </h2>
            <p 
              className="text-sm sm:text-base text-white max-w-xl mx-auto leading-relaxed font-normal"
              style={{ color: '#FFFFFF' }}
            >
              {t.banner.desc}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/#contact"
                className="btn-glacier-solid rounded-none bg-[#0284C7] hover:bg-sky-400 text-white font-bold border border-sky-300/40 shadow-lg shadow-sky-900/40 active:scale-95 transition-all duration-200 tracking-wider"
                style={{ color: '#FFFFFF' }}
              >
                <span style={{ color: '#FFFFFF' }}>{t.banner.cta}</span>
              </Link>
              <a
                href="tel:0783666098"
                className="btn-glacier-outline-white rounded-none inline-flex items-center gap-2.5 active:scale-95 transition-all duration-200 group/phone shadow-md backdrop-blur-md"
                style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.45)', backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
              >
                <PhoneCall size={15} className="text-[#38BDF8] group-hover/phone:text-[#1A1A1A] group-hover/phone:rotate-12 transition-transform duration-200 shrink-0" aria-hidden="true" />
                <span style={{ color: '#FFFFFF' }} className="group-hover/phone:text-[#1A1A1A] font-bold">07 83 66 60 98</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

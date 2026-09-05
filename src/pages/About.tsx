import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { useLanguage } from '../i18n/LanguageContext';
import { pagesData } from '../i18n/pagesData';
import { MapPin, Mail, Sparkles, ArrowRight, ExternalLink, Database, PhoneCall, RotateCcw, X, BookOpen } from 'lucide-react';

export default function About() {
  const { language } = useLanguage();
  const t = pagesData[language]?.about || pagesData.fr.about;
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const sourceCardRef = useRef<HTMLDivElement>(null);
  const flyingCardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Déclenche l'animation de détachement, agrandissement et rotation 3D
  const openFlip = () => {
    if (isFlipped || isClosing) return;
    setIsFlipped(true);
  };

  // Ferme avec animation inverse vers la sidebar
  const closeFlip = () => {
    if (isClosing || !isFlipped) return;
    setIsClosing(true);

    const sourceEl = sourceCardRef.current;
    const flyingEl = flyingCardRef.current;
    const overlayEl = overlayRef.current;

    if (sourceEl && flyingEl) {
      const sourceRect = sourceEl.getBoundingClientRect();
      const currentRect = flyingEl.getBoundingClientRect();

      // Delta pour retourner exactement à l'emplacement de départ
      const dx = sourceRect.left + sourceRect.width / 2 - (currentRect.left + currentRect.width / 2);
      const dy = sourceRect.top + sourceRect.height / 2 - (currentRect.top + currentRect.height / 2);
      const scaleX = sourceRect.width / currentRect.width;

      const tl = gsap.timeline({
        onComplete: () => {
          setIsFlipped(false);
          setIsClosing(false);
        }
      });

      if (overlayEl) {
        tl.to(overlayEl, { opacity: 0, duration: 0.5, ease: 'power4.out' }, 0);
      }

      tl.to(flyingEl, {
        x: `+=${dx}`,
        y: `+=${dy}`,
        scale: scaleX,
        rotateY: 0, // Retourne sur la face recto
        duration: 0.6,
        ease: 'power4.out'
      }, 0);
    } else {
      setIsFlipped(false);
      setIsClosing(false);
    }
  };

  // Animation d'ouverture : part exactement de la position de la sourceCard vers le centre en pivotant à 180deg
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isFlipped || isClosing) return;

    const sourceEl = sourceCardRef.current;
    const flyingEl = flyingCardRef.current;
    const overlayEl = overlayRef.current;

    if (!sourceEl || !flyingEl) return;

    // Calculer les positions écran
    const sourceRect = sourceEl.getBoundingClientRect();
    const targetRect = flyingEl.getBoundingClientRect();

    // Déplacement initial depuis la carte source jusqu'au centre
    const initialDx = sourceRect.left + sourceRect.width / 2 - (targetRect.left + targetRect.width / 2);
    const initialDy = sourceRect.top + sourceRect.height / 2 - (targetRect.top + targetRect.height / 2);
    const initialScale = sourceRect.width / targetRect.width;

    // Timeline GSAP propre
    const tl = gsap.timeline();

    if (overlayEl) {
      tl.fromTo(overlayEl, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power4.out' }, 0);
    }

    tl.fromTo(
      flyingEl,
      {
        x: initialDx,
        y: initialDy,
        scale: initialScale,
        rotateY: 0, // Commence sur la face avant
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 180, // Se retourne à 180° pour afficher le verso (bio)
        duration: 0.75,
        ease: 'power4.out',
      },
      0
    );
  }, [isFlipped]);

  useDocumentMetadata(
    {
      fr: "À Propos | Alexandre Pabst – Développeur Web Sur-Mesure | DevSupAi",
      en: "About | Alexandre Pabst – Custom Web Developer | DevSupAi",
    },
    {
      fr: "Découvrez le parcours d'Alexandre Pabst, artisan du web et fondateur de DevSupAi à Saint-Mihiel (Meuse). Une méthode sur-mesure sans compromis pour PME et artisans.",
      en: "Discover the background of Alexandre Pabst, founder of DevSupAi in Saint-Mihiel (France), and his uncompromising methodology for crafting bespoke, ultra-fast websites.",
    },
    'https://www.devsupai.fr/hero-bg-mockup.webp'
  );

  // References for coordinated GSAP animations
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const heroEyebrowRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLDivElement>(null);
  const storyTextRef = useRef<HTMLDivElement>(null);
  const unifiedCardRef = useRef<HTMLDivElement>(null);
  const principlesHeaderRef = useRef<HTMLDivElement>(null);
  const principlesGridRef = useRef<HTMLDivElement>(null);
  const projectsHeaderRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const bannerCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. HERO ELEMENTS (Départ vif et net, décélération douce à l'arrivée)
      const heroTl = gsap.timeline();

      if (heroEyebrowRef.current) {
        heroTl.fromTo(
          heroEyebrowRef.current,
          { opacity: 0, y: -20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
          0
        );
      }

      if (heroTitleRef.current) {
        heroTl.fromTo(
          heroTitleRef.current,
          { opacity: 0, y: 30, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power4.out', clearProps: 'transform,opacity' },
          0.05
        );
      }

      if (heroDescRef.current) {
        heroTl.fromTo(
          heroDescRef.current,
          { opacity: 0, y: 25, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power4.out', clearProps: 'transform,opacity' },
          0.1
        );
      }

      // 2. STORY TEXT & UNIFIED CARD REVEAL (Départ vif, glisse et freinage soigné)
      if (storyTextRef.current) {
        const paragraphs = Array.from(storyTextRef.current.children) as HTMLElement[];
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power4.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: storyTextRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (unifiedCardRef.current) {
        gsap.fromTo(
          unifiedCardRef.current,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power4.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: unifiedCardRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. PROFILE CARD (Vitesse initiale immédiate, décélération progressive en fin de course)
      if (sourceCardRef.current) {
        const isDesktop = window.innerWidth >= 1024;

        if (isDesktop) {
          gsap.fromTo(
            sourceCardRef.current,
            { x: 80, y: 35, rotateY: -18, opacity: 0, scale: 0.92 },
            {
              x: 0,
              y: 0,
              rotateY: 0,
              opacity: 1,
              scale: 1,
              duration: 0.85,
              ease: 'power4.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: sourceCardRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        } else {
          gsap.fromTo(
            sourceCardRef.current,
            { y: 45, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.75,
              ease: 'power4.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: sourceCardRef.current,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // 4. PRINCIPLES HEADER & CARDS (Éventail 3D vif dès le départ, freinage doux à l'arrivée)
      if (principlesHeaderRef.current) {
        const headerItems = Array.from(principlesHeaderRef.current.children) as HTMLElement[];
        gsap.fromTo(
          headerItems,
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
              trigger: principlesHeaderRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (principlesGridRef.current) {
        const items = Array.from(principlesGridRef.current.children) as HTMLElement[];
        const isDesktop = window.innerWidth >= 1024;
        const initialX = isDesktop ? [100, 0, -100] : [0, 0, 0];
        const sequenceOrder = isDesktop ? [0, 2, 1] : [0, 1, 2];

        const principlesTl = gsap.timeline({
          scrollTrigger: {
            trigger: principlesGridRef.current,
            start: 'top 85%',
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          },
        });

        sequenceOrder.forEach((itemIdx, stepIndex) => {
          const item = items[itemIdx];
          if (!item) return;

          principlesTl.fromTo(
            item,
            {
              opacity: 0,
              x: initialX[itemIdx] || 0,
              y: 35,
              scale: 0.92,
              rotateX: 25,
              transformPerspective: 1000,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.85,
              ease: 'power4.out',
              clearProps: 'transform',
            },
            stepIndex === 0 ? 0 : 0.1
          );
        });
      }

      // 5. PROJECTS HEADER & LATERAL CONVERGENCE (Convergence avec départ immédiat et arrêt progressif)
      if (projectsHeaderRef.current) {
        const headerItems = Array.from(projectsHeaderRef.current.children) as HTMLElement[];
        gsap.fromTo(
          headerItems,
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
              trigger: projectsHeaderRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (projectsGridRef.current) {
        const cards = Array.from(projectsGridRef.current.children) as HTMLElement[];
        const isDesktop = window.innerWidth >= 1024;

        if (cards.length >= 2) {
          const projectsTl = gsap.timeline({
            scrollTrigger: {
              trigger: projectsGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });

          if (isDesktop) {
            // Carte Gauche (LocaTool) : Départ vif, ralentissement progressif à l'arrivée
            projectsTl.fromTo(
              cards[0],
              { opacity: 0, x: -70, y: 25, rotateY: 8, scale: 0.94 },
              { opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1, duration: 0.85, ease: 'power4.out', clearProps: 'transform,opacity' },
              0
            );

            // Carte Droite (AboGame) : Départ vif, ralentissement progressif à l'arrivée
            projectsTl.fromTo(
              cards[1],
              { opacity: 0, x: 70, y: 25, rotateY: -8, scale: 0.94 },
              { opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1, duration: 0.85, ease: 'power4.out', clearProps: 'transform,opacity' },
              0.08
            );
          } else {
            // Mobile : Cascade progressive
            projectsTl.fromTo(
              cards,
              { opacity: 0, y: 40, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1, ease: 'power4.out', clearProps: 'transform,opacity' }
            );
          }
        }
      }

      // 6. BOTTOM CONTACT BANNER (Départ vif, décélération douce à la fin)
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
          { opacity: 0, scale: 0.95, y: 30 },
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

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Gestion de la touche Echap pour refermer la carte biographie
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFlipped && !isClosing) {
        closeFlip();
      }
    };

    if (isFlipped) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFlipped, isClosing]);

  return (
    <div ref={pageContainerRef} className="w-full bg-white text-[#4A4A4A] min-h-screen">
      
      {/* 1. HERO SECTION (Fond Parallaxe Fixe Signature & Card Glassy) */}
      <section className="services-parallax-section py-20 md:py-32 relative overflow-hidden border-b border-slate-800 text-left">
        <div 
          className="services-parallax-bg" 
          style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
        />
        <div className="services-parallax-tint" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            ref={heroEyebrowRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-400/40 bg-sky-500/20 text-xs sm:text-sm font-bold font-['Montserrat'] text-sky-300 mb-6 shadow-sm"
          >
            <Sparkles size={16} className="text-sky-300" aria-hidden="true" />
            <span>{t.eyebrow}</span>
          </div>

          <h1 
            ref={heroTitleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-['Montserrat'] text-white mb-8 leading-[1.15] tracking-tight max-w-5xl whitespace-pre-line"
            style={{ color: '#FFFFFF' }}
          >
            {t.title}
          </h1>

          {/* Accroche forte mise en exergue avec bordure cyan et grande typographie lisible */}
          <div 
            ref={heroDescRef}
            className="p-6 md:p-8 rounded-none bg-slate-900/65 backdrop-blur-xl border border-white/20 border-l-4 border-l-sky-400 shadow-xl max-w-5xl"
          >
            <p 
              className="text-lg sm:text-xl md:text-2xl text-white font-medium font-['Playfair_Display'] italic leading-relaxed"
              style={{ color: '#FFFFFF' }}
            >
              "{t.p1}"
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT SECTION (Histoire, Principes & Projets SaaS étalés sur toute la largeur) */}
      <section className="py-16 md:py-24 bg-[#F8F8F8] border-b border-[#E5E5E5] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* BLOC 1 : HISTOIRE & PROFIL FONDATEUR (Grille spacieuse 12 colonnes avec alignement strict) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 lg:items-stretch mb-16 md:mb-24">
            
            {/* Colonne Gauche : Histoire Fondatrice & Encadré unifié (aligné en bas) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-8 lg:space-y-0">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-50 text-xs sm:text-sm font-bold font-['Montserrat'] text-[#0284C7]">
                  <span>{language === 'en' ? "VISION & COMMITMENT" : "NOTRE VISION & ENGAGEMENT"}</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Montserrat'] text-[#1A1A1A] tracking-tight leading-tight">
                  {language === 'en' 
                    ? "Bespoke web architectures engineered for durability and performance" 
                    : "Créer un web rapide, pérenne et taillé pour le terrain"}
                </h2>

                {/* Récit fondateur avec typographie aérée */}
                <div ref={storyTextRef} className="space-y-6 text-base sm:text-lg text-[#333333] leading-relaxed font-['Plus_Jakarta_Sans']">
                  <p>{t.p2}</p>
                  <p>{t.p3}</p>
                </div>
              </div>

              {/* Encadré unifié : Artisanat direct + Appel à l'action "Discuter d'un projet" */}
              <div ref={unifiedCardRef} className="p-6 sm:p-8 rounded-none bg-white border border-[#E5E5E5] border-l-4 border-l-[#0284C7] shadow-sm flex flex-col justify-between mt-8 lg:mt-auto">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-['Montserrat'] text-[#1A1A1A] mb-2">
                    {language === 'en' ? "Direct craftmanship, zero outsourcing" : "Artisanat direct, zéro sous-traitance"}
                  </h3>
                  <p className="text-sm sm:text-base text-[#555555] font-['Plus_Jakarta_Sans'] leading-relaxed mb-6">
                    {language === 'en' 
                      ? "Every project is conceived, developed, and deployed directly by Alexandre Pabst. You benefit from a single, dedicated technical specialist guaranteeing direct communication and long-term maintainability."
                      : "Chaque projet est pensé, codé et mis en ligne personnellement par Alexandre Pabst. Vous bénéficiez d'un interlocuteur technique unique et réactif, sans intermédiaire ni dilution de responsabilité."}
                  </p>
                </div>

                {/* Section Action intégrée harmonieusement avec bouton cyan visible et lisible */}
                <div className="pt-5 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <strong className="text-xs sm:text-sm font-bold font-['Montserrat'] text-[#1A1A1A] uppercase tracking-wider block">
                      {t.discussTitle}
                    </strong>
                    <span className="text-xs sm:text-sm text-[#666666] font-['Plus_Jakarta_Sans'] block">
                      {t.discussText}
                    </span>
                  </div>

                  <Link 
                    to="/#contact" 
                    className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold font-['Montserrat'] hover:bg-[#0369A1] text-white px-6 py-3 transition-all active:scale-95 shadow-sm cursor-pointer"
                    style={{ color: '#FFFFFF', backgroundColor: '#0284C7' }}
                  >
                    <span style={{ color: '#FFFFFF' }}>{t.startProjectBtn}</span>
                    <ArrowRight size={14} className="text-white" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Carte Profil Fondateur (avec Flip 3D) */}
            <div ref={sidebarRef} className="lg:col-span-5 xl:col-span-4 flex flex-col [perspective:1200px]">
              
              {/* Carte Profil Fondateur (Point d'ancrage : devient 100% invisible quand détachée) */}
              <div 
                ref={sourceCardRef}
                className={`h-full flex flex-col justify-between p-8 rounded-none bg-white border border-[#E5E5E5] shadow-sm text-center relative group ${isFlipped ? 'opacity-0 pointer-events-none select-none' : 'opacity-100'}`}
              >
                <div>
                  <img
                    src="/alexandre-pabst.webp"
                    alt={language === 'en' ? "Alexandre Pabst – Freelance Web Developer & Founder of DevSupAi" : "Alexandre Pabst – Développeur Web Indépendant & Fondateur DevSupAi"}
                    width="96"
                    height="96"
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-[#0284C7] shadow-md transition-transform duration-300 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                  />
                  <h3 className="text-2xl font-black font-['Montserrat'] text-[#1A1A1A] mb-1">Alexandre Pabst</h3>
                  <span className="text-xs sm:text-sm font-bold font-['Montserrat'] text-[#0284C7] block uppercase tracking-wider mb-2">
                    {t.founderRole}
                  </span>
                  <span className="text-sm text-slate-600 inline-flex items-center gap-1.5 mb-5">
                    <MapPin size={15} className="text-[#0284C7]" aria-hidden="true" />
                    {t.founderLocation}
                  </span>
                  
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-5 border-t border-[#E5E5E5] text-left font-['Plus_Jakarta_Sans']">
                    {t.founderBio}
                  </p>
                </div>

                <div>
                  {/* Bouton / Badge pour retourner la carte */}
                  <div className="pt-5 border-t border-[#E5E5E5] mt-5">
                    <button
                      type="button"
                      onClick={openFlip}
                      aria-expanded={isFlipped}
                      className="w-full px-4 py-3 rounded-none bg-sky-50 hover:bg-[#0284C7] text-[#0284C7] hover:text-white border border-sky-300/60 font-['Montserrat'] text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-sm active:scale-98"
                    >
                      <BookOpen size={16} className="text-[#0284C7] group-hover/btn:text-white transition-colors" aria-hidden="true" />
                      <span>{t.flipBtnText || "Découvrir mon parcours"}</span>
                      <RotateCcw size={14} className="text-[#0284C7] group-hover/btn:text-white group-hover/btn:rotate-180 transition-all duration-300 ml-1" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E5E5E5] text-left">
                    <a href="mailto:contact@devsupai.fr" className="text-sm font-bold text-[#0284C7] hover:underline inline-flex items-center gap-2">
                      <Mail size={15} aria-hidden="true" />
                      <span>contact@devsupai.fr</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* OVERLAY & CARTE VOLANTE QUI SE DÉTACHE ET PIVOTE EN 3D SANS FOND SOMBRE */}
              {isFlipped && (
                <div
                  ref={overlayRef}
                  className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-transparent"
                  onClick={closeFlip}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Parcours d'Alexandre Pabst"
                >
                  {/* Wrapper 3D perspective : proportions strictes calquées sur la carte originale (ratio 1:1.36) */}
                  <div className="flip-card-3d-wrapper relative z-10 w-full max-w-[440px]">
                    
                    {/* Element volant pivotant animé par GSAP conservant exactement les proportions d'origine */}
                    <div
                      ref={flyingCardRef}
                      className="flip-card-3d-inner w-full"
                      onClick={(e) => e.stopPropagation()}
                    >

                      {/* FACE RECTO (Exactement la carte d'origine pendant le décollage avec ombre portée réaliste) */}
                      <div className={`flip-card-3d-face flip-card-3d-front rounded-none bg-white border border-[#E5E5E5] flip-card-drop-shadow p-8 text-center flex flex-col justify-between ${isFlipped ? 'pointer-events-none' : 'pointer-events-auto'}`}>
                        <div>
                          <img
                            src="/alexandre-pabst.webp"
                            alt={language === 'en' ? "Alexandre Pabst – Freelance Web Developer & Founder of DevSupAi" : "Alexandre Pabst – Développeur Web Indépendant & Fondateur DevSupAi"}
                            width="96"
                            height="96"
                            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-[#0284C7] shadow-md"
                            loading="eager"
                            decoding="async"
                          />
                          <h3 className="text-2xl font-black font-['Montserrat'] text-[#1A1A1A] mb-1">Alexandre Pabst</h3>
                          <span className="text-xs sm:text-sm font-bold font-['Montserrat'] text-[#0284C7] block uppercase tracking-wider mb-2">
                            {t.founderRole}
                          </span>
                          <span className="text-sm text-slate-600 inline-flex items-center gap-1.5 mb-4">
                            <MapPin size={14} className="text-[#0284C7]" aria-hidden="true" />
                            {t.founderLocation}
                          </span>
                          <p className="text-sm text-slate-700 leading-relaxed pt-4 border-t border-[#E5E5E5] text-left font-['Plus_Jakarta_Sans']">
                            {t.founderBio}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-[#E5E5E5] text-left text-xs text-slate-500 font-['Montserrat']">
                          {t.founderLocation}
                        </div>
                      </div>

                      {/* FACE VERSO (La biographie complète avec ombre portée en élévation, sans fond sombre) */}
                      <div className="flip-card-3d-face flip-card-3d-back rounded-none bg-white border border-[#E5E5E5] flip-card-drop-shadow p-6 sm:p-7 flex flex-col justify-between overflow-hidden pointer-events-auto">
                        
                        {/* En-tête du Verso */}
                        <div className="border-b border-slate-200 pb-3 mb-3 flex items-start justify-between gap-3 shrink-0">
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-sky-500/20 bg-sky-50 text-[11px] font-bold font-['Montserrat'] text-[#0284C7] mb-1 uppercase tracking-wider">
                              <Sparkles size={12} className="text-[#0284C7]" aria-hidden="true" />
                              <span>{t.bioEyebrow || "PARCOURS & RACINES"}</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-black font-['Montserrat'] text-[#1A1A1A] tracking-tight leading-tight">
                              Alexandre Pabst
                            </h3>
                            <p className="text-xs font-semibold text-[#0284C7] font-['Montserrat'] uppercase tracking-wider">
                              {t.founderRole}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={closeFlip}
                            aria-label="Fermer la biographie et retourner la carte"
                            className="p-1.5 rounded-none bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer shrink-0 border border-slate-200 active:scale-95"
                          >
                            <X size={16} aria-hidden="true" />
                          </button>
                        </div>

                        {/* Corps narratif : texte confortable avec scrollbar fine discrète et écouteur de molette natif */}
                        <div 
                          className="space-y-3 text-[13px] sm:text-[13.5px] text-slate-700 font-['Plus_Jakarta_Sans'] leading-[1.6] text-left overflow-y-auto pr-2 bio-card-scroll flex-1 overscroll-contain"
                          tabIndex={0}
                          onWheel={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {t.bioExtended?.map((paragraph: string, idx: number) => (
                            <p key={idx}>
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        {/* Pied de carte fixe toujours visible avec bouton stylé et lisible */}
                        <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between gap-2 shrink-0">
                          <span className="text-xs text-slate-500 font-['Montserrat'] inline-flex items-center gap-1">
                            <MapPin size={12} className="text-[#0284C7]" aria-hidden="true" />
                            {t.founderLocation}
                          </span>

                          <button
                            type="button"
                            onClick={closeFlip}
                            className="px-4 py-2 rounded-none bg-[#1A1A1A] hover:bg-[#0284C7] text-white text-xs font-bold font-['Montserrat'] transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 border border-[#1A1A1A]"
                            style={{ color: '#FFFFFF' }}
                          >
                            <RotateCcw size={13} className="text-white" aria-hidden="true" />
                            <span style={{ color: '#FFFFFF' }}>{t.flipBackBtnText || "Retourner la carte"}</span>
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* BLOC 2 : VALEURS & PRINCIPES FONDATEURS (3 cartes côte à côte sur toute la largeur) */}
          <div className="mb-16 md:mb-24 pt-12 border-t border-[#E5E5E5]">
            <div ref={principlesHeaderRef} className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-50 text-xs sm:text-sm font-bold font-['Montserrat'] text-[#0284C7] mb-4">
                <span>{language === 'en' ? "CORE PRINCIPLES" : "VALEURS & ENGAGEMENTS"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Montserrat'] text-[#1A1A1A] tracking-tight">
                {t.principlesTitle}
              </h2>
            </div>

            {/* Les 3 cartes de principes côte à côte */}
            <div ref={principlesGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {t.principles.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between p-7 sm:p-8 rounded-none bg-white border border-[#E5E5E5] hover:border-[#0284C7] hover:shadow-lg transition-[border-color,box-shadow] duration-300 group h-full"
                >
                  <div>
                    <span className="text-[#0284C7] font-black font-['Montserrat'] text-2xl sm:text-3xl block mb-4 group-hover:scale-105 transition-transform duration-200">
                      {item.num}
                    </span>
                    <h3 className="text-[#1A1A1A] font-bold block mb-3 font-['Montserrat'] text-lg sm:text-xl group-hover:text-[#0284C7] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-['Plus_Jakarta_Sans']">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BLOC 3 : APPLICATIONS NÉES DU TERRAIN & SAAS (2 cartes côte à côte sur toute la largeur) */}
          <div className="pt-12 border-t border-[#E5E5E5]">
            <div ref={projectsHeaderRef} className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-50 text-xs sm:text-sm font-bold font-['Montserrat'] text-[#0284C7] mb-3">
                <span>{language === 'en' ? "FIELD ACHIEVEMENTS" : "RÉALISATIONS TERRAIN"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Montserrat'] text-[#1A1A1A] mb-3 tracking-tight">
                {t.realWorldProjectsTitle}
              </h2>
              <p className="text-base sm:text-lg text-[#555555] font-['Plus_Jakarta_Sans'] leading-relaxed">
                {t.realWorldProjectsDesc}
              </p>
            </div>

            {/* Les 2 cartes projets côte à côte */}
            <div ref={projectsGridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {t.projects?.map((project) => (
                <div
                  key={project.id}
                  className="p-7 sm:p-9 rounded-none bg-white border border-[#E5E5E5] hover:border-[#0284C7] hover:shadow-xl transition-[border-color,box-shadow] duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-3.5 py-1.5 rounded-none font-['Montserrat'] inline-flex items-center gap-1.5">
                        {project.id === 'locatool' ? <Database size={15} className="text-sky-600" aria-hidden="true" /> : <Sparkles size={15} className="text-sky-600" aria-hidden="true" />}
                        <span>{project.tag}</span>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black font-['Montserrat'] text-[#1A1A1A] mb-4 tracking-tight">
                      {project.title}
                    </h3>

                    <div className="space-y-4 text-sm sm:text-base font-['Plus_Jakarta_Sans'] leading-relaxed mb-8">
                      <div className="p-4 sm:p-5 rounded-none bg-[#F8FAFC] border border-[#E2E8F0]">
                        <strong className="text-sky-900 font-bold block mb-1.5 font-['Montserrat'] text-xs sm:text-sm uppercase tracking-wider">
                          {project.originLabel}
                        </strong>
                        <p className="text-slate-800 leading-relaxed">{project.origin}</p>
                      </div>
                      <div className="p-4 sm:p-5 rounded-none bg-[#F8FAFC] border border-[#E2E8F0]">
                        <strong className="text-emerald-900 font-bold block mb-1.5 font-['Montserrat'] text-xs sm:text-sm uppercase tracking-wider">
                          {project.evolutionLabel}
                        </strong>
                        <p className="text-slate-800 leading-relaxed">{project.evolution}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-[#E5E5E5] mt-auto">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-none bg-[#1A1A1A] hover:bg-[#0284C7] text-white text-sm font-bold font-['Montserrat'] transition-all inline-flex items-center gap-2 active:scale-95 shadow-sm cursor-pointer"
                      style={{ color: '#FFFFFF' }}
                    >
                      <span style={{ color: '#FFFFFF' }}>{project.liveBtnText}</span>
                      <ExternalLink size={15} className="text-white" aria-hidden="true" />
                    </a>

                    <Link
                      to={project.caseStudyUrl}
                      className="px-6 py-3 rounded-none bg-white hover:bg-slate-100 border border-[#CCCCCC] text-[#1A1A1A] text-sm font-bold font-['Montserrat'] transition-all inline-flex items-center gap-2 active:scale-95 cursor-pointer"
                    >
                      <span>{project.caseStudyBtnText}</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. BOTTOM CONTACT BANNER (Fond Parallaxe Signature & Card Glassy sans bords arrondis) */}
      <section className="services-parallax-section py-20 md:py-32 relative overflow-hidden border-t border-slate-800">
        <div 
          className="services-parallax-bg" 
          style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
        />
        <div className="services-parallax-tint" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            ref={bannerCardRef}
            className="p-8 sm:p-14 rounded-none bg-slate-900/65 backdrop-blur-xl border border-white/25 text-white text-center space-y-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-[border-color,box-shadow] duration-300 hover:border-white/40 group max-w-5xl mx-auto"
          >
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-white tracking-tight"
              style={{ color: '#FFFFFF' }}
            >
              {language === 'en' ? "Have a specific project in mind?" : "Vous avez un projet spécifique en tête ?"}
            </h2>
            <p 
              className="text-base sm:text-lg text-white max-w-2xl mx-auto leading-relaxed font-normal"
              style={{ color: '#FFFFFF' }}
            >
              {language === 'en' 
                ? "Get a free technical feasibility assessment and a personalized quote within 24 hours." 
                : "Obtenez une étude de faisabilité technique gratuite et un devis personnalisé sous 24 heures."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/#contact"
                className="btn-glacier-solid rounded-none bg-[#0284C7] hover:bg-sky-400 text-white text-sm font-bold border border-sky-300/40 shadow-lg shadow-sky-900/40 px-7 py-3.5 active:scale-95 transition-all duration-200 tracking-wider"
                style={{ color: '#FFFFFF' }}
              >
                <span style={{ color: '#FFFFFF' }}>{language === 'en' ? "Discuss my project" : "Échanger sur mon projet"}</span>
              </Link>
              <a
                href="tel:0783666098"
                className="btn-glacier-outline-white rounded-none inline-flex items-center gap-2.5 px-7 py-3.5 text-sm active:scale-95 transition-all duration-200 group/phone shadow-md backdrop-blur-md"
                style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.45)', backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
              >
                <PhoneCall size={16} className="text-[#38BDF8] group-hover/phone:text-[#1A1A1A] group-hover/phone:rotate-12 transition-transform duration-200 shrink-0" aria-hidden="true" />
                <span style={{ color: '#FFFFFF' }} className="group-hover/phone:text-[#1A1A1A] font-bold">07 83 66 60 98</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

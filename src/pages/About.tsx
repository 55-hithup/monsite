import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { useLanguage } from '../i18n/LanguageContext';
import { pagesData } from '../i18n/pagesData';
import { MapPin, Mail, Sparkles, ArrowRight, ExternalLink, Database, PhoneCall } from 'lucide-react';

export default function About() {
  const { language } = useLanguage();
  const t = pagesData[language]?.about || pagesData.fr.about;

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
  const principlesGridRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const bannerCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. HERO ELEMENTS (Apparition rapide au chargement)
      if (heroEyebrowRef.current) {
        gsap.fromTo(
          heroEyebrowRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'transform,opacity' }
        );
      }

      if (heroTitleRef.current) {
        gsap.fromTo(
          heroTitleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.45, delay: 0.1, ease: 'power2.out', clearProps: 'transform,opacity' }
        );
      }

      if (heroDescRef.current) {
        gsap.fromTo(
          heroDescRef.current,
          { opacity: 0, y: 25, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, delay: 0.2, ease: 'power2.out', clearProps: 'transform,opacity' }
        );
      }

      // 2. STORY TEXT REVEAL
      if (storyTextRef.current) {
        gsap.fromTo(
          storyTextRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: storyTextRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. PRINCIPLES CARDS (Chaque carte animée individuellement au scroll)
      if (principlesGridRef.current) {
        const items = Array.from(principlesGridRef.current.children) as HTMLElement[];
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 20, filter: 'blur(3px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.35,
              ease: 'power2.out',
              clearProps: 'transform,opacity,filter',
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

      // 4. PROJECTS CARDS (Chaque projet animé individuellement au scroll)
      if (projectsGridRef.current) {
        const cards = Array.from(projectsGridRef.current.children) as HTMLElement[];
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 25, scale: 0.97, filter: 'blur(3px)' },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.38,
              ease: 'power2.out',
              clearProps: 'transform,opacity,filter',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // 5. SIDEBAR BLOCKS (Profil & Box Contact)
      if (sidebarRef.current) {
        const blocks = Array.from(sidebarRef.current.children) as HTMLElement[];
        blocks.forEach((block) => {
          gsap.fromTo(
            block,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: block,
                start: 'top 88%',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // 6. BOTTOM CONTACT BANNER (Rapide, percutant et réactif)
      if (bannerCardRef.current) {
        gsap.fromTo(
          bannerCardRef.current,
          { opacity: 0, scale: 0.96, y: 20, filter: 'blur(3px)' },
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

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={pageContainerRef} className="w-full bg-white text-[#4A4A4A] min-h-screen">
      
      {/* 1. HERO SECTION (Fond Parallaxe Fixe Signature & Card Glassy) */}
      <section className="services-parallax-section py-20 md:py-32 relative overflow-hidden border-b border-slate-800 text-left">
        <div 
          className="services-parallax-bg" 
          style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
        />
        <div className="services-parallax-tint" />

        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <div 
            ref={heroEyebrowRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-400/40 bg-sky-500/20 text-xs sm:text-sm font-bold font-['Montserrat'] text-sky-300 mb-6 shadow-sm"
          >
            <Sparkles size={16} className="text-sky-300" aria-hidden="true" />
            <span>{t.eyebrow}</span>
          </div>

          <h1 
            ref={heroTitleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-['Montserrat'] text-white mb-8 leading-[1.15] tracking-tight max-w-4xl whitespace-pre-line"
            style={{ color: '#FFFFFF' }}
          >
            {t.title}
          </h1>

          {/* Accroche forte mise en exergue avec bordure cyan et grande typographie lisible */}
          <div 
            ref={heroDescRef}
            className="p-6 md:p-8 rounded-none bg-slate-900/65 backdrop-blur-xl border border-white/20 border-l-4 border-l-sky-400 shadow-xl max-w-4xl"
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

      {/* 2. MAIN CONTENT SECTION (Histoire, Principes & Projets SaaS) */}
      <section className="py-16 md:py-24 bg-[#F8F8F8] border-b border-[#E5E5E5] text-left">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Colonne Principale (Histoire + Principes + Projets) */}
            <div className="md:col-span-2 space-y-10">
              
              {/* Récit fondateur avec typographie agrandie et aérée */}
              <div ref={storyTextRef} className="space-y-6 text-base sm:text-lg text-[#333333] leading-relaxed font-['Plus_Jakarta_Sans']">
                <p>{t.p2}</p>
                <p>{t.p3}</p>
              </div>

              {/* Principes Fondateurs */}
              <div className="pt-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-50 text-xs sm:text-sm font-bold font-['Montserrat'] text-[#0284C7] mb-4">
                  <span>VALEURS & ENGAGEMENTS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] mb-6 tracking-tight">
                  {t.principlesTitle}
                </h2>

                {/* Chaque carte de principe avec typographie confortable */}
                <div ref={principlesGridRef} className="space-y-4">
                  {t.principles.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-6 rounded-none bg-white border border-[#E5E5E5] hover:border-[#0284C7] hover:shadow-md transition-all duration-200 group"
                    >
                      <span className="text-[#0284C7] font-black font-['Montserrat'] text-lg sm:text-xl shrink-0 group-hover:scale-110 transition-transform duration-200">
                        {item.num}
                      </span>
                      <div>
                        <strong className="text-[#1A1A1A] font-bold block mb-1.5 font-['Montserrat'] text-base sm:text-lg group-hover:text-[#0284C7] transition-colors">
                          {item.title}
                        </strong>
                        <span className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed font-['Plus_Jakarta_Sans'] block">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projets nés du terrain & SaaS */}
              <div className="pt-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-50 text-xs sm:text-sm font-bold font-['Montserrat'] text-[#0284C7] mb-3">
                  <span>RÉALISATIONS TERRAIN</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] mb-3 tracking-tight">
                  {t.realWorldProjectsTitle}
                </h2>
                <p className="text-base sm:text-lg text-[#555555] font-['Plus_Jakarta_Sans'] leading-relaxed mb-8">
                  {t.realWorldProjectsDesc}
                </p>

                {/* Chaque carte projet avec typographie agrandie */}
                <div ref={projectsGridRef} className="space-y-8">
                  {t.projects?.map((project) => (
                    <div
                      key={project.id}
                      className="p-7 sm:p-9 rounded-none bg-white border border-[#E5E5E5] hover:border-[#0284C7] hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-3.5 py-1.5 rounded-none font-['Montserrat'] inline-flex items-center gap-1.5">
                          {project.id === 'locatool' ? <Database size={15} className="text-sky-600" aria-hidden="true" /> : <Sparkles size={15} className="text-sky-600" aria-hidden="true" />}
                          <span>{project.tag}</span>
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black font-['Montserrat'] text-[#1A1A1A] mb-4 tracking-tight">
                        {project.title}
                      </h3>

                      <div className="space-y-4 text-sm sm:text-base font-['Plus_Jakarta_Sans'] leading-relaxed mb-6">
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

                      <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-[#E5E5E5]">
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

            {/* Sidebar / Profile Card & Discuss Box (Typographie confortable) */}
            <div ref={sidebarRef} className="space-y-8">
              
              {/* Carte Profil Fondateur */}
              <div className="p-8 rounded-none bg-white border border-[#E5E5E5] shadow-sm text-center">
                <div className="w-24 h-24 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-black font-['Montserrat'] text-3xl mx-auto mb-4 border-2 border-[#0284C7] shadow-md">
                  AP
                </div>
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

                <div className="mt-6 pt-5 border-t border-[#E5E5E5] text-left">
                  <a href="mailto:contact@devsupai.fr" className="text-sm font-bold text-[#0284C7] hover:underline inline-flex items-center gap-2">
                    <Mail size={15} aria-hidden="true" />
                    <span>contact@devsupai.fr</span>
                  </a>
                </div>
              </div>
              
              {/* Box Contact Rapide */}
              <div className="p-8 rounded-none bg-slate-900 text-white border border-slate-800 space-y-4 shadow-md text-left">
                <h3 className="text-sm sm:text-base font-bold font-['Montserrat'] text-white uppercase tracking-wider" style={{ color: '#FFFFFF' }}>
                  {t.discussTitle}
                </h3>
                <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-['Plus_Jakarta_Sans']" style={{ color: '#FFFFFF' }}>
                  {t.discussText}
                </p>
                <div className="pt-2">
                  <Link 
                    to="/#contact" 
                    className="btn-glacier-solid rounded-none w-full text-center inline-flex items-center justify-center gap-2 text-sm font-bold bg-[#0284C7] text-white py-3.5 active:scale-95 transition-all shadow-sm"
                    style={{ color: '#FFFFFF' }}
                  >
                    <span style={{ color: '#FFFFFF' }}>{t.startProjectBtn}</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </div>

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

        <div className="container max-w-4xl mx-auto px-6 relative z-10">
          <div 
            ref={bannerCardRef}
            className="p-8 sm:p-14 rounded-none bg-slate-900/65 backdrop-blur-xl border border-white/25 text-white text-center space-y-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-all duration-300 hover:border-white/40 group"
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

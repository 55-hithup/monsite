import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';
import { useJsonLd } from '../../hooks/useJsonLd';
import { useLanguage } from '../../i18n/LanguageContext';
import { articlesData } from '../../i18n/articlesData';
import { Calendar, Clock, PhoneCall } from 'lucide-react';

export default function ArticleAssociationPme() {
  const { language } = useLanguage();
  const t = articlesData[language]?.articleAssociationPme || articlesData.fr.articleAssociationPme;

  useDocumentMetadata(
    {
      fr: "Créer un site web pour PME & Association | Guide Pratique DevSupAi",
      en: "Building a Website for SMEs & Non-Profits | Practical Guide DevSupAi",
    },
    {
      fr: "Découvrez les étapes indispensables pour concevoir un site internet performant, moderne et sans abonnement récurrent pour une PME ou une association loi 1901.",
      en: "Essential steps to create a high-performance, modern custom website without recurring platform subscriptions for SMEs and non-profit organizations.",
    },
    'https://www.devsupai.fr/hero-bg-mockup.webp'
  );

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": t.title,
    "description": t.intro,
    "image": "https://www.devsupai.fr/hero-bg-mockup.webp",
    "datePublished": "2026-08-10T10:00:00+02:00",
    "dateModified": "2026-08-14T00:00:00+02:00",
    "author": {
      "@type": "Person",
      "name": "Alexandre Pabst",
      "url": language === 'en' ? "https://www.devsupai.fr/en/about" : "https://www.devsupai.fr/a-propos",
    },
    "publisher": {
      "@type": "Organization",
      "name": "DevSupAi",
      "url": "https://www.devsupai.fr",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.devsupai.fr/logo.webp",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": language === 'en' ? "https://www.devsupai.fr/en/blog/site-web-pme-association" : "https://www.devsupai.fr/blog/site-web-pme-association",
    },
  };

  useJsonLd(schemaMarkup, `article-association-pme-schema-${language}`);

  const pageContainerRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const articleContentRef = useRef<HTMLDivElement>(null);
  const bannerCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (heroCardRef.current) {
        gsap.fromTo(
          heroCardRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity' }
        );
      }

      if (articleContentRef.current) {
        gsap.fromTo(
          articleContentRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: articleContentRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

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
      {/* 1. HERO SECTION (Fond Parallaxe Fixe & Intro Glassy) */}
      <section className="services-parallax-section py-20 md:py-28 relative overflow-hidden border-b border-slate-800 text-left">
        <div 
          className="services-parallax-bg" 
          style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
        />
        <div className="services-parallax-tint" />

        <div className="container max-w-4xl mx-auto px-6 relative z-10">
          <Link 
            to={language === 'en' ? '/en/blog' : '/blog'} 
            className="text-xs sm:text-sm font-bold font-['Montserrat'] text-sky-300 hover:text-white transition-colors inline-flex items-center gap-2 mb-6 tracking-wider uppercase"
          >
            <span>←</span> {t.backBtn}
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-slate-300 mb-6">
            <span className="inline-flex items-center gap-1.5"><Calendar size={15} className="text-sky-300" aria-hidden="true" /> {t.meta.date}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5"><Clock size={15} className="text-sky-300" aria-hidden="true" /> {t.meta.readTime}</span>
            <span>•</span>
            <span className="px-3 py-1 rounded-none bg-sky-500/20 text-sky-300 border border-sky-400/30 font-bold uppercase">{t.meta.tag}</span>
          </div>
          
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl font-black font-['Montserrat'] text-white mb-8 leading-tight tracking-tight max-w-4xl"
            style={{ color: '#FFFFFF' }}
          >
            {t.title}
          </h1>

          {/* Chapô / Intro en verre dépoli */}
          <div 
            ref={heroCardRef}
            className="p-6 md:p-8 rounded-none bg-slate-900/65 backdrop-blur-xl border border-white/20 border-l-4 border-l-sky-400 shadow-xl max-w-4xl"
          >
            <p 
              className="text-lg sm:text-xl text-white font-medium font-['Playfair_Display'] italic leading-relaxed"
              style={{ color: '#FFFFFF' }}
            >
              "{t.intro}"
            </p>
          </div>
        </div>
      </section>

      {/* 2. ARTICLE BODY (Grande typographie aérée, lisibilité maximale) */}
      <section className="py-16 md:py-24 bg-[#F8F8F8] border-b border-[#E5E5E5] text-left">
        <div className="container max-w-4xl mx-auto px-6">
          <div 
            ref={articleContentRef}
            className="p-8 sm:p-14 bg-white border border-[#E5E5E5] rounded-none shadow-sm space-y-8 text-[#333333] text-base sm:text-lg leading-relaxed font-['Plus_Jakarta_Sans']"
          >
            
            <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] pt-4 tracking-tight">
              {t.h2_1}
            </h2>
            <div className="p-5 sm:p-6 rounded-none bg-[#F0F9FF] border-l-4 border-[#0284C7] text-[#0369A1] text-base sm:text-lg font-medium shadow-xs">
              {t.highlight1}
            </div>
            <p className="text-[#444444] leading-relaxed">
              {t.p1}
            </p>

            <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] pt-6 tracking-tight">
              {t.h2_2}
            </h2>
            <div className="p-5 sm:p-6 rounded-none bg-[#F8FAFC] border-l-4 border-slate-700 text-slate-800 text-base sm:text-lg font-medium shadow-xs">
              {t.highlight2}
            </div>
            <p className="text-[#444444] leading-relaxed">
              {t.p2}
            </p>

            <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] pt-6 tracking-tight">
              {t.h2_3}
            </h2>
            <p className="text-[#444444] leading-relaxed">
              {t.p3}
            </p>

            <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] pt-6 tracking-tight">
              {t.h2_4}
            </h2>
            <ul className="space-y-4 pt-2">
              {t.bullets.map((b: string, idx: number) => (
                <li key={idx} className="flex gap-4 p-4 sm:p-5 rounded-none bg-[#F8FAFC] border border-[#E2E8F0] items-start">
                  <span className="text-[#0284C7] font-black text-lg shrink-0">•</span>
                  <span className="text-[#333333] text-base sm:text-lg leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
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

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { useLanguage } from '../i18n/LanguageContext';
import { articlesData } from '../i18n/articlesData';
import { Sparkles, ArrowRight, Calendar, Clock, PhoneCall } from 'lucide-react';

export default function Blog() {
  const { language } = useLanguage();
  const t = articlesData[language] || articlesData.fr;

  useDocumentMetadata(
    {
      fr: "Blog & Actualités Développement Web Sur-Mesure | DevSupAi",
      en: "Blog & Insights on Custom Web Development | DevSupAi",
    },
    {
      fr: "Conseils, guides techniques et bonnes pratiques sur le développement web sur-mesure, la performance, l'accessibilité et le référencement SEO pour PME et Associations.",
      en: "Actionable guides and technical best practices on custom web engineering, loading performance, accessibility, and SEO for SMEs and non-profits.",
    },
    'https://www.devsupai.fr/hero-bg-mockup.webp'
  );

  const pageContainerRef = useRef<HTMLDivElement>(null);
  const heroEyebrowRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const articlesGridRef = useRef<HTMLDivElement>(null);
  const bannerCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero
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

      // 2. Articles - Chaque carte animée individuellement au scroll
      if (articlesGridRef.current) {
        const cards = Array.from(articlesGridRef.current.children) as HTMLElement[];
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 25, scale: 0.97, filter: 'blur(3px)' },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.35,
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

      // 3. Bottom Contact Banner
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
      {/* 1. HERO SECTION (Fond Parallaxe Fixe) */}
      <section className="services-parallax-section py-20 md:py-28 relative overflow-hidden border-b border-slate-800 text-left">
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
            <span>{t.blogPage.eyebrow}</span>
          </div>

          <h1 
            ref={heroTitleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-['Montserrat'] text-white mb-6 leading-[1.15] tracking-tight max-w-4xl"
            style={{ color: '#FFFFFF' }}
          >
            {t.blogPage.title}
          </h1>

          <p 
            className="text-base sm:text-lg text-white max-w-2xl leading-relaxed font-normal"
            style={{ color: '#FFFFFF' }}
          >
            {language === 'en'
              ? "Engineering insights, modern web architectures, performance optimization, and practical digital strategy for growing businesses."
              : "Guides techniques, architecture web moderne, optimisation de la vitesse et conseils stratégiques pour propulser votre activité en ligne."}
          </p>
        </div>
      </section>

      {/* 2. CATALOGUE ARTICLES (Bords droits, grande typographie, animation individuelle) */}
      <section className="py-16 md:py-24 bg-[#F8F8F8] border-b border-[#E5E5E5] text-left">
        <div className="container max-w-5xl mx-auto px-6">
          <div ref={articlesGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.blogList.map((article) => (
              <Link 
                key={article.slug} 
                to={language === 'en' ? `/en/blog/${article.slug}` : `/blog/${article.slug}`}
                className="block p-8 sm:p-9 rounded-none bg-white border border-[#E5E5E5] hover:border-[#0284C7] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-slate-500 mb-5">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={15} className="text-[#0284C7]" aria-hidden="true" />
                      {article.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={15} className="text-[#0284C7]" aria-hidden="true" />
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-black font-['Montserrat'] text-[#1A1A1A] mb-4 group-hover:text-[#0284C7] transition-colors leading-snug">
                    {article.title}
                  </h2>
                  
                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed mb-8 font-['Plus_Jakarta_Sans']">
                    {article.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-5 border-t border-[#F1F5F9] mt-auto">
                  <span className="px-3.5 py-1.5 text-xs sm:text-sm font-bold font-['Montserrat'] rounded-none bg-[#F1F5F9] text-[#0284C7] border border-[#E2E8F0] tracking-wider uppercase">
                    {article.tag}
                  </span>
                  
                  <span className="text-sm font-bold font-['Montserrat'] text-[#1A1A1A] group-hover:text-[#0284C7] inline-flex items-center gap-2">
                    {t.blogPage.readArticle}
                    <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-200" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
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

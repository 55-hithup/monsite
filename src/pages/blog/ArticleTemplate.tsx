import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';
import { useJsonLd } from '../../hooks/useJsonLd';
import { useLanguage } from '../../i18n/LanguageContext';
import { Calendar, Clock, PhoneCall, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface ArticleSection {
  h2: string;
  intro?: string;
  highlight?: string;
  paragraphs?: string[];
  subsections?: {
    h3: string;
    paragraphs?: string[];
    bullets?: { bold: string; text: string }[];
  }[];
  bullets?: { bold: string; text: string }[];
  quote?: string;
}

export interface ArticleData {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  intro: string;
  sections: ArticleSection[];
  keyTakeaway?: string;
  relatedLinks?: {
    title: string;
    href: string;
    description: string;
  }[];
}

interface ArticleTemplateProps {
  data: {
    fr: ArticleData;
    en: ArticleData;
  };
  metaDescriptions: {
    fr: string;
    en: string;
  };
  publishDate: string;
  modifiedDate: string;
}

export default function ArticleTemplate({
  data,
  metaDescriptions,
  publishDate,
  modifiedDate,
}: ArticleTemplateProps) {
  const { language, isEn } = useLanguage();
  const article = isEn ? data.en : data.fr;

  useDocumentMetadata(
    {
      fr: `${data.fr.title} | Blog DevSupAi`,
      en: `${data.en.title} | DevSupAi Blog`,
    },
    metaDescriptions,
    'https://www.devsupai.fr/hero-bg-mockup.webp'
  );

  const canonicalUrl = `https://www.devsupai.fr${isEn ? `/en/blog/${article.slug}` : `/blog/${article.slug}`}`;

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.intro,
    "image": "https://www.devsupai.fr/hero-bg-mockup.webp",
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": "Person",
      "name": "Alexandre Pabst",
      "url": isEn ? "https://www.devsupai.fr/en/about" : "https://www.devsupai.fr/a-propos",
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
      "@id": canonicalUrl,
    },
  };

  useJsonLd(schemaMarkup, `blog-article-schema-${article.slug}-${language}`);

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
              end: 'bottom top',
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
            to={isEn ? '/en/blog' : '/blog'} 
            className="text-xs sm:text-sm font-bold font-['Montserrat'] text-sky-300 hover:text-white transition-colors inline-flex items-center gap-2 mb-6 tracking-wider uppercase"
          >
            <span>←</span> {isEn ? "Back to blog" : "Retour au blog"}
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-slate-300 mb-6">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={15} className="text-sky-300" aria-hidden="true" /> {article.date}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} className="text-sky-300" aria-hidden="true" /> {article.readTime}
            </span>
            <span>•</span>
            <span className="px-3 py-1 rounded-none bg-sky-500/20 text-sky-300 border border-sky-400/30 font-bold uppercase tracking-wider font-['Montserrat']">
              {article.category}
            </span>
          </div>
          
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl font-black font-['Montserrat'] text-white mb-8 leading-tight tracking-tight max-w-4xl"
            style={{ color: '#FFFFFF' }}
          >
            {article.title}
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
              "{article.intro}"
            </p>
          </div>
        </div>
      </section>

      {/* 2. ARTICLE BODY */}
      <section className="py-16 md:py-24 bg-[#F8F8F8] border-b border-[#E5E5E5] text-left">
        <div className="container max-w-4xl mx-auto px-6">
          <div 
            ref={articleContentRef}
            className="p-8 sm:p-14 bg-white border border-[#E5E5E5] rounded-none shadow-sm space-y-8 text-[#333333] text-base sm:text-lg leading-relaxed font-['Plus_Jakarta_Sans']"
          >
            {/* Key Takeaway Box (if present) */}
            {article.keyTakeaway && (
              <div className="p-6 rounded-none bg-[#F0F9FF] border-l-4 border-[#0284C7] mb-8">
                <span className="text-xs font-bold font-['Montserrat'] uppercase tracking-wider text-[#0284C7] block mb-2">
                  {isEn ? "CORE TAKEAWAY" : "LE POINT CLÉ À RETENIR"}
                </span>
                <p className="text-base sm:text-lg font-semibold text-[#0369A1] leading-relaxed">
                  {article.keyTakeaway}
                </p>
              </div>
            )}

            {/* Render Each Section */}
            {article.sections.map((section, idx) => (
              <div key={idx} className="space-y-6 pt-4 first:pt-0">
                <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] tracking-tight border-b border-[#F1F5F9] pb-3">
                  {section.h2}
                </h2>

                {section.highlight && (
                  <div className="p-5 sm:p-6 rounded-none bg-[#F0F9FF] border-l-4 border-[#0284C7] text-[#0369A1] text-base sm:text-lg font-medium shadow-xs">
                    {section.highlight}
                  </div>
                )}

                {section.intro && (
                  <p className="text-[#444444] leading-relaxed">
                    {section.intro}
                  </p>
                )}

                {section.paragraphs?.map((p, pIdx) => (
                  <p key={pIdx} className="text-[#444444] leading-relaxed">
                    {p}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="space-y-4 pt-2">
                    {section.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex gap-4 p-4 sm:p-5 rounded-none bg-[#F8FAFC] border border-[#E2E8F0] items-start">
                        <span className="text-[#0284C7] font-black text-lg shrink-0">•</span>
                        <div>
                          <strong className="text-[#1A1A1A] font-bold block mb-1">{b.bold}</strong>
                          <span className="text-[#444444] leading-relaxed">{b.text}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {section.subsections?.map((sub, sIdx) => (
                  <div key={sIdx} className="space-y-4 pt-4">
                    <h3 className="text-xl sm:text-2xl font-bold font-['Montserrat'] text-[#1A1A1A] tracking-tight">
                      {sub.h3}
                    </h3>
                    {sub.paragraphs?.map((sp, spIdx) => (
                      <p key={spIdx} className="text-[#444444] leading-relaxed">
                        {sp}
                      </p>
                    ))}
                    {sub.bullets && (
                      <ul className="space-y-3 pt-1">
                        {sub.bullets.map((sb, sbIdx) => (
                          <li key={sbIdx} className="flex items-start gap-3 text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                            <CheckCircle2 size={16} className="text-[#0284C7] shrink-0 mt-1" aria-hidden="true" />
                            <div>
                              {sb.bold && <strong className="text-[#1A1A1A] font-bold mr-1.5">{sb.bold}</strong>}
                              <span>{sb.text}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {section.quote && (
                  <blockquote className="p-6 rounded-none bg-[#F8FAFC] border-l-4 border-[#1A1A1A] italic text-base sm:text-lg text-[#1A1A1A] font-medium font-['Playfair_Display'] my-6">
                    {section.quote}
                  </blockquote>
                )}
              </div>
            ))}

            {/* Related Internal Links / Maillage Interne */}
            {article.relatedLinks && article.relatedLinks.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[#E5E5E5]">
                <h3 className="text-lg font-bold font-['Montserrat'] text-[#1A1A1A] uppercase tracking-wider mb-4">
                  {isEn ? "Recommended Resources & Related Packages" : "Pour aller plus loin : forfaits et guides recommandés"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {article.relatedLinks.map((link, lIdx) => (
                    <Link
                      key={lIdx}
                      to={link.href}
                      className="p-5 rounded-none bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0284C7] transition-all group block"
                    >
                      <span className="text-sm font-bold font-['Montserrat'] text-[#1A1A1A] group-hover:text-[#0284C7] transition-colors flex items-center justify-between">
                        {link.title}
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </span>
                      {link.description && (
                        <span className="text-xs text-[#666666] mt-2 block leading-relaxed">
                          {link.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio Card */}
            <div className="mt-12 pt-8 border-t border-[#E5E5E5]">
              <div className="p-6 rounded-none bg-[#F8F8F8] border border-[#E5E5E5] flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
                  <img 
                    src="/alexandre-pabst.webp" 
                    alt="Alexandre Pabst" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="56"
                    height="56"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-[#0284C7] uppercase font-['Montserrat'] block mb-1">
                    {isEn ? "WRITTEN BY" : "RÉDIGÉ PAR"}
                  </span>
                  <p className="text-base font-bold font-['Montserrat'] text-[#1A1A1A] mb-1">
                    Alexandre Pabst
                  </p>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {isEn 
                      ? "Independent Web Developer & Founder of DevSupAi in Saint-Mihiel (Meuse, France). Handcrafting high-performance custom web apps and websites with zero CMS bloat."
                      : "Développeur web indépendant et fondateur de DevSupAi à Saint-Mihiel (Meuse). Spécialiste du code sur-mesure haute performance sans CMS pour PME et artisans."}
                  </p>
                </div>
                <Link
                  to={isEn ? "/en/about" : "/a-propos"}
                  className="btn-glacier-outline py-2 px-4 text-xs font-bold font-['Montserrat'] shrink-0 rounded-none border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all"
                >
                  {isEn ? "About author" : "En savoir plus"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BOTTOM CONTACT BANNER */}
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
              {isEn ? "Have a project in mind?" : "Vous avez un projet en tête ?"}
            </h2>
            <p 
              className="text-base sm:text-lg text-white max-w-2xl mx-auto leading-relaxed font-normal"
              style={{ color: '#FFFFFF' }}
            >
              {isEn 
                ? "Get a free technical feasibility study and a personalized quote within 24 hours." 
                : "Obtenez une étude de faisabilité technique gratuite et un devis personnalisé sous 24 heures."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/#contact"
                className="btn-glacier-solid rounded-none bg-[#0284C7] hover:bg-sky-400 text-white text-sm font-bold border border-sky-300/40 shadow-lg shadow-sky-900/40 px-7 py-3.5 active:scale-95 transition-all duration-200 tracking-wider"
                style={{ color: '#FFFFFF' }}
              >
                <span style={{ color: '#FFFFFF' }}>{isEn ? "Discuss my project" : "Échanger sur mon projet"}</span>
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

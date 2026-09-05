import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';
import { useJsonLd } from '../../hooks/useJsonLd';
import { useLanguage } from '../../i18n/LanguageContext';
import { blogPlanData, type PlannedArticle } from '../../i18n/blogPlanData';

interface ArticleTemplatePlaceholderProps {
  articleSlug: string;
}

export default function ArticleTemplatePlaceholder({ articleSlug }: ArticleTemplatePlaceholderProps) {
  const { language, isEn } = useLanguage();
  const langKey = language === 'en' ? 'en' : 'fr';

  const article: PlannedArticle = 
    blogPlanData[langKey]?.[articleSlug] || blogPlanData.fr[articleSlug];

  const frArticle = blogPlanData.fr[articleSlug] || article;
  const enArticle = blogPlanData.en[articleSlug] || article;

  useDocumentMetadata(
    {
      fr: `${frArticle.title} | Blog DevSupAi`,
      en: `${enArticle.title} | DevSupAi Blog`,
    },
    {
      fr: frArticle.description,
      en: enArticle.description,
    },
    'https://www.devsupai.fr/hero-bg-mockup.webp'
  );

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.description,
    "image": "https://www.devsupai.fr/hero-bg-mockup.webp",
    "datePublished": `${article.date}T08:00:00+02:00`,
    "dateModified": `${article.date}T08:00:00+02:00`,
    "author": {
      "@type": "Person",
      "name": "Alexandre Pabst",
      "url": isEn ? "https://www.devsupai.fr/en/about" : "https://www.devsupai.fr/a-propos"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DevSupAi",
      "url": "https://www.devsupai.fr",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.devsupai.fr/logo.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.devsupai.fr/${article.slug}`
    }
  };

  useJsonLd(schemaMarkup, `blog-posting-schema-${articleSlug}-${langKey}`);

  return (
    <article className="w-full bg-[#FFFFFF] text-[#4A4A4A] min-h-screen py-16 md:py-24">
      <div className="container max-w-4xl mx-auto px-6 text-left">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link 
            to={isEn ? "/en/blog" : "/blog"}
            className="text-xs font-bold font-['Montserrat'] text-[#0284C7] hover:text-[#1A1A1A] transition-colors inline-flex items-center gap-1.5"
          >
            <span>←</span> {isEn ? "Back to blog articles" : "Retour aux articles du blog"}
          </Link>
        </nav>

        {/* Article Meta Bar */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#666666] mb-4">
            <span className="px-3 py-1 rounded-full bg-sky-50 text-[#0284C7] border border-sky-200 font-bold font-['Montserrat']">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={13} aria-hidden="true" />
              <time dateTime={article.date}>{article.date}</time>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={13} aria-hidden="true" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Montserrat'] text-[#1A1A1A] leading-tight tracking-tight mb-6">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#555555] font-['Plus_Jakarta_Sans'] leading-relaxed border-l-4 border-[#0284C7] pl-4 py-1">
            {article.description}
          </p>
        </header>

        {/* Status / Publication Note */}
        <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900 mb-10 flex items-start gap-3">
          <Sparkles size={16} className="text-[#0284C7] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong className="font-bold block mb-0.5">
              {isEn ? "Editorial Blueprint & Planned Cluster" : "Plan éditorial & Synthèse stratégique"}
            </strong>
            <span>
              {isEn 
                ? "This article structure directly addresses search engine intent clusters. Full in-depth editorial guide in active production."
                : "Cet article répond spécifiquement aux intentions de recherche du cluster. Le développement rédactionnel complet est en cours de validation finale."}
            </span>
          </div>
        </div>

        {/* Key Takeaway Box */}
        <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-12">
          <h2 className="text-xs font-bold font-['Montserrat'] uppercase tracking-wider text-[#0284C7] mb-2">
            {isEn ? "CORE TAKEAWAY" : "LE POINT CLÉ À RETENIR"}
          </h2>
          <p className="text-sm sm:text-base font-semibold text-[#1A1A1A] leading-relaxed">
            {article.keyTakeaway}
          </p>
        </div>

        {/* Article Outline Sections */}
        <div className="space-y-10 mb-16">
          {article.outline.map((section, idx) => (
            <section key={idx} className="border-b border-[#E5E5E5] pb-8">
              <h2 className="text-xl sm:text-2xl font-bold font-['Montserrat'] text-[#1A1A1A] mb-4 leading-snug">
                {section.heading}
              </h2>
              <ul className="space-y-3">
                {section.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3 text-sm text-[#4A4A4A] leading-relaxed">
                    <CheckCircle2 size={16} className="text-[#0284C7] shrink-0 mt-1" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Author Card */}
        <footer className="pt-8 border-t border-[#E5E5E5]">
          <div className="p-6 rounded-xl bg-[#F8F8F8] border border-[#E5E5E5] flex flex-col sm:flex-row items-start sm:items-center gap-5">
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
              <span className="text-xs font-bold text-[#0284C7] uppercase font-['Montserrat'] block">
                {isEn ? "WRITTEN BY" : "RÉDIGÉ PAR"}
              </span>
              <h3 className="text-base font-bold font-['Montserrat'] text-[#1A1A1A] mb-1">
                Alexandre Pabst
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                {isEn 
                  ? "Independent Web Developer & Founder of DevSupAi. Crafting bespoke, ultra-fast web solutions for SMEs and craftsmen in Meuse and worldwide."
                  : "Développeur web indépendant et fondateur de DevSupAi à Saint-Mihiel (Meuse). Spécialiste du code sur-mesure haute performance sans CMS pour PME et artisans."}
              </p>
            </div>
            <Link
              to={isEn ? "/en/about" : "/a-propos"}
              className="btn-glacier-outline py-2 px-4 text-xs font-bold font-['Montserrat'] shrink-0"
            >
              {isEn ? "About author" : "En savoir plus"}
            </Link>
          </div>

          {/* Bottom CTA to Contact */}
          <div className="mt-10 p-8 rounded-xl bg-slate-900 text-white text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-black font-['Montserrat'] text-white">
              {isEn ? "Need custom guidance for your web project?" : "Un projet de site internet ou d'application sur-mesure ?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              {isEn 
                ? "Get in touch with Alexandre Pabst for transparent pricing and direct technical advice within 24 business hours."
                : "Échangez directement avec Alexandre Pabst pour une étude de faisabilité gratuite et sans aucun engagement."}
            </p>
            <div className="pt-2">
              <Link
                to="/#contact"
                className="btn-glacier-solid rounded-none bg-[#0284C7] hover:bg-sky-400 text-white font-bold py-3 px-6 text-xs inline-flex items-center gap-2 shadow-md transition-all active:scale-95"
                style={{ color: '#FFFFFF' }}
              >
                <span style={{ color: '#FFFFFF' }}>{isEn ? "Get a free quote" : "Demander un devis gratuit"}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}

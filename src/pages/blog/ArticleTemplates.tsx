import SectionReveal from '../../components/SectionReveal';
import { Link } from 'react-router-dom';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';
import { useJsonLd } from '../../hooks/useJsonLd';
import { useLanguage } from '../../i18n/LanguageContext';
import { articlesData } from '../../i18n/articlesData';

export default function ArticleTemplates() {
  const { language } = useLanguage();
  const t = articlesData[language]?.articleTemplates || articlesData.fr.articleTemplates;

  useDocumentMetadata(
    {
      fr: "Pourquoi éviter les templates en 2026 ? | Le sur-mesure pour PME & Asso | DevSupAi",
      en: "Why Avoid Pre-Made Templates in 2026? | DevSupAi",
    },
    {
      fr: "Les thèmes pré-conçus pénalisent votre vitesse de chargement et nuisent à votre référencement naturel. Découvrez pourquoi le développement sur-mesure est devenu incontournable.",
      en: "Generic templates hurt your loading speed and hinder your Google rankings. Discover why custom development has become essential for business growth.",
    },
    'https://www.devsupai.fr/hero-bg-mockup.webp'
  );

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": t.title,
    "description": t.intro,
    "image": "https://www.devsupai.fr/hero-bg-mockup.webp",
    "datePublished": "2026-08-04T08:00:00+02:00",
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
      "@id": language === 'en' ? "https://www.devsupai.fr/en/blog/pourquoi-eviter-les-templates" : "https://www.devsupai.fr/blog/pourquoi-eviter-les-templates",
    },
  };

  useJsonLd(schemaMarkup, `article-templates-schema-${language}`);

  return (
    <div className="w-full bg-white text-[#4A4A4A] min-h-screen py-16 md:py-24">
      <SectionReveal className="text-left">
        <div className="container max-w-3xl mx-auto px-6">
          <Link 
            to={language === 'en' ? '/en/blog' : '/blog'} 
            className="text-xs font-bold font-['Montserrat'] text-[#0284C7] hover:text-[#1A1A1A] transition-colors inline-flex items-center gap-1.5 mb-8"
          >
            <span>←</span> {t.backBtn}
          </Link>
          
          <div className="flex items-center gap-3 text-xs font-semibold text-[#888888] mb-4">
            <span>{t.meta.date}</span>
            <span>•</span>
            <span>{t.meta.readTime}</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#0284C7] font-bold">{t.meta.tag}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black font-['Montserrat'] text-[#1A1A1A] mb-8 leading-tight">
            {t.title}
          </h1>
          
          <div className="prose text-[#555555] leading-relaxed space-y-6 text-base font-['Plus_Jakarta_Sans']">
            <p className="text-lg text-[#1A1A1A] font-medium font-['Playfair_Display'] italic leading-relaxed border-l-2 border-[#0284C7] pl-4">
              {t.intro}
            </p>
            
            <h2 className="text-xl font-bold font-['Montserrat'] text-[#1A1A1A] pt-4">{t.h2_1}</h2>
            <p className="p-4 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-[#0369A1] text-sm font-medium">
              {t.highlight1}
            </p>
            <p>
              {t.p1}
            </p>

            <h2 className="text-xl font-bold font-['Montserrat'] text-[#1A1A1A] pt-4">{t.h2_2}</h2>
            <p>
              {t.p2}
            </p>

            <h2 className="text-xl font-bold font-['Montserrat'] text-[#1A1A1A] pt-4">{t.h2_3}</h2>
            <p>
              {t.p3}
            </p>

            <blockquote className="border-l-2 border-[#0284C7] pl-4 italic text-[#1A1A1A] py-2 bg-[#F8FAFC] rounded-r text-base font-['Playfair_Display']">
              {t.quote}
            </blockquote>

            <h2 className="text-xl font-bold font-['Montserrat'] text-[#1A1A1A] pt-4">{t.h2_4}</h2>
            <p>
              {t.p4}
            </p>
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}

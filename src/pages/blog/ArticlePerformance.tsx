import SectionReveal from '../../components/SectionReveal';
import { Link } from 'react-router-dom';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';
import { useJsonLd } from '../../hooks/useJsonLd';
import { useLanguage } from '../../i18n/LanguageContext';
import { articlesData } from '../../i18n/articlesData';

export default function ArticlePerformance() {
  const { language } = useLanguage();
  const t = articlesData[language]?.articlePerformance || articlesData.fr.articlePerformance;

  useDocumentMetadata(
    {
      fr: "Vitesse de chargement & Taux de conversion | Guide DevSupAi",
      en: "Page Speed & Conversion Rates | Technical Guide DevSupAi",
    },
    {
      fr: "Chaque milliseconde compte pour votre chiffre d'affaires. Découvrez comment les performances web d'élite augmentent drastiquement vos ventes.",
      en: "Every millisecond of latency counts for business revenue. Learn how elite web performance directly increases sales and lowers acquisition costs.",
    },
    "/blog/performance-web-sur-mesure"
  );

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": t.title,
    "description": t.intro,
    "image": "https://www.devsupai.fr/hero-bg-mockup.webp",
    "datePublished": "2026-08-02T09:00:00+02:00",
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
      "@id": language === 'en' ? "https://www.devsupai.fr/en/blog/performance-web-sur-mesure" : "https://www.devsupai.fr/blog/performance-web-sur-mesure",
    },
  };

  useJsonLd(schemaMarkup, `article-performance-schema-${language}`);

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
            <p>
              {t.p1_bis}
            </p>

            <h2 className="text-xl font-bold font-['Montserrat'] text-[#1A1A1A] pt-4">{t.h2_2}</h2>
            <ul className="space-y-3 pt-2">
              {t.bullets.map((b, idx) => (
                <li key={idx} className="flex gap-3 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#0284C7] font-bold">•</span>
                  <div>
                    <strong className="text-[#1A1A1A] font-bold">{b.bold} </strong>
                    <span className="text-[#555555]">{b.text}</span>
                  </div>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold font-['Montserrat'] text-[#1A1A1A] pt-4">{t.h2_3}</h2>
            <p>
              {t.p3}
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#555555]">
              {t.steps.map((st: string, idx: number) => (
                <li key={idx}>{st}</li>
              ))}
            </ul>

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

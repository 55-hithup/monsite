import SectionReveal from '../../components/SectionReveal';
import { Link } from 'react-router-dom';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';
import { useJsonLd } from '../../hooks/useJsonLd';
import { useLanguage } from '../../i18n/LanguageContext';
import { articlesData } from '../../i18n/articlesData';

export default function ArticleAssociationPme() {
  const { language } = useLanguage();
  const t = articlesData[language]?.articleAssociationPme || articlesData.fr.articleAssociationPme;

  useDocumentMetadata(
    {
      fr: "Créer un site web pour PME & Association | Guide Pratique DevSupAi",
      en: "Building a Website for SMEs & Non-Profits | Practical Guide DevSupAi",
    },
    {
      fr: "Découvrez les étapes indispensables pour créer un site internet performant, moderne et sans abonnement récurrent pour une PME ou une association.",
      en: "Essential steps to create a high-performance, modern custom website without recurring platform subscriptions for SMEs and non-profit organizations.",
    },
    "/blog/site-web-pme-association"
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

  return (
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <div className="wrap max-w-2xl">
        <Link to={language === 'en' ? '/en/blog' : '/blog'} className="text-xs label-mono text-accent hover:text-text-primary transition-colors inline-flex items-center gap-1.5 mb-8">
          <span>←</span> {t.backBtn}
        </Link>
        
        <div className="flex items-center gap-3 text-xs label-mono text-purple-300 mb-4">
          <span>{t.meta.date}</span>
          <span>•</span>
          <span>{t.meta.readTime}</span>
          <span>•</span>
          <span>{t.meta.tag}</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-8 leading-tight">
          {t.title}
        </h1>
        
        <div className="prose text-text-secondary leading-relaxed space-y-6 text-sm">
          <p className="text-base text-text-primary font-medium">
            {t.intro}
          </p>
          
          <h2 className="text-lg font-bold text-text-primary pt-4">{t.h2_1}</h2>
          <p className="p-3 rounded-lg bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-text-primary text-xs font-medium">
            {t.highlight1}
          </p>
          <p>
            {t.p1}
          </p>

          <h2 className="text-lg font-bold text-text-primary pt-4">{t.h2_2}</h2>
          <p className="p-3 rounded-lg bg-[#6B4FE0]/10 border border-[#6B4FE0]/20 text-text-primary text-xs font-medium">
            {t.highlight2}
          </p>
          <p>
            {t.p2}
          </p>

          <h2 className="text-lg font-bold text-text-primary pt-4">{t.h2_3}</h2>
          <p>
            {t.p3}
          </p>

          <h2 className="text-lg font-bold text-text-primary pt-4">{t.h2_4}</h2>
          <ul className="list-disc pl-5 space-y-1 text-text-secondary">
            {t.bullets.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </SectionReveal>
  );
}

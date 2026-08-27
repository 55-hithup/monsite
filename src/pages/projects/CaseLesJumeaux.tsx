import SectionReveal from '../../components/SectionReveal';
import { Link } from 'react-router-dom';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';
import { useJsonLd } from '../../hooks/useJsonLd';
import { useLanguage } from '../../i18n/LanguageContext';
import { caseStudiesData } from '../../i18n/caseStudiesData';

export default function CaseLesJumeaux() {
  const { language } = useLanguage();
  const t = caseStudiesData[language]?.lesJumeaux || caseStudiesData.fr.lesJumeaux;
  const common = caseStudiesData[language] || caseStudiesData.fr;

  useDocumentMetadata(
    {
      fr: "Étude de cas : Restaurant Les Jumeaux — Site & Réservation | DevSupAi",
      en: "Case Study: Restaurant Les Jumeaux — Showcase & Online Booking | DevSupAi",
    },
    {
      fr: "Découvrez comment DevSupAi a conçu le site vitrine et le module de réservation en ligne sur-mesure pour le restaurant Les Jumeaux sans abonnement tiers.",
      en: "Learn how DevSupAi engineered the custom showcase website and direct online booking engine for restaurant Les Jumeaux with zero third-party subscription fees.",
    },
    "/projets/les-jumeaux"
  );

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t.title,
    "description": t.desc,
    "image": "https://www.devsupai.fr/les-jumeaux.webp",
    "datePublished": "2026-08-14T00:00:00+02:00",
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
      "@id": language === 'en' ? "https://www.devsupai.fr/en/projects/les-jumeaux" : "https://www.devsupai.fr/projets/les-jumeaux",
    },
  };

  useJsonLd(schemaMarkup, `case-jumeaux-schema-${language}`);

  return (
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <div className="wrap max-w-4xl">
        <Link to={language === 'en' ? '/en#projets' : '/#projets'} className="text-xs label-mono text-accent hover:text-text-primary transition-colors inline-flex items-center gap-1.5 mb-8">
          <span>←</span> {common.backBtn}
        </Link>

        {/* Header Details */}
        <div className="flex flex-wrap items-center gap-3 text-xs label-mono text-purple-300 mb-4">
          <span>{t.meta.type}</span>
          <span>•</span>
          <span>{t.meta.sector}</span>
          <span>•</span>
          <span className="text-accent">{t.meta.feature}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary mb-6 leading-tight">
          {t.title}
        </h1>

        <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-2xl">
          {t.desc}
        </p>

        {/* Hero Visual Mockup */}
        <div className="rounded-2xl overflow-hidden border border-[rgba(245,246,250,0.08)] mb-12 shadow-2xl bg-[#121729]">
          <img 
            src="/les-jumeaux.webp" 
            alt="Interface du site web et réservation du Restaurant Les Jumeaux" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Key Metrics / Context */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] mb-12">
          <div>
            <div className="text-xs label-mono text-text-secondary">{t.facts.sectorLabel}</div>
            <div className="text-sm font-bold text-text-primary mt-1">{t.facts.sectorVal}</div>
          </div>
          <div>
            <div className="text-xs label-mono text-text-secondary">{t.facts.deliverablesLabel}</div>
            <div className="text-sm font-bold text-text-primary mt-1">{t.facts.deliverablesVal}</div>
          </div>
          <div>
            <div className="text-xs label-mono text-text-secondary">{t.facts.speedLabel}</div>
            <div className="text-sm font-bold text-text-primary mt-1">{t.facts.speedVal}</div>
          </div>
          <div>
            <div className="text-xs label-mono text-text-secondary">{t.facts.resultLabel}</div>
            <div className="text-sm font-bold text-text-primary mt-1">{t.facts.resultVal}</div>
          </div>
        </div>

        {/* Case Narrative Content */}
        <div className="prose text-text-secondary leading-relaxed space-y-8 text-sm max-w-none">
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              {t.q1}
            </h2>
            <p>
              {t.a1}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              {t.q2}
            </h2>
            <p>
              {t.a2}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              {t.q3}
            </h2>
            <p className="p-4 rounded-xl bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-text-primary text-sm font-medium mb-3">
              {t.highlight3}
            </p>
            <p>
              {t.a3}
            </p>
          </section>
        </div>

        {/* Back Link bottom */}
        <div className="mt-14 pt-8 border-t border-[rgba(245,246,250,0.06)]">
          <Link to={language === 'en' ? '/en#projets' : '/#projets'} className="btn btn-ghost text-xs label-mono">
            {common.backBtnBottom}
          </Link>
        </div>
      </div>
    </SectionReveal>
  );
}

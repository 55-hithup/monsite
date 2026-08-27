import SectionReveal from '../../components/SectionReveal';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';
import { useJsonLd } from '../../hooks/useJsonLd';
import { useLanguage } from '../../i18n/LanguageContext';
import { caseStudiesData } from '../../i18n/caseStudiesData';

export default function CaseAbogame() {
  const { language } = useLanguage();
  const t = caseStudiesData[language]?.abogame || caseStudiesData.fr.abogame;
  const common = caseStudiesData[language] || caseStudiesData.fr;

  useDocumentMetadata(
    {
      fr: "Étude de cas : Abogame — Plateforme Mobile-First Live & Tirage | DevSupAi",
      en: "Case Study: Abogame — Mobile-First Live & Giveaway Web App | DevSupAi",
    },
    {
      fr: "Découvrez la conception de la web app mobile-first Abogame : animations interactives en temps réel, roue de tirage au sort et synchronisation live.",
      en: "Explore the development of the mobile-first Abogame platform: real-time audience engagement, animated spinning wheel, and live synchronization.",
    },
    "/projets/abogame"
  );

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t.title,
    "description": t.desc,
    "image": "https://www.devsupai.fr/abogame.webp",
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
      "@id": language === 'en' ? "https://www.devsupai.fr/en/projects/abogame" : "https://www.devsupai.fr/projets/abogame",
    },
  };

  useJsonLd(schemaMarkup, `case-abogame-schema-${language}`);

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

        {/* Live CTA button */}
        <div className="mb-8">
          <a
            href="https://abogame.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-xs label-mono inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#0B122C', fontWeight: 700 }}
          >
            <span>{t.ctaLive}</span>
            <ExternalLink size={14} />
          </a>
          <span className="ml-3 text-xs text-emerald-400 font-mono">{t.liveBadge}</span>
        </div>

        {/* Hero Visual Mockup */}
        <div className="rounded-2xl overflow-hidden border border-[rgba(245,246,250,0.08)] mb-12 shadow-2xl bg-[#121729]">
          <img 
            src="/abogame.webp" 
            alt="Interface de l'application mobile-first Abogame" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Key Metrics / Context */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] mb-12">
          <div>
            <div className="text-xs label-mono text-text-secondary">{t.facts.usageLabel}</div>
            <div className="text-sm font-bold text-text-primary mt-1">{t.facts.usageVal}</div>
          </div>
          <div>
            <div className="text-xs label-mono text-text-secondary">{t.facts.designLabel}</div>
            <div className="text-sm font-bold text-text-primary mt-1">{t.facts.designVal}</div>
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

        {/* Live CTA Box */}
        <div className="mt-12 p-6 rounded-2xl bg-[#121729]/80 border border-[#2E8FE0]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-text-primary mb-1">{t.bannerTitle}</h3>
            <p className="text-xs text-text-secondary">{t.bannerDesc}</p>
          </div>
          <a
            href="https://abogame.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-xs label-mono shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#0B122C', fontWeight: 700 }}
          >
            <span>{t.bannerBtn}</span>
            <ExternalLink size={14} />
          </a>
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

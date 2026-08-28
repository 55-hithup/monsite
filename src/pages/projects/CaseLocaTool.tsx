import SectionReveal from '../../components/SectionReveal';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';
import { useJsonLd } from '../../hooks/useJsonLd';
import { useLanguage } from '../../i18n/LanguageContext';
import { caseStudiesData } from '../../i18n/caseStudiesData';

export default function CaseLocaTool() {
  const { language } = useLanguage();
  const t = caseStudiesData[language]?.locatool || caseStudiesData.fr.locatool;
  const common = caseStudiesData[language] || caseStudiesData.fr;

  useDocumentMetadata(
    {
      fr: "Étude de cas : LocaTool — Logiciel SaaS de Gestion de Parc Matériel | DevSupAi",
      en: "Case Study: LocaTool — Equipment Fleet Management SaaS Web App | DevSupAi",
    },
    {
      fr: "Découvrez le développement sur-mesure de l'application SaaS LocaTool : centralisation de flotte d'équipements, réservations temps réel et facturation.",
      en: "Discover the custom SaaS development of LocaTool: equipment fleet centralization, real-time booking, and automated contract invoicing.",
    },
    "/projets/locatool"
  );

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t.title,
    "description": t.desc,
    "image": "https://www.devsupai.fr/locatool.webp",
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
      "@id": language === 'en' ? "https://www.devsupai.fr/en/projects/locatool" : "https://www.devsupai.fr/projets/locatool",
    },
  };

  useJsonLd(schemaMarkup, `case-locatool-schema-${language}`);

  return (
    <div className="w-full bg-[#FFFFFF] text-[#4A4A4A] min-h-screen py-16 md:py-24">
      <SectionReveal className="text-left">
        <div className="container max-w-4xl mx-auto px-6">
          
          {/* Breadcrumb */}
          <Link 
            to="/#realisations" 
            className="text-xs font-bold font-['Montserrat'] text-[#0284C7] hover:text-[#1A1A1A] transition-colors inline-flex items-center gap-1.5 mb-8"
          >
            <span>←</span> {common.backBtn}
          </Link>

          {/* Header Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0284C7]/30 bg-[#0284C7]/10 text-xs font-bold font-['Montserrat'] text-[#0284C7] mb-4">
            <span>{t.meta.type}</span>
            <span>•</span>
            <span>{t.meta.sector}</span>
            <span>•</span>
            <span>{t.meta.feature}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Montserrat'] text-[#1A1A1A] mb-6 leading-tight tracking-tight">
            {t.title}
          </h1>

          <p className="text-base sm:text-lg text-[#555555] leading-relaxed mb-8 max-w-2xl font-['Plus_Jakarta_Sans']">
            {t.desc}
          </p>

          {/* Live CTA button */}
          <div className="mb-10 flex flex-wrap items-center gap-4">
            <a
              href="https://locatool.devsupai.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glacier-solid inline-flex items-center gap-2 text-xs"
            >
              <span>{t.ctaLive}</span>
              <ExternalLink size={14} />
            </a>
            <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-['Montserrat'] font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t.liveBadge}
            </span>
          </div>

          {/* Hero Visual Mockup */}
          <div className="rounded-2xl overflow-hidden border border-[#E5E5E5] mb-12 shadow-xl bg-[#F8F8F8]">
            <img 
              src="/locatool.webp" 
              alt="Tableau de bord de l'application SaaS LocaTool" 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Key Metrics / Context */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-xl bg-[#F8F8F8] border border-[#E5E5E5] mb-12">
            <div>
              <div className="text-xs font-bold font-['Montserrat'] text-[#888888] uppercase">{t.facts.typeLabel}</div>
              <div className="text-sm font-black font-['Montserrat'] text-[#1A1A1A] mt-1">{t.facts.typeVal}</div>
            </div>
            <div>
              <div className="text-xs font-bold font-['Montserrat'] text-[#888888] uppercase">{t.facts.usageLabel}</div>
              <div className="text-sm font-black font-['Montserrat'] text-[#1A1A1A] mt-1">{t.facts.usageVal}</div>
            </div>
            <div>
              <div className="text-xs font-bold font-['Montserrat'] text-[#888888] uppercase">{t.facts.accessLabel}</div>
              <div className="text-sm font-black font-['Montserrat'] text-[#1A1A1A] mt-1">{t.facts.accessVal}</div>
            </div>
            <div>
              <div className="text-xs font-bold font-['Montserrat'] text-[#888888] uppercase">{t.facts.resultLabel}</div>
              <div className="text-sm font-black font-['Montserrat'] text-[#0284C7] mt-1">{t.facts.resultVal}</div>
            </div>
          </div>

          {/* Case Narrative Content */}
          <div className="space-y-8 text-sm max-w-none text-[#555555] font-['Plus_Jakarta_Sans'] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold font-['Montserrat'] text-[#1A1A1A] mb-3">
                {t.q1}
              </h2>
              <p>{t.a1}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-['Montserrat'] text-[#1A1A1A] mb-3">
                {t.q2}
              </h2>
              <p>{t.a2}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-['Montserrat'] text-[#1A1A1A] mb-3">
                {t.q3}
              </h2>
              <p className="p-4 rounded-xl bg-[#0284C7]/10 border border-[#0284C7]/20 text-[#1A1A1A] text-sm font-medium mb-3">
                {t.highlight3}
              </p>
              <p>{t.a3}</p>
            </section>
          </div>

          {/* Live CTA Box */}
          <div className="mt-12 p-8 rounded-2xl bg-[#F8F8F8] border border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h3 className="text-lg sm:text-xl font-black font-['Montserrat'] text-[#1A1A1A] mb-1">{t.bannerTitle}</h3>
              <p className="text-xs sm:text-sm text-[#666666] font-['Plus_Jakarta_Sans']">{t.bannerDesc}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://locatool.devsupai.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glacier-solid text-xs inline-flex items-center gap-2"
              >
                <span>{t.bannerBtn}</span>
                <ExternalLink size={14} />
              </a>
              <Link
                to={language === 'en' ? '/en#contact' : '/#contact'}
                className="btn-glacier-outline text-xs"
              >
                <span>{language === 'en' ? 'Request a Quote' : 'Demander un devis'}</span>
              </Link>
            </div>
          </div>

          {/* Back Link bottom */}
          <div className="mt-14 pt-8 border-t border-[#E5E5E5]">
            <Link to="/#realisations" className="text-xs font-bold font-['Montserrat'] text-[#0284C7] hover:text-[#1A1A1A]">
              {common.backBtnBottom}
            </Link>
          </div>

        </div>
      </SectionReveal>
    </div>
  );
}

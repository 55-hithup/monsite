import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ExternalLink, 
  HelpCircle, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import SectionReveal from '../../components/SectionReveal';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';
import { useJsonLd } from '../../hooks/useJsonLd';
import { useLanguage } from '../../i18n/LanguageContext';
import { tradesData, type TradePageContent } from '../../i18n/tradesData';

interface TradePageTemplateProps {
  tradeKey: 'artisan' | 'professionLiberale' | 'restaurant';
}

export default function TradePageTemplate({ tradeKey }: TradePageTemplateProps) {
  const { language, isEn } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const langKey = language === 'en' ? 'en' : 'fr';
  const data: TradePageContent = tradesData[langKey][tradeKey];

  // Unique SEO metadata
  useDocumentMetadata(
    {
      fr: tradesData.fr[tradeKey].meta.title,
      en: tradesData.en[tradeKey].meta.title,
    },
    {
      fr: tradesData.fr[tradeKey].meta.description,
      en: tradesData.en[tradeKey].meta.description,
    },
    'https://www.devsupai.fr/hero-bg-mockup.webp'
  );

  // Schema.org Structured Data (Service + FAQPage)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.meta.title,
    "description": data.meta.description,
    "provider": {
      "@type": "ProfessionalService",
      "name": "DevSupAi",
      "url": "https://www.devsupai.fr",
      "telephone": "+33783666098",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13 Allée des Roses",
        "addressLocality": "Saint-Mihiel",
        "postalCode": "55300",
        "addressRegion": "Grand Est",
        "addressCountry": "FR"
      }
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Grand Est & France"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faq.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  useJsonLd(serviceSchema, `trade-service-schema-${tradeKey}-${langKey}`);
  useJsonLd(faqSchema, `trade-faq-schema-${tradeKey}-${langKey}`);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="w-full bg-[#FFFFFF] text-[#4A4A4A] min-h-screen">
      {/* 1. HERO BANNER */}
      <section className="py-16 md:py-24 border-b border-[#E5E5E5] bg-[#F8F8F8]">
        <div className="container max-w-5xl mx-auto px-6 text-left">
          {/* Breadcrumb link */}
          <Link 
            to={isEn ? "/en" : "/"}
            className="text-xs font-bold font-['Montserrat'] text-[#0284C7] hover:text-[#1A1A1A] transition-colors inline-flex items-center gap-1.5 mb-6"
          >
            <span>←</span> {isEn ? "Back to home" : "Retour à l'accueil"}
          </Link>

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0284C7]/30 bg-[#0284C7]/10 text-xs font-bold font-['Montserrat'] text-[#0284C7] mb-4">
            <Sparkles size={13} className="text-[#0284C7]" aria-hidden="true" />
            <span>{data.meta.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Montserrat'] text-[#1A1A1A] mb-6 leading-tight tracking-tight">
            {data.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-[#555555] font-['Plus_Jakarta_Sans'] leading-relaxed max-w-3xl mb-8">
            {data.hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              to={`/#contact?service=${encodeURIComponent(data.meta.badge)}`}
              className="btn-glacier-solid rounded-none bg-[#0284C7] hover:bg-sky-500 text-white font-bold py-3.5 px-6 inline-flex items-center gap-2 transition-all active:scale-95 shadow-md"
              style={{ color: '#FFFFFF' }}
            >
              <span style={{ color: '#FFFFFF' }}>{data.hero.ctaPrimary}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              href="tel:0783666098"
              className="btn-glacier-outline py-3.5 px-6 inline-flex items-center gap-2 font-bold text-slate-800 border border-slate-300 hover:border-slate-800 transition-all active:scale-95"
            >
              <PhoneCall size={15} className="text-[#0284C7]" aria-hidden="true" />
              <span>{data.hero.ctaSecondary}</span>
            </a>
          </div>

          {/* Proof pill */}
          <div className="inline-flex items-center gap-2 text-xs text-[#666666] font-medium bg-white py-2 px-4 rounded-lg border border-[#E5E5E5]">
            <ShieldCheck size={16} className="text-[#0284C7] shrink-0" aria-hidden="true" />
            <span>{data.hero.proofPill}</span>
          </div>
        </div>
      </section>

      {/* 2. SPECIFIC CHALLENGES & SOLUTIONS */}
      <section className="py-16 md:py-20 border-b border-[#E5E5E5]">
        <div className="container max-w-5xl mx-auto px-6">
          <SectionReveal className="text-left mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 bg-sky-50 text-xs font-bold text-[#0284C7] mb-3">
              <span>{isEn ? "BUSINESS VALUE & ROI" : "BÉNÉFICES MÉTIERS CONCRETS"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] mb-3">
              {data.challengesTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#555555]">
              {data.challengesSubtitle}
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {data.challenges.map((c, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0284C7] transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7] font-bold font-['Montserrat'] text-sm mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold font-['Montserrat'] text-[#1A1A1A] mb-2">
                  {c.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DELIVERABLES & ACCESSIBILITY GUARANTEE */}
      <section className="py-16 md:py-20 bg-[#F8F8F8] border-b border-[#E5E5E5]">
        <div className="container max-w-5xl mx-auto px-6 text-left">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] mb-3">
              {data.deliverablesTitle}
            </h2>
            <p className="text-sm text-[#555555]">
              {isEn 
                ? "Every deliverable is backed by our strict 100/100 performance standard and zero vendor lock-in."
                : "Chaque prestation inclut notre engagement d'excellence technique, de conformité légale et de performance."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {data.deliverables.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-lg bg-white border border-[#E5E5E5] flex items-start gap-3 shadow-sm"
              >
                <CheckCircle2 size={18} className="text-[#0284C7] shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs sm:text-sm text-[#333333] font-medium leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Related Case Study Bridge */}
          <div className="p-6 rounded-xl bg-white border-2 border-sky-600/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0284C7] block mb-1">
                {data.caseStudy.tag}
              </span>
              <h3 className="text-lg font-bold font-['Montserrat'] text-[#1A1A1A] mb-1">
                {data.caseStudy.title}
              </h3>
              <p className="text-xs text-[#555555] max-w-xl">
                {data.caseStudy.desc}
              </p>
            </div>
            <Link
              to={data.caseStudy.link}
              className="btn-glacier-outline py-2.5 px-4 text-xs font-bold font-['Montserrat'] shrink-0 inline-flex items-center gap-2"
            >
              <span>{data.caseStudy.linkLabel}</span>
              <ExternalLink size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. TRADE FAQ */}
      <section className="py-16 md:py-20 bg-white border-b border-[#E5E5E5]">
        <div className="container max-w-4xl mx-auto px-6 text-left">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 bg-sky-50 text-xs font-bold text-[#0284C7] mb-3">
              <HelpCircle size={14} aria-hidden="true" />
              <span>{isEn ? "FAQ & GUIDANCE" : "QUESTIONS SPÉCIFIQUES"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A]">
              {data.faqTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {data.faq.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border transition-all duration-300 ${
                    isOpen ? 'border-[#0284C7] bg-white shadow-md' : 'border-[#E5E5E5] bg-[#F8F8F8] hover:border-[#CCCCCC]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none group"
                    aria-expanded={isOpen}
                    aria-controls={`trade-faq-answer-${idx}`}
                    id={`trade-faq-question-${idx}`}
                  >
                    <h3 className="text-sm sm:text-base font-bold font-['Montserrat'] text-[#1A1A1A] leading-snug group-hover:text-[#0284C7] transition-colors duration-200 flex-1">
                      {item.q}
                    </h3>
                    <span className={`shrink-0 p-1.5 rounded-full bg-white border transition-all duration-300 ${
                      isOpen ? 'border-[#0284C7] text-[#0284C7] bg-sky-50' : 'border-[#E5E5E5] text-[#555555]'
                    }`}>
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                      />
                    </span>
                  </button>

                  <div
                    id={`trade-faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`trade-faq-question-${idx}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-4 pt-4 border-t border-[#E5E5E5] text-xs sm:text-sm text-[#555555] leading-relaxed font-['Plus_Jakarta_Sans']">
                        {item.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="container max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-white">
            {data.contactCta.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            {data.contactCta.desc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to={`/#contact?service=${encodeURIComponent(data.meta.badge)}`}
              className="btn-glacier-solid rounded-none bg-[#0284C7] hover:bg-sky-400 text-white font-bold py-3.5 px-8 shadow-lg transition-all active:scale-95"
              style={{ color: '#FFFFFF' }}
            >
              <span style={{ color: '#FFFFFF' }}>{data.contactCta.btn}</span>
            </Link>
            <a
              href="tel:0783666098"
              className="py-3.5 px-6 rounded-none inline-flex items-center gap-2.5 font-bold text-white border border-white/40 hover:border-white transition-all active:scale-95 bg-white/10"
              style={{ color: '#FFFFFF' }}
            >
              <PhoneCall size={15} className="text-sky-400 shrink-0" aria-hidden="true" />
              <span>07 83 66 60 98</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

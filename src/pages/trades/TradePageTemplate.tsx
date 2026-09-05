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
  Sparkles,
  Star
} from 'lucide-react';
import SectionReveal from '../../components/SectionReveal';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';
import { useJsonLd } from '../../hooks/useJsonLd';
import { useLanguage } from '../../i18n/LanguageContext';
import { tradesData, type TradePageContent } from '../../i18n/tradesData';

interface TradePageTemplateProps {
  tradeKey: 'artisan' | 'professionLiberale' | 'restaurant' | 'commerceBoutique';
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
    "serviceType": data.meta.badge,
    "areaServed": [
      { "@type": "City", "name": "Saint-Mihiel", "postalCode": "55300" },
      { "@type": "City", "name": "Commercy", "postalCode": "55200" },
      { "@type": "City", "name": "Verdun", "postalCode": "55100" },
      { "@type": "City", "name": "Bar-le-Duc", "postalCode": "55000" },
      { "@type": "City", "name": "Nancy", "postalCode": "54000" },
      { "@type": "City", "name": "Metz", "postalCode": "57000" },
      { "@type": "AdministrativeArea", "name": "Meuse" },
      { "@type": "AdministrativeArea", "name": "Grand Est" },
      { "@type": "Country", "name": "France" }
    ],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": data.recommendedPack.price.replace(/[^0-9]/g, ''),
      "description": data.recommendedPack.description
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
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 mb-6 text-xs font-bold font-['Montserrat']">
            <Link 
              to={isEn ? "/en" : "/"}
              className="text-[#0284C7] hover:text-[#1A1A1A] transition-colors inline-flex items-center gap-1"
            >
              <span>{isEn ? "Home" : "Accueil"}</span>
            </Link>
            <span className="text-slate-400" aria-hidden="true">/</span>
            <Link 
              to={isEn ? "/en/services" : "/nos-services"}
              className="text-[#525252] hover:text-[#0284C7] transition-colors"
            >
              <span>{isEn ? "Services Catalog" : "Catalogue des 47 Prestations"}</span>
            </Link>
            <span className="text-slate-400" aria-hidden="true">/</span>
            <span className="text-[#1A1A1A]">{data.meta.badge}</span>
          </nav>

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

      {/* 3. REAL CLIENT TESTIMONIAL BLOCK */}
      <section className="py-16 md:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="container max-w-4xl mx-auto px-6 text-left">
          <SectionReveal className="text-left mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 bg-sky-50 text-xs font-bold text-[#0284C7] mb-3">
              <Star size={13} className="text-amber-500 fill-amber-400" aria-hidden="true" />
              <span>{isEn ? "VERIFIED CLIENT TESTIMONIAL" : "RETOUR D'EXPÉRIENCE VÉRIFIÉ"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] mb-2">
              {isEn ? "What our clients say about our collaboration" : "Ce que nos clients disent de notre accompagnement"}
            </h2>
            <p className="text-sm text-[#555555]">
              {isEn 
                ? "Concrete business feedback, zero invented statistics, and 100% human craftsmanship." 
                : "Des résultats concrets, sans chiffres marketing inventés et avec un artisanat 100% humain."}
            </p>
          </SectionReveal>

          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#CBD5E1] shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-amber-400 fill-amber-400" aria-hidden="true" />
              ))}
              <span className="ml-2 text-xs font-bold text-slate-700 font-['Montserrat']">5.0 / 5</span>
              <span className="ml-auto text-[11px] font-semibold text-slate-500 bg-slate-100 py-1 px-3 rounded-full border border-slate-200">
                {data.testimonial.tag}
              </span>
            </div>

            <blockquote className="text-base sm:text-lg text-slate-800 font-['Plus_Jakarta_Sans'] leading-relaxed italic mb-6">
              "{data.testimonial.quote.replace(/^«\s*|\s*»$/g, '')}"
            </blockquote>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <h3 className="text-base font-bold font-['Montserrat'] text-[#1A1A1A]">
                  {data.testimonial.name}
                </h3>
                <p className="text-xs text-[#555555]">
                  {data.testimonial.role}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 size={13} className="text-emerald-600" aria-hidden="true" />
                <span>{isEn ? "Verified Review" : "Avis Vérifié"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECOMMENDED PACK BLOCK */}
      <section className="py-16 md:py-20 bg-white border-b border-[#E5E5E5]">
        <div className="container max-w-4xl mx-auto px-6 text-left">
          <SectionReveal className="text-left mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 bg-sky-50 text-xs font-bold text-[#0284C7] mb-3">
              <Sparkles size={13} className="text-[#0284C7]" aria-hidden="true" />
              <span>{isEn ? "RECOMMENDED PACKAGE" : "FORFAIT CONSEILLÉ"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] mb-2">
              {isEn ? "The optimal package for your profession" : "La solution la plus adaptée à votre activité"}
            </h2>
            <p className="text-sm text-[#555555]">
              {isEn 
                ? "Transparent pricing, zero monthly software subscription, domain and high-speed hosting included year 1." 
                : "Tarif clair et transparent, 0 € d'abonnement logiciel captif, nom de domaine et hébergement haute vitesse inclus l'an 1."}
            </p>
          </SectionReveal>

          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border-2 border-sky-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0284C7] bg-sky-100/70 border border-sky-300/60 px-3 py-1 rounded-full inline-block">
                {data.recommendedPack.badge}
              </span>
              <h3 className="text-2xl font-black font-['Montserrat'] text-[#1A1A1A]">
                {data.recommendedPack.name}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-['Plus_Jakarta_Sans']">
                {data.recommendedPack.description}
              </p>
              <div className="pt-1">
                <span className="text-xs font-medium text-slate-500 block">{isEn ? "Starting from" : "Tarif indicatif"}</span>
                <span className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#0284C7]">
                  {data.recommendedPack.price}
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
              <Link
                to={`/#contact?service=${encodeURIComponent(data.recommendedPack.name)}`}
                className="btn-glacier-solid rounded-none bg-[#0284C7] hover:bg-sky-500 text-white font-bold py-3.5 px-6 inline-flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md text-xs font-['Montserrat'] uppercase tracking-wider"
                style={{ color: '#FFFFFF' }}
              >
                <span style={{ color: '#FFFFFF' }}>{isEn ? "Select this package" : "Choisir ce forfait"}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link
                to={data.recommendedPack.link}
                className="btn-glacier-outline py-3 px-5 text-xs font-bold font-['Montserrat'] inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-800 text-slate-800 transition-all"
              >
                <span>{data.recommendedPack.linkLabel}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DELIVERABLES & ACCESSIBILITY GUARANTEE */}
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
        </div>
      </section>

      {/* 6. RELATED CASE STUDY BRIDGE */}
      <section className="py-14 bg-white border-b border-[#E5E5E5]">
        <div className="container max-w-5xl mx-auto px-6 text-left">
          <h2 className="text-xl sm:text-2xl font-black font-['Montserrat'] text-[#1A1A1A] mb-6">
            {isEn ? "Associated Real-World Case Study" : "Projet concret & Étude de cas associée"}
          </h2>
          <div className="p-6 rounded-xl bg-[#F8FAFC] border-2 border-sky-600/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0284C7] block mb-1">
                {data.caseStudy.tag}
              </span>
              <h3 className="text-lg font-bold font-['Montserrat'] text-[#1A1A1A] mb-1">
                {data.caseStudy.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] max-w-xl">
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

          {/* Exploration du catalogue complet */}
          <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-left">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0284C7]">
                {isEn ? "EXPAND YOUR REACH" : "AUTRES PRESTATIONS WEB"}
              </span>
              <h3 className="text-base font-bold font-['Montserrat'] text-[#1A1A1A]">
                {isEn 
                  ? "Looking for specialized digital solutions or additional features?" 
                  : "Besoin d'un module spécifique ou d'une prestation complémentaire ?"}
              </h3>
              <p className="text-xs text-[#525252] max-w-xl font-['Plus_Jakarta_Sans']">
                {isEn
                  ? "Explore our full catalog of 47 custom web development services: booking engines, e-commerce, custom SaaS, and speed audits."
                  : "Découvrez notre catalogue complet de 47 prestations informatiques sur-mesure : réservation directe, e-commerce, outils SaaS et maintenance technique."}
              </p>
            </div>
            <Link
              to={isEn ? "/en/services" : "/nos-services"}
              className="btn-glacier-outline py-2.5 px-4 text-xs font-bold font-['Montserrat'] shrink-0 inline-flex items-center gap-2 hover:border-[#0284C7] hover:text-[#0284C7] transition-all"
            >
              <span>{isEn ? "Browse All 47 Services" : "Consulter tout le catalogue"}</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
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

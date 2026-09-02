import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal, 
  PhoneCall, 
  Gauge, 
  FileCode, 
  UserCheck,
  RotateCcw
} from 'lucide-react';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import SectionReveal from '../components/SectionReveal';
import { useLanguage } from '../i18n/LanguageContext';
import { servicesData } from '../i18n/servicesTranslations';
import { servicesCatalog, strategicPillarsData, servicesFaqData } from '../i18n/servicesCatalog';

export default function Services() {
  const { language } = useLanguage();
  const t = servicesData[language] || servicesData.fr;
  const pillars = strategicPillarsData[language] || strategicPillarsData.fr;
  const faqs = servicesFaqData[language] || servicesFaqData.fr;

  useDocumentMetadata(
    {
      fr: 'Nos Prestations & Solutions Web Sur-Mesure | DevSupAi',
      en: 'Our Custom Web Services & Digital Solutions | DevSupAi',
    },
    {
      fr: 'Découvrez nos 47 prestations informatiques : création de sites vitrines, e-commerce, applications Android & PWA, SaaS sur-mesure et maintenance technique.',
      en: 'Explore our 47 custom digital services: showcase websites, e-commerce, Android & PWA apps, custom SaaS software, and technical maintenance.',
    },
    'https://www.devsupai.fr/hero-bg-mockup.webp'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeProfile, setActiveProfile] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const filteredServices = useMemo(() => {
    return servicesCatalog.filter((service) => {
      if (activeCategory !== 'all' && service.category !== activeCategory) {
        return false;
      }
      if (activeProfile !== 'all' && !service.profiles.includes(activeProfile)) {
        return false;
      }
      const itemData = service[language] || service.fr;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = itemData.title.toLowerCase().includes(query);
        const matchesDesc = itemData.description.toLowerCase().includes(query);
        const matchesTags = itemData.tags.some((tag) => tag.toLowerCase().includes(query));
        return matchesTitle || matchesDesc || matchesTags;
      }
      return true;
    });
  }, [searchQuery, activeCategory, activeProfile, language]);

  const selectCategoryFromPillar = (catId: string) => {
    setActiveCategory(catId);
    setActiveProfile('all');
    setSearchQuery('');
    if (typeof document !== 'undefined') {
      const explorerElem = document.getElementById('catalogue-explorer');
      if (explorerElem) {
        explorerElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const isFilteringActive = activeCategory !== 'all' || activeProfile !== 'all' || searchQuery.trim() !== '';

  const resetAllFilters = () => {
    setActiveCategory('all');
    setActiveProfile('all');
    setSearchQuery('');
  };

  return (
    <div className="w-full bg-white text-[#4A4A4A] min-h-screen">
      
      {/* 1. HERO SECTION */}
      <SectionReveal className="py-16 md:py-24 text-left border-b border-[#E5E5E5] bg-[#F8F8F8]">
        <div className="container max-w-6xl mx-auto px-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0284C7]/30 bg-[#0284C7]/10 text-xs font-bold font-['Montserrat'] text-[#0284C7] mb-6">
            <Sparkles size={14} className="text-[#0284C7]" aria-hidden="true" />
            <span>{t.hero.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Montserrat'] text-[#1A1A1A] mb-6 leading-[1.15] tracking-tight max-w-4xl">
            {t.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-[#555555] max-w-3xl leading-relaxed mb-10 font-['Plus_Jakarta_Sans'] font-normal">
            {t.hero.desc}
          </p>

          {/* Value Proposition Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl bg-white border border-[#E5E5E5] shadow-sm mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#0284C7] shrink-0">
                <FileCode size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-bold font-['Montserrat'] text-[#1A1A1A] leading-snug">{t.hero.valCode}</div>
                <div className="text-xs text-[#777777]">{t.hero.valCodeSub}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#0284C7] shrink-0">
                <Gauge size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-bold font-['Montserrat'] text-[#1A1A1A] leading-snug">{t.hero.valSpeed}</div>
                <div className="text-xs text-[#777777]">{t.hero.valSpeedSub}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#0284C7] shrink-0">
                <SlidersHorizontal size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-bold font-['Montserrat'] text-[#1A1A1A] leading-snug">{t.hero.valPillars}</div>
                <div className="text-xs text-[#777777]">{t.hero.valPillarsSub}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#0284C7] shrink-0">
                <UserCheck size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-bold font-['Montserrat'] text-[#1A1A1A] leading-snug">{t.hero.valContact}</div>
                <div className="text-xs text-[#777777]">{t.hero.valContactSub}</div>
              </div>
            </div>
          </div>

          {/* Quick Anchor Jumps */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-['Montserrat'] font-semibold text-[#666666]">
            <span className="text-[#888888]">{t.hero.directAccess}</span>
            <a href="#poles-expertise" className="hover:text-[#0284C7] transition-colors border-b border-transparent hover:border-[#0284C7]">
              {t.hero.anchorPillars}
            </a>
            <span className="text-[#CCCCCC]" aria-hidden="true">•</span>
            <a href="#catalogue-explorer" className="hover:text-[#0284C7] transition-colors border-b border-transparent hover:border-[#0284C7]">
              {t.hero.anchorCatalog}
            </a>
            <span className="text-[#CCCCCC]" aria-hidden="true">•</span>
            <a href="#methodologie" className="hover:text-[#0284C7] transition-colors border-b border-transparent hover:border-[#0284C7]">
              {t.hero.anchorMethod}
            </a>
            <span className="text-[#CCCCCC]" aria-hidden="true">•</span>
            <a href="#faq" className="hover:text-[#0284C7] transition-colors border-b border-transparent hover:border-[#0284C7]">
              {t.hero.anchorFaq}
            </a>
          </div>

        </div>
      </SectionReveal>

      {/* 2. STRATEGIC PILLARS SECTION */}
      <SectionReveal id="poles-expertise" className="py-16 md:py-24 border-b border-[#E5E5E5] bg-white">
        <div className="container max-w-6xl mx-auto px-6">
          
          <div className="max-w-2xl mb-12 text-left">
            <span className="col-pre-title">{t.pillarsSection.eyebrow}</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-[#1A1A1A] leading-tight mb-4">
              {t.pillarsSection.title}
            </h2>
            <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
              {t.pillarsSection.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
            {pillars.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="p-8 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#0284C7] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0284C7] group-hover:scale-105 transition-transform">
                          <IconComp size={24} aria-hidden="true" />
                        </div>
                        <div>
                          <span className="text-xs font-bold font-['Montserrat'] text-[#0284C7] block uppercase tracking-wider">
                            {pillar.badge}
                          </span>
                          <span className="text-xs text-[#777777]">{pillar.subtitle}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-['Montserrat'] text-[#1A1A1A] mb-3 leading-snug group-hover:text-[#0284C7] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-sm text-[#555555] leading-relaxed mb-6 font-normal">
                      {pillar.desc}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2.5 mb-6 p-5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                      <div className="text-xs font-bold font-['Montserrat'] text-[#1A1A1A] uppercase tracking-wider mb-2">
                        {t.pillarsSection.deliverablesTitle}
                      </div>
                      {pillar.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-[#555555]">
                          <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-6">
                      <span className="text-xs text-[#888888] mr-1">{t.pillarsSection.techLabel}</span>
                      {pillar.tech.map((techItem, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] font-semibold"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs">
                      <span className="text-[#888888] block text-xs">{t.pillarsSection.pricingLabel}</span>
                      <strong className="text-[#0284C7] font-extrabold font-['Montserrat'] text-sm">{pillar.pricing}</strong>
                    </div>

                    <button
                      onClick={() => selectCategoryFromPillar(pillar.id)}
                      className="text-xs font-['Montserrat'] font-bold text-white bg-[#1A1A1A] hover:bg-[#0284C7] px-4 py-2.5 rounded-md transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{t.pillarsSection.viewServicesBtn}</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </SectionReveal>

      {/* 3. INTERACTIVE CATALOG & SEARCH ENGINE */}
      <SectionReveal id="catalogue-explorer" className="py-16 md:py-24 border-b border-[#E5E5E5] bg-[#F8F8F8]">
        <div className="container max-w-6xl mx-auto px-6">
          
          <div className="text-left mb-10">
            <span className="col-pre-title">{t.explorer.eyebrow}</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-[#1A1A1A] mb-3 leading-tight">
              {t.explorer.title}
            </h2>
            <p className="text-sm sm:text-base text-[#666666] max-w-2xl leading-relaxed">
              {t.explorer.desc}
            </p>
          </div>

          {/* Search bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]" size={18} aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.explorer.searchPlaceholder}
                aria-label={t.explorer.searchPlaceholder}
                className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white border border-[#E5E5E5] text-sm text-[#1A1A1A] placeholder-[#888888] focus:outline-none focus:border-[#0284C7] shadow-sm transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-['Montserrat'] text-[#888888] hover:text-[#1A1A1A] cursor-pointer"
                  aria-label="Effacer la recherche"
                >
                  <RotateCcw size={14} className="inline" />
                </button>
              )}
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-4 text-left">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg text-xs font-['Montserrat'] font-bold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'bg-white text-[#555555] hover:text-[#1A1A1A] border border-[#E5E5E5]'
              }`}
            >
              {t.explorer.categoryAll}
            </button>
            <button
              onClick={() => setActiveCategory('vitrines')}
              className={`px-4 py-2 rounded-lg text-xs font-['Montserrat'] font-bold transition-all cursor-pointer ${
                activeCategory === 'vitrines'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'bg-white text-[#555555] hover:text-[#1A1A1A] border border-[#E5E5E5]'
              }`}
            >
              {t.explorer.catVitrines}
            </button>
            <button
              onClick={() => setActiveCategory('ecommerce')}
              className={`px-4 py-2 rounded-lg text-xs font-['Montserrat'] font-bold transition-all cursor-pointer ${
                activeCategory === 'ecommerce'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'bg-white text-[#555555] hover:text-[#1A1A1A] border border-[#E5E5E5]'
              }`}
            >
              {t.explorer.catEcommerce}
            </button>
            <button
              onClick={() => setActiveCategory('apps')}
              className={`px-4 py-2 rounded-lg text-xs font-['Montserrat'] font-bold transition-all cursor-pointer ${
                activeCategory === 'apps'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'bg-white text-[#555555] hover:text-[#1A1A1A] border border-[#E5E5E5]'
              }`}
            >
              {t.explorer.catApps}
            </button>
            <button
              onClick={() => setActiveCategory('maintenance')}
              className={`px-4 py-2 rounded-lg text-xs font-['Montserrat'] font-bold transition-all cursor-pointer ${
                activeCategory === 'maintenance'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'bg-white text-[#555555] hover:text-[#1A1A1A] border border-[#E5E5E5]'
              }`}
            >
              {t.explorer.catMaintenance}
            </button>
          </div>

          {/* Profile Filter Dropdown / Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-8 text-left">
            <span className="text-xs text-[#777777] font-medium mr-1">Filtrer par profil :</span>
            {[
              { id: 'all', label: t.explorer.profileAll },
              { id: 'pme', label: t.explorer.profPme },
              { id: 'artisans', label: t.explorer.profArtisans },
              { id: 'commerces', label: t.explorer.profCommerces },
              { id: 'associations', label: t.explorer.profAsso },
              { id: 'professions-liberales', label: t.explorer.profLiberal },
              { id: 'restaurants', label: t.explorer.profResto },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveProfile(p.id)}
                className={`px-3 py-1.5 rounded-md text-xs transition-all cursor-pointer ${
                  activeProfile === p.id
                    ? 'bg-[#0284C7] text-white font-bold'
                    : 'bg-white text-[#666666] hover:text-[#1A1A1A] border border-[#E5E5E5]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Counter bar */}
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#E5E5E5] text-xs text-[#666666]">
            <div>
              <strong className="text-[#1A1A1A] font-bold">{filteredServices.length}</strong> {t.explorer.resultsCount}
            </div>
            {isFilteringActive && (
              <button
                onClick={resetAllFilters}
                className="text-xs font-bold text-[#0284C7] hover:underline cursor-pointer"
              >
                {t.explorer.resetBtn}
              </button>
            )}
          </div>

          {/* Grid of Services */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
              {filteredServices.map((service) => {
                const itemData = service[language] || service.fr;
                const IconComp = service.icon;
                return (
                  <div
                    key={service.id}
                    className="p-6 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#0284C7] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0284C7] group-hover:scale-105 transition-transform">
                          <IconComp size={20} aria-hidden="true" />
                        </div>
                        <span className="text-xs font-bold font-['Montserrat'] px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] uppercase">
                          {service.category}
                        </span>
                      </div>

                      <h3 className="text-base font-bold font-['Montserrat'] text-[#1A1A1A] mb-2 leading-snug group-hover:text-[#0284C7] transition-colors">
                        {itemData.title}
                      </h3>

                      <p className="text-xs text-[#666666] leading-relaxed mb-4">
                        {itemData.description}
                      </p>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4 pt-3 border-t border-[#F1F5F9]">
                        {itemData.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-0.5 rounded-md bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/#contact?service=${encodeURIComponent(itemData.title)}`}
                        className="text-xs font-['Montserrat'] font-bold text-[#0284C7] hover:text-[#1A1A1A] transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>{t.explorer.contactCtaText}</span>
                        <ArrowRight size={12} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 rounded-xl bg-white border border-[#E5E5E5] text-center max-w-lg mx-auto shadow-sm">
              <h3 className="text-lg font-bold font-['Montserrat'] text-[#1A1A1A] mb-2">{t.explorer.emptyTitle}</h3>
              <p className="text-xs text-[#666666] mb-6 leading-relaxed">
                {t.explorer.emptyDesc}
              </p>
              <button
                onClick={resetAllFilters}
                className="btn-glacier-solid cursor-pointer"
              >
                {t.explorer.resetBtn}
              </button>
            </div>
          )}

        </div>
      </SectionReveal>

      {/* 4. METHODOLOGY SECTION */}
      <SectionReveal id="methodologie" className="py-16 md:py-24 border-b border-[#E5E5E5] bg-white">
        <div className="container max-w-6xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="col-pre-title justify-center">{t.methodology.eyebrow}</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-[#1A1A1A] mb-3">
              {t.methodology.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {t.methodology.steps.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0284C7] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm font-black font-['Montserrat'] text-[#0284C7] mb-3">
                    {step.num}
                  </div>
                  <h3 className="text-base font-bold font-['Montserrat'] text-[#1A1A1A] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </SectionReveal>

      {/* 5. SERVICES FAQ */}
      <SectionReveal id="faq" className="py-16 md:py-24 border-b border-[#E5E5E5] bg-[#F8F8F8]">
        <div className="container max-w-4xl mx-auto px-6 text-left">
          
          <div className="text-center mb-12">
            <span className="col-pre-title justify-center">{t.faqSection.eyebrow}</span>
            <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A]">
              {t.faqSection.title}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-xl bg-white border transition-all ${
                    isOpen ? 'border-[#0284C7] shadow-sm' : 'border-[#E5E5E5]'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold font-['Montserrat'] text-[#1A1A1A] leading-snug">
                      {faq.question}
                    </span>
                    <span className="text-[#0284C7] shrink-0">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-[#E5E5E5] text-xs sm:text-sm text-[#555555] leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </SectionReveal>

      {/* 6. BOTTOM CONTACT BANNER */}
      <SectionReveal className="py-16 md:py-24 bg-white">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="p-8 sm:p-12 rounded-2xl bg-[#1A1A1A] text-white text-center space-y-6 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-white">
              {t.banner.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#E2E8F0] max-w-xl mx-auto leading-relaxed">
              {t.banner.desc}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/#contact"
                className="btn-glacier-solid bg-[#0284C7] hover:bg-white hover:text-[#1A1A1A] text-white"
              >
                {t.banner.cta}
              </Link>
              <a
                href="tel:0783666098"
                className="btn-glacier-outline border-white text-white hover:bg-white hover:text-[#1A1A1A] inline-flex items-center gap-2"
              >
                <PhoneCall size={14} className="text-[#38BDF8]" aria-hidden="true" />
                <span>07 83 66 60 98</span>
              </a>
            </div>
          </div>
        </div>
      </SectionReveal>

    </div>
  );
}

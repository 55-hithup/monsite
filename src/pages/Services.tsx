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
  UserCheck
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
      en: 'Our Custom Web & Software Engineering Services | DevSupAi',
    },
    {
      fr: 'Découvrez les 47 solutions informatiques et web sur-mesure conçues par Alexandre Pabst (DevSupAi) : création de sites vitrines, e-commerce, applications web et mobiles, SaaS et maintenance technique.',
      en: 'Explore all 47 custom software and web development services by Alexandre Pabst (DevSupAi): showcase websites, e-commerce, web and mobile apps, SaaS, and technical maintenance.',
    },
    '/nos-services'
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
    <div style={{ background: 'var(--color-primary-bg)', color: 'var(--color-text-primary)', minHeight: '100vh', paddingTop: '110px' }}>
      
      {/* 1. HERO SECTION */}
      <SectionReveal className="py-12 md:py-20 text-left border-b border-[rgba(245,246,250,0.06)]">
        <div className="wrap max-w-6xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2E8FE0]/40 bg-[#2E8FE0]/10 text-xs label-mono text-[#38BDF8] mb-6">
            <Sparkles size={14} className="text-[#38BDF8]" />
            <span>{t.hero.eyebrow}</span>
          </div>

          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight max-w-4xl">
            {t.hero.title}
          </h1>

          <p className="text-sm sm:text-base text-text-secondary max-w-3xl leading-relaxed mb-10 font-light">
            {t.hero.desc}
          </p>

          {/* Value Proposition Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#121729]/80 border border-[rgba(245,246,250,0.08)] mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2E8FE0]/15 border border-[#2E8FE0]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
                <FileCode size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-snug">{t.hero.valCode}</div>
                <div className="text-[11px] text-text-secondary">{t.hero.valCodeSub}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2E8FE0]/15 border border-[#2E8FE0]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
                <Gauge size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-snug">{t.hero.valSpeed}</div>
                <div className="text-[11px] text-text-secondary">{t.hero.valSpeedSub}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2E8FE0]/15 border border-[#2E8FE0]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
                <SlidersHorizontal size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-snug">{t.hero.valPillars}</div>
                <div className="text-[11px] text-text-secondary">{t.hero.valPillarsSub}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2E8FE0]/15 border border-[#2E8FE0]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
                <UserCheck size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-snug">{t.hero.valContact}</div>
                <div className="text-[11px] text-text-secondary">{t.hero.valContactSub}</div>
              </div>
            </div>
          </div>

          {/* Quick Anchor Jumps */}
          <div className="flex flex-wrap items-center gap-3 text-xs label-mono text-text-secondary">
            <span className="text-slate-400">{t.hero.directAccess}</span>
            <a href="#poles-expertise" className="hover:text-[#38BDF8] transition-colors border-b border-transparent hover:border-[#38BDF8]">
              {t.hero.anchorPillars}
            </a>
            <span className="text-slate-600">•</span>
            <a href="#catalogue-explorer" className="hover:text-[#38BDF8] transition-colors border-b border-transparent hover:border-[#38BDF8]">
              {t.hero.anchorCatalog}
            </a>
            <span className="text-slate-600">•</span>
            <a href="#methodologie" className="hover:text-[#38BDF8] transition-colors border-b border-transparent hover:border-[#38BDF8]">
              {t.hero.anchorMethod}
            </a>
            <span className="text-slate-600">•</span>
            <a href="#faq" className="hover:text-[#38BDF8] transition-colors border-b border-transparent hover:border-[#38BDF8]">
              {t.hero.anchorFaq}
            </a>
          </div>

        </div>
      </SectionReveal>

      {/* 2. STRATEGIC PILLARS SECTION */}
      <SectionReveal id="poles-expertise" className="py-16 md:py-24 border-b border-[rgba(245,246,250,0.06)]">
        <div className="wrap max-w-6xl">
          
          <div className="max-w-2xl mb-12 text-left">
            <div className="eyebrow mb-2">{t.pillarsSection.eyebrow}</div>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
              {t.pillarsSection.title}
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              {t.pillarsSection.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
            {pillars.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="p-7 sm:p-8 rounded-2xl bg-[#121729]/70 border border-[rgba(245,246,250,0.08)] hover:border-[#2E8FE0]/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#2E8FE0]/15 border border-[#2E8FE0]/30 flex items-center justify-center text-[#38BDF8] group-hover:scale-105 transition-transform">
                          <IconComp size={24} />
                        </div>
                        <div>
                          <span className="text-[11px] label-mono text-[#38BDF8] font-bold block uppercase tracking-wider">
                            {pillar.badge}
                          </span>
                          <span className="text-xs text-text-secondary">{pillar.subtitle}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-snug group-hover:text-[#38BDF8] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 font-light">
                      {pillar.desc}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2.5 mb-6 p-4 rounded-xl bg-[#0B122C]/70 border border-[rgba(245,246,250,0.05)]">
                      <div className="text-[11px] font-bold label-mono text-white uppercase tracking-wider mb-2">
                        {t.pillarsSection.deliverablesTitle}
                      </div>
                      {pillar.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-text-secondary">
                          <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-6">
                      <span className="text-[11px] text-text-secondary mr-1">{t.pillarsSection.techLabel}</span>
                      {pillar.tech.map((techItem, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#18203d] text-slate-300 border border-[rgba(245,246,250,0.06)]"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-[rgba(245,246,250,0.08)] flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs">
                      <span className="text-text-secondary block text-[11px]">{t.pillarsSection.pricingLabel}</span>
                      <strong className="text-[#38BDF8] font-bold">{pillar.pricing}</strong>
                    </div>

                    <button
                      onClick={() => selectCategoryFromPillar(pillar.id)}
                      className="text-xs label-mono text-white bg-[#1B254B] hover:bg-[#2E8FE0] px-4 py-2 rounded-xl transition-all inline-flex items-center gap-1.5 font-bold cursor-target border border-[rgba(245,246,250,0.08)]"
                    >
                      <span>{t.pillarsSection.viewServicesBtn}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </SectionReveal>

      {/* 3. INTERACTIVE CATALOG & SEARCH ENGINE */}
      <SectionReveal id="catalogue-explorer" className="py-16 md:py-24 border-b border-[rgba(245,246,250,0.06)]">
        <div className="wrap max-w-6xl">
          
          <div className="text-left mb-10">
            <div className="eyebrow mb-2">{t.explorer.eyebrow}</div>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
              {t.explorer.title}
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
              {t.explorer.desc}
            </p>
          </div>

          {/* Search bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.explorer.searchPlaceholder}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#121729]/90 border border-[rgba(245,246,250,0.12)] text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#2E8FE0] shadow-inner transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs label-mono text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-4 text-left">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs label-mono font-bold transition-all cursor-target ${
                activeCategory === 'all'
                  ? 'bg-[#2E8FE0] text-[#0B122C] shadow-md shadow-[#2E8FE0]/20'
                  : 'bg-[#121729] text-text-secondary hover:text-white border border-[rgba(245,246,250,0.06)]'
              }`}
            >
              {t.explorer.categoryAll}
            </button>
            <button
              onClick={() => setActiveCategory('vitrines')}
              className={`px-3.5 py-1.5 rounded-xl text-xs label-mono font-bold transition-all cursor-target ${
                activeCategory === 'vitrines'
                  ? 'bg-[#2E8FE0] text-[#0B122C] shadow-md shadow-[#2E8FE0]/20'
                  : 'bg-[#121729] text-text-secondary hover:text-white border border-[rgba(245,246,250,0.06)]'
              }`}
            >
              {t.explorer.catVitrines}
            </button>
            <button
              onClick={() => setActiveCategory('ecommerce')}
              className={`px-3.5 py-1.5 rounded-xl text-xs label-mono font-bold transition-all cursor-target ${
                activeCategory === 'ecommerce'
                  ? 'bg-[#2E8FE0] text-[#0B122C] shadow-md shadow-[#2E8FE0]/20'
                  : 'bg-[#121729] text-text-secondary hover:text-white border border-[rgba(245,246,250,0.06)]'
              }`}
            >
              {t.explorer.catEcommerce}
            </button>
            <button
              onClick={() => setActiveCategory('apps')}
              className={`px-3.5 py-1.5 rounded-xl text-xs label-mono font-bold transition-all cursor-target ${
                activeCategory === 'apps'
                  ? 'bg-[#2E8FE0] text-[#0B122C] shadow-md shadow-[#2E8FE0]/20'
                  : 'bg-[#121729] text-text-secondary hover:text-white border border-[rgba(245,246,250,0.06)]'
              }`}
            >
              {t.explorer.catApps}
            </button>
            <button
              onClick={() => setActiveCategory('maintenance')}
              className={`px-3.5 py-1.5 rounded-xl text-xs label-mono font-bold transition-all cursor-target ${
                activeCategory === 'maintenance'
                  ? 'bg-[#2E8FE0] text-[#0B122C] shadow-md shadow-[#2E8FE0]/20'
                  : 'bg-[#121729] text-text-secondary hover:text-white border border-[rgba(245,246,250,0.06)]'
              }`}
            >
              {t.explorer.catMaintenance}
            </button>
          </div>

          {/* Profile Filter Dropdown / Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-8 text-left">
            <span className="text-xs text-slate-400 label-mono mr-1">Filtrer par profil :</span>
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
                className={`px-3 py-1 rounded-lg text-[11px] label-mono transition-all cursor-target ${
                  activeProfile === p.id
                    ? 'bg-[#6B4FE0] text-white font-bold'
                    : 'bg-[#101528] text-slate-400 hover:text-slate-200 border border-[rgba(245,246,250,0.05)]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Counter bar */}
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[rgba(245,246,250,0.06)] text-xs text-text-secondary">
            <div>
              <strong className="text-white font-bold">{filteredServices.length}</strong> {t.explorer.resultsCount}
            </div>
            {isFilteringActive && (
              <button
                onClick={resetAllFilters}
                className="text-xs label-mono text-[#38BDF8] hover:underline cursor-target"
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
                    className="p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] hover:border-[#2E8FE0]/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#2E8FE0]/15 border border-[#2E8FE0]/30 flex items-center justify-center text-[#38BDF8] group-hover:scale-105 transition-transform">
                          <IconComp size={20} />
                        </div>
                        <span className="text-[11px] label-mono px-2.5 py-0.5 rounded-full bg-[#18203d] text-slate-300 border border-[rgba(245,246,250,0.06)] uppercase">
                          {service.category}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-[#38BDF8] transition-colors">
                        {itemData.title}
                      </h3>

                      <p className="text-xs text-text-secondary leading-relaxed mb-4 font-light">
                        {itemData.description}
                      </p>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4 pt-3 border-t border-[rgba(245,246,250,0.04)]">
                        {itemData.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-[#0B0F1E] text-slate-400 border border-[rgba(245,246,250,0.04)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`${language === 'en' ? '/en#contact' : '/#contact'}?service=${encodeURIComponent(itemData.title)}`}
                        className="text-xs label-mono text-[#38BDF8] hover:text-white transition-colors inline-flex items-center gap-1 font-bold cursor-target"
                      >
                        <span>{t.explorer.contactCtaText}</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-[#121729]/40 border border-[rgba(245,246,250,0.06)] text-center max-w-lg mx-auto">
              <h3 className="text-lg font-bold text-white mb-2">{t.explorer.emptyTitle}</h3>
              <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                {t.explorer.emptyDesc}
              </p>
              <button
                onClick={resetAllFilters}
                className="btn btn-primary text-xs px-5 py-2 rounded-full font-bold"
                style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#fff' }}
              >
                {t.explorer.resetBtn}
              </button>
            </div>
          )}

        </div>
      </SectionReveal>

      {/* 4. METHODOLOGY SECTION */}
      <SectionReveal id="methodologie" className="py-16 md:py-24 border-b border-[rgba(245,246,250,0.06)]">
        <div className="wrap max-w-6xl">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="eyebrow justify-center mb-2">{t.methodology.eyebrow}</div>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
              {t.methodology.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {t.methodology.steps.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] hover:border-[#2E8FE0]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm font-bold label-mono text-[#38BDF8] mb-3">
                    {step.num}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </SectionReveal>

      {/* 5. SERVICES FAQ */}
      <SectionReveal id="faq" className="py-16 md:py-24 border-b border-[rgba(245,246,250,0.06)]">
        <div className="wrap max-w-4xl text-left">
          
          <div className="text-center mb-12">
            <div className="eyebrow justify-center mb-2">{t.faqSection.eyebrow}</div>
            <h2 className="section-title text-2xl sm:text-3xl font-extrabold text-white">
              {t.faqSection.title}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl bg-[#121729]/60 border transition-all ${
                    isOpen ? 'border-[#2E8FE0]/40' : 'border-[rgba(245,246,250,0.06)]'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-target focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.question}
                    </span>
                    <span className="text-[#38BDF8] shrink-0">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-[rgba(245,246,250,0.06)] text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
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
      <SectionReveal className="py-16 md:py-24">
        <div className="wrap max-w-4xl">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#17234d] via-[#121b3d] to-[#1a1c3d] border border-[#2E8FE0]/30 shadow-2xl text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              {t.banner.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              {t.banner.desc}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to={language === 'en' ? '/en#contact' : '/#contact'}
                className="btn btn-primary px-6 py-3 rounded-full text-xs font-bold label-mono uppercase"
                style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#fff' }}
              >
                {t.banner.cta}
              </Link>
              <a
                href="tel:0783666098"
                className="btn btn-ghost px-6 py-3 rounded-full text-xs font-bold label-mono border border-[rgba(245,246,250,0.15)] inline-flex items-center gap-2"
              >
                <PhoneCall size={14} className="text-[#38BDF8]" />
                <span>07 83 66 60 98</span>
              </a>
            </div>
          </div>
        </div>
      </SectionReveal>

    </div>
  );
}

import { useState } from 'react';
import SectionReveal from '../../components/SectionReveal';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  CheckCircle2, 
  UtensilsCrossed, 
  Calendar, 
  Sparkles, 
  Globe, 
  LayoutDashboard, 
  Languages, 
  FileEdit, 
  Palette, 
  Activity, 
  Layers, 
  Smartphone, 
  Check
} from 'lucide-react';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';
import { useJsonLd } from '../../hooks/useJsonLd';
import { useLanguage } from '../../i18n/LanguageContext';
import { caseStudiesData } from '../../i18n/caseStudiesData';

export default function CaseAtelierGourmand() {
  const { language } = useLanguage();
  const t = (caseStudiesData[language]?.atelierGourmand || caseStudiesData.fr.atelierGourmand) as any;
  const common = caseStudiesData[language] || caseStudiesData.fr;

  const [activeTab, setActiveTab] = useState<'front' | 'back' | 'tech'>('front');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activePole, setActivePole] = useState<string>('pole1');

  useDocumentMetadata(
    {
      fr: "Étude de cas : L'Atelier Gourmand | Site Vitrine & Réservation Sur-Mesure | DevSupAi",
      en: "Case Study: L'Atelier Gourmand | Restaurant Showcase & Custom Booking | DevSupAi",
    },
    {
      fr: "Découvrez l'étude de cas complète de L'Atelier Gourmand : création d'un site vitrine restaurant sur-mesure et d'un système de réservation directe sans widget tiers ni commission.",
      en: "Complete functional and technical case study for L'Atelier Gourmand: fluid guest UX, 4-step direct booking engine, 7 native languages, and zero commission fees.",
    },
    'https://www.devsupai.fr/atelier-gourmand.webp'
  );

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t.title,
    "description": t.desc,
    "image": "https://www.devsupai.fr/atelier-gourmand.webp",
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
      "@id": language === 'en' ? "https://www.devsupai.fr/en/projects/atelier-gourmand" : "https://www.devsupai.fr/projets/atelier-gourmand",
    },
  };

  useJsonLd(schemaMarkup, `case-atelier-gourmand-schema-${language}`);

  return (
    <div className="w-full bg-[#FFFFFF] text-[#4A4A4A] min-h-screen py-16 md:py-24">
      <SectionReveal className="text-left">
        <div className="container max-w-5xl mx-auto px-6">
          
          {/* Breadcrumb / Back button */}
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

          <p className="text-base sm:text-lg text-[#555555] leading-relaxed mb-8 max-w-3xl font-['Plus_Jakarta_Sans']">
            {t.desc}
          </p>

          {/* Live CTA button */}
          <div className="mb-10 flex flex-wrap items-center gap-4">
            <a
              href="https://ateliergourmand.vercel.app"
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
          <div className="rounded-2xl overflow-hidden border border-[#E5E5E5] mb-12 shadow-xl bg-[#F8F8F8] relative group">
            <img 
              src="/atelier-gourmand.webp" 
              alt="Interface du site web et réservation de L'Atelier Gourmand" 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Key Metrics / Context Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-xl bg-[#F8F8F8] border border-[#E5E5E5] mb-14">
            <div>
              <div className="text-xs font-bold font-['Montserrat'] text-[#888888] uppercase">{t.facts.sectorLabel}</div>
              <div className="text-sm font-black font-['Montserrat'] text-[#1A1A1A] mt-1">{t.facts.sectorVal}</div>
            </div>
            <div>
              <div className="text-xs font-bold font-['Montserrat'] text-[#888888] uppercase">{t.facts.deliverablesLabel}</div>
              <div className="text-sm font-black font-['Montserrat'] text-[#1A1A1A] mt-1">{t.facts.deliverablesVal}</div>
            </div>
            <div>
              <div className="text-xs font-bold font-['Montserrat'] text-[#888888] uppercase">{t.facts.langsLabel}</div>
              <div className="text-sm font-black font-['Montserrat'] text-[#1A1A1A] mt-1">{t.facts.langsVal}</div>
            </div>
            <div>
              <div className="text-xs font-bold font-['Montserrat'] text-[#888888] uppercase">{t.facts.modelLabel}</div>
              <div className="text-sm font-black font-['Montserrat'] text-[#0284C7] mt-1">{t.facts.modelVal}</div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* INTERACTIVE DOSSIER EXPLORER (Tabs Showcase)                             */}
          {/* ========================================================================= */}
          <div className="mb-16">
            <div className="text-left mb-8">
              <span className="col-pre-title">DOSSIER FONCTIONNEL &amp; TECHNIQUE</span>
              <h2 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A] tracking-tight">
                {language === 'en' ? 'Explore Solution Capabilities' : 'Explorez toutes les fonctionnalités de la solution'}
              </h2>
            </div>

            {/* Tab Navigation Pill Bar */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] mb-8">
              <button
                type="button"
                onClick={() => setActiveTab('front')}
                className={`flex-1 min-w-[180px] py-3 px-4 rounded-lg text-xs sm:text-sm font-['Montserrat'] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'front'
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'text-[#666666] hover:text-[#1A1A1A] hover:bg-white/60'
                }`}
              >
                <Smartphone size={16} />
                <span>{t.sectionTabs.front}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('back')}
                className={`flex-1 min-w-[180px] py-3 px-4 rounded-lg text-xs sm:text-sm font-['Montserrat'] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'back'
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'text-[#666666] hover:text-[#1A1A1A] hover:bg-white/60'
                }`}
              >
                <LayoutDashboard size={16} />
                <span>{t.sectionTabs.back}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tech')}
                className={`flex-1 min-w-[180px] py-3 px-4 rounded-lg text-xs sm:text-sm font-['Montserrat'] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'tech'
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'text-[#666666] hover:text-[#1A1A1A] hover:bg-white/60'
                }`}
              >
                <Layers size={16} />
                <span>{t.sectionTabs.tech}</span>
              </button>
            </div>

            {/* TAB 1: FRONT-OFFICE */}
            {activeTab === 'front' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E5E5E5] shadow-sm">
                  <span className="col-pre-title">{t.frontOffice.badge}</span>
                  <h3 className="text-xl sm:text-2xl font-black font-['Montserrat'] text-[#1A1A1A] mb-2">
                    {t.frontOffice.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#666666] leading-relaxed max-w-3xl font-['Plus_Jakarta_Sans']">
                    {t.frontOffice.subtitle}
                  </p>
                </div>

                {/* Bento Grid Front-Office */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Module 1: Accueil & Storytelling */}
                  <div className="p-6 sm:p-7 rounded-xl bg-white border border-[#E5E5E5] shadow-sm flex flex-col justify-between hover:border-[#0284C7] transition-all">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold font-['Montserrat'] text-[#0284C7] uppercase tracking-wider mb-3">
                        <Sparkles size={14} className="text-[#0284C7]" />
                        <span>{t.frontOffice.modules[0].badge}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-['Montserrat'] text-[#1A1A1A] mb-3">
                        {t.frontOffice.modules[0].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-6 font-['Plus_Jakarta_Sans']">
                        {t.frontOffice.modules[0].desc}
                      </p>
                    </div>
                    <div className="space-y-2.5 pt-4 border-t border-[#F1F5F9]">
                      {t.frontOffice.modules[0].items.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <Check size={14} className="text-[#0284C7] shrink-0 mt-1" />
                          <span className="text-xs text-[#555555] leading-relaxed font-['Plus_Jakarta_Sans']">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Module 2: Carte Gourmande */}
                  <div className="p-6 sm:p-7 rounded-xl bg-white border border-[#E5E5E5] shadow-sm flex flex-col justify-between hover:border-[#0284C7] transition-all">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold font-['Montserrat'] text-[#0284C7] uppercase tracking-wider mb-3">
                        <UtensilsCrossed size={14} className="text-[#0284C7]" />
                        <span>{t.frontOffice.modules[1].badge}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-['Montserrat'] text-[#1A1A1A] mb-3">
                        {t.frontOffice.modules[1].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-6 font-['Plus_Jakarta_Sans']">
                        {t.frontOffice.modules[1].desc}
                      </p>
                    </div>
                    <div className="space-y-2.5 pt-4 border-t border-[#F1F5F9]">
                      {t.frontOffice.modules[1].items.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <Check size={14} className="text-[#0284C7] shrink-0 mt-1" />
                          <span className="text-xs text-[#555555] leading-relaxed font-['Plus_Jakarta_Sans']">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Module 3: Moteur de Réservation 4 Étapes */}
                <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#0284C7]/40 shadow-md">
                  <div className="flex items-center gap-2 text-xs font-bold font-['Montserrat'] text-[#0284C7] uppercase tracking-wider mb-2">
                    <Calendar size={15} />
                    <span>{t.frontOffice.modules[2].badge}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black font-['Montserrat'] text-[#1A1A1A] mb-2">
                    {t.frontOffice.modules[2].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-6 max-w-2xl font-['Plus_Jakarta_Sans']">
                    {t.frontOffice.modules[2].desc}
                  </p>

                  {/* 4 Interactive Steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    {t.frontOffice.modules[2].steps.map((step: any, idx: number) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`p-4 rounded-xl text-left transition-all border cursor-pointer ${
                          activeStep === idx
                            ? 'bg-[#0284C7]/10 border-[#0284C7] shadow-sm'
                            : 'bg-[#F8F8F8] border-[#E5E5E5] hover:border-[#CCCCCC]'
                        }`}
                      >
                        <div className={`text-xs font-bold font-['Montserrat'] mb-1.5 ${activeStep === idx ? 'text-[#0284C7]' : 'text-[#888888]'}`}>
                          {language === 'en' ? `STEP ${step.num}` : `ÉTAPE ${step.num}`}
                        </div>
                        <div className="text-sm font-bold font-['Montserrat'] text-[#1A1A1A] mb-1">
                          {step.title}
                        </div>
                        <div className="text-xs text-[#666666] leading-snug font-['Plus_Jakarta_Sans']">
                          {step.desc}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Extra Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#E5E5E5]">
                    {t.frontOffice.modules[2].extraFeatures.map((feat: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F8F8F8] border border-[#E5E5E5]">
                        <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-[#555555] leading-relaxed font-['Plus_Jakarta_Sans']">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module 4: Multilinguisme & RGPD */}
                <div className="p-6 sm:p-7 rounded-xl bg-white border border-[#E5E5E5] shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold font-['Montserrat'] text-[#0284C7] uppercase tracking-wider mb-2">
                    <Globe size={15} className="text-[#0284C7]" />
                    <span>{t.frontOffice.modules[3].badge}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-['Montserrat'] text-[#1A1A1A] mb-2">
                    {t.frontOffice.modules[3].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-6 font-['Plus_Jakarta_Sans']">
                    {t.frontOffice.modules[3].desc}
                  </p>

                  {/* Language Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {t.frontOffice.modules[3].languages.map((langItem: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-full text-xs font-['Montserrat'] font-bold bg-[#F8F8F8] text-[#1A1A1A] border border-[#E5E5E5]"
                      >
                        {langItem}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-[#F1F5F9]">
                    {t.frontOffice.modules[3].items.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check size={14} className="text-[#0284C7] shrink-0 mt-1" />
                        <span className="text-xs text-[#555555] leading-relaxed font-['Plus_Jakarta_Sans']">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: BACK-OFFICE */}
            {activeTab === 'back' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E5E5E5] shadow-sm">
                  <span className="col-pre-title">{t.backOffice.badge}</span>
                  <h3 className="text-xl sm:text-2xl font-black font-['Montserrat'] text-[#1A1A1A] mb-2">
                    {t.backOffice.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#666666] leading-relaxed max-w-3xl font-['Plus_Jakarta_Sans']">
                    {t.backOffice.subtitle}
                  </p>
                </div>

                {/* 4 Pôles Navigation Switcher */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {t.backOffice.poles.map((pole: any) => (
                    <button
                      type="button"
                      key={pole.id}
                      onClick={() => setActivePole(pole.id)}
                      className={`p-4 rounded-xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                        activePole === pole.id
                          ? 'bg-[#0284C7]/10 border-[#0284C7] shadow-sm'
                          : 'bg-white border-[#E5E5E5] hover:border-[#CCCCCC]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-bold font-['Montserrat'] text-[#0284C7]">
                            PÔLE {pole.number}
                          </span>
                          <span className={activePole === pole.id ? 'text-[#0284C7]' : 'text-[#888888]'}>
                            {pole.id === 'pole1' && <LayoutDashboard size={15} />}
                            {pole.id === 'pole2' && <FileEdit size={15} />}
                            {pole.id === 'pole3' && <Languages size={15} />}
                            {pole.id === 'pole4' && <Palette size={15} />}
                          </span>
                        </div>
                        <div className="text-sm font-bold font-['Montserrat'] text-[#1A1A1A] mb-1">
                          {pole.title.replace(/^Pôle\s+/, '')}
                        </div>
                      </div>
                      <div className="text-xs text-[#666666] line-clamp-2 mt-2 font-['Plus_Jakarta_Sans']">
                        {pole.tagline}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Active Pôle Content Display */}
                {t.backOffice.poles
                  .filter((p: any) => p.id === activePole)
                  .map((pole: any) => (
                    <div
                      key={pole.id}
                      className="p-6 sm:p-8 rounded-xl bg-white border border-[#E5E5E5] shadow-md space-y-6"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
                        <div>
                          <div className="text-xs font-bold font-['Montserrat'] text-[#0284C7] mb-1">
                            {pole.title}
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black font-['Montserrat'] text-[#1A1A1A]">
                            {pole.tagline}
                          </h3>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-[#0284C7]/10 text-[#0284C7] text-xs font-bold font-['Montserrat'] border border-[#0284C7]/20">
                          {pole.features.length} {language === 'en' ? 'Modules' : 'Fonctionnalités'}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pole.features.map((feat: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E5E5] space-y-2 hover:border-[#0284C7] transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle2 size={15} className="text-[#0284C7] shrink-0" />
                              <div className="text-sm font-bold font-['Montserrat'] text-[#1A1A1A]">
                                {feat.name}
                              </div>
                            </div>
                            <p className="text-xs text-[#666666] leading-relaxed pl-6 font-['Plus_Jakarta_Sans']">
                              {feat.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* TAB 3: TECH ARCHITECTURE */}
            {activeTab === 'tech' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E5E5E5] shadow-sm">
                  <span className="col-pre-title">{t.techArchitecture.badge}</span>
                  <h3 className="text-xl sm:text-2xl font-black font-['Montserrat'] text-[#1A1A1A] mb-2">
                    {t.techArchitecture.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#666666] leading-relaxed max-w-3xl font-['Plus_Jakarta_Sans']">
                    {t.techArchitecture.subtitle}
                  </p>
                </div>

                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {t.techArchitecture.pillars.map((pillar: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-6 rounded-xl bg-white border border-[#E5E5E5] space-y-3 shadow-sm hover:border-[#0284C7] transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#0284C7]/10 border border-[#0284C7]/20 flex items-center justify-center text-[#0284C7] mb-2">
                        {idx === 0 && <Smartphone size={20} />}
                        {idx === 1 && <Activity size={20} />}
                        {idx === 2 && <Globe size={20} />}
                        {idx === 3 && <Sparkles size={20} />}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold font-['Montserrat'] text-[#1A1A1A]">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-['Plus_Jakarta_Sans']">
                        {pillar.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Comparison Table */}
                <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E5E5E5] shadow-md space-y-6">
                  <div>
                    <span className="col-pre-title">
                      {language === 'en' ? 'PROFITABILITY & INDEPENDENCE' : 'RENTABILITÉ & INDÉPENDANCE'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black font-['Montserrat'] text-[#1A1A1A] mb-1">
                      {t.techArchitecture.comparisonTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#666666] font-['Plus_Jakarta_Sans']">
                      {t.techArchitecture.comparisonSub}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {t.techArchitecture.comparisonItems.map((comp: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E5E5] grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                      >
                        <div className="md:col-span-4 text-xs sm:text-sm font-bold font-['Montserrat'] text-[#1A1A1A]">
                          {comp.label}
                        </div>
                        <div className="md:col-span-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                          <strong className="text-emerald-950 block mb-0.5 font-['Montserrat']">
                            {language === 'en' ? 'DevSupAi Bespoke:' : 'Solution Sur-Mesure :'}
                          </strong>
                          {comp.custom}
                        </div>
                        <div className="md:col-span-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 font-medium">
                          <strong className="text-red-950 block mb-0.5 font-['Montserrat']">
                            {language === 'en' ? 'Third-Party Platforms:' : 'Plateformes Tierces :'}
                          </strong>
                          {comp.thirdParty}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Case Narrative Q&A */}
          <div className="pt-8 border-t border-[#E5E5E5] space-y-8 text-sm max-w-none text-[#555555] font-['Plus_Jakarta_Sans'] leading-relaxed">
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

          {/* Bottom CTA Box */}
          <div className="mt-14 p-8 rounded-2xl bg-[#F8F8F8] border border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h3 className="text-lg sm:text-xl font-black font-['Montserrat'] text-[#1A1A1A] mb-2">{t.bannerTitle}</h3>
              <p className="text-xs sm:text-sm text-[#666666] max-w-lg font-['Plus_Jakarta_Sans']">{t.bannerDesc}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://ateliergourmand.vercel.app"
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
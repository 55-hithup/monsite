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
      fr: "Étude de cas & Solution : L'Atelier Gourmand — Site Bistronomique & Réservation Directe | DevSupAi",
      en: "Case Study & Solution: L'Atelier Gourmand — Showcase & Direct Online Booking | DevSupAi",
    },
    {
      fr: "Dossier fonctionnel et technique complet de L'Atelier Gourmand : expérience visiteur fluide, moteur de réservation 4 étapes, 7 langues et dashboard de pilotage sans commission ni abonnement.",
      en: "Complete functional and technical case study for L'Atelier Gourmand: fluid guest UX, 4-step direct booking engine, 7 native languages, and all-in-one dashboard with zero commissions or software subscriptions.",
    },
    "/projets/atelier-gourmand"
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
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <div className="wrap max-w-5xl">
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

        <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-3xl">
          {t.desc}
        </p>

        {/* Live CTA button */}
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <a
            href="https://ateliergourmand.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-xs label-mono inline-flex items-center gap-2 px-6 py-3 rounded-full shadow-lg transition-transform hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#0B122C', fontWeight: 700 }}
          >
            <span>{t.ctaLive}</span>
            <ExternalLink size={14} />
          </a>
          <span className="text-xs text-emerald-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {t.liveBadge}
          </span>
        </div>

        {/* Hero Visual Mockup */}
        <div className="rounded-2xl overflow-hidden border border-[rgba(245,246,250,0.08)] mb-12 shadow-2xl bg-[#121729] relative group">
          <img 
            src="/atelier-gourmand.webp" 
            alt="Interface du site web et réservation de L'Atelier Gourmand" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Key Metrics / Context Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] mb-14">
          <div>
            <div className="text-xs label-mono text-text-secondary">{t.facts.sectorLabel}</div>
            <div className="text-sm font-bold text-text-primary mt-1">{t.facts.sectorVal}</div>
          </div>
          <div>
            <div className="text-xs label-mono text-text-secondary">{t.facts.deliverablesLabel}</div>
            <div className="text-sm font-bold text-text-primary mt-1">{t.facts.deliverablesVal}</div>
          </div>
          <div>
            <div className="text-xs label-mono text-text-secondary">{t.facts.langsLabel}</div>
            <div className="text-sm font-bold text-text-primary mt-1">{t.facts.langsVal}</div>
          </div>
          <div>
            <div className="text-xs label-mono text-text-secondary">{t.facts.modelLabel}</div>
            <div className="text-sm font-bold text-emerald-400 mt-1">{t.facts.modelVal}</div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE DOSSIER EXPLORER (Bento & Tabs Showcase)                     */}
        {/* ========================================================================= */}
        <div className="mb-16">
          <div className="text-center sm:text-left mb-8">
            <div className="text-xs label-mono text-accent uppercase tracking-wider mb-2">
              DOSSIER FONCTIONNEL & TECHNIQUE
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
              {language === 'en' ? 'Explore Solution Capabilities' : 'Explorez toutes les fonctionnalités de la solution'}
            </h2>
          </div>

          {/* Tab Navigation Pill Bar */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0f1424] border border-[rgba(245,246,250,0.08)] mb-8">
            <button
              onClick={() => setActiveTab('front')}
              className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'front'
                  ? 'bg-gradient-to-r from-[#2E8FE0] to-[#6B4FE0] text-[#0B122C] shadow-md font-bold'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
            >
              <Smartphone size={16} />
              <span>{t.sectionTabs.front}</span>
            </button>

            <button
              onClick={() => setActiveTab('back')}
              className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'back'
                  ? 'bg-gradient-to-r from-[#2E8FE0] to-[#6B4FE0] text-[#0B122C] shadow-md font-bold'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
            >
              <LayoutDashboard size={16} />
              <span>{t.sectionTabs.back}</span>
            </button>

            <button
              onClick={() => setActiveTab('tech')}
              className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'tech'
                  ? 'bg-gradient-to-r from-[#2E8FE0] to-[#6B4FE0] text-[#0B122C] shadow-md font-bold'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
            >
              <Layers size={16} />
              <span>{t.sectionTabs.tech}</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: FRONT-OFFICE / VISITEUR                                            */}
          {/* ========================================================================= */}
          {activeTab === 'front' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="p-6 rounded-2xl bg-[#121729]/80 border border-[rgba(245,246,250,0.08)]">
                <div className="text-xs label-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">
                  {t.frontOffice.badge}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                  {t.frontOffice.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-3xl">
                  {t.frontOffice.subtitle}
                </p>
              </div>

              {/* Bento Grid Front-Office */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Module 1: Accueil & Storytelling */}
                <div className="p-6 sm:p-7 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs label-mono text-purple-300 uppercase tracking-wider mb-3">
                      <Sparkles size={14} className="text-cyan-400" />
                      <span>{t.frontOffice.modules[0].badge}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-3">
                      {t.frontOffice.modules[0].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                      {t.frontOffice.modules[0].desc}
                    </p>
                  </div>
                  <div className="space-y-2.5 pt-4 border-t border-[rgba(245,246,250,0.06)]">
                    {t.frontOffice.modules[0].items.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check size={14} className="text-cyan-400 shrink-0 mt-1" />
                        <span className="text-xs text-text-secondary leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module 2: Carte Gourmande */}
                <div className="p-6 sm:p-7 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs label-mono text-purple-300 uppercase tracking-wider mb-3">
                      <UtensilsCrossed size={14} className="text-cyan-400" />
                      <span>{t.frontOffice.modules[1].badge}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-3">
                      {t.frontOffice.modules[1].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                      {t.frontOffice.modules[1].desc}
                    </p>
                  </div>
                  <div className="space-y-2.5 pt-4 border-t border-[rgba(245,246,250,0.06)]">
                    {t.frontOffice.modules[1].items.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check size={14} className="text-cyan-400 shrink-0 mt-1" />
                        <span className="text-xs text-text-secondary leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Module 3: Moteur de Réservation 4 Étapes (Interactive Stepper Preview) */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#121729]/80 border border-[#2E8FE0]/30 shadow-xl">
                <div className="flex items-center gap-2 text-xs label-mono text-cyan-400 uppercase tracking-wider mb-2">
                  <Calendar size={15} />
                  <span>{t.frontOffice.modules[2].badge}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                  {t.frontOffice.modules[2].title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 max-w-2xl">
                  {t.frontOffice.modules[2].desc}
                </p>

                {/* 4 Interactive Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {t.frontOffice.modules[2].steps.map((step: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`p-4 rounded-xl text-left transition-all border ${
                        activeStep === idx
                          ? 'bg-[#2E8FE0]/15 border-[#2E8FE0] shadow-md'
                          : 'bg-[#0f1424]/70 border-[rgba(245,246,250,0.06)] hover:border-white/20'
                      }`}
                    >
                      <div className={`text-xs label-mono font-bold mb-1.5 ${activeStep === idx ? 'text-cyan-300' : 'text-purple-300'}`}>
                        {language === 'en' ? `STEP ${step.num}` : `ÉTAPE ${step.num}`}
                      </div>
                      <div className="text-sm font-bold text-text-primary mb-1">
                        {step.title}
                      </div>
                      <div className="text-xs text-text-secondary leading-snug">
                        {step.desc}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Extra Features (Self tracking + Phone fallback) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[rgba(245,246,250,0.08)]">
                  {t.frontOffice.modules[2].extraFeatures.map((feat: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0b1021] border border-[rgba(245,246,250,0.04)]">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-text-secondary leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module 4: Multilinguisme 7 Langues & RGPD */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)]">
                <div className="flex items-center gap-2 text-xs label-mono text-purple-300 uppercase tracking-wider mb-2">
                  <Globe size={15} className="text-cyan-400" />
                  <span>{t.frontOffice.modules[3].badge}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">
                  {t.frontOffice.modules[3].title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                  {t.frontOffice.modules[3].desc}
                </p>

                {/* Language Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {t.frontOffice.modules[3].languages.map((langItem: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full text-xs font-mono bg-[#0b1021] text-text-primary border border-cyan-500/30"
                    >
                      {langItem}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-[rgba(245,246,250,0.06)]">
                  {t.frontOffice.modules[3].items.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <Check size={14} className="text-cyan-400 shrink-0 mt-1" />
                      <span className="text-xs text-text-secondary leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: BACK-OFFICE / RESTAURATEUR (4 PÔLES MÉTIER)                         */}
          {/* ========================================================================= */}
          {activeTab === 'back' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="p-6 rounded-2xl bg-[#121729]/80 border border-[rgba(245,246,250,0.08)]">
                <div className="text-xs label-mono text-purple-300 font-bold uppercase tracking-wider mb-2">
                  {t.backOffice.badge}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                  {t.backOffice.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-3xl">
                  {t.backOffice.subtitle}
                </p>
              </div>

              {/* 4 Pôles Navigation Switcher */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {t.backOffice.poles.map((pole: any) => (
                  <button
                    key={pole.id}
                    onClick={() => setActivePole(pole.id)}
                    className={`p-4 rounded-xl text-left transition-all border flex flex-col justify-between ${
                      activePole === pole.id
                        ? 'bg-gradient-to-br from-[#2E8FE0]/20 to-[#6B4FE0]/20 border-[#2E8FE0] shadow-lg'
                        : 'bg-[#121729]/60 border-[rgba(245,246,250,0.06)] hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-xs label-mono font-bold text-cyan-400">
                          PÔLE {pole.number}
                        </span>
                        <span className={activePole === pole.id ? 'text-cyan-300' : 'text-purple-300'}>
                          {pole.id === 'pole1' && <LayoutDashboard size={15} />}
                          {pole.id === 'pole2' && <FileEdit size={15} />}
                          {pole.id === 'pole3' && <Languages size={15} />}
                          {pole.id === 'pole4' && <Palette size={15} />}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-text-primary mb-1">
                        {pole.title.replace(/^Pôle\s+/, '')}
                      </div>
                    </div>
                    <div className="text-xs text-text-secondary line-clamp-2 mt-2 font-light">
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
                    className="p-6 sm:p-8 rounded-2xl bg-[#121729]/80 border border-[#2E8FE0]/30 shadow-xl space-y-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[rgba(245,246,250,0.08)]">
                      <div>
                        <div className="text-xs label-mono text-cyan-400 font-bold mb-1">
                          {pole.title}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                          {pole.tagline}
                        </h3>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs label-mono font-bold border border-cyan-500/20">
                        {pole.features.length} {language === 'en' ? 'Modules' : 'Fonctionnalités'}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pole.features.map((feat: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-[#0b1021] border border-[rgba(245,246,250,0.06)] space-y-2 hover:border-[#2E8FE0]/40 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                            <div className="text-sm font-bold text-text-primary">
                              {feat.name}
                            </div>
                          </div>
                          <p className="text-xs text-text-secondary leading-relaxed pl-6">
                            {feat.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: ARCHITECTURE & RENTABILITÉ                                         */}
          {/* ========================================================================= */}
          {activeTab === 'tech' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="p-6 rounded-2xl bg-[#121729]/80 border border-[rgba(245,246,250,0.08)]">
                <div className="text-xs label-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">
                  {t.techArchitecture.badge}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                  {t.techArchitecture.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-3xl">
                  {t.techArchitecture.subtitle}
                </p>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {t.techArchitecture.pillars.map((pillar: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2">
                      {idx === 0 && <Smartphone size={20} />}
                      {idx === 1 && <Activity size={20} />}
                      {idx === 2 && <Globe size={20} />}
                      {idx === 3 && <Sparkles size={20} />}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-text-primary">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Value Comparison Section (DevSupAi vs Third-Party) */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#121729]/90 border border-cyan-500/30 shadow-2xl space-y-6">
                <div>
                  <div className="text-xs label-mono text-emerald-400 font-bold mb-1 uppercase tracking-wider">
                    {language === 'en' ? 'PROFITABILITY & INDEPENDENCE' : 'RENTABILITÉ & INDÉPENDANCE'}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">
                    {t.techArchitecture.comparisonTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary">
                    {t.techArchitecture.comparisonSub}
                  </p>
                </div>

                <div className="space-y-3">
                  {t.techArchitecture.comparisonItems.map((comp: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#0b1021] border border-[rgba(245,246,250,0.06)] grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                    >
                      <div className="md:col-span-4 text-xs sm:text-sm font-bold text-text-primary">
                        {comp.label}
                      </div>
                      <div className="md:col-span-4 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-medium">
                        <strong className="text-white block mb-0.5">
                          {language === 'en' ? 'DevSupAi Bespoke:' : 'Solution Sur-Mesure :'}
                        </strong>
                        {comp.custom}
                      </div>
                      <div className="md:col-span-4 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300 font-medium">
                        <strong className="text-white block mb-0.5">
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

        {/* ========================================================================= */}
        {/* CASE NARRATIVE QUESTIONS & ANSWERS                                        */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-[rgba(245,246,250,0.08)] prose text-text-secondary leading-relaxed space-y-8 text-sm max-w-none">
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

        {/* ========================================================================= */}
        {/* LIVE CTA BOX                                                              */}
        {/* ========================================================================= */}
        <div className="mt-14 p-8 rounded-2xl bg-[#121729]/90 border border-[#2E8FE0]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">{t.bannerTitle}</h3>
            <p className="text-xs sm:text-sm text-text-secondary max-w-lg">{t.bannerDesc}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://ateliergourmand.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-xs label-mono inline-flex items-center gap-2 px-6 py-3 rounded-full"
              style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#0B122C', fontWeight: 700 }}
            >
              <span>{t.bannerBtn}</span>
              <ExternalLink size={14} />
            </a>
            <a
              href={language === 'en' ? '/en#contact' : '/#contact'}
              className="btn btn-ghost text-xs label-mono px-5 py-3 rounded-full border border-white/20 hover:border-cyan-400"
            >
              <span>{language === 'en' ? 'Request a Quote' : 'Demander un devis'}</span>
            </a>
          </div>
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
import SectionReveal from './SectionReveal';
import MagneticWrapper from './MagneticWrapper';
import { Check, X, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export default function Comparison() {
  const { language } = useLanguage();
  const t = translations[language].comparison;

  return (
    <SectionReveal id="comparatif" className="py-20 md:py-28 lg:py-36" style={{ position: 'relative' }}>
      <div className="wrap-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Text & Benefits */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 text-left space-y-5 reveal">
            <div className="eyebrow">{t.eyebrow}</div>
            
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight">
              {t.title}
            </h2>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
              {t.desc}
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2 border-y border-[rgba(245,246,250,0.08)] py-4">
              {t.checkpoints.map((cp, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-text-secondary leading-relaxed">
                    <strong className="text-text-primary font-semibold">{cp.title} </strong>
                    {cp.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-1">
              <MagneticWrapper range={25} strength={0.2}>
                <a
                  href="#contact"
                  className="btn btn-primary w-full sm:w-auto justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)',
                    color: '#0B122C',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 700,
                  }}
                >
                  <span>{t.cta}</span>
                  <ArrowRight size={14} className="text-[#0B122C]" />
                </a>
              </MagneticWrapper>
            </div>
          </div>

          {/* Right Column: 2 Cards */}
          <div className="lg:col-span-7 flex flex-col gap-5 lg:pt-9">
            
            {/* Card 1: Custom DevSupAi */}
            <div className="group relative rounded-2xl overflow-hidden border-2 border-[#2E8FE0] shadow-[0_0_35px_rgba(46,143,224,0.18)] p-6 sm:p-7 text-left reveal cursor-pointer min-h-[300px] flex flex-col justify-between">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url(/compare_after.webp)' }}
              />

              {/* High-contrast dark gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, rgba(7, 9, 19, 0.96) 0%, rgba(7, 9, 19, 0.88) 55%, rgba(7, 9, 19, 0.72) 100%)',
                }}
              />

              {/* Text content */}
              <div className="relative z-10 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:translate-y-2 group-hover:pointer-events-none">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs label-mono px-3 py-1 rounded-full font-bold uppercase bg-[#2E8FE0]/25 text-cyan-300 border border-[#2E8FE0]/50 flex items-center gap-1.5 backdrop-blur-md">
                    <ShieldCheck size={12} />
                    <span>{t.customCard.badge}</span>
                  </span>
                  <span className="text-xs font-bold text-cyan-300 drop-shadow">{t.customCard.tag}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 tracking-tight">
                  {t.customCard.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                  {t.customCard.desc}
                </p>

                <ul className="space-y-2.5 pt-2 border-t border-white/10">
                  {t.customCard.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-snug">
                      <Check size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>{it.bold} </strong>{it.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card 2: Generic Templates */}
            <div className="group relative rounded-2xl overflow-hidden border border-[rgba(245,246,250,0.08)] hover:border-red-500/40 p-6 sm:p-7 text-left reveal cursor-pointer min-h-[300px] flex flex-col justify-between">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url(/compare_before.webp)' }}
              />

              {/* High-contrast dark gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, rgba(7, 9, 19, 0.96) 0%, rgba(7, 9, 19, 0.88) 55%, rgba(7, 9, 19, 0.72) 100%)',
                }}
              />

              {/* Text content */}
              <div className="relative z-10 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:translate-y-2 group-hover:pointer-events-none">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs label-mono px-3 py-1 rounded-full font-bold uppercase bg-red-500/20 text-red-300 border border-red-500/40 backdrop-blur-md">
                    {t.genericCard.badge}
                  </span>
                  <span className="text-xs text-red-400 font-medium drop-shadow">{t.genericCard.tag}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 tracking-tight">
                  {t.genericCard.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                  {t.genericCard.desc}
                </p>

                <ul className="space-y-2.5 pt-2 border-t border-white/10">
                  {t.genericCard.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
                      <X size={15} className="text-red-400 shrink-0 mt-0.5" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>
      </div>
    </SectionReveal>
  );
}

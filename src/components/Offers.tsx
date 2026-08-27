import SectionReveal from './SectionReveal';
import MagneticWrapper from './MagneticWrapper';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export default function Offers() {
  const { language } = useLanguage();
  const t = translations[language].offers;

  return (
    <SectionReveal id="services" className="py-20 md:py-28 lg:py-36" style={{ position: 'relative' }}>
      <div className="wrap-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Text & Reassurance Checklist */}
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

            {/* Google Business Profile Addon */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs label-mono text-cyan-300 font-bold uppercase tracking-wider">
                  {t.monthlyOption.badge}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-bold text-text-primary">{t.monthlyOption.price}</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed font-light">
                {t.monthlyOption.desc}
              </p>
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
                  <span>{t.ctaQuote}</span>
                  <ArrowRight size={14} className="text-[#0B122C]" />
                </a>
              </MagneticWrapper>
            </div>
          </div>

          {/* Right Column: 3 Packages */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {t.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-6 sm:p-7 rounded-2xl relative transition-all duration-300 reveal text-left ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-[#141b33] via-[#0f152b] to-[#141b33] border-2 border-[#2E8FE0] shadow-[0_0_35px_rgba(46,143,224,0.18)]'
                    : 'bg-[#121729]/70 border border-[rgba(245,246,250,0.08)] hover:border-[rgba(245,246,250,0.2)]'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 right-6 px-3.5 py-0.5 rounded-full bg-[#2E8FE0] text-[#0B122C] text-xs label-mono font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <Sparkles size={11} />
                    <span>{pkg.recommendation || 'Recommandé PME'}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch">
                  
                  {/* Left part: Badge, Title, Description, Button */}
                  <div className="sm:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-xs label-mono px-3 py-1 rounded-full font-bold uppercase ${
                          pkg.popular
                            ? 'bg-[#2E8FE0]/20 text-cyan-300 border border-[#2E8FE0]/40'
                            : 'bg-white/[0.04] text-text-secondary border border-white/5'
                        }`}>
                          {pkg.badge}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                        {pkg.name}
                      </h3>

                      <p className="text-xs text-text-secondary leading-relaxed font-light mb-4">
                        {pkg.desc}
                      </p>
                    </div>

                    <div className="pt-2">
                      <a
                        href={`#contact?pack=${pkg.id}`}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold label-mono transition-all duration-200 shadow-md ${
                          pkg.popular
                            ? 'bg-[#2E8FE0] text-[#0B122C] hover:bg-cyan-200'
                            : 'bg-white/10 text-text-primary hover:bg-white/20 border border-white/15'
                        }`}
                      >
                        <span>{pkg.ctaText}</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>

                  {/* Right part: Features & Grand Price */}
                  <div className="sm:col-span-7 sm:border-l sm:border-[rgba(245,246,250,0.06)] sm:pl-5 pt-3 sm:pt-0 flex flex-col justify-between">
                    <div>
                      <span className="text-xs label-mono uppercase text-purple-300 font-bold tracking-wider block mb-2.5">
                        {t.includedTitle}
                      </span>
                      <ul className="space-y-1.5 mb-4">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="text-xs text-text-secondary flex items-start gap-2 leading-snug">
                            <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price in bottom right */}
                    <div className="pt-3 mt-3 border-t border-[rgba(245,246,250,0.08)] flex flex-wrap items-baseline justify-end gap-3">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs text-slate-400 font-semibold label-mono uppercase">{t.startingFrom}</span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-white label-mono tracking-tight">
                          {pkg.price}
                        </span>
                      </div>
                      <span className="text-xs label-mono text-cyan-300 font-bold uppercase tracking-wider">
                        • {pkg.priceSub}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </SectionReveal>
  );
}

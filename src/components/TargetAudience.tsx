import SectionReveal from './SectionReveal';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export default function TargetAudience() {
  const { language } = useLanguage();
  const t = translations[language].solutions;

  return (
    <SectionReveal id="solutions" className="section-pad">
      <div className="wrap">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="eyebrow reveal justify-center">{t.eyebrow}</div>
          <h2 className="section-title reveal mt-2 mb-4">
            {t.title}
          </h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed reveal bg-[#121729]/90 p-4 rounded-xl border border-[#2E8FE0]/30 text-left">
            {t.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card PME */}
          <div className="reveal p-8 rounded-2xl bg-[#121729]/70 border border-[#2E8FE0]/30 hover:border-[#2E8FE0]/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#2E8FE0]/20 border-b border-l border-[#2E8FE0]/40 text-xs label-mono text-cyan-300 rounded-bl-xl font-bold">
              {t.pme.badge}
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl bg-[#2E8FE0]/15 border border-[#2E8FE0]/30 flex items-center justify-center text-[#2E8FE0] mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M3 21h18" />
                  <path d="M3 7v14" />
                  <path d="M13 3v18" />
                  <path d="M21 11v10" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-3">
                {t.pme.title}
              </h3>

              <div className="p-3 rounded-lg bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-xs text-text-primary font-medium mb-4">
                <strong>{t.pme.caseConcrete}</strong> {t.pme.caseText}
              </div>

              <p className="text-xs text-text-secondary leading-relaxed mb-6">
                {t.pme.explanation}
              </p>

              <div className="space-y-2 mb-8 text-xs text-text-secondary">
                <div className="font-bold text-text-primary mb-2 label-mono text-xs text-purple-300 uppercase">
                  {t.pme.listTitle}
                </div>
                {t.pme.bullets.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[#2E8FE0] font-bold">-</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(245,246,250,0.06)]">
              <a href="#contact" className="btn btn-primary text-xs w-full text-center py-3" style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#fff' }}>
                {t.pme.cta}
              </a>
            </div>
          </div>

          {/* Card Associations */}
          <div className="reveal p-8 rounded-2xl bg-[#121729]/70 border border-[#6B4FE0]/30 hover:border-[#6B4FE0]/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#6B4FE0]/20 border-b border-l border-[#6B4FE0]/40 text-xs label-mono text-purple-300 rounded-bl-xl font-bold">
              {t.asso.badge}
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl bg-[#6B4FE0]/15 border border-[#6B4FE0]/30 flex items-center justify-center text-[#6B4FE0] mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-3">
                {t.asso.title}
              </h3>

              <div className="p-3 rounded-lg bg-[#6B4FE0]/10 border border-[#6B4FE0]/20 text-xs text-text-primary font-medium mb-4">
                <strong>{t.asso.objectiveLabel}</strong> {t.asso.objectiveText}
              </div>

              <p className="text-xs text-text-secondary leading-relaxed mb-6">
                {t.asso.explanation}
              </p>

              <div className="space-y-2 mb-8 text-xs text-text-secondary">
                <div className="font-bold text-text-primary mb-2 label-mono text-xs text-purple-300 uppercase">
                  {t.asso.listTitle}
                </div>
                {t.asso.bullets.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[#6B4FE0] font-bold">-</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(245,246,250,0.06)]">
              <a href="#contact" className="btn btn-ghost text-xs w-full text-center py-3 border border-[rgba(245,246,250,0.12)]">
                {t.asso.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

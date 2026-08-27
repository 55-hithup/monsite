import SectionReveal from './SectionReveal';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export default function Process() {
  const { language } = useLanguage();
  const t = translations[language].process;

  return (
    <SectionReveal id="process" className="section-pad">
      <div className="wrap">
        <div className="text-center mb-12">
          <div className="eyebrow reveal justify-center">{t.eyebrow}</div>
          <h2 className="section-title reveal mt-2">{t.title}</h2>
          <p className="text-sm text-text-secondary mt-3 reveal max-w-2xl mx-auto">
            {t.desc}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 reveal">
          {t.steps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] hover:border-[#2E8FE0]/30 transition-all duration-300 flex flex-col text-left group"
            >
              <span className="text-xs label-mono text-cyan-300 font-bold mb-4 block group-hover:text-[#2E8FE0] transition-colors duration-300">
                {step.num}
              </span>
              <h3 className="text-base font-bold text-text-primary mb-3 leading-snug">
                {step.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

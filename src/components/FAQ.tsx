import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import SectionReveal from './SectionReveal';
import { useJsonLd } from '../hooks/useJsonLd';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { faqData } from '../i18n/faqData';

export default function FAQ() {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [activeLeftIndex, setActiveLeftIndex] = useState<number | null>(null);
  const [activeRightIndex, setActiveRightIndex] = useState<number | null>(null);
  const { language } = useLanguage();
  const t = translations[language].faq;
  const currentFaq = faqData[language] || faqData.fr;

  const faqColumnLeft = currentFaq.columnLeft;
  const faqColumnRight = currentFaq.columnRight;
  const allFaq = [...faqColumnLeft, ...faqColumnRight];

  const faqSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaq.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${item.short} ${item.detail}`,
      },
    })),
  };

  useJsonLd(faqSchemaMarkup, `faq-schema-${language}`);

  return (
    <SectionReveal id="faq" className="faq-section">

      <div className="wrap max-w-6xl">
        <div className="text-center mb-6">
          <div className="eyebrow reveal justify-center">{t.eyebrow}</div>
          <h2 className="section-title reveal mt-2">{t.title}</h2>
          <p className="text-sm text-text-secondary mt-3 reveal max-w-2xl mx-auto">
            {t.desc}
          </p>
        </div>

        {/* Global FAQ Toggle Button */}
        <div className="flex justify-center mb-6 reveal">
          <button
            onClick={() => setIsFaqOpen(!isFaqOpen)}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#2E8FE0]/40 bg-[#121729]/80 text-xs md:text-sm font-semibold text-[#2E8FE0] hover:bg-[#2E8FE0]/10 transition-all duration-300 shadow-[0_0_20px_rgba(46,143,224,0.1)] cursor-pointer"
            aria-expanded={isFaqOpen}
          >
            <HelpCircle size={16} />
            <span>{isFaqOpen ? t.toggleHide : t.toggleShow}</span>
            {isFaqOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Collapsible FAQ Double Column */}
        <div
          className="transition-all duration-500 ease-in-out overflow-hidden text-left"
          style={{
            maxHeight: isFaqOpen ? '2500px' : '0px',
            opacity: isFaqOpen ? 1 : 0,
            pointerEvents: isFaqOpen ? 'auto' : 'none',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            
            {/* Left Column */}
            <div>
              <h3 className="text-xs label-mono font-bold text-text-primary uppercase tracking-wider mb-6 border-b border-[rgba(245,246,250,0.08)] pb-2">
                {t.column1Title}
              </h3>
              <div className="faq-list space-y-4">
                {faqColumnLeft.map((item, idx) => {
                  const isActive = activeLeftIndex === idx;
                  return (
                    <div key={idx} className={`faq-item rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] transition-colors ${isActive ? 'active border-[#2E8FE0]/40' : ''}`}>
                      <button
                        className="faq-q w-full text-left flex items-center justify-between cursor-pointer focus:outline-none gap-4"
                        onClick={() => setActiveLeftIndex(isActive ? null : idx)}
                        aria-expanded={isActive}
                      >
                        <span className="font-semibold text-text-primary text-sm md:text-base leading-snug">{item.q}</span>
                        <span className="faq-plus flex-shrink-0 text-accent font-bold text-lg">{isActive ? '−' : '+'}</span>
                      </button>
                      <div
                        className="faq-a transition-all duration-300 ease-in-out"
                        style={{
                          maxHeight: isActive ? '500px' : '0px',
                          opacity: isActive ? 1 : 0,
                          overflow: 'hidden',
                        }}
                      >
                        <div className="faq-a-in pt-4 pb-5 px-6 border-t border-[rgba(245,246,250,0.06)] text-xs md:text-sm text-text-secondary space-y-2">
                          <p className="p-3 rounded-lg bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-text-primary font-medium">
                            {item.short}
                          </p>
                          <p className="leading-relaxed pt-1">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h3 className="text-xs label-mono font-bold text-text-primary uppercase tracking-wider mb-6 border-b border-[rgba(245,246,250,0.08)] pb-2">
                {t.column2Title}
              </h3>
              <div className="faq-list space-y-4">
                {faqColumnRight.map((item, idx) => {
                  const isActive = activeRightIndex === idx;
                  return (
                    <div key={idx} className={`faq-item rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] transition-colors ${isActive ? 'active border-[#2E8FE0]/40' : ''}`}>
                      <button
                        className="faq-q w-full text-left flex items-center justify-between cursor-pointer focus:outline-none gap-4"
                        onClick={() => setActiveRightIndex(isActive ? null : idx)}
                        aria-expanded={isActive}
                      >
                        <span className="font-semibold text-text-primary text-sm md:text-base leading-snug">{item.q}</span>
                        <span className="faq-plus flex-shrink-0 text-accent font-bold text-lg">{isActive ? '−' : '+'}</span>
                      </button>
                      <div
                        className="faq-a transition-all duration-300 ease-in-out"
                        style={{
                          maxHeight: isActive ? '500px' : '0px',
                          opacity: isActive ? 1 : 0,
                          overflow: 'hidden',
                        }}
                      >
                        <div className="faq-a-in pt-4 pb-5 px-6 border-t border-[rgba(245,246,250,0.06)] text-xs md:text-sm text-text-secondary space-y-2">
                          <p className="p-3 rounded-lg bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-text-primary font-medium">
                            {item.short}
                          </p>
                          <p className="leading-relaxed pt-1">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

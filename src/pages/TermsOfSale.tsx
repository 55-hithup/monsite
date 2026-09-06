import SectionReveal from '../components/SectionReveal';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { useLanguage } from '../i18n/LanguageContext';
import { pagesData } from '../i18n/pagesData';

export default function TermsOfSale() {
  const { language } = useLanguage();
  const t = pagesData[language]?.cgv || pagesData.fr.cgv;

  useDocumentMetadata(
    {
      fr: "Conditions Générales de Vente (CGV) | DevSupAi — Alexandre Pabst",
      en: "General Terms of Sale (GTS) | DevSupAi — Alexandre Pabst",
    },
    {
      fr: "Consultez les Conditions Générales de Vente (CGV) régissant les prestations de développement web et logiciel sur-mesure réalisées par DevSupAi (Alexandre Pabst EI).",
      en: "Read the General Terms of Sale (GTS) governing bespoke web development, software engineering, and digital consulting services by DevSupAi.",
    },
    'https://www.devsupai.fr/hero-bg-mockup.webp'
  );

  return (
    <div className="w-full bg-white text-[#4A4A4A] min-h-screen py-16 md:py-24">
      <SectionReveal className="text-left">
        <div className="container max-w-4xl mx-auto px-6">
          <span className="col-pre-title">{t.eyebrow}</span>
          <h1 className="text-3xl sm:text-4xl font-black font-['Montserrat'] text-[#1A1A1A] mt-2 mb-2">{t.title}</h1>
          <p className="text-xs font-mono text-[#525252] mb-8">{t.lastUpdated}</p>

          <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-10 p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            {t.intro}
          </p>
          
          <div className="prose text-[#4B5563] leading-relaxed space-y-8 text-sm">
            {t.sections.map((section: { title: string; paragraphs: string[]; items?: string[]; footer?: string }, index: number) => (
              <section key={index} className="border-b border-[#F1F5F9] pb-6 last:border-b-0">
                <h2 className="text-lg font-bold font-['Montserrat'] text-[#1A1A1A] mb-3">{section.title}</h2>
                
                {section.paragraphs.map((p: string, pIdx: number) => (
                  <p key={pIdx} className="mb-3">
                    {p}
                  </p>
                ))}

                {section.items && section.items.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1.5 mb-3 text-[#4B5563]">
                    {section.items.map((item: string, iIdx: number) => (
                      <li key={iIdx}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p className="mt-3 text-[#525252] italic">
                    {section.footer}
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}

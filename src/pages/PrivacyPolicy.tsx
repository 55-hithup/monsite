import SectionReveal from '../components/SectionReveal';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { useLanguage } from '../i18n/LanguageContext';
import { pagesData } from '../i18n/pagesData';

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const t = pagesData[language]?.privacy || pagesData.fr.privacy;

  useDocumentMetadata(
    {
      fr: "Politique de Confidentialité | DevSupAi — Protection des Données",
      en: "Privacy Policy | DevSupAi — Data Protection & Privacy",
    },
    {
      fr: "Politique de confidentialité et protection des données personnelles sur le site devsupai.fr, en stricte conformité avec le RGPD.",
      en: "Privacy policy and personal data protection principles for devsupai.fr in full compliance with GDPR regulations.",
    },
    "/politique-de-confidentialite"
  );

  return (
    <div className="w-full bg-white text-[#4A4A4A] min-h-screen py-16 md:py-24">
      <SectionReveal className="text-left">
        <div className="container max-w-4xl mx-auto px-6">
          <span className="col-pre-title">{t.eyebrow}</span>
          <h1 className="text-3xl sm:text-4xl font-black font-['Montserrat'] text-[#1A1A1A] mt-2 mb-10">{t.title}</h1>
          
          <div className="prose text-[#555555] leading-relaxed space-y-8 text-sm">
            <section>
              <h2 className="text-lg font-bold font-['Montserrat'] text-[#1A1A1A] mb-3">{t.s1_title}</h2>
              <p className="mb-3">
                {t.s1_desc}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t.s1_item1}</li>
                <li>{t.s1_item2}</li>
                <li>{t.s1_item3}</li>
                <li>{t.s1_item4}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold font-['Montserrat'] text-[#1A1A1A] mb-3">{t.s2_title}</h2>
              <p className="mb-3">
                {t.s2_desc}
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>{t.s2_item1}</li>
                <li>{t.s2_item2}</li>
              </ul>
              <p>
                {t.s2_footer}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-['Montserrat'] text-[#1A1A1A] mb-3">{t.s3_title}</h2>
              <p>
                {t.s3_desc}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-['Montserrat'] text-[#1A1A1A] mb-3">{t.s4_title}</h2>
              <p className="mb-3">
                {t.s4_desc}
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>{t.s4_item1}</li>
                <li>{t.s4_item2}</li>
                <li>{t.s4_item3}</li>
              </ul>
              <p>
                {t.s4_footer}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold font-['Montserrat'] text-[#1A1A1A] mb-3">{t.s5_title}</h2>
              <p>
                {t.s5_desc}
              </p>
            </section>
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}

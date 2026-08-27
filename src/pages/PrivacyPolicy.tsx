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
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <div className="wrap max-w-4xl">
        <div className="eyebrow">{t.eyebrow}</div>
        <h1 className="section-title mt-4 mb-10">{t.title}</h1>
        
        <div className="prose text-text-secondary leading-relaxed space-y-8 text-sm">
          <section>
            <h2 className="text-base font-bold text-text-primary mb-3">{t.s1_title}</h2>
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
            <h2 className="text-base font-bold text-text-primary mb-3">{t.s2_title}</h2>
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
            <h2 className="text-base font-bold text-text-primary mb-3">{t.s3_title}</h2>
            <p>
              {t.s3_desc}
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-text-primary mb-3">{t.s4_title}</h2>
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
            <h2 className="text-base font-bold text-text-primary mb-3">{t.s5_title}</h2>
            <p>
              {t.s5_desc}
            </p>
          </section>
        </div>
      </div>
    </SectionReveal>
  );
}

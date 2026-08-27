import SectionReveal from '../components/SectionReveal';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { useLanguage } from '../i18n/LanguageContext';
import { pagesData } from '../i18n/pagesData';

export default function LegalNotices() {
  const { language } = useLanguage();
  const t = pagesData[language]?.legal || pagesData.fr.legal;

  useDocumentMetadata(
    {
      fr: "Mentions Légales | DevSupAi — Alexandre Pabst",
      en: "Legal Notices | DevSupAi — Alexandre Pabst",
    },
    {
      fr: "Mentions légales, informations sur l'éditeur et l'hébergement du site internet devsupai.fr édité par Alexandre Pabst EI (DevSupAi).",
      en: "Legal notices, publisher identification, and hosting infrastructure details for website devsupai.fr by Alexandre Pabst EI (DevSupAi).",
    },
    "/mentions-legales"
  );

  return (
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <div className="wrap max-w-4xl">
        <div className="eyebrow">{t.eyebrow}</div>
        <h1 className="section-title mt-4 mb-10">{t.title}</h1>
        
        <div className="prose text-text-secondary leading-relaxed space-y-8 text-sm">
          <section>
            <h2 className="text-base font-bold text-text-primary mb-3">{t.s1_title}</h2>
            <p className="mb-4">
              {t.s1_desc}
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-text-primary">{t.s1_owner} </strong> 
                {t.s1_owner_val}
              </li>
              <li>
                <strong className="text-text-primary">{t.s1_siret} </strong> 
                {t.s1_siret_val}
              </li>
              <li>
                <strong className="text-text-primary">{t.s1_vat} </strong> 
                {t.s1_vat_val}
              </li>
              <li>
                <strong className="text-text-primary">{t.s1_email} </strong> 
                <a href="mailto:contact@devsupai.fr" className="text-accent hover:underline">contact@devsupai.fr</a> (ou via le formulaire de contact).
              </li>
              <li>
                <strong className="text-text-primary">{t.s1_pub} </strong> 
                Alexandre PABST.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-text-primary mb-3">{t.s2_title}</h2>
            <p className="mb-3">
              {t.s2_desc1}
            </p>
            <p>
              {t.s2_desc2}
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-text-primary mb-3">{t.s3_title}</h2>
            <p className="mb-3">
              {t.s3_desc1}
            </p>
            <p>
              {t.s3_desc2}
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-text-primary mb-3">{t.s4_title}</h2>
            <p>
              {t.s4_desc}
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

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
      en: "Consult the legal information and regulatory disclosures of the sole proprietorship DevSupAi managed by Alexandre Pabst.",
    },
    'https://www.devsupai.fr/hero-bg-mockup.webp'
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
              <p className="mb-4">
                {t.s1_desc}
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong className="text-[#1A1A1A]">{t.s1_owner} </strong> 
                  {t.s1_owner_val}
                </li>
                <li>
                  <strong className="text-[#1A1A1A]">{t.s1_siret} </strong> 
                  {t.s1_siret_val}
                </li>
                <li>
                  <strong className="text-[#1A1A1A]">{t.s1_vat} </strong> 
                  {t.s1_vat_val}
                </li>
                <li>
                  <strong className="text-[#1A1A1A]">{t.s1_email} </strong> 
                  <a href="mailto:contact@devsupai.fr" className="text-[#0284C7] hover:underline">contact@devsupai.fr</a> (ou via le formulaire de contact).
                </li>
                <li>
                  <strong className="text-[#1A1A1A]">{t.s1_pub} </strong> 
                  Alexandre PABST.
                </li>
              </ul>
            </section>

          <section>
            <h2 className="text-lg font-bold font-['Montserrat'] text-[#1A1A1A] mb-3">{t.s2_title}</h2>
            <p className="mb-3">
              {t.s2_desc1}
            </p>
            <p>
              {t.s2_desc2}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold font-['Montserrat'] text-[#1A1A1A] mb-3">{t.s3_title}</h2>
            <p className="mb-3">
              {t.s3_desc1}
            </p>
            <p>
              {t.s3_desc2}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold font-['Montserrat'] text-[#1A1A1A] mb-3">{t.s4_title}</h2>
            <p>
              {t.s4_desc}
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

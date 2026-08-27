import { Link } from 'react-router-dom';
import SectionReveal from '../components/SectionReveal';
import MagneticWrapper from '../components/MagneticWrapper';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { useLanguage } from '../i18n/LanguageContext';
import { pagesData } from '../i18n/pagesData';

export default function About() {
  const { language } = useLanguage();
  const t = pagesData[language]?.about || pagesData.fr.about;

  useDocumentMetadata(
    {
      fr: "À Propos | Alexandre Pabst — Développeur Web Sur-Mesure | DevSupAi",
      en: "About | Alexandre Pabst — Custom Web Developer | DevSupAi",
    },
    {
      fr: "Découvrez le parcours d'Alex, fondateur de DevSupAi, et sa méthode de développement sans compromis pour concevoir des sites web rapides et entièrement sur-mesure.",
      en: "Discover the journey of Alex, founder of DevSupAi, and his uncompromising approach to engineering ultra-fast, bespoke websites and web applications.",
    },
    "/a-propos"
  );

  return (
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <div className="wrap max-w-4xl">
        <div className="eyebrow">{t.eyebrow}</div>
        <h1 className="section-title mt-4 mb-10 whitespace-pre-line">{t.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          {/* Main Story Column */}
          <div className="md:col-span-2 space-y-6 text-text-secondary leading-relaxed text-sm">
            <p className="text-base text-text-primary font-medium">
              {t.p1}
            </p>
            <p>
              {t.p2}
            </p>
            <p>
              {t.p3}
            </p>
            <div className="pt-6">
              <h2 className="text-lg font-bold text-text-primary mb-3">{t.principlesTitle}</h2>
              <ul className="space-y-4">
                {t.principles.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-accent font-bold">{item.num}</span>
                    <div>
                      <strong className="text-text-primary">{item.title} </strong>
                      {item.desc}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Sidebar / Profile Card */}
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-accent to-purple-600 flex items-center justify-center text-white font-bold text-xl mb-4">
                A
              </div>
              <h3 className="text-base font-bold text-text-primary mb-1">Alexandre Pabst</h3>
              <span className="text-xs label-mono text-purple-300 block">{t.founderRole}</span>
              <span className="text-xs block text-text-secondary mt-1">{t.founderLocation}</span>
              
              <p className="text-xs text-text-secondary mt-4 leading-relaxed">
                {t.founderBio}
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-xs label-mono text-text-secondary uppercase tracking-wider">{t.discussTitle}</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {t.discussText}
              </p>
              <div className="pt-2">
                <MagneticWrapper range={20} strength={0.2}>
                  <Link to={language === 'en' ? '/en#contact' : '/#contact'} className="btn btn-primary text-xs w-full text-center py-2.5" style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#fff', display: 'inline-block', borderRadius: '8px' }}>
                    {t.startProjectBtn}
                  </Link>
                </MagneticWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

import { Link } from 'react-router-dom';
import SectionReveal from '../components/SectionReveal';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { useLanguage } from '../i18n/LanguageContext';
import { pagesData } from '../i18n/pagesData';
import { MapPin, Mail, Sparkles, ArrowRight } from 'lucide-react';

export default function About() {
  const { language } = useLanguage();
  const t = pagesData[language]?.about || pagesData.fr.about;

  useDocumentMetadata(
    {
      fr: "À Propos | Alexandre Pabst – Développeur Web Sur-Mesure | DevSupAi",
      en: "About | Alexandre Pabst – Custom Web Developer | DevSupAi",
    },
    {
      fr: "Découvrez le parcours d'Alexandre Pabst, artisan du web et fondateur de DevSupAi à Saint-Mihiel (Meuse). Une méthode sur-mesure sans compromis pour PME et artisans.",
      en: "Discover the background of Alexandre Pabst, founder of DevSupAi in Saint-Mihiel (France), and his uncompromising methodology for crafting bespoke, ultra-fast websites.",
    },
    'https://www.devsupai.fr/hero-bg-mockup.webp'
  );

  return (
    <div className="w-full bg-white text-[#4A4A4A] min-h-screen py-16 md:py-24">
      <SectionReveal className="text-left">
        <div className="container max-w-5xl mx-auto px-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0284C7]/30 bg-[#0284C7]/10 text-xs font-bold font-['Montserrat'] text-[#0284C7] mb-6">
            <Sparkles size={14} className="text-[#0284C7]" aria-hidden="true" />
            <span>{t.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Montserrat'] text-[#1A1A1A] mb-8 leading-tight max-w-4xl whitespace-pre-line">
            {t.title}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            {/* Main Story Column */}
            <div className="md:col-span-2 space-y-6 text-[#555555] leading-relaxed text-base">
              <p className="text-lg text-[#1A1A1A] font-medium font-['Playfair_Display'] italic leading-relaxed border-l-2 border-[#0284C7] pl-4">
                {t.p1}
              </p>
              <p className="font-['Plus_Jakarta_Sans']">
                {t.p2}
              </p>
              <p className="font-['Plus_Jakarta_Sans']">
                {t.p3}
              </p>

              <div className="pt-8">
                <h2 className="text-xl sm:text-2xl font-black font-['Montserrat'] text-[#1A1A1A] mb-6">
                  {t.principlesTitle}
                </h2>
                <ul className="space-y-4">
                  {t.principles.map((item, idx) => (
                    <li key={idx} className="flex gap-4 p-4 rounded-xl bg-[#F8F8F8] border border-[#E5E5E5]">
                      <span className="text-[#0284C7] font-black font-['Montserrat'] text-base shrink-0">{item.num}</span>
                      <div>
                        <strong className="text-[#1A1A1A] font-bold block mb-1 font-['Montserrat']">{item.title}</strong>
                        <span className="text-sm text-[#666666] leading-relaxed font-['Plus_Jakarta_Sans']">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Sidebar / Profile Card */}
            <div className="space-y-8">
              <div className="p-8 rounded-xl bg-[#F8F8F8] border border-[#E5E5E5] shadow-sm text-center">
                <div className="w-20 h-20 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-black font-['Montserrat'] text-2xl mx-auto mb-4 border-2 border-[#0284C7]">
                  AP
                </div>
                <h3 className="text-xl font-black font-['Montserrat'] text-[#1A1A1A] mb-1">Alexandre Pabst</h3>
                <span className="text-xs font-bold font-['Montserrat'] text-[#0284C7] block uppercase tracking-wider mb-2">
                  {t.founderRole}
                </span>
                <span className="text-xs text-[#777777] inline-flex items-center gap-1 mb-4">
                  <MapPin size={13} className="text-[#0284C7]" aria-hidden="true" />
                  {t.founderLocation}
                </span>
                
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed pt-4 border-t border-[#E5E5E5] text-left">
                  {t.founderBio}
                </p>

                <div className="mt-6 pt-4 border-t border-[#E5E5E5] text-left">
                  <a href="mailto:contact@devsupai.fr" className="text-xs font-bold text-[#0284C7] hover:underline inline-flex items-center gap-1.5">
                    <Mail size={13} aria-hidden="true" />
                    <span>contact@devsupai.fr</span>
                  </a>
                </div>
              </div>
              
              <div className="p-6 rounded-xl bg-white border border-[#E5E5E5] space-y-3">
                <h3 className="text-xs font-bold font-['Montserrat'] text-[#1A1A1A] uppercase tracking-wider">
                  {t.discussTitle}
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {t.discussText}
                </p>
                <div className="pt-3">
                  <Link 
                    to="/#contact" 
                    className="btn-glacier-solid w-full text-center inline-flex items-center justify-center gap-2 text-xs"
                  >
                    <span>{t.startProjectBtn}</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </SectionReveal>
    </div>
  );
}

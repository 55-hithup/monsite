import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  ShieldCheck, 
  Eye, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { debouncedScrollTriggerRefresh } from '../../utils/scrollTriggerRefresh';
import { useLanguage } from '../../i18n/LanguageContext';

export default function GlacierTechStandards() {
  const { isEn } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.children) as HTMLElement[];
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    debouncedScrollTriggerRefresh(200);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white border-b border-[#E5E5E5] text-left relative overflow-hidden"
      aria-label={isEn ? "Engineering Standards: Eco-design, Security, and Accessibility" : "Standards d'Excellence : Écoconception, Sécurité et Accessibilité"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div ref={headerRef} className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-50 text-xs sm:text-sm font-bold font-['Montserrat'] text-[#0284C7] mb-4">
            <Sparkles size={14} aria-hidden="true" />
            <span>{isEn ? "TECHNICAL EXCELLENCE STANDARDS" : "ENGAGEMENTS & STANDARDS TECHNIQUES"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Montserrat'] text-[#1A1A1A] tracking-tight mb-4">
            {isEn
              ? "Eco-Design, Absolute Security, and Digital Accessibility"
              : "Écoconception, Sécurité Maximale et Accessibilité Universelle"}
          </h2>

          <p className="text-base sm:text-lg text-[#525252] font-['Plus_Jakarta_Sans'] leading-relaxed">
            {isEn
              ? "Beyond aesthetics and loading speed, every DevSupAi architecture is engineered according to three non-negotiable technical requirements: minimal carbon footprint, zero CMS attack surface, and strict compliance with W3C / WCAG accessibility standards."
              : "Au-delà de l'esthétique et de la vitesse de chargement, chaque site conçu par DevSupAi repose sur trois exigences techniques non négociables : une empreinte carbone minimale, une surface d'attaque nulle et une accessibilité numérique universelle conforme aux normes W3C et RGAA."}
          </p>
        </div>

        {/* Grille des 3 Piliers Comparatifs */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* PILIER 1 : ÉCOCONCEPTION WEB */}
          <div className="flex flex-col justify-between p-7 sm:p-9 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0284C7] hover:shadow-xl transition-all duration-300 relative group">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-700">
                  <Leaf size={24} aria-hidden="true" />
                </span>
                <span className="text-[11px] font-bold font-['Montserrat'] uppercase tracking-wider px-2.5 py-1 rounded-none bg-emerald-100/70 text-emerald-800 border border-emerald-200">
                  {isEn ? "EcoIndex Grade A" : "Note EcoIndex A"}
                </span>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-['Montserrat'] mb-1">
                {isEn ? "GREEN IT & SSG ARCHITECTURE" : "GREEN IT & STATIC-SITE GENERATION"}
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-['Montserrat'] text-[#1A1A1A] tracking-tight mb-4 group-hover:text-[#0284C7] transition-colors">
                {isEn ? "Native Eco-Design & Minimal Carbon Footprint" : "Écoconception Web & Empreinte Carbone Réelle"}
              </h3>

              <p className="text-xs sm:text-sm text-[#525252] leading-relaxed font-['Plus_Jakarta_Sans'] mb-6">
                {isEn
                  ? "Genuine eco-design does not merely mean converting images to WebP. It starts by eliminating wasteful, always-on dynamic servers."
                  : "Une vraie démarche d'écoconception ne se limite pas à compresser des images en WebP : elle commence par éliminer les serveurs dynamiques énergivores qui tournent 24h/24 pour rien."}
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-[#475569] font-['Plus_Jakarta_Sans'] mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>{isEn ? "Zero dynamic server waste:" : "Zéro serveur d'application 24h/24 :"}</strong>{' '}
                    {isEn
                      ? "Pages are statically pre-rendered (SSG) at build time, eliminating continuous PHP/SQL computing cycles."
                      : "Pages pré-compilées statiquement (SSG), supprimant les calculs continus PHP / SQL pour chaque visiteur."}
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>{isEn ? "Ultra-lightweight footprint:" : "Poids plume & Médias optimisés :"}</strong>{' '}
                    {isEn
                      ? "Under 300 kB average page weight (vs 3 to 5 MB for traditional agency CMS sites) with lossless WebP/SVG."
                      : "Pages pesant moins de 300 Ko (contre 3 à 5 Mo pour un WordPress d'agence) avec médias WebP/SVG calibrés."}
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>{isEn ? "Zero energy-draining trackers:" : "Zéro script tiers polluant :"}</strong>{' '}
                    {isEn
                      ? "No intrusive trackers or heavy third-party iframes loaded without consent, saving battery life and user bandwidth."
                      : "Aucun tracker publicitaire ni iframe tierce lourde (YouTube / widgets) chargée en tâche de fond."}
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>{isEn ? "Edge CDN distribution:" : "Distribution Edge CDN européenne :"}</strong>{' '}
                    {isEn
                      ? "Cached in low-consumption green data centers as close as possible to the user."
                      : "Contenus servis en cache court dans des datacenters européens basse consommation."}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-5 border-t border-[#E2E8F0]">
              <Link
                to={isEn ? "/en/blog/performance-web-sur-mesure" : "/blog/performance-web-sur-mesure"}
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-900 font-['Montserrat'] uppercase tracking-wider group/link"
              >
                <span>{isEn ? "Learn about performance & speed" : "Lire notre dossier sur la performance web"}</span>
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* PILIER 2 : SÉCURITÉ JAMSTACK */}
          <div className="flex flex-col justify-between p-7 sm:p-9 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0284C7] hover:shadow-xl transition-all duration-300 relative group">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-none bg-sky-500/10 border border-sky-500/30 text-[#0284C7]">
                  <ShieldCheck size={24} aria-hidden="true" />
                </span>
                <span className="text-[11px] font-bold font-['Montserrat'] uppercase tracking-wider px-2.5 py-1 rounded-none bg-sky-100/70 text-sky-800 border border-sky-200">
                  {isEn ? "Security Grade A+" : "Note Sécurité A+"}
                </span>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-sky-800 font-['Montserrat'] mb-1">
                {isEn ? "ZERO ATTACK SURFACE (JAMSTACK)" : "SURFACE D'ATTAQUE NULLE (JAMSTACK)"}
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-['Montserrat'] text-[#1A1A1A] tracking-tight mb-4 group-hover:text-[#0284C7] transition-colors">
                {isEn ? "Architectural Security, SSL A+ & Security Headers" : "Sécurité Native & Zéro Faille PHP ou Base Exposée"}
              </h3>

              <p className="text-xs sm:text-sm text-[#525252] leading-relaxed font-['Plus_Jakarta_Sans'] mb-6">
                {isEn
                  ? "Why pay for costly vulnerability audits and insurer warranties when you can simply eliminate the attackers' target altogether?"
                  : "Pourquoi payer des audits et assurances contre le piratage quand on peut simplement éliminer la cible des pirates ?"}
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-[#475569] font-['Plus_Jakarta_Sans'] mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#0284C7] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>{isEn ? "Zero public database exposed:" : "Zéro base de données publique exposée :"}</strong>{' '}
                    {isEn
                      ? "Unlike WordPress CMS targeted by 90%+ of web exploits, static architectures offer zero executable PHP surface."
                      : "95 % des piratages exploitent des failles SQL ou des extensions WordPress. Chez DevSupAi, aucun script PHP n'est exécutable côté serveur."}
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#0284C7] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>{isEn ? "SSL / TLS Grade A+ (Qualys SSL Labs):" : "Certificat SSL/TLS Note A+ (Qualys) :"}</strong>{' '}
                    {isEn
                      ? "Modern bank-grade HTTPS encryption with strict TLS 1.3 protocols and automated certificate renewals."
                      : "Chiffrement HTTPS moderne avec protocoles stricts TLS 1.3 et forçage HSTS."}
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#0284C7] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>{isEn ? "Hardened Security Headers A+:" : "Entêtes de sécurité notées A+ :"}</strong>{' '}
                    {isEn
                      ? "Strict Content-Security-Policy (CSP), X-Frame-Options: DENY, and X-Content-Type-Options: nosniff preventing clickjacking and XSS."
                      : "Protection active contre le clickjacking et les injections (CSP, X-Frame-Options: DENY, HSTS)."}
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#0284C7] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>{isEn ? "Hardened forms & zero-captcha anti-spam:" : "Formulaires blindés anti-spam :"}</strong>{' '}
                    {isEn
                      ? "Rate-limited intake APIs with intelligent honeypot protection without frustrating client-facing captchas."
                      : "Protection honeypot intelligente et limitation de requêtes sans captcha punitif pour vos clients."}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-5 border-t border-[#E2E8F0]">
              <Link
                to={isEn ? "/en/blog/pourquoi-eviter-wordpress-petit-budget" : "/blog/pourquoi-eviter-wordpress-petit-budget"}
                className="inline-flex items-center gap-2 text-xs font-bold text-sky-800 hover:text-sky-900 font-['Montserrat'] uppercase tracking-wider group/link"
              >
                <span>{isEn ? "Why avoid fragile CMS platforms" : "Comprendre les failles des CMS traditionnels"}</span>
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* PILIER 3 : ACCESSIBILITÉ NUMÉRIQUE */}
          <div className="flex flex-col justify-between p-7 sm:p-9 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0284C7] hover:shadow-xl transition-all duration-300 relative group">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-none bg-indigo-500/10 border border-indigo-500/30 text-indigo-700">
                  <Eye size={24} aria-hidden="true" />
                </span>
                <span className="text-[11px] font-bold font-['Montserrat'] uppercase tracking-wider px-2.5 py-1 rounded-none bg-indigo-100/70 text-indigo-800 border border-indigo-200">
                  {isEn ? "RGAA & WCAG 2.1 AA" : "Conforme RGAA / WCAG AA"}
                </span>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-indigo-800 font-['Montserrat'] mb-1">
                {isEn ? "INCLUSIVE DESIGN & LEGAL COMPLIANCE" : "ERGONOMIE INCLUSIVE & OBLIGATIONS LÉGALES"}
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-['Montserrat'] text-[#1A1A1A] tracking-tight mb-4 group-hover:text-[#0284C7] transition-colors">
                {isEn ? "Universal Accessibility & European RGAA Compliance" : "Accessibilité Universelle & Conformité RGAA"}
              </h3>

              <p className="text-xs sm:text-sm text-[#525252] leading-relaxed font-['Plus_Jakarta_Sans'] mb-6">
                {isEn
                  ? "Accessibility is not a cosmetic third-party overlay widget added as an afterthought. It is engineered from the first line of code."
                  : "L'accessibilité n'est pas un widget tiers cosmétique rajouté à la hâte : elle est programmée nativement dès la première ligne de code."}
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-[#475569] font-['Plus_Jakarta_Sans'] mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-indigo-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>{isEn ? "Strict semantic HTML5 hierarchy:" : "Sémantique HTML5 & Hiérarchie stricte :"}</strong>{' '}
                    {isEn
                      ? "Screen reader compatible layout without heading skips, complete keyboard navigation, and visible focus rings."
                      : "Cascade de titres séquentielle sans saut, navigation complète au clavier et attributs inert sur les menus masqués."}
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-indigo-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>{isEn ? "Calibrated color contrast (>= 4.5:1):" : "Contrastes rigoureusement calibrés (>= 4.5:1) :"}</strong>{' '}
                    {isEn
                      ? "Full compliance with WCAG AA contrast ratios, ensuring effortless readability in bright sunlight and for low-vision users."
                      : "Garantit une lisibilité irréprochable pour les personnes malvoyantes ou sur écran en plein soleil."}
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-indigo-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>{isEn ? "Ergonomic touch targets (>= 32px to 44px):" : "Cibles tactiles adaptées (>= 32px à 44px) :"}</strong>{' '}
                    {isEn
                      ? "Generously spaced clickable areas preventing mobile misclicks and accommodating motor impairments."
                      : "Boutons et liens dimensionnés pour éviter les erreurs de clic sur mobile et assister la motricité réduite."}
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-indigo-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>{isEn ? "Vestibular motion support:" : "Respect du mode réduit (prefers-reduced-motion) :"}</strong>{' '}
                    {isEn
                      ? "System-level motion sensitivity detection automatically subdues or disables animations."
                      : "Désactivation automatique ou adoucissement des animations en cas de sensibilité vestibulaire."}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-5 border-t border-[#E2E8F0]">
              <Link
                to={isEn ? "/en/blog/accessibilite-web-rgaa-pme" : "/blog/accessibilite-web-rgaa-pme"}
                className="inline-flex items-center gap-2 text-xs font-bold text-indigo-800 hover:text-indigo-900 font-['Montserrat'] uppercase tracking-wider group/link"
              >
                <span>{isEn ? "Read our guide on RGAA & WCAG for business" : "Consulter notre guide sur l'accessibilité RGAA"}</span>
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

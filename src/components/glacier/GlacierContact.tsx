import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../i18n/LanguageContext';

export default function GlacierContact() {
  const { isEn } = useLanguage();
  const location = useLocation();
  const boxRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const directContactRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);

  const defaultProjectType = isEn
    ? 'Bespoke Showcase Website (SME, Craftsman, Non-Profit)'
    : 'Site vitrine sur-mesure (PME, Artisan, Association)';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: defaultProjectType,
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Animations au scroll : Formulaire 3D + Glissé adresse (gauche) + Émergence contact (centre/retard) + Glissé horaires (droite)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (boxRef.current) {
        gsap.fromTo(
          boxRef.current,
          {
            opacity: 0,
            scale: 0.82,
            y: 50,
            filter: 'blur(16px)',
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: boxRef.current,
              start: 'top 75%',
              end: 'bottom top',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (addressRef.current) {
        gsap.fromTo(
          addressRef.current,
          {
            opacity: 0,
            x: -120,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: addressRef.current,
              start: 'top 85%',
              end: 'bottom top',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (directContactRef.current) {
        gsap.fromTo(
          directContactRef.current,
          {
            opacity: 0,
            scale: 0.75,
            y: 30,
            filter: 'blur(12px)',
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            delay: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: directContactRef.current,
              start: 'top 85%',
              end: 'bottom top',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (hoursRef.current) {
        gsap.fromTo(
          hoursRef.current,
          {
            opacity: 0,
            x: 120,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: hoursRef.current,
              start: 'top 85%',
              end: 'bottom top',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    // Actualiser les positions des triggers une fois le layout stabilisé
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  // Handle URL query parameters for dynamic pre-fill (e.g. from /nos-services?service=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const searchParams = new URLSearchParams(location.search);
      const serviceParam = searchParams.get('service');
      const packParam = searchParams.get('pack');

      if (serviceParam) {
        const decodedService = decodeURIComponent(serviceParam);
        setFormData((prev) => ({
          ...prev,
          projectType: isEn ? 'Other Project / Initial Discussion' : 'Autre projet / Premier échange',
          message: isEn
            ? `Hello, I would like to discuss and get information regarding: "${decodedService}".`
            : `Bonjour, je souhaite obtenir des informations et échanger au sujet de la prestation : "${decodedService}".`,
        }));
      } else if (packParam) {
        if (packParam === 'presence' || packParam === 'croissance') {
          setFormData((prev) => ({
            ...prev,
            projectType: isEn ? 'Bespoke Showcase Website (SME, Craftsman, Non-Profit)' : 'Site vitrine sur-mesure (PME, Artisan, Association)',
          }));
        } else if (packParam === 'saas') {
          setFormData((prev) => ({
            ...prev,
            projectType: isEn ? 'Custom Web App, SaaS or Business Software' : 'Application web, SaaS ou Logiciel métier',
          }));
        } else if (packParam === 'google') {
          setFormData((prev) => ({
            ...prev,
            projectType: isEn ? 'Website Redesign & Speed Optimization' : 'Refonte, Modernisation ou Optimisation de vitesse',
          }));
        }
      }
    } catch (e) {
      console.error('Error parsing contact query params:', e);
    }
  }, [location.search, isEn]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.success === false) {
        throw new Error(
          data.message ||
            (isEn
              ? 'An error occurred while transmitting your request.'
              : "Une erreur est survenue lors de l'envoi de votre demande.")
        );
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        projectType: defaultProjectType,
        message: '',
      });
    } catch (err) {
      console.error('Contact error:', err);
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : isEn
          ? "Unable to send message. You can reach out directly at contact@devsupai.fr."
          : "Impossible d'envoyer le message. Vous pouvez m'écrire directement à contact@devsupai.fr."
      );
    }
  };

  return (
    <>
      {/* 1. Section Formulaire de Demande de Devis avec Fond Parallaxe Fixe */}
      <section 
        className="glacier-contact-parallax-section w-full" 
        id="contact" 
        aria-labelledby="contact-heading"
      >
        <div 
          className="contact-parallax-bg" 
          style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
        />
        <div className="contact-parallax-tint" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <h2 id="contact-heading" className="sr-only">
            {isEn ? "Contact & Inquiries" : "Contact et Demande de Renseignements"}
          </h2>
          
          <div ref={boxRef} className="glacier-intake-box mx-auto">
            <div className="intake-header">
              <h3 className="intake-title" style={{ color: '#FFFFFF' }}>
                {isEn ? "HAVE A QUESTION OR A PROJECT?" : "UNE QUESTION ? UN PROJET ?"}
              </h3>
              <p className="intake-desc" style={{ color: '#FFFFFF' }}>
                {isEn
                  ? "Fill out this form to discuss your project and receive a tailored proposal adapted to your goals."
                  : "Remplissez ce formulaire pour échanger sur vos besoins et recevoir une proposition adaptée à votre projet."}
              </p>
            </div>

            <form className="glacier-form" id="glacier-intake-form" onSubmit={handleSubmit}>
              <div className="form-inputs-row">
                <div>
                  <label htmlFor="client-name" className="sr-only">
                    {isEn ? "Your Full Name" : "Votre Nom et Prénom"}
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    id="client-name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={isEn ? "Your Full Name *" : "Votre Nom & Prénom *"} 
                    required 
                    className="glacier-input"
                  />
                </div>

                <div>
                  <label htmlFor="client-email" className="sr-only">
                    {isEn ? "Your Email Address" : "Votre Adresse Email"}
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    id="client-email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={isEn ? "Your Email *" : "Votre Email *"} 
                    required 
                    className="glacier-input"
                  />
                </div>

                <div>
                  <label htmlFor="client-project-type" className="sr-only">
                    {isEn ? "Select your project type" : "Type de projet souhaité"}
                  </label>
                  <select 
                    name="projectType"
                    id="client-project-type" 
                    value={formData.projectType}
                    onChange={handleChange}
                    required 
                    className="glacier-input cursor-pointer"
                  >
                    {isEn ? (
                      <>
                        <option value="Bespoke Showcase Website (SME, Craftsman, Non-Profit)">Bespoke Showcase Website (SME, Craftsman, Non-Profit)</option>
                        <option value="E-Commerce & Online Booking System">E-Commerce &amp; Online Booking System</option>
                        <option value="Custom Web App, SaaS or Business Software">Custom Web App, SaaS or Business Software</option>
                        <option value="Website Redesign & Speed Optimization">Website Redesign &amp; Speed Optimization</option>
                        <option value="Technical Maintenance & Support">Technical Maintenance &amp; Support</option>
                        <option value="Other Project / Initial Discussion">Other Project / Initial Discussion</option>
                      </>
                    ) : (
                      <>
                        <option value="Site vitrine sur-mesure (PME, Artisan, Association)">Site vitrine sur-mesure (PME, Artisan, Association)</option>
                        <option value="E-commerce & Système de réservation">E-commerce &amp; Système de réservation</option>
                        <option value="Application web, SaaS ou Logiciel métier">Application web, SaaS ou Logiciel métier</option>
                        <option value="Refonte, Modernisation ou Optimisation de vitesse">Refonte, Modernisation ou Optimisation de vitesse</option>
                        <option value="Maintenance technique & Dépannage">Maintenance technique &amp; Dépannage</option>
                        <option value="Autre projet / Premier échange">Autre projet / Premier échange</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="client-message" className="sr-only">
                  {isEn ? "Description of your activity and project goals" : "Description de votre activité et vos attentes"}
                </label>
                <textarea 
                  name="message"
                  id="client-message" 
                  rows={3} 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={
                    isEn
                      ? "Briefly describe your business activity and project goals..."
                      : "Décrivez brièvement votre activité et vos attentes..."
                  } 
                  required 
                  className="glacier-textarea"
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="btn-glacier-submit inline-flex items-center justify-center gap-2.5 active:scale-95 transition-all duration-200"
                style={{ color: '#FFFFFF' }}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline" aria-hidden="true" />
                    {isEn ? "TRANSMITTING REQUEST..." : "TRANSMISSION EN COURS..."}
                  </>
                ) : (
                  <>
                    <span style={{ color: '#FFFFFF' }}>{isEn ? "SEND MY REQUEST" : "ENVOYER MA DEMANDE"}</span>
                    <ArrowRight className="w-4 h-4 inline" aria-hidden="true" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="glacier-success-alert" id="glacier-success" role="status">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>
                    {isEn
                      ? "Message successfully transmitted! We will get back to you within 24 business hours."
                      : "Message bien transmis ! Une réponse personnalisée vous sera apportée sous 24h ouvrées."}
                  </span>
                </div>
              )}

              {status === 'error' && (
                <div className="glacier-error-alert" role="alert">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 inline mr-2" aria-hidden="true" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 2. Coordonnées & Horaires (Section Blanche Distincte) */}
      <section 
        className="glacier-footer-info-section w-full overflow-hidden" 
        aria-label={isEn ? "Atelier Contact Details & Opening Hours" : "Coordonnées et Horaires de l'Atelier"}
      >
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="contact-columns-3">
            
            {/* Colonne 1 : Adresse */}
            <div ref={addressRef} className="contact-col-block">
              <h3 className="block-title">{isEn ? "ATELIER ADDRESS" : "ADRESSE DE L'ATELIER"}</h3>
              <p className="block-text">
                13 Allée des Roses<br />
                55300 Saint-Mihiel<br />
                Meuse (55), Grand Est • France
              </p>
              <p className="block-sub-text">
                {isEn
                  ? "On-site across Grand Est region and remote collaboration worldwide."
                  : "Intervention en Meuse, Lorraine, Grand Est et toute la France à distance."}
              </p>
            </div>

            {/* Colonne 2 : Contact Direct */}
            <div ref={directContactRef} className="contact-col-block">
              <h3 className="block-title">{isEn ? "DIRECT CONTACT" : "CONTACT DIRECT"}</h3>
              <p className="block-text">
                <strong>Alexandre Pabst</strong><br />
                Email : <a href="mailto:contact@devsupai.fr" className="direct-link">contact@devsupai.fr</a><br />
                {isEn ? "Guaranteed response within 24 business hours" : "Réponse garantie sous 24h ouvrées"}
              </p>
              <p className="block-sub-text">
                {isEn ? "Free preliminary discussion with no obligation." : "Échange préalable gratuit et sans aucun engagement."}
              </p>
            </div>

            {/* Colonne 3 : Horaires */}
            <div ref={hoursRef} className="contact-col-block">
              <h3 className="block-title">{isEn ? "OPENING HOURS" : "HORAIRES D'OUVERTURE"}</h3>
              <p className="block-text">
                <strong>{isEn ? "MONDAY TO FRIDAY" : "DU LUNDI AU VENDREDI"}</strong><br />
                08H00 - 18H00<br /><br />
                <strong>{isEn ? "SATURDAY" : "SAMEDI"}</strong><br />
                08H00 - 12H00
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}


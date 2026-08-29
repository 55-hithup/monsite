import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function GlacierContact() {
  const { isEn } = useLanguage();
  const location = useLocation();

  const defaultProjectType = isEn
    ? 'SME Growth Pack (from €1,850)'
    : 'Pack Croissance PME (dès 1 850 €)';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: defaultProjectType,
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
          projectType: isEn ? 'Other Custom Project' : 'Autre projet sur-mesure',
          message: isEn
            ? `Hello Alexandre, I would like to get information and a quote regarding the service: "${decodedService}".`
            : `Bonjour Alexandre, je souhaite obtenir des informations et un devis pour la prestation : "${decodedService}".`,
        }));
      } else if (packParam) {
        if (packParam === 'presence') {
          setFormData((prev) => ({
            ...prev,
            projectType: isEn ? 'Presence Pack One-Page (from €950)' : 'Pack Présence One-Page (dès 950 €)',
          }));
        } else if (packParam === 'croissance') {
          setFormData((prev) => ({
            ...prev,
            projectType: isEn ? 'SME Growth Pack (from €1,850)' : 'Pack Croissance PME (dès 1 850 €)',
          }));
        } else if (packParam === 'saas') {
          setFormData((prev) => ({
            ...prev,
            projectType: isEn ? 'SaaS & Custom Web App (from €3,200)' : 'Pack SaaS & Outil Métier (dès 3 200 €)',
          }));
        } else if (packParam === 'google') {
          setFormData((prev) => ({
            ...prev,
            projectType: isEn ? 'Google Business Profile Option (€29/month)' : 'Option Google Business Profile (29 €/mois)',
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
            {isEn ? "Contact & Bespoke Quote Request" : "Contact et Demande de Devis Personnalisé"}
          </h2>
          
          <div className="glacier-intake-box mx-auto">
            <div className="intake-header">
              <h3 className="intake-title">
                {isEn ? "REQUEST A BESPOKE QUOTE" : "DEMANDER UN DEVIS PERSONNALISÉ"}
              </h3>
              <p className="intake-desc">
                {isEn
                  ? "Fill out this form to receive a detailed proposal tailored to your business goals and budget."
                  : "Remplissez ce formulaire pour recevoir une proposition adaptée à vos objectifs et à votre budget."}
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
                  <label htmlFor="client-package" className="sr-only">
                    {isEn ? "Project package or service type" : "Forfait ou type de projet souhaité"}
                  </label>
                  <select 
                    name="projectType"
                    id="client-package" 
                    value={formData.projectType}
                    onChange={handleChange}
                    required 
                    className="glacier-input cursor-pointer"
                  >
                    {isEn ? (
                      <>
                        <option value="SME Growth Pack (from €1,850)">SME Growth Pack (from €1,850)</option>
                        <option value="Presence Pack One-Page (from €950)">Presence Pack One-Page (from €950)</option>
                        <option value="SaaS & Custom Web App (from €3,200)">SaaS &amp; Custom Web App (from €3,200)</option>
                        <option value="Google Business Profile Option (€29/month)">Google Business Profile Option (€29/month)</option>
                        <option value="Other Custom Project">Other Custom Project</option>
                      </>
                    ) : (
                      <>
                        <option value="Pack Croissance PME (dès 1 850 €)">Pack Croissance PME (dès 1 850 €)</option>
                        <option value="Pack Présence One-Page (dès 950 €)">Pack Présence One-Page (dès 950 €)</option>
                        <option value="Pack SaaS & Outil Métier (dès 3 200 €)">Pack SaaS &amp; Outil Métier (dès 3 200 €)</option>
                        <option value="Option Google Business Profile (29 €/mois)">Option Google Business Profile (29 €/mois)</option>
                        <option value="Autre projet sur-mesure">Autre projet sur-mesure</option>
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
                className="btn-glacier-submit inline-flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline" aria-hidden="true" />
                    {isEn ? "TRANSMITTING REQUEST..." : "TRANSMISSION EN COURS..."}
                  </>
                ) : (
                  <>
                    {isEn ? "SEND MY REQUEST TO ALEXANDRE" : "ENVOYER MA DEMANDE À ALEXANDRE"}
                    <ArrowRight className="w-4 h-4 inline" aria-hidden="true" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="glacier-success-alert" id="glacier-success" role="status">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>
                    {isEn
                      ? "Message successfully transmitted! Alexandre Pabst will personally get back to you within 24 business hours."
                      : "Message bien transmis ! Alexandre Pabst vous recontactera personnellement sous 24h ouvrées."}
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
        className="glacier-footer-info-section w-full" 
        aria-label={isEn ? "Atelier Contact Details & Opening Hours" : "Coordonnées et Horaires de l'Atelier"}
      >
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="contact-columns-3">
            
            {/* Colonne 1 : Adresse */}
            <div className="contact-col-block">
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
            <div className="contact-col-block">
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
            <div className="contact-col-block">
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


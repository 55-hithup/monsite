import { useState } from 'react';
import { Check, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export default function GlacierContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Pack Croissance PME (dès 1 850 €)',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
        throw new Error(data.message || "Une erreur est survenue lors de l'envoi de votre demande.");
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        projectType: 'Pack Croissance PME (dès 1 850 €)',
        message: '',
      });
    } catch (err) {
      console.error('Contact error:', err);
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : "Impossible d'envoyer le message. Vous pouvez m'écrire directement à contact@devsupai.fr."
      );
    }
  };

  return (
    <>
      {/* 1. Section Formulaire de Demande de Devis avec Fond Parallaxe Fixe */}
      <section className="glacier-contact-parallax-section w-full" id="contact" aria-labelledby="contact-heading">
        <div 
          className="contact-parallax-bg" 
          style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
        />
        <div className="contact-parallax-tint" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <h2 id="contact-heading" className="sr-only">
            Contact et Demande de Devis Personnalisé
          </h2>
          
          <div className="glacier-intake-box mx-auto">
            <div className="intake-header">
              <h3 className="intake-title">DEMANDER UN DEVIS PERSONNALISÉ</h3>
              <p className="intake-desc">
                Remplissez ce formulaire pour recevoir une proposition adaptée à vos objectifs et à votre budget.
              </p>
            </div>

            <form className="glacier-form" id="glacier-intake-form" onSubmit={handleSubmit}>
              <div className="form-inputs-row">
                <div>
                  <label htmlFor="client-name" className="sr-only">
                    Votre Nom et Prénom
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    id="client-name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre Nom &amp; Prénom *" 
                    required 
                    className="glacier-input"
                  />
                </div>

                <div>
                  <label htmlFor="client-email" className="sr-only">
                    Votre Adresse Email
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    id="client-email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Votre Email *" 
                    required 
                    className="glacier-input"
                  />
                </div>

                <div>
                  <label htmlFor="client-package" className="sr-only">
                    Forfait ou type de projet souhaité
                  </label>
                  <select 
                    name="projectType"
                    id="client-package" 
                    value={formData.projectType}
                    onChange={handleChange}
                    required 
                    className="glacier-input cursor-pointer"
                  >
                    <option value="Pack Croissance PME (dès 1 850 €)">Pack Croissance PME (dès 1 850 €)</option>
                    <option value="Pack Présence One-Page (dès 950 €)">Pack Présence One-Page (dès 950 €)</option>
                    <option value="Pack SaaS & Application Métier (dès 3 200 €)">Pack SaaS &amp; Outil Métier (dès 3 200 €)</option>
                    <option value="Option Google Business Profile (29 €/mois)">Option Google Business Profile (29 €/mois)</option>
                    <option value="Autre projet sur-mesure">Autre projet sur-mesure</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="client-message" className="sr-only">
                  Description de votre activité et vos attentes
                </label>
                <textarea 
                  name="message"
                  id="client-message" 
                  rows={3} 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez brièvement votre activité et vos attentes..." 
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
                    TRANSMISSION EN COURS...
                  </>
                ) : (
                  <>
                    ENVOYER MA DEMANDE À ALEXANDRE
                    <ArrowRight className="w-4 h-4 inline" aria-hidden="true" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="glacier-success-alert" id="glacier-success" role="status">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>Message bien transmis ! Alexandre Pabst vous recontactera personnellement sous 24h ouvrées.</span>
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
      <section className="glacier-footer-info-section w-full" aria-label="Coordonnées et Horaires de l'Atelier">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="contact-columns-3">
            
            {/* Colonne 1 : Adresse */}
            <div className="contact-col-block">
              <h3 className="block-title">ADRESSE DE L'ATELIER</h3>
              <p className="block-text">
                13 Allée des Roses<br />
                55300 Saint-Mihiel<br />
                Meuse (55), Grand Est • France
              </p>
              <p className="block-sub-text">
                Intervention en Meuse, Lorraine, Grand Est et toute la France à distance.
              </p>
            </div>

            {/* Colonne 2 : Contact Direct */}
            <div className="contact-col-block">
              <h3 className="block-title">CONTACT DIRECT</h3>
              <p className="block-text">
                <strong>Alexandre Pabst</strong><br />
                Email : <a href="mailto:contact@devsupai.fr" className="direct-link">contact@devsupai.fr</a><br />
                Réponse garantie sous 24h ouvrées
              </p>
              <p className="block-sub-text">
                Échange préalable gratuit et sans aucun engagement.
              </p>
            </div>

            {/* Colonne 3 : Horaires */}
            <div className="contact-col-block">
              <h3 className="block-title">HORAIRES D'OUVERTURE</h3>
              <p className="block-text">
                <strong>DU LUNDI AU VENDREDI</strong><br />
                08H00 - 18H00<br /><br />
                <strong>SAMEDI</strong><br />
                08H00 - 12H00
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

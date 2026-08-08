import React, { useState } from 'react';
import SectionReveal from './SectionReveal';
import MagneticWrapper from './MagneticWrapper';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Site vitrine',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugError, setDebugError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);
    setError('');
    setDebugError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setForm({
          name: '',
          email: '',
          phone: '',
          projectType: 'Site vitrine',
          message: '',
        });
      } else {
        setError(data.message || 'Une erreur est survenue lors de l\'envoi du message.');
        setDebugError(data.debug || '');
      }
    } catch (err: any) {
      setError('Impossible de contacter le serveur d\'envoi. Veuillez réessayer plus tard.');
      setDebugError(err.message || '');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionReveal id="contact" className="section-pad">
      <div className="wrap max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="eyebrow reveal justify-center">Contact</div>
          <h2 className="section-title reveal">Parlons de votre projet.</h2>
          <p className="section-sub reveal" style={{ margin: '20px auto 0', maxWidth: '480px' }}>
            Réponse garantie sous 24h.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12 bg-[#121729] rounded-[12px] border border-[rgba(245,246,250,0.08)] p-8">
            <span className="text-4xl inline-block animate-bounce mb-4">✉️</span>
            <h3 className="text-xl font-medium text-text-primary mb-2">Message envoyé avec succès</h3>
            <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">
              Merci pour votre intérêt. L'équipe DevSupAi a bien reçu votre demande et vous recontactera rapidement.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setError('');
                setDebugError('');
              }}
              className="label-mono text-xs text-accent hover:text-accent-hover transition-colors cursor-pointer"
            >
              envoyer un autre message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reveal bg-[#121729] border border-[rgba(245,246,250,0.08)] rounded-[16px] p-6 md:p-10" id="contactForm">
            {/* Steps / Onboarding text block */}
            <div className="mb-8 p-5 bg-[#0B0F1E]/50 border border-[rgba(245,246,250,0.04)] rounded-[10px] text-sm text-text-secondary leading-relaxed text-left">
              <h3 className="text-text-primary font-bold text-sm mb-2 flex items-center gap-2">
                <span className="text-[#2E8FE0]">✦</span> Votre projet commence simplement
              </h3>
              <p>
                J'échange gratuitement avec vous sur vos besoins, puis je réalise une première proposition visuelle pour vous permettre de vous projeter. Si elle vous convainc, nous validons ensemble le devis, un acompte lance officiellement le projet, puis je conçois les maquettes finales avant de développer votre site.
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-[6px] label-mono mb-6 space-y-1 text-left">
                <div>{error}</div>
                {debugError && (
                  <div className="text-[10px] text-red-400/70 font-mono mt-1 pt-1 border-t border-red-500/10 break-all">
                    Détails de l'erreur : {debugError}
                  </div>
                )}
              </div>
            )}
            
            <div className="form-grid">
              <div className="field">
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  id="nom"
                  placeholder="Votre nom"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="vous@entreprise.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            
            <div className="form-grid">
              <div className="field">
                <label htmlFor="tel">Téléphone (facultatif)</label>
                <input
                  type="tel"
                  id="tel"
                  placeholder="06 00 00 00 00"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="projet-type">Type de projet</label>
                <select
                  id="projet-type"
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                >
                  <option>Site vitrine</option>
                  <option>E-commerce</option>
                  <option>Application web</option>
                  <option>Développement sur mesure</option>
                  <option>Autre</option>
                </select>
              </div>
            </div>
            
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Parlez-moi de votre projet…"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            
            <div className="flex justify-end pt-2">
              <MagneticWrapper range={40} strength={0.3}>
                <button type="submit" className="submit-btn cursor-pointer" disabled={loading}>
                  {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
              </MagneticWrapper>
            </div>
          </form>
        )}
      </div>
    </SectionReveal>
  );
}

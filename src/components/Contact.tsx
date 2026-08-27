import React, { useState, useEffect } from 'react';
import SectionReveal from './SectionReveal';
import MagneticWrapper from './MagneticWrapper';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: t.options[0],
    googleBusinessOption: false,
    message: '',
  });

  // Update default projectType when language changes if not custom typed
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      projectType: t.options[0],
    }));
  }, [language]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkHashOrParams = () => {
      const fullUrl = window.location.href;
      if (fullUrl.includes('pack=presence') || fullUrl.includes('pack=croissance')) {
        setForm((prev) => ({ ...prev, projectType: t.options[0] }));
      } else if (fullUrl.includes('pack=saas')) {
        setForm((prev) => ({ ...prev, projectType: t.options[3] }));
      }
    };

    checkHashOrParams();
    window.addEventListener('hashchange', checkHashOrParams);
    return () => window.removeEventListener('hashchange', checkHashOrParams);
  }, [t.options]);

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
          projectType: t.options[0],
          googleBusinessOption: false,
          message: '',
        });
      } else {
        setError(data.message || (language === 'en' ? 'An error occurred while sending your message.' : 'Une erreur est survenue lors de l\'envoi du message.'));
        setDebugError(data.debug || '');
      }
    } catch (err: any) {
      setError(language === 'en' ? 'Unable to reach the mail server. Please try again later.' : 'Impossible de contacter le serveur d\'envoi. Veuillez réessayer plus tard.');
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
          <div className="eyebrow reveal justify-center">{t.eyebrow}</div>
          <h2 className="section-title reveal">{t.title}</h2>
          <p className="section-sub reveal" style={{ margin: '20px auto 0', maxWidth: '480px' }}>
            {t.guarantee}
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12 bg-[#121729] rounded-[12px] border border-[rgba(245,246,250,0.08)] p-8">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-text-primary mb-2">{t.successTitle}</h3>
            <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">
              {t.successText}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setError('');
                setDebugError('');
              }}
              className="label-mono text-xs text-accent hover:text-accent-hover transition-colors cursor-pointer"
            >
              {t.sendAnother}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reveal bg-[#121729] border border-[rgba(245,246,250,0.08)] rounded-[16px] p-6 md:p-10" id="contactForm">
            {/* Steps / Onboarding text block */}
            <div className="mb-8 p-5 bg-[#0B0F1E]/50 border border-[rgba(245,246,250,0.04)] rounded-[10px] text-sm text-text-secondary leading-relaxed text-left">
              <h3 className="text-text-primary font-bold text-sm mb-2">
                {t.onboardingTitle}
              </h3>
              <p>
                {t.onboardingText}
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-[6px] label-mono mb-6 space-y-1 text-left">
                <div>{error}</div>
                {debugError && (
                  <div className="text-xs text-red-400/70 font-mono mt-1 pt-1 border-t border-red-500/10 break-all">
                    Error details: {debugError}
                  </div>
                )}
              </div>
            )}
            
            <div className="form-grid">
              <div className="field">
                <label htmlFor="nom">{t.nameLabel}</label>
                <input
                  type="text"
                  id="nom"
                  placeholder={t.namePlaceholder}
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="email">{t.emailLabel}</label>
                <input
                  type="email"
                  id="email"
                  placeholder={t.emailPlaceholder}
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            
            <div className="form-grid">
              <div className="field">
                <label htmlFor="tel">{t.phoneLabel}</label>
                <input
                  type="tel"
                  id="tel"
                  placeholder={t.phonePlaceholder}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="projet-type">{t.projectTypeLabel}</label>
                <select
                  id="projet-type"
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                >
                  {t.options.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Optional Add-on Checkbox */}
            <div className="p-4 rounded-xl bg-[#0B0F1E]/60 border border-[rgba(245,246,250,0.08)] mb-6 text-left">
              <label htmlFor="googleBusinessOption" className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="googleBusinessOption"
                  checked={form.googleBusinessOption}
                  onChange={(e) => setForm({ ...form, googleBusinessOption: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-[#2E8FE0] rounded cursor-pointer"
                  aria-label={t.googleBusinessTitle}
                />
                <div>
                  <div className="text-xs font-bold text-text-primary">
                    {t.googleBusinessTitle}
                  </div>
                  <div className="text-xs text-text-secondary mt-0.5 leading-snug">
                    {t.googleBusinessDesc}
                  </div>
                </div>
              </label>
            </div>
            
            <div className="field">
              <label htmlFor="message">{t.messageLabel}</label>
              <textarea
                id="message"
                placeholder={t.messagePlaceholder}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            
            <div className="flex justify-end pt-2">
              <MagneticWrapper range={40} strength={0.3}>
                <button type="submit" className="submit-btn cursor-pointer" disabled={loading}>
                  {loading ? t.submitting : t.submitBtn}
                </button>
              </MagneticWrapper>
            </div>
          </form>
        )}
      </div>
    </SectionReveal>
  );
}

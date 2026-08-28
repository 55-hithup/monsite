import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { getFirebaseAuth } from '../../lib/firebase';
import { useLanguage } from '../../i18n/LanguageContext';
import { pagesData } from '../../i18n/pagesData';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';

export default function Login() {
  const { language } = useLanguage();
  const t = pagesData[language]?.admin || pagesData.fr.admin;

  useDocumentMetadata(
    {
      fr: "Connexion Administration | DevSupAi",
      en: "Admin Sign In | DevSupAi",
    },
    {
      fr: "Espace d'administration et de modération des avis clients DevSupAi.",
      en: "DevSupAi admin and testimonial moderation dashboard sign in.",
    },
    "/admin/login"
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let isMounted = true;

    async function initAuth() {
      const auth = await getFirebaseAuth();
      if (!isMounted) return;
      if (!auth) {
        setError(language === 'en' ? "Firebase Authentication service is not configured. Please set environment variables in Vercel." : "Le service d'authentification Firebase n'est pas configuré. Veuillez renseigner vos variables d'environnement dans Vercel.");
        return;
      }
      setError('');
      try {
        const { onAuthStateChanged } = await import('firebase/auth');
        unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user && isMounted) {
            navigate('/admin/avis');
          }
        });
      } catch (err) {
        console.error('Error listening to auth state:', err);
      }
    }

    initAuth();
    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, [navigate, language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(language === 'en' ? 'Please fill in all fields.' : 'Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const auth = await getFirebaseAuth();
      if (!auth) {
        setError(language === 'en' ? "Authentication service is currently unavailable." : "Le service d'authentification n'est pas disponible.");
        return;
      }
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/avis');
    } catch (err: any) {
      console.error(err);
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        setError(language === 'en' ? 'Invalid credentials. Please try again.' : 'Identifiants incorrects. Veuillez réessayer.');
      } else {
        setError(language === 'en' ? 'An error occurred while signing in.' : 'Une erreur est survenue lors de la connexion.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-6 py-24 text-left">
      <div className="max-w-md w-full">
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E5E5E5] shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0284C7]/30 bg-[#0284C7]/10 text-xs font-bold font-['Montserrat'] text-[#0284C7] mb-4">
              <span>ADMINISTRATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-[#1A1A1A]">{t.loginTitle}</h1>
            <p className="text-xs text-[#666666] mt-1 font-['Plus_Jakarta_Sans']">{t.loginSubtitle}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-700 font-medium leading-relaxed flex items-center gap-2.5">
              <AlertCircle size={16} className="flex-shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold font-['Montserrat'] text-[#1A1A1A] uppercase mb-1.5">{t.emailLabel}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@devsupai.fr"
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#CCCCCC] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-bold font-['Montserrat'] text-[#1A1A1A] uppercase mb-1.5">{t.passwordLabel}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#CCCCCC] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full btn-glacier-solid mt-6 text-xs py-3 flex justify-center items-center cursor-pointer font-bold"
              disabled={loading}
            >
              {loading ? t.connecting : t.loginBtn}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

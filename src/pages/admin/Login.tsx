import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import SectionReveal from '../../components/SectionReveal';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Firebase Config Setup state
  const [showConfig, setShowConfig] = useState(false);
  const [cfgApiKey, setCfgApiKey] = useState(import.meta.env.VITE_FIREBASE_API_KEY || '');
  const [cfgAuthDomain, setCfgAuthDomain] = useState(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '');
  const [cfgProjectId, setCfgProjectId] = useState(import.meta.env.VITE_FIREBASE_PROJECT_ID || '');
  const [cfgStorageBucket, setCfgStorageBucket] = useState(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '');
  const [cfgMessagingSenderId, setCfgMessagingSenderId] = useState(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '');
  const [cfgAppId, setCfgAppId] = useState(import.meta.env.VITE_FIREBASE_APP_ID || '');
  const [cfgMeasurementId, setCfgMeasurementId] = useState(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '');

  useEffect(() => {
    // Populate form with custom settings from localStorage if it exists
    try {
      const saved = localStorage.getItem('devsupai_firebase_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed) {
          if (parsed.apiKey) setCfgApiKey(parsed.apiKey);
          if (parsed.authDomain) setCfgAuthDomain(parsed.authDomain);
          if (parsed.projectId) setCfgProjectId(parsed.projectId);
          if (parsed.storageBucket) setCfgStorageBucket(parsed.storageBucket);
          if (parsed.messagingSenderId) setCfgMessagingSenderId(parsed.messagingSenderId);
          if (parsed.appId) setCfgAppId(parsed.appId);
          if (parsed.measurementId) setCfgMeasurementId(parsed.measurementId);
        }
      }
    } catch (e) {
      console.error('Error loading config from localStorage:', e);
    }
  }, []);

  useEffect(() => {
    if (!auth) {
      setError("Le service d'authentification Firebase n'est pas encore configuré sur ce navigateur ou dans Vercel.");
      return;
    }
    setError('');
    // If already logged in, redirect straight to dashboard
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/admin/avis');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (!auth) {
      setError("Le service d'authentification n'est pas disponible. Veuillez d'abord configurer Firebase.");
      return;
    }
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/avis');
    } catch (err: any) {
      console.error(err);
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        setError('Identifiants incorrects. Veuillez réessayer.');
      } else {
        setError('Une erreur est survenue lors de la connexion.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cfgApiKey || !cfgProjectId) {
      alert("La clé d'API et l'ID de projet sont obligatoires.");
      return;
    }
    const newConfig = {
      apiKey: cfgApiKey.trim(),
      authDomain: cfgAuthDomain.trim(),
      projectId: cfgProjectId.trim(),
      storageBucket: cfgStorageBucket.trim(),
      messagingSenderId: cfgMessagingSenderId.trim(),
      appId: cfgAppId.trim(),
      measurementId: cfgMeasurementId.trim(),
    };
    try {
      localStorage.setItem('devsupai_firebase_config', JSON.stringify(newConfig));
      alert('Configuration enregistrée ! La page va s\'actualiser pour charger le nouveau projet.');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la sauvegarde locale.');
    }
  };

  const handleResetConfig = () => {
    if (window.confirm("Voulez-vous réinitialiser et utiliser les variables d'environnement par défaut ?")) {
      try {
        localStorage.removeItem('devsupai_firebase_config');
        alert('Configuration réinitialisée ! La page va s\'actualiser.');
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <SectionReveal className="section-pad text-left flex items-center justify-center" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <div className="wrap max-w-md w-full">
        <div className="p-8 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] shadow-2xl backdrop-blur-md">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#6B4FE0]/30 bg-[#6B4FE0]/10 text-[10px] label-mono text-purple-300 mb-3">
              <span className="text-[#2E8FE0] font-bold">&lt;/&gt;</span>
              <span>ADMINISTRATION</span>
            </div>
            <h1 className="text-2xl font-extrabold text-text-primary">Connexion</h1>
            <p className="text-xs text-text-secondary mt-1">Espace de modération des avis clients</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-xs text-red-400 font-medium leading-relaxed">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] label-mono text-purple-300 uppercase mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@devsupai.fr"
                className="w-full px-4 py-2.5 rounded-lg bg-[#070913]/80 border border-[rgba(245,246,250,0.08)] text-sm text-text-primary focus:outline-none focus:border-[#2E8FE0] transition-colors"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-[10px] label-mono text-purple-300 uppercase mb-1">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-lg bg-[#070913]/80 border border-[rgba(245,246,250,0.08)] text-sm text-text-primary focus:outline-none focus:border-[#2E8FE0] transition-colors"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary mt-6 text-sm py-2.5 flex justify-center items-center cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#fff', border: 'none' }}
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>

            {/* Custom Firebase Setup Trigger */}
            <div className="text-center mt-6 pt-4 border-t border-[rgba(245,246,250,0.04)]">
              <button
                type="button"
                onClick={() => setShowConfig(true)}
                className="text-[10px] label-mono text-purple-300/60 hover:text-purple-300 transition-colors cursor-pointer"
              >
                ⚙️ Configurer le projet Firebase
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Firebase Setup Modal */}
      {showConfig && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-[#121729]/95 border border-[rgba(245,246,250,0.08)] shadow-2xl p-6 my-8 text-left relative">
            <button 
              onClick={() => setShowConfig(false)}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary text-lg cursor-pointer"
            >
              ✕
            </button>

            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-text-primary">Configuration Firebase</h3>
                <p className="text-xs text-text-secondary mt-1">Saisissez les identifiants de votre projet de base de données.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] label-mono text-purple-300 uppercase mb-1">Clé d'API (apiKey)</label>
                  <input
                    type="text"
                    required
                    value={cfgApiKey}
                    onChange={(e) => setCfgApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full px-3 py-2 rounded-lg bg-[#070913]/60 border border-[rgba(245,246,250,0.06)] text-xs text-text-primary focus:outline-none focus:border-[#2E8FE0]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] label-mono text-purple-300 uppercase mb-1">ID Projet (projectId)</label>
                  <input
                    type="text"
                    required
                    value={cfgProjectId}
                    onChange={(e) => setCfgProjectId(e.target.value)}
                    placeholder="site-devsupai"
                    className="w-full px-3 py-2 rounded-lg bg-[#070913]/60 border border-[rgba(245,246,250,0.06)] text-xs text-text-primary focus:outline-none focus:border-[#2E8FE0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] label-mono text-purple-300 uppercase mb-1">Domaine Auth (authDomain)</label>
                  <input
                    type="text"
                    value={cfgAuthDomain}
                    onChange={(e) => setCfgAuthDomain(e.target.value)}
                    placeholder="site-devsupai.firebaseapp.com"
                    className="w-full px-3 py-2 rounded-lg bg-[#070913]/60 border border-[rgba(245,246,250,0.06)] text-xs text-text-primary focus:outline-none focus:border-[#2E8FE0]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] label-mono text-purple-300 uppercase mb-1">Storage Bucket</label>
                  <input
                    type="text"
                    value={cfgStorageBucket}
                    onChange={(e) => setCfgStorageBucket(e.target.value)}
                    placeholder="site-devsupai.firebasestorage.app"
                    className="w-full px-3 py-2 rounded-lg bg-[#070913]/60 border border-[rgba(245,246,250,0.06)] text-xs text-text-primary focus:outline-none focus:border-[#2E8FE0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] label-mono text-purple-300 uppercase mb-1">Messaging Sender ID</label>
                  <input
                    type="text"
                    value={cfgMessagingSenderId}
                    onChange={(e) => setCfgMessagingSenderId(e.target.value)}
                    placeholder="201980154348"
                    className="w-full px-3 py-2 rounded-lg bg-[#070913]/60 border border-[rgba(245,246,250,0.06)] text-xs text-text-primary focus:outline-none focus:border-[#2E8FE0]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] label-mono text-purple-300 uppercase mb-1">App ID (appId)</label>
                  <input
                    type="text"
                    value={cfgAppId}
                    onChange={(e) => setCfgAppId(e.target.value)}
                    placeholder="1:201980154348:web:..."
                    className="w-full px-3 py-2 rounded-lg bg-[#070913]/60 border border-[rgba(245,246,250,0.06)] text-xs text-text-primary focus:outline-none focus:border-[#2E8FE0]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] label-mono text-purple-300 uppercase mb-1">Measurement ID (measurementId - facultatif)</label>
                <input
                  type="text"
                  value={cfgMeasurementId}
                  onChange={(e) => setCfgMeasurementId(e.target.value)}
                  placeholder="G-..."
                  className="w-full px-3 py-2 rounded-lg bg-[#070913]/60 border border-[rgba(245,246,250,0.06)] text-xs text-text-primary focus:outline-none focus:border-[#2E8FE0]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4 border-t border-[rgba(245,246,250,0.04)]">
                <button
                  type="button"
                  onClick={handleResetConfig}
                  className="px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer text-left sm:text-center"
                >
                  Réinitialiser par défaut
                </button>
                
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowConfig(false)}
                    className="px-4 py-2 text-xs font-bold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white rounded-lg transition-colors cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)' }}
                  >
                    Enregistrer la config
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </SectionReveal>
  );
}

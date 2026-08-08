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

  useEffect(() => {
    if (!auth) {
      setError("Le service d'authentification Firebase n'est pas configuré. Veuillez renseigner vos variables d'environnement dans Vercel.");
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
      setError("Le service d'authentification n'est pas disponible.");
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
          </form>
        </div>
      </div>
    </SectionReveal>
  );
}

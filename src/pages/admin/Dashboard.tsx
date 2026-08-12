import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { LogOut, Clock, Check, CheckCircle2, Trash2, EyeOff, AlertTriangle, Star, Printer, MessageSquare } from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import SectionReveal from '../../components/SectionReveal';
import FlyerStudio from '../../components/admin/FlyerStudio';

interface TestimonialDoc {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  approved: boolean;
  created_at?: any;
}

export default function Dashboard() {
  const [reviews, setReviews] = useState<TestimonialDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<'reviews' | 'flyers'>('reviews');
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/admin/login');
      return;
    }
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    if (checkingAuth || !db) return;

    const q = query(collection(db, 'testimonials'), orderBy('created_at', 'desc'));
    const unsubscribeSnapshot = onSnapshot(
      q,
      (snapshot) => {
        const list: TestimonialDoc[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as TestimonialDoc);
        });
        setReviews(list);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching testimonials:', error);
        setLoading(false);
      }
    );

    return () => unsubscribeSnapshot();
  }, [checkingAuth]);

  const handleApprove = async (id: string, approve: boolean) => {
    if (!db) return;
    try {
      const docRef = doc(db, 'testimonials', id);
      await updateDoc(docRef, { approved: approve });
    } catch (err) {
      console.error('Error updating review:', err);
      alert('Une erreur est survenue lors de la mise à jour.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!db) return;
    if (!window.confirm('Voulez-vous vraiment supprimer définitivement cet avis ?')) return;
    try {
      const docRef = doc(db, 'testimonials', id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Une erreur est survenue lors de la suppression.');
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  if (!auth || !db) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#070913] text-text-secondary font-mono text-xs p-4 text-center">
        <div className="max-w-md p-6 rounded-2xl bg-[#121729]/60 border border-red-500/20 shadow-2xl backdrop-blur-md flex flex-col items-center">
          <AlertTriangle size={20} className="text-red-400 mb-3" />
          <p className="mb-2 text-sm font-bold text-text-primary">Configuration Firebase manquante</p>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            Le tableau de bord ne peut pas se connecter car les variables d'environnement Firebase ne sont pas définies sur votre projet.
          </p>
        </div>
      </div>
    );
  }

  if (checkingAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070913] text-text-secondary font-mono text-xs">
        Chargement de la session...
      </div>
    );
  }

  const pendingReviews = reviews.filter((r) => !r.approved);
  const approvedReviews = reviews.filter((r) => r.approved);

  return (
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <div className="wrap max-w-6xl">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[rgba(245,246,250,0.06)] pb-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#6B4FE0]/30 bg-[#6B4FE0]/10 text-[10px] label-mono text-purple-300 mb-2">
              <span className="text-[#2E8FE0] font-bold">&lt;/&gt;</span>
              <span>CONSOLE D'ADMINISTRATION</span>
            </div>
            <h1 className="text-3xl font-extrabold text-text-primary">Tableau de bord Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-ghost text-xs px-4 py-2 flex items-center gap-2 cursor-pointer"
            style={{ border: '1px solid rgba(245,246,250,0.12)' }}
          >
            <LogOut size={13} />
            <span>Se déconnecter</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-xl text-xs label-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'reviews'
                ? 'bg-accent/20 border border-accent text-white shadow-lg shadow-accent/20'
                : 'bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] text-text-secondary hover:text-text-primary'
            }`}
          >
            <MessageSquare size={14} />
            <span>Gestion des Avis ({reviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('flyers')}
            className={`px-4 py-2 rounded-xl text-xs label-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'flyers'
                ? 'bg-accent/20 border border-accent text-white shadow-lg shadow-accent/20'
                : 'bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] text-text-secondary hover:text-text-primary'
            }`}
          >
            <Printer size={14} />
            <span>Studio Flyers & Visuels (Canva Clone)</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'flyers' ? (
          <FlyerStudio />
        ) : (
          /* Dashboard Grid for Reviews */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* COLUMN 1: PENDING REVIEWS */}
          <div>
            <h2 className="text-sm font-bold label-mono text-purple-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock size={14} className="text-purple-400" />
              <span>En attente de validation</span>
              <span className="px-2 py-0.5 rounded-full bg-[#1b223d] text-[10px] text-purple-200">
                {pendingReviews.length}
              </span>
            </h2>

            {pendingReviews.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#121729]/30 border border-dashed border-[rgba(245,246,250,0.04)] text-center text-text-secondary text-xs">
                Aucun avis en attente de modération.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <div key={review.id} className="p-5 rounded-2xl bg-[#121729]/60 border border-yellow-500/20 shadow-lg relative flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-sm font-bold text-text-primary">{review.name}</div>
                          <div className="text-[11px] text-text-secondary">{review.role}</div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={11} 
                              fill={i < (review.rating || 5) ? '#F5C451' : 'transparent'} 
                              stroke={i < (review.rating || 5) ? '#F5C451' : 'rgba(245,246,250,0.15)'} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary italic leading-relaxed mb-4">
                        "{review.quote}"
                      </p>
                    </div>

                    <div className="flex gap-2 justify-end border-t border-[rgba(245,246,250,0.04)] pt-3">
                      <button
                        onClick={() => handleApprove(review.id, true)}
                        className="px-3 py-1.5 bg-[#2E8FE0] hover:bg-[#2E8FE0]/80 text-[10px] font-bold text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Check size={11} />
                        <span>Approuver</span>
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-[10px] font-bold text-red-400 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Trash2 size={11} />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* COLUMN 2: APPROVED REVIEWS */}
          <div>
            <h2 className="text-sm font-bold label-mono text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>Avis en ligne</span>
              <span className="px-2 py-0.5 rounded-full bg-[#1b223d] text-[10px] text-emerald-300">
                {approvedReviews.length}
              </span>
            </h2>

            {approvedReviews.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#121729]/30 border border-dashed border-[rgba(245,246,250,0.04)] text-center text-text-secondary text-xs">
                Aucun avis n'est actuellement visible sur le site.
              </div>
            ) : (
              <div className="space-y-4">
                {approvedReviews.map((review) => (
                  <div key={review.id} className="p-5 rounded-2xl bg-[#121729]/40 border border-[rgba(245,246,250,0.06)] shadow-lg relative flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-sm font-bold text-text-primary">{review.name}</div>
                          <div className="text-[11px] text-text-secondary">{review.role}</div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={11} 
                              fill={i < (review.rating || 5) ? '#F5C451' : 'transparent'} 
                              stroke={i < (review.rating || 5) ? '#F5C451' : 'rgba(245,246,250,0.15)'} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary italic leading-relaxed mb-4">
                        "{review.quote}"
                      </p>
                    </div>

                    <div className="flex gap-2 justify-end border-t border-[rgba(245,246,250,0.04)] pt-3">
                      <button
                        onClick={() => handleApprove(review.id, false)}
                        className="px-3 py-1.5 bg-[#1b223d] hover:bg-[#1b223d]/80 text-[10px] font-bold text-purple-300 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <EyeOff size={11} />
                        <span>Masquer</span>
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-[10px] font-bold text-red-400 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Trash2 size={11} />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </SectionReveal>
  );
}

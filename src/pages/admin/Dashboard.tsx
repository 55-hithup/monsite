import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  EyeOff, 
  Eye, 
  AlertTriangle, 
  Star, 
  Pencil, 
  Plus, 
  X, 
  DownloadCloud,
  Camera,
  Check
} from 'lucide-react';
import type { Area, Point } from 'react-easy-crop';
import { getFirebaseAuth, getFirebaseDb } from '../../lib/firebase';
import SectionReveal from '../../components/SectionReveal';

const Cropper = lazy(() => import('react-easy-crop'));

interface TestimonialDoc {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  approved: boolean;
  avatar?: string | null;
  created_at?: any;
}

const initialDefaultReviews = [
  {
    name: "Thomas Mercier",
    role: "Fondateur, Mercier Rénovation & Bois",
    quote: "« Passer d'un ancien template WordPress lent à un site sur-mesure développé par Alexandre a tout changé. Mon planning de chantiers est complet plusieurs mois à l'avance grâce aux demandes de devis qualifiées qui arrivent régulièrement. Un investissement très vite rentabilisé. »",
    rating: 5,
    approved: false,
  },
  {
    name: "Dr. Sophie Laurent",
    role: "Chirurgien-Dentiste, Cabinet Dentaire",
    quote: "« Alexandre a su concevoir un site à la fois épuré, rassurant et ultra-rapide pour nos patients. La navigation sur smartphone est parfaite, les informations sont claires et nous avons d'excellents retours au quotidien. Un professionnalisme rare et un suivi exemplaire. »",
    rating: 5,
    approved: false,
  },
  {
    name: "Julien Caron",
    role: "Directeur Général, LogiMat Outils",
    quote: "« Nous avions besoin d'une interface sur-mesure performante et d'une vitrine moderne pour nos clients professionnels. Le site charge en un clin d'œil et nos équipes gagnent un temps précieux dans le suivi des demandes. Alexandre a parfaitement cerné nos enjeux. »",
    rating: 5,
    approved: false,
  },
  {
    name: "Claire Dubosc",
    role: "Fondatrice, Studio Verrière",
    quote: "« Le résultat dépasse largement mes attentes. Les demandes de contact sont régulières et mes clients me complimentent sur le site à chaque échange. Un travail d'une qualité remarquable du premier pixel jusqu'à la mise en ligne. »",
    rating: 5,
    approved: true,
  },
  {
    name: "Karim Belaïd",
    role: "CEO, Neuron Labs",
    quote: "« Un vrai partenaire, pas juste un prestataire. Chaque détail a été pensé pour ma marque, avec un sens de la performance et une réactivité exemplaires. Le site est un véritable levier de croissance. »",
    rating: 5,
    approved: true,
  },
  {
    name: "Léa Fontaine",
    role: "Directrice, Maison Lucine",
    quote: "« Rapide, réactif et incroyablement précis. Le site est aujourd'hui mon meilleur commercial, disponible 24h/24 avec des temps de chargement instantanés. Je recommande sans la moindre hésitation. »",
    rating: 5,
    approved: true,
  },
];

// Canvas crop helper
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (err) => reject(err));
    if (!url.startsWith('data:') && !url.startsWith('blob:')) {
      image.setAttribute('crossOrigin', 'anonymous');
    }
    image.src = url;
  });

async function getCroppedImg(imageSrc: string, pixelCrop: Area | null): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return '';

  canvas.width = 120;
  canvas.height = 120;

  const cropX = pixelCrop ? Math.max(0, pixelCrop.x) : 0;
  const cropY = pixelCrop ? Math.max(0, pixelCrop.y) : 0;
  const cropW = pixelCrop && pixelCrop.width ? pixelCrop.width : (image.naturalWidth || image.width);
  const cropH = pixelCrop && pixelCrop.height ? pixelCrop.height : (image.naturalHeight || image.height);

  ctx.drawImage(
    image,
    cropX,
    cropY,
    cropW,
    cropH,
    0,
    0,
    120,
    120
  );

  return canvas.toDataURL('image/webp', 0.8);
}

export default function Dashboard() {
  const [reviews, setReviews] = useState<TestimonialDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [isImporting, setIsImporting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Modal State (Edit or Create)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<TestimonialDoc | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formQuote, setFormQuote] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formApproved, setFormApproved] = useState(true);
  const [formAvatar, setFormAvatar] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Avatar Cropper States
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const autoSeededRef = useRef(false);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    let unsubscribeAuth: (() => void) | undefined;
    let isMounted = true;

    async function initAuth() {
      const auth = await getFirebaseAuth();
      if (!isMounted) return;
      if (!auth) {
        setConfigError(true);
        setCheckingAuth(false);
        return;
      }
      try {
        const { onAuthStateChanged } = await import('firebase/auth');
        unsubscribeAuth = onAuthStateChanged(auth, (user) => {
          if (!isMounted) return;
          if (!user) {
            navigate('/admin/login');
          } else {
            setCheckingAuth(false);
          }
        });
      } catch (err) {
        console.error('Error in onAuthStateChanged:', err);
        if (isMounted) setCheckingAuth(false);
      }
    }

    initAuth();
    return () => {
      isMounted = false;
      if (unsubscribeAuth) unsubscribeAuth();
    };
  }, [navigate]);

  useEffect(() => {
    if (checkingAuth) return;
    let unsubscribeSnapshot: (() => void) | undefined;
    let isMounted = true;

    async function initReviews() {
      const db = await getFirebaseDb();
      if (!isMounted) return;
      if (!db) {
        setConfigError(true);
        setLoading(false);
        return;
      }

      try {
        const { collection, query, orderBy, onSnapshot, addDoc } = await import('firebase/firestore');
        const q = query(collection(db, 'testimonials'), orderBy('created_at', 'desc'));
        unsubscribeSnapshot = onSnapshot(
          q,
          async (snapshot) => {
            if (!isMounted) return;
            const list: TestimonialDoc[] = [];
            snapshot.forEach((docSnap) => {
              list.push({ id: docSnap.id, ...docSnap.data() } as TestimonialDoc);
            });

            // Auto-seed initial reviews into Firestore if the collection is empty
            if (list.length === 0 && !autoSeededRef.current) {
              autoSeededRef.current = true;
              try {
                for (const item of initialDefaultReviews) {
                  await addDoc(collection(db, 'testimonials'), {
                    ...item,
                    avatar: null,
                    created_at: new Date(),
                  });
                }
                return;
              } catch (err) {
                console.error('Error auto-seeding testimonials:', err);
              }
            }

            setReviews(list);
            setLoading(false);
          },
          (error) => {
            console.error('Error fetching testimonials:', error);
            if (isMounted) setLoading(false);
          }
        );
      } catch (err) {
        console.error('Error loading Firestore modules:', err);
        if (isMounted) setLoading(false);
      }
    }

    initReviews();
    return () => {
      isMounted = false;
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, [checkingAuth]);

  // Open Edit Modal
  const handleOpenEdit = (review: TestimonialDoc) => {
    setEditingReview(review);
    setFormName(review.name);
    setFormRole(review.role);
    setFormQuote(review.quote.replace(/^[«"]\s*|\s*[»"]$/g, ''));
    setFormRating(review.rating || 5);
    setFormApproved(review.approved ?? true);
    setFormAvatar(review.avatar || null);
    setImageSrc(null);
    setIsModalOpen(true);
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingReview(null);
    setFormName('');
    setFormRole('');
    setFormQuote('');
    setFormRating(5);
    setFormApproved(true);
    setFormAvatar(null);
    setImageSrc(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReview(null);
    setImageSrc(null);
  };

  // File change for avatar cropping
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result as string);
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const applyCroppedImage = async () => {
    try {
      if (imageSrc) {
        const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
        setFormAvatar(cropped);
        setImageSrc(null);
      }
    } catch (e) {
      console.error(e);
      alert("Une erreur est survenue lors du recadrage de l'image.");
    }
  };

  // Save changes (Create or Update)
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formRole.trim() || !formQuote.trim()) {
      alert('Veuillez renseigner tous les champs obligatoires.');
      return;
    }

    setIsSaving(true);
    try {
      const db = await getFirebaseDb();
      if (!db) throw new Error("Base de données indisponible.");

      const { doc, updateDoc, collection, addDoc } = await import('firebase/firestore');

      let finalAvatar = formAvatar;

      // If an image was loaded in the cropper, auto-crop it before saving!
      if (imageSrc) {
        try {
          finalAvatar = await getCroppedImg(imageSrc, croppedAreaPixels);
        } catch (cropErr) {
          console.error('Error auto-cropping avatar on save:', cropErr);
        }
      }

      const formattedQuote = `« ${formQuote.trim()} »`;
      if (editingReview) {
        // Update existing review
        const docRef = doc(db, 'testimonials', editingReview.id);
        await updateDoc(docRef, {
          name: formName.trim(),
          role: formRole.trim(),
          quote: formattedQuote,
          rating: formRating,
          approved: formApproved,
          avatar: finalAvatar || null,
        });
        showNotification('Avis et photo enregistrés avec succès !');
      } else {
        // Create new review
        await addDoc(collection(db, 'testimonials'), {
          name: formName.trim(),
          role: formRole.trim(),
          quote: formattedQuote,
          rating: formRating,
          approved: formApproved,
          avatar: finalAvatar || null,
          created_at: new Date(),
        });
        showNotification('Nouvel avis ajouté avec succès !');
      }
      handleCloseModal();
    } catch (err) {
      console.error('Error saving review:', err);
      alert("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle approval
  const handleToggleApprove = async (id: string, currentApproved: boolean) => {
    try {
      const db = await getFirebaseDb();
      if (!db) return;
      const { doc, updateDoc } = await import('firebase/firestore');
      const docRef = doc(db, 'testimonials', id);
      await updateDoc(docRef, { approved: !currentApproved });
      showNotification(!currentApproved ? 'Avis publié sur le site !' : 'Avis masqué du site.');
    } catch (err) {
      console.error('Error updating review:', err);
      alert('Une erreur est survenue lors de la mise à jour.');
    }
  };

  // Delete review
  const handleDelete = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer définitivement cet avis ?')) return;
    try {
      const db = await getFirebaseDb();
      if (!db) return;
      const { doc, deleteDoc } = await import('firebase/firestore');
      const docRef = doc(db, 'testimonials', id);
      await deleteDoc(docRef);
      showNotification('Avis supprimé définitivement.');
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Une erreur est survenue lors de la suppression.');
    }
  };

  // Sync the 3 target reviews directly into Firestore as PENDING (en attente)
  const handleSyncThreeReviews = async () => {
    setIsImporting(true);
    try {
      const db = await getFirebaseDb();
      if (!db) throw new Error("Base de données indisponible.");
      const { doc, updateDoc, collection, addDoc } = await import('firebase/firestore');

      const targetThree = initialDefaultReviews.slice(0, 3);
      for (const item of targetThree) {
        const existing = reviews.find((r) => r.name.toLowerCase() === item.name.toLowerCase());
        if (existing) {
          // If already in Firestore, update approved to false to move it to 'En attente'
          const docRef = doc(db, 'testimonials', existing.id);
          await updateDoc(docRef, { approved: false });
        } else {
          // Otherwise, insert as new pending review
          await addDoc(collection(db, 'testimonials'), {
            ...item,
            approved: false,
            avatar: null,
            created_at: new Date(),
          });
        }
      }
      setFilter('pending');
      showNotification('3 avis placés dans l\'onglet « En attente » !');
    } catch (err) {
      console.error('Error syncing 3 reviews:', err);
      alert("Une erreur est survenue lors de l'ajout des avis.");
    } finally {
      setIsImporting(false);
    }
  };

  // Import initial default reviews into Firestore
  const handleImportDefaults = async () => {
    if (!window.confirm('Voulez-vous importer les avis initiaux dans la base de données Firestore pour pouvoir les éditer ?')) return;
    
    setIsImporting(true);
    try {
      const db = await getFirebaseDb();
      if (!db) throw new Error("Base de données indisponible.");
      const { collection, addDoc } = await import('firebase/firestore');

      for (const item of initialDefaultReviews) {
        await addDoc(collection(db, 'testimonials'), {
          ...item,
          avatar: null,
          created_at: new Date(),
        });
      }
      showNotification('Les avis initiaux ont été importés avec succès dans Firestore !');
    } catch (err) {
      console.error('Error importing default reviews:', err);
      alert("Une erreur est survenue lors de l'import des avis initiaux.");
    } finally {
      setIsImporting(false);
    }
  };

  const handleLogout = async () => {
    try {
      const auth = await getFirebaseAuth();
      if (auth) {
        const { signOut } = await import('firebase/auth');
        await signOut(auth);
      }
      navigate('/admin/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  if (configError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#070913] text-text-secondary font-mono text-xs p-4 text-center">
        <div className="max-w-md p-6 rounded-2xl bg-[#121729]/60 border border-red-500/20 shadow-2xl backdrop-blur-md flex flex-col items-center">
          <AlertTriangle size={20} className="text-red-400 mb-3" />
          <p className="mb-2 text-sm font-bold text-text-primary">Configuration Firebase manquante</p>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            Le tableau de bord ne peut pas se connecter car les variables d'environnement Firebase ne sont pas définies.
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

  const filteredReviews = filter === 'pending' 
    ? pendingReviews 
    : filter === 'approved' 
    ? approvedReviews 
    : reviews;

  return (
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <div className="wrap max-w-6xl">
        {/* Toast notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-emerald-500/90 text-white font-medium text-xs shadow-2xl backdrop-blur-md flex items-center gap-2 transition-all">
            <CheckCircle2 size={16} />
            <span>{notification}</span>
          </div>
        )}

        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[rgba(245,246,250,0.06)] pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#6B4FE0]/30 bg-[#6B4FE0]/10 text-[10px] label-mono text-purple-300 mb-2">
              <span className="text-[#2E8FE0] font-bold">&lt;/&gt;</span>
              <span>CONSOLE MODÉRATEUR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">Gestion & Édition des Témoignages</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-[#2E8FE0] hover:bg-[#2E8FE0]/80 text-xs font-bold text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Plus size={14} />
              <span>Ajouter un avis</span>
            </button>

            <button
              onClick={handleSyncThreeReviews}
              disabled={isImporting}
              className="px-3.5 py-2 bg-yellow-500/15 hover:bg-yellow-500/25 border border-yellow-500/30 text-xs font-semibold text-yellow-300 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <DownloadCloud size={14} className="text-yellow-400" />
              <span>{isImporting ? 'Injection...' : 'Injecter 3 avis en attente'}</span>
            </button>

            {reviews.length === 0 && (
              <button
                onClick={handleImportDefaults}
                disabled={isImporting}
                className="px-3.5 py-2 bg-[#1b223d] hover:bg-[#232c4f] border border-[rgba(245,246,250,0.1)] text-xs font-medium text-purple-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <DownloadCloud size={14} className="text-emerald-400" />
                <span>{isImporting ? 'Importation...' : 'Importer tous les avis'}</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="btn btn-ghost text-xs px-3.5 py-2 flex items-center gap-2 cursor-pointer"
              style={{ border: '1px solid rgba(245,246,250,0.12)' }}
            >
              <LogOut size={13} />
              <span>Se déconnecter</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Quick Stats */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#121729]/80 border border-[rgba(245,246,250,0.06)]">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filter === 'all' 
                  ? 'bg-[#2E8FE0] text-white shadow-sm' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Tous les avis ({reviews.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                filter === 'pending' 
                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 font-bold' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Clock size={12} />
              <span>En attente ({pendingReviews.length})</span>
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                filter === 'approved' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <CheckCircle2 size={12} />
              <span>En ligne ({approvedReviews.length})</span>
            </button>
          </div>

          {reviews.length > 0 && reviews.length < 6 && (
            <button
              onClick={handleImportDefaults}
              disabled={isImporting}
              className="text-[11px] label-mono text-purple-300 hover:text-purple-200 underline cursor-pointer flex items-center gap-1"
            >
              <DownloadCloud size={12} />
              <span>Importer les avis d'exemple manquants</span>
            </button>
          )}
        </div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#121729]/30 border border-dashed border-[rgba(245,246,250,0.06)] text-center text-text-secondary text-sm">
            <p className="mb-3">Aucun avis trouvé dans cette catégorie.</p>
            <button
              onClick={handleSyncThreeReviews}
              disabled={isImporting}
              className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 text-xs font-bold text-yellow-300 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <DownloadCloud size={14} />
              <span>Injecter 3 avis en attente de modération</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredReviews.map((review) => (
              <div 
                key={review.id} 
                className={`p-5 rounded-2xl bg-[#121729]/60 border shadow-lg relative flex flex-col justify-between transition-all ${
                  review.approved 
                    ? 'border-[rgba(245,246,250,0.08)] hover:border-[rgba(46,143,224,0.3)]' 
                    : 'border-yellow-500/30 bg-yellow-950/10'
                }`}
              >
                <div>
                  {/* Top Bar: Author & Stars & Status */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      {review.avatar ? (
                        <img 
                          src={review.avatar}
                          alt={review.name}
                          className="w-10 h-10 rounded-full object-cover border border-[rgba(245,246,250,0.15)] flex-shrink-0 bg-[#1b223d]"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full flex-shrink-0 bg-gradient-to-br from-[#2E8FE0]/40 to-[#6B4FE0]/40 border border-[rgba(245,246,250,0.12)] flex items-center justify-center text-xs font-bold text-text-primary">
                          {review.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-bold text-text-primary">{review.name}</div>
                        <div className="text-[11px] text-text-secondary">{review.role}</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        review.approved 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {review.approved ? 'En ligne' : 'En attente'}
                      </span>
                      <div className="flex gap-0.5" role="img" aria-label={`Note : ${review.rating || 5} sur 5 étoiles`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            fill={i < (review.rating || 5) ? '#F5C451' : 'transparent'} 
                            stroke={i < (review.rating || 5) ? '#F5C451' : 'rgba(245,246,250,0.15)'} 
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-xs text-text-primary/90 italic leading-relaxed mb-4 bg-[#070913]/30 p-3 rounded-xl border border-[rgba(245,246,250,0.04)]">
                    {review.quote}
                  </p>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between border-t border-[rgba(245,246,250,0.06)] pt-3 mt-1">
                  <span className="text-[10px] label-mono text-text-secondary">
                    ID: {review.id.slice(0, 8)}...
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(review)}
                      className="px-2.5 py-1.5 bg-[#2E8FE0]/15 hover:bg-[#2E8FE0]/30 text-[11px] font-semibold text-[#2E8FE0] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      aria-label={`Modifier l'avis de ${review.name}`}
                    >
                      <Pencil size={12} />
                      <span>Éditer</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleApprove(review.id, review.approved)}
                      className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                        review.approved
                          ? 'bg-[#1b223d] hover:bg-[#232c4f] text-purple-300'
                          : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold'
                      }`}
                      aria-label={review.approved ? "Masquer cet avis" : "Publier cet avis"}
                    >
                      {review.approved ? <EyeOff size={12} /> : <Eye size={12} />}
                      <span>{review.approved ? 'Masquer' : 'Mettre en ligne'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(review.id)}
                      className="px-2 py-1.5 bg-red-600/15 hover:bg-red-600/30 text-[11px] font-semibold text-red-400 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      aria-label={`Supprimer l'avis de ${review.name}`}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit / Create Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl bg-[#121729] border border-[rgba(245,246,250,0.1)] rounded-2xl shadow-2xl p-6 sm:p-8 relative my-8">
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Fermer le dialogue"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-text-primary mb-1">
              {editingReview ? "Modifier le témoignage" : "Ajouter un nouveau témoignage"}
            </h2>
            <p className="text-xs text-text-secondary mb-6">
              {editingReview ? "Éditez les informations de cet avis client." : "Remplissez les détails pour créer un avis directement."}
            </p>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-name" className="block text-[10px] label-mono text-purple-300 uppercase mb-1">
                    Nom & Prénom
                  </label>
                  <input
                    id="edit-name"
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Claire Dubosc"
                    className="w-full px-3 py-2 rounded-lg bg-[#070913]/80 border border-[rgba(245,246,250,0.1)] text-xs text-text-primary focus:outline-none focus:border-[#2E8FE0] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="edit-role" className="block text-[10px] label-mono text-purple-300 uppercase mb-1">
                    Fonction / Entreprise
                  </label>
                  <input
                    id="edit-role"
                    type="text"
                    required
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="Fondatrice, Studio Verrière"
                    className="w-full px-3 py-2 rounded-lg bg-[#070913]/80 border border-[rgba(245,246,250,0.1)] text-xs text-text-primary focus:outline-none focus:border-[#2E8FE0] transition-colors"
                  />
                </div>
              </div>

              {/* Rating selection */}
              <div>
                <label className="block text-[10px] label-mono text-purple-300 uppercase mb-1">Note attribuée</label>
                <div className="flex gap-2 items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormRating(i + 1)}
                      className="cursor-pointer transition-transform hover:scale-110"
                      aria-label={`Donner la note de ${i + 1} étoile${i > 0 ? 's' : ''}`}
                    >
                      <Star
                        size={22}
                        fill={i < formRating ? '#F5C451' : 'transparent'}
                        stroke={i < formRating ? '#F5C451' : 'rgba(245, 246, 250, 0.3)'}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-text-secondary ml-2 font-mono">({formRating}/5)</span>
                </div>
              </div>

              {/* Avatar management */}
              <div>
                <label className="block text-[10px] label-mono text-purple-300 uppercase mb-1">Photo de profil / Avatar</label>
                {!imageSrc ? (
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-[#070913]/60 border border-[rgba(245,246,250,0.08)]">
                    {formAvatar ? (
                      <div className="relative flex-shrink-0">
                        <img 
                          src={formAvatar}
                          alt="Avatar sélectionné"
                          className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400 shadow-md"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shadow">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[#1b223d] border border-dashed border-[rgba(245,246,250,0.2)] flex flex-col items-center justify-center text-text-secondary flex-shrink-0">
                        <Camera size={18} />
                      </div>
                    )}
                    
                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 bg-[#2E8FE0] hover:bg-[#2E8FE0]/80 text-xs font-bold text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                        >
                          <Camera size={13} />
                          <span>{formAvatar ? 'Changer de photo' : 'Importer une photo'}</span>
                        </button>
                        {formAvatar && (
                          <button
                            type="button"
                            onClick={() => setFormAvatar(null)}
                            className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          >
                            Supprimer la photo
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] label-mono text-text-secondary">
                        {formAvatar ? 'Photo configurée et prête à être enregistrée' : 'JPG, PNG ou WebP. La photo sera automatiquement recadrée et optimisée.'}
                      </p>
                    </div>
                    <input 
                      ref={fileInputRef} 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={onFileChange} 
                    />
                  </div>
                ) : (
                  <div className="space-y-3 p-3 rounded-xl bg-[#070913]/90 border border-[#2E8FE0]/40 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-purple-300">Ajustez et cadrez la photo :</span>
                      <span className="text-[10px] label-mono text-text-secondary">Le cadrage sera validé automatiquement</span>
                    </div>
                    <div className="relative w-full h-44 rounded-lg overflow-hidden bg-black/60 border border-[rgba(245,246,250,0.1)]">
                      <Suspense fallback={<div className="flex items-center justify-center h-full text-xs text-text-secondary">Chargement...</div>}>
                        <Cropper
                          image={imageSrc}
                          crop={crop}
                          zoom={zoom}
                          aspect={1}
                          cropShape="round"
                          showGrid={false}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                        />
                      </Suspense>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] label-mono text-text-secondary">Zoom:</span>
                      <input 
                        type="range" 
                        min={1} 
                        max={3} 
                        step={0.1} 
                        value={zoom} 
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full h-1 bg-[#070913] rounded-lg appearance-none cursor-pointer accent-[#2E8FE0]"
                        aria-label="Zoom photo"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setImageSrc(null)}
                        className="px-3 py-1.5 text-xs text-text-secondary hover:text-text-primary cursor-pointer"
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        onClick={applyCroppedImage}
                        className="px-3 py-1.5 bg-[#2E8FE0] hover:bg-[#2E8FE0]/80 text-xs font-bold text-white rounded-lg cursor-pointer flex items-center gap-1"
                      >
                        <Check size={13} />
                        <span>Valider le cadrage</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Quote text */}
              <div>
                <label htmlFor="edit-quote" className="block text-[10px] label-mono text-purple-300 uppercase mb-1">
                  Texte du Témoignage
                </label>
                <textarea
                  id="edit-quote"
                  required
                  rows={4}
                  value={formQuote}
                  onChange={(e) => setFormQuote(e.target.value)}
                  placeholder="Le résultat dépasse largement mes attentes..."
                  className="w-full px-3 py-2 rounded-lg bg-[#070913]/80 border border-[rgba(245,246,250,0.1)] text-xs text-text-primary focus:outline-none focus:border-[#2E8FE0] transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Publication Status Checkbox */}
              <div className="flex items-center gap-3 py-2.5 px-3 rounded-lg bg-[#070913]/60 border border-[rgba(245,246,250,0.08)]">
                <input
                  id="edit-approved"
                  type="checkbox"
                  checked={formApproved}
                  onChange={(e) => setFormApproved(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#070913] border border-[rgba(245,246,250,0.2)] text-[#2E8FE0] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="edit-approved" className="text-xs text-text-primary font-medium cursor-pointer select-none">
                  Publier cet avis immédiatement sur le site (Visible en ligne)
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-[rgba(245,246,250,0.06)]">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-xs font-bold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 text-xs font-bold text-white rounded-lg transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)' }}
                >
                  {isSaving ? 'Enregistrement...' : editingReview ? 'Enregistrer les modifications' : 'Créer le témoignage'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SectionReveal>
  );
}

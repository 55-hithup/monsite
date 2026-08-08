import { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { Star, PenSquare, X } from 'lucide-react';
import { db } from '../lib/firebase';
import SectionReveal from './SectionReveal';

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  rating: number;
  created_at?: any;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    quote: "« Le résultat dépasse largement mes attentes. Mon taux de conversion a doublé en deux mois et mes clients me complimentent sur le site à chaque échange. »",
    name: "Claire Dubosc",
    role: "Fondatrice, Studio Verrière",
    rating: 5,
  },
  {
    quote: "« Un vrai partenaire, pas juste un prestataire. Chaque détail a été pensé pour ma marque, du premier pixel jusqu'à la mise en ligne. »",
    name: "Karim Belaïd",
    role: "CEO, Neuron Labs",
    rating: 5,
  },
  {
    quote: "« Rapide, réactif et incroyablement précis. Le site est aujourd'hui mon meilleur commercial, disponible 24h/24. »",
    name: "Léa Fontaine",
    role: "Directrice, Maison Lucine",
    rating: 5,
  },
];

export default function Testimonials() {
  const [list, setList] = useState<TestimonialItem[]>(defaultTestimonials);
  const [current, setCurrent] = useState(0);
  
  // Form modal states
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Anti-bot security states
  const [honeypot, setHoneypot] = useState('');
  const [modalOpenTime, setModalOpenTime] = useState<number>(0);
  const [isHuman, setIsHuman] = useState(false);

  const lenis = useLenis();

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [showModal, lenis]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    async function loadTestimonials() {
      if (!db) {
        console.log("Firebase DB not initialized. Using static testimonials.");
        return;
      }
      try {
        const q = query(
          collection(db, 'testimonials'),
          where('approved', '==', true)
        );
        const snapshot = await getDocs(q);
        const dynamicList: TestimonialItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          dynamicList.push({
            quote: data.quote,
            name: data.name,
            role: data.role,
            rating: data.rating || 5,
            created_at: data.created_at || null,
          });
        });
        
        // Sort dynamic testimonials client-side by date descending
        dynamicList.sort((a, b) => {
          const timeA = a.created_at?.seconds || 0;
          const timeB = b.created_at?.seconds || 0;
          return timeB - timeA;
        });
        
        // Combine dynamic reviews from Firestore with our original static ones
        if (dynamicList.length > 0) {
          setList([...dynamicList, ...defaultTestimonials]);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      }
    }
    loadTestimonials();
  }, []);

  useEffect(() => {
    if (list.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % list.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [list.length]);

  const handleOpenModal = () => {
    setName('');
    setRole('');
    setQuote('');
    setRating(5);
    setHoneypot('');
    setIsHuman(false);
    setModalOpenTime(Date.now());
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot check (reject if hidden bot field is filled)
    if (honeypot.trim() !== '') {
      console.warn('Bot submission blocked via honeypot.');
      setSubmitted(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitted(false);
      }, 2000);
      return;
    }

    // 2. Time-lock check (reject if submission is too fast, < 2 seconds)
    const timeElapsed = Date.now() - modalOpenTime;
    if (timeElapsed < 2000) {
      console.warn('Bot submission blocked via time-lock.');
      setSubmitted(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitted(false);
      }, 2000);
      return;
    }

    // 3. User human certification check
    if (!isHuman) {
      alert("Veuillez cocher la case de certification humaine pour envoyer votre avis.");
      return;
    }

    if (!name || !role || !quote) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    if (!db) {
      alert("La base de données n'est pas initialisée pour le moment.");
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'testimonials'), {
        name,
        role,
        quote: `« ${quote.replace(/[«»]/g, '').trim()} »`,
        rating,
        approved: false,
        created_at: new Date(),
      });
      setSubmitted(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitted(false);
        setName('');
        setRole('');
        setQuote('');
        setRating(5);
      }, 2500);
    } catch (err) {
      console.error('Error adding testimonial:', err);
      alert("Une erreur est survenue lors de l'enregistrement de votre avis.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionReveal id="apropos" className="section-pad" style={{ position: 'relative' }}>
      <div className="wrap">
        <div className="text-center mb-[70px]">
          <div className="eyebrow reveal justify-center">Témoignages</div>
          <h2 className="section-title reveal">Ils m'ont fait confiance.</h2>
        </div>
        
        <div className="testi-wrap reveal">
          <div className="testi-track">
            <div
              className="testi-slides transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)`, display: 'flex' }}
            >
              {list.map((testi, idx) => (
                <div key={idx} className="testi-slide w-full flex-shrink-0">
                  <div className="testi-card">
                    {/* Stars rating indicator */}
                    <div className="flex gap-0.5 mb-3 justify-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          fill={i < testi.rating ? '#F5C451' : 'transparent'} 
                          stroke={i < testi.rating ? '#F5C451' : 'rgba(245,246,250,0.15)'} 
                        />
                      ))}
                    </div>
                    <p className="testi-quote">{testi.quote}</p>
                    <div className="testi-person">
                      <div className="testi-avatar"></div>
                      <div>
                        <div className="testi-name">{testi.name}</div>
                        <div className="testi-role">{testi.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="testi-dots">
            {list.map((_, idx) => (
              <button
                key={idx}
                className={`testi-dot ${current === idx ? 'active' : ''}`}
                onClick={() => setCurrent(idx)}
                aria-label={`Aller au témoignage ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Submit Review Button */}
        <div className="text-center mt-10 reveal">
          <button 
            onClick={handleOpenModal} 
            className="btn btn-ghost text-xs px-5 py-2.5 inline-flex items-center gap-2"
            style={{ border: '1px solid rgba(245,246,250,0.12)', cursor: 'pointer' }}
          >
            <PenSquare size={13} className="text-[#2E8FE0]" /> Laisser un avis
          </button>
        </div>
      </div>

      {/* Review Submission Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-[#121729]/95 border border-[rgba(245,246,250,0.08)] shadow-2xl p-6 sm:p-8 text-left relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-emerald-400 text-lg">✓</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Avis enregistré !</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Merci pour votre retour. Votre témoignage sera visible sur le site dès sa modération par Alexandre.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-text-primary">Partagez votre expérience</h3>
                  <p className="text-xs text-text-secondary mt-1">Votre avis sera relu et validé avant d'être publié.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] label-mono text-purple-300 uppercase mb-1">Votre Nom / Prénom</label>
                    <input
                      type="text"
                      required
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Claire Dubosc"
                      className="w-full px-3 py-2 rounded-lg bg-[#070913]/60 border border-[rgba(245,246,250,0.06)] text-xs text-text-primary focus:outline-none focus:border-[#2E8FE0] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] label-mono text-purple-300 uppercase mb-1">Rôle / Entreprise</label>
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Fondatrice, Studio Verrière"
                      className="w-full px-3 py-2 rounded-lg bg-[#070913]/60 border border-[rgba(245,246,250,0.06)] text-xs text-text-primary focus:outline-none focus:border-[#2E8FE0] transition-colors"
                    />
                  </div>
                </div>

                {/* Rating selection */}
                <div>
                  <label className="block text-[9px] label-mono text-purple-300 uppercase mb-1">Note globale</label>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        className="cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star
                          size={22}
                          fill={i < rating ? '#F5C451' : 'transparent'}
                          stroke={i < rating ? '#F5C451' : 'rgba(245, 246, 250, 0.3)'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] label-mono text-purple-300 uppercase mb-1">Votre Témoignage</label>
                  <textarea
                    required
                    rows={4}
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Le résultat dépasse largement mes attentes..."
                    className="w-full px-3 py-2 rounded-lg bg-[#070913]/60 border border-[rgba(245,246,250,0.06)] text-xs text-text-primary focus:outline-none focus:border-[#2E8FE0] transition-colors resize-none"
                  />
                </div>

                {/* Honeypot field (hidden from users) */}
                <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
                  <input
                    type="text"
                    name="user_website_verification"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Human verification checkbox */}
                <div className="flex items-center gap-3 py-2.5 px-3 rounded-lg bg-[#070913]/40 border border-[rgba(245,246,250,0.06)]">
                  <input
                    id="human-verify"
                    type="checkbox"
                    checked={isHuman}
                    onChange={(e) => setIsHuman(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#070913]/60 border border-[rgba(245,246,250,0.12)] text-[#2E8FE0] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="human-verify" className="text-[10px] label-mono text-text-secondary cursor-pointer select-none">
                    Je certifie que je suis un être humain
                  </label>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-[rgba(245,246,250,0.04)]">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-xs font-bold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 text-xs font-bold text-white rounded-lg transition-colors cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)' }}
                  >
                    {submitting ? 'Envoi...' : 'Envoyer mon avis'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </SectionReveal>
  );
}

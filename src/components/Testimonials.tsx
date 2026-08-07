import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import SectionReveal from './SectionReveal';

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  rating: number;
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

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const q = query(
          collection(db, 'testimonials'),
          where('approved', '==', true),
          orderBy('created_at', 'desc')
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
          });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !quote) {
      alert('Veuillez remplir tous les champs.');
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
                    <div className="flex gap-0.5 text-yellow-400 text-xs mb-3 justify-center">
                      {Array.from({ length: testi.rating || 5 }).map((_, i) => (
                        <span key={i}>★</span>
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
            onClick={() => setShowModal(true)} 
            className="btn btn-ghost text-xs px-5 py-2.5 inline-flex items-center gap-2"
            style={{ border: '1px solid rgba(245,246,250,0.12)', cursor: 'pointer' }}
          >
            ✍️ Laisser un avis
          </button>
        </div>
      </div>

      {/* Review Submission Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#121729]/95 border border-[rgba(245,246,250,0.08)] shadow-2xl p-6 sm:p-8 text-left relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary text-lg cursor-pointer"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-3xl mb-4">🎉</div>
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
                  <div className="flex gap-1.5 text-lg">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        className={`cursor-pointer transition-colors ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
                      >
                        ★
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

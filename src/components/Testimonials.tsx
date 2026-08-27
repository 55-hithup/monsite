import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { useLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, PenSquare, X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import type { Area, Point } from 'react-easy-crop';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

const Cropper = lazy(() => import('react-easy-crop'));

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  rating: number;
  avatar?: string;
  created_at?: any;
}

const defaultTestimonialsData = {
  fr: [
    {
      quote: "« Le résultat dépasse largement mes attentes. Les demandes de contact sont régulières et mes clients me complimentent sur le site à chaque échange. Un travail d'une qualité remarquable du premier pixel jusqu'à la mise en ligne. »",
      name: "Claire Dubosc",
      role: "Fondatrice, Studio Verrière",
      rating: 5,
    },
    {
      quote: "« Passer d'un ancien template WordPress lent à un site sur-mesure développé par Alexandre a tout changé. Mon planning de chantiers est complet plusieurs mois à l'avance grâce aux demandes de devis qualifiées qui arrivent régulièrement. Un investissement très vite rentabilisé. »",
      name: "Thomas Mercier",
      role: "Fondateur, Mercier Rénovation & Bois",
      rating: 5,
    },
    {
      quote: "« Alexandre a su concevoir un site à la fois épuré, rassurant et ultra-rapide pour nos patients. La navigation sur smartphone est parfaite, les informations sont claires et nous avons d'excellents retours au quotidien. Un professionnalisme rare et un suivi exemplaire. »",
      name: "Dr. Sophie Laurent",
      role: "Chirurgien-Dentiste, Cabinet Dentaire",
      rating: 5,
    },
    {
      quote: "« Nous avions besoin d'une interface sur-mesure performante et d'une vitrine moderne pour nos clients professionnels. Le site charge en un clin d'œil et nos équipes gagnent un temps précieux dans le suivi des demandes. Alexandre a parfaitement cerné nos enjeux. »",
      name: "Julien Caron",
      role: "Directeur Général, LogiMat Outils",
      rating: 5,
    },
    {
      quote: "« Un vrai partenaire, pas juste un prestataire. Chaque détail a été pensé pour ma marque, avec un sens de la performance et une réactivité exemplaires. Le site est un véritable levier de croissance. »",
      name: "Karim Belaïd",
      role: "CEO, Neuron Labs",
      rating: 5,
    },
    {
      quote: "« Rapide, réactif et incroyablement précis. Le site est aujourd'hui mon meilleur commercial, disponible 24h/24 avec des temps de chargement instantanés. Je recommande sans la moindre hésitation. »",
      name: "Léa Fontaine",
      role: "Directrice, Maison Lucine",
      rating: 5,
    },
  ],
  en: [
    {
      quote: "« The result exceeded my expectations by far. Customer inquiries arrive regularly and clients compliment our website constantly. Remarkable craftsmanship from the initial concept through to final launch. »",
      name: "Claire Dubosc",
      role: "Founder, Studio Verrière",
      rating: 5,
    },
    {
      quote: "« Transitioning from a slow WordPress template to a custom website engineered by Alexandre changed everything. Our project schedule is booked months in advance thanks to qualified quote requests coming in steadily. An investment that paid for itself very quickly. »",
      name: "Thomas Mercier",
      role: "Founder, Mercier Renovation & Wood",
      rating: 5,
    },
    {
      quote: "« Alexandre designed a clean, reassuring, and ultra-fast website for our patients. Mobile navigation is flawless, information is crystal clear, and patient feedback has been fantastic. Rare professionalism and exemplary support. »",
      name: "Dr. Sophie Laurent",
      role: "Dental Surgeon, Dental Clinic",
      rating: 5,
    },
    {
      quote: "« We needed a high-performance custom interface and a modern showcase for our corporate clients. The site loads in the blink of an eye and our team saves valuable time managing requests. Alexandre grasped our challenges perfectly. »",
      name: "Julien Caron",
      role: "Managing Director, LogiMat Tools",
      rating: 5,
    },
    {
      quote: "« A true partner, not just a contractor. Every detail was crafted for our brand, with outstanding performance standards and exceptional responsiveness. The website has become a key growth driver. »",
      name: "Karim Belaïd",
      role: "CEO, Neuron Labs",
      rating: 5,
    },
    {
      quote: "« Fast, responsive, and incredibly precise. Today our website acts as our best salesperson, working 24/7 with instant load times. I recommend DevSupAi without hesitation. »",
      name: "Léa Fontaine",
      role: "Director, Maison Lucine",
      rating: 5,
    },
  ],
};

// Helper functions for image cropping using canvas
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

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return '';
  }

  // Set crop target to 120x120 for optimal resolution and tiny file sizes in database
  canvas.width = 120;
  canvas.height = 120;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    120,
    120
  );

  return canvas.toDataURL('image/webp', 0.75);
}

// Individual Testimonial Card with 3-line clamp and "Lire la suite" toggle
function TestimonialCard({
  testi,
  isExpanded,
  onToggleExpand,
  readMoreText,
  showLessText,
}: {
  testi: TestimonialItem;
  isExpanded: boolean;
  onToggleExpand: () => void;
  readMoreText: string;
  showLessText: string;
}) {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [canExpand, setCanExpand] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (quoteRef.current) {
      const isOverflowing = quoteRef.current.scrollHeight > quoteRef.current.clientHeight + 1;
      setCanExpand(isOverflowing || testi.quote.length > 105);
    } else {
      setCanExpand(testi.quote.length > 105);
    }
  }, [testi.quote]);

  return (
    <div className="testi-card h-full flex flex-col justify-between text-left p-6 sm:p-7 rounded-2xl bg-[#121729]/70 backdrop-blur-sm border border-[rgba(245,246,250,0.08)] hover:border-[rgba(46,143,224,0.3)] transition-all duration-300 shadow-lg">
      <div>
        {/* Rating Stars */}
        <div className="flex gap-1 mb-3.5 items-center" role="img" aria-label={`Rating: ${testi.rating} / 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              fill={i < testi.rating ? '#F5C451' : 'transparent'}
              stroke={i < testi.rating ? '#F5C451' : 'rgba(245,246,250,0.15)'}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Quote text */}
        <p
          ref={quoteRef}
          className={`testi-quote text-text-primary text-sm sm:text-[14.5px] leading-relaxed tracking-normal font-normal ${
            isExpanded ? '' : 'line-clamp-3'
          }`}
          style={{
            display: isExpanded ? 'block' : '-webkit-box',
            WebkitLineClamp: isExpanded ? 'unset' : 3,
            WebkitBoxOrient: 'vertical',
            overflow: isExpanded ? 'visible' : 'hidden',
          }}
        >
          {testi.quote}
        </p>

        {/* Expand / Collapse Button */}
        {canExpand && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            className="mt-2.5 text-xs font-semibold text-[#2E8FE0] hover:text-[#52a5ec] inline-flex items-center gap-1 cursor-pointer transition-colors focus:outline-none focus:underline"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? showLessText : readMoreText}</span>
            {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        )}
      </div>

      {/* Author information */}
      <div className="testi-person flex items-center gap-3.5 mt-6 pt-4 border-t border-[rgba(245,246,250,0.06)]">
        {testi.avatar ? (
          <img
            src={testi.avatar}
            alt={testi.name}
            className="w-10 h-10 rounded-full flex-shrink-0 object-cover border border-[rgba(245,246,250,0.15)] bg-[#1b223d]"
          />
        ) : (
          <div className="w-10 h-10 rounded-full flex-shrink-0 bg-gradient-to-br from-[#2E8FE0]/40 to-[#6B4FE0]/40 border border-[rgba(245,246,250,0.12)] flex items-center justify-center text-xs font-bold text-text-primary">
            {testi.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="testi-name text-xs sm:text-sm font-bold text-text-primary truncate">
            {testi.name}
          </div>
          <div className="testi-role text-xs text-text-secondary truncate">
            {testi.role}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { language } = useLanguage();
  const t = translations[language].testimonials;
  const [list, setList] = useState<TestimonialItem[]>(defaultTestimonialsData[language] || defaultTestimonialsData.fr);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  
  // Form inline states
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Avatar cropping states
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  // Anti-bot security states
  const [honeypot, setHoneypot] = useState('');
  const [formOpenTime, setFormOpenTime] = useState<number>(0);
  const [isHuman, setIsHuman] = useState(false);

  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  // Update default reviews when language changes
  useEffect(() => {
    setList(defaultTestimonialsData[language] || defaultTestimonialsData.fr);
  }, [language]);

  // Responsive items count calculation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateVisible = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const handleCloseForm = () => {
    setShowForm(false);
    setSubmitted(false);
  };

  useEffect(() => {
    if (showForm && formRef.current) {
      setTimeout(() => {
        if (formRef.current) {
          if (lenis) {
            const element = formRef.current;
            const rect = element.getBoundingClientRect();
            const offset = -(window.innerHeight / 2) + (rect.height / 2);
            lenis.scrollTo(element, { offset, duration: 1.2 });
          } else {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 150);
    }
  }, [showForm, lenis]);

  // Load Firestore reviews ONLY when user approaches the testimonials section
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = sectionRef.current;
    if (!el) return;

    let hasFetched = false;

    const fetchReviews = async () => {
      if (hasFetched) return;
      hasFetched = true;
      try {
        const { getFirebaseDb } = await import('../lib/firebase');
        const db = await getFirebaseDb();
        if (!db) return;
        const { collection, query, where, getDocs } = await import('firebase/firestore');
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
            avatar: data.avatar || undefined,
            created_at: data.created_at || null,
          });
        });
        
        dynamicList.sort((a, b) => {
          const timeA = a.created_at?.seconds || 0;
          const timeB = b.created_at?.seconds || 0;
          return timeB - timeA;
        });
        
        if (dynamicList.length > 0) {
          setList(dynamicList);
        }
      } catch (err) {
        console.error('Error fetching testimonials from Firestore:', err);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          fetchReviews();
        }
      },
      { threshold: 0.05, rootMargin: '200px 0px 200px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const totalItems = list.length;
  const needsLoop = totalItems > visibleCount;

  // Extended list with duplicates at the end to create seamless continuous looping
  const displayList = needsLoop ? [...list, ...list.slice(0, visibleCount)] : list;

  const handleNext = useCallback(() => {
    if (!needsLoop) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [needsLoop]);

  const handlePrev = useCallback(() => {
    if (!needsLoop) return;
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalItems);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setCurrentIndex(totalItems - 1);
        });
      });
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex, needsLoop, totalItems]);

  const handleTransitionEnd = () => {
    if (needsLoop && currentIndex >= totalItems) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (!needsLoop || isPaused || expandedIndex !== null) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [needsLoop, isPaused, expandedIndex, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    }
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 40) {
      if (touchDeltaX.current < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const handleOpenForm = () => {
    setName('');
    setRole('');
    setQuote('');
    setRating(5);
    setHoneypot('');
    setIsHuman(false);
    setImageSrc(null);
    setCroppedImage(null);
    setFormOpenTime(Date.now());
    setShowForm(true);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result as string);
        setCroppedImage(null);
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      if (imageSrc && croppedAreaPixels) {
        const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
        setCroppedImage(cropped);
      }
    } catch (e) {
      console.error(e);
      alert(language === 'en' ? "An error occurred while cropping the image." : "Une erreur est survenue lors du recadrage de l'image.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot check
    if (honeypot.trim() !== '') {
      console.warn('Bot submission blocked via honeypot.');
      setSubmitted(true);
      setTimeout(() => {
        handleCloseForm();
      }, 2000);
      return;
    }

    // 2. Time-lock check
    const timeElapsed = Date.now() - formOpenTime;
    if (timeElapsed < 2000) {
      console.warn('Bot submission blocked via time-lock.');
      setSubmitted(true);
      setTimeout(() => {
        handleCloseForm();
      }, 2000);
      return;
    }

    // 3. User human certification check
    if (!isHuman) {
      alert(language === 'en' ? "Please check the human verification box to submit your review." : "Veuillez cocher la case de certification humaine pour envoyer votre avis.");
      return;
    }

    if (!name || !role || !quote) {
      alert(language === 'en' ? "Please fill in all required fields." : "Veuillez remplir tous les champs.");
      return;
    }

    setSubmitting(true);
    try {
      const { getFirebaseDb } = await import('../lib/firebase');
      const db = await getFirebaseDb();
      if (!db) {
        alert(language === 'en' ? "The database is not initialized at the moment." : "La base de données n'est pas initialisée pour le moment.");
        setSubmitting(false);
        return;
      }
      const { collection, addDoc } = await import('firebase/firestore');
      await addDoc(collection(db, 'testimonials'), {
        name,
        role,
        quote: `« ${quote.replace(/[«»]/g, '').trim()} »`,
        rating,
        avatar: croppedImage || null,
        approved: false,
        created_at: new Date(),
      });
      setSubmitted(true);
      setTimeout(() => {
        handleCloseForm();
        setName('');
        setRole('');
        setQuote('');
        setRating(5);
        setImageSrc(null);
        setCroppedImage(null);
      }, 2500);
    } catch (err) {
      console.error('Error submitting testimonial:', err);
      alert(language === 'en' ? "An error occurred while submitting your review." : "Une erreur est survenue lors de l'envoi de votre avis.");
    } finally {
      setSubmitting(false);
    }
  };

  const slideWidthPercent = 100 / visibleCount;

  return (
    <section ref={sectionRef} id="apropos" className="section-pad" style={{ position: 'relative' }}>
      <div className="wrap">
        <div className="text-center mb-[50px] sm:mb-[70px]">
          <div className="eyebrow reveal justify-center">{t.eyebrow}</div>
          <h2 className="section-title reveal">{t.title}</h2>
        </div>
        
        <div 
          className="testi-wrap reveal"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div 
            className="testi-track"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="testi-slides"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(-${currentIndex * slideWidthPercent}%)`,
                transition: isTransitioning ? 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                display: 'flex',
                alignItems: 'stretch',
              }}
            >
              {displayList.map((testi, idx) => (
                <div 
                  key={`${idx}-${testi.name}`} 
                  className="testi-slide flex-shrink-0 px-2 sm:px-3 box-border"
                  style={{ width: `${slideWidthPercent}%` }}
                >
                  <TestimonialCard
                    testi={testi}
                    isExpanded={expandedIndex === idx}
                    onToggleExpand={() => {
                      setExpandedIndex(expandedIndex === idx ? null : idx);
                    }}
                    readMoreText={t.readMore}
                    showLessText={t.showLess}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Controls */}
          {needsLoop && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={handlePrev}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#121729]/80 border border-[rgba(245,246,250,0.12)] text-text-secondary hover:text-text-primary hover:border-[#2E8FE0] transition-all cursor-pointer shadow-sm"
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="testi-dots flex items-center gap-3">
                {list.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`testi-dot ${currentIndex % totalItems === idx ? 'active' : ''}`}
                    onClick={() => {
                      setIsTransitioning(true);
                      setCurrentIndex(idx);
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#121729]/80 border border-[rgba(245,246,250,0.12)] text-text-secondary hover:text-text-primary hover:border-[#2E8FE0] transition-all cursor-pointer shadow-sm"
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Submit Review Button */}
        {!showForm && (
          <div className="text-center mt-10 reveal">
            <button 
              onClick={handleOpenForm} 
              className="btn btn-ghost text-xs px-5 py-2.5 inline-flex items-center gap-2"
              style={{ border: '1px solid rgba(245,246,250,0.12)', cursor: 'pointer' }}
            >
              <PenSquare size={13} className="text-[#2E8FE0]" /> {t.leaveReview}
            </button>
          </div>
        )}
      </div>

      {/* Review Submission Inline Card */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 40 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden w-full max-w-lg mx-auto"
          >
            <div className="w-full rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] shadow-2xl p-6 sm:p-8 text-left relative mb-12">
              <button 
                type="button"
                onClick={handleCloseForm}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6 text-emerald-400">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{t.form.successTitle}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {t.form.successText}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-text-primary">{t.form.title}</h3>
                    <p className="text-xs text-text-secondary mt-1">{t.form.subtitle}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="testi-author-name" className="block text-xs label-mono text-purple-300 uppercase mb-1">{t.form.nameLabel}</label>
                      <input
                        id="testi-author-name"
                        type="text"
                        required
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.form.namePlaceholder}
                        className="w-full px-3 py-2 rounded-lg bg-[#070913]/60 border border-[rgba(245,246,250,0.06)] text-xs text-text-primary focus:outline-none focus:border-[#2E8FE0] transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="testi-author-role" className="block text-xs label-mono text-purple-300 uppercase mb-1">{t.form.roleLabel}</label>
                      <input
                        id="testi-author-role"
                        type="text"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder={t.form.rolePlaceholder}
                        className="w-full px-3 py-2 rounded-lg bg-[#070913]/60 border border-[rgba(245,246,250,0.06)] text-xs text-text-primary focus:outline-none focus:border-[#2E8FE0] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Rating selection */}
                  <div>
                    <label className="block text-xs label-mono text-purple-300 uppercase mb-1">{t.form.ratingLabel}</label>
                    <div className="flex gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setRating(i + 1)}
                          className="cursor-pointer transition-transform hover:scale-110"
                          aria-label={`${i + 1} star`}
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

                  {/* Avatar Upload with Cropping */}
                  <div>
                    <label className="block text-xs label-mono text-purple-300 uppercase mb-1">{t.form.photoLabel}</label>
                    {!imageSrc ? (
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-[rgba(245,246,250,0.12)] rounded-lg cursor-pointer bg-[#070913]/30 hover:bg-[#070913]/50 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-6 h-6 mb-2 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            <p className="text-xs label-mono text-text-secondary">{t.form.addPhoto}</p>
                          </div>
                          <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                        </label>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {!croppedImage ? (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-black/50 border border-[rgba(245,246,250,0.08)]">
                            <Suspense fallback={<div className="flex items-center justify-center h-full text-xs text-text-secondary">Loading...</div>}>
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
                        ) : (
                          <div className="flex items-center gap-4 py-2 px-3 rounded-lg bg-[#070913]/40 border border-[rgba(245,246,250,0.06)]">
                            <div 
                              className="w-12 h-12 rounded-full border border-[rgba(245,246,250,0.15)] flex-shrink-0"
                              style={{ backgroundImage: `url(${croppedImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            />
                            <div className="flex-1">
                              <p className="text-xs label-mono text-emerald-400">{t.form.cropSuccess}</p>
                            </div>
                            <button 
                              type="button"
                              onClick={() => { setImageSrc(null); setCroppedImage(null); }}
                              className="text-xs label-mono text-red-400 hover:text-red-300 cursor-pointer"
                            >
                              {t.form.deletePhoto}
                            </button>
                          </div>
                        )}

                        {!croppedImage && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs label-mono text-text-secondary flex-shrink-0">{t.form.zoomLabel}</span>
                              <input 
                                type="range" 
                                min={1} 
                                max={3} 
                                step={0.1} 
                                value={zoom} 
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full h-1 bg-[#070913] rounded-lg appearance-none cursor-pointer accent-[#2E8FE0]"
                                aria-label="Zoom"
                              />
                            </div>
                            <div className="flex gap-2 justify-end">
                              <button
                                type="button"
                                onClick={() => { setImageSrc(null); setCroppedImage(null); }}
                                className="px-3 py-1.5 text-xs label-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                              >
                                {t.form.cancelBtn}
                              </button>
                              <button
                                type="button"
                                onClick={showCroppedImage}
                                className="px-3 py-1.5 text-xs label-mono text-white rounded-md transition-colors cursor-pointer"
                                style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)' }}
                              >
                                {t.form.cropBtn}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="testi-comment" className="block text-xs label-mono text-purple-300 uppercase mb-1">{t.form.quoteLabel}</label>
                    <textarea
                      id="testi-comment"
                      required
                      rows={4}
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder={t.form.quotePlaceholder}
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
                    <label htmlFor="human-verify" className="text-xs label-mono text-text-secondary cursor-pointer select-none">
                      {t.form.humanCheckbox}
                    </label>
                  </div>

                  <div className="flex gap-3 justify-end pt-4 border-t border-[rgba(245,246,250,0.04)]">
                    <button
                      type="button"
                      onClick={handleCloseForm}
                      className="px-4 py-2 text-xs font-bold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    >
                      {t.form.cancelBtn}
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-4 py-2 text-xs font-bold text-white rounded-lg transition-colors cursor-pointer"
                      style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)' }}
                    >
                      {submitting ? t.form.submitting : t.form.submitBtn}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

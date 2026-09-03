import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { useLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, PenSquare, X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  source?: 'google' | 'direct';
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
      quote: "« Passer d'un ancien template WordPress lent à un site sur-mesure développé par DevSupAi a tout changé. Mon planning de chantiers est complet plusieurs mois à l'avance grâce aux demandes de devis qualifiées qui arrivent régulièrement. Un investissement très vite rentabilisé. »",
      name: "Thomas Mercier",
      role: "Fondateur, Mercier Rénovation & Bois",
      rating: 5,
    },
    {
      quote: "« DevSupAi a su concevoir un site à la fois épuré, rassurant et ultra-rapide pour nos patients. La navigation sur smartphone est parfaite, les informations sont claires et nous avons d'excellents retours au quotidien. Un professionnalisme rare et un suivi exemplaire. »",
      name: "Dr. Sophie Laurent",
      role: "Chirurgien-Dentiste, Cabinet Dentaire",
      rating: 5,
    },
    {
      quote: "« Nous avions besoin d'une interface sur-mesure performante et d'une vitrine moderne pour nos clients professionnels. Le site charge en un clin d'œil et nos équipes gagnent un temps précieux dans le suivi des demandes. DevSupAi a parfaitement cerné nos enjeux. »",
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
      quote: "« Transitioning from a slow WordPress template to a custom website engineered by DevSupAi changed everything. Our project schedule is booked months in advance thanks to qualified quote requests coming in steadily. An investment that paid for itself very quickly. »",
      name: "Thomas Mercier",
      role: "Founder, Mercier Renovation & Wood",
      rating: 5,
    },
    {
      quote: "« DevSupAi designed a clean, reassuring, and ultra-fast website for our patients. Mobile navigation is flawless, information is crystal clear, and patient feedback has been fantastic. Rare professionalism and exemplary support. »",
      name: "Dr. Sophie Laurent",
      role: "Dental Surgeon, Dental Clinic",
      rating: 5,
    },
    {
      quote: "« We needed a high-performance custom interface and a modern showcase for our corporate clients. The site loads in the blink of an eye and our team saves valuable time managing requests. DevSupAi grasped our challenges perfectly. »",
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
  googleBadgeText,
  verifiedBadgeText,
}: {
  testi: TestimonialItem;
  isExpanded: boolean;
  onToggleExpand: () => void;
  readMoreText: string;
  showLessText: string;
  googleBadgeText: string;
  verifiedBadgeText: string;
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
    <div className="testi-card h-full flex flex-col justify-between text-left p-6 sm:p-7 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#0284C7] transition-all duration-300 shadow-sm hover:shadow-md">
      <div>
        {/* Rating Stars & Source Badge */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex gap-1 items-center" role="img" aria-label={`Rating: ${testi.rating} / 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < testi.rating ? '#F59E0B' : 'transparent'}
                stroke={i < testi.rating ? '#F59E0B' : '#CBD5E1'}
                aria-hidden="true"
              />
            ))}
          </div>

          {testi.source === 'direct' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-['Montserrat'] bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
              <CheckCircle2 size={12} className="text-emerald-600 flex-shrink-0" />
              <span>{verifiedBadgeText}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-['Montserrat'] bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0] shadow-2xs">
              <svg viewBox="0 0 24 24" width="12" height="12" className="flex-shrink-0" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>{googleBadgeText}</span>
            </span>
          )}
        </div>

        {/* Quote text */}
        <p
          ref={quoteRef}
          className={`testi-quote text-[#333333] font-['Playfair_Display'] italic text-sm sm:text-[15px] leading-relaxed tracking-normal ${
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
            className="mt-2.5 text-xs font-bold font-['Montserrat'] text-[#0284C7] hover:text-[#1A1A1A] inline-flex items-center gap-1 cursor-pointer transition-colors focus:outline-none focus:underline"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? showLessText : readMoreText}</span>
            {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        )}
      </div>

      {/* Author information */}
      <div className="testi-person flex items-center gap-3.5 mt-6 pt-4 border-t border-[#F1F5F9]">
        {testi.avatar ? (
          <img
            src={testi.avatar}
            alt={testi.name}
            className="w-10 h-10 rounded-full flex-shrink-0 object-cover border border-[#E5E5E5]"
          />
        ) : (
          <div className="w-10 h-10 rounded-full flex-shrink-0 bg-[#1A1A1A] text-white border border-[#1A1A1A] flex items-center justify-center text-xs font-black font-['Montserrat']">
            {testi.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="testi-name text-xs sm:text-sm font-bold font-['Montserrat'] text-[#1A1A1A] truncate">
            {testi.name}
          </div>
          <div className="testi-role text-xs text-[#777777] font-['Plus_Jakarta_Sans'] truncate">
            {testi.role}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { language, isEn } = useLanguage();
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
  const headerWrapRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  // Update default reviews when language changes
  useEffect(() => {
    setList(defaultTestimonialsData[language] || defaultTestimonialsData.fr);
  }, [language]);

  // Animation d'apparition par élément avec ScrollTrigger dédiés et replay au scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. ANIMATION DE L'EN-TÊTE
      if (headerWrapRef.current) {
        const headerChildren = Array.from(headerWrapRef.current.children) as HTMLElement[];
        if (headerChildren.length > 0) {
          gsap.fromTo(
            headerChildren,
            { opacity: 0, y: 35, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              stagger: 0.15,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: headerWrapRef.current,
                start: 'top 85%',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // 2. ANIMATION DES CARTES D'AVIS DU CARROUSEL
      const cards = sectionRef.current?.querySelectorAll('.testi-card');
      const testiWrap = sectionRef.current?.querySelector('.testi-wrap');
      if (cards && cards.length > 0 && testiWrap) {
        const visibleCards = Array.from(cards).slice(0, 3) as HTMLElement[];
        const isDesktop = window.innerWidth >= 1024;

        const cardsTl = gsap.timeline({
          scrollTrigger: {
            trigger: testiWrap,
            start: 'top 78%',
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          }
        });

        if (isDesktop && visibleCards.length >= 3) {
          // Carte 1 (Gauche) : arrivée de gauche avec légère impulsion
          cardsTl.fromTo(
            visibleCards[0],
            { x: -70, y: 35, opacity: 0, scale: 0.92 },
            { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out', clearProps: 'transform,opacity' },
            0
          );

          // Carte 2 (Centre) : élévation verticale
          cardsTl.fromTo(
            visibleCards[1],
            { y: 65, opacity: 0, scale: 0.90 },
            { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out', clearProps: 'transform,opacity' },
            0.12
          );

          // Carte 3 (Droite) : arrivée de droite en miroir
          cardsTl.fromTo(
            visibleCards[2],
            { x: 70, y: 35, opacity: 0, scale: 0.92 },
            { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out', clearProps: 'transform,opacity' },
            0.24
          );
        } else {
          // Mobile / Tablette : montée échelonnée
          cardsTl.fromTo(
            visibleCards,
            { y: 55, opacity: 0, scale: 0.94 },
            { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'power3.out', stagger: 0.15, clearProps: 'transform,opacity' }
          );
        }
      }

      // 3. ANIMATION DES CONTRÔLES & DU BOUTON "LAISSER UN AVIS"
      const dotsEl = sectionRef.current?.querySelector('.testi-dots')?.parentElement;
      const submitBtnEl = sectionRef.current?.querySelector('.btn-glacier-outline')?.parentElement;
      const bottomElements = [dotsEl, submitBtnEl].filter(Boolean) as HTMLElement[];

      if (bottomElements.length > 0) {
        gsap.fromTo(
          bottomElements,
          { y: 30, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: dotsEl || submitBtnEl,
              start: 'top 88%',
              end: 'bottom top',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // Recalibration
      ScrollTrigger.refresh();
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
            source: data.source || 'google',
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
        source: 'direct',
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
    <section ref={sectionRef} id="avis" className="py-20 md:py-28 bg-[#F8F8F8] border-t border-[#E5E5E5] text-left relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div ref={headerWrapRef} className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0284C7]/30 bg-[#0284C7]/10 text-xs font-bold font-['Montserrat'] text-[#0284C7] mb-4">
            <Star size={14} className="text-[#0284C7] fill-[#0284C7]" aria-hidden="true" />
            <span>{isEn ? "TRUST & REVIEWS" : "CONFIANCE & TÉMOIGNAGES"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-[#1A1A1A] mb-3 tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-['Plus_Jakarta_Sans']">
            {isEn
              ? "Verified feedback and experience from our clients across France and worldwide."
              : "Retours d'expérience et avis vérifiés de nos clients PME, artisans et professions libérales."}
          </p>
        </div>
        
        <div 
          className="testi-wrap"
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
                    googleBadgeText={t.badgeGoogle}
                    verifiedBadgeText={t.badgeVerified}
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
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#0284C7] hover:text-[#0284C7] transition-all cursor-pointer shadow-sm"
                aria-label={isEn ? "Previous review" : "Avis précédent"}
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
                    aria-label={isEn ? `Go to review ${idx + 1}` : `Aller au témoignage ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#0284C7] hover:text-[#0284C7] transition-all cursor-pointer shadow-sm"
                aria-label={isEn ? "Next review" : "Avis suivant"}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Submit Review Button */}
        {!showForm && (
          <div className="text-center mt-12">
            <button 
              onClick={handleOpenForm} 
              className="btn-glacier-outline inline-flex items-center gap-2 text-xs cursor-pointer"
            >
              <PenSquare size={14} className="text-[#0284C7]" /> {t.leaveReview}
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
            <div className="w-full rounded-2xl bg-white border border-[#E5E5E5] shadow-2xl p-6 sm:p-8 text-left relative mb-12">
              <button 
                type="button"
                onClick={handleCloseForm}
                className="absolute top-4 right-4 text-[#888888] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6 text-emerald-600">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold font-['Montserrat'] text-[#1A1A1A] mb-2">{t.form.successTitle}</h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {t.form.successText}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black font-['Montserrat'] text-[#1A1A1A]">{t.form.title}</h3>
                    <p className="text-xs text-[#666666] mt-1">{t.form.subtitle}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="testi-author-name" className="block text-xs font-bold font-['Montserrat'] text-[#1A1A1A] uppercase mb-1">{t.form.nameLabel}</label>
                      <input
                        id="testi-author-name"
                        type="text"
                        required
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.form.namePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#CCCCCC] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="testi-author-role" className="block text-xs font-bold font-['Montserrat'] text-[#1A1A1A] uppercase mb-1">{t.form.roleLabel}</label>
                      <input
                        id="testi-author-role"
                        type="text"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder={t.form.rolePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#CCCCCC] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Rating selection */}
                  <div>
                    <label className="block text-xs font-bold font-['Montserrat'] text-[#1A1A1A] uppercase mb-1">{t.form.ratingLabel}</label>
                    <div className="flex gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setRating(i + 1)}
                          className="cursor-pointer transition-transform hover:scale-110"
                          aria-label={`${i + 1} étoile`}
                        >
                          <Star
                            size={22}
                            fill={i < rating ? '#F59E0B' : 'transparent'}
                            stroke={i < rating ? '#F59E0B' : '#CBD5E1'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Avatar Upload with Cropping */}
                  <div>
                    <label className="block text-xs font-bold font-['Montserrat'] text-[#1A1A1A] uppercase mb-1">{t.form.photoLabel}</label>
                    {!imageSrc ? (
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-[#CCCCCC] rounded-lg cursor-pointer bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-6 h-6 mb-2 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            <p className="text-xs font-['Montserrat'] text-[#666666]">{t.form.addPhoto}</p>
                          </div>
                          <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                        </label>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {!croppedImage ? (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-black/50 border border-[#E5E5E5]">
                            <Suspense fallback={<div className="flex items-center justify-center h-full text-xs text-[#888888]">Chargement...</div>}>
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
                          <div className="flex items-center gap-4 py-2 px-3 rounded-lg bg-[#F8FAFC] border border-[#E5E5E5]">
                            <div 
                              className="w-12 h-12 rounded-full border border-[#E5E5E5] flex-shrink-0"
                              style={{ backgroundImage: `url(${croppedImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            />
                            <div className="flex-1">
                              <p className="text-xs font-bold text-emerald-600">{t.form.cropSuccess}</p>
                            </div>
                            <button 
                              type="button"
                              onClick={() => { setImageSrc(null); setCroppedImage(null); }}
                              className="text-xs font-bold text-red-600 hover:text-red-800 cursor-pointer"
                            >
                              {t.form.deletePhoto}
                            </button>
                          </div>
                        )}

                        {!croppedImage && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#666666] flex-shrink-0">{t.form.zoomLabel}</span>
                              <input 
                                type="range" 
                                min={1} 
                                max={3} 
                                step={0.1} 
                                value={zoom} 
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full h-1 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#0284C7]"
                                aria-label="Zoom"
                              />
                            </div>
                            <div className="flex gap-2 justify-end">
                              <button
                                type="button"
                                onClick={() => { setImageSrc(null); setCroppedImage(null); }}
                                className="px-3 py-1.5 text-xs font-bold text-[#666666] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                              >
                                {t.form.cancelBtn}
                              </button>
                              <button
                                type="button"
                                onClick={showCroppedImage}
                                className="btn-glacier-solid text-xs py-1.5 px-4 cursor-pointer"
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
                    <label htmlFor="testi-comment" className="block text-xs font-bold font-['Montserrat'] text-[#1A1A1A] uppercase mb-1">{t.form.quoteLabel}</label>
                    <textarea
                      id="testi-comment"
                      required
                      rows={4}
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder={t.form.quotePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#CCCCCC] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none"
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
                  <div className="flex items-center gap-3 py-2.5 px-3 rounded-lg bg-[#F8FAFC] border border-[#E5E5E5]">
                    <input
                      id="human-verify"
                      type="checkbox"
                      checked={isHuman}
                      onChange={(e) => setIsHuman(e.target.checked)}
                      className="w-4 h-4 rounded bg-white border border-[#CCCCCC] text-[#0284C7] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                    <label htmlFor="human-verify" className="text-xs text-[#555555] cursor-pointer select-none">
                      {t.form.humanCheckbox}
                    </label>
                  </div>

                  <div className="flex gap-3 justify-end pt-4 border-t border-[#E5E5E5]">
                    <button
                      type="button"
                      onClick={handleCloseForm}
                      className="px-4 py-2 text-xs font-bold text-[#666666] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                    >
                      {t.form.cancelBtn}
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-glacier-solid text-xs py-2 px-5 cursor-pointer"
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

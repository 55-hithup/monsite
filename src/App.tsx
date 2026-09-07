import { Component, type ReactNode, type ErrorInfo, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, useRouteError, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from './components/Layout';
import Home from './pages/Home';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { translations } from './i18n/translations';

const lazyPage = (importer: () => Promise<{ default: React.ComponentType<any> }>) => async () => {
  const mod = await importer();
  const PageComp = mod.default;
  return {
    Component: () => (
      <ErrorBoundary>
        <PageComp />
      </ErrorBoundary>
    ),
  };
};

const ServicesPage = lazyPage(() => import('./pages/Services'));
const AboutPage = lazyPage(() => import('./pages/About'));
const BlogPage = lazyPage(() => import('./pages/Blog'));
const ArticleTemplatesPage = lazyPage(() => import('./pages/blog/ArticleTemplates'));
const ArticlePerformancePage = lazyPage(() => import('./pages/blog/ArticlePerformance'));
const ArticleAssociationPmePage = lazyPage(() => import('./pages/blog/ArticleAssociationPme'));
const ArticleSiteVsGooglePage = lazyPage(() => import('./pages/blog/ArticleSiteVsGoogle'));
const ArticlePourquoiEviterWordpressPage = lazyPage(() => import('./pages/blog/ArticlePourquoiEviterWordpress'));
const ArticleArtisanConvertirDevisPage = lazyPage(() => import('./pages/blog/ArticleArtisanConvertirDevis'));
const ArticleBoutiqueSansCommissionPage = lazyPage(() => import('./pages/blog/ArticleBoutiqueSansCommission'));
const ArticleAccessibiliteRgaaPage = lazyPage(() => import('./pages/blog/ArticleAccessibiliteRgaa'));
const ArticleIaDeveloppementWebPage = lazyPage(() => import('./pages/blog/ArticleIaDeveloppementWeb'));
const TradeArtisanPage = lazyPage(() => import('./pages/trades/TradeArtisan'));
const TradeProfessionLiberalePage = lazyPage(() => import('./pages/trades/TradeProfessionLiberale'));
const TradeRestaurantPage = lazyPage(() => import('./pages/trades/TradeRestaurant'));
const TradeCommerceBoutiquePage = lazyPage(() => import('./pages/trades/TradeCommerceBoutique'));
const CaseAtelierGourmandPage = lazyPage(() => import('./pages/projects/CaseAtelierGourmand'));
const CaseLocaToolPage = lazyPage(() => import('./pages/projects/CaseLocaTool'));
const CaseAbogamePage = lazyPage(() => import('./pages/projects/CaseAbogame'));
const LegalNoticesPage = lazyPage(() => import('./pages/LegalNotices'));
const PrivacyPolicyPage = lazyPage(() => import('./pages/PrivacyPolicy'));
const TermsOfSalePage = lazyPage(() => import('./pages/TermsOfSale'));
const RegionalLorrainePage = lazyPage(() => import('./pages/RegionalLorraine'));

// Global Error Boundary to catch any rendering errors without crashing the entire app
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught component error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#070913] text-text-primary px-6 text-center">
          <h2 className="text-xl font-bold mb-4">Une erreur inattendue est survenue</h2>
          <p className="text-sm text-text-secondary max-w-md mb-6">
            La page a rencontré un problème d'affichage temporaire.
          </p>
          <a
            href="/"
            onClick={() => {
              this.setState({ hasError: false });
              if (typeof window !== 'undefined') window.location.href = '/';
            }}
            className="btn btn-primary px-6 py-2.5 rounded-full text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#fff' }}
          >
            Retourner à l'accueil
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

function RouteErrorFallback() {
  const error: any = useRouteError();
  console.warn('Route error detected:', error);
  const { language } = useLanguage();
  const t = translations[language]?.errors || translations.fr.errors;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-28">
      <h2 className="text-2xl font-bold text-text-primary mb-3">{t.notFoundTitle}</h2>
      <p className="text-sm text-text-secondary max-w-md mb-8">
        {t.notFoundText}
      </p>
      <Link
        to="/"
        className="btn btn-primary px-6 py-2.5 rounded-full text-xs font-bold"
        style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#fff' }}
      >
        {t.returnHome}
      </Link>
    </div>
  );
}

// Helper to auto-retry and refresh upon new Vercel deployments (stale chunks)
function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (error) {
      if (typeof window !== 'undefined') {
        const hasRefreshed = sessionStorage.getItem('chunk_reload');
        if (!hasRefreshed) {
          sessionStorage.setItem('chunk_reload', 'true');
          window.location.reload();
          return new Promise<{ default: T }>(() => {});
        }
        sessionStorage.removeItem('chunk_reload');
      }
      throw error;
    }
  });
}

// Lazy loaded admin routes with auto-reload protection for chunk management
const Login = lazyWithRetry(() => import('./pages/admin/Login'));
const Dashboard = lazyWithRetry(() => import('./pages/admin/Dashboard'));

gsap.registerPlugin(ScrollTrigger);

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#070913] text-text-secondary font-mono text-xs">
    Chargement...
  </div>
);

const renderLazy = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  </Suspense>
);


export const routes = [
  {
    path: '/',
    element: (
      <LanguageProvider>
        <ErrorBoundary>
          <Layout />
        </ErrorBoundary>
      </LanguageProvider>
    ),
    errorElement: (
      <LanguageProvider>
        <ErrorBoundary>
          <Layout>
            <RouteErrorFallback />
          </Layout>
        </ErrorBoundary>
      </LanguageProvider>
    ),
    hydrateFallbackElement: <></>,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>
        ),
      },
      {
        path: 'nos-services',
        lazy: ServicesPage,
      },
      {
        path: 'a-propos',
        lazy: AboutPage,
      },
      {
        path: 'blog',
        lazy: BlogPage,
      },
      {
        path: 'blog/pourquoi-eviter-les-templates',
        lazy: ArticleTemplatesPage,
      },
      {
        path: 'blog/performance-web-sur-mesure',
        lazy: ArticlePerformancePage,
      },
      {
        path: 'blog/site-web-pme-association',
        lazy: ArticleAssociationPmePage,
      },
      {
        path: 'blog/site-internet-vs-google-business',
        lazy: ArticleSiteVsGooglePage,
      },
      {
        path: 'blog/pourquoi-eviter-wordpress-petit-budget',
        lazy: ArticlePourquoiEviterWordpressPage,
      },
      {
        path: 'blog/artisan-convertir-plus-de-devis',
        lazy: ArticleArtisanConvertirDevisPage,
      },
      {
        path: 'blog/boutique-en-ligne-sans-commission',
        lazy: ArticleBoutiqueSansCommissionPage,
      },
      {
        path: 'blog/accessibilite-web-rgaa-pme',
        lazy: ArticleAccessibiliteRgaaPage,
      },
      {
        path: 'blog/ia-et-developpement-web-ce-qui-change',
        lazy: ArticleIaDeveloppementWebPage,
      },
      {
        path: 'sites-internet/artisan-renovation',
        lazy: TradeArtisanPage,
      },
      {
        path: 'sites-internet/profession-liberale',
        lazy: TradeProfessionLiberalePage,
      },
      {
        path: 'sites-internet/restaurant',
        lazy: TradeRestaurantPage,
      },
      {
        path: 'sites-internet/commerce-boutique',
        lazy: TradeCommerceBoutiquePage,
      },
      {
        path: 'projets/atelier-gourmand',
        lazy: CaseAtelierGourmandPage,
      },
      {
        path: 'projets/locatool',
        lazy: CaseLocaToolPage,
      },
      {
        path: 'projets/abogame',
        lazy: CaseAbogamePage,
      },
      {
        path: 'mentions-legales',
        lazy: LegalNoticesPage,
      },
      {
        path: 'politique-de-confidentialite',
        lazy: PrivacyPolicyPage,
      },
      {
        path: 'cgv',
        lazy: TermsOfSalePage,
      },
      {
        path: 'developpeur-web-lorraine',
        lazy: RegionalLorrainePage,
      },
      {
        path: 'admin/login',
        element: renderLazy(Login),
      },
      {
        path: 'admin/avis',
        element: renderLazy(Dashboard),
      },
      {
        path: '*',
        element: (
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>
        ),
      },
    ],
  },
];

export default function App() {
  const router = createBrowserRouter(routes);
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

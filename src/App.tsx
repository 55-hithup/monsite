import { Component, type ReactNode, type ErrorInfo, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, useRouteError, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from './components/Layout';
import Home from './pages/Home';

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

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-28">
      <h2 className="text-2xl font-bold text-text-primary mb-3">Page non trouvée</h2>
      <p className="text-sm text-text-secondary max-w-md mb-8">
        La page demandée n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="btn btn-primary px-6 py-2.5 rounded-full text-xs font-bold"
        style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#fff' }}
      >
        Retour à l'accueil
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

// Eagerly loaded for instant LCP on homepage
// Lazy loaded routes with auto-reload protection for optimal bundle splitting
const Services = lazyWithRetry(() => import('./pages/Services'));
const About = lazyWithRetry(() => import('./pages/About'));
const Blog = lazyWithRetry(() => import('./pages/Blog'));
const ArticleTemplates = lazyWithRetry(() => import('./pages/blog/ArticleTemplates'));
const ArticlePerformance = lazyWithRetry(() => import('./pages/blog/ArticlePerformance'));
const ArticleAssociationPme = lazyWithRetry(() => import('./pages/blog/ArticleAssociationPme'));
const LegalNotices = lazyWithRetry(() => import('./pages/LegalNotices'));
const PrivacyPolicy = lazyWithRetry(() => import('./pages/PrivacyPolicy'));
const CaseLesJumeaux = lazyWithRetry(() => import('./pages/projects/CaseLesJumeaux'));
const CaseLocaTool = lazyWithRetry(() => import('./pages/projects/CaseLocaTool'));
const CaseAbogame = lazyWithRetry(() => import('./pages/projects/CaseAbogame'));
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
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    errorElement: (
      <ErrorBoundary>
        <Layout>
          <RouteErrorFallback />
        </Layout>
      </ErrorBoundary>
    ),
    hydrateFallbackElement: <></>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'nos-services',
        element: renderLazy(Services),
      },
      {
        path: 'a-propos',
        element: renderLazy(About),
      },
      {
        path: 'blog',
        element: renderLazy(Blog),
      },
      {
        path: 'blog/pourquoi-eviter-les-templates',
        element: renderLazy(ArticleTemplates),
      },
      {
        path: 'blog/performance-web-sur-mesure',
        element: renderLazy(ArticlePerformance),
      },
      {
        path: 'blog/site-web-pme-association',
        element: renderLazy(ArticleAssociationPme),
      },
      {
        path: 'projets/les-jumeaux',
        element: renderLazy(CaseLesJumeaux),
      },
      {
        path: 'projets/locatool',
        element: renderLazy(CaseLocaTool),
      },
      {
        path: 'projets/abogame',
        element: renderLazy(CaseAbogame),
      },
      {
        path: 'mentions-legales',
        element: renderLazy(LegalNotices),
      },
      {
        path: 'politique-de-confidentialite',
        element: renderLazy(PrivacyPolicy),
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
        element: <Home />,
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

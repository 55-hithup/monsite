import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from './components/Layout';
import Home from './pages/Home';

// Eagerly loaded for instant LCP on homepage
// Lazy loaded routes for optimal bundle splitting
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const ArticleTemplates = lazy(() => import('./pages/blog/ArticleTemplates'));
const ArticlePerformance = lazy(() => import('./pages/blog/ArticlePerformance'));
const ArticleAssociationPme = lazy(() => import('./pages/blog/ArticleAssociationPme'));
const LegalNotices = lazy(() => import('./pages/LegalNotices'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const CaseLesJumeaux = lazy(() => import('./pages/projects/CaseLesJumeaux'));
const CaseLocaTool = lazy(() => import('./pages/projects/CaseLocaTool'));
const CaseAbogame = lazy(() => import('./pages/projects/CaseAbogame'));
const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));

gsap.registerPlugin(ScrollTrigger);

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#070913] text-text-secondary font-mono text-xs">
    Chargement...
  </div>
);

const renderLazy = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const routes = [
  {
    path: '/',
    element: <Layout />,
    hydrateFallbackElement: <></>,
    children: [
      {
        path: '',
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
    ],
  },
];

export default function App() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

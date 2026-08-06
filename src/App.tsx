import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import ArticleTemplates from './pages/blog/ArticleTemplates';
import ArticlePerformance from './pages/blog/ArticlePerformance';
import LegalNotices from './pages/LegalNotices';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CaseLesJumeaux from './pages/projects/CaseLesJumeaux';
import CaseLocaTool from './pages/projects/CaseLocaTool';

gsap.registerPlugin(ScrollTrigger);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'a-propos',
        element: <About />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'blog/pourquoi-eviter-les-templates',
        element: <ArticleTemplates />,
      },
      {
        path: 'blog/performance-web-sur-mesure',
        element: <ArticlePerformance />,
      },
      {
        path: 'projets/les-jumeaux',
        element: <CaseLesJumeaux />,
      },
      {
        path: 'projets/locatool',
        element: <CaseLocaTool />,
      },
      {
        path: 'mentions-legales',
        element: <LegalNotices />,
      },
      {
        path: 'politique-de-confidentialite',
        element: <PrivacyPolicy />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

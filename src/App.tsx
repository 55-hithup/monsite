import { useEffect } from 'react';
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
  useEffect(() => {
    // Register scroll reveal for elements with .reveal class
    // Run this logic on initial page render. Router child pages use their own triggers.
    const reveals = document.querySelectorAll('.reveal');
    const ctx = gsap.context(() => {
      reveals.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'
import organizationData from './src/data/organization.json' with { type: 'json' }

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://www.devsupai.fr',
      readable: true,
      dynamicRoutes: [
        '/nos-services',
        '/a-propos',
        '/blog',
        '/blog/site-web-pme-association',
        '/blog/pourquoi-eviter-les-templates',
        '/blog/performance-web-sur-mesure',
        '/projets/les-jumeaux',
        '/projets/locatool',
        '/projets/abogame',
        '/mentions-legales',
        '/politique-de-confidentialite',
      ],
    }),
  ],
  resolve: {
    alias: {
      'react-router-dom/server.js': 'react-router-dom/server',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) return 'vendor-lucide';
            if (id.includes('firebase')) return 'vendor-firebase';
            if (id.includes('three') || id.includes('@react-three') || id.includes('ogl')) return 'vendor-3d';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('gsap') || id.includes('lenis')) return 'vendor-animation';
          }
        },
      },
    },
  },
  ssgOptions: {
    script: 'defer',
    formatting: 'minify',
    onPageRendered(route: string, html: string) {
      if (route === '/' || route === '') {
        const scriptTag = `<script type="application/ld+json" id="structured-data-org-ssg">${JSON.stringify(organizationData)}</script>`;
        let cleanHtml = html.replace('</head>', `${scriptTag}</head>`);
        // Hoist correct title and social titles for homepage SEO signal
        cleanHtml = cleanHtml.replace(/<title>.*?<\/title>/, '<title>DevSupAi | Développeur Web Freelance en Meuse (55)</title>');
        cleanHtml = cleanHtml.replace(/<meta property="og:title" content=".*?"/, '<meta property="og:title" content="DevSupAi | Développeur Web Freelance en Meuse (55)"');
        cleanHtml = cleanHtml.replace(/<meta (property|name)="twitter:title" content=".*?"/, '<meta property="twitter:title" content="DevSupAi | Développeur Web Freelance en Meuse (55)"');
        return cleanHtml;
      }
      return html;
    },
  },
} as any)

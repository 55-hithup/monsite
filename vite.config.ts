import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'

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
        const scriptRegex = /<script type="application\/ld\+json" id="structured-data-org-ssg">.*?<\/script>/s;
        const match = html.match(scriptRegex);
        if (match) {
          const scriptTag = match[0];
          let cleanHtml = html.replace(scriptRegex, '');
          cleanHtml = cleanHtml.replace('</head>', `${scriptTag}</head>`);
          return cleanHtml;
        }
      }
      return html;
    },
  },
} as any)

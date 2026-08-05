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
      hostname: 'https://devsupai.fr',
      readable: true,
      dynamicRoutes: [
        '/a-propos',
        '/blog',
        '/blog/pourquoi-eviter-les-templates',
        '/blog/performance-web-sur-mesure',
        '/projets/les-jumeaux',
        '/projets/locatool',
        '/mentions-legales',
        '/politique-de-confidentialite',
      ],
    }),
  ],
})

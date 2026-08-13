import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App.tsx'
import './index.css'

if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', () => {
    window.location.reload();
  });
}

export const createRoot = ViteReactSSG({
  routes,
})

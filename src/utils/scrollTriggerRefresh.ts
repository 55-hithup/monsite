import { ScrollTrigger } from 'gsap/ScrollTrigger';

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Debounced ScrollTrigger refresh to prevent layout thrashing and forced reflows.
 * On mobile devices (<= 768px), skips manual refresh calls as ScrollTrigger's
 * automatic observer and event hooks already handle layout geometry without freezing the main thread.
 */
export function debouncedScrollTriggerRefresh(delay = 200) {
  if (typeof window === 'undefined') return;
  if (window.innerWidth <= 768) return;

  if (refreshTimer) {
    clearTimeout(refreshTimer);
  }
  refreshTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, delay);
}

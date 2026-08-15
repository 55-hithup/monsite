/**
 * Lazy Firebase / Firestore Loader for DevSupAi
 * 
 * Guarantees zero Firebase SDK code and zero IndexedDB overhead on static pages
 * (like case studies, blog articles, etc.). Firebase SDK modules (app, auth, firestore)
 * are only imported dynamically when an explicit action (e.g. submitting a review,
 * logging in, or opening the admin dashboard) actually requests them.
 */

let appInstance: any = null;
let authInstance: any = null;
let dbInstance: any = null;

export const getFirebaseConfig = () => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem('devsupai_firebase_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.apiKey) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading Firebase config from localStorage:', e);
  }
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAiuLFD7qoQIP7V2Dd5bqIPv49fcmZ48O4',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'site-devsupai.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'site-devsupai',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'site-devsupai.firebasestorage.app',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '201980154348',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:201980154348:web:417b16adb5ae1885efb0c9',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-DDENM5JMMN',
  };
};

export async function getFirebaseApp() {
  if (typeof window === 'undefined') return null;
  if (!appInstance) {
    const config = getFirebaseConfig();
    if (!config || !config.apiKey) return null;
    try {
      const { initializeApp, getApps, getApp } = await import('firebase/app');
      appInstance = getApps().length === 0 ? initializeApp(config) : getApp();
    } catch (err) {
      console.error('Failed to initialize Firebase App dynamically:', err);
      return null;
    }
  }
  return appInstance;
}

export async function getFirebaseAuth() {
  if (typeof window === 'undefined') return null;
  if (!authInstance) {
    const app = await getFirebaseApp();
    if (!app) return null;
    try {
      const { getAuth } = await import('firebase/auth');
      authInstance = getAuth(app);
    } catch (err) {
      console.error('Failed to get Firebase Auth dynamically:', err);
      return null;
    }
  }
  return authInstance;
}

export async function getFirebaseDb() {
  if (typeof window === 'undefined') return null;
  if (!dbInstance) {
    const app = await getFirebaseApp();
    if (!app) return null;
    try {
      const { initializeFirestore, memoryLocalCache, getFirestore } = await import('firebase/firestore');
      try {
        dbInstance = initializeFirestore(app, { localCache: memoryLocalCache() });
      } catch (initErr) {
        // Fallback in case initializeFirestore was already called on this app instance
        console.warn('initializeFirestore fallback to getFirestore:', initErr);
        dbInstance = getFirestore(app);
      }
    } catch (err) {
      console.error('Failed to initialize Firestore with memory cache dynamically:', err);
      return null;
    }
  }
  return dbInstance;
}

// Fallback getters for backward compatibility
export const auth = null;
export const db = null;
export default null;

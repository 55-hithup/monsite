import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const getSavedConfig = () => {
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
  return null;
};

const savedConfig = getSavedConfig();

const firebaseConfig = savedConfig || {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAiuLFD7qoQIP7V2Dd5bqIPv49fcmZ48O4',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'site-devsupai.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'site-devsupai',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'site-devsupai.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '201980154348',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:201980154348:web:417b16adb5ae1885efb0c9',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-DDENM5JMMN',
};

let app: any = null;
let auth: any = null;
let db: any = null;

if (firebaseConfig.apiKey) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
  }
} else {
  console.warn('Firebase environment variables are missing. Testimonial DB features will be disabled.');
}

export { auth, db };
export default app;

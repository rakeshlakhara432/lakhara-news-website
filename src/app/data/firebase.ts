// Digital News Website - Firebase Integration
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

/**
 * IMPORTANT: Firebase Auth Error (auth/configuration-not-found) Fix:
 * 
 * Agar login/registration mein yeh error aa raha hai, toh aapko Firebase Console mein jaake
 * Email/Password sign-in enable karna hoga:
 * 
 * Steps:
 * 1. Firebase Console kholein: https://console.firebase.google.com
 * 2. Project select karein: lakhara-news-website
 * 3. Left sidebar mein "Authentication" click karein
 * 4. "Get Started" ya "Sign-in method" tab click karein
 * 5. "Email/Password" click karein
 * 6. Toggle ON karein aur Save karein
 * 
 * Bina iske login/registration kaam nahi karega.
 */
const firebaseConfig = {
  apiKey: "AIzaSyDavZkLSFhkqj8VV_KCzaGrnyDRgNoEJZ4",
  authDomain: "lakhara-news-website.firebaseapp.com",
  projectId: "lakhara-news-website",
  storageBucket: "lakhara-news-website.appspot.com",
  messagingSenderId: "400554051368",
  appId: "1:400554051368:web:bc48d1826cc00a3c3e721d",
  measurementId: "G-G69KT7GV2W"
};

// Initialize Firebase (avoid duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Analytics only in browser
export const analytics = typeof window !== 'undefined'
  ? import("firebase/analytics").then(m => m.getAnalytics(app)).catch(() => null)
  : null;

export default app;

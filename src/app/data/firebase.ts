// Digital News Website - Firebase Integration
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

/**
 * [USER CONFIGURATION]
 * This config connects the website to your live Firebase project.
 */
const firebaseConfig = {
  apiKey: "AIzaSyDavZkLSFhkqj8VV_KCzaGrnyDRgNoEJZ4",
  authDomain: "lakhara-news-website.firebaseapp.com",
  projectId: "lakhara-news-website",
  storageBucket: "lakhara-news-website.firebasestorage.app",
  messagingSenderId: "400554051368",
  appId: "1:400554051368:web:bc48d1826cc00a3c3e721d",
  measurementId: "G-G69KT7GV2W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;

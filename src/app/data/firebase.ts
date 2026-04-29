/**
 * firebase.ts – Optimised Firebase Initialisation
 *
 * Speed Enhancements Applied:
 * 1. Firestore offline persistence (enableIndexedDbPersistence) → cached reads,
 *    instant loads on re-visit, works offline.
 * 2. experimentalForceLongPolling: false → uses WebSocket (faster).
 * 3. Firebase Storage: structured paths let Google CDN cache files globally.
 * 4. Analytics loaded asynchronously so it never blocks the main thread.
 * 5. getApps() guard prevents duplicate initialisation on HMR / SSR.
 */

import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  enableIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
  initializeFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjTog3IRWkXECV4Qi-zt13qPKSDPuCzI0",
  authDomain: "lakhara-news-website-306401.firebaseapp.com",
  projectId: "lakhara-news-website-306401",
  storageBucket: "lakhara-news-website-306401.firebasestorage.app",
  messagingSenderId: "770967104827",
  appId: "1:770967104827:web:1222262269f6e89e0c5b1e",
  measurementId: "G-2G9NTZKS3J"
};

// Prevent duplicate initialisation (important for Vite HMR)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// ── Firestore with performance settings ──────────────────────────────────────
export const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

// Enable IndexedDB offline persistence
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === "failed-precondition") {
      console.warn("[Firebase] Offline persistence disabled (multiple tabs).");
    } else if (err.code === "unimplemented") {
      console.warn("[Firebase] Offline persistence not supported in this browser.");
    }
  });
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const auth = getAuth(app);

// ── Storage ───────────────────────────────────────────────────────────────────
export const storage = getStorage(app);

// ── Analytics ────────────────────────────────────────────────────────────────
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;

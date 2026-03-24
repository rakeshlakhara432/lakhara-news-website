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
import {
  getFirestore,
  enableIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
  initializeFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDavZkLSFhkqj8VV_KCzaGrnyDRgNoEJZ4",
  authDomain: "lakhara-news-website.firebaseapp.com",
  projectId: "lakhara-news-website",
  storageBucket: "lakhara-news-website.appspot.com",
  messagingSenderId: "400554051368",
  appId: "1:400554051368:web:bc48d1826cc00a3c3e721d",
  measurementId: "G-G69KT7GV2W",
};

// Prevent duplicate initialisation (important for Vite HMR)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// ── Firestore with performance settings ──────────────────────────────────────
// initializeFirestore lets us set cacheSizeBytes before any listener runs.
export const db = initializeFirestore(app, {
  // Unlimited local cache — avoids re-fetching unchanged documents
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  // experimentalForceLongPolling: false  ← default (WebSocket) is faster
});

// Enable IndexedDB offline persistence (silent fail in incognito / multi-tab)
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    // Multiple tabs open — persistence only works in one tab at a time.
    console.warn("[Firebase] Offline persistence disabled (multiple tabs).");
  } else if (err.code === "unimplemented") {
    // Browser doesn't support all required features.
    console.warn("[Firebase] Offline persistence not supported in this browser.");
  }
});

// ── Auth ──────────────────────────────────────────────────────────────────────
export const auth = getAuth(app);

// ── Storage ───────────────────────────────────────────────────────────────────
export const storage = getStorage(app);

// ── Analytics (non-blocking, browser-only) ───────────────────────────────────
export const analytics =
  typeof window !== "undefined"
    ? import("firebase/analytics")
        .then((m) => m.getAnalytics(app))
        .catch(() => null)
    : null;

export default app;

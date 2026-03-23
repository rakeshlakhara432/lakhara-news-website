import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// [INSTRUCTION] 
// 1. Visit console.firebase.google.com
// 2. Create a new project called "Lakhara News"
// 3. Add a "Web App" to get your config
// 4. Paste those values below

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Check if Config is default or provided
const isConfigSet = firebaseConfig.apiKey !== "YOUR_API_KEY";

const app = isConfigSet ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;
export const storage = app ? getStorage(app) : null;

export default app;

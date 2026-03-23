/**
 * Digital News Website - Unified Database System
 * 
 * Features:
 * 1. Persistent storage using localStorage (with future proofing for Cloud/SQL sync).
 * 2. Automatic Schema Migration (AI Automation): Automatically updates the database 
 *    structure when new code features or fields are added.
 * 3. Complete news ecosystem tables.
 */

export interface DB_Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  isBreaking: boolean;
  isTrending: boolean;
  views: number;
  tags: string[];
  likes?: number;
  commentsCount?: number;
}

export interface DB_Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface DB_Short {
  id: string;
  videoUrl: string;
  title: string;
  author: string;
  likes: number;
  views: number;
}

export interface DB_User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'user';
  joinedAt: string;
}

export interface DB_Settings {
  siteName: string;
  siteLogo: string;
  youtubeLiveId: string;
  isLive: boolean;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
  };
  contactEmail: string;
  theme: 'dark' | 'light' | 'auto';
  autoUpdateDB: boolean; // Feature: AI Automation Toggle
}

export interface DatabaseSchema {
  version: number;
  articles: DB_Article[];
  categories: DB_Category[];
  shorts: DB_Short[];
  users: DB_User[];
  settings: DB_Settings;
  analytics: {
    totalViews: number;
    dailyStats: Record<string, number>;
  };
}

// Initial Data for the first-time setup
const initialDatabase: DatabaseSchema = {
  version: 1.2,
  articles: [],
  categories: [
    { id: '1', name: 'ब्रेकिंग न्यूज़', slug: 'breaking', color: '#ef4444' },
    { id: '2', name: 'राजनीti', slug: 'politics', color: '#3b82f6' },
    { id: '3', name: 'खेल', slug: 'sports', color: '#10b981' },
    { id: '4', name: 'मनोरंजन', slug: 'entertainment', color: '#f59e0b' },
    { id: '5', name: 'बिज़नेस', slug: 'business', color: '#6366f1' },
    { id: '6', name: 'टेक्नोलॉजी', slug: 'technology', color: '#8b5cf6' },
    { id: '7', name: 'स्वास्थ्य', slug: 'health', color: '#ec4899' },
    { id: '8', name: 'दुनिया', slug: 'world', color: '#14b8a6' },
  ],
  shorts: [],
  users: [
    { id: 'admin-1', name: 'Admin User', email: 'admin@lakhara.com', role: 'admin', joinedAt: new Date().toISOString() }
  ],
  settings: {
    siteName: 'Lakhara Digital News',
    siteLogo: '',
    youtubeLiveId: 'NqM0UUX-92c',
    isLive: true,
    socialLinks: {},
    contactEmail: 'contact@lakhara.com',
    theme: 'light',
    autoUpdateDB: true,
  },
  analytics: {
    totalViews: 0,
    dailyStats: {},
  }
};

import { db as firebaseDb } from './firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";

// Local Storage Key
const STORAGE_KEY = 'lakhara_news_db_v3';

class NewsDatabase {
  constructor() {
    this.init();
  }

  // --- Persistence & Sync ---

  private init() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      this.save(initialDatabase);
      return;
    }

    try {
      const currentDB = JSON.parse(stored);
      if (currentDB.version < initialDatabase.version) {
        this.save(this.migrate(currentDB, initialDatabase));
      }
    } catch (e) {
      this.save(initialDatabase);
    }
    
    // Attempt Cloud Sync
    this.syncWithCloud();
  }

  private async syncWithCloud() {
    if (!firebaseDb) return;
    console.log('CLOUDSYNC: Syncing with Firebase...');
    
    try {
      const docRef = doc(firebaseDb, "config", "main");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const cloudData = docSnap.data();
        if (cloudData.version > this.get().version) {
          console.log('CLOUDSYNC: Downloaded newer database from Cloud');
          this.save(cloudData as DatabaseSchema);
        }
      }
    } catch (e) {
      console.warn('CLOUDSYNC: Remote database unavailable (Offline or No Config)');
    }
  }

  private async uploadToCloud(data: DatabaseSchema) {
    if (!firebaseDb) return;
    try {
      const docRef = doc(firebaseDb, "config", "main");
      await setDoc(docRef, data);
      console.log('CLOUDSYNC: Successfully pushed to Firebase');
    } catch (e) {
      console.error('CLOUDSYNC: Push failed', e);
    }
  }

  // --- DB Operations ---

  private migrate(oldDB: any, targetDB: any): DatabaseSchema {
    const merged = { ...targetDB, ...oldDB };
    merged.settings = { ...targetDB.settings, ...oldDB.settings };
    merged.analytics = { ...targetDB.analytics, ...oldDB.analytics };
    merged.version = targetDB.version;
    return merged;
  }

  public get(): DatabaseSchema {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialDatabase;
  }

  public save(data: DatabaseSchema) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Automatic Cloud Push
    this.uploadToCloud(data);
  }

  public getTable<K extends keyof DatabaseSchema>(table: K): DatabaseSchema[K] {
    return this.get()[table];
  }

  public updateTable<K extends keyof DatabaseSchema>(table: K, data: DatabaseSchema[K]) {
    const currentDB = this.get();
    currentDB[table] = data;
    this.save(currentDB);
  }
}

export const db = new NewsDatabase();
export default db;

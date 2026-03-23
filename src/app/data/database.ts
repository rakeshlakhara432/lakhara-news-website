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

class NewsDatabase {
  private STORAGE_KEY = 'lakhara_news_db_v3';

  constructor() {
    this.init();
  }

  /**
   * AI Automation: Dynamic Schema Migration
   * If the code version is higher than the stored version, 
   * this will automatically add missing tables/fields without losing data.
   */
  private init() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      console.log('DB INIT: Creating fresh database...');
      this.save(initialDatabase);
      return;
    }

    try {
      const currentDB = JSON.parse(stored);
      
      // Check if migration is needed
      if (currentDB.version < initialDatabase.version) {
        console.log(`DB MIGRATION: Upgrading version ${currentDB.version} -> ${initialDatabase.version}`);
        const upgradedDB = this.migrate(currentDB, initialDatabase);
        this.save(upgradedDB);
      }
    } catch (e) {
      console.error('DB Repair: Resetting corrupted database');
      this.save(initialDatabase);
    }
  }

  private migrate(oldDB: any, targetDB: any): DatabaseSchema {
    // Basic merge strategy: keep old values where they exist, add new fields from target
    const merged = { ...targetDB, ...oldDB };
    
    // Deep merge selective nested objects
    merged.settings = { ...targetDB.settings, ...oldDB.settings };
    merged.analytics = { ...targetDB.analytics, ...oldDB.analytics };
    
    // Force version to target
    merged.version = targetDB.version;
    
    return merged;
  }

  public get(): DatabaseSchema {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialDatabase;
  }

  public save(data: DatabaseSchema) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  public getTable<K extends keyof DatabaseSchema>(table: K): DatabaseSchema[K] {
    return this.get()[table];
  }

  public updateTable<K extends keyof DatabaseSchema>(table: K, data: DatabaseSchema[K]) {
    const db = this.get();
    db[table] = data;
    this.save(db);
  }
}

export const db = new NewsDatabase();
export default db;

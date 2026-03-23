import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, orderBy, where, limit, Timestamp, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../data/firebase";

export interface Article {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
  author: string;
  authorId: string;
  createdAt: any;
  updatedAt: any;
  isBreaking: boolean;
  isTrending: boolean;
  views: number;
  tags: string[];
  status: 'published' | 'draft';
  slug: string;
}

const COLLECTION_NAME = "news";

export const newsService = {
  // Upload Media
  async uploadMedia(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  },

  // Create Article
  async createArticle(articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...articleData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  },

  // Update Article
  async updateArticle(id: string, articleData: Partial<Article>) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...articleData,
      updatedAt: Timestamp.now(),
    });
  },

  // Delete Article
  async deleteArticle(id: string, imageUrl?: string) {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    if (imageUrl) {
        // Optional: delete from storage
        // const storageRef = ref(storage, imageUrl);
        // await deleteObject(storageRef).catch(console.error);
    }
  },

  // Get Articles
  async getArticles(limitCount: number = 10, category?: string) {
    let q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"), limit(limitCount));
    
    if (category && category !== 'all') {
      q = query(collection(db, COLLECTION_NAME), where("category", "==", category), orderBy("createdAt", "desc"), limit(limitCount));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Article[];
  },

  // Get Article by Slug
  async getArticleBySlug(slug: string) {
    const q = query(collection(db, COLLECTION_NAME), where("slug", "==", slug), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Article;
    }
    return null;
  },

  // Real-time Articles Listener
  subscribeToArticles(callback: (articles: Article[]) => void, category?: string) {
    let q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    
    if (category && category !== 'all') {
      q = query(collection(db, COLLECTION_NAME), where("category", "==", category), orderBy("createdAt", "desc"));
    }

    return onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Article[];
      callback(articles);
    });
  }
};

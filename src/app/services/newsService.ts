import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy,
  doc,
  addDoc,
  deleteDoc,
  serverTimestamp,
  getDoc
} from "firebase/firestore";
import { db } from "../data/firebase";

export interface NewsPost {
  id?: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  createdAt: any;
}

class NewsService {
  subscribeToNews(callback: (news: NewsPost[]) => void) {
    const q = query(collection(db, "samaj_news"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as NewsPost[]);
    });
  }

  async getNewsById(id: string): Promise<NewsPost | null> {
    const docRef = doc(db, "samaj_news", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as NewsPost;
    }
    return null;
  }

  async addNews(news: Omit<NewsPost, "id" | "createdAt">) {
    return addDoc(collection(db, "samaj_news"), { ...news, createdAt: serverTimestamp() });
  }

  async deleteNews(id: string) {
    return deleteDoc(doc(db, "samaj_news", id));
  }
}

export const newsService = new NewsService();

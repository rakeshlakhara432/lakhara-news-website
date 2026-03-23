import { 
  collection, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  limit, 
  addDoc, 
  Timestamp 
} from "firebase/firestore";
import { db } from "../data/firebase";

export interface Notification {
  id?: string;
  title: string;
  body: string;
  type: 'breaking' | 'general';
  createdAt: any;
  link?: string;
  isRead?: boolean;
}

const COLLECTION_NAME = "notifications";

export const notificationService = {
  // Subscribe to latest breaking news notifications
  subscribeToBreaking: (callback: (notifications: Notification[]) => void) => {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("type", "==", "breaking"),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    return onSnapshot(q, (snapshot) => {
      const notifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Notification[];
      callback(notifications);
    });
  },

  // Create a new notification
  createNotification: async (notification: Omit<Notification, "id" | "createdAt">) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...notification,
        createdAt: Timestamp.now(),
        isRead: false
      });
      return docRef.id;
    } catch (error) {
      console.error("Create notification error:", error);
      throw error;
    }
  }
};

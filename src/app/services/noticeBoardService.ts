import {
  collection, addDoc, deleteDoc, doc, onSnapshot,
  query, orderBy, updateDoc, serverTimestamp
} from "firebase/firestore";
import { db } from "../data/firebase";

export interface Notice {
  id?: string;
  title: string;
  content: string;
  type: "urgent" | "info" | "celebration" | "meeting";
  isPinned: boolean;
  expiresAt?: string;
  imageUrl?: string;
  createdAt: any;
}

class NoticeBoardService {
  subscribeToNotices(cb: (notices: Notice[]) => void) {
    const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
    return onSnapshot(q, snap => {
      cb(snap.docs.map(d => ({ id: d.id, ...d.data() })) as Notice[]);
    });
  }

  async addNotice(notice: Omit<Notice, "id" | "createdAt">) {
    return addDoc(collection(db, "notices"), { ...notice, createdAt: serverTimestamp() });
  }

  async deleteNotice(id: string) {
    return deleteDoc(doc(db, "notices", id));
  }

  async updateNotice(id: string, data: Partial<Notice>) {
    return updateDoc(doc(db, "notices", id), data);
  }
}

export const noticeBoardService = new NoticeBoardService();

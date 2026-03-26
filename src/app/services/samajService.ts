import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  Timestamp,
  serverTimestamp,
  where,
  limit,
  getDocs
} from "firebase/firestore";
import { db } from "../data/firebase";

export interface Member {
  id?: string;
  name: string;
  fatherName: string;
  city: string;
  occupation: string;
  phone: string;
  email?: string;
  familyType: string;
  isApproved: boolean;
  createdAt: any;
}

export interface MatrimonialProfile {
  id?: string;
  uid: string; // Firebase Auth UID
  name: string;
  age: number;
  gender: "वर" | "वधु";
  caste: string;
  religion: string;
  height: string;
  education: string;
  occupation: string;
  income?: string;
  city: string;
  address?: string;
  familyType: string; // Joint/Nuclear
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  bio: string;
  photos: string[]; // Image URLs
  kundliUrl?: string; // Horoscope PDF/Image
  idProofUrl?: string; // For verification
  partnerPreferences: {
    ageRange: string;
    education?: string;
    city?: string;
  };
  privacySettings: {
    hideContact: boolean;
    searchable: boolean;
  };
  isApproved: boolean;
  isVerified: boolean;
  createdAt: any;
}

export interface SamajEvent {
  id?: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: string;
  imageUrl?: string;
  createdAt: any;
}

export interface GalleryImage {
  id?: string;
  url: string;
  caption: string;
  createdAt: any;
}

export interface ContactMessage {
  id?: string;
  name: string;
  subject: string;
  message: string;
  createdAt: any;
}

export interface CommitteeMember {
  id?: string;
  name: string;
  designation: string;
  city: string;
  phone: string;
  photoUrl?: string;
  order: number;
}

export interface NewsPost {
  id?: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  createdAt: any;
}

export interface SupportPost {
  id?: string;
  title: string;
  description: string;
  type: "शिक्षा" | "सहायता" | "अन्य";
  contact: string;
  createdAt: any;
}

export interface VideoPost {
  id?: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  isLive?: boolean;
  createdAt: any;
}

class SamajService {
  // Members / Directory
  subscribeToMembers(callback: (members: Member[]) => void) {
    const q = query(collection(db, "members"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      const members = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Member[];
      callback(members);
    });
  }

  async addMember(member: Omit<Member, "id" | "createdAt" | "isApproved">) {
    return addDoc(collection(db, "members"), {
      ...member,
      isApproved: false,
      createdAt: serverTimestamp()
    });
  }

  async approveMember(id: string) {
    return updateDoc(doc(db, "members", id), { isApproved: true });
  }

  async deleteMember(id: string) {
    return deleteDoc(doc(db, "members", id));
  }

  // Matrimonial
  subscribeToMatrimonial(callback: (profiles: MatrimonialProfile[]) => void) {
    const q = query(collection(db, "matrimonial"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MatrimonialProfile[];
      callback(data);
    });
  }

  async addMatrimonial(profile: Omit<MatrimonialProfile, "id" | "createdAt" | "isApproved" | "isVerified">) {
    return addDoc(collection(db, "matrimonial"), {
      ...profile,
      isApproved: false,
      isVerified: false,
      createdAt: serverTimestamp()
    });
  }

  async updateMatrimonial(id: string, data: Partial<MatrimonialProfile>) {
    return updateDoc(doc(db, "matrimonial", id), data);
  }

  async getMatrimonialByUid(uid: string) {
    const q = query(collection(db, "matrimonial"), where("uid", "==", uid), limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as MatrimonialProfile;
    }
    return null;
  }

  async deleteMatrimonial(id: string) {
    return deleteDoc(doc(db, "matrimonial", id));
  }

  // Events
  subscribeToEvents(callback: (events: SamajEvent[]) => void) {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SamajEvent[];
      callback(data);
    });
  }

  async addEvent(event: Omit<SamajEvent, "id" | "createdAt">) {
    return addDoc(collection(db, "events"), {
      ...event,
      createdAt: serverTimestamp()
    });
  }

  async deleteEvent(id: string) {
    return deleteDoc(doc(db, "events", id));
  }

  // Gallery
  subscribeToGallery(callback: (images: GalleryImage[]) => void) {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryImage[];
      callback(data);
    });
  }

  async addGalleryImage(image: Omit<GalleryImage, "id" | "createdAt">) {
    return addDoc(collection(db, "gallery"), {
      ...image,
      createdAt: serverTimestamp()
    });
  }

  async deleteGalleryImage(id: string) {
    return deleteDoc(doc(db, "gallery", id));
  }

  // Messages
  async addMessage(message: Omit<ContactMessage, "id" | "createdAt">) {
    return addDoc(collection(db, "messages"), {
      ...message,
      createdAt: serverTimestamp()
    });
  }

  subscribeToMessages(callback: (messages: ContactMessage[]) => void) {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ContactMessage[];
      callback(data);
    });
  }

  async deleteMessage(id: string) {
    return deleteDoc(doc(db, "messages", id));
  }

  // Committee
  subscribeToCommittee(callback: (members: CommitteeMember[]) => void) {
    const q = query(collection(db, "committee"), orderBy("order", "asc"));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CommitteeMember[]);
    });
  }

  async addCommittee(member: Omit<CommitteeMember, "id">) {
    return addDoc(collection(db, "committee"), member);
  }

  async deleteCommittee(id: string) {
    return deleteDoc(doc(db, "committee", id));
  }

  // News (Samaj Announcements)
  subscribeToSamajNews(callback: (news: NewsPost[]) => void) {
    const q = query(collection(db, "samaj_news"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as NewsPost[]);
    });
  }

  async addSamajNews(news: Omit<NewsPost, "id" | "createdAt">) {
    return addDoc(collection(db, "samaj_news"), { ...news, createdAt: serverTimestamp() });
  }

  async deleteSamajNews(id: string) {
    return deleteDoc(doc(db, "samaj_news", id));
  }

  // Support / Education
  subscribeToSupport(callback: (posts: SupportPost[]) => void) {
    const q = query(collection(db, "support"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as SupportPost[]);
    });
  }

  async addSupport(post: Omit<SupportPost, "id" | "createdAt">) {
    return addDoc(collection(db, "support"), { ...post, createdAt: serverTimestamp() });
  }

  async deleteSupport(id: string) {
    return deleteDoc(doc(db, "support", id));
  }

  // Videos
  subscribeToVideos(callback: (videos: VideoPost[]) => void) {
    const q = query(collection(db, "samaj_videos"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as VideoPost[]);
    });
  }

  async addVideo(video: Omit<VideoPost, "id" | "createdAt">) {
    return addDoc(collection(db, "samaj_videos"), { ...video, createdAt: serverTimestamp() });
  }

  async deleteVideo(id: string) {
    return deleteDoc(doc(db, "samaj_videos", id));
  }
}

export const samajService = new SamajService();

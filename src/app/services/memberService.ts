import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  where,
  limit,
  getDocs,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../data/firebase";

export interface Member {
  id?: string;
  name: string;
  fatherName: string;
  birthDate?: string;
  gender?: "पुरुष" | "महिला" | "अन्य";
  phone: string;
  email?: string;
  bloodGroup?: string;
  occupation: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  familyType: string;
  photoUrl?: string;
  anniversaryDate?: string;
  memberNumber?: string;
  memberId?: string;
  isApproved: boolean;
  uid?: string;
  createdAt: any;
}

class MemberService {
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

  async getMemberByUid(uid: string) {
    const q = query(collection(db, "members"), where("uid", "==", uid), limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Member;
    }
    return null;
  }

  async checkDuplicate(phone: string, email?: string) {
    const results = { phoneExists: false, emailExists: false };
    const qPhone = query(collection(db, "members"), where("phone", "==", phone), limit(1));
    const snapPhone = await getDocs(qPhone);
    if (!snapPhone.empty) results.phoneExists = true;
    
    if (email) {
      const qEmail = query(collection(db, "members"), where("email", "==", email), limit(1));
      const snapEmail = await getDocs(qEmail);
      if (!snapEmail.empty) results.emailExists = true;
    }
    return results;
  }

  async updateMember(id: string, data: Partial<Member>) {
    return updateDoc(doc(db, "members", id), data);
  }
}

export const memberService = new MemberService();

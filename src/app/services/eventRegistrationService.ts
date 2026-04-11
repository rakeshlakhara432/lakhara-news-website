import {
  collection, addDoc, onSnapshot, query, orderBy, serverTimestamp
} from "firebase/firestore";
import { db } from "../data/firebase";

export interface EventRegistration {
  id?: string;
  eventId: string;
  eventTitle: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  attendees: number;
  createdAt: any;
}

class EventRegistrationService {
  async register(data: Omit<EventRegistration, "id" | "createdAt">) {
    return addDoc(collection(db, "event_registrations"), {
      ...data,
      createdAt: serverTimestamp()
    });
  }

  subscribeToRegistrations(
    eventId: string,
    cb: (regs: EventRegistration[]) => void
  ) {
    const q = query(
      collection(db, "event_registrations"),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, snap => {
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() })) as EventRegistration[];
      cb(eventId === "all" ? all : all.filter(r => r.eventId === eventId));
    });
  }
}

export const eventRegistrationService = new EventRegistrationService();

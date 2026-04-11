import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../data/firebase";

export interface CertAdminSettings {
  adminName: string;        // e.g. "Rajesh Lakhara"
  adminDesignation: string; // e.g. "Adhyaksh" / "Mahasachiv"
  signatureBase64: string;  // base64 data-URL of the signature image
  updatedAt?: string;
}

const DOC_REF = doc(db, "settings", "certificate_admin");

export const certSettingsService = {
  async get(): Promise<CertAdminSettings | null> {
    const snap = await getDoc(DOC_REF);
    if (snap.exists()) return snap.data() as CertAdminSettings;
    return null;
  },

  async save(settings: CertAdminSettings): Promise<void> {
    await setDoc(DOC_REF, { ...settings, updatedAt: new Date().toISOString() });
  },
};

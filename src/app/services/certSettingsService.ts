import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from "../data/firebase";

export interface CertAdminSettings {
  adminName: string;        // e.g. "Rajesh Lakhara"
  adminDesignation: string; // e.g. "Adhyaksh" / "Mahasachiv"
  signatureBase64: string;  // base64 data-URL (local preview) OR download URL from Storage
  signatureUrl?: string;    // Firebase Storage download URL (preferred for display)
  updatedAt?: string;
}

const DOC_REF = doc(db, "settings", "certificate_admin");

/**
 * Upload signature image (base64 or File) to Firebase Storage.
 * Returns the public download URL.
 */
export async function uploadSignatureToStorage(
  input: string | File
): Promise<string> {
  const storageRef = ref(storage, "admin/signature.png");

  if (typeof input === "string") {
    // base64 data URL → upload as data_url
    // Strip prefix: "data:image/png;base64,..."
    await uploadString(storageRef, input, "data_url");
  } else {
    // Direct File object
    await uploadBytes(storageRef, input);
  }

  return await getDownloadURL(storageRef);
}

export const certSettingsService = {
  async get(): Promise<CertAdminSettings | null> {
    const snap = await getDoc(DOC_REF);
    if (snap.exists()) return snap.data() as CertAdminSettings;
    return null;
  },

  async save(settings: CertAdminSettings): Promise<void> {
    // If signatureBase64 is a large base64 string (not a URL), upload to Storage first
    let signatureUrl = settings.signatureUrl || "";
    let signatureBase64 = settings.signatureBase64 || "";

    const isBase64 = signatureBase64.startsWith("data:");

    if (isBase64) {
      try {
        signatureUrl = await uploadSignatureToStorage(signatureBase64);
        // After uploading, only store the URL (not the full base64) in Firestore
        signatureBase64 = signatureUrl;
      } catch (err) {
        console.error("Signature upload to Storage failed:", err);
        throw err;
      }
    }

    await setDoc(DOC_REF, {
      ...settings,
      signatureBase64,   // now a URL (or empty)
      signatureUrl,      // also stored separately for easy access
      updatedAt: new Date().toISOString(),
    });
  },
};

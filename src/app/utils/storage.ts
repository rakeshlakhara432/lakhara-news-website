import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../data/firebase";

/**
 * Uploads a file to Firebase Storage and returns the download URL.
 * @param file The file object from the input.
 * @param path The directory path in storage (e.g., 'members', 'gallery').
 * @param filename Optional filename. If omitted, uses the current timestamp.
 * @returns Promise with the download URL.
 */
export async function uploadFile(file: File, path: string, filename?: string): Promise<string> {
  const extension = file.name.split('.').pop();
  const name = filename || `${Date.now()}_${Math.random().toString(36).substring(7)}`;
  const fullPath = `${path}/${name}.${extension}`;
  
  const storageRef = ref(storage, fullPath);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null, // You could add a progress callback here if needed
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

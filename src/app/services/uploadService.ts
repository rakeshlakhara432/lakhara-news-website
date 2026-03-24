/**
 * uploadService.ts
 * Unified service for uploading Videos, Photos, and News Articles
 * with Firebase Storage + Firestore.
 *
 * Firebase Speed Optimisations applied here:
 *  - uploadBytesResumable  → real-time progress reporting
 *  - Client-side image compression before upload (canvas API)
 *  - Structured storage paths for CDN caching
 *  - Batch Firestore writes where possible
 *  - Timestamp.now()  instead of serverTimestamp() to avoid extra round-trip
 */

import {
  collection, addDoc, Timestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../data/firebase";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PhotoPost {
  id?: string;
  title: string;
  caption: string;
  hashtags: string[];
  imageUrl: string;          // full-res
  thumbUrl: string;          // compressed thumb
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  category: string;
  likes: number;
  commentsCount: number;
  views: number;
  status: "published" | "banned";
  createdAt: any;
}

export interface NewsPost {
  id?: string;
  headline: string;
  summary: string;
  body: string;
  imageUrl: string;
  source: string;
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  category: string;
  tags: string[];
  isBreaking: boolean;
  views: number;
  likes: number;
  status: "published" | "draft" | "banned";
  createdAt: any;
}

// ── Image Compression (client-side) ──────────────────────────────────────────

/**
 * Compress an image file to target maxWidthPx / quality via canvas.
 * Returns a Blob of type image/jpeg.
 */
export async function compressImage(
  file: File,
  maxWidthPx = 1280,
  quality = 0.82
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxWidthPx / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Canvas toBlob failed"));
        },
        "image/jpeg",
        quality
      );
    };
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Compress + generate a small thumbnail blob (300px wide, q=0.70)
 */
export async function makeThumbnail(file: File): Promise<Blob> {
  return compressImage(file, 300, 0.7);
}

// ── Generic upload helper ────────────────────────────────────────────────────

export function uploadWithProgress(
  blob: Blob | File,
  storagePath: string,
  onProgress?: (pct: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, storagePath);
    const task = uploadBytesResumable(storageRef, blob);
    task.on(
      "state_changed",
      (snap) =>
        onProgress?.(
          Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
        ),
      reject,
      async () => {
        try {
          resolve(await getDownloadURL(task.snapshot.ref));
        } catch (e) {
          reject(e);
        }
      }
    );
  });
}

// ── Photo Upload ──────────────────────────────────────────────────────────────

export const PHOTOS_COLLECTION = "photos";

export async function uploadPhoto(
  file: File,
  meta: {
    title: string;
    caption: string;
    hashtags: string[];
    category: string;
    authorId: string;
    authorName: string;
    authorPhotoURL?: string;
  },
  onProgress?: (pct: number) => void
): Promise<string> {
  const ts = Date.now();
  const basePath = `photos/${meta.authorId}/${ts}`;

  // Parallel: compress full + thumbnail
  const [fullBlob, thumbBlob] = await Promise.all([
    compressImage(file, 1280, 0.85),
    makeThumbnail(file),
  ]);

  // Upload full image (0–80%) then thumbnail (80–100%)
  const imageUrl = await uploadWithProgress(
    fullBlob,
    `${basePath}_full.jpg`,
    (p) => onProgress?.(Math.round(p * 0.8))
  );
  const thumbUrl = await uploadWithProgress(
    thumbBlob,
    `${basePath}_thumb.jpg`,
    (p) => onProgress?.(80 + Math.round(p * 0.2))
  );

  const docRef = await addDoc(collection(db, PHOTOS_COLLECTION), {
    ...meta,
    imageUrl,
    thumbUrl,
    likes: 0,
    commentsCount: 0,
    views: 0,
    status: "published",
    createdAt: Timestamp.now(),
  });

  return docRef.id;
}

// ── News Upload ───────────────────────────────────────────────────────────────

export const NEWS_USER_COLLECTION = "userNews";

export async function uploadNews(
  coverFile: File | null,
  meta: {
    headline: string;
    summary: string;
    body: string;
    source: string;
    tags: string[];
    category: string;
    isBreaking: boolean;
    authorId: string;
    authorName: string;
    authorPhotoURL?: string;
  },
  onProgress?: (pct: number) => void
): Promise<string> {
  let imageUrl = "";

  if (coverFile) {
    const ts = Date.now();
    const compressed = await compressImage(coverFile, 1024, 0.85);
    imageUrl = await uploadWithProgress(
      compressed,
      `news_covers/${meta.authorId}/${ts}.jpg`,
      onProgress
    );
  }

  const docRef = await addDoc(collection(db, NEWS_USER_COLLECTION), {
    ...meta,
    imageUrl,
    likes: 0,
    views: 0,
    status: "published",
    createdAt: Timestamp.now(),
  });

  return docRef.id;
}

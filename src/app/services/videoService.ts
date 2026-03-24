import {
  collection, addDoc, updateDoc, deleteDoc, doc, getDocs,
  query, orderBy, where, limit, Timestamp, onSnapshot,
  increment, arrayUnion, arrayRemove, getDoc, setDoc
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../data/firebase";

export interface VideoPost {
  id?: string;
  title: string;
  caption: string;
  hashtags: string[];
  videoUrl: string;
  thumbnailUrl: string;
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  views: number;
  likes: number;
  commentsCount: number;
  shares: number;
  category: string;
  quality: "360p" | "720p" | "1080p";
  status: "published" | "draft" | "reported" | "banned";
  reportCount: number;
  createdAt: any;
  updatedAt: any;
}

export interface VideoComment {
  id?: string;
  videoId: string;
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  text: string;
  createdAt: any;
}

export interface UserFollow {
  followerId: string;
  followingId: string;
  createdAt: any;
}

export interface Notification {
  id?: string;
  userId: string;
  type: "like" | "comment" | "follow" | "report";
  fromUserId: string;
  fromUserName: string;
  videoId?: string;
  videoTitle?: string;
  message: string;
  read: boolean;
  createdAt: any;
}

const VIDEOS_COLLECTION = "videos";
const COMMENTS_COLLECTION = "videoComments";
const FOLLOWS_COLLECTION = "follows";
const NOTIFICATIONS_COLLECTION = "notifications";
const LIKES_COLLECTION = "videoLikes";
const REPORTS_COLLECTION = "videoReports";

export const videoService = {
  // ─── Video Upload ───────────────────────────────────────────────────────────
  async uploadVideo(
    file: File,
    thumbnailFile: File | null,
    metadata: {
      title: string;
      caption: string;
      hashtags: string[];
      category: string;
      authorId: string;
      authorName: string;
      authorPhotoURL?: string;
    },
    onProgress?: (progress: number) => void
  ): Promise<string> {
    // Upload video
    const videoPath = `videos/${metadata.authorId}/${Date.now()}_${file.name}`;
    const videoRef = ref(storage, videoPath);
    
    await new Promise<string>((resolve, reject) => {
      const uploadTask = uploadBytesResumable(videoRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.(progress);
        },
        reject,
        () => resolve("")
      );
    });
    const videoUrl = await getDownloadURL(videoRef);

    // Upload or auto-generate thumbnail
    let thumbnailUrl = "";
    if (thumbnailFile) {
      const thumbRef = ref(storage, `thumbnails/${metadata.authorId}/${Date.now()}_thumb`);
      await uploadBytesResumable(thumbRef, thumbnailFile);
      thumbnailUrl = await getDownloadURL(thumbRef);
    } else {
      // Use a placeholder thumbnail
      thumbnailUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(metadata.title)}&background=dc2626&color=fff&size=400`;
    }

    // Save metadata to Firestore
    const docRef = await addDoc(collection(db, VIDEOS_COLLECTION), {
      ...metadata,
      videoUrl,
      thumbnailUrl,
      views: 0,
      likes: 0,
      commentsCount: 0,
      shares: 0,
      quality: "720p",
      status: "published",
      reportCount: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return docRef.id;
  },

  // ─── Get Videos (Feed) ─────────────────────────────────────────────────────
  async getVideos(limitCount = 20, category?: string): Promise<VideoPost[]> {
    let q = query(
      collection(db, VIDEOS_COLLECTION),
      where("status", "==", "published"),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
    if (category && category !== "all") {
      q = query(
        collection(db, VIDEOS_COLLECTION),
        where("status", "==", "published"),
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );
    }
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as VideoPost[];
  },

  // ─── Trending Videos ──────────────────────────────────────────────────────
  async getTrendingVideos(limitCount = 10): Promise<VideoPost[]> {
    const q = query(
      collection(db, VIDEOS_COLLECTION),
      where("status", "==", "published"),
      orderBy("views", "desc"),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as VideoPost[];
  },

  // ─── User Videos ──────────────────────────────────────────────────────────
  async getUserVideos(userId: string): Promise<VideoPost[]> {
    const q = query(
      collection(db, VIDEOS_COLLECTION),
      where("authorId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as VideoPost[];
  },

  // ─── Real-time Videos Listener ────────────────────────────────────────────
  subscribeToVideos(callback: (videos: VideoPost[]) => void, category?: string) {
    let q = query(
      collection(db, VIDEOS_COLLECTION),
      where("status", "==", "published"),
      orderBy("createdAt", "desc"),
      limit(30)
    );
    if (category && category !== "all") {
      q = query(
        collection(db, VIDEOS_COLLECTION),
        where("status", "==", "published"),
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        limit(30)
      );
    }
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as VideoPost[]);
    });
  },

  // ─── Increment View Count ─────────────────────────────────────────────────
  async incrementView(videoId: string) {
    await updateDoc(doc(db, VIDEOS_COLLECTION, videoId), { views: increment(1) });
  },

  // ─── Like / Unlike ────────────────────────────────────────────────────────
  async toggleLike(videoId: string, userId: string, authorId: string, authorName: string, videoTitle: string): Promise<boolean> {
    const likeRef = doc(db, LIKES_COLLECTION, `${videoId}_${userId}`);
    const likeSnap = await getDoc(likeRef);

    if (likeSnap.exists()) {
      await deleteDoc(likeRef);
      await updateDoc(doc(db, VIDEOS_COLLECTION, videoId), { likes: increment(-1) });
      return false;
    } else {
      await setDoc(likeRef, { videoId, userId, createdAt: Timestamp.now() });
      await updateDoc(doc(db, VIDEOS_COLLECTION, videoId), { likes: increment(1) });
      // Notification
      if (authorId !== userId) {
        await videoService.sendNotification({
          userId: authorId,
          type: "like",
          fromUserId: userId,
          fromUserName: authorName,
          videoId,
          videoTitle,
          message: `${authorName} ne aapki video "${videoTitle}" ko like kiya`,
          read: false,
          createdAt: Timestamp.now(),
        });
      }
      return true;
    }
  },

  async isLikedByUser(videoId: string, userId: string): Promise<boolean> {
    const likeRef = doc(db, LIKES_COLLECTION, `${videoId}_${userId}`);
    const snap = await getDoc(likeRef);
    return snap.exists();
  },

  // ─── Comments ─────────────────────────────────────────────────────────────
  async addComment(
    videoId: string,
    authorId: string,
    authorName: string,
    text: string,
    videoAuthorId: string,
    videoTitle: string,
    authorPhotoURL?: string
  ): Promise<string> {
    const docRef = await addDoc(collection(db, COMMENTS_COLLECTION), {
      videoId, authorId, authorName, authorPhotoURL: authorPhotoURL || "",
      text, createdAt: Timestamp.now(),
    });
    await updateDoc(doc(db, VIDEOS_COLLECTION, videoId), { commentsCount: increment(1) });
    
    // Notification to video owner
    if (videoAuthorId !== authorId) {
      await videoService.sendNotification({
        userId: videoAuthorId,
        type: "comment",
        fromUserId: authorId,
        fromUserName: authorName,
        videoId,
        videoTitle,
        message: `${authorName} ne aapki video par comment kiya: "${text.slice(0, 40)}..."`,
        read: false,
        createdAt: Timestamp.now(),
      });
    }
    return docRef.id;
  },

  subscribeToComments(videoId: string, callback: (comments: VideoComment[]) => void) {
    const q = query(
      collection(db, COMMENTS_COLLECTION),
      where("videoId", "==", videoId),
      orderBy("createdAt", "asc")
    );
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as VideoComment[]);
    });
  },

  async deleteComment(commentId: string, videoId: string) {
    await deleteDoc(doc(db, COMMENTS_COLLECTION, commentId));
    await updateDoc(doc(db, VIDEOS_COLLECTION, videoId), { commentsCount: increment(-1) });
  },

  // ─── Follow / Unfollow ────────────────────────────────────────────────────
  async toggleFollow(followerId: string, followerName: string, followingId: string): Promise<boolean> {
    const followRef = doc(db, FOLLOWS_COLLECTION, `${followerId}_${followingId}`);
    const snap = await getDoc(followRef);

    if (snap.exists()) {
      await deleteDoc(followRef);
      return false;
    } else {
      await setDoc(followRef, { followerId, followingId, createdAt: Timestamp.now() });
      await videoService.sendNotification({
        userId: followingId,
        type: "follow",
        fromUserId: followerId,
        fromUserName: followerName,
        message: `${followerName} aapko follow karne lage`,
        read: false,
        createdAt: Timestamp.now(),
      });
      return true;
    }
  },

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const ref2 = doc(db, FOLLOWS_COLLECTION, `${followerId}_${followingId}`);
    const snap = await getDoc(ref2);
    return snap.exists();
  },

  async getFollowerCount(userId: string): Promise<number> {
    const q = query(collection(db, FOLLOWS_COLLECTION), where("followingId", "==", userId));
    const snap = await getDocs(q);
    return snap.size;
  },

  async getFollowingCount(userId: string): Promise<number> {
    const q = query(collection(db, FOLLOWS_COLLECTION), where("followerId", "==", userId));
    const snap = await getDocs(q);
    return snap.size;
  },

  // ─── Notifications ────────────────────────────────────────────────────────
  async sendNotification(notification: Omit<Notification, "id">) {
    await addDoc(collection(db, NOTIFICATIONS_COLLECTION), notification);
  },

  subscribeToNotifications(userId: string, callback: (notifs: Notification[]) => void) {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Notification[]);
    });
  },

  async markNotificationRead(notifId: string) {
    await updateDoc(doc(db, NOTIFICATIONS_COLLECTION, notifId), { read: true });
  },

  async markAllNotificationsRead(userId: string) {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where("userId", "==", userId),
      where("read", "==", false)
    );
    const snap = await getDocs(q);
    await Promise.all(snap.docs.map((d) => updateDoc(d.ref, { read: true })));
  },

  // ─── Report Video ─────────────────────────────────────────────────────────
  async reportVideo(videoId: string, reporterId: string, reason: string) {
    await addDoc(collection(db, REPORTS_COLLECTION), {
      videoId, reporterId, reason, createdAt: Timestamp.now(),
    });
    await updateDoc(doc(db, VIDEOS_COLLECTION, videoId), { reportCount: increment(1) });
  },

  // ─── Admin: Delete Video ───────────────────────────────────────────────────
  async deleteVideo(videoId: string) {
    await updateDoc(doc(db, VIDEOS_COLLECTION, videoId), { status: "banned" });
  },

  // ─── Admin: Ban User ───────────────────────────────────────────────────────
  async banUser(userId: string) {
    await updateDoc(doc(db, "users", userId), { banned: true });
    // Also ban all their videos
    const q = query(collection(db, VIDEOS_COLLECTION), where("authorId", "==", userId));
    const snap = await getDocs(q);
    await Promise.all(snap.docs.map((d) => updateDoc(d.ref, { status: "banned" })));
  },

  // ─── Admin: Get All Reports ────────────────────────────────────────────────
  async getReportedVideos(): Promise<VideoPost[]> {
    const q = query(
      collection(db, VIDEOS_COLLECTION),
      where("reportCount", ">", 0),
      orderBy("reportCount", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as VideoPost[];
  },

  // ─── Share Count ──────────────────────────────────────────────────────────
  async incrementShare(videoId: string) {
    await updateDoc(doc(db, VIDEOS_COLLECTION, videoId), { shares: increment(1) });
  },
};

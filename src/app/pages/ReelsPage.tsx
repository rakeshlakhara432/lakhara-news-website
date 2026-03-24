import { useState, useEffect, useRef, useCallback } from "react";
import {
  Heart, MessageCircle, Share2, Bookmark, MoreVertical,
  Play, Pause, Volume2, VolumeX, Flag, X, Send,
  ChevronUp, ChevronDown, Loader2, TrendingUp, Clock, Hash,
  UserPlus, UserCheck
} from "lucide-react";
import { videoService, VideoPost, VideoComment } from "../services/videoService";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const VIDEO_CATEGORIES = ["all", "राजनीति", "खेल", "मनोरंजन", "व्यापार", "तकनीक", "स्वास्थ्य", "शिक्षा"];

export function ReelsPage() {
  const { user, userData } = useAuth();
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [feedType, setFeedType] = useState<"latest" | "trending">("latest");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    const unsub = videoService.subscribeToVideos((vids) => {
      setVideos(vids);
      setLoading(false);
    }, activeCategory === "all" ? undefined : activeCategory);
    return () => unsub();
  }, [activeCategory]);

  const sortedVideos = feedType === "trending"
    ? [...videos].sort((a, b) => (b.views + b.likes * 3) - (a.views + a.likes * 3))
    : videos;

  const scrollTo = (idx: number) => {
    const el = containerRef.current?.children[idx] as HTMLElement;
    el?.scrollIntoView({ behavior: "smooth" });
    setActiveIndex(idx);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <Loader2 className="size-12 animate-spin text-red-500" />
      </div>
    );
  }

  if (sortedVideos.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-black flex-col gap-4">
        <div className="text-6xl">🎬</div>
        <p className="text-white text-xl font-bold">कोई वीडियो नहीं मिला</p>
        <p className="text-gray-400 text-sm">पहले वीडियो अपलोड करें</p>
      </div>
    );
  }

  return (
    <div className="relative bg-black min-h-screen">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-4 pb-2 bg-gradient-to-b from-black/80 to-transparent">
        <h1 className="text-white font-black text-xl tracking-wide">🎬 Reels</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFeedType("latest")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black transition-all ${feedType === "latest" ? "bg-red-600 text-white" : "bg-white/10 text-white"}`}
          >
            <Clock className="size-3" />Latest
          </button>
          <button
            onClick={() => setFeedType("trending")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black transition-all ${feedType === "trending" ? "bg-red-600 text-white" : "bg-white/10 text-white"}`}
          >
            <TrendingUp className="size-3" />Trending
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="fixed top-14 left-0 right-0 z-30 flex gap-2 px-4 overflow-x-auto scrollbar-hide">
        {VIDEO_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setActiveIndex(0); }}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-black transition-all ${activeCategory === cat ? "bg-red-600 text-white" : "bg-white/10 text-white"}`}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      {/* Video Feed */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: "y mandatory" }}
        onScroll={(e) => {
          const el = e.currentTarget;
          const idx = Math.round(el.scrollTop / el.clientHeight);
          setActiveIndex(idx);
        }}
      >
        {sortedVideos.map((video, idx) => (
          <VideoCard
            key={video.id}
            video={video}
            isActive={idx === activeIndex}
            user={user}
            userData={userData}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {activeIndex > 0 && (
        <button
          onClick={() => scrollTo(activeIndex - 1)}
          className="fixed left-1/2 top-[80px] -translate-x-1/2 z-30 bg-white/10 backdrop-blur-sm text-white rounded-full p-2 animate-bounce"
        >
          <ChevronUp className="size-5" />
        </button>
      )}
      {activeIndex < sortedVideos.length - 1 && (
        <button
          onClick={() => scrollTo(activeIndex + 1)}
          className="fixed left-1/2 bottom-28 -translate-x-1/2 z-30 bg-white/10 backdrop-blur-sm text-white rounded-full p-2 animate-bounce"
        >
          <ChevronDown className="size-5" />
        </button>
      )}
    </div>
  );
}

// ── VideoCard Component ────────────────────────────────────────────────────────
function VideoCard({ video, isActive, user, userData }: {
  video: VideoPost;
  isActive: boolean;
  user: any;
  userData: any;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [following, setFollowing] = useState(false);
  const [viewCounted, setViewCounted] = useState(false);

  // Auto-play when active
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isActive) {
      vid.play().then(() => setIsPlaying(true)).catch(() => {});
      if (!viewCounted) {
        videoService.incrementView(video.id!).catch(() => {});
        setViewCounted(true);
      }
    } else {
      vid.pause();
      vid.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActive]);

  // Check like status
  useEffect(() => {
    if (user && video.id) {
      videoService.isLikedByUser(video.id, user.uid).then(setLiked).catch(() => {});
    }
    if (user && video.authorId) {
      videoService.isFollowing(user.uid, video.authorId).then(setFollowing).catch(() => {});
    }
  }, [user, video.id]);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) { vid.play(); setIsPlaying(true); }
    else { vid.pause(); setIsPlaying(false); }
  };

  const handleLike = async () => {
    if (!user) { toast.error("Like करने के लिए Login करें"); return; }
    const newLiked = await videoService.toggleLike(
      video.id!, user.uid, video.authorId,
      userData?.name || user.displayName || "User", video.title
    );
    setLiked(newLiked);
    setLikesCount(prev => newLiked ? prev + 1 : prev - 1);
  };

  const handleShare = async () => {
    if (video.id) videoService.incrementShare(video.id).catch(() => {});
    const shareUrl = `${window.location.origin}${window.location.pathname}#/reels`;
    if (navigator.share) {
      await navigator.share({ title: video.title, text: video.caption, url: shareUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copy ho gaya! 📋");
    }
  };

  const handleFollow = async () => {
    if (!user) { toast.error("Follow करने के लिए Login करें"); return; }
    const isNowFollowing = await videoService.toggleFollow(
      user.uid, userData?.name || "User", video.authorId
    );
    setFollowing(isNowFollowing);
    toast.success(isNowFollowing ? `${video.authorName} को Follow किया! ✅` : "Unfollow किया");
  };

  const handleReport = async (reason: string) => {
    if (!user) { toast.error("Report करने के लिए Login करें"); return; }
    await videoService.reportVideo(video.id!, user.uid, reason);
    setShowReport(false);
    toast.success("Video report कर दी गई। Admin देखेगा। 🚨");
  };

  return (
    <div
      className="relative w-full h-screen flex-shrink-0 bg-black overflow-hidden"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        loop
        muted={isMuted}
        playsInline
        poster={video.thumbnailUrl}
        className="absolute inset-0 w-full h-full object-cover"
        onClick={togglePlay}
      />

      {/* Play/Pause overlay */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          onClick={togglePlay}
        >
          <div className="bg-black/40 rounded-full p-5 backdrop-blur-sm">
            <Play className="size-12 text-white fill-white" />
          </div>
        </div>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 pointer-events-none" />

      {/* Right Action Bar */}
      <div className="absolute right-4 bottom-36 flex flex-col items-center gap-6 z-20">
        {/* Mute */}
        <button onClick={() => setIsMuted(!isMuted)}
          className="flex flex-col items-center gap-1">
          <div className="size-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            {isMuted ? <VolumeX className="size-6 text-white" /> : <Volume2 className="size-6 text-white" />}
          </div>
        </button>

        {/* Like */}
        <button onClick={handleLike} className="flex flex-col items-center gap-1">
          <div className={`size-12 rounded-full flex items-center justify-center transition-all ${liked ? "bg-red-600 scale-110" : "bg-white/10 backdrop-blur-sm"}`}>
            <Heart className={`size-6 ${liked ? "text-white fill-white" : "text-white"}`} />
          </div>
          <span className="text-white text-xs font-black">{likesCount}</span>
        </button>

        {/* Comment */}
        <button onClick={() => setShowComments(true)} className="flex flex-col items-center gap-1">
          <div className="size-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <MessageCircle className="size-6 text-white" />
          </div>
          <span className="text-white text-xs font-black">{video.commentsCount || 0}</span>
        </button>

        {/* Share */}
        <button onClick={handleShare} className="flex flex-col items-center gap-1">
          <div className="size-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Share2 className="size-6 text-white" />
          </div>
          <span className="text-white text-xs font-black">{video.shares || 0}</span>
        </button>

        {/* More Options */}
        <button onClick={() => setShowMore(!showMore)} className="flex flex-col items-center gap-1">
          <div className="size-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <MoreVertical className="size-6 text-white" />
          </div>
        </button>
      </div>

      {/* More Options Popup */}
      {showMore && (
        <div className="absolute right-20 bottom-20 z-30 bg-gray-900/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl min-w-[180px]">
          <button
            onClick={() => { setShowReport(true); setShowMore(false); }}
            className="w-full flex items-center gap-3 px-5 py-4 text-red-400 hover:bg-white/10 transition-colors text-sm font-bold"
          >
            <Flag className="size-4" /> Report करें
          </button>
        </div>
      )}

      {/* Bottom Info */}
      <div className="absolute bottom-24 left-0 right-20 px-5 z-20">
        {/* Author */}
        <div className="flex items-center gap-3 mb-3">
          {video.authorPhotoURL ? (
            <img src={video.authorPhotoURL} alt={video.authorName}
              className="size-10 rounded-full object-cover border-2 border-white" />
          ) : (
            <div className="size-10 rounded-full bg-red-600 flex items-center justify-center border-2 border-white">
              <span className="text-white text-sm font-black">{video.authorName?.[0]}</span>
            </div>
          )}
          <div>
            <p className="text-white font-black text-sm">{video.authorName}</p>
            <p className="text-gray-300 text-xs">{video.views} views</p>
          </div>
          <button
            onClick={handleFollow}
            className={`ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all ${following ? "bg-white/20 text-white" : "bg-red-600 text-white"}`}
          >
            {following ? <UserCheck className="size-3" /> : <UserPlus className="size-3" />}
            {following ? "Following" : "Follow"}
          </button>
        </div>

        <h3 className="text-white font-black text-base leading-tight mb-1 line-clamp-2">{video.title}</h3>
        <p className="text-gray-300 text-sm mb-2 line-clamp-2">{video.caption}</p>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1">
          {video.hashtags?.slice(0, 4).map((tag, i) => (
            <span key={i} className="text-blue-400 text-xs font-bold">
              <Hash className="size-3 inline mr-0.5" />{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Comments Sheet */}
      {showComments && (
        <CommentsSheet
          video={video}
          user={user}
          userData={userData}
          onClose={() => setShowComments(false)}
        />
      )}

      {/* Report Sheet */}
      {showReport && (
        <ReportSheet onClose={() => setShowReport(false)} onReport={handleReport} />
      )}
    </div>
  );
}

// ── Comments Sheet ─────────────────────────────────────────────────────────────
function CommentsSheet({ video, user, userData, onClose }: {
  video: VideoPost;
  user: any;
  userData: any;
  onClose: () => void;
}) {
  const [comments, setComments] = useState<VideoComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = videoService.subscribeToComments(video.id!, setComments);
    return () => unsub();
  }, [video.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const handleSend = async () => {
    if (!user) { toast.error("Comment करने के लिए Login करें"); return; }
    if (!newComment.trim()) return;
    setSending(true);
    try {
      await videoService.addComment(
        video.id!, user.uid, userData?.name || user.displayName || "User",
        newComment.trim(), video.authorId, video.title, userData?.photoURL || user.photoURL
      );
      setNewComment("");
    } catch { toast.error("Comment नहीं हो सका"); }
    finally { setSending(false); }
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-t-3xl max-h-[70vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 className="text-white font-black text-lg">Comments ({comments.length})</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="size-6" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <MessageCircle className="size-10 mx-auto mb-2 opacity-30" />
              <p className="font-bold">पहला comment करें!</p>
            </div>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                {c.authorPhotoURL ? (
                  <img src={c.authorPhotoURL} className="size-9 rounded-full object-cover flex-shrink-0" alt="" />
                ) : (
                  <div className="size-9 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-black">{c.authorName?.[0]}</span>
                  </div>
                )}
                <div>
                  <p className="text-white font-bold text-sm">{c.authorName}</p>
                  <p className="text-gray-300 text-sm mt-0.5">{c.text}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {c.createdAt?.toDate ? c.createdAt.toDate().toLocaleTimeString("hi-IN", { hour: "2-digit", minute: "2-digit" }) : ""}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-4 border-t border-white/10 flex gap-3">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Comment लिखें..."
            className="flex-1 bg-white/10 text-white placeholder-gray-400 rounded-2xl px-4 py-3 text-sm font-medium outline-none focus:bg-white/15 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={sending || !newComment.trim()}
            className="size-11 bg-red-600 rounded-2xl flex items-center justify-center disabled:opacity-50 transition-all hover:bg-red-700"
          >
            {sending ? <Loader2 className="size-5 text-white animate-spin" /> : <Send className="size-5 text-white" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Report Sheet ───────────────────────────────────────────────────────────────
function ReportSheet({ onClose, onReport }: { onClose: () => void; onReport: (reason: string) => void }) {
  const reasons = [
    "Inappropriate content", "Spam", "Fake news", "Violence",
    "Hate speech", "Copyright violation", "Other"
  ];

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-t-3xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-black text-lg">🚨 Report करें</h3>
          <button onClick={onClose}><X className="size-6 text-gray-400" /></button>
        </div>
        <div className="space-y-2">
          {reasons.map((r) => (
            <button
              key={r}
              onClick={() => onReport(r)}
              className="w-full px-5 py-4 bg-white/5 hover:bg-red-600/20 rounded-2xl text-white font-bold text-left transition-all border border-white/5"
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

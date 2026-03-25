import { useState, useEffect, useRef, useCallback } from "react";
import {
  Heart, MessageCircle, Share2, Bookmark, MoreVertical,
  Play, Pause, Volume2, VolumeX, Flag, X, Send,
  ChevronUp, ChevronDown, Loader2, TrendingUp, Clock, Hash,
  UserPlus, UserCheck, Zap, Activity, Signal
} from "lucide-react";
import { videoService, VideoPost, VideoComment } from "../services/videoService";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { Link } from "react-router";

const VIDEO_CATEGORIES = ["all", "Breaking", "Politics", "Sports", "Tech", "Local"];

export function ReelsPage() {
  const { user, userData } = useAuth();
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    const unsub = videoService.subscribeToVideos((vids) => {
      setVideos(vids);
      setLoading(false);
    }, activeCategory === "all" ? undefined : activeCategory);
    return () => unsub();
  }, [activeCategory]);

  const scrollTo = (idx: number) => {
    const el = containerRef.current?.children[idx] as HTMLElement;
    el?.scrollIntoView({ behavior: "smooth" });
    setActiveIndex(idx);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-8">
           <div className="size-20 bg-lakhara rounded-[2rem] flex items-center justify-center shadow-lakhara rotate-[-12deg] animate-pulse">
              <Activity className="size-10 text-white" />
           </div>
           <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-black h-screen overflow-hidden">
      {/* ── Premium Top Overlay ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col gap-6 p-8 bg-gradient-to-b from-black/90 via-black/40 to-transparent">
        <div className="flex items-center justify-between">
           <Link to="/" className="flex items-center gap-3">
              <div className="size-10 bg-lakhara rounded-xl flex items-center justify-center shadow-lakhara rotate-[-5deg]">
                <span className="text-white font-black italic">L</span>
              </div>
              <h1 className="text-white font-black text-2xl italic tracking-tighter">REELS <span className="text-primary italic">HQ</span></h1>
           </Link>
           <div className="flex items-center gap-3 bg-white/10 backdrop-blur-2xl px-6 py-2.5 rounded-full border border-white/10">
              <div className="size-2 bg-red-600 rounded-full animate-ping"></div>
              <span className="text-white text-[9px] font-black uppercase tracking-[0.3em]">Operational Live Feed</span>
           </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
           {VIDEO_CATEGORIES.map(cat => (
             <button 
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-primary text-white shadow-lakhara' : 'bg-white/10 text-gray-400 hover:text-white'}`}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      {/* ── Main Vertical Feed ── */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        style={{ scrollSnapType: "y mandatory" }}
        onScroll={(e) => {
          const el = e.currentTarget;
          const idx = Math.round(el.scrollTop / el.clientHeight);
          if (idx !== activeIndex) setActiveIndex(idx);
        }}
      >
        {videos.map((video, idx) => (
          <VideoCard
            key={video.id || idx}
            video={video}
            isActive={idx === activeIndex}
            user={user}
            userData={userData}
          />
        ))}
        
        {videos.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-6 p-12 text-center">
             <div className="size-32 bg-white/5 rounded-[3rem] flex items-center justify-center border border-white/10 opacity-20">
                <Signal className="size-16 text-white" />
             </div>
             <p className="text-white font-black text-2xl italic uppercase tracking-widest opacity-30">No Intelligence Discovered</p>
          </div>
        )}
      </div>

      {/* Navigation Layer */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
         <button onClick={() => scrollTo(activeIndex - 1)} className="size-12 bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-primary transition-all active:scale-90">
            <ChevronUp className="size-6" />
         </button>
         <button onClick={() => scrollTo(activeIndex + 1)} className="size-12 bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-primary transition-all active:scale-90">
            <ChevronDown className="size-6" />
         </button>
      </div>
    </div>
  );
}

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

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isActive) {
      vid.play().then(() => setIsPlaying(true)).catch(() => {});
      videoService.incrementView(video.id!).catch(() => {});
    } else {
      vid.pause();
      vid.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActive]);

  const handleLike = async () => {
    if (!user) { toast.error("ACCESS DENIED: Please Log In"); return; }
    const res = await videoService.toggleLike(video.id!, user.uid, video.authorId, userData?.name || "Agent", video.title);
    setLiked(res);
    setLikesCount(prev => res ? prev + 1 : prev - 1);
  };

  return (
    <div className="relative w-full h-full flex-shrink-0 bg-black snap-start overflow-hidden">
      <video
        ref={videoRef}
        src={video.videoUrl}
        loop
        muted={isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onClick={() => setIsPlaying(!isPlaying)}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />

      {/* ── Social Action Bar ── */}
      <div className="absolute right-6 bottom-32 flex flex-col items-center gap-10 z-30">
        <button onClick={() => setIsMuted(!isMuted)} className="size-14 bg-white/10 backdrop-blur-3xl rounded-[1.5rem] flex items-center justify-center text-white border border-white/20 active:scale-90 transition-all">
           {isMuted ? <VolumeX className="size-6" /> : <Volume2 className="size-6" />}
        </button>

        <div className="flex flex-col items-center gap-3">
           <button onClick={handleLike} className={`size-16 rounded-[1.8rem] flex items-center justify-center transition-all active:scale-90 border-2 ${liked ? 'bg-primary border-primary shadow-lakhara' : 'bg-white/10 border-white/20 text-white'}`}>
              <Heart className={`size-8 ${liked ? 'fill-current' : ''}`} />
           </button>
           <span className="text-white font-black text-[10px] uppercase tracking-widest">{likesCount}</span>
        </div>

        <div className="flex flex-col items-center gap-3">
           <button className="size-16 bg-white/10 backdrop-blur-3xl rounded-[1.8rem] flex items-center justify-center text-white border-2 border-white/20 active:scale-90 transition-all">
              <MessageCircle className="size-8" />
           </button>
           <span className="text-white font-black text-[10px] uppercase tracking-widest">{video.commentsCount || 0}</span>
        </div>

        <div className="flex flex-col items-center gap-3">
           <button className="size-16 bg-white/10 backdrop-blur-3xl rounded-[1.8rem] flex items-center justify-center text-white border-2 border-white/20 active:scale-90 transition-all">
              <Share2 className="size-8" />
           </button>
           <span className="text-white font-black text-[10px] uppercase tracking-widest">{video.shares || 0}</span>
        </div>
      </div>

      {/* ── Metadata Intelligence ── */}
      <div className="absolute bottom-12 left-8 right-24 z-30 space-y-6">
         <div className="flex items-center gap-5">
            <div className="size-14 rounded-2xl p-0.5 bg-lakhara shadow-lakhara rotate-[-10deg]">
               {video.authorPhotoURL ? (
                 <img src={video.authorPhotoURL} alt="" className="size-full rounded-[0.9rem] object-cover" />
               ) : (
                 <div className="size-full bg-black rounded-[0.9rem] flex items-center justify-center text-white font-black">{video.authorName?.[0]}</div>
               )}
            </div>
            <div>
               <h4 className="text-white font-black text-lg italic tracking-tighter leading-none">{video.authorName}</h4>
               <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Verification Verified</p>
            </div>
            <button className="bg-white text-black px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Follow</button>
         </div>

         <div className="space-y-3">
            <h3 className="text-2xl font-black text-white italic tracking-tighter leading-tight line-clamp-2">{video.title}</h3>
            <p className="text-gray-400 text-sm font-medium line-clamp-2 italic">{video.caption}</p>
         </div>

         <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {video.hashtags?.map(tag => (
              <span key={tag} className="text-primary font-black text-[10px] uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full">#{tag}</span>
            ))}
         </div>
      </div>

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="size-32 bg-white/20 backdrop-blur-3xl rounded-full flex items-center justify-center opacity-60">
              <Play className="size-16 text-white fill-current" />
           </div>
        </div>
      )}
    </div>
  );
}

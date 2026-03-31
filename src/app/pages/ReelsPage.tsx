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
    el?.scrollIntoView({ behavior: "auto" });
    setActiveIndex(idx);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-8">
           <div className="size-24 bg-primary text-white flex items-center justify-center border-4 border-gray-950">
              <Zap className="size-12" />
           </div>
           <Loader2 className="size-10 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-black h-screen overflow-hidden">
      
      {/* ── TOP OVERLAY ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col gap-6 p-8 bg-black/80 border-b-4 border-primary">
        <div className="flex items-center justify-between">
           <Link to="/" className="flex flex-col">
              <h1 className="text-white font-black text-3xl tracking-tighter uppercase italic leading-none">LAKHARA <span className="text-primary italic">REELS</span></h1>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1 italic">Short Digital Intelligence</p>
           </Link>
           <div className="flex items-center gap-3 bg-gray-900 px-6 py-3 border-2 border-white/10">
              <Signal className="size-4 text-primary" />
              <span className="text-white text-[10px] font-black uppercase tracking-widest">RAW LIVE FEED</span>
           </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
           {VIDEO_CATEGORIES.map(cat => (
             <button 
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-8 py-3 font-black uppercase tracking-widest text-[10px] border-2 transition-colors ${activeCategory === cat ? 'bg-primary border-primary text-white' : 'bg-gray-900 border-white/5 text-gray-500 hover:text-white'}`}
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
          <div className="h-full flex flex-col items-center justify-center gap-8 p-12 text-center bg-gray-950">
             <div className="size-32 bg-gray-900 flex items-center justify-center border-4 border-dashed border-white/10">
                <Signal className="size-16 text-white opacity-20" />
             </div>
             <p className="text-white font-black text-2xl uppercase tracking-widest opacity-30 italic">No Content Available</p>
          </div>
        )}
      </div>

      {/* Navigation Layer */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2">
         <button onClick={() => scrollTo(activeIndex - 1)} className="size-14 bg-gray-900 border-2 border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-colors">
            <ChevronUp className="size-8" />
         </button>
         <button onClick={() => scrollTo(activeIndex + 1)} className="size-14 bg-gray-900 border-2 border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-colors">
            <ChevronDown className="size-8" />
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
    if (!user) { toast.error("LOGIN REQUIRED"); return; }
    const res = await videoService.toggleLike(video.id!, user.uid, video.authorId, userData?.name || "Member", video.title);
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

      <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />

      {/* ── ACTION BAR ── */}
      <div className="absolute right-6 bottom-32 flex flex-col items-center gap-8 z-30">
        <button onClick={() => setIsMuted(!isMuted)} className="size-16 bg-gray-950 font-black border-2 border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-colors">
           {isMuted ? <VolumeX className="size-8" /> : <Volume2 className="size-8" />}
        </button>

        <div className="flex flex-col items-center gap-3">
           <button onClick={handleLike} className={`size-20 border-4 flex items-center justify-center transition-colors ${liked ? 'bg-primary border-primary text-white shadow-bhagva-flat' : 'bg-gray-950 border-white/20 text-white'}`}>
              <Heart className={`size-10 ${liked ? 'fill-current text-white' : 'text-primary'}`} />
           </button>
           <span className="text-white font-black text-[12px] uppercase tracking-widest">{likesCount}</span>
        </div>

        <div className="flex flex-col items-center gap-3">
           <button className="size-16 bg-gray-950 border-2 border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors">
              <MessageCircle className="size-8" />
           </button>
           <span className="text-white font-black text-[12px] uppercase tracking-widest">{video.commentsCount || 0}</span>
        </div>

        <div className="flex flex-col items-center gap-3">
           <button className="size-16 bg-gray-950 border-2 border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors">
              <Share2 className="size-8" />
           </button>
           <span className="text-white font-black text-[12px] uppercase tracking-widest">{video.shares || 0}</span>
        </div>
      </div>

      {/* ── METADATA ── */}
      <div className="absolute bottom-12 left-10 right-24 z-30 space-y-8">
         <div className="flex items-center gap-6">
            <div className="size-16 border-4 border-primary bg-gray-950 p-1">
               {video.authorPhotoURL ? (
                 <img src={video.authorPhotoURL} alt="" className="size-full object-cover" />
               ) : (
                 <div className="size-full flex items-center justify-center text-white font-black text-2xl">{video.authorName?.[0]}</div>
               )}
            </div>
            <div>
               <h4 className="text-white font-black text-xl italic tracking-tighter leading-none flex items-center gap-3">
                  {video.authorName}
                  <Zap className="size-4 text-primary fill-current" />
               </h4>
               <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2 italic">VERIFIED MEMBER</p>
            </div>
            <button className="ml-4 bg-primary text-white px-8 py-3 font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-primary transition-colors border-none outline-none">SUBSCRIBE</button>
         </div>

         <div className="space-y-4">
            <h3 className="text-3xl font-black text-white italic tracking-tighter leading-tight uppercase border-l-8 border-primary pl-6">{video.title}</h3>
            <p className="text-gray-400 text-lg uppercase font-black tracking-widest italic line-clamp-3 leading-relaxed">{video.caption}</p>
         </div>

         <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {video.hashtags?.map(tag => (
              <span key={tag} className="text-white font-black text-[10px] uppercase tracking-widest bg-primary px-6 py-2">#{tag}</span>
            ))}
         </div>
      </div>

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="size-32 bg-primary/20 flex items-center justify-center border-4 border-primary">
              <Play className="size-20 text-white fill-current" />
           </div>
        </div>
      )}
    </div>
  );
}

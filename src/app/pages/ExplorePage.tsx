import { useState, useEffect } from "react";
import {
  TrendingUp, Search, Filter, Play, Eye, Heart, Clock,
  Hash, Flame, Sparkles, Loader2, ChevronRight, Film, Zap
} from "lucide-react";
import { videoService, VideoPost } from "../services/videoService";
import { useNavigate } from "react-router";

const CATEGORIES = [
  { label: "All Network", value: "all", emoji: "🌐" },
  { label: "Politics", value: "राजनीति", emoji: "🏛️" },
  { label: "Sports", value: "खेल", emoji: "⚽" },
  { label: "Entertainment", value: "मनोरंजन", emoji: "🎭" },
  { label: "Business", value: "व्यापार", emoji: "💼" },
  { label: "Tech", value: "तकनीक", emoji: "💻" },
  { label: "Health", value: "स्वास्थ्य", emoji: "🏥" },
  { label: "Education", value: "शिक्षा", emoji: "📚" },
];

export function ExplorePage() {
  const navigate = useNavigate();
  const [trendingVideos, setTrendingVideos] = useState<VideoPost[]>([]);
  const [latestVideos, setLatestVideos] = useState<VideoPost[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"trending" | "latest">("trending");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [trending, latest] = await Promise.all([
          videoService.getTrendingVideos(12),
          videoService.getVideos(20),
        ]);
        setTrendingVideos(trending);
        setLatestVideos(latest);
        setFilteredVideos(trending);
      } catch { }
      finally { setLoading(false); }
    };
    loadData();
  }, []);

  useEffect(() => {
    let base = activeTab === "trending" ? trendingVideos : latestVideos;
    if (selectedCategory !== "all") {
      base = base.filter((v) => v.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      base = base.filter((v) =>
        v.title.toLowerCase().includes(q) ||
        v.caption.toLowerCase().includes(q) ||
        v.hashtags?.some((h) => h.toLowerCase().includes(q))
      );
    }
    setFilteredVideos(base);
  }, [activeTab, selectedCategory, searchQuery, trendingVideos, latestVideos]);

  const openReels = (videoIndex: number) => {
    navigate("/reels");
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-32">
      <div className="container mx-auto px-6 py-10 max-w-5xl space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-gray-950 italic tracking-tighter uppercase leading-none">
              EXPLORE <span className="text-gradient">NETWORK</span>
            </h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">Global Digital Feed Optimization</p>
          </div>
          
          <div className="flex bg-gray-100 p-1.5 rounded-[2rem] border border-gray-200 shadow-sm self-start">
             <button
               onClick={() => setActiveTab("trending")}
               className={`flex items-center gap-2 px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "trending" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
             >
               <Flame className="size-4" /> TRENDING
             </button>
             <button
               onClick={() => setActiveTab("latest")}
               className={`flex items-center gap-2 px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "latest" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
             >
               <Sparkles className="size-4" /> LATEST
             </button>
          </div>
        </div>

        {/* Search & Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
             <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-6 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search visual operations, protocols, hashtags..."
                  className="w-full bg-white border-2 border-gray-100 focus:border-primary/20 rounded-[2.5rem] pl-16 pr-8 py-6 font-bold outline-none transition-all text-lg shadow-sm focus:shadow-xl"
                />
             </div>
          </div>
          
          <div className="bg-lakhara rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-white shadow-lakhara">
             <div className="text-3xl font-black italic">{formatCount(trendingVideos.reduce((acc, v) => acc + (v.views || 0), 0))}</div>
             <div className="text-[9px] font-black uppercase tracking-[0.3em] opacity-80">Total Impact</div>
          </div>
        </div>

        {/* Categories Pipeline */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${selectedCategory === cat.value ? "bg-gray-950 text-white border-gray-950" : "bg-white text-gray-500 border-gray-100 hover:border-primary/20"}`}
            >
              <span className="text-base grayscale group-hover:grayscale-0">{cat.emoji}</span> 
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Content Stream */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="size-16 bg-gray-100 rounded-[1.5rem] flex items-center justify-center animate-pulse">
                <Zap className="size-8 text-primary fill-current" />
             </div>
             <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="bg-white rounded-[4rem] border border-dashed border-gray-200 py-32 flex flex-col items-center justify-center text-center gap-6">
             <div className="size-24 bg-gray-50 rounded-[3rem] flex items-center justify-center text-gray-200">
                <Film className="size-12" />
             </div>
             <div>
                <h3 className="text-2xl font-black text-gray-900 italic tracking-tighter uppercase mb-2">No Operations Found</h3>
                <p className="text-gray-400 font-bold text-sm tracking-wide">Adjust your network filters or search parameters</p>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVideos.map((video, idx) => (
              <ExploreVideoCard
                key={video.id}
                video={video}
                rank={activeTab === "trending" ? idx + 1 : undefined}
                onClick={() => openReels(idx)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ExploreVideoCard({ video, rank, onClick }: {
  video: VideoPost;
  rank?: number;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-[3rem] overflow-hidden bg-gray-900 cursor-pointer shadow-lg hover:shadow-[0_30px_60px_-15px_rgba(255,49,49,0.3)] transition-all duration-500 active:scale-95 aspect-[9/16] border border-white/5"
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="absolute inset-0 size-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

      {rank && rank <= 3 && (
        <div className="absolute top-6 left-6 size-10 rounded-2xl bg-lakhara flex items-center justify-center text-white shadow-lakhara border border-white/20 z-10">
           <span className="font-black italic text-lg">{rank}</span>
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
        <div className="size-20 bg-primary/95 text-white rounded-full flex items-center justify-center shadow-lakhara">
          <Play className="size-8 fill-current ml-1" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
        <h3 className="text-white font-black text-lg line-clamp-2 leading-tight italic tracking-tighter transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {video.title}
        </h3>
        <div className="flex items-center justify-between transform opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
          <div className="flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest">
            <Eye className="size-4 text-primary" />
            <span>{formatCount(video.views)}</span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest">
            <Heart className="size-4 text-primary fill-primary" />
            <span>{formatCount(video.likes)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatCount(n: number): string {
  if (!n) return "0";
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

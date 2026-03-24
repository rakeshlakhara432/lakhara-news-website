import { useState, useEffect } from "react";
import {
  TrendingUp, Search, Filter, Play, Eye, Heart, Clock,
  Hash, Flame, Sparkles, Loader2, ChevronRight, Film
} from "lucide-react";
import { videoService, VideoPost } from "../services/videoService";
import { useNavigate } from "react-router";

const CATEGORIES = [
  { label: "All", value: "all", emoji: "🎬" },
  { label: "राजनीति", value: "राजनीति", emoji: "🏛️" },
  { label: "खेल", value: "खेल", emoji: "⚽" },
  { label: "मनोरंजन", value: "मनोरंजन", emoji: "🎭" },
  { label: "व्यापार", value: "व्यापार", emoji: "💼" },
  { label: "तकनीक", value: "तकनीक", emoji: "💻" },
  { label: "स्वास्थ्य", value: "स्वास्थ्य", emoji: "🏥" },
  { label: "शिक्षा", value: "शिक्षा", emoji: "📚" },
];

export function ExplorePage() {
  const navigate = useNavigate();
  const [trendingVideos, setTrendingVideos] = useState<VideoPost[]>([]);
  const [latestVideos, setLatestVideos] = useState<VideoPost[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"trending" | "latest" | "category">("trending");

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
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-2 mb-1">
          <Search className="size-8 text-red-600" /> Explore
        </h1>
        <p className="text-gray-500 font-medium">Trending & Latest Videos खोजें</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Videos, hashtags खोजें..."
          className="w-full bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl pl-12 pr-4 py-4 font-bold outline-none transition-all text-gray-900"
        />
      </div>

      {/* Feed Type Tabs */}
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => setActiveTab("trending")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-black transition-all ${activeTab === "trending" ? "bg-red-600 text-white shadow-lg shadow-red-100" : "bg-gray-100 text-gray-600"}`}
        >
          <Flame className="size-4" /> Trending
        </button>
        <button
          onClick={() => setActiveTab("latest")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-black transition-all ${activeTab === "latest" ? "bg-red-600 text-white shadow-lg shadow-red-100" : "bg-gray-100 text-gray-600"}`}
        >
          <Sparkles className="size-4" /> Latest
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-black transition-all ${selectedCategory === cat.value ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            <span>{cat.emoji}</span> {cat.label}
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-red-50 rounded-2xl p-4 text-center border border-red-100">
          <p className="text-2xl font-black text-red-600">{trendingVideos.length}</p>
          <p className="text-xs font-bold text-red-400 uppercase tracking-wider">Trending</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4 text-center border border-blue-100">
          <p className="text-2xl font-black text-blue-600">{latestVideos.length}</p>
          <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">Latest</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 text-center border border-green-100">
          <p className="text-2xl font-black text-green-600">
            {trendingVideos.reduce((acc, v) => acc + (v.views || 0), 0).toLocaleString("hi-IN")}
          </p>
          <p className="text-xs font-bold text-green-400 uppercase tracking-wider">Total Views</p>
        </div>
      </div>

      {/* Video Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-10 animate-spin text-red-600" />
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <Film className="size-16 text-gray-300" />
          <p className="text-gray-500 font-black text-lg">कोई video नहीं मिली</p>
          <p className="text-gray-400 font-medium text-sm">अलग category या search term try करें</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
      className="relative rounded-2xl overflow-hidden bg-black cursor-pointer group hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-xl aspect-[9/16]"
    >
      {/* Thumbnail */}
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Rank badge */}
      {rank && rank <= 3 && (
        <div className={`absolute top-2 left-2 size-7 rounded-full flex items-center justify-center text-sm font-black ${rank === 1 ? "bg-yellow-400 text-yellow-900" : rank === 2 ? "bg-gray-300 text-gray-700" : "bg-amber-600 text-white"}`}>
          {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
        </div>
      )}

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="size-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Play className="size-6 text-white fill-white" />
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white font-bold text-xs line-clamp-2 mb-2">{video.title}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-300 text-xs">
            <Eye className="size-3" />
            <span>{formatCount(video.views)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300 text-xs">
            <Heart className="size-3 fill-red-500 text-red-500" />
            <span>{formatCount(video.likes)}</span>
          </div>
        </div>

        {/* Category */}
        <div className="mt-1.5">
          <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full font-bold">
            {video.category}
          </span>
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

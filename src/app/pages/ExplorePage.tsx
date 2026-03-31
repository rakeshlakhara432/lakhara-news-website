import { useState, useEffect } from "react";
import {
  TrendingUp, Search, Filter, Play, Eye, Heart, Clock,
  Hash, Flame, Sparkles, Loader2, ChevronRight, Film, Zap, FileText, ArrowRight, X
} from "lucide-react";
import { videoService, VideoPost } from "../services/videoService";
import { newsService, Article } from "../services/newsService";
import { useNavigate, useSearchParams } from "react-router";
import { ArticleCard } from "../components/ArticleCard";

const CATEGORIES = [
  { label: "ऑल नेटवर्क", value: "all", emoji: "🌐" },
  { label: "राजनीति", value: "politics", emoji: "🏛️" },
  { label: "खेल", value: "sports", emoji: "⚽" },
  { label: "मनोरंजन", value: "entertainment", emoji: "🎭" },
  { label: "तकनीक", value: "tech", emoji: "💻" },
  { label: "व्यापार", value: "business", emoji: "💼" },
];

export function ExplorePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoPost[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [loading, setLoading] = useState(true);
  const [contentType, setContentType] = useState<"all" | "articles" | "videos">("all");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [arts, vids] = await Promise.all([
          newsService.getArticles(),
          videoService.getVideos(30),
        ]);
        setArticles(arts);
        setVideos(vids);
      } catch { }
      finally { setLoading(false); }
    };
    loadData();
  }, []);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    
    let a = articles;
    let v = videos;

    if (selectedCategory !== "all") {
      a = a.filter(item => item.category === selectedCategory);
      v = v.filter(item => item.category === selectedCategory);
    }

    if (q) {
      a = a.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.excerpt.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
      v = v.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.caption.toLowerCase().includes(q) ||
        item.hashtags?.some(h => h.toLowerCase().includes(q))
      );
    }

    setFilteredArticles(a);
    setFilteredVideos(v);
  }, [searchQuery, selectedCategory, articles, videos]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val) setSearchParams({ q: val });
    else setSearchParams({});
  };

  return (
    <div className="bg-white min-h-screen pb-40">
      <div className="container mx-auto px-6 py-12 max-w-7xl space-y-24">
        
        {/* ── BOLD EXPLORE HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b-8 border-primary pb-20">
           <div className="space-y-8">
              <div className="size-20 bg-gray-950 text-primary flex items-center justify-center border-4 border-primary shadow-bhagva-flat">
                 <Search className="size-10" />
              </div>
              <div className="space-y-4">
                 <h1 className="text-6xl md:text-8xl font-black text-gray-950 italic tracking-tighter uppercase leading-none border-l-[16px] border-primary pl-8">विषय <span className="text-primary italic">खोजें</span></h1>
                 <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.8em] ml-2 italic">LAKHARA DIGITAL INTELLIGENCE MATRIX</p>
              </div>
           </div>

           <div className="flex bg-gray-950 p-2 border-b-8 border-primary group">
             {(["all", "articles", "videos"] as const).map(t => (
               <button 
                 key={t}
                 onClick={() => setContentType(t)}
                 className={`px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all italic ${contentType === t ? 'bg-primary text-white' : 'text-gray-500 hover:text-white'}`}
               >
                 {t === "all" ? "सबकुछ" : t === "articles" ? "खबरें" : "वीडियो"}
               </button>
             ))}
           </div>
        </div>

        {/* ── COMMAND SEARCH BAR ── */}
        <div className="relative group">
           <Search className="absolute left-10 top-1/2 -translate-y-1/2 size-10 text-gray-200 group-focus-within:text-primary transition-colors" />
           <input 
             type="text" 
             value={searchQuery}
             onChange={e => handleSearchChange(e.target.value)}
             className="w-full bg-gray-50 border-8 border-gray-100 pl-24 pr-12 py-12 text-4xl md:text-6xl font-black text-gray-950 placeholder:text-gray-100 outline-none focus:border-primary transition-all italic tracking-tighter uppercase"
             placeholder="नेटवर्क पर खोजें..."
           />
           {searchQuery && (
             <button onClick={() => handleSearchChange("")} className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                <X className="size-10" />
             </button>
           )}
        </div>

        {/* ── CHANNEL SELECTOR GRID ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
           {CATEGORIES.map(cat => (
             <button 
               key={cat.value} 
               onClick={() => setSelectedCategory(cat.value)}
               className={`flex items-center gap-6 p-8 border-4 transition-all italic ${selectedCategory === cat.value ? 'bg-gray-950 border-primary text-white shadow-bhagva-flat' : 'bg-white border-gray-100 text-gray-400 hover:border-primary/30'}`}
             >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-[12px] font-black uppercase tracking-widest leading-none">{cat.label}</span>
             </button>
           ))}
        </div>

        {loading ? (
           <div className="flex flex-col items-center justify-center py-40 gap-12 bg-gray-50 border-8 border-dashed border-gray-100">
              <div className="size-32 bg-white border-4 border-gray-200 flex items-center justify-center relative">
                 <Loader2 className="size-16 text-primary animate-spin" />
                 <div className="absolute inset-0 border-4 border-primary/10 animate-ping"></div>
              </div>
              <div className="space-y-4 text-center">
                 <p className="text-2xl font-black text-gray-950 uppercase italic tracking-widest">सिस्टम सिंक जारी है</p>
                 <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.6em] italic">ESTABLISHING CONNECTION PROTOCOL</p>
              </div>
           </div>
        ) : (
           <div className="space-y-40">
              
              {/* ── INTELLIGENCE BRIEFINGS (Articles) ── */}
              {(contentType === "all" || contentType === "articles") && filteredArticles.length > 0 && (
                <div className="space-y-16">
                   <div className="flex items-center justify-between border-l-[16px] border-primary pl-8">
                      <div className="space-y-1">
                         <h2 className="text-4xl md:text-6xl font-black text-gray-950 italic tracking-tighter uppercase leading-none">खबर <span className="text-primary italic">डिटेल</span></h2>
                         <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.5em] italic">LATEST FIELD REPORTS</p>
                      </div>
                      <span className="bg-gray-950 text-white px-8 py-4 font-black text-[12px] uppercase tracking-[0.4em] italic">{filteredArticles.length} परिणाम</span>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredArticles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                   </div>
                </div>
              )}

              {/* ── VISUAL OPERATIONS (Videos) ── */}
              {(contentType === "all" || contentType === "videos") && filteredVideos.length > 0 && (
                <div className="space-y-16">
                   <div className="flex items-center justify-between border-l-[16px] border-gray-950 pl-8">
                      <div className="space-y-1">
                         <h2 className="text-4xl md:text-6xl font-black text-gray-950 italic tracking-tighter uppercase leading-none">वीडियो <span className="text-primary italic">प्रसार</span></h2>
                         <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.5em] italic">REAL-TIME VISUAL DATA</p>
                      </div>
                      <span className="bg-primary text-white px-8 py-4 font-black text-[12px] uppercase tracking-[0.4em] italic">{filteredVideos.length} परिणाम</span>
                   </div>
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {filteredVideos.map(video => (
                        <div key={video.id} onClick={() => navigate("/reels")} className="group relative aspect-[9/16] overflow-hidden bg-black cursor-pointer group border-4 border-gray-100 hover:border-primary transition-all shadow-xl">
                           <img src={video.thumbnailUrl} className="size-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                           <div className="absolute inset-0 bg-black/40 opacity-60 group-hover:opacity-0 transition-opacity"></div>
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="size-20 bg-primary flex items-center justify-center text-white shadow-bhagva-flat border-4 border-white">
                                 <Play className="size-10 fill-current translate-x-1" />
                              </div>
                           </div>
                           <div className="absolute top-4 right-4 bg-gray-950 text-white px-3 py-1 font-black text-[10px] uppercase italic border border-white/20">
                              REEL
                           </div>
                           <div className="absolute bottom-6 left-6 right-6">
                              <p className="text-white font-black text-[12px] italic tracking-tighter line-clamp-2 leading-tight uppercase bg-gray-950/80 p-3 border-l-4 border-primary">{video.title}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {/* ── EMPTY STATE MATRIX ── */}
              {filteredArticles.length === 0 && filteredVideos.length === 0 && (
                 <div className="py-40 flex flex-col items-center justify-center text-center gap-12 bg-gray-50 border-8 border-dashed border-gray-100">
                    <div className="size-40 bg-white border-8 border-gray-100 flex items-center justify-center text-gray-200 shadow-2xl">
                       <Zap className="size-20" />
                    </div>
                    <div className="space-y-6">
                       <h2 className="text-5xl md:text-7xl font-black text-gray-950 italic tracking-tighter uppercase mb-4 leading-none border-b-8 border-primary inline-block pb-4">निरंक <span className="text-primary italic">डाटा</span></h2>
                       <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.8em] italic">NO NETWORK ACTIVITY MATCHES YOUR SCAN PROTOCOL</p>
                    </div>
                    <button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }} className="px-20 py-8 bg-primary text-white font-black text-xl uppercase tracking-[0.5em] hover:bg-gray-950 transition-colors border-none outline-none italic shadow-bhagva-flat">RESET ALL SCANS</button>
                 </div>
              )}

           </div>
        )}

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

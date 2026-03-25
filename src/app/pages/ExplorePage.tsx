import { useState, useEffect } from "react";
import {
  TrendingUp, Search, Filter, Play, Eye, Heart, Clock,
  Hash, Flame, Sparkles, Loader2, ChevronRight, Film, Zap, FileText, ArrowRight
} from "lucide-react";
import { videoService, VideoPost } from "../services/videoService";
import { newsService, Article } from "../services/newsService";
import { useNavigate, useSearchParams } from "react-router";
import { ArticleCard } from "../components/ArticleCard";

const CATEGORIES = [
  { label: "All Network", value: "all", emoji: "🌐" },
  { label: "Politics", value: "politics", emoji: "🏛️" },
  { label: "Sports", value: "sports", emoji: "⚽" },
  { label: "Entertainment", value: "entertainment", emoji: "🎭" },
  { label: "Tech", value: "tech", emoji: "💻" },
  { label: "Business", value: "business", emoji: "💼" },
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
    <div className="bg-[#fcfcfc] dark:bg-gray-950 min-h-screen pb-32">
      <div className="container mx-auto px-6 py-10 max-w-6xl space-y-16">
        
        {/* ── Mission Search Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
           <div className="space-y-4">
              <div className="size-16 bg-lakhara rounded-[1.5rem] flex items-center justify-center shadow-lakhara rotate-[-10deg]">
                 <Search className="size-8 text-white" />
              </div>
              <h1 className="text-6xl font-black text-gray-950 dark:text-white italic tracking-tighter uppercase leading-none">
                 LAKHARA <span className="text-gradient">EXPLORE</span>
              </h1>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.8em]">Network Intelligence Discovery</p>
           </div>

           <div className="flex bg-gray-100 dark:bg-white/5 p-1.5 rounded-[2rem] border border-gray-200 dark:border-white/5 shadow-sm self-start">
             {(["all", "articles", "videos"] as const).map(t => (
               <button 
                 key={t}
                 onClick={() => setContentType(t)}
                 className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${contentType === t ? 'bg-white dark:bg-lakhara text-primary dark:text-white shadow-sm' : 'text-gray-400 hover:text-gray-900 group'}`}
               >
                 {t}
               </button>
             ))}
           </div>
        </div>

        {/* ── Search Command Bar ── */}
        <div className="relative group">
           <div className="absolute inset-x-0 bottom-0 h-1 bg-primary/20 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700 origin-left"></div>
           <Search className="absolute left-8 top-1/2 -translate-y-1/2 size-8 text-gray-300 group-focus-within:text-primary transition-colors" />
           <input 
             type="text" 
             value={searchQuery}
             onChange={e => handleSearchChange(e.target.value)}
             className="w-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[3rem] pl-20 pr-10 py-10 text-3xl font-black text-gray-950 dark:text-white placeholder:text-gray-200 dark:placeholder:text-gray-800 outline-none focus:shadow-3xl transition-all italic tracking-tighter"
             placeholder="Search the network pulse..."
           />
        </div>

        {/* ── Channel Selector ── */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 -mx-6 px-6">
           {CATEGORIES.map(cat => (
             <button 
               key={cat.value} 
               onClick={() => setSelectedCategory(cat.value)}
               className={`flex-shrink-0 flex items-center gap-4 px-10 py-5 rounded-[2rem] border-2 transition-all active:scale-95 ${selectedCategory === cat.value ? 'bg-gray-950 border-gray-950 text-white shadow-2xl' : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/5 text-gray-400 hover:border-primary/20'}`}
             >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-[11px] font-black uppercase tracking-widest">{cat.label}</span>
             </button>
           ))}
        </div>

        {loading ? (
           <div className="flex flex-col items-center justify-center py-40 gap-10">
              <div className="size-24 bg-gray-50 dark:bg-white/5 rounded-[3rem] flex items-center justify-center animate-pulse">
                 <Loader2 className="size-12 text-primary animate-spin" />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[1em] ml-[1em]">Establishing Connection</p>
           </div>
        ) : (
           <div className="space-y-40">
              
              {/* ── Articles Feed ── */}
              {(contentType === "all" || contentType === "articles") && filteredArticles.length > 0 && (
                <div className="space-y-16">
                   <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-10">
                      <div className="flex items-center gap-6">
                         <div className="size-12 bg-lakhara/10 text-primary rounded-xl flex items-center justify-center">
                            <FileText className="size-6" />
                         </div>
                         <h2 className="text-4xl font-black text-gray-950 dark:text-white italic tracking-tighter uppercase">Intelligence Briefings</h2>
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{filteredArticles.length} Results</span>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                      {filteredArticles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                   </div>
                </div>
              )}

              {/* ── Reels Feed ── */}
              {(contentType === "all" || contentType === "videos") && filteredVideos.length > 0 && (
                <div className="space-y-16">
                   <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-10">
                      <div className="flex items-center gap-6">
                         <div className="size-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                            <Film className="size-6" />
                         </div>
                         <h2 className="text-4xl font-black text-gray-950 dark:text-white italic tracking-tighter uppercase">Visual Operations</h2>
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{filteredVideos.length} Results</span>
                   </div>
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                      {filteredVideos.map(video => (
                        <div key={video.id} onClick={() => navigate("/reels")} className="group relative aspect-[9/16] rounded-[2.5rem] overflow-hidden bg-black cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500">
                           <img src={video.thumbnailUrl} className="size-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.3] group-hover:grayscale-0" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all">
                              <div className="size-16 bg-primary rounded-full flex items-center justify-center text-white shadow-lakhara">
                                 <Play className="size-8 fill-current translate-x-1" />
                              </div>
                           </div>
                           <div className="absolute bottom-6 left-6 right-6">
                              <p className="text-white font-black text-xs italic tracking-tighter line-clamp-2 leading-tight group-hover:text-primary transition-colors">{video.title}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {/* ── Empty State ── */}
              {filteredArticles.length === 0 && filteredVideos.length === 0 && (
                 <div className="py-40 flex flex-col items-center justify-center text-center gap-10">
                    <div className="size-32 bg-gray-50 dark:bg-white/5 rounded-[4rem] flex items-center justify-center text-gray-200">
                       <Zap className="size-16" />
                    </div>
                    <div>
                       <h2 className="text-4xl font-black text-gray-950 dark:text-white italic tracking-tighter uppercase mb-4 leading-none">Intelligence Nullified</h2>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">No network activity matches your scan</p>
                    </div>
                    <button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }} className="btn-lakhara !rounded-[2rem] !px-12 !py-6">RESET ALL SCANS</button>
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

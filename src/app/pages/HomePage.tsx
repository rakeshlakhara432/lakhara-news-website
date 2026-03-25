import { useState, useEffect, useRef, useCallback } from "react";
import { categories, getYouTubeSettings } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { BreakingNews } from "../components/BreakingNews";
import { Newsletter } from "../components/Newsletter";
import { TrendingUp, Loader2, Play, ChevronRight, Zap, Tv, Eye, Sparkles, Flame, ArrowRight, Signal, Globe, Radio, ShieldCheck, Activity, Landmark, Newspaper, Calendar, Menu, Search, User } from "lucide-react";
import { Link } from "react-router";
import { newsService, Article } from "../services/newsService";

export function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [displayCount, setDisplayCount] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("SABHI");

  useEffect(() => {
    const unsubscribe = newsService.subscribeToArticles((data) => {
      setArticles(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
         <Loader2 className="size-10 animate-spin text-primary" />
         <p className="font-bold text-gray-500 uppercase tracking-widest text-xs">Lakhara News Lod ho raha hai...</p>
      </div>
    );
  }
  
  const breakingNews = articles.filter((a) => a.isBreaking);
  const filteredArticles = activeCategory === "SABHI" 
    ? articles 
    : articles.filter(a => a.category.toUpperCase() === activeCategory);

  const mainArticle = filteredArticles[0];
  const sideArticles = filteredArticles.slice(1, 6);
  const feedArticles = filteredArticles.slice(6, displayCount);

  return (
    <div className="bg-background min-h-screen font-sans text-gray-900">
      
      {/* ── SIMPLE HEADER ── */}
      <header className="bg-white border-b-2 border-primary py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="text-center md:text-left flex items-center gap-4">
            <div className="size-16 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
               <Newspaper className="size-10" />
            </div>
            <div>
               <h1 className="text-4xl font-black text-primary tracking-tight md:mb-0 uppercase italic">Lakhara <span className="text-black">Digital News</span></h1>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Samaj Ka Sabse Tej Samachar Portal</p>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-gray-500 uppercase tracking-widest">
               <div className="flex items-center gap-2"><Calendar className="size-4" /> {new Date().toLocaleDateString("hi-IN")}</div>
               <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
               <div>Sthapan: 2024</div>
            </div>
            <button className="p-3 bg-gray-100 rounded-lg hover:bg-primary hover:text-white transition-colors">
               <Search className="size-5" />
            </button>
            <Link to="/admin" className="p-3 bg-gray-100 rounded-lg hover:bg-primary hover:text-white transition-colors">
               <User className="size-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── NAVIGATION ── */}
      <nav className="bg-gray-100 py-3 sticky top-0 z-[100] border-b border-gray-200">
        <div className="container mx-auto px-4 flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth">
          <button 
             onClick={() => setActiveCategory("SABHI")}
             className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${activeCategory === "SABHI" ? "bg-primary text-white shadow" : "text-gray-500 hover:text-primary"}`}
          >
             SABHI
          </button>
          {categories.slice(0, 8).map(cat => (
             <button 
               key={cat.id}
               onClick={() => setActiveCategory(cat.slug.toUpperCase())}
               className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat.slug.toUpperCase() ? "bg-primary text-white shadow" : "text-gray-500 hover:text-primary"}`}
             >
                {cat.name.toUpperCase()}
             </button>
          ))}
        </div>
      </nav>

      {/* ── TAZA KHABAR TICKER ── */}
      <div className="bg-black text-white py-3">
        <div className="container mx-auto px-4 flex items-center gap-6">
           <div className="flex-shrink-0 bg-primary px-3 py-1 rounded text-[10px] font-bold">TAZA KHABAR</div>
           <BreakingNews items={breakingNews.map(a => ({ title: a.title, slug: a.slug }))} />
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container mx-auto px-4 py-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Mukhya Samachar (Main) */}
          <main className="lg:col-span-8 space-y-8">
            {mainArticle && (
              <Link to={`/article/${mainArticle.slug}`} className="group block space-y-4">
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-200 shadow-md">
                   <img src={mainArticle.imageUrl} alt="" className="size-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="space-y-4">
                   <div className="flex items-center gap-4">
                      <span className="badge-news">{mainArticle.category}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{mainArticle.author} • {new Date(mainArticle.createdAt as any).toLocaleDateString()}</span>
                   </div>
                   <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight group-hover:text-primary transition-colors">
                      {mainArticle.title}
                   </h2>
                   <p className="text-gray-600 text-lg leading-relaxed line-clamp-3">
                      {mainArticle.excerpt}
                   </p>
                   <button className="btn-simple">Puri Khabar Padhe</button>
                </div>
              </Link>
            )}
          </main>

          {/* Anya Khabrain (Side) */}
          <aside className="lg:col-span-4 space-y-8">
            <h3 className="text-xl font-black border-b-2 border-primary pb-2 flex items-center gap-3">
               <TrendingUp className="size-5 text-primary" /> LOKPRIYA SAMCHAR
            </h3>
            <div className="space-y-8">
               {sideArticles.map(article => (
                 <ArticleCard key={article.id} article={article} variant="small" />
               ))}
            </div>
            
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
               <h4 className="text-sm font-black text-primary mb-2 uppercase tracking-widest">Samajik Sandesh</h4>
               <p className="text-xs text-gray-600 leading-relaxed italic">
                  Lakhara Samaj ki unnati hi hamara prayas hai. Hamare saath judein aur khabrain sajha karein.
               </p>
            </div>
          </aside>
        </div>

        {/* ── LIVE TV SECTION ── */}
        <section className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 size-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/30 transition-all duration-700"></div>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6 text-center lg:text-left">
                 <div className="inline-flex items-center gap-2 bg-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">
                    <Tv className="size-4" /> LIVE PRAKASHAN
                 </div>
                 <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                    Lakhara Samaj <span className="text-primary italic">Live TV</span> Se Judain
                 </h2>
                 <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
                    Hamare samaj ke mukhya samachar aur events ab LIVE dekhain sidha apne ghar se.
                 </p>
                 <Link to="/live" className="btn-simple inline-flex items-center gap-4 bg-white text-primary hover:bg-primary hover:text-white">
                    LIVE STREAM SHURU KAREIN
                 </Link>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border-4 border-white/5">
                 <iframe
                    className="size-full"
                    src={`https://www.youtube.com/embed/${getYouTubeSettings().liveVideoId}?autoplay=0&mute=1&controls=1`}
                    title="Live Stream"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
              </div>
           </div>
        </section>

        {/* ── MORE NEWS ── */}
        <div className="newspaper-divider"></div>
        <div className="space-y-12">
           <h2 className="text-4xl font-black text-gray-900 border-l-8 border-primary pl-6 uppercase tracking-tighter">Sabhi Samachar</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {feedArticles.map(article => (
                 <ArticleCard key={article.id} article={article} />
              ))}
           </div>
        </div>

        {/* ── NEWSLETTER ── */}
        <section className="bg-gray-100 p-10 md:p-16 rounded-3xl text-center space-y-6">
           <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <Zap className="size-8" />
           </div>
           <h2 className="text-3xl font-black text-gray-900">Aaj Ki Khabar, Inbox Mein</h2>
           <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
              Dainik update prapt karne ke liye hamari Patrika ke sadasya banein. Yeh nishulk hai!
           </p>
           <Newsletter />
        </section>

      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 text-white pt-20 pb-10 border-t-8 border-primary">
         <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 text-center md:text-left">
            <div className="space-y-6">
               <h3 className="text-3xl font-black text-primary italic uppercase tracking-tighter">Lakhara News</h3>
               <p className="text-gray-400 text-sm leading-relaxed">
                  Lakhara Samaj ka sabse bada aur bharosemand digital samachar portal. Hamara uddeshya samaj ke har vyakti tak sacchi khabar pahuchana hai.
               </p>
            </div>
            <div className="space-y-6">
               <h4 className="text-lg font-black uppercase tracking-widest text-primary">Khabrain</h4>
               <ul className="space-y-4 text-gray-400 text-sm font-bold uppercase tracking-widest">
                  {categories.slice(0, 4).map(cat => (
                     <li key={cat.id}><Link to={`/category/${cat.slug}`} className="hover:text-primary transition-colors">{cat.name}</Link></li>
                  ))}
               </ul>
            </div>
            <div className="space-y-6">
               <h4 className="text-lg font-black uppercase tracking-widest text-primary">Sampark Karein</h4>
               <p className="text-gray-400 text-sm leading-relaxed">
                  Email: info@lakharanews.com<br/>
                  Phone: +91 9876543210<br/>
                  Address: Lakhara Bhawan, Udaipur, India
               </p>
            </div>
         </div>
         <div className="container mx-auto px-4 pt-10 border-t border-white/5 text-center space-y-4">
            <p className="text-gray-600 text-[10px] uppercase font-black tracking-[0.3em]">© 2024 Lakhara Digital News Portal. All Rights Reserved.</p>
            <p className="text-gray-800 text-[8px] uppercase tracking-widest">India's Leading Commmunity News Network</p>
         </div>
      </footer>
    </div>
  );
}
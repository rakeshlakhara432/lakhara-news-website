import { useState, useEffect, useRef, useCallback } from "react";
import { categories, getYouTubeSettings } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { BreakingNews } from "../components/BreakingNews";
import { Newsletter } from "../components/Newsletter";
import { TrendingUp, Loader2, Play, ChevronRight, Zap, Tv, Eye, Sparkles, Flame, ArrowRight, Signal, Globe, Radio, ShieldCheck, Activity, Landmark, Newspaper, Calendar } from "lucide-react";
import { Link } from "react-router";
import { newsService, Article } from "../services/newsService";
import { motion, AnimatePresence } from "framer-motion";

export function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = newsService.subscribeToArticles((data) => {
      setArticles(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && articles.length > displayCount) {
      setTimeout(() => {
        setDisplayCount(prev => prev + 5);
      }, 500);
    }
  }, [articles.length, displayCount]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "100px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (isLoading) {
    return (
      <div className="flex h-[90vh] items-center justify-center bg-paper relative overflow-hidden">
        <div className="grid-paper absolute inset-0 opacity-20"></div>
        <div className="flex flex-col items-center gap-8 relative z-10">
           <motion.div 
             animate={{ scale: [1, 1.05, 1] }}
             transition={{ duration: 3, repeat: Infinity }}
             className="size-24 bg-primary text-white rounded-full flex items-center justify-center shadow-lg"
           >
              <Landmark className="size-12" />
           </motion.div>
           <p className="font-serif-heritage text-xl text-secondary animate-pulse">Lakhara Digital News Prarambh Ho Raha Hai...</p>
        </div>
      </div>
    );
  }
  
  const breakingNews = articles.filter((a) => a.isBreaking);
  const trendingArticles = [...articles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);
    
  const featuredArticle = articles[0];
  const latestFeed = articles.slice(1, displayCount);

  const today = new Date().toLocaleDateString("hi-IN", { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="bg-paper min-h-screen selection:bg-primary/30">
      
      {/* ── TRADITIONAL NEWSPAPER HEADER ── */}
      <header className="border-b-4 border-secondary/20 py-10 bg-white">
         <div className="container mx-auto px-4 flex flex-col items-center gap-6">
            <div className="flex items-center gap-10 w-full justify-between border-b border-border pb-4 mb-4">
               <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-widest">
                  <Calendar className="size-4" />
                  {today}
               </div>
               <div className="hidden md:flex items-center gap-6 text-secondary font-bold text-xs uppercase tracking-widest">
                  <span>Sthapan: 2024</span>
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  <span>Lakhara Samaj Ki Awaz</span>
               </div>
            </div>
            
            <Link to="/" className="text-center group">
               <h1 className="text-5xl md:text-8xl font-serif-heritage font-black text-secondary tracking-tighter leading-none mb-2">
                 LAKHARA <span className="text-primary italic">DIGITAL</span> NEWS
               </h1>
               <div className="flex items-center justify-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-secondary/30"></div>
                  <p className="font-serif-heritage text-sm md:text-lg text-secondary/60 italic px-4 uppercase tracking-[0.3em]">Sabse Tej, Sabse Shuddh Samachar</p>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-secondary/30"></div>
               </div>
            </Link>
         </div>
      </header>

      {/* ── Breaking News Banner ── */}
      <div className="bg-secondary text-white py-4 sticky top-0 z-[100] shadow-md border-y border-white/10">
        <BreakingNews items={breakingNews.map((a) => ({ title: a.title, slug: a.slug }))} />
      </div>

      <div className="container mx-auto px-4 xl:px-0 space-y-32 pb-32 pt-12">
        
        {/* ── MAIN NEWS GARDEN ── */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            {/* Left Column: Side Feed */}
            <aside className="xl:col-span-3 space-y-12">
               <div className="bg-white p-8 rounded-2xl border border-secondary/10 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                  <h3 className="text-xl font-serif-heritage mb-6 flex items-center gap-3 text-secondary">
                     <TrendingUp className="size-5 text-primary" /> Lokpriya Samachar
                  </h3>
                  <div className="space-y-8">
                     {trendingArticles.map((article, idx) => (
                        <Link key={article.id} to={`/article/${article.slug}`} className="group block border-b border-border pb-6 last:border-0 last:pb-0">
                           <span className="text-primary font-black text-3xl opacity-20 group-hover:opacity-100 transition-opacity float-left mr-4 -mt-2">0{idx + 1}</span>
                           <h4 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors italic">
                              {article.title}
                           </h4>
                        </Link>
                     ))}
                  </div>
               </div>

               <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20">
                  <h3 className="text-lg font-serif-heritage mb-4 text-primary">Samajik Sandesh</h3>
                  <p className="text-xs text-secondary/70 italic leading-relaxed">
                     Lakhara Samaj ke sabhi bhaiyo aur behno ko digital platform se jodna hi hamara param lakshya hai.
                  </p>
               </div>
            </aside>

            {/* Middle: Featured Story */}
            <main className="xl:col-span-6 space-y-12">
               {featuredArticle && (
                 <Link to={`/article/${featuredArticle.slug}`} className="group block space-y-6">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-700">
                       <img 
                         src={featuredArticle.imageUrl} 
                         alt="" 
                         className="size-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-40"></div>
                       <div className="absolute top-6 left-6 badge-saffron bg-white border-0 shadow-lg">
                          Mukhya Samachar
                       </div>
                    </div>
                    <div className="text-center space-y-4 px-4">
                       <span className="text-primary font-black text-xs uppercase tracking-[0.4em]">{featuredArticle.category}</span>
                       <h2 className="text-4xl md:text-5xl font-serif-heritage font-black text-secondary leading-tight italic tracking-tighter group-hover:text-primary transition-colors">
                          {featuredArticle.title}
                       </h2>
                       <p className="text-secondary/60 text-lg leading-relaxed italic max-w-xl mx-auto line-clamp-2">
                          {featuredArticle.excerpt}
                       </p>
                       <div className="flex items-center justify-center gap-4 pt-4 text-xs font-bold text-secondary/40 uppercase tracking-widest">
                          <span>{featuredArticle.author}</span>
                          <span className="w-1 h-1 bg-border rounded-full"></span>
                          <span>Aaj Ki Khabar</span>
                       </div>
                    </div>
                 </Link>
               )}
            </main>

            {/* Right: Quick Feed */}
            <aside className="xl:col-span-3 space-y-12">
               <h3 className="text-xl font-serif-heritage border-b-2 border-primary pb-2 text-secondary">Taza Update</h3>
               <div className="space-y-10">
                  {articles.slice(1, 6).map(article => (
                     <ArticleCard key={article.id} article={article} variant="small" />
                  ))}
               </div>
               <button className="w-full btn-heritage mt-6">Sabhi Samachar Dekhe</button>
            </aside>
        </div>

        {/* ── TRADITIONAL DIVIDER ── */}
        <div className="newspaper-divider"></div>

        {/* ── VIDEOS (LIVE TV) ── */}
        <section className="bg-paper-ivory rounded-[3rem] p-8 md:p-16 border-4 border-secondary/5 relative overflow-hidden">
           <div className="grid-paper absolute inset-0 opacity-10"></div>
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <div className="inline-flex items-center gap-3 bg-secondary text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    <Tv className="size-4" /> LIVE PRAKASHAN
                 </div>
                 <h2 className="text-5xl md:text-7xl font-serif-heritage font-black text-secondary italic leading-[0.9] tracking-tighter">
                    Lakhara Samaj <span className="text-primary italic">Live TV</span>
                 </h2>
                 <p className="text-secondary/70 text-lg italic leading-relaxed">
                    Hamare samaj ke mukhya karyakramo aur samacharo ka ab sidha prasaran dekhe apne mobile par.
                 </p>
                 <Link to="/live" className="btn-heritage inline-flex items-center gap-4">
                    Abhi Dekhe <Play className="size-4 fill-current" />
                 </Link>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-2 border-secondary/10 bg-black group">
                 <iframe
                   className="size-full group-hover:scale-105 transition-transform duration-1000"
                   src={`https://www.youtube.com/embed/${getYouTubeSettings().liveVideoId}?autoplay=0&mute=1&controls=1`}
                   title="Samaj Feed"
                   frameBorder="0"
                   allowFullScreen
                 ></iframe>
                 <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-[8px] font-bold animate-pulse">LIVE</div>
              </div>
           </div>
        </section>

        {/* ── CATEGORY SECTIONS ── */}
        <section className="space-y-32">
          {categories.slice(0, 4).map((category) => {
            const categoryArticles = articles
              .filter((a) => a.category === category.slug)
              .slice(0, 4);

            if (categoryArticles.length === 0) return null;

            return (
              <div key={category.id} className="space-y-12">
                <div className="flex items-center justify-between border-b-2 border-secondary/5 pb-8">
                   <div className="flex items-center gap-6">
                      <div className="size-16 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: category.color }}>
                         <Newspaper className="size-8" />
                      </div>
                      <div>
                         <h2 className="text-4xl md:text-5xl font-serif-heritage font-black text-secondary uppercase tracking-tight italic">{category.name}</h2>
                         <p className="text-xs text-primary font-black uppercase tracking-widest mt-1">Lakhara Vishesh</p>
                      </div>
                   </div>
                   <Link to={`/category/${category.slug}`} className="text-primary font-black text-xs uppercase tracking-widest hover:underline">Vistrit Dekhe →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                  {categoryArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* ── INFINITE FEED ── */}
        <section className="space-y-20 pt-20 border-t border-border">
           <div className="text-center space-y-4">
              <h2 className="text-5xl font-serif-heritage text-secondary italic">Anya Samachar</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {latestFeed.slice(5).map(article => (
                 <ArticleCard key={article.id} article={article} variant="horizontal" />
              ))}
           </div>

           <div ref={loaderRef} className="flex flex-col items-center py-20 grayscale opacity-50">
              <AnimatePresence>
                {articles.length > displayCount ? (
                  <div className="flex flex-col items-center gap-4">
                     <Loader2 className="size-8 animate-spin text-secondary" />
                     <p className="font-serif-heritage text-secondary">Aur Samachar Prapt Ho Rahe Hai...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                     <Landmark className="size-12 text-secondary opacity-20" />
                     <p className="font-serif-heritage text-secondary/40">Iti Samachar - Sampurn</p>
                  </div>
                )}
              </AnimatePresence>
           </div>
        </section>

        {/* ── PATRIKA SUBSCRIPTION ── */}
        <section>
           <Newsletter />
        </section>

      </div>

      {/* Footer Basic */}
      <footer className="bg-secondary text-white py-20">
         <div className="container mx-auto px-4 text-center space-y-8">
            <h2 className="text-4xl font-serif-heritage italic">Lakhara Digital News</h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto leading-relaxed">
               Samaj ki seva hamara dharm hai. Lakhara samaj ke har vyakti tak sacche aur vishwasniya samachar pahuchana hamara uddeshya hai.
            </p>
            <div className="flex justify-center gap-10 text-[10px] font-black uppercase tracking-[0.3em]">
               <Link to="/about" className="hover:text-primary transition-colors">Hamare Bare Mein</Link>
               <Link to="/contact" className="hover:text-primary transition-colors">Sampark Kare</Link>
               <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            </div>
            <p className="text-white/20 text-[9px] uppercase tracking-widest pt-10">© 2024 Lakhara Digital News. All Rights Reserved.</p>
         </div>
      </footer>
    </div>
  );
}
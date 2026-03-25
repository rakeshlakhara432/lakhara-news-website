import { useState, useEffect, useRef } from "react";
import { categories, getYouTubeSettings } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { BreakingNews } from "../components/BreakingNews";
import { Newsletter } from "../components/Newsletter";
import { TrendingUp, Loader2, Play, ChevronRight, Zap, Tv, Eye, Sparkles, Flame, ArrowRight, Signal, Globe, Radio, ShieldCheck, Activity, Landmark, Newspaper, Calendar, Menu, Search, User, Home, Compass, Film, UserCircle, Bell, Moon, Sun, Upload, MoreVertical, Share2 } from "lucide-react";
import { Link } from "react-router";
import { newsService, Article } from "../services/newsService";

export function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    const unsubscribe = newsService.subscribeToArticles((data) => {
      setArticles(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) return (
    <div className="min-h-screen bg-[#05080f] flex flex-col items-center justify-center gap-6">
       <div className="size-24 border-t-4 border-primary rounded-full animate-spin shadow-glow"></div>
       <p className="font-black text-[10px] text-primary uppercase tracking-[0.5em] animate-pulse">LAKHARA NETWORK INITIALIZING...</p>
    </div>
  );

  const heroArticle = articles[0];
  const sideArticles = articles.slice(1, 5);
  const breakingNews = articles.filter(a => a.isBreaking);

  return (
    <div className="bg-[#05080f] min-h-screen font-main text-white relative selection:bg-primary/40 selection:text-white">
      
      {/* ── MISSION CONTROL HEADER (FLOATING BAR) ── */}
      <header className="fixed top-8 inset-x-0 h-16 flex items-center justify-center z-[100] px-4">
        <div className="container mx-auto max-w-7xl h-full flex items-center justify-between bg-[#0a0f1a]/80 backdrop-blur-3xl border border-white/5 rounded-full px-8 shadow-2xl">
          
          <Link to="/" className="flex items-center gap-4 group">
            <div className="size-8 bg-black rounded-lg flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-all font-black italic">L</div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tighter italic leading-none uppercase group-hover:text-primary transition-colors">LAKHARA</span>
              <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest leading-none mt-1">NEWS NETWORK</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 h-full">
            {[
              { label: "HOME", icon: Home, active: true },
              { label: "EXPLORE", icon: Compass },
              { label: "REELS", icon: Film },
              { label: "LIVE TV", icon: Tv },
              { label: "PROFILE", icon: UserCircle },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className={`flex items-center gap-3 px-6 h-10 rounded-full transition-all cursor-pointer font-black text-[10px] uppercase tracking-widest ${item.active ? 'bg-white text-black shadow-xl ring-4 ring-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon className="size-4" />
                  {item.label}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
             <div className="hidden xl:flex items-center bg-black/40 border border-white/5 rounded-full px-5 py-2 group-focus-within:border-primary/50 transition-all">
                <Search className="size-3.5 text-gray-500" />
                <input type="text" placeholder="Search network..." className="bg-transparent border-none outline-none text-[10px] w-32 placeholder:text-gray-600 font-bold ml-3" />
             </div>
             <button className="p-2.5 bg-black/40 border border-white/5 rounded-full hover:bg-primary/10 hover:border-primary/50 transition-all group shadow-inner">
                <Moon className="size-4 text-gray-400 group-hover:text-primary" />
             </button>
             <button className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-xl text-[10px] font-black hover:bg-primary hover:text-white transition-all active:scale-95 shadow-xl">
                <Upload className="size-4" />
                POST
             </button>
          </div>
        </div>
      </header>

      {/* ── CINEMATIC MAIN CONTENT ── */}
      <div className="container mx-auto px-4 max-w-7xl pt-44 pb-20 space-y-24 relative z-10">
        
        {/* Ticker Below Nav */}
        <div className="bg-white/5 border border-white/5 rounded-2xl h-14 flex items-center px-6 backdrop-blur-3xl">
           <div className="container mx-auto flex items-center gap-10">
              <div className="flex-shrink-0 flex items-center gap-3">
                 <div className="size-2 bg-primary rounded-full animate-ping"></div>
                 <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] italic">REAL-TIME SIGNAL</span>
              </div>
              <div className="w-px h-6 bg-white/5"></div>
              <BreakingNews items={breakingNews.map(a => ({ title: a.title, slug: a.slug }))} />
           </div>
        </div>

        {/* ── HERO MISSION CONTROL GRID ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Featured Visual Feed (Hero) */}
          <main className="lg:col-span-8 space-y-10 group">
             {heroArticle && (
                <Link to={`/article/${heroArticle.slug}`} className="block relative rounded-[2.5rem] overflow-hidden bg-black aspect-video shadow-2xl hover:shadow-primary/20 transition-all duration-700">
                   <img 
                      src={heroArticle.imageUrl} 
                      alt="" 
                      className="size-full object-cover group-hover:scale-110 transition-transform duration-[4s] opacity-70 group-hover:opacity-90" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-transparent to-transparent"></div>
                   <div className="absolute top-10 left-10 scale-125 md:scale-100">
                      <div className="flex items-center gap-4 bg-primary px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] shadow-glow">
                         <Signal className="size-4" /> PRIORITY CONTENT
                      </div>
                   </div>
                   <div className="absolute bottom-12 left-12 right-12 space-y-4">
                      <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-[0.9] text-glow line-clamp-2">
                         {heroArticle.title}
                      </h2>
                      <p className="text-gray-400 text-sm md:text-lg font-bold leading-relaxed max-w-xl group-hover:text-white transition-colors duration-500 italic">
                         {heroArticle.excerpt}
                      </p>
                   </div>
                </Link>
             )}

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {articles.slice(5, 11).map(article => (
                   <ArticleCard key={article.id} article={article} />
                ))}
             </div>
          </main>

          {/* Data Log Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
             <div className="bg-[#0a0f1a] p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 size-40 bg-primary/10 rounded-full blur-[60px] pointer-events-none"></div>
                <h3 className="text-xl font-black text-white mb-10 flex items-center gap-4 italic tracking-widest">
                   <Activity className="size-6 text-primary" /> NETWORK TRAFFIC
                </h3>
                <div className="space-y-10">
                   {sideArticles.map((article, idx) => (
                      <Link key={idx} to={`/article/${article.slug}`} className="flex gap-6 items-start group">
                         <span className="text-5xl font-black text-white/5 group-hover:text-primary transition-colors italic leading-none">0{idx + 1}</span>
                         <div className="space-y-2 pt-1">
                            <h4 className="text-sm font-black text-gray-400 group-hover:text-white transition-colors uppercase italic tracking-tighter leading-tight">
                               {article.title}
                            </h4>
                            <div className="flex items-center gap-3 text-[8px] font-black text-gray-600 uppercase tracking-widest">
                               <span className="text-primary">{article.category}</span>
                               <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                               <span>{new Date().getHours() - idx}H AGO</span>
                            </div>
                         </div>
                      </Link>
                   ))}
                </div>
                <button className="w-full mt-10 py-5 bg-black/40 rounded-2xl border border-white/5 font-black text-[9px] uppercase tracking-[0.4em] text-gray-500 hover:text-white hover:bg-white/5 transition-all active:scale-95">
                   LOAD MORE DATA
                </button>
             </div>

             <div className="bg-primary p-12 rounded-[2.5rem] text-white shadow-glow relative overflow-hidden group border-4 border-white/5">
                <Tv className="absolute -bottom-10 -right-10 size-64 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">LIVE FEED</h3>
                <p className="text-white/80 text-sm font-bold leading-relaxed mb-8 italic">
                   Direct downlink from global servers. Real-time news production active.
                </p>
                <Link to="/live" className="inline-flex items-center gap-4 bg-white text-primary px-8 py-3 rounded-xl font-black text-[10px] shadow-2xl hover:scale-105 active:scale-95 transition-transform uppercase tracking-widest">
                   <Radio className="size-4 animate-pulse" /> ACTIVATE TRANSMISSION
                </Link>
             </div>
          </aside>
        </section>

        {/* ── SECTOR GRIDS ── */}
        {categories.slice(0, 3).map((cat, idx) => {
           const catArticles = articles.filter(a => a.category === cat.slug).slice(0, 4);
           if (catArticles.length === 0) return null;
           return (
              <section key={cat.id} className="space-y-12">
                 <div className="flex items-center justify-between border-b border-white/5 pb-8">
                    <div className="flex items-center gap-6">
                       <div className="size-14 bg-black rounded-2xl border border-white/10 flex items-center justify-center text-primary shadow-inner">
                          <Landmark className="size-7" />
                       </div>
                       <div>
                          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">SECTOR {idx + 1}</h2>
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] mt-1">{cat.name} OPERATIONS</p>
                       </div>
                    </div>
                    <button className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-primary transition-all text-gray-500 hover:text-white">
                       <MoreVertical className="size-6" />
                    </button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {catArticles.map(article => (
                       <ArticleCard key={article.id} article={article} />
                    ))}
                 </div>
              </section>
           );
        })}

        <section className="bg-white/5 p-16 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl text-center space-y-10 relative overflow-hidden">
           <Zap className="absolute top-10 left-10 size-10 text-primary opacity-20" />
           <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-glow">RECV: PATRIKA DATA</h2>
              <p className="text-gray-400 max-w-lg mx-auto leading-relaxed font-bold italic">
                 Subscribe to our high-frequency data burst. Guaranteed 99.9% insight uptime.
              </p>
           </div>
           <Newsletter />
        </section>

      </div>

      {/* ── CINEMATIC FOOTER ── */}
      <footer className="footer-control bg-[#0a0f1a] pt-32 pb-16 border-t border-white/5">
         <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32 text-center md:text-left">
               <div className="space-y-10">
                  <Link to="/" className="flex items-center gap-4 justify-center md:justify-start">
                     <div className="size-12 bg-black border border-primary/40 rounded-xl flex items-center justify-center text-primary shadow-glow">
                        <Radio className="size-7" />
                     </div>
                     <span className="text-2xl font-black italic tracking-tighter uppercase text-glow">LAKHARA HQ</span>
                  </Link>
                  <p className="text-gray-500 text-xs font-bold leading-relaxed italic pr-10 uppercase tracking-widest">
                     Lakhara News Network represents the cutting edge of digital news delivery. Global. Instant. Objective.
                  </p>
               </div>
               
               <div className="space-y-8">
                  <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">OPERATIONS</h4>
                  <ul className="space-y-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                     <li className="hover:text-primary transition-colors cursor-pointer">• CENTRAL HUB</li>
                     <li className="hover:text-primary transition-colors cursor-pointer">• SATELLITE COMMS</li>
                     <li className="hover:text-primary transition-colors cursor-pointer">• DATA PRIVACY</li>
                     <li className="hover:text-primary transition-colors cursor-pointer">• TRANSMISSION LOGS</li>
                  </ul>
               </div>

               <div className="space-y-8">
                  <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">CONNECT</h4>
                  <div className="grid grid-cols-2 gap-4">
                     {["FB-DATA", "YT-LIVE", "TW-FEED", "IG-IMG"].map(sm => (
                        <div key={sm} className="bg-black/50 border border-white/5 p-3 rounded-lg text-center text-[8px] font-black text-gray-600 hover:text-white hover:border-primary/40 transition-all cursor-pointer">
                           {sm}
                        </div>
                     ))}
                  </div>
               </div>

               <div className="space-y-8">
                  <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">SYSTRAY</h4>
                  <div className="p-6 bg-black border border-white/10 rounded-2xl flex items-center gap-4">
                     <Cpu className="size-6 text-primary" />
                     <div className="flex flex-col">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">CORE TEMP</span>
                        <span className="text-[14px] font-black text-white italic">NORMAL - 42°C</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
               <div className="flex items-center gap-4">
                  <div className="size-2 bg-primary rounded-full animate-pulse shadow-glow"></div>
                  <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em]">HQ LOCATION: UDAIPUR, IN</span>
               </div>
               <p className="text-gray-700 text-[8px] font-black uppercase tracking-[1em]">© 2024 LAKHARA NEWS NETWORK</p>
               <div className="flex items-center gap-4 text-[9px] font-black text-gray-600">
                  <button className="hover:text-white">EN</button>
                  <div className="w-1 h-1 bg-white/10 rounded-full"></div>
                  <button className="hover:text-white">HI</button>
               </div>
            </div>
         </div>
      </footer>

      {/* Background Cinematic Orbs */}
      <div className="fixed top-[-20%] right-[-10%] size-[800px] bg-primary/5 rounded-full blur-[200px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="fixed bottom-[-10%] left-[-5%] size-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import { categories, getYouTubeSettings } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { BreakingNews } from "../components/BreakingNews";
import { Newsletter } from "../components/Newsletter";
import { TrendingUp, Loader2, Play, ChevronRight, Zap, Tv, Eye, Sparkles, Flame, ArrowRight, Signal, Globe, Radio, ShieldCheck, Activity, Landmark, Newspaper, Calendar, Menu, Search, User, Facebook, Twitter, Instagram, Youtube, Linkedin, Mic2 } from "lucide-react";
import { Link } from "react-router";
import { newsService, Article } from "../services/newsService";

export function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = newsService.subscribeToArticles((data) => {
      setArticles(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
       <Loader2 className="size-10 animate-spin text-primary" />
       <p className="font-bold text-gray-500 uppercase tracking-widest text-[10px]">Lakhara Samachar Prarambh...</p>
    </div>
  );

  const heroArticle = articles[0];
  const trendingArticles = articles.slice(1, 5);
  
  // Categorized sections
  const tajaKhabar = articles.slice(5, 8);
  const manoranjan = articles.filter(a => a.category === "manoranjan").slice(0, 3);
  const khel = articles.filter(a => a.category === "khel").slice(0, 3);
  const tech = articles.filter(a => a.category === "tech").slice(0, 3);

  return (
    <div className="bg-white min-h-screen font-sans text-gray-950">
      
      {/* ── TOP NAV HEADER (IMAGE REPLICATION) ── */}
      <header className="bg-[#003366] text-white">
        <div className="container mx-auto px-4 flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 bg-white h-full px-8 py-2 border-b-4 border-primary">
            <Mic2 className="size-10 text-primary" />
            <div className="flex flex-col">
              <span className="text-3xl font-black text-secondary tracking-tighter italic leading-none uppercase">लखारा</span>
              <span className="text-sm font-bold text-primary italic leading-none">डिजिटल न्यूज़</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center h-full">
            {["मुख्य पृष्ठ", "राजनीति", "मनोरंजन", "खेल", "तकनीक", "व्यापार", "वीडियो"].map((item, idx) => (
              <div key={idx} className="h-full flex items-center px-4 hover:bg-white/10 transition-all font-bold text-[14px] cursor-pointer whitespace-nowrap">
                {item}
              </div>
            ))}
            <div className="flex items-center gap-4 ml-10">
               <div className="bg-white rounded px-2 py-1 flex items-center">
                  <input type="text" placeholder="search" className="bg-transparent border-none outline-none text-gray-950 text-xs w-24" />
               </div>
               <button className="bg-primary p-1.5 rounded">
                  <Search className="size-4 text-white" />
               </button>
            </div>
          </nav>

          <button className="lg:hidden p-3 bg-white/10 rounded">
            <Menu className="size-6 text-white" />
          </button>
        </div>
      </header>

      {/* ── HERO GRID ── */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[450px]">
          
          {/* Main Hero Card */}
          <div className="lg:col-span-9 relative rounded-xl overflow-hidden shadow-2xl group group-hover:shadow-primary/10 transition-all">
            {heroArticle && (
              <Link to={`/article/${heroArticle.slug}`} className="size-full">
                <img src={heroArticle.imageUrl} alt="" className="size-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-10 left-10 max-w-xl space-y-6">
                   <h2 className="text-4xl md:text-6xl font-black text-white italic leading-[1] text-shadow-lg tracking-tighter">
                      {heroArticle.title}
                   </h2>
                   <p className="text-gray-300 text-sm md:text-lg font-medium leading-relaxed italic line-clamp-2">
                      {heroArticle.excerpt}
                   </p>
                   <div className="flex items-center gap-2">
                      <div className="w-10 h-1 bg-primary"></div>
                      <div className="w-10 h-0.5 bg-white/20"></div>
                      <div className="w-10 h-0.5 bg-white/20"></div>
                   </div>
                </div>
              </Link>
            )}
          </div>

          {/* Trending Panel (रुझान) */}
          <div className="lg:col-span-3 bg-white p-6 border border-border rounded-xl">
             <div className="flex items-center justify-between mb-8 border-b border-primary pb-2">
                <h3 className="text-xl font-black text-secondary italic">रुझान</h3>
                <ChevronRight className="size-5 text-gray-300" />
             </div>
             <div className="space-y-8">
                {trendingArticles.map((article, idx) => (
                   <Link key={idx} to={`/article/${article.slug}`} className="flex items-start gap-4 group">
                      <span className="text-primary font-black text-2xl opacity-20 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                      <div className="space-y-2">
                         <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors italic leading-tight uppercase">
                            {article.title}
                         </h4>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date().getHours() - idx} HOURS AGO</p>
                      </div>
                   </Link>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* ── 4 COLUMN SECTION GRID ── */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
           
           {/* Section 1: ताज़ा ख़बरें */}
           <div className="space-y-8">
              <div className="section-heading">
                <span>ताज़ा ख़बरें</span>
                <ChevronRight className="size-5" />
              </div>
              <div className="space-y-6">
                 {tajaKhabar.map((article) => (
                   <ArticleCard key={article.id} article={article} variant="small" />
                 ))}
              </div>
           </div>

           {/* Section 2: मनोरंजन जगत */}
           <div className="space-y-8">
              <div className="section-heading">
                <span>मनोरंजन जगत</span>
                <ChevronRight className="size-5" />
              </div>
              <div className="space-y-6">
                 {articles.filter(a => a.category === "manoranjan").slice(0, 3).map((article) => (
                   <ArticleCard key={article.id} article={article} variant="small" />
                 ))}
              </div>
           </div>

           {/* Section 3: खेल समाचार */}
           <div className="space-y-8">
              <div className="section-heading">
                <span>खेल समाचार</span>
                <ChevronRight className="size-5" />
              </div>
              <div className="space-y-6">
                 {articles.filter(a => a.category === "khel").slice(0, 3).map((article) => (
                   <ArticleCard key={article.id} article={article} variant="small" />
                 ))}
              </div>
           </div>

           {/* Section 4: तकनीक ज्ञान */}
           <div className="space-y-8">
              <div className="section-heading">
                <span>तकनीक ज्ञान</span>
                <ChevronRight className="size-5" />
              </div>
              <div className="space-y-6">
                 {articles.filter(a => a.category === "tech").slice(0, 3).map((article) => (
                   <ArticleCard key={article.id} article={article} variant="small" />
                 ))}
              </div>
           </div>

        </div>
      </section>

      {/* ── FOOTER BAR ── */}
      <footer className="footer-bar bg-[#cc0000] py-4 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white hover:text-primary transition-all">
                <Facebook className="size-4" />
             </div>
             <div className="bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white hover:text-primary transition-all">
                <Twitter className="size-4" />
             </div>
             <div className="bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white hover:text-primary transition-all">
                <Instagram className="size-4" />
             </div>
             <div className="bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white hover:text-primary transition-all">
                <Youtube className="size-4" />
             </div>
          </div>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] italic opacity-80">
             © 2024 LAKHARA DIGITAL NEWS PORTAL • ALL RIGHTS RESERVED
          </div>
          <div className="bg-white/10 px-4 py-1.5 rounded-lg flex items-center gap-2 border border-white/10">
             <input type="text" placeholder="Search news..." className="bg-transparent border-none outline-none text-[10px] text-white w-32 placeholder:text-white/40" />
             <Search className="size-3" />
          </div>
        </div>
      </footer>
    </div>
  );
}
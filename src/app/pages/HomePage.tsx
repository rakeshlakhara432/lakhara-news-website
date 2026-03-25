import { useState, useEffect, useRef } from "react";
import { categories, getYouTubeSettings } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { BreakingNews } from "../components/BreakingNews";
import { Newsletter } from "../components/Newsletter";
import { TrendingUp, Loader2, Play, ChevronRight, Zap, Tv, Eye, Sparkles, Flame, ArrowRight, Signal, Globe, Radio, ShieldCheck, Activity, Landmark, Newspaper, Calendar, Menu, Search, User, Home, Upload, Bell, UserCircle, Globe2, Languages, Share2, Facebook, Youtube, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router";
import { newsService, Article } from "../services/newsService";

export function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<"HI" | "EN">("HI");

  useEffect(() => {
    const unsubscribe = newsService.subscribeToArticles((data) => {
      setArticles(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
       <Loader2 className="size-10 animate-spin text-saffron" />
       <p className="font-black text-xs uppercase tracking-widest text-gray-400">हिंदू राष्ट्र समाचार प्रारंभ...</p>
    </div>
  );

  const heroArticle = articles[0];
  const sideArticles = articles.slice(1, 5);
  const breakingNews = articles.filter(a => a.isBreaking);

  // Traditional Layout Strings
  const menuItems = ["होम", "ताज़ा खबर", "देश", "दुनिया", "राजनीति", "धर्म", "टेक्नोलॉजी", "मनोरंजन", "खेल"];

  return (
    <div className="bg-background min-h-screen font-main text-charcoal pb-24 md:pb-0">
      
      {/* ── STICKY HEADER ── */}
      <header className="bg-white border-b border-border sticky top-0 z-[100] shadow-sm">
        <div className="container mx-auto px-4 flex h-20 items-center justify-between gap-6">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 bg-white h-full px-4 hover:scale-105 transition-transform">
             <div className="size-12 bg-saffron text-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,153,51,0.5)]">
                <Landmark className="size-7" />
             </div>
             <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl font-black text-saffron tracking-tight leading-none italic uppercase">हिंदू राष्ट्र</h1>
                <span className="text-[10px] font-black text-accent uppercase leading-none tracking-widest">समाचार नेटवर्क</span>
             </div>
          </Link>

          {/* Navigation Bar */}
          <nav className="hidden xl:flex items-center h-full">
            {menuItems.map((item, idx) => (
              <div key={idx} className="h-full flex items-center px-4 font-bold text-sm text-gray-700 hover:text-saffron transition-colors cursor-pointer border-b-2 border-transparent hover:border-saffron">
                {item}
              </div>
            ))}
          </nav>

          {/* Right Side Options */}
          <div className="flex items-center gap-4">
             <div className="hidden lg:flex items-center bg-gray-100/80 px-4 py-2 rounded-xl focus-within:ring-2 focus-within:ring-saffron/20 transition-all">
                <input type="text" placeholder="Search news..." className="bg-transparent border-none outline-none text-xs w-32 placeholder:text-gray-400 font-bold" />
                <Search className="size-4 text-gray-400" />
             </div>
             <button 
                onClick={() => setLanguage(l => l === "HI" ? "EN" : "HI")}
                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-xs font-black text-gray-500 hover:bg-saffron hover:text-white transition-all shadow-sm"
             >
                <Languages className="size-4" /> {language}
             </button>
             <Link to="/admin" className="p-3 bg-saffron text-white rounded-xl shadow-lg hover:shadow-saffron/30 transition-all hover:-translate-y-0.5 active:scale-95">
                <User className="size-5" />
             </Link>
          </div>
        </div>

        {/* Breaking News Ticker Strip */}
        <div className="bg-saffron text-white h-10 border-t border-white/10 flex items-center overflow-hidden">
           <div className="container mx-auto px-4 flex items-center gap-10">
              <div className="flex-shrink-0 bg-white/20 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest">ताज़ा खबर</div>
              <BreakingNews items={breakingNews.map(a => ({ title: a.title, slug: a.slug }))} />
           </div>
        </div>
      </header>

      <div className="container mx-auto px-4 xl:px-0 py-10 space-y-20">
        
        {/* ── HERO SECTION & TRENDING SIDEBAR ── */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          
          {/* Main Hero Card (Large Featured Banner) */}
          <main className="xl:col-span-8 space-y-10">
            {heroArticle && (
               <Link to={`/article/${heroArticle.slug}`} className="group block relative rounded-[2rem] overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-700 h-[300px] md:h-[500px]">
                  <img 
                    src={heroArticle.imageUrl} 
                    alt={heroArticle.title} 
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-[2s]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent"></div>
                  <div className="absolute top-8 left-8">
                     <span className="px-4 py-1.5 bg-saffron text-white text-[10px] font-black uppercase rounded-lg shadow-lg">{heroArticle.category}</span>
                  </div>
                  <div className="absolute bottom-10 left-10 right-10 space-y-4">
                     <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter leading-tight group-hover:text-amber-200 transition-colors uppercase">
                        {heroArticle.title}
                     </h2>
                     <p className="text-gray-300 text-sm md:text-lg font-bold leading-relaxed line-clamp-2 max-w-2xl">
                        {heroArticle.excerpt}
                     </p>
                  </div>
               </Link>
            )}

            {/* Latest News Grid */}
            <div className="space-y-10">
               <h3 className="text-2xl font-black border-l-8 border-saffron pl-4">ताज़ा अपडेट</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {articles.slice(5, 11).map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
               </div>
               <button className="w-full btn-saffron !py-4 shadow-xl">और ख़बरें देखें</button>
            </div>
          </main>

          {/* Trending Panel (Numbered Ranking Sidebar) */}
          <aside className="xl:col-span-4 space-y-10">
             <div className="bg-white p-8 rounded-[2rem] border border-border shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 size-32 bg-saffron/5 rounded-full blur-[40px] -translate-x-10 -translate-y-10 pointer-events-none"></div>
                <h3 className="text-xl font-black text-charcoal mb-8 flex items-center gap-3 italic">
                   <Flame className="size-6 text-saffron" /> प्रमुख सुर्खियाँ
                </h3>
                <div className="space-y-10">
                   {sideArticles.map((article, idx) => (
                      <Link key={idx} to={`/article/${article.slug}`} className="flex gap-4 items-start group">
                         <span className="text-5xl font-black text-saffron/10 group-hover:text-saffron transition-colors leading-none tracking-tighter italic">0{idx + 1}</span>
                         <div className="space-y-2 pt-1">
                            <h4 className="text-sm font-black text-charcoal group-hover:text-saffron transition-colors leading-tight italic uppercase tracking-tighter">
                               {article.title}
                            </h4>
                            <div className="flex items-center gap-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                               <span>{article.category}</span>
                               <span className="w-1 h-1 bg-border rounded-full"></span>
                               <span>{new Date().getHours() - idx} घंटे पहले</span>
                            </div>
                         </div>
                      </Link>
                   ))}
                </div>
                <Link to="/trending" className="block mt-10 text-center py-4 bg-gray-50 rounded-2xl text-[10px] font-black text-gray-400 hover:text-saffron hover:bg-saffron/5 transition-all uppercase tracking-[0.2em] border border-dashed border-gray-200">
                   सभी ट्रेंडिंग देखें <ChevronRight className="size-3 inline ml-1" />
                </Link>
             </div>

             <div className="bg-gradient-to-br from-saffron to-orange-600 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <Activity className="absolute bottom-[-20%] right-[-10%] size-[200px] opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
                <h3 className="text-2xl font-black mb-4 uppercase italic">लाइव न्यूज़</h3>
                <p className="text-white/80 text-sm font-bold leading-relaxed mb-8 italic">
                   देश और धर्म की हर बड़ी खबर पर हमारी सीधी नज़र। अभी लाइव प्रसारण देखें।
                </p>
                <Link to="/live" className="inline-flex items-center gap-3 px-6 py-3 bg-white text-saffron font-black rounded-xl text-xs shadow-lg hover:scale-110 transition-transform">
                   <Tv className="size-4" /> अभी देखें
                </Link>
             </div>
          </aside>
        </div>

        {/* ── CATEGORY SECTIONS (धर्म समाचार, राजनीति, आदि) ── */}
        <section className="space-y-32">
           {categories.slice(0, 4).map((cat) => {
             const catArticles = articles.filter(a => a.category === cat.slug).slice(0, 4);
             if (catArticles.length === 0) return null;
             return (
               <div key={cat.id} className="space-y-12">
                  <div className="flex items-center justify-between border-b-2 border-border pb-8">
                     <div className="flex items-center gap-4">
                        <div className="size-14 rounded-2xl flex items-center justify-center text-white shadow-xl" style={{ backgroundColor: cat.color }}>
                           <Globe2 className="size-7" />
                        </div>
                        <div>
                           <h2 className="text-3xl md:text-4xl font-black text-charcoal uppercase tracking-tighter italic">{cat.name}</h2>
                           <p className="text-[10px] font-black text-saffron uppercase tracking-[0.3em] mt-1">हिंदू राष्ट्र विशेष कवरेज</p>
                        </div>
                     </div>
                     <Link to={`/category/${cat.slug}`} className="btn-saffron !rounded-xl !px-4 !py-2 !text-[9px]">विस्तृत देखें</Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                     {catArticles.map(article => (
                       <ArticleCard key={article.id} article={article} />
                     ))}
                  </div>
               </div>
             );
           })}
        </section>

        {/* ── NEWSLETTER ── */}
        <section>
           <Newsletter />
        </section>

      </div>

      {/* ── FOOTER DESIGN ── */}
      <footer className="bg-charcoal text-white pt-24 pb-12 border-t-8 border-saffron">
         <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 text-center md:text-left">
            <div className="space-y-8">
               <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className="size-12 bg-saffron text-white rounded-full flex items-center justify-center shadow-lg">
                     <Landmark className="size-7" />
                  </div>
                  <h3 className="text-3xl font-black text-white italic tracking-tighter leading-none uppercase">हिंदू राष्ट्र</h3>
               </div>
               <p className="text-gray-400 text-sm font-medium leading-relaxed italic pr-10">
                  सत्य, सनातन और समाज के प्रति समर्पित डिजिटल समाचार नेटवर्क। हम देश और संस्कृति की आवाज़ हैं।
               </p>
               <div className="flex items-center justify-center md:justify-start gap-4">
                  {[Facebook, Youtube, Twitter, Instagram].map((Icon, idx) => (
                    <div key={idx} className="size-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:bg-saffron hover:text-white transition-all cursor-pointer shadow-lg active:scale-90">
                       <Icon className="size-5" />
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="space-y-6">
               <h4 className="text-lg font-black uppercase tracking-widest text-saffron italic">प्रमुख लिंक</h4>
               <ul className="space-y-4 text-gray-400 text-xs font-black uppercase tracking-[0.3em] leading-relaxed">
                  {["About Us", "Contact Us", "Privacy Policy", "Terms & Conditions"].map(link => (
                    <li key={link} className="hover:text-saffron transition-colors cursor-pointer">• {link}</li>
                  ))}
               </ul>
            </div>

            <div className="space-y-6">
               <h4 className="text-lg font-black uppercase tracking-widest text-saffron italic">भाषा चयन</h4>
               <div className="flex items-center gap-4 font-black">
                  <button onClick={() => setLanguage("HI")} className={`px-4 py-2 rounded-lg text-xs ${language === "HI" ? "bg-saffron text-white" : "text-gray-400 hover:text-white"}`}>हिन्दी</button>
                  <button onClick={() => setLanguage("EN")} className={`px-4 py-2 rounded-lg text-xs ${language === "EN" ? "bg-saffron text-white" : "text-gray-400 hover:text-white"}`}>ENGLISH</button>
               </div>
               <p className="text-gray-500 text-[9px] uppercase tracking-widest italic pt-4">LATEST UPDATE: {new Date().toLocaleTimeString()}</p>
            </div>

            <div className="space-y-6">
               <h4 className="text-lg font-black uppercase tracking-widest text-saffron italic">सम्पर्क</h4>
               <p className="text-gray-400 text-xs font-medium leading-relaxed italic">
                  Address: Dharma Bhavan, New Delhi, India<br/>
                  Email: info@hindurashtranews.com<br/>
                  Phone: +91 011 2345 6789
               </p>
               <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center gap-3">
                  <Activity className="size-4 text-saffron animate-pulse" />
                  <span className="text-[10px] font-black text-accent uppercase tracking-widest">SERVER: HINDU-INDIA-1</span>
               </div>
            </div>
         </div>
         <div className="container mx-auto px-4 mt-24 pt-10 border-t border-white/5 text-center space-y-4">
            <p className="text-gray-600 text-[10px] uppercase font-black tracking-[0.4em]">© 2026 HINDU RASHTRA NEWS. ALL RIGHTS RESERVED.</p>
            <p className="text-gray-800 text-[8px] uppercase tracking-widest">Bharat's Leading Cultural News Network</p>
         </div>
      </footer>

      {/* ── MOBILE BOTTOM NAVIGATION ── */}
      <div className="xl:hidden fixed bottom-0 inset-x-0 h-20 bg-white/95 backdrop-blur-3xl border-t border-border flex items-center justify-around z-[100] px-6">
        <div className="bottom-nav-item !text-saffron">
           <Home className="size-6" />
           <span>होम</span>
        </div>
        <div className="bottom-nav-item">
           <Flame className="size-6" />
           <span>ताज़ा</span>
        </div>
        <div className="size-16 -mt-10 bg-gradient-to-t from-saffron to-amber-400 text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(255,153,51,0.5)] border-4 border-white active:scale-90 transition-transform">
           <Upload className="size-6" />
        </div>
        <div className="bottom-nav-item">
           <Bell className="size-6" />
           <span>नोटीफिकेशन</span>
        </div>
        <div className="bottom-nav-item">
           <UserCircle className="size-6" />
           <span>प्रोफ़ाइल</span>
        </div>
      </div>
    </div>
  );
}
import { Tv, Radio, AlertCircle, Signal, Shield, Play, ChevronRight, Activity, Zap } from "lucide-react";
import { getArticles, getYouTubeSettings } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { Link } from "react-router";

export function LiveTVPage() {
  const articles = getArticles();
  const latestNews = articles.slice(0, 8);
  const youtubeSettings = getYouTubeSettings();

  return (
    <div className="bg-[#fcfcfc] dark:bg-gray-950 min-h-screen pb-40">
      
      {/* ── High-Impact Master Header ── */}
      <div className="bg-gray-950 text-white relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 size-[800px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-16">
            <div className="space-y-10">
               <div className="flex items-center gap-10">
                  <div className="size-24 bg-lakhara rounded-[2.5rem] flex items-center justify-center shadow-lakhara rotate-[-12deg] relative">
                     <Radio className="size-12 text-white animate-pulse" />
                     <div className="absolute -top-3 -right-3 size-8 bg-white rounded-2xl flex items-center justify-center text-primary shadow-xl">
                        <Signal className="size-5" />
                     </div>
                  </div>
                  <div>
                     <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none mb-4">
                        Lakhara <span className="text-gradient">Live</span>
                     </h1>
                     <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-3 bg-red-600/20 text-red-500 px-6 py-2 rounded-full border border-red-500/20">
                           <div className="size-2 bg-red-500 rounded-full animate-ping"></div>
                           <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Satellite Link</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 text-gray-500 px-6 py-2 rounded-full border border-white/5">
                           <span className="text-[10px] font-black uppercase tracking-[0.3em]">4K Ultra-Link Established</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 flex items-center gap-10 group hover:border-primary/20 transition-all cursor-pointer">
               <div className="text-right space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Current Intelligence Stream</p>
                  <h3 className="text-3xl font-black italic text-white tracking-tighter uppercase leading-none">Global Mission Prime</h3>
               </div>
               <div className="size-20 bg-primary/20 rounded-[1.8rem] flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-lakhara shadow-primary/10">
                  <Tv className="size-10" />
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-24 relative z-20">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
          
          <div className="xl:col-span-8 space-y-24">
            
            {/* ── Neural Player Core ── */}
            <div className="bg-black rounded-[4rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)] border border-white/10 group relative">
               <div className="aspect-video relative">
                  {youtubeSettings.liveVideoId ? (
                    <iframe
                      className="size-full scale-[1.01]"
                      src={`https://www.youtube.com/embed/${youtubeSettings.liveVideoId}?autoplay=1&mute=1&modestbranding=1&controls=0`}
                      title="Network Feed"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="flex flex-col items-center justify-center size-full gap-8 p-20 text-center bg-gray-900">
                       <Shield className="size-32 text-primary opacity-20 animate-pulse" />
                       <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Encryption Fault</h2>
                       <p className="text-gray-500 font-bold max-w-sm">The digital stream is currently undergoing structural maintenance. Access will be restored shortly.</p>
                       <Link to="/" className="btn-lakhara !rounded-2xl !px-12 !py-5">BROWSE ARCHIVES</Link>
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
                  
                  {youtubeSettings.liveVideoId && (
                    <div className="absolute top-10 left-10 flex items-center gap-4 bg-red-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl skew-x-[-12deg] group-hover:skew-x-0 transition-all duration-700">
                       <Activity className="size-4 animate-bounce" />
                       LIVE SAT-LINK
                    </div>
                  )}

                  <div className="absolute bottom-10 right-10 flex items-center gap-6">
                     <div className="glass px-6 py-3 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                        10 bits • 2160p
                     </div>
                  </div>
               </div>
            </div>

            {/* ── Content Briefing ── */}
            <div className="bg-white dark:bg-white/5 rounded-[4rem] p-12 md:p-20 border border-gray-100 dark:border-white/5 shadow-sm space-y-16">
                <div className="space-y-6">
                   <div className="flex items-center gap-4 border-l-8 border-lakhara pl-8">
                      <h2 className="text-5xl font-black italic tracking-tighter uppercase text-gray-950 dark:text-white leading-none">Broadcast Control</h2>
                   </div>
                   <p className="text-gray-500 dark:text-gray-400 text-2xl font-medium leading-relaxed italic max-w-4xl">
                     Access our 24/7 global intelligence stream. Lakhara Live delivers raw, unfiltered, and data-driven journalism directly to your terminal. Our neural network ensures zero-latency updates from all active sectors.
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-gray-50 dark:border-white/5">
                   <div className="p-10 bg-gray-50 dark:bg-white/5 rounded-[3rem] space-y-6 group hover:bg-gray-950 hover:text-white transition-all">
                      <Zap className="size-10 text-primary" />
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter">Fast-Feed Intel</h3>
                      <p className="text-gray-500 font-medium group-hover:text-gray-400">Hourly intelligence summaries at the speed of wire transfers.</p>
                   </div>
                   <div className="p-10 bg-gray-50 dark:bg-white/5 rounded-[3rem] space-y-6 group hover:bg-gray-950 hover:text-white transition-all">
                      <Activity className="size-10 text-primary" />
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter">Velocity Analysis</h3>
                      <p className="text-gray-500 font-medium group-hover:text-gray-400">Deep-dive structural analysis of high-impact global geopolitical events.</p>
                   </div>
                </div>
            </div>
          </div>

          <aside className="xl:col-span-4 space-y-16">
             {/* ── Operational Timeline ── */}
             <div className="bg-gray-950 rounded-[4rem] p-12 text-white border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary group-hover:h-full group-hover:opacity-5 transition-all duration-700"></div>
                <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-12 relative z-10">Broadcast Timeline</h3>
                <div className="space-y-10 relative z-10">
                  {[
                    { time: "06:00", show: "Core Discovery" },
                    { time: "09:00", show: "Velocity Matrix" },
                    { time: "12:00", show: "Critical Flash" },
                    { time: "18:00", show: "Sector Sync" },
                    { time: "21:00", show: "Master Intel" },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-8 group/item cursor-pointer">
                       <div className="flex-shrink-0 w-20 text-[10px] font-black text-primary uppercase tracking-[0.3em] bg-primary/10 px-4 py-2 h-fit rounded-xl border border-primary/20 group-hover/item:bg-primary group-hover/item:text-black transition-all">
                          {item.time}
                       </div>
                       <div className="font-black text-gray-400 text-lg italic tracking-tighter group-hover/item:text-white transition-colors leading-none pt-2">
                          {item.show}
                       </div>
                    </div>
                  ))}
                </div>
             </div>

             {/* ── Upcoming Signals ── */}
             <div className="space-y-10">
                <div className="flex items-center justify-between border-l-4 border-primary pl-6">
                   <h3 className="text-2xl font-black italic tracking-tighter uppercase text-gray-950 dark:text-white">Upcoming Signals</h3>
                   <div className="size-2 bg-primary rounded-full animate-ping"></div>
                </div>
                <div className="space-y-6">
                   {latestNews.slice(0, 5).map((article) => (
                     <ArticleCard key={article.id} article={article} variant="small" />
                   ))}
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

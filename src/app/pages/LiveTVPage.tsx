import { Tv, Radio, AlertCircle } from "lucide-react";
import { getArticles, getYouTubeSettings } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";

export function LiveTVPage() {
  const articles = getArticles();
  const latestNews = articles.slice(0, 8);
  const youtubeSettings = getYouTubeSettings();

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-900 text-white py-12 border-b-8 border-red-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="size-20 bg-red-600 flex items-center justify-center shadow-2xl">
                <Radio className="size-10 text-white animate-pulse" />
              </div>
              <div>
                 <h1 className="text-5xl font-black italic uppercase tracking-tighter">Lakhara Live TV</h1>
                 <p className="text-red-500 font-black uppercase tracking-widest text-sm flex items-center gap-2 mt-1">
                   <span className="size-2 bg-red-500 rounded-full animate-ping"></span>
                   Broadcasting 24/7 • High Definition
                 </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 border border-white/10">
               <div className="text-right">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Current Program</div>
                  <div className="text-lg font-black text-white leading-none">Prime Time Headlines</div>
               </div>
               <div className="size-10 bg-red-600 flex items-center justify-center">
                  <Tv className="size-6 text-white" />
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-12">
            {/* Player Container */}
            <div className="bg-black shadow-[0_20px_50px_rgba(204,0,0,0.1)] relative group">
              <div className="aspect-video relative overflow-hidden">
                {youtubeSettings.liveVideoId ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeSettings.liveVideoId}?autoplay=1&mute=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white p-12 text-center">
                    <AlertCircle className="size-24 mb-6 text-red-600 opacity-50" />
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 italic">Signal Lost</h2>
                    <p className="text-gray-500 font-bold max-w-sm mx-auto">The live stream is currently unavailable. Please check back later or browse latest news below.</p>
                  </div>
                )}
                
                {youtubeSettings.liveVideoId && (
                  <div className="absolute top-6 left-6 flex items-center gap-3 bg-red-600 text-white px-6 py-2 text-xs font-black uppercase tracking-[0.2em] shadow-2xl">
                    <span className="size-2 bg-white rounded-full animate-pulse"></span>
                    Live Now
                  </div>
                )}
                <div className="absolute bottom-6 right-6 flex items-center gap-4">
                   <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-white/10">
                      1080p HD
                   </div>
                </div>
              </div>
            </div>

            {/* Description & Info */}
            <div className="bg-white border border-gray-100 p-8 md:p-12 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-2 h-8 bg-red-600"></div>
                   <h2 className="text-3xl font-black uppercase tracking-tighter">About Live Coverage</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed font-medium mb-10 max-w-4xl">
                  Watch our 24/7 live news coverage bringing you the latest updates from
                  around the country and the world. Our expert journalists and anchors
                  keep you informed about breaking news, politics, sports, entertainment,
                  and more. We leverage the fastest digital network to ensure you never 
                  miss a beat.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-gray-100">
                  <div className="space-y-4">
                     <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 italic">
                        <div className="size-2 bg-red-600"></div>
                        News Bulletins
                     </h3>
                     <p className="text-gray-500 text-sm font-medium">Flash updates every hour to keep you at the forefront of global events.</p>
                  </div>
                  <div className="space-y-4">
                     <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 italic">
                        <div className="size-2 bg-red-600"></div>
                        Prime Time Debate
                     </h3>
                     <p className="text-gray-500 text-sm font-medium">Aggressive, investigative and comprehensive analysis of the day's biggest stories.</p>
                  </div>
                </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="space-y-12">
             {/* Today's Schedule */}
             <div className="bg-white border border-gray-100 p-8 shadow-sm">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 italic flex items-center gap-3">
                  Today's Schedule
                </h3>
                <div className="space-y-6">
                  {[
                    { time: "06:00 AM", show: "Morning Headlines" },
                    { time: "09:00 AM", show: "Market Watch" },
                    { time: "12:00 PM", show: "Breaking Special" },
                    { time: "06:00 PM", show: "Evening News" },
                    { time: "09:00 PM", show: "Lakhara Debate" },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4 group cursor-pointer">
                       <div className="text-xs font-black text-red-600 bg-red-50 px-3 py-1 h-fit uppercase tracking-tighter group-hover:bg-red-600 group-hover:text-white transition-all">
                          {item.time}
                       </div>
                       <div className="font-bold text-gray-900 text-sm leading-tight flex-1">
                          {item.show}
                       </div>
                    </div>
                  ))}
                </div>
             </div>

             {/* Up Next / Latest Videos */}
             <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b-4 border-red-600 pb-4 italic">
                  Up Next
                </h3>
                <div className="space-y-2">
                  {latestNews.map((article) => (
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

import { useState, useEffect } from "react";
import { Megaphone, Calendar, ArrowRight, Bookmark, Loader2, Image, Play, Radio } from "lucide-react";
import { samajService, NewsPost, VideoPost } from "../../services/samajService";

export function NewsPage() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<VideoPost | null>(null);

  useEffect(() => {
    const unsub1 = samajService.subscribeToSamajNews(setNews);
    const unsub2 = samajService.subscribeToVideos((data) => {
       setVideos(data);
       if (!activeVideo) setActiveVideo(data.find(v => v.isLive) || data[0]);
    });
    
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => {
      unsub1(); unsub2();
      clearTimeout(timer);
    };
  }, []);

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    let vidId = "";
    try {
      if (url.includes("v=")) vidId = url.split("v=")[1].split("&")[0];
      else if (url.includes("youtu.be/")) vidId = url.split("youtu.be/")[1].split("?")[0];
      else if (url.includes("/shorts/")) vidId = url.split("/shorts/")[1].split("?")[0];
      else if (url.includes("/live/")) vidId = url.split("/live/")[1].split("?")[0];
      else if (url.includes("/embed/")) return url;
      else return url;
      return `https://www.youtube.com/embed/${vidId}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1`;
    } catch {
      return url;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
         <Loader2 className="size-10 text-orange-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      {/* 📢 NEWS HEADER */}
      <section className="text-center space-y-6 pt-12">
         <div className="size-16 mx-auto bg-orange-600 text-white rounded-2xl flex items-center justify-center shadow-sm">
            <Megaphone className="size-8" />
         </div>
         <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">समाज <span className="text-orange-600">समाचार</span></h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Community Updates • Official Notices</p>
         </div>
      </section>

      {/* 📺 DIGITAL STUDIO (LIVE / FEATURED VIDEO) */}
      {activeVideo && (
        <section className="container mx-auto px-6 lg:px-0 space-y-6">
           <div className="flex items-center gap-3 border-l-4 border-orange-600 pl-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                 डिजिटल <span className="text-orange-600">स्टूडियो</span>
              </h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-50 p-4 md:p-6 rounded-3xl border border-slate-200">
              {/* MAIN VIDEO PLAYER */}
              <div className="lg:col-span-2 relative aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-sm">
                 <iframe 
                    className="size-full"
                    src={getEmbedUrl(activeVideo.videoUrl)}
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  ></iframe>
                 
                 {activeVideo.isLive && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider shadow pointer-events-none animate-pulse">
                      <Radio className="size-3" /> LIVE NOW
                    </div>
                 )}
              </div>

              {/* VIDEO PLAYLIST */}
              <div className="flex flex-col space-y-4 max-h-[300px] lg:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Archive Broadcasts</h4>
                 <div className="space-y-3">
                    {videos.map((v) => (
                      <div 
                       key={v.id} 
                       onClick={() => setActiveVideo(v)}
                       className={`flex items-start gap-4 p-3 rounded-xl border transition-all cursor-pointer ${activeVideo.id === v.id ? 'bg-orange-50 border-orange-200 shadow-sm' : 'bg-white border-slate-200 hover:shadow-sm'}`}
                      >
                         <div className="relative w-24 aspect-video shrink-0 rounded-lg overflow-hidden bg-slate-100">
                            <img src={v.thumbnailUrl || "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=500"} className="size-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                               <Play className={`size-6 fill-current ${activeVideo.id === v.id ? 'text-orange-500' : 'text-white'}`} />
                            </div>
                         </div>
                         <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-800 leading-tight line-clamp-2">{v.title}</h4>
                            <p className="text-[10px] font-semibold text-orange-600 uppercase">
                              {v.isLive ? 'LIVE STREAM' : 'BROADCAST'}
                            </p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* 📰 NEWS FEED SECTION */}
      <section className="container mx-auto px-6 lg:px-0 space-y-6">
         <div className="flex items-center gap-3 border-l-4 border-orange-600 pl-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
               ताज़ा <span className="text-orange-600">सुर्खियाँ</span>
            </h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
               <div key={item.id} className="group flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden h-full">
                  <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden shrink-0">
                     {item.imageUrl ? (
                        <img src={item.imageUrl} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                     ) : (
                        <div className="size-full flex items-center justify-center text-slate-300">
                           <Image className="size-10" />
                        </div>
                     )}
                     <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        <Bookmark className="size-3 text-orange-600" /> {item.category}
                     </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow space-y-4">
                     <div className="flex items-center gap-1.5 text-slate-500">
                        <Calendar className="size-3.5" />
                        <span className="text-xs font-medium">
                          {item.createdAt?.toDate?.().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }) || "अभी-अभी"}
                        </span>
                     </div>
                     <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-orange-600 transition-colors">
                        {item.title}
                     </h3>
                     <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                        {item.content}
                     </p>
                     
                     <div className="pt-5 mt-auto border-t border-slate-100">
                        <button className="flex items-center gap-2 text-xs font-bold text-orange-600 group-hover:gap-3 transition-all">
                           पूरा पढ़ें <ArrowRight className="size-3.5" />
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {news.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
               <p className="text-slate-500 font-medium text-sm">अभी कोई नया समाचार उपलब्ध नहीं है</p>
            </div>
         )}
      </section>
    </div>
  );
}

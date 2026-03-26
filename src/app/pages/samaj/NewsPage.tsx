import { useState, useEffect } from "react";
import { Megaphone, Calendar, ArrowRight, Bookmark, Loader2, Image, Play, Radio, Video } from "lucide-react";
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
    
    // Slight delay to ensure data load
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
      if (url.includes("v=")) {
        vidId = url.split("v=")[1].split("&")[0];
      } else if (url.includes("youtu.be/")) {
        vidId = url.split("youtu.be/")[1].split("?")[0];
      } else if (url.includes("/shorts/")) {
        vidId = url.split("/shorts/")[1].split("?")[0];
      } else if (url.includes("/live/")) {
        vidId = url.split("/live/")[1].split("?")[0];
      } else if (url.includes("/embed/")) {
        return `${url}${url.includes("?") ? "&" : "?"}autoplay=1&mute=1&rel=0`;
      } else {
        return url;
      }
      return `https://www.youtube.com/embed/${vidId}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1`;
    } catch (e) {
      return url;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
         <Loader2 className="size-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-24 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 📢 NEWS HEADER */}
      <section className="text-center space-y-8 pt-12">
         <div className="size-20 mx-auto bg-primary/10 text-primary md:rounded-[2rem] rounded-none flex items-center justify-center shadow-lg animate-pulse border border-primary/10">
            <Megaphone className="size-10" />
         </div>
         <div className="space-y-4 px-6 md:px-0">
            <h1 className="text-4xl md:text-6xl font-black text-gray-950 tracking-tighter uppercase italic leading-tight md:leading-tight md:leading-none">समाज <span className="text-primary underline decoration-primary/10 italic">समाचार</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">COMMUNITY UPDATES • OFFICIAL NOTICES</p>
         </div>
      </section>

      {/* 📺 DIGITAL STUDIO (LIVE / FEATURED VIDEO) */}
      {activeVideo && (
        <section className="max-w-6xl mx-auto px-6">
           <div className="flex items-center gap-4 border-l-[8px] border-primary pl-8 mb-12">
              <h2 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-tight md:leading-none">
                 डिजिटल <span className="text-primary italic">स्टूडियो</span>
              </h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:p-10">
              {/* MAIN VIDEO PLAYER */}
              <div className="lg:col-span-2 relative aspect-video bg-gray-950 md:rounded-[4rem] rounded-none overflow-hidden group shadow-bhagva-lg border-[6px] border-white ring-1 ring-primary/5">
                 <iframe 
                    className="size-full"
                    src={getEmbedUrl(activeVideo.videoUrl)}
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  ></iframe>
                 
                 {activeVideo.isLive && (
                    <div className="absolute top-6 md:p-10 left-10 flex items-center gap-3 bg-red-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic animate-pulse shadow-xl border border-white/20 pointer-events-none">
                      <Radio className="size-4" /> LIVE NOW
                    </div>
                 )}
              </div>

              {/* VIDEO PLAYLIST */}
              <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                 <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-6">Archive Broadcasts</h4>
                 {videos.map((v) => (
                   <div 
                    key={v.id} 
                    onClick={() => setActiveVideo(v)}
                    className={`group/item flex items-center gap-6 p-4 rounded-3xl border transition-all cursor-pointer ${activeVideo.id === v.id ? 'bg-primary/5 border-primary shadow-bhagva-sm' : 'bg-white border-gray-100 hover:shadow-bhagva'}`}
                   >
                      <div className="relative size-24 shrink-0 rounded-2xl overflow-hidden bg-gray-900 shadow-lg">
                         <img src={v.thumbnailUrl || "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=500"} className="size-full object-cover opacity-70 group-hover/item:scale-110 transition-transform" />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <Play className={`size-4 fill-current ${activeVideo.id === v.id ? 'text-primary' : 'text-white'}`} />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <h4 className="text-[12px] font-black text-gray-950 uppercase italic leading-tight line-clamp-2">{v.title}</h4>
                         <p className="text-[9px] font-black text-primary uppercase tracking-widest italic opacity-60">
                           {v.isLive ? 'LIVE STREAM' : 'BROADCAST'}
                         </p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* 📰 NEWS FEED SECTION */}
      <section className="max-w-6xl mx-auto px-6">
         <div className="flex items-center gap-4 border-l-[8px] border-primary pl-8 mb-12">
            <h2 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-tight md:leading-none">
               ताज़ा <span className="text-primary italic">सुर्खियाँ</span>
            </h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-10">
            {news.map((item) => (
               <div key={item.id} className="group flex flex-col bg-white md:rounded-[4rem] rounded-none border border-gray-100 shadow-sm hover:shadow-bhagva transition-all relative overflow-hidden h-full">
                  <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                     {item.imageUrl ? (
                        <img src={item.imageUrl} className="size-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                     ) : (
                        <div className="size-full flex items-center justify-center text-gray-300">
                           <Image className="size-12" />
                        </div>
                     )}
                     <div className="absolute top-6 left-6 flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest italic shadow-xl">
                        <Bookmark className="size-3 fill-current" /> {item.category}
                     </div>
                  </div>

                  <div className="p-6 md:p-10 flex flex-col flex-grow space-y-6">
                     <div className="flex items-center gap-3 text-gray-400">
                        <Calendar className="size-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">
                          {item.createdAt?.toDate?.().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }) || "अभी-अभी"}
                        </span>
                     </div>
                     <h3 className="text-xl font-black text-gray-950 tracking-tighter uppercase italic leading-tight group-hover:text-primary transition-colors flex-grow">
                        {item.title}
                     </h3>
                     <p className="text-gray-400 font-bold italic text-xs leading-relaxed line-clamp-3">
                        {item.content}
                     </p>
                     
                     <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                        <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-primary italic group-hover:gap-6 transition-all">
                           पूरा पढ़ें <ArrowRight className="size-4" />
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {news.length === 0 && (
            <div className="text-center py-40 bg-gray-50 md:rounded-[4rem] rounded-none border-4 border-dashed border-gray-100">
               <p className="text-gray-300 font-black italic uppercase tracking-widest text-sm">अभी कोई नया समाचार उपलब्ध नहीं है</p>
            </div>
         )}
      </section>
    </div>
  );
}

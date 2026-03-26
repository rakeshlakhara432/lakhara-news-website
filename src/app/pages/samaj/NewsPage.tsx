import { useState, useEffect } from "react";
import { Megaphone, Calendar, ArrowRight, Bookmark, Loader2, Image, Play, Radio, Video } from "lucide-react";
import { samajService, NewsPost, VideoPost } from "../../services/samajService";

export function NewsPage() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub1 = samajService.subscribeToSamajNews(setNews);
    const unsub2 = samajService.subscribeToVideos(setVideos);
    
    // Slight delay to ensure data load
    const timer = setTimeout(() => setIsLoading(false), 800);
    
    return () => {
      unsub1(); unsub2();
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
         <Loader2 className="size-12 text-primary animate-spin" />
      </div>
    );
  }

  const liveVideo = videos.find(v => v.isLive);
  const otherVideos = videos.filter(v => v.id !== liveVideo?.id);

  return (
    <div className="space-y-24 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 📢 NEWS HEADER */}
      <section className="text-center space-y-8 pt-12">
         <div className="size-20 mx-auto bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center shadow-lg animate-pulse border border-primary/10">
            <Megaphone className="size-10" />
         </div>
         <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">समाज <span className="text-primary underline decoration-primary/10 italic">समाचार</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">COMMUNITY UPDATES • OFFICIAL NOTICES</p>
         </div>
      </section>

      {/* 📺 LIVE / FEATURED VIDEO SECTION */}
      {(liveVideo || videos.length > 0) && (
        <section className="max-w-6xl mx-auto px-6">
           <div className="flex items-center gap-4 border-l-[8px] border-primary pl-8 mb-12">
              <h2 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">
                 लाइव <span className="text-primary italic">प्रसारण</span>
              </h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* MAIN VIDEO */}
              <div className="lg:col-span-2 relative aspect-video bg-gray-950 rounded-[4rem] overflow-hidden group shadow-bhagva-lg border-[6px] border-white">
                 <img src={liveVideo?.thumbnailUrl || "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=2000"} className="size-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[10s]" />
                 <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent p-12 space-y-6">
                    {liveVideo?.isLive && (
                      <div className="inline-flex items-center gap-3 bg-red-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic animate-pulse">
                        <Radio className="size-4" /> LIVE NOW
                      </div>
                    )}
                    <h3 className="text-3xl font-black text-white italic tracking-tighter leading-tight uppercase">{liveVideo?.title || "समीक्षा एवं विशेष चर्चा"}</h3>
                    <p className="text-white/60 font-bold italic text-sm line-clamp-2">{liveVideo?.description || "समाज के विकास की नई दिशा और आगामी योजनाओं पर एक विशेष चर्चा।"}</p>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <button className="size-24 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-125 transition-transform border-[6px] border-white/20">
                       <Play className="size-10 fill-current" />
                    </button>
                 </div>
              </div>

              {/* VIDEO PLAYLIST */}
              <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                 {otherVideos.map((v, i) => (
                   <div key={v.id || i} className="group/item flex items-center gap-6 p-4 bg-white rounded-3xl border border-gray-100 hover:shadow-bhagva transition-all cursor-pointer">
                      <div className="relative size-24 shrink-0 rounded-2xl overflow-hidden bg-gray-900 shadow-lg">
                         <img src={v.thumbnailUrl || "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=500"} className="size-full object-cover opacity-70 group-hover/item:scale-110 transition-transform" />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="size-4 text-white fill-current opacity-60 group-hover/item:opacity-100" />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <h4 className="text-[12px] font-black text-gray-950 uppercase italic leading-tight line-clamp-2">{v.title}</h4>
                         <p className="text-[9px] font-black text-primary uppercase tracking-widest italic opacity-60">BROADCAST</p>
                      </div>
                   </div>
                 ))}
                 {otherVideos.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100 italic">
                       <Video className="size-10 text-gray-200 mb-4" />
                       <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">More videos coming soon</p>
                    </div>
                 )}
              </div>
           </div>
        </section>
      )}

      {/* 📰 NEWS FEED SECTION */}
      <section className="max-w-6xl mx-auto px-6">
         <div className="flex items-center gap-4 border-l-[8px] border-primary pl-8 mb-12">
            <h2 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">
               ताज़ा <span className="text-primary italic">सुर्खियाँ</span>
            </h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {news.map((item) => (
               <div key={item.id} className="group flex flex-col bg-white rounded-[4rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all relative overflow-hidden h-full">
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

                  <div className="p-10 flex flex-col flex-grow space-y-6">
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
            <div className="text-center py-40 bg-gray-50 rounded-[4rem] border-4 border-dashed border-gray-100">
               <p className="text-gray-300 font-black italic uppercase tracking-widest text-sm">अभी कोई नया समाचार उपलब्ध नहीं है</p>
            </div>
         )}
      </section>
    </div>
  );
}

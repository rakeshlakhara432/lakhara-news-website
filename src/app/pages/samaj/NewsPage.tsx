import { useState, useEffect } from "react";
import { Megaphone, Calendar, ArrowRight, Bookmark, Loader2, Image } from "lucide-react";
import { samajService, NewsPost } from "../../services/samajService";

export function NewsPage() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = samajService.subscribeToSamajNews((data) => {
      setNews(data);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

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
         <div className="size-20 mx-auto bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center shadow-lg animate-pulse border border-primary/10">
            <Megaphone className="size-10" />
         </div>
         <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">समाज <span className="text-primary underline decoration-primary/10 italic">समाचार</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">COMMUNITY UPDATES • OFFICIAL NOTICES</p>
         </div>
      </section>

      {/* 📰 NEWS FEED */}
      <section className="max-w-6xl mx-auto px-6">
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

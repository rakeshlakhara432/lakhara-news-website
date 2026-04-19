import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, Bookmark, Share2, Megaphone, Loader2 } from "lucide-react";
import { samajService, NewsPost } from "../../services/samajService";
import { VoiceNewsReader } from "../../components/ai/VoiceNewsReader";

export function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      if (!id) return;
      setIsLoading(true);
      const data = await samajService.getSamajNewsById(id);
      setNews(data);
      setIsLoading(false);
    }
    loadNews();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-32">
         <Loader2 className="size-10 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">समाचार नहीं मिला</h2>
        <p className="text-slate-500 mb-8">यह जानकारी या तो हटा दी गई है या लिंक गलत है।</p>
        <Link to="/news" className="inline-flex flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition">
          <ArrowLeft className="size-5" /> वापस समाचार पर जाएं
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.content,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 animate-in fade-in duration-700">
      {/* Header Pattern Background */}
      <div className="bg-slate-900 h-64 md:h-80 w-full absolute top-0 left-0 -z-10 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 size-full object-cover opacity-10" 
          alt="News Details Room" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50"></div>
      </div>

      <div className="container mx-auto px-6 pt-12 md:pt-24 max-w-4xl relative z-10">
        
        {/* Back navigation */}
        <Link to="/news" className="inline-flex items-center gap-2 text-slate-200 hover:text-white transition-colors mb-8 font-semibold bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-700 w-fit">
          <ArrowLeft className="size-4" /> सभी समाचार सूची
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          {/* Main Image */}
          {news.imageUrl && (
            <div className="aspect-[2/1] md:aspect-[2.5/1] w-full bg-slate-100 relative group overflow-hidden">
              <img 
                src={news.imageUrl} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt={news.title}
              />
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-orange-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-600/30">
                <Bookmark className="size-4" /> {news.category}
              </div>
            </div>
          )}

          <div className="p-8 md:p-12 space-y-8">
            
            {/* Meta Info if no image (otherwise image has category badge above) */}
            {!news.imageUrl && (
              <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest w-fit border border-orange-100">
                <Bookmark className="size-4 fill-current" /> {news.category}
              </div>
            )}

            {/* Title & Meta Data */}
            <header className="space-y-6 lg:space-y-8 border-b border-slate-100 pb-8">
               <h1 className="text-3xl md:text-5xl font-black text-slate-800 leading-[1.15] tracking-tight">
                 {news.title}
               </h1>
               
               <div className="flex flex-wrap items-center justify-between gap-6">
                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                       <div className="size-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                         <Megaphone className="size-5" />
                       </div>
                       <div>
                         <p className="text-sm font-bold text-slate-800">केंद्रीय समिति</p>
                         <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">आधिकारिक सूचना</p>
                       </div>
                    </div>
                    
                    <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
                    
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calendar className="size-4" />
                      <span className="text-sm font-semibold">
                        {news.createdAt?.toDate?.().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }) || "हाल ही में प्रकाशित"}
                      </span>
                    </div>
                 </div>

                 {/* Social Actions */}
                 <div className="flex items-center gap-3 w-full md:w-auto">
                    <VoiceNewsReader title={news.title} text={news.content} />
                    <button onClick={handleShare} className="size-10 bg-slate-50 text-slate-500 rounded-full flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-all border border-slate-200 hover:border-orange-200 shrink-0">
                      <Share2 className="size-4" />
                    </button>
                 </div>
               </div>
            </header>

            {/* Content Body */}
            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-p:font-medium prose-p:leading-relaxed prose-a:text-orange-600">
              {news.content.split('\n').map((paragraph, idx) => (
                paragraph.trim() ? (
                  <p key={idx} className={idx === 0 ? "text-xl text-slate-700 font-semibold mb-6" : "text-base text-slate-600 mb-4"}>
                    {paragraph}
                  </p>
                ) : <br key={idx} />
              ))}
            </div>

            {/* CTA / Footer */}
            <div className="pt-8 mt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
               <div>
                  <p className="text-sm font-bold text-slate-800">क्या यह जानकारी उपयोगी थी?</p>
                  <p className="text-xs text-slate-500">इसे अन्य सदस्यों के साथ साझा करें।</p>
               </div>
               <button onClick={handleShare} className="w-full md:w-auto bg-green-500 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-md shadow-green-500/20 active:scale-95">
                 <Share2 className="size-4" /> व्हाट्सऐप पर शेयर करें
               </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

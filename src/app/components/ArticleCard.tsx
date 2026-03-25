import { Link } from "react-router";
import { Clock, Eye, Share2, Bookmark, ChevronRight, User, ShieldCheck, Zap, Activity, Radio, Newspaper, Landmark, Play, Heart, MessageCircle } from "lucide-react";
import { Article } from "../services/newsService";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "horizontal" | "small" | "trending";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const formatDate = (date: any) => {
    if (!date) return "";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString("hi-IN", { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (variant === "small") {
    return (
      <Link to={`/article/${article.slug}`} className="group flex flex-col gap-4 py-6 border-b border-gray-100 last:border-0 hover:bg-white/40 transition-all rounded-3xl px-4">
        <div className="aspect-video w-full rounded-2xl shadow-sm overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
          <img src={article.imageUrl} alt="" className="size-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-saffron opacity-60">
             <span>{article.category}</span>
             <span>•</span>
             <span>{formatDate(article.createdAt)}</span>
          </div>
          <h4 className="text-[14px] font-black text-charcoal group-hover:text-saffron transition-colors line-clamp-2 leading-tight uppercase italic tracking-tighter">
            {article.title}
          </h4>
        </div>
      </Link>
    );
  }

  return (
    <div className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden border border-border shadow-md hover:shadow-2xl transition-all duration-700 active:scale-[0.98] relative cursor-default">
      <Link to={`/article/${article.slug}`} className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="size-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] opacity-90 group-hover:opacity-100" 
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal/40 to-transparent"></div>
        {article.isBreaking && (
          <div className="absolute top-6 left-6 bg-saffron text-white px-4 py-1.5 rounded-xl text-[10px] font-extrabold uppercase z-10 animate-pulse shadow-xl border border-white/20">
             ताज़ा अपडेट
          </div>
        )}
      </Link>
      
      <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
        <div className="space-y-4">
           <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span className="text-saffron font-bold tracking-widest italic">• {article.category}</span>
              <span>{formatDate(article.createdAt)}</span>
           </div>
           <Link to={`/article/${article.slug}`} className="block">
              <h3 className="text-xl font-black text-charcoal group-hover:text-saffron transition-colors leading-tight italic uppercase tracking-tighter">
                {article.title}
              </h3>
           </Link>
           <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed italic font-medium">
              {article.excerpt}
           </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
           <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-saffron/5 border border-saffron/10 flex items-center justify-center text-saffron shadow-inner">
                <User className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-charcoal leading-none mb-1 uppercase tracking-widest">{article.author}</span>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Digital Sanchalak</span>
              </div>
           </div>
           
           <div className="flex items-center gap-4 text-gray-300">
              <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                <Heart className="size-4" />
                <span className="text-[10px] font-bold">4.2k</span>
              </button>
              <button className="flex items-center gap-1 hover:text-saffron transition-colors">
                <MessageCircle className="size-4" />
                <span className="text-[10px] font-bold">128</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

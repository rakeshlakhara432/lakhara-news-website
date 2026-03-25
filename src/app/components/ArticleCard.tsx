import { Link } from "react-router";
import { Clock, Eye, Share2, Bookmark, ChevronRight, User, ShieldCheck, Zap, Activity, Radio, Newspaper, Landmark, Play, Signal } from "lucide-react";
import { Article } from "../services/newsService";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "horizontal" | "small";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const formatDate = (date: any) => {
    if (!date) return "";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString("hi-IN", { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (variant === "small") {
    return (
      <Link to={`/article/${article.slug}`} className="group flex gap-6 items-start py-6 border-b border-white/5 last:border-0 hover:bg-white/5 transition-all rounded-[1.5rem] px-4">
        <div className="size-20 rounded-[1.2rem] shadow-2xl overflow-hidden flex-shrink-0 bg-black border border-white/5 group-hover:border-primary/50">
          <img src={article.imageUrl} alt="" className="size-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-primary">
             <span>SECTOR-X</span>
             <span>•</span>
             <span>{formatDate(article.createdAt)}</span>
          </div>
          <h4 className="text-[14px] font-black text-gray-400 group-hover:text-white transition-colors line-clamp-2 leading-tight uppercase italic tracking-tighter">
            {article.title}
          </h4>
        </div>
      </Link>
    );
  }

  return (
    <div className="group flex flex-col h-full bg-[#0a0f1a] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl hover:shadow-primary/20 transition-all duration-700 active:scale-[0.98] relative">
      <Link to={`/article/${article.slug}`} className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="size-full object-cover group-hover:scale-110 transition-transform duration-[4s] opacity-60 group-hover:opacity-100" 
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0f1a] to-transparent"></div>
        {article.isBreaking && (
          <div className="absolute top-6 left-6 bg-primary text-white px-5 py-2 rounded-full text-[9px] font-black uppercase z-10 animate-pulse shadow-glow border border-white/20">
             LIVE SIGNAL
          </div>
        )}
      </Link>
      
      <div className="p-10 flex-grow flex flex-col justify-between space-y-8">
        <div className="space-y-4">
           <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-gray-600">
              <span className="text-primary font-black italic tracking-[0.4em]">• {article.category}</span>
              <span>{formatDate(article.createdAt)}</span>
           </div>
           <Link to={`/article/${article.slug}`} className="block">
              <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors leading-tight italic uppercase tracking-tighter text-glow">
                {article.title}
              </h3>
           </Link>
           <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed italic font-bold">
              {article.excerpt}
           </p>
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-white/5">
           <div className="flex items-center gap-4">
              <div className="size-12 rounded-[1.2rem] bg-black border border-white/10 flex items-center justify-center text-primary shadow-inner">
                <Signal className="size-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-white leading-none mb-1 uppercase tracking-widest italic">{article.author}</span>
                <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest italic">FIELD OPERATIVE</span>
              </div>
           </div>
           
           <div className="size-12 rounded-[1.2rem] bg-black border border-white/10 flex items-center justify-center text-gray-600 hover:text-primary transition-all shadow-inner">
              <Bookmark className="size-6" />
           </div>
        </div>
      </div>
    </div>
  );
}

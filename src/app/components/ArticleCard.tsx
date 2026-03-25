import { Link } from "react-router";
import { Clock, Eye, Share2, Bookmark, ChevronRight, User, ShieldCheck, Zap, Activity, Radio, Newspaper, Landmark } from "lucide-react";
import { Article } from "../services/newsService";
import { motion } from "framer-motion";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "horizontal" | "small" | "featured";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const formatDate = (date: any) => {
    if (!date) return "";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString("hi-IN", { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatViews = (views: number = 0) => {
    if (views >= 100000) return `${(views / 100000).toFixed(1)}L`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  if (variant === "small") {
    return (
      <Link to={`/article/${article.slug}`} className="group flex gap-4 items-start bg-white p-4 rounded-xl border border-secondary/5 hover:border-primary/20 transition-all hover:shadow-lg active:scale-[0.98]">
        <div className="size-16 rounded-lg overflow-hidden flex-shrink-0 bg-paper-ivory border border-border/50">
          <img src={article.imageUrl} alt="" className="size-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="space-y-1">
          <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">{article.category}</span>
          <h4 className="text-sm font-serif-heritage font-black text-secondary group-hover:text-primary transition-colors line-clamp-2 leading-tight italic">
            {article.title}
          </h4>
          <p className="text-[8px] font-bold text-secondary/30 uppercase tracking-widest">{formatDate(article.createdAt)}</p>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link to={`/article/${article.slug}`} className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white p-6 rounded-2xl border border-secondary/5 hover:border-primary/20 transition-all duration-500 hover:shadow-xl active:scale-[0.99] relative overflow-hidden">
        <div className="md:col-span-5 aspect-[16/10] rounded-xl overflow-hidden relative shadow-sm">
          <img src={article.imageUrl} alt="" className="size-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent"></div>
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-primary text-[8px] font-black uppercase tracking-widest border border-primary/20">
             <Activity className="size-2 inline mr-2 animate-pulse" /> {formatViews(article.views)} PATHAK
          </div>
        </div>
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
               <Newspaper className="size-3 text-primary" />
               <span className="text-[10px] font-black text-primary uppercase tracking-widest">{article.category} Vishesh</span>
             </div>
             <span className="text-[9px] font-bold text-secondary/30 uppercase tracking-widest">{formatDate(article.createdAt)}</span>
          </div>
          <h3 className="text-2xl font-serif-heritage font-black text-secondary group-hover:text-primary transition-colors italic leading-tight uppercase tracking-tighter">
            {article.title}
          </h3>
          <p className="text-secondary/60 text-sm font-medium line-clamp-2 italic leading-relaxed">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-4 pt-2">
             <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <ChevronRight className="size-4" />
             </div>
             <span className="text-xs font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Puri Khabar Padhe</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-secondary/5 hover:border-primary/20 shadow-md hover:shadow-2xl transition-all duration-500 active:scale-[0.98] relative">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="size-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent opacity-60"></div>
        
        {article.isBreaking && (
          <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2 border border-white/20 z-10 animate-pulse">
             <Zap className="size-3" />
             TAZA KHABAR
          </div>
        )}
      </div>
      
      <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
        <div className="space-y-3">
           <div className="flex items-center justify-between text-[9px] font-black border-b border-border pb-2">
              <span className="text-primary uppercase tracking-[0.2em]">{article.category} • VISHESH</span>
              <span className="text-secondary/30 uppercase tracking-widest">{formatDate(article.createdAt)}</span>
           </div>
           <h3 className="text-2xl font-serif-heritage font-black text-secondary group-hover:text-primary transition-colors leading-tight italic uppercase tracking-tighter">
             {article.title}
           </h3>
        </div>

        <div className="flex items-center justify-between pt-4">
           <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner group-hover:scale-110 transition-transform">
                 <Landmark className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-secondary uppercase tracking-widest leading-none mb-1">{article.author}</span>
                <span className="text-[8px] font-bold text-secondary/40 uppercase tracking-widest">Lakhara Samvadata</span>
              </div>
           </div>
           <Bookmark className="size-4 text-secondary/20 hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
}

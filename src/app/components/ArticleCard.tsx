import { Link } from "react-router";
import { Clock, Eye, Share2, Bookmark, ChevronRight, User, ShieldCheck, Zap, Activity, Radio, Newspaper, Landmark, Play } from "lucide-react";
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
      <Link to={`/article/${article.slug}`} className="group flex flex-col gap-4 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-all rounded-xl px-2">
        <div className="aspect-video w-full rounded-lg shadow-sm overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
          <img src={article.imageUrl} alt="" className="size-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
        </div>
        <div className="space-y-2">
          <h4 className="text-[13px] font-black text-secondary group-hover:text-primary transition-colors line-clamp-2 leading-tight uppercase italic">
            {article.title}
          </h4>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest line-clamp-1 italic">
             {article.excerpt}
          </p>
        </div>
      </Link>
    );
  }

  if (variant === "trending") {
    return (
      <Link to={`/article/${article.slug}`} className="group flex gap-4 items-start py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-all rounded px-4">
        <div className="size-16 rounded shadow-sm overflow-hidden flex-shrink-0 bg-secondary border border-gray-200">
          <img src={article.imageUrl} alt="" className="size-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-black text-secondary group-hover:text-primary transition-colors line-clamp-2 leading-tight italic uppercase">
            {article.title}
          </h4>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{formatDate(article.createdAt)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 active:scale-[0.98] relative">
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="size-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] opacity-90 group-hover:opacity-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent"></div>
        {article.isBreaking && (
          <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase z-10 animate-pulse shadow-lg">
             LIVE UPDATE
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
        <div className="space-y-3">
           <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span className="text-primary">• {article.category}</span>
              <span>{formatDate(article.createdAt)}</span>
           </div>
           <h3 className="text-xl font-black text-secondary group-hover:text-primary transition-colors leading-tight italic uppercase tracking-tighter">
             {article.title}
           </h3>
           <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed italic font-medium">
              {article.excerpt}
           </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
           <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-secondary/5 border border-secondary/10 flex items-center justify-center text-secondary">
                <User className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-secondary leading-none mb-1 uppercase tracking-widest">{article.author}</span>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Digital Correspondent</span>
              </div>
           </div>
           <div className="size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 hover:text-primary transition-colors">
              <Bookmark className="size-5" />
           </div>
        </div>
      </div>
    </Link>
  );
}

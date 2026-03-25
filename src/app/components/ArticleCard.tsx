import { Link } from "react-router";
import { Eye, ChevronRight } from "lucide-react";
import { Article } from "../services/newsService";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "horizontal" | "small";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const formatDate = (date: any) => {
    if (!date) return "Momentum";
    const d = date.toDate ? date.toDate() : new Date(date);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just In";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  };

  const formatViews = (views: number = 0) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const articleDate = article.createdAt;

  if (variant === "horizontal") {
    return (
      <Link to={`/article/${article.slug}`} className="group block mb-8 active:scale-[0.98] transition-all">
        <div className="flex gap-6 items-center">
          <div className="w-32 md:w-56 aspect-[4/3] flex-shrink-0 overflow-hidden relative rounded-[2rem] shadow-lg">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="size-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {article.isBreaking && (
              <div className="absolute top-4 left-4 bg-lakhara text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lakhara">
                LIVE
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">{article.category}</span>
               <div className="size-1 bg-gray-200 rounded-full"></div>
               <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{formatDate(articleDate)}</span>
            </div>
            <h3 className="font-black text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight text-xl md:text-2xl italic tracking-tighter">
              {article.title}
            </h3>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1.5 glass bg-gray-100 px-3 py-1 rounded-full border-none">
                  <Eye className="size-3 text-primary" />
                  <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{formatViews(article.views)}</span>
               </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "small") {
    return (
      <Link to={`/article/${article.slug}`} className="group flex gap-5 items-center py-5 active:scale-[0.98] transition-all">
        <div className="w-24 h-24 flex-shrink-0 bg-gray-100 overflow-hidden rounded-[2rem] shadow-sm">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="size-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <h4 className="font-black text-lg text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight italic tracking-tighter">
            {article.title}
          </h4>
          <div className="flex items-center gap-2">
             <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{article.category}</span>
             <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">• {formatDate(articleDate)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className="group block h-full active:scale-[0.98] transition-all">
      <div className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl hover:border-primary/5 border border-gray-100 transition-all duration-500 flex flex-col h-full">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="size-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.1] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="absolute top-6 left-6 flex flex-col items-start gap-2">
            {article.isBreaking && (
              <div className="bg-lakhara text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lakhara border border-white/20">
                CRITICAL
              </div>
            )}
            {article.isTrending && (
              <div className="glass px-4 py-1.5 rounded-full text-white text-[9px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md">
                VIRAL
              </div>
            )}
          </div>
        </div>
        
        <div className="p-10 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-6">
             <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">{article.category}</span>
             <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{formatDate(articleDate)}</span>
          </div>
          
          <h3 className="font-black text-2xl text-gray-900 group-hover:text-primary transition-colors mb-6 line-clamp-3 leading-[1.2] italic tracking-tighter">
            {article.title}
          </h3>
          
          <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="size-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                   <Eye className="size-4" />
                </div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{formatViews(article.views)} Views</span>
             </div>
             
             <div className="size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-45">
                <ChevronRight className="size-5" />
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

import { Link } from "react-router";
import { Clock, Eye, Share2, Bookmark, ChevronRight, User, ShieldCheck, Zap, Activity, Radio, Newspaper, Landmark } from "lucide-react";
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
      <Link to={`/article/${article.slug}`} className="group flex gap-4 items-start py-4 border-b border-border last:border-0 hover:bg-gray-50 transition-all rounded px-3">
        <div className="size-20 rounded shadow-sm overflow-hidden flex-shrink-0 bg-gray-100">
          <img src={article.imageUrl} alt="" className="size-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="space-y-1">
          <span className="badge-news">{article.category}</span>
          <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {article.title}
          </h4>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{formatDate(article.createdAt)}</p>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link to={`/article/${article.slug}`} className="group grid grid-cols-1 md:grid-cols-5 gap-6 p-4 bg-white border border-border rounded-xl hover:shadow-lg transition-all active:scale-[0.99]">
        <div className="md:col-span-2 aspect-video rounded-lg overflow-hidden shadow-sm">
          <img src={article.imageUrl} alt="" className="size-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="md:col-span-3 space-y-3 flex flex-col justify-center">
          <div className="flex items-center gap-3">
             <span className="badge-news">{article.category}</span>
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{formatDate(article.createdAt)}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">
            {article.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className="group flex flex-col bg-white rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500 active:scale-[0.98]">
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="size-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        {article.isBreaking && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded text-[9px] font-bold uppercase z-10 animate-pulse">
             TAZA KHABAR
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
           <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <span className="text-primary">{article.category}</span>
              <span>{formatDate(article.createdAt)}</span>
           </div>
           <h3 className="text-xl font-black text-gray-900 group-hover:text-primary transition-colors leading-tight">
             {article.title}
           </h3>
           <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed italic">
              {article.excerpt}
           </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
           <div className="flex items-center gap-2">
              <User className="size-4 text-gray-300" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-700 leading-none mb-1 uppercase tracking-widest">{article.author}</span>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Lakhara Samvadata</span>
              </div>
           </div>
           <Bookmark className="size-4 text-gray-300 hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
}

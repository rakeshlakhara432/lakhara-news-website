import { Link } from "react-router";
import { Clock, Eye, Share2, Flag, Zap } from "lucide-react";

interface ArticleCardProps {
  article: any;
  variant?: 'default' | 'horizontal' | 'small';
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const formatDate = (date: any) => {
    if (!date) return "";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString("hi-IN", { day: 'numeric', month: 'short' });
  };

  if (variant === 'small') {
    return (
      <Link to={`/article/${article.slug}`} className="group flex gap-4 items-center bg-white p-3 border border-gray-200">
        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 overflow-hidden relative">
          <img src={article.imageUrl} className="size-full object-cover" alt="" />
        </div>
        <div className="flex-grow space-y-1">
           <div className="text-[10px] font-black text-primary uppercase tracking-wider">
              {article.category}
           </div>
           <h3 className="text-sm font-black text-gray-950 line-clamp-2 leading-tight group-hover:text-primary">
             {article.title}
           </h3>
           <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
              <Clock className="size-3" /> {formatDate(article.createdAt)}
           </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link to={`/article/${article.slug}`} className="group flex flex-col md:flex-row gap-5 bg-white p-4 border border-gray-200">
        <div className="w-full md:w-52 h-40 flex-shrink-0 bg-gray-100 overflow-hidden relative">
          <img src={article.imageUrl} className="size-full object-cover" alt="" />
          <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
             विशेष
          </div>
        </div>
        <div className="flex-grow space-y-2">
           <div className="text-[11px] font-black text-primary uppercase tracking-widest">
              {article.category}
           </div>
           <h3 className="text-xl font-black text-gray-950 leading-snug group-hover:text-primary line-clamp-2">
             {article.title}
           </h3>
           <p className="text-gray-500 text-sm font-bold line-clamp-2">{article.excerpt}</p>
           <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 text-[11px] font-black text-gray-950">
                 <div className="size-6 bg-primary text-white flex items-center justify-center text-[10px]">
                    {article.author[0]}
                 </div>
                 {article.author}
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                 <Clock className="size-3" /> {formatDate(article.createdAt)}
              </div>
           </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className="group block space-y-4">
      <div className="relative aspect-[16/9] overflow-hidden border-b-4 border-primary">
        <img src={article.imageUrl} className="size-full object-cover" alt="" />
        <div className="absolute top-0 left-0 bg-primary text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
           {article.isBreaking ? 'विशेष खबर' : article.category}
        </div>
        <div className="absolute bottom-0 inset-x-0 p-4 bg-black/60 text-white text-[11px] font-bold flex justify-between">
           <span className="flex items-center gap-2 font-black"><Clock className="size-3" /> {formatDate(article.createdAt)}</span>
           <span className="flex items-center gap-2"><Eye className="size-3" /> {(article.views / 1000).toFixed(1)}k मुख्य</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-black text-gray-950 leading-tight group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm md:text-base font-bold line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
           <div className="flex items-center gap-3">
              <div className="size-9 bg-gray-100 border border-gray-200 flex items-center justify-center text-primary font-black">
                {article.author[0]}
              </div>
              <div className="flex flex-col">
                 <span className="text-[11px] font-black text-gray-950 uppercase tracking-widest">{article.author}</span>
                 <span className="text-[10px] font-bold text-primary">विशेष संवाददाता</span>
              </div>
           </div>
           <div className="size-9 bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white">
              <Share2 className="size-4" />
           </div>
        </div>
      </div>
    </Link>
  );
}


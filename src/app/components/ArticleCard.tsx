import { Link } from "react-router";
import { Clock, Eye, Share2, Flag, Zap, Sparkles } from "lucide-react";

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
      <Link to={`/article/${article.slug}`} className="group flex gap-4 items-center bg-white p-4 rounded-[2rem] border border-gray-100 shadow-traditional hover:shadow-bhagva transition-all duration-700 hover:rotate-[2deg]">
        <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-[1.2rem] overflow-hidden relative shadow-lg">
          <img src={article.imageUrl} className="size-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="flex-grow space-y-1">
           <div className="flex items-center gap-2 text-[8px] font-black text-primary uppercase tracking-[0.2em]">
              <Zap className="size-3 fill-current" /> {article.category}
           </div>
           <h3 className="text-base md:text-lg font-black text-gray-950 line-clamp-2 leading-tight italic tracking-tighter group-hover:text-primary transition-colors">
             {article.title}
           </h3>
           <div className="flex items-center gap-3 text-[8px] font-black text-gray-300 uppercase italic">
              <Clock className="size-3" /> {formatDate(article.createdAt)}
           </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link to={`/article/${article.slug}`} className="group flex flex-col md:flex-row gap-6 bg-white p-5 rounded-[2.5rem] border border-gray-100 shadow-traditional hover:shadow-bhagva transition-all duration-700">
        <div className="w-full md:w-56 h-48 md:h-40 flex-shrink-0 bg-gray-50 rounded-[2rem] overflow-hidden relative shadow-lg">
          <img src={article.imageUrl} className="size-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
          <div className="absolute top-4 left-4 bg-primary text-white px-5 py-2 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl border border-white/20 skew-x-[-12deg]">
             विशेष
          </div>
        </div>
        <div className="flex-grow space-y-3 py-2">
           <div className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
              <Sparkles className="size-4 fill-current animate-pulse" /> {article.category}
           </div>
           <h3 className="text-xl md:text-2xl font-black text-gray-950 leading-snug italic tracking-tighter group-hover:text-primary transition-colors line-clamp-2">
             {article.title}
           </h3>
           <p className="text-gray-400 text-sm font-bold italic line-clamp-1 opacity-70">{article.excerpt}</p>
           <div className="flex items-center gap-6 pt-2 border-t border-gray-50">
              <div className="flex items-center gap-3 text-[10px] font-black text-gray-950">
                 <div className="size-8 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {article.author[0]}
                 </div>
                 {article.author}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-300 italic">
                 <Clock className="size-3" /> {formatDate(article.createdAt)}
              </div>
           </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className="group block space-y-6 animate-traditional">
      <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-traditional group-hover:shadow-bhagva transition-all duration-700 border-[6px] border-white ring-1 ring-primary/5">
        <img src={article.imageUrl} className="size-full object-cover group-hover:scale-110 transition-transform duration-[3s]" alt="" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-950/80 to-transparent"></div>
        
        {/* Tilak mark overlay */}
        <div className="absolute top-0 right-10 w-4 h-16 bg-primary/80 skew-y-[45deg] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="absolute top-6 left-6 flex gap-3">
          <div className="bg-primary/90 text-white px-5 py-2 rounded-full text-[8px] font-black uppercase tracking-widest backdrop-blur-md shadow-xl border border-white/20 flex items-center gap-2 skew-x-[-12deg]">
             {article.isBreaking ? (
               <><Zap className="size-3 fill-current animate-pulse" /> विशेष खबर</>
             ) : (
               <><Flag className="size-3 fill-current" /> {article.category}</>
             )}
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] font-black text-white uppercase tracking-[0.2em] italic">
           <span className="flex items-center gap-2"><Clock className="size-3" /> {formatDate(article.createdAt)}</span>
           <span className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 group-hover:bg-primary transition-colors"><Eye className="size-3" /> {(article.views / 1000).toFixed(1)}k मुख्य</span>
        </div>
      </div>

      <div className="space-y-3 px-2">
        <h3 className="text-xl md:text-2xl font-black text-gray-950 leading-tight italic tracking-tighter group-hover:text-primary transition-colors border-l-8 border-transparent group-hover:border-primary group-hover:pl-4 transition-all duration-500">
          {article.title}
        </h3>
        <p className="text-gray-500 text-sm md:text-base font-bold italic line-clamp-2 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t-2 border-primary/5">
           <div className="flex items-center gap-3">
              <div className="size-10 bg-primary/5 border border-primary/10 rounded-[1.2rem] flex items-center justify-center text-primary font-black rotate-[-12deg] group-hover:rotate-0 transition-all">
                {article.author[0]}
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-gray-950 uppercase">{article.author}</span>
                 <span className="text-[8px] font-bold text-primary italic">विशेष संवाददाता</span>
              </div>
           </div>
           <div className="size-10 bg-gray-50 rounded-[1.2rem] flex items-center justify-center text-gray-300 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
              <Share2 className="size-5" />
           </div>
        </div>
      </div>
    </Link>
  );
}

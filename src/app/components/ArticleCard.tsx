import { Link } from "react-router";
import { Clock, Eye } from "lucide-react";
import { Article } from "../services/newsService";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "horizontal" | "small";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const formatDate = (date: any) => {
    if (!date) return "Just now";
    const d = date.toDate ? date.toDate() : new Date(date);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "अभी-अभी";
    if (diffInHours < 24) return `${diffInHours} घंटे पहले`;
    return d.toLocaleDateString("hi-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const formatViews = (views: number = 0) => {
    if (views >= 100000) return `${(views / 100000).toFixed(1)}L`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const articleDate = article.createdAt;

  if (variant === "horizontal") {
    return (
      <Link to={`/article/${article.slug}`} className="group">
        <div className="flex gap-4 bg-white rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-50">
          <div className="w-48 h-32 flex-shrink-0 overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="size-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="flex-1 p-5 pr-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
                {article.category}
              </span>
              {article.isBreaking && (
                <span className="text-[10px] font-black text-white bg-red-600 px-3 py-1 rounded-full animate-pulse uppercase tracking-tighter">
                  BREAKING
                </span>
              )}
            </div>
            <h3 className="font-black text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-3 leading-tight">
              {article.title}
            </h3>
            <div className="flex items-center gap-5 text-[11px] font-bold text-gray-400">
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-red-500" />
                {formatDate(articleDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="size-3.5 text-blue-500" />
                {formatViews(article.views)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "small") {
    return (
      <Link to={`/article/${article.slug}`} className="group flex gap-4 items-center">
        <div className="w-24 h-20 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="size-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-black text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-1.5 leading-snug">
            {article.title}
          </h4>
          <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5">
            <Clock className="size-3 text-red-500" />
            {formatDate(articleDate)}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className="group">
      <div className="bg-white rounded-[40px] overflow-hidden hover:shadow-2xl transition-all duration-700 border border-gray-50 flex flex-col h-full">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="size-full object-cover group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {article.isBreaking && (
              <div className="bg-red-600 text-white px-4 py-1.5 text-[10px] font-black rounded-full animate-pulse uppercase tracking-widest shadow-xl">
                BREAKING
              </div>
            )}
            {article.isTrending && (
              <div className="bg-yellow-400 text-gray-900 px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest shadow-xl">
                TRENDING
              </div>
            )}
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <span className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-3 inline-block bg-red-50 self-start px-3 py-1 rounded-full">
            {article.category}
          </span>
          <h3 className="font-black text-xl text-gray-900 group-hover:text-red-600 transition-colors mb-3 line-clamp-2 leading-tight">
            {article.title}
          </h3>
          <p className="text-sm font-bold text-gray-500 line-clamp-2 mb-6 leading-relaxed">{article.excerpt}</p>
          <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between text-[11px] font-black text-gray-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-red-500" />
              {formatDate(articleDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="size-3.5 text-blue-500" />
              {formatViews(article.views)} व्यूज
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

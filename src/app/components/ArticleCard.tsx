import { Link } from "react-router";
import { Clock, Eye } from "lucide-react";
import { Article } from "../data/mockData";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "horizontal" | "small";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const formatViews = (views: number) => {
    if (views >= 100000) return `${(views / 100000).toFixed(1)}L`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  if (variant === "horizontal") {
    return (
      <Link to={`/article/${article.slug}`} className="group">
        <div className="flex gap-4 bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <div className="w-48 h-32 flex-shrink-0 overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-red-600 uppercase">
                {article.category}
              </span>
              {article.isBreaking && (
                <span className="text-xs font-bold text-white bg-red-600 px-2 py-0.5 rounded animate-pulse">
                  BREAKING
                </span>
              )}
            </div>
            <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
              {article.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="size-3" />
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
      <Link to={`/article/${article.slug}`} className="group flex gap-3">
        <div className="w-24 h-20 flex-shrink-0 rounded overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-1">
            {article.title}
          </h4>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="size-3" />
            {formatDate(article.publishedAt)}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {article.isBreaking && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded animate-pulse">
              BREAKING
            </div>
          )}
          {article.isTrending && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 px-3 py-1 text-xs font-bold rounded">
              TRENDING
            </div>
          )}
        </div>
        <div className="p-4">
          <span className="text-xs font-semibold text-red-600 uppercase">
            {article.category}
          </span>
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors mt-2 mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{article.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="size-3" />
              {formatViews(article.views)} views
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

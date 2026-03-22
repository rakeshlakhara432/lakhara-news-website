import { useParams, Link, useNavigate } from "react-router";
import { getArticles } from "../data/mockData";
import { Clock, Eye, Share2, Facebook, Twitter, ArrowLeft } from "lucide-react";
import { ArticleCard } from "../components/ArticleCard";

export function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const articles = getArticles();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <Link to="/" className="text-red-600 hover:underline">
          Return to Homepage
        </Link>
      </div>
    );
  }

  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatViews = (views: number) => {
    if (views >= 100000) return `${(views / 100000).toFixed(1)}L`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="size-5" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article */}
          <div className="lg:col-span-2">
            <article>
              {/* Category and Breaking Badge */}
              <div className="flex items-center gap-3 mb-4">
                <Link
                  to={`/category/${article.category}`}
                  className="text-sm font-semibold text-red-600 uppercase hover:underline"
                >
                  {article.category}
                </Link>
                {article.isBreaking && (
                  <span className="text-sm font-bold text-white bg-red-600 px-3 py-1 rounded animate-pulse">
                    BREAKING NEWS
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
                <span className="font-semibold text-gray-900">By {article.author}</span>
                <span className="flex items-center gap-2">
                  <Clock className="size-4" />
                  {formatDate(article.publishedAt)}
                </span>
                <span className="flex items-center gap-2">
                  <Eye className="size-4" />
                  {formatViews(article.views)} views
                </span>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-semibold text-gray-700 flex items-center gap-2">
                  <Share2 className="size-5" />
                  Share:
                </span>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  <Facebook className="size-4" />
                  Facebook
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600">
                  <Twitter className="size-4" />
                  Twitter
                </button>
              </div>

              {/* Featured Image */}
              <div className="mb-8">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {article.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-6 text-gray-800 leading-relaxed text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-gray-700">Tags:</span>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((relArticle) => (
                    <ArticleCard
                      key={relArticle.id}
                      article={relArticle}
                      variant="small"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Ad Space */}
            <div className="bg-gray-200 rounded-lg p-8 text-center mb-6">
              <p className="text-gray-500">Advertisement</p>
              <div className="h-64 flex items-center justify-center">
                <span className="text-gray-400">Ad Space 300x250</span>
              </div>
            </div>
          </div>
        </div>

        {/* More from this category */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-red-600 pl-4">
              More from {article.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relArticle) => (
                <ArticleCard key={relArticle.id} article={relArticle} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

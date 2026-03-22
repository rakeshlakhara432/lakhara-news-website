import { getArticles, getCategories } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { BreakingNews } from "../components/BreakingNews";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router";

export function HomePage() {
  const articles = getArticles();
  const categories = getCategories();
  
  const breakingNews = articles.filter((a) => a.isBreaking);
  const trendingArticles = articles.filter((a) => a.isTrending).slice(0, 5);
  const latestArticles = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  const featuredArticle = latestArticles[0];
  const topStories = latestArticles.slice(1, 5);
  const moreStories = latestArticles.slice(5, 11);

  return (
    <div>
      <BreakingNews
        items={breakingNews.map((a) => ({ title: a.title, slug: a.slug }))}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Featured Article and Top Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            {featuredArticle && (
              <Link to={`/article/${featuredArticle.slug}`} className="group block">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={featuredArticle.imageUrl}
                      alt={featuredArticle.title}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {featuredArticle.isBreaking && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 text-sm font-bold rounded animate-pulse">
                        BREAKING NEWS
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-sm font-semibold text-red-600 uppercase">
                      {featuredArticle.category}
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 group-hover:text-red-600 transition-colors mt-2 mb-3">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-600 text-lg mb-4">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{featuredArticle.author}</span>
                      <span>•</span>
                      <span>
                        {new Date(featuredArticle.publishedAt).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="size-6 text-red-600" />
              Trending Now
            </h2>
            <div className="space-y-4">
              {trendingArticles.map((article, index) => (
                <div key={article.id} className="flex gap-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded flex items-center justify-center font-bold text-xl">
                    {index + 1}
                  </div>
                  <ArticleCard article={article} variant="small" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Stories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-red-600 pl-4">
            Top Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topStories.map((article) => (
              <ArticleCard key={article.id} article={article} variant="horizontal" />
            ))}
          </div>
        </div>

        {/* Categories Sections */}
        {categories.slice(0, 4).map((category) => {
          const categoryArticles = articles
            .filter((a) => a.category === category.slug)
            .slice(0, 3);

          if (categoryArticles.length === 0) return null;

          return (
            <div key={category.id} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-2xl font-bold text-gray-900 border-l-4 pl-4"
                  style={{ borderColor: category.color }}
                >
                  {category.name}
                </h2>
                <Link
                  to={`/category/${category.slug}`}
                  className="text-red-600 hover:underline font-semibold"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          );
        })}

        {/* More Stories */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-red-600 pl-4">
            More Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreStories.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
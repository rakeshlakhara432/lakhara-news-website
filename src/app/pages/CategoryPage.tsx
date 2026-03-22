import { useParams, Link } from "react-router";
import { getArticles, getCategories } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";

export function CategoryPage() {
  const { category } = useParams();
  const articles = getArticles();
  const categories = getCategories();
  
  const currentCategory = categories.find((c) => c.slug === category);
  const categoryArticles = articles.filter((a) => a.category === category);

  if (!currentCategory) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
        <Link to="/" className="text-red-600 hover:underline">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">{currentCategory.name}</h1>
          <p className="text-gray-300">
            {categoryArticles.length} {categoryArticles.length === 1 ? 'article' : 'articles'} found
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {categoryArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">
              No articles found in this category yet.
            </p>
            <Link to="/" className="text-red-600 hover:underline">
              Browse all news →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

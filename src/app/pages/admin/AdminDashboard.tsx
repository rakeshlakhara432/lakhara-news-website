import { getArticles, getCategories } from "../../data/mockData";
import { FileText, Eye, TrendingUp, FolderOpen } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function AdminDashboard() {
  const articles = getArticles();
  const categories = getCategories();

  const totalArticles = articles.length;
  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const breakingNews = articles.filter((a) => a.isBreaking).length;
  const trendingArticles = articles.filter((a) => a.isTrending).length;

  // Category distribution
  const categoryData = categories.map((cat) => ({
    name: cat.name,
    value: articles.filter((a) => a.category === cat.slug).length,
    color: cat.color,
  }));

  // Views by category
  const viewsByCategory = categories.map((cat) => ({
    name: cat.name,
    views: articles
      .filter((a) => a.category === cat.slug)
      .reduce((sum, a) => sum + a.views, 0),
  })).filter(item => item.views > 0);

  // Top articles
  const topArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // Recent articles
  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  const formatViews = (views: number) => {
    if (views >= 100000) return `${(views / 100000).toFixed(1)}L`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Articles</p>
              <p className="text-3xl font-bold text-gray-900">{totalArticles}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="size-8 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">All published content</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Views</p>
              <p className="text-3xl font-bold text-gray-900">{formatViews(totalViews)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Eye className="size-8 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Cumulative article views</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Breaking News</p>
              <p className="text-3xl font-bold text-gray-900">{breakingNews}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <TrendingUp className="size-8 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Active breaking stories</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Categories</p>
              <p className="text-3xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FolderOpen className="size-8 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Total content categories</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Views by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={viewsByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => formatViews(Number(value))} />
              <Bar dataKey="views" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Articles by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Performing Articles</h2>
          <div className="space-y-3">
            {topArticles.map((article, index) => (
              <div key={article.id} className="flex items-start gap-3 pb-3 border-b border-gray-200 last:border-0">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 line-clamp-2 text-sm">
                    {article.title}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-gray-500">{article.category}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Eye className="size-3" />
                      {formatViews(article.views)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Articles</h2>
          <div className="space-y-3">
            {recentArticles.map((article) => (
              <div key={article.id} className="pb-3 border-b border-gray-200 last:border-0">
                <p className="font-semibold text-gray-900 line-clamp-2 text-sm mb-1">
                  {article.title}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">{article.category}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString("en-IN")}
                  </span>
                  {article.isBreaking && (
                    <span className="text-xs font-bold text-white bg-red-600 px-2 py-0.5 rounded">
                      BREAKING
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { getArticles, getCategories } from "../../data/mockData";
import { FileText, Eye, TrendingUp, FolderOpen, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function AdminDashboard() {
  const articles = getArticles();
  const categories = getCategories();

  const totalArticles = articles.length;
  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const breakingNews = articles.filter((a) => a.isBreaking).length;
  const trendingArticles = articles.filter((a) => a.isTrending).length;
  const communityUsers = JSON.parse(localStorage.getItem("community_users") || "[]");
  const totalUsers = communityUsers.length;

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

  const formatViews = (views: number) => {
    if (views >= 10000) return `${(views / 10000).toFixed(1)}W`; // Hindi Style W (Wan)
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <FileText className="size-6" />
            </div>
          </div>
          <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Total Articles</p>
          <p className="text-3xl font-black text-gray-900">{totalArticles}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-50 p-3 rounded-xl text-green-600">
              <Eye className="size-6" />
            </div>
          </div>
          <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Total Views</p>
          <p className="text-3xl font-black text-gray-900">{formatViews(totalViews)}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-50 p-3 rounded-xl text-red-600">
              <TrendingUp className="size-6" />
            </div>
          </div>
          <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Trending News</p>
          <p className="text-3xl font-black text-gray-900">{trendingArticles}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
              <FolderOpen className="size-6" />
            </div>
          </div>
          <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Categories</p>
          <p className="text-3xl font-black text-gray-900">{categories.length}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-50 p-3 rounded-xl text-orange-600">
              <Users className="size-6" />
            </div>
          </div>
          <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Community Members</p>
          <p className="text-3xl font-black text-gray-900">{totalUsers}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Views by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={viewsByCategory}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="views" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Article Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Articles</h2>
          <div className="space-y-4">
            {topArticles.map((article, index) => (
              <div key={article.id} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="size-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center font-black text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900 line-clamp-1">{article.title}</p>
                    <p className="text-xs text-gray-500">{article.category}</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="font-black text-sm text-gray-900">{formatViews(article.views)}</p>
                   <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Latest Community Members</h2>
          <div className="space-y-4">
            {communityUsers.length === 0 ? (
              <div className="text-center py-10">
                 <p className="text-gray-400 font-bold italic">No users registered yet.</p>
              </div>
            ) : (
              communityUsers.slice(-5).reverse().map((u: any, i: number) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="size-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-400 text-lg uppercase">
                      {u.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{u.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold">{u.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                     <span className="text-[10px] font-black bg-green-50 text-green-600 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                        Active
                     </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

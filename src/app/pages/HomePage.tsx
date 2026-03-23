import { useState, useEffect } from "react";
import { categories, getYouTubeSettings } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { BreakingNews } from "../components/BreakingNews";
import { TrendingUp, Loader2, Play, ChevronRight, Zap } from "lucide-react";
import { Link } from "react-router";
import { newsService, Article } from "../services/newsService";

export function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = newsService.subscribeToArticles((data) => {
      setArticles(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="size-16 animate-spin text-red-600" />
      </div>
    );
  }
  
  const breakingNews = articles.filter((a) => a.isBreaking);
  const trendingArticles = [...articles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);
    
  const latestArticles = articles;
  
  const featuredArticle = latestArticles[0];
  const topStories = latestArticles.slice(1, 5);
  const moreStories = latestArticles.slice(5, 11);

  const formatDate = (date: any) => {
    if (!date) return "";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString("hi-IN", { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      <BreakingNews
        items={breakingNews.map((a) => ({ title: a.title, slug: a.slug }))}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Featured Article and Top Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          <div className="lg:col-span-2 space-y-8">
            {featuredArticle && (
              <Link to={`/article/${featuredArticle.slug}`} className="group block">
                <div className="bg-white rounded-[50px] overflow-hidden shadow-2xl hover:shadow-red-100 transition-all duration-700 border border-gray-50">
                  <div className="relative overflow-hidden aspect-[16/9]">
                    <img
                      src={featuredArticle.imageUrl}
                      alt={featuredArticle.title}
                      className="size-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute top-6 left-6 flex gap-3">
                      {featuredArticle.isBreaking && (
                        <div className="bg-red-600 text-white px-6 py-2 text-xs font-black rounded-full animate-pulse shadow-xl tracking-widest uppercase">
                          BREAKING
                        </div>
                      )}
                      <div className="bg-white/20 backdrop-blur-md text-white px-6 py-2 text-xs font-black rounded-full uppercase tracking-widest border border-white/30">
                         {featuredArticle.category}
                      </div>
                    </div>

                    <div className="absolute bottom-8 left-8 right-8">
                        <h2 className="text-4xl md:text-5xl font-black text-white group-hover:text-red-400 transition-colors mb-4 leading-tight drop-shadow-2xl">
                          {featuredArticle.title}
                        </h2>
                        <p className="text-gray-200 text-lg font-bold line-clamp-2 max-w-2xl mb-6">
                          {featuredArticle.excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm font-black text-gray-300 uppercase tracking-widest">
                          <span className="flex items-center gap-2">
                             <div className="size-2 bg-red-500 rounded-full"></div>
                             {featuredArticle.author}
                          </span>
                          <span>{formatDate(featuredArticle.createdAt)}</span>
                        </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="bg-white rounded-[50px] p-8 shadow-xl border border-gray-50 h-fit">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                 <Zap className="size-8 text-yellow-400 fill-yellow-400" />
                 ट्रेंडिंग खबरें
               </h2>
               <Link to="/category/trending" className="size-10 bg-gray-50 text-gray-400 hover:text-red-600 rounded-2xl flex items-center justify-center transition-all">
                  <ChevronRight className="size-6" />
               </Link>
            </div>
            
            <div className="space-y-8">
              {trendingArticles.map((article, index) => (
                <div key={article.id} className="relative group">
                  <div className="absolute -left-4 top-0 text-5xl font-black text-gray-50 group-hover:text-red-50 transition-colors pointer-events-none italic">
                    {index + 1}
                  </div>
                  <ArticleCard article={article} variant="small" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Stories */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-gray-900 flex items-center gap-4">
              <div className="w-2 h-10 bg-red-600 rounded-full"></div>
              प्रमुख समाचार
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
            <div key={category.id} className="mb-20">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-black text-gray-900 flex items-center gap-4">
                  <div className="w-2 h-10 rounded-full" style={{ backgroundColor: category.color }}></div>
                  {category.name}
                </h2>
                <Link
                  to={`/category/${category.slug}`}
                  className="px-6 py-2 bg-white border border-gray-100 text-gray-500 hover:text-red-600 hover:border-red-100 rounded-full text-sm font-black transition-all shadow-sm"
                >
                  सभी देखें
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {categoryArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          );
        })}

        {/* Video News / YouTube Gallery */}
        <div className="mb-20 bg-gray-900 rounded-[60px] p-12 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/5 blur-[120px]"></div>
          
          <div className="flex items-center justify-between mb-12 relative z-10">
            <div className="flex items-center gap-6">
              <div className="size-16 bg-red-600 text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-red-900/40">
                <Play className="size-8 fill-current" />
              </div>
              <div>
                 <h2 className="text-4xl font-black text-white mb-1">वीडियो गैलरी</h2>
                 <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">ताज़ा वीडियो अपडेट्स</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
            <div className="lg:col-span-2 aspect-video bg-black rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/5 relative group">
              <iframe
                className="size-full"
                src={`https://www.youtube.com/embed/${getYouTubeSettings().liveVideoId}?autoplay=0&mute=1`}
                title="YouTube Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <div className="absolute top-6 left-6 bg-red-600 text-white px-6 py-2 rounded-full text-xs font-black flex items-center gap-3 shadow-xl">
                <span className="size-2 bg-white rounded-full animate-ping"></span>
                LIVE NOW
              </div>
            </div>
            
            <div className="space-y-6">
              {getYouTubeSettings().favoriteVideos.slice(0, 3).map((video) => (
                <div key={video.id} className="group cursor-pointer flex gap-4 items-center">
                  <div className="w-32 h-20 flex-shrink-0 bg-gray-800 rounded-2xl overflow-hidden relative">
                    <img 
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                      alt={video.title}
                      className="size-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Play className="size-6 text-white group-hover:scale-125 transition-transform" />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-300 line-clamp-2 group-hover:text-white transition-colors leading-snug">
                    {video.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* More Stories */}
        <div>
          <div className="flex items-center justify-between mb-10">
             <h2 className="text-3xl font-black text-gray-900 flex items-center gap-4">
               <div className="w-2 h-10 bg-gray-200 rounded-full"></div>
               अन्य खबरें
             </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {moreStories.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
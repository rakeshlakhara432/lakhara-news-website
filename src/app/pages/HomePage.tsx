import { useState, useEffect } from "react";
import { categories, getYouTubeSettings } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { BreakingNews } from "../components/BreakingNews";
import { TrendingUp, Loader2, Play, ChevronRight, Zap, Tv } from "lucide-react";
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
        <div className="flex flex-col items-center gap-6">
           <div className="size-20 bg-lakhara rounded-[2.5rem] flex items-center justify-center shadow-lakhara animate-bounce rotate-[-10deg]">
              <Zap className="size-10 text-white fill-current" />
           </div>
           <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }
  
  const breakingNews = articles.filter((a) => a.isBreaking);
  const trendingArticles = [...articles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);
    
  const featuredArticle = articles[0];
  const topStories = articles.slice(1, 4);

  const formatDate = (date: any) => {
    if (!date) return "";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString("hi-IN", { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-32">
      <div className="pt-8 mb-12">
        <BreakingNews
          items={breakingNews.map((a) => ({ title: a.title, slug: a.slug }))}
        />
      </div>

      <div className="container mx-auto px-4 md:px-0 space-y-24">
        {/* ── Featured Command Center ── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           {featuredArticle && (
             <div className="lg:col-span-2 group relative h-full">
               <Link to={`/article/${featuredArticle.slug}`} className="block h-full">
                 <div className="relative h-full min-h-[500px] md:min-h-[600px] rounded-[3.5rem] overflow-hidden shadow-2xl group/card border border-gray-100">
                    <img
                      src={featuredArticle.imageUrl}
                      alt={featuredArticle.title}
                      className="absolute inset-0 size-full object-cover group-hover/card:scale-105 transition-transform duration-1000 grayscale-[0.2] group-hover/card:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    
                    <div className="absolute top-10 left-10 flex items-center gap-4">
                       <div className="bg-lakhara text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] shadow-lakhara shadow-primary/20">
                          FEATURED HQ
                       </div>
                    </div>

                    <div className="absolute bottom-12 left-12 right-12">
                       <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-10 group-hover/card:text-primary transition-colors duration-500 leading-tight">
                          {featuredArticle.title}
                       </h1>
                       <div className="flex items-center gap-6">
                          <div className="size-16 rounded-[2rem] bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover/card:bg-lakhara transition-all duration-500">
                             <ChevronRight className="size-10 text-white" />
                          </div>
                          <div className="space-y-1">
                             <p className="text-white font-black text-sm uppercase tracking-widest">{featuredArticle.author}</p>
                             <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">{formatDate(featuredArticle.createdAt)}</p>
                          </div>
                       </div>
                    </div>
                 </div>
               </Link>
             </div>
           )}

           <div className="flex flex-col gap-8 h-full">
              {topStories.map(story => (
                <Link key={story.id} to={`/article/${story.slug}`} className="flex-1 group">
                   <div className="h-full bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-primary/10 transition-all duration-500 flex flex-col justify-between group active:scale-[0.98]">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">{story.category}</span>
                           <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{formatDate(story.createdAt)}</span>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors leading-tight italic">
                           {story.title}
                        </h3>
                      </div>
                      <div className="mt-8 flex items-center gap-3">
                         <div className="size-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
                         <span className="text-[10px] font-black text-gray-400 group-hover:text-gray-900 transition-colors uppercase tracking-[0.4em]">Read Full Article</span>
                      </div>
                   </div>
                </Link>
              ))}

              <Link to="/explore" className="btn-lakhara flex items-center justify-center gap-4 !bg-gray-950 !shadow-none !rounded-[2.5rem] py-8 group">
                 <span className="tracking-[0.2em]">EXPLORE NETWORK</span>
                 <TrendingUp className="size-6 text-primary group-hover:scale-125 transition-transform" />
              </Link>
           </div>
        </section>

        {/* ── Lakhara TV Container ── */}
        <section className="bg-gray-950 rounded-[4.5rem] p-10 md:p-20 overflow-hidden relative border border-white/5 shadow-3xl shadow-primary/5">
           <div className="absolute top-0 right-0 size-[800px] bg-primary/10 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2"></div>
           
           <div className="relative z-10 flex flex-col xl:flex-row gap-20">
              <div className="xl:w-2/5 space-y-12">
                 <div className="flex items-center gap-6">
                    <div className="size-16 bg-lakhara rounded-[2rem] flex items-center justify-center rotate-[-12deg] shadow-lakhara">
                       <Tv className="size-10 text-white" />
                    </div>
                    <div>
                       <h2 className="text-5xl font-black text-white italic tracking-tighter">LAKHARA <span className="text-gradient">TV</span></h2>
                       <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">Digital Satellite Broadcasting</p>
                    </div>
                 </div>

                 <p className="text-gray-400 text-2xl font-medium leading-relaxed italic">
                   "Broadcasting the live reality of the nation directly into your digital space."
                 </p>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/5 text-center group hover:bg-white/10 transition-all cursor-pointer">
                       <div className="text-primary font-black text-4xl mb-2">24/7</div>
                       <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Digital Satellite</div>
                    </div>
                    <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/5 text-center group hover:bg-white/10 transition-all cursor-pointer">
                       <div className="flex justify-center mb-2">
                          <div className="size-4 bg-red-600 rounded-full animate-ping"></div>
                       </div>
                       <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Global Live Feed</div>
                    </div>
                 </div>

                 <Link to="/live" className="btn-lakhara flex items-center justify-center gap-4 py-8 !rounded-[2.5rem]">
                   START BROADCAST <Play className="size-5 fill-current" />
                 </Link>
              </div>

              <div className="xl:w-3/5">
                 <div className="relative aspect-video rounded-[4rem] overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/10">
                    <iframe
                      className="size-full"
                      src={`https://www.youtube.com/embed/${getYouTubeSettings().liveVideoId}?autoplay=0&mute=1`}
                      title="YouTube Video"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                    <div className="absolute top-10 left-10 glass px-8 py-3 rounded-full flex items-center gap-4">
                       <div className="size-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(255,49,49,1)]"></div>
                       <span className="text-white text-[10px] font-black uppercase tracking-widest">Live Operations Feed</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* ── Trending Section ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
           <div className="md:col-span-1 lg:col-span-1 space-y-12">
              <div className="space-y-2 border-l-8 border-lakhara pl-8">
                 <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">Trending</h2>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Operations</p>
              </div>
              <div className="space-y-6">
                 {trendingArticles.map((article, index) => (
                   <Link key={article.id} to={`/article/${article.slug}`} className="block group">
                      <div className="flex gap-8 items-center p-6 rounded-[2rem] hover:bg-gray-50 transition-all active:scale-[0.98]">
                         <span className="text-5xl font-black text-gray-100 group-hover:text-primary transition-colors italic">0{index + 1}</span>
                         <h4 className="text-lg font-black text-gray-900 group-hover:text-primary transition-all line-clamp-2 leading-tight">
                           {article.title}
                         </h4>
                      </div>
                   </Link>
                 ))}
              </div>
           </div>

           <div className="md:col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-10">
              {articles.slice(4, 10).map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
           </div>
        </section>

        {/* ── Visual News Categories ── */}
        <section className="space-y-32">
          {categories.slice(0, 3).map((category) => {
            const categoryArticles = articles
              .filter((a) => a.category === category.slug)
              .slice(0, 4);

            if (categoryArticles.length === 0) return null;

            return (
              <div key={category.id}>
                <div className="flex items-center justify-between mb-16 px-4 md:px-0">
                   <div className="flex items-center gap-8">
                      <div className="w-4 h-12 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter italic">{category.name}</h2>
                   </div>
                   <Link to={`/category/${category.slug}`} className="glass px-10 py-4 rounded-[2rem] text-gray-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-primary transition-all border border-gray-100">
                      Channel Stream
                   </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4 md:px-0">
                  {categoryArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
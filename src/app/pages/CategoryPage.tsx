import { useParams, Link } from "react-router";
import { getArticles, getCategories } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { Sparkles, Globe, Filter, Signal, Zap, ChevronRight, ArrowLeft } from "lucide-react";

export function CategoryPage() {
  const { category } = useParams();
  const articles = getArticles();
  const categories = getCategories();
  
  const currentCategory = categories.find((c) => c.slug === category);
  const categoryArticles = articles.filter((a) => a.category === category);

  if (!currentCategory) {
    return (
      <div className="container mx-auto px-6 py-40 text-center space-y-12 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="size-24 bg-gray-100 rounded-[3rem] flex items-center justify-center text-gray-400">
           <Zap className="size-12" />
        </div>
        <div className="space-y-4">
           <h1 className="text-6xl font-black text-gray-950 dark:text-white italic tracking-tighter uppercase leading-none mb-4">SECTOR <span className="text-gradient">NULL</span></h1>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.6em]">The requested intelligence channel is currently offline.</p>
        </div>
        <Link to="/" className="btn-lakhara !rounded-[2rem] !px-16 !py-6 !text-lg">
          RETURN TO HQ
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] dark:bg-gray-950 min-h-screen">
      
      {/* ── Premium Category Header ── */}
      <div className="container mx-auto px-6 py-20 space-y-20">
         
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="space-y-8">
               <Link to="/" className="group flex items-center gap-4 text-gray-400 hover:text-primary transition-all">
                  <ArrowLeft className="size-5 group-hover:-translate-x-2 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Abort Sector</span>
               </Link>
               <div className="flex items-center gap-10">
                  <div className="size-24 rounded-[3rem] flex items-center justify-center shadow-2xl rotate-[-12deg] relative group" style={{ backgroundColor: currentCategory.color }}>
                     <Sparkles className="size-12 text-white group-hover:scale-110 transition-transform" />
                     <div className="absolute inset-x-0 -bottom-4 h-2 bg-black/10 blur-xl rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                     <h1 className="text-7xl md:text-9xl font-black text-gray-950 dark:text-white italic tracking-tighter uppercase leading-none group">
                       {currentCategory.name} <span className="text-gradient">SOURCE</span>
                     </h1>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-[1em] ml-2">Channel Operational Feed</p>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-12 text-gray-400 font-black text-[10px] uppercase tracking-widest border-l border-gray-100 dark:border-white/5 pl-12 h-24">
               <div>
                  <p className="text-4xl text-gray-950 dark:text-white italic font-black leading-none mb-1">{categoryArticles.length}</p>
                  <p className="tracking-[0.4em]">Active Signals</p>
               </div>
               <div className="size-2 bg-green-500 rounded-full animate-ping"></div>
            </div>
         </div>

         {/* ── Content Grid ── */}
         <div className="space-y-24">
            {categoryArticles.length === 0 ? (
              <div className="text-center py-48 border border-dashed border-gray-100 dark:border-white/5 rounded-[4rem] bg-gray-50/50 dark:bg-white/5 space-y-10">
                <div className="size-32 bg-white dark:bg-gray-950 rounded-[3.5rem] flex items-center justify-center shadow-xl mx-auto border border-gray-50 dark:border-white/5">
                   <Signal className="size-16 text-gray-200" />
                </div>
                <div>
                   <h2 className="text-3xl font-black italic tracking-tighter uppercase text-gray-900 dark:text-white mb-4">No Transmissions Logged</h2>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">This sector is temporarily silent.</p>
                </div>
              </div>
            ) : (
              <>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-32">
                    {categoryArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                 </div>
                 
                 {/* Sidebar-style widgets at bottom for mobile/desktop recovery */}
                 <div className="border-t border-gray-100 dark:border-white/5 pt-24 grid grid-cols-1 lg:grid-cols-2 gap-20 pb-40">
                    <div className="bg-gray-950 rounded-[4rem] p-16 text-white relative overflow-hidden group border border-white/10">
                       <div className="absolute top-0 right-0 size-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                       <div className="relative z-10 space-y-10">
                          <div className="space-y-4">
                             <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Global Network <span className="text-primary">Alerts</span></h3>
                             <p className="text-gray-500 text-lg font-medium italic">Push notifications for {currentCategory.name} critical updates.</p>
                          </div>
                          <button className="btn-lakhara !rounded-[2rem] w-full !py-8 !text-base group">
                             ESTABLISH PUSH LINK <ChevronRight className="size-6 group-hover:translate-x-2 transition-transform" />
                          </button>
                       </div>
                    </div>

                    <div className="bg-white dark:bg-white/5 rounded-[4rem] p-16 border border-gray-100 dark:border-white/10 space-y-10 shadow-sm">
                       <div className="flex items-center gap-6">
                          <div className="size-16 bg-gray-50 dark:bg-gray-950 rounded-2xl flex items-center justify-center text-primary border border-gray-100 dark:border-white/5">
                             <Globe className="size-8" />
                          </div>
                          <div>
                             <h3 className="text-3xl font-black italic tracking-tighter uppercase text-gray-950 dark:text-white leading-none">Network Channels</h3>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mt-3">Cross-Sector Intelligence</p>
                          </div>
                       </div>
                       <div className="flex flex-wrap gap-3 pt-6">
                          {categories.filter(c => c.slug !== category).map(c => (
                            <Link key={c.id} to={`/category/${c.slug}`} className="px-8 py-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-gray-500 hover:text-primary hover:border-primary/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                               {c.name}
                            </Link>
                          ))}
                       </div>
                    </div>
                 </div>
              </>
            )}
         </div>

      </div>
    </div>
  );
}

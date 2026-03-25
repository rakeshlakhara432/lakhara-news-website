import { useParams, Link } from "react-router";
import { getArticles, getCategories } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { motion } from "motion/react";
import { Sparkles, Globe, Filter } from "lucide-react";

export function CategoryPage() {
  const { category } = useParams();
  const articles = getArticles();
  const categories = getCategories();
  
  const currentCategory = categories.find((c) => c.slug === category);
  const categoryArticles = articles.filter((a) => a.category === category);

  if (!currentCategory) {
    return (
      <div className="container mx-auto px-4 py-32 text-center bg-[#020617] h-screen">
        <h1 className="text-4xl font-black text-white italic tracking-tighter mb-4 uppercase">FRAGMENT NOT FOUND</h1>
        <p className="text-slate-500 mb-8 font-black uppercase tracking-widest text-xs">The requested sector could not be reached.</p>
        <Link to="/" className="px-8 py-3 bg-primary text-slate-900 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform inline-block">
          Return to Core
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 pb-32"
    >
      {/* 🚀 CINEMATIC CATEGORY HEADER */}
      <div className="relative h-[25vh] min-h-[250px] flex items-end overflow-hidden rounded-[3rem] mb-16">
         <div className="absolute inset-0 bg-[#0B0E14]">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
         </div>
         
         <div className="relative z-10 p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full animate-pulse" style={{backgroundColor: currentCategory.color}}></div>
                  <span className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em]">Sector Identified</span>
               </div>
               <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">
                 {currentCategory.name}
               </h1>
            </div>
            
            <div className="flex items-center gap-8 text-slate-500 font-black text-[10px] uppercase tracking-widest">
               <div className="text-right">
                  <p className="text-2xl text-white italic tracking-tighter">{categoryArticles.length}</p>
                  <p>Intel Streams</p>
               </div>
               <div className="size-16 border border-white/10 rounded-2xl flex items-center justify-center">
                  <Filter className="size-6" />
               </div>
            </div>
         </div>
      </div>

      {/* 🚀 DATA FEED */}
      <div className="container mx-auto px-4">
        {categoryArticles.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/5 rounded-[3rem] bg-white/[0.02]">
            <Globe className="size-20 text-white/5 mx-auto mb-8" />
            <p className="text-xl text-slate-500 italic font-black uppercase tracking-widest">
              No active intel streams detected in this sector.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {categoryArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

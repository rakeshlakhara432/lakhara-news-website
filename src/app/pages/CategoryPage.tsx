import { useParams, Link } from "react-router";
import { getArticles, getCategories } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";
import { Sparkles, Globe, Filter, Signal, Zap, ChevronRight, ArrowLeft, ArrowRight, Flag } from "lucide-react";

export function CategoryPage() {
  const { category } = useParams();
  const articles = getArticles();
  const categories = getCategories();
  
  const currentCategory = categories.find((c) => c.slug === category);
  const categoryArticles = articles.filter((a) => a.category === category);

  if (!currentCategory) {
    return (
      <div className="container mx-auto px-6 py-40 text-center space-y-12 min-h-[80vh] flex flex-col items-center justify-center bg-white">
        <div className="size-32 bg-gray-950 text-primary flex items-center justify-center border-4 border-primary">
           <Flag className="size-16" />
        </div>
        <div className="space-y-4">
           <h1 className="text-6xl md:text-8xl font-black text-gray-950 tracking-tighter uppercase leading-none italic border-l-8 border-primary pl-8">शून्य <span className="text-primary italic">अनुभाग</span></h1>
           <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.8em] italic">THE REQUESTED SIGNAL IS UNREACHABLE.</p>
        </div>
        <Link to="/" className="px-16 py-6 bg-primary text-white font-black text-xl uppercase tracking-[0.4em] hover:bg-gray-950 transition-colors border-none outline-none">
          मुख्य पृष्ठ पर लौटें
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-32">
      
      {/* ── BOLD CATEGORY HEADER ── */}
      <div className="container mx-auto px-6 py-20 max-w-7xl pt-12">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b-8 border-primary pb-20">
            <div className="space-y-12">
               <Link to="/" className="group flex items-center gap-6 text-gray-400 hover:text-primary transition-colors">
                  <div className="size-16 bg-white border-4 border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors shadow-bhagva-flat">
                    <ArrowLeft className="size-8" />
                  </div>
                  <span className="text-xl font-black uppercase tracking-[0.4em] italic leading-none border-b-2 border-transparent group-hover:border-primary pb-1">पीछे जाएँ</span>
               </Link>
               <div className="flex items-center gap-10">
                  <div className="size-32 bg-gray-950 text-white flex items-center justify-center border-8 border-primary shadow-2xl relative group">
                     <Sparkles className="size-14 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="space-y-4">
                     <h1 className="text-5xl md:text-8xl font-black text-gray-950 italic tracking-tighter uppercase leading-none border-l-[16px] border-primary pl-8">
                       {currentCategory.name} <span className="text-primary italic">अनुभाग</span>
                     </h1>
                     <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.8em] ml-2 italic">DIGITAL NEWS MATRIX PORTAL</p>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-12 text-gray-400 bg-gray-950 p-12 border-b-[12px] border-primary h-40 group">
               <div className="space-y-1">
                  <p className="text-6xl text-white italic font-black leading-none">{categoryArticles.length}</p>
                  <p className="tracking-[0.4em] text-[10px] text-primary font-black uppercase italic">सक्रिय खबरें</p>
               </div>
               <div className="size-4 bg-primary animate-pulse border-2 border-white"></div>
            </div>
         </div>

         {/* ── CONTENT FLOW ── */}
         <div className="pt-24 space-y-32">
            {categoryArticles.length === 0 ? (
              <div className="text-center py-40 bg-gray-50 border-8 border-dashed border-gray-100 space-y-12">
                <div className="size-40 bg-white border-4 border-gray-100 flex items-center justify-center mx-auto shadow-xl">
                   <Signal className="size-20 text-gray-200" />
                </div>
                <div className="space-y-4">
                   <h2 className="text-4xl font-black italic tracking-tighter uppercase text-gray-950 leading-none">सूचना अप्राप्त</h2>
                   <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.6em] italic">CURRENTLY NO SIGNALS DETECTED IN THIS SECTOR.</p>
                </div>
              </div>
            ) : (
              <>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                 </div>
                 
                 {/* 🚀 CATEGORY NAVIGATION MATRIX */}
                 <div className="pt-32 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-primary p-16 text-white border-b-[20px] border-gray-950 space-y-12 group transition-colors">
                       <div className="space-y-6">
                          <h3 className="text-5xl font-black italic tracking-tighter uppercase leading-none border-l-8 border-white pl-8">पुश <span className="text-gray-950 italic">सूचना</span></h3>
                          <p className="text-white/90 text-2xl font-black italic leading-relaxed uppercase tracking-widest border-b-2 border-white/20 pb-8 mt-8">"पाएं {currentCategory.name} की ताजतरीन खबरें सीधे अपने मोबाइल पर।"</p>
                       </div>
                       <button className="w-full py-8 bg-white text-primary font-black text-2xl uppercase tracking-[0.4em] hover:bg-gray-950 hover:text-white transition-all border-none outline-none italic flex items-center justify-center gap-6 shadow-xl">
                          अलर्ट शुरू करें <ArrowRight className="size-8" />
                       </button>
                    </div>

                    <div className="bg-white p-16 border-[12px] border-gray-100 space-y-12 group hover:border-primary transition-colors">
                       <div className="flex items-center gap-8 pb-10 border-b-4 border-gray-50">
                          <div className="size-20 bg-gray-950 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors border-4 border-white shadow-bhagva-flat">
                             <Globe className="size-10" />
                          </div>
                          <div>
                             <h3 className="text-4xl font-black italic tracking-tighter uppercase text-gray-950 leading-none">अन्य <span className="text-primary italic">विषय</span></h3>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.6em] mt-3 italic">DIVERSITY OF NEWS PORTALS</p>
                          </div>
                       </div>
                       <div className="flex flex-wrap gap-3">
                          {categories.filter(c => c.slug !== category).map(c => (
                            <Link key={c.id} to={`/category/${c.slug}`} className="px-10 py-5 bg-gray-50 text-gray-500 hover:text-white hover:bg-primary border-2 border-transparent font-black uppercase tracking-[0.3em] text-[10px] transition-all italic">
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

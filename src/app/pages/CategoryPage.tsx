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
      <div className="container mx-auto px-6 py-40 text-center space-y-12 min-h-[80vh] flex flex-col items-center justify-center animate-traditional">
        <div className="size-32 bg-gray-100 rounded-[4rem] flex items-center justify-center text-primary/10">
           <Flag className="size-16" />
        </div>
        <div className="space-y-4">
           <h1 className="text-7xl font-black text-gray-950 italic tracking-tighter uppercase leading-none mb-4">SECTOR <span className="text-primary">NULL</span></h1>
           <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.8em]">the requested signal is unreachable.</p>
        </div>
        <Link to="/" className="btn-ai-primary !bg-primary !px-16 !py-6 !text-lg !rounded-[2.5rem] shadow-bhagva">
          मुख्य पृष्ठ पर लौटें
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDFB] min-h-screen animate-traditional relative overflow-hidden">
      <div className="absolute inset-0 mandala-bg z-0 opacity-10"></div>
      
      {/* ── TRADITIONAL CATEGORY HEADER ── */}
      <div className="container mx-auto px-6 py-20 max-w-7xl relative z-10">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="space-y-10">
               <Link to="/" className="group flex items-center gap-4 text-gray-500 hover:text-primary transition-all active:scale-95">
                  <div className="size-12 bg-white border border-gray-100 rounded-[1.5rem] flex items-center justify-center group-hover:bg-primary group-hover:text-white shadow-traditional group-hover:shadow-bhagva transition-all rotate-[-12deg] group-hover:rotate-0">
                    <ArrowLeft className="size-6" />
                  </div>
                  <span className="text-base font-black uppercase tracking-[0.3em] italic">पीछे जाएँ</span>
               </Link>
               <div className="flex items-center gap-10">
                  <div className="size-24 rounded-[3rem] flex items-center justify-center shadow-bhagva rotate-[-12deg] relative border-[6px] border-white group" style={{ background: `linear-gradient(135deg, ${currentCategory.color} 0%, rgba(255,255,255,0.2) 100%)` }}>
                     <Sparkles className="size-10 text-white group-hover:scale-125 transition-transform duration-700" />
                  </div>
                  <div className="space-y-3">
                     <h1 className="text-5xl md:text-7xl font-black text-gray-950 italic tracking-tighter uppercase leading-none group">
                       {currentCategory.name} <span className="text-primary underline decoration-primary/10 decoration-6 underline-offset-[-6px]">प्रवाह</span>
                     </h1>
                     <p className="text-[10px] font-black text-primary opacity-40 uppercase tracking-[0.8em] ml-2">सटीक समाचार अनुभाग</p>
                  </div>
               </div>
            </div>

            <div className="hidden md:flex items-center gap-12 text-gray-400 font-black text-[10px] uppercase tracking-widest bg-white p-8 rounded-[3rem] border border-gray-100 shadow-traditional h-32 transform hover:scale-105 hover:shadow-bhagva transition-all relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-2 h-full bg-primary group-hover:w-full group-hover:opacity-5 transition-all duration-[1s]"></div>
               <div className="relative z-10">
                  <p className="text-5xl text-gray-950 italic font-black leading-none mb-1">{categoryArticles.length}</p>
                  <p className="tracking-[0.4em] text-[8px] opacity-50">सक्रिय खबरें</p>
               </div>
               <div className="size-3 bg-primary rounded-full animate-ping relative z-10"></div>
            </div>
         </div>

         {/* ── Content Matrix ── */}
         <div className="pt-20 space-y-24 relative z-10">
            {categoryArticles.length === 0 ? (
              <div className="text-center py-40 border-4 border-dashed border-gray-100 rounded-[4rem] bg-white shadow-sm space-y-10">
                <div className="size-32 bg-gray-50 rounded-[4rem] flex items-center justify-center shadow-xl mx-auto border border-gray-100 group-hover:rotate-12 transition-transform">
                   <Signal className="size-16 text-gray-200" />
                </div>
                <div>
                   <h2 className="text-3xl font-black italic tracking-tighter uppercase text-gray-950 mb-3 leading-none">कोई जानकारी उपलब्ध नहीं</h2>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.6em]">वर्तमान में इस क्षेत्र से कोई संकेत नहीं मिल रहा है।</p>
                </div>
              </div>
            ) : (
              <>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-32">
                    {categoryArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                 </div>
                 
                 {/* Reusable Category Navigation Matrix */}
                 <div className="pt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 pb-32">
                    <div className="bg-primary rounded-[4rem] p-12 text-white relative overflow-hidden group shadow-2xl border-[12px] border-white ring-1 ring-primary/10">
                       <div className="absolute inset-0 mandala-bg opacity-10"></div>
                       <div className="relative z-10 space-y-10">
                          <div className="space-y-4">
                             <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none">पुश <span className="text-secondary">अलर्ट</span></h3>
                             <p className="text-primary-foreground text-lg font-bold italic opacity-80 leading-relaxed">पाएं {currentCategory.name} की ताजतरीन खबरें सीधे अपने मोबाइल पर।</p>
                          </div>
                          <button className="btn-ai-primary !bg-white !text-primary !rounded-[2rem] w-full py-6 text-lg group shadow-2xl transition-all">
                             अलर्ट शुरू करें <ArrowRight className="size-6 ml-4 group-hover:translate-x-4 transition-transform" />
                          </button>
                       </div>
                    </div>

                    <div className="bg-white rounded-[4rem] p-12 shadow-bhagva border border-gray-100 space-y-10 group transition-all duration-700 hover:rotate-[-2deg]">
                       <div className="flex items-center gap-6 pb-8 border-b-2 border-gray-50">
                          <div className="size-16 bg-primary/5 rounded-[2rem] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                             <Globe className="size-8" />
                          </div>
                          <div>
                             <h3 className="text-3xl font-black italic tracking-tighter uppercase text-gray-950 leading-none">अन्य सक्रिय <span className="text-primary">धारा</span></h3>
                             <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.4em] mt-2">विभिन्न समाचार अनुभाग</p>
                          </div>
                       </div>
                       <div className="flex flex-wrap gap-4">
                          {categories.filter(c => c.slug !== category).map(c => (
                            <Link key={c.id} to={`/category/${c.slug}`} className="px-8 py-4 bg-gray-50 text-gray-600 hover:text-white hover:bg-primary rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all shadow-sm hover:shadow-bhagva border-2 border-transparent hover:border-white/10 italic">
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

import { Link } from "react-router";
import { Home, Zap, ArrowRight, Flag, ShieldAlert } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFDFB] flex items-center justify-center px-10 animate-traditional relative overflow-hidden">
      <div className="absolute inset-0 mandala-bg z-0 opacity-10"></div>
      
      <div className="max-w-5xl w-full text-center space-y-20 relative z-10">
        <div className="relative inline-block group">
           <div className="text-[18rem] md:text-[25rem] font-black text-primary/5 italic tracking-tighter leading-none group-hover:text-primary transition-colors duration-2000 opacity-20 group-hover:opacity-10 scale-110">
             404
           </div>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-48 md:size-64 bg-white rounded-[5rem] shadow-bhagva border-8 border-white flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-[3s] ease-in-out">
                 <Flag className="size-24 md:size-32 text-primary animate-pulse" />
              </div>
           </div>
        </div>

        <div className="space-y-10">
           <h2 className="text-6xl md:text-9xl font-black text-gray-950 italic tracking-tighter uppercase leading-none drop-shadow-xl">
              खबर <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-[-10px]">अप्राप्य</span>
           </h2>
           <p className="text-gray-400 text-2xl md:text-3xl font-black italic max-w-2xl mx-auto opacity-80 leading-relaxed border-b-4 border-primary/5 pb-10">
              यह कोना अभी खाली है। लगता है आप सत्य की खोज में थोड़ा भटक गए हैं।
           </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
           <Link
             to="/"
             className="w-full sm:w-auto btn-ai-primary !bg-primary !px-20 !py-8 !text-2xl !rounded-[3rem] shadow-bhagva group flex items-center justify-center gap-6 active:scale-95 transition-all"
           >
             <Home className="size-8 group-hover:scale-125 transition-transform" />
             मुख्य पृष्ठ
           </Link>
           <button 
             onClick={() => window.history.back()}
             className="w-full sm:w-auto px-20 py-8 border-8 border-gray-100 rounded-[3rem] text-gray-400 font-extrabold text-2xl hover:text-primary hover:border-primary/20 transition-all active:scale-95 italic flex items-center justify-center gap-4 uppercase tracking-[0.2em] shadow-sm"
           >
             पीछे मुड़ें <ArrowRight className="size-8" />
           </button>
        </div>

        <div className="pt-24">
           <div className="flex justify-center gap-6">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="size-5 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

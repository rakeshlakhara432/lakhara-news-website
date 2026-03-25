import { Zap, Share2, Radio, Activity, Landmark, Newspaper } from "lucide-react";
import { Link } from "react-router";

interface BreakingNewsItem {
  title: string;
  slug: string;
}

interface BreakingNewsProps {
  items: BreakingNewsItem[];
}

export function BreakingNews({ items }: BreakingNewsProps) {
  if (items.length === 0) return null;

  return (
    <div className="relative group overflow-hidden bg-white/5 py-3 border-y border-white/10 backdrop-blur-md">
      <div className="container mx-auto flex items-center gap-10">
        {/* Ticker Label */}
        <div className="flex-shrink-0 relative z-10 flex items-center gap-3 bg-primary text-white px-4 py-1.5 rounded-full shadow-lg transform transition-all duration-500 hover:scale-105 active:scale-95 group-hover:rotate-1">
           <Landmark className="size-4 text-white animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">TAZA SAMCHAR</span>
        </div>

        {/* Marquee Content */}
        <div className="flex-grow overflow-hidden relative">
          <div className="flex items-center gap-24 py-1 animate-marquee hover:[animation-play-state:paused]">
             {[...items, ...items, ...items].map((item, index) => (
               <Link 
                 key={index} 
                 to={`/article/${item.slug}`} 
                 className="flex items-center gap-12 group/item transition-all whitespace-nowrap"
               >
                 <div className="flex items-center gap-4">
                    <div className="size-2 rounded-full bg-white opacity-40 group-hover/item:opacity-100 transition-opacity animate-pulse" />
                    <span className="text-sm font-black text-white group-hover/item:text-primary transition-colors leading-none tracking-tight uppercase">
                       {item.title}
                    </span>
                 </div>
                 <div className="text-white/20 font-black tracking-widest text-[8px]">• SAMVADATA •</div>
               </Link>
             ))}
          </div>

          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent z-5 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent z-5 pointer-events-none"></div>
        </div>

        <div className="hidden lg:flex items-center gap-10 pl-10 border-l border-white/20">
           <div className="flex items-center gap-3">
              <div className="size-2 bg-primary rounded-full animate-ping"></div>
              <span className="text-white/40 font-black text-[9px] uppercase tracking-widest whitespace-nowrap">NETWORK ACTIVE</span>
           </div>
           <button className="text-white/20 hover:text-white transition-colors active:scale-90 bg-transparent border-none cursor-pointer">
             <Share2 className="size-4" />
           </button>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}

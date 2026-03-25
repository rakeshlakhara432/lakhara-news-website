import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { Link } from "react-router";

interface BreakingNewsItem {
  title: string;
  slug: string;
}

interface BreakingNewsProps {
  items: BreakingNewsItem[];
}

export function BreakingNews({ items }: BreakingNewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className="bg-black text-white border-b border-white/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-0">
          <div className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 font-black text-xs uppercase tracking-[0.2em] flex-shrink-0 italic relative">
            <Radio className="size-4 animate-pulse" />
            Breaking
            <div className="absolute top-0 -right-4 h-full w-4 bg-red-600 transform skew-x-12"></div>
          </div>
          <div className="flex-1 overflow-hidden ml-8">
            <Link
              to={`/article/${items[currentIndex].slug}`}
              className="block group"
            >
              <p className="font-bold text-sm md:text-base transition-all duration-500 hover:text-red-500 truncate py-3">
                <span className="text-red-600 mr-3 font-black">●</span>
                {items[currentIndex].title}
              </p>
            </Link>
          </div>
          <div className="hidden md:flex gap-2 ml-4">
             <button 
               onClick={() => setCurrentIndex(prev => (prev - 1 + items.length) % items.length)}
               className="p-3 hover:bg-white/10 transition-colors"
             >
               <div className="size-1.5 border-l-2 border-t-2 border-white rotate-[-45deg]"></div>
             </button>
             <button 
               onClick={() => setCurrentIndex(prev => (prev + 1) % items.length)}
               className="p-3 hover:bg-white/10 transition-colors"
             >
               <div className="size-1.5 border-r-2 border-t-2 border-white rotate-[45deg]"></div>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Landmark, ArrowRight } from "lucide-react";
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
    <div className="bg-primary text-white py-2 px-4 border-y border-primary">
      <div className="container mx-auto flex items-center gap-4">
        {/* Ticker Label */}
        <div className="flex-shrink-0 flex items-center gap-2 bg-white text-primary px-3 py-1 font-black text-[11px] uppercase tracking-wider">
           <Landmark className="size-3" />
           <span>ताज़ा खबर</span>
        </div>

        {/* Static News Item (Latest) */}
        <div className="flex-grow overflow-hidden">
           <Link 
             to={`/article/${items[0].slug}`} 
             className="flex items-center gap-3 hover:underline"
           >
             <span className="text-sm font-bold truncate">
                {items[0].title}
             </span>
             <ArrowRight className="size-3 flex-shrink-0" />
           </Link>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[10px] font-bold">
           <span>नेटवर्क: सक्रिय</span>
        </div>
      </div>
    </div>
  );
}

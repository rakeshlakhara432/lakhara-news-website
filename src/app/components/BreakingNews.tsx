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
    <div className="bg-red-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 py-3">
          <div className="flex items-center gap-2 bg-white text-red-600 px-4 py-1 rounded font-bold flex-shrink-0">
            <Radio className="size-4 animate-pulse" />
            BREAKING NEWS
          </div>
          <div className="flex-1 overflow-hidden">
            <Link
              to={`/article/${items[currentIndex].slug}`}
              className="block hover:underline"
            >
              <p className="animate-pulse font-semibold truncate">
                {items[currentIndex].title}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

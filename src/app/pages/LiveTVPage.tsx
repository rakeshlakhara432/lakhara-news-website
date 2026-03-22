import { Tv, Radio } from "lucide-react";
import { getArticles } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";

export function LiveTVPage() {
  const articles = getArticles();
  const latestNews = articles.slice(0, 6);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-red-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Radio className="size-8 animate-pulse" />
            <h1 className="text-4xl font-bold">LIVE TV</h1>
          </div>
          <p className="text-red-100">24/7 Live News Coverage</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center mb-6">
              <div className="text-center text-white">
                <Tv className="size-20 mx-auto mb-4 opacity-50" />
                <p className="text-2xl font-bold mb-2">LIVE STREAM</p>
                <p className="text-gray-400">
                  Live TV streaming would be integrated here
                </p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="size-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="text-red-500 font-semibold">LIVE NOW</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About Live Coverage
              </h2>
              <p className="text-gray-700 mb-4">
                Watch our 24/7 live news coverage bringing you the latest updates from
                around the country and the world. Our expert journalists and anchors
                keep you informed about breaking news, politics, sports, entertainment,
                and more.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-1">News Bulletins</h3>
                  <p className="text-sm text-gray-600">Every hour</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-1">Special Coverage</h3>
                  <p className="text-sm text-gray-600">Major events</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-1">Expert Analysis</h3>
                  <p className="text-sm text-gray-600">Daily shows</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-1">Live Debates</h3>
                  <p className="text-sm text-gray-600">Prime time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Latest News */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Latest News</h3>
              <div className="space-y-4">
                {latestNews.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="small" />
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-gray-50 rounded-lg p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                {[
                  { time: "06:00 AM", show: "Morning News Bulletin" },
                  { time: "09:00 AM", show: "Business Today" },
                  { time: "12:00 PM", show: "Afternoon Headlines" },
                  { time: "03:00 PM", show: "Special Report" },
                  { time: "06:00 PM", show: "Evening News" },
                  { time: "09:00 PM", show: "Prime Time Debate" },
                  { time: "11:00 PM", show: "Night Bulletin" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 pb-3 border-b border-gray-200 last:border-0"
                  >
                    <span className="font-bold text-red-600 text-sm min-w-[80px]">
                      {item.time}
                    </span>
                    <span className="text-gray-700 text-sm">{item.show}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

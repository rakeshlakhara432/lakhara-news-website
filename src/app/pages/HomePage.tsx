import { useState, useEffect } from "react";
import { 
  Radio, ChevronRight, Users, Heart, 
  Calendar, ShieldCheck, Play, Newspaper, ArrowRight,
  Activity
} from "lucide-react";
import { Link } from "react-router";
import { samajService, NewsPost, VideoPost } from "../services/samajService";

export function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState<NewsPost[]>([]);
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [memberCount, setMemberCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const unsub1 = samajService.subscribeToSamajNews(data => setNews(data.slice(0, 3)));
    const unsub2 = samajService.subscribeToMembers(data => setMemberCount(data.length));
    const unsub3 = samajService.subscribeToEvents(data => setEventCount(data.length));
    const unsub4 = samajService.subscribeToVideos(data => setVideos(data));
    
    const timer = setTimeout(() => setIsLoading(false), 300);
    
    return () => {
      unsub1(); unsub2(); unsub3(); unsub4();
      clearTimeout(timer);
    };
  }, []);

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    let vidId = "";
    try {
      if (url.includes("v=")) vidId = url.split("v=")[1].split("&")[0];
      else if (url.includes("youtu.be/")) vidId = url.split("youtu.be/")[1].split("?")[0];
      else if (url.includes("/shorts/")) vidId = url.split("/shorts/")[1].split("?")[0];
      else if (url.includes("/live/")) vidId = url.split("/live/")[1].split("?")[0];
      else if (url.includes("/embed/")) return url;
      else return url;
      return `https://www.youtube.com/embed/${vidId}?rel=0&modestbranding=1&controls=1`;
    } catch {
      return url;
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-orange-600">
           <Activity className="size-10 animate-spin" />
           <span className="text-lg font-medium">लोड हो रहा है...</span>
        </div>
      </div>
    );
  }

  const quickLinks = [
    { label: "पंजीकरण", slug: "register", icon: Radio, bg: "bg-orange-50", text: "text-orange-600" },
    { label: "विवाह मंच", slug: "matrimonial", icon: Heart, bg: "bg-rose-50", text: "text-rose-600" },
    { label: "सदस्य सूची", slug: "directory", icon: Users, bg: "bg-blue-50", text: "text-blue-600" },
    { label: "समाचार", slug: "news", icon: Newspaper, bg: "bg-emerald-50", text: "text-emerald-600" },
  ];

  const liveVideo = videos.find(v => v.isLive) || videos[0];
  const latestAnnouncement = news[0] || {
    title: "लखारा समाज का आगामी वार्षिक मिलन समारोह और सांस्कृतिक कार्यक्रम 2026 की घोषणा",
    content: "समाज के सभी बंधुओं को सूचित किया जाता है कि आगामी मास में होने वाले 'महासम्मेलन' की तैयारियां शुरू हो चुकी हैं। अधिक जानकारी के लिए नोटिस बोर्ड देखें।",
    category: "सूचना"
  };

  return (
    <div className="space-y-16 pb-24">
      
      {/* HERO SECTION */}
      <section className="relative bg-slate-900 overflow-hidden">
         <img 
           src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2000" 
           className="absolute inset-0 size-full object-cover opacity-10" 
           alt="News Room" 
         />
         <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
         <div className="relative container mx-auto px-6 py-24 md:py-32 flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-600/10 px-4 py-1.5 text-sm font-semibold text-orange-400 border border-orange-600/20">
               <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-orange-500"></span>
               </span>
               डिजिटल संवाद • राष्ट्रभक्ति ही सर्वोपरि
            </span>
            <div className="max-w-3xl space-y-4">
               <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  Lakhara Digital <br /> <span className="text-orange-500">News Network</span>
               </h1>
               <p className="text-lg md:text-xl text-slate-300 font-medium">
                  "राष्ट्र का स्वाभिमान, समाज की गौरवशाली परम्परा।" <br/>
                  एक मंच जहां समाज की हर आवाज़ को मिलता है डिजिटल विस्तार।
               </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4">
               <Link to="/news" className="rounded-lg bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors">
                  समाचार पढ़ें
               </Link>
               <Link to="/register" className="rounded-lg bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
                  नेटवर्क से जुड़ें
               </Link>
            </div>
         </div>
      </section>

      {/* QUICK ACTIONS */}
      <div className="container mx-auto px-6">
         <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {quickLinks.map((link, i) => (
               <Link key={i} to={`/${link.slug}`} className="group flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all hover:border-orange-500/30">
                  <div className={`p-4 rounded-full ${link.bg} ${link.text} group-hover:scale-110 transition-transform`}>
                     <link.icon className="size-6 md:size-8" />
                  </div>
                  <div className="text-center">
                     <h3 className="text-base md:text-lg font-bold text-slate-800">{link.label}</h3>
                  </div>
               </Link>
            ))}
         </section>
      </div>

      {/* LIVE BROADCAST */}
      {liveVideo && (
        <div className="container mx-auto px-6">
           <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 p-6 md:p-8">
                  <div className="space-y-1">
                     <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                        लाइव प्रसारण <span className="flex size-3 rounded-full bg-red-500 animate-pulse"></span>
                     </h2>
                     <p className="text-sm font-medium text-slate-500">Lakhara Digital Studio Live</p>
                  </div>
               </div>
               <div className="relative aspect-video lg:aspect-[21/9] bg-slate-900">
                   <iframe 
                     className="size-full"
                     src={getEmbedUrl(liveVideo.videoUrl)}
                     title={liveVideo.title}
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                     allowFullScreen
                   ></iframe>
               </div>
           </section>
        </div>
      )}

      {/* LATEST UPDATES & STATS */}
      <div className="container mx-auto px-6">
         <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 flex flex-col gap-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800">ताज़ा सुर्खियाँ</h2>
                  <Link to="/news" className="text-sm font-semibold text-orange-600 hover:text-orange-500 flex items-center gap-1">
                     सभी देखें <ChevronRight className="size-4" />
                  </Link>
               </div>
               
               <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm relative overflow-hidden h-full">
                  <div className="absolute -right-4 -top-4 opacity-[0.03]">
                     <Newspaper className="size-48" />
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-orange-600 uppercase tracking-wider relative z-10">
                     <span className="size-2 rounded-full bg-orange-600"></span>
                     फ्लैश न्यूज़
                  </div>
                  <div className="space-y-4 relative z-10 flex-1">
                     <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                        {latestAnnouncement.title}
                     </h3>
                     <p className="text-slate-600 text-base leading-relaxed line-clamp-3">
                        {latestAnnouncement.content}
                     </p>
                  </div>
                  <div className="relative z-10 pt-4">
                     <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold bg-orange-50 text-orange-700 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors">
                        विस्तृत जानकारी <ArrowRight className="size-4" />
                     </Link>
                  </div>
               </div>
            </div>

            {/* NETWORK INTEL */}
            <div className="flex flex-col gap-6">
               <h2 className="text-2xl md:text-3xl font-bold text-slate-800">नेटवर्क प्रगति</h2>
               <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm h-full">
                  
                  <div className="flex items-center gap-4">
                     <div className="rounded-xl bg-orange-50 p-4 text-orange-600">
                        <Users className="size-8" />
                     </div>
                     <div>
                        <p className="text-3xl font-extrabold text-slate-800">{memberCount}+</p>
                        <p className="text-sm font-medium text-slate-500">सक्रिय सदस्य</p>
                     </div>
                  </div>

                  <div className="h-px w-full bg-slate-100"></div>

                  <div className="flex items-center gap-4">
                     <div className="rounded-xl bg-blue-50 p-4 text-blue-600">
                        <Calendar className="size-8" />
                     </div>
                     <div>
                        <p className="text-3xl font-extrabold text-slate-800">{eventCount}+</p>
                        <p className="text-sm font-medium text-slate-500">कुल आयोजन</p>
                     </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100">
                     <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                        <ShieldCheck className="size-5" />
                        प्रमाणित सदस्य नेटवर्क
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>

      {/* CALL TO ACTION */}
      <div className="container mx-auto px-6">
         <section className="rounded-3xl bg-orange-600 p-8 md:p-16 text-center shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
               <h2 className="text-3xl md:text-4xl font-extrabold text-white">शक्ति बनें समाज की</h2>
               <p className="text-orange-100 text-lg md:text-xl font-medium">
                  पंजीकरण करें और समाज के हर महत्वपूर्ण निर्णय और सूचना से सीधे डिजिटल प्लेटफॉर्म के माध्यम से जुड़ें।
               </p>
               <div className="pt-4">
                  <Link to="/register" className="inline-block rounded-xl bg-white px-8 py-4 text-lg font-bold text-orange-600 shadow hover:bg-slate-50 transition-colors">
                     अभी जुड़ें
                  </Link>
               </div>
            </div>
         </section>
      </div>
    </div>
  );
}
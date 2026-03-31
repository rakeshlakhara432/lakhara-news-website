import { useState, useEffect } from "react";
import { 
  TrendingUp, Radio, ChevronRight, Users, Heart, 
  Calendar, Star, Clock, ArrowRight,
  ShieldCheck, Play
} from "lucide-react";
import { Link } from "react-router";
import { samajService, NewsPost, Member, SamajEvent, VideoPost } from "../services/samajService";

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
    
    const timer = setTimeout(() => setIsLoading(false), 500);
    
    return () => {
      unsub1(); unsub2(); unsub3(); unsub4();
      clearTimeout(timer);
    };
  }, []);

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    let vidId = "";
    try {
      if (url.includes("v=")) {
        vidId = url.split("v=")[1].split("&")[0];
      } else if (url.includes("youtu.be/")) {
        vidId = url.split("youtu.be/")[1].split("?")[0];
      } else if (url.includes("/shorts/")) {
        vidId = url.split("/shorts/")[1].split("?")[0];
      } else if (url.includes("/live/")) {
        vidId = url.split("/live/")[1].split("?")[0];
      } else if (url.includes("/embed/")) {
        return url;
      } else {
        return url;
      }
      return `https://www.youtube.com/embed/${vidId}?rel=0&modestbranding=1&controls=1`;
    } catch (e) {
      return url;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
           <span className="text-4xl font-black text-primary tracking-tighter">LAKHARA</span>
           <span className="text-[12px] font-black text-gray-950 uppercase tracking-widest">DIGITAL NEWS</span>
        </div>
      </div>
    );
  }

  const quickLinks = [
    { label: "पंजीकरण", slug: "register", icon: Radio, color: "bg-primary text-white" },
    { label: "विवाह मंच", slug: "matrimonial", icon: Heart, color: "bg-gray-100 text-primary" },
    { label: "सदस्य सूची", slug: "directory", icon: Users, color: "bg-gray-100 text-primary" },
    { label: "सहायता", slug: "support", icon: Star, color: "bg-gray-100 text-primary" },
  ];

  const liveVideo = videos.find(v => v.isLive) || videos[0];

  const latestAnnouncement = news[0] || {
    title: "लखारा समाज का आगामी वार्षिक मिलन समारोह और सांस्कृतिक कार्यक्रम 2026 की घोषणा",
    content: "समाज के सभी बंधुओं को सूचित किया जाता है कि आगामी मास में होने वाले 'महासम्मेलन' की तैयारियां शुरू हो चुकी हैं। अधिक जानकारी के लिए नोटिस बोर्ड देखें।",
    category: "सूचना"
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* 🏛️ SIMPLE HERO */}
      <section className="relative h-[400px] md:h-[500px] bg-gray-900 overflow-hidden border-b-8 border-primary">
         <img 
           src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2000" 
           className="size-full object-cover opacity-40" 
           alt="News Room" 
         />
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 space-y-6">
            <div className="bg-primary text-white px-6 py-2 font-black text-[12px] uppercase tracking-widest border border-white/20">
               डिजिटल संवाद - डिजिटल समाचार
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase">
               LAKHARA DIGITAL <br/> NEWS NETWORK
            </h1>
            <p className="text-white/90 max-w-2xl text-lg md:text-xl font-bold">
               समाज का सबसे शक्तिशाली डिजिटल समाचार मंच।
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
               <Link to="/news" className="px-10 py-4 bg-white text-gray-950 font-black text-xs tracking-widest uppercase border border-white">समाचार पढ़ें</Link>
               <Link to="/register" className="px-10 py-4 bg-primary text-white font-black text-xs tracking-widest uppercase border border-primary">नेटवर्क से जुड़ें</Link>
            </div>
         </div>
      </section>

      {/* ⚡ QUICK ACTIONS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-0">
         {quickLinks.map((link, i) => (
            <Link key={i} to={`/${link.slug}`} className="p-6 bg-white border border-gray-200 text-center space-y-4 hover:border-primary">
               <div className={`size-12 md:size-16 mx-auto ${link.color} flex items-center justify-center border border-gray-100`}>
                  <link.icon className="size-6 md:size-8" />
               </div>
               <h3 className="text-sm md:text-lg font-black text-gray-950 tracking-tighter uppercase">{link.label}</h3>
            </Link>
         ))}
      </section>

      {/* 📺 LIVE BROADCAST */}
      {liveVideo && (
        <section className="space-y-8">
           <div className="flex items-center justify-between border-l-8 border-primary pl-6">
               <h2 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tighter uppercase">
                  लाइव <span className="text-primary">प्रसारण</span>
               </h2>
               <Link to="/news" className="text-[11px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-2">डिजिटल स्टूडियो <Play className="size-4" /></Link>
            </div>

            <div className="relative aspect-video lg:aspect-[21/9] bg-black border-4 border-gray-100">
                <iframe 
                  className="size-full"
                  src={getEmbedUrl(liveVideo.videoUrl)}
                  title={liveVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
                
                {liveVideo.isLive && (
                  <div className="absolute top-4 left-4 flex items-center gap-3 bg-red-600 text-white px-4 py-1.5 font-black text-[10px] uppercase tracking-widest">
                    <Radio className="size-4" /> LIVE NOW
                  </div>
                )}
            </div>
        </section>
      )}

      {/* 📢 LATEST UPDATES */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between border-l-8 border-primary pl-6">
               <h2 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tighter uppercase">
                  ताज़ा <span className="text-primary">सुर्खियाँ</span>
               </h2>
               <Link to="/news" className="text-[11px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-2">सभी देखें <ChevronRight className="size-4" /></Link>
            </div>
            
            <div className="bg-white border border-gray-200 p-8 space-y-6">
               <div className="flex items-center gap-3 text-primary">
                  <Clock className="size-5" />
                  <span className="text-[11px] font-black uppercase tracking-widest">आज की मुख्य सूचना</span>
               </div>
               <h3 className="text-xl md:text-2xl font-black text-gray-950 uppercase leading-snug">
                  {latestAnnouncement.title}
               </h3>
               <p className="text-gray-600 font-bold leading-relaxed text-sm">
                  {latestAnnouncement.content}
               </p>
               <Link to="/news" className="inline-flex items-center gap-4 bg-gray-950 text-white px-8 py-3 font-black text-[11px] uppercase tracking-widest border border-gray-950">
                  विवरण देखें <ArrowRight className="size-4" />
               </Link>
            </div>
         </div>

         {/* 📊 STATS */}
         <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tighter uppercase">
               नेटवर्क <span className="text-primary">डाटा</span>
            </h2>
            <div className="p-8 bg-gray-950 text-white border-t-8 border-primary space-y-8 flex flex-col justify-center">
                <div className="space-y-8">
                   <div className="flex items-center gap-6">
                      <div className="size-12 bg-white/10 flex items-center justify-center text-primary border border-white/5">
                         <Users className="size-6" />
                      </div>
                      <div>
                         <p className="text-3xl font-black">{memberCount}+</p>
                         <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1">कुल सदस्य</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="size-12 bg-white/10 flex items-center justify-center text-primary border border-white/5">
                         <Calendar className="size-6" />
                      </div>
                      <div>
                         <p className="text-3xl font-black">{eventCount}+</p>
                         <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1">कुल कार्यक्रम</p>
                      </div>
                   </div>
                   <div className="pt-6 border-t border-white/10">
                      <div className="flex items-center gap-3 text-primary text-[11px] font-black uppercase tracking-widest">
                         <ShieldCheck className="size-4" /> 100% सत्यापित डाटा
                      </div>
                   </div>
                </div>
            </div>
         </div>
      </section>

      {/* 🚀 CTA */}
      <section className="bg-primary p-12 text-center space-y-8 border-b-8 border-gray-950">
         <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">समाज की शक्ति बनें</h2>
            <p className="text-white/90 font-bold text-sm md:text-lg max-w-2xl mx-auto">
               "पंजीकरण करें और समाज के हर महत्वपूर्ण निर्णय और सूचना से सीधे जुड़ें।"
            </p>
         </div>
         <div className="flex justify-center">
            <Link to="/register" className="px-12 py-4 bg-white text-primary font-black text-sm uppercase tracking-widest border border-white">
               अभी जुड़ें
            </Link>
         </div>
      </section>

    </div>
  );
}
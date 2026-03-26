import { useState, useEffect } from "react";
import { 
  TrendingUp, Radio, ChevronRight, Flag, Users, Heart, 
  Calendar, Image as ImageIcon, Phone, Info, MessageCircle, 
  Star, Sparkles, LayoutGrid, Clock, MapPin, ArrowRight,
  Megaphone, ShieldCheck, Bookmark, Loader2
} from "lucide-react";
import { Link } from "react-router";
import { samajService, NewsPost, Member, SamajEvent } from "../services/samajService";

export function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState<NewsPost[]>([]);
  const [memberCount, setMemberCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const unsub1 = samajService.subscribeToSamajNews(data => setNews(data.slice(0, 3)));
    const unsub2 = samajService.subscribeToMembers(data => setMemberCount(data.length));
    const unsub3 = samajService.subscribeToEvents(data => setEventCount(data.length));
    
    // Simulating loading state
    const timer = setTimeout(() => setIsLoading(false), 800);
    
    return () => {
      unsub1(); unsub2(); unsub3();
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-white/50 backdrop-blur-3xl">
        <div className="flex flex-col items-center gap-6 animate-pulse">
          <Flag className="size-12 text-primary" />
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.8em] italic">लखारा समाज पोर्टल</p>
        </div>
      </div>
    );
  }

  const quickLinks = [
    { label: "पजीकरण", slug: "register", icon: Radio, color: "bg-primary text-white" },
    { label: "विवाह मंच", slug: "matrimonial", icon: Heart, color: "bg-red-50 text-red-600" },
    { label: "सदस्य सूची", slug: "directory", icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "सहायता", slug: "support", icon: Star, color: "bg-amber-50 text-amber-600" },
  ];

  const latestAnnouncement = news[0] || {
    title: "लखारा समाज का आगामी वार्षिक मिलन समारोह और सांस्कृतिक कार्यक्रम 2026 की घोषणा",
    content: "समाज के सभी बंधुओं को सूचित किया जाता है कि आगामी मास में होने वाले 'महासम्मेलन' की तैयारियां शुरू हो चुकी हैं। अधिक जानकारी के लिए नोटिस बोर्ड देखें।",
    category: "सूचना"
  };

  return (
    <div className="space-y-24 pb-32 animate-in fade-in duration-1000">
      
      {/* 🏛️ SAMAJ INTRODUCTION HERO */}
      <section className="relative h-[500px] md:h-[600px] rounded-[4rem] overflow-hidden group shadow-bhagva border-[6px] border-white ring-1 ring-primary/5">
         <img 
           src="https://images.unsplash.com/photo-1590133322241-8c9356ff5668?auto=format&fit=crop&q=80&w=2000" 
           className="size-full object-cover group-hover:scale-110 transition-transform duration-[10s]" 
           alt="Temple" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 space-y-6">
            <div className="bg-primary/20 backdrop-blur-3xl text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-white/20 mb-8">
               ॥ संघे शक्तिः कलौ युगे ॥
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter drop-shadow-2xl leading-tight">
               स्वागत है <span className="text-primary group-hover:text-secondary transition-colors duration-1000">लखारा समाज</span> <br/> डिजिटल पोर्टल पर
            </h1>
            <p className="text-white/70 max-w-2xl text-sm md:text-lg font-bold italic drop-shadow-lg">
               “एकता, संस्कृति और प्रगति का नया डिजिटल मंच। समाज के विकास और संगठन को डिजिटल धागे से जोड़ने का संकल्प।”
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-12">
               <Link to="/about" className="px-10 py-4 bg-white text-gray-950 font-black rounded-2xl hover:bg-primary hover:text-white transition-all text-xs tracking-widest uppercase shadow-2xl">हमारा इतिहास</Link>
               <Link to="/register" className="px-10 py-4 bg-primary text-white font-black rounded-2xl hover:bg-secondary transition-all text-xs tracking-widest uppercase shadow-2xl">समाज से जुड़ें</Link>
            </div>
         </div>
      </section>

      {/* ⚡ QUICK ACTIONS (SAMAJ FEATURES) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {quickLinks.map((link, i) => (
           <Link key={i} to={`/${link.slug}`} className="group p-8 bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all hover:-translate-y-2 text-center space-y-4">
              <div className={`size-16 mx-auto ${link.color} rounded-[2rem] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                 <link.icon className="size-8" />
              </div>
              <div>
                 <h3 className="text-lg font-black text-gray-950 tracking-tighter uppercase italic">{link.label}</h3>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">शुरू करें</p>
              </div>
           </Link>
         ))}
      </section>

      {/* 📢 LATEST UPDATES & ANNOUNCEMENTS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         <div className="lg:col-span-2 space-y-12">
            <div className="flex items-center justify-between border-l-[8px] border-primary pl-8">
               <h2 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">
                  नवीनतम <span className="text-primary">अपडेट</span>
               </h2>
               <Link to="/news" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-2 italic">सभी देखें <ChevronRight className="size-4" /></Link>
            </div>
            
            <div className="bg-white rounded-[4rem] border border-gray-100 p-10 shadow-sm space-y-10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 size-40 bg-primary/5 rounded-bl-[10rem] group-hover:bg-primary/10 transition-all"></div>
               <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-4 text-primary">
                     <Clock className="size-5" />
                     <span className="text-[10px] font-black uppercase tracking-widest italic font-bold">आज की मुख्य सूचना</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tighter italic leading-tight uppercase">
                     {latestAnnouncement.title}
                  </h3>
                  <p className="text-gray-500 font-bold italic leading-relaxed text-sm line-clamp-3">
                     {latestAnnouncement.content}
                  </p>
                  <Link to="/news" className="inline-flex items-center gap-4 bg-gray-950 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-primary transition-all">
                     विवरण देखें <ArrowRight className="size-4" />
                  </Link>
               </div>
            </div>
         </div>

         {/* 📊 SAMAJ STATS CARD */}
         <div className="space-y-10">
            <h2 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">
               सांख्यिकी <span className="text-primary">नेटवर्क</span>
            </h2>
            <div className="p-10 bg-gray-950 text-white rounded-[4rem] shadow-bhagva-lg space-y-10 relative overflow-hidden border border-white/5">
                <div className="absolute top-0 right-0 size-20 bg-primary opacity-20 blur-3xl"></div>
                <div className="space-y-8 relative z-10">
                   <div className="flex items-center gap-6">
                      <div className="size-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/5">
                         <Users className="size-7" />
                      </div>
                      <div>
                         <p className="text-[32px] font-black italic tracking-tighter leading-none">{memberCount}+</p>
                         <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mt-2">कुल सदस्य</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="size-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/5">
                         <Calendar className="size-7" />
                      </div>
                      <div>
                         <p className="text-[32px] font-black italic tracking-tighter leading-none">{eventCount}+</p>
                         <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mt-2">अबतक के कार्यक्रम</p>
                      </div>
                   </div>
                   <div className="pt-6 border-t border-white/5">
                      <div className="flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-widest italic">
                         <ShieldCheck className="size-4" /> 100% सत्यापित डाटा
                      </div>
                   </div>
                </div>
            </div>
         </div>
      </section>

      {/* 🚀 CALL TO ACTION */}
      <section className="bg-primary rounded-[4rem] p-12 md:p-24 text-center space-y-10 shadow-bhagva relative overflow-hidden group">
         <div className="absolute top-0 left-0 size-60 bg-white/10 blur-[100px] -z-0"></div>
         <div className="space-y-4 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">समाज की <span className="text-gray-950">शक्ति बनें</span></h2>
            <p className="text-white/80 font-bold italic text-sm md:text-lg max-w-2xl mx-auto drop-shadow-md">
               "पंजीकरण करें और समाज के हर महत्वपूर्ण निर्णय, कार्यक्रम और सूचना से सीधे जुड़ें।"
            </p>
         </div>
         <div className="flex justify-center gap-6 relative z-10">
            <Link to="/register" className="px-16 py-6 bg-white text-primary font-black rounded-3xl text-sm uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-2xl flex items-center gap-4">
               अभी जुड़ें <Sparkles className="size-5" />
            </Link>
         </div>
      </section>

    </div>
  );
}
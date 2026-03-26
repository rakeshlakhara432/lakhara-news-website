import { Radio, Bell, Flag, ArrowRight, Calendar, Clock, ChevronRight, Share2, Eye, LayoutGrid } from "lucide-react";

export function NewsPage() {
  const newsItems = [
    { title: "महासम्मेलन 2026 की रजिस्ट्रेशन प्रक्रिया आज से शुरू", date: "2 घंटे पहले", category: "संगठन", image: "https://picsum.photos/seed/news1/600/400" },
    { title: "लखारा समाज के 10 मेधावी छात्रों को दी गई छात्रवृत्ति", date: "कल", category: "शिक्षा", image: "https://picsum.photos/seed/news2/600/400" },
    { title: "नई कार्यकारिणी समिति का गठन, अध्यक्ष ने ली शपथ", date: "2 दिन पहले", category: "समिति", image: "https://picsum.photos/seed/news3/600/400" },
    { title: "समाज की नई नियमावली और उपनियम जारी", date: "5 दिन पहले", category: "नियम", image: "https://picsum.photos/seed/news4/600/400" },
  ];

  return (
    <div className="space-y-16 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 📢 HEADER */}
      <section className="text-center space-y-10 pt-12">
         <div className="size-20 mx-auto bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center shadow-lg animate-pulse border border-primary/10">
            <Radio className="size-10" />
         </div>
         <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">समाज के <span className="text-primary underline decoration-primary/10 underline-offset-8">समाचार</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">NEWS & ANNOUNCEMENTS</p>
         </div>
      </section>

      {/* 🎌 FEATURED NEWS (Bhagva Card) */}
      <section className="bg-gray-950 text-white rounded-[4rem] overflow-hidden group shadow-bhagva border-[10px] border-white relative">
         <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="aspect-video lg:aspect-auto h-full overflow-hidden">
               <img src="https://images.unsplash.com/photo-1548013146-72479768b921?auto=format&fit=crop&q=80&w=1000" className="size-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[5s] group-hover:scale-110" alt="Main News" />
            </div>
            <div className="p-12 md:p-20 space-y-8 relative">
               <div className="absolute inset-0 mandala-bg opacity-5 group-hover:scale-125 transition-transform duration-[10s]"></div>
               <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-4 bg-primary text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-2xl">
                     <Bell className="size-4 fill-current animate-pulse" /> महत्वपूर्ण सूचना
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase leading-tight drop-shadow-2xl">
                     लखारा समाज के आगामी वार्षिक चुनाव की तिथि घोषित, 15 अप्रैल को होगा मतदान
                  </h2>
                  <p className="text-gray-400 font-bold italic text-sm leading-relaxed max-w-lg">
                     समस्त समाज के सदस्यों को सूचित किया जाता है कि नई कार्यकारिणी के चुनाव आगामी माह में संपन्न होंगे। मतदाता सूची में अपना नाम जांच लें...
                  </p>
                  <div className="flex items-center gap-10 pt-4">
                     <div className="flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-widest">
                        <Clock className="size-4" /> 5 घंटे पहले
                     </div>
                     <button className="px-10 py-4 bg-white text-gray-950 font-black rounded-xl hover:bg-primary hover:text-white transition-all text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-4 group">
                        पूर्ण समाचार पढ़ें <ArrowRight className="size-4 group-hover:translate-x-3 transition-transform" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 📋 NEWS LIST */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {newsItems.map((n, i) => (
           <div key={i} className="group bg-white rounded-[4rem] p-4 border border-gray-100 shadow-sm hover:shadow-bhagva transition-all hover:scale-[1.02] flex gap-8 items-center cursor-pointer relative overflow-hidden">
              <div className="size-40 shrink-0 rounded-[3rem] overflow-hidden border-4 border-white shadow-lg relative">
                 <img src={n.image} className="size-full object-cover group-hover:scale-125 transition-all duration-700" alt="" />
                 <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex-grow space-y-4 pr-10">
                 <p className="text-[10px] font-black italic text-primary uppercase tracking-widest">{n.category}</p>
                 <h3 className="text-xl font-black text-gray-950 tracking-tighter italic leading-tight group-hover:text-primary transition-colors line-clamp-2">{n.title}</h3>
                 <div className="flex items-center justify-between text-gray-400">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest underline underline-offset-4 decoration-primary/20">
                       <Clock className="size-3" /> {n.date}
                    </div>
                    <div className="flex items-center gap-4">
                       <Share2 className="size-4 hover:text-primary transition-colors" />
                       <Eye className="size-4 hover:text-primary transition-colors" />
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </section>

      {/* 📜 NOTICE BOARD BANNER */}
      <section className="bg-primary text-white rounded-[5rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden group shadow-bhagva border-[8px] border-white">
         <div className="absolute inset-x-0 -bottom-1/2 h-full bg-black/10 blur-[10rem]"></div>
         <div className="absolute inset-0 mandala-bg opacity-10 group-hover:scale-125 transition-transform duration-[10s]"></div>
         <div className="relative z-10 space-y-10">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-tight drop-shadow-2xl font-black">समाज का डिजिटल <br/> <span className="text-gray-950 underline italic decoration-white/20">नोटिस बोर्ड</span></h2>
            <p className="text-white/80 font-bold italic text-sm md:text-xl max-w-2xl mx-auto leading-relaxed">
               समाज की हर छोटी-बड़ी खबर, सरकारी योजनाओं और महत्वपूर्ण घोषणाओं के लिए जुड़े रहें। अब खबर नहीं, समाज की आवाज़ होगी मुखर।
            </p>
            <div className="pt-10 flex justify-center gap-6 flex-wrap">
               <button className="px-16 py-6 bg-white text-primary font-black rounded-xl hover:bg-gray-100 transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center gap-4 hover:scale-110 active:scale-95">
                  <Bell className="size-6 animate-swing" /> सूचनाएं सक्रिय करें
               </button>
               <button className="px-16 py-6 bg-gray-950 text-white font-black rounded-xl hover:bg-black transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center gap-4">
                  <Flag className="size-6" /> सरकारी योजनाएं
               </button>
            </div>
         </div>
      </section>

    </div>
  );
}

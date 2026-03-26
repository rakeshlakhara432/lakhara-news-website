import { Signal, Zap, Radio, Globe, Tv, Clock, Share2, MessageCircle } from "lucide-react";
import { getYouTubeSettings } from "../data/mockData";

export function LiveTVPage() {
  return (
    <div className="bg-[#FFFDFB] min-h-screen animate-traditional relative overflow-hidden">
      <div className="absolute inset-0 mandala-bg z-0 opacity-10"></div>
      
      {/* 📺 LIVE BROADCAST HUB */}
      <div className="container mx-auto px-6 py-20 max-w-7xl relative z-10">
         <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-10 order-2 lg:order-1">
               <div className="flex items-center gap-5">
                  <div className="bg-red-600 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 shadow-2xl animate-pulse">
                    <div className="size-2 bg-white rounded-full"></div> लाइव
                  </div>
                  <div className="bg-primary/10 text-primary px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                    <Signal className="size-4" /> HD 1080P
                  </div>
               </div>
               
               <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl font-black text-gray-950 italic tracking-tighter uppercase leading-none">
                    लखारा <span className="text-primary underline decoration-primary/10 decoration-8 underline-offset-[-10px]">प्रसारण</span>
                  </h1>
                  <p className="text-gray-400 text-lg md:text-xl font-black italic max-w-xl opacity-80 leading-relaxed">
                    सत्य की हर लहर, सीधी आप तक। भारत का सबसे विश्वसनीय लाइव न्यूज़ नेटवर्क।
                  </p>
               </div>

               <div className="flex flex-wrap gap-5">
                  {["राष्ट्र उदय", "दोपहर दस्तक", "शाम की बहस", "प्रभास दर्शन"].map(show => (
                    <button key={show} className="px-10 py-4 bg-white border-2 border-gray-100 text-gray-400 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:border-primary/40 hover:text-primary transition-all shadow-sm italic">
                      {show}
                    </button>
                  ))}
               </div>
            </div>

            <div className="lg:w-1/2 order-1 lg:order-2">
               <div className="relative aspect-video bg-gray-950 rounded-[3.5rem] overflow-hidden shadow-bhagva group border-[8px] border-white ring-1 ring-primary/10">
                  <iframe
                    className="size-full opacity-80 group-hover:opacity-100 transition-opacity"
                    src={`https://www.youtube.com/embed/${getYouTubeSettings().liveVideoId}?autoplay=1&mute=0`}
                    title="Live TV"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute top-8 right-8">
                     <div className="size-16 bg-primary/20 backdrop-blur-3xl rounded-full flex items-center justify-center text-white border-4 border-white/20 animate-spin-slow">
                        <Zap className="size-8" />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* 📅 BROADCAST TIMELINE */}
         <div className="pt-24 space-y-12">
            <div className="flex items-center gap-6 border-l-[8px] border-primary pl-8">
               <h2 className="text-3xl font-black text-gray-950 italic tracking-tighter uppercase leading-none">आज का <span className="text-primary">समय-चक्र</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
               {[
                 { time: "06:00 AM", title: "प्रभात दर्शन", host: "प्रदीप शर्मा" },
                 { time: "09:00 AM", title: "राष्ट्र उदय", host: "अंजना यादव" },
                 { time: "01:00 PM", title: "दोपहर दस्तक", host: "रोहित सिंह" },
                 { time: "08:00 PM", title: "शाम की बहस", host: "लखारा विशेष" }
               ].map((item, i) => (
                 <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-traditional hover:shadow-bhagva transition-all group hover:rotate-[-2deg]">
                    <span className="text-primary font-black text-sm tracking-widest block mb-4 border-b border-primary/5 pb-4 italic">{item.time}</span>
                    <h3 className="text-xl font-black text-gray-950 italic tracking-tighter group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-3">होस्ट: {item.host}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

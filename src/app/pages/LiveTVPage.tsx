import { Signal, Zap, Radio, Globe, Tv, Clock, Share2, MessageCircle, Play } from "lucide-react";
import { getYouTubeSettings } from "../data/mockData";

export function LiveTVPage() {
  return (
    <div className="bg-white min-h-screen pb-32">
      
      {/* 📺 LIVE BROADCAST HUB */}
      <div className="container mx-auto px-6 py-20 max-w-7xl pt-12">
         
         <div className="flex flex-col lg:flex-row gap-20 items-center border-b-8 border-primary pb-20">
            <div className="lg:w-1/2 space-y-12 order-2 lg:order-1">
               <div className="flex flex-wrap items-center gap-4">
                  <div className="bg-primary text-white px-8 py-3 font-black uppercase tracking-[0.3em] flex items-center gap-4 border-2 border-white shadow-bhagva-flat text-[11px]">
                    <div className="size-2 bg-white rounded-full"></div> लाइव प्रसारण
                  </div>
                  <div className="bg-gray-950 text-white px-8 py-3 font-black uppercase tracking-[0.3em] flex items-center gap-3 text-[11px]">
                    <Signal className="size-4 text-primary" /> HD 1080P
                  </div>
               </div>
               
               <div className="space-y-8">
                  <h1 className="text-5xl md:text-8xl font-black text-gray-950 tracking-tighter uppercase leading-none italic border-l-[16px] border-primary pl-8">
                    लखारा <span className="text-primary italic">प्रसारण</span>
                  </h1>
                  <p className="text-gray-400 text-xl md:text-2xl font-black uppercase tracking-widest leading-relaxed border-b-2 border-gray-50 pb-8">
                    "सत्य की हर लहर, सीधी आप तक। भारत का सबसे विश्वसनीय लाइव न्यूज़ नेटवर्क।"
                  </p>
               </div>

               <div className="flex flex-wrap gap-4">
                  {["राष्ट्र उदय", "दोपहर दस्तक", "शाम की बहस", "प्रभास दर्शन"].map(show => (
                    <button key={show} className="px-10 py-5 bg-white border-4 border-gray-100 text-gray-400 font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-colors text-[11px] italic">
                      {show}
                    </button>
                  ))}
               </div>
            </div>

            <div className="lg:w-1/2 order-1 lg:order-2 w-full">
               <div className="relative aspect-video bg-gray-950 border-[16px] border-gray-100 shadow-2xl">
                  <iframe
                    className="size-full"
                    src={`https://www.youtube.com/embed/${getYouTubeSettings().liveVideoId}?autoplay=1&mute=0`}
                    title="Live TV"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute -top-8 -right-8">
                     <div className="size-24 bg-primary text-white flex items-center justify-center border-8 border-white shadow-xl">
                        <Zap className="size-12" />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* 📅 BROADCAST TIMELINE */}
         <div className="pt-32 space-y-16">
            <div className="flex items-center gap-8 border-l-[16px] border-gray-950 pl-10">
               <h2 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase leading-none italic">आज का <span className="text-primary italic">समय-चक्र</span></h2>
               <div className="flex-grow h-1 bg-gray-100"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {[
                 { time: "06:00 AM", title: "प्रभात दर्शन", host: "प्रदीप शर्मा" },
                 { time: "09:00 AM", title: "राष्ट्र उदय", host: "अंजना यादव" },
                 { time: "01:00 PM", title: "दोपहर दस्तक", host: "रोहित सिंह" },
                 { time: "08:00 PM", title: "शाम की बहस", host: "लखारा विशेष" }
               ].map((item, i) => (
                 <div key={i} className="bg-gray-50 p-10 border-4 border-gray-100 hover:border-primary transition-colors group">
                    <span className="text-primary font-black text-lg tracking-[0.3em] block mb-6 border-b-4 border-primary/20 pb-4 italic">{item.time}</span>
                    <h3 className="text-2xl font-black text-gray-950 tracking-tighter uppercase italic leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.4em] mt-6 italic">होस्ट: {item.host}</p>
                 </div>
               ))}
            </div>
         </div>
         
         {/* 🚀 CTA BANNER */}
         <div className="mt-40 bg-gray-950 p-20 border-b-[20px] border-primary text-center space-y-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5"></div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter relative z-10">लखारा स्टूडियो से <span className="text-primary italic">सीधे जुड़ें</span></h2>
            <p className="text-white/60 font-black uppercase tracking-widest text-lg relative z-10">BE THE VOICE OF THE COMMUNITY</p>
            <div className="flex justify-center relative z-10">
               <button className="px-16 py-6 bg-primary text-white font-black text-xl uppercase tracking-[0.5em] hover:bg-white hover:text-primary transition-all">
                  अभी कॉल करें
               </button>
            </div>
         </div>

      </div>
    </div>
  );
}

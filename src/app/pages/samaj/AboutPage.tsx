import { History, Target, Shield, Users, Flag, Heart } from "lucide-react";

export function AboutPage() {
  return (
    <div className="space-y-24 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 📜 HERO / TITLE */}
      <section className="text-center space-y-8 pt-12">
         <div className="size-20 mx-auto bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center shadow-lg animate-bounce">
            <Flag className="size-10" />
         </div>
         <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">लखारा समाज का <span className="text-primary">गौरवशाली</span> इतिहास</h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">OUR HISTORY • VISION • MISSION</p>
         </div>
      </section>

      {/* 🏰 HISTORY SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
         <div className="space-y-10">
            <div className="flex items-center gap-4 text-primary bg-primary/5 px-6 py-2 rounded-full w-fit">
               <History className="size-5" />
               <span className="text-[10px] font-black uppercase tracking-widest italic">समाज की उत्पत्ति</span>
            </div>
            <h2 className="text-3xl font-black text-gray-950 tracking-tighter italic leading-tight uppercase">प्राचीन काल से <span className="text-primary opacity-50">आज तक</span></h2>
            <p className="text-gray-500 font-bold italic leading-[1.8] text-sm md:text-md">
               लखारा समाज का इतिहास अत्यंत प्राचीन और गौरवशाली है। हमारे पूर्वजों ने न केवल कला और संस्कृति में बल्कि राष्ट्र निर्माण में भी अपनी महत्वपूर्ण भूमिका निभाई है। लखारा शब्द "लाख" से संबंधित है, जो हमारे पारंपरिक व्यवसाय और शिल्प कौशल को दर्शाता है। पीढ़ी दर पीढ़ी हमने अपनी संस्कृति, मर्यादाओं और एकता को अक्षुण्ण रखा है। आज का पोर्टल उसी विरासत को डिजिटल युग में आगे ले जाने का एक विनम्र प्रयास है।
            </p>
            <div className="flex gap-4">
               <div className="h-1.5 w-12 bg-primary rounded-full"></div>
               <div className="h-1.5 w-4 bg-primary/20 rounded-full"></div>
               <div className="h-1.5 w-4 bg-primary/20 rounded-full"></div>
            </div>
         </div>
         <div className="relative group">
            <div className="absolute inset-x-0 -bottom-10 h-2 bg-primary/20 blur-2xl"></div>
            <img src="https://images.unsplash.com/photo-1548013146-72479768b921?auto=format&fit=crop&q=80&w=1000" className="w-full h-[400px] object-cover rounded-[4rem] shadow-bhagva border-[8px] border-white group-hover:scale-105 transition-all duration-700" alt="Cultural Heritage" />
         </div>
      </section>

      {/* 🎯 VISION & MISSION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
         {[
           { 
             title: "हमारा लक्ष्य (Mission)", 
             desc: "समाज के प्रत्येक सदस्य को शिक्षित, संगठित और आत्मनिर्भर बनाना। लखारा समाज की आने वाली पीढ़ी को अपनी संस्कृति और जड़ों से जोड़ना।", 
             icon: Target, 
             color: "bg-red-50 text-red-600 border-red-100" 
           },
           { 
             title: "हमारा स्वप्न (Vision)", 
             desc: "एक ऐसा सशक्त और प्रबुद्ध लखारा समाज, जो सामाजिक, आर्थिक और राजनीतिक रूप से राष्ट्र के विकास में अग्रसर हो।", 
             icon: Shield, 
             color: "bg-amber-50 text-amber-600 border-amber-100" 
           }
         ].map((item, i) => (
           <div key={i} className={`p-10 border rounded-[3rem] shadow-sm space-y-6 hover:shadow-bhagva transition-all hover:-translate-y-2 ${item.color}`}>
              <item.icon className="size-10" />
              <h3 className="text-2xl font-black italic tracking-tighter text-gray-950 uppercase">{item.title}</h3>
              <p className="font-bold text-gray-500 italic text-sm leading-relaxed">{item.desc}</p>
           </div>
         ))}
      </section>

      {/* 🤝 CORE VALUES */}
      <section className="space-y-12">
         <div className="text-center font-black text-[10px] text-gray-400 uppercase tracking-[0.5em] mb-4 italic">हमारे आदर्श मूल्य</div>
         <div className="flex flex-wrap justify-center gap-12">
            {[
              { label: "एकता", icon: Users },
              { label: "संस्कृति", icon: Heart },
              { label: "शिक्षा", icon: Flag },
              { label: "सहयोग", icon: Target }
            ].map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group">
                 <div className="size-16 bg-white border border-gray-100 rounded-[2rem] flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all transform rotate-[-8deg] group-hover:rotate-0">
                    <v.icon className="size-8" />
                 </div>
                 <span className="font-black text-[10px] uppercase tracking-widest text-gray-950 italic">{v.label}</span>
              </div>
            ))}
         </div>
      </section>

    </div>
  );
}

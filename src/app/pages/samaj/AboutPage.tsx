import { History, Target, Shield, Users, Flag, Heart } from "lucide-react";

export function AboutPage() {
  return (
    <div className="space-y-16 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      {/* 📜 HERO / TITLE */}
      <section className="text-center space-y-6 pt-12">
         <div className="size-16 mx-auto bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shadow-sm">
            <Flag className="size-8" />
         </div>
         <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">लखारा समाज का <span className="text-orange-600">गौरवशाली</span> इतिहास</h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Our History • Vision • Mission</p>
         </div>
      </section>

      {/* 🏰 HISTORY SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
         <div className="space-y-6">
            <div className="flex items-center gap-3 text-orange-600 bg-orange-50 px-4 py-2 rounded-full w-fit">
               <History className="size-4" />
               <span className="text-xs font-bold uppercase tracking-wider">समाज की उत्पत्ति</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">प्राचीन काल से <span className="text-orange-600">आज तक</span></h2>
            <p className="text-slate-600 font-medium leading-relaxed text-base">
               लखारा समाज का इतिहास अत्यंत प्राचीन और गौरवशाली है। हमारे पूर्वजों ने न केवल कला और संस्कृति में बल्कि राष्ट्र निर्माण में भी अपनी महत्वपूर्ण भूमिका निभाई है। लखारा शब्द "लाख" से संबंधित है, जो हमारे पारंपरिक व्यवसाय और शिल्प कौशल को दर्शाता है। पीढ़ी दर पीढ़ी हमने अपनी संस्कृति, मर्यादाओं और एकता को अक्षुण्ण रखा है। आज का पोर्टल उसी विरासत को डिजिटल युग में आगे ले जाने का एक विनम्र प्रयास है।
            </p>
            <div className="flex gap-2">
               <div className="h-1.5 w-8 bg-orange-600 rounded-full"></div>
               <div className="h-1.5 w-3 bg-orange-200 rounded-full"></div>
               <div className="h-1.5 w-3 bg-orange-200 rounded-full"></div>
            </div>
         </div>
         <div className="relative group">
            <div className="absolute inset-x-0 -bottom-6 h-4 bg-orange-600/10 blur-xl"></div>
            <img src="https://images.unsplash.com/photo-1548013146-72479768b921?auto=format&fit=crop&q=80&w=1000" className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl shadow-lg border-4 border-white group-hover:scale-[1.02] transition-transform duration-500" alt="Cultural Heritage" />
         </div>
      </section>

      {/* 🎯 VISION & MISSION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {[
           { 
             title: "हमारा लक्ष्य (Mission)", 
             desc: "समाज के प्रत्येक सदस्य को शिक्षित, संगठित और आत्मनिर्भर बनाना। लखारा समाज की आने वाली पीढ़ी को अपनी संस्कृति और जड़ों से जोड़ना।", 
             icon: Target, 
             color: "bg-orange-50 text-orange-600 border-orange-100" 
           },
           { 
             title: "हमारा स्वप्न (Vision)", 
             desc: "एक ऐसा सशक्त और प्रबुद्ध लखारा समाज, जो सामाजिक, आर्थिक और राजनीतिक रूप से राष्ट्र के विकास में अग्रसर हो।", 
             icon: Shield, 
             color: "bg-blue-50 text-blue-600 border-blue-100" 
           }
         ].map((item, i) => (
           <div key={i} className={`p-8 border rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-all hover:-translate-y-1 ${item.color}`}>
              <item.icon className="size-8" />
              <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
              <p className="font-medium text-slate-600 text-base leading-relaxed">{item.desc}</p>
           </div>
         ))}
      </section>

      {/* 🤝 CORE VALUES */}
      <section className="space-y-8">
         <div className="text-center font-bold text-xs text-slate-500 uppercase tracking-widest">हमारे आदर्श मूल्य</div>
         <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {[
              { label: "एकता", icon: Users },
              { label: "संस्कृति", icon: Heart },
              { label: "शिक्षा", icon: Flag },
              { label: "सहयोग", icon: Target }
            ].map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-3 group px-4">
                 <div className="size-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <v.icon className="size-8" />
                 </div>
                 <span className="font-bold text-sm text-slate-700">{v.label}</span>
              </div>
            ))}
         </div>
      </section>

    </div>
  );
}

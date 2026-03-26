import { useState, useEffect } from "react";
import { TrendingUp, Radio, ChevronRight, Flag, Users, Heart, Calendar, Image, Phone, Info, MessageCircle, Star, Sparkles, LayoutGrid, Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimal delay for entrance animations
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
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
    { label: "पंजीकरण", slug: "register", icon: Radio, color: "bg-primary text-white" },
    { label: "विवाह मंच", slug: "matrimonial", icon: Heart, color: "bg-red-50 text-red-600" },
    { label: "सदस्य सूची", slug: "directory", icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "सहायता", slug: "support", icon: Star, color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="space-y-24 pb-32 animate-in fade-in duration-1000">
      
      {/* 🏛️ SAMAJ INTRODUCTION HERO */}
      <section className="relative h-[500px] md:h-[600px] rounded-[4rem] overflow-hidden group shadow-bhagva border-[6px] border-white ring-1 ring-primary/5">
         <img 
           src="https://images.unsplash.com/photo-1590133322241-8c9356ff5668?auto=format&fit=crop&q=80&w=2000" 
           className="size-full object-cover group-hover:scale-110 transition-transform duration-[10s]" 
           alt="Temple/Community" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>
         <div className="absolute inset-0 mandala-bg opacity-10"></div>
         
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
                  <h3 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tighter italic leading-tight">
                     लखारा समाज का आगामी वार्षिक मिलन समारोह और सांस्कृतिक कार्यक्रम 2026 की घोषणा
                  </h3>
                  <p className="text-gray-500 font-bold italic leading-relaxed text-sm">
                     समाज के सभी बंधुओं को सूचित किया जाता है कि आगामी मास में होने वाले 'महासम्मेलन' की तैयारियां शुरू हो चुकी हैं। अधिक जानकारी के लिए नोटिस बोर्ड देखें।
                  </p>
                  <Link to="/events" className="inline-flex items-center gap-4 bg-gray-950 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-primary transition-all">
                     पूर्ण विवरण पढ़ें <ArrowRight className="size-4" />
                  </Link>
               </div>
            </div>
         </div>

         {/* 🗓️ HIGHLIGHT EVENTS (Old material renamed) */}
         <div className="space-y-12">
            <div className="flex items-center gap-6 border-l-[8px] border-primary pl-8">
               <h2 className="text-2xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">
                  आगामी <span className="text-primary">आयोजन</span>
               </h2>
            </div>
            
            <div className="space-y-6">
               {[
                 { title: "समाज की आम बैठक", date: "28 मार्च", type: "बैठक" },
                 { title: "मेगा रक्तदान शिविर", date: "02 अप्रैल", type: "सेवा" },
                 { title: "महासभा चुनाव 2026", date: "15 अप्रैल", type: "संगठन" }
               ].map((ev, i) => (
                 <div key={i} className="group flex items-center gap-6 p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all cursor-pointer">
                    <div className="size-16 bg-primary/5 text-primary rounded-2xl flex flex-col items-center justify-center font-black transition-colors group-hover:bg-primary group-hover:text-white">
                       <span className="text-lg leading-none">{ev.date.split(' ')[0]}</span>
                       <span className="text-[8px] uppercase">{ev.date.split(' ')[1]}</span>
                    </div>
                    <div>
                       <h4 className="text-sm font-black text-gray-950 leading-tight italic tracking-tight">{ev.title}</h4>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{ev.type}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 🖼️ SAMAJ GALLERY (Preview) */}
      <section className="space-y-12">
         <div className="flex items-center justify-between border-l-[8px] border-primary pl-8">
            <h2 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">
               स्मृति <span className="text-primary">कलश</span>
            </h2>
            <Link to="/gallery" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-2 italic">गैलरी देखें <ChevronRight className="size-4" /></Link>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square bg-gray-100 rounded-[3rem] overflow-hidden group relative shadow-sm border-4 border-white">
                 <img src={`https://picsum.photos/seed/samaj${i}/500/500`} className="size-full object-cover group-hover:scale-125 transition-transform duration-[4s]" alt="" />
                 <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
         </div>
      </section>

      {/* 🤝 CONTACT QUICK LINK */}
      <section className="bg-primary rounded-[5rem] p-12 md:p-24 text-center text-white relative overflow-hidden group shadow-bhagva border-[8px] border-white">
         <div className="absolute inset-0 mandala-bg opacity-10 group-hover:scale-110 transition-transform duration-[10s]"></div>
         <div className="relative z-10 space-y-10">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-tight drop-shadow-2xl">
               क्या आपको किसी सहायता की <br/> आवश्यकता है?
            </h2>
            <p className="text-white/80 font-bold italic max-w-xl mx-auto text-sm md:text-lg">
               समाज की सहायता डेस्क 24/7 उपलब्ध है। किसी भी सवाल या सुझाव के लिए हमसे संपर्क करें।
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-10">
               <a href="tel:+91XXXXXXXXXX" className="px-10 py-5 bg-white text-primary font-black rounded-3xl hover:bg-gray-100 transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center gap-4">
                  <Phone className="size-5" /> कॉल करें
               </a>
               <Link to="/contact" className="px-10 py-5 bg-gray-950 text-white font-black rounded-3xl hover:bg-black transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center gap-4">
                  <MapPin className="size-5" /> संपर्क सूत्र
               </Link>
            </div>
         </div>
      </section>

    </div>
  );
}
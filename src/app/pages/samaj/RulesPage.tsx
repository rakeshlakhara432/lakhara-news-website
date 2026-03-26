import { BookOpen, ShieldCheck, Flag, ArrowRight, Star, History, Users, Heart } from "lucide-react";

export function RulesPage() {
  return (
    <div className="space-y-24 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 📜 HEADER */}
      <section className="text-center space-y-10 pt-12">
         <div className="size-20 mx-auto bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center shadow-lg animate-pulse border border-primary/10">
            <BookOpen className="size-10" />
         </div>
         <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">समाज के <span className="text-primary underline underline-offset-8 decoration-primary/20">नियम एवं कानून</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">RULES & REGULATIONS • DISCIPLINE • UNITY</p>
         </div>
      </section>

      {/* 🎌 CORE RULES (Bhagva Highlight) */}
      <section className="max-w-4xl mx-auto space-y-12">
         <div className="bg-white rounded-[4rem] p-12 md:p-20 border border-gray-100 shadow-bhagva relative overflow-hidden group">
            <div className="absolute top-0 right-0 size-40 bg-gradient-to-br from-primary/5 to-transparent rotate-[-45deg]"></div>
            
            <div className="space-y-12 relative z-10">
               {[
                 { title: "सदस्यता नियम", desc: "समाज का कोई भी व्यक्ति जो लखारा कुल से संबंधित है, निर्धारित प्रक्रिया से सदस्य बन सकता है।" },
                 { title: "बैठक एवं सम्मेलन", desc: "कार्यकारिणी की मासिक बैठक और वार्षिक महासभा का आयोजन अनिवार्य है, जिसमें सभी सदस्यों की सहभागिता प्रार्थनीय है।" },
                 { title: "अनुशासन एवं मान मर्यादा", desc: "समाज के किसी भी कार्यक्रम में और सार्वजनिक रूप से समाज की मर्यादा का पालन करना प्रत्येक सदस्य का कर्तव्य है।" },
                 { title: "सहयोग एवं दान", desc: "समाज हित में किए जाने वाले कार्यों हेतु स्वेच्छा से दान और सहयोग की अपेक्षा की जाती है।" }
               ].map((rule, i) => (
                 <div key={i} className="flex gap-8 group/item">
                    <div className="size-12 shrink-0 bg-primary/10 text-primary rounded-[1rem] flex items-center justify-center font-black text-lg italic shadow-inner group-hover/item:bg-primary group-hover/item:text-white transition-all">
                       {i + 1}
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-xl font-black italic tracking-tighter uppercase text-gray-950">{rule.title}</h3>
                       <p className="text-sm font-bold text-gray-500 italic leading-relaxed">{rule.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 🛡️ PLEDGE BANNER */}
      <section className="bg-gray-950 text-white rounded-[5rem] p-16 md:p-24 text-center space-y-10 relative overflow-hidden group border-[10px] border-white shadow-2xl">
         <div className="absolute inset-0 mandala-bg opacity-10 group-hover:scale-125 transition-transform duration-[20s]"></div>
         <div className="relative z-10 space-y-10">
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-3xl text-primary px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.4em] italic border border-white/10">
               ॥ सत्यं वद, धर्मं चर ॥
            </div>
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-tight drop-shadow-2xl">
               समाज की एकता और <br/> <span className="text-primary underline decoration-white/20 underline-offset-8 italic">अनुशासन</span> हमारी शक्ति है
            </h2>
            <p className="text-gray-400 font-bold italic text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
               नियम हमें सीमित करने के लिए नहीं, बल्कि एक सूत्र में बांधने के लिए बनाए गए हैं। आइए, एक संगठित और अनुशासित लखारा समाज का निर्माण करें।
            </p>
            <div className="pt-10">
               <button className="px-16 py-6 bg-primary text-white font-black rounded-xl hover:bg-secondary transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center justify-center gap-4 mx-auto group">
                  <ShieldCheck className="size-6 transition-transform group-hover:scale-125" /> पूर्ण नियमावली डाउनलोड करें (PDF)
               </button>
            </div>
         </div>
      </section>

    </div>
  );
}

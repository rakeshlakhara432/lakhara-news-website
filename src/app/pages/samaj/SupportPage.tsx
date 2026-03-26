import { GraduationCap, Award, Briefcase, Heart, Star, Flag, ArrowRight, ShieldCheck, Mail, Phone, BookOpen, Network } from "lucide-react";

export function SupportPage() {
  return (
    <div className="space-y-24 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 🎓 HEADER */}
      <section className="text-center space-y-10 pt-12">
         <div className="size-20 mx-auto bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center shadow-lg animate-bounce border border-primary/10">
            <GraduationCap className="size-10" />
         </div>
         <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">समाज <span className="text-primary underline underline-offset-8 decoration-primary/20">शिक्षा</span> & सहायता</h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">EMPOWERING STUDENTS • JOBS • GROWTH</p>
         </div>
      </section>

      {/* 📂 SUPPORT CATEGORIES (Bhagva Highlight) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
         {[
           { 
             title: "छात्रवृत्ति योजना", 
             desc: "मेधावी छात्रों के लिए उच्च शिक्षा हेतु आर्थिक सहायता और मार्गदर्शन प्रदान करना।", 
             icon: Award, 
             type: "Scholarship",
             btn: "आवेदन करें"
           },
           { 
             title: "रोजगार सहायता", 
             desc: "समाज के युवाओं को सरकारी और निजी क्षेत्रों में नौकरी के अवसरों की जानकारी और प्रशिक्षण प्रदान करना।", 
             icon: Briefcase, 
             type: "Career",
             btn: "रिक्तियां देखें"
           },
           { 
             title: "कैरियर काउंसलिंग", 
             desc: "विशेषज्ञों द्वारा छात्रों को उनके भविष्य के विषय में सही दिशा और करियर चुनने में मार्गदर्शन।", 
             icon: Star, 
             type: "Guidance",
             btn: "विशेषज्ञ से जुड़ें"
           }
         ].map((box, i) => (
           <div key={i} className="group p-10 bg-white rounded-[4rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all hover:-translate-y-2 text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 size-24 bg-gradient-to-br from-primary/5 to-transparent rotate-[-45deg]"></div>
              <div className="size-16 mx-auto bg-gray-50 text-primary rounded-[2rem] flex items-center justify-center shadow-inner group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-[12deg]">
                 <box.icon className="size-8" />
              </div>
              <div className="space-y-3">
                 <h3 className="text-xl font-black text-gray-950 tracking-tighter uppercase italic line-clamp-1">{box.title}</h3>
                 <p className="text-[8px] font-black text-primary uppercase tracking-widest bg-primary/5 px-4 py-1.5 rounded-full w-fit mx-auto border border-primary/10 italic">#SAMAJ_{box.type.toUpperCase()}</p>
                 <p className="text-sm font-bold text-gray-500 italic leading-relaxed pt-2 h-[4rem] line-clamp-3">{box.desc}</p>
              </div>
              <button className="w-full py-4 bg-gray-950 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-primary transition-all flex items-center justify-center gap-3 active:scale-95 group">
                 {box.btn} <ArrowRight className="size-4 group-hover:translate-x-3 transition-transform" />
              </button>
           </div>
         ))}
      </section>

      {/* 📚 STUDENT HIGHLIGHT / TESTIMONIALS (Bhagva Grid) */}
      <section className="bg-gray-950 text-white rounded-[5rem] p-16 md:p-24 relative overflow-hidden group shadow-bhagva border-[10px] border-white">
         <div className="absolute inset-0 mandala-bg opacity-10 group-hover:scale-125 transition-transform duration-[20s]"></div>
         <div className="absolute -top-40 -left-40 size-96 bg-primary/20 blur-[15rem]"></div>
         <div className="absolute -bottom-40 -right-40 size-96 bg-primary/10 blur-[15rem]"></div>
         
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="space-y-10 text-center lg:text-left shrink-0 max-w-lg">
               <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-3xl text-primary px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.4em] italic border border-white/10 animate-in fade-in slide-in-from-bottom-5">
                  ॥ शिक्षा गौरव ॥
               </div>
               <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-tight drop-shadow-2xl font-black">
                  समाज के <span className="text-primary underline decoration-white/20 underline-offset-8 italic">मेधावी</span> सितारे
               </h2>
               <p className="text-gray-400 font-bold italic text-sm md:text-xl leading-relaxed">
                  लखारा समाज के उन विद्यार्थियों का सम्मान जिन्होंने राष्ट्रीय और अंतर्राष्ट्रीय स्तर पर समाज का नाम रोशन किया है।
               </p>
               <button className="px-16 py-6 bg-white text-gray-950 font-black rounded-xl hover:bg-primary hover:text-white transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center justify-center gap-4 mx-auto lg:mx-0">
                  सफलता की कहानियाँ <BookOpen className="size-6" />
               </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 w-full">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square bg-white/5 rounded-[3rem] border border-white/10 p-6 flex flex-col items-center justify-center text-center space-y-4 hover:bg-white/10 hover:border-primary/40 transition-all cursor-pointer">
                    <div className="size-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                       <Award className="size-8" />
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black italic text-white uppercase tracking-tighter line-clamp-1">मनीष लखारा</p>
                       <p className="text-[7px] font-black text-primary uppercase tracking-[0.3em]">IIT JEE 2026</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 🤝 HELP DESK / CONTACT QUICK LINK */}
      <section className="bg-gray-50 rounded-[5rem] p-16 md:p-24 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden group border-4 border-white shadow-lg">
         <div className="size-40 bg-white rounded-[3rem] p-4 shadow-2xl shrink-0 group-hover:rotate-12 transition-transform duration-700 relative overflow-hidden border-4 border-primary/20">
            <Heart className="size-full text-primary" />
            <div className="absolute inset-0 mandala-bg opacity-10"></div>
         </div>
         <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-gray-950 leading-tight underline decoration-primary/20 underline-offset-8">विशेष <span className="text-primary italic">सहायता</span> डेस्क</h2>
            <p className="text-gray-500 font-bold italic text-sm md:text-lg leading-relaxed max-w-2xl">
               किसी भी प्रकार की शैक्षणिक या अन्य आपातकालीन सहायता हेतु समाज की हेल्पलाइन २४/७ उपलब्ध है। अपनी समस्या विस्तार से ईमेल या फोन के माध्यम से साझा करें।
            </p>
            <div className="flex gap-10 flex-wrap justify-center md:justify-start">
               <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary italic hover:underline cursor-pointer">
                  <Phone className="size-4" /> हेल्पलाइन जुड़ें
               </div>
               <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary italic hover:underline cursor-pointer">
                  <Mail className="size-4" /> सहायता ईमेल
               </div>
               <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary italic hover:underline cursor-pointer">
                  <Network className="size-4" /> नेटवर्क फॉर्म
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}

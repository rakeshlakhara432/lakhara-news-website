import { useState, useEffect } from "react";
import { GraduationCap, Heart, Briefcase, Phone, Calendar, ArrowRight, Loader2, Bookmark, CheckCircle, ShieldAlert } from "lucide-react";
import { samajService, SupportPost } from "../../services/samajService";

export function SupportPage() {
  const [posts, setPosts] = useState<SupportPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = samajService.subscribeToSupport((data) => {
      setPosts(data);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  if (isLoading) {
    return (
       <div className="flex justify-center py-40">
          <Loader2 className="size-16 text-primary animate-spin" />
       </div>
    );
  }

  return (
    <div className="space-y-32 pb-48 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 🎓 HEADER */}
      <section className="text-center space-y-12 pt-16 relative">
         <div className="absolute top-10 left-1/2 -translate-x-1/2 size-60 bg-primary/5 blur-3xl -z-10 rounded-full"></div>
         <div className="size-24 mx-auto bg-primary/10 text-primary rounded-[2.5rem] flex items-center justify-center shadow-lg border border-primary/10 shadow-bhagva-sm">
            <GraduationCap className="size-12" />
         </div>
         <div className="space-y-6">
            <h1 className="text-4xl md:text-7xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">शिक्षा और <span className="text-primary underline underline-offset-8 decoration-primary/10 italic">सहायता</span></h1>
            <p className="max-w-xl mx-auto text-sm md:text-md text-gray-400 font-bold italic uppercase tracking-widest leading-relaxed">
               LAKHARA SAMAJ EDUCATION & COMMUNITY AID HUB • EMPOWERING FUTURE GENERATIONS
            </p>
         </div>
      </section>

      {/* 🚀 MISSION CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-8">
         {[
           { icon: GraduationCap, title: "छात्रवृत्ति", desc: "योग्य और जरूरतमंद छात्रों के लिए उच्च शिक्षा सहायता कार्यक्रम।", color: "primary" },
           { icon: Heart, title: "स्वास्थ्य सहायता", desc: "मेडिकल इमरजेंसी और गंभीर बीमारियों के लिए सामुदायिक फंड।", color: "primary" },
           { icon: Briefcase, title: "व्यवसाय मार्गदर्शन", desc: "युवाओं के लिए करियर परामर्श और स्टार्टअप सहायता सेवाएं।", color: "primary" }
         ].map((card, i) => (
           <div key={i} className="group p-12 bg-white rounded-[4rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all relative overflow-hidden text-center cursor-default">
              <div className="absolute top-0 right-0 size-32 bg-gradient-to-br from-primary/5 to-transparent rotate-[-45deg] group-hover:from-primary/10 group-hover:scale-125 transition-transform duration-700"></div>
              <div className="size-20 mx-auto bg-gray-50 text-gray-400 rounded-[2rem] flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all">
                 <card.icon className="size-10" />
              </div>
              <h3 className="text-2xl font-black italic tracking-tighter text-gray-950 uppercase mb-4">{card.title}</h3>
              <p className="text-gray-400 font-bold italic text-sm leading-relaxed">{card.desc}</p>
           </div>
         ))}
      </section>

      {/* 📋 OPPORTUNITIES LIST */}
      <section className="space-y-16 px-8">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-l-[12px] border-primary pl-10 py-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tighter uppercase italic leading-none">वर्तमान <span className="text-primary">अवसर</span></h2>
            <div className="flex items-center gap-6 px-8 py-3 bg-gray-50 border border-gray-100 rounded-full">
               <span className="text-[10px] font-black uppercase text-gray-400 italic">Total Active Aid:</span>
               <span className="text-primary font-black text-xs">{posts.length}</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {posts.map((post) => (
               <div key={post.id} className="group p-10 bg-white rounded-[4.5rem] border border-gray-100 shadow-sm hover:shadow-bhagva-lg transition-all relative overflow-hidden flex flex-col min-h-[400px]">
                  <div className="absolute top-0 right-0 size-40 bg-gradient-to-br from-primary/5 to-transparent rotate-[-45deg] group-hover:from-primary/10 group-hover:scale-110 transition-transform duration-700"></div>
                  
                  <div className="flex items-center justify-between mb-10">
                     <div className="flex items-center gap-4 bg-primary/5 text-primary px-6 py-2 rounded-full border border-primary/10">
                        <Bookmark className="size-4 fill-current" />
                        <span className="text-[9px] font-black uppercase tracking-widest italic">{post.type}</span>
                     </div>
                     <div className="text-[8px] font-black text-gray-300 uppercase italic tracking-widest">{post.createdAt?.toDate?.().toLocaleDateString() || "Active"}</div>
                  </div>

                  <h3 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none mb-6 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-gray-400 font-bold italic text-sm leading-relaxed mb-10 line-clamp-4 flex-grow">{post.description}</p>
                  
                  <div className="pt-10 border-t border-gray-50 flex items-center justify-between">
                     <div className="flex items-center gap-4 group/btn cursor-pointer">
                        <a href={`tel:${post.contact}`} className="flex items-center gap-4 bg-gray-950 text-white px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest group-hover/btn:bg-primary transition-all shadow-xl">
                           अभी आवेदन करें <ArrowRight className="size-4 group-hover/btn:translate-x-3 transition-transform" />
                        </a>
                     </div>
                     <div className="flex items-center gap-3 text-primary pr-6">
                        <Phone className="size-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">{post.contact}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* EMPTY STATE */}
         {posts.length === 0 && (
           <div className="max-w-3xl mx-auto p-20 bg-gray-50 rounded-[4rem] text-center space-y-8 border-4 border-dashed border-gray-100">
              <ShieldAlert className="size-16 text-gray-200 mx-auto" />
              <div className="space-y-4">
                 <h4 className="text-xl font-black uppercase italic tracking-tighter text-gray-300">No active opportunities found</h4>
                 <p className="text-gray-400 font-bold italic text-xs px-10">कृपया बाद में पुनः प्रयास करें। नई छात्रवृत्तियां और सहायता कार्यक्रम जल्द ही प्रदर्शित किए जाएंगे।</p>
              </div>
           </div>
         )}
      </section>

      {/* ✅ TRUST SHIELD */}
      <section className="max-w-4xl mx-auto px-10">
         <div className="bg-gray-950 rounded-[4rem] p-12 md:p-20 text-center space-y-10 relative overflow-hidden shadow-bhagva">
            <div className="absolute top-10 right-10 size-40 bg-primary/10 blur-3xl opacity-50"></div>
            <div className="space-y-10 relative z-10">
               <CheckCircle className="size-16 text-primary mx-auto" />
               <div className="space-y-6">
                  <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-tight">पारदर्शी और विश्वसनीय <span className="text-primary italic">सहायता प्रणाली</span></h3>
                  <p className="text-gray-400 font-bold italic text-xs leading-relaxed max-w-2xl mx-auto">
                     "हमारा लक्ष्य समाज के हर विद्यार्थी को शिक्षा के समान अवसर प्रदान करना है। समाज का फंड सीधे योग्य उम्मीदवारों तक पहुँचाया जाता है।"
                  </p>
               </div>
               <div className="pt-8">
                  <button className="px-12 py-5 bg-primary text-white font-black rounded-[2rem] text-[10px] uppercase tracking-widest shadow-xl hover:scale-110 active:scale-95 transition-all">सहायता के लिए संपर्क करें</button>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}

import { useState, useEffect } from "react";
import { GraduationCap, Heart, Briefcase, Phone, ArrowRight, Loader2, Bookmark, CheckCircle, ShieldAlert } from "lucide-react";
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
       <div className="flex justify-center py-20">
          <Loader2 className="size-10 text-orange-600 animate-spin" />
       </div>
    );
  }

  return (
    <div className="space-y-16 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      {/* 🎓 HEADER */}
      <section className="text-center space-y-6 pt-12 relative">
         <div className="absolute top-10 left-1/2 -translate-x-1/2 size-40 bg-orange-600/10 blur-3xl -z-10 rounded-full"></div>
         <div className="size-16 mx-auto bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shadow-sm">
            <GraduationCap className="size-8" />
         </div>
         <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 leading-tight">शिक्षा और <span className="text-orange-600">सहायता</span></h1>
            <p className="max-w-xl mx-auto text-xs md:text-sm text-slate-500 font-semibold uppercase tracking-widest leading-relaxed">
               Lakhara Samaj Education & Community Aid Hub
            </p>
         </div>
      </section>

      {/* 🚀 MISSION CARDS */}
      <section className="container mx-auto px-6 lg:px-0">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: GraduationCap, title: "छात्रवृत्ति", desc: "योग्य और जरूरतमंद छात्रों के लिए उच्च शिक्षा सहायता कार्यक्रम।" },
              { icon: Heart, title: "स्वास्थ्य सहायता", desc: "मेडिकल इमरजेंसी और गंभीर बीमारियों के लिए सामुदायिक फंड।" },
              { icon: Briefcase, title: "व्यवसाय मार्गदर्शन", desc: "युवाओं के लिए करियर परामर्श और स्टार्टअप सहायता सेवाएं।" }
            ].map((card, i) => (
              <div key={i} className="group p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-center">
                 <div className="size-14 mx-auto bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <card.icon className="size-6" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">{card.title}</h3>
                 <p className="text-slate-600 font-medium text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
         </div>
      </section>

      {/* 📋 OPPORTUNITIES LIST */}
      <section className="container mx-auto px-6 lg:px-0 space-y-8">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-orange-600 pl-4 py-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-none">वर्तमान <span className="text-orange-600">अवसर</span></h2>
            <div className="flex items-center gap-3 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full w-fit">
               <span className="text-[10px] font-bold uppercase text-slate-500">Active Aid:</span>
               <span className="text-orange-600 font-bold text-xs">{posts.length}</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
               <div key={post.id} className="group p-6 md:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col min-h-[250px] relative overflow-hidden hover:border-orange-200">
                  <div className="absolute top-0 right-0 size-24 bg-gradient-to-br from-orange-600/5 to-transparent rounded-bl-full"></div>
                  
                  <div className="flex items-center justify-between mb-6 relative z-10">
                     <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1 rounded-full border border-orange-100">
                        <Bookmark className="size-3 fill-current" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{post.type}</span>
                     </div>
                     <div className="text-[10px] font-semibold text-slate-400">{post.createdAt?.toDate?.().toLocaleDateString() || "Active"}</div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight mb-4 group-hover:text-orange-600 transition-colors relative z-10">{post.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-3 flex-grow relative z-10">{post.description}</p>
                  
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                     <a href={`tel:${post.contact}`} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-orange-600 transition-colors shadow-sm">
                        अभी आवेदन करें <ArrowRight className="size-3" />
                     </a>
                     <div className="flex items-center gap-2 text-slate-500">
                        <Phone className="size-3.5" />
                        <span className="text-xs font-semibold">{post.contact}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* EMPTY STATE */}
         {posts.length === 0 && (
           <div className="max-w-2xl mx-auto py-16 bg-slate-50 rounded-3xl text-center space-y-4 border border-dashed border-slate-300">
              <ShieldAlert className="size-12 text-slate-300 mx-auto" />
              <div className="space-y-2">
                 <h4 className="text-lg font-bold text-slate-600">No active opportunities found</h4>
                 <p className="text-slate-500 text-sm px-6">कृपया बाद में पुनः प्रयास करें। नई छात्रवृत्तियां और सहायता कार्यक्रम जल्द ही प्रदर्शित किए जाएंगे।</p>
              </div>
           </div>
         )}
      </section>

      {/* ✅ TRUST SHIELD */}
      <section className="container mx-auto px-6 lg:px-0">
         <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center space-y-8 relative overflow-hidden shadow-lg border border-slate-800">
            <div className="absolute top-10 right-10 size-40 bg-orange-600/10 blur-3xl rounded-full"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
               <CheckCircle className="size-12 text-orange-500 mx-auto" />
               <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">पारदर्शी और विश्वसनीय <br className="hidden md:block"/> <span className="text-orange-400">सहायता प्रणाली</span></h3>
                  <p className="text-slate-300 font-medium text-sm md:text-base leading-relaxed">
                     "हमारा लक्ष्य समाज के हर विद्यार्थी को शिक्षा के समान अवसर प्रदान करना है। समाज का फंड सीधे योग्य उम्मीदवारों तक पहुँचाया जाता है।"
                  </p>
               </div>
               <div className="pt-4">
                  <button className="px-8 py-3 bg-orange-600 text-white font-bold rounded-xl text-sm shadow hover:bg-orange-500 transition-colors">सहायता के लिए संपर्क करें</button>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}

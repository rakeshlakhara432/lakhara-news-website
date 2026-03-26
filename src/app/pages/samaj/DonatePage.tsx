import { Heart, Wallet, ShieldCheck, Flag, ArrowRight, Star, Globe, Phone, MapPin, QrCode, CreditCard, Network } from "lucide-react";

export function DonatePage() {
  return (
    <div className="space-y-24 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 💰 HEADER */}
      <section className="text-center space-y-10 pt-12">
         <div className="size-20 mx-auto bg-primary/10 text-primary md:rounded-[2rem] rounded-none flex items-center justify-center shadow-lg animate-pulse border border-primary/10">
            <Heart className="size-10 fill-current" />
         </div>
         <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase italic leading-tight md:leading-none">समाज <span className="text-primary underline underline-offset-8 decoration-primary/20">सहयोग</span> निधि</h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">GIVE BACK • GROW TOGETHER</p>
         </div>
      </section>

      {/* 🏗️ DONATION CAMPAIGNS (Bhagva Highlight) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         <div className="bg-gray-950 text-white md:rounded-[5rem] rounded-none p-8 md:p-24 relative overflow-hidden group shadow-bhagva border-[10px] border-white ring-1 ring-primary/20">
            <div className="absolute inset-0 mandala-bg opacity-5 group-hover:scale-125 transition-transform duration-[15s]"></div>
            <div className="relative z-10 space-y-10">
               <div className="inline-flex items-center gap-4 bg-primary text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-2xl">
                  <Star className="size-4 fill-current animate-pulse" /> मुख्य अभियान
               </div>
               <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-tight drop-shadow-2xl">
                  समाज भवन निर्माण <br/> <span className="text-primary underline decoration-white/20 underline-offset-8">पुनर्निर्माण</span> फंड 2026
               </h2>
               <p className="text-gray-400 font-bold italic text-sm md:text-xl max-w-lg">
                  हमारे गौरवशाली समाज भवन को और भव्य और आधुनिक बनाने के लिए आपके सहयोग की आवश्यकता है। आपका छोटा सा योगदान समाज की पहचान मजबूत करेगा।
               </p>
               <div className="pt-8 space-y-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1.5 bg-gray-900/50 p-4 rounded-xl border border-white/5">
                     <span>लक्ष्य: ₹५०,००,०००</span>
                     <span className="text-primary">प्राप्त: ₹१२,४५,०००</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
                     <div className="h-full w-[25%] bg-primary rounded-full animate-progress animate-pulse"></div>
                  </div>
               </div>
               <button className="px-16 py-6 bg-white text-gray-950 font-black rounded-xl hover:bg-primary hover:text-white transition-all text-sm tracking-widest uppercase shadow-2xl flex items-center justify-center gap-4 group">
                  अभी दान करें <ArrowRight className="size-6 group-hover:translate-x-4 transition-transform" />
               </button>
            </div>
         </div>

         {/* 💳 PAYMENT METHODS */}
         <div className="space-y-10">
            <div className="flex items-center gap-4 border-l-[8px] border-primary pl-8">
               <h2 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-tight md:leading-none">सहयोग <span className="text-primary font-black opacity-30">तरीके</span></h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                 { label: "UPI (Google Pay, PhonePe)", val: "samaj@upi", icon: QrCode, color: "bg-blue-50 text-blue-600 border-blue-100" },
                 { label: "बैंक ट्रांसफर (NEFT/IMPS)", val: "A/C: XXXXXXXXXXXX", icon: CreditCard, color: "bg-amber-50 text-amber-600 border-amber-100" },
                 { label: "समाज कार्यालय (नगद)", val: "कार्यालय रसीद अनिवार्य", icon: MapPin, color: "bg-red-50 text-red-600 border-red-100" },
                 { label: "ऑनलाइन डिजिटल पेमेंट", val: "वेबसाइट पेमेंट गेटवे", icon: Network, color: "bg-green-50 text-green-600 border-green-100" }
               ].map((item, i) => (
                 <div key={i} className={`group p-10 border md:rounded-[4rem] rounded-none shadow-sm hover:shadow-bhagva transition-all hover:-translate-y-2 text-center space-y-6 ${item.color}`}>
                    <item.icon className="size-12 mx-auto" />
                    <div>
                       <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight md:leading-none mb-2">{item.label}</h3>
                       <p className="text-sm font-black text-gray-950 italic tracking-tighter truncate">{item.val}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 🛡️ TRANSPARENCY SHIELD */}
      <section className="bg-gray-50 md:rounded-[5rem] rounded-none p-8 md:p-24 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden group border-4 border-white shadow-lg">
         <div className="size-40 bg-white rounded-[3rem] p-4 shadow-2xl shrink-0 group-hover:rotate-12 transition-transform duration-700 relative overflow-hidden">
            <ShieldCheck className="size-full text-primary" />
            <div className="absolute inset-0 mandala-bg opacity-10"></div>
         </div>
         <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-gray-950 leading-tight">पूर्ण विवरेणी <br/> <span className="text-primary underline decoration-primary/20 underline-offset-8 italic">पारदर्शिता</span></h2>
            <p className="text-gray-500 font-bold italic text-sm md:text-lg leading-relaxed max-w-2xl">
               समाज के लिए प्राप्त होने वाले प्रत्येक धन का विवरण मासिक आधार पर वेबसाइट पर प्रकाशित किया जाएगा। आपका सहयोग केवल समाज कल्याण कार्यों में ही खर्च किया जाएगा।
            </p>
            <div className="flex gap-10 flex-wrap justify-center md:justify-start">
               {[
                 { label: "ऑडिट रिपोर्ट", icon: Flag },
                 { label: "मासिक लेखा", icon: Globe },
                 { label: "रसीद डाउनलोड", icon: Network }
               ].map((v, i) => (
                 <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary italic hover:underline cursor-pointer">
                    <v.icon className="size-4" /> {v.label}
                 </div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}

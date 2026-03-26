import { useState } from "react";
import { User, Mail, Phone, MapPin, PlusCircle, CheckCircle, ShieldCheck, Flag, Users, ArrowRight } from "lucide-react";

export function RegistrationPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-16 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 📝 HEADER */}
      <section className="text-center space-y-10 pt-12">
         <div className="size-20 mx-auto bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center shadow-lg animate-pulse border border-primary/10">
            <PlusCircle className="size-10" />
         </div>
         <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">समाज <span className="text-primary underline decoration-primary/10">पंजीकरण</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">ORGANIZE • CONNECT • GROW</p>
         </div>
      </section>

      {/* 📊 STEP INDICATOR */}
      <section className="max-w-2xl mx-auto flex items-center justify-between px-10 relative">
         <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-100 -z-10"></div>
         {[1, 2, 3].map((s) => (
           <div key={s} className={`size-12 rounded-full flex items-center justify-center font-black text-sm transition-all border-4 border-white shadow-md ${step >= s ? 'bg-primary text-white scale-110 shadow-bhagva' : 'bg-gray-100 text-gray-400'}`}>
              {s}
           </div>
         ))}
      </section>

      {/* 📋 FORM AREA */}
      <section className="max-w-4xl mx-auto">
         <div className="bg-white rounded-[4rem] border border-gray-100 shadow-bhagva p-12 md:p-20 space-y-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 size-40 bg-gradient-to-br from-primary/5 to-transparent rotate-[-45deg]"></div>
            
            <div className="space-y-4 text-center md:text-left">
               <h2 className="text-2xl font-black italic tracking-tighter uppercase text-gray-950">मूल जानकारी <span className="text-primary opacity-30">(Mandatory)</span></h2>
               <p className="text-gray-400 font-bold italic text-[10px] uppercase tracking-widest">कृपया अपनी सही जानकारी दर्ज करें</p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-3">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">पूरा नाम</label>
                  <div className="flex items-center gap-4 px-8 py-5 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                     <User className="size-5 text-gray-300" />
                     <input type="text" placeholder="नाम..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" />
                  </div>
               </div>
               
               <div className="space-y-3">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">पिता का नाम</label>
                  <div className="flex items-center gap-4 px-8 py-5 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary/40 transition-all">
                     <Users className="size-5 text-gray-300" />
                     <input type="text" placeholder="पिता का नाम..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">मोबाइल नंबर</label>
                  <div className="flex items-center gap-4 px-8 py-5 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary/40 transition-all">
                     <Phone className="size-5 text-gray-300" />
                     <input type="tel" placeholder="+91..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">शहर / गांव</label>
                  <div className="flex items-center gap-4 px-8 py-5 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary/40 transition-all">
                     <MapPin className="size-5 text-gray-300" />
                     <input type="text" placeholder="स्थान..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" />
                  </div>
               </div>

               <div className="md:col-span-2 space-y-3">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">परिवार का प्रकार</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {['एकल', 'संयुक्त', 'अन्य'].map((opt) => (
                       <button key={opt} type="button" className="px-6 py-4 rounded-xl border-2 border-gray-100 font-bold text-[10px] uppercase tracking-widest text-gray-400 hover:border-primary hover:text-primary transition-all">
                          {opt}
                       </button>
                     ))}
                  </div>
               </div>

               <div className="md:col-span-2 pt-10">
                  <button type="submit" className="w-full py-6 bg-primary text-white font-black rounded-3xl hover:bg-secondary transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center justify-center gap-6 group">
                     अगला चरण <ArrowRight className="size-5 group-hover:translate-x-4 transition-transform" />
                  </button>
               </div>
            </form>
         </div>
      </section>

      {/* 🔐 SECURITY NOTICE */}
      <section className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 p-10 bg-primary/5 rounded-[3rem] border border-primary/10">
         <div className="size-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/10">
            <ShieldCheck className="size-10" />
         </div>
         <div className="flex-grow space-y-2 text-center md:text-left">
            <h4 className="text-lg font-black italic tracking-tighter uppercase text-gray-950">गोपनीयता का आश्वासन</h4>
            <p className="text-[10px] font-bold text-gray-400 leading-relaxed italic">
               आपका डेटा समाज के निजी डेटाबेस में सुरक्षित है। इसका उपयोग केवल समाज की उन्नति और आपसी संपर्क के लिए किया जाएगा। कोई भी अनधिकृत उपयोग वर्जित है।
            </p>
         </div>
      </section>

    </div>
  );
}

import { useState } from "react";
import { 
  User, Mail, Phone, MapPin, PlusCircle, CheckCircle, 
  ShieldCheck, Flag, Users, ArrowRight, Loader2, Home, 
  Briefcase, ShieldAlert, CheckCircle2, Send
} from "lucide-react";
import { samajService } from "../../services/samajService";
import { telegramService } from "../../services/telegramService";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function RegistrationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    phone: "",
    city: "",
    email: "",
    familyType: "एकल",
    occupation: "",
    agreed: false
  });

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.fatherName || !formData.phone || !formData.city) {
         toast.error("कृपया सभी अनिवार्य जानकारी भरें");
         return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
       toast.error("कृपया नियमों और शर्तों को स्वीकार करें");
       return;
    }

    setIsSubmitting(true);
    try {
      await samajService.addMember({
        name: formData.name,
        fatherName: formData.fatherName,
        city: formData.city,
        occupation: formData.occupation || "व्यवसाय",
        phone: formData.phone,
        email: formData.email,
        familyType: formData.familyType,
      });

      // Send Telegram Notification
      try {
        await telegramService.sendRegistrationNotification({
          ...formData,
          occupation: formData.occupation || "व्यवसाय"
        });
        console.log("Telegram notification sent successfully.");
      } catch (tgErr) {
        console.error("Failed to send telegram notification:", tgErr);
        // We don't want to stop the registration process if Telegram fails
      }

      // Simulation of Success Email
      console.log("Sending verification email to:", formData.email);
      
      toast.success("पंजीकरण सफल! पुष्टिकरण ईमेल भेजा गया है।");
      setStep(4); // Success step
    } catch (err) {
      toast.error("पंजीकरण विफल रहा। कृपया पुनः प्रयास करें।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 📝 HEADER */}
      <section className="text-center space-y-10 pt-12 px-6">
         <div className="size-20 mx-auto bg-primary/10 text-primary md:rounded-[2rem] rounded-none flex items-center justify-center shadow-lg animate-pulse border border-primary/10">
            <PlusCircle className="size-10" />
         </div>
         <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase italic leading-tight md:leading-tight md:leading-none">समाज <span className="text-primary underline decoration-primary/10">पंजीकरण</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">ORGANIZE • CONNECT • GROW</p>
         </div>
      </section>

      {/* 📊 STEP INDICATOR */}
      <section className="max-w-xl mx-auto flex items-center justify-between px-10 relative">
         <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-100 -z-10"></div>
         {[1, 2, 3].map((s) => (
           <div key={s} className={`size-12 rounded-full flex items-center justify-center font-black text-sm transition-all border-4 border-white shadow-md ${step >= s ? 'bg-primary text-white scale-110 shadow-bhagva' : 'bg-gray-100 text-gray-400'}`}>
              {s}
           </div>
         ))}
      </section>

      {/* 📋 FORM AREA */}
      <section className="max-w-4xl mx-auto px-6">
         {step < 4 ? (
           <div className="bg-white md:rounded-[4rem] rounded-none border border-gray-100 shadow-bhagva p-8 md:p-20 space-y-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 size-40 bg-gradient-to-br from-primary/5 to-transparent rotate-[-45deg]"></div>
              
              {/* STEP 1: BASIC INFO */}
              {step === 1 && (
                <div className="space-y-12 animate-in fade-in slide-in-from-right-5">
                   <div className="space-y-4 text-center md:text-left">
                      <h2 className="text-2xl font-black italic tracking-tighter uppercase text-gray-950">मूल जानकारी <span className="text-primary opacity-30">(Mandatory)</span></h2>
                      <p className="text-gray-400 font-bold italic text-[10px] uppercase tracking-widest">कृपया अपनी सही जानकारी दर्ज करें</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                         <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">पूरा नाम</label>
                         <div className="flex items-center gap-4 px-8 py-5 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                            <User className="size-5 text-gray-300" />
                            <input required type="text" placeholder="नाम..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                         </div>
                      </div>
                      
                      <div className="space-y-3">
                         <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">पिता का नाम</label>
                         <div className="flex items-center gap-4 px-8 py-5 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                            <Users className="size-5 text-gray-300" />
                            <input required type="text" placeholder="पिता का नाम..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} />
                         </div>
                      </div>

                      <div className="space-y-3">
                         <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">मोबाइल नंबर</label>
                         <div className="flex items-center gap-4 px-8 py-5 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                            <Phone className="size-5 text-gray-300" />
                            <input required type="tel" placeholder="+91..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                         </div>
                      </div>

                      <div className="space-y-3">
                         <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">शहर / गांव</label>
                         <div className="flex items-center gap-4 px-8 py-5 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                            <MapPin className="size-5 text-gray-300" />
                            <input required type="text" placeholder="स्थान..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                         </div>
                      </div>

                      <div className="col-span-full space-y-4">
                         <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">परिवार का प्रकार</label>
                         <div className="grid grid-cols-3 gap-4">
                            {["एकल", "संयुक्त", "अन्य"].map((type) => (
                              <button 
                                key={type} 
                                onClick={() => setFormData({...formData, familyType: type})}
                                className={`py-4 rounded-xl border-2 font-black text-[10px] uppercase italic transition-all ${formData.familyType === type ? 'border-primary text-primary bg-primary/5' : 'border-gray-100 text-gray-300'}`}
                              >
                                {type}
                              </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   <button onClick={nextStep} className="w-full py-6 bg-primary text-white font-black md:rounded-[2rem] rounded-none hover:bg-secondary transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center justify-center gap-4 group">
                      अगला चरण <ArrowRight className="size-5 group-hover:translate-x-3 transition-transform" />
                   </button>
                </div>
              )}

              {/* STEP 2: PROFESSIONAL & CONTACT */}
              {step === 2 && (
                <div className="space-y-12 animate-in fade-in slide-in-from-right-5">
                   <div className="space-y-4 text-center md:text-left border-l-4 border-primary pl-6">
                      <h2 className="text-2xl font-black italic tracking-tighter uppercase text-gray-950">पेशेवर <span className="text-primary">विवरण</span></h2>
                      <p className="text-gray-400 font-bold italic text-[10px] uppercase tracking-widest">Professional & Contact Details</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                         <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">व्यवसाय या पेशा</label>
                         <div className="flex items-center gap-4 px-8 py-5 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                            <Briefcase className="size-5 text-gray-300" />
                            <input required type="text" placeholder="Occupation..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.occupation} onChange={e => setFormData({...formData, occupation: e.target.value})} />
                         </div>
                      </div>

                      <div className="space-y-3">
                         <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">ईमेल पता (Email)</label>
                         <div className="flex items-center gap-4 px-8 py-5 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                            <Mail className="size-5 text-gray-300" />
                            <input required type="email" placeholder="example@mail.com" className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                         </div>
                      </div>
                   </div>

                   <div className="flex gap-4">
                      <button onClick={() => setStep(1)} className="px-12 py-5 bg-gray-100 text-gray-400 font-black md:rounded-[2rem] rounded-none hover:bg-gray-200 transition-all text-xs tracking-widest uppercase italic">पीछे</button>
                      <button onClick={nextStep} className="flex-grow py-5 bg-primary text-white font-black md:rounded-[2rem] rounded-none hover:bg-secondary transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center justify-center gap-4 group">
                         अंतिम विवरण <ArrowRight className="size-5 group-hover:translate-x-3 transition-transform" />
                      </button>
                   </div>
                </div>
              )}

              {/* STEP 3: FINAL REVIEW & TERMS */}
              {step === 3 && (
                <div className="space-y-12 animate-in fade-in slide-in-from-right-5">
                   <div className="space-y-4 text-center md:text-left">
                      <h2 className="text-2xl font-black italic tracking-tighter uppercase text-gray-950">नियम और <span className="text-primary">शर्तें</span></h2>
                      <p className="text-gray-400 font-bold italic text-[10px] uppercase tracking-widest">Verfying Identity</p>
                   </div>

                   <div className="bg-amber-50 md:rounded-[2rem] rounded-none p-10 border border-amber-100 space-y-6">
                      <div className="flex items-center gap-4 text-amber-600">
                         <ShieldAlert className="size-6 shrink-0" />
                         <span className="text-sm font-black uppercase italic tracking-tighter">महत्वपूर्ण सूचना</span>
                      </div>
                      <p className="text-[11px] font-bold text-amber-800 leading-relaxed italic">
                         "मैं एतदद्वारा घोषणा करता हूँ कि मेरे द्वारा दी गई सभी जानकारी पूरी तरह से सत्य है। समाज में व्यवस्था बनाए रखने के लिए प्रबंधन द्वारा जानकारी का सत्यापन किया जा सकता है।"
                      </p>
                      
                      <label className="flex items-center gap-4 cursor-pointer group mt-6">
                         <div className={`size-8 rounded-lg border-2 flex items-center justify-center transition-all ${formData.agreed ? 'bg-primary border-primary text-white' : 'bg-white border-amber-200'}`}>
                            {formData.agreed && <CheckCircle2 className="size-5" />}
                         </div>
                         <input type="checkbox" className="hidden" checked={formData.agreed} onChange={e => setFormData({...formData, agreed: e.target.checked})} />
                         <span className="text-[10px] font-black text-gray-900 uppercase italic">मैं सहमत हूँ</span>
                      </label>
                   </div>

                   <div className="flex gap-4">
                      <button onClick={() => setStep(2)} className="px-12 py-5 bg-gray-100 text-gray-400 font-black md:rounded-[2rem] rounded-none hover:bg-gray-200 transition-all text-xs tracking-widest uppercase italic border-none outline-none">पीछे</button>
                      <button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting}
                        className="flex-grow py-5 bg-gray-950 text-white font-black md:rounded-[2rem] rounded-none hover:bg-primary transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50 border-none outline-none"
                      >
                         {isSubmitting ? <Loader2 className="size-5 animate-spin" /> : <>पंजीकरण समाप्त करें <Send className="size-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" /></>}
                      </button>
                   </div>
                </div>
              )}
           </div>
         ) : (
           /* SUCCESS STEP */
           <div className="bg-white md:rounded-[4rem] rounded-none p-12 md:p-24 text-center space-y-10 shadow-bhagva-lg border border-primary/5 animate-in zoom-in-95 duration-1000">
              <div className="size-32 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner shadow-green-100 mb-8">
                 <CheckCircle className="size-16" />
              </div>
              <div className="space-y-6">
                 <h2 className="text-4xl font-black italic tracking-tighter uppercase text-gray-950">पंजीकरण <span className="text-green-500 underline underline-offset-8 decoration-green-100">सफल</span></h2>
                 <p className="max-w-xl mx-auto text-gray-500 font-bold italic text-sm md:text-md leading-relaxed">
                    धन्यवाद! आपकी समाज सदस्यता का आवेदन प्राप्त हो गया है। हमने आपके ईमेल <span className="text-primary">{formData.email}</span> पर एक पुष्टिकरण संदेश भेजा है। सत्यापन के बाद आप समाज के डिजिटल पोर्टल का पूर्ण उपयोग कर पाएंगे।
                 </p>
              </div>
              <div className="pt-10 flex flex-wrap justify-center gap-6">
                 <button onClick={() => navigate("/")} className="px-16 py-6 bg-gray-950 text-white md:rounded-[2rem] rounded-none font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all shadow-xl">होम पेज पर जाएं</button>
                 <button onClick={() => navigate("/news")} className="px-16 py-6 bg-primary/5 text-primary border border-primary/10 md:rounded-[2rem] rounded-none font-black text-[10px] uppercase tracking-widest hover:bg-primary/10 transition-all italic">समाज समाचार देखें</button>
              </div>
           </div>
         )}
      </section>
    </div>
  );
}

import { Phone, Mail, MapPin, Globe, Flag, Heart, MessageCircle, Send, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { samajService } from "../../services/samajService";
import { toast } from "sonner";

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "सामान्य पूछताछ",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await samajService.addMessage(formData);
      toast.success("आपका संदेश भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।");
      setFormData({ name: "", subject: "सामान्य पूछताछ", message: "" });
    } catch (err) {
      toast.error("संदेश भेजने में त्रुटि हुई।");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="space-y-24 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 📞 HEADER */}
      <section className="text-center space-y-10 pt-12">
         <div className="size-20 mx-auto bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center shadow-lg animate-pulse border border-primary/10">
            <Phone className="size-10" />
         </div>
         <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">हमसे <span className="text-primary underline decoration-primary/10 underline-offset-8">संपर्क</span> सूत्र</h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">GET IN TOUCH • WE ARE HERE</p>
         </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
         {/* 📝 CONTACT FORM */}
         <section className="bg-white p-12 md:p-20 rounded-[4rem] border border-gray-100 shadow-bhagva space-y-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 size-40 bg-gradient-to-br from-primary/5 to-transparent rotate-[-45deg]"></div>
            
            <div className="space-y-4">
               <h2 className="text-2xl font-black italic tracking-tighter uppercase text-gray-950">संदेश <span className="text-primary opacity-50">भेजें</span></h2>
               <p className="text-gray-400 font-bold italic text-[10px] uppercase tracking-widest">हम आपके सुझावों का स्वागत करते हैं</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
               <div className="space-y-3">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">पूरा नाम</label>
                  <div className="flex items-center gap-4 px-8 py-5 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                     <Mail className="size-5 text-gray-300" />
                     <input required type="text" placeholder="नाम..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
               </div>
               
               <div className="space-y-3">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">आपका विषय</label>
                  <div className="flex items-center gap-4 px-8 py-5 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                     <Heart className="size-5 text-gray-300" />
                     <select required className="bg-transparent border-none outline-none w-full font-bold text-xs italic text-gray-500" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                        <option>सामान्य पूछताछ</option>
                        <option>पंजीकरण सहायता</option>
                        <option>सुझाव</option>
                        <option>शिकायत</option>
                     </select>
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">विस्तृत संदेश</label>
                  <div className="flex items-start gap-4 px-8 py-6 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 focus-within:border-primary transition-all">
                     <MessageCircle className="size-6 text-gray-300 mt-1" />
                     <textarea required rows={4} placeholder="अपना संदेश यहाँ लिखें..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                  </div>
               </div>

               <button type="submit" disabled={isSubmitting} className="w-full py-6 bg-primary text-white font-black rounded-3xl hover:bg-secondary transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center justify-center gap-6 group disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="size-5 animate-spin" /> : <>संदेश भेजें <Send className="size-5 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform" /></>}
               </button>
            </form>
         </section>

         {/* 🗺️ ADDRESS & MAP */}
         <section className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                { label: "ईमेल", val: "rakeshlakhara432@gmail.com", icon: Mail, color: "bg-blue-50 text-blue-600" },
                { label: "फोन", val: "+91-9636691724", icon: Phone, color: "bg-green-50 text-green-600" },
                { label: "स्थान", val: "पली, राजस्थान", icon: MapPin, color: "bg-red-50 text-red-600" },
                { label: "वेबसाइट", val: "lakhara-news-website.web.app", icon: Globe, color: "bg-amber-50 text-amber-600" }
               ].map((item, i) => (
                 <div key={i} className="group p-8 bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all hover:-translate-y-1 text-center space-y-4">
                    <div className={`size-14 mx-auto ${item.color} rounded-2xl flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform`}>
                       <item.icon className="size-6" />
                    </div>
                    <div>
                       <h3 className="text-[10px] font-black text-gray-400 uppercase underline decoration-primary/10 tracking-widest leading-none mb-1.5">{item.label}</h3>
                       <p className="text-sm font-black text-gray-950 italic tracking-tighter truncate">{item.val}</p>
                    </div>
                 </div>
               ))}
            </div>
            
            {/* 📍 MAP PLACEHOLDER */}
            <div className="bg-gray-100 h-[300px] md:h-[400px] rounded-[5rem] overflow-hidden relative group border-[10px] border-white shadow-2xl transition-all">
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" className="size-full object-cover group-hover:scale-110 transition-transform duration-[10s]" alt="Map" />
               <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 bg-white/95 backdrop-blur-3xl px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.3em] text-primary shadow-2xl italic border border-primary/20">
                  <MapPin className="size-6 animate-bounce" /> मुख्य कार्यालय
               </div>
            </div>
            
            <div className="bg-gray-950 text-white rounded-[4rem] p-10 flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 mandala-bg opacity-5 group-hover:scale-125 transition-transform duration-[10s]"></div>
               <div className="size-20 bg-primary/20 text-primary rounded-3xl flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-110 transition-transform">
                  <Flag className="size-10 fill-current" />
               </div>
               <div className="text-center md:text-left">
                  <h4 className="text-2xl font-black italic tracking-tighter uppercase leading-none mb-2">लखारा समाज पोर्टल</h4>
                  <p className="text-[10px] font-black text-gray-400 italic uppercase tracking-[0.4em]">एकता &bull; संस्कृति &bull; विकास</p>
               </div>
            </div>
         </section>
      </div>

    </div>
  );
}

import { Phone, Mail, MapPin, Globe, Flag, Heart, MessageCircle, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { samajService } from "../../services/samajService";
import { telegramService } from "../../services/telegramService";
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
      
      try {
        await telegramService.sendContactNotification(formData);
      } catch (tgErr) {
        console.error("Failed to send telegram notification:", tgErr);
      }

      toast.success("आपका संदेश भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।");
      setFormData({ name: "", subject: "सामान्य पूछताछ", message: "" });
    } catch (err) {
      toast.error("संदेश भेजने में त्रुटि हुई।");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="space-y-16 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      {/* 📞 HEADER */}
      <section className="text-center space-y-6 pt-12">
         <div className="size-16 mx-auto bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shadow-sm">
            <Phone className="size-8" />
         </div>
         <div className="space-y-2 px-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">हमसे <span className="text-orange-600">संपर्क</span> करें</h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Get in touch • We are here</p>
         </div>
      </section>

      <div className="container mx-auto px-6 lg:px-0">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* 📝 CONTACT FORM */}
            <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 size-40 bg-gradient-to-br from-orange-600/5 to-transparent rounded-bl-full"></div>
               
               <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-800">संदेश <span className="text-orange-600">भेजें</span></h2>
                  <p className="text-slate-500 font-medium text-sm">हम आपके सुझावों का स्वागत करते हैं</p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700">पूरा नाम</label>
                     <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                        <Mail className="size-5 text-slate-400" />
                        <input required type="text" placeholder="नाम..." className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-800" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                     </div>
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700">आपका विषय</label>
                     <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                        <Heart className="size-5 text-slate-400" />
                        <select required className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-700" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                           <option>सामान्य पूछताछ</option>
                           <option>पंजीकरण सहायता</option>
                           <option>सुझाव</option>
                           <option>शिकायत</option>
                        </select>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700">विस्तृत संदेश</label>
                     <div className="flex items-start gap-3 px-4 py-4 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                        <MessageCircle className="size-5 text-slate-400 mt-0.5" />
                        <textarea required rows={4} placeholder="अपना संदेश यहाँ लिखें..." className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-800 resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                     </div>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-500 transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50">
                     {isSubmitting ? <Loader2 className="size-5 animate-spin" /> : <>संदेश भेजें <Send className="size-4" /></>}
                  </button>
               </form>
            </section>

            {/* 🗺️ ADDRESS & MAP */}
            <section className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                   { label: "ईमेल", val: "rakeshlakhara432@gmail.com", icon: Mail, color: "bg-blue-50 text-blue-600 border-blue-100" },
                   { label: "फोन", val: "+91-9636691724", icon: Phone, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                   { label: "स्थान", val: "पली, राजस्थान", icon: MapPin, color: "bg-rose-50 text-rose-600 border-rose-100" },
                   { label: "वेबसाइट", val: "lakhara-news-website.web.app", icon: Globe, color: "bg-amber-50 text-amber-600 border-amber-100" }
                  ].map((item, i) => (
                    <div key={i} className={`p-6 bg-white rounded-2xl border ${item.color.split(' ')[2]} shadow-sm hover:shadow-md transition-shadow text-center space-y-3`}>
                       <div className={`size-12 mx-auto ${item.color.split(' ').slice(0,2).join(' ')} rounded-full flex items-center justify-center`}>
                          <item.icon className="size-5" />
                       </div>
                       <div>
                          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{item.label}</h3>
                          <p className="text-xs font-bold text-slate-800 truncate" title={item.val}>{item.val}</p>
                       </div>
                    </div>
                  ))}
               </div>
               
               {/* 📍 MAP PLACEHOLDER */}
               <div className="bg-slate-100 h-[250px] md:h-[300px] rounded-3xl overflow-hidden relative shadow-sm border border-slate-200">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" className="size-full object-cover" alt="Map" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/90 backdrop-blur px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider text-orange-600 shadow border border-orange-100">
                     <MapPin className="size-4 animate-bounce" /> मुख्य कार्यालय
                  </div>
               </div>
               
               <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 shadow-lg border border-slate-800">
                  <div className="size-16 bg-orange-600/20 text-orange-500 rounded-2xl flex items-center justify-center shrink-0 border border-orange-600/30">
                     <Flag className="size-8" />
                  </div>
                  <div className="text-center md:text-left">
                     <h4 className="text-xl font-bold leading-none mb-2">लखारा समाज पोर्टल</h4>
                     <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">एकता • संस्कृति • विकास</p>
                  </div>
               </div>
            </section>
         </div>
      </div>
    </div>
  );
}

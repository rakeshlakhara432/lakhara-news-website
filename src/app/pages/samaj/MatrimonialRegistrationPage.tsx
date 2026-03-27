import { useState, useEffect } from "react";
import { 
  Heart, User, MapPin, Calendar, Users, Star, 
  Phone, Mail, BookOpen, Briefcase, IndianRupee, 
  Home, ShieldCheck, ArrowRight, Camera, FileText, 
  Eye, EyeOff, Loader2, CheckCircle2, Lock
} from "lucide-react";
import { samajService, MatrimonialProfile } from "../../services/samajService";
import { telegramService } from "../../services/telegramService";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function MatrimonialRegistrationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    age: 24,
    gender: "वर" as "वर" | "वधु",
    caste: "लखारा",
    religion: "हिन्दू",
    height: "5'5\"",
    education: "",
    occupation: "",
    income: "",
    city: "",
    address: "",
    familyType: "संयुक्त",
    fatherName: "",
    motherName: "",
    phone: "",
    email: "",
    bio: "",
    partnerPreferences: {
      ageRange: "20-30",
      education: "",
      city: ""
    },
    privacySettings: {
      hideContact: true,
      searchable: true
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      // For now using a mock UID until Auth is integrated fully
      const uid = localStorage.getItem("user_uid") || "guest_" + Date.now();
      
      await samajService.addMatrimonial({
        ...formData,
        uid,
        photos: ["https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=1000"], // Initial placeholder
      });

      // Send Telegram Notification
      try {
        await telegramService.sendMatrimonialNotification(formData);
      } catch (tgErr) {
        console.error("Failed to send telegram notification:", tgErr);
      }

      toast.success("प्रोफ़ाइल सफलतापुर्वक जोड़ी गई! सत्यापन के बाद लाइव होगी।");
      setStep(4); // Success step
    } catch (err) {
      toast.error("त्रुटि! कृपया पुनः प्रयास करें।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* 🏹 STICKY HEADER */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
            <Heart className="size-6 fill-current" />
          </div>
          <div>
            <h1 className="text-xl font-black italic tracking-tighter uppercase text-gray-950">विवाह <span className="text-primary">मंच</span></h1>
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Profile Registration</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {[1,2,3].map(s => (
            <div key={s} className={`size-2 rounded-full transition-all duration-500 ${step >= s ? 'w-8 bg-primary' : 'bg-gray-200'}`}></div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-12">
        {step < 4 ? (
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* STEP 1: PERSONAL & PHYSICAL */}
            {step === 1 && (
              <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100 space-y-10 animate-in fade-in slide-in-from-bottom-10">
                <div className="space-y-2 border-l-4 border-primary pl-6">
                  <h2 className="text-2xl font-black italic tracking-tighter uppercase text-gray-950">मूल <span className="text-primary">जानकारी</span></h2>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Personal & Physical Details</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">पूरा नाम</label>
                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                      <User className="size-5 text-gray-300" />
                      <input required type="text" placeholder="नाम..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">आप हैं</label>
                    <div className="grid grid-cols-2 gap-4">
                      {["वर", "वधु"].map(g => (
                        <button key={g} type="button" onClick={() => setFormData({...formData, gender: g as "वर" | "वधु"})} className={`py-4 rounded-xl border-2 font-black text-xs uppercase transition-all ${formData.gender === g ? 'border-primary text-primary bg-primary/5' : 'border-gray-100 text-gray-400'}`}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">उम्र</label>
                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                      <Calendar className="size-5 text-gray-300" />
                      <input required type="number" className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.age} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, age: parseInt(e.target.value)})} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">लंबाई (Height)</label>
                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                      <ArrowRight className="size-5 text-gray-300" />
                      <input required type="text" placeholder="5 ft 8 in..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.height} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, height: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">जाति</label>
                    <input readOnly value="लखारा" className="w-full px-6 py-4 bg-gray-100 rounded-2xl border border-gray-100 font-bold text-xs italic text-gray-400 cursor-not-allowed" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">शहर</label>
                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                      <MapPin className="size-5 text-gray-300" />
                      <input required type="text" placeholder="शहर..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.city} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, city: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button type="submit" className="w-full py-6 bg-primary text-white font-black rounded-3xl hover:bg-secondary transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center justify-center gap-6 group">
                    शिक्षा और व्यवसाय <ArrowRight className="size-5 group-hover:translate-x-4 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: EDUCATION & PROFESSION + FAMILY */}
            {step === 2 && (
              <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100 space-y-10 animate-in fade-in slide-in-from-bottom-10">
                <div className="space-y-2 border-l-4 border-primary pl-6">
                  <h2 className="text-2xl font-black italic tracking-tighter uppercase text-gray-950">कैरियर और <span className="text-primary">परिवार</span></h2>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Education, Career & Family</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">शिक्षा</label>
                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                      <BookOpen className="size-5 text-gray-300" />
                      <input required type="text" placeholder="Degree, PG..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">व्यवसाय / नौकरी</label>
                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                      <Briefcase className="size-5 text-gray-300" />
                      <input required type="text" placeholder="Job Title..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.occupation} onChange={e => setFormData({...formData, occupation: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">सालाना आय (Income)</label>
                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                      <IndianRupee className="size-5 text-gray-300" />
                      <input type="text" placeholder="Income (Optional)..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.income} onChange={e => setFormData({...formData, income: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">परिवार का प्रकार</label>
                    <div className="grid grid-cols-2 gap-4">
                      {["संयुक्त", "एकल"].map(f => (
                        <button key={f} type="button" onClick={() => setFormData({...formData, familyType: f})} className={`py-4 rounded-xl border-2 font-black text-xs uppercase transition-all ${formData.familyType === f ? 'border-primary text-primary bg-primary/5' : 'border-gray-100 text-gray-400'}`}>
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">पिता का नाम</label>
                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                      <Users className="size-5 text-gray-300" />
                      <input required type="text" placeholder="पिता का नाम..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">माता का नाम</label>
                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                      <Users className="size-5 text-gray-300" />
                      <input required type="text" placeholder="माता का नाम..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" value={formData.motherName} onChange={e => setFormData({...formData, motherName: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 pt-6">
                  <button type="button" onClick={() => setStep(1)} className="px-12 py-6 bg-gray-100 text-gray-400 font-black rounded-3xl hover:bg-gray-200 transition-all text-xs tracking-widest uppercase italic">पीछे</button>
                  <button type="submit" className="flex-grow py-6 bg-primary text-white font-black rounded-3xl hover:bg-secondary transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center justify-center gap-6 group">
                    प्राथमिकताएँ और फोटो <ArrowRight className="size-5 group-hover:translate-x-4 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PREFERENCES & PHOTOS */}
            {step === 3 && (
              <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100 space-y-10 animate-in fade-in slide-in-from-bottom-10">
                <div className="space-y-2 border-l-4 border-primary pl-6">
                  <h2 className="text-2xl font-black italic tracking-tighter uppercase text-gray-950">पार्टनर <span className="text-primary">पसंद</span></h2>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Preferences & Privacy</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">पार्टनर उम्र रेंज</label>
                      <input required type="text" placeholder="e.g. 21-26..." className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 font-bold text-xs italic focus:border-primary outline-none" value={formData.partnerPreferences.ageRange} onChange={e => setFormData({...formData, partnerPreferences: {...formData.partnerPreferences, ageRange: e.target.value}})} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">बायो / अपने बारे में</label>
                      <textarea rows={4} placeholder="अपने बारे में कुछ लिखें..." className="w-full px-6 py-6 bg-gray-50/50 rounded-[2rem] border border-gray-100 font-bold text-xs italic focus:border-primary outline-none resize-none" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})}></textarea>
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                           <Lock className="size-4 text-primary" />
                           <span className="text-[10px] font-black uppercase text-gray-900 italic">संपर्क सूत्र छुपाएं</span>
                        </div>
                        <input type="checkbox" className="size-5 accent-primary" checked={formData.privacySettings.hideContact} onChange={e => setFormData({...formData, privacySettings: {...formData.privacySettings, hideContact: e.target.checked}})} />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                           <Eye className="size-4 text-primary" />
                           <span className="text-[10px] font-black uppercase text-gray-900 italic">खोज में दिखाएँ</span>
                        </div>
                        <input type="checkbox" className="size-5 accent-primary" checked={formData.privacySettings.searchable} onChange={e => setFormData({...formData, privacySettings: {...formData.privacySettings, searchable: e.target.checked}})} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="aspect-square bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-100 flex flex-col items-center justify-center gap-4 text-center p-10 group hover:border-primary/20 transition-all cursor-pointer">
                       <div className="size-20 bg-white rounded-3xl shadow-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <Camera className="size-10" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 italic">फोटो अपलोड करें</p>
                          <p className="text-[8px] font-bold text-gray-400 uppercase italic mt-1">Minimum 3 Photos Recommended</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-100 rounded-2xl flex items-center gap-3">
                        <FileText className="size-5 text-gray-300" />
                        <span className="text-[8px] font-black text-gray-400 uppercase truncate">Kundli / Bio-Data</span>
                      </div>
                      <div className="p-4 border border-gray-100 rounded-2xl flex items-center gap-3">
                        <ShieldCheck className="size-5 text-gray-300" />
                        <span className="text-[8px] font-black text-gray-400 uppercase">ID Verification</span>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                       <p className="text-[9px] font-black text-amber-700 leading-relaxed italic uppercase">सूचना: सभी प्रोफाइल व्यवस्थापक द्वारा सत्यापित की जाती हैं। कृपया गलत जानकारी न भरे।</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 pt-6">
                  <button type="button" onClick={() => setStep(2)} className="px-12 py-6 bg-gray-100 text-gray-400 font-black rounded-3xl hover:bg-gray-200 transition-all text-xs tracking-widest uppercase italic border-none outline-none">पीछे</button>
                  <button type="submit" disabled={isSubmitting} className="flex-grow py-6 bg-primary text-white font-black rounded-3xl hover:bg-secondary transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center justify-center gap-6 group disabled:opacity-50 border-none outline-none">
                    {isSubmitting ? <Loader2 className="size-6 animate-spin" /> : <>प्रोफ़ाइल प्रकाशित करें <CheckCircle2 className="size-6 group-hover:scale-125 transition-transform" /></>}
                  </button>
                </div>
              </div>
            )}
          </form>
        ) : (
          /* SUCCESS STEP */
          <div className="bg-white rounded-[4rem] p-20 text-center space-y-10 shadow-bhagva-lg border border-primary/5 animate-in zoom-in-95 duration-700">
             <div className="size-32 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner shadow-green-100">
                <CheckCircle2 className="size-16" />
             </div>
             <div className="space-y-4">
                <h2 className="text-3xl font-black italic tracking-tighter uppercase text-gray-950">पंजीकरण <span className="text-green-500">पूर्ण</span></h2>
                <p className="max-w-md mx-auto text-gray-500 font-bold italic text-sm leading-relaxed">
                   धन्यवाद! आपकी प्रोफ़ाइल सफलतापूर्वक भेज दी गई है। व्यवस्थापक द्वारा सत्यापन के बाद यह विवाह मंच पर सक्रिय हो जाएगी। 
                </p>
             </div>
             <div className="pt-8 flex justify-center gap-6">
                <button onClick={() => navigate("/matrimonial")} className="px-12 py-5 bg-gray-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all">मंच पर लौटें</button>
                <button onClick={() => setStep(1)} className="px-12 py-5 bg-gray-100 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all">नई प्रोफ़ाइल</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

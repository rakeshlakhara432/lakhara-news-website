import { useState } from "react";
import { 
  User, Mail, Phone, MapPin, PlusCircle, CheckCircle, 
  Users, Briefcase, ShieldAlert, CheckCircle2, Download,
  Calendar, Heart, Sparkles, Building, Hash, Camera, Trash2, ArrowRight, ArrowLeft
} from "lucide-react";
import { samajService } from "../../services/samajService";
import { telegramService } from "../../services/telegramService";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { generateMembershipPDF } from "../../utils/generateMembershipPDF";
import { GoogleAuthButton } from "../../components/ui/GoogleAuthButton";
import { uploadFile } from "../../utils/storage";

export function RegistrationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [memberCertData, setMemberCertData] = useState<{
    memberId: string;
    memberNumber: string;
  } | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    birthDate: "",
    gender: "पुरुष" as any,
    bloodGroup: "O+",
    phone: "",
    email: "",
    
    // Address
    state: "Rajasthan",
    district: "",
    city: "",
    pincode: "",
    
    occupation: "",
    familyType: "एकल",
    photoUrl: "",
    agreed: false
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 400;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        setFormData(prev => ({ ...prev, photoUrl: compressedBase64 }));
        setIsUploading(false);
        toast.success("फ़ोटो तैयार है!");
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const validateStep = async () => {
    if (step === 1) {
      if (!formData.name || !formData.fatherName || !formData.birthDate) {
         toast.error("कृपया सभी अनिवार्य व्यक्तिगत जानकारी भरें");
         return false;
      }
    }
    if (step === 2) {
      if (!formData.phone || !formData.city || !formData.state || !formData.pincode) {
         toast.error("कृपया संपर्क विवरण और पूरा पता भरें");
         return false;
      }
      
      // Duplicate Check
      setIsSubmitting(true);
      try {
        const duplicates = await samajService.checkDuplicate(formData.phone, formData.email);
        if (duplicates.phoneExists) {
          toast.error("यह मोबाइल नंबर पहले से पंजीकृत है!");
          return false;
        }
        if (duplicates.emailExists) {
          toast.error("यह ईमेल आईडी पहले से पंजीकृत है!");
          return false;
        }
      } catch (err) {
        toast.error("सत्यापन विफल रहा।");
        return false;
      } finally {
        setIsSubmitting(false);
      }
    }
    return true;
  };

  const nextStep = async () => {
    const isValid = await validateStep();
    if (isValid) setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
       toast.error("कृपया नियमों और शर्तों को स्वीकार करें");
       return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload Photo to Storage if it exists and is base64 (local)
      let photoUrl = formData.photoUrl;
      if (photoUrl && photoUrl.startsWith('data:')) {
        try {
          // We need to convert base64 back to a blob/file or just use the local file if we had it.
          // Since we compressed it to base64, let's fetch it and upload.
          const res = await fetch(photoUrl);
          const blob = await res.blob();
          const file = new File([blob], `member_${Date.now()}.jpg`, { type: 'image/jpeg' });
          photoUrl = await uploadFile(file, 'members');
        } catch (uploadErr) {
          console.error("Storage upload failed:", uploadErr);
          toast.error("Photo upload failed. Using local preview for now.");
        }
      }

      // 2. Get Count for Member ID
      const allMembers = await samajService.getAllMembers();
      const count = allMembers.length + 1;
      const memberNumber = count.toString().padStart(6, "0");
      const memberId = `LS-${memberNumber}`;

      // 3. Add to Firestore
      await samajService.addMember({
        ...formData,
        photoUrl,
        memberId,
        memberNumber,
        isApproved: false,
        createdAt: new Date()
      } as any);

      // 3. Telegram Notification
      try {
        await telegramService.sendRegistrationNotification({
          ...formData,
          memberId
        });
      } catch (tgErr) {
        console.error("Telegram notification failed:", tgErr);
      }

      setMemberCertData({ memberId, memberNumber });
      setStep(4);
      toast.success("पंजीकरण सफलतापूर्वक संपन्न हुआ! 🎉");

      // 4. Auto-download Certificate
      try {
        setIsGeneratingPDF(true);
        await generateMembershipPDF({
          memberId,
          memberNumber,
          name: formData.name,
          fatherName: formData.fatherName,
          address: `${formData.city}, ${formData.district}, ${formData.state}`,
          city: formData.city,
          dateOfIssue: new Date().toLocaleDateString("hi-IN", { day: "2-digit", month: "long", year: "numeric" }),
        });
        toast.success("सदस्यता पत्र (PDF) डाउनलोड हो गया है।");
      } catch (pdfErr) {
        console.error("PDF generation failed:", pdfErr);
      } finally {
        setIsGeneratingPDF(false);
      }
    } catch (err) {
      toast.error("पंजीकरण में त्रुटि आई।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCertificate = async () => {
    if (!memberCertData) return;
    setIsGeneratingPDF(true);
    try {
      await generateMembershipPDF({
        memberId: memberCertData.memberId,
        memberNumber: memberCertData.memberNumber,
        name: formData.name,
        fatherName: formData.fatherName,
        address: `${formData.city}, ${formData.district}, ${formData.state}`,
        city: formData.city,
        dateOfIssue: new Date().toLocaleDateString("hi-IN", { day: "2-digit", month: "long", year: "numeric" }),
      });
      toast.success("PDF डाउनलोड सफल!");
    } catch (err) {
      toast.error("PDF तैयार करने में त्रुटि।");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700 bg-slate-50/50 min-h-screen">
      
      {/* 📝 HEADER */}
      <section className="text-center space-y-4 pt-16">
         <div className="size-20 mx-auto bg-white text-orange-600 rounded-[2rem] flex items-center justify-center shadow-xl border border-orange-100 relative group">
            <div className="absolute inset-2 bg-orange-50 rounded-[1.5rem] scale-0 group-hover:scale-110 transition-transform"></div>
            <PlusCircle className="size-10 relative z-10" />
         </div>
         <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight uppercase tracking-tighter italic" style={{ fontFamily: "'Outfit', sans-serif" }}>समाज <span className="text-orange-600">पंजीकरण</span></h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic">Community Digital Connectivity Protocol</p>
         </div>
      </section>

      {/* 📊 STEP INDICATOR */}
      {step < 4 && (
        <section className="max-w-xl mx-auto flex items-center justify-between px-10 relative">
           <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-slate-200 -z-10 rounded-full"></div>
           {[1, 2, 3].map((s) => (
             <div key={s} className="flex flex-col items-center gap-3">
                <div className={`size-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all border-4 ${step === s ? 'bg-orange-600 text-white border-orange-200 scale-110 shadow-bhagva' : step > s ? 'bg-emerald-500 text-white border-emerald-100 shadow-lg' : 'bg-white text-slate-300 border-slate-100'}`}>
                   {step > s ? <CheckCircle2 className="size-6" /> : s}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${step === s ? 'text-orange-600' : 'text-slate-400'}`}>
                  {s === 1 ? 'Personal' : s === 2 ? 'Contact' : 'Professional'}
                </span>
             </div>
           ))}
        </section>
      )}

      {/* 📋 FORM AREA */}
      <section className="max-w-4xl mx-auto px-6">
         {step < 4 ? (
            <div className="bg-white border border-slate-200 rounded-[3rem] p-8 md:p-14 space-y-10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-[0.02] rotate-12 scale-150">
                  <ShieldAlert className="size-64" />
               </div>

               {/* STEP 1: PERSONAL PROFILE */}
               {step === 1 && (
                 <div className="space-y-10 animate-in slide-in-from-right-5 duration-500">
                    
                    <div className="space-y-6 bg-orange-50/50 p-8 rounded-3xl border border-orange-100">
                       <h3 className="text-sm font-black text-orange-800 uppercase tracking-widest text-center">क्विक-स्टार्ट (Fast Track)</h3>
                       <GoogleAuthButton 
                         label="Google के साथ आगे बढ़ें" 
                         className="shadow-bhagva" 
                         onSuccess={(u) => {
                           setFormData(prev => ({
                             ...prev,
                             name: u.displayName || prev.name,
                             email: u.email || prev.email,
                             photoUrl: u.photoURL || prev.photoUrl
                           }));
                           toast.success("विवरण गूगल प्रोफाइल से ले लिया गया है।");
                         }} 
                       />
                       <p className="text-[9px] text-center text-orange-400 font-bold uppercase tracking-widest">गूगल से जुड़ने पर आपका नाम और ईमेल स्वतः भर जाएगा</p>
                    </div>

                    <div className="flex items-center gap-4">
                       <div className="h-px flex-1 bg-slate-100"></div>
                       <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">अथवा फॉर्म भरें</span>
                       <div className="h-px flex-1 bg-slate-100"></div>
                    </div>

                    <div className="space-y-2 border-l-6 border-orange-600 pl-6">
                       <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">व्यक्तिगत <span className="text-orange-600">प्रोफाइल</span></h2>
                       <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">Basic Member Identification</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-start">
                       {/* Photo Upload Side */}
                       <div className="shrink-0 space-y-4 w-full md:w-auto flex flex-col items-center">
                          <div className="size-40 rounded-[2.5rem] border-4 border-slate-100 bg-slate-50 shadow-inner relative overflow-hidden group">
                             {formData.photoUrl ? (
                                <img src={formData.photoUrl} className="size-full object-cover group-hover:scale-110 transition-transform duration-500" />
                             ) : (
                                <div className="size-full flex flex-col items-center justify-center text-slate-300 gap-2">
                                   <Camera className="size-10" />
                                   <span className="text-[8px] font-black uppercase tracking-widest">Upload Photo</span>
                                </div>
                             )}
                          </div>
                          {formData.photoUrl && (
                             <button type="button" onClick={() => setFormData({...formData, photoUrl: ""})} className="text-rose-500 hover:text-rose-600 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-rose-50 px-4 py-2 rounded-xl transition-all">
                                <Trash2 className="size-3" /> Remove
                             </button>
                          )}
                          {!formData.photoUrl && (
                             <label className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-orange-600 transition-all shadow-lg">
                                {isUploading ? "PROCESS..." : "SELECT PHOTO"}
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                             </label>
                          )}
                       </div>

                       {/* Form Fields Side */}
                       <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">पूरा नाम (Full Name)</label>
                             <div className="flex items-center gap-4 px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-orange-500 focus-within:bg-white transition-all shadow-sm">
                                <User className="size-5 text-slate-300" />
                                <input required type="text" placeholder="नाम लिखें..." className="bg-transparent border-none outline-none w-full text-sm font-black text-slate-800 placeholder:text-slate-300" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">पिता / पति का नाम</label>
                             <div className="flex items-center gap-4 px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-orange-500 focus-within:bg-white transition-all shadow-sm">
                                <Users className="size-5 text-slate-300" />
                                <input required type="text" placeholder="नाम लिखें..." className="bg-transparent border-none outline-none w-full text-sm font-black text-slate-800 placeholder:text-slate-300" value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">जन्म तिथि (DOB) </label>
                             <div className="flex items-center gap-4 px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-orange-500 focus-within:bg-white transition-all shadow-sm">
                                <Calendar className="size-5 text-slate-300" />
                                <input required type="date" className="bg-transparent border-none outline-none w-full text-sm font-black text-slate-800" value={formData.birthDate} onChange={e => setFormData({...formData, birthDate: e.target.value})} />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">लिंग (Gender)</label>
                             <select className="w-full px-5 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-slate-800 outline-none focus:border-orange-500 transition-all shadow-sm appearance-none" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value as any})}>
                                <option value="पुरुष">पुरुष (Male)</option>
                                <option value="महिला">महिला (Female)</option>
                                <option value="अन्य">अन्य (Other)</option>
                             </select>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">रक्त समूह (Blood Group)</label>
                             <div className="flex items-center gap-4 px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-orange-500 focus-within:bg-white transition-all shadow-sm">
                                <Heart className="size-5 text-slate-300" />
                                <select className="bg-transparent border-none outline-none w-full text-sm font-black text-slate-800 appearance-none" value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})}>
                                   {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                                     <option key={bg} value={bg}>{bg}</option>
                                   ))}
                                </select>
                             </div>
                          </div>
                       </div>
                    </div>

                    <button onClick={nextStep} className="w-full py-5 bg-slate-900 border-b-6 border-slate-950 text-white font-black rounded-2xl text-xs uppercase tracking-[0.3em] hover:bg-orange-600 hover:border-orange-800 transition-all shadow-2xl flex items-center justify-center gap-3 active:translate-y-1 active:border-b-0">
                       संपर्क विवरण दर्ज करें <ArrowRight className="size-4" />
                    </button>
                 </div>
               )}

               {/* STEP 2: ADDRESS & CONTACT */}
               {step === 2 && (
                 <div className="space-y-10 animate-in slide-in-from-right-5 duration-500">
                    <div className="space-y-2 border-l-6 border-orange-600 pl-6">
                       <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">संपर्क एवं <span className="text-orange-600">पता</span></h2>
                       <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">Communication & Location Registry</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">मोबाइल नंबर (WhatsApp)</label>
                          <div className="flex items-center gap-4 px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-orange-500 focus-within:bg-white transition-all shadow-sm">
                             <Phone className="size-5 text-slate-300" />
                             <input required type="tel" placeholder="+91..." className="bg-transparent border-none outline-none w-full text-sm font-black text-slate-800" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">ईमेल आईडी (Email)</label>
                          <div className="flex items-center gap-4 px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-orange-500 focus-within:bg-white transition-all shadow-sm">
                             <Mail className="size-5 text-slate-300" />
                             <input type="email" placeholder="example@mail.com" className="bg-transparent border-none outline-none w-full text-sm font-black text-slate-800" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                          </div>
                       </div>

                       <div className="col-span-full grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">राज्य (State)</label>
                             <input required type="text" placeholder="Rajasthan..." className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-slate-800 outline-none focus:border-orange-500 transition-all shadow-sm" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">जिला (District)</label>
                             <input required type="text" placeholder="District..." className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-slate-800 outline-none focus:border-orange-500 transition-all shadow-sm" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">शहर / गांव</label>
                             <input required type="text" placeholder="City..." className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-slate-800 outline-none focus:border-orange-500 transition-all shadow-sm" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">पिनकोड (Pincode)</label>
                             <input required type="text" placeholder="302001..." className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-slate-800 outline-none focus:border-orange-500 transition-all shadow-sm" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} />
                          </div>
                       </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                       <button onClick={() => setStep(1)} className="px-8 py-5 bg-slate-100 text-slate-600 font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-3">
                          <ArrowLeft className="size-4" /> Back
                       </button>
                       <button onClick={nextStep} disabled={isSubmitting} className="flex-grow py-5 bg-slate-900 border-b-6 border-slate-950 text-white font-black rounded-2xl text-xs uppercase tracking-[0.3em] hover:bg-orange-600 transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50">
                          {isSubmitting ? "CHECKING REPOSITORY..." : "पेशेवर विवरण दर्ज करें"} <ArrowRight className="size-4" />
                       </button>
                    </div>
                 </div>
               )}

               {/* STEP 3: PROFESSIONAL & FINAL REVIEW */}
               {step === 3 && (
                 <div className="space-y-10 animate-in slide-in-from-right-5 duration-500">
                    <div className="space-y-2 border-l-6 border-orange-600 pl-6">
                       <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">अंतिम <span className="text-orange-600">प्रमाणीकरण</span></h2>
                       <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">Professional Info & Quality Standards</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">व्यवसाय या पेशा (Occupation)</label>
                          <div className="flex items-center gap-4 px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-orange-500 focus-within:bg-white transition-all shadow-sm">
                             <Briefcase className="size-5 text-slate-300" />
                             <input required type="text" placeholder="स्व-रोजगार, नौकरी, विद्यार्थी..." className="bg-transparent border-none outline-none w-full text-sm font-black text-slate-800" value={formData.occupation} onChange={e => setFormData({...formData, occupation: e.target.value})} />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">परिवार का प्रकार (Family)</label>
                          <div className="flex gap-4">
                             {["एकल", "संयुक्त"].map(t => (
                               <button key={t} onClick={() => setFormData({...formData, familyType: t})} className={`flex-1 py-4 px-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${formData.familyType === t ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                                  {t} परिवार
                               </button>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
                       <div className="absolute top-0 right-0 p-8 opacity-10">
                          <ShieldAlert className="size-20" />
                       </div>
                       <div className="space-y-6 relative z-10">
                          <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                             <div className="size-10 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center">
                                <Sparkles className="size-5" />
                             </div>
                             <h4 className="font-black text-xs uppercase tracking-[0.3em]">सदस्यता घोषणा पत्र</h4>
                          </div>
                          <p className="text-[11px] font-bold text-slate-400 leading-relaxed italic opacity-80 uppercase tracking-widest">
                             "मैं एतदद्वारा पुष्टि करता हूँ कि मेरे द्वारा प्रदान की गई जानकारी पूर्णतः सत्य है। समाज के नियमों का पालन करना मेरा कर्तव्य है।"
                          </p>
                          <label className="flex items-center gap-5 cursor-pointer group pt-2">
                             <div className={`size-10 rounded-xl flex items-center justify-center transition-all border-2 ${formData.agreed ? 'bg-orange-600 border-orange-600 text-white scale-110 shadow-bhagva' : 'bg-white/5 border-white/10 text-transparent'}`}>
                                <CheckCircle2 className="size-6" />
                             </div>
                             <input type="checkbox" className="hidden" checked={formData.agreed} onChange={e => setFormData({...formData, agreed: e.target.checked})} />
                             <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em] select-none group-hover:text-orange-400 transition-colors">शर्तों से सहमत हूँ</span>
                          </label>
                       </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                       <button onClick={() => setStep(2)} className="px-8 py-5 bg-slate-100 text-slate-600 font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-3">
                          <ArrowLeft className="size-4" /> Back
                       </button>
                       <button 
                         onClick={handleSubmit} 
                         disabled={isSubmitting}
                         className="flex-grow py-5 bg-orange-600 border-b-6 border-orange-800 text-white font-black rounded-2xl text-xs uppercase tracking-[0.3em] hover:bg-slate-900 hover:border-slate-950 transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                       >
                          {isSubmitting ? <Sparkles className="size-5 animate-spin" /> : "पंजीकरण समाप्त करें"} <ArrowRight className="size-4" />
                       </button>
                    </div>
                 </div>
               )}
            </div>
         ) : (
            <div className="bg-white rounded-[4rem] p-10 md:p-16 space-y-12 shadow-2xl border border-slate-200 text-center relative overflow-hidden">
               <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400"></div>

               {/* ── Success Hero ── */}
               <div className="space-y-6">
                  <div className="relative inline-flex mb-4">
                     <div className="size-32 bg-emerald-50 text-emerald-500 flex items-center justify-center rounded-[2.5rem] mx-auto ring-8 ring-emerald-50 shadow-inner">
                        <CheckCircle className="size-16" />
                     </div>
                     <div className="absolute -top-3 -right-3 size-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-xs font-black rotate-12 shadow-xl border-4 border-white animate-bounce">✓</div>
                  </div>
                  <div className="space-y-2">
                     <h2 className="text-4xl md:text-5xl font-black text-slate-800 leading-none tracking-tighter uppercase italic" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        पंजीकरण <span className="text-emerald-500">सफल!</span>
                     </h2>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic">Member Access protocol Established</p>
                  </div>
                  <p className="max-w-xl mx-auto text-slate-500 font-bold text-sm leading-relaxed opacity-80 uppercase tracking-widest border-t border-slate-50 pt-6">
                    आपका लखारा समाज कम्युनिटी में स्वागत है। आपका <strong>LS DIGITAL ID CARD</strong> तैयार है।
                  </p>
               </div>

               {/* ── Member ID Badge ── */}
               {memberCertData && (
                  <div className="mx-auto max-w-md">
                     <div
                        className="rounded-[2.5rem] p-10 text-center space-y-4 shadow-2xl relative overflow-hidden border-4 border-[#d4af37]"
                        style={{ background: "linear-gradient(135deg,#1a237e,#0d114a)" }}
                     >
                        <div className="absolute -top-10 -right-10 size-40 bg-white/5 rounded-full blur-3xl"></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3" style={{ color: "#d4af37" }}>
                           <Sparkles className="size-4" /> OFFICIAL MEMBER ID <Sparkles className="size-4" />
                        </p>
                        <p className="text-5xl font-black text-white tracking-tighter italic" style={{ fontFamily: "'Outfit', sans-serif" }}>
                           {memberCertData.memberId}
                        </p>
                        <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-6">
                           <div className="text-left">
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">MEMBER NO.</p>
                              <p className="text-xl font-black text-white" style={{ color: "#d4af37" }}>{memberCertData.memberNumber}</p>
                           </div>
                           <div className="text-left border-l border-white/10 pl-6">
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">STATUS</p>
                              <p className="text-sm font-black text-emerald-400 uppercase tracking-widest">ACTIVE</p>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* ── Certificate Actions ── */}
               {memberCertData && (
                  <div className="space-y-6 pt-4">
                     <button
                        onClick={handleDownloadCertificate}
                        disabled={isGeneratingPDF}
                        className="w-full h-24 bg-orange-600 border-b-8 border-orange-800 text-white rounded-[2rem] font-black flex items-center justify-center gap-6 group hover:translate-y-[-4px] active:translate-y-1 active:border-b-0 transition-all shadow-2xl disabled:opacity-50"
                     >
                        <Download className="size-10 group-hover:scale-125 transition-transform" />
                        <div className="text-left">
                           <p className="text-2xl uppercase tracking-tighter italic" style={{ fontFamily: "'Outfit', sans-serif" }}>MEMBERSHIP PDF</p>
                           <p className="text-[10px] opacity-70 uppercase tracking-[0.3em]">Download Premium Certificate</p>
                        </div>
                     </button>

                     {/* WhatsApp Share */}
                     <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                           `🏆 *लखारा समाज कम्युनिटी - डिजिटल सर्टिफिकेट*\n\n` +
                           `👤 *नाम:* ${formData.name}\n` +
                           `🆔 *ID:* ${memberCertData.memberId}\n` +
                           `📜 *Membership Number:* ${memberCertData.memberNumber}\n\n` +
                           `समाज की डिजिटल न्यूज़ वेबसाइट: https://lakhara-news-website.com`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-4 py-5 bg-emerald-600 border-b-6 border-emerald-800 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-emerald-700 transition-all active:translate-y-1 active:border-b-0"
                     >
                        <MessageSquareShare /> WhatsApp पर साझा करें
                     </a>
                  </div>
               )}

               <div className="pt-8 flex flex-col sm:flex-row justify-center gap-6">
                  <button onClick={() => navigate("/")} className="px-10 py-4 bg-slate-100 text-slate-700 font-black rounded-2xl hover:bg-slate-200 transition-all text-xs uppercase tracking-widest">होम पेज</button>
                  <button onClick={() => navigate("/profile")} className="px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all text-xs uppercase tracking-widest shadow-xl shadow-indigo-100">प्रोफाइल देखें</button>
               </div>
            </div>
         )}
      </section>
    </div>
  );
}

// Add these to imports or local scope
const MessageSquareShare = () => (
   <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

import { useState } from "react";
import { 
  User, Mail, Phone, MapPin, PlusCircle, CheckCircle, 
  Users, Briefcase, ShieldAlert, CheckCircle2, Download,
} from "lucide-react";
import { samajService } from "../../services/samajService";
import { telegramService } from "../../services/telegramService";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { generateMembershipPDF } from "../../utils/generateMembershipPDF";

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
    city: "",
    email: "",
    familyType: "एकल",
    occupation: "",
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
        toast.success("फ़ोटो अपलोड हो गई!");
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

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
      const docRef = await samajService.addMember({
        name: formData.name,
        fatherName: formData.fatherName,
        city: formData.city,
        occupation: formData.occupation || "व्यवसाय",
        phone: formData.phone,
        email: formData.email,
        familyType: formData.familyType,
        photoUrl: formData.photoUrl,
      });

      try {
        await telegramService.sendRegistrationNotification({
          ...formData,
          occupation: formData.occupation || "व्यवसाय"
        });
      } catch (tgErr) {
        console.error("Failed to send telegram notification:", tgErr);
      }

      // Generate member ID and number using Firestore doc ID
      const year = new Date().getFullYear();
      const shortId = docRef.id.slice(-4).toUpperCase();
      const memberId = `ARHLM_ID_${year}_${shortId}`;
      const memberNumber = shortId;

      setMemberCertData({ memberId, memberNumber });
      setStep(4);
      toast.success("पंजीकरण सफल!");

      // Auto-download the certificate PDF
      try {
        setIsGeneratingPDF(true);
        await generateMembershipPDF({
          memberId,
          memberNumber,
          name: formData.name,
          fatherName: formData.fatherName,
          address: formData.city,
          city: formData.city,
          dateOfIssue: new Date().toLocaleDateString("hi-IN", { day: "2-digit", month: "long", year: "numeric" }),
        });
        toast.success("बधाई पत्र (PDF) डाउनलोड हो गया!");
      } catch (pdfErr) {
        console.error("PDF generation failed:", pdfErr);
        toast.error("PDF तैयार नहीं हो सका। नीचे बटन से पुनः प्रयास करें।");
      } finally {
        setIsGeneratingPDF(false);
      }
    } catch (err) {
      toast.error("पंजीकरण विफल रहा।");
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
        address: formData.city,
        city: formData.city,
        dateOfIssue: new Date().toLocaleDateString("hi-IN", { day: "2-digit", month: "long", year: "numeric" }),
      });
      toast.success("PDF डाउनलोड हो गया!");
    } catch (err) {
      toast.error("PDF तैयार नहीं हो सका।");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      {/* 📝 HEADER */}
      <section className="text-center space-y-6 pt-12">
         <div className="size-16 mx-auto bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shadow-sm">
            <PlusCircle className="size-8" />
         </div>
         <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">समाज <span className="text-orange-600">पंजीकरण</span></h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Organize • Connect • Grow</p>
         </div>
      </section>

      {/* 📊 STEP INDICATOR */}
      <section className="max-w-md mx-auto flex items-center justify-between px-6 relative">
         <div className="absolute top-1/2 left-6 right-6 h-1 bg-slate-200 -z-10 rounded-full"></div>
         {[1, 2, 3].map((s) => (
           <div key={s} className={`size-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${step >= s ? 'bg-orange-600 text-white border-orange-600 shadow' : 'bg-white text-slate-400 border-slate-200'}`}>
              {s}
           </div>
         ))}
      </section>

      {/* 📋 FORM AREA */}
      <section className="max-w-3xl mx-auto px-6">
         {step < 4 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-12 space-y-8 shadow-sm">
               
               {/* STEP 1: BASIC INFO */}
               {step === 1 && (
                 <div className="space-y-8">
                    <div className="space-y-1 border-l-4 border-orange-600 pl-4">
                       <h2 className="text-2xl font-bold text-slate-800">मूल जानकारी</h2>
                       <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Step 1 of 3</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700">पूरा नाम</label>
                          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 transition-colors">
                             <User className="size-5 text-slate-400" />
                             <input required type="text" placeholder="नाम..." className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-800" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                          </div>
                       </div>
                       
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700">प्रोफ़ाइल फ़ोटो</label>
                          <div className="bg-slate-50 border border-slate-200 rounded-xl flex items-center px-4 overflow-hidden h-[46px] focus-within:border-orange-500 transition-all">
                             {formData.photoUrl ? (
                               <div className="flex items-center gap-3 w-full">
                                  <img src={formData.photoUrl} className="size-8 rounded-full object-cover" />
                                  <span className="text-xs font-bold text-slate-600 flex-1 truncate">फ़ोटो अपलोड की गई</span>
                                  <button type="button" onClick={() => setFormData({...formData, photoUrl: ""})} className="text-rose-500 hover:text-rose-600 text-[10px] uppercase font-bold tracking-widest bg-rose-50 px-2 py-1 rounded">हटाएं</button>
                               </div>
                             ) : (
                               <label className="flex items-center gap-2 w-full cursor-pointer text-slate-500 hover:text-orange-600 transition-colors">
                                  <span className="text-sm font-medium leading-none mt-1">{isUploading ? "प्रतीक्षा करें..." : "+ फ़ोटो अपलोड करें"}</span>
                                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                               </label>
                             )}
                          </div>
                       </div>
                       
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700">पिता का नाम</label>
                          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 transition-colors">
                             <Users className="size-5 text-slate-400" />
                             <input required type="text" placeholder="पिता का नाम..." className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-800" value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700">मोबाइल नंबर</label>
                          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 transition-colors">
                             <Phone className="size-5 text-slate-400" />
                             <input required type="tel" placeholder="+91..." className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-800" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700">शहर / गांव</label>
                          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 transition-colors">
                             <MapPin className="size-5 text-slate-400" />
                             <input required type="text" placeholder="स्थान..." className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-800" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                          </div>
                       </div>

                       <div className="col-span-full space-y-3">
                          <label className="text-xs font-bold text-slate-700">परिवार का प्रकार</label>
                          <div className="grid grid-cols-3 gap-3">
                             {["एकल", "संयुक्त", "अन्य"].map((type) => (
                               <button 
                                 key={type} 
                                 onClick={() => setFormData({...formData, familyType: type})}
                                 className={`py-3 rounded-xl font-bold text-xs transition-colors border ${formData.familyType === type ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}
                               >
                                 {type}
                               </button>
                             ))}
                          </div>
                       </div>
                    </div>

                    <button onClick={nextStep} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-orange-600 transition-colors">
                       अगला चरण
                    </button>
                 </div>
               )}

               {/* STEP 2: PROFESSIONAL & CONTACT */}
               {step === 2 && (
                 <div className="space-y-8">
                    <div className="space-y-1 border-l-4 border-orange-600 pl-4">
                       <h2 className="text-2xl font-bold text-slate-800">पेशेवर विवरण</h2>
                       <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Step 2 of 3</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700">व्यवसाय या पेशा</label>
                          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 transition-colors">
                             <Briefcase className="size-5 text-slate-400" />
                             <input required type="text" placeholder="Occupation..." className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-800" value={formData.occupation} onChange={e => setFormData({...formData, occupation: e.target.value})} />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700">ईमेल पता</label>
                          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 transition-colors">
                             <Mail className="size-5 text-slate-400" />
                             <input required type="email" placeholder="example@mail.com" className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-800" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                          </div>
                       </div>
                    </div>

                    <div className="flex gap-3">
                       <button onClick={() => setStep(1)} className="px-8 py-4 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">पीछे</button>
                       <button onClick={nextStep} className="flex-grow py-4 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-orange-600 transition-colors">
                          अंतिम विवरण
                       </button>
                    </div>
                 </div>
               )}

               {/* STEP 3: FINAL REVIEW & TERMS */}
               {step === 3 && (
                 <div className="space-y-8">
                    <div className="space-y-1 border-l-4 border-orange-600 pl-4">
                       <h2 className="text-2xl font-bold text-slate-800">नियम और शर्तें</h2>
                       <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">Step 3 of 3</p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                       <div className="flex items-center gap-3 text-orange-600">
                          <ShieldAlert className="size-6" />
                          <span className="text-lg font-bold">अंतिम पुष्टिकरण</span>
                       </div>
                       <p className="text-sm font-medium text-slate-600 leading-relaxed">
                          "मैं एतदद्वारा घोषणा करता हूँ कि मेरे द्वारा दी गई सभी जानकारी पूरी तरह से सत्य है। समाज में व्यवस्था बनाए रखने के लिए प्रबंधन द्वारा जानकारी का सत्यापन किया जा सकता है।"
                       </p>
                       
                       <label className="flex items-center gap-4 cursor-pointer mt-6">
                          <div className={`size-8 rounded-lg flex items-center justify-center transition-colors border-2 ${formData.agreed ? 'bg-orange-600 border-orange-600 text-white' : 'bg-white border-slate-300 text-transparent'}`}>
                             <CheckCircle2 className="size-5" />
                          </div>
                          <input type="checkbox" className="hidden" checked={formData.agreed} onChange={e => setFormData({...formData, agreed: e.target.checked})} />
                          <span className="text-base font-bold text-slate-800 select-none">मैं सहमत हूँ</span>
                       </label>
                    </div>

                    <div className="flex gap-3">
                       <button onClick={() => setStep(2)} className="px-8 py-4 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">पीछे</button>
                       <button 
                         onClick={handleSubmit} 
                         disabled={isSubmitting}
                         className="flex-grow py-4 bg-orange-600 text-white font-bold rounded-xl text-sm hover:bg-orange-500 transition-colors flex justify-center items-center disabled:opacity-50"
                       >
                          {isSubmitting ? "प्रतीक्षा करें..." : "पंजीकरण समाप्त करें"}
                       </button>
                    </div>
                 </div>
               )}
            </div>
         ) : (
            <div className="bg-white rounded-3xl p-10 md:p-16 text-center space-y-8 shadow-sm border border-slate-200">
               <div className="size-24 bg-emerald-50 text-emerald-500 flex items-center justify-center rounded-full mx-auto">
                  <CheckCircle className="size-12" />
               </div>
               <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">पंजीकरण <span className="text-emerald-500">सफल</span></h2>
                  <p className="max-w-md mx-auto text-slate-500 font-medium text-base">
                     धन्यवाद! आपकी समाज सदस्यता का आवेदन प्राप्त हो गया है। सत्यापन के बाद आप समाज के डिजिटल पोर्टल का पूर्ण उपयोग कर पाएंगे।
                  </p>
               </div>

               {/* Member ID Badge */}
               {memberCertData && (
                  <div className="bg-orange-50 border border-orange-200 rounded-2xl px-8 py-5 inline-block space-y-1">
                     <p className="text-xs font-bold uppercase tracking-widest text-orange-500">आपका सदस्यता विवरण</p>
                     <p className="text-lg font-extrabold text-slate-800">{memberCertData.memberId}</p>
                     <p className="text-sm text-slate-500 font-medium">सदस्यता संख्या: <strong className="text-slate-700">{memberCertData.memberNumber}</strong></p>
                  </div>
               )}

               {/* Certificate Download */}
               {memberCertData && (
                  <div className="space-y-3">
                     <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">बधाई पत्र (Certificate)</p>
                     <button
                        onClick={handleDownloadCertificate}
                        disabled={isGeneratingPDF}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-2xl hover:opacity-90 transition-all text-sm shadow-lg disabled:opacity-50"
                     >
                        <Download className="size-5" />
                        {isGeneratingPDF ? "PDF तैयार हो रही है..." : "बधाई पत्र डाउनलोड करें (PDF)"}
                     </button>
                  </div>
               )}

               <div className="pt-2 flex flex-col md:flex-row justify-center gap-4">
                  <button onClick={() => navigate("/")} className="px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm">होम पेज पर जाएं</button>
                  <button onClick={() => navigate("/news")} className="px-8 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-500 transition-colors text-sm shadow">समाज समाचार</button>
               </div>
            </div>
         )}
      </section>
    </div>
  );
}

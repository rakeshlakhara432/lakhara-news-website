import { useState, useEffect, useRef } from "react";
import {
  User, Mail, Lock, LogIn, UserPlus, ShieldCheck, Camera,
  Settings, Save, MapPin, Check, Zap, Play, Eye, Bookmark, Share2, LogOut, X, Loader2
} from "lucide-react";
import { auth, db, storage } from "../data/firebase";
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, updateProfile, GoogleAuthProvider, signInWithPopup, signInWithCustomToken
} from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { getArticles } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";

// ── Main Component ─────────────────────────────────────────────────────────────
export function ProfilePage() {
  const { user, userData, loading: authLoading } = useAuth();
  const functions = getFunctions();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  // OTP State
  const [useOTP, setUseOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpEmail, setOtpEmail] = useState("");

  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", bio: "", location: "" });
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [displayBio, setDisplayBio] = useState("");
  const [displayLoc, setDisplayLoc] = useState("");

  const [savedArticles, setSavedArticlesState] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const photo = userData?.photoURL || user.photoURL || null;
    setPhotoURL(photo);
    const name = userData?.name || user.displayName || user.email || "";
    const bio  = userData?.bio  || "लखारा डिजिटल न्यूज नेटवर्क का गर्वित सदस्य।";
    const loc  = userData?.location || "India";
    setEditForm({ name, bio, location: loc });
    setDisplayName(name);
    setDisplayBio(bio);
    setDisplayLoc(loc);
  }, [user, userData]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success("गूगल के माध्यम से सफलतापूर्वक लॉगिन किया गया।");
      
      // Ensure user document exists
      const userRef = doc(db, "users", result.user.uid);
      await setDoc(userRef, {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: "member",
        joinedAt: new Date().toISOString()
      }, { merge: true });
      
    } catch (error: any) {
      toast.error("गूगल लॉगिन विफल रहा: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpEmail) return toast.error("कृपया ईमेल दर्ज करें।");
    setIsLoading(true);
    try {
      const sendOTP = httpsCallable(functions, 'sendOTP');
      await sendOTP({ email: otpEmail });
      setOtpSent(true);
      toast.success("वेरिफिकेशन कोड आपके ईमेल पर भेज दिया गया है।");
    } catch (error: any) {
      toast.error("OTP भेजने में विफल: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) return toast.error("कृपया 6-अंकों का कोड दर्ज करें।");
    setIsLoading(true);
    try {
      const verifyOTP = httpsCallable(functions, 'verifyOTP');
      const result: any = await verifyOTP({ email: otpEmail, otp: otpCode });
      
      if (result.data.success) {
        await signInWithCustomToken(auth, result.data.token);
        toast.success("सुरक्षित रूप से लॉगिन किया गया।");
      }
    } catch (error: any) {
      toast.error("वेरिफिकेशन विफल: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setIsUploadingPhoto(true);
    try {
      const storageRef = ref(storage, `profile_photos/${user.uid}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await updateProfile(user, { photoURL: url });
      await updateDoc(doc(db, "users", user.uid), { photoURL: url });
      setPhotoURL(url);
      toast.success("प्रोफाइल फोटो अपडेट हो गई है।");
    } catch {
      toast.error("फोटो अपलोड विफल रही।");
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!user) return;
    setIsSavingEdit(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        name: editForm.name,
        bio: editForm.bio,
        location: editForm.location,
      });
      setDisplayName(editForm.name);
      setDisplayBio(editForm.bio);
      setDisplayLoc(editForm.location);
      setShowEditModal(false);
      toast.success("प्रोफाइल सफलतापूर्वक अपडेट हो गई।");
    } catch {
      toast.error("प्रोफाइल अपडेट विफल रही।");
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          toast.error("पासवर्ड मैच नहीं कर रहे हैं।");
          setIsLoading(false);
          return;
        }
        const { user: newUser } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await updateProfile(newUser, { displayName: formData.name });
        await setDoc(doc(db, "users", newUser.uid), {
          uid: newUser.uid, name: formData.name, email: formData.email,
          role: "member", joinedAt: new Date().toISOString(),
          bio: "लखारा डिजिटल न्यूज नेटवर्क का गर्वित सदस्य।", location: "India",
        });
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      toast.success("लॉगिन सफल!");
    } catch (err: any) {
      toast.error(err.message || "लॉगिन विफल।");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
           <span className="text-4xl font-black text-primary tracking-tighter">LAKHARA</span>
           <span className="text-[12px] font-black text-gray-950 uppercase tracking-widest">DIGITAL NEWS</span>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="bg-[#fcfcfc] min-h-screen pb-20">
        <div className="container mx-auto px-6 py-10 max-w-4xl space-y-12">
          {/* ── Profile Header ── */}
          <section className="bg-gray-950 p-10 border-b-8 border-primary text-white">
             <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="relative">
                   <div className="size-40 bg-white/5 p-1 border-2 border-primary overflow-hidden relative group">
                      {isUploadingPhoto ? (
                         <div className="size-full flex items-center justify-center">
                            <Loader2 className="size-8 text-primary animate-spin" />
                         </div>
                      ) : photoURL ? (
                        <img src={photoURL} alt="Profile" className="size-full object-cover" />
                      ) : (
                        <div className="size-full bg-white/5 flex items-center justify-center text-primary">
                           <User className="size-16" />
                        </div>
                      )}
                      <button 
                        onClick={() => photoInputRef.current?.click()}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                      >
                         <Camera className="size-8 text-white" />
                      </button>
                   </div>
                   <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </div>

                <div className="flex-1 text-center md:text-left space-y-4">
                   <div>
                      <h1 className="text-4xl font-black text-white uppercase leading-none mb-2">{displayName}</h1>
                      <div className="flex flex-wrap justify-center md:justify-start gap-3">
                         <div className="flex items-center gap-2 bg-primary text-white px-3 py-1 font-black text-[10px] uppercase tracking-widest">
                            <ShieldCheck className="size-3" />
                            <span>सत्यापित सदस्य</span>
                         </div>
                         <div className="flex items-center gap-2 bg-white/10 text-gray-300 px-3 py-1 font-black text-[10px] uppercase tracking-widest">
                            <MapPin className="size-3" />
                            <span>{displayLoc}</span>
                         </div>
                      </div>
                   </div>
                   <p className="text-gray-400 font-bold italic text-lg leading-relaxed line-clamp-2 max-w-xl">"{displayBio}"</p>
                   <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                      <button onClick={() => setShowEditModal(true)} className="bg-white text-gray-950 px-8 py-3 font-black text-[11px] uppercase tracking-widest border border-white">प्रोफाइल बदलें</button>
                      <button onClick={() => signOut(auth)} className="bg-transparent text-white px-8 py-3 font-black text-[11px] uppercase tracking-widest border border-white/20">लॉग आउट</button>
                   </div>
                </div>
             </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
             <div className="space-y-8">
                <div className="flex items-center gap-4 border-l-8 border-primary pl-6">
                   <h2 className="text-2xl font-black text-gray-900 uppercase">मुख्य ऑपरेशन्स</h2>
                </div>
                
                <div className="space-y-4">
                   <div className="p-8 bg-white border border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                         <div className="size-12 bg-primary/10 flex items-center justify-center text-primary">
                            <Zap className="size-6" />
                         </div>
                         <div className="space-y-1">
                            <span className="font-black text-lg block uppercase tracking-tighter">नेटवर्क एक्सेस</span>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">सक्रिय सदस्य लॉगिन</span>
                         </div>
                      </div>
                      <Check className="size-6 text-green-600" />
                   </div>
                   <div className="p-8 bg-gray-950 text-white border border-gray-800 flex items-center justify-between">
                       <div className="flex items-center gap-6">
                          <div className="size-12 bg-white/10 flex items-center justify-center text-primary">
                             <ShieldCheck className="size-6" />
                          </div>
                          <div className="space-y-1">
                             <span className="font-black text-lg block uppercase tracking-tighter">प्रोटोकॉल स्टेटस</span>
                             <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">पूर्ण सुरक्षित नियंत्रण</span>
                          </div>
                       </div>
                    </div>
                </div>
             </div>

             <div className="space-y-8">
                <div className="flex items-center gap-4 border-l-8 border-primary pl-6">
                   <h2 className="text-2xl font-black text-gray-900 uppercase">सुरक्षित खबर</h2>
                </div>
                
                <div className="space-y-4">
                   {savedArticles.length === 0 ? (
                      <div className="bg-gray-50 p-12 text-center border border-dashed border-gray-200">
                         <Bookmark className="size-10 text-gray-200 mx-auto mb-4" />
                         <span className="text-lg font-black text-gray-950 uppercase">कोई सुरक्षित खबर नहीं</span>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">खबरों को यहाँ देखने के लिए उन्हें सेव करें</p>
                      </div>
                   ) : (
                      savedArticles.map(article => (
                        <ArticleCard key={article.id} article={article} variant="horizontal" />
                      ))
                   )}
                </div>
             </div>
          </div>
        </div>

        {/* ── Edit Modal ── */}
        {showEditModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <div className="absolute inset-0 bg-gray-950/80" onClick={() => setShowEditModal(false)}></div>
             <div className="bg-white w-full max-w-lg p-10 relative z-10 border-t-8 border-primary">
                <div className="flex justify-between items-center mb-10">
                   <h2 className="text-3xl font-black text-gray-950 uppercase tracking-tighter">प्रोफाइल <span className="text-primary">बदलें</span></h2>
                   <button onClick={() => setShowEditModal(false)} className="size-10 bg-gray-50 flex items-center justify-center text-gray-400">
                      <X className="size-6" />
                   </button>
                </div>
                
                <div className="space-y-8">
                   <div className="space-y-3">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">आपका नाम</label>
                      <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-4 font-bold outline-none text-lg focus:border-primary" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">परिचय (बायो)</label>
                      <textarea rows={3} value={editForm.bio} onChange={e => setEditForm({...editForm, bio: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-4 font-bold outline-none text-lg focus:border-primary resize-none" />
                   </div>
                   <button onClick={handleSaveEdit} disabled={isSavingEdit} className="w-full bg-primary text-white py-5 font-black text-xl uppercase tracking-widest flex items-center justify-center gap-4">
                      {isSavingEdit ? "सिंक हो रहा है..." : "बदलाव सुरक्षित करें"}
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 relative">
        <div className="w-full max-w-lg relative z-10">
          <div className="bg-white p-10 md:p-16 border-t-8 border-primary text-center">
            
            <div className="flex justify-center mb-8">
              <div className="size-20 bg-primary text-white flex items-center justify-center uppercase font-black tracking-tighter">
                {useOTP ? <ShieldCheck className="size-10" /> : isLogin ? <LogIn className="size-10" /> : <UserPlus className="size-10" />}
              </div>
            </div>
            
            <h1 className="text-3xl font-black text-gray-950 tracking-tighter mb-2 uppercase leading-none">LAKHARA DIGITAL NEWS</h1>
            <p className="text-gray-400 font-bold mb-10 uppercase tracking-widest text-[10px]">
               {useOTP ? "OTP द्वारा लॉगिन" : isLogin ? "सदस्य लॉगिन" : "नया सदस्य पंजीकरण"}
            </p>

            <div className="space-y-4">
              {useOTP ? (
                /* ── OTP FLOW ── */
                otpSent ? (
                  <form onSubmit={handleVerifyOTP} className="space-y-6">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">हमने आपके ईमेल <b>{otpEmail}</b> पर 6-अंकों का कोड भेजा है।</p>
                    <input 
                      type="text" 
                      maxLength={6} 
                      placeholder="000000" 
                      className="w-full bg-gray-50 border border-gray-200 p-6 text-center text-4xl font-black tracking-[1em] outline-none focus:border-primary placeholder:text-gray-200"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    />
                    <button type="submit" disabled={isLoading} className="w-full bg-primary text-white py-5 text-xl font-black uppercase tracking-widest">
                       {isLoading ? "सत्यापित हो रहा है..." : "वेरिफाई करें"}
                    </button>
                    <button type="button" onClick={() => setOtpSent(false)} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-primary">ईमेल बदलें</button>
                  </form>
                ) : (
                  <form onSubmit={handleSendOTP} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <input required type="email" placeholder="ईमेल दर्ज करें..." className="w-full bg-gray-50 border border-gray-200 pl-12 pr-6 py-4 font-bold text-gray-900 outline-none focus:border-primary text-sm" value={otpEmail} onChange={e => setOtpEmail(e.target.value)} />
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-primary text-white py-5 text-xl font-black uppercase tracking-widest">
                       {isLoading ? "भेज रहा है..." : "OTP प्राप्त करें"}
                    </button>
                  </form>
                )
              ) : (
                /* ── EMAIL/PASS FLOW ── */
                <form onSubmit={handleAuth} className="space-y-4">
                  {!isLogin && (
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <input required type="text" placeholder="आपका नाम..." className="w-full bg-gray-50 border border-gray-200 pl-12 pr-6 py-4 font-bold text-gray-900 outline-none focus:border-primary text-sm uppercase" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                  )}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <input required type="email" placeholder="ईमेल पता..." className="w-full bg-gray-50 border border-gray-200 pl-12 pr-6 py-4 font-bold text-gray-900 outline-none focus:border-primary text-sm uppercase" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <input required type="password" placeholder="पासवर्ड..." className="w-full bg-gray-50 border border-gray-200 pl-12 pr-6 py-4 font-bold text-gray-900 outline-none focus:border-primary text-sm uppercase" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                  </div>
                  {!isLogin && (
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <input required type="password" placeholder="पासवर्ड कन्फर्म करें..." className="w-full bg-gray-50 border border-gray-200 pl-12 pr-6 py-4 font-bold text-gray-900 outline-none focus:border-primary text-sm uppercase" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                    </div>
                  )}
                  <button type="submit" disabled={isLoading} className="w-full bg-primary text-white py-5 text-xl font-black uppercase tracking-widest mt-4">
                    {isLoading ? "जारी है..." : (isLogin ? "लॉगिन" : "खाता बनाएं")}
                  </button>
                </form>
              )}

              {/* ── SOCIAL & OTHER OPTIONS ── */}
              <div className="space-y-4 pt-6 mt-6 border-t border-gray-100">
                <button 
                  onClick={handleGoogleLogin} 
                  disabled={isLoading}
                  className="w-full border-2 border-gray-100 flex items-center justify-center gap-3 py-4 font-black uppercase tracking-widest text-[10px] hover:bg-gray-50"
                >
                   <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="size-4" alt="Google" />
                   गूगल से लॉगिन करें
                </button>
                
                <button 
                  onClick={() => { setUseOTP(!useOTP); setOtpSent(false); }} 
                  className="w-full border-2 border-gray-100 flex items-center justify-center gap-3 py-4 font-black uppercase tracking-widest text-[10px] hover:bg-gray-50 text-primary"
                >
                   {useOTP ? "ईमेल/पासवर्ड पर लौटें" : "OTP द्वारा सुरक्षित लॉगिन"}
                </button>
              </div>

              <div className="mt-8">
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-gray-400 font-black uppercase tracking-widest text-[10px] hover:text-primary">
                  {isLogin ? "नया खाता बनाएं" : "पहले से खाता है? लॉगिन करें"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}



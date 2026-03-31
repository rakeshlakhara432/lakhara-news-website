import { useState, useEffect, useRef } from "react";
import {
  User, Mail, Lock, LogIn, UserPlus, ShieldCheck, Camera,
  Settings, Save, MapPin, Check, Zap, Play, Eye, Bookmark, Share2, LogOut, X, Loader2, ChevronRight
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
    const loc  = userData?.location || "भारत";
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
      toast.success("गूगल प्रवेश सफल।");
      
      const userRef = doc(db, "users", result.user.uid);
      await setDoc(userRef, {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: "member",
        lastLogin: new Date().toISOString()
      }, { merge: true });
      
      const sendLoginAlert = httpsCallable(functions, 'sendLoginAlert');
      sendLoginAlert({ email: result.user.email, name: result.user.displayName, method: "Google Login" }).catch(e => console.error(e));
      
    } catch (error: any) {
      toast.error("प्रवेश विफल: " + error.message);
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
      toast.success("OTP आपके ईमेल पर भेज दिया गया है।");
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
        
        await setDoc(doc(db, "users", result.data.uid), {
           uid: result.data.uid,
           email: otpEmail,
           lastLogin: new Date().toISOString()
        }, { merge: true });

        toast.success("सफलतापूर्वक प्रवेश किया गया।");
        const sendLoginAlert = httpsCallable(functions, 'sendLoginAlert');
        sendLoginAlert({ email: otpEmail, name: "Member", method: "Secure OTP" }).catch(e => console.error(e));
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
      toast.success("फोटो अपडेट सफल।");
    } catch {
      toast.error("अपलोड विफल।");
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
      toast.success("विवरण सुरक्षित किया गया।");
    } catch {
      toast.error("सुरक्षित करने में त्रुटि।");
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
          bio: "लखारा डिजिटल न्यूज नेटवर्क का गर्वित सदस्य।", location: "भारत",
        });
      } else {
        const result = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        
        await setDoc(doc(db, "users", result.user.uid), {
           uid: result.user.uid,
           email: result.user.email,
           lastLogin: new Date().toISOString()
        }, { merge: true });

        const sendLoginAlert = httpsCallable(functions, 'sendLoginAlert');
        sendLoginAlert({ email: result.user.email, name: result.user.displayName || "User", method: "Email/Password" }).catch(e => console.error(e));
      }
      toast.success("प्रक्रिया सफल!");
    } catch (err: any) {
      toast.error(err.message || "त्रुटि।");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
           <Loader2 className="size-10 text-orange-600 animate-spin" />
           <span className="text-xl font-bold text-slate-800">पोर्टल लोड हो रहा है...</span>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="bg-slate-50 min-h-screen pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="container mx-auto px-6 py-12 max-w-5xl space-y-12">
          
          {/* 🏛️ BOLD PROFILE HEADER */}
          <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                <User className="size-48" />
             </div>
             <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                <div className="relative shrink-0">
                   <div className="size-32 md:size-40 rounded-full border-4 border-white bg-slate-50 shadow-md">
                      {isUploadingPhoto ? (
                         <div className="size-full flex items-center justify-center">
                            <Loader2 className="size-8 text-orange-600 animate-spin" />
                         </div>
                      ) : photoURL ? (
                        <img src={photoURL} alt="Profile" className="size-full object-cover rounded-full" />
                      ) : (
                        <div className="size-full rounded-full flex items-center justify-center text-slate-300">
                           <User className="size-16" />
                        </div>
                      )}
                      <button 
                        onClick={() => photoInputRef.current?.click()}
                        className="absolute bottom-2 right-2 size-10 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-500 transition-colors border-2 border-white"
                      >
                         <Camera className="size-4" />
                      </button>
                   </div>
                   <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </div>

                <div className="flex-1 text-center md:text-left space-y-5">
                   <div className="space-y-3">
                      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight truncate">{displayName}</h1>
                      <div className="flex flex-wrap justify-center md:justify-start gap-2">
                         <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 font-bold text-[10px] uppercase tracking-wider rounded-full border border-emerald-100">
                            <ShieldCheck className="size-3" />
                            <span>प्रमाणित सदस्य</span>
                         </div>
                         <div className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1 font-bold text-[10px] uppercase tracking-wider rounded-full">
                            <MapPin className="size-3" />
                            <span>{displayLoc}</span>
                         </div>
                      </div>
                   </div>
                   <p className="text-slate-600 font-medium text-sm md:text-base italic leading-relaxed">"{displayBio}"</p>
                   <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                      <button onClick={() => setShowEditModal(true)} className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
                         प्रोफाइल सम्पादन
                      </button>
                      <button onClick={() => signOut(auth)} className="px-5 py-2.5 bg-white text-orange-600 font-bold border border-orange-200 text-xs rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-colors flex items-center gap-2">
                         <LogOut className="size-3.5" /> प्रस्थान
                      </button>
                   </div>
                </div>
             </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             
             {/* 📊 PROTOCOL STATUS */}
             <div className="col-span-12 space-y-6">
                <div className="flex items-center gap-3 border-l-4 border-orange-600 pl-4">
                   <h2 className="text-2xl font-bold text-slate-800">सिस्टम <span className="text-orange-600">सुविधाएं</span></h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="size-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                            <Zap className="size-6" />
                         </div>
                         <div className="space-y-0.5">
                            <span className="font-bold text-lg text-slate-800 leading-none">नेटवर्क एक्सेस</span>
                            <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-widest block">Active</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="p-6 bg-slate-900 text-white rounded-2xl flex items-center justify-between shadow-sm group">
                       <div className="flex items-center gap-4">
                          <div className="size-12 bg-white/10 text-orange-400 rounded-xl flex items-center justify-center shrink-0">
                             <ShieldCheck className="size-6" />
                          </div>
                          <div className="space-y-0.5">
                             <span className="font-bold text-lg leading-none">सुरक्षा कवूँ</span>
                             <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Level 1 Verified</span>
                          </div>
                       </div>
                    </div>

                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className="size-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                             <Bookmark className="size-6" />
                          </div>
                          <div className="space-y-0.5">
                             <span className="font-bold text-lg text-slate-800 leading-none">संग्रहित समाचार</span>
                             <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block">{savedArticles.length} Saved</span>
                          </div>
                       </div>
                    </div>
                </div>
             </div>

          </div>
        </div>

        {/* 🏛️ EDIT MODAL */}
        {showEditModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
             <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-xl relative animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-start mb-6">
                   <div className="space-y-1">
                      <h2 className="text-2xl font-bold text-slate-800 leading-none">प्रोफाइल <span className="text-orange-600">सम्पादन</span></h2>
                   </div>
                   <button onClick={() => setShowEditModal(false)} className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                      <X className="size-4" />
                   </button>
                </div>
                
                <div className="space-y-5">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">आपका पूर्ण नाम</label>
                      <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">स्थान</label>
                      <input type="text" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">आपका परिचय (BIO)</label>
                      <textarea rows={3} value={editForm.bio} onChange={e => setEditForm({...editForm, bio: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none" />
                   </div>
                   <div className="pt-2">
                      <button onClick={handleSaveEdit} disabled={isSavingEdit} className="w-full bg-orange-600 text-white rounded-xl py-3 font-bold text-sm shadow-sm hover:bg-orange-500 transition-colors flex items-center justify-center">
                         {isSavingEdit ? <Loader2 className="size-4 animate-spin" /> : "सुरक्षित करें"}
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  }

  // LOGGED OUT / AUTH FLOW
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative animate-in fade-in duration-700">
        <div className="w-full max-w-md relative z-10">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm text-center">
            
            <div className="flex justify-center mb-6">
              <div className="size-16 bg-orange-50 text-orange-600 flex items-center justify-center rounded-2xl shadow-sm">
                {useOTP ? <ShieldCheck className="size-8" /> : isLogin ? <LogIn className="size-8" /> : <UserPlus className="size-8" />}
              </div>
            </div>
            
            <h1 className="text-2xl font-extrabold text-slate-800 mb-1 leading-tight">LAKHARA DIGITAL NEWS</h1>
            <p className="text-slate-500 font-semibold mb-8 text-[11px] uppercase tracking-widest">
               {useOTP ? "OTP द्वारा सुरक्षित प्रवेश" : isLogin ? "सदस्य प्रवेश पोर्टल" : "नया सदस्य पंजीकरण सिस्टम्"}
            </p>

            <div className="space-y-4">
              {useOTP ? (
                /* ── OTP FLOW ── */
                otpSent ? (
                  <form onSubmit={handleVerifyOTP} className="space-y-6">
                    <p className="text-sm font-medium text-slate-600 leading-relaxed px-2">हमने आपके सुरक्षित ईमेल <b>{otpEmail}</b> पर 6-अंकों का वेरिफिकेशन कोड भेजा है।</p>
                    <input 
                      type="text" 
                      maxLength={6} 
                      placeholder="000000" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 text-center text-3xl font-bold tracking-widest outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder:text-slate-300 transition-all"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    />
                    <button type="submit" disabled={isLoading} className="w-full bg-orange-600 text-white rounded-xl py-3.5 text-sm font-bold tracking-wider hover:bg-orange-500 transition-colors flex justify-center shadow-sm">
                       {isLoading ? <Loader2 className="size-4 animate-spin" /> : "सत्यापित करें"}
                    </button>
                    <button type="button" onClick={() => setOtpSent(false)} className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors">ईमेल बदलें</button>
                  </form>
                ) : (
                  <form onSubmit={handleSendOTP} className="space-y-4 text-left">
                    <div className="space-y-1.5">
                       <label className="text-xs font-bold text-slate-700 ml-1">सुरक्षित ईमेल दर्ज करें</label>
                       <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                          <input required type="email" placeholder="example@mail.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium text-slate-800 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" value={otpEmail} onChange={e => setOtpEmail(e.target.value)} />
                       </div>
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-slate-900 text-white rounded-xl py-3.5 text-sm font-bold transition-colors hover:bg-slate-800 flex items-center justify-center gap-2">
                       {isLoading ? <Loader2 className="size-4 animate-spin" /> : "प्रवेश कोड प्राप्त करें"}
                    </button>
                  </form>
                )
              ) : (
                /* ── EMAIL/PASS FLOW ── */
                <form onSubmit={handleAuth} className="space-y-4 text-left">
                  {!isLogin && (
                    <div className="space-y-1.5">
                       <label className="text-xs font-bold text-slate-700 ml-1">पूर्ण नाम</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                        <input required type="text" placeholder="आपका नाम" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                    </div>
                  )}
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-slate-700 ml-1">ईमेल पता</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                      <input required type="email" placeholder="ईमेल पता" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-slate-700 ml-1">पासवर्ड</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                      <input required type="password" placeholder="पासवर्ड" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                    </div>
                  </div>
                  {!isLogin && (
                    <div className="space-y-1.5">
                       <label className="text-xs font-bold text-slate-700 ml-1">पासवर्ड पुष्टि</label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                        <input required type="password" placeholder="पासवर्ड पुष्टि" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                      </div>
                    </div>
                  )}
                  <div className="pt-2">
                     <button type="submit" disabled={isLoading} className="w-full bg-orange-600 text-white rounded-xl py-3.5 text-sm font-bold hover:bg-orange-500 transition-colors flex items-center justify-center gap-2 shadow-sm">
                       {isLoading ? <Loader2 className="size-4 animate-spin" /> : (isLogin ? "प्रवेश करें" : "खाता बनाएं")}
                     </button>
                  </div>
                </form>
              )}

              {/* ── SOCIAL & OTHER OPTIONS ── */}
              <div className="space-y-3 pt-6 mt-6 border-t border-slate-100">
                <button 
                  onClick={handleGoogleLogin} 
                  disabled={isLoading}
                  className="w-full bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-3 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                   <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="size-4" alt="Google" />
                   GOOGLE LOGIN
                </button>
                
                <button 
                  onClick={() => { setUseOTP(!useOTP); setOtpSent(false); }} 
                  className="w-full bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center gap-3 py-3 text-xs font-bold hover:bg-slate-200 transition-colors"
                >
                   {useOTP ? "Back to Password Login" : "Login with Secure OTP"}
                </button>
              </div>

              <div className="pt-6">
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-slate-500 font-semibold text-xs hover:text-orange-600 transition-colors underline underline-offset-4 decoration-transparent hover:decoration-orange-600">
                  {isLogin ? "नया पंजीकरण (New User?)" : "पहले से खाता है? लॉगिन करें"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

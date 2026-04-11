import { useState, useEffect, useRef } from "react";
import {
  User, Mail, Lock, LogIn, UserPlus, ShieldCheck, Camera,
  Settings, Save, MapPin, Check, Zap, Play, Eye, Bookmark, Share2, LogOut, X, Loader2, ChevronRight, CreditCard, Calendar, Bell, Heart, Edit3
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
import { samajService, Member } from "../services/samajService";
import { MemberIDCardModal } from "../components/ui/MemberIDCardModal";
import { generateMembershipPDF } from "../utils/generateMembershipPDF";
import { Link } from "react-router";

// ── Main Component ─────────────────────────────────────────────────────────────
export function ProfilePage() {
  const { user, userData, loading: authLoading } = useAuth();
  const functions = getFunctions();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const [memberData, setMemberData] = useState<Member | null>(null);
  const [isLoadingMember, setIsLoadingMember] = useState(false);
  const [showIDCard, setShowIDCard] = useState(false);
  const [searchMemberMode, setSearchMemberMode] = useState(false);
  const [searchPhone, setSearchPhone] = useState("");

  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", bio: "", location: "" });
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Member Edit State
  const [showMemberEditModal, setShowMemberEditModal] = useState(false);
  const [memberEditForm, setMemberEditForm] = useState<Partial<Member>>({});
  const [isSavingMemberEdit, setIsSavingMemberEdit] = useState(false);
  const memberPhotoInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [displayBio, setDisplayBio] = useState("");
  const [displayLoc, setDisplayLoc] = useState("");

  const memberId = memberData?.memberId || (memberData 
    ? `LS-${(memberData.memberNumber || memberData.id?.slice(-5) || "000001").toUpperCase()}`
    : "LS-XXXXX");

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

    const fetchMember = async () => {
      setIsLoadingMember(true);
      const m = await samajService.getMemberByUid(user.uid);
      if (m) {
        setMemberData(m);
        setMemberEditForm(m);
      } else if (user.email) {
        const existing = await samajService.getMemberByEmail(user.email);
        if (existing && !existing.uid) {
          await samajService.linkMemberToUser(existing.id!, user.uid);
          setMemberData({ ...existing, uid: user.uid });
          setMemberEditForm({ ...existing, uid: user.uid });
        }
      }
      setIsLoadingMember(false);
    };
    fetchMember();
  }, [user, userData]);

  const handleLinkMember = async () => {
    if (!searchPhone) return toast.error("कृपया मोबाइल नंबर दर्ज करें।");
    setIsLoadingMember(true);
    try {
      const m = await samajService.getMemberByPhone(searchPhone);
      if (m) {
        if (m.uid && m.uid !== user?.uid) {
          toast.error("यह सदस्यता पहले से किसी अन्य खाते से जुड़ी है।");
        } else {
          await samajService.linkMemberToUser(m.id!, user!.uid);
          setMemberData({ ...m, uid: user!.uid });
          setMemberEditForm(m);
          setSearchMemberMode(false);
          toast.success("सदस्यता सफलतापूर्वक लिंक की गई! 🎉");
        }
      } else {
        toast.error("इस नंबर से कोई सदस्यता नहीं मिली।");
      }
    } catch (err) {
      toast.error("त्रुटि: सदस्यता लिंक नहीं हो सकी।");
    } finally {
      setIsLoadingMember(false);
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

  // ── Member Update Logic ──
  const handleUpdateMember = async () => {
    if (!memberData?.id) return;
    setIsSavingMemberEdit(true);
    try {
      await samajService.updateMember(memberData.id, memberEditForm);
      setMemberData(prev => prev ? { ...prev, ...memberEditForm } : null);
      setShowMemberEditModal(false);
      toast.success("सदस्यता विवरण अपडेट किया गया! ✅");
    } catch (err) {
      toast.error("अपडेट करने में त्रुटि।");
    } finally {
      setIsSavingMemberEdit(false);
    }
  };

  const handleMemberPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !memberData?.id) return;
    const toastId = toast.loading("सदस्य फोटो अपलोड हो रही है...");
    try {
      const storageRef = ref(storage, `member_photos/${memberData.id}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setMemberEditForm(prev => ({ ...prev, photoUrl: url }));
      toast.dismiss(toastId);
      toast.success("फोटो अपलोड सफल! अब 'सुरक्षित करें' पर क्लिक करें।");
    } catch {
      toast.dismiss(toastId);
      toast.error("फोटो अपलोड विफल।");
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
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success("प्रवेश सफल!");
      }
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
          <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                <User className="size-48" />
             </div>
             <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
                <div className="relative shrink-0">
                   <div className="size-32 md:size-44 rounded-[2rem] border-4 border-white bg-slate-50 shadow-2xl relative overflow-hidden">
                      {isUploadingPhoto ? (
                         <div className="size-full flex items-center justify-center bg-slate-50/50">
                            <Loader2 className="size-8 text-orange-600 animate-spin" />
                         </div>
                      ) : photoURL ? (
                        <img src={photoURL} alt="Profile" className="size-full object-cover" />
                      ) : (
                        <div className="size-full flex items-center justify-center text-slate-300">
                           <User className="size-20" />
                        </div>
                      )}
                      {/* Photo Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                   </div>
                   <button 
                     onClick={() => photoInputRef.current?.click()}
                     className="absolute -bottom-3 -right-3 size-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-slate-900 transition-all border-4 border-white active:scale-95"
                   >
                      <Camera className="size-5" />
                   </button>
                   <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </div>

                <div className="flex-1 text-center md:text-left space-y-6">
                   <div className="space-y-4">
                      <h1 className="text-4xl md:text-5xl font-black text-slate-800 leading-none tracking-tighter truncate uppercase italic" style={{ fontFamily: "'Outfit', sans-serif" }}>{displayName}</h1>
                      <div className="flex flex-wrap justify-center md:justify-start gap-3">
                         <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl border border-emerald-100 shadow-sm">
                            <ShieldCheck className="size-4" />
                            <span>VERIFIED PROTOCOL</span>
                         </div>
                         <div className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl border border-slate-200">
                            <MapPin className="size-4" />
                            <span>{displayLoc}</span>
                         </div>
                      </div>
                   </div>
                   <p className="text-slate-500 font-bold text-sm md:text-lg italic leading-relaxed max-w-2xl">"{displayBio}"</p>
                   <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                      <button onClick={() => setShowEditModal(true)} className="px-8 py-3.5 bg-slate-900 text-white font-black text-xs rounded-2xl hover:bg-indigo-600 transition-all shadow-xl uppercase tracking-widest active:scale-95">
                         सम्पादन करें
                      </button>
                      <button onClick={() => signOut(auth)} className="px-8 py-3.5 bg-white text-rose-500 font-black border border-rose-100 text-xs rounded-2xl hover:bg-rose-50 transition-all flex items-center gap-3 active:scale-95">
                         <LogOut className="size-4" /> प्रस्थान
                      </button>
                   </div>
                </div>
             </div>
          </section>

          <div className="space-y-12">
             {/* 📊 PROTOCOL STATUS & MEMBER CARD */}
             <div className="flex items-center gap-4 border-l-6 border-indigo-600 pl-5">
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">सिस्टम <span className="text-indigo-600">सुविधाएं</span></h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {memberData ? (
                  <div className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-lg flex flex-col justify-between group relative overflow-hidden transition-all hover:border-indigo-200 hover:shadow-xl">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:rotate-12 transition-transform">
                       <CreditCard className="size-20" />
                    </div>
                    <div className="flex items-start gap-5 relative z-10 mb-8">
                      <div className="size-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                         <CreditCard className="size-7" />
                      </div>
                      <div className="space-y-1">
                         <span className="font-black text-xl text-slate-800 leading-none uppercase tracking-tight block">सदस्यता कार्ड</span>
                         <span className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.3em] block underline decoration-indigo-200 underline-offset-4">ID: {memberId}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowIDCard(true)}
                      className="w-full h-12 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all active:scale-[0.98] shadow-lg"
                    >
                       आई-कार्ड देखें <ChevronRight className="size-4" />
                    </button>
                  </div>
                ) : (
                  <div className="p-8 bg-white rounded-[2rem] border-2 border-dashed border-slate-300 shadow-sm flex flex-col justify-center items-center text-center gap-6 group hover:border-indigo-400 transition-all">
                    <div className="size-16 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center">
                       <UserPlus className="size-8" />
                    </div>
                    <div>
                       <span className="font-black text-xl text-slate-400 leading-none uppercase tracking-tight block">डिजिटल कार्ड</span>
                       <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-2 block italic">Not Linked to Database</span>
                    </div>
                    <button 
                      onClick={() => setSearchMemberMode(true)}
                      className="px-8 py-3 bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-95"
                    >
                       Link Member Record
                    </button>
                  </div>
                )}
                
                <Link to="/events" className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-lg flex flex-col justify-between group hover:border-emerald-200 transition-all hover:shadow-xl">
                    <div className="flex items-start gap-5 mb-8">
                       <div className="size-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                          <Calendar className="size-7" />
                       </div>
                       <div className="space-y-1">
                          <span className="font-black text-xl text-slate-800 leading-none uppercase tracking-tight block">कार्यक्रम</span>
                          <span className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.3em] block italic">LATEST EVENTS</span>
                       </div>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Schedule</span>
                       <ChevronRight className="size-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                 </Link>

                <Link to="/notices" className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-lg flex flex-col justify-between group hover:border-amber-200 transition-all hover:shadow-xl">
                   <div className="flex items-start gap-5 mb-8">
                      <div className="size-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                         <Bell className="size-7" />
                      </div>
                      <div className="space-y-1">
                         <span className="font-black text-xl text-slate-800 leading-none uppercase tracking-tight block">सूचना पट्ट</span>
                         <span className="text-[11px] font-black text-amber-500 uppercase tracking-[0.3em] block italic">GLOBAL ALERTS</span>
                      </div>
                   </div>
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Urgent Updates</span>
                      <ChevronRight className="size-5 text-amber-500 group-hover:translate-x-1 transition-transform" />
                   </div>
                </Link>
             </div>

             {/* ── MEMBER SPECIFIC CONTENT ── */}
             {memberData && (
               <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-[0.03] scale-150 rotate-[-15deg]">
                     <ShieldCheck className="size-64" />
                  </div>
                  
                  <div className="flex items-center justify-between relative z-10">
                     <div className="space-y-1.5 underline decoration-indigo-200 underline-offset-8">
                        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight italic" style={{ fontFamily: "'Outfit', sans-serif" }}>सदस्यता विवरण</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] leading-none italic">OFFICIAL SAMAJ RECORD • {memberData.id?.toUpperCase()}</p>
                     </div>
                     <div className="flex items-center gap-3">
                        {!memberData.isApproved && (
                           <div className="bg-amber-50 text-amber-600 px-4 py-2 rounded-xl border border-amber-100 flex items-center gap-3 shadow-sm">
                              <div className="size-2 bg-amber-500 rounded-full animate-pulse"></div>
                              <span className="text-[10px] font-black uppercase tracking-widest">Wait Approval</span>
                           </div>
                        )}
                        <button 
                          onClick={() => setShowMemberEditModal(true)}
                          className="size-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-sm active:scale-95 group"
                        >
                           <Edit3 className="size-5 group-hover:scale-125 transition-transform" />
                        </button>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-6 relative z-10">
                     {[
                        { label: "सदस्य नाम", val: memberData.name },
                        { label: "पिता का नाम", val: memberData.fatherName },
                        { label: "मोबाइल नंबर", val: memberData.phone },
                        { label: "रक्त समूह", val: memberData.bloodGroup || "O+" }
                     ].map((item, idx) => (
                        <div key={idx} className="space-y-2 border-l-4 border-slate-100 pl-5 hover:border-indigo-600 transition-colors">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.label}</p>
                           <p className="font-black text-slate-800 text-lg uppercase tracking-tight truncate">{item.val}</p>
                        </div>
                     ))}
                  </div>

                  <div className="pt-8 flex flex-wrap gap-5 relative z-10">
                     <Link to="/donate" className="px-10 py-4 bg-rose-600 text-white font-black text-xs rounded-2xl shadow-xl hover:bg-rose-700 transition-all flex items-center gap-4 uppercase tracking-widest group">
                        <Heart className="size-5 group-hover:scale-125 transition-transform" /> समाज सहयोग
                     </Link>
                     <button onClick={() => setShowIDCard(true)} className="px-10 py-4 bg-indigo-600 text-white font-black text-xs rounded-2xl shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-4 uppercase tracking-widest group">
                        <CreditCard className="size-5 group-hover:scale-125 transition-transform" /> आई-कार्ड डाउनलोड
                     </button>
                  </div>
               </div>
             )}

             {/* 👑 PREMIUM PORTAL LINKS */}
             <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden border border-white/5 shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-10 blur-xl">
                   <Zap className="size-48" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                   <div className="space-y-5 text-center md:text-left">
                      <h3 className="text-3xl font-black italic tracking-tighter uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>विशेष सदस्य क्षेत्र</h3>
                      <p className="text-sm font-bold text-slate-400 max-w-sm leading-relaxed opacity-70">अपनी समाज गतिविधियों, वैवाहिक प्रोफाइल और इवेंट रजिस्ट्रेशन को यहां से प्रबंधित करें।</p>
                   </div>
                   <div className="flex flex-wrap justify-center gap-6">
                      <Link to="/matrimonial" className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl transition-all flex items-center gap-5 group">
                         <div className="size-14 bg-rose-500/10 rounded-2xl flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                             <Heart className="size-8 text-rose-500" />
                         </div>
                         <div className="text-left">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">विवाह मंच</p>
                            <p className="text-sm font-black uppercase tracking-tighter">My PROFILE</p>
                         </div>
                      </Link>
                      <Link to="/register" className="px-10 py-5 bg-indigo-600 text-white rounded-3xl shadow-2xl hover:bg-indigo-700 transition-all flex items-center gap-5 group hover:scale-105 active:scale-95">
                         <div className="size-14 bg-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                             <UserPlus className="size-8" />
                         </div>
                         <div className="text-left">
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none mb-1.5">सदस्यता</p>
                            <p className="text-sm font-black uppercase tracking-tighter">APPLY NOW</p>
                         </div>
                      </Link>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* 🏛️ USER PROFILE EDIT MODAL */}
        {showEditModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
             <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-bhagva relative animate-in zoom-in-95 duration-200 border border-slate-100">
                <div className="flex justify-between items-start mb-10">
                   <div className="space-y-1">
                      <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic" style={{ fontFamily: "'Outfit', sans-serif" }}>प्रोफाइल <span className="text-indigo-600">सम्पादन</span></h2>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">UPDATE PUBLIC IDENTITY</p>
                   </div>
                   <button onClick={() => setShowEditModal(false)} className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-95">
                      <X className="size-6" />
                   </button>
                </div>
                
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1">आपका पूर्ण नाम</label>
                      <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-black text-sm text-slate-800 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1">स्थान (CITY/TOWN)</label>
                      <input type="text" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-black text-sm text-slate-800 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1">आपका परिचय (BIO)</label>
                      <textarea rows={3} value={editForm.bio} onChange={e => setEditForm({...editForm, bio: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-sm text-slate-800 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm resize-none" />
                   </div>
                   <div className="pt-6">
                      <button onClick={handleSaveEdit} disabled={isSavingEdit} className="w-full bg-slate-900 border-b-4 border-slate-950 text-white rounded-2xl py-4.5 font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-indigo-600 hover:border-indigo-800 transition-all flex items-center justify-center active:translate-y-1 active:border-b-0">
                         {isSavingEdit ? <Loader2 className="size-5 animate-spin" /> : "विवरण सुरक्षित करें"}
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* 🏛️ MEMBERSHIP DATA EDIT MODAL (सदस्यता विवरण) */}
        {showMemberEditModal && memberData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
             <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-2xl relative animate-in zoom-in-95 duration-200 border border-slate-100 overflow-y-auto max-h-[95vh] no-scrollbar">
                <div className="flex justify-between items-start mb-10">
                   <div className="space-y-1.5 underline decoration-indigo-200 underline-offset-8 decoration-4">
                      <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic" style={{ fontFamily: "'Outfit', sans-serif" }}>सदस्य <span className="text-indigo-600">विवरण सम्पादन</span></h2>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">UPDATE ID CARD DATA PORTFOLIO</p>
                   </div>
                   <button onClick={() => setShowMemberEditModal(false)} className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-95">
                      <X className="size-6" />
                   </button>
                </div>

                <div className="space-y-8">
                   {/* Photo Upload Section */}
                   <div className="flex flex-col items-center gap-4 py-4 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner">
                      <div className="relative">
                         <div className="size-32 rounded-3xl border-4 border-white bg-white shadow-lg overflow-hidden relative group">
                            {memberEditForm.photoUrl ? (
                               <img src={memberEditForm.photoUrl} alt="Member" className="size-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                               <div className="size-full flex items-center justify-center text-slate-200">
                                  <Camera className="size-12" />
                               </div>
                            )}
                         </div>
                         <button 
                           onClick={() => memberPhotoInputRef.current?.click()}
                           className="absolute -bottom-3 -right-3 size-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white active:scale-95 group"
                         >
                            <Camera className="size-5 group-hover:rotate-12 transition-transform" />
                         </button>
                         <input ref={memberPhotoInputRef} type="file" accept="image/*" className="hidden" onChange={handleMemberPhotoChange} />
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID कार्ड के लिए फोटो बदलें</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                       <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1">आपका पूर्ण नाम</label>
                          <input type="text" value={memberEditForm.name} onChange={e => setMemberEditForm({...memberEditForm, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-black text-sm text-slate-800 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1">पिता का नाम</label>
                          <input type="text" value={memberEditForm.fatherName} onChange={e => setMemberEditForm({...memberEditForm, fatherName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-black text-sm text-slate-800 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1">मोबाइल नंबर</label>
                          <input type="text" value={memberEditForm.phone} onChange={e => setMemberEditForm({...memberEditForm, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-black text-sm text-slate-800 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1">शहर/गांव</label>
                          <input type="text" value={memberEditForm.city} onChange={e => setMemberEditForm({...memberEditForm, city: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-black text-sm text-slate-800 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1">रक्त समूह (BLOOD GROUP)</label>
                          <select value={memberEditForm.bloodGroup} onChange={e => setMemberEditForm({...memberEditForm, bloodGroup: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-black text-sm text-slate-800 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm appearance-none">
                             <option value="A+">A+</option>
                             <option value="A-">A-</option>
                             <option value="B+">B+</option>
                             <option value="B-">B-</option>
                             <option value="O+">O+</option>
                             <option value="O-">O-</option>
                             <option value="AB+">AB+</option>
                             <option value="AB-">AB-</option>
                          </select>
                       </div>
                   </div>

                   <div className="pt-6">
                      <button onClick={handleUpdateMember} disabled={isSavingMemberEdit} className="w-full bg-indigo-600 border-b-4 border-indigo-900 text-white rounded-3xl py-4.5 font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-slate-900 hover:border-slate-950 hover:scale-[1.02] transition-all flex items-center justify-center active:translate-y-1 active:border-b-0">
                         {isSavingMemberEdit ? <Loader2 className="size-5 animate-spin" /> : "विवरण सुरक्षित करें"}
                      </button>
                      <p className="text-center text-[8px] font-bold text-slate-400 mt-5 uppercase tracking-[0.3em] italic">Changes will reflect on ID Card instantly</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* 🆔 ID CARD MODAL */}
        {showIDCard && memberData && (
           <MemberIDCardModal 
             member={{
               id: memberData.id!,
               memberId: memberData.memberId,
               name: memberData.name,
               fatherName: memberData.fatherName,
               city: memberData.city,
               occupation: memberData.occupation,
               phone: memberData.phone,
               photoUrl: memberData.photoUrl,
               memberNumber: memberData.memberNumber,
               bloodGroup: memberData.bloodGroup
             }} 
             onClose={() => setShowIDCard(false)} 
           />
        )}

        {/* 🔗 LINK MEMBER MODAL ... (same as before) */}
        {searchMemberMode && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
             <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl relative animate-in zoom-in-95 border border-slate-100">
                <button onClick={() => setSearchMemberMode(false)} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-500 transition-colors">
                  <X className="size-6" />
                </button>
                <div className="text-center space-y-8">
                   <div className="size-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                      <ShieldCheck className="size-10" />
                   </div>
                   <div className="space-y-2">
                      <h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-tighter underline decoration-indigo-200 underline-offset-4 decoration-2">सदस्यता लिंक करें</h2>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Enter registered mobile number</p>
                   </div>
                   <div className="space-y-2 text-left">
                      <input 
                        type="tel" 
                        placeholder="+91..."
                        value={searchPhone}
                        onChange={e => setSearchPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 font-black text-center text-2xl outline-none focus:border-indigo-600 transition-all shadow-inner text-slate-800"
                      />
                   </div>
                   <button 
                     onClick={handleLinkMember}
                     disabled={isLoadingMember}
                     className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 active:scale-95"
                   >
                      {isLoadingMember ? <Loader2 className="size-4 animate-spin" /> : "सत्यापित करें"}
                   </button>
                   <p className="text-[9px] font-bold text-slate-400 leading-relaxed italic border-t border-slate-50 pt-4">
                      *यदि आपने अभी तक पंजीकरण नहीं किया है, तो कृपया <Link to="/register" className="text-indigo-600 hover:underline">यहां क्लिक करें</Link>।
                   </p>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  }

  // LOGGED OUT / AUTH FLOW ... (kept simple for readability)
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative animate-in fade-in duration-700">
        <div className="w-full max-w-md relative z-10">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl text-center">
            
            <div className="flex justify-center mb-8">
              <div className="size-20 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-[1.5rem] shadow-inner relative group">
                <div className="absolute inset-0 bg-indigo-500/10 rounded-[1.5rem] scale-0 group-hover:scale-110 transition-transform"></div>
                {isLogin ? <LogIn className="size-10 relative z-10" /> : <UserPlus className="size-10 relative z-10" />}
              </div>
            </div>
            
            <h1 className="text-3xl font-black text-slate-800 mb-2 leading-none tracking-tighter uppercase italic" style={{ fontFamily: "'Outfit', sans-serif" }}>LAKHARA <span className="text-indigo-600">NETWORK</span></h1>
            <p className="text-slate-400 font-bold mb-10 text-[10px] uppercase tracking-[0.4em]">
               {isLogin ? "MEMBER ACCESS PORTAL" : "STRATEGIC REGISTRATION SYSTEM"}
            </p>

            <form onSubmit={handleAuth} className="space-y-5 text-left">
              {!isLogin && (
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">FULL NAME</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-slate-300" />
                    <input required type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-sm font-black text-slate-800 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">SECURE EMAIL</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-slate-300" />
                  <input required type="email" placeholder="mail@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-sm font-black text-slate-800 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">PASSWORD ACCESS</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-slate-300" />
                  <input required type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-sm font-black text-slate-800 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
              </div>
              {!isLogin && (
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">CONFIRM PAYLOAD</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-slate-300" />
                    <input required type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-sm font-black text-slate-800 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                  </div>
                </div>
              )}
              <div className="pt-6">
                 <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 border-b-6 border-indigo-900 text-white rounded-[1.5rem] py-4.5 font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-slate-900 hover:border-slate-950 transition-all flex items-center justify-center gap-3 active:translate-y-1 active:border-b-0">
                   {isLoading ? <Loader2 className="size-5 animate-spin" /> : (isLogin ? "ESTABLISH CONNECTION" : "INITIALIZE PROTOCOL")}
                 </button>
              </div>
            </form>

            <div className="pt-10 flex flex-col items-center gap-6">
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-slate-400 font-black text-xs hover:text-indigo-600 transition-colors uppercase tracking-widest flex items-center gap-2 group">
                  {isLogin ? "Request New Account Connection" : "Already have authorized access? Login"}
                  <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
          </div>
        </div>
      </div>
    );
}

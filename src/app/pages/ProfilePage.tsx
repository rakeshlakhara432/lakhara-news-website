import { useState, useEffect, useRef } from "react";
import {
  User, Mail, Lock, LogIn, UserPlus, ShieldCheck, Camera,
  MapPin, LogOut, X, Loader2, ChevronRight, CreditCard, Calendar, Bell, Heart, Edit3, Globe,
  Briefcase, Activity, Settings, UserCheck, Phone, ArrowRight
} from "lucide-react";
import { auth, db } from "../data/firebase";
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, updateProfile
} from "firebase/auth";
import { GoogleAuthButton } from "../components/ui/GoogleAuthButton";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { fastUploadImage } from "../utils/fastUpload";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { samajService, Member } from "../services/samajService";
import { MemberIDCardModal } from "../components/ui/MemberIDCardModal";
import { Link } from "react-router";

export function ProfilePage() {
  const { user, userData, loading: authLoading } = useAuth();
  
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
    // Set instant preview before upload
    const previewUrl = URL.createObjectURL(file);
    setPhotoURL(previewUrl);
    try {
      const url = await fastUploadImage(
        file,
        `profile_photos/${user.uid}`,
        { preset: "profile" }
      );
      await updateProfile(user, { photoURL: url });
      await updateDoc(doc(db, "users", user.uid), { photoURL: url });
      setPhotoURL(url);
      URL.revokeObjectURL(previewUrl);
      toast.success("फोटो अपडेट सफल ✅");
    } catch {
      setPhotoURL(null);
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
    // Instant preview
    const previewUrl = URL.createObjectURL(file);
    setMemberEditForm(prev => ({ ...prev, photoUrl: previewUrl }));
    const toastId = toast.loading("फोटो अपलोड हो रही है...");
    try {
      const url = await fastUploadImage(
        file,
        `member_photos/${memberData.id}`,
        { preset: "member" }
      );
      URL.revokeObjectURL(previewUrl);
      setMemberEditForm(prev => ({ ...prev, photoUrl: url }));
      toast.dismiss(toastId);
      toast.success("फोटो अपलोड सफल ✅");
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
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="size-10 text-primary animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="space-y-12 pb-24">
        
        {/* 👤 PROFILE HEADER CARD */}
        <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
              <User className="size-48 text-primary" />
           </div>
           
           <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <div className="relative shrink-0">
                 <div className="size-32 md:size-40 rounded-full border-4 border-slate-50 bg-slate-50 shadow-md ring-4 ring-primary/5 overflow-hidden">
                    {isUploadingPhoto ? (
                       <div className="size-full flex items-center justify-center">
                          <Loader2 className="size-8 text-primary animate-spin" />
                       </div>
                    ) : photoURL ? (
                       <img src={photoURL} alt="Profile" className="size-full object-cover" />
                    ) : (
                       <div className="size-full flex items-center justify-center text-slate-300">
                          <User className="size-20" />
                       </div>
                    )}
                 </div>
                 <button 
                   onClick={() => photoInputRef.current?.click()}
                   className="absolute bottom-1 right-1 size-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white hover:scale-110 active:scale-95 transition-all"
                 >
                    <Camera className="size-5" />
                 </button>
                 <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </div>

              <div className="flex-1 text-center md:text-left space-y-4">
                 <div className="space-y-1">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tighter uppercase leading-none">{displayName}</h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                       <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                          <ShieldCheck className="size-3.5" /> VERIFIED MEMBER
                       </span>
                       <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-100">
                          <MapPin className="size-3.5" /> {displayLoc}
                       </span>
                    </div>
                 </div>
                 <p className="text-slate-500 font-bold text-sm md:text-lg italic max-w-xl">"{displayBio}"</p>
                 <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                    <button onClick={() => setShowEditModal(true)} className="px-8 py-3 bg-slate-900 text-white font-black text-xs rounded-xl hover:bg-primary transition-all shadow hover:shadow-primary/20 active:scale-95 uppercase tracking-widest">
                       सम्पादन करें
                    </button>
                    <button onClick={() => signOut(auth)} className="px-8 py-3 bg-white text-rose-600 border border-rose-100 font-black text-xs rounded-xl hover:bg-rose-50 transition-all flex items-center gap-2 active:scale-95 uppercase tracking-widest">
                       <LogOut className="size-4" /> प्रस्थान
                    </button>
                 </div>
              </div>
           </div>
        </section>

        {/* 🏹 DASHBOARD GRID */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* MEMBER CARD CALLOUT */}
           {memberData ? (
             <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-primary/30 transition-all">
                <div className="space-y-4">
                   <div className="size-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                      <CreditCard className="size-7" />
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">सदस्यता कार्ड</h3>
                      <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">{memberId}</p>
                   </div>
                </div>
                <button 
                  onClick={() => setShowIDCard(true)}
                  className="w-full mt-8 py-4 bg-slate-50 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                   कार्ड देखें <ChevronRight className="size-4" />
                </button>
             </div>
           ) : (
             <div className="p-8 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center gap-6 group hover:border-primary/50 transition-all">
                <div className="size-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                   <UserPlus className="size-8" />
                </div>
                <div className="space-y-1">
                   <h3 className="text-xl font-black text-slate-400 uppercase tracking-tight">डिजिटल रिकॉर्ड</h3>
                   <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">पंजीकरण से लिंक करें</p>
                </div>
                <button 
                  onClick={() => setSearchMemberMode(true)}
                  className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all active:scale-95"
                >
                   डेटा लिंक करें
                </button>
             </div>
           )}

           <Link to="/events" className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-primary/30 transition-all">
              <div className="space-y-4">
                 <div className="size-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <Calendar className="size-7" />
                 </div>
                 <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">कार्यक्रम</h3>
                    <p className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.2em]">ALL SOCAL EVENTS</p>
                 </div>
              </div>
              <div className="flex items-center justify-between pt-8">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">View Schedule</span>
                 <ChevronRight className="size-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
              </div>
           </Link>

           <Link to="/notices" className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-primary/30 transition-all">
              <div className="space-y-4">
                 <div className="size-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                    <Bell className="size-7" />
                 </div>
                 <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">सूचना पट्ट</h3>
                    <p className="text-[11px] font-black text-amber-500 uppercase tracking-[0.2em]">NOTIFICATIONS</p>
                 </div>
              </div>
              <div className="flex items-center justify-between pt-8">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Official Alerts</span>
                 <ChevronRight className="size-5 text-amber-500 group-hover:translate-x-1 transition-transform" />
              </div>
           </Link>
        </section>

        {/* 📋 OFFICIAL MEMBER RECORD SECTION */}
        {memberData && (
           <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
              <div className="bg-slate-900 p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b-4 border-primary">
                 <div className="space-y-1 text-center md:text-left">
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">आधिकारिक सदस्य <span className="text-primary italic">रिकॉर्ड</span></h3>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic">COMMUNITY VERIFIED DATA PROFILE</p>
                 </div>
                 <div className="flex gap-4">
                    <button 
                      onClick={() => setShowMemberEditModal(true)}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                    >
                       <Edit3 className="size-4" /> अपडेट
                    </button>
                    <button onClick={() => setShowIDCard(true)} className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-white hover:text-primary transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                       <CreditCard className="size-4" /> आई-कार्ड
                    </button>
                 </div>
              </div>

              <div className="p-8 md:p-12">
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {[
                      { label: "सदस्य नाम", val: memberData.name, icon: User },
                      { label: "पिता का नाम", val: memberData.fatherName, icon: UserCheck },
                      { label: "मोबाइल नंबर", val: memberData.phone, icon: Phone },
                      { label: "रक्त समूह", val: memberData.bloodGroup || "O+", icon: Activity }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-3 group">
                         <div className="flex items-center gap-2 text-slate-400 group-hover:text-primary transition-colors">
                            <item.icon className="size-4" />
                            <p className="text-[10px] font-black uppercase tracking-widest leading-none">{item.label}</p>
                         </div>
                         <p className="font-black text-slate-800 text-xl md:text-2xl tracking-tighter uppercase truncate">{item.val}</p>
                      </div>
                    ))}
                 </div>

                 <div className="mt-12 pt-10 border-t border-slate-100 flex flex-wrap gap-6">
                    <Link to="/donate" className="flex items-center gap-4 text-xs font-black text-primary uppercase tracking-[0.3em] hover:translate-x-2 transition-transform italic">
                       समाज सहयोग (DONATE) <ArrowRight className="size-5" />
                    </Link>
                    <Link to="/matrimonial" className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-[0.3em] hover:text-primary transition-colors italic">
                       विवाह प्रोफाइल <ArrowRight className="size-5" />
                    </Link>
                 </div>
              </div>
           </section>
        )}

        {/* 👑 PREMIUM SERVICES FOOTER */}
        <section className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-white text-center md:text-left relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none">
              <Globe className="size-64" />
           </div>
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6">
                 <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">विशेष सदस्य <span className="text-primary">मंच</span></h3>
                 <p className="text-sm md:text-lg font-bold text-slate-400 max-w-lg leading-relaxed uppercase tracking-tight italic border-l-4 border-primary pl-6">
                   अपनी समाज गतिविधियों, वैवाहिक प्रोफाइल और निजी नेटवर्क को यहां से प्रबंधित करें।
                 </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                 <Link to="/matrimonial" className="px-10 py-6 bg-white/5 border-2 border-white/10 rounded-2xl hover:bg-primary hover:border-primary transition-all flex items-center gap-6 group">
                    <Heart className="size-8 text-rose-500 group-hover:text-white transition-colors" />
                    <div className="text-left font-black">
                       <p className="text-[10px] text-white/50 uppercase tracking-widest group-hover:text-white/70">विवाह मंच</p>
                       <p className="text-xl uppercase tracking-tighter">My PROFILE</p>
                    </div>
                 </Link>
                 <Link to="/register" className="px-10 py-6 bg-primary text-white rounded-2xl shadow-xl hover:bg-white hover:text-primary transition-all flex items-center gap-6 group scale-105">
                    <UserPlus className="size-8" />
                    <div className="text-left font-black">
                       <p className="text-[10px] text-white/50 uppercase tracking-widest group-hover:text-primary/70">सदस्यता</p>
                       <p className="text-xl uppercase tracking-tighter">APPLY NOW</p>
                    </div>
                 </Link>
              </div>
           </div>
        </section>

        {/* 🏛️ MODERN MODALS */}

        {/* User Profile Edit */}
        {showEditModal && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
             <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-8 md:p-12 shadow-2xl relative animate-in zoom-in-95 duration-200 border border-slate-100">
                <div className="flex justify-between items-start mb-10 border-b border-slate-50 pb-8">
                   <div className="border-l-8 border-primary pl-6">
                      <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">प्रोफाइल <span className="text-primary">सम्पादन</span></h2>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mt-1">UPDATE PUBLIC IDENTITY</p>
                   </div>
                   <button onClick={() => setShowEditModal(false)} className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all border border-slate-100">
                      <X className="size-6" />
                   </button>
                </div>
                
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1">आपका नाम</label>
                      <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-black text-sm text-slate-800 focus:bg-white focus:border-primary transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1">स्थान (CITY)</label>
                      <input type="text" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-black text-sm text-slate-800 focus:bg-white focus:border-primary transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1">BIO (परिचय)</label>
                      <textarea rows={3} value={editForm.bio} onChange={e => setEditForm({...editForm, bio: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-black text-sm text-slate-800 focus:bg-white focus:border-primary transition-all resize-none" />
                   </div>
                   <div className="pt-6">
                      <button onClick={handleSaveEdit} disabled={isSavingEdit} className="w-full bg-primary text-white py-5 font-black text-xs uppercase tracking-[0.4em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                         {isSavingEdit ? <Loader2 className="size-6 animate-spin mx-auto" /> : "सुरक्षित करें"}
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Member Record Edit */}
        {showMemberEditModal && memberData && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
             <div className="bg-white rounded-[3rem] w-full max-w-3xl p-8 md:p-12 shadow-2xl relative animate-in zoom-in-95 duration-200 my-10 border border-slate-100">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-slate-50 pb-8 gap-6">
                   <div className="border-l-[16px] border-primary pl-8 text-center md:text-left">
                      <h2 className="text-3xl md:text-4xl font-black text-slate-800 uppercase tracking-tighter italic">सदस्य <span className="text-primary italic">विवरण अपडेट</span></h2>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.5em] mt-2 italic">OFFICIAL RECORD PORTFOLIO</p>
                   </div>
                   <button onClick={() => setShowMemberEditModal(false)} className="size-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all border border-slate-100">
                      <X className="size-8" />
                   </button>
                </div>

                <div className="space-y-10">
                   {/* Photo Section */}
                   <div className="flex flex-col items-center gap-4 py-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                      <div className="relative">
                         <div className="size-36 border-4 border-white rounded-3xl overflow-hidden bg-white shadow-lg">
                            {memberEditForm.photoUrl ? (
                               <img src={memberEditForm.photoUrl} alt="Member" className="size-full object-cover" />
                            ) : (
                               <div className="size-full flex items-center justify-center text-slate-200 bg-slate-50">
                                  <Camera className="size-12" />
                                </div>
                            )}
                         </div>
                         <button 
                            onClick={() => memberPhotoInputRef.current?.click()}
                            className="absolute -bottom-4 -right-4 size-14 bg-primary text-white flex items-center justify-center rounded-2xl border-4 border-white hover:scale-110 active:scale-95 shadow-xl transition-all"
                         >
                            <Camera className="size-6" />
                         </button>
                         <input ref={memberPhotoInputRef} type="file" accept="image/*" className="hidden" onChange={handleMemberPhotoChange} />
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID कार्ड के लिए फोटो</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-2">पूरा नाम</label>
                          <input type="text" value={memberEditForm.name} onChange={e => setMemberEditForm({...memberEditForm, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-black text-sm text-slate-800 focus:bg-white focus:border-primary transition-all" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-2">पिता का नाम</label>
                          <input type="text" value={memberEditForm.fatherName} onChange={e => setMemberEditForm({...memberEditForm, fatherName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-black text-sm text-slate-800 focus:bg-white focus:border-primary transition-all" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-2">मोबाइल नंबर</label>
                          <input type="text" value={memberEditForm.phone} onChange={e => setMemberEditForm({...memberEditForm, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-black text-sm text-slate-800 focus:bg-white focus:border-primary transition-all" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-2">शहर/गांव</label>
                          <input type="text" value={memberEditForm.city} onChange={e => setMemberEditForm({...memberEditForm, city: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-black text-sm text-slate-800 focus:bg-white focus:border-primary transition-all" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest ml-2">रक्त समूह</label>
                          <select value={memberEditForm.bloodGroup} onChange={e => setMemberEditForm({...memberEditForm, bloodGroup: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-black text-sm text-slate-800 focus:bg-white focus:border-primary transition-all appearance-none cursor-pointer">
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

                   <div className="pt-8">
                      <button onClick={handleUpdateMember} disabled={isSavingMemberEdit} className="w-full bg-slate-900 border-b-8 border-slate-950 text-white py-6 font-black text-xl uppercase tracking-[0.4em] rounded-3xl shadow-xl hover:bg-primary hover:border-primary transition-all active:translate-y-2 active:border-b-0">
                         {isSavingMemberEdit ? <Loader2 className="size-8 animate-spin mx-auto" /> : "रिकॉर्ड अपडेट करें"}
                      </button>
                      <p className="text-center text-[10px] font-black text-slate-300 mt-6 uppercase tracking-widest italic leading-relaxed">* Changes will be applied to your digital ID card instantly.</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Member Search Profile Link */}
        {searchMemberMode && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
             <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 md:p-12 shadow-2xl relative animate-in zoom-in-95 border border-slate-100 text-center italic">
                <button onClick={() => setSearchMemberMode(false)} className="absolute top-8 right-8 text-slate-300 hover:text-rose-500 transition-colors">
                  <X className="size-8" />
                </button>
                <div className="space-y-8">
                   <div className="size-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                      <ShieldCheck className="size-10" />
                   </div>
                   <div className="space-y-1">
                      <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">सदस्यता लिंक करें</h2>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">OFFICIAL DATABASE VERIFICATION</p>
                   </div>
                   <div className="space-y-4">
                      <input 
                        type="tel" 
                        placeholder="+91..."
                        value={searchPhone}
                        onChange={e => setSearchPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 font-black text-center text-3xl outline-none focus:bg-white focus:border-primary transition-all text-slate-800 tracking-tighter"
                      />
                   </div>
                   <button 
                     onClick={handleLinkMember}
                     disabled={isLoadingMember}
                     className="w-full py-5 bg-primary text-white font-black text-xl uppercase tracking-[0.4em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                   >
                      {isLoadingMember ? <Loader2 className="size-6 animate-spin mx-auto" /> : "सत्यापित करें"}
                   </button>
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic pt-4">
                      पंजीकरण नहीं किया? <Link to="/register" className="text-primary hover:underline">यहाँ क्लिक करें</Link>
                   </p>
                </div>
             </div>
          </div>
        )}

        {/* ID Card Modal */}
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
      </div>
    );
  }

  // ── AUTH FLOW ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-[#FFFDFB]">
        {/* Striped Background Element */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #CC3300 0, #CC3300 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}></div>
        
        <div className="w-full max-w-lg relative z-10">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-14 shadow-2xl text-center italic">
            
            <div className="flex justify-center mb-10">
              <div className="size-20 bg-primary text-white flex items-center justify-center rounded-3xl shadow-lg shadow-primary/20 border-4 border-white">
                {isLogin ? <LogIn className="size-10" /> : <UserPlus className="size-10" />}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-2 leading-none tracking-tighter uppercase">LAKHARA <span className="text-primary italic">NEWS</span></h1>
            <p className="text-slate-400 font-black mb-12 text-[11px] uppercase tracking-[0.6em] border-b-2 border-slate-50 pb-6 block">
               {isLogin ? "MEMBER ACCESS PORTAL" : "REGISTRATION SYSTEM"}
            </p>

            <form onSubmit={handleAuth} className="space-y-6 text-left">
              {!isLogin && (
                <div className="space-y-1.5">
                   <label className="text-[11px] font-black text-slate-800 uppercase tracking-widest pl-2">FULL NAME</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-slate-300" />
                    <input required type="text" placeholder="आपका पूर्ण नाम" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4.5 font-bold text-slate-800 focus:bg-white focus:border-primary outline-none transition-all shadow-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                </div>
              )}
              <div className="space-y-1.5">
                 <label className="text-[11px] font-black text-slate-800 uppercase tracking-widest pl-2">EMAIL ADDRESS</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-slate-300" />
                  <input required type="email" placeholder="mail@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4.5 font-bold text-slate-800 focus:bg-white focus:border-primary outline-none transition-all shadow-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1.5">
                 <label className="text-[11px] font-black text-slate-800 uppercase tracking-widest pl-2">PASSWORD</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-slate-300" />
                  <input required type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4.5 font-bold text-slate-800 focus:bg-white focus:border-primary outline-none transition-all shadow-sm" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
              </div>
              {!isLogin && (
                <div className="space-y-1.5">
                   <label className="text-[11px] font-black text-slate-800 uppercase tracking-widest pl-2">CONFIRM PASSWORD</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-slate-300" />
                    <input required type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4.5 font-bold text-slate-800 focus:bg-white focus:border-primary outline-none transition-all shadow-sm" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                  </div>
                </div>
              )}
              <div className="pt-6 space-y-4">
                 <button type="submit" disabled={isLoading} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-base uppercase tracking-[0.4em] shadow-xl hover:bg-primary transition-all flex items-center justify-center gap-4 active:scale-[0.98]">
                   {isLoading ? <Loader2 className="size-6 animate-spin" /> : (isLogin ? "LOGIN ACCESS" : "REGISTER")}
                 </button>
                 
                 <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                    <div className="relative flex justify-center text-[9px] uppercase font-black tracking-[0.3em] bg-white px-4 text-slate-300 italic">या फिर</div>
                 </div>

                 <GoogleAuthButton />
              </div>
            </form>

            <div className="pt-10 text-center">
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-slate-400 font-black text-xs hover:text-primary transition-colors uppercase tracking-[0.3em] italic">
                  {isLogin ? "नया खाता तैयार करें" : "पुराना खाता? लॉगिन करें"}
                </button>
            </div>
          </div>
        </div>
      </div>
    );
}

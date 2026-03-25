import { useState, useEffect, useRef } from "react";
import {
  User, Mail, Lock, LogIn, UserPlus, ShieldCheck, Heart, Camera,
  Settings, Bell, Bookmark, Share2, LogOut, ChevronRight, Loader2,
  X, Save, MapPin, ExternalLink, Check, Zap, Flame, Sparkles, Play, Eye
} from "lucide-react";
import { auth, db, storage } from "../data/firebase";
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, updateProfile,
} from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { getArticles } from "../data/mockData";
import { ArticleCard } from "../components/ArticleCard";

// ── Saved Articles Helpers ────────────────────────────────────────────────────
const SAVED_KEY = "lakhara_saved_articles";
export const getSavedIds = (): string[] => {
  try { return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"); }
  catch { return []; }
};
export const isArticleSaved = (id: string) => getSavedIds().includes(id);
export const toggleSaveArticle = (id: string): boolean => {
  const ids = getSavedIds();
  const isSaved = ids.includes(id);
  const next = isSaved ? ids.filter((i) => i !== id) : [...ids, id];
  localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("savedArticlesChanged"));
  return !isSaved;
};

// ── Main Component ─────────────────────────────────────────────────────────────
export function ProfilePage() {
  const { user, userData, loading: authLoading } = useAuth();

  // Auth form
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  // Profile photo
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", bio: "", location: "" });
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Live display values
  const [displayName, setDisplayName]   = useState("");
  const [displayBio, setDisplayBio]     = useState("");
  const [displayLoc, setDisplayLoc]     = useState("");

  // Notifications
  const [notifEnabled, setNotifEnabled] = useState(false);

  // Saved articles
  const [savedArticles, setSavedArticlesState] = useState<any[]>([]);

  // ── Initialise on login ────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;

    const photo = userData?.photoURL || user.photoURL || null;
    setPhotoURL(photo);

    const name = userData?.name || user.displayName || user.email || "";
    const bio  = userData?.bio  || "Proud member of the Lakhara News community.";
    const loc  = userData?.location || "India";
    setEditForm({ name, bio, location: loc });
    setDisplayName(name);
    setDisplayBio(bio);
    setDisplayLoc(loc);

    if ("Notification" in window) {
      const pref = localStorage.getItem("lakhara_notif");
      setNotifEnabled(Notification.permission === "granted" && pref === "enabled");
    }

    loadSavedArticles();
  }, [user, userData]);

  useEffect(() => {
    const handler = () => loadSavedArticles();
    window.addEventListener("savedArticlesChanged", handler);
    return () => window.removeEventListener("savedArticlesChanged", handler);
  }, []);

  const loadSavedArticles = () => {
    const ids = getSavedIds();
    const all = getArticles();
    setSavedArticlesState(all.filter((a) => ids.includes(a.id)));
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
      toast.success("Identity visual updated.");
    } catch {
      toast.error("Protocol upload failed.");
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
      toast.success("Profile sync successful.");
    } catch {
      toast.error("Profile sync failed.");
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleNotificationToggle = async () => {
    if (notifEnabled) {
      localStorage.setItem("lakhara_notif", "disabled");
      setNotifEnabled(false);
      toast.success("Alerts deactivated.");
    } else {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        localStorage.setItem("lakhara_notif", "enabled");
        setNotifEnabled(true);
        toast.success("Alerts activated.");
      }
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          toast.error("Credentials mismatch.");
          setIsLoading(false);
          return;
        }
        const { user: newUser } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await updateProfile(newUser, { displayName: formData.name });
        await setDoc(doc(db, "users", newUser.uid), {
          uid: newUser.uid, name: formData.name, email: formData.email,
          role: "community_member", joinedAt: new Date().toISOString(),
          bio: "Proud member of the Lakhara News community.", location: "India",
        });
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      toast.success("Access granted.");
    } catch (err: any) {
      toast.error(err.message || "Auth failed.");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="size-12 animate-spin text-primary" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="bg-[#fcfcfc] min-h-screen pb-32">
        <div className="container mx-auto px-6 py-10 max-w-4xl space-y-12">
          {/* ── Profile Header ── */}
          <section className="bg-gray-950 rounded-[4rem] p-10 md:p-16 relative overflow-hidden border border-white/5 shadow-3xl">
             <div className="absolute top-0 right-0 size-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="relative">
                   <div className="size-44 rounded-[3.5rem] bg-white/5 p-2 border-2 border-white/10 shadow-2xl relative overflow-hidden group">
                      {isUploadingPhoto ? (
                         <div className="size-full flex items-center justify-center">
                            <Loader2 className="size-10 text-primary animate-spin" />
                         </div>
                      ) : photoURL ? (
                        <img src={photoURL} alt="Profile" className="size-full object-cover rounded-[3rem]" />
                      ) : (
                        <div className="size-full bg-white/5 flex items-center justify-center text-primary">
                           <User className="size-20" />
                        </div>
                      )}
                      <button 
                        onClick={() => photoInputRef.current?.click()}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"
                      >
                         <Camera className="size-10 text-white" />
                      </button>
                   </div>
                   <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </div>

                <div className="flex-1 text-center md:text-left space-y-5">
                   <div>
                      <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none mb-3">{displayName}</h1>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4">
                         <div className="flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full border border-primary/20">
                            <ShieldCheck className="size-3" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Verified Community Member</span>
                         </div>
                         <div className="flex items-center gap-2 bg-white/5 text-gray-400 px-4 py-1.5 rounded-full border border-white/5">
                            <MapPin className="size-3" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em]">{displayLoc}</span>
                         </div>
                      </div>
                   </div>
                   <p className="text-gray-400 font-medium italic text-xl leading-relaxed line-clamp-2 max-w-xl">"{displayBio}"</p>
                   <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                      <button onClick={() => setShowEditModal(true)} className="btn-lakhara !rounded-2xl !px-12 !py-4 text-[11px]">EDIT IDENTITY</button>
                      <button onClick={() => signOut(auth)} className="px-12 py-4 rounded-2xl border border-white/10 text-white font-black text-[11px] uppercase tracking-widest hover:bg-white/5 transition-all">TERMINATE SESSION</button>
                   </div>
                </div>
             </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="space-y-10">
                <div className="flex items-center gap-4 border-l-8 border-lakhara pl-8">
                   <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">Operations</h2>
                </div>
                
                <div className="space-y-5">
                   <button onClick={handleNotificationToggle} className="w-full flex items-center justify-between p-10 bg-white rounded-[3rem] border border-gray-100 hover:shadow-2xl transition-all group active:scale-95">
                      <div className="flex items-center gap-8">
                         <div className={`size-16 rounded-[1.5rem] flex items-center justify-center shadow-lg transition-all ${notifEnabled ? 'bg-primary text-white shadow-lakhara' : 'bg-gray-50 text-gray-400'}`}>
                            <Bell className="size-8" />
                         </div>
                         <div className="text-left space-y-1">
                            <span className="font-black text-gray-900 text-2xl block italic uppercase tracking-tighter">Global Alerts</span>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">{notifEnabled ? "Protocols Online" : "System Deactivated"}</span>
                         </div>
                      </div>
                      <div className={`w-16 h-8 rounded-full flex items-center transition-all duration-500 px-1 border-2 ${notifEnabled ? 'bg-primary/5 border-primary/20 justify-end' : 'bg-gray-50 border-gray-200 justify-start'}`}>
                         <div className={`size-5 rounded-full shadow-md transition-all ${notifEnabled ? 'bg-primary' : 'bg-gray-300'}`} />
                      </div>
                   </button>

                   <div className="p-10 bg-gray-950 rounded-[3rem] text-white flex items-center justify-between border border-white/5 shadow-xl">
                      <div className="flex items-center gap-8">
                         <div className="size-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center">
                            <Zap className="size-8 text-primary" />
                         </div>
                         <div className="space-y-1">
                            <span className="font-black text-xl block italic uppercase tracking-tighter">Member Access</span>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Full Network Control</span>
                         </div>
                      </div>
                      <Check className="size-8 text-green-500" />
                   </div>
                </div>
             </div>

             <div className="space-y-10">
                <div className="flex items-center gap-4 border-l-8 border-lakhara pl-8">
                   <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">Cached Intel</h2>
                </div>
                
                <div className="space-y-6 max-h-[500px] overflow-y-auto no-scrollbar pr-2">
                   {savedArticles.length === 0 ? (
                      <div className="bg-gray-50 rounded-[4rem] p-24 flex flex-col items-center justify-center text-center gap-8 border border-dashed border-gray-200 opacity-80">
                         <div className="size-24 bg-white rounded-[2rem] flex items-center justify-center text-gray-200 shadow-sm">
                            <Bookmark className="size-12" />
                         </div>
                         <div>
                            <span className="text-2xl font-black text-gray-900 italic uppercase tracking-tighter">No Data Reserved</span>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">Initialize bookmarks to see content here</p>
                         </div>
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
             <div className="absolute inset-0 bg-gray-950/90 backdrop-blur-xl" onClick={() => setShowEditModal(false)}></div>
             <div className="bg-white w-full max-w-xl rounded-[4rem] p-12 md:p-16 relative z-10 shadow-3xl animate-in items-center zoom-in-95 duration-500 border border-gray-100">
                <div className="flex justify-between items-center mb-14">
                   <h2 className="text-5xl font-black text-gray-900 italic tracking-tighter uppercase leading-none">IDENTITY <span className="text-gradient">SYNC</span></h2>
                   <button onClick={() => setShowEditModal(false)} className="size-14 bg-gray-50 rounded-3xl flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <X className="size-7" />
                   </button>
                </div>
                
                <div className="space-y-10">
                   <div className="space-y-4">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.5em] ml-4">Access ID Name</label>
                      <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 rounded-[2.5rem] p-8 font-bold outline-none transition-all text-xl" />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.5em] ml-4">Mission Statement (Bio)</label>
                      <textarea rows={3} value={editForm.bio} onChange={e => setEditForm({...editForm, bio: e.target.value})} className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 rounded-[2.5rem] p-8 font-bold outline-none transition-all text-xl resize-none" />
                   </div>
                   <button onClick={handleSaveEdit} disabled={isSavingEdit} className="w-full btn-lakhara !py-8 !text-2xl !rounded-[2.5rem] shadow-2xl flex items-center justify-center gap-4">
                      {isSavingEdit ? <Loader2 className="size-8 animate-spin" /> : <Save className="size-8" />}
                      {isSavingEdit ? "SYNCING..." : "COMMIT CHANGES"}
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-[-15%] right-[-15%] size-[800px] bg-primary/20 rounded-full blur-[180px] animate-pulse duration-[5000ms]"></div>
        <div className="absolute bottom-[-15%] left-[-15%] size-[800px] bg-orange-600/10 rounded-full blur-[180px]"></div>

        <div className="w-full max-w-lg relative z-10 transition-all duration-500">
          <div className="glass p-12 md:p-20 rounded-[5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] text-center relative overflow-hidden backdrop-blur-3xl group">
            <div className="absolute top-0 left-0 w-full h-2 bg-lakhara opacity-50 group-hover:h-full group-hover:opacity-5 transition-all duration-700"></div>
            
            <div className="flex justify-center mb-12">
              <div className="size-24 bg-lakhara rounded-[2.5rem] flex items-center justify-center shadow-lakhara rotate-[-12deg] transform-gpu hover:rotate-0 transition-transform duration-500">
                {isLogin ? <LogIn className="size-12 text-white" /> : <UserPlus className="size-12 text-white" />}
              </div>
            </div>
            
            <h1 className="text-5xl font-black text-white italic tracking-tighter mb-4 leading-none uppercase">LAKHARA <span className="text-gradient">HQ</span></h1>
            <p className="text-gray-500 font-bold mb-14 uppercase tracking-[0.4em] text-[10px]">{isLogin ? "IDENTITY VALIDATION REQUIRED" : "INITIALIZE NETWORK PROTOCOL"}</p>

            <form onSubmit={handleAuth} className="space-y-6">
              {!isLogin && (
                <div className="relative group/field">
                  <User className="absolute left-8 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within/field:text-primary transition-colors" />
                  <input required type="text" placeholder="IDENTITY HANDLE..." className="w-full bg-white/5 border border-white/5 rounded-[2.5rem] pl-16 pr-8 py-6 font-bold text-white outline-none focus:bg-white/10 focus:border-primary/50 transition-all text-xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
              )}
              <div className="relative group/field">
                <Mail className="absolute left-8 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within/field:text-primary transition-colors" />
                <input required type="email" placeholder="NETWORK ADDRESS..." className="w-full bg-white/5 border border-white/5 rounded-[2.5rem] pl-16 pr-8 py-6 font-bold text-white outline-none focus:bg-white/10 focus:border-primary/50 transition-all text-xl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="relative group/field">
                <Lock className="absolute left-8 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within/field:text-primary transition-colors" />
                <input required type="password" placeholder="ACCESS KEY..." className="w-full bg-white/5 border border-white/5 rounded-[2.5rem] pl-16 pr-8 py-6 font-bold text-white outline-none focus:bg-white/10 focus:border-primary/50 transition-all text-xl" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
              {!isLogin && (
                <div className="relative group/field">
                  <ShieldCheck className="absolute left-8 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within/field:text-primary transition-colors" />
                  <input required type="password" placeholder="VERIFY KEY..." className="w-full bg-white/5 border border-white/5 rounded-[2.5rem] pl-16 pr-8 py-6 font-bold text-white outline-none focus:bg-white/10 focus:border-primary/50 transition-all text-xl" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                </div>
              )}

              <button type="submit" disabled={isLoading} className="w-full btn-lakhara !py-8 !text-2xl !rounded-[2.5rem] mt-6 shadow-[0_20px_50px_rgba(255,49,49,0.3)] group-active:scale-95 transition-transform">
                {isLoading ? "VALIDATING..." : (isLogin ? "ESTABLISH LINK" : "INITIALIZE NODE")}
              </button>

              <div className="mt-10">
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-gray-500 font-black uppercase tracking-[0.35em] text-[10px] hover:text-white transition-all">
                  {isLogin ? "Register New Identity Node" : "Access Logic Terminal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}

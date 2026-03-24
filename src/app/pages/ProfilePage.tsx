import { useState, useEffect, useRef } from "react";
import {
  User, Mail, Lock, LogIn, UserPlus, ShieldCheck, Heart, Camera,
  Settings, Bell, Bookmark, Share2, LogOut, ChevronRight, Loader2,
  X, Save, MapPin, ExternalLink, Check,
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

// ── Saved Articles Helpers ────────────────────────────────────────────────────
const SAVED_KEY = "lakhara_saved_articles";
export const getSavedIds = (): string[] => {
  try { return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"); }
  catch { return []; }
};
export const toggleSaveArticle = (id: string): boolean => {
  const ids = getSavedIds();
  const isSaved = ids.includes(id);
  const next = isSaved ? ids.filter((i) => i !== id) : [...ids, id];
  localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("savedArticlesChanged"));
  return !isSaved;
};
export const isArticleSaved = (id: string) => getSavedIds().includes(id);

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

  // Live display values (updated on save)
  const [displayName, setDisplayName]   = useState("");
  const [displayBio, setDisplayBio]     = useState("");
  const [displayLoc, setDisplayLoc]     = useState("");

  // Notifications
  const [notifEnabled, setNotifEnabled] = useState(false);

  // Saved articles
  const [showSaved, setShowSaved] = useState(false);
  const [savedArticles, setSavedArticlesState] = useState<any[]>([]);

  // Share
  const [shareSuccess, setShareSuccess] = useState(false);

  // ── Initialise on login ────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;

    const photo = userData?.photoURL || user.photoURL || null;
    setPhotoURL(photo);

    const name = userData?.name || user.displayName || user.email || "";
    const bio  = userData?.bio  || "लखारा न्यूज़ समुदाय का गर्वित सदस्य।";
    const loc  = userData?.location || "भारत";
    setEditForm({ name, bio, location: loc });
    setDisplayName(name);
    setDisplayBio(bio);
    setDisplayLoc(loc);

    // Notification preference
    if ("Notification" in window) {
      const pref = localStorage.getItem("lakhara_notif");
      setNotifEnabled(Notification.permission === "granted" && pref === "enabled");
    }

    loadSavedArticles();
  }, [user, userData]);

  // Listen for bookmark changes from other pages
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

  // ── Profile Photo Upload ───────────────────────────────────────────────────
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("फ़ोटो 5MB से कम होनी चाहिए।"); return; }

    setIsUploadingPhoto(true);
    try {
      const storageRef = ref(storage, `profile_photos/${user.uid}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await updateProfile(user, { photoURL: url });
      await updateDoc(doc(db, "users", user.uid), { photoURL: url });
      setPhotoURL(url);
      toast.success("प्रोफ़ाइल फोटो अपडेट हो गई! 📸");
    } catch (err: any) {
      console.error(err);
      toast.error("फोटो अपलोड नहीं हो सकी।");
    } finally {
      setIsUploadingPhoto(false);
      // Reset input so same file can be selected again
      if (photoInputRef.current) photoInputRef.current.value = "";
    }
  };

  // ── Profile Edit ──────────────────────────────────────────────────────────
  const openEditModal = () => {
    setEditForm({ name: displayName, bio: displayBio, location: displayLoc });
    setShowEditModal(true);
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
      await updateProfile(user, { displayName: editForm.name });
      setDisplayName(editForm.name);
      setDisplayBio(editForm.bio);
      setDisplayLoc(editForm.location);
      setShowEditModal(false);
      toast.success("प्रोफ़ाइल अपडेट हो गई! ✅");
    } catch {
      toast.error("प्रोफ़ाइल अपडेट नहीं हो सकी।");
    } finally {
      setIsSavingEdit(false);
    }
  };

  // ── Notifications ─────────────────────────────────────────────────────────
  const handleNotificationToggle = async () => {
    if (!("Notification" in window)) {
      toast.error("आपका ब्राउज़र नोटिफिकेशन सपोर्ट नहीं करता।");
      return;
    }
    if (notifEnabled) {
      localStorage.setItem("lakhara_notif", "disabled");
      setNotifEnabled(false);
      toast.success("न्यूज़ अलर्ट्स बंद कर दिए गए।");
    } else {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        localStorage.setItem("lakhara_notif", "enabled");
        setNotifEnabled(true);
        new Notification("लखारा न्यूज़ 🔔", {
          body: "ब्रेकिंग न्यूज़ अलर्ट्स चालू हो गए!",
          icon: "/favicon.ico",
        });
        toast.success("न्यूज़ अलर्ट्स चालू हो गए! 🔔");
      } else {
        toast.error("नोटिफिकेशन की अनुमति नहीं मिली। ब्राउज़र सेटिंग्स जांचें।");
      }
    }
  };

  // ── App Share ─────────────────────────────────────────────────────────────
  const handleShare = async () => {
    const shareData = {
      title: "लखारा न्यूज़ - Lakhara News",
      text: "भारत की ताज़ा खबरें पढ़ें - लखारा न्यूज़ पर!",
      url: "https://lakhara-news-website.web.app",
    };
    if (navigator.share) {
      try { await navigator.share(shareData); toast.success("शेयर किया गया! ✅"); }
      catch { /* user cancelled */ }
    } else {
      navigator.clipboard.writeText(shareData.url)
        .then(() => {
          setShareSuccess(true);
          setTimeout(() => setShareSuccess(false), 3000);
          toast.success("लिंक कॉपी हो गया! 📋");
        })
        .catch(() => toast.error("लिंक कॉपी नहीं हो सका।"));
    }
  };

  // ── Auth Handlers ─────────────────────────────────────────────────────────
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          toast.error("पासवर्ड मेल नहीं खाते!");
          setIsLoading(false);
          return;
        }
        const { user: newUser } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await updateProfile(newUser, { displayName: formData.name });
        await setDoc(doc(db, "users", newUser.uid), {
          uid: newUser.uid, name: formData.name, email: formData.email,
          role: "community_member", joinedAt: new Date().toISOString(),
          bio: "लखारा न्यूज़ समुदाय का गर्वित सदस्य।", location: "भारत",
        });
        toast.success("पंजीकरण सफल! समुदाय में आपका स्वागत है। 🎉");
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success("लॉगिन सफल! ✅");
      }
    } catch (error: any) {
      const code = error?.code || "";
      if (code === "auth/configuration-not-found" || code === "auth/operation-not-allowed")
        toast.error("Firebase Console में Email/Password Sign-in Enable नहीं है।");
      else if (code === "auth/email-already-in-use") toast.error("यह ईमेल पहले से पंजीकृत है। लॉगिन करें।");
      else if (["auth/user-not-found", "auth/wrong-password", "auth/invalid-credential"].includes(code))
        toast.error("ईमेल या पासवर्ड गलत है।");
      else if (code === "auth/weak-password") toast.error("पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।");
      else if (code === "auth/too-many-requests") toast.error("बहुत अधिक प्रयास। कुछ देर बाद दोबारा प्रयास करें।");
      else toast.error(error.message || "कुछ गलत हुआ!");
    } finally { setIsLoading(false); }
  };

  const handleLogout = async () => {
    try { await signOut(auth); toast.success("सफलतापूर्वक लॉग आउट किया गया।"); }
    catch { toast.error("लॉग आउट करने में विफल।"); }
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="size-12 animate-spin text-red-600" />
      </div>
    );
  }

  const joinedAt = userData?.joinedAt || new Date().toISOString();

  // ── Logged-in profile view ─────────────────────────────────────────────────
  if (user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl pb-32">

        {/* Hidden photo file input */}
        <input ref={photoInputRef} type="file" accept="image/*"
          className="hidden" onChange={handlePhotoChange} />

        {/* ── Profile Header Card ── */}
        <div className="relative bg-white rounded-[40px] p-8 shadow-2xl border border-gray-50 flex flex-col items-center text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-red-600 to-red-800 opacity-10" />

          {/* Avatar */}
          <div className="relative mt-4">
            <div className="size-32 bg-white rounded-[40px] p-2 shadow-2xl border-4 border-white">
              {isUploadingPhoto ? (
                <div className="size-full bg-red-50 rounded-[35px] flex items-center justify-center">
                  <Loader2 className="size-8 text-red-600 animate-spin" />
                </div>
              ) : photoURL ? (
                <img src={photoURL} alt="Profile"
                  className="size-full object-cover rounded-[35px]" />
              ) : (
                <div className="size-full bg-red-100 rounded-[35px] flex items-center justify-center">
                  <User className="size-16 text-red-600" />
                </div>
              )}
            </div>
            <button
              onClick={() => photoInputRef.current?.click()}
              title="प्रोफ़ाइल फोटो बदलें"
              className="absolute bottom-1 -right-1 size-10 bg-red-600 text-white rounded-2xl flex items-center justify-center border-4 border-white shadow-lg hover:scale-110 transition-transform"
            >
              <Camera className="size-5" />
            </button>
          </div>

          <h1 className="text-3xl font-black text-gray-900 mt-6 mb-1">{displayName}</h1>
          <p className="text-red-600 font-black text-xs uppercase tracking-widest mb-1">समुदाय सदस्य</p>
          <p className="text-gray-400 font-bold text-sm mb-3 flex items-center gap-1 justify-center">
            <MapPin className="size-3" /> {displayLoc}
          </p>
          <p className="text-gray-500 font-bold max-w-sm mb-8 leading-relaxed">{displayBio}</p>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-gray-50 p-6 rounded-3xl text-center border border-gray-100">
              <ShieldCheck className="size-6 text-green-600 mx-auto mb-2" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">स्टेटस</p>
              <p className="font-black text-gray-800">Verified</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl text-center border border-gray-100">
              <Heart className="size-6 text-red-600 mx-auto mb-2" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">जुड़ने की तिथि</p>
              <p className="font-black text-gray-800">{new Date(joinedAt).toLocaleDateString("hi-IN")}</p>
            </div>
          </div>
        </div>

        {/* ── Settings Section ── */}
        <div className="mt-8 space-y-4">
          <h3 className="px-6 text-gray-400 font-black text-xs uppercase tracking-widest">खाता सेटिंग्स</h3>

          <div className="bg-white rounded-[40px] p-4 shadow-xl border border-gray-50 space-y-1">

            {/* 1. Edit Profile */}
            <button onClick={openEditModal}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 rounded-3xl transition-all group">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Settings className="size-6" />
                </div>
                <span className="font-black text-gray-800 text-lg">प्रोफ़ाइल एडिट करें</span>
              </div>
              <ChevronRight className="size-5 text-gray-300 group-hover:text-red-500 transition-colors" />
            </button>

            {/* 2. Notifications Toggle */}
            <button onClick={handleNotificationToggle}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 rounded-3xl transition-all group">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                  <Bell className="size-6" />
                </div>
                <div className="text-left">
                  <span className="font-black text-gray-800 text-lg block">नोटिफिकेशन</span>
                  <span className="text-xs font-bold text-gray-400">
                    {notifEnabled ? "🔔 ब्रेकिंग न्यूज़ अलर्ट्स चालू" : "🔕 अलर्ट्स बंद हैं - टैप करें"}
                  </span>
                </div>
              </div>
              {/* Animated toggle switch */}
              <div className={`w-14 h-7 rounded-full flex items-center transition-all duration-300 px-1 shadow-inner ${notifEnabled ? "bg-red-600 justify-end" : "bg-gray-200 justify-start"}`}>
                <div className="size-5 bg-white rounded-full shadow-md transition-all" />
              </div>
            </button>

            {/* 3. Saved Articles */}
            <button onClick={() => { setShowSaved(!showSaved); loadSavedArticles(); }}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 rounded-3xl transition-all group">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                  <Bookmark className="size-6" />
                </div>
                <span className="font-black text-gray-800 text-lg">
                  सहेजी गई खबरें ({savedArticles.length})
                </span>
              </div>
              <ChevronRight className={`size-5 text-gray-300 group-hover:text-red-500 transition-all duration-300 ${showSaved ? "rotate-90" : ""}`} />
            </button>

            {/* Saved Articles List */}
            {showSaved && (
              <div className="mx-2 mb-2 space-y-2 animate-in slide-in-from-top-2 duration-200">
                {savedArticles.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    <Bookmark className="size-10 mx-auto mb-3 opacity-20" />
                    <p className="font-bold text-sm">कोई खबर सहेजी नहीं गई है।</p>
                    <p className="text-xs mt-1 text-gray-300">खबर पर 🔖 बटन दबाकर सहेजें।</p>
                  </div>
                ) : (
                  savedArticles.map((article) => (
                    <a key={article.id} href={`#/article/${article.slug}`}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors group/item">
                      <img src={article.imageUrl} className="size-14 rounded-xl object-cover flex-shrink-0"
                        alt={article.title} />
                      <div className="flex-1 text-left min-w-0">
                        <p className="font-bold text-sm text-gray-800 line-clamp-2 leading-tight">{article.title}</p>
                        <p className="text-xs text-gray-400 mt-1 font-bold uppercase tracking-wider">{article.category}</p>
                      </div>
                      <ExternalLink className="size-4 text-gray-300 group-hover/item:text-red-500 transition-colors flex-shrink-0" />
                    </a>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Other Section */}
          <h3 className="px-6 pt-2 text-gray-400 font-black text-xs uppercase tracking-widest">अन्य</h3>

          <div className="bg-white rounded-[40px] p-4 shadow-xl border border-gray-50 space-y-1">

            {/* 4. Share App */}
            <button onClick={handleShare}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 rounded-3xl transition-all group">
              <div className="flex items-center gap-4">
                <div className={`size-12 rounded-2xl flex items-center justify-center transition-all ${shareSuccess ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"}`}>
                  {shareSuccess ? <Check className="size-6" /> : <Share2 className="size-6" />}
                </div>
                <span className="font-black text-gray-800 text-lg">
                  {shareSuccess ? "लिंक कॉपी हो गया! ✅" : "ऐप शेयर करें"}
                </span>
              </div>
              <ChevronRight className="size-5 text-gray-300 group-hover:text-red-500 transition-colors" />
            </button>

            {/* Logout */}
            <button onClick={handleLogout}
              className="w-full flex items-center justify-between p-5 hover:bg-red-50 rounded-3xl transition-all group">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
                  <LogOut className="size-6" />
                </div>
                <span className="font-black text-red-600 text-lg">लॉग आउट करें</span>
              </div>
            </button>
          </div>
        </div>

        {/* ── Edit Profile Modal ── */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEditModal(false)}>
            <div className="bg-white rounded-[40px] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-gray-900">प्रोफ़ाइल एडिट करें</h2>
                <button onClick={() => setShowEditModal(false)}
                  className="size-10 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all">
                  <X className="size-5" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">नाम</label>
                  <input type="text" value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl px-4 py-4 font-bold outline-none transition-all"
                    placeholder="आपका नाम" />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">बायो</label>
                  <textarea value={editForm.bio} rows={3}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl px-4 py-4 font-bold outline-none transition-all resize-none"
                    placeholder="अपने बारे में लिखें..." />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">स्थान</label>
                  <input type="text" value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl px-4 py-4 font-bold outline-none transition-all"
                    placeholder="शहर, राज्य" />
                </div>
              </div>

              <button onClick={handleSaveEdit} disabled={isSavingEdit}
                className="mt-8 w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-3xl font-black text-lg shadow-xl shadow-red-100 transition-all flex items-center justify-center gap-3 disabled:opacity-70">
                {isSavingEdit ? <Loader2 className="size-5 animate-spin" /> : <Save className="size-5" />}
                {isSavingEdit ? "सहेज रहे हैं..." : "सहेजें"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Login / Register Form ──────────────────────────────────────────────────
  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-gray-50 mt-10">
        <div className="text-center mb-10">
          <div className="inline-flex size-20 bg-red-600 rounded-3xl items-center justify-center text-white mb-6 transform rotate-3 shadow-xl">
            {isLogin ? <LogIn className="size-10" /> : <UserPlus className="size-10" />}
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-2">
            {isLogin ? "दोबारा स्वागत है!" : "समुदाय से जुड़ें"}
          </h2>
          <p className="text-gray-500 font-bold">
            {isLogin ? "अपडेट रहने के लिए लॉगिन करें" : "पंजीकरण करें और समुदाय का हिस्सा बनें"}
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center mb-6">
            <Loader2 className="size-8 animate-spin text-red-600" />
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          {!isLogin && (
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
              <input required type="text" placeholder="आपका नाम"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl pl-12 py-5 font-bold outline-none transition-all"
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
          )}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
            <input required type="email" placeholder="ईमेल एड्रेस"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl pl-12 py-5 font-bold outline-none transition-all"
              value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
            <input required type="password" placeholder="पासवर्ड"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl pl-12 py-5 font-bold outline-none transition-all"
              value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </div>
          {!isLogin && (
            <div className="relative group">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
              <input required type="password" placeholder="पासवर्ड कन्फर्म करें"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl pl-12 py-5 font-bold outline-none transition-all"
                value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
            </div>
          )}
          <button disabled={isLoading}
            className="w-full py-6 bg-red-600 hover:bg-red-700 text-white rounded-3xl font-black text-xl shadow-2xl shadow-red-200 transition-all transform active:scale-95 group relative overflow-hidden disabled:opacity-70">
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isLoading ? "कृपया प्रतीक्षा करें..." : (isLogin ? "लॉगिन करें" : "पंजीकरण करें")}
              {!isLoading && <ChevronRight className="size-6 group-hover:translate-x-2 transition-transform" />}
            </span>
          </button>
        </form>

        <div className="text-center mt-12 pb-4">
          <button onClick={() => setIsLogin(!isLogin)}
            className="text-gray-500 font-black hover:text-red-600 transition-colors flex items-center justify-center gap-2 mx-auto">
            {isLogin ? "नया अकाउंट बनाएं? पंजीकरण करें" : "पहले से अकाउंट है? लॉगिन करें"}
          </button>
        </div>
      </div>
    </div>
  );
}

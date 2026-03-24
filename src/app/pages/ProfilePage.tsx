import { useState, useEffect } from "react";
import { User, Mail, Lock, LogIn, UserPlus, ShieldCheck, Heart, Camera, Settings, Bell, Bookmark, Share2, LogOut, ChevronRight, Loader2 } from "lucide-react";
import { auth, db } from "../data/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export function ProfilePage() {
  const { user, userData, loading: authLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleAuth = async (e: React.FormEvent) => { e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
            toast.error("पासवर्ड मेल नहीं खाते!");
            setIsLoading(false);
            return;
        }
        
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const firebaseUser = userCredential.user;
        
        // Save additional info to Firestore
        const newUser = { 
            uid: firebaseUser.uid,
            name: formData.name, 
            email: formData.email, 
            role: 'community_member', 
            joinedAt: new Date().toISOString(),
            bio: "लखारा न्यूज़ समुदाय का गर्वित सदस्य।",
            location: "भारत"
        };
        
        await setDoc(doc(db, "users", firebaseUser.uid), newUser);
        toast.success("पंजीकरण सफल! समुदाय में आपका स्वागत है।");
      } else {
        // Sign in with email and password
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success("लॉगिन सफल!");
      }
    } catch (error: any) {
        console.error("Auth error:", error);
        // Specific error messages in Hindi
        const code = error?.code || "";
        if (code === "auth/configuration-not-found" || code === "auth/operation-not-allowed") {
          toast.error("Firebase Console में Email/Password Sign-in Enable नहीं है। Admin से संपर्क करें।");
        } else if (code === "auth/email-already-in-use") {
          toast.error("यह ईमेल पहले से पंजीकृत है। लॉगिन करें।");
        } else if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
          toast.error("ईमेल या पासवर्ड गलत है।");
        } else if (code === "auth/weak-password") {
          toast.error("पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।");
        } else if (code === "auth/invalid-email") {
          toast.error("ईमेल एड्रेस सही नहीं है।");
        } else if (code === "auth/too-many-requests") {
          toast.error("बहुत अधिक प्रयास। कुछ देर बाद दोबारा प्रयास करें।");
        } else if (code === "auth/network-request-failed") {
          toast.error("नेटवर्क त्रुटि। इंटरनेट कनेक्शन जांचें।");
        } else {
          toast.error(error.message || "कुछ गलत हुआ! दोबारा प्रयास करें।");
        }
    } finally {
        setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
        await signOut(auth);
        toast.success("सफलतापूर्वक लॉग आउट किया गया।");
    } catch (error) {
        toast.error("लॉग आउट करने में विफल।");
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="size-12 animate-spin text-red-600" />
      </div>
    );
  }

  const profile = userData || (user ? { name: user.displayName || user.email, bio: "लखारा न्यूज़ समुदाय का गर्वित सदस्य।", joinedAt: new Date().toISOString() } : null);

  if (user && profile) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl pb-32">
        {/* Profile Header */}
        <div className="relative bg-white rounded-[40px] p-8 shadow-2xl border border-gray-50 flex flex-col items-center text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-red-600 to-red-800 opacity-10"></div>
          
          <div className="relative mt-4">
             <div className="size-32 bg-white rounded-[40px] p-2 shadow-2xl border-4 border-white">
                <div className="size-full bg-red-100 rounded-[35px] flex items-center justify-center">
                   <User className="size-16 text-red-600" />
                </div>
             </div>
             <button className="absolute bottom-1 -right-1 size-10 bg-red-600 text-white rounded-2xl flex items-center justify-center border-4 border-white shadow-lg hover:scale-110 transition-transform">
                <Camera className="size-5" />
             </button>
          </div>

          <h1 className="text-3xl font-black text-gray-900 mt-6 mb-1">{profile.name}</h1>
          <p className="text-red-600 font-black text-xs uppercase tracking-widest mb-4">समुदाय सदस्य</p>
          <p className="text-gray-500 font-bold max-w-sm mb-8 leading-relaxed">
             {profile.bio}
          </p>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-gray-50 p-6 rounded-3xl text-center border border-gray-100">
               <ShieldCheck className="size-6 text-green-600 mx-auto mb-2" />
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">स्टेटस</p>
               <p className="font-black text-gray-800">Verified</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl text-center border border-gray-100">
               <Heart className="size-6 text-red-600 mx-auto mb-2" />
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">जुड़ने की तिथि</p>
               <p className="font-black text-gray-800">{new Date(profile.joinedAt).toLocaleDateString('hi-IN')}</p>
            </div>
          </div>
        </div>

        {/* Action List Section */}
        <div className="mt-8 space-y-4">
           <h3 className="px-6 text-gray-400 font-black text-xs uppercase tracking-widest">खाता सेटिंग्स</h3>
           
           <div className="bg-white rounded-[40px] p-4 shadow-xl border border-gray-50 space-y-1">
              <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 rounded-3xl transition-all group">
                 <div className="flex items-center gap-4">
                    <div className="size-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                       <Settings className="size-6" />
                    </div>
                    <span className="font-black text-gray-800 text-lg">प्रोफ़ाइल एडिट करें</span>
                 </div>
                 <ChevronRight className="size-5 text-gray-300 group-hover:text-red-500 transition-colors" />
              </button>

              <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 rounded-3xl transition-all group">
                 <div className="flex items-center gap-4">
                    <div className="size-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                       <Bell className="size-6" />
                    </div>
                    <div className="text-left">
                       <span className="font-black text-gray-800 text-lg block">नोटिफिकेशन</span>
                       <span className="text-xs font-bold text-gray-400">कस्टम न्यूज़ अलर्ट्स सेट करें</span>
                    </div>
                 </div>
                 <div className="w-12 h-6 bg-red-600 rounded-full flex items-center justify-end px-1 shadow-inner cursor-pointer">
                    <div className="size-4 bg-white rounded-full"></div>
                 </div>
              </button>

              <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 rounded-3xl transition-all group">
                 <div className="flex items-center gap-4">
                    <div className="size-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                       <Bookmark className="size-6" />
                    </div>
                    <span className="font-black text-gray-800 text-lg">सहेजी गई खबरें (0)</span>
                 </div>
                 <ChevronRight className="size-5 text-gray-300 group-hover:text-red-500 transition-colors" />
              </button>
           </div>

           <h3 className="px-6 pt-4 text-gray-400 font-black text-xs uppercase tracking-widest">अन्य</h3>
           
           <div className="bg-white rounded-[40px] p-4 shadow-xl border border-gray-50 space-y-1">
              <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 rounded-3xl transition-all group">
                 <div className="flex items-center gap-4">
                    <div className="size-12 bg-gray-50 text-gray-600 rounded-2xl flex items-center justify-center">
                       <Share2 className="size-6" />
                    </div>
                    <span className="font-black text-gray-800 text-lg">ऐप शेयर करें</span>
                 </div>
                 <ChevronRight className="size-5 text-gray-300 transition-colors" />
              </button>

              <button onClick={handleLogout} className="w-full flex items-center justify-between p-5 hover:bg-red-50 rounded-3xl transition-all group">
                 <div className="flex items-center gap-4">
                    <div className="size-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
                       <LogOut className="size-6" />
                    </div>
                    <span className="font-black text-red-600 text-lg">लॉग आउट करें</span>
                 </div>
              </button>
           </div>
        </div>
      </div>
    );
  }

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
              <input
                required
                type="text"
                placeholder="आपका नाम"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl pl-12 py-5 font-bold outline-none transition-all shadow-sm focus:shadow-xl focus:shadow-red-50/50"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
            <input
              required
              type="email"
              placeholder="ईमेल एड्रेस"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl pl-12 py-5 font-bold outline-none transition-all shadow-sm focus:shadow-xl focus:shadow-red-50/50"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
            <input
              required
              type="password"
              placeholder="पासवर्ड"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl pl-12 py-5 font-bold outline-none transition-all shadow-sm focus:shadow-xl focus:shadow-red-50/50"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {!isLogin && (
            <div className="relative group">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
              <input
                required
                type="password"
                placeholder="पासवर्ड कन्फर्म करें"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl pl-12 py-5 font-bold outline-none transition-all shadow-sm focus:shadow-xl focus:shadow-red-50/50"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          )}

          <button 
            disabled={isLoading}
            className="w-full py-6 bg-red-600 hover:bg-red-700 text-white rounded-3xl font-black text-xl shadow-2xl shadow-red-200 transition-all transform active:scale-95 group relative overflow-hidden disabled:opacity-70"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
               {isLoading ? "कृपया प्रतीक्षा करें..." : (isLogin ? "लॉगिन करें" : "पंजीकरण करें")}
               {!isLoading && <ChevronRight className="size-6 group-hover:translate-x-2 transition-transform" />}
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </form>

        <div className="text-center mt-12 pb-4">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-500 font-black hover:text-red-600 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            {isLogin ? "नया अकाउंट बनाएं? पंजीकरण करें" : "पहले से अकाउंट है? लॉगिन करें"}
          </button>
        </div>
      </div>
    </div>
  );
}

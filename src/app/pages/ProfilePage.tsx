import { useState, useEffect } from "react";
import { User, Mail, Lock, LogIn, UserPlus, ShieldCheck, Heart, Camera, Settings, Bell, Bookmark, Share2, LogOut, ChevronRight } from "lucide-react";

export function ProfilePage() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");

  // New settings states
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("news_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setMessage("पासवर्ड मेल नहीं खाते!");
        return;
      }
      
      const newUser = { 
        name: formData.name, 
        email: formData.email, 
        role: 'community_member', 
        joinedAt: new Date().toISOString(),
        bio: "लखारा न्यूज़ समुदाय का गर्वित सदस्य।",
        location: "भारत"
      };
      
      const users = JSON.parse(localStorage.getItem("community_users") || "[]");
      users.push(newUser);
      localStorage.setItem("community_users", JSON.stringify(users));
      
      localStorage.setItem("news_user", JSON.stringify(newUser));
      setUser(newUser);
      setMessage("पंजीकरण सफल! समुदाय में आपका स्वागत है।");
    } else {
      const users = JSON.parse(localStorage.getItem("community_users") || "[]");
      const foundUser = users.find((u: any) => u.email === formData.email);
      
      if (foundUser) {
          localStorage.setItem("news_user", JSON.stringify(foundUser));
          setUser(foundUser);
          setMessage("लॉगिन सफल!");
      } else {
          setMessage("अमान्य क्रेडेंशियल या उपयोगकर्ता नहीं मिला!");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("news_user");
    setUser(null);
    setMessage("सफलतापूर्वक लॉग आउट किया गया।");
  };

  if (user) {
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

          <h1 className="text-3xl font-black text-gray-900 mt-6 mb-1">{user.name}</h1>
          <p className="text-red-600 font-black text-xs uppercase tracking-widest mb-4">समुदाय सदस्य</p>
          <p className="text-gray-500 font-bold max-w-sm mb-8 leading-relaxed">
             {user.bio}
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
               <p className="font-black text-gray-800">{new Date(user.joinedAt).toLocaleDateString('hi-IN')}</p>
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

              <button onClick={logout} className="w-full flex items-center justify-between p-5 hover:bg-red-50 rounded-3xl transition-all group">
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

        {message && (
          <div className={`p-4 rounded-2xl mb-8 text-center font-bold text-sm ${message.includes('सफल') ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            {message}
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

          <button className="w-full py-6 bg-red-600 hover:bg-red-700 text-white rounded-3xl font-black text-xl shadow-2xl shadow-red-200 transition-all transform active:scale-95 group relative overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-3">
               {isLogin ? "लॉगिन करें" : "पंजीकरण करें"}
               <ChevronRight className="size-6 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </form>

        <div className="text-center mt-12 pb-4">
          <button 
            onClick={() => { setIsLogin(!isLogin); setMessage(""); }}
            className="text-gray-500 font-black hover:text-red-600 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            {isLogin ? "नया अकाउंट बनाएं? पंजीकरण करें" : "पहले से अकाउंट है? लॉगिन करें"}
          </button>
        </div>
      </div>
    </div>
  );
}

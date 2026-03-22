import { useState, useEffect } from "react";
import { User, Mail, Lock, LogIn, UserPlus, ShieldCheck, Heart } from "lucide-react";
import { Link } from "react-router";

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
      
      const newUser = { name: formData.name, email: formData.email, role: 'community_member', joinedAt: new Date().toISOString() };
      
      // Store in users list for admin visibility (mocking backend)
      const users = JSON.parse(localStorage.getItem("community_users") || "[]");
      users.push(newUser);
      localStorage.setItem("community_users", JSON.stringify(users));
      
      localStorage.setItem("news_user", JSON.stringify(newUser));
      setUser(newUser);
      setMessage("पंजीकरण सफल! समुदाय में आपका स्वागत है।");
    } else {
      // Mock login check
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
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mt-10">
          <div className="flex flex-col items-center">
            <div className="size-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <User className="size-12 text-red-600" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">{user.name}</h1>
            <p className="text-gray-500 font-bold mb-8">{user.email}</p>
            
            <div className="grid grid-cols-2 gap-4 w-full mb-10">
              <div className="bg-gray-50 p-6 rounded-2xl text-center">
                 <ShieldCheck className="size-6 text-green-600 mx-auto mb-2" />
                 <span className="block text-xs font-black text-gray-400">सदस्यता</span>
                 <span className="font-bold text-gray-800">समुदाय सदस्य</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl text-center">
                 <Heart className="size-6 text-red-600 mx-auto mb-2" />
                 <span className="block text-xs font-black text-gray-400">जुड़ने की तिथि</span>
                 <span className="font-bold text-gray-800">{new Date(user.joinedAt).toLocaleDateString('hi-IN')}</span>
              </div>
            </div>

            <button onClick={logout} className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-black hover:bg-gray-200 transition-all">लॉग आउट करें</button>
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
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                required
                type="text"
                placeholder="आपका नाम"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl pl-12 py-4 font-bold outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              required
              type="email"
              placeholder="ईमेल एड्रेस"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl pl-12 py-4 font-bold outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              required
              type="password"
              placeholder="पासवर्ड"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl pl-12 py-4 font-bold outline-none transition-all"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                required
                type="password"
                placeholder="पासवर्ड कन्फर्म करें"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl pl-12 py-4 font-bold outline-none transition-all"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          )}

          <button className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-200 transition-all transform active:scale-95">
            {isLogin ? "लॉगिन करें" : "पंजीकरण करें"}
          </button>
        </form>

        <div className="text-center mt-10">
          <button 
            onClick={() => { setIsLogin(!isLogin); setMessage(""); }}
            className="text-gray-500 font-black hover:text-red-600 transition-colors"
          >
            {isLogin ? "नया अकाउंट बनाएं? पंजीकरण करें" : "पहले से अकाउंट है? लॉगिन करें"}
          </button>
        </div>
      </div>
    </div>
  );
}

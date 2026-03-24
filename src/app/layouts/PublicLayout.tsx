import { Link, Outlet, useLocation } from "react-router";
import { Tv, Search, Menu, X, Home, PlaySquare, Bell, User, History, ChevronRight, Film, Upload, Compass } from "lucide-react";
import { categories } from "../data/mockData";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export function PublicLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* 💻 DESKTOP HEADER */}
      <header className={`hidden md:block bg-white shadow-sm sticky top-0 z-50 transition-all ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-red-600 text-white px-5 py-2 rounded-lg font-black text-2xl tracking-tighter">
              लखारा <span className="text-yellow-400 font-bold">न्यूज़</span>
            </div>
          </Link>

          <nav className="flex items-center gap-8 ml-10 overflow-x-auto no-scrollbar">
            <Link to="/" className={`font-bold hover:text-red-600 transition-colors ${location.pathname === "/" ? "text-red-600" : "text-gray-700"}`}>होम</Link>
            {categories.slice(0, 6).map((cat) => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className={`whitespace-nowrap font-bold hover:text-red-600 transition-colors ${location.pathname.includes(cat.slug) ? "text-red-600" : "text-gray-700"}`}>
                {cat.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 ml-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="खबरें खोजें..."
                className="bg-gray-100 border-none rounded-full px-5 py-2 w-48 focus:ring-2 focus:ring-red-500 transition-all outline-none text-sm"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
            </div>
            <Link to="/reels" className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold transition-all ${location.pathname === '/reels' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              <Film className="size-4" />
              <span>Reels</span>
            </Link>
            <Link to="/explore" className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold transition-all ${location.pathname === '/explore' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              <Compass className="size-4" />
              <span>Explore</span>
            </Link>
            <Link to="/live" className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-full font-bold hover:bg-red-700 transition-all shadow-md shadow-red-200">
              <Tv className="size-4" />
              <span>Live</span>
            </Link>
            <Link to="/notifications" className={`relative p-2 rounded-full transition-all ${location.pathname === '/notifications' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              <Bell className="size-5" />
            </Link>
            <Link 
              to="/profile" 
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${
                isScrolled ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              <User className="size-4" />
              <span>{user ? (user.displayName?.split(' ')[0] || "Profile") : "Login"}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 📱 MOBILE TOP HEADER */}
      <header className={`md:hidden sticky top-0 z-50 bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 transition-all ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="flex items-center gap-2">
           <div className="bg-red-600 text-white px-3 py-1.5 rounded-md font-black text-lg tracking-tighter">
              L <span className="text-yellow-400">N</span>
           </div>
           <span className="font-black text-xl text-gray-900 tracking-tight">लखारा न्यूज़</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <Search className="size-5 text-gray-700" />
          </button>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <Bell className="size-5 text-gray-700" />
          </button>
        </div>
      </header>

      {/* 📱 MOBILE CATEGORY BAR */}
      {isHomePage && (
        <div className="md:hidden bg-white border-b border-gray-100 py-1 sticky top-[57px] z-40 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center px-4 gap-4">
            <Link to="/" className={`whitespace-nowrap py-2 text-sm font-bold border-b-2 transition-all ${location.pathname === '/' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-600'}`}>सब खबरें</Link>
            {categories.map((cat) => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className={`whitespace-nowrap py-2 text-sm font-bold border-b-2 transition-all ${location.pathname.includes(cat.slug) ? 'border-red-600 text-red-600' : 'border-transparent text-gray-600'}`}>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 py-0 md:py-8 md:px-6">
            <div className="flex-grow w-full">
              <Outlet />
            </div>

            {/* 💻 DESKTOP SIDEBAR */}
            <aside className="hidden lg:block w-80 space-y-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-black text-xl mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
                  ट्रेंडिंग टॉपिक्स
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <Link key={cat.id} to={`/category/${cat.slug}`} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-xs font-bold hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100">
                      #{cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="sticky top-24">
                 <div className="bg-gradient-to-br from-red-600 to-red-700 p-8 rounded-2xl text-white shadow-xl shadow-red-100 overflow-hidden relative group">
                    <div className="relative z-10">
                      <h4 className="font-black text-2xl mb-2">लाइव टीवी देखें</h4>
                      <p className="text-red-100 text-sm mb-6 leading-relaxed">देश-दुनिया की खबरें देखें पल-पल, बिना रुके।</p>
                      <Link to="/live" className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all group/btn">
                         <PlaySquare className="size-5 group-hover/btn:scale-110 transition-transform" />
                         अभी जुड़ें
                      </Link>
                    </div>
                    <div className="absolute -right-10 -bottom-10 size-40 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform"></div>
                 </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white mt-12 pb-24 md:pb-12">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
               <div className="bg-red-600 text-white inline-block px-4 py-2 rounded-lg font-black text-xl tracking-tighter">
                  लखारा न्यूज़
               </div>
               <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  भारत का सबसे तेज़ी से बढ़ता डिजिटल न्यूज़ नेटवर्क। हम लाते हैं आप तक सच्ची और सटीक खबरें सबसे पहले।
               </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-6 text-white/50 uppercase text-xs tracking-widest">त्वरित लिंक</h4>
                <ul className="space-y-3 text-gray-400 font-medium">
                  <li><Link to="/" className="hover:text-red-500 transition-colors">होम</Link></li>
                  <li><Link to="/live" className="hover:text-red-500 transition-colors">लाइव टीवी</Link></li>
                  <li><a href="#" className="hover:text-red-500 transition-colors">हमारे बारे में</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-6 text-white/50 uppercase text-xs tracking-widest">श्रेणियां</h4>
                <ul className="space-y-3 text-gray-400 font-medium">
                  {categories.slice(0, 3).map(cat => (
                    <li key={cat.id}><Link to={`/category/${cat.slug}`} className="hover:text-red-500 transition-colors">{cat.name}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-lg text-white/50 uppercase text-xs tracking-widest">जुड़े रहें</h4>
              <div className="flex gap-4">
                 <div className="size-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-red-600 transition-all cursor-pointer">F</div>
                 <div className="size-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-red-600 transition-all cursor-pointer">X</div>
                 <div className="size-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-red-600 transition-all cursor-pointer">I</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-500">
            © 2026 लखारा डिजिटल न्यूज़ नेटवर्क। सर्वाधिकार सुरक्षित।
          </div>
        </div>
      </footer>

      {/* 📱 MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-2 pt-2 pb-safe z-[60] flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`flex flex-col items-center py-2 px-2 transition-all ${location.pathname === '/' ? 'text-red-600' : 'text-gray-400'}`}>
          <Home className="size-6" />
          <span className="text-[9px] font-black mt-0.5">होम</span>
        </Link>
        <Link to="/reels" onClick={() => setIsMobileMenuOpen(false)} className={`flex flex-col items-center py-2 px-2 transition-all ${location.pathname === '/reels' ? 'text-red-600' : 'text-gray-400'}`}>
          <Film className="size-6" />
          <span className="text-[9px] font-black mt-0.5">Reels</span>
        </Link>
        <Link to="/upload" onClick={() => setIsMobileMenuOpen(false)} className={`flex flex-col items-center py-1 px-2 transition-all`}>
          <div className={`size-12 rounded-2xl flex items-center justify-center shadow-lg transition-all ${location.pathname === '/upload' ? 'bg-red-700 scale-95' : 'bg-red-600 hover:bg-red-700'}`}>
            <Upload className="size-6 text-white" />
          </div>
        </Link>
        <Link to="/notifications" onClick={() => setIsMobileMenuOpen(false)} className={`flex flex-col items-center py-2 px-2 transition-all ${location.pathname === '/notifications' ? 'text-red-600' : 'text-gray-400'}`}>
          <Bell className="size-6" />
          <span className="text-[9px] font-black mt-0.5">Notif</span>
        </Link>
        <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className={`flex flex-col items-center py-2 px-2 transition-all ${location.pathname === '/profile' ? 'text-red-600' : 'text-gray-400'}`}>
          <User className="size-6" />
          <span className="text-[9px] font-black mt-0.5">Profile</span>
        </Link>
      </nav>

      {/* 📱 MOBILE MENU PANEL */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
           <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] p-8 pb-12 max-h-[85vh] overflow-y-auto shadow-2xl">
              <div className="w-16 h-1.5 bg-gray-200 rounded-full mx-auto mb-8"></div>
              
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-3xl font-black text-gray-900">मेनू</h2>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors">
                    <X className="size-6 text-gray-900" />
                 </button>
              </div>

              <div className="mb-10">
                 <div className="relative">
                    <input autoFocus type="text" placeholder="खबरें खोजें..." className="w-full bg-gray-100 border-none rounded-2xl px-12 py-5 text-lg font-bold focus:ring-4 focus:ring-red-500/10 transition-all outline-none" />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-6 text-gray-400" />
                 </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-gray-400 uppercase text-xs font-black tracking-widest px-2">सभी श्रेणियां</h3>
                <div className="grid grid-cols-1 gap-3">
                   {categories.map(cat => (
                     <Link key={cat.id} to={`/category/${cat.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-red-50 hover:scale-[1.02] transition-all group">
                        <div className="flex items-center gap-4">
                           <div className="size-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                           <span className="text-xl font-bold text-gray-800">{cat.name}</span>
                        </div>
                        <ChevronRight className="size-5 text-gray-300 group-hover:text-red-500 transition-colors" />
                     </Link>
                   ))}
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-gray-100 flex gap-4">
                 <button className="flex-1 py-5 bg-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 transition-colors">डार्क मोड</button>
                 <button className="flex-1 py-5 bg-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <History className="size-5" /> इतिहास
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

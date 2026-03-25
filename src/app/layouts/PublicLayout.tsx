import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Tv, Search, Menu, X, Home, PlaySquare, Bell, User, History, ChevronRight, Film, Upload, Compass, Moon, Sun } from "lucide-react";
import { categories } from "../data/mockData";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { motion, AnimatePresence, useScroll } from "framer-motion";

export function PublicLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/explore", icon: Compass, label: "Explore" },
    { path: "/reels", icon: Film, label: "Reels" },
    { path: "/live", icon: Tv, label: "Live TV" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    toast.success(`${theme === 'dark' ? 'Light' : 'Dark'} Mode Protocol Activated`);
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        toast.success("Intelligence Alerts Activated");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 flex flex-col font-sans selection:bg-primary/20 transition-colors duration-500">
      
      {/* ── Progress Bar ── */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-lakhara z-[200] origin-left shadow-lakhara"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* ── Unique Floating Header ── */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className={`glass dark:bg-gray-900/80 rounded-[2rem] px-4 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-2xl transition-all ${isScrolled ? 'shadow-primary/5 border-primary/10' : 'border-transparent'}`}>
            
            <Link to="/" className="flex items-center gap-2 group transition-transform active:scale-95">
              <div className="size-10 md:size-12 bg-brand-lakhara rounded-2xl flex items-center justify-center shadow-lakhara rotate-[-5deg] group-hover:rotate-0 transition-all duration-500">
                <span className="text-white font-black text-xl italic leading-none">L</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-black text-xl italic tracking-tighter text-gray-900 dark:text-white leading-none block">LAKHARA</span>
                <span className="text-gradient font-black text-[10px] uppercase tracking-[0.4em] leading-none">News Network</span>
              </div>
            </Link>

            {/* Desktop Center Nav */}
            <nav className="hidden lg:flex items-center gap-1 bg-gray-100/50 dark:bg-white/5 p-1.5 rounded-2xl">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path} className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all ${active ? 'bg-white dark:bg-brand-lakhara text-primary dark:text-white shadow-sm' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                    <Icon className={`size-4 ${active ? 'animate-pulse' : ''}`} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 bg-gray-100/50 dark:bg-white/5 px-4 py-2.5 rounded-2xl border border-transparent focus-within:border-primary/20 focus-within:bg-white dark:focus-within:bg-gray-800 transition-all group">
                <Search className="size-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search network..." 
                  className="bg-transparent border-none outline-none text-sm font-bold text-gray-900 dark:text-white w-32 focus:w-48 transition-all placeholder:text-gray-500" 
                />
              </form>

              {mounted && (
                <button 
                  onClick={toggleTheme}
                  className="size-11 flex items-center justify-center bg-gray-100 dark:bg-white/5 rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
                >
                  {theme === 'dark' ? <Sun className="size-5 text-yellow-400" /> : <Moon className="size-5 text-gray-600" />}
                </button>
              )}

              <Link to="/upload" className="hidden md:flex btn-lakhara !px-5 !py-2.5 !text-[10px] !rounded-xl items-center gap-2">
                <Upload className="size-3.5" />
                Post
              </Link>
              
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-3 bg-gray-100 dark:bg-white/5 rounded-2xl hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                <Menu className="size-6 text-gray-900 dark:text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <main className="flex-grow pt-32 pb-32 md:pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Dynamic Bottom App Nav (PWA Style) ── */}
      <nav className="fixed md:hidden bottom-4 left-4 right-4 z-[100]">
        <div className="glass dark:bg-gray-950/90 rounded-[2.5rem] p-2 flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/40 dark:border-white/5">
           {/* Item 1 & 2 */}
           <Link to="/" className={`flex flex-col items-center py-3 px-4 transition-all ${location.pathname === '/' ? 'text-primary scale-110' : 'text-gray-400'}`}>
             <Home className="size-6" />
           </Link>
           <Link to="/explore" className={`flex flex-col items-center py-3 px-4 transition-all ${location.pathname === '/explore' ? 'text-primary scale-110' : 'text-gray-400'}`}>
             <Compass className="size-6" />
           </Link>

           {/* Central Action Item */}
           <Link to="/upload" className="relative -top-8 transition-transform active:scale-90">
             <div className="size-16 bg-brand-lakhara rounded-[1.8rem] flex items-center justify-center shadow-[0_15px_30px_rgba(255,49,49,0.4)] rotate-45 border-2 border-white/20">
               <Upload className="size-7 text-white -rotate-45" />
             </div>
           </Link>

           {/* Item 3 & 5 (Reels & Profile) */}
           <Link to="/reels" className={`flex flex-col items-center py-3 px-4 transition-all ${location.pathname === '/reels' ? 'text-primary scale-110' : 'text-gray-400'}`}>
             <Film className="size-6" />
           </Link>
           <Link to="/profile" className={`flex flex-col items-center py-3 px-4 transition-all ${location.pathname === '/profile' ? 'text-primary scale-110' : 'text-gray-400'}`}>
             <User className="size-6" />
           </Link>
        </div>
      </nav>

      {/* ── News Footer ── */}
      <footer className="hidden md:block bg-gray-950 text-white border-t-8 border-primary">
         <div className="container mx-auto px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
               <div className="col-span-2 space-y-10">
                  <div className="flex items-center gap-3">
                    <div className="size-16 bg-brand-lakhara rounded-3xl flex items-center justify-center shadow-lakhara rotate-[-10deg]">
                      <span className="text-white font-black text-3xl italic">L</span>
                    </div>
                    <div>
                       <span className="font-black text-3xl italic tracking-tighter block">LAKHARA NEWS</span>
                       <span className="text-gradient font-black text-xs uppercase tracking-[0.4em]">Digital News Network</span>
                    </div>
                  </div>
                  <p className="text-gray-500 font-medium leading-[2.2] text-lg max-w-xl italic">
                    Pushing the boundaries of digital journalism. Lakhara News delivers independent, data-driven, and hyper-local updates with a global perspective.
                  </p>
                  <div className="flex gap-4">
                     {['Fb', 'Tw', 'Ig', 'Yt', 'Wa'].map(s => (
                       <button key={s} className="size-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-lakhara hover:scale-110 active:scale-95 transition-all font-black text-[10px] uppercase">{s}</button>
                     ))}
                  </div>
               </div>

               <div>
                 <h4 className="text-gradient font-black uppercase tracking-[0.3em] text-xs mb-10">Broadcast</h4>
                 <ul className="space-y-6 text-gray-500 font-black text-xs uppercase tracking-widest">
                    <li><Link to="/live" className="hover:text-white transition-all hover:translate-x-2 inline-block">Live TV</Link></li>
                    <li><Link to="/reels" className="hover:text-white transition-all hover:translate-x-2 inline-block">Flash Reels</Link></li>
                    <li><Link to="/explore" className="hover:text-white transition-all hover:translate-x-2 inline-block">Global Feed</Link></li>
                 </ul>
               </div>

               <div>
                 <h4 className="text-gradient font-black uppercase tracking-[0.3em] text-xs mb-10">Network</h4>
                 <ul className="space-y-6 text-gray-500 font-black text-xs uppercase tracking-widest">
                    <li><a href="#" className="hover:text-white transition-all hover:translate-x-2 inline-block">About Network</a></li>
                    <li><a href="#" className="hover:text-white transition-all hover:translate-x-2 inline-block">Privacy Protocol</a></li>
                    <li><a href="#" className="hover:text-white transition-all hover:translate-x-2 inline-block">Contact HQ</a></li>
                 </ul>
               </div>
            </div>
            
            <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em]">
                © 2026 Lakhara Network. The future is digital.
              </span>
              <div className="flex gap-10">
                 {['Advert', 'Legal', 'Press'].map(l => (
                    <a key={l} href="#" className="text-[10px] font-black text-gray-600 uppercase tracking-widest hover:text-white transition-colors">{l}</a>
                 ))}
              </div>
            </div>
         </div>
      </footer>

      {/* ── Full-Screen Mobile Menu ── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] animate-in fade-in duration-500">
           <div className="absolute inset-0 bg-gray-950/95 backdrop-blur-2xl" onClick={() => setIsMobileMenuOpen(false)}></div>
           <div className="absolute inset-0 flex flex-col p-8 bg-black/40">
              <div className="flex justify-between items-center mb-16">
                 <div className="flex items-center gap-2">
                    <div className="size-10 bg-brand-lakhara rounded-xl flex items-center justify-center shadow-lakhara">
                      <span className="text-white font-black text-xl italic">L</span>
                    </div>
                    <span className="font-black text-2xl text-white tracking-tighter">LAKHARA</span>
                 </div>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="size-14 bg-white/10 rounded-3xl flex items-center justify-center text-white active:scale-90 transition-all border border-white/10">
                    <X className="size-8" />
                 </button>
              </div>

              <div className="space-y-10 overflow-y-auto no-scrollbar pb-24">
                 <div className="space-y-6">
                   <h3 className="text-gradient font-black uppercase tracking-[0.3em] text-[10px]">Operations</h3>
                   <div className="grid grid-cols-1 gap-4">
                      <button 
                        onClick={requestNotificationPermission}
                        className="flex items-center justify-between p-6 bg-white/5 rounded-3xl text-white font-bold group active:bg-primary transition-all"
                      >
                         <div className="flex items-center gap-4">
                            <Bell className="size-5 text-primary group-active:text-white" />
                            Enable Intelligence Alerts
                         </div>
                         <ChevronRight className="size-4 opacity-50" />
                      </button>
                      <button 
                        onClick={toggleTheme}
                        className="flex items-center justify-between p-6 bg-white/5 rounded-3xl text-white font-bold group active:bg-primary transition-all"
                      >
                         <div className="flex items-center gap-4">
                            {theme === 'dark' ? <Sun className="size-5 text-yellow-400" /> : <Moon className="size-5 text-gray-400" />}
                            {theme === 'dark' ? 'Light Mode Protocol' : 'Dark Mode Protocol'}
                         </div>
                         <div className={`w-12 h-6 rounded-full p-1 transition-all ${theme === 'dark' ? 'bg-primary' : 'bg-gray-700'}`}>
                            <div className={`size-4 bg-white rounded-full transition-all ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}></div>
                         </div>
                      </button>
                   </div>
                 </div>

                 <h3 className="text-gradient font-black uppercase tracking-[0.3em] text-[10px]">Information Channels</h3>
                 <div className="grid grid-cols-2 gap-4">
                    {categories.map(cat => (
                      <Link key={cat.id} to={`/category/${cat.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="p-6 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col gap-4 items-center group active:bg-brand-lakhara transition-all">
                         <div className="size-3 rounded-full shadow-lg" style={{ backgroundColor: cat.color }}></div>
                         <span className="font-black text-sm text-white uppercase tracking-widest">{cat.name}</span>
                      </Link>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}


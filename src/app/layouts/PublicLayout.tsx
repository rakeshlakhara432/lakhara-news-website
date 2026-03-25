import { Link, Outlet, useLocation } from "react-router";
import { Tv, Search, Menu, X, Home, PlaySquare, Bell, User, History, ChevronRight, Film, Upload, Compass } from "lucide-react";
import { categories } from "../data/mockData";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export function PublicLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans selection:bg-primary/20">
      
      {/* ── Unique Floating Header (Desktop & Mobile) ── */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className={`glass rounded-[2rem] px-4 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-2xl transition-all ${isScrolled ? 'shadow-primary/5 border-primary/10' : 'border-transparent'}`}>
            
            <Link to="/" className="flex items-center gap-2 group transition-transform active:scale-95">
              <div className="size-10 md:size-12 bg-lakhara rounded-2xl flex items-center justify-center shadow-lakhara rotate-[-5deg] group-hover:rotate-0 transition-all duration-500">
                <span className="text-white font-black text-xl italic leading-none">L</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-black text-xl italic tracking-tighter text-gray-900 leading-none block">LAKHARA</span>
                <span className="text-gradient font-black text-[10px] uppercase tracking-[0.4em] leading-none">News Network</span>
              </div>
            </Link>

            {/* Desktop Center Nav */}
            <nav className="hidden lg:flex items-center gap-1 bg-gray-100/50 p-1.5 rounded-2xl">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path} className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all ${active ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-900'}`}>
                    <Icon className={`size-4 ${active ? 'animate-pulse' : ''}`} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-gray-100/50 px-4 py-2.5 rounded-2xl border border-transparent focus-within:border-primary/20 focus-within:bg-white transition-all group">
                <Search className="size-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input type="text" placeholder="Search news..." className="bg-transparent border-none outline-none text-sm font-bold text-gray-900 w-32 focus:w-48 transition-all" />
              </div>

              <Link to="/upload" className="hidden md:flex btn-lakhara !px-5 !py-2.5 !text-[10px] !rounded-xl items-center gap-2">
                <Upload className="size-3.5" />
                Post
              </Link>
              
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
              >
                <Menu className="size-6 text-gray-900" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <main className="flex-grow pt-32 pb-32 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <Outlet />
        </div>
      </main>

      {/* ── Dynamic Bottom App Nav (PWA Style) ── */}
      <nav className="fixed md:hidden bottom-4 left-4 right-4 z-[100]">
        <div className="glass rounded-[2.5rem] p-2 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/40">
           {navItems.slice(0, 2).map(item => {
             const Icon = item.icon;
             const active = location.pathname === item.path;
             return (
               <Link key={item.path} to={item.path} className={`flex flex-col items-center py-3 px-5 transition-all ${active ? 'text-primary' : 'text-gray-400'}`}>
                 <Icon className={`size-6 ${active ? 'fill-primary/10' : ''}`} />
               </Link>
             );
           })}

           <Link to="/upload" className="relative -top-8 transition-transform active:scale-90">
             <div className="size-20 bg-lakhara rounded-[2rem] flex items-center justify-center shadow-[0_15px_30px_rgba(255,49,49,0.4)] rotate-45">
               <Upload className="size-8 text-white -rotate-45" />
             </div>
           </Link>

           {navItems.slice(3, 5).map(item => {
             const Icon = item.icon;
             const active = location.pathname === item.path;
             return (
               <Link key={item.path} to={item.path} className={`flex flex-col items-center py-3 px-5 transition-all ${active ? 'text-primary' : 'text-gray-400'}`}>
                 <Icon className={`size-6 ${active ? 'fill-primary/10' : ''}`} />
               </Link>
             );
           })}
        </div>
      </nav>

      {/* ── Unique News Footer ── */}
      <footer className="hidden md:block bg-gray-950 text-white border-t-8 border-primary">
         <div className="container mx-auto px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
               <div className="col-span-2 space-y-10">
                  <div className="flex items-center gap-3">
                    <div className="size-16 bg-lakhara rounded-3xl flex items-center justify-center shadow-lakhara rotate-[-10deg]">
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
                       <button key={s} className="size-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-lakhara hover:scale-110 active:scale-95 transition-all font-black text-[10px] uppercase">{s}</button>
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

      {/* ── Unique Full-Screen Mobile Menu ── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] animate-in fade-in duration-500">
           <div className="absolute inset-0 bg-gray-950/95 backdrop-blur-2xl" onClick={() => setIsMobileMenuOpen(false)}></div>
           <div className="absolute inset-0 flex flex-col p-8 bg-black/40">
              <div className="flex justify-between items-center mb-16">
                 <div className="flex items-center gap-2">
                    <div className="size-10 bg-lakhara rounded-xl flex items-center justify-center shadow-lakhara">
                      <span className="text-white font-black text-xl italic">L</span>
                    </div>
                    <span className="font-black text-2xl text-white tracking-tighter">LAKHARA</span>
                 </div>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="size-14 bg-white/10 rounded-3xl flex items-center justify-center text-white active:scale-90 transition-all border border-white/10">
                    <X className="size-8" />
                 </button>
              </div>

              <div className="space-y-8 overflow-y-auto no-scrollbar pb-20">
                 <h3 className="text-gradient font-black uppercase tracking-[0.3em] text-[10px]">Categories</h3>
                 <div className="grid grid-cols-2 gap-4">
                    {categories.map(cat => (
                      <Link key={cat.id} to={`/category/${cat.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="p-6 bg-white/5 border border-white/5 rounded-[2rem] flex flex-col gap-4 items-center group active:bg-lakhara transition-all">
                         <div className="size-3 rounded-full shadow-lg" style={{ backgroundColor: cat.color }}></div>
                         <span className="font-black text-sm text-white uppercase tracking-widest">{cat.name}</span>
                      </Link>
                    ))}
                 </div>
                 
                 <div className="grid grid-cols-1 gap-4 pt-10 border-t border-white/5">
                    <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl text-white font-bold">
                       App Settings <ChevronRight className="size-5 text-gray-500" />
                    </Link>
                    <button className="flex items-center justify-between p-6 bg-white/5 rounded-3xl text-white font-bold">
                       Dark Mode Protocol <div className="w-12 h-6 bg-primary rounded-full"></div>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

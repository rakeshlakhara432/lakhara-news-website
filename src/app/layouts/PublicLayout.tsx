import { Link, Outlet, useLocation } from "react-router";
import { Search, Home, Bell, User, History, ChevronRight, Film, PlusCircle, Compass, Globe, Info, Menu, X, ArrowRight, Flag, Radio, MessageCircle, Heart, Users, Calendar, Image, Phone, BookOpen, ShieldCheck, GraduationCap, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export function PublicLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "होम", slug: "", icon: Home },
    { label: "हमारे बारे में", slug: "about", icon: Info },
    { label: "कार्यकारिणी", slug: "committee", icon: Users },
    { label: "सदस्य सूची", slug: "directory", icon: Search },
    { label: "विवाह मंच", slug: "matrimonial", icon: Heart },
    { label: "कार्यक्रम", slug: "events", icon: Calendar },
    { label: "गैलरी", slug: "gallery", icon: Image },
    { label: "समाचार", slug: "news", icon: Radio },
    { label: "शिक्षा/सहायता", slug: "support", icon: GraduationCap },
    { label: "संपर्क", slug: "contact", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDFB] flex flex-col font-main selection:bg-primary/20 transition-all duration-500">
      
      {/* 🔴 WHATSAPP FLOATING BUTTON */}
      <a 
        href="https://wa.me/91XXXXXXXXXX" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-[200] size-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group border-4 border-white"
      >
        <MessageCircle className="size-8" />
        <span className="absolute right-full mr-4 bg-white text-gray-900 px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity border border-gray-100 whitespace-nowrap">Help Desk</span>
      </a>

      {/* 🚩 TRADITIONAL SAMAJ BANNER */}
      <div className="bg-primary py-2 text-white/90 text-[10px] font-black uppercase tracking-[0.5em] text-center shadow-lg relative z-[201] overflow-hidden">
        <div className="absolute inset-0 bg-black/5 mix-blend-overlay mandala-bg"></div>
        ॥ संघे शक्तिः कलौ युगे ॥ &bull; एक समाज &bull; एक शक्ति
      </div>

      {/* 🕌 SAMAJ PORTAL HEADER */}
      <header className={`sticky top-0 z-[200] transition-all duration-700 ${isScrolled ? 'py-1.5 bg-white/95 backdrop-blur-md border-b-[4px] border-primary shadow-bhagva' : 'py-3 bg-white border-b border-gray-100'}`}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="size-9 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center text-white shadow-md rotate-[-12deg] group-hover:rotate-0 transition-transform duration-700">
                <Flag className="size-4 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tighter text-gray-950 group-hover:text-primary transition-colors leading-[0.8] mb-1">
                  LAKHARA <span className="text-secondary text-sm">SAMAJ</span>
                </span>
                <span className="text-[9px] font-black text-primary tracking-[0.2em] uppercase italic opacity-70">
                   लखारा समाज पोर्टल
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5 w-full justify-center max-w-5xl bg-gray-50/50 rounded-full p-1 border border-gray-100/50 overflow-hidden shadow-sm backdrop-blur-sm">
              {navLinks.map(link => (
                <Link 
                   key={link.slug} 
                   to={link.slug === "" ? "/" : `/${link.slug}`} 
                   className={`px-3 py-1.5 rounded-full font-black text-[9.5px] uppercase tracking-tighter transition-all relative ${location.pathname === (link.slug === "" ? "/" : `/${link.slug}`) ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105' : 'text-gray-500 hover:text-primary hover:bg-white'}`}
                >
                   {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
               <Link to="/register" className="hidden md:flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-lg font-black text-[8.5px] uppercase tracking-widest shadow-lg shadow-primary/10 active:scale-95 transition-all border border-white/20">
                  पंजीकरण
               </Link>
               <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden size-9 bg-gray-50 rounded-lg flex items-center justify-center text-primary active:scale-95 transition-all border border-gray-100 shadow-sm">
                  <Menu className="size-4" />
               </button>
               <Link to="/profile" className="hidden sm:flex size-9 bg-gray-100 rounded-xl items-center justify-center text-gray-500 hover:bg-primary/5 hover:text-primary transition-all border-2 border-transparent hover:border-primary/20 overflow-hidden group">
                  {user ? (
                    <div className="size-full flex items-center justify-center font-black text-xs bg-gradient-to-tr from-primary/10 to-primary/20 group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all">
                      {user.displayName?.[0]}
                    </div>
                  ) : <User className="size-4" />}
               </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 🎥 MAIN CONTENT */}
      <main className="flex-grow container mx-auto px-6 max-w-7xl relative overflow-hidden py-4">
        <div className="absolute inset-x-0 top-0 h-full mandala-bg z-[-1] opacity-[0.03]"></div>
        <Outlet />
      </main>

      {/* 🟧 SAMAJ FOOTER */}
      <footer className="bg-gray-950 text-white pt-16 pb-40 md:pb-16 px-6 relative overflow-hidden border-t-2 border-primary">
        <div className="absolute inset-0 opacity-5 mandala-bg"></div>
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2 space-y-8">
               <Link to="/" className="flex items-center gap-3 shrink-0 group">
                 <div className="size-11 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center text-white shadow-2xl rotate-[-12deg] group-hover:rotate-0 transition-transform duration-700">
                   <Flag className="size-6 fill-current" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-xl font-black tracking-tighter text-white group-hover:text-primary transition-colors leading-[0.8] mb-1 uppercase">
                     LAKHARA <span className="text-secondary text-sm">SAMAJ</span>
                   </span>
                   <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase italic">
                      एक समाज, एक शक्ति
                   </span>
                 </div>
               </Link>
               <p className="text-gray-400 font-bold italic text-[12px] leading-relaxed max-w-md border-l-2 border-primary pl-5">
                  लखारा समाज की एकता, संस्कृति और विकास के लिए समर्पित। हम समाज के हर सदस्य को डिजिटल मंच से जोड़ने और उनके सर्वांगीण विकास के लिए प्रयासरत हैं।
               </p>
               <div className="flex gap-3">
                  {['WA', 'FB', 'YT'].map(social => (
                    <div key={social} className="size-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:scale-110 active:scale-90 transition-all cursor-pointer border border-white/5 font-black text-[8px]">
                      {social}
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="space-y-6">
               <div className="flex items-center gap-2.5 text-primary">
                  <div className="size-1 bg-primary rounded-full"></div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em]">मुख्य लिंक्स</h4>
               </div>
               <ul className="space-y-2">
                  {navLinks.slice(1, 6).map(link => (
                    <li key={link.slug}><Link to={`/${link.slug}`} className="text-[12px] font-bold text-gray-400 hover:text-primary transition-colors italic">{link.label}</Link></li>
                  ))}
               </ul>
            </div>

             <div className="space-y-6">
                <div className="flex items-center gap-2.5 text-primary">
                   <div className="size-1 bg-primary rounded-full"></div>
                   <h4 className="text-[9px] font-black uppercase tracking-[0.2em]">संपर्क एवं जानकारी</h4>
                </div>
                <ul className="space-y-3 text-[11px] font-bold text-gray-400 italic">
                   <li className="flex items-center gap-3"><Phone className="size-3 text-primary" /> +91 9636691724</li>
                   <li className="flex items-center gap-3"><Mail className="size-3 text-primary" /> rakeshlakhara432@gmail.com</li>
                   <li className="flex items-center gap-3"><MapPin className="size-3 text-primary" /> पाली, राजस्थान</li>
                   <li><Link to="/contact" className="hover:text-primary underline decoration-primary/20">विस्तृत संपर्क</Link></li>
                </ul>
             </div>
          </div>
          <div className="mt-16 pt-10 border-t border-white/5 text-center">
             <div className="text-primary font-black text-lg italic tracking-tighter mb-2">॥ संघे शक्तिः कलौ युगे ॥</div>
             <p className="text-[8px] font-black text-gray-600 uppercase tracking-[0.5em]">
               &copy; 2026 लखारा समाज डिजिटल नेटवर्क &bull; सर्वाधिकार सुरक्षित
             </p>
          </div>
        </div>
      </footer>

      {/* 📱 SAMAJ BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t-[3px] border-primary z-[300] px-5 py-3 flex justify-between items-center pb-safe shadow-[0_-20px_40px_-15px_rgba(255,119,34,0.1)]">
        <Link to="/" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/' ? 'text-primary scale-110' : 'text-gray-400'}`}>
           <Home className={`size-6 ${location.pathname === '/' ? 'fill-current' : ''}`} />
           <span className="text-[8px] font-black uppercase tracking-widest">होम</span>
        </Link>
        <Link to="/about" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/about' ? 'text-primary scale-110' : 'text-gray-400'}`}>
           <Info className="size-6" />
           <span className="text-[8px] font-black uppercase tracking-widest">परिचय</span>
        </Link>
        <Link to="/register" className="flex flex-col items-center -mt-8 relative group">
           <div className="size-16 bg-gradient-to-tr from-primary to-secondary text-white md:rounded-[2rem] rounded-none flex items-center justify-center shadow-bhagva active:scale-90 transition-all transform rotate-[-12deg] group-hover:rotate-0 group-hover:scale-110 border-[3px] border-white">
              <PlusCircle className="size-8" />
           </div>
           <span className="text-[8px] font-black uppercase tracking-widest mt-2 text-primary">जुड़ें</span>
        </Link>
        <Link to="/matrimonial" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/matrimonial' ? 'text-primary scale-110' : 'text-gray-400'}`}>
           <Heart className="size-6" />
           <span className="text-[8px] font-black uppercase tracking-widest">विवाह</span>
        </Link>
        <Link to="/directory" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/directory' ? 'text-primary scale-110' : 'text-gray-400'}`}>
           <Search className="size-6" />
           <span className="text-[8px] font-black uppercase tracking-widest">खोजें</span>
        </Link>
      </nav>

      {/* 📱 MOBILE OVERLAY MENU (SAFFRON) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[400] animate-in fade-in duration-500">
           <div className="absolute inset-0 bg-primary/95 backdrop-blur-3xl" onClick={() => setIsMobileMenuOpen(false)}></div>
           <div className="absolute inset-0 mandala-bg opacity-10"></div>
           
           <div className="absolute top-4 right-4">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="size-14 bg-white/10 text-white rounded-[2rem] flex items-center justify-center active:scale-90 transition-all border border-white/20"
              >
                 <X className="size-8" />
              </button>
           </div>
           
           <div className="relative h-full flex flex-col justify-center px-10 space-y-6">
              <div className="flex items-center gap-3 text-white/50 mb-2">
                 <Flag className="size-5" />
                 <p className="text-[9px] font-black uppercase tracking-[0.4em]">समाज पोर्टल</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {navLinks.map(link => (
                  <Link 
                    key={link.slug} 
                    to={link.slug === "" ? "/" : `/${link.slug}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-black text-white italic tracking-tighter hover:text-secondary hover:translate-x-4 transition-all uppercase leading-none"
                  >
                     {link.label}
                  </Link>
                ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

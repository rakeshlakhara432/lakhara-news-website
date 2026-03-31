import { Link, Outlet, useLocation } from "react-router";
import { Search, Home, Bell, User, History, ChevronRight, Film, PlusCircle, Compass, Globe, Info, Menu, X, ArrowRight, Flag, Radio, MessageCircle, Heart, Users, Calendar, Image, Phone, BookOpen, ShieldCheck, GraduationCap, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { ScrollToTop } from "../components/ScrollToTop";

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
    <div className="min-h-screen bg-[#FFFDFB] flex flex-col font-main selection:bg-primary/20">
      <ScrollToTop />
      
      <a 
        href="https://wa.me/91XXXXXXXXXX" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-[200] size-14 bg-[#25D366] text-white rounded-full flex items-center justify-center border-4 border-white"
      >
        <MessageCircle className="size-8" />
      </a>

      <div className="bg-primary py-2 text-white/90 text-xs font-black uppercase tracking-widest text-center relative z-[201]">
        ॥ संघे शक्तिः कलौ युगे ॥ &bull; एक समाज &bull; एक शक्ति
      </div>

      <header className={`sticky top-0 z-[200] ${isScrolled ? 'py-1.5 bg-white border-b-2 border-primary' : 'py-3 bg-white border-b border-gray-200'}`}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="flex flex-col items-start shrink-0">
               <span className="text-xl md:text-2xl font-black text-primary leading-none tracking-tighter">LAKHARA</span>
               <span className="text-[10px] font-black text-gray-950 tracking-[0.2em] -mt-0.5">DIGITAL NEWS</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 w-full justify-center max-w-5xl bg-gray-50 border border-gray-200 p-1">
              {navLinks.map(link => (
                <Link 
                   key={link.slug} 
                   to={link.slug === "" ? "/" : `/${link.slug}`} 
                   className={`px-4 py-1.5 font-bold text-[10px] uppercase tracking-wider ${location.pathname === (link.slug === "" ? "/" : `/${link.slug}`) ? 'bg-primary text-white' : 'text-gray-700 hover:text-primary hover:bg-gray-100'}`}
                >
                   {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
               <Link to="/register" className="hidden md:block bg-primary text-white px-5 py-2 font-bold text-xs uppercase tracking-widest border border-primary">
                  पंजीकरण
               </Link>
               <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden size-10 bg-gray-100 flex items-center justify-center text-primary border border-gray-200">
                  <Menu className="size-5" />
               </button>
               <Link to="/profile" className="hidden sm:flex size-10 bg-gray-100 items-center justify-center text-gray-700 hover:bg-primary/5 hover:text-primary border border-gray-200">
                  {user ? (
                    <div className="size-full flex items-center justify-center font-bold text-sm bg-primary/10">
                      {user.displayName?.[0]}
                    </div>
                  ) : <User className="size-5" />}
               </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 max-w-7xl py-6">
        <Outlet />
      </main>

      <footer className="bg-gray-950 text-white pt-16 pb-40 md:pb-16 px-6 relative border-t-2 border-primary">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2 space-y-8">
               <Link to="/" className="flex flex-col items-start shrink-0">
                  <span className="text-2xl md:text-3xl font-black text-primary leading-none tracking-tighter">LAKHARA</span>
                  <span className="text-[12px] font-black text-white/50 tracking-[0.2em] -mt-1">DIGITAL NEWS</span>
               </Link>
               <p className="text-gray-400 font-bold text-[13px] leading-relaxed max-w-md border-l-2 border-primary pl-5">
                  लखारा समाज की एकता, संस्कृति और विकास के लिए समर्पित।
               </p>
               <div className="flex gap-3">
                  {['WA', 'FB', 'YT'].map(social => (
                    <div key={social} className="size-8 bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white cursor-pointer font-black text-[9px]">
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
                    <li key={link.slug}><Link to={`/${link.slug}`} className="text-[13px] font-bold text-gray-400 hover:text-primary">{link.label}</Link></li>
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
             <div className="text-primary font-black text-xl tracking-tighter mb-2">॥ संघे शक्तिः कलौ युगे ॥</div>
             <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
               &copy; 2026 लखारा समाज डिजिटल नेटवर्क &bull; सर्वाधिकार सुरक्षित
             </p>
          </div>
        </div>
      </footer>

      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-[300] px-6 py-3 flex justify-between items-center pb-safe-offset-2 shadow-none">
        <Link to="/" className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-primary' : 'text-gray-500'}`}>
           <Home className="size-5" />
           <span className="text-[9px] font-bold uppercase tracking-wider">Home</span>
        </Link>
        <Link to="/news" className={`flex flex-col items-center gap-1 ${location.pathname === '/news' ? 'text-primary' : 'text-gray-500'}`}>
           <Radio className="size-5" />
           <span className="text-[9px] font-bold uppercase tracking-wider">News</span>
        </Link>
        <Link to="/directory" className={`flex flex-col items-center gap-1 ${location.pathname === '/directory' ? 'text-primary' : 'text-gray-500'}`}>
           <Search className="size-5" />
           <span className="text-[9px] font-bold uppercase tracking-wider">Search</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center gap-1 ${location.pathname === '/profile' ? 'text-primary' : 'text-gray-500'}`}>
           <User className="size-5" />
           <span className="text-[9px] font-bold uppercase tracking-wider">Profile</span>
        </Link>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[400] bg-primary">
           <div className="absolute top-4 right-4">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="size-12 bg-white/10 text-white flex items-center justify-center border border-white/20"
              >
                 <X className="size-8" />
              </button>
           </div>
           
           <div className="relative h-full flex flex-col justify-center px-10 space-y-8">
              <div className="grid grid-cols-1 gap-6">
                {navLinks.map(link => (
                  <Link 
                    key={link.slug} 
                    to={link.slug === "" ? "/" : `/${link.slug}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-black text-white tracking-tighter uppercase leading-none"
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

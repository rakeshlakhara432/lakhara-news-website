import { Link, Outlet, useLocation } from "react-router";
import { Search, Home, User, ChevronRight, Menu, X, ArrowRight, Radio, MessageCircle, Heart, Users, Calendar, Image, Phone, GraduationCap, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { ScrollToTop } from "../components/ScrollToTop";
import { MegaMenu } from "../components/navigation/MegaMenu";
import { FloatingSupport } from "../components/ui/FloatingSupport";
import { ExitIntentPopup } from "../components/ui/ExitIntentPopup";
import { Meta } from "../components/seo/Meta";
import { ThirdPartyScripts } from "../components/marketing/ThirdPartyScripts";

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
    { label: "समाचार", slug: "news", icon: Radio },
    { label: "स्टोर", slug: "store", icon: Search },
    { label: "संपर्क", slug: "contact", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDFB] flex flex-col font-main selection:bg-primary/20">
      <Meta />
      <ThirdPartyScripts />
      <ExitIntentPopup />
      <ScrollToTop />
      <FloatingSupport />

      <div className="bg-primary py-2 text-white/90 text-xs font-black uppercase tracking-widest text-center relative z-[201]">
        ॥ संघे शक्तिः कलौ युगे ॥ &bull; एक समाज &bull; एक शक्ति
      </div>

      <header className={`sticky top-0 z-[200] transition-all duration-300 ${isScrolled ? 'py-1.5 bg-white border-b-2 border-primary shadow-sm' : 'py-3 bg-white border-b border-gray-200'}`}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-4 group">
               <div className="size-10 md:size-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 border border-primary/30 shrink-0 group-hover:rotate-12 transition-transform">
                  <span className="text-xl md:text-2xl font-bold text-white">ॐ</span>
               </div>
               <div className="flex flex-col items-start shrink-0">
                  <span className="text-xl md:text-2xl font-black text-primary leading-none tracking-tighter uppercase">LAKHARA</span>
                  <span className="text-[10px] font-black text-gray-950 tracking-[0.2em] -mt-0.5 uppercase">DIGITAL NETWORK</span>
               </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1 w-full justify-center max-w-5xl bg-gray-50/50 border border-gray-100 p-0.5 rounded-sm">
               <MegaMenu />
               <Link 
                  to="/news" 
                  className={`px-4 py-2 font-black text-[10px] uppercase tracking-[0.2em] border border-transparent hover:border-gray-100 ${location.pathname === '/news' ? 'bg-primary text-white' : 'text-gray-900 hover:text-primary hover:bg-white transition-all'}`}
               >
                  ताज़ा न्यूज़
               </Link>
            </div>

            <div className="flex items-center gap-3">
               <Link to="/register" className="hidden md:block bg-primary text-white px-5 py-2 font-black text-xs uppercase tracking-widest border border-primary hover:bg-white hover:text-primary transition-all shadow-lg shadow-primary/10">
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

      <main className="flex-grow container mx-auto px-6 max-w-7xl py-10">
        <Outlet />
      </main>

      <footer className="bg-gray-950 text-white pt-20 pb-40 md:pb-16 px-6 relative border-t-2 border-primary">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2 space-y-8">
               <Link to="/" className="flex flex-col items-start shrink-0">
                  <span className="text-2xl md:text-3xl font-black text-primary leading-none tracking-tighter uppercase">LAKHARA</span>
                  <span className="text-[12px] font-black text-white/50 tracking-[0.2em] -mt-1 uppercase">DIGITAL NETWORK</span>
               </Link>
               <p className="text-gray-400 font-bold text-[13px] leading-relaxed max-w-md border-l-2 border-primary pl-5 italic">
                  लखारा समाज की एकता, संस्कृति और विकास के लिए समर्पित। एक समाज, एक शक्ति।
               </p>
               <div className="flex gap-4">
                  {['WA', 'FB', 'YT', 'IN'].map(social => (
                    <div key={social} className="size-10 bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary cursor-pointer font-black text-[10px] transition-all">
                      {social}
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="space-y-6">
               <div className="flex items-center gap-2.5 text-primary">
                  <div className="size-1 bg-primary"></div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">समाज लिंक्स</h4>
               </div>
               <ul className="space-y-3">
                  {['directory', 'matrimonial', 'events', 'store', 'sitemap'].map(slug => (
                    <li key={slug}><Link to={`/${slug}`} className="text-[13px] font-bold text-gray-400 hover:text-primary capitalize">{slug}</Link></li>
                  ))}
               </ul>
            </div>

             <div className="space-y-6">
                <div className="flex items-center gap-2.5 text-primary">
                   <div className="size-1 bg-primary"></div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">संपर्क विवरण</h4>
                </div>
                <ul className="space-y-4 text-[11px] font-bold text-gray-400">
                   <li className="flex items-center gap-4"><Phone className="size-4 text-primary" /> +91 9636691724</li>
                   <li className="flex items-center gap-4"><Mail className="size-4 text-primary" /> contact@lakhara.com</li>
                   <li className="flex items-center gap-4"><MapPin className="size-4 text-primary" /> पाली, राजस्थान</li>
                </ul>
             </div>
          </div>
          <div className="mt-20 pt-10 border-t border-white/5 text-center">
             <div className="text-primary font-black text-2xl tracking-tighter mb-4 italic">॥ संघे शक्तिः कलौ युगे ॥</div>
             <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
               &copy; 2026 लखारा समाज डिजिटल नेटवर्क &bull; सर्वाधिकार सुरक्षित &bull; BY LAKHARA TECH
             </p>
          </div>
        </div>
      </footer>

      {/* Navigation Mobile Tab Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 z-[300] px-8 py-4 flex justify-between items-center pb-safe-offset-4 shadow-2xl">
        <Link to="/" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/' ? 'text-primary' : 'text-gray-400'}`}>
           <Home className="size-6" />
           <span className="text-[9px] font-black uppercase tracking-wider">Home</span>
        </Link>
        <Link to="/news" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/news' ? 'text-primary' : 'text-gray-400'}`}>
           <Radio className="size-6" />
           <span className="text-[9px] font-black uppercase tracking-wider">News</span>
        </Link>
        <Link to="/store" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/store' ? 'text-primary' : 'text-gray-400'}`}>
           <Search className="size-6" />
           <span className="text-[9px] font-black uppercase tracking-wider">Store</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/profile' ? 'text-primary' : 'text-gray-400'}`}>
           <User className="size-6" />
           <span className="text-[9px] font-black uppercase tracking-wider">Profile</span>
        </Link>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[400] bg-primary">
           <div className="absolute top-6 right-6">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="size-14 bg-white/10 text-white flex items-center justify-center border border-white/20 hover:rotate-90 transition-transform"
              >
                 <X className="size-8" />
              </button>
           </div>
           
           <div className="relative h-full flex flex-col justify-center px-12 space-y-10">
              <div className="space-y-8">
                {['/', '/news', '/directory', '/matrimonial', '/store', '/contact'].map((path) => (
                  <Link 
                    key={path} 
                    to={path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-5xl font-black text-white tracking-tighter uppercase leading-none hover:pl-4 transition-all"
                  >
                     {path === '/' ? 'Home' : path.slice(1)}
                  </Link>
                ))}
              </div>
              <div className="pt-10 border-t border-white/20">
                 <p className="text-xs font-black text-white/50 uppercase tracking-[0.4em]">॥ संघे शक्तिः कलौ युगे ॥</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

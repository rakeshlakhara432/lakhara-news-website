import { Link, Outlet, useLocation } from "react-router";
import { Search, Home, User, ChevronRight, Menu, X, ArrowRight, Radio, MessageCircle, Heart, Users, Calendar, Image, Phone, GraduationCap, Mail, MapPin, Bell, Cake, Award, ShieldCheck, ShoppingBag, Book, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
            <Link to="/" className="flex items-center gap-3 group">
               <div className="size-12 md:size-14 rounded-full bg-white flex items-center justify-center shadow-lg shadow-primary/20 border-2 border-primary/20 shrink-0 group-hover:scale-105 transition-transform p-0.5 overflow-hidden">
                  <img src="/brand-logo.png" alt="Lakhara Samaj Logo" className="size-full object-contain rounded-full" />
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
               <Link to="/" className="flex items-center gap-4 shrink-0 group">
                  <div className="size-14 md:size-16 rounded-full bg-white flex items-center justify-center shadow-lg shadow-black/20 border border-white/20 shrink-0 group-hover:scale-105 transition-transform p-1 overflow-hidden">
                     <img src="/brand-logo.png" alt="Lakhara Samaj Logo" className="size-full object-contain rounded-full" />
                  </div>
                  <div className="flex flex-col items-start">
                     <span className="text-2xl md:text-3xl font-black text-primary leading-none tracking-tighter uppercase">LAKHARA</span>
                     <span className="text-[12px] font-black text-white/50 tracking-[0.2em] mt-1 uppercase leading-none">DIGITAL NETWORK</span>
                  </div>
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
                   {['directory', 'matrimonial', 'events', 'gallery', 'ebooks', 'store', 'notices', 'birthday-wishes'].map(slug => (
                    <li key={slug}><Link to={`/${slug}`} className="text-[13px] font-bold text-gray-400 hover:text-primary capitalize">{slug.replace('-', ' ')}</Link></li>
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
        <Link to="/directory" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/directory' ? 'text-primary' : 'text-gray-400'}`}>
           <Users className="size-6" />
           <span className="text-[9px] font-black uppercase tracking-wider">Members</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/profile' ? 'text-primary' : 'text-gray-400'}`}>
           <User className="size-6" />
           <span className="text-[9px] font-black uppercase tracking-wider">Profile</span>
        </Link>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[400] overflow-hidden">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }} 
               onClick={() => setIsMobileMenuOpen(false)} 
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
             />
             <motion.aside 
               initial={{ x: '-100%' }} 
               animate={{ x: 0 }} 
               exit={{ x: '-100%' }} 
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="absolute inset-y-0 left-0 w-80 bg-white shadow-2xl flex flex-col"
             >
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <img src="/brand-logo.png" className="size-10 object-contain" alt="Logo" />
                      <div>
                         <span className="text-lg font-black text-primary leading-none block">LAKHARA</span>
                         <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">DIGITAL NETWORK</span>
                      </div>
                   </div>
                   <button onClick={() => setIsMobileMenuOpen(false)} className="size-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all">
                      <X className="size-5" />
                   </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                   {[
                     { label: "Home", path: "/", icon: Home },
                     { label: "Members", path: "/directory", icon: Users },
                     { label: "Certificate", path: "/profile", icon: Award },
                     { label: "Gallery", path: "/gallery", icon: Image },
                     { label: "Digital Book (PDF)", path: "/ebooks", icon: Book },
                     { label: "Samaj News", path: "/news", icon: Radio },
                     { label: "Committee", path: "/committee", icon: ShieldCheck },
                     { label: "Matrimonial", path: "/matrimonial", icon: Heart },
                     { label: "Store", path: "/store", icon: ShoppingBag },
                     { label: "Notices", path: "/notices", icon: Bell },
                     { label: "Contact", path: "/contact", icon: Phone },
                     { label: "About", path: "/about", icon: Info },
                   ].map((item) => {
                     const Icon = item.icon || Info;
                     const active = location.pathname === item.path;
                     return (
                       <Link 
                         key={item.path} 
                         to={item.path} 
                         onClick={() => setIsMobileMenuOpen(false)}
                         className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 hover:bg-slate-50 hover:translate-x-1'}`}
                       >
                          <Icon className={`size-5 ${active ? 'text-white' : 'text-primary/60'}`} />
                          <span className="text-xs font-black uppercase tracking-wide">{item.label}</span>
                       </Link>
                     );
                   })}
                </div>

                <div className="p-6 border-t border-slate-50 mt-auto">
                   <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 font-noto">॥ संघे शक्तिः कलौ युगे ॥</p>
                      <p className="text-[9px] font-bold text-slate-500 leading-relaxed uppercase">लखारा समाज का सशक्त डिजिटल मंच।</p>
                   </div>
                </div>
             </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

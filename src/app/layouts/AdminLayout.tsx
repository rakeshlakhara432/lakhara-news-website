import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  ArrowLeft,
  Menu,
  X,
  Settings,
  LogOut,
  Lock,
  Shield,
  Bell,
  Activity,
  Radio,
  Globe,
  Database,
  Cpu,
  Landmark,
  ShieldCheck,
  User,
  Key,
  DatabaseIcon,
  Search,
  Plus,
  ArrowRight,
  Heart,
  Calendar,
  Image,
  Users,
  MessageCircle,
  GraduationCap,
  Megaphone,
  Briefcase,
  Play,
  ShoppingBag,
  Book,
  Award,
  BarChart3,
  Cake,
  CreditCard,
} from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "../data/database";
import { auth } from "../data/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "rakeshlakhara432@gmail.com") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsCheckingAuth(false);
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    try {
      setLoginError("");
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      
      if (result.user.email !== "rakeshlakhara432@gmail.com") {
        await signOut(auth);
        setLoginError("ACCESS DENIED: You are not the owner of this website.");
      }
    } catch (err: any) {
      setLoginError(err.message || "Authentication Failed.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#FFFDFB] flex items-center justify-center">
        <div className="animate-spin text-primary size-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFFDFB] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm relative z-10 scale-100 animate-in fade-in zoom-in duration-500">
          <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-bhagva text-center space-y-10">
            
            <div className="flex justify-center mb-6">
               <img src="/brand-logo.png" alt="Lakhara Logo" className="h-16 w-auto object-contain drop-shadow-md" />
            </div>
            
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-gray-950 tracking-tighter leading-none uppercase italic">
                Lakhara <span className="text-primary">ADMIN</span>
              </h1>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.4em] leading-none opacity-60">AUTHORIZED ENTRY ONLY</p>
            </div>

            <div>
              <button
                onClick={handleLogin}
                className="w-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800 focus:ring-4 focus:ring-gray-100 rounded-xl px-6 py-3.5 font-bold transition-all shadow-sm flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                Sign in as Owner
              </button>
              
              {loginError && (
                <div className="mt-4 text-red-600 text-[10px] uppercase font-black tracking-widest bg-red-50 p-3 border border-red-100 rounded-lg text-center leading-relaxed">
                  {loginError}
                </div>
              )}

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full mt-6 py-2 text-gray-400 font-black uppercase tracking-widest text-[8px] hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="size-3" /> RETURN TO PORTAL
              </button>
            </div>
          </div>
          <p className="text-center text-[7px] font-black text-gray-300 mt-10 uppercase tracking-[0.5em] opacity-50">Secure Core System &bull; Active Shield v4.0</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { path: "/admin",                    label: "Overview",        icon: LayoutDashboard },
    { path: "/admin/analytics",          label: "Analytics",       icon: BarChart3       },
    { path: "/admin/notices",            label: "Notice Board",    icon: Bell            },
    { path: "/admin/committee",          label: "Executive",       icon: ShieldCheck     },
    { path: "/admin/members",            label: "Members",         icon: Users           },
    { path: "/admin/matrimonial",        label: "Matrimonial",     icon: Heart           },
    { path: "/admin/store",              label: "Samaj Store",     icon: ShoppingBag     },
    { path: "/admin/ebooks",             label: "E-Library",       icon: Book            },
    { path: "/admin/events",             label: "Events",          icon: Calendar        },
    { path: "/admin/gallery",            label: "Archive",         icon: Image           },
    { path: "/admin/news",               label: "Samaj News",      icon: Megaphone       },
    { path: "/admin/videos",             label: "Broadcasts",      icon: Play            },
    { path: "/admin/support",            label: "Education",       icon: GraduationCap   },
    { path: "/admin/messages",           label: "Messages",        icon: MessageCircle   },
    { path: "/admin/settings",           label: "About Settings",  icon: Settings        },
    { path: "/admin/certificate-settings", label: "Member Card Sign", icon: CreditCard      },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
       return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] flex h-screen overflow-hidden text-gray-950 font-main">
      {/* ── PROFESSIONAL NAV SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 relative z-50 shadow-sm">
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <img src="/brand-logo.png" alt="Lakhara Logo" className="h-10 w-auto object-contain" />
          <div>
            <span className="font-black text-[14px] tracking-tighter block leading-none text-gray-950 uppercase italic">ADMIN HUB</span>
            <span className="text-[7px] font-black text-gray-300 uppercase tracking-widest mt-1">LAKHARA NETWORK</span>
          </div>
        </div>

        <nav className="flex-grow px-3 space-y-0.5 overflow-y-auto no-scrollbar pt-6">
          <p className="text-[7px] font-black text-gray-400 tracking-[0.5em] px-4 mb-3 uppercase opacity-50">STATION CONTROL</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-5 py-3 rounded-xl group transition-all duration-300 ${
                  active
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105 z-10"
                    : "text-gray-400 hover:text-primary hover:bg-primary/5 hover:translate-x-1"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon className={`size-4 transition-colors ${active ? 'text-white' : 'group-hover:text-primary'}`} />
                  <span className="font-black text-[10px] uppercase tracking-tight">{item.label}</span>
                </div>
                {active && <div className="size-1 bg-white/40 rounded-full animate-pulse"></div>}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-50 space-y-3">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3.5 px-5 py-3 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all font-black text-[9px] uppercase tracking-widest"
           >
             <LogOut className="size-4" />
             TERMINATE SESSION
           </button>
            <div className="bg-gray-50/50 rounded-xl p-3 flex flex-col gap-3 border border-gray-100 shadow-inner overflow-hidden">
               <div className="flex items-center gap-2">
                 <div className="size-1.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50"></div>
                 <span className="text-[7px] font-black text-gray-400 uppercase tracking-[0.3em] italic">Network Online</span>
               </div>
               <div className="pt-2 border-t border-gray-100 flex flex-col items-center">
                  <span className="text-[6px] font-black text-slate-300 uppercase tracking-widest mb-1 self-start">Official Seal</span>
                  <img src="/admin-signature.png" alt="Admin Signature" className="h-10 w-auto object-contain brightness-90 contrast-125" />
                  <span className="text-[7px] font-black text-primary uppercase tracking-[0.2em] mt-1 italic">Rakesh Lakhara</span>
               </div>
            </div>
        </div>
      </aside>

      {/* ── OPERATIONS AREA ── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white relative">
        <header className="px-8 py-4 flex items-center justify-between z-40 bg-white/80 backdrop-blur-md border-b border-gray-50">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2.5 bg-gray-50 rounded-xl hover:bg-primary hover:text-white transition-colors border border-gray-100"
            >
              <Menu className="size-5" />
            </button>
            <div>
              <h1 className="text-xl font-black text-gray-950 tracking-tighter uppercase leading-none italic">
                {menuItems.find(m => isActive(m.path))?.label || "Command Center"}
              </h1>
              <p className="text-[7px] font-black text-gray-400 uppercase tracking-[0.4em] mt-1.5 opacity-60 italic">MISSION CONTROL PANEL</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="hidden sm:flex items-center gap-2.5 px-5 py-2 bg-gray-950 text-white font-black rounded-xl hover:bg-primary transition-all text-[9.5px] tracking-widest uppercase shadow-xl hover:scale-105 active:scale-95">
              <Globe className="size-3.5" />
              LIVE PORTAL
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-[#FFFDFB]">
          <div className="max-w-7xl mx-auto pb-32 animate-in slide-in-from-bottom-2 duration-700">
             <Outlet />
          </div>
          <div className="absolute inset-0 mandala-bg z-[-1] opacity-[0.02] pointer-events-none"></div>
        </main>
      </div>

      {/* ── MOBILE OVERLAY MENU ── */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-gray-950/20 backdrop-blur-md" onClick={() => setIsSidebarOpen(false)}>
           <aside 
             className="absolute inset-y-0 left-0 w-72 bg-white flex flex-col border-r border-gray-100 shadow-2xl overflow-hidden"
             onClick={(e) => e.stopPropagation()}
           >
              {/* ── Header ── */}
              <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
                 <Link to="/admin" className="flex items-center gap-3 group" onClick={() => setIsSidebarOpen(false)}>
                    <div className="size-10 rounded-full bg-white border border-primary/30 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform p-0.5 overflow-hidden">
                       <img src="/brand-logo.png" alt="Logo" className="size-full object-contain rounded-full" />
                    </div>
                    <div>
                      <span className="font-black text-base text-slate-800 tracking-tighter uppercase italic block leading-none">ADMIN HUB</span>
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">LAKHARA NETWORK</span>
                    </div>
                 </Link>
                 <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors shrink-0">
                    <X className="size-5 text-gray-400" />
                 </button>
              </div>

              {/* ── Scrollable Nav ── */}
              <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1" style={{ WebkitOverflowScrolling: 'touch' }}>
                 <p className="text-[7px] font-black text-gray-400 tracking-[0.4em] px-3 mb-3 uppercase opacity-50">STATION CONTROL</p>
                 {menuItems.map(item => {
                   const Icon = item.icon;
                   const active = isActive(item.path);
                   return (
                     <Link
                       key={item.path}
                       to={item.path}
                       onClick={() => setIsSidebarOpen(false)}
                       className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all border ${
                         active
                           ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                           : 'text-gray-500 border-transparent hover:text-primary hover:bg-primary/5'
                       }`}
                     >
                        <Icon className="size-5 shrink-0" />
                        <span className="font-black uppercase tracking-wider text-[11px]">{item.label}</span>
                        {active && <div className="ml-auto size-1.5 bg-white/60 rounded-full animate-pulse" />}
                     </Link>
                   );
                 })}
              </nav>
              
              {/* ── Logout Footer ── */}
              <div className="px-4 pb-6 pt-3 border-t border-gray-100 shrink-0">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all font-black uppercase tracking-widest text-[9px]"
                >
                   <LogOut className="size-5" /> TERMINATE SESSION
                </button>
                <div className="mt-2 flex items-center gap-2 px-3">
                  <div className="size-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest">Network Online</span>
                </div>
              </div>
           </aside>
        </div>
      )}
    </div>
  );
}

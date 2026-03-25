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
  Key
} from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "../data/database";
import { motion, AnimatePresence } from "framer-motion";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);

  useEffect(() => {
    // Force sync articles from cloud when admin enters
    const syncData = async () => {
      setIsCloudSyncing(true);
      await (db as any).syncWithCloud();
      setIsCloudSyncing(false);
    };
    syncData();
  }, [location.pathname]);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAdminLoggedIn") === "true";
  });
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem("adminPassword") || "admin123";
    if (loginPassword === storedPassword) {
      localStorage.setItem("isAdminLoggedIn", "true");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-primary/30">
        <div className="grid-paper absolute inset-0 opacity-10"></div>
        <div className="absolute top-[-20%] right-[-20%] size-[800px] bg-primary/20 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] size-[600px] bg-white/5 rounded-full blur-[140px]"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg relative z-10"
        >
          <div className="bg-white/95 backdrop-blur-xl p-10 md:p-16 rounded-[4rem] border-8 border-primary/10 shadow-3xl text-center">
            <div className="flex justify-center mb-12">
              <motion.div 
                animate={{ rotateY: [0, 180, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="size-24 bg-primary rounded-full flex items-center justify-center shadow-lg"
              >
                <Landmark className="size-12 text-white" />
              </motion.div>
            </div>
            
            <div className="space-y-4 mb-12">
              <h1 className="text-4xl md:text-5xl font-serif-heritage font-black text-secondary italic tracking-tighter uppercase leading-none">
                LAKHARA <span className="text-primary italic">SAMCHAR</span>
              </h1>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mt-2 opacity-60">Admin Pravesh (Sadasya Kewal)</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              <div className="relative group">
                <Key className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-primary group-focus-within:text-secondary transition-colors" />
                <input
                  type="password"
                  placeholder="PRAVESH KUNJI..."
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setLoginError("");
                  }}
                  className="w-full bg-paper border border-border focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl pl-16 pr-6 py-6 font-bold text-secondary outline-none transition-all text-lg placeholder:text-secondary/10 uppercase tracking-widest text-center"
                  autoFocus
                  required
                />
              </div>
              
              <AnimatePresence>
                {loginError && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-600 text-xs font-black uppercase tracking-widest animate-bounce"
                  >
                    IDENTIFICATION FAILURE • RETRY
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="btn-heritage w-full !py-6 !text-lg !rounded-[2rem] shadow-xl"
              >
                PRAVESH INITIATE
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full py-4 text-secondary/40 font-black uppercase tracking-widest text-[10px] hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="size-3" /> RETURN TO PUBLIC TERMINAL
              </button>
            </form>
          </div>
          
          <div className="flex items-center justify-center gap-10 mt-12 grayscale opacity-30">
            <div className="flex items-center gap-2">
              <div className="size-1.5 bg-white rounded-full animate-ping"></div>
              <span className="text-[9px] font-black text-white uppercase tracking-widest">HQ LINK READY</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="size-3 text-white" />
              <span className="text-[9px] font-black text-white uppercase tracking-widest">v2.4.0 CLOUD</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/articles", label: "Samachar", icon: FileText },
    { path: "/admin/categories", label: "Sectors", icon: FolderOpen },
    { path: "/admin/videos", label: "Broadcasting", icon: Radio },
    { path: "/admin/settings", label: "Viniyas", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-paper flex h-screen overflow-hidden font-sans selection:bg-primary/30">
      {/* ── COMMAND SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-80 bg-secondary border-r border-white/5 relative z-50">
        <div className="grid-paper absolute inset-0 opacity-5"></div>
        <div className="p-10 relative z-10 border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-4 group">
            <div className="size-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Landmark className="size-6 text-white" />
            </div>
            <div>
              <span className="font-serif-heritage font-black text-2xl italic text-white tracking-tighter block leading-none uppercase">LAKHARA</span>
              <span className="text-[8px] font-black text-primary uppercase tracking-[0.4em] mt-1">ADMIN HQ</span>
            </div>
          </Link>
        </div>

        <nav className="flex-grow px-6 space-y-4 overflow-y-auto no-scrollbar pt-10 relative z-10">
          <p className="text-[9px] font-black text-white/30 tracking-[0.4em] px-4 mb-8">DASHBOARD COMMANDS</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl group transition-all duration-500 border-2 ${
                  active
                    ? "bg-primary text-white border-primary shadow-xl translate-x-2"
                    : "text-white/40 hover:text-white hover:bg-white/5 border-transparent"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon className={`size-5 transition-all duration-500 ${active ? 'scale-110 text-white' : 'group-hover:scale-110 group-hover:text-primary'}`} />
                  <span className="font-bold text-sm tracking-[0.1em] uppercase">{item.label}</span>
                </div>
                {active && <div className="size-1.5 bg-white rounded-full animate-pulse shadow-glow"></div>}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-white/10 space-y-4 relative z-10">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white/20 hover:text-primary hover:bg-primary/5 transition-all font-bold uppercase text-[10px] tracking-widest"
           >
             <LogOut className="size-4" />
             TERMINATE SESSION
           </button>
           <div className="bg-white/5 rounded-2xl p-5 flex items-center gap-4 border border-white/5">
              <div className="size-2 bg-primary rounded-full animate-ping shadow-[0_0_10px_rgba(255,153,51,0.5)]"></div>
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest text-nowrap">NETWORK SECURE</span>
           </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT TERMINAL ── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-paper relative">
        <div className="grid-paper absolute inset-0 opacity-[0.05]"></div>
        
        {/* Floating Header */}
        <header className="px-8 md:px-12 py-7 flex items-center justify-between z-40 bg-white/80 backdrop-blur-3xl border-b border-border">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-4 bg-paper rounded-2xl hover:bg-border transition-colors border border-border shadow-sm"
            >
              <Menu className="size-6 text-secondary" />
            </button>
            <div className="hidden md:block">
              <h1 className="text-3xl font-serif-heritage font-black text-secondary tracking-tighter italic uppercase leading-none">
                {menuItems.find(m => isActive(m.path))?.label || "Operations"}
              </h1>
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mt-1">Lakhara Digital Terminal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="hidden sm:flex items-center gap-3 px-6 py-3.5 bg-secondary text-white font-black rounded-2xl hover:bg-primary transition-all text-[10px] tracking-widest uppercase shadow-lg">
              <Globe className="size-4" />
              LIVE NETWORK
            </Link>
            <div className={`hidden lg:flex items-center gap-3 px-5 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest border-2 border-primary/10 bg-white shadow-sm`}>
              <div className={`size-1.5 rounded-full ${isCloudSyncing ? "bg-primary animate-spin" : "bg-green-500 shadow-lg"}`}></div>
              {isCloudSyncing ? "UPLINKING DATA..." : "CLOUD SYNCED"}
            </div>
            <div className="size-14 bg-white rounded-2xl flex items-center justify-center text-secondary relative group cursor-pointer hover:bg-primary hover:text-white transition-all border border-border shadow-sm">
               <Bell className="size-6" />
               <div className="absolute top-3 right-3 size-3 bg-primary border-2 border-white rounded-full shadow-lg"></div>
            </div>
          </div>
        </header>

        {/* Content Flow */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 relative z-10">
          <div className="max-w-7xl mx-auto space-y-12 pb-32">
             <Outlet />
          </div>
        </main>
      </div>

      {/* ── MOBILE SIDEBAR ── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-[100]">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-secondary/90 backdrop-blur-md" 
               onClick={() => setIsSidebarOpen(false)}
             ></motion.div>
             <motion.aside 
               initial={{ x: "-100%" }}
               animate={{ x: 0 }}
               exit={{ x: "-100%" }}
               transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
               className="absolute inset-y-0 left-0 w-[85%] bg-secondary p-10 flex flex-col border-r border-white/5"
             >
                <div className="flex justify-between items-center mb-16 px-4">
                   <div className="flex items-center gap-4">
                      <div className="size-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                         <Landmark className="size-6 text-white" />
                      </div>
                      <span className="font-serif-heritage font-black text-2xl text-white tracking-tighter uppercase italic">LAKHARA</span>
                   </div>
                   <button onClick={() => setIsSidebarOpen(false)} className="size-14 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10">
                      <X className="size-7" />
                   </button>
                </div>

                <nav className="flex-grow space-y-4">
                   {menuItems.map(item => {
                     const Icon = item.icon;
                     const active = isActive(item.path);
                     return (
                       <Link key={item.path} to={item.path} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-5 p-6 rounded-3xl transition-all border-2 ${active ? 'bg-primary text-white border-primary shadow-xl' : 'text-white/40 border-transparent'}`}>
                          <Icon className="size-7" />
                          <span className="font-bold text-lg tracking-widest uppercase italic">{item.label}</span>
                       </Link>
                     );
                   })}
                </nav>
                
                <button onClick={handleLogout} className="mt-auto flex items-center gap-5 p-6 text-white/20 font-bold uppercase tracking-widest text-xs hover:text-primary">
                   <LogOut className="size-6" /> TERMINATE SESSION
                </button>
             </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

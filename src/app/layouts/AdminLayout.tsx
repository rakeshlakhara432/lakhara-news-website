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
  ArrowRight
} from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "../data/database";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);

  useEffect(() => {
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
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem("adminPassword") || "admin123";
    if (loginPassword === storedPassword) {
      localStorage.setItem("isAdminLoggedIn", "true");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("ACCESS DENIED: KEY INVALID");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05080f] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] size-[600px] bg-primary/5 rounded-full blur-[150px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] size-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>

        <div className="w-full max-w-sm relative z-10 scale-100 animate-in fade-in zoom-in duration-500">
          <div className="bg-black/40 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/5 shadow-2xl text-center space-y-12">
            
            <div className="flex justify-center mb-10 translate-x-1">
              <ArrowRight className="size-20 text-white animate-pulse" strokeWidth={1} />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-black text-white italic tracking-tighter leading-none italic uppercase scale-x-110">
                LAKHARA HQ
              </h1>
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.5em] leading-none opacity-80">IDENTITY VALIDATION REQUIRED</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="NETWORK ADDRESS..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0a0f1a]/80 border border-white/5 focus:border-white/20 rounded-full px-8 py-5 font-black text-white outline-none transition-all text-center tracking-widest placeholder:text-gray-700 placeholder:text-[10px] uppercase text-xs"
                  required
                />
              </div>

              <div className="relative group">
                <input
                  type="password"
                  placeholder="ACCESS KEY..."
                  value={loginPassword}
                  onChange={(e) => {
                     setLoginPassword(e.target.value);
                     setLoginError("");
                  }}
                  className="w-full bg-[#0a0f1a]/80 border border-white/5 focus:border-white/20 rounded-full px-8 py-5 font-black text-white outline-none transition-all text-center tracking-widest placeholder:text-gray-700 placeholder:text-[10px] uppercase text-xs"
                  required
                />
              </div>
              
              {loginError && (
                <div className="text-primary text-[9px] font-black uppercase tracking-widest bg-primary/5 py-3 rounded-full border border-primary/20 animate-bounce">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-5 bg-white text-black font-black rounded-full hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95 uppercase text-[10px] tracking-[0.3em]"
              >
                VALIDATE ACCESS
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full py-4 text-gray-700 font-bold uppercase tracking-widest text-[8px] hover:text-primary transition-colors flex items-center justify-center gap-3"
              >
                <ArrowLeft className="size-3" /> RETURN TO INTERFACE
              </button>
            </form>
          </div>
          <p className="text-center text-[7px] font-black text-gray-800 mt-12 uppercase tracking-[1em] opacity-40">ENCRYPTION LEVEL: AES-256-GCM • SESSION: ACTIVE</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { path: "/admin", label: "COMM-T-1", icon: LayoutDashboard },
    { path: "/admin/articles", label: "PROTOCOLS", icon: FileText },
    { path: "/admin/categories", label: "SECTORS", icon: FolderOpen },
    { path: "/admin/videos", label: "ANTENNA", icon: Radio },
    { path: "/admin/settings", label: "SYSTRAY", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#05080f] flex h-screen overflow-hidden text-white font-main selection:bg-primary/40 selection:text-white">
      {/* ── CINEMATIC SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-80 bg-[#0a0f1a] border-r border-white/5 relative z-50">
        <div className="p-10 border-b border-white/5 flex items-center gap-4">
          <div className="size-12 bg-black border border-primary rounded-xl flex items-center justify-center text-primary shadow-glow">
            <Radio className="size-7" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tighter block leading-none text-white uppercase italic">HQ CONTROL</span>
            <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-1 tracking-[0.4em]">LINK ACTIVE</span>
          </div>
        </div>

        <nav className="flex-grow px-8 space-y-3 overflow-y-auto no-scrollbar pt-12">
          <p className="text-[8px] font-black text-gray-700 tracking-[0.6em] px-4 mb-8 uppercase">Directives</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-6 py-5 rounded-[1.5rem] group transition-all duration-300 border ${
                  active
                    ? "bg-white text-black border-white shadow-xl scale-105"
                    : "text-gray-600 hover:text-white hover:bg-white/5 border-transparent"
                }`}
              >
                <div className="flex items-center gap-5">
                  <Icon className={`size-5 transition-colors ${active ? 'text-black' : 'group-hover:text-primary'}`} />
                  <span className="font-black text-[10px] tracking-[0.2em] uppercase italic">{item.label}</span>
                </div>
                {active && <div className="size-1.5 bg-black rounded-full animate-pulse"></div>}
              </Link>
            );
          })}
        </nav>

        <div className="p-10 border-t border-white/5 space-y-4">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-5 px-6 py-4 rounded-[1.2rem] text-gray-700 hover:text-primary hover:bg-primary/5 transition-all font-black text-[9px] uppercase tracking-widest"
           >
             <LogOut className="size-5" />
             TERMINATE SESSION
           </button>
           <div className="bg-black/40 rounded-[1rem] p-5 flex items-center gap-5 border border-white/5">
              <div className="size-2 bg-primary rounded-full animate-ping shadow-glow"></div>
              <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest">TRANSMITTING...</span>
           </div>
        </div>
      </aside>

      {/* ── CORE OPERATIONS ── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#05080f] relative selection:bg-primary/20">
        <header className="px-12 py-8 flex items-center justify-between z-40 bg-black/40 backdrop-blur-3xl border-b border-white/5">
          <div className="flex items-center gap-10">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-4 bg-white/5 rounded-2xl hover:bg-primary hover:text-white transition-colors"
            >
              <Menu className="size-7" />
            </button>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic scale-x-110">
                {menuItems.find(m => isActive(m.path))?.label || "OPERATIONS BOARD"}
              </h1>
              <p className="text-[8px] font-black text-gray-600 uppercase tracking-[0.6em] mt-2">SYSTEM CONSOLE • v4.0.2</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Link to="/" className="hidden sm:flex items-center gap-4 px-8 py-3.5 bg-white text-black font-black rounded-2xl hover:bg-primary hover:text-white transition-all text-[9px] tracking-[0.3em] uppercase shadow-2xl">
              <Globe className="size-4" />
              VIEW FEED
            </Link>
            <div className={`hidden lg:flex items-center gap-5 px-6 py-3 rounded-2xl text-[8px] font-black uppercase tracking-[0.4em] border border-white/5 bg-black shadow-inner`}>
              <div className={`size-2.5 rounded-full ${isCloudSyncing ? "bg-primary animate-spin" : "bg-primary shadow-glow"}`}></div>
              {isCloudSyncing ? "UPLOADING..." : "SYNC: 100%"}
            </div>
            <div className="size-14 bg-white/5 rounded-[1.3rem] flex items-center justify-center text-gray-600 relative hover:bg-primary/10 hover:border-primary/50 transition-all cursor-pointer border border-white/5 shadow-inner">
               <Bell className="size-7" />
               <div className="absolute -top-1 -right-1 size-4 bg-primary border-4 border-[#05080f] rounded-full shadow-glow animate-pulse"></div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-12 bg-gray-50/0">
          <div className="max-w-7xl mx-auto pb-44 animate-in fade-in duration-700">
             <Outlet />
          </div>
        </main>
      </div>

      {/* ── MOBILE SYSTEM OVERLAY ── */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-black/60 backdrop-blur-3xl" onClick={() => setIsSidebarOpen(false)}>
           <aside 
             className="absolute inset-y-0 left-0 w-80 bg-black p-12 flex flex-col border-r border-white/5"
             onClick={(e) => e.stopPropagation()}
           >
              <div className="flex justify-between items-center mb-20 whitespace-nowrap">
                 <div className="flex items-center gap-4">
                    <div className="size-12 bg-white/5 rounded-xl border border-primary flex items-center justify-center text-primary shadow-glow">
                       <Radio className="size-7" />
                    </div>
                    <span className="font-black text-2xl text-white tracking-tighter uppercase italic">HQ</span>
                 </div>
                 <button onClick={() => setIsSidebarOpen(false)} className="p-3 bg-white/5 rounded-xl">
                    <X className="size-8 text-gray-500" />
                 </button>
              </div>

              <nav className="flex-grow space-y-5">
                 {menuItems.map(item => {
                   const Icon = item.icon;
                   const active = isActive(item.path);
                   return (
                     <Link key={item.path} to={item.path} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-6 p-7 rounded-[2rem] transition-all border ${active ? 'bg-primary text-white border-primary shadow-glow italic' : 'text-gray-600 border-transparent italic'}`}>
                        <Icon className="size-8" />
                        <span className="font-black uppercase tracking-[0.2em] text-xs">{item.label}</span>
                     </Link>
                   );
                 })}
              </nav>
              
              <button onClick={handleLogout} className="mt-auto flex items-center gap-6 p-7 text-gray-700 font-black uppercase tracking-widest text-xs hover:text-primary">
                 <LogOut className="size-8" /> TERMINATE
              </button>
           </aside>
        </div>
      )}
    </div>
  );
}

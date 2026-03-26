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
      setLoginError("Incorrect Password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFFDFB] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm relative z-10 scale-100 animate-in fade-in zoom-in duration-500">
          <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-bhagva text-center space-y-10">
            
            <div className="flex justify-center mb-6">
               <div className="size-14 bg-primary text-white rounded-2xl flex items-center justify-center font-black italic shadow-lg rotate-[-12deg]">L</div>
            </div>
            
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-gray-950 tracking-tighter leading-none uppercase italic">
                Lakhara <span className="text-primary">ADMIN</span>
              </h1>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.4em] leading-none opacity-60">AUTHORIZED ENTRY ONLY</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="relative group">
                <input
                  type="password"
                  placeholder="Enter Passcode..."
                  value={loginPassword}
                  onChange={(e) => {
                     setLoginPassword(e.target.value);
                     setLoginError("");
                  }}
                  className="w-full bg-gray-50/50 border border-gray-100 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 rounded-xl px-6 py-3.5 font-bold text-gray-900 outline-none transition-all text-center tracking-[0.2em] text-[13px]"
                  autoFocus
                  required
                />
              </div>
              
              {loginError && (
                <div className="text-red-600 text-[8px] font-black uppercase tracking-widest bg-red-50 py-2.5 rounded-lg border border-red-100">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-primary text-white font-black rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 uppercase text-[10px] tracking-widest"
              >
                UNSEAL ACCESS
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full py-2 text-gray-400 font-black uppercase tracking-widest text-[7px] hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="size-3" /> RETURN TO PORTAL
              </button>
            </form>
          </div>
          <p className="text-center text-[7px] font-black text-gray-300 mt-10 uppercase tracking-[0.5em] opacity-50">Secure Core System &bull; Active Shield v4.0</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { path: "/admin", label: "Overview", icon: LayoutDashboard },
    { path: "/admin/articles", label: "Article Flow", icon: FileText },
    { path: "/admin/categories", label: "Node Groups", icon: FolderOpen },
    { path: "/admin/videos", label: "Broadcast", icon: Radio },
    { path: "/admin/settings", label: "Core Control", icon: Settings },
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
          <div className="size-9 bg-primary text-white rounded-lg flex items-center justify-center font-black italic shadow-md rotate-[-8deg]">L</div>
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
           <div className="bg-gray-50/50 rounded-xl p-3 flex items-center gap-3 border border-gray-100 shadow-inner">
              <div className="size-1.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50"></div>
              <span className="text-[7px] font-black text-gray-400 uppercase tracking-[0.3em] italic">Network Online</span>
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
             className="absolute inset-y-0 left-0 w-72 bg-white p-8 flex flex-col border-r border-gray-100 shadow-2xl"
             onClick={(e) => e.stopPropagation()}
           >
              <div className="flex justify-between items-center mb-12">
                 <div className="flex items-center gap-3">
                    <div className="size-9 bg-primary text-white rounded-lg flex items-center justify-center font-black italic shadow-lg rotate-[-8deg]">L</div>
                    <span className="font-black text-lg text-gray-950 tracking-tighter uppercase italic">ADMIN</span>
                 </div>
                 <button onClick={() => setIsSidebarOpen(false)} className="p-2.5 bg-gray-50 rounded-xl">
                    <X className="size-6 text-gray-400" />
                 </button>
              </div>

              <nav className="flex-grow space-y-1">
                 {menuItems.map(item => {
                   const Icon = item.icon;
                   const active = isActive(item.path);
                   return (
                     <Link key={item.path} to={item.path} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-4 p-4 rounded-xl transition-all border ${active ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 italic' : 'text-gray-400 border-transparent hover:text-primary italic'}`}>
                        <Icon className="size-5" />
                        <span className="font-black uppercase tracking-widest text-[10px]">{item.label}</span>
                     </Link>
                   );
                 })}
              </nav>
              
              <button onClick={handleLogout} className="mt-auto flex items-center gap-4 p-4 text-gray-400 font-black uppercase tracking-widest text-[9px] hover:text-red-600 transition-colors">
                 <LogOut className="size-5" /> TERMINATE SESSION
              </button>
           </aside>
        </div>
      )}
    </div>
  );
}

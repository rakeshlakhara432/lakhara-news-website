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
  Plus
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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_center,rgba(255,153,51,0.05)_0,transparent_100%)]">
        <div className="w-full max-w-md relative z-10">
          <div className="bg-white p-12 rounded-[2.5rem] border border-border shadow-2xl text-center space-y-10">
            <div className="flex justify-center mb-4">
              <div className="size-20 bg-saffron text-white rounded-full flex items-center justify-center shadow-xl shadow-saffron/30">
                <ShieldCheck className="size-12" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl font-black text-charcoal tracking-tighter uppercase leading-none italic">
                हिन्दू राष्ट्र <span className="text-saffron">ADMIN</span>
              </h1>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Kewal Pradhikrit Pravesh</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              <div className="relative group">
                <Key className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-300 group-focus-within:text-saffron transition-colors" />
                <input
                  type="password"
                  placeholder="PASSWORD LIKHEIN..."
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setLoginError("");
                  }}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-saffron/50 focus:ring-8 focus:ring-saffron/5 rounded-2xl pl-14 pr-6 py-5 font-black text-charcoal outline-none transition-all text-center tracking-[0.3em] placeholder:text-gray-200 placeholder:tracking-normal"
                  autoFocus
                  required
                />
              </div>
              
              {loginError && (
                <div className="text-red-600 text-[10px] font-black uppercase tracking-widest bg-red-50 py-3 rounded-xl border border-red-100">
                  PASSWORD GALAT HAI
                </div>
              )}

              <button
                type="submit"
                className="btn-saffron w-full !py-5 shadow-xl !rounded-2xl"
              >
                LOG IN KAREIN
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full py-4 text-gray-400 font-black uppercase tracking-widest text-[9px] hover:text-saffron transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="size-3" /> WAPAS MUKHYA PRISHTH PAR
              </button>
            </form>
          </div>
          <p className="text-center text-[9px] font-black text-gray-400 mt-12 uppercase tracking-[0.5em] opacity-50">Secure Database Connection • BH-2026</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/articles", label: "Khabrain", icon: FileText },
    { path: "/admin/categories", label: "Categories", icon: FolderOpen },
    { path: "/admin/videos", label: "Live TV", icon: Radio },
    { path: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex h-screen overflow-hidden text-charcoal font-main">
      {/* ── MODERN SAFFRON SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-80 bg-white border-r border-border relative z-50">
        <div className="p-10 border-b border-gray-50 flex items-center gap-4">
          <div className="size-12 bg-saffron text-white rounded-2xl flex items-center justify-center shadow-xl shadow-saffron/20">
            <Shield className="size-7" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tighter block leading-none text-charcoal uppercase italic">HINDU HQ</span>
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">BHARAT NETWORK</span>
          </div>
        </div>

        <nav className="flex-grow px-6 space-y-2 overflow-y-auto no-scrollbar pt-10">
          <p className="text-[9px] font-black text-gray-300 tracking-[0.4em] px-4 mb-6 uppercase">Main Control</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl group transition-all duration-300 ${
                  active
                    ? "bg-saffron/10 text-saffron shadow-sm border border-saffron/10"
                    : "text-gray-400 hover:text-charcoal hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon className={`size-5 transition-colors ${active ? 'text-saffron shadow-lg' : 'group-hover:text-saffron'}`} />
                  <span className="font-black text-xs tracking-widest uppercase">{item.label}</span>
                </div>
                {active && <div className="size-1.5 bg-saffron rounded-full animate-pulse"></div>}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-gray-50 space-y-4">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-gray-400 hover:text-saffron hover:bg-saffron/5 transition-all font-black text-[10px] uppercase tracking-widest"
           >
             <LogOut className="size-5" />
             LOG OUT
           </button>
           <div className="bg-gray-50 rounded-2xl p-5 flex items-center gap-4 border border-gray-100">
              <div className="size-2.5 bg-accent rounded-full animate-pulse shadow-sm"></div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">System Online</span>
           </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background relative">
        <header className="px-10 py-6 flex items-center justify-between z-40 bg-white border-b border-border">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-3 bg-gray-100 rounded-xl hover:bg-saffron hover:text-white transition-colors"
            >
              <Menu className="size-7" />
            </button>
            <div>
              <h1 className="text-3xl font-black text-charcoal tracking-tighter uppercase leading-none italic">
                {menuItems.find(m => isActive(m.path))?.label || "Admin Board"}
              </h1>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mt-1">BHARATIYA CORE PANEL</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/" className="hidden sm:flex items-center gap-3 px-6 py-3 bg-charcoal text-white font-black rounded-xl hover:bg-saffron transition-all text-[10px] tracking-widest uppercase shadow-xl">
              <Globe className="size-4" />
              VIEW PORTAL
            </Link>
            <div className={`hidden lg:flex items-center gap-4 px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-border bg-white shadow-sm`}>
              <div className={`size-2 rounded-full ${isCloudSyncing ? "bg-saffron animate-spin" : "bg-accent"}`}></div>
              {isCloudSyncing ? "SYNCING..." : "LIVE SYNC"}
            </div>
            <div className="size-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 relative hover:bg-saffron hover:text-white transition-all cursor-pointer border border-border shadow-sm">
               <Bell className="size-6" />
               <div className="absolute -top-1 -right-1 size-3.5 bg-saffron border-4 border-white rounded-full"></div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 bg-gray-50/30">
          <div className="max-w-7xl mx-auto pb-32">
             <Outlet />
          </div>
        </main>
      </div>

      {/* ── MOBILE OVERLAY SIDEBAR ── */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-charcoal/20 backdrop-blur-md" onClick={() => setIsSidebarOpen(false)}>
           <aside 
             className="absolute inset-y-0 left-0 w-80 bg-white p-10 flex flex-col border-r border-border"
             onClick={(e) => e.stopPropagation()}
           >
              <div className="flex justify-between items-center mb-16">
                 <div className="flex items-center gap-4">
                    <div className="size-12 bg-saffron text-white rounded-2xl flex items-center justify-center shadow-xl shadow-saffron/20">
                       <Shield className="size-7" />
                    </div>
                    <span className="font-black text-2xl text-charcoal tracking-tighter uppercase italic">HQ</span>
                 </div>
                 <button onClick={() => setIsSidebarOpen(false)} className="p-3 hover:bg-gray-100 rounded-xl">
                    <X className="size-8 text-gray-400" />
                 </button>
              </div>

              <nav className="flex-grow space-y-4">
                 {menuItems.map(item => {
                   const Icon = item.icon;
                   const active = isActive(item.path);
                   return (
                     <Link key={item.path} to={item.path} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-5 p-6 rounded-2xl transition-all ${active ? 'bg-saffron/10 text-saffron border border-saffron/10 shadow-sm' : 'text-gray-400'}`}>
                        <Icon className="size-7" />
                        <span className="font-black uppercase tracking-[0.2em] text-xs">{item.label}</span>
                     </Link>
                   );
                 })}
              </nav>
              
              <button onClick={handleLogout} className="mt-auto flex items-center gap-5 p-6 text-gray-400 font-black uppercase tracking-widest text-xs hover:text-saffron">
                 <LogOut className="size-7" /> LOG OUT
              </button>
           </aside>
        </div>
      )}
    </div>
  );
}

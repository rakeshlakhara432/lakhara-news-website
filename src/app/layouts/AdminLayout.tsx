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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_center,rgba(211,47,47,0.05)_0,transparent_100%)]">
        <div className="w-full max-w-md relative z-10">
          <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-2xl text-center space-y-8">
            <div className="flex justify-center mb-4">
              <div className="size-20 bg-primary rounded-full flex items-center justify-center shadow-lg text-white">
                <ShieldCheck className="size-10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                Lakhara <span className="text-primary">Admin</span>
              </h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kewal Pradhikrit Pravesh</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative group">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-300 group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  placeholder="Password Likhein..."
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setLoginError("");
                  }}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-xl pl-12 pr-4 py-4 font-bold text-gray-900 outline-none transition-all text-center tracking-widest placeholder:text-gray-200"
                  autoFocus
                  required
                />
              </div>
              
              {loginError && (
                <div className="text-red-600 text-[10px] font-black uppercase tracking-widest bg-red-50 py-2 rounded">
                  PASSWORD GALAT HAI
                </div>
              )}

              <button
                type="submit"
                className="btn-simple w-full !py-4 shadow-lg"
              >
                LOG IN KAREIN
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full py-4 text-gray-400 font-bold uppercase tracking-widest text-[9px] hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="size-3" /> WAPAS JAYEIN
              </button>
            </form>
          </div>
          <p className="text-center text-[9px] font-bold text-gray-300 mt-10 uppercase tracking-[0.4em]">Secure Database Connection • v2.4.0</p>
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
    <div className="min-h-screen bg-gray-50 flex h-screen overflow-hidden text-gray-900 font-sans">
      {/* ── SIMPLE SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-200 relative z-50">
        <div className="p-8 border-b border-gray-100 flex items-center gap-3">
          <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white shadow shadow-primary/20">
            <LayoutDashboard className="size-6" />
          </div>
          <div>
            <span className="font-black text-lg tracking-tighter block leading-none text-gray-900 uppercase">ADMIN HQ</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Lakhara News</span>
          </div>
        </div>

        <nav className="flex-grow px-4 space-y-1 overflow-y-auto no-scrollbar pt-8">
          <p className="text-[9px] font-bold text-gray-300 tracking-[0.4em] px-4 mb-4 uppercase">Menu Control</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl group transition-all duration-300 border-2 ${
                  active
                    ? "bg-primary/5 text-primary border-primary/20 shadow-sm"
                    : "text-gray-400 hover:text-gray-900 hover:bg-gray-100 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`size-5 transition-colors ${active ? 'text-primary' : 'group-hover:text-primary'}`} />
                  <span className="font-bold text-sm tracking-tight uppercase">{item.label}</span>
                </div>
                {active && <div className="size-1.5 bg-primary rounded-full animate-pulse"></div>}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-100 space-y-3">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-primary hover:bg-primary/5 transition-all font-bold text-xs uppercase tracking-widest"
           >
             <LogOut className="size-4" />
             LOG OUT
           </button>
           <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 border border-gray-100">
              <div className="size-2 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Server Live</span>
           </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white relative">
        <header className="px-8 py-5 flex items-center justify-between z-40 bg-white border-b border-gray-100">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 bg-gray-100 rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              <Menu className="size-6" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                {menuItems.find(m => isActive(m.path))?.label || "Admin Dashboard"}
              </h1>
              <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.4em] mt-1">Control Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-primary transition-all text-[10px] tracking-widest uppercase">
              <Globe className="size-4" />
              VIEW SITE
            </Link>
            <div className={`hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest border border-gray-100 bg-gray-50`}>
              <div className={`size-1.5 rounded-full ${isCloudSyncing ? "bg-primary animate-spin" : "bg-green-500"}`}></div>
              {isCloudSyncing ? "SYNCING..." : "LIVE SYNC"}
            </div>
            <div className="size-11 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 relative hover:bg-primary hover:text-white transition-all cursor-pointer border border-gray-100">
               <Bell className="size-5" />
               <div className="absolute -top-1 -right-1 size-3 bg-primary border-2 border-white rounded-full"></div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50/50">
          <div className="max-w-6xl mx-auto pb-20">
             <Outlet />
          </div>
        </main>
      </div>

      {/* ── MOBILE SIDEBAR ── */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-gray-950/20 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}>
           <aside 
             className="absolute inset-y-0 left-0 w-80 bg-white p-8 flex flex-col border-r border-gray-200"
             onClick={(e) => e.stopPropagation()}
           >
              <div className="flex justify-between items-center mb-12">
                 <div className="flex items-center gap-3">
                    <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
                       <LayoutDashboard className="size-6" />
                    </div>
                    <span className="font-black text-xl text-gray-900 tracking-tighter uppercase">ADMIN</span>
                 </div>
                 <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="size-7 text-gray-400" />
                 </button>
              </div>

              <nav className="flex-grow space-y-3">
                 {menuItems.map(item => {
                   const Icon = item.icon;
                   const active = isActive(item.path);
                   return (
                     <Link key={item.path} to={item.path} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-4 p-5 rounded-xl transition-all border-2 ${active ? 'bg-primary/5 text-primary border-primary/20 shadow-sm' : 'text-gray-400 border-transparent'}`}>
                        <Icon className="size-6" />
                        <span className="font-bold uppercase tracking-widest text-xs">{item.label}</span>
                     </Link>
                   );
                 })}
              </nav>
              
              <button onClick={handleLogout} className="mt-auto flex items-center gap-4 p-5 text-gray-400 font-bold uppercase tracking-widest text-[10px] hover:text-primary">
                 <LogOut className="size-6" /> LOG OUT
              </button>
           </aside>
        </div>
      )}
    </div>
  );
}

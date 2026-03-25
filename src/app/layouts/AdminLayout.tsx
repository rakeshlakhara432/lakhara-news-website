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
} from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "../data/database";

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
  }, [location.pathname]); // Re-sync on navigation inside admin

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
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] size-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] size-[500px] bg-orange-500/10 rounded-full blur-[120px]"></div>

        <div className="w-full max-w-md relative z-10">
          <div className="glass p-10 md:p-12 rounded-[3rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] text-center">
            <div className="flex justify-center mb-10">
              <div className="size-20 bg-lakhara rounded-3xl flex items-center justify-center shadow-lakhara rotate-[-10deg]">
                <Shield className="size-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-black text-white italic tracking-tighter mb-4">LAKHARA <span className="text-gradient">ADMIN</span></h1>
            <p className="text-gray-500 font-bold mb-10 uppercase tracking-[0.2em] text-[10px]">Secure Access Protocol</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  placeholder="Secret Access Token..."
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setLoginError("");
                  }}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-5 font-bold text-white outline-none focus:bg-white/10 focus:border-primary/50 transition-all text-lg"
                  autoFocus
                  required
                />
              </div>
              
              {loginError && (
                <div className="bg-red-500/10 border border-red-500/20 py-3 rounded-xl text-red-500 text-xs font-black uppercase tracking-widest animate-bounce">
                  Access Denied
                </div>
              )}

              <button
                type="submit"
                className="w-full btn-lakhara !py-5 !text-lg"
              >
                Unlock Dashboard
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full py-4 text-gray-500 font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors"
              >
                ← Return to Public Network
              </button>
            </form>
          </div>
          
          <p className="text-center text-[9px] font-black text-gray-600 mt-10 uppercase tracking-[0.5em]">
            Default: admin123 • Encrypted Session
          </p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/articles", label: "Manage Articles", icon: FileText },
    { path: "/admin/categories", label: "Manage Categories", icon: FolderOpen },
    { path: "/admin/videos", label: "Video Control", icon: Shield },
    { path: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-white flex h-screen overflow-hidden font-sans">
      {/* ── Desktop Command Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-80 bg-gray-950 border-r border-white/5 relative z-50">
        <div className="p-10">
          <Link to="/admin" className="flex items-center gap-3 active:scale-95 transition-transform">
            <div className="size-12 bg-lakhara rounded-2xl flex items-center justify-center shadow-lakhara">
              <LayoutDashboard className="size-6 text-white" />
            </div>
            <div>
              <span className="font-black text-xl italic text-white tracking-tighter block leading-none">COMMAND</span>
              <span className="text-gradient font-black text-[10px] uppercase tracking-[0.4em] leading-none">Lakhara News</span>
            </div>
          </Link>
        </div>

        <nav className="flex-grow px-6 space-y-2 overflow-y-auto no-scrollbar pt-6">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] px-4 mb-6">Operations</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl group transition-all duration-300 ${
                  active
                    ? "bg-lakhara text-white shadow-lakhara translate-x-1"
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon className={`size-5 transition-transform duration-500 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="font-bold text-sm tracking-wide">{item.label}</span>
                </div>
                {active && <div className="size-1.5 bg-white rounded-full animate-pulse"></div>}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-white/5 space-y-4">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-gray-500 hover:text-red-500 hover:bg-red-500/5 transition-all font-bold"
           >
             <LogOut className="size-5" />
             Exit Session
           </button>
           <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
              <div className="size-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Network Secure</span>
           </div>
        </div>
      </aside>

      {/* ── Main Operations Center ── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#fcfcfc] relative">
        {/* Floating Header */}
        <header className="px-6 md:px-10 py-6 flex items-center justify-between z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
            >
              <Menu className="size-6 text-gray-900" />
            </button>
            <div className="hidden md:block">
              <h1 className="text-2xl font-black text-gray-900 tracking-tighter italic uppercase">
                {menuItems.find(m => isActive(m.path))?.label || "Dashboard"}
              </h1>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Network Control Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/" className="hidden sm:flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 font-bold rounded-2xl hover:bg-gray-200 transition-all text-sm">
              <ArrowLeft className="size-4" />
              Live Network
            </Link>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${isCloudSyncing ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"}`}>
              <div className={`size-1.5 rounded-full ${isCloudSyncing ? "bg-blue-500 animate-spin" : "bg-green-500 shadow-sm shadow-green-200"}`}></div>
              {isCloudSyncing ? "Syncing..." : "Cloud Live"}
            </div>
            <div className="size-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-900 relative group cursor-pointer hover:bg-primary hover:text-white transition-all">
               <Bell className="size-6" />
               <div className="absolute -top-1 -right-1 size-4 bg-primary border-4 border-white rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Content Flow */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
          <div className="max-w-7xl mx-auto space-y-10 pb-20">
             <Outlet />
          </div>
        </main>
      </div>

      {/* ── Mobile Sidebar Overhaul ── */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
           <aside className="absolute inset-y-0 left-0 w-80 bg-gray-950 p-10 flex flex-col animate-in slide-in-from-left duration-500">
              <div className="flex justify-between items-center mb-16">
                 <div className="flex items-center gap-3">
                    <div className="size-10 bg-lakhara rounded-xl flex items-center justify-center shadow-lakhara">
                       <LayoutDashboard className="size-5 text-white" />
                    </div>
                    <span className="font-black text-xl text-white tracking-tighter">COMMAND</span>
                 </div>
                 <button onClick={() => setIsSidebarOpen(false)} className="size-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                    <X className="size-6" />
                 </button>
              </div>

              <nav className="flex-grow space-y-4">
                 {menuItems.map(item => {
                   const Icon = item.icon;
                   const active = isActive(item.path);
                   return (
                     <Link key={item.path} to={item.path} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-4 p-5 rounded-2xl transition-all ${active ? 'bg-lakhara text-white shadow-lakhara' : 'text-gray-500'}`}>
                        <Icon className="size-6" />
                        <span className="font-bold">{item.label}</span>
                     </Link>
                   );
                 })}
              </nav>
              
              <button onClick={handleLogout} className="mt-auto flex items-center gap-4 p-5 text-gray-500 font-bold">
                 <LogOut className="size-6" /> Exit Station
              </button>
           </aside>
        </div>
      )}
    </div>
  );
}

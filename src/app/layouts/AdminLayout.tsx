import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Bell,
  Settings,
  LogOut,
  Shield,
  Search,
  Plus,
  ArrowLeft,
  Menu,
  X,
  Users,
  Heart,
  Calendar,
  Image,
  Megaphone,
  ShoppingBag,
  Book,
  BarChart3,
  ShieldCheck,
  MessageCircle,
  GraduationCap,
  CreditCard,
  Play,
  Globe,
  User,
  Command
} from "lucide-react";
import { useEffect, useState } from "react";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Temporarily true for demo, should check JWT

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/admin/members", label: "Members", icon: Users },
    { path: "/admin/matrimonial", label: "Matrimonial", icon: Heart },
    { path: "/admin/events", label: "Events", icon: Calendar },
    { path: "/admin/news", label: "Samaj News", icon: Megaphone },
    { path: "/admin/store", label: "Store", icon: ShoppingBag },
    { path: "/admin/ebooks", label: "E-Library", icon: Book },
    { path: "/admin/gallery", label: "Gallery", icon: Image },
    { path: "/admin/notices", label: "Notices", icon: Bell },
    { path: "/admin/committee", label: "Committee", icon: ShieldCheck },
    { path: "/admin/support", label: "Education", icon: GraduationCap },
    { path: "/admin/messages", label: "Messages", icon: MessageCircle },
    { path: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('lakhara_auth_token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex h-screen overflow-hidden font-main text-slate-900">
      
      {/* ── PREMIUM SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-950 text-white relative z-50">
        <div className="p-8 border-b border-white/5 flex items-center gap-4">
          <div className="size-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <Command className="size-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tighter italic leading-none uppercase">Admin <span className="text-indigo-400">Hub</span></h2>
            <p className="text-[7px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1.5">Lakhara Network</p>
          </div>
        </div>

        <nav className="flex-grow px-4 py-8 space-y-1 overflow-y-auto no-scrollbar">
          <p className="text-[8px] font-black text-slate-600 tracking-[0.5em] px-4 mb-4 uppercase">Navigation Control</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                  active
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 translate-x-2"
                    : "text-slate-500 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`size-5 transition-colors ${active ? 'text-white' : 'group-hover:text-indigo-400'}`} />
                <span className="font-black text-[11px] uppercase tracking-wider">{item.label}</span>
                {active && <div className="ml-auto size-1.5 bg-white/40 rounded-full animate-pulse" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4">
           <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                 <div className="size-8 rounded-full bg-indigo-500 flex items-center justify-center font-black text-[10px]">RL</div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-tight">Rakesh Lakhara</p>
                    <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">System Owner</p>
                 </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all font-black text-[9px] uppercase tracking-[0.2em] border border-white/10 hover:border-red-500/20"
              >
                <LogOut className="size-3.5" /> Log Out
              </button>
           </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* ── MODERN TOP BAR ── */}
        <header className="h-20 px-8 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-100 z-40">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-3 bg-slate-50 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all border border-slate-100"
            >
              <Menu className="size-5" />
            </button>
            <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 bg-slate-50 rounded-2xl border border-slate-100 focus-within:bg-white focus-within:border-indigo-200 transition-all w-80">
               <Search className="size-4 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search command..." 
                 className="bg-transparent border-none outline-none w-full text-xs font-bold text-slate-800 placeholder:text-slate-400" 
               />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 mr-4">
               <div className="size-2 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Server: Online</span>
            </div>
            
            <button className="relative p-3 bg-slate-50 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100 group">
               <Bell className="size-5" />
               <div className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white"></div>
            </button>
            
            <Link to="/" className="flex items-center gap-2.5 px-6 py-2.5 bg-slate-950 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all text-[10px] tracking-widest uppercase shadow-xl hover:scale-105 active:scale-95">
              <Globe className="size-4" />
              Live Portal
            </Link>
          </div>
        </header>

        {/* ── VIEWPORT ── */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-8 no-scrollbar">
          <div className="max-w-[1600px] mx-auto">
             <Outlet />
          </div>
        </main>

        {/* ── DECORATIVE MANDALA ── */}
        <div className="absolute bottom-0 right-0 size-[600px] opacity-[0.03] pointer-events-none translate-x-1/2 translate-y-1/2">
           <img src="/brand-logo.png" alt="" className="size-full object-contain grayscale" />
        </div>
      </div>

      {/* ── MOBILE OVERLAY MENU ── */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-md" onClick={() => setIsSidebarOpen(false)}>
           <aside 
             className="absolute inset-y-0 left-0 w-80 bg-slate-950 text-white flex flex-col shadow-2xl animate-in slide-in-from-left duration-500"
             onClick={(e) => e.stopPropagation()}
           >
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="size-9 bg-indigo-600 rounded-xl flex items-center justify-center p-1.5">
                       <Command className="size-full text-white" />
                    </div>
                    <h2 className="text-xl font-black tracking-tighter italic uppercase leading-none">Admin Hub</h2>
                 </div>
                 <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all">
                    <X className="size-6" />
                 </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-6 space-y-1">
                 {menuItems.map(item => (
                   <Link
                     key={item.path}
                     to={item.path}
                     onClick={() => setIsSidebarOpen(false)}
                     className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                       isActive(item.path)
                         ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20'
                         : 'text-slate-500 hover:text-white hover:bg-white/5'
                     }`}
                   >
                      <item.icon className="size-5" />
                      <span className="font-black uppercase tracking-wider text-[11px]">{item.label}</span>
                   </Link>
                 ))}
              </nav>
           </aside>
        </div>
      )}
    </div>
  );
}

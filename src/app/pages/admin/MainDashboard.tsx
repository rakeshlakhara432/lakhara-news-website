import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { 
  Users, Heart, Calendar, MessageCircle, Activity, 
  ShieldCheck, Megaphone, GraduationCap, Image as ImageIcon,
  TrendingUp, Zap, Star, Bot, ShoppingBag, Package, Book, Bell, BarChart3,
  ArrowUpRight, Clock, CheckCircle2, AlertCircle
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts";
import { adminService } from "../../services/api";

export function MainDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getStats();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const growthData = [
    { name: "Mon", users: 40 },
    { name: "Tue", users: 55 },
    { name: "Wed", users: 48 },
    { name: "Thu", users: 70 },
    { name: "Fri", users: 85 },
    { name: "Sat", users: 95 },
    { name: "Sun", users: stats?.totalMembers || 120 },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="size-12 bg-slate-200 rounded-full"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* WELCOME HEADER */}
      <section className="relative overflow-hidden bg-slate-950 rounded-[2.5rem] p-10 text-white shadow-2xl">
         <div className="absolute top-0 right-0 size-96 bg-indigo-600/20 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
                  <div className="size-2 bg-emerald-400 rounded-full animate-ping"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">System Live</span>
               </div>
               <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none italic uppercase">
                  WELCOME BACK, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">RAKESH</span>
               </h1>
            </div>
         </div>
      </section>

      {/* KPI CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Total Members", val: stats?.totalMembers || 0, icon: Users, color: "from-indigo-600 to-blue-500" },
           { label: "Pending Approvals", val: stats?.pendingMembers || 0, icon: AlertCircle, color: "from-orange-600 to-amber-500" },
           { label: "Matrimonial", val: stats?.totalProfiles || 0, icon: Heart, color: "from-rose-600 to-pink-500" },
           { label: "Samaj Events", val: stats?.totalEvents || 0, icon: Calendar, color: "from-emerald-600 to-teal-500" }
         ].map((card, i) => (
           <div key={i} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                 <div className={`size-14 bg-gradient-to-br ${card.color} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
                    <card.icon className="size-7" />
                 </div>
              </div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
              <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{card.val}</p>
           </div>
         ))}
      </section>

      {/* GROWTH CHART */}
      <section className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
         <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic mb-10">Growth Performance</h2>
         <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={4} fill="#4f46e520" />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Manage Members", path: "/admin/members", icon: Users },
           { label: "View Analytics", path: "/admin/analytics", icon: BarChart3 },
           { label: "Notice Board", path: "/admin/notices", icon: Bell },
           { label: "System Shield", path: "/admin/shield", icon: ShieldCheck }
         ].map((action, i) => (
           <button 
             key={i} 
             onClick={() => navigate(action.path)}
             className="flex flex-col items-center gap-4 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-all"
           >
              <div className="size-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                 <action.icon className="size-7" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest">{action.label}</span>
           </button>
         ))}
      </section>

    </div>
  );
}

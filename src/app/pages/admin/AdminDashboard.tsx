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

export function AdminDashboard() {
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
      
      {/* 👑 PREMIUM WELCOME HEADER */}
      <section className="relative overflow-hidden bg-slate-950 rounded-[2.5rem] p-10 text-white shadow-2xl">
         <div className="absolute top-0 right-0 size-96 bg-indigo-600/20 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse"></div>
         <div className="absolute bottom-0 left-0 size-64 bg-emerald-600/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
                  <div className="size-2 bg-emerald-400 rounded-full animate-ping"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">System Live • v4.0</span>
               </div>
               <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none italic">
                  WELCOME BACK, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 uppercase">RAKESH</span>
               </h1>
               <p className="text-slate-400 font-medium text-sm max-w-md">
                  Everything looks great today. The community is growing, and all systems are performing optimally at 99.9% uptime.
               </p>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-md text-center min-w-[120px]">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Health Score</p>
                  <p className="text-3xl font-black text-emerald-400 tracking-tighter">98%</p>
               </div>
               <div className="bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-md text-center min-w-[120px]">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Now</p>
                  <p className="text-3xl font-black text-indigo-400 tracking-tighter">24</p>
               </div>
            </div>
         </div>
      </section>

      {/* 📊 KPI CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Total Members", val: stats?.totalMembers || 0, icon: Users, color: "from-indigo-600 to-blue-500", trend: "+12.5%", desc: "Lifetime growth" },
           { label: "Pending Approvals", val: stats?.pendingMembers || 0, icon: AlertCircle, color: "from-orange-600 to-amber-500", trend: "Needs Action", desc: "Awaiting review" },
           { label: "Matrimonial", val: stats?.totalProfiles || 0, icon: Heart, color: "from-rose-600 to-pink-500", trend: "Active", desc: "Matchmaking index" },
           { label: "Samaj Events", val: stats?.totalEvents || 0, icon: Calendar, color: "from-emerald-600 to-teal-500", trend: "Ongoing", desc: "Community engagement" }
         ].map((card, i) => (
           <div key={i} className="group relative bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-default">
              <div className="flex items-start justify-between mb-6">
                 <div className={`size-14 bg-gradient-to-br ${card.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <card.icon className="size-7" />
                 </div>
                 <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${card.label.includes('Pending') ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                    {card.trend}
                 </span>
              </div>
              <div>
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
                 <p className="text-4xl font-black text-slate-900 tracking-tighter mb-2 leading-none">{card.val}</p>
                 <p className="text-[10px] font-medium text-slate-500">{card.desc}</p>
              </div>
              <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                 <ArrowUpRight className="size-5 text-slate-300" />
              </div>
           </div>
         ))}
      </section>

      {/* 📈 MAIN ANALYTICS ROW */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Growth Performance</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2 italic">Real-time engagement analysis</p>
               </div>
               <div className="flex items-center gap-2">
                  <div className="size-3 bg-indigo-600 rounded-full"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">User Traffic</span>
               </div>
            </div>
            <div className="h-[350px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                     <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} dy={15} />
                     <YAxis hide />
                     <Tooltip 
                        contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '1.5rem'}}
                        itemStyle={{fontSize: '12px', fontWeight: '900', color: '#4f46e5'}}
                     />
                     <Area type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 size-64 bg-indigo-600/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
            <h2 className="text-2xl font-black tracking-tighter uppercase italic leading-none mb-8">System Activity</h2>
            
            <div className="space-y-8">
               {[
                 { label: "Articles Published", val: stats?.totalArticles || 0, icon: Megaphone, color: "text-indigo-400", bg: "bg-indigo-400/10" },
                 { label: "Community Support", val: 12, icon: GraduationCap, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                 { label: "Digital E-Books", val: 45, icon: Book, color: "text-amber-400", bg: "bg-amber-400/10" },
                 { label: "Gallery Media", val: 230, icon: ImageIcon, color: "text-rose-400", bg: "bg-rose-400/10" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className={`size-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <item.icon className="size-6" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</p>
                          <p className="text-xl font-black">{item.val}</p>
                       </div>
                    </div>
                    <ArrowUpRight className="size-4 text-slate-700 group-hover:text-white transition-colors" />
                 </div>
               ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 space-y-4">
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Storage Usage</span>
                  <span>64%</span>
               </div>
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[64%] rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
               </div>
            </div>
         </div>
      </section>

      {/* 🚀 QUICK ACCESS & TOOLS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Manage Members", path: "/admin/members", icon: Users, color: "hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200" },
           { label: "View Analytics", path: "/admin/analytics", icon: BarChart3, color: "hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200" },
           { label: "Notice Board", path: "/admin/notices", icon: Bell, color: "hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200" },
           { label: "System Shield", path: "/admin/shield", icon: ShieldCheck, color: "hover:bg-slate-900 hover:text-white hover:border-slate-800" }
         ].map((action, i) => (
           <button 
             key={i} 
             onClick={() => navigate(action.path)}
             className={`flex flex-col items-center gap-4 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all duration-300 group ${action.color}`}
           >
              <div className="size-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all shadow-inner">
                 <action.icon className="size-7" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-center">{action.label}</span>
           </button>
         ))}
      </section>

      {/* 🕒 ACTIVITY FEED MOCKUP */}
      <section className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
         <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Global Log Feed</h2>
            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View All Records</button>
         </div>
         
         <div className="space-y-6">
            {[
              { type: 'member', user: 'Sunil Lakhara', action: 'applied for membership', time: '2 mins ago', icon: Users, color: 'text-indigo-600 bg-indigo-50' },
              { type: 'news', user: 'Admin', action: 'published breaking news', time: '45 mins ago', icon: Megaphone, color: 'text-emerald-600 bg-emerald-50' },
              { type: 'matrimonial', user: 'Anjali Lakhara', action: 'updated profile photos', time: '3 hours ago', icon: Heart, color: 'text-rose-600 bg-rose-50' },
              { type: 'order', user: 'Rahul Solanki', action: 'placed a new order #4521', time: '5 hours ago', icon: ShoppingBag, color: 'text-amber-600 bg-amber-50' }
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 group cursor-pointer hover:bg-slate-50/50 px-4 -mx-4 rounded-2xl transition-colors">
                 <div className="flex items-center gap-4">
                    <div className={`size-12 ${log.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                       <log.icon className="size-5" />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-900">
                          <span className="text-indigo-600">{log.user}</span> {log.action}
                       </p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{log.time} • LOG_ID_{Math.floor(Math.random()*10000)}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="size-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <ArrowUpRight className="size-4 text-slate-300" />
                 </div>
              </div>
            ))}
         </div>
      </section>

    </div>
  );
}

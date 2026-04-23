import { useState, useEffect } from "react";
import { 
  Users, Heart, Calendar, MessageCircle, TrendingUp, 
  ShoppingBag, Book, Megaphone, BarChart3, Activity,
  Bell, UserCheck, GraduationCap, Image as ImageIcon,
  ShieldCheck, ArrowUpRight, Download, Star, Eye, CheckCircle
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";
import { adminService } from "../../services/api";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6", "#06b6d4"];

export function AnalyticsDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await adminService.getAnalytics();
        if (res.success) {
          setStats(res.data);
        }
      } catch (error) {
        toast.error("Failed to load analytics from Java server");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
         <Activity className="size-10 text-indigo-600 animate-pulse" />
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Processing Live Data...</p>
      </div>
    );
  }

  const chartData = stats?.growth ? stats.growth.labels.map((l: string, i: number) => ({
    name: l,
    value: stats.growth.data[i]
  })) : [];

  const pieData = [
    { name: "Members", value: 45 },
    { name: "Reviews", value: 25 },
    { name: "Sales", value: 15 },
    { name: "Events", value: 15 },
  ];

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-1000">
      
      {/* ── PREMIUM HEADER ── */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex items-center gap-6">
            <div className="size-16 bg-slate-950 text-white rounded-2xl flex items-center justify-center shadow-xl">
               <BarChart3 className="size-8" />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Command <span className="text-indigo-600">Analytics</span></h1>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Real-time Performance Metrics</p>
            </div>
         </div>
         
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-slate-100">
               <Download className="size-4" /> Export Report
            </button>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20">
               Refresh Data
            </button>
         </div>
      </div>

      {/* ── KEY METRICS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Total Site Views", val: stats?.totalViews || "15.4K", icon: Eye, color: "text-blue-600 bg-blue-50", trend: "+24%" },
           { label: "Community Reviews", val: stats?.newReviews || "48", icon: Star, color: "text-amber-600 bg-amber-50", trend: "Positive" },
           { label: "Active Members", val: stats?.activeUsers || "230", icon: Users, color: "text-indigo-600 bg-indigo-50", trend: "+12%" },
           { label: "Approval Queue", val: "14", icon: CheckCircle, color: "text-emerald-600 bg-emerald-50", trend: "Immediate" }
         ].map((card, i) => (
           <div key={i} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="flex items-start justify-between mb-6">
                 <div className={`size-14 ${card.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                    <card.icon className="size-7" />
                 </div>
                 <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">{card.trend}</span>
              </div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
              <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{card.val}</p>
           </div>
         ))}
      </div>

      {/* ── CHARTS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Growth Trajectory</h2>
               <div className="flex items-center gap-2">
                  <div className="size-3 bg-indigo-600 rounded-full"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">User Acquisition</span>
               </div>
            </div>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} dy={10} />
                     <YAxis hide />
                     <Tooltip 
                        contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: '900'}}
                     />
                     <Bar dataKey="value" fill="#4f46e5" radius={[10, 10, 10, 10]} barSize={40} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none mb-10">Traffic Share</h2>
            <div className="flex-1 min-h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                        {pieData.map((_, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                     </Pie>
                     <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
               {pieData.map((d, i) => (
                 <div key={i} className="flex items-center gap-2">
                    <div className="size-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d.name}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* ── ACTION CENTER ── */}
      <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 size-64 bg-indigo-600/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
         <h2 className="text-2xl font-black tracking-tighter uppercase italic leading-none mb-10">Advanced Command Center</h2>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Site Shield", icon: ShieldCheck, color: "bg-indigo-600", desc: "Security Firewall" },
              { label: "Auto Approve", icon: CheckCircle, color: "bg-emerald-600", desc: "System Logic" },
              { label: "Global Sync", icon: Activity, color: "bg-blue-600", desc: "Database Bridge" },
              { label: "Notices", icon: Bell, color: "bg-rose-600", desc: "Push Broadcast" }
            ].map((btn, i) => (
              <button key={i} className="group bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white hover:text-slate-950 transition-all duration-500 text-left">
                 <div className={`size-12 ${btn.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <btn.icon className="size-6" />
                 </div>
                 <p className="text-[11px] font-black uppercase tracking-widest leading-none mb-1">{btn.label}</p>
                 <p className="text-[9px] font-bold text-slate-500 group-hover:text-slate-400 uppercase tracking-widest">{btn.desc}</p>
              </button>
            ))}
         </div>
      </div>

    </div>
  );
}

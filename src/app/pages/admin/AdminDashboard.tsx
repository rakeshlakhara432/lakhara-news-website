import { useState, useEffect } from "react";
import { 
  Users, Heart, Calendar, MessageCircle, Activity, Shield, 
  ShieldCheck, Megaphone, GraduationCap, Image as ImageIcon,
  TrendingUp, Zap, Star
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { samajService } from "../../services/samajService";

export function AdminDashboard() {
  const [stats, setStats] = useState({
    members: 0,
    matrimonial: 0,
    events: 0,
    messages: 0,
    committee: 0,
    news: 0,
    support: 0,
    gallery: 0
  });

  useEffect(() => {
    const unsub1 = samajService.subscribeToMembers(d => setStats(p => ({...p, members: d.length})));
    const unsub2 = samajService.subscribeToMatrimonial(d => setStats(p => ({...p, matrimonial: d.length})));
    const unsub3 = samajService.subscribeToEvents(d => setStats(p => ({...p, events: d.length})));
    const unsub4 = samajService.subscribeToMessages(d => setStats(p => ({...p, messages: d.length})));
    const unsub5 = samajService.subscribeToCommittee(d => setStats(p => ({...p, committee: d.length})));
    const unsub6 = samajService.subscribeToSamajNews(d => setStats(p => ({...p, news: d.length})));
    const unsub7 = samajService.subscribeToSupport(d => setStats(p => ({...p, support: d.length})));
    const unsub8 = samajService.subscribeToGallery(d => setStats(p => ({...p, gallery: d.length})));

    return () => { 
      unsub1(); unsub2(); unsub3(); unsub4(); 
      unsub5(); unsub6(); unsub7(); unsub8();
    };
  }, []);

  const distributionData = [
    { name: "Members", value: stats.members, color: "#f97316" },
    { name: "Matrimonial", value: stats.matrimonial, color: "#ec4899" },
    { name: "Events", value: stats.events, color: "#eab308" },
    { name: "News", value: stats.news, color: "#0ea5e9" }
  ].filter(d => d.value > 0);

  const activityData = [
    { name: "Jan", activity: 40 },
    { name: "Feb", activity: 30 },
    { name: "Mar", activity: 60 },
    { name: "Apr", activity: 80 },
    { name: "May", activity: 95 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      
      {/* 🚀 HEADER & STATUS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="flex items-center gap-6 border-l-[10px] border-primary pl-10 py-2">
            <div>
               <h1 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">Samaj <span className="text-primary italic">Control</span> Hub</h1>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2 italic shadow-inner">Real-time Community Intelligence v4.0</p>
            </div>
         </div>
         <div className="flex items-center gap-4 px-8 py-3 bg-gray-950 text-white rounded-[2rem] shadow-2xl border border-white/5">
            <Activity className="size-4 text-primary animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] italic">System Active &bull; Verified</span>
         </div>
      </div>

      {/* 📊 CORE STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Community Members", val: stats.members, icon: Users, color: "bg-orange-50 text-orange-600" },
          { label: "Matrimonial Matches", val: stats.matrimonial, icon: Heart, color: "bg-pink-50 text-pink-600" },
          { label: "Live Events", val: stats.events, icon: Calendar, color: "bg-amber-50 text-amber-600" },
          { label: "Executive Council", val: stats.committee, icon: ShieldCheck, color: "bg-gray-100 text-gray-950" }
        ].map((stat, i) => (
          <div key={i} className="group bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-bhagva transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 size-24 bg-gradient-to-br from-primary/5 to-transparent rotate-[-45deg] scale-150 group-hover:scale-175 transition-transform duration-700"></div>
            <div className={`size-14 ${stat.color} rounded-[1.5rem] flex items-center justify-center mb-6 shadow-md shadow-black/5`}>
              <stat.icon className="size-7" />
            </div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 italic">{stat.label}</p>
            <p className="text-4xl font-black text-gray-950 tracking-tighter leading-none italic">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* 📈 CHARTS SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         
         {/* GROWTH TREND */}
         <div className="xl:col-span-2 bg-white rounded-[3.5rem] border border-gray-100 p-10 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-12">
               <h2 className="text-sm font-black text-gray-950 uppercase tracking-widest flex items-center gap-4 italic">
                  <TrendingUp className="size-5 text-primary" /> Community Growth Analytics
               </h2>
               <div className="flex gap-2">
                  <div className="h-2 w-8 bg-primary rounded-full"></div>
                  <div className="h-2 w-2 bg-gray-100 rounded-full"></div>
               </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
               <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                  <YAxis hide />
                  <Tooltip 
                     cursor={{fill: '#f8fafc'}}
                     contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '1rem'}}
                  />
                  <Bar dataKey="activity" fill="url(#bhagvaGradient)" radius={[10, 10, 10, 10]} barSize={40} />
                  <defs>
                     <linearGradient id="bhagvaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#ea580c" stopOpacity={0.8}/>
                     </linearGradient>
                  </defs>
               </BarChart>
            </ResponsiveContainer>
         </div>

         {/* 🎯 DISTRIBUTION PIE */}
         <div className="bg-white rounded-[3.5rem] border border-gray-100 p-10 shadow-sm flex flex-col items-center">
            <h2 className="text-sm font-black text-gray-950 uppercase tracking-widest mb-10 italic text-center">Entity Distribution</h2>
            <div className="flex-grow w-full h-[240px]">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={distributionData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {distributionData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Pie>
                     <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-8">
               {distributionData.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3 border border-gray-100">
                     <div className="size-2 rounded-full" style={{backgroundColor: d.color}}></div>
                     <span className="text-[9px] font-black uppercase text-gray-500 italic">{d.name}</span>
                  </div>
               ))}
            </div>
         </div>

      </div>

      {/* 🔔 SECONDARY STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Announcements", val: stats.news, icon: Megaphone, color: "text-blue-500 bg-blue-50" },
          { label: "Aid Ops", val: stats.support, icon: GraduationCap, color: "text-purple-500 bg-purple-50" },
          { label: "Archived Media", val: stats.gallery, icon: ImageIcon, color: "text-indigo-500 bg-indigo-50" },
          { label: "Total Queries", val: stats.messages, icon: MessageCircle, color: "text-emerald-500 bg-emerald-50" }
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-gray-100 hover:border-primary/20 transition-all cursor-default">
             <div className={`size-12 ${stat.color} rounded-2xl flex items-center justify-center shadow-inner`}>
                <stat.icon className="size-6" />
             </div>
             <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                <p className="text-xl font-black text-gray-950 italic">{stat.val}</p>
             </div>
          </div>
        ))}
      </div>

    </div>
  );
}

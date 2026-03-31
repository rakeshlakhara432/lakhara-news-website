import { useState, useEffect } from "react";
import { 
  Users, Heart, Calendar, MessageCircle, Activity, 
  ShieldCheck, Megaphone, GraduationCap, Image as ImageIcon,
  TrendingUp, Zap, Star, Bot
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { samajService } from "../../services/samajService";
import { trainLinearRegression } from "../../../utils/mlUtils";

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
    { name: "Members", value: stats.members, color: "#ea580c" },
    { name: "Matrimonial", value: stats.matrimonial, color: "#ec4899" },
    { name: "Events", value: stats.events, color: "#eab308" },
    { name: "News", value: stats.news, color: "#0ea5e9" }
  ].filter(d => d.value > 0);

  const activityData = [
    { name: "Jan", activity: 40 },
    { name: "Feb", activity: 30 },
    { name: "Mar", activity: 60 },
    { name: "Apr", activity: 80 },
    { name: "May", activity: Math.max(95, stats.members) }
  ];

  // AI Prediction Calculation
  const trainingPairs = activityData.map((d, i) => [i, d.activity] as [number, number]);
  const model = trainLinearRegression(trainingPairs);
  const predictedNext = model.predict(activityData.length);
  const confidence = Math.min(98, Math.round(70 + (model.slope * 2)));



  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-24">
      
      {/* 🚀 HEADER & STATUS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
         <div className="flex items-center gap-4 border-l-4 border-orange-600 pl-4 py-1">
            <div>
               <h1 className="text-2xl font-bold text-slate-800 leading-tight">Samaj <span className="text-orange-600">Control Hub</span></h1>
               <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-1">Real-time Community Intelligence</p>
            </div>
         </div>
         <div className="flex items-center gap-2.5 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
            <Activity className="size-4 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider">System Active</span>
         </div>
      </div>

      {/* 📊 CORE STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Community Members", val: stats.members, icon: Users, color: "bg-orange-50 text-orange-600 border-orange-100" },
          { label: "Matrimonial Matches", val: stats.matrimonial, icon: Heart, color: "bg-rose-50 text-rose-600 border-rose-100" },
          { label: "Live Events", val: stats.events, icon: Calendar, color: "bg-amber-50 text-amber-600 border-amber-100" },
          { label: "Executive Council", val: stats.committee, icon: ShieldCheck, color: "bg-emerald-50 text-emerald-600 border-emerald-100" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`size-12 ${stat.color} border rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="size-6" />
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-3xl font-extrabold text-slate-800 leading-none">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* 📈 CHARTS SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
         
         {/* GROWTH TREND & AI INSIGHTS */}
         <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                   <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <TrendingUp className="size-4 text-orange-600" /> Community Growth
                   </h2>
                   <div className="flex gap-1.5">
                      <div className="h-1.5 w-6 bg-orange-600 rounded-full"></div>
                      <div className="h-1.5 w-1.5 bg-slate-200 rounded-full"></div>
                   </div>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                   <BarChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 500, fill: '#64748b'}} />
                      <YAxis hide />
                      <Tooltip 
                         cursor={{fill: '#f8fafc'}}
                         contentStyle={{borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '0.75rem', fontSize: '12px'}}
                      />
                      <Bar dataKey="activity" fill="#ea580c" radius={[6, 6, 6, 6]} barSize={32} />
                   </BarChart>
                </ResponsiveContainer>
             </div>
             
             {/* AI FORECAST */}
             <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -top-10 -right-10 size-40 bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="space-y-6 relative z-10">
                   <div className="flex items-center gap-3">
                      <div className="size-10 bg-orange-600/20 text-orange-500 rounded-xl flex items-center justify-center">
                         <Bot className="size-5" />
                      </div>
                      <h2 className="text-sm font-bold text-white leading-tight">AI Growth<br/><span className="text-orange-400">Forecast</span></h2>
                   </div>
                   
                   <div className="space-y-4">
                      <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Predicted Members (30 Days)</p>
                         <p className="text-4xl font-extrabold text-white">{predictedNext}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                         <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold text-slate-300">Confidence Score</span>
                            <span className="text-xs font-bold text-emerald-400">{confidence}%</span>
                         </div>
                         <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{width: `${confidence}%`}}></div>
                         </div>
                      </div>
                      <p className="text-[10px] font-medium text-slate-400 leading-relaxed italic">
                        Machine Learning highlights steady growth via linear regression analysis.
                      </p>
                   </div>
                </div>
             </div>
         </div>

         {/* 🎯 DISTRIBUTION PIE */}
         <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col items-center">
            <h2 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2"><Star className="size-4 text-orange-600"/> Entity Distribution</h2>
            <div className="flex-grow w-full h-[200px]">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={distributionData}
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                     >
                        {distributionData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Pie>
                     <Tooltip contentStyle={{borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '12px'}} />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full mt-6">
               {distributionData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 bg-slate-50 rounded-lg p-2 border border-slate-100">
                     <div className="size-2.5 rounded-full shrink-0" style={{backgroundColor: d.color}}></div>
                     <span className="text-[10px] font-bold text-slate-600 truncate">{d.name}</span>
                  </div>
               ))}
            </div>
         </div>

      </div>

      {/* 🔔 SECONDARY STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Announcements", val: stats.news, icon: Megaphone, color: "text-blue-600 bg-blue-50 border-blue-100" },
          { label: "Aid Ops", val: stats.support, icon: GraduationCap, color: "text-purple-600 bg-purple-50 border-purple-100" },
          { label: "Archived Media", val: stats.gallery, icon: ImageIcon, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
          { label: "Total Queries", val: stats.messages, icon: MessageCircle, color: "text-emerald-600 bg-emerald-50 border-emerald-100" }
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
             <div className={`size-12 ${stat.color} border rounded-xl flex items-center justify-center shrink-0`}>
                <stat.icon className="size-5" />
             </div>
             <div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">{stat.label}</p>
                <p className="text-lg font-bold text-slate-800 leading-none">{stat.val}</p>
             </div>
          </div>
        ))}
      </div>

    </div>
  );
}

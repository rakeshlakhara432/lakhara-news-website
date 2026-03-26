import { useState, useEffect } from "react";
import { getArticles, getCategories } from "../../data/mockData";
import { FileText, Eye, TrendingUp, FolderOpen, Users, Activity, Zap, Shield, Network, Globe, Heart, Calendar, MessageCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { samajService, Member, MatrimonialProfile, SamajEvent, ContactMessage } from "../../services/samajService";

export function AdminDashboard() {
  const [samajStats, setSamajStats] = useState({
    members: 0,
    profiles: 0,
    events: 0,
    messages: 0
  });

  useEffect(() => {
    const unsub1 = samajService.subscribeToMembers(data => setSamajStats(prev => ({...prev, members: data.length})));
    const unsub2 = samajService.subscribeToMatrimonial(data => setSamajStats(prev => ({...prev, profiles: data.length})));
    const unsub3 = samajService.subscribeToEvents(data => setSamajStats(prev => ({...prev, events: data.length})));
    const unsub4 = samajService.subscribeToMessages(data => setSamajStats(prev => ({...prev, messages: data.length})));
    return () => { unsub1(); unsub2(); unsub3(); unsub4(); };
  }, []);

  const articles = getArticles();
  const categories = getCategories();
  const totalArticles = articles.length;
  const communityUsers = JSON.parse(localStorage.getItem("community_users") || "[]");

  // Category distribution
  const categoryData = categories.map((cat) => ({
    name: cat.name,
    value: articles.filter((a) => a.category === cat.slug).length,
    color: cat.color,
  }));

  // Views by category
  const viewsByCategory = categories.map((cat) => ({
    name: cat.name,
    views: articles
      .filter((a) => a.category === cat.slug)
      .reduce((sum, a) => sum + a.views, 0),
  })).filter(item => item.views > 0);

  // Top articles
  const topArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const formatViews = (views: number) => {
    if (views >= 10000) return `${(views / 10000).toFixed(1)}W`; 
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4 border-l-4 border-primary pl-6">
            <h1 className="text-2xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">Dashboard <span className="text-primary opacity-50">Overview</span></h1>
         </div>
         <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-xl border border-primary/10">
            <Activity className="size-3 text-primary animate-pulse" />
            <span className="text-[8px] font-black text-primary uppercase tracking-widest">System Realtime</span>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[
          { label: "Total Articles", val: totalArticles, icon: FileText, color: "bg-orange-50 text-orange-600" },
          { label: "Community Members", val: samajStats.members, icon: Users, color: "bg-blue-50 text-blue-600" },
          { label: "Matrimonial", val: samajStats.profiles, icon: Heart, color: "bg-pink-50 text-pink-600" },
          { label: "Samaj Events", val: samajStats.events, icon: Calendar, color: "bg-amber-50 text-amber-600" },
          { label: "Messages", val: samajStats.messages, icon: MessageCircle, color: "bg-primary/10 text-primary" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-[1.5rem] border border-gray-100 p-5 shadow-sm hover:shadow-bhagva transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 size-16 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className={`size-10 ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
              <stat.icon className="size-5" />
            </div>
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{stat.label}</p>
            <p className="text-2xl font-black text-gray-950 tracking-tight leading-none italic">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-black text-gray-950 uppercase tracking-widest flex items-center gap-3 italic">
                 <Zap className="size-4 text-primary" /> Reach by Intelligence Segment
              </h2>
              <div className="flex gap-2">
                 <div className="h-1.5 w-6 bg-primary rounded-full"></div>
                 <div className="h-1.5 w-2 bg-gray-100 rounded-full"></div>
              </div>
           </div>
           <ResponsiveContainer width="100%" height={260}>
             <BarChart data={viewsByCategory}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
               <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} stroke="#cbd5e1" fontSize={9} fontWeight="bold" />
               <YAxis stroke="#cbd5e1" fontSize={9} fontWeight="bold" />
               <Tooltip 
                 cursor={{fill: '#FFFDFB'}} 
                 contentStyle={{borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 'bold'}}
               />
               <Bar dataKey="views" fill="#FF7722" radius={[6, 6, 0, 0]} barSize={24} />
             </BarChart>
           </ResponsiveContainer>
        </div>

        {/* Database Status */}
        <div className="bg-gray-950 text-white rounded-[2rem] border border-white/5 p-8 relative overflow-hidden group">
           <div className="absolute inset-0 mandala-bg opacity-5 group-hover:scale-110 transition-transform duration-[10s]"></div>
           <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                 <div className="size-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary shadow-2xl">
                    <Shield className="size-6" />
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-[7px] font-black tracking-widest border border-green-500/20">
                    <span className="size-1 bg-green-400 rounded-full animate-ping"></span> SECURE
                 </div>
              </div>
              <div className="space-y-4">
                 <div>
                    <h3 className="text-xl font-black italic tracking-tighter text-white">CORE DATABASE</h3>
                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-1">Firebase Real-time Bridge</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex items-center justify-between text-[8px] font-black text-gray-400 uppercase tracking-widest">
                       <span>Connection Pulse</span>
                       <span className="text-primary italic">Excellent</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full w-[92%] bg-primary rounded-full"></div>
                    </div>
                 </div>
              </div>
              <div className="pt-4 space-y-3">
                 <button className="w-full py-3.5 bg-white text-gray-950 font-black rounded-xl hover:bg-primary hover:text-white transition-all text-[9px] uppercase tracking-widest flex items-center justify-center gap-2">
                    <Network className="size-3" /> Sync Infrastructure
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
             <div className="size-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="size-4" />
             </div>
             <h2 className="text-[10px] font-black text-gray-950 uppercase tracking-widest italic">Intelligence Priority</h2>
          </div>
          <div className="space-y-3">
            {topArticles.map((article, index) => (
              <div key={article.id} className="flex items-center justify-between p-4 bg-gray-50/30 rounded-2xl border border-transparent hover:border-primary/10 hover:bg-white transition-all group">
                <div className="flex items-center gap-4">
                  <div className="size-8 bg-white border border-gray-100 text-gray-400 group-hover:text-primary group-hover:border-primary/20 rounded-lg flex items-center justify-center font-black text-xs transition-colors">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-black text-[11px] text-gray-950 line-clamp-1 italic tracking-tight uppercase leading-none mb-1">{article.title}</p>
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{article.category} Sector</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="font-black text-xs text-gray-950 leading-none mb-1 italic tracking-tight">{formatViews(article.views)}</p>
                   <p className="text-[7px] uppercase font-black text-primary tracking-widest opacity-50">Impact</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community */}
        <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
             <div className="size-8 bg-gray-100 text-gray-400 rounded-lg flex items-center justify-center">
                <Globe className="size-4" />
             </div>
             <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Global Network Personnel</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communityUsers.length === 0 ? (
              <div className="col-span-2 text-center py-20 border-2 border-dashed border-gray-100 rounded-[2.5rem]">
                 <p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.4em] italic">No active personnel detected</p>
              </div>
            ) : (
              communityUsers.slice(-4).reverse().map((u: any, i: number) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                  <div className="size-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center font-black text-gray-300 text-base uppercase shadow-sm">
                    {u.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-[10px] text-gray-950 uppercase tracking-tighter truncate leading-none mb-1">{u.name}</p>
                    <p className="text-[8px] text-primary font-black uppercase tracking-widest truncate">{u.email.split('@')[0]}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

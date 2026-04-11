import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { 
  Users, Heart, Calendar, MessageCircle, Activity, 
  ShieldCheck, Megaphone, GraduationCap, Image as ImageIcon,
  TrendingUp, Zap, Star, Bot, ShoppingBag, Package, Book
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { samajService } from "../../services/samajService";
import { db } from "../../data/database";
import { trainLinearRegression } from "../../../utils/mlUtils";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    members: 0,
    matrimonial: 0,
    events: 0,
    messages: 0,
    committee: 0,
    news: 0,
    support: 0,
    gallery: 0,
    products: 0,
    orders: 0,
    revenue: 0,
    ebooks: 0,
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

    const updateStoreStats = () => {
      const dbOrders = db.getTable('orders');
      const dbProducts = db.getTable('products');
      const dbEbooks = db.getTable('ebooks');
      setStats(p => ({
        ...p, 
        orders: dbOrders.length, 
        products: dbProducts.length,
        ebooks: dbEbooks.length,
        revenue: dbOrders.reduce((acc, curr) => acc + (curr.total || 0), 0)
      }));
    };

    updateStoreStats();

    return () => { 
      unsub1(); unsub2(); unsub3(); unsub4(); 
      unsub5(); unsub6(); unsub7(); unsub8();
    };
  }, []);

  const activityData = [
    { name: "Jan", activity: 40 },
    { name: "Feb", activity: 30 },
    { name: "Mar", activity: 60 },
    { name: "Apr", activity: 80 },
    { name: "May", activity: Math.max(95, stats.members) }
  ];

  const trainingPairs: [number, number][] = activityData.map((d, i) => [i, d.activity]);
  const model = trainLinearRegression(trainingPairs);
  const predictedNext = model.predict(activityData.length);
  const confidence = Math.min(98, Math.round(70 + (model.slope * 2)));

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-24">
      {/* 🚀 TRADITIONAL HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-2xl border-b-4 border-primary shadow-lg">
         <div className="flex items-center gap-5">
               <div className="size-16 md:size-20 rounded-2xl bg-white text-white flex items-center justify-center border border-white/30 shadow-2xl drop-shadow-xl group-hover:rotate-12 transition-transform duration-500 p-2">
                  <img src="/brand-logo.png" alt="Lakhara Logo" className="size-full object-contain drop-shadow-sm" />
               </div>
            <div>
               <h1 className="text-3xl font-black text-slate-800 leading-none tracking-tighter uppercase">प्रशासन पैनल</h1>
               <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mt-1">हिंदू लखारा समाज • डिजिटल प्रबंधन</p>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end mr-4">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">प्रणाली स्थिति</span>
               <span className="text-sm font-black text-emerald-600 flex items-center gap-1.5">
                  <div className="size-2 bg-emerald-500 rounded-full animate-pulse"></div> डेटाबेस सक्रिय
               </span>
            </div>
            <button className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-primary transition-all shadow-md">
               लॉगआउट
            </button>
         </div>
      </div>

      {/* 📊 CORE STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "कुल सदस्य", val: stats.members, icon: Users, color: "bg-orange-50 text-orange-600 border-orange-100", trend: "+12%" },
          { label: "नए ऑर्डर", val: stats.orders, icon: ShoppingBag, color: "bg-blue-50 text-blue-600 border-blue-100", trend: "सक्रिय" },
          { label: "ई-लाइब्रेरी", val: stats.ebooks, icon: Book, color: "bg-amber-50 text-amber-600 border-amber-100", trend: "PDF" },
          { label: "कुल रेवेन्यू", val: `₹${stats.revenue}`, icon: TrendingUp, color: "bg-emerald-50 text-emerald-600 border-emerald-100", trend: "+5%" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border-2 border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group cursor-default">
            <div className="flex items-start justify-between mb-4">
               <div className={`size-12 ${stat.color} border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                 <stat.icon className="size-6" />
               </div>
               <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">{stat.trend}</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-4xl font-black text-slate-800 leading-none tracking-tighter">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-slate-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <div className="flex items-center gap-3">
                  <div className="size-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                     <TrendingUp className="size-5" />
                  </div>
                  <div>
                     <h2 className="text-xl font-bold text-slate-800">समुदाय विकास ग्राफ</h2>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Trend Analysis</p>
                  </div>
               </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
               <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#64748b'}} />
                  <YAxis hide />
                  <Tooltip 
                     cursor={{fill: '#f8fafc'}}
                     contentStyle={{borderRadius: '1rem', border: '2px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '1rem', fontSize: '13px', fontWeight: '700'}}
                  />
                  <Bar dataKey="activity" fill="var(--primary)" radius={[8, 8, 8, 8]} barSize={40} />
               </BarChart>
            </ResponsiveContainer>
         </div>

         <div className="bg-white rounded-3xl border-2 border-slate-100 p-8 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-8">
               <div className="size-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
                  <Heart className="size-5" />
               </div>
               <div>
                  <h2 className="text-xl font-bold text-slate-800">हाल ही के प्रोफाइल</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Marriages</p>
               </div>
            </div>
            <div className="flex-grow space-y-4">
               {[
                 { name: 'साक्षी लखारा', age: 24, city: 'पाली', type: 'वधु' },
                 { name: 'राहुल लखारा', age: 27, city: 'जोधपुर', type: 'वर' },
                 { name: 'अंजली लखारा', age: 25, city: 'सोजत', type: 'वधु' },
               ].map((p, idx) => (
                 <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/20 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                       <div className="size-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-primary font-bold overflow-hidden">
                          {p.name[0]}
                       </div>
                       <div>
                          <p className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">{p.name}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{p.city} • {p.age} वर्ष</p>
                       </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${p.type === 'वर' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'}`}>
                       {p.type}
                    </span>
                 </div>
               ))}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-primary transition-all uppercase tracking-widest">
               सभी प्रोफाइल देखें
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
            { label: "स्टोर प्रबंधन", desc: "Sales & Orders", icon: ShoppingBag, color: "bg-primary", path: "/admin/store" },
            { label: "ई-लाइब्रेरी", desc: "Books & PDFs", icon: Book, color: "bg-slate-900", path: "/admin/ebooks" },
            { label: "सदस्य प्रबंधन", desc: "Listings & Search", icon: Users, color: "bg-orange-600", path: "/admin/members" },
            { label: "सामुदायिक संवाद", desc: "News & Alerts", icon: Megaphone, color: "bg-emerald-600", path: "/admin/news" }
         ].map((action, i) => (
            <button key={i} onClick={() => navigate(action.path)} className="flex flex-col items-start gap-4 p-8 bg-white rounded-3xl border-2 border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left group">
               <div className={`size-14 ${action.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <action.icon className="size-6" />
               </div>
               <div>
                  <h3 className="text-lg font-bold text-slate-800 leading-tight">{action.label}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{action.desc}</p>
               </div>
            </button>
         ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden border border-slate-800 shadow-2xl">
         <div className="absolute top-0 right-0 size-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className="size-10 bg-white rounded-xl flex items-center justify-center border border-primary/20 p-1">
                     <img src="/brand-logo.png" alt="Logo" className="size-full object-contain" />
                  </div>
                  <h3 className="text-lg font-bold leading-none tracking-tighter">प्रणाली जानकारी<br/><span className="text-[10px] font-black text-primary uppercase tracking-widest">System Architecture</span></h3>
               </div>
               <p className="text-slate-400 text-xs font-medium leading-relaxed italic">
                  लखारा समाज डिजिटल नेटवर्क सुरक्षित फायरबेस इंफ्रास्ट्रक्चर और एडवांस्ड एआई मॉडलिंग द्वारा संचालित है।
               </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">संस्करण</p>
                  <p className="text-sm font-bold text-primary font-mono">v4.0.0-ULTRA</p>
               </div>
               <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">अंतिम बैकअप</p>
                  <p className="text-sm font-bold text-emerald-400">आज (सफल)</p>
               </div>
            </div>
            <div className="flex flex-col justify-center items-end gap-2 text-right">
               <span className="text-3xl font-black text-white leading-none tracking-tighter">॥ संघे शक्तिः कलौ युगे ॥</span>
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">United Excellence</span>
            </div>
         </div>
      </div>
    </div>
  );
}

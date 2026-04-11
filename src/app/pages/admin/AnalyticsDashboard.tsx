import { useState, useEffect } from "react";
import { 
  Users, Heart, Calendar, MessageCircle, TrendingUp, 
  ShoppingBag, Book, Megaphone, BarChart3, Activity,
  Bell, UserCheck, GraduationCap, Image as ImageIcon,
  ShieldCheck, ArrowUpRight, Download
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";
import { samajService } from "../../services/samajService";
import { db } from "../../data/database";
import { useNavigate } from "react-router";
import { noticeBoardService } from "../../services/noticeBoardService";
import { eventRegistrationService } from "../../services/eventRegistrationService";

const COLORS = ["#f97316", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

export function AnalyticsDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    members: 0, matrimonial: 0, events: 0, messages: 0,
    committee: 0, news: 0, support: 0, gallery: 0,
    products: 0, orders: 0, revenue: 0, ebooks: 0,
    notices: 0, eventRegs: 0,
  });

  const [monthlyMembers, setMonthlyMembers] = useState<{ name: string; members: number }[]>([
    { name: "Jan", members: 12 }, { name: "Feb", members: 19 },
    { name: "Mar", members: 25 }, { name: "Apr", members: 31 },
    { name: "May", members: 38 }, { name: "Jun", members: 44 },
  ]);

  useEffect(() => {
    const unsubs = [
      samajService.subscribeToMembers(d => setStats(p => ({ ...p, members: d.length }))),
      samajService.subscribeToMatrimonial(d => setStats(p => ({ ...p, matrimonial: d.length }))),
      samajService.subscribeToEvents(d => setStats(p => ({ ...p, events: d.length }))),
      samajService.subscribeToMessages(d => setStats(p => ({ ...p, messages: d.length }))),
      samajService.subscribeToCommittee(d => setStats(p => ({ ...p, committee: d.length }))),
      samajService.subscribeToSamajNews(d => setStats(p => ({ ...p, news: d.length }))),
      samajService.subscribeToSupport(d => setStats(p => ({ ...p, support: d.length }))),
      samajService.subscribeToGallery(d => setStats(p => ({ ...p, gallery: d.length }))),
      noticeBoardService.subscribeToNotices(d => setStats(p => ({ ...p, notices: d.length }))),
      eventRegistrationService.subscribeToRegistrations("all", d => setStats(p => ({ ...p, eventRegs: d.length }))),
    ];
    const dbOrders = db.getTable("orders");
    const dbProducts = db.getTable("products");
    const dbEbooks = db.getTable("ebooks");
    setStats(p => ({
      ...p,
      orders: dbOrders.length,
      products: dbProducts.length,
      ebooks: dbEbooks.length,
      revenue: dbOrders.reduce((acc: number, curr: any) => acc + (curr.total || 0), 0),
    }));
    return () => unsubs.forEach(u => u());
  }, []);

  const pieData = [
    { name: "सदस्य",     value: stats.members     || 1 },
    { name: "विवाह",     value: stats.matrimonial  || 1 },
    { name: "समाचार",   value: stats.news          || 1 },
    { name: "ई-बुक्स",  value: stats.ebooks        || 1 },
    { name: "गैलरी",    value: stats.gallery        || 1 },
    { name: "ऑर्डर",    value: stats.orders         || 1 },
  ];

  const statCards = [
    { label: "कुल सदस्य",        val: stats.members,   icon: Users,      color: "orange", path: "/admin/members",     trend: "+12%" },
    { label: "विवाह प्रोफाइल",   val: stats.matrimonial, icon: Heart,    color: "rose",   path: "/admin/matrimonial", trend: "Active" },
    { label: "Event Registration", val: stats.eventRegs, icon: UserCheck, color: "blue",   path: "/admin/events",      trend: "New" },
    { label: "कुल रेवेन्यू",     val: `₹${stats.revenue}`, icon: TrendingUp, color: "emerald", path: "/admin/store",  trend: "+5%" },
    { label: "ऑर्डर",            val: stats.orders,    icon: ShoppingBag, color: "purple", path: "/admin/store",      trend: "Live" },
    { label: "ई-लाइब्रेरी",     val: stats.ebooks,    icon: Book,        color: "amber",  path: "/admin/ebooks",      trend: "PDF" },
    { label: "सूचनाएं",          val: stats.notices,   icon: Bell,        color: "teal",   path: "/admin/notices",     trend: "Live" },
    { label: "संदेश",            val: stats.messages,  icon: MessageCircle, color: "slate", path: "/admin/messages",  trend: "Inbox" },
  ];

  const colorMap: Record<string, string> = {
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    rose:   "bg-rose-50 text-rose-600 border-rose-100",
    blue:   "bg-blue-50 text-blue-600 border-blue-100",
    emerald:"bg-emerald-50 text-emerald-600 border-emerald-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    amber:  "bg-amber-50 text-amber-600 border-amber-100",
    teal:   "bg-teal-50 text-teal-600 border-teal-100",
    slate:  "bg-slate-50 text-slate-600 border-slate-100",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="size-12 bg-orange-50 text-primary rounded-2xl flex items-center justify-center">
          <BarChart3 className="size-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Analytics Dashboard</h1>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Live Community Insights</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <button
            key={i}
            onClick={() => navigate(s.path)}
            className="bg-white rounded-2xl border-2 border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group text-left"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`size-10 ${colorMap[s.color]} border rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <s.icon className="size-5" />
              </div>
              <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                {s.trend} <ArrowUpRight className="size-2.5" />
              </div>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{s.label}</p>
            <p className="text-3xl font-black text-slate-800 leading-none tracking-tighter">{s.val}</p>
          </button>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart - Monthly Members */}
        <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-slate-100 p-7 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-9 bg-orange-50 text-primary rounded-xl flex items-center justify-center">
              <Activity className="size-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-800">सदस्यता ग्रोथ</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly Member Growth</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={[...monthlyMembers, { name: "Live", members: stats.members || 50 }]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "#64748b" }} />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{ borderRadius: "1rem", border: "2px solid #e2e8f0", padding: "1rem", fontSize: "13px", fontWeight: "700" }}
              />
              <Bar dataKey="members" fill="var(--primary)" radius={[8, 8, 8, 8]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-3xl border-2 border-slate-100 p-7 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="size-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-800">Content Overview</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Distribution</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "2px solid #e2e8f0", fontSize: "12px", fontWeight: "700" }} />
              <Legend iconType="circle" iconSize={8} formatter={(value) => <span style={{ fontSize: "10px", fontWeight: 700 }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl border-2 border-slate-100 p-7 shadow-sm">
        <h2 className="text-base font-black text-slate-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Members Export", icon: Download, color: "bg-orange-600", onClick: () => navigate("/admin/members") },
            { label: "Add Notice",     icon: Bell,     color: "bg-blue-600",   onClick: () => navigate("/admin/notices") },
            { label: "Samaj News",     icon: Megaphone, color: "bg-emerald-600", onClick: () => navigate("/admin/news") },
            { label: "Certificate",   icon: ShieldCheck, color: "bg-purple-600", onClick: () => navigate("/admin/certificate-settings") },
          ].map((a, i) => (
            <button key={i} onClick={a.onClick} className={`${a.color} text-white rounded-2xl p-5 flex flex-col items-center gap-3 hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-sm group`}>
              <a.icon className="size-6 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-wider text-center">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Events",         val: stats.events,    icon: Calendar,       color: "text-blue-600 bg-blue-50"   },
          { label: "Committee",      val: stats.committee, icon: ShieldCheck,    color: "text-green-600 bg-green-50" },
          { label: "Gallery",        val: stats.gallery,   icon: ImageIcon,      color: "text-purple-600 bg-purple-50" },
          { label: "Education",      val: stats.support,   icon: GraduationCap,  color: "text-amber-600 bg-amber-50" },
          { label: "Samaj News",     val: stats.news,      icon: Megaphone,      color: "text-orange-600 bg-orange-50" },
          { label: "Products",       val: stats.products,  icon: ShoppingBag,    color: "text-rose-600 bg-rose-50"   },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 text-center shadow-sm">
            <div className={`size-9 ${s.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
              <s.icon className="size-4" />
            </div>
            <p className="text-2xl font-black text-slate-800">{s.val}</p>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

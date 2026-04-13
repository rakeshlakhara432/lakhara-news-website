import { useState, useEffect } from "react";
import { Bell, Pin, Calendar, AlertTriangle, PartyPopper, Users2, Clock, RefreshCw, Share2 } from "lucide-react";
import { noticeBoardService, Notice } from "../../services/noticeBoardService";

const TYPE_CONFIG = {
  urgent:      { label: "अत्यावश्यक", icon: AlertTriangle, bg: "bg-red-50",     border: "border-red-300",     badge: "bg-red-100 text-red-700",     icon_color: "text-red-600"      },
  info:        { label: "सूचना",      icon: Bell,           bg: "bg-blue-50",    border: "border-blue-200",    badge: "bg-blue-100 text-blue-700",   icon_color: "text-blue-600"     },
  celebration: { label: "उत्सव",      icon: PartyPopper,    bg: "bg-amber-50",   border: "border-amber-200",   badge: "bg-amber-100 text-amber-700", icon_color: "text-amber-600"    },
  meeting:     { label: "बैठक",       icon: Users2,         bg: "bg-green-50",   border: "border-green-200",   badge: "bg-green-100 text-green-700", icon_color: "text-green-600"    },
};

function formatDate(ts: any) {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("hi-IN", { day: "2-digit", month: "long", year: "numeric" });
}

function shareNotice(notice: Notice) {
  const text = `📢 *${notice.title}*\n\n${notice.content}\n\n— लखारा समाज कम्युनिटी`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

export function NoticeBoardPage() {
  const [notices, setNotices]   = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter]     = useState<"all" | Notice["type"]>("all");

  useEffect(() => {
    const unsub = noticeBoardService.subscribeToNotices(data => {
      setNotices(data);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const pinned   = notices.filter(n => n.isPinned);
  const filtered = notices.filter(n => (filter === "all" || n.type === filter) && !n.isPinned);

  return (
    <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Header */}
      <section className="text-center space-y-6 pt-12">
        <div className="size-16 mx-auto bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shadow-sm border border-orange-100">
          <Bell className="size-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
            समाज <span className="text-orange-600">सूचना पट्टिका</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Notice Board • Community Announcements
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 space-y-10">
        {/* Pinned notices */}
        {pinned.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-orange-600">
              <Pin className="size-4 fill-current" />
              <span className="text-xs font-black uppercase tracking-widest">Pinned Notices</span>
            </div>
            {pinned.map(n => {
              const cfg = TYPE_CONFIG[n.type];
              const Icon = cfg.icon;
              return (
                <div key={n.id} className={`${cfg.bg} border-2 ${cfg.border} rounded-2xl p-6 relative overflow-hidden shadow-sm`}>
                  <div className="absolute top-3 right-3 flex gap-2 items-center">
                    <button onClick={() => shareNotice(n)} className="p-1.5 bg-white/80 hover:bg-green-50 rounded-lg transition-colors" title="WhatsApp पर Share करें">
                      <Share2 className="size-3.5 text-green-600" />
                    </button>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${cfg.badge} uppercase tracking-wider`}>{cfg.label}</span>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 uppercase">📌 Pinned</span>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row items-start gap-6 border-b border-white/50 pb-4 pr-16">
                      <div className={`size-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100`}>
                        <Icon className={`size-6 ${cfg.icon_color}`} />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h3 className="text-xl font-black text-slate-800 leading-tight">{n.title}</h3>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="size-3 text-orange-600" />
                          <span className="text-[10px] font-black uppercase tracking-widest">{formatDate(n.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      {n.imageUrl && (
                        <div className="w-full md:w-64 aspect-video rounded-2xl overflow-hidden border border-white/50 shadow-inner shrink-0 bg-white">
                          <img src={n.imageUrl} className="size-full object-cover" alt="" />
                        </div>
                      )}
                      <p className="text-sm text-slate-600 font-bold leading-relaxed whitespace-pre-line flex-1 uppercase tracking-tight">{n.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {["all", "urgent", "info", "celebration", "meeting"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === f
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                  : "bg-white border border-slate-100 text-slate-400 hover:border-orange-200"
              }`}
            >
              {f === "all" ? "सभी" : TYPE_CONFIG[f as Notice["type"]].label}
            </button>
          ))}
        </div>

        {/* Notice list */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <RefreshCw className="size-8 text-orange-600 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <Bell className="size-12 mx-auto mb-3 opacity-30" />
            <p className="font-bold uppercase tracking-widest text-xs text-slate-400">कोई सूचना नहीं मिली</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map(n => {
              const cfg = TYPE_CONFIG[n.type];
              const Icon = cfg.icon;
              return (
                <div key={n.id} className="bg-white border border-slate-100 rounded-[2rem] p-8 hover:shadow-xl transition-all group relative overflow-hidden flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`size-10 rounded-xl ${cfg.bg} flex items-center justify-center border ${cfg.border}`}>
                        <Icon className={`size-5 ${cfg.icon_color}`} />
                      </div>
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full ${cfg.badge} uppercase tracking-widest`}>{cfg.label}</span>
                    </div>
                    <button onClick={() => shareNotice(n)} className="size-9 bg-slate-50 flex items-center justify-center rounded-xl hover:bg-emerald-50 transition-colors opacity-0 group-hover:opacity-100" title="WhatsApp Share">
                      <Share2 className="size-4 text-emerald-600" />
                    </button>
                  </div>

                  {n.imageUrl && (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6 border border-slate-50 shadow-inner">
                      <img src={n.imageUrl} className="size-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                    </div>
                  )}

                  <h3 className="text-lg font-black text-slate-800 mb-3 group-hover:text-orange-600 transition-colors leading-tight">{n.title}</h3>
                  <p className="text-sm text-slate-600 font-bold leading-relaxed whitespace-pre-line line-clamp-4 flex-1">{n.content}</p>
                  
                  <div className="flex items-center gap-2 mt-8 pt-4 border-t border-slate-50 text-slate-400">
                    <Calendar className="size-3.5 text-orange-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{formatDate(n.createdAt)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

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
                  <div className="flex items-start gap-4 pr-28">
                    <div className={`size-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm`}>
                      <Icon className={`size-5 ${cfg.icon_color}`} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-slate-800">{n.title}</h3>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-line">{n.content}</p>
                      <div className="flex items-center gap-2 pt-2 text-slate-400">
                        <Clock className="size-3" />
                        <span className="text-xs font-semibold">{formatDate(n.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          {["all", "urgent", "info", "celebration", "meeting"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                filter === f
                  ? "bg-orange-600 text-white shadow"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
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
          <div className="text-center py-20 text-slate-400">
            <Bell className="size-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">कोई सूचना नहीं मिली</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map(n => {
              const cfg = TYPE_CONFIG[n.type];
              const Icon = cfg.icon;
              return (
                <div key={n.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`size-9 rounded-xl ${cfg.bg} flex items-center justify-center`}>
                        <Icon className={`size-4 ${cfg.icon_color}`} />
                      </div>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${cfg.badge} uppercase tracking-wider`}>{cfg.label}</span>
                    </div>
                    <button onClick={() => shareNotice(n)} className="p-1.5 hover:bg-green-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100" title="WhatsApp Share">
                      <Share2 className="size-4 text-green-600" />
                    </button>
                  </div>
                  <h3 className="text-base font-black text-slate-800 mb-2">{n.title}</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-line">{n.content}</p>
                  <div className="flex items-center gap-2 mt-4 text-slate-400">
                    <Calendar className="size-3" />
                    <span className="text-xs font-semibold">{formatDate(n.createdAt)}</span>
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

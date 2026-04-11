import { useState, useEffect } from "react";
import { Bell, Plus, Trash2, Pin, RefreshCw, Save, X, AlertTriangle, PartyPopper, Users2 } from "lucide-react";
import { noticeBoardService, Notice } from "../../services/noticeBoardService";
import { toast } from "sonner";

const TYPE_OPTIONS = [
  { value: "info",        label: "सूचना",      icon: Bell,           color: "bg-blue-100 text-blue-700"   },
  { value: "urgent",      label: "अत्यावश्यक", icon: AlertTriangle,  color: "bg-red-100 text-red-700"     },
  { value: "celebration", label: "उत्सव",      icon: PartyPopper,    color: "bg-amber-100 text-amber-700" },
  { value: "meeting",     label: "बैठक",       icon: Users2,         color: "bg-green-100 text-green-700" },
];

const EMPTY: Omit<Notice, "id" | "createdAt"> = {
  title:     "",
  content:   "",
  type:      "info",
  isPinned:  false,
  expiresAt: "",
};

export function ManageNotices() {
  const [notices,  setNotices]  = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form,     setForm]     = useState({ ...EMPTY });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsub = noticeBoardService.subscribeToNotices(data => {
      setNotices(data);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title और Content जरूरी है");
      return;
    }
    setIsSaving(true);
    try {
      await noticeBoardService.addNotice(form);
      toast.success("Notice publish हो गई!");
      setForm({ ...EMPTY });
      setShowForm(false);
    } catch {
      toast.error("Save नहीं हो सका");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("इस notice को delete करें?")) return;
    await noticeBoardService.deleteNotice(id);
    toast.success("Notice delete हो गई");
  };

  const togglePin = async (notice: Notice) => {
    await noticeBoardService.updateNotice(notice.id!, { isPinned: !notice.isPinned });
    toast.success(notice.isPinned ? "Unpin किया" : "Pin किया!");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-orange-50 text-primary rounded-xl flex items-center justify-center">
            <Bell className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Notice Board</h1>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Community Announcements</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-sm hover:opacity-90 transition-all shadow"
        >
          {showForm ? <X className="size-4" /> : <Plus className="size-4" />}
          {showForm ? "बंद करें" : "नई Notice"}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-5 shadow-sm">
          <h2 className="text-base font-black text-slate-800 border-l-4 border-primary pl-3">नई Notice बनाएं</h2>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">शीर्षक (Title) *</label>
            <input
              type="text"
              placeholder="Notice का शीर्षक..."
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider">विवरण (Content) *</label>
            <textarea
              rows={4}
              placeholder="Notice का पूरा विवरण..."
              value={form.content}
              onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-colors resize-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider">प्रकार (Type)</label>
              <div className="grid grid-cols-2 gap-2">
                {TYPE_OPTIONS.map(opt => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, type: opt.value as Notice["type"] }))}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${
                        form.type === opt.value ? "border-primary bg-orange-50 text-primary" : "border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      <Icon className="size-3.5" /> {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">समाप्त तिथि (Optional)</label>
                <input
                  type="date"
                  value={form.expiresAt}
                  onChange={e => setForm(p => ({ ...p, expiresAt: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-colors"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 rounded-xl border border-slate-200 hover:bg-orange-50 transition-colors">
                <div className={`size-5 rounded-lg border-2 flex items-center justify-center transition-colors ${form.isPinned ? "bg-orange-600 border-orange-600 text-white" : "border-slate-300"}`}>
                  {form.isPinned && <Pin className="size-3" />}
                </div>
                <input type="checkbox" className="hidden" checked={form.isPinned} onChange={e => setForm(p => ({ ...p, isPinned: e.target.checked }))} />
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">📌 Notice Pin करें</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-3.5 bg-gradient-to-r from-primary to-orange-500 text-white font-black rounded-xl text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save className="size-4" />
            {isSaving ? "Saving..." : "Notice Publish करें"}
          </button>
        </div>
      )}

      {/* Notices List */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <RefreshCw className="size-8 text-primary animate-spin" />
        </div>
      ) : notices.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <Bell className="size-12 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">कोई Notice नहीं है</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notices.map(n => {
            const cfg = TYPE_OPTIONS.find(o => o.value === n.type)!;
            const Icon = cfg.icon;
            return (
              <div key={n.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4 hover:shadow-md transition-all">
                <div className={`size-10 rounded-xl ${cfg.color.split(" ")[0]} flex items-center justify-center shrink-0`}>
                  <Icon className={`size-5 ${cfg.color.split(" ")[1]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-black text-slate-800 text-sm">{n.title}</span>
                    {n.isPinned && <span className="text-[9px] font-black px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full uppercase">📌 Pinned</span>}
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${cfg.color} uppercase tracking-wider`}>{cfg.label}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2">{n.content}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => togglePin(n)}
                    title={n.isPinned ? "Unpin" : "Pin"}
                    className={`p-2 rounded-xl transition-colors ${n.isPinned ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-400 hover:bg-orange-50 hover:text-orange-600"}`}
                  >
                    <Pin className="size-4" />
                  </button>
                  <button onClick={() => handleDelete(n.id!)} className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

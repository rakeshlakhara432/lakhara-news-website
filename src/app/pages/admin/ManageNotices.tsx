import { useState, useEffect } from "react";
import { Bell, Plus, Trash2, Pin, RefreshCw, Save, X, AlertTriangle, PartyPopper, Users2, ImageIcon } from "lucide-react";
import { noticeBoardService, Notice } from "../../services/noticeBoardService";
import { toast } from "sonner";
import { FileUpload } from "../../components/ui/FileUpload";
import { motion, AnimatePresence } from "framer-motion";

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
  imageUrl:  "",
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
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border-b-4 border-orange-600 shadow-sm">
         <div className="flex items-center gap-4">
            <div className="size-12 bg-orange-600 text-white rounded-xl flex items-center justify-center">
               <Bell className="size-6" />
            </div>
            <div>
               <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">प्रबंधन: सूचना पट्ट</h2>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Community Notice Board & Notifications</p>
            </div>
         </div>
         <button onClick={() => setShowForm(true)} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-orange-600 transition-all active:scale-95 shadow-md shadow-black/5">
           <Plus className="size-4" /> नई सूचना
         </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-4xl bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border-t-8 border-orange-600">
               <div className="p-8 space-y-6 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="size-10 bg-orange-600/10 text-orange-600 rounded-xl flex items-center justify-center">
                           <Bell className="size-5" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter leading-none">नई सूचना प्रकाशित करें</h3>
                     </div>
                     <button onClick={() => setShowForm(false)} className="size-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center hover:bg-orange-600/10 hover:text-orange-600 transition-all">
                        <X className="size-5" />
                     </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <FileUpload 
                          path="notices"
                          label="Notice Image (Optional Banner)"
                          onUploadComplete={(url) => setForm(prev => ({ ...prev, imageUrl: url }))}
                          previewUrl={form.imageUrl}
                        />
                        
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">सूचना का प्रकार (Type)</label>
                           <div className="grid grid-cols-2 gap-2">
                              {TYPE_OPTIONS.map(opt => (
                                 <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setForm(p => ({ ...p, type: opt.value as Notice["type"] }))}
                                    className={`flex items-center justify-center gap-2 px-3 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                                       form.type === opt.value ? "border-orange-600 bg-orange-50 text-orange-600 shadow-sm" : "border-slate-50 text-slate-400 hover:border-slate-100 bg-slate-50"
                                    }`}
                                 >
                                    <opt.icon className="size-4" /> {opt.label}
                                 </button>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">शीर्षक (Title)</label>
                           <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm" placeholder="Notice शीर्षक..." />
                        </div>
                        
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">विवरण (Content)</label>
                           <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={6} required className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm resize-none" placeholder="पूरी जानकारी लिखें..." />
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                           <div className="flex-1 space-y-1.5">
                              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">समाप्ति तिथि (Optional)</label>
                              <input type="date" value={form.expiresAt} onChange={e => setForm({...form, expiresAt: e.target.value})} className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm" />
                           </div>
                           <label className="flex items-center gap-3 cursor-pointer bg-slate-50 px-5 py-4 rounded-2xl border border-transparent hover:border-orange-200 transition-all mt-6">
                              <div className={`size-5 rounded-lg border-2 flex items-center justify-center transition-all ${form.isPinned ? "bg-orange-600 border-orange-600 text-white" : "border-slate-300"}`}>
                                 {form.isPinned && <Pin className="size-3" />}
                              </div>
                              <input type="checkbox" className="hidden" checked={form.isPinned} onChange={e => setForm({...form, isPinned: e.target.checked})} />
                              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Pin IT</span>
                           </label>
                        </div>
                     </div>
                  </div>

                  <button 
                    onClick={handleSave} 
                    disabled={isSaving}
                    className="w-full bg-orange-600 text-white py-4 rounded-[1.25rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-900 transition-all shadow-xl shadow-orange-600/20 disabled:opacity-50"
                  >
                     {isSaving ? "परेशान न हों, सेव हो रहा है..." : "Notice Publish करें"}
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
         {notices.map(n => {
            const cfg = TYPE_OPTIONS.find(o => o.value === n.type) || TYPE_OPTIONS[0];
            return (
              <div key={n.id} className="bg-white border border-slate-100 rounded-[2rem] p-6 flex flex-col hover:shadow-xl transition-all hover:border-orange-100 relative group">
                 <div className="flex items-start gap-4 mb-4">
                    <div className={`size-12 rounded-2xl ${cfg.color.split(" ")[0]} flex items-center justify-center shrink-0 shadow-inner`}>
                       <cfg.icon className={`size-6 ${cfg.color.split(" ")[1]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-base font-black text-slate-800 leading-tight group-hover:text-orange-600 transition-colors">{n.title}</h3>
                          {n.isPinned && <div className="bg-orange-600 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1"><Pin className="size-2.5" /> PINNED</div>}
                       </div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cfg.label} • {n.createdAt?.toDate?.().toLocaleDateString() || "Today"}</p>
                    </div>
                    <div className="flex items-center gap-2 shadow-sm bg-slate-50 p-1 rounded-xl">
                       <button onClick={() => togglePin(n)} className={`size-8 rounded-lg flex items-center justify-center transition-all ${n.isPinned ? "bg-orange-600 text-white shadow-lg" : "text-slate-400 hover:text-orange-600"}`}>
                          <Pin className="size-4" />
                       </button>
                       <button onClick={() => n.id && handleDelete(n.id)} className="size-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                          <Trash2 className="size-4" />
                       </button>
                    </div>
                 </div>
                 
                 {n.imageUrl && (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden mb-4 border border-slate-50">
                       <img src={n.imageUrl} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                 )}
                 
                 <p className="text-slate-600 font-bold text-sm leading-relaxed mb-6 line-clamp-3">{n.content}</p>
                 
                 <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                       EXPIRY: {n.expiresAt || "PERMANENT"}
                    </div>
                    <button className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2">DETAILS <ArrowRight className="size-3" /></button>
                 </div>
              </div>
            );
         })}
      </div>

      {!isLoading && notices.length === 0 && (
        <div className="col-span-full py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
           <Bell className="size-12 text-slate-200 mx-auto mb-4" />
           <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No active notices found</p>
        </div>
      )}
    </div>
  );
}

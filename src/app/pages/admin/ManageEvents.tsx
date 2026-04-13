import { useState, useEffect } from "react";
import { Search, Loader2, Plus, Trash2, Calendar, MapPin, Tag, ArrowRight, X, ImageIcon } from "lucide-react";
import { samajService, SamajEvent } from "../../services/samajService";
import { toast } from "sonner";
import { FileUpload } from "../../components/ui/FileUpload";
import { motion, AnimatePresence } from "framer-motion";

export function ManageEvents() {
  const [events, setEvents] = useState<SamajEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    type: "बैठक" as any,
    imageUrl: ""
  });

  useEffect(() => {
    const unsubscribe = samajService.subscribeToEvents((data) => {
      setEvents(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("इस आयोजन को हटाना चाहते हैं?")) {
      try {
        await samajService.deleteEvent(id);
        toast.success("Event deleted successfully");
      } catch (err) {
        toast.error("Failed to delete event");
      }
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await samajService.addEvent(formData);
      toast.success("Event posted successfully");
      setIsAdding(false);
      setFormData({ title: "", date: "", location: "", description: "", type: "बैठक", imageUrl: "" });
    } catch (err) {
      toast.error("Failed to post event");
    }
  };

  const filteredEvents = events.filter(
    (ev) =>
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border-b-4 border-orange-600 shadow-sm">
         <div className="flex items-center gap-4">
            <div className="size-12 bg-orange-600 text-white rounded-xl flex items-center justify-center">
               <Calendar className="size-6" />
            </div>
            <div>
               <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">प्रबंधन: आगामी आयोजन</h2>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Community Events & Conferences</p>
            </div>
         </div>
         <button onClick={() => setIsAdding(true)} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-orange-600 transition-all active:scale-95 shadow-md shadow-black/5">
           <Plus className="size-4" /> आयोजन जोड़ें
         </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
         <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
            <input 
              type="text" 
              placeholder="आयोजन या स्थान खोजें..." 
              className="w-full bg-slate-50 border border-transparent pl-12 pr-4 py-3.5 text-sm font-bold rounded-xl focus:bg-white focus:border-slate-200 outline-none transition-all shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-4xl bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border-t-8 border-orange-600">
               <form onSubmit={handleAddSubmit} className="p-8 space-y-6 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="size-10 bg-orange-600/10 text-orange-600 rounded-xl flex items-center justify-center">
                           <Calendar className="size-5" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter leading-none">नया आयोजन ड्राफ्ट</h3>
                     </div>
                     <button type="button" onClick={() => setIsAdding(false)} className="size-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center hover:bg-orange-600/10 hover:text-orange-600 transition-all">
                        <X className="size-5" />
                     </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <FileUpload 
                          path="events"
                          label="Event Banner (Image)"
                          onUploadComplete={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                          previewUrl={formData.imageUrl}
                        />
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Event Type</label>
                           <select className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}>
                              <option value="बैठक">बैठक (Meeting)</option>
                              <option value="सम्मेलन">सम्मेलन (Conference)</option>
                              <option value="सांस्कृतिक">सांस्कृतिक (Cultural)</option>
                              <option value="अन्य">अन्य (Other)</option>
                           </select>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Event Title</label>
                           <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm" placeholder="Enter title" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-1.5">
                              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Date</label>
                              <input value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm" placeholder="28 मार्च 2026" />
                           </div>
                           <div className="space-y-1.5">
                              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Location</label>
                              <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm" placeholder="Address..." />
                           </div>
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Brief Description</label>
                           <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm resize-none" placeholder="Purpose of this event..." />
                        </div>
                     </div>
                  </div>

                  <button type="submit" className="w-full bg-orange-600 text-white py-4 rounded-[1.25rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-900 transition-all shadow-xl shadow-orange-600/20">
                     Publish Official Event
                  </button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-10 text-orange-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((ev) => (
            <div key={ev.id} className="group p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:border-orange-100 flex flex-col h-full">
              <div className="flex-grow space-y-5">
                <div className="flex items-center justify-between">
                   <div className="size-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shadow-inner border border-orange-100">
                     <Calendar className="size-6" />
                   </div>
                   <div className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-400 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100">
                     <Tag className="size-3" /> {ev.type}
                   </div>
                </div>
                
                {ev.imageUrl && (
                   <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                      <img src={ev.imageUrl} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-base font-black text-slate-800 leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors uppercase italic">{ev.title}</h3>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed line-clamp-3">{ev.description}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="size-4 shrink-0 text-orange-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="size-4 shrink-0 text-orange-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest truncate">{ev.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50">
                <button 
                  onClick={() => ev.id && handleDelete(ev.id)}
                  className="w-full py-2.5 bg-slate-50 text-slate-400 hover:bg-rose-600 hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Trash2 className="size-4" /> Cancel Event
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredEvents.length === 0 && !isLoading && (
        <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
           <Calendar className="size-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No upcoming operations detected</p>
        </div>
      )}
    </div>
  );
}

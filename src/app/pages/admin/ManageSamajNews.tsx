import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Megaphone, Calendar, Bookmark, Eye, Image as ImageIcon, X } from "lucide-react";
import { samajService, NewsPost } from "../../services/samajService";
import { toast } from "sonner";
import { AutoNewsWriter } from "../../components/ai/AutoNewsWriter";
import { FileUpload } from "../../components/ui/FileUpload";
import { motion, AnimatePresence } from "framer-motion";

export function ManageSamajNews() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ 
    title: "", 
    content: "", 
    category: "महत्वपूर्ण", 
    imageUrl: "" 
  });

  useEffect(() => {
    const unsub = samajService.subscribeToSamajNews(setNews);
    setIsLoading(false);
    return () => unsub();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await samajService.addSamajNews(formData);
      toast.success("नया समाचार सफलतापूर्वक जोड़ा गया!");
      setIsAdding(false);
      setFormData({ title: "", content: "", category: "महत्वपूर्ण", imageUrl: "" });
    } catch (err) {
      toast.error("Failed to broadcast news");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("क्या आप वाकई इस समाचार को हटाना चाहते हैं?")) {
      try {
        await samajService.deleteSamajNews(id);
        toast.success("समाचार हटा दिया गया है।");
      } catch (err) {
        toast.error("Deletion failed");
      }
    }
  };

  const handleAIAutoNews = (title: string, content: string) => {
    setFormData({ ...formData, title, content });
    setIsAdding(true);
    toast.success("AI Translated News Ready!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-24">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border-b-4 border-orange-600 shadow-sm">
         <div className="flex items-center gap-4">
            <div className="size-12 bg-orange-600 text-white rounded-xl flex items-center justify-center">
               <Megaphone className="size-6" />
            </div>
            <div>
               <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">प्रबंधन: समाचार एवं घोषणाएं</h2>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Samaj Media Center & Archive</p>
            </div>
         </div>
         <button onClick={() => setIsAdding(true)} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-orange-600 transition-all active:scale-95 shadow-md shadow-black/5">
           <Plus className="size-4" /> समाचार जोड़ें
         </button>
      </div>

      <AutoNewsWriter onNewsGenerated={handleAIAutoNews} />

      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-4xl bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border-t-8 border-orange-600">
               <form onSubmit={handleAdd} className="p-8 space-y-6 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="size-10 bg-orange-600/10 text-orange-600 rounded-xl flex items-center justify-center">
                           <ImageIcon className="size-5" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter leading-none">नया समाचार प्रकाशन</h3>
                     </div>
                     <button type="button" onClick={() => setIsAdding(false)} className="size-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center hover:bg-orange-600/10 hover:text-orange-600 transition-all">
                        <X className="size-5" />
                     </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <FileUpload 
                          path="news"
                          label="Featured Image (Optional)"
                          onUploadComplete={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                          previewUrl={formData.imageUrl}
                        />
                        
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Category</label>
                           <select className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-4 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                              <option value="महत्वपूर्ण">महत्वपूर्ण (Important)</option>
                              <option value="कार्यक्रम">कार्यक्रम (Events)</option>
                              <option value="सूचना">सूचना (Information)</option>
                              <option value="अन्य">अन्य (Other)</option>
                           </select>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Broadcast Title</label>
                           <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm" placeholder="Enter title" />
                        </div>
                        
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Description</label>
                           <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={8} required className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm resize-none" placeholder="Write details..." />
                        </div>
                     </div>
                  </div>

                  <button type="submit" className="w-full bg-orange-600 text-white py-4 rounded-[1.25rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-900 transition-all shadow-xl shadow-orange-600/20">
                     Broadcast Announcement Now
                  </button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {news.map(n => (
           <div key={n.id} className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-xl transition-all hover:border-orange-100">
              <div className="flex items-start justify-between mb-4">
                 <div className="flex-1">
                    <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-orange-100 w-fit mb-3">
                      <Bookmark className="size-3 fill-current" /> {n.category}
                    </div>
                    <h3 className="text-base font-black text-slate-800 leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors">{n.title}</h3>
                 </div>
                 <button onClick={() => n.id && handleDelete(n.id)} className="size-9 shrink-0 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                    <Trash2 className="size-4" />
                 </button>
              </div>
              
              {n.imageUrl && (
                 <div className="aspect-video w-full rounded-2xl overflow-hidden mb-4 border border-slate-100">
                    <img src={n.imageUrl} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 </div>
              )}
              
              <p className="text-slate-600 font-bold text-xs leading-relaxed line-clamp-4 mb-6 flex-grow">{n.content}</p>
              
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-slate-400">
                 <div className="flex items-center gap-2">
                    <Calendar className="size-3.5 text-orange-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{n.createdAt?.toDate?.().toLocaleDateString() || "Just Now"}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <button className="size-8 bg-slate-50 rounded-lg flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-all">
                       <Eye className="size-4" />
                    </button>
                 </div>
              </div>
           </div>
         ))}
         
         {!isLoading && news.length === 0 && (
           <div className="col-span-full py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
             <Megaphone className="size-12 text-slate-200 mx-auto mb-4" />
             <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No announcements in database</p>
           </div>
         )}
      </div>
    </div>
  );
}

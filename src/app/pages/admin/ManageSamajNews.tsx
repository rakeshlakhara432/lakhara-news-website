import { useState, useEffect } from "react";
import { Search, Loader2, Plus, Trash2, Megaphone, Calendar, Bookmark, Eye, Image } from "lucide-react";
import { samajService, NewsPost } from "../../services/samajService";
import { toast } from "sonner";

export function ManageSamajNews() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newNews, setNewNews] = useState({ title: "", content: "", category: "महत्वपूर्ण", imageUrl: "" });

  useEffect(() => {
    const unsub = samajService.subscribeToSamajNews(setNews);
    setIsLoading(false);
    return () => unsub();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await samajService.addSamajNews(newNews);
      toast.success("Samaj Announcement Broadcasted");
      setIsAdding(false);
      setNewNews({ title: "", content: "", category: "महत्वपूर्ण", imageUrl: "" });
    } catch (err) {
      toast.error("Failed to broadcast news");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await samajService.deleteSamajNews(id);
      toast.success("Announcement archived");
    } catch (err) {
      toast.error("Deletion failed");
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">Samaj <span className="text-primary italic">Media</span> Center</h1>
         <button onClick={() => setIsAdding(!isAdding)} className="px-8 py-3 bg-gray-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2">
           <Plus className="size-4" /> New Announcement
         </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-bhagva grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-4">
           <div className="space-y-4 col-span-full">
              <input required placeholder="Broadcast Title..." className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm italic" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} />
              <textarea required rows={4} placeholder="Content / Details..." className="w-full px-6 py-6 bg-gray-50 rounded-[2rem] border-none outline-none font-bold text-xs italic resize-none" value={newNews.content} onChange={e => setNewNews({...newNews, content: e.target.value})}></textarea>
           </div>
           <div className="grid grid-cols-2 gap-6 w-full md:col-span-full">
              <select className="px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-[10px] uppercase tracking-widest italic" value={newNews.category} onChange={e => setNewNews({...newNews, category: e.target.value})}>
                 <option value="महत्वपूर्ण">महत्वपूर्ण</option>
                 <option value="कार्यक्रम">कार्यक्रम</option>
                 <option value="सूचना">सूचना</option>
                 <option value="अन्य">अन्य</option>
              </select>
              <input placeholder="Image URL (Optional)..." className="px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-xs italic" value={newNews.imageUrl} onChange={e => setNewNews({...newNews, imageUrl: e.target.value})} />
           </div>
           <button type="submit" className="col-span-full py-6 bg-primary text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-4 group">
             Broadcast Notification <Megaphone className="size-5 group-hover:-translate-y-1 transition-transform" />
           </button>
        </form>
      )}

      {isLoading ? <Loader2 className="size-10 animate-spin mx-auto text-primary" /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {news.map(n => (
             <div key={n.id} className="group p-8 bg-white rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all relative overflow-hidden flex flex-col">
                <div className="flex items-start justify-between mb-8">
                   <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 bg-primary/5 text-primary px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest italic border border-primary/10">
                        <Bookmark className="size-3 fill-current" /> {n.category}
                      </div>
                      <h3 className="text-xl font-black text-gray-950 tracking-tighter uppercase italic leading-none line-clamp-2">{n.title}</h3>
                   </div>
                   <button onClick={() => handleDelete(n.id!)} className="size-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 className="size-4" />
                   </button>
                </div>
                <p className="text-gray-400 font-bold italic text-xs leading-relaxed line-clamp-3 mb-8 flex-grow">{n.content}</p>
                <div className="pt-8 border-t border-gray-50 flex items-center justify-between text-gray-300">
                   <div className="flex items-center gap-3">
                      <Calendar className="size-3" />
                      <span className="text-[8px] font-black uppercase tracking-widest italic">{n.createdAt?.toDate?.().toLocaleDateString() || "Just Now"}</span>
                   </div>
                   <div className="flex items-center gap-4">
                      {n.imageUrl && <Image className="size-4 text-primary" />}
                      <span className="p-2 bg-gray-50 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-all cursor-pointer">
                        <Eye className="size-4" />
                      </span>
                   </div>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
}

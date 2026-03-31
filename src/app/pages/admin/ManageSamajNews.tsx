import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Megaphone, Calendar, Bookmark, Eye, Image as ImageIcon } from "lucide-react";
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
    <div className="space-y-6 animate-in fade-in duration-700 pb-24">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold text-slate-800 leading-none">Samaj <span className="text-orange-600">Media Center</span></h1>
         <button onClick={() => setIsAdding(!isAdding)} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-orange-600 transition-colors flex items-center gap-2">
           <Plus className="size-4" /> {isAdding ? "Cancel" : "New Post"}
         </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-5 animate-in slide-in-from-top-4">
           <div className="space-y-4 col-span-full">
              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-slate-700">Broadcast Title</label>
                 <input required placeholder="Enter title..." className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none font-medium text-sm text-slate-800 transition-all" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-slate-700">Content / Details</label>
                 <textarea required rows={4} placeholder="Write announcement..." className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none font-medium text-sm text-slate-800 resize-none transition-all" value={newNews.content} onChange={e => setNewNews({...newNews, content: e.target.value})}></textarea>
              </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full md:col-span-full">
              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-slate-700">Category</label>
                 <select className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none font-medium text-sm text-slate-800 transition-all" value={newNews.category} onChange={e => setNewNews({...newNews, category: e.target.value})}>
                    <option value="महत्वपूर्ण">महत्वपूर्ण</option>
                    <option value="कार्यक्रम">कार्यक्रम</option>
                    <option value="सूचना">सूचना</option>
                    <option value="अन्य">अन्य</option>
                 </select>
              </div>
              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-slate-700">Image URL (Optional)</label>
                 <input placeholder="https://..." className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none font-medium text-sm text-slate-800 transition-all" value={newNews.imageUrl} onChange={e => setNewNews({...newNews, imageUrl: e.target.value})} />
              </div>
           </div>
           <div className="col-span-full pt-2">
              <button type="submit" className="w-full py-3.5 bg-orange-600 text-white rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 hover:bg-orange-500 transition-colors">
                Broadcast Notification <Megaphone className="size-4" />
              </button>
           </div>
        </form>
      )}

      {isLoading ? <Loader2 className="size-8 animate-spin mx-auto text-orange-600 my-20" /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {news.map(n => (
             <div key={n.id} className="group p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                   <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-orange-100 w-fit">
                        <Bookmark className="size-3 fill-current" /> {n.category}
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 leading-tight line-clamp-2 mt-1">{n.title}</h3>
                   </div>
                   <button onClick={() => handleDelete(n.id!)} className="size-8 shrink-0 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors">
                      <Trash2 className="size-4" />
                   </button>
                </div>
                <p className="text-slate-600 font-medium text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">{n.content}</p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-500">
                   <div className="flex items-center gap-2">
                      <Calendar className="size-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{n.createdAt?.toDate?.().toLocaleDateString() || "Just Now"}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      {n.imageUrl && <ImageIcon className="size-4 text-orange-600" />}
                      <span className="p-1.5 bg-slate-50 rounded-md hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer text-slate-400">
                        <Eye className="size-4" />
                      </span>
                   </div>
                </div>
             </div>
           ))}
           {news.length === 0 && (
             <div className="col-span-full py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300 text-center">
               <p className="text-slate-500 font-medium text-sm">No recent announcements found.</p>
             </div>
           )}
        </div>
      )}
    </div>
  );
}

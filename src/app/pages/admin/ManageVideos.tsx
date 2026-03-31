import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Video, Play, Radio, Monitor, Smartphone } from "lucide-react";
import { samajService, VideoPost } from "../../services/samajService";
import { toast } from "sonner";

export function ManageVideos() {
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    isLive: false
  });

  useEffect(() => {
    const unsub = samajService.subscribeToVideos(setVideos);
    setIsLoading(false);
    return () => unsub();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await samajService.addVideo(newVideo);
      toast.success("Video content broadcasted");
      setIsAdding(false);
      setNewVideo({ title: "", description: "", videoUrl: "", thumbnailUrl: "", isLive: false });
    } catch (err) {
      toast.error("Failed to add video");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await samajService.deleteVideo(id);
      toast.success("Broadcast archived");
    } catch (err) {
      toast.error("Deletion failed");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-24">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold text-slate-800 leading-none">Samaj <span className="text-orange-600">Video Center</span></h1>
         <button onClick={() => setIsAdding(!isAdding)} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-orange-600 transition-colors flex items-center gap-2">
           <Plus className="size-4" /> {isAdding ? "Cancel" : "Add Video"}
         </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-5 animate-in slide-in-from-top-4">
           <div className="space-y-4 col-span-full">
              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-slate-700 ml-1">Video Title</label>
                 <input required placeholder="Enter title..." className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none font-medium text-sm text-slate-800 transition-all focus:border-orange-500" value={newVideo.title} onChange={e => setNewVideo({...newVideo, title: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-slate-700 ml-1">Description</label>
                 <textarea required rows={3} placeholder="Enter details..." className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none font-medium text-sm text-slate-800 resize-none transition-all focus:border-orange-500" value={newVideo.description} onChange={e => setNewVideo({...newVideo, description: e.target.value})}></textarea>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full md:col-span-full">
              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-slate-700 ml-1">Video Source URL (YouTube)</label>
                 <input required placeholder="https://..." className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none font-medium text-sm text-slate-800 transition-all focus:border-orange-500" value={newVideo.videoUrl} onChange={e => setNewVideo({...newVideo, videoUrl: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-slate-700 ml-1">Thumbnail Image URL (Optional)</label>
                 <input placeholder="Image URL..." className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none font-medium text-sm text-slate-800 transition-all focus:border-orange-500" value={newVideo.thumbnailUrl} onChange={e => setNewVideo({...newVideo, thumbnailUrl: e.target.value})} />
              </div>
           </div>
           
           <div className="flex flex-col sm:flex-row items-center gap-4 col-span-full pt-2">
              <button 
                type="button" 
                onClick={() => setNewVideo({...newVideo, isLive: !newVideo.isLive})}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-colors flex items-center justify-center gap-2 ${newVideo.isLive ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
              >
                 <Radio className={`size-4 ${newVideo.isLive ? 'animate-pulse' : ''}`} /> {newVideo.isLive ? "Currently Live" : "Set as Live Video"}
              </button>
              <button type="submit" className="w-full sm:flex-grow py-3.5 bg-orange-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-orange-500 transition-colors flex items-center justify-center gap-2">
                Publish Video <Video className="size-4" />
              </button>
           </div>
        </form>
      )}

      {isLoading ? <Loader2 className="size-8 animate-spin mx-auto text-orange-600 my-20" /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {videos.map(v => (
             <div key={v.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden">
                <div className="relative aspect-video bg-slate-900 overflow-hidden flex-shrink-0">
                   {v.thumbnailUrl ? (
                     <img src={v.thumbnailUrl} className="size-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-75" alt={v.title} />
                   ) : (
                     <div className="size-full flex items-center justify-center text-slate-600"><Video className="size-8" /></div>
                   )}
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="size-12 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                         <Play className="size-5 fill-current ml-1" />
                      </div>
                   </div>
                   {v.isLive && (
                     <div className="absolute top-3 left-3 bg-rose-600 text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                        <Radio className="size-3 animate-pulse" /> Live Now
                     </div>
                   )}
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                   <h3 className="text-base font-bold text-slate-800 leading-tight line-clamp-2 mb-2">{v.title}</h3>
                   <p className="text-sm font-medium text-slate-500 line-clamp-2 mb-4">{v.description}</p>
                   
                   <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
                      <button onClick={() => handleDelete(v.id!)} className="size-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors">
                        <Trash2 className="size-4" />
                      </button>
                      <div className="flex items-center gap-2 text-slate-400">
                         <Monitor className="size-4" />
                         <Smartphone className="size-4" />
                      </div>
                   </div>
                </div>
             </div>
           ))}
           {videos.length === 0 && (
             <div className="col-span-full py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300 text-center">
               <p className="text-slate-500 font-medium text-sm">No videos found in the database.</p>
             </div>
           )}
        </div>
      )}
    </div>
  );
}

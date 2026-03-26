import { useState, useEffect } from "react";
import { Search, Loader2, Plus, Trash2, Video, Play, Radio, ArrowRight, Eye, Smartphone, Monitor } from "lucide-react";
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
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">Samaj <span className="text-primary italic">Live</span> & Broadcast</h1>
         <button onClick={() => setIsAdding(!isAdding)} className="px-8 py-3 bg-gray-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2">
           <Plus className="size-4" /> Schedule Broadcast
         </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-bhagva grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-4">
           <div className="space-y-4 col-span-full">
              <input required placeholder="Broadcast Title..." className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none font-bold text-sm italic" value={newVideo.title} onChange={e => setNewVideo({...newVideo, title: e.target.value})} />
              <textarea required rows={3} placeholder="Broadcast Description..." className="w-full px-6 py-6 bg-gray-50 rounded-[2rem] border-none font-bold text-xs italic resize-none" value={newVideo.description} onChange={e => setNewVideo({...newVideo, description: e.target.value})}></textarea>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:col-span-full">
              <input required placeholder="Video URL (YouTube/Live Stream)..." className="px-6 py-4 bg-gray-50 rounded-2xl border-none font-bold text-xs italic shadow-inner" value={newVideo.videoUrl} onChange={e => setNewVideo({...newVideo, videoUrl: e.target.value})} />
              <input placeholder="Thumbnail Image URL (Optional)..." className="px-6 py-4 bg-gray-50 rounded-2xl border-none font-bold text-xs italic shadow-inner" value={newVideo.thumbnailUrl} onChange={e => setNewVideo({...newVideo, thumbnailUrl: e.target.value})} />
           </div>
           <div className="flex items-center gap-6 col-span-full">
              <button 
                type="button" 
                onClick={() => setNewVideo({...newVideo, isLive: !newVideo.isLive})}
                className={`flex-grow py-4 rounded-xl font-black text-[9px] uppercase tracking-widest border-2 transition-all flex items-center justify-center gap-3 ${newVideo.isLive ? 'bg-red-50 text-red-600 border-red-500 shadow-xl shadow-red-500/20 animate-pulse' : 'bg-gray-50 text-gray-400 border-gray-100'}`}
              >
                 <Radio className="size-4" /> {newVideo.isLive ? "Currently Live" : "Set as Live Video"}
              </button>
              <button type="submit" className="flex-grow py-5 bg-primary text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-4 group">
                Seize Broadcast <Video className="size-5 group-hover:-translate-y-1 transition-transform" />
              </button>
           </div>
        </form>
      )}

      {isLoading ? <Loader2 className="size-10 animate-spin mx-auto text-primary" /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {videos.map(v => (
             <div key={v.id} className="group p-4 bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all relative overflow-hidden flex flex-col">
                <div className="relative aspect-video rounded-[2rem] bg-gray-900 border-4 border-white shadow-xl overflow-hidden mb-6 group-hover:scale-105 transition-transform">
                   {v.thumbnailUrl ? (
                     <img src={v.thumbnailUrl} className="size-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" alt={v.title} />
                   ) : (
                     <div className="size-full flex items-center justify-center text-gray-700 bg-gray-800"><Video className="size-10" /></div>
                   )}
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="size-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-125 transition-transform border-4 border-white/20">
                         <Play className="size-6 fill-current" />
                      </div>
                   </div>
                   {v.isLive && (
                     <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest italic animate-pulse shadow-lg flex items-center gap-2 border border-white/20">
                        <Radio className="size-3" /> Live Now
                     </div>
                   )}
                </div>
                
                <div className="px-4 pb-4 space-y-3 flex-grow">
                   <h3 className="text-md font-black text-gray-950 tracking-tighter uppercase italic leading-tight line-clamp-1">{v.title}</h3>
                   <p className="text-[9px] font-bold text-gray-400 italic line-clamp-2 leading-relaxed">{v.description}</p>
                </div>

                <div className="pt-6 px-4 border-t border-gray-50 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <button onClick={() => handleDelete(v.id!)} className="size-10 bg-gray-50 text-gray-300 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 className="size-4" />
                      </button>
                   </div>
                   <div className="flex items-center gap-3 text-gray-300">
                      <Monitor className="size-4" />
                      <Smartphone className="size-4" />
                   </div>
                </div>
             </div>
           ))}
        </div>
      )}

      {videos.length === 0 && !isLoading && (
        <div className="text-center py-40 bg-gray-50 rounded-[4rem] border-4 border-dashed border-gray-100 italic">
          <p className="text-gray-400 font-black uppercase tracking-widest text-xs opacity-40">No digital broadcasts detected in the Samaj streams</p>
        </div>
      )}
    </div>
  );
}

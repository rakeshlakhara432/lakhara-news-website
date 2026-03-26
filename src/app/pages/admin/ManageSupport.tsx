import { useState, useEffect } from "react";
import { Search, Loader2, Plus, Trash2, GraduationCap, Briefcase, Heart, Phone, MapPin } from "lucide-react";
import { samajService, SupportPost } from "../../services/samajService";
import { toast } from "sonner";

export function ManageSupport() {
  const [posts, setPosts] = useState<SupportPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newPost, setNewPost] = useState<Omit<SupportPost, "id" | "createdAt">>({ title: "", description: "", type: "शिक्षा", contact: "" });

  useEffect(() => {
    const unsub = samajService.subscribeToSupport(setPosts);
    setIsLoading(false);
    return () => unsub();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await samajService.addSupport(newPost);
      toast.success("Support/Aid opportunity published");
      setIsAdding(false);
      setNewPost({ title: "", description: "", type: "शिक्षा", contact: "" });
    } catch (err) {
      toast.error("Failed to add opportunity");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await samajService.deleteSupport(id);
      toast.success("Opportunity removed");
    } catch (err) {
      toast.error("Deletion failed");
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">Samaj <span className="text-primary italic">Scholarship</span> & Aid</h1>
         <button onClick={() => setIsAdding(!isAdding)} className="px-8 py-3 bg-gray-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2">
           <Plus className="size-4" /> Add Opportunity
         </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-bhagva grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-4">
           <div className="space-y-4 col-span-full">
              <input required placeholder="Opportunity Title..." className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm italic" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} />
              <textarea required rows={4} placeholder="Full Description / Eligibility..." className="w-full px-6 py-6 bg-gray-50 rounded-[2rem] border-none outline-none font-bold text-xs italic resize-none" value={newPost.description} onChange={e => setNewPost({...newPost, description: e.target.value})}></textarea>
           </div>
           <div className="grid grid-cols-2 gap-6 w-full md:col-span-full">
              <select className="px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-[10px] uppercase tracking-widest italic" value={newPost.type} onChange={e => setNewPost({...newPost, type: e.target.value as any})}>
                 <option value="शिक्षा">शिक्षा (Scholarship)</option>
                 <option value="सहायता">सहायता (Aid/Help)</option>
                 <option value="अन्य">अन्य (Other)</option>
              </select>
              <input required placeholder="Contact Number/Email..." className="px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-xs italic" value={newPost.contact} onChange={e => setNewPost({...newPost, contact: e.target.value})} />
           </div>
           <button type="submit" className="col-span-full py-6 bg-primary text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-4 group">
             Publish Aid Opportunity <GraduationCap className="size-5 group-hover:rotate-12 transition-transform" />
           </button>
        </form>
      )}

      {isLoading ? <Loader2 className="size-10 animate-spin mx-auto text-primary" /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {posts.map(post => (
             <div key={post.id} className="p-8 bg-white rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 size-24 bg-gradient-to-br from-primary/5 to-transparent rotate-[-45deg]"></div>
                <div className="flex items-center justify-between mb-8">
                   <div className="size-16 bg-gray-50 rounded-[2rem] flex items-center justify-center text-primary border border-primary/5">
                      {post.type === "शिक्षा" ? <GraduationCap className="size-8" /> : post.type === "सहायता" ? <Heart className="size-8" /> : <Briefcase className="size-8" />}
                   </div>
                   <button onClick={() => handleDelete(post.id!)} className="size-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 className="size-4" />
                   </button>
                </div>
                <div className="space-y-2 mb-6">
                   <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] italic">{post.type} Opportunity</span>
                   <h3 className="text-xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">{post.title}</h3>
                </div>
                <p className="text-gray-400 font-bold italic text-xs leading-relaxed mb-8 line-clamp-3">{post.description}</p>
                <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                   <div className="flex items-center gap-3 text-primary">
                      <Phone className="size-4" />
                      <span className="text-[10px] font-black italic tracking-widest uppercase">{post.contact}</span>
                   </div>
                   <div className="text-[9px] font-black text-gray-300 uppercase italic tracking-widest tracking-widest flex items-center gap-2">
                      <Calendar className="size-3" /> {post.createdAt?.toDate?.().toLocaleDateString() || "Active"}
                   </div>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, GraduationCap, Briefcase, Heart, Phone, Calendar } from "lucide-react";
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
      toast.success("Support opportunity published");
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
    <div className="space-y-6 animate-in fade-in duration-700 pb-24">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold text-slate-800 leading-none">Samaj <span className="text-orange-600">Scholarship & Aid</span></h1>
         <button onClick={() => setIsAdding(!isAdding)} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-orange-600 transition-colors flex items-center gap-2">
           <Plus className="size-4" /> {isAdding ? "Cancel" : "Add Opportunity"}
         </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-5 animate-in slide-in-from-top-4">
           <div className="space-y-4 col-span-full">
              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-slate-700 ml-1">Opportunity Title</label>
                 <input required placeholder="Enter title..." className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none font-medium text-sm text-slate-800 transition-all focus:border-orange-500" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-slate-700 ml-1">Full Description / Eligibility</label>
                 <textarea required rows={4} placeholder="Enter details..." className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none font-medium text-sm text-slate-800 resize-none transition-all focus:border-orange-500" value={newPost.description} onChange={e => setNewPost({...newPost, description: e.target.value})}></textarea>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full md:col-span-full">
              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-slate-700 ml-1">Type</label>
                 <select className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none font-medium text-sm text-slate-800 transition-all focus:border-orange-500" value={newPost.type} onChange={e => setNewPost({...newPost, type: e.target.value as any})}>
                    <option value="शिक्षा">शिक्षा (Scholarship)</option>
                    <option value="सहायता">सहायता (Aid/Help)</option>
                    <option value="अन्य">अन्य (Other)</option>
                 </select>
              </div>
              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-slate-700 ml-1">Contact Details</label>
                 <input required placeholder="Number or Email..." className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none font-medium text-sm text-slate-800 transition-all focus:border-orange-500" value={newPost.contact} onChange={e => setNewPost({...newPost, contact: e.target.value})} />
              </div>
           </div>
           
           <div className="col-span-full pt-2">
              <button type="submit" className="w-full py-3.5 bg-orange-600 text-white rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 hover:bg-orange-500 transition-colors">
                Publish Opportunity <GraduationCap className="size-4" />
              </button>
           </div>
        </form>
      )}

      {isLoading ? <Loader2 className="size-8 animate-spin mx-auto text-orange-600 my-20" /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {posts.map(post => (
             <div key={post.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start relative overflow-hidden group">
                
                <div className="flex items-start justify-between w-full mb-4">
                   <div className="size-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 border border-orange-100">
                      {post.type === "शिक्षा" ? <GraduationCap className="size-6" /> : post.type === "सहायता" ? <Heart className="size-6" /> : <Briefcase className="size-6" />}
                   </div>
                   <button onClick={() => handleDelete(post.id!)} className="size-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors">
                      <Trash2 className="size-4" />
                   </button>
                </div>
                
                <div className="space-y-1.5 mb-3">
                   <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">{post.type} Opportunity</span>
                   <h3 className="text-lg font-bold text-slate-800 leading-tight">{post.title}</h3>
                </div>
                
                <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6 line-clamp-3">{post.description}</p>
                
                <div className="pt-4 mt-auto border-t border-slate-100 flex items-center w-full justify-between">
                   <div className="flex items-center gap-2 text-slate-700">
                      <Phone className="size-3.5" />
                      <span className="text-xs font-bold">{post.contact}</span>
                   </div>
                   <div className="text-[10px] font-semibold text-slate-400 uppercase flex items-center gap-1.5">
                      <Calendar className="size-3" /> {post.createdAt?.toDate?.().toLocaleDateString() || "Active"}
                   </div>
                </div>
             </div>
           ))}
           {posts.length === 0 && (
             <div className="col-span-full py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300 text-center">
               <p className="text-slate-500 font-medium text-sm">No support opportunities active right now.</p>
             </div>
           )}
        </div>
      )}
    </div>
  );
}

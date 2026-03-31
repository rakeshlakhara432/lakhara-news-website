import { useState, useEffect } from "react";
import { Search, Loader2, Plus, Trash2, ShieldCheck, MapPin, Phone } from "lucide-react";
import { samajService, CommitteeMember } from "../../services/samajService";
import { toast } from "sonner";

export function ManageCommittee() {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", designation: "", city: "", phone: "", order: 1 });

  useEffect(() => {
    const unsub = samajService.subscribeToCommittee(setMembers);
    setIsLoading(false);
    return () => unsub();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await samajService.addCommittee(newMember);
      toast.success("Designation added to committee");
      setIsAdding(false);
      setNewMember({ name: "", designation: "", city: "", phone: "", order: members.length + 1 });
    } catch (err) {
      toast.error("Failed to add member");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await samajService.deleteCommittee(id);
      toast.success("Executive removed");
    } catch (err) {
      toast.error("Deletion failed");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-24">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold text-slate-800 leading-none">The <span className="text-orange-600">Executive</span> Council</h1>
         <button onClick={() => setIsAdding(!isAdding)} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-orange-600 transition-colors flex items-center gap-2">
           <Plus className="size-4" /> {isAdding ? "Cancel" : "Add Executive"}
         </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in slide-in-from-top-4">
           <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-700 ml-1">Name</label>
             <input required placeholder="Enter name..." className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none font-medium text-sm text-slate-800 focus:border-orange-500 transition-all" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} />
           </div>
           <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-700 ml-1">Designation</label>
             <input required placeholder="e.g. President" className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none font-medium text-sm text-slate-800 focus:border-orange-500 transition-all" value={newMember.designation} onChange={e => setNewMember({...newMember, designation: e.target.value})} />
           </div>
           <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-700 ml-1">City</label>
             <input required placeholder="City..." className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none font-medium text-sm text-slate-800 focus:border-orange-500 transition-all" value={newMember.city} onChange={e => setNewMember({...newMember, city: e.target.value})} />
           </div>
           <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-700 ml-1">Phone</label>
             <input required placeholder="Phone..." className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none font-medium text-sm text-slate-800 focus:border-orange-500 transition-all" value={newMember.phone} onChange={e => setNewMember({...newMember, phone: e.target.value})} />
           </div>
           <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-700 ml-1">Display Order</label>
             <input required type="number" placeholder="Order..." className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none font-medium text-sm text-slate-800 focus:border-orange-500 transition-all" value={newMember.order} onChange={e => setNewMember({...newMember, order: parseInt(e.target.value)})} />
           </div>
           <div className="flex items-end">
             <button type="submit" className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-sm shadow-sm transition-colors">Confirm Member</button>
           </div>
        </form>
      )}

      {isLoading ? <Loader2 className="size-8 animate-spin mx-auto text-orange-600 my-20" /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {members.map(m => (
             <div key={m.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                <div className="size-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4 border border-orange-100">
                   <ShieldCheck className="size-6" />
                </div>
                <div className="space-y-1 mb-4 flex-grow">
                   <h3 className="text-lg font-bold text-slate-800 leading-tight">{m.name}</h3>
                   <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">{m.designation}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                   <div className="flex flex-col gap-1.5 text-slate-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-3.5 shrink-0" />
                        <span className="text-[10px] font-bold uppercase tracking-wider truncate">{m.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="size-3.5 shrink-0" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{m.phone}</span>
                      </div>
                   </div>
                   <button onClick={() => handleDelete(m.id!)} className="size-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors shrink-0">
                      <Trash2 className="size-4" />
                   </button>
                </div>
             </div>
           ))}
           {members.length === 0 && (
             <div className="col-span-full py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300 text-center">
               <p className="text-slate-500 font-medium text-sm">No committee members found.</p>
             </div>
           )}
        </div>
      )}
    </div>
  );
}

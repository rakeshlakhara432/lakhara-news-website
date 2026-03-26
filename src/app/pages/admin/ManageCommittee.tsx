import { useState, useEffect } from "react";
import { Search, Loader2, Plus, Trash2, User, ShieldCheck, MapPin, Phone } from "lucide-react";
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
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">The <span className="text-primary italic">Executive</span> Council</h1>
         <button onClick={() => setIsAdding(!isAdding)} className="px-8 py-3 bg-gray-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2">
           <Plus className="size-4" /> Add Executive
         </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-bhagva grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-4">
           <input required placeholder="Name..." className="px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-xs italic" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} />
           <input required placeholder="Designation..." className="px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-xs italic" value={newMember.designation} onChange={e => setNewMember({...newMember, designation: e.target.value})} />
           <input required placeholder="City..." className="px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-xs italic" value={newMember.city} onChange={e => setNewMember({...newMember, city: e.target.value})} />
           <input required placeholder="Phone..." className="px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-xs italic" value={newMember.phone} onChange={e => setNewMember({...newMember, phone: e.target.value})} />
           <input required type="number" placeholder="Order..." className="px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-xs italic" value={newMember.order} onChange={e => setNewMember({...newMember, order: parseInt(e.target.value)})} />
           <button type="submit" className="bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Confirm Member</button>
        </form>
      )}

      {isLoading ? <Loader2 className="size-10 animate-spin mx-auto text-primary" /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {members.map(m => (
             <div key={m.id} className="p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 size-20 bg-gradient-to-br from-primary/5 to-transparent rotate-[-45deg]"></div>
                <div className="size-16 bg-primary/5 text-primary rounded-[1.5rem] flex items-center justify-center mb-6 border border-primary/10">
                   <ShieldCheck className="size-8" />
                </div>
                <div className="space-y-1">
                   <h3 className="text-lg font-black text-gray-950 tracking-tighter uppercase italic leading-none">{m.name}</h3>
                   <p className="text-[10px] font-black text-primary uppercase tracking-widest italic">{m.designation}</p>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                   <div className="flex flex-col gap-1 text-gray-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-3" />
                        <span className="text-[8px] font-black uppercase tracking-widest">{m.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="size-3" />
                        <span className="text-[8px] font-black uppercase tracking-widest">{m.phone}</span>
                      </div>
                   </div>
                   <button onClick={() => handleDelete(m.id!)} className="size-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 className="size-4" />
                   </button>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
}

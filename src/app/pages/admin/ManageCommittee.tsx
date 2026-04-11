import { useState, useEffect } from "react";
import { Search, Loader2, Plus, Trash2, ShieldCheck, MapPin, Phone, Upload, X, Camera } from "lucide-react";
import { samajService, CommitteeMember } from "../../services/samajService";
import { toast } from "sonner";

export function ManageCommittee() {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", designation: "अध्यक्ष", city: "", phone: "", order: 1, photoUrl: "" });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const unsub = samajService.subscribeToCommittee(setMembers);
    setIsLoading(false);
    return () => unsub();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 400; // Small size for profile pics
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        
        // compress to JPEG with 0.7 quality
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        setNewMember(prev => ({ ...prev, photoUrl: compressedBase64 }));
        setIsUploading(false);
        toast.success("Photo compressed and ready!");
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await samajService.addCommittee(newMember);
      toast.success("Member added to committee");
      setIsAdding(false);
      setNewMember({ name: "", designation: "अध्यक्ष", city: "", phone: "", order: members.length + 1, photoUrl: "" });
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
             <label className="text-xs font-bold text-slate-700 ml-1">Photo</label>
             <div className="bg-slate-50 border border-slate-200 rounded-xl flex items-center px-4 overflow-hidden h-[46px] focus-within:border-orange-500 transition-all">
                {newMember.photoUrl ? (
                  <div className="flex items-center gap-3 w-full">
                     <img src={newMember.photoUrl} className="size-8 rounded-full object-cover" />
                     <span className="text-xs font-bold text-slate-600 flex-1 truncate">Photo added</span>
                     <button type="button" onClick={() => setNewMember({...newMember, photoUrl: ""})} className="text-rose-500 hover:text-rose-600"><X className="size-4" /></button>
                  </div>
                ) : (
                  <label className="flex items-center gap-2 w-full cursor-pointer text-slate-500 hover:text-orange-600 transition-colors">
                     {isUploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
                     <span className="text-sm font-medium">{isUploading ? "Uploading..." : "Upload square photo"}</span>
                     <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                )}
             </div>
           </div>

           <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-700 ml-1">Designation</label>
             <select required className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none font-medium text-sm text-slate-800 focus:border-orange-500 transition-all" value={newMember.designation} onChange={e => setNewMember({...newMember, designation: e.target.value})}>
               <option value="अध्यक्ष">अध्यक्ष</option>
               <option value="उपाध्यक्ष">उपाध्यक्ष</option>
               <option value="महासचिव">महासचिव</option>
               <option value="कोषाध्यक्ष">कोषाध्यक्ष</option>
               <option value="प्रचार मंत्री">प्रचार मंत्री</option>
               <option value="सलाहकार">सलाहकार</option>
               <option value="कार्यकारी सदस्य">कार्यकारी सदस्य</option>
               <option value="मार्गदर्शक">मार्गदर्शक</option>
             </select>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
           {members.map(m => (
              <div key={m.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full items-center text-center">
                 <div className="size-14 rounded-full overflow-hidden border-2 border-orange-50 shadow-sm mb-3 flex-shrink-0 bg-orange-50 flex items-center justify-center">
                    {m.photoUrl ? (
                      <img src={m.photoUrl} alt={m.name} className="size-full object-cover" />
                    ) : (
                      <ShieldCheck className="size-6 text-orange-600" />
                    )}
                 </div>
                 <div className="space-y-1 mb-3 flex-grow">
                    <h3 className="text-sm font-black text-slate-800 leading-tight">{m.name}</h3>
                    <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest">{m.designation}</p>
                 </div>
                 <div className="pt-3 border-t border-slate-100 flex flex-col w-full gap-2 mt-auto">
                    <div className="flex flex-col gap-1.5 text-slate-500 mx-auto w-full px-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-3 shrink-0" />
                        <span className="text-[9px] font-bold uppercase tracking-wider truncate">{m.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="size-3 shrink-0" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">{m.phone}</span>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(m.id!)} className="w-full py-1.5 bg-slate-50 text-slate-400 font-bold text-[9px] uppercase tracking-widest rounded-lg flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors shrink-0 gap-1.5 mt-1">
                       <Trash2 className="size-3" /> Remove
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

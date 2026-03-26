import { useState, useEffect } from "react";
import { Search, Loader2, CheckCircle, Trash2, User, MapPin, Phone } from "lucide-react";
import { Button } from "../../components/ui/button";
import { samajService, Member } from "../../services/samajService";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";

export function ManageMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = samajService.subscribeToMembers((data) => {
      setMembers(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await samajService.deleteMember(deleteId);
      toast.success("Member deleted successfully");
    } catch (err) {
      toast.error("Failed to delete member");
    } finally {
      setDeleteId(null);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await samajService.approveMember(id);
      toast.success("Member approved successfully");
    } catch (err) {
      toast.error("Failed to approve member");
    }
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.occupation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">Manage <span className="text-primary italic">Members</span></h1>
      </div>

      <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center gap-4 px-6 py-3 bg-gray-50/50 rounded-full border border-gray-100">
          <Search className="size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search members by name, city, or occupation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none font-bold text-xs italic"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-10 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((m) => (
            <div key={m.id} className="group p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all">
              <div className="flex items-center gap-5">
                <div className="size-16 bg-gray-50 rounded-[1.5rem] flex items-center justify-center text-gray-300 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                  <User className="size-8" />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-lg font-black text-gray-950 tracking-tighter uppercase italic leading-none mb-1.5 truncate">{m.name}</h3>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="size-3" />
                    <span className="text-[9px] font-black uppercase tracking-widest italic">{m.city}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50 grid grid-cols-2 gap-4">
                <div className="space-y-1 text-xs">
                  <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest italic">Occupation</p>
                  <p className="font-bold text-gray-600 line-clamp-1">{m.occupation}</p>
                </div>
                <div className="space-y-1 text-right text-xs">
                  <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest italic">Father's Name</p>
                  <p className="font-bold text-gray-600 line-clamp-1">{m.fatherName}</p>
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest italic">Family Type</p>
                  <p className="font-bold text-gray-600">{m.familyType}</p>
                </div>
                <div className="space-y-1 text-right text-xs">
                  <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest italic">Phone</p>
                  <p className="font-bold text-primary">{m.phone}</p>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                {!m.isApproved ? (
                  <button 
                    onClick={() => handleApprove(m.id!)}
                    className="flex-grow py-3 bg-green-500 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg shadow-green-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="size-4" /> Approve
                  </button>
                ) : (
                  <div className="flex-grow py-3 bg-gray-50 text-green-600 rounded-xl font-black text-[9px] uppercase tracking-widest border border-green-100 flex items-center justify-center gap-2">
                    <CheckCircle className="size-4" /> Approved
                  </div>
                )}
                <button 
                  onClick={() => setDeleteId(m.id!)}
                  className="size-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95"
                >
                  <Trash2 className="size-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredMembers.length === 0 && !isLoading && (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-black italic uppercase tracking-widest text-xs">No personnel records found</p>
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-[2rem] border-none shadow-bhagva">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black text-2xl uppercase italic tracking-tighter">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="font-bold text-gray-500 italic">
              This action will permanently remove this member from the Samaj network. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-4">
            <AlertDialogCancel className="rounded-xl border-none bg-gray-50 font-black text-[10px] uppercase tracking-widest">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-red-500/10">Terminate Member</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

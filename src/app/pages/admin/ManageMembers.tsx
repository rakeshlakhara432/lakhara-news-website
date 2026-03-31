import { useState, useEffect } from "react";
import { Search, Loader2, CheckCircle, Trash2, User, MapPin } from "lucide-react";
import { samajService, Member } from "../../services/samajService";
import { smartSearch } from "../../../utils/mlUtils";
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

  const filteredMembers = smartSearch(
    searchQuery,
    members,
    (m) => `${m.name} ${m.city} ${m.occupation}`
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-24">
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 leading-none">Manage <span className="text-orange-600">Members</span></h1>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
          <Search className="size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search members by name, city, or occupation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none font-medium text-sm text-slate-800"
          />
        </div>
      </div>

      {isLoading ? (
         <div className="flex justify-center py-20">
           <Loader2 className="size-8 text-orange-600 animate-spin" />
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((m) => (
            <div key={m.id} className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="flex items-center gap-4">
                <div className="size-14 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:border-orange-100 transition-colors shrink-0">
                  <User className="size-6" />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-lg font-bold text-slate-800 truncate leading-tight mb-1">{m.name}</h3>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="size-3" />
                    <span className="text-[10px] font-bold uppercase tracking-wider truncate">{m.city}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 flex-grow">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Occupation</p>
                  <p className="text-sm font-medium text-slate-700 truncate">{m.occupation}</p>
                </div>
                <div className="space-y-0.5 text-right">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Father's Name</p>
                  <p className="text-sm font-medium text-slate-700 truncate">{m.fatherName}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Family Type</p>
                  <p className="text-sm font-medium text-slate-700">{m.familyType}</p>
                </div>
                <div className="space-y-0.5 text-right">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Phone</p>
                  <p className="text-sm font-bold text-orange-600">{m.phone}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex gap-3">
                {!m.isApproved ? (
                  <button 
                    onClick={() => handleApprove(m.id!)}
                    className="flex-grow py-2.5 bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="size-4" /> Approve
                  </button>
                ) : (
                  <div className="flex-grow py-2.5 bg-slate-50 text-emerald-600 rounded-xl font-bold text-xs uppercase tracking-wider border border-emerald-100 flex items-center justify-center gap-2">
                    <CheckCircle className="size-4" /> Approved
                  </div>
                )}
                <button 
                  onClick={() => setDeleteId(m.id!)}
                  className="size-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors shadow-sm shrink-0"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredMembers.length === 0 && !isLoading && (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
          <p className="text-slate-500 font-medium text-sm">No personnel records found</p>
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-3xl border-slate-200 p-6 sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold text-xl text-slate-800">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 text-sm mt-2">
              This action will permanently remove this member from the Samaj network. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-6">
            <AlertDialogCancel className="rounded-xl border-slate-200 bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 hover:text-slate-900 m-0">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="rounded-xl border-none bg-rose-600 hover:bg-rose-700 text-white font-bold m-0 shadow-sm">Delete Member</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

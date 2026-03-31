import { useState, useEffect } from "react";
import { Search, Loader2, CheckCircle, Trash2, MapPin, Phone, Star } from "lucide-react";
import { samajService, MatrimonialProfile } from "../../services/samajService";
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

export function ManageMatrimonial() {
  const [profiles, setProfiles] = useState<MatrimonialProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = samajService.subscribeToMatrimonial((data) => {
      setProfiles(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await samajService.deleteMatrimonial(deleteId);
      toast.success("Profile deleted successfully");
    } catch (err) {
      toast.error("Failed to delete profile");
    } finally {
      setDeleteId(null);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await samajService.updateMatrimonial(id, { isApproved: true });
      toast.success("Profile approved successfully");
    } catch (err) {
      toast.error("Failed to approve profile");
    }
  };

  const handleVerify = async (id: string, currentStatus: boolean) => {
    try {
      await samajService.updateMatrimonial(id, { isVerified: !currentStatus });
      toast.success(currentStatus ? "Verification removed" : "Profile verified!");
    } catch (err) {
      toast.error("Failed to update verification status");
    }
  };

  const filteredProfiles = profiles.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.education?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.occupation?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 leading-none">Manage <span className="text-orange-600">Matrimonial</span></h1>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
          <Search className="size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search matrimonial profiles by name, city..."
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
          {filteredProfiles.map((p) => (
            <div key={p.id} className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              
              <div className="flex items-center gap-4 mb-5">
                <div className={`size-14 rounded-full flex items-center justify-center font-bold text-xl shadow-sm border ${p.gender === 'वर' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-pink-50 text-pink-600 border-pink-100'}`}>
                   {p.name[0]}
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1 truncate">{p.name}</h3>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${p.gender === 'वर' ? 'bg-indigo-50 text-indigo-600' : 'bg-pink-50 text-pink-600'}`}>
                    {p.gender} &bull; {p.age} Yrs
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 flex-grow">
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin className="size-3.5 shrink-0" />
                  <span className="text-xs font-semibold truncate">{p.city}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                   <Star className="size-3.5 shrink-0" />
                   <span className="text-xs font-semibold truncate">{p.education || p.occupation}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-orange-600">
                  <div className="flex items-center gap-2">
                    <Phone className="size-3.5 shrink-0" />
                    <span className="text-xs font-bold">{p.phone}</span>
                  </div>
                  <button onClick={() => handleVerify(p.id!, p.isVerified)} className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-colors ${p.isVerified ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}>
                    {p.isVerified ? "Verified" : "Verify ID"}
                  </button>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-50 flex gap-3">
                {!p.isApproved ? (
                  <button 
                    onClick={() => handleApprove(p.id!)}
                    className="flex-grow py-2.5 bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-sm hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="size-4" /> Approve Match
                  </button>
                ) : (
                  <div className="flex-grow py-2.5 bg-slate-50 text-emerald-600 rounded-xl font-bold text-xs border border-emerald-100 flex items-center justify-center gap-2">
                    <CheckCircle className="size-4" /> Approved
                  </div>
                )}
                <button 
                  onClick={() => setDeleteId(p.id!)}
                  className="size-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors shadow-sm shrink-0"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProfiles.length === 0 && !isLoading && (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
          <p className="text-slate-500 font-medium text-sm">No matrimonial profiles detected.</p>
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-3xl border-slate-200 p-6 sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold text-xl text-slate-800">Delete Profile?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 text-sm mt-2">
              This will permanently remove this matrimonial profile from the Samaj platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-6">
            <AlertDialogCancel className="rounded-xl border-slate-200 bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 hover:text-slate-900 m-0">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="rounded-xl border-none bg-rose-600 hover:bg-rose-700 text-white font-bold m-0 shadow-sm">Purge Data</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

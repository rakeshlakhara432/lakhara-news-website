import { useState, useEffect } from "react";
import { Search, Loader2, CheckCircle, Trash2, Heart, MapPin, Phone, Star } from "lucide-react";
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">Manage <span className="text-primary italic">Matrimonial</span> Flow</h1>
      </div>

      <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center gap-4 px-6 py-3 bg-gray-50/50 rounded-full border border-gray-100">
          <Search className="size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search matrimonial profiles by name, city..."
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
          {filteredProfiles.map((p) => (
            <div key={p.id} className="group p-8 bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 size-20 bg-gradient-to-br from-primary/5 to-transparent rotate-[-45deg]"></div>
              
              <div className="flex items-center gap-5 mb-6">
                <div className={`size-16 rounded-[1.5rem] flex items-center justify-center font-black italic shadow-inner border transition-all ${p.gender === 'वर' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-pink-50 text-pink-600 border-pink-100'}`}>
                   {p.name[0]}
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-lg font-black text-gray-950 tracking-tighter uppercase italic leading-none mb-1 truncate">{p.name}</h3>
                  <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest italic ${p.gender === 'वर' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'} border border-transparent`}>
                    {p.gender} &bull; {p.age} Years
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="size-3" />
                  <span className="text-[10px] font-black uppercase tracking-widest italic">{p.city}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                   <Star className="size-3" />
                   <span className="text-[9px] font-black uppercase tracking-widest truncate">{p.education || p.occupation}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-primary">
                  <div className="flex items-center gap-3">
                    <Phone className="size-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">{p.phone}</span>
                  </div>
                  <button onClick={() => handleVerify(p.id!, p.isVerified)} className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest italic border ${p.isVerified ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                    {p.isVerified ? "Verified" : "Verify ID"}
                  </button>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                {!p.isApproved ? (
                  <button 
                    onClick={() => handleApprove(p.id!)}
                    className="flex-grow py-3 bg-primary text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="size-4" /> Approve
                  </button>
                ) : (
                  <div className="flex-grow py-3 bg-gray-50 text-primary rounded-xl font-black text-[9px] uppercase tracking-widest border border-primary/10 flex items-center justify-center gap-2 italic">
                    <CheckCircle className="size-4" /> Live Match
                  </div>
                )}
                <button 
                  onClick={() => setDeleteId(p.id!)}
                  className="size-12 bg-gray-950 text-white rounded-xl flex items-center justify-center hover:bg-red-600 transition-all shadow-xl active:scale-95"
                >
                  <Trash2 className="size-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProfiles.length === 0 && !isLoading && (
        <div className="text-center py-20 bg-gray-100 rounded-[3rem] border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-black italic uppercase tracking-widest text-[10px] opacity-40">No hearts detected in the database</p>
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-[2.5rem] border-none shadow-bhagva">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black text-2xl uppercase italic tracking-tighter text-gray-950">Confirm Deletion?</AlertDialogTitle>
            <AlertDialogDescription className="font-bold text-gray-500 italic">
              This will permanently remove this matrimonial profile from the Samaj platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-4">
            <AlertDialogCancel className="bg-gray-100 border-none font-black text-[9px] uppercase tracking-widest rounded-xl">Hold On</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 border-none font-black text-[9px] uppercase tracking-widest text-white rounded-xl shadow-xl shadow-red-500/20">Purge Data</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

import { useState, useEffect, useMemo } from "react";
import {
  Search, Loader2, CheckCircle, Trash2, User, MapPin, CreditCard, FileText,
  Users, X, Edit3, Download, Upload, Filter, BarChart3, Calendar, Phone,
  ChevronDown, CheckSquare, Square, RefreshCw, AlertTriangle, XCircle,
  Eye, ChevronLeft, ChevronRight, ArrowUpRight
} from "lucide-react";
import { adminService } from "../../services/api";
import { toast } from "sonner";
import { MemberIDCardModal } from "../../components/ui/MemberIDCardModal";
import { generateMembershipPDF } from "../../utils/generateMembershipPDF";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "../../components/ui/alert-dialog";

const PAGE_SIZE = 12;

export function ManageMembers() {
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "pending">("all");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [idCardMember, setIdCardMember] = useState<any>(null);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const res = await adminService.getMembers();
      if (res.success) {
        setMembers(res.data);
      }
    } catch (error) {
      toast.error("Failed to load members from Java backend");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filtered = useMemo(() => {
    let list = [...members];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(m => m.name?.toLowerCase().includes(q) || m.phone?.includes(q));
    }
    if (filterStatus === "approved") list = list.filter(m => m.approved);
    if (filterStatus === "pending") list = list.filter(m => !m.approved);
    return list;
  }, [members, searchQuery, filterStatus]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const handleApprove = async (id: string) => {
    const toastId = toast.loading("Approving member...");
    try {
      const res = await adminService.approveMember(id);
      if (res.success) {
        toast.success("Member approved successfully", { id: toastId });
        fetchMembers();
      }
    } catch {
      toast.error("Failed to approve", { id: toastId });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await adminService.deleteMember(deleteId);
      if (res.success) {
        toast.success("Member removed from system");
        fetchMembers();
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-700">
      
      {/* ── MODALS ── */}
      {idCardMember && <MemberIDCardModal member={idCardMember} onClose={() => setIdCardMember(null)} />}

      {/* ── HEADER ── */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
           <div className="size-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/20">
              <Users className="size-8" />
           </div>
           <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Directory <span className="text-indigo-600">Control</span></h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Professional Member Management</p>
           </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="text-right hidden sm:block">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Database</p>
              <p className="text-2xl font-black text-slate-900 leading-none mt-1">{members.length}</p>
           </div>
           <button onClick={fetchMembers} className="p-4 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all border border-slate-100 group">
              <RefreshCw className="size-5 group-hover:rotate-180 transition-transform duration-700" />
           </button>
        </div>
      </div>

      {/* ── SEARCH & FILTERS ── */}
      <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4">
         <div className="flex-1 flex items-center gap-4 bg-slate-50 rounded-2xl px-6 py-3 border border-slate-100 focus-within:bg-white focus-within:border-indigo-200 transition-all">
            <Search className="size-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, phone or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-sm font-bold text-slate-800 placeholder:text-slate-300"
            />
         </div>
         
         <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            {(["all", "approved", "pending"] as const).map(s => (
              <button 
                key={s} 
                onClick={() => setFilterStatus(s)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === s ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {s}
              </button>
            ))}
         </div>

         <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            <button onClick={() => setViewMode("grid")} className={`p-2 rounded-xl transition-all ${viewMode === "grid" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400"}`}><Users className="size-4" /></button>
            <button onClick={() => setViewMode("table")} className={`p-2 rounded-xl transition-all ${viewMode === "table" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400"}`}><Filter className="size-4" /></button>
         </div>
      </div>

      {/* ── LISTING ── */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
           <Loader2 className="size-10 text-indigo-600 animate-spin" />
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Synchronizing with Java Server...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {paginated.map((m, i) => (
             <div key={m.id} className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                   <div className="size-16 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shadow-inner">
                      {m.photoUrl ? <img src={m.photoUrl} className="size-full object-cover" /> : <User className="size-full p-4 text-slate-200" />}
                   </div>
                   <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${m.approved ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                      {m.approved ? 'Active' : 'Awaiting Approval'}
                   </div>
                </div>
                
                <div className="flex-1">
                   <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">{m.name}</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{m.memberId || 'PENDING_ID'}</p>
                   
                   <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-3 text-slate-500">
                         <Phone className="size-4 text-slate-300" />
                         <span className="text-xs font-bold">{m.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                         <MapPin className="size-4 text-slate-300" />
                         <span className="text-xs font-bold">{m.city}, {m.state}</span>
                      </div>
                   </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-3">
                   {!m.approved && (
                     <button 
                       onClick={() => handleApprove(m.id)}
                       className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                     >
                        <CheckCircle className="size-3.5" /> Approve
                     </button>
                   )}
                   <button onClick={() => setIdCardMember(m)} className="size-12 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl flex items-center justify-center transition-all border border-slate-100">
                      <CreditCard className="size-5" />
                   </button>
                   <button onClick={() => setDeleteId(m.id)} className="size-12 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl flex items-center justify-center transition-all border border-slate-100">
                      <Trash2 className="size-5" />
                   </button>
                </div>
             </div>
           ))}
        </div>
      )}

      {/* ── PAGINATION ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-10">
           <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:text-indigo-600 disabled:opacity-30"><ChevronLeft className="size-5" /></button>
           <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Page {page} of {totalPages}</span>
           <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:text-indigo-600 disabled:opacity-30"><ChevronRight className="size-5" /></button>
        </div>
      )}

      {/* ── DELETE DIALOG ── */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-[2rem] border-slate-100 p-10 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black text-2xl text-slate-900 tracking-tighter uppercase italic">Delete Record?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 text-sm mt-4 leading-relaxed font-medium">
               Are you sure you want to permanently remove this member from the Lakhara Digital database? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-4 mt-10">
            <AlertDialogCancel className="rounded-xl bg-slate-50 border-slate-100 font-black text-[10px] m-0 uppercase tracking-widest">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="rounded-xl bg-rose-600 hover:bg-rose-700 font-black text-[10px] m-0 uppercase tracking-widest shadow-xl shadow-rose-600/20">Delete Member</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}

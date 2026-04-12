import { useState, useEffect, useRef, useMemo } from "react";
import {
  Search, Loader2, CheckCircle, Trash2, User, MapPin, CreditCard, FileText,
  Users, X, Edit3, Download, Upload, Filter, BarChart3, Calendar, Phone,
  ChevronDown, CheckSquare, Square, RefreshCw, AlertTriangle, XCircle,
  Droplets, Briefcase, Eye, ChevronLeft, ChevronRight, ArrowUpDown
} from "lucide-react";
import { samajService, Member } from "../../services/samajService";
import { toast } from "sonner";
import { MemberIDCardModal } from "../../components/ui/MemberIDCardModal";
import { generateMembershipPDF } from "../../utils/generateMembershipPDF";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "../../components/ui/alert-dialog";

const PAGE_SIZE = 12;

// ── Helpers ──────────────────────────────────────────────────────────────────

function isToday(createdAt: any): boolean {
  if (!createdAt) return false;
  const ts = createdAt?.seconds ? createdAt.seconds * 1000 : Date.now();
  const d = new Date(ts);
  const now = new Date();
  return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function getAge(birthDate?: string): number | null {
  if (!birthDate) return null;
  const [y, m, d] = birthDate.split("-").map(Number);
  const now = new Date();
  let age = now.getFullYear() - y;
  if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) age--;
  return age;
}

// ── Excel Export ──────────────────────────────────────────────────────────────

function exportToCSV(members: Member[]) {
  const headers = ["SR", "Member ID", "Name", "Father Name", "Phone", "Email",
    "Blood Group", "City", "District", "State", "Occupation", "Family Type",
    "Status", "Registered On"];
  const rows = members.map((m, i) => [
    i + 1,
    m.memberId || "",
    m.name,
    m.fatherName,
    m.phone,
    m.email || "",
    m.bloodGroup || "",
    m.city,
    m.district || "",
    m.state || "",
    m.occupation,
    m.familyType || "",
    m.isApproved ? "Approved" : "Pending",
    m.createdAt?.seconds ? new Date(m.createdAt.seconds * 1000).toLocaleDateString("en-IN") : ""
  ]);
  const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `lakhara_members_${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
  toast.success("Excel / CSV export सफल! ✅");
}

// ── Excel Import (Bulk) ───────────────────────────────────────────────────────

async function parseAndImportCSV(file: File, onDone: (count: number) => void) {
  const text = await file.text();
  const lines = text.split("\n").filter(Boolean);
  const headers = lines[0].split(",").map(h => h.replace(/"/g, "").trim().toLowerCase());
  let imported = 0;
  for (let i = 1; i < lines.length; i++) {
    const vals = lines[i].split(",").map(v => v.replace(/"/g, "").trim());
    const row: any = {};
    headers.forEach((h, idx) => row[h] = vals[idx] || "");
    if (!row["name"] || !row["phone"]) continue;
    const dup = await samajService.checkDuplicate(row["phone"]);
    if (dup.phoneExists) continue;
    await samajService.addMember({
      name: row["name"] || "",
      fatherName: row["father name"] || row["fathername"] || "",
      phone: row["phone"] || "",
      email: row["email"] || "",
      bloodGroup: row["blood group"] || row["bloodgroup"] || "",
      city: row["city"] || "",
      district: row["district"] || "",
      state: row["state"] || "Rajasthan",
      pincode: row["pincode"] || "",
      occupation: row["occupation"] || "",
      familyType: row["family type"] || row["familytype"] || "एकल",
      memberId: row["member id"] || row["memberid"] || "",
      memberNumber: row["member id"]?.replace("LS-", "") || "",
    } as any);
    imported++;
  }
  onDone(imported);
}

// ── Member Edit Modal ─────────────────────────────────────────────────────────

function MemberEditModal({ member, onClose, onSave }: { member: Member; onClose: () => void; onSave: (data: Partial<Member>) => void }) {
  const [form, setForm] = useState<Partial<Member>>(member);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await samajService.updateMember(member.id!, form);
      onSave(form);
      toast.success("सदस्य विवरण अपडेट किया गया ✅");
      onClose();
    } catch {
      toast.error("अपडेट विफल।");
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-3xl p-8 shadow-2xl border border-slate-100 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div className="border-l-8 border-primary pl-5">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">सदस्य <span className="text-primary">संपादन</span></h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">MEMBER ID: {member.memberId || member.id?.slice(0, 8).toUpperCase()}</p>
          </div>
          <button onClick={onClose} className="size-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
            <X className="size-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { label: "पूरा नाम", key: "name", type: "text" },
            { label: "पिता/पति का नाम", key: "fatherName", type: "text" },
            { label: "मोबाइल नंबर", key: "phone", type: "tel" },
            { label: "ईमेल", key: "email", type: "email" },
            { label: "जन्म तिथि", key: "birthDate", type: "date" },
            { label: "शहर / गांव", key: "city", type: "text" },
            { label: "जिला", key: "district", type: "text" },
            { label: "राज्य", key: "state", type: "text" },
            { label: "पिनकोड", key: "pincode", type: "text" },
            { label: "व्यवसाय", key: "occupation", type: "text" },
          ].map(({ label, key, type }) => (
            <div key={key} className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
              <input type={type} value={(form as any)[key] || ""} onChange={e => setForm({ ...form, [key]: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:border-primary focus:bg-white outline-none transition-all" />
            </div>
          ))}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">रक्त समूह</label>
            <select value={form.bloodGroup || ""} onChange={e => setForm({ ...form, bloodGroup: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:border-primary outline-none appearance-none">
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => <option key={bg}>{bg}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">परिवार का प्रकार</label>
            <select value={form.familyType || "एकल"} onChange={e => setForm({ ...form, familyType: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:border-primary outline-none appearance-none">
              <option>एकल</option><option>संयुक्त</option><option>अन्य</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 pt-8">
          <button onClick={onClose} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">रद्द करें</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 py-3 bg-primary text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-lg">
            {saving ? <Loader2 className="size-5 animate-spin" /> : "सुरक्षित करें"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function ManageMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "pending">("all");
  const [filterBlood, setFilterBlood] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name">("newest");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [idCardMember, setIdCardMember] = useState<Member | null>(null);
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = samajService.subscribeToMembers((data) => {
      setMembers(data);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  // ── Stats ──────────────────────────────────────────────────────────────────

  const stats = useMemo(() => ({
    total: members.length,
    approved: members.filter(m => m.isApproved).length,
    pending: members.filter(m => !m.isApproved).length,
    today: members.filter(m => isToday(m.createdAt)).length,
  }), [members]);

  // ── Unique city list for filter ────────────────────────────────────────────

  const uniqueCities = useMemo(() => [...new Set(members.map(m => m.city).filter(Boolean))].sort(), [members]);

  // ── Filtered + Sorted members ──────────────────────────────────────────────

  const filtered = useMemo(() => {
    let list = [...members];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(m =>
        m.name?.toLowerCase().includes(q) ||
        m.phone?.includes(q) ||
        m.city?.toLowerCase().includes(q) ||
        m.fatherName?.toLowerCase().includes(q) ||
        m.memberId?.toLowerCase().includes(q) ||
        m.occupation?.toLowerCase().includes(q)
      );
    }
    if (filterStatus === "approved") list = list.filter(m => m.isApproved);
    if (filterStatus === "pending") list = list.filter(m => !m.isApproved);
    if (filterBlood) list = list.filter(m => m.bloodGroup === filterBlood);
    if (filterCity) list = list.filter(m => m.city === filterCity);
    if (sortBy === "newest") list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    if (sortBy === "oldest") list.sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
    if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name, "hi"));
    return list;
  }, [members, searchQuery, filterStatus, filterBlood, filterCity, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ── Actions ────────────────────────────────────────────────────────────────

  const handleApprove = async (id: string) => {
    try {
      await samajService.approveMember(id);
      toast.success("सदस्य स्वीकृत किया गया ✅");
    } catch { toast.error("त्रुटि!"); }
  };

  const handleReject = async (id: string) => {
    try {
      await samajService.updateMember(id, { isApproved: false });
      toast.success("अस्वीकृत किया गया");
    } catch { toast.error("त्रुटि!"); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await samajService.deleteMember(deleteId);
      toast.success("सदस्य हटाया गया");
    } catch { toast.error("हटाने में त्रुटि"); } finally { setDeleteId(null); }
  };

  const handleBulkApprove = async () => {
    if (!selectedIds.size) return;
    const ids = [...selectedIds];
    await Promise.all(ids.map(id => samajService.approveMember(id)));
    toast.success(`${ids.length} सदस्य स्वीकृत किए गए ✅`);
    setSelectedIds(new Set());
  };

  const handleBulkDelete = async () => {
    const ids = [...selectedIds];
    await Promise.all(ids.map(id => samajService.deleteMember(id)));
    toast.success(`${ids.length} सदस्य हटाए गए`);
    setSelectedIds(new Set());
    setBulkDeleteOpen(false);
  };

  const handleBulkIDCards = async () => {
    const targets = filtered.filter(m => selectedIds.has(m.id!) && m.isApproved);
    if (!targets.length) { toast.error("कोई स्वीकृत सदस्य नहीं चुना गया"); return; }
    setIsBulkGenerating(true);
    let done = 0;
    for (const m of targets) {
      try {
        await generateMembershipPDF({
          memberId: m.memberId || `LS-${m.memberNumber || "000000"}`,
          memberNumber: m.memberNumber || "000000",
          name: m.name, fatherName: m.fatherName, address: m.city, city: m.city,
          dateOfIssue: new Date(m.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString("hi-IN"),
        });
        done++;
        await new Promise(r => setTimeout(r, 600));
      } catch {}
    }
    toast.success(`${done} सर्टिफिकेट Download किए गए`);
    setIsBulkGenerating(false);
  };

  const handleDownloadCert = async (m: Member) => {
    setIsGenerating(m.id || "gen");
    try {
      await generateMembershipPDF({
        memberId: m.memberId || `LS-${m.memberNumber || "000000"}`,
        memberNumber: m.memberNumber || "000000",
        name: m.name, fatherName: m.fatherName, address: m.city, city: m.city,
        dateOfIssue: new Date(m.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString("hi-IN"),
      });
      toast.success("Certificate downloaded!");
    } catch { toast.error("Generation failed"); } finally { setIsGenerating(null); }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImporting(true);
    const toastId = toast.loading("Excel import हो रहा है...");
    try {
      await parseAndImportCSV(file, (count) => {
        toast.dismiss(toastId);
        toast.success(`${count} नए सदस्य import किए गए! 🎉`);
      });
    } catch { toast.dismiss(toastId); toast.error("Import विफल।"); }
    finally { setIsImporting(false); if (importRef.current) importRef.current.value = ""; }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginated.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginated.map(m => m.id!).filter(Boolean)));
    }
  };

  const resetFilters = () => {
    setSearchQuery(""); setFilterStatus("all"); setFilterBlood(""); setFilterCity(""); setSortBy("newest"); setPage(1);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6 pb-24">
      {/* ── MODALS ── */}
      {idCardMember && <MemberIDCardModal member={idCardMember} onClose={() => setIdCardMember(null)} />}
      {editMember && (
        <MemberEditModal
          member={editMember}
          onClose={() => setEditMember(null)}
          onSave={(data) => setMembers(prev => prev.map(m => m.id === editMember.id ? { ...m, ...data } : m))}
        />
      )}

      {/* ── HEADER ── */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="border-l-8 border-primary pl-6">
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">सदस्य <span className="text-primary">प्रबंधन</span></h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">MEMBER MANAGEMENT PORTAL • LAKHARA DIGITAL</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Export Button */}
          <button onClick={() => exportToCSV(filtered)}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all">
            <Download className="size-4" /> Export Excel
          </button>
          {/* Bulk Import Button */}
          <button onClick={() => importRef.current?.click()} disabled={isImporting}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all disabled:opacity-60">
            {isImporting ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Bulk Import
          </button>
          <input ref={importRef} type="file" accept=".csv,.xlsx" className="hidden" onChange={handleImport} />
        </div>
      </div>

      {/* ── STATS CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "कुल सदस्य", val: stats.total, icon: Users, color: "bg-orange-50 text-orange-600 border-orange-100" },
          { label: "आज के नए", val: stats.today, icon: Calendar, color: "bg-blue-50 text-blue-600 border-blue-100" },
          { label: "स्वीकृत", val: stats.approved, icon: CheckCircle, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
          { label: "लंबित", val: stats.pending, icon: AlertTriangle, color: "bg-amber-50 text-amber-600 border-amber-100" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group">
            <div className={`size-12 ${s.color} border rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <s.icon className="size-6" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
            <p className="text-4xl font-black text-slate-800 tracking-tighter leading-none mt-1">{s.val}</p>
          </div>
        ))}
      </div>

      {/* ── SEARCH + FILTERS ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        {/* Search */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-primary focus-within:bg-white transition-all">
          <Search className="size-5 text-slate-400 shrink-0" />
          <input type="text" value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
            placeholder="नाम, मोबाइल, शहर, ID से खोजें..."
            className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-800 placeholder:text-slate-300" />
          {searchQuery && <button onClick={resetFilters}><X className="size-4 text-slate-400 hover:text-rose-500" /></button>}
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap gap-3">
          {/* Status Filter */}
          <div className="flex bg-slate-50 border border-slate-100 rounded-xl p-1 gap-1">
            {(["all", "approved", "pending"] as const).map(s => (
              <button key={s} onClick={() => { setFilterStatus(s); setPage(1); }}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === s ? "bg-primary text-white shadow-sm" : "text-slate-400 hover:text-slate-700"}`}>
                {s === "all" ? "सभी" : s === "approved" ? "✅ स्वीकृत" : "⏳ लंबित"}
              </button>
            ))}
          </div>

          {/* Blood Group Filter */}
          <select value={filterBlood} onChange={e => { setFilterBlood(e.target.value); setPage(1); }}
            className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-black text-slate-600 uppercase tracking-widest appearance-none outline-none focus:border-primary">
            <option value="">🩸 Blood Group</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => <option key={bg}>{bg}</option>)}
          </select>

          {/* City Filter */}
          <select value={filterCity} onChange={e => { setFilterCity(e.target.value); setPage(1); }}
            className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-black text-slate-600 uppercase tracking-widest appearance-none outline-none focus:border-primary">
            <option value="">📍 शहर चुनें</option>
            {uniqueCities.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* Sort */}
          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
            className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-black text-slate-600 uppercase tracking-widest appearance-none outline-none focus:border-primary">
            <option value="newest">⬇ नवीनतम पहले</option>
            <option value="oldest">⬆ पुराने पहले</option>
            <option value="name">अ-ज (नाम)</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-slate-50 border border-slate-100 rounded-xl p-1 gap-1 ml-auto">
            <button onClick={() => setViewMode("grid")} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${viewMode === "grid" ? "bg-primary text-white" : "text-slate-400"}`}>Grid</button>
            <button onClick={() => setViewMode("table")} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${viewMode === "table" ? "bg-primary text-white" : "text-slate-400"}`}>Table</button>
          </div>

          <button onClick={resetFilters} title="Filters Reset" className="size-9 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all">
            <RefreshCw className="size-4" />
          </button>
        </div>

        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {filtered.length} सदस्य मिले • Page {page} of {totalPages}
        </p>
      </div>

      {/* ── BULK ACTION BAR ── */}
      {selectedIds.size > 0 && (
        <div className="bg-slate-900 rounded-2xl px-6 py-4 flex flex-wrap items-center gap-4 text-white shadow-xl">
          <span className="text-sm font-black">{selectedIds.size} सदस्य चुने गए</span>
          <div className="h-5 w-px bg-white/20"></div>
          <button onClick={handleBulkApprove} className="flex items-center gap-2 px-5 py-2 bg-emerald-600 rounded-xl font-black text-xs uppercase hover:bg-emerald-700 transition-all">
            <CheckCircle className="size-4" /> Approve All
          </button>
          <button onClick={handleBulkIDCards} disabled={isBulkGenerating} className="flex items-center gap-2 px-5 py-2 bg-blue-600 rounded-xl font-black text-xs uppercase hover:bg-blue-700 transition-all disabled:opacity-50">
            {isBulkGenerating ? <Loader2 className="size-4 animate-spin" /> : <FileText className="size-4" />} Bulk PDF
          </button>
          <button onClick={() => setBulkDeleteOpen(true)} className="flex items-center gap-2 px-5 py-2 bg-rose-600 rounded-xl font-black text-xs uppercase hover:bg-rose-700 transition-all">
            <Trash2 className="size-4" /> Delete Selected
          </button>
          <button onClick={() => setSelectedIds(new Set())} className="ml-auto text-slate-400 hover:text-white">
            <X className="size-5" />
          </button>
        </div>
      )}

      {/* ── MEMBERS LIST ── */}
      {isLoading ? (
        <div className="flex justify-center py-24"><Loader2 className="size-10 text-primary animate-spin" /></div>
      ) : paginated.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <Search className="size-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 font-bold text-sm">कोई सदस्य नहीं मिला</p>
          <button onClick={resetFilters} className="mt-4 text-primary text-xs font-black hover:underline">Filter हटाएं</button>
        </div>
      ) : viewMode === "grid" ? (
        /* ── GRID VIEW ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Select All row */}
          <div className="md:col-span-2 lg:col-span-3 flex items-center gap-3 px-2">
            <button onClick={toggleSelectAll} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
              {selectedIds.size === paginated.length ? <CheckSquare className="size-5 text-primary" /> : <Square className="size-5" />}
              सभी चुनें
            </button>
          </div>

          {paginated.map(m => (
            <div key={m.id} className={`bg-white rounded-2xl border-2 shadow-sm hover:shadow-md transition-all flex flex-col ${selectedIds.has(m.id!) ? "border-primary" : "border-slate-100"}`}>
              <div className="p-6 flex items-start gap-4">
                <button onClick={() => toggleSelect(m.id!)} className="mt-1 shrink-0">
                  {selectedIds.has(m.id!) ? <CheckSquare className="size-5 text-primary" /> : <Square className="size-5 text-slate-200" />}
                </button>
                {/* Photo */}
                <div className="size-14 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                  {m.photoUrl ? <img src={m.photoUrl} className="size-full object-cover" alt={m.name} /> : (
                    <div className="size-full flex items-center justify-center text-slate-300"><User className="size-7" /></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-black text-slate-800 text-base leading-tight truncate">{m.name}</h3>
                    <span className={`shrink-0 text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${m.isApproved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {m.isApproved ? "Approved" : "Pending"}
                    </span>
                  </div>
                  <p className="text-[10px] font-black text-primary mt-0.5">{m.memberId || "—"}</p>
                  <div className="flex items-center gap-1.5 text-slate-400 mt-1">
                    <MapPin className="size-3" />
                    <span className="text-[10px] font-bold truncate">{m.city}{m.state ? `, ${m.state}` : ""}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-4 grid grid-cols-2 gap-3 border-t border-slate-50 pt-4 text-[11px]">
                <div>
                  <p className="text-slate-400 font-bold uppercase tracking-wider">मोबाइल</p>
                  <p className="font-black text-slate-700">{m.phone}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold uppercase tracking-wider">रक्त समूह</p>
                  <p className="font-black text-slate-700">{m.bloodGroup || "—"}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold uppercase tracking-wider">व्यवसाय</p>
                  <p className="font-black text-slate-700 truncate">{m.occupation || "—"}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold uppercase tracking-wider">आयु</p>
                  <p className="font-black text-slate-700">{getAge(m.birthDate) ? `${getAge(m.birthDate)} वर्ष` : "—"}</p>
                </div>
              </div>

              <div className="px-5 pb-5 flex gap-2 flex-wrap">
                {!m.isApproved ? (
                  <button onClick={() => handleApprove(m.id!)}
                    className="flex-1 py-2 bg-emerald-500 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-1.5 shadow-sm">
                    <CheckCircle className="size-3.5" /> Approve
                  </button>
                ) : (
                  <button onClick={() => handleReject(m.id!)}
                    className="flex-1 py-2 bg-slate-50 text-emerald-600 border border-emerald-100 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all flex items-center justify-center gap-1.5">
                    <CheckCircle className="size-3.5" /> Approved
                  </button>
                )}
                <button onClick={() => setEditMember(m)} title="Edit" className="size-9 bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-100">
                  <Edit3 className="size-4" />
                </button>
                <button onClick={() => setIdCardMember(m)} title="ID Card" className="size-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all border border-blue-100">
                  <CreditCard className="size-4" />
                </button>
                <button onClick={() => handleDownloadCert(m)} disabled={isGenerating === m.id} title="Certificate" className="size-9 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all border border-amber-100 disabled:opacity-50">
                  {isGenerating === m.id ? <Loader2 className="size-4 animate-spin" /> : <FileText className="size-4" />}
                </button>
                <button onClick={() => setDeleteId(m.id!)} className="size-9 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all border border-rose-100">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ── TABLE VIEW ── */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 text-left w-10">
                    <button onClick={toggleSelectAll}>{selectedIds.size === paginated.length ? <CheckSquare className="size-4 text-primary" /> : <Square className="size-4 text-slate-300" />}</button>
                  </th>
                  {["#", "Name", "Phone", "City", "Blood", "Status", "Joined", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginated.map((m, i) => (
                  <tr key={m.id} className={`hover:bg-slate-50 transition-colors ${selectedIds.has(m.id!) ? "bg-primary/5" : ""}`}>
                    <td className="p-4">
                      <button onClick={() => toggleSelect(m.id!)}>
                        {selectedIds.has(m.id!) ? <CheckSquare className="size-4 text-primary" /> : <Square className="size-4 text-slate-200" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-[10px] font-black text-slate-400">{(page - 1) * PAGE_SIZE + i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-xl bg-slate-50 overflow-hidden shrink-0">
                          {m.photoUrl ? <img src={m.photoUrl} className="size-full object-cover" /> : <div className="size-full flex items-center justify-center"><User className="size-4 text-slate-300" /></div>}
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-xs">{m.name}</p>
                          <p className="text-[9px] font-bold text-primary">{m.memberId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-700 text-xs">{m.phone}</td>
                    <td className="px-4 py-3 font-bold text-slate-500 text-xs">{m.city}</td>
                    <td className="px-4 py-3 font-black text-xs">{m.bloodGroup || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[9px] px-2.5 py-1 font-black rounded-full uppercase ${m.isApproved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {m.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-400 text-[10px]">
                      {m.createdAt?.seconds ? new Date(m.createdAt.seconds * 1000).toLocaleDateString("en-IN") : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        {!m.isApproved && (
                          <button onClick={() => handleApprove(m.id!)} className="size-7 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                            <CheckCircle className="size-3.5" />
                          </button>
                        )}
                        <button onClick={() => setEditMember(m)} className="size-7 bg-slate-50 text-slate-500 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                          <Edit3 className="size-3.5" />
                        </button>
                        <button onClick={() => setIdCardMember(m)} className="size-7 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                          <CreditCard className="size-3.5" />
                        </button>
                        <button onClick={() => setDeleteId(m.id!)} className="size-7 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── PAGINATION ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 px-6 py-4 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
              className="size-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all disabled:opacity-30">
              <ChevronLeft className="size-5" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pg = page <= 3 ? i + 1 : i + page - 2;
              if (pg > totalPages) return null;
              return (
                <button key={pg} onClick={() => setPage(pg)}
                  className={`size-9 rounded-xl font-black text-xs transition-all ${pg === page ? "bg-primary text-white shadow-sm" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}>
                  {pg}
                </button>
              );
            })}
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
              className="size-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all disabled:opacity-30">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM ── */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-3xl border-slate-200 p-8 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black text-xl text-slate-800">सदस्य हटाएं?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 text-sm mt-2">
              यह क्रिया स्थायी है। सदस्य का सारा डेटा समाज नेटवर्क से हटा दिया जाएगा।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-6">
            <AlertDialogCancel className="rounded-xl bg-slate-50 border-slate-200 font-bold m-0">रद्द करें</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="rounded-xl bg-rose-600 hover:bg-rose-700 font-bold m-0">हाँ, हटाएं</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── BULK DELETE CONFIRM ── */}
      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent className="rounded-3xl border-slate-200 p-8 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black text-xl text-slate-800">{selectedIds.size} सदस्य हटाएं?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 text-sm mt-2">
              यह क्रिया स्थायी है और पूर्ववत नहीं की जा सकती।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-6">
            <AlertDialogCancel className="rounded-xl bg-slate-50 border-slate-200 font-bold m-0">रद्द करें</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} className="rounded-xl bg-rose-600 hover:bg-rose-700 font-bold m-0">हाँ, सभी हटाएं</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

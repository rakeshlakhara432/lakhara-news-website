import { useState, useEffect } from "react";
import { Search, Loader2, Trash2, Mail, MessageCircle, User } from "lucide-react";
import { samajService, ContactMessage } from "../../services/samajService";
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

export function ManageMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = samajService.subscribeToMessages((data) => {
      setMessages(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await samajService.deleteMessage(deleteId);
      toast.success("Message deleted successfully");
    } catch (err) {
      toast.error("Failed to delete message");
    } finally {
      setDeleteId(null);
    }
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: any) => {
    if (!date) return "N/A";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 leading-none">Inbound <span className="text-orange-600">Messages</span></h1>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 transition-all">
          <Search className="size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search messages by name, subject, or content..."
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
        <div className="space-y-4">
          {filteredMessages.map((m) => (
            <div key={m.id} className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center border border-slate-200 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors shrink-0">
                      <User className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 leading-none mb-1">{m.name}</h3>
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{formatDate(m.createdAt)}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold border border-slate-200">
                    <Mail className="size-3" /> {m.subject}
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-1.5 pt-1 lg:pt-0">
                   <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">
                      <MessageCircle className="size-3.5" /> Message Details
                   </div>
                   <p className="text-sm font-medium text-slate-600 leading-relaxed border-l-2 border-slate-200 pl-4 group-hover:border-orange-200 transition-colors whitespace-pre-wrap">{m.message}</p>
                </div>

                <div className="flex items-center justify-start lg:justify-end pt-2 lg:pt-0">
                   <button 
                     onClick={() => setDeleteId(m.id!)}
                     className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg font-bold text-xs hover:bg-rose-600 hover:text-white transition-colors flex items-center gap-2 border border-rose-100"
                   >
                     <Trash2 className="size-3.5" /> Delete Message
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredMessages.length === 0 && !isLoading && (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
           <p className="text-slate-500 font-medium text-sm">No inbound messages found.</p>
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-3xl border-slate-200 p-6 sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold text-xl text-slate-800">Delete Message?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 text-sm mt-2">
              This will permanently delete this message from the system. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-6">
            <AlertDialogCancel className="rounded-xl border-slate-200 bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 hover:text-slate-900 m-0">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="rounded-xl border-none bg-rose-600 hover:bg-rose-700 text-white font-bold m-0 shadow-sm">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

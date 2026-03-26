import { useState, useEffect } from "react";
import { Search, Loader2, Trash2, Mail, MessageCircle, User, Calendar } from "lucide-react";
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">Inbound <span className="text-primary italic">Messages</span></h1>
      </div>

      <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center gap-4 px-6 py-3 bg-gray-50/50 rounded-full border border-gray-100">
          <Search className="size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages by name, subject, or content..."
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
        <div className="space-y-6">
          {filteredMessages.map((m) => (
            <div key={m.id} className="group bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 size-32 bg-primary/5 rounded-bl-[8rem] group-hover:bg-primary/10 transition-all"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="size-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      <User className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-gray-950 uppercase italic leading-none mb-1">{m.name}</h3>
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{formatDate(m.createdAt)}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 text-gray-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-gray-100 italic">
                    <Mail className="size-3" /> {m.subject}
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-2">
                   <div className="flex items-center gap-2 text-[9px] font-black text-primary uppercase tracking-[0.3em] italic mb-3">
                      <MessageCircle className="size-3" /> Communication Content
                   </div>
                   <p className="text-sm font-bold text-gray-600 leading-relaxed italic border-l-4 border-gray-100 pl-6 group-hover:border-primary/20 transition-all">{m.message}</p>
                </div>

                <div className="flex items-center justify-end">
                   <button 
                     onClick={() => setDeleteId(m.id!)}
                     className="px-8 py-3 bg-red-50 text-red-600 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95 flex items-center gap-3"
                   >
                     <Trash2 className="size-4" /> Purge Message
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredMessages.length === 0 && !isLoading && (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
           <p className="text-gray-400 font-black italic uppercase tracking-[0.5em] text-[10px] opacity-30">NO INBOUND COMMUNICATIONS</p>
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-[2.5rem] border-none shadow-bhagva-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black text-2xl uppercase italic tracking-tighter text-gray-950">Discard Communication?</AlertDialogTitle>
            <AlertDialogDescription className="font-bold text-gray-500 italic">
              This will permanently delete this message from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-4">
            <AlertDialogCancel className="bg-gray-100 border-none font-black text-[9px] uppercase tracking-widest rounded-xl">Hold On</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 border-none font-black text-[9px] uppercase tracking-widest text-white rounded-xl shadow-xl shadow-red-500/20">Purge Message</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

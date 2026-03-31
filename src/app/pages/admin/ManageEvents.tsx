import { useState, useEffect } from "react";
import { Search, Loader2, Plus, Trash2, Calendar, MapPin, Tag, ArrowRight } from "lucide-react";
import { samajService, SamajEvent } from "../../services/samajService";
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

export function ManageEvents() {
  const [events, setEvents] = useState<SamajEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form state
  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    type: "बैठक",
  });

  useEffect(() => {
    const unsubscribe = samajService.subscribeToEvents((data) => {
      setEvents(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await samajService.deleteEvent(deleteId);
      toast.success("Event deleted successfully");
    } catch (err) {
      toast.error("Failed to delete event");
    } finally {
      setDeleteId(null);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await samajService.addEvent(newEvent);
      toast.success("Event posted successfully");
      setIsAdding(false);
      setNewEvent({ title: "", date: "", location: "", description: "", type: "बैठक" });
    } catch (err) {
      toast.error("Failed to post event");
    }
  };

  const filteredEvents = events.filter(
    (ev) =>
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 leading-none">Manage <span className="text-orange-600">Events</span></h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-500 transition-colors text-xs shadow-sm flex items-center gap-2"
        >
          <Plus className="size-4" /> {isAdding ? "Cancel" : "Create Event"}
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
          <Search className="size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search events by title or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none font-medium text-sm text-slate-800"
          />
        </div>
      </div>

      {isAdding && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">Draft <span className="text-orange-600">New Event</span></h2>
              </div>
              <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 ml-1">Event Title</label>
                  <input required placeholder="Enter event name..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-sm text-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 ml-1">Date</label>
                  <input required type="text" placeholder="e.g. 28 मार्च 2026" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-sm text-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 ml-1">Location</label>
                  <input required placeholder="Enter address..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-sm text-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 ml-1">Event Description</label>
                  <textarea required rows={4} placeholder="Describe the purpose..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-sm text-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none resize-none" value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} />
                </div>
                <div className="md:col-span-2 pt-2">
                  <button type="submit" className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors text-sm flex items-center justify-center gap-2">
                    Publish Event <ArrowRight className="size-4" />
                  </button>
                </div>
              </form>
           </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-8 text-orange-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div key={ev.id} className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              
              <div className="flex-grow space-y-5">
                <div className="flex items-center justify-between">
                   <div className="size-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shadow-sm border border-orange-100">
                     <Calendar className="size-6" />
                   </div>
                   <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                     <Tag className="size-3" /> {ev.type}
                   </div>
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-800 leading-tight line-clamp-2">{ev.title}</h3>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="size-4 shrink-0" />
                    <span className="text-xs font-semibold">{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin className="size-4 shrink-0" />
                    <span className="text-xs font-semibold truncate">{ev.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex gap-4">
                <button 
                  onClick={() => setDeleteId(ev.id!)}
                  className="w-full py-2.5 bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="size-4" /> Delete Event
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredEvents.length === 0 && !isLoading && (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
           <Calendar className="size-8 mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium text-sm">No pending operations detected</p>
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-3xl border-slate-200 p-6 sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold text-xl text-slate-800">Confirm Deletion?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 text-sm mt-2">
              This will permanently cancel this event and remove it from the public broadcast.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-6">
            <AlertDialogCancel className="rounded-xl border-slate-200 bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 hover:text-slate-900 m-0">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="rounded-xl border-none bg-rose-600 hover:bg-rose-700 text-white font-bold m-0 shadow-sm">Delete Event</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

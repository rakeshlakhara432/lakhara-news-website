import { useState, useEffect } from "react";
import { Search, Loader2, Plus, Trash2, Calendar, MapPin, Tag, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
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
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">Samaj <span className="text-primary italic">Events</span> Grid</h1>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-10 py-4 bg-primary text-white font-black rounded-3xl hover:bg-secondary transition-all text-[9.5px] tracking-widest uppercase shadow-2xl flex items-center justify-center gap-4 active:scale-95"
        >
          <Plus className="size-4" /> Create Broadcast
        </button>
      </div>

      <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center gap-4 px-6 py-3 bg-gray-50/50 rounded-full border border-gray-100">
          <Search className="size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search events by target name or mission sector..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none font-bold text-xs italic"
          />
        </div>
      </div>

      {isAdding && (
        <div className="bg-white rounded-[3rem] border-2 border-primary/20 p-10 shadow-bhagva-lg animate-in fade-in slide-in-from-top-4 duration-500 relative overflow-hidden">
           <div className="absolute top-0 right-0 size-40 bg-primary/5 rounded-bl-[10rem]"></div>
           <div className="relative z-10 space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black italic tracking-tighter uppercase text-gray-950">Draft <span className="text-primary">New Event</span></h2>
                <button onClick={() => setIsAdding(false)} className="text-[10px] font-black uppercase text-gray-400 hover:text-red-500 transition-colors">Abort Mission</button>
              </div>
              <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-widest text-gray-400 italic px-4">Mission Title</label>
                  <input required placeholder="Enter event name..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold text-xs italic focus:border-primary/50 transition-all outline-none shadow-sm" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-widest text-gray-400 italic px-4">Deployment Date</label>
                  <input required type="text" placeholder="e.g. 28 मार्च 2026" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold text-xs italic focus:border-primary/50 outline-none shadow-sm" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-widest text-gray-400 italic px-4">Facility Location</label>
                  <input required placeholder="Enter address..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold text-xs italic focus:border-primary/50 outline-none shadow-sm" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-widest text-gray-400 italic px-4">Mission Briefing</label>
                  <textarea required rows={4} placeholder="Describe the purpose..." className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-6 py-4 font-bold text-xs italic focus:border-primary/50 outline-none shadow-sm resize-none" value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full py-5 bg-primary text-white font-black rounded-3xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-[11px] uppercase tracking-widest flex items-center justify-center gap-4 group">
                    Deploy Event <ArrowRight className="size-4 group-hover:translate-x-4 transition-transform" />
                  </button>
                </div>
              </form>
           </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-10 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((ev) => (
            <div key={ev.id} className="group p-8 bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 left-0 size-20 bg-gradient-to-br from-primary/5 to-transparent"></div>
              
              <div className="flex-grow space-y-8 relative z-10">
                <div className="size-16 bg-gray-950 text-primary rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-[15deg] transition-all transform duration-700 border-2 border-white/10">
                  <Calendar className="size-8" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-black text-gray-950 tracking-tighter italic uppercase leading-tight line-clamp-2">{ev.title}</h3>
                  <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-5 py-1 rounded-full text-[8.5px] font-black uppercase tracking-widest italic border border-primary/10">
                    <Tag className="size-3" /> {ev.type}
                  </div>
                </div>

                <div className="space-y-4 pt-10 border-t border-gray-50">
                  <div className="flex items-center gap-4 text-gray-400">
                    <Calendar className="size-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400">
                    <MapPin className="size-4" />
                    <span className="text-[11px] font-black uppercase tracking-widest italic truncate">{ev.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4 relative z-10">
                <button 
                  onClick={() => setDeleteId(ev.id!)}
                  className="w-full py-4 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 border border-gray-100 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  <Trash2 className="size-4" /> Purge Sector
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredEvents.length === 0 && !isLoading && (
        <div className="text-center py-24 bg-gray-50/50 rounded-[4rem] border-2 border-dashed border-gray-100">
          <div className="size-20 mx-auto bg-white rounded-full flex items-center justify-center text-gray-200 mb-6 shadow-sm">
             <Calendar className="size-10" />
          </div>
          <p className="text-gray-400 font-black italic uppercase tracking-[0.5em] text-[10px] opacity-40">No pending operations detected</p>
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-[2.5rem] border-none shadow-bhagva-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black text-2xl uppercase italic tracking-tighter text-gray-950">Confirm Cancellation?</AlertDialogTitle>
            <AlertDialogDescription className="font-bold text-gray-500 italic">
              This will permanently cancel this event and remove it from the public broadcast.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-4">
            <AlertDialogCancel className="bg-gray-100 border-none font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors">Abort Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 border-none font-black text-[9px] uppercase tracking-widest text-white rounded-xl shadow-xl shadow-red-500/20 hover:bg-red-700 transition-all">Confirm Purge</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

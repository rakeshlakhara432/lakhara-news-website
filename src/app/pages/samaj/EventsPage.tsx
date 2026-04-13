import { useState, useEffect } from "react";
import { Calendar, MapPin, ArrowRight, Star, Loader2, UserCheck, Share2, Clock } from "lucide-react";
import { samajService, SamajEvent } from "../../services/samajService";
import { EventRegistrationModal } from "../../components/ui/EventRegistrationModal";

function WhatsAppShareBtn({ event }: { event: SamajEvent }) {
  const msg = `🎉 *${event.title}*\n\n📅 तारीख: ${event.date}\n📍 स्थान: ${event.location}\n\n${event.description}\n\nजानकारी के लिए: https://rakeshlakhara432.github.io/lakhara-news-website/#/events`;
  return (
    <a
      href={`https://wa.me/?text=${encodeURIComponent(msg)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 w-full py-3 rounded-2xl transition-all"
    >
      <Share2 className="size-3.5" /> WhatsApp Share
    </a>
  );
}

export function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<SamajEvent[]>([]);
  const [isLoading, setIsLoading]           = useState(true);
  const [selectedEvent, setSelectedEvent]   = useState<SamajEvent | null>(null);

  useEffect(() => {
    const unsubscribe = samajService.subscribeToEvents((data) => {
      setUpcomingEvents(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-16 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700 bg-slate-50/30">
      
      {selectedEvent && (
        <EventRegistrationModal
          eventId={selectedEvent.id!}
          eventTitle={selectedEvent.title}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* 🎉 HEADER */}
      <section className="text-center space-y-6 pt-16">
         <div className="size-20 mx-auto bg-orange-600 text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-600/20 rotate-3 hover:rotate-0 transition-transform">
            <Calendar className="size-10" />
         </div>
         <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter">समाज के <span className="text-orange-600">आयोजन</span></h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Exclusive Events • Unity • Progress</p>
         </div>
      </section>

      {/* 📅 FEATURED EVENT */}
      <section className="relative container mx-auto px-6">
         <div className="relative h-[350px] md:h-[500px] bg-slate-900 text-white rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <img 
               src={upcomingEvents[0]?.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000"} 
               className="absolute inset-0 size-full object-cover opacity-40 hover:scale-105 transition-transform duration-1000" 
               alt="Main Event" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute inset-x-8 md:inset-x-16 bottom-12 space-y-8">
               <div className="inline-flex items-center gap-2 bg-orange-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-orange-600/40">
                  <Star className="size-4 fill-current" /> मुख्य आकर्षण
               </div>
               <h2 className="text-4xl md:text-6xl font-black leading-[1] uppercase tracking-tighter max-w-4xl">
                  {upcomingEvents[0]?.title || "आगामी विशाल महासम्मेलन"}
               </h2>
               <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-14 pt-2">
                  <div className="flex items-center gap-4">
                     <div className="size-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                        <Calendar className="size-6 text-orange-500" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-orange-500 tracking-widest leading-none mb-1">Date</span>
                        <span className="text-base font-black italic">{upcomingEvents[0]?.date || "To be Announced"}</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="size-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                        <MapPin className="size-6 text-orange-500" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-orange-500 tracking-widest leading-none mb-1">Venue</span>
                        <span className="text-base font-black italic">{upcomingEvents[0]?.location || "Check back soon"}</span>
                     </div>
                  </div>
               </div>
               <div className="pt-6 flex flex-wrap gap-4">
                  <button
                    onClick={() => upcomingEvents[0] && setSelectedEvent(upcomingEvents[0])}
                    className="px-12 py-5 bg-white text-slate-900 font-black rounded-[1.5rem] hover:bg-orange-600 hover:text-white transition-all text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95"
                  >
                     Register Now
                  </button>
                  {upcomingEvents[0] && (
                     <a
                        href={`https://wa.me/?text=${encodeURIComponent(`🚩 *${upcomingEvents[0].title}*\n📅 ${upcomingEvents[0].date}\n📍 ${upcomingEvents[0].location}\n\nसमाज के इस ऐतिहासिक आयोजन में पधारें! 🙏`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="px-12 py-5 bg-emerald-600 text-white font-black rounded-[1.5rem] hover:bg-emerald-700 transition-all text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2"
                     >
                        Share on WhatsApp
                     </a>
                  )}
               </div>
            </div>
         </div>
      </section>

      {/* 🗓️ UPCOMING LIST */}
      <section className="container mx-auto px-6 space-y-16">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-8 border-slate-900 pb-10">
            <div className="space-y-3">
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                  आगामी <span className="text-orange-600">कैलेंडर</span>
               </h2>
               <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em] pl-1">The Roadmap of Unity</p>
            </div>
            <div className="bg-orange-600 text-white px-8 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-xl shadow-orange-600/20 italic">
               Active: {upcomingEvents.length} Events
            </div>
         </div>
         
         {isLoading ? (
           <div className="flex justify-center py-32">
              <Loader2 className="size-16 text-orange-600 animate-spin" />
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {upcomingEvents.map((ev, i) => (
                <div key={i} className="group bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden flex flex-col hover:-translate-y-4">
                   <div className="space-y-8 relative z-10 flex-grow">
                      <div className="flex items-center justify-between">
                         <div className="size-16 bg-slate-900 text-white rounded-3xl flex items-center justify-center shrink-0 shadow-2xl group-hover:bg-orange-600 transition-colors">
                            <Calendar className="size-8" />
                         </div>
                         <div className="bg-slate-50 border border-slate-100 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                            Official Event
                         </div>
                      </div>
                      
                      {ev.imageUrl && (
                         <div className="w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-inner">
                            <img src={ev.imageUrl} className="size-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                         </div>
                      )}

                      <div className="space-y-6">
                         <h3 className="text-2xl font-black text-slate-800 leading-[1.2] group-hover:text-orange-600 transition-colors uppercase italic tracking-tighter">{ev.title}</h3>
                         <div className="grid grid-cols-1 gap-4 pt-6 border-t border-slate-50">
                            <div className="flex items-center gap-4">
                               <div className="size-10 bg-orange-50 rounded-xl flex items-center justify-center">
                                  <Clock className="size-5 text-orange-600" />
                               </div>
                               <div>
                                  <span className="block text-[9px] font-black uppercase tracking-widest text-slate-300">Scheduled Date</span>
                                  <span className="text-base font-black text-slate-800 uppercase italic">{ev.date}</span>
                               </div>
                            </div>
                            <div className="flex items-center gap-4">
                               <div className="size-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                  <MapPin className="size-5 text-blue-600" />
                               </div>
                               <div>
                                  <span className="block text-[9px] font-black uppercase tracking-widest text-slate-300">Venue Location</span>
                                  <span className="text-base font-black text-slate-400 uppercase italic truncate">{ev.location}</span>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="mt-10 space-y-4">
                      <button
                        onClick={() => setSelectedEvent(ev)}
                        className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl hover:bg-orange-600 transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 shadow-2xl"
                      >
                        <UserCheck className="size-5" /> रजिस्टर करें
                      </button>
                      <WhatsAppShareBtn event={ev} />
                   </div>
                </div>
              ))}
           </div>
         )}
      </section>

      {/* 📸 PAST EVENTS SNEAK PEEK */}
      <section className="container mx-auto px-6">
         <div className="bg-white rounded-[4rem] p-12 md:p-20 space-y-12 border border-slate-100 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 size-96 bg-orange-50 rounded-full -mr-48 -mt-48 opacity-40 blur-3xl"></div>
            <div className="text-center space-y-4 relative z-10">
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter">विगत आयोजन <span className="text-orange-600">स्मृतियाँ</span></h2>
               <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.6em] pl-2">Reliving Our Proud Moments</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square bg-slate-50 rounded-[2.5rem] overflow-hidden group shadow-inner border-4 border-white hover:border-orange-100 transition-all">
                    <img src={`https://picsum.photos/seed/event-mem-${i}/800/800`} className="size-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="" />
                 </div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}

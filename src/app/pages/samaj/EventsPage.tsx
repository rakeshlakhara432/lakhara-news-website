import { useState, useEffect } from "react";
import { Calendar, MapPin, ArrowRight, Star, Loader2, UserCheck } from "lucide-react";
import { samajService, SamajEvent } from "../../services/samajService";
import { EventRegistrationModal } from "../../components/ui/EventRegistrationModal";

function WhatsAppShareBtn({ event }: { event: SamajEvent }) {
  const msg = `🎉 *${event.title}*\n\n📅 तारीख: ${event.date}\n📍 स्थान: ${event.location}\n\n${event.description}\n\nजानकारी के लिए: https://rakeshlakhara432.github.io/lakhara-news-website/#/events`;
  return (
    <a
      href={`https://wa.me/?text=${encodeURIComponent(msg)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 hover:bg-green-100 border border-green-200 px-3 py-1.5 rounded-lg transition-colors"
    >
      <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      WhatsApp Share
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
    <div className="space-y-16 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      {selectedEvent && (
        <EventRegistrationModal
          eventId={selectedEvent.id!}
          eventTitle={selectedEvent.title}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* 🎉 HEADER */}
      <section className="text-center space-y-6 pt-12">
         <div className="size-16 mx-auto bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shadow-sm border border-orange-100">
            <Calendar className="size-8" />
         </div>
         <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">समाज के <span className="text-orange-600">कार्यक्रम</span></h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Events • Celebration • Unity</p>
         </div>
      </section>

      {/* 📅 FEATURED EVENT (Largest) */}
      <section className="relative container mx-auto px-6 lg:px-0">
         <div className="relative h-[300px] md:h-[400px] bg-slate-900 text-white rounded-3xl overflow-hidden shadow-lg border border-slate-800">
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 size-full object-cover opacity-30" alt="Main Event" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
            <div className="absolute inset-x-6 md:inset-x-12 bottom-8 space-y-5">
               <div className="inline-flex items-center gap-2 bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow">
                  <Star className="size-3 fill-current" /> मुख्य आयोजन
               </div>
               <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">
                  लखारा समाज महासम्मेलन <br className="hidden md:block" /> और वार्षिक महोत्सव 2026
               </h2>
               <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 pt-2">
                  <div className="flex items-center gap-2">
                     <Calendar className="size-4 text-orange-400" />
                     <span className="text-sm font-medium">25 मार्च 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <MapPin className="size-4 text-orange-400" />
                     <span className="text-sm font-medium">तालकटोरा स्टेडियम, नई दिल्ली</span>
                  </div>
               </div>
               <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedEvent({ id: "featured", title: "लखारा समाज महासम्मेलन 2026", date: "25 मार्च 2026", location: "तालकटोरा स्टेडियम, नई दिल्ली", description: "", type: "sammelan", createdAt: null })}
                    className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-500 transition-colors text-sm shadow flex items-center gap-2"
                  >
                     <UserCheck className="size-4" /> अभी रजिस्टर करें
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent("🎉 लखारा समाज महासम्मेलन 2026\n📅 25 मार्च 2026\n📍 तालकटोरा स्टेडियम, नई दिल्ली\n\nसभी को बुलाएं! 🙏")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors text-sm shadow flex items-center gap-2"
                  >
                    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Share
                  </a>
               </div>
            </div>
         </div>
      </section>

      {/* 🗓️ UPCOMING LIST */}
      <section className="container mx-auto px-6 lg:px-0 space-y-8">
         <div className="flex items-center gap-3 border-l-4 border-orange-600 pl-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
               आगामी <span className="text-orange-600">कैलेंडर</span>
            </h2>
         </div>
         
         {isLoading ? (
           <div className="flex justify-center py-10">
              <Loader2 className="size-8 text-orange-600 animate-spin" />
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((ev, i) => (
                <div key={i} className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
                   <div className="space-y-4 relative z-10 flex-grow">
                      <div className="size-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-5 shrink-0">
                         <Calendar className="size-6" />
                      </div>
                      <div>
                         <h3 className="text-lg font-bold text-slate-800 leading-snug line-clamp-2">{ev.title}</h3>
                         <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                            <div className="space-y-0.5">
                               <div className="flex items-center gap-1.5 text-slate-400">
                                  <Calendar className="size-3" />
                                  <span className="text-[10px] font-semibold uppercase tracking-widest">तारीख</span>
                               </div>
                               <p className="text-xs font-semibold text-slate-700">{ev.date.split(' ')[0] + ' ' + ev.date.split(' ')[1]}</p>
                            </div>
                            <div className="space-y-0.5 text-right">
                               <div className="flex items-center gap-1.5 justify-end text-slate-400">
                                  <MapPin className="size-3" />
                                  <span className="text-[10px] font-semibold uppercase tracking-widest">स्थान</span>
                               </div>
                               <p className="text-xs font-semibold text-orange-600 truncate max-w-[120px]" title={ev.location}>{ev.location.split(',')[0]}</p>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="mt-4 space-y-2">
                     <button
                       onClick={() => setSelectedEvent(ev)}
                       className="w-full py-2.5 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-500 transition-colors text-xs flex items-center justify-center gap-2"
                     >
                       <UserCheck className="size-3.5" /> रजिस्टर करें
                     </button>
                     <WhatsAppShareBtn event={ev} />
                   </div>
                </div>
              ))}
           </div>
         )}
      </section>

      {/* 📸 PAST EVENTS SNEAK PEEK */}
      <section className="container mx-auto px-6 lg:px-0">
         <div className="bg-slate-50 rounded-3xl p-8 md:p-12 space-y-8 border border-slate-100">
            <div className="text-center space-y-2">
               <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">विगत आयोजन <span className="text-orange-600">यादें</span></h2>
               <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Memories of Past Unity</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square md:aspect-video bg-white rounded-2xl overflow-hidden group shadow-sm">
                    <img src={`https://picsum.photos/seed/event${i}/600/400`} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                 </div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}

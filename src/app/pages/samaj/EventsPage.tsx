import { Calendar, MapPin, ArrowRight, Star, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { samajService, SamajEvent } from "../../services/samajService";

export function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<SamajEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = samajService.subscribeToEvents((data) => {
      setUpcomingEvents(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-16 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      
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
               <div className="pt-2">
                  <button className="px-6 py-2.5 bg-white text-slate-800 font-bold rounded-lg hover:bg-slate-100 transition-colors text-sm shadow flex items-center gap-2">
                     अभी रजिस्टर करें <ArrowRight className="size-4" />
                  </button>
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
                   <button className="w-full mt-6 py-2.5 bg-slate-50 border border-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-700 rounded-lg font-semibold text-xs transition-colors border-t-0">
                      विवरण देखें
                   </button>
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

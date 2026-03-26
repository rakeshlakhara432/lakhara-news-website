import { Calendar, MapPin, Clock, ArrowRight, Flag, Star, Users, History, LayoutGrid, Loader2 } from "lucide-react";
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
    <div className="space-y-24 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 🎉 HEADER */}
      <section className="text-center space-y-10 pt-12">
         <div className="size-20 mx-auto bg-primary/10 text-primary md:rounded-[2rem] rounded-none flex items-center justify-center shadow-lg animate-bounce border border-primary/10">
            <Calendar className="size-10" />
         </div>
         <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase italic leading-tight md:leading-none">समाज के <span className="text-primary underline decoration-primary/10 underline-offset-8">कार्यक्रम</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">EVENTS • CELEBRATION • UNITY</p>
         </div>
      </section>

      {/* 📅 FEATURED EVENT (Largest) */}
      <section className="relative h-[400px] md:h-[500px] bg-gray-950 text-white md:rounded-[5rem] rounded-none overflow-hidden group shadow-bhagva border-[10px] border-white ring-1 ring-primary/20">
         <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000" className="size-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[10s]" alt="Main Event" />
         <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent"></div>
         <div className="absolute inset-x-12 bottom-12 space-y-8 animate-in fade-in slide-in-from-bottom-10 delay-500">
            <div className="inline-flex items-center gap-4 bg-primary text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-2xl">
               <Star className="size-4 fill-current animate-pulse" /> मुख्य आयोजन
            </div>
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-tight drop-shadow-2xl">
               लखारा समाज महासम्मेलन <br/> और वार्षिक महोत्सव 2026
            </h2>
            <div className="flex flex-wrap items-center gap-10">
               <div className="flex items-center gap-3">
                  <Calendar className="size-5 text-primary" />
                  <span className="text-sm font-black italic">25 मार्च 2026</span>
               </div>
               <div className="flex items-center gap-3">
                  <MapPin className="size-5 text-primary" />
                  <span className="text-sm font-black italic">तालकटोरा स्टेडियम, नई दिल्ली</span>
               </div>
            </div>
            <button className="px-10 py-5 bg-white text-gray-950 font-black rounded-2xl hover:bg-primary hover:text-white transition-all text-xs tracking-widest uppercase shadow-2xl flex items-center gap-4">
               अभी रजिस्टर करें <ArrowRight className="size-5" />
            </button>
         </div>
      </section>

      {/* 🗓️ UPCOMING LIST */}
      <section className="space-y-12">
         <div className="flex items-center gap-4 border-l-[8px] border-primary pl-8">
            <h2 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-tight md:leading-none">
               आगामी <span className="text-primary font-black">कैलेंडर</span>
            </h2>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((ev, i) => (
              <div key={i} className="group bg-white p-10 md:rounded-[4rem] rounded-none border border-gray-100 shadow-sm hover:shadow-bhagva transition-all hover:-translate-y-2 relative overflow-hidden">
                 <div className="absolute -top-10 -right-10 size-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 
                 <div className="space-y-6 relative z-10">
                    <div className="size-16 bg-gray-50 text-primary rounded-[1.5rem] flex items-center justify-center shadow-inner group-hover:bg-primary group-hover:text-white transition-all">
                       <Calendar className="size-8" />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-gray-950 tracking-tighter italic uppercase leading-tight h-[3rem] line-clamp-2">{ev.title}</h3>
                       <div className="mt-8 pt-8 border-t border-gray-50 grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                             <div className="flex items-center gap-2 text-gray-300">
                                <Calendar className="size-3" />
                                <span className="text-[8px] font-black uppercase tracking-widest">तारीख</span>
                             </div>
                             <p className="text-[10px] font-black text-gray-600 italic uppercase">{ev.date.split(' ')[0] + ' ' + ev.date.split(' ')[1]}</p>
                          </div>
                          <div className="space-y-1 text-right">
                             <div className="flex items-center gap-2 justify-end text-gray-300">
                                <MapPin className="size-3" />
                                <span className="text-[8px] font-black uppercase tracking-widest">स्थान</span>
                             </div>
                             <p className="text-[10px] font-black text-primary italic uppercase">{ev.location.split(',')[0]}</p>
                          </div>
                       </div>
                    </div>
                    <button className="w-full mt-10 py-4 bg-gray-50 text-gray-400 group-hover:bg-gray-950 group-hover:text-white rounded-[1.5rem] font-black text-[9px] uppercase tracking-widest transition-all">
                       विवरण देखें
                    </button>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* 📸 PAST EVENTS SNEAK PEEK */}
      <section className="bg-gray-50 md:rounded-[5rem] rounded-none p-8 md:p-24 space-y-16">
         <div className="text-center space-y-4">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-gray-950 leading-tight md:leading-none">विगत आयोजन <span className="text-primary opacity-50 underline underline-offset-8">यादें</span></h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">MEMORIES OF PAST UNITY</p>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-video bg-white md:rounded-[3rem] rounded-none overflow-hidden group shadow-lg border-[6px] border-white transform rotate-[-3deg] hover:rotate-0 transition-all duration-700">
                 <img src={`https://picsum.photos/seed/event${i}/600/400`} className="size-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                 <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
         </div>
      </section>

    </div>
  );
}

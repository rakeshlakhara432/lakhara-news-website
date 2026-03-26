import { Users, Mail, Phone, MapPin, Flag, Shield, User, Star, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { samajService, CommitteeMember } from "../../services/samajService";

export function CommitteePage() {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = samajService.subscribeToCommittee((data) => {
      setMembers(data);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="size-12 text-primary animate-spin" />
      </div>
    );
  }

  const president = members.find(m => m.designation.includes("अध्यक्ष") || m.order === 1) || members[0];
  const others = members.filter(m => m.id !== president?.id);

  return (
    <div className="space-y-24 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 🏛️ COMMITTEE TITLE */}
      <section className="text-center space-y-8 pt-12">
         <div className="size-20 mx-auto bg-primary/10 text-primary md:rounded-[2rem] rounded-none flex items-center justify-center shadow-lg animate-pulse">
            <Shield className="size-10" />
         </div>
         <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase italic leading-tight md:leading-none">कार्यकारिणी <span className="text-primary text-2xl opacity-50 block mt-2">समिति सद्स्य</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">OUR STRENGTH • OUR LEADERS</p>
         </div>
      </section>

      {/* 🏢 PRESIDENT PROFILE (Focus Area) */}
      {president && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-gray-950 text-white md:rounded-[4rem] rounded-none p-8 md:p-20 relative overflow-hidden group shadow-bhagva border-[8px] border-white ring-1 ring-primary/10">
              <div className="absolute inset-x-0 -bottom-1/2 h-full bg-primary/10 blur-[10rem] group-hover:bg-primary/20 transition-all"></div>
              <div className="absolute top-10 left-10 text-primary">
                <Star className="size-10 fill-current animate-spin-slow" />
              </div>
              <div className="relative z-10 space-y-10">
                <div className="size-40 mx-auto bg-white md:rounded-[3rem] rounded-none p-3 shadow-2xl overflow-hidden transform rotate-[-12deg] group-hover:rotate-0 transition-all duration-700">
                    {president.photoUrl ? (
                      <img src={president.photoUrl} className="size-full object-cover md:rounded-[2.5rem] rounded-none" alt={president.name} />
                    ) : (
                      <div className="size-full bg-gray-100 flex items-center justify-center text-gray-400 text-6xl font-black">{president.name[0]}</div>
                    )}
                </div>
                <div className="text-center space-y-4">
                    <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase">{president.name}</h3>
                    <div className="inline-flex items-center gap-4 bg-primary text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-xl">
                      {president.designation}
                    </div>
                    <p className="text-gray-400 font-bold italic text-sm leading-relaxed mt-10 max-w-sm mx-auto">
                      "समाज की एकता ही हमारी सबसे बड़ी शक्ति है। हमें शिक्षा और संस्कारों के साथ आगे बढ़ना होगा।"
                    </p>
                </div>
                <div className="flex justify-center gap-4 pt-10">
                    <a href={`tel:${president.phone}`} className="size-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/5 hover:bg-primary hover:text-white transition-all"><Phone className="size-5" /></a>
                </div>
              </div>
          </div>

          <div className="space-y-10">
              <div className="flex items-center gap-4 text-primary bg-primary/5 px-6 py-2 rounded-full w-fit">
                <Users className="size-5" />
                <span className="text-[10px] font-black uppercase tracking-widest italic">मुख्य पदाधिकारी</span>
              </div>
              <h2 className="text-3xl font-black text-gray-950 tracking-tighter italic leading-tight uppercase">समाज के <span className="text-primary opacity-50">प्रमुख चेहरे</span></h2>
              <div className="space-y-6">
                {others.slice(0, 3).map((m, i) => (
                  <div key={i} className="group flex items-center justify-between p-6 bg-white md:rounded-[2.5rem] rounded-none border border-gray-100 shadow-sm hover:shadow-bhagva transition-all hover:bg-primary/5 cursor-pointer">
                      <div className="flex items-center gap-6">
                        <div className="size-14 bg-gray-50 border border-gray-100 text-gray-400 rounded-2xl flex items-center justify-center font-black group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all">
                            {m.name[0]}
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-gray-950 leading-tight italic tracking-tight">{m.name}</h4>
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1 opacity-60 underline decoration-primary/20">{m.designation}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{m.city}</p>
                      </div>
                  </div>
                ))}
              </div>
          </div>
        </section>
      )}

      {/* 📋 FULL COMMITTEE LIST TABLE / GRID */}
      <section className="space-y-12">
         <div className="flex items-center gap-4 border-l-[8px] border-primary pl-8">
            <h2 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-tight md:leading-none">
               समिति <span className="text-primary">सदस्य गण</span>
            </h2>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {others.map((m, i) => (
                <div key={i} className="group p-8 bg-white md:rounded-[3rem] rounded-none border border-gray-100 shadow-sm hover:shadow-bhagva transition-all text-center space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 size-16 bg-gradient-to-br from-primary/5 to-transparent rotate-[-45deg]"></div>
                  <div className="size-16 mx-auto bg-gray-50 text-gray-300 md:rounded-[2rem] rounded-none flex items-center justify-center shadow-inner group-hover:bg-primary/5 transition-colors">
                      <User className="size-8" />
                  </div>
                  <div>
                      <h3 className="text-sm font-black text-gray-950 tracking-tighter uppercase italic line-clamp-1">{m.name}</h3>
                      <p className="text-[8px] text-primary font-black uppercase tracking-widest mt-1 opacity-50">{m.designation}</p>
                  </div>
                  <div className="flex justify-center gap-4 pt-4">
                      <a href={`tel:${m.phone}`}><Phone className="size-4 text-gray-300 hover:text-primary cursor-pointer transition-colors" /></a>
                  </div>
                </div>
            ))}
         </div>
      </section>
    </div>
  );
}

import { Users, Phone, Shield, User, Star, Loader2 } from "lucide-react";
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
      <div className="flex min-h-[50vh] justify-center items-center">
        <Loader2 className="size-10 text-orange-600 animate-spin" />
      </div>
    );
  }

  const president = members.find(m => m.designation.includes("अध्यक्ष") || m.order === 1) || members[0];
  const others = members.filter(m => m.id !== president?.id);

  return (
    <div className="space-y-16 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      {/* 🏛️ COMMITTEE TITLE */}
      <section className="text-center space-y-6 pt-12">
         <div className="size-16 mx-auto bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shadow-sm">
            <Shield className="size-8" />
         </div>
         <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">कार्यकारिणी <span className="text-orange-600 block mt-1">समिति सदस्य</span></h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Our Strength • Our Leaders</p>
         </div>
      </section>

      {/* 🏢 PRESIDENT PROFILE */}
      {president && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden group shadow-lg">
              <div className="absolute inset-x-0 -bottom-1/2 h-full bg-orange-600/10 blur-3xl group-hover:bg-orange-600/20 transition-all"></div>
              <div className="absolute top-6 left-6 text-orange-500/50">
                <Star className="size-8 fill-current" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="size-32 mx-auto bg-white rounded-full p-2 shadow-xl overflow-hidden">
                    {president.photoUrl ? (
                      <img src={president.photoUrl} className="size-full object-cover rounded-full" alt={president.name} />
                    ) : (
                      <div className="size-full bg-slate-100 flex items-center justify-center text-slate-400 text-4xl font-bold rounded-full">{president.name[0]}</div>
                    )}
                </div>
                <div className="text-center space-y-3">
                    <h3 className="text-2xl font-bold text-white">{president.name}</h3>
                    <div className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                      {president.designation}
                    </div>
                    <p className="text-slate-300 font-medium text-sm leading-relaxed mt-4 max-w-sm mx-auto">
                      "समाज की एकता ही हमारी सबसे बड़ी शक्ति है। हमें शिक्षा और संस्कारों के साथ आगे बढ़ना होगा।"
                    </p>
                </div>
                <div className="flex justify-center pt-4">
                    <a href={`tel:${president.phone}`} className="size-10 bg-white/10 rounded-full flex items-center justify-center text-orange-400 hover:bg-orange-600 hover:text-white transition-colors "><Phone className="size-4" /></a>
                </div>
              </div>
          </div>

          <div className="space-y-8">
              <div className="flex items-center gap-3 text-orange-600 bg-orange-50 px-4 py-2 rounded-full w-fit">
                <Users className="size-4" />
                <span className="text-xs font-bold uppercase tracking-wider">मुख्य पदाधिकारी</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">समाज के <span className="text-orange-600">प्रमुख चेहरे</span></h2>
              <div className="space-y-4">
                {others.slice(0, 3).map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow hover:border-orange-200">
                      <div className="flex items-center gap-4">
                        <div className="size-12 bg-slate-50 border border-slate-100 text-slate-500 rounded-full flex items-center justify-center text-lg font-bold">
                            {m.name[0]}
                        </div>
                        <div>
                            <h4 className="text-base font-bold text-slate-800">{m.name}</h4>
                            <p className="text-xs font-semibold text-orange-600 mt-0.5">{m.designation}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-slate-500">{m.city}</p>
                      </div>
                  </div>
                ))}
              </div>
          </div>
        </section>
      )}

      {/* 📋 FULL COMMITTEE LIST TABLE / GRID */}
      <section className="space-y-8">
         <div className="flex items-center gap-3 border-l-4 border-orange-600 pl-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
               समिति <span className="text-orange-600">सदस्य गण</span>
            </h2>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {others.map((m, i) => (
                <div key={i} className="group p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center space-y-4 hover:border-orange-200">
                  <div className="size-16 mx-auto bg-slate-50 text-slate-400 rounded-full flex items-center justify-center group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors border-2 border-slate-100 overflow-hidden shadow-sm">
                      {m.photoUrl ? <img src={m.photoUrl} className="size-full object-cover" alt={m.name} /> : <User className="size-6" />}
                  </div>
                  <div>
                      <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{m.name}</h3>
                      <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider mt-1">{m.designation}</p>
                  </div>
                  <div className="flex justify-center pt-2 border-t border-slate-50">
                      <a href={`tel:${m.phone}`} className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-orange-600 transition-colors">
                        <Phone className="size-3" /> संपर्क करें
                      </a>
                  </div>
                </div>
            ))}
         </div>
      </section>
    </div>
  );
}

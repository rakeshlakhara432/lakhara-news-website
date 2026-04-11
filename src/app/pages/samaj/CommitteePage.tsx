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
        <section className="max-w-3xl mx-auto items-center">
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden group shadow-xl text-center">
              <div className="absolute inset-x-0 -bottom-1/2 h-full bg-orange-600/20 blur-[100px] group-hover:bg-orange-600/30 transition-all"></div>
              <div className="absolute top-6 left-6 text-orange-500/30">
                <Star className="size-10 fill-current" />
              </div>
              <div className="absolute top-6 right-6 text-orange-500/30">
                <Shield className="size-10" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="size-40 md:size-48 mx-auto bg-white rounded-full p-2.5 shadow-2xl border-4 border-slate-800 overflow-hidden">
                    {president.photoUrl ? (
                      <img src={president.photoUrl} className="size-full object-cover rounded-full" alt={president.name} />
                    ) : (
                      <div className="size-full bg-slate-100 flex items-center justify-center text-slate-400 text-5xl font-black rounded-full">{president.name[0]}</div>
                    )}
                </div>
                <div className="space-y-3">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter">{president.name}</h3>
                    <div className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-widest uppercase">
                      {president.designation}
                    </div>
                    <p className="text-slate-300 font-bold text-base md:text-lg leading-relaxed mt-6 max-w-xl mx-auto italic">
                      "समाज की एकता ही हमारी सबसे बड़ी शक्ति है। हमें शिक्षा और संस्कारों के साथ आगे बढ़ना होगा।"
                    </p>
                </div>
                <div className="flex justify-center pt-6">
                    <a href={`tel:${president.phone}`} className="h-12 px-8 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-orange-600 hover:border-orange-600 font-bold gap-3 transition-colors shadow-lg shadow-black/20">
                      <Phone className="size-4" /> संपर्क करें
                    </a>
                </div>
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

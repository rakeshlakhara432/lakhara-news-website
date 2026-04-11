import { useState, useEffect, useMemo } from "react";
import { PartyPopper, Cake, Gift, Heart, Phone, RefreshCw, Share2, Loader2, CalendarHeart } from "lucide-react";
import { samajService, Member } from "../../services/samajService";

function getWishMessage(name: string) {
  return `🎂 *जन्मदिन की हार्दिक शुभकामनाएं!*\n\nप्रिय *${name}* जी,\n\nआपको जन्मदिन की बहुत-बहुत बधाई! 🎉🎊\n\nईश्वर आपको दीर्घायु, सुखी और समृद्ध जीवन दें।\n\n— *लखारा समाज कम्युनिटी* 🙏`;
}

export function BirthdayWishesPage() {
  const [members, setMembers]   = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = samajService.subscribeToMembers(d => {
      setMembers(d);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const today = new Date();
  const currentMonthDay = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const { todayBirthdays, upcomingBirthdays } = useMemo(() => {
    const todayList: Member[] = [];
    const upcomingList: { member: Member, daysLeft: number }[] = [];

    members.forEach(m => {
      if (!m.birthDate) return;
      const [y, mm, dd] = m.birthDate.split('-');
      const mDay = `${mm}-${dd}`;
      
      if (mDay === currentMonthDay) {
        todayList.push(m);
      } else {
        // Calculate days left
        const bDate = new Date(today.getFullYear(), parseInt(mm) - 1, parseInt(dd));
        if (bDate < today) bDate.setFullYear(today.getFullYear() + 1);
        const diff = Math.ceil((bDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (diff <= 30) {
          upcomingList.push({ member: m, daysLeft: diff });
        }
      }
    });

    return { 
      todayBirthdays: todayList, 
      upcomingBirthdays: upcomingList.sort((a,b) => a.daysLeft - b.daysLeft) 
    };
  }, [members, currentMonthDay]);

  const sendWhatsApp = (name: string, phone: string) => {
    window.open(`https://wa.me/91${phone.replace(/\D/g, "")}?text=${encodeURIComponent(getWishMessage(name))}`, "_blank");
  };

  return (
    <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Header */}
      <section className="text-center space-y-6 pt-12">
        <div className="size-16 mx-auto bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center shadow-sm border border-pink-100">
          <Cake className="size-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
            जन्मदिन <span className="text-pink-600">शुभकामनाएं</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Birthday Wishes • Celebrate Together
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 space-y-12">
        
        {/* Today's Birthdays */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 text-[12rem] opacity-10 leading-none select-none -mr-16 -mt-16">🎂</div>
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-4">
              <div className="size-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                 <PartyPopper className="size-7" />
              </div>
              <div>
                 <h2 className="text-3xl font-black italic tracking-tight">आज का जन्मदिन</h2>
                 <p className="text-xs font-bold text-pink-100 uppercase tracking-widest">WISH THEM ON THEIR SPECIAL DAY</p>
              </div>
            </div>

            {todayBirthdays.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {todayBirthdays.map((b, i) => (
                   <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex items-center justify-between gap-4 group hover:bg-white/20 transition-all">
                     <div className="flex items-center gap-5">
                       <div className="size-16 bg-white/30 rounded-full border-2 border-white/50 flex items-center justify-center text-3xl font-black overflow-hidden relative">
                         {b.photoUrl ? <img src={b.photoUrl} className="size-full object-cover" /> : b.name[0]}
                       </div>
                       <div>
                         <p className="font-black text-xl leading-tight">{b.name}</p>
                         <p className="text-pink-100 text-xs font-bold uppercase tracking-wider mt-1">{b.city} • {b.occupation}</p>
                       </div>
                     </div>
                     <button
                       onClick={() => sendWhatsApp(b.name, b.phone)}
                       className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-black rounded-2xl text-sm transition-all shadow-xl hover:scale-105"
                     >
                       <Share2 className="size-4" /> Wish करें
                     </button>
                   </div>
                 ))}
               </div>
            ) : (
               <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 text-center space-y-4">
                  <CalendarHeart className="size-12 mx-auto text-pink-200 opacity-50" />
                  <p className="font-black text-xl text-pink-50 italic">आज किसी सदस्य का जन्मदिन नहीं है।</p>
                  <p className="text-xs font-bold text-pink-200/60 uppercase tracking-widest">Check again tomorrow!</p>
               </div>
            )}
          </div>
        </div>

        {/* Upcoming birthdays */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-pink-500 pl-4">
            <h2 className="text-2xl font-black text-slate-800">आगामी <span className="text-pink-600">जन्मदिन</span></h2>
          </div>
          
          {upcomingBirthdays.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingBirthdays.map(({ member: b, daysLeft }, i) => (
                <div key={i} className="bg-white border-2 border-slate-100 rounded-3xl p-6 flex flex-col gap-6 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 bg-pink-500 rounded-bl-full">
                     <Cake className="size-12" />
                  </div>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="size-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                      {b.photoUrl ? <img src={b.photoUrl} className="size-full object-cover rounded-2xl" /> : b.name[0]}
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-lg leading-tight truncate">{b.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{b.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest leading-none mb-1">Coming Up</span>
                       <span className="text-sm font-black text-slate-700">{daysLeft === 1 ? "कल है!" : `${daysLeft} दिन में`}</span>
                    </div>
                    <button
                      onClick={() => sendWhatsApp(b.name, b.phone)}
                      className="size-10 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl transition-all flex items-center justify-center shadow-sm"
                    >
                      <Share2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center">
               <p className="text-slate-400 font-bold italic">अगले 30 दिनों में कोई जन्मदिन नहीं है।</p>
            </div>
          )}
        </div>

        {/* Directory Search */}
        <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden border border-slate-800 shadow-2xl">
           <div className="absolute bottom-0 right-0 p-8 opacity-10">
              <Gift className="size-48" />
           </div>
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                 <div className="space-y-2">
                    <h2 className="text-3xl font-black italic tracking-tight">समाज डायरेक्टरी से शुभकामनाएं</h2>
                    <p className="text-slate-400 font-medium leading-relaxed">समाज के सभी {members.length} सदस्यों की सूची देखें और उन्हें उनके विशेष अवसरों पर शुभकामनाएं भेजें।</p>
                 </div>
                 <div className="flex flex-wrap gap-4">
                    <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">कुल सदस्य</p>
                       <p className="text-2xl font-black text-pink-500">{members.length}</p>
                    </div>
                    <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">सक्रिय शहर</p>
                       <p className="text-2xl font-black text-blue-500">{new Set(members.map(m => m.city)).size}</p>
                    </div>
                 </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 space-y-4 max-h-80 overflow-y-auto no-scrollbar">
                 {isLoading ? (
                    <div className="flex justify-center py-20">
                       <Loader2 className="size-8 text-pink-500 animate-spin" />
                    </div>
                 ) : (
                    members.slice(0, 30).map((m, i) => (
                       <div key={i} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="size-10 bg-pink-500 rounded-full flex items-center justify-center font-black">
                                {m.name[0]}
                             </div>
                             <div>
                                <p className="font-bold text-sm">{m.name}</p>
                                <p className="text-[10px] font-medium text-slate-400">{m.city}</p>
                             </div>
                          </div>
                          <button onClick={() => sendWhatsApp(m.name, m.phone)} className="p-2.5 bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white rounded-xl transition-all">
                             <Heart className="size-4" />
                          </button>
                       </div>
                    ))
                 )}
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}

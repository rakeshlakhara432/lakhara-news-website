import { Search, User, MapPin, Phone, Users, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { samajService, Member } from "../../services/samajService";

export function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = samajService.subscribeToMembers((data) => {
      // Only show approved members on public page
      setMembers(data.filter(m => m.isApproved));
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-24">
      
      {/* 🧑🤝🧑 HEADER */}
      <section className="text-center space-y-6 pt-12">
         <div className="size-16 mx-auto bg-orange-600 text-white flex items-center justify-center rounded-2xl shadow-sm">
            <Users className="size-8" />
         </div>
         <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">सदस्य <span className="text-orange-600">निर्देशिका</span></h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Samaj Member Directory</p>
         </div>
      </section>

      {/* 🔍 SEARCH & FILTER */}
      <section className="max-w-3xl mx-auto px-6">
         <div className="bg-white p-2 border border-slate-200 rounded-xl flex flex-col md:flex-row gap-2 shadow-sm">
            <div className="flex-grow flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-lg">
               <Search className="size-5 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="नाम या शहर से खोजें..." 
                 className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-700"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <button className="px-6 py-2 bg-orange-600 text-white font-semibold text-sm rounded-lg hover:bg-orange-500 transition-colors">
               फ़िल्टर
            </button>
         </div>
      </section>

      {/* 📋 MEMBERS GRID */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-10 text-orange-600 animate-spin" />
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-0 container mx-auto">
           {filteredMembers.length > 0 ? (
             filteredMembers.map((m, i) => (
               <div key={i} className="group p-6 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow hover:border-orange-200 flex flex-col">
                  <div className="flex items-center gap-4">
                     <div className="size-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                        <User className="size-6" />
                     </div>
                     <div className="flex-grow min-w-0">
                        <h3 className="text-base font-bold text-slate-800 truncate mb-1">{m.name}</h3>
                        <div className="flex items-center gap-1.5 text-slate-500">
                           <MapPin className="size-3.5 text-orange-600" />
                           <span className="text-xs font-medium">{m.city}</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                     <div className="space-y-0.5">
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">व्यवसाय</p>
                        <p className="text-sm font-medium text-slate-700">{m.occupation || '-'}</p>
                     </div>
                     <div className="space-y-0.5 text-right">
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">संपर्क</p>
                        <p className="text-sm font-semibold text-orange-600">{m.phone}</p>
                     </div>
                  </div>
                  
                  <button className="w-full mt-5 py-2.5 bg-slate-50 text-slate-600 rounded-lg group-hover:bg-orange-50 group-hover:text-orange-700 font-semibold text-xs transition-colors border border-slate-100">
                     प्रोफ़ाइल देखें
                  </button>
               </div>
             ))
           ) : (
             <div className="col-span-full py-20 text-center space-y-4">
                <Search className="size-12 text-slate-300 mx-auto" />
                <p className="text-slate-500 font-medium text-sm">कोई सदस्य नहीं मिला।</p>
             </div>
           )}
        </section>
      )}

      {/* 📢 JOIN SAMAJ BANNER */}
      <section className="container mx-auto px-6 lg:px-0">
         <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-lg border border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
               <div className="space-y-4 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">क्या आप समाज के <br /> <span className="text-orange-500">पंजीकृत</span> सदस्य हैं?</h2>
                  <p className="text-slate-300 font-medium text-sm md:text-base max-w-lg">अभी अपनी सदस्यता सुनिश्चित करें और समाज के डिजिटल नेटवर्क का हिस्सा बनें।</p>
               </div>
               <Link to="/register" className="shrink-0 px-8 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-500 transition-colors shadow">अभी पंजीकरण करें</Link>
            </div>
         </div>
      </section>

    </div>
  );
}

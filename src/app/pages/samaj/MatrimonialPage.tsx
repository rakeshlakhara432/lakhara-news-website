import { Heart, Search, Users, Star, MapPin, ShieldCheck, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { samajService, MatrimonialProfile } from "../../services/samajService";
import { useNavigate } from "react-router";

export function MatrimonialPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [profiles, setProfiles] = useState<MatrimonialProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = samajService.subscribeToMatrimonial((data) => {
      setProfiles(data.filter(p => p.isApproved));
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredProfiles = profiles.filter(p => {
    const matchesTab = activeTab === "all" || p.gender === activeTab;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.occupation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      {/* 💍 HEADER */}
      <section className="text-center space-y-6 pt-12">
         <div className="size-16 mx-auto bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shadow-sm">
            <Heart className="size-8 fill-current" />
         </div>
         <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">लखारा समाज <span className="text-rose-600">विवाह मंच</span></h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Bridging Hearts • Find Your Match</p>
         </div>
      </section>

      {/* 🔍 SEARCH & FILTER */}
      <section className="max-w-4xl mx-auto px-6 lg:px-0">
         <div className="bg-white p-2 border border-slate-200 rounded-xl flex flex-col md:flex-row gap-2 shadow-sm">
            <div className="flex-grow flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-lg">
               <Search className="size-5 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="खोजें (उम्र, शहर, शिक्षा)..." 
                 className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-700" 
                 value={searchTerm} 
                 onChange={e => setSearchTerm(e.target.value)} 
               />
            </div>
            <div className="flex gap-2">
               <button className="px-6 py-2 bg-rose-600 text-white font-semibold text-sm rounded-lg hover:bg-rose-500 transition-colors shrink-0">
                  खोजें
               </button>
               <div className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg shrink-0">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">पंजीकृत</span>
                  <span className="text-sm font-bold flex items-center gap-1"><Users className="size-4 text-rose-400" /> 500+</span>
               </div>
            </div>
         </div>
      </section>

      {/* 📋 PROFILES GRID */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-10 text-rose-600 animate-spin" />
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-0 container mx-auto">
           {filteredProfiles.map((p, i) => (
             <div key={i} className="group p-6 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow hover:border-rose-200 cursor-pointer relative flex flex-col items-center">
                
                {p.isVerified && (
                  <div className="absolute top-3 left-3 text-emerald-600 bg-emerald-50 px-2.5 py-1 font-bold text-[10px] uppercase tracking-wider rounded-full flex items-center gap-1">
                    <ShieldCheck className="size-3" /> VERIFIED
                  </div>
                )}
                
                <div className="size-24 rounded-full bg-slate-50 border-4 border-slate-100 overflow-hidden mb-5">
                   {p.photos?.[0] ? (
                     <img src={p.photos[0]} className="size-full object-cover" alt={p.name} />
                   ) : (
                     <div className="size-full bg-white flex items-center justify-center text-slate-300 text-3xl font-bold uppercase">{p.name[0]}</div>
                   )}
                </div>
                
                <div className="text-center space-y-2 w-full">
                   <h3 className="text-lg font-bold text-slate-800 truncate">{p.name}</h3>
                   <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {p.gender} • {p.age} वर्ष
                   </div>
                </div>
  
                <div className="w-full mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="size-3.5 text-rose-500" />
                      <span className="text-xs font-medium truncate max-w-[80px]">{p.city}</span>
                   </div>
                   <div className="flex items-center gap-1.5 text-slate-600">
                      <Star className="size-3.5 text-rose-500" />
                      <span className="text-xs font-medium truncate max-w-[80px]">{p.education || p.occupation}</span>
                   </div>
                </div>
  
                <button className="w-full mt-5 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-lg hover:bg-rose-600 transition-colors">
                   संपर्क करें
                </button>
             </div>
           ))}
           {filteredProfiles.length === 0 && (
             <div className="col-span-full py-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl text-center">
               <Heart className="size-12 text-slate-300 mx-auto mb-3" />
               <p className="text-slate-500 font-medium text-sm">कोई मैच नहीं मिला</p>
             </div>
           )}
        </section>
      )}

      {/* 📢 ADD PROFILE BANNER */}
      <section className="container mx-auto px-6 lg:px-0">
         <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center space-y-6 relative overflow-hidden shadow-lg border border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
               <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">क्या आप अपने पुत्र या पुत्री के लिए <br className="hidden md:block" /> <span className="text-rose-400">सुयोग्य जीवनसाथी</span> खोज रहे हैं?</h2>
               <p className="text-slate-300 font-medium text-sm md:text-base">
                  समाज के विवाह मंच पर प्रोफाइल दर्ज करें और अपने बच्चों के लिए सही रिश्ते की खोज शुरू करें। आज ही रजिस्टर करें और समाज के सदस्यों से जुड़ें।
               </p>
               <div className="pt-4">
                  <button onClick={() => navigate("/matrimonial/register")} className="px-8 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-500 transition-colors shadow">
                     अपना प्रोफाइल जोड़ें
                  </button>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}

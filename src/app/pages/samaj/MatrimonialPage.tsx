import { Heart, Search, Filter, User, MapPin, Calendar, Users, Star, MessageCircle, PlusCircle, ShieldCheck, Loader2 } from "lucide-react";
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
      // Only show approved profiles
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
    <div className="space-y-16 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 💍 HEADER */}
      <section className="text-center space-y-10 pt-12">
         <div className="size-20 mx-auto bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center shadow-lg animate-pulse border border-primary/10">
            <Heart className="size-10 fill-current" />
         </div>
         <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">लखारा समाज <span className="text-primary underline decoration-primary/10 italic font-black underline-offset-8">विवाह मंच</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] italic">BRIDGING HEARTS • FIND YOUR MATCH</p>
         </div>
      </section>

      {/* 🔍 SEARCH & FILTER (Red/Bhagva Wedding Theme) */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="md:col-span-2">
            <div className="bg-white p-4 rounded-[4rem] border border-gray-100 shadow-bhagva flex flex-col md:flex-row gap-4">
               <div className="flex-grow flex items-center gap-4 px-8 py-4 bg-gray-50/50 rounded-full border border-gray-100">
                  <Search className="size-5 text-gray-400" />
                  <input type="text" placeholder="खोजें (उम्र, शहर, शिक्षा)..." className="bg-transparent border-none outline-none w-full font-bold text-xs italic" />
               </div>
               <button className="px-10 py-4 bg-primary text-white font-black rounded-full text-[10px] uppercase tracking-widest shadow-xl hover:bg-primary/90 active:scale-95 transition-all">
                  <Filter className="size-5" /> खोजें
               </button>
            </div>
         </div>
         <div className="bg-white p-4 rounded-[4rem] border border-gray-100 shadow-sm flex items-center justify-between px-10">
            <div className="flex flex-col">
               <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">पंजीकृत</span>
               <span className="text-xl font-black text-gray-950 italic">५००+ प्रोफाइल</span>
            </div>
            <div className="size-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
               <Users className="size-6" />
            </div>
         </div>
      </section>

      {/* 📋 PROFILES GRID */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-10 text-primary animate-spin" />
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {filteredProfiles.map((p, i) => (
             <div key={i} className="group p-8 bg-white rounded-[4rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all hover:scale-105 active:scale-95 cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 size-24 bg-gradient-to-br from-red-500/5 to-transparent rotate-[-45deg]"></div>
                
                {p.isVerified && (
                  <div className="absolute top-8 left-8 text-green-500 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1.5 border border-green-100">
                    <ShieldCheck className="size-3" />
                    <span className="text-[7px] font-black uppercase tracking-widest">Verified</span>
                  </div>
                )}
                
                <div className="size-24 mx-auto bg-gray-50 rounded-[3rem] p-2 shadow-inner group-hover:bg-primary/10 transition-all duration-700 overflow-hidden mb-6 relative border-4 border-white group-hover:border-primary/10">
                   {p.photos?.[0] ? (
                     <img src={p.photos[0]} className="size-full object-cover rounded-[2.5rem]" alt={p.name} />
                   ) : (
                     <div className="size-full bg-white flex items-center justify-center text-gray-200 text-4xl font-black uppercase">{p.name[0]}</div>
                   )}
                   <div className="absolute inset-0 flex items-center justify-center bg-primary text-white text-xs font-black opacity-0 group-hover:opacity-100 transition-opacity uppercase italic tracking-widest">View</div>
                </div>
                
                <div className="text-center space-y-2">
                   <h3 className="text-lg font-black text-gray-950 tracking-tighter uppercase italic leading-none truncate">{p.name}</h3>
                   <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest italic shadow-sm">
                      {p.gender} &bull; {p.age} वर्ष
                   </div>
                </div>
  
                <div className="mt-10 pt-8 border-t border-gray-50 space-y-4">
                   <div className="flex items-center gap-3 text-gray-400">
                      <MapPin className="size-3" />
                      <span className="text-[10px] font-black uppercase tracking-widest italic">{p.city}</span>
                   </div>
                   <div className="flex items-center gap-3 text-gray-400">
                      <Star className="size-3" />
                      <span className="text-[9px] font-black uppercase tracking-widest truncate">{p.education || p.occupation}</span>
                   </div>
                </div>
  
                <button className="w-full mt-10 py-4 bg-gray-950 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-primary transition-all flex items-center justify-center gap-3">
                   <MessageCircle className="size-4" /> संपर्क करें
                </button>
             </div>
           ))}
           {filteredProfiles.length === 0 && (
             <div className="col-span-full py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200 text-center">
               <p className="text-gray-400 font-black italic uppercase tracking-widest text-[10px]">No matches found</p>
             </div>
           )}
        </section>
      )}

      {/* 📢 ADD PROFILE BANNER */}
      <section className="bg-primary/5 border-2 border-primary/10 rounded-[5rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden">
         <div className="absolute -top-20 -left-20 size-80 bg-primary/10 blur-[10rem]"></div>
         <div className="absolute -bottom-20 -right-20 size-80 bg-primary/10 blur-[10rem]"></div>
         
         <div className="relative z-10 space-y-10">
            <h2 className="text-3xl md:text-5xl font-black text-gray-950 italic tracking-tighter uppercase leading-tight">क्या आप अपने पुत्र या पुत्री के लिए <br/> <span className="text-primary animate-pulse underline italic">सुयोग्य जीवनसाथी</span> खोज रहे हैं?</h2>
            <p className="text-gray-500 font-bold italic text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
               समाज के विवाह मंच पर प्रोफाइल दर्ज करें और अपने बच्चों के लिए सही रिश्ते की खोज शुरू करें। आज ही रजिस्टर करें और समाज के सदस्यों से जुड़ें।
            </p>
            <div className="pt-10">
               <button onClick={() => navigate("/matrimonial/register")} className="px-16 py-6 bg-primary text-white font-black rounded-[3rem] hover:bg-primary/90 transition-all text-sm tracking-widest uppercase shadow-2xl flex items-center justify-center gap-4 mx-auto hover:scale-110 active:scale-95 border-none outline-none">
                  <PlusCircle className="size-6" /> अपना प्रोफाइल जोड़ें
               </button>
            </div>
         </div>
      </section>

    </div>
  );
}

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
    <div className="space-y-16 pb-32">
      
      {/* 💍 HEADER */}
      <section className="text-center space-y-8 pt-12 border-b-8 border-primary pb-12">
         <div className="size-20 mx-auto bg-primary text-white flex items-center justify-center border-4 border-gray-900">
            <Heart className="size-10 fill-current" />
         </div>
         <div className="space-y-4 px-6 md:px-0">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase leading-tight md:leading-none">लखारा समाज <span className="text-primary underline-offset-8">विवाह मंच</span></h1>
            <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.5em]">BRIDGING HEARTS • FIND YOUR MATCH</p>
         </div>
      </section>

      {/* 🔍 SEARCH & FILTER */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-0">
         <div className="md:col-span-2">
            <div className="bg-white p-2 border-4 border-gray-950 flex flex-col md:flex-row gap-2">
               <div className="flex-grow flex items-center gap-4 px-6 py-4 bg-gray-50 border border-gray-200">
                  <Search className="size-5 text-gray-400" />
                  <input type="text" placeholder="खोजें (उम्र, शहर, शिक्षा)..." className="bg-transparent border-none outline-none w-full font-bold text-sm uppercase" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
               </div>
               <button className="px-10 py-4 bg-primary text-white font-black text-[12px] uppercase tracking-widest hover:bg-gray-900 transition-colors">
                  खोजें
               </button>
            </div>
         </div>
         <div className="bg-gray-950 p-6 flex items-center justify-between text-white border-4 border-primary">
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">पंजीकृत</span>
               <span className="text-2xl font-black italic">५००+ प्रोफाइल</span>
            </div>
            <Users className="size-8 text-primary" />
         </div>
      </section>

      {/* 📋 PROFILES GRID */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-10 text-primary animate-spin" />
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-0">
           {filteredProfiles.map((p, i) => (
             <div key={i} className="group p-8 bg-white border-2 border-gray-200 hover:border-primary transition-colors cursor-pointer relative">
                
                {p.isVerified && (
                  <div className="absolute top-4 left-4 text-green-600 bg-green-50 px-3 py-1 font-black text-[8px] uppercase tracking-widest border border-green-200 flex items-center gap-2">
                    <ShieldCheck className="size-3" />
                    <span>VERIFIED</span>
                  </div>
                )}
                
                <div className="size-32 mx-auto bg-gray-50 border-4 border-gray-100 overflow-hidden mb-6 relative">
                   {p.photos?.[0] ? (
                     <img src={p.photos[0]} className="size-full object-cover" alt={p.name} />
                   ) : (
                     <div className="size-full bg-white flex items-center justify-center text-gray-200 text-5xl font-black uppercase text-center">{p.name[0]}</div>
                   )}
                </div>
                
                <div className="text-center space-y-2">
                   <h3 className="text-xl font-black text-gray-950 tracking-tighter uppercase leading-tight truncate">{p.name}</h3>
                   <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">
                      {p.gender} &bull; {p.age} वर्ष
                   </div>
                </div>
  
                <div className="mt-8 pt-6 border-t-2 border-gray-50 space-y-4">
                   <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="size-4 text-primary" />
                      <span className="text-[11px] font-black uppercase tracking-widest italic">{p.city}</span>
                   </div>
                   <div className="flex items-center gap-3 text-gray-600">
                      <Star className="size-4 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest truncate">{p.education || p.occupation}</span>
                   </div>
                </div>
  
                <button className="w-full mt-8 py-4 bg-gray-950 text-white font-black text-[12px] uppercase tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-3">
                   संपर्क करें
                </button>
             </div>
           ))}
           {filteredProfiles.length === 0 && (
             <div className="col-span-full py-20 bg-gray-50 border-4 border-dashed border-gray-200 text-center">
               <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No matches found</p>
             </div>
           )}
        </section>
      )}

      {/* 📢 ADD PROFILE BANNER */}
      <section className="bg-gray-950 border-8 border-primary p-12 md:p-24 text-center space-y-10 mx-6 md:mx-0 text-white">
         <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-tight">क्या आप अपने पुत्र या पुत्री के लिए <br className="hidden md:block" /> <span className="text-primary italic underline underline-offset-8">सुयोग्य जीवनसाथी</span> खोज रहे हैं?</h2>
            <p className="text-gray-400 font-bold italic text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
               समाज के विवाह मंच पर प्रोफाइल दर्ज करें और अपने बच्चों के लिए सही रिश्ते की खोज शुरू करें। आज ही रजिस्टर करें और समाज के सदस्यों से जुड़ें।
            </p>
            <div className="pt-8">
               <button onClick={() => navigate("/matrimonial/register")} className="px-16 py-6 bg-primary text-white font-black hover:bg-white hover:text-primary transition-colors text-sm tracking-widest uppercase flex items-center justify-center gap-4 mx-auto border-none outline-none">
                  अपना प्रोफाइल जोड़ें
               </button>
            </div>
         </div>
      </section>

    </div>
  );
}

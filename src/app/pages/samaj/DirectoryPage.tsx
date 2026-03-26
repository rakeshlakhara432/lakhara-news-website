import { Search, Filter, User, MapPin, Phone, Mail, ChevronRight, Users, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const members = [
    { name: "अजय लखारा", city: "जयपुर", occupation: "व्यवसाय", phone: "982XXXXXXX" },
    { name: "दिनेश लखारा", city: "जोधपुर", occupation: "इंजीनियर", phone: "941XXXXXXX" },
    { name: "रामेश्वर लखारा", city: "बीकानेर", occupation: "शिक्षक", phone: "978XXXXXXX" },
    { name: "कविराज लखारा", city: "अजमेर", occupation: "डॉक्टर", phone: "889XXXXXXX" },
    { name: "सुरेश लखारा", city: "चित्तौड़गढ़", occupation: "अधिवक्ता", phone: "702XXXXXXX" },
  ];

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-16 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* 🧑🤝🧑 HEADER */}
      <section className="text-center space-y-6 pt-12">
         <div className="size-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-md">
            <Users className="size-8" />
         </div>
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">सदस्य <span className="text-primary underline decoration-primary/20">निर्देशिका</span></h1>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic opacity-60">SAMAJ MEMBER DIRECTORY</p>
         </div>
      </section>

      {/* 🔍 SEARCH & FILTER BAR */}
      <section className="max-w-4xl mx-auto">
         <div className="bg-white p-3 rounded-[2.5rem] border border-gray-100 shadow-bhagva flex flex-col md:flex-row gap-3">
            <div className="flex-grow flex items-center gap-4 px-6 py-3 bg-gray-50/50 rounded-full border border-gray-100">
               <Search className="size-4 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="नाम या शहर से खोजें..." 
                 className="bg-transparent border-none outline-none w-full font-bold text-xs italic"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <button className="px-8 py-3 bg-primary text-white font-black rounded-full text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all">
               <Filter className="size-4" /> फ़िल्टर करें
            </button>
         </div>
      </section>

      {/* 📋 MEMBERS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredMembers.length > 0 ? (
           filteredMembers.map((m, i) => (
             <div key={i} className="group p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all hover:-translate-y-1">
                <div className="flex items-center gap-5">
                   <div className="size-16 bg-gray-50 rounded-[1.5rem] flex items-center justify-center text-gray-300 group-hover:bg-primary/5 group-hover:text-primary transition-all relative overflow-hidden">
                      <User className="size-8" />
                      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <ShieldCheck className="size-4" />
                      </div>
                   </div>
                   <div className="flex-grow min-w-0">
                      <h3 className="text-lg font-black text-gray-950 tracking-tighter uppercase italic leading-none mb-1.5 truncate">{m.name}</h3>
                      <div className="flex items-center gap-2 text-gray-400">
                         <MapPin className="size-3" />
                         <span className="text-[9px] font-black uppercase tracking-widest italic">{m.city}</span>
                      </div>
                   </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-50 grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">व्यवसाय</p>
                      <p className="text-[10px] font-black text-gray-600 italic uppercase">{m.occupation}</p>
                   </div>
                   <div className="space-y-1 text-right">
                      <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">संपर्क</p>
                      <p className="text-[10px] font-black text-primary italic">{m.phone}</p>
                   </div>
                </div>
                
                <button className="w-full mt-6 py-3 bg-gray-50 text-gray-400 group-hover:bg-primary group-hover:text-white rounded-xl font-black text-[9px] uppercase tracking-widest transition-all">
                   प्रोफ़ाइल देखें
                </button>
             </div>
           ))
         ) : (
           <div className="col-span-full py-20 text-center space-y-4">
              <div className="size-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                 <Search className="size-10" />
              </div>
              <p className="text-gray-400 font-black italic text-sm">कोई सदस्य नहीं मिला। कृपया पुनः प्रयास करें।</p>
           </div>
         )}
      </section>

      {/* 📢 JOIN SAMAJ BANNER */}
      <section className="bg-gray-950 text-white rounded-[4rem] p-12 relative overflow-hidden border-[6px] border-white shadow-2xl">
         <div className="absolute inset-x-0 -bottom-1/2 h-full bg-primary/10 blur-[10rem]"></div>
         <div className="absolute inset-0 mandala-bg opacity-5"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 text-center md:text-left">
               <h2 className="text-3xl font-black italic tracking-tighter uppercase">क्या आप समाज के <span className="text-primary">पंजीकृत</span> सदस्य हैं?</h2>
               <p className="text-gray-400 font-bold italic text-sm">अभी अपनी सदस्यता सुनिश्चित करें और समाज के डिजिटल नेटवर्क का हिस्सा बनें।</p>
            </div>
            <Link to="/register" className="px-12 py-5 bg-primary text-white font-black rounded-3xl hover:bg-secondary transition-all text-xs tracking-widest uppercase shadow-bhagva">अभी पंजीकरण करें</Link>
         </div>
      </section>

    </div>
  );
}

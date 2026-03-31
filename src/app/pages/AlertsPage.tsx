import { Bell, ShieldCheck, Mail, User, History, ChevronRight, Settings, Info, Filter, Trash2, CheckCircle2, Zap, AlertTriangle, Shield, Radio, Activity, X } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function AlertsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  
  // Premium mock alerts
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'breaking', title: 'अति महत्वपूर्ण', content: 'नया आर्थिक प्रोटोकॉल स्थापित। बाजार पर गहरा प्रभाव सुनिश्चित।', time: 'अभी', isNew: true },
    { id: 2, type: 'community', title: 'नेटवर्क विस्तार', content: 'लखारा डिजिटल न्यूज परिवार में 10,000+ सदस्य जुड़े।', time: '2 घंटे पहले', isNew: false },
    { id: 3, type: 'security', title: 'एक्सेस प्रमाणित', content: 'सुरक्षित स्थान से टर्मिनल लॉगिन की पुष्टि की गई।', time: 'आज सुबह', isNew: false },
    { id: 4, type: 'weather', title: 'पर्यावरण अलर्ट', content: 'क्षेत्र-07 में भारी वर्षा की चेतावनी। सावधानी बरतें।', time: 'कल रात', isNew: false },
  ]);

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(a => a.type === filter || (filter === 'unread' && a.isNew));

  return (
    <div className="bg-white min-h-screen pb-40">
      <div className="container mx-auto px-6 py-12 max-w-4xl space-y-24">
        
        {/* ── BOLD SIGNALS HEADER ── */}
        <div className="flex flex-col gap-12 border-b-8 border-primary pb-20">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                 <div className="size-24 bg-gray-950 text-primary flex items-center justify-center border-4 border-primary shadow-bhagva-flat group">
                    <Radio className="size-12 animate-pulse" />
                 </div>
                 <div className="space-y-2">
                    <h1 className="text-5xl md:text-7xl font-black text-gray-950 italic tracking-tighter uppercase leading-none border-l-[16px] border-primary pl-8">सिग्नल <span className="text-primary italic">लॉग</span></h1>
                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.8em] ml-2 italic">LAKHARA NETWORK TRANSMISSION LOG</p>
                 </div>
              </div>
              
              <button className="size-16 bg-gray-950 text-white flex items-center justify-center border-b-4 border-primary hover:bg-primary transition-colors border-none outline-none italic">
                 <Settings className="size-8" />
              </button>
           </div>

           {/* BLOCKY FILTERS */}
           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {(['all', 'unread', 'breaking', 'community', 'security'] as const).map((f) => (
                <button 
                   key={f}
                   onClick={() => setFilter(f)}
                   className={`px-8 py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all italic border-4 ${filter === f ? 'bg-primary border-primary text-white shadow-bhagva-flat' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-950'}`}
                >
                   {f === "all" ? "सभी" : f === "unread" ? "अपठित" : f === "breaking" ? "ब्रेकिंग" : f === "community" ? "समुदाय" : "सुरक्षा"}
                </button>
              ))}
           </div>
        </div>

        {!user ? (
          <div className="bg-gray-950 p-16 md:p-24 text-center border-t-[16px] border-primary relative overflow-hidden group">
              <div className="relative z-10 space-y-12 flex flex-col items-center">
                 <div className="size-40 bg-white/5 border-4 border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                    <Shield className="size-20 text-primary" />
                 </div>
                 <div className="space-y-6">
                    <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">प्रवेश <span className="text-primary italic">वर्जित</span></h2>
                    <p className="text-gray-500 font-black italic text-2xl max-w-lg mx-auto uppercase tracking-widest border-b-2 border-white/10 pb-8 mt-12">ESTABLISH SECURE CONNECTION TO MONITOR REAL-TIME DATA.</p>
                 </div>
                 <Link to="/profile" className="px-16 py-8 bg-primary text-white font-black text-2xl uppercase tracking-[0.4em] hover:bg-white hover:text-primary transition-all border-none outline-none italic shadow-bhagva-flat flex items-center justify-center gap-8">
                    प्रोटोकॉल शुरू करें
                    <ChevronRight className="size-10" />
                 </Link>
              </div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="flex items-center justify-between border-l-[16px] border-gray-950 pl-8">
                <div className="space-y-1">
                   <span className="text-[12px] font-black text-gray-950 uppercase tracking-[0.5em] italic">सक्रिय प्रसारण सूचनाएं</span>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">{filteredAlerts.length} SIGNALS DETECTED</p>
                </div>
                <button className="bg-gray-950 text-primary px-8 py-4 font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-primary hover:text-white transition-colors italic">
                   <CheckCircle2 className="size-5" /> सब पढ़ा हुआ मानिए
                </button>
            </div>

            {filteredAlerts.length === 0 ? (
               <div className="py-40 text-center bg-gray-50 border-8 border-dashed border-gray-100 space-y-12">
                  <div className="size-32 bg-white border-4 border-gray-100 flex items-center justify-center mx-auto shadow-xl">
                     <AlertTriangle className="size-16 text-gray-200" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black italic tracking-tighter uppercase text-gray-950 leading-none">सूचना निरंक</h3>
                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.6em] italic">NO MATCHING INTELLIGENCE FOUND IN THIS SECTOR.</p>
                  </div>
               </div>
            ) : (
               <div className="grid grid-cols-1 gap-6">
                {filteredAlerts.map(alert => (
                    <div key={alert.id} className={`group relative p-10 border-4 transition-all italic hover:border-primary flex flex-col md:flex-row gap-10 ${alert.isNew ? 'bg-gray-50 border-primary shadow-bhagva-flat' : 'bg-white border-gray-100'}`}>
                       
                       {alert.isNew && (
                         <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                       )}
                       
                       <div className={`size-20 flex items-center justify-center flex-shrink-0 border-4 ${alert.isNew ? 'bg-gray-950 border-primary text-primary shadow-xl' : 'bg-gray-100 border-white text-gray-300'}`}>
                          {alert.type === 'breaking' ? <Zap className="size-10" /> : alert.type === 'community' ? <User className="size-10" /> : alert.type === 'security' ? <ShieldCheck className="size-10" /> : <Bell className="size-10" />}
                       </div>

                       <div className="flex-grow space-y-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                             <h3 className={`text-4xl font-black italic tracking-tighter uppercase leading-none ${alert.isNew ? 'text-gray-950' : 'text-gray-400'}`}>{alert.title}</h3>
                             <span className="text-[11px] font-black text-gray-950 uppercase tracking-[0.3em] bg-white px-5 py-2 border-2 border-primary italic shrink-0 w-max">{alert.time}</span>
                          </div>
                          <p className={`text-2xl font-black italic leading-tight uppercase tracking-tight ${alert.isNew ? 'text-gray-900 border-l-4 border-primary pl-6' : 'text-gray-400 italic'}`}>"{alert.content}"</p>
                          
                          <div className="pt-6 flex gap-10 items-center justify-between border-t border-gray-100 italic">
                             <button className="text-[12px] font-black text-primary uppercase tracking-[0.4em] flex items-center gap-4 hover:text-gray-950 transition-colors">
                                विवरण देखें <ChevronRight className="size-5" />
                             </button>
                             <button className="text-[10px] font-black text-gray-300 hover:text-red-500 transition-colors uppercase tracking-[0.3em] italic">Deactivate Signal</button>
                          </div>
                       </div>
                    </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BOLD EDITORIAL FOOTER */}
        <div className="p-16 bg-gray-950 text-white border-b-[32px] border-primary text-center space-y-12 relative group overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5">
              <Radio className="size-64" />
           </div>
           <div className="relative z-10 space-y-10 flex flex-col items-center">
              <div className="size-24 bg-white/5 border-4 border-primary flex items-center justify-center shadow-2xl">
                 <Activity className="size-12 text-primary" />
              </div>
              <div className="space-y-6">
                 <p className="text-white/80 font-black italic text-2xl md:text-3xl max-w-xl mx-auto uppercase leading-none tracking-tighter">
                    "लखारा डिजिटल न्यूज नेटवर्क के सभी अलर्ट्स को नियंत्रित करें।"
                 </p>
                 <div className="flex flex-col items-center gap-4">
                    <Link to="/profile" className="inline-block text-primary font-black text-[12px] uppercase tracking-[0.6em] border-b-4 border-primary/20 pb-4 hover:border-primary transition-all italic underline underline-offset-8">टर्मिनल सेटिंग्स</Link>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

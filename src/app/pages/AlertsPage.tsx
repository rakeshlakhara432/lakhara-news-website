import { Bell, ShieldCheck, Mail, User, History, ChevronRight, Settings, Info, Filter, Trash2, CheckCircle2, Zap, AlertTriangle, Shield, Radio, Activity } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function AlertsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  
  // Premium mock alerts
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'breaking', title: 'CRITICAL BREAKING', content: 'New economic protocol established. High-velocity market impact detected.', time: '5m AG-1', isNew: true },
    { id: 2, type: 'community', title: 'NETWORK GROWTH', content: 'Lakhara Digital News community surpassed 10,000 active nodes.', time: '2h AG-1', isNew: false },
    { id: 3, type: 'security', title: 'ACCESS VALIDATED', content: 'Terminal login confirmed from secure location.', time: 'Prev Cycle', isNew: false },
    { id: 4, type: 'weather', title: 'ENVIRONMENTAL ALERT', content: 'Severe weather systems approaching Sector-07. Take precautions.', time: '1d AG-1', isNew: false },
  ]);

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(a => a.type === filter || (filter === 'unread' && a.isNew));

  return (
    <div className="bg-[#fcfcfc] dark:bg-gray-950 min-h-screen pb-40">
      <div className="container mx-auto px-6 py-12 max-w-2xl space-y-16">
        
        {/* ── Network Signals Header ── */}
        <div className="flex flex-col gap-10">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="size-20 bg-lakhara rounded-[2rem] flex items-center justify-center shadow-lakhara rotate-[-12deg] relative group cursor-pointer">
                    <Radio className="size-10 text-white animate-pulse" />
                    <div className="absolute inset-x-0 -bottom-4 h-2 bg-black/10 blur-xl rounded-full"></div>
                 </div>
                 <div className="space-y-1">
                    <h1 className="text-5xl font-black text-gray-950 dark:text-white italic tracking-tighter uppercase leading-none">SIGNALS</h1>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] ml-1">Network Transmission Log</p>
                 </div>
              </div>
              
              <button className="size-14 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[1.5rem] flex items-center justify-center text-gray-400 hover:text-primary transition-all shadow-sm active:scale-90">
                 <Settings className="size-7" />
              </button>
           </div>

           {/* Precision Filters */}
           <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
              {(['all', 'unread', 'breaking', 'community', 'security'] as const).map((f) => (
                <button 
                   key={f}
                   onClick={() => setFilter(f)}
                   className={`px-8 py-4 rounded-[1.8rem] font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border-2 active:scale-95 ${filter === f ? 'bg-gray-950 border-gray-950 text-white shadow-2xl' : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/5 text-gray-400 hover:border-primary/20'}`}
                >
                   {f}
                </button>
              ))}
           </div>
        </div>

        {!user ? (
          <div className="bg-gray-950 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden border border-white/5 group">
              <div className="absolute top-0 right-0 size-80 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 space-y-10 flex flex-col items-center">
                 <div className="size-32 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-700">
                    <Shield className="size-16 text-primary" />
                 </div>
                 <div className="space-y-4">
                    <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">ACCESS <span className="text-gradient">DENIED</span></h2>
                    <p className="text-gray-500 font-medium italic text-xl max-w-sm mx-auto">Establish a secure node connection to monitor real-time network intelligence.</p>
                 </div>
                 <Link to="/profile" className="btn-lakhara !rounded-[2rem] w-full max-w-sm !py-8 !text-2xl shadow-2xl shadow-primary/20 flex items-center justify-center gap-6 group">
                    INITIALIZE LINK
                    <ChevronRight className="size-8 group-hover:translate-x-3 transition-transform" />
                 </Link>
              </div>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="flex items-center justify-between px-8">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">Active Transmissions</span>
                <button className="text-primary font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-3">
                   <CheckCircle2 className="size-4" /> COMMIT ALL AS READ
                </button>
            </div>

            {filteredAlerts.length === 0 ? (
               <div className="bg-white dark:bg-white/5 rounded-[4rem] py-40 text-center border border-dashed border-gray-100 dark:border-white/10 space-y-8">
                  <div className="size-24 bg-gray-50 dark:bg-gray-950 rounded-[2.5rem] flex items-center justify-center text-gray-200 mx-auto">
                     <AlertTriangle className="size-12" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black italic tracking-tighter uppercase text-gray-950 dark:text-white">Signals Nullified</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mt-3">No matching intelligence found in this sector.</p>
                  </div>
               </div>
            ) : (
              <div className="space-y-8">
                {filteredAlerts.map(alert => (
                    <div key={alert.id} className={`group relative p-10 rounded-[3.5rem] border flex gap-10 transition-all duration-500 cursor-pointer ${alert.isNew ? 'bg-white dark:bg-white/5 border-primary/20 shadow-2xl shadow-primary/5' : 'bg-gray-50/50 dark:bg-white/2 border-transparent'}`}>
                       
                       {alert.isNew && (
                         <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
                       )}
                       
                       <div className={`size-16 rounded-[1.8rem] flex items-center justify-center flex-shrink-0 transition-all duration-700 group-hover:scale-110 ${alert.isNew ? 'bg-gray-950 text-primary shadow-lakhara shadow-primary/20' : 'bg-white dark:bg-white/5 text-gray-300'}`}>
                          {alert.type === 'breaking' ? <Zap className="size-8" /> : alert.type === 'community' ? <User className="size-8" /> : alert.type === 'security' ? <ShieldCheck className="size-8" /> : <Bell className="size-8" />}
                       </div>

                       <div className="flex-grow space-y-4">
                          <div className="flex items-center justify-between gap-6">
                             <h3 className={`text-2xl font-black italic tracking-tighter uppercase leading-none ${alert.isNew ? 'text-gray-950 dark:text-white' : 'text-gray-400'}`}>{alert.title}</h3>
                             <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-100 dark:bg-white/5 px-4 py-1.5 rounded-full border border-gray-100 dark:border-white/10">{alert.time}</span>
                          </div>
                          <p className={`text-lg font-medium italic leading-relaxed ${alert.isNew ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500 opacity-60'}`}>{alert.content}</p>
                          
                          <div className="pt-4 flex gap-8 items-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                             <button className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-3">
                                VIEW INTEL <ChevronRight className="size-3" />
                             </button>
                             <button className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] hover:text-gray-950 dark:hover:text-white transition-colors">DEACTIVATE</button>
                          </div>
                       </div>
                    </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Neural Support Footer */}
        <div className="p-12 bg-gray-950 rounded-[4rem] border border-white/5 text-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
           <div className="relative z-10 space-y-8">
              <div className="size-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center mx-auto shadow-sm">
                 <Activity className="size-8 text-primary" />
              </div>
              <div className="space-y-4">
                 <p className="text-gray-400 font-bold italic text-lg max-w-sm mx-auto">
                    Fine-tune your intelligence receptors in the mission control terminal.
                 </p>
                 <Link to="/profile" className="inline-block text-primary font-black text-[10px] uppercase tracking-[0.4em] border-b-2 border-primary/20 pb-2 hover:border-primary transition-all">TERMINAL SETTINGS</Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

import { Bell, ShieldCheck, Mail, User, History, ChevronRight, Settings, Info, Filter, Trash2, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

export function AlertsPage() {
  const [filter, setFilter] = useState('all');
  
  // Mock alerts with more features
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'breaking', title: 'ब्रेकिंग न्यूज़ अलर्ट', content: 'नई आर्थिक नीति लागू, बाज़ारों में तेज़ी।', time: '5 मिनट पहले', isNew: true },
    { id: 2, type: 'community', title: 'समुदाय अपडेट', content: 'लखारा डिजिटल न्यूज़ समुदाय में 1000 सदस्य जुड़े।', time: '2 घंटे पहले', isNew: false },
    { id: 3, type: 'security', title: 'सुरक्षा अलर्ट', content: 'आपका अकाउंट सफलतापूर्वक लॉगिन किया गया।', time: 'कल', isNew: false },
    { id: 4, type: 'weather', title: 'मौसम की चेतावनी', content: 'अगले 24 घंटों में भारी बारिश की संभावना।', time: '1 दिन पहले', isNew: false },
  ]);

  const user = JSON.parse(localStorage.getItem("news_user") || "null");

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(a => a.type === filter || (filter === 'unread' && a.isNew));

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl pb-32">
      {/* Header Section */}
      <div className="flex flex-col gap-8 mb-10 mt-10">
        <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black text-gray-900 flex items-center gap-5">
               <div className="size-20 bg-red-600 text-white rounded-[32px] flex items-center justify-center shadow-2xl shadow-red-200 transform -rotate-6">
                  <Bell className="size-10 animate-bounce" />
               </div>
               अलर्ट्स
            </h1>
            <div className="flex gap-2">
                <button className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-400 hover:text-red-500 transition-colors">
                   <Settings className="size-6" />
                </button>
            </div>
        </div>

        {/* Filter Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
           {['all', 'unread', 'breaking', 'community', 'security'].map((f) => (
             <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all border shadow-sm ${filter === f ? 'bg-red-600 border-red-600 text-white shadow-red-100' : 'bg-white border-gray-50 text-gray-400 hover:border-red-100'}`}
             >
                {f === 'all' ? 'सभी' : f === 'unread' ? 'बिना पढ़े' : f === 'breaking' ? 'ब्रेकिंग' : f === 'community' ? 'कम्युनिटी' : 'सुरक्षा'}
             </button>
           ))}
        </div>
      </div>

      {!user ? (
        <div className="bg-white rounded-[50px] p-16 text-center shadow-2xl border border-gray-50 flex flex-col items-center">
            <div className="size-28 bg-red-50 rounded-[40px] flex items-center justify-center mb-10 transform -rotate-3">
               <ShieldCheck className="size-14 text-red-600" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-6">अलर्ट्स मिस न करें</h2>
            <p className="text-gray-500 font-bold mb-12 max-w-xs leading-relaxed">विशेष समाचारों, मौसम की चेतावनी और समुदाय अपडेट्स के लिए लॉगिन करें।</p>
            <Link to="/profile" className="w-full py-6 bg-red-600 hover:bg-red-700 text-white rounded-3xl font-black text-xl transition-all shadow-2xl shadow-red-100 flex items-center justify-center gap-3">
               अभी लॉगिन करें
               <ChevronRight className="size-6" />
            </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-6 mb-4">
              <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest">आज के अपडेट्स</span>
              <button className="text-red-600 font-black text-xs hover:underline flex items-center gap-1">
                 <CheckCircle2 className="size-4" /> सब पढ़ें
              </button>
          </div>

          {filteredAlerts.length === 0 ? (
             <div className="bg-white rounded-[40px] p-12 text-center border border-dashed border-gray-200">
                <p className="text-gray-400 font-bold italic">कोई अलर्ट नहीं मिला।</p>
             </div>
          ) : (
            filteredAlerts.map(alert => (
                <div key={alert.id} className={`group relative p-6 bg-white rounded-[32px] border border-gray-50 flex gap-6 transition-all hover:scale-[1.02] cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-red-50/50 ${alert.isNew ? 'bg-gradient-to-r from-red-50/20 to-transparent' : ''}`}>
                   
                   {alert.isNew && <div className="absolute top-6 left-6 size-3 bg-red-600 rounded-full animate-ping"></div>}
                   
                   <div className={`size-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-12 ${alert.isNew ? 'bg-red-600 text-white shadow-xl shadow-red-100' : 'bg-gray-100 text-gray-400'}`}>
                      {alert.type === 'breaking' ? <Info className="size-8" /> : alert.type === 'community' ? <User className="size-8" /> : alert.type === 'security' ? <ShieldCheck className="size-8" /> : <Bell className="size-8" />}
                   </div>

                   <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                         <h3 className={`font-black text-lg ${alert.isNew ? 'text-gray-900' : 'text-gray-600'}`}>{alert.title}</h3>
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-lg">{alert.time}</span>
                      </div>
                      <p className={`font-bold text-sm leading-relaxed ${alert.isNew ? 'text-gray-700' : 'text-gray-400'}`}>{alert.content}</p>
                      
                      <div className="mt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline">विवरण देखें</button>
                         <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500">डिस्मिस</button>
                      </div>
                   </div>
                </div>
            ))
          )}
        </div>
      )}

      {/* Footer Support Info */}
      <div className="mt-12 p-8 bg-gray-50 rounded-[40px] border border-gray-100 text-center">
         <div className="size-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Info className="size-6 text-gray-400" />
         </div>
         <p className="text-gray-500 font-bold text-xs max-w-xs mx-auto mb-4">
            अलर्ट्स सेटिंग्स बदलने के लिए अपनी प्रोफ़ाइल सेटिंग्स में जाएँ।
         </p>
         <Link to="/profile" className="text-red-600 font-black text-xs uppercase tracking-widest border-b-2 border-red-600 pb-1">सेटिंग्स पर जाएँ</Link>
      </div>
    </div>
  );
}

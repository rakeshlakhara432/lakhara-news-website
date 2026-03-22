import { Bell, ShieldCheck, Mail, User, History } from "lucide-react";
import { Link } from "react-router";

export function AlertsPage() {
  // Mock alerts
  const alerts = [
    { id: 1, title: 'ब्रेकिंग न्यूज़ अलर्ट', content: 'नई आर्थिक नीति लागू, बाज़ारों में तेज़ी।', time: '5 मिनट पहले', isNew: true },
    { id: 2, title: 'समुदाय अपडेट', content: 'लखारा डिजिटल न्यूज़ समुदाय में 1000 सदस्य जुड़े।', time: '2 घंटे पहले', isNew: false },
    { id: 3, title: 'सुरक्षा अलर्ट', content: 'आपका अकाउंट सफलतापूर्वक लॉगिन किया गया।', time: 'कल', isNew: false },
  ];

  const user = JSON.parse(localStorage.getItem("news_user") || "null");

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-10 mt-10">
        <h1 className="text-4xl font-black text-gray-900 flex items-center gap-4">
           <div className="size-16 bg-red-600 text-white rounded-3xl flex items-center justify-center shadow-xl shadow-red-100 transform -rotate-3">
              <Bell className="size-8" />
           </div>
           अलर्ट्स
        </h1>
        <button className="text-red-500 font-black text-sm hover:underline">सभी पढ़ें</button>
      </div>

      {!user ? (
        <div className="bg-white rounded-[40px] p-12 text-center shadow-2xl border border-gray-50 flex flex-col items-center">
            <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center mb-8">
               <ShieldCheck className="size-10 text-gray-300" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">अलर्ट्स देखने के लिए लॉगिन करें</h2>
            <p className="text-gray-500 font-bold mb-10 max-w-xs">विशेष समाचारों और समुदाय अपडेट्स के लिए आज ही लॉगिन या पंजीकरण करें।</p>
            <Link to="/profile" className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-red-100 transform active:scale-95">लॉगिन / पंजीकरण</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className={`p-6 bg-white rounded-3xl border border-gray-100 flex gap-5 transition-all hover:scale-[1.02] cursor-pointer shadow-sm hover:shadow-xl ${alert.isNew ? 'border-l-8 border-l-red-600' : ''}`}>
               <div className={`size-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${alert.isNew ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-400'}`}>
                  {alert.id === 1 ? <Mail className="size-6" /> : alert.id === 2 ? <User className="size-6" /> : <History className="size-6" />}
               </div>
               <div className="flex-grow">
                  <div className="flex items-center justify-between mb-1">
                     <h3 className="font-black text-gray-900">{alert.title}</h3>
                     <span className="text-[10px] font-bold text-gray-400">{alert.time}</span>
                  </div>
                  <p className="text-gray-500 font-bold text-sm leading-relaxed">{alert.content}</p>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

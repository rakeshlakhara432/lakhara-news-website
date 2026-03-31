import { useState, useEffect } from "react";
import {
  Bell, Heart, MessageCircle, UserPlus, Check, CheckCheck,
  Loader2, BellOff, Film, Zap, Shield, ZapOff, Activity, ChevronRight
} from "lucide-react";
import { videoService, Notification } from "../services/videoService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function NotificationsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const unsub = videoService.subscribeToNotifications(user.uid, (notifs) => {
      setNotifications(notifs);
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = async () => {
    if (!user || unreadCount === 0) return;
    setMarkingAll(true);
    try {
      await videoService.markAllNotificationsRead(user.uid);
      toast.success("सभी सूचनाएं अपडेट की गईं।");
    } catch {
      toast.error("अपडेट विफल।");
    } finally {
      setMarkingAll(false);
    }
  };

  const handleNotifClick = async (notif: Notification) => {
    if (!notif.read && notif.id) await videoService.markNotificationRead(notif.id);
    if (notif.videoId) navigate("/reels");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "like": return <Heart className="size-8 text-primary" />;
      case "comment": return <MessageCircle className="size-8 text-gray-950" />;
      case "follow": return <UserPlus className="size-8 text-primary" />;
      default: return <Bell className="size-8 text-gray-950" />;
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-12 px-6 bg-white">
        <div className="size-40 bg-gray-950 text-primary flex items-center justify-center border-8 border-primary shadow-bhagva-flat relative">
           <ZapOff className="size-20" />
        </div>
        <div className="text-center space-y-6">
           <h2 className="text-5xl md:text-7xl font-black text-gray-950 italic tracking-tighter uppercase leading-none border-l-[16px] border-primary pl-8">सिग्नल <span className="text-primary italic">ब्लॉक</span></h2>
           <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.6em] italic">SECURE LOGIN REQUIRED TO ACCESS INTERCEPT LOG.</p>
        </div>
        <button
          onClick={() => navigate("/profile")}
          className="px-20 py-8 bg-primary text-white font-black text-xl uppercase tracking-[0.5em] hover:bg-gray-950 transition-colors border-none outline-none italic shadow-bhagva-flat"
        >
          प्रवेश द्वार खोलें
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-40">
      <div className="container mx-auto px-6 py-12 max-w-4xl space-y-24">
        
        {/* ── INTELLIGENCE HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b-8 border-primary pb-20">
           <div className="space-y-8">
              <div className="flex items-center gap-6">
                 <div className="size-20 bg-gray-950 text-primary flex items-center justify-center border-4 border-primary shadow-bhagva-flat">
                    <Bell className="size-10" />
                 </div>
                 <div className="space-y-2">
                    <h1 className="text-5xl md:text-7xl font-black text-gray-950 italic tracking-tighter uppercase leading-none">सूचना <span className="text-primary italic">केंद्र</span></h1>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.6em] italic">NETWORK NOTIFICATION INTERCEPTS</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-4 bg-primary text-white px-8 py-3 italic font-black uppercase tracking-[0.3em] text-[12px] border-2 border-primary">
                    <Activity className="size-4" />
                    <span>{unreadCount} सक्रिय सिग्नल</span>
                 </div>
              </div>
           </div>

           {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                disabled={markingAll}
                className="px-10 py-6 bg-gray-950 text-white border-b-8 border-primary flex items-center justify-center gap-6 hover:bg-primary transition-all group border-none outline-none"
              >
                <span className="font-black text-[12px] uppercase tracking-[0.3em] italic">{markingAll ? "अपडेट..." : "सब पढ़ें"}</span>
                {markingAll ? <Loader2 className="size-6 animate-spin" /> : <CheckCheck className="size-8" />}
              </button>
           )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-12 bg-gray-50 border-8 border-dashed border-gray-100">
             <div className="size-24 bg-white border-4 border-primary flex items-center justify-center">
                <Loader2 className="size-12 animate-spin text-primary" />
             </div>
             <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.6em] italic">DECODING STREAM PROTOCOL</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 gap-12 text-center bg-gray-50 border-8 border-dashed border-gray-100 italic">
            <div className="size-32 bg-white border-4 border-gray-100 flex items-center justify-center text-gray-200 shadow-2xl">
              <BellOff className="size-16" />
            </div>
            <div className="space-y-4">
               <h3 className="text-4xl font-black italic tracking-tighter uppercase text-gray-950 leading-none">कोई सिग्नल नहीं</h3>
               <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.6em] italic underline underline-offset-8 decoration-primary/20">The network environment is currently silent.</p>
            </div>
            <button onClick={() => navigate("/reels")} className="px-16 py-6 bg-primary text-white font-black text-lg uppercase tracking-[0.4em] hover:bg-gray-950 shadow-bhagva-flat italic border-none outline-none">नेटवर्क से जुड़ें</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {notifications.map((notif) => (
              <button
                key={notif.id}
                onClick={() => handleNotifClick(notif)}
                className={`relative w-full flex items-start gap-10 p-10 border-4 transition-all italic hover:border-primary group ${notif.read ? "bg-white border-gray-100" : "bg-gray-50 border-gray-100 shadow-bhagva-flat"}`}
              >
                {!notif.read && (
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                )}
                
                {/* ICON MARKER */}
                <div className={`size-20 flex items-center justify-center flex-shrink-0 border-4 ${notif.read ? 'bg-gray-100 border-white text-gray-300' : 'bg-white border-primary text-primary shadow-xl'}`}>
                  {getIcon(notif.type)}
                </div>

                {/* CONTENT BODY */}
                <div className="flex-1 min-w-0 space-y-6">
                  <div className="flex justify-between items-start gap-6 pt-2">
                     <p className={`text-2xl leading-[1.1] italic tracking-tighter uppercase ${notif.read ? "text-gray-400 font-bold" : "text-gray-950 font-black"}`}>
                       {notif.message}
                     </p>
                     <ChevronRight className="size-8 text-gray-100 group-hover:text-primary transition-all group-hover:translate-x-3" />
                  </div>
                  
                  {notif.videoTitle && (
                    <div className="flex items-center gap-4 bg-gray-950 p-5 text-white border-l-8 border-primary">
                      <Film className="size-5 text-primary" />
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] truncate italic">{notif.videoTitle}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                     <div className="flex items-center gap-4">
                        <Zap className={`size-4 ${notif.read ? 'text-gray-200' : 'text-primary'}`} />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
                          {formatTime(notif.createdAt?.toDate ? notif.createdAt.toDate() : new Date(notif.createdAt))}
                        </p>
                     </div>
                     {!notif.read && (
                        <span className="text-[9px] font-black text-white bg-primary px-4 py-1.5 uppercase tracking-[0.3em] italic border border-white">PRIORITY SIGNAL</span>
                     )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "अभी";
  if (diff < 3600) return `${Math.floor(diff / 60)} मि पहले`;
  if (diff < 84600) return `${Math.floor(diff / 3600)} घं पहले`;
  return `${Math.floor(diff / 84600)} दिन पहले`;
}

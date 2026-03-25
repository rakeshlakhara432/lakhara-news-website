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
      toast.success("All protocols updated.");
    } catch {
      toast.error("Protocol update failed.");
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
      case "like": return <Heart className="size-6 text-primary fill-primary" />;
      case "comment": return <MessageCircle className="size-6 text-blue-500" />;
      case "follow": return <UserPlus className="size-6 text-green-500" />;
      default: return <Bell className="size-6 text-orange-500" />;
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-12 px-6">
        <div className="relative">
           <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse"></div>
           <div className="size-32 bg-gray-950 rounded-[3rem] flex items-center justify-center border border-white/10 relative z-10">
              <ZapOff className="size-16 text-primary" />
           </div>
        </div>
        <div className="text-center space-y-4">
           <h2 className="text-5xl font-black text-gray-950 dark:text-white italic tracking-tighter uppercase leading-none">SIGNALS <span className="text-gradient">BLOCKED</span></h2>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.6em]">Secure login required to access intercept log.</p>
        </div>
        <button
          onClick={() => navigate("/profile")}
          className="btn-lakhara !rounded-[2rem] px-16 py-6 !text-lg"
        >
          INITIALIZE LOGIN
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] dark:bg-gray-950 min-h-screen pb-40">
      <div className="container mx-auto px-6 py-12 max-w-2xl space-y-16">
        
        {/* ── Intelligence Header ── */}
        <div className="flex items-center justify-between gap-10">
           <div className="space-y-4">
              <div className="flex items-center gap-4">
                 <div className="size-12 bg-lakhara rounded-2xl flex items-center justify-center shadow-lakhara">
                    <Bell className="size-6 text-white" />
                 </div>
                 <h1 className="text-5xl font-black text-gray-950 dark:text-white italic tracking-tighter uppercase leading-none">INTERCEPTS</h1>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full border border-primary/20">
                    <Activity className="size-3" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">{unreadCount} Critical Signals</span>
                 </div>
              </div>
           </div>

           {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                disabled={markingAll}
                className="size-16 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[1.8rem] flex items-center justify-center text-gray-400 hover:text-primary transition-all shadow-sm active:scale-90"
              >
                {markingAll ? <Loader2 className="size-8 animate-spin" /> : <CheckCheck className="size-8" />}
              </button>
           )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-8">
             <div className="size-20 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] flex items-center justify-center animate-pulse">
                <Loader2 className="size-10 animate-spin text-primary" />
             </div>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">Decoding Stream</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 gap-10 text-center bg-white dark:bg-white/5 rounded-[4rem] border border-dashed border-gray-100 dark:border-white/5">
            <div className="size-24 bg-gray-50 dark:bg-gray-950 rounded-[3rem] flex items-center justify-center text-gray-200">
              <BellOff className="size-12" />
            </div>
            <div>
               <h3 className="text-3xl font-black italic tracking-tighter uppercase text-gray-950 dark:text-white mb-4">No Signals Detected</h3>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">The network environment is currently silent.</p>
            </div>
            <button onClick={() => navigate("/reels")} className="btn-lakhara !rounded-[1.5rem] !px-10 !py-4 font-black">ENGAGE NETWORK</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {notifications.map((notif) => (
              <button
                key={notif.id}
                onClick={() => handleNotifClick(notif)}
                className={`group relative w-full flex items-start gap-8 p-10 rounded-[3.5rem] border transition-all duration-500 overflow-hidden text-left ${notif.read ? "bg-white dark:bg-white/2 border-gray-50 dark:border-white/5" : "bg-white dark:bg-white/5 border-primary/20 shadow-2xl shadow-primary/5"}`}
              >
                {!notif.read && (
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
                )}
                
                {/* Visual Marker */}
                <div className={`size-16 rounded-[1.8rem] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-500 ${notif.read ? 'bg-gray-50 dark:bg-white/5 text-gray-400' : 'bg-primary/10 text-primary shadow-lakhara shadow-primary/10'}`}>
                  {getIcon(notif.type)}
                </div>

                {/* Intel Body */}
                <div className="flex-1 min-w-0 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                     <p className={`text-xl leading-tight italic tracking-tighter ${notif.read ? "text-gray-500 font-medium" : "text-gray-950 dark:text-white font-black uppercase"}`}>
                       {notif.message}
                     </p>
                     <ChevronRight className="size-5 text-gray-300 flex-shrink-0 group-hover:translate-x-2 transition-transform" />
                  </div>
                  
                  {notif.videoTitle && (
                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                      <Film className="size-4 text-primary" />
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest truncate italic">{notif.videoTitle}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2">
                     <div className="flex items-center gap-2">
                        <span className="size-1.5 bg-gray-200 rounded-full"></span>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                          {formatTime(notif.createdAt?.toDate ? notif.createdAt.toDate() : new Date(notif.createdAt))}
                        </p>
                     </div>
                     {!notif.read && (
                        <span className="text-[8px] font-black text-primary uppercase tracking-[0.3em] bg-primary/10 px-3 py-1 rounded-full">Priority Signal</span>
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
  if (diff < 60) return "Just Now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 84600) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 84600)}d ago`;
}

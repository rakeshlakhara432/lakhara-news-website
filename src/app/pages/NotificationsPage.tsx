import { useState, useEffect } from "react";
import {
  Bell, Heart, MessageCircle, UserPlus, Check, CheckCheck,
  Loader2, BellOff, Film
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
    await videoService.markAllNotificationsRead(user.uid);
    setMarkingAll(false);
    toast.success("सभी notifications read mark हो गईं ✅");
  };

  const handleNotifClick = async (notif: Notification) => {
    if (!notif.read) await videoService.markNotificationRead(notif.id!);
    if (notif.videoId) navigate("/reels");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "like": return <Heart className="size-5 text-red-500 fill-red-500" />;
      case "comment": return <MessageCircle className="size-5 text-blue-500" />;
      case "follow": return <UserPlus className="size-5 text-green-500" />;
      default: return <Bell className="size-5 text-orange-500" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "like": return "bg-red-50";
      case "comment": return "bg-blue-50";
      case "follow": return "bg-green-50";
      default: return "bg-orange-50";
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4">
        <div className="size-20 bg-orange-50 rounded-3xl flex items-center justify-center">
          <Bell className="size-10 text-orange-500" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 text-center">Notifications</h2>
        <p className="text-gray-500 text-center font-medium">
          Notifications देखने के लिए Login करें।
        </p>
        <button
          onClick={() => navigate("/profile")}
          className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-lg shadow-lg hover:bg-red-700 transition-all"
        >
          Login करें
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Bell className="size-7 text-orange-500" />
            Notifications
            {unreadCount > 0 && (
              <span className="flex items-center justify-center size-6 bg-red-600 text-white rounded-full text-xs font-black">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </h1>
          <p className="text-gray-400 font-medium text-sm mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread` : "सब पढ़ लिया"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            disabled={markingAll}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-2xl text-sm font-black text-gray-600 transition-all"
          >
            {markingAll ? <Loader2 className="size-4 animate-spin" /> : <CheckCheck className="size-4" />}
            सब पढ़ा
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-10 animate-spin text-red-600" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <div className="size-20 bg-gray-50 rounded-3xl flex items-center justify-center">
            <BellOff className="size-10 text-gray-300" />
          </div>
          <p className="text-gray-500 font-black text-lg">कोई notification नहीं</p>
          <p className="text-gray-400 font-medium text-sm">
            जब कोई आपकी video like करे या comment करे, यहाँ दिखेगा
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <button
              key={notif.id}
              onClick={() => handleNotifClick(notif)}
              className={`w-full flex items-start gap-4 p-4 rounded-3xl border transition-all text-left hover:shadow-md ${notif.read ? "bg-white border-gray-100" : "bg-red-50/50 border-red-100"}`}
            >
              {/* Icon */}
              <div className={`size-12 ${getIconBg(notif.type)} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                {getIcon(notif.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-relaxed ${notif.read ? "text-gray-600 font-medium" : "text-gray-900 font-bold"}`}>
                  {notif.message}
                </p>
                {notif.videoTitle && (
                  <div className="flex items-center gap-1 mt-1">
                    <Film className="size-3 text-gray-400" />
                    <p className="text-xs text-gray-400 font-medium truncate">{notif.videoTitle}</p>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1 font-medium">
                  {notif.createdAt?.toDate
                    ? formatTime(notif.createdAt.toDate())
                    : ""}
                </p>
              </div>

              {/* Read indicator */}
              {!notif.read && (
                <div className="size-2.5 bg-red-600 rounded-full flex-shrink-0 mt-2" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "अभी";
  if (diff < 3600) return `${Math.floor(diff / 60)} मिनट पहले`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} घंटे पहले`;
  return `${Math.floor(diff / 86400)} दिन पहले`;
}

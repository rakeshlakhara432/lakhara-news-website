import { useState, useEffect } from "react";
import {
  Flag, Trash2, UserX, Eye, Heart, MessageCircle, AlertTriangle,
  Loader2, RefreshCw, Shield, CheckCircle, Search, Filter,
  Film, Ban
} from "lucide-react";
import { videoService, VideoPost } from "../../services/videoService";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../data/firebase";
import { toast } from "sonner";

export function ManageVideos() {
  const [reportedVideos, setReportedVideos] = useState<VideoPost[]>([]);
  const [allVideos, setAllVideos] = useState<VideoPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"reported" | "all" | "banned">("reported");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [reported, all] = await Promise.all([
        videoService.getReportedVideos(),
        videoService.getVideos(50),
      ]);
      setReportedVideos(reported);
      setAllVideos(all);
    } catch (e) {
      toast.error("Data load नहीं हो सका।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleDeleteVideo = async (videoId: string) => {
    if (!confirm("क्या आप इस video को ban करना चाहते हैं?")) return;
    setActionLoading(videoId);
    try {
      await videoService.deleteVideo(videoId);
      toast.success("Video ban कर दी गई। ✅");
      loadData();
    } catch {
      toast.error("Video ban नहीं हो सकी।");
    } finally { setActionLoading(null); }
  };

  const handleBanUser = async (userId: string, userName: string) => {
    if (!confirm(`क्या आप "${userName}" को ban करना चाहते हैं? उनकी सारी videos भी ban हो जाएंगी।`)) return;
    setActionLoading(userId);
    try {
      await videoService.banUser(userId);
      toast.success(`${userName} को ban कर दिया गया।`);
      loadData();
    } catch {
      toast.error("User ban नहीं हो सका।");
    } finally { setActionLoading(null); }
  };

  const displayVideos = () => {
    let base: VideoPost[] = [];
    if (activeTab === "reported") base = reportedVideos;
    else if (activeTab === "all") base = allVideos.filter((v) => v.status === "published");
    else base = allVideos.filter((v) => v.status === "banned");

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      base = base.filter((v) =>
        v.title.toLowerCase().includes(q) ||
        v.authorName.toLowerCase().includes(q)
      );
    }
    return base;
  };

  const videos = displayVideos();

  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Shield className="size-7 text-red-600" /> Video Admin Control
          </h1>
          <p className="text-gray-500 font-medium text-sm mt-0.5">
            Report की गई videos और users manage करें
          </p>
        </div>
        <button
          onClick={loadData}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-gray-700 transition-all"
        >
          <RefreshCw className="size-4" /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
          <p className="text-3xl font-black text-red-600">{reportedVideos.length}</p>
          <p className="text-xs font-bold text-red-400 uppercase tracking-wider mt-1">Reported Videos</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
          <p className="text-3xl font-black text-green-600">{allVideos.filter(v => v.status === "published").length}</p>
          <p className="text-xs font-bold text-green-400 uppercase tracking-wider mt-1">Published</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
          <p className="text-3xl font-black text-gray-600">{allVideos.filter(v => v.status === "banned").length}</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Banned</p>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex gap-2">
          {(["reported", "all", "banned"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-black transition-all capitalize ${activeTab === tab ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              {tab === "reported" ? "🚨 Reported" : tab === "all" ? "🎬 All Published" : "🚫 Banned"}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium outline-none focus:border-red-400 transition-all w-48"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-10 animate-spin text-red-600" />
        </div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center py-16 gap-4 text-center">
          <CheckCircle className="size-16 text-green-400" />
          <p className="font-black text-gray-700 text-lg">
            {activeTab === "reported" ? "कोई reported video नहीं! 🎉" : "कोई video नहीं मिली"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className={`bg-white rounded-2xl border p-4 flex gap-4 items-start transition-all ${video.reportCount >= 5 ? "border-red-200 bg-red-50/30" : "border-gray-100"}`}
            >
              {/* Thumbnail */}
              <div className="relative rounded-xl overflow-hidden flex-shrink-0 w-20 h-28 bg-gray-100">
                {video.thumbnailUrl ? (
                  <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Film className="size-8 text-gray-300" />
                  </div>
                )}
                {video.status === "banned" && (
                  <div className="absolute inset-0 bg-red-600/80 flex items-center justify-center">
                    <Ban className="size-6 text-white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-black text-gray-900 text-sm line-clamp-1">{video.title}</h3>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">by {video.authorName}</p>
                  </div>
                  {video.reportCount > 0 && (
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-black flex-shrink-0 ${video.reportCount >= 5 ? "bg-red-600 text-white" : "bg-orange-100 text-orange-600"}`}>
                      <Flag className="size-3" /> {video.reportCount}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-400 mt-1 line-clamp-2 font-medium">{video.caption}</p>

                {/* Stats */}
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye className="size-3" /> {video.views}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Heart className="size-3" /> {video.likes}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <MessageCircle className="size-3" /> {video.commentsCount}
                  </span>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full ${video.status === "published" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                    {video.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  {video.status !== "banned" && (
                    <button
                      onClick={() => handleDeleteVideo(video.id!)}
                      disabled={actionLoading === video.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl text-xs font-black transition-all disabled:opacity-50"
                    >
                      {actionLoading === video.id ? <Loader2 className="size-3 animate-spin" /> : <Trash2 className="size-3" />}
                      Ban Video
                    </button>
                  )}
                  <button
                    onClick={() => handleBanUser(video.authorId, video.authorName)}
                    disabled={actionLoading === video.authorId}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-900 text-gray-600 hover:text-white rounded-xl text-xs font-black transition-all disabled:opacity-50"
                  >
                    {actionLoading === video.authorId ? <Loader2 className="size-3 animate-spin" /> : <UserX className="size-3" />}
                    Ban User
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

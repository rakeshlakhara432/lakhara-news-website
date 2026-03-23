import { useState, useEffect } from "react";
import { Lock, Save, Youtube, Plus, Trash2, PlayCircle } from "lucide-react";
import { toast } from "sonner";
import { getYouTubeSettings, saveYouTubeSettings, YouTubeVideo } from "../../data/mockData";

export function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [youtubeVideoId, setYoutubeVideoId] = useState("");
  const [isLive, setIsLive] = useState(true);
  const [favoriteVideos, setFavoriteVideos] = useState<YouTubeVideo[]>([]);
  const [newVideoId, setNewVideoId] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");

  useEffect(() => {
    const settings = getYouTubeSettings();
    setYoutubeVideoId(settings.liveVideoId);
    setIsLive(settings.isLive);
    setFavoriteVideos(settings.favoriteVideos || []);
  }, []);

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem("adminPassword") || "admin123";

    if (currentPassword !== storedPassword) {
      toast.error("Incorrect current password!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    localStorage.setItem("adminPassword", newPassword);
    toast.success("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const updateAllYouTubeSettings = (newFavorites?: YouTubeVideo[]) => {
    saveYouTubeSettings({
      liveVideoId: youtubeVideoId,
      isLive: isLive,
      favoriteVideos: newFavorites || favoriteVideos,
    });
  };

  const handleSaveYouTubeLive = (e: React.FormEvent) => {
    e.preventDefault();
    updateAllYouTubeSettings();
    toast.success("Live stream settings updated!");
  };

  const addFavoriteVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoId || !newVideoTitle) {
      toast.error("Please fill all fields");
      return;
    }
    const newVideos = [...favoriteVideos, { id: newVideoId, title: newVideoTitle }];
    setFavoriteVideos(newVideos);
    updateAllYouTubeSettings(newVideos);
    setNewVideoId("");
    setNewVideoTitle("");
    toast.success("Video added to gallery!");
  };

  const removeFavoriteVideo = (id: string) => {
    const newVideos = favoriteVideos.filter(v => v.id !== id);
    setFavoriteVideos(newVideos);
    updateAllYouTubeSettings(newVideos);
    toast.success("Video removed");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Security Settings */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-900 text-white rounded-xl shadow-sm">
              <Lock className="size-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Security</h1>
              <p className="text-sm text-gray-500">Change password</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <form onSubmit={handleSavePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>
              <button type="submit" className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-colors">
                Update Password
              </button>
            </form>
          </div>
        </div>

        {/* Live Stream Settings */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600 text-white rounded-xl shadow-sm">
              <Youtube className="size-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Live Stream</h1>
              <p className="text-sm text-gray-500">Configure Live TV</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <form onSubmit={handleSaveYouTubeLive} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">YouTube Video ID</label>
                <input
                  type="text"
                  value={youtubeVideoId}
                  onChange={(e) => setYoutubeVideoId(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="e.g. jfKfPfyJRdk"
                  required
                />
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <input
                  type="checkbox"
                  id="isLive"
                  checked={isLive}
                  onChange={(e) => setIsLive(e.target.checked)}
                  className="size-4 text-red-600 rounded"
                />
                <label htmlFor="isLive" className="text-sm font-bold text-red-700">Display as "LIVE NOW"</label>
              </div>
              <button type="submit" className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-100">
                Update Live Stream
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* YouTube Gallery Management */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 text-red-600 rounded-xl shadow-sm">
            <PlayCircle className="size-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">YouTube Gallery (Likes)</h1>
            <p className="text-sm text-gray-500">Add videos you want to feature on the homepage.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Add New Video Form */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4">Add New Video</h3>
              <form onSubmit={addFavoriteVideo} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Video ID</label>
                  <input
                    type="text"
                    value={newVideoId}
                    onChange={(e) => setNewVideoId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="e.g. jfKfPfyJRdk"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Display Title</label>
                  <input
                    type="text"
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="Breaking News Update"
                  />
                </div>
                <button type="submit" className="w-full py-3 bg-red-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors">
                  <Plus className="size-5" /> Add to Gallery
                </button>
              </form>
            </div>
          </div>

          {/* Current Gallery List */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteVideos.map((video) => (
                <div key={video.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col group">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                    <img 
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                      alt={video.title}
                      className="size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Youtube className="text-white size-10" />
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm line-clamp-1 mb-3">{video.title}</h4>
                  <button 
                    onClick={() => removeFavoriteVideo(video.id)}
                    className="mt-auto flex items-center justify-center gap-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                  >
                    <Trash2 className="size-4" /> Remove
                  </button>
                </div>
              ))}
              {favoriteVideos.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                  <Youtube className="size-12 mx-auto mb-3 opacity-20" />
                  <p>No videos added yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

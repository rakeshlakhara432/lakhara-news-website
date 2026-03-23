import { useState, useEffect } from "react";
import { Lock, Save, Youtube } from "lucide-react";
import { toast } from "sonner";
import { getYouTubeSettings, saveYouTubeSettings } from "../../data/mockData";

export function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [youtubeVideoId, setYoutubeVideoId] = useState("");
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const settings = getYouTubeSettings();
    setYoutubeVideoId(settings.liveVideoId);
    setIsLive(settings.isLive);
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

  const handleSaveYouTube = (e: React.FormEvent) => {
    e.preventDefault();
    saveYouTubeSettings({
      liveVideoId: youtubeVideoId,
      isLive: isLive,
    });
    toast.success("YouTube settings updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Password Settings */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-600 text-white rounded-lg shadow-sm">
            <Lock className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
            <p className="text-gray-500">Change your administrator password securely.</p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSavePassword} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-black transition-colors"
            >
              <Save className="size-5" />
              Save Password
            </button>
          </form>
        </div>
      </div>

      {/* YouTube Settings */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-600 text-white rounded-lg shadow-sm">
            <Youtube className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Live TV Configuration</h1>
            <p className="text-gray-500">Connect your YouTube Live stream or video.</p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSaveYouTube} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                YouTube Video ID
              </label>
              <input
                type="text"
                placeholder="e.g. jfKfPfyJRdk"
                value={youtubeVideoId}
                onChange={(e) => setYoutubeVideoId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                required
              />
              <p className="mt-2 text-xs text-gray-500">
                You can find the ID in the URL: youtube.com/watch?v=<b>VIDEO_ID</b>
              </p>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <input
                type="checkbox"
                id="isLive"
                checked={isLive}
                onChange={(e) => setIsLive(e.target.checked)}
                className="size-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="isLive" className="text-sm font-medium text-gray-700">
                Show as "LIVE NOW" on website
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-100"
            >
              <Youtube className="size-5" />
              Update Live Stream
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

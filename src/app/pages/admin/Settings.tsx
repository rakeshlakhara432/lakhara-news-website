import { useState } from "react";
import { Lock, Save } from "lucide-react";
import { toast } from "sonner";

export function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = (e: React.FormEvent) => {
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

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-600 text-white rounded-lg shadow-sm">
          <Lock className="size-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-500">Change your administrator password securely.</p>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSave} className="space-y-5">
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
          <div className="pt-2 border-t">
            <label className="block text-sm font-semibold text-gray-700 mb-2 mt-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password (min. 6 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-black transition-colors"
          >
            <Save className="size-5" />
            Save New Password
          </button>
        </form>
      </div>
    </div>
  );
}

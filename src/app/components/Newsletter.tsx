import { useState } from "react";
import { Send, CheckCircle, Bell, Mail, ShieldAlert, Globe, BookOpen, Heart, Landmark } from "lucide-react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      toast.success("Patrika Ka Sadasya Banne Ke Liye Dhanyawad! 📧");
    }, 1000);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-inner border border-gray-200">
      {subscribed ? (
        <div className="text-center space-y-4">
          <div className="size-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="size-10" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 uppercase italic">Dhanyawad!</h3>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Aap sadasya ban chuke hain.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center max-w-2xl mx-auto w-full">
          <div className="relative flex-1 w-full group">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-300" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="APNA EMAIL LIKHEIN..."
              className="w-full bg-gray-50 border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl pl-14 pr-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300 uppercase tracking-widest"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-simple w-full md:w-auto !py-4 !px-10 flex items-center justify-center gap-3"
          >
            <span>{loading ? "PRATIKSHA..." : "Sadasya Bane"}</span>
            {!loading && <Send className="size-4" />}
          </button>
        </form>
      )}
    </div>
  );
}

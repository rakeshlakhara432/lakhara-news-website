import { useState } from "react";
import { Send, CheckCircle, Mail } from "lucide-react";
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
      toast.success("सदस्य बनने के लिए धन्यवाद! 📧");
    }, 1000);
  };

  return (
    <div className="bg-white p-6 border border-gray-200">
      {subscribed ? (
        <div className="text-center space-y-3">
          <div className="size-12 bg-green-50 text-green-600 flex items-center justify-center mx-auto">
            <CheckCircle className="size-8" />
          </div>
          <h3 className="text-xl font-black text-gray-950 uppercase">धन्यवाद!</h3>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">आप सदस्य बन चुके हैं।</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 items-center max-w-2xl mx-auto w-full">
          <div className="relative flex-1 w-full">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="आपका ईमेल..."
              className="w-full bg-gray-50 border border-gray-200 focus:border-primary px-10 py-3 text-gray-950 font-bold outline-none placeholder:text-gray-400 uppercase text-xs"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-primary text-white py-3 px-8 flex items-center justify-center gap-2 font-black text-xs uppercase"
          >
            <span>{loading ? "प्रतीक्षा..." : "सदस्य बनें"}</span>
            {!loading && <Send className="size-3" />}
          </button>
        </form>
      )}
    </div>
  );
}


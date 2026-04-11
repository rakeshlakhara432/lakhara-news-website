import { useState } from "react";
import { UserCheck, Phone, Mail, MapPin, Users, X, Loader2, CheckCircle2 } from "lucide-react";
import { eventRegistrationService } from "../../services/eventRegistrationService";
import { toast } from "sonner";

interface Props {
  eventId: string;
  eventTitle: string;
  onClose: () => void;
}

export function EventRegistrationModal({ eventId, eventTitle, onClose }: Props) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", city: "", attendees: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.city) {
      toast.error("कृपया अनिवार्य जानकारी भरें");
      return;
    }
    setIsSubmitting(true);
    try {
      await eventRegistrationService.register({
        eventId,
        eventTitle,
        name:      form.name,
        phone:     form.phone,
        email:     form.email,
        city:      form.city,
        attendees: form.attendees,
      });
      setSuccess(true);

      // WhatsApp confirmation
      const msg = `✅ *Event Registration Confirmed!*\n\n📅 Event: ${eventTitle}\n👤 Name: ${form.name}\n📱 Phone: ${form.phone}\n📍 City: ${form.city}\n👥 Attendees: ${form.attendees}\n\n*लखारा समाज कम्युनिटी* में आपका स्वागत है! 🙏`;
      setTimeout(() => {
        window.open(`https://wa.me/91${form.phone}?text=${encodeURIComponent(msg)}`, "_blank");
      }, 1500);

    } catch {
      toast.error("Registration नहीं हो सकी। पुनः प्रयास करें।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors">
            <X className="size-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <UserCheck className="size-6" />
            </div>
            <div>
              <h2 className="text-lg font-black">Event Registration</h2>
              <p className="text-xs text-orange-100 font-medium line-clamp-1">{eventTitle}</p>
            </div>
          </div>
        </div>

        {success ? (
          <div className="p-10 text-center space-y-4">
            <div className="size-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="size-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-800">Registration <span className="text-emerald-500">सफल!</span></h3>
            <p className="text-sm text-slate-500 font-medium">WhatsApp पर confirmation भेजा जा रहा है…</p>
            <button onClick={onClose} className="px-8 py-3 bg-orange-600 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-all">
              बंद करें
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider">पूरा नाम *</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 transition-colors">
                <UserCheck className="size-4 text-slate-400 shrink-0" />
                <input required type="text" placeholder="नाम..." value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="bg-transparent outline-none w-full text-sm font-semibold text-slate-800" />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider">मोबाइल नंबर *</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 transition-colors">
                <Phone className="size-4 text-slate-400 shrink-0" />
                <input required type="tel" placeholder="10 अंक..." value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="bg-transparent outline-none w-full text-sm font-semibold text-slate-800" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Email (Optional)</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 transition-colors">
                <Mail className="size-4 text-slate-400 shrink-0" />
                <input type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="bg-transparent outline-none w-full text-sm font-semibold text-slate-800" />
              </div>
            </div>

            {/* City */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider">शहर / गांव *</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 transition-colors">
                <MapPin className="size-4 text-slate-400 shrink-0" />
                <input required type="text" placeholder="स्थान..." value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} className="bg-transparent outline-none w-full text-sm font-semibold text-slate-800" />
              </div>
            </div>

            {/* Attendees */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider">कितने लोग आएंगे?</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 transition-colors">
                <Users className="size-4 text-slate-400 shrink-0" />
                <input type="number" min={1} max={20} value={form.attendees} onChange={e => setForm(p => ({ ...p, attendees: +e.target.value }))} className="bg-transparent outline-none w-full text-sm font-semibold text-slate-800" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-black rounded-xl text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <UserCheck className="size-4" />}
              {isSubmitting ? "Register हो रहे हैं..." : "Event में Register करें"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

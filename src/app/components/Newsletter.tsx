import { useState } from "react";
import { Send, CheckCircle, Bell, Mail, ShieldAlert, Globe, BookOpen, Heart, Landmark } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

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
      toast.success("Patrika Ka Sadasya Banne Ke Liye Dhanyawad! 📧", {
        style: {
          background: '#FF9933',
          color: '#ffffff',
          border: '1px solid #800000'
        }
      });
    }, 1500);
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 md:p-24 relative overflow-hidden shadow-xl border-4 border-primary/5 group">
      <div className="grid-paper absolute inset-0 opacity-10"></div>
      <div className="absolute top-0 right-0 size-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <AnimatePresence mode="wait">
        {subscribed ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 text-center space-y-8"
          >
            <div className="size-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <CheckCircle className="size-12 text-white" />
            </div>
            <h3 className="text-4xl md:text-6xl font-serif-heritage font-black italic tracking-tighter mb-4 uppercase text-secondary">
               AB AAP <span className="text-primary italic">SADASYA</span> HAIN
            </h3>
            <p className="text-secondary/50 font-serif-heritage text-lg max-w-md mx-auto italic">
               Lakhara Digital News Patrika aapke inbox mein jald hi prapt hogi.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 max-w-4xl mx-auto text-center space-y-16"
          >
            <div className="flex flex-col items-center gap-8">
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="size-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shadow-inner group-hover:scale-110 transition-transform"
               >
                  <BookOpen className="size-10 text-primary" />
               </motion.div>
               <div className="space-y-4">
                  <h2 className="text-5xl md:text-8xl font-serif-heritage font-black text-secondary italic tracking-tighter leading-[0.85] uppercase">
                    LAKHARA <span className="text-primary italic">PATRIKA</span>
                  </h2>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mt-2">Dainik Samachar Update • Sadasya Baniyen</p>
               </div>
            </div>

            <p className="text-secondary/60 font-serif-heritage text-xl md:text-2xl font-medium leading-relaxed italic max-w-2xl mx-auto px-4">
              "Lakhara samaj ke mukhya samacharo ko apne mobile par prapt karein."
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 items-center px-4 max-w-3xl mx-auto w-full">
               <div className="relative flex-1 w-full group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-primary/30 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="APNA EMAIL LIKHEIN..."
                    className="w-full bg-paper border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl pl-16 pr-6 py-6 text-secondary font-bold outline-none transition-all text-lg placeholder:text-secondary/20 uppercase tracking-widest"
                  />
               </div>
               <button
                 type="submit"
                 disabled={loading}
                 className="btn-heritage w-full md:w-auto !py-6 !px-12 flex items-center justify-center gap-4 group"
               >
                 <span className="tracking-[0.2em]">{loading ? "PRATIKSHA..." : "Sadasya Bane"}</span>
                 {!loading && <Send className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
               </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-12 pt-10">
               <div className="flex items-center gap-3">
                  <Landmark className="size-5 text-primary opacity-40" />
                  <span className="text-[9px] font-black text-secondary/40 uppercase tracking-widest">Samajik Suraksha</span>
               </div>
               <div className="flex items-center gap-3">
                  <Heart className="size-5 text-primary opacity-40" />
                  <span className="text-[9px] font-black text-secondary/40 uppercase tracking-widest">Nishulk Seva</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

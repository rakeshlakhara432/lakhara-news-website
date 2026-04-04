import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Also show after 30 seconds if not shown
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, 30000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [hasShown]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative w-full max-w-2xl bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden border-t-8 border-primary"
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-primary flex flex-col items-center justify-center p-12 text-white relative">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Gift className="size-48" />
               </div>
               <div className="relative text-center space-y-6">
                  <div className="size-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-xl border border-white/30">
                     <Zap className="size-10 fill-current" />
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">FREE<br/>DELIVERY</h3>
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">ऑन समाज प्रोडक्ट्स</p>
                  </div>
                  <div className="bg-white text-primary px-4 py-2 font-black text-xs uppercase tracking-widest rounded-sm">
                     CODE: LAKHARA26
                  </div>
               </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-10 space-y-8 flex flex-col justify-center">
               <button 
                 onClick={() => setIsVisible(false)}
                 className="absolute top-4 right-4 text-gray-400 hover:text-primary transition-colors"
               >
                  <X className="size-5" />
               </button>

               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest italic">
                     <div className="size-1 bg-primary"></div> Exclusive Offer
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 leading-none">
                     Don't Miss Out!<br/>Our Best Sellers
                  </h2>
                  <p className="text-xs font-bold text-gray-400 leading-relaxed">
                     समाज डायरी और टी-शर्ट्स पर सीमित समय के लिए मुफ्त शिपिंग। आज ही अपना ऑर्डर बुक करें और समाज से जुड़ें।
                  </p>
               </div>

               <div className="space-y-4">
                  <Link 
                    to="/store" 
                    onClick={() => setIsVisible(false)}
                    className="w-full bg-gray-950 text-white py-4 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-primary transition-all group"
                  >
                     Shop Collection Now <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <div className="flex items-center justify-center gap-6 pt-4 text-gray-400">
                     <div className="flex items-center gap-1.5 font-bold text-[9px] uppercase tracking-widest">
                        <ShieldCheck className="size-3 text-primary" /> Verified
                     </div>
                     <div className="flex items-center gap-1.5 font-bold text-[9px] uppercase tracking-widest">
                        <Zap className="size-3 text-primary" /> Secure
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

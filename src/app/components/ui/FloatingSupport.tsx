import { useState } from 'react';
import { MessageCircle, X, Send, Phone, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatStep, setChatStep] = useState<'options' | 'chat'>('options');

  const supportOptions = [
    { title: 'WhatsApp Support', icon: Phone, color: '#25D366', action: () => window.open('https://wa.me/919636691724', '_blank') },
    { title: 'Live Chat', icon: MessageCircle, color: '#CC3300', action: () => setChatStep('chat') },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-20 right-0 w-[350px] bg-white border border-gray-100 shadow-2xl rounded-none overflow-hidden"
            >
              {/* Header */}
              <div className="bg-primary p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-black uppercase tracking-tighter text-xl">समाज सहायता</h4>
                    <p className="text-[10px] font-bold text-white/70 uppercase">Online &bull; 24/7 Available</p>
                  </div>
                  <X className="size-5 cursor-pointer hover:rotate-90 transition-transform" onClick={() => setIsOpen(false)} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {chatStep === 'options' ? (
                  <div className="space-y-4">
                     <p className="text-xs font-bold text-gray-500 mb-6">नमस्ते! हम आपकी किस प्रकार सहायता कर सकते हैं?</p>
                     {supportOptions.map((opt) => (
                       <button
                         key={opt.title}
                         onClick={opt.action}
                         className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-all group border border-transparent hover:border-gray-200"
                       >
                         <div className="flex items-center gap-4">
                           <div className="size-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: opt.color }}>
                             <opt.icon className="size-5" />
                           </div>
                           <span className="text-sm font-black uppercase text-gray-900">{opt.title}</span>
                         </div>
                         <Send className="size-4 text-gray-300 group-hover:text-primary transition-colors" />
                       </button>
                     ))}
                  </div>
                ) : (
                  <div className="flex flex-col h-[300px]">
                     <div className="flex-1 overflow-y-auto space-y-4">
                        <div className="flex gap-2">
                           <div className="size-6 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-sm">L</div>
                           <div className="bg-gray-100 p-3 rounded-none text-xs font-bold text-gray-700 max-w-[80%]">
                              नमस्ते! अपना संदेश यहाँ लिखें।
                           </div>
                        </div>
                     </div>
                     <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                        <input 
                          type="text" 
                          placeholder="Type message..." 
                          className="flex-1 bg-gray-50 px-4 py-2 text-xs font-bold outline-none focus:bg-white transition-colors" 
                        />
                        <button className="bg-primary text-white p-2">
                           <Send className="size-4" />
                        </button>
                     </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 p-4 text-center">
                 <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">॥ संघे शक्तिः कलौ युगे ॥</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`size-14 bg-primary text-white rounded-none flex items-center justify-center shadow-lg transition-transform ${isOpen ? 'rotate-90' : 'hover:scale-110'}`}
        >
          {isOpen ? <X className="size-6" /> : <MessageCircle className="size-7" />}
        </button>
      </div>
    </div>
  );
}

import { X, BookOpen, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DB_EBook } from '../../data/database';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  ebook: DB_EBook | null;
}

export function PdfViewerModal({ isOpen, onClose, ebook }: PdfViewerModalProps) {
  if (!ebook) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[500] bg-black/90 backdrop-blur-sm flex flex-col"
        >
          {/* Header */}
          <div className="bg-gray-950 p-4 border-b border-primary/20 flex items-center justify-between shadow-2xl shrink-0">
             <div className="flex items-center gap-4">
                <div className="bg-primary/20 p-2 text-primary rounded-xl border border-primary/30">
                  <BookOpen className="size-6" />
                </div>
                <div>
                   <h3 className="text-white font-black text-lg uppercase tracking-wider">{ebook.title}</h3>
                   <p className="text-gray-400 text-xs font-bold tracking-widest">{ebook.author}</p>
                </div>
             </div>
             
             <div className="flex items-center gap-4">
                <button
                  onClick={() => window.open(ebook.pdfUrl, '_blank')}
                  className="text-gray-400 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border border-gray-800 px-3 py-1.5 hover:bg-gray-800 transition-colors"
                >
                   <Maximize2 className="size-4" /> Fullscreen
                </button>
                <button 
                  onClick={onClose}
                  className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded border border-red-500/20 transition-colors"
                >
                  <X className="size-6" />
                </button>
             </div>
          </div>

          {/* Book Viewer Frame */}
          <div className="flex-1 w-full h-full bg-[#323639] relative overflow-hidden flex justify-center p-4 md:p-8">
             <div className="w-full max-w-5xl h-full bg-white shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden flex">
                <iframe 
                  src={`${ebook.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  className="w-full h-full border-none"
                  title={ebook.title}
                />
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

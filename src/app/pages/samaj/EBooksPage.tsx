import { useState, useEffect } from 'react';
import { Book, Download, Search, BookOpen, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { PdfViewerModal } from '../../components/ui/PdfViewerModal';
import { samajService, EBook } from '../../services/samajService';

export function EBooksPage() {
  const [ebooks, setEbooks] = useState<EBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePdf, setActivePdf] = useState<EBook | null>(null);

  useEffect(() => {
    const unsubscribe = samajService.subscribeToEBooks((data) => {
      setEbooks(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const categories = ['All', ...new Set(ebooks.map(eb => eb.category))];

  const filteredEbooks = ebooks.filter(eb => {
    const matchesSearch = eb.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          eb.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || eb.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (ebook: EBook) => {
    toast.success(`${ebook.title} डाउनलोड शुरू हो रहा है...`);
    window.open(ebook.pdfUrl, '_blank');
  };

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-orange-600">
          समाज <span className="text-slate-900">ई-पुस्तकालय</span>
        </h1>
        <p className="text-slate-500 font-bold text-sm max-w-lg mx-auto">
          समाज का इतिहास, साहित्य और नियम अब आपकी मुट्ठी में। मुफ्त पीडीएफ डाउनलोड करें।
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-6 border-y border-slate-100 shadow-sm rounded-2xl">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
            <input 
              type="text" 
              placeholder="पुस्तक या लेखक खोजें..." 
              className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3 text-sm font-bold focus:bg-white focus:border-orange-500 outline-none transition-all rounded-xl shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         
         <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap rounded-xl ${
                  selectedCategory === cat 
                  ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-600/20' 
                  : 'bg-white text-slate-400 border-slate-100 hover:border-orange-200'
                }`}
              >
                {cat}
              </button>
            ))}
         </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-10 text-orange-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredEbooks.map((ebook) => (
            <motion.div 
              layout
              key={ebook.id} 
              className="group bg-white border border-slate-100 p-4 rounded-3xl hover:border-orange-200 transition-all flex flex-col h-full shadow-sm hover:shadow-xl"
            >
              <div className="aspect-[3/4] bg-slate-50 relative overflow-hidden mb-6 rounded-2xl border border-slate-50 shadow-inner">
                 <img 
                   src={ebook.thumbnailUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop'} 
                   alt={ebook.title} 
                   className="size-full object-cover group-hover:scale-105 transition-transform duration-700" 
                 />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="size-16 border-2 border-white text-white flex items-center justify-center rounded-full scale-50 group-hover:scale-100 transition-transform bg-white/10 backdrop-blur-sm">
                       <BookOpen className="size-8" />
                    </div>
                 </div>
                 <div className="absolute top-4 left-4 bg-orange-600 text-white text-[9px] font-black px-3 py-1.5 uppercase tracking-tighter rounded-full shadow-lg">
                    {ebook.category}
                 </div>
              </div>
              
              <div className="flex-1 space-y-2">
                 <h3 className="text-sm font-black uppercase text-slate-800 leading-tight group-hover:text-orange-600 transition-colors">{ebook.title}</h3>
                 <p className="text-[11px] font-bold text-slate-400 italic">लेखक: {ebook.author}</p>
                 <p className="text-[10px] font-medium text-slate-500 line-clamp-3 leading-relaxed">{ebook.description}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between gap-2">
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Downloads</span>
                    <span className="text-base font-black text-slate-800">{ebook.downloads || 0}</span>
                 </div>
                 <div className="flex gap-2">
                   <button 
                     onClick={() => setActivePdf(ebook)}
                     className="bg-orange-600 text-white p-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center hover:bg-orange-500 transition-all shadow-lg shadow-orange-600/10"
                     title="Read Book"
                   >
                     <BookOpen className="size-4" />
                   </button>
                   <button 
                     onClick={() => handleDownload(ebook)}
                     className="bg-slate-900 text-white px-4 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg"
                   >
                     <Download className="size-4" /> Download
                   </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {filteredEbooks.length === 0 && !isLoading && (
        <div className="py-20 text-center space-y-4">
           <Book className="size-16 text-slate-100 mx-auto" />
           <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">कोई पुस्तक नहीं मिली।</p>
        </div>
      )}

      <PdfViewerModal 
        isOpen={!!activePdf} 
        onClose={() => setActivePdf(null)} 
        ebook={activePdf as any} 
      />
    </div>
  );
}

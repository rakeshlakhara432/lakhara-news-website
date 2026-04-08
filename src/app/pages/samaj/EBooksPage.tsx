import { useState, useEffect } from 'react';
import { db, DB_EBook } from '../../data/database';
import { mockEBooks } from '../../data/mockData';
import { Book, Download, Search, Filter, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { PdfViewerModal } from '../../components/ui/PdfViewerModal';


export function EBooksPage() {
  const [ebooks, setEbooks] = useState<DB_EBook[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePdf, setActivePdf] = useState<DB_EBook | null>(null);


  useEffect(() => {
    const dbEbooks = db.getTable('ebooks');
    if (dbEbooks.length === 0) {
      db.updateTable('ebooks', mockEBooks);
      setEbooks(mockEBooks);
    } else {
      setEbooks(dbEbooks);
    }
  }, []);

  const categories = ['All', ...new Set(ebooks.map(eb => eb.category))];

  const filteredEbooks = ebooks.filter(eb => {
    const matchesSearch = eb.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          eb.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || eb.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (ebook: DB_EBook) => {
    // Record download
    const updatedEbooks = ebooks.map(eb => {
      if (eb.id === ebook.id) {
        return { ...eb, downloads: eb.downloads + 1 };
      }
      return eb;
    });
    db.updateTable('ebooks', updatedEbooks);
    setEbooks(updatedEbooks);
    
    toast.success(`${ebook.title} डाउनलोड शुरू हो रहा है...`);
    // In a real app, window.open(ebook.pdfUrl)
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="traditional-header justify-center uppercase">
          समाज <span className="text-gray-900">ई-पुस्तकालय</span>
        </h1>
        <p className="text-gray-500 font-bold text-sm max-w-lg mx-auto">
          समाज का इतिहास, साहित्य और नियम अब आपकी मुट्ठी में। मुफ्त पीडीएफ डाउनलोड करें।
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-6 border-y-2 border-primary/10">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="पुस्तक या लेखक खोजें..." 
              className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-3 text-sm font-bold focus:bg-white focus:border-primary outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         
         <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white text-gray-400 border-gray-200 hover:border-primary/30'
                }`}
              >
                {cat}
              </button>
            ))}
         </div>
      </div>

      {/* eBook Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredEbooks.map((ebook) => (
          <motion.div 
            layout
            key={ebook.id} 
            className="group bg-white border border-gray-100 p-4 hover:border-primary/30 transition-all flex flex-col h-full shadow-sm hover:shadow-xl"
          >
            <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden mb-6">
               <img 
                 src={ebook.thumbnail} 
                 alt={ebook.title} 
                 className="size-full object-cover group-hover:scale-105 transition-transform duration-700" 
               />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="size-16 border-2 border-white text-white flex items-center justify-center rounded-full scale-50 group-hover:scale-100 transition-transform">
                     <BookOpen className="size-8" />
                  </div>
               </div>
               <div className="absolute top-4 left-4 bg-primary text-white text-[9px] font-black px-2 py-1 uppercase tracking-tighter">
                  {ebook.category}
               </div>
            </div>
            
            <div className="flex-1 space-y-2">
               <h3 className="text-sm font-black uppercase text-gray-900 leading-tight group-hover:text-primary transition-colors">{ebook.title}</h3>
               <p className="text-[11px] font-bold text-gray-400 italic">लेखक: {ebook.author}</p>
               <p className="text-[10px] font-medium text-gray-500 line-clamp-2 leading-relaxed">{ebook.description}</p>
            </div>

            <div className="pt-6 mt-auto border-t border-gray-50 flex items-center justify-between gap-2">
               <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Downloads</span>
                  <span className="text-sm font-black text-gray-900">{ebook.downloads}</span>
               </div>
               <div className="flex gap-2">
                 <button 
                   onClick={() => setActivePdf(ebook)}
                   className="bg-primary text-white p-2 font-black text-[9px] uppercase tracking-widest flex items-center justify-center hover:bg-orange-600 transition-all shadow-lg"
                   title="Read Book"
                 >
                   <BookOpen className="size-4" />
                 </button>
                 <button 
                   onClick={() => handleDownload(ebook)}
                   className="bg-gray-950 text-white px-3 py-2 font-black text-[9px] uppercase tracking-widest flex items-center gap-2 hover:bg-primary transition-all shadow-lg"
                 >
                   <Download className="size-3" />
                 </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredEbooks.length === 0 && (
        <div className="py-20 text-center space-y-4">
           <Book className="size-16 text-gray-200 mx-auto" />
           <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">कोई पुस्तक नहीं मिली।</p>
        </div>
      )}

      <PdfViewerModal 
        isOpen={!!activePdf} 
        onClose={() => setActivePdf(null)} 
        ebook={activePdf} 
      />
    </div>
  );
}

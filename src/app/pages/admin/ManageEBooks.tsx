import { useState, useEffect } from 'react';
import { db, DB_EBook } from '../../data/database';
import { Plus, Trash2, Edit, Download, Book, Upload, X, Search, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export function ManageEBooks() {
  const [ebooks, setEbooks] = useState<DB_EBook[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEbook, setEditingEbook] = useState<DB_EBook | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setEbooks(db.getTable('ebooks'));
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('क्या आप वाकई इस पुस्तक को हटाना चाहते हैं?')) {
      const updated = ebooks.filter(e => e.id !== id);
      db.updateTable('ebooks', updated);
      setEbooks(updated);
      toast.success('पुस्तक हटा दी गई है।');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const ebookData: DB_EBook = {
      id: editingEbook?.id || `EB-${Date.now()}`,
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      pdfUrl: formData.get('pdfUrl') as string || '#',
      thumbnail: formData.get('thumbnail') as string || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop',
      downloads: editingEbook?.downloads || 0,
      createdAt: editingEbook?.createdAt || new Date().toISOString()
    };

    let updated;
    if (editingEbook) {
      updated = ebooks.map(eb => eb.id === editingEbook.id ? ebookData : eb);
    } else {
      updated = [ebookData, ...ebooks];
    }

    db.updateTable('ebooks', updated);
    setEbooks(updated);
    setIsModalOpen(false);
    setEditingEbook(null);
    toast.success(editingEbook ? 'अपडेट सफल!' : 'नई पुस्तक जोड़ी गई!');
  };

  const filteredEbooks = ebooks.filter(eb => 
    eb.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    eb.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border-b-4 border-primary shadow-sm">
         <div className="flex items-center gap-4">
            <div className="size-12 bg-primary text-white rounded-xl flex items-center justify-center">
               <Book className="size-6" />
            </div>
            <div>
               <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">प्रबंधन: ई-लाइब्रेरी</h2>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Manage eBooks & Community Literature</p>
            </div>
         </div>
         <button 
           onClick={() => { setEditingEbook(null); setIsModalOpen(true); }}
           className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-primary transition-all active:scale-95 shadow-md shadow-black/5"
         >
           <Plus className="size-4" /> पुस्तक जोड़ें
         </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div className="relative w-72">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
               <input 
                 type="text" 
                 placeholder="Search literature..." 
                 className="w-full bg-slate-50 border border-transparent pl-10 pr-4 py-2.5 text-xs font-bold rounded-xl focus:bg-white focus:border-slate-200 outline-none transition-all"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <FileText className="size-3 text-primary" /> {filteredEbooks.length} TOTAL EBOOKS
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                     <th className="px-6 py-4">S.No.</th>
                     <th className="px-6 py-4">Title & Author</th>
                     <th className="px-6 py-4">Category</th>
                     <th className="px-6 py-4">Downloads</th>
                     <th className="px-6 py-4">Added On</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredEbooks.map((eb, idx) => (
                    <tr key={eb.id} className="hover:bg-slate-50/30 transition-colors group">
                       <td className="px-6 py-4 text-xs font-black text-slate-400">{idx + 1}</td>
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <img src={eb.thumbnail} className="size-10 rounded-lg object-cover border border-slate-200 shrink-0" />
                             <div>
                                <p className="text-sm font-black text-slate-800 leading-tight group-hover:text-primary transition-colors">{eb.title}</p>
                                <p className="text-[10px] font-bold text-slate-400 mt-0.5">{eb.author}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest leading-none">
                             {eb.category}
                          </span>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 font-black text-slate-700 text-sm">
                             <Download className="size-3 text-emerald-500" /> {eb.downloads}
                          </div>
                       </td>
                       <td className="px-6 py-4 text-[10px] font-bold text-slate-500">
                          {new Date(eb.createdAt).toLocaleDateString()}
                       </td>
                       <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button onClick={() => { setEditingEbook(eb); setIsModalOpen(true); }} className="size-9 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                                <Edit className="size-4" />
                             </button>
                             <button onClick={() => handleDelete(eb.id)} className="size-9 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                                <Trash2 className="size-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-2xl bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border-t-8 border-primary">
               <form onSubmit={handleSave} className="p-10 space-y-8">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="size-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                           <Upload className="size-5" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter leading-none">
                           {editingEbook ? 'ई-बुक अपडेट करें' : 'नई ई-बुक अपलोड'}
                        </h3>
                     </div>
                     <button type="button" onClick={() => setIsModalOpen(false)} className="size-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all">
                        <X className="size-5" />
                     </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Book Title</label>
                        <input name="title" defaultValue={editingEbook?.title} required className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm" placeholder="Enter title" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Author Name</label>
                        <input name="author" defaultValue={editingEbook?.author} required className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm" placeholder="Author name" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Category</label>
                        <input name="category" defaultValue={editingEbook?.category} required className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm" placeholder="History, Rules, etc." />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Thumbnail URL</label>
                        <input name="thumbnail" defaultValue={editingEbook?.thumbnail} className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm" placeholder="https://..." />
                     </div>
                     <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">PDF URL / Link</label>
                        <input name="pdfUrl" defaultValue={editingEbook?.pdfUrl} required className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm" placeholder="Google Drive or External PDF link" />
                     </div>
                     <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Brief Description</label>
                        <textarea name="description" defaultValue={editingEbook?.description} rows={3} className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-slate-200 outline-none transition-all shadow-sm resize-none" placeholder="What is this book about?" />
                     </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                     <button type="submit" className="flex-1 bg-primary text-white py-4 rounded-[1.25rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-900 transition-all shadow-xl shadow-primary/20">
                        {editingEbook ? 'Update Ebook' : 'Publish Ebook Now'}
                     </button>
                  </div>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

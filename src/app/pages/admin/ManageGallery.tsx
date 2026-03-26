import { useState, useEffect } from "react";
import { Search, Loader2, Plus, Trash2, Image as ImageIcon, Camera } from "lucide-react";
import { samajService, GalleryImage } from "../../services/samajService";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";

export function ManageGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form state
  const [isAdding, setIsAdding] = useState(false);
  const [newImage, setNewImage] = useState({
    url: "",
    caption: "",
  });

  useEffect(() => {
    const unsubscribe = samajService.subscribeToGallery((data) => {
      setImages(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await samajService.deleteGalleryImage(deleteId);
      toast.success("Image removed from gallery");
    } catch (err) {
      toast.error("Failed to remove image");
    } finally {
      setDeleteId(null);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await samajService.addGalleryImage(newImage);
      toast.success("Image uploaded to gallery");
      setIsAdding(false);
      setNewImage({ url: "", caption: "" });
    } catch (err) {
      toast.error("Failed to upload image");
    }
  };

  const filteredImages = images.filter(
    (img) =>
      img.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">Visual <span className="text-primary italic">Archive</span> Gallery</h1>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-10 py-4 bg-primary text-white font-black rounded-3xl hover:bg-secondary transition-all text-[10px] tracking-widest uppercase shadow-2xl flex items-center justify-center gap-4 active:scale-95"
        >
          <Plus className="size-4" /> Import Asset
        </button>
      </div>

      <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center gap-4 px-6 py-3 bg-gray-50/50 rounded-full border border-gray-100">
          <Search className="size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search archive captions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none font-bold text-xs italic"
          />
        </div>
      </div>

      {isAdding && (
        <div className="bg-white rounded-[4rem] border-2 border-primary/20 p-12 shadow-bhagva-lg animate-in fade-in slide-in-from-top-6 duration-700 relative overflow-hidden group">
           <div className="absolute top-0 right-0 size-60 bg-primary/5 rounded-bl-[15rem] group-hover:bg-primary/10 transition-all"></div>
           <div className="relative z-10 space-y-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black italic tracking-tighter uppercase text-gray-950">Import <span className="text-primary">Visual Asset</span></h2>
                <button onClick={() => setIsAdding(false)} className="text-[10px] font-black uppercase text-gray-400 hover:text-red-500 transition-colors">Discard Draft</button>
              </div>
              <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-400 italic px-4">Asset Source URL</label>
                  <input required placeholder="Paste image link here..." className="w-full bg-gray-50/50 border border-gray-100 rounded-3xl px-8 py-5 font-bold text-sm italic focus:border-primary/50 transition-all outline-none shadow-sm" value={newImage.url} onChange={e => setNewImage({...newImage, url: e.target.value})} />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-400 italic px-4">Asset Annotation (Caption)</label>
                  <input required placeholder="Enter description..." className="w-full bg-gray-50/50 border border-gray-100 rounded-3xl px-8 py-5 font-bold text-sm italic focus:border-primary/50 transition-all outline-none shadow-sm" value={newImage.caption} onChange={e => setNewImage({...newImage, caption: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full py-6 bg-primary text-white font-black rounded-[2.5rem] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-6 group">
                    Seal & Archive <Camera className="size-5 group-hover:rotate-12 transition-transform" />
                  </button>
                </div>
              </form>
           </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="size-12 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredImages.map((img) => (
            <div key={img.id} className="group aspect-square bg-white rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-bhagva transition-all relative overflow-hidden flex flex-col items-center justify-center cursor-pointer border-8 border-white">
              <img src={img.url} className="absolute inset-0 size-full object-cover group-hover:scale-125 transition-transform duration-[4s]" alt={img.caption} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent p-6 pt-16 translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                <p className="text-[10px] font-black text-white italic tracking-tighter uppercase leading-tight line-clamp-2">{img.caption}</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(img.id!);
                  }}
                  className="mt-4 size-10 bg-red-600 text-white rounded-xl flex items-center justify-center hover:bg-white hover:text-red-600 transition-all shadow-xl active:scale-90"
                >
                  <Trash2 className="size-5" />
                </button>
              </div>
              <div className="absolute top-4 right-4 size-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary transition-all">
                 <ImageIcon className="size-5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredImages.length === 0 && !isLoading && (
        <div className="text-center py-32 bg-gray-50 rounded-[5rem] border-2 border-dashed border-gray-200">
          <div className="size-24 mx-auto bg-white rounded-[2rem] flex items-center justify-center text-gray-100 mb-8 border border-gray-50">
             <Camera className="size-12" />
          </div>
          <p className="text-gray-400 font-black italic uppercase tracking-[0.6em] text-[11px] opacity-30">ARCHIVE IS EMPTY</p>
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-[3rem] border-none shadow-bhagva-lg p-12">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black text-3xl uppercase italic tracking-tighter text-gray-950">Permanent Purge?</AlertDialogTitle>
            <AlertDialogDescription className="font-bold text-gray-500 italic mt-4 text-lg">
              This will remove the visual asset from the Samaj archives forever.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-6 mt-12 flex-col sm:flex-row">
            <AlertDialogCancel className="w-full sm:w-auto px-10 py-5 bg-gray-50 border-none font-black text-xs uppercase tracking-widest rounded-2xl flex-grow">Negative</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="w-full sm:w-auto px-10 py-5 bg-red-600 border-none font-black text-xs uppercase tracking-[0.2em] text-white rounded-2xl shadow-xl shadow-red-500/30 hover:bg-red-700 transition-all flex-grow">Confirm Purge</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

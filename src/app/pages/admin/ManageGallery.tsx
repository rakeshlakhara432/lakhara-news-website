import { useState, useEffect } from "react";
import { Search, Loader2, Plus, Trash2, Image as ImageIcon, Camera, Upload, X } from "lucide-react";
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
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = samajService.subscribeToGallery((data) => {
      setImages(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File is too large (max 2MB for base64 storage)");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImage(prev => ({ ...prev, url: reader.result as string }));
      setIsUploading(false);
      toast.success("Photo ready for archive!");
    };
    reader.readAsDataURL(file);
  };

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
    if (!newImage.url) {
      toast.error("Please select a photo to upload");
      return;
    }
    try {
      await samajService.addGalleryImage(newImage);
      toast.success("Image added to community gallery");
      setIsAdding(false);
      setNewImage({ url: "", caption: "" });
    } catch (err) {
      toast.error("Failed to update gallery");
    }
  };

  const filteredImages = images.filter(
    (img) =>
      img.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">Samaj <span className="text-primary italic">Visual</span> Archive</h1>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-10 py-4 bg-gray-950 text-white font-black rounded-3xl hover:bg-primary transition-all text-[10px] tracking-widest uppercase shadow-2xl flex items-center justify-center gap-4 active:scale-95"
        >
          <Plus className="size-4" /> Add Memory
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
           <div className="absolute top-0 right-0 size-60 bg-primary/5 rounded-bl-[15rem]"></div>
           <div className="relative z-10 space-y-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black italic tracking-tighter uppercase text-gray-950">Add <span className="text-primary">Photo Asset</span></h2>
                <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-red-500 transition-colors uppercase font-black text-[9px] tracking-widest">Close</button>
              </div>
              
              <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-400 italic px-4">Upload Image</label>
                   <div className="relative aspect-video rounded-[2.5rem] bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden hover:border-primary transition-all">
                      {newImage.url ? (
                        <>
                          <img src={newImage.url} className="size-full object-cover" />
                          <button onClick={() => setNewImage({...newImage, url: ""})} className="absolute top-4 right-4 size-10 bg-red-600 text-white rounded-xl flex items-center justify-center shadow-xl"><X className="size-5"/></button>
                        </>
                      ) : (
                        <label className="flex flex-col items-center gap-4 cursor-pointer">
                           <div className="size-16 bg-white rounded-2xl flex items-center justify-center text-gray-300 shadow-inner">
                              {isUploading ? <Loader2 className="size-8 animate-spin" /> : <Upload className="size-8" />}
                           </div>
                           <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">Choose Photo (Max 2MB)</span>
                           <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                      )}
                   </div>
                </div>

                <div className="flex flex-col justify-end space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-400 italic px-4">Caption / Location / Date</label>
                  <input required placeholder="E.g., वार्षिक मिलन 2026..." className="w-full bg-gray-50/50 border border-gray-100 rounded-3xl px-8 py-5 font-bold text-sm italic focus:border-primary transition-all outline-none" value={newImage.caption} onChange={e => setNewImage({...newImage, caption: e.target.value})} />
                  <div className="pt-6">
                    <button type="submit" disabled={!newImage.url || isUploading} className="w-full py-6 bg-primary text-white font-black rounded-[2rem] shadow-xl uppercase text-[10px] tracking-widest flex items-center justify-center gap-4 disabled:opacity-50 hover:bg-secondary transition-all">
                      {isUploading ? "Uploading..." : "Save to Archive"} <Camera className="size-5" />
                    </button>
                  </div>
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
              <img src={img.url} className="absolute inset-0 size-full object-cover group-hover:scale-110 transition-transform duration-[4s]" alt={img.caption} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent p-6 pt-16 translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                <p className="text-[10px] font-black text-white italic tracking-tighter uppercase leading-tight line-clamp-2">{img.caption}</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); setDeleteId(img.id!); }}
                  className="mt-4 size-10 bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white rounded-xl flex items-center justify-center transition-all active:scale-90"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredImages.length === 0 && !isLoading && (
        <div className="text-center py-32 bg-gray-50 rounded-[5rem] border-2 border-dashed border-gray-200">
          <Camera className="size-12 mx-auto text-gray-200 mb-6" />
          <p className="text-gray-400 font-black italic uppercase tracking-widest text-[9px]">The Visual Archive is currently empty</p>
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-[3rem] border-none shadow-bhagva-lg p-12">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black text-2xl uppercase italic tracking-tighter text-gray-950 underline decoration-primary/20">Purge Memory?</AlertDialogTitle>
            <AlertDialogDescription className="font-bold text-gray-400 italic mt-4">
              This image will be permanently removed from the Samaj digital archives.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-6 mt-12">
            <AlertDialogCancel className="px-10 py-5 bg-gray-50 border-none font-black text-[9px] uppercase tracking-widest rounded-2xl">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="px-10 py-5 bg-red-600 border-none font-black text-[9px] uppercase tracking-widest text-white rounded-2xl shadow-xl hover:bg-red-700 transition-all">Confirm Purge</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

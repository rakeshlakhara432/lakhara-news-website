import { useState, useEffect } from "react";
import { Search, Loader2, Plus, Trash2, Camera, Upload, X } from "lucide-react";
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
    <div className="space-y-6 animate-in fade-in duration-700 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 leading-none">Samaj <span className="text-orange-600">Visual Archive</span></h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors text-xs flex items-center justify-center gap-2"
        >
          <Plus className="size-4" /> {isAdding ? "Cancel" : "Add Memory"}
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 transition-all">
          <Search className="size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search archive captions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none font-medium text-sm text-slate-800"
          />
        </div>
      </div>

      {isAdding && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">Add <span className="text-orange-600">Photo Asset</span></h2>
              </div>
              
              <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-slate-700 ml-1">Upload Image (Max 2MB)</label>
                   <div className="relative aspect-video rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden hover:border-orange-500 transition-colors">
                      {newImage.url ? (
                        <>
                          <img src={newImage.url} className="size-full object-cover" />
                          <button onClick={() => setNewImage({...newImage, url: ""})} className="absolute top-2 right-2 size-8 bg-rose-600 text-white rounded-lg flex items-center justify-center shadow-sm hover:bg-rose-500 transition-colors"><X className="size-4"/></button>
                        </>
                      ) : (
                        <label className="flex flex-col items-center justify-center size-full cursor-pointer group">
                           <div className="size-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm group-hover:text-orange-600 group-hover:border-orange-200 mb-3 transition-colors">
                              {isUploading ? <Loader2 className="size-6 animate-spin" /> : <Upload className="size-6" />}
                           </div>
                           <span className="text-xs font-semibold text-slate-500">Click to Select</span>
                           <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                      )}
                   </div>
                </div>

                <div className="flex flex-col justify-end space-y-4">
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-slate-700 ml-1">Caption / Details</label>
                     <input required placeholder="E.g., वार्षिक मिलन 2026..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-sm text-slate-800 focus:border-orange-500 outline-none transition-all" value={newImage.caption} onChange={e => setNewImage({...newImage, caption: e.target.value})} />
                  </div>
                  <div className="pt-2">
                    <button type="submit" disabled={!newImage.url || isUploading} className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-sm text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-colors">
                      {isUploading ? "Uploading..." : "Save to Archive"} <Camera className="size-4" />
                    </button>
                  </div>
                </div>
              </form>
           </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-8 text-orange-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div key={img.id} className="group aspect-square bg-slate-100 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col items-center justify-center cursor-pointer">
              <img src={img.url} className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500" alt={img.caption} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-4 pt-12 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs font-bold text-white line-clamp-2">{img.caption}</p>
                <div className="flex justify-end mt-2">
                   <button 
                     onClick={(e) => { e.stopPropagation(); setDeleteId(img.id!); }}
                     className="size-8 bg-rose-600 text-white rounded-lg flex items-center justify-center transition-colors hover:bg-rose-500"
                   >
                     <Trash2 className="size-4" />
                   </button>
                </div>
              </div>
            </div>
          ))}
          {filteredImages.length === 0 && (
             <div className="col-span-full py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300 text-center">
                <p className="text-slate-500 font-medium text-sm">Visual Archive is currently empty.</p>
             </div>
          )}
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-3xl border-slate-200 p-6 sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold text-xl text-slate-800">Purge Memory?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 text-sm mt-2">
              This image will be permanently removed from the Samaj digital archives.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-6">
            <AlertDialogCancel className="rounded-xl border-slate-200 bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 hover:text-slate-900 m-0">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="rounded-xl border-none bg-rose-600 hover:bg-rose-700 text-white font-bold m-0 shadow-sm">Confirm Purge</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

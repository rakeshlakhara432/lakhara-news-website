import { useState, useEffect } from "react";
import { Search, Loader2, Plus, Trash2, Camera, X, ImageIcon, Calendar, FileText, ChevronRight, Edit2 } from "lucide-react";
import { samajService, GalleryAlbum } from "../../services/samajService";
import { toast } from "sonner";
import { MultiFileUpload } from "../../components/ui/MultiFileUpload";
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
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteImageInfo, setDeleteImageInfo] = useState<{ albumId: string; imageUrl: string } | null>(null);

  // Form state
  const [isAdding, setIsAdding] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<GalleryAlbum | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split('T')[0],
    description: "",
    images: [] as string[],
  });

  useEffect(() => {
    const unsubscribe = samajService.subscribeToGalleryAlbums((data) => {
      setAlbums(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDeleteAlbum = async () => {
    if (!deleteId) return;
    try {
      await samajService.deleteGalleryAlbum(deleteId);
      toast.success("Album deleted successfully");
    } catch (err) {
      toast.error("Failed to delete album");
    } finally {
      setDeleteId(null);
    }
  };

  const handleDeleteImage = async () => {
    if (!deleteImageInfo) return;
    const { albumId, imageUrl } = deleteImageInfo;
    const album = albums.find(a => a.id === albumId);
    if (!album) return;

    try {
      const updatedImages = album.images.filter(img => img !== imageUrl);
      await samajService.updateGalleryAlbum(albumId, { images: updatedImages });
      toast.success("Image removed from album");
    } catch (err) {
      toast.error("Failed to remove image");
    } finally {
      setDeleteImageInfo(null);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      if (editingAlbum) {
        await samajService.updateGalleryAlbum(editingAlbum.id!, {
          ...formData,
          coverImage: formData.images[0]
        });
        toast.success("Album updated successfully");
      } else {
        await samajService.addGalleryAlbum({
          ...formData,
          coverImage: formData.images[0]
        });
        toast.success("New gallery event created");
      }
      resetForm();
    } catch (err) {
      toast.error("Failed to save album");
    }
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingAlbum(null);
    setFormData({
      title: "",
      date: new Date().toISOString().split('T')[0],
      description: "",
      images: [],
    });
  };

  const startEdit = (album: GalleryAlbum) => {
    setEditingAlbum(album);
    setFormData({
      title: album.title,
      date: album.date,
      description: album.description || "",
      images: album.images,
    });
    setIsAdding(true);
  };

  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 leading-none">
            Event <span className="text-orange-600">Gallery</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Manage event-based photo albums</p>
        </div>
        <button 
          onClick={() => isAdding ? resetForm() : setIsAdding(true)}
          className={`px-6 py-2.5 font-bold rounded-xl transition-all text-xs flex items-center justify-center gap-2 shadow-sm
            ${isAdding ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-slate-900 text-white hover:bg-orange-600"}`}
        >
          {isAdding ? <X className="size-4" /> : <Plus className="size-4" />} 
          {isAdding ? "Cancel" : "Create New Event"}
        </button>
      </div>

      {!isAdding && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="flex-grow flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-orange-500 transition-all">
            <Search className="size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search events by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none font-medium text-sm text-slate-800"
            />
          </div>
        </div>
      )}

      {isAdding && (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
           <form onSubmit={handleAddSubmit} className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">
                  {editingAlbum ? "Edit" : "Create"} <span className="text-orange-600">Gallery Event</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider flex items-center gap-2">
                       <FileText className="size-3 text-orange-600" /> Event Title
                    </label>
                    <input 
                      required 
                      placeholder="E.g., वार्षिक मिलन समारोह 2026" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-sm text-slate-800 focus:border-orange-500 outline-none transition-all" 
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})} 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider flex items-center gap-2">
                       <Calendar className="size-3 text-orange-600" /> Event Date
                    </label>
                    <input 
                      required 
                      type="date"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-sm text-slate-800 focus:border-orange-500 outline-none transition-all" 
                      value={formData.date} 
                      onChange={e => setFormData({...formData, date: e.target.value})} 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Description (Optional)</label>
                    <textarea 
                      placeholder="About the event..." 
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-sm text-slate-800 focus:border-orange-500 outline-none transition-all resize-none" 
                      value={formData.description} 
                      onChange={e => setFormData({...formData, description: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <MultiFileUpload 
                    path="gallery/albums"
                    label="Upload Event Photos"
                    onUploadComplete={(urls) => setFormData(prev => ({ ...prev, images: urls }))}
                    maxFiles={20}
                  />
                  {editingAlbum && (
                    <p className="text-[10px] text-slate-400 mt-2 italic px-2">
                      * Uploading new photos will replace the current set. To keep current photos, do not upload new ones.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="px-8 py-3.5 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm transition-colors hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={formData.images.length === 0}
                  className="px-10 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-600/20 text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                >
                  {editingAlbum ? "Update Gallery Event" : "Create Gallery Event"} <ChevronRight className="size-4" />
                </button>
              </div>
           </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-8 text-orange-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlbums.map((album) => (
            <div key={album.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-500">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img src={album.coverImage || album.images[0]} className="size-full object-cover group-hover:scale-105 transition-transform duration-700" alt={album.title} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                   <div className="flex items-center gap-2 text-white/80 mb-1">
                      <Calendar className="size-3" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{new Date(album.date).toLocaleDateString()}</span>
                   </div>
                   <h3 className="text-white font-bold leading-tight">{album.title}</h3>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                   <button 
                     onClick={() => startEdit(album)}
                     className="size-9 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center transition-all hover:bg-orange-600 border border-white/20"
                   >
                     <Edit2 className="size-4" />
                   </button>
                   <button 
                     onClick={() => setDeleteId(album.id!)}
                     className="size-9 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center transition-all hover:bg-rose-600 border border-white/20"
                   >
                     <Trash2 className="size-4" />
                   </button>
                </div>
                <div className="absolute top-4 left-4 size-9 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center border border-white/20">
                  <ImageIcon className="size-4" />
                  <span className="absolute -top-1 -right-1 size-4 bg-orange-600 text-[8px] font-black flex items-center justify-center rounded-full border border-white">{album.images.length}</span>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-slate-500 text-xs line-clamp-2 italic mb-4 flex-grow">
                  {album.description || "No description provided for this collection."}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                    {album.images.slice(0, 4).map((url, i) => (
                      <div key={i} className="size-10 rounded-lg overflow-hidden border border-slate-100 group/img relative">
                        <img src={url} className="size-full object-cover" alt="" />
                        <button 
                          onClick={() => setDeleteImageInfo({ albumId: album.id!, imageUrl: url })}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-opacity"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    ))}
                    {album.images.length > 4 && (
                      <div className="size-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        +{album.images.length - 4}
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredAlbums.length === 0 && (
             <div className="col-span-full py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
                <Camera className="size-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Your Visual Archive is empty.</p>
                <button 
                  onClick={() => setIsAdding(true)}
                  className="mt-6 px-8 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 hover:border-orange-500 transition-colors"
                >
                  Create Your First Collection
                </button>
             </div>
          )}
        </div>
      )}

      {/* Delete Album Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-3xl border-slate-200 p-6 sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold text-xl text-slate-800">Delete Collection?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 text-sm mt-2">
              All images within this event collection will be removed from the gallery view. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-6">
            <AlertDialogCancel className="rounded-xl border-slate-200 bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 hover:text-slate-900 m-0">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAlbum} className="rounded-xl border-none bg-rose-600 hover:bg-rose-700 text-white font-bold m-0 shadow-sm">Delete Collection</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Single Image Dialog */}
      <AlertDialog open={deleteImageInfo !== null} onOpenChange={() => setDeleteImageInfo(null)}>
        <AlertDialogContent className="rounded-3xl border-slate-200 p-6 sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold text-xl text-slate-800">Remove Photo?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 text-sm mt-2">
              Are you sure you want to remove this specific photo from the collection?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-6">
            <AlertDialogCancel className="rounded-xl border-slate-200 bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 hover:text-slate-900 m-0">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteImage} className="rounded-xl border-none bg-rose-600 hover:bg-rose-700 text-white font-bold m-0 shadow-sm">Remove Photo</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

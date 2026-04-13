import React, { useState, useRef } from "react";
import { Upload, X, Loader2, Camera, Image as ImageIcon, Plus } from "lucide-react";
import { uploadFile } from "../../utils/storage";
import { toast } from "sonner";

interface MultiFileUploadProps {
  onUploadComplete: (urls: string[]) => void;
  path: string;
  label?: string;
  accept?: string;
  maxFiles?: number;
  className?: string;
}

export function MultiFileUpload({ 
  onUploadComplete, 
  path, 
  label = "Upload Images", 
  accept = "image/*", 
  maxFiles = 20,
  className = ""
}: MultiFileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState<{ file: File; preview: string; status: 'waiting' | 'uploading' | 'done' | 'error'; url?: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (previews.length + files.length > maxFiles) {
      toast.error(`You can only upload up to ${maxFiles} images`);
      return;
    }

    const newPreviews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'waiting' as const
    }));

    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const startUpload = async () => {
    if (previews.length === 0) return;
    
    setIsUploading(true);
    const updatedPreviews = [...previews];
    const uploadedUrls: string[] = [];

    for (let i = 0; i < updatedPreviews.length; i++) {
      if (updatedPreviews[i].status === 'done') {
        if (updatedPreviews[i].url) uploadedUrls.push(updatedPreviews[i].url!);
        continue;
      }

      try {
        updatedPreviews[i].status = 'uploading';
        setPreviews([...updatedPreviews]);
        
        const url = await uploadFile(updatedPreviews[i].file, path);
        updatedPreviews[i].url = url;
        updatedPreviews[i].status = 'done';
        uploadedUrls.push(url);
        setPreviews([...updatedPreviews]);
      } catch (error) {
        updatedPreviews[i].status = 'error';
        setPreviews([...updatedPreviews]);
        toast.error(`Failed to upload ${updatedPreviews[i].file.name}`);
      }
    }

    setIsUploading(false);
    onUploadComplete(uploadedUrls);
    if (uploadedUrls.length === previews.length) {
      toast.success("All images uploaded successfully!");
    } else {
      toast.warning(`${uploadedUrls.length} of ${previews.length} images uploaded.`);
    }
  };

  const removeFile = (index: number) => {
    setPreviews(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const clearAll = () => {
    previews.forEach(p => URL.revokeObjectURL(p.preview));
    setPreviews([]);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        {label && <label className="text-xs font-bold text-slate-700 ml-1">{label}</label>}
        {previews.length > 0 && !isUploading && (
          <button 
            type="button"
            onClick={clearAll}
            className="text-[10px] font-bold text-rose-600 hover:text-rose-700 uppercase tracking-widest"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div 
        className={`relative group border-2 border-dashed rounded-3xl transition-all flex flex-col items-center justify-center min-h-[200px] p-6
          ${isUploading ? 'bg-slate-50 border-orange-200 cursor-not-allowed' : 'bg-slate-50 border-slate-200 hover:border-orange-500 hover:bg-white cursor-pointer'}`}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        {previews.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="size-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-orange-600 group-hover:border-orange-200 mb-4 transition-colors shadow-sm">
              <Upload className="size-8" />
            </div>
            <p className="text-sm font-bold text-slate-800">Drag & Drop or Click to Upload</p>
            <p className="text-xs text-slate-400 mt-1">Select up to {maxFiles} images (JPG, PNG, WEBP)</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 w-full" onClick={e => e.stopPropagation()}>
            {previews.map((item, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white group/item">
                <img src={item.preview} className="size-full object-cover" alt="Preview" />
                
                {item.status === 'uploading' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Loader2 className="size-6 text-white animate-spin" />
                  </div>
                )}
                
                {item.status === 'done' && (
                  <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                    <div className="size-6 bg-green-500 text-white rounded-full flex items-center justify-center">
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}

                {!isUploading && (
                  <button 
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 size-6 bg-rose-600 text-white rounded-lg flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity"
                  >
                    <X className="size-3" />
                  </button>
                )}
              </div>
            ))}
            
            {!isUploading && previews.length < maxFiles && (
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-1 text-slate-400 hover:border-orange-500 hover:text-orange-600 hover:bg-slate-50 transition-all"
              >
                <Plus className="size-6" />
                <span className="text-[10px] font-bold">Add More</span>
              </button>
            )}
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          multiple
          className="hidden" 
        />
      </div>

      {previews.length > 0 && !isUploading && (
        <button
          type="button"
          onClick={startUpload}
          className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl shadow-lg shadow-orange-600/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <ImageIcon className="size-5" /> Start Upload ({previews.length} Images)
        </button>
      )}

      {isUploading && (
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-orange-600 h-full transition-all duration-500" 
            style={{ width: `${(previews.filter(p => p.status === 'done').length / previews.length) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

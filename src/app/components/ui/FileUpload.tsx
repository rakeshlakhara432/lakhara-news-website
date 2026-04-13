import React, { useState, useRef } from "react";
import { Upload, X, Loader2, Camera, FileText } from "lucide-react";
import { uploadFile } from "../../utils/storage";
import { toast } from "sonner";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  path: string;
  label?: string;
  accept?: string;
  previewUrl?: string;
  className?: string;
  type?: "image" | "pdf";
}

export function FileUpload({ 
  onUploadComplete, 
  path, 
  label = "Upload File", 
  accept = "image/*", 
  previewUrl, 
  className = "",
  type = "image"
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (type === "image" && !file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (type === "pdf" && file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("File size should be less than 10MB");
      return;
    }

    // Local preview for images
    if (type === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    setIsUploading(true);
    try {
      const url = await uploadFile(file, path);
      onUploadComplete(url);
      toast.success(`${type === "image" ? "Image" : "PDF"} uploaded successfully!`);
    } catch (error) {
      toast.error("Upload failed. Please try again.");
      console.error(error);
      setPreview(previewUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onUploadComplete("");
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="text-xs font-bold text-slate-700 ml-1">{label}</label>}
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl transition-all flex flex-col items-center justify-center overflow-hidden
          ${isUploading ? 'bg-slate-50 border-orange-200' : 'bg-slate-50 border-slate-200 hover:border-orange-500 hover:bg-white'}
          ${type === 'image' ? 'aspect-video' : 'h-32'}`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="size-8 text-orange-600 animate-spin" />
            <span className="text-xs font-medium text-slate-500">Uploading...</span>
          </div>
        ) : preview ? (
          <>
            <img src={preview} className="size-full object-cover" alt="Preview" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="size-8 text-white" />
            </div>
            <button 
              onClick={removeFile}
              className="absolute top-2 right-2 size-8 bg-rose-600 text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-rose-500 transition-colors z-10"
            >
              <X className="size-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="size-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-orange-600 group-hover:border-orange-200 mb-3 transition-colors shadow-sm">
              {type === 'image' ? <Upload className="size-6" /> : <FileText className="size-6" />}
            </div>
            <p className="text-xs font-bold text-slate-700">Click to upload {type}</p>
            <p className="text-[10px] text-slate-400 mt-1">Maximum file size: 10MB</p>
          </div>
        )}
        
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden" 
        />
      </div>
    </div>
  );
}

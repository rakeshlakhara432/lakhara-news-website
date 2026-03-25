/**
 * UploadPage.tsx
 * Midnight Aurora Edition: High-Performance Data Ingestion Terminal
 */

import { useState, useRef } from "react";
import {
  Upload, X, Loader2, Plus, Film, Camera, Newspaper, Zap, Cpu, Shield, Hash,
} from "lucide-react";
import { videoService } from "../services/videoService";
import { uploadPhoto, uploadNews } from "../services/uploadService";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

// ── Constants ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "पॉलिटिक्स", "स्पोर्ट्स", "बी-टाउन", "मार्केट", "साइबर", "लाइफ", "ग्लोबल",
];
const MAX_VIDEO_MB = 100;
const MAX_IMAGE_MB = 20;
const ACCEPTED_VIDEO = ["video/mp4", "video/webm", "video/ogg"];

type UploadMode = "video" | "photo" | "news";

const TABS: { mode: UploadMode; label: string; icon: any; desc: string }[] = [
  { mode: "video", label: "REEL / VIDEO", icon: Film, desc: "MP4 • 100MB LIMIT" },
  { mode: "photo", label: "VISUAL / PHOTO", icon: Camera, desc: "RAW-COMPRESSED • 20MB" },
  { mode: "news", label: "INTEL / NEWS", icon: Newspaper, desc: "ENCODED TEXT • MEDIA" },
];

export function UploadPage() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<UploadMode>("video");

  if (!user) return <LoginPrompt />;

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl pb-32">
      {/* 🚀 HEADER: COMMAND CENTER */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex relative">
           <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
           <div className="relative size-20 bg-[#0B0E14] border border-white/10 rounded-[2rem] flex items-center justify-center text-primary shadow-2xl">
             <Cpu className="size-10 animate-pulse" />
           </div>
        </div>
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Content Ingestion</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Secure Data Stream • Node.Lakhara</p>
        </div>
      </div>

      {/* 🚀 MODE SELECTOR: CARBON TABS */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = mode === tab.mode;
          return (
            <button
              key={tab.mode}
              onClick={() => setMode(tab.mode)}
              className={`relative group flex flex-col items-center gap-3 p-6 rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                isActive 
                  ? "bg-white/[0.03] border-primary/50 text-white" 
                  : "bg-black/20 border-white/5 text-slate-500 hover:border-white/10 hover:bg-white/[0.01]"
              }`}
            >
              {isActive && (
                <motion.div layoutId="tab-glow" className="absolute inset-0 bg-primary/5 blur-xl" />
              )}
              <div className={`p-3 rounded-2xl transition-all duration-500 ${isActive ? "bg-primary text-black" : "bg-white/5"}`}>
                 <Icon className="size-5" />
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black italic tracking-widest uppercase mb-1">{tab.label}</p>
                <p className="text-[8px] font-bold opacity-40 uppercase tracking-tighter">{tab.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 🚀 FORM CONTAINER */}
      <AnimatePresence mode="wait">
        <motion.div
           key={mode}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           className="bg-[#0B0E14]/80 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
          
          {mode === "video" && <VideoUploadForm user={user} userData={userData} navigate={navigate} />}
          {mode === "photo" && <PhotoUploadForm user={user} userData={userData} navigate={navigate} />}
          {mode === "news"  && <NewsUploadForm  user={user} userData={userData} navigate={navigate} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Sub-Forms ───────────────────────────────────────────────────────────────

function VideoUploadForm({ user, userData, navigate }: any) {
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [category, setCategory] = useState(CATEGORIES[1]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const processVideoFile = (file: File) => {
    if (!ACCEPTED_VIDEO.includes(file.type)) { toast.error("Unsupported Format"); return; }
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) { toast.error("Exceeds 100MB"); return; }
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const addHashtag = () => {
    const tag = hashtagInput.trim().replace(/^#/, "");
    if (tag && !hashtags.includes(tag)) {
      setHashtags([...hashtags, tag]); setHashtagInput("");
    }
  };

  const handleUpload = async () => {
    if (!videoFile || !title.trim()) { toast.error("Intel Incomplete"); return; }
    setUploading(true);
    try {
      await videoService.uploadVideo(videoFile, null, {
        title: title.trim(), caption: caption.trim(), hashtags, category,
        authorId: user.uid,
        authorName: userData?.name || user.displayName || "Node-01",
        authorPhotoURL: userData?.photoURL || user.photoURL || "",
      }, setProgress);
      toast.success("Stream Live"); navigate("/reels");
    } catch { toast.error("Stream Failed"); } finally { setUploading(false); }
  };

  return (
    <div className="space-y-8 relative z-10">
      {!videoFile ? (
        <DropZone onClick={() => videoInputRef.current?.click()} icon={<Film className="size-12 text-primary" />} title="INITIALIZE STREAM" subtitle="DROP MP4 OR CLICK TO BROWSE">
          <input ref={videoInputRef} type="file" accept="video/*" className="hidden" 
            onChange={(e) => e.target.files?.[0] && processVideoFile(e.target.files[0])} />
        </DropZone>
      ) : (
        <div className="space-y-6">
           <div className="relative rounded-[2rem] overflow-hidden bg-black aspect-video border border-white/10">
              <video src={videoPreview!} className="w-full h-full object-cover opacity-60" muted loop autoPlay />
              <button onClick={() => setVideoFile(null)} className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white hover:text-primary transition-all">
                <X className="size-4" />
              </button>
           </div>
           <FormField label="Intel Title">
              <input value={title} onChange={e => setTitle(e.target.value)} className="meta-input" placeholder="Encryption Key Required..." />
           </FormField>
           <FormField label="Data Summary">
              <textarea value={caption} onChange={e => setCaption(e.target.value)} className="meta-input h-24 resize-none" placeholder="Context details..." />
           </FormField>
           <HashtagInput value={hashtagInput} onChange={setHashtagInput} hashtags={hashtags} onAdd={addHashtag} onRemove={tag => setHashtags(hashtags.filter(h => h !== tag))} />
           <CategoryPicker categories={CATEGORIES} selected={category} onSelect={setCategory} />
        </div>
      )}
      {uploading && <UploadProgressBar progress={progress} />}
      <PublishButton onClick={handleUpload} loading={uploading} label="EXECUTE UPLOAD" disabled={!videoFile || uploading} />
    </div>
  );
}

function PhotoUploadForm({ user, userData, navigate }: any) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFile = (f: File) => {
    setFile(f); setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file || !title.trim()) return;
    setUploading(true);
    try {
      await uploadPhoto(file, {
        title: title.trim(), caption: "", hashtags: [], category,
        authorId: user.uid, authorName: userData?.name || "Node-01", authorPhotoURL: "",
      }, setProgress);
      navigate("/explore");
    } catch { toast.error("Upload Error"); } finally { setUploading(false); }
  };

  return (
    <div className="space-y-8 relative z-10">
       {!file ? (
        <DropZone onClick={() => inputRef.current?.click()} icon={<Camera className="size-12 text-primary" />} title="VISUAL INPUT" subtitle="IMAGE • PNG • WEBP" >
           <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </DropZone>
       ) : (
         <div className="space-y-6">
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 aspect-video">
               <img src={preview!} className="w-full h-full object-cover opacity-60" />
               <button onClick={() => setFile(null)} className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white hover:text-primary transition-all">
                <X className="size-4" />
              </button>
            </div>
            <FormField label="Visual Label">
               <input value={title} onChange={e => setTitle(e.target.value)} className="meta-input" />
            </FormField>
            <CategoryPicker categories={CATEGORIES} selected={category} onSelect={setCategory} />
         </div>
       )}
       {uploading && <UploadProgressBar progress={progress} />}
       <PublishButton onClick={handleUpload} loading={uploading} label="COMMIT VISUAL" disabled={!file || uploading} />
    </div>
  );
}

function NewsUploadForm({ user, userData, navigate }: any) {
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!headline.trim() || !body.trim()) return;
    setUploading(true);
    try {
      await uploadNews(null, {
        headline: headline.trim(), summary: headline.substring(0, 100), body,
        source: "Lakhara Node", tags: [], category, isBreaking: false,
        authorId: user.uid, authorName: userData?.name || "Node-01", authorPhotoURL: "",
      }, setProgress);
      navigate("/");
    } catch { toast.error("Write Error"); } finally { setUploading(false); }
  };

  return (
    <div className="space-y-8 relative z-10">
       <FormField label="Secure Headline">
          <input value={headline} onChange={e => setHeadline(e.target.value)} className="meta-input text-xl" placeholder="Top Secret Protocol..." />
       </FormField>
       <FormField label="Intel Body (UTF-8)">
          <textarea value={body} onChange={e => setBody(e.target.value)} className="meta-input h-64 resize-none leading-relaxed" placeholder="Encoded data stream..." />
       </FormField>
       <CategoryPicker categories={CATEGORIES} selected={category} onSelect={setCategory} />
       {uploading && <UploadProgressBar progress={progress} />}
       <PublishButton onClick={handleUpload} loading={uploading} label="TRANSMIT INTEL" disabled={!headline || uploading} />
    </div>
  );
}

// ── Components ─────────────────────────────────────────────────────────────

function FormField({ label, children }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-2">{label}</label>
      {children}
    </div>
  );
}

function DropZone({ onClick, icon, title, subtitle, children }: any) {
  return (
    <div onClick={onClick} className="relative aspect-video rounded-[3rem] border-2 border-dashed border-white/5 bg-white/[0.02] flex flex-col items-center justify-center cursor-pointer group hover:bg-primary/[0.03] hover:border-primary/20 transition-all duration-500">
      {children}
      <div className="size-24 rounded-[2rem] bg-[#0B0E14] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 shadow-2xl">
        {icon}
      </div>
      <p className="text-xl font-black text-white italic tracking-tighter uppercase mb-1">{title}</p>
      <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{subtitle}</p>
    </div>
  );
}

function CategoryPicker({ categories, selected, onSelect }: any) {
  return (
    <FormField label="Sector Classification">
       <div className="flex flex-wrap gap-2">
          {categories.map((cat: string) => (
            <button key={cat} onClick={() => onSelect(cat)} className={`px-4 py-2 rounded-full text-[10px] font-black italic tracking-widest uppercase transition-all ${selected === cat ? "bg-primary text-black" : "bg-white/5 text-slate-500 hover:bg-white/10"}`}>
               {cat}
            </button>
          ))}
       </div>
    </FormField>
  );
}

function HashtagInput({ value, onChange, hashtags, onAdd, onRemove }: any) {
  return (
    <FormField label="Global Tags">
       <div className="flex gap-2 mb-3">
          <input value={value} onChange={e => onChange(e.target.value)} onKeyDown={e => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onAdd())} className="meta-input flex-1" placeholder="#tag..." />
          <button onClick={onAdd} className="size-12 bg-white/5 text-primary border border-white/5 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-black transition-all">
             <Plus className="size-5" />
          </button>
       </div>
       <div className="flex flex-wrap gap-2">
          {hashtags.map((h: string) => (
            <span key={h} className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[10px] font-black italic uppercase tracking-widest">
               #{h} <X className="size-3 cursor-pointer" onClick={() => onRemove(h)} />
            </span>
          ))}
       </div>
    </FormField>
  );
}

function UploadProgressBar({ progress }: { progress: number }) {
  return (
    <div className="space-y-3 bg-black/40 p-6 rounded-[2rem] border border-white/5">
       <div className="flex items-center justify-between">
          <p className="text-[10px] font-black text-white italic tracking-widest uppercase">Transcribing Data Feed</p>
          <p className="text-[10px] font-black text-primary italic tracking-widest">{Math.round(progress)}%</p>
       </div>
       <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-primary shadow-[0_0_20px_rgba(0,242,255,0.5)]" />
       </div>
    </div>
  );
}

function PublishButton({ onClick, loading, label, disabled }: any) {
  return (
    <button onClick={onClick} disabled={disabled} className="group relative w-full py-6 bg-primary overflow-hidden rounded-[2rem] font-black italic tracking-tighter text-xl text-black hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-30 disabled:grayscale">
       <div className="relative z-10 flex items-center justify-center gap-3">
          {loading ? <Loader2 className="size-6 animate-spin" /> : <Zap className="size-6" />}
          {loading ? "PROCESSING..." : label}
       </div>
       <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
    </button>
  );
}

function LoginPrompt() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
      <div className="relative">
         <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse"></div>
         <Shield className="size-24 text-primary relative" />
      </div>
      <div className="text-center space-y-2">
         <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase underline decoration-primary decoration-4 underline-offset-8">Access Denied</h2>
         <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Authentication token missing or expired.</p>
      </div>
      <button onClick={() => navigate("/profile")} className="px-12 py-4 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black italic tracking-widest uppercase hover:bg-primary hover:text-black transition-all">
         Initialize Login →
      </button>
    </div>
  );
}

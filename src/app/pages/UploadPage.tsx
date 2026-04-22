import { useState, useRef } from "react";
import {
  Upload, X, Loader2, Film, Camera, Newspaper, Zap, Shield, Send, ChevronRight,
  LucideIcon
} from "lucide-react";
import { videoService } from "../services/videoService";
import { uploadPhoto, uploadNews } from "../services/uploadService";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { User } from "firebase/auth";
import { handleError } from "../utils/errorHandler";

const CATEGORIES = [
  "पॉलिटिक्स", "स्पोर्ट्स", "बी-टाउन", "मार्केट", "साइबर", "लाइफ", "ग्लोबल",
];
const MAX_VIDEO_MB = 100;
const ACCEPTED_VIDEO = ["video/mp4", "video/webm", "video/ogg"];

type UploadMode = "video" | "photo" | "news";

interface TabItem {
  mode: UploadMode;
  label: string;
  icon: LucideIcon;
  desc: string;
}

const TABS: TabItem[] = [
  { mode: "news", label: "समाचार / न्यूज़", icon: Newspaper, desc: "TEXT • MEDIA" },
  { mode: "video", label: "वीडियो / रील", icon: Film, desc: "MP4 • 100MB" },
  { mode: "photo", label: "फोटो / दृश्य", icon: Camera, desc: "IMAGE • 20MB" },
];

interface FormProps {
  user: User;
  userData: any;
  navigate: (path: string) => void;
}

export function UploadPage() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<UploadMode>("news");

  if (!user) return <LoginPrompt />;

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl pb-32">
      
      {/* 🚀 HEADER */}
      <section className="text-center space-y-8 mb-16 border-b-8 border-primary pb-12">
         <div className="size-20 mx-auto bg-primary text-white flex items-center justify-center border-4 border-gray-900">
            <Upload className="size-10" />
         </div>
         <div className="space-y-1">
            <h1 className="text-4xl font-black text-gray-950 tracking-tighter uppercase leading-none">सामग्री <span className="text-primary">अपलोड</span></h1>
            <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest italic">CONTENT MANAGEMENT TERMINAL</p>
         </div>
      </section>

      {/* 🚀 TAB SELECTOR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-12 border-4 border-gray-950 p-2 bg-white">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = mode === tab.mode;
          return (
            <button
              key={tab.mode}
              onClick={() => setMode(tab.mode)}
              className={`flex items-center gap-4 p-6 transition-colors border-2 ${
                isActive 
                  ? "bg-primary border-primary text-white" 
                  : "bg-white border-transparent text-gray-400 hover:bg-gray-50"
              }`}
            >
              <Icon className="size-8" />
              <div className="text-left">
                <p className="text-[11px] font-black uppercase tracking-widest leading-none mb-1">{tab.label}</p>
                <p className={`text-[9px] font-bold uppercase tracking-tighter ${isActive ? 'text-white/70' : 'text-gray-300'}`}>{tab.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 🚀 FORM CONTAINER */}
      <div className="bg-white border-4 border-gray-950 p-8 md:p-16 relative overflow-hidden">
        {mode === "video" && <VideoUploadForm user={user!} userData={userData} navigate={navigate} />}
        {mode === "photo" && <PhotoUploadForm user={user!} userData={userData} navigate={navigate} />}
        {mode === "news"  && <NewsUploadForm  user={user!} userData={userData} navigate={navigate} />}
      </div>
    </div>
  );
}

// ── Sub-Forms ───────────────────────────────────────────────────────────────

function NewsUploadForm({ user, userData, navigate }: FormProps) {
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!headline.trim() || !body.trim()) { toast.error("कृपया सभी जानकारी भरें"); return; }
    setUploading(true);
    try {
      await uploadNews(null, {
        headline: headline.trim(), summary: headline.substring(0, 100), body,
        source: "LAKHARA NEWS", tags: [], category, isBreaking: false,
        authorId: user.uid, authorName: userData?.name || user.displayName || "Admin", authorPhotoURL: "",
      }, setProgress);
      toast.success("समाचार प्रकाशित हुआ!");
      navigate("/");
    } catch (error) { 
      handleError(error, "समाचार प्रकाशित करने में त्रुटि"); 
    } finally { setUploading(false); }
  };

  return (
    <div className="space-y-10">
       <FormField label="समाचार मुख्य शीर्षक (HEADLINE)">
          <input value={headline} onChange={e => setHeadline(e.target.value)} className="bhagva-input text-2xl" placeholder="यहाँ शीर्षक लिखें..." />
       </FormField>
       <FormField label="समाचार विवरण (CONTENT BODY)">
          <textarea value={body} onChange={e => setBody(e.target.value)} className="bhagva-input h-80 resize-none leading-relaxed text-xl" placeholder="यहाँ समाचार का विस्तृत विवरण दर्ज करें..." />
       </FormField>
       <CategoryPicker categories={CATEGORIES} selected={category} onSelect={setCategory} />
       {uploading && <ProgressBar progress={progress} />}
       <button onClick={handleUpload} disabled={uploading} className="w-full py-8 bg-primary text-white font-black text-xl tracking-widest uppercase hover:bg-gray-950 transition-colors flex items-center justify-center gap-4 border-none outline-none disabled:opacity-50">
          {uploading ? <Loader2 className="size-8 animate-spin" /> : <Send className="size-8" />}
          {uploading ? "प्रकाशित हो रहा है..." : "समाचार प्रकाशित करें"}
       </button>
    </div>
  );
}

function VideoUploadForm({ user, userData, navigate }: FormProps) {
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[1]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const processVideoFile = (file: File) => {
    if (!ACCEPTED_VIDEO.includes(file.type)) { toast.error("अमान्य प्रारूप"); return; }
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) { toast.error("Size Limit Exceeds 100MB"); return; }
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!videoFile || !title.trim()) { toast.error("कृपया शीर्षक और वीडियो प्रदान करें"); return; }
    setUploading(true);
    try {
      await videoService.uploadVideo(videoFile, null, {
        title: title.trim(), caption: "", hashtags: [], category,
        authorId: user.uid,
        authorName: userData?.name || user.displayName || "Admin",
        authorPhotoURL: userData?.photoURL || user.photoURL || "",
      }, setProgress);
      toast.success("वीडियो लाइव हुआ!"); navigate("/reels");
    } catch (error) { 
      handleError(error, "वीडियो अपलोड करने में त्रुटि"); 
    } finally { setUploading(false); }
  };

  return (
    <div className="space-y-10">
      {!videoFile ? (
        <label className="block aspect-video border-4 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 hover:border-primary transition-colors">
           <Film className="size-16 text-gray-300 mb-4" />
           <p className="text-xl font-black text-gray-950 uppercase tracking-tighter">वीडियो फ़ाइल चुनें</p>
           <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-2">MP4 • MAX 100MB</p>
           <input ref={videoInputRef} type="file" accept="video/*" className="hidden" 
             onChange={(e) => e.target.files?.[0] && processVideoFile(e.target.files[0])} />
        </label>
      ) : (
        <div className="space-y-10">
           <div className="relative border-4 border-gray-950 aspect-video bg-black">
              <video src={videoPreview!} className="w-full h-full object-cover" controls />
              <button onClick={() => setVideoFile(null)} className="absolute top-4 right-4 p-4 bg-primary text-white border-2 border-white hover:bg-gray-950">
                <X className="size-6" />
              </button>
           </div>
           <FormField label="वीडियो शीर्षक (TITLE)">
              <input value={title} onChange={e => setTitle(e.target.value)} className="bhagva-input" placeholder="वीडियो का शीर्षक यहाँ लिखें..." />
           </FormField>
           <CategoryPicker categories={CATEGORIES} selected={category} onSelect={setCategory} />
        </div>
      )}
      {uploading && <ProgressBar progress={progress} />}
      <button onClick={handleUpload} disabled={uploading || !videoFile} className="w-full py-8 bg-primary text-white font-black text-xl tracking-widest uppercase hover:bg-gray-950 transition-colors flex items-center justify-center gap-4 border-none outline-none disabled:opacity-50">
          {uploading ? <Loader2 className="size-8 animate-spin" /> : <Zap className="size-8" />}
          {uploading ? "अपलोड हो रहा है..." : "वीडियो अपलोड करें"}
       </button>
    </div>
  );
}

function PhotoUploadForm({ user, userData, navigate }: FormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[1]);
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
        authorId: user.uid, 
        authorName: userData?.name || user.displayName || "Admin", 
        authorPhotoURL: userData?.photoURL || user.photoURL || "",
      }, setProgress);
      toast.success("फोटो अपलोड सफल!");
      navigate("/gallery");
    } catch (error) { 
      handleError(error, "फोटो अपलोड करने में त्रुटि"); 
    } finally { setUploading(false); }
  };

  return (
    <div className="space-y-10">
       {!file ? (
        <label className="block aspect-video border-4 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 hover:border-primary transition-colors">
           <Camera className="size-16 text-gray-300 mb-4" />
           <p className="text-xl font-black text-gray-950 uppercase tracking-tighter">फोटो चुनें</p>
           <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-2">IMAGE • PNG • WEBP</p>
           <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </label>
       ) : (
         <div className="space-y-10">
            <div className="relative border-4 border-gray-950 aspect-video">
               <img src={preview!} className="w-full h-full object-cover" />
               <button onClick={() => setFile(null)} className="absolute top-4 right-4 p-4 bg-primary text-white border-2 border-white hover:bg-gray-950">
                <X className="size-6" />
              </button>
            </div>
            <FormField label="फोटो शीर्षक (LABEL)">
               <input value={title} onChange={e => setTitle(e.target.value)} className="bhagva-input" />
            </FormField>
            <CategoryPicker categories={CATEGORIES} selected={category} onSelect={setCategory} />
         </div>
       )}
       {uploading && <ProgressBar progress={progress} />}
       <button onClick={handleUpload} disabled={uploading || !file} className="w-full py-8 bg-primary text-white font-black text-xl tracking-widest uppercase hover:bg-gray-950 transition-colors flex items-center justify-center gap-4 border-none outline-none disabled:opacity-50">
          {uploading ? <Loader2 className="size-8 animate-spin" /> : <Zap className="size-8" />}
          {uploading ? "अपलोड हो रहा है..." : "फोटो अपलोड करें"}
       </button>
    </div>
  );
}

// ── Components ─────────────────────────────────────────────────────────────

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      {children}
    </div>
  );
}

interface CategoryPickerProps {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
}

function CategoryPicker({ categories, selected, onSelect }: CategoryPickerProps) {
  return (
    <FormField label="श्रेणी चयन (CATEGORY)">
       <div className="flex flex-wrap gap-2">
          {categories.map((cat: string) => (
            <button key={cat} onClick={() => onSelect(cat)} className={`px-4 py-2 border-2 font-black text-[11px] uppercase tracking-widest transition-colors ${selected === cat ? "bg-primary border-primary text-white" : "bg-white border-gray-100 text-gray-400 hover:border-primary/50"}`}>
               {cat}
            </button>
          ))}
       </div>
    </FormField>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="space-y-4 bg-gray-50 p-6 border-4 border-gray-100">
       <div className="flex items-center justify-between">
          <p className="text-[11px] font-black text-gray-950 uppercase tracking-widest">ट्रांसफर स्टेटस</p>
          <p className="text-[11px] font-black text-primary">{Math.round(progress)}% COMPLETE</p>
       </div>
       <div className="h-6 bg-white border-2 border-gray-100 p-1">
          <div style={{ width: `${progress}%` }} className="h-full bg-primary" />
       </div>
    </div>
  );
}

function LoginPrompt() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-10 text-center px-6">
      <div className="size-24 bg-gray-950 text-primary flex items-center justify-center border-4 border-primary">
         <Shield className="size-12" />
      </div>
      <div className="space-y-4">
         <h2 className="text-4xl font-black text-gray-950 tracking-tighter uppercase leading-none">पहुंच प्रतिबंधित</h2>
         <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">AUTHENTICATION REQUIRED FOR UPLOAD</p>
      </div>
      <button onClick={() => navigate("/profile")} className="px-12 py-6 bg-primary text-white font-black text-[12px] uppercase tracking-widest flex items-center gap-4 hover:bg-gray-950 transition-colors">
         लॉगिन प्रक्रिया शुरू करें <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

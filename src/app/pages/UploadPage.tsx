/**
 * UploadPage.tsx
 * Unified Upload experience: Video 🎬 | Photo 📸 | News 📰
 *
 * Features:
 *  - Tab-based switcher (three upload modes)
 *  - Client-side image compression before upload
 *  - Real-time Firebase Storage upload progress
 *  - Drag-and-drop for videos
 *  - Preview before publish
 *  - Hashtag system for Video & Photo
 *  - Breaking news toggle for News posts
 *  - Category selector across all modes
 */

import { useState, useRef, useCallback } from "react";
import {
  Upload, X, Play, Loader2, Hash, Film, Image as ImageIcon,
  Plus, CheckCircle2, AlertCircle, ChevronRight, Newspaper,
  Camera, Zap, Globe, BookOpen, ChevronDown,
} from "lucide-react";
import { videoService } from "../services/videoService";
import { uploadPhoto, uploadNews } from "../services/uploadService";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router";

// ── Constants ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "राजनीति", "खेल", "मनोरंजन", "व्यापार", "तकनीक", "स्वास्थ्य", "शिक्षा", "अंतर्राष्ट्रीय",
];
const MAX_VIDEO_MB = 100;
const MAX_IMAGE_MB = 20;
const ACCEPTED_VIDEO = ["video/mp4", "video/webm", "video/ogg"];

type UploadMode = "video" | "photo" | "news";

// ── Tab Config ────────────────────────────────────────────────────────────────
const TABS: { mode: UploadMode; label: string; emoji: string; desc: string; color: string }[] = [
  { mode: "video", label: "Reel / Video", emoji: "🎬", desc: "MP4 • Max 100MB", color: "red" },
  { mode: "photo", label: "Photo", emoji: "📸", desc: "JPG/PNG • Max 20MB", color: "purple" },
  { mode: "news", label: "News Article", emoji: "📰", desc: "Text + Cover Image", color: "blue" },
];

// ── Helper: format bytes ──────────────────────────────────────────────────────
const fmtMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(1) + " MB";

// ─────────────────────────────────────────────────────────────────────────────
export function UploadPage() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<UploadMode>("video");

  if (!user) return <LoginPrompt />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl pb-32">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex size-18 bg-gradient-to-br from-red-500 to-red-700 rounded-3xl items-center justify-center text-white mb-4 shadow-2xl shadow-red-200 p-4">
          <Upload className="size-9" />
        </div>
        <h1 className="text-3xl font-black text-gray-900">Upload करें</h1>
        <p className="text-gray-500 font-medium mt-1">Video, Photo या News — सब यहाँ</p>
      </div>

      {/* Mode Tabs */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.mode}
            onClick={() => setMode(tab.mode)}
            className={`flex flex-col items-center gap-2 py-5 rounded-3xl border-2 transition-all font-black ${
              mode === tab.mode
                ? tab.color === "red"
                  ? "bg-red-600 border-red-600 text-white shadow-xl shadow-red-100"
                  : tab.color === "purple"
                  ? "bg-purple-600 border-purple-600 text-white shadow-xl shadow-purple-100"
                  : "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100"
                : "bg-white border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span className="text-2xl">{tab.emoji}</span>
            <span className="text-sm leading-tight text-center">{tab.label}</span>
            <span className={`text-[10px] font-medium ${mode === tab.mode ? "opacity-70" : "text-gray-400"}`}>
              {tab.desc}
            </span>
          </button>
        ))}
      </div>

      {/* Upload Form by Mode */}
      {mode === "video" && <VideoUploadForm user={user} userData={userData} navigate={navigate} />}
      {mode === "photo" && <PhotoUploadForm user={user} userData={userData} navigate={navigate} />}
      {mode === "news"  && <NewsUploadForm  user={user} userData={userData} navigate={navigate} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO UPLOAD FORM
// ─────────────────────────────────────────────────────────────────────────────
function VideoUploadForm({ user, userData, navigate }: any) {
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [autoThumb, setAutoThumb] = useState(true);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<1 | 2>(1);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processVideoFile(file);
  }, []);

  const processVideoFile = (file: File) => {
    if (!ACCEPTED_VIDEO.includes(file.type)) {
      toast.error("केवल MP4, WebM, OGG allowed है।"); return;
    }
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
      toast.error(`Video ${MAX_VIDEO_MB}MB से कम होनी चाहिए।`); return;
    }
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setStep(2);
    toast.success("Video select हो गई! Details भरें। ✅");
  };

  const addHashtag = () => {
    const tag = hashtagInput.trim().replace(/^#/, "");
    if (tag && !hashtags.includes(tag) && hashtags.length < 10) {
      setHashtags([...hashtags, tag]); setHashtagInput("");
    }
  };

  const handleUpload = async () => {
    if (!videoFile || !title.trim() || !caption.trim()) {
      toast.error("Video, Title और Caption सब ज़रूरी हैं।"); return;
    }
    setUploading(true); setProgress(0);
    try {
      await videoService.uploadVideo(
        videoFile, autoThumb ? null : thumbFile,
        {
          title: title.trim(), caption: caption.trim(), hashtags, category,
          authorId: user.uid,
          authorName: userData?.name || user.displayName || "User",
          authorPhotoURL: userData?.photoURL || user.photoURL || "",
        },
        setProgress
      );
      toast.success("Video Reel publish हो गई! 🎉");
      navigate("/reels");
    } catch (err: any) {
      toast.error("Upload failed: " + (err.message || "Error"));
    } finally { setUploading(false); }
  };

  return (
    <div className="space-y-6">
      {/* Progress Stepper */}
      <StepIndicator step={step} steps={["Video Select", "Details भरें"]} color="red" />

      {/* Step 1: Drop Zone */}
      {step === 1 && (
        <DropZone
          onDrop={handleDrop}
          onClick={() => videoInputRef.current?.click()}
          icon={<Film className="size-12 text-red-500" />}
          title="Video Drop करें या Click करें"
          subtitle={`MP4, WebM, OGG • Max ${MAX_VIDEO_MB}MB`}
          color="red"
        >
          <input ref={videoInputRef} type="file" accept="video/mp4,video/webm,video/ogg"
            className="hidden" onChange={(e) => e.target.files?.[0] && processVideoFile(e.target.files[0])} />
        </DropZone>
      )}

      {/* Step 2: Details */}
      {step === 2 && (
        <>
          {/* Preview + Thumbnail */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-3xl overflow-hidden bg-black aspect-[9/16]">
              {videoPreview && <video src={videoPreview} className="w-full h-full object-cover" muted loop autoPlay />}
              <button onClick={() => { setVideoFile(null); setVideoPreview(null); setStep(1); }}
                className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold py-2 rounded-xl hover:bg-red-600/80 transition-all">
                🔄 Change Video
              </button>
            </div>
            <ThumbnailPicker
              thumbPreview={thumbPreview}
              autoThumb={autoThumb}
              thumbInputRef={thumbInputRef}
              onAutoThumb={() => { setAutoThumb(true); setThumbFile(null); setThumbPreview(null); }}
              onCustomThumb={() => { setAutoThumb(false); thumbInputRef.current?.click(); }}
              onThumbChange={(f) => {
                if (f.size > 5 * 1024 * 1024) { toast.error("Thumbnail 5MB से कम होनी चाहिए।"); return; }
                setThumbFile(f); setThumbPreview(URL.createObjectURL(f)); setAutoThumb(false);
              }}
            />
          </div>

          <FormField label="Video Title *">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Video का title डालें..." maxLength={100}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl px-4 py-4 font-bold outline-none transition-all" />
          </FormField>

          <FormField label={`Caption * (${caption.length}/500)`}>
            <textarea value={caption} onChange={(e) => setCaption(e.target.value)}
              placeholder="Video के बारे में लिखें..." rows={3} maxLength={500}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl px-4 py-4 font-bold outline-none transition-all resize-none" />
          </FormField>

          <HashtagInput
            value={hashtagInput} onChange={setHashtagInput}
            hashtags={hashtags} onAdd={addHashtag} onRemove={(t) => setHashtags(hashtags.filter((h) => h !== t))}
          />

          <CategoryPicker categories={CATEGORIES} selected={category} onSelect={setCategory} color="red" />

          {uploading && <UploadProgressBar progress={progress} type="Video" />}

          <HintBox text="Video को compress करके upload करें (720p best होता है)। Large files slow upload होती हैं।" />

          <PublishButton
            onClick={handleUpload}
            disabled={uploading || !videoFile || !title.trim() || !caption.trim()}
            loading={uploading}
            label="🎬 Reel Publish करें"
            color="red"
          />
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHOTO UPLOAD FORM
// ─────────────────────────────────────────────────────────────────────────────
function PhotoUploadForm({ user, userData, navigate }: any) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileInfo, setFileInfo] = useState<{ name: string; originalMB: string } | null>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      toast.error("केवल Image files allowed हैं (JPG, PNG, WEBP)।"); return;
    }
    if (f.size > MAX_IMAGE_MB * 1024 * 1024) {
      toast.error(`Photo ${MAX_IMAGE_MB}MB से कम होनी चाहिए।`); return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setFileInfo({ name: f.name, originalMB: fmtMB(f.size) });
    toast.success(`Photo select हो गई (${fmtMB(f.size)})! Details भरें। ✅`);
  };

  const addHashtag = () => {
    const tag = hashtagInput.trim().replace(/^#/, "");
    if (tag && !hashtags.includes(tag) && hashtags.length < 10) {
      setHashtags([...hashtags, tag]); setHashtagInput("");
    }
  };

  const handleUpload = async () => {
    if (!file || !title.trim() || !caption.trim()) {
      toast.error("Photo, Title और Caption ज़रूरी हैं।"); return;
    }
    setUploading(true); setProgress(0);
    try {
      await uploadPhoto(
        file,
        {
          title: title.trim(), caption: caption.trim(), hashtags, category,
          authorId: user.uid,
          authorName: userData?.name || user.displayName || "User",
          authorPhotoURL: userData?.photoURL || user.photoURL || "",
        },
        setProgress
      );
      toast.success("Photo publish हो गई! 🎉 (auto-compressed)");
      navigate("/explore");
    } catch (err: any) {
      toast.error("Upload failed: " + (err.message || "Error"));
    } finally { setUploading(false); }
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone / Preview */}
      {!file ? (
        <DropZone
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onClick={() => inputRef.current?.click()}
          icon={<Camera className="size-12 text-purple-500" />}
          title="Photo Drop करें या Click करें"
          subtitle={`JPG, PNG, WEBP • Max ${MAX_IMAGE_MB}MB`}
          color="purple"
        >
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </DropZone>
      ) : (
        <div className="relative rounded-3xl overflow-hidden bg-gray-100 group">
          <img src={preview!} alt="preview" className="w-full aspect-square object-cover" />
          {fileInfo && (
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-1.5 text-white text-xs font-bold flex items-center gap-2">
              <Zap className="size-3 text-yellow-400" />
              {fileInfo.originalMB} → auto-compressed
            </div>
          )}
          <button onClick={() => { setFile(null); setPreview(null); setFileInfo(null); }}
            className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold py-2 rounded-xl hover:bg-purple-600/80 transition-all">
            🔄 Change Photo
          </button>
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </div>
      )}

      <FormField label="Photo Title *">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="Photo का title डालें..." maxLength={100}
          className="w-full bg-gray-50 border-2 border-transparent focus:border-purple-500 focus:bg-white rounded-2xl px-4 py-4 font-bold outline-none transition-all" />
      </FormField>

      <FormField label={`Caption * (${caption.length}/500)`}>
        <textarea value={caption} onChange={(e) => setCaption(e.target.value)}
          placeholder="Photo के बारे में लिखें..." rows={3} maxLength={500}
          className="w-full bg-gray-50 border-2 border-transparent focus:border-purple-500 focus:bg-white rounded-2xl px-4 py-4 font-bold outline-none transition-all resize-none" />
      </FormField>

      <HashtagInput
        value={hashtagInput} onChange={setHashtagInput}
        hashtags={hashtags} onAdd={addHashtag} onRemove={(t) => setHashtags(hashtags.filter((h) => h !== t))}
        color="purple"
      />

      <CategoryPicker categories={CATEGORIES} selected={category} onSelect={setCategory} color="purple" />

      {uploading && <UploadProgressBar progress={progress} type="Photo" />}

      <HintBox
        text="Photo को auto-compress किया जाएगा। Original quality safe रहेगी।"
        color="purple"
        icon={<Zap className="size-4 text-purple-500 flex-shrink-0 mt-0.5" />}
      />

      <PublishButton
        onClick={handleUpload}
        disabled={uploading || !file || !title.trim() || !caption.trim()}
        loading={uploading}
        label="📸 Photo Publish करें"
        color="purple"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NEWS UPLOAD FORM
// ─────────────────────────────────────────────────────────────────────────────
function NewsUploadForm({ user, userData, navigate }: any) {
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [source, setSource] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [isBreaking, setIsBreaking] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCover = (f: File) => {
    if (!f.type.startsWith("image/")) { toast.error("Image file select करें।"); return; }
    if (f.size > 10 * 1024 * 1024) { toast.error("Cover 10MB से कम होनी चाहिए।"); return; }
    setCoverFile(f);
    setCoverPreview(URL.createObjectURL(f));
  };

  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, "");
    if (t && !tags.includes(t) && tags.length < 10) { setTags([...tags, t]); setTagInput(""); }
  };

  const handleUpload = async () => {
    if (!headline.trim() || !summary.trim() || !body.trim()) {
      toast.error("Headline, Summary और Article body ज़रूरी हैं।"); return;
    }
    setUploading(true); setProgress(0);
    try {
      await uploadNews(
        coverFile,
        {
          headline: headline.trim(), summary: summary.trim(), body: body.trim(),
          source: source.trim(), tags, category, isBreaking,
          authorId: user.uid,
          authorName: userData?.name || user.displayName || "User",
          authorPhotoURL: userData?.photoURL || user.photoURL || "",
        },
        setProgress
      );
      toast.success("News Article publish हो गया! 🗞️");
      navigate("/explore");
    } catch (err: any) {
      toast.error("Publish failed: " + (err.message || "Error"));
    } finally { setUploading(false); }
  };

  return (
    <div className="space-y-6">
      {/* Cover Image */}
      <div>
        <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Cover Image (Optional)</label>
        {!coverFile ? (
          <div
            onClick={() => coverInputRef.current?.click()}
            className="border-2 border-dashed border-blue-200 rounded-3xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
          >
            <ImageIcon className="size-10 text-blue-400 mx-auto mb-2" />
            <p className="font-bold text-gray-700">Cover photo add करें</p>
            <p className="text-gray-400 text-sm mt-1">JPG/PNG • Max 10MB</p>
          </div>
        ) : (
          <div className="relative rounded-3xl overflow-hidden">
            <img src={coverPreview!} alt="cover" className="w-full h-48 object-cover" />
            <button onClick={() => { setCoverFile(null); setCoverPreview(null); }}
              className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-600/80 transition-all">
              🔄 Change
            </button>
          </div>
        )}
        <input ref={coverInputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => e.target.files?.[0] && handleCover(e.target.files[0])} />
      </div>

      {/* Breaking News Toggle */}
      <div className="flex items-center justify-between bg-orange-50 border border-orange-100 rounded-2xl px-5 py-4">
        <div className="flex items-center gap-3">
          <Zap className={`size-5 ${isBreaking ? "text-orange-500" : "text-gray-400"}`} />
          <div>
            <p className="font-black text-gray-900">Breaking News</p>
            <p className="text-xs text-gray-500 font-medium">इसे Breaking banner देंगे</p>
          </div>
        </div>
        <button
          onClick={() => setIsBreaking(!isBreaking)}
          className={`w-14 h-7 rounded-full transition-all duration-300 flex items-center px-1 ${isBreaking ? "bg-orange-500 justify-end" : "bg-gray-200 justify-start"}`}
        >
          <div className="size-5 bg-white rounded-full shadow-md" />
        </button>
      </div>

      <FormField label="Headline *">
        <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)}
          placeholder="मुख्य समाचार headline..." maxLength={200}
          className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-4 py-4 font-bold outline-none transition-all text-lg" />
      </FormField>

      <FormField label={`Summary * (${summary.length}/300) — संक्षिप्त विवरण`}>
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)}
          placeholder="खबर का संक्षिप्त विवरण (यह homepage पर दिखेगा)..." rows={3} maxLength={300}
          className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-4 py-4 font-bold outline-none transition-all resize-none" />
      </FormField>

      <FormField label={`Full Article Body * (${body.length} chars)`}>
        <textarea value={body} onChange={(e) => setBody(e.target.value)}
          placeholder="पूरी खबर यहाँ लिखें... (paragraphs, details सब यहाँ आएंगे)" rows={8}
          className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-4 py-4 font-bold outline-none transition-all resize-none leading-relaxed" />
      </FormField>

      <FormField label="Source / स्रोत">
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input type="text" value={source} onChange={(e) => setSource(e.target.value)}
            placeholder="जैसे: ANI, PTI, BBC Hindi..."
            className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl pl-11 pr-4 py-4 font-bold outline-none transition-all" />
        </div>
      </FormField>

      {/* Tags */}
      <div>
        <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Tags ({tags.length}/10)</label>
        <div className="flex gap-2 mb-3">
          <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); addTag(); }}}
            placeholder="#tag डालें..."
            className="flex-1 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-4 py-3 font-bold outline-none transition-all" />
          <button onClick={addTag}
            className="size-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-all">
            <Plus className="size-5" />
          </button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold">
                <Hash className="size-3" />{t}
                <button onClick={() => setTags(tags.filter((x) => x !== t))}><X className="size-3 hover:text-red-500" /></button>
              </span>
            ))}
          </div>
        )}
      </div>

      <CategoryPicker categories={CATEGORIES} selected={category} onSelect={setCategory} color="blue" />

      {uploading && <UploadProgressBar progress={progress} type="News" />}

      <HintBox
        text="आपका article review के बाद publish होगा। Breaking news तुरंत live होगी।"
        color="blue"
        icon={<BookOpen className="size-4 text-blue-500 flex-shrink-0 mt-0.5" />}
      />

      <PublishButton
        onClick={handleUpload}
        disabled={uploading || !headline.trim() || !summary.trim() || !body.trim()}
        loading={uploading}
        label="📰 News Publish करें"
        color="blue"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function LoginPrompt() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4">
      <div className="text-6xl">🔐</div>
      <h2 className="text-2xl font-black text-gray-900 text-center">Upload करने के लिए Login करें</h2>
      <p className="text-gray-500 text-center font-medium">Video, Photo या News — सब upload करने के लिए account ज़रूरी है।</p>
      <button onClick={() => navigate("/profile")}
        className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-lg shadow-lg hover:bg-red-700 transition-all">
        Login करें →
      </button>
    </div>
  );
}

function StepIndicator({ step, steps, color }: { step: number; steps: string[]; color: string }) {
  const active = color === "red" ? "bg-red-600 text-white" : color === "purple" ? "bg-purple-600 text-white" : "bg-blue-600 text-white";
  return (
    <div className="flex items-center gap-3 justify-center">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black transition-all ${step >= i + 1 ? active : "bg-gray-100 text-gray-400"}`}>
            {step > i + 1 ? <CheckCircle2 className="size-4" /> : <span>{i + 1}</span>}
            {s}
          </div>
          {i < steps.length - 1 && <ChevronRight className="size-4 text-gray-300" />}
        </div>
      ))}
    </div>
  );
}

function DropZone({ onDrop, onClick, icon, title, subtitle, color, children }: any) {
  const border = color === "red" ? "border-red-200 hover:border-red-400 hover:bg-red-50"
    : color === "purple" ? "border-purple-200 hover:border-purple-400 hover:bg-purple-50"
    : "border-blue-200 hover:border-blue-400 hover:bg-blue-50";
  return (
    <div onDrop={onDrop} onDragOver={(e) => e.preventDefault()} onClick={onClick}
      className={`relative border-2 border-dashed ${border} rounded-3xl p-12 text-center cursor-pointer transition-all duration-200 group`}>
      {children}
      <div className="flex flex-col items-center gap-4">
        <div className="size-20 bg-gray-50 rounded-3xl flex items-center justify-center group-hover:scale-105 transition-transform">
          {icon}
        </div>
        <div>
          <p className="text-xl font-black text-gray-900">{title}</p>
          <p className="text-gray-500 font-medium mt-1">{subtitle}</p>
        </div>
        <p className="text-gray-400 text-sm font-medium">या file को यहाँ drag & drop करें</p>
      </div>
    </div>
  );
}

function ThumbnailPicker({ thumbPreview, autoThumb, thumbInputRef, onAutoThumb, onCustomThumb, onThumbChange }: any) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-[9/16] cursor-pointer" onClick={onCustomThumb}>
        {thumbPreview
          ? <img src={thumbPreview} alt="Thumb" className="w-full h-full object-cover" />
          : <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
              <ImageIcon className="size-8" />
              <p className="text-xs font-bold text-center px-2">{autoThumb ? "Auto Thumbnail" : "Custom"}</p>
            </div>}
        <input ref={thumbInputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => e.target.files?.[0] && onThumbChange(e.target.files[0])} />
      </div>
      <button onClick={onAutoThumb}
        className={`py-2 rounded-2xl text-xs font-black transition-all ${autoThumb ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
        🤖 Auto Thumb
      </button>
      <button onClick={onCustomThumb}
        className={`py-2 rounded-2xl text-xs font-black transition-all ${!autoThumb ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}>
        📸 Custom
      </button>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">{label}</label>
      {children}
    </div>
  );
}

function HashtagInput({ value, onChange, hashtags, onAdd, onRemove, color = "red" }: any) {
  const focusBorder = color === "red" ? "focus:border-red-500"
    : color === "purple" ? "focus:border-purple-500" : "focus:border-blue-500";
  const bgBtn = color === "red" ? "bg-red-600 hover:bg-red-700"
    : color === "purple" ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700";
  return (
    <div>
      <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">
        Hashtags ({hashtags.length}/10)
      </label>
      <div className="flex gap-2 mb-3">
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onAdd(); }}}
          placeholder="#hashtag डालें..."
          className={`flex-1 bg-gray-50 border-2 border-transparent ${focusBorder} focus:bg-white rounded-2xl px-4 py-3 font-bold outline-none transition-all`} />
        <button onClick={onAdd} className={`size-12 ${bgBtn} text-white rounded-2xl flex items-center justify-center transition-all`}>
          <Plus className="size-5" />
        </button>
      </div>
      {hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag: string) => (
            <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold">
              <Hash className="size-3" />{tag}
              <button onClick={() => onRemove(tag)}><X className="size-3 hover:text-red-500" /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryPicker({ categories, selected, onSelect, color = "red" }: any) {
  const activeClass = color === "red" ? "bg-red-600 text-white"
    : color === "purple" ? "bg-purple-600 text-white" : "bg-blue-600 text-white";
  return (
    <div>
      <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Category</label>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat: string) => (
          <button key={cat} onClick={() => onSelect(cat)}
            className={`px-4 py-2 rounded-full text-sm font-black transition-all ${selected === cat ? activeClass : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

function UploadProgressBar({ progress, type }: { progress: number; type: string }) {
  const phase = progress < 40 ? "Compressing..." : progress < 80 ? `${type} upload हो रहा है...` : progress < 98 ? "Almost done..." : "Finishing...";
  return (
    <div className="bg-gray-900 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Loader2 className="size-5 text-red-500 animate-spin" />
        <p className="text-white font-bold">{phase} {Math.round(progress)}%</p>
        <span className="ml-auto text-green-400 text-xs font-bold flex items-center gap-1">
          <Zap className="size-3" /> Fast Mode
        </span>
      </div>
      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-gray-400 text-xs font-medium">{phase}</p>
        <p className="text-gray-500 text-xs font-medium">Firebase Storage</p>
      </div>
    </div>
  );
}

function HintBox({ text, color = "blue", icon }: { text: string; color?: string; icon?: React.ReactNode }) {
  const cls = color === "purple" ? "bg-purple-50 border-purple-100"
    : color === "red" ? "bg-red-50 border-red-100" : "bg-blue-50 border-blue-100";
  const iconNode = icon || <AlertCircle className="size-5 text-blue-500 flex-shrink-0 mt-0.5" />;
  return (
    <div className={`flex gap-3 ${cls} rounded-2xl p-4 border`}>
      {iconNode}
      <p className={`text-sm font-medium ${color === "purple" ? "text-purple-700" : color === "red" ? "text-red-700" : "text-blue-700"}`}>
        {text}
      </p>
    </div>
  );
}

function PublishButton({ onClick, disabled, loading, label, color = "red" }: any) {
  const bg = color === "red"
    ? "bg-red-600 hover:bg-red-700 shadow-red-100"
    : color === "purple"
    ? "bg-purple-600 hover:bg-purple-700 shadow-purple-100"
    : "bg-blue-600 hover:bg-blue-700 shadow-blue-100";
  return (
    <button onClick={onClick} disabled={disabled}
      className={`w-full py-5 ${bg} text-white rounded-3xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed`}>
      {loading
        ? <><Loader2 className="size-5 animate-spin" /> Publishing...</>
        : label}
    </button>
  );
}

import { useState, useRef, useCallback } from "react";
import {
  Upload, X, Play, Loader2, Hash, Film, Image as ImageIcon,
  Plus, CheckCircle2, AlertCircle, ChevronRight
} from "lucide-react";
import { videoService } from "../services/videoService";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const VIDEO_CATEGORIES = [
  "राजनीति", "खेल", "मनोरंजन", "व्यापार", "तकनीक", "स्वास्थ्य", "शिक्षा",
];

const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
const MAX_THUMB_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_VIDEO = ["video/mp4", "video/webm", "video/ogg"];

export function UploadPage() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();

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
  const [category, setCategory] = useState(VIDEO_CATEGORIES[0]);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<1 | 2>(1); // 1=file select, 2=details

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4">
        <div className="text-6xl">🎬</div>
        <h2 className="text-2xl font-black text-gray-900 text-center">Video Upload करें</h2>
        <p className="text-gray-500 text-center font-medium">
          Video upload करने के लिए पहले Login करें।
        </p>
        <button
          onClick={() => navigate("/profile")}
          className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-lg shadow-lg hover:bg-red-700 transition-all"
        >
          Login करें
        </button>
      </div>
    );
  }

  // ── Drag & Drop ──────────────────────────────────────────────────────────────
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processVideoFile(file);
  }, []);

  const processVideoFile = (file: File) => {
    if (!ACCEPTED_VIDEO.includes(file.type)) {
      toast.error("केवल MP4, WebM, OGG format allowed है।");
      return;
    }
    if (file.size > MAX_VIDEO_SIZE) {
      toast.error("Video 100MB से कम होनी चाहिए।");
      return;
    }
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoPreview(url);
    setStep(2);
    toast.success("Video select हो गई! अब details भरें। ✅");
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processVideoFile(file);
  };

  const handleThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_THUMB_SIZE) { toast.error("Thumbnail 5MB से कम होनी चाहिए।"); return; }
    setThumbFile(file);
    setThumbPreview(URL.createObjectURL(file));
    setAutoThumb(false);
  };

  const addHashtag = () => {
    const tag = hashtagInput.trim().replace(/^#/, "");
    if (tag && !hashtags.includes(tag) && hashtags.length < 10) {
      setHashtags([...hashtags, tag]);
      setHashtagInput("");
    }
  };

  const removeHashtag = (tag: string) => setHashtags(hashtags.filter((h) => h !== tag));

  const handleUpload = async () => {
    if (!videoFile) { toast.error("Video select करें।"); return; }
    if (!title.trim()) { toast.error("Title डालें।"); return; }
    if (!caption.trim()) { toast.error("Caption डालें।"); return; }

    setUploading(true);
    setProgress(0);

    try {
      const videoId = await videoService.uploadVideo(
        videoFile,
        autoThumb ? null : thumbFile,
        {
          title: title.trim(),
          caption: caption.trim(),
          hashtags,
          category,
          authorId: user.uid,
          authorName: userData?.name || user.displayName || "User",
          authorPhotoURL: userData?.photoURL || user.photoURL || "",
        },
        setProgress
      );

      toast.success("Video upload हो गई! 🎉");
      navigate("/reels");
    } catch (err: any) {
      console.error(err);
      toast.error("Upload failed: " + (err.message || "Unknown error"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex size-16 bg-red-600 rounded-3xl items-center justify-center text-white mb-4 shadow-xl shadow-red-100">
          <Film className="size-8" />
        </div>
        <h1 className="text-3xl font-black text-gray-900">Video Upload</h1>
        <p className="text-gray-500 font-medium mt-1">अपनी Reel शेयर करें</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-3 mb-8 justify-center">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black transition-all ${step >= 1 ? "bg-red-600 text-white" : "bg-gray-100 text-gray-400"}`}>
          {step > 1 ? <CheckCircle2 className="size-4" /> : <span>1</span>}
          Video Select
        </div>
        <ChevronRight className="size-4 text-gray-300" />
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black transition-all ${step >= 2 ? "bg-red-600 text-white" : "bg-gray-100 text-gray-400"}`}>
          <span>2</span> Details
        </div>
      </div>

      {/* Step 1: File Select */}
      {step === 1 && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => videoInputRef.current?.click()}
          className="relative border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center cursor-pointer hover:border-red-400 hover:bg-red-50 transition-all duration-200"
        >
          <input ref={videoInputRef} type="file" accept="video/mp4,video/webm,video/ogg" className="hidden" onChange={handleVideoChange} />
          <div className="flex flex-col items-center gap-4">
            <div className="size-20 bg-red-50 rounded-3xl flex items-center justify-center">
              <Upload className="size-10 text-red-600" />
            </div>
            <div>
              <p className="text-xl font-black text-gray-900">Video Drop करें या Click करें</p>
              <p className="text-gray-500 font-medium mt-1">MP4, WebM, OGG • Max 100MB</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Details */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Video + Thumbnail Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Video Preview */}
            <div className="relative rounded-3xl overflow-hidden bg-black aspect-[9/16]">
              {videoPreview && (
                <video src={videoPreview} className="w-full h-full object-cover" controls={false} muted loop autoPlay />
              )}
              <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                <button
                  onClick={() => { setVideoFile(null); setVideoPreview(null); setStep(1); }}
                  className="flex-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold py-2 rounded-xl hover:bg-red-600/80 transition-all"
                >
                  Change
                </button>
              </div>
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-xl px-2 py-1">
                <Play className="size-4 text-white" />
              </div>
            </div>

            {/* Thumbnail */}
            <div className="flex flex-col gap-3">
              <div
                className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-[9/16] cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => !autoThumb && thumbInputRef.current?.click()}
              >
                {thumbPreview ? (
                  <img src={thumbPreview} alt="Thumbnail" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
                    <ImageIcon className="size-10" />
                    <p className="text-xs font-bold text-center px-2">
                      {autoThumb ? "Auto Thumbnail" : "Custom Thumbnail"}
                    </p>
                  </div>
                )}
                <input ref={thumbInputRef} type="file" accept="image/*" className="hidden" onChange={handleThumbChange} />
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => { setAutoThumb(true); setThumbFile(null); setThumbPreview(null); }}
                  className={`py-2 rounded-2xl text-xs font-black transition-all ${autoThumb ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  🤖 Auto Generate
                </button>
                <button
                  onClick={() => { setAutoThumb(false); thumbInputRef.current?.click(); }}
                  className={`py-2 rounded-2xl text-xs font-black transition-all ${!autoThumb ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  📸 Custom Upload
                </button>
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Video Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Video का title डालें..."
              maxLength={100}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl px-4 py-4 font-bold outline-none transition-all"
            />
          </div>

          {/* Caption */}
          <div>
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Caption *</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Video के बारे में लिखें..."
              rows={3}
              maxLength={500}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl px-4 py-4 font-bold outline-none transition-all resize-none"
            />
            <p className="text-right text-xs text-gray-400 mt-1">{caption.length}/500</p>
          </div>

          {/* Hashtags */}
          <div>
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Hashtags ({hashtags.length}/10)</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); addHashtag(); }}}
                placeholder="#hashtag डालें..."
                className="flex-1 bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl px-4 py-3 font-bold outline-none transition-all"
              />
              <button onClick={addHashtag} className="size-12 bg-red-600 text-white rounded-2xl flex items-center justify-center hover:bg-red-700 transition-all">
                <Plus className="size-5" />
              </button>
            </div>
            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold">
                    <Hash className="size-3" />{tag}
                    <button onClick={() => removeHashtag(tag)}><X className="size-3 hover:text-red-500" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Category</label>
            <div className="flex flex-wrap gap-2">
              {VIDEO_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-black transition-all ${category === cat ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="bg-gray-900 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Loader2 className="size-5 text-red-500 animate-spin" />
                <p className="text-white font-bold">Upload हो रहा है... {Math.round(progress)}%</p>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-gray-400 text-xs mt-2 font-medium">
                {progress < 50 ? "Video upload हो रही है..." : progress < 90 ? "Processing..." : "Almost done..."}
              </p>
            </div>
          )}

          {/* Info Notice */}
          <div className="flex gap-3 bg-blue-50 rounded-2xl p-4 border border-blue-100">
            <AlertCircle className="size-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 text-sm font-medium">
              Video को compress करके upload करना better होता है (720p recommended)। Large files slow upload होती हैं।
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleUpload}
            disabled={uploading || !videoFile || !title.trim() || !caption.trim()}
            className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-3xl font-black text-lg shadow-xl shadow-red-100 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <><Loader2 className="size-5 animate-spin" /> Uploading...</>
            ) : (
              <><Upload className="size-5" /> Reel Publish करें</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

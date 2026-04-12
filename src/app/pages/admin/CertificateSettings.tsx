import { useState, useEffect, useRef, useCallback } from "react";
import {
  Upload, Save, Pen, User, Award, CheckCircle,
  RefreshCw, AlertCircle, Trash2, Edit3, Image, X, CreditCard, ShieldCheck
} from "lucide-react";
import { certSettingsService, CertAdminSettings, uploadSignatureToStorage } from "../../services/certSettingsService";
import { toast } from "sonner";

/* ─── Signature Draw Canvas ─────────────────────────── */
function SignatureCanvas({ onSave, onClose }: { onSave: (b64: string) => void; onClose: () => void }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top)  * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDrawingRef.current = true;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawingRef.current) return;
    const ctx       = canvasRef.current!.getContext("2d")!;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth   = 2.5;
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
    ctx.stroke();
  };

  const stopDraw = () => { isDrawingRef.current = false; };

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const saveSignature = async () => {
    const canvas = canvasRef.current!;
    const b64 = canvas.toDataURL("image/png");
    try {
      toast.loading("Signature upload हो रही है...", { id: "sig-draw" });
      const url = await uploadSignatureToStorage(b64);
      toast.success("Signature save हो गई!", { id: "sig-draw" });
      onSave(url);
    } catch {
      toast.error("Upload failed। पुनः प्रयास करें।", { id: "sig-draw" });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg space-y-5 p-7 border border-indigo-100">
        <div className="flex items-center justify-between">
          <div>
             <div className="flex items-center gap-2">
                <div className="size-6 bg-indigo-600 rounded-lg flex items-center justify-center">
                   <Edit3 className="size-3.5 text-white" />
                </div>
                <h2 className="text-lg font-black text-slate-900">🖊️ Signature Draw करें</h2>
             </div>
            <p className="text-xs text-slate-400 font-medium mt-1">माउस या उंगली से हस्ताक्षर करें</p>
          </div>
          <button onClick={onClose} className="size-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <X className="size-6 text-slate-500" />
          </button>
        </div>

        <div className="border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden bg-slate-50 cursor-crosshair relative shadow-inner">
          <canvas
            ref={canvasRef}
            width={560}
            height={200}
            className="w-full touch-none"
            style={{ display: "block" }}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={clearCanvas}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-xl text-xs uppercase tracking-widest transition-colors"
          >
            <Trash2 className="size-4" /> साफ़ करें
          </button>
          <button
            onClick={saveSignature}
            className="flex-1 flex items-center justify-center gap-3 py-3 bg-indigo-600 text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg"
          >
            <CheckCircle className="size-4" /> Signature Save करें
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────── */
export function CertificateSettings() {
  const [settings, setSettings] = useState<CertAdminSettings>({
    adminName:        "",
    adminDesignation: "Community Admin",
    signatureBase64:  "",
  });
  const [isLoading,       setIsLoading]       = useState(true);
  const [isSaving,        setIsSaving]        = useState(false);
  const [isUploadingSig,  setIsUploadingSig]  = useState(false);
  const [showDrawCanvas,  setShowDrawCanvas]  = useState(false);
  const sigInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await certSettingsService.get();
        if (data) setSettings(data);
      } catch {
        toast.error("Settings load failed.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleSignatureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("केवल Image file upload करें (PNG recommended)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image 5MB से छोटी होनी चाहिए");
      return;
    }
    setIsUploadingSig(true);
    toast.loading("Signature upload हो रही है...", { id: "sig-upload" });
    try {
      // Resize on canvas first, then upload directly to Firebase Storage
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          const maxW   = 600;
          const scale  = img.width > maxW ? maxW / img.width : 1;
          canvas.width  = img.width  * scale;
          canvas.height = img.height * scale;
          canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
          const b64 = canvas.toDataURL("image/png");
          try {
            const downloadUrl = await uploadSignatureToStorage(b64);
            setSettings(prev => ({ ...prev, signatureBase64: downloadUrl, signatureUrl: downloadUrl }));
            toast.success("✅ Signature upload हो गई!", { id: "sig-upload" });
          } catch (uploadErr) {
            console.error(uploadErr);
            toast.error("Firebase upload failed। Internet check करें।", { id: "sig-upload" });
          } finally {
            setIsUploadingSig(false);
            if (sigInputRef.current) sigInputRef.current.value = "";
          }
        };
        img.onerror = () => {
          toast.error("Image read नहीं हो सकी।", { id: "sig-upload" });
          setIsUploadingSig(false);
        };
        img.src = ev.target?.result as string;
      };
      reader.onerror = () => {
        toast.error("File read error।", { id: "sig-upload" });
        setIsUploadingSig(false);
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error("Upload failed।", { id: "sig-upload" });
      setIsUploadingSig(false);
    }
  };

  const handleSave = async () => {
    if (!settings.adminName.trim()) {
      toast.error("Admin का नाम जरूर भरें");
      return;
    }
    setIsSaving(true);
    try {
      await certSettingsService.save(settings);
      toast.success("Settings save हो गई! अब हर Membership Certificate पर यही info आएगी।");
    } catch {
      toast.error("Save नहीं हो सका। पुनः प्रयास करें।");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <RefreshCw className="size-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  const DESIGNATIONS = ["Community Admin", "Adhyaksh", "Mahasachiv", "Sachiv", "Koshaadhyaksh", "Sanyojak"];

  return (
    <>
      {showDrawCanvas && (
        <SignatureCanvas
          onSave={(b64) => { setSettings(prev => ({ ...prev, signatureBase64: b64 })); setShowDrawCanvas(false); }}
          onClose={() => setShowDrawCanvas(false)}
        />
      )}

      <div className="space-y-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* ── Page Header ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="size-14 bg-indigo-600 text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl relative group overflow-hidden">
               <div className="absolute inset-0 bg-white/20 group-hover:scale-150 transition-transform duration-700 rounded-full scale-0"></div>
               <Award className="size-7 relative z-10" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>Community Member card</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                 <ShieldCheck className="size-3 text-emerald-500" /> Administrative Dashboard
              </p>
            </div>
          </div>
          <div className="p-5 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-3xl space-y-2 shadow-sm relative overflow-hidden">
            <div className="size-32 bg-indigo-500/5 rounded-full absolute -right-10 -top-10"></div>
            <div className="flex items-start gap-4 relative z-10">
               <AlertCircle className="size-5 text-indigo-600 mt-0.5 shrink-0" />
               <p className="text-xs text-indigo-900 font-bold leading-relaxed">
                 यहाँ save की गई <strong>Signature</strong> और <strong>Admin Details</strong> हर नए{" "}
                 <strong>Membership Certificate PDF</strong> में automatically apply होंगी।
                 Changes के बाद नए members का certificate इसी signature के साथ generate होगा।
               </p>
            </div>
          </div>
        </div>

        {/* ── Admin Details Section ── */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 space-y-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <User className="size-32" />
          </div>

          <div className="border-l-5 border-indigo-600 pl-5">
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest" style={{ fontFamily: "'Outfit', sans-serif" }}>Admin Details</h2>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">Certificate पर दिखने वाली admin information</p>
          </div>

          <div className="grid grid-cols-1 gap-8 relative z-10">
            {/* Name Input */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-[0.2em] flex items-center gap-2">
                <User className="size-3.5 text-indigo-600" /> Admin का पूरा नाम
              </label>
              <input
                type="text"
                placeholder="Rakesh lakhara"
                value={settings.adminName}
                onChange={e => setSettings(prev => ({ ...prev, adminName: e.target.value }))}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-slate-800 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm placeholder:text-slate-300"
              />
            </div>

            {/* Designation Grid */}
            <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-[0.2em] flex items-center gap-2">
                <Pen className="size-3.5 text-indigo-600" /> पद / Designation
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {DESIGNATIONS.map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSettings(prev => ({ ...prev, adminDesignation: d }))}
                    className={`py-3.5 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all ${
                      settings.adminDesignation === d
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xl scale-105"
                        : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Custom पद लिखें..."
                value={DESIGNATIONS.includes(settings.adminDesignation) ? "" : settings.adminDesignation}
                onChange={e => setSettings(prev => ({ ...prev, adminDesignation: e.target.value }))}
                className="w-full px-5 py-3.5 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-xs font-bold text-slate-600 outline-none focus:border-indigo-600 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* ── Signature Section ── */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 space-y-8 shadow-xl">
          <div className="border-l-5 border-indigo-600 pl-5">
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest" style={{ fontFamily: "'Outfit', sans-serif" }}>Admin Signature</h2>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">Certificate के नीचे-बाईं ओर दिखेगी</p>
          </div>

          <div className="relative z-10">
             {settings.signatureBase64 ? (
               <div className="space-y-6">
                 <div className="bg-slate-50 border-2 border-dashed border-indigo-100 rounded-[2rem] p-8 flex flex-col items-center gap-4 shadow-inner relative overflow-hidden group">
                   <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <img
                     src={settings.signatureBase64}
                     alt="Admin Signature"
                     className="max-h-24 max-w-full object-contain relative z-10 drop-shadow-md"
                   />
                   <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-white px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm relative z-10">
                     <CheckCircle className="size-4 text-emerald-500" /> Signature Live
                   </div>
                 </div>
                 <div className="flex flex-wrap gap-3 justify-center">
                   <button
                     onClick={() => setShowDrawCanvas(true)}
                     className="flex items-center gap-2 px-6 py-3 text-[10px] font-black text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl uppercase tracking-widest transition-all"
                   >
                     <Edit3 className="size-4" /> 🖊️ फिर से Draw करें
                   </button>
                   <label className="flex items-center gap-2 px-6 py-3 text-[10px] font-black text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl uppercase tracking-widest transition-all cursor-pointer">
                     <Image className="size-4" /> 📁 Image Upload करें
                     <input
                       ref={sigInputRef}
                       type="file"
                       accept="image/*"
                       className="hidden"
                       onChange={handleSignatureUpload}
                     />
                   </label>
                   <button
                     onClick={() => {
                       setSettings(prev => ({ ...prev, signatureBase64: "" }));
                       if (sigInputRef.current) sigInputRef.current.value = "";
                     }}
                     className="flex items-center gap-2 px-6 py-3 text-[10px] font-black text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-xl uppercase tracking-widest transition-all"
                   >
                     <Trash2 className="size-4" /> हटाएं
                   </button>
                 </div>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 <button
                   onClick={() => setShowDrawCanvas(true)}
                   className="border-2 border-dashed border-indigo-200 rounded-3xl p-10 text-center hover:border-indigo-600 hover:bg-indigo-50/50 transition-all group flex flex-col items-center shadow-sm"
                 >
                   <div className="size-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                     <Edit3 className="size-8" />
                   </div>
                   <p className="text-sm font-black text-slate-800 uppercase tracking-widest">🖊️ Signature Draw करें</p>
                   <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">माउस या उंगली से हस्ताक्षर करें</p>
                 </button>

                 <label className="block cursor-pointer">
                   <div className={`border-2 border-dashed rounded-3xl p-10 text-center h-full transition-all group flex flex-col items-center shadow-sm ${isUploadingSig ? "border-indigo-600 bg-indigo-50" : "border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/50"}`}>
                     <div className="size-16 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mb-5 group-hover:rotate-12 transition-transform">
                       <Upload className="size-8" />
                     </div>
                     <p className="text-sm font-black text-slate-800 uppercase tracking-widest">
                       {isUploadingSig ? "Uploading..." : "📁 Image Upload करें"}
                     </p>
                     <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-wide">PNG (transparent) • Max 2MB</p>
                   </div>
                   <input
                     ref={sigInputRef}
                     type="file"
                     accept="image/*"
                     className="hidden"
                     onChange={handleSignatureUpload}
                     disabled={isUploadingSig}
                   />
                 </label>
               </div>
             )}
          </div>
        </div>

        {/* ── Live Preview Section ── */}
        {(settings.adminName || settings.signatureBase64) && (
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-xl space-y-8 animate-in zoom-in duration-500">
            <div className="border-l-5 border-emerald-500 pl-5">
              <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest" style={{ fontFamily: "'Outfit', sans-serif" }}>Live Preview</h2>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">Certificate में नीचे-बाईं ओर ऐसा दिखेगा</p>
            </div>

            <div className="flex justify-center">
               <div
                 className="rounded-3xl p-8 flex flex-col items-center gap-1 min-w-[300px] shadow-lg relative overflow-hidden"
                 style={{ 
                    background: "linear-gradient(135deg, #fffbf0 0%, #fdf5e6 100%)", 
                    border: "3px solid #0f5132",
                    boxShadow: "inset 0 0 20px rgba(15,81,50,0.05)"
                 }}
               >
                 <div className="absolute top-2 right-4 opacity-10">
                    <img src="/brand-logo.png" className="size-16 object-contain" />
                 </div>
                 
                 {settings.signatureBase64 ? (
                   <img
                     src={settings.signatureBase64}
                     alt="sig preview"
                     className="max-h-20 max-w-[240px] object-contain mb-2 drop-shadow-sm rotate-[-2deg]"
                   />
                 ) : (
                    <div className="h-16 flex items-end pb-2 opacity-20">
                       <Pen className="size-10 text-slate-300" />
                    </div>
                 )}
                 <div className="w-48 h-0.5 bg-slate-800"></div>
                 <p className="text-sm font-black text-slate-900 mt-2 uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                   {settings.adminName || "Rakesh lakhara"}
                 </p>
                 <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: "#0d4a28" }}>
                   {settings.adminDesignation}
                 </p>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">LAKHARA SAMAJ COMMUNITY</p>
               </div>
            </div>
          </div>
        )}

        {/* ── Save Button ── */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-5 bg-slate-900 border-b-6 border-slate-950 text-white font-black rounded-3xl text-sm uppercase tracking-[0.3em] hover:bg-indigo-700 hover:border-indigo-900 transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center gap-4 relative overflow-hidden group active:translate-y-1 active:border-b-2"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          <Save className="size-6 group-hover:scale-125 transition-transform" />
          {isSaving ? "SYNCING..." : "Save Certificate Settings"}
        </button>
      </div>
    </>
  );
}

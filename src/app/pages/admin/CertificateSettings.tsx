import { useState, useEffect, useRef, useCallback } from "react";
import {
  Upload, Save, Pen, User, Award, CheckCircle,
  RefreshCw, AlertCircle, Trash2, Edit3, Image, X
} from "lucide-react";
import { certSettingsService, CertAdminSettings } from "../../services/certSettingsService";
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

  const saveSignature = () => {
    const canvas = canvasRef.current!;
    onSave(canvas.toDataURL("image/png"));
    toast.success("Signature save हो गई!");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg space-y-5 p-7">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">Signature Draw करें</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">नीचे box में माउस / उंगली से हस्ताक्षर करें</p>
          </div>
          <button onClick={onClose} className="size-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <X className="size-5 text-slate-600" />
          </button>
        </div>

        <div className="border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden bg-slate-50 cursor-crosshair">
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
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-sm transition-colors"
          >
            <Trash2 className="size-4" /> साफ़ करें
          </button>
          <button
            onClick={saveSignature}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-all shadow"
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

  /* ── Upload image signature ── */
  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("केवल Image file upload करें (PNG recommended)");
      return;
    }
    setIsUploadingSig(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img   = new Image();
      img.onload  = () => {
        const canvas  = document.createElement("canvas");
        const maxW    = 500;
        const scale   = img.width > maxW ? maxW / img.width : 1;
        canvas.width  = img.width  * scale;
        canvas.height = img.height * scale;
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        setSettings(prev => ({ ...prev, signatureBase64: canvas.toDataURL("image/png") }));
        setIsUploadingSig(false);
        toast.success("Signature upload हो गई!");
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  /* ── Save to Firestore ── */
  const handleSave = async () => {
    if (!settings.adminName.trim()) {
      toast.error("Admin का नाम जरूर भरें");
      return;
    }
    setIsSaving(true);
    try {
      await certSettingsService.save(settings);
      toast.success("Certificate settings save हो गई! सभी नए certificates में यह info आएगी।");
    } catch {
      toast.error("Save नहीं हो सका। पुनः प्रयास करें।");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <RefreshCw className="size-8 text-primary animate-spin" />
      </div>
    );
  }

  const DESIGNATIONS = ["Community Admin", "Adhyaksh", "Mahasachiv", "Sachiv", "Koshaadhyaksh", "Sanyojak"];

  return (
    <>
      {/* ── Draw Canvas Modal ── */}
      {showDrawCanvas && (
        <SignatureCanvas
          onSave={(b64) => { setSettings(prev => ({ ...prev, signatureBase64: b64 })); setShowDrawCanvas(false); }}
          onClose={() => setShowDrawCanvas(false)}
        />
      )}

      <div className="space-y-8 max-w-2xl mx-auto">

        {/* ── Header ── */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-orange-50 text-primary rounded-xl flex items-center justify-center">
              <Award className="size-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Certificate Settings</h1>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Community Membership Certificate • Admin Panel</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <AlertCircle className="size-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-800 font-semibold leading-relaxed">
              यहाँ save की गई <strong>Signature</strong> और <strong>Admin Details</strong> हर नए{" "}
              <strong>Membership Certificate PDF</strong> में automatically apply होंगी।
              Changes के बाद नए members का certificate इसी signature के साथ generate होगा।
            </p>
          </div>
        </div>

        {/* ── Admin Name & Designation ── */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-base font-black text-slate-800 uppercase tracking-wider">Admin Details</h2>
            <p className="text-xs text-slate-400 font-medium">Certificate पर दिखने वाली admin information</p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <User className="size-3.5" /> Admin का पूरा नाम
              </label>
              <input
                type="text"
                placeholder="जैसे: Rajesh Kumar Lakhara"
                value={settings.adminName}
                onChange={e => setSettings(prev => ({ ...prev, adminName: e.target.value }))}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-primary transition-colors placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Pen className="size-3.5" /> पद / Designation
              </label>
              <div className="grid grid-cols-3 gap-3">
                {DESIGNATIONS.map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSettings(prev => ({ ...prev, adminDesignation: d }))}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition-all text-center ${
                      settings.adminDesignation === d
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
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
                className="w-full px-4 py-2.5 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-primary transition-colors placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* ── Signature Section ── */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-base font-black text-slate-800 uppercase tracking-wider">Admin Signature</h2>
            <p className="text-xs text-slate-400 font-medium">Certificate के नीचे-बाईं ओर दिखेगी</p>
          </div>

          {settings.signatureBase64 ? (
            /* ── Signature Preview ── */
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center gap-4">
                <img
                  src={settings.signatureBase64}
                  alt="Admin Signature"
                  className="max-h-28 max-w-xs object-contain"
                />
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                  <CheckCircle className="size-4" /> Signature ready for certificate
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => setShowDrawCanvas(true)}
                  className="flex items-center gap-2 px-5 py-2 text-xs font-black text-primary border border-primary/30 bg-orange-50 hover:bg-orange-100 rounded-xl uppercase tracking-widest transition-colors"
                >
                  <Edit3 className="size-3.5" /> फिर से Draw करें
                </button>
                <label className="flex items-center gap-2 px-5 py-2 text-xs font-black text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-xl uppercase tracking-widest transition-colors cursor-pointer">
                  <Image className="size-3.5" /> Image Upload करें
                  <input
                    ref={sigInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleSignatureUpload}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setSettings(prev => ({ ...prev, signatureBase64: "" }));
                    if (sigInputRef.current) sigInputRef.current.value = "";
                  }}
                  className="flex items-center gap-2 px-5 py-2 text-xs font-black text-red-500 border border-red-200 bg-red-50 hover:bg-red-100 rounded-xl uppercase tracking-widest transition-colors"
                >
                  <Trash2 className="size-3.5" /> हटाएं
                </button>
              </div>
            </div>
          ) : (
            /* ── Upload / Draw options ── */
            <div className="grid grid-cols-1 gap-4">
              {/* Draw option */}
              <button
                type="button"
                onClick={() => setShowDrawCanvas(true)}
                className="border-2 border-dashed border-primary/40 rounded-2xl p-8 text-center hover:border-primary hover:bg-orange-50/50 transition-all group"
              >
                <div className="size-14 bg-orange-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Edit3 className="size-6" />
                </div>
                <p className="text-sm font-black text-slate-700">🖊️ Signature Draw करें</p>
                <p className="text-xs text-slate-400 font-medium mt-1">माउस या उंगली से हस्ताक्षर करें</p>
              </button>

              {/* Upload option */}
              <label className="block cursor-pointer">
                <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${isUploadingSig ? "border-primary bg-orange-50" : "border-slate-300 hover:border-primary hover:bg-orange-50/50"}`}>
                  <div className="size-14 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="size-6" />
                  </div>
                  <p className="text-sm font-black text-slate-700">
                    {isUploadingSig ? "Upload हो रही है..." : "📁 Signature Image Upload करें"}
                  </p>
                  <p className="text-xs text-slate-400 font-medium mt-1">PNG (transparent background) • Max 2MB</p>
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

        {/* ── Live Certificate Preview ── */}
        {(settings.adminName || settings.signatureBase64) && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-5">
            <div className="border-l-4 border-green-500 pl-4">
              <h2 className="text-base font-black text-slate-800 uppercase tracking-wider">Live Preview</h2>
              <p className="text-xs text-slate-400 font-medium">Certificate में नीचे-बाईं ओर ऐसा दिखेगा</p>
            </div>

            {/* Mini certificate preview */}
            <div
              className="rounded-2xl p-6 inline-flex flex-col items-start gap-1 min-w-[240px]"
              style={{ background: "linear-gradient(135deg,#faf6eb,#f3e9cc)", border: "2px solid #c9a227" }}
            >
              {settings.signatureBase64 ? (
                <img
                  src={settings.signatureBase64}
                  alt="sig preview"
                  className="max-h-16 max-w-[200px] object-contain mb-1"
                />
              ) : (
                <div className="h-12 flex items-end pb-1">
                  <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
                    <path d="M8 32 Q24 8 40 24 Q56 38 72 16 Q88 4 110 20" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
              <div className="w-40 h-0.5 bg-slate-600"></div>
              <p
                className="text-xs font-bold text-slate-800 mt-1 uppercase tracking-wide"
                style={{ fontFamily: "serif" }}
              >
                {settings.adminName || "Admin Name"}
              </p>
              <p className="text-xs font-semibold" style={{ color: "#0d4a28" }}>
                {settings.adminDesignation}
              </p>
              <p className="text-xs text-slate-500 font-medium">LAKHARA SAMAJ COMMUNITY</p>
            </div>
          </div>
        )}

        {/* ── Save Button ── */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-4 bg-gradient-to-r from-primary to-orange-500 text-white font-black rounded-2xl text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
        >
          <Save className="size-5" />
          {isSaving ? "Saving..." : "Save Certificate Settings"}
        </button>
      </div>
    </>
  );
}

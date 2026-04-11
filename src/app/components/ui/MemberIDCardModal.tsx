import { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, X, CreditCard, Camera, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { certSettingsService, CertAdminSettings } from "../../services/certSettingsService";

interface Props {
  member: {
    id: string;
    memberId?: string;
    name: string;
    fatherName: string;
    city: string;
    occupation?: string;
    phone?: string;
    photoUrl?: string;
    memberNumber?: string;
    bloodGroup?: string;
  };
  onClose: () => void;
}

export function MemberIDCardModal({ member, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [adminSettings, setAdminSettings] = useState<CertAdminSettings | null>(null);

  // ID Format: LS-000001
  const memberId = member.memberId || `LS-${(member.memberNumber || member.id?.slice(-5) || "000001").toUpperCase()}`;
  const issueDate = new Date().toLocaleDateString("en-GB"); 
  const expiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toLocaleDateString("en-GB");

  useEffect(() => {
    (async () => {
       const settings = await certSettingsService.get();
       setAdminSettings(settings);
    })();
  }, []);

  const downloadCard = async () => {
    if (!cardRef.current) return;
    const toastId = toast.loading("HQ Digital Card तैयार हो रहा है...");
    
    try {
      const element = cardRef.current;
      const canvas = await html2canvas(element, { 
        scale: 4, 
        useCORS: true, 
        logging: false,
        backgroundColor: "#faf8f3",
        width: 255, 
        height: 405, 
      });
      
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      
      const pdf = new jsPDF({ 
        orientation: "portrait", 
        unit: "in", 
        format: [2.125, 3.375] 
      });
      
      pdf.addImage(imgData, "JPEG", 0, 0, 2.125, 3.375);
      pdf.save(`LS_MEMBER_CARD_${member.name.replace(/\s+/g, "_")}.pdf`);
      
      toast.dismiss(toastId);
      toast.success("ID Card Downloaded!");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Process failed.");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-500">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-7 border-b border-slate-100 bg-slate-50/30">
          <div className="flex items-center gap-4">
             <div className="size-12 bg-[#1a237e] text-white rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent"></div>
                <ShieldCheck className="size-6 relative z-10" />
             </div>
             <div>
                <h2 className="font-black text-slate-800 text-xl leading-none uppercase tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>Member Profile</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-1">Official ID Standard</p>
             </div>
          </div>
          <button onClick={onClose} className="size-11 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all active:scale-95">
            <X className="size-7 text-slate-300" />
          </button>
        </div>

        {/* 🏛️ CARD DISPLAY 🏛️ */}
        <div className="p-10 flex justify-center bg-slate-50/50">
          <div
            id="id-card-element"
            ref={cardRef}
            style={{
              width: "255px",
              height: "405px",
              background: "#faf8f3", 
              borderRadius: "0px", 
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              color: "#1a237e",
              fontFamily: "'Outfit', 'Noto Sans Devanagari', sans-serif",
              backgroundColor: "#faf8f3",
              boxShadow: "0 0 40px rgba(0,0,0,0.1)"
            }}
          >
            {/* Top Bar (Navy) */}
            <div style={{ height: "42px", background: "#1a237e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", zIndex: 10 }}>
               <div style={{ fontSize: "8px", fontWeight: 900, color: "#c9a227", letterSpacing: "1px" }}>LS COMMUNITY</div>
               <div style={{ fontSize: "6.5px", fontWeight: 700, color: "#fff", opacity: 0.8, textTransform: "uppercase" }}>Identity Portfolio</div>
            </div>

            {/* Photo & Emblem Row */}
            <div style={{ padding: "12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 10 }}>
               <div style={{ width: "65px", height: "82px", border: "2px solid #c9a227", padding: "2px", background: "#fff", position: "relative" }}>
                  <div style={{ width: "100%", height: "100%", background: "#f0f0f0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                     {member.photoUrl ? (
                        <img src={member.photoUrl} alt="Photo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                     ) : (
                        <Camera className="size-5 text-slate-300" />
                     )}
                  </div>
                  {/* Small Camera Icon Badge */}
                  <div style={{ position: "absolute", bottom: "-6px", right: "-6px", background: "#c9a227", padding: "3px", borderRadius: "5px", color: "#fff" }}>
                     <Camera style={{ width: "8px", height: "8px" }} />
                  </div>
               </div>

               <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px" }}>
                  <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#fff", border: "2px solid #1a237e", padding: "2px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
                     <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src="/lakhara-logo.png" style={{ width: "85%", height: "85%", objectFit: "contain" }} crossOrigin="anonymous" />
                     </div>
                  </div>
                  <div style={{ fontSize: "7px", fontWeight: 900, color: "#c9a227", letterSpacing: "1px" }}>PROUD MEMBER</div>
               </div>
            </div>

            {/* Org Name (Hindi) */}
            <div style={{ textAlign: "center", padding: "0 15px", zIndex: 10, marginTop: "2px" }}>
               <div style={{ fontSize: "9px", fontWeight: 950, color: "#1a237e", lineHeight: 1.2 }}>
                  अखिल राजस्थान हिंदु लखेरा महासभा, जयपुर राज.
               </div>
               <div style={{ fontSize: "6.5px", fontWeight: 900, color: "#856404", marginTop: "2px" }}>ARHLM | REG: 205715</div>
               <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #c9a227, transparent)", width: "80%", margin: "4px auto" }}></div>
            </div>

            {/* ░░ DYNAMIC FIELDS ░░ */}
            <div style={{ flexGrow: 1, padding: "2px 18px", display: "flex", flexDirection: "column", gap: "6px", zIndex: 10 }}>
               {[
                 { label: ["FULL NAME", "पूरा नाम"], val: member.name.toUpperCase(), isTitle: true },
                 { label: ["MEMBER ID", "संख्या"], val: memberId },
                 { label: ["VALID TILL", "वैधता"], val: expiryDate },
                 { label: ["BLOOD GROUP", "रक्त समूह"], val: member.bloodGroup || "O+", color: "#b91c1c" }
               ].map((f, i) => (
                 <div key={i} style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #1a237e15", paddingBottom: "1px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                       <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontSize: "4.5px", fontWeight: 900, color: "#c9a227", letterSpacing: "0.5px" }}>{f.label[0]}</span>
                          <span style={{ fontSize: "5.5px", fontWeight: 900, color: "#1a237e", marginTop: "-1px" }}>{f.label[1]}</span>
                       </div>
                       <span style={{ 
                         fontSize: f.isTitle ? "11.5px" : "9.5px", 
                         fontWeight: 950, 
                         color: f.color || "#000",
                         fontFamily: "'Outfit', sans-serif"
                       }}>
                         {f.val}
                       </span>
                    </div>
                 </div>
               ))}
            </div>

            {/* ░░ SIGNATURE SECTION (FROM ADMIN PANEL) ░░ */}
            <div style={{ padding: "5px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", zIndex: 10 }}>
               <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "5px", fontWeight: 900, color: "#c9a227" }}>VERIFIED IDENTITY</div>
                  <div style={{ fontSize: "8px", fontWeight: 900, color: "#1a237e" }}>🔱 LS-ADMIN</div>
               </div>
               
               {adminSettings?.signatureBase64 && (
                 <div style={{ textAlign: "center", position: "relative" }}>
                    <img 
                      src={adminSettings.signatureBase64} 
                      alt="Signature" 
                      style={{ height: "24px", width: "auto", objectFit: "contain", marginBottom: "-2px" }} 
                      crossOrigin="anonymous" 
                    />
                    <div style={{ height: "1px", background: "#333", width: "50px", margin: "0 auto" }}></div>
                    <div style={{ fontSize: "5px", fontWeight: 950, color: "#333", marginTop: "1px" }}>AUTHORIZED SIGN</div>
                 </div>
               )}
            </div>

            {/* Footer */}
            <div style={{ padding: "8px 15px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", zIndex: 10, marginTop: "auto" }}>
               <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", marginBottom: "1px" }}>
                  <div style={{ flex: 1, height: "1px", background: "#c9a227" }}></div>
                  <div style={{ fontSize: "12px", color: "#c9a227" }}>⚜</div>
                  <div style={{ flex: 1, height: "1px", background: "#c9a227" }}></div>
               </div>
               
               <div style={{ fontSize: "6.5px", fontWeight: 950, color: "#c9a227", letterSpacing: "0.5px" }}>WWW.LAKHARA-NEWS-WEBSITE.COM</div>
               
               {/* Wax Seal Overlay */}
               <div style={{ position: "absolute", bottom: "10px", right: "12px", width: "28px", height: "28px", background: "radial-gradient(circle at 30% 30%, #c9a227, #856404)", borderRadius: "50%", border: "1.5px solid #5a4a02", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 8px rgba(0,0,0,0.3)" }}>
                  <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)", fontWeight: 900 }}>🔱</div>
               </div>
            </div>

            {/* Bottom Pattern Border */}
            <div style={{ height: "4px", background: "repeating-linear-gradient(90deg, #1a237e 0, #1a237e 6px, #c9a227 6px, #c9a227 8px)" }}></div>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-10 pb-10">
          <button
            onClick={downloadCard}
            className="w-full flex items-center justify-center gap-4 py-4 bg-[#1a237e] hover:bg-black text-white font-black rounded-3xl text-sm shadow-2xl transition-all group"
          >
            <Download className="size-5 group-hover:translate-y-0.5 transition-transform" />
            Download Signed ID Card
          </button>
          <p className="text-center text-[9px] font-bold text-slate-400 mt-4 uppercase tracking-[0.3em]">Verified Community Identity • ARHLM</p>
        </div>
      </div>
    </div>
  );
}

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import { certSettingsService } from "../services/certSettingsService";

export interface MembershipCertData {
  memberId: string;
  memberNumber: string;
  name: string;
  fatherName: string;
  address: string;
  city: string;
  district?: string;
  dateOfIssue: string;
  phone?: string;
}

/* ── Load any image → base64 ──────────────────────────────── */
async function imgToBase64(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width  = img.naturalWidth  || 300;
      c.height = img.naturalHeight || 300;
      c.getContext("2d")!.drawImage(img, 0, 0);
      resolve(c.toDataURL("image/png"));
    };
    img.onerror = () => resolve("");
    img.src = src + "?t=" + Date.now();
  });
}

/* ── Generate QR code as base64 ──────────────────────────── */
async function generateQR(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 150,
      margin: 1,
      color: { dark: "#0f5132", light: "#fffaf0" },
    });
  } catch {
    return "";
  }
}

/* ─── MAIN EXPORT ────────────────────────────────────────── */
export async function generateMembershipPDF(data: MembershipCertData): Promise<void> {
  const verifyUrl = `https://rakeshlakhara432.github.io/lakhara-news-website/#/verify/${data.memberId}`;

  const [logoB64, qrB64, adminSettings] = await Promise.all([
    imgToBase64("/lakhara-logo.png").then(r => r || imgToBase64("/brand-logo.png")),
    generateQR(verifyUrl),
    certSettingsService.get().catch(() => null),
  ]);

  const adminName  = adminSettings?.adminName        || "RAKESH LAKHARA";
  const adminDesig = adminSettings?.adminDesignation || "CHAIRMAN / ADHYAKSH";
  const sigB64     = adminSettings?.signatureBase64  || "";

  /* Landscape A4 = 1123 × 794 px @ 96 dpi */
  const W = 1123;
  const H = 794;

  const joiningDate     = data.dateOfIssue.toUpperCase();
  const year            = new Date().getFullYear();
  // Ensure ID format LSC2025XXXX
  const finalMemberId   = `LSC${year}${data.memberNumber.padStart(4, "0")}`;

  /* ── Container div rendered off-screen ─────────────────── */
  const wrap = document.createElement("div");
  wrap.style.cssText = `
    position:fixed;left:-9999px;top:0;
    width:${W}px;height:${H}px;
    overflow:hidden;
    font-family:'Noto Sans Devanagari','Segoe UI',Arial,sans-serif;
    box-sizing:border-box;
    background:#fff;
  `;

  wrap.innerHTML = `
  <!-- ░░ PREMIUM CREAM/OFF-WHITE BACKGROUND ░░ -->
  <div style="position:absolute;inset:0;
    background:linear-gradient(135deg,#fffbf0 0%,#fdf5e6 50%,#fffbf0 100%);
  "></div>

  <!-- ░░ WATERMARK LOGO ░░ -->
  <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:0;opacity:0.04;pointer-events:none;">
    ${logoB64 ? `<img src="${logoB64}" style="width:500px;filter:grayscale(1) contrast(2);" />` : ""}
  </div>

  <!-- ░░ OUTER BHAGVA (SAFFRON) BORDER ░░ -->
  <div style="position:absolute;inset:0;border:12px solid #ff9933;box-sizing:border-box;z-index:10;pointer-events:none;"></div>
  
  <!-- INNER DARK GREEN BORDER -->
  <div style="position:absolute;inset:18px;border:3px solid #0f5132;box-sizing:border-box;z-index:10;pointer-events:none;"></div>
  
  <!-- INNER GOLD THIN BORDER -->
  <div style="position:absolute;inset:24px;border:1px solid #d4af37;box-sizing:border-box;z-index:10;pointer-events:none;"></div>

  <!-- ░░ CORNER ORNAMENTS ░░ -->
  ${["top:15px;left:15px", "top:15px;right:15px", "bottom:15px;left:15px", "bottom:15px;right:15px"].map(pos => `
    <div style="position:absolute;${pos};width:35px;height:35px;background:#0f5132;z-index:20;display:flex;align-items:center;justify-content:center;border:2px solid #ff9933;">
        <div style="width:20px;height:20px;background:#d4af37;transform:rotate(45deg);"></div>
    </div>
  `).join("")}

  <!-- ══════════════════════════════════════════════════════ -->
  <!-- ░░ HEADER SECTION ░░                                   -->
  <!-- ══════════════════════════════════════════════════════ -->
  <div style="position:absolute;top:35px;left:0;right:0;text-align:center;z-index:20;display:flex;flex-direction:column;align-items:center;">
    
    <!-- SAFFRON HEADER BOX -->
    <div style="
        background:linear-gradient(90deg,#ff8c00,#ff9933,#ff8c00);
        padding:20px 80px;
        border-radius:0 0 40px 40px;
        border:4px solid #0f5132;
        border-top:none;
        box-shadow:0 10px 30px rgba(0,0,0,0.15);
        position:relative;
    ">
        <h1 style="margin:0;font-size:42px;font-weight:950;color:#0f5132;letter-spacing:4px;text-transform:uppercase;text-shadow:2px 2px 0 rgba(255,255,255,0.3);">
            LAKHARA SAMAJ COMMUNITY
        </h1>
        <div style="font-size:14px;font-weight:800;color:#fff;letter-spacing:6px;margin-top:5px;text-shadow:1px 1px 2px rgba(0,0,0,0.2);">
            Ekta • Parampara • Pragati
        </div>
    </div>

    <!-- MAIN BANNER -->
    <div style="
        margin-top:20px;
        background:#0f5132;
        padding:12px 60px;
        border:3px solid #d4af37;
        color:#d4af37;
        font-size:24px;
        font-weight:900;
        letter-spacing:4px;
        text-transform:uppercase;
        border-radius:6px;
        box-shadow:0 5px 15px rgba(15,81,50,0.3);
    ">
       COMMUNITY MEMBERSHIP CERTIFICATE
    </div>
  </div>

  <!-- LOGO TOP-LEFT -->
  <div style="position:absolute;top:50px;left:60px;z-index:30;">
     <div style="width:110px;height:110px;border-radius:50%;background:#fff;border:4px solid #ff9933;box-shadow:0 0 20px rgba(255,153,51,0.5);display:flex;align-items:center;justify-content:center;overflow:hidden;">
        <img src="${logoB64}" style="width:95%;height:95%;object-fit:contain;" />
     </div>
  </div>

  <!-- ══════════════════════════════════════════════════════ -->
  <!-- ░░ LEFT SECTION: HINDI MESSAGE ░░                    -->
  <!-- ══════════════════════════════════════════════════════ -->
  <div style="position:absolute;top:280px;left:70px;width:440px;z-index:20;">
     <div style="font-size:42px;font-weight:900;color:#ff8c00;margin-bottom:15px;line-height:1;text-shadow:1px 1px 2px rgba(0,0,0,0.15);">हार्दिक बधाई!</div>
     <div style="font-size:16px;font-weight:700;line-height:1.9;color:#222;font-family:'Noto Sans Devanagari',serif;">
        आपका लखारा समाज कम्युनिटी में स्वागत है!<br/>
        आपके जुड़ने से हमारी एकता और मजबूत हुई है।<br/>
        हम आशा करते हैं कि आप समाज की तरक्की, सहयोग और<br/>
        परंपराओं को आगे बढ़ाने में अपना योगदान देंगे।<br/>
     </div>
     <div style="margin-top:20px;font-size:22px;font-weight:950;color:#0f5132;border-left:5px solid #ff8c00;padding-left:15px;letter-spacing:1px;">
        एकजुट रहें, आगे बढ़ें! 🙏
     </div>

     <!-- SIGNATURE AREA -->
     <div style="margin-top:70px;text-align:left;">
        <div style="width:200px;border-bottom:2px solid #333;margin-bottom:8px;position:relative;">
            ${sigB64 ? `<img src="${sigB64}" style="height:60px;position:absolute;bottom:0;left:10px;" />` : ""}
        </div>
        <div style="font-size:14px;font-weight:900;color:#111;text-transform:uppercase;">${adminName}</div>
        <div style="font-size:11px;font-weight:900;color:#0f5132;text-transform:uppercase;letter-spacing:1px;">${adminDesig}</div>
     </div>
  </div>

  <!-- ══════════════════════════════════════════════════════ -->
  <!-- ░░ RIGHT SECTION: DYNAMIC DATA BOX ░░                 -->
  <!-- ══════════════════════════════════════════════════════ -->
  <div style="position:absolute;top:280px;right:70px;width:480px;z-index:20;">
     
     <!-- DATA BOX CONTAINER -->
     <div style="background:rgba(255,255,255,0.7);border:3px solid #0f5132;border-radius:12px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08);">
        <div style="background:#0f5132;padding:12px;text-align:center;color:#ff9933;font-weight:950;font-size:16px;letter-spacing:3px;">
           MEMBER DATA
        </div>
        <div style="padding:15px 25px;">
           ${[
             ["MEMBER ID",      finalMemberId],
             ["MEMBER NUMBER",  data.memberNumber.padStart(4, "0")],
             ["FULL NAME",      data.name.toUpperCase()],
             ["FATHER'S NAME",  data.fatherName.toUpperCase()],
             ["VILLAGE / CITY", (data.city + (data.district ? ", " + data.district : "")).toUpperCase()],
             ["JOINING DATE",   joiningDate],
           ].map(([lbl, val], idx) => `
             <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:${idx === 5 ? "none" : "1px solid rgba(15,81,50,0.2)"};">
                <span style="font-size:11px;font-weight:900;color:#555;letter-spacing:1px;">${lbl}</span>
                <span style="font-size:13px;font-weight:900;color:#0f5132;text-align:right;">${val}</span>
             </div>
           `).join("")}
        </div>
     </div>

     <!-- BADGE + QR -->
     <div style="margin-top:40px;display:flex;align-items:flex-end;justify-content:space-between;">
        
        <!-- PROUD MEMBER BADGE -->
        <div style="
            width:120px;height:120px;border-radius:50%;
            background:linear-gradient(135deg,#d4af37,#ff9933,#d4af37);
            border:4px solid #0f5132;
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            box-shadow:0 8px 25px rgba(0,0,0,0.3);
            text-align:center;color:#0f5132;
        ">
            <div style="font-size:10px;font-weight:950;letter-spacing:1px;">PROUD</div>
            <div style="font-size:10px;font-weight:950;letter-spacing:1px;">MEMBER</div>
            <div style="font-size:32px;margin:2px 0;">✨</div>
            <div style="font-size:7px;font-weight:900;line-height:1.2;">LAKHARA SAMAJ<br/>COMMUNITY</div>
        </div>

        <!-- QR CODE -->
        <div style="text-align:center;">
           <div style="background:#fff;padding:8px;border:2px solid #0f5132;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
              <img src="${qrB64}" style="width:90px;height:90px;" />
           </div>
           <div style="font-size:8px;font-weight:950;color:#0f5132;margin-top:5px;letter-spacing:1px;">VERIFY ONLINE</div>
        </div>

     </div>
  </div>

  <!-- FOOTER QUOTE -->
  <div style="position:absolute;bottom:45px;left:0;right:0;text-align:center;z-index:20;padding:0 80px;">
     <div style="height:2px;background:linear-gradient(90deg,transparent,#0f5132,transparent);width:70%;margin:0 auto 10px;"></div>
     <div style="font-size:16px;color:#333;font-weight:700;font-style:italic;line-height:1.6;">
        "हमारी पहचान, हमारी विरासत... लखारा समाज - <span style="color:#ff8c00;font-weight:950;">एक परिवार, एक विश्वास!"</span>
     </div>
  </div>

  `;

  document.body.appendChild(wrap);
  // Wait for fonts and images to settle
  await new Promise(r => setTimeout(r, 1200));

  const canvas = await html2canvas(wrap, {
    scale:           3.0, // High res
    useCORS:         true,
    logging:         false,
    backgroundColor: null,
    width:           W,
    height:          H,
  });

  document.body.removeChild(wrap);

  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: "a4" });
  const pw  = pdf.internal.pageSize.getWidth();
  const ph  = pdf.internal.pageSize.getHeight();
  pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, pw, ph);
  pdf.save(`LAKHARA_SAMAJ_CERTIFICATE_${data.memberId}.pdf`);
}

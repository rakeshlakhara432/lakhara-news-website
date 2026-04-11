import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
}

async function imgToBase64(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth || 200;
      c.height = img.naturalHeight || 200;
      c.getContext("2d")!.drawImage(img, 0, 0);
      resolve(c.toDataURL("image/png"));
    };
    img.onerror = () => resolve("");
    img.src = src + "?t=" + Date.now();
  });
}

/* ─── Main export ─────────────────────────────────────── */
export async function generateMembershipPDF(data: MembershipCertData): Promise<void> {
  // Load logo + admin settings in parallel
  const [logoB64, adminSettings] = await Promise.all([
    imgToBase64("/lakhara-logo.png"),
    certSettingsService.get().catch(() => null),
  ]);

  const adminName        = adminSettings?.adminName        || "Community Admin";
  const adminDesig       = adminSettings?.adminDesignation || "COMMUNITY ADMIN";
  const sigB64           = adminSettings?.signatureBase64  || "";

  // Landscape A4: 1123 × 794 px at 96dpi
  const W = 1123;
  const H = 794;

  const wrap = document.createElement("div");
  wrap.style.cssText = `
    position:fixed; left:-9999px; top:0;
    width:${W}px; height:${H}px;
    overflow:hidden;
    font-family:'Noto Sans Devanagari','Segoe UI',Arial,sans-serif;
    box-sizing:border-box;
  `;

  const joiningDate     = data.dateOfIssue.toUpperCase();
  const memberIdDisplay = `LSC${new Date().getFullYear()}${data.memberNumber.padStart(4, "0")}`;

  wrap.innerHTML = `
  <!-- ░ CREAM PARCHMENT BACKGROUND ░ -->
  <div style="position:absolute;inset:0;background:linear-gradient(135deg,#faf6eb 0%,#f3e9cc 55%,#ece0b5 100%);"></div>

  <!-- ░ TOP-LEFT DARK GREEN TRIANGLE CORNER ░ -->
  <div style="position:absolute;top:0;left:0;width:300px;height:300px;overflow:hidden;z-index:1;">
    <div style="
      position:absolute;top:0;left:0;
      width:340px;height:340px;
      background:linear-gradient(135deg,#0d4a28 0%,#1a7040 70%,transparent 100%);
      clip-path:polygon(0 0,100% 0,0 100%);
    "></div>
  </div>

  <!-- ░ BOTTOM-RIGHT DARK GREEN TRIANGLE CORNER ░ -->
  <div style="position:absolute;bottom:0;right:0;width:300px;height:300px;overflow:hidden;z-index:1;">
    <div style="
      position:absolute;bottom:0;right:0;
      width:340px;height:340px;
      background:linear-gradient(315deg,#0d4a28 0%,#1a7040 70%,transparent 100%);
      clip-path:polygon(100% 0,100% 100%,0 100%);
    "></div>
  </div>

  <!-- ░ TOP-RIGHT GOLD ARC ░ -->
  <div style="
    position:absolute;top:0;right:0;
    width:180px;height:180px;
    border-bottom-left-radius:100%;
    background:linear-gradient(135deg,#b8860b 0%,#d4a017 40%,#f0c040 60%,#c9a227 100%);
    z-index:2;
  "></div>

  <!-- ░ BOTTOM-LEFT GOLD ARC ░ -->
  <div style="
    position:absolute;bottom:0;left:0;
    width:180px;height:180px;
    border-top-right-radius:100%;
    background:linear-gradient(315deg,#b8860b 0%,#d4a017 40%,#f0c040 60%,#c9a227 100%);
    z-index:2;
  "></div>

  <!-- ░ OUTER GOLD BORDER ░ -->
  <div style="position:absolute;inset:0;border:9px solid #c9a227;box-sizing:border-box;pointer-events:none;z-index:10;"></div>
  <!-- Inner thin gold border -->
  <div style="position:absolute;inset:16px;border:2px solid #c9a22755;box-sizing:border-box;pointer-events:none;z-index:10;"></div>

  <!-- ═══════════════════════════════════════════════════ -->
  <!-- ░ TOP HEADER SECTION ░ -->
  <!-- ═══════════════════════════════════════════════════ -->
  <div style="
    position:absolute;top:30px;left:32px;right:32px;
    display:flex;align-items:center;
    gap:20px;
    z-index:20;
    padding:0 10px;
  ">
    <!-- Logo in gold circle -->
    <div style="
      width:115px;height:115px;
      border-radius:50%;
      border:4px solid #c9a227;
      background:#fff;
      overflow:hidden;
      flex-shrink:0;
      box-shadow:0 4px 24px rgba(0,0,0,0.2);
      display:flex;align-items:center;justify-content:center;
    ">
      ${logoB64
        ? `<img src="${logoB64}" style="width:100%;height:100%;object-fit:cover;" />`
        : `<div style="width:100%;height:100%;background:#0d4a28;display:flex;align-items:center;justify-content:center;color:#c9a227;font-weight:900;font-size:16px;">LSC</div>`
      }
    </div>

    <!-- Title block -->
    <div style="flex:1;">
      <div style="font-size:38px;font-weight:900;color:#0d4a28;line-height:1;letter-spacing:1.5px;text-transform:uppercase;text-shadow:0 1px 2px rgba(0,0,0,0.1);">
        LAKHARA SAMAJ COMMUNITY
      </div>
      <div style="font-size:13px;color:#555;font-weight:600;margin-top:5px;letter-spacing:3px;">
        Ekta &nbsp;•&nbsp; Parampara &nbsp;•&nbsp; Pragati
      </div>
      <!-- Green "COMMUNITY MEMBERSHIP CERTIFICATE" pill -->
      <div style="
        display:inline-flex;align-items:center;
        margin-top:11px;
        background:linear-gradient(90deg,#0d4a28 0%,#1a7040 50%,#0d4a28 100%);
        border:2.5px solid #c9a227;
        border-radius:5px;
        padding:8px 32px;
        color:#f0d060;
        font-size:15px;
        font-weight:900;
        letter-spacing:3px;
        text-transform:uppercase;
      ">
        COMMUNITY MEMBERSHIP CERTIFICATE
      </div>
    </div>
  </div>

  <!-- GOLD DIVIDER LINE -->
  <div style="
    position:absolute;top:170px;left:32px;right:32px;
    height:2px;
    background:linear-gradient(90deg,transparent,#c9a227 15%,#c9a227 85%,transparent);
    z-index:15;
  "></div>

  <!-- ═══════════════════════════════════════════════════ -->
  <!-- ░ LEFT COLUMN: GREETING + SIGNATURE ░ -->
  <!-- ═══════════════════════════════════════════════════ -->
  <div style="
    position:absolute;top:184px;left:44px;width:430px;bottom:34px;
    display:flex;flex-direction:column;justify-content:space-between;
    z-index:15;
    padding:0 8px;
  ">
    <!-- Hindi greeting section -->
    <div>
      <!-- हार्दिक बधाई! in red -->
      <div style="
        font-size:54px;font-weight:900;color:#cc0000;
        font-family:'Noto Sans Devanagari',Arial,sans-serif;
        line-height:1.1;margin-bottom:12px;
      ">
        हार्दिक बधाई!
      </div>

      <!-- Decorative ornament divider -->
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
        <div style="height:1.5px;background:#c9a227;width:45px;"></div>
        <div style="color:#c9a227;font-size:15px;letter-spacing:4px;">❖ ❖ ❖</div>
        <div style="height:1.5px;background:#c9a227;width:45px;"></div>
      </div>

      <!-- Welcome text in Hindi -->
      <div style="font-size:15px;color:#1a1a1a;font-weight:600;line-height:2;font-family:'Noto Sans Devanagari',Arial,sans-serif;">
        आपका लखारा समाज कम्युनिटी में स्वागत है!<br/>
        आपके जुड़ने से हमारी एकता और मजबूत हुई है!<br/>
        हम आशा करते हैं कि आप समाज की तरक्की, सहयोग और<br/>
        परंपराओं को आगे बढ़ाने में अपना महत्वपूर्ण योगदान देंगे!
      </div>

      <!-- Tagline -->
      <div style="
        margin-top:16px;
        font-size:18px;font-weight:900;color:#0d4a28;
        font-family:'Noto Sans Devanagari',Arial,sans-serif;
      ">
        एकजुट रहें, आगे बढ़ें!
      </div>
    </div>

    <!-- ── SIGNATURE BLOCK (bottom-left) ── -->
    <div style="margin-bottom:20px;">
      ${sigB64
        ? `<img src="${sigB64}" style="max-height:70px;max-width:210px;object-fit:contain;display:block;margin-bottom:4px;" />`
        : `<div style="height:54px;width:180px;display:flex;align-items:flex-end;padding-bottom:6px;">
             <svg width="140" height="44" viewBox="0 0 140 44" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M10 34 Q30 10 50 28 Q70 44 90 20 Q110 4 130 22" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
             </svg>
           </div>`
      }
      <div style="height:2px;background:#333333;width:200px;margin-bottom:7px;"></div>
      <div style="font-size:12px;font-weight:900;color:#111;letter-spacing:1.2px;text-transform:uppercase;">
        ${adminName}
      </div>
      <div style="font-size:11px;font-weight:700;color:#0d4a28;text-transform:uppercase;letter-spacing:0.7px;margin-top:2px;">
        ${adminDesig}
      </div>
      <div style="font-size:10px;font-weight:600;color:#777;text-transform:uppercase;letter-spacing:0.5px;margin-top:2px;">
        LAKHARA SAMAJ COMMUNITY
      </div>
    </div>
  </div>

  <!-- VERTICAL GOLD DIVIDER between columns -->
  <div style="
    position:absolute;top:184px;left:492px;bottom:34px;
    width:1.5px;
    background:linear-gradient(180deg,#c9a22770,#c9a227,#c9a22770);
    z-index:15;
  "></div>

  <!-- ═══════════════════════════════════════════════════ -->
  <!-- ░ RIGHT COLUMN: MEMBER DETAILS + SEAL + QUOTE ░ -->
  <!-- ═══════════════════════════════════════════════════ -->
  <div style="
    position:absolute;top:184px;left:508px;right:34px;bottom:34px;
    display:flex;flex-direction:column;justify-content:space-between;
    z-index:15;
    padding:0 8px;
  ">
    <!-- MEMBER DETAILS BOX -->
    <div style="
      border:2.5px solid #0d4a28;
      border-radius:6px;
      overflow:hidden;
      box-shadow:0 2px 12px rgba(0,0,0,0.08);
    ">
      <!-- Header bar -->
      <div style="
        background:linear-gradient(90deg,#0d4a28 0%,#1a7040 50%,#0d4a28 100%);
        padding:10px 20px;
        text-align:center;
      ">
        <span style="
          color:#f0d060;font-size:14px;font-weight:900;
          letter-spacing:2.5px;text-transform:uppercase;
        ">MEMBER DETAILS</span>
      </div>
      <!-- Data rows -->
      <div style="background:rgba(255,252,235,0.95);padding:10px 18px;">

        ${[
          ["MEMBER ID",      memberIdDisplay],
          ["MEMBER NUMBER",  data.memberNumber.padStart(4, "0")],
          ["FULL NAME",      data.name.toUpperCase()],
          ["FATHER'S NAME",  `SHRI ${data.fatherName.toUpperCase()}`],
          ["VILLAGE / CITY", `${data.city.toUpperCase()}${data.district ? ", " + data.district.toUpperCase() : ""}`],
          ["JOINING DATE",   joiningDate],
        ].map(([lbl, val]) => `
          <div style="
            display:flex;align-items:baseline;gap:8px;
            padding:8px 0;
            border-bottom:1px solid rgba(10,74,40,0.2);
            font-size:12px;
          ">
            <span style="flex:0 0 140px;color:#444;font-weight:700;letter-spacing:0.4px;font-size:11px;">${lbl}</span>
            <span style="color:#0d4a28;font-weight:700;font-size:11px;margin:0 3px;">:</span>
            <span style="flex:1;color:#111;font-weight:900;font-size:13px;">${val}</span>
          </div>
        `).join("")}

      </div>
    </div>

    <!-- BOTTOM: PROUD MEMBER BADGE + QUOTE -->
    <div style="display:flex;align-items:flex-end;justify-content:space-between;padding-bottom:6px;">

      <!-- Gold member seal badge -->
      <div style="
        width:115px;height:115px;
        border-radius:50%;
        background:conic-gradient(#8b6508 0deg,#c9a227 60deg,#f0d060 120deg,#c9a227 180deg,#8b6508 240deg,#c9a227 300deg,#8b6508 360deg);
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        border:4px solid #8b6508;
        box-shadow:0 4px 20px rgba(0,0,0,0.25);
        text-align:center;
        padding:6px;
        flex-shrink:0;
      ">
        <div style="
          width:96px;height:96px;border-radius:50%;
          background:linear-gradient(135deg,#0d4a28,#1a7040);
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          border:2.5px solid rgba(201,162,39,0.6);
          text-align:center;
          padding:4px;
        ">
          <div style="font-size:8px;font-weight:900;color:#f0d060;letter-spacing:1.5px;line-height:1.3;">PROUD</div>
          <div style="font-size:7px;font-weight:900;color:#f0d060;letter-spacing:1px;line-height:1.3;">MEMBER</div>
          <div style="font-size:22px;margin:3px 0;">🤝</div>
          <div style="font-size:5.5px;font-weight:800;color:#f0d060;letter-spacing:0.8px;line-height:1.4;text-align:center;">
            LAKHARA<br/>SAMAJ<br/>COMMUNITY
          </div>
        </div>
      </div>

      <!-- Hindi quote -->
      <div style="
        text-align:right;
        font-family:'Noto Sans Devanagari',Arial,sans-serif;
        max-width:390px;
        padding-right:6px;
      ">
        <div style="font-size:14px;color:#333;font-style:italic;font-weight:600;line-height:1.8;">
          "हमारी पहचान, हमारी विरासत<br/>
          लखारा समाज – एक परिवार, एक विश्वास!"
        </div>
      </div>

    </div>
  </div>
  `;

  document.body.appendChild(wrap);
  await new Promise(r => setTimeout(r, 800));

  const canvas = await html2canvas(wrap, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: null,
    width: W,
    height: H,
  });

  document.body.removeChild(wrap);

  // Landscape A4
  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: "a4" });
  const pw  = pdf.internal.pageSize.getWidth();
  const ph  = pdf.internal.pageSize.getHeight();
  pdf.addImage(canvas.toDataURL("image/jpeg", 0.97), "JPEG", 0, 0, pw, ph);
  pdf.save(`LSC_Membership_Certificate_${data.memberNumber}_${data.name.replace(/\s+/g, "_")}.pdf`);
}

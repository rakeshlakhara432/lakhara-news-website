import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

/* ─────────────────────────────────────────────────────────
   Converts the lakhara logo PNG to a base64 data-URL so
   html2canvas can embed it even when the page is served
   from a different origin in production.
───────────────────────────────────────────────────────── */
async function loadLogoAsBase64(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext("2d")!.drawImage(img, 0, 0);
      resolve(c.toDataURL("image/png"));
    };
    img.onerror = () => resolve(""); // fall back – no logo
    img.src = src + "?t=" + Date.now(); // bust cache
  });
}

export async function generateMembershipPDF(data: MembershipCertData): Promise<void> {
  /* ── pre-load logo ────────────────────────────────────── */
  const logoBase64 = await loadLogoAsBase64("/brand-logo.png");

  /* ── A4 canvas size at 96 dpi: 794 × 1123 px ─────────── */
  const W = 794;
  const H = 1123;

  const wrap = document.createElement("div");
  wrap.style.cssText = `
    position:fixed; left:-9999px; top:0;
    width:${W}px; height:${H}px;
    overflow:hidden;
    font-family:'Noto Sans Devanagari','Segoe UI',Arial,sans-serif;
    box-sizing:border-box;
  `;

  wrap.innerHTML = `
  <!-- ░░ PARCHMENT BACKGROUND ░░ -->
  <div style="
    position:absolute;inset:0;
    background:linear-gradient(160deg,#fdf3d8 0%,#f5e8b8 40%,#ede0a0 100%);
  "></div>

  <!-- ░░ OUTER NAVY BORDER ░░ -->
  <div style="
    position:absolute;inset:0;
    border:14px solid #1a2f6e;
    box-sizing:border-box;
    pointer-events:none;
    z-index:1;
  "></div>

  <!-- ░░ INNER GOLD BORDER ░░ -->
  <div style="
    position:absolute;inset:20px;
    border:3px solid #c9a227;
    box-sizing:border-box;
    pointer-events:none;
    z-index:1;
  "></div>

  <!-- ░░ NAVY TOP BAND ░░ -->
  <div style="
    position:absolute;top:28px;left:28px;right:28px;height:18px;
    background:linear-gradient(90deg,#1a2f6e,#2455a0,#1a2f6e);
    border-top:2px solid #c9a227;border-bottom:2px solid #c9a227;
    z-index:2;
  "></div>

  <!-- ░░ NAVY BOTTOM BAND ░░ -->
  <div style="
    position:absolute;bottom:28px;left:28px;right:28px;height:18px;
    background:linear-gradient(90deg,#1a2f6e,#2455a0,#1a2f6e);
    border-top:2px solid #c9a227;border-bottom:2px solid #c9a227;
    z-index:2;
  "></div>

  <!-- ░░ GOLD CORNER ORNAMENTS ░░ -->
  <div style="position:absolute;top:24px;left:24px;width:28px;height:28px;border:3px solid #c9a227;background:#f5e8b8;z-index:3;"></div>
  <div style="position:absolute;top:24px;right:24px;width:28px;height:28px;border:3px solid #c9a227;background:#f5e8b8;z-index:3;"></div>
  <div style="position:absolute;bottom:24px;left:24px;width:28px;height:28px;border:3px solid #c9a227;background:#f5e8b8;z-index:3;"></div>
  <div style="position:absolute;bottom:24px;right:24px;width:28px;height:28px;border:3px solid #c9a227;background:#f5e8b8;z-index:3;"></div>

  <!-- ░░ LEFT SCROLL ORNAMENT ░░ -->
  <div style="
    position:absolute;top:140px;left:14px;
    width:40px;height:200px;
    background:linear-gradient(180deg,#1a2f6e 0%,#2455a0 50%,#1a2f6e 100%);
    border-right:2px solid #c9a227;
    z-index:2;
    display:flex;align-items:center;justify-content:center;
  ">
    <div style="writing-mode:vertical-rl;color:#f0d060;font-size:9px;font-weight:800;letter-spacing:3px;text-transform:uppercase;opacity:0.7;"></div>
  </div>

  <!-- ░░ RIGHT SCROLL ORNAMENT ░░ -->
  <div style="
    position:absolute;top:140px;right:14px;
    width:40px;height:200px;
    background:linear-gradient(180deg,#1a2f6e 0%,#2455a0 50%,#1a2f6e 100%);
    border-left:2px solid #c9a227;
    z-index:2;
  "></div>

  <!-- ░░ LOGO CIRCLE ░░ -->
  <div style="
    position:absolute;top:46px;left:50%;transform:translateX(-50%);
    width:108px;height:108px;
    border-radius:50%;
    border:5px solid #c9a227;
    background:#fff;
    overflow:hidden;
    z-index:10;
    box-shadow:0 2px 16px #0004;
  ">
    ${logoBase64
      ? `<img src="${logoBase64}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`
      : `<div style="width:100%;height:100%;background:#1a2f6e;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#f0d060;font-weight:900;font-size:11px;">ARHLM</div>`
    }
  </div>

  <!-- ░░ RAJASTHAN MAP WATERMARK ░░ -->
  <div style="
    position:absolute;top:260px;left:50%;transform:translateX(-50%);
    width:420px;height:420px;
    ${logoBase64 ? `background:url('${logoBase64}') center/contain no-repeat;` : ""}
    opacity:0.07;
    z-index:0;
  "></div>

  <!-- ░░ GOLD SCROLL TITLE BANNER ░░ -->
  <div style="
    position:absolute;top:162px;left:56px;right:56px;
    background:linear-gradient(135deg,#b8830a 0%,#e5c040 30%,#f5d860 50%,#e5c040 70%,#b8830a 100%);
    border:3px solid #8b6508;
    border-radius:6px;
    padding:18px 20px 14px;
    text-align:center;
    z-index:5;
    box-shadow:0 4px 12px #0003;
  ">
    <!-- Scroll horns -->
    <div style="position:absolute;left:-18px;top:50%;transform:translateY(-50%);width:20px;height:60px;background:linear-gradient(90deg,#8b6508,#c9a227);border-radius:6px 0 0 6px;border:2px solid #8b6508;"></div>
    <div style="position:absolute;right:-18px;top:50%;transform:translateY(-50%);width:20px;height:60px;background:linear-gradient(90deg,#c9a227,#8b6508);border-radius:0 6px 6px 0;border:2px solid #8b6508;"></div>

    <div style="font-size:27px;font-weight:900;color:#12204a;line-height:1.25;font-family:'Noto Sans Devanagari',Arial,sans-serif;text-shadow:0 1px 2px #fff8;">
      अखिल राजस्थान हिन्दू लखेरा महासभा
    </div>
    <div style="font-size:23px;font-weight:900;color:#1a2f6e;margin-top:4px;font-family:'Noto Sans Devanagari',Arial,sans-serif;text-shadow:0 1px 2px #fff8;">
      सदस्यता बधाई पत्र
    </div>
  </div>

  <!-- ░░ GREETING ░░ -->
  <div style="
    position:absolute;top:300px;left:68px;right:68px;
    text-align:left;
    z-index:3;
    font-family:'Noto Sans Devanagari',Arial,sans-serif;
  ">
    <div style="font-size:16px;font-weight:700;color:#111;line-height:1.5;">
      श्री/श्रीमती <span style="color:#1a2f6e;text-decoration:underline;text-underline-offset:3px;">${data.name}</span>,
    </div>
    <div style="font-size:20px;font-weight:900;color:#c9a227;text-align:center;margin:10px 0 8px;letter-spacing:1px;">
      हार्दिक बधाई एवं स्वागत!
    </div>
    <div style="font-size:13px;color:#2a2a2a;line-height:1.85;text-align:center;font-weight:500;">
      अखिल राजस्थान हिन्दू लखेरा महासभा परिवार में आपका हार्दिक अभिनंदन है।<br/>
      भगवान शिव एवं माता पार्वती के आशीर्वाद से, हमें विश्वास है कि आप हमारे<br/>
      समुदाय की विरासत को आगे बढ़ाएंगे और समाज सेवा में योगदान देंगे।
    </div>
  </div>

  <!-- ░░ MEMBER DETAILS BOX ░░ -->
  <div style="
    position:absolute;top:480px;left:58px;right:58px;
    border:2.5px solid #c9a227;
    border-radius:6px;
    overflow:hidden;
    z-index:4;
  ">
    <!-- Header -->
    <div style="
      background:linear-gradient(90deg,#1a2f6e,#2455a0,#1a2f6e);
      padding:11px 20px;
      text-align:center;
      font-family:'Noto Sans Devanagari',Arial,sans-serif;
    ">
      <span style="color:#f0d060;font-size:14.5px;font-weight:800;letter-spacing:0.5px;">
        सदस्य विवरण &nbsp;(Member Details)
      </span>
    </div>

    <!-- Body rows -->
    <div style="background:rgba(255,255,230,0.75);padding:14px 22px;font-family:'Noto Sans Devanagari',Arial,sans-serif;">

      <div style="display:flex;align-items:center;padding:9px 0;border-bottom:1px dashed #c9a22780;">
        <span style="flex:0 0 300px;font-size:12.5px;color:#444;font-weight:600;">सदस्य आईडी &nbsp;(Member ID):</span>
        <span style="flex:1;font-size:12.5px;color:#12204a;font-weight:800;text-decoration:underline;text-underline-offset:3px;">${data.memberId}</span>
      </div>

      <div style="display:flex;align-items:center;padding:9px 0;border-bottom:1px dashed #c9a22780;">
        <span style="flex:0 0 300px;font-size:12.5px;color:#444;font-weight:600;">सदस्य नाम &nbsp;(Member Name):</span>
        <span style="flex:1;font-size:12.5px;color:#12204a;font-weight:800;text-decoration:underline;text-underline-offset:3px;">${data.name}</span>
      </div>

      <div style="display:flex;align-items:center;padding:9px 0;border-bottom:1px dashed #c9a22780;">
        <span style="flex:0 0 300px;font-size:12.5px;color:#444;font-weight:600;">सदस्यता संख्या &nbsp;(Member Number):</span>
        <span style="flex:1;font-size:12.5px;color:#12204a;font-weight:800;text-decoration:underline;text-underline-offset:3px;">${data.memberNumber}</span>
      </div>

      <div style="display:flex;align-items:center;padding:9px 0;border-bottom:1px dashed #c9a22780;">
        <span style="flex:0 0 300px;font-size:12.5px;color:#444;font-weight:600;">पिता/पति का नाम &nbsp;(Father's/Husband's Name):</span>
        <span style="flex:1;font-size:12.5px;color:#12204a;font-weight:800;text-decoration:underline;text-underline-offset:3px;">${data.fatherName}</span>
      </div>

      <div style="display:flex;align-items:flex-start;padding:9px 0;">
        <span style="flex:0 0 300px;font-size:12.5px;color:#444;font-weight:600;">निवास स्थान &nbsp;(Address):</span>
        <span style="flex:1;font-size:12.5px;color:#12204a;font-weight:800;text-decoration:underline;text-underline-offset:3px;">${data.address}, ${data.city}${data.district ? ", " + data.district : ""}</span>
      </div>

    </div>
  </div>

  <!-- ░░ SIGNATURE ROW ░░ -->
  <div style="
    position:absolute;bottom:58px;left:64px;right:64px;
    display:flex;justify-content:space-between;align-items:flex-end;
    z-index:4;
    font-family:'Noto Sans Devanagari',Arial,sans-serif;
  ">
    <!-- Left sig -->
    <div style="text-align:center;min-width:140px;">
      <div style="height:2px;background:#555;width:140px;margin-bottom:6px;"></div>
      <div style="font-size:11.5px;color:#333;font-weight:700;line-height:1.5;">
        हस्ताक्षर (अध्यक्ष)<br/>
        <strong style="color:#1a2f6e;">नाम</strong>
      </div>
    </div>

    <!-- Center date+reg -->
    <div style="text-align:center;flex:1;padding:0 20px;">
      <div style="font-size:12.5px;color:#222;font-weight:700;line-height:1.8;">
        दिनांक: <strong>${data.dateOfIssue}</strong><br/>
        स्थान: <strong>जयपुर</strong>
      </div>
      <div style="
        margin-top:8px;
        font-size:13.5px;
        font-weight:900;
        letter-spacing:1px;
        color:#c9a227;
      ">
        ★ &nbsp; ARHLM (Reg. – 205715) &nbsp; ★
      </div>
    </div>

    <!-- Right sig -->
    <div style="text-align:center;min-width:140px;">
      <div style="height:2px;background:#555;width:140px;margin-bottom:6px;margin-left:auto;"></div>
      <div style="font-size:11.5px;color:#333;font-weight:700;line-height:1.5;">
        हस्ताक्षर (महासचिव)<br/>
        <strong style="color:#1a2f6e;">नाम</strong>
      </div>
    </div>
  </div>
  `;

  document.body.appendChild(wrap);

  // Wait a frame for browser to render fonts/images
  await new Promise(r => setTimeout(r, 600));

  const canvas = await html2canvas(wrap, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: null,
    width: W,
    height: H,
  });

  document.body.removeChild(wrap);

  const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
  const pw = pdf.internal.pageSize.getWidth();
  const ph = pdf.internal.pageSize.getHeight();
  pdf.addImage(canvas.toDataURL("image/jpeg", 0.97), "JPEG", 0, 0, pw, ph);
  pdf.save(`ARHLM_Membership_${data.memberNumber}_${data.name.replace(/\s+/g, "_")}.pdf`);
}

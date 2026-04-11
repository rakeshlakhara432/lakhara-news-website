import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface MembershipCertData {
  memberId: string;       // e.g. ARHLM_ID_2026_001
  memberNumber: string;   // e.g. 001
  name: string;
  fatherName: string;
  address: string;
  city: string;
  district?: string;
  dateOfIssue: string;    // formatted date string
}

/**
 * Builds an off-screen HTML element that mirrors the certificate image,
 * converts it with html2canvas, then saves it as an A4 PDF.
 */
export async function generateMembershipPDF(data: MembershipCertData): Promise<void> {
  // ── 1. Create container ──────────────────────────────────────────────────
  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed; left: -9999px; top: 0;
    width: 794px; height: 1123px;
    font-family: 'Noto Sans Devanagari', 'Arial', sans-serif;
    background: #f5edd6;
    border: 12px solid #1a3a6e;
    box-sizing: border-box;
    overflow: hidden;
  `;

  // ── 2. Inner gold border ─────────────────────────────────────────────────
  const inner = document.createElement("div");
  inner.style.cssText = `
    position: absolute; inset: 14px;
    border: 4px solid #c9a227;
    border-radius: 4px;
    box-sizing: border-box;
  `;
  container.appendChild(inner);

  // ── 3. Corner ornaments (simple gold squares) ────────────────────────────
  const corners = [
    { top: "10px", left: "10px" },
    { top: "10px", right: "10px" },
    { bottom: "10px", left: "10px" },
    { bottom: "10px", right: "10px" },
  ];
  corners.forEach(pos => {
    const c = document.createElement("div");
    c.style.cssText = `
      position: absolute; width: 38px; height: 38px;
      border: 3px solid #c9a227;
      ${Object.entries(pos).map(([k, v]) => `${k}:${v}`).join(";")}
    `;
    container.appendChild(c);
  });

  // ── 4. Blue top/bottom decorative bands ─────────────────────────────────
  const topBand = document.createElement("div");
  topBand.style.cssText = `
    position: absolute; top: 30px; left: 30px; right: 30px; height: 16px;
    background: linear-gradient(90deg, #1a3a6e 0%, #2655a3 50%, #1a3a6e 100%);
    border-top: 2px solid #c9a227; border-bottom: 2px solid #c9a227;
  `;
  container.appendChild(topBand);

  const bottomBand = document.createElement("div");
  bottomBand.style.cssText = `
    position: absolute; bottom: 30px; left: 30px; right: 30px; height: 16px;
    background: linear-gradient(90deg, #1a3a6e 0%, #2655a3 50%, #1a3a6e 100%);
    border-top: 2px solid #c9a227; border-bottom: 2px solid #c9a227;
  `;
  container.appendChild(bottomBand);

  // ── 5. Organisation Logo (circle) ────────────────────────────────────────
  const logoWrap = document.createElement("div");
  logoWrap.style.cssText = `
    position: absolute; top: 54px; left: 50%; transform: translateX(-50%);
    width: 100px; height: 100px;
    border-radius: 50%;
    border: 4px solid #c9a227;
    background: #fff;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
    z-index: 10;
  `;
  const logoImg = document.createElement("img");
  logoImg.src = "/lakhara-logo.png";
  logoImg.style.cssText = "width: 90px; height: 90px; object-fit: cover; border-radius: 50%;";
  logoImg.crossOrigin = "anonymous";
  logoWrap.appendChild(logoImg);
  container.appendChild(logoWrap);

  // ── 6. Title Scroll banner ───────────────────────────────────────────────
  const titleBanner = document.createElement("div");
  titleBanner.style.cssText = `
    position: absolute; top: 164px; left: 50px; right: 50px;
    background: linear-gradient(135deg, #c9a227 0%, #f0d060 50%, #c9a227 100%);
    border: 3px solid #8b6914;
    border-radius: 6px;
    padding: 16px 24px;
    text-align: center;
  `;
  titleBanner.innerHTML = `
    <div style="font-size:28px; font-weight:900; color:#1a1a1a; line-height:1.3; letter-spacing:1px; font-family:'Noto Sans Devanagari',Arial,sans-serif;">
      अखिल राजस्थान हिन्दू लखेरा महासभा
    </div>
    <div style="font-size:24px; font-weight:900; color:#1a3a6e; margin-top:4px; font-family:'Noto Sans Devanagari',Arial,sans-serif;">
      सदस्यता बधाई पत्र
    </div>
  `;
  container.appendChild(titleBanner);

  // ── 7. Rajasthan map faint watermark ────────────────────────────────────
  const wm = document.createElement("div");
  wm.style.cssText = `
    position: absolute; top: 280px; left: 50%; transform: translateX(-50%);
    width: 380px; height: 380px;
    background: url('/lakhara-logo.png') center/contain no-repeat;
    opacity: 0.06;
    z-index: 0;
  `;
  container.appendChild(wm);

  // ── 8. Greeting text ─────────────────────────────────────────────────────
  const greeting = document.createElement("div");
  greeting.style.cssText = `
    position: absolute; top: 290px; left: 60px; right: 60px;
    z-index: 2;
  `;
  greeting.innerHTML = `
    <div style="font-size:17px; font-weight:700; color:#1a1a1a; font-family:'Noto Sans Devanagari',Arial,sans-serif;">
      श्री/श्रीमती <span style="text-decoration:underline; color:#1a3a6e;">${data.name}</span>,
    </div>
    <div style="font-size:20px; font-weight:900; color:#c9a227; text-align:center; margin:12px 0 8px; font-family:'Noto Sans Devanagari',Arial,sans-serif;">
      हार्दिक बधाई एवं स्वागत!
    </div>
    <div style="font-size:13.5px; color:#333; line-height:1.7; text-align:center; font-family:'Noto Sans Devanagari',Arial,sans-serif;">
      अखिल राजस्थान हिन्दू लखेरा महासभा परिवार में आपका हार्दिक अभिनंदन है।<br/>
      भगवान शिव एवं माता पार्वती के आशीर्वाद से, हमें विश्वास है कि आप हमारे<br/>
      समुदाय की विरासत को आगे बढ़ाएंगे और समाज सेवा में योगदान देंगे।
    </div>
  `;
  container.appendChild(greeting);

  // ── 9. Member Details box ────────────────────────────────────────────────
  const detailsBox = document.createElement("div");
  detailsBox.style.cssText = `
    position: absolute; top: 478px; left: 60px; right: 60px;
    border: 2px solid #c9a227;
    border-radius: 6px;
    overflow: hidden;
    z-index: 2;
  `;

  const detailsHeader = document.createElement("div");
  detailsHeader.style.cssText = `
    background: linear-gradient(90deg, #1a3a6e, #2655a3);
    padding: 10px 20px;
    text-align: center;
    color: #f0d060;
    font-size: 15px;
    font-weight: 800;
    font-family: 'Noto Sans Devanagari', Arial, sans-serif;
  `;
  detailsHeader.textContent = "सदस्य विवरण (Member Details)";
  detailsBox.appendChild(detailsHeader);

  const detailsBody = document.createElement("div");
  detailsBody.style.cssText = `
    background: rgba(255,255,255,0.7);
    padding: 18px 24px;
    font-family: 'Noto Sans Devanagari', Arial, sans-serif;
  `;

  const rows = [
    ["सदस्य आईडी (Member ID)", data.memberId],
    ["सदस्य नाम (Member Name)", data.name],
    ["सदस्यता संख्या (Member Number)", data.memberNumber],
    ["पिता/पति का नाम (Father's/Husband's Name)", data.fatherName],
    ["निवास स्थान (Address)", `${data.address}, ${data.city}${data.district ? ", " + data.district : ""}`],
  ];

  rows.forEach(([label, value]) => {
    const row = document.createElement("div");
    row.style.cssText = `
      display: flex; align-items: flex-start; gap: 12px;
      padding: 8px 0;
      border-bottom: 1px dashed #c9a22766;
      font-size: 13px;
    `;
    row.innerHTML = `
      <span style="color:#555; font-weight:600; flex: 0 0 280px;">${label}:</span>
      <span style="color:#1a1a1a; font-weight:700; flex: 1; text-decoration:underline; text-underline-offset:3px;">${value}</span>
    `;
    detailsBody.appendChild(row);
  });

  detailsBox.appendChild(detailsBody);
  container.appendChild(detailsBox);

  // ── 10. Signature row ────────────────────────────────────────────────────
  const sigRow = document.createElement("div");
  sigRow.style.cssText = `
    position: absolute; bottom: 80px; left: 60px; right: 60px;
    display: flex; justify-content: space-between; align-items: flex-end;
    z-index: 2;
  `;

  const sigLeft = document.createElement("div");
  sigLeft.style.cssText = "text-align:center; font-family:'Noto Sans Devanagari',Arial,sans-serif;";
  sigLeft.innerHTML = `
    <div style="border-top:2px solid #555; width:160px; padding-top:6px; font-size:12px; color:#333; font-weight:700;">
      हस्ताक्षर (अध्यक्ष)<br/><span style="font-weight:900; color:#1a3a6e;">नाम</span>
    </div>
  `;

  const sigCenter = document.createElement("div");
  sigCenter.style.cssText = "text-align:center; font-family:'Noto Sans Devanagari',Arial,sans-serif;";
  sigCenter.innerHTML = `
    <div style="font-size:13px; color:#333; font-weight:700; font-family:'Noto Sans Devanagari',Arial,sans-serif;">
      दिनांक: <strong>${data.dateOfIssue}</strong><br/>
      स्थान: <strong>जयपुर</strong>
    </div>
    <div style="margin-top:8px; font-size:14px; color:#c9a227; font-weight:900; letter-spacing:1px;">
      ★ &nbsp; ARHLM (Reg. – 205715) &nbsp; ★
    </div>
  `;

  const sigRight = document.createElement("div");
  sigRight.style.cssText = "text-align:center; font-family:'Noto Sans Devanagari',Arial,sans-serif;";
  sigRight.innerHTML = `
    <div style="border-top:2px solid #555; width:160px; padding-top:6px; font-size:12px; color:#333; font-weight:700;">
      हस्ताक्षर (महासचिव)<br/><span style="font-weight:900; color:#1a3a6e;">नाम</span>
    </div>
  `;

  sigRow.appendChild(sigLeft);
  sigRow.appendChild(sigCenter);
  sigRow.appendChild(sigRight);
  container.appendChild(sigRow);

  // ── 11. Append to body, render, remove ───────────────────────────────────
  document.body.appendChild(container);

  // Wait for logo image to load
  await new Promise<void>((resolve) => {
    if (logoImg.complete) { resolve(); return; }
    logoImg.onload = () => resolve();
    logoImg.onerror = () => resolve();
    setTimeout(resolve, 2000);
  });

  const canvas = await html2canvas(container, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: null,
  });

  document.body.removeChild(container);

  // ── 12. Export as PDF ─────────────────────────────────────────────────────
  const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const imgData = canvas.toDataURL("image/jpeg", 0.97);
  pdf.addImage(imgData, "JPEG", 0, 0, pageW, pageH);
  pdf.save(`ARHLM_Membership_${data.memberNumber}_${data.name.replace(/\s+/g, "_")}.pdf`);
}

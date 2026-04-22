import{r as w,h as A,E as R}from"./vendor-utils-zcQ5SSYl.js";import{g as N}from"./vendor-react-CY72jRu5.js";import{c as I}from"./certSettingsService-Cyw2kZ34.js";var O=w();const M=N(O);async function d(e){return new Promise(s=>{const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{const n=document.createElement("canvas");n.width=i.naturalWidth||300,n.height=i.naturalHeight||300,n.getContext("2d").drawImage(i,0,0),s(n.toDataURL("image/png"))},i.onerror=()=>s(""),i.src=e+"?t="+Date.now()})}async function z(e){try{return await M.toDataURL(e,{width:150,margin:1,color:{dark:"#0f5132",light:"#fffaf0"}})}catch{return""}}async function U(e){const s=`https://rakeshlakhara432.github.io/lakhara-news-website/#/verify/${e.memberId}`,[i,n,t]=await Promise.all([d("/lakhara-logo.png").then(o=>o||d("/brand-logo.png")),z(s),I.get().catch(()=>null)]),g=(t==null?void 0:t.adminName)||"RAKESH LAKHARA",c=(t==null?void 0:t.adminDesignation)||"CHAIRMAN / ADHYAKSH",p=(t==null?void 0:t.signatureBase64)||(t==null?void 0:t.signatureUrl)||"",l=p.startsWith("http")?await d(p):p,x=1123,f=794,b=e.dateOfIssue.toUpperCase(),h=`LSC${new Date().getFullYear()}${e.memberNumber.padStart(4,"0")}`,r=document.createElement("div");r.style.cssText=`
    position:fixed;left:-9999px;top:0;
    width:${x}px;height:${f}px;
    overflow:hidden;
    font-family:'Noto Sans Devanagari','Segoe UI',Arial,sans-serif;
    box-sizing:border-box;
    background:#fff;
  `,r.innerHTML=`
  <!-- ░░ PREMIUM CREAM/OFF-WHITE BACKGROUND ░░ -->
  <div style="position:absolute;inset:0;
    background:linear-gradient(135deg,#fffbf0 0%,#fdf5e6 50%,#fffbf0 100%);
  "></div>

  <!-- ░░ WATERMARK LOGO ░░ -->
  <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:0;opacity:0.04;pointer-events:none;">
    ${i?`<img src="${i}" style="width:500px;filter:grayscale(1) contrast(2);" />`:""}
  </div>

  <!-- ░░ OUTER BHAGVA (SAFFRON) BORDER ░░ -->
  <div style="position:absolute;inset:0;border:12px solid #ff9933;box-sizing:border-box;z-index:10;pointer-events:none;"></div>
  
  <!-- INNER DARK GREEN BORDER -->
  <div style="position:absolute;inset:18px;border:3px solid #0f5132;box-sizing:border-box;z-index:10;pointer-events:none;"></div>
  
  <!-- INNER GOLD THIN BORDER -->
  <div style="position:absolute;inset:24px;border:1px solid #d4af37;box-sizing:border-box;z-index:10;pointer-events:none;"></div>

  <!-- ░░ CORNER ORNAMENTS ░░ -->
  ${["top:15px;left:15px","top:15px;right:15px","bottom:15px;left:15px","bottom:15px;right:15px"].map(o=>`
    <div style="position:absolute;${o};width:35px;height:35px;background:#0f5132;z-index:20;display:flex;align-items:center;justify-content:center;border:2px solid #ff9933;">
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
        <img src="${i}" style="width:95%;height:95%;object-fit:contain;" />
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
            ${l?`<img src="${l}" style="height:60px;position:absolute;bottom:0;left:10px;" />`:""}
        </div>
        <div style="font-size:14px;font-weight:900;color:#111;text-transform:uppercase;">${g}</div>
        <div style="font-size:11px;font-weight:900;color:#0f5132;text-transform:uppercase;letter-spacing:1px;">${c}</div>
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
           ${[["MEMBER ID",h],["MEMBER NUMBER",e.memberNumber.padStart(4,"0")],["FULL NAME",e.name.toUpperCase()],["FATHER'S NAME",e.fatherName.toUpperCase()],["VILLAGE / CITY",(e.city+(e.district?", "+e.district:"")).toUpperCase()],["JOINING DATE",b]].map(([o,u],E)=>`
             <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:${E===5?"none":"1px solid rgba(15,81,50,0.2)"};">
                <span style="font-size:11px;font-weight:900;color:#555;letter-spacing:1px;">${o}</span>
                <span style="font-size:13px;font-weight:900;color:#0f5132;text-align:right;">${u}</span>
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
              <img src="${n}" style="width:90px;height:90px;" />
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

  `,document.body.appendChild(r),await new Promise(o=>setTimeout(o,1200));const v=await A(r,{scale:3,useCORS:!0,logging:!1,backgroundColor:null,width:x,height:f});document.body.removeChild(r);const a=new R({orientation:"landscape",unit:"px",format:"a4"}),m=a.internal.pageSize.getWidth(),y=a.internal.pageSize.getHeight();a.addImage(v.toDataURL("image/jpeg",.98),"JPEG",0,0,m,y),a.save(`LAKHARA_SAMAJ_CERTIFICATE_${e.memberId}.pdf`)}export{U as g};

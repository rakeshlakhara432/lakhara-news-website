import{j as e}from"./index-CFzZW4B7.js";import{r as n}from"./vendor-react-CY72jRu5.js";import"./vendor-charts-BSh736fa.js";import"./vendor-ui-BjHRc8na.js";import"./vendor-utils-zcQ5SSYl.js";import"./vendor-firebase-eqIkjtCI.js";const _=`You are WebShield AI — an elite website security and performance expert.

When given React/Next.js code, you MUST respond in this EXACT JSON format only (no markdown, no extra text):

{
  "bugs": [
    {
      "id": "BUG001",
      "severity": "critical|high|medium|low",
      "title": "Bug ka naam",
      "description": "Kya galat hai",
      "location": "File/component naam",
      "fix": "Exact fixed code snippet",
      "explanation": "Kaise fix kiya"
    }
  ],
  "performance": [
    {
      "id": "PERF001",
      "impact": "high|medium|low",
      "title": "Performance issue",
      "description": "Kya slow kar raha hai",
      "fix": "Optimized code",
      "speedGain": "Estimated % improvement"
    }
  ],
  "security": [
    {
      "id": "SEC001",
      "threat": "XSS|CSRF|SQL_INJECTION|CLICKJACKING|DATA_EXPOSURE|DDOS|OTHER",
      "severity": "critical|high|medium|low",
      "title": "Security vulnerability",
      "description": "Kya khatra hai",
      "attackVector": "Hacker kaise exploit kar sakta hai",
      "counterMeasure": "Reverse attack / defense code",
      "fix": "Secure code snippet"
    }
  ],
  "summary": {
    "totalBugs": 0,
    "totalPerformanceIssues": 0,
    "totalSecurityThreats": 0,
    "overallScore": 0,
    "scoreAfterFix": 0,
    "criticalFindings": "Most important issue in one line"
  }
}`,c={critical:"#ff2244",high:"#ff6600",medium:"#ffcc00",low:"#00ccff"},G={XSS:"💉",CSRF:"🔄",SQL_INJECTION:"💣",CLICKJACKING:"👁️",DATA_EXPOSURE:"📤",DDOS:"🌊",OTHER:"⚠️"},M=({score:i,label:a,color:o})=>{const r=2*Math.PI*36,p=i/100*r;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6},children:[e.jsxs("svg",{width:"88",height:"88",viewBox:"0 0 88 88",children:[e.jsx("circle",{cx:"44",cy:"44",r:36,fill:"none",stroke:"#1a1a2e",strokeWidth:"8"}),e.jsx("circle",{cx:"44",cy:"44",r:36,fill:"none",stroke:o,strokeWidth:"8",strokeDasharray:`${p} ${r-p}`,strokeLinecap:"round",transform:"rotate(-90 44 44)",style:{transition:"stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)"}}),e.jsx("text",{x:"44",y:"49",textAnchor:"middle",fill:"#fff",fontSize:"16",fontWeight:"700",fontFamily:"'Courier New', monospace",children:i})]}),e.jsx("span",{style:{color:"#888",fontSize:11,letterSpacing:1,textTransform:"uppercase"},children:a})]})},V=({color:i})=>e.jsx("span",{style:{display:"inline-block",width:8,height:8,borderRadius:"50%",background:i,marginRight:6,boxShadow:`0 0 0 0 ${i}`,animation:"pulse-ring 1.4s ease-out infinite"}}),s=({text:i,color:a})=>e.jsx("span",{style:{background:a+"22",color:a,border:`1px solid ${a}44`,borderRadius:4,fontSize:10,padding:"2px 7px",fontWeight:700,letterSpacing:1,textTransform:"uppercase",fontFamily:"monospace"},children:i}),d=({children:i,style:a={}})=>e.jsx("div",{style:{background:"linear-gradient(135deg, #0d1117 60%, #161b27)",border:"1px solid #21262d",borderRadius:12,padding:"18px 20px",marginBottom:12,boxShadow:"0 4px 24px rgba(0,0,0,0.4)",...a},children:i}),Y=({threat:i,measure:a})=>{const[o,f]=n.useState(!1);return e.jsxs("div",{style:{marginTop:10},children:[e.jsxs("button",{onClick:()=>f(!o),style:{background:"linear-gradient(90deg,#ff2244,#ff6600)",border:"none",color:"#fff",borderRadius:6,padding:"6px 14px",fontSize:11,fontWeight:700,cursor:"pointer",letterSpacing:1,fontFamily:"monospace"},children:["⚔️ ",o?"HIDE":"REVERSE ATTACK"," →"]}),o&&e.jsxs("div",{style:{marginTop:8,background:"#1a0010",border:"1px solid #ff224444",borderRadius:8,padding:"12px 14px",fontSize:12,color:"#ff8888",fontFamily:"monospace",lineHeight:1.6},children:[e.jsx("div",{style:{color:"#ff2244",fontWeight:700,marginBottom:6},children:"⚔️ COUNTER-ATTACK:"}),a]})]})};function oe(){var R,w,C,I,T,z,A,B,N,W,P,O,D;const[i,a]=n.useState(""),[o,f]=n.useState(!1),[r,p]=n.useState(null),[S,u]=n.useState(""),[l,L]=n.useState("bugs"),[v,x]=n.useState(0),[$,y]=n.useState(""),[k,E]=n.useState({before:0,after:0}),h=n.useRef(null),g=["🔍 Code parsing kar raha hun...","🐛 Bugs dhundh raha hun...","⚡ Performance analyze kar raha hun...","🛡️ Security threats scan kar raha hun...","⚔️ Counter-attacks prepare kar raha hun...","📊 Report generate ho rahi hai..."],U=n.useCallback(async()=>{var F;if(!i.trim()){u("⚠️ Pehle apna React/Next.js code paste karein!");return}f(!0),p(null),u(""),x(0);let t=0;y(g[0]),h.current=window.setInterval(()=>{t++,t<g.length&&(y(g[t]),x(Math.round(t/g.length*85)))},900);try{const K=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":localStorage.getItem("ANTHROPIC_API_KEY")||"","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-3-sonnet-20240229",max_tokens:1e3,system:_,messages:[{role:"user",content:`Yeh meri React/Next.js website ka code hai. Isme se saare bugs, performance issues, aur security vulnerabilities dhundho aur JSON mein batao:

\`\`\`jsx
${i}
\`\`\``}]})});clearInterval(h.current),x(95),y("✅ Analysis complete!");const b=await K.json();if(b.error)throw new Error(b.error.message);const X=(((F=b.content)==null?void 0:F.map(m=>m.text||"").join(""))||"").replace(/```json|```/g,"").trim(),j=JSON.parse(X);x(100),p(j),E({before:0,after:0}),setTimeout(()=>{var m,H;return E({before:((m=j.summary)==null?void 0:m.overallScore)||0,after:((H=j.summary)==null?void 0:H.scoreAfterFix)||0})},200)}catch{clearInterval(h.current),u("❌ Scan mein error aaya. Dobara try karein ya code check karein.")}finally{f(!1)}},[i]);n.useEffect(()=>()=>clearInterval(h.current),[]);const J=[{id:"bugs",label:"🐛 Bugs",count:(R=r==null?void 0:r.bugs)==null?void 0:R.length},{id:"perf",label:"⚡ Speed",count:(w=r==null?void 0:r.performance)==null?void 0:w.length},{id:"sec",label:"🛡️ Security",count:(C=r==null?void 0:r.security)==null?void 0:C.length}];return e.jsxs("div",{style:{minHeight:"100vh",background:"#010409",fontFamily:"'Courier New', 'JetBrains Mono', monospace",color:"#e6edf3",padding:"0 0 60px",borderRadius:"2rem",overflow:"hidden"},children:[e.jsx("style",{children:`
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 currentColor; opacity: 1; }
          70%  { box-shadow: 0 0 0 8px transparent; opacity: 0.4; }
          100% { box-shadow: 0 0 0 0 transparent; opacity: 0; }
        }
        @keyframes scanline {
          0%   { top: 0; }
          100% { top: 100%; }
        }
        @keyframes glitch {
          0%,100% { transform: translate(0); }
          20%      { transform: translate(-2px, 1px); }
          40%      { transform: translate(2px, -1px); }
          60%      { transform: translate(-1px, 2px); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes progress-bar {
          from { width: 0; }
        }
        .shield-btn:hover { filter: brightness(1.2); transform: scale(1.02); }
        .tab-btn:hover    { background: #161b27 !important; }
        .card-hover:hover { border-color: #30363d !important; }
        textarea:focus    { outline: none; border-color: #00ff9d !important; }
      `}),e.jsxs("div",{style:{background:"linear-gradient(180deg,#0d1117,#010409)",borderBottom:"1px solid #21262d",padding:"32px 0 24px",textAlign:"center",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"repeating-linear-gradient(0deg,transparent,transparent 2px,#00ff9d08 2px,#00ff9d08 4px)",pointerEvents:"none"}}),e.jsx("div",{style:{fontSize:32,fontWeight:900,letterSpacing:-1,background:"linear-gradient(90deg,#00ff9d,#00ccff,#ff2244)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"glitch 8s ease-in-out infinite"},children:"⚔️ WEBSITE SHIELD AI"}),e.jsx("div",{style:{color:"#8b949e",fontSize:13,marginTop:8,letterSpacing:2},children:"BUG SCANNER · SPEED OPTIMIZER · HACK REVERSER"})]}),e.jsxs("div",{style:{maxWidth:900,margin:"0 auto",padding:"32px 20px"},children:[e.jsxs(d,{children:[e.jsx("div",{style:{color:"#00ff9d",fontSize:12,letterSpacing:2,marginBottom:10,fontWeight:700},children:"📂 APNA REACT / NEXT.JS CODE PASTE KAREIN"}),e.jsx("textarea",{value:i,onChange:t=>a(t.target.value),placeholder:`// Example:
import React, { useState, useEffect } from 'react';

export default function MyComponent() {
  const [data, setData] = useState();
  
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);
  
  return <div dangerouslySetInnerHTML={{__html: data}} />;
}`,style:{width:"100%",minHeight:200,background:"#0d1117",border:"1px solid #30363d",borderRadius:8,padding:"14px 16px",color:"#c9d1d9",fontSize:13,lineHeight:1.7,resize:"vertical",fontFamily:"'Courier New', monospace",boxSizing:"border-box",transition:"border-color 0.2s"}}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:14},children:[e.jsxs("span",{style:{color:"#8b949e",fontSize:11},children:[i.length," characters · ",i.split(`
`).length," lines"]}),e.jsx("button",{onClick:U,disabled:o,className:"shield-btn",style:{background:o?"#21262d":"linear-gradient(90deg,#00ff9d,#00ccff)",color:o?"#8b949e":"#010409",border:"none",borderRadius:8,padding:"12px 28px",fontSize:14,fontWeight:900,cursor:o?"not-allowed":"pointer",letterSpacing:1,transition:"all 0.2s"},children:o?"🔍 SCANNING...":"🚀 SCAN & FIX KARO"})]})]}),o&&e.jsxs(d,{style:{animation:"fadeUp 0.3s ease"},children:[e.jsx("div",{style:{color:"#00ff9d",fontSize:12,marginBottom:12},children:$}),e.jsx("div",{style:{background:"#21262d",borderRadius:99,height:8,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",borderRadius:99,background:"linear-gradient(90deg,#00ff9d,#00ccff)",width:`${v}%`,transition:"width 0.6s ease",boxShadow:"0 0 12px #00ff9d88"}})}),e.jsxs("div",{style:{color:"#8b949e",fontSize:11,marginTop:6,textAlign:"right"},children:[v,"%"]})]}),S&&e.jsx("div",{style:{background:"#2d0909",border:"1px solid #ff224444",borderRadius:10,padding:"14px 18px",color:"#ff6666",fontSize:13,marginBottom:16,animation:"fadeUp 0.3s ease"},children:S}),r&&e.jsxs("div",{style:{animation:"fadeUp 0.4s ease"},children:[e.jsxs(d,{style:{marginBottom:20},children:[e.jsx("div",{style:{color:"#8b949e",fontSize:11,letterSpacing:2,marginBottom:18},children:"📊 WEBSITE HEALTH REPORT"}),e.jsxs("div",{style:{display:"flex",gap:20,justifyContent:"space-around",flexWrap:"wrap",marginBottom:20},children:[e.jsx(M,{score:k.before,label:"Before Fix",color:"#ff4444"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:8},children:[e.jsx("div",{style:{fontSize:28},children:"→"}),e.jsx("div",{style:{fontSize:10,color:"#8b949e",letterSpacing:1},children:"AI FIX"})]}),e.jsx(M,{score:k.after,label:"After Fix",color:"#00ff9d"})]}),e.jsxs("div",{style:{background:"#161b27",borderRadius:8,padding:"12px 16px",border:"1px solid #ff224422",color:"#ff8888",fontSize:12},children:["🎯 ",e.jsx("strong",{children:"Critical Finding:"})," ",(I=r.summary)==null?void 0:I.criticalFindings]}),e.jsxs("div",{style:{display:"flex",gap:12,marginTop:12,flexWrap:"wrap"},children:[e.jsx(s,{text:`${(T=r.summary)==null?void 0:T.totalBugs} Bugs`,color:"#ff6600"}),e.jsx(s,{text:`${(z=r.summary)==null?void 0:z.totalPerformanceIssues} Perf Issues`,color:"#ffcc00"}),e.jsx(s,{text:`${(A=r.summary)==null?void 0:A.totalSecurityThreats} Threats`,color:"#ff2244"})]})]}),e.jsx("div",{style:{display:"flex",gap:4,marginBottom:16,background:"#0d1117",borderRadius:10,padding:4,border:"1px solid #21262d"},children:J.map(t=>e.jsxs("button",{onClick:()=>L(t.id),className:"tab-btn",style:{flex:1,padding:"10px 8px",border:"none",borderRadius:7,cursor:"pointer",background:l===t.id?"#161b27":"transparent",color:l===t.id?"#e6edf3":"#8b949e",fontSize:13,fontWeight:l===t.id?700:400,fontFamily:"monospace",transition:"all 0.2s",boxShadow:l===t.id?"0 0 0 1px #30363d":"none"},children:[t.label," ",t.count!==void 0&&e.jsx("span",{style:{background:t.id==="sec"?"#ff224422":t.id==="bugs"?"#ff660022":"#ffcc0022",color:t.id==="sec"?"#ff2244":t.id==="bugs"?"#ff6600":"#ffcc00",borderRadius:99,padding:"1px 7px",fontSize:11,marginLeft:4},children:t.count})]},t.id))}),l==="bugs"&&e.jsx("div",{children:((B=r.bugs)==null?void 0:B.length)===0?e.jsx(d,{children:e.jsx("div",{style:{color:"#00ff9d",textAlign:"center",padding:20},children:"✅ Koi bugs nahi mile!"})}):(N=r.bugs)==null?void 0:N.map(t=>e.jsxs(d,{className:"card-hover",style:{borderLeft:`3px solid ${c[t.severity]||"#888"}`},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:10},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx(V,{color:c[t.severity]||"#888"}),e.jsx("span",{style:{fontWeight:700,fontSize:15},children:t.title})]}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx(s,{text:t.severity,color:c[t.severity]||"#888"}),e.jsx(s,{text:t.id,color:"#8b949e"})]})]}),e.jsx("div",{style:{color:"#8b949e",fontSize:12,marginBottom:8},children:t.description}),t.location&&e.jsxs("div",{style:{color:"#58a6ff",fontSize:11,marginBottom:10},children:["📍 ",t.location]}),t.fix&&e.jsxs("details",{children:[e.jsx("summary",{style:{cursor:"pointer",color:"#00ff9d",fontSize:12,fontWeight:700,marginBottom:6},children:"🔧 FIX CODE DEKHEIN →"}),e.jsx("pre",{style:{background:"#051a0f",border:"1px solid #00ff9d33",borderRadius:8,padding:"12px 14px",fontSize:12,color:"#00ff9d",overflow:"auto",marginTop:8,lineHeight:1.6},children:t.fix}),t.explanation&&e.jsxs("div",{style:{color:"#8b949e",fontSize:11,marginTop:6,fontStyle:"italic"},children:["💡 ",t.explanation]})]})]},t.id))}),l==="perf"&&e.jsx("div",{children:((W=r.performance)==null?void 0:W.length)===0?e.jsx(d,{children:e.jsx("div",{style:{color:"#00ff9d",textAlign:"center",padding:20},children:"✅ Performance already optimized hai!"})}):(P=r.performance)==null?void 0:P.map(t=>e.jsxs(d,{className:"card-hover",style:{borderLeft:`3px solid ${c[t.impact]||"#ffcc00"}`},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:10},children:[e.jsxs("span",{style:{fontWeight:700,fontSize:15},children:["⚡ ",t.title]}),e.jsxs("div",{style:{display:"flex",gap:6},children:[t.speedGain&&e.jsx(s,{text:`+${t.speedGain}`,color:"#00ff9d"}),e.jsx(s,{text:t.impact,color:c[t.impact]||"#ffcc00"})]})]}),e.jsx("div",{style:{color:"#8b949e",fontSize:12,marginBottom:8},children:t.description}),t.fix&&e.jsxs("details",{children:[e.jsx("summary",{style:{cursor:"pointer",color:"#ffcc00",fontSize:12,fontWeight:700},children:"⚡ OPTIMIZED CODE DEKHEIN →"}),e.jsx("pre",{style:{background:"#1a1400",border:"1px solid #ffcc0033",borderRadius:8,padding:"12px 14px",fontSize:12,color:"#ffcc00",overflow:"auto",marginTop:8},children:t.fix})]})]},t.id))}),l==="sec"&&e.jsx("div",{children:((O=r.security)==null?void 0:O.length)===0?e.jsx(d,{children:e.jsx("div",{style:{color:"#00ff9d",textAlign:"center",padding:20},children:"✅ Koi security threats nahi mile!"})}):(D=r.security)==null?void 0:D.map(t=>e.jsxs(d,{className:"card-hover",style:{borderLeft:`3px solid ${c[t.severity]||"#ff2244"}`},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:10},children:[e.jsxs("span",{style:{fontWeight:700,fontSize:15},children:[G[t.threat]||"⚠️"," ",t.title]}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx(s,{text:t.threat,color:"#ff2244"}),e.jsx(s,{text:t.severity,color:c[t.severity]||"#ff2244"})]})]}),e.jsx("div",{style:{color:"#8b949e",fontSize:12,marginBottom:6},children:t.description}),t.attackVector&&e.jsxs("div",{style:{background:"#2d0909",border:"1px solid #ff224422",borderRadius:6,padding:"8px 12px",fontSize:11,color:"#ff8888",marginBottom:8},children:["🎯 ",e.jsx("strong",{children:"Attack Vector:"})," ",t.attackVector]}),t.counterMeasure&&e.jsx(Y,{threat:t.threat,measure:t.counterMeasure}),t.fix&&e.jsxs("details",{style:{marginTop:8},children:[e.jsx("summary",{style:{cursor:"pointer",color:"#ff6666",fontSize:12,fontWeight:700},children:"🛡️ SECURE FIX DEKHEIN →"}),e.jsx("pre",{style:{background:"#2d0909",border:"1px solid #ff224433",borderRadius:8,padding:"12px 14px",fontSize:12,color:"#ff9999",overflow:"auto",marginTop:8},children:t.fix})]})]},t.id))})]}),!r&&!o&&e.jsxs("div",{style:{textAlign:"center",padding:"60px 20px",color:"#30363d"},children:[e.jsx("div",{style:{fontSize:64,marginBottom:16},children:"🛡️"}),e.jsx("div",{style:{fontSize:16,color:"#8b949e",marginBottom:8},children:"Apna React/Next.js code paste karein"}),e.jsx("div",{style:{fontSize:12,color:"#30363d"},children:"AI automatically bugs dhundhega · speed optimize karega · hackers ko reverse karega"})]})]})]})}export{oe as WebsiteShield};

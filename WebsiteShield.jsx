import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
//  WEBSITE SHIELD AI — Bug Fixer + Speed Optimizer + Hack Reverser
// ═══════════════════════════════════════════════════════════════

const SYSTEM_PROMPT = `You are WebShield AI — an elite website security and performance expert.

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
}`;

const severityColor = {
  critical: "#ff2244",
  high: "#ff6600",
  medium: "#ffcc00",
  low: "#00ccff",
};

const threatIcon = {
  XSS: "💉",
  CSRF: "🔄",
  SQL_INJECTION: "💣",
  CLICKJACKING: "👁️",
  DATA_EXPOSURE: "📤",
  DDOS: "🌊",
  OTHER: "⚠️",
};

const ScoreRing = ({ score, label, color }) => {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} fill="none" stroke="#1a1a2e" strokeWidth="8" />
        <circle
          cx="44" cy="44" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          transform="rotate(-90 44 44)"
          style={{ transition: "stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)" }}
        />
        <text x="44" y="49" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700" fontFamily="'Courier New', monospace">{score}</text>
      </svg>
      <span style={{ color: "#888", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>{label}</span>
    </div>
  );
};

const PulsingDot = ({ color }) => (
  <span style={{
    display: "inline-block", width: 8, height: 8, borderRadius: "50%",
    background: color, marginRight: 6,
    boxShadow: `0 0 0 0 ${color}`,
    animation: "pulse-ring 1.4s ease-out infinite",
  }} />
);

const Badge = ({ text, color }) => (
  <span style={{
    background: color + "22", color, border: `1px solid ${color}44`,
    borderRadius: 4, fontSize: 10, padding: "2px 7px", fontWeight: 700,
    letterSpacing: 1, textTransform: "uppercase", fontFamily: "monospace",
  }}>{text}</span>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: "linear-gradient(135deg, #0d1117 60%, #161b27)",
    border: "1px solid #21262d",
    borderRadius: 12, padding: "18px 20px", marginBottom: 12,
    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
    ...style,
  }}>{children}</div>
);

const AttackReverse = ({ threat, measure }) => {
  const [show, setShow] = useState(false);
  return (
    <div style={{ marginTop: 10 }}>
      <button onClick={() => setShow(!show)} style={{
        background: "linear-gradient(90deg,#ff2244,#ff6600)",
        border: "none", color: "#fff", borderRadius: 6, padding: "6px 14px",
        fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 1,
        fontFamily: "monospace",
      }}>
        ⚔️ {show ? "HIDE" : "REVERSE ATTACK"} →
      </button>
      {show && (
        <div style={{
          marginTop: 8, background: "#1a0010", border: "1px solid #ff224444",
          borderRadius: 8, padding: "12px 14px", fontSize: 12, color: "#ff8888",
          fontFamily: "monospace", lineHeight: 1.6,
        }}>
          <div style={{ color: "#ff2244", fontWeight: 700, marginBottom: 6 }}>⚔️ COUNTER-ATTACK:</div>
          {measure}
        </div>
      )}
    </div>
  );
};

export default function WebsiteShield() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("bugs");
  const [scanProgress, setScanProgress] = useState(0);
  const [scanPhase, setScanPhase] = useState("");
  const [animScore, setAnimScore] = useState({ before: 0, after: 0 });
  const intervalRef = useRef(null);

  const scanPhases = [
    "🔍 Code parsing kar raha hun...",
    "🐛 Bugs dhundh raha hun...",
    "⚡ Performance analyze kar raha hun...",
    "🛡️ Security threats scan kar raha hun...",
    "⚔️ Counter-attacks prepare kar raha hun...",
    "📊 Report generate ho rahi hai...",
  ];

  const runScan = useCallback(async () => {
    if (!code.trim()) {
      setError("⚠️ Pehle apna React/Next.js code paste karein!");
      return;
    }
    setLoading(true);
    setResult(null);
    setError("");
    setScanProgress(0);

    // Animated scan phases
    let phase = 0;
    setScanPhase(scanPhases[0]);
    intervalRef.current = setInterval(() => {
      phase++;
      if (phase < scanPhases.length) {
        setScanPhase(scanPhases[phase]);
        setScanProgress(Math.round((phase / scanPhases.length) * 85));
      }
    }, 900);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{
            role: "user",
            content: `Yeh meri React/Next.js website ka code hai. Isme se saare bugs, performance issues, aur security vulnerabilities dhundho aur JSON mein batao:\n\n\`\`\`jsx\n${code}\n\`\`\``
          }]
        }),
      });

      clearInterval(intervalRef.current);
      setScanProgress(95);
      setScanPhase("✅ Analysis complete!");

      const data = await response.json();
      const raw = data.content?.map(b => b.text || "").join("") || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      setScanProgress(100);
      setResult(parsed);
      setAnimScore({ before: 0, after: 0 });
      setTimeout(() => setAnimScore({
        before: parsed.summary?.overallScore || 0,
        after: parsed.summary?.scoreAfterFix || 0,
      }), 200);

    } catch (e) {
      clearInterval(intervalRef.current);
      setError("❌ Scan mein error aaya. Dobara try karein ya code check karein.");
    } finally {
      setLoading(false);
    }
  }, [code]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const tabs = [
    { id: "bugs", label: "🐛 Bugs", count: result?.bugs?.length },
    { id: "perf", label: "⚡ Speed", count: result?.performance?.length },
    { id: "sec", label: "🛡️ Security", count: result?.security?.length },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#010409",
      fontFamily: "'Courier New', 'JetBrains Mono', monospace",
      color: "#e6edf3",
      padding: "0 0 60px",
    }}>
      {/* Animated CSS */}
      <style>{`
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
      `}</style>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(180deg,#0d1117,#010409)",
        borderBottom: "1px solid #21262d",
        padding: "32px 0 24px",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "repeating-linear-gradient(0deg,transparent,transparent 2px,#00ff9d08 2px,#00ff9d08 4px)",
          pointerEvents: "none",
        }} />
        <div style={{
          fontSize: 42, fontWeight: 900, letterSpacing: -1,
          background: "linear-gradient(90deg,#00ff9d,#00ccff,#ff2244)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "glitch 8s ease-in-out infinite",
        }}>⚔️ WEBSITE SHIELD AI</div>
        <div style={{ color: "#8b949e", fontSize: 13, marginTop: 8, letterSpacing: 2 }}>
          BUG SCANNER · SPEED OPTIMIZER · HACK REVERSER
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>

        {/* CODE INPUT */}
        <Card>
          <div style={{ color: "#00ff9d", fontSize: 12, letterSpacing: 2, marginBottom: 10, fontWeight: 700 }}>
            📂 APNA REACT / NEXT.JS CODE PASTE KAREIN
          </div>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder={`// Example:\nimport React, { useState, useEffect } from 'react';\n\nexport default function MyComponent() {\n  const [data, setData] = useState();\n  \n  useEffect(() => {\n    fetch('/api/data').then(r => r.json()).then(setData);\n  }, []);\n  \n  return <div dangerouslySetInnerHTML={{__html: data}} />;\n}`}
            style={{
              width: "100%", minHeight: 200, background: "#0d1117",
              border: "1px solid #30363d", borderRadius: 8, padding: "14px 16px",
              color: "#c9d1d9", fontSize: 13, lineHeight: 1.7, resize: "vertical",
              fontFamily: "'Courier New', monospace", boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
            <span style={{ color: "#8b949e", fontSize: 11 }}>
              {code.length} characters · {code.split('\n').length} lines
            </span>
            <button
              onClick={runScan}
              disabled={loading}
              className="shield-btn"
              style={{
                background: loading ? "#21262d" : "linear-gradient(90deg,#00ff9d,#00ccff)",
                color: loading ? "#8b949e" : "#010409",
                border: "none", borderRadius: 8, padding: "12px 28px",
                fontSize: 14, fontWeight: 900, cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: 1, transition: "all 0.2s",
              }}
            >
              {loading ? "🔍 SCANNING..." : "🚀 SCAN & FIX KARO"}
            </button>
          </div>
        </Card>

        {/* SCAN PROGRESS */}
        {loading && (
          <Card style={{ animation: "fadeUp 0.3s ease" }}>
            <div style={{ color: "#00ff9d", fontSize: 12, marginBottom: 12 }}>{scanPhase}</div>
            <div style={{ background: "#21262d", borderRadius: 99, height: 8, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 99,
                background: "linear-gradient(90deg,#00ff9d,#00ccff)",
                width: `${scanProgress}%`, transition: "width 0.6s ease",
                boxShadow: "0 0 12px #00ff9d88",
              }} />
            </div>
            <div style={{ color: "#8b949e", fontSize: 11, marginTop: 6, textAlign: "right" }}>{scanProgress}%</div>
          </Card>
        )}

        {error && (
          <div style={{
            background: "#2d0909", border: "1px solid #ff224444", borderRadius: 10,
            padding: "14px 18px", color: "#ff6666", fontSize: 13, marginBottom: 16,
            animation: "fadeUp 0.3s ease",
          }}>{error}</div>
        )}

        {/* RESULTS */}
        {result && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>

            {/* SCORE DASHBOARD */}
            <Card style={{ marginBottom: 20 }}>
              <div style={{ color: "#8b949e", fontSize: 11, letterSpacing: 2, marginBottom: 18 }}>📊 WEBSITE HEALTH REPORT</div>
              <div style={{ display: "flex", gap: 20, justifyContent: "space-around", flexWrap: "wrap", marginBottom: 20 }}>
                <ScoreRing score={animScore.before} label="Before Fix" color="#ff4444" />
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 8 }}>
                  <div style={{ fontSize: 28 }}>→</div>
                  <div style={{ fontSize: 10, color: "#8b949e", letterSpacing: 1 }}>AI FIX</div>
                </div>
                <ScoreRing score={animScore.after} label="After Fix" color="#00ff9d" />
              </div>
              <div style={{
                background: "#161b27", borderRadius: 8, padding: "12px 16px",
                border: "1px solid #ff224422", color: "#ff8888", fontSize: 12,
              }}>
                🎯 <strong>Critical Finding:</strong> {result.summary?.criticalFindings}
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
                <Badge text={`${result.summary?.totalBugs} Bugs`} color="#ff6600" />
                <Badge text={`${result.summary?.totalPerformanceIssues} Perf Issues`} color="#ffcc00" />
                <Badge text={`${result.summary?.totalSecurityThreats} Threats`} color="#ff2244" />
              </div>
            </Card>

            {/* TABS */}
            <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "#0d1117", borderRadius: 10, padding: 4, border: "1px solid #21262d" }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} className="tab-btn" style={{
                  flex: 1, padding: "10px 8px", border: "none", borderRadius: 7, cursor: "pointer",
                  background: tab === t.id ? "#161b27" : "transparent",
                  color: tab === t.id ? "#e6edf3" : "#8b949e",
                  fontSize: 13, fontWeight: tab === t.id ? 700 : 400,
                  fontFamily: "monospace", transition: "all 0.2s",
                  boxShadow: tab === t.id ? "0 0 0 1px #30363d" : "none",
                }}>
                  {t.label} {t.count !== undefined && (
                    <span style={{
                      background: t.id === "sec" ? "#ff224422" : t.id === "bugs" ? "#ff660022" : "#ffcc0022",
                      color: t.id === "sec" ? "#ff2244" : t.id === "bugs" ? "#ff6600" : "#ffcc00",
                      borderRadius: 99, padding: "1px 7px", fontSize: 11, marginLeft: 4,
                    }}>{t.count}</span>
                  )}
                </button>
              ))}
            </div>

            {/* BUGS TAB */}
            {tab === "bugs" && (
              <div>
                {result.bugs?.length === 0 ? (
                  <Card><div style={{ color: "#00ff9d", textAlign: "center", padding: 20 }}>✅ Koi bugs nahi mile!</div></Card>
                ) : result.bugs?.map(bug => (
                  <Card key={bug.id} className="card-hover" style={{ borderLeft: `3px solid ${severityColor[bug.severity] || "#888"}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <PulsingDot color={severityColor[bug.severity] || "#888"} />
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{bug.title}</span>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Badge text={bug.severity} color={severityColor[bug.severity] || "#888"} />
                        <Badge text={bug.id} color="#8b949e" />
                      </div>
                    </div>
                    <div style={{ color: "#8b949e", fontSize: 12, marginBottom: 8 }}>{bug.description}</div>
                    {bug.location && <div style={{ color: "#58a6ff", fontSize: 11, marginBottom: 10 }}>📍 {bug.location}</div>}
                    {bug.fix && (
                      <details>
                        <summary style={{ cursor: "pointer", color: "#00ff9d", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                          🔧 FIX CODE DEKHEIN →
                        </summary>
                        <pre style={{
                          background: "#051a0f", border: "1px solid #00ff9d33", borderRadius: 8,
                          padding: "12px 14px", fontSize: 12, color: "#00ff9d", overflow: "auto",
                          marginTop: 8, lineHeight: 1.6,
                        }}>{bug.fix}</pre>
                        {bug.explanation && (
                          <div style={{ color: "#8b949e", fontSize: 11, marginTop: 6, fontStyle: "italic" }}>
                            💡 {bug.explanation}
                          </div>
                        )}
                      </details>
                    )}
                  </Card>
                ))}
              </div>
            )}

            {/* PERFORMANCE TAB */}
            {tab === "perf" && (
              <div>
                {result.performance?.length === 0 ? (
                  <Card><div style={{ color: "#00ff9d", textAlign: "center", padding: 20 }}>✅ Performance already optimized hai!</div></Card>
                ) : result.performance?.map(p => (
                  <Card key={p.id} className="card-hover" style={{ borderLeft: `3px solid ${severityColor[p.impact] || "#ffcc00"}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>⚡ {p.title}</span>
                      <div style={{ display: "flex", gap: 6 }}>
                        {p.speedGain && <Badge text={`+${p.speedGain}`} color="#00ff9d" />}
                        <Badge text={p.impact} color={severityColor[p.impact] || "#ffcc00"} />
                      </div>
                    </div>
                    <div style={{ color: "#8b949e", fontSize: 12, marginBottom: 8 }}>{p.description}</div>
                    {p.fix && (
                      <details>
                        <summary style={{ cursor: "pointer", color: "#ffcc00", fontSize: 12, fontWeight: 700 }}>
                          ⚡ OPTIMIZED CODE DEKHEIN →
                        </summary>
                        <pre style={{
                          background: "#1a1400", border: "1px solid #ffcc0033", borderRadius: 8,
                          padding: "12px 14px", fontSize: 12, color: "#ffcc00", overflow: "auto", marginTop: 8,
                        }}>{p.fix}</pre>
                      </details>
                    )}
                  </Card>
                ))}
              </div>
            )}

            {/* SECURITY TAB */}
            {tab === "sec" && (
              <div>
                {result.security?.length === 0 ? (
                  <Card><div style={{ color: "#00ff9d", textAlign: "center", padding: 20 }}>✅ Koi security threats nahi mile!</div></Card>
                ) : result.security?.map(s => (
                  <Card key={s.id} className="card-hover" style={{ borderLeft: `3px solid ${severityColor[s.severity] || "#ff2244"}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>
                        {threatIcon[s.threat] || "⚠️"} {s.title}
                      </span>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Badge text={s.threat} color="#ff2244" />
                        <Badge text={s.severity} color={severityColor[s.severity] || "#ff2244"} />
                      </div>
                    </div>
                    <div style={{ color: "#8b949e", fontSize: 12, marginBottom: 6 }}>{s.description}</div>
                    {s.attackVector && (
                      <div style={{
                        background: "#2d0909", border: "1px solid #ff224422", borderRadius: 6,
                        padding: "8px 12px", fontSize: 11, color: "#ff8888", marginBottom: 8,
                      }}>
                        🎯 <strong>Attack Vector:</strong> {s.attackVector}
                      </div>
                    )}
                    {s.counterMeasure && (
                      <AttackReverse threat={s.threat} measure={s.counterMeasure} />
                    )}
                    {s.fix && (
                      <details style={{ marginTop: 8 }}>
                        <summary style={{ cursor: "pointer", color: "#ff6666", fontSize: 12, fontWeight: 700 }}>
                          🛡️ SECURE FIX DEKHEIN →
                        </summary>
                        <pre style={{
                          background: "#2d0909", border: "1px solid #ff224433", borderRadius: 8,
                          padding: "12px 14px", fontSize: 12, color: "#ff9999", overflow: "auto", marginTop: 8,
                        }}>{s.fix}</pre>
                      </details>
                    )}
                  </Card>
                ))}
              </div>
            )}

          </div>
        )}

        {/* EMPTY STATE */}
        {!result && !loading && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#30363d" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🛡️</div>
            <div style={{ fontSize: 16, color: "#8b949e", marginBottom: 8 }}>
              Apna React/Next.js code paste karein
            </div>
            <div style={{ fontSize: 12, color: "#30363d" }}>
              AI automatically bugs dhundhega · speed optimize karega · hackers ko reverse karega
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

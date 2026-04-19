// ============================================================
// USAGE GUIDE - Kaise Use Karein
// ============================================================

// ─────────────────────────────────────────────────────────
// OPTION 1: _app.js mein lagayen (Poori website protect hogi)
// File: pages/_app.js
// ─────────────────────────────────────────────────────────

import useWebsiteProtection from "../hooks/useWebsiteProtection";

export default function MyApp({ Component, pageProps }) {
  // Poori website ke liye protection
  useWebsiteProtection({
    disableRightClick: true,       // Right-click band
    disableTextCopy: true,         // Copy/paste band
    disableDevTools: true,         // F12, Ctrl+Shift+I band
    disableImageDownload: true,    // Image download band
    warningMessage: "⚠️ Yeh action is website par allowed nahi hai.",
  });

  return <Component {...pageProps} />;
}


// ─────────────────────────────────────────────────────────
// OPTION 2: Next.js 13+ App Router ke liye
// File: app/layout.js
// ─────────────────────────────────────────────────────────

"use client"; // Zaruri hai!
import useWebsiteProtection from "../hooks/useWebsiteProtection";

export default function RootLayout({ children }) {
  useWebsiteProtection({
    disableRightClick: true,
    disableTextCopy: true,
    disableDevTools: true,
    disableImageDownload: true,
  });

  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}


// ─────────────────────────────────────────────────────────
// OPTION 3: Sirf ek specific page par
// File: pages/my-page.js
// ─────────────────────────────────────────────────────────

import useWebsiteProtection from "../hooks/useWebsiteProtection";

export default function MyPage() {
  // Sirf is page par protection
  useWebsiteProtection({
    disableRightClick: true,
    disableImageDownload: true,
    disableTextCopy: false,   // Is page par copy allowed hai
    disableDevTools: true,
  });

  return <div>Mera Protected Page</div>;
}


// ─────────────────────────────────────────────────────────
// FILE STRUCTURE (Kahan rakkhein)
// ─────────────────────────────────────────────────────────
//
// aapka-project/
// ├── hooks/
// │   └── useWebsiteProtection.js   ← Yahan rakhein
// ├── pages/
// │   ├── _app.js                   ← Yahan import karein
// │   └── index.js
// └── app/
//     └── layout.js                 ← App Router ke liye


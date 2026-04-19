// ============================================================
// useWebsiteProtection.js
// React/Next.js ke liye Complete Website Protection Hook
// Use: import karein aur _app.js ya layout.js mein lagayen
// ============================================================

import { useEffect } from "react";

const useWebsiteProtection = (options = {}) => {
  const {
    disableRightClick = true,       // Right-click band karna
    disableTextCopy = true,         // Text copy rokna
    disableDevTools = true,         // Developer tools block karna
    disableImageDownload = true,    // Image download rokna
    warningMessage = "⚠️ Yeh action is website par allowed nahi hai.", // Custom message
  } = options;

  useEffect(() => {
    // ─────────────────────────────────────────
    // 1. RIGHT-CLICK DISABLE
    // ─────────────────────────────────────────
    const handleContextMenu = (e) => {
      if (disableRightClick) {
        e.preventDefault();
        showWarning(warningMessage);
      }
    };

    // ─────────────────────────────────────────
    // 2. TEXT COPY / CUT / SELECT ROKNA
    // ─────────────────────────────────────────
    const handleCopy = (e) => {
      if (disableTextCopy) {
        e.preventDefault();
        showWarning("📋 Copy karna is website par allowed nahi hai.");
      }
    };

    const handleCut = (e) => {
      if (disableTextCopy) {
        e.preventDefault();
      }
    };

    const handleSelectStart = (e) => {
      if (disableTextCopy) {
        e.preventDefault();
      }
    };

    // ─────────────────────────────────────────
    // 3. IMAGE DRAG & DOWNLOAD ROKNA
    // ─────────────────────────────────────────
    const handleDragStart = (e) => {
      if (disableImageDownload && e.target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    // ─────────────────────────────────────────
    // 4. DEVELOPER TOOLS BLOCK (Keyboard shortcuts)
    // ─────────────────────────────────────────
    const handleKeyDown = (e) => {
      if (disableDevTools) {
        // F12
        if (e.key === "F12") {
          e.preventDefault();
          showWarning("🔒 Developer tools is website par band hain.");
          return;
        }

        // Ctrl+Shift+I / Cmd+Shift+I (Inspect Element)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "I") {
          e.preventDefault();
          showWarning("🔒 Inspect karna allowed nahi hai.");
          return;
        }

        // Ctrl+Shift+J / Cmd+Shift+J (Console)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "J") {
          e.preventDefault();
          return;
        }

        // Ctrl+Shift+C (Element picker)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
          e.preventDefault();
          return;
        }

        // Ctrl+U (View Source)
        if ((e.ctrlKey || e.metaKey) && e.key === "u") {
          e.preventDefault();
          showWarning("🔒 Source code dekhna allowed nahi hai.");
          return;
        }

        // Ctrl+S (Save Page)
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
          e.preventDefault();
          showWarning("💾 Page save karna allowed nahi hai.");
          return;
        }

        // Ctrl+C (Copy)
        if (disableTextCopy && (e.ctrlKey || e.metaKey) && e.key === "c") {
          e.preventDefault();
          showWarning("📋 Copy karna is website par allowed nahi hai.");
          return;
        }

        // Ctrl+A (Select All)
        if (disableTextCopy && (e.ctrlKey || e.metaKey) && e.key === "a") {
          e.preventDefault();
          return;
        }

        // Ctrl+P (Print - source expose hota hai)
        if ((e.ctrlKey || e.metaKey) && e.key === "p") {
          e.preventDefault();
          showWarning("🖨️ Print karna is website par allowed nahi hai.");
          return;
        }
      }
    };

    // ─────────────────────────────────────────
    // 5. DEVTOOLS OPEN DETECTION (Window size trick)
    // ─────────────────────────────────────────
    let devToolsOpen = false;

    const detectDevTools = () => {
      if (!disableDevTools) return;

      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      if (widthDiff > threshold || heightDiff > threshold) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          // Optional: Redirect ya clear kar sakte hain
          // window.location.href = "/"; // Uncomment karo agar redirect chahiye
          console.clear();
          console.log(
            "%c⛔ STOP!",
            "color: red; font-size: 40px; font-weight: bold;"
          );
          console.log(
            "%cYeh browser feature developers ke liye hai. Agar koi aapko yahan kuch paste karne bol raha hai toh yeh scam ho sakta hai.",
            "color: orange; font-size: 14px;"
          );
        }
      } else {
        devToolsOpen = false;
      }
    };

    const devToolsInterval = setInterval(detectDevTools, 1000);

    // ─────────────────────────────────────────
    // 6. IMAGE RIGHT-CLICK aur LONG-PRESS (Mobile)
    // ─────────────────────────────────────────
    const handleTouchStart = (e) => {
      if (disableImageDownload && e.target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    // ─────────────────────────────────────────
    // CSS inject karna: user-select none + pointer-events
    // ─────────────────────────────────────────
    const styleId = "website-protection-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        ${disableTextCopy ? "* { user-select: none !important; -webkit-user-select: none !important; }" : ""}
        ${disableImageDownload ? "img { pointer-events: none !important; -webkit-user-drag: none !important; }" : ""}
        ${disableImageDownload ? "img::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; }" : ""}
      `;
      document.head.appendChild(style);
    }

    // ─────────────────────────────────────────
    // Event Listeners Add Karo
    // ─────────────────────────────────────────
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleTouchStart, { passive: false });

    // ─────────────────────────────────────────
    // Cleanup (Component unmount par)
    // ─────────────────────────────────────────
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleTouchStart);
      clearInterval(devToolsInterval);

      const style = document.getElementById(styleId);
      if (style) style.remove();
    };
  }, [disableRightClick, disableTextCopy, disableDevTools, disableImageDownload, warningMessage]);
};

// ─────────────────────────────────────────
// Warning Toast Function
// ─────────────────────────────────────────
let toastTimeout = null;

const showWarning = (message) => {
  // Pehle se existing toast remove karo
  const existingToast = document.getElementById("protection-toast");
  if (existingToast) existingToast.remove();
  if (toastTimeout) clearTimeout(toastTimeout);

  const toast = document.createElement("div");
  toast.id = "protection-toast";
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    color: #fff;
    padding: 14px 28px;
    border-radius: 12px;
    font-family: 'Segoe UI', sans-serif;
    font-size: 14px;
    font-weight: 500;
    z-index: 999999;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,100,100,0.3);
    border-left: 4px solid #ff4444;
    animation: slideDown 0.3s ease;
    pointer-events: none;
  `;
  toast.textContent = message;

  // Animation CSS
  const animStyle = document.createElement("style");
  animStyle.textContent = `
    @keyframes slideDown {
      from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
  `;
  document.head.appendChild(animStyle);
  document.body.appendChild(toast);

  toastTimeout = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

export default useWebsiteProtection;

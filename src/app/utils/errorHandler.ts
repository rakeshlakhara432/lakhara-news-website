import { toast } from "sonner";

/**
 * Unified Error Handler for Lakhara Digital News Network
 * This utility handles:
 * 1. Async function wrapping with auto-toast
 * 2. API error formatting
 * 3. Logging (can be extended to Sentry/Firebase)
 */

export const handleError = (error: any, customMessage?: string) => {
  console.error("Website Error:", error);

  let message = customMessage || "कुछ गलत हुआ, कृपया पुन: प्रयास करें।";

  if (typeof error === "string") {
    message = error;
  } else if (error?.message) {
    message = error.message;
  }

  // Common Firebase Errors
  if (error?.code === "permission-denied") {
    message = "आपके पास इस कार्य के लिए अनुमति नहीं है।";
  } else if (error?.code === "unauthenticated") {
    message = "कृपया पहले लॉगिन करें।";
  } else if (error?.code === "unavailable") {
    message = "सर्वर उपलब्ध नहीं है। कृपया अपना इंटरनेट चेक करें।";
  }

  toast.error(message, {
    description: "यदि समस्या बनी रहती है, तो एडमिन से संपर्क करें।",
    duration: 5000,
  });
};

/**
 * Higher-order function to wrap async functions with error handling
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  customMessage?: string
): (...args: Parameters<T>) => Promise<ReturnType<T> | undefined> {
  return async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, customMessage);
      return undefined;
    }
  };
}

/**
 * Global listener for unhandled rejections
 */
export const initGlobalErrorHandling = () => {
  window.addEventListener("unhandledrejection", (event) => {
    handleError(event.reason, "सर्वर रिस्पॉन्स में त्रुटि (Unhandled Rejection)");
  });

  window.addEventListener("error", (event) => {
    // Ignore resizing errors often caused by browser extensions
    if (event.message?.includes("ResizeObserver")) return;
    handleError(event.error, "सिस्टम त्रुटि: " + event.message);
  });
};

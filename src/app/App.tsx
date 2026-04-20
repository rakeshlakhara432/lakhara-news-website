import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { db } from "./data/database";
import useWebsiteProtection from "./hooks/useWebsiteProtection";

import { ErrorBoundary } from "./components/ui/ErrorBoundary";

export default function App() {
  // Complete Website Protection - Blocks right click, copying, DevTools etc.
  useWebsiteProtection();

  useEffect(() => {
    const settings = db.getTable('settings');
    if (settings?.primaryColor) {
      document.documentElement.style.setProperty('--primary', settings.primaryColor);
    }
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}


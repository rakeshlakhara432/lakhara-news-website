import React, { Component, ErrorInfo, ReactNode } from "react";
import { ShieldAlert, RotateCcw, Home } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-slate-200 space-y-8 animate-in fade-in zoom-in duration-500">
             <div className="size-24 bg-rose-50 text-rose-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner ring-8 ring-rose-50">
                <ShieldAlert className="size-12" />
             </div>
             <div className="space-y-2">
                <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Oops! सिस्टम <span className="text-rose-600">क्रैश</span></h1>
                <p className="text-slate-500 font-bold text-sm tracking-wide">क्षमा करें, कुछ तकनीकी समस्या आ गई है। कृपया पेज को रिफ्रेश करें।</p>
             </div>
             
             <div className="bg-slate-50 p-4 rounded-2xl text-[10px] font-mono text-slate-400 text-left overflow-auto max-h-32 border border-slate-100">
                {this.state.error?.message}
             </div>

             <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all"
                >
                   <RotateCcw className="size-4" /> रिफ्रेश करें
                </button>
                <a 
                  href="/"
                  className="flex-1 bg-orange-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
                >
                   <Home className="size-4" /> होम पेज
                </a>
             </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

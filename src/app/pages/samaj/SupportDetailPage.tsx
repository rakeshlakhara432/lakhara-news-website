import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { 
  GraduationCap, Heart, Briefcase, Phone, 
  ArrowLeft, Loader2, Calendar, Share2, 
  MessageSquare, Info, ShieldCheck, Mail
} from "lucide-react";
import { samajService, SupportPost } from "../../services/samajService";
import { toast } from "sonner";

export function SupportDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<SupportPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    // Using subscribe to get real-time data or just fetching once
    const unsub = samajService.subscribeToSupport((posts) => {
      const found = posts.find(p => p.id === id);
      if (found) {
        setPost(found);
      } else {
        toast.error("Opportunity not found");
        navigate("/support");
      }
      setIsLoading(false);
    });

    return () => unsub();
  }, [id, navigate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="size-10 text-orange-600 animate-spin" />
        <p className="text-slate-500 font-medium">लोड हो रहा है...</p>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* BACK BUTTON */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold text-sm transition-colors group"
      >
        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" /> 
        पीछे जाएं
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT CONTENT (MAIN INFO) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm space-y-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full border border-orange-100 w-fit">
              <span className="text-[10px] font-bold uppercase tracking-wider">{post.type}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-slate-500 border-y border-slate-50 py-4">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide">
                <Calendar className="size-4" /> 
                {post.createdAt?.toDate?.().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }) || "Active"}
              </div>
              <div className="size-1 bg-slate-200 rounded-full"></div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide">
                <Info className="size-4" /> 
                {post.type} Opportunity
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare className="size-5 text-orange-600" /> विस्तृत जानकारी
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap text-base md:text-lg">
                {post.description}
              </p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-start gap-4">
             <ShieldCheck className="size-6 text-emerald-600 shrink-0 mt-1" />
             <div className="space-y-1">
                <h4 className="font-bold text-emerald-800">सत्यापित अवसर</h4>
                <p className="text-emerald-700/80 text-sm font-medium leading-relaxed">
                   यह सहायता अवसर लखारा डिजिटल न्यूज़ नेटवर्क द्वारा सत्यापित है। आवेदन करने के लिए नीचे दिए गए संपर्क माध्यमों का उपयोग करें।
                </p>
             </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (ACTION BOX) */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-6 shadow-xl sticky top-24">
            <div className="space-y-2">
               <p className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em]">Contact Person / Dept</p>
               <h4 className="text-xl font-bold flex items-center gap-2">
                 लखारा समाज सहायता सेल
               </h4>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
               <a 
                href={`tel:${post.contact}`}
                className="flex items-center justify-center gap-3 w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-xl font-bold transition-all shadow-lg shadow-orange-600/30 group"
               >
                 <Phone className="size-5 group-hover:rotate-12 transition-transform" />
                 अभी कॉल करें
               </a>
               <p className="text-center font-bold text-lg text-orange-400">{post.contact}</p>
               
               <button 
                onClick={handleShare}
                className="flex items-center justify-center gap-3 w-full bg-white/10 hover:bg-white/20 py-4 rounded-xl font-bold transition-all border border-white/10"
               >
                 <Share2 className="size-5" />
                 शेयर करें
               </button>
            </div>

            <div className="pt-4 text-center">
               <p className="text-[10px] font-semibold text-slate-400 leading-relaxed italic">
                 "शिक्षा समाज का आधार है, आइए मिलकर सशक्त बनें।"
               </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

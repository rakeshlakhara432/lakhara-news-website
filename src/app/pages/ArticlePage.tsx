import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getArticles } from "../data/mockData";
import { Clock, Eye, Share2, Facebook, Twitter, ArrowLeft, Bookmark, MessageCircle, Send, Zap, ChevronRight } from "lucide-react";
import { ArticleCard } from "../components/ArticleCard";
import { toggleSaveArticle, isArticleSaved } from "./ProfilePage";
import { toast } from "sonner";

export function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const articles = getArticles();
  const article = articles.find((a) => a.slug === slug);
  const [saved, setSaved] = useState(() => article ? isArticleSaved(article.id) : false);
  const [comment, setComment] = useState("");

  // Dynamic SEO Updates
  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Lakhara Digital News`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", article.excerpt);
    }
    window.scrollTo(0, 0);
  }, [article]);

  const handleBookmark = () => {
    if (!article) return;
    const result = toggleSaveArticle(article.id);
    setSaved(result);
    toast.success(result ? "खबर सहेज ली गई" : "खबर हटा दी गई");
  };

  const handleShare = (platform: 'fb' | 'tw' | 'wa') => {
    const url = window.location.href;
    const text = article?.title || "";
    
    let shareUrl = "";
    if (platform === 'fb') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    if (platform === 'tw') shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    if (platform === 'wa') shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`;
    
    window.open(shareUrl, "_blank");
  };

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-8">
        <div className="size-24 bg-gray-100 rounded-[2.5rem] flex items-center justify-center mx-auto text-gray-400">
           <Zap className="size-12" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 italic tracking-tighter uppercase">Intelligence Not Found</h1>
        <Link to="/" className="btn-lakhara inline-flex px-12 py-5 !rounded-[2rem]">
          Return to HQ
        </Link>
      </div>
    );
  }

  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 4);

  const formatDate = (date: any) => {
    if (!date) return "";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString("hi-IN", { 
      day: "numeric", 
      month: "long", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatViews = (views: number) => {
    if (views >= 100000) return `${(views / 100000).toFixed(1)}L`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <div className="container mx-auto px-4 md:px-0 py-12 space-y-16">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-4 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <div className="size-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
             <ArrowLeft className="size-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Feed</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-12">
            <article className="space-y-12">
              <div className="space-y-8">
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to={`/category/${article.category}`}
                    className="bg-gray-100 text-gray-900 border border-gray-200 px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-primary hover:text-white hover:border-primary transition-all"
                  >
                    {article.category}
                  </Link>
                  {article.isBreaking && (
                    <div className="bg-lakhara text-white px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lakhara animate-pulse border border-white/20">
                      CRITICAL BREAKING
                    </div>
                  )}
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-gray-950 italic tracking-tighter leading-[1.1]">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-8 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-8">
                  <div className="flex items-center gap-3">
                     <div className="size-8 rounded-full bg-lakhara flex items-center justify-center text-white">
                        {article.author[0]}
                     </div>
                     <span className="text-gray-900">{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-primary" />
                    {formatDate(article.createdAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="size-4 text-primary" />
                    {formatViews(article.views)} Intelligence Views
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <span className="flex items-center gap-3 px-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                  <Share2 className="size-4 text-primary" /> Share Network
                </span>
                <button 
                  onClick={() => handleShare('wa')}
                  className="flex items-center justify-center gap-3 px-6 py-3.5 bg-green-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg shadow-green-500/10 active:scale-95"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="size-4 brightness-0 invert" alt="" />
                  WhatsApp
                </button>
                <button 
                  onClick={() => handleShare('fb')}
                  className="flex items-center justify-center gap-3 px-6 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10 active:scale-95"
                >
                  <Facebook className="size-4 fill-current" />
                  Facebook
                </button>
                <button 
                  onClick={() => handleShare('tw')}
                  className="flex items-center justify-center gap-3 px-6 py-3.5 bg-gray-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-black/10 active:scale-95"
                >
                  <Twitter className="size-4 fill-current" />
                  Twitter
                </button>
                <div className="ml-auto">
                    <button
                      onClick={handleBookmark}
                      className={`size-14 rounded-2xl flex items-center justify-center transition-all ${
                        saved
                          ? "bg-lakhara text-white shadow-lakhara"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      <Bookmark className={`size-6 ${saved ? "fill-white" : ""}`} />
                    </button>
                </div>
              </div>

              {/* Featured Media */}
              <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border border-gray-100 aspect-video group">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Article content */}
              <div className="space-y-10">
                {article.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-xl md:text-2xl text-gray-800 leading-relaxed italic font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags Pipeline */}
              <div className="pt-12 border-t border-gray-100">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mr-4">Tags</span>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-6 py-3 bg-white border border-gray-100 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Professional Comments Section */}
              <div className="bg-white rounded-[3.5rem] p-12 md:p-16 border border-gray-100 shadow-sm space-y-10">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                       <div className="size-14 bg-gray-950 rounded-2xl flex items-center justify-center text-primary group">
                          <MessageCircle className="size-6" />
                       </div>
                       <h3 className="text-3xl font-black italic tracking-tighter uppercase">Operations Log</h3>
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">3 Active Transmissions</span>
                 </div>

                 <div className="space-y-6">
                    <div className="relative group">
                       <textarea
                         value={comment}
                         onChange={(e) => setComment(e.target.value)}
                         placeholder="Add your intelligence to the log..."
                         className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/10 rounded-[2rem] p-8 text-lg font-medium outline-none transition-all placeholder:text-gray-400 resize-none h-40"
                       />
                       <button 
                         className="absolute bottom-6 right-6 btn-lakhara !rounded-2xl px-8 py-3.5 flex items-center gap-3 opacity-0 group-focus-within:opacity-100 transition-all active:scale-95"
                       >
                         <span className="text-[10px] tracking-widest">TRANSMIT</span>
                         <Send className="size-4" />
                       </button>
                    </div>
                 </div>

                 <div className="space-y-8 pt-8">
                    {[1, 2].map(i => (
                      <div key={i} className="flex gap-6 pb-8 border-b border-gray-50 last:border-none">
                         <div className="size-14 rounded-2xl bg-gray-100 animate-pulse flex-shrink-0"></div>
                         <div className="space-y-3 flex-1">
                            <div className="flex items-center justify-between">
                               <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Network User • Operational</span>
                               <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">2h ago</span>
                            </div>
                            <p className="text-gray-600 font-medium italic">"Excellent coverage of the current theater. The digital optimization here is top-tier."</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            </article>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-12">
            {/* Newsletter Integration */}
            <div className="bg-gray-950 rounded-[3rem] p-10 text-white space-y-8 relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 size-40 bg-primary/10 rounded-full blur-[60px]"></div>
               <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase">HQ Transmission</h3>
                  <p className="text-gray-400 text-sm font-medium italic">Get the daily intelligence digest delivered to your secure address.</p>
                  <div className="space-y-4">
                     <input 
                       type="email" 
                       placeholder="Email Address" 
                       className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary/20 transition-all"
                     />
                     <button className="btn-lakhara w-full py-4 !rounded-2xl !text-[10px] tracking-[0.2em]">SUBSCRIBE NOW</button>
                  </div>
               </div>
            </div>

            {/* Recommended Feed */}
            <div className="space-y-8">
               <div className="flex items-center justify-between border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-black italic tracking-tighter uppercase">Related Signals</h3>
                  <Link to={`/category/${article.category}`} className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Explore More</Link>
               </div>
               <div className="space-y-4">
                  {relatedArticles.map((relArticle) => (
                    <ArticleCard key={relArticle.id} article={relArticle} variant="small" />
                  ))}
               </div>
            </div>

            {/* Ad Operations */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 text-center space-y-4 shadow-sm">
               <span className="text-[8px] font-black text-gray-300 uppercase tracking-[0.4em]">Operational Support</span>
               <div className="aspect-[300/250] bg-gray-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200 group cursor-pointer hover:bg-gray-100 transition-all">
                  <div className="space-y-2">
                     <Eye className="size-8 text-gray-200 mx-auto group-hover:text-primary transition-colors" />
                     <p className="text-gray-300 font-black text-[9px] uppercase tracking-widest">Network Partner Slot</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Category Network Expansion */}
        {relatedArticles.length > 0 && (
          <div className="pt-20 space-y-12">
            <div className="flex items-center justify-between">
               <h2 className="text-5xl font-black text-gray-950 italic tracking-tighter uppercase leading-none">
                 EXPANDED <span className="text-gradient">CHANNELS</span>
               </h2>
               <Link to="/" className="size-16 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
                  <ChevronRight className="size-8" />
               </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {relatedArticles.slice(0, 4).map((relArticle) => (
                <ArticleCard key={relArticle.id} article={relArticle} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


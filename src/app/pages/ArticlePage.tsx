import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Bookmark, Share2, ArrowLeft, ArrowRight, Clock, Eye, Flag, Zap, MessageCircle, Send, Radio } from "lucide-react";
import { ArticleCard } from "../components/ArticleCard";
import { toast } from "sonner";
import { newsService, Article } from "../services/newsService";

export function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const unsubscribe = newsService.subscribeToArticles((data) => {
      setArticles(data);
      const found = data.find((a) => a.slug === slug);
      if (found) {
        setArticle(found);
        // Track view
        if (found.id) newsService.incrementViews(found.id);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-white/50 backdrop-blur-3xl animate-in fade-in duration-1000">
        <div className="size-20 bg-primary/5 rounded-[2rem] flex items-center justify-center animate-pulse border-4 border-primary/20">
           <Radio className="size-10 text-primary animate-pulse" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-6 py-32 text-center space-y-10">
        <div className="size-24 bg-gray-100 rounded-[3rem] flex items-center justify-center mx-auto text-primary/10">
           <Flag className="size-12" />
        </div>
        <h1 className="text-4xl font-black text-gray-950 italic tracking-tighter uppercase leading-none">खबर अनुपलब्ध</h1>
        <Link to="/" className="btn-ai-primary !bg-primary !px-12 !py-5 !text-base !rounded-[2rem] shadow-bhagva">
          मुख्य पृष्ठ पर लौटें
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

  return (
    <div className="bg-[#FFFDFB] min-h-screen pb-32 animate-traditional relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[500px] bg-primary/5 mandala-bg z-0 pointer-events-none"></div>
      
      <div className="container mx-auto max-w-7xl px-6 py-10 space-y-16 relative z-10">
        
        {/* 🔝 TRADITIONAL ACTIONS */}
        <div className="flex items-center justify-between">
           <button
             onClick={() => navigate(-1)}
             className="group flex items-center gap-4 text-gray-500 hover:text-primary transition-all active:scale-95"
           >
             <div className="size-14 bg-white rounded-[2rem] border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white shadow-traditional group-hover:shadow-bhagva transition-all rotate-[-12deg] group-hover:rotate-0">
                <ArrowLeft className="size-6" />
             </div>
             <span className="text-base font-black uppercase tracking-[0.3em] italic">पीछे जाएँ</span>
           </button>

           <div className="flex items-center gap-3">
              <button className="size-14 bg-white rounded-[2rem] border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary shadow-traditional hover:shadow-bhagva transition-all active:scale-90">
                 <Bookmark className="size-6" />
              </button>
              <button className="size-14 bg-white rounded-[2rem] border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary shadow-traditional hover:shadow-bhagva transition-all active:scale-90">
                 <Share2 className="size-6" />
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Article Main Sector */}
          <div className="lg:col-span-8 space-y-16">
            <article className="space-y-16">
              <div className="space-y-10">
                <div className="flex flex-wrap items-center gap-5">
                  <div className="bg-primary text-white px-8 py-2.5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-lg border border-white/20 flex items-center gap-3 skew-x-[-12deg]">
                    <Flag className="size-4 fill-current animate-pulse" /> लखारा विशेष
                  </div>
                  <Link
                    to={`/category/${article.category}`}
                    className="bg-white border-2 border-gray-100 text-gray-500 px-8 py-2.5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:text-primary hover:border-primary/20 transition-all shadow-sm"
                  >
                    {article.category}
                  </Link>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-gray-950 italic tracking-tighter leading-[1.1] drop-shadow-xl border-l-[12px] border-primary pl-8">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-10 text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] border-b-2 border-gray-50 pb-10">
                  <div className="flex items-center gap-4 text-gray-950">
                     <div className="size-12 rounded-[1.5rem] bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-2xl skew-x-[-8deg] rotate-[-12deg]">
                        {article.author[0]}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-base leading-none mb-1">{article.author}</span>
                        <span className="text-[10px] text-primary opacity-50">संपादकीय प्रमुख</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="size-4 text-primary" /> प्रकाशित: {formatDate(article.createdAt)}
                  </div>
                  <div className="flex items-center gap-3">
                    <Eye className="size-4 text-primary" /> {(article.views / 1000).toFixed(1)}k बार देखा गया
                  </div>
                </div>
              </div>

              {/* 📷 FEATURED IMAGE */}
              <div className="relative rounded-[4rem] overflow-hidden shadow-bhagva group border-[10px] border-white transition-all duration-[1s] hover:rotate-[-1deg]">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="size-full object-cover group-hover:scale-110 transition-transform duration-[4s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* 🚩 TRADITIONAL BRIEFING BOX */}
              <div className="bg-primary/5 rounded-[3rem] p-10 md:p-16 border-l-[12px] border-primary relative overflow-hidden group shadow-traditional">
                 <div className="absolute top-0 right-0 size-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                 <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-4 text-[10px] font-black text-primary uppercase tracking-[0.5em]">
                       <Zap className="size-5 fill-current animate-pulse" /> खबर का सारांश
                    </div>
                    <p className="text-gray-950 text-xl md:text-2xl font-black italic leading-tight opacity-90">
                       "{article.excerpt}"
                    </p>
                 </div>
              </div>

              {/* CONTENT FLOW (Traditional) */}
              <div className="space-y-10">
                {article.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-xl md:text-2xl text-gray-800 leading-relaxed italic font-bold opacity-90 first-letter:text-6xl first-letter:text-primary first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* CATEGORY TAGS */}
              <div className="pt-16 border-t-2 border-gray-50 flex flex-wrap items-center gap-4">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mr-6">सम्बंधित विषय:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-8 py-3 bg-white border-2 border-gray-100 text-gray-500 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:border-primary/40 hover:text-primary transition-all cursor-pointer shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 🏵️ चर्चा बॉक्स (Comments) */}
              <div className="bg-white rounded-[4rem] p-10 md:p-16 shadow-bhagva border border-gray-100 space-y-12 group relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-3 bg-primary"></div>
                 <div className="flex items-center gap-6 relative z-10">
                    <div className="size-16 bg-primary text-white rounded-[2rem] flex items-center justify-center shadow-2xl rotate-[-12deg] group-hover:rotate-0 transition-transform duration-700">
                       <MessageCircle className="size-8" />
                    </div>
                    <div>
                       <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">चर्चा <span className="text-primary">बॉक्स</span></h3>
                       <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mt-2">सभ्य एवं निष्पक्ष चर्चा का केंद्र</p>
                    </div>
                 </div>

                 <div className="space-y-8 relative z-10">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="अपनी राय यहाँ साझा करें..."
                      className="w-full bg-gray-50 border-4 border-transparent focus:border-primary/10 focus:bg-white rounded-[2.5rem] p-8 text-xl font-bold italic outline-none transition-all placeholder:text-gray-200 resize-none h-48"
                    />
                    <button className="btn-ai-primary !bg-primary !rounded-[2rem] w-full py-6 text-lg group shadow-bhagva">
                       सन्देश साझा करें <Send className="size-5 ml-2 group-hover:translate-x-3 transition-transform" />
                    </button>
                 </div>
              </div>
            </article>
          </div>

          {/* 🚩 TRADITIONAL SIDEBAR (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 space-y-16">
            {/* LAKHARA MISSION BOX */}
            <div className="bg-primary rounded-[3rem] p-10 text-white space-y-8 relative overflow-hidden shadow-2xl border-6 border-white group">
               <div className="absolute inset-0 mandala-bg opacity-10"></div>
               <div className="relative z-10 text-center space-y-6">
                  <Flag className="size-16 mx-auto fill-current animate-pulse" />
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">हमारा संकल्प</h3>
                  <p className="text-primary-foreground font-extrabold italic text-lg leading-relaxed opacity-90">
                     "जन जन की आवाज़, राष्ट्र का गौरव। निष्पक्ष समाचार ही हमारा श्रृंगार।"
                  </p>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                     <div className="h-full bg-secondary w-full group-hover:translate-x-full transition-transform duration-[3s] ease-linear repeat-infinite"></div>
                  </div>
               </div>
            </div>

            {/* RELATED SIGNALS (Bhagva Sidebar) */}
            <div className="space-y-12">
               <div className="flex items-center gap-5 border-l-[8px] border-primary pl-8">
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">अन्य <span className="text-primary">मुख्य खबरें</span></h3>
               </div>
               <div className="space-y-8">
                  {relatedArticles.map((relArticle) => (
                    <ArticleCard key={relArticle.id} article={relArticle} variant="small" />
                  ))}
               </div>
               <Link to="/" className="btn-ai-primary !bg-white !text-primary border-4 border-primary/10 !rounded-[2rem] w-full py-5 group shadow-sm hover:shadow-bhagva">
                  सभी खबरें देखें <ArrowRight className="size-5 group-hover:translate-x-3 transition-transform" />
               </Link>
            </div>

            {/* AD SPACE (Traditional) */}
            <div className="bg-white rounded-[3.5rem] p-10 border-4 border-gray-100 text-center space-y-6 shadow-traditional group hover:shadow-bhagva transition-all duration-700">
               <span className="text-[10px] font-black text-gray-200 uppercase tracking-[0.8em]">प्रायोजित लिंक</span>
               <div className="aspect-[300/500] bg-gray-50 rounded-[3rem] flex flex-col items-center justify-center border-4 border-dashed border-gray-200 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-700">
                   <div className="space-y-8 text-center px-8">
                      <Zap className="size-16 text-gray-100 group-hover:text-primary transition-all duration-1000 group-hover:scale-125 group-hover:rotate-[360deg]" />
                      <p className="text-base font-black text-gray-300 uppercase tracking-[0.2em] italic group-hover:text-primary/50 leading-relaxed">विज्ञापन हेतु स्थान उपलब्ध</p>
                   </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Bookmark, Share2, ArrowLeft, ArrowRight, Clock, Eye, Send, Radio, X, ShieldCheck, User } from "lucide-react";
import { ArticleCard } from "../components/ArticleCard";
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
        if (found.id) newsService.incrementViews(found.id);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-6 border-8 border-primary p-20 shadow-bhagva-flat">
           <span className="text-7xl font-black text-gray-950 tracking-tighter uppercase italic border-b-8 border-primary">LAKHARA</span>
           <span className="text-[16px] font-black text-primary uppercase tracking-[0.8em] italic">पढ़ते रहिए, आगे बढ़ते रहिए</span>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-6 py-20 text-center space-y-12 border-[16px] border-gray-950 max-w-4xl mt-24 bg-white shadow-bhagva-flat">
        <h1 className="text-6xl font-black text-gray-950 uppercase tracking-tighter italic border-b-8 border-primary inline-block pb-4">खबर अनुपलब्ध</h1>
        <p className="text-gray-400 font-black uppercase tracking-[0.6em] text-sm italic">UNABLE TO LOCATE ARCHIVE SIGNAL</p>
        <Link to="/" className="inline-block bg-primary text-white px-20 py-8 font-black uppercase tracking-[0.4em] hover:bg-gray-950 transition-colors border-none outline-none italic shadow-bhagva-flat text-2xl">
          मुख्य पृष्ठ
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
      year: "numeric"
    });
  };

  return (
    <div className="bg-white min-h-screen pb-40">
      
      {/* 🔝 STRIPED TOP NAVIGATION */}
      <div className="bg-gray-950 border-b-8 border-primary mb-12">
        <div className="container mx-auto max-w-7xl px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
           <button
             onClick={() => navigate(-1)}
             className="flex items-center gap-6 text-white hover:text-primary font-black uppercase tracking-[0.4em] text-[12px] italic transition-colors w-max"
           >
             <ArrowLeft className="size-6" /> वापस लौटें
           </button>

           <div className="flex items-center gap-4">
              <button className="size-16 bg-white border-4 border-gray-100 flex items-center justify-center text-gray-950 hover:bg-primary hover:text-white hover:border-primary transition-colors shadow-bhagva-flat">
                 <Bookmark className="size-8" />
              </button>
              <button className="size-16 bg-white border-4 border-gray-100 flex items-center justify-center text-gray-950 hover:bg-primary hover:text-white hover:border-primary transition-colors shadow-bhagva-flat">
                 <Share2 className="size-8" />
              </button>
           </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* 📰 MAIN EDITORIAL CONTENT */}
          <div className="lg:col-span-8 space-y-24">
            <article className="space-y-16">
              <div className="space-y-10">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="bg-primary text-white px-8 py-3 font-black text-[11px] uppercase tracking-[0.5em] italic border-2 border-primary">
                     ब्रेकिंग न्यूज़
                  </div>
                  <Link
                    to={`/category/${article.category}`}
                    className="bg-gray-950 text-white px-8 py-3 font-black text-[11px] uppercase tracking-[0.5em] italic border-2 border-gray-950 hover:bg-primary transition-colors"
                  >
                    {article.category}
                  </Link>
                </div>

                <div className="space-y-4">
                   <h1 className="text-5xl md:text-8xl font-black text-gray-950 leading-[1] border-l-[32px] border-primary pl-10 tracking-tighter uppercase italic text-wrap">
                     {article.title}
                   </h1>
                   <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.8em] ml-10 italic">LAKHARA EXCLUSIVE REPORTING</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center py-12 border-y-4 border-gray-100">
                  <div className="flex items-center gap-6">
                     <div className="size-20 bg-gray-950 text-primary flex items-center justify-center font-black text-3xl border-4 border-primary shadow-bhagva-flat italic">
                        {article.author[0]}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-2xl font-black tracking-tighter text-gray-950 uppercase italic leading-none">{article.author}</span>
                        <span className="text-[11px] text-primary font-bold tracking-[0.2em] mt-1 italic">मुख्य संवाददाता</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 text-[12px] font-black text-gray-950 uppercase tracking-[0.3em] italic">
                    <Clock className="size-6 text-primary" /> {formatDate(article.createdAt)}
                  </div>
                  <div className="flex items-center gap-4 text-[12px] font-black text-gray-950 uppercase tracking-[0.3em] italic">
                    <Eye className="size-6 text-primary" /> {(article.views / 1000).toFixed(1)}k <span className="opacity-40 italic">पाठक</span>
                  </div>
                </div>
              </div>

              <div className="border-[16px] border-gray-50 bg-white relative">
                <div className="absolute top-0 right-0 bg-primary text-white p-4 font-black italic text-[11px] uppercase tracking-widest z-10 border-b-4 border-l-4 border-gray-950 shadow-bhagva-flat">
                   EXPERT ANALYSIS
                </div>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-auto object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000 border-4 border-white"
                />
              </div>

              <div className="bg-gray-50 p-12 border-l-[24px] border-primary">
                 <p className="text-gray-950 text-3xl md:text-5xl font-black leading-[1.2] italic tracking-tight uppercase border-b-2 border-gray-200 pb-8 mb-8">
                    "{article.excerpt}"
                 </p>
                 <div className="flex items-center gap-4 text-primary italic font-black text-[12px] uppercase tracking-[0.5em]">
                    <Radio className="size-5 animate-pulse" /> मुख्य सारांश
                 </div>
              </div>

              <div className="space-y-16">
                {article.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-2xl md:text-4xl text-gray-950 leading-relaxed font-black border-l-8 border-gray-50 pl-12 italic uppercase tracking-tighter">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-20 border-t-8 border-gray-50 flex flex-wrap items-center gap-6">
                <span className="text-[12px] font-black text-gray-400 uppercase tracking-[0.5em] mr-6 italic">टैग्स :</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-8 py-4 bg-white border-4 border-gray-100 text-gray-950 font-black text-[11px] uppercase tracking-[0.3em] hover:bg-gray-950 hover:text-white hover:border-gray-950 transition-colors italic shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 💬 MASSIVE DISCUSSION BLOCK */}
              <div className="bg-white border-[12px] border-gray-950 p-12 space-y-12 shadow-bhagva-flat italic">
                 <div className="border-l-[16px] border-primary pl-10">
                    <h3 className="text-5xl font-black uppercase tracking-tighter italic">ओपिनियन <span className="text-primary italic">सेक्शन</span></h3>
                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.6em] mt-4 italic">BROADCAST YOUR PERSPECTIVE</p>
                 </div>

                 <div className="space-y-8">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="अपनी राय यहाँ साझा करें..."
                      className="w-full bg-gray-50 border-8 border-gray-100 p-10 text-2xl font-black outline-none focus:border-primary placeholder:text-gray-200 resize-none h-64 uppercase italic"
                    />
                    <button className="bg-primary text-white w-full py-10 font-black uppercase tracking-[0.8em] text-2xl flex items-center justify-center gap-8 hover:bg-gray-950 transition-colors border-none outline-none italic shadow-bhagva-flat">
                       सबमिट करें <Send className="size-10" />
                    </button>
                 </div>
              </div>
            </article>
          </div>

          {/* 🏹 EDITORIAL SIDEBAR */}
          <div className="hidden lg:block lg:col-span-4 space-y-24">
            <div className="bg-gray-950 p-12 text-white space-y-10 border-b-[24px] border-primary shadow-bhagva-flat">
               <div className="size-20 bg-primary/20 border-4 border-primary flex items-center justify-center">
                  <ShieldCheck className="size-12 text-primary" />
               </div>
               <h3 className="text-4xl font-black uppercase tracking-tighter italic border-b-4 border-white/10 pb-6 leading-none">हमारा <span className="text-primary">संकल्प</span></h3>
               <p className="font-black text-3xl leading-tight italic opacity-95 tracking-tighter uppercase border-l-8 border-primary pl-8">
                  "जन जन की आवाज़, राष्ट्र का गौरव। निष्पक्ष समाचार ही हमारा श्रृंगार।"
               </p>
               <div className="pt-8 text-[12px] font-black text-gray-500 uppercase tracking-[0.4em] italic">EDITORIAL BOARD - 2026</div>
            </div>

            <div className="space-y-12">
               <div className="flex items-center gap-6 border-l-[16px] border-primary pl-10">
                  <h3 className="text-4xl font-black uppercase tracking-tighter italic">सम्बंधित <span className="text-primary">रिपोर्ट्स</span></h3>
               </div>
               <div className="grid grid-cols-1 gap-12">
                  {relatedArticles.map((relArticle) => (
                    <div key={relArticle.id} className="border-b-4 border-gray-50 pb-12 last:border-0 last:pb-0">
                       <ArticleCard article={relArticle} variant="small" />
                    </div>
                  ))}
               </div>
               <Link to="/" className="flex items-center justify-center gap-6 border-[8px] border-gray-950 py-8 font-black uppercase text-xl tracking-[0.5em] text-gray-950 hover:bg-primary hover:text-white hover:border-primary transition-all italic shadow-bhagva-flat">
                  सभी खबरें देखें <ArrowRight className="size-8" />
               </Link>
            </div>

            {/* ADVERTISEMENT MATRIX */}
            <div className="bg-gray-50 p-12 border-8 border-gray-100 text-center space-y-8 italic">
               <div className="flex items-center justify-center gap-4">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <span className="text-[12px] font-black text-gray-300 uppercase tracking-[0.8em] italic">प्रायोजित</span>
                  <div className="h-px bg-gray-200 flex-1"></div>
               </div>
               <div className="aspect-[3/4] bg-white border-8 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 gap-8 shadow-inner">
                  <X className="size-20 text-gray-100" />
                  <p className="text-[14px] font-black text-gray-300 uppercase leading-relaxed tracking-widest italic underline decoration-primary/10 underline-offset-8">स्पेस विज्ञापन हेतु <br/> आरक्षित क्षेत्र</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Bookmark, Share2, ArrowLeft, ArrowRight, Clock, Eye, Send, Radio } from "lucide-react";
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
        <div className="flex flex-col items-center gap-4">
           <span className="text-4xl font-black text-primary tracking-tighter">LAKHARA</span>
           <span className="text-[12px] font-black text-gray-950 uppercase tracking-widest">DIGITAL NEWS</span>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-6 py-20 text-center space-y-8">
        <h1 className="text-3xl font-black text-gray-950 uppercase">खबर अनुपलब्ध</h1>
        <Link to="/" className="inline-block bg-primary text-white px-10 py-4 font-black uppercase">
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
    <div className="bg-white min-h-screen pb-20">
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-12">
        
        {/* ACTIONS */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-6">
           <button
             onClick={() => navigate(-1)}
             className="flex items-center gap-3 text-gray-500 hover:text-primary font-black uppercase tracking-widest text-xs"
           >
             <ArrowLeft className="size-5" /> पीछे जाएँ
           </button>

           <div className="flex items-center gap-2">
              <button className="size-10 bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary">
                 <Bookmark className="size-5" />
              </button>
              <button className="size-10 bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary">
                 <Share2 className="size-5" />
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            <article className="space-y-10">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="bg-primary text-white px-4 py-1.5 font-black text-[10px] uppercase tracking-widest border border-primary">
                     लखारा विशेष
                  </div>
                  <Link
                    to={`/category/${article.category}`}
                    className="bg-gray-100 text-gray-600 px-4 py-1.5 font-black text-[10px] uppercase tracking-widest border border-gray-200"
                  >
                    {article.category}
                  </Link>
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-gray-950 leading-tight border-l-8 border-primary pl-6">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-8 text-[11px] font-black text-gray-400 uppercase tracking-widest pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-gray-950">
                     <div className="size-10 bg-primary text-white flex items-center justify-center font-black">
                        {article.author[0]}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-black">{article.author}</span>
                        <span className="text-[10px] text-primary">विशेष संवाददाता</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-primary" /> {formatDate(article.createdAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="size-4 text-primary" /> {(article.views / 1000).toFixed(1)}k
                  </div>
                </div>
              </div>

              <div className="border-4 border-gray-100 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="bg-gray-50 p-8 border-l-8 border-primary">
                 <p className="text-gray-900 text-lg md:text-xl font-bold leading-relaxed italic">
                    "{article.excerpt}"
                 </p>
              </div>

              <div className="space-y-8">
                {article.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-lg md:text-xl text-gray-800 leading-relaxed font-bold">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-10 border-t border-gray-100 flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">टैग्स:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-600 font-bold text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* COMMENTS */}
              <div className="bg-white border border-gray-200 p-8 space-y-8">
                 <div className="border-l-8 border-primary pl-4">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">चर्चा <span className="text-primary">बॉक्स</span></h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">सभ्य एवं निष्पक्ष चर्चा</p>
                 </div>

                 <div className="space-y-6">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="अपनी राय यहाँ साझा करें..."
                      className="w-full bg-gray-50 border border-gray-200 p-6 text-base font-bold outline-none focus:border-primary placeholder:text-gray-300 resize-none h-40"
                    />
                    <button className="bg-primary text-white w-full py-4 font-black uppercase tracking-widest flex items-center justify-center gap-3">
                       सन्देश साझा करें <Send className="size-4" />
                    </button>
                 </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-4 space-y-12">
            <div className="bg-primary p-8 text-white space-y-6 border-b-8 border-gray-950">
               <h3 className="text-xl font-black uppercase tracking-tighter">हमारा संकल्प</h3>
               <p className="font-bold text-lg leading-relaxed opacity-90 italic">
                  "जन जन की आवाज़, राष्ट्र का गौरव। निष्पक्ष समाचार ही हमारा श्रृंगार।"
               </p>
            </div>

            <div className="space-y-8">
               <div className="flex items-center gap-4 border-l-8 border-primary pl-4">
                  <h3 className="text-xl font-black uppercase">अन्य <span className="text-primary">खबरें</span></h3>
               </div>
               <div className="space-y-6">
                  {relatedArticles.map((relArticle) => (
                    <ArticleCard key={relArticle.id} article={relArticle} variant="small" />
                  ))}
               </div>
               <Link to="/" className="block text-center border-2 border-gray-100 py-4 font-black uppercase text-xs tracking-widest text-primary hover:bg-primary hover:text-white">
                  सभी खबरें देखें
               </Link>
            </div>

            <div className="bg-gray-50 p-8 border border-gray-200 text-center space-y-4">
               <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">विज्ञापन</span>
               <div className="aspect-[300/400] bg-white border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <p className="text-xs font-black text-gray-300 uppercase px-6">विज्ञापन हेतु स्थान उपलब्ध</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import { useState } from "react";
import { useNavigate } from "react-router";
import { categories } from "../../data/mockData";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Save, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { newsService } from "../../services/newsService";
import { useAuth } from "../../context/AuthContext";

export function CreateArticle() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: categories[0]?.slug || "",
    isBreaking: false,
    isTrending: false,
    tags: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to create an article");
      return;
    }

    if (!formData.title || !formData.content || !formData.excerpt) {
      toast.error("कृपया सभी आवश्यक फ़ील्ड भरें");
      return;
    }

    setIsLoading(true);
    try {
      let imageUrl = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800";
      
      if (selectedFile) {
        imageUrl = await newsService.uploadMedia(selectedFile, "articles");
      }

      const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9\u0900-\u097F]+/g, "-").replace(/^-+|-+$/g, "");
      
      await newsService.createArticle({
        title: formData.title,
        slug: slug,
        content: formData.content,
        excerpt: formData.excerpt,
        category: formData.category,
        author: user.displayName || user.email || "Unknown",
        authorId: user.uid,
        imageUrl: imageUrl,
        isBreaking: formData.isBreaking,
        isTrending: formData.isTrending,
        status: 'published',
        views: 0,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      });

      toast.success("लेख सफलतापूर्वक बनाया गया!");
      navigate("/admin/articles");
    } catch (error: any) {
      console.error("Create article error:", error);
      toast.error(error.message || "लेख बनाने में विफल");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/admin/articles")}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <ArrowLeft className="size-6" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Create New Article</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Title */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Slug (URL-friendly)
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="Auto-generated if left empty"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category <span className="text-red-600">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Article Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-black uppercase tracking-widest">
              फीचर्ड इमेज {isLoading && <Loader2 className="inline ml-2 size-4 animate-spin text-red-600" />}
            </label>
            <div className="relative group/upload">
               <input
                 type="file"
                 accept="image/*"
                 onChange={handleFileChange}
                 className="hidden"
                 id="article-image"
               />
               <label 
                 htmlFor="article-image"
                 className="flex flex-col items-center justify-center w-full h-48 border-4 border-dashed border-gray-100 rounded-[40px] cursor-pointer hover:border-red-200 hover:bg-red-50/30 transition-all duration-500 overflow-hidden group"
               >
                 {previewUrl ? (
                   <div className="relative size-full">
                      <img src={previewUrl} alt="Preview" className="size-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <Upload className="size-10 text-white" />
                      </div>
                   </div>
                 ) : (
                   <div className="text-center p-6">
                      <div className="size-16 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                         <Upload className="size-8" />
                      </div>
                      <p className="font-black text-gray-800">इमेज चुनें</p>
                      <p className="text-xs text-gray-400 font-bold mt-1">PNG, JPG या WebP (Max 5MB)</p>
                   </div>
                 )}
               </label>
               {previewUrl && (
                 <button
                   type="button"
                   onClick={() => { setSelectedFile(null); setPreviewUrl(""); }}
                   className="absolute -top-3 -right-3 bg-red-600 text-white p-2 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all"
                 >
                   <ArrowLeft className="size-4 rotate-45" />
                 </button>
               )}
            </div>
          </div>

          {/* Excerpt */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-black uppercase tracking-widest">
              संक्षिप्त विवरण (Excerpt) <span className="text-red-600">*</span>
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-[30px] px-6 py-4 font-bold outline-none transition-all shadow-sm"
              required
            />
          </div>

          {/* Content */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-black uppercase tracking-widest">
              मुख्य समाचार (Content) <span className="text-red-600">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={12}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-[40px] px-8 py-6 font-bold outline-none transition-all shadow-sm"
              required
            />
          </div>

          {/* Tags */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-black uppercase tracking-widest">
              टैग्स (Tags)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="टैग्स को कोमा से अलग करें (जैसे: राजनीति, दिल्ली)"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-[30px] px-6 py-5 font-bold outline-none transition-all shadow-sm"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-8">
            <label className="flex items-center gap-4 cursor-pointer group">
              <div className="relative flex items-center">
                 <input
                   type="checkbox"
                   name="isBreaking"
                   checked={formData.isBreaking}
                   onChange={handleChange}
                   className="size-6 border-2 border-gray-200 rounded-xl text-red-600 focus:ring-red-500 transition-all checked:bg-red-600"
                 />
              </div>
              <span className="font-black text-gray-700 group-hover:text-red-600 transition-colors uppercase tracking-widest text-sm">ब्रेकिंग न्यूज़ (Breaking)</span>
            </label>

            <label className="flex items-center gap-4 cursor-pointer group">
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleChange}
                className="size-6 border-2 border-gray-200 rounded-xl text-red-600 focus:ring-red-500 transition-all checked:bg-red-600"
              />
              <span className="font-black text-gray-700 group-hover:text-red-600 transition-colors uppercase tracking-widest text-sm">ट्रेंडिंग (Trending)</span>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-6 mt-12 pt-10 border-t border-gray-50">
          <button 
            type="submit" 
            disabled={isLoading}
            className="flex-1 py-6 bg-red-600 hover:bg-red-700 text-white rounded-[30px] font-black text-xl shadow-2xl shadow-red-200 transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="size-6 animate-spin" /> : <Save className="size-6" />}
            {isLoading ? "कृपया प्रतीक्षा करें..." : "लेख प्रकाशित करें"}
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/admin/articles")}
            className="px-8 py-6 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-[30px] font-black text-xl transition-all"
          >
            रद्द करें
          </button>
        </div>
      </form>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getArticles, saveArticles, getCategories } from "../../data/mockData";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

export function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const categories = getCategories();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "",
    author: "",
    imageUrl: "",
    isBreaking: false,
    isTrending: false,
    tags: "",
  });

  useEffect(() => {
    const articles = getArticles();
    const article = articles.find((a) => a.id === id);
    if (article) {
      setFormData({
        title: article.title,
        slug: article.slug,
        content: article.content,
        excerpt: article.excerpt,
        category: article.category,
        author: article.author,
        imageUrl: article.imageUrl,
        isBreaking: article.isBreaking,
        isTrending: article.isTrending,
        tags: article.tags.join(", "),
      });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.excerpt || !formData.author) {
      toast.error("Please fill in all required fields");
      return;
    }

    const articles = getArticles();
    const updatedArticles = articles.map((article) => {
      if (article.id === id) {
        return {
          ...article,
          title: formData.title,
          slug: formData.slug,
          content: formData.content,
          excerpt: formData.excerpt,
          category: formData.category,
          author: formData.author,
          imageUrl: formData.imageUrl,
          isBreaking: formData.isBreaking,
          isTrending: formData.isTrending,
          tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        };
      }
      return article;
    });

    saveArticles(updatedArticles);
    toast.success("Article updated successfully!");
    navigate("/admin/articles");
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

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/admin/articles")}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <ArrowLeft className="size-6" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Edit Article</h1>
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

          {/* Author */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Author <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Excerpt */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Excerpt <span className="text-red-600">*</span>
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Content */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content <span className="text-red-600">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={12}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Tags */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Enter tags separated by commas"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isBreaking"
                checked={formData.isBreaking}
                onChange={handleChange}
                className="size-4 text-red-600 rounded focus:ring-red-500"
              />
              <span className="text-sm font-semibold text-gray-700">Breaking News</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleChange}
                className="size-4 text-red-600 rounded focus:ring-red-500"
              />
              <span className="text-sm font-semibold text-gray-700">Trending</span>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <Button type="submit" className="bg-red-600 hover:bg-red-700">
            <Save className="size-4 mr-2" />
            Update Article
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/articles")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

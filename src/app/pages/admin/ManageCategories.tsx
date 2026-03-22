import { useState } from "react";
import { getCategories, saveCategories, Category } from "../../data/mockData";
import { Button } from "../../components/ui/button";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";

export function ManageCategories() {
  const [categories, setCategories] = useState(getCategories());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    color: "#ef4444",
  });

  const handleAdd = () => {
    if (!formData.name || !formData.slug) {
      toast.error("Please fill in all fields");
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: formData.name,
      slug: formData.slug,
      color: formData.color,
    };

    const updated = [...categories, newCategory];
    setCategories(updated);
    saveCategories(updated);
    toast.success("Category created successfully!");
    setIsAdding(false);
    setFormData({ name: "", slug: "", color: "#ef4444" });
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      slug: category.slug,
      color: category.color,
    });
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.slug) {
      toast.error("Please fill in all fields");
      return;
    }

    const updated = categories.map((cat) =>
      cat.id === editingId
        ? { ...cat, name: formData.name, slug: formData.slug, color: formData.color }
        : cat
    );

    setCategories(updated);
    saveCategories(updated);
    toast.success("Category updated successfully!");
    setEditingId(null);
    setFormData({ name: "", slug: "", color: "#ef4444" });
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const updated = categories.filter((cat) => cat.id !== deleteId);
    setCategories(updated);
    saveCategories(updated);
    toast.success("Category deleted successfully!");
    setDeleteId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ name: "", slug: "", color: "#ef4444" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Categories</h1>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)} className="bg-red-600 hover:bg-red-700">
            <Plus className="size-4 mr-2" />
            Add Category
          </Button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isAdding ? "Add New Category" : "Edit Category"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                placeholder="e.g., Technology"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                placeholder="e.g., technology"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="#ef4444"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <Button
              onClick={isAdding ? handleAdd : handleUpdate}
              className="bg-red-600 hover:bg-red-700"
            >
              <Save className="size-4 mr-2" />
              {isAdding ? "Add Category" : "Update Category"}
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="size-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: category.color }}
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">/{category.slug}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(category)}
                  className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDeleteId(category.id)}
                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-600"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <span
                className="inline-block px-3 py-1 text-xs font-semibold text-white rounded uppercase"
                style={{ backgroundColor: category.color }}
              >
                {category.slug}
              </span>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No categories found</p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

import { createHashRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { ArticlePage } from "./pages/ArticlePage";
import { CategoryPage } from "./pages/CategoryPage";
import { LiveTVPage } from "./pages/LiveTVPage";
import { AdminLayout } from "./layouts/AdminLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ManageArticles } from "./pages/admin/ManageArticles";
import { CreateArticle } from "./pages/admin/CreateArticle";
import { EditArticle } from "./pages/admin/EditArticle";
import { ManageCategories } from "./pages/admin/ManageCategories";
import { NotFound } from "./pages/NotFound";

export const router = createHashRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "article/:slug", Component: ArticlePage },
      { path: "category/:category", Component: CategoryPage },
      { path: "live", Component: LiveTVPage },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "articles", Component: ManageArticles },
      { path: "articles/create", Component: CreateArticle },
      { path: "articles/edit/:id", Component: EditArticle },
      { path: "categories", Component: ManageCategories },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

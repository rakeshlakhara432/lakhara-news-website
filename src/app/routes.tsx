import { createHashRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ManageArticles } from "./pages/admin/ManageArticles";
import { CreateArticle } from "./pages/admin/CreateArticle";
import { EditArticle } from "./pages/admin/EditArticle";
import { ManageCategories } from "./pages/admin/ManageCategories";
import { AdminSettings } from "./pages/admin/Settings";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFound } from "./pages/NotFound";

// Samaj Pages
import { AboutPage } from "./pages/samaj/AboutPage";
import { CommitteePage } from "./pages/samaj/CommitteePage";
import { DirectoryPage } from "./pages/samaj/DirectoryPage";
import { MatrimonialPage } from "./pages/samaj/MatrimonialPage";
import { RegistrationPage } from "./pages/samaj/RegistrationPage";
import { EventsPage } from "./pages/samaj/EventsPage";
import { ContactPage } from "./pages/samaj/ContactPage";
import { NewsPage } from "./pages/samaj/NewsPage";
import { GalleryPage } from "./pages/samaj/GalleryPage";
import { DonatePage } from "./pages/samaj/DonatePage";
import { SupportPage } from "./pages/samaj/SupportPage";
import { RulesPage } from "./pages/samaj/RulesPage";

export const router = createHashRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "committee", Component: CommitteePage },
      { path: "directory", Component: DirectoryPage },
      { path: "matrimonial", Component: MatrimonialPage },
      { path: "events", Component: EventsPage },
      { path: "gallery", Component: GalleryPage },
      { path: "news", Component: NewsPage },
      { path: "support", Component: SupportPage },
      { path: "rules", Component: RulesPage },
      { path: "contact", Component: ContactPage },
      { path: "register", Component: RegistrationPage },
      { path: "donate", Component: DonatePage },
      { path: "profile", Component: ProfilePage },
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
      { path: "settings", Component: AdminSettings },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

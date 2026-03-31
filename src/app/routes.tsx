import { createHashRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ManageMembers } from "./pages/admin/ManageMembers";
import { ManageMatrimonial } from "./pages/admin/ManageMatrimonial";
import { ManageEvents } from "./pages/admin/ManageEvents";
import { ManageGallery } from "./pages/admin/ManageGallery";
import { ManageMessages } from "./pages/admin/ManageMessages";
import { ManageCommittee } from "./pages/admin/ManageCommittee";
import { ManageSamajNews } from "./pages/admin/ManageSamajNews";
import { ManageSupport } from "./pages/admin/ManageSupport";
import { ManageVideos } from "./pages/admin/ManageVideos";
import { AdminSettings } from "./pages/admin/Settings";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFound } from "./pages/NotFound";

// Samaj Pages
import { AboutPage } from "./pages/samaj/AboutPage";
import { CommitteePage } from "./pages/samaj/CommitteePage";
import { DirectoryPage } from "./pages/samaj/DirectoryPage";
import { MatrimonialPage } from "./pages/samaj/MatrimonialPage";
import { MatrimonialRegistrationPage } from "./pages/samaj/MatrimonialRegistrationPage";
import { RegistrationPage } from "./pages/samaj/RegistrationPage";
import { EventsPage } from "./pages/samaj/EventsPage";
import { ContactPage } from "./pages/samaj/ContactPage";
import { NewsPage } from "./pages/samaj/NewsPage";
import { GalleryPage } from "./pages/samaj/GalleryPage";
import { DonatePage } from "./pages/samaj/DonatePage";
import { SupportPage } from "./pages/samaj/SupportPage";
import { SupportDetailPage } from "./pages/samaj/SupportDetailPage";
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
      { path: "matrimonial/register", Component: MatrimonialRegistrationPage },
      { path: "events", Component: EventsPage },
      { path: "gallery", Component: GalleryPage },
      { path: "news", Component: NewsPage },
      { path: "support", Component: SupportPage },
      { path: "support/:id", Component: SupportDetailPage },
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
      { path: "members", Component: ManageMembers },
      { path: "matrimonial", Component: ManageMatrimonial },
      { path: "committee", Component: ManageCommittee },
      { path: "events", Component: ManageEvents },
      { path: "gallery", Component: ManageGallery },
      { path: "news", Component: ManageSamajNews },
      { path: "videos", Component: ManageVideos },
      { path: "support", Component: ManageSupport },
      { path: "messages", Component: ManageMessages },
      { path: "settings", Component: AdminSettings },
      { path: "settings", Component: AdminSettings },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

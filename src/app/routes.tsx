import React, { lazy, Suspense } from "react";
import { createHashRouter } from "react-router";
// Layouts remain static for structure
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";

// Samaj Pages (Lazy)
const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import("./pages/samaj/AboutPage").then(m => ({ default: m.AboutPage })));
const CommitteePage = lazy(() => import("./pages/samaj/CommitteePage").then(m => ({ default: m.CommitteePage })));
const DirectoryPage = lazy(() => import("./pages/samaj/DirectoryPage").then(m => ({ default: m.DirectoryPage })));
const MatrimonialPage = lazy(() => import("./pages/samaj/MatrimonialPage").then(m => ({ default: m.MatrimonialPage })));
const MatrimonialRegistrationPage = lazy(() => import("./pages/samaj/MatrimonialRegistrationPage").then(m => ({ default: m.MatrimonialRegistrationPage })));
const RegistrationPage = lazy(() => import("./pages/samaj/RegistrationPage").then(m => ({ default: m.RegistrationPage })));
const EventsPage = lazy(() => import("./pages/samaj/EventsPage").then(m => ({ default: m.EventsPage })));
const ContactPage = lazy(() => import("./pages/samaj/ContactPage").then(m => ({ default: m.ContactPage })));
const NewsPage = lazy(() => import("./pages/samaj/NewsPage").then(m => ({ default: m.NewsPage })));
const NewsDetailPage = lazy(() => import("./pages/samaj/NewsDetailPage").then(m => ({ default: m.NewsDetailPage })));
const GalleryPage = lazy(() => import("./pages/samaj/GalleryPage").then(m => ({ default: m.GalleryPage })));
const DonatePage = lazy(() => import("./pages/samaj/DonatePage").then(m => ({ default: m.DonatePage })));
const SupportPage = lazy(() => import("./pages/samaj/SupportPage").then(m => ({ default: m.SupportPage })));
const SupportDetailPage = lazy(() => import("./pages/samaj/SupportDetailPage").then(m => ({ default: m.SupportDetailPage })));
const RulesPage = lazy(() => import("./pages/samaj/RulesPage").then(m => ({ default: m.RulesPage })));
const StorePage = lazy(() => import("./pages/samaj/StorePage").then(m => ({ default: m.StorePage })));
const SitemapPage = lazy(() => import("./pages/samaj/SitemapPage").then(m => ({ default: m.SitemapPage })));
const EBooksPage = lazy(() => import("./pages/samaj/EBooksPage").then(m => ({ default: m.EBooksPage })));
const NoticeBoardPage = lazy(() => import("./pages/samaj/NoticeBoardPage").then(m => ({ default: m.NoticeBoardPage })));
const BirthdayWishesPage = lazy(() => import("./pages/samaj/BirthdayWishesPage").then(m => ({ default: m.BirthdayWishesPage })));

// Admin Pages (Lazy)
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const ManageMembers = lazy(() => import("./pages/admin/ManageMembers").then(m => ({ default: m.ManageMembers })));
const ManageMatrimonial = lazy(() => import("./pages/admin/ManageMatrimonial").then(m => ({ default: m.ManageMatrimonial })));
const ManageEvents = lazy(() => import("./pages/admin/ManageEvents").then(m => ({ default: m.ManageEvents })));
const ManageGallery = lazy(() => import("./pages/admin/ManageGallery").then(m => ({ default: m.ManageGallery })));
const ManageMessages = lazy(() => import("./pages/admin/ManageMessages").then(m => ({ default: m.ManageMessages })));
const ManageCommittee = lazy(() => import("./pages/admin/ManageCommittee").then(m => ({ default: m.ManageCommittee })));
const ManageSamajNews = lazy(() => import("./pages/admin/ManageSamajNews").then(m => ({ default: m.ManageSamajNews })));
const ManageSupport = lazy(() => import("./pages/admin/ManageSupport").then(m => ({ default: m.ManageSupport })));
const ManageVideos = lazy(() => import("./pages/admin/ManageVideos").then(m => ({ default: m.ManageVideos })));
const AdminSettings = lazy(() => import("./pages/admin/Settings").then(m => ({ default: m.AdminSettings })));
const ManageStore = lazy(() => import("./pages/admin/ManageStore").then(m => ({ default: m.ManageStore })));
const ManageEBooks = lazy(() => import("./pages/admin/ManageEBooks").then(m => ({ default: m.ManageEBooks })));
const CertificateSettings = lazy(() => import("./pages/admin/CertificateSettings").then(m => ({ default: m.CertificateSettings })));
const ManageNotices = lazy(() => import("./pages/admin/ManageNotices").then(m => ({ default: m.ManageNotices })));
const AnalyticsDashboard = lazy(() => import("./pages/admin/AnalyticsDashboard").then(m => ({ default: m.AnalyticsDashboard })));
const WebsiteShield = lazy(() => import("./pages/admin/WebsiteShield").then(m => ({ default: m.WebsiteShield })));
const ProfilePage = lazy(() => import("./pages/ProfilePage").then(m => ({ default: m.ProfilePage })));
const NotFound = lazy(() => import("./pages/NotFound").then(m => ({ default: m.NotFound })));

// Loading Component
const PageLoader = () => (
   <div className="flex min-h-[60vh] items-center justify-center">
      <div className="size-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
   </div>
);

const LazyLoad = ({ children }: { children: React.ReactNode }) => (
   <Suspense fallback={<PageLoader />}>
      {children}
   </Suspense>
);

export const router = createHashRouter([
  {
    path: "/",
    element: <LazyLoad><PublicLayout /></LazyLoad>,
    children: [
       { index: true,                 element: <HomePage /> },
       { path: "about",               element: <AboutPage /> },
       { path: "committee",           element: <CommitteePage /> },
       { path: "directory",           element: <DirectoryPage /> },
       { path: "matrimonial",         element: <MatrimonialPage /> },
       { path: "matrimonial/register", element: <MatrimonialRegistrationPage /> },
       { path: "events",              element: <EventsPage /> },
       { path: "gallery",             element: <GalleryPage /> },
       { path: "news",                element: <NewsPage /> },
       { path: "news/:id",            element: <NewsDetailPage /> },
       { path: "support",             element: <SupportPage /> },
       { path: "support/:id",         element: <SupportDetailPage /> },
       { path: "rules",               element: <RulesPage /> },
       { path: "contact",             element: <ContactPage /> },
       { path: "register",            element: <RegistrationPage /> },
       { path: "donate",              element: <DonatePage /> },
       { path: "profile",             element: <ProfilePage /> },
       { path: "store",               element: <StorePage /> },
       { path: "sitemap",             element: <SitemapPage /> },
       { path: "ebooks",              element: <EBooksPage /> },
       // ── New Routes ──
       { path: "notices",             element: <NoticeBoardPage /> },
       { path: "birthday-wishes",     element: <BirthdayWishesPage /> },
    ],
  },
  {
    path: "/admin",
    element: <LazyLoad><AdminLayout /></LazyLoad>,
    children: [
       { index: true,                       element: <AdminDashboard /> },
       { path: "members",                   element: <ManageMembers /> },
       { path: "matrimonial",               element: <ManageMatrimonial /> },
       { path: "committee",                 element: <ManageCommittee /> },
       { path: "events",                    element: <ManageEvents /> },
       { path: "gallery",                   element: <ManageGallery /> },
       { path: "news",                      element: <ManageSamajNews /> },
       { path: "videos",                    element: <ManageVideos /> },
       { path: "support",                   element: <ManageSupport /> },
       { path: "messages",                  element: <ManageMessages /> },
       { path: "store",                     element: <ManageStore /> },
       { path: "ebooks",                    element: <ManageEBooks /> },
       { path: "settings",                  element: <AdminSettings /> },
       { path: "certificate-settings",      element: <CertificateSettings /> },
       // ── New Admin Routes ──
       { path: "notices",                   element: <ManageNotices /> },
       { path: "analytics",                 element: <AnalyticsDashboard /> },
       { path: "shield",                    element: <WebsiteShield /> },
    ],
  },
  {
    path: "*",
    element: <LazyLoad><NotFound /></LazyLoad>,
  },
]);

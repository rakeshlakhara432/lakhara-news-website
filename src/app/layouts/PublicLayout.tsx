import { Link, Outlet, useLocation } from "react-router";
import { Tv, Search, Menu, X, Home, PlaySquare } from "lucide-react";
import { categories } from "../data/mockData";
import { useState } from "react";

export function PublicLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Logo and Search */}
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-red-600 text-white px-4 py-2 rounded font-bold text-xl md:text-2xl tracking-tight">
                Lakhara <span className="text-yellow-400">Digital News</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              </div>
            </div>

            <Link
              to="/live"
              className="hidden md:flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Tv className="size-5" />
              <span className="font-semibold">LIVE TV</span>
            </Link>

            {/* Hiding top mobile menu button to push it to bottom nav */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hidden p-2"
            >
              {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block border-t border-gray-200">
            <div className="flex items-center gap-6 py-3 overflow-x-auto">
              <Link
                to="/"
                className={`whitespace-nowrap font-semibold hover:text-red-600 transition-colors ${
                  location.pathname === "/" ? "text-red-600" : "text-gray-700"
                }`}
              >
                Home
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className={`whitespace-nowrap font-semibold hover:text-red-600 transition-colors ${
                    location.pathname === `/category/${cat.slug}`
                      ? "text-red-600"
                      : "text-gray-700"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>
              <nav className="space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 font-semibold hover:text-red-600"
                >
                  Home
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 font-semibold hover:text-red-600"
                  >
                    {cat.name}
                  </Link>
                ))}
                <Link
                  to="/live"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 font-semibold text-red-600"
                >
                  LIVE TV
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About Lakhara Digital News</h3>
              <p className="text-gray-400 text-sm">
                Your trusted source for breaking news, analysis, and insights. Stay
                informed with 24/7 coverage.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/live" className="hover:text-white">Live TV</Link></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {categories.slice(0, 4).map((cat) => (
                  <li key={cat.id}>
                    <Link to={`/category/${cat.slug}`} className="hover:text-white">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:text-red-500">Facebook</a>
                <a href="#" className="hover:text-red-500">Twitter</a>
                <a href="#" className="hover:text-red-500">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2026 Lakhara Digital News. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (App Mode) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between items-center px-4 py-2 z-50 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}>
          <Home className="size-6" />
          <span className="text-[10px] font-semibold">Home</span>
        </Link>
        <Link to="/live" onClick={() => setIsMobileMenuOpen(false)} className={`flex flex-col items-center gap-1 ${location.pathname === '/live' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}>
          <Tv className="size-6" />
          <span className="text-[10px] font-semibold">Live TV</span>
        </Link>
        <button onClick={() => alert('Shorts coming soon in V2!')} className="flex flex-col items-center gap-1 text-gray-500 hover:text-red-600">
          <PlaySquare className="size-6" />
          <span className="text-[10px] font-semibold">Shorts</span>
        </button>
        <button onClick={() => setIsMobileMenuOpen(true)} className="flex flex-col items-center gap-1 text-gray-500 hover:text-red-600">
          <Search className="size-6" />
          <span className="text-[10px] font-semibold">Search</span>
        </button>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="flex flex-col items-center gap-1 text-[10px] font-semibold text-gray-500 hover:text-red-600">
          {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          <span>Menu</span>
        </button>
      </div>

      {/* Padding to avoid bottom nav clipping on mobile */}
      <div className="md:hidden h-16"></div>
    </div>
  );
}

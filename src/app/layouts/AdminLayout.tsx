import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  ArrowLeft,
  Menu,
  X,
  Settings,
  LogOut,
  Lock,
} from "lucide-react";
import { useState } from "react";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAdminLoggedIn") === "true";
  });
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem("adminPassword") || "admin123";
    if (loginPassword === storedPassword) {
      localStorage.setItem("isAdminLoggedIn", "true");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-red-500/5 border border-gray-100 max-w-md w-full animate-in zoom-in-95 duration-500">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-600 rounded-full shadow-lg shadow-red-600/30">
              <Lock className="size-8 text-white" />
            </div>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-500 text-sm">Enter the secret password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="password"
                placeholder="Enter Password..."
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                  setLoginError("");
                }}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 outline-none transition-all ${
                  loginError 
                  ? "border-red-500 focus:ring-red-500/20 bg-red-50/50" 
                  : "border-gray-200 focus:ring-gray-900/20 focus:border-gray-900"
                }`}
                autoFocus
                required
              />
              {loginError && <p className="text-red-500 font-medium text-sm mt-2">{loginError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-black transition-colors shadow-sm"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="size-4" />
              Return to Website
            </button>
          </form>
          <p className="text-center text-xs font-medium text-gray-400 mt-8">
            Default Password: <span className="text-gray-600 tracking-wider">admin123</span>
          </p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/articles", label: "Manage Articles", icon: FileText },
    { path: "/admin/categories", label: "Manage Categories", icon: FolderOpen },
    { path: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded"
            >
              {isSidebarOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="size-4" />
              Website
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-colors shadow-sm"
            >
              <LogOut className="size-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-40 mt-[73px] lg:mt-0`}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-red-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="size-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </div>
  );
}

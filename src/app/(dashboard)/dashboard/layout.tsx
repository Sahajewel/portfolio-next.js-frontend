// app/dashboard/layout.tsx (updated - Fixed Header)
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import DashFooter from "@/components/DashFooter";
import {
  Home,
  LayoutDashboard,
  FileText,
  Briefcase,
  User,
  FileCode,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  ChevronRight,
  Settings,
  Bell,
  Search,
  Sparkles,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll);
    setMounted(true);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  if (!mounted) return null;

  if (status === "loading") {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
            : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      href: "/dashboard/blogs",
      label: "Blogs",
      icon: <FileText size={20} />,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      href: "/dashboard/projects",
      label: "Projects",
      icon: <Briefcase size={20} />,
      color: "text-green-600 dark:text-green-400",
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: <User size={20} />,
      color: "text-pink-600 dark:text-pink-400",
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: <Settings size={20} />,
      color: "text-gray-600 dark:text-gray-400",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") return true;
    if (path !== "/dashboard" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 text-gray-900"
      }`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse ${
            theme === "dark" ? "bg-purple-500" : "bg-purple-200"
          }`}
        />
        <div
          className={`absolute top-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000 ${
            theme === "dark" ? "bg-pink-500" : "bg-pink-200"
          }`}
        />
        <div
          className={`absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000 ${
            theme === "dark" ? "bg-blue-500" : "bg-blue-200"
          }`}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 transition-all duration-300
        ${isMobile ? "w-80" : "w-72"}
        ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"}
      `}
      >
        <div
          className={`h-full flex flex-col border-r backdrop-blur-md ${
            theme === "dark"
              ? "bg-slate-900/80 border-purple-500/20"
              : "bg-white/80 border-purple-200"
          }`}
        >
          {/* Logo and Close Button */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-purple-600 to-pink-600"
                    : "bg-gradient-to-br from-purple-500 to-pink-500"
                }`}
              >
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-xs opacity-75">Admin Panel</p>
              </div>
            </div>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === "dark" ? "hover:bg-slate-800" : "hover:bg-gray-100"
                }`}
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* User Info */}
          <div
            className={`p-6 border-b ${
              theme === "dark" ? "border-slate-800" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-blue-600 to-cyan-600"
                    : "bg-gradient-to-br from-blue-500 to-cyan-500"
                }`}
              >
                {session?.user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <p className="font-semibold truncate">{session?.user?.name}</p>
                <p
                  className={`text-sm truncate ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  @{session?.user?.username}
                </p>
                <p
                  className={`text-xs px-2 py-1 mt-1 rounded-full inline-block ${
                    theme === "dark"
                      ? "bg-purple-500/20 text-purple-300"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {session?.user?.role || "Admin"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                  isActive(item.href)
                    ? theme === "dark"
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : "bg-purple-100 text-purple-700 border border-purple-300"
                    : theme === "dark"
                    ? "hover:bg-slate-800/50 text-gray-300"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isActive(item.href)
                        ? theme === "dark"
                          ? "bg-purple-500/30"
                          : "bg-purple-200"
                        : theme === "dark"
                        ? "bg-slate-800"
                        : "bg-gray-100"
                    }`}
                  >
                    <div className={item.color}>{item.icon}</div>
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                {isActive(item.href) && (
                  <ChevronRight size={16} className="text-purple-500" />
                )}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div
            className={`p-6 border-t space-y-3 ${
              theme === "dark" ? "border-slate-800" : "border-gray-200"
            }`}
          >
            {/* Home Button */}
            <Link
              href="/"
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors group ${
                theme === "dark"
                  ? "hover:bg-slate-800 text-gray-300"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  theme === "dark" ? "bg-slate-800" : "bg-gray-100"
                }`}
              >
                <Home
                  size={20}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <span className="font-medium">Back to Home</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${
                theme === "dark"
                  ? "hover:bg-red-500/20 text-red-400"
                  : "hover:bg-red-100 text-red-600"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  theme === "dark" ? "bg-red-500/20" : "bg-red-100"
                }`}
              >
                <LogOut size={20} />
              </div>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={`
        transition-all duration-300
        ${isMobile ? "ml-0" : "ml-72"}
      `}
      >
        {/* Header - Fixed on mobile, Sticky on desktop */}
        <header
          className={`w-full z-50 transition-all duration-300 ${
            isMobile
              ? `fixed top-0 left-0 right-0 backdrop-blur-md ${
                  isScrolled
                    ? theme === "dark"
                      ? "bg-slate-900/95 shadow-lg shadow-purple-500/10"
                      : "bg-white/95 shadow-lg shadow-purple-200/10"
                    : "bg-transparent"
                }`
              : `sticky top-0 backdrop-blur-md`
          } border-b ${
            theme === "dark" ? "border-purple-500/20" : "border-purple-200"
          }`}
          style={{
            position: isMobile ? "fixed" : "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "dark"
                      ? "hover:bg-slate-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Menu size={24} />
                </button>
              )}

              {/* Breadcrumb - Hide on small mobile screens */}
              <div className="hidden sm:flex items-center gap-2">
                <span
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Dashboard
                </span>
                <ChevronRight size={16} className="text-purple-500" />
                <span className="text-sm font-semibold">
                  {navItems.find((item) => isActive(item.href))?.label ||
                    "Overview"}
                </span>
              </div>

              {/* Mobile Title - Show on small screens */}
              <div className="sm:hidden">
                <span className="text-sm font-semibold">
                  {navItems.find((item) => isActive(item.href))?.label ||
                    "Dashboard"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search - Hide on mobile */}
              <div
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full ${
                  theme === "dark" ? "bg-slate-800" : "bg-gray-100"
                }`}
              >
                <Search size={18} className="opacity-50" />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`bg-transparent outline-none text-sm w-40 ${
                    theme === "dark"
                      ? "placeholder-gray-500"
                      : "placeholder-gray-400"
                  }`}
                />
              </div>

              {/* Notifications */}
              <button
                className={`p-2 rounded-lg transition-colors relative ${
                  theme === "dark" ? "hover:bg-slate-800" : "hover:bg-gray-100"
                }`}
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`p-2 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "hover:bg-slate-800 text-yellow-400"
                    : "hover:bg-gray-100 text-amber-600"
                }`}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Smart Home Button - Hide on mobile */}
              <Link
                href="/"
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  theme === "dark"
                    ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30"
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300"
                }`}
              >
                <Home size={18} />
                <span>View Site</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area - Add padding top for fixed header on mobile */}
        <main
          className={`min-h-[calc(100vh-4rem)] ${
            isMobile ? "pt-16" : ""
          } p-4 sm:p-6 lg:p-8`}
        >
          {children}
        </main>

        {/* Dashboard Footer */}
        <div
          className={`mt-auto border-t ${
            theme === "dark"
              ? "border-slate-800 bg-slate-900/50"
              : "border-gray-200 bg-white/50"
          }`}
        >
          <DashFooter />
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

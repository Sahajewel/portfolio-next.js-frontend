"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  LogIn,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarProps = object;

const Navbar = ({}: NavbarProps) => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  // Only link items, no scroll items
  const menuItems = [
    { name: "Home", type: "link" as const, href: "/" },
    { name: "Projects", type: "link" as const, href: "/projects" },
    { name: "Blogs", type: "link" as const, href: "/blogs" },
  ];

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? theme === "dark"
            ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-purple-500/10"
            : "bg-white/95 backdrop-blur-md shadow-lg shadow-purple-200/10"
          : "bg-transparent"
      },{ ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-pulse"
          >
            <Sparkles className="inline mb-1" size={20} /> Portfolio
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex space-x-1 items-center">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/" && pathname === "/") ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                      : theme === "dark"
                      ? "text-white hover:text-white hover:bg-white/10"
                      : "text-gray-800 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>

            {/* Login / Dashboard Button */}
            {session ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
              >
                <LogIn size={16} />
                Login
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
            <button
              className="p-2 hover:bg-white/10 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`xl:hidden fixed inset-0 top-16 z-[9998] flex flex-col ${
            theme === "dark"
              ? "bg-[#3A1C61] text-white"
              : "bg-white text-gray-900"
          }`}
          style={{ height: "calc(100vh - 64px)" }}
        >
          {/* Scrollable Menu Items */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col space-y-1">
              {menuItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === "/" && pathname === "/") ||
                  (item.href !== "/" && pathname?.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? theme === "dark"
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30"
                          : "bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 border border-purple-500/20"
                        : theme === "dark"
                        ? "text-gray-200 hover:bg-gray-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Fixed Bottom Buttons */}
          <div
            className={`p-4 border-t ${
              theme === "dark"
                ? "border-gray-800 bg-slate-900"
                : "border-gray-200 bg-white"
            }`}
          >
            {session ? (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/20"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 py-3 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-semibold transition-all"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/20"
              >
                <LogIn size={18} />
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

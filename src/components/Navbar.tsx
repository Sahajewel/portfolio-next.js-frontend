"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import {
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  LogIn,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

const menuItems = [
  { name: "home", type: "scroll" },
  { name: "about", type: "scroll" },
  { name: "experience", type: "scroll" },
  { name: "education", type: "scroll" },
  { name: "skills", type: "scroll" },
  { name: "projects", type: "link", href: "/projects" },
  { name: "blogs", type: "link", href: "/blogs" },
  { name: "achievements", type: "scroll" },
  { name: "philosophy", type: "scroll" },
  { name: "contact", type: "scroll" },
];

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll spy + isScrolled
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          const sections = menuItems
            .filter((m) => m.type === "scroll")
            .map((m) => m.name);
          const current = sections.find((id) => {
            const el = document.getElementById(id);
            if (!el) return false;
            const r = el.getBoundingClientRect();
            return r.top <= 100 && r.bottom >= 100;
          });
          if (current) setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const dark = mounted && theme === "dark";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? dark
            ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-purple-500/10"
            : "bg-white/95 backdrop-blur-md shadow-lg shadow-purple-200/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-pulse">
            <Sparkles className="inline mb-1" size={20} /> SAHA
          </div>

          {/* Desktop */}
          <div className="hidden xl:flex space-x-1 items-center">
            {menuItems.map((item) =>
              item.type === "scroll" ? (
                <button
                  key={item.name}
                  onClick={() => scrollTo(item.name)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                    activeSection === item.name
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                      : dark
                        ? "text-gray-200 hover:text-white hover:bg-white/10"
                        : "text-gray-800 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href as string}
                  prefetch={true}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                    dark
                      ? "text-gray-200 hover:text-white hover:bg-white/10"
                      : "text-gray-800 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Link>
              ),
            )}

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />

            {session ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  prefetch={true}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                prefetch={true}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
              >
                <LogIn size={16} /> Login
              </Link>
            )}

            <button
              onClick={() => setTheme(dark ? "light" : "dark")}
              className="ml-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {dark ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setTheme(dark ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {dark ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
            <button
              className="p-2 hover:bg-white/10 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`xl:hidden fixed inset-0 top-16 z-[9998] flex flex-col ${dark ? "bg-[#3A1C61] text-white" : "bg-white text-gray-900"}`}
          style={{ height: "calc(100vh - 64px)" }}
        >
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col space-y-1">
              {menuItems.map((item) =>
                item.type === "scroll" ? (
                  <button
                    key={item.name}
                    onClick={() => scrollTo(item.name)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      activeSection === item.name
                        ? dark
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30"
                          : "bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 border border-purple-500/20"
                        : dark
                          ? "text-gray-200 hover:bg-gray-800"
                          : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href as string}
                    prefetch={true}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full px-4 py-3 rounded-xl text-base font-medium transition-all ${dark ? "text-gray-200 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </Link>
                ),
              )}
            </div>
          </div>

          <div
            className={`p-4 border-t ${dark ? "border-gray-800 bg-slate-900" : "border-gray-200 bg-white"}`}
          >
            {session ? (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/dashboard"
                  prefetch={true}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/20"
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 py-3 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-semibold transition-all"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                prefetch={true}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/20"
              >
                <LogIn size={18} /> Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

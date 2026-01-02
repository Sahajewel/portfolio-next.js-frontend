/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import {
  Sparkles,
  LayoutDashboard,
  Sun,
  Moon,
  X,
  Menu,
  LogIn,
  LogOut,
} from "lucide-react";

// Types Define করা হয়েছে
interface NavbarProps {
  theme?: string;
  onThemeToggle?: () => void;
  session?: any;
}

export const Navbar = ({
  theme = "dark",
  onThemeToggle = () => {},
  session = null,
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = menuItems
        .filter((item) => item.type === "scroll")
        .map((item) => item.name);

      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? theme === "dark"
            ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-purple-500/10 border-b border-purple-500/20"
            : "bg-white/95 backdrop-blur-md shadow-lg shadow-purple-200/10 border-b border-purple-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => scrollToSection("home")}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-pulse hover:scale-105 transition-transform"
          >
            <Sparkles className="inline mb-1 text-purple-500" size={20} />
            Portfolio
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            {menuItems.map((item) =>
              item.type === "scroll" ? (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.name)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                    activeSection === item.name
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                      : theme === "dark"
                      ? "text-gray-200 hover:text-white hover:bg-white/10"
                      : "text-gray-800 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </button>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                    theme === "dark"
                      ? "text-gray-200 hover:text-white hover:bg-white/10"
                      : "text-gray-800 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </a>
              )
            )}

            <div
              className={`h-6 w-px mx-2 ${
                theme === "dark" ? "bg-gray-600" : "bg-gray-300"
              }`}
            />

            {session ? (
              <div className="flex items-center gap-2">
                <a
                  href="/dashboard"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 text-xs"
                >
                  <LayoutDashboard size={14} /> Dashboard
                </a>
                <button
                  onClick={() => console.log("Logout")}
                  className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg font-semibold transition-all flex items-center gap-2 text-xs"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 text-xs"
              >
                <LogIn size={14} /> Login
              </a>
            )}

            <button
              onClick={onThemeToggle}
              className={`ml-2 p-2 rounded-lg transition-all ${
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onThemeToggle}
              className={`p-2 rounded-lg transition-all ${
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-gray-700" />
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

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div
          className={`md:hidden backdrop-blur-md border-t ${
            theme === "dark"
              ? "bg-slate-900/98 border-purple-500/20"
              : "bg-white/98 border-purple-200"
          }`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {menuItems.map((item) =>
              item.type === "scroll" ? (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.name)}
                  className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    activeSection === item.name
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                      : theme === "dark"
                      ? "text-gray-200 hover:bg-gray-800"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </button>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg ${
                    theme === "dark"
                      ? "text-gray-200 hover:bg-gray-800"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

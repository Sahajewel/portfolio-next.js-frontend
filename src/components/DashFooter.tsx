// components/DashFooter.tsx
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Home,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Heart,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function DashFooter() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer
      className={`relative overflow-hidden transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-t from-slate-900 via-purple-900/20 to-slate-900 text-white"
          : "bg-gradient-to-t from-slate-50 via-purple-50/30 to-slate-50 text-gray-900"
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className={`absolute -top-20 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl animate-pulse ${
            theme === "dark" ? "bg-purple-500/30" : "bg-purple-200/50"
          }`}
        />
        <div
          className={`absolute -top-10 right-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000 ${
            theme === "dark" ? "bg-pink-500/30" : "bg-pink-200/50"
          }`}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-purple-600 to-pink-600"
                    : "bg-gradient-to-br from-purple-500 to-pink-500"
                }`}
              >
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                  Dashboard
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  v2.0.0 • Admin Panel
                </p>
              </div>
            </div>
            <p
              className={`text-sm max-w-md ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Modern dashboard for managing your portfolio content with
              real-time updates and analytics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className={`inline-flex items-center gap-2 text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <Home size={14} />
                  View Public Site
                  <ExternalLink size={12} />
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className={`inline-flex items-center gap-2 text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Dashboard Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings"
                  className={`inline-flex items-center gap-2 text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4
              className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="https://github.com/Sahajewel"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-lg transition-all hover:-translate-y-1 ${
                  theme === "dark"
                    ? "bg-slate-800/50 text-gray-300 hover:text-white hover:bg-slate-800 border border-slate-700"
                    : "bg-white/80 text-gray-700 hover:text-gray-900 hover:bg-white border border-gray-200"
                }`}
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/sahajewelkumar"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-lg transition-all hover:-translate-y-1 ${
                  theme === "dark"
                    ? "bg-slate-800/50 text-gray-300 hover:text-blue-400 hover:bg-slate-800 border border-slate-700"
                    : "bg-white/80 text-gray-700 hover:text-blue-600 hover:bg-white border border-gray-200"
                }`}
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://x.com/sahaJewelkumar"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-lg transition-all hover:-translate-y-1 ${
                  theme === "dark"
                    ? "bg-slate-800/50 text-gray-300 hover:text-sky-400 hover:bg-slate-800 border border-slate-700"
                    : "bg-white/80 text-gray-700 hover:text-sky-600 hover:bg-white border border-gray-200"
                }`}
              >
                <Twitter size={18} />
              </a>
              <a
                href="mailto:jewelsaha072@gmail.com"
                className={`p-2.5 rounded-lg transition-all hover:-translate-y-1 ${
                  theme === "dark"
                    ? "bg-slate-800/50 text-gray-300 hover:text-red-400 hover:bg-slate-800 border border-slate-700"
                    : "bg-white/80 text-gray-700 hover:text-red-600 hover:bg-white border border-gray-200"
                }`}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`h-px w-full mb-8 ${
            theme === "dark"
              ? "bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
              : "bg-gradient-to-r from-transparent via-purple-300/50 to-transparent"
          }`}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div
            className={`flex items-center gap-2 text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span>Made with</span>
            <Heart size={14} className="text-red-500 animate-pulse" />
            <span>by</span>
            <span
              className={`font-semibold ${
                theme === "dark" ? "text-purple-400" : "text-purple-600"
              }`}
            >
              Saha Jewel Kumar
            </span>
          </div>

          <div
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span>© {new Date().getFullYear()} </span>
            <span
              className={`font-semibold ${
                theme === "dark" ? "text-purple-400" : "text-purple-600"
              }`}
            >
              Portfolio Dashboard
            </span>
            <span> • All rights reserved</span>
          </div>

          <div
            className={`text-xs px-3 py-1.5 rounded-full font-medium ${
              theme === "dark"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                : "bg-purple-100 text-purple-700 border border-purple-300"
            }`}
          >
            Version 2.0.0
          </div>
        </div>

        {/* Stats */}
        <div
          className={`mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <div
            className={`p-3 rounded-xl ${
              theme === "dark" ? "bg-slate-800/30" : "bg-white/50"
            }`}
          >
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              99.9%
            </div>
            <div className="text-xs">Uptime</div>
          </div>
          <div
            className={`p-3 rounded-xl ${
              theme === "dark" ? "bg-slate-800/30" : "bg-white/50"
            }`}
          >
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              0ms
            </div>
            <div className="text-xs">Latency</div>
          </div>
          <div
            className={`p-3 rounded-xl ${
              theme === "dark" ? "bg-slate-800/30" : "bg-white/50"
            }`}
          >
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              100%
            </div>
            <div className="text-xs">Secure</div>
          </div>
          <div
            className={`p-3 rounded-xl ${
              theme === "dark" ? "bg-slate-800/30" : "bg-white/50"
            }`}
          >
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              24/7
            </div>
            <div className="text-xs">Support</div>
          </div>
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
      `}</style>
    </footer>
  );
}

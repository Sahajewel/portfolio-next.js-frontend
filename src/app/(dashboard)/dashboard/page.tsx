/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/page.tsx (Direct API call)
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Sparkles,
  RefreshCw,
  PenSquare,
  Rocket,
  User,
  FileText,
  Layout,
  Star,
  Eye,
  TrendingUp,
} from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function DashboardPage() {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    blogs: 0,
    projects: 0,
    publishedBlogs: 0,
    featuredProjects: 0,
  });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log("Fetching stats from:", API_BASE_URL);

      const [blogsRes, projectsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/blog`),
        fetch(`${API_BASE_URL}/project`),
      ]);

      console.log("Blogs response status:", blogsRes.status);
      console.log("Projects response status:", projectsRes.status);

      const blogsData = await blogsRes.json();
      const projectsData = await projectsRes.json();

      console.log("Blogs data:", blogsData);
      console.log("Projects data:", projectsData);

      const blogs = blogsData.data || blogsData.date || blogsData || [];
      const projects =
        projectsData.data || projectsData.date || projectsData || [];

      console.log("Parsed blogs:", blogs);
      console.log("Parsed projects:", projects);

      setStats({
        blogs: Array.isArray(blogs) ? blogs.length : 0,
        projects: Array.isArray(projects) ? projects.length : 0,
        publishedBlogs: Array.isArray(blogs)
          ? blogs.filter((blog: any) => blog.published).length
          : 0,
        featuredProjects: Array.isArray(projects)
          ? projects.filter((project: any) => project.featured).length
          : 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = () => {
    setLoading(true);
    fetchStats();
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
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

      <div className="relative   z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl mb-6">
              <Sparkles
                className="text-purple-600 dark:text-purple-400"
                size={32}
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Dashboard Overview
            </h1>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Welcome to your content management dashboard
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
            className={`rounded-2xl border backdrop-blur-md overflow-hidden hover:shadow-xl transition-all duration-300 ${
              theme === "dark"
                ? "bg-slate-800/50 backdrop-blur-md border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20"
                : "bg-white/80 backdrop-blur-md border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    theme === "dark" ? "bg-purple-500/20" : "bg-purple-100"
                  }`}
                >
                  <FileText
                    className="text-purple-600 dark:text-purple-400"
                    size={24}
                  />
                </div>
                <div
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    theme === "dark"
                      ? "bg-purple-500/20 text-purple-300"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  +{stats.blogs}
                </div>
              </div>
              <h3
                className={`text-2xl font-bold mb-1 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {stats.blogs}
              </h3>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Total Blogs
              </p>
            </div>
          </div>

          <div
            className={`rounded-2xl border backdrop-blur-md overflow-hidden hover:shadow-xl transition-all duration-300 ${
              theme === "dark"
                ? "bg-slate-800/50 backdrop-blur-md border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20"
                : "bg-white/80 backdrop-blur-md border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    theme === "dark" ? "bg-green-500/20" : "bg-green-100"
                  }`}
                >
                  <Eye
                    className="text-green-600 dark:text-green-400"
                    size={24}
                  />
                </div>
                <div
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    theme === "dark"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {Math.round(
                    (stats.publishedBlogs / Math.max(stats.blogs, 1)) * 100
                  )}
                  %
                </div>
              </div>
              <h3
                className={`text-2xl font-bold mb-1 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {stats.publishedBlogs}
              </h3>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Published Blogs
              </p>
            </div>
          </div>

          <div
            className={`rounded-2xl border backdrop-blur-md overflow-hidden hover:shadow-xl transition-all duration-300 ${
              theme === "dark"
                ? "bg-slate-800/50 backdrop-blur-md border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20"
                : "bg-white/80 backdrop-blur-md border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    theme === "dark" ? "bg-blue-500/20" : "bg-blue-100"
                  }`}
                >
                  <Layout
                    className="text-blue-600 dark:text-blue-400"
                    size={24}
                  />
                </div>
                <div
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    theme === "dark"
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  +{stats.projects}
                </div>
              </div>
              <h3
                className={`text-2xl font-bold mb-1 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {stats.projects}
              </h3>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Total Projects
              </p>
            </div>
          </div>

          <div
            className={`rounded-2xl border backdrop-blur-md overflow-hidden hover:shadow-xl transition-all duration-300 ${
              theme === "dark"
                ? "bg-slate-800/50 backdrop-blur-md border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20"
                : "bg-white/80 backdrop-blur-md border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    theme === "dark" ? "bg-yellow-500/20" : "bg-yellow-100"
                  }`}
                >
                  <Star
                    className="text-yellow-600 dark:text-yellow-400"
                    size={24}
                  />
                </div>
                <div
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    theme === "dark"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {Math.round(
                    (stats.featuredProjects / Math.max(stats.projects, 1)) * 100
                  )}
                  %
                </div>
              </div>
              <h3
                className={`text-2xl font-bold mb-1 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {stats.featuredProjects}
              </h3>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Featured Projects
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className={`rounded-2xl border backdrop-blur-md overflow-hidden hover:shadow-xl transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-800/50 backdrop-blur-md border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20"
              : "bg-white/80 backdrop-blur-md border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"
          }`}
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2
                  className={`text-2xl font-bold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Quick Actions
                </h2>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Manage your content with ease
                </p>
              </div>
              <button
                onClick={refreshStats}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all ${
                  theme === "dark"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30"
                    : "bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200"
                }`}
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/dashboard/blogs/new"
                className={`group p-6 rounded-xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                  theme === "dark"
                    ? "bg-slate-800/30 border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20"
                    : "bg-white/50 border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                    theme === "dark" ? "bg-blue-500/20" : "bg-blue-100"
                  }`}
                >
                  <PenSquare
                    className="text-blue-600 dark:text-blue-400"
                    size={28}
                  />
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Write New Blog
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Create and publish new content
                </p>
              </Link>

              <Link
                href="/dashboard/projects/new"
                className={`group p-6 rounded-xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                  theme === "dark"
                    ? "bg-slate-800/30 border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20"
                    : "bg-white/50 border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                    theme === "dark" ? "bg-green-500/20" : "bg-green-100"
                  }`}
                >
                  <Rocket
                    className="text-green-600 dark:text-green-400"
                    size={28}
                  />
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Add New Project
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Showcase your work
                </p>
              </Link>

              <Link
                href="/dashboard/profile"
                className={`group p-6 rounded-xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                  theme === "dark"
                    ? "bg-slate-800/30 border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20"
                    : "bg-white/50 border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                    theme === "dark" ? "bg-purple-500/20" : "bg-purple-100"
                  }`}
                >
                  <User
                    className="text-purple-600 dark:text-purple-400"
                    size={28}
                  />
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Update Profile
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Manage your information
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div
          className={`mt-12 p-6 rounded-2xl border backdrop-blur-md ${
            theme === "dark"
              ? "bg-slate-800/50 backdrop-blur-md border-purple-500/20"
              : "bg-white/80 backdrop-blur-md border-purple-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`p-2 rounded-lg ${
                theme === "dark" ? "bg-purple-500/20" : "bg-purple-100"
              }`}
            >
              <TrendingUp
                className="text-purple-600 dark:text-purple-400"
                size={20}
              />
            </div>
            <h3
              className={`text-lg font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Content Statistics
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              className={`p-4 rounded-xl ${
                theme === "dark" ? "bg-slate-800/30" : "bg-slate-50"
              }`}
            >
              <p
                className={`text-xs font-medium mb-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Blogs per Project
              </p>
              <p
                className={`text-lg font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {stats.projects > 0
                  ? (stats.blogs / stats.projects).toFixed(1)
                  : "0.0"}
              </p>
            </div>
            <div
              className={`p-4 rounded-xl ${
                theme === "dark" ? "bg-slate-800/30" : "bg-slate-50"
              }`}
            >
              <p
                className={`text-xs font-medium mb-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Publish Rate
              </p>
              <p
                className={`text-lg font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {Math.round(
                  (stats.publishedBlogs / Math.max(stats.blogs, 1)) * 100
                )}
                %
              </p>
            </div>
            <div
              className={`p-4 rounded-xl ${
                theme === "dark" ? "bg-slate-800/30" : "bg-slate-50"
              }`}
            >
              <p
                className={`text-xs font-medium mb-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Feature Rate
              </p>
              <p
                className={`text-lg font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {Math.round(
                  (stats.featuredProjects / Math.max(stats.projects, 1)) * 100
                )}
                %
              </p>
            </div>
            <div
              className={`p-4 rounded-xl ${
                theme === "dark" ? "bg-slate-800/30" : "bg-slate-50"
              }`}
            >
              <p
                className={`text-xs font-medium mb-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Total Content
              </p>
              <p
                className={`text-lg font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {stats.blogs + stats.projects}
              </p>
            </div>
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
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
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

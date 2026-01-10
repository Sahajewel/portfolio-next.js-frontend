"use client";

import Link from "next/link";
import Image from "next/image";
import { blogAPI } from "@/lib/api";
import { Blog, BlogCategory } from "@/types";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Eye,
  Sparkles,
  User,
  Clock,
  Filter,
  X,
  Code,
  FileCode,
  Database,
  Server,
  Monitor,
  Palette,
  Rocket,
  Briefcase,
  Layers,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
interface BlogsClientProps {
  blogs: Blog[];
}
export default function BlogsClient({ blogs }: BlogsClientProps) {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  //   const fetchBlogs = async () => {
  //     try {
  //       const response = await blogAPI.getAll();
  //       const blogsData = response.data.data || response.data || [];
  //       setBlogs(blogsData);
  //     } catch (error) {
  //       console.error("Error fetching blogs:", error);
  //       setBlogs([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // Category configuration
  const categories = [
    {
      id: "all",
      label: "All Blogs",
      icon: Layers,
      color: "from-purple-500 to-pink-600",
      count: blogs.length,
    },
    {
      id: "JAVASCRIPT",
      label: "JavaScript",
      icon: Code,
      color: "from-yellow-500 to-amber-600",
      count: blogs.filter((b) => b.category === "JAVASCRIPT").length,
    },
    {
      id: "TYPESCRIPT",
      label: "TypeScript",
      icon: FileCode,
      color: "from-blue-500 to-cyan-600",
      count: blogs.filter((b) => b.category === "TYPESCRIPT").length,
    },
    {
      id: "NODEJS",
      label: "Node.js",
      icon: Server,
      color: "from-green-500 to-emerald-600",
      count: blogs.filter((b) => b.category === "NODEJS").length,
    },
    {
      id: "EXPRESSJS",
      label: "Express.js",
      icon: Server,
      color: "from-gray-500 to-slate-600",
      count: blogs.filter((b) => b.category === "EXPRESSJS").length,
    },
    {
      id: "REACT",
      label: "React",
      icon: Monitor,
      color: "from-cyan-500 to-sky-600",
      count: blogs.filter((b) => b.category === "REACT").length,
    },
    {
      id: "NEXTJS",
      label: "Next.js",
      icon: Rocket,
      color: "from-gray-800 to-black",
      count: blogs.filter((b) => b.category === "NEXTJS").length,
    },
    {
      id: "HTMLCSS",
      label: "HTML/CSS",
      icon: Palette,
      color: "from-orange-500 to-red-600",
      count: blogs.filter((b) => b.category === "HTMLCSS").length,
    },
    {
      id: "DATABASE",
      label: "Database",
      icon: Database,
      color: "from-indigo-500 to-purple-600",
      count: blogs.filter((b) => b.category === "DATABASE").length,
    },
    {
      id: "DEVOPS",
      label: "DevOps",
      icon: Server,
      color: "from-teal-500 to-green-600",
      count: blogs.filter((b) => b.category === "DEVOPS").length,
    },
    {
      id: "CAREER",
      label: "Career",
      icon: Briefcase,
      color: "from-pink-500 to-rose-600",
      count: blogs.filter((b) => b.category === "CAREER").length,
    },
    {
      id: "OTHER",
      label: "Other",
      icon: Layers,
      color: "from-gray-400 to-gray-600",
      count: blogs.filter((b) => b.category === "OTHER").length,
    },
  ];

  // Filter blogs based on active tab and search query
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Category filter
      const matchesCategory =
        activeTab === "all" || blog.category === activeTab;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, activeTab, searchQuery]);

  if (!mounted) {
    return null;
  }

  //   if (loading) {
  //     return (
  //       <div
  //         className={`min-h-screen flex items-center justify-center ${
  //           theme === "dark"
  //             ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  //             : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50"
  //         }`}
  //       >
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
  //       </div>
  //     );
  //   }

  return (
    <div>
      <Navbar />
      <div
        className={`min-h-screen pt-20 relative overflow-hidden transition-colors duration-300 ${
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-pulse">
                My Blog Posts
              </h1>
              <p
                className={`text-xl max-w-3xl mx-auto mb-8 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Thoughts, tutorials, and insights about web development and
                technology
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blogs by title, tags, or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-4 py-3 pl-12 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    theme === "dark"
                      ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
                      : "bg-white/80 border-purple-200 text-gray-900 placeholder-gray-500"
                  }`}
                />
                <Filter
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={20}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <X
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                      size={20}
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Category Tabs */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Layers size={20} className="text-purple-500" />
                  Browse by Category
                </h2>
                <span
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {filteredBlogs.length} blog
                  {filteredBlogs.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`group relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                      activeTab === category.id
                        ? "scale-105 shadow-lg"
                        : "hover:scale-[1.02] hover:shadow-md"
                    } ${
                      theme === "dark"
                        ? "bg-slate-800/70 backdrop-blur-sm border border-purple-500/30"
                        : "bg-white/90 backdrop-blur-sm border border-purple-200 shadow-sm"
                    }`}
                  >
                    {activeTab === category.id && (
                      <div
                        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${category.color} opacity-20`}
                      />
                    )}

                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-r ${category.color} z-10`}
                    >
                      <category.icon size={16} className="text-white" />
                    </div>

                    <div className="text-left z-10">
                      <span className="font-semibold text-sm">
                        {category.label}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={`text-xs font-medium ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {category.count}{" "}
                          {category.count === 1 ? "blog" : "blogs"}
                        </span>
                      </div>
                    </div>

                    {activeTab === category.id && (
                      <div
                        className={`absolute inset-0 rounded-lg border-2 bg-gradient-to-r ${category.color} opacity-30`}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Active Category Description */}
              <div className="text-center">
                <div
                  className={`inline-block px-4 py-2 rounded-full ${
                    theme === "dark"
                      ? "bg-purple-500/20 text-purple-300"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  <span className="text-sm font-semibold">
                    {activeTab === "all" && "📚 Showing all blog posts"}
                    {activeTab === "JAVASCRIPT" &&
                      "⚡ JavaScript tutorials and tips"}
                    {activeTab === "TYPESCRIPT" &&
                      "📘 TypeScript type safety and patterns"}
                    {activeTab === "NODEJS" && "🟢 Node.js backend development"}
                    {activeTab === "EXPRESSJS" &&
                      "🚀 Express.js framework guides"}
                    {activeTab === "REACT" && "⚛️ React hooks and components"}
                    {activeTab === "NEXTJS" &&
                      "▲ Next.js full-stack development"}
                    {activeTab === "HTMLCSS" && "🎨 HTML/CSS design and layout"}
                    {activeTab === "DATABASE" &&
                      "🗄️ Database design and optimization"}
                    {activeTab === "DEVOPS" && "🔧 DevOps and deployment"}
                    {activeTab === "CAREER" &&
                      "💼 Career advice and development"}
                    {activeTab === "OTHER" && "📱 Other programming topics"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Blogs Grid */}
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles
                  className="text-purple-600 dark:text-purple-400"
                  size={40}
                />
              </div>
              <h3
                className={`text-2xl font-semibold mb-4 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {blogs.length === 0
                  ? "No blogs published yet"
                  : "No blogs found in this category"}
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {blogs.length === 0
                  ? "Check back later for new content!"
                  : searchQuery
                  ? "Try a different search term or clear search"
                  : `Try selecting a different category or "All"`}
              </p>
              {(searchQuery || activeTab !== "all") && (
                <button
                  onClick={() => {
                    setActiveTab("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {activeTab === "all" && "All Blog Posts"}
                      {activeTab !== "all" &&
                        categories.find((c) => c.id === activeTab)?.label +
                          " Posts"}
                    </h2>
                    <p
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }
                    >
                      Showing {filteredBlogs.length} of {blogs.length} posts
                      {searchQuery && ` for "${searchQuery}"`}
                    </p>
                  </div>
                  {(activeTab !== "all" || searchQuery) && (
                    <button
                      onClick={() => {
                        setActiveTab("all");
                        setSearchQuery("");
                      }}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                        theme === "dark"
                          ? "bg-slate-800/50 hover:bg-slate-700/50 text-gray-300"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <X size={16} />
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.id}`}
                    className="group"
                  >
                    <div
                      className={`h-full rounded-2xl border backdrop-blur-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                        theme === "dark"
                          ? "bg-slate-800/50 backdrop-blur-md border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20"
                          : "bg-white/80 backdrop-blur-md border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"
                      }`}
                    >
                      {blog.thumbnail && (
                        <div className="relative w-full h-52">
                          <Image
                            src={blog.thumbnail}
                            alt={blog.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Category Badge */}
                          <div className="absolute top-3 left-3">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                                blog.category === "JAVASCRIPT"
                                  ? "bg-yellow-500/30 text-yellow-100 border border-yellow-500/50"
                                  : blog.category === "TYPESCRIPT"
                                  ? "bg-blue-500/30 text-blue-100 border border-blue-500/50"
                                  : blog.category === "NODEJS"
                                  ? "bg-green-500/30 text-green-100 border border-green-500/50"
                                  : blog.category === "EXPRESSJS"
                                  ? "bg-gray-500/30 text-gray-100 border border-gray-500/50"
                                  : blog.category === "REACT"
                                  ? "bg-cyan-500/30 text-cyan-100 border border-cyan-500/50"
                                  : blog.category === "NEXTJS"
                                  ? "bg-gray-800/30 text-gray-100 border border-gray-700/50"
                                  : blog.category === "HTMLCSS"
                                  ? "bg-orange-500/30 text-orange-100 border border-orange-500/50"
                                  : blog.category === "DATABASE"
                                  ? "bg-indigo-500/30 text-indigo-100 border border-indigo-500/50"
                                  : blog.category === "DEVOPS"
                                  ? "bg-teal-500/30 text-teal-100 border border-teal-500/50"
                                  : blog.category === "CAREER"
                                  ? "bg-pink-500/30 text-pink-100 border border-pink-500/50"
                                  : "bg-gray-400/30 text-gray-100 border border-gray-500/50"
                              }`}
                            >
                              {blog.category === "JAVASCRIPT" &&
                                "⚡ JavaScript"}
                              {blog.category === "TYPESCRIPT" &&
                                "📘 TypeScript"}
                              {blog.category === "NODEJS" && "🟢 Node.js"}
                              {blog.category === "EXPRESSJS" && "🚀 Express.js"}
                              {blog.category === "REACT" && "⚛️ React"}
                              {blog.category === "NEXTJS" && "▲ Next.js"}
                              {blog.category === "HTMLCSS" && "🎨 HTML/CSS"}
                              {blog.category === "DATABASE" && "🗄️ Database"}
                              {blog.category === "DEVOPS" && "🔧 DevOps"}
                              {blog.category === "CAREER" && "💼 Career"}
                              {blog.category === "OTHER" && "📱 Other"}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                      )}
                      <div className="p-6">
                        <h3
                          className={`text-xl font-bold mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {blog.title}
                        </h3>
                        <p
                          className={`text-sm mb-4 line-clamp-3 leading-relaxed ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {blog.excerpt ||
                            (blog.content && blog.content.substring(0, 150))}
                          ...
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {blog.tags &&
                            blog.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full font-medium ${
                                  theme === "dark"
                                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                    : "bg-purple-100 text-purple-700 border border-purple-200"
                                }`}
                              >
                                <Tag size={10} />
                                {tag}
                              </span>
                            ))}
                          {blog.tags && blog.tags.length > 3 && (
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                theme === "dark"
                                  ? "bg-gray-700 text-gray-400"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              +{blog.tags.length - 3}
                            </span>
                          )}
                        </div>

                        <div
                          className={`flex items-center justify-between text-xs pt-4 border-t ${
                            theme === "dark"
                              ? "border-gray-700 text-gray-400"
                              : "border-gray-200 text-gray-500"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-purple-500" />
                            <span>{blog.author || "Saha Jewel Kumar"}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-purple-500" />
                              <span>
                                {new Date(blog.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye size={14} className="text-purple-500" />
                              <span>{blog.views || 0} views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
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
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          .line-clamp-2 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .line-clamp-3 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
        `}</style>
      </div>
      <Footer />
    </div>
  );
}

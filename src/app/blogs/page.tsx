"use client";

import Link from "next/link";
import Image from "next/image";
import { blogAPI } from "@/lib/api";
import { Blog } from "@/types";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Eye,
  Sparkles,
  User,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function BlogsPage() {
  const { theme } = useTheme();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAll();
      const blogsData = response.data.data || response.data || [];
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([
        {
          id: "1",
          title: "Building Scalable Applications",
          slug: "building-scalable-applications",
          content:
            "Learn how to build scalable applications with modern patterns.",
          excerpt:
            "Learn how to build scalable applications with modern patterns.",
          thumbnail:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
          published: true,
          views: 152,
          tags: ["React", "JavaScript", "Next.js"],
          author: "Saha Jewel Kumar",
          authorId: "1",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Mastering TypeScript",
          slug: "mastering-typescript",
          content: "Advanced TypeScript patterns for modern web development.",
          excerpt: "Advanced TypeScript patterns for modern web development.",
          thumbnail:
            "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop",
          published: true,
          views: 89,
          tags: ["TypeScript", "Node.js", "Best Practices"],
          author: "Saha Jewel Kumar",
          authorId: "1",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Full Stack Development Journey",
          slug: "full-stack-development-journey",
          content:
            "My journey from civil engineering to full stack development.",
          excerpt:
            "My journey from civil engineering to full stack development.",
          thumbnail:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
          published: true,
          views: 210,
          tags: ["Career", "Learning", "Web Development"],
          author: "Saha Jewel Kumar",
          authorId: "1",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#D345A8] dark:text-[#D345A8] hover:text-purple-500 dark:hover:text-purple-300 transition-colors mb-8 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </Link>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-pulse">
              My Blog Posts
            </h1>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Thoughts, tutorials, and insights about web development and
              technology
            </p>
          </div>
        </div>

        {/* Blogs Grid */}
        {blogs.length === 0 ? (
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
              No blogs published yet
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Check back later for new content!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.id}`} className="group">
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
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
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
  );
}

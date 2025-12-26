"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { blogAPI } from "@/lib/api";
import { Blog } from "@/types";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import {
  Eye,
  Edit2,
  Trash2,
  Plus,
  Globe,
  FileText,
  Calendar,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAll();
      const blogsData = response.data.data || response.data || [];
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id: string) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);

    toast(
      (t) => (
        <div
          className={`flex flex-col space-y-4 p-6 rounded-2xl border backdrop-blur-md ${
            theme === "dark"
              ? "bg-slate-800/80 border-purple-500/20 text-white"
              : "bg-white/80 border-purple-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/20">
              <Trash2 className="text-red-500" size={20} />
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                Delete Blog Post?
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Are you sure you want to delete &quot;{blogToDelete?.title}
                &quot;?
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => toast.dismiss(t.id)}
              className={`px-4 py-2 font-medium rounded-xl transition-all duration-200 ${
                theme === "dark"
                  ? "bg-slate-700/50 hover:bg-slate-600/50 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                await handleDeleteConfirm(id);
              }}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
        position: "top-center",
      }
    );
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      await blogAPI.delete(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  const togglePublishStatus = async (
    id: string,
    currentlyPublished: boolean
  ) => {
    try {
      await blogAPI.update(id, { published: !currentlyPublished });
      setBlogs(
        blogs.map((blog) =>
          blog.id === id ? { ...blog, published: !currentlyPublished } : blog
        )
      );
      toast.success(
        currentlyPublished
          ? "Blog unpublished successfully"
          : "Blog published successfully"
      );
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 animate-spin"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 blur-xl opacity-20 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-purple-50/30 to-slate-50"
      }`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse ${
            theme === "dark" ? "bg-purple-500/20" : "bg-purple-200"
          }`}
        />
        <div
          className={`absolute top-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000 ${
            theme === "dark" ? "bg-pink-500/20" : "bg-pink-200"
          }`}
        />
      </div>

      <div className="relative z-10 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-2xl ${
                  theme === "dark"
                    ? "bg-slate-800/50 backdrop-blur-md border border-purple-500/20"
                    : "bg-white/80 backdrop-blur-md border border-purple-200"
                }`}
              >
                <FileText
                  className="text-purple-600 dark:text-purple-400"
                  size={24}
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Manage Blogs
                </h1>
                <p
                  className={`text-sm mt-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Create and manage your blog posts
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard/blogs/new"
            className="group relative w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl blur transition-all group-hover:blur-md opacity-70"></div>
            <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3.5 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2 font-medium">
              <Plus size={20} />
              Create New Blog
            </div>
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div
            className={`max-w-2xl mx-auto rounded-2xl border backdrop-blur-md p-8 text-center ${
              theme === "dark"
                ? "bg-slate-800/50 border-purple-500/20"
                : "bg-white/80 border-purple-200"
            }`}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles
                className="text-purple-600 dark:text-purple-400"
                size={40}
              />
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              No blogs yet
            </h3>
            <p
              className={`mb-8 max-w-sm mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Create your first blog post to share your thoughts and ideas
            </p>
            <Link
              href="/dashboard/blogs/new"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 font-medium"
            >
              <Plus size={20} />
              Create Your First Blog
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div
              className={`hidden lg:block rounded-2xl border backdrop-blur-md overflow-hidden ${
                theme === "dark"
                  ? "bg-slate-800/50 border-purple-500/20"
                  : "bg-white/80 border-purple-200"
              }`}
            >
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr
                    className={
                      theme === "dark" ? "bg-slate-700/50" : "bg-gray-50/50"
                    }
                  >
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px 6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {blogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className={`hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold mb-1">
                          {blog.title}
                        </div>
                        <div className="text-sm opacity-75 line-clamp-1 max-w-md">
                          {blog.excerpt || blog.content.substring(0, 100)}...
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() =>
                            togglePublishStatus(blog.id, blog.published)
                          }
                          className={`px-4 py-1.5 inline-flex items-center gap-2 text-sm font-medium rounded-xl cursor-pointer transition-all duration-200 ${
                            blog.published
                              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                              : "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-yellow-500/30"
                          }`}
                        >
                          <Globe size={14} />
                          {blog.published ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="opacity-50" />
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <TrendingUp size={14} className="opacity-50" />
                          {blog.views || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                        <Link
                          href={`/blogs/${blog.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                          target="_blank"
                        >
                          <Eye size={14} />
                          View
                        </Link>
                        <Link
                          href={`/dashboard/blogs/edit/${blog.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
                        >
                          <Edit2 size={14} />
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteBlog(blog.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className={`rounded-2xl border backdrop-blur-md p-6 ${
                    theme === "dark"
                      ? "bg-slate-800/50 border-purple-500/20"
                      : "bg-white/80 border-purple-200"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3
                      className={`text-lg font-semibold line-clamp-2 flex-1 mr-2 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {blog.title}
                    </h3>
                    <button
                      onClick={() =>
                        togglePublishStatus(blog.id, blog.published)
                      }
                      className={`px-3 py-1.5 text-xs font-medium rounded-xl cursor-pointer transition-all ${
                        blog.published
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                          : "bg-gradient-to-r from-yellow-500 to-amber-600 text-white"
                      }`}
                    >
                      {blog.published ? "Published" : "Draft"}
                    </button>
                  </div>

                  <p
                    className={`text-sm mb-4 line-clamp-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {blog.excerpt || blog.content.substring(0, 120)}...
                  </p>

                  <div className="flex justify-between items-center text-sm mb-4">
                    <div
                      className={`flex items-center gap-2 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <Calendar size={14} />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <TrendingUp size={14} />
                      {blog.views || 0} views
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      href={`/blogs/${blog.id}`}
                      className={`flex-1 text-center py-2.5 rounded-xl font-medium transition-all duration-200 ${
                        theme === "dark"
                          ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                          : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      }`}
                      target="_blank"
                    >
                      <Eye className="inline mr-1" size={16} />
                      View
                    </Link>
                    <Link
                      href={`/dashboard/blogs/edit/${blog.id}`}
                      className={`flex-1 text-center py-2.5 rounded-xl font-medium transition-all duration-200 ${
                        theme === "dark"
                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                    >
                      <Edit2 className="inline mr-1" size={16} />
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteBlog(blog.id)}
                      className={`flex-1 text-center py-2.5 rounded-xl font-medium transition-all duration-200 ${
                        theme === "dark"
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "bg-red-50 text-red-600 hover:bg-red-100"
                      }`}
                    >
                      <Trash2 className="inline mr-1" size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
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
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

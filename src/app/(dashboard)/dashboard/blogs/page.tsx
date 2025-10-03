// app/dashboard/blogs/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { blogAPI } from '@/lib/api';
import { Blog } from '@/types';

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAll();
      const blogsData = response.data.data || response.data || [];
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      await blogAPI.delete(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Blogs</h1>
          <p className="text-gray-600 text-sm mt-1">Create and manage your blog posts</p>
        </div>
        <Link
          href="/dashboard/blogs/new"
          className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium w-full sm:w-auto text-center"
        >
          + Create New Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No blogs yet
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">Create your first blog post to share your thoughts and ideas</p>
          <Link
            href="/dashboard/blogs/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-block"
          >
            Create Your First Blog
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table - Hidden on Mobile */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {blog.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1 max-w-md">
                        {blog.excerpt || blog.content.substring(0, 100)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          blog.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.views || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <Link
                        href={`/blogs/${blog.id}`}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                        target="_blank"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/blogs/edit/${blog.id}`}
                        className="text-green-600 hover:text-green-900 font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteBlog(blog.id)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards - Show on Mobile */}
          <div className="lg:hidden space-y-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
                    {blog.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                      blog.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {blog.excerpt || blog.content.substring(0, 120)}...
                </p>
                
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>Created: {new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span>Views: {blog.views || 0}</span>
                </div>
                
                <div className="flex space-x-3 pt-3 border-t border-gray-200">
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="flex-1 bg-blue-50 text-blue-600 text-center py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm"
                    target="_blank"
                  >
                    View
                  </Link>
                  <Link
                    href={`/dashboard/blogs/edit/${blog.id}`}
                    className="flex-1 bg-green-50 text-green-600 text-center py-2 rounded-lg font-medium hover:bg-green-100 transition-colors text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="flex-1 bg-red-50 text-red-600 text-center py-2 rounded-lg font-medium hover:bg-red-100 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
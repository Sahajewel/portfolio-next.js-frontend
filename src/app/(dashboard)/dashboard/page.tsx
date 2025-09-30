/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/page.tsx (Direct API call)
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    blogs: 0,
    projects: 0,
    publishedBlogs: 0,
    featuredProjects: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log('Fetching stats from:', API_BASE_URL);
      
      const [blogsRes, projectsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/blog`),
        fetch(`${API_BASE_URL}/project`)
      ]);

      console.log('Blogs response status:', blogsRes.status);
      console.log('Projects response status:', projectsRes.status);

      const blogsData = await blogsRes.json();
      const projectsData = await projectsRes.json();

      console.log('Blogs data:', blogsData);
      console.log('Projects data:', projectsData);

      const blogs = blogsData.data || blogsData.date || blogsData || [];
      const projects = projectsData.data || projectsData.date || projectsData || [];

      console.log('Parsed blogs:', blogs);
      console.log('Parsed projects:', projects);

      setStats({
        blogs: Array.isArray(blogs) ? blogs.length : 0,
        projects: Array.isArray(projects) ? projects.length : 0,
        publishedBlogs: Array.isArray(blogs) ? blogs.filter((blog: any) => blog.published).length : 0,
        featuredProjects: Array.isArray(projects) ? projects.filter((project: any) => project.featured).length : 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = () => {
    fetchStats();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

//   if (error) {
//     return (
//       <div className="text-center py-8">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           <p>{error}</p>
//         </div>
//         <button
//           onClick={refreshStats}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <button
          onClick={refreshStats}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm"
        >
          Refresh
        </button>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-2xl">📝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Blogs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.blogs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published Blogs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.publishedBlogs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-2xl">💼</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{stats.projects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Featured Projects</p>
              <p className="text-2xl font-bold text-gray-900">{stats.featuredProjects}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              href="/dashboard/blogs/new"
              className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="mr-3">✏️</span>
              Write New Blog
            </Link>
            <Link
              href="/dashboard/projects/new"
              className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="mr-3">🚀</span>
              Add New Project
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="mr-3">👤</span>
              Update Profile
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="text-gray-500 text-sm">
            <p>No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
}
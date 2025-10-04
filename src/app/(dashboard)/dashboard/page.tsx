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
    setLoading(true);
    fetchStats();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 text-sm mt-1">Welcome to your content management dashboard</p>
        </div>
        <button
          onClick={refreshStats}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          Refresh Stats
        </button>
      </div>
      
      {/* Stats Grid - Mobile Optimized */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Blogs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.blogs}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Published Blogs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.publishedBlogs}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.projects}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">💼</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Featured Projects</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.featuredProjects}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          <Link
            href="/dashboard/blogs/new"
            className="flex items-center p-4 hover:bg-blue-50 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-lg">✏️</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Write New Blog</p>
              <p className="text-sm text-gray-600">Create and publish new content</p>
            </div>
          </Link>
          
          <Link
            href="/dashboard/projects/new"
            className="flex items-center p-4 hover:bg-green-50 transition-colors"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-lg">🚀</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Add New Project</p>
              <p className="text-sm text-gray-600">Showcase your work</p>
            </div>
          </Link>
          
          <Link
            href="/dashboard/profile"
            className="flex items-center p-4 hover:bg-purple-50 transition-colors"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-lg">👤</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Update Profile</p>
              <p className="text-sm text-gray-600">Manage your information</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
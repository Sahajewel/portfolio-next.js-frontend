/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/dashboard/stats/route.ts
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function GET() {
  try {
    const [blogsRes, projectsRes] = await Promise.all([
      fetch(`${API_BASE_URL}/blog`),
      fetch(`${API_BASE_URL}/project`)
    ]);

    if (!blogsRes.ok || !projectsRes.ok) {
      throw new Error('Failed to fetch data from backend');
    }

    const blogsData = await blogsRes.json();
    const projectsData = await projectsRes.json();

    // Handle different response structures from your backend
    const blogs = blogsData.data || blogsData.date || blogsData || [];
    const projects = projectsData.data || projectsData.date || projectsData || [];

    const stats = {
      blogs: Array.isArray(blogs) ? blogs.length : 0,
      projects: Array.isArray(projects) ? projects.length : 0,
      publishedBlogs: Array.isArray(blogs) ? blogs.filter((blog: any) => blog.published).length : 0,
      featuredProjects: Array.isArray(projects) ? projects.filter((project: any) => project.featured).length : 0
    };

    return NextResponse.json({ 
      success: true, 
      data: stats 
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch dashboard stats',
        data: {
          blogs: 0,
          projects: 0,
          publishedBlogs: 0,
          featuredProjects: 0
        }
      },
      { status: 500 }
    );
  }
}
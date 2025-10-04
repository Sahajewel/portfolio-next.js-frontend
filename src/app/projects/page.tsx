import Image from 'next/image';
import { projectAPI } from '@/lib/api';
import { Project } from '@/types';
import Link from 'next/link';
import { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
// Adjust the import path as needed

export const revalidate = 3600;
export const metadata: Metadata = {
  title: 'My Portfolio - Projects',
  description: 'My Portfolio Website is a modern full-stack personal portfolio built with Next.js, Express.js, and Prisma ORM. It features a fully functional dashboard for managing blog posts and showcasing real-time projects dynamically.'
};

async function getProjects(): Promise<Project[]> {
  try {
    const response = await projectAPI.getAll();
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          My Projects
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A collection of my work and side projects in web development
        </p>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold text-gray-600 mb-4">
            No projects added yet
          </h3>
          <p className="text-gray-500">Projects will be added soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
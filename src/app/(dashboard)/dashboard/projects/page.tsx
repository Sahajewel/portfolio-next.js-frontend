// app/dashboard/projects/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { projectAPI } from '@/lib/api';
import { Project } from '@/types';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function DashboardProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getAll();
      const projectsData = response.data.data || response.data || [];
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    const projectToDelete = projects.find(project => project.id === id);
    
    toast((t) => (
      <div className="flex flex-col space-y-4 bg-white p-5">
        <div className="text-lg font-semibold text-gray-900">
          Delete Project?
        </div>
        <div className="text-gray-600">
          Are you sure you want to delete &quot;{projectToDelete?.title}&quot;? This action cannot be undone.
        </div>
        <div className="flex justify-end space-x-3 mt-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              await handleDeleteConfirm(id);
            }}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 10000,
      position: 'top-center',
    });
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      await projectAPI.delete(id);
      setProjects(projects.filter(project => project.id !== id));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const toggleFeatured = async (id: string, currentlyFeatured: boolean) => {
    try {
      await projectAPI.update(id, { featured: !currentlyFeatured });
      setProjects(projects.map(project => 
        project.id === id 
          ? { ...project, featured: !currentlyFeatured }
          : project
      ));
      toast.success(
        currentlyFeatured 
          ? 'Project removed from featured' 
          : 'Project featured successfully'
      );
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Projects</h1>
          <p className="text-gray-600 text-sm mt-1">Showcase your amazing work</p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium w-full sm:w-auto text-center"
        >
          + Add New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No projects yet
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">Start building your portfolio by adding your first project</p>
          <Link
            href="/dashboard/projects/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-block"
          >
            Add Your First Project
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
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technologies
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Links
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {project.thumbnail && (
                          <Image
                            src={project.thumbnail}
                            alt={project.title}
                            height={12}
                            width={12}
                            className="h-12 w-12 rounded-lg object-cover mr-4"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-gray-900 truncate">
                            {project.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-2 max-w-md">
                            {project.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleFeatured(project.id, project.featured)}
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer transition-colors ${
                          project.featured
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {project.featured ? '⭐ Featured' : 'Make Featured'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="space-y-1">
                        {project.liveUrl && (
                          <div className="flex items-center">
                            <span className="mr-2">🌐</span>
                            <span>Live</span>
                          </div>
                        )}
                        {project.githubUrl && (
                          <div className="flex items-center">
                            <span className="mr-2">💻</span>
                            <span>GitHub </span>
                          </div>
                        )}
                       
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                        target="_blank"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/projects/edit/${project.id}`}
                        className="text-green-600 hover:text-green-900 font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProject(project.id)}
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
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-start gap-4 mb-4">
                  {project.thumbnail && (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      height={16}
                      width={16}
                      className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
                        {project.title}
                      </h3>
                      <button
                        onClick={() => toggleFeatured(project.id, project.featured)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full cursor-pointer transition-colors flex-shrink-0 ${
                          project.featured
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {project.featured ? '⭐' : '☆'}
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  {project.liveUrl && (
                    <div className="flex items-center">
                      <span className="mr-1">🌐</span>
                      <span>Live</span>
                    </div>
                  )}
                  {project.githubUrl && (
                    <div className="flex items-center">
                      <span className="mr-1">💻</span>
                      <span>GitHub Frontend</span>
                    </div>
                  )}
                  {project.githubUrl && (
                    <div className="flex items-center">
                      <span className="mr-1">💻</span>
                      <span>GitHub Backend</span>
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex space-x-3 pt-3 border-t border-gray-200">
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex-1 bg-blue-50 text-blue-600 text-center py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm"
                    target="_blank"
                  >
                    View
                  </Link>
                  <Link
                    href={`/dashboard/projects/edit/${project.id}`}
                    className="flex-1 bg-green-50 text-green-600 text-center py-2 rounded-lg font-medium hover:bg-green-100 transition-colors text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProject(project.id)}
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
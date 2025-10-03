/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/projects/edit/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { projectAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import Image from 'next/image';
import TagsInput from '@/components/TagaInput';


interface PageProps {
  params: {
    id: string;
  };
}

export default function EditProjectPage({ params }: PageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    liveUrl: '',
    githubUrl: '',
    technologies: [] as string[],
    featured: false
  });

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      const response = await projectAPI.getById(params.id);
      const projectData = response.data.data || response.data;
      
      setFormData({
        title: projectData.title || '',
        description: projectData.description || '',
        thumbnail: projectData.thumbnail || '',
        liveUrl: projectData.liveUrl || '',
        githubUrl: projectData.githubUrl || '',
        technologies: projectData.technologies || [],
        featured: projectData.featured || false
      });
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project');
      router.push('/dashboard/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      console.log('Updating project data:', formData);
      
      // Validate required fields
      if (!formData.title || !formData.description) {
        toast.error('Please fill in title and description');
        return;
      }

      const response = await projectAPI.update(params.id, formData);
      console.log('Project update response:', response);
      
      if (response.data.success) {
        toast.success('Project updated successfully!');
        router.push('/dashboard/projects');
      } else {
        toast.error(response.data.message || 'Failed to update project');
      }
    } catch (error: any) {
      console.error('Error updating project:', error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to update project. Please try again.');
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Updated technologies change handler for TagsInput component
  const handleTechnologiesChange = (technologies: string[]) => {
    setFormData(prev => ({
      ...prev,
      technologies
    }));
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Project</h1>
          <p className="text-gray-600 text-sm mt-1">Update your project details</p>
        </div>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 font-medium w-full sm:w-auto text-center sm:text-left"
        >
          ← Back to Projects
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 space-y-6">
        {/* Project Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Project Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter project title"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
            placeholder="Describe your project, technologies used, features, etc."
          />
        </div>

        {/* Thumbnail URL */}
        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail URL
          </label>
          <input
            type="url"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="https://example.com/project-image.jpg"
          />
          {formData.thumbnail && (
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-2">Preview:</p>
              <div className="relative h-32 w-32 rounded-lg border border-gray-300 overflow-hidden">
                <Image
                  src={formData.thumbnail} 
                  alt="Thumbnail preview" 
                  className="object-cover"
                  fill
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Technologies - Using TagsInput component */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technologies *
          </label>
          <TagsInput
            tags={formData.technologies}
            onChange={handleTechnologiesChange}
            placeholder="Type and press Enter, Space or Comma to add technologies"
          />
          <p className="mt-2 text-sm text-gray-500">
            Press Enter, Space or Comma to add technologies. Click × to remove.
          </p>
        </div>

        {/* URLs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Live Demo URL
            </label>
            <input
              type="url"
              id="liveUrl"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="https://your-project.com"
            />
          </div>

          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>

        {/* Featured Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="featured" className="ml-3 block text-sm font-medium text-gray-900">
            Feature this project on homepage
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={updating}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors duration-200 flex-1"
          >
            {updating ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                Updating...
              </div>
            ) : (
              'Update Project'
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard/projects')}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 font-medium transition-colors duration-200 flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
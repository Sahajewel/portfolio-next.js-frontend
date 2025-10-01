/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/projects/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { projectAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    liveUrl: '',
    githubUrl: '',
    technologies: [] as string[],
    featured: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Submitting project data:', formData);
      
      // Validate required fields
      if (!formData.title || !formData.description) {
        toast.error('Please fill in title and description');
        return;
      }

      const response = await projectAPI.create(formData);
      console.log('Project creation response:', response);
      
      if (response.data.success) {
        toast.success('Project created successfully!');
        router.push('/dashboard/projects');
      } else {
        toast.error(response.data.message || 'Failed to create project');
      }
    } catch (error: any) {
      console.error('Error creating project:', error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to create project. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
    setFormData(prev => ({
      ...prev,
      technologies
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Project</h1>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Describe your project..."
            />
          </div>

          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
              Thumbnail URL
            </label>
            <input
              type="url"
              id="thumbnail"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="https://example.com/project-image.jpg"
            />
            {formData.thumbnail && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <Image
                  src={formData.thumbnail} 
                  alt="Thumbnail preview" 
                  className="h-32  object-cover rounded-lg border w-32"
                  width={128}
                  height={128}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
              Technologies (comma separated) *
            </label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              required
              value={formData.technologies.join(', ')}
              onChange={handleTechnologiesChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="React, Next.js, TypeScript, Tailwind CSS"
            />
            <p className="mt-1 text-sm text-gray-500">
              Separate technologies with commas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700">
                Live Demo URL
              </label>
              <input
                type="url"
                id="liveUrl"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="https://your-project.com"
              />
            </div>

            <div>
              <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">
                GitHub URL
              </label>
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
              Feature this project on homepage
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/blogs/new/page.tsx (Improved slug handling)
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { blogAPI } from '@/lib/api';
import toast from 'react-hot-toast';

// Function to generate slug from title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function NewBlogPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    tags: [] as string[],
    published: false,
    thumbnail: ''
  });
  const [isSlugManual, setIsSlugManual] = useState(false);

  // Auto-generate slug when title changes (only if slug hasn't been manually edited)
  useEffect(() => {
    if (formData.title && !isSlugManual) {
      const generatedSlug = generateSlug(formData.title);
      setFormData(prev => ({
        ...prev,
        slug: generatedSlug
      }));
    }
  }, [formData.title, isSlugManual]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Submitting blog data:', formData);
      
      // Validate required fields
      if (!formData.title || !formData.slug || !formData.content) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Prepare data with author ID
      const blogData = {
        ...formData,
        authorId: session?.user?.id
      };

      const response = await blogAPI.create(blogData);
      
      if (response.data.success) {
        toast.success('Blog created successfully!');
        router.push('/dashboard/blogs');
      } else {
        toast.error(response.data.message || 'Failed to create blog');
      }
    } catch (error: any) {
      console.error('Error creating blog:', error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to create blog. Please try again.');
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

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = generateSlug(e.target.value);
    setFormData(prev => ({
      ...prev,
      slug
    }));
    
    // Mark as manual edit if user starts typing
    if (!isSlugManual) {
      setIsSlugManual(true);
    }
  };

  const handleSlugFocus = () => {
    // When user focuses on slug field, allow manual editing
    setIsSlugManual(true);
  };

  const resetSlugToAuto = () => {
    // Reset to auto-generated slug based on title
    setIsSlugManual(false);
    const generatedSlug = generateSlug(formData.title);
    setFormData(prev => ({
      ...prev,
      slug: generatedSlug
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Blog</h1>
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
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                Slug *
              </label>
              {isSlugManual && (
                <button
                  type="button"
                  onClick={resetSlugToAuto}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset to auto-generate
                </button>
              )}
            </div>
            <input
              type="text"
              id="slug"
              name="slug"
              required
              value={formData.slug}
              onChange={handleSlugChange}
              onFocus={handleSlugFocus}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="URL-friendly slug"
            />
            <p className="mt-1 text-sm text-gray-500">
              {isSlugManual ? (
                "Manual mode - you can customize the slug"
              ) : (
                "Auto-generate mode - slug updates with title"
              )}
              <br />
              URL: /blogs/{formData.slug || 'your-slug'}
            </p>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              value={formData.excerpt}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Brief description of your blog post"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              rows={10}
              required
              value={formData.content}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Write your blog content here..."
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags.join(', ')}
              onChange={handleTagsChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Next.js, React, TypeScript"
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
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              Publish immediately
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || !session?.user?.id}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Blog'}
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
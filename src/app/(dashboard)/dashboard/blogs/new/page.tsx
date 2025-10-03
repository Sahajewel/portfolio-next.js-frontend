/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/blogs/new/page.tsx (Improved with proper TagsInput)
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { blogAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import TagsInput from '@/components/TagaInput';
// import TagsInput from '@/components/TagsInput';

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

  const handleTagsChange = (tags: string[]) => {
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
    <div className="space-y-6">
      {/* Header Section - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create New Blog</h1>
          <p className="text-gray-600 text-sm mt-1">Write and publish your blog post</p>
        </div>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 font-medium w-full sm:w-auto text-center sm:text-left"
        >
          ← Back to Blogs
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter blog title"
          />
        </div>

        {/* Slug */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
              Slug *
            </label>
            {isSlugManual && (
              <button
                type="button"
                onClick={resetSlugToAuto}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="URL-friendly slug"
          />
          <p className="mt-2 text-sm text-gray-500">
            {isSlugManual ? (
              "Manual mode - you can customize the slug"
            ) : (
              "Auto-generate mode - slug updates with title"
            )}
            <br />
            URL: <span className="text-blue-600">/blogs/{formData.slug || 'your-slug'}</span>
          </p>
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Brief description of your blog post"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            rows={12}
            required
            value={formData.content}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
            placeholder="Write your blog content here..."
          />
        </div>

        {/* Tags - Using the new TagsInput component */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <TagsInput
            tags={formData.tags}
            onChange={handleTagsChange}
            placeholder="Type and press Enter, Space or Comma to add tags"
          />
          <p className="mt-2 text-sm text-gray-500">
            Press Enter, Space or Comma to add tags. Click × to remove.
          </p>
        </div>

        {/* Thumbnail */}
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
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Publish Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="published" className="ml-3 block text-sm font-medium text-gray-900">
            Publish immediately
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={loading || !session?.user?.id}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors duration-200 flex-1"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                Creating...
              </div>
            ) : (
              'Create Blog'
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 font-medium transition-colors duration-200 flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
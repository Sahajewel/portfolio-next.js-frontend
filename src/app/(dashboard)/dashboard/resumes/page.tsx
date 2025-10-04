// app/dashboard/resumes/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { resumeAPI } from '@/lib/api';
import { Resume } from '@/types';
import toast from 'react-hot-toast';

export default function ResumesPage() {
  const { data: session } = useSession();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await resumeAPI.getAll();
      const resumesData = response.data.data || response.data || [];
      
      // Filter resumes by current user
      const userResumes = resumesData.filter((resume: Resume) => 
        resume.userId === session?.user?.id
      );
      
      setResumes(userResumes);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id: string) => {
    const resumeToDelete = resumes.find(resume => resume.id === id);
    
    toast((t) => (
      <div className="flex flex-col space-y-4 bg-white p-4">
        <div className="text-lg font-semibold text-gray-900">
          Delete Resume?
        </div>
        <div className="text-gray-600">
          Are you sure you want to delete the resume for &quot;{resumeToDelete?.data.personalInfo?.fullName || 'Untitled Resume'}&quot;? This action cannot be undone.
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
      await resumeAPI.delete(id);
      toast.success('Resume deleted successfully');
      setResumes(resumes.filter(resume => resume.id !== id));
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Failed to delete resume');
    }
  };

  const duplicateResume = async (resume: Resume) => {
    try {
      const newResumeData = {
        ...resume.data,
        personalInfo: {
          ...resume.data.personalInfo,
          fullName: `${resume.data.personalInfo.fullName} (Copy)`
        }
      };

      const response = await resumeAPI.create({
        data: newResumeData,
        userId: session?.user?.id
      });

      if (response.data.success) {
        toast.success('Resume duplicated successfully');
        fetchResumes();
      }
    } catch (error) {
      console.error('Error duplicating resume:', error);
      toast.error('Failed to duplicate resume');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
        <Link
          href="/dashboard/resumes/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Resume
        </Link>
      </div>

      {resumes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-4">
            No resumes yet
          </h3>
          <p className="text-gray-500 mb-6">Create your first professional resume to get started</p>
          <Link
            href="/dashboard/resumes/new"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Resume
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {resume.data.personalInfo?.fullName || 'Untitled Resume'}
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {new Date(resume.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {resume.data.experience?.length || 0} experiences
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {resume.data.education?.length || 0} education
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    {resume.data.skills?.length || 0} skills
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {resume.data.skills?.slice(0, 3).map((skill) => (
                    <span
                      key={skill.id}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                    >
                      {skill.name}
                    </span>
                  ))}
                  {resume.data.skills?.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{resume.data.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/resumes/edit/${resume.id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/dashboard/resumes/${resume.id}`}
                    target="_blank"
                    className="flex-1 bg-green-600 text-white text-center py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => duplicateResume(resume)}
                    className="flex-1 bg-gray-600 text-white text-center py-2 px-3 rounded text-sm hover:bg-gray-700 transition-colors"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => deleteResume(resume.id)}
                    className="flex-1 bg-red-600 text-white text-center py-2 px-3 rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/resumes/edit/[id]/page.tsx - Updated version
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { resumeAPI } from '@/lib/api';
import { ResumeData, PersonalInfo } from '@/types';
import toast from 'react-hot-toast';

// Default empty data structure
const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: []
};

export default function EditResumePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchResume();
    }
  }, [id]);

  const fetchResume = async () => {
    try {
      const response = await resumeAPI.getById(id);
      
      // Handle different response structures
      const resume = response.data?.data || response.data;
      
      if (resume) {
        // Merge with default structure to ensure all fields exist
        setResumeData({
          ...defaultResumeData,
          ...resume.data, // This contains the actual resume data
          personalInfo: {
            ...defaultResumeData.personalInfo,
            ...resume.data?.personalInfo
          }
        });
      } else {
        toast.error('Resume not found');
        router.push('/dashboard/resumes');
      }
    } catch (error: any) {
      console.error('Error fetching resume:', error);
      
      if (error.response?.status === 404) {
        toast.error('Resume not found');
      } else {
        toast.error('Failed to load resume');
      }
      
      router.push('/dashboard/resumes');
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    if (!resumeData.personalInfo.fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    setSaving(true);
    try {
      const response = await resumeAPI.update(id, {
        data: resumeData,
        userId: session?.user?.id
      });

      if (response.data.success) {
        toast.success('Resume updated successfully!');
        router.push('/dashboard/resumes');
      }
    } catch (error: any) {
      console.error('Error updating resume:', error);
      
      if (error.response?.status === 404) {
        toast.error('Resume not found');
      } else {
        toast.error('Failed to update resume');
      }
    } finally {
      setSaving(false);
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
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Resume
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/dashboard/resumes')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={resumeData.personalInfo.fullName || ''}
              onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={resumeData.personalInfo.email || ''}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              value={resumeData.personalInfo.phone || ''}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              value={resumeData.personalInfo.location || ''}
              onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="New York, NY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              value={resumeData.personalInfo.linkedin || ''}
              onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub
            </label>
            <input
              type="url"
              value={resumeData.personalInfo.github || ''}
              onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://github.com/username"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website/Portfolio
            </label>
            <input
              type="url"
              value={resumeData.personalInfo.website || ''}
              onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>

        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Summary
          </label>
          <textarea
            value={resumeData.summary || ''}
            onChange={(e) => setResumeData(prev => ({ 
              ...prev, 
              summary: e.target.value 
            }))}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Experienced software developer with 5+ years in web development..."
          />
        </div>

       

        <div className="mt-8 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">More sections coming soon!</p>
          <p className="text-sm text-gray-400">
            Experience, Education, Skills, Projects, and Certifications sections will be added in the next update
          </p>
        </div>
      </div>
    </div>
  );
}
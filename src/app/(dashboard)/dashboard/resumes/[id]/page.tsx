// app/dashboard/resumes/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Resume } from '@/types';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export default function DashboardResumePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchResume();
    }
  }, [id]);

  const fetchResume = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/resume/${id}`);
      
      if (!response.ok) {
        throw new Error('Resume not found');
      }

      const data = await response.json();
      const resumeData = data.data || data;
      
      setResume(resumeData);
    } catch (error) {
      console.error('Error fetching resume:', error);
      toast.error('Failed to load resume');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

const handleDownloadPDF = async () => {
  setDownloading(true);
  try {
    const element = document.getElementById('resume-content');
    if (!element) {
      throw new Error('Resume content not found');
    }

    // Add loading state to the element
    element.style.opacity = '0.8';
    
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
      onclone: (clonedDoc) => {
        // Ensure all styles are applied in the clone
        const clonedElement = clonedDoc.getElementById('resume-content');
        if (clonedElement) {
          clonedElement.style.width = '210mm';
          clonedElement.style.height = 'auto';
        }
      }
    });

    // Reset opacity
    element.style.opacity = '1';

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    // Create PDF with proper dimensions
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0; // Start from top
    
    pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`${resume?.data.personalInfo.fullName || 'resume'}_${Date.now()}.pdf`);
    
    toast.success('PDF downloaded successfully!');
  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Fallback: Create a simple text-based PDF
    try {
      const pdf = new jsPDF();
      
      // Add basic resume content as text
      pdf.setFontSize(20);
      pdf.text(resume?.data.personalInfo.fullName || 'Resume', 20, 20);
      
      pdf.setFontSize(12);
      pdf.text(`Email: ${resume?.data.personalInfo.email || ''}`, 20, 35);
      pdf.text(`Phone: ${resume?.data.personalInfo.phone || ''}`, 20, 45);
      pdf.text(`Location: ${resume?.data.personalInfo.location || ''}`, 20, 55);
      
      if (resume?.data.summary) {
        pdf.text('Summary:', 20, 70);
        const splitSummary = pdf.splitTextToSize(resume.data.summary, 170);
        pdf.text(splitSummary, 20, 80);
      }
      
      pdf.save(`${resume?.data.personalInfo.fullName || 'resume'}_simple.pdf`);
      toast.success('Simple PDF downloaded!');
    } catch (fallbackError) {
      console.error('Fallback PDF failed:', fallbackError);
      toast.error('Failed to download PDF. Please try printing instead.');
    }
  } finally {
    setDownloading(false);
  }
};

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/resumes/${id}`;
      
      if (navigator.share) {
        await navigator.share({
          title: `${resume?.data.personalInfo.fullName} - Resume`,
          text: `Check out ${resume?.data.personalInfo.fullName}'s resume`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // If share fails, just copy to clipboard
      const shareUrl = `${window.location.origin}/resumes/${id}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleChangeTemplate = (template: string) => {
    toast.success(`Template changed to ${template}`);
    // Template change logic will be implemented later
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Resume Not Found</h1>
          <p className="text-gray-600">The resume you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/dashboard/resumes')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Resumes
          </button>
        </div>
      </div>
    );
  }

  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume.data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Actions */}
      <div className="bg-white shadow-sm border-b print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Resume Preview</h1>
              <p className="text-sm text-gray-600">{personalInfo.fullName}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push('/dashboard/resumes')}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Back to List
              </button>
              <button
                onClick={() => router.push(`/dashboard/resumes/edit/${id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Edit Resume
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handlePrint}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Print Resume
            </button>
            
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm disabled:opacity-50"
            >
              {downloading ? 'Downloading...' : 'Download PDF'}
            </button>

            <button
              onClick={handleShare}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              Share Resume
            </button>

            {/* Template Selector */}
          
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div id="resume-content" className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none">
          {/* Modern Template Design */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 print:bg-blue-600">
            <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
            <p className="text-xl text-blue-100 mb-6">{summary}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <span className="mr-3 text-lg">📧</span>
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-lg">📱</span>
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-lg">📍</span>
                <span>{personalInfo.location}</span>
              </div>
              {personalInfo.linkedin && (
                <div className="flex items-center">
                  <span className="mr-3 text-lg">💼</span>
                  <span>{personalInfo.linkedin.replace('https://', '')}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center">
                  <span className="mr-3 text-lg">💻</span>
                  <span>{personalInfo.github.replace('https://', '')}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center">
                  <span className="mr-3 text-lg">🌐</span>
                  <span>{personalInfo.website.replace('https://', '')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Resume Body */}
          <div className="p-8">
            {/* Experience Section */}
            {experience && experience.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2 flex items-center">
                  <span className="mr-3">💼</span>
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={exp.id || index} className="relative pl-6 border-l-2 border-blue-200">
                      <div className="absolute -left-1.5 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full mt-1 sm:mt-0">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <p className="text-lg text-blue-600 font-medium mb-3">{exp.company}</p>
                      <p className="text-gray-700 mb-4 whitespace-pre-line leading-relaxed">{exp.description}</p>
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full border border-blue-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education Section */}
            {education && education.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2 flex items-center">
                  <span className="mr-3">🎓</span>
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={edu.id || index} className="relative pl-6 border-l-2 border-green-200">
                      <div className="absolute -left-1.5 top-2 w-3 h-3 bg-green-600 rounded-full"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full mt-1 sm:mt-0">
                          {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                        </span>
                      </div>
                      <p className="text-lg text-green-600 font-medium mb-2">{edu.institution}</p>
                      <p className="text-gray-700 mb-2">{edu.field}</p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600 font-medium">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills Section */}
            {skills && skills.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-purple-600 pb-2 flex items-center">
                  <span className="mr-3">🛠️</span>
                  Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skill, index) => (
                    <div key={skill.id || index} className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-100">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-gray-800 text-lg">{skill.name}</span>
                        <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                          {skill.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2.5 rounded-full"
                            style={{ width: `${(skill.level / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 font-medium w-8">
                          {skill.level}/5
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {projects && projects.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-orange-600 pb-2 flex items-center">
                  <span className="mr-3">🚀</span>
                  Projects
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {projects.map((project, index) => (
                    <div key={project.id || index} className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">{project.name}</h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full border border-orange-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          View Project
                          <span className="ml-1">→</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications Section */}
            {certifications && certifications.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2 flex items-center">
                  <span className="mr-3">🏆</span>
                  Certifications
                </h2>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={cert.id || index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-100 hover:shadow-md transition-shadow">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg mb-1">{cert.name}</h3>
                        <p className="text-gray-600">{cert.issuer}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                        <span className="text-gray-600 text-sm bg-white px-3 py-1 rounded-full border">
                          {cert.date}
                        </span>
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                          >
                            Verify
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

     

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:bg-blue-600 {
            background: #2563eb !important;
          }
        }
      `}</style>
    </div>
  );
}
// components/templates/ProfessionalTemplate.tsx
import { ResumeData } from '@/types';

interface ProfessionalTemplateProps {
  data: ResumeData;
}

export default function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="bg-white min-h-screen font-serif">
      {/* Header */}
      <div className="bg-gray-800 text-white p-8 border-l-4 border-gray-600">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
        <p className="text-lg text-gray-300 mb-6">{summary}</p>
        
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center">
            <span className="mr-2">📧</span>
            {personalInfo.email}
          </div>
          <div className="flex items-center">
            <span className="mr-2">📱</span>
            {personalInfo.phone}
          </div>
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            {personalInfo.location}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Experience as Cards */}
            {experience && experience.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {experience.map((exp, index) => (
                    <div key={exp.id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <p className="text-gray-600 font-medium mb-2">{exp.company}</p>
                      <p className="text-gray-700 text-sm mb-3">{exp.description}</p>
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills as Tags */}
            {skills && skills.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={skill.id || index}
                      className="px-3 py-1 bg-gray-800 text-white text-sm rounded"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
                  Education
                </h2>
                <div className="space-y-3">
                  {education.map((edu, index) => (
                    <div key={edu.id || index}>
                      <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                      <p className="text-gray-600 text-sm">{edu.institution}</p>
                      <p className="text-gray-500 text-xs">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
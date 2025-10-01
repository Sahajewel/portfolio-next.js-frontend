// components/templates/ModernTemplate.tsx
import { ResumeData } from '@/types';

interface ModernTemplateProps {
  data: ResumeData;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
        <p className="text-xl text-blue-100 mb-6">{summary}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <span className="mr-3 text-lg">📧</span>
            {personalInfo.email}
          </div>
          <div className="flex items-center">
            <span className="mr-3 text-lg">📱</span>
            {personalInfo.phone}
          </div>
          <div className="flex items-center">
            <span className="mr-3 text-lg">📍</span>
            {personalInfo.location}
          </div>
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <span className="mr-3 text-lg">💼</span>
              {personalInfo.linkedin.replace('https://', '')}
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center">
              <span className="mr-3 text-lg">💻</span>
              {personalInfo.github.replace('https://', '')}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <span className="mr-3 text-lg">🌐</span>
              {personalInfo.website.replace('https://', '')}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={exp.id || index} className="relative pl-6 border-l-2 border-blue-200">
                  <div className="absolute -left-1.5 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-lg text-blue-600 font-medium mb-3">{exp.company}</p>
                  <p className="text-gray-700 mb-4 whitespace-pre-line">{exp.description}</p>
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
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

        {/* Skills with bars */}
        {skills && skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-purple-600 pb-2">
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={skill.id || index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">{skill.name}</span>
                    <span className="text-sm text-gray-600">{skill.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2.5 rounded-full"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{skill.level}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
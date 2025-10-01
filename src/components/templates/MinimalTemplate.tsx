// components/templates/MinimalTemplate.tsx
import { ResumeData } from '@/types';

interface MinimalTemplateProps {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Simple Header */}
      <div className="border-b border-gray-300 py-8 px-8">
        <h1 className="text-3xl font-light text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <p className="text-gray-600 mb-4 max-w-2xl">{summary}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div>{personalInfo.email}</div>
          <div>•</div>
          <div>{personalInfo.phone}</div>
          <div>•</div>
          <div>{personalInfo.location}</div>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 py-8">
        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-widest">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={exp.id || index}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{exp.company}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-widest">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={skill.id || index}
                  className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-widest">Education</h2>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={edu.id || index}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <span className="text-sm text-gray-500">
                      {edu.startDate} — {edu.current ? 'Present' : edu.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">{edu.field}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
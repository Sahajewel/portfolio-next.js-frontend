// components/templates/CreativeTemplate.tsx
import { ResumeData } from '@/types';

interface CreativeTemplateProps {
  data: ResumeData;
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-b-3xl shadow-lg">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">{personalInfo.fullName}</h1>
            <p className="text-xl text-purple-100 mb-6 max-w-2xl mx-auto">{summary}</p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <span className="mr-2">📧</span>
                {personalInfo.email}
              </div>
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <span className="mr-2">📱</span>
                {personalInfo.phone}
              </div>
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <span className="mr-2">📍</span>
                {personalInfo.location}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 -mt-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Experience */}
            {experience && experience.length > 0 && (
              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  🚀 Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={exp.id || index} className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-2xl border-l-4 border-purple-500">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                        <span className="text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full font-medium">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <p className="text-lg text-purple-600 font-semibold mb-3">{exp.company}</p>
                      <p className="text-gray-700 mb-4 leading-relaxed">{exp.description}</p>
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full shadow"
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

            {/* Skills with Dots */}
            {skills && skills.length > 0 && (
              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  🛠️ Skills
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {skills.map((skill, index) => (
                    <div key={skill.id || index} className="text-center">
                      <div className="relative inline-block mb-2">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {skill.level}/5
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm">{skill.name}</h3>
                      <p className="text-gray-600 text-xs">{skill.category}</p>
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
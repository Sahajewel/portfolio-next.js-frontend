import Image from 'next/image';
// import { serverApi } from '@/lib/api';

// This would be your personal data - you can fetch from API or keep static
const personalInfo = {
  name: "Your Name",
  title: "Full Stack Developer",
  bio: "Passionate developer with expertise in modern web technologies...",
  email: "your.email@example.com",
  location: "Your City, Country",
  image: "/images/profile.jpg" // Add your profile image
};

const skills = [
  { name: "JavaScript", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "React/Next.js", level: 88 },
  { name: "Node.js", level: 82 },
  { name: "PostgreSQL", level: 80 },
  { name: "Tailwind CSS", level: 85 },
];

const experiences = [
  {
    company: "Company Name",
    position: "Full Stack Developer",
    period: "2022 - Present",
    description: "Developed and maintained web applications using modern technologies..."
  },
  {
    company: "Previous Company",
    position: "Frontend Developer",
    period: "2020 - 2022",
    description: "Built responsive user interfaces and collaborated with design teams..."
  }
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          About Me
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn more about my journey, skills, and experience
        </p>
      </section>

      {/* Profile Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="relative w-48 h-48 mx-auto mb-6">
              <Image
                src={personalInfo.image}
                alt={personalInfo.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {personalInfo.name}
            </h2>
            <p className="text-blue-600 font-semibold mb-4">
              {personalInfo.title}
            </p>
            <p className="text-gray-600 mb-6">
              {personalInfo.bio}
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📧 {personalInfo.email}</p>
              <p>📍 {personalInfo.location}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-12">
          {/* Skills Section */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Skills & Technologies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-900">{skill.name}</span>
                    <span className="text-blue-600 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Work Experience</h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-600">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <h4 className="text-xl font-semibold text-gray-900">{exp.position}</h4>
                    <span className="text-blue-600 font-semibold mt-1 md:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
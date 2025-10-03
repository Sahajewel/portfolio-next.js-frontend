import Image from 'next/image';
import Link from 'next/link';

const personalInfo = {
  name: "Saha Jewel Kumar",
  title: "Full Stack Developer",
  bio: "Passionate full-stack developer with expertise in modern web technologies. I love creating beautiful, functional, and user-friendly applications that make a difference.",
  email: "jewelsaha072@gmail.com",
  location: "Saitama, Tokyo, Japan",
  image: "/saha.png" // Replace with your actual image
};

const skills = [
  { name: "JavaScript", level: 90, icon: "🟨" },
  { name: "TypeScript", level: 85, icon: "🔷" },
  { name: "React/Next.js", level: 88, icon: "⚛️" },
  { name: "Node.js", level: 82, icon: "🟢" },
  { name: "Express.js", level: 80, icon: "🌐" }, // Web framework
  { name: "MongoDB", level: 78, icon: "📊" }, // Database
  { name: "PostgreSQL", level: 80, icon: "🗄️" }, // Database
  { name: "Prisma", level: 75, icon: "🔧" }, // Tool
  { name: "Tailwind CSS", level: 85, icon: "🎨" },
];

const experiences = [
  {
    company: "Personal Development",
    position: "Full Stack Development Trainee",
    period: "2024 - Present",
    description: "Intensively learning and practicing full-stack development. Building real-world projects to master modern technologies and development workflows.",
    technologies: ["MERN Stack", "Next.js", "TypeScript", "Prisma", "PostgreSQL"]
  },
  {
    company: "Online Learning Platform",
    position: "Web Development Student", 
    period: "2022 - 2024",
    description: "Completed comprehensive web development courses and tutorials. Gained solid foundation in HTML, CSS, JavaScript and modern frameworks.",
    technologies: ["HTML5", "tailwind css", "JavaScript", "React", "Node.js"]
  }
];

const stats = [
  { number: "20+", label: "Projects Completed" },
  { number: "3+", label: "Years Experience" },
  // { number: "25+", label: "Happy Clients" },
  // { number: "99%", label: "Success Rate" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-20"></div>
            <h1 className="relative text-4xl md:text-6xl font-bold text-gray-900">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate developer crafting digital experiences that make a difference
          </p>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-sm border border-white/20">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Main Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 sticky top-8">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-20"></div>
                  <Image
                    src={personalInfo.image}
                    alt={personalInfo.name}
                    fill
                    className="rounded-full object-cover relative z-10 border-4 border-white shadow-lg"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {personalInfo.name}
                </h2>
                <p className="text-blue-600 font-semibold mb-4 bg-blue-50 px-3 py-1 rounded-full text-sm inline-block">
                  {personalInfo.title}
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {personalInfo.bio}
                </p>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="w-5">📧</span>
                    <span>{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="w-5">📍</span>
                    <span>{personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Experience */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3"></span>
                Skills & Technologies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{skill.icon}</span>
                        <span className="font-semibold text-gray-900">{skill.name}</span>
                      </div>
                     
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 group-hover:h-4 transition-all duration-300">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-1000 group-hover:h-4"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3"></span>
                Work Experience
              </h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="group relative pl-8 border-l-2 border-gray-200 hover:border-blue-500 transition-colors duration-300">
                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {exp.position}
                          </h4>
                          <p className="text-gray-700 font-semibold mt-1">{exp.company}</p>
                        </div>
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mt-2 md:mt-0">
                          {exp.period}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Let&apos;s Build Something Amazing Together
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Ready to bring your ideas to life? I&apos;m always open to discussing new projects and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
               <Link href="https://www.linkedin.com/in/sahajewelkumar"> Get In Touch</Link>
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                <Link href="/projects">View My Work</Link>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
/* eslint-disable react/no-unescaped-entities */
// ✅ SERVER COMPONENTS — no "use client", renders on server, zero JS sent for these

import {
  Code,
  Briefcase,
  Award,
  Star,
  Calendar,
  MapPin,
  GraduationCap,
  Building2,
  Trophy,
} from "lucide-react";

// ─── ABOUT ───────────────────────────────────────────────────────────────────
export function AboutSection() {
  const cards = [
    {
      icon: Code,
      title: "Clean Code",
      desc: "Writing maintainable and scalable code",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Briefcase,
      title: "Problem Solver",
      desc: "Analytical thinking for complex challenges",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Award,
      title: "Fast Learner",
      desc: "Swiftly mastering new frameworks and tools",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Star,
      title: "Team Enthusiast",
      desc: "Collaborative and communicative",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <section
      id="about"
      className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="About Me" subtitle="Get to know me better" />
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-lg leading-relaxed text-gray-300">
            <p className="text-xl font-semibold">
              👋 Hello! I'm a dedicated Full Stack Developer with a strong focus
              on building scalable, high-performance web applications.
            </p>
            <p>
              My programming journey began over{" "}
              <span className="text-purple-400 font-semibold">
                two years ago,
              </span>{" "}
              and since then I have continuously worked on mastering the modern
              web ecosystem.
            </p>
            <p>
              I specialize in the{" "}
              <span className="text-pink-400 font-semibold">
                MERN stack and Next.js,
              </span>{" "}
              working with TypeScript, Prisma, and PostgreSQL to design robust
              backend systems and intuitive interfaces.
            </p>
            <p>
              Currently based in Japan, I actively sharpen my skills by studying
              system design and building side projects that reflect real-world
              use cases.
            </p>
            <p className="text-purple-400 italic">
              💡 "Code is like humor. When you have to explain it, it's bad." —
              Cory House
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {cards.map((item, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-105"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform`}
                >
                  <item.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
const experiences = [
  {
    position: "Full Stack Development (Level 2)",
    company: "Programming Hero",
    duration: "2024 - Present",
    location: "Remote",
    description:
      "Deep diving into advanced Full Stack development with a focus on professional workflow and scalability.",
    achievements: [
      "Mastering TypeScript for building type-safe and robust applications.",
      "Implementing advanced state management and complex backend architectures using Prisma and PostgreSQL.",
      "Building production-grade applications with Next.js and Tailwind CSS.",
    ],
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Redux"],
  },
  {
    position: "Web Development (Level 1)",
    company: "Programming Hero",
    duration: "2023 - 2024",
    location: "Remote",
    description:
      "Foundation of web development, focusing on building responsive and interactive user interfaces.",
    achievements: [
      "Built over 10+ frontend projects using React and modern JavaScript.",
      "Developed a strong understanding of DOM manipulation and CSS frameworks.",
      "Successfully integrated MongoDB for persistent data storage.",
    ],
    technologies: [
      "React.js",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        <SectionHeader
          title="Technical Journey"
          subtitle="My learning and implementation path"
        />
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <div key={i} className="group relative">
              {i < experiences.length - 1 && (
                <div className="hidden md:block absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-purple-500 to-transparent" />
              )}
              <div className="rounded-2xl border p-8 transition-all hover:shadow-xl bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Building2 className="text-white" size={32} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">
                          {exp.position}
                        </h3>
                        <p className="text-xl text-purple-400 font-semibold">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right text-gray-300">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={16} />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mb-4 leading-relaxed text-gray-300">
                      {exp.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-purple-400 mb-2">
                        Key Achievements:
                      </h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((a, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-gray-300"
                          >
                            <span className="text-purple-400 mt-1">▸</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-sm border bg-purple-500/20 text-purple-300 border-purple-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EDUCATION ────────────────────────────────────────────────────────────────
const education = [
  {
    degree: "B.Sc. in Civil Engineering",
    institution: "Stamford University Bangladesh",
    duration: "2009 - 2013",
    gpa: "Completed",
    achievements: [
      "Extensive experience in structural logic and project management",
      "Decided to transition into tech to pursue long-term passion for software",
    ],
  },
  {
    degree: "Professional Web Development",
    institution: "Programming Hero",
    duration: "2023 - 2025",
    gpa: "Certificate",
    achievements: [
      "Successfully mastered MERN & Next.js stack through rigorous training",
      "Dedicated 2+ years to becoming a production-ready developer",
    ],
  },
];

export function EducationSection() {
  return (
    <section
      id="education"
      className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative z-10"
    >
      <div className="max-w-5xl mx-auto w-full">
        <SectionHeader title="Education" subtitle="My academic background" />
        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, i) => (
            <div
              key={i}
              className="group rounded-2xl p-8 border transition-all hover:scale-105 hover:shadow-xl bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform">
                  <GraduationCap className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                  <p className="text-purple-400 font-semibold">
                    {edu.institution}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm mb-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{edu.duration}</span>
                </div>
                <div className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full font-semibold">
                  {edu.gpa}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-purple-400 mb-2">
                  Achievements:
                </h4>
                <ul className="space-y-1">
                  {edu.achievements.map((a, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <Trophy
                        size={14}
                        className="text-yellow-400 mt-0.5 flex-shrink-0"
                      />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
const skills = [
  {
    name: "React.js",
    level: "Expert",
    category: "Frontend",
    icon: "⚛️",
    pct: "95%",
  },
  {
    name: "Next.js",
    level: "Advanced",
    category: "Frontend",
    icon: "▲",
    pct: "85%",
  },
  {
    name: "TypeScript",
    level: "Advanced",
    category: "Language",
    icon: "📘",
    pct: "85%",
  },
  {
    name: "Node.js",
    level: "Advanced",
    category: "Backend",
    icon: "🟢",
    pct: "85%",
  },
  {
    name: "Express.js",
    level: "Advanced",
    category: "Backend",
    icon: "🚂",
    pct: "85%",
  },
  {
    name: "PostgreSQL",
    level: "Intermediate",
    category: "Database",
    icon: "🐘",
    pct: "70%",
  },
  {
    name: "Prisma ORM",
    level: "Advanced",
    category: "Backend",
    icon: "🔷",
    pct: "85%",
  },
  {
    name: "Tailwind CSS",
    level: "Expert",
    category: "Frontend",
    icon: "🎨",
    pct: "95%",
  },
  {
    name: "MongoDB",
    level: "Intermediate",
    category: "Database",
    icon: "🍃",
    pct: "70%",
  },
];

const categories = [
  {
    title: "Frontend",
    techs: ["React", "Next.js", "TypeScript", "Tailwind", "Redux"],
  },
  {
    title: "Backend",
    techs: ["Node.js", "Express", "Prisma", "PostgreSQL", "MongoDB"],
  },
  {
    title: "DevOps & Tools",
    techs: ["Git", "Docker", "AWS", "Vercel", "CI/CD"],
  },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        <SectionHeader
          title="Skills & Expertise"
          subtitle="Technologies I work with"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl border transition-all hover:shadow-lg bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-semibold">{skill.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400 font-bold">
                    {skill.level}
                  </span>
                  <span className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-300">
                    {skill.category}
                  </span>
                </div>
              </div>
              <div className="relative h-3 rounded-full overflow-hidden bg-slate-900">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full"
                  style={{ width: skill.pct }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl backdrop-blur-sm border border-purple-500/20 bg-purple-900/20 hover:scale-105 transition-all"
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full" />
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────────────────
const achievements = [
  {
    title: "Full Stack Development Professional",
    issuer: "Programming Hero",
    date: "2024",
    icon: "🎓",
    description:
      "Successfully completed an intensive 6-month training on MERN stack and Next.js, building 10+ full-scale applications.",
  },
  {
    title: "Career Transition Excellence",
    issuer: "Personal Milestone",
    date: "2024",
    icon: "🚀",
    description:
      "Successfully pivoted from a 10-year career in Civil Engineering to Software Development, mastering modern tech stacks in 2 years.",
  },
  {
    title: "Logical System Design",
    issuer: "Engineering Background",
    date: "2013 - Present",
    icon: "🏗️",
    description:
      "Leveraging 10+ years of structural logic and engineering problem-solving skills into efficient software architecture.",
  },
  {
    title: "Next.js Advanced Implementation",
    issuer: "Learning Milestone",
    date: "2025",
    icon: "⚡",
    description:
      "Mastered Next.js 15+ features, including Server Components, Server Actions, and advanced performance optimization.",
  },
];

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        <SectionHeader
          title="Achievements & Certifications"
          subtitle="Recognition and milestones"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((a, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl border transition-all hover:scale-105 hover:shadow-xl bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl group-hover:scale-110 transition-transform">
                  {a.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{a.title}</h3>
                  <div className="flex items-center gap-3 text-sm mb-3 text-gray-300">
                    <span className="text-purple-400 font-semibold">
                      {a.issuer}
                    </span>
                    <span>•</span>
                    <span>{a.date}</span>
                  </div>
                  <p className="text-sm text-gray-300">{a.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PHILOSOPHY ───────────────────────────────────────────────────────────────
const philosophy = [
  {
    title: "Precision Engineering",
    icon: "🎯",
    text: "Coming from a Civil Engineering background, I apply the same structural integrity and precision to my code that I used to apply to buildings.",
  },
  {
    title: "Continuous Growth",
    icon: "📈",
    text: "For me, coding is a marathon. I've dedicated the last 2 years to mastering the MERN stack and Next.js, and I'm still learning every day.",
  },
  {
    title: "Problem Solver",
    icon: "🧩",
    text: "I don't just write code; I build solutions. My goal is to create scalable and efficient systems that solve real-world problems.",
  },
];

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        <SectionHeader
          title="My Philosophy"
          subtitle="The principles that drive my development process"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {philosophy.map((item, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl border transition-all hover:scale-105 hover:shadow-xl bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Shared helper ────────────────────────────────────────────────────────────
function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-5xl md:text-6xl font-bold mb-4">
        <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <p className="text-gray-300">{subtitle}</p>
    </div>
  );
}

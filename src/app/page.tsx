/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  Code,
  Briefcase,
  Award,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Calendar,
  MapPin,
  GraduationCap,
  Building2,
  BookOpen,
  Trophy,
  Star,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Sun,
  Moon,
  Book,
  Tag,
  User,
  Clock,
} from "lucide-react";
import { useTheme } from "next-themes";
import { blogAPI, projectAPI } from "@/lib/api";
import { Blog, Project } from "@/types";
import Image from "next/image";

// Type definitions for component state
interface MousePosition {
  x: number;
  y: number;
}
type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";
interface Skill {
  name: string;
  level: SkillLevel;
  category: string;
  icon: string;
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface Education {
  degree: string;
  institution: string;
  duration: string;
  gpa: string;
  achievements: string[];
}

interface Achievement {
  title: string;
  issuer: string;
  date: string;
  icon: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
}

interface SocialLink {
  icon: React.ComponentType<{ size: number; className?: string }>;
  href: string;
  color: string;
}

interface ContactInfo {
  icon: React.ComponentType<{ size: number; className?: string }>;
  title: string;
  value: string;
  href: string;
  color: string;
}

interface Category {
  title: string;
  color: string;
  border: string;
  techs: string[];
}

const PortfolioHome = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        "home",
        "about",
        "experience",
        "education",
        "skills",
        "projects",
        "blogs",
        "achievements",
        "testimonials",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    fetchData();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const fetchData = async () => {
    try {
      const [projectsResponse, blogsResponse] = await Promise.all([
        projectAPI.getAll(),
        blogAPI.getAll(),
      ]);

      // Handle API response based on your structure
      const projects = projectsResponse.data?.data || [];
      const blogs = blogsResponse.data?.data || [];

      // Cast to proper types
      const typedProjects = projects as Project[];
      const typedBlogs = blogs as Blog[];

      setFeaturedProjects(typedProjects.slice(0, 3));
      setFeaturedBlogs(typedBlogs.slice(0, 3));
    } catch (error) {
      console.error("Error fetching data:", error);
      // Set fallback data
      setFeaturedProjects([
        {
          id: "1",
          title: "E-Commerce Platform",
          description:
            "Full-stack e-commerce solution with payment integration.",
          thumbnail:
            "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
          technologies: ["Next.js", "Node.js", "PostgreSQL"],
          liveUrl: "#",
          githubUrl: "#",
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
      setFeaturedBlogs([
        {
          id: "1",
          title: "Building Scalable Applications",
          slug: "building-scalable-applications", // Missing property fixed
          content:
            "Learn how to build scalable applications with modern patterns.",
          excerpt:
            "Learn how to build scalable applications with modern patterns.",
          thumbnail:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
          published: true, // Missing property fixed
          views: 0, // Missing property fixed
          tags: ["React", "JavaScript"],
          author: "John Doe",
          authorId: "admin-1", // Missing property fixed
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          // readTime বাদ দেওয়া হয়েছে ইন্টারফেস অনুযায়ী
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const skills: Skill[] = [
    { name: "React.js", level: "Expert", category: "Frontend", icon: "⚛️" },
    { name: "Next.js", level: "Advanced", category: "Frontend", icon: "▲" },
    { name: "TypeScript", level: "Advanced", category: "Language", icon: "📘" },
    { name: "Node.js", level: "Advanced", category: "Backend", icon: "🟢" },
    { name: "Express.js", level: "Advanced", category: "Backend", icon: "🚂" },
    {
      name: "PostgreSQL",
      level: "Intermediate",
      category: "Database",
      icon: "🐘",
    },
    { name: "Prisma ORM", level: "Advanced", category: "Backend", icon: "🔷" },
    { name: "Tailwind CSS", level: "Expert", category: "Frontend", icon: "🎨" },
    {
      name: "MongoDB",
      level: "Intermediate",
      category: "Database",
      icon: "🍃",
    },
  ];

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

  const education: Education[] = [
    {
      degree: "B.Sc. in Civil Engineering",
      institution: "Stamfoed University Bangladesh",
      duration: "2009 - 2013", // ১৩-তে পাস
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

  const achievements: Achievement[] = [
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

  const codingPhilosophy = [
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

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
            : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 text-gray-900"
      }`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse ${
            theme === "dark" ? "bg-purple-500" : "bg-purple-200"
          }`}
        />
        <div
          className={`absolute top-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000 ${
            theme === "dark" ? "bg-pink-500" : "bg-pink-200"
          }`}
        />
        <div
          className={`absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000 ${
            theme === "dark" ? "bg-blue-500" : "bg-blue-200"
          }`}
        />
      </div>

      {/* Cursor Follow Effect */}
      <div
        className={`fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-screen transition-transform duration-100 ${
          theme === "dark" ? "bg-purple-500/30" : "bg-purple-400/20"
        }`}
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: "translate(0, 0)",
        }}
      />

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? theme === "dark"
              ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-purple-500/10"
              : "bg-white/95 backdrop-blur-md shadow-lg shadow-purple-200/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-pulse">
              <Sparkles className="inline mb-1" size={20} /> Portfolio
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1 items-center">
              {[
                "home",
                "about",
                "experience",
                "education",
                "skills",
                "projects",
                "blogs",
                "achievements",
                "testimonials",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeSection === item
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                      : theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-white/5"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900/98 backdrop-blur-md border-t border-purple-500/20">
            <div className="px-4 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto">
              {[
                "home",
                "about",
                "experience",
                "education",
                "skills",
                "projects",
                "blogs",
                "achievements",
                "testimonials",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all ${
                    activeSection === item
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                      : theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-white/5"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 pt-16 relative"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div
            className={`space-y-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 text-purple-600 dark:text-purple-300 font-semibold text-sm animate-bounce">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
              Exploring New Frontiers
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span
                className={`block mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Hi, I'm
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Saha Jewel Kumar
              </span>
            </h1>

            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
              <h2
                className={`text-3xl md:text-4xl font-semibold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Full Stack Enthusiast | Building Scalable Solutions
              </h2>
            </div>

            <p
              className={`text-xl leading-relaxed ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              I specialize in bridging the gap between robust backend systems
              and intuitive frontend interfaces. Currently mastering the modern
              web ecosystem to build high-performance applications that solve
              real-world problems.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/resume.pdf" // public ফোল্ডারে থাকা ফাইলের নাম
                download="Jewel_Saha_Resume.pdf" // ডাউনলোড হওয়ার সময় ফাইলটা এই নামে সেভ হবে
                className="inline-block"
              >
                <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center gap-2">
                  <Download size={20} className="group-hover:animate-bounce" />
                  Download Resume
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </a>
              <button
                onClick={() => scrollToSection("contact")}
                className={`px-8 py-4 border-2 border-purple-500 rounded-full font-semibold transition-all backdrop-blur-sm flex items-center gap-2 ${
                  theme === "dark"
                    ? "hover:bg-purple-500/20 text-white"
                    : "hover:bg-purple-50 text-purple-600"
                }`}
              >
                <MessageSquare size={20} />
                Let's Talk
              </button>
            </div>

            <div className="flex gap-4 pt-4">
              {[
                {
                  icon: Github,
                  href: "https://github.com/Sahajewel",
                  color:
                    theme === "dark"
                      ? "hover:bg-purple-600"
                      : "hover:bg-purple-100",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/sahajewelkumar",
                  color:
                    theme === "dark"
                      ? "hover:bg-blue-600"
                      : "hover:bg-blue-100",
                },
                {
                  icon: Mail,
                  href: "mailto:jewelsaha072@email.com",
                  color:
                    theme === "dark"
                      ? "hover:bg-pink-600"
                      : "hover:bg-pink-100",
                },
              ].map((social: SocialLink, index: number) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full ${
                    social.color
                  } transition-all transform hover:scale-110 hover:shadow-lg border ${
                    theme === "dark"
                      ? "bg-slate-800/50 backdrop-blur-sm border-white/10"
                      : "bg-white/50 backdrop-blur-sm border-gray-200"
                  }`}
                >
                  <social.icon
                    size={24}
                    className={
                      theme === "dark" ? "text-white" : "text-gray-700"
                    }
                  />
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 pt-6 text-sm">
              {/* Experience Section */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    theme === "dark" ? "bg-purple-500/20" : "bg-purple-100"
                  }`}
                >
                  <Code size={16} className="text-purple-400" />
                </div>
                <div>
                  <p
                    className={
                      theme === "dark" ? "text-gray-500" : "text-gray-600"
                    }
                  >
                    Stack Focus
                  </p>
                  <p className="font-semibold">2+ Years</p>
                </div>
              </div>

              {/* Projects Section */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    theme === "dark" ? "bg-pink-500/20" : "bg-pink-100"
                  }`}
                >
                  <Briefcase size={16} className="text-pink-400" />
                </div>
                <div>
                  <p
                    className={
                      theme === "dark" ? "text-gray-500" : "text-gray-600"
                    }
                  >
                    Practical Works
                  </p>
                  <p className="font-semibold">10+ Projects</p>
                </div>
              </div>

              {/* Certifications Section */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    theme === "dark" ? "bg-blue-500/20" : "bg-blue-100"
                  }`}
                >
                  <Award size={16} className="text-blue-400" />
                </div>
                <div>
                  <p
                    className={
                      theme === "dark" ? "text-gray-500" : "text-gray-600"
                    }
                  >
                    Certification
                  </p>
                  <p className="font-semibold">Professional</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full aspect-square">
              {/* Orbiting Circles */}
              <div className="absolute inset-0 animate-spin-slow">
                <div
                  className={`absolute top-0 left-1/2 w-4 h-4 rounded-full -translate-x-1/2 shadow-lg ${
                    theme === "dark"
                      ? "bg-purple-500 shadow-purple-500/50"
                      : "bg-purple-300 shadow-purple-300/50"
                  }`}
                ></div>
              </div>
              <div className="absolute inset-0 animate-spin-slow animation-delay-2000">
                <div
                  className={`absolute bottom-0 left-1/2 w-4 h-4 rounded-full -translate-x-1/2 shadow-lg ${
                    theme === "dark"
                      ? "bg-pink-500 shadow-pink-500/50"
                      : "bg-pink-300 shadow-pink-300/50"
                  }`}
                ></div>
              </div>
              <div className="absolute inset-0 animate-spin-slow animation-delay-4000">
                <div
                  className={`absolute top-1/2 right-0 w-4 h-4 rounded-full -translate-y-1/2 shadow-lg ${
                    theme === "dark"
                      ? "bg-blue-500 shadow-blue-500/50"
                      : "bg-blue-300 shadow-blue-300/50"
                  }`}
                ></div>
              </div>

              {/* Main Image */}
              <div
                className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden border-4 relative ${
                  theme === "dark"
                    ? "bg-slate-900 border-slate-900"
                    : "bg-white border-white"
                }`}
              >
                <Image
                  src="/saha.png"
                  alt="Profile"
                  fill // এটা দিলে ডিভ-এর পুরো সাইজটা ইমেজ নিয়ে নিবে
                  className="object-cover" // ইমেজটা গোল ডিভ-এর ভেতরে সুন্দর সেট হবে
                  priority // হিরো সেকশন তাই সবার আগে লোড হবে
                  sizes="(max-width: 768px) 100vw, 500px" // রেসপন্সিভনেস এর জন্য ভালো
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-purple-400" />
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Get to know me better
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-6 text-lg leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <p className="text-xl font-semibold">
                👋 Hello! I'm a dedicated Full Stack Developer with a passion
                for building scalable web applications and solving complex
                problems.
              </p>
              <p>
                My journey in programming started{" "}
                <span className="text-purple-400 font-semibold">
                  2 years ago
                </span>
                . Since then, I've spent countless hours mastering the modern
                web ecosystem, focusing on writing clean, efficient, and
                maintainable code.
              </p>
              <p>
                I specialize in the{" "}
                <span className="text-pink-400 font-semibold">
                  MERN stack and Next.js
                </span>
                . I love the challenge of turning a complex idea into a
                functional, user-friendly digital reality, from database schema
                design to a polished frontend.
              </p>
              <p>
                When I'm not coding, I'm usually deep-diving into new
                documentation, exploring system design, or building side
                projects to sharpen my skills. I believe that being a developer
                is a lifelong journey of learning and growth.
              </p>
              <p className="text-purple-400 italic">
                💡 "Code is like humor. When you have to explain it, it's bad."
                - Cory House
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
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
                  color: "Always up-to-date with the latest industry trends",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl border transition-all hover:scale-105 ${
                    theme === "dark"
                      ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50"
                      : "bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300"
                  }`}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform`}
                  >
                    <item.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="min-h-screen flex items-center justify-center px-4  relative z-10"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Technical Journey
              </span>
            </h2>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              My learning and implementation path
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="group relative">
                {index < experiences.length - 1 && (
                  <div className="hidden md:block absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-purple-500 to-transparent"></div>
                )}

                <div
                  className={`rounded-2xl border p-8 transition-all hover:shadow-xl ${
                    theme === "dark"
                      ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10"
                      : "bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300 hover:shadow-purple-200/10"
                  }`}
                >
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
                        <div className="text-right">
                          <div
                            className={`flex items-center gap-2 mb-2 ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          >
                            <Calendar size={16} />
                            <span>{exp.duration}</span>
                          </div>
                          <div
                            className={`flex items-center gap-2 ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          >
                            <MapPin size={16} />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      <p
                        className={`mb-4 leading-relaxed ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {exp.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-purple-400 mb-2">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className={`flex items-start gap-2 ${
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-600"
                              }`}
                            >
                              <span className="text-purple-400 mt-1">▸</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 rounded-full text-sm border ${
                              theme === "dark"
                                ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                : "bg-purple-100 text-purple-700 border-purple-200"
                            }`}
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

      {/* Education Section */}
      <section
        id="education"
        className="min-h-screen flex items-center justify-center px-4  relative z-10"
      >
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Education
              </span>
            </h2>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              My academic background
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className={`group rounded-2xl p-8 transition-all hover:scale-105 hover:shadow-xl ${
                  theme === "dark"
                    ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10"
                    : "bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300 hover:shadow-purple-200/10"
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform">
                    <GraduationCap className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                    <p className="text-purple-400 font-semibold">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-4 text-sm mb-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
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
                    {edu.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2 text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <Trophy
                          size={14}
                          className="text-yellow-400 mt-0.5 flex-shrink-0"
                        />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}

      <section
        id="skills"
        className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h2>

            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Technologies I work with
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`group p-6 rounded-xl border transition-all hover:shadow-lg ${
                  theme === "dark"
                    ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10"
                    : "bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300 hover:shadow-purple-200/10"
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>

                    <span className="font-semibold">{skill.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 font-bold text-lg">
                      {skill.level}
                    </span>

                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        theme === "dark"
                          ? "bg-purple-500/20 text-purple-300"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {skill.category}
                    </span>
                  </div>
                </div>

                <div
                  className={`relative h-3 rounded-full overflow-hidden ${
                    theme === "dark" ? "bg-slate-900" : "bg-gray-200"
                  }`}
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-purple-500/50"
                    style={{ width: `${skill.level}` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Frontend",

                color:
                  theme === "dark"
                    ? "from-purple-900/50 to-slate-900/50"
                    : "from-purple-50 to-white",

                border:
                  theme === "dark"
                    ? "border-purple-500/20"
                    : "border-purple-200",

                techs: ["React", "Next.js", "TypeScript", "Tailwind", "Redux"],
              },

              {
                title: "Backend",

                color:
                  theme === "dark"
                    ? "from-pink-900/50 to-slate-900/50"
                    : "from-pink-50 to-white",

                border:
                  theme === "dark" ? "border-pink-500/20" : "border-pink-200",

                techs: [
                  "Node.js",

                  "Express",

                  "Prisma",

                  "PostgreSQL",

                  "MongoDB",
                ],
              },

              {
                title: "DevOps & Tools",

                color:
                  theme === "dark"
                    ? "from-blue-900/50 to-slate-900/50"
                    : "from-blue-50 to-white",

                border:
                  theme === "dark" ? "border-blue-500/20" : "border-blue-200",

                techs: ["Git", "Docker", "AWS", "Vercel", "CI/CD"],
              },
            ].map((category: Category, index: number) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${category.color} p-6 rounded-2xl backdrop-blur-sm border ${category.border} hover:scale-105 transition-all`}
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full"></span>

                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {category.techs.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1.5 backdrop-blur-sm rounded-lg text-sm font-medium transition-all cursor-default ${
                        theme === "dark"
                          ? "bg-white/10 text-white hover:bg-white/20"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
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

      {/* Projects Section - Dynamic */}
      <section
        id="projects"
        className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Some of my recent work
            </p>
          </div>

          {featuredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p
                className={`text-xl ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No projects available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project: Project) => (
                <div
                  key={project.id}
                  className={`group rounded-2xl overflow-hidden border transition-all hover:scale-105 hover:shadow-2xl ${
                    theme === "dark"
                      ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20"
                      : "bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"
                  }`}
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={
                        project.thumbnail ||
                        "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop"
                      }
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t opacity-80 ${
                        theme === "dark"
                          ? "from-slate-900 via-slate-900/50 to-transparent"
                          : "from-white via-white/50 to-transparent"
                      }`}
                    />
                    {project.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                        <Star size={12} fill="white" />
                        Featured
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p
                      className={`text-sm leading-relaxed ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {project.description}
                    </p>

                    <div>
                      <h4 className="text-xs font-semibold text-purple-400 mb-2">
                        Technologies:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(project.technologies || [])
                          .slice(0, 5)
                          .map((tech: string, index: number) => (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded text-xs border ${
                                theme === "dark"
                                  ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                  : "bg-purple-100 text-purple-700 border-purple-200"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 group"
                        >
                          <ExternalLink
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center group ${
                            theme === "dark"
                              ? "border border-purple-500 text-white hover:bg-purple-500/10"
                              : "border border-purple-300 text-gray-700 hover:bg-purple-50"
                          }`}
                        >
                          <Github
                            size={16}
                            className="group-hover:rotate-12 transition-transform"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blogs Section - Dynamic */}
      <section
        id="blogs"
        className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Latest Blogs
              </span>
            </h2>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Thoughts and tutorials I've shared
            </p>
          </div>

          {featuredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p
                className={`text-xl ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No blogs available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBlogs.map((blog: Blog) => (
                <div
                  key={blog.id}
                  className={`group rounded-2xl overflow-hidden border transition-all hover:scale-105 hover:shadow-2xl ${
                    theme === "dark"
                      ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20"
                      : "bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"
                  }`}
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={
                        blog.thumbnail ||
                        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop"
                      }
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t opacity-80 ${
                        theme === "dark"
                          ? "from-slate-900 via-slate-900/50 to-transparent"
                          : "from-white via-white/50 to-transparent"
                      }`}
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div
                        className={`flex items-center gap-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <User size={14} />
                        <span>
                          {typeof blog.author === "string"
                            ? blog.author
                            : blog.author?.name || "Admin"}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <Clock size={14} />
                        {/* <span>{blog.readTime || "5 min"}</span> */}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed line-clamp-3 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {blog.excerpt ||
                        blog.content?.substring(0, 150) ||
                        "Read more about this topic..."}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {(blog.tags || [])
                        .slice(0, 3)
                        .map((tag: string, index: number) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded text-xs border ${
                              theme === "dark"
                                ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                : "bg-purple-100 text-purple-700 border-purple-200"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                    </div>

                    <button
                      onClick={() =>
                        (window.location.href = `/blogs/${blog.id}`)
                      }
                      className="w-full mt-4 px-4 py-2.5 text-purple-600 dark:text-purple-400 font-semibold rounded-lg hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2 group"
                    >
                      <Book size={16} />
                      Read More
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button
              onClick={() => (window.location.href = "/blogs")}
              className="px-8 py-3 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/10 transition-all flex items-center gap-2 mx-auto"
            >
              <BookOpen size={20} />
              View All Blogs
            </button>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section
        id="achievements"
        className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Achievements & Certifications
              </span>
            </h2>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Recognition and milestones
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl border transition-all hover:scale-105 hover:shadow-xl ${
                  theme === "dark"
                    ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10"
                    : "bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300 hover:shadow-purple-200/10"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">
                      {achievement.title}
                    </h3>
                    <div
                      className={`flex items-center gap-3 text-sm mb-3 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <span className="text-purple-400 font-semibold">
                        {achievement.issuer}
                      </span>
                      <span>•</span>
                      <span>{achievement.date}</span>
                    </div>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section
        id="philosophy"
        className="min-h-[70vh] flex items-center justify-center px-4 py-20 relative z-10"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                My Philosophy
              </span>
            </h2>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              The principles that drive my development process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {codingPhilosophy.map((item, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl border transition-all hover:-translate-y-2 ${
                  theme === "dark"
                    ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10"
                    : "bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300 hover:shadow-purple-200/10"
                }`}
              >
                <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p
                  className={`leading-relaxed ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10"
      >
        <div className="max-w-4xl mx-auto w-full text-center">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Let's Work Together
              </span>
            </h2>
            <p
              className={`text-xl leading-relaxed max-w-2xl mx-auto ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Have a project in mind or just want to chat? I'm always open to
              discussing new opportunities, creative ideas, or partnerships.
              Let's bring your vision to life!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Mail,
                title: "Email",
                value: "jewelsaha072@email.com",
                href: "mailto:your@email.com",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Phone,
                title: "Phone",
                value: "+81 80 5052 6822",
                href: "tel:+1234567890",
                color: "from-pink-500 to-pink-600",
              },
              {
                icon: Linkedin,
                title: "LinkedIn",
                value: "Connect with me",
                href: "https://www.linkedin.com/in/sahajewelkumar",
                color: "from-blue-500 to-blue-600",
              },
            ].map((contact: ContactInfo, index: number) => (
              <a
                key={index}
                href={contact.href}
                target={contact.title === "LinkedIn" ? "_blank" : undefined}
                rel={
                  contact.title === "LinkedIn"
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`group p-8 rounded-2xl border transition-all hover:scale-105 hover:shadow-xl ${
                  theme === "dark"
                    ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10"
                    : "bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300 hover:shadow-purple-200/10"
                }`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform`}
                >
                  <contact.icon className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">{contact.title}</h3>
                <p
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }
                >
                  {contact.value}
                </p>
              </a>
            ))}
          </div>

          <div
            className={`p-10 rounded-2xl border ${
              theme === "dark"
                ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20"
                : "bg-white/50 backdrop-blur-sm border-purple-200"
            }`}
          >
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className={`w-full px-4 py-3 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all ${
                    theme === "dark"
                      ? "bg-slate-900/50 border border-purple-500/30 text-white"
                      : "bg-white border border-purple-300 text-gray-900"
                  }`}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className={`w-full px-4 py-3 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all ${
                    theme === "dark"
                      ? "bg-slate-900/50 border border-purple-500/30 text-white"
                      : "bg-white border border-purple-300 text-gray-900"
                  }`}
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className={`w-full px-4 py-3 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all ${
                  theme === "dark"
                    ? "bg-slate-900/50 border border-purple-500/30 text-white"
                    : "bg-white border border-purple-300 text-gray-900"
                }`}
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                className={`w-full px-4 py-3 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all resize-none ${
                  theme === "dark"
                    ? "bg-slate-900/50 border border-purple-500/30 text-white"
                    : "bg-white border border-purple-300 text-gray-900"
                }`}
              />
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Send Message
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`relative z-10 py-12 border-t ${
          theme === "dark"
            ? "bg-slate-900/80 backdrop-blur-sm border-purple-500/20"
            : "bg-white/80 backdrop-blur-sm border-purple-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
                Portfolio
              </h3>
              <p
                className={`leading-relaxed ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Building exceptional digital experiences with passion and
                precision.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {["About", "Projects", "Blogs", "Contact"].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className={`block transition-colors ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-purple-400"
                        : "text-gray-600 hover:text-purple-600"
                    }`}
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com/Sahajewel" },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/sahajewelkumar",
                  },
                  { icon: Mail, href: "mailto:jewelsaha072@email.com" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg transition-all ${
                      theme === "dark"
                        ? "bg-slate-800/50 hover:bg-purple-600"
                        : "bg-gray-100 hover:bg-purple-100"
                    }`}
                  >
                    <social.icon
                      size={20}
                      className={
                        theme === "dark"
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-purple-600"
                      }
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div
            className={`border-t pt-8 text-center ${
              theme === "dark"
                ? "border-purple-500/20 text-gray-400"
                : "border-purple-200 text-gray-600"
            }`}
          >
            <p>© 2025 saha jewel kumar. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      `}</style>
    </div>
  );
};

export default PortfolioHome;

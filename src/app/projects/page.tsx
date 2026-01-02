"use client";

import Link from "next/link";
import Image from "next/image";
import { projectAPI } from "@/lib/api";
import { Project } from "@/types";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  Star,
  Github,
  Globe,
  Code,
  Rocket,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ProjectsPage() {
  const { theme } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getAll();
      const projectsData = response.data.data || response.data || [];
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([
        {
          id: "1",
          title: "E-Commerce Platform",
          description:
            "Full-stack e-commerce solution with payment integration.",
          thumbnail:
            "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
          technologies: [
            "Next.js",
            "Node.js",
            "PostgreSQL",
            "Stripe",
            "Tailwind CSS",
          ],
          liveUrl: "#",
          githubUrl: "#",
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Task Management App",
          description:
            "Real-time task management with drag & drop functionality.",
          thumbnail:
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
          technologies: [
            "React",
            "TypeScript",
            "Express",
            "Socket.io",
            "MongoDB",
          ],
          liveUrl: "#",
          githubUrl: "#",
          featured: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Portfolio Website",
          description:
            "Modern portfolio with blog and project management dashboard.",
          thumbnail:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
          technologies: [
            "Next.js",
            "Prisma",
            "PostgreSQL",
            "NextAuth",
            "Tailwind",
          ],
          liveUrl: "#",
          githubUrl: "#",
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

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
      <div className="fixed inset-0 opacity-30 pointer-events-none">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#D345A8] dark:text-[#D345A8] hover:text-purple-500 dark:hover:text-purple-300 transition-colors mb-8 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl mb-6">
              <Rocket
                className="text-purple-600 dark:text-purple-400"
                size={32}
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-pulse">
              My Projects
            </h1>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              A collection of my work and side projects in web development
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles
                className="text-purple-600 dark:text-purple-400"
                size={40}
              />
            </div>
            <h3
              className={`text-2xl font-semibold mb-4 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              No projects added yet
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Projects will be added soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group"
              >
                <div
                  className={`h-full rounded-2xl border backdrop-blur-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                    theme === "dark"
                      ? "bg-slate-800/50 backdrop-blur-md border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20"
                      : "bg-white/80 backdrop-blur-md border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"
                  }`}
                >
                  {project.thumbnail && (
                    <div className="relative w-full h-56">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {project.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs rounded-full font-bold">
                            <Star size={12} fill="white" />
                            Featured
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    <p
                      className={`text-sm leading-relaxed ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {project.description}
                    </p>

                    <div>
                      <h4
                        className={`text-xs font-semibold mb-2 ${
                          theme === "dark"
                            ? "text-purple-400"
                            : "text-purple-600"
                        }`}
                      >
                        <Code size={14} className="inline mr-2" />
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
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe size={16} />
                          Live Demo
                          <ExternalLink
                            size={14}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 group ${
                            theme === "dark"
                              ? "border border-purple-500 text-white hover:bg-purple-500/10"
                              : "border border-purple-300 text-gray-700 hover:bg-purple-50"
                          }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={16} />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
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
}

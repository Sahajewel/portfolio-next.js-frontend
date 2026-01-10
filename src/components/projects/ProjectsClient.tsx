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
  Grid3x3,
  FileCode,
  Layers,
  FolderOpen,
} from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

type ProjectCategory = "FULLSTACK" | "HTMLCSSJS" | "HTMLCSS" | "OTHERS";
interface ProjectsClientProps {
  projects: Project[];
}
export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const { theme, systemTheme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");

  // Get current theme
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  //   const fetchProjects = async () => {
  //     try {
  //       const response = await projectAPI.getAll();
  //       const projectsData = response.data.data || response.data || [];
  //       setProjects(projectsData);
  //     } catch (error) {
  //       console.error("Error fetching projects:", error);
  //       setProjects([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const categories = [
    {
      id: "all",
      label: "All Projects",
      icon: Grid3x3,
      color: "from-purple-500 to-pink-600",
      count: projects.length,
    },
    {
      id: "FULLSTACK",
      label: "FullStack Projects",
      icon: Layers,
      color: "from-blue-500 to-cyan-600",
      count: projects.filter((p) => p.category === "FULLSTACK").length,
    },
    {
      id: "REACTTAILWINDJS",
      label: "REACT/TAILWIND/JS Projects",
      icon: Rocket,
      color: "from-blue-500 to-cyan-600",
      count: projects.filter((p) => p.category === "REACTTAILWINDJS").length,
    },
    {
      id: "HTMLCSSJS",
      label: "HTML/CSS/JS Projects",
      icon: FileCode,
      color: "from-green-500 to-emerald-600",
      count: projects.filter((p) => p.category === "HTMLCSSJS").length,
    },
    {
      id: "HTMLCSS",
      label: "HTML/CSS Projects",
      icon: Code,
      color: "from-orange-500 to-red-600",
      count: projects.filter((p) => p.category === "HTMLCSS").length,
    },
    {
      id: "OTHERS",
      label: "Other Projects",
      icon: FolderOpen,
      color: "from-gray-500 to-slate-600",
      count: projects.filter((p) => p.category === "OTHERS").length,
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  if (!mounted) {
    return null;
  }

  //   if (loading) {
  //     return (
  //       <div
  //         className={`min-h-screen flex items-center justify-center ${
  //           currentTheme === "dark"
  //             ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  //             : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50"
  //         }`}
  //       >
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
  //       </div>
  //     );
  //   }

  return (
    <div>
      <Navbar />
      <div
        className={`min-h-screen pt-20 relative overflow-hidden transition-colors duration-300 ${
          currentTheme === "dark"
            ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
            : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 text-gray-900"
        }`}
      >
        {/* Animated Background */}
        <div className="fixed inset-0 opacity-30 pointer-events-none">
          <div
            className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse ${
              currentTheme === "dark" ? "bg-purple-500" : "bg-purple-200"
            }`}
          />
          <div
            className={`absolute top-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000 ${
              currentTheme === "dark" ? "bg-pink-500" : "bg-pink-200"
            }`}
          />
          <div
            className={`absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000 ${
              currentTheme === "dark" ? "bg-blue-500" : "bg-blue-200"
            }`}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-16">
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
                className={`text-xl max-w-3xl mx-auto mb-8 ${
                  currentTheme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                A collection of my work and side projects in web development
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`group relative px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    activeTab === category.id
                      ? "scale-105 shadow-2xl"
                      : "hover:scale-[1.02] hover:shadow-lg"
                  } ${
                    currentTheme === "dark"
                      ? "bg-slate-800/70 backdrop-blur-sm border border-purple-500/30"
                      : "bg-white/90 backdrop-blur-sm border border-purple-200 shadow-sm"
                  }`}
                >
                  {activeTab === category.id && (
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${category.color} opacity-20`}
                    />
                  )}

                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${category.color} z-10`}
                  >
                    <category.icon size={20} className="text-white" />
                  </div>

                  <div className="text-left z-10">
                    <span className="font-semibold text-sm">
                      {category.label}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs font-medium ${
                          currentTheme === "dark"
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        {category.count}{" "}
                        {category.count === 1 ? "project" : "projects"}
                      </span>
                    </div>
                  </div>

                  {activeTab === category.id && (
                    <div
                      className={`absolute inset-0 rounded-xl border-2 bg-gradient-to-r ${category.color} opacity-50`}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Category Description */}
            <div className="text-center mb-8">
              <div
                className={`inline-block px-4 py-2 rounded-full ${
                  currentTheme === "dark"
                    ? "bg-purple-500/20 text-purple-300"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                <span className="text-sm font-semibold">
                  {activeTab === "all" && "📂 Showing all projects"}
                  {activeTab === "FULLSTACK" &&
                    "🚀 Full-stack applications with frontend & backend"}
                  {activeTab === "HTMLCSSJS" &&
                    "⚡ Interactive websites with JavaScript"}
                  {activeTab === "HTMLCSS" &&
                    "🎨 Static websites with HTML & CSS"}
                  {activeTab === "OTHERS" && "📱 Other projects and designs"}
                </span>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles
                  className="text-purple-600 dark:text-purple-400"
                  size={40}
                />
              </div>
              <h3
                className={`text-2xl font-semibold mb-4 ${
                  currentTheme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {projects.length === 0
                  ? "No projects added yet"
                  : "No projects in this category"}
              </h3>
              <p
                className={`${
                  currentTheme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {projects.length === 0
                  ? "Projects will be added soon!"
                  : "Try selecting a different category"}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {activeTab === "all" && "All Projects"}
                  {activeTab === "FULLSTACK" && "Full-Stack Projects"}
                  {activeTab === "HTMLCSSJS" && "HTML/CSS/JavaScript Projects"}
                  {activeTab === "HTMLCSS" && "HTML/CSS Projects"}
                  {activeTab === "OTHERS" && "Other Projects"}
                </h2>
                <p
                  className={
                    currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
                  }
                >
                  Showing {filteredProjects.length} of {projects.length}{" "}
                  projects
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="group h-full"
                  >
                    <div
                      className={`h-full rounded-2xl border backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col ${
                        currentTheme === "dark"
                          ? "bg-slate-800/60 border-purple-500/30 hover:border-purple-500/50 hover:shadow-purple-500/20"
                          : "bg-white/90 border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"
                      }`}
                    >
                      {/* Thumbnail Section - Fixed Height */}
                      <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
                        <Image
                          src={project.thumbnail || "/project-placeholder.jpg"}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/project-placeholder.jpg";
                          }}
                        />

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                              project.category === "FULLSTACK"
                                ? "bg-blue-500/30 text-blue-100 border border-blue-500/50"
                                : project.category === "HTMLCSSJS"
                                ? "bg-green-500/30 text-green-100 border border-green-500/50"
                                : project.category === "HTMLCSS"
                                ? "bg-orange-500/30 text-orange-100 border border-orange-500/50"
                                : "bg-gray-500/30 text-gray-100 border border-gray-500/50"
                            }`}
                          >
                            {project.category === "FULLSTACK" && "🚀 FullStack"}
                            {project.category === "HTMLCSSJS" &&
                              "⚡ HTML/CSS/JS"}
                            {project.category === "HTMLCSS" && "🎨 HTML/CSS"}
                            {project.category === "OTHERS" && "📱 Others"}
                          </span>
                        </div>

                        {project.featured && (
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs rounded-full font-bold backdrop-blur-sm">
                              <Star size={10} fill="white" />
                              Featured
                            </span>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-bold text-white mb-0.5 line-clamp-1">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      {/* Content Section - Flexible */}
                      <div className="flex-1 p-5 flex flex-col">
                        {/* Description - Fixed height with ellipsis */}
                        <p
                          className={`text-sm mb-4 flex-1 min-h-[60px] max-h-[80px] overflow-hidden ${
                            currentTheme === "dark"
                              ? "text-gray-300"
                              : "text-gray-600"
                          }`}
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {project.description}
                        </p>

                        {/* Technologies Section */}
                        <div className="mb-4">
                          <h4
                            className={`text-xs font-semibold mb-2 flex items-center gap-1 ${
                              currentTheme === "dark"
                                ? "text-purple-300"
                                : "text-purple-600"
                            }`}
                          >
                            <Code size={12} />
                            Technologies:
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {(project.technologies || [])
                              .slice(0, 5)
                              .map((tech: string, index: number) => (
                                <span
                                  key={index}
                                  className={`px-2 py-1 rounded text-xs border backdrop-blur-sm ${
                                    currentTheme === "dark"
                                      ? "bg-purple-500/20 text-purple-200 border-purple-500/30"
                                      : "bg-purple-100 text-purple-700 border-purple-200"
                                  }`}
                                >
                                  {tech}
                                </span>
                              ))}
                            {(project.technologies || []).length > 5 && (
                              <span
                                className={`px-2 py-1 rounded text-xs border backdrop-blur-sm ${
                                  currentTheme === "dark"
                                    ? "bg-gray-500/20 text-gray-300 border-gray-500/30"
                                    : "bg-gray-100 text-gray-600 border-gray-200"
                                }`}
                              >
                                +{project.technologies.length - 5}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons - Fixed at bottom */}
                        <div className="flex gap-2 pt-3 border-t border-gray-700/30 dark:border-gray-600/30 mt-auto">
                          {project.liveUrl && project.liveUrl !== "#" && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 px-3 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 group"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Globe size={14} />
                              <span className="hidden sm:inline">Live</span>
                              <ExternalLink
                                size={12}
                                className="group-hover:translate-x-0.5 transition-transform"
                              />
                            </a>
                          )}
                          {project.githubUrl && project.githubUrl !== "#" && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 group ${
                                currentTheme === "dark"
                                  ? "border border-purple-500/50 text-white hover:bg-purple-500/10"
                                  : "border border-purple-300 text-gray-700 hover:bg-purple-50"
                              }`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github size={14} />
                              <span className="hidden sm:inline">Code</span>
                            </a>
                          )}
                          {(!project.liveUrl || project.liveUrl === "#") &&
                            (!project.githubUrl ||
                              project.githubUrl === "#") && (
                              <span
                                className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold text-center ${
                                  currentTheme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                              >
                                View Details
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        <Footer />
      </div>

      <style jsx global>{`
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
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
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

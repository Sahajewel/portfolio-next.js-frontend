"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { projectAPI } from "@/lib/api";
import { Project } from "@/types";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  Star,
  Github,
  Globe,
  Code,
  Calendar,
  ExternalLink,
  Sparkles,
  Rocket,
} from "lucide-react";
import { useState, useEffect } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: PageProps) {
  const { theme, resolvedTheme } = useTheme();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [projectId, setProjectId] = useState<string>("");

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  useEffect(() => {
    setMounted(true);
    const fetchParams = async () => {
      const { id } = await params;
      setProjectId(id);
      fetchProject(id);
    };
    fetchParams();
  }, [params]);

  const fetchProject = async (id: string) => {
    try {
      const response = await projectAPI.getById(id);
      const projectData = response.data.data || response.data;
      setProject(projectData);
    } catch (error) {
      console.error("Error fetching project:", error);
      setProject({
        id,
        title: "E-Commerce Platform",
        description:
          "A full-stack e-commerce solution with payment gateway integration, user authentication, and admin dashboard. Built with modern web technologies for optimal performance and user experience.",
        thumbnail:
          "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop",
        technologies: [
          "Next.js",
          "Node.js",
          "PostgreSQL",
          "Stripe",
          "Tailwind CSS",
          "Prisma",
          "NextAuth",
        ],
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          currentTheme === "dark"
            ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
            : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
        currentTheme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 text-gray-900"
      }`}
    >
      {/* Animated Background - Exactly like ProjectsPage */}
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
        {/* Header - Same as ProjectsPage */}
        <div className="mb-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[#D345A8] dark:text-[#D345A8] hover:text-purple-500 dark:hover:text-purple-300 transition-colors mb-8 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Projects
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl mb-6">
              <Rocket
                className="text-purple-600 dark:text-purple-400"
                size={32}
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Project Details
            </h1>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                currentTheme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              A deep dive into this project&apos;s implementation and features
            </p>
          </div>
        </div>

        {/* Project Card - Styled like ProjectsPage cards */}
        <div
          className={`rounded-2xl border backdrop-blur-md overflow-hidden hover:shadow-2xl transition-all duration-300 ${
            currentTheme === "dark"
              ? "bg-slate-800/50 backdrop-blur-md border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20"
              : "bg-white/80 backdrop-blur-md border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"
          }`}
        >
          {project.thumbnail && (
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                className="object-cover"
              />
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-sm rounded-full shadow-lg font-bold">
                    <Star size={16} fill="white" />
                    Featured Project
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {project.title}
                </h2>
              </div>
            </div>
          )}

          <div className="p-6 md:p-10 space-y-8">
            {/* Description */}
            <div>
              <h3
                className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                  currentTheme === "dark"
                    ? "text-purple-400"
                    : "text-purple-600"
                }`}
              >
                <Sparkles size={18} />
                Project Overview
              </h3>
              <p
                className={`text-base leading-relaxed ${
                  currentTheme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h3
                className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                  currentTheme === "dark"
                    ? "text-purple-400"
                    : "text-purple-600"
                }`}
              >
                <Code size={18} />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${
                      currentTheme === "dark"
                        ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                        : "bg-purple-100 text-purple-700 border-purple-200"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h3
                className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                  currentTheme === "dark"
                    ? "text-purple-400"
                    : "text-purple-600"
                }`}
              >
                <ExternalLink size={18} />
                Project Links
              </h3>
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 group min-w-[200px]"
                  >
                    <Globe size={18} />
                    Live Demo
                    <ExternalLink
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group min-w-[200px] ${
                      currentTheme === "dark"
                        ? "border border-purple-500 text-white hover:bg-purple-500/10"
                        : "border border-purple-300 text-gray-700 hover:bg-purple-50"
                    }`}
                  >
                    <Github size={18} />
                    Source Code
                  </a>
                )}
              </div>
            </div>

            {/* Project Info */}
            <div
              className={`pt-8 border-t ${
                currentTheme === "dark" ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-6 flex items-center gap-2 ${
                  currentTheme === "dark"
                    ? "text-purple-400"
                    : "text-purple-600"
                }`}
              >
                <Calendar size={18} />
                Project Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`p-6 rounded-xl ${
                    currentTheme === "dark" ? "bg-slate-800/50" : "bg-slate-50"
                  }`}
                >
                  <p
                    className={`text-xs uppercase tracking-wider font-bold mb-2 ${
                      currentTheme === "dark"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    Created On
                  </p>
                  <p
                    className={`font-semibold ${
                      currentTheme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div
                  className={`p-6 rounded-xl ${
                    currentTheme === "dark" ? "bg-slate-800/50" : "bg-slate-50"
                  }`}
                >
                  <p
                    className={`text-xs uppercase tracking-wider font-bold mb-2 ${
                      currentTheme === "dark"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    Last Updated
                  </p>
                  <p
                    className={`font-semibold ${
                      currentTheme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {new Date(project.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      `}</style>
    </div>
  );
}

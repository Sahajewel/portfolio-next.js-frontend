"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { projectAPI } from "@/lib/api";
import { Project } from "@/types";
import Image from "next/image";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import {
  Eye,
  Edit2,
  Trash2,
  Plus,
  Star,
  Globe,
  Github,
  Code,
  Sparkles,
  Rocket,
  ExternalLink,
} from "lucide-react";

export default function DashboardProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getAll();
      const projectsData = response.data.data || response.data || [];
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    const projectToDelete = projects.find((project) => project.id === id);

    toast(
      (t) => (
        <div
          className={`flex flex-col space-y-4 p-6 rounded-2xl border backdrop-blur-md ${
            theme === "dark"
              ? "bg-slate-800/80 border-purple-500/20 text-white"
              : "bg-white/80 border-purple-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/20">
              <Trash2 className="text-red-500" size={20} />
            </div>
            <div>
              <div className="text-lg font-semibold text-[#f80000] dark:text-white">
                Delete Project?
              </div>
              <div className="text-sm text-[#f80000] dark:text-gray-300">
                Are you sure you want to delete &quot;{projectToDelete?.title}
                &quot;?
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => toast.dismiss(t.id)}
              className={`px-4 py-2 font-medium rounded-xl transition-all duration-200 ${
                theme === "dark"
                  ? "bg-slate-700/50 hover:bg-slate-600/50 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                await handleDeleteConfirm(id);
              }}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
        position: "top-center",
      }
    );
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      await projectAPI.delete(id);
      setProjects(projects.filter((project) => project.id !== id));
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  const toggleFeatured = async (id: string, currentlyFeatured: boolean) => {
    try {
      await projectAPI.update(id, { featured: !currentlyFeatured });
      setProjects(
        projects.map((project) =>
          project.id === id
            ? { ...project, featured: !currentlyFeatured }
            : project
        )
      );
      toast.success(
        currentlyFeatured
          ? "Project removed from featured"
          : "Project featured successfully"
      );
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 animate-spin"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 blur-xl opacity-20 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-purple-50/30 to-slate-50"
      }`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse ${
            theme === "dark" ? "bg-purple-500/20" : "bg-purple-200"
          }`}
        />
        <div
          className={`absolute top-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000 ${
            theme === "dark" ? "bg-pink-500/20" : "bg-pink-200"
          }`}
        />
      </div>

      <div className="relative z-10 space-y-8 p-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-2xl ${
                  theme === "dark"
                    ? "bg-slate-800/50 backdrop-blur-md border border-purple-500/20"
                    : "bg-white/80 backdrop-blur-md border border-purple-200"
                }`}
              >
                <Rocket
                  className="text-purple-600 dark:text-purple-400"
                  size={24}
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Manage Projects
                </h1>
                <p
                  className={`text-sm mt-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Showcase your amazing work
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard/projects/new"
            className="group relative w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl blur transition-all group-hover:blur-md opacity-70"></div>
            <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3.5 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2 font-medium">
              <Plus size={20} />
              Add New Project
            </div>
          </Link>
        </div>

        {projects.length === 0 ? (
          <div
            className={`max-w-2xl mx-auto rounded-2xl border backdrop-blur-md p-8 text-center ${
              theme === "dark"
                ? "bg-slate-800/50 border-purple-500/20"
                : "bg-white/80 border-purple-200"
            }`}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles
                className="text-purple-600 dark:text-purple-400"
                size={40}
              />
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              No projects yet
            </h3>
            <p
              className={`mb-8 max-w-sm mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Start building your portfolio by adding your first project
            </p>
            <Link
              href="/dashboard/projects/new"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 font-medium"
            >
              <Plus size={20} />
              Add Your First Project
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div
              className={`hidden lg:block rounded-2xl border backdrop-blur-md overflow-hidden ${
                theme === "dark"
                  ? "bg-slate-800/50 border-purple-500/20"
                  : "bg-white/80 border-purple-200"
              }`}
            >
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr
                    className={
                      theme === "dark" ? "bg-slate-700/50" : "bg-gray-50/50"
                    }
                  >
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Technologies
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Links
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className={`hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {project.thumbnail && (
                            <div className="relative h-12 w-12 rounded-xl overflow-hidden mr-4">
                              <Image
                                src={project.thumbnail}
                                alt={project.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-semibold mb-1">
                              {project.title}
                            </div>
                            <div className="text-sm opacity-75 line-clamp-2 max-w-md">
                              {project.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() =>
                            toggleFeatured(project.id, project.featured)
                          }
                          className={`px-4 py-1.5 inline-flex items-center gap-2 text-sm font-medium rounded-xl cursor-pointer transition-all duration-200 ${
                            project.featured
                              ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-yellow-500/30"
                              : "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/30"
                          }`}
                        >
                          <Star size={14} />
                          {project.featured ? "Featured" : "Make Featured"}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className={`px-2 py-1 text-xs rounded-md font-medium ${
                                theme === "dark"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span
                              className={`px-2 py-1 text-xs rounded-md font-medium ${
                                theme === "dark"
                                  ? "bg-gray-500/20 text-gray-400"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="space-y-2">
                          {project.liveUrl && (
                            <div className="flex items-center gap-2">
                              <Globe size={14} className="opacity-50" />
                              <span>Live</span>
                            </div>
                          )}
                          {project.githubUrl && (
                            <div className="flex items-center gap-2">
                              <Github size={14} className="opacity-50" />
                              <span>GitHub</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                        <Link
                          href={`/projects/${project.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                          target="_blank"
                        >
                          <Eye size={14} />
                          View
                        </Link>
                        <Link
                          href={`/dashboard/projects/edit/${project.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
                        >
                          <Edit2 size={14} />
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`rounded-2xl border backdrop-blur-md p-6 ${
                    theme === "dark"
                      ? "bg-slate-800/50 border-purple-500/20"
                      : "bg-white/80 border-purple-200"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    {project.thumbnail && (
                      <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3
                          className={`text-lg font-semibold line-clamp-2 flex-1 mr-2 ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {project.title}
                        </h3>
                        <button
                          onClick={() =>
                            toggleFeatured(project.id, project.featured)
                          }
                          className={`px-3 py-1 text-xs font-medium rounded-xl cursor-pointer transition-all ${
                            project.featured
                              ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white"
                              : "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
                          }`}
                        >
                          {project.featured ? "⭐" : "☆"}
                        </button>
                      </div>
                      <p
                        className={`text-sm line-clamp-2 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-xs rounded-md font-medium ${
                          theme === "dark"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span
                        className={`px-2 py-1 text-xs rounded-md font-medium ${
                          theme === "dark"
                            ? "bg-gray-500/20 text-gray-400"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 text-sm mb-4">
                    {project.liveUrl && (
                      <div
                        className={`flex items-center gap-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <Globe size={14} />
                        <span>Live</span>
                      </div>
                    )}
                    {project.githubUrl && (
                      <div
                        className={`flex items-center gap-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <Github size={14} />
                        <span>GitHub</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      href={`/projects/${project.id}`}
                      className={`flex-1 text-center py-2.5 rounded-xl font-medium transition-all duration-200 ${
                        theme === "dark"
                          ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                          : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      }`}
                      target="_blank"
                    >
                      <Eye className="inline mr-1" size={16} />
                      View
                    </Link>
                    <Link
                      href={`/dashboard/projects/edit/${project.id}`}
                      className={`flex-1 text-center py-2.5 rounded-xl font-medium transition-all duration-200 ${
                        theme === "dark"
                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                    >
                      <Edit2 className="inline mr-1" size={16} />
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className={`flex-1 text-center py-2.5 rounded-xl font-medium transition-all duration-200 ${
                        theme === "dark"
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "bg-red-50 text-red-600 hover:bg-red-100"
                      }`}
                    >
                      <Trash2 className="inline mr-1" size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
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
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { projectAPI } from "@/lib/api";
import toast from "react-hot-toast";
import Image from "next/image";
import TagsInput from "@/components/TagaInput";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  Sparkles,
  Globe,
  Github,
  Code,
  Save,
  Upload,
  Tag,
  Rocket,
} from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    liveUrl: "",
    githubUrl: "",
    technologies: [] as string[],
    featured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.title || !formData.description) {
        toast.error("Please fill in title and description");
        return;
      }

      const response = await projectAPI.create(formData);

      if (response.data.success) {
        toast.success("Project created successfully!");
        router.push("/dashboard/projects");
      } else {
        toast.error(response.data.message || "Failed to create project");
      }
    } catch (error: any) {
      console.error("Error creating project:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to create project. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechnologiesChange = (technologies: string[]) => {
    setFormData((prev) => ({
      ...prev,
      technologies,
    }));
  };

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
                  Add New Project
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

          <button
            onClick={() => router.back()}
            className={`group flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              theme === "dark"
                ? "bg-slate-800/50 hover:bg-slate-700/50 text-gray-300"
                : "bg-white/80 hover:bg-gray-100 text-gray-700"
            }`}
          >
            <ArrowLeft size={18} />
            Back to Projects
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`rounded-2xl border backdrop-blur-md p-6 space-y-6 ${
            theme === "dark"
              ? "bg-slate-800/50 border-purple-500/20"
              : "bg-white/80 border-purple-200"
          }`}
        >
          {/* Project Title */}
          <div>
            <label
              htmlFor="title"
              className={`block text-sm font-medium mb-3 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                theme === "dark"
                  ? "bg-slate-900/50 border border-purple-500/30 text-white placeholder-gray-400"
                  : "bg-white/50 border border-purple-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Enter project title"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className={`block text-sm font-medium mb-3 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-vertical ${
                theme === "dark"
                  ? "bg-slate-900/50 border border-purple-500/30 text-white placeholder-gray-400"
                  : "bg-white/50 border border-purple-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Describe your project, technologies used, features, etc."
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label
              htmlFor="thumbnail"
              className={`block text-sm font-medium mb-3 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Upload size={16} />
                Thumbnail URL
              </div>
            </label>
            <input
              type="url"
              id="thumbnail"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                theme === "dark"
                  ? "bg-slate-900/50 border border-purple-500/30 text-white placeholder-gray-400"
                  : "bg-white/50 border border-purple-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="https://example.com/project-image.jpg"
            />
            {formData.thumbnail && (
              <div className="mt-4">
                <p
                  className={`text-sm mb-2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Preview:
                </p>
                <div className="relative h-32 w-32 rounded-xl border border-purple-500/30 overflow-hidden">
                  <Image
                    src={formData.thumbnail}
                    alt="Thumbnail preview"
                    className="object-cover"
                    fill
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Technologies */}
          <div>
            <label
              className={`block text-sm font-medium mb-3 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Code size={16} />
                Technologies *
              </div>
            </label>
            <TagsInput
              tags={formData.technologies}
              onChange={handleTechnologiesChange}
              placeholder="Type and press Enter, Space or Comma to add technologies"
              theme={theme}
            />
            <p
              className={`mt-2 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Press Enter, Space or Comma to add technologies. Click × to
              remove.
            </p>
          </div>

          {/* URLs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="liveUrl"
                className={`block text-sm font-medium mb-3 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  Live Demo URL
                </div>
              </label>
              <input
                type="url"
                id="liveUrl"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  theme === "dark"
                    ? "bg-slate-900/50 border border-purple-500/30 text-white placeholder-gray-400"
                    : "bg-white/50 border border-purple-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="https://your-project.com"
              />
            </div>

            <div>
              <label
                htmlFor="githubUrl"
                className={`block text-sm font-medium mb-3 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Github size={16} />
                  GitHub URL
                </div>
              </label>
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  theme === "dark"
                    ? "bg-slate-900/50 border border-purple-500/30 text-white placeholder-gray-400"
                    : "bg-white/50 border border-purple-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, featured: e.target.checked }))
              }
              className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label
              htmlFor="featured"
              className={`ml-3 block text-sm font-medium ${
                theme === "dark" ? "text-gray-200" : "text-gray-900"
              }`}
            >
              Feature this project on homepage
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="group relative flex-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl blur transition-all group-hover:blur-md opacity-70"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-solid rounded-full animate-spin border-t-transparent"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Create Project
                  </>
                )}
              </div>
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className={`flex-1 px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
                theme === "dark"
                  ? "bg-slate-700/50 hover:bg-slate-600/50 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
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

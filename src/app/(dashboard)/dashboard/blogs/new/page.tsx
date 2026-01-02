/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { blogAPI } from "@/lib/api";
import toast from "react-hot-toast";
import TagsInput from "@/components/TagaInput";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  Sparkles,
  Globe,
  Eye,
  Save,
  Upload,
  Tag,
  Bold,
  Italic,
  Heading,
  List,
  Link,
  Image,
  Code,
  Quote,
  Type,
  Palette,
  AlignLeft,
  EyeOff,
} from "lucide-react";

// Dynamic import for MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export default function NewBlogPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    tags: [] as string[],
    published: false,
    thumbnail: "",
  });
  const [isSlugManual, setIsSlugManual] = useState(false);

  useEffect(() => {
    if (formData.title && !isSlugManual) {
      const generatedSlug = generateSlug(formData.title);
      setFormData((prev) => ({
        ...prev,
        slug: generatedSlug,
      }));
    }
  }, [formData.title, isSlugManual]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.title || !formData.slug || !formData.content) {
        toast.error("Please fill in all required fields");
        return;
      }

      const blogData = {
        ...formData,
        authorId: session?.user?.id,
      };

      const response = await blogAPI.create(blogData);

      if (response.data.success) {
        toast.success("Blog created successfully!");
        router.push("/dashboard/blogs");
      } else {
        toast.error(response.data.message || "Failed to create blog");
      }
    } catch (error: any) {
      console.error("Error creating blog:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to create blog. Please try again.");
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

  const handleContentChange = (value: string | undefined) => {
    setFormData((prev) => ({
      ...prev,
      content: value || "",
    }));
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData((prev) => ({
      ...prev,
      tags,
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = generateSlug(e.target.value);
    setFormData((prev) => ({
      ...prev,
      slug,
    }));

    if (!isSlugManual) {
      setIsSlugManual(true);
    }
  };

  const handleSlugFocus = () => {
    setIsSlugManual(true);
  };

  const resetSlugToAuto = () => {
    setIsSlugManual(false);
    const generatedSlug = generateSlug(formData.title);
    setFormData((prev) => ({
      ...prev,
      slug: generatedSlug,
    }));
  };

  const markdownShortcuts = [
    {
      name: "Heading 1",
      shortcut: "# ",
      description: "Add a main heading",
      icon: <Heading size={16} />,
    },
    {
      name: "Heading 2",
      shortcut: "## ",
      description: "Add a subheading",
      icon: <Heading size={16} />,
    },
    {
      name: "Bold",
      shortcut: "**text**",
      description: "Make text bold",
      icon: <Bold size={16} />,
    },
    {
      name: "Italic",
      shortcut: "*text*",
      description: "Make text italic",
      icon: <Italic size={16} />,
    },
    {
      name: "Link",
      shortcut: "[text](url)",
      description: "Add a hyperlink",
      icon: <Link size={16} />,
    },
    {
      name: "Image",
      shortcut: "![alt](url)",
      description: "Insert an image",
      icon: <Image size={16} />,
    },
    {
      name: "List",
      shortcut: "- item",
      description: "Create a bullet list",
      icon: <List size={16} />,
    },
    {
      name: "Code",
      shortcut: "`code`",
      description: "Inline code",
      icon: <Code size={16} />,
    },
    {
      name: "Blockquote",
      shortcut: "> text",
      description: "Add a quote",
      icon: <Quote size={16} />,
    },
  ];

  const insertMarkdown = (shortcut: string) => {
    const textarea = document.querySelector("#content-editor textarea");
    if (textarea) {
      const start = (textarea as HTMLTextAreaElement).selectionStart;
      const end = (textarea as HTMLTextAreaElement).selectionEnd;
      const text = (textarea as HTMLTextAreaElement).value;
      const before = text.substring(0, start);
      const after = text.substring(end);

      let newText = "";
      if (shortcut.includes("text")) {
        newText = before + shortcut + after;
      } else {
        newText = before + shortcut + (after || "your text");
      }

      handleContentChange(newText);
      setTimeout(() => {
        (textarea as HTMLTextAreaElement).focus();
        const newCursorPos = start + shortcut.length;
        (textarea as HTMLTextAreaElement).setSelectionRange(
          newCursorPos,
          newCursorPos
        );
      }, 0);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 via-purple-50/30 to-slate-50 text-gray-900"
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

      <div className="relative z-10 space-y-8 p-4 max-w-7xl mx-auto">
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
                <Sparkles
                  className="text-purple-600 dark:text-purple-400"
                  size={24}
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Create New Blog
                </h1>
                <p
                  className={`text-sm mt-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Write and publish your blog post with rich formatting
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
            Back to Blogs
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
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className={`block text-sm font-medium mb-3 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Title *
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
              placeholder="Enter blog title"
            />
          </div>

          {/* Slug */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label
                htmlFor="slug"
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  Slug *
                </div>
              </label>
              {isSlugManual && (
                <button
                  type="button"
                  onClick={resetSlugToAuto}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
                >
                  Reset to auto-generate
                </button>
              )}
            </div>
            <input
              type="text"
              id="slug"
              name="slug"
              required
              value={formData.slug}
              onChange={handleSlugChange}
              onFocus={handleSlugFocus}
              className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                theme === "dark"
                  ? "bg-slate-900/50 border border-purple-500/30 text-white placeholder-gray-400"
                  : "bg-white/50 border border-purple-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="URL-friendly slug"
            />
            <p
              className={`mt-2 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              URL:{" "}
              <span className="text-purple-600 dark:text-purple-400">
                /blogs/{formData.slug || "your-slug"}
              </span>
            </p>
          </div>

          {/* Excerpt */}
          <div>
            <label
              htmlFor="excerpt"
              className={`block text-sm font-medium mb-3 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              value={formData.excerpt}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                theme === "dark"
                  ? "bg-slate-900/50 border border-purple-500/30 text-white placeholder-gray-400"
                  : "bg-white/50 border border-purple-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Brief description of your blog post"
            />
          </div>

          {/* Content Editor */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label
                htmlFor="content"
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Content *
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreview(!preview)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    theme === "dark"
                      ? "bg-slate-700/50 hover:bg-slate-600/50 text-gray-300"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {preview ? (
                    <>
                      <EyeOff size={14} />
                      Edit Mode
                    </>
                  ) : (
                    <>
                      <Eye size={14} />
                      Preview Mode
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Markdown Shortcuts */}
            <div
              className={`mb-4 p-4 rounded-xl ${
                theme === "dark"
                  ? "bg-slate-900/50 border border-slate-700"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Type
                  size={16}
                  className="text-purple-600 dark:text-purple-400"
                />
                <span
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Quick Formatting
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {markdownShortcuts.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => insertMarkdown(item.shortcut)}
                    className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                      theme === "dark"
                        ? "bg-slate-800 hover:bg-slate-700 text-gray-300"
                        : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-200"
                    }`}
                    title={`${item.name}: ${item.shortcut}`}
                  >
                    <span
                      className={`p-1 rounded ${
                        theme === "dark" ? "bg-slate-700" : "bg-gray-100"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* MD Editor */}
            <div
              id="content-editor"
              className="border rounded-xl overflow-hidden"
            >
              {typeof window !== "undefined" && (
                <MDEditor
                  value={formData.content}
                  onChange={handleContentChange}
                  height={400}
                  preview={preview ? "preview" : "edit"}
                  visiableDragbar={false}
                  className={`${theme === "dark" ? "dark" : ""}`}
                  data-color-mode={theme === "dark" ? "dark" : "light"}
                  textareaProps={{
                    placeholder:
                      "Write your blog content here using Markdown...",
                  }}
                  previewOptions={{
                    components: {
                      // এটি লিংকগুলোকে নতুন ট্যাবে ওপেন করবে এবং এরর দিবে না
                      a: ({ node, ...props }: any) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                    },
                  }}
                />
              )}
            </div>

            {/* Markdown Guide */}
            <div
              className={`mt-4 p-4 rounded-xl ${
                theme === "dark"
                  ? "bg-slate-900/30 border border-slate-700"
                  : "bg-purple-50 border border-purple-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Palette
                  size={16}
                  className="text-purple-600 dark:text-purple-400"
                />
                <span
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-purple-300" : "text-purple-700"
                  }`}
                >
                  Markdown Cheat Sheet
                </span>
              </div>
              <div
                className={`text-sm grid grid-cols-1 md:grid-cols-2 gap-2 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <div>
                  <code className="bg-slate-800 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                    # Heading 1
                  </code>
                  <span className="ml-2">→ Large heading</span>
                </div>
                <div>
                  <code className="bg-slate-800 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                    ## Heading 2
                  </code>
                  <span className="ml-2">→ Medium heading</span>
                </div>
                <div>
                  <code className="bg-slate-800 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                    **bold**
                  </code>
                  <span className="ml-2">→ Bold text</span>
                </div>
                <div>
                  <code className="bg-slate-800 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                    *italic*
                  </code>
                  <span className="ml-2">→ Italic text</span>
                </div>
                <div>
                  <code className="bg-slate-800 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                    [link](url)
                  </code>
                  <span className="ml-2">→ Hyperlink</span>
                </div>
                <div>
                  <code className="bg-slate-800 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                    ![alt](url)
                  </code>
                  <span className="ml-2">→ Insert image</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label
              className={`block text-sm font-medium mb-3 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Tag size={16} />
                Tags
              </div>
            </label>
            <TagsInput
              tags={formData.tags}
              onChange={handleTagsChange}
              placeholder="Type and press Enter, Space or Comma to add tags"
              theme={theme}
            />
            <p
              className={`mt-2 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Press Enter, Space or Comma to add tags. Click × to remove.
            </p>
          </div>

          {/* Thumbnail */}
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
              placeholder="https://example.com/image.jpg"
            />
            <p
              className={`mt-2 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Tip: Use Unsplash for free images. Example:
              https://images.unsplash.com/photo-...
            </p>
          </div>

          {/* Publish Checkbox */}
          <div
            className={`flex items-center p-4 rounded-xl ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                : "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200"
            }`}
          >
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    published: e.target.checked,
                  }))
                }
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded"
              />
            </div>
            <div className="ml-3">
              <label
                htmlFor="published"
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-200" : "text-gray-900"
                }`}
              >
                Publish immediately
              </label>
              <p
                className={`text-xs mt-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                If unchecked, the blog will be saved as draft
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={loading || !session?.user?.id}
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
                    {formData.published ? "Publish Blog" : "Save as Draft"}
                  </>
                )}
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                if (formData.content || formData.title) {
                  if (
                    confirm("Are you sure? Your unsaved changes will be lost.")
                  ) {
                    router.back();
                  }
                } else {
                  router.back();
                }
              }}
              className={`flex-1 px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
                theme === "dark"
                  ? "bg-slate-700/50 hover:bg-slate-600/50 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className={`sm:flex-1 px-6 py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                theme === "dark"
                  ? "bg-slate-700/50 hover:bg-slate-600/50 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {preview ? (
                <>
                  <AlignLeft size={20} />
                  Edit Mode
                </>
              ) : (
                <>
                  <Eye size={20} />
                  Preview
                </>
              )}
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

        /* Custom scrollbar for the editor */
        .w-md-editor {
          font-family: "Inter", sans-serif !important;
        }

        .w-md-editor-text {
          font-size: 14px !important;
          line-height: 1.6 !important;
        }

        .w-md-editor-preview {
          padding: 20px !important;
        }

        .w-md-editor-toolbar {
          padding: 10px !important;
          border-bottom: 1px solid !important;
        }

        .w-md-editor-toolbar-divider {
          height: 20px !important;
        }
      `}</style>
    </div>
  );
}

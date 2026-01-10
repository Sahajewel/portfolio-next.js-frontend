/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { blogAPI } from "@/lib/api";
import toast from "react-hot-toast";
import TagsInput from "@/components/TagsInput";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  Globe,
  Eye,
  Save,
  EyeOff,
  RefreshCw,
  Bold,
  Italic,
  Heading,
  Link,
} from "lucide-react";
import { BlogCategory } from "@/types";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const { theme } = useTheme();
  const blogId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [language, setLanguage] = useState<"en" | "bn">("en");
  const [isSlugManual, setIsSlugManual] = useState(true); // এডিটের সময় স্লাগ ম্যানুয়াল রাখাই ভালো

  const [formData, setFormData] = useState({
    title: "",
    titleBn: "",
    slug: "",
    content: "",
    contentBn: "",
    excerpt: "",
    excerptBn: "",
    tags: [] as string[],
    category: "JAVASCRIPT" as BlogCategory,
    published: false,
    thumbnail: "",
  });

  // ডাটা ফেচ করা
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await blogAPI.getById(blogId);
        const data = response.data.data || response.data;

        setFormData({
          title: data.title || "",
          titleBn: data.titleBn || "",
          slug: data.slug || "",
          content: data.content || "",
          contentBn: data.contentBn || "",
          excerpt: data.excerpt || "",
          excerptBn: data.excerptBn || "",
          tags: data.tags || [],
          category: data.category || "JAVASCRIPT",
          published: data.published || false,
          thumbnail: data.thumbnail || "",
        });
      } catch (error) {
        toast.error("Failed to load blog");
        router.push("/dashboard/blogs");
      } finally {
        setLoading(false);
      }
    };
    if (blogId) fetchBlog();
  }, [blogId, router]);

  // অটো-স্লাগ (যদি টাইটেল চেঞ্জ করিস এবং অটো মোড অন থাকে)
  useEffect(() => {
    if (formData.title && !isSlugManual) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(formData.title),
      }));
    }
  }, [formData.title, isSlugManual]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const insertMarkdown = (shortcut: string) => {
    const fieldName = language === "en" ? "content" : "contentBn";
    const currentContent = formData[fieldName];
    const textarea = document.querySelector(
      "#content-editor textarea"
    ) as HTMLTextAreaElement;

    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const before = currentContent.substring(0, start);
      const after = currentContent.substring(end);
      const newText = before + shortcut + after;

      setFormData((prev) => ({ ...prev, [fieldName]: newText }));
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + shortcut.length,
          start + shortcut.length
        );
      }, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (!formData.title || !formData.slug || !formData.content) {
        return toast.error("English Title, Slug and Content are required");
      }

      await blogAPI.update(blogId, {
        ...formData,
        authorId: session?.user?.id,
      });

      toast.success("Blog updated successfully!");
      router.push("/dashboard/blogs");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <RefreshCw className="animate-spin text-purple-600" />
      </div>
    );

  return (
    <div
      className={`min-h-screen p-4 ${
        theme === "dark"
          ? "bg-slate-900 text-white"
          : "bg-slate-50 text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Edit Blog Post</h1>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 opacity-70 hover:opacity-100"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`p-6 rounded-2xl border ${
            theme === "dark"
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-slate-200 shadow-sm"
          }`}
        >
          {/* Language Switcher */}
          <div className="flex gap-2 p-1 border-2 border-slate-100 dark:border-slate-700 w-fit rounded-lg mb-6">
            {["en", "bn"].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang as any)}
                className={`px-4 py-2 rounded-md text-sm transition ${
                  language === lang
                    ? "bg-white dark:bg-slate-600 shadow-sm font-bold text-black dark:text-white"
                    : "opacity-50"
                }`}
              >
                {lang === "en" ? "English" : "বাংলা"}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "en"
                  ? "English Title *"
                  : "বাংলা টাইটেল (ঐচ্ছিক)"}
              </label>
              <input
                type="text"
                name={language === "en" ? "title" : "titleBn"}
                value={language === "en" ? formData.title : formData.titleBn}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-500 outline-none dark:bg-slate-900 dark:border-slate-700"
              />
            </div>

            {/* Slug */}
            {language === "en" && (
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Globe size={16} /> URL Slug *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => {
                      setFormData((p) => ({
                        ...p,
                        slug: generateSlug(e.target.value),
                      }));
                      setIsSlugManual(true);
                    }}
                    className="w-full px-4 py-2 rounded-xl border dark:bg-slate-900 dark:border-slate-700 font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSlugManual(!isSlugManual)}
                    className={`text-xs ${
                      !isSlugManual
                        ? "text-purple-500 font-bold"
                        : "text-slate-400"
                    }`}
                  >
                    {isSlugManual ? "Manual" : "Auto"}
                  </button>
                </div>
              </div>
            )}

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "en"
                  ? "Excerpt (SEO Summary)"
                  : "সংক্ষিপ্ত সারমর্ম"}
              </label>
              <textarea
                rows={3}
                name={language === "en" ? "excerpt" : "excerptBn"}
                value={
                  language === "en" ? formData.excerpt : formData.excerptBn
                }
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border dark:bg-slate-900 dark:border-slate-700 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Markdown Editor */}
            <div id="content-editor">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">
                  {language === "en"
                    ? "Content (Markdown) *"
                    : "মূল বিষয়বস্তু (বাংলা)"}
                </label>
                <button
                  type="button"
                  onClick={() => setPreview(!preview)}
                  className="text-xs flex items-center gap-1"
                >
                  {preview ? <EyeOff size={14} /> : <Eye size={14} />}{" "}
                  {preview ? "Edit" : "Preview"}
                </button>
              </div>

              {/* Toolbar */}
              <div className="flex flex-wrap gap-2 mb-2">
                {[
                  { i: <Bold size={14} />, s: "**bold**" },
                  { i: <Italic size={14} />, s: "*italic*" },
                  { i: <Heading size={14} />, s: "## " },
                  { i: <Link size={14} />, s: "[](url)" },
                ].map((btn, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => insertMarkdown(btn.s)}
                    className="p-2 border rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    {btn.i}
                  </button>
                ))}
              </div>

              <div
                className={`w-full rounded-2xl border transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-slate-800/80 border-purple-500/20 text-white"
                    : "bg-white/80 border-purple-200 text-slate-900 shadow-sm"
                }`}
                data-color-mode={theme === "dark" ? "dark" : "light"}
              >
                <div className="p-2">
                  {/* এডিটর */}
                  <MDEditor
                    value={
                      language === "en" ? formData.content : formData.contentBn
                    }
                    onChange={(val) =>
                      setFormData((p) => ({
                        ...p,
                        [language === "en" ? "content" : "contentBn"]:
                          val || "",
                      }))
                    }
                    preview={preview ? "preview" : "edit"}
                    height={400}
                    // ইনলাইন স্টাইল দিয়ে ব্যাকগ্রাউন্ড ট্রান্সপারেন্ট রাখা যাতে তোর ডিভ-এর কালার পায়
                    style={{ backgroundColor: "transparent" }}
                    previewOptions={{
                      className: "prose dark:prose-invert max-w-none",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Meta Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      category: e.target.value as BlogCategory,
                    }))
                  }
                  className="w-full px-4 py-2 rounded-xl border dark:bg-slate-900 dark:border-slate-700"
                >
                  {[
                    "JAVASCRIPT",
                    "REACT",
                    "NEXTJS",
                    "NODEJS",
                    "TYPESCRIPT",
                    "DATABASE",
                  ].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border dark:bg-slate-900 dark:border-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <TagsInput
                tags={formData.tags}
                onChange={(tags) => setFormData((p) => ({ ...p, tags }))}
                theme={theme}
              />
            </div>

            {/* Publish Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, published: e.target.checked }))
                }
              />
              <label htmlFor="published" className="text-sm font-medium">
                Published
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  "Saving Changes..."
                ) : (
                  <>
                    <Save size={20} /> Update Blog
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-4 bg-slate-200 dark:bg-slate-700 rounded-xl font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

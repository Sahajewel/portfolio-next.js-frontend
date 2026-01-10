/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { blogAPI } from "@/lib/api";
import toast from "react-hot-toast";
import TagsInput from "@/components/TagsInput";
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
  Layers,
} from "lucide-react";
import { BlogCategory } from "@/types";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

// আপডেট করা স্লাগ ফাংশন: এটি শুধুমাত্র ইংরেজির উপর ভিত্তি করে স্লাগ বানাবে
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // বাংলা বা বিশেষ ক্যারেক্টার রিমুভ করবে (স্লাগ সাধারণত ইংরেজিতে ভালো হয়)
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export default function NewBlogPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [language, setLanguage] = useState<"en" | "bn">("en");

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

  const [isSlugManual, setIsSlugManual] = useState(false);

  // অটো-স্লাগ জেনারেশন লজিক (শুধুমাত্র ইংরেজি টাইটেল থেকে)
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
    // বাংলা টাইপিং এর সময় সরাসরি আপডেট নিশ্চিত করা
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return toast.error("Please login first");

    setLoading(true);
    try {
      // ভ্যালিডেশন
      if (!formData.title || !formData.slug || !formData.content) {
        toast.error("English Title, Slug and Content are required");
        setLoading(false);
        return;
      }

      const response = await blogAPI.create({
        ...formData,
        authorId: session.user.id,
      });

      if (response.data.success) {
        toast.success("Blog created successfully!");
        router.push("/dashboard/blogs");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // মার্কডাউন শর্টকাট ইনসার্ট করার ফাংশন (বাংলা এবং ইংরেজি দুই কন্টেন্টেই কাজ করবে)
  const insertMarkdown = (shortcut: string) => {
    const fieldName = language === "en" ? "content" : "contentBn";
    const currentContent = formData[fieldName];

    // টেক্সট এরিয়া হ্যান্ডলিং
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
          <h1 className="text-3xl font-bold">Create New Blog</h1>
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
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 rounded-md text-sm transition ${
                language === "en"
                  ? "bg-white  dark:bg-slate-600 shadow-sm font-bold  text-black dark:text-white"
                  : "opacity-50"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage("bn")}
              className={`px-4 py-2 rounded-md text-sm transition ${
                language === "bn"
                  ? "bg-white dark:bg-slate-600 shadow-sm font-bold  text-black dark:text-white"
                  : "opacity-50"
              }`}
            >
              বাংলা
            </button>
          </div>

          <div className="space-y-6">
            {/* Title Input */}
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
                placeholder={
                  language === "en"
                    ? "How to learn React"
                    : "কিভাবে রিঅ্যাক্ট শিখবেন"
                }
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-500 outline-none dark:bg-slate-900 dark:border-slate-700"
              />
            </div>

            {/* Slug - Only shown/edited in English mode or global */}
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
                  {isSlugManual && (
                    <button
                      type="button"
                      onClick={() => setIsSlugManual(false)}
                      className="text-xs text-purple-500 underline"
                    >
                      Auto
                    </button>
                  )}
                </div>
              </div>
            )}
            {/* Excerpt Field */}
            <div>
              <label className="block text-sm font-medium mb-2 opacity-70">
                {language === "en"
                  ? "Excerpt (SEO Summary)"
                  : "সংক্ষিপ্ত সারমর্ম"}
              </label>
              <textarea
                rows={3}
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, excerpt: e.target.value }))
                }
                placeholder={
                  language === "en"
                    ? "Write a short summary..."
                    : "একটি সংক্ষিপ্ত সারমর্ম লিখুন..."
                }
                className={`w-full px-4 py-3 rounded-2xl outline-none border transition-all ${
                  theme === "dark"
                    ? "bg-slate-900 border-slate-700 focus:border-purple-500"
                    : "bg-slate-50 border-slate-200 focus:border-purple-400"
                }`}
              />
            </div>
            {/* Content Editor */}
            <div id="content-editor">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">
                  {language === "en"
                    ? "Content (Markdown) *"
                    : "মূল বিষয়বস্তু (বাংলা)"}
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

              {/* Quick Toolbar */}
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

            {/* Common Fields (Category, Tags, Thumbnail) */}
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
                  <option value="JAVASCRIPT">JavaScript</option>
                  <option value="REACT">React</option>
                  <option value="NEXTJS">Next.js</option>
                  <option value="NODEJS">Node.js</option>
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
                  placeholder="https://images.unsplash.com/..."
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
                Publish immediately
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save size={20} />{" "}
                    {formData.published ? "Publish Blog" : "Save as Draft"}
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

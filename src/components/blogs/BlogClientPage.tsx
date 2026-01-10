// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import { blogAPI } from "@/lib/api";
// import { Blog } from "@/types";
// import Link from "next/link";
// import { useTheme } from "next-themes";
// import {
//   ArrowLeft,
//   Calendar,
//   Tag,
//   Eye,
//   Sparkles,
//   User,
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   Bookmark,
//   MessageCircle,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Copy,
//   Check,
//   Heart,
//   Globe,
// } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import {
//   vscDarkPlus,
//   vs,
// } from "react-syntax-highlighter/dist/esm/styles/prism";
// import toast from "react-hot-toast";
// import Navbar from "@/components/public/Navbar";
// import Footer from "@/components/public/Footer";

// // CodeBlock component for syntax highlighting
// const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
//   const { theme } = useTheme();
//   const match = /language-(\w+)/.exec(className || "");
//   const language = match ? match[1] : "";

//   if (inline) {
//     return (
//       <code
//         className={`bg-gray-100 dark:bg-gray-800/70 px-1 py-0.5 rounded text-sm font-medium ${className}`}
//         {...props}
//       >
//         {children}
//       </code>
//     );
//   }

//   return (
//     <div className="my-6">
//       <SyntaxHighlighter
//         style={theme === "dark" ? vscDarkPlus : vs}
//         language={language}
//         PreTag="div"
//         className="rounded-lg"
//         showLineNumbers
//         lineNumberStyle={{
//           minWidth: "2.5em",
//           color: theme === "dark" ? "#94a3b8" : "#64748b",
//         }}
//         {...props}
//       >
//         {String(children).replace(/\n$/, "")}
//       </SyntaxHighlighter>
//     </div>
//   );
// };

// interface BlogClientPageProps {
//   blog: Blog;
//   allBlogs: Blog[];
// }

// export default function BlogClientPage({
//   blog,
//   allBlogs,
// }: BlogClientPageProps) {
//   const { theme } = useTheme();
//   const [language, setLanguage] = useState<"en" | "bn">("en");

//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [mounted, setMounted] = useState(false);
//   const [blogId, setBlogId] = useState<string>("");
//   const [isSaved, setIsSaved] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [copied, setCopied] = useState(false);
//   const [comments, setComments] = useState<string[]>([]);
//   const [newComment, setNewComment] = useState("");
//   const commentSectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const displayTitle =
//     language === "en" ? blog?.title : blog?.titleBn || blog?.title || "";
//   const displayContent =
//     language === "en" ? blog?.content : blog?.contentBn || blog?.content || "";
//   const displayExcerpt =
//     language === "en" ? blog?.excerpt : blog?.excerptBn || blog?.excerpt || "";

//   const getCurrentBlogIndex = () => blogs.findIndex((b) => b.id === blogId);
//   const getPreviousBlog = () => {
//     const index = getCurrentBlogIndex();
//     return index > 0 ? blogs[index - 1] : null;
//   };
//   const getNextBlog = () => {
//     const index = getCurrentBlogIndex();
//     return index < blogs.length - 1 ? blogs[index + 1] : null;
//   };
//   const getRelatedBlogs = () => {
//     return blogs
//       .filter(
//         (b) =>
//           b.id !== blogId && blog?.tags?.some((tag) => b.tags?.includes(tag))
//       )
//       .slice(0, 3);
//   };

//   const handleShare = async () => {
//     const shareData = {
//       title: displayTitle || "Check out this blog post",
//       text: displayExcerpt || "Interesting read",
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//         toast.success("Shared successfully!");
//       } catch (err) {
//         console.log("Error sharing:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       setCopied(true);
//       toast.success("Link copied to clipboard!");
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const handleSave = () => {
//     const savedBlogs = JSON.parse(localStorage.getItem("savedBlogs") || "[]");
//     if (isSaved) {
//       const newSaved = savedBlogs.filter((id: string) => id !== blogId);
//       localStorage.setItem("savedBlogs", JSON.stringify(newSaved));
//       setIsSaved(false);
//       toast.success("Removed from saved posts");
//     } else {
//       savedBlogs.push(blogId);
//       localStorage.setItem("savedBlogs", JSON.stringify(savedBlogs));
//       setIsSaved(true);
//       toast.success("Saved for later!");
//     }
//   };

//   const handleLike = () => {
//     const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");
//     if (isLiked) {
//       const newLiked = likedBlogs.filter((id: string) => id !== blogId);
//       localStorage.setItem("likedBlogs", JSON.stringify(newLiked));
//       setIsLiked(false);
//       setLikeCount((prev) => prev - 1);
//       toast.success("Removed like");
//     } else {
//       likedBlogs.push(blogId);
//       localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
//       setIsLiked(true);
//       setLikeCount((prev) => prev + 1);
//       toast.success("Liked!");
//     }
//   };

//   const handleAddComment = () => {
//     if (!newComment.trim()) {
//       toast.error("Please enter a comment");
//       return;
//     }
//     const newComments = [...comments, newComment];
//     setComments(newComments);
//     setNewComment("");
//     localStorage.setItem(`comments_${blogId}`, JSON.stringify(newComments));
//     toast.success("Comment added!");
//   };

//   const scrollToComments = () => {
//     commentSectionRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const shareOnSocial = (platform: string) => {
//     const url = encodeURIComponent(window.location.href);
//     const title = encodeURIComponent(displayTitle || "");
//     let shareUrl = "";

//     switch (platform) {
//       case "facebook":
//         shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
//         break;
//       case "twitter":
//         shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
//         break;
//       case "linkedin":
//         shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
//         break;
//     }

//     window.open(shareUrl, "_blank", "width=600,height=400");
//   };

//   if (!mounted || loading) {
//     return (
//       <div
//         className={`min-h-screen flex items-center justify-center ${
//           theme === "dark"
//             ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
//             : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50"
//         }`}
//       >
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl text-gray-900 dark:text-gray-100">
//         Blog not found
//       </div>
//     );
//   }

//   const isDark = theme === "dark";

//   return (
//     <div>
//       <Navbar />

//       <div
//         className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
//           isDark
//             ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-gray-100"
//             : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 text-gray-900"
//         }`}
//       >
//         {/* Animated Background */}
//         <div className="fixed inset-0 opacity-30 pointer-events-none">
//           <div
//             className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse ${
//               isDark ? "bg-purple-600" : "bg-purple-200"
//             }`}
//           />
//           <div
//             className={`absolute top-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000 ${
//               isDark ? "bg-pink-600" : "bg-pink-200"
//             }`}
//           />
//           <div
//             className={`absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000 ${
//               isDark ? "bg-blue-600" : "bg-blue-200"
//             }`}
//           />
//         </div>

//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-20">
//           {/* Back Button */}
//           <Link
//             href="/blogs"
//             className={`inline-flex items-center gap-2 transition-colors mb-8 group ${
//               isDark
//                 ? "text-purple-400 hover:text-purple-300"
//                 : "text-purple-600 hover:text-purple-800"
//             }`}
//           >
//             <ArrowLeft
//               size={18}
//               className="group-hover:-translate-x-1 transition-transform"
//             />
//             Back to All Posts
//           </Link>

//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Main Content */}
//             <div className="lg:w-2/3">
//               <div
//                 className={`rounded-2xl border backdrop-blur-md overflow-hidden ${
//                   isDark
//                     ? "bg-slate-900/50 border-purple-600/30"
//                     : "bg-white/80 border-purple-200"
//                 }`}
//               >
//                 {blog.thumbnail && (
//                   <div className="relative w-full h-64 md:h-96">
//                     <Image
//                       src={blog.thumbnail}
//                       alt={displayTitle || "blog image"}
//                       fill
//                       className="object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//                   </div>
//                 )}

//                 <div className="p-6 md:p-8">
//                   {/* Language Toggle */}
//                   <div className="flex justify-end mb-6">
//                     <button
//                       onClick={() =>
//                         setLanguage((prev) => (prev === "en" ? "bn" : "en"))
//                       }
//                       className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all border font-medium shadow-sm ${
//                         isDark
//                           ? "bg-purple-900/50 border-purple-600/40 text-purple-200 hover:bg-purple-800/60"
//                           : "bg-purple-600/10 border-purple-500/30 text-purple-800 hover:bg-purple-600/20"
//                       }`}
//                     >
//                       <Globe size={18} />
//                       {language === "en" ? "বাংলায় দেখুন" : "View in English"}
//                     </button>
//                   </div>

//                   <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
//                     {displayTitle}
//                   </h1>

//                   {displayExcerpt && (
//                     <p
//                       className={`text-xl mb-8 leading-relaxed ${
//                         isDark ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       {displayExcerpt}
//                     </p>
//                   )}

//                   {/* Metadata */}
//                   <div
//                     className={`flex flex-wrap items-center gap-6 text-sm mb-8 ${
//                       isDark ? "text-gray-400" : "text-gray-600"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       <User size={16} className="text-purple-400" />
//                       <span>{blog.author || "Saha Jewel Kumar"}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Calendar size={16} className="text-purple-400" />
//                       <span>
//                         {new Date(blog.createdAt).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         })}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Clock size={16} className="text-purple-400" />
//                       <span>
//                         {Math.ceil(
//                           (displayContent?.split(" ").length || 0) / 200
//                         )}{" "}
//                         min read
//                       </span>
//                     </div>
//                   </div>

//                   {/* Tags */}
//                   {blog.tags?.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mb-10">
//                       {blog.tags.map((tag, i) => (
//                         <span
//                           key={i}
//                           className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-full font-medium ${
//                             isDark
//                               ? "bg-purple-900/50 text-purple-200 border border-purple-700/40"
//                               : "bg-purple-100 text-purple-800 border border-purple-200"
//                           }`}
//                         >
//                           <Tag size={10} />
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   {/* Main Content - Improved for dark mode */}
//                   <div
//                     className={`prose prose-lg max-w-none ${
//                       isDark ? "prose-invert prose-headings:text-gray-100" : ""
//                     }`}
//                   >
//                     <ReactMarkdown
//                       remarkPlugins={[remarkGfm]}
//                       components={{ code: CodeBlock }}
//                     >
//                       {displayContent}
//                     </ReactMarkdown>
//                   </div>

//                   {/* Action Buttons */}
//                   <div
//                     className={`pt-8 border-t ${
//                       isDark ? "border-gray-800" : "border-gray-200"
//                     }`}
//                   >
//                     <div className="flex flex-wrap items-center justify-between gap-4">
//                       <div className="flex flex-wrap gap-3">
//                         <button
//                           onClick={handleLike}
//                           className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
//                             isLiked
//                               ? "bg-red-600 text-white hover:bg-red-700"
//                               : isDark
//                               ? "bg-slate-800 text-gray-200 hover:bg-slate-700 border border-slate-700"
//                               : "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200"
//                           }`}
//                         >
//                           <Heart
//                             size={18}
//                             fill={isLiked ? "currentColor" : "none"}
//                           />
//                           Like ({likeCount})
//                         </button>

//                         <button
//                           onClick={handleSave}
//                           className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
//                             isSaved
//                               ? "bg-yellow-600 text-white hover:bg-yellow-700"
//                               : isDark
//                               ? "bg-slate-800 text-gray-200 hover:bg-slate-700 border border-slate-700"
//                               : "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200"
//                           }`}
//                         >
//                           <Bookmark
//                             size={18}
//                             fill={isSaved ? "currentColor" : "none"}
//                           />
//                           {isSaved ? "Saved" : "Save"}
//                         </button>

//                         <button
//                           onClick={scrollToComments}
//                           className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
//                             isDark
//                               ? "bg-slate-800 text-gray-200 hover:bg-slate-700 border border-slate-700"
//                               : "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200"
//                           }`}
//                         >
//                           <MessageCircle size={18} />
//                           Comment
//                         </button>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <span
//                           className={isDark ? "text-gray-400" : "text-gray-600"}
//                         >
//                           Share:
//                         </span>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => shareOnSocial("facebook")}
//                             className="p-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
//                             title="Share on Facebook"
//                           >
//                             <Facebook size={16} />
//                           </button>
//                           <button
//                             onClick={() => shareOnSocial("twitter")}
//                             className="p-2.5 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors"
//                             title="Share on Twitter"
//                           >
//                             <Twitter size={16} />
//                           </button>
//                           <button
//                             onClick={() => shareOnSocial("linkedin")}
//                             className="p-2.5 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors"
//                             title="Share on LinkedIn"
//                           >
//                             <Linkedin size={16} />
//                           </button>
//                           <button
//                             onClick={handleShare}
//                             className={`p-2.5 rounded-lg transition-colors ${
//                               isDark
//                                 ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
//                                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                             }`}
//                             title="Copy link"
//                           >
//                             {copied ? <Check size={16} /> : <Copy size={16} />}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Comments Section */}
//                   <div ref={commentSectionRef} className="mt-12">
//                     <h3
//                       className={`text-2xl font-bold mb-6 ${
//                         isDark ? "text-gray-100" : "text-gray-900"
//                       }`}
//                     >
//                       Comments ({comments.length})
//                     </h3>

//                     <div
//                       className={`mb-6 p-4 rounded-xl ${
//                         isDark
//                           ? "bg-slate-900/60 border border-slate-700"
//                           : "bg-gray-50 border border-gray-200"
//                       }`}
//                     >
//                       <textarea
//                         value={newComment}
//                         onChange={(e) => setNewComment(e.target.value)}
//                         placeholder="Add your comment..."
//                         rows={3}
//                         className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
//                           isDark
//                             ? "bg-slate-950 border-slate-700 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
//                             : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
//                         }`}
//                       />
//                       <div className="flex justify-end mt-3">
//                         <button
//                           onClick={handleAddComment}
//                           className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium"
//                         >
//                           Post Comment
//                         </button>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       {comments.map((comment, index) => (
//                         <div
//                           key={index}
//                           className={`p-5 rounded-xl ${
//                             isDark
//                               ? "bg-slate-900/60 border border-slate-700"
//                               : "bg-gray-50 border border-gray-200"
//                           }`}
//                         >
//                           <div className="flex items-center gap-3 mb-3">
//                             <div
//                               className={`w-9 h-9 rounded-full flex items-center justify-center ${
//                                 isDark
//                                   ? "bg-purple-900/60 text-purple-300"
//                                   : "bg-purple-100 text-purple-700"
//                               }`}
//                             >
//                               <User size={16} />
//                             </div>
//                             <span
//                               className={
//                                 isDark
//                                   ? "text-gray-300 font-medium"
//                                   : "text-gray-800 font-medium"
//                               }
//                             >
//                               Anonymous User
//                             </span>
//                           </div>
//                           <p
//                             className={
//                               isDark
//                                 ? "text-gray-200 leading-relaxed"
//                                 : "text-gray-800 leading-relaxed"
//                             }
//                           >
//                             {comment}
//                           </p>
//                         </div>
//                       ))}

//                       {comments.length === 0 && (
//                         <div
//                           className={`text-center py-10 rounded-xl ${
//                             isDark
//                               ? "bg-slate-900/40 border border-dashed border-slate-700"
//                               : "bg-gray-50 border border-dashed border-gray-300"
//                           }`}
//                         >
//                           <MessageCircle
//                             className={`mx-auto mb-3 ${
//                               isDark ? "text-gray-500" : "text-gray-400"
//                             }`}
//                             size={36}
//                           />
//                           <p
//                             className={
//                               isDark ? "text-gray-400" : "text-gray-500"
//                             }
//                           >
//                             No comments yet. Be the first to comment!
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Navigation - Previous & Next */}
//               <div
//                 className={`mt-8 flex justify-between items-center p-5 rounded-xl ${
//                   isDark
//                     ? "bg-slate-900/50 border border-slate-700"
//                     : "bg-gray-50 border border-gray-200"
//                 }`}
//               >
//                 {getPreviousBlog() ? (
//                   <Link
//                     href={`/blogs/${getPreviousBlog()?.id}`}
//                     className="group flex-1 max-w-xs"
//                   >
//                     <div
//                       className={`p-4 rounded-lg transition-all group-hover:scale-[1.02] ${
//                         isDark
//                           ? "bg-slate-800/80 hover:bg-slate-700"
//                           : "bg-white hover:bg-gray-100 border border-gray-200"
//                       }`}
//                     >
//                       <div className="flex items-center gap-2 text-sm text-purple-400 mb-2">
//                         <ChevronLeft size={16} />
//                         Previous Post
//                       </div>
//                       <p
//                         className={`font-medium line-clamp-2 ${
//                           isDark ? "text-gray-200" : "text-gray-900"
//                         }`}
//                       >
//                         {getPreviousBlog()?.title}
//                       </p>
//                     </div>
//                   </Link>
//                 ) : (
//                   <div className="flex-1" />
//                 )}

//                 <div className="px-6 text-center">
//                   <span className={isDark ? "text-gray-400" : "text-gray-600"}>
//                     {getCurrentBlogIndex() + 1} of {blogs.length}
//                   </span>
//                 </div>

//                 {getNextBlog() ? (
//                   <Link
//                     href={`/blogs/${getNextBlog()?.id}`}
//                     className="group flex-1 max-w-xs text-right"
//                   >
//                     <div
//                       className={`p-4 rounded-lg transition-all group-hover:scale-[1.02] ${
//                         isDark
//                           ? "bg-slate-800/80 hover:bg-slate-700"
//                           : "bg-white hover:bg-gray-100 border border-gray-200"
//                       }`}
//                     >
//                       <div className="flex items-center justify-end gap-2 text-sm text-purple-400 mb-2">
//                         Next Post
//                         <ChevronRight size={16} />
//                       </div>
//                       <p
//                         className={`font-medium line-clamp-2 ${
//                           isDark ? "text-gray-200" : "text-gray-900"
//                         }`}
//                       >
//                         {getNextBlog()?.title}
//                       </p>
//                     </div>
//                   </Link>
//                 ) : (
//                   <div className="flex-1" />
//                 )}
//               </div>
//             </div>

//             {/* Sidebar */}
//             <div className="lg:w-1/3">
//               <div
//                 className={`sticky top-24 rounded-2xl border backdrop-blur-md overflow-hidden ${
//                   isDark
//                     ? "bg-slate-900/50 border-purple-600/30"
//                     : "bg-white/80 border-purple-200"
//                 }`}
//               >
//                 <div className="p-6 border-b">
//                   <h3
//                     className={`text-xl font-bold flex items-center gap-2 ${
//                       isDark ? "text-gray-100" : "text-gray-900"
//                     }`}
//                   >
//                     <Sparkles size={20} className="text-purple-400" />
//                     Related Posts
//                   </h3>
//                 </div>

//                 <div className="p-5 space-y-4">
//                   {getRelatedBlogs().length > 0 ? (
//                     getRelatedBlogs().map((relatedBlog) => (
//                       <Link
//                         key={relatedBlog.id}
//                         href={`/blogs/${relatedBlog.id}`}
//                         className={`block p-4 rounded-xl transition-all hover:scale-[1.02] ${
//                           isDark
//                             ? "hover:bg-slate-800/60 border border-slate-700"
//                             : "hover:bg-gray-100 border border-gray-200"
//                         }`}
//                       >
//                         <h4
//                           className={`font-semibold mb-2 line-clamp-2 ${
//                             isDark ? "text-gray-200" : "text-gray-900"
//                           }`}
//                         >
//                           {relatedBlog.title}
//                         </h4>
//                         <div className="flex items-center gap-4 text-sm">
//                           <span
//                             className={
//                               isDark ? "text-gray-400" : "text-gray-600"
//                             }
//                           >
//                             {new Date(
//                               relatedBlog.createdAt
//                             ).toLocaleDateString()}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Eye size={12} className="text-purple-400" />
//                             <span
//                               className={
//                                 isDark ? "text-gray-400" : "text-gray-600"
//                               }
//                             >
//                               {relatedBlog.views || 0}
//                             </span>
//                           </span>
//                         </div>
//                       </Link>
//                     ))
//                   ) : (
//                     <div
//                       className={`text-center py-8 rounded-xl ${
//                         isDark
//                           ? "bg-slate-900/40 border border-dashed border-slate-700"
//                           : "bg-gray-50 border border-dashed border-gray-300"
//                       }`}
//                     >
//                       <Sparkles
//                         className={`mx-auto mb-3 ${
//                           isDark ? "text-gray-500" : "text-gray-400"
//                         }`}
//                         size={28}
//                       />
//                       <p className={isDark ? "text-gray-400" : "text-gray-500"}>
//                         No related posts found
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-5 border-t">
//                   <Link
//                     href="/blogs"
//                     className={`block w-full text-center py-3 rounded-lg font-medium transition-all ${
//                       isDark
//                         ? "bg-purple-900/50 text-purple-200 hover:bg-purple-800/60 border border-purple-700/40"
//                         : "bg-purple-100 text-purple-800 hover:bg-purple-200 border border-purple-300"
//                     }`}
//                   >
//                     View All Posts
//                   </Link>
//                 </div>
//               </div>

//               {/* Popular Tags */}
//               {blog.tags?.length > 0 && (
//                 <div
//                   className={`mt-8 rounded-2xl border backdrop-blur-md overflow-hidden ${
//                     isDark
//                       ? "bg-slate-900/50 border-purple-600/30"
//                       : "bg-white/80 border-purple-200"
//                   }`}
//                 >
//                   <div className="p-6 border-b">
//                     <h3
//                       className={`text-xl font-bold flex items-center gap-2 ${
//                         isDark ? "text-gray-100" : "text-gray-900"
//                       }`}
//                     >
//                       <Tag size={20} className="text-purple-400" />
//                       Popular Tags
//                     </h3>
//                   </div>

//                   <div className="p-6">
//                     <div className="flex flex-wrap gap-2">
//                       {blog.tags.map((tag, i) => (
//                         <span
//                           key={i}
//                           className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg font-medium ${
//                             isDark
//                               ? "bg-purple-900/50 text-purple-200 border border-purple-700/40"
//                               : "bg-purple-100 text-purple-800 border border-purple-200"
//                           }`}
//                         >
//                           <Tag size={12} />
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

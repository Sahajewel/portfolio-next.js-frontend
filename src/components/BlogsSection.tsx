// ✅ SERVER COMPONENT — data props নেয়
import Image from "next/image";
import Link from "next/link";
import { User, Clock, Book, ArrowRight, BookOpen } from "lucide-react";
import { Blog } from "@/types";

interface Props {
  blogs: Blog[];
}

export default function BlogsSection({ blogs }: Props) {
  return (
    <section
      id="blogs"
      className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Latest Blogs
            </span>
          </h2>
          <p className="text-gray-300">
            Thoughts and tutorials I&apos;ve shared
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-300">
              No blogs available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="group rounded-2xl overflow-hidden border transition-all hover:scale-105 hover:shadow-2xl flex flex-col h-full bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20"
              >
                <div className="relative overflow-hidden h-48 flex-shrink-0">
                  <Image
                    src={
                      blog.thumbnail ||
                      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop"
                    }
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    height={400}
                    width={400}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-80" />
                </div>

                <div className="p-6 space-y-4 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <div className="flex items-center justify-between text-sm mb-3 text-gray-300">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span className="line-clamp-1">
                          {typeof blog.author === "string"
                            ? blog.author
                            : "Admin"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span className="whitespace-nowrap">
                          {Math.ceil(
                            (blog.content?.split(" ").length || 0) / 200,
                          )}{" "}
                          min
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm leading-relaxed line-clamp-3 mb-4 text-gray-300">
                      {blog.excerpt ||
                        blog.content?.substring(0, 150) ||
                        "Read more about this topic..."}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {(blog.tags || [])
                        .slice(0, 3)
                        .map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded text-xs border bg-purple-500/20 text-purple-300 border-purple-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      {(blog.tags || []).length > 3 && (
                        <span className="px-2 py-1 rounded text-xs border bg-purple-500/20 text-purple-300 border-purple-500/30">
                          +{blog.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ✅ Link — instant client navigation, no reload */}
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="w-full mt-auto px-4 py-2.5 text-purple-400 font-semibold rounded-lg hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Book size={16} /> Read More
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/blogs"
            prefetch={true}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/10 transition-all"
          >
            <BookOpen size={20} /> View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}

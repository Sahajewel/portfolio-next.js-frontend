import { notFound } from "next/navigation";
import Image from "next/image";
import { blogAPI } from "@/lib/api";
import { Blog } from "@/types";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  try {
    const response = await blogAPI.getAll();
    const blogs: Blog[] = response.data.data || response.data || [];

    return blogs.map((blog) => ({
      id: blog.id,
    }));
  } catch (error) {
    return [];
  }
}

export const revalidate = 3600;

async function getBlog(id: string): Promise<Blog | null> {
  try {
    const response = await blogAPI.getById(id);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export default async function BlogPage({ params }: PageProps) {
  const blog = await getBlog(params.id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        {blog.thumbnail && (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="p-8">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <span>
                By{" "}
                {typeof blog.author === "string"
                  ? blog.author
                  : blog.author?.name || "Admin"}
              </span>
              <span>•</span>
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{blog.views} views</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {blog.excerpt && (
              <p className="text-lg text-gray-600 italic">{blog.excerpt}</p>
            )}
          </header>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>
    </div>
  );
}

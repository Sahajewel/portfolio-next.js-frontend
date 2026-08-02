// app/blogs/[id]/page.tsx
// SERVER COMPONENT — this is the piece that was missing.
// Metadata (title, description, Open Graph, Twitter card) can only be
// generated from a Server Component. Your old blogs/[id]/page.tsx had
// "use client" at the top, so Next.js silently ignored any metadata you
// tried to add there — every blog post was sharing the generic root
// layout title instead of its own. This file fixes that.

import type { Metadata } from "next";
import { blogAPI } from "@/lib/api";
import BlogDetailClient from "@/components/blogs/BlogDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Runs on the server, per-request (or per revalidation window), and
// Next.js automatically injects the result into <head> before the page
// is sent to the browser — so Google, LinkedIn, and Twitter previews all
// see the correct title/description/image for THIS specific post.
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await blogAPI.getById(id);
    const blog = res.data.data || res.data;

    if (!blog) {
      return {
        title: "Blog Post Not Found | Saha Jewel Kumar",
      };
    }

    const description =
      blog.excerpt ||
      blog.content?.substring(0, 155) ||
      "Read this article on web development by Saha Jewel Kumar.";

    const url = `https://sahajewelkumar.vercel.app/blogs/${id}`;
    const image =
      blog.thumbnail || "https://sahajewelkumar.vercel.app/og-image.png";

    return {
      title: `${blog.title} | Saha Jewel Kumar`,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: blog.title,
        description,
        url,
        type: "article",
        publishedTime: blog.createdAt,
        authors: [blog.author || "Saha Jewel Kumar"],
        tags: blog.tags || [],
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description,
        images: [image],
      },
    };
  } catch (error) {
    console.error("Error generating blog metadata:", error);
    return {
      title: "Blog | Saha Jewel Kumar",
    };
  }
}

// The page itself just resolves the id and hands off to the client
// component, which keeps all your existing interactivity (like, save,
// comments, language toggle, share buttons) exactly as it was.
export default async function BlogPage({ params }: PageProps) {
  const { id } = await params;
  return <BlogDetailClient blogId={id} />;
}

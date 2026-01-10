// app/blogs/page.tsx
import type { Metadata } from "next";

import { blogAPI } from "@/lib/api";
import BlogsClient from "@/components/blogs/BlogsClient";

export const metadata: Metadata = {
  title: "Blog | Saha Jewel Kumar",
  description:
    "Read blogs on JavaScript, TypeScript, React, Next.js, Node.js, and web development by Saha Jewel Kumar.",
  openGraph: {
    title: "Blog | Saha Jewel Kumar",
    url: "https://sahajewelkumar.vercel.app/blogs",
    images: [
      {
        url: "https://sahajewelkumar.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function BlogsPage() {
  const res = await blogAPI.getAll();
  const blogs = res.data.data || res.data || [];

  return <BlogsClient blogs={blogs} />;
}

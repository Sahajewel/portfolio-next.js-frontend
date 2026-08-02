// app/projects/[id]/page.tsx
// SERVER COMPONENT — same fix as blogs/[id]/page.tsx. The old file had
// "use client" at the top, so any metadata added there was silently
// ignored by Next.js. This file generates real per-project title,
// description, and Open Graph image so each project has its own
// search-engine and social-share preview instead of the generic default.

import type { Metadata } from "next";
import { projectAPI } from "@/lib/api";
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await projectAPI.getById(id);
    const project = res.data.data || res.data;

    if (!project) {
      return {
        title: "Project Not Found | Saha Jewel Kumar",
      };
    }

    const description =
      project.description?.substring(0, 155) ||
      "A full-stack web development project by Saha Jewel Kumar.";

    const url = `https://sahajewelkumar.vercel.app/projects/${id}`;
    const image =
      project.thumbnail || "https://sahajewelkumar.vercel.app/og-image.png";

    return {
      title: `${project.title} | Saha Jewel Kumar`,
      description,
      keywords: project.technologies || [],
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: project.title,
        description,
        url,
        type: "website",
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: project.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: project.title,
        description,
        images: [image],
      },
    };
  } catch (error) {
    console.error("Error generating project metadata:", error);
    return {
      title: "Projects | Saha Jewel Kumar",
    };
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  return <ProjectDetailClient projectId={id} />;
}

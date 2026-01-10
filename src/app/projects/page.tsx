// app/projects/page.tsx
import ProjectsClient from "@/components/projects/ProjectsClient";
import { projectAPI } from "@/lib/api";
import { Project } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Saha Jewel Kumar",
  description:
    "Explore full-stack, React, Next.js, and MERN projects built by Saha Jewel Kumar.",
  keywords: [
    "Full Stack Projects",
    "MERN Projects",
    "Next.js Portfolio",
    "React Developer Projects",
  ],
  openGraph: {
    title: "Projects | Saha Jewel Kumar",
    description: "A collection of professional web development projects.",
    url: "https://sahajewelkumar.vercel.app/projects",
    images: [
      {
        url: "https://sahajewelkumar.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saha Jewel Kumar Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Saha Jewel Kumar",
    description: "Web development projects by Saha Jewel Kumar",
    images: ["https://sahajewelkumar.vercel.app/og-image.png"],
  },
};
export default async function ProjectsPage() {
  const res = await projectAPI.getAll();
  const projects: Project[] = res.data.data || res.data || [];

  return <ProjectsClient projects={projects} />;
}

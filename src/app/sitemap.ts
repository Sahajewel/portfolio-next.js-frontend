/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/sitemap.ts
// Next.js auto-detects this file and serves it at /sitemap.xml
//
// UPDATED: now dynamically pulls every blog post AND project from the
// API and gives each one its own sitemap entry. Before, only the
// /blogs and /projects LISTING pages were in the sitemap — Google could
// see "there's a blogs page" but had no direct signal that 45 individual
// articles exist underneath it. Now each post/project is its own
// discoverable URL with its own lastModified date, which matters more
// for indexing than the `priority` number does.
//
// This also means you never have to touch this file again as you keep
// publishing — every new post picked up automatically on the next
// sitemap request.
import { MetadataRoute } from "next";
import { blogAPI, projectAPI } from "@/lib/api";

const BASE_URL = "https://sahajewelkumar.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily", // you post often — tell Google to recrawl often
      priority: 0.8,
    },
  ];

  // Fetch blogs and projects in parallel so one slow request doesn't
  // block the other. Wrapped in try/catch per-source so if one API is
  // briefly down, the sitemap still returns the static entries + the
  // other source instead of failing completely.
  const [blogEntries, projectEntries] = await Promise.all([
    fetchBlogEntries(),
    fetchProjectEntries(),
  ]);

  return [...staticEntries, ...projectEntries, ...blogEntries];
}

async function fetchBlogEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await blogAPI.getAll();
    const blogs = res.data?.data || res.data || [];

    return blogs.map((post: any) => ({
      url: `${BASE_URL}/blogs/${post.id}`,
      lastModified: post.updatedAt || post.createdAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("sitemap: failed to fetch blogs", error);
    return [];
  }
}

async function fetchProjectEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await projectAPI.getAll();
    const projects = res.data?.data || res.data || [];

    return projects.map((project: any) => ({
      url: `${BASE_URL}/projects/${project.id}`,
      lastModified: project.updatedAt || project.createdAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7, // slightly above blog posts — projects are your strongest proof-of-skill content
    }));
  } catch (error) {
    console.error("sitemap: failed to fetch projects", error);
    return [];
  }
}

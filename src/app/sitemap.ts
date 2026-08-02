// src/app/sitemap.ts
// Next.js auto-detects this file and serves it at /sitemap.xml
// This tells Google exactly which pages exist and how important/fresh each is.
import { MetadataRoute } from "next";

const BASE_URL = "https://sahajewelkumar.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1, // homepage = highest priority
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
      changeFrequency: "daily", // you post often, tell Google to recrawl often
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // TODO: once you have a way to list all blog post slugs / project slugs
    // from your DB, loop over them here so each individual post/project
    // gets its own sitemap entry too — that's what gets individual blog
    // posts actually indexed and ranked, not just the /blogs listing page.
    // Example:
    //
    // const posts = await blogAPI.getAll();
    // const blogEntries = posts.data.data.map((post) => ({
    //   url: `${BASE_URL}/blogs/${post.id}`,
    //   lastModified: post.updatedAt,
    //   changeFrequency: "monthly" as const,
    //   priority: 0.5,
    // }));
    // return [...staticEntries, ...blogEntries];
  ];
}

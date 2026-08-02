// src/app/robots.ts
// Next.js auto-detects this and serves it at /robots.txt
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Don't let Google index admin/dashboard/login pages — no SEO value,
      // and you don't want your dashboard showing up in search results.
      disallow: ["/dashboard", "/login", "/api"],
    },
    sitemap: "https://sahajewelkumar.vercel.app/sitemap.xml",
  };
}

/* eslint-disable react/no-unescaped-entities */
// ✅ SERVER COMPONENT — "use client" নেই
// Data build time-এ fetch হয়, browser-এ কোনো waterfall নেই

import { blogAPI, projectAPI } from "@/lib/api";
import { Blog, Project } from "@/types";

// Client Components

import NavBar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import {
  AboutSection,
  AchievementsSection,
  EducationSection,
  ExperienceSection,
  PhilosophySection,
  SkillsSection,
} from "@/components/Staticsections ";
import ProjectsSection from "@/components/Projectssection";
import BlogsSection from "@/components/BlogsSection";
import ContactSection from "@/components/ContactSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";

// ✅ ISR — প্রতি 60 সেকেন্ডে নতুন data fetch করবে
export const revalidate = 60;

export default async function PortfolioPage() {
  // ✅ Server-এ fetch হয় — browser-এ কোনো loading spinner নেই
  let featuredProjects: Project[] = [];
  let featuredBlogs: Blog[] = [];

  try {
    const [projectsResponse, blogsResponse] = await Promise.all([
      projectAPI.getAll(),
      blogAPI.getAll(),
    ]);
    const projects = (projectsResponse.data?.data || []) as Project[];
    const blogs = (blogsResponse.data?.data || []) as Blog[];
    featuredProjects = projects.slice(0, 3);
    featuredBlogs = blogs.slice(0, 3);
  } catch (error) {
    console.error("Server fetch error:", error);
    // Error হলে empty array — page তবুও render হবে
  }

  return (
    <main className="min-h-screen relative overflow-hidden transition-colors duration-300">
      {/* Animated gradient blobs — client component (theme aware) */}
      <AnimatedBackground />

      {/* Navbar — client (theme toggle, session, mobile menu) */}
      <NavBar />

      {/* ── Sections ── */}
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />

      {/* Data props server থেকে pass হচ্ছে — no client fetch */}
      <ProjectsSection projects={featuredProjects} />
      <BlogsSection blogs={featuredBlogs} />

      <AchievementsSection />
      <PhilosophySection />
      <ContactSection />
      <Footer />
    </main>
  );
}

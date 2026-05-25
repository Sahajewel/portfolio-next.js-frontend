"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  Download,
  Code,
  Briefcase,
  Award,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

export default function HeroSection() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const throttle = useRef(false);

  const handleMouse = useCallback((e: MouseEvent) => {
    if (!throttle.current) {
      throttle.current = true;
      setTimeout(() => {
        setMouse({ x: e.clientX, y: e.clientY });
        throttle.current = false;
      }, 32);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [handleMouse]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Cursor glow */}
      <div
        className={`fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-screen ${dark ? "bg-purple-500/30" : "bg-purple-400/20"}`}
        style={{
          left: mouse.x - 12,
          top: mouse.y - 12,
          transition: "left 0.05s, top 0.05s",
        }}
      />

      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 pt-16 pb-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className={`space-y-6 ${dark ? "text-white" : "text-gray-900"}`}>
            <div className="inline-flex mt-5 items-center gap-2 px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 font-semibold text-sm animate-bounce text-purple-300">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500" />
              </span>
              Exploring New Frontiers
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span
                className={`block mb-2 ${dark ? "text-gray-300" : "text-gray-600"}`}
              >
                Hi, I&apos;m
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Saha Jewel Kumar
              </span>
            </h1>

            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full" />
              <h2
                className={`text-xl md:text-2xl font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}
              >
                Full Stack Developer | MERN Stack & Next.js
              </h2>
            </div>

            <p
              className={`text-lg leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`}
            >
              I specialize in developing modern web applications using the MERN
              stack and Next.js, focusing on clean architecture, robust backend
              systems, and intuitive frontend experiences.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Saha_Jewel_Resume.pdf"
              >
                <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center gap-2">
                  <Download size={20} className="group-hover:animate-bounce" />
                  Download Resume
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className={`px-8 py-4 border-2 border-purple-500 rounded-full font-semibold transition-all backdrop-blur-sm flex items-center gap-2 ${dark ? "hover:bg-purple-500/20 text-white" : "hover:bg-purple-50 text-purple-600"}`}
              >
                <MessageSquare size={20} /> Let&apos;s Talk
              </button>
            </div>

            {/* Social */}
            <div className="flex gap-4 pt-4">
              {[
                {
                  icon: Github,
                  href: "https://github.com/Sahajewel",
                  color: dark ? "hover:bg-purple-600" : "hover:bg-purple-100",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/sahajewelkumar",
                  color: dark ? "hover:bg-blue-600" : "hover:bg-blue-100",
                },
                {
                  icon: Mail,
                  href: "mailto:jewelsaha072@email.com",
                  color: dark ? "hover:bg-pink-600" : "hover:bg-pink-100",
                },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full ${s.color} transition-all transform hover:scale-110 hover:shadow-lg border ${dark ? "bg-slate-800/50 backdrop-blur-sm border-white/10" : "bg-white/50 backdrop-blur-sm border-gray-200"}`}
                >
                  <s.icon
                    size={24}
                    className={dark ? "text-white" : "text-gray-700"}
                  />
                </a>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-6 text-sm">
              {[
                {
                  icon: Code,
                  bg: dark ? "bg-purple-500/20" : "bg-purple-100",
                  ic: "text-purple-400",
                  label: "Stack Focus",
                  val: "MERN · Next.js · TypeScript · Prisma",
                },
                {
                  icon: Briefcase,
                  bg: dark ? "bg-pink-500/20" : "bg-pink-100",
                  ic: "text-pink-400",
                  label: "Experience",
                  val: "2+ Years",
                },
                {
                  icon: Award,
                  bg: dark ? "bg-blue-500/20" : "bg-blue-100",
                  ic: "text-blue-400",
                  label: "Projects",
                  val: "10+ Completed",
                },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg}`}
                  >
                    <stat.icon size={16} className={stat.ic} />
                  </div>
                  <div>
                    <p className={dark ? "text-gray-300" : "text-gray-600"}>
                      {stat.label}
                    </p>
                    <p className="font-semibold">{stat.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — profile image */}
          <div className="relative">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 animate-spin-slow">
                <div
                  className={`absolute top-0 left-1/2 w-4 h-4 rounded-full -translate-x-1/2 shadow-lg ${dark ? "bg-purple-500 shadow-purple-500/50" : "bg-purple-300 shadow-purple-300/50"}`}
                />
              </div>
              <div className="absolute inset-0 animate-spin-slow animation-delay-2000">
                <div
                  className={`absolute bottom-0 left-1/2 w-4 h-4 rounded-full -translate-x-1/2 shadow-lg ${dark ? "bg-pink-500 shadow-pink-500/50" : "bg-pink-300 shadow-pink-300/50"}`}
                />
              </div>
              <div className="absolute inset-0 animate-spin-slow animation-delay-4000">
                <div
                  className={`absolute top-1/2 right-0 w-4 h-4 rounded-full -translate-y-1/2 shadow-lg ${dark ? "bg-blue-500 shadow-blue-500/50" : "bg-blue-300 shadow-blue-300/50"}`}
                />
              </div>
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-1 animate-pulse">
                <div
                  className={`w-full h-full rounded-full overflow-hidden border-4 ${dark ? "bg-slate-900 border-slate-900" : "bg-white border-white"}`}
                >
                  {/* ✅ priority — LCP image, eagerly loaded */}
                  <Image
                    src="/saha.png"
                    alt="Saha Jewel Kumar"
                    className="w-full h-full object-cover"
                    width={400}
                    height={400}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-purple-400" />
        </div>
      </section>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}

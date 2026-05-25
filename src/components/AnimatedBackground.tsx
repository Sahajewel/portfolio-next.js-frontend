"use client";
import { useTheme } from "next-themes";

export default function AnimatedBackground() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <>
      {/* Theme-aware gradient blobs */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse ${dark ? "bg-purple-500" : "bg-purple-200"}`}
        />
        <div
          className={`absolute top-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000 ${dark ? "bg-pink-500" : "bg-pink-200"}`}
        />
        <div
          className={`absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000 ${dark ? "bg-blue-500" : "bg-blue-200"}`}
        />
      </div>

      {/* Root div theme class — body background */}
      <style jsx global>{`
        body {
          background: ${dark
            ? "linear-gradient(135deg, #0f172a, #4a1d96, #0f172a)"
            : "linear-gradient(135deg, #f8fafc, #f5f3ff, #f8fafc)"};
          color: ${dark ? "#fff" : "#111827"};
          transition:
            background 0.3s,
            color 0.3s;
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

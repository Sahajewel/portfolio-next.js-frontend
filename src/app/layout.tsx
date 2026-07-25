// app/layout.tsx
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import SessionProvider from "@/components/public/SessionProvider";
import LayoutWrapper from "@/components/LayoutWrapper";
import { ThemeProvider } from "next-themes";

// display: "swap" prevents invisible-text flash while font loads (small FOUT fix)
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Saha Jewel Kumar – Full Stack Developer | MERN & Next.js",
    template: "%s | Saha Jewel Kumar",
  },

  description:
    "Full Stack Developer specializing in MERN stack, Next.js, TypeScript, Prisma, and PostgreSQL. Building scalable, high-performance web applications. Based in Japan.",

  keywords: [
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "JavaScript",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "Web Developer in Japan",
  ],

  icons: {
    icon: "/favicon.ico",
  },

  metadataBase: new URL("https://sahajewelkumar.vercel.app"),

  openGraph: {
    title: "Saha Jewel Kumar – Full Stack Developer",
    description:
      "Full Stack Developer specializing in MERN stack, Next.js, TypeScript, Prisma, and PostgreSQL. Building scalable, high-performance web applications.",
    url: "https://sahajewelkumar.vercel.app",
    siteName: "Saha Jewel Kumar",
    images: [
      {
        url: "https://sahajewelkumar.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saha Jewel Kumar – Full Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Saha Jewel Kumar – Full Stack Developer",
    description:
      "Full Stack Developer specializing in MERN stack, Next.js, TypeScript, Prisma, and PostgreSQL.",
    images: ["https://sahajewelkumar.vercel.app/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

// Separate viewport export (Next.js 14+ requirement) — also disables
// automatic zoom-jank on mobile inputs which can feel like "slow" UI.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Speed up first connection to your image CDN(s) — shaves ~100-300ms
            off the first hero/project image request */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* refetchOnWindowFocus/refetchInterval off: next-auth's default
              SessionProvider polls + refetches on every tab focus, which
              re-renders your whole tree (including the portfolio page)
              every time the user tabs back in. Not needed for a public
              portfolio site. */}
          <SessionProvider refetchOnWindowFocus={false} refetchInterval={0}>
            <LayoutWrapper>{children}</LayoutWrapper>

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#363636",
                  color: "#ffffff",
                },
              }}
            />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

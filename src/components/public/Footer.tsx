import React from "react";
import {
  BookOpen,
  Code,
  Github,
  Heart,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";

interface FooterProps {
  theme?: string;
}

export const Footer = ({ theme = "dark" }: FooterProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/Sahajewel", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/sahajewelkumar",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:jewelsaha072@email.com", label: "Email" },
  ];

  const quickLinks = ["About", "Projects", "Blogs", "Contact"];

  return (
    <footer
      className={`relative z-10 py-12 border-t ${
        theme === "dark"
          ? "bg-slate-900/80 backdrop-blur-sm border-purple-500/20"
          : "bg-white/80 backdrop-blur-sm border-purple-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
              <Sparkles className="text-purple-500" size={24} /> Portfolio
            </h3>
            <p
              className={`leading-relaxed text-sm mb-4 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Building exceptional digital experiences with passion and
              precision. Let&apos;s create something amazing together.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Code size={16} className="text-purple-400" />
              <span>Crafted with</span>
              <Heart
                size={14}
                className="text-red-500 animate-pulse"
                fill="currentColor"
              />
              <span>using React & Next.js</span>
            </div>
          </div>

          <div>
            <h4
              className={`font-semibold mb-4 text-lg ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Links
            </h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link.toLowerCase())}
                  className={`block transition-all hover:translate-x-1 ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-purple-400"
                      : "text-gray-700 hover:text-purple-600"
                  }`}
                >
                  ▸ {link}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4
              className={`font-semibold mb-4 text-lg ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Connect With Me
            </h4>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/50 rounded-lg hover:bg-purple-600 transition-all hover:scale-110"
                >
                  <social.icon size={20} className="text-gray-300" />
                </a>
              ))}
            </div>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-sm transition-all"
            >
              <BookOpen size={16} /> Download Resume
            </a>
          </div>
        </div>
        <div className="border-t border-purple-500/20 pt-6 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Saha Jewel Kumar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

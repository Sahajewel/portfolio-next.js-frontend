"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  onScrollToSection?: (section: string) => void;
}

const Footer = ({ onScrollToSection }: FooterProps) => {
  const { theme } = useTheme();

  const handleScrollClick = (section: string) => {
    if (onScrollToSection) {
      onScrollToSection(section);
    }
  };

  return (
    <footer
      className={`relative z-10 py-12 border-t ${
        theme === "dark"
          ? "bg-slate-900/80 backdrop-blur-sm border-purple-500/20"
          : "bg-white/80 backdrop-blur-sm border-purple-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
              Portfolio
            </h3>
            <p
              className={`leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Building exceptional digital experiences with passion and
              precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={`font-semibold mb-4 ${
                theme === "dark"
                  ? "text-gray-300 hover:text-purple-400"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Quick Links
            </h4>
            <div className="space-y-2">
              {["Projects", "Blogs"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className={`block transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-purple-400"
                      : "text-gray-700 hover:text-purple-600"
                  }`}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4
              className={`font-semibold mb-4 ${
                theme === "dark"
                  ? "text-gray-300 hover:text-purple-400"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Connect
            </h4>
            <div className="flex gap-4">
              {[
                {
                  icon: Github,
                  href: "https://github.com/Sahajewel",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/sahajewelkumar",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:jewelsaha072@email.com",
                  label: "Email",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-lg transition-all ${
                    theme === "dark"
                      ? "bg-slate-800/50 hover:bg-purple-600"
                      : "bg-gray-100 hover:bg-purple-100"
                  }`}
                  aria-label={social.label}
                >
                  <social.icon
                    size={20}
                    className={
                      theme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-purple-600"
                    }
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`border-t pt-8 text-center ${
            theme === "dark"
              ? "border-purple-500/20 text-gray-300"
              : "border-purple-200 text-gray-600"
          }`}
        >
          <p>© 2025 saha jewel kumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

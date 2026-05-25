// ✅ SERVER COMPONENT — purely static, zero client JS
import { Github, Linkedin, Mail } from "lucide-react";

const links = [
  { icon: Github, href: "https://github.com/Sahajewel" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/sahajewelkumar" },
  { icon: Mail, href: "mailto:jewelsaha072@email.com" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 py-12 border-t bg-slate-900/80 backdrop-blur-sm border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
              Portfolio
            </h3>
            <p className="leading-relaxed text-gray-300">
              Building exceptional digital experiences with passion and
              precision.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["about", "projects", "blogs", "contact"].map((link) => (
                // scroll এর জন্য client দরকার, তাই anchor tag
                <a
                  key={link}
                  href={`#${link}`}
                  className="block text-gray-300 hover:text-purple-400 transition-colors capitalize"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {links.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg transition-all bg-slate-800/50 hover:bg-purple-600"
                >
                  <s.icon size={20} className="text-gray-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t pt-8 text-center border-purple-500/20 text-gray-300">
          <p>© 2025 saha jewel kumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

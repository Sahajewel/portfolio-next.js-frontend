"use client";
// ✅ শুধু form submit-এর জন্য client — বাকি সব static
import { useState } from "react";
import { Mail, Phone, Linkedin, ArrowRight } from "lucide-react";

export default function ContactSection() {
  const [result, setResult] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult("Sending....");
    const formData = new FormData(e.currentTarget);
    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_PROJECT_ID as string,
    );
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setResult("Message Sent Successfully! ✅");
        (e.target as HTMLFormElement).reset();
      } else {
        setResult(data.message);
      }
    } catch {
      setResult("Something went wrong, please try again.");
    }
  };

  const contacts = [
    {
      icon: Mail,
      title: "Email",
      value: "jewelsaha072@email.com",
      href: "mailto:jewelsaha072@email.com",
      color: "from-purple-500 to-purple-600",
      external: false,
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+81 80 5052 6822",
      href: "tel:+818050526822",
      color: "from-pink-500 to-pink-600",
      external: false,
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Connect with me",
      href: "https://www.linkedin.com/in/sahajewelkumar",
      color: "from-blue-500 to-blue-600",
      external: true,
    },
  ];

  const inputClass =
    "w-full px-4 py-3 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all bg-slate-900/50 border border-purple-500/30 text-white";

  return (
    <section
      id="contact"
      className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative z-10"
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Let&apos;s Work Together
            </span>
          </h2>
          <p className="text-xl leading-relaxed max-w-2xl mx-auto text-gray-300">
            Have a project in mind or just want to chat? I&apos;m always open to
            discussing new opportunities, creative ideas, or partnerships.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className="group p-8 rounded-2xl border transition-all hover:scale-105 hover:shadow-xl bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${c.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform`}
              >
                <c.icon className="text-white" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">{c.title}</h3>
              <p className="text-gray-300">{c.value}</p>
            </a>
          ))}
        </div>

        <div className="p-8 rounded-2xl border bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
          <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className={inputClass}
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className={inputClass}
            />
            <textarea
              name="message"
              required
              placeholder="Your Message"
              rows={5}
              className={`${inputClass} resize-none`}
            />
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Send Message <ArrowRight size={20} />
            </button>
          </form>
          {result && (
            <p className="mt-4 font-medium text-purple-400">{result}</p>
          )}
        </div>
      </div>
    </section>
  );
}

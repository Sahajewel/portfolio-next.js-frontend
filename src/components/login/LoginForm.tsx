"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Github,
  User,
} from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        emailOrUsername: formData.emailOrUsername,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.success("Login successful! Redirecting...", {
          icon: "🎉",
          style: {
            background: theme === "dark" ? "#1e293b" : "#ffffff",
            color: theme === "dark" ? "#e2e8f0" : "#334155",
            border:
              theme === "dark" ? "1px solid #4c1d95" : "1px solid #e9d5ff",
          },
        });
        const from = searchParams.get("from") || "/dashboard";
        setTimeout(() => {
          router.push(from);
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.", {
        icon: "❌",
        style: {
          background: theme === "dark" ? "#1e293b" : "#ffffff",
          color: theme === "dark" ? "#e2e8f0" : "#334155",
          border: theme === "dark" ? "1px solid #dc2626" : "1px solid #fecaca",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50"
      }`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse ${
            theme === "dark" ? "bg-purple-500" : "bg-purple-200"
          }`}
        />
        <div
          className={`absolute top-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000 ${
            theme === "dark" ? "bg-pink-500" : "bg-pink-200"
          }`}
        />
        <div
          className={`absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000 ${
            theme === "dark" ? "bg-blue-500" : "bg-blue-200"
          }`}
        />
      </div>

      <div className="max-w-md w-full mx-4 relative z-10">
        {/* Card Container */}
        <div
          className={`rounded-2xl border transition-all duration-300 p-8 ${
            theme === "dark"
              ? "bg-slate-800/50 backdrop-blur-md border-purple-500/20 shadow-2xl shadow-purple-500/10"
              : "bg-white/80 backdrop-blur-md border-purple-200 shadow-2xl shadow-purple-200/10"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl mb-4 animate-pulse-slow">
              <Sparkles className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-pulse">
                Welcome Back
              </span>
            </h1>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="emailOrUsername"
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <User
                      size={16}
                      className={
                        theme === "dark" ? "text-purple-400" : "text-purple-500"
                      }
                    />
                    Email or Username
                  </div>
                </label>
                <div className="relative">
                  <input
                    id="emailOrUsername"
                    name="emailOrUsername"
                    type="text"
                    placeholder="Enter your email or username"
                    value={formData.emailOrUsername}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 pl-10 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === "dark"
                        ? "bg-slate-900/50 border border-purple-500/30 text-white placeholder-gray-400"
                        : "bg-white/50 border border-purple-300 text-gray-900 placeholder-gray-500"
                    }`}
                    disabled={loading}
                  />
                  <Mail
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Lock
                      size={16}
                      className={
                        theme === "dark" ? "text-purple-400" : "text-purple-500"
                      }
                    />
                    Password
                  </div>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 pl-10 pr-10 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === "dark"
                        ? "bg-slate-900/50 border border-purple-500/30 text-white placeholder-gray-400"
                        : "bg-white/50 border border-purple-300 text-gray-900 placeholder-gray-500"
                    }`}
                    disabled={loading}
                  />
                  <Lock
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={18}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-purple-500 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "transform hover:scale-[1.02] hover:shadow-xl"
              } bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-solid rounded-full animate-spin border-t-transparent"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <Github size={18} />
                  Sign in to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials (Optional) */}
          <div
            className={`mt-6 p-4 rounded-xl border text-sm ${
              theme === "dark"
                ? "bg-purple-900/20 border-purple-500/20 text-purple-300"
                : "bg-purple-50 border-purple-200 text-purple-700"
            }`}
          >
            <p className="font-medium mb-2">Demo Credentials:</p>
            <div className="space-y-1">
              <p>
                Email: <span className="font-mono">admin@portfolio.com</span>
              </p>
              <p>
                Password: <span className="font-mono">Admin@123456</span>
              </p>
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="mt-8 pt-6 border-t border-purple-500/20">
            <Link
              href="/"
              className={`group inline-flex items-center text-sm font-medium transition-all duration-200 ${
                theme === "dark"
                  ? "text-gray-300 hover:text-purple-400"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <ArrowLeft
                size={16}
                className="mr-2 group-hover:-translate-x-1 transition-transform"
              />
              Back to portfolio
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p
            className={`text-xs ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Secure access to your personal dashboard • Powered by NextAuth
          </p>
          <p
            className={`text-xs mt-2 ${
              theme === "dark" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            © 2025 Saha Jewel Kumar. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

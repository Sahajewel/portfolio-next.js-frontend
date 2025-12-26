/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { userAPI } from "@/lib/api";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  UserCircle,
  Calendar,
  Award,
  Briefcase,
  Edit2,
  Save,
  RotateCcw,
  Sparkles,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const { theme } = useTheme();
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserProfile();
    }
  }, [session]);

  const fetchUserProfile = async () => {
    try {
      const response = await userAPI.getUserById(session?.user?.id as string);
      const userData = response.data.data || response.data;

      setUser(userData);
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        username: userData.username || "",
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      if (!user) return;

      const response = await userAPI.updateUser(user.id, formData);

      if (response.data.success) {
        toast.success("Profile updated successfully!", {
          icon: "✅",
          style: {
            background: theme === "dark" ? "#1e293b" : "#ffffff",
            color: theme === "dark" ? "#e2e8f0" : "#334155",
            border:
              theme === "dark" ? "1px solid #4c1d95" : "1px solid #e9d5ff",
          },
        });

        // Update session
        await update({
          ...session,
          user: {
            ...session?.user,
            name: formData.name,
            username: formData.username,
          },
        });

        // Refresh user data
        fetchUserProfile();
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div
        className={`min-h-[80vh] flex items-center justify-center ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
            : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50"
        }`}
      >
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 text-gray-900"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl mb-6 animate-pulse-slow">
            <UserCircle className="text-white" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Profile Settings
            </span>
          </h1>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Manage your personal information and account details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Form */}
          <div className="lg:col-span-2">
            <div
              className={`rounded-2xl border transition-all duration-300 p-8 ${
                theme === "dark"
                  ? "bg-slate-800/50 backdrop-blur-md border-purple-500/20 shadow-2xl shadow-purple-500/10"
                  : "bg-white/80 backdrop-blur-md border-purple-200 shadow-2xl shadow-purple-200/10"
              }`}
            >
              <div className="flex items-center gap-3 mb-8">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    theme === "dark" ? "bg-purple-500/20" : "bg-purple-100"
                  }`}
                >
                  <Edit2
                    className={
                      theme === "dark" ? "text-purple-400" : "text-purple-500"
                    }
                    size={24}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Personal Information</h2>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Update your personal details
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium ${
                      theme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <User
                        size={16}
                        className={
                          theme === "dark"
                            ? "text-purple-400"
                            : "text-purple-500"
                        }
                      />
                      Full Name *
                    </div>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === "dark"
                        ? "bg-slate-900/50 border border-purple-500/30 text-white placeholder-gray-400"
                        : "bg-white/50 border border-purple-300 text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium ${
                      theme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Mail
                        size={16}
                        className={
                          theme === "dark"
                            ? "text-purple-400"
                            : "text-purple-500"
                        }
                      />
                      Email Address
                    </div>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    readOnly
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-not-allowed ${
                      theme === "dark"
                        ? "bg-slate-900/30 border border-purple-500/20 text-gray-400"
                        : "bg-gray-100 border border-gray-300 text-gray-500"
                    }`}
                    placeholder="Your email address"
                  />
                  <p
                    className={`text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Email cannot be changed
                  </p>
                </div>

                {/* Username Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className={`block text-sm font-medium ${
                      theme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <UserCircle
                        size={16}
                        className={
                          theme === "dark"
                            ? "text-purple-400"
                            : "text-purple-500"
                        }
                      />
                      Username *
                    </div>
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === "dark"
                        ? "bg-slate-900/50 border border-purple-500/30 text-white placeholder-gray-400"
                        : "bg-white/50 border border-purple-300 text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="Choose a username"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={updating}
                    className={`flex-1 py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      updating
                        ? "opacity-70 cursor-not-allowed"
                        : "transform hover:scale-[1.02] hover:shadow-xl"
                    } bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30`}
                  >
                    {updating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-solid rounded-full animate-spin border-t-transparent"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        name: user?.name || "",
                        email: user?.email || "",
                        username: user?.username || "",
                      })
                    }
                    className={`py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      theme === "dark"
                        ? "border border-purple-500 text-white hover:bg-purple-500/10"
                        : "border border-purple-300 text-gray-700 hover:bg-purple-50"
                    }`}
                  >
                    <RotateCcw size={20} />
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Account Info & Stats */}
          <div className="space-y-8">
            {/* Account Summary Card */}
            <div
              className={`rounded-2xl border transition-all duration-300 p-8 ${
                theme === "dark"
                  ? "bg-slate-800/50 backdrop-blur-md border-purple-500/20 shadow-2xl shadow-purple-500/10"
                  : "bg-white/80 backdrop-blur-md border-purple-200 shadow-2xl shadow-purple-200/10"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    theme === "dark" ? "bg-blue-500/20" : "bg-blue-100"
                  }`}
                >
                  <Shield
                    className={
                      theme === "dark" ? "text-blue-400" : "text-blue-500"
                    }
                    size={24}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Account Summary</h2>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Your account details
                  </p>
                </div>
              </div>

              {user && (
                <div className="space-y-4">
                  {/* Member Since */}
                  <div
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      theme === "dark" ? "bg-slate-900/30" : "bg-purple-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          theme === "dark"
                            ? "bg-purple-500/20"
                            : "bg-purple-100"
                        }`}
                      >
                        <Calendar
                          size={18}
                          className={
                            theme === "dark"
                              ? "text-purple-400"
                              : "text-purple-500"
                          }
                        />
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Member since
                        </p>
                        <p className="font-semibold">
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* User Role */}
                  <div
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      theme === "dark" ? "bg-slate-900/30" : "bg-pink-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          theme === "dark" ? "bg-pink-500/20" : "bg-pink-100"
                        }`}
                      >
                        <Award
                          size={18}
                          className={
                            theme === "dark" ? "text-pink-400" : "text-pink-500"
                          }
                        />
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          Account Role
                        </p>
                        <p className="font-semibold capitalize">{user.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      theme === "dark" ? "bg-slate-900/30" : "bg-blue-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          theme === "dark" ? "bg-blue-500/20" : "bg-blue-100"
                        }`}
                      >
                        <Clock
                          size={18}
                          className={
                            theme === "dark" ? "text-blue-400" : "text-blue-500"
                          }
                        />
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          Last updated
                        </p>
                        <p className="font-semibold">
                          {new Date(user.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats Card */}
            <div
              className={`rounded-2xl border transition-all duration-300 p-8 ${
                theme === "dark"
                  ? "bg-slate-800/50 backdrop-blur-md border-purple-500/20 shadow-2xl shadow-purple-500/10"
                  : "bg-white/80 backdrop-blur-md border-purple-200 shadow-2xl shadow-purple-200/10"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    theme === "dark" ? "bg-green-500/20" : "bg-green-100"
                  }`}
                >
                  <Sparkles
                    className={
                      theme === "dark" ? "text-green-400" : "text-green-500"
                    }
                    size={24}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Quick Stats</h2>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Your activity overview
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Blogs Written */}
                <div
                  className={`p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-purple-900/30 to-pink-900/20 hover:shadow-lg hover:shadow-purple-500/20"
                      : "bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-lg hover:shadow-purple-200/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          theme === "dark" ? "bg-blue-500/20" : "bg-blue-100"
                        }`}
                      >
                        <span className="text-2xl">📝</span>
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Blogs Written
                        </p>
                        <p className="text-2xl font-bold text-blue-500">0</p>
                      </div>
                    </div>
                    <CheckCircle className="text-blue-500" size={20} />
                  </div>
                </div>

                {/* Projects Added */}
                <div
                  className={`p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-green-900/30 to-emerald-900/20 hover:shadow-lg hover:shadow-green-500/20"
                      : "bg-gradient-to-r from-green-50 to-emerald-50 hover:shadow-lg hover:shadow-green-200/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          theme === "dark" ? "bg-green-500/20" : "bg-green-100"
                        }`}
                      >
                        <Briefcase
                          className={
                            theme === "dark"
                              ? "text-green-400"
                              : "text-green-500"
                          }
                          size={24}
                        />
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Projects Added
                        </p>
                        <p className="text-2xl font-bold text-green-500">0</p>
                      </div>
                    </div>
                    <CheckCircle className="text-green-500" size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            <div
              className={`rounded-2xl border transition-all duration-300 p-6 text-center ${
                theme === "dark"
                  ? "bg-gradient-to-br from-purple-900/30 to-pink-900/20 border-purple-500/20"
                  : "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
              }`}
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4 animate-pulse-slow">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Profile Status</h3>
              <p
                className={`text-sm mb-4 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Your profile is complete and active
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
                <CheckCircle size={16} />
                Verified Account
              </div>
            </div>
          </div>
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

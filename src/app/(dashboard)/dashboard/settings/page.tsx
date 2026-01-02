// app/dashboard/settings/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Save,
  User,
  Lock,
  Bell,
  Palette,
  Globe,
  Shield,
  Mail,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  Database,
  Zap,
  Moon,
  Sun,
  Check,
  X,
  RefreshCw,
  Trash2,
  Download,
  Upload,
  AlertCircle,
} from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: "Saha Jewel Kumar",
      email: "saha@example.com",
      bio: "Full Stack Developer passionate about creating scalable web applications.",
      username: "sahajewel",
      location: "Dhaka, Bangladesh",
      website: "https://sahajewel.com",
    },
    security: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: false,
      sessionTimeout: 30,
    },
    appearance: {
      theme: "system",
      accentColor: "purple",
      fontSize: "medium",
      reducedMotion: false,
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      blogUpdates: true,
      projectUpdates: true,
      securityAlerts: true,
    },
    account: {
      language: "en",
      timezone: "Asia/Dhaka",
      dateFormat: "DD/MM/YYYY",
      currency: "USD",
    },
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    blogUpdates: true,
    projectUpdates: true,
    securityAlerts: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSaving(false);
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all settings?")) {
      setSettings({
        ...settings,
        security: {
          ...settings.security,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        },
      });
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "settings-backup.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "security", label: "Security", icon: <Lock size={18} /> },
    { id: "appearance", label: "Appearance", icon: <Palette size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "account", label: "Account", icon: <Globe size={18} /> },
    { id: "advanced", label: "Advanced", icon: <Zap size={18} /> },
  ];

  if (!mounted) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
            : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-2xl border backdrop-blur-md ${
                theme === "dark"
                  ? "bg-slate-800/50 border-purple-500/20"
                  : "bg-white/80 border-purple-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-6 flex items-center gap-2 ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`}
              >
                <User size={20} />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={settings.profile.name}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: { ...settings.profile, name: e.target.value },
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: { ...settings.profile, email: e.target.value },
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    value={settings.profile.username}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: {
                          ...settings.profile,
                          username: e.target.value,
                        },
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    value={settings.profile.location}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: {
                          ...settings.profile,
                          location: e.target.value,
                        },
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                    }`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Bio
                  </label>
                  <textarea
                    value={settings.profile.bio}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: { ...settings.profile, bio: e.target.value },
                      })
                    }
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                    }`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Website
                  </label>
                  <input
                    type="url"
                    value={settings.profile.website}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: {
                          ...settings.profile,
                          website: e.target.value,
                        },
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-2xl border backdrop-blur-md ${
                theme === "dark"
                  ? "bg-slate-800/50 border-purple-500/20"
                  : "bg-white/80 border-purple-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-6 flex items-center gap-2 ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`}
              >
                <Mail size={20} />
                Contact Preferences
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Newsletter Subscription
                    </p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Receive weekly updates and tips
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            emailNotifications: e.target.checked,
                          },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 rounded-full peer ${
                        theme === "dark"
                          ? "bg-gray-700 peer-checked:bg-purple-600"
                          : "bg-gray-300 peer-checked:bg-purple-500"
                      } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}
                    ></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-2xl border backdrop-blur-md ${
                theme === "dark"
                  ? "bg-slate-800/50 border-purple-500/20"
                  : "bg-white/80 border-purple-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-6 flex items-center gap-2 ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`}
              >
                <Key size={20} />
                Change Password
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={settings.security.currentPassword}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          security: {
                            ...settings.security,
                            currentPassword: e.target.value,
                          },
                        })
                      }
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        theme === "dark"
                          ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500"
                          : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={settings.security.newPassword}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          security: {
                            ...settings.security,
                            newPassword: e.target.value,
                          },
                        })
                      }
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        theme === "dark"
                          ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500"
                          : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={settings.security.confirmPassword}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          security: {
                            ...settings.security,
                            confirmPassword: e.target.value,
                          },
                        })
                      }
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        theme === "dark"
                          ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500"
                          : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-2xl border backdrop-blur-md ${
                theme === "dark"
                  ? "bg-slate-800/50 border-purple-500/20"
                  : "bg-white/80 border-purple-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-6 flex items-center gap-2 ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`}
              >
                <Shield size={20} />
                Security Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Two-Factor Authentication
                    </p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorEnabled}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          security: {
                            ...settings.security,
                            twoFactorEnabled: e.target.checked,
                          },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 rounded-full peer ${
                        theme === "dark"
                          ? "bg-gray-700 peer-checked:bg-purple-600"
                          : "bg-gray-300 peer-checked:bg-purple-500"
                      } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}
                    ></div>
                  </label>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Session Timeout (minutes)
                  </label>
                  <select
                    value={settings.security.sessionTimeout}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: {
                          ...settings.security,
                          sessionTimeout: parseInt(e.target.value),
                        },
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                    }`}
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={120}>2 hours</option>
                    <option value={0}>Never (not recommended)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-2xl border backdrop-blur-md ${
                theme === "dark"
                  ? "bg-slate-800/50 border-purple-500/20"
                  : "bg-white/80 border-purple-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-6 flex items-center gap-2 ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`}
              >
                <Palette size={20} />
                Theme Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    theme === "light"
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-500/20"
                      : theme === "dark"
                      ? "border-slate-700 bg-slate-800/50"
                      : "border-gray-200 bg-white/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <Sun size={32} className="text-yellow-500" />
                    <span
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Light Mode
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setTheme("dark")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    theme === "dark"
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-500/20"
                      : theme === "dark"
                      ? "border-slate-700 bg-slate-800/50"
                      : "border-gray-200 bg-white/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <Moon size={32} className="text-blue-400" />
                    <span
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Dark Mode
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setTheme("system")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    theme === "system"
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-500/20"
                      : theme === "dark"
                      ? "border-slate-700 bg-slate-800/50"
                      : "border-gray-200 bg-white/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative w-8 h-8">
                      <Sun
                        size={24}
                        className="absolute top-0 left-0 text-yellow-500"
                      />
                      <Moon
                        size={20}
                        className="absolute bottom-0 right-0 text-blue-400"
                      />
                    </div>
                    <span
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      System
                    </span>
                  </div>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Accent Color
                  </label>
                  <div className="flex gap-3">
                    {["purple", "blue", "green", "pink", "orange"].map(
                      (color) => (
                        <button
                          key={color}
                          onClick={() =>
                            setSettings({
                              ...settings,
                              appearance: {
                                ...settings.appearance,
                                accentColor: color,
                              },
                            })
                          }
                          className={`w-10 h-10 rounded-full border-2 ${
                            settings.appearance.accentColor === color
                              ? "border-white dark:border-gray-300 ring-2 ring-offset-2 ring-purple-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Reduced Motion
                    </p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Reduce animations and transitions
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.appearance.reducedMotion}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: {
                            ...settings.appearance,
                            reducedMotion: e.target.checked,
                          },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 rounded-full peer ${
                        theme === "dark"
                          ? "bg-gray-700 peer-checked:bg-purple-600"
                          : "bg-gray-300 peer-checked:bg-purple-500"
                      } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}
                    ></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-2xl border backdrop-blur-md ${
                theme === "dark"
                  ? "bg-slate-800/50 border-purple-500/20"
                  : "bg-white/80 border-purple-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-6 flex items-center gap-2 ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`}
              >
                <Bell size={20} />
                Notification Preferences
              </h3>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h4
                    className={`font-medium ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Notifications
                  </h4>

                  {[
                    {
                      key: "emailNotifications",
                      label: "All Email Notifications",
                      description: "Receive all email notifications",
                    },
                    {
                      key: "blogUpdates",
                      label: "Blog Updates",
                      description: "Get notified about new blog posts",
                    },
                    {
                      key: "projectUpdates",
                      label: "Project Updates",
                      description: "Get notified about project changes",
                    },
                    {
                      key: "securityAlerts",
                      label: "Security Alerts",
                      description: "Important security notifications",
                    },
                    {
                      key: "marketingEmails",
                      label: "Marketing Emails",
                      description: "Promotional emails and offers",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p
                          className={`font-medium ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.label}
                        </p>
                        <p
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            settings.notifications[
                              item.key as keyof typeof settings.notifications
                            ] as boolean
                          }
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              notifications: {
                                ...settings.notifications,
                                [item.key]: e.target.checked,
                              },
                            })
                          }
                          className="sr-only peer"
                        />
                        <div
                          className={`w-11 h-6 rounded-full peer ${
                            theme === "dark"
                              ? "bg-gray-700 peer-checked:bg-purple-600"
                              : "bg-gray-300 peer-checked:bg-purple-500"
                          } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}
                        ></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div
                  className={`pt-6 border-t ${
                    theme === "dark" ? "border-slate-700" : "border-gray-200"
                  }`}
                >
                  <h4
                    className={`font-medium mb-4 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Push Notifications
                  </h4>

                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`font-medium ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Push Notifications
                      </p>
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.pushNotifications}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              pushNotifications: e.target.checked,
                            },
                          })
                        }
                        className="sr-only peer"
                      />
                      <div
                        className={`w-11 h-6 rounded-full peer ${
                          theme === "dark"
                            ? "bg-gray-700 peer-checked:bg-purple-600"
                            : "bg-gray-300 peer-checked:bg-purple-500"
                        } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}
                      ></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "account":
        return (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-2xl border backdrop-blur-md ${
                theme === "dark"
                  ? "bg-slate-800/50 border-purple-500/20"
                  : "bg-white/80 border-purple-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-6 flex items-center gap-2 ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`}
              >
                <Globe size={20} />
                Regional Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Language
                  </label>
                  <select
                    value={settings.account.language}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        account: {
                          ...settings.account,
                          language: e.target.value,
                        },
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                    }`}
                  >
                    <option value="en">English</option>
                    <option value="bn">Bengali</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Timezone
                  </label>
                  <select
                    value={settings.account.timezone}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        account: {
                          ...settings.account,
                          timezone: e.target.value,
                        },
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                    }`}
                  >
                    <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                    <option value="America/New_York">
                      America/New_York (GMT-5)
                    </option>
                    <option value="Europe/London">Europe/London (GMT+0)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Date Format
                  </label>
                  <select
                    value={settings.account.dateFormat}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        account: {
                          ...settings.account,
                          dateFormat: e.target.value,
                        },
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                    }`}
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Currency
                  </label>
                  <select
                    value={settings.account.currency}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        account: {
                          ...settings.account,
                          currency: e.target.value,
                        },
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                    }`}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="BDT">BDT (৳)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case "advanced":
        return (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-2xl border backdrop-blur-md ${
                theme === "dark"
                  ? "bg-slate-800/50 border-purple-500/20"
                  : "bg-white/80 border-purple-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-6 flex items-center gap-2 ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`}
              >
                <Database size={20} />
                Data Management
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Export Data
                    </p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Download all your settings and data
                    </p>
                  </div>
                  <button
                    onClick={handleExport}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      theme === "dark"
                        ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300"
                    }`}
                  >
                    <Download size={16} className="inline mr-2" />
                    Export
                  </button>
                </div>

                <div
                  className={`p-4 rounded-lg ${
                    theme === "dark"
                      ? "bg-yellow-500/10 border border-yellow-500/30"
                      : "bg-yellow-50 border border-yellow-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-yellow-500 mt-0.5" size={20} />
                    <div>
                      <p
                        className={`font-medium ${
                          theme === "dark"
                            ? "text-yellow-300"
                            : "text-yellow-800"
                        }`}
                      >
                        Dangerous Zone
                      </p>
                      <p
                        className={`text-sm mt-1 ${
                          theme === "dark"
                            ? "text-yellow-400/80"
                            : "text-yellow-700"
                        }`}
                      >
                        These actions cannot be undone. Please proceed with
                        caution.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleReset}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        theme === "dark"
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                      }`}
                    >
                      <RefreshCw size={16} className="inline mr-2" />
                      Reset Settings
                    </button>

                    <button
                      onClick={() =>
                        alert("This feature is not implemented yet.")
                      }
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        theme === "dark"
                          ? "bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30"
                          : "bg-red-100 text-red-700 hover:bg-red-200 border border-red-300"
                      }`}
                    >
                      <Trash2 size={16} className="inline mr-2" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Manage your account preferences and settings
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
              theme === "dark"
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
            }`}
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              saving ? "opacity-75 cursor-not-allowed" : ""
            } ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50"
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50"
            }`}
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div
          className={`lg:w-64 rounded-2xl border backdrop-blur-md h-fit ${
            theme === "dark"
              ? "bg-slate-800/50 border-purple-500/20"
              : "bg-white/80 border-purple-200"
          }`}
        >
          <div className="p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 text-left ${
                    activeTab === tab.id
                      ? theme === "dark"
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        : "bg-purple-100 text-purple-700 border border-purple-300"
                      : theme === "dark"
                      ? "hover:bg-slate-800/50 text-gray-300"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div
                    className={`${
                      activeTab === tab.id
                        ? theme === "dark"
                          ? "text-purple-400"
                          : "text-purple-600"
                        : theme === "dark"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {tab.icon}
                  </div>
                  <span className="font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    </div>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  );
}

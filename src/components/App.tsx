/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Navbar } from "./public/Navbar";
import { Footer } from "./public/Footer";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [session, setSession] = useState<any>(null);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleSession = () => {
    setSession(session ? null : { user: { name: "Admin" } });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-900 text-white"
          : "bg-slate-50 text-gray-900"
      }`}
    >
      <Navbar theme={theme} onThemeToggle={toggleTheme} session={session} />

      <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Smart Navbar & Footer
          </h1>
          <p className="text-xl opacity-80">
            বানানো হয়েছে তোমার portfolio design অনুযায়ী! 🎨
          </p>

          <button
            onClick={toggleSession}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              session ? "bg-red-600" : "bg-green-600"
            } text-white`}
          >
            {session ? "Simulate Logout" : "Simulate Login"}
          </button>
        </div>

        {/* Dummy Sections for Testing Scroll */}
        {["home", "about", "skills", "projects", "contact"].map((section) => (
          <div
            key={section}
            id={section}
            className="min-h-screen flex items-center justify-center my-12 border border-purple-500/20 rounded-3xl bg-white/5"
          >
            <h2 className="text-4xl font-bold capitalize">{section} Section</h2>
          </div>
        ))}
      </main>

      <Footer theme={theme} />
    </div>
  );
};

export default App;

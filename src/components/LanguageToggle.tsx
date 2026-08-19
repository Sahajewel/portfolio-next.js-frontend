"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface LanguageToggleProps {
  dark?: boolean;
}

const LanguageToggle = ({ dark }: LanguageToggleProps) => {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      aria-label="Switch language"
      className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all flex items-center gap-1.5 ${
        dark
          ? "border-purple-500/40 bg-slate-800/50 text-white hover:bg-purple-500/20"
          : "border-purple-300 bg-white/50 text-gray-700 hover:bg-purple-50"
      }`}
    >
      <span className={lang === "en" ? "opacity-100 font-bold" : "opacity-50"}>
        EN
      </span>
      <span className="opacity-40">/</span>
      <span className={lang === "jp" ? "opacity-100 font-bold" : "opacity-50"}>
        JP
      </span>
    </button>
  );
};

export default LanguageToggle;

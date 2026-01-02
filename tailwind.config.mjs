/** @type {import('tailwindcss').Config} */
// ১. প্রথমে প্লাগইনটি ইম্পোর্ট করে নিন
import typography from "@tailwindcss/typography";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // ২. এবার ভেরিয়েবলটি এখানে ব্যবহার করুন
    typography,
  ],
};

export default config;

/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  Code,
  Briefcase,
  Award,
  ExternalLink,
  ChevronDown,
  Calendar,
  MapPin,
  GraduationCap,
  Building2,
  BookOpen,
  Trophy,
  Star,
  MessageSquare,
  ArrowRight,
  LogIn,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  Book,
  User,
  Clock,
} from "lucide-react";
import { useTheme } from "next-themes";
import { blogAPI, projectAPI } from "@/lib/api";
import { Blog, Project } from "@/types";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

/* ────────────────────────────────────────────────────────────────────────
   TRIMMED STRUCTURE — 6 sections instead of 10:
     Hero → About (+ mini philosophy strip) → Skills →
     Journey (Education + Experience + Achievements merged) →
     Projects → Contact

   Removed / merged vs the old version:
   - "Achievements & Certifications" section deleted — its 4 badges now
     show as small tags on the matching Journey card instead of a whole
     separate section.
   - "My Philosophy" section deleted — its 3 cards now live as a compact
     3-column strip under the About text.
   - "Technical Journey" + "Education" merged into one "My Journey"
     timeline, chronological, so the story reads as one continuous path
     instead of two separate near-duplicate sections.
   - Blogs section is paused (see BLOGS_ENABLED below) since it looked
     like placeholder/demo content — flip the flag back to true the
     moment real posts are live, the code is untouched, just hidden.
   ──────────────────────────────────────────────────────────────────────── */

const BLOGS_ENABLED = true; // 35+ real posts confirmed — back on

interface MousePosition {
  x: number;
  y: number;
}

type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

interface Skill {
  name: string;
  level: SkillLevel;
  category: string;
  icon: string;
}

type JourneyType = "education" | "work";

interface JourneyItem {
  type: JourneyType;
  title: string;
  org: string;
  duration: string;
  location?: string;
  description: string;
  achievements: string[];
  tags: string[];
  badge?: string; // folded-in "achievement" highlight for this entry
}

// ─── Static Data (module scope) ────────────────────────────────────────────

const skills: Skill[] = [
  { name: "React.js", level: "Expert", category: "Frontend", icon: "⚛️" },
  { name: "Next.js", level: "Advanced", category: "Frontend", icon: "▲" },
  { name: "TypeScript", level: "Advanced", category: "Language", icon: "📘" },
  { name: "Node.js", level: "Advanced", category: "Backend", icon: "🟢" },
  { name: "Express.js", level: "Advanced", category: "Backend", icon: "🚂" },
  {
    name: "PostgreSQL",
    level: "Intermediate",
    category: "Database",
    icon: "🐘",
  },
  { name: "Prisma ORM", level: "Advanced", category: "Backend", icon: "🔷" },
  { name: "Tailwind CSS", level: "Expert", category: "Frontend", icon: "🎨" },
  { name: "MongoDB", level: "Intermediate", category: "Database", icon: "🍃" },
];

// ─── Bilingual text (EN / JP) for the recruiter-facing sections ──────────
const T = {
  en: {
    heroTag: "Exploring New Frontiers",
    heroHiIm: "Hi, I'm",
    name: "Saha Jewel Kumar",
    heroTitle:
      "Full Stack Developer | Building Scalable, High-Performance Web Applications",
    heroDesc:
      "I specialize in developing modern web applications using Next.js, TypeScript, Prisma, and PostgreSQL, focusing on clean architecture, robust backend systems, and intuitive frontend experiences that solve real-world problems.",
    downloadResume: "Download Resume",
    letsTalk: "Let's Talk",
    aboutTitle: "About Me",
    aboutSub: "Get to know me better",
    aboutIntro:
      "👋 Hello! I'm a dedicated Full Stack Developer with a strong focus on building scalable, high-performance web applications and solving real-world problems.",
    aboutP2Pre: "My programming journey began over",
    aboutP2Years: "3 years ago,",
    aboutP2Post:
      "and since then I have continuously worked on mastering the modern web ecosystem, prioritizing clean, efficient, maintainable code.",
    aboutP3Pre: "I specialize in the",
    aboutP3Stack: "MERN stack and Next.js",
    aboutP3Post:
      "working with TypeScript, Prisma, and PostgreSQL to design robust backend systems and intuitive interfaces.",
    aboutQuote:
      '💡 "Code is like humor. When you have to explain it, it\'s bad." - Cory House',
    skillsTitle: "Skills & Expertise",
    skillsSub: "Technologies I work with",
    journeyTitle: "My Journey",
    journeySub:
      "From engineering to full stack — education, work, and milestones in one timeline",
    projectsTitle: "Featured Projects",
    projectsSub: "Some of my recent work",
    contactTitle: "Let's Work Together",
    contactSub:
      "Have a project in mind or just want to chat? I'm always open to discussing new opportunities, creative ideas, or partnerships. Let's bring your vision to life!",
    sendMessage: "Send Me a Message",
    // Nav
    navHome: "Home",
    navAbout: "About",
    navSkills: "Skills",
    navJourney: "Journey",
    navProjects: "Projects",
    navBlogs: "Blogs",
    navContact: "Contact",
    navDashboard: "Dashboard",
    navLogout: "Logout",
    navLogin: "Login",
    // Hero stats
    statStackFocus: "Stack Focus",
    statStackFocusValue:
      "MERN Stack • Next.js • TypeScript • Prisma • PostgreSQL",
    statExperience: "Experience",
    statExperienceValue: "3 Years",
    statProjects: "Projects",
    statProjectsValue: "10+ Completed",
    // About mini cards
    cardCleanCodeTitle: "Clean Code",
    cardCleanCodeDesc: "Writing maintainable and scalable code",
    cardProblemSolverTitle: "Problem Solver",
    cardProblemSolverDesc: "Analytical thinking for complex challenges",
    cardFastLearnerTitle: "Fast Learner",
    cardFastLearnerDesc: "Swiftly mastering new frameworks and tools",
    cardTeamTitle: "Team Enthusiast",
    cardTeamDesc: "Collaborative and communicative",
    // Skills categories
    catFrontend: "Frontend",
    catBackend: "Backend",
    catDevOps: "DevOps & Tools",
    // View all buttons
    viewAllProjects: "View All Projects",
    viewAllBlogs: "View All Blogs",
    // Contact cards
    contactEmail: "Email",
    contactPhone: "Phone",
    contactLinkedInTitle: "LinkedIn",
    contactLinkedInValue: "Connect with me",
    // Form
    formName: "Your Name",
    formEmail: "Your Email",
    formSubject: "Subject",
    formMessage: "Your Message",
    formSend: "Send Message",
    formSending: "Sending....",
    formError: "Something went wrong, please try again.",
    // Footer
    footerTagline:
      "Building exceptional digital experiences with passion and precision.",
    footerQuickLinks: "Quick Links",
    footerConnect: "Connect",
    footerRights: "© 2026 Saha Jewel Kumar. All rights reserved.",
  },
  jp: {
    heroTag: "新たな挑戦を探求中",
    heroHiIm: "はじめまして、",
    name: "サハ　ジュエル　クマル",
    heroTitle:
      "フルスタックデベロッパー ｜ スケーラブルで高性能なWebアプリケーションを構築",
    heroDesc:
      "Next.js、TypeScript、Prisma、PostgreSQLを用いたモダンなWebアプリケーション開発を専門としています。クリーンなアーキテクチャ、堅牢なバックエンドシステム、そして実際の課題を解決する直感的なフロントエンド体験の構築を重視しています。",
    downloadResume: "履歴書をダウンロード",
    letsTalk: "お話ししましょう",
    aboutTitle: "自己紹介",
    aboutSub: "私についてもっと知る",
    aboutIntro:
      "👋 こんにちは！スケーラブルで高性能なWebアプリケーションの構築と、実際の課題解決に強くこだわるフルスタックデベロッパーです。",
    aboutP2Pre: "プログラミングの旅を始めたのは",
    aboutP2Years: "3年以上前、",
    aboutP2Post:
      "それ以来、クリーンで効率的、保守しやすいコードを重視しながら、モダンなWebエコシステムの習得に継続的に取り組んでいます。",
    aboutP3Pre: "専門としているのは",
    aboutP3Stack: "MERNスタックとNext.js",
    aboutP3Post:
      "で、TypeScript、Prisma、PostgreSQLを用いて堅牢なバックエンドシステムと直感的なインターフェースを設計しています。",
    aboutQuote:
      "💡「コードはユーモアのようなもの。説明しなければ伝わらないなら、それは良くないコードだ。」- コリー・ハウス",
    skillsTitle: "スキル＆専門技術",
    skillsSub: "使用している技術",
    journeyTitle: "私の歩み",
    journeySub:
      "エンジニアリングからフルスタックへ — 学歴・職歴・節目を一つのタイムラインで",
    projectsTitle: "主なプロジェクト",
    projectsSub: "最近の制作物の一部",
    contactTitle: "一緒に働きましょう",
    contactSub:
      "プロジェクトのご相談やちょっとした会話でも、お気軽にご連絡ください。新しい機会やアイデア、コラボレーションについて、いつでも話し合う準備ができています。あなたのビジョンを一緒に形にしましょう！",
    sendMessage: "メッセージを送る",
    // Nav
    navHome: "ホーム",
    navAbout: "自己紹介",
    navSkills: "スキル",
    navJourney: "経歴",
    navProjects: "プロジェクト",
    navBlogs: "ブログ",
    navContact: "お問い合わせ",
    navDashboard: "ダッシュボード",
    navLogout: "ログアウト",
    navLogin: "ログイン",
    // Hero stats
    statStackFocus: "得意技術",
    statStackFocusValue:
      "MERNスタック・Next.js・TypeScript・Prisma・PostgreSQL",
    statExperience: "経験年数",
    statExperienceValue: "3年",
    statProjects: "プロジェクト数",
    statProjectsValue: "10件以上完成",
    // About mini cards
    cardCleanCodeTitle: "クリーンコード",
    cardCleanCodeDesc: "保守しやすくスケーラブルなコードを書く",
    cardProblemSolverTitle: "問題解決力",
    cardProblemSolverDesc: "複雑な課題への分析的思考",
    cardFastLearnerTitle: "速い学習力",
    cardFastLearnerDesc: "新しいフレームワークやツールを素早く習得",
    cardTeamTitle: "チーム志向",
    cardTeamDesc: "協調性があり、コミュニケーション力が高い",
    // Skills categories
    catFrontend: "フロントエンド",
    catBackend: "バックエンド",
    catDevOps: "DevOps・ツール",
    // View all buttons
    viewAllProjects: "すべてのプロジェクトを見る",
    viewAllBlogs: "すべてのブログを見る",
    // Contact cards
    contactEmail: "メール",
    contactPhone: "電話番号",
    contactLinkedInTitle: "LinkedIn",
    contactLinkedInValue: "つながりましょう",
    // Form
    formName: "お名前",
    formEmail: "メールアドレス",
    formSubject: "件名",
    formMessage: "メッセージ",
    formSend: "メッセージを送る",
    formSending: "送信中...",
    formError: "エラーが発生しました。もう一度お試しください。",
    // Footer
    footerTagline: "情熱と精密さで、優れたデジタル体験を構築します。",
    footerQuickLinks: "クイックリンク",
    footerConnect: "つながる",
    footerRights: "© 2026 サハ ジュエルクマル．All rights reserved.",
  },
} as const;

const journeyJP: Record<
  string,
  { description: string; achievements: string[]; badge?: string }
> = {
  "B.Sc. in Civil Engineering": {
    description:
      "ソフトウェア開発へ転向する前に、構造的な論理思考とプロジェクト管理の強固な基盤を築きました。",
    achievements: [
      "構造的な論理思考とプロジェクト管理における豊富な経験",
      "ソフトウェアへの長年の情熱を追求するため、技術分野への転向を決意",
    ],
    badge: "エンジニアリングで培った問題解決力をコーディングにも応用",
  },
  "Web Development (Level 1)": {
    description:
      "レスポンシブでインタラクティブなユーザーインターフェースの構築に重点を置いた、Web開発の基礎を習得。",
    achievements: [
      "ReactとモダンなJavaScriptを用いて5件以上のフロントエンドプロジェクトを構築",
      "DOM操作とCSSフレームワークに関する深い理解を習得",
      "永続的なデータ保存のためMongoDBを統合",
    ],
  },
  "Full Stack Development (Level 2)": {
    description:
      "プロフェッショナルなワークフローとスケーラビリティに重点を置き、高度なフルスタック開発を深く学習。",
    achievements: [
      "型安全で堅牢なアプリケーション構築のためTypeScriptを習得",
      "PrismaとPostgreSQLを用いた高度な状態管理と複雑なバックエンドアーキテクチャを実装",
      "Next.jsとTailwind CSSを用いた本番環境レベルのアプリケーションを構築",
    ],
    badge: "Next.js（Server Components、Server Actions）を習得",
  },
  "Professional Web Development — Certificate": {
    description:
      "本番運用可能なレベルのMERN＆Next.js開発者になるべく、1年間集中的に取り組みました。",
    achievements: ["厳格なトレーニングを通じてMERN＆Next.jsスタックを習得"],
    badge: "1年間の集中トレーニングを修了、実用規模のアプリを構築",
  },
};

const philosophyStripJP = [
  {
    icon: "🎯",
    title: "精密なエンジニアリング",
    text: "土木工学で培った構造的な厳密さを、今はコードに応用しています。",
  },
  {
    icon: "📈",
    title: "継続的な成長",
    text: "2年間、毎日何か新しいことを学び続けています。",
  },
  {
    icon: "🧩",
    title: "問題解決者",
    text: "単なるコードではなく、解決策を作る — 標準でスケーラブルかつ効率的に。",
  },
];

// One chronological timeline — education, work, and the old "achievements"
// badges are now attached to whichever entry they actually belong to.
const journey: JourneyItem[] = [
  {
    type: "education",
    title: "B.Sc. in Civil Engineering",
    org: "Stamford University Bangladesh",
    duration: "2009 - 2013",
    description:
      "Built a strong foundation in structural logic and project management before transitioning into software.",
    achievements: [
      "Extensive experience in structural logic and project management",
      "Decided to transition into tech to pursue long-term passion for software",
    ],
    tags: [],
    badge: "Engineering problem-solving skills carried into code",
  },
  {
    type: "work",
    title: "Web Development (Level 1)",
    org: "Programming Hero",
    duration: "2024",
    location: "Remote",
    description:
      "Foundation of web development, focusing on building responsive and interactive user interfaces.",
    achievements: [
      "Built over 5+ frontend projects using React and modern JavaScript",
      "Developed a strong understanding of DOM manipulation and CSS frameworks",
      "Successfully integrated MongoDB for persistent data storage",
    ],
    tags: ["React.js", "JavaScript", "Node.js", "Express.js", "MongoDB"],
  },
  {
    type: "work",
    title: "Full Stack Development (Level 2)",
    org: "Programming Hero",
    duration: "2025",
    location: "Remote",
    description:
      "Deep diving into advanced Full Stack development with a focus on professional workflow and scalability.",
    achievements: [
      "Mastering TypeScript for building type-safe and robust applications",
      "Implementing advanced state management and complex backend architectures using Prisma and PostgreSQL",
      "Building production-grade applications with Next.js and Tailwind CSS",
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Redux"],
    badge: "Mastered Next.js (Server Components, Server Actions)",
  },
  {
    type: "education",
    title: "Professional Web Development — Certificate",
    org: "Programming Hero",
    duration: "2024 - 2025",
    description:
      "1 year dedicated to becoming a production-ready MERN & Next.js developer.",
    achievements: [
      "Successfully mastered MERN & Next.js stack through rigorous training",
    ],
    tags: [],
    badge: "Completed 1 year intensive training, full-scale apps built",
  },
];

// Folded into About — 3 short lines instead of a whole section.
const philosophyStrip = [
  {
    icon: "🎯",
    title: "Precision Engineering",
    text: "Same structural rigor from Civil Engineering, now applied to code.",
  },
  {
    icon: "📈",
    title: "Continuous Growth",
    text: "Two years in, still learning something new every day.",
  },
  {
    icon: "🧩",
    title: "Problem Solver",
    text: "I build solutions, not just code — scalable and efficient by default.",
  },
];

const menuItems = [
  { name: "home", type: "scroll" },
  { name: "about", type: "scroll" },
  { name: "skills", type: "scroll" },
  { name: "journey", type: "scroll" },
  { name: "projects", type: "link", href: "/projects" },
  ...(BLOGS_ENABLED ? [{ name: "blogs", type: "link", href: "/blogs" }] : []),
  { name: "contact", type: "scroll" },
] as const;

const SECTION_IDS = BLOGS_ENABLED
  ? ["home", "about", "skills", "journey", "projects", "blogs", "contact"]
  : ["home", "about", "skills", "journey", "projects", "contact"];

// ─── Small pieces ───────────────────────────────────────────────────────────

const ProjectCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden border border-purple-500/20 bg-slate-800/30 animate-pulse h-[420px]">
    <div className="h-56 bg-slate-700/40" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-slate-700/40 rounded w-3/4" />
      <div className="h-4 bg-slate-700/40 rounded w-full" />
      <div className="h-4 bg-slate-700/40 rounded w-2/3" />
    </div>
  </div>
);

const BlogCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden border border-purple-500/20 bg-slate-800/30 animate-pulse h-[400px]">
    <div className="h-48 bg-slate-700/40" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-slate-700/40 rounded w-1/2" />
      <div className="h-4 bg-slate-700/40 rounded w-full" />
      <div className="h-4 bg-slate-700/40 rounded w-3/4" />
    </div>
  </div>
);

// ─── Component ───────────────────────────────────────────────────────────────

const PortfolioHome = () => {
  const { theme, setTheme } = useTheme();
  const { lang } = useLanguage();
  const t = T[lang];
  const navLabel = (name: string) => {
    const map: Record<string, string> = {
      home: t.navHome,
      about: t.navAbout,
      skills: t.navSkills,
      journey: t.navJourney,
      projects: t.navProjects,
      blogs: t.navBlogs,
      contact: t.navContact,
    };
    return map[name] ?? name.charAt(0).toUpperCase() + name.slice(1);
  };
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(BLOGS_ENABLED);
  const [result, setResult] = useState("");
  const { data: session } = useSession();

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    router.prefetch("/projects");
    if (BLOGS_ENABLED) router.prefetch("/blogs");
  }, [router]);

  // Nav-highlight fix: instead of comparing intersection *ratios* (which
  // got confused once About grew taller after folding Philosophy into it —
  // About would still "win" the ratio comparison even after Skills had
  // scrolled into view), we now just check each section's top position
  // directly against a fixed line near the top of the viewport. Whichever
  // section's top has most recently crossed that line is the active one.
  // This is deterministic and reacts correctly to both scroll AND
  // scrollIntoView (nav clicks), fixing the "About stays active" bug.
  useEffect(() => {
    let raf = 0;
    const ACTIVE_LINE = 160; // px from top of viewport

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);

        let current = SECTION_IDS[0];
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= ACTIVE_LINE) {
            current = id;
          }
        }
        setActiveSection((prev) => (prev === current ? prev : current));

        raf = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount so refresh mid-page highlights correctly
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
        }
        raf = 0;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    projectAPI
      .getAll()
      .then((res) => setFeaturedProjects((res.data?.data || []).slice(0, 3)))
      .catch(() => setFeaturedProjects([]))
      .finally(() => setProjectsLoading(false));

    if (BLOGS_ENABLED) {
      blogAPI
        .getAll()
        .then((res) => setFeaturedBlogs((res.data?.data || []).slice(0, 3)))
        .catch(() => setFeaturedBlogs([]))
        .finally(() => setBlogsLoading(false));
    }
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(t.formSending);
    const formData = new FormData(event.currentTarget);
    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_PROJECT_ID as string,
    );
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setResult(
          lang === "jp"
            ? "メッセージを送信しました！✅"
            : "Message Sent Successfully! ✅",
        );
        (event.target as HTMLFormElement).reset();
      } else {
        setResult(data.message);
      }
    } catch {
      setResult(t.formError);
    }
  };

  const dark = theme === "dark";

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${dark ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white" : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 text-gray-900"}`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse ${dark ? "bg-purple-500" : "bg-purple-200"}`}
        />
        <div
          className={`absolute top-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000 ${dark ? "bg-pink-500" : "bg-pink-200"}`}
        />
        <div
          className={`absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000 ${dark ? "bg-blue-500" : "bg-blue-200"}`}
        />
      </div>

      {/* Cursor Effect — DOM-ref only, never triggers a React re-render */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-screen will-change-transform ${dark ? "bg-purple-500/30" : "bg-purple-400/20"}`}
      />

      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? (dark ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-purple-500/10" : "bg-white/95 backdrop-blur-md shadow-lg shadow-purple-200/10") : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-pulse">
              <Sparkles className="inline mb-1" size={20} /> SAHA
            </div>

            <div className="hidden xl:flex space-x-1 items-center">
              {menuItems.map((item) =>
                item.type === "scroll" ? (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.name)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${activeSection === item.name ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50" : dark ? "text-gray-200 hover:text-white hover:bg-white/10" : "text-gray-800 hover:text-purple-600 hover:bg-purple-50"}`}
                  >
                    {navLabel(item.name)}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href as string}
                    prefetch={true}
                    className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${dark ? "text-gray-200 hover:text-white hover:bg-white/10" : "text-gray-800 hover:text-purple-600 hover:bg-purple-50"}`}
                  >
                    {navLabel(item.name)}
                  </Link>
                ),
              )}

              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />

              {session ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    prefetch={true}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                  >
                    <LayoutDashboard size={16} /> {t.navDashboard}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                  >
                    <LogOut size={16} /> {t.navLogout}
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  prefetch={true}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                >
                  <LogIn size={16} /> {t.navLogin}
                </Link>
              )}

              <LanguageToggle dark={dark} />

              <button
                onClick={toggleTheme}
                className="ml-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                {dark ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-gray-700" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 xl:hidden">
              <LanguageToggle dark={dark} />

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                {dark ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-gray-700" />
                )}
              </button>
              <button
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div
            className={`xl:hidden fixed inset-0 top-16 z-[9998] flex flex-col ${dark ? "bg-[#3A1C61] text-white" : "bg-white text-gray-900"}`}
            style={{ height: "calc(100vh - 64px)" }}
          >
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="flex flex-col space-y-1">
                {menuItems.map((item) => (
                  <div key={item.name}>
                    {item.type === "scroll" ? (
                      <button
                        onClick={() => {
                          scrollToSection(item.name);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${activeSection === item.name ? (dark ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30" : "bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 border border-purple-500/20") : dark ? "text-gray-200 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"}`}
                      >
                        {navLabel(item.name)}
                      </button>
                    ) : (
                      <Link
                        href={item.href as string}
                        prefetch={true}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block w-full px-4 py-3 rounded-xl text-base font-medium transition-all ${dark ? "text-gray-200 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"}`}
                      >
                        {navLabel(item.name)}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`p-4 border-t ${dark ? "border-gray-800 bg-slate-900" : "border-gray-200 bg-white"}`}
            >
              {session ? (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/dashboard"
                    prefetch={true}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/20"
                  >
                    <LayoutDashboard size={18} /> {t.navDashboard}
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 py-3 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-semibold transition-all"
                  >
                    <LogOut size={18} /> {t.navLogout}
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  prefetch={true}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/20"
                >
                  <LogIn size={18} /> Admin Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 pt-16 pb-8 relative"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className={`space-y-6 ${dark ? "text-white" : "text-gray-900"}`}>
            <div className="inline-flex mt-5 items-center gap-2 px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 text-white dark:text-purple-300 font-semibold text-sm animate-bounce">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500" />
              </span>
              {t.heroTag}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span
                className={`block mb-2 ${dark ? "text-gray-300" : "text-gray-600"}`}
              >
                {t.heroHiIm}
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                {t.name}
              </span>
            </h1>

            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full" />
              <h2
                className={`text-3xl md:text-4xl font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}
              >
                {t.heroTitle}
              </h2>
            </div>

            <p
              className={`text-xl leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`}
            >
              {t.heroDesc}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Saha_Jewel_Resume.pdf"
              >
                <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center gap-2">
                  <Download size={20} className="group-hover:animate-bounce" />
                  {t.downloadResume}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </a>
              <a
                href="/japanese_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Saha_Jewel_Resume.pdf"
              >
                <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center gap-2">
                  <Download size={20} className="group-hover:animate-bounce" />
                  {t.downloadResume}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </a>
              <button
                onClick={() => scrollToSection("contact")}
                className={`px-8 py-4 border-2 border-purple-500 rounded-full font-semibold transition-all backdrop-blur-sm flex items-center gap-2 ${dark ? "hover:bg-purple-500/20 text-white" : "hover:bg-purple-50 text-purple-600"}`}
              >
                <MessageSquare size={20} /> {t.letsTalk}
              </button>
            </div>

            <div className="flex gap-4 pt-4">
              {[
                {
                  icon: Github,
                  href: "https://github.com/Sahajewel",
                  color: dark ? "hover:bg-purple-600" : "hover:bg-purple-100",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/sahajewelkumar",
                  color: dark ? "hover:bg-blue-600" : "hover:bg-blue-100",
                },
                {
                  icon: Mail,
                  href: "mailto:jewelsaha072@email.com",
                  color: dark ? "hover:bg-pink-600" : "hover:bg-pink-100",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full ${social.color} transition-all transform hover:scale-110 hover:shadow-lg border ${dark ? "bg-slate-800/50 backdrop-blur-sm border-white/10" : "bg-white/50 backdrop-blur-sm border-gray-200"}`}
                >
                  <social.icon
                    size={24}
                    className={dark ? "text-white" : "text-gray-700"}
                  />
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 pt-6 text-sm">
              {[
                {
                  icon: Code,
                  color: dark ? "bg-purple-500/20" : "bg-purple-100",
                  iconColor: "text-purple-400",
                  label: t.statStackFocus,
                  value: t.statStackFocusValue,
                },
                {
                  icon: Briefcase,
                  color: dark ? "bg-pink-500/20" : "bg-pink-100",
                  iconColor: "text-pink-400",
                  label: t.statExperience,
                  value: t.statExperienceValue,
                },
                {
                  icon: Award,
                  color: dark ? "bg-blue-500/20" : "bg-blue-100",
                  iconColor: "text-blue-400",
                  label: t.statProjects,
                  value: t.statProjectsValue,
                },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}
                  >
                    <stat.icon size={16} className={stat.iconColor} />
                  </div>
                  <div>
                    <p className={dark ? "text-gray-300" : "text-gray-600"}>
                      {stat.label}
                    </p>
                    <p className="font-semibold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 animate-spin-slow">
                <div
                  className={`absolute top-0 left-1/2 w-4 h-4 rounded-full -translate-x-1/2 shadow-lg ${dark ? "bg-purple-500 shadow-purple-500/50" : "bg-purple-300 shadow-purple-300/50"}`}
                />
              </div>
              <div className="absolute inset-0 animate-spin-slow animation-delay-2000">
                <div
                  className={`absolute bottom-0 left-1/2 w-4 h-4 rounded-full -translate-x-1/2 shadow-lg ${dark ? "bg-pink-500 shadow-pink-500/50" : "bg-pink-300 shadow-pink-300/50"}`}
                />
              </div>
              <div className="absolute inset-0 animate-spin-slow animation-delay-4000">
                <div
                  className={`absolute top-1/2 right-0 w-4 h-4 rounded-full -translate-y-1/2 shadow-lg ${dark ? "bg-blue-500 shadow-blue-500/50" : "bg-blue-300 shadow-blue-300/50"}`}
                />
              </div>
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-1 animate-pulse-slow">
                <div
                  className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden border-4 ${dark ? "bg-slate-900 border-slate-900" : "bg-white border-white"}`}
                >
                  <Image
                    src="/saha.png"
                    alt="Saha Jewel Kumar - Full Stack Developer"
                    className="w-full h-full object-cover"
                    width={400}
                    height={400}
                    sizes="(max-width: 768px) 300px, 400px"
                    priority
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-purple-400" />
        </div>
      </section>

      {/* ── ABOUT (+ philosophy strip folded in) ── */}
      <section
        id="about"
        className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {t.aboutTitle}
              </span>
            </h2>
            <p className={dark ? "text-gray-300" : "text-gray-600"}>
              {t.aboutSub}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div
              className={`space-y-6 text-lg leading-relaxed ${dark ? "text-gray-300" : "text-gray-700"}`}
            >
              <p className="text-xl font-semibold">{t.aboutIntro}</p>
              <p>
                {t.aboutP2Pre}{" "}
                <span className="text-purple-400 font-semibold">
                  {t.aboutP2Years}
                </span>{" "}
                {t.aboutP2Post}
              </p>
              <p>
                {t.aboutP3Pre}{" "}
                <span className="text-pink-400 font-semibold">
                  {t.aboutP3Stack}
                </span>{" "}
                {t.aboutP3Post}
              </p>
              <p className="text-purple-400 italic">{t.aboutQuote}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Code,
                  title: t.cardCleanCodeTitle,
                  desc: t.cardCleanCodeDesc,
                  color: "from-purple-500 to-purple-600",
                },
                {
                  icon: Briefcase,
                  title: t.cardProblemSolverTitle,
                  desc: t.cardProblemSolverDesc,
                  color: "from-pink-500 to-pink-600",
                },
                {
                  icon: Award,
                  title: t.cardFastLearnerTitle,
                  desc: t.cardFastLearnerDesc,
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: Star,
                  title: t.cardTeamTitle,
                  desc: t.cardTeamDesc,
                  color: "from-green-500 to-green-600",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl border transition-all hover:scale-105 ${dark ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50" : "bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300"}`}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform`}
                  >
                    <item.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p
                    className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy — folded in as a compact strip, no longer its own section */}
          <div className="grid md:grid-cols-3 gap-4">
            {(lang === "jp" ? philosophyStripJP : philosophyStrip).map(
              (item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-xl border ${dark ? "bg-slate-800/30 border-purple-500/10" : "bg-white/40 border-purple-100"}`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p
                      className={`text-xs mt-0.5 ${dark ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section
        id="skills"
        className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative z-10"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {t.skillsTitle}
              </span>
            </h2>
            <p className={dark ? "text-gray-300" : "text-gray-600"}>
              {t.skillsSub}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`group p-6 rounded-xl border transition-all hover:shadow-lg ${dark ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10" : "bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300 hover:shadow-purple-200/10"}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="font-semibold">{skill.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 font-bold text-lg">
                      {skill.level}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${dark ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-700"}`}
                    >
                      {skill.category}
                    </span>
                  </div>
                </div>
                <div
                  className={`relative h-3 rounded-full overflow-hidden ${dark ? "bg-slate-900" : "bg-gray-200"}`}
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-purple-500/50"
                    style={{
                      width:
                        skill.level === "Expert"
                          ? "95%"
                          : skill.level === "Advanced"
                            ? "85%"
                            : skill.level === "Intermediate"
                              ? "70%"
                              : "50%",
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: t.catFrontend,
                color: dark
                  ? "from-purple-900/50 to-slate-900/50"
                  : "from-purple-50 to-white",
                border: dark ? "border-purple-500/20" : "border-purple-200",
                techs: ["React", "Next.js", "TypeScript", "Tailwind", "Redux"],
              },
              {
                title: t.catBackend,
                color: dark
                  ? "from-pink-900/50 to-slate-900/50"
                  : "from-pink-50 to-white",
                border: dark ? "border-pink-500/20" : "border-pink-200",
                techs: [
                  "Node.js",
                  "Express",
                  "Prisma",
                  "PostgreSQL",
                  "MongoDB",
                ],
              },
              {
                title: t.catDevOps,
                color: dark
                  ? "from-blue-900/50 to-slate-900/50"
                  : "from-blue-50 to-white",
                border: dark ? "border-blue-500/20" : "border-blue-200",
                techs: ["Git", "Docker", "AWS", "Vercel", "CI/CD"],
              },
            ].map((category, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${category.color} p-6 rounded-2xl backdrop-blur-sm border ${category.border} hover:scale-105 transition-all`}
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full" />
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.techs.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1.5 backdrop-blur-sm rounded-lg text-sm font-medium transition-all cursor-default ${dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNEY (merged Education + Experience + Achievement badges) ── */}
      <section
        id="journey"
        className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative z-10"
      >
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {t.journeyTitle}
              </span>
            </h2>
            <p className={dark ? "text-gray-300" : "text-gray-600"}>
              {t.journeySub}
            </p>
          </div>

          <div className="space-y-6">
            {journey.map((item, index) => (
              <div key={index} className="group relative">
                {index < journey.length - 1 && (
                  <div className="hidden md:block absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-purple-500 to-transparent" />
                )}
                <div
                  className={`rounded-2xl border p-8 transition-all hover:shadow-xl ${dark ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10" : "bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300 hover:shadow-purple-200/10"}`}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        {item.type === "education" ? (
                          <GraduationCap className="text-white" size={30} />
                        ) : (
                          <Building2 className="text-white" size={30} />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">
                            {item.title}
                          </h3>
                          <p className="text-xl text-purple-400 font-semibold">
                            {item.org}
                          </p>
                        </div>
                        <div className="text-right">
                          <div
                            className={`flex items-center gap-2 mb-2 ${dark ? "text-gray-300" : "text-gray-600"}`}
                          >
                            <Calendar size={16} />
                            <span>{item.duration}</span>
                          </div>
                          {item.location && (
                            <div
                              className={`flex items-center gap-2 ${dark ? "text-gray-300" : "text-gray-600"}`}
                            >
                              <MapPin size={16} />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <p
                        className={`mb-4 leading-relaxed ${dark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        {lang === "jp"
                          ? (journeyJP[item.title]?.description ??
                            item.description)
                          : item.description}
                      </p>

                      {item.badge && (
                        <div
                          className={`inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-xs font-semibold ${dark ? "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20" : "bg-yellow-50 text-yellow-700 border border-yellow-200"}`}
                        >
                          <Trophy size={12} />{" "}
                          {lang === "jp"
                            ? (journeyJP[item.title]?.badge ?? item.badge)
                            : item.badge}
                        </div>
                      )}

                      <ul className="space-y-1 mb-4">
                        {(lang === "jp"
                          ? (journeyJP[item.title]?.achievements ??
                            item.achievements)
                          : item.achievements
                        ).map((a, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-2 text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}
                          >
                            <span className="text-purple-400 mt-1">▸</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>

                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-3 py-1 rounded-full text-sm border ${dark ? "bg-purple-500/20 text-purple-300 border-purple-500/30" : "bg-purple-100 text-purple-700 border-purple-200"}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative z-10"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {t.projectsTitle}
              </span>
            </h2>
            <p className={dark ? "text-gray-300" : "text-gray-600"}>
              {t.projectsSub}
            </p>
          </div>

          {projectsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p
                className={`text-xl ${dark ? "text-gray-300" : "text-gray-600"}`}
              >
                No projects available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {featuredProjects.map((project: Project) => (
                <div
                  key={project.id}
                  className={`group rounded-2xl overflow-hidden border transition-all hover:scale-105 hover:shadow-2xl flex flex-col h-full ${dark ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20" : "bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"}`}
                >
                  <div className="relative overflow-hidden h-56 flex-shrink-0">
                    <Image
                      src={
                        project.thumbnail ||
                        "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop"
                      }
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      height={400}
                      width={400}
                      loading="lazy"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t opacity-80 ${dark ? "from-slate-900 via-slate-900/50 to-transparent" : "from-white via-white/50 to-transparent"}`}
                    />
                    {project.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                        <Star size={12} fill="white" /> Featured
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1 line-clamp-1">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-4 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <p
                        className={`text-sm leading-relaxed line-clamp-3 mb-4 ${dark ? "text-gray-300" : "text-gray-600"}`}
                      >
                        {project.description}
                      </p>
                      <div>
                        <h4 className="text-xs font-semibold text-purple-400 mb-2">
                          Technologies:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(project.technologies || [])
                            .slice(0, 4)
                            .map((tech: string, i: number) => (
                              <span
                                key={i}
                                className={`px-2 py-1 rounded text-xs border ${dark ? "bg-purple-500/20 text-purple-300 border-purple-500/30" : "bg-purple-100 text-purple-700 border-purple-200"}`}
                              >
                                {tech}
                              </span>
                            ))}
                          {(project.technologies || []).length > 4 && (
                            <span
                              className={`px-2 py-1 rounded text-xs border ${dark ? "bg-purple-500/20 text-purple-300 border-purple-500/30" : "bg-purple-100 text-purple-700 border-purple-200"}`}
                            >
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2 mt-auto">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 group"
                        >
                          <ExternalLink
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                          />{" "}
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center group ${dark ? "border border-purple-500 text-white hover:bg-purple-500/10" : "border border-purple-300 text-gray-700 hover:bg-purple-50"}`}
                        >
                          <Github
                            size={16}
                            className="group-hover:rotate-12 transition-transform"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/projects"
              prefetch={true}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/10 transition-all"
            >
              <BookOpen size={20} /> {t.viewAllProjects}
            </Link>
          </div>
        </div>
      </section>

      {/* ── BLOGS (re-enabled: 35+ real posts, not demo content) ── */}
      {BLOGS_ENABLED && (
        <section
          id="blogs"
          className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative z-10"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  Latest Blogs
                </span>
              </h2>
              <p className={dark ? "text-gray-300" : "text-gray-600"}>
                Thoughts and tutorials I've shared
              </p>
            </div>

            {blogsLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
              </div>
            ) : featuredBlogs.length === 0 ? (
              <div className="text-center py-12">
                <p
                  className={`text-xl ${dark ? "text-gray-300" : "text-gray-600"}`}
                >
                  No blogs available at the moment.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {featuredBlogs.map((blog: Blog) => (
                  <div
                    key={blog.id}
                    className={`group rounded-2xl overflow-hidden border transition-all hover:scale-105 hover:shadow-2xl flex flex-col h-full ${dark ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20" : "bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300 hover:shadow-purple-200/20"}`}
                  >
                    <div className="relative overflow-hidden h-48 flex-shrink-0">
                      <Image
                        src={
                          blog.thumbnail ||
                          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop"
                        }
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        height={400}
                        width={400}
                        loading="lazy"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t opacity-80 ${dark ? "from-slate-900 via-slate-900/50 to-transparent" : "from-white via-white/50 to-transparent"}`}
                      />
                    </div>
                    <div className="p-6 space-y-4 flex-grow flex flex-col">
                      <div className="flex-grow">
                        <div className="flex items-center justify-between text-sm mb-3">
                          <div
                            className={`flex items-center gap-2 ${dark ? "text-gray-300" : "text-gray-600"}`}
                          >
                            <User size={14} />
                            <span className="line-clamp-1">
                              {typeof blog.author === "string"
                                ? blog.author
                                : blog.author || "Admin"}
                            </span>
                          </div>
                          <div
                            className={`flex items-center gap-2 ${dark ? "text-gray-300" : "text-gray-600"}`}
                          >
                            <Clock size={14} />
                            <span className="whitespace-nowrap">
                              {Math.ceil(
                                (blog.content?.split(" ").length || 0) / 200,
                              )}{" "}
                              min
                            </span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-3 line-clamp-2">
                          {blog.title}
                        </h3>
                        <p
                          className={`text-sm leading-relaxed line-clamp-3 mb-4 ${dark ? "text-gray-300" : "text-gray-600"}`}
                        >
                          {blog.excerpt ||
                            blog.content?.substring(0, 150) ||
                            "Read more about this topic..."}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(blog.tags || [])
                            .slice(0, 3)
                            .map((tag: string, i: number) => (
                              <span
                                key={i}
                                className={`px-2 py-1 rounded text-xs border ${dark ? "bg-purple-500/20 text-purple-300 border-purple-500/30" : "bg-purple-100 text-purple-700 border-purple-200"}`}
                              >
                                {tag}
                              </span>
                            ))}
                          {(blog.tags || []).length > 3 && (
                            <span
                              className={`px-2 py-1 rounded text-xs border ${dark ? "bg-purple-500/20 text-purple-300 border-purple-500/30" : "bg-purple-100 text-purple-700 border-purple-200"}`}
                            >
                              +{blog.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        href={`/blogs/${blog.id}`}
                        prefetch={false}
                        className="w-full mt-auto px-4 py-2.5 text-purple-600 dark:text-purple-400 font-semibold rounded-lg hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2 group"
                      >
                        <Book size={16} /> Read More
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                href="/blogs"
                prefetch={true}
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/10 transition-all"
              >
                <BookOpen size={20} /> {t.viewAllBlogs}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative z-10"
      >
        <div className="max-w-4xl mx-auto w-full text-center">
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {t.contactTitle}
              </span>
            </h2>
            <p
              className={`text-xl leading-relaxed max-w-2xl mx-auto ${dark ? "text-gray-300" : "text-gray-600"}`}
            >
              {t.contactSub}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Mail,
                title: t.contactEmail,
                value: "jewelsaha072@email.com",
                href: "mailto:jewelsaha072@email.com",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Phone,
                title: t.contactPhone,
                value: "+81 80 5052 6822",
                href: "tel:+818050526822",
                color: "from-pink-500 to-pink-600",
              },
              {
                icon: Linkedin,
                title: t.contactLinkedInTitle,
                value: t.contactLinkedInValue,
                href: "https://www.linkedin.com/in/sahajewelkumar",
                color: "from-blue-500 to-blue-600",
              },
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target={contact.title === "LinkedIn" ? "_blank" : undefined}
                rel={
                  contact.title === "LinkedIn"
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`group p-8 rounded-2xl border transition-all hover:scale-105 hover:shadow-xl ${dark ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10" : "bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300 hover:shadow-purple-200/10"}`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform`}
                >
                  <contact.icon className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">{contact.title}</h3>
                <p className={dark ? "text-gray-300" : "text-gray-600"}>
                  {contact.value}
                </p>
              </a>
            ))}
          </div>

          <div
            className={`p-8 rounded-2xl border ${dark ? "bg-slate-800/50 backdrop-blur-sm border-purple-500/20" : "bg-white/50 backdrop-blur-sm border-purple-200"}`}
          >
            <h3 className="text-2xl font-bold mb-6">{t.sendMessage}</h3>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={t.formName}
                  className={`w-full px-4 py-3 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all ${dark ? "bg-slate-900/50 border border-purple-500/30 text-white" : "bg-white border border-purple-300 text-gray-900"}`}
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t.formEmail}
                  className={`w-full px-4 py-3 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all ${dark ? "bg-slate-900/50 border border-purple-500/30 text-white" : "bg-white border border-purple-300 text-gray-900"}`}
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder={t.formSubject}
                className={`w-full px-4 py-3 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all ${dark ? "bg-slate-900/50 border border-purple-500/30 text-white" : "bg-white border border-purple-300 text-gray-900"}`}
              />
              <textarea
                name="message"
                required
                rows={5}
                placeholder={t.formMessage}
                className={`w-full px-4 py-3 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all resize-none ${dark ? "bg-slate-900/50 border border-purple-500/30 text-white" : "bg-white border border-purple-300 text-gray-900"}`}
              />
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {t.formSend} <ArrowRight size={20} />
              </button>
            </form>
            {result && (
              <p
                className={`mt-4 font-medium ${dark ? "text-purple-400" : "text-purple-600"}`}
              >
                {result}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className={`relative z-10 py-12 border-t ${dark ? "bg-slate-900/80 backdrop-blur-sm border-purple-500/20" : "bg-white/80 backdrop-blur-sm border-purple-200"}`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
                Portfolio
              </h3>
              <p
                className={`leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`}
              >
                {t.footerTagline}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footerQuickLinks}</h4>
              <div className="space-y-2">
                {[
                  "about",
                  "skills",
                  "journey",
                  "projects",
                  ...(BLOGS_ENABLED ? ["blogs"] : []),
                  "contact",
                ].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link)}
                    className={`block transition-colors ${dark ? "text-gray-300 hover:text-purple-400" : "text-gray-700 hover:text-purple-600"}`}
                  >
                    {navLabel(link)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footerConnect}</h4>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com/Sahajewel" },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/sahajewelkumar",
                  },
                  { icon: Mail, href: "mailto:jewelsaha072@email.com" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg transition-all ${dark ? "bg-slate-800/50 hover:bg-purple-600" : "bg-gray-100 hover:bg-purple-100"}`}
                  >
                    <social.icon
                      size={20}
                      className={
                        dark
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-purple-600"
                      }
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div
            className={`border-t pt-8 text-center ${dark ? "border-purple-500/20 text-gray-300" : "border-purple-200 text-gray-600"}`}
          >
            <p>{t.footerRights}</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      `}</style>
    </div>
  );
};

export default PortfolioHome;

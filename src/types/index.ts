export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail?: string;
  published: boolean;
  views: number;
  tags: string[];
  metaTitle?: string;
  metaDesc?: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  readTime?: string;
  authorId: string;
}
export type ProjectCategory = "FULLSTACK" | "HTMLCSSJS" | "HTMLCSS" | "OTHERS";
export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  category: ProjectCategory;
}

export interface Resume {
  id: string;
  data: ResumeData;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  template?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: ProjectItem[];
  certifications: Certification[];
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 1-5
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}
// types/template.ts
export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  layout: "modern" | "professional" | "creative" | "minimal";
  sections: {
    showPhoto: boolean;
    skillStyle: "bars" | "tags" | "dots";
    experienceLayout: "timeline" | "cards";
  };
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean design with gradients and modern elements",
    colors: {
      primary: "#2563eb",
      secondary: "#1e40af",
      accent: "#3b82f6",
      background: "#ffffff",
      text: "#1f2937",
    },
    layout: "modern",
    sections: {
      showPhoto: false,
      skillStyle: "bars",
      experienceLayout: "timeline",
    },
  },
  {
    id: "professional",
    name: "Professional",
    description: "Corporate style suitable for traditional industries",
    colors: {
      primary: "#374151",
      secondary: "#111827",
      accent: "#6b7280",
      background: "#ffffff",
      text: "#1f2937",
    },
    layout: "professional",
    sections: {
      showPhoto: true,
      skillStyle: "tags",
      experienceLayout: "cards",
    },
  },
  {
    id: "creative",
    name: "Creative",
    description: "Colorful and creative design for design roles",
    colors: {
      primary: "#7c3aed",
      secondary: "#5b21b6",
      accent: "#8b5cf6",
      background: "#ffffff",
      text: "#1f2937",
    },
    layout: "creative",
    sections: {
      showPhoto: true,
      skillStyle: "dots",
      experienceLayout: "timeline",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and clean with maximum readability",
    colors: {
      primary: "#000000",
      secondary: "#374151",
      accent: "#6b7280",
      background: "#ffffff",
      text: "#1f2937",
    },
    layout: "minimal",
    sections: {
      showPhoto: false,
      skillStyle: "tags",
      experienceLayout: "cards",
    },
  },
];

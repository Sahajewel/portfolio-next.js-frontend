/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/categoryDetector.ts

/**
 * Detect project category based on technologies used
 */
export const detectProjectCategory = (technologies: string[]): string => {
  const techs = technologies.map((tech) => tech.toLowerCase());

  // FullStack Project Detection
  const fullStackTechs = [
    "next.js",
    "nextjs",
    "react",
    "angular",
    "vue",
    "node.js",
    "nodejs",
    "express",
    "nestjs",
    "spring",
    "django",
    "flask",
    "laravel",
    "prisma",
    "mongoose",
    "sequelize",
    "typeorm",
    "postgresql",
    "mysql",
    "mongodb",
    "redis",
    "docker",
    "aws",
    "vercel",
    "heroku",
  ];

  const hasBackend = techs.some((tech) =>
    [
      "node",
      "express",
      "nestjs",
      "spring",
      "django",
      "flask",
      "laravel",
      "prisma",
      "mongoose",
      "sequelize",
      "postgresql",
      "mysql",
      "mongodb",
    ].some((b) => tech.includes(b))
  );

  const hasFrontend = techs.some((tech) =>
    ["react", "next", "angular", "vue", "svelte", "tailwind", "bootstrap"].some(
      (f) => tech.includes(f)
    )
  );

  if (hasBackend && hasFrontend) {
    return "fullstack";
  }

  // HTML/CSS/JS Project Detection
  const jsTechs = ["javascript", "typescript", "jquery", "vanilla js"];
  const hasJS = techs.some((tech) => jsTechs.some((js) => tech.includes(js)));
  const hasHTMLCSS = techs.some((tech) =>
    ["html", "css", "bootstrap", "tailwind"].some((hc) => tech.includes(hc))
  );

  if (hasJS && hasHTMLCSS) {
    return "htmlcssjs";
  }

  // HTML/CSS Project Detection
  const onlyHTMLCSS = techs.every((tech) =>
    ["html", "css", "bootstrap", "tailwind"].some((hc) => tech.includes(hc))
  );

  if (onlyHTMLCSS) {
    return "htmlcss";
  }

  // Default to others
  return "others";
};

/**
 * Categorize projects from API response
 */
export const categorizeProjects = (projects: any[]): any[] => {
  return projects.map((project) => ({
    ...project,
    category:
      project.category || detectProjectCategory(project.technologies || []),
  }));
};

/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/api.ts
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// ⚡ API client with no-cache headers
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Cache prevention headers
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
  withCredentials: true,
});

// Request interceptor - প্রতিটা request এ timestamp add করবে cache bypass এর জন্য
api.interceptors.request.use((config) => {
  // Add timestamp to prevent caching
  if (config.method === "get") {
    config.params = {
      ...config.params,
      _t: Date.now(), // Cache buster
    };
  }
  return config;
});

// Type definitions
export type ProjectCategory =
  | "FULLSTACK"
  | "REACTTAILWINDJS"
  | "HTMLCSSJS"
  | "HTMLCSS"
  | "OTHERS";

export interface CreateProjectData {
  title: string;
  description: string;
  thumbnail?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  category?: ProjectCategory;
  featured?: boolean;
}

// Auth API
export const authAPI = {
  login: (data: { "email Or Username": string; password: string }) =>
    api.post("/user/login", data),
};

// Blog API
export const blogAPI = {
  // ⚡ Get all blogs with cache control
  getAll: () =>
    api.get("/blog", {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    }),

  // ⚡ Get blog by ID with cache control
  getById: (id: string) => {
    console.log("Calling blog API with ID:", id);
    return api.get(`/blog/${id}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  },

  // Create blog
  create: (data: any) => api.post("/blog/create-blog", data),

  // Update blog
  update: (id: string, data: any) => api.patch(`/blog/${id}`, data),

  // Delete blog
  delete: (id: string) => api.delete(`/blog/${id}`),
};

// Project API
export const projectAPI = {
  // ⚡ Get all projects with cache control
  getAll: () =>
    api.get("/project", {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    }),

  // ⚡ Get project by ID with cache control
  getById: (id: string) => {
    console.log("Calling project API with ID:", id);
    return api.get(`/project/${id}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  },

  // Get projects by category
  getByCategory: (category: ProjectCategory) => {
    console.log("Calling project API with category:", category);
    return api.get(`/project/category/${category}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  },

  // Create project with category
  create: (data: CreateProjectData) =>
    api.post("/project/create-project", data),

  // Update project
  update: (id: string, data: any) => api.patch(`/project/${id}`, data),

  // Delete project
  delete: (id: string) => api.delete(`/project/${id}`),
};

// User API
export const userAPI = {
  register: (data: any) => api.post("/user/register", data),

  getAllUsers: () =>
    api.get("/user", {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    }),

  getUserById: (id: string) =>
    api.get(`/user/${id}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    }),

  updateUser: (id: string, data: any) => api.patch(`/user/${id}`, data),

  deleteUser: (id: string) => api.delete(`/user/${id}`),
};

// Resume API
export const resumeAPI = {
  create: async (data: any) => {
    const response = await api.post("/resume/create-resume", data);
    return response;
  },

  getAll: async () => {
    const response = await api.get("/resume", {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
    return response;
  },

  getById: async (id: string) => {
    const response = await api.get(`/resume/${id}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
    return response;
  },

  update: async (id: string, data: any) => {
    const response = await api.patch(`/resume/${id}`, data);
    return response;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/resume/${id}`);
    return response;
  },
};

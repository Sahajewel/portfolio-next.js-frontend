// lib/server-api-utils.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

// ⚡ Get API client for server components with auth and no-cache
export const getAuthApiClient = async () => {
  const session = await getServerSession(authOptions);

  const { default: axios } = await import("axios");

  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
    headers: {
      "Content-Type": "application/json",
      // ⚡ Cache prevention headers
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      ...(session?.accessToken && {
        Authorization: `Bearer ${session.accessToken}`,
      }),
    },
  });

  // ⚡ Request interceptor - cache busting with timestamp
  client.interceptors.request.use((config) => {
    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: Date.now(), // Cache buster
      };
    }
    return config;
  });

  return client;
};

// Server-side API functions
export const serverBlogAPI = {
  getAll: async () => {
    const client = await getAuthApiClient();
    return client.get("/blog", {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
      },
    });
  },

  getBySlug: async (slug: string) => {
    const client = await getAuthApiClient();
    return client.get(`/blog/${slug}`, {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
      },
    });
  },

  getById: async (id: string) => {
    const client = await getAuthApiClient();
    return client.get(`/blog/${id}`, {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
      },
    });
  },
};

export const serverProjectAPI = {
  getAll: async () => {
    const client = await getAuthApiClient();
    return client.get("/project", {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
      },
    });
  },

  getById: async (id: string) => {
    const client = await getAuthApiClient();
    return client.get(`/project/${id}`, {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
      },
    });
  },
};

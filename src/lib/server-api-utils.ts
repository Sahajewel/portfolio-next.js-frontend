// lib/server-api-utils.ts
import { getServerSession } from 'next-auth';


import { authOptions } from './auth';

// Get API client for server components with auth
export const getAuthApiClient = async () => {
  const session = await getServerSession(authOptions);
  
  const { default: axios } = await import('axios');
  
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
    headers: {
      'Content-Type': 'application/json',
      ...(session?.accessToken && {
        Authorization: `Bearer ${session.accessToken}`
      })
    }
  });

  return client;
};

// Server-side API functions
export const serverBlogAPI = {
  getAll: async () => {
    const client = await getAuthApiClient();
    return client.get('/blog');
  },
  getBySlug: async (slug: string) => {
    const client = await getAuthApiClient();
    return client.get(`/blog/${slug}`);
  },
};

export const serverProjectAPI = {
  getAll: async () => {
    const client = await getAuthApiClient();
    return client.get('/project');
  },
  getById: async (id: string) => {
    const client = await getAuthApiClient();
    return client.get(`/project/${id}`);
  },
};
/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/api.ts
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// Simple API client
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Auth API
export const authAPI = {
  login: (data: { "email Or Username": string; password: string }) =>
    api.post('/user/login', data),
};

// Blog API
export const blogAPI = {
  getAll: () => api.get('/blog'),
getById: (id: string) => {
    console.log('Calling blog API with ID:', id);
    return api.get(`/blog/${id}`);
  },
  create: (data: any) => api.post('/blog/create-blog', data),
  update: (id: string, data: any) => api.patch(`/blog/${id}`, data),
  delete: (id: string) => api.delete(`/blog/${id}`),
};

// Project API  
export const projectAPI = {
  getAll: () => api.get('/project'),
  // getById: (id: string) => api.get(`/project/${id}`),
  getById: (id: string) => {
    console.log('Calling blog API with ID:', id);
    return api.get(`/project/${id}`);
  },
  create: (data: any) => api.post('/project/create-project', data),
  update: (id: string, data: any) => api.patch(`/project/${id}`, data),
  delete: (id: string) => api.delete(`/project/${id}`),
};

// User API
export const userAPI = {
  register: (data: any) => api.post('/user/register', data),
  getAllUsers: () => api.get('/user'),
  getUserById: (id: string) => api.get(`/user/${id}`),
  updateUser: (id: string, data: any) => api.patch(`/user/${id}`, data),
  deleteUser: (id: string) => api.delete(`/user/${id}`),
};
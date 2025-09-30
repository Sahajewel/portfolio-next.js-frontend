export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'USER' | 'ADMIN';
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
  author: User;
  authorId: string;
}

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
}
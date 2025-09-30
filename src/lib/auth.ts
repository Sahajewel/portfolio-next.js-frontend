/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authAPI } from './api';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        emailOrUsername: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.emailOrUsername || !credentials?.password) {
          throw new Error("Email/Username and password required");
        }

        try {
          // Use your existing backend API for authentication
          const response = await authAPI.login({
            "email Or Username": credentials.emailOrUsername,
            password: credentials.password
          });

          if (response.data.success) {
            const userData = response.data.date || response.data.data;
            
            return {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              username: userData.username,
              role: userData.role,
              token: userData.token
            };
          } else {
            throw new Error(response.data.message || "Login failed");
          }
        } catch (error: any) {
          throw new Error(error.response?.data?.message || "Login failed");
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username as string;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
        session.user.username = token.username as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    }
  }
};
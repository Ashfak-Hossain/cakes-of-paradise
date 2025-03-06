import { PrismaAdapter } from '@auth/prisma-adapter';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import { signOut } from 'next-auth/react';

import { db } from '@/lib/db';

export const config = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  trustHost: true,
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) return null;

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) return null;

          const { success, data } = await res.json();

          if (!success) return null;

          if (data?.user && data?.accessToken && data?.refreshToken) {
            const prefix = process.env.NODE_ENV === 'development' ? '__Dev-' : '';
            const cookieStore = await cookies();
            cookieStore.set(`${prefix}xxx.refresh-token`, data.refreshToken, {
              httpOnly: true,
              sameSite: 'strict',
              secure: process.env.NODE_ENV !== 'development',
            });
            return {
              ...data.user,
              accessToken: data.accessToken,
            };
          }
          return null;
        } catch (error) {
          console.error('Authorize error: ', error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = (user as any).accessToken;
      }

      if (token.accessToken && typeof token.accessToken === 'string') {
        try {
          const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);
          const { payload } = await jwtVerify(token.accessToken, secret);
          token.accessTokenExpires = (payload.exp as number) * 1000;
        } catch (_error) {
          token.error = 'RefreshAccessTokenError';
        }
      }

      if (token.accessTokenExpires && Date.now() > Number(token.accessTokenExpires)) {
        const cookieStore = await cookies();
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
            headers: { Cookie: cookieStore.toString() },
          });

          const { success, data } = await res.json();

          if (!res.ok || !success) throw new Error('RefreshAccessTokenError');

          const { accessToken: newAccessToken } = data;

          token.accessToken = newAccessToken;

          const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);
          const { payload } = await jwtVerify(newAccessToken, secret);
          token.accessTokenExpires = (payload.exp as number) * 1000;
        } catch (error) {
          console.error('Token refresh error: ', error);
          token.error = 'RefreshAccessTokenError';
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
      }

      if (token.error === 'RefreshAccessTokenError') {
        // Sign out the user
        signOut({ redirect: true, callbackUrl: '/' });
        // Perform server-side cleanup
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`, {
            method: 'DELETE',
          });
        } catch (error) {
          console.error('Server-side signout error:', error);
        }
      }

      if (token.error) {
        session.error = token.error as string;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, handlers } = NextAuth(config);

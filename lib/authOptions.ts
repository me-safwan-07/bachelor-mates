import type { IdentityProvider } from "@prisma/client";
import { prisma } from "@/prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./constants";
import { createUser, getUserByEmail, updateUser } from "./user/service";
import type { NextAuthOptions, Session } from "next-auth";
import { verifyPassword } from "./auth/utils";

// Extend the built-in session type to include user id
interface ExtendedSession extends Session {
  user: {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email Address", type: "email", placeholder: "Your email address" },
        password: { label: "Password", type: "password", placeholder: "Your password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          const user = await prisma.user.findFirst({
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          const isValidPassword = await verifyPassword(credentials.password, user.password);
          
          if (!isValidPassword) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user.id,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.imageUrl,
            name: user.name,
          };
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    }),

    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID || "",
      clientSecret: GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }): Promise<ExtendedSession> {
      const extendedSession = session as ExtendedSession;
      if (extendedSession.user && token) {
        extendedSession.user.id = token.id as string;
        extendedSession.user.email = token.email;
        extendedSession.user.name = token.name;
        extendedSession.user.image = token.picture;
      }
      return extendedSession;
    },

    async signIn({ user, account }) {
      if (!user.email) return false;

      if (account?.provider === "credentials") {
        return true;
      }

      if (account?.provider === "google") {
        const existingUser = await getUserByEmail(user.email);

        if (existingUser) {
          // If user exists, update their Google account info
          await updateUser(existingUser.id, {
            name: user.name || existingUser.name,
            imageUrl: user.image,
          });
          return true;
        }

        // Create new user if they don't exist
        await createUser({
          name: user.name || user.email.split("@")[0],
          email: user.email,
          emailVerified: new Date(),
          identityProvider: "google" as IdentityProvider,
          identityProviderAccountId: account.providerAccountId,
        });
        return true;
      }

      return false;
    },
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/login",
  },
  
  session: {
    strategy: "jwt",
  },
};

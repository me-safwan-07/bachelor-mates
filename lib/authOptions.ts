import type { IdentityProvider } from "@prisma/client";
import { prisma } from "@/prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./constants";
import { verifyToken } from "./jwt";
import { createUser, getUserByEmail, updateUser } from "./user/service";
import { createAccount } from "./account/service";
import type { NextAuthOptions } from "next-auth";


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

          return {
            id: user.id,
            email: user.email,
            emailVerified: user.emailVerified,
            imageUrl: user.imageUrl,
          };
        } catch (error) {
          console.error(error);
          throw new Error("Internal server error");
        }
      },
    }),

    CredentialsProvider({
      id: "token",
      name: "Token",
      credentials: {
        token: { label: "Verification Token", type: "string" },
      },
      async authorize(credentials) {
        let user;
        
        try {
          if (!credentials?.token) {
            throw new Error("Token not found");
          }

          const { id } = await verifyToken(credentials.token);
          user = await prisma.user.findUnique({
            where: {
              id: id,
            }
          });
        } catch (error) {
          console.error(error);
          throw new Error("Either a user does not match the provided token or the token is invalid");
        }

        if (!user) {
          throw new Error("Either a user does not match the provided token or the token is invalid");
        }
  
        if (user.emailVerified) {
          throw new Error("Email already verified");
        }
  
        user = await updateUser(user.id, { emailVerified: new Date() });

        return user;
      },
    }),

    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID || "",
      clientSecret: GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  callbacks: {
    async jwt({ token }) {
      if (!token.email) return token;

      const existingUser = await getUserByEmail(token?.email);

      if (!existingUser) {
        return token;
      }

      return {
        ...token,
        profile: existingUser || null,
      }
    },

    async session({ session, token }) {
      // @ts-expect-error - Token type doesn't include id property
      session.user.id = token?.id;
      // @ts-expect-error - Assigning token profile to session user
      session.user = token.profile;

      return session;
    },

    async signIn({ user, account }: any) {
      // if (!account || !user) return false;

      if (account.provider === "credentials" || account.provider === "token") {
        if (!user.emailVerified) {
          throw new Error("Email verification is pending");
        }
        return true;
      }

      if (!user.email || account.type !== "oauth") {
        return false;
      }

      if (account.provider) {
          const provider = account.provider.toLowerCase().replace("-", "") as IdentityProvider;
          // check if accounts for this provider / account Id already exists

          const existingUserWithAccount = await prisma.user.findFirst({
            include: {
              accounts: { 
                where: { 
                  provider: account.provider 
                } 
              },
            },
            where: {
              identityProvider: provider,
              identityProviderAccountId: account.providerAccountId,
            },
          });

        if (existingUserWithAccount) {
          // User with this provider found
          // Check if email still the same
          if (existingUserWithAccount.email === user.email) {
            return true;
          }

          // user seemed to change his email within the provider
          // check if user with this email already exist
          // if not found just update user with new email address
          // if found throw an error (TODO find better solution)
          const otherUserWithEmail = await getUserByEmail(user.email);

          if (!otherUserWithEmail) {
            await updateUser(existingUserWithAccount.id, { email: user.email });
            return true;
          }

          throw new Error(
            "Looks like you updated your email somewhere else. A usesr with this new email exists already."
          );
        }

        // There is no existing account for this identity provider / account id
        // check if user account with this email already exists
        // if user already exists throw error and request password login
        const existingUserWithEmail = await getUserByEmail(user.email);

        if (existingUserWithEmail) {
          throw new Error("A user with this email exists already.");
        }

        const userProfile = await createUser({
          name: user.name || user.email.split("@")[0],
          email: user.email,
          emailVerified: new Date(),
          identityProvider: provider,
          identityProviderAccountId: account.providerAccountId ?? "",
        });

        await createAccount({
          ...account,
          userId: userProfile.id,
        });

        return true;
      }

      return true;
    },
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/login", // Error code passed in query string as ? error=
  },
};

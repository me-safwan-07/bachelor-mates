// import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { z } from "zod";
// import { prisma } from "@/prisma";

import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//     } & DefaultSession["user"]
//   }
// }

// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { email, password } = loginSchema.parse(credentials);

//         const user = await prisma.user.findFirst({ 
//           where: { 
//             email: email 
//           } 
//         });
        
//         if (!user || !user.password) throw new Error("Invalid credentials");

//         const isValid = await bcrypt.compare(password, user.password);
//         if (!isValid) throw new Error("Invalid credentials");

//         return user;
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt" as const,
//   },
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       console.log("User:", user);
//       console.log("Account", account);
//       console.log("Profile", profile);
//       return true;
//     },
//     async jwt({ token, user }) {
//       if (user) token.id = user.id;
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

export const fetchCache = "force-no-store";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
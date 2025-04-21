import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaClientSingleton = () => {
  const client = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
    ...(process.env.DEBUG === "1" && {
      log: ["query", "info"],
    }),
  }).$extends(withAccelerate());

  console.log("Database connected");
  return client;
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        GOOGLE_CLIENT_ID: z.string().optional(),
        GOOGLE_CLIENT_SECRET: z.string().optional(),
        NEXTAUTH_SECRET: z.string().min(1),
        NEXTAUTH_URL: z.string().url().optional(),
        PRIVACY_URL: z
            .string()
            .url()
            .optional()
            .or(z.string().refine((str) => str === "")),
        TERMS_URL: z
            .string()
            .url()
            .optional()
            .or(z.string().refine((str) => str === "")),
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        TERMS_URL: process.env.TERMS_URL,
        PRIVACY_URL: process.env.PRIVACY_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    }
})
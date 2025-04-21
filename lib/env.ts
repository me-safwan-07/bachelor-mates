import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DEBUG: z.enum(["1", "0"]).optional(),
        DATABASE_URL: z.string(),
        GOOGLE_CLIENT_ID: z.string().optional(),
        GOOGLE_CLIENT_SECRET: z.string().optional(),
        MAIL_FROM: z.string().email().optional(),
        NEXTAUTH_SECRET: z.string().min(1),
        NEXTAUTH_URL: z.string().url().optional(),
        SMTP_PORT: z.string().min(1).optional(),
        SMTP_HOST: z.string().min(1).optional(),
        SMTP_PASSWORD: z.string().min(1).optional(),
        SMTP_SECURE_ENABLED: z.enum(["1", "0"]).optional(),
        SMTP_USER: z.string().min(1).optional(),
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
        ADMIN_EMAIL: z.string().email().optional(),
        ADMIN_NAME: z.string().optional(),
        ADMIN_PASSWORD: z.string().optional(),
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        DEBUG: process.env.DUBUG,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        TERMS_URL: process.env.TERMS_URL,
        PRIVACY_URL: process.env.PRIVACY_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_SECURE_ENABLED: process.env.SMTP_SECURE_ENABLED,
        SMTP_USER: process.env.SMTP_USER,
        MAIL_FROM: process.env.MAIL_FROM,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_NAME: process.env.ADMIN_NAME,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    }
})
import { z } from "zod";

export const ZId = z.string().cuid2();

export const ZUser = z.object({
  id: z.string(),
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(1, { message: "Name should be at least 1 character long" }),
  email: z.string().email(),
  password: z.string().optional(),
  emailVerified: z.date().nullable(),
  imageUrl: z.string().url().nullable(),
  identityProvider: z.enum(["email", "google"]),
  identityProviderAccountId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
//   role: ZRole.nullable(),
});

export type TUser = z.infer<typeof ZUser>;

export const ZUserUpdateInput = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    emailVerified: z.date().nullish(),
    // role: ZRole.optional()
    imageUrl: z.string().nullish(),
});

export type TUserUpdateInput = z.infer<typeof ZUserUpdateInput>;

export const ZUserCreateInput = z.object({
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(1, { message: "Name should be at least 1 character long" }),
  email: z.string().email(),
  emailVerified: z.date().optional(),
  identityProvider: z.enum(["email", "google"]),
  identityProviderAccountId: z.string().optional(),
});

export type TUserCreateInput = z.infer<typeof ZUserCreateInput>;
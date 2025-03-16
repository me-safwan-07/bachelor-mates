import "server-only";
import { env } from "./env";

// URLs
// export const WEBAPP_URL =
//   env.WEBAPP_URL || (env.VERCEL_URL ? `https://${env.VERCEL_URL}` : false) || "http://localhost:3000";
export const WEBAPP_URL = "http://localhost:3000"

// other
export const PRIVACY_URL = env.PRIVACY_URL;
export const TERMS_URL = env.TERMS_URL;

export const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;
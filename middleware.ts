import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    return NextResponse.next();
}

export const config = {
    matcher: ["/protected", "/auth/register"],
}
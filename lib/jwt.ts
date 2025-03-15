import { prisma } from "@/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "process";


export const verifyToken = async (token: string, userEmail: string = ""): Promise<JwtPayload> => {
    if (!token) {
        throw new Error("No token found");
    }
    const decoded = jwt.decode(token);
    const payload: JwtPayload = decoded as JwtPayload;
    const { id } = payload;

    if (!userEmail) {
        const foundUser = await prisma.user.findUnique({
            where: { id },
        });

        if (!foundUser || !foundUser.email) {
            throw new Error("User not found or has no email");
        }

        userEmail = foundUser.email;
    }

    return jwt.verify(token, env.NEXTAUTH_SECRET + userEmail) as JwtPayload;
}
import { sendVerificationEmail } from "@/email";
import { prisma } from "@/prisma";

export const POST = async (request: Request) => {
    const { email } = await request.json();
    // Check for user in DB
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return Response.json({ error: "No user with this email address found" }, { status: 404 });
        }
        if (user.emailVerified) {
            return Response.json({ error: "Email address has already been verified" }, { status: 400 });
        }
        await sendVerificationEmail(user);
        return Response.json(user);
    } catch (e: any) {
        return Response.json(
            {
                error: e.message,
                errorCode: e.code,
            },
            { status: 500 }
        );
    }
};
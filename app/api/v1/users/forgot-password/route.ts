import { sendForgotPasswordEmail } from "@/email";
import { prisma } from "@/prisma";

export const POST = async (request: Request) => {
    const { email } = await request.json();

    try {
        const foundUser = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase(),
            },
        });

        if (!foundUser) {
            return Response.json({ error: "No user with this email found" }, { status: 409 });
        }
        
        await sendForgotPasswordEmail(foundUser);
        return Response.json({});
    } catch (error: unknown) {
        if (error instanceof Error) {
            return Response.json(
                {
                    error: error.message,
                    errorCode: error.name,
                },
                { status: 500 }
            );
        }
        return Response.json(
            {
                error: "An unknown error occurred",
                errorCode: "UNKNOWN_ERROR",
            },
            { status: 500 }
        );
    }
};
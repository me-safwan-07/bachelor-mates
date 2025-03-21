import { hashPassword } from "@/lib/auth/utils";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "password must be at least 6 characters"),
});

export async function POST(req: Request) {
    try {
        const { name, email, password } = registerSchema.parse(await req.json());

        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return NextResponse.json({ user }, { status: 201 }); 
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Validation failed", details: error.errors },
                { status: 400 }
            );
        }
        console.error(error)

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
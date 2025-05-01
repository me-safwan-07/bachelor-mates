import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { 
            name,
            degree,
            stream,
            semester,
            accessType,
            price,
            uploaderId,
            images,
        } = body;

        console.log(`body data: ${body}`);

        if (!name || !degree || !semester || !accessType || !uploaderId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        const note = await prisma.notes.create({
            data: {
                name,
                degree,
                stream,
                semester,
                accessType,
                price,
                uploaderId,
                images: {
                    create: images.map((img: { url: string }) => ({
                      url: img.url,
                    })) || [],
                }
                  
            },
            include: {
                images: true,
            }
        });

        return NextResponse.json(note, { status: 201 });
    } catch (error) {
        console.error("Error creating note:", error);
        console.log(error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
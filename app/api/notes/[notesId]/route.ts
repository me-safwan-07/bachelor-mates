import { NextRequest, NextResponse } from "next/server";
import { getNoteById } from "@/lib/notes/services";


export async function GET(
  request: NextRequest, 
  context: { params: Promise<{ notesId: string }> } & Record<string, any>
): Promise<NextResponse> {
  // Wait for params to be available
  
  try {
    // Await the  params promise
    const { notesId } = await context.params;

    const result = await getNoteById(notesId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching note:", error);
    return NextResponse.json({ error: "Failed to fetch note" }, { status: 500 });
  }
}

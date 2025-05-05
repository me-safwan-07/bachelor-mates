import { type NextRequest, NextResponse } from "next/server"
import { deleteNotes, getNotes } from "@/lib/notes/services"

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get("page") || "1"
    const limit = searchParams.get("limit") || "10"
    const search = searchParams.get("search") || undefined
    const categories = searchParams.get("categories") || undefined

    // Call the getNotes service with the filters
    const result = await getNotes({
      page,
      limit,
      search,
      categories,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching notes:", error)
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 })
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body.id;

    if (!id) {
      return NextResponse.json({ message: 'Note ID is required in body' }, { status: 400 });
    }

    const deletedNote = await deleteNotes(id);
    return NextResponse.json({ message: 'Note deleted successfully', deletedNote });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

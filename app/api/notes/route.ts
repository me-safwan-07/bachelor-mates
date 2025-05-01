import { type NextRequest, NextResponse } from "next/server"
import { getNotes } from "@/lib/notes/services"

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

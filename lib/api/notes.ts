// lib/api/fetchNotes.ts
import { NotesResponse } from "@/types/notes"

interface FetchNotesParams {
  page: number
  limit: number
  search?: string
  selectedDegree?: string
}

export async function getNotes({
  page,
  limit,
  search,
  selectedDegree,
}: FetchNotesParams): Promise<NotesResponse> {
  const params = new URLSearchParams()
  params.append("page", page.toString())
  params.append("limit", limit.toString())

  if (search) params.append("search", search)
  if (selectedDegree) params.append("categories", selectedDegree)

  const response = await fetch(`/api/notes?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  const data: NotesResponse = await response.json()
  return data
}


export async function getNoteById({notesId} : { notesId: string }) {
  const response  = await fetch(`/api/notes/${notesId}`)

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  const data = await response.json();
  
  return data;
}
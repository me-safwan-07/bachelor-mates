// app/notes/page.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { Note } from "@/types/notes"
import { NotesTable } from "./components/NotesTable"
import { NotesPagination } from "./components/NotesPagination"
import { DeleteNoteDialog } from "./components/DeleteNoteDialog"
import { NotesHeader } from "./components/NotesHeader"
import { NotesToolbar } from "./components/NotesToolbar"
import { getNotes } from "@/lib/api/notes"
// import { useRouter } from 'next/navigation'

export default function NotesPage() {
  // const router = useRouter()
  const limit = 10;

  const [notes, setNotes] = useState<Note[]>([])
  const [totalNotes, setTotalNotes] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [selectedDegree, setSelectedDegree] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const fetchNotes = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getNotes({ page, limit, search, selectedDegree })
  
      if (data.notes.length === 0 && page > 1) {
        setPage((prev) => prev - 1)
      } else {
        setNotes(data.notes)
        setTotalNotes(data.total_Notes)
      }
    } catch (error) {
      console.error("Error fetching notes:", error)
      setError("Failed to load notes. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [page, limit, search, selectedDegree])
  
  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1) // Reset to first page on new search
  }

  const handleDeleteClick = (id: string) => {
    setNoteToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!noteToDelete) return

    setIsDeleting(true)
    try {
      
      const response = await fetch(`/api/notes`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: noteToDelete }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete note")
      }

      // const response = await deleteNotes(noteToDelete);

      // if (!response) {
      //   throw new Error("Failed to delete note")
      // }

      // Close the dialog
      setDeleteDialogOpen(false)
      setNoteToDelete(null)

      // Show success toast
      toast({
        title: "Note deleted",
        description: "The note has been successfully deleted.",
        variant: "default",
      })

      // Refresh the notes list
      await fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error)
      toast({
        title: "Error",
        description: "Failed to delete the note. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const totalPages = Math.max(1, Math.ceil(totalNotes / limit))

  return (
    <div className="p-6 space-y-6">
      <NotesHeader  />

      <NotesToolbar
        search={search}
        selectedDegree={selectedDegree}
        onSearchChange={setSearch}
        onDegreeChange={(degree) => {
          setSelectedDegree(degree)
          setPage(1)
        }}
        onSearchSubmit={handleSearch}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <NotesTable notes={notes} loading={loading} onDeleteClick={handleDeleteClick} />

      <NotesPagination
        page={page}
        totalPages={totalPages}
        totalItems={totalNotes}
        onPageChange={setPage}
      />

      <DeleteNoteDialog
        open={deleteDialogOpen}
        isDeleting={isDeleting}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
      />

      <Toaster />
    </div>
  )
}
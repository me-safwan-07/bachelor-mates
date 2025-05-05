// components/notes/NotesTable.tsx
"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/Button"
import { FileImage, FileText, MoreVertical, Trash2 } from "lucide-react"
import Image from "next/image"
import { Images, Note } from "@/types/notes"
import Link from "next/link"
import { IconFileTypePdf } from "@tabler/icons-react"

interface NotesTableProps {
  notes: Note[]
  loading: boolean
  onDeleteClick: (id: string) => void
}

export function NotesTable({ notes, loading, onDeleteClick }: NotesTableProps) {
  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>IMAGE</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Degree</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Access Type</TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead>Uploader</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableLoadingSkeleton />
          ) : notes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                No notes found
              </TableCell>
            </TableRow>
          ) : (
            notes.map((note) => (
              <TableRow key={note.id}>
                <TableCell>
                  <NoteImage images={note.images} name={note.name} />
                </TableCell>
                <TableCell className="font-medium">{note.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{note.degree}</Badge>
                </TableCell>
                <TableCell>Semester {note.semester}</TableCell>
                <TableCell>
                  <Badge variant={note.accessType === "FREE" ? "secondary" : "default"}>
                    {note.accessType}
                  </Badge>
                </TableCell>
                <TableCell>{note.price ? `₹${note.price.toFixed(2)}` : "Free"}</TableCell>
                <TableCell>{note.uploader}</TableCell>
                <TableCell className="text-right">
                  <NoteActionsDropdown onDeleteClick={() => onDeleteClick(note.id)} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function TableLoadingSkeleton() {
  return Array.from({ length: 3 }).map((_, index) => (
    <TableRow key={`loading-${index}`}>
      <TableCell>
        <div className="h-16 w-16 rounded bg-gray-200 animate-pulse"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-8 bg-gray-200 rounded animate-pulse ml-auto"></div>
      </TableCell>
    </TableRow>
  ))
}


function NoteImage({ images, name }: { images: Images[]; name: string }) {
  const file = images?.[0]
  const fileUrl = file?.url
  const fileExtension = fileUrl?.split(".").pop()?.toLowerCase()

  const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension || "")
  const isPDF = fileExtension === "pdf"
  const isDoc = ["doc", "docx"].includes(fileExtension || "")

  return (
    <div className="h-16 w-16 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
      {!fileUrl ? (
        <span className="text-xs text-gray-500">No file</span>
      ) : isImage ? (
        <Image
          src={fileUrl}
          alt={name}
          className="h-full w-full object-cover"
          width={100}
          height={100}
        />
      ) : (
        <Link href={fileUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-xs text-gray-600">
          {isPDF ? (
            <IconFileTypePdf className="h-6 w-6 text-red-500" />
          ) : isDoc ? (
            <FileText className="h-6 w-6 text-blue-500" />
          ) : (
            <FileImage className="h-6 w-6 text-gray-500" />
          )}
          <span className="truncate w-12 mt-1">View</span>
        </Link>
      )}
    </div>
  )
}


function NoteActionsDropdown({ onDeleteClick }: { onDeleteClick: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>View Details</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive flex items-center gap-2" onClick={onDeleteClick}>
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
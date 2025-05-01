"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Plus, Filter, MoreVertical, Search } from "lucide-react"
import Link from "next/link"

// Types based on your Prisma schema
type AccessType = "FREE" | "PAID"
type Degree = "BCOM" | "BBA" | "BCA"

interface Image {
  url: string
}

interface Note {
  id: string
  name: string
  accessType: AccessType
  degree: Degree
  stream: string | null
  semester: number
  price: number | null
  uploader: string
  images: Image[]
  createdAt: string
  updatedAt: string
}

interface NotesResponse {
  total_Notes: number
  notes: Note[]
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [totalNotes, setTotalNotes] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState("")
  const [selectedDegree, setSelectedDegree] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchNotes()
  }, [page, limit, search, selectedDegree])

  const fetchNotes = async () => {
    setLoading(true)
    setError(null)
    try {
      // Build query parameters
      const params = new URLSearchParams()
      params.append("page", page.toString())
      params.append("limit", limit.toString())

      if (search) params.append("search", search)
      if (selectedDegree) params.append("categories", selectedDegree)

      // In a real app, you would fetch from your API
      const response = await fetch(`/api/notes?${params.toString()}`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data: NotesResponse = await response.json()

      setNotes(data.notes)
      setTotalNotes(data.total_Notes)
    } catch (error) {
      console.error("Error fetching notes:", error)
      setError("Failed to load notes. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1) // Reset to first page on new search
    fetchNotes()
  }

  const totalPages = Math.max(1, Math.ceil(totalNotes / limit))

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Notes</h1>
          <p className="text-muted-foreground">Manage notes (Server side table functionalities.)</p>
        </div>
        <Link href="/admin-dashboard/notes/new">
            <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New
            </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:max-w-sm">
          <form onSubmit={handleSearch}>
            <Input
              type="search"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </form>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Degrees
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedDegree("")}>All Degrees</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDegree("BCOM")}>BCOM</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDegree("BBA")}>BBA</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDegree("BCA")}>BCA</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select
            value={limit.toString()}
            onValueChange={(value) => {
              setLimit(Number(value))
              setPage(1)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rows per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 per page</SelectItem>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

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
              Array.from({ length: 3 }).map((_, index) => (
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
                    <div className="h-16 w-16 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                      {note.images && note.images.length > 0 ? (
                        <img
                          src={note.images[0].url || "/placeholder.svg?height=64&width=64"}
                          alt={note.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-500">No image</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{note.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{note.degree}</Badge>
                  </TableCell>
                  <TableCell>Semester {note.semester}</TableCell>
                  <TableCell>
                    <Badge variant={note.accessType === "FREE" ? "secondary" : "default"}>{note.accessType}</Badge>
                  </TableCell>
                  <TableCell>{note.price ? `₹${note.price.toFixed(2)}` : "Free"}</TableCell>
                  <TableCell>{note.uploader}</TableCell>
                  <TableCell className="text-right">
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
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">{totalNotes} note(s) total</p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around the current page
              let pageNumber
              if (totalPages <= 5) {
                pageNumber = i + 1
              } else if (page <= 3) {
                pageNumber = i + 1
              } else if (page >= totalPages - 2) {
                pageNumber = totalPages - 4 + i
              } else {
                pageNumber = page - 2 + i
              }

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink onClick={() => setPage(pageNumber)} isActive={page === pageNumber}>
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            {totalPages > 5 && page < totalPages - 2 && (
              <>
                <PaginationItem>
                  <PaginationLink>...</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(totalPages)}>{totalPages}</PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

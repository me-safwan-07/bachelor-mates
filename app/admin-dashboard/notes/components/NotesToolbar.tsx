// components/notes/NotesToolbar.tsx
"use client"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Filter, Search } from "lucide-react"
import { FormEvent } from "react"

interface NotesToolbarProps {
  search: string
  selectedDegree: string
  onSearchChange: (value: string) => void
  onDegreeChange: (value: string) => void
  onSearchSubmit: (e: FormEvent) => void
}

export function NotesToolbar({
  search,
  onSearchChange,
  onDegreeChange,
  onSearchSubmit,
}: NotesToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="relative w-full md:max-w-sm">
        <form onSubmit={onSearchSubmit}>
          <Input
            type="search"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
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
            <DropdownMenuItem onClick={() => onDegreeChange("")}>All Degrees</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDegreeChange("BCOM")}>BCOM</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDegreeChange("BBA")}>BBA</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDegreeChange("BCA")}>BCA</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  )
}
// components/notes/NotesHeader.tsx
"use client"

import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function NotesHeader() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Notes</h1>
        <p className="text-muted-foreground">Manage notes (Server side table functionalities.)</p>
      </div>
      <Link href={'/admin-dashboard/notes/new'}>
        <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New
        </Button>
    </Link>
    </div>
  )
}
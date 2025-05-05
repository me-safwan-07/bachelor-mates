// components/notes/NotesPagination.tsx
"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface NotesPaginationProps {
  page: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
}

export function NotesPagination({ page, totalPages, totalItems, onPageChange }: NotesPaginationProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">{totalItems} note(s) total</p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, page - 1))}
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
                <PaginationLink onClick={() => onPageChange(pageNumber)} isActive={page === pageNumber}>
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
                <PaginationLink onClick={() => onPageChange(totalPages)}>{totalPages}</PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
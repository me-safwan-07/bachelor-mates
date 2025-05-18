"use client"

import { useState, useRef, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"
import { Loader2, LockIcon } from "lucide-react"

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

// Browser-side code only
if (typeof window === "undefined") {
  throw new Error('PDF viewer is only available in browser')
}

interface PDFViewerProps {
  pdfUrl: string
  isPaid: boolean
  maxFreePages?: number
}

export default function PDFViewer({ 
  pdfUrl, 
  isPaid, 
  maxFreePages = 5 
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(800)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const updateWidth = () => {
    if (containerRef.current) {
      setWidth(containerRef.current.clientWidth)
    }
  }

  useEffect(() => {
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  return (
    <div ref={containerRef} className="w-full">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin h-12 w-12 text-primary" />
          </div>
        }
        error={<div className="text-red-600 p-4">Failed to load PDF</div>}
      >
        {Array.from(new Array(numPages || 1), (_, index) => {
          const pageNumber = index + 1
          
          if (!isPaid || pageNumber <= maxFreePages) {
            return (
              <Page
                key={`page_${pageNumber}`}
                pageNumber={pageNumber}
                width={width}
                className="border-b border-gray-200 mb-4"
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            )
          }

          return (
            <div key={`page_${pageNumber}`} className="relative h-[1200px] w-full">
              <div className="absolute inset-0 backdrop-blur-sm bg-gray-100/70" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-white/90 p-6 rounded-xl shadow-lg max-w-sm">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LockIcon className="text-red-600 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Premium Content</h3>
                  <p className="mb-4 text-gray-700">
                    Purchase to view all {numPages} pages
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </Document>
    </div>
  )
}
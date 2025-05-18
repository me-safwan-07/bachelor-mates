"use client"

import React, { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import type { Note } from "@/types/notes"
import { Button } from "@/components/ui/Button"
import { getNoteById } from "@/lib/api/notes"
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import { LockIcon, CreditCard, Download, Eye, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast";
import dynamic from "next/dynamic"
// import { authOptions } from "@/lib/authOptions"
// import { getUser } from "@/lib/user/service"
// import { getServerSession } from "next-auth"

const PDFViewer = dynamic(() => import("@/components/pdf-preview"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="animate-spin h-12 w-12 text-primary" />
    </div>
  )
})

const Page = () => {
  const { notesId } = useParams()
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  // const [currentPage, setCurrentPage] = useState(0)
  const viewerContainerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  // const isMobile = useMobile()

  // PDF viewer plugins
  // const defaultLayoutPluginInstance = defaultLayoutPlugin()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getNoteById({ notesId: notesId as string })
        setNote(data as Note)
      } catch (err) {
        console.error(err)
        setError("Failed to load note details.")
      } finally {
        setLoading(false)
      }
    }

    if (notesId) fetchNote()
  }, [notesId]);

  const isPaid = note?.accessType === 'PAID';

  // Adjust viewer height based on screen size
  useEffect(() => {
    const updateViewerHeight = () => {
      if (viewerContainerRef.current) {
        const viewportHeight = window.innerHeight
        const topOffset = viewerContainerRef.current.getBoundingClientRect().top
        const optimalHeight = viewportHeight - topOffset - 40 // 40px for bottom margin
        viewerContainerRef.current.style.height = `${Math.max(400, optimalHeight)}px`
      }
    }

    updateViewerHeight()
    window.addEventListener("resize", updateViewerHeight)

    return () => {
      window.removeEventListener("resize", updateViewerHeight)
    }
  }, []);


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };


  const handleBuyNow = async () => {
    const res = await loadRazorpayScript();
    if(!res) {
      toast({ title: "Failed", description: 'Razorpay SDK failed to load' });
      return;
    }

    const orderResponse = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: note?.price || 49, // ₹49
        currency: "INR",
        receipt: `receipt_${note?.id}`,
      }),
    });
    
    const orderData = await orderResponse.json();
    console.log("OrderData", orderData);
    if (!orderData.id) {
      toast({ title: "Error", description: "Order creation failed" });
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: orderData.amount,
      Currency: orderData.currency,
      name: "Paid Notes",
      description: note?.name,
      image: '/logo.png', 
      order_id: orderData.id,
      handler: function (response: any) {
        toast({ title: "Payment Successful", description: response.razorpay_payment_id });
        // TODO: save payment info in DB and unlock note
        console.log(response)
      },
      prefill: {
        name: "Student User",
        email: "student@example.com",
      },
      theme: {
        color: "@22c55e",
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-600 text-center mt-6">{error}</div>
  }

  if (!note) {
    return <div className="text-center mt-6">Note not found.</div>
  }

  return (
    <div className="container py-4 md:py-10 px-4 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">{note.name}</h1>
      <p className="text-muted-foreground mb-4 md:mb-6">
        {note.degree} {note.stream && `(${note.stream})`} • {note.semester} Semester
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button className="flex items-center gap-2" onClick={() => window.open(note.images[0].url, "_blank")}>
          <Eye size={16} />
          <span className="hidden sm:inline">View PDF</span>
        </Button>

        {/* Only show download button for FREE notes */}
        {!isPaid && (
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span className="hidden sm:inline">Download</span>
          </Button>
        )}

        {/* Only show Buy Now button for PAID notes */}
        {isPaid && (
          <Button
            // variant="default"
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            onClick={handleBuyNow}
          >
            <CreditCard size={16} />
            <span>{note.price} Buy Now</span>
          </Button>
        )}
      </div>

      <div className="mt-4 md:mt-8">
        <h2 className="text-xl font-semibold mb-4">PDF Preview</h2>
        <PDFViewer 
          pdfUrl={note.images[0].url}
          isPaid={isPaid}
        />

        {/* Page counter */}
        {/* <div className="mt-2 text-sm text-muted-foreground flex justify-between items-center"> */}
          {/* <span>
            Page {currentPage + 1} of {note.totalPages || "?"}
          </span> */}
          {/* {isPaid && <span className="text-amber-600 font-medium">{maxFreePages} pages free preview</span>} */}
        {/* </div> */}
      </div>

      {/* Premium content banner - only show for PAID notes */}
      {isPaid && (
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-shrink-0 bg-amber-200 rounded-full p-3">
              <LockIcon size={24} className="text-amber-700" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-lg font-semibold mb-1">Unlock Full Access</h3>
              <p className="text-amber-800 mb-3">
                {/* Get access to all {note.totalPages || "pages"} of this premium note, including downloadable PDF. */}
              </p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 px-6" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </div>
      )}

      {/* Purchase modal - only shown for PAID notes */}
      {showModal && isPaid && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl text-center max-w-md w-full p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <LockIcon size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Unlock Full Access</h2>
            {/* <p className="mb-6 text-gray-600">
              You've reached the preview limit. Purchase this note to access all {note.totalPages || "remaining"} pages
              and download the complete PDF.
            </p> */}

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold">₹{note.price || 99}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Format:</span>
                {/* <span>PDF ({note.totalPages || "?"} pages)</span> */}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>
                Continue Preview
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page;
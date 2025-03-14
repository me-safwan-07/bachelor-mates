"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Clock, Star } from "lucide-react";
import { CartButton } from "@/components/cart-button";

interface MaterialPageProps {
  params: {
    type: string;
    id: string;
  };
}

export default function MaterialPage({ params }: MaterialPageProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsDownloading(false);
  };

  // In a real app, fetch material details based on type and id
  const material = {
    id: params.id,
    title: "Introduction to Computer Science",
    subject: "Computer Science",
    author: "Prof. James Wilson",
    description: "Comprehensive introduction to computer science fundamentals, covering algorithms, data structures, and programming concepts.",
    pages: 45,
    downloads: 1250,
    rating: 4.8,
    reviews: 124,
    lastUpdated: "2024-03-15",
  };

  return (
    <div className="container py-10">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Material Preview */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl">{material.title}</CardTitle>
            <CardDescription>{material.subject}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[16/9] rounded-lg bg-muted flex items-center justify-center">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Material Details */}
        <Card>
          <CardHeader>
            <CardTitle>Material Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Author</span>
              <span className="font-medium">{material.author}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Pages</span>
              <span className="font-medium">{material.pages}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Downloads</span>
              <span className="font-medium">{material.downloads}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Rating</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="font-medium">{material.rating}</span>
                <span className="text-sm text-muted-foreground">({material.reviews} reviews)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{new Date(material.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button 
              className="w-full" 
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download PDF"}
            </Button>
            <CartButton itemId={material.id} variant="outline" size="default" />
          </CardFooter>
        </Card>

        {/* Description */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{material.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
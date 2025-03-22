"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, Filter, Search, Star } from "lucide-react";

export default function PremiumPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Premium Handwritten Notes</h1>
          <p className="text-muted-foreground">
            High-quality, detailed handwritten notes to help you excel in your studies
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search premium notes..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button   size="sm" className="h-9 gap-1">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Premium Notes Categories */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:w-[500px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="engineering">Engineering</TabsTrigger>
            <TabsTrigger value="science">Science</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>
          
          {/* All Premium Notes */}
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Advanced Data Structures",
                  subject: "Computer Science",
                  author: "Prof. James Wilson",
                  rating: 4.8,
                  reviews: 124,
                  price: 12.99,
                  pages: 85,
                  category: "engineering",
                  bestseller: true,
                },
                {
                  title: "Organic Chemistry Complete Guide",
                  subject: "Chemistry",
                  author: "Dr. Emily Chen",
                  rating: 4.7,
                  reviews: 98,
                  price: 14.99,
                  pages: 110,
                  category: "science",
                  bestseller: false,
                },
                {
                  title: "Macroeconomics Principles",
                  subject: "Economics",
                  author: "Prof. Sarah Johnson",
                  rating: 4.9,
                  reviews: 156,
                  price: 11.99,
                  pages: 92,
                  category: "business",
                  bestseller: true,
                },
                {
                  title: "Digital Signal Processing",
                  subject: "Electronics",
                  author: "Dr. Robert Lee",
                  rating: 4.6,
                  reviews: 87,
                  price: 13.99,
                  pages: 78,
                  category: "engineering",
                  bestseller: false,
                },
                {
                  title: "Molecular Biology Fundamentals",
                  subject: "Biology",
                  author: "Dr. Lisa Martinez",
                  rating: 4.8,
                  reviews: 112,
                  price: 15.99,
                  pages: 96,
                  category: "science",
                  bestseller: true,
                },
                {
                  title: "Financial Management",
                  subject: "Finance",
                  author: "Prof. Michael Brown",
                  rating: 4.7,
                  reviews: 103,
                  price: 12.99,
                  pages: 88,
                  category: "business",
                  bestseller: false,
                },
                {
                  title: "Machine Learning Algorithms",
                  subject: "Computer Science",
                  author: "Dr. Alex Turner",
                  rating: 4.9,
                  reviews: 145,
                  price: 16.99,
                  pages: 115,
                  category: "engineering",
                  bestseller: true,
                },
                {
                  title: "Quantum Physics",
                  subject: "Physics",
                  author: "Prof. David Clark",
                  rating: 4.8,
                  reviews: 92,
                  price: 14.99,
                  pages: 105,
                  category: "science",
                  bestseller: false,
                },
                {
                  title: "Marketing Strategies",
                  subject: "Marketing",
                  author: "Dr. Jennifer White",
                  rating: 4.7,
                  reviews: 118,
                  price: 11.99,
                  pages: 82,
                  category: "business",
                  bestseller: true,
                },
              ].map((note, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-3 relative">
                    {note.bestseller && (
                      <Badge className="absolute right-4 top-4 bg-yellow-500 hover:bg-yellow-600">
                        Bestseller
                      </Badge>
                    )}
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <CardDescription>
                      {note.subject} • By {note.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium">{note.rating}</span>
                        <span className="text-muted-foreground">({note.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{note.pages} pages</span>
                        </div>
                        <div className="text-lg font-bold text-foreground">
                          ${note.price}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full"   >
                      <Link href={`/premium/notes/${index + 1}`}>
                        Purchase Now
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Engineering Notes */}
          <TabsContent value="engineering" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Advanced Data Structures",
                  subject: "Computer Science",
                  author: "Prof. James Wilson",
                  rating: 4.8,
                  reviews: 124,
                  price: 12.99,
                  pages: 85,
                  bestseller: true,
                },
                {
                  title: "Digital Signal Processing",
                  subject: "Electronics",
                  author: "Dr. Robert Lee",
                  rating: 4.6,
                  reviews: 87,
                  price: 13.99,
                  pages: 78,
                  bestseller: false,
                },
                {
                  title: "Machine Learning Algorithms",
                  subject: "Computer Science",
                  author: "Dr. Alex Turner",
                  rating: 4.9,
                  reviews: 145,
                  price: 16.99,
                  pages: 115,
                  bestseller: true,
                },
              ].map((note, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-3 relative">
                    {note.bestseller && (
                      <Badge className="absolute right-4 top-4 bg-yellow-500 hover:bg-yellow-600">
                        Bestseller
                      </Badge>
                    )}
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <CardDescription>
                      {note.subject} • By {note.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium">{note.rating}</span>
                        <span className="text-muted-foreground">({note.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{note.pages} pages</span>
                        </div>
                        <div className="text-lg font-bold text-foreground">
                          ${note.price}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full"   >
                      <Link href={`/premium/notes/${index + 1}`}>
                        Purchase Now
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Science Notes */}
          <TabsContent value="science" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Organic Chemistry Complete Guide",
                  subject: "Chemistry",
                  author: "Dr. Emily Chen",
                  rating: 4.7,
                  reviews: 98,
                  price: 14.99,
                  pages: 110,
                  bestseller: false,
                },
                {
                  title: "Molecular Biology Fundamentals",
                  subject: "Biology",
                  author: "Dr. Lisa Martinez",
                  rating: 4.8,
                  reviews: 112,
                  price: 15.99,
                  pages: 96,
                  bestseller: true,
                },
                {
                  title: "Quantum Physics",
                  subject: "Physics",
                  author: "Prof. David Clark",
                  rating: 4.8,
                  reviews: 92,
                  price: 14.99,
                  pages: 105,
                  bestseller: false,
                },
              ].map((note, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-3 relative">
                    {note.bestseller && (
                      <Badge className="absolute right-4 top-4 bg-yellow-500 hover:bg-yellow-600">
                        Bestseller
                      </Badge>
                    )}
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <CardDescription>
                      {note.subject} • By {note.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium">{note.rating}</span>
                        <span className="text-muted-foreground">({note.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{note.pages} pages</span>
                        </div>
                        <div className="text-lg font-bold text-foreground">
                          ${note.price}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full"   >
                      <Link href={`/premium/notes/${index + 1}`}>
                        Purchase Now
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Business Notes */}
          <TabsContent value="business" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Macroeconomics Principles",
                  subject: "Economics",
                  author: "Prof. Sarah Johnson",
                  rating: 4.9,
                  reviews: 156,
                  price: 11.99,
                  pages: 92,
                  bestseller: true,
                },
                {
                  title: "Financial Management",
                  subject: "Finance",
                  author: "Prof. Michael Brown",
                  rating: 4.7,
                  reviews: 103,
                  price: 12.99,
                  pages: 88,
                  bestseller: false,
                },
                {
                  title: "Marketing Strategies",
                  subject: "Marketing",
                  author: "Dr. Jennifer White",
                  rating: 4.7,
                  reviews: 118,
                  price: 11.99,
                  pages: 82,
                  bestseller: true,
                },
              ].map((note, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-3 relative">
                    {note.bestseller && (
                      <Badge className="absolute right-4 top-4 bg-yellow-500 hover:bg-yellow-600">
                        Bestseller
                      </Badge>
                    )}
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <CardDescription>
                      {note.subject} • By {note.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium">{note.rating}</span>
                        <span className="text-muted-foreground">({note.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{note.pages} pages</span>
                        </div>
                        <div className="text-lg font-bold text-foreground">
                          ${note.price}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full"   >
                      <Link href={`/premium/notes/${index + 1}`}>
                        Purchase Now
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
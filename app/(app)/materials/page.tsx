'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Note } from "@/types/notes";
import { getNotes } from "@/lib/api/notes";
import { PdfThumbnail } from "@/components/pdf-preview";

export default function MaterialsPage() {
  const [state, setState] = useState({
    notes: [] as Note[],
    totalNotes: 0,
    page: 1,
    search: "",
    loading: true,
    error: null as string | null,
  });

  const fetchNotes = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await getNotes({ 
        page: state.page, 
        limit: 10, 
        search: state.search 
      });
  
      setState(prev => ({
        ...prev,
        notes: data.notes,
        totalNotes: data.total_Notes,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: "Failed to load notes. Please try again.",
        loading: false,
      }));
      console.error("Error fetching notes:", error);
    }
  }, [state.page, state.search]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ 
      ...prev, 
      search: e.target.value,
      page: 1,
    }));
  };

  return (
    <div className="container py-10">
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4">
          {state.error}
        </div>
      )}
      
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Study Materials</h1>
          <p className="text-muted-foreground">
            Browse and download free study materials for your courses
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search materials..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
              value={state.search}
              onChange={handleSearch}
            />
          </div>
          <Button size="sm" className="h-9 gap-1">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Materials Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:w-[500px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="bba">BBA</TabsTrigger>
            <TabsTrigger value="bcom">BCOM</TabsTrigger>
            <TabsTrigger value="bca">BCA</TabsTrigger>
          </TabsList>
          
          {/* All Notes Tab */}
          <TabsContent value="all" className="mt-6">
            {state.loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {state.notes.map((note) => (
                  <Card key={note.id} className="flex flex-col h-full">
                    {note.images?.[0]?.url && (
                      <PdfThumbnail
                        pdfUrl={note.images[0].url} 
                      />
                    )}
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg line-clamp-2">{note.name}</CardTitle>
                      <CardDescription className="line-clamp-1">
                        {note.degree} {note.stream && `(${note.stream})`} • {note.semester} Semester
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto flex gap-2">
                      <Button className="flex-1 text-center cursor-pointer">
                        <Link href={`/materials/notes/${note.id}`}>
                          Download PDF
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
'use client';

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { MatrialsTabs } from "../components/MatrialsTabs";
import { useState } from "react";
import { TMatrialTabs } from "@/types/matrials";
import { Filter, Search } from "lucide-react";
import { NotesView } from "./components/NotesView";

export default function MaterialsPage() {
  const [activeView, setActiveView] = useState<TMatrialTabs>("questionspaper")
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="z-30 flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Study Materials</h1>
          <p className="text-muted-foreground">
            Browse and download free study materials for your courses
          </p>
        </div>

        {/* Search and Filter */}
        <div className="z-30 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search materials..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
            />
          </div>
          <Button   size="sm" className="h-9 gap-1">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        <div className="">
          <main>
            <MatrialsTabs 
              activeId={activeView}
              setActiveId={setActiveView}
            />

            {activeView === "notes" && (
              <NotesView />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
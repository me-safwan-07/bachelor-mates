import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Filter, Search } from "lucide-react";
import { CartButton } from "@/components/cart-button";

export default function MaterialsPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
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
            />
          </div>
          <Button   size="sm" className="h-9 gap-1">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Materials Tabs */}
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="question-papers">Question Papers</TabsTrigger>
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
          </TabsList>
          
          {/* Notes Tab */}
          <TabsContent value="notes" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: "1",
                  title: "Introduction to Computer Science",
                  subject: "Computer Science",
                  semester: "1st Semester",
                  pages: 45,
                  downloads: 1250,
                },
                {
                  id: "2",
                  title: "Data Structures and Algorithms",
                  subject: "Computer Science",
                  semester: "2nd Semester",
                  pages: 68,
                  downloads: 980,
                },
                {
                  id: "3",
                  title: "Principles of Economics",
                  subject: "Economics",
                  semester: "1st Semester",
                  pages: 52,
                  downloads: 875,
                },
                {
                  id: "4",
                  title: "Organic Chemistry Fundamentals",
                  subject: "Chemistry",
                  semester: "2nd Semester",
                  pages: 63,
                  downloads: 720,
                },
                {
                  id: "5",
                  title: "Calculus and Analytical Geometry",
                  subject: "Mathematics",
                  semester: "1st Semester",
                  pages: 75,
                  downloads: 1430,
                },
                {
                  id: "6",
                  title: "Digital Electronics",
                  subject: "Electronics",
                  semester: "3rd Semester",
                  pages: 58,
                  downloads: 690,
                },
              ].map((material) => (
                <Card key={material.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{material.title}</CardTitle>
                    <CardDescription>
                      {material.subject} • {material.semester}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{material.pages} pages</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{material.downloads} downloads</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="flex-1"   >
                      <Link href={`/materials/notes/${material.id}`}>
                        Download PDF
                      </Link>
                    </Button>
                    <CartButton itemId={material.id} />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Question Papers Tab */}
          <TabsContent value="question-papers" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: "7",
                  title: "Computer Science Final Exam",
                  subject: "Computer Science",
                  year: "2024",
                  pages: 12,
                  downloads: 950,
                },
                {
                  id: "8",
                  title: "Economics Mid-Term",
                  subject: "Economics",
                  year: "2023",
                  pages: 8,
                  downloads: 780,
                },
                {
                  id: "9",
                  title: "Organic Chemistry Final",
                  subject: "Chemistry",
                  year: "2024",
                  pages: 10,
                  downloads: 620,
                },
                {
                  id: "10",
                  title: "Calculus Final Exam",
                  subject: "Mathematics",
                  year: "2023",
                  pages: 14,
                  downloads: 1120,
                },
                {
                  id: "11",
                  title: "Digital Electronics Mid-Term",
                  subject: "Electronics",
                  year: "2024",
                  pages: 9,
                  downloads: 540,
                },
                {
                  id: "12",
                  title: "Physics Practical Exam",
                  subject: "Physics",
                  year: "2023",
                  pages: 6,
                  downloads: 830,
                },
              ].map((paper) => (
                <Card key={paper.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{paper.title}</CardTitle>
                    <CardDescription>
                      {paper.subject} • {paper.year}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{paper.pages} pages</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{paper.downloads} downloads</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="flex-1"   >
                      <Link href={`/materials/question-papers/${paper.id}`}>
                        Download PDF
                      </Link>
                    </Button>
                    <CartButton itemId={paper.id} />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Syllabus Tab */}
          <TabsContent value="syllabus" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: "13",
                  title: "Computer Science Curriculum",
                  department: "Computer Science",
                  year: "2024-2025",
                  pages: 18,
                  downloads: 1450,
                },
                {
                  id: "14",
                  title: "Economics Program Syllabus",
                  department: "Economics",
                  year: "2024-2025",
                  pages: 15,
                  downloads: 980,
                },
                {
                  id: "15",
                  title: "Chemistry Course Structure",
                  department: "Chemistry",
                  year: "2024-2025",
                  pages: 20,
                  downloads: 820,
                },
                {
                  id: "16",
                  title: "Mathematics Degree Program",
                  department: "Mathematics",
                  year: "2024-2025",
                  pages: 16,
                  downloads: 1230,
                },
                {
                  id: "17",
                  title: "Electronics Engineering Syllabus",
                  department: "Electronics",
                  year: "2024-2025",
                  pages: 22,
                  downloads: 740,
                },
                {
                  id: "18",
                  title: "Physics Program Structure",
                  department: "Physics",
                  year: "2024-2025",
                  pages: 19,
                  downloads: 930,
                },
              ].map((syllabus) => (
                <Card key={syllabus.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{syllabus.title}</CardTitle>
                    <CardDescription>
                      {syllabus.department} • {syllabus.year}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{syllabus.pages} pages</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{syllabus.downloads} downloads</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="flex-1"   >
                      <Link href={`/materials/syllabus/${syllabus.id}`}>
                        Download PDF
                      </Link>
                    </Button>
                    <CartButton itemId={syllabus.id} />
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
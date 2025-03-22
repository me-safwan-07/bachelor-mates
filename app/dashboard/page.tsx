import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Download, FileText, BookMarked, ShoppingCart, Clock, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your study materials and activity.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Saved Materials</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">54</div>
            <p className="text-xs text-muted-foreground">
              +7 new this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Bookmarks</CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              +3 new this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Purchases</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +2 new this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Recommendations */}
      <Tabs defaultValue="recent" className="w-full">
        <TabsList>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight mt-6">Recent Activity</h2>
          <div className="grid gap-4">
            {[
              {
                title: "Downloaded Data Structures Notes",
                timestamp: "2 hours ago",
                icon: Download,
              },
              {
                title: "Purchased Advanced Algorithms Handwritten Notes",
                timestamp: "Yesterday",
                icon: ShoppingCart,
              },
              {
                title: "Bookmarked Organic Chemistry Guide",
                timestamp: "2 days ago",
                icon: BookMarked,
              },
              {
                title: "Downloaded Physics Question Papers",
                timestamp: "3 days ago",
                icon: Download,
              },
              {
                title: "Purchased Economics Premium Notes",
                timestamp: "1 week ago",
                icon: ShoppingCart,
              },
            ].map((activity, index) => (
              <Card key={index}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <activity.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {activity.timestamp}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recommended" className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight mt-6">Recommended for You</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Advanced Data Structures",
                type: "Premium Notes",
                subject: "Computer Science",
                trending: true,
              },
              {
                title: "Organic Chemistry Fundamentals",
                type: "Free Notes",
                subject: "Chemistry",
                trending: false,
              },
              {
                title: "Calculus II Complete Guide",
                type: "Premium Notes",
                subject: "Mathematics",
                trending: true,
              },
              {
                title: "Digital Electronics",
                type: "Question Papers",
                subject: "Electronics",
                trending: false,
              },
              {
                title: "Macroeconomics Principles",
                type: "Premium Notes",
                subject: "Economics",
                trending: true,
              },
              {
                title: "Physics Mechanics",
                type: "Free Notes",
                subject: "Physics",
                trending: false,
              },
            ].map((material, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{material.title}</CardTitle>
                    {material.trending && (
                      <div className="flex items-center text-xs font-medium text-yellow-600 dark:text-yellow-400">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Trending
                      </div>
                    )}
                  </div>
                  <CardDescription>
                    {material.type} • {material.subject}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <Button className="w-full" size="sm"   >
                    <Link href={`/materials/${index + 1}`}>
                      {material.type.includes("Premium") ? "View Details" : "Download"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookOpen, Home, FileText, BookMarked, ShoppingCart, User, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const routes = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: Home,
    },
    {
      href: "/dashboard/materials",
      label: "My Materials",
      icon: FileText,
    },
    {
      href: "/dashboard/bookmarks",
      label: "Bookmarks",
      icon: BookMarked,
    },
    {
      href: "/dashboard/purchases",
      label: "Purchases",
      icon: ShoppingCart,
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: User,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col border-r bg-muted/40",
          isCollapsed ? "md:w-16" : "md:w-64"
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            {!isCollapsed && <span className="font-bold">Bachelor-Mate</span>}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto hidden md:flex"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <ul className="grid gap-1 px-2">
            {routes.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === route.href
                      ? "bg-accent text-accent-foreground"
                      : "transparent"
                  )}
                >
                  <route.icon className="h-4 w-4" />
                  {!isCollapsed && <span>{route.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto border-t p-4">
          <Button variant="ghost" className="w-full justify-start gap-3" asChild>
            <Link href="/">
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span>Log out</span>}
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, BookOpen, Menu, X } from "lucide-react";
import { CartSheet } from "@/components/cart-sheet";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

const routes = [
  { href: "/", label: "Home" },
  { href: "/materials", label: "Study Materials" },
  { href: "/premium", label: "Premium Notes" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">Bachelor-Mate</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <Button size="icon" className="hidden md:flex">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          {/* <CartShee t /> */}
          {/* <ModeToggle />  // theme darkmode or lightmode */}
          
          {/* Desktop Login/Register Buttons */}
          <div className="hidden md:flex md:gap-2">
            <Button>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button>
              <Link href="/auth/signup">Register</Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-slate-400 shadow-md md:hidden">
          <ul className="flex flex-col items-center gap-4 p-4">
            {routes.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-black",
                    pathname === route.href ? "text-foreground" : "text-muted-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.label}
                </Link>
              </li>
            ))}
            <li>
              <Button>
                <Link href="/auth/login">Login</Link>
              </Button>
            </li>
            <li>
              <Button>
                <Link href="/auth/signup">Register</Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

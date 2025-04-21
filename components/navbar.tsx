"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, BookOpen, Menu, X, Home, User, Briefcase, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { TUser } from "@/types/user";
import { motion } from "framer-motion"

const routes = [
  { href: "/", label: "Home", icon: Home },
  { href: "/materials", label: "Materials", icon: User },
  { href: "/premium", label: "Premium", icon: Briefcase },
  { href: "/dashboard/overview", label: "Dashboard", icon: FileText },
];

interface NavbarProps {
  user: TUser | null;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(pathname === "/" ? "Home" : 
                                           routes.find(route => pathname.startsWith(route.href))?.label || "Home");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update active tab when pathname changes
  useEffect(() => {
    const currentRoute = routes.find(route => pathname.startsWith(route.href));
    if (currentRoute) {
      setActiveTab(currentRoute.label);
    }
  }, [pathname]);

  return (
    <>
      {/* Desktop Header (shown only on larger screens) */}
      <header className="hidden md:block sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold">Bachelor-Mate</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-6">
            {routes.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side items (search, auth) */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Desktop Auth Buttons */}
            <div className="flex gap-2">
              {user ? (
                <Link href="/dashboard">
                  <Button variant="secondary">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="secondary">Login</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button>Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header (shown only on smaller screens) */}
      <header className="md:hidden sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold">Bachelor-Mate</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 bg-background shadow-lg border-t"
          >
            <div className="container py-4">
              <div className="flex flex-col gap-2">
                {user ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full"
                    >
                      <Button variant="darkCTA" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full"
                    >
                      <Button className="w-full">Register</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Mobile Bottom Navigation - Fixed at bottom like mobile app */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t">
        <div className="flex justify-around items-center py-2">
          {routes.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.label;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActiveTab(item.label)}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg flex-1",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div className="relative">
                  <Icon className="h-5 w-5 mx-auto" />
                  {isActive && (
                    <motion.div
                      layoutId="mobile-active-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Padding for mobile bottom nav */}
      <div className="md:hidden pb-16"></div>
    </>
  );
}
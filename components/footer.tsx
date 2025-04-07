import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 sm:px-4  md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold">Bachelor-Mate</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The ultimate study material platform for bachelor students.
              Access free and premium study materials to excel in your academics.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/materials" className="text-muted-foreground hover:text-foreground">
                  Free Materials
                </Link>
              </li>
              <li>
                <Link href="/premium" className="text-muted-foreground hover:text-foreground">
                  Premium Notes
                </Link>
              </li>
              <li>
                <Link href="/question-papers" className="text-muted-foreground hover:text-foreground">
                  Question Papers
                </Link>
              </li>
              <li>
                <Link href="/subjects" className="text-muted-foreground hover:text-foreground">
                  Subjects
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Bachelor-Mate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
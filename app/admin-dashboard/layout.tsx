import { authOptions } from "@/lib/authOptions";
import { getUser } from "@/lib/user/service";
import { BookOpen, LayoutDashboard, Users, Settings, ShoppingCart } from "lucide-react"
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect("/auth/login?callbackUrl=/admin-dashboard");
    }
    const admin = await getUser(session?.user.id as string);
    if (!admin) {
        return redirect("/auth/login?callbackUrl=/admin-dashboard");
    }
    if (admin.role !== "ADMIN") {
        return notFound();
    }
    
    return (
        <div className="flex min-h-screen h-full flex-col md:flex-row bg-gray-100">
            {/* Mobile Header */}
            <div className="md:hidden bg-white p-4 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold">Admin Dashboard</h2>
                <button className="p-2">
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
                >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                </button>
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white border-r md:h-screen md:sticky md:top-0">
                <div className="hidden md:block p-4 border-b">
                <h2 className="text-xl font-bold">Admin Dashboard</h2>
                </div>
                <nav className="p-4 space-y-1 flex md:block overflow-x-auto md:overflow-x-visible">
                <Link
                    href="/dashboard"
                    className="flex-shrink-0 flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 md:w-full"
                >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                </Link>
                <Link
                    href="/dashboard/notes"
                    className="flex-shrink-0 flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 bg-gray-100 md:w-full"
                >
                    <BookOpen className="w-5 h-5" />
                    <span>Notes</span>
                </Link>
                <Link
                    href="/dashboard/users"
                    className="flex-shrink-0 flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 md:w-full"
                >
                    <Users className="w-5 h-5" />
                    <span>Users</span>
                </Link>
                <Link
                    href="/dashboard/products"
                    className="flex-shrink-0 flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 md:w-full"
                >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Products</span>
                </Link>
                <Link
                    href="/dashboard/settings"
                    className="flex-shrink-0 flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 md:w-full"
                >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </Link>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white border-b p-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                </div>
                </header>
                <main>{children}</main>
            </div>
        </div>
    )
}
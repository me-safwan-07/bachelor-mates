import KBar from "@/components/kbar";
import type { Metadata } from "next";
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';
import AppSidebar from "@/components/layout/app-sidebar";
import Header from "./components/header";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Persising the sidebar state in the cookie
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
    return (
        <KBar>
            <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar />
                <SidebarInset>
                    <Header />
                    {/* page main content */}
                    { children }
                    {/* Page main content ends */}
                </SidebarInset>
            </SidebarProvider>
        </KBar>
    );
}
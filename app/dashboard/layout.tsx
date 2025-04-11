import KBar from "@/components/kbar";
import type { Metadata } from "next";
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';

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

            </SidebarProvider>
        </KBar>
    );
}
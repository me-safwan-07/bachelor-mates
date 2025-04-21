// import KBar from "@/components/kbar";
import type { Metadata } from "next";
// import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
// import { cookies } from 'next/headers';
// import AppSidebar from "@/components/layout/app-sidebar";
import Header from "./components/header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/user/service";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/auth/login?callbackUrl=/dashboard/product')
    }

    if (!session.user.id) {
        redirect('/auth/login?callbackUrl=/dashboard/product');
        return;
    }
    const user = await getUser(session.user?.id);

    if (user?.role == 'ADMIN') {
        redirect('/dashboard/product');
        return;
    }
    // Persising the sidebar state in the cookie
    // const cookieStore = await cookies();
    // const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
    return (
        <div className="mt-10">
        {/* <KBar> */}
            {/* <SidebarProvider defaultOpen={defaultOpen}> */}
                {/* <AppSidebar /> */}
                {/* <SidebarInset> */}
                    <Header />
                    {/* page main content */}
                    { children }
                    {/* Page main content ends */}
                {/* </SidebarInset> */}
            {/* </SidebarProvider> */}
        {/* </KBar><KBar> */}
        </div>
    );
}
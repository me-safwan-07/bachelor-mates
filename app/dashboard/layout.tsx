import { authOptions } from "@/lib/authOptions";
import { getUser } from "@/lib/user/service";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session  = await getServerSession(authOptions);
    if (!session) {
        return redirect("/auth/lo?callbackUrl=/dashboard");
    }

    const user = await getUser(session?.user.id as string);

    if (!user) {
        return redirect("/auth/login?callbackUrl=/dashboard");
    }

    if (user.role !== "USER") { 
        return notFound();
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
    )
}